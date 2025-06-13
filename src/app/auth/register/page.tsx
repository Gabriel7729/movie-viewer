'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/api';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const validateForm = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await authService.register({
        name,
        email,
        password,
      });
      // Redirect to home page after successful registration
      router.push('/');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. This email may already be registered.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h1>
        <p className="text-gray-600 dark:text-gray-300">Join our community of movie enthusiasts</p>
      </div>
      
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-md p-6 mb-6 border border-white/20 dark:border-gray-700/30">
        {error && (
          <div className="bg-red-100/80 dark:bg-red-900/80 backdrop-blur-sm text-red-700 dark:text-red-300 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/70 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
              required
              minLength={3}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/70 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/70 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
              required
              minLength={6}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/70 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
              required
              minLength={6}
            />
          </div>
          
          <Button type="submit" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </form>
      </div>
      
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary hover:underline transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
} 