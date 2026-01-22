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
    <div className="flex w-full bg-black">
      {/* FilterSidebar */}
      <FilterSidebar filters={filters} onFilterChange={setFilters} />

      {/* Main Content */}
      <div className="flex-1 py-6 px-10 bg-[#F9FAFB] rounded-t-4xl">
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

        {/* Search Bar & Results Row */}
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
