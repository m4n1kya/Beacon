"use client";

interface SavingsGaugeProps {
  percent: number;
  label?: string;
}

export default function SavingsGauge({ percent, label = "Energy Savings" }: SavingsGaugeProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(Math.max(percent, 0), 100);
  const dashOffset = circumference - (clampedPercent / 100) * circumference;

  return (
    <div className="glass glass-hover rounded-2xl p-6 flex flex-col items-center justify-center">
      <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-widest self-start">
        {label}
      </h3>
      <div className="relative flex items-center justify-center">
        <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
          {/* Track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="10"
          />
          {/* Emerald fill */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#10b981"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold font-mono text-emerald-400">
            {clampedPercent.toFixed(2)}%
          </span>
          <span className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest">Saved</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-zinc-600">
          13.49 GJ reduction from AI-optimized HVAC schedule
        </p>
      </div>
    </div>
  );
}
