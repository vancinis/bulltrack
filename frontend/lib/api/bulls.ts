import { apiClient } from './client';
import { Bull, BullApiResponse, BullFilters, BullQueryParams } from '@/lib/types/bull.types';

/**
 * Convert frontend filters to backend query params
 * - Remove 'todos' from origin (means no filter)
 * - Only include defined values
 */
const buildQueryParams = (filters: BullFilters): BullQueryParams => {
  const params: BullQueryParams = {};

  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;
  if (filters.search) params.search = filters.search;
  if (filters.usage) params.usage = filters.usage;
  if (filters.coatColor) params.coatColor = filters.coatColor;
  if (filters.sort) params.sort = filters.sort;

  // Only add origin if it's not 'todos'
  if (filters.origin && filters.origin !== 'todos') {
    params.origin = filters.origin;
  }

  return params;
};

export const bullsService = {
  /**
   * Get bulls with filters and pagination
   */
  getBulls: async (filters: BullFilters): Promise<BullApiResponse> => {
    const params = buildQueryParams(filters);
    const { data } = await apiClient.get<BullApiResponse>('/bulls', { params });
    return data;
  },

  /**
   * Get a single bull by ID
   */
  getBullById: async (id: string): Promise<Bull> => {
    const { data } = await apiClient.get<Bull>(`/bulls/${id}`);
    return data;
  },
};
