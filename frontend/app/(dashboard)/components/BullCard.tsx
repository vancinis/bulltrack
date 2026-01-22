'use client';

import Badge from '@/components/ui/Badge';
import Checkbox from '@/components/ui/Checkbox';
import { Bull } from '@/lib/types/bull.types';
import { getBullImageUrl } from '@/lib/utils/bullImages';
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

  // Get image URL based on breed and coat color
  const imageUrl = bull.imageUrl || getBullImageUrl(bull.breed, bull.coatColor);

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 hover:shadow-sm transition-all duration-200">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        {/* Top section: Checkbox, Rank, Image, Info - Horizontal on all sizes */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Checkbox className="h-5 w-5 rounded border-2 border-blue-500 bg-white cursor-pointer flex-shrink-0" />
          <span className="text-2xl lg:text-3xl font-bold text-gray-800 flex-shrink-0">#{rank}</span>

        <div className='flex items-center gap-3 flex-1'>
          {/* Image */}
          <div className="relative w-16 h-16 lg:w-24 lg:h-24 rounded-xl lg:rounded-2xl overflow-hidden bg-gray-100 shrink-0">
            <Image
              src={imageUrl}
              alt={`${bull.breed} ${bull.coatColor}`}
              fill
              className="object-cover"
              priority={rank <= 3}
            />
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <h3 className="text-base lg:text-xl font-bold text-gray-900 truncate">{bull.name} #{bull.earTag}</h3>
            <p className="text-xs lg:text-sm text-gray-600">{bull.breed} · {bull.ageMonths} meses</p>

            <div className="flex gap-2 mt-1">
              <Badge variant="primary" size="sm">
                {bull.origin === 'propio' ? 'Propio' : 'Catálogo'}
              </Badge>
              <Badge variant="secondary" size="sm">
                Para {bull.usage}
              </Badge>
            </div>
          </div>
        </div>
        </div>

        {/* Vertical Divider 1 - Hidden on mobile */}
        <div className="hidden lg:block h-24 w-px bg-gray-200 mx-4"></div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-4 w-full lg:flex-1">
          {/* Bull Score */}
          <div className="flex flex-col gap-2 w-full lg:min-w-[240px]">
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

          {/* Radar Chart - Centered on mobile */}
          <div className="flex items-center justify-center relative px-4 w-full lg:w-auto">
            <div className="absolute inset-0 bg-gray-50 rounded-full scale-90 -z-10"></div>
            <BullRadarChart
              growth={bull.growth}
              calvingEase={bull.calvingEase}
              reproduction={bull.reproduction}
              moderation={bull.moderation}
              carcass={bull.carcass}
            />
          </div>
        </div>

        {/* Vertical Divider 2 - Hidden on mobile */}
        <div className="hidden lg:block h-24 w-px bg-gray-200 mx-2"></div>

        {/* Actions - Row on mobile, column on desktop */}
        <div className="flex flex-row lg:flex-col gap-2 justify-center">
          <button
            onClick={() => onViewDetails(bull.id)}
            className="w-10 h-10 rounded-xl bg-black hover:bg-gray-800 transition-colors flex items-center justify-center cursor-pointer"
            title="Ver detalles"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          <button
            onClick={() => onToggleFavorite(bull.id)}
            className="w-10 h-10 rounded-xl bg-black hover:bg-gray-800 transition-colors flex items-center justify-center cursor-pointer"
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
