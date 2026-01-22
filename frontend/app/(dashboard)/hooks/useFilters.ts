'use client';

import { useState, useMemo } from 'react';
import { Bull, BullFilters } from '@/lib/types/bull.types';

export function useFilters(bulls: Bull[], limit: number = 10) {
  const [filters, setFilters] = useState<BullFilters>({
    search: '',
    origin: 'todos',
    usage: undefined,
    coatColor: undefined,
    sort: 'desc',
  });

  const [page, setPage] = useState(1);

  // Filter logic
  const filteredBulls = useMemo(() => {
    let result = [...bulls];

    // Search filter (by earTag or name)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(bull =>
        bull.earTag.includes(filters.search) ||
        bull.name.toLowerCase().includes(searchLower)
      );
    }

    // Origin filter
    if (filters.origin && filters.origin !== 'todos') {
      if (filters.origin === 'favoritos') {
        result = result.filter(bull => bull.isFavorite);
      } else {
        result = result.filter(bull => bull.origin === filters.origin);
      }
    }

    // Usage filter
    if (filters.usage) {
      result = result.filter(bull => bull.usage === filters.usage);
    }

    // CoatColor filter
    if (filters.coatColor) {
      result = result.filter(bull => bull.coatColor === filters.coatColor);
    }

    // Sort by bullScore
    result.sort((a, b) =>
      filters.sort === 'desc'
        ? b.bullScore - a.bullScore
        : a.bullScore - b.bullScore
    );

    return result;
  }, [bulls, filters]);

  // Pagination
  const paginatedBulls = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredBulls.slice(start, start + limit);
  }, [filteredBulls, page, limit]);

  // Update filters helper
  const updateFilters = (newFilters: Partial<BullFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1); // Reset to first page when filters change
  };

  return {
    filters,
    setFilters: updateFilters,
    filteredBulls,
    paginatedBulls,
    page,
    setPage,
    totalPages: Math.ceil(filteredBulls.length / limit),
    totalResults: filteredBulls.length,
  };
}
