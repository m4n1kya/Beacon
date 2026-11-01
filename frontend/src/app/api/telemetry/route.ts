import { NextResponse } from "next/server";

// Monthly telemetry data extracted from EnergyPlus SQLite simulation
// TimeIndex = hour of year, Temperature in °C, Electricity in Watts
const telemetryData = [
  { timeIndex: 744,  month: "Jan", temperature: 15.175,  electricity: 13184787015.267 },
  { timeIndex: 1416, month: "Feb", temperature: 15.9625, electricity: 12143124337.441 },
  { timeIndex: 2160, month: "Mar", temperature: 24.575,  electricity: 13848189331.712 },
  { timeIndex: 2880, month: "Apr", temperature: 31.325,  electricity: 14746939125.350 },
  { timeIndex: 3624, month: "May", temperature: 27.5625, electricity: 16712089150.751 },
  { timeIndex: 4344, month: "Jun", temperature: 31.3125, electricity: 16562598806.235 },
  { timeIndex: 5088, month: "Jul", temperature: 26.025,  electricity: 18895444962.868 },
  { timeIndex: 5832, month: "Aug", temperature: 28.875,  electricity: 17531361710.505 },
  { timeIndex: 6552, month: "Sep", temperature: 29.1875, electricity: 15921209033.170 },
  { timeIndex: 7296, month: "Oct", temperature: 21.3,    electricity: 16294085118.700 },
  { timeIndex: 8016, month: "Nov", temperature: 17.3125, electricity: 13320278032.147 },
  { timeIndex: 8760, month: "Dec", temperature: 12.875,  electricity: 12920485765.294 },
];

export async function GET() {
  return NextResponse.json(telemetryData, {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
