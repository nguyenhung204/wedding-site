"use client";
import { useEffect, useState } from "react";

const HeartSVG = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden>
    <path
      d="M16 28s-11-7.2-11-15a6 6 0 0 1 11-3.3A6 6 0 0 1 27 13c0 7.8-11 15-11 15Z"
      fill="rgba(228,150,150,0.55)"
    />
  </svg>
);

interface Petal {
  id: number;
  size: number;
  duration: number;
  delay: number;
  xFrom: number;
  xTo: number;
  rotate: number;
}

const COUNT = 18;

export default function PetalEffect() {
  const [petals, setPetals] = useState<Petal[]>([]);
  useEffect(() => {
    const list: Petal[] = Array.from({ length: COUNT }, (_, i) => {
      const xFrom = Math.random() * 100;
      const drift = (Math.random() - 0.5) * 30;
      return {
        id: i,
        size: 12 + Math.random() * 18,
        duration: 14 + Math.random() * 14,
        delay: -Math.random() * 30,
        xFrom,
        xTo: xFrom + drift,
        rotate: Math.random() * 360,
      };
    });
    setPetals(list);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal absolute block"
          style={{
            left: `${p.xFrom}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            // CSS variables consumed by the keyframe
            ["--x-from" as never]: "0px",
            ["--x-to" as never]: `${(p.xTo - p.xFrom) * 4}px`,
          }}
        >
          <HeartSVG />
        </span>
      ))}
    </div>
  );
}
