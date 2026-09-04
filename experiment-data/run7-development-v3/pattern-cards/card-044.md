# Wrong Language [interface-interference]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E6.

## 1. 1. Asymmetric State Application
Mechanism summary: The most deceptive implementation of this pattern involves maintaining linguistic clarity during user acquisition while introducing barriers during termination.

FORMULA: \mathbb{L}(S_{\mathrm{acquisition}}) = \{L_{\mathrm{session}}\} \quad \land \quad \mathbb{L}(S_{\mathrm{termination}}) \setminus \{L_{\mathrm{session}}\} \neq \emptyset

## 2. 2. Visual-Linguistic Locale Mismatch
Mechanism summary: To establish a visual baseline for Wrong Language, the algorithm compares the dominant language$L_{\mathrm{DOM}}$detected in rendered text nodes (via lang attribute or character-set heuristics) against the user agent's declared locale$L_{\mathrm{browser}}$.

FORMULA: L_{\mathrm{DOM}}(N_{\mathrm{critical}}) \neq L_{\mathrm{browser}}

## 3. 3. Localized Linguistic Discrepancy
Mechanism summary: To identify this structural obfuscation, we define$L_{\mathrm{session}}$as the primary language of the user's browsing session, typically determined by the <html lang=\"...\"> attribute.

FORMULA: \mathrm{Lang}(N_{\mathrm{critical}}) \neq L_{\mathrm{session}} \quad \land \quad \mathrm{Confidence}(\mathrm{Lang}(N_{\mathrm{critical}})) > \tau_{\mathrm{lang\_id}}

