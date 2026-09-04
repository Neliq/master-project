# Confirmshaming [misdirection]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E4, E6.

## 1. 1. Structural Asymmetry in Decline-Option Accessibility
Mechanism summary: To establish a structural baseline for Confirmshaming, the algorithm compares the DOM properties of the acceptance node$N_{\mathrm{accept}}$against the decline node$N_{\mathrm{decline}}$.

FORMULA: \mathrm{Tag}(N_{\mathrm{decline}}) \notin \{\texttt{<button>}, \texttt{[role=\"button\"]}\} \quad \land \quad \mathrm{Tag}(N_{\mathrm{accept}}) = \texttt{<button>}

## 2. 2. Visual Hierarchy Subversion
Mechanism summary: The efficacy of confirmshaming is often compounded by structural invisibility.

FORMULA: \mathrm{Vis}(N_{\mathrm{accept}}) \gg \mathrm{Vis}(N_{\mathrm{decline}}) \quad \land \quad \mathrm{Vis}(N_{\mathrm{decline}}) \to \tau_{\mathrm{minimum\_accessibility}}

## 3. 3. Semantic Asymmetry
Mechanism summary: To identify the emotional weaponization of UI text, we define$N_{\mathrm{accept}}$as the affirmative node and$N_{\mathrm{decline}}$as the user's dismissal node.

FORMULA: S_{\mathrm{sentiment}}(N_{\mathrm{accept}}) > 0 \quad \land \quad S_{\mathrm{sentiment}}(N_{\mathrm{decline}}) \ll 0

