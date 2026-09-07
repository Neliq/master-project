# Machine-readable ontology semantics

This directory contains the source-preserving machine-readable semantic layer for the thesis catalogue.

## Files

- `ontology.json` — 62 patterns and 186 conditions in JSON.
- `ontology.schema.json` — JSON Schema for the document and condition records.
- `generate_ontology.py` — deterministic generator from the active LaTeX formalizations and the LLM-oriented cards.
- `validate_ontology.py` — schema and source-integrity validator.
- `cards/` — the LLM-oriented card translations used as the application-readable layer.

## Translation contract

The LaTeX equations and `Given` paragraphs in `subsections/[0-9][0-9]-*.tex` remain the authoritative formal source expressions. The JSON records preserve each formula and `Given` paragraph, then add a strict evidence-oriented pseudo-code interpretation. This is a translation to a representation that is easier for an LLM to apply; it is not an executable ontology interpreter and does not replace the original expressions.

The translation does not add catalogue entries or thresholds. It makes implicit proof obligations explicit:

1. evaluate formula operands only from directly observed evidence, preserving the source formula's Boolean grouping;
2. apply three-valued logic: `AND` is false if any operand is false, true if all are true, and unknown otherwise; `OR` is true if any operand is true, false if all are false, and unknown otherwise;
3. never use material implication vacuously; treat it as an observed premise-and-consequence proof obligation;
4. return `UNKNOWN` for missing, unobservable, or out-of-scope atoms;
5. apply direct counterevidence only after checking the required scope and comparison;
6. allow a pattern trigger only when one complete trigger condition is `TRUE`;
7. never allow a counterevidence condition to create a trigger.

The shared terminology, typed notation, threshold policy, boundary rules, and the distinction between conceptual, operational, formal, illustrative, and non-example statements are defined under the LaTeX label `sec:semantic-commitments` in `subsections/ch3-formalization-methodology.tex`. A missing or unobservable operand remains `UNKNOWN`; the binary experiment labels are a separate construction-based reporting layer.

The translation layer is source-preserving and does not alter the already reported evaluation results. No second researcher independently reviewed the taxonomy classification or this semantic translation; that remains a limitation.

## Validation

From the thesis repository root:

```text
python3 ontology/generate_ontology.py
python3 ontology/validate_ontology.py
```

The validator checks the JSON Schema, the 62-pattern/186-condition inventory, exact condition names, exact `Given` paragraphs, and one-to-one formula correspondence with the active LaTeX files. It also checks that the second-researcher-review status is explicitly recorded as unavailable.
