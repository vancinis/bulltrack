interface BullScoreBarProps {
  score: number;
  showLabel?: boolean;
}

export default function BullScoreBar({ score, showLabel = true }: BullScoreBarProps) {
  const percentage = score;

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          BULL SCORE
        </div>
      )}

      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="text-3xl font-bold text-gray-900">
        {score.toFixed(2)}
      </div>
    </div>
  );
}
