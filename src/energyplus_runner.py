import subprocess
from pathlib import Path
from config import EPW_FILE, OUTPUTS_DIR, ENERGYPLUS_EXE

def run_energyplus(idf_file):

    OUTPUTS_DIR.mkdir(exist_ok=True)

    cmd = [
        ENERGYPLUS_EXE,
        "-w", str(EPW_FILE),
        "-d", str(OUTPUTS_DIR),
        str(idf_file)
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(result.stderr)
        raise RuntimeError("EnergyPlus failed.")

    print("Simulation completed.")