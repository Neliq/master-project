# Forced Grace Period [obstruction]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

## Condition 1: 1. Temporal Discrepancy Extraction

Original formula (verbatim): `T_{\mathrm{execute}} - T_{\mathrm{request}} \geq \Delta t_{\mathrm{min}}`
Operational reading: **Strict observable evaluation of the original predicate**
Polarity: `trigger`

### Required atoms
- Every atomic clause in the original formula is identified and evaluated in the stated scope.

### Mark UNKNOWN when
- Any referenced variable, threshold, comparator, transition, or set is not directly available.

### Direct counterevidence
- A directly observed atom contradicts a mandatory requirement.

### Do not infer
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.

## Condition 2: 2. Visual Conspicuity of Cancellation Affordance

Original formula (verbatim): `\frac{S(N_{\mathrm{cancel}})}{S(N_{\mathrm{confirm}})} < \delta_{\mathrm{salience}}`
Operational reading: **Strict observable evaluation of the original predicate**
Polarity: `trigger`

### Required atoms
- Every atomic clause in the original formula is identified and evaluated in the stated scope.

### Mark UNKNOWN when
- Any referenced variable, threshold, comparator, transition, or set is not directly available.

### Direct counterevidence
- A directly observed atom contradicts a mandatory requirement.

### Do not infer
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.

## Condition 3: 3. Semantic Proximity of Reversal

Original formula (verbatim): `\min_{k \in K_{\mathrm{revert}}, e \in E_{\mathrm{time}}} d(k, e) < \tau_{\mathrm{words}}`
Operational reading: **Strict observable evaluation of the original predicate**
Polarity: `trigger`

### Required atoms
- Every atomic clause in the original formula is identified and evaluated in the stated scope.

### Mark UNKNOWN when
- Any referenced variable, threshold, comparator, transition, or set is not directly available.

### Direct counterevidence
- A directly observed atom contradicts a mandatory requirement.

### Do not infer
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.

