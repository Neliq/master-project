#!/usr/bin/env python3
"""Run the validated aggregate for the single full-corpus evaluation."""
import os
import runpy
from pathlib import Path

root = Path(__file__).resolve().parents[1] / "run8-full-candidate-v5"
score = Path(__file__).resolve().parents[1] / "run8-full-score-v5"
os.environ.setdefault("RUN7_DIR", str(root))
os.environ.setdefault("RUN7_SCORE_DIR", str(score))
runpy.run_path(str(Path(__file__).with_name("aggregate_run7.py")), run_name="__main__")
