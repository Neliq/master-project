#!/usr/bin/env python3
"""Regression tests for formalization-revision-v1."""
from __future__ import annotations

import hashlib
import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "run6-multimodal" / "ontology.md"
REVISION = Path(os.environ.get("FORMALIZATION_REVISION_DIR", ROOT / "formalization-revision-v1"))


def main() -> None:
    source = SOURCE.read_text()
    payload = json.loads((REVISION / "operational-cards.json").read_text())
    cards = payload["cards"]
    assert payload["patterns"] == 62
    assert payload["conditions"] == 186
    assert len(cards) == 186
    assert len({card["pattern"] for card in cards}) == 62
    if REVISION.name == "formalization-revision-v4":
        assert payload["source_sha256"] == hashlib.sha256((ROOT / "formalization-revision-v3" / "operational-cards.json").read_bytes()).hexdigest()
    else:
        assert payload["source_sha256"] == hashlib.sha256(SOURCE.read_bytes()).hexdigest()

    if REVISION.name == "formalization-revision-v4":
        aggregation = json.loads((REVISION / "aggregation-contract.json").read_text())
        assert aggregation["pattern_rule"] == "Pattern[p] = C[p,1] OR C[p,2] OR C[p,3]"
        assert aggregation["condition_rule"].startswith("C[p,j] = Evaluate(FORMULA[p,j]")
        assert all(card["pattern_expression"] == "OR across the three condition results" for card in cards)

    source_formulas = re.findall(r"^FORMULA: (.+)$", source, flags=re.MULTILINE)
    card_formulas = [card["original_formula"] for card in cards]
    assert source_formulas == card_formulas, "formula order/content changed"

    for card in cards:
        assert card["status_rule"].startswith("TRUE iff all required atoms")
        assert "UNKNOWN" in card["unknown_rule"]
        assert card["polarity"] in {"trigger", "counterevidence"}
        assert card["required_atoms"] and card["unknown_atoms"] and card["counterevidence"]
        assert card["anti_inference"]

    persuasive = [card for card in cards if card["pattern"] == "Persuasive Language" and card["condition"].startswith("3.")][0]
    assert persuasive["polarity"] == "counterevidence"
    assert any("cannot itself support" in item for item in persuasive["anti_inference"])

    implication_cards = [card for card in cards if "\\implies" in card["original_formula"]]
    assert implication_cards
    safety_terms = ("do not infer", "does not prove", "not evidence", "not observable", "not proof", "do not substitute", "cannot", "not itself")
    assert all(any(term in item.lower() for item in card["anti_inference"] for term in safety_terms) for card in implication_cards)

    addictive = [card for card in cards if card["pattern"] == "Addictive Design" and card["condition"].startswith("1.")][0]
    assert any("append" in item.lower() or "transition" in item.lower() for item in addictive["required_atoms"] + addictive["anti_inference"])
    print(json.dumps({
        "status": "PASS",
        "patterns": 62,
        "conditions": 186,
        "formula_preservation": True,
        "implication_cards": len(implication_cards),
        "counterevidence_cards": sum(card["polarity"] == "counterevidence" for card in cards),
    }, indent=2))


if __name__ == "__main__":
    main()
