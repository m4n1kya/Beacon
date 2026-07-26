import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
import streamlit as st


# -----------------------------
# KPI CARD
# -----------------------------

def metric_card(title, value, delta=None):

    st.metric(
        label=title,
        value=value,
        delta=delta
    )


# -----------------------------
# ENERGY BAR CHART
# -----------------------------

def energy_bar_chart(baseline, optimized):

    fig = go.Figure()

    fig.add_trace(
        go.Bar(
            name="Facility Energy",
            x=["Baseline", "Optimized"],
            y=[baseline, optimized],
            text=[
                f"{baseline:,.0f}",
                f"{optimized:,.0f}"
            ],
            textposition="outside"
        )
    )

    fig.update_layout(

        template="plotly_dark",

        title="Facility Electricity Comparison",

        height=420,

        margin=dict(
            l=30,
            r=30,
            t=60,
            b=30
        ),

        yaxis_title="Energy (J)",

        showlegend=False
    )

    return fig


# -----------------------------
# ENERGY PIE CHART
# -----------------------------

def energy_pie_chart(saved, remaining):

    fig = px.pie(

        values=[saved, remaining],

        names=[
            "Energy Saved",
            "Energy Used"
        ],

        hole=0.55,

        template="plotly_dark"
    )

    fig.update_layout(

        title="Energy Distribution",

        height=420
    )

    return fig


# -----------------------------
# SAVINGS GAUGE
# -----------------------------

def savings_gauge(value):

    fig = go.Figure(

        go.Indicator(

            mode="gauge+number",

            value=value,

            number={
                "suffix": "%"
            },

            title={
                "text": "Energy Savings"
            },

            gauge={

                "axis": {
                    "range": [0, 100]
                },

                "bar": {
                    "thickness": 0.3
                },

                "steps": [

                    {
                        "range": [0, 30],
                        "color": "#b91c1c"
                    },

                    {
                        "range": [30, 60],
                        "color": "#f59e0b"
                    },

                    {
                        "range": [60, 100],
                        "color": "#16a34a"
                    }

                ]
            }

        )

    )

    fig.update_layout(

        template="plotly_dark",

        height=350
    )

    return fig


# -----------------------------
# AI SCORE
# -----------------------------

def ai_score_gauge(score):

    fig = go.Figure(

        go.Indicator(

            mode="gauge+number",

            value=score,

            title={
                "text": "Optimization Score"
            },

            gauge={

                "axis": {
                    "range": [0, 100]
                },

                "bar": {
                    "thickness": 0.3
                },

                "steps": [

                    {
                        "range": [0, 50],
                        "color": "#b91c1c"
                    },

                    {
                        "range": [50, 80],
                        "color": "#f59e0b"
                    },

                    {
                        "range": [80, 100],
                        "color": "#16a34a"
                    }

                ]
            }

        )

    )

    fig.update_layout(

        template="plotly_dark",

        height=350
    )

    return fig


# -----------------------------
# HISTORY GRAPH
# -----------------------------

def history_chart(df):

    fig = px.line(

        df,

        x="Run",

        y="Savings",

        markers=True,

        template="plotly_dark"
    )

    fig.update_layout(

        title="Optimization History",

        height=350
    )

    return fig


# -----------------------------
# BUILDING PANEL
# -----------------------------

def building_panel(temp, cooling):

    st.subheader("Building Information")

    info = pd.DataFrame({

        "Parameter": [

            "Simulation Engine",

            "Weather",

            "Outdoor Temperature",

            "Cooling Setpoint",

            "HVAC",

            "Lighting",

            "Optimization"

        ],

        "Value": [

            "EnergyPlus 26.1",

            "weather.epw",

            f"{temp:.2f} °C",

            f"{cooling:.1f} °C",

            "Operational",

            "Operational",

            "Closed Loop"

        ]

    })

    st.dataframe(

        info,

        use_container_width=True,

        hide_index=True
    )


# -----------------------------
# AI SUMMARY
# -----------------------------

def ai_summary(temp, savings):

    st.subheader("AI Recommendation")

    st.info(f"""

Recommended Cooling Setpoint

**{temp:.1f} °C**

Expected Facility Energy Savings

**{savings:.2f}%**

The AI analyzed the EnergyPlus simulation outputs,
recommended a revised cooling setpoint,
updated the building model,
executed a second simulation,
and evaluated the resulting energy performance.

""")