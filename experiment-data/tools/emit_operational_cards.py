#!/usr/bin/env python3
"""Emit retrieval-oriented pattern cards from operational-cards.json."""
from __future__ import annotations

import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REVISION = Path(os.environ.get("FORMALIZATION_DIR", ROOT / "formalization-revision-v1"))
DATA = json.loads((REVISION / "operational-cards.json").read_text())
OUT = Path(os.environ.get("FORMALIZATION_CARDS_OUT", REVISION / "pattern-cards"))


def slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def main() -> None:
    cards = DATA["cards"]
    OUT.mkdir(exist_ok=True)
    patterns: list[str] = []
    by_pattern: dict[str, list[dict]] = {}
    for card in cards:
        by_pattern.setdefault(card["pattern"], []).append(card)
        if card["pattern"] not in patterns:
            patterns.append(card["pattern"])

    index_lines = [
        "# Operational pattern index — " + DATA["revision"],
        "",
        "Use after completing the neutral evidence ledger. This is a routing index,",
        "not evidence and not a label source. Screen every row as MATCH, NO_MATCH, or",
        "UNKNOWN. Read only cards for MATCH/plausible UNKNOWN rows.",
        "",
        "| Pattern | Family | Observable mechanism anchors | Card |",
        "|---|---|---|---|",
    ]
    for number, pattern in enumerate(patterns, 1):
        entries = by_pattern[pattern]
        filename = f"card-{number:03d}-{slug(pattern)}.md"
        anchors = "; ".join(card["operational_name"] for card in entries)
        index_lines.append(f"| {pattern} | {entries[0]['family']} | {anchors} | `{filename}` |")
        lines = [
            f"# {pattern} [{entries[0]['family']}]",
            "",
            "This card is an application-oriented presentation of the unchanged ontology.",
            "It does not add labels, counterexamples, thresholds, or definitions.",
            "",
            "## Card-level rule",
            "",
            "Evaluate each condition independently. A condition is TRUE only when all",
            "required atoms are directly supported. It is FALSE only with direct",
            "counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete",
            "TRUE trigger condition; a counterevidence condition cannot create a trigger.",
            "",
            f"Domain/context gate: {entries[0].get('domain_context_gate', 'Identify the pattern-specific object and mechanism before evaluating atoms.')}",
            "",
        ]
        for index, card in enumerate(entries, 1):
            lines += [
                f"## Condition {index}: {card['condition']}",
                "",
                f"Original formula (verbatim): `{card['original_formula']}`",
                f"Operational reading: **{card['operational_name']}**",
                f"Polarity: `{card['polarity']}`",
                f"Comparison policy: {card.get('qualitative_comparison_policy', 'Use only directly observed comparisons and explicit thresholds.')}",
                f"Review policy: {card.get('review_policy', 'Do not infer missing or unobservable atoms.')}",
                "",
                "### Required atoms",
                *[f"- {item}" for item in card["required_atoms"]],
                "",
                "### Mark UNKNOWN when",
                *[f"- {item}" for item in card["unknown_atoms"]],
                "",
                "### Direct counterevidence",
                *[f"- {item}" for item in card["counterevidence"]],
                "",
                "### Do not infer",
                *[f"- {item}" for item in card["anti_inference"]],
                "",
            ]
        (OUT / filename).write_text("\n".join(lines) + "\n")
    (OUT / "index.md").write_text("\n".join(index_lines) + "\n")
    print(json.dumps({"patterns": len(patterns), "cards": len(list(OUT.glob("card-*.md"))), "output": str(OUT)}, indent=2))


if __name__ == "__main__":
    main()
