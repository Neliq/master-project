#!/usr/bin/env python3
"""Build formalization-revision-v2 from the formula-preserving v1 cards."""
from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "formalization-revision-v1"
OUT = ROOT / "formalization-revision-v2"


def main() -> None:
    if OUT.exists():
        raise SystemExit(f"refusing to overwrite existing {OUT}")
    OUT.mkdir()
    source_payload = json.loads((SOURCE / "operational-cards.json").read_text())
    cards = []
    for card in source_payload["cards"]:
        formula = card["original_formula"]
        qualitative = any(token in formula for token in ("\\gg", "\\ll", "\\approx", "\\propto", "\\to"))
        cards.append({
            **card,
            "revision": "formalization-revision-v2",
            "qualitative_comparison_policy": (
                "A direct within-interface comparison may satisfy the qualitative relation "
                "when both operands and the direction are explicitly observed; no numeric "
                "threshold may be invented."
                if qualitative else
                "Use the original formula's explicit threshold or equality; do not invent values."
            ),
            "review_policy": (
                "The card reviews a provisional evidence-only judgment. Missing formal evidence "
                "does not overturn that judgment; complete proof may upgrade and direct contradiction "
                "may downgrade."
            ),
        })
    payload = {
        "revision": "formalization-revision-v2",
        "source_revision": "formalization-revision-v1",
        "source_sha256": hashlib.sha256((SOURCE / "operational-cards.json").read_bytes()).hexdigest(),
        "patterns": 62,
        "conditions": 186,
        "cards": cards,
    }
    (OUT / "operational-cards.json").write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n")
    for path in (SOURCE / "pattern-cards").glob("card-*.md"):
        text = path.read_text()
        text = text.replace(
            "This card is an application-oriented presentation of the unchanged ontology.\nIt does not add labels, counterexamples, thresholds, or definitions.",
            "This card is an application-oriented presentation of the unchanged ontology.\nIt does not add labels, counterexamples, thresholds, or definitions.\n\nThis v2 card reviews a provisional evidence-only judgment. Missing formal evidence\ndoes not overturn that judgment. A complete proof may upgrade; direct contradiction\nmay downgrade.",
        )
        (OUT / "pattern-cards" ).mkdir(exist_ok=True)
        (OUT / "pattern-cards" / path.name).write_text(text)
    shutil.copy2(SOURCE / "pattern-cards" / "index.md", OUT / "pattern-cards" / "index.md")
    (OUT / "revision.md").write_text("""# Formalization revision v2\n\nThis revision preserves the original 62 patterns, 186 conditions, and every original formula. It changes the application protocol only.\n\n## Review semantics\n\n1. Make a provisional evidence-only judgment before reading formal cards.\n2. Use formal cards to verify, challenge, and explain the provisional judgment.\n3. Do not replace a provisional binary judgment merely because a formal atom is unobservable. Record UNKNOWN for that atom.\n4. A complete formal trigger can upgrade a provisional negative. Direct counterevidence can downgrade a provisional positive.\n5. For qualitative relations (`\\gg`, `\\ll`, `\\approx`, `\\propto`), a direct same-interface comparison is valid when both operands and direction are explicitly observed. Never invent numeric values.\n6. For explicit threshold relations, require the stated measurement or mark UNKNOWN.\n7. Pattern routing is an efficiency aid, not an exclusion rule. A candidate screen of NO_MATCH/UNKNOWN cannot by itself force BENIGN.\n\nThis is a development revision and must be evaluated on fresh data before any confirmatory use.\n""")
    print(json.dumps({"patterns": 62, "conditions": 186, "cards": len(cards), "output": str(OUT)}, indent=2))


if __name__ == "__main__":
    main()
