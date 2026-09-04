# Addictive Design [attention-manipulation]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one pattern-specific object/context and one mechanism anchor must be directly observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Infinite Frictionless Continuation

Original formula (verbatim): `Y_{\mathrm{max}}(t) - Y_{\mathrm{scroll}}(t) < \tau_{\mathrm{buffer}} \quad \implies \quad E_{\mathrm{append}} = \mathrm{True}`
Operational reading: **Near-end scrolling triggers observed content append**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: Review a provisional evidence-only judgment. A complete proof may upgrade; direct counterevidence or a contradicted core context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment.

### Required atoms
- The evidence shows the pattern-specific scroll/feed context near a document boundary.
- A fetch/append transition is observed after that near-end state, with repeated continuation or no stable end boundary.

### Mark UNKNOWN when
- The evidence contains only a reward/play loop, or lacks a scroll/feed boundary and append transition.

### Direct counterevidence
- A stable end boundary is observed, or the interface is a bounded reward/play loop without scroll/feed continuation.

### Do not infer
- Do not substitute repeated rewards, streaks, or Play again controls for scroll/feed append evidence.

## Condition 2: 2. Eradication of Natural Stopping Cues

Original formula (verbatim): `\forall e \in E_{\mathrm{stop}} : \mathrm{Visible}(e, t) = \mathrm{False} \quad \lor \quad \frac{A(e)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \quad \lor \quad \mathrm{CR}(e, L_{\mathrm{bg}}) < 3.0`
Operational reading: **Stopping cues are absent or below threshold in the inspected state**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: Review a provisional evidence-only judgment. A complete proof may upgrade; direct counterevidence or a contradicted core context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment.

### Required atoms
- The relevant stopping-cue set is defined for the inspected interface.
- Every relevant cue fails visibility/area/contrast in the same state(s).

### Mark UNKNOWN when
- The complete stopping-cue set or session-duration claim is unavailable.

### Direct counterevidence
- A clear stopping cue is visible at the stated threshold.

### Do not infer
- Long engagement or psychological dependence cannot be inferred from a static screenshot.

## Condition 3: 3. Semantic Reinforcement-Trigger Lexicon Density

Original formula (verbatim): `\frac{|\{w \in T : w \in L_{\mathrm{reinforcement}}\}|}{A_{\mathrm{viewport}}} > \tau_{\mathrm{addiction}}`
Operational reading: **Reinforcement lexemes exceed the stated density in the viewport**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: Review a provisional evidence-only judgment. A complete proof may upgrade; direct counterevidence or a contradicted core context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment.

### Required atoms
- The relevant viewport text and reinforcement lexicon are available.
- The stated normalized density exceeds threshold.

### Mark UNKNOWN when
- The viewport text or lexicon denominator is incomplete.

### Direct counterevidence
- The density does not exceed the threshold.

### Do not infer
- Lexical density is an observable signal, not proof of addiction or user harm.

