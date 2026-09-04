#!/usr/bin/env python3
"""Merge multimodal capture batches and attach sanitized DOM/text evidence."""
import html
import json
import os
import re
import shutil
from html.parser import HTMLParser
from pathlib import Path

BATCH_ROOT = Path(os.environ.get("BATCH_ROOT", "/tmp/run6-evidence-batches-20260903"))
RUN = Path(os.environ.get("RUN_DIR", Path(__file__).resolve().parents[1] / "run6-multimodal"))
DEST = Path(os.environ.get("DEST_DIR", RUN / "evidence"))
CORPUS = Path(os.environ.get("CORPUS_DIR", RUN / "corpus"))

class Text(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
    def handle_data(self, data):
        if data.strip():
            self.parts.append(data)
    def value(self):
        return re.sub(r"\s+", " ", " ".join(self.parts)).strip()

def state_text(fragment):
    out = []
    parts = re.split(r"<!--\s*state\s+(s\d+)\s*-->", fragment)
    if len(parts) > 1:
        for i in range(1, len(parts), 2):
            state_id, state = parts[i], parts[i + 1]
            parser = Text(); parser.feed(state)
            out.append(f"STATE {state_id}\n{parser.value()}\n")
    else:
        parser = Text(); parser.feed(fragment)
        out.append(f"STATE s0\n{parser.value()}\n")
    return "\n".join(out)

if DEST.exists():
    shutil.rmtree(DEST)
DEST.mkdir(parents=True)
records = []
for batch in sorted(BATCH_ROOT.glob("batch*")):
    index = json.loads((batch / "bundle-index.json").read_text())
    for record in index["records"]:
        iid = record["instance_id"]
        target = DEST / iid
        if target.exists():
            raise SystemExit(f"duplicate bundle {iid}")
        target.mkdir()
        source_dom = CORPUS / f"{iid}.html"
        if not source_dom.exists():
            raise SystemExit(f"missing corpus DOM {iid}")
        shutil.copy2(source_dom, target / "dom.html")
        (target / "semantic.txt").write_text(state_text(source_dom.read_text()) + "\n")
        for state in record["states"]:
            source_png = batch / iid / state["screenshot"]
            if not source_png.exists():
                raise SystemExit(f"missing screenshot {iid}/{state['screenshot']}")
            shutil.copy2(source_png, target / state["screenshot"])
        records.append({**record, "dom": "dom.html", "semantic_text": "semantic.txt"})

if len(records) != 372 or len({r["instance_id"] for r in records}) != 372:
    raise SystemExit(f"expected 372 unique records, got {len(records)}")
merged = {"run_id": "run6-multimodal", "source": "current Sandbox capture + accepted sanitized corpus", "color_transform": "none", "records": sorted(records, key=lambda r: r["instance_id"])}
(DEST / "bundle-index.json").write_text(json.dumps(merged, indent=2) + "\n")
print(json.dumps({"bundles": len(records), "pngs": len(list(DEST.rglob("*.png"))), "doms": len(list(DEST.glob("*/dom.html"))), "semantic": len(list(DEST.glob("*/semantic.txt")))}, indent=2))
