"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { scaleUp, hoverScale } from '@/utils/animation';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  animate?: boolean;
  delay?: number;
}

export default function Card({ 
  children, 
  className = '', 
  onClick,
  animate = true,
  delay = 0
}: CardProps) {
  if (!animate) {
    return (
      <div
        className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-md overflow-hidden ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-md overflow-hidden ${className}`}
      onClick={onClick}
      whileHover={onClick ? hoverScale : {}}
      initial="hidden"
      animate="visible"
      variants={scaleUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className = '' }: CardImageProps) {
  return (
    <div className={`relative w-full aspect-[2/3] ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onError={() => {
            // Next/image doesn't support onError the same way, we'll handle fallbacks differently
            const imgElement = document.createElement('img');
            imgElement.src = 'https://via.placeholder.com/300x450?text=No+Image';
            imgElement.alt = alt;
            imgElement.className = 'absolute inset-0 w-full h-full object-cover';
            const parent = document.querySelector(`[alt="${alt}"]`)?.parentElement;
            if (parent) {
              parent.appendChild(imgElement);
            }
          }}
        />
      </motion.div>
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <motion.h3 
      className={`text-xl font-bold mb-2 text-gray-800 dark:text-white ${className}`}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <motion.p 
      className={`text-gray-600 dark:text-gray-300 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      {children}
    </motion.p>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <motion.div 
      className={`px-4 py-3 bg-gray-50/70 dark:bg-gray-700/70 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
} 