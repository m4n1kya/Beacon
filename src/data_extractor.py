import sqlite3
from config import OUTPUTS_DIR

DB = OUTPUTS_DIR / "eplusout.sql"


def get_metrics():

    conn = sqlite3.connect(DB)
    cur = conn.cursor()

    def average(variable):

        cur.execute("""
        SELECT AVG(rd.Value)
        FROM ReportData rd
        JOIN ReportDataDictionary rdd
        ON rd.ReportDataDictionaryIndex=rdd.ReportDataDictionaryIndex
        WHERE rdd.Name=?
        """, (variable,))

        result = cur.fetchone()[0]
        return result if result else 0

    def total(variable):

        cur.execute("""
        SELECT SUM(rd.Value)
        FROM ReportData rd
        JOIN ReportDataDictionary rdd
        ON rd.ReportDataDictionaryIndex=rdd.ReportDataDictionaryIndex
        WHERE rdd.Name=?
        """, (variable,))

        result = cur.fetchone()[0]
        return result if result else 0

    metrics = {
        "outdoor_temperature": average("Site Outdoor Air Drybulb Temperature"),
        "building_electricity": total("Electricity:Building"),
        "facility_electricity": total("Electricity:Facility"),
    }

    conn.close()

    return metrics


import pandas as pd
import os

def get_timeseries_data():
    csv_path = OUTPUTS_DIR / "telemetry_data.csv"
    if os.path.exists(csv_path):
        return pd.read_csv(csv_path)
    
    # Fallback to sqlite if needed (e.g. locally before extracting)
    conn = sqlite3.connect(DB)
    temp_df = pd.read_sql_query("""
        SELECT rd.TimeIndex, rd.Value as Temperature 
        FROM ReportData rd 
        JOIN ReportDataDictionary rdd ON rd.ReportDataDictionaryIndex=rdd.ReportDataDictionaryIndex 
        WHERE rdd.Name='Site Outdoor Air Drybulb Temperature'
        ORDER BY rd.TimeIndex
    """, conn)
    
    elec_df = pd.read_sql_query("""
        SELECT rd.TimeIndex, rd.Value as Electricity 
        FROM ReportData rd 
        JOIN ReportDataDictionary rdd ON rd.ReportDataDictionaryIndex=rdd.ReportDataDictionaryIndex 
        WHERE rdd.Name='Electricity:Facility'
        ORDER BY rd.TimeIndex
    """, conn)
    conn.close()
    
    df = pd.merge(temp_df, elec_df, on='TimeIndex')
    return df

if __name__ == "__main__":
    print(get_metrics())