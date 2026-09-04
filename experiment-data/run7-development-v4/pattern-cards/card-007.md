# Intermediate Currency [sneaking]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E5, E6.

## 1. 1. Interception of the Fiat Checkout Flow
Mechanism summary: To model this coercive redirection, we define$V_{\mathrm{product}}$as the current interface state displaying a purchasable digital item, and$E_{\mathrm{purchase}}$as its primary transaction trigger (e.g., a “Buy” button).

FORMULA: \mathrm{target}(E_{\mathrm{purchase}}) = V_{\mathrm{exchange}} \quad \land \quad \mathrm{target}(E_{\mathrm{purchase}}) \neq V_{\mathrm{checkout}}

## 2. 2. Visual Obscuration of Real-Currency Equivalence
Mechanism summary: To establish a visual baseline for Intermediate Currency, the algorithm identifies virtual-currency price labels$N_{\mathrm{virtual}}$(e.g., “500 Gems”) and searches for their real-currency conversion equivalents$N_{\mathrm{real}}$within the same viewport.

FORMULA: N_{\mathrm{real}} = \emptyset \quad \lor \quad \frac{\mathrm{fontSize}(N_{\mathrm{real}})}{S_{\mathrm{base}}} < 0.5

## 3. 3. Lexical Tokenization mapped to Forced Exchange
Mechanism summary: To verify that the abstraction is structurally enforced rather than merely cosmetic, we establish$C_{\mathrm{virtual}}$as a localized, non-standard token system and$T_{\mathrm{price}}(n)$as the extracted price text of the item located on state$V_{\mathrm{product}}$.

FORMULA: T_{\mathrm{price}}(n) \in C_{\mathrm{virtual}} \quad \land \quad \text{TransactionStatus}(n) \implies \text{Executed}(E_{\mathrm{exchange}})

