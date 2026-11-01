"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ComparisonChartProps {
  baseline: number;
  optimized: number;
}

const COLORS = { baseline: "#6366f1", optimized: "#10b981" };

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const val = (payload[0].value / 1e9).toFixed(2);
    return (
      <div className="glass rounded-xl p-3 text-sm border border-white/10">
        <p className="text-zinc-400 mb-1">{payload[0].name}</p>
        <p className="text-white font-mono font-bold">{val} GJ</p>
      </div>
    );
  }
  return null;
};

export default function ComparisonChart({ baseline, optimized }: ComparisonChartProps) {
  const data = [
    { name: "Baseline", value: baseline, color: COLORS.baseline },
    { name: "Optimized", value: optimized, color: COLORS.optimized },
  ];

  return (
    <div className="glass glass-hover rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-white mb-1 uppercase tracking-widest">
        Energy Consumption
      </h3>
      <p className="text-xs text-zinc-600 mb-6">Total facility electricity (GJ)</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={48}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="value" name="Facility Electricity" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
