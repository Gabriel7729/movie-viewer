"use client";

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { hoverScale } from '@/utils/animation';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled,
  iconLeft,
  iconRight,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-secondary hover:bg-secondary-light text-white shadow-md hover:shadow-lg',
    outline: 'border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
    link: 'bg-transparent text-primary hover:text-primary-dark dark:hover:text-primary-light hover:underline p-0'
  };
  
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5 gap-1.5',
    md: 'text-base px-4 py-2 gap-2',
    lg: 'text-lg px-6 py-3 gap-2.5'
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled || isLoading ? 'opacity-60 cursor-not-allowed hover:opacity-60' : '';
  
  // Don't apply padding styles to link variant
  const appliedSizeStyles = variant === 'link' ? 'text-base' : sizeStyles[size];
  
  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${appliedSizeStyles} ${widthStyle} ${disabledStyle} ${className}`}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? hoverScale : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : iconLeft ? (
        <span className="flex items-center justify-center">{iconLeft}</span>
      ) : null}
      
      <span>{children}</span>
      
      {!isLoading && iconRight && (
        <span className="flex items-center justify-center">{iconRight}</span>
      )}
    </motion.button>
  );
} 