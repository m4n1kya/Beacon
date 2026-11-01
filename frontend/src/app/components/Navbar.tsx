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
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-3.5 sm:py-4 border-b border-white/[0.06] backdrop-blur-xl bg-[#0a0a0a]/80">
      {/* Brand */}
      <Link href="/" className="group shrink-0">
        <span className="text-base sm:text-lg font-bold tracking-widest text-[#f1f5f9] hover:text-[#90CAF9] transition-colors">
          BEACON
        </span>
      </Link>

      {/* Center nav pill */}
      <div className="flex items-center gap-0.5 sm:gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200",
              pathname === href
                ? "bg-white text-[#0f172a] shadow-[0_0_15px_rgba(255,255,255,0.25)] font-semibold"
                : "text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-white/[0.05]"
            )}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Right spacer for symmetrical centering */}
      <div className="shrink-0 w-16 hidden sm:block pointer-events-none" />
    </nav>
  );
}
