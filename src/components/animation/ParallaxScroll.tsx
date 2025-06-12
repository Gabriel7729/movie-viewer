"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  speed?: number;
}

export default function ParallaxScroll({
  children,
  className = "",
  direction = "up",
  speed = 0.5,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate transform values based on direction
  const distance = 100 * speed;
  
  // Create transform values directly with hooks
  const upTransform = useTransform(scrollYProgress, [0, 1], [`0px`, `-${distance}px`]);
  const downTransform = useTransform(scrollYProgress, [0, 1], [`0px`, `${distance}px`]);
  const leftTransform = useTransform(scrollYProgress, [0, 1], [`0px`, `-${distance}px`]);
  const rightTransform = useTransform(scrollYProgress, [0, 1], [`0px`, `${distance}px`]);
  
  // Select the appropriate transform based on direction
  let transformValue;
  switch(direction) {
    case "up":
      transformValue = upTransform;
      break;
    case "down":
      transformValue = downTransform;
      break;
    case "left":
      transformValue = leftTransform;
      break;
    case "right":
      transformValue = rightTransform;
      break;
    default:
      transformValue = upTransform;
  }

  const isHorizontal = direction === "left" || direction === "right";
  
  const x = isHorizontal ? transformValue : 0;
  const y = !isHorizontal ? transformValue : 0;
  
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, scale }}
    >
      {children}
    </motion.div>
  );
} 