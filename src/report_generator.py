import json
import csv
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

BASE_DIR = Path(__file__).resolve().parent.parent

REPORTS = BASE_DIR / "reports"
REPORTS.mkdir(exist_ok=True)


# ------------------------------------------------
# LOAD RESULTS
# ------------------------------------------------

def load_results():

    with open(BASE_DIR / "results.json", "r") as f:
        return json.load(f)


# ------------------------------------------------
# EXPORT CSV
# ------------------------------------------------

def export_csv():

    results = load_results()

    baseline = results["baseline"]
    optimized = results["optimized"]

    csv_path = REPORTS / "energy_report.csv"

    with open(csv_path, "w", newline="") as f:

        writer = csv.writer(f)

        writer.writerow(["Metric", "Baseline", "Optimized"])

        writer.writerow([
            "Outdoor Temperature",
            baseline["outdoor_temperature"],
            optimized["outdoor_temperature"]
        ])

        writer.writerow([
            "Building Electricity",
            baseline["building_electricity"],
            optimized["building_electricity"]
        ])

        writer.writerow([
            "Facility Electricity",
            baseline["facility_electricity"],
            optimized["facility_electricity"]
        ])

        writer.writerow([
            "Cooling Setpoint",
            "-",
            results["recommended_temperature"]
        ])

        writer.writerow([
            "Savings %",
            "-",
            results["savings_percent"]
        ])

    return csv_path


# ------------------------------------------------
# EXPORT JSON
# ------------------------------------------------

def export_json():

    results = load_results()

    json_path = REPORTS / "energy_report.json"

    with open(json_path, "w") as f:

        json.dump(results, f, indent=4)

    return json_path


# ------------------------------------------------
# PDF REPORT
# ------------------------------------------------

def generate_pdf():

    results = load_results()

    baseline = results["baseline"]
    optimized = results["optimized"]

    pdf_path = REPORTS / "energy_report.pdf"

    styles = getSampleStyleSheet()

    doc = SimpleDocTemplate(str(pdf_path))

    story = []

    story.append(
        Paragraph(
            "<b>EcoLoop AI Energy Optimization Report</b>",
            styles["Title"]
        )
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            "Generated automatically using EnergyPlus, Python and Ollama.",
            styles["Normal"]
        )
    )

    story.append(Spacer(1, 20))

    table = Table([

        ["Metric", "Baseline", "Optimized"],

        [
            "Outdoor Temp (°C)",
            f"{baseline['outdoor_temperature']:.2f}",
            f"{optimized['outdoor_temperature']:.2f}"
        ],

        [
            "Building Electricity (J)",
            f"{baseline['building_electricity']:,.0f}",
            f"{optimized['building_electricity']:,.0f}"
        ],

        [
            "Facility Electricity (J)",
            f"{baseline['facility_electricity']:,.0f}",
            f"{optimized['facility_electricity']:,.0f}"
        ],

        [
            "Cooling Setpoint",
            "-",
            f"{results['recommended_temperature']} °C"
        ],

        [
            "Energy Savings",
            "-",
            f"{results['savings_percent']:.2f}%"
        ]

    ])

    table.setStyle(

        TableStyle([

            ("BACKGROUND", (0,0), (-1,0), colors.darkblue),

            ("TEXTCOLOR", (0,0), (-1,0), colors.white),

            ("GRID", (0,0), (-1,-1), 1, colors.grey),

            ("BACKGROUND", (0,1), (-1,-1), colors.beige),

            ("ALIGN", (0,0), (-1,-1), "CENTER"),

            ("BOTTOMPADDING", (0,0), (-1,0), 10)

        ])

    )

    story.append(table)

    story.append(Spacer(1,20))

    story.append(

        Paragraph(

            f"<b>Estimated Facility Energy Savings:</b> {results['savings_percent']:.2f}%",

            styles["Heading2"]

        )

    )

    story.append(

        Paragraph(

            "The AI analyzed simulation outputs, selected an optimized cooling "
            "setpoint, modified the EnergyPlus model automatically, reran the "
            "simulation, and evaluated the resulting energy performance.",

            styles["BodyText"]

        )

    )

    doc.build(story)

    return pdf_path


# ------------------------------------------------
# GENERATE EVERYTHING
# ------------------------------------------------

def generate_all():

    pdf = generate_pdf()

    csv_file = export_csv()

    json_file = export_json()

    return pdf, csv_file, json_file


if __name__ == "__main__":

    files = generate_all()

    print("\nGenerated Files")

    for f in files:

        print(f)