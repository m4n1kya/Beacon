"""
Tests for BEACON IDF controller and schedule mutation logic.
"""
import re


def test_cooling_schedule_regex_replacement():
    sample_idf_snippet = """
Schedule:Compact,
    Clg-SetP-Sch,            !- Name
    Temperature,             !- Schedule Type Limits Name
    Through: 12/31,          !- Field 1
    For: Weekdays SummerDesignDay, !- Field 2
    Until: 06:00,26.7,       !- Field 3
    Until: 20:00,23.9,       !- Field 5
    Until: 24:00,26.7;       !- Field 7
"""
    pattern = (
        r"(Schedule:Compact,\s*"
        r"Clg-SetP-Sch,.*?"
        r"Until:\s*20:00,)"
        r"(\d+\.?\d*)"
    )

    new_setpoint = 25.0
    modified = re.sub(pattern, rf"\g<1>{new_setpoint}", sample_idf_snippet, flags=re.DOTALL)

    assert "Until: 20:00,25.0," in modified
    assert "Until: 20:00,23.9," not in modified
    assert "Until: 06:00,26.7," in modified


def test_cooling_schedule_float_precision():
    sample_idf_snippet = "Schedule:Compact,\n    Clg-SetP-Sch,\n    Until: 20:00,24.0"
    pattern = (
        r"(Schedule:Compact,\s*"
        r"Clg-SetP-Sch,.*?"
        r"Until:\s*20:00,)"
        r"(\d+\.?\d*)"
    )

    new_setpoint = 25.25
    modified = re.sub(pattern, rf"\g<1>{new_setpoint}", sample_idf_snippet, flags=re.DOTALL)
    assert "Until: 20:00,25.25" in modified
