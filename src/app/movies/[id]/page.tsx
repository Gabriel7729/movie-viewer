'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useMovie, useMovieActors, useMovieRatings } from '@/services/hooks';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = typeof params.id === 'string' ? parseInt(params.id, 10) : null;
  
  const { data: movieResponse, error, isLoading } = useMovie(movieId);
  const { data: actorsResponse, isLoading: isLoadingActors } = useMovieActors(movieId);
  const { data: ratingsResponse, isLoading: isLoadingRatings } = useMovieRatings(movieId);
  
  const movie = movieResponse?.data;
  const actors = actorsResponse?.data || [];
  const ratings = ratingsResponse?.data || movie?.ratings || [];
  
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
          The movie you&apos;re looking for doesn&apos;t exist or has been removed.
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
            <Image 
              src={movie.image || 'https://via.placeholder.com/500x750?text=No+Image'} 
              alt={movie.title} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Movie Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {movie.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>{movie.genre}</Badge>
          </div>
          
          <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300 mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {new Date(movie.releaseDate).getFullYear()}
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              Director: {movie.director}
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
                    <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-md rounded-lg shadow overflow-hidden transition-transform hover:scale-105 cursor-pointer">
                      <div className="relative w-full aspect-[3/4]">
                        <Image
                          src={actor.image || 'https://via.placeholder.com/300x400?text=No+Photo'}
                          alt={`${actor.firstName} ${actor.lastName}`}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <h3 className="font-medium text-gray-800 dark:text-white truncate">{actor.firstName} {actor.lastName}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No cast information available</p>
            )}
          </div>
          
          {ratings.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Reviews</h2>
              
              {isLoadingRatings ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {ratings.map((rating) => (
                    <div key={rating.id} className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-md rounded-lg shadow-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="bg-primary-light/20 dark:bg-primary-dark/30 rounded-full w-8 h-8 flex items-center justify-center text-primary dark:text-primary-light font-bold">
                            {rating.rating}
                          </div>
                          <span className="ml-2 font-medium text-gray-800 dark:text-white">
                            {rating.reviewerName || 'Anonymous'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {rating.createdAt ? new Date(rating.createdAt).toLocaleDateString() : 'Unknown date'}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{rating.review}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 