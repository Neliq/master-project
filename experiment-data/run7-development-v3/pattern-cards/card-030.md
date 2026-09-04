# False Hierarchy [misdirection]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E6.

## 1. 1. Structural Element Downgrading
Mechanism summary: Beyond aesthetic manipulation, interfaces frequently deprive user-favorable actions of their fundamental interaction signifiers and affordances.

FORMULA: \mathrm{Tag}(B_{\mathrm{business}}) = \texttt{<button>} \quad \land \quad \mathrm{Tag}(B_{\mathrm{user}}) = \texttt{<a>} \quad \land \quad S_{\mathrm{padding}}(B_{\mathrm{user}}) \approx 0

## 2. 2. Relational Visual Weight Disparity
Mechanism summary: We define$B_{\mathrm{business}}$as the node representing the provider-favorable action, and$B_{\mathrm{user}}$as the opposing user-favorable action.

FORMULA: W(x) = \alpha \cdot A(x) + \beta \cdot C(x) + \gamma \cdot F(x)
GIVEN: \frac{W(B_{\mathrm{business}})}{W(B_{\mathrm{user}})} > \tau_{\mathrm{hierarchy}}

## 3. 3. Strict Semantic Opposition
Mechanism summary: To establish this relational dependency, we evaluate two proximally close interactive DOM nodes,$B_{1}$and$B_{2}$, located within the same container$N_{\mathrm{parent}}$.

FORMULA: \exists \mathrm{Intent}(L(B_{1})) \equiv \neg \mathrm{Intent}(L(B_{2}))

