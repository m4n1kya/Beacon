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
            name="Baseline",
            x=["Baseline", "Optimized"],
            y=[baseline, optimized],
            text=[f"{baseline:,.0f}", f"{optimized:,.0f}"],
            textposition="auto",
            marker_color=["rgba(99, 102, 241, 0.3)", "#34d399"],
            marker_line_color=["rgba(99, 102, 241, 0.8)", "#10b981"],
            marker_line_width=1,
            width=0.4
        )
    )

    fig.update_layout(
        title="Facility Electricity Comparison",
        height=420,
        margin=dict(l=20, r=20, t=50, b=20),
        showlegend=False,
        plot_bgcolor="rgba(0,0,0,0)",
        paper_bgcolor="rgba(0,0,0,0)",
        xaxis=dict(showgrid=False, zeroline=False, visible=True),
        yaxis=dict(showgrid=False, zeroline=False, visible=False)
    )

    return fig


# -----------------------------
# ENERGY PIE CHART
# -----------------------------

def energy_pie_chart(saved, remaining):

    fig = go.Figure(data=[go.Pie(
        values=[saved, remaining],
        labels=["Energy Saved", "Energy Used"],
        hole=0.75,
        marker=dict(colors=["#34d399", "rgba(99, 102, 241, 0.15)"], line=dict(color="rgba(255,255,255,0.05)", width=2)),
        textinfo="percent",
        textfont=dict(color="rgba(255,255,255,0.8)", size=14),
        hoverinfo="label+value"
    )])

    fig.update_layout(
        title="Energy Distribution",
        height=420,
        margin=dict(l=20, r=20, t=50, b=20),
        showlegend=True,
        legend=dict(orientation="h", yanchor="bottom", y=-0.15, xanchor="center", x=0.5),
        plot_bgcolor="rgba(0,0,0,0)",
        paper_bgcolor="rgba(0,0,0,0)",
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
            number={"suffix": "%", "font": {"color": "#34d399", "size": 40}},
            title={"text": "Energy Savings", "font": {"color": "rgba(255,255,255,0.7)", "size": 14}},
            gauge={
                "axis": {"range": [0, 100], "visible": False},
                "bar": {"color": "#34d399", "thickness": 0.2},
                "bgcolor": "rgba(255,255,255,0.05)",
                "borderwidth": 0
            }
        )
    )

    fig.update_layout(
        height=350,
        margin=dict(l=20, r=20, t=50, b=20),
        plot_bgcolor="rgba(0,0,0,0)",
        paper_bgcolor="rgba(0,0,0,0)",
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
            number={"font": {"color": "#818cf8", "size": 40}},
            title={"text": "Optimization Score", "font": {"color": "rgba(255,255,255,0.7)", "size": 14}},
            gauge={
                "axis": {"range": [0, 100], "visible": False},
                "bar": {"color": "#818cf8", "thickness": 0.2},
                "bgcolor": "rgba(255,255,255,0.05)",
                "borderwidth": 0
            }
        )
    )

    fig.update_layout(
        height=350,
        margin=dict(l=20, r=20, t=50, b=20),
        plot_bgcolor="rgba(0,0,0,0)",
        paper_bgcolor="rgba(0,0,0,0)",
    )

    return fig


# -----------------------------
# HISTORY GRAPH
# -----------------------------

def history_chart(df):

    fig = go.Figure()
    
    fig.add_trace(
        go.Scatter(
            x=df["Run"],
            y=df["Savings"],
            mode="lines+markers",
            line=dict(color="#818cf8", width=3),
            marker=dict(size=8, color="#6366f1", line=dict(width=2, color="rgba(255,255,255,0.8)")),
            fill="tozeroy",
            fillcolor="rgba(129, 140, 248, 0.1)"
        )
    )

    fig.update_layout(
        title="Optimization History",
        height=350,
        margin=dict(l=20, r=20, t=50, b=20),
        plot_bgcolor="rgba(0,0,0,0)",
        paper_bgcolor="rgba(0,0,0,0)",
        xaxis=dict(showgrid=False, zeroline=False, color="rgba(255,255,255,0.5)"),
        yaxis=dict(showgrid=True, gridcolor="rgba(255,255,255,0.05)", zeroline=False, color="rgba(255,255,255,0.5)")
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
            textfont=dict(color='rgba(255,255,255,0.8)', size=12),
            marker=dict(
                size=10,
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
        margin=dict(l=0, r=0, t=10, b=10),
        height=500,
    )

    return fig



# -----------------------------
# LIVE TELEMETRY GRAPH
# -----------------------------

def live_telemetry_chart(df):
    from plotly.subplots import make_subplots
    
    fig = make_subplots(specs=[[{"secondary_y": True}]])
    
    # Power trace
    fig.add_trace(
        go.Scatter(
            x=df["TimeIndex"],
            y=df["Electricity"],
            mode="lines",
            name="HVAC Power (W)",
            line=dict(color="#34d399", width=2),
            fill="tozeroy",
            fillcolor="rgba(52, 211, 153, 0.1)"
        ),
        secondary_y=False,
    )
    
    # Temp trace
    fig.add_trace(
        go.Scatter(
            x=df["TimeIndex"],
            y=df["Temperature"],
            mode="lines",
            name="Temperature (°C)",
            line=dict(color="#818cf8", width=2, dash="dot")
        ),
        secondary_y=True,
    )
    
    fig.update_layout(
        title="Real-Time Building Telemetry",
        height=400,
        margin=dict(l=20, r=20, t=50, b=20),
        plot_bgcolor="rgba(0,0,0,0)",
        paper_bgcolor="rgba(0,0,0,0)",
        showlegend=True,
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
        xaxis=dict(showgrid=False, zeroline=False, color="rgba(255,255,255,0.5)", title="Time Steps"),
    )
    
    fig.update_yaxes(title_text="Power (W)", showgrid=True, gridcolor="rgba(255,255,255,0.05)", zeroline=False, color="#34d399", secondary_y=False)
    fig.update_yaxes(title_text="Temperature (°C)", showgrid=False, zeroline=False, color="#818cf8", secondary_y=True)

    return fig
