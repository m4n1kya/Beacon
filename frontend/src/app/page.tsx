"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Github, Zap, Thermometer, Activity, Cpu } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <main className="flex-1 flex flex-col justify-center relative overflow-hidden px-4 sm:px-8 lg:px-12 xl:px-16 pt-24 sm:pt-28 pb-12 sm:pb-16 w-full">
        {/* Ambient neon radial glows spanning full viewport */}
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[900px] h-[600px] lg:h-[900px] rounded-full bg-[#2196F3]/[0.08] blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[400px] lg:w-[700px] h-[400px] lg:h-[700px] rounded-full bg-[#00E5FF]/[0.06] blur-[120px] pointer-events-none" />

        <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center relative z-10">
          {/* Left: text */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-8">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(144,202,249,0.08)] border border-[rgba(144,202,249,0.25)] text-xs text-[#90CAF9] shadow-[0_0_15px_rgba(33,150,243,0.15)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
              AI-Powered Closed-Loop Optimization Active
            </div>

            {/* Heading: BEACON, massive and clean */}
            <div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-black tracking-tighter leading-[0.95] mb-4">
                <span className="gradient-text">BEACON</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-[#94a3b8] font-normal leading-relaxed max-w-2xl">
                Building Energy Analytics & Control Optimization Network. Autonomous AI-driven HVAC control synthesizing EnergyPlus physics simulations with edge LLM reasoning.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto justify-center flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-[#e2e8f0] text-[#0f172a] text-sm sm:text-base font-bold transition-all duration-200 shadow-[0_0_25px_rgba(255,255,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] active:scale-95"
              >
                Open Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/telemetry"
                className="flex-1 sm:flex-initial justify-center flex items-center gap-2 px-6 py-3.5 rounded-xl glass glass-hover text-[#f1f5f9] text-sm sm:text-base font-medium transition-all"
              >
                <Activity className="w-4 h-4 text-[#00E5FF] drop-shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
                Live Telemetry
              </Link>
              <Link
                href="https://github.com/m4n1kya/Beacon"
                target="_blank"
                className="flex-1 sm:flex-initial justify-center flex items-center gap-2 px-6 py-3.5 rounded-xl glass glass-hover text-[#94a3b8] hover:text-[#f1f5f9] text-sm sm:text-base font-medium transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 pt-2">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border ${s.bg} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <s.icon className={`w-4 sm:w-5 h-4 sm:h-5 ${s.color} shrink-0`} />
                  <div className="min-w-0">
                    <div className={`text-base sm:text-lg font-bold font-mono ${s.color} truncate`}>{s.value}</div>
                    <div className="text-[10px] text-[#64748b] uppercase tracking-wider truncate">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Immersive Globe */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] lg:w-[540px] lg:h-[540px] xl:w-[620px] xl:h-[620px] 2xl:w-[700px] 2xl:h-[700px] max-w-full aspect-square">
              <HeroGlobe className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-14 sm:mt-20 max-w-5xl w-full mx-auto relative z-10 px-2">
          <p className="text-center text-xs text-[#64748b] uppercase tracking-widest mb-4 sm:mb-6">Powered by</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {TECH.map((t) => (
              <div
                key={t}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-white/[0.06] text-xs font-medium text-[#94a3b8] hover:text-[#f1f5f9] hover:border-white/15 transition-all cursor-default"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
