# Nagging [engagement-exploitation]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one repeated prompt/request and one directly observed recurrence or interruption mechanism must be present. If the assigned evidence exposes no recurring request, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Repeated Prompt Injection

Original formula (verbatim): `\begin{aligned} &\exists p_1,p_2 \in P_{\mathrm{prompt}} : A(p_1) = A(p_2) \\ &\quad \land \quad t(p_2) > t(p_1) \quad \land \quad \Delta t(p_1,p_2) \leq \tau_{\mathrm{repeat}} \\ &\quad \land \quad \mathrm{Dismissed}(p_1) = \mathrm{True} \quad \land \quad \mathrm{Injected}(p_2) = \mathrm{True} \end{aligned}`
Operational reading: **The same request reappears after dismissal within the declared observation window.**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as the target-condition-absent label without a declared mapping.

### Required atoms
- The prompts have equal normalized action signatures, not merely similar wording.
- The first prompt is dismissed or deferred.
- An equivalent prompt is newly inserted or visibly re-presented within the declared recurrence window.

### Mark UNKNOWN when
- Dismissal, recurrence timing, or prompt equivalence is not directly observed.

### Direct counterevidence
- The prompt does not recur, or it recurs only after a new user request or materially changed context.

### Do not infer
- Do not infer annoyance, intent, or user harm from recurrence alone.

## Condition 2: 2. Persistent Interruption Salience

Original formula (verbatim): `\frac{A(N_{\mathrm{nag}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{nag\_area}} \quad \lor \quad z(N_{\mathrm{nag}}) \geq \tau_{\mathrm{nag\_layer}}`
Operational reading: **The recurring request is rendered as a visually salient interruption.**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as the target-condition-absent label without a declared mapping.

### Required atoms
- The recurring prompt and viewport are identified in the same rendered state.
- The area or stacking-layer measurement is directly available.
- At least one disjunct in the source formula is directly supported.

### Mark UNKNOWN when
- The prompt's rendered area, stacking layer, or viewport is unavailable.

### Direct counterevidence
- The recurring request is not visually salient under either declared disjunct.

### Do not infer
- Do not infer that visual salience was noticed or changed user behavior.

## Condition 3: 3. Imperative Repetition Without New Context

Original formula (verbatim): `\begin{aligned} &\exists p_1,p_2 \in P_{\mathrm{prompt}} : A(p_1) = A(p_2) \quad \land \quad |W(N_{\mathrm{nag}})| > 0 \\ &\quad \land \quad \frac{|W(N_{\mathrm{nag}}) \cap L_{\mathrm{imperative}}|}{|W(N_{\mathrm{nag}})|} > \tau_{\mathrm{imperative}} \\ &\quad \land \quad \mathrm{ContextChange}(p_1,p_2) = \mathrm{False} \end{aligned}`
Operational reading: **Imperative wording repeats without materially new task context.**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as the target-condition-absent label without a declared mapping.

### Required atoms
- The prompt instances have equal normalized action signatures.
- The prompt token multiset is non-empty and the imperative lexicon is declared.
- The imperative-word density is computed over the declared prompt text.
- The two equivalent prompt states are comparable and show no material context change.

### Mark UNKNOWN when
- Prompt text, lexicon scope, or context comparison is unavailable.

### Direct counterevidence
- The repeated prompt adds material information or does not exceed the declared imperative-density threshold.

### Do not infer
- Do not infer coercion, intent, or a psychological response from imperative wording alone.

