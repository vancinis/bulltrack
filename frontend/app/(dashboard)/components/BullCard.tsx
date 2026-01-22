'use client';

import Badge from '@/components/ui/Badge';
import Checkbox from '@/components/ui/Checkbox';
import { Bull } from '@/lib/types/bull.types';
import Image from 'next/image';
import BullRadarChart from './BullRadarChart';
import BullScoreBar from './BullScoreBar';

interface BullCardProps {
  readonly bull: Bull;
  readonly rank: number;
  readonly onToggleFavorite: (id: string) => void;
  readonly onViewDetails: (id: string) => void;
}

export default function BullCard({ bull, rank, onToggleFavorite, onViewDetails }: BullCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg hover:border-green-500 transition-all duration-200">
      <div className="grid grid-cols-[auto_100px_1fr_auto_140px_auto] gap-4 items-center">
        {/* Column 1 - Checkbox & Rank */}
        <div className="flex flex-col items-center space-y-2">
          <Checkbox />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-900">#{rank}</span>
            {rank <= 3 && (
              <span className="text-xs text-green-600 font-semibold">TOP {rank}</span>
            )}
          </div>
        </div>

        {/* Column 2 - Image */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
          {bull.imageUrl ? (
            <Image
              src={bull.imageUrl}
              alt={bull.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
              </svg>
            </div>
          )}
        </div>

        {/* Column 3 - Info */}
        <div className="flex flex-col space-y-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Toro #{bull.earTag}</h3>
            <p className="text-sm text-gray-600">{bull.breed} · {bull.ageMonths} meses</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant={bull.origin === 'propio' ? 'primary' : 'secondary'} size="sm">
              {bull.origin === 'propio' ? 'Propio' : 'Catálogo'}
            </Badge>
            <Badge variant="outline" size="sm">
              Para {bull.usage}
            </Badge>
          </div>
        </div>

        {/* Column 4 - Bull Score */}
        <div className="flex flex-col items-center space-y-2">
          <BullScoreBar score={bull.bullScore} showLabel={true} />
          {bull.featuredTrait && (
            <p className="text-xs text-green-600 text-center font-medium">
              {bull.featuredTrait}
            </p>
          )}
        </div>

        {/* Column 5 - Radar Chart */}
        <div className="flex items-center justify-center">
          <BullRadarChart
            growth={bull.growth}
            calvingEase={bull.calvingEase}
            reproduction={bull.reproduction}
            moderation={bull.moderation}
            carcass={bull.carcass}
          />
        </div>

        {/* Column 6 - Actions */}
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => onViewDetails(bull.id)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Ver detalles"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          <button
            onClick={() => onToggleFavorite(bull.id)}
            className={`p-2 rounded-full transition-colors ${
              bull.isFavorite
                ? 'bg-red-100 hover:bg-red-200 text-red-600'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
            title={bull.isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
          >
            <svg
              className="w-5 h-5"
              fill={bull.isFavorite ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
