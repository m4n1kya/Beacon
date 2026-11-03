import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://beacon-nu-swart.vercel.app"),
  title: {
    default: "BEACON — Building Energy Analytics & Control Optimization Network",
    template: "%s | BEACON",
  },
  description:
    "AI-Powered closed-loop building energy optimization using EnergyPlus thermodynamics and edge LLM reasoning. Real-time telemetry, HVAC setpoint optimization, and verified energy savings.",
  keywords: [
    "energy optimization",
    "building energy modeling",
    "HVAC optimization",
    "EnergyPlus",
    "AI in energy",
    "closed-loop control",
    "telemetry streaming",
    "sustainability engineering",
  ],
  authors: [{ name: "Manikya N." }],
  creator: "Manikya N.",
  publisher: "BEACON",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "BEACON — AI Building Energy Optimization",
    description:
      "Autonomous building energy intelligence platform converging EnergyPlus simulations with edge LLM reasoning to optimize HVAC control schedules.",
    url: "https://beacon-nu-swart.vercel.app",
    siteName: "BEACON Platform",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BEACON — AI Building Energy Optimization",
    description:
      "Autonomous building energy intelligence platform converging EnergyPlus simulations with edge LLM reasoning.",
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
