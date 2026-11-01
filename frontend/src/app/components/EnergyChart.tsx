"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  month: string;
  temperature: number;
  electricity: number;
}

interface EnergyChartProps {
  data: DataPoint[];
  title?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 text-sm border border-white/10 shadow-[0_0_20px_rgba(33,150,243,0.25)]">
        <p className="text-[#94a3b8] mb-2 font-medium">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-[#94a3b8] capitalize">{p.name}:</span>
            <span className="text-[#f1f5f9] font-mono font-medium">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function EnergyChart({ data, title }: EnergyChartProps) {
  return (
    <div className="glass glass-hover rounded-2xl p-6">
      {title && (
        <h3 className="text-sm font-semibold text-[#f1f5f9] mb-6 uppercase tracking-widest">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradElec" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2196F3" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#2196F3" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, color: "#64748b", paddingTop: 12 }}
          />
          <Area
            type="monotone"
            dataKey="electricity"
            name="HVAC Power (GW)"
            stroke="#00E5FF"
            strokeWidth={2}
            fill="url(#gradElec)"
            dot={false}
            activeDot={{ r: 5, fill: "#00E5FF", strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="temperature"
            name="Outdoor Temp (°C)"
            stroke="#2196F3"
            strokeWidth={2}
            fill="url(#gradTemp)"
            dot={false}
            activeDot={{ r: 5, fill: "#2196F3", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
