"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

interface HeroGlobeProps {
  className?: string;
}

export default function HeroGlobe({ className }: HeroGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 2, 2),
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 24000,
      mapBrightness: 8,
      baseColor: [0.08, 0.12, 0.18], // Luminous dark slate blue
      markerColor: [0.0, 0.9, 1.0],   // #00E5FF Electric Neon Cyan
      glowColor: [0.13, 0.59, 0.95],  // #2196F3 Vibrant Neon Blue
      markers: [
        { location: [28.6139, 77.2090], size: 0.08 },   // New Delhi
        { location: [51.5074, -0.1278], size: 0.06 },   // London
        { location: [40.7128, -74.006], size: 0.07 },   // New York
        { location: [35.6762, 139.6503], size: 0.06 },  // Tokyo
        { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
        { location: [1.3521, 103.8198], size: 0.05 },   // Singapore
        { location: [48.8566, 2.3522], size: 0.05 },    // Paris
        { location: [37.7749, -122.4194], size: 0.06 }, // San Francisco
      ],
      onRender: (state: Record<string, any>) => {
        state.phi = phi;
        phi += 0.003;
        state.width = width * 2;
        state.height = width * 2;
      },
    } as any);

    // Fade in
    if (canvasRef.current) {
      canvasRef.current.style.opacity = "1";
    }

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Outer neon cyan/blue halo ring */}
      <div className="absolute inset-0 rounded-full bg-[#2196F3]/20 blur-3xl scale-95 pointer-events-none animate-pulse-neon" />
      {/* Inner electric glow */}
      <div className="absolute inset-4 rounded-full bg-[#00E5FF]/15 blur-2xl pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          opacity: 0,
          transition: "opacity 1s ease",
          contain: "layout paint size",
        }}
      />
    </div>
  );
}
