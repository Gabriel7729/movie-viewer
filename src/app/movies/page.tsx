'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useInfiniteMovies, useMovieSearch } from '@/services/hooks';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui/Card';
import SearchInput from '@/components/ui/SearchInput';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, size, setSize, isValidating } = useInfiniteMovies();
  const { data: searchResults } = useMovieSearch(searchQuery);
  
  // When searching, display search results, otherwise display infinite scroll data
  const displayData = searchQuery ? searchResults?.data || [] : data?.flatMap(page => page.data) || [];
  
  // Check if we've loaded all items
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const reachedEnd = data && data.some(page => page.data.length < page.limit);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Movies</h1>
          <p className="text-gray-600 dark:text-gray-300">Browse our extensive collection of movies</p>
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-64">
          <SearchInput 
            value={searchQuery} 
            onChange={setSearchQuery}
            placeholder="Search movies..."
          />
        </div>
      </div>
      
      {isLoading && !data ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : displayData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayData.map((movie) => (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg cursor-pointer">
                  <CardImage src={movie.poster} alt={movie.title} />
                  <CardContent>
                    <CardTitle>{movie.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {movie.genre.slice(0, 2).map((genre) => (
                        <Badge key={genre}>{genre}</Badge>
                      ))}
                      {movie.genre.length > 2 && <Badge>+{movie.genre.length - 2}</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {movie.releaseYear} • {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                    </p>
                    <CardDescription className="line-clamp-2">{movie.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {!searchQuery && !reachedEnd && (
            <div className="flex justify-center mt-8">
              <Button 
                onClick={() => setSize(size + 1)} 
                isLoading={isValidating}
                disabled={isLoadingMore}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <p className="text-xl text-gray-600 dark:text-gray-300">No movies found</p>
          {searchQuery && (
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try adjusting your search criteria
            </p>
          )}
        </div>
      )}
    </div>
  );
} 