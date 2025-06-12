'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '@/services/api';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Since we're using mock data, you can use this email to login
  const mockUserEmail = 'moviefan123@example.com';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await apiService.login({ email, password });
      
      // In a real app, we'd store the token and user info in a context or state management
      console.log('Login successful', response);
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
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
              placeholder={`Try with "${mockUserEmail}"`}
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
              placeholder="Any password will work for the demo"
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