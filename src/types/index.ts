// Types for Movie Viewer application

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  poster: string;
  genre: string[];
  duration: number; // in minutes
  actors: number[]; // actor IDs
  ratings: Rating[];
}

export interface Actor {
  id: number;
  name: string;
  bio: string;
  photo: string;
  birthDate: string;
  movies: number[]; // movie IDs
}

export interface Rating {
  id: number;
  movieId: number;
  userId: number;
  value: number; // 1-5
  comment: string;
  date: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

// Authentication types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
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