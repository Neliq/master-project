# Confirmshaming [misdirection]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

This v2 card reviews a provisional evidence-only judgment. Missing formal evidence
does not overturn that judgment. A complete proof may upgrade; direct contradiction
may downgrade.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

## Condition 1: 1. Structural Asymmetry in Decline-Option Accessibility

Original formula (verbatim): `\mathrm{Tag}(N_{\mathrm{decline}}) \notin \{\texttt{<button>}, \texttt{[role=\"button\"]}\} \quad \land \quad \mathrm{Tag}(N_{\mathrm{accept}}) = \texttt{<button>}`
Operational reading: **Decline is not exposed as an equivalent interactive control**
Polarity: `trigger`

### Required atoms
- Accept and decline nodes are identified in the same state.
- The decline node is not a button/equivalent button role while accept is.

### Mark UNKNOWN when
- The control semantics are not exposed.

### Direct counterevidence
- Both choices expose equivalent interactive semantics.

### Do not infer
- Different HTML tags are insufficient if accessibility semantics are equivalent.

## Condition 2: 2. Visual Hierarchy Subversion

Original formula (verbatim): `\mathrm{Vis}(N_{\mathrm{accept}}) \gg \mathrm{Vis}(N_{\mathrm{decline}}) \quad \land \quad \mathrm{Vis}(N_{\mathrm{decline}}) \to \tau_{\mathrm{minimum\_accessibility}}`
Operational reading: **Decline is visually subordinated below the stated accessibility threshold**
Polarity: `trigger`

### Required atoms
- Accept and decline visual nodes are identified in the same state.
- Their relative visibility is observed and exceeds the stated disparity.
- Decline visibility meets the stated minimum-accessibility failure condition.

### Mark UNKNOWN when
- Relative visibility or the minimum threshold is not measurable.

### Direct counterevidence
- Decline is comparably visible and accessible.

### Do not infer
- A text link is not automatically shaming without the relative comparison.

## Condition 3: 3. Semantic Asymmetry

Original formula (verbatim): `S_{\mathrm{sentiment}}(N_{\mathrm{accept}}) > 0 \quad \land \quad S_{\mathrm{sentiment}}(N_{\mathrm{decline}}) \ll 0`
Operational reading: **Accept language is positive while decline language is negative**
Polarity: `trigger`

### Required atoms
- Accept and decline labels are identified as the opposing choices.
- Their sentiment values meet the stated positive/negative relationship.

### Mark UNKNOWN when
- Choice roles or sentiment cannot be reliably determined.

### Direct counterevidence
- Decline language is neutral/respectful or accept language is not positive under the stated measure.

### Do not infer
- A negative product consequence is not the same as a negative label aimed at the user.

