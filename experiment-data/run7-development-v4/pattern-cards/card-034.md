# Positive Or Negative Framing [misdirection]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E3, E5, E6.

## 1. 1. Structural Asymmetry of Framed Option Subtrees
Mechanism summary: To establish a structural baseline for Positive or Negative Framing, the algorithm compares the DOM topology of options presented under gain-framed and loss-framed modalities within the same decision container.

FORMULA: \frac{|T_{\mathrm{gain}} \setminus T_{\mathrm{loss}}|}{|T_{\mathrm{gain}} \cup T_{\mathrm{loss}}|} > \tau_{\mathrm{frame\_structure}}

## 2. 2. Visual Weight Asymmetry Between Framing Poles
Mechanism summary: To establish a visual baseline for Positive or Negative Framing, the algorithm identifies paired interface segments presenting the same information under gain-framed ($F_{\mathrm{gain}}$) and loss-framed ($F_{\mathrm{loss}}$) modalities.

FORMULA: \max\left(\frac{W(F_{\mathrm{gain}})}{W(F_{\mathrm{loss}})}, \frac{W(F_{\mathrm{loss}})}{W(F_{\mathrm{gain}})}\right) > \tau_{\mathrm{frame\_asymmetry}}

## 3. 3. Identification of Mutually Exclusive Vectors
Mechanism summary: To mathematically evaluate the decision context, we isolate$M_{\mathrm{decision}}$, a bounded DOM container (such as a modal or consent form) demanding a user choice.

FORMULA: A(B_{\mathrm{opt\_in}}) \equiv \neg A(B_{\mathrm{opt\_out}})

