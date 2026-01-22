'use client';

import { Bull } from '@/lib/types/bull.types';
import { useEffect, useState } from 'react';
import BullList from './components/BullList';
import FilterSidebar from './components/FilterSidebar';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import { useBulls } from './hooks/useBulls';
import { useFavorites } from './hooks/useFavorites';
import { useFilters } from './hooks/useFilters';

export default function Dashboard() {
  const { filters, setFilters, setPage } = useFilters(4);

  const { bulls, loading, error, pagination, refetch } = useBulls(filters);
  const { toggleFavorite, error: favoriteError } = useFavorites();

  // Local state to persist bull updates
  const [localBulls, setLocalBulls] = useState<Bull[]>([]);

  // State for mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync localBulls when bulls from API change
  useEffect(() => {
    setLocalBulls(bulls);
  }, [bulls]);

  const handleToggleFavorite = async (id: string) => {
    const bull = localBulls.find(b => b.id === id);
    if (!bull) return;

    const currentStatus = bull.isFavorite;
    const newStatus = !currentStatus;

    // Optimistic update - update local state immediately
    const updatedBulls = localBulls.map(b =>
      b.id === id ? { ...b, isFavorite: newStatus } : b
    );
    setLocalBulls(updatedBulls);

    // Call API
    const success = await toggleFavorite(id, currentStatus);

    if (!success) {
      // Revert optimistic update on error
      setLocalBulls(bulls);
    } else if (filters.origin === 'favoritos' && !newStatus) {
      // Special case: if we're viewing favorites and removed one,
      // refetch to remove it from the list
      await refetch();
    }
  };

  const handleViewDetails = (id: string) => {
    console.log('View details for bull:', id);
    // TODO: Open modal or navigate to detail page
  };

  const handleSearchChange = (value: string) => {
    setFilters({ search: value });
  };

  return (
    <div className="flex w-full bg-black relative">
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden z-30 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        aria-label="Abrir filtros"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>

      {/* FilterSidebar */}
      <FilterSidebar
        filters={filters}
        onFilterChange={setFilters}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-[#F9FAFB] rounded-t-4xl">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <span>Datos actualizados hace 2 min</span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Resultados de la clasificación</h1>
              <p className="text-gray-600 mt-1 text-sm">
                Los resultados están ordenados por Bulltrack Score que reflejan tus objetivos de producción
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
              Exportar
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>

          {/* Criterios del Ranking (Accordion) */}
          <details className="group bg-gray-100 rounded-lg p-3 mb-6 cursor-pointer">
            <summary className="font-semibold text-gray-900 flex items-center justify-between list-none">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Criterios del ranking</span>
              </div>
              <svg className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-4 text-sm text-gray-600 space-y-2 pl-7">
              <p>El Bull Score se calcula usando los siguientes pesos:</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Crecimiento: 30%</li>
                <li>Facilidad de Parto: 25%</li>
                <li>Reproducción: 20%</li>
                <li>Moderación: 15%</li>
                <li>Carcasa: 10%</li>
              </ul>
            </div>
          </details>
        </div>

        {/* Error State - Bulls Loading */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
            <button
              onClick={refetch}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Intentar nuevamente
            </button>
          </div>
        )}

        {/* Error State - Favorites */}
        {favoriteError && (
          <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-700">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{favoriteError}</span>
            </div>
          </div>
        )}

        {/* Search Bar & Results Row */}
        <SearchBar
          value={filters.search}
          onChange={handleSearchChange}
          resultCount={pagination.total}
        />

        {/* Bull List */}
        <BullList
          bulls={localBulls}
          currentPage={pagination.page}
          limit={pagination.limit}
          onToggleFavorite={handleToggleFavorite}
          onViewDetails={handleViewDetails}
          isLoading={loading}
        />

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
