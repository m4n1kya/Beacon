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
      <h3 className="text-sm font-semibold text-[#f1f5f9] mb-5 uppercase tracking-widest self-start">
        {label}
      </h3>
      <div className="relative flex items-center justify-center">
        <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
          <defs>
            <linearGradient id="neonGaugeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2196F3" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="10"
          />
          {/* Neon fill */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="url(#neonGaugeGrad)"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.5s ease-out",
              filter: "drop-shadow(0 0 8px rgba(0, 229, 255, 0.6))",
            }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold font-mono text-[#00E5FF] drop-shadow-[0_0_12px_rgba(0,229,255,0.65)]">
            {clampedPercent.toFixed(2)}%
          </span>
          <span className="text-[10px] text-[#64748b] mt-1 uppercase tracking-widest">Saved</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-[#64748b]">
          13.49 GJ reduction from AI-optimized HVAC schedule
        </p>
      </div>
    </div>
  );
}
