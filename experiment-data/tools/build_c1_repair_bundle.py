#!/usr/bin/env python3
"""Create a blind C1-only repair bundle from a preselected error subset."""
from __future__ import annotations

import json
import random
import shutil
from pathlib import Path

ROOT = Path('/home/neliq/Coding/master-project')
SOURCE = ROOT / 'experiment-data/run7-development-v5'
SCORE = ROOT / 'experiment-data/c1-repair-score-v1'
OUT = ROOT / 'experiment-data/c1-repair-v1'
SEED = 20260912
AGENTS = 4


def main() -> None:
    if OUT.exists():
        raise SystemExit(f'refusing to overwrite {OUT}')
    selection = json.loads((SCORE / 'selection.json').read_text())
    ids = selection['ids']
    if len(ids) != 20 or len(set(ids)) != 20:
        raise SystemExit('selection must contain exactly 20 unique IDs')
    OUT.mkdir()
    (OUT / 'evidence').mkdir()
    (OUT / 'agent-lists').mkdir()
    (OUT / 'results/raw-c1').mkdir(parents=True)
    for iid in ids:
        src = SOURCE / 'evidence' / iid
        dst = OUT / 'evidence' / iid
        if not src.exists():
            raise SystemExit(f'missing evidence {iid}')
        shutil.copytree(src, dst)
    rng = random.Random(SEED)
    shuffled = ids[:]
    rng.shuffle(shuffled)
    chunks = [shuffled[i * len(shuffled) // AGENTS:(i + 1) * len(shuffled) // AGENTS] for i in range(AGENTS)]
    for index, chunk in enumerate(chunks, 1):
        (OUT / 'agent-lists' / f'agent-{index:02d}.txt').write_text('\n'.join(chunk) + '\n')
    # Scorer-only snapshot: never copied to OUT.
    source_truth = json.loads((SOURCE / 'ground-truth.json').read_text())
    source_instances = json.loads((SOURCE / 'instances.json').read_text())
    score_truth = {iid: source_truth[iid] for iid in ids}
    score_instances = {iid: source_instances[iid] for iid in ids}
    SCORE.mkdir(exist_ok=True)
    (SCORE / 'ground-truth.json').write_text(json.dumps(score_truth, indent=2) + '\n')
    (SCORE / 'instances.json').write_text(json.dumps(score_instances, indent=2) + '\n')
    old_c0 = [json.loads(line) for path in (SOURCE / 'results/raw').glob('agent-*.jsonl') for line in path.read_text().splitlines() if line.strip() and json.loads(line).get('instance_id') in ids and json.loads(line).get('arm') == 'c0']
    old_c1 = [json.loads(line) for path in (SOURCE / 'results/raw').glob('agent-*.jsonl') for line in path.read_text().splitlines() if line.strip() and json.loads(line).get('instance_id') in ids and json.loads(line).get('arm') == 'c1']
    (SCORE / 'fixed-c0.json').write_text(json.dumps({r['instance_id']: r for r in old_c0}, indent=2) + '\n')
    (SCORE / 'previous-c1.json').write_text(json.dumps({r['instance_id']: r for r in old_c1}, indent=2) + '\n')
    (OUT / 'public-manifest.json').write_text(json.dumps({
        'run_id': OUT.name,
        'purpose': 'C1-only development repair loop; not confirmatory',
        'n_instances': len(ids),
        'n_agents': AGENTS,
        'assignment_seed': SEED,
        'evidence': 'copied from state-aligned Run 7 evidence; labels and prior results excluded',
        'formalization': 'formalization-revision-v2',
        'selection_rule': 'scorer-only selection metadata; opaque IDs remain assigned',
    }, indent=2) + '\n')
    print(json.dumps({'run': str(OUT), 'instances': len(ids), 'agents': AGENTS, 'labels_public': False, 'prior_results_public': False}, indent=2))


if __name__ == '__main__':
    main()
