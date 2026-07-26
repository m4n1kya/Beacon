from data_extractor import get_metrics
import requests
import re

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "qwen2.5:1.5b"


def ask_ai(metrics):

    prompt = f"""
You are an EnergyPlus building energy optimization expert.

Simulation Results:
- Average Outdoor Temperature: {metrics['outdoor_temperature']:.2f} °C
- Building Electricity: {metrics['building_electricity']:.2f} J
- Facility Electricity: {metrics['facility_electricity']:.2f} J

Recommend an optimal weekday cooling setpoint.

Rules:
- Return ONE cooling temperature between 23 and 27 °C.
- Write it exactly like this:

Cooling Setpoint: 25.0

Then explain:
1. Why you chose this temperature.
2. HVAC improvements.
3. Lighting improvements.
4. Estimated energy savings (%).

Keep the answer concise.
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "prompt": prompt,
            "stream": False
        }
    )

    response.raise_for_status()

    answer = response.json()["response"]

    match = re.search(r"Cooling Setpoint:\s*([0-9]+(?:\.[0-9]+)?)", answer)

    if match:
        temperature = float(match.group(1))
    else:
        temperature = 25.0

    return answer, temperature


if __name__ == "__main__":

    metrics = get_metrics()

    answer, temp = ask_ai(metrics)

    print("\n===== AI RESPONSE =====\n")
    print(answer)

    print(f"\nAI Temperature = {temp} °C")