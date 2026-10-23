"""
Tests for BEACON project configuration and directory structure.
"""
from pathlib import Path
import config


def test_base_directory_structure():
    assert isinstance(config.BASE_DIR, Path)
    assert config.BASE_DIR.exists()
    assert config.MODELS_DIR.exists()
    assert config.OUTPUTS_DIR.exists()


def test_model_files_exist():
    assert config.IDF_FILE.exists()
    assert config.IDF_FILE.stat().st_size > 0
    assert config.EPW_FILE.exists()
    assert config.EPW_FILE.stat().st_size > 0


def test_telemetry_csv_exists():
    csv_path = config.OUTPUTS_DIR / "telemetry_data.csv"
    assert csv_path.exists()
    assert csv_path.stat().st_size > 0
