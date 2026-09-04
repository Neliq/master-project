# Friend Spam [sneaking]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one pattern-specific object/context and one mechanism anchor must be directly observed. If the core context is contradicted, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Feedforward Intent vs. Payload Execution

Original formula (verbatim): `\mathrm{Intent}_{\mathrm{NLP}}(N_{\mathrm{prompt}}) \in D_{\mathrm{read\_only}} \quad \land \quad E_{\mathrm{backend\_action}}(T_{\mathrm{access}}) \implies \mathrm{SendMessages()}`
Operational reading: **Read-only contact intent leads to observed outbound messaging**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: Review a provisional evidence-only judgment. A complete proof may upgrade; direct counterevidence or a contradicted core context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment.

### Required atoms
- The prompt's intended action is read-only matching/searching.
- An outbound message/broadcast action is directly observed after the access event.
- The transition from access to outbound action is evidenced in the aligned state/event record.

### Mark UNKNOWN when
- Backend execution or the access-to-message transition is not observable.

### Direct counterevidence
- Only read-only matching occurs and no outbound message action is observed.

### Do not infer
- Permission request wording does not prove backend sending.

## Condition 2: 2. Absence of Granular Selection

Original formula (verbatim): `|S_{\mathrm{selected}}| = 0 \quad \land \quad |M_{\mathrm{dispatched}}| \approx |C_{\mathrm{network}}| \quad \implies \quad \mathrm{Unauthorized \: Broadcast}`
Operational reading: **Messages are sent to the contact set without granular selection**
Polarity: `trigger`
Comparison policy: A direct within-interface comparison may satisfy the qualitative relation when both operands and the direction are explicitly observed; no numeric threshold may be invented.
Review policy: Review a provisional evidence-only judgment. A complete proof may upgrade; direct counterevidence or a contradicted core context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment.

### Required atoms
- The selection state shows zero explicitly selected contacts.
- The dispatched-message set is observed and approximately covers the extracted contact set.
- The dispatch occurs without an affirmative granular-selection event.

### Mark UNKNOWN when
- The extracted contact set or dispatched-message set is not exposed.

### Direct counterevidence
- The user selects recipients or the dispatch set is limited to selected recipients.

### Do not infer
- Do not infer a broadcast from a contact-import prompt alone.

## Condition 3: 3. Sender Identity Spoofing

Original formula (verbatim): `\mathrm{SenderAlias}(m_{\mathrm{outbound}}) = I_{\mathrm{user}} \quad \land \quad \mathrm{Author}(m_{\mathrm{outbound}}) = I_{\mathrm{corp}}`
Operational reading: **Corporate outbound message uses the user's identity as sender alias**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: Review a provisional evidence-only judgment. A complete proof may upgrade; direct counterevidence or a contradicted core context may downgrade; missing secondary measurements alone may not overwrite the provisional binary judgment.

### Required atoms
- The outbound message's sender alias matches the user's identity vector.
- The message author is identified as the corporate entity.

### Mark UNKNOWN when
- Sender alias or actual author is not observable.

### Direct counterevidence
- The sender alias accurately identifies the corporate sender.

### Do not infer
- A user's name in a message body is not the sender alias.

