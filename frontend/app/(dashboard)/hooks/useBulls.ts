import { bullsService } from '@/lib/api/bulls';
import { Bull, BullFilters } from '@/lib/types/bull.types';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseBullsReturn {
  bulls: Bull[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching bulls with filters
 * Includes debounce for search and AbortController for cancellation
 */
export function useBulls(filters: BullFilters): UseBullsReturn {
  const [bulls, setBulls] = useState<Bull[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  // Ref to store the abort controller
  const abortControllerRef = useRef<AbortController | null>(null);

  // Ref to store the debounce timer
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchBulls = useCallback(async (currentFilters: BullFilters) => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await bullsService.getBulls(currentFilters);

      setBulls(response.data);
      setPagination({
        total: response.total,
        page: response.page,
        limit: response.limit,
        totalPages: response.totalPages,
      });
    } catch (err: any) {
      // Don't set error if request was aborted
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
        const errorMessage = err.response?.data?.message || 'Error al cargar los toros';
        setError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
        setBulls([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // If search is being typed, debounce it
    if (filters.search !== undefined && filters.search !== '') {
      debounceTimerRef.current = setTimeout(() => {
        fetchBulls(filters);
      }, 500); // 500ms debounce
    } else {
      // For other filters, fetch immediately
      fetchBulls(filters);
    }

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [filters, fetchBulls]);

  const refetch = useCallback(async () => {
    await fetchBulls(filters);
  }, [filters, fetchBulls]);

  return {
    bulls,
    loading,
    error,
    pagination,
    refetch,
  };
}
