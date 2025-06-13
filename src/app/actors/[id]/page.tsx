'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useActor } from '@/services/hooks';
import { Movie } from '@/types';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardTitle, CardDescription } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ActorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const actorId = typeof params.id === 'string' ? parseInt(params.id, 10) : null;
  
  const { data: actorResponse, error, isLoading } = useActor(actorId);
  const actor = actorResponse?.data;
  const movies = actor?.movies || [];
  
  // Calculate age from birthDate
  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };
  
  // Format date to display nicely
  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };
  
  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error || !actor) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Actor not found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The actor you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button onClick={() => router.push('/actors')}>Go Back to Actors</Button>
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
        {/* Actor Photo */}
        <div className="lg:col-span-1">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
            <Image 
              src={actor.image || 'https://via.placeholder.com/500x750?text=No+Image'} 
              alt={`${actor.firstName} ${actor.lastName}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          
          <div className="mt-6 bg-white/70 dark:bg-gray-700/70 backdrop-blur-md rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Personal Info</h2>
            
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Birth Date</h3>
                <p className="text-gray-800 dark:text-white">{formatDate(actor.birthDate)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Age</h3>
                <p className="text-gray-800 dark:text-white">{calculateAge(actor.birthDate)} years old</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Nationality</h3>
                <p className="text-gray-800 dark:text-white">{actor.nationality}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Movies</h3>
                <p className="text-gray-800 dark:text-white">
                  {movies.length} 
                  {movies.length === 1 ? ' movie' : ' movies'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actor Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
            {actor.firstName} {actor.lastName}
          </h1>
          
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Filmography</h2>
            
            {movies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {movies.map((movie: Movie) => (
                  <Link href={`/movies/${movie.id}`} key={movie.id}>
                    <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg cursor-pointer">
                      <div className="flex">
                        <div className="relative w-1/3 aspect-[2/3]">
                          <Image
                            src={movie.image || 'https://via.placeholder.com/300x450?text=No+Poster'}
                            alt={movie.title}
                            fill
                            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="w-2/3">
                          <CardTitle className="mb-1 text-base">{movie.title}</CardTitle>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            {new Date(movie.releaseDate).getFullYear()}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-1">
                            <Badge>{movie.genre}</Badge>
                          </div>
                          <CardDescription className="text-xs line-clamp-3 mt-1">{movie.description}</CardDescription>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No filmography information available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 