"use client";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
}

/**
 * Initial-load splash screen with a spinning "double-happiness" 囍 emblem,
 * matching the source's loading state.
 */
export default function LoadingSplash({ show }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#f9f1ef]"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d68b8b] text-[#a95151] happiness-spin">
            <span className="text-3xl">囍</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
