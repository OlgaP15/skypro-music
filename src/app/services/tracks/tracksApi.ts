import axios from 'axios';
import { BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS } from '../constants';
import { TrackTypes } from '@/SharedTypes/sharedTypes';

// Строгая типизация для ответов API
interface BaseApiResponse {
  message?: string;
  success?: boolean;
}

interface FavoriteOperationResponse extends BaseApiResponse {
  trackId?: string;
  userId?: string;
}

export const getTracks = async (): Promise<TrackTypes[]> => {
  const response = await axios.get<TrackTypes[]>(`${BASE_URL}${API_ENDPOINTS.ALL_TRACKS}`, {
    headers: DEFAULT_HEADERS
  });
  return response.data;
};

export const getTrackById = async (id: string): Promise<TrackTypes> => {
  const response = await axios.get<TrackTypes>(`${BASE_URL}${API_ENDPOINTS.TRACK_BY_ID}${id}/`, {
    headers: DEFAULT_HEADERS
  });
  return response.data;
};

export const getFavoriteTracks = async (accessToken: string): Promise<TrackTypes[]> => {
  const response = await axios.get<TrackTypes[]>(`${BASE_URL}${API_ENDPOINTS.FAVORITE_TRACKS}`, {
    headers: {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${accessToken}`
    }
  });
  return response.data;
};

export const addToFavorites = async (id: string, accessToken: string): Promise<FavoriteOperationResponse> => {
  const response = await axios.post<FavoriteOperationResponse>(
    `${BASE_URL}${API_ENDPOINTS.TRACK_BY_ID}${id}${API_ENDPOINTS.ADD_TO_FAVORITE}`, 
    {}, 
    {
      headers: {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );
  return response.data;
};

export const removeFromFavorites = async (id: string, accessToken: string): Promise<FavoriteOperationResponse> => {
  const response = await axios.delete<FavoriteOperationResponse>(
    `${BASE_URL}${API_ENDPOINTS.TRACK_BY_ID}${id}${API_ENDPOINTS.REMOVE_FROM_FAVORITE}`, 
    {
      headers: {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );
  return response.data;
};