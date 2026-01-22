'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts';

interface BullRadarChartProps {
  readonly growth: number;
  readonly calvingEase: number;
  readonly reproduction: number;
  readonly moderation: number;
  readonly carcass: number;
}

export default function BullRadarChart({
  growth,
  calvingEase,
  reproduction,
  moderation,
  carcass,
}: BullRadarChartProps) {
  const data = [
    { subject: 'Crecimiento', value: growth, fullMark: 100 },
    { subject: 'F. Parto', value: calvingEase, fullMark: 100 },
    { subject: 'Reproducción', value: reproduction, fullMark: 100 },
    { subject: 'Moderación', value: moderation, fullMark: 100 },
    { subject: 'Carcasa', value: carcass, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width={120} height={120}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#6b7280', fontSize: 10 }}
        />
        <Radar
          dataKey="value"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
