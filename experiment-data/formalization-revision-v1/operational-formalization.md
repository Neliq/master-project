# Operational formalization revision v1

This is a versioned application-oriented rewrite of the frozen ontology.
The original formulas are retained verbatim in `operational-cards.json`;
this document changes how they are evaluated against evidence, not the
corpus labels or the Run 6 benchmark.

## Three-valued semantics

- **TRUE**: every mandatory atom in one condition is directly supported by aligned evidence.
- **FALSE**: direct evidence contradicts a mandatory atom or supplies a listed counterevidence.
- **UNKNOWN**: a required atom is unobservable, the evidence scope is incomplete, or the comparison cannot be measured.
- A pattern is **DECEPTIVE** only if one complete trigger condition is TRUE.
- A pattern is **BENIGN** only when no trigger condition is TRUE and direct counterevidence/escape evidence is available.
- Otherwise the pattern is **UNKNOWN**; do not silently map missing evidence to BENIGN.
- `polarity: counterevidence` conditions can disqualify a trigger but cannot create a deceptive verdict.

## Proof-obligation grammar

1. Read all aligned states and build separate visual, DOM, semantic, and transition facts.
2. Identify the pattern/condition's required objects and scope before evaluating atoms.
3. Evaluate every mandatory atom. For `A ⇒ B`, require observed A and observed B; never use vacuous truth.
4. Keep unobservable backend truth, future behavior, user psychology, and intent UNKNOWN.
5. Require the named comparison, path, event, denominator, or state transition; a keyword or similarity is not a complete condition.
6. Apply only pattern/condition-specific counterevidence and escapes.

## Coverage

- Patterns: 62
- Conditions: 186
- Detailed operational rewrites: 36
- Conservative fallback cards: 150

## Pattern cards

### Immortal Accounts [obstruction]

#### 1. 1. Asymmetrical Navigational Depth
Original: `\frac{N(x_{\mathrm{delete}})}{N(x_{\mathrm{create}})} > \delta`
Operational reading: Measured deletion path is longer than creation path
Required atoms:
- The creation and deletion actions are identified from the same starting state.
- The shortest interaction path for both actions is observed or directly countable.
- The stated deletion/creation ratio exceeds the formula threshold.
Unknown when:
- A path, action, or threshold is not exposed by the evidence.
Direct counterevidence:
- The measured deletion path is not longer than the creation path.
Do not infer:
- Do not infer hidden deletion steps from the absence of a settings page.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Accessibility of Offboarding Vectors
Original: `\frac{A(N_{\mathrm{delete}})}{A(N_{\mathrm{create}})} < \tau_{\mathrm{exit\_visibility}}`
Operational reading: Deletion affordance is visually subordinate to creation affordance
Required atoms:
- A deletion/offboarding affordance and a creation affordance are both identified in the same state.
- Their comparable visual areas are observed or measured.
- The ratio is below the stated threshold, using the same viewport and element-selection rule.
Unknown when:
- One comparison affordance or its visual measurement is unavailable.
Direct counterevidence:
- The exit affordance has equal or greater comparable prominence.
Do not infer:
- A small control is not deceptive without the named within-interface comparison.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Absolute Absence of Deletion Vectors
Original: `K_{\mathrm{del}} \cap T_{\mathrm{DOM}} = \emptyset`
Operational reading: No deletion vector in the complete inspected account scope
Required atoms:
- The inspected DOM scope covers the account settings/profile pages relevant to offboarding.
- The deletion-keyword set and equivalent labelled controls are absent from that complete scope.
Unknown when:
- The evidence does not establish complete account-scope coverage.
Direct counterevidence:
- A deletion, deactivation, close-account, or equivalent vector is present in the inspected scope.
Do not infer:
- Do not convert a missing state or missing page into absolute absence.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Dead End [obstruction]

#### 1. 1. Topological Sink in the Navigational Graph
Original: `\forall e \in E_{\mathrm{out}}(v_{\mathrm{current}}), \text{target}(e) \in V_{\mathrm{forced}} \implies \text{No Escape Path}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Absence of Dismissal Vectors
Original: `C_{\mathrm{dismiss}} = \emptyset \quad \land \quad \text{IsOverlay}(v_{\mathrm{current}}) = \mathrm{True}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Coercion Density in Trapped States
Original: `\frac{|\{\text{Imperative}(w) \lor \text{Urgency}(w) : w \in T(v_{\mathrm{trap}})\}|}{|T(v_{\mathrm{trap}})|} > \tau_{\mathrm{coercion}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Forced Grace Period [obstruction]

#### 1. 1. Temporal Discrepancy Extraction
Original: `T_{\mathrm{execute}} - T_{\mathrm{request}} \geq \Delta t_{\mathrm{min}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Conspicuity of Cancellation Affordance
Original: `\frac{S(N_{\mathrm{cancel}})}{S(N_{\mathrm{confirm}})} < \delta_{\mathrm{salience}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Proximity of Reversal
Original: `\min_{k \in K_{\mathrm{revert}}, e \in E_{\mathrm{time}}} d(k, e) < \tau_{\mathrm{words}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Privacy Maze [obstruction]

#### 1. 1. Asymmetrical Path Depth
Original: `d(v_{\mathrm{start}}, v_{\mathrm{reject\_all}}) > d(v_{\mathrm{start}}, v_{\mathrm{accept\_all}}) \quad \lor \quad d(v_{\mathrm{start}}, v_{\mathrm{reject\_all}}) > \tau_{\mathrm{depth}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Prominence Disparity
Original: `\frac{P(B_{\mathrm{accept}})}{P(B_{\mathrm{manage}})} > \delta_{\mathrm{contrast}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Obfuscation of Privacy-Related Terminology
Original: `\mathrm{FKGL}(T_{\mathrm{privacy}}) > 14 \quad \lor \quad \frac{|\mathrm{Unique}(T_{\mathrm{privacy}})|}{|T_{\mathrm{privacy}}|} > \tau_{\mathrm{obfuscation}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Labyrinthine Navigation [obstruction]

#### 1. 1. Excessive Navigational Depth
Original: `d(v_{\mathrm{home}}, v_{\mathrm{target}}) > \tau_{\mathrm{depth}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Nesting Depth of Navigation Elements
Original: `\max_{n \in N_{\mathrm{nav}}} D_{\mathrm{render}}(n) > \tau_{\mathrm{nesting}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Obfuscation
Original: `\exists e_i \in P : \mathrm{Sim}(L(e_i), \mathrm{Topic}(v_{\mathrm{target}})) < \tau_{\mathrm{semantic}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Customisation (Interface Nesting) [obstruction]

#### 1. 1. Path Depth Asymmetry
Original: `d(S_0, S_{\mathrm{accept\_all}}) = 1 \quad \land \quad d(S_0, S_{\mathrm{reject\_all}}) \ge 2`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Indentation Depth of Privacy Controls
Original: `\frac{1}{|N_{\mathrm{privacy}}|} \sum_{n \in N_{\mathrm{privacy}}} \mathrm{offsetX}(n) > \tau_{\mathrm{indent}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Obfuscation of Privacy Toggle Labels
Original: `\frac{|\{w \in L(N_{\mathrm{privacy}}) : w \in D_{\mathrm{jargon}}\}|}{|L(N_{\mathrm{privacy}})|} > \tau_{\mathrm{jargon}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Intermediate Currency [sneaking]

#### 1. 1. Interception of the Fiat Checkout Flow
Original: `\mathrm{target}(E_{\mathrm{purchase}}) = V_{\mathrm{exchange}} \quad \land \quad \mathrm{target}(E_{\mathrm{purchase}}) \neq V_{\mathrm{checkout}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Obscuration of Real-Currency Equivalence
Original: `N_{\mathrm{real}} = \emptyset \quad \lor \quad \frac{\mathrm{fontSize}(N_{\mathrm{real}})}{S_{\mathrm{base}}} < 0.5`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Lexical Tokenization mapped to Forced Exchange
Original: `T_{\mathrm{price}}(n) \in C_{\mathrm{virtual}} \quad \land \quad \text{TransactionStatus}(n) \implies \text{Executed}(E_{\mathrm{exchange}})`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Disguised Ad [sneaking]

#### 1. 1. Cross-Origin Action Masking
Original: `B_{\mathrm{action}} \neq \emptyset \quad \land \quad D_{\mathrm{target}}(B_{\mathrm{action}}) \neq D_{\mathrm{host}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Morphological Similarity
Original: `\max_{v_i \in V_{\mathrm{native}}} \mathrm{sim}(v_{\mathrm{ad}}, v_i) > \tau_{\mathrm{blend}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Mimicry of Native Action Labels
Original: `\max_{\ell \in L_{\mathrm{native}}} \mathrm{sim}(L(N_{\mathrm{ad}}), \ell) > \tau_{\mathrm{masquerade}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Sneak Into Basket [sneaking]

#### 1. 1. Unprompted State Mutation
Original: `(I_{\mathrm{cart}} \setminus I_{\mathrm{explicit}} \neq \emptyset) \quad \land \quad \nexists e \in E_{\mathrm{user}} \implies \mathrm{Add}(y)`
Operational reading: An item appears in the cart without a matching user event
Required atoms:
- The item is present in the cart/final checkout state.
- The item is absent from the set of explicitly selected items.
- The aligned event trace shows no user event that adds or selects that item.
Unknown when:
- The cart state or user-event trace is incomplete.
Direct counterevidence:
- A matching explicit add/select event is observed for the item.
Do not infer:
- The conclusion Add(y) is not evidence; prove the set difference and missing event directly.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Indistinguishability of Surcharged Items
Original: `\min_{v_u \in V_{\mathrm{user}}} \|v_{\mathrm{injected}} - v_u\|_2 < \tau_{\mathrm{camouflage}}`
Operational reading: An identified injected item visually resembles legitimate cart items
Required atoms:
- An injected/surcharged item has already been established by the relevant cart/event evidence.
- At least one legitimate comparison item is identified in the same state.
- The visual distance is below the stated camouflage threshold under the same feature representation.
Unknown when:
- No legitimate comparator or measurable visual representation is available.
Direct counterevidence:
- The injected item is visually distinguished or the threshold is not met.
Do not infer:
- Similarity alone cannot establish injection or user impact.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Obscuration of Injected Line Items
Original: `\mathrm{Entailment}(T(N_{\mathrm{injected}}), \text{``optional add-on''}) = \mathrm{True} \quad \land \quad \mathrm{UserConsented}(N_{\mathrm{injected}}) = \mathrm{False}`
Operational reading: An unconsented injected item is semantically presented as optional
Required atoms:
- The line item is established as injected by the cart/event evidence.
- The item description entails optional add-on status.
- No explicit user consent event for that item is observed.
Unknown when:
- Consent history or item identity is unavailable.
Direct counterevidence:
- An explicit user opt-in for the item is observed.
Do not infer:
- An optional label does not prove lack of consent; keep those atoms separate.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Drip Pricing, Hidden Costs, or Partitioned Pricing [sneaking]

#### 1. 1. Sequential Price Inflation
Original: `P(s_n) > P(s_0) + I_{\mathrm{added}} \quad \implies \quad P_{\mathrm{dripped}} > 0`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Disparity of Cost Partitioning
Original: `\frac{V(N_{\mathrm{base}})}{V(N_{\mathrm{fee}})} > \tau_{\mathrm{prominence}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Concealment of Mandatory Fee Disclosure
Original: `T_{\mathrm{initial}} \cap K_{\mathrm{fees}} = \emptyset \quad \land \quad T_{\mathrm{final}} \cap K_{\mathrm{fees}} \neq \emptyset`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Bundling [sneaking]

#### 1. 1. Inseparable Transactional Nodes
Original: `E_{\mathrm{purchase}}(I_{\mathrm{primary}}) \implies \{I_{\mathrm{primary}}, I_{\mathrm{supp}}\} \subseteq C_{\mathrm{state}} \quad \land \quad \nexists e : e(I_{\mathrm{primary}}) \implies C_{\mathrm{state}} = \{I_{\mathrm{primary}}\}`
Operational reading: Primary purchase necessarily includes a supplementary item
Required atoms:
- The primary purchase event is observed from the relevant starting state.
- The resulting checkout state contains both primary and supplementary items.
- No primary-only purchase event/path is observed in the inspected flow.
Unknown when:
- The resulting cart or alternative path is not observable.
Direct counterevidence:
- A primary-only purchase path is directly available.
Do not infer:
- Do not infer inseparability from a bundle label without a transition or complete path check.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Obscuration of Individual Component Pricing
Original: `\frac{\sum_{n \in N_{\mathrm{components}}} A(n)}{A(C_{\mathrm{bundle}})} < \tau_{\mathrm{breakdown}}`
Operational reading: Component prices occupy less than the stated share of the bundle presentation
Required atoms:
- The bundle container and all relevant component-price nodes are identified in the same state.
- The component-price area and bundle area use the same coordinate/viewport basis.
- The stated area ratio is below the threshold.
Unknown when:
- Component inventory or comparable area measurements are incomplete.
Direct counterevidence:
- Component prices are visibly and proportionally presented above the threshold.
Do not infer:
- Small text alone is not concealment without the defined bundle comparison.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Suppression of Individual Item Descriptions
Original: `\frac{H(T_{\mathrm{bundled}})}{H(T_{\mathrm{standalone}})} < \tau_{\mathrm{description}}`
Operational reading: Bundled descriptions are less informative than comparable standalone descriptions
Required atoms:
- Bundled and standalone descriptions for equivalent items are identified.
- The same entropy/description representation is available for both sets.
- The ratio is below the stated threshold.
Unknown when:
- No equivalent standalone comparator or entropy measurement is available.
Direct counterevidence:
- Bundled descriptions are comparably informative under the stated representation.
Do not infer:
- Do not invent a standalone comparator from another product category.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Hidden Information [sneaking]

#### 1. 1. Structural Burial in High-Density Text
Original: `|W(N_{\mathrm{document}})| > \tau_{\mathrm{fatigue}} \quad \land \quad P(t_{\mathrm{clause}}) = \mathrm{False}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Typographical and Chromatic Camouflage
Original: `S_{\mathrm{font}}(N_{\mathrm{critical}}) < \tau_{\mathrm{min\_readable}} \quad \lor \quad \mathrm{CR}(N_{\mathrm{critical}}, L_{\mathrm{bg}}) < \tau_{\mathrm{wcag\_min}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Concealment of Adverse Terms
Original: `K_{\mathrm{adverse}} \cap T_{\mathrm{DOM}} \neq \emptyset \quad \land \quad \mathrm{IsConcealed}(N_{\mathrm{adverse}}) = \mathrm{True}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Reduced Friction [sneaking]

#### 1. 1. Absence of Confirmation Interstitial
Original: `E_{\mathrm{click}}(S_{\mathrm{intent}}) \implies S_{\mathrm{commit}} \quad \land \quad S_{\mathrm{confirm}} \notin \mathrm{Path}(S_{\mathrm{intent}} \to S_{\mathrm{commit}})`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Proximity of Destructive Actions to Neutral UI
Original: `\min_{n \in N_{\mathrm{neutral}}} d_{\mathrm{spatial}}(N_{\mathrm{destructive}}, n) < \tau_{\mathrm{safety}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Absence of Confirmation Language
Original: `\neg\exists n \in \mathrm{Path}(v_{\mathrm{pre}}, v_{\mathrm{commit}}) : \mathrm{Match}(T(n), \mathrm{Pattern}_{\mathrm{confirm}}) = \mathrm{True}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Forced Continuity [sneaking]

#### 1. 1. Time-Triggered Silent State Mutation
Original: `t \geq t_{\mathrm{expiry}} \quad \implies \quad S_{\mathrm{account}}(t) \to S_{\mathrm{premium}} \quad \land \quad E_{\mathrm{charge}}(T_{\mathrm{payment}}) = \mathrm{True}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Absence of Temporal Feedforward
Original: `\forall w \in W_{\mathrm{renewal}} : \mathrm{Visible}(w, t) = \mathrm{False} \quad \forall t \in [t_{\mathrm{expiry}} - \tau_{\mathrm{fair\_notice}}, t_{\mathrm{expiry}}]`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Asymmetry Between Subscription and Cancellation Language
Original: `\mathrm{FKGL}(T_{\mathrm{cancel}}) - \mathrm{FKGL}(T_{\mathrm{signup}}) > 2 \quad \lor \quad \mathrm{Guilt}(T_{\mathrm{cancel}}) - \mathrm{Guilt}(T_{\mathrm{signup}}) > \tau_{\mathrm{guilt\_gap}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Privacy Zuckering [sneaking]

#### 1. 1. Bundled Consent and Granularity Violation
Original: `T_{\mathrm{accept}} = \mathrm{True} \quad \implies \quad (\mathrm{Access}(D_{\mathrm{essential}}) = \mathrm{True} \quad \land \quad \mathrm{Access}(D_{\mathrm{monetization}}) = \mathrm{True})`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Asymmetry Between Privacy-Invasive and Privacy-Preserving Options
Original: `\frac{W(N_{\mathrm{invasive}})}{W(N_{\mathrm{preserving}})} > \tau_{\mathrm{privacy\_skew}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Ambiguity of Third-Party Entities
Original: `|E_{\mathrm{actual}}| \gg 1 \quad \land \quad \mathrm{Specificity}(N_{\mathrm{disclosure}}) < \tau_{\mathrm{vague}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Friend Spam [sneaking]

#### 1. 1. Feedforward Intent vs. Payload Execution
Original: `\mathrm{Intent}_{\mathrm{NLP}}(N_{\mathrm{prompt}}) \in D_{\mathrm{read\_only}} \quad \land \quad E_{\mathrm{backend\_action}}(T_{\mathrm{access}}) \implies \mathrm{SendMessages()}`
Operational reading: Read-only contact intent leads to observed outbound messaging
Required atoms:
- The prompt's intended action is read-only matching/searching.
- An outbound message/broadcast action is directly observed after the access event.
- The transition from access to outbound action is evidenced in the aligned state/event record.
Unknown when:
- Backend execution or the access-to-message transition is not observable.
Direct counterevidence:
- Only read-only matching occurs and no outbound message action is observed.
Do not infer:
- Permission request wording does not prove backend sending.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Absence of Granular Selection
Original: `|S_{\mathrm{selected}}| = 0 \quad \land \quad |M_{\mathrm{dispatched}}| \approx |C_{\mathrm{network}}| \quad \implies \quad \mathrm{Unauthorized \: Broadcast}`
Operational reading: Messages are sent to the contact set without granular selection
Required atoms:
- The selection state shows zero explicitly selected contacts.
- The dispatched-message set is observed and approximately covers the extracted contact set.
- The dispatch occurs without an affirmative granular-selection event.
Unknown when:
- The extracted contact set or dispatched-message set is not exposed.
Direct counterevidence:
- The user selects recipients or the dispatch set is limited to selected recipients.
Do not infer:
- Do not infer a broadcast from a contact-import prompt alone.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Sender Identity Spoofing
Original: `\mathrm{SenderAlias}(m_{\mathrm{outbound}}) = I_{\mathrm{user}} \quad \land \quad \mathrm{Author}(m_{\mathrm{outbound}}) = I_{\mathrm{corp}}`
Operational reading: Corporate outbound message uses the user's identity as sender alias
Required atoms:
- The outbound message's sender alias matches the user's identity vector.
- The message author is identified as the corporate entity.
Unknown when:
- Sender alias or actual author is not observable.
Direct counterevidence:
- The sender alias accurately identifies the corporate sender.
Do not infer:
- A user's name in a message body is not the sender alias.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Address Book Leeching [sneaking]

#### 1. 1. Utility-Permission Decoupling
Original: `\mathrm{State}(U_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad P_{\mathrm{contacts}} = \mathrm{False} \quad \land \quad \mathrm{Dep}(U_{\mathrm{core}}, P_{\mathrm{contacts}}) = \emptyset`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Prominence of the Invite-All Affordance
Original: `\frac{A(N_{\mathrm{invite\_all}})}{A(N_{\mathrm{skip}})} > \tau_{\mathrm{invite\_dominance}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Framing of Contact-Sharing Consent
Original: `\mathrm{Frame}(T_{\mathrm{prompt}}) = \mathrm{Benefactive} \quad \land \quad \mathrm{Subject}(T_{\mathrm{prompt}}) = \mathrm{ThirdParty}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Automatic Accept Third Party Term [sneaking]

#### 1. 1. Bundled Transitive Consent
Original: `\mathrm{Accept}(T_{\mathrm{primary}}) \implies \forall t_i \in T_{\mathrm{third\_party}} : \mathrm{Accept}(t_i) = \mathrm{True}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Opaque Entity Resolution
Original: `E_{\mathrm{declared}} \subset E_{\mathrm{actual}} \quad \land \quad |E_{\mathrm{actual}}| \gg |E_{\mathrm{declared}}| \approx 0`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Concealment of Third-Party Agreement Language
Original: `T(N_{\mathrm{legal}}) \cap K_{\mathrm{agreement}} \neq \emptyset \quad \land \quad \mathrm{Checked}(N_{\mathrm{legal}}) = \mathrm{True} \quad \land \quad \mathrm{UserToggled}(N_{\mathrm{legal}}) = \mathrm{False}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Pre-Delivered Content [sneaking]

#### 1. 1. Unconsented Local Storage Consumption
Original: `C_{\mathrm{premium}} \subseteq S_{\mathrm{local}} \quad \text{given} \quad E_{\mathrm{consent}} = \emptyset \quad \land \quad \mathrm{Size}(C_{\mathrm{premium}}) \gg 0`
Operational reading: Premium content is locally present without consent
Required atoms:
- The premium content is established as present in local storage.
- No explicit consent/request to install that content is observed.
- The content size is materially greater than zero.
Unknown when:
- Local storage presence, consent history, or content size is not exposed.
Direct counterevidence:
- The content was explicitly requested or is not locally present.
Do not infer:
- A locked UI tile does not prove downloaded local content.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Density of Locked-Content Badges
Original: `\frac{|\{n \in N : \mathrm{IsLocked}(n)\}|}{|\{n \in N : \mathrm{IsAccessible}(n)\}|} > \tau_{\mathrm{locked\_ratio}}`
Operational reading: Locked-content nodes dominate accessible nodes
Required atoms:
- Locked and accessible content nodes are countable in the same inspected scope.
- The accessible-node denominator is nonzero.
- The stated locked/accessibility ratio exceeds the threshold.
Unknown when:
- The inspected content inventory or denominator is incomplete/zero.
Direct counterevidence:
- The ratio does not exceed the threshold.
Do not infer:
- The presence of locked badges alone is not a density calculation.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Framing of Local Assets as Purchase Opportunities
Original: `\mathrm{Frame}(T_{\mathrm{asset}}) = \mathrm{Purchaseable} \quad \land \quad \mathrm{IsLocal}(A_{\mathrm{asset}}) = \mathrm{True}`
Operational reading: Locally present assets are framed as purchasable
Required atoms:
- The asset is established as locally present.
- The asset text frames the asset as purchasable/unlockable/downloadable.
Unknown when:
- Local presence or asset framing is not directly observable.
Direct counterevidence:
- The asset is remote/not present locally or is described as already included.
Do not infer:
- A purchase button for a future asset does not establish local presence.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Fear Of Missing Out (FOMO) [urgency]

#### 1. 1. Artificial Temporal Scarcity
Original: `T(s_0) \approx \Delta t \quad \land \quad T(s_1) \approx \Delta t \quad \implies \quad \mathrm{Fabricated \: Urgency}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Pulsation Frequency of Urgency Indicators
Original: `\min_{n \in N_{\mathrm{urgency}}} \Delta t_{\mathrm{refresh}}(n) < \tau_{\mathrm{pulsation}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Density of Scarcity and Urgency Lexemes
Original: `\frac{|\{w \in T : w \in L_{\mathrm{FOMO}}\}|}{|T|} \times 100 > \tau_{\mathrm{fomo}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### High Demand [urgency]

#### 1. 1. Metric Fabrication
Original: `U_{\mathrm{displayed}}(i, t) = R(a, b) \quad \text{given} \quad U_{\mathrm{displayed}}(i, t) \gg U_{\mathrm{true}}(i, t)`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Dynamics of Social-Proof Badges
Original: `\exists n \in N_{\mathrm{demand}} : \mathrm{IsAnimated}(n) = \mathrm{True} \quad \land \quad \Delta t_{\mathrm{update}}(n) < \tau_{\mathrm{animate}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Verifiability of Social-Proof Quantifiers
Original: `\exists q \in \mathbb{Z}^+ \subset T(N_{\mathrm{demand}}) \quad \land \quad \neg\exists \text{Qualifier}_{\mathrm{temporal/geographic}} \in T(N_{\mathrm{demand}})`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Low Stock [urgency]

#### 1. 1. Inventory Fabrication
Original: `I_{\mathrm{displayed}}(x) \le \tau_{\mathrm{scarcity}} \quad \text{given} \quad I_{\mathrm{displayed}}(x) \ll I_{\mathrm{true}}(x)`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Alarm Salience of Scarcity Indicators
Original: `\mathrm{Hue}(N_{\mathrm{stock}}) \in [0^\circ, 30^\circ] \quad \land \quad \Delta\mathrm{Stock}_{\mathrm{actual}} = 0`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Verifiability of Stock-Level Quantifiers
Original: `\exists t_1, t_2 : |t_2 - t_1| < 60\text{s} \quad \land \quad Q_{\mathrm{stock}}(t_1) \neq Q_{\mathrm{stock}}(t_2) \quad \land \quad \neg\mathrm{HasTransaction}(t_1, t_2)`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Activity Messages [urgency]

#### 1. 1. Asynchronous Event Fabrication
Original: `M_{\mathrm{displayed}}(t) \neq \emptyset \quad \land \quad M_{\mathrm{displayed}}(t) \notin E_{\mathrm{real}}(t)`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Cognitive Interruption
Original: `\mathrm{Salience}(N_{\mathrm{activity}}) \to \mathrm{Max} \quad \land \quad \lambda_{\mathrm{interrupt}} > \tau_{\mathrm{cognitive\_load}} \implies S_{\mathrm{focus}} \to \mathrm{Disrupted}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Specificity of Activity-Notification Content
Original: `\mathrm{Specificity}(T_{\mathrm{activity}}) < \tau_{\mathrm{specificity}} \quad \land \quad \neg\exists \text{IdentityRef} \in T_{\mathrm{activity}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Countdown Timer [urgency]

#### 1. 1. Stateless Expiration
Original: `T_{\mathrm{expire}} = t_{\mathrm{load}} + \Delta t_{\mathrm{countdown}} \quad \implies \quad \text{Urgency is functionally synthetic}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Cognitive Compression
Original: `\Delta t_{\mathrm{timer}} < \tau_{\mathrm{deliberation}} \quad \implies \quad \mathrm{Probability}(\mathrm{Rational\_Evaluation}) \to 0`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Urgency Inflation via Temporal Lexemes
Original: `\mathrm{IsCountdown}(N) = \mathrm{True} \quad \land \quad |T_{\mathrm{adjacent}}(N) \cap L_{\mathrm{amplify}}| > 0`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Limited Time Message [urgency]

#### 1. 1. Perpetual Extension
Original: `t_{\mathrm{current}} \ge T_{\mathrm{end}}(i) \implies T_{\mathrm{end}}(i+1) = t_{\mathrm{current}} + \Delta t_{\mathrm{extension}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Salience of Temporal-Urgency Chromatics
Original: `\mathrm{Hue}(C_{\mathrm{offer}}) \in [0^\circ, 45^\circ] \quad \land \quad \mathrm{Match}(T(C_{\mathrm{offer}}), \mathrm{Pattern}_{\mathrm{temporal}}) = \mathrm{True}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Ambiguous Temporal Bounding
Original: `\mathrm{Specificity}(M_{\mathrm{urgency}}) \approx 0 \quad \land \quad T_{\mathrm{end}} \notin \mathrm{DOM} \implies \mathrm{Urgency_{perceived}} \to \mathrm{Max}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Price Comparison Prevention [misdirection]

#### 1. 1. Fiat Decoupling
Original: `T_{\mathrm{price}}(n) \neq \emptyset \quad \land \quad F_{\mathrm{convert}}(T_{\mathrm{price}}(n)) = \emptyset`
Operational reading: A price is shown without an available fiat conversion
Required atoms:
- A nonempty price token is visible in the complete relevant price scope.
- No fiat conversion function/label is present in that same scope.
Unknown when:
- The relevant price scope or conversion affordances are incomplete.
Direct counterevidence:
- A direct fiat conversion is available and visible in the relevant scope.
Do not infer:
- Do not treat an unfamiliar currency symbol as absence of conversion.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Suppression of Unit-Price Information
Original: `\frac{\mathrm{fontSize}(N_{\mathrm{unit}})}{\mathrm{fontSize}(N_{\mathrm{headline}})} < \tau_{\mathrm{suppress}} \quad \lor \quad \frac{\mathrm{CR}(N_{\mathrm{unit}}, L_{\mathrm{bg}})}{\mathrm{CR}(N_{\mathrm{headline}}, L_{\mathrm{bg}})} < \tau_{\mathrm{suppress}}`
Operational reading: Unit price is visually subordinate to the headline price
Required atoms:
- Unit-price and headline-price nodes are identified in the same state.
- The same font-size/contrast measurements are available for both nodes.
- At least one stated suppression ratio is below threshold.
Unknown when:
- One price node or comparable CSS/visual measurements are missing.
Direct counterevidence:
- Unit-price information meets the stated relative visibility threshold.
Do not infer:
- A small unit label is not suppression without the named headline comparison.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Omission of Comparison-Relevant Qualifiers
Original: `Q_{\mathrm{standard}} \cap Q_{\mathrm{rendered}} = \emptyset`
Operational reading: Comparison-relevant qualifiers are absent from the rendered price
Required atoms:
- The standard qualifier set for this price/product is known from the evidence.
- The rendered qualifier set is complete and comparable.
- Their intersection is empty.
Unknown when:
- The standard qualifier set cannot be established from the evidence.
Direct counterevidence:
- At least one relevant qualifier is rendered.
Do not infer:
- Do not assume a universal standard qualifier set.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Reference Pricing [misdirection]

#### 1. 1. Mathematical Exaggeration of Discount
Original: `\Delta_{\mathrm{pct}} = \frac{P_{\mathrm{ref}} - P_{\mathrm{cur}}}{P_{\mathrm{ref}}} \quad \implies \quad \Delta_{\mathrm{pct}} > \tau_{\mathrm{unrealistic}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Salience of Reference-Price Strikethrough
Original: `\mathrm{CR}(N_{\mathrm{ref}}, L_{\mathrm{bg}}) < \tau_{\mathrm{ref\_cr}} \quad \land \quad \frac{\mathrm{fontSize}(N_{\mathrm{current}})}{\mathrm{fontSize}(N_{\mathrm{ref}})} > \tau_{\mathrm{size\_skew}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Dual-Pricing Co-occurrence and Anchoring
Original: `P_{\mathrm{ref}} > P_{\mathrm{cur}} \quad \land \quad \mathrm{CSS}(N_{\mathrm{ref}}) \cap S_{\mathrm{strike}} \neq \emptyset`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Conflicting Information [misdirection]

#### 1. 1. Structural Proximity of Contradictory Factual Nodes
Original: `\exists t_1, t_2 \in \mathrm{Descendants}(C) : \mathrm{Prop}(t_1) \land \mathrm{Prop}(t_2) \implies \bot \quad \land \quad d_{\mathrm{DOM}}(t_1, t_2) < \tau_{\mathrm{proximity}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Semantic-Visual Mismatch
Original: `\mathrm{Intent}(L(B)) \cap \mathrm{Affordance}(C(B)) = \emptyset \quad \implies \quad \mathrm{Contradiction}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Mutually Exclusive Factual Claims
Original: `\exists t_1, t_2 \in N_{\mathrm{container}} : \mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Unsatisfiable}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Information Without Context [misdirection]

#### 1. 1. Structural Orphaned Nodes
Original: `d(N_{\mathrm{metric}}, N_{\mathrm{descriptor}}) > \tau_{\mathrm{orphan}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Prominence Imbalance Between Metric and Baseline
Original: `\frac{W(N_{\mathrm{metric}})}{W(N_{\mathrm{context}})} > \tau_{\mathrm{context\_imbalance}} \quad \land \quad \mathrm{CR}(N_{\mathrm{metric}}, L_{\mathrm{bg}}) > 7.0`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Unanchored Quantitative Metrics
Original: `v \in N_{\mathrm{info}} \quad \land \quad (U_{\mathrm{val}} \notin S_{\mathrm{cluster}} \lor B_{\mathrm{val}} \notin S_{\mathrm{cluster}})`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### False Hierarchy [misdirection]

#### 1. 1. Structural Element Downgrading
Original: `\mathrm{Tag}(B_{\mathrm{business}}) = \texttt{<button>} \quad \land \quad \mathrm{Tag}(B_{\mathrm{user}}) = \texttt{<a>} \quad \land \quad S_{\mathrm{padding}}(B_{\mathrm{user}}) \approx 0`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Relational Visual Weight Disparity
Original: `W(x) = \alpha \cdot A(x) + \beta \cdot C(x) + \gamma \cdot F(x)`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Strict Semantic Opposition
Original: `\exists \mathrm{Intent}(L(B_{1})) \equiv \neg \mathrm{Intent}(L(B_{2}))`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Visual Prominence [misdirection]

#### 1. 1. Structural Asymmetry in DOM Subtree Weight
Original: `\frac{|\mathrm{Desc}(N_{\mathrm{favorable}})|}{\mathrm{median}_{s \in \mathrm{Siblings}(N_{\mathrm{favorable}})} |\mathrm{Desc}(s)|} > \tau_{\mathrm{subtree\_bloat}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Absolute Bounding Box Dominance
Original: `\frac{A(N_{\mathrm{favorable}})}{A(E_{\mathrm{baseline}})} > \tau_{\mathrm{area}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Neutrality of Dominant Action Labels
Original: `|\mathrm{Sent}(L(N_{\mathrm{favorable}}))| > 0.5 \quad \lor \quad L(N_{\mathrm{favorable}}) \cap D_{\mathrm{coercion}} \neq \emptyset`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Persuasive Language [misdirection]

#### 1. 1. Structural Density of Event Listeners on Coercive Text Nodes
Original: `\frac{|E(N_{\mathrm{coercive}})|}{|E(N_{\mathrm{neutral}})|} > \tau_{\mathrm{listener\_skew}}`
Operational reading: Coercive text has greater event-listener density than neutral text
Required atoms:
- Coercive and neutral comparison text nodes are identified.
- Event-listener counts are directly exposed for both nodes.
- The ratio exceeds the stated threshold.
Unknown when:
- Event handlers are not exposed by the DOM/evidence bundle.
Direct counterevidence:
- The ratio does not exceed the threshold.
Do not infer:
- Text tone or clickability alone cannot establish listener-density asymmetry.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Emphasis Asymmetry on Coercive Text
Original: `\frac{\mathrm{fontWeight}(N_{\mathrm{coercive}})}{\mathrm{fontWeight}(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}} \quad \lor \quad \frac{A(N_{\mathrm{coercive}})}{A(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}}`
Operational reading: Coercive text is more visually emphasized than neutral text
Required atoms:
- Coercive and neutral comparison text nodes are identified in the same state.
- Font-weight and/or area measurements are comparable.
- At least one stated emphasis ratio exceeds threshold.
Unknown when:
- The neutral comparator or CSS/area measurement is unavailable.
Direct counterevidence:
- No stated emphasis ratio is exceeded.
Do not infer:
- Negative or urgent wording without a visual comparator is insufficient.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Truth-Conditional Satisfiability
Original: `\mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Satisfiable}`
Operational reading: Satisfiable claims are counterevidence, not a trigger
Required atoms:
- The relevant claims are identified and their semantic relation is evaluated.
- The claims are jointly satisfiable under the displayed context.
Unknown when:
- The propositions or their semantic relation are not clear.
Direct counterevidence:
- Claims are mutually inconsistent or unsatisfiable.
Do not infer:
- Satisfiability cannot itself support a deceptive verdict.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: counterevidence

### Cuteness [misdirection]

#### 1. 1. Structural Conditional Injection of Affective Assets
Original: `I_{\mathrm{affective}} \cap \mathrm{DOM}(s_{\mathrm{onboard}}) = \emptyset \quad \land \quad I_{\mathrm{affective}} \subset \mathrm{DOM}(s_{\mathrm{cancel}})`
Operational reading: Affective assets appear in cancellation but not onboarding DOM
Required atoms:
- The onboarding and cancellation states are identified and aligned.
- The affective asset is absent from onboarding DOM and present in cancellation DOM.
Unknown when:
- The relevant states or DOM asset identity cannot be matched.
Direct counterevidence:
- The asset is present in both states or absent from both.
Do not infer:
- Do not infer conditional injection from different screenshots without matching DOM state IDs.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Context-Dependent Image Injection
Original: `I_{\mathrm{affective}} \notin I(s_{\mathrm{onboard}}) \quad \land \quad I_{\mathrm{affective}} \in I(s_{\mathrm{cancel}})`
Operational reading: Affective image appears only in the cancellation context
Required atoms:
- The onboarding and cancellation image sets are identified and aligned.
- The affective image is absent from onboarding and present in cancellation.
- The image identity is matched across the two states.
Unknown when:
- Image identity or state alignment is uncertain.
Direct counterevidence:
- The image is not context-dependent under the stated comparison.
Do not infer:
- A general mascot image is not a context-dependent injection.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Pairing of Guilt
Original: `\mathrm{Affect}(N_{\mathrm{text}}) > \tau_{\mathrm{guilt}} \quad \land \quad d_{\mathrm{spatial}}(N_{\mathrm{text}}, i) < \delta_{\mathrm{proximity}}`
Operational reading: Guilt-inducing text is spatially paired with an affective image
Required atoms:
- Affect score exceeds the threshold for the relevant text.
- The affective text and image are spatially within the stated proximity.
Unknown when:
- Affect score or spatial relationship is not available.
Direct counterevidence:
- The text is neutral or not spatially paired with the image.
Do not infer:
- Cute imagery without guilt language is not this condition.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Positive Or Negative Framing [misdirection]

#### 1. 1. Structural Asymmetry of Framed Option Subtrees
Original: `\frac{|T_{\mathrm{gain}} \setminus T_{\mathrm{loss}}|}{|T_{\mathrm{gain}} \cup T_{\mathrm{loss}}|} > \tau_{\mathrm{frame\_structure}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Weight Asymmetry Between Framing Poles
Original: `\max\left(\frac{W(F_{\mathrm{gain}})}{W(F_{\mathrm{loss}})}, \frac{W(F_{\mathrm{loss}})}{W(F_{\mathrm{gain}})}\right) > \tau_{\mathrm{frame\_asymmetry}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Identification of Mutually Exclusive Vectors
Original: `A(B_{\mathrm{opt\_in}}) \equiv \neg A(B_{\mathrm{opt\_out}})`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Choice Overload [misdirection]

#### 1. 1. Excessive Element Quantization
Original: `|C_{\mathrm{choices}}| > \tau_{\mathrm{overload}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Density of Interactive Decision Elements
Original: `\rho = \frac{n_{\mathrm{interactive}}}{A_{\mathrm{viewport}}} > \tau_{\mathrm{density}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Similarity Collapse Among Options
Original: `\frac{1}{|C|(|C|-1)} \sum_{i \neq j} \mathrm{sim}(T_i, T_j) > \tau_{\mathrm{similarity}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Plain Evil (Theoretical Construct) [misdirection]

#### 1. 1. Dark Pattern Singularity
Original: `\sum_{i=1}^{n} \mathrm{Active}(D_i, M_{\mathrm{context}}) \ge \tau_{\mathrm{hostility}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Hostility Density Index
Original: `H = \frac{\sum_{i} \mathbb{1}_{\mathrm{hostile}}(N_i) \cdot w_i}{A_{\mathrm{viewport}}} > \tau_{\mathrm{hostility}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Hostility Density Score
Original: `\|H_{\mathrm{sem}}\|_2 = \sqrt{\rho_{\mathrm{coerce}}^2 + \sigma_{\mathrm{FKGL}}^2 + \sigma_{\mathrm{sent}}^2 + \rho_{\mathrm{connot}}^2} > \tau_{\mathrm{hostile\_sem}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Endorsement And Testimonials [misdirection]

#### 1. 1. Statistical Implausibility
Original: `\mathrm{Mean}(S(R_{\mathrm{total}})) \approx 5.0 \quad \land \quad \mathrm{Var}(S(R_{\mathrm{total}})) \approx 0 \implies D_{\mathrm{rendered}} \neq D_{\mathrm{organic}}`
Operational reading: Review distribution is uniform-looking and requires provenance checking
Required atoms:
- The complete displayed review-score distribution is available.
- Mean and variance meet the stated approximate values.
- A separate provenance observation is available before claiming rendered/organic mismatch.
Unknown when:
- Review distribution or provenance cannot be observed.
Direct counterevidence:
- The distribution does not meet the stated values or provenance is directly established as organic.
Do not infer:
- A near-perfect average does not prove fabrication by itself.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Verifiability of Testimonial Attribution
Original: `\exists C_{\mathrm{testimonial}} : \neg\exists N_{\mathrm{attribution}} \in \mathrm{Descendants}(C_{\mathrm{testimonial}})`
Operational reading: A testimonial has no attribution in its complete container DOM
Required atoms:
- A testimonial container is identified and its descendant DOM is completely inspected.
- No attribution node is present in that container.
Unknown when:
- The testimonial container or descendant DOM is incomplete.
Direct counterevidence:
- An attribution node is present.
Do not infer:
- Absence of a visible avatar is not absence of attribution.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Provenance Obfuscation
Original: `\mathrm{Similarity}(I_{\mathrm{avatar}}(P_i), I_{\mathrm{stock\_database}}) \approx 1 \quad \lor \quad \mathrm{Similarity}(T_{\mathrm{text}}(r_i), T_{\mathrm{text}}(r_j)) > \tau_{\mathrm{template}}`
Operational reading: Testimonial avatar or text matches a stock/template source
Required atoms:
- A testimonial instance and comparison source are identified.
- The stated image or text similarity threshold is met.
- The similarity result is treated as provenance evidence, not proof of deception without context.
Unknown when:
- A stock database, comparison corpus, or similarity measure is unavailable.
Direct counterevidence:
- The stated similarity threshold is not met.
Do not infer:
- Generic wording or a common avatar alone does not prove copied provenance.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Confirmshaming [misdirection]

#### 1. 1. Structural Asymmetry in Decline-Option Accessibility
Original: `\mathrm{Tag}(N_{\mathrm{decline}}) \notin \{\texttt{<button>}, \texttt{[role=\"button\"]}\} \quad \land \quad \mathrm{Tag}(N_{\mathrm{accept}}) = \texttt{<button>}`
Operational reading: Decline is not exposed as an equivalent interactive control
Required atoms:
- Accept and decline nodes are identified in the same state.
- The decline node is not a button/equivalent button role while accept is.
Unknown when:
- The control semantics are not exposed.
Direct counterevidence:
- Both choices expose equivalent interactive semantics.
Do not infer:
- Different HTML tags are insufficient if accessibility semantics are equivalent.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Hierarchy Subversion
Original: `\mathrm{Vis}(N_{\mathrm{accept}}) \gg \mathrm{Vis}(N_{\mathrm{decline}}) \quad \land \quad \mathrm{Vis}(N_{\mathrm{decline}}) \to \tau_{\mathrm{minimum\_accessibility}}`
Operational reading: Decline is visually subordinated below the stated accessibility threshold
Required atoms:
- Accept and decline visual nodes are identified in the same state.
- Their relative visibility is observed and exceeds the stated disparity.
- Decline visibility meets the stated minimum-accessibility failure condition.
Unknown when:
- Relative visibility or the minimum threshold is not measurable.
Direct counterevidence:
- Decline is comparably visible and accessible.
Do not infer:
- A text link is not automatically shaming without the relative comparison.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Asymmetry
Original: `S_{\mathrm{sentiment}}(N_{\mathrm{accept}}) > 0 \quad \land \quad S_{\mathrm{sentiment}}(N_{\mathrm{decline}}) \ll 0`
Operational reading: Accept language is positive while decline language is negative
Required atoms:
- Accept and decline labels are identified as the opposing choices.
- Their sentiment values meet the stated positive/negative relationship.
Unknown when:
- Choice roles or sentiment cannot be reliably determined.
Direct counterevidence:
- Decline language is neutral/respectful or accept language is not positive under the stated measure.
Do not infer:
- A negative product consequence is not the same as a negative label aimed at the user.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Psychological Tricks [misdirection]

#### 1. 1. Asymmetric Dominance
Original: `V(O_{\mathrm{target}}) \gg V(O_{\mathrm{decoy}}) \quad \land \quad \mathrm{Cost}(O_{\mathrm{target}}) \approx \mathrm{Cost}(O_{\mathrm{decoy}}) \implies P_{\mathrm{select}}(O_{\mathrm{target}}) \to \mathrm{Max}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Cognitive Overload
Original: `|C_{\mathrm{matrix}}| \gg \tau_{\mathrm{fatigue}} \quad \implies \quad \lim_{t \to \infty} P_{\mathrm{select}}(D_{\mathrm{favorable}}) = 1`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Reference Point Obfuscation
Original: `P_{\mathrm{anchor}} \gg P_{\mathrm{actual}} \quad \implies \quad \mathrm{WTP}(U_{\mathrm{anchored}}) > \mathrm{WTP}(U_{\mathrm{baseline}})`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Pressured Selling [nagging]

#### 1. 1. Transactional Flow Interruption
Original: `\mathrm{Click}(B_{\mathrm{proceed}}) \implies \mathrm{Visibility}(M_{\mathrm{upsell}}) = \mathrm{True} \quad \land \quad s_{\mathrm{final}} \notin S_{\mathrm{current}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Localized Temporal or Visual Constraints
Original: `\Delta t_{\mathrm{offer}} < \tau_{\mathrm{panic\_duration}} \quad \lor \quad (\mathrm{CSS}(M_{\mathrm{upsell}}) \cap V_{\mathrm{animations}} \neq \emptyset)`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. High-Arousal Lexical Density
Original: `\frac{|W(M) \cap D_{\mathrm{pressure}}|}{|W(M)|} > \tau_{\mathrm{arousal}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Small or Moving Close Button [interface-interference]

#### 1. 1. Structural Event-Listener Commandeering on Dismissal Vectors
Original: `\mathrm{IsIntercepted}(N_{\mathrm{close}}) = \mathrm{True} \quad \lor \quad \Delta t_{\mathrm{rebind}}(N_{\mathrm{close}}) < \tau_{\mathrm{rebind}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Microscopic Hitbox
Original: `A(N_{\mathrm{close}}) < \tau_{\mathrm{wcag\_hitbox}} \quad \lor \quad \frac{A(N_{\mathrm{close}})}{A(M_{\mathrm{parent}})} < \delta_{\mathrm{micro}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Obfuscation of Dismissal Labels
Original: `\mathrm{AccessibleName}(N_{\mathrm{close}}) = \emptyset \quad \lor \quad \mathrm{Intent}(\mathrm{AccessibleName}(N_{\mathrm{close}})) \neq \mathrm{Dismissal}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Bad Defaults / Preselection [interface-interference]

#### 1. 1. Pre-initialized Activation State
Original: `\exists c \in C : \mathrm{State}(c, t_0) = \mathrm{True} \quad \land \quad \mathrm{UserEvents}(c, t_0) = \emptyset`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual or Structural Obfuscation
Original: `V(c, t_0) = \mathrm{False} \quad \lor \quad d_{\mathrm{spatial}}(c, N_{\mathrm{submit}}) > \tau_{\mathrm{peripheral\_vision}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Intent of the Default Action
Original: `\mathrm{Intent}(L(c)) \in \{D_{\mathrm{privacy\_loss}}, D_{\mathrm{financial\_cost}}, D_{\mathrm{marketing\_opt\_in}}\}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Trick Questions [interface-interference]

#### 1. 1. Structural Label-Input Semantic Mismatch
Original: `\mathrm{SemanticDist}(L_{\mathrm{aria}}(N), L_{\mathrm{visual}}(N)) > \tau_{\mathrm{label\_mismatch}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Affordance-Consequence Mismatch
Original: `(\mathrm{State}(c) = \mathrm{True}) \implies (\mathrm{Intent}(L(c)) \in D_{\mathrm{deny}})`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Syntactic Obfuscation via Multiple Negations
Original: `N_{\mathrm{neg}}(L(c)) \geq 2 \quad \implies \quad \mathrm{Linguistic \: Obfuscation}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Wrong Language [interface-interference]

#### 1. 1. Asymmetric State Application
Original: `\mathbb{L}(S_{\mathrm{acquisition}}) = \{L_{\mathrm{session}}\} \quad \land \quad \mathbb{L}(S_{\mathrm{termination}}) \setminus \{L_{\mathrm{session}}\} \neq \emptyset`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual-Linguistic Locale Mismatch
Original: `L_{\mathrm{DOM}}(N_{\mathrm{critical}}) \neq L_{\mathrm{browser}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Localized Linguistic Discrepancy
Original: `\mathrm{Lang}(N_{\mathrm{critical}}) \neq L_{\mathrm{session}} \quad \land \quad \mathrm{Confidence}(\mathrm{Lang}(N_{\mathrm{critical}})) > \tau_{\mathrm{lang\_id}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Complex Language [interface-interference]

#### 1. 1. Structural Nesting Depth of Legal/Technical Text Nodes
Original: `D_{\mathrm{DOM}}(N_{\mathrm{complex}}) > \tau_{\mathrm{legal\_depth}} \quad \lor \quad \frac{1}{|N_{\mathrm{complex}}|} \sum_{n} |\mathrm{text}(n)| > \tau_{\mathrm{clause\_length}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Density of Legalese Text Blocks
Original: `\frac{\mathrm{fontSize}(N_{\mathrm{complex}})}{S_{\mathrm{base}}} < \tau_{\mathrm{shrink}} \quad \land \quad \mathrm{FKGL}(N_{\mathrm{complex}}) > 12`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Exceedance of Baseline Readability Indices
Original: `\mathrm{FKGL}(N_{\mathrm{text}}) > \tau_{\mathrm{education\_limit}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Feedforward Ambiguity [interface-interference]

#### 1. 1. Structural Ambiguity of Action-Outcome Mapping
Original: `\exists N \in \mathrm{Interactive} : \mathrm{Distance}(\mathrm{Expect}(L(N)), \mathrm{Resolve}(N)) > \tau_{\mathrm{feedforward}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Iconographic Entropy and Missing Affordances
Original: `H(\mathrm{CV}_{\mathrm{class}}(N_{\mathrm{icon}})) > \tau_{\mathrm{entropy}} \quad \land \quad T_{\mathrm{hover}} = \emptyset`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Divergence of Action and Outcome
Original: `\mathrm{Sim}(\mathrm{Intent}_{\mathrm{NLP}}(L(n)), \mathrm{Outcome}_{\mathrm{System}}(n)) < \tau_{\mathrm{clarity}} \quad \land \quad \mathrm{Outcome}_{\mathrm{System}}(n) \in D_{\mathrm{critical}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Forced Registration [forced-action]

#### 1. 1. Absolute State Blocking
Original: `\forall \pi \in \mathrm{Paths}(S_{\mathrm{intent}} \to S_{\mathrm{terminal}}) : S_{\mathrm{auth}} \in \pi`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Degradation of the Guest Checkout Pathway
Original: `\frac{W(N_{\mathrm{guest}})}{W(N_{\mathrm{register}})} < \tau_{\mathrm{guest\_visibility}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Framing of the Guest-Checkout Option
Original: `\mathrm{Sent}(L(N_{\mathrm{guest}})) < \tau_{\mathrm{guest\_sent}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Social Pyramid [forced-action]

#### 1. 1. Referral-Gated Progression
Original: `\mathrm{Access}(U_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad |R_{\mathrm{user}}| < k`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Prominence of Referral-Progress Gamification
Original: `\frac{A(N_{\mathrm{referral\_progress}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{gamification}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Escalation of Referral-Reward Language
Original: `\frac{\Delta \mathrm{Intensity}(\mathrm{Reward}_n)}{\Delta \mathrm{Intensity}(\mathrm{Reward}_{n-1})} > \tau_{\mathrm{escalation}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Granting and Interaction [forced-action]

#### 1. 1. Interaction Gating
Original: `\mathrm{State}(I_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad (P_{\mathrm{requested}} = \mathrm{False} \quad \land \quad \mathrm{Dep}(I_{\mathrm{core}}, P_{\mathrm{requested}}) = \emptyset)`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Asynchronous Overlay Misdirection
Original: `\mathrm{Pos}(M_{\mathrm{system\_prompt}}, t) \approx \mathrm{Pos}(B_{\mathrm{benign}}, t) \quad \text{as} \quad t \to t_{\mathrm{interaction}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Scope Creep in Permission Requests
Original: `|\mathrm{Perms}_{\mathrm{actual}} \setminus \mathrm{Perms}_{\mathrm{disclosed}}| > 0`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Pay-To-Play [forced-action]

#### 1. 1. Exponential Friction and Paid Bypass
Original: `E_{\mathrm{free}}(L_i) \propto c^i \quad (c > 1) \quad \land \quad E_{\mathrm{paid}}(L_i) = \mathcal{O}(1)`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Dominance of Payment-Unlock Overlays
Original: `\frac{A(O_{\mathrm{unlock}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{occlusion}} \quad \lor \quad A(N_{\mathrm{dismiss}}) < 44 \times 44`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Framing of Payment as Unlock
Original: `\mathrm{Frame}(T_{\mathrm{payment}}) \in \{\text{Unlock}, \text{Discover}, \text{Enhance}\} \quad \land \quad \mathrm{Frame}(T_{\mathrm{payment}}) \neq \mathrm{Transaction}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Grinding [forced-action]

#### 1. 1. Exponential Effort Scaling
Original: `E(L_i \to L_{i+1}) \propto c^i \quad (c > 1) \quad \land \quad V(L_{i+1}) \approx V(L_i) + k`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Diminishing-Returns Feedback Loop
Original: `\frac{\Delta P_{k}}{\Delta P_{1}} < e^{-\lambda(k-1)} \quad \land \quad \frac{d^2 P}{di^2} < 0`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Attenuation of Progress-Milestone Language
Original: `\Delta a_i = \mathrm{Pos}(\mathrm{Milestone}_{i}) - \mathrm{Pos}(\mathrm{Milestone}_{i-1}) \quad \land \quad \frac{d\Delta a}{di} > 0`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Playing By Appointment [forced-action]

#### 1. 1. Temporal Gating
Original: `\mathrm{State}(A_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{until} \quad t \ge t_{\mathrm{depletion}} + \tau_{\mathrm{refill}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Prominence of Temporal-Gating Indicators
Original: `\frac{A(N_{\mathrm{temporal}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{appointment}} \quad \lor \quad \mathrm{Saturation}(N_{\mathrm{temporal}}) > 0.8`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Urgency Encoding in Temporal-Gating Messages
Original: `\mathrm{Urgency}(T_{\mathrm{temporal}}) > \tau_{\mathrm{appointment\_urgency}} \quad \land \quad T_{\mathrm{temporal}} \cap L_{\mathrm{scarcity}} \neq \emptyset`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Watch Ads To Unlock Features Or Get Rewards [forced-action]

#### 1. 1. Attention as Transactional Currency
Original: `\int_{0}^{\Delta t_{\mathrm{ad}}} E_{\mathrm{playback}}(t) \, dt = \Delta t_{\mathrm{ad}} \implies \mathrm{State}(R_{\mathrm{target}}) \to \mathrm{Unlocked}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Mismatch Between Reward Progress Display and Actual Progress
Original: `P_{\mathrm{visual}} - P_{\mathrm{actual}} > \tau_{\mathrm{mislead}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Inflation of Reward Value
Original: `\mathrm{Hyperbole}(T_{\mathrm{reward}}) - \mathrm{Utility}(R_{\mathrm{actual}}) > \tau_{\mathrm{hype\_gap}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Pay To Avoid [forced-action]

#### 1. 1. Artificial State Degradation
Original: `U_{\mathrm{default}} = U_{\mathrm{system}} - D_{\mathrm{artificial}} \quad \land \quad U_{\mathrm{default}} \ll U_{\mathrm{system}}`
Operational reading: The default state is materially degraded by an artificial penalty
Required atoms:
- Default and system/reference utility states are identified for the same feature.
- The artificial degradation term is observed or explicitly represented.
- The stated utility inequality is met.
Unknown when:
- Utility reference, degradation cause, or comparable states are unavailable.
Direct counterevidence:
- The default state is not materially degraded or the feature is inherently unavailable.
Do not infer:
- A paid upgrade is not automatically pay-to-avoid without an artificial default penalty.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Occupancy of the Pain-Point Element
Original: `\frac{A(N_{\mathrm{pain}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{pain}}`
Operational reading: Pain-point element occupies more than the stated viewport share
Required atoms:
- The pain-point element is identified in the same viewport as its denominator.
- Its area ratio exceeds the stated threshold.
Unknown when:
- Element bounds or viewport denominator is unavailable.
Direct counterevidence:
- The area ratio does not exceed threshold.
Do not infer:
- Large size alone is not deception without the pattern's artificial-degradation context.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Pain-Point Amplification
Original: `\frac{d}{dt} \lambda_{\mathrm{friction}}(t) > 0 \quad \implies \quad P(N_{\mathrm{prompt}} \mid \lambda_{\mathrm{friction}}) \approx 1`
Operational reading: Observed friction increases and is followed by a payment prompt
Required atoms:
- At least two aligned states expose a measurable increase in friction.
- The payment prompt appears after that increase in the observed path.
Unknown when:
- Friction change, temporal order, or prompt transition is not observable.
Direct counterevidence:
- No increase precedes the prompt or the prompt is unrelated to the feature.
Do not infer:
- The probability conclusion is not observable evidence; use the event sequence instead.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Automating The User Away [forced-action]

#### 1. 1. Autonomous Action Execution
Original: `A_{\mathrm{critical}} = \mathrm{Executed} \quad \text{given} \quad E_{\mathrm{user}} = \emptyset \quad \land \quad t \ge \tau_{\mathrm{system}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Omission of the Interrupt Vector
Original: `B_{\mathrm{cancel}} \notin \mathrm{DOM}(t) \quad \lor \quad \Delta t_{\mathrm{warning}} < \tau_{\mathrm{reaction}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Speed of Consent-Timing Language
Original: `t_{\mathrm{window}} < 2.0 \quad \land \quad \mathrm{SemanticType}(T_{\mathrm{prompt}}) = \mathrm{TimedConsent}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Parasocial Pressure [forced-action]

#### 1. 1. Manufactured Livelihood Dependency
Original: `T_{\mathrm{fiat}} = 0 \implies \mathrm{State}(I_{\mathrm{creator}}) \to \mathrm{Failure} \quad \text{asserted within} \quad M_{\mathrm{pitch}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Proximity of Anthropomorphic Imagery to Action Prompts
Original: `\min_{i \in I_{\mathrm{face}}} d_{\mathrm{spatial}}(i, N_{\mathrm{prompt}}) < \tau_{\mathrm{social}} \quad \land \quad \frac{A(i)}{A_{\mathrm{viewport}}} > 0.05`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Emotional Asymmetry
Original: `E_{\mathrm{user}} = \mathrm{Refusal} \implies \frac{d}{dt} V_{\mathrm{emotion}}(A_{\mathrm{mascot}}) \to -1`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Encouraging Anti-Social Behavior [forced-action]

#### 1. 1. Reward-Coupled Social Externality
Original: `A_{\mathrm{antisocial}} \implies (V_{\mathrm{reward}} > 0 \quad \land \quad E_{\mathrm{externality}} \gg 0)`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Visual Framing of Competitive Antagonism
Original: `\mathrm{LayoutType}(C_{\mathrm{container}}) = \mathrm{Competitive} \quad \land \quad \mathrm{SplitRatio} \approx 0.5`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Algorithmic Amplification of Outrage
Original: `V_{\mathrm{visibility}}(M) \propto P_{\mathrm{polarity}}(M) \quad \implies \quad \text{Systemic Incentive for Hostility}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Addictive Design [attention-manipulation]

#### 1. 1. Infinite Frictionless Continuation
Original: `Y_{\mathrm{max}}(t) - Y_{\mathrm{scroll}}(t) < \tau_{\mathrm{buffer}} \quad \implies \quad E_{\mathrm{append}} = \mathrm{True}`
Operational reading: Near-end scrolling triggers observed content append
Required atoms:
- The viewport is observed near the document end under the stated buffer.
- A fetch/append transition is observed after the near-end state.
- The append is repeated or the evidence otherwise supports continuation beyond the prior end.
Unknown when:
- Only a static near-end screenshot exists without an append transition.
Direct counterevidence:
- A stable document end or stopping boundary is observed.
Do not infer:
- The limit statement is a definition, not proof that the captured interface appended content.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Eradication of Natural Stopping Cues
Original: `\forall e \in E_{\mathrm{stop}} : \mathrm{Visible}(e, t) = \mathrm{False} \quad \lor \quad \frac{A(e)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \quad \lor \quad \mathrm{CR}(e, L_{\mathrm{bg}}) < 3.0`
Operational reading: Stopping cues are absent or below threshold in the inspected state
Required atoms:
- The relevant stopping-cue set is defined for the inspected interface.
- Every relevant cue fails visibility/area/contrast in the same state(s).
Unknown when:
- The complete stopping-cue set or session-duration claim is unavailable.
Direct counterevidence:
- A clear stopping cue is visible at the stated threshold.
Do not infer:
- Long engagement or psychological dependence cannot be inferred from a static screenshot.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Reinforcement-Trigger Lexicon Density
Original: `\frac{|\{w \in T : w \in L_{\mathrm{reinforcement}}\}|}{A_{\mathrm{viewport}}} > \tau_{\mathrm{addiction}}`
Operational reading: Reinforcement lexemes exceed the stated density in the viewport
Required atoms:
- The relevant viewport text and reinforcement lexicon are available.
- The stated normalized density exceeds threshold.
Unknown when:
- The viewport text or lexicon denominator is incomplete.
Direct counterevidence:
- The density does not exceed the threshold.
Do not infer:
- Lexical density is an observable signal, not proof of addiction or user harm.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Infinite Scrolling [attention-manipulation]

#### 1. 1. Autonomous Content Injection
Original: `Y_{\mathrm{document\_end}} - Y_{\mathrm{viewport}} \leq \tau_{\mathrm{trigger}} \quad \implies \quad E_{\mathrm{fetch}}() = \mathrm{True}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. The Unreachable Footer
Original: `v_{\mathrm{scroll}} > 0 \quad \implies \quad \frac{d}{dt} \mathrm{Pos}_{y}(N_{\mathrm{footer}}, t) \geq v_{\mathrm{scroll}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Attenuation of Content Boundaries
Original: `\neg\exists n \in N_{\mathrm{feed}} : \mathrm{Match}(T(n), \mathrm{Pattern}_{\mathrm{boundary}}) = \mathrm{True}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Pull To Refresh (Variable-Reward Trap) [attention-manipulation]

#### 1. 1. Kinesthetic Resistance and Action Commitment
Original: `\Delta Y_{\mathrm{touch}}(t) \geq \tau_{\mathrm{commit}} \quad \land \quad R_{\mathrm{elastic}} > 0 \quad \implies \quad E_{\mathrm{refresh}}() = \mathrm{True}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every premise and stated consequence as a required observed atom; do not evaluate the implication materially or vacuously.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Artificial Anticipation Injection
Original: `\Delta t_{\mathrm{animation}} \gg \Delta t_{\mathrm{network}} \quad \land \quad \Delta t_{\mathrm{animation}} \geq \tau_{\mathrm{suspense}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Variability of Refresh-Outcome Messaging
Original: `\sigma^2(\{\mathrm{Novelty}(T_i) : i = 1 \ldots k\}) > \tau_{\mathrm{slot\_machine}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Countdown On Ads [attention-manipulation]

#### 1. 1. Temporal Gating of Navigational Agency
Original: `\mathrm{State}(B_{\mathrm{skip}}, t_{\mathrm{active}}) = \mathrm{Disabled} \quad \text{given} \quad t_{\mathrm{active}} < \tau_{\mathrm{lock}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Dynamic Affordance Injection
Original: `N_{\mathrm{close}} \notin \mathrm{DOM}(t) \quad \forall t < \tau_{\mathrm{lock}} \quad \land \quad N_{\mathrm{close}} \in \mathrm{DOM}(\tau_{\mathrm{lock}})`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Framing of Ad-Watching as Exchange
Original: `\mathrm{Frame}(T_{\mathrm{ad\_context}}) \in \{\text{Reward}, \text{Offer}, \text{Bonus}\} \quad \land \quad \mathrm{UserAction} = \mathrm{ForcedViewing}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

### Auto-Play [attention-manipulation]

#### 1. 1. Autonomous Media Execution
Original: `S_{\mathrm{play}}(M_{\mathrm{media}}) = \mathrm{True} \quad \text{given} \quad E_{\mathrm{intent}} = \emptyset \quad \land \quad \mathrm{Intersection}(M_{\mathrm{media}}, \mathrm{Viewport}) > \tau_{\mathrm{visible}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 2. 2. Affordance Suppression
Original: `\mathrm{Visibility}(B_{\mathrm{cancel}}) \to 0 \quad \lor \quad \mathrm{Cost}(S_{\mathrm{play}} \to \mathrm{False}) \gg 1`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

#### 3. 3. Semantic Framing of Auto-Play as Content Continuation
Original: `\mathrm{Frame}(T_{\mathrm{autoplay}}) \in \{\text{Continuation}, \text{Next}\} \quad \land \quad \neg\exists \text{``autoplay''} \in T_{\mathrm{visible}}`
Operational reading: Strict observable evaluation of the original predicate
Required atoms:
- Every atomic clause in the original formula is identified and evaluated in the stated scope.
Unknown when:
- Any referenced variable, threshold, comparator, transition, or set is not directly available.
Direct counterevidence:
- A directly observed atom contradicts a mandatory requirement.
Do not infer:
- Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping.
- Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue.
Status rule: TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.
Polarity: trigger

