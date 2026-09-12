# Combined 64-pattern aggregate handoff

Canonical aggregate: `full-binary-aided-pattern-combined-v10-20260910-gpt56luna900k`

This bundle is additive: original raw observations remain in their original run, extension raw observations remain in their validated run, and this directory contains exact copied rows plus row-level source/line/hash provenance. No original observation was fabricated, replaced, or edited.

## Counts

- Original completed observations: 62 patterns, 372 interfaces, 744 rows (372 per arm).
- Validated extension: 2 patterns (Nagging 63 and Games For Other Purposes 64), 12 interfaces, 24 rows (12 per arm).
- Combined: 64 patterns, 384 interfaces, 768 rows (384 per arm), 6 agents per arm, 64 rows per agent.

## Handles

- Integration manifest: `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-combined-v10-20260910-gpt56luna900k/integration-manifest.json`
- Row provenance: `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-combined-v10-20260910-gpt56luna900k/row-provenance.json`
- Combined metrics: `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-combined-v10-20260910-gpt56luna900k/results/results.json`
- Combined report: `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-combined-v10-20260910-gpt56luna900k/results/report.md`
- Public manifest: `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-combined-v10-20260910-gpt56luna900k/public-manifest.json`
- Extension evidence copy: `evidence/extension/`; source hashes and absolute paths are in `integration-manifest.json`.

## Commands

- Extension gate: `python3 /home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15/validate_extension.py`
- Original aggregate/schema gate: `FULL_BINARY_OUT=/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-first-v4-20260906-gpt54mini REQUIRE_AID_SCREENING=1 python3 /home/neliq/Coding/master-project/experiment-data/tools/aggregate_full_binary_aided_test.py`
- Integration: `python3 /home/neliq/Coding/master-project/experiment-data/tools/integrate_full_binary_aided_64.py --original /home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-first-v4-20260906-gpt54mini --declared-base /home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-first-rollback-v7-20260907-gpt54mini --extension /home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15 --output /home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-combined-v10-20260910-gpt56luna900k`
- Final aggregate validator: `FULL_BINARY_64_OUT=/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-combined-v10-20260910-gpt56luna900k python3 /home/neliq/Coding/master-project/experiment-data/tools/validate_full_binary_aided_64.py`

## Limitation

The extension handoff declares rollback-v7 as its base, but rollback-v7 is metadata/score-only and has no raw results aggregate. The completed v4 directory supplies the untouched original raw observations; v4 and v7 runtime plus score-only hashes match. This distinction is explicit in the integration manifest.
