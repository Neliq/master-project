# Formalization audit v1

This audit targets the frozen Run 6 ontology at `run6-multimodal/ontology.md`.
It does not change the 62-pattern taxonomy, 186 conditions, labels, or Run 6
results. It identifies logical and observability hazards that can make a language
model overfire, underfire, or apply the wrong condition.

- Patterns: 62
- Conditions: 186
- FORMULA lines: 186
- Flagged FORMULA/GIVEN records: 168

## Non-negotiable operational semantics

1. A formula is a decision predicate, not a material implication or causal law.
   If a formula contains `A ⇒ B`, the evaluator must observe both A and B in
   the required scope; an unobserved antecedent or consequent is UNKNOWN, not true.
2. A pattern condition is TRUE only when every mandatory atomic requirement in
   that condition is TRUE. A condition is FALSE only with direct counterevidence.
   Otherwise it is UNKNOWN.
3. A pattern is DECEPTIVE when at least one complete alternative condition is
   TRUE. A single similarity, keyword, or visual cue never completes a condition.
4. Variables named `true`, `actual`, `backend`, `organic`, future probability,
   user focus, or user utility are not inferable from a static evidence bundle
   unless the bundle contains a direct observed proxy. Mark them UNKNOWN.
5. A formula's consequence (`Satisfiable`, `Contradiction`, `WTP`, synthetic
   urgency, or systemic incentive) is not itself evidence. Record observable
   antecedent facts and evaluate the stated conclusion only when operationally
   measurable.
6. Absolute color, WCAG, hitbox, or visual thresholds are not labels. Compare
   controls within the same interface and use the exact stated threshold only
   when DOM/CSS evidence exposes it.

## Ranked rewrite priorities

### P1 — Convert implications into explicit observed conjunctions

Unsafe pattern: `A ⇒ B` is often read as “if A is absent, the condition is
satisfied” or as permission to infer B. Rewrite each such condition as an
explicit proof obligation: `Observed(A) AND Observed(B)`, plus any required
transition/event link. Missing atoms remain UNKNOWN.

Affected formulas include Dead End #1; Intermediate Currency #3; Sneak Into
Basket #1; Drip Pricing #1; Bundling #1; Reduced Friction #1; Forced Continuity
#1; Privacy Zuckering #1; Friend Spam #1/#2; Automatic Accept Third Party Term
#1; FOMO #1; Activity Messages #2; Countdown Timer #1/#2; Limited Time Message
#1/#3; Reference Pricing #1; all three Conflicting Information conditions;
Persuasive Language #3; Psychological Tricks #1/#2/#3; Pressured Selling #1;
Trick Questions #2/#3; and several forced-action conditions.

### P2 — Repair tautological or directionally wrong predicates

- Countdown Timer #1: `T_expire = t_load + duration` is true for an ordinary
  countdown. It must require observed reset/rebinding across independent loads
  or a contradiction with a concrete external deadline; otherwise UNKNOWN.
- FOMO #1: equal initial values across two states are not enough; require a
  reset after a new session/reload and distinguish elapsed monotonic time.
- Persuasive Language #3: satisfiability is counterevidence to contradiction,
  not a deceptive trigger. It belongs in the disqualifier/counterevidence field.
- Reference Pricing #1: arithmetic equality merely defines the discount; only
  the threshold comparison can be a signal, and a large discount alone does
  not establish a deceptive reference price.
- Conflicting Information #1/#3: `P ∧ Q ⇒ contradiction/unsatisfiable` must
  require an explicit semantic contradiction, not any two propositions.

### P3 — Separate observable mechanism, impact, and unobservable claims

A condition should expose three fields: `mechanism` (what the interface does),
`user-facing consequence` (what is visible in the trace), and `unobservable
claim` (backend truth, future charge, actual recipients, or psychological
effect). Only the first two can support a TRUE status from this corpus. The
third is UNKNOWN unless directly instrumented.

High-risk examples: High Demand #1, Activity Messages #1/#2, Automatic Accept
Third Party Term #2, Pre-Delivered Content #1, Endorsement #1/#3, Psychological
Tricks #1/#2/#3, Forced Continuity #1, and Addictive Design session-limit terms.

### P4 — Make visual signals relational and state-scoped

Do not treat hue, saturation, absolute contrast, or a fixed hitbox as a label.
For a visual predicate, require the named comparison controls in the same
state, record their state ID, and use native colors only as ordinary interface
evidence. A visual signal cannot substitute for the mechanism or consequence
required by another atom.

## Required card representation for the next pilot

Each condition card must contain: pattern; condition; original formula;
observable atoms; required state/transition scope; unobservable atoms; direct
counterevidence; applicable escape clauses; and a three-valued evaluation
rule. The evaluator must output an atom ledger, not a free-form conclusion.

## Flag: conclusion-not-evidence

- line 21 — **Dead End / 1. Topological Sink in the Navigational Graph**: `\forall e \in E_{\mathrm{out}}(v_{\mathrm{current}}), \text{target}(e) \in V_{\mathrm{forced}} \implies \text{No Escape Path}`
- line 311 — **Countdown Timer / 1. Stateless Expiration**: `T_{\mathrm{expire}} = t_{\mathrm{load}} + \Delta t_{\mathrm{countdown}} \quad \implies \quad \text{Urgency is functionally synthetic}`
- line 315 — **Countdown Timer / 2. Cognitive Compression**: `\Delta t_{\mathrm{timer}} < \tau_{\mathrm{deliberation}} \quad \implies \quad \mathrm{Probability}(\mathrm{Rational\_Evaluation}) \to 0`
- line 367 — **Conflicting Information / 2. Semantic-Visual Mismatch**: `\mathrm{Intent}(L(B)) \cap \mathrm{Affordance}(C(B)) = \emptyset \quad \implies \quad \mathrm{Contradiction}`
- line 371 — **Conflicting Information / 3. Mutually Exclusive Factual Claims**: `\exists t_1, t_2 \in N_{\mathrm{container}} : \mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Unsatisfiable}`
- line 424 — **Persuasive Language / 3. Truth-Conditional Satisfiability**: `\mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Satisfiable}`
- line 516 — **Psychological Tricks / 3. Reference Point Obfuscation**: `P_{\mathrm{anchor}} \gg P_{\mathrm{actual}} \quad \implies \quad \mathrm{WTP}(U_{\mathrm{anchored}}) > \mathrm{WTP}(U_{\mathrm{baseline}})`
- line 750 — **Encouraging Anti-Social Behavior / 3. Algorithmic Amplification of Outrage**: `V_{\mathrm{visibility}}(M) \propto P_{\mathrm{polarity}}(M) \quad \implies \quad \text{Systemic Incentive for Hostility}`

## Flag: material-implication

- line 21 — **Dead End / 1. Topological Sink in the Navigational Graph**: `\forall e \in E_{\mathrm{out}}(v_{\mathrm{current}}), \text{target}(e) \in V_{\mathrm{forced}} \implies \text{No Escape Path}`
- line 94 — **Intermediate Currency / 3. Lexical Tokenization mapped to Forced Exchange**: `T_{\mathrm{price}}(n) \in C_{\mathrm{virtual}} \quad \land \quad \text{TransactionStatus}(n) \implies \text{Executed}(E_{\mathrm{exchange}})`
- line 112 — **Sneak Into Basket / 1. Unprompted State Mutation**: `(I_{\mathrm{cart}} \setminus I_{\mathrm{explicit}} \neq \emptyset) \quad \land \quad \nexists e \in E_{\mathrm{user}} \implies \mathrm{Add}(y)`
- line 125 — **Drip Pricing, Hidden Costs, or Partitioned Pricing / 1. Sequential Price Inflation**: `P(s_n) > P(s_0) + I_{\mathrm{added}} \quad \implies \quad P_{\mathrm{dripped}} > 0`
- line 138 — **Bundling / 1. Inseparable Transactional Nodes**: `E_{\mathrm{purchase}}(I_{\mathrm{primary}}) \implies \{I_{\mathrm{primary}}, I_{\mathrm{supp}}\} \subseteq C_{\mathrm{state}} \quad \land \quad \nexists e : e(I_{\mathrm{primary}}) \implies C_{\mathrm{state}} = \{I_{\mathrm{primary}}\}`
- line 164 — **Reduced Friction / 1. Absence of Confirmation Interstitial**: `E_{\mathrm{click}}(S_{\mathrm{intent}}) \implies S_{\mathrm{commit}} \quad \land \quad S_{\mathrm{confirm}} \notin \mathrm{Path}(S_{\mathrm{intent}} \to S_{\mathrm{commit}})`
- line 177 — **Forced Continuity / 1. Time-Triggered Silent State Mutation**: `t \geq t_{\mathrm{expiry}} \quad \implies \quad S_{\mathrm{account}}(t) \to S_{\mathrm{premium}} \quad \land \quad E_{\mathrm{charge}}(T_{\mathrm{payment}}) = \mathrm{True}`
- line 192 — **Privacy Zuckering / 1. Bundled Consent and Granularity Violation**: `T_{\mathrm{accept}} = \mathrm{True} \quad \implies \quad (\mathrm{Access}(D_{\mathrm{essential}}) = \mathrm{True} \quad \land \quad \mathrm{Access}(D_{\mathrm{monetization}}) = \mathrm{True})`
- line 193 — **Privacy Zuckering / 1. Bundled Consent and Granularity Violation**: `\nexists t_{\mathrm{alt}} : (t_{\mathrm{alt}} \implies \mathrm{Access}(D_{\mathrm{essential}}) \land \neg \mathrm{Access}(D_{\mathrm{monetization}}))`
- line 206 — **Friend Spam / 1. Feedforward Intent vs. Payload Execution**: `\mathrm{Intent}_{\mathrm{NLP}}(N_{\mathrm{prompt}}) \in D_{\mathrm{read\_only}} \quad \land \quad E_{\mathrm{backend\_action}}(T_{\mathrm{access}}) \implies \mathrm{SendMessages()}`
- line 210 — **Friend Spam / 2. Absence of Granular Selection**: `|S_{\mathrm{selected}}| = 0 \quad \land \quad |M_{\mathrm{dispatched}}| \approx |C_{\mathrm{network}}| \quad \implies \quad \mathrm{Unauthorized \: Broadcast}`
- line 232 — **Automatic Accept Third Party Term / 1. Bundled Transitive Consent**: `\mathrm{Accept}(T_{\mathrm{primary}}) \implies \forall t_i \in T_{\mathrm{third\_party}} : \mathrm{Accept}(t_i) = \mathrm{True}`
- line 259 — **Fear Of Missing Out (FOMO) / 1. Artificial Temporal Scarcity**: `T(s_0) \approx \Delta t \quad \land \quad T(s_1) \approx \Delta t \quad \implies \quad \mathrm{Fabricated \: Urgency}`
- line 302 — **Activity Messages / 2. Cognitive Interruption**: `\mathrm{Salience}(N_{\mathrm{activity}}) \to \mathrm{Max} \quad \land \quad \lambda_{\mathrm{interrupt}} > \tau_{\mathrm{cognitive\_load}} \implies S_{\mathrm{focus}} \to \mathrm{Disrupted}`
- line 311 — **Countdown Timer / 1. Stateless Expiration**: `T_{\mathrm{expire}} = t_{\mathrm{load}} + \Delta t_{\mathrm{countdown}} \quad \implies \quad \text{Urgency is functionally synthetic}`
- line 315 — **Countdown Timer / 2. Cognitive Compression**: `\Delta t_{\mathrm{timer}} < \tau_{\mathrm{deliberation}} \quad \implies \quad \mathrm{Probability}(\mathrm{Rational\_Evaluation}) \to 0`
- line 324 — **Limited Time Message / 1. Perpetual Extension**: `t_{\mathrm{current}} \ge T_{\mathrm{end}}(i) \implies T_{\mathrm{end}}(i+1) = t_{\mathrm{current}} + \Delta t_{\mathrm{extension}}`
- line 332 — **Limited Time Message / 3. Ambiguous Temporal Bounding**: `\mathrm{Specificity}(M_{\mathrm{urgency}}) \approx 0 \quad \land \quad T_{\mathrm{end}} \notin \mathrm{DOM} \implies \mathrm{Urgency_{perceived}} \to \mathrm{Max}`
- line 350 — **Reference Pricing / 1. Mathematical Exaggeration of Discount**: `\Delta_{\mathrm{pct}} = \frac{P_{\mathrm{ref}} - P_{\mathrm{cur}}}{P_{\mathrm{ref}}} \quad \implies \quad \Delta_{\mathrm{pct}} > \tau_{\mathrm{unrealistic}}`
- line 363 — **Conflicting Information / 1. Structural Proximity of Contradictory Factual Nodes**: `\exists t_1, t_2 \in \mathrm{Descendants}(C) : \mathrm{Prop}(t_1) \land \mathrm{Prop}(t_2) \implies \bot \quad \land \quad d_{\mathrm{DOM}}(t_1, t_2) < \tau_{\mathrm{proximity}}`
- line 367 — **Conflicting Information / 2. Semantic-Visual Mismatch**: `\mathrm{Intent}(L(B)) \cap \mathrm{Affordance}(C(B)) = \emptyset \quad \implies \quad \mathrm{Contradiction}`
- line 371 — **Conflicting Information / 3. Mutually Exclusive Factual Claims**: `\exists t_1, t_2 \in N_{\mathrm{container}} : \mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Unsatisfiable}`
- line 424 — **Persuasive Language / 3. Truth-Conditional Satisfiability**: `\mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Satisfiable}`
- line 482 — **Endorsement And Testimonials / 1. Statistical Implausibility**: `\mathrm{Mean}(S(R_{\mathrm{total}})) \approx 5.0 \quad \land \quad \mathrm{Var}(S(R_{\mathrm{total}})) \approx 0 \implies D_{\mathrm{rendered}} \neq D_{\mathrm{organic}}`
- line 508 — **Psychological Tricks / 1. Asymmetric Dominance**: `V(O_{\mathrm{target}}) \gg V(O_{\mathrm{decoy}}) \quad \land \quad \mathrm{Cost}(O_{\mathrm{target}}) \approx \mathrm{Cost}(O_{\mathrm{decoy}}) \implies P_{\mathrm{select}}(O_{\mathrm{target}}) \to \mathrm{Max}`
- line 512 — **Psychological Tricks / 2. Cognitive Overload**: `|C_{\mathrm{matrix}}| \gg \tau_{\mathrm{fatigue}} \quad \implies \quad \lim_{t \to \infty} P_{\mathrm{select}}(D_{\mathrm{favorable}}) = 1`
- line 516 — **Psychological Tricks / 3. Reference Point Obfuscation**: `P_{\mathrm{anchor}} \gg P_{\mathrm{actual}} \quad \implies \quad \mathrm{WTP}(U_{\mathrm{anchored}}) > \mathrm{WTP}(U_{\mathrm{baseline}})`
- line 521 — **Pressured Selling / 1. Transactional Flow Interruption**: `\mathrm{Click}(B_{\mathrm{proceed}}) \implies \mathrm{Visibility}(M_{\mathrm{upsell}}) = \mathrm{True} \quad \land \quad s_{\mathrm{final}} \notin S_{\mathrm{current}}`
- line 564 — **Trick Questions / 2. Affordance-Consequence Mismatch**: `(\mathrm{State}(c) = \mathrm{True}) \implies (\mathrm{Intent}(L(c)) \in D_{\mathrm{deny}})`
- line 568 — **Trick Questions / 3. Syntactic Obfuscation via Multiple Negations**: `N_{\mathrm{neg}}(L(c)) \geq 2 \quad \implies \quad \mathrm{Linguistic \: Obfuscation}`
- line 690 — **Watch Ads To Unlock Features Or Get Rewards / 1. Attention as Transactional Currency**: `\int_{0}^{\Delta t_{\mathrm{ad}}} E_{\mathrm{playback}}(t) \, dt = \Delta t_{\mathrm{ad}} \implies \mathrm{State}(R_{\mathrm{target}}) \to \mathrm{Unlocked}`
- line 711 — **Pay To Avoid / 3. Pain-Point Amplification**: `\frac{d}{dt} \lambda_{\mathrm{friction}}(t) > 0 \quad \implies \quad P(N_{\mathrm{prompt}} \mid \lambda_{\mathrm{friction}}) \approx 1`
- line 729 — **Parasocial Pressure / 1. Manufactured Livelihood Dependency**: `T_{\mathrm{fiat}} = 0 \implies \mathrm{State}(I_{\mathrm{creator}}) \to \mathrm{Failure} \quad \text{asserted within} \quad M_{\mathrm{pitch}}`
- line 737 — **Parasocial Pressure / 3. Emotional Asymmetry**: `E_{\mathrm{user}} = \mathrm{Refusal} \implies \frac{d}{dt} V_{\mathrm{emotion}}(A_{\mathrm{mascot}}) \to -1`
- line 742 — **Encouraging Anti-Social Behavior / 1. Reward-Coupled Social Externality**: `A_{\mathrm{antisocial}} \implies (V_{\mathrm{reward}} > 0 \quad \land \quad E_{\mathrm{externality}} \gg 0)`
- line 750 — **Encouraging Anti-Social Behavior / 3. Algorithmic Amplification of Outrage**: `V_{\mathrm{visibility}}(M) \propto P_{\mathrm{polarity}}(M) \quad \implies \quad \text{Systemic Incentive for Hostility}`
- line 755 — **Addictive Design / 1. Infinite Frictionless Continuation**: `Y_{\mathrm{max}}(t) - Y_{\mathrm{scroll}}(t) < \tau_{\mathrm{buffer}} \quad \implies \quad E_{\mathrm{append}} = \mathrm{True}`
- line 770 — **Infinite Scrolling / 1. Autonomous Content Injection**: `Y_{\mathrm{document\_end}} - Y_{\mathrm{viewport}} \leq \tau_{\mathrm{trigger}} \quad \implies \quad E_{\mathrm{fetch}}() = \mathrm{True}`
- line 774 — **Infinite Scrolling / 2. The Unreachable Footer**: `v_{\mathrm{scroll}} > 0 \quad \implies \quad \frac{d}{dt} \mathrm{Pos}_{y}(N_{\mathrm{footer}}, t) \geq v_{\mathrm{scroll}}`
- line 784 — **Pull To Refresh (Variable-Reward Trap) / 1. Kinesthetic Resistance and Action Commitment**: `\Delta Y_{\mathrm{touch}}(t) \geq \tau_{\mathrm{commit}} \quad \land \quad R_{\mathrm{elastic}} > 0 \quad \implies \quad E_{\mathrm{refresh}}() = \mathrm{True}`

## Flag: palette-or-absolute-visual

- line 237 — **Automatic Accept Third Party Term / 2. Opaque Entity Resolution**: `E_{\mathrm{declared}} \subset E_{\mathrm{actual}} \quad \land \quad |E_{\mathrm{actual}}| \gg |E_{\mathrm{declared}}| \approx 0`
- line 289 — **Low Stock / 2. Visual Alarm Salience of Scarcity Indicators**: `\mathrm{Hue}(N_{\mathrm{stock}}) \in [0^\circ, 30^\circ] \quad \land \quad \Delta\mathrm{Stock}_{\mathrm{actual}} = 0`
- line 328 — **Limited Time Message / 2. Visual Salience of Temporal-Urgency Chromatics**: `\mathrm{Hue}(C_{\mathrm{offer}}) \in [0^\circ, 45^\circ] \quad \land \quad \mathrm{Match}(T(C_{\mathrm{offer}}), \mathrm{Pattern}_{\mathrm{temporal}}) = \mathrm{True}`
- line 345 — **Price Comparison Prevention / 3. Semantic Omission of Comparison-Relevant Qualifiers**: `Q_{\mathrm{standard}} \cap Q_{\mathrm{rendered}} = \emptyset`
- line 482 — **Endorsement And Testimonials / 1. Statistical Implausibility**: `\mathrm{Mean}(S(R_{\mathrm{total}})) \approx 5.0 \quad \land \quad \mathrm{Var}(S(R_{\mathrm{total}})) \approx 0 \implies D_{\mathrm{rendered}} \neq D_{\mathrm{organic}}`
- line 516 — **Psychological Tricks / 3. Reference Point Obfuscation**: `P_{\mathrm{anchor}} \gg P_{\mathrm{actual}} \quad \implies \quad \mathrm{WTP}(U_{\mathrm{anchored}}) > \mathrm{WTP}(U_{\mathrm{baseline}})`
- line 655 — **Pay-To-Play / 2. Visual Dominance of Payment-Unlock Overlays**: `\frac{A(O_{\mathrm{unlock}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{occlusion}} \quad \lor \quad A(N_{\mathrm{dismiss}}) < 44 \times 44`

## Flag: qualitative-or-undefined-threshold

- line 12 — **Immortal Accounts / 2. Visual Accessibility of Offboarding Vectors**: `\frac{A(N_{\mathrm{delete}})}{A(N_{\mathrm{create}})} < \tau_{\mathrm{exit\_visibility}}`
- line 16 — **Immortal Accounts / 3. Absolute Absence of Deletion Vectors**: `K_{\mathrm{del}} \cap T_{\mathrm{DOM}} = \emptyset`
- line 25 — **Dead End / 2. Visual Absence of Dismissal Vectors**: `C_{\mathrm{dismiss}} = \emptyset \quad \land \quad \text{IsOverlay}(v_{\mathrm{current}}) = \mathrm{True}`
- line 29 — **Dead End / 3. Semantic Coercion Density in Trapped States**: `\frac{|\{\text{Imperative}(w) \lor \text{Urgency}(w) : w \in T(v_{\mathrm{trap}})\}|}{|T(v_{\mathrm{trap}})|} > \tau_{\mathrm{coercion}}`
- line 42 — **Forced Grace Period / 3. Semantic Proximity of Reversal**: `\min_{k \in K_{\mathrm{revert}}, e \in E_{\mathrm{time}}} d(k, e) < \tau_{\mathrm{words}}`
- line 47 — **Privacy Maze / 1. Asymmetrical Path Depth**: `d(v_{\mathrm{start}}, v_{\mathrm{reject\_all}}) > d(v_{\mathrm{start}}, v_{\mathrm{accept\_all}}) \quad \lor \quad d(v_{\mathrm{start}}, v_{\mathrm{reject\_all}}) > \tau_{\mathrm{depth}}`
- line 55 — **Privacy Maze / 3. Semantic Obfuscation of Privacy-Related Terminology**: `\mathrm{FKGL}(T_{\mathrm{privacy}}) > 14 \quad \lor \quad \frac{|\mathrm{Unique}(T_{\mathrm{privacy}})|}{|T_{\mathrm{privacy}}|} > \tau_{\mathrm{obfuscation}}`
- line 60 — **Labyrinthine Navigation / 1. Excessive Navigational Depth**: `d(v_{\mathrm{home}}, v_{\mathrm{target}}) > \tau_{\mathrm{depth}}`
- line 64 — **Labyrinthine Navigation / 2. Visual Nesting Depth of Navigation Elements**: `\max_{n \in N_{\mathrm{nav}}} D_{\mathrm{render}}(n) > \tau_{\mathrm{nesting}}`
- line 68 — **Labyrinthine Navigation / 3. Semantic Obfuscation**: `\exists e_i \in P : \mathrm{Sim}(L(e_i), \mathrm{Topic}(v_{\mathrm{target}})) < \tau_{\mathrm{semantic}}`
- line 77 — **Customisation (Interface Nesting) / 2. Visual Indentation Depth of Privacy Controls**: `\frac{1}{|N_{\mathrm{privacy}}|} \sum_{n \in N_{\mathrm{privacy}}} \mathrm{offsetX}(n) > \tau_{\mathrm{indent}}`
- line 81 — **Customisation (Interface Nesting) / 3. Semantic Obfuscation of Privacy Toggle Labels**: `\frac{|\{w \in L(N_{\mathrm{privacy}}) : w \in D_{\mathrm{jargon}}\}|}{|L(N_{\mathrm{privacy}})|} > \tau_{\mathrm{jargon}}`
- line 90 — **Intermediate Currency / 2. Visual Obscuration of Real-Currency Equivalence**: `N_{\mathrm{real}} = \emptyset \quad \lor \quad \frac{\mathrm{fontSize}(N_{\mathrm{real}})}{S_{\mathrm{base}}} < 0.5`
- line 99 — **Disguised Ad / 1. Cross-Origin Action Masking**: `B_{\mathrm{action}} \neq \emptyset \quad \land \quad D_{\mathrm{target}}(B_{\mathrm{action}}) \neq D_{\mathrm{host}}`
- line 103 — **Disguised Ad / 2. Morphological Similarity**: `\max_{v_i \in V_{\mathrm{native}}} \mathrm{sim}(v_{\mathrm{ad}}, v_i) > \tau_{\mathrm{blend}}`
- line 107 — **Disguised Ad / 3. Semantic Mimicry of Native Action Labels**: `\max_{\ell \in L_{\mathrm{native}}} \mathrm{sim}(L(N_{\mathrm{ad}}), \ell) > \tau_{\mathrm{masquerade}}`
- line 112 — **Sneak Into Basket / 1. Unprompted State Mutation**: `(I_{\mathrm{cart}} \setminus I_{\mathrm{explicit}} \neq \emptyset) \quad \land \quad \nexists e \in E_{\mathrm{user}} \implies \mathrm{Add}(y)`
- line 116 — **Sneak Into Basket / 2. Visual Indistinguishability of Surcharged Items**: `\min_{v_u \in V_{\mathrm{user}}} \|v_{\mathrm{injected}} - v_u\|_2 < \tau_{\mathrm{camouflage}}`
- line 129 — **Drip Pricing, Hidden Costs, or Partitioned Pricing / 2. Visual Disparity of Cost Partitioning**: `\frac{V(N_{\mathrm{base}})}{V(N_{\mathrm{fee}})} > \tau_{\mathrm{prominence}}`
- line 133 — **Drip Pricing, Hidden Costs, or Partitioned Pricing / 3. Semantic Concealment of Mandatory Fee Disclosure**: `T_{\mathrm{initial}} \cap K_{\mathrm{fees}} = \emptyset \quad \land \quad T_{\mathrm{final}} \cap K_{\mathrm{fees}} \neq \emptyset`
- line 142 — **Bundling / 2. Visual Obscuration of Individual Component Pricing**: `\frac{\sum_{n \in N_{\mathrm{components}}} A(n)}{A(C_{\mathrm{bundle}})} < \tau_{\mathrm{breakdown}}`
- line 146 — **Bundling / 3. Semantic Suppression of Individual Item Descriptions**: `\frac{H(T_{\mathrm{bundled}})}{H(T_{\mathrm{standalone}})} < \tau_{\mathrm{description}}`
- line 151 — **Hidden Information / 1. Structural Burial in High-Density Text**: `|W(N_{\mathrm{document}})| > \tau_{\mathrm{fatigue}} \quad \land \quad P(t_{\mathrm{clause}}) = \mathrm{False}`
- line 155 — **Hidden Information / 2. Typographical and Chromatic Camouflage**: `S_{\mathrm{font}}(N_{\mathrm{critical}}) < \tau_{\mathrm{min\_readable}} \quad \lor \quad \mathrm{CR}(N_{\mathrm{critical}}, L_{\mathrm{bg}}) < \tau_{\mathrm{wcag\_min}}`
- line 159 — **Hidden Information / 3. Semantic Concealment of Adverse Terms**: `K_{\mathrm{adverse}} \cap T_{\mathrm{DOM}} \neq \emptyset \quad \land \quad \mathrm{IsConcealed}(N_{\mathrm{adverse}}) = \mathrm{True}`
- line 168 — **Reduced Friction / 2. Visual Proximity of Destructive Actions to Neutral UI**: `\min_{n \in N_{\mathrm{neutral}}} d_{\mathrm{spatial}}(N_{\mathrm{destructive}}, n) < \tau_{\mathrm{safety}}`
- line 182 — **Forced Continuity / 2. Absence of Temporal Feedforward**: `\forall w \in W_{\mathrm{renewal}} : \mathrm{Visible}(w, t) = \mathrm{False} \quad \forall t \in [t_{\mathrm{expiry}} - \tau_{\mathrm{fair\_notice}}, t_{\mathrm{expiry}}]`
- line 183 — **Forced Continuity / 2. Absence of Temporal Feedforward**: `\lor \quad \frac{A(w)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \quad \lor \quad \mathrm{CR}(w, L_{\mathrm{bg}}) < 3.0`
- line 187 — **Forced Continuity / 3. Semantic Asymmetry Between Subscription and Cancellation Language**: `\mathrm{FKGL}(T_{\mathrm{cancel}}) - \mathrm{FKGL}(T_{\mathrm{signup}}) > 2 \quad \lor \quad \mathrm{Guilt}(T_{\mathrm{cancel}}) - \mathrm{Guilt}(T_{\mathrm{signup}}) > \tau_{\mathrm{guilt\_gap}}`
- line 197 — **Privacy Zuckering / 2. Visual Asymmetry Between Privacy-Invasive and Privacy-Preserving Options**: `\frac{W(N_{\mathrm{invasive}})}{W(N_{\mathrm{preserving}})} > \tau_{\mathrm{privacy\_skew}}`
- line 201 — **Privacy Zuckering / 3. Semantic Ambiguity of Third-Party Entities**: `|E_{\mathrm{actual}}| \gg 1 \quad \land \quad \mathrm{Specificity}(N_{\mathrm{disclosure}}) < \tau_{\mathrm{vague}}`
- line 210 — **Friend Spam / 2. Absence of Granular Selection**: `|S_{\mathrm{selected}}| = 0 \quad \land \quad |M_{\mathrm{dispatched}}| \approx |C_{\mathrm{network}}| \quad \implies \quad \mathrm{Unauthorized \: Broadcast}`
- line 219 — **Address Book Leeching / 1. Utility-Permission Decoupling**: `\mathrm{State}(U_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad P_{\mathrm{contacts}} = \mathrm{False} \quad \land \quad \mathrm{Dep}(U_{\mathrm{core}}, P_{\mathrm{contacts}}) = \emptyset`
- line 223 — **Address Book Leeching / 2. Visual Prominence of the Invite-All Affordance**: `\frac{A(N_{\mathrm{invite\_all}})}{A(N_{\mathrm{skip}})} > \tau_{\mathrm{invite\_dominance}}`
- line 237 — **Automatic Accept Third Party Term / 2. Opaque Entity Resolution**: `E_{\mathrm{declared}} \subset E_{\mathrm{actual}} \quad \land \quad |E_{\mathrm{actual}}| \gg |E_{\mathrm{declared}}| \approx 0`
- line 241 — **Automatic Accept Third Party Term / 3. Semantic Concealment of Third-Party Agreement Language**: `T(N_{\mathrm{legal}}) \cap K_{\mathrm{agreement}} \neq \emptyset \quad \land \quad \mathrm{Checked}(N_{\mathrm{legal}}) = \mathrm{True} \quad \land \quad \mathrm{UserToggled}(N_{\mathrm{legal}}) = \mathrm{False}`
- line 246 — **Pre-Delivered Content / 1. Unconsented Local Storage Consumption**: `C_{\mathrm{premium}} \subseteq S_{\mathrm{local}} \quad \text{given} \quad E_{\mathrm{consent}} = \emptyset \quad \land \quad \mathrm{Size}(C_{\mathrm{premium}}) \gg 0`
- line 250 — **Pre-Delivered Content / 2. Visual Density of Locked-Content Badges**: `\frac{|\{n \in N : \mathrm{IsLocked}(n)\}|}{|\{n \in N : \mathrm{IsAccessible}(n)\}|} > \tau_{\mathrm{locked\_ratio}}`
- line 259 — **Fear Of Missing Out (FOMO) / 1. Artificial Temporal Scarcity**: `T(s_0) \approx \Delta t \quad \land \quad T(s_1) \approx \Delta t \quad \implies \quad \mathrm{Fabricated \: Urgency}`
- line 263 — **Fear Of Missing Out (FOMO) / 2. Visual Pulsation Frequency of Urgency Indicators**: `\min_{n \in N_{\mathrm{urgency}}} \Delta t_{\mathrm{refresh}}(n) < \tau_{\mathrm{pulsation}}`
- line 267 — **Fear Of Missing Out (FOMO) / 3. Semantic Density of Scarcity and Urgency Lexemes**: `\frac{|\{w \in T : w \in L_{\mathrm{FOMO}}\}|}{|T|} \times 100 > \tau_{\mathrm{fomo}}`
- line 272 — **High Demand / 1. Metric Fabrication**: `U_{\mathrm{displayed}}(i, t) = R(a, b) \quad \text{given} \quad U_{\mathrm{displayed}}(i, t) \gg U_{\mathrm{true}}(i, t)`
- line 276 — **High Demand / 2. Visual Dynamics of Social-Proof Badges**: `\exists n \in N_{\mathrm{demand}} : \mathrm{IsAnimated}(n) = \mathrm{True} \quad \land \quad \Delta t_{\mathrm{update}}(n) < \tau_{\mathrm{animate}}`
- line 285 — **Low Stock / 1. Inventory Fabrication**: `I_{\mathrm{displayed}}(x) \le \tau_{\mathrm{scarcity}} \quad \text{given} \quad I_{\mathrm{displayed}}(x) \ll I_{\mathrm{true}}(x)`
- line 298 — **Activity Messages / 1. Asynchronous Event Fabrication**: `M_{\mathrm{displayed}}(t) \neq \emptyset \quad \land \quad M_{\mathrm{displayed}}(t) \notin E_{\mathrm{real}}(t)`
- line 302 — **Activity Messages / 2. Cognitive Interruption**: `\mathrm{Salience}(N_{\mathrm{activity}}) \to \mathrm{Max} \quad \land \quad \lambda_{\mathrm{interrupt}} > \tau_{\mathrm{cognitive\_load}} \implies S_{\mathrm{focus}} \to \mathrm{Disrupted}`
- line 306 — **Activity Messages / 3. Semantic Specificity of Activity-Notification Content**: `\mathrm{Specificity}(T_{\mathrm{activity}}) < \tau_{\mathrm{specificity}} \quad \land \quad \neg\exists \text{IdentityRef} \in T_{\mathrm{activity}}`
- line 315 — **Countdown Timer / 2. Cognitive Compression**: `\Delta t_{\mathrm{timer}} < \tau_{\mathrm{deliberation}} \quad \implies \quad \mathrm{Probability}(\mathrm{Rational\_Evaluation}) \to 0`
- line 332 — **Limited Time Message / 3. Ambiguous Temporal Bounding**: `\mathrm{Specificity}(M_{\mathrm{urgency}}) \approx 0 \quad \land \quad T_{\mathrm{end}} \notin \mathrm{DOM} \implies \mathrm{Urgency_{perceived}} \to \mathrm{Max}`
- line 337 — **Price Comparison Prevention / 1. Fiat Decoupling**: `T_{\mathrm{price}}(n) \neq \emptyset \quad \land \quad F_{\mathrm{convert}}(T_{\mathrm{price}}(n)) = \emptyset`
- line 341 — **Price Comparison Prevention / 2. Visual Suppression of Unit-Price Information**: `\frac{\mathrm{fontSize}(N_{\mathrm{unit}})}{\mathrm{fontSize}(N_{\mathrm{headline}})} < \tau_{\mathrm{suppress}} \quad \lor \quad \frac{\mathrm{CR}(N_{\mathrm{unit}}, L_{\mathrm{bg}})}{\mathrm{CR}(N_{\mathrm{headline}}, L_{\mathrm{bg}})} < \tau_{\mathrm{suppress}}`
- line 345 — **Price Comparison Prevention / 3. Semantic Omission of Comparison-Relevant Qualifiers**: `Q_{\mathrm{standard}} \cap Q_{\mathrm{rendered}} = \emptyset`
- line 350 — **Reference Pricing / 1. Mathematical Exaggeration of Discount**: `\Delta_{\mathrm{pct}} = \frac{P_{\mathrm{ref}} - P_{\mathrm{cur}}}{P_{\mathrm{ref}}} \quad \implies \quad \Delta_{\mathrm{pct}} > \tau_{\mathrm{unrealistic}}`
- line 354 — **Reference Pricing / 2. Visual Salience of Reference-Price Strikethrough**: `\mathrm{CR}(N_{\mathrm{ref}}, L_{\mathrm{bg}}) < \tau_{\mathrm{ref\_cr}} \quad \land \quad \frac{\mathrm{fontSize}(N_{\mathrm{current}})}{\mathrm{fontSize}(N_{\mathrm{ref}})} > \tau_{\mathrm{size\_skew}}`
- line 358 — **Reference Pricing / 3. Dual-Pricing Co-occurrence and Anchoring**: `P_{\mathrm{ref}} > P_{\mathrm{cur}} \quad \land \quad \mathrm{CSS}(N_{\mathrm{ref}}) \cap S_{\mathrm{strike}} \neq \emptyset`
- line 363 — **Conflicting Information / 1. Structural Proximity of Contradictory Factual Nodes**: `\exists t_1, t_2 \in \mathrm{Descendants}(C) : \mathrm{Prop}(t_1) \land \mathrm{Prop}(t_2) \implies \bot \quad \land \quad d_{\mathrm{DOM}}(t_1, t_2) < \tau_{\mathrm{proximity}}`
- line 367 — **Conflicting Information / 2. Semantic-Visual Mismatch**: `\mathrm{Intent}(L(B)) \cap \mathrm{Affordance}(C(B)) = \emptyset \quad \implies \quad \mathrm{Contradiction}`
- line 376 — **Information Without Context / 1. Structural Orphaned Nodes**: `d(N_{\mathrm{metric}}, N_{\mathrm{descriptor}}) > \tau_{\mathrm{orphan}}`
- line 380 — **Information Without Context / 2. Visual Prominence Imbalance Between Metric and Baseline**: `\frac{W(N_{\mathrm{metric}})}{W(N_{\mathrm{context}})} > \tau_{\mathrm{context\_imbalance}} \quad \land \quad \mathrm{CR}(N_{\mathrm{metric}}, L_{\mathrm{bg}}) > 7.0`
- line 389 — **False Hierarchy / 1. Structural Element Downgrading**: `\mathrm{Tag}(B_{\mathrm{business}}) = \texttt{<button>} \quad \land \quad \mathrm{Tag}(B_{\mathrm{user}}) = \texttt{<a>} \quad \land \quad S_{\mathrm{padding}}(B_{\mathrm{user}}) \approx 0`
- line 394 — **False Hierarchy / 2. Relational Visual Weight Disparity**: `\frac{W(B_{\mathrm{business}})}{W(B_{\mathrm{user}})} > \tau_{\mathrm{hierarchy}}`
- line 403 — **Visual Prominence / 1. Structural Asymmetry in DOM Subtree Weight**: `\frac{|\mathrm{Desc}(N_{\mathrm{favorable}})|}{\mathrm{median}_{s \in \mathrm{Siblings}(N_{\mathrm{favorable}})} |\mathrm{Desc}(s)|} > \tau_{\mathrm{subtree\_bloat}}`
- line 407 — **Visual Prominence / 2. Absolute Bounding Box Dominance**: `\frac{A(N_{\mathrm{favorable}})}{A(E_{\mathrm{baseline}})} > \tau_{\mathrm{area}}`
- line 411 — **Visual Prominence / 3. Semantic Neutrality of Dominant Action Labels**: `|\mathrm{Sent}(L(N_{\mathrm{favorable}}))| > 0.5 \quad \lor \quad L(N_{\mathrm{favorable}}) \cap D_{\mathrm{coercion}} \neq \emptyset`
- line 416 — **Persuasive Language / 1. Structural Density of Event Listeners on Coercive Text Nodes**: `\frac{|E(N_{\mathrm{coercive}})|}{|E(N_{\mathrm{neutral}})|} > \tau_{\mathrm{listener\_skew}}`
- line 420 — **Persuasive Language / 2. Visual Emphasis Asymmetry on Coercive Text**: `\frac{\mathrm{fontWeight}(N_{\mathrm{coercive}})}{\mathrm{fontWeight}(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}} \quad \lor \quad \frac{A(N_{\mathrm{coercive}})}{A(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}}`
- line 429 — **Cuteness / 1. Structural Conditional Injection of Affective Assets**: `I_{\mathrm{affective}} \cap \mathrm{DOM}(s_{\mathrm{onboard}}) = \emptyset \quad \land \quad I_{\mathrm{affective}} \subset \mathrm{DOM}(s_{\mathrm{cancel}})`
- line 434 — **Cuteness / 2. Context-Dependent Image Injection**: `\land \quad \left( \frac{A(i)}{A_{\mathrm{viewport}}} > \tau_{\mathrm{prominence}} \quad \lor \quad \mathrm{CR}(i, L_{\mathrm{bg}}) > 7.0 \right) \quad \forall i \in I_{\mathrm{affective}}`
- line 438 — **Cuteness / 3. Semantic Pairing of Guilt**: `\mathrm{Affect}(N_{\mathrm{text}}) > \tau_{\mathrm{guilt}} \quad \land \quad d_{\mathrm{spatial}}(N_{\mathrm{text}}, i) < \delta_{\mathrm{proximity}}`
- line 443 — **Positive Or Negative Framing / 1. Structural Asymmetry of Framed Option Subtrees**: `\frac{|T_{\mathrm{gain}} \setminus T_{\mathrm{loss}}|}{|T_{\mathrm{gain}} \cup T_{\mathrm{loss}}|} > \tau_{\mathrm{frame\_structure}}`
- line 447 — **Positive Or Negative Framing / 2. Visual Weight Asymmetry Between Framing Poles**: `\max\left(\frac{W(F_{\mathrm{gain}})}{W(F_{\mathrm{loss}})}, \frac{W(F_{\mathrm{loss}})}{W(F_{\mathrm{gain}})}\right) > \tau_{\mathrm{frame\_asymmetry}}`
- line 456 — **Choice Overload / 1. Excessive Element Quantization**: `|C_{\mathrm{choices}}| > \tau_{\mathrm{overload}}`
- line 460 — **Choice Overload / 2. Visual Density of Interactive Decision Elements**: `\rho = \frac{n_{\mathrm{interactive}}}{A_{\mathrm{viewport}}} > \tau_{\mathrm{density}}`
- line 464 — **Choice Overload / 3. Semantic Similarity Collapse Among Options**: `\frac{1}{|C|(|C|-1)} \sum_{i \neq j} \mathrm{sim}(T_i, T_j) > \tau_{\mathrm{similarity}}`
- line 469 — **Plain Evil (Theoretical Construct) / 1. Dark Pattern Singularity**: `\sum_{i=1}^{n} \mathrm{Active}(D_i, M_{\mathrm{context}}) \ge \tau_{\mathrm{hostility}}`
- line 473 — **Plain Evil (Theoretical Construct) / 2. Visual Hostility Density Index**: `H = \frac{\sum_{i} \mathbb{1}_{\mathrm{hostile}}(N_i) \cdot w_i}{A_{\mathrm{viewport}}} > \tau_{\mathrm{hostility}}`
- line 477 — **Plain Evil (Theoretical Construct) / 3. Semantic Hostility Density Score**: `\|H_{\mathrm{sem}}\|_2 = \sqrt{\rho_{\mathrm{coerce}}^2 + \sigma_{\mathrm{FKGL}}^2 + \sigma_{\mathrm{sent}}^2 + \rho_{\mathrm{connot}}^2} > \tau_{\mathrm{hostile\_sem}}`
- line 482 — **Endorsement And Testimonials / 1. Statistical Implausibility**: `\mathrm{Mean}(S(R_{\mathrm{total}})) \approx 5.0 \quad \land \quad \mathrm{Var}(S(R_{\mathrm{total}})) \approx 0 \implies D_{\mathrm{rendered}} \neq D_{\mathrm{organic}}`
- line 490 — **Endorsement And Testimonials / 3. Provenance Obfuscation**: `\mathrm{Similarity}(I_{\mathrm{avatar}}(P_i), I_{\mathrm{stock\_database}}) \approx 1 \quad \lor \quad \mathrm{Similarity}(T_{\mathrm{text}}(r_i), T_{\mathrm{text}}(r_j)) > \tau_{\mathrm{template}}`
- line 499 — **Confirmshaming / 2. Visual Hierarchy Subversion**: `\mathrm{Vis}(N_{\mathrm{accept}}) \gg \mathrm{Vis}(N_{\mathrm{decline}}) \quad \land \quad \mathrm{Vis}(N_{\mathrm{decline}}) \to \tau_{\mathrm{minimum\_accessibility}}`
- line 508 — **Psychological Tricks / 1. Asymmetric Dominance**: `V(O_{\mathrm{target}}) \gg V(O_{\mathrm{decoy}}) \quad \land \quad \mathrm{Cost}(O_{\mathrm{target}}) \approx \mathrm{Cost}(O_{\mathrm{decoy}}) \implies P_{\mathrm{select}}(O_{\mathrm{target}}) \to \mathrm{Max}`
- line 512 — **Psychological Tricks / 2. Cognitive Overload**: `|C_{\mathrm{matrix}}| \gg \tau_{\mathrm{fatigue}} \quad \implies \quad \lim_{t \to \infty} P_{\mathrm{select}}(D_{\mathrm{favorable}}) = 1`
- line 516 — **Psychological Tricks / 3. Reference Point Obfuscation**: `P_{\mathrm{anchor}} \gg P_{\mathrm{actual}} \quad \implies \quad \mathrm{WTP}(U_{\mathrm{anchored}}) > \mathrm{WTP}(U_{\mathrm{baseline}})`
- line 525 — **Pressured Selling / 2. Localized Temporal or Visual Constraints**: `\Delta t_{\mathrm{offer}} < \tau_{\mathrm{panic\_duration}} \quad \lor \quad (\mathrm{CSS}(M_{\mathrm{upsell}}) \cap V_{\mathrm{animations}} \neq \emptyset)`
- line 529 — **Pressured Selling / 3. High-Arousal Lexical Density**: `\frac{|W(M) \cap D_{\mathrm{pressure}}|}{|W(M)|} > \tau_{\mathrm{arousal}}`
- line 534 — **Small or Moving Close Button / 1. Structural Event-Listener Commandeering on Dismissal Vectors**: `\mathrm{IsIntercepted}(N_{\mathrm{close}}) = \mathrm{True} \quad \lor \quad \Delta t_{\mathrm{rebind}}(N_{\mathrm{close}}) < \tau_{\mathrm{rebind}}`
- line 538 — **Small or Moving Close Button / 2. Microscopic Hitbox**: `A(N_{\mathrm{close}}) < \tau_{\mathrm{wcag\_hitbox}} \quad \lor \quad \frac{A(N_{\mathrm{close}})}{A(M_{\mathrm{parent}})} < \delta_{\mathrm{micro}}`
- line 542 — **Small or Moving Close Button / 3. Semantic Obfuscation of Dismissal Labels**: `\mathrm{AccessibleName}(N_{\mathrm{close}}) = \emptyset \quad \lor \quad \mathrm{Intent}(\mathrm{AccessibleName}(N_{\mathrm{close}})) \neq \mathrm{Dismissal}`
- line 547 — **Bad Defaults / Preselection / 1. Pre-initialized Activation State**: `\exists c \in C : \mathrm{State}(c, t_0) = \mathrm{True} \quad \land \quad \mathrm{UserEvents}(c, t_0) = \emptyset`
- line 551 — **Bad Defaults / Preselection / 2. Visual or Structural Obfuscation**: `V(c, t_0) = \mathrm{False} \quad \lor \quad d_{\mathrm{spatial}}(c, N_{\mathrm{submit}}) > \tau_{\mathrm{peripheral\_vision}}`
- line 560 — **Trick Questions / 1. Structural Label-Input Semantic Mismatch**: `\mathrm{SemanticDist}(L_{\mathrm{aria}}(N), L_{\mathrm{visual}}(N)) > \tau_{\mathrm{label\_mismatch}}`
- line 573 — **Wrong Language / 1. Asymmetric State Application**: `\mathbb{L}(S_{\mathrm{acquisition}}) = \{L_{\mathrm{session}}\} \quad \land \quad \mathbb{L}(S_{\mathrm{termination}}) \setminus \{L_{\mathrm{session}}\} \neq \emptyset`
- line 581 — **Wrong Language / 3. Localized Linguistic Discrepancy**: `\mathrm{Lang}(N_{\mathrm{critical}}) \neq L_{\mathrm{session}} \quad \land \quad \mathrm{Confidence}(\mathrm{Lang}(N_{\mathrm{critical}})) > \tau_{\mathrm{lang\_id}}`
- line 586 — **Complex Language / 1. Structural Nesting Depth of Legal/Technical Text Nodes**: `D_{\mathrm{DOM}}(N_{\mathrm{complex}}) > \tau_{\mathrm{legal\_depth}} \quad \lor \quad \frac{1}{|N_{\mathrm{complex}}|} \sum_{n} |\mathrm{text}(n)| > \tau_{\mathrm{clause\_length}}`
- line 590 — **Complex Language / 2. Visual Density of Legalese Text Blocks**: `\frac{\mathrm{fontSize}(N_{\mathrm{complex}})}{S_{\mathrm{base}}} < \tau_{\mathrm{shrink}} \quad \land \quad \mathrm{FKGL}(N_{\mathrm{complex}}) > 12`
- line 594 — **Complex Language / 3. Exceedance of Baseline Readability Indices**: `\mathrm{FKGL}(N_{\mathrm{text}}) > \tau_{\mathrm{education\_limit}}`
- line 599 — **Feedforward Ambiguity / 1. Structural Ambiguity of Action-Outcome Mapping**: `\exists N \in \mathrm{Interactive} : \mathrm{Distance}(\mathrm{Expect}(L(N)), \mathrm{Resolve}(N)) > \tau_{\mathrm{feedforward}}`
- line 603 — **Feedforward Ambiguity / 2. Iconographic Entropy and Missing Affordances**: `H(\mathrm{CV}_{\mathrm{class}}(N_{\mathrm{icon}})) > \tau_{\mathrm{entropy}} \quad \land \quad T_{\mathrm{hover}} = \emptyset`
- line 607 — **Feedforward Ambiguity / 3. Semantic Divergence of Action and Outcome**: `\mathrm{Sim}(\mathrm{Intent}_{\mathrm{NLP}}(L(n)), \mathrm{Outcome}_{\mathrm{System}}(n)) < \tau_{\mathrm{clarity}} \quad \land \quad \mathrm{Outcome}_{\mathrm{System}}(n) \in D_{\mathrm{critical}}`
- line 616 — **Forced Registration / 2. Visual Degradation of the Guest Checkout Pathway**: `\frac{W(N_{\mathrm{guest}})}{W(N_{\mathrm{register}})} < \tau_{\mathrm{guest\_visibility}}`
- line 620 — **Forced Registration / 3. Semantic Framing of the Guest-Checkout Option**: `\mathrm{Sent}(L(N_{\mathrm{guest}})) < \tau_{\mathrm{guest\_sent}}`
- line 629 — **Social Pyramid / 2. Visual Prominence of Referral-Progress Gamification**: `\frac{A(N_{\mathrm{referral\_progress}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{gamification}}`
- line 633 — **Social Pyramid / 3. Semantic Escalation of Referral-Reward Language**: `\frac{\Delta \mathrm{Intensity}(\mathrm{Reward}_n)}{\Delta \mathrm{Intensity}(\mathrm{Reward}_{n-1})} > \tau_{\mathrm{escalation}}`
- line 638 — **Granting and Interaction / 1. Interaction Gating**: `\mathrm{State}(I_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad (P_{\mathrm{requested}} = \mathrm{False} \quad \land \quad \mathrm{Dep}(I_{\mathrm{core}}, P_{\mathrm{requested}}) = \emptyset)`
- line 642 — **Granting and Interaction / 2. Asynchronous Overlay Misdirection**: `\mathrm{Pos}(M_{\mathrm{system\_prompt}}, t) \approx \mathrm{Pos}(B_{\mathrm{benign}}, t) \quad \text{as} \quad t \to t_{\mathrm{interaction}}`
- line 651 — **Pay-To-Play / 1. Exponential Friction and Paid Bypass**: `E_{\mathrm{free}}(L_i) \propto c^i \quad (c > 1) \quad \land \quad E_{\mathrm{paid}}(L_i) = \mathcal{O}(1)`
- line 655 — **Pay-To-Play / 2. Visual Dominance of Payment-Unlock Overlays**: `\frac{A(O_{\mathrm{unlock}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{occlusion}} \quad \lor \quad A(N_{\mathrm{dismiss}}) < 44 \times 44`
- line 664 — **Grinding / 1. Exponential Effort Scaling**: `E(L_i \to L_{i+1}) \propto c^i \quad (c > 1) \quad \land \quad V(L_{i+1}) \approx V(L_i) + k`
- line 677 — **Playing By Appointment / 1. Temporal Gating**: `\mathrm{State}(A_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{until} \quad t \ge t_{\mathrm{depletion}} + \tau_{\mathrm{refill}}`
- line 681 — **Playing By Appointment / 2. Visual Prominence of Temporal-Gating Indicators**: `\frac{A(N_{\mathrm{temporal}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{appointment}} \quad \lor \quad \mathrm{Saturation}(N_{\mathrm{temporal}}) > 0.8`
- line 685 — **Playing By Appointment / 3. Semantic Urgency Encoding in Temporal-Gating Messages**: `\mathrm{Urgency}(T_{\mathrm{temporal}}) > \tau_{\mathrm{appointment\_urgency}} \quad \land \quad T_{\mathrm{temporal}} \cap L_{\mathrm{scarcity}} \neq \emptyset`
- line 694 — **Watch Ads To Unlock Features Or Get Rewards / 2. Visual Mismatch Between Reward Progress Display and Actual Progress**: `P_{\mathrm{visual}} - P_{\mathrm{actual}} > \tau_{\mathrm{mislead}}`
- line 698 — **Watch Ads To Unlock Features Or Get Rewards / 3. Semantic Inflation of Reward Value**: `\mathrm{Hyperbole}(T_{\mathrm{reward}}) - \mathrm{Utility}(R_{\mathrm{actual}}) > \tau_{\mathrm{hype\_gap}}`
- line 707 — **Pay To Avoid / 2. Visual Occupancy of the Pain-Point Element**: `\frac{A(N_{\mathrm{pain}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{pain}}`
- line 711 — **Pay To Avoid / 3. Pain-Point Amplification**: `\frac{d}{dt} \lambda_{\mathrm{friction}}(t) > 0 \quad \implies \quad P(N_{\mathrm{prompt}} \mid \lambda_{\mathrm{friction}}) \approx 1`
- line 716 — **Automating The User Away / 1. Autonomous Action Execution**: `A_{\mathrm{critical}} = \mathrm{Executed} \quad \text{given} \quad E_{\mathrm{user}} = \emptyset \quad \land \quad t \ge \tau_{\mathrm{system}}`
- line 720 — **Automating The User Away / 2. Omission of the Interrupt Vector**: `B_{\mathrm{cancel}} \notin \mathrm{DOM}(t) \quad \lor \quad \Delta t_{\mathrm{warning}} < \tau_{\mathrm{reaction}}`
- line 733 — **Parasocial Pressure / 2. Visual Proximity of Anthropomorphic Imagery to Action Prompts**: `\min_{i \in I_{\mathrm{face}}} d_{\mathrm{spatial}}(i, N_{\mathrm{prompt}}) < \tau_{\mathrm{social}} \quad \land \quad \frac{A(i)}{A_{\mathrm{viewport}}} > 0.05`
- line 742 — **Encouraging Anti-Social Behavior / 1. Reward-Coupled Social Externality**: `A_{\mathrm{antisocial}} \implies (V_{\mathrm{reward}} > 0 \quad \land \quad E_{\mathrm{externality}} \gg 0)`
- line 746 — **Encouraging Anti-Social Behavior / 2. Visual Framing of Competitive Antagonism**: `\mathrm{LayoutType}(C_{\mathrm{container}}) = \mathrm{Competitive} \quad \land \quad \mathrm{SplitRatio} \approx 0.5`
- line 750 — **Encouraging Anti-Social Behavior / 3. Algorithmic Amplification of Outrage**: `V_{\mathrm{visibility}}(M) \propto P_{\mathrm{polarity}}(M) \quad \implies \quad \text{Systemic Incentive for Hostility}`
- line 755 — **Addictive Design / 1. Infinite Frictionless Continuation**: `Y_{\mathrm{max}}(t) - Y_{\mathrm{scroll}}(t) < \tau_{\mathrm{buffer}} \quad \implies \quad E_{\mathrm{append}} = \mathrm{True}`
- line 760 — **Addictive Design / 2. Eradication of Natural Stopping Cues**: `\forall e \in E_{\mathrm{stop}} : \mathrm{Visible}(e, t) = \mathrm{False} \quad \lor \quad \frac{A(e)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \quad \lor \quad \mathrm{CR}(e, L_{\mathrm{bg}}) < 3.0`
- line 761 — **Addictive Design / 2. Eradication of Natural Stopping Cues**: `T_{\mathrm{session}} > \tau_{\mathrm{hyper\_engagement}}`
- line 765 — **Addictive Design / 3. Semantic Reinforcement-Trigger Lexicon Density**: `\frac{|\{w \in T : w \in L_{\mathrm{reinforcement}}\}|}{A_{\mathrm{viewport}}} > \tau_{\mathrm{addiction}}`
- line 770 — **Infinite Scrolling / 1. Autonomous Content Injection**: `Y_{\mathrm{document\_end}} - Y_{\mathrm{viewport}} \leq \tau_{\mathrm{trigger}} \quad \implies \quad E_{\mathrm{fetch}}() = \mathrm{True}`
- line 784 — **Pull To Refresh (Variable-Reward Trap) / 1. Kinesthetic Resistance and Action Commitment**: `\Delta Y_{\mathrm{touch}}(t) \geq \tau_{\mathrm{commit}} \quad \land \quad R_{\mathrm{elastic}} > 0 \quad \implies \quad E_{\mathrm{refresh}}() = \mathrm{True}`
- line 788 — **Pull To Refresh (Variable-Reward Trap) / 2. Artificial Anticipation Injection**: `\Delta t_{\mathrm{animation}} \gg \Delta t_{\mathrm{network}} \quad \land \quad \Delta t_{\mathrm{animation}} \geq \tau_{\mathrm{suspense}}`
- line 792 — **Pull To Refresh (Variable-Reward Trap) / 3. Semantic Variability of Refresh-Outcome Messaging**: `\sigma^2(\{\mathrm{Novelty}(T_i) : i = 1 \ldots k\}) > \tau_{\mathrm{slot\_machine}}`
- line 797 — **Countdown On Ads / 1. Temporal Gating of Navigational Agency**: `\mathrm{State}(B_{\mathrm{skip}}, t_{\mathrm{active}}) = \mathrm{Disabled} \quad \text{given} \quad t_{\mathrm{active}} < \tau_{\mathrm{lock}}`
- line 801 — **Countdown On Ads / 2. Dynamic Affordance Injection**: `N_{\mathrm{close}} \notin \mathrm{DOM}(t) \quad \forall t < \tau_{\mathrm{lock}} \quad \land \quad N_{\mathrm{close}} \in \mathrm{DOM}(\tau_{\mathrm{lock}})`
- line 810 — **Auto-Play / 1. Autonomous Media Execution**: `S_{\mathrm{play}}(M_{\mathrm{media}}) = \mathrm{True} \quad \text{given} \quad E_{\mathrm{intent}} = \emptyset \quad \land \quad \mathrm{Intersection}(M_{\mathrm{media}}, \mathrm{Viewport}) > \tau_{\mathrm{visible}}`
- line 814 — **Auto-Play / 2. Affordance Suppression**: `\mathrm{Visibility}(B_{\mathrm{cancel}}) \to 0 \quad \lor \quad \mathrm{Cost}(S_{\mathrm{play}} \to \mathrm{False}) \gg 1`

## Flag: state-transition

- line 164 — **Reduced Friction / 1. Absence of Confirmation Interstitial**: `E_{\mathrm{click}}(S_{\mathrm{intent}}) \implies S_{\mathrm{commit}} \quad \land \quad S_{\mathrm{confirm}} \notin \mathrm{Path}(S_{\mathrm{intent}} \to S_{\mathrm{commit}})`
- line 177 — **Forced Continuity / 1. Time-Triggered Silent State Mutation**: `t \geq t_{\mathrm{expiry}} \quad \implies \quad S_{\mathrm{account}}(t) \to S_{\mathrm{premium}} \quad \land \quad E_{\mathrm{charge}}(T_{\mathrm{payment}}) = \mathrm{True}`
- line 302 — **Activity Messages / 2. Cognitive Interruption**: `\mathrm{Salience}(N_{\mathrm{activity}}) \to \mathrm{Max} \quad \land \quad \lambda_{\mathrm{interrupt}} > \tau_{\mathrm{cognitive\_load}} \implies S_{\mathrm{focus}} \to \mathrm{Disrupted}`
- line 315 — **Countdown Timer / 2. Cognitive Compression**: `\Delta t_{\mathrm{timer}} < \tau_{\mathrm{deliberation}} \quad \implies \quad \mathrm{Probability}(\mathrm{Rational\_Evaluation}) \to 0`
- line 332 — **Limited Time Message / 3. Ambiguous Temporal Bounding**: `\mathrm{Specificity}(M_{\mathrm{urgency}}) \approx 0 \quad \land \quad T_{\mathrm{end}} \notin \mathrm{DOM} \implies \mathrm{Urgency_{perceived}} \to \mathrm{Max}`
- line 499 — **Confirmshaming / 2. Visual Hierarchy Subversion**: `\mathrm{Vis}(N_{\mathrm{accept}}) \gg \mathrm{Vis}(N_{\mathrm{decline}}) \quad \land \quad \mathrm{Vis}(N_{\mathrm{decline}}) \to \tau_{\mathrm{minimum\_accessibility}}`
- line 508 — **Psychological Tricks / 1. Asymmetric Dominance**: `V(O_{\mathrm{target}}) \gg V(O_{\mathrm{decoy}}) \quad \land \quad \mathrm{Cost}(O_{\mathrm{target}}) \approx \mathrm{Cost}(O_{\mathrm{decoy}}) \implies P_{\mathrm{select}}(O_{\mathrm{target}}) \to \mathrm{Max}`
- line 512 — **Psychological Tricks / 2. Cognitive Overload**: `|C_{\mathrm{matrix}}| \gg \tau_{\mathrm{fatigue}} \quad \implies \quad \lim_{t \to \infty} P_{\mathrm{select}}(D_{\mathrm{favorable}}) = 1`
- line 612 — **Forced Registration / 1. Absolute State Blocking**: `\forall \pi \in \mathrm{Paths}(S_{\mathrm{intent}} \to S_{\mathrm{terminal}}) : S_{\mathrm{auth}} \in \pi`
- line 642 — **Granting and Interaction / 2. Asynchronous Overlay Misdirection**: `\mathrm{Pos}(M_{\mathrm{system\_prompt}}, t) \approx \mathrm{Pos}(B_{\mathrm{benign}}, t) \quad \text{as} \quad t \to t_{\mathrm{interaction}}`
- line 664 — **Grinding / 1. Exponential Effort Scaling**: `E(L_i \to L_{i+1}) \propto c^i \quad (c > 1) \quad \land \quad V(L_{i+1}) \approx V(L_i) + k`
- line 668 — **Grinding / 2. Visual Diminishing-Returns Feedback Loop**: `\frac{\Delta P_{k}}{\Delta P_{1}} < e^{-\lambda(k-1)} \quad \land \quad \frac{d^2 P}{di^2} < 0`
- line 672 — **Grinding / 3. Semantic Attenuation of Progress-Milestone Language**: `\Delta a_i = \mathrm{Pos}(\mathrm{Milestone}_{i}) - \mathrm{Pos}(\mathrm{Milestone}_{i-1}) \quad \land \quad \frac{d\Delta a}{di} > 0`
- line 690 — **Watch Ads To Unlock Features Or Get Rewards / 1. Attention as Transactional Currency**: `\int_{0}^{\Delta t_{\mathrm{ad}}} E_{\mathrm{playback}}(t) \, dt = \Delta t_{\mathrm{ad}} \implies \mathrm{State}(R_{\mathrm{target}}) \to \mathrm{Unlocked}`
- line 711 — **Pay To Avoid / 3. Pain-Point Amplification**: `\frac{d}{dt} \lambda_{\mathrm{friction}}(t) > 0 \quad \implies \quad P(N_{\mathrm{prompt}} \mid \lambda_{\mathrm{friction}}) \approx 1`
- line 729 — **Parasocial Pressure / 1. Manufactured Livelihood Dependency**: `T_{\mathrm{fiat}} = 0 \implies \mathrm{State}(I_{\mathrm{creator}}) \to \mathrm{Failure} \quad \text{asserted within} \quad M_{\mathrm{pitch}}`
- line 737 — **Parasocial Pressure / 3. Emotional Asymmetry**: `E_{\mathrm{user}} = \mathrm{Refusal} \implies \frac{d}{dt} V_{\mathrm{emotion}}(A_{\mathrm{mascot}}) \to -1`
- line 756 — **Addictive Design / 1. Infinite Frictionless Continuation**: `\lim_{t \to \infty} Y_{\mathrm{max}}(t) = \infty`
- line 774 — **Infinite Scrolling / 2. The Unreachable Footer**: `v_{\mathrm{scroll}} > 0 \quad \implies \quad \frac{d}{dt} \mathrm{Pos}_{y}(N_{\mathrm{footer}}, t) \geq v_{\mathrm{scroll}}`
- line 775 — **Infinite Scrolling / 2. The Unreachable Footer**: `\lim_{t \to \infty} d(Y_{\mathrm{viewport}}, \mathrm{Pos}_{y}(N_{\mathrm{footer}})) > 0`
- line 814 — **Auto-Play / 2. Affordance Suppression**: `\mathrm{Visibility}(B_{\mathrm{cancel}}) \to 0 \quad \lor \quad \mathrm{Cost}(S_{\mathrm{play}} \to \mathrm{False}) \gg 1`

## Flag: unobservable-ground-truth

- line 25 — **Dead End / 2. Visual Absence of Dismissal Vectors**: `C_{\mathrm{dismiss}} = \emptyset \quad \land \quad \text{IsOverlay}(v_{\mathrm{current}}) = \mathrm{True}`
- line 120 — **Sneak Into Basket / 3. Semantic Obscuration of Injected Line Items**: `\mathrm{Entailment}(T(N_{\mathrm{injected}}), \text{``optional add-on''}) = \mathrm{True} \quad \land \quad \mathrm{UserConsented}(N_{\mathrm{injected}}) = \mathrm{False}`
- line 159 — **Hidden Information / 3. Semantic Concealment of Adverse Terms**: `K_{\mathrm{adverse}} \cap T_{\mathrm{DOM}} \neq \emptyset \quad \land \quad \mathrm{IsConcealed}(N_{\mathrm{adverse}}) = \mathrm{True}`
- line 172 — **Reduced Friction / 3. Semantic Absence of Confirmation Language**: `\neg\exists n \in \mathrm{Path}(v_{\mathrm{pre}}, v_{\mathrm{commit}}) : \mathrm{Match}(T(n), \mathrm{Pattern}_{\mathrm{confirm}}) = \mathrm{True}`
- line 177 — **Forced Continuity / 1. Time-Triggered Silent State Mutation**: `t \geq t_{\mathrm{expiry}} \quad \implies \quad S_{\mathrm{account}}(t) \to S_{\mathrm{premium}} \quad \land \quad E_{\mathrm{charge}}(T_{\mathrm{payment}}) = \mathrm{True}`
- line 192 — **Privacy Zuckering / 1. Bundled Consent and Granularity Violation**: `T_{\mathrm{accept}} = \mathrm{True} \quad \implies \quad (\mathrm{Access}(D_{\mathrm{essential}}) = \mathrm{True} \quad \land \quad \mathrm{Access}(D_{\mathrm{monetization}}) = \mathrm{True})`
- line 201 — **Privacy Zuckering / 3. Semantic Ambiguity of Third-Party Entities**: `|E_{\mathrm{actual}}| \gg 1 \quad \land \quad \mathrm{Specificity}(N_{\mathrm{disclosure}}) < \tau_{\mathrm{vague}}`
- line 206 — **Friend Spam / 1. Feedforward Intent vs. Payload Execution**: `\mathrm{Intent}_{\mathrm{NLP}}(N_{\mathrm{prompt}}) \in D_{\mathrm{read\_only}} \quad \land \quad E_{\mathrm{backend\_action}}(T_{\mathrm{access}}) \implies \mathrm{SendMessages()}`
- line 232 — **Automatic Accept Third Party Term / 1. Bundled Transitive Consent**: `\mathrm{Accept}(T_{\mathrm{primary}}) \implies \forall t_i \in T_{\mathrm{third\_party}} : \mathrm{Accept}(t_i) = \mathrm{True}`
- line 237 — **Automatic Accept Third Party Term / 2. Opaque Entity Resolution**: `E_{\mathrm{declared}} \subset E_{\mathrm{actual}} \quad \land \quad |E_{\mathrm{actual}}| \gg |E_{\mathrm{declared}}| \approx 0`
- line 241 — **Automatic Accept Third Party Term / 3. Semantic Concealment of Third-Party Agreement Language**: `T(N_{\mathrm{legal}}) \cap K_{\mathrm{agreement}} \neq \emptyset \quad \land \quad \mathrm{Checked}(N_{\mathrm{legal}}) = \mathrm{True} \quad \land \quad \mathrm{UserToggled}(N_{\mathrm{legal}}) = \mathrm{False}`
- line 254 — **Pre-Delivered Content / 3. Semantic Framing of Local Assets as Purchase Opportunities**: `\mathrm{Frame}(T_{\mathrm{asset}}) = \mathrm{Purchaseable} \quad \land \quad \mathrm{IsLocal}(A_{\mathrm{asset}}) = \mathrm{True}`
- line 272 — **High Demand / 1. Metric Fabrication**: `U_{\mathrm{displayed}}(i, t) = R(a, b) \quad \text{given} \quad U_{\mathrm{displayed}}(i, t) \gg U_{\mathrm{true}}(i, t)`
- line 276 — **High Demand / 2. Visual Dynamics of Social-Proof Badges**: `\exists n \in N_{\mathrm{demand}} : \mathrm{IsAnimated}(n) = \mathrm{True} \quad \land \quad \Delta t_{\mathrm{update}}(n) < \tau_{\mathrm{animate}}`
- line 285 — **Low Stock / 1. Inventory Fabrication**: `I_{\mathrm{displayed}}(x) \le \tau_{\mathrm{scarcity}} \quad \text{given} \quad I_{\mathrm{displayed}}(x) \ll I_{\mathrm{true}}(x)`
- line 289 — **Low Stock / 2. Visual Alarm Salience of Scarcity Indicators**: `\mathrm{Hue}(N_{\mathrm{stock}}) \in [0^\circ, 30^\circ] \quad \land \quad \Delta\mathrm{Stock}_{\mathrm{actual}} = 0`
- line 293 — **Low Stock / 3. Semantic Verifiability of Stock-Level Quantifiers**: `\exists t_1, t_2 : |t_2 - t_1| < 60\text{s} \quad \land \quad Q_{\mathrm{stock}}(t_1) \neq Q_{\mathrm{stock}}(t_2) \quad \land \quad \neg\mathrm{HasTransaction}(t_1, t_2)`
- line 302 — **Activity Messages / 2. Cognitive Interruption**: `\mathrm{Salience}(N_{\mathrm{activity}}) \to \mathrm{Max} \quad \land \quad \lambda_{\mathrm{interrupt}} > \tau_{\mathrm{cognitive\_load}} \implies S_{\mathrm{focus}} \to \mathrm{Disrupted}`
- line 315 — **Countdown Timer / 2. Cognitive Compression**: `\Delta t_{\mathrm{timer}} < \tau_{\mathrm{deliberation}} \quad \implies \quad \mathrm{Probability}(\mathrm{Rational\_Evaluation}) \to 0`
- line 319 — **Countdown Timer / 3. Semantic Urgency Inflation via Temporal Lexemes**: `\mathrm{IsCountdown}(N) = \mathrm{True} \quad \land \quad |T_{\mathrm{adjacent}}(N) \cap L_{\mathrm{amplify}}| > 0`
- line 328 — **Limited Time Message / 2. Visual Salience of Temporal-Urgency Chromatics**: `\mathrm{Hue}(C_{\mathrm{offer}}) \in [0^\circ, 45^\circ] \quad \land \quad \mathrm{Match}(T(C_{\mathrm{offer}}), \mathrm{Pattern}_{\mathrm{temporal}}) = \mathrm{True}`
- line 482 — **Endorsement And Testimonials / 1. Statistical Implausibility**: `\mathrm{Mean}(S(R_{\mathrm{total}})) \approx 5.0 \quad \land \quad \mathrm{Var}(S(R_{\mathrm{total}})) \approx 0 \implies D_{\mathrm{rendered}} \neq D_{\mathrm{organic}}`
- line 490 — **Endorsement And Testimonials / 3. Provenance Obfuscation**: `\mathrm{Similarity}(I_{\mathrm{avatar}}(P_i), I_{\mathrm{stock\_database}}) \approx 1 \quad \lor \quad \mathrm{Similarity}(T_{\mathrm{text}}(r_i), T_{\mathrm{text}}(r_j)) > \tau_{\mathrm{template}}`
- line 516 — **Psychological Tricks / 3. Reference Point Obfuscation**: `P_{\mathrm{anchor}} \gg P_{\mathrm{actual}} \quad \implies \quad \mathrm{WTP}(U_{\mathrm{anchored}}) > \mathrm{WTP}(U_{\mathrm{baseline}})`
- line 521 — **Pressured Selling / 1. Transactional Flow Interruption**: `\mathrm{Click}(B_{\mathrm{proceed}}) \implies \mathrm{Visibility}(M_{\mathrm{upsell}}) = \mathrm{True} \quad \land \quad s_{\mathrm{final}} \notin S_{\mathrm{current}}`
- line 534 — **Small or Moving Close Button / 1. Structural Event-Listener Commandeering on Dismissal Vectors**: `\mathrm{IsIntercepted}(N_{\mathrm{close}}) = \mathrm{True} \quad \lor \quad \Delta t_{\mathrm{rebind}}(N_{\mathrm{close}}) < \tau_{\mathrm{rebind}}`
- line 547 — **Bad Defaults / Preselection / 1. Pre-initialized Activation State**: `\exists c \in C : \mathrm{State}(c, t_0) = \mathrm{True} \quad \land \quad \mathrm{UserEvents}(c, t_0) = \emptyset`
- line 564 — **Trick Questions / 2. Affordance-Consequence Mismatch**: `(\mathrm{State}(c) = \mathrm{True}) \implies (\mathrm{Intent}(L(c)) \in D_{\mathrm{deny}})`
- line 646 — **Granting and Interaction / 3. Semantic Scope Creep in Permission Requests**: `|\mathrm{Perms}_{\mathrm{actual}} \setminus \mathrm{Perms}_{\mathrm{disclosed}}| > 0`
- line 694 — **Watch Ads To Unlock Features Or Get Rewards / 2. Visual Mismatch Between Reward Progress Display and Actual Progress**: `P_{\mathrm{visual}} - P_{\mathrm{actual}} > \tau_{\mathrm{mislead}}`
- line 698 — **Watch Ads To Unlock Features Or Get Rewards / 3. Semantic Inflation of Reward Value**: `\mathrm{Hyperbole}(T_{\mathrm{reward}}) - \mathrm{Utility}(R_{\mathrm{actual}}) > \tau_{\mathrm{hype\_gap}}`
- line 742 — **Encouraging Anti-Social Behavior / 1. Reward-Coupled Social Externality**: `A_{\mathrm{antisocial}} \implies (V_{\mathrm{reward}} > 0 \quad \land \quad E_{\mathrm{externality}} \gg 0)`
- line 755 — **Addictive Design / 1. Infinite Frictionless Continuation**: `Y_{\mathrm{max}}(t) - Y_{\mathrm{scroll}}(t) < \tau_{\mathrm{buffer}} \quad \implies \quad E_{\mathrm{append}} = \mathrm{True}`
- line 770 — **Infinite Scrolling / 1. Autonomous Content Injection**: `Y_{\mathrm{document\_end}} - Y_{\mathrm{viewport}} \leq \tau_{\mathrm{trigger}} \quad \implies \quad E_{\mathrm{fetch}}() = \mathrm{True}`
- line 779 — **Infinite Scrolling / 3. Semantic Attenuation of Content Boundaries**: `\neg\exists n \in N_{\mathrm{feed}} : \mathrm{Match}(T(n), \mathrm{Pattern}_{\mathrm{boundary}}) = \mathrm{True}`
- line 784 — **Pull To Refresh (Variable-Reward Trap) / 1. Kinesthetic Resistance and Action Commitment**: `\Delta Y_{\mathrm{touch}}(t) \geq \tau_{\mathrm{commit}} \quad \land \quad R_{\mathrm{elastic}} > 0 \quad \implies \quad E_{\mathrm{refresh}}() = \mathrm{True}`
- line 810 — **Auto-Play / 1. Autonomous Media Execution**: `S_{\mathrm{play}}(M_{\mathrm{media}}) = \mathrm{True} \quad \text{given} \quad E_{\mathrm{intent}} = \emptyset \quad \land \quad \mathrm{Intersection}(M_{\mathrm{media}}, \mathrm{Viewport}) > \tau_{\mathrm{visible}}`

