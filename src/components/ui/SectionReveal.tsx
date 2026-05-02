"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
  as?: keyof typeof motion;
}

export default function SectionReveal({
  children,
  delay = 0,
  className,
  amount = 0.2,
}: Props) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
