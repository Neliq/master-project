# Endorsement And Testimonials [misdirection]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

## Condition 1: 1. Statistical Implausibility

Original formula (verbatim): `\mathrm{Mean}(S(R_{\mathrm{total}})) \approx 5.0 \quad \land \quad \mathrm{Var}(S(R_{\mathrm{total}})) \approx 0 \implies D_{\mathrm{rendered}} \neq D_{\mathrm{organic}}`
Operational reading: **Review distribution is uniform-looking and requires provenance checking**
Polarity: `trigger`

### Required atoms
- The complete displayed review-score distribution is available.
- Mean and variance meet the stated approximate values.
- A separate provenance observation is available before claiming rendered/organic mismatch.

### Mark UNKNOWN when
- Review distribution or provenance cannot be observed.

### Direct counterevidence
- The distribution does not meet the stated values or provenance is directly established as organic.

### Do not infer
- A near-perfect average does not prove fabrication by itself.

## Condition 2: 2. Visual Verifiability of Testimonial Attribution

Original formula (verbatim): `\exists C_{\mathrm{testimonial}} : \neg\exists N_{\mathrm{attribution}} \in \mathrm{Descendants}(C_{\mathrm{testimonial}})`
Operational reading: **A testimonial has no attribution in its complete container DOM**
Polarity: `trigger`

### Required atoms
- A testimonial container is identified and its descendant DOM is completely inspected.
- No attribution node is present in that container.

### Mark UNKNOWN when
- The testimonial container or descendant DOM is incomplete.

### Direct counterevidence
- An attribution node is present.

### Do not infer
- Absence of a visible avatar is not absence of attribution.

## Condition 3: 3. Provenance Obfuscation

Original formula (verbatim): `\mathrm{Similarity}(I_{\mathrm{avatar}}(P_i), I_{\mathrm{stock\_database}}) \approx 1 \quad \lor \quad \mathrm{Similarity}(T_{\mathrm{text}}(r_i), T_{\mathrm{text}}(r_j)) > \tau_{\mathrm{template}}`
Operational reading: **Testimonial avatar or text matches a stock/template source**
Polarity: `trigger`

### Required atoms
- A testimonial instance and comparison source are identified.
- The stated image or text similarity threshold is met.
- The similarity result is treated as provenance evidence, not proof of deception without context.

### Mark UNKNOWN when
- A stock database, comparison corpus, or similarity measure is unavailable.

### Direct counterevidence
- The stated similarity threshold is not met.

### Do not infer
- Generic wording or a common avatar alone does not prove copied provenance.

