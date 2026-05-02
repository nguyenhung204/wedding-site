"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  src: string;
  title?: string;
  autoplay?: boolean;
  open: boolean;
}

/**
 * Floating circular audio toggle (top-left, like the source's audio toolbar).
 * Plays a track in a loop with a slow-spin record icon when active.
 */
export default function AudioPlayer({ src, title, autoplay = true, open }: Props) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // Try to play once the user has interacted (envelope open).
  useEffect(() => {
    if (!open || !ref.current) return;
    if (autoplay && !playing) {
      ref.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [open, autoplay, playing]);

  const toggle = async () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      try {
        await ref.current.play();
        setPlaying(true);
      } catch {
        /* user gesture missing */
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.button
          aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
          onClick={toggle}
          className="fixed left-4 top-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/85 backdrop-blur-sm text-[#a95151] pulse-ring"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <span className={playing ? "spin-slow" : ""}>
            <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
              <circle cx="16" cy="16" r="13" fill="#fff5f5" stroke="#e49696" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="3.2" fill="#a95151" />
              <path
                d="M14.6 6.5c4.6.8 7.7 3.9 8.5 8.5"
                fill="none"
                stroke="#e49696"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
          {!playing && (
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#a95151] text-[10px] text-white shadow">▶</span>
          )}
          <audio ref={ref} src={src} loop preload="auto" />
          <span className="sr-only">{title}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
