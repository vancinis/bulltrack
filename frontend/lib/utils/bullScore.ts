import { BullStats } from '../types/bull.types';

export const SCORE_WEIGHTS = {
  growth: 0.3,
  calvingEase: 0.25,
  reproduction: 0.2,
  moderation: 0.15,
  carcass: 0.1,
} as const;

export function calculateBullScore(stats: BullStats): number {
  const score =
    stats.growth * SCORE_WEIGHTS.growth +
    stats.calvingEase * SCORE_WEIGHTS.calvingEase +
    stats.reproduction * SCORE_WEIGHTS.reproduction +
    stats.moderation * SCORE_WEIGHTS.moderation +
    stats.carcass * SCORE_WEIGHTS.carcass;

  return Number(score.toFixed(2));
}

export function formatBullScore(score: number): string {
  return score.toFixed(2);
}
