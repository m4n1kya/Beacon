"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, ShieldAlert } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("BEACON client error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-[#f1f5f9] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#f87171]/[0.05] blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full glass rounded-3xl p-8 sm:p-10 border border-white/[0.08] text-center relative z-10 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
        <div className="w-14 h-14 rounded-2xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <ShieldAlert className="w-7 h-7 text-[#f87171]" />
        </div>

        <h2 className="text-xl font-bold tracking-tight mb-2 text-white">
          Telemetry Pipeline Interrupted
        </h2>

        <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">
          An unexpected anomaly occurred while processing realtime facility telemetry data.
        </p>

        {error.message && (
          <div className="mb-6 p-3 rounded-xl bg-black/60 border border-white/[0.06] text-xs font-mono text-zinc-400 text-left truncate">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#e2e8f0] text-[#0f172a] text-sm font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.25)]"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Feed
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass glass-hover text-[#94a3b8] hover:text-white text-sm font-medium transition-all"
          >
            <Home className="w-4 h-4" />
            Command Center
          </Link>
        </div>
      </div>
    </div>
  );
}
