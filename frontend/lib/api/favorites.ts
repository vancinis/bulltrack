import { apiClient } from './client';

interface FavoriteResponse {
  message: string;
  bullId: string;
}

export const favoritesService = {
  /**
   * Add a bull to user favorites
   */
  addFavorite: async (bullId: string): Promise<FavoriteResponse> => {
    const { data } = await apiClient.post<FavoriteResponse>(`/favorites/${bullId}`);
    return data;
  },

  /**
   * Remove a bull from user favorites
   */
  removeFavorite: async (bullId: string): Promise<FavoriteResponse> => {
    const { data } = await apiClient.delete<FavoriteResponse>(`/favorites/${bullId}`);
    return data;
  },
};
