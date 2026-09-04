# Friend Spam [sneaking]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E5.

## 1. 1. Feedforward Intent vs. Payload Execution
Mechanism summary: To identify this deceptive shift in intent, we define$N_{\mathrm{prompt}}$as the text node requesting OAuth access or native contact permissions.

FORMULA: \mathrm{Intent}_{\mathrm{NLP}}(N_{\mathrm{prompt}}) \in D_{\mathrm{read\_only}} \quad \land \quad E_{\mathrm{backend\_action}}(T_{\mathrm{access}}) \implies \mathrm{SendMessages()}

## 2. 2. Absence of Granular Selection
Mechanism summary: The most common implementation of Friend Spam involves bypassing the curation process to maximize message reach.

FORMULA: |S_{\mathrm{selected}}| = 0 \quad \land \quad |M_{\mathrm{dispatched}}| \approx |C_{\mathrm{network}}| \quad \implies \quad \mathrm{Unauthorized \: Broadcast}

## 3. 3. Sender Identity Spoofing
Mechanism summary: To quantify the deceptive appropriation of identity, we isolate$I_{\mathrm{user}}$as the user's personal identity vectors (e.g., name or profile picture) and$I_{\mathrm{corp}}$as the actual corporate entity.

FORMULA: \mathrm{SenderAlias}(m_{\mathrm{outbound}}) = I_{\mathrm{user}} \quad \land \quad \mathrm{Author}(m_{\mathrm{outbound}}) = I_{\mathrm{corp}}

