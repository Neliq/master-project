# False Hierarchy [misdirection]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one pattern-specific object/context and one mechanism anchor must be directly observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Structural Element Downgrading

Original formula (verbatim): `\mathrm{Tag}(B_{\mathrm{business}}) = \texttt{<button>} \quad \land \quad \mathrm{Tag}(B_{\mathrm{user}}) = \texttt{<a>} \quad \land \quad S_{\mathrm{padding}}(B_{\mathrm{user}}) \leq \tau_{\mathrm{padding\_min}}`
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

## Condition 2: 2. Relational Visual Weight Disparity

Original formula (verbatim): `W(x) = \alpha \cdot A(x) + \beta \cdot C(x) + \gamma \cdot F(x) \quad \land \quad \frac{W(B_{\mathrm{business}})}{W(B_{\mathrm{user}})} > \tau_{\mathrm{hierarchy}}`
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

## Condition 3: 3. Strict Semantic Opposition

Original formula (verbatim): `\exists \mathrm{Intent}(L(B_{1})) \equiv \neg \mathrm{Intent}(L(B_{2}))`
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

