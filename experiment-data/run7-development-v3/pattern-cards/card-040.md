# Pressured Selling [nagging]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E4, E5, E6.

## 1. 1. Transactional Flow Interruption
Mechanism summary: To formalize this commandeering of user intent, we model the expected linear sequence of user states required to complete a purchase as$S_{\mathrm{checkout}}$.

FORMULA: \mathrm{Click}(B_{\mathrm{proceed}}) \implies \mathrm{Visibility}(M_{\mathrm{upsell}}) = \mathrm{True} \quad \land \quad s_{\mathrm{final}} \notin S_{\mathrm{current}}

## 2. 2. Localized Temporal or Visual Constraints
Mechanism summary: Scarcity and urgency are frequently enforced using adversarial visual stimuli and synthetic temporal constraints.

FORMULA: \Delta t_{\mathrm{offer}} < \tau_{\mathrm{panic\_duration}} \quad \lor \quad (\mathrm{CSS}(M_{\mathrm{upsell}}) \cap V_{\mathrm{animations}} \neq \emptyset)

## 3. 3. High-Arousal Lexical Density
Mechanism summary: To quantify the psychological stress induced by the interface, we extract$W(M)$, representing the set of textual tokens rendered within the newly injected modal$M_{\mathrm{upsell}}$.

FORMULA: \frac{|W(M) \cap D_{\mathrm{pressure}}|}{|W(M)|} > \tau_{\mathrm{arousal}}

