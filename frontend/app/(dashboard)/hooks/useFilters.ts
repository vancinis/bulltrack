'use client';

import { BullFilters } from '@/lib/types/bull.types';
import { useState } from 'react';

/**
 * Hook to manage filter state
 * Filtering is now done server-side, this only manages the state
 */
export function useFilters(limit: number = 10) {
  const [filters, setFilters] = useState<BullFilters>({
    search: '',
    origin: 'todos',
    usage: undefined,
    coatColor: undefined,
    sort: 'desc',
    page: 1,
    limit,
  });

  // Update filters helper - resets to page 1 when filters change
  const updateFilters = (newFilters: Partial<BullFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      // Reset to page 1 when any filter changes (except page itself)
      page: newFilters.page ?? 1,
    }));
  };

  // Set page without resetting other filters
  const setPage = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return {
    filters,
    setFilters: updateFilters,
    setPage,
  };
}
