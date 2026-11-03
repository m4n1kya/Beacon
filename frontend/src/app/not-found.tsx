import Link from "next/link";
import Navbar from "./components/Navbar";
import { AlertCircle, ArrowLeft, Activity } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-[#f1f5f9] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Neon background aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#2196F3]/[0.08] blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full glass rounded-3xl p-8 sm:p-10 border border-white/[0.08] text-center relative z-10 shadow-[0_0_50px_rgba(33,150,243,0.15)]">
          <div className="w-14 h-14 rounded-2xl bg-[rgba(33,150,243,0.1)] border border-[rgba(33,150,243,0.3)] flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(33,150,243,0.3)]">
            <AlertCircle className="w-7 h-7 text-[#00E5FF]" />
          </div>

          <div className="text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#90CAF9] to-[#00E5FF] mb-3">
            404
          </div>

          <h2 className="text-xl font-bold tracking-tight mb-2 text-white">
            Sensor Node Unreachable
          </h2>

          <p className="text-sm text-[#94a3b8] leading-relaxed mb-8">
            The requested telemetry stream, endpoint, or facility zone cannot be located within the active BEACON grid.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#e2e8f0] text-[#0f172a] text-sm font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.25)]"
            >
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </Link>
            <Link
              href="/telemetry"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass glass-hover text-[#90CAF9] text-sm font-medium transition-all"
            >
              <Activity className="w-4 h-4 text-[#00E5FF]" />
              Live Feed
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
