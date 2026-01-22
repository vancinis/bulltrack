import { Bull } from '@/lib/types/bull.types';
import BullCard from './BullCard';

interface BullListProps {
  bulls: Bull[];
  currentPage: number;
  limit: number;
  onToggleFavorite: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export default function BullList({
  bulls,
  currentPage,
  limit,
  onToggleFavorite,
  onViewDetails,
}: BullListProps) {
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
