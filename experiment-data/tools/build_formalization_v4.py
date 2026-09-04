#!/usr/bin/env python3
"""Create formalization-revision-v4 with explicit pattern aggregation semantics."""
from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path

ROOT = Path('/home/neliq/Coding/master-project/experiment-data')
SOURCE = ROOT / 'formalization-revision-v3'
OUT = ROOT / 'formalization-revision-v4'


def main() -> None:
    if OUT.exists():
        raise SystemExit(f'refusing to overwrite {OUT}')
    OUT.mkdir()
    source = json.loads((SOURCE / 'operational-cards.json').read_text())
    cards = []
    for card in source['cards']:
        cards.append({
            **card,
            'revision': 'formalization-revision-v4',
            'condition_expression': 'Evaluate(original_formula AND every GIVEN clause)',
            'pattern_expression': 'OR across the three condition results',
            'pattern_condition_role': 'alternative_detector',
            'counterevidence_scope': 'disqualifies only the associated trigger condition; never creates a pattern trigger',
        })
    payload = {
        **source,
        'revision': 'formalization-revision-v4',
        'source_revision': 'formalization-revision-v3',
        'source_sha256': hashlib.sha256((SOURCE / 'operational-cards.json').read_bytes()).hexdigest(),
        'pattern_aggregation': 'OR',
        'condition_aggregation': 'AND_FORMULA_AND_GIVEN',
        'cards': cards,
    }
    (OUT / 'operational-cards.json').write_text(json.dumps(payload, indent=2, ensure_ascii=False) + '\n')
    (OUT / 'pattern-cards').mkdir()
    for path in (SOURCE / 'pattern-cards').glob('card-*.md'):
        text = path.read_text()
        text = text.replace(
            'This v3 card reviews a provisional evidence-only judgment. Missing formal evidence\ndoes not overturn that judgment. A complete proof may upgrade; direct contradiction\nor a contradicted core context may downgrade. Pattern context is a hard routing gate.',
            'This v4 card reviews a provisional evidence-only judgment. Missing formal evidence\ndoes not overturn that judgment. A complete proof may upgrade; direct contradiction\nor a contradicted core context may downgrade. Pattern context is a hard routing gate.\n\nThe three conditions are alternative detectors: evaluate each condition independently\nand aggregate them with OR. Every GIVEN clause is part of its condition. A\ncounterevidence condition can disqualify its associated trigger but cannot create\na deceptive pattern result.'
        )
        (OUT / 'pattern-cards' / path.name).write_text(text)
    shutil.copy2(SOURCE / 'pattern-cards' / 'index.md', OUT / 'pattern-cards' / 'index.md')
    (OUT / 'aggregation-contract.json').write_text(json.dumps({
        'revision': 'formalization-revision-v4',
        'ontology_source': 'run6-multimodal/ontology.md',
        'source_sha256': hashlib.sha256((ROOT / 'run6-multimodal/ontology.md').read_bytes()).hexdigest(),
        'patterns': 62,
        'conditions_per_pattern': 3,
        'conditions': 186,
        'condition_rule': 'C[p,j] = Evaluate(FORMULA[p,j] AND every GIVEN[p,j])',
        'pattern_rule': 'Pattern[p] = C[p,1] OR C[p,2] OR C[p,3]',
        'status_algebra': {
            'and': {'true': 'all operands TRUE', 'false': 'any operand FALSE', 'unknown': 'otherwise'},
            'or': {'true': 'any operand TRUE', 'false': 'all operands FALSE', 'unknown': 'otherwise'},
        },
        'counterevidence': 'A counterevidence-polarity condition is negative evidence for its associated trigger; it is never a positive detector.',
        'unknown': 'UNKNOWN is not TRUE or FALSE and is not silently converted to BENIGN.',
        'rationale': 'Each corpus pattern has three alternative condition layers; a construction-positive instance targets one layer, so pattern detection requires OR rather than AND across layers.',
    }, indent=2) + '\n')
    (OUT / 'revision.md').write_text('''# Formalization revision v4\n\nThis revision preserves the original 62 patterns, 186 conditions, and every original formula. It adds an explicit aggregation contract that was missing from the ontology/application protocol.\n\n## Condition evaluation\n\nFor condition `j` of pattern `p`:\n\n```text\nC[p,j] := Evaluate(FORMULA[p,j] AND every GIVEN[p,j])\n```\n\nAll atomic requirements are evaluated with three-valued status: TRUE, FALSE, or UNKNOWN. A conjunction is TRUE only if all operands are TRUE; FALSE if any operand is FALSE; UNKNOWN otherwise. Material implications are not used as detectors: their relevant premise and consequence must be observed.\n\n## Pattern evaluation\n\nThe three condition layers are alternative detectors:\n\n```text\nPattern[p] := C[p,1] OR C[p,2] OR C[p,3]\n```\n\nThe resulting pattern status is TRUE if any condition is TRUE, FALSE if all conditions are FALSE, and UNKNOWN otherwise. A condition with counterevidence polarity can disqualify its associated trigger but cannot create a positive pattern result.\n\n## Evidence and routing\n\nComplete the neutral multimodal evidence ledger first. Pattern routing is an efficiency aid only. A card is not applicable when its domain/context gate is contradicted. Missing evidence remains UNKNOWN.\n\n## Scientific status\n\nThis is a development revision. The aggregation choice is frozen before its next evaluation and must not be changed after observing outcomes.\n''')
    print(json.dumps({'revision': 'formalization-revision-v4', 'patterns': 62, 'conditions': 186, 'output': str(OUT)}, indent=2))


if __name__ == '__main__':
    main()
