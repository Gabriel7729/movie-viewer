import axios from 'axios';
import { Actor, ApiResponse, LoginCredentials, Movie, PaginatedResponse, Rating, RegisterCredentials, User } from '@/types';

// Mock data
const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    releaseYear: 2010,
    poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy71SPU58RSJu.jpg',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    duration: 148,
    actors: [1, 2, 3],
    ratings: [
      { id: 1, movieId: 1, userId: 1, value: 5, comment: 'Masterpiece!', date: '2023-01-15' },
      { id: 2, movieId: 1, userId: 2, value: 4, comment: 'Mind-blowing concept', date: '2023-02-10' }
    ]
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    releaseYear: 1994,
    poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    genre: ['Drama'],
    duration: 142,
    actors: [4, 5],
    ratings: [
      { id: 3, movieId: 2, userId: 1, value: 5, comment: 'One of the best movies ever made!', date: '2023-03-05' }
    ]
  },
  {
    id: 3,
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    releaseYear: 2008,
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    genre: ['Action', 'Crime', 'Drama'],
    duration: 152,
    actors: [6, 7, 8],
    ratings: [
      { id: 4, movieId: 3, userId: 2, value: 5, comment: 'Heath Ledger\'s Joker is incredible', date: '2023-01-25' }
    ]
  }
];

const mockActors: Actor[] = [
  {
    id: 1,
    name: 'Leonardo DiCaprio',
    bio: 'Leonardo Wilhelm DiCaprio is an American actor, film producer, and environmentalist.',
    photo: 'https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg',
    birthDate: '1974-11-11',
    movies: [1]
  },
  {
    id: 2,
    name: 'Joseph Gordon-Levitt',
    bio: 'Joseph Leonard Gordon-Levitt is an American actor, filmmaker, singer, and entrepreneur.',
    photo: 'https://image.tmdb.org/t/p/w500/4U9G4YR9wZmYG9CH0W7QJ3WoYRZ.jpg',
    birthDate: '1981-02-17',
    movies: [1]
  },
  {
    id: 3,
    name: 'Ellen Page',
    bio: 'Elliot Page is a Canadian actor and producer.',
    photo: 'https://image.tmdb.org/t/p/w500/vDZWIzsWKd6kzlVo0j4QvBcMO1W.jpg',
    birthDate: '1987-02-21',
    movies: [1]
  },
  {
    id: 4,
    name: 'Tim Robbins',
    bio: 'Timothy Francis Robbins is an American actor, screenwriter, director, producer, and musician.',
    photo: 'https://image.tmdb.org/t/p/w500/6B54wm8YTFgQDO0JrALf9tyVN8R.jpg',
    birthDate: '1958-10-16',
    movies: [2]
  },
  {
    id: 5,
    name: 'Morgan Freeman',
    bio: 'Morgan Freeman is an American actor, director, and narrator.',
    photo: 'https://image.tmdb.org/t/p/w500/oIciQWr8VwKoR8TmAw1owaiZFyb.jpg',
    birthDate: '1937-06-01',
    movies: [2]
  },
  {
    id: 6,
    name: 'Christian Bale',
    bio: 'Christian Charles Philip Bale is an English actor.',
    photo: 'https://image.tmdb.org/t/p/w500/GFW2N0knGUje4qMUUxdz2ZPTva.jpg',
    birthDate: '1974-01-30',
    movies: [3]
  },
  {
    id: 7,
    name: 'Heath Ledger',
    bio: 'Heath Andrew Ledger was an Australian actor and music video director.',
    photo: 'https://image.tmdb.org/t/p/w500/3TL1TsSqF8bPEzElRwXj4VZdKHQ.jpg',
    birthDate: '1979-04-04',
    movies: [3]
  },
  {
    id: 8,
    name: 'Aaron Eckhart',
    bio: 'Aaron Edward Eckhart is an American actor.',
    photo: 'https://image.tmdb.org/t/p/w500/3MogeUYo8wVHK9xT93oVbGLBfIT.jpg',
    birthDate: '1968-03-12',
    movies: [3]
  }
];

const mockUsers: User[] = [
  { id: 1, username: 'moviefan123', email: 'moviefan123@example.com' },
  { id: 2, username: 'cinephile', email: 'cinephile@example.com' }
];

// Create an axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions with mocked data
export const apiService = {
  // Movies endpoints
  getMovies: async (page = 1, limit = 10): Promise<PaginatedResponse<Movie>> => {
    await delay(500); // Simulate network delay
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedMovies = mockMovies.slice(startIndex, endIndex);
    
    return {
      data: paginatedMovies,
      total: mockMovies.length,
      page,
      limit,
      totalPages: Math.ceil(mockMovies.length / limit)
    };
  },
  
  getMovieById: async (id: number): Promise<ApiResponse<Movie | null>> => {
    await delay(300);
    const movie = mockMovies.find(movie => movie.id === id);
    
    return {
      data: movie || null,
      message: movie ? 'Movie found' : 'Movie not found'
    };
  },
  
  searchMovies: async (query: string): Promise<ApiResponse<Movie[]>> => {
    await delay(400);
    const filteredMovies = mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) || 
      movie.description.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      data: filteredMovies,
      message: `Found ${filteredMovies.length} movies`
    };
  },
  
  // Actors endpoints
  getActors: async (page = 1, limit = 10): Promise<PaginatedResponse<Actor>> => {
    await delay(500);
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedActors = mockActors.slice(startIndex, endIndex);
    
    return {
      data: paginatedActors,
      total: mockActors.length,
      page,
      limit,
      totalPages: Math.ceil(mockActors.length / limit)
    };
  },
  
  getActorById: async (id: number): Promise<ApiResponse<Actor | null>> => {
    await delay(300);
    const actor = mockActors.find(actor => actor.id === id);
    
    return {
      data: actor || null,
      message: actor ? 'Actor found' : 'Actor not found'
    };
  },
  
  searchActors: async (query: string): Promise<ApiResponse<Actor[]>> => {
    await delay(400);
    const filteredActors = mockActors.filter(actor => 
      actor.name.toLowerCase().includes(query.toLowerCase()) || 
      actor.bio.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      data: filteredActors,
      message: `Found ${filteredActors.length} actors`
    };
  },
  
  // Authentication endpoints
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{user: User, token: string}>> => {
    await delay(700);
    // This is mock authentication - would actually validate against a backend
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (user) {
      return {
        data: {
          user,
          token: 'mock-jwt-token'
        },
        message: 'Login successful'
      };
    } else {
      throw new Error('Invalid credentials');
    }
  },
  
  register: async (credentials: RegisterCredentials): Promise<ApiResponse<{user: User, token: string}>> => {
    await delay(800);
    
    // Check if user exists
    const existingUser = mockUsers.find(u => u.email === credentials.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create a new user - in a real app this would be done by the server
    const newUser: User = {
      id: mockUsers.length + 1,
      username: credentials.username,
      email: credentials.email
    };
    
    mockUsers.push(newUser);
    
    return {
      data: {
        user: newUser,
        token: 'mock-jwt-token'
      },
      message: 'Registration successful'
    };
  },
  
  logout: async (): Promise<ApiResponse<null>> => {
    await delay(300);
    return {
      data: null,
      message: 'Logout successful'
    };
  },
  
  getCurrentUser: async (): Promise<ApiResponse<User | null>> => {
    await delay(400);
    // In a real app, this would validate the token and return the current user
    return {
      data: mockUsers[0],
      message: 'User fetched successfully'
    };
  }
};

export default api; 