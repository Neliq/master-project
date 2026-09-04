# Immortal Accounts [obstruction]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

## Condition 1: 1. Asymmetrical Navigational Depth

Original formula (verbatim): `\frac{N(x_{\mathrm{delete}})}{N(x_{\mathrm{create}})} > \delta`
Operational reading: **Measured deletion path is longer than creation path**
Polarity: `trigger`

### Required atoms
- The creation and deletion actions are identified from the same starting state.
- The shortest interaction path for both actions is observed or directly countable.
- The stated deletion/creation ratio exceeds the formula threshold.

### Mark UNKNOWN when
- A path, action, or threshold is not exposed by the evidence.

### Direct counterevidence
- The measured deletion path is not longer than the creation path.

### Do not infer
- Do not infer hidden deletion steps from the absence of a settings page.

## Condition 2: 2. Visual Accessibility of Offboarding Vectors

Original formula (verbatim): `\frac{A(N_{\mathrm{delete}})}{A(N_{\mathrm{create}})} < \tau_{\mathrm{exit\_visibility}}`
Operational reading: **Deletion affordance is visually subordinate to creation affordance**
Polarity: `trigger`

### Required atoms
- A deletion/offboarding affordance and a creation affordance are both identified in the same state.
- Their comparable visual areas are observed or measured.
- The ratio is below the stated threshold, using the same viewport and element-selection rule.

### Mark UNKNOWN when
- One comparison affordance or its visual measurement is unavailable.

### Direct counterevidence
- The exit affordance has equal or greater comparable prominence.

### Do not infer
- A small control is not deceptive without the named within-interface comparison.

## Condition 3: 3. Absolute Absence of Deletion Vectors

Original formula (verbatim): `K_{\mathrm{del}} \cap T_{\mathrm{DOM}} = \emptyset`
Operational reading: **No deletion vector in the complete inspected account scope**
Polarity: `trigger`

### Required atoms
- The inspected DOM scope covers the account settings/profile pages relevant to offboarding.
- The deletion-keyword set and equivalent labelled controls are absent from that complete scope.

### Mark UNKNOWN when
- The evidence does not establish complete account-scope coverage.

### Direct counterevidence
- A deletion, deactivation, close-account, or equivalent vector is present in the inspected scope.

### Do not infer
- Do not convert a missing state or missing page into absolute absence.

