# Addictive Design [attention-manipulation]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

## Condition 1: 1. Infinite Frictionless Continuation

Original formula (verbatim): `Y_{\mathrm{max}}(t) - Y_{\mathrm{scroll}}(t) < \tau_{\mathrm{buffer}} \quad \implies \quad E_{\mathrm{append}} = \mathrm{True}`
Operational reading: **Near-end scrolling triggers observed content append**
Polarity: `trigger`

### Required atoms
- The viewport is observed near the document end under the stated buffer.
- A fetch/append transition is observed after the near-end state.
- The append is repeated or the evidence otherwise supports continuation beyond the prior end.

### Mark UNKNOWN when
- Only a static near-end screenshot exists without an append transition.

### Direct counterevidence
- A stable document end or stopping boundary is observed.

### Do not infer
- The limit statement is a definition, not proof that the captured interface appended content.

## Condition 2: 2. Eradication of Natural Stopping Cues

Original formula (verbatim): `\forall e \in E_{\mathrm{stop}} : \mathrm{Visible}(e, t) = \mathrm{False} \quad \lor \quad \frac{A(e)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \quad \lor \quad \mathrm{CR}(e, L_{\mathrm{bg}}) < 3.0`
Operational reading: **Stopping cues are absent or below threshold in the inspected state**
Polarity: `trigger`

### Required atoms
- The relevant stopping-cue set is defined for the inspected interface.
- Every relevant cue fails visibility/area/contrast in the same state(s).

### Mark UNKNOWN when
- The complete stopping-cue set or session-duration claim is unavailable.

### Direct counterevidence
- A clear stopping cue is visible at the stated threshold.

### Do not infer
- Long engagement or psychological dependence cannot be inferred from a static screenshot.

## Condition 3: 3. Semantic Reinforcement-Trigger Lexicon Density

Original formula (verbatim): `\frac{|\{w \in T : w \in L_{\mathrm{reinforcement}}\}|}{A_{\mathrm{viewport}}} > \tau_{\mathrm{addiction}}`
Operational reading: **Reinforcement lexemes exceed the stated density in the viewport**
Polarity: `trigger`

### Required atoms
- The relevant viewport text and reinforcement lexicon are available.
- The stated normalized density exceeds threshold.

### Mark UNKNOWN when
- The viewport text or lexicon denominator is incomplete.

### Direct counterevidence
- The density does not exceed the threshold.

### Do not infer
- Lexical density is an observable signal, not proof of addiction or user harm.

