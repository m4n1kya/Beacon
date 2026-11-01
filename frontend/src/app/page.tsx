"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Github, Zap, Thermometer, Activity, Cpu } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const HeroGlobe = dynamic(() => import("./components/HeroGlobe"), { ssr: false });

const STATS = [
  { label: "Energy Saved", value: "3.57%", icon: Zap, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { label: "Optimal Setpoint", value: "25.0°C", icon: Thermometer, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { label: "Facility Energy", value: "364 GJ", icon: Activity, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { label: "AI Model", value: "Qwen2.5", icon: Cpu, color: "text-zinc-300", bg: "bg-white/[0.04] border-white/10" },
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
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.04] blur-[100px] pointer-events-none" />

        <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="space-y-8">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-xs text-zinc-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI-Powered Closed-Loop Optimization Active
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4">
                <span className="gradient-text">B.E.A.C.O.N.</span>
              </h1>
              <p className="text-xl text-zinc-400 font-medium leading-relaxed max-w-lg">
                Building Energy Analytics & Control Optimization Network. AI-driven HVAC optimization that reduces facility electricity consumption autonomously.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/30"
              >
                Open Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/telemetry"
                className="flex items-center gap-2 px-5 py-3 rounded-xl glass glass-hover text-white text-sm font-medium transition-all"
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                Live Telemetry
              </Link>
              <Link
                href="https://github.com/m4n1kya/Beacon"
                target="_blank"
                className="flex items-center gap-2 px-5 py-3 rounded-xl glass glass-hover text-zinc-400 hover:text-white text-sm font-medium transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${s.bg}`}
                >
                  <s.icon className={`w-4 h-4 ${s.color} shrink-0`} />
                  <div>
                    <div className={`text-sm font-bold font-mono ${s.color}`}>{s.value}</div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Globe */}
          <div className="flex items-center justify-center">
            <div className="w-[380px] h-[380px] lg:w-[460px] lg:h-[460px]">
              <HeroGlobe className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-20 max-w-4xl w-full mx-auto">
          <p className="text-center text-xs text-zinc-700 uppercase tracking-widest mb-6">Powered by</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TECH.map((t) => (
              <div
                key={t}
                className="px-4 py-2 rounded-full glass border border-white/[0.06] text-xs font-medium text-zinc-500 hover:text-zinc-300 hover:border-white/15 transition-all cursor-default"
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
