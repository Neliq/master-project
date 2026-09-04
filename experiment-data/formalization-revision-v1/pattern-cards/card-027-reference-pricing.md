# Reference Pricing [misdirection]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

## Condition 1: 1. Mathematical Exaggeration of Discount

Original formula (verbatim): `\Delta_{\mathrm{pct}} = \frac{P_{\mathrm{ref}} - P_{\mathrm{cur}}}{P_{\mathrm{ref}}} \quad \implies \quad \Delta_{\mathrm{pct}} > \tau_{\mathrm{unrealistic}}`
Operational reading: **Strict observable evaluation of the original predicate**
Polarity: `trigger`

### Required atoms
- Every atomic clause in the original formula is identified and evaluated in the stated scope.

### Mark UNKNOWN when
- Any referenced variable, threshold, comparator, transition, or set is not directly available.

### Direct counterevidence
- A directly observed atom contradicts a mandatory requirement.

### Do not infer
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.

## Condition 2: 2. Visual Salience of Reference-Price Strikethrough

Original formula (verbatim): `\mathrm{CR}(N_{\mathrm{ref}}, L_{\mathrm{bg}}) < \tau_{\mathrm{ref\_cr}} \quad \land \quad \frac{\mathrm{fontSize}(N_{\mathrm{current}})}{\mathrm{fontSize}(N_{\mathrm{ref}})} > \tau_{\mathrm{size\_skew}}`
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

## Condition 3: 3. Dual-Pricing Co-occurrence and Anchoring

Original formula (verbatim): `P_{\mathrm{ref}} > P_{\mathrm{cur}} \quad \land \quad \mathrm{CSS}(N_{\mathrm{ref}}) \cap S_{\mathrm{strike}} \neq \emptyset`
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

