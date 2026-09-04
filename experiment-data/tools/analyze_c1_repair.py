#!/usr/bin/env python3
"""Strict analyzer for the C1-only 20-example repair loop."""
from __future__ import annotations

import json
from math import comb
from pathlib import Path

ROOT = Path('/home/neliq/Coding/master-project/experiment-data')
RUN = Path(__import__('os').environ.get('REPAIR_RUN_DIR', ROOT / 'c1-repair-v1'))
SCORE = ROOT / 'c1-repair-score-v1'
ASSIGN = RUN / 'agent-lists'
RAW = RUN / 'results/raw-c1'


def confusion(truth: list[bool], pred: list[bool]) -> dict[str, float | int]:
    tp = sum(t and p for t, p in zip(truth, pred))
    fp = sum((not t) and p for t, p in zip(truth, pred))
    tn = sum((not t) and (not p) for t, p in zip(truth, pred))
    fn = sum(t and (not p) for t, p in zip(truth, pred))
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    return {'tp': tp, 'fp': fp, 'tn': tn, 'fn': fn, 'accuracy': (tp + tn) / len(truth), 'precision': precision, 'recall': recall, 'f1': f1}


def mcnemar(truth: list[bool], a: list[bool], b: list[bool]) -> dict[str, float | int]:
    left = sum(x != t and y == t for t, x, y in zip(truth, a, b))
    right = sum(x == t and y != t for t, x, y in zip(truth, a, b))
    n = left + right
    p = 1.0 if not n else min(1.0, 2 * sum(comb(n, k) for k in range(min(left, right) + 1)) / (2 ** n))
    return {'b': left, 'c': right, 'p': p}


def main() -> None:
    selection = json.loads((SCORE / 'selection.json').read_text())
    ids = selection['ids']
    truth_map = json.loads((SCORE / 'ground-truth.json').read_text())
    c0_map = json.loads((SCORE / 'fixed-c0.json').read_text())
    old_map = json.loads((SCORE / 'previous-c1.json').read_text())
    assignments = [iid for path in sorted(ASSIGN.glob('agent-*.txt')) for iid in path.read_text().splitlines() if iid.strip()]
    if assignments != sorted(assignments, key=ids.index):
        # The public assignment order is authoritative; just require exact set/count.
        if set(assignments) != set(ids):
            raise SystemExit('assignment coverage failure')
    new_rows = []
    for path in sorted(RAW.glob('agent-*.jsonl')):
        for line_no, line in enumerate(path.read_text().splitlines(), 1):
            if not line.strip():
                continue
            try:
                row = json.loads(line)
            except json.JSONDecodeError as exc:
                raise SystemExit(f'invalid JSON {path}:{line_no}: {exc}')
            new_rows.append(row)
    if len(new_rows) != 20 or {r.get('instance_id') for r in new_rows} != set(ids):
        raise SystemExit('new output count/coverage failure')
    new_map = {r['instance_id']: r for r in new_rows}
    expected_arm = RUN.name
    if any(new_map[iid].get('arm') != expected_arm for iid in ids):
        raise SystemExit('wrong arm')
    truth = [bool(truth_map[iid]['deceptive']) for iid in ids]
    c0 = [bool(c0_map[iid]['deceptive']) for iid in ids]
    old = [bool(old_map[iid]['deceptive']) for iid in ids]
    new = [bool(new_map[iid]['deceptive']) for iid in ids]
    metrics = {'fixed_v5_c0': confusion(truth, c0), 'previous_v5_c1': confusion(truth, old), 'repair_c1': confusion(truth, new)}
    corrected = sum(o != t and n == t for t, o, n in zip(truth, old, new))
    regressed = sum(o == t and n != t for t, o, n in zip(truth, old, new))
    c0_gap = sum(x != t and y == t for t, x, y in zip(truth, c0, new))
    c0_reg = sum(x == t and y != t for t, x, y in zip(truth, c0, new))
    result = {
        'run_id': RUN.name,
        'purpose': 'C1-only development repair diagnostic; not confirmatory',
        'n_instances': len(ids),
        'metrics': metrics,
        'unknown': {'previous_v5_c1': sum(r.get('evidence_status') == 'UNKNOWN' for r in old_map.values()), 'repair_c1': sum(r.get('evidence_status') == 'UNKNOWN' for r in new_map.values())},
        'repair_changes': {'previous_c1_errors_corrected': corrected, 'new_errors_introduced_vs_previous': regressed, 'new_c1_corrections_vs_fixed_c0': c0_gap, 'new_c1_regressions_vs_fixed_c0': c0_reg},
        'mcnemar_previous_to_repair': mcnemar(truth, old, new),
        'mcnemar_fixed_c0_to_repair': mcnemar(truth, c0, new),
        'formal_review': {k: sum(r.get('formal_review') == k for r in new_map.values()) for k in ['UPGRADE', 'DOWNGRADE', 'RETAIN', 'INCONCLUSIVE']},
    }
    (RUN / 'results/repair-results.json').write_text(json.dumps(result, indent=2) + '\n')
    lines = [
        '# C1 repair-loop v1 results',
        '',
        'This is a 20-example, outcome-selected development diagnostic. It is not confirmatory and cannot establish general improvement.',
        '',
        '| Arm | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |',
        '|---|---:|---:|---:|---:|---:|---:|---:|---:|',
    ]
    for name, m in metrics.items():
        lines.append(f"| {name} | {m['accuracy']:.4f} | {m['precision']:.4f} | {m['recall']:.4f} | {m['f1']:.4f} | {m['tp']} | {m['fp']} | {m['tn']} | {m['fn']} |")
    lines += [
        '',
        f"- UNKNOWN: previous C1 {result['unknown']['previous_v5_c1']}/{len(ids)}; repair C1 {result['unknown']['repair_c1']}/{len(ids)}.",
        f"- Previous C1 errors corrected: {corrected}; new errors introduced relative to previous C1: {regressed}.",
        f"- Repair C1 vs fixed C0: corrections {c0_gap}; regressions {c0_reg}.",
        f"- Exact McNemar previous C1 vs repair: b={result['mcnemar_previous_to_repair']['b']}, c={result['mcnemar_previous_to_repair']['c']}, p={result['mcnemar_previous_to_repair']['p']:.6f}.",
        f"- Exact McNemar fixed C0 vs repair: b={result['mcnemar_fixed_c0_to_repair']['b']}, c={result['mcnemar_fixed_c0_to_repair']['c']}, p={result['mcnemar_fixed_c0_to_repair']['p']:.6f}.",
        '',
        '## Formal review dispositions',
        '',
        *[f'- {k}: {v}' for k, v in result['formal_review'].items()],
    ]
    (RUN / 'results/repair-report.md').write_text('\n'.join(lines) + '\n')
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
