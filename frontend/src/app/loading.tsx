export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="relative flex items-center justify-center">
        {/* Pulsing neon rings */}
        <div className="w-16 h-16 rounded-full border-2 border-[#00E5FF]/20 animate-ping" />
        <div className="absolute w-12 h-12 rounded-full border-2 border-[#2196F3] border-t-transparent animate-spin" />
        <div className="absolute w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
      </div>
      <div className="mt-6 text-xs font-mono tracking-widest text-[#90CAF9] uppercase">
        Connecting to BEACON Grid...
      </div>
    </div>
  );
}
