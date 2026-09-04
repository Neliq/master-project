# Addictive Design [attention-manipulation]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E4, E5, E6.

## 1. 1. Infinite Frictionless Continuation
Mechanism summary: To model the elimination of physical boundaries, we define$Y_{\mathrm{scroll}}(t)$as the user's vertical scroll position and$Y_{\mathrm{max}}(t)$as the total renderable height of the document$N_{\mathrm{document}}$.

FORMULA: Y_{\mathrm{max}}(t) - Y_{\mathrm{scroll}}(t) < \tau_{\mathrm{buffer}} \quad \implies \quad E_{\mathrm{append}} = \mathrm{True}
GIVEN: \lim_{t \to \infty} Y_{\mathrm{max}}(t) = \infty

## 2. 2. Eradication of Natural Stopping Cues
Mechanism summary: A fundamental deceptive tactic involves the systematic removal of visual signals that allow for cognitive closure.

FORMULA: \forall e \in E_{\mathrm{stop}} : \mathrm{Visible}(e, t) = \mathrm{False} \quad \lor \quad \frac{A(e)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \quad \lor \quad \mathrm{CR}(e, L_{\mathrm{bg}}) < 3.0
GIVEN: T_{\mathrm{session}} > \tau_{\mathrm{hyper\_engagement}}

## 3. 3. Semantic Reinforcement-Trigger Lexicon Density
Mechanism summary: To establish a semantic baseline for Addictive Design, the algorithm scans the interface for operant-conditioning language patterns—“streak,” “level up,” “claim reward,” “daily bonus,” “spin again.” The feature triggers if reinforcement-schedule lexemes appear at a density exceeding$\tau_{\mathrm{addiction}}$per visible text area, indicating that the interfa

FORMULA: \frac{|\{w \in T : w \in L_{\mathrm{reinforcement}}\}|}{A_{\mathrm{viewport}}} > \tau_{\mathrm{addiction}}

