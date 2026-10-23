"""
Tests for BEACON data extraction module.
"""
import pandas as pd
from data_extractor import get_timeseries_data


def test_get_timeseries_data_returns_dataframe():
    df = get_timeseries_data()
    assert isinstance(df, pd.DataFrame)
    assert not df.empty


def test_get_timeseries_data_columns():
    df = get_timeseries_data()
    expected_cols = {"TimeIndex", "Temperature", "Electricity"}
    assert expected_cols.issubset(set(df.columns))


def test_get_timeseries_data_integrity():
    df = get_timeseries_data()
    # Ensure no NaN values
    assert df["TimeIndex"].isna().sum() == 0
    assert df["Temperature"].isna().sum() == 0
    assert df["Electricity"].isna().sum() == 0

    # Physical bounds checks
    assert (df["Temperature"] >= -30).all()
    assert (df["Temperature"] <= 60).all()
    assert (df["Electricity"] >= 0).all()
