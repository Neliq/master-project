# Pre-Delivered Content [sneaking]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one pattern-specific object/context and one mechanism anchor must be directly observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Unconsented Local Storage Consumption

Original formula (verbatim): `\mathrm{Present}(C_{\mathrm{premium}},S_{\mathrm{local}}) = \mathrm{True} \quad \land \quad E_{\mathrm{consent}} = \emptyset \quad \land \quad \mathrm{Size}(C_{\mathrm{premium}}) > \tau_{\mathrm{storage}}`
Operational reading: **Premium content is locally present without consent**
Polarity: `trigger`
Comparison policy: A direct within-interface comparison may satisfy the qualitative relation when both operands and the direction are explicitly observed; no numeric threshold may be invented.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- The premium content is established as present in local storage.
- No explicit consent/request to install that content is observed.
- The content size is materially greater than zero.

### Mark UNKNOWN when
- Local storage presence, consent history, or content size is not exposed.

### Direct counterevidence
- The content was explicitly requested or is not locally present.

### Do not infer
- A locked UI tile does not prove downloaded local content.

## Condition 2: 2. Visual Density of Locked-Content Badges

Original formula (verbatim): `\frac{|\{n \in N : \mathrm{IsLocked}(n)\}|}{|\{n \in N : \mathrm{IsAccessible}(n)\}|} > \tau_{\mathrm{locked\_ratio}}`
Operational reading: **Locked-content nodes dominate accessible nodes**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- Locked and accessible content nodes are countable in the same inspected scope.
- The accessible-node denominator is nonzero.
- The stated locked/accessibility ratio exceeds the threshold.

### Mark UNKNOWN when
- The inspected content inventory or denominator is incomplete/zero.

### Direct counterevidence
- The ratio does not exceed the threshold.

### Do not infer
- The presence of locked badges alone is not a density calculation.

## Condition 3: 3. Semantic Framing of Local Assets as Purchase Opportunities

Original formula (verbatim): `\mathrm{Frame}(T_{\mathrm{asset}}) = \mathrm{Purchaseable} \quad \land \quad \mathrm{IsLocal}(A_{\mathrm{asset}}) = \mathrm{True}`
Operational reading: **Locally present assets are framed as purchasable**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as BENIGN without a declared mapping.

### Required atoms
- The asset is established as locally present.
- The asset text frames the asset as purchasable/unlockable/downloadable.

### Mark UNKNOWN when
- Local presence or asset framing is not directly observable.

### Direct counterevidence
- The asset is remote/not present locally or is described as already included.

### Do not infer
- A purchase button for a future asset does not establish local presence.

