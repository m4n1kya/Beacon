"use client";

import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Activity, Radio, Cpu, Info, X, Wifi } from "lucide-react";

const TelemetryStream = dynamic(() => import("../components/TelemetryStream"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center text-[#6b7280]">
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
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs tracking-widest uppercase text-emerald-400 font-medium">
                  Live Feed
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
                Building Telemetry
              </h1>
              <p className="text-[#6b7280] text-lg max-w-xl">
                Real-time sensor feed from the BEACON monitoring network.
                Streaming HVAC performance, occupancy, and energy consumption
                data at 1.2s intervals.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1f2937] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] text-sm text-[#9ca3af] hover:text-white transition-all duration-200 self-start md:self-auto"
            >
              <Info className="w-4 h-4" />
              API Integration
            </button>
          </div>

          {/* Status Bar */}
          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { icon: Radio, label: "Stream", value: "Active", color: "text-emerald-400" },
              { icon: Wifi, label: "Latency", value: "1.2s", color: "text-blue-400" },
              { icon: Cpu, label: "Zone", value: "Zone 1 — HVAC Alpha", color: "text-purple-400" },
              { icon: Activity, label: "Sensor ID", value: "bldg_zone_1", color: "text-[#9ca3af]" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1f2937] bg-[rgba(255,255,255,0.02)] text-sm"
              >
                <Icon className={`w-3.5 h-3.5 ${color}`} />
                <span className="text-[#6b7280]">{label}:</span>
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
                border: "border-blue-500/20",
              },
              {
                title: "Anomaly Detection",
                desc: "BEACON flags readings 2+ standard deviations from baseline. Alerts routed to facility managers via webhook.",
                border: "border-purple-500/20",
              },
              {
                title: "AI Optimization Loop",
                desc: "Every 15 minutes, BEACON re-runs EnergyPlus simulation and computes new temperature setpoints for each zone.",
                border: "border-emerald-500/20",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`p-5 rounded-xl border ${card.border} bg-[rgba(255,255,255,0.02)] backdrop-blur-sm`}
              >
                <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{card.desc}</p>
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
          style={{ backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
        >
          <div className="w-full max-w-2xl rounded-2xl border border-[#1f2937] bg-[#0a0a0a] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1f2937]">
              <div>
                <h2 className="text-lg font-semibold text-white">API Integration Guide</h2>
                <p className="text-sm text-[#6b7280] mt-0.5">
                  Connect your sensors to the BEACON telemetry endpoint
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] text-[#6b7280] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#1f2937]">
              {(["rest", "mqtt"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "text-white border-b-2 border-emerald-400"
                      : "text-[#6b7280] hover:text-white"
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
                  <p className="text-sm text-[#9ca3af] mb-4">
                    Send sensor readings via HTTP POST. Ideal for cloud-connected gateways and edge devices with stable internet.
                  </p>
                  <pre className="bg-[#000] rounded-xl p-4 text-xs font-mono text-emerald-300 overflow-x-auto border border-[#1f2937] leading-relaxed">
                    {REST_PAYLOAD}
                  </pre>
                </div>
              )}
              {activeTab === "mqtt" && (
                <div>
                  <p className="text-sm text-[#9ca3af] mb-4">
                    For low-latency IoT sensors. MQTT over TLS with QoS level 1. Broker auto-scales with load.
                  </p>
                  <pre className="bg-[#000] rounded-xl p-4 text-xs font-mono text-blue-300 overflow-x-auto border border-[#1f2937] leading-relaxed">
                    {MQTT_CONFIG}
                  </pre>
                </div>
              )}
              <div className="mt-4 p-3 rounded-lg bg-[rgba(16,185,129,0.06)] border border-emerald-500/20">
                <p className="text-xs text-emerald-400">
                  Tip: The BEACON API is self-documenting. Visit{" "}
                  <code className="bg-[rgba(255,255,255,0.05)] px-1 rounded">/api/telemetry</code>{" "}
                  for the OpenAPI spec.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
