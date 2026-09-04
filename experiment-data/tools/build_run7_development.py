#!/usr/bin/env python3
"""Build a small, isolated Run 7 development sample from frozen Run 6 evidence.

The builder preserves Run 6 artifacts and creates a new directory. It aligns
visual, DOM, and semantic state IDs without inventing correspondences.
"""
from __future__ import annotations

import hashlib
import json
import os
import random
import re
import shutil
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "run6-multimodal"
OUT = Path(os.environ.get("RUN7_OUT", ROOT / "run7-development-v2"))
SCORE_DIR = Path(os.environ["RUN7_SCORE_DIR"]) if os.environ.get("RUN7_SCORE_DIR") else None
SAMPLE_SEED = 20260911
PATTERNS_PER_SAMPLE = 12
AGENTS = 4
RUN_ID = OUT.name
PREVIOUS_PATTERNS = {
    "activity-messages", "automating-the-user-away", "conflicting-information",
    "false-hierarchy", "forced-continuity", "granting-and-interaction",
    "hidden-information", "information-without-context", "intermediate-currency",
    "plain-evil", "pressured-selling", "trick-questions",
}


class Text(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []

    def handle_data(self, data: str) -> None:
        if data.strip():
            self.parts.append(data)

    def value(self) -> str:
        return re.sub(r"\s+", " ", " ".join(self.parts)).strip()


def semantic_states(fragment: str) -> tuple[str, list[str]]:
    parts = re.split(r"<!--\s*state\s+(s\d+)\s*-->", fragment)
    if len(parts) == 1:
        parser = Text()
        parser.feed(fragment)
        return "STATE s0\n" + parser.value() + "\n", ["s0"]
    output: list[str] = []
    ids: list[str] = []
    for i in range(1, len(parts), 2):
        state_id, state = parts[i], parts[i + 1]
        parser = Text()
        parser.feed(state)
        output.append(f"STATE {state_id}\n{parser.value()}\n")
        ids.append(state_id)
    return "\n".join(output), ids


def state_number(state_id: str) -> int:
    return int(state_id[1:])


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    if OUT.exists():
        raise SystemExit(f"refusing to overwrite existing {OUT}")

    source_instances = json.loads((SOURCE / "instances.json").read_text())
    source_truth = json.loads((SOURCE / "ground-truth.json").read_text())
    source_index = json.loads((SOURCE / "evidence" / "bundle-index.json").read_text())
    source_records = {r["instance_id"]: r for r in source_index["records"]}

    patterns = sorted({meta["slug"] for meta in source_instances.values()})
    complete_patterns = []
    for pattern in patterns:
        pattern_ids = [iid for iid, meta in source_instances.items() if meta["slug"] == pattern]
        complete = True
        for iid in pattern_ids:
            dom = (SOURCE / "evidence" / iid / "dom.html").read_text()
            dom_ids = set(re.findall(r"<!--\s*state\s+(s\d+)\s*-->", dom))
            visual_ids = {f"s{state['state']}" for state in source_records[iid]["states"]}
            if dom_ids != visual_ids:
                complete = False
                break
        if complete:
            complete_patterns.append(pattern)
    excluded_patterns = {
        pattern.strip() for pattern in os.environ.get("RUN7_EXCLUDE_PATTERNS", "").split(",") if pattern.strip()
    } | PREVIOUS_PATTERNS
    eligible_patterns = [pattern for pattern in complete_patterns if pattern not in excluded_patterns]
    if len(eligible_patterns) < PATTERNS_PER_SAMPLE:
        raise SystemExit(f"only {len(eligible_patterns)} eligible complete patterns after exclusions")
    rng = random.Random(SAMPLE_SEED)
    selected_patterns = sorted(rng.sample(eligible_patterns, PATTERNS_PER_SAMPLE))
    selected_ids = sorted(
        iid for iid, meta in source_instances.items()
        if meta["slug"] in selected_patterns
    )
    if len(selected_ids) != PATTERNS_PER_SAMPLE * 3 * 2:
        raise SystemExit(f"expected 72 sample IDs, got {len(selected_ids)}")

    (OUT / "evidence").mkdir(parents=True)
    (OUT / "agent-lists").mkdir()
    for sub in ("raw-c0", "raw-c1", "raw"):
        (OUT / "results" / sub).mkdir(parents=True)

    sample_instances = {iid: source_instances[iid] for iid in selected_ids}
    sample_truth = {iid: source_truth[iid] for iid in selected_ids}
    metadata_dir = SCORE_DIR or OUT
    metadata_dir.mkdir(parents=True, exist_ok=True)
    (metadata_dir / "instances.json").write_text(json.dumps(sample_instances, indent=2) + "\n")
    (metadata_dir / "ground-truth.json").write_text(json.dumps(sample_truth, indent=2) + "\n")

    out_records = []
    alignment_issues = []
    for iid in selected_ids:
        src = SOURCE / "evidence" / iid
        dst = OUT / "evidence" / iid
        dst.mkdir()
        dom = (src / "dom.html").read_text()
        (dst / "dom.html").write_text(dom)
        semantic, semantic_ids = semantic_states(dom)
        (dst / "semantic.txt").write_text(semantic + "\n")

        source_record = source_records[iid]
        visual_ids = [f"s{state['state']}" for state in source_record["states"]]
        for png in sorted(src.glob("s*.png")):
            shutil.copy2(png, dst / png.name)
        shutil.copy2(src / "visual-sheet.png", dst / "visual-sheet.png")

        dom_ids = re.findall(r"<!--\s*state\s+(s\d+)\s*-->", dom)
        all_ids = sorted(set(visual_ids) | set(dom_ids) | set(semantic_ids), key=state_number)
        states = []
        for state_id in all_ids:
            visual_present = state_id in visual_ids and (dst / f"{state_id}.png").exists()
            dom_present = state_id in dom_ids
            semantic_present = state_id in semantic_ids
            if not (visual_present and dom_present and semantic_present):
                alignment_issues.append({
                    "instance_id": iid,
                    "state_id": state_id,
                    "visual": visual_present,
                    "dom": dom_present,
                    "semantic": semantic_present,
                })
            states.append({
                "state_id": state_id,
                "screenshot": f"{state_id}.png" if visual_present else None,
                "dom": "dom.html",
                "dom_state_id": state_id if dom_present else None,
                "semantic": "semantic.txt",
                "semantic_state_id": state_id if semantic_present else None,
            })
        manifest = {
            "instance_id": iid,
            "states": states,
            "visual_sheet": "visual-sheet.png",
            "alignment_policy": "preserve original state IDs; missing modality remains explicit UNKNOWN",
        }
        (dst / "state-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
        out_records.append({
            "instance_id": iid,
            "source": "Run 6 evidence, semantic IDs regenerated from original DOM comments",
            "visual_sheet": "visual-sheet.png",
            "dom": "dom.html",
            "semantic": "semantic.txt",
            "state_manifest": "state-manifest.json",
            "states": states,
        })

    # Assignment is shared between arms, shuffled once with a recorded seed.
    assignment_rng = random.Random(SAMPLE_SEED + 1)
    shuffled = selected_ids[:]
    assignment_rng.shuffle(shuffled)
    chunks = [shuffled[i * len(shuffled) // AGENTS:(i + 1) * len(shuffled) // AGENTS] for i in range(AGENTS)]
    for index, chunk in enumerate(chunks, 1):
        (OUT / "agent-lists" / f"agent-{index:02d}.txt").write_text("\n".join(chunk) + "\n")

    bundle_index = {
        "run_id": RUN_ID,
        "source_run": "run6-multimodal",
        "sample_seed": SAMPLE_SEED,
        "complete_pattern_pool": len(complete_patterns),
        "eligible_pattern_pool": len(eligible_patterns),
        "excluded_incomplete_patterns": sorted(set(patterns) - set(complete_patterns)),
        "excluded_prior_development_patterns": sorted(excluded_patterns & set(complete_patterns)),
        "selected_patterns": selected_patterns,
        "records": out_records,
        "alignment_issues": alignment_issues,
    }
    if SCORE_DIR:
        (SCORE_DIR / "bundle-index.json").write_text(json.dumps(bundle_index, indent=2) + "\n")
        public_bundle_index = {
            "run_id": RUN_ID,
            "source_run": "run6-multimodal",
            "records": out_records,
            "alignment_issues": alignment_issues,
            "alignment_policy": "preserve original state IDs; scoring metadata is outside the auditor bundle",
        }
    else:
        public_bundle_index = bundle_index
    (OUT / "evidence" / "bundle-index.json").write_text(json.dumps(public_bundle_index, indent=2) + "\n")
    full_sample_manifest = {
        "run_id": RUN_ID,
        "sample_seed": SAMPLE_SEED,
        "complete_pattern_pool": len(complete_patterns),
        "eligible_pattern_pool": len(eligible_patterns),
        "excluded_prior_development_patterns": sorted(excluded_patterns & set(complete_patterns)),
        "n_instances": len(selected_ids),
        "patterns_per_sample": PATTERNS_PER_SAMPLE,
        "selected_patterns": selected_patterns,
        "instance_ids": selected_ids,
        "assignment_agents": AGENTS,
        "source_run": "run6-multimodal",
        "source_evidence_index_sha256": sha256(SOURCE / "evidence" / "bundle-index.json"),
        "alignment_issues": len(alignment_issues),
    }
    manifest_dir = SCORE_DIR or OUT
    (manifest_dir / "sample-manifest.json").write_text(json.dumps(full_sample_manifest, indent=2) + "\n")
    (OUT / "results" / "run7-metadata.json").write_text(json.dumps({
        "run_id": RUN_ID,
        "purpose": "bounded development pilot; not a confirmatory significance test",
        "source_run": "run6-multimodal",
        "sample_seed": SAMPLE_SEED,
        "n_instances": len(selected_ids),
        "n_patterns": PATTERNS_PER_SAMPLE,
        "n_agents_per_arm": AGENTS,
        "complete_pattern_pool": len(complete_patterns),
        "eligible_pattern_pool": len(eligible_patterns),
        "excluded_prior_development_patterns": sorted(excluded_patterns & set(complete_patterns)),
        "model": "gpt-5.6-luna-900k",
        "evidence": "aligned visual/DOM/semantic state manifests; native colors preserved",
        "changes": [
            "unknown is distinct from benign",
            "compact predicate cards plus structured evidence ledger",
            "pattern-specific escape applicability",
            "original state IDs preserved across modalities",
        ],
        "counterexamples": "not added per user instruction",
        "alignment_issues": len(alignment_issues),
        "statistical_policy": "pilot direction only; freeze before held-out evaluation",
    }, indent=2) + "\n")
    print(json.dumps({
        "run": str(OUT),
        "instances": len(selected_ids),
        "patterns": len(selected_patterns),
        "agents": AGENTS,
        "alignment_issues": len(alignment_issues),
    }, indent=2))


if __name__ == "__main__":
    main()
