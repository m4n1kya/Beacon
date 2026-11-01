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
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] backdrop-blur-xl bg-[#0a0a0a]/80">
      {/* Logo: clean minimalist BEACON text */}
      <Link href="/" className="group">
        <span className="text-base font-bold tracking-widest text-[#f1f5f9] hover:text-[#90CAF9] transition-colors">
          BEACON
        </span>
      </Link>

      {/* Center nav pill */}
      <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              pathname === href
                ? "bg-white text-[#0f172a] shadow-[0_0_15px_rgba(255,255,255,0.25)] font-semibold"
                : "text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-white/[0.05]"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </Link>
        ))}
      </div>

      {/* Right side status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(144,202,249,0.08)] border border-[rgba(144,202,249,0.25)] shadow-[0_0_12px_rgba(33,150,243,0.15)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_6px_#00E5FF]" />
          <span className="text-xs font-medium text-[#90CAF9]">System Online</span>
        </div>
        <div className="text-xs text-[#64748b] font-mono">v2.0.0</div>
      </div>
    </nav>
  );
}
