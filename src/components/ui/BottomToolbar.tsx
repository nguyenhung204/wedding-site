"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import WishesModal from "./WishesModal";

interface Props {
  open: boolean;
  guestId?: string;
  guestName?: string;
}

export default function BottomToolbar({ open, guestId, guestName }: Props) {
  const [collapsed, setCollapsed] = useState(true);
  const [wishesOpen, setWishesOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <WishesModal isOpen={wishesOpen} onClose={() => setWishesOpen(false)} guestId={guestId} defaultName={guestName} />

          {/* Blessing button (left) — always visible when card is open */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
            onClick={() => setWishesOpen(true)}
            className="fixed bottom-5 z-[200] flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm text-[#7a5f5f] shadow-md backdrop-blur-sm"
            style={{ left: "max(12px, calc(50% - 220px))" }}
          >
            Gửi lời chúc…
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#7a5f5f" aria-hidden>
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              <circle cx="8" cy="10" r="1"/>
              <circle cx="12" cy="10" r="1"/>
              <circle cx="16" cy="10" r="1"/>
            </svg>
          </motion.button>

          {/* Right-side mini-toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-5 z-40 flex flex-col items-center gap-2"
            style={{ right: "max(12px, calc(50% - 218px))" }}
          >
            {/* Toggle button */}
            <button
              aria-label="Ẩn / hiện thanh công cụ"
              onClick={() => setCollapsed((c) => !c)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#ff9aa6] to-[#ff4969] text-white shadow-md float-gentle"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="flex flex-col items-center gap-2"
                >
                  <button
                    onClick={() => scrollTo("gift")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#a95151] shadow"
                    aria-label="Hộp quà cưới"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M3 9h18v11H3z" stroke="#a95151" strokeWidth="1.5"/>
                      <path d="M12 9v11" stroke="#a95151" strokeWidth="1.5"/>
                      <path d="M3 9l2-3h14l2 3" stroke="#a95151" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M12 9c-1.5-2-4-2-4 0 0-2-2.5-2-4 0" stroke="#a95151" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollTo("rsvp")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#a95151] shadow"
                    aria-label="Xác nhận tham dự"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M9 12l2 2 4-4" stroke="#a95151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="3" y="4" width="18" height="16" rx="2" stroke="#a95151" strokeWidth="1.5"/>
                    </svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
