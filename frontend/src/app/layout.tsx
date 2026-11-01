import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BEACON — Building Energy Analytics & Control Optimization Network",
  description:
    "AI-Powered closed-loop building energy optimization using EnergyPlus and Qwen2.5. Real-time telemetry, HVAC setpoint optimization, and energy savings analytics.",
  keywords: ["energy optimization", "building energy", "HVAC", "EnergyPlus", "AI", "sustainability"],
  authors: [{ name: "Manikya N." }],
  openGraph: {
    title: "BEACON — AI Building Energy Optimization",
    description: "AI-Powered closed-loop building energy optimization platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className={`${inter.className} bg-black text-white antialiased`}>{children}</body>
    </html>
  );
}
