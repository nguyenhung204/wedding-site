"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { database } from "@/lib/firebase-client";
import { ref, query, orderByChild, limitToLast, onValue } from "firebase/database";
import SectionReveal from "@/components/ui/SectionReveal";
import WishesModal from "@/components/ui/WishesModal";
import PhotoWall from "./wish-wall/PhotoWall";
import WishToast from "./wish-wall/WishToast";
import type { Wish } from "./wish-wall/types";
import { MAX_VISIBLE } from "./wish-wall/types";
import { isProfane } from "@/lib/profanity";

interface Props {
  guestName?: string;
  guestId?: string;
}

export default function WishWall({ guestName, guestId }: Props) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newKeys, setNewKeys] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ id: number; name: string } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const seenRef = useRef<Set<string>>(new Set());
  const initialRef = useRef(true);
  const toastIdRef = useRef(0);
  const clearToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    const q = query(ref(database, "wishes"), orderByChild("submittedAt"), limitToLast(50));
    const unsub = onValue(q, (snap) => {
      const data = snap.val() as Record<string, Omit<Wish, "key">> | null;
      if (!data) { setWishes([]); initialRef.current = false; return; }

      const list: Wish[] = Object.entries(data)
        .map(([key, v]) => ({ key, ...v }))
        .filter((w) => !isProfane(w.message) && !isProfane(w.name))
        .sort((a, b) => a.submittedAt - b.submittedAt);

      if (!initialRef.current) {
        const fresh = list.filter((w) => !seenRef.current.has(w.key));
        if (fresh.length > 0) {
          const freshKeys = fresh.map((w) => w.key);
          setNewKeys((prev) => new Set(Array.from(prev).concat(freshKeys)));
          toastIdRef.current += 1;
          setToast({ id: toastIdRef.current, name: fresh[fresh.length - 1].name });
          setTimeout(() => {
            setNewKeys((prev) => {
              const n = new Set(prev);
              freshKeys.forEach((k) => n.delete(k));
              return n;
            });
          }, 5500);
        }
      }
      list.forEach((w) => seenRef.current.add(w.key));
      initialRef.current = false;
      setWishes(list.slice(-MAX_VISIBLE));
    });
    return () => unsub();
  }, []);

  return (
    <section id="wishes" className="relative px-6 py-12">
      {/* Header */}
      <SectionReveal>
        <div className="mb-5 text-center">
          <p className="font-script translate-y-2 text-xl tracking-[0.2em] text-[#9c3e3e]">
            Lời chúc yêu thương
          </p>
        </div>
      </SectionReveal>

      {/* Photo wall with scattered wishes */}
      <SectionReveal delay={0.1}>
        <PhotoWall wishes={wishes} newKeys={newKeys} />
      </SectionReveal>

      {/* Toast notification */}
      <div className="fixed bottom-20 right-4 z-50 pointer-events-none">
        <AnimatePresence>
          {toast && <WishToast key={toast.id} name={toast.name} onDone={clearToast} />}
        </AnimatePresence>
      </div>

      {/* Wish submission modal */}
      <WishesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultName={guestName}
        guestId={guestId}
      />
    </section>
  );
}
