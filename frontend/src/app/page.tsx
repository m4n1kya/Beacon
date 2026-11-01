"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Github, Zap, Thermometer, Activity, Cpu } from "lucide-react";
import Navbar from "./components/Navbar";

const HeroGlobe = dynamic(() => import("./components/HeroGlobe"), { ssr: false });

const STATS = [
  {
    label: "Energy Saved",
    value: "3.57%",
    icon: Zap,
    color: "text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]",
    bg: "bg-[rgba(0,229,255,0.06)] border-[rgba(0,229,255,0.25)] shadow-[0_0_15px_rgba(0,229,255,0.1)]",
  },
  {
    label: "Optimal Setpoint",
    value: "25.0°C",
    icon: Thermometer,
    color: "text-[#90CAF9] drop-shadow-[0_0_8px_rgba(144,202,249,0.4)]",
    bg: "bg-[rgba(144,202,249,0.08)] border-[rgba(144,202,249,0.25)]",
  },
  {
    label: "Facility Energy",
    value: "364 GJ",
    icon: Activity,
    color: "text-[#2196F3] drop-shadow-[0_0_8px_rgba(33,150,243,0.4)]",
    bg: "bg-[rgba(33,150,243,0.08)] border-[rgba(33,150,243,0.25)]",
  },
  {
    label: "AI Model",
    value: "Qwen2.5",
    icon: Cpu,
    color: "text-[#E3F2FD]",
    bg: "bg-[rgba(227,242,253,0.08)] border-[rgba(227,242,253,0.25)]",
  },
];

const TECH = [
  "EnergyPlus 26.1", "Qwen2.5 1.5B", "Ollama", "Python 3.13",
  "Next.js 15", "Streamlit", "Pandas", "ReportLab",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-6 pt-24 pb-16">
        {/* Ambient neon radial glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#2196F3]/[0.07] blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00E5FF]/[0.05] blur-[100px] pointer-events-none" />

        <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: text */}
          <div className="space-y-8">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(144,202,249,0.08)] border border-[rgba(144,202,249,0.25)] text-xs text-[#90CAF9] shadow-[0_0_15px_rgba(33,150,243,0.15)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
              AI-Powered Closed-Loop Optimization Active
            </div>

            {/* Heading: BEACON at clean original scale */}
            <div>
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight mb-4">
                <span className="gradient-text">BEACON</span>
              </h1>
              <p className="text-xl text-[#94a3b8] font-medium leading-relaxed max-w-lg">
                Building Energy Analytics & Control Optimization Network. AI-driven HVAC optimization that reduces facility electricity consumption autonomously.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#e2e8f0] text-[#0f172a] text-sm font-bold transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] active:scale-95"
              >
                Open Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/telemetry"
                className="flex items-center gap-2 px-5 py-3 rounded-xl glass glass-hover text-[#f1f5f9] text-sm font-medium transition-all"
              >
                <Activity className="w-4 h-4 text-[#00E5FF] drop-shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
                Live Telemetry
              </Link>
              <Link
                href="https://github.com/m4n1kya/Beacon"
                target="_blank"
                className="flex items-center gap-2 px-5 py-3 rounded-xl glass glass-hover text-[#94a3b8] hover:text-[#f1f5f9] text-sm font-medium transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Link>
            </div>

            {/* Stats: Clean 2x2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${s.bg} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <s.icon className={`w-4 h-4 ${s.color} shrink-0`} />
                  <div>
                    <div className={`text-sm font-bold font-mono ${s.color}`}>{s.value}</div>
                    <div className="text-[10px] text-[#64748b] uppercase tracking-widest">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Globe */}
          <div className="flex items-center justify-center">
            <div className="w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px]">
              <HeroGlobe className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-20 max-w-4xl w-full mx-auto relative z-10 px-2">
          <p className="text-center text-xs text-[#64748b] uppercase tracking-widest mb-6">Powered by</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TECH.map((t) => (
              <div
                key={t}
                className="px-4 py-2 rounded-full glass border border-white/[0.06] text-xs font-medium text-[#94a3b8] hover:text-[#f1f5f9] hover:border-white/15 transition-all cursor-default"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
