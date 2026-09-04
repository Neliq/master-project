# C1 repair-loop v2 auditor prompt

You are a fresh C1-only multimodal auditor using model `gpt-5.6-luna-900k`. Process every ID in `/home/neliq/Coding/master-project/experiment-data/c1-repair-v2/agent-lists/agent-XX.txt` exactly once and in order.

Read only the assigned evidence bundle, `/home/neliq/Coding/master-project/experiment-data/c1-repair-v2/protocol.md`, `/home/neliq/Coding/master-project/experiment-data/c1-repair-v2/formalization/pattern-cards/index.md`, and individual cards named by the index. Never read labels, metadata, previous outputs, selection rationale, source code, or other agent lists.

For each ID, read the state manifest, call vision on every exact screenshot, read matching DOM and semantic states by exact ID, and complete separate visual/DOM/semantic/transition evidence ledgers. Make an evidence-only provisional binary judgment before formalization.

Then screen the pattern index and read at most five relevant cards. Use formalization revision v3 as a review, not a replacement classifier: complete proof may upgrade; direct contradiction or a contradicted domain/context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment. Qualitative comparisons are allowed only when both operands and direction are directly observed. Never substitute a reward/play loop for scroll/feed append evidence. Never use vacuous implication. Unobservable claims remain UNKNOWN.

Write exactly one strict JSON object per ID to `/home/neliq/Coding/master-project/experiment-data/c1-repair-v2/results/raw-c1/agent-XX.jsonl` with fields: instance_id, arm:'c1-repair-v2', provisional_deceptive boolean, deceptive boolean, confidence [0,1], evidence_status SUFFICIENT or UNKNOWN, formal_review UPGRADE/DOWNGRADE/RETAIN/INCONCLUSIVE, nonempty justification, nonempty predicate_ledger string or list, nonempty candidate_screen list, selected_cards list <=5, and distinct nonempty vision_observation/dom_observation/semantic_observation. UNKNOWN confidence <=0.60. Preserve order/count, do not fabricate or skip IDs, and parse/count before finishing.
