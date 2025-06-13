'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/api';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await authService.login({ email, password });
      // Redirect to home page after successful login
      router.push('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h1>
        <p className="text-gray-600 dark:text-gray-300">Sign in to access your account</p>
      </div>
      
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-md p-6 mb-6 border border-white/20 dark:border-gray-700/30">
        {error && (
          <div className="bg-red-100/80 dark:bg-red-900/80 backdrop-blur-sm text-red-700 dark:text-red-300 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/70 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/70 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>
          
          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign In
          </Button>
        </form>
      </div>
      
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary hover:underline transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
} 