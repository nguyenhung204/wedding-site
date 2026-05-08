"use client";
import { AnimatePresence } from "framer-motion";
import ScatteredWish from "./ScatteredWish";
import { SLOTS } from "./types";
import type { Wish } from "./types";

interface Props {
  wishes: Wish[];
  newKeys: Set<string>;
}

export default function PhotoWall({ wishes, newKeys }: Props) {
  const slotted = wishes.map((w, i) => ({ wish: w, slot: SLOTS[i % SLOTS.length] }));

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-md"
      style={{ paddingBottom: "66.67%" /* 3:2 */ }}
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero.jpg')" }}
      />

      {/* Soft pink overlay */}
      <div className="absolute inset-0 bg-[#fce8e8]/25" />

      {/* Scattered wish texts */}
      <AnimatePresence>
        {slotted.map(({ wish, slot }) => (
          <ScatteredWish
            key={wish.key}
            wish={wish}
            slot={slot}
            isNew={newKeys.has(wish.key)}
          />
        ))}
      </AnimatePresence>

      {/* Empty state */}
      {wishes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p
            className="font-script text-red-500 text-base px-6 text-center"
          >
            Hãy là người đầu tiên gửi lời chúc…
          </p>
        </div>
      )}
    </div>
  );
}
