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

def get_timeseries_data():
    conn = sqlite3.connect(DB)
    
    # Get temperature timeseries
    temp_df = pd.read_sql_query("""
        SELECT rd.TimeIndex, rd.Value as Temperature 
        FROM ReportData rd 
        JOIN ReportDataDictionary rdd ON rd.ReportDataDictionaryIndex=rdd.ReportDataDictionaryIndex 
        WHERE rdd.Name='Site Outdoor Air Drybulb Temperature'
        ORDER BY rd.TimeIndex
    """, conn)
    
    # Get electricity timeseries
    elec_df = pd.read_sql_query("""
        SELECT rd.TimeIndex, rd.Value as Electricity 
        FROM ReportData rd 
        JOIN ReportDataDictionary rdd ON rd.ReportDataDictionaryIndex=rdd.ReportDataDictionaryIndex 
        WHERE rdd.Name='Electricity:Facility'
        ORDER BY rd.TimeIndex
    """, conn)
    
    conn.close()
    
    # Merge on TimeIndex
    df = pd.merge(temp_df, elec_df, on='TimeIndex')
    return df

if __name__ == "__main__":
    print(get_metrics())