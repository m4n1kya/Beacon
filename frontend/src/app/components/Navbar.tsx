"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BarChart3, Home } from "lucide-react";
import { clsx } from "clsx";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/telemetry", label: "Telemetry", icon: Activity },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] backdrop-blur-xl bg-black/60">
      {/* Logo: clean BEACON text */}
      <Link href="/" className="group">
        <span className="text-base font-bold tracking-widest text-white hover:text-emerald-400 transition-colors">
          BEACON
        </span>
      </Link>

      {/* Center nav */}
      <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              pathname === href
                ? "bg-white/10 text-white"
                : "text-zinc-400 hover:text-white hover:bg-white/05"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </Link>
        ))}
      </div>

      {/* Right side status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400">System Online</span>
        </div>
        <div className="text-xs text-zinc-600 font-mono">v2.0.0</div>
      </div>
    </nav>
  );
}
