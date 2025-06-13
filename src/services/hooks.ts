import useSWR, { mutate } from 'swr';
import useSWRInfinite from 'swr/infinite';
import { Actor, BaseResponseDto, CreateMovieDto, Movie, UpdateMovieDto } from '@/types';
import { movieService } from './api';
import api from './api';

// Movies hooks
export function useMovies() {
  return useSWR('movies', () => movieService.getAllMovies());
}

// Key factory for pagination
const getMoviesKey = (pageIndex: number, previousPageData: any) => {
  // Reached the end
  if (previousPageData && previousPageData.data?.length === 0) return null;
  
  // First page, no previousPageData
  if (pageIndex === 0) return 'movies-page-1';
  
  // Add 1 to pageIndex because SWR starts at 0
  return `movies-page-${pageIndex + 1}`;
};

export function useInfiniteMovies(limit = 10) {
  return useSWRInfinite(
    getMoviesKey,
    async (key) => {
      // Extract page number from key
      const page = parseInt(key.split('-page-')[1]) || 1;
      
      try {
        // Fetch movies for the page
        const response = await api.get(`/movies?page=${page}&limit=${limit}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching movies:', error);
        // Return empty data on error to prevent further fetching
        return { data: [] };
      }
    },
    {
      revalidateFirstPage: false,
      revalidateAll: false, // Don't revalidate all pages on focus/reconnect
      persistSize: true // Maintain the size when data is updated
    }
  );
}

export function useMovieSearch(query: string) {
  return useSWR(
    query ? `movie-search-${query}` : null,
    async () => {
      if (!query) return { data: [] };
      
      try {
        // Try the specific search endpoint first
        const response = await api.get(`/movies/search?query=${encodeURIComponent(query)}`);
        return response.data;
      } catch (error) {
        console.error('Search endpoint error, falling back to filter:', error);
        // Fall back to filtering all movies if search endpoint fails
        const allMovies = await movieService.getAllMovies();
        const filteredMovies = allMovies.data.filter(movie => 
          movie.title.toLowerCase().includes(query.toLowerCase()) || 
          movie.description.toLowerCase().includes(query.toLowerCase())
        );
        return { 
          data: filteredMovies,
          message: `Found ${filteredMovies.length} movies matching "${query}"`
        };
      }
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000 // Cache the search results for 10 seconds
    }
  );
}

export function useMovie(id: number | null) {
  return useSWR(
    id ? `movie-${id}` : null,
    () => id !== null ? movieService.getMovieById(id) : null
  );
}

export function useMovieActors(movieId: number | null) {
  return useSWR(
    movieId ? `movie-actors-${movieId}` : null,
    () => movieId !== null ? movieService.getActorsByMovie(movieId) : null
  );
}

// Actors hooks
// Key factory for pagination
const getActorsKey = (pageIndex: number, previousPageData: any) => {
  // Reached the end
  if (previousPageData && previousPageData.data?.length === 0) return null;
  
  // First page, no previousPageData
  if (pageIndex === 0) return 'actors-page-1';
  
  // Add 1 to pageIndex because SWR starts at 0
  return `actors-page-${pageIndex + 1}`;
};

export function useInfiniteActors(limit = 10) {
  return useSWRInfinite(
    getActorsKey,
    async (key) => {
      // Extract page number from key
      const page = parseInt(key.split('-page-')[1]) || 1;
      
      try {
        // Fetch actors for the page
        const response = await api.get(`/actors?page=${page}&limit=${limit}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching actors:', error);
        // Return empty data on error to prevent further fetching
        return { data: [] };
      }
    },
    {
      revalidateFirstPage: false,
      revalidateAll: false, // Don't revalidate all pages on focus/reconnect
      persistSize: true // Maintain the size when data is updated
    }
  );
}

export function useActorSearch(query: string) {
  return useSWR(
    query ? `actor-search-${query}` : null,
    async () => {
      if (!query) return { data: [] };
      
      try {
        // Try the specific search endpoint first
        const response = await api.get(`/actors/search?query=${encodeURIComponent(query)}`);
        return response.data;
      } catch (error) {
        console.error('Search endpoint error, falling back to filter:', error);
        // Fall back to filtering all actors if search endpoint fails
        const response = await api.get('/actors');
        const actors = response.data.data || [];
        const filteredActors = actors.filter((actor: Actor) => 
          (actor.firstName + ' ' + actor.lastName).toLowerCase().includes(query.toLowerCase()) ||
          actor.nationality.toLowerCase().includes(query.toLowerCase())
        );
        return { 
          data: filteredActors,
          message: `Found ${filteredActors.length} actors matching "${query}"`
        };
      }
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000 // Cache the search results for 10 seconds
    }
  );
}

// Movie mutations
export function useMovieMutations() {
  const invalidateMovies = () => {
    mutate('movies');
  };

  const invalidateMovie = (id: number) => {
    mutate(`movie-${id}`);
  };

  const createMovie = async (data: CreateMovieDto) => {
    const result = await movieService.createMovie(data);
    invalidateMovies();
    return result;
  };

  const updateMovie = async (id: number, data: UpdateMovieDto) => {
    const result = await movieService.updateMovie(id, data);
    invalidateMovies();
    invalidateMovie(id);
    return result;
  };

  const deleteMovie = async (id: number) => {
    await movieService.deleteMovie(id);
    invalidateMovies();
  };

  return {
    createMovie,
    updateMovie,
    deleteMovie
  };
} 