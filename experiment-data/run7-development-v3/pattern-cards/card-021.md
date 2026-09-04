# High Demand [urgency]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E3, E4, E5, E6.

## 1. 1. Metric Fabrication
Mechanism summary: To identify the decoupling of interface claims from reality, we define$U_{\mathrm{true}}(i, t)$as the actual count of unique users interacting with item$i$in the backend and$U_{\mathrm{displayed}}(i, t)$as the value rendered on the frontend.

FORMULA: U_{\mathrm{displayed}}(i, t) = R(a, b) \quad \text{given} \quad U_{\mathrm{displayed}}(i, t) \gg U_{\mathrm{true}}(i, t)

## 2. 2. Visual Dynamics of Social-Proof Badges
Mechanism summary: To establish a visual baseline for High Demand, the algorithm inspects demand-signaling badges (“X people are viewing this,” “Y purchased in the last hour”) for visual embellishment.

FORMULA: \exists n \in N_{\mathrm{demand}} : \mathrm{IsAnimated}(n) = \mathrm{True} \quad \land \quad \Delta t_{\mathrm{update}}(n) < \tau_{\mathrm{animate}}

## 3. 3. Semantic Verifiability of Social-Proof Quantifiers
Mechanism summary: To establish a semantic baseline for High Demand, the algorithm evaluates whether demand-asserting statements (“X people are viewing,” “Y bought this”) contain verifiable temporal or geographic qualifiers.

FORMULA: \exists q \in \mathbb{Z}^+ \subset T(N_{\mathrm{demand}}) \quad \land \quad \neg\exists \text{Qualifier}_{\mathrm{temporal/geographic}} \in T(N_{\mathrm{demand}})

