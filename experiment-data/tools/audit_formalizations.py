#!/usr/bin/env python3
"""Audit the formal ontology for LLM-operationalization hazards.

This is a static audit of the frozen Run 6 ontology. It never edits the ontology
or reads labels/results to manufacture rewrites.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "run6-multimodal" / "ontology.md"
OUT = ROOT / "formalization-revision-v1"


def parse() -> list[dict[str, object]]:
    lines = SOURCE.read_text().splitlines()
    pattern = condition = None
    records: list[dict[str, object]] = []
    for line_no, line in enumerate(lines, 1):
        if line.startswith("## "):
            pattern = line[3:].split("  [", 1)[0].strip()
        elif line.startswith("### "):
            condition = line[4:].strip()
        elif line.startswith("FORMULA:") or line.startswith("GIVEN:"):
            records.append({
                "line": line_no,
                "pattern": pattern,
                "condition": condition,
                "kind": line.split(":", 1)[0],
                "text": line.split(":", 1)[1].strip(),
            })
    return records


def flags(text: str) -> list[str]:
    found: list[str] = []
    tests = {
        "material-implication": r"\\implies|\\Rightarrow| implies ",
        "state-transition": r"\\to|\\lim|\\frac\{d",
        "unobservable-ground-truth": r"true|actual|backend|payment token|stock|inventory|organic|real event|focus|probability|WTP|utility|externality",
        "qualitative-or-undefined-threshold": r"\\gg|\\approx|\\propto|\\mathcal\{O\}|\\emptyset|\\tau_",
        "conclusion-not-evidence": r"Satisfiable|Unsatisfiable|Contradiction|No Escape Path|Urgency is functionally synthetic|Probability|WTP|Systemic Incentive",
        "palette-or-absolute-visual": r"Hue|red|saturated|> 7\\.0|< 3\\.0|44 \\times 44",
    }
    for name, pattern in tests.items():
        if re.search(pattern, text, flags=re.IGNORECASE):
            found.append(name)
    return found


def main() -> None:
    records = parse()
    if len(records) != 195:
        raise SystemExit(f"expected 195 FORMULA/GIVEN records, got {len(records)}")
    formula_count = sum(r["kind"] == "FORMULA" for r in records)
    condition_count = len({(r["pattern"], r["condition"]) for r in records if r["kind"] == "FORMULA"})
    if formula_count != 186 or condition_count != 186:
        raise SystemExit(f"expected 186 formulas/conditions, got {formula_count}/{condition_count}")

    findings = []
    for record in records:
        record_flags = flags(str(record["text"]))
        if record_flags:
            findings.append({**record, "flags": record_flags})

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "audit-records.json").write_text(json.dumps({
        "source": str(SOURCE),
        "source_sha256": __import__("hashlib").sha256(SOURCE.read_bytes()).hexdigest(),
        "patterns": len({r["pattern"] for r in records}),
        "conditions": condition_count,
        "formula_lines": formula_count,
        "records": findings,
    }, indent=2) + "\n")

    grouped: dict[str, list[dict[str, object]]] = {}
    for finding in findings:
        for flag in finding["flags"]:
            grouped.setdefault(str(flag), []).append(finding)

    lines = [
        "# Formalization audit v1",
        "",
        "This audit targets the frozen Run 6 ontology at `run6-multimodal/ontology.md`.",
        "It does not change the 62-pattern taxonomy, 186 conditions, labels, or Run 6",
        "results. It identifies logical and observability hazards that can make a language",
        "model overfire, underfire, or apply the wrong condition.",
        "",
        f"- Patterns: {len({r['pattern'] for r in records})}",
        f"- Conditions: {condition_count}",
        f"- FORMULA lines: {formula_count}",
        f"- Flagged FORMULA/GIVEN records: {len(findings)}",
        "",
        "## Non-negotiable operational semantics",
        "",
        "1. A formula is a decision predicate, not a material implication or causal law.",
        "   If a formula contains `A ⇒ B`, the evaluator must observe both A and B in",
        "   the required scope; an unobserved antecedent or consequent is UNKNOWN, not true.",
        "2. A pattern condition is TRUE only when every mandatory atomic requirement in",
        "   that condition is TRUE. A condition is FALSE only with direct counterevidence.",
        "   Otherwise it is UNKNOWN.",
        "3. A pattern is DECEPTIVE when at least one complete alternative condition is",
        "   TRUE. A single similarity, keyword, or visual cue never completes a condition.",
        "4. Variables named `true`, `actual`, `backend`, `organic`, future probability,",
        "   user focus, or user utility are not inferable from a static evidence bundle",
        "   unless the bundle contains a direct observed proxy. Mark them UNKNOWN.",
        "5. A formula's consequence (`Satisfiable`, `Contradiction`, `WTP`, synthetic",
        "   urgency, or systemic incentive) is not itself evidence. Record observable",
        "   antecedent facts and evaluate the stated conclusion only when operationally",
        "   measurable.",
        "6. Absolute color, WCAG, hitbox, or visual thresholds are not labels. Compare",
        "   controls within the same interface and use the exact stated threshold only",
        "   when DOM/CSS evidence exposes it.",
        "",
        "## Ranked rewrite priorities",
        "",
        "### P1 — Convert implications into explicit observed conjunctions",
        "",
        "Unsafe pattern: `A ⇒ B` is often read as “if A is absent, the condition is",
        "satisfied” or as permission to infer B. Rewrite each such condition as an",
        "explicit proof obligation: `Observed(A) AND Observed(B)`, plus any required",
        "transition/event link. Missing atoms remain UNKNOWN.",
        "",
        "Affected formulas include Dead End #1; Intermediate Currency #3; Sneak Into",
        "Basket #1; Drip Pricing #1; Bundling #1; Reduced Friction #1; Forced Continuity",
        "#1; Privacy Zuckering #1; Friend Spam #1/#2; Automatic Accept Third Party Term",
        "#1; FOMO #1; Activity Messages #2; Countdown Timer #1/#2; Limited Time Message",
        "#1/#3; Reference Pricing #1; all three Conflicting Information conditions;",
        "Persuasive Language #3; Psychological Tricks #1/#2/#3; Pressured Selling #1;",
        "Trick Questions #2/#3; and several forced-action conditions.",
        "",
        "### P2 — Repair tautological or directionally wrong predicates",
        "",
        "- Countdown Timer #1: `T_expire = t_load + duration` is true for an ordinary",
        "  countdown. It must require observed reset/rebinding across independent loads",
        "  or a contradiction with a concrete external deadline; otherwise UNKNOWN.",
        "- FOMO #1: equal initial values across two states are not enough; require a",
        "  reset after a new session/reload and distinguish elapsed monotonic time.",
        "- Persuasive Language #3: satisfiability is counterevidence to contradiction,",
        "  not a deceptive trigger. It belongs in the disqualifier/counterevidence field.",
        "- Reference Pricing #1: arithmetic equality merely defines the discount; only",
        "  the threshold comparison can be a signal, and a large discount alone does",
        "  not establish a deceptive reference price.",
        "- Conflicting Information #1/#3: `P ∧ Q ⇒ contradiction/unsatisfiable` must",
        "  require an explicit semantic contradiction, not any two propositions.",
        "",
        "### P3 — Separate observable mechanism, impact, and unobservable claims",
        "",
        "A condition should expose three fields: `mechanism` (what the interface does),",
        "`user-facing consequence` (what is visible in the trace), and `unobservable",
        "claim` (backend truth, future charge, actual recipients, or psychological",
        "effect). Only the first two can support a TRUE status from this corpus. The",
        "third is UNKNOWN unless directly instrumented.",
        "",
        "High-risk examples: High Demand #1, Activity Messages #1/#2, Automatic Accept",
        "Third Party Term #2, Pre-Delivered Content #1, Endorsement #1/#3, Psychological",
        "Tricks #1/#2/#3, Forced Continuity #1, and Addictive Design session-limit terms.",
        "",
        "### P4 — Make visual signals relational and state-scoped",
        "",
        "Do not treat hue, saturation, absolute contrast, or a fixed hitbox as a label.",
        "For a visual predicate, require the named comparison controls in the same",
        "state, record their state ID, and use native colors only as ordinary interface",
        "evidence. A visual signal cannot substitute for the mechanism or consequence",
        "required by another atom.",
        "",
        "## Required card representation for the next pilot",
        "",
        "Each condition card must contain: pattern; condition; original formula;",
        "observable atoms; required state/transition scope; unobservable atoms; direct",
        "counterevidence; applicable escape clauses; and a three-valued evaluation",
        "rule. The evaluator must output an atom ledger, not a free-form conclusion.",
        "",
    ]
    for flag in sorted(grouped):
        lines += [f"## Flag: {flag}", ""]
        for item in grouped[flag]:
            lines.append(f"- line {item['line']} — **{item['pattern']} / {item['condition']}**: `{item['text']}`")
        lines.append("")
    (OUT / "audit-report.md").write_text("\n".join(lines) + "\n")
    print(json.dumps({
        "patterns": len({r["pattern"] for r in records}),
        "conditions": condition_count,
        "formula_lines": formula_count,
        "flagged_records": len(findings),
        "output": str(OUT),
    }, indent=2))


if __name__ == "__main__":
    main()
