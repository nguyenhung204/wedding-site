"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import config from "@/lib/config";

interface Props {
  src: string;
  title?: string;
  autoplay?: boolean;
  open: boolean;
}

/**
 * Floating circular audio toggle (top-right, matching the original cinelove
 * audio toolbar). Plays a track in a loop with a slow-spin record disc icon.
 */
export default function AudioPlayer({ src, title, autoplay = true, open }: Props) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

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
          className="fixed right-[10px] top-[10px] z-[1000] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[rgba(165,165,165,0.2)] overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <span className={`relative h-full w-full ${playing ? "audio-spin" : ""}`}>
            <Image src={config.photos.illustrations.audioDisc} alt="" fill sizes="30px" className="object-contain audio-disc-tint" />
          </span>
          {!playing && (
            <span className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden pt-[15px]">
              <span className="block w-full h-px bg-white rotate-45" />
            </span>
          )}
          <audio ref={ref} src={src} loop preload="auto" />
          <span className="sr-only">{title}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
