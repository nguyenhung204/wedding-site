"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  open: boolean;
}

/**
 * Bottom-right floating toolbar with a "send blessing" pill, like/heart and
 * scroll-to-RSVP shortcut — equivalent to the toolbar in the source.
 */
export default function BottomToolbar({ open }: Props) {
  const [collapsed, setCollapsed] = useState(true);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Blessing input (left, attached to bottom of card) */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
            onClick={() => scrollTo("rsvp")}
            className={`fixed bottom-5 z-40 flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm text-[#7a5f5f] shadow-md backdrop-blur-sm transition ${
              collapsed ? "opacity-0 pointer-events-none" : ""
            }`}
            style={{ left: "max(12px, calc(50% - 220px))" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M21 12a8 8 0 1 1-3.5-6.6L21 4l-1 4-3.6-1" stroke="#a95151" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Gửi lời chúc…
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
