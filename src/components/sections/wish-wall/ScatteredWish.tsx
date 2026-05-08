"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypewriterText from "./TypewriterText";
import type { Wish, SLOTS } from "./types";

interface Props {
  wish: Wish;
  slot: typeof SLOTS[number];
  isNew: boolean;
}

export default function ScatteredWish({ wish, slot, isNew }: Props) {
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (isNew) setTypingDone(false);
  }, [isNew]);

  const penVisible = isNew && !typingDone;

  return (
    <motion.div
      key={wish.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      transition={{ duration: 0.5 }}
      className="absolute max-w-[22%] select-none pointer-events-none"
      style={{ left: slot.x, top: slot.y, rotate: `${slot.angle}deg` }}
    >
      {/* Floating pen above slot while typing */}
      <AnimatePresence>
        {penVisible && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.4 }}
            animate={{ opacity: 1, y: -16, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.3 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="absolute left-0 top-0"
          >
          </motion.div>
        )}
      </AnimatePresence>

      <p
        className="font-script leading-tight"
        style={{
          fontSize: "10px",
          color: "#cc0609",
          textShadow: "0 1px 4px rgba(255,255,255,0.7)",
        }}
      >
        {isNew ? (
          <TypewriterText text={wish.message} onDone={() => setTypingDone(true)} />
        ) : (
          wish.message
        )}
      </p>
    </motion.div>
  );
}
