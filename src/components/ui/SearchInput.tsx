import { useState, useEffect, useRef, InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  className = '',
  ...props
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Sync the local value with the external value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Set a new timer
    debounceTimerRef.current = setTimeout(() => {
      onChange(newValue);
      if (onSearch) {
        onSearch(newValue);
      }
    }, debounceMs);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localValue);
    }
  };
  
  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  
  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 pr-10 text-gray-700 bg-white/70 backdrop-blur-md border border-gray-300 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
          dark:bg-gray-800/70 dark:text-gray-200 dark:border-gray-600
          transition-all duration-200 ${isFocused ? 'shadow-md' : ''}`}
        {...props}
      />
      <motion.button 
        type="submit" 
        className="absolute top-0 right-0 h-full px-3 text-gray-500 hover:text-primary focus:outline-none transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </motion.button>
    </motion.form>
  );
} 