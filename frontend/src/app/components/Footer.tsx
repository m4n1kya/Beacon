"use client";

export default function Footer() {
  return (
    <footer className="relative w-full pt-20 pb-8 px-6 flex flex-col items-center justify-end overflow-hidden mt-auto border-t border-white/[0.04]">
      {/* Synaptica-style giant watermark */}
      <div
        className="w-full text-center font-black select-none pointer-events-none text-white/[0.03] leading-[0.75]"
        style={{
          fontSize: "16.5vw",
          letterSpacing: "-0.06em",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
          transform: "translateY(2vw)",
        }}
      >
        BEACON
      </div>
      <div className="text-[11px] font-mono tracking-widest text-zinc-600 uppercase mt-4">
        COPYRIGHT &copy; 2026 BEACON. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
