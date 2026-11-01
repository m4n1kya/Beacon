"use client";

import { useEffect, useState, useRef } from "react";
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
import { RefreshCw } from "lucide-react";

const FULL_DATA = [
  { timeIndex: 744,  month: "Jan", temperature: 15.175,  electricity: 13184787015.267 },
  { timeIndex: 1416, month: "Feb", temperature: 15.9625, electricity: 12143124337.441 },
  { timeIndex: 2160, month: "Mar", temperature: 24.575,  electricity: 13848189331.712 },
  { timeIndex: 2880, month: "Apr", temperature: 31.325,  electricity: 14746939125.350 },
  { timeIndex: 3624, month: "May", temperature: 27.5625, electricity: 16712089150.751 },
  { timeIndex: 4344, month: "Jun", temperature: 31.3125, electricity: 16562598806.235 },
  { timeIndex: 5088, month: "Jul", temperature: 26.025,  electricity: 18895444962.868 },
  { timeIndex: 5832, month: "Aug", temperature: 28.875,  electricity: 17531361710.505 },
  { timeIndex: 6552, month: "Sep", temperature: 29.1875, electricity: 15921209033.170 },
  { timeIndex: 7296, month: "Oct", temperature: 21.3,    electricity: 16294085118.700 },
  { timeIndex: 8016, month: "Nov", temperature: 17.3125, electricity: 13320278032.147 },
  { timeIndex: 8760, month: "Dec", temperature: 12.875,  electricity: 12920485765.294 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 text-sm border border-white/10 shadow-[0_0_20px_rgba(33,150,243,0.25)]">
        <p className="text-[#94a3b8] mb-2 font-medium">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-[#94a3b8]">{p.name}:</span>
            <span className="text-[#f1f5f9] font-mono">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function TelemetryStream() {
  const [displayData, setDisplayData] = useState(FULL_DATA.slice(0, 1));
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startStream = (from = 1) => {
    setDone(false);
    setDisplayData(FULL_DATA.slice(0, from));
    setStep(from);

    intervalRef.current = setInterval(() => {
      setStep((prev) => {
        const next = prev + 1;
        if (next > FULL_DATA.length) {
          clearInterval(intervalRef.current!);
          setDone(true);
          return prev;
        }
        setDisplayData(FULL_DATA.slice(0, next));
        return next;
      });
    }, 1200);
  };

  useEffect(() => {
    startStream(1);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const restart = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startStream(1);
  };

  const current = FULL_DATA[step - 1] ?? FULL_DATA[FULL_DATA.length - 1];
  const prev = FULL_DATA[step - 2];

  const tempDiff = prev ? (current.temperature - prev.temperature).toFixed(2) : "0";
  const elecDiff = prev ? ((current.electricity - prev.electricity) / 1e6).toFixed(1) : "0";

  const formatElec = (v: number) => (v / 1e9).toFixed(3) + " GW";

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Live Indoor Temp",
            value: `${current.temperature.toFixed(2)} °C`,
            delta: `${Number(tempDiff) >= 0 ? "+" : ""}${tempDiff} °C`,
            up: Number(tempDiff) >= 0,
            showTrend: true,
            valColor: "text-[#90CAF9]",
          },
          {
            label: "HVAC Power Draw",
            value: formatElec(current.electricity),
            delta: `${Number(elecDiff) >= 0 ? "+" : ""}${elecDiff} MW`,
            up: Number(elecDiff) >= 0,
            showTrend: true,
            valColor: "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]",
          },
          {
            label: "Live Occupancy",
            value: `${Math.floor(120 + current.temperature * 1.5)} People`,
            delta: step > 1 ? "+3 people" : "—",
            up: true,
            showTrend: true,
            valColor: "text-[#E3F2FD]",
          },
          {
            label: "Carbon Rate",
            value: `${(current.electricity * 0.0004).toFixed(0)} kgCO₂/h`,
            delta: `Step ${step} / ${FULL_DATA.length}`,
            up: false,
            showTrend: false,
            valColor: "text-[#2196F3]",
          },
        ].map((kpi) => (
          <div key={kpi.label} className="glass glass-hover rounded-2xl p-5">
            <div className="text-xs font-medium text-[#64748b] uppercase tracking-widest mb-2">{kpi.label}</div>
            <div className={`text-xl font-bold font-mono truncate ${kpi.valColor}`}>{kpi.value}</div>
            {kpi.showTrend ? (
              <div className={`text-xs mt-2 font-medium ${kpi.up ? "text-emerald-400" : "text-rose-400"}`}>
                {kpi.up ? "▲" : "▼"} {kpi.delta}
              </div>
            ) : (
              <div className="text-xs mt-2 font-medium text-[#64748b]">
                {kpi.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="glass glass-hover rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-[#f1f5f9] uppercase tracking-widest">
              Real-Time Building Telemetry
            </h3>
            <p className="text-xs text-[#64748b] mt-1">Monthly EnergyPlus simulation — streaming live</p>
          </div>
          <div className="flex items-center gap-3">
            {!done ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(33,150,243,0.08)] border border-[rgba(33,150,243,0.25)] shadow-[0_0_12px_rgba(33,150,243,0.2)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_6px_#00E5FF]" />
                <span className="text-xs text-[#90CAF9] font-medium">Streaming</span>
              </div>
            ) : (
              <button
                onClick={restart}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full glass glass-hover text-xs text-[#94a3b8] hover:text-[#f1f5f9] transition-all"
              >
                <RefreshCw className="w-3 h-3" />
                Restart
              </button>
            )}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={displayData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="telElec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="telTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2196F3" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2196F3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: "#64748b", paddingTop: 12 }} />
            <Area type="monotone" dataKey="electricity" name="HVAC Power (W)" stroke="#00E5FF" strokeWidth={2} fill="url(#telElec)" dot={false} isAnimationActive={false} />
            <Area type="monotone" dataKey="temperature" name="Temperature (°C)" stroke="#2196F3" strokeWidth={2} fill="url(#telTemp)" dot={false} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>

        {done && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-[rgba(33,150,243,0.08)] border border-[rgba(33,150,243,0.25)] text-sm text-[#90CAF9] text-center shadow-[0_0_15px_rgba(33,150,243,0.15)]">
            Simulation complete — full annual dataset rendered.
          </div>
        )}
      </div>
    </div>
  );
}
