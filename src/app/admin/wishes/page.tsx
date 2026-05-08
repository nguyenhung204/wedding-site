"use client";
import { useEffect, useState } from "react";
import { database } from "@/lib/firebase-client";
import { ref, query, orderByChild, limitToLast, onValue } from "firebase/database";

interface WishItem {
  name: string;
  message: string;
  submittedAt: string;
  guestId?: string | null;
}

export default function WishesAdminPage() {
  const [wishes, setWishes] = useState<WishItem[]>([]);

  useEffect(() => {
    const wishesRef = query(
      ref(database, "wishes"),
      orderByChild("submittedAt"),
      limitToLast(100)
    );
    const unsubscribe = onValue(wishesRef, (snapshot) => {
      const data = snapshot.val() as Record<string, WishItem> | null;
      if (!data) {
        setWishes([]);
        return;
      }
      const list = Object.values(data).sort((a, b) =>
        b.submittedAt.localeCompare(a.submittedAt)
      );
      setWishes(list);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Lời chúc ({wishes.length})</h1>
        <span className="flex items-center gap-1.5 text-xs text-green-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          Real-time
        </span>
      </div>

      {wishes.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center text-sm text-gray-400 shadow-sm">
          Chưa có lời chúc nào
        </div>
      ) : (
        <div className="space-y-3">
          {wishes.map((w, i) => (
            <div key={i} className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-gray-800">{w.name}</p>
                <p className="shrink-0 text-xs text-gray-400">
                  {new Date(w.submittedAt).toLocaleString("vi-VN")}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-600">{w.message}</p>
              {w.guestId && (
                <p className="mt-1 font-mono text-xs text-gray-400">ID: {w.guestId}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
