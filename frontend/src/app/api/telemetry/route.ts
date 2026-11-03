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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month");
  const limit = searchParams.get("limit");

  let data = telemetryData;
  if (month) {
    data = data.filter((d) => d.month.toLowerCase() === month.toLowerCase());
  }
  if (limit) {
    const numLimit = parseInt(limit, 10);
    if (!isNaN(numLimit) && numLimit > 0) {
      data = data.slice(0, numLimit);
    }
  }

  return NextResponse.json(
    {
      source: "BEACON EnergyPlus Engine",
      count: data.length,
      data,
    },
    {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        "Content-Type": "application/json",
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sensor_id, metrics, timestamp } = body ?? {};

    if (!sensor_id || typeof sensor_id !== "string") {
      return NextResponse.json(
        { error: "Validation failed: 'sensor_id' is required and must be a string." },
        { status: 400 }
      );
    }

    if (!metrics || typeof metrics !== "object") {
      return NextResponse.json(
        { error: "Validation failed: 'metrics' object is required." },
        { status: 400 }
      );
    }

    const temp = Number(metrics.temperature_c ?? metrics.temperature);
    const power = Number(metrics.hvac_power_w ?? metrics.electricity);

    if (isNaN(temp) || isNaN(power)) {
      return NextResponse.json(
        { error: "Validation failed: 'temperature_c' and 'hvac_power_w' must be valid numbers." },
        { status: 400 }
      );
    }

    // BEACON calculations: Carbon emission coefficient ~0.0004 kgCO2/Wh
    const carbonKgPerHour = (power * 0.0004).toFixed(3);
    const optimalSetpoint = 25.0;
    const tempDelta = Number((temp - optimalSetpoint).toFixed(2));
    const requiresAction = temp > 26.0 || temp < 20.0;

    return NextResponse.json(
      {
        status: "acknowledged",
        sensor_id,
        timestamp: timestamp || new Date().toISOString(),
        telemetry: {
          temperature_c: temp,
          hvac_power_w: power,
          occupancy_count: metrics.occupancy_count ?? null,
        },
        analytics: {
          carbon_emission_kg_per_h: parseFloat(carbonKgPerHour),
          target_setpoint_c: optimalSetpoint,
          setpoint_delta_c: tempDelta,
          anomaly_flag: requiresAction,
          recommendation: requiresAction
            ? "Zone deviation detected: trigger EnergyPlus adaptive setpoint schedule."
            : "Nominal thermal equilibrium maintained.",
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload in request body." },
      { status: 400 }
    );
  }
}
