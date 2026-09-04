# Bad Defaults / Preselection [interface-interference]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E4, E5, E6.

## 1. 1. Pre-initialized Activation State
Mechanism summary: To formally define this state manipulation, we monitor the set$C$of all boolean input nodes within the interface (e.g., <input type=\"checkbox\">, <input type=\"radio\">, or custom toggle <div> elements).

FORMULA: \exists c \in C : \mathrm{State}(c, t_0) = \mathrm{True} \quad \land \quad \mathrm{UserEvents}(c, t_0) = \emptyset

## 2. 2. Visual or Structural Obfuscation
Mechanism summary: The efficacy of a bad default is maximized when the user is unaware it exists.

FORMULA: V(c, t_0) = \mathrm{False} \quad \lor \quad d_{\mathrm{spatial}}(c, N_{\mathrm{submit}}) > \tau_{\mathrm{peripheral\_vision}}

## 3. 3. Semantic Intent of the Default Action
Mechanism summary: Because not all defaults are malicious (e.g., defaulting to the cheapest shipping tier is user-favorable), we evaluate$L(c)$, the text label structurally bound to the pre-selected node$c$(often via the HTML for attribute).

FORMULA: \mathrm{Intent}(L(c)) \in \{D_{\mathrm{privacy\_loss}}, D_{\mathrm{financial\_cost}}, D_{\mathrm{marketing\_opt\_in}}\}

