# BEACON API Specification & Integration Guide

The **BEACON** platform exposes RESTful Edge endpoints hosted on global serverless edge infrastructure with sub-second latencies and persistent uptime.

---

## 1. Verified Results Endpoint

### `GET /api/results`
Returns the verified thermodynamic simulation metrics synthesized by the closed-loop optimization cycle.

#### Response Schema (`200 OK`)
```json
{
  "project": "BEACON",
  "baseline": {
    "outdoor_temperature": 25.578812785388127,
    "building_electricity": 257872140000.0,
    "facility_electricity": 377653423039.6244
  },
  "optimized": {
    "outdoor_temperature": 25.578812785388127,
    "building_electricity": 257872140000.0,
    "facility_electricity": 364161184778.8737
  },
  "savings_percent": 3.57265085859821,
  "recommended_temperature": 25.0
}
```

---

## 2. Real-Time Telemetry Endpoints

### `GET /api/telemetry`
Retrieves pre-extracted annual EnergyPlus time-series telemetry data points.

#### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `month` | `string` | Optional | Filter by month (e.g. `Jul`, `Jan`) |
| `limit` | `number` | Optional | Limit maximum returned points (e.g. `6`) |

#### Example Request
```http
GET /api/telemetry?month=Jul
```

#### Response Schema (`200 OK`)
```json
{
  "source": "BEACON EnergyPlus Engine",
  "count": 1,
  "data": [
    {
      "timeIndex": 5088,
      "month": "Jul",
      "temperature": 26.025,
      "electricity": 18895444962.868
    }
  ]
}
```

---

### `POST /api/telemetry`
Ingests live sensor readings from physical IoT gateways or virtual building automation controllers.

#### Headers
```http
Content-Type: application/json
```

#### Request Payload
```json
{
  "sensor_id": "bldg_zone_1",
  "timestamp": "2026-11-03T11:30:00Z",
  "metrics": {
    "temperature_c": 22.4,
    "hvac_power_w": 10450,
    "occupancy_count": 142
  }
}
```

#### Response Schema (`201 Created`)
```json
{
  "status": "acknowledged",
  "sensor_id": "bldg_zone_1",
  "timestamp": "2026-11-03T11:30:00Z",
  "telemetry": {
    "temperature_c": 22.4,
    "hvac_power_w": 10450,
    "occupancy_count": 142
  },
  "analytics": {
    "carbon_emission_kg_per_h": 4.18,
    "target_setpoint_c": 25.0,
    "setpoint_delta_c": -2.6,
    "anomaly_flag": false,
    "recommendation": "Nominal thermal equilibrium maintained."
  }
}
```

---

## 3. MQTT Broker Specification (IoT Bridge)

For high-frequency edge sensor telemetry, BEACON supports streaming via MQTT over TLS.

- **Broker Host:** `mqtt.beacon-energy.io`
- **Port:** `8883` (MQTTS with TLS 1.3)
- **Topic Schema:** `buildings/{building_id}/zones/{zone_id}/telemetry`
- **QoS Level:** `1` (At least once delivery)
