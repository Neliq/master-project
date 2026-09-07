# Positive Or Negative Framing [misdirection]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one pattern-specific object/context and one mechanism anchor must be directly observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Structural Asymmetry of Framed Option Subtrees

Original formula (verbatim): `\frac{|T_{\mathrm{gain}} \setminus T_{\mathrm{loss}}|}{|T_{\mathrm{gain}} \cup T_{\mathrm{loss}}|} > \tau_{\mathrm{frame\_structure}}`
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

## Condition 2: 2. Visual Weight Asymmetry Between Framing Poles

Original formula (verbatim): `\max\left(\frac{W(F_{\mathrm{gain}})}{W(F_{\mathrm{loss}})}, \frac{W(F_{\mathrm{loss}})}{W(F_{\mathrm{gain}})}\right) > \tau_{\mathrm{frame\_asymmetry}}`
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

## Condition 3: 3. Identification of Mutually Exclusive Vectors

Original formula (verbatim): `A(B_{\mathrm{opt\_in}}) \equiv \neg A(B_{\mathrm{opt\_out}})`
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

