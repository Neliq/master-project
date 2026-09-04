# Bad Defaults / Preselection [interface-interference]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

## Condition 1: 1. Pre-initialized Activation State

Original formula (verbatim): `\exists c \in C : \mathrm{State}(c, t_0) = \mathrm{True} \quad \land \quad \mathrm{UserEvents}(c, t_0) = \emptyset`
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

## Condition 2: 2. Visual or Structural Obfuscation

Original formula (verbatim): `V(c, t_0) = \mathrm{False} \quad \lor \quad d_{\mathrm{spatial}}(c, N_{\mathrm{submit}}) > \tau_{\mathrm{peripheral\_vision}}`
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

## Condition 3: 3. Semantic Intent of the Default Action

Original formula (verbatim): `\mathrm{Intent}(L(c)) \in \{D_{\mathrm{privacy\_loss}}, D_{\mathrm{financial\_cost}}, D_{\mathrm{marketing\_opt\_in}}\}`
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

