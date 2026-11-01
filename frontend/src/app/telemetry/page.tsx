"use client";

import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Activity, Radio, Cpu, Info, X, Wifi } from "lucide-react";

const TelemetryStream = dynamic(() => import("../components/TelemetryStream"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center text-[#64748b]">
      Initializing stream...
    </div>
  ),
});

const REST_PAYLOAD = `POST /api/telemetry/ingest
Content-Type: application/json
Authorization: Bearer <your_token>

{
  "sensor_id": "bldg_zone_1",
  "timestamp": "2025-01-15T14:30:00Z",
  "metrics": {
    "temperature_c": 22.4,
    "hvac_power_w": 10450,
    "occupancy_count": 142,
    "co2_ppm": 480,
    "humidity_pct": 54
  }
}`;

const MQTT_CONFIG = `# MQTT Broker Configuration
broker: mqtt.beacon-energy.io
port: 8883
protocol: mqtts (TLS)

# Topic Structure
buildings/{building_id}/zones/{zone_id}/telemetry

# Example Payload
{
  "ts": 1705327800000,
  "temp": 22.4,
  "power": 10450,
  "occ": 142
}`;

export default function TelemetryPage() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"rest" | "mqtt">("rest");

  return (
    <div className="min-h-screen bg-black text-[#f1f5f9] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
                <span className="text-xs tracking-widest uppercase text-[#90CAF9] font-medium">
                  Live Feed
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-[#f1f5f9]">
                Building Telemetry
              </h1>
              <p className="text-[#94a3b8] text-lg max-w-xl">
                Real-time sensor feed from the BEACON monitoring network.
                Streaming HVAC performance, occupancy, and energy consumption
                data at 1.2s intervals.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-sm text-[#94a3b8] hover:text-white transition-all duration-200 self-start md:self-auto hover:border-white/[0.15]"
            >
              <Info className="w-4 h-4 text-[#90CAF9]" />
              API Integration
            </button>
          </div>

          {/* Status Bar */}
          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { icon: Radio, label: "Stream", value: "Active", color: "text-[#00E5FF]" },
              { icon: Wifi, label: "Latency", value: "1.2s", color: "text-[#90CAF9]" },
              { icon: Cpu, label: "Zone", value: "Zone 1 — HVAC Alpha", color: "text-[#E3F2FD]" },
              { icon: Activity, label: "Sensor ID", value: "bldg_zone_1", color: "text-[#94a3b8]" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-sm"
              >
                <Icon className={`w-3.5 h-3.5 ${color}`} />
                <span className="text-[#64748b]">{label}:</span>
                <span className={`font-medium ${color}`}>{value}</span>
              </div>
            ))}
          </div>

          {/* Telemetry Stream Component */}
          <TelemetryStream />

          {/* Info Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {[
              {
                title: "Data Retention",
                desc: "Rolling 24-hour window stored in-memory. Historical data exported to time-series DB daily.",
                border: "border-[rgba(144,202,249,0.25)] bg-[rgba(144,202,249,0.03)]",
              },
              {
                title: "Anomaly Detection",
                desc: "BEACON flags readings 2+ standard deviations from baseline. Alerts routed to facility managers via webhook.",
                border: "border-[rgba(33,150,243,0.25)] bg-[rgba(33,150,243,0.03)]",
              },
              {
                title: "AI Optimization Loop",
                desc: "Every 15 minutes, BEACON re-runs EnergyPlus simulation and computes new temperature setpoints for each zone.",
                border: "border-[rgba(0,229,255,0.25)] bg-[rgba(0,229,255,0.03)]",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`p-5 rounded-2xl border ${card.border} backdrop-blur-sm`}
              >
                <h3 className="text-sm font-semibold text-[#f1f5f9] mb-2">{card.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* API Integration Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
        >
          <div className="w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[#121212] overflow-hidden shadow-[0_0_50px_rgba(33,150,243,0.2)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <div>
                <h2 className="text-lg font-semibold text-[#f1f5f9]">API Integration Guide</h2>
                <p className="text-sm text-[#94a3b8] mt-0.5">
                  Connect your sensors to the BEACON telemetry endpoint
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-white/[0.06] text-[#94a3b8] hover:text-[#f1f5f9] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/[0.06]">
              {(["rest", "mqtt"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "text-white border-b-2 border-[#00E5FF] font-semibold"
                      : "text-[#94a3b8] hover:text-white"
                  }`}
                >
                  {tab === "rest" ? "REST API" : "MQTT (IoT)"}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {activeTab === "rest" && (
                <div>
                  <p className="text-sm text-[#94a3b8] mb-4">
                    Send sensor readings via HTTP POST. Ideal for cloud-connected gateways and edge devices with stable internet.
                  </p>
                  <pre className="bg-[#000000] rounded-xl p-4 text-xs font-mono text-[#90CAF9] overflow-x-auto border border-white/[0.06] leading-relaxed">
                    {REST_PAYLOAD}
                  </pre>
                </div>
              )}
              {activeTab === "mqtt" && (
                <div>
                  <p className="text-sm text-[#94a3b8] mb-4">
                    For low-latency IoT sensors. MQTT over TLS with QoS level 1. Broker auto-scales with load.
                  </p>
                  <pre className="bg-[#000000] rounded-xl p-4 text-xs font-mono text-[#00E5FF] overflow-x-auto border border-white/[0.06] leading-relaxed">
                    {MQTT_CONFIG}
                  </pre>
                </div>
              )}
              <div className="mt-4 p-3.5 rounded-xl bg-[rgba(33,150,243,0.08)] border border-[rgba(33,150,243,0.25)]">
                <p className="text-xs text-[#90CAF9]">
                  Tip: The BEACON API is self-documenting. Visit{" "}
                  <code className="bg-white/[0.05] px-1.5 py-0.5 rounded text-white font-mono">/api/telemetry</code>{" "}
                  for the live JSON output.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
