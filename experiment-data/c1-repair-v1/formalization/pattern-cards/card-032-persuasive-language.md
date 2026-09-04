# Persuasive Language [misdirection]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

This v2 card reviews a provisional evidence-only judgment. Missing formal evidence
does not overturn that judgment. A complete proof may upgrade; direct contradiction
may downgrade.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

## Condition 1: 1. Structural Density of Event Listeners on Coercive Text Nodes

Original formula (verbatim): `\frac{|E(N_{\mathrm{coercive}})|}{|E(N_{\mathrm{neutral}})|} > \tau_{\mathrm{listener\_skew}}`
Operational reading: **Coercive text has greater event-listener density than neutral text**
Polarity: `trigger`

### Required atoms
- Coercive and neutral comparison text nodes are identified.
- Event-listener counts are directly exposed for both nodes.
- The ratio exceeds the stated threshold.

### Mark UNKNOWN when
- Event handlers are not exposed by the DOM/evidence bundle.

### Direct counterevidence
- The ratio does not exceed the threshold.

### Do not infer
- Text tone or clickability alone cannot establish listener-density asymmetry.

## Condition 2: 2. Visual Emphasis Asymmetry on Coercive Text

Original formula (verbatim): `\frac{\mathrm{fontWeight}(N_{\mathrm{coercive}})}{\mathrm{fontWeight}(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}} \quad \lor \quad \frac{A(N_{\mathrm{coercive}})}{A(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}}`
Operational reading: **Coercive text is more visually emphasized than neutral text**
Polarity: `trigger`

### Required atoms
- Coercive and neutral comparison text nodes are identified in the same state.
- Font-weight and/or area measurements are comparable.
- At least one stated emphasis ratio exceeds threshold.

### Mark UNKNOWN when
- The neutral comparator or CSS/area measurement is unavailable.

### Direct counterevidence
- No stated emphasis ratio is exceeded.

### Do not infer
- Negative or urgent wording without a visual comparator is insufficient.

## Condition 3: 3. Truth-Conditional Satisfiability

Original formula (verbatim): `\mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Satisfiable}`
Operational reading: **Satisfiable claims are counterevidence, not a trigger**
Polarity: `counterevidence`

### Required atoms
- The relevant claims are identified and their semantic relation is evaluated.
- The claims are jointly satisfiable under the displayed context.

### Mark UNKNOWN when
- The propositions or their semantic relation are not clear.

### Direct counterevidence
- Claims are mutually inconsistent or unsatisfiable.

### Do not infer
- Satisfiability cannot itself support a deceptive verdict.

