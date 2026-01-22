import { useState } from 'react';
import { favoritesService } from '@/lib/api/favorites';

interface UseFavoritesReturn {
  toggleFavorite: (bullId: string, currentStatus: boolean) => Promise<boolean>;
  isLoading: (bullId: string) => boolean;
  error: string | null;
}

/**
 * Custom hook for managing favorites with optimistic updates
 */
export function useFavorites(): UseFavoritesReturn {
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const toggleFavorite = async (
    bullId: string,
    currentStatus: boolean
  ): Promise<boolean> => {
    // Add to loading set
    setLoadingIds((prev) => new Set(prev).add(bullId));
    setError(null);

    try {
      if (currentStatus) {
        // Remove from favorites
        await favoritesService.removeFavorite(bullId);
      } else {
        // Add to favorites
        await favoritesService.addFavorite(bullId);
      }

      // Success - return true
      return true;
    } catch (err: any) {
      // Error - set error message and return false
      const errorMessage =
        err.response?.data?.message || 'Error al actualizar favoritos';
      setError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
      console.error('Error toggling favorite:', err);
      return false;
    } finally {
      // Remove from loading set
      setLoadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(bullId);
        return newSet;
      });
    }
  };

  const isLoading = (bullId: string): boolean => {
    return loadingIds.has(bullId);
  };

  return {
    toggleFavorite,
    isLoading,
    error,
  };
}
