# Pay To Avoid [forced-action]

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

## Condition 1: 1. Artificial State Degradation

Original formula (verbatim): `U_{\mathrm{default}} = U_{\mathrm{system}} - D_{\mathrm{artificial}} \quad \land \quad U_{\mathrm{default}} \ll U_{\mathrm{system}}`
Operational reading: **The default state is materially degraded by an artificial penalty**
Polarity: `trigger`

### Required atoms
- Default and system/reference utility states are identified for the same feature.
- The artificial degradation term is observed or explicitly represented.
- The stated utility inequality is met.

### Mark UNKNOWN when
- Utility reference, degradation cause, or comparable states are unavailable.

### Direct counterevidence
- The default state is not materially degraded or the feature is inherently unavailable.

### Do not infer
- A paid upgrade is not automatically pay-to-avoid without an artificial default penalty.

## Condition 2: 2. Visual Occupancy of the Pain-Point Element

Original formula (verbatim): `\frac{A(N_{\mathrm{pain}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{pain}}`
Operational reading: **Pain-point element occupies more than the stated viewport share**
Polarity: `trigger`

### Required atoms
- The pain-point element is identified in the same viewport as its denominator.
- Its area ratio exceeds the stated threshold.

### Mark UNKNOWN when
- Element bounds or viewport denominator is unavailable.

### Direct counterevidence
- The area ratio does not exceed threshold.

### Do not infer
- Large size alone is not deception without the pattern's artificial-degradation context.

## Condition 3: 3. Pain-Point Amplification

Original formula (verbatim): `\frac{d}{dt} \lambda_{\mathrm{friction}}(t) > 0 \quad \implies \quad P(N_{\mathrm{prompt}} \mid \lambda_{\mathrm{friction}}) \approx 1`
Operational reading: **Observed friction increases and is followed by a payment prompt**
Polarity: `trigger`

### Required atoms
- At least two aligned states expose a measurable increase in friction.
- The payment prompt appears after that increase in the observed path.

### Mark UNKNOWN when
- Friction change, temporal order, or prompt transition is not observable.

### Direct counterevidence
- No increase precedes the prompt or the prompt is unrelated to the feature.

### Do not infer
- The probability conclusion is not observable evidence; use the event sequence instead.

