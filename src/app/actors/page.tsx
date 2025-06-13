'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInfiniteActors, useActorSearch } from '@/services/hooks';
import Card, { CardContent, CardTitle } from '@/components/ui/Card';
import SearchInput from '@/components/ui/SearchInput';
import { Actor } from '@/types';

export default function ActorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { data, isLoading } = useInfiniteActors();
  const { data: searchResults, isLoading: isSearchLoading } = useActorSearch(debouncedQuery);
  
  // Set up debounced search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // When searching, display search results, otherwise display infinite scroll data
  const displayData = debouncedQuery 
    ? searchResults?.data || [] 
    : data?.flatMap(page => page.data) || [];
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Actors</h1>
          <p className="text-gray-600 dark:text-gray-300">Discover talented actors and their filmography</p>
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-64">
          <SearchInput 
            value={searchQuery} 
            onChange={setSearchQuery}
            placeholder="Search actors..."
          />
        </div>
      </div>
      
      {(isLoading && !data) || (debouncedQuery && isSearchLoading) ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : displayData.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {displayData.map((actor: Actor) => (
              <Link href={`/actors/${actor.id}`} key={actor.id}>
                <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div className="relative aspect-[3/4]">
                    <Image 
                      src={actor.image || 'https://via.placeholder.com/300x400?text=No+Photo'} 
                      alt={`${actor.firstName} ${actor.lastName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent>
                    <CardTitle className="text-center">{actor.firstName} {actor.lastName}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      {actor.nationality}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <p className="text-xl text-gray-600 dark:text-gray-300">No actors found</p>
          {debouncedQuery && (
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try adjusting your search criteria
            </p>
          )}
        </div>
      )}
    </div>
  );
} 