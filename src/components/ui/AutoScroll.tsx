"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  enabled: boolean;
  speed: number; // px per ms
  active: boolean; // only auto-scroll once envelope is opened
}

/**
 * Optional auto-scroll: once the user opens the envelope and the music
 * starts, slowly drift the scroll position downwards. Pauses on user
 * interaction (any wheel/touch/keyboard event) and on a manual toggle.
 */
export default function AutoScroll({ enabled, speed, active }: Props) {
  const [paused, setPaused] = useState(!enabled);
  const lastTs = useRef<number | null>(null);

  useEffect(() => {
    if (!active || paused) return;
    let raf = 0;
    const tick = (ts: number) => {
      if (lastTs.current == null) lastTs.current = ts;
      const dt = ts - lastTs.current;
      lastTs.current = ts;
      window.scrollBy({ top: speed * dt });
      const max = document.documentElement.scrollHeight - window.innerHeight - 8;
      if (window.scrollY >= max) {
        cancelAnimationFrame(raf);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, speed]);

  // User interaction → stop auto-scroll
  useEffect(() => {
    const stop = () => setPaused(true);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    return () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);

  if (!active) return null;

  return (
    <button
      onClick={() => setPaused((p) => !p)}
      aria-label={paused ? "Bật tự cuộn" : "Tạm dừng tự cuộn"}
      className="fixed left-4 top-20 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-[#a95151] shadow"
    >
      {paused ? (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path d="M6 6l12 6-12 6Z" fill="currentColor" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
          <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
