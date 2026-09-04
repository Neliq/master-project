# Small or Moving Close Button [interface-interference]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E4, E5, E6.

## 1. 1. Structural Event-Listener Commandeering on Dismissal Vectors
Mechanism summary: To establish a structural baseline for Small or Moving Close Button, the algorithm traces the registered event handlers on the identified close-button node$N_{\mathrm{close}}$.

FORMULA: \mathrm{IsIntercepted}(N_{\mathrm{close}}) = \mathrm{True} \quad \lor \quad \Delta t_{\mathrm{rebind}}(N_{\mathrm{close}}) < \tau_{\mathrm{rebind}}

## 2. 2. Microscopic Hitbox
Mechanism summary: To evaluate the physical accessibility of the dismissal vector, we define$N_{\mathrm{close}}$as the DOM node or vision-language model-detected bounding box representing the close action.

FORMULA: A(N_{\mathrm{close}}) < \tau_{\mathrm{wcag\_hitbox}} \quad \lor \quad \frac{A(N_{\mathrm{close}})}{A(M_{\mathrm{parent}})} < \delta_{\mathrm{micro}}

## 3. 3. Semantic Obfuscation of Dismissal Labels
Mechanism summary: To establish a semantic baseline for Small or Moving Close Button, the algorithm examines the aria-label, title attribute, and visible text of dismissal elements.

FORMULA: \mathrm{AccessibleName}(N_{\mathrm{close}}) = \emptyset \quad \lor \quad \mathrm{Intent}(\mathrm{AccessibleName}(N_{\mathrm{close}})) \neq \mathrm{Dismissal}

