#!/usr/bin/env python3
"""Extract compact, formula-preserving predicate cards for Run 7."""
from __future__ import annotations

import json
import os
import re
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "run6-multimodal" / "ontology.md"
OUT = Path(os.environ.get("RUN7_OUT", ROOT / "run7-development-v2"))

ESCAPE_TERMS = {
    "E1": ("relative scale/visual comparison", ("visual", "area(", "font", "contrast", "prominence", "salience", "size", "weight", "box", "indent", "color", "colour", "offset", "radius")),
    "E2": ("disclosure before commitment", ("fee", "cost", "price", "renew", "cancel", "charge", "disclos", "subscription", "payment", "warranty")),
    "E3": ("qualified statistics and denominators", ("percent", "%", "review", "denominator", "statistic", "specificity", "context", "count")),
    "E4": ("real deadlines and anchored time", ("deadline", "timer", "time", "temporal", "expiry", "limited", "scarcity", "countdown", "appointment", "duration")),
    "E5": ("unobservable mechanism remains UNKNOWN", ("event", "handler", "animation", "backend", "autoplay", "refresh", "execute", "interaction log", "state mutation", "injected", "iframe")),
    "E6": ("visible qualifiers and contextual narrative", ("qualif", "tooltip", "context", "visible", "semantic", "label", "framing", "claim", "disclosure")),
}


def parse() -> list[dict[str, Any]]:
    blocks = re.split(r"(?m)^## ", SOURCE.read_text())[1:]
    cards: list[dict[str, Any]] = []
    for block in blocks:
        lines = block.splitlines()
        header = lines[0]
        name = header.split("  [", 1)[0].strip()
        family = re.search(r"\[([^]]+)\]", header)
        body = "\n".join(lines[1:])
        conditions = re.split(r"(?m)^### ", body)[1:]
        card_conditions: list[dict[str, Any]] = []
        combined = body.lower()
        for condition in conditions:
            clines = condition.splitlines()
            condition_name = clines[0].strip()
            formulas = [line for line in clines if line.startswith("FORMULA:")]
            givens = [line for line in clines if line.startswith("GIVEN:")]
            card_conditions.append({
                "name": condition_name,
                "summary": re.split(r"(?<=[.!?])\s+", " ".join(clines[1:]))[0][:360],
                "formula": formulas,
                "given": givens,
            })
        applicable = [
            code for code, (_description, terms) in ESCAPE_TERMS.items()
            if any(term in combined for term in terms)
        ]
        cards.append({
            "pattern": name,
            "family": family.group(1) if family else "unspecified",
            "conditions": card_conditions,
            "applicable_escape_clauses": applicable,
        })
    return cards


def main() -> None:
    cards = parse()
    if len(cards) != 62 or sum(len(c["conditions"]) for c in cards) != 186:
        raise SystemExit(f"expected 62 patterns/186 conditions, got {len(cards)}/{sum(len(c['conditions']) for c in cards)}")
    OUT.mkdir(parents=True, exist_ok=True)
    cards_dir = OUT / "pattern-cards"
    cards_dir.mkdir(exist_ok=True)
    (OUT / "pattern-escape-map.json").write_text(json.dumps({
        "source": "run6-multimodal/ontology.md",
        "policy": "keyword-derived applicability map; no formula or threshold changes",
        "clauses": {code: description for code, (description, _terms) in ESCAPE_TERMS.items()},
        "patterns": {c["pattern"]: c["applicable_escape_clauses"] for c in cards},
    }, indent=2) + "\n")
    lines = [
        "# Run 7 compact predicate cards",
        "",
        "These cards are a compact extraction of the unchanged Run 6 ontology.",
        "Every FORMULA and GIVEN line is copied from `run6-multimodal/ontology.md`;",
        "no definition, threshold, or counterexample is added. The cards are a",
        "retrieval-oriented presentation for the auditor, not a replacement ontology.",
        "",
        "## Decision discipline",
        "",
        "1. First complete the evidence ledger for every aligned state using vision, DOM, and semantic text.",
        "2. Evaluate only the predicates on the relevant card; preserve the displayed AND/OR logic.",
        "3. Record every predicate as TRUE, FALSE, or UNKNOWN with a state and evidence location.",
        "4. Apply only the escape clauses listed on that card; do not apply all global escapes automatically.",
        "5. UNKNOWN is not BENIGN and is not DECEPTIVE. Keep it explicit in the ledger and follow the pre-registered binary mapping in the audit prompt.",
        "6. A semantic resemblance or a single keyword is not formula satisfaction.",
        "",
        "## Pattern-specific escape clauses",
        "",
    ]
    for code, (description, _terms) in ESCAPE_TERMS.items():
        lines.append(f"- **{code}** — {description}.")
    index_lines = [
        "# Run 7 pattern-card index",
        "",
        "Use this index only after completing the neutral evidence ledger. Select",
        "up to three candidate mechanisms, then read only their individual card",
        "files. Do not read every card before candidate selection.",
        "",
    ]
    lines += ["", "## Cards", ""]
    for card_index, card in enumerate(cards, 1):
        card_file = f"card-{card_index:03d}.md"
        condition_names = "; ".join(f"{c['name']}: {c['summary'][:160]}" for c in card["conditions"])
        index_lines.append(f"- **{card['pattern']}** — `pattern-cards/{card_file}` — {condition_names}.")
        card_lines = [
            f"# {card['pattern']} [{card['family']}]",
            "",
            "This card preserves the unchanged ontology predicates. It is not a",
            "new definition and contains no counterexamples.",
            f"Applicable escapes: {', '.join(card['applicable_escape_clauses']) or 'none listed'}.",
            "",
        ]
        lines.append(f"### {card['pattern']} [{card['family']}]")
        escapes = ", ".join(card["applicable_escape_clauses"]) or "none listed"
        lines.append(f"Applicable escapes: {escapes}.")
        lines.append("Evaluate the following unchanged predicates; do not invent missing values:")
        for index, condition in enumerate(card["conditions"], 1):
            card_lines += [f"## {index}. {condition['name']}", f"Mechanism summary: {condition['summary']}", ""]
            lines.append(f"#### {index}. {condition['name']}")
            lines.append(f"Mechanism summary: {condition['summary']}")
            for formula in condition["formula"]:
                card_lines.append(formula)
                lines.append(formula)
            for given in condition["given"]:
                card_lines.append(given)
                lines.append(given)
            card_lines.append("")
        lines.append("")
        (cards_dir / card_file).write_text("\n".join(card_lines) + "\n")
    (cards_dir / "index.md").write_text("\n".join(index_lines) + "\n")
    (OUT / "pattern-cards.md").write_text("\n".join(lines) + "\n")
    print(json.dumps({
        "patterns": len(cards),
        "conditions": sum(len(c["conditions"]) for c in cards),
        "formula_lines": sum(len(c["conditions"][i]["formula"]) for c in cards for i in range(len(c["conditions"]))),
        "card_files": len(list(cards_dir.glob("card-*.md"))),
        "output": str(OUT),
    }, indent=2))


if __name__ == "__main__":
    main()
