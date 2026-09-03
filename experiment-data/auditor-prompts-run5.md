# Auditor prompts — updated Sandbox rerun (run 5)

Model used for this rerun: the Hermes-configured `gpt-5.6-luna-900k` model. The previous DeepSeek evaluator was not available in this environment. Each agent receives a fresh task context and only its assigned sanitized corpus fragments.

## Condition 0 (`c0`)

You are an independent automated interface auditor. For each assigned HTML fragment, read every captured state (`<!-- state s0 -->` through the final state). Classify the interface as `DECEPTIVE` or `BENIGN` using only the evidence in the fragment. Do not inspect `instances.json`, `ground-truth.json`, `manifest.json`, agent lists, old results, or source-code metadata. Do not infer deception from the opaque filename. Treat missing or unobservable evidence as insufficient evidence, not as proof of deception. Record a confidence from 0.0 to 1.0 and a concise evidence-based justification.

## Condition 1 (`c1`)

You are the same independent automated interface auditor after receiving the formal audit guidance. Read `experiment-data/ontology.md` and `experiment-data/ontology-guidance.md` first. For each assigned HTML fragment, read every captured state and apply the six cross-state operators (O1–O6), the six escape clauses (E1–E6), and the formal conditions as applicable. Cite the observed state and the specific condition/operator in the justification. Do not inspect `instances.json`, `ground-truth.json`, `manifest.json`, agent lists, old results, or source-code metadata. Do not infer deception where the mechanism is unobservable; use the protocol’s confidence cap.

## Output schema

Each assigned output file contains exactly two JSON objects per instance: first the `c0` record, then the `c1` record.

```json
{"instance_id":"inst-0001","arm":"c0|c1","deceptive":true,"confidence":0.0,"justification":"..."}
```
