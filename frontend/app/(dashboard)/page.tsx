'use client';

import { getMockBulls } from '@/lib/data/mockBulls';
import { useState } from 'react';
import BullList from './components/BullList';
import FilterSidebar from './components/FilterSidebar';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import { useFilters } from './hooks/useFilters';

export default function Dashboard() {
  const allBulls = getMockBulls();
  const [bulls, setBulls] = useState(allBulls);

  const {
    filters,
    setFilters,
    paginatedBulls,
    page,
    setPage,
    totalPages,
    totalResults,
  } = useFilters(bulls, 10);

  const handleToggleFavorite = (id: string) => {
    setBulls(prevBulls =>
      prevBulls.map(bull =>
        bull.id === id ? { ...bull, isFavorite: !bull.isFavorite } : bull
      )
    );
  };

  const handleViewDetails = (id: string) => {
    console.log('View details for bull:', id);
    // TODO: Open modal or navigate to detail page
  };

  const handleSearchChange = (value: string) => {
    setFilters({ search: value });
  };

  return (
    <div className="flex w-full">
      {/* FilterSidebar */}
      <FilterSidebar filters={filters} onFilterChange={setFilters} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ranking de Toros</h1>
              <p className="text-gray-600 mt-1">
                Explora y compara los mejores toros genéticos
              </p>
            </div>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              Exportar
            </button>
          </div>

          {/* Criterios del Ranking (Accordion - Collapsed by default) */}
          <details className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
              <span>Criterios del ranking</span>
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-4 text-sm text-gray-600 space-y-2">
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

        {/* Search Bar */}
        <SearchBar
          value={filters.search}
          onChange={handleSearchChange}
          resultCount={totalResults}
        />

        {/* Bull List */}
        <BullList
          bulls={paginatedBulls}
          currentPage={page}
          limit={10}
          onToggleFavorite={handleToggleFavorite}
          onViewDetails={handleViewDetails}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
