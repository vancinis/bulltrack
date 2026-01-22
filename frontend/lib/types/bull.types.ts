// Types matching backend Bull entity
export interface Bull {
  id: string;
  earTag: string;
  name: string;
  breed: string;
  coatColor: 'negro' | 'colorado';
  origin: 'propio' | 'catalogo';
  usage: 'vaquillona' | 'vaca';
  ageMonths: number;
  featuredTrait?: string;
  growth: number;
  calvingEase: number;
  reproduction: number;
  moderation: number;
  carcass: number;
  bullScore: number;
  isFavorite: boolean;
  imageUrl?: string;
}

export interface BullStats {
  growth: number;
  calvingEase: number;
  reproduction: number;
  moderation: number;
  carcass: number;
}

export interface BullFilters {
  search: string;
  origin?: 'todos' | 'propio' | 'catalogo' | 'favoritos';
  usage?: 'vaquillona' | 'vaca';
  coatColor?: 'negro' | 'colorado';
  sort: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Alias para la respuesta de la API de bulls
export type BullApiResponse = PaginatedResponse<Bull>;

// Tipo para los query params del backend (sin 'todos')
export interface BullQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  origin?: 'propio' | 'catalogo' | 'favoritos';
  usage?: 'vaquillona' | 'vaca';
  coatColor?: 'negro' | 'colorado';
  sort?: 'asc' | 'desc';
}
