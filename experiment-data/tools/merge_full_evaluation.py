#!/usr/bin/env python3
"""Run the validated merge gate for the single full-corpus evaluation."""
import os
import runpy
from pathlib import Path

root = Path(__file__).resolve().parents[1] / "run8-full-candidate-v5"
os.environ.setdefault("RUN7_DIR", str(root))
os.environ.setdefault("RUN7_REQUIRE_ROUTING", "1")
runpy.run_path(str(Path(__file__).with_name("merge_run7_outputs.py")), run_name="__main__")
