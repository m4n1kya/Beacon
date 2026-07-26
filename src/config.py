from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"
OUTPUTS_DIR = BASE_DIR / "outputs"

IDF_FILE = MODELS_DIR / "baseline.idf"
EPW_FILE = MODELS_DIR / "weather.epw"

ENERGYPLUS_EXE = r"C:\EnergyPlusV26-1-0\energyplus.exe"