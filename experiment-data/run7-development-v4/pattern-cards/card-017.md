# Address Book Leeching [sneaking]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E6.

## 1. 1. Utility-Permission Decoupling
Mechanism summary: To identify the coercive nature of the data request, we define$U_{\mathrm{core}}$as the primary, advertised utility of the application (e.g., a local music player or utility tool) and$P_{\mathrm{contacts}}$as the operating system-level permission to read the address book.

FORMULA: \mathrm{State}(U_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad P_{\mathrm{contacts}} = \mathrm{False} \quad \land \quad \mathrm{Dep}(U_{\mathrm{core}}, P_{\mathrm{contacts}}) = \emptyset

## 2. 2. Visual Prominence of the Invite-All Affordance
Mechanism summary: To establish a visual baseline for Address Book Leeching, the algorithm identifies a mass-invitation button$N_{\mathrm{invite\_all}}$(e.g., “Invite All Contacts”) and a skip or deselect affordance$N_{\mathrm{skip}}$.

FORMULA: \frac{A(N_{\mathrm{invite\_all}})}{A(N_{\mathrm{skip}})} > \tau_{\mathrm{invite\_dominance}}

## 3. 3. Semantic Framing of Contact-Sharing Consent
Mechanism summary: To establish a semantic baseline for Address Book Leeching, the algorithm inspects the text accompanying the contact-import permission prompt.

FORMULA: \mathrm{Frame}(T_{\mathrm{prompt}}) = \mathrm{Benefactive} \quad \land \quad \mathrm{Subject}(T_{\mathrm{prompt}}) = \mathrm{ThirdParty}

