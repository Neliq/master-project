# Games For Other Purposes [engagement-exploitation]

This card is an application-oriented presentation of the unchanged ontology.
It does not add labels, counterexamples, thresholds, or definitions.

## Card-level rule

Evaluate each condition independently. A condition is TRUE only when all
required atoms are directly supported. It is FALSE only with direct
counterevidence. Otherwise it is UNKNOWN. A pattern needs one complete
TRUE trigger condition; a counterevidence condition cannot create a trigger.

Domain/context gate: At least one game-like mechanic and one non-game task must be directly observed in the same interface scope. If either context is absent, mark this card NO_MATCH rather than UNKNOWN.

## Condition 1: 1. Game Layer Coupled to a Non-Game Task

Original formula (verbatim): `\begin{aligned} &\mathrm{GameLayer}(G_{\mathrm{task}}, I_{\mathrm{task}}) = \mathrm{True} \quad \land \quad \mathrm{Purpose}(I_{\mathrm{task}}) \notin \mathcal{P}_{\mathrm{entertainment}} \\ &\quad \land \quad \exists a_{\mathrm{task}} \in \mathcal{A}(I_{\mathrm{task}}) : \mathrm{Governs}(G_{\mathrm{task}},a_{\mathrm{task}}) = \mathrm{True} \\ &\quad \land \quad \mathrm{Progress}(a_{\mathrm{task}}) > 0 \end{aligned}`
Operational reading: **A game-like layer governs progression in a task outside an entertainment-game context.**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as the target-condition-absent label without a declared mapping.

### Required atoms
- Points, levels, quests, lives, badges, or another game-like progression mechanism is present.
- The surrounding task purpose is outside the declared entertainment-game purpose set.
- The game layer governs at least one visible non-game task action.
- That action produces an observable change in game progress.

### Mark UNKNOWN when
- The task purpose, game layer, or progression dependency is not directly observable.

### Direct counterevidence
- No game-like layer is present, or it does not affect the non-game task.

### Do not infer
- Do not classify every serious game, educational game, or voluntary reward system as deceptive.

## Condition 2: 2. Visual Dominance of Repurposed Game Mechanics

Original formula (verbatim): `A(N_{\mathrm{game}}) > 0 \quad \land \quad A_{\mathrm{viewport}} > 0 \quad \land \quad \frac{A(N_{\mathrm{game}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{game\_salience}} \quad \land \quad W(N_{\mathrm{game}}) > \tau_{\mathrm{task\_weight}} \, W(N_{\mathrm{task}})`
Operational reading: **The repurposed game layer is visually dominant over the ordinary task controls.**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as the target-condition-absent label without a declared mapping.

### Required atoms
- The game layer and ordinary task controls are identified in the same viewport.
- Their comparable area and visual-weight measurements are available.
- Both visual inequalities are evaluated in the declared scope.

### Mark UNKNOWN when
- One of the visual regions, measurements, or thresholds is unavailable.

### Direct counterevidence
- The game layer does not exceed either declared visual threshold.

### Do not infer
- Do not infer distraction, attention capture, or user preference from visual dominance alone.

## Condition 3: 3. Reward Framing of Non-Game Compliance

Original formula (verbatim): `\mathrm{Frame}(T_{\mathrm{task}}) \in L_{\mathrm{game\_reward}} \quad \land \quad \mathrm{Access}(I_{\mathrm{task}} \mid R_{\mathrm{game}}) = \mathrm{True} \quad \land \quad \mathrm{Access}(I_{\mathrm{task}} \mid \neg R_{\mathrm{game}}) = \mathrm{False}`
Operational reading: **Non-game compliance is framed as game advancement and access depends on the associated reward state.**
Polarity: `trigger`
Comparison policy: Use the original formula's explicit threshold or equality; do not invent values.
Review policy: TRUE requires a complete observed proof; FALSE requires a false atom or direct counterevidence; UNKNOWN is retained when a required atom, threshold, scope, or observation is unavailable. Do not recode UNKNOWN as the target-condition-absent label without a declared mapping.

### Required atoms
- The task copy contains a declared game-reward or progression term.
- The associated reward state is identified.
- Access, completion, or continued utility depends on that reward state.

### Mark UNKNOWN when
- The semantic frame, reward state, or access dependency is unavailable.

### Direct counterevidence
- The task is described neutrally and remains fully available without the game reward.

### Do not infer
- Do not infer coercion or user harm merely because a non-game interface uses game vocabulary.

