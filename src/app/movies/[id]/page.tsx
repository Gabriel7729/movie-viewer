'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMovie } from '@/services/hooks';
import { apiService } from '@/services/api';
import { Actor } from '@/types';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = typeof params.id === 'string' ? parseInt(params.id, 10) : null;
  
  const { data: movie, error, isLoading } = useMovie(movieId);
  const [actors, setActors] = useState<Actor[]>([]);
  const [isLoadingActors, setIsLoadingActors] = useState(false);
  
  // Fetch actors for this movie
  useEffect(() => {
    const fetchActors = async () => {
      if (!movie || !movie.actors.length) return;
      
      setIsLoadingActors(true);
      try {
        // Fetch all actors that appear in this movie
        const actorsData: Actor[] = [];
        for (const actorId of movie.actors) {
          const response = await apiService.getActorById(actorId);
          if (response.data) {
            actorsData.push(response.data);
          }
        }
        setActors(actorsData);
      } catch (error) {
        console.error('Error fetching actors:', error);
      } finally {
        setIsLoadingActors(false);
      }
    };
    
    fetchActors();
  }, [movie]);
  
  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error || !movie) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Movie not found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The movie you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push('/movies')}>Go Back to Movies</Button>
      </div>
    );
  }
  
  return (
    <div>
      <Button 
        variant="link" 
        className="mb-4" 
        onClick={() => router.back()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <div className="lg:col-span-1">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="absolute top-0 left-0 w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://via.placeholder.com/500x750?text=No+Image';
              }}
            />
          </div>
        </div>
        
        {/* Movie Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {movie.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre.map((genre) => (
              <Badge key={genre}>{genre}</Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300 mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {movie.releaseYear}
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              {movie.ratings.length > 0 
                ? (movie.ratings.reduce((acc, rating) => acc + rating.value, 0) / movie.ratings.length).toFixed(1)
                : 'No ratings'
              }
              {movie.ratings.length > 0 && <span className="ml-1 text-sm">({movie.ratings.length})</span>}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Overview</h2>
            <p className="text-gray-600 dark:text-gray-300">{movie.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Cast</h2>
            
            {isLoadingActors ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : actors.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {actors.map((actor) => (
                  <Link href={`/actors/${actor.id}`} key={actor.id}>
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden transition-transform hover:scale-105 cursor-pointer">
                      <div className="relative w-full aspect-[3/4]">
                        <img
                          src={actor.photo}
                          alt={actor.name}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Photo';
                          }}
                        />
                      </div>
                      <div className="p-2 text-center">
                        <h3 className="font-medium text-gray-800 dark:text-white truncate">{actor.name}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No cast information available</p>
            )}
          </div>
          
          {movie.ratings.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Reviews</h2>
              
              <div className="space-y-4">
                {movie.ratings.map((rating) => (
                  <div key={rating.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                          {rating.value}
                        </div>
                        <span className="ml-2 font-medium text-gray-800 dark:text-white">User {rating.userId}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{rating.date}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{rating.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 