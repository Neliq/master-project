# Sneak Into Basket [sneaking]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one pattern-specific object/context and one mechanism anchor must be directly observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Unprompted State Mutation

Original formula (verbatim): `(I_{\mathrm{cart}} \setminus I_{\mathrm{explicit}} \neq \emptyset) \quad \land \quad \nexists e \in E_{\mathrm{user}} \implies \mathrm{Add}(y)`
Operational reading: **An item appears in the cart without a matching user event**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- The item is present in the cart/final checkout state.
- The item is absent from the set of explicitly selected items.
- The aligned event trace shows no user event that adds or selects that item.

### Mark UNKNOWN when
- The cart state or user-event trace is incomplete.

### Direct counterevidence
- A matching explicit add/select event is observed for the item.

### Do not infer
- The conclusion Add(y) is not evidence; prove the set difference and missing event directly.

## Condition 2: 2. Visual Indistinguishability of Surcharged Items

Original formula (verbatim): `\min_{v_u \in V_{\mathrm{user}}} \|v_{\mathrm{injected}} - v_u\|_2 < \tau_{\mathrm{camouflage}}`
Operational reading: **An identified injected item visually resembles legitimate cart items**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- An injected/surcharged item has already been established by the relevant cart/event evidence.
- At least one legitimate comparison item is identified in the same state.
- The visual distance is below the stated camouflage threshold under the same feature representation.

### Mark UNKNOWN when
- No legitimate comparator or measurable visual representation is available.

### Direct counterevidence
- The injected item is visually distinguished or the threshold is not met.

### Do not infer
- Similarity alone cannot establish injection or user impact.

## Condition 3: 3. Semantic Obscuration of Injected Line Items

Original formula (verbatim): `\mathrm{Entailment}(T(N_{\mathrm{injected}}), \text{``optional add-on''}) = \mathrm{True} \quad \land \quad \mathrm{UserConsented}(N_{\mathrm{injected}}) = \mathrm{False}`
Operational reading: **An unconsented injected item is semantically presented as optional**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- The line item is established as injected by the cart/event evidence.
- The item description entails optional add-on status.
- No explicit user consent event for that item is observed.

### Mark UNKNOWN when
- Consent history or item identity is unavailable.

### Direct counterevidence
- An explicit user opt-in for the item is observed.

### Do not infer
- An optional label does not prove lack of consent; keep those atoms separate.

