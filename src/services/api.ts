import axios from 'axios';
import { Actor, AuthResponseDto, BaseResponseDto, CreateMovieDto, LoginDto, Movie, Rating, RegisterDto, UpdateMovieDto } from '@/types';

// Create an axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication service
export const authService = {
  login: async (credentials: LoginDto): Promise<BaseResponseDto<AuthResponseDto>> => {
    try {
      const response = await api.post<BaseResponseDto<AuthResponseDto>>('/auth/login', credentials);
      
      // Store token in localStorage
      if (response.data.data.access_token) {
        localStorage.setItem('token', response.data.data.access_token);
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData: RegisterDto): Promise<BaseResponseDto<AuthResponseDto>> => {
    try {
      const response = await api.post<BaseResponseDto<AuthResponseDto>>('/auth/register', userData);
      
      // Store token in localStorage
      if (response.data.data.access_token) {
        localStorage.setItem('token', response.data.data.access_token);
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        return null;
      }
    }
    return null;
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};

// Movie service for backend API calls
export const movieService = {
  // Movies endpoints
  getAllMovies: async (): Promise<BaseResponseDto<Movie[]>> => {
    const response = await api.get<BaseResponseDto<Movie[]>>('/movies');
    return response.data;
  },
  
  getMovieById: async (id: number): Promise<BaseResponseDto<Movie>> => {
    try {
      // Try to get all movies and filter by ID
      const allMovies = await movieService.getAllMovies();
      const movie = allMovies.data.find(m => m.id === id);
      
      if (!movie) {
        throw new Error(`Movie with ID ${id} not found`);
      }
      
      // Get movie ratings if available
      try {
        const ratings = await ratingService.getMovieRatings(id);
        movie.ratings = ratings.data;
      } catch (error) {
        console.error('Failed to fetch movie ratings:', error);
      }
      
      // Get movie actors
      try {
        const actorsResponse = await movieService.getActorsByMovie(id);
        movie.actors = actorsResponse.data;
      } catch (error) {
        console.error('Failed to fetch movie actors:', error);
      }
      
      return {
        data: movie,
        message: 'Movie found',
        statusCode: 200
      };
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
      throw error;
    }
  },
  
  createMovie: async (movie: CreateMovieDto): Promise<BaseResponseDto<Movie>> => {
    const response = await api.post<BaseResponseDto<Movie>>('/movies', movie);
    return response.data;
  },
  
  updateMovie: async (id: number, movie: UpdateMovieDto): Promise<BaseResponseDto<Movie>> => {
    const response = await api.patch<BaseResponseDto<Movie>>(`/movies/${id}`, movie);
    return response.data;
  },
  
  deleteMovie: async (id: number): Promise<void> => {
    await api.delete(`/movies/${id}`);
  },
  
  getActorsByMovie: async (id: number): Promise<BaseResponseDto<Actor[]>> => {
    const response = await api.get<BaseResponseDto<Actor[]>>(`/movies/${id}/actors`);
    return response.data;
  }
};

// Actor service for backend API calls
export const actorService = {
  getAllActors: async (): Promise<BaseResponseDto<Actor[]>> => {
    const response = await api.get<BaseResponseDto<Actor[]>>('/actors');
    return response.data;
  },
  
  getActorById: async (id: number): Promise<BaseResponseDto<Actor>> => {
    try {
      // Try to get all actors and filter by ID
      const allActors = await actorService.getAllActors();
      const actor = allActors.data.find(a => a.id === id);
      
      if (!actor) {
        throw new Error(`Actor with ID ${id} not found`);
      }
      
      // Get actor's movies
      try {
        const moviesResponse = await actorService.getMoviesByActor(id);
        actor.movies = moviesResponse.data;
      } catch (error) {
        console.error('Failed to fetch actor movies:', error);
      }
      
      return {
        data: actor,
        message: 'Actor found',
        statusCode: 200
      };
    } catch (error) {
      console.error('Error fetching actor by ID:', error);
      throw error;
    }
  },
  
  getMoviesByActor: async (id: number): Promise<BaseResponseDto<Movie[]>> => {
    const response = await api.get<BaseResponseDto<Movie[]>>(`/actors/${id}/movies`);
    return response.data;
  }
};

// Rating service for backend API calls
export const ratingService = {
  getAllRatings: async (): Promise<BaseResponseDto<Rating[]>> => {
    const response = await api.get<BaseResponseDto<Rating[]>>('/ratings');
    return response.data;
  },
  
  getMovieRatings: async (movieId: number): Promise<BaseResponseDto<Rating[]>> => {
    try {
      // Get all ratings and filter by movie ID
      const allRatings = await ratingService.getAllRatings();
      const movieRatings = allRatings.data.filter(r => r.movieId === movieId);
      
      return {
        data: movieRatings,
        message: `Ratings for movie ${movieId} found`,
        statusCode: 200
      };
    } catch (error) {
      console.error('Error fetching movie ratings:', error);
      throw error;
    }
  },
  
  addRating: async (rating: { movieId: number; rating: number; review?: string; reviewerName?: string }): Promise<BaseResponseDto<Rating>> => {
    const response = await api.post<BaseResponseDto<Rating>>('/ratings', rating);
    return response.data;
  }
};

export default api; 