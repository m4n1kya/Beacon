import subprocess
import sqlite3
from config import IDF_FILE, EPW_FILE, OUTPUTS_DIR, ENERGYPLUS_EXE


def run_energyplus():
    OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)

    cmd = [
        ENERGYPLUS_EXE,
        "-w", str(EPW_FILE),
        "-d", str(OUTPUTS_DIR),
        str(IDF_FILE),
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    print(result.stdout)

    if result.returncode != 0:
        print(result.stderr)
        raise RuntimeError("EnergyPlus failed")


def read_sql():
    sql_file = OUTPUTS_DIR / "eplusout.sql"

    import sqlite3

    conn = sqlite3.connect(sql_file)

    cursor = conn.cursor()

    print("\n===== Available Variables =====\n")

    cursor.execute("""
        SELECT ReportDataDictionaryIndex,
               Name,
               Units
        FROM ReportDataDictionary
        LIMIT 50;
    """)

    rows = cursor.fetchall()

    for row in rows:
        print(row)

    conn.close()


if __name__ == "__main__":
    run_energyplus()
    read_sql()