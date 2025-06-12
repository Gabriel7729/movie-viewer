import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { Actor, Movie, PaginatedResponse } from '@/types';
import { apiService } from './api';

// Key factory for pagination
const getMoviesKey = (pageIndex: number, previousPageData: PaginatedResponse<Movie> | null) => {
  // Reached the end
  if (previousPageData && !previousPageData.data.length) return null;
  
  // First page, no previousPageData
  if (pageIndex === 0) return `movies-1`;
  
  // Add 1 to pageIndex because SWR starts at 0, but our API starts at 1
  return `movies-${pageIndex + 1}`;
};

const getActorsKey = (pageIndex: number, previousPageData: PaginatedResponse<Actor> | null) => {
  if (previousPageData && !previousPageData.data.length) return null;
  if (pageIndex === 0) return `actors-1`;
  return `actors-${pageIndex + 1}`;
};

// Movies hooks
export function useMovies(page = 1, limit = 10) {
  return useSWR(`movies-${page}`, async () => {
    const response = await apiService.getMovies(page, limit);
    return response;
  });
}

export function useInfiniteMovies(limit = 10) {
  return useSWRInfinite(
    getMoviesKey,
    async (key) => {
      const page = parseInt(key.split('-')[1]);
      const response = await apiService.getMovies(page, limit);
      return response;
    },
    {
      revalidateFirstPage: false
    }
  );
}

export function useMovie(id: number | null) {
  return useSWR(
    id ? `movie-${id}` : null,
    async () => {
      if (id === null) return null;
      const response = await apiService.getMovieById(id);
      return response.data;
    }
  );
}

export function useMovieSearch(query: string) {
  return useSWR(
    query ? `movie-search-${query}` : null,
    async () => {
      if (!query) return { data: [] };
      const response = await apiService.searchMovies(query);
      return response;
    }
  );
}

// Actors hooks
export function useActors(page = 1, limit = 10) {
  return useSWR(`actors-${page}`, async () => {
    const response = await apiService.getActors(page, limit);
    return response;
  });
}

export function useInfiniteActors(limit = 10) {
  return useSWRInfinite(
    getActorsKey,
    async (key) => {
      const page = parseInt(key.split('-')[1]);
      const response = await apiService.getActors(page, limit);
      return response;
    },
    {
      revalidateFirstPage: false
    }
  );
}

export function useActor(id: number | null) {
  return useSWR(
    id ? `actor-${id}` : null,
    async () => {
      if (id === null) return null;
      const response = await apiService.getActorById(id);
      return response.data;
    }
  );
}

export function useActorSearch(query: string) {
  return useSWR(
    query ? `actor-search-${query}` : null,
    async () => {
      if (!query) return { data: [] };
      const response = await apiService.searchActors(query);
      return response;
    }
  );
} 