# Auto-Play [attention-manipulation]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one pattern-specific object/context and one mechanism anchor must be directly observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Autonomous Media Execution

Original formula (verbatim): `S_{\mathrm{play}}(M_{\mathrm{media}}) = \mathrm{True} \quad \text{given} \quad E_{\mathrm{intent}} = \emptyset \quad \land \quad \mathrm{Intersection}(M_{\mathrm{media}}, \mathrm{Viewport}) > \tau_{\mathrm{visible}}`
Operational reading: **Evaluate the source formula over directly observed evidence; preserve every Boolean operator, quantifier, comparison, unit, scope, and threshold.**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- Every atomic clause in the original formula is identified and evaluated in the stated scope.

### Mark UNKNOWN when
- Any referenced variable, threshold, comparator, transition, or set is not directly available.

### Direct counterevidence
- A directly observed atom contradicts a mandatory requirement.

### Do not infer
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.

## Condition 2: 2. Affordance Suppression

Original formula (verbatim): `\mathrm{Visibility}(B_{\mathrm{cancel}}) < \tau_{\mathrm{visibility\_min}} \quad \lor \quad \mathrm{Cost}(S_{\mathrm{play}} \to \mathrm{False}) > \tau_{\mathrm{stop\_cost}}`
Operational reading: **Evaluate the source formula over directly observed evidence; preserve every Boolean operator, quantifier, comparison, unit, scope, and threshold.**
Polarity: `trigger`
Comparison policy: A direct within-interface comparison may satisfy the qualitative relation when both operands and the direction are explicitly observed; no numeric threshold may be invented.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- Every atomic clause in the original formula is identified and evaluated in the stated scope.

### Mark UNKNOWN when
- Any referenced variable, threshold, comparator, transition, or set is not directly available.

### Direct counterevidence
- A directly observed atom contradicts a mandatory requirement.

### Do not infer
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.

## Condition 3: 3. Semantic Framing of Auto-Play as Content Continuation

Original formula (verbatim): `\mathrm{Frame}(T_{\mathrm{autoplay}}) \in \{\text{Continuation}, \text{Next}\} \quad \land \quad \neg\exists \text{``autoplay''} \in T_{\mathrm{visible}}`
Operational reading: **Evaluate the source formula over directly observed evidence; preserve every Boolean operator, quantifier, comparison, unit, scope, and threshold.**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- Every atomic clause in the original formula is identified and evaluated in the stated scope.

### Mark UNKNOWN when
- Any referenced variable, threshold, comparator, transition, or set is not directly available.

### Direct counterevidence
- A directly observed atom contradicts a mandatory requirement.

### Do not infer
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.

