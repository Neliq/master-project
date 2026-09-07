# Price Comparison Prevention [misdirection]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one pattern-specific object/context and one mechanism anchor must be directly observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Fiat Decoupling

Original formula (verbatim): `T_{\mathrm{price}}(n) \neq \emptyset \quad \land \quad F_{\mathrm{convert}}(T_{\mathrm{price}}(n)) = \emptyset`
Operational reading: **A price is shown without an available fiat conversion**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- A nonempty price token is visible in the complete relevant price scope.
- No fiat conversion function/label is present in that same scope.

### Mark UNKNOWN when
- The relevant price scope or conversion affordances are incomplete.

### Direct counterevidence
- A direct fiat conversion is available and visible in the relevant scope.

### Do not infer
- Do not treat an unfamiliar currency symbol as absence of conversion.

## Condition 2: 2. Visual Suppression of Unit-Price Information

Original formula (verbatim): `\frac{\mathrm{fontSize}(N_{\mathrm{unit}})}{\mathrm{fontSize}(N_{\mathrm{headline}})} < \tau_{\mathrm{suppress}} \quad \lor \quad \frac{\mathrm{CR}(N_{\mathrm{unit}}, L_{\mathrm{bg}})}{\mathrm{CR}(N_{\mathrm{headline}}, L_{\mathrm{bg}})} < \tau_{\mathrm{suppress}}`
Operational reading: **Unit price is visually subordinate to the headline price**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- Unit-price and headline-price nodes are identified in the same state.
- The same font-size/contrast measurements, or an explicit direct visual comparison with direction, are available for both nodes.
- The stated suppression relation is met; qualitative direction is acceptable only when both operands and direction are explicit.

### Mark UNKNOWN when
- The unit/headline comparison or its direction is not exposed.

### Direct counterevidence
- Unit-price information meets the stated relative visibility threshold.

### Do not infer
- Do not require invented numeric values when the evidence directly exposes the relative visual direction; do not call the unit price suppressed merely because it is smaller.

## Condition 3: 3. Semantic Omission of Comparison-Relevant Qualifiers

Original formula (verbatim): `Q_{\mathrm{standard}} \cap Q_{\mathrm{rendered}} = \emptyset`
Operational reading: **Comparison-relevant qualifiers are absent from the rendered price**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- The standard qualifier set for this price/product is known from the evidence.
- The rendered qualifier set is complete and comparable.
- Their intersection is empty.

### Mark UNKNOWN when
- The standard qualifier set cannot be established from the evidence.

### Direct counterevidence
- At least one relevant qualifier is rendered.

### Do not infer
- Do not assume a universal standard qualifier set.

