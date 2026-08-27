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

# -----------------------------
# INTERACTIVE GLOBE
# -----------------------------

def interactive_globe():
    df = pd.DataFrame({
        'start_lat': [40.7128, 51.5074, 35.6895, -33.8688, 1.3521, 48.8566, 37.7749],
        'start_lon': [-74.0060, -0.1278, 139.6917, 151.2093, 103.8198, 2.3522, -122.4194],
        'end_lat': [51.5074, 35.6895, -33.8688, 1.3521, 40.7128, 40.7128, 35.6895],
        'end_lon': [-0.1278, 139.6917, 151.2093, 103.8198, -74.0060, -74.0060, 139.6917],
        'city': ['New York', 'London', 'Tokyo', 'Sydney', 'Singapore', 'Paris', 'San Francisco']
    })

    fig = go.Figure()

    for i in range(len(df)):
        fig.add_trace(
            go.Scattergeo(
                lat=[df['start_lat'][i], df['end_lat'][i]],
                lon=[df['start_lon'][i], df['end_lon'][i]],
                mode='lines',
                line=dict(width=2, color='#6366f1'),
                opacity=0.6,
                hoverinfo='none'
            )
        )

    fig.add_trace(
        go.Scattergeo(
            lat=df['start_lat'],
            lon=df['start_lon'],
            mode='markers+text',
            text=df['city'],
            textposition='top center',
            textfont=dict(color='rgba(255,255,255,0.8)', size=10),
            marker=dict(
                size=8,
                color='#818cf8',
                line=dict(width=1, color='rgba(255, 255, 255, 0.8)'),
                symbol='circle'
            ),
            hoverinfo='text'
        )
    )

    fig.update_layout(
        showlegend=False,
        geo=dict(
            projection_type='orthographic',
            showcoastlines=True,
            coastlinecolor='rgba(255, 255, 255, 0.1)',
            showland=True,
            landcolor='rgba(20, 20, 35, 1)',
            showocean=True,
            oceancolor='rgba(10, 10, 20, 1)',
            showlakes=True,
            lakecolor='rgba(10, 10, 20, 1)',
            showcountries=True,
            countrycolor='rgba(255, 255, 255, 0.1)',
            bgcolor='rgba(0,0,0,0)'
        ),
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        margin=dict(l=0, r=0, t=20, b=20),
        height=500,
    )

    return fig
