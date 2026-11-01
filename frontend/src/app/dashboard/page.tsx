"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import KPICard from "../components/KPICard";
import ComparisonChart from "../components/ComparisonChart";
import SavingsGauge from "../components/SavingsGauge";
import EnergyChart from "../components/EnergyChart";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Brain,
  Server,
  CheckCircle,
  ChevronRight,
  Thermometer,
  Zap,
} from "lucide-react";

const RESULTS = {
  baseline: { outdoor_temperature: 25.58, building_electricity: 257872140000, facility_electricity: 377653423039.6 },
  optimized: { outdoor_temperature: 25.58, building_electricity: 257872140000, facility_electricity: 364161184778.9 },
  savings_percent: 3.57265085859821,
  recommended_temperature: 25.0,
};

const TELEMETRY = [
  { month: "Jan", temperature: 15.18, electricity: 13.18 },
  { month: "Feb", temperature: 15.96, electricity: 12.14 },
  { month: "Mar", temperature: 24.58, electricity: 13.85 },
  { month: "Apr", temperature: 31.33, electricity: 14.75 },
  { month: "May", temperature: 27.56, electricity: 16.71 },
  { month: "Jun", temperature: 31.31, electricity: 16.56 },
  { month: "Jul", temperature: 26.03, electricity: 18.90 },
  { month: "Aug", temperature: 28.88, electricity: 17.53 },
  { month: "Sep", temperature: 29.19, electricity: 15.92 },
  { month: "Oct", temperature: 21.30, electricity: 16.29 },
  { month: "Nov", temperature: 17.31, electricity: 13.32 },
  { month: "Dec", temperature: 12.88, electricity: 12.92 },
];

const PIE_DATA = [
  { name: "Energy Used", value: 96.43 },
  { name: "Energy Saved", value: 3.57 },
];
const PIE_COLORS = ["#1a1a1a", "#00E5FF"];

const PIPELINE_STEPS = [
  { num: "01", title: "Simulation", desc: "EnergyPlus baseline execution", icon: Server },
  { num: "02", title: "Analysis", desc: "AI performance evaluation", icon: Brain },
  { num: "03", title: "Optimization", desc: "Intelligent setpoint selection", icon: Thermometer },
  { num: "04", title: "Validation", desc: "Results verification & reporting", icon: CheckCircle },
];

const BUILDING_INFO = [
  ["Simulation Engine", "EnergyPlus 26.1"],
  ["Weather File", "weather.epw"],
  ["Outdoor Temperature", "25.58 °C"],
  ["Cooling Setpoint (Baseline)", "23.9 °C"],
  ["Cooling Setpoint (Optimized)", "25.0 °C"],
  ["HVAC Status", "Operational"],
  ["Optimization Mode", "Closed Loop"],
];

const fmt = (v: number) => {
  if (v > 1e9) return (v / 1e9).toFixed(2) + " GJ";
  if (v > 1e6) return (v / 1e6).toFixed(2) + " MJ";
  return v.toFixed(2) + " J";
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-28 pb-16 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#f1f5f9] tracking-tight">Historical Optimization Report</h1>
            <p className="text-[#64748b] text-sm mt-1">Closed-loop EnergyPlus simulation results with AI-driven HVAC optimization</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(144,202,249,0.08)] border border-[rgba(144,202,249,0.25)] shadow-[0_0_12px_rgba(33,150,243,0.2)] self-start sm:self-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_6px_#00E5FF]" />
            <span className="text-xs font-medium text-[#90CAF9]">Simulation Completed</span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard label="Baseline Energy" value={fmt(RESULTS.baseline.facility_electricity)} accent="white" sub="Facility electricity" delay={0} />
          <KPICard label="Optimized Energy" value={fmt(RESULTS.optimized.facility_electricity)} accent="cyan" sub="Facility electricity" delay={100} />
          <KPICard label="Total Energy Savings" value={`${RESULTS.savings_percent.toFixed(2)}%`} accent="cyan" trend="up" trendValue="3.57%" delay={200} />
          <KPICard label="Recommended Setpoint" value={`${RESULTS.recommended_temperature}°C`} accent="sky" sub="HVAC cooling setpoint" delay={300} />
        </div>

        {/* Main charts row */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ComparisonChart
              baseline={RESULTS.baseline.facility_electricity}
              optimized={RESULTS.optimized.facility_electricity}
            />
          </div>
          <SavingsGauge percent={RESULTS.savings_percent} />
        </div>

        {/* Annual telemetry + donut row */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EnergyChart data={TELEMETRY} title="Annual Energy & Temperature Profile" />
          </div>

          {/* Donut + AI score */}
          <div className="glass glass-hover rounded-2xl p-6 flex flex-col">
            <h3 className="text-sm font-semibold text-[#f1f5f9] mb-5 uppercase tracking-widest">
              Energy Distribution
            </h3>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {PIE_DATA.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#121212", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, color: "#f1f5f9", fontSize: 12 }}
                    formatter={(v: any) => [`${v}%`, ""]}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: 11, color: "#64748b" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Building info + AI summary row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Building info table */}
          <div className="glass glass-hover rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-[#f1f5f9] mb-5 uppercase tracking-widest">
              Building Information
            </h3>
            <div className="space-y-2">
              {BUILDING_INFO.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <span className="text-xs text-[#64748b]">{k}</span>
                  <span className="text-xs font-medium text-[#94a3b8] font-mono">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="glass glass-hover rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-[#f1f5f9] mb-5 uppercase tracking-widest flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#90CAF9]" />
              AI Recommendation
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center">
                <div className="text-[10px] text-[#64748b] uppercase tracking-widest mb-2">Recommended Setpoint</div>
                <div className="text-3xl font-black font-mono text-[#90CAF9] drop-shadow-[0_0_8px_rgba(144,202,249,0.4)]">25.0°C</div>
              </div>
              <div className="rounded-xl bg-[rgba(0,229,255,0.06)] border border-[rgba(0,229,255,0.25)] p-4 text-center shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                <div className="text-[10px] text-[#64748b] uppercase tracking-widest mb-2">Expected Savings</div>
                <div className="text-3xl font-black font-mono text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]">3.57%</div>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
              <div className="text-[10px] text-[#64748b] uppercase tracking-widest mb-2">Decision Analysis</div>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                The AI model analyzed baseline EnergyPlus simulation outputs, selected an optimal cooling setpoint of 25.0°C (+1.1°C from baseline), automatically modified the IDF schedule, executed a second verification simulation, and confirmed 3.57% total facility electricity reduction while maintaining occupant thermal comfort standards.
              </p>
            </div>
          </div>
        </div>

        {/* Optimization Pipeline */}
        <div className="glass glass-hover rounded-2xl p-6 sm:p-8">
          <h3 className="text-sm font-semibold text-[#f1f5f9] mb-6 sm:mb-8 uppercase tracking-widest">
            Optimization Pipeline
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.num} className="relative flex items-start gap-3">
                {i < PIPELINE_STEPS.length - 1 && (
                  <ChevronRight className="absolute -right-3 top-3 w-4 h-4 text-[#64748b]/40 hidden lg:block" />
                )}
                <div className="rounded-xl bg-[rgba(33,150,243,0.08)] border border-[rgba(33,150,243,0.25)] p-4 flex-1 hover:border-[rgba(0,229,255,0.4)] transition-colors">
                  <div className="text-2xl font-black text-[#00E5FF]/70 mb-3">{step.num}</div>
                  <step.icon className="w-5 h-5 text-[#90CAF9] mb-2" />
                  <div className="text-sm font-semibold text-[#f1f5f9]">{step.title}</div>
                  <div className="text-xs text-[#64748b] mt-1">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance summary banner */}
        <div className="glass rounded-2xl p-6 border border-[rgba(33,150,243,0.25)] bg-[rgba(33,150,243,0.03)] shadow-[0_0_20px_rgba(33,150,243,0.1)]">
          <div className="flex flex-wrap items-center justify-around gap-6 text-center">
            {[
              { label: "Baseline Facility Electricity", value: "377.65 GJ", color: "text-[#94a3b8]" },
              { label: "Optimized Facility Electricity", value: "364.16 GJ", color: "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]" },
              { label: "Total Reduction", value: "−13.49 GJ", color: "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]" },
              { label: "Savings Percentage", value: "3.57%", color: "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]" },
              { label: "Cooling Setpoint Change", value: "23.9°C → 25.0°C", color: "text-[#90CAF9]" },
            ].map((item) => (
              <div key={item.label}>
                <div className={`text-xl font-bold font-mono ${item.color}`}>{item.value}</div>
                <div className="text-xs text-[#64748b] mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
