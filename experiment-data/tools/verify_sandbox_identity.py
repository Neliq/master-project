#!/usr/bin/env python3
"""Verify corpus <-> sandbox identity and full coverage.
Compares freshly captured+transformed fragments against the stored corpus
(opaque ids, via instances.json). Match classes:
  exact        - identical after whitespace normalization
  timer-diff   - identical after digit-run normalization (countdown ticks)
  MISMATCH     - content differs (verification failure)
Also audits coverage: 62 slugs x 3 conditions x 2 variants both sides.
"""
import json
import os
import pathlib
import re

EXP = pathlib.Path(os.environ.get("EXPERIMENT_DIR", pathlib.Path(__file__).resolve().parents[1]))
CAP = pathlib.Path(os.environ.get("CAPTURE_DIR", "/tmp/verify-capture"))
CORPUS = EXP / "corpus"
instances = json.loads((EXP / "instances.json").read_text())

# canonical name -> iid
name2iid = {}
for iid, v in instances.items():
    name2iid[f"{v['slug']}-cond{v['condition_index']}-{v['variant']}.html"] = iid

norm = lambda s: re.sub(r"\s+", " ", s).strip()
digits = lambda s: re.sub(r"\d+", "#", norm(s))

exact = timer = mismatch = missing = 0
mismatch_list = []
for cname, iid in sorted(name2iid.items()):
    cf = CAP / cname
    if not cf.exists():
        missing += 1
        continue
    a = norm(cf.read_text())
    b = norm((CORPUS / f"{iid}.html").read_text())
    if a == b:
        exact += 1
    elif digits(a) == digits(b):
        timer += 1
    else:
        mismatch += 1
        mismatch_list.append((cname, iid))
print(f"EXACT: {exact} | TIMER-DIFF (digits only): {timer} | MISMATCH: {mismatch} | MISSING: {missing}")

for cname, iid in mismatch_list[:12]:
    a = norm((CAP / cname).read_text())
    b = norm((CORPUS / f"{iid}.html").read_text())
    # first divergence
    i = 0
    while i < min(len(a), len(b)) and a[i] == b[i]:
        i += 1
    print(f"\n=== MISMATCH {cname} ({iid}) ===")
    print("fresh : ...", a[max(0, i - 80):i + 120])
    print("corpus: ...", b[max(0, i - 80):i + 120])
print("\n--- coverage ---")
slugs = sorted({v["slug"] for v in instances.values()})
print(f"slugs in instances.json: {len(slugs)}")
print(f"corpus fragments: {len(list(CORPUS.glob('*.html')))}")
conds = {}
for iid, v in instances.items():
    conds.setdefault((v["slug"], v["condition_index"]), set()).add(v["variant"])
bad = {k: v for k, v in conds.items() if v != {"A", "B"}}
print(f"(slug, cond) pairs: {len(conds)}, each with A+B: {len(bad) == 0}")
if bad:
    print("incomplete pairs:", list(bad.items())[:5])
if missing or mismatch or bad or len(slugs) != 62 or len(conds) != 62 * 3:
    raise SystemExit(1)
