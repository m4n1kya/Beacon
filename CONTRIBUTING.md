# Contributing to BEACON

Thank you for your interest in contributing to **BEACON (Building Energy Analytics & Control Optimization Network)**!

## Development Workflow

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/Beacon.git
   cd Beacon
   ```
3. **Create a feature branch** for your enhancement or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Commit** your changes with clear, descriptive commit messages:
   ```bash
   git commit -m "feat: add multi-zone setpoint evaluation"
   ```
5. **Push** your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request** against the `main` branch.

## Environment Setup

Please refer to the [README.md](README.md) for full setup instructions covering Python dependencies, EnergyPlus 26.1 installation, and local Ollama (`qwen2.5:1.5b`) model provisioning.

## Code Standards

- **Python:** Adhere to PEP 8 conventions. Keep simulation orchestration (`src/main.py`), IDF manipulation (`src/idf_controller.py`), and dashboard presentation (`src/dashboard.py`) modular and decoupled.
- **Simulation Integrity:** Ensure any modifications to IDF schedules preserve valid EnergyPlus syntax and pass a complete baseline-to-optimized simulation cycle before opening a pull request.
