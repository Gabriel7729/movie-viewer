"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { fadeIn } from "@/utils/animation";

interface AnimateElementProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export default function AnimateElement({
  children,
  variants = fadeIn,
  className = "",
  delay = 0,
}: AnimateElementProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 