# Cuteness [misdirection]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one pattern-specific object/context and one mechanism anchor must be directly observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Structural Conditional Injection of Affective Assets

Original formula (verbatim): `I_{\mathrm{affective}} \cap \mathrm{DOM}(s_{\mathrm{onboard}}) = \emptyset \quad \land \quad I_{\mathrm{affective}} \subset \mathrm{DOM}(s_{\mathrm{cancel}})`
Operational reading: **Affective assets appear in cancellation but not onboarding DOM**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- The onboarding and cancellation states are identified and aligned.
- The affective asset is absent from onboarding DOM and present in cancellation DOM.

### Mark UNKNOWN when
- The relevant states or DOM asset identity cannot be matched.

### Direct counterevidence
- The asset is present in both states or absent from both.

### Do not infer
- Do not infer conditional injection from different screenshots without matching DOM state IDs.

## Condition 2: 2. Context-Dependent Image Injection

Original formula (verbatim): `\begin{gathered} I_{\mathrm{affective}} \notin I(s_{\mathrm{onboard}}) \quad \land \quad I_{\mathrm{affective}} \in I(s_{\mathrm{cancel}}) \\ \land \quad \left[\left( \frac{A(i)}{A_{\mathrm{viewport}}} > \tau_{\mathrm{prominence}} \right) \lor \left( \mathrm{CR}(i, L_{\mathrm{bg}}) > 7.0 \right)\right] \quad \forall i \in I_{\mathrm{affective}} \end{gathered}`
Operational reading: **Affective image appears only in the cancellation context**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- The onboarding and cancellation image sets are identified and aligned.
- The affective image is absent from onboarding and present in cancellation.
- The image identity is matched across the two states.

### Mark UNKNOWN when
- Image identity or state alignment is uncertain.

### Direct counterevidence
- The image is not context-dependent under the stated comparison.

### Do not infer
- A general mascot image is not a context-dependent injection.

## Condition 3: 3. Semantic Pairing of Guilt

Original formula (verbatim): `\mathrm{Affect}(N_{\mathrm{text}}) > \tau_{\mathrm{guilt}} \quad \land \quad d_{\mathrm{spatial}}(N_{\mathrm{text}}, i) < \delta_{\mathrm{proximity}}`
Operational reading: **Guilt-inducing text is spatially paired with an affective image**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- Affect score exceeds the threshold for the relevant text.
- The affective text and image are spatially within the stated proximity.

### Mark UNKNOWN when
- Affect score or spatial relationship is not available.

### Direct counterevidence
- The text is neutral or not spatially paired with the image.

### Do not infer
- Cute imagery without guilt language is not this condition.

