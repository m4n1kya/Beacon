"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { clsx } from "clsx";

interface KPICardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  accent?: "emerald" | "indigo" | "amber" | "red" | "white";
  delay?: number;
}

export default function KPICard({
  label,
  value,
  sub,
  trend,
  trendValue,
  accent = "white",
  delay = 0,
}: KPICardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const accentColors: Record<string, string> = {
    emerald: "text-emerald-400",
    indigo: "text-indigo-400",
    amber: "text-amber-400",
    red: "text-red-400",
    white: "text-white",
  };

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-zinc-500";

  return (
    <div
      className={clsx(
        "glass glass-hover rounded-2xl p-5 transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">{label}</div>
      <div className={clsx("text-2xl font-bold font-mono tracking-tight", accentColors[accent])}>
        {value}
      </div>
      {(sub || trendValue) && (
        <div className="flex items-center gap-2 mt-2">
          {trendValue && (
            <div className={clsx("flex items-center gap-1 text-xs font-medium", trendColor)}>
              <TrendIcon className="w-3 h-3" />
              {trendValue}
            </div>
          )}
          {sub && <span className="text-xs text-zinc-600">{sub}</span>}
        </div>
      )}
    </div>
  );
}
