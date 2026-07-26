import shutil
import re
from config import MODELS_DIR

BASELINE = MODELS_DIR / "baseline.idf"
AI_MODEL = MODELS_DIR / "ai_modified.idf"


def create_ai_model():
    shutil.copy(BASELINE, AI_MODEL)


def update_cooling_schedule(new_temp):

    with open(AI_MODEL, "r", encoding="utf-8") as f:
        text = f.read()

    pattern = (
        r"(Schedule:Compact,\s*"
        r"Clg-SetP-Sch,.*?"
        r"Until:\s*20:00,)"
        r"(\d+\.?\d*)"
    )

    text = re.sub(
        pattern,
        rf"\g<1>{new_temp}",
        text,
        flags=re.DOTALL
    )

    with open(AI_MODEL, "w", encoding="utf-8") as f:
        f.write(text)

    print(f"Cooling schedule updated to {new_temp}°C")


if __name__ == "__main__":
    create_ai_model()
    update_cooling_schedule(25.0)