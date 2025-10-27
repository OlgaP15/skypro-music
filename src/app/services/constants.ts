// Base URL for Skypro.Music API
export const BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNUP: '/user/signup/',
  LOGIN: '/user/login/',
  TOKEN: '/user/token/',
  REFRESH_TOKEN: '/user/token/refresh/',

  // Track endpoints
  ALL_TRACKS: '/catalog/track/all/',
  TRACK_BY_ID: '/catalog/track/', // + id
  FAVORITE_TRACKS: '/catalog/track/favorite/all/',
  ADD_TO_FAVORITE: '/catalog/track/', // + id + '/favorite/'
  REMOVE_FROM_FAVORITE: '/catalog/track/', // + id + '/favorite/'

  // Selection endpoints
  ALL_SELECTIONS: '/catalog/selection/all',
  SELECTION_BY_ID: '/catalog/selection/', // + id
  CREATE_SELECTION: '/catalog/selection',
};

// Default headers for API requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Token expiration time (in seconds)
export const TOKEN_EXPIRY = {
  ACCESS: 200, // 200 seconds as per documentation
  REFRESH: 7 * 24 * 60 * 60, // 7 days in seconds
};

// Local storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
};

// Response status codes
export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};