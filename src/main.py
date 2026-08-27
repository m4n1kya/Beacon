from energyplus_runner import run_energyplus
from data_extractor import get_metrics
from ai_agent import ask_ai
from idf_controller import create_ai_model, update_cooling_schedule
from config import MODELS_DIR

import json

print("========== BEACON ==========")

# ---------------------------------
# 1. Baseline Simulation
# ---------------------------------

print("\nRunning Baseline Simulation...")

baseline = MODELS_DIR / "baseline.idf"

run_energyplus(baseline)

baseline_metrics = get_metrics()

print(baseline_metrics)

# ---------------------------------
# 2. AI Analysis
# ---------------------------------

print("\nAI analyzing building...\n")

answer, temperature = ask_ai(baseline_metrics)

print(answer)

print(f"\nAI Recommended Cooling Setpoint: {temperature} °C")

# ---------------------------------
# 3. AI Optimization
# ---------------------------------

print("\nApplying AI Optimization...")

create_ai_model()

update_cooling_schedule(temperature)

# ---------------------------------
# 4. Optimized Simulation
# ---------------------------------

optimized = MODELS_DIR / "ai_modified.idf"

run_energyplus(optimized)

optimized_metrics = get_metrics()

print("\n===== OPTIMIZED RESULTS =====")

print(optimized_metrics)

# ---------------------------------
# 5. Energy Savings
# ---------------------------------

baseline_energy = baseline_metrics["facility_electricity"]
optimized_energy = optimized_metrics["facility_electricity"]

savings = ((baseline_energy - optimized_energy) / baseline_energy) * 100

print(f"\nEstimated Energy Savings: {savings:.2f}%")

# ---------------------------------
# 6. Save Results
# ---------------------------------

results = {
    "baseline": baseline_metrics,
    "optimized": optimized_metrics,
    "savings_percent": savings,
    "recommended_temperature": temperature
}

with open("../results.json", "w") as f:
    json.dump(results, f, indent=4)

print("\nresults.json saved successfully.")

print("\nClosed-loop completed successfully.")