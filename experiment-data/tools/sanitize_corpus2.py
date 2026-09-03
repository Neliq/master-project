#!/usr/bin/env python3
"""Sanitizer pass 2: generic notation cleanup (reconstructed).
- unicode subscripts -> digits
- tau/delta/lambda/theta tokens -> words
- function-call notation [A-Z][A-Za-z]*(...) -> "the <root>"
- CR -> the contrast ratio
- |...| -> "the count" (after specific maps)
- leftover [A-Z]_... tokens -> drop the prefix (underscore-anchored ONLY —
  a bare \\bt[A-Za-z] rule mangles "text-[8px]" / "to" / "the")
- strip React empty comments so they cannot hide tokens (τ<!-- -->_x)
"""
import pathlib
import os
import re

EXP = pathlib.Path(os.environ.get("EXPERIMENT_DIR", pathlib.Path(__file__).resolve().parents[1]))
CORPUS = pathlib.Path(os.environ.get("CORPUS_DIR", EXP / "corpus"))

FN_ROOT = {
    "A": "the area", "W": "the weight", "D": "the distance", "P": "the probability",
    "T": "the time", "S": "the state", "POS": "the position", "E": "the event",
    "M": "the message", "N": "the number", "V": "the value", "C": "the choice",
    "K": "the step count", "CR": "the contrast ratio", "L": "the lexicon",
    "SIMILARITY": "the similarity", "INTENT": "the intent", "DEP": "the dependency",
    "TARGET": "the target", "MIN": "the minimum", "MAX": "the maximum",
    "MEAN": "the mean", "MED": "the median", "SUM": "the sum", "COUNT": "the count",
    "PCT": "the share", "RATIO": "the ratio", "PROB": "the probability",
}

def fn(m):
    root = m.group(1)
    return FN_ROOT.get(root, "the " + root.lower())

def clean(s):
    # React empty comments between tokens
    s = re.sub(r"<!--\s*-->", "", s)
    # unicode subscripts -> digits
    s = re.sub(r"([A-Za-z])₀", r"\g<1>0", s)
    s = re.sub(r"([A-Za-z])₁", r"\g<1>1", s)
    s = re.sub(r"([A-Za-z])₂", r"\g<1>2", s)
    s = re.sub(r"([A-Za-z])₃", r"\g<1>3", s)
    # tau tokens (with optional comment gaps already stripped)
    s = re.sub(r"τ_[A-Za-z0-9_]+", "the threshold", s)
    s = re.sub(r"τ", "the threshold", s)
    s = re.sub(r"Δt[A-Za-z0-9_]*", "the delay", s)
    s = re.sub(r"\bΔ[A-Za-z0-9_]*", "the change", s)
    s = re.sub(r"δ[A-Za-z0-9_]*", "the difference", s)
    s = re.sub(r"λ[A-Za-z0-9_]*", "the rate", s)
    # function-call notation
    s = re.sub(r"\b([A-Z][A-Za-z]*)\([^)]*\)", fn, s)
    # |...| specific then generic
    s = re.sub(r"\|matrix\|", "the matrix", s)
    s = re.sub(r"\|choices\|", "the number of choices", s)
    s = re.sub(r"\|W\(M\)\|", "the weight", s)
    s = re.sub(r"\|[^|]+\|", "the count", s)
    # leftover X_foo tokens: drop prefix, keep tail (underscore-anchored!)
    s = re.sub(r"\b[A-Z]_[A-Za-z][A-Za-z0-9_]*", lambda m: m.group(0).split("_", 1)[1], s)
    s = re.sub(r"\bt_[A-Za-z0-9]*", lambda m: m.group(0)[2:], s)
    # stray math symbols
    s = s.replace("∧", " and ").replace("∨", " or ").replace("¬", "not ")
    s = s.replace("∈", " in ").replace("∉", " not in ").replace("∅", "none")
    s = s.replace("≥", " at least ").replace("≤", " at most ").replace("≠", " differs from ")
    s = s.replace("≈", " about ").replace("⇒", " so ").replace("∝", " scales with ")
    s = s.replace("«", "").replace("»", "")
    return s

files = sorted(CORPUS.glob("*.html"))
changed = 0
for f in files:
    s = f.read_text()
    s2 = clean(s)
    if s2 != s:
        f.write_text(s2)
        changed += 1

print(f"pass 2: sanitized {changed}/{len(files)} files")

def count(rx):
    n = 0
    for f in files:
        n += len(re.findall(rx, f.read_text()))
    return n
nota = r"\b[A-Z]_[A-Za-z]"
gree = r"[τΔλδΣ]"
fns = r"\b[A-Z][A-Za-z]*\([^)]*\)"
maths = r"[∧∨¬∉⊆⊂∈∅≥≤≠≈⇒∝∃∀≫≪«»∑]"
pipes = r"\|[^|]+\|"
print(f"Variant A/B: {count(r'Variant [AB]')} files")
print(f"dark pattern: {count(r'(?i)dark pattern')} files")
print(f"S_/T_/E_/V_/C_/D_/N_/K_/M_/P_/L_ notation: {count(nota)} files")
print(f"greek τΔλδ: {count(gree)} files")
print(f"function-call: {count(fns)} files")
print(f"math ops: {count(maths)} files")
print(f"pipes: {count(pipes)} files")
