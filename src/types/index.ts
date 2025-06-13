// Types for Movie Viewer application

// Base response type from backend
export interface BaseResponseDto<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

// Movie related types
export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  genre: string;
  duration: number;
  director: string;
  image?: string;
  actors?: Actor[];
  ratings?: Rating[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMovieDto {
  title: string;
  description: string;
  releaseDate: string;
  genre: string;
  duration: number;
  director: string;
  image?: string;
}

export interface UpdateMovieDto {
  title?: string;
  description?: string;
  releaseDate?: string;
  genre?: string;
  duration?: number;
  director?: string;
  image?: string;
}

// Actor related types
export interface Actor {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  image?: string;
  movies?: Movie[];
  createdAt?: string;
  updatedAt?: string;
}

// Rating related types
export interface Rating {
  id: number;
  rating: number;
  review?: string;
  reviewerName?: string;
  movieId: number;
  movie?: Movie;
  createdAt?: string;
  updatedAt?: string;
}

// Authentication types
export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponseDto {
  access_token: string;
  user: UserResponseDto;
}

export interface AuthState {
  user: UserResponseDto | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  name: string;
}

// Legacy types - keeping for compatibility
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 