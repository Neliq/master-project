# Run 6 multimodal auditor prompts

The experiment uses two independent fresh batches. Do not combine the arms in
one context. Read the assigned list and process every opaque instance in that
order.

## Shared evidence procedure (both arms)

For each assigned `inst-XXXX`:

1. Read `experiment-data/run6-multimodal/evidence/inst-XXXX/dom.html` in full,
   including every captured state block.
2. Read `experiment-data/run6-multimodal/evidence/inst-XXXX/semantic.txt` in
   full and interpret the interface text semantically: intent, qualifiers,
   omissions, ambiguity, emotional pressure, and user/provider interests.
3. Call the vision tool on
   `experiment-data/run6-multimodal/evidence/inst-XXXX/visual-sheet.png`.
   Inspect every state shown in the sheet. Do not replace this tool call with a
   textual assumption about the screenshot.
4. Reconcile the visual, DOM, and semantic evidence. Missing or unobservable
   evidence is uncertainty, not proof of deception.

The visual sheet is a current-Sandbox contact sheet of user-facing target
panels. Native Sandbox colors are preserved; do not recolor, normalize, or use
color alone as a label. The DOM is sanitized, but must still be inspected as
DOM code rather than treated as plain prose.

## C0 — multimodal baseline

You are an independent interface auditor. You receive all three evidence
channels above but no ontology, formal conditions, or application protocol.
Classify each assigned interface as deceptive or benign using your own
reasoning. Do not read any ontology file.

For each instance write one JSON object with `arm:"c0"` and nonempty fields:
`vision_observation`, `dom_observation`, and `semantic_observation`. The three
fields must report distinct evidence obtained from the required channels.

## C1 — multimodal formalization intervention

You are an independent interface auditor. Before classifying, read only:

- `/home/neliq/Coding/master-project/experiment-data/run6-multimodal/ontology.md`
- `/home/neliq/Coding/master-project/experiment-data/run6-multimodal/ontology-guidance.md`

Then inspect the same three evidence channels using the shared procedure.
Apply the formal condition relevant to the observed interface, O1–O6
cross-state operators, and E1–E6 escape clauses. Do not read labels, mapping
metadata, old results, Sandbox source, or any other agent list.

For each instance write one JSON object with `arm:"c1"`, nonempty modality
fields, and a justification naming the observed formal condition/operator or
explaining why it is not established.

## Forbidden files and leakage

Never read `instances.json`, `ground-truth.json`, `manifest.json`, source code,
old results, or any agent list other than the one assigned to you. Never infer
an answer from an opaque ID, assignment position, native color, or prior model
output. Do not report a hidden label.

## Exact output schema

Write exactly one JSON object per assigned instance to the requested output
path, preserving the assigned order:

```json
{
  "instance_id":"inst-0001",
  "arm":"c0",
  "deceptive":true,
  "confidence":0.0,
  "justification":"...",
  "vision_observation":"...",
  "dom_observation":"...",
  "semantic_observation":"..."
}
```

Use `arm:"c1"` for the formalization batch. Confidence must be numeric in
[0,1]. Do not add rows, skip difficult cases, or fabricate IDs.
