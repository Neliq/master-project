# Bundling [sneaking]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one pattern-specific object/context and one mechanism anchor must be directly observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Inseparable Transactional Nodes

Original formula (verbatim): `E_{\mathrm{purchase}}(I_{\mathrm{primary}}) \implies \{I_{\mathrm{primary}}, I_{\mathrm{supp}}\} \subseteq C_{\mathrm{state}} \quad \land \quad \nexists e : e(I_{\mathrm{primary}}) \implies C_{\mathrm{state}} = \{I_{\mathrm{primary}}\}`
Operational reading: **Primary purchase necessarily includes a supplementary item**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: Review a provisional evidence-only judgment. A complete proof may upgrade; direct counterevidence or a contradicted core context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment.

### Required atoms
- The primary purchase event is observed from the relevant starting state.
- The resulting checkout state contains both primary and supplementary items.
- No primary-only purchase event/path is observed in the inspected flow.

### Mark UNKNOWN when
- The resulting cart or alternative path is not observable.

### Direct counterevidence
- A primary-only purchase path is directly available.

### Do not infer
- Do not infer inseparability from a bundle label without a transition or complete path check.

## Condition 2: 2. Visual Obscuration of Individual Component Pricing

Original formula (verbatim): `\frac{\sum_{n \in N_{\mathrm{components}}} A(n)}{A(C_{\mathrm{bundle}})} < \tau_{\mathrm{breakdown}}`
Operational reading: **Component prices occupy less than the stated share of the bundle presentation**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: Review a provisional evidence-only judgment. A complete proof may upgrade; direct counterevidence or a contradicted core context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment.

### Required atoms
- The bundle container and all relevant component-price nodes are identified in the same state.
- The component-price area and bundle area use the same coordinate/viewport basis.
- The stated area ratio is below the threshold.

### Mark UNKNOWN when
- Component inventory or comparable area measurements are incomplete.

### Direct counterevidence
- Component prices are visibly and proportionally presented above the threshold.

### Do not infer
- Small text alone is not concealment without the defined bundle comparison.

## Condition 3: 3. Semantic Suppression of Individual Item Descriptions

Original formula (verbatim): `\frac{H(T_{\mathrm{bundled}})}{H(T_{\mathrm{standalone}})} < \tau_{\mathrm{description}}`
Operational reading: **Bundled descriptions are less informative than comparable standalone descriptions**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: Review a provisional evidence-only judgment. A complete proof may upgrade; direct counterevidence or a contradicted core context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment.

### Required atoms
- Bundled and standalone descriptions for equivalent items are identified.
- The same entropy/description representation is available for both sets.
- The ratio is below the stated threshold.

### Mark UNKNOWN when
- No equivalent standalone comparator or entropy measurement is available.

### Direct counterevidence
- Bundled descriptions are comparably informative under the stated representation.

### Do not infer
- Do not invent a standalone comparator from another product category.

