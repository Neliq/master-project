#!/usr/bin/env python3
"""
Run-4 opaque IDs + between-subjects agent lists (reconstructed).
- Renames corpus files to inst-XXXX (ONLY once — refuses to re-run when
  inst-* files exist: rename(X->Y) clobbers Y on a second pass).
- Between-subjects: each pair's A and B go to DIFFERENT agents (pair i ->
  agent i%10 gets A, agent (i+5)%10 gets B); full 372 coverage, balanced.
- Writes instances.json (opaque id -> slug/cond/variant/deceptive/pair),
  re-keys ground-truth.json and manifest.json by opaque id,
  writes agent-lists-run4/agent-NN.txt, clears results/raw.
"""
import json
import os
import pathlib
import random

SEED = int(os.environ.get("OPAQUE_SEED", "20260817"))
EXP = pathlib.Path("/home/neliq/Coding/master-project/experiment-data")
CORPUS = EXP / "corpus"
MANIFEST = json.loads((EXP / "manifest.json").read_text())

random.seed(SEED)

existing = [f.name for f in CORPUS.glob("*.html")]
if any(f.startswith("inst-") for f in existing):
    print("ABORT: corpus already contains inst-* files; refusing to re-rename")
    raise SystemExit(1)

# 1. opaque ids
entries = sorted(MANIFEST, key=lambda m: m["instance_id"])
ids = [f"inst-{i:04d}" for i in range(1, len(entries) + 1)]
random.shuffle(ids)
instances = {}
for m, iid in zip(entries, ids):
    old_file = CORPUS / m["file"].replace("corpus/", "")
    new_file = CORPUS / f"{iid}.html"
    if not old_file.exists():
        print(f"!! missing {old_file.name}")
        continue
    if old_file.name != new_file.name:
        old_file.rename(new_file)
    instances[iid] = {
        "slug": m["slug"],
        "condition_index": m["condition_index"],
        "variant": m["variant"],
        "deceptive": m["deceptive"],
        "pair": f"{m['slug']}-cond{m['condition_index']}",
        "file": f"corpus/{iid}.html",
        "size_bytes": m["size_bytes"],
    }
print("opaque ids:", len(instances), "instances")

# 2. between-subjects pair assignment
pairs = sorted({v["pair"] for v in instances.values()})
random.shuffle(pairs)
agents = [f"agent-{i:02d}" for i in range(1, 11)]
assignment = {a: [] for a in agents}
for i, pair in enumerate(pairs):
    members = [iid for iid, v in instances.items() if v["pair"] == pair]
    a_side = next(iid for iid in members if instances[iid]["variant"] == "A")
    b_side = next(iid for iid in members if instances[iid]["variant"] == "B")
    agent_a = agents[i % 10]
    agent_b = agents[(i + 5) % 10]
    assert agent_a != agent_b
    assignment[agent_a].append(a_side)
    assignment[agent_b].append(b_side)

for a in agents:
    n_a = sum(1 for iid in assignment[a] if instances[iid]["variant"] == "A")
    n_b = sum(1 for iid in assignment[a] if instances[iid]["variant"] == "B")
    print(f"{a}: {len(assignment[a])} instances, A={n_a} B={n_b}")

# verify: no agent sees both variants of any pair
agents_of = {}
for a, lst in assignment.items():
    for iid in lst:
        agents_of[iid] = a
bad = sum(1 for iid, v in instances.items()
          for m, mv in instances.items()
          if m != iid and mv["pair"] == v["pair"] and agents_of.get(iid) == agents_of.get(m))
assert bad == 0, f"pair-mate violations: {bad}"
print("between-subjects split verified: no agent sees both variants of any pair")

# 3. per-agent shuffle + write lists
random.seed(SEED + 1)
lists_dir = EXP / "agent-lists-run4"
lists_dir.mkdir(exist_ok=True)
for a in agents:
    lst = assignment[a]
    random.Random(SEED + int(a.split("-")[1])).shuffle(lst)
    (lists_dir / f"{a}.txt").write_text("\n".join(f"corpus/{iid}.html" for iid in lst) + "\n")

# 4. instances.json / ground-truth.json / manifest.json re-keyed
(EXP / "instances.json").write_text(json.dumps(instances, indent=1))
gt = {iid: {"deceptive": v["deceptive"], "variant": v["variant"],
            "slug": v["slug"], "condition_index": v["condition_index"]}
      for iid, v in instances.items()}
(EXP / "ground-truth.json").write_text(json.dumps(gt, indent=1))
new_manifest = []
for iid, v in instances.items():
    new_manifest.append({
        "instance_id": iid, "slug": v["slug"], "condition_index": v["condition_index"],
        "variant": v["variant"], "deceptive": v["deceptive"],
        "file": v["file"], "size_bytes": v["size_bytes"],
    })
(EXP / "manifest.json").write_text(json.dumps(new_manifest, indent=1))

# 5. clear results/raw
raw = EXP / "results" / "raw"
for f in raw.glob("agent-*.jsonl"):
    f.write_text("")
print("results/raw cleared")
