import json
from pathlib import Path

def test_results_json_contract():
    """Verify results.json matches the contract expected by Next.js API routes."""
    results_path = Path(__file__).resolve().parent.parent / "results.json"
    assert results_path.exists(), "results.json must exist in root repository"
    
    with open(results_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    assert "baseline" in data
    assert "optimized" in data
    assert "savings_percent" in data
    assert "recommended_temperature" in data
    
    assert data["baseline"]["facility_electricity"] > 0
    assert data["optimized"]["facility_electricity"] > 0
    assert data["savings_percent"] > 0
    assert data["recommended_temperature"] == 25.0

def test_telemetry_dataset_integrity():
    """Verify telemetry CSV dataset exists and has valid numerical bounds."""
    csv_path = Path(__file__).resolve().parent.parent / "outputs" / "telemetry_data.csv"
    assert csv_path.exists(), "telemetry_data.csv must exist in outputs"
    
    import pandas as pd
    df = pd.read_csv(csv_path)
    assert not df.empty
    assert "Temperature" in df.columns
    assert "Electricity" in df.columns
    assert df["Temperature"].min() > -20
    assert df["Temperature"].max() < 60
    assert (df["Electricity"] >= 0).all()
