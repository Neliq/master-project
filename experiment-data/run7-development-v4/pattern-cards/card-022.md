# Low Stock [urgency]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E4, E5, E6.

## 1. 1. Inventory Fabrication
Mechanism summary: To identify the decoupling of interface claims from inventory reality, we define$I_{\mathrm{true}}(x)$as the actual quantity of item$x$in the backend database and$I_{\mathrm{displayed}}(x)$as the value rendered on the frontend.

FORMULA: I_{\mathrm{displayed}}(x) \le \tau_{\mathrm{scarcity}} \quad \text{given} \quad I_{\mathrm{displayed}}(x) \ll I_{\mathrm{true}}(x)

## 2. 2. Visual Alarm Salience of Scarcity Indicators
Mechanism summary: To establish a visual baseline for Low Stock, the algorithm examines stock-level messages for chromatic urgency coding.

FORMULA: \mathrm{Hue}(N_{\mathrm{stock}}) \in [0^\circ, 30^\circ] \quad \land \quad \Delta\mathrm{Stock}_{\mathrm{actual}} = 0

## 3. 3. Semantic Verifiability of Stock-Level Quantifiers
Mechanism summary: To establish a semantic baseline for Low Stock, the algorithm inspects scarcity claims (“Only X left,” “X in stock”) for semantic consistency over time.

FORMULA: \exists t_1, t_2 : |t_2 - t_1| < 60\text{s} \quad \land \quad Q_{\mathrm{stock}}(t_1) \neq Q_{\mathrm{stock}}(t_2) \quad \land \quad \neg\mathrm{HasTransaction}(t_1, t_2)

