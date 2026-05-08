"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  name: string;
  onDone: () => void;
}

export default function WishToast({ name, onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="flex items-center gap-2 rounded-full border border-[#e1c7c7] bg-white px-4 py-2 text-sm text-[#5a3030] shadow-md"
    >
      <span className="font-script tracking-wide">Lời chúc mới từ </span>
      <span className="font-script text-[#9c3e3e]">{name}</span>
    </motion.div>
  );
}
