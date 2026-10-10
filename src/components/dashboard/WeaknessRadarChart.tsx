'use client';

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';

interface WeaknessRadarChartProps {
  data: Array<{
    subject: string;
    mastery: number;
    fullMark: number;
  }>;
}

export default function WeaknessRadarChart({ data }: WeaknessRadarChartProps) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#fed7aa" />
          <PolarAngleAxis dataKey="subject" stroke="#0F766E" tick={{ fill: '#334155', fontSize: 11, fontWeight: 700 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#fed7aa" />
          <Radar
            name="Mastery Score (%)"
            dataKey="mastery"
            stroke="#EA580C"
            fill="#EA580C"
            fillOpacity={0.4}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#fed7aa', borderRadius: '14px', color: '#334155', boxShadow: '0 4px 20px rgba(234,88,12,0.15)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', color: '#0F766E' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
