"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultName?: string;
  guestId?: string;
}

export default function WishesModal({ isOpen, onClose, defaultName, guestId }: Props) {
  const [name, setName] = useState(defaultName ?? "");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync name when defaultName changes (e.g. page first loads)
  useEffect(() => {
    if (defaultName) setName(defaultName);
  }, [defaultName]);

  // Reset message and error each time modal opens
  useEffect(() => {
    if (isOpen) { setMessage(""); setError(null); }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim(), guestId }),
      });
      if (res.ok) {
        onClose();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Không thể gửi lời chúc. Vui lòng thử lại.");
      }
    } catch {
      setError("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setBusy(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom sheet on mobile, centered modal on desktop */}
          <motion.div
            key="sheet"
            className="fixed inset-x-0 bottom-0 z-[9999] mx-auto w-full max-w-lg rounded-t-3xl bg-gradient-to-b from-[#fff5f5] to-white px-6 pb-safe pt-5 shadow-2xl sm:bottom-auto sm:top-1/2 sm:rounded-3xl sm:pb-8"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            onKeyDown={handleKey}
          >
            {/* Handle bar */}
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#e1c7c7] sm:hidden" />

            {/* Header row */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#ff7b8a] to-[#e94667]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
                <h3 className="font-cormorant translate-y-2 text-xl tracking-wide text-[#9c3e3e]">
                  Gửi lời chúc
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Đóng"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5e8e8] text-[#9c3e3e] transition hover:bg-[#ecd5d5]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Name field — read-only (pre-filled from invite link) */}
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-[#a07070]">
                Tên của bạn
              </label>
              <input
                type="text"
                value={name}
                readOnly
                className="w-full cursor-default rounded-xl border border-[#e8d0d0] bg-[#fdf5f5] px-4 py-2.5 text-sm text-[#555] outline-none select-none"
              />
            </div>

            {/* Message field */}
            <div className="mb-5">
              <div className="mb-1 flex items-center justify-between">
                <label className="text-xs font-medium text-[#a07070]">Lời chúc</label>
                <span className={`text-xs ${message.length >= 45 ? "text-red-400 font-semibold" : "text-[#c0a0a0]"}`}>
                  {message.length}/40
                </span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Trăm năm hạnh phúc bên nhau nhé ♡ - Hoàng - Thư "
                maxLength={40}
                rows={3}
                className="w-full resize-none rounded-xl border border-[#e8d0d0] bg-white px-4 py-2.5 text-sm text-[#333] placeholder-[#caa] outline-none transition focus:border-[#c97070] focus:ring-2 focus:ring-[#e8c0c0]/50"
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-500">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={busy || !name.trim() || !message.trim()}
              className="w-full rounded-full bg-gradient-to-r from-[#e8636f] to-[#c94060] py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
            >
              {busy ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31 11" />
                  </svg>
                  Đang gửi…
                </span>
              ) : (
                "Gửi lời chúc ♡"
              )}
            </button>

            {/* Bottom safe area padding for iOS */}
            <div className="h-4 sm:hidden" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

