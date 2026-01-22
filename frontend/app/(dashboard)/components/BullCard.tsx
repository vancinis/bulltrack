'use client';

import Badge from '@/components/ui/Badge';
import Checkbox from '@/components/ui/Checkbox';
import { Bull } from '@/lib/types/bull.types';
import Image from 'next/image';
import BullRadarChart from './BullRadarChart';

interface BullCardProps {
  readonly bull: Bull;
  readonly rank: number;
  readonly onToggleFavorite: (id: string) => void;
  readonly onViewDetails: (id: string) => void;
}

export default function BullCard({ bull, rank, onToggleFavorite, onViewDetails }: BullCardProps) {
  // Convert bullScore from 0-100 scale to 0-1 scale for display
  const normalizedScore = bull.bullScore / 100;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-6">
        {/* Checkbox & Rank - Vertical Stack */}
        <div className="flex flex-col items-center gap-3 w-12">
          <Checkbox className="h-5 w-5 rounded border-2 border-blue-500 bg-white cursor-pointer" />
          <span className="text-3xl font-bold text-gray-800">#{rank}</span>
        </div>

        {/* Image */}
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
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

        {/* Info */}
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="text-xl font-bold text-gray-900">Toro #{bull.earTag}</h3>
          <p className="text-sm text-gray-600">{bull.breed} . {bull.ageMonths} meses</p>

          <div className="flex gap-2 mt-2">
            <Badge
              variant="primary"
              size="sm"
            >
              {bull.origin === 'propio' ? 'Propio' : 'Catálogo'}
            </Badge>
            <Badge variant="secondary" size="sm">
              Para {bull.usage}
            </Badge>
          </div>
        </div>

        {/* Vertical Divider 1 */}
        <div className="h-24 w-px bg-gray-200 mx-4"></div>

        {/* Bull Score */}
        <div className="flex flex-col gap-2 min-w-[240px]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              BULL SCORE
            </span>
            <span className="text-3xl font-bold text-gray-900">
              {normalizedScore.toFixed(1)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
            <div
              className="h-full bg-[#4ade80] rounded-full"
              style={{ width: `${bull.bullScore}%` }}
            />
          </div>

          {bull.featuredTrait && (
            <p className="text-sm text-gray-700 font-medium">
              {bull.featuredTrait}
            </p>
          )}
        </div>

        {/* Radar Chart */}
        <div className="flex items-center justify-center relative px-4">
          <div className="absolute inset-0 bg-gray-50 rounded-full scale-90 -z-10"></div>
          <BullRadarChart
            growth={bull.growth}
            calvingEase={bull.calvingEase}
            reproduction={bull.reproduction}
            moderation={bull.moderation}
            carcass={bull.carcass}
          />
        </div>

        {/* Vertical Divider 2 */}
        <div className="h-24 w-px bg-gray-200 mx-2"></div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onViewDetails(bull.id)}
            className="w-10 h-10 rounded-xl bg-black hover:bg-gray-800 transition-colors flex items-center justify-center"
            title="Ver detalles"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          <button
            onClick={() => onToggleFavorite(bull.id)}
            className="w-10 h-10 rounded-xl bg-black hover:bg-gray-800 transition-colors flex items-center justify-center"
            title={bull.isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
          >
            <svg
              className="w-5 h-5 text-white"
              fill={bull.isFavorite ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
