'use client';
import { Bull } from '@/lib/types/bull.types';
import BullCard from './BullCard';

interface BullListProps {
  readonly bulls: Bull[];
  readonly currentPage: number;
  readonly limit: number;
  readonly onToggleFavorite: (id: string) => void;
  readonly onViewDetails: (id: string) => void;
  readonly isLoading?: boolean;
}

function BullCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
      <div className="flex items-center gap-6 w-full">
        {/* Checkbox and Rank */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="w-12 h-8 bg-gray-200 rounded"></div>
        </div>

        {/* Image */}
        <div className="w-24 h-24 bg-gray-200 rounded-2xl"></div>

        {/* Info */}
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>

        {/* Divider */}
        <div className="h-20 w-px bg-gray-200"></div>

        {/* Bull Score */}
        <div className="w-48 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-2 bg-gray-200 rounded w-full"></div>
        </div>

        {/* Divider */}
        <div className="h-20 w-px bg-gray-200"></div>

        {/* Radar Chart */}
        <div className="w-32 h-32 bg-gray-200 rounded-full"></div>

        {/* Actions */}
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
          <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default function BullList({
  bulls,
  currentPage,
  limit,
  onToggleFavorite,
  onViewDetails,
  isLoading = false,
}: BullListProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: limit }).map((_, index) => (
          <BullCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Empty state
  if (bulls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-gray-500 text-lg">No se encontraron resultados</p>
        <p className="text-gray-400 text-sm mt-2">Intenta ajustar los filtros o la búsqueda</p>
      </div>
    );
  }

  // Normal state - show bulls
  return (
    <div className="space-y-4">
      {bulls.map((bull, index) => {
        const rank = (currentPage - 1) * limit + index + 1;
        return (
          <BullCard
            key={bull.id}
            bull={bull}
            rank={rank}
            onToggleFavorite={onToggleFavorite}
            onViewDetails={onViewDetails}
          />
        );
      })}
    </div>
  );
}
