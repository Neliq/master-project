# Trick Questions [interface-interference]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E3, E5, E6.

## 1. 1. Structural Label-Input Semantic Mismatch
Mechanism summary: To establish a structural baseline for Trick Questions, the algorithm examines <input>, <select>, and <button> elements for a mismatch between their structural aria-label or associated <label> text and the NLP-inferred action semantics.

FORMULA: \mathrm{SemanticDist}(L_{\mathrm{aria}}(N), L_{\mathrm{visual}}(N)) > \tau_{\mathrm{label\_mismatch}}

## 2. 2. Affordance-Consequence Mismatch
Mechanism summary: To capture the manipulation of standard UI heuristics, we define$\mathrm{State}(c) = \mathrm{True}$as the physical affordance of checking a box, which psychologically aligns with acceptance, inclusion, or addition.

FORMULA: (\mathrm{State}(c) = \mathrm{True}) \implies (\mathrm{Intent}(L(c)) \in D_{\mathrm{deny}})

## 3. 3. Syntactic Obfuscation via Multiple Negations
Mechanism summary: To quantify linguistic deception, we extract the text label$L(c)$associated with a boolean input node$c$(e.g., a checkbox) and generate its syntactic dependency tree$T_{\mathrm{parse}}(L(c))$using an NLP parser.

FORMULA: N_{\mathrm{neg}}(L(c)) \geq 2 \quad \implies \quad \mathrm{Linguistic \: Obfuscation}

