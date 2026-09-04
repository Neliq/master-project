#!/usr/bin/env python3
"""Build a blind full-corpus bundle with corrected state-ID alignment."""
from __future__ import annotations

import hashlib
import json
import os
import random
import re
import shutil
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path('/home/neliq/Coding/master-project/experiment-data')
SOURCE = ROOT / 'run6-multimodal'
OUT = Path(os.environ.get('FULL_RUN_OUT', ROOT / 'run8-full-candidate'))
SCORE = Path(os.environ.get('FULL_RUN_SCORE', ROOT / 'run8-full-score'))
SEED = 20260913
AGENTS = 10


class Text(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []

    def handle_data(self, data: str) -> None:
        if data.strip():
            self.parts.append(data)

    def value(self) -> str:
        return re.sub(r'\s+', ' ', ' '.join(self.parts)).strip()


def semantic_states(fragment: str) -> tuple[str, list[str]]:
    parts = re.split(r'<!--\s*state\s+(s\d+)\s*-->', fragment)
    if len(parts) == 1:
        parser = Text()
        parser.feed(fragment)
        return f'STATE s0\n{parser.value()}\n', ['s0']
    output: list[str] = []
    ids: list[str] = []
    for index in range(1, len(parts), 2):
        state_id, state = parts[index], parts[index + 1]
        parser = Text()
        parser.feed(state)
        output.append(f'STATE {state_id}\n{parser.value()}\n')
        ids.append(state_id)
    return '\n'.join(output), ids


def align_source_semantic(path: Path, dom: str) -> tuple[str, list[str], list[str]]:
    """Preserve source semantic blocks and validate the known one-state offset."""
    source = path.read_text()
    source_parts = re.split(r'STATE\s+(s\d+)\s*\n', source)
    source_blocks = [] if len(source_parts) == 1 else [
        (source_parts[index], source_parts[index + 1].strip())
        for index in range(1, len(source_parts), 2)
    ]
    dom_parts = re.split(r'<!--\s*state\s+(s\d+)\s*-->', dom)
    dom_ids = [dom_parts[index] for index in range(1, len(dom_parts), 2)]
    issues: list[str] = []
    source_ids = [sid for sid, _text in source_blocks]
    expected_source_ids = [f's{index}' for index in range(1, len(source_ids) + 1)]
    if source_ids != expected_source_ids:
        issues.append(f'{path.parent.name}: source semantic IDs are not sequential s1..sN')
    mapped_ids = [f's{int(source_id[1:]) - 1}' for source_id, _text in source_blocks]
    if mapped_ids != dom_ids:
        issues.append(f'{path.parent.name}: semantic offset mapping {mapped_ids} does not equal DOM IDs {dom_ids}')
    output: list[str] = []
    ids: list[str] = []
    for source_id, text in source_blocks:
        if not source_id.startswith('s') or not source_id[1:].isdigit():
            continue
        dom_id = f's{int(source_id[1:]) - 1}'
        if dom_id not in dom_ids:
            continue
        output.append(f'STATE {dom_id}\n{text}\n')
        ids.append(dom_id)
    return '\n'.join(output), ids, issues


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    if OUT.exists() or SCORE.exists():
        raise SystemExit(f'refusing to overwrite {OUT} or {SCORE}')
    source_instances = json.loads((SOURCE / 'instances.json').read_text())
    source_truth = json.loads((SOURCE / 'ground-truth.json').read_text())
    source_index = json.loads((SOURCE / 'evidence/bundle-index.json').read_text())
    source_records = {record['instance_id']: record for record in source_index['records']}
    ids = sorted(source_instances)
    if len(ids) != 372 or set(ids) != set(source_truth) or set(ids) != set(source_records):
        raise SystemExit('source corpus coverage failure')

    OUT.mkdir(parents=True)
    SCORE.mkdir(parents=True)
    (OUT / 'evidence').mkdir()
    (OUT / 'agent-lists').mkdir()
    (OUT / 'results/raw-c0').mkdir(parents=True)
    (OUT / 'results/raw-c1').mkdir(parents=True)
    (SCORE / 'results').mkdir()

    public_records = []
    score_records = []
    alignment_issues = []
    for iid in ids:
        src = SOURCE / 'evidence' / iid
        dst = OUT / 'evidence' / iid
        dst.mkdir()
        dom = (src / 'dom.html').read_text()
        dom_ids = re.findall(r'<!--\s*state\s+(s\d+)\s*-->', dom)
        semantic, semantic_ids, semantic_alignment_issues = align_source_semantic(src / 'semantic.txt', dom)
        (dst / 'dom.html').write_text(dom)
        (dst / 'semantic.txt').write_text(semantic + '\n')
        alignment_issues.extend({'instance_id': iid, 'kind': 'semantic_alignment', 'detail': issue} for issue in semantic_alignment_issues)
        for png in sorted(src.glob('s*.png')):
            shutil.copy2(png, dst / png.name)
        shutil.copy2(src / 'visual-sheet.png', dst / 'visual-sheet.png')
        source_state_rows = source_records[iid]['states']
        visual_ids = [f"s{row['state']}" for row in source_state_rows]
        all_ids = sorted(set(visual_ids) | set(dom_ids) | set(semantic_ids), key=lambda value: int(value[1:]))
        states = []
        for state_id in all_ids:
            visual = state_id in visual_ids and (dst / f'{state_id}.png').exists()
            dom_present = state_id in dom_ids
            semantic_present = state_id in semantic_ids
            if not (visual and dom_present and semantic_present):
                alignment_issues.append({'instance_id': iid, 'state_id': state_id, 'visual': visual, 'dom': dom_present, 'semantic': semantic_present})
            states.append({
                'state_id': state_id,
                'screenshot': f'{state_id}.png' if visual else None,
                'dom': 'dom.html',
                'dom_state_id': state_id if dom_present else None,
                'semantic': 'semantic.txt',
                'semantic_state_id': state_id if semantic_present else None,
            })
        public_records.append({'instance_id': iid, 'states': states, 'visual_sheet': 'visual-sheet.png'})
        manifest = {
            'instance_id': iid,
            'states': states,
            'visual_sheet': 'visual-sheet.png',
            'alignment_policy': 'preserve original state IDs; unavailable modality is explicit in the state manifest',
        }
        (dst / 'state-manifest.json').write_text(json.dumps(manifest, indent=2) + chr(10))
        score_records.append({**source_records[iid], 'instance_id': iid, 'states_aligned': states})

    shuffled = ids[:]
    random.Random(SEED).shuffle(shuffled)
    chunks = [shuffled[i * len(shuffled) // AGENTS:(i + 1) * len(shuffled) // AGENTS] for i in range(AGENTS)]
    for index, chunk in enumerate(chunks, 1):
        (OUT / 'agent-lists' / f'agent-{index:02d}.txt').write_text('\n'.join(chunk) + '\n')

    full_metadata = {
        'run_id': OUT.name,
        'source_run': 'run6-multimodal',
        'sample_seed': SEED,
        'n_instances': len(ids),
        'n_agents': AGENTS,
        'records': score_records,
        'alignment_issues': alignment_issues,
        'source_evidence_index_sha256': sha256(SOURCE / 'evidence/bundle-index.json'),
    }
    (SCORE / 'bundle-index.json').write_text(json.dumps(full_metadata, indent=2) + '\n')
    (SCORE / 'instances.json').write_text(json.dumps({iid: source_instances[iid] for iid in ids}, indent=2) + '\n')
    (SCORE / 'ground-truth.json').write_text(json.dumps({iid: source_truth[iid] for iid in ids}, indent=2) + '\n')
    public_metadata = {
        'run_id': OUT.name,
        'source_run': 'run6-multimodal',
        'n_instances': len(ids),
        'n_agents': AGENTS,
        'records': public_records,
        'alignment_issues': alignment_issues,
        'alignment_policy': 'original state IDs preserved; unavailable modality is explicit in the state manifest',
    }
    (OUT / 'evidence/bundle-index.json').write_text(json.dumps(public_metadata, indent=2) + '\n')
    (OUT / 'public-manifest.json').write_text(json.dumps({
        'run_id': OUT.name,
        'purpose': 'blind full-corpus C0/C1 candidate experiment',
        'n_instances': len(ids),
        'n_agents': AGENTS,
        'assignment_seed': SEED,
        'formalization': 'formalization-revision-v2',
        'labels_public': False,
        'prior_results_public': False,
        'alignment_issues': len(alignment_issues),
    }, indent=2) + '\n')
    (SCORE / 'score-manifest.json').write_text(json.dumps({
        'run_id': OUT.name,
        'n_instances': len(ids),
        'sample_seed': SEED,
        'n_agents': AGENTS,
        'alignment_issues': len(alignment_issues),
        'source_run': 'run6-multimodal',
    }, indent=2) + '\n')
    print(json.dumps({'run': str(OUT), 'score_dir': str(SCORE), 'instances': len(ids), 'agents': AGENTS, 'alignment_issues': len(alignment_issues), 'labels_public': False}, indent=2))


if __name__ == '__main__':
    main()
