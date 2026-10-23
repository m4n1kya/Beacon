"""
Tests for BEACON AI agent response extraction and fallback parsing.
"""
import re


def parse_temperature(response_text: str) -> float:
    match = re.search(r"Cooling Setpoint:\s*([0-9]+(?:\.[0-9]+)?)", response_text)
    if match:
        return float(match.group(1))
    return 25.0


def test_parse_exact_format():
    text = "Simulation complete.\nCooling Setpoint: 25.5\nEstimated savings: 4.2%"
    assert parse_temperature(text) == 25.5


def test_parse_integer_format():
    text = "Analysis shows:\nCooling Setpoint: 26\nOccupant comfort maintained."
    assert parse_temperature(text) == 26.0


def test_parse_fallback():
    text = "Optimal setpoint recommended at moderate range without exact prefix."
    assert parse_temperature(text) == 25.0
