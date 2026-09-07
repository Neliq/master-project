# Forced Continuity [sneaking]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one pattern-specific object/context and one mechanism anchor must be directly observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Time-Triggered Silent State Mutation

Original formula (verbatim): `\begin{gathered} t \geq t_{\mathrm{expiry}} \quad \land \quad S_{\mathrm{account}}(t) = S_{\mathrm{premium}} \\ \land \quad E_{\mathrm{charge}}(T_{\mathrm{payment}}) = \mathrm{True} \quad \land \quad \mathrm{ConsentAtSignup} = \mathrm{False} \\ \land \quad \mathrm{Consent}_{\mathrm{explicit}}(t) = \mathrm{False} \end{gathered}`
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
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.

## Condition 2: 2. Absence of Temporal Feedforward

Original formula (verbatim): `\begin{gathered} \forall w \in W_{\mathrm{renewal}},\; t \in [t_{\mathrm{expiry}} - \tau_{\mathrm{fair\_notice}}, t_{\mathrm{expiry}}] : \\ \mathrm{Visible}(w, t) = \mathrm{False} \quad \lor \quad \frac{A(w)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \\ \lor \quad \mathrm{CR}(w, L_{\mathrm{bg}}) < 3.0 \end{gathered}`
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

## Condition 3: 3. Semantic Asymmetry Between Subscription and Cancellation Language

Original formula (verbatim): `\mathrm{FKGL}(T_{\mathrm{cancel}}) - \mathrm{FKGL}(T_{\mathrm{signup}}) > 2 \quad \lor \quad \mathrm{Guilt}(T_{\mathrm{cancel}}) - \mathrm{Guilt}(T_{\mathrm{signup}}) > \tau_{\mathrm{guilt\_gap}}`
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

