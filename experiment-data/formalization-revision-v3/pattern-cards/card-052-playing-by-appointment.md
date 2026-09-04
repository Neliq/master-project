# Playing By Appointment [forced-action]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one pattern-specific object/context and one mechanism anchor must be directly observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Temporal Gating

Original formula (verbatim): `\mathrm{State}(A_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{until} \quad t \ge t_{\mathrm{depletion}} + \tau_{\mathrm{refill}}`
Operational reading: **Strict observable evaluation of the original predicate**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: Review a provisional evidence-only judgment. A complete proof may upgrade; direct counterevidence or a contradicted core context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment.

### Required atoms
- Every atomic clause in the original formula is identified and evaluated in the stated scope.

### Mark UNKNOWN when
- Any referenced variable, threshold, comparator, transition, or set is not directly available.

### Direct counterevidence
- A directly observed atom contradicts a mandatory requirement.

### Do not infer
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.

## Condition 2: 2. Visual Prominence of Temporal-Gating Indicators

Original formula (verbatim): `\frac{A(N_{\mathrm{temporal}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{appointment}} \quad \lor \quad \mathrm{Saturation}(N_{\mathrm{temporal}}) > 0.8`
Operational reading: **Strict observable evaluation of the original predicate**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: Review a provisional evidence-only judgment. A complete proof may upgrade; direct counterevidence or a contradicted core context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment.

### Required atoms
- Every atomic clause in the original formula is identified and evaluated in the stated scope.

### Mark UNKNOWN when
- Any referenced variable, threshold, comparator, transition, or set is not directly available.

### Direct counterevidence
- A directly observed atom contradicts a mandatory requirement.

### Do not infer
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.

## Condition 3: 3. Semantic Urgency Encoding in Temporal-Gating Messages

Original formula (verbatim): `\mathrm{Urgency}(T_{\mathrm{temporal}}) > \tau_{\mathrm{appointment\_urgency}} \quad \land \quad T_{\mathrm{temporal}} \cap L_{\mathrm{scarcity}} \neq \emptyset`
Operational reading: **Strict observable evaluation of the original predicate**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: Review a provisional evidence-only judgment. A complete proof may upgrade; direct counterevidence or a contradicted core context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment.

### Required atoms
- Every atomic clause in the original formula is identified and evaluated in the stated scope.

### Mark UNKNOWN when
- Any referenced variable, threshold, comparator, transition, or set is not directly available.

### Direct counterevidence
- A directly observed atom contradicts a mandatory requirement.

### Do not infer
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.

