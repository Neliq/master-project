# Granting and Interaction [forced-action]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E4, E5, E6.

## 1. 1. Interaction Gating
Mechanism summary: To identify the coercive fusion of utility and data access, we define$I_{\mathrm{core}}$as the primary set of interactions required to utilize the application's core functionality.

FORMULA: \mathrm{State}(I_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad (P_{\mathrm{requested}} = \mathrm{False} \quad \land \quad \mathrm{Dep}(I_{\mathrm{core}}, P_{\mathrm{requested}}) = \emptyset)

## 2. 2. Asynchronous Overlay Misdirection
Mechanism summary: A particularly coercive tactic involves intercepting user momentum to manufacture \"accidental\" consent.

FORMULA: \mathrm{Pos}(M_{\mathrm{system\_prompt}}, t) \approx \mathrm{Pos}(B_{\mathrm{benign}}, t) \quad \text{as} \quad t \to t_{\mathrm{interaction}}

## 3. 3. Semantic Scope Creep in Permission Requests
Mechanism summary: To establish a semantic baseline for Granting and Interaction, the algorithm compares the initial permission-request text against the actual permissions enumerated in the subsequent browser API call or manifest.

FORMULA: |\mathrm{Perms}_{\mathrm{actual}} \setminus \mathrm{Perms}_{\mathrm{disclosed}}| > 0

