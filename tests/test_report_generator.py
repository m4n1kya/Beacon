"""
Tests for BEACON results integrity and reporting logic.
"""
import pytest
from report_generator import load_results


def test_load_results_schema():
    results = load_results()
    assert isinstance(results, dict)
    assert "baseline" in results
    assert "optimized" in results
    assert "savings_percent" in results

    required_metric_keys = {"outdoor_temperature", "building_electricity", "facility_electricity"}
    assert required_metric_keys.issubset(set(results["baseline"].keys()))
    assert required_metric_keys.issubset(set(results["optimized"].keys()))


def test_savings_calculation_accuracy():
    results = load_results()
    baseline_fac = results["baseline"]["facility_electricity"]
    optimized_fac = results["optimized"]["facility_electricity"]
    reported_savings = results["savings_percent"]

    expected_savings = ((baseline_fac - optimized_fac) / baseline_fac) * 100
    assert pytest.approx(reported_savings, rel=1e-4) == expected_savings
