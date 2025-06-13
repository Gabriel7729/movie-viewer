import axios from 'axios';
import { Actor, ApiResponse, BaseResponseDto, CreateMovieDto, LoginCredentials, Movie, PaginatedResponse, RegisterCredentials, UpdateMovieDto, User } from '@/types';

// Create an axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
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

// Movie service for backend API calls
export const movieService = {
  // Movies endpoints
  getAllMovies: async (): Promise<BaseResponseDto<Movie[]>> => {
    const response = await api.get<BaseResponseDto<Movie[]>>('/movies');
    return response.data;
  },
  
  getMovieById: async (id: number): Promise<BaseResponseDto<Movie>> => {
    const response = await api.get<BaseResponseDto<Movie>>(`/movies/${id}`);
    return response.data;
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

export default api; 