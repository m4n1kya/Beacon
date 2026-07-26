import json
from pathlib import Path

import pandas as pd
import streamlit as st
import plotly.graph_objects as go
import base64

from dashboard_utils import (
    metric_card,
    energy_bar_chart,
    energy_pie_chart,
    savings_gauge,
    ai_score_gauge,
    building_panel,
    ai_summary,
    history_chart
)

from report_generator import generate_all

# ---------------------------------------------------
# PAGE CONFIG
# ---------------------------------------------------

st.set_page_config(
    page_title="EcoLoop AI Energy Optimization",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ---------------------------------------------------
# ENCODE BACKGROUND IMAGE
# ---------------------------------------------------

def get_base64_image(image_path):
    try:
        with open(image_path, "rb") as img_file:
            return base64.b64encode(img_file.read()).decode()
    except (FileNotFoundError, IOError):
        return None

bg_image_path = Path("D:/Desktop/Vault/PROJECT/Blueprints/IMG/Black/2206_w019_n001_602b_p15_602.jpg")
bg_image_base64 = get_base64_image(bg_image_path)

# ---------------------------------------------------
# CUSTOM CSS - PROFESSIONAL DARK THEME WITH TEXT LOGO
# ---------------------------------------------------

css_style = f"""
<style>
    /* Import professional font */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    
    * {{
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }}
    
    /* Main background with premium image */
    .stApp {{
        background: linear-gradient(
            135deg,
            rgba(10, 10, 10, 0.92) 0%,
            rgba(20, 20, 30, 0.88) 50%,
            rgba(10, 10, 10, 0.92) 100%
        ),
        url("data:image/jpg;base64,{bg_image_base64}") center/cover no-repeat fixed;
        background-blend-mode: overlay;
    }}
    
    /* Content container with glass effect */
    .block-container {{
        padding: 2rem 2.5rem !important;
        background: rgba(15, 15, 25, 0.65);
        backdrop-filter: blur(20px) saturate(1.2);
        -webkit-backdrop-filter: blur(20px) saturate(1.2);
        border-radius: 20px;
        margin: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }}
    
    /* Header logo styling */
    .header-logo {{
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }}
    
    .logo-icon {{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.05));
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: 16px;
        padding: 0.5rem 1rem;
        min-width: 80px;
        position: relative;
        overflow: hidden;
    }}
    
    .logo-icon::before {{
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent 70%);
        animation: rotate 10s linear infinite;
    }}
    
    @keyframes rotate {{
        from {{ transform: rotate(0deg); }}
        to {{ transform: rotate(360deg); }}
    }}
    
    .logo-icon .main-text {{
        font-size: 1.2rem;
        font-weight: 800;
        letter-spacing: 0.15em;
        background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        position: relative;
        z-index: 1;
    }}
    
    .logo-icon .sub-text {{
        font-size: 0.5rem;
        font-weight: 600;
        letter-spacing: 0.3em;
        color: rgba(255, 255, 255, 0.3);
        position: relative;
        z-index: 1;
    }}
    
    .header-title {{
        display: flex;
        flex-direction: column;
    }}
    
    .header-title .brand {{
        font-size: 2.2rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0;
        line-height: 1.2;
    }}
    
    .header-title .tagline {{
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.9rem;
        letter-spacing: 0.05em;
        margin: -0.2rem 0 0 0;
    }}
    
    .header-title .pillars {{
        display: flex;
        gap: 1.5rem;
        margin-top: 0.2rem;
    }}
    
    .header-title .pillars span {{
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        color: rgba(255, 255, 255, 0.2);
        text-transform: uppercase;
        position: relative;
    }}
    
    .header-title .pillars span::after {{
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, rgba(99, 102, 241, 0.3), transparent);
    }}
    
    /* Metric cards - premium glass */
    div[data-testid="metric-container"] {{
        background: rgba(20, 20, 35, 0.7);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        padding: 20px 24px;
        border-radius: 16px;
        box-shadow: 
            0 4px 24px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }}
    
    div[data-testid="metric-container"]:hover {{
        transform: translateY(-2px);
        border-color: rgba(99, 102, 241, 0.3);
        box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }}
    
    div[data-testid="metric-container"] label {{
        color: rgba(255, 255, 255, 0.6) !important;
        font-weight: 500 !important;
        font-size: 0.85rem !important;
        letter-spacing: 0.02em;
        text-transform: uppercase;
    }}
    
    div[data-testid="metric-container"] div {{
        color: #ffffff !important;
        font-weight: 600 !important;
    }}
    
    /* Headers */
    h1, h2, h3, h4, h5 {{
        color: #ffffff !important;
        font-weight: 600 !important;
        letter-spacing: -0.02em;
    }}
    
    .stMarkdown p {{
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.6;
    }}
    
    /* Buttons - premium */
    .stButton > button {{
        background: rgba(99, 102, 241, 0.15);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: #ffffff;
        border: 1px solid rgba(99, 102, 241, 0.25);
        border-radius: 12px;
        padding: 0.6rem 1.5rem;
        font-weight: 500;
        font-size: 0.9rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        letter-spacing: 0.01em;
    }}
    
    .stButton > button:hover {{
        background: rgba(99, 102, 241, 0.25);
        border-color: rgba(99, 102, 241, 0.5);
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(99, 102, 241, 0.2);
    }}
    
    /* Expander */
    div[data-testid="stExpander"] {{
        background: rgba(20, 20, 35, 0.6);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 16px;
    }}
    
    /* Sidebar with logo */
    section[data-testid="stSidebar"] {{
        background: rgba(10, 10, 20, 0.85);
        backdrop-filter: blur(20px) saturate(1.3);
        -webkit-backdrop-filter: blur(20px) saturate(1.3);
        border-right: 1px solid rgba(255, 255, 255, 0.06);
    }}
    
    .sidebar-logo {{
        text-align: center;
        padding: 1.5rem 0 0.5rem 0;
    }}
    
    .sidebar-logo .brand {{
        font-size: 2rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        background: linear-gradient(135deg, #818cf8, #6366f1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0;
    }}
    
    .sidebar-logo .subtitle {{
        color: rgba(255, 255, 255, 0.2);
        font-size: 0.7rem;
        letter-spacing: 0.2em;
        margin-top: -0.2rem;
        text-transform: uppercase;
    }}
    
    .sidebar-logo .pillars {{
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 0.5rem;
    }}
    
    .sidebar-logo .pillars span {{
        font-size: 0.6rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        color: rgba(255, 255, 255, 0.15);
        text-transform: uppercase;
    }}
    
    section[data-testid="stSidebar"] .stMarkdown {{
        color: rgba(255, 255, 255, 0.8);
    }}
    
    /* Dataframe */
    .dataframe {{
        background: rgba(20, 20, 35, 0.5) !important;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 12px !important;
        border: 1px solid rgba(255, 255, 255, 0.06) !important;
    }}
    
    .dataframe th {{
        background: rgba(99, 102, 241, 0.15) !important;
        color: #ffffff !important;
        font-weight: 600 !important;
    }}
    
    .dataframe td {{
        color: rgba(255, 255, 255, 0.8) !important;
    }}
    
    /* Alert boxes */
    .stAlert {{
        background: rgba(20, 20, 35, 0.7) !important;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        border-radius: 12px !important;
    }}
    
    /* Success message in sidebar */
    .stAlert.success {{
        background: rgba(52, 211, 153, 0.1) !important;
        border-color: rgba(52, 211, 153, 0.2) !important;
        color: #34d399 !important;
    }}
    
    /* Divider */
    hr {{
        border: none !important;
        height: 1px !important;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent) !important;
        margin: 2rem 0 !important;
    }}
    
    /* Download buttons */
    .stDownloadButton > button {{
        background: rgba(20, 20, 35, 0.7);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        color: #ffffff;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }}
    
    .stDownloadButton > button:hover {{
        background: rgba(99, 102, 241, 0.2);
        border-color: rgba(99, 102, 241, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    }}
    
    /* Code blocks */
    .stCodeBlock {{
        background: rgba(10, 10, 20, 0.6) !important;
        border: 1px solid rgba(255, 255, 255, 0.06) !important;
        border-radius: 10px !important;
    }}
    
    /* Status badge */
    .status-badge {{
        display: inline-block;
        padding: 0.3rem 1rem;
        background: rgba(52, 211, 153, 0.15);
        border: 1px solid rgba(52, 211, 153, 0.3);
        border-radius: 20px;
        color: #34d399;
        font-size: 0.8rem;
        font-weight: 500;
        letter-spacing: 0.02em;
    }}
    
    /* Glass panel for workflow steps */
    .workflow-step {{
        background: rgba(20, 20, 35, 0.5);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 16px;
        padding: 1.5rem;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }}
    
    .workflow-step:hover {{
        transform: translateY(-4px);
        border-color: rgba(99, 102, 241, 0.2);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    }}
    
    .workflow-step .step-number {{
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #818cf8, #6366f1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }}
    
    .workflow-step .step-title {{
        color: #ffffff;
        font-weight: 600;
        margin-top: 0.5rem;
    }}
    
    .workflow-step .step-desc {{
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.85rem;
        margin-top: 0.25rem;
    }}
    
    /* Recommendation cards */
    .rec-card {{
        background: rgba(20, 20, 35, 0.5);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 16px;
        padding: 2rem;
        text-align: center;
    }}
    
    .rec-value {{
        font-size: 3.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #818cf8, #6366f1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0.5rem 0;
    }}
    
    .rec-label {{
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }}
    
    /* Scrollbar */
    ::-webkit-scrollbar {{
        width: 8px;
        height: 8px;
    }}
    
    ::-webkit-scrollbar-track {{
        background: rgba(255, 255, 255, 0.02);
        border-radius: 10px;
    }}
    
    ::-webkit-scrollbar-thumb {{
        background: rgba(99, 102, 241, 0.3);
        border-radius: 10px;
    }}
    
    ::-webkit-scrollbar-thumb:hover {{
        background: rgba(99, 102, 241, 0.5);
    }}
</style>
"""

# Fallback if image not found
if not bg_image_base64:
    css_style = css_style.replace(
        'url("data:image/jpg;base64,{bg_image_base64}")',
        'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%)'
    )

st.markdown(css_style, unsafe_allow_html=True)

# ---------------------------------------------------
# LOAD RESULTS
# ---------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

RESULT_FILE = BASE_DIR / "results.json"

if not RESULT_FILE.exists():
    st.error("Results data not found. Please run the optimization pipeline first.")
    st.stop()

with open(RESULT_FILE) as f:
    results = json.load(f)

baseline = results["baseline"]
optimized = results["optimized"]

baseline_energy = baseline["facility_electricity"]
optimized_energy = optimized["facility_electricity"]

temperature = results["recommended_temperature"]
savings = results["savings_percent"]

saved_energy = baseline_energy - optimized_energy

optimization_score = min(100, round(savings * 20 + 30))

# ---------------------------------------------------
# HEADER SECTION WITH TEXT LOGO
# ---------------------------------------------------

col1, col2, col3 = st.columns([3, 2, 1])

with col1:
    st.markdown("""
    <div class="header-logo">
        <div class="logo-icon">
            <span class="main-text">ECO</span>
            <span class="main-text" style="font-size: 0.8rem; letter-spacing: 0.2em;">LOOP</span>
            <span class="sub-text">⚡ ENERGY</span>
        </div>
        <div class="header-title">
            <div class="brand">EcoLoop</div>
            <div class="tagline">AI-Powered Building Energy Optimization</div>
            <div class="pillars">
                <span>Optimize</span>
                <span>Save</span>
                <span>Sustain</span>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown("<div style='text-align: right; padding: 0.3rem 0;'>", unsafe_allow_html=True)
    st.markdown("<span class='status-badge'>● System Online</span>", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)

with col3:
    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown(f"<div style='text-align: right; padding: 0.3rem 0;'><span style='color: rgba(255,255,255,0.3); font-size: 0.8rem;'>v2.0.0</span></div>", unsafe_allow_html=True)

st.markdown("<hr>", unsafe_allow_html=True)

# ---------------------------------------------------
# KPI METRICS ROW
# ---------------------------------------------------

col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric(
        "Baseline Energy Consumption",
        f"{baseline_energy:,.0f} kWh",
        delta=None,
        delta_color="off"
    )

with col2:
    st.metric(
        "Optimized Energy Consumption",
        f"{optimized_energy:,.0f} kWh",
        delta=None,
        delta_color="off"
    )

with col3:
    st.metric(
        "Total Energy Savings",
        f"{savings:.2f}%",
        delta=f"{savings:.2f}%",
        delta_color="normal"
    )

with col4:
    st.metric(
        "Recommended Setpoint",
        f"{temperature:.1f}°C",
        delta=None,
        delta_color="off"
    )

st.markdown("<hr>", unsafe_allow_html=True)

# ---------------------------------------------------
# MAIN VISUALIZATIONS
# ---------------------------------------------------

left_col, right_col = st.columns([2, 1])

with left_col:
    fig = energy_bar_chart(baseline_energy, optimized_energy)
    fig.update_layout(
        height=450,
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        font=dict(color='rgba(255,255,255,0.8)', family='Inter, sans-serif'),
        title=dict(
            text="Energy Consumption Comparison",
            font=dict(size=16, color='#ffffff'),
            x=0.5
        ),
        legend=dict(
            font=dict(color='rgba(255,255,255,0.7)'),
            bgcolor='rgba(0,0,0,0)'
        ),
        xaxis=dict(
            gridcolor='rgba(255,255,255,0.05)',
            tickfont=dict(color='rgba(255,255,255,0.6)')
        ),
        yaxis=dict(
            gridcolor='rgba(255,255,255,0.05)',
            tickfont=dict(color='rgba(255,255,255,0.6)')
        ),
        margin=dict(t=50, b=50, l=50, r=30)
    )
    st.plotly_chart(fig, use_container_width=True, config={'displayModeBar': False})

with right_col:
    fig = savings_gauge(savings)
    fig.update_layout(
        height=450,
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        font=dict(color='rgba(255,255,255,0.8)', family='Inter, sans-serif'),
        title=dict(
            text="Savings Performance",
            font=dict(size=16, color='#ffffff'),
            x=0.5
        ),
        margin=dict(t=50, b=50, l=30, r=30)
    )
    st.plotly_chart(fig, use_container_width=True, config={'displayModeBar': False})

st.markdown("<hr>", unsafe_allow_html=True)

# ---------------------------------------------------
# SECOND ROW VISUALIZATIONS
# ---------------------------------------------------

left_col, right_col = st.columns(2)

with left_col:
    fig = energy_pie_chart(saved_energy, optimized_energy)
    fig.update_layout(
        height=420,
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        font=dict(color='rgba(255,255,255,0.8)', family='Inter, sans-serif'),
        title=dict(
            text="Energy Distribution",
            font=dict(size=16, color='#ffffff'),
            x=0.5
        ),
        legend=dict(
            font=dict(color='rgba(255,255,255,0.7)'),
            bgcolor='rgba(0,0,0,0)'
        ),
        margin=dict(t=50, b=30, l=30, r=30)
    )
    st.plotly_chart(fig, use_container_width=True, config={'displayModeBar': False})

with right_col:
    fig = ai_score_gauge(optimization_score)
    fig.update_layout(
        height=420,
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        font=dict(color='rgba(255,255,255,0.8)', family='Inter, sans-serif'),
        title=dict(
            text="AI Optimization Score",
            font=dict(size=16, color='#ffffff'),
            x=0.5
        ),
        margin=dict(t=50, b=30, l=30, r=30)
    )
    st.plotly_chart(fig, use_container_width=True, config={'displayModeBar': False})

st.markdown("<hr>", unsafe_allow_html=True)

# ---------------------------------------------------
# BUILDING INFO & AI RECOMMENDATION
# ---------------------------------------------------

left_col, right_col = st.columns(2)

with left_col:
    building_panel(
        baseline["outdoor_temperature"],
        temperature
    )

with right_col:
    ai_summary(
        temperature,
        savings
    )

st.markdown("<hr>", unsafe_allow_html=True)

# ---------------------------------------------------
# OPTIMIZATION HISTORY
# ---------------------------------------------------

HISTORY_FILE = BASE_DIR / "reports" / "history.csv"

if not HISTORY_FILE.exists():
    HISTORY_FILE.parent.mkdir(parents=True, exist_ok=True)
    pd.DataFrame(columns=["Run", "Savings"]).to_csv(HISTORY_FILE, index=False)

history = pd.read_csv(HISTORY_FILE)
current_run = len(history) + 1
history.loc[len(history)] = [current_run, savings]
history.to_csv(HISTORY_FILE, index=False)

st.subheader("Optimization Performance History")

fig = history_chart(history)
fig.update_layout(
    height=350,
    paper_bgcolor='rgba(0,0,0,0)',
    plot_bgcolor='rgba(0,0,0,0)',
    font=dict(color='rgba(255,255,255,0.8)', family='Inter, sans-serif'),
    title=dict(
        text="Savings Trend Across Iterations",
        font=dict(size=14, color='rgba(255,255,255,0.7)'),
        x=0.5
    ),
    xaxis=dict(
        gridcolor='rgba(255,255,255,0.05)',
        tickfont=dict(color='rgba(255,255,255,0.6)'),
        title=dict(text="Optimization Run", font=dict(color='rgba(255,255,255,0.5)'))
    ),
    yaxis=dict(
        gridcolor='rgba(255,255,255,0.05)',
        tickfont=dict(color='rgba(255,255,255,0.6)'),
        title=dict(text="Savings (%)", font=dict(color='rgba(255,255,255,0.5)'))
    ),
    margin=dict(t=50, b=50, l=50, r=30)
)
st.plotly_chart(fig, use_container_width=True, config={'displayModeBar': False})

st.markdown("<hr>", unsafe_allow_html=True)

# ---------------------------------------------------
# REPORTS SECTION
# ---------------------------------------------------

st.subheader("Export Reports")

try:
    pdf_file, csv_file, json_file = generate_all()
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        with open(pdf_file, "rb") as f:
            st.download_button(
                "Download PDF Report",
                data=f,
                file_name="EcoLoop_Report.pdf",
                mime="application/pdf",
                use_container_width=True
            )
    
    with col2:
        with open(csv_file, "rb") as f:
            st.download_button(
                "Download CSV Data",
                data=f,
                file_name="EcoLoop_Report.csv",
                mime="text/csv",
                use_container_width=True
            )
    
    with col3:
        with open(json_file, "rb") as f:
            st.download_button(
                "Download JSON Data",
                data=f,
                file_name="EcoLoop_Report.json",
                mime="application/json",
                use_container_width=True
            )
except Exception as e:
    st.warning("Report generation module not available")

st.markdown("<hr>", unsafe_allow_html=True)

# ---------------------------------------------------
# SYSTEM OVERVIEW
# ---------------------------------------------------

st.subheader("System Performance Metrics")

col1, col2, col3 = st.columns(3)

health = max(0, min(100, int(92 + savings)))
comfort = max(0, min(100, int(95 - abs(25 - temperature) * 6)))
efficiency = max(0, min(100, int(80 + savings * 3)))

with col1:
    st.metric("System Health", f"{health}%", delta=None)

with col2:
    st.metric("Thermal Comfort Index", f"{comfort}%", delta=None)

with col3:
    st.metric("Operational Efficiency", f"{efficiency}%", delta=None)

st.markdown("<hr>", unsafe_allow_html=True)

# ---------------------------------------------------
# COMPARISON TABLE
# ---------------------------------------------------

st.subheader("Optimization Parameters Comparison")

comparison_data = {
    "Metric": [
        "Facility Electricity",
        "Building Electricity",
        "Outdoor Temperature",
        "Cooling Setpoint"
    ],
    "Baseline": [
        f"{baseline['facility_electricity']:,.0f} kWh",
        f"{baseline['building_electricity']:,.0f} kWh",
        f"{baseline['outdoor_temperature']:.1f}°C",
        "23.9°C"
    ],
    "Optimized": [
        f"{optimized['facility_electricity']:,.0f} kWh",
        f"{optimized['building_electricity']:,.0f} kWh",
        f"{optimized['outdoor_temperature']:.1f}°C",
        f"{temperature:.1f}°C"
    ]
}

st.dataframe(
    comparison_data,
    use_container_width=True,
    hide_index=True,
    column_config={
        "Metric": st.column_config.TextColumn("Parameter", width="medium"),
        "Baseline": st.column_config.TextColumn("Baseline", width="medium"),
        "Optimized": st.column_config.TextColumn("Optimized", width="medium")
    }
)

st.markdown("<hr>", unsafe_allow_html=True)

# ---------------------------------------------------
# OPTIMIZATION WORKFLOW
# ---------------------------------------------------

st.subheader("Optimization Pipeline")

workflow_cols = st.columns(4)

workflow_steps = [
    ("01", "Simulation", "EnergyPlus baseline execution"),
    ("02", "Analysis", "AI performance evaluation"),
    ("03", "Optimization", "Intelligent setpoint selection"),
    ("04", "Validation", "Results verification & reporting")
]

for col, (num, title, desc) in zip(workflow_cols, workflow_steps):
    with col:
        st.markdown(f"""
        <div class="workflow-step">
            <div class="step-number">{num}</div>
            <div class="step-title">{title}</div>
            <div class="step-desc">{desc}</div>
        </div>
        """, unsafe_allow_html=True)

st.markdown("<hr>", unsafe_allow_html=True)

# ---------------------------------------------------
# AI RECOMMENDATION DETAILS
# ---------------------------------------------------

st.subheader("AI Recommendation Summary")

rec_col1, rec_col2, rec_col3 = st.columns([1, 1, 2])

with rec_col1:
    st.markdown(f"""
    <div class="rec-card">
        <div class="rec-label">Recommended Setpoint</div>
        <div class="rec-value">{temperature:.1f}°C</div>
    </div>
    """, unsafe_allow_html=True)

with rec_col2:
    st.markdown(f"""
    <div class="rec-card">
        <div class="rec-label">Expected Savings</div>
        <div class="rec-value" style="background: linear-gradient(135deg, #34d399, #059669); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">{savings:.2f}%</div>
    </div>
    """, unsafe_allow_html=True)

with rec_col3:
    st.markdown(f"""
    <div style="background: rgba(20, 20, 35, 0.5); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px; padding: 1.5rem; height: 100%; display: flex; flex-direction: column; justify-content: center;">
        <p style="color: rgba(255,255,255,0.5); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">Decision Analysis</p>
        <p style="color: rgba(255,255,255,0.8); margin: 0.5rem 0 0 0; font-size: 0.95rem; line-height: 1.6;">
            The AI model analyzed baseline performance and selected an optimal cooling setpoint 
            to reduce HVAC energy consumption while maintaining thermal comfort standards.
        </p>
    </div>
    """, unsafe_allow_html=True)

st.markdown("<hr>", unsafe_allow_html=True)

# ---------------------------------------------------
# PROJECT INFORMATION
# ---------------------------------------------------

with st.expander("Project Configuration & Technical Details"):
    info_cols = st.columns(4)
    
    tech_details = [
        ("Project", "EcoLoop"),
        ("Engine", "EnergyPlus 26.1"),
        ("AI Model", "Qwen2.5 1.5B"),
        ("Inference", "Ollama"),
        ("Language", "Python 3.10"),
        ("Framework", "Streamlit"),
        ("Visualization", "Plotly"),
        ("Status", "Active")
    ]
    
    for i, (key, value) in enumerate(tech_details):
        with info_cols[i % 4]:
            st.markdown(f"""
            <div style="background: rgba(20, 20, 35, 0.3); padding: 0.75rem; border-radius: 8px; margin: 0.25rem 0;">
                <div style="color: rgba(255,255,255,0.3); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em;">{key}</div>
                <div style="color: #ffffff; font-weight: 500;">{value}</div>
            </div>
            """, unsafe_allow_html=True)

# ---------------------------------------------------
# SIDEBAR WITH TEXT LOGO
# ---------------------------------------------------

with st.sidebar:
    st.markdown("""
    <div class="sidebar-logo">
        <div class="brand">ECO LOOP</div>
        <div class="subtitle">AI-Powered Building Energy Optimization</div>
        <div class="pillars">
            <span>Optimize</span>
            <span>Save</span>
            <span>Sustain</span>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("---")
    
    st.markdown("""
    <div style="background: rgba(20, 20, 35, 0.5); border-radius: 12px; padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.05);">
        <p style="color: rgba(255,255,255,0.3); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.5rem 0;">System Status</p>
    """, unsafe_allow_html=True)
    
    st.metric("Status", "Online", delta=None)
    st.metric("AI Model", "Qwen2.5", delta=None)
    st.metric("Simulation", "Completed", delta=None)
    st.metric("Current Savings", f"{savings:.2f}%", delta=None)
    
    st.markdown("</div>", unsafe_allow_html=True)
    
    st.markdown("---")
    
    st.markdown("""
    <p style="color: rgba(255,255,255,0.3); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.5rem 0;">Technical Stack</p>
    """, unsafe_allow_html=True)
    
    st.code("EnergyPlus 26.1", language="bash")
    st.code("Qwen2.5 1.5B", language="bash")
    st.code("Ollama", language="bash")
    
    st.markdown("---")
    
    st.success("Closed Loop Active")
    
    st.markdown("---")
    
    if st.button("Refresh Dashboard", use_container_width=True):
        st.rerun()
    
    st.markdown("---")
    
    st.markdown("""
    <div style="text-align: center; padding: 0.5rem 0;">
        <p style="color: rgba(255,255,255,0.15); font-size: 0.7rem; margin: 0;">© 2026 EcoLoop</p>
        <p style="color: rgba(255,255,255,0.1); font-size: 0.6rem; margin: 0;">Version 2.0.0</p>
    </div>
    """, unsafe_allow_html=True)