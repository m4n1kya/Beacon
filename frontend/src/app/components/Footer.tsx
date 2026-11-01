"use client";

import Link from "next/link";
import { Github, ExternalLink, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-20 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-widest">BEACON</div>
            <div className="text-[10px] text-zinc-600 tracking-widest">
              Building Energy Analytics & Control Optimization Network
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-600">
          <span>© 2026 Manikya N. — VIT Bhopal</span>
          <Link
            href="https://github.com/m4n1kya/Beacon"
            target="_blank"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </Link>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-500">Always Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
