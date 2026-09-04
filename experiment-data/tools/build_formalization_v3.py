#!/usr/bin/env python3
"""Build formalization-revision-v3 from v2 with context-gated card evaluation."""
from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path

ROOT = Path('/home/neliq/Coding/master-project/experiment-data')
SOURCE = ROOT / 'formalization-revision-v2'
OUT = ROOT / 'formalization-revision-v3'


def update_card(card: dict) -> dict:
    result = {
        **card,
        'revision': 'formalization-revision-v3',
        'domain_context_gate': (
            'At least one pattern-specific object/context and one mechanism anchor must be directly '
            'observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.'
        ),
        'review_policy': (
            'Review a provisional evidence-only judgment. A complete proof may upgrade; direct '
            'counterevidence or a contradicted core context may downgrade; missing secondary '
            'measurements alone may not overwrite the provisional binary judgment.'
        ),
    }
    key = (card['pattern'], card['condition'])
    if key == ('Immortal Accounts', '3. Absolute Absence of Deletion Vectors'):
        result['required_atoms'] = [
            'The assigned evidence exposes the complete visible account-settings/profile scope being evaluated.',
            'The deletion-keyword set and equivalent labelled controls are absent from that complete visible scope.',
        ]
        result['unknown_atoms'] = ['The visible account scope is partial, truncated, or not identifiable.']
        result['anti_inference'] = [
            'Do not infer absence from an omitted/unseen page; when the assigned visible scope is complete, absence in that scope is directly observable.',
        ]
    if key == ('Price Comparison Prevention', '2. Visual Suppression of Unit-Price Information'):
        result['required_atoms'] = [
            'Unit-price and headline-price nodes are identified in the same state.',
            'The same font-size/contrast measurements, or an explicit direct visual comparison with direction, are available for both nodes.',
            'The stated suppression relation is met; qualitative direction is acceptable only when both operands and direction are explicit.',
        ]
        result['unknown_atoms'] = ['The unit/headline comparison or its direction is not exposed.']
        result['anti_inference'] = [
            'Do not require invented numeric values when the evidence directly exposes the relative visual direction; do not call the unit price suppressed merely because it is smaller.',
        ]
    if key == ('Addictive Design', '1. Infinite Frictionless Continuation'):
        result['required_atoms'] = [
            'The evidence shows the pattern-specific scroll/feed context near a document boundary.',
            'A fetch/append transition is observed after that near-end state, with repeated continuation or no stable end boundary.',
        ]
        result['unknown_atoms'] = ['The evidence contains only a reward/play loop, or lacks a scroll/feed boundary and append transition.']
        result['counterevidence'] = [
            'A stable end boundary is observed, or the interface is a bounded reward/play loop without scroll/feed continuation.'
        ]
        result['anti_inference'] = [
            'Do not substitute repeated rewards, streaks, or Play again controls for scroll/feed append evidence.'
        ]
    return result


def main() -> None:
    if OUT.exists():
        raise SystemExit(f'refusing to overwrite {OUT}')
    OUT.mkdir()
    source_payload = json.loads((SOURCE / 'operational-cards.json').read_text())
    cards = [update_card(card) for card in source_payload['cards']]
    payload = {
        **source_payload,
        'revision': 'formalization-revision-v3',
        'source_revision': 'formalization-revision-v2',
        'source_sha256': hashlib.sha256((SOURCE / 'operational-cards.json').read_bytes()).hexdigest(),
        'cards': cards,
    }
    (OUT / 'operational-cards.json').write_text(json.dumps(payload, indent=2, ensure_ascii=False) + '\n')
    (OUT / 'pattern-cards').mkdir()
    for path in (SOURCE / 'pattern-cards').glob('card-*.md'):
        text = path.read_text()
        text = text.replace(
            'This v2 card reviews a provisional evidence-only judgment. Missing formal evidence\ndoes not overturn that judgment. A complete proof may upgrade; direct contradiction\nmay downgrade.',
            'This v3 card reviews a provisional evidence-only judgment. Missing formal evidence\ndoes not overturn that judgment. A complete proof may upgrade; direct contradiction\nor a contradicted core context may downgrade. Pattern context is a hard routing gate.'
        )
        (OUT / 'pattern-cards' / path.name).write_text(text)
    shutil.copy2(SOURCE / 'pattern-cards' / 'index.md', OUT / 'pattern-cards' / 'index.md')
    (OUT / 'revision.md').write_text("""# Formalization revision v3\n\nThis revision preserves the original 62 patterns, 186 conditions, and every original formula. It changes application semantics only.\n\n## Changes from v2\n\n1. Every card has a hard domain/context gate: a card cannot be applied to a semantically related but structurally different interface. A reward/play loop is not a scroll/feed append mechanism; a permission overlay is not a pricing or account-deletion mechanism.\n2. A qualitative relation (`\\gg`, `\\ll`, `\\approx`, `\\propto`) may be satisfied by a direct same-interface comparison when both operands and direction are observed. Numeric values must not be invented.\n3. A complete visible assigned scope can support an absence predicate. Absence in an omitted or partial scope remains UNKNOWN.\n4. C1 first makes an evidence-only provisional judgment. Formal review can upgrade on complete proof or downgrade on direct contradiction/core-context failure; missing secondary measurements alone cannot overwrite the provisional binary decision.\n\nThis is a bounded development revision, not a confirmatory claim.\n""")
    print(json.dumps({'patterns': 62, 'conditions': 186, 'cards': len(cards), 'output': str(OUT)}, indent=2))


if __name__ == '__main__':
    main()
