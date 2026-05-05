"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishesModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setMessage("");
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative mx-4 w-full max-w-[400px] overflow-visible rounded-2xl bg-gradient-to-b from-[#fff5f5] to-white px-6 pb-8 pt-14 shadow-xl"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Heart chat icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-b from-[#ff7b8a] to-[#e94667] shadow-lg">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                {/* Small decorative hearts */}
                <span className="absolute -right-2 -top-1 text-[#ff9aaa]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
                <span className="absolute -right-4 top-3 text-[#ffb8c4]">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-3 text-lg text-[#999] hover:text-[#666]"
              aria-label="Đóng"
            >
              X
            </button>

            {/* Title */}
            <h3 className="mb-6 text-center text-xl font-bold text-[#333]">
              Lời chúc
            </h3>

            {/* Name input */}
            <input
              type="text"
              placeholder="Tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 w-full rounded-lg border border-[#fcc] bg-white px-4 py-3 text-sm text-[#333] placeholder-[#caa] outline-none focus:border-[#f99]"
            />

            {/* Message textarea */}
            <textarea
              placeholder="Lời chúc của bạn"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mb-6 w-full resize-y rounded-lg border border-[#fcc] bg-white px-4 py-3 text-sm text-[#333] placeholder-[#caa] outline-none focus:border-[#f99]"
            />

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className="w-full rounded-full bg-gradient-to-r from-[#ff6b7a] to-[#e94667] py-3 text-base font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
            >
              {submitted ? "Đã gửi!" : "Gửi Lời Chúc"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
