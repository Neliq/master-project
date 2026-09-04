# Run 7 compact predicate cards

These cards are a compact extraction of the unchanged Run 6 ontology.
Every FORMULA and GIVEN line is copied from `run6-multimodal/ontology.md`;
no definition, threshold, or counterexample is added. The cards are a
retrieval-oriented presentation for the auditor, not a replacement ontology.

## Decision discipline

1. First complete the evidence ledger for every aligned state using vision, DOM, and semantic text.
2. Evaluate only the predicates on the relevant card; preserve the displayed AND/OR logic.
3. Record every predicate as TRUE, FALSE, or UNKNOWN with a state and evidence location.
4. Apply only the escape clauses listed on that card; do not apply all global escapes automatically.
5. UNKNOWN is not BENIGN and is not DECEPTIVE. Keep it explicit in the ledger and follow the pre-registered binary mapping in the audit prompt.
6. A semantic resemblance or a single keyword is not formula satisfaction.

## Pattern-specific escape clauses

- **E1** — relative scale/visual comparison.
- **E2** — disclosure before commitment.
- **E3** — qualified statistics and denominators.
- **E4** — real deadlines and anchored time.
- **E5** — unobservable mechanism remains UNKNOWN.
- **E6** — visible qualifiers and contextual narrative.

## Cards

### Immortal Accounts [obstruction]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Asymmetrical Navigational Depth
FORMULA: \frac{N(x_{\mathrm{delete}})}{N(x_{\mathrm{create}})} > \delta
#### 2. 2. Visual Accessibility of Offboarding Vectors
FORMULA: \frac{A(N_{\mathrm{delete}})}{A(N_{\mathrm{create}})} < \tau_{\mathrm{exit\_visibility}}
#### 3. 3. Absolute Absence of Deletion Vectors
FORMULA: K_{\mathrm{del}} \cap T_{\mathrm{DOM}} = \emptyset

### Dead End [obstruction]
Applicable escapes: E1, E2, E3, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Topological Sink in the Navigational Graph
FORMULA: \forall e \in E_{\mathrm{out}}(v_{\mathrm{current}}), \text{target}(e) \in V_{\mathrm{forced}} \implies \text{No Escape Path}
#### 2. 2. Visual Absence of Dismissal Vectors
FORMULA: C_{\mathrm{dismiss}} = \emptyset \quad \land \quad \text{IsOverlay}(v_{\mathrm{current}}) = \mathrm{True}
#### 3. 3. Semantic Coercion Density in Trapped States
FORMULA: \frac{|\{\text{Imperative}(w) \lor \text{Urgency}(w) : w \in T(v_{\mathrm{trap}})\}|}{|T(v_{\mathrm{trap}})|} > \tau_{\mathrm{coercion}}

### Forced Grace Period [obstruction]
Applicable escapes: E1, E2, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Temporal Discrepancy Extraction
FORMULA: T_{\mathrm{execute}} - T_{\mathrm{request}} \geq \Delta t_{\mathrm{min}}
#### 2. 2. Visual Conspicuity of Cancellation Affordance
FORMULA: \frac{S(N_{\mathrm{cancel}})}{S(N_{\mathrm{confirm}})} < \delta_{\mathrm{salience}}
#### 3. 3. Semantic Proximity of Reversal
FORMULA: \min_{k \in K_{\mathrm{revert}}, e \in E_{\mathrm{time}}} d(k, e) < \tau_{\mathrm{words}}

### Privacy Maze [obstruction]
Applicable escapes: E1, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Asymmetrical Path Depth
FORMULA: d(v_{\mathrm{start}}, v_{\mathrm{reject\_all}}) > d(v_{\mathrm{start}}, v_{\mathrm{accept\_all}}) \quad \lor \quad d(v_{\mathrm{start}}, v_{\mathrm{reject\_all}}) > \tau_{\mathrm{depth}}
#### 2. 2. Visual Prominence Disparity
FORMULA: \frac{P(B_{\mathrm{accept}})}{P(B_{\mathrm{manage}})} > \delta_{\mathrm{contrast}}
#### 3. 3. Semantic Obfuscation of Privacy-Related Terminology
FORMULA: \mathrm{FKGL}(T_{\mathrm{privacy}}) > 14 \quad \lor \quad \frac{|\mathrm{Unique}(T_{\mathrm{privacy}})|}{|T_{\mathrm{privacy}}|} > \tau_{\mathrm{obfuscation}}

### Labyrinthine Navigation [obstruction]
Applicable escapes: E1, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Excessive Navigational Depth
FORMULA: d(v_{\mathrm{home}}, v_{\mathrm{target}}) > \tau_{\mathrm{depth}}
#### 2. 2. Visual Nesting Depth of Navigation Elements
FORMULA: \max_{n \in N_{\mathrm{nav}}} D_{\mathrm{render}}(n) > \tau_{\mathrm{nesting}}
#### 3. 3. Semantic Obfuscation
FORMULA: \exists e_i \in P : \mathrm{Sim}(L(e_i), \mathrm{Topic}(v_{\mathrm{target}})) < \tau_{\mathrm{semantic}}

### Customisation (Interface Nesting) [obstruction]
Applicable escapes: E1, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Path Depth Asymmetry
FORMULA: d(S_0, S_{\mathrm{accept\_all}}) = 1 \quad \land \quad d(S_0, S_{\mathrm{reject\_all}}) \ge 2
#### 2. 2. Visual Indentation Depth of Privacy Controls
FORMULA: \frac{1}{|N_{\mathrm{privacy}}|} \sum_{n \in N_{\mathrm{privacy}}} \mathrm{offsetX}(n) > \tau_{\mathrm{indent}}
#### 3. 3. Semantic Obfuscation of Privacy Toggle Labels
FORMULA: \frac{|\{w \in L(N_{\mathrm{privacy}}) : w \in D_{\mathrm{jargon}}\}|}{|L(N_{\mathrm{privacy}})|} > \tau_{\mathrm{jargon}}

### Intermediate Currency [sneaking]
Applicable escapes: E1, E2, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Interception of the Fiat Checkout Flow
FORMULA: \mathrm{target}(E_{\mathrm{purchase}}) = V_{\mathrm{exchange}} \quad \land \quad \mathrm{target}(E_{\mathrm{purchase}}) \neq V_{\mathrm{checkout}}
#### 2. 2. Visual Obscuration of Real-Currency Equivalence
FORMULA: N_{\mathrm{real}} = \emptyset \quad \lor \quad \frac{\mathrm{fontSize}(N_{\mathrm{real}})}{S_{\mathrm{base}}} < 0.5
#### 3. 3. Lexical Tokenization mapped to Forced Exchange
FORMULA: T_{\mathrm{price}}(n) \in C_{\mathrm{virtual}} \quad \land \quad \text{TransactionStatus}(n) \implies \text{Executed}(E_{\mathrm{exchange}})

### Disguised Ad [sneaking]
Applicable escapes: E1, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Cross-Origin Action Masking
FORMULA: B_{\mathrm{action}} \neq \emptyset \quad \land \quad D_{\mathrm{target}}(B_{\mathrm{action}}) \neq D_{\mathrm{host}}
#### 2. 2. Morphological Similarity
FORMULA: \max_{v_i \in V_{\mathrm{native}}} \mathrm{sim}(v_{\mathrm{ad}}, v_i) > \tau_{\mathrm{blend}}
#### 3. 3. Semantic Mimicry of Native Action Labels
FORMULA: \max_{\ell \in L_{\mathrm{native}}} \mathrm{sim}(L(N_{\mathrm{ad}}), \ell) > \tau_{\mathrm{masquerade}}

### Sneak Into Basket [sneaking]
Applicable escapes: E1, E2, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Unprompted State Mutation
FORMULA: (I_{\mathrm{cart}} \setminus I_{\mathrm{explicit}} \neq \emptyset) \quad \land \quad \nexists e \in E_{\mathrm{user}} \implies \mathrm{Add}(y)
#### 2. 2. Visual Indistinguishability of Surcharged Items
FORMULA: \min_{v_u \in V_{\mathrm{user}}} \|v_{\mathrm{injected}} - v_u\|_2 < \tau_{\mathrm{camouflage}}
#### 3. 3. Semantic Obscuration of Injected Line Items
FORMULA: \mathrm{Entailment}(T(N_{\mathrm{injected}}), \text{``optional add-on''}) = \mathrm{True} \quad \land \quad \mathrm{UserConsented}(N_{\mathrm{injected}}) = \mathrm{False}

### Drip Pricing, Hidden Costs, or Partitioned Pricing [sneaking]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Sequential Price Inflation
FORMULA: P(s_n) > P(s_0) + I_{\mathrm{added}} \quad \implies \quad P_{\mathrm{dripped}} > 0
#### 2. 2. Visual Disparity of Cost Partitioning
FORMULA: \frac{V(N_{\mathrm{base}})}{V(N_{\mathrm{fee}})} > \tau_{\mathrm{prominence}}
#### 3. 3. Semantic Concealment of Mandatory Fee Disclosure
FORMULA: T_{\mathrm{initial}} \cap K_{\mathrm{fees}} = \emptyset \quad \land \quad T_{\mathrm{final}} \cap K_{\mathrm{fees}} \neq \emptyset

### Bundling [sneaking]
Applicable escapes: E1, E2, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Inseparable Transactional Nodes
FORMULA: E_{\mathrm{purchase}}(I_{\mathrm{primary}}) \implies \{I_{\mathrm{primary}}, I_{\mathrm{supp}}\} \subseteq C_{\mathrm{state}} \quad \land \quad \nexists e : e(I_{\mathrm{primary}}) \implies C_{\mathrm{state}} = \{I_{\mathrm{primary}}\}
#### 2. 2. Visual Obscuration of Individual Component Pricing
FORMULA: \frac{\sum_{n \in N_{\mathrm{components}}} A(n)}{A(C_{\mathrm{bundle}})} < \tau_{\mathrm{breakdown}}
#### 3. 3. Semantic Suppression of Individual Item Descriptions
FORMULA: \frac{H(T_{\mathrm{bundled}})}{H(T_{\mathrm{standalone}})} < \tau_{\mathrm{description}}

### Hidden Information [sneaking]
Applicable escapes: E1, E2, E3, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Burial in High-Density Text
FORMULA: |W(N_{\mathrm{document}})| > \tau_{\mathrm{fatigue}} \quad \land \quad P(t_{\mathrm{clause}}) = \mathrm{False}
#### 2. 2. Typographical and Chromatic Camouflage
FORMULA: S_{\mathrm{font}}(N_{\mathrm{critical}}) < \tau_{\mathrm{min\_readable}} \quad \lor \quad \mathrm{CR}(N_{\mathrm{critical}}, L_{\mathrm{bg}}) < \tau_{\mathrm{wcag\_min}}
#### 3. 3. Semantic Concealment of Adverse Terms
FORMULA: K_{\mathrm{adverse}} \cap T_{\mathrm{DOM}} \neq \emptyset \quad \land \quad \mathrm{IsConcealed}(N_{\mathrm{adverse}}) = \mathrm{True}

### Reduced Friction [sneaking]
Applicable escapes: E1, E2, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Absence of Confirmation Interstitial
FORMULA: E_{\mathrm{click}}(S_{\mathrm{intent}}) \implies S_{\mathrm{commit}} \quad \land \quad S_{\mathrm{confirm}} \notin \mathrm{Path}(S_{\mathrm{intent}} \to S_{\mathrm{commit}})
#### 2. 2. Visual Proximity of Destructive Actions to Neutral UI
FORMULA: \min_{n \in N_{\mathrm{neutral}}} d_{\mathrm{spatial}}(N_{\mathrm{destructive}}, n) < \tau_{\mathrm{safety}}
#### 3. 3. Semantic Absence of Confirmation Language
FORMULA: \neg\exists n \in \mathrm{Path}(v_{\mathrm{pre}}, v_{\mathrm{commit}}) : \mathrm{Match}(T(n), \mathrm{Pattern}_{\mathrm{confirm}}) = \mathrm{True}

### Forced Continuity [sneaking]
Applicable escapes: E1, E2, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Time-Triggered Silent State Mutation
FORMULA: t \geq t_{\mathrm{expiry}} \quad \implies \quad S_{\mathrm{account}}(t) \to S_{\mathrm{premium}} \quad \land \quad E_{\mathrm{charge}}(T_{\mathrm{payment}}) = \mathrm{True}
GIVEN: \mathrm{Consent}_{\mathrm{explicit}}(t) = \mathrm{False}
#### 2. 2. Absence of Temporal Feedforward
FORMULA: \forall w \in W_{\mathrm{renewal}} : \mathrm{Visible}(w, t) = \mathrm{False} \quad \forall t \in [t_{\mathrm{expiry}} - \tau_{\mathrm{fair\_notice}}, t_{\mathrm{expiry}}]
GIVEN: \lor \quad \frac{A(w)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \quad \lor \quad \mathrm{CR}(w, L_{\mathrm{bg}}) < 3.0
#### 3. 3. Semantic Asymmetry Between Subscription and Cancellation Language
FORMULA: \mathrm{FKGL}(T_{\mathrm{cancel}}) - \mathrm{FKGL}(T_{\mathrm{signup}}) > 2 \quad \lor \quad \mathrm{Guilt}(T_{\mathrm{cancel}}) - \mathrm{Guilt}(T_{\mathrm{signup}}) > \tau_{\mathrm{guilt\_gap}}

### Privacy Zuckering [sneaking]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Bundled Consent and Granularity Violation
FORMULA: T_{\mathrm{accept}} = \mathrm{True} \quad \implies \quad (\mathrm{Access}(D_{\mathrm{essential}}) = \mathrm{True} \quad \land \quad \mathrm{Access}(D_{\mathrm{monetization}}) = \mathrm{True})
GIVEN: \nexists t_{\mathrm{alt}} : (t_{\mathrm{alt}} \implies \mathrm{Access}(D_{\mathrm{essential}}) \land \neg \mathrm{Access}(D_{\mathrm{monetization}}))
#### 2. 2. Visual Asymmetry Between Privacy-Invasive and Privacy-Preserving Options
FORMULA: \frac{W(N_{\mathrm{invasive}})}{W(N_{\mathrm{preserving}})} > \tau_{\mathrm{privacy\_skew}}
#### 3. 3. Semantic Ambiguity of Third-Party Entities
FORMULA: |E_{\mathrm{actual}}| \gg 1 \quad \land \quad \mathrm{Specificity}(N_{\mathrm{disclosure}}) < \tau_{\mathrm{vague}}

### Friend Spam [sneaking]
Applicable escapes: E1, E2, E5.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Feedforward Intent vs. Payload Execution
FORMULA: \mathrm{Intent}_{\mathrm{NLP}}(N_{\mathrm{prompt}}) \in D_{\mathrm{read\_only}} \quad \land \quad E_{\mathrm{backend\_action}}(T_{\mathrm{access}}) \implies \mathrm{SendMessages()}
#### 2. 2. Absence of Granular Selection
FORMULA: |S_{\mathrm{selected}}| = 0 \quad \land \quad |M_{\mathrm{dispatched}}| \approx |C_{\mathrm{network}}| \quad \implies \quad \mathrm{Unauthorized \: Broadcast}
#### 3. 3. Sender Identity Spoofing
FORMULA: \mathrm{SenderAlias}(m_{\mathrm{outbound}}) = I_{\mathrm{user}} \quad \land \quad \mathrm{Author}(m_{\mathrm{outbound}}) = I_{\mathrm{corp}}

### Address Book Leeching [sneaking]
Applicable escapes: E1, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Utility-Permission Decoupling
FORMULA: \mathrm{State}(U_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad P_{\mathrm{contacts}} = \mathrm{False} \quad \land \quad \mathrm{Dep}(U_{\mathrm{core}}, P_{\mathrm{contacts}}) = \emptyset
#### 2. 2. Visual Prominence of the Invite-All Affordance
FORMULA: \frac{A(N_{\mathrm{invite\_all}})}{A(N_{\mathrm{skip}})} > \tau_{\mathrm{invite\_dominance}}
#### 3. 3. Semantic Framing of Contact-Sharing Consent
FORMULA: \mathrm{Frame}(T_{\mathrm{prompt}}) = \mathrm{Benefactive} \quad \land \quad \mathrm{Subject}(T_{\mathrm{prompt}}) = \mathrm{ThirdParty}

### Automatic Accept Third Party Term [sneaking]
Applicable escapes: E1, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Bundled Transitive Consent
FORMULA: \mathrm{Accept}(T_{\mathrm{primary}}) \implies \forall t_i \in T_{\mathrm{third\_party}} : \mathrm{Accept}(t_i) = \mathrm{True}
GIVEN: \nexists \mathrm{Toggle}(t_i) \in \mathrm{DOM}
#### 2. 2. Opaque Entity Resolution
FORMULA: E_{\mathrm{declared}} \subset E_{\mathrm{actual}} \quad \land \quad |E_{\mathrm{actual}}| \gg |E_{\mathrm{declared}}| \approx 0
#### 3. 3. Semantic Concealment of Third-Party Agreement Language
FORMULA: T(N_{\mathrm{legal}}) \cap K_{\mathrm{agreement}} \neq \emptyset \quad \land \quad \mathrm{Checked}(N_{\mathrm{legal}}) = \mathrm{True} \quad \land \quad \mathrm{UserToggled}(N_{\mathrm{legal}}) = \mathrm{False}

### Pre-Delivered Content [sneaking]
Applicable escapes: E1, E2, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Unconsented Local Storage Consumption
FORMULA: C_{\mathrm{premium}} \subseteq S_{\mathrm{local}} \quad \text{given} \quad E_{\mathrm{consent}} = \emptyset \quad \land \quad \mathrm{Size}(C_{\mathrm{premium}}) \gg 0
#### 2. 2. Visual Density of Locked-Content Badges
FORMULA: \frac{|\{n \in N : \mathrm{IsLocked}(n)\}|}{|\{n \in N : \mathrm{IsAccessible}(n)\}|} > \tau_{\mathrm{locked\_ratio}}
#### 3. 3. Semantic Framing of Local Assets as Purchase Opportunities
FORMULA: \mathrm{Frame}(T_{\mathrm{asset}}) = \mathrm{Purchaseable} \quad \land \quad \mathrm{IsLocal}(A_{\mathrm{asset}}) = \mathrm{True}

### Fear Of Missing Out (FOMO) [urgency]
Applicable escapes: E1, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Artificial Temporal Scarcity
FORMULA: T(s_0) \approx \Delta t \quad \land \quad T(s_1) \approx \Delta t \quad \implies \quad \mathrm{Fabricated \: Urgency}
#### 2. 2. Visual Pulsation Frequency of Urgency Indicators
FORMULA: \min_{n \in N_{\mathrm{urgency}}} \Delta t_{\mathrm{refresh}}(n) < \tau_{\mathrm{pulsation}}
#### 3. 3. Semantic Density of Scarcity and Urgency Lexemes
FORMULA: \frac{|\{w \in T : w \in L_{\mathrm{FOMO}}\}|}{|T|} \times 100 > \tau_{\mathrm{fomo}}

### High Demand [urgency]
Applicable escapes: E1, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Metric Fabrication
FORMULA: U_{\mathrm{displayed}}(i, t) = R(a, b) \quad \text{given} \quad U_{\mathrm{displayed}}(i, t) \gg U_{\mathrm{true}}(i, t)
#### 2. 2. Visual Dynamics of Social-Proof Badges
FORMULA: \exists n \in N_{\mathrm{demand}} : \mathrm{IsAnimated}(n) = \mathrm{True} \quad \land \quad \Delta t_{\mathrm{update}}(n) < \tau_{\mathrm{animate}}
#### 3. 3. Semantic Verifiability of Social-Proof Quantifiers
FORMULA: \exists q \in \mathbb{Z}^+ \subset T(N_{\mathrm{demand}}) \quad \land \quad \neg\exists \text{Qualifier}_{\mathrm{temporal/geographic}} \in T(N_{\mathrm{demand}})

### Low Stock [urgency]
Applicable escapes: E1, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Inventory Fabrication
FORMULA: I_{\mathrm{displayed}}(x) \le \tau_{\mathrm{scarcity}} \quad \text{given} \quad I_{\mathrm{displayed}}(x) \ll I_{\mathrm{true}}(x)
#### 2. 2. Visual Alarm Salience of Scarcity Indicators
FORMULA: \mathrm{Hue}(N_{\mathrm{stock}}) \in [0^\circ, 30^\circ] \quad \land \quad \Delta\mathrm{Stock}_{\mathrm{actual}} = 0
#### 3. 3. Semantic Verifiability of Stock-Level Quantifiers
FORMULA: \exists t_1, t_2 : |t_2 - t_1| < 60\text{s} \quad \land \quad Q_{\mathrm{stock}}(t_1) \neq Q_{\mathrm{stock}}(t_2) \quad \land \quad \neg\mathrm{HasTransaction}(t_1, t_2)

### Activity Messages [urgency]
Applicable escapes: E1, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Asynchronous Event Fabrication
FORMULA: M_{\mathrm{displayed}}(t) \neq \emptyset \quad \land \quad M_{\mathrm{displayed}}(t) \notin E_{\mathrm{real}}(t)
#### 2. 2. Cognitive Interruption
FORMULA: \mathrm{Salience}(N_{\mathrm{activity}}) \to \mathrm{Max} \quad \land \quad \lambda_{\mathrm{interrupt}} > \tau_{\mathrm{cognitive\_load}} \implies S_{\mathrm{focus}} \to \mathrm{Disrupted}
#### 3. 3. Semantic Specificity of Activity-Notification Content
FORMULA: \mathrm{Specificity}(T_{\mathrm{activity}}) < \tau_{\mathrm{specificity}} \quad \land \quad \neg\exists \text{IdentityRef} \in T_{\mathrm{activity}}

### Countdown Timer [urgency]
Applicable escapes: E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Stateless Expiration
FORMULA: T_{\mathrm{expire}} = t_{\mathrm{load}} + \Delta t_{\mathrm{countdown}} \quad \implies \quad \text{Urgency is functionally synthetic}
#### 2. 2. Cognitive Compression
FORMULA: \Delta t_{\mathrm{timer}} < \tau_{\mathrm{deliberation}} \quad \implies \quad \mathrm{Probability}(\mathrm{Rational\_Evaluation}) \to 0
#### 3. 3. Semantic Urgency Inflation via Temporal Lexemes
FORMULA: \mathrm{IsCountdown}(N) = \mathrm{True} \quad \land \quad |T_{\mathrm{adjacent}}(N) \cap L_{\mathrm{amplify}}| > 0

### Limited Time Message [urgency]
Applicable escapes: E1, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Perpetual Extension
FORMULA: t_{\mathrm{current}} \ge T_{\mathrm{end}}(i) \implies T_{\mathrm{end}}(i+1) = t_{\mathrm{current}} + \Delta t_{\mathrm{extension}}
#### 2. 2. Visual Salience of Temporal-Urgency Chromatics
FORMULA: \mathrm{Hue}(C_{\mathrm{offer}}) \in [0^\circ, 45^\circ] \quad \land \quad \mathrm{Match}(T(C_{\mathrm{offer}}), \mathrm{Pattern}_{\mathrm{temporal}}) = \mathrm{True}
#### 3. 3. Ambiguous Temporal Bounding
FORMULA: \mathrm{Specificity}(M_{\mathrm{urgency}}) \approx 0 \quad \land \quad T_{\mathrm{end}} \notin \mathrm{DOM} \implies \mathrm{Urgency_{perceived}} \to \mathrm{Max}

### Price Comparison Prevention [misdirection]
Applicable escapes: E1, E2, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Fiat Decoupling
FORMULA: T_{\mathrm{price}}(n) \neq \emptyset \quad \land \quad F_{\mathrm{convert}}(T_{\mathrm{price}}(n)) = \emptyset
#### 2. 2. Visual Suppression of Unit-Price Information
FORMULA: \frac{\mathrm{fontSize}(N_{\mathrm{unit}})}{\mathrm{fontSize}(N_{\mathrm{headline}})} < \tau_{\mathrm{suppress}} \quad \lor \quad \frac{\mathrm{CR}(N_{\mathrm{unit}}, L_{\mathrm{bg}})}{\mathrm{CR}(N_{\mathrm{headline}}, L_{\mathrm{bg}})} < \tau_{\mathrm{suppress}}
#### 3. 3. Semantic Omission of Comparison-Relevant Qualifiers
FORMULA: Q_{\mathrm{standard}} \cap Q_{\mathrm{rendered}} = \emptyset

### Reference Pricing [misdirection]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Mathematical Exaggeration of Discount
FORMULA: \Delta_{\mathrm{pct}} = \frac{P_{\mathrm{ref}} - P_{\mathrm{cur}}}{P_{\mathrm{ref}}} \quad \implies \quad \Delta_{\mathrm{pct}} > \tau_{\mathrm{unrealistic}}
#### 2. 2. Visual Salience of Reference-Price Strikethrough
FORMULA: \mathrm{CR}(N_{\mathrm{ref}}, L_{\mathrm{bg}}) < \tau_{\mathrm{ref\_cr}} \quad \land \quad \frac{\mathrm{fontSize}(N_{\mathrm{current}})}{\mathrm{fontSize}(N_{\mathrm{ref}})} > \tau_{\mathrm{size\_skew}}
#### 3. 3. Dual-Pricing Co-occurrence and Anchoring
FORMULA: P_{\mathrm{ref}} > P_{\mathrm{cur}} \quad \land \quad \mathrm{CSS}(N_{\mathrm{ref}}) \cap S_{\mathrm{strike}} \neq \emptyset

### Conflicting Information [misdirection]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Proximity of Contradictory Factual Nodes
FORMULA: \exists t_1, t_2 \in \mathrm{Descendants}(C) : \mathrm{Prop}(t_1) \land \mathrm{Prop}(t_2) \implies \bot \quad \land \quad d_{\mathrm{DOM}}(t_1, t_2) < \tau_{\mathrm{proximity}}
#### 2. 2. Semantic-Visual Mismatch
FORMULA: \mathrm{Intent}(L(B)) \cap \mathrm{Affordance}(C(B)) = \emptyset \quad \implies \quad \mathrm{Contradiction}
#### 3. 3. Mutually Exclusive Factual Claims
FORMULA: \exists t_1, t_2 \in N_{\mathrm{container}} : \mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Unsatisfiable}

### Information Without Context [misdirection]
Applicable escapes: E1, E2, E3, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Orphaned Nodes
FORMULA: d(N_{\mathrm{metric}}, N_{\mathrm{descriptor}}) > \tau_{\mathrm{orphan}}
#### 2. 2. Visual Prominence Imbalance Between Metric and Baseline
FORMULA: \frac{W(N_{\mathrm{metric}})}{W(N_{\mathrm{context}})} > \tau_{\mathrm{context\_imbalance}} \quad \land \quad \mathrm{CR}(N_{\mathrm{metric}}, L_{\mathrm{bg}}) > 7.0
#### 3. 3. Unanchored Quantitative Metrics
FORMULA: v \in N_{\mathrm{info}} \quad \land \quad (U_{\mathrm{val}} \notin S_{\mathrm{cluster}} \lor B_{\mathrm{val}} \notin S_{\mathrm{cluster}})

### False Hierarchy [misdirection]
Applicable escapes: E1, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Element Downgrading
FORMULA: \mathrm{Tag}(B_{\mathrm{business}}) = \texttt{<button>} \quad \land \quad \mathrm{Tag}(B_{\mathrm{user}}) = \texttt{<a>} \quad \land \quad S_{\mathrm{padding}}(B_{\mathrm{user}}) \approx 0
#### 2. 2. Relational Visual Weight Disparity
FORMULA: W(x) = \alpha \cdot A(x) + \beta \cdot C(x) + \gamma \cdot F(x)
GIVEN: \frac{W(B_{\mathrm{business}})}{W(B_{\mathrm{user}})} > \tau_{\mathrm{hierarchy}}
#### 3. 3. Strict Semantic Opposition
FORMULA: \exists \mathrm{Intent}(L(B_{1})) \equiv \neg \mathrm{Intent}(L(B_{2}))

### Visual Prominence [misdirection]
Applicable escapes: E1, E3, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Asymmetry in DOM Subtree Weight
FORMULA: \frac{|\mathrm{Desc}(N_{\mathrm{favorable}})|}{\mathrm{median}_{s \in \mathrm{Siblings}(N_{\mathrm{favorable}})} |\mathrm{Desc}(s)|} > \tau_{\mathrm{subtree\_bloat}}
#### 2. 2. Absolute Bounding Box Dominance
FORMULA: \frac{A(N_{\mathrm{favorable}})}{A(E_{\mathrm{baseline}})} > \tau_{\mathrm{area}}
#### 3. 3. Semantic Neutrality of Dominant Action Labels
FORMULA: |\mathrm{Sent}(L(N_{\mathrm{favorable}}))| > 0.5 \quad \lor \quad L(N_{\mathrm{favorable}}) \cap D_{\mathrm{coercion}} \neq \emptyset

### Persuasive Language [misdirection]
Applicable escapes: E1, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Density of Event Listeners on Coercive Text Nodes
FORMULA: \frac{|E(N_{\mathrm{coercive}})|}{|E(N_{\mathrm{neutral}})|} > \tau_{\mathrm{listener\_skew}}
#### 2. 2. Visual Emphasis Asymmetry on Coercive Text
FORMULA: \frac{\mathrm{fontWeight}(N_{\mathrm{coercive}})}{\mathrm{fontWeight}(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}} \quad \lor \quad \frac{A(N_{\mathrm{coercive}})}{A(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}}
#### 3. 3. Truth-Conditional Satisfiability
FORMULA: \mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Satisfiable}

### Cuteness [misdirection]
Applicable escapes: E1, E2, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Conditional Injection of Affective Assets
FORMULA: I_{\mathrm{affective}} \cap \mathrm{DOM}(s_{\mathrm{onboard}}) = \emptyset \quad \land \quad I_{\mathrm{affective}} \subset \mathrm{DOM}(s_{\mathrm{cancel}})
#### 2. 2. Context-Dependent Image Injection
FORMULA: I_{\mathrm{affective}} \notin I(s_{\mathrm{onboard}}) \quad \land \quad I_{\mathrm{affective}} \in I(s_{\mathrm{cancel}})
GIVEN: \land \quad \left( \frac{A(i)}{A_{\mathrm{viewport}}} > \tau_{\mathrm{prominence}} \quad \lor \quad \mathrm{CR}(i, L_{\mathrm{bg}}) > 7.0 \right) \quad \forall i \in I_{\mathrm{affective}}
#### 3. 3. Semantic Pairing of Guilt
FORMULA: \mathrm{Affect}(N_{\mathrm{text}}) > \tau_{\mathrm{guilt}} \quad \land \quad d_{\mathrm{spatial}}(N_{\mathrm{text}}, i) < \delta_{\mathrm{proximity}}

### Positive Or Negative Framing [misdirection]
Applicable escapes: E1, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Asymmetry of Framed Option Subtrees
FORMULA: \frac{|T_{\mathrm{gain}} \setminus T_{\mathrm{loss}}|}{|T_{\mathrm{gain}} \cup T_{\mathrm{loss}}|} > \tau_{\mathrm{frame\_structure}}
#### 2. 2. Visual Weight Asymmetry Between Framing Poles
FORMULA: \max\left(\frac{W(F_{\mathrm{gain}})}{W(F_{\mathrm{loss}})}, \frac{W(F_{\mathrm{loss}})}{W(F_{\mathrm{gain}})}\right) > \tau_{\mathrm{frame\_asymmetry}}
#### 3. 3. Identification of Mutually Exclusive Vectors
FORMULA: A(B_{\mathrm{opt\_in}}) \equiv \neg A(B_{\mathrm{opt\_out}})

### Choice Overload [misdirection]
Applicable escapes: E1, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Excessive Element Quantization
FORMULA: |C_{\mathrm{choices}}| > \tau_{\mathrm{overload}}
#### 2. 2. Visual Density of Interactive Decision Elements
FORMULA: \rho = \frac{n_{\mathrm{interactive}}}{A_{\mathrm{viewport}}} > \tau_{\mathrm{density}}
#### 3. 3. Semantic Similarity Collapse Among Options
FORMULA: \frac{1}{|C|(|C|-1)} \sum_{i \neq j} \mathrm{sim}(T_i, T_j) > \tau_{\mathrm{similarity}}

### Plain Evil (Theoretical Construct) [misdirection]
Applicable escapes: E1, E2, E3, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Dark Pattern Singularity
FORMULA: \sum_{i=1}^{n} \mathrm{Active}(D_i, M_{\mathrm{context}}) \ge \tau_{\mathrm{hostility}}
#### 2. 2. Visual Hostility Density Index
FORMULA: H = \frac{\sum_{i} \mathbb{1}_{\mathrm{hostile}}(N_i) \cdot w_i}{A_{\mathrm{viewport}}} > \tau_{\mathrm{hostility}}
#### 3. 3. Semantic Hostility Density Score
FORMULA: \|H_{\mathrm{sem}}\|_2 = \sqrt{\rho_{\mathrm{coerce}}^2 + \sigma_{\mathrm{FKGL}}^2 + \sigma_{\mathrm{sent}}^2 + \rho_{\mathrm{connot}}^2} > \tau_{\mathrm{hostile\_sem}}

### Endorsement And Testimonials [misdirection]
Applicable escapes: E1, E2, E3, E4.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Statistical Implausibility
FORMULA: \mathrm{Mean}(S(R_{\mathrm{total}})) \approx 5.0 \quad \land \quad \mathrm{Var}(S(R_{\mathrm{total}})) \approx 0 \implies D_{\mathrm{rendered}} \neq D_{\mathrm{organic}}
#### 2. 2. Visual Verifiability of Testimonial Attribution
FORMULA: \exists C_{\mathrm{testimonial}} : \neg\exists N_{\mathrm{attribution}} \in \mathrm{Descendants}(C_{\mathrm{testimonial}})
#### 3. 3. Provenance Obfuscation
FORMULA: \mathrm{Similarity}(I_{\mathrm{avatar}}(P_i), I_{\mathrm{stock\_database}}) \approx 1 \quad \lor \quad \mathrm{Similarity}(T_{\mathrm{text}}(r_i), T_{\mathrm{text}}(r_j)) > \tau_{\mathrm{template}}

### Confirmshaming [misdirection]
Applicable escapes: E1, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Asymmetry in Decline-Option Accessibility
FORMULA: \mathrm{Tag}(N_{\mathrm{decline}}) \notin \{\texttt{<button>}, \texttt{[role=\"button\"]}\} \quad \land \quad \mathrm{Tag}(N_{\mathrm{accept}}) = \texttt{<button>}
#### 2. 2. Visual Hierarchy Subversion
FORMULA: \mathrm{Vis}(N_{\mathrm{accept}}) \gg \mathrm{Vis}(N_{\mathrm{decline}}) \quad \land \quad \mathrm{Vis}(N_{\mathrm{decline}}) \to \tau_{\mathrm{minimum\_accessibility}}
#### 3. 3. Semantic Asymmetry
FORMULA: S_{\mathrm{sentiment}}(N_{\mathrm{accept}}) > 0 \quad \land \quad S_{\mathrm{sentiment}}(N_{\mathrm{decline}}) \ll 0

### Psychological Tricks [misdirection]
Applicable escapes: E1, E2, E3.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Asymmetric Dominance
FORMULA: V(O_{\mathrm{target}}) \gg V(O_{\mathrm{decoy}}) \quad \land \quad \mathrm{Cost}(O_{\mathrm{target}}) \approx \mathrm{Cost}(O_{\mathrm{decoy}}) \implies P_{\mathrm{select}}(O_{\mathrm{target}}) \to \mathrm{Max}
#### 2. 2. Cognitive Overload
FORMULA: |C_{\mathrm{matrix}}| \gg \tau_{\mathrm{fatigue}} \quad \implies \quad \lim_{t \to \infty} P_{\mathrm{select}}(D_{\mathrm{favorable}}) = 1
#### 3. 3. Reference Point Obfuscation
FORMULA: P_{\mathrm{anchor}} \gg P_{\mathrm{actual}} \quad \implies \quad \mathrm{WTP}(U_{\mathrm{anchored}}) > \mathrm{WTP}(U_{\mathrm{baseline}})

### Pressured Selling [nagging]
Applicable escapes: E1, E2, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Transactional Flow Interruption
FORMULA: \mathrm{Click}(B_{\mathrm{proceed}}) \implies \mathrm{Visibility}(M_{\mathrm{upsell}}) = \mathrm{True} \quad \land \quad s_{\mathrm{final}} \notin S_{\mathrm{current}}
#### 2. 2. Localized Temporal or Visual Constraints
FORMULA: \Delta t_{\mathrm{offer}} < \tau_{\mathrm{panic\_duration}} \quad \lor \quad (\mathrm{CSS}(M_{\mathrm{upsell}}) \cap V_{\mathrm{animations}} \neq \emptyset)
#### 3. 3. High-Arousal Lexical Density
FORMULA: \frac{|W(M) \cap D_{\mathrm{pressure}}|}{|W(M)|} > \tau_{\mathrm{arousal}}

### Small or Moving Close Button [interface-interference]
Applicable escapes: E1, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Event-Listener Commandeering on Dismissal Vectors
FORMULA: \mathrm{IsIntercepted}(N_{\mathrm{close}}) = \mathrm{True} \quad \lor \quad \Delta t_{\mathrm{rebind}}(N_{\mathrm{close}}) < \tau_{\mathrm{rebind}}
#### 2. 2. Microscopic Hitbox
FORMULA: A(N_{\mathrm{close}}) < \tau_{\mathrm{wcag\_hitbox}} \quad \lor \quad \frac{A(N_{\mathrm{close}})}{A(M_{\mathrm{parent}})} < \delta_{\mathrm{micro}}
#### 3. 3. Semantic Obfuscation of Dismissal Labels
FORMULA: \mathrm{AccessibleName}(N_{\mathrm{close}}) = \emptyset \quad \lor \quad \mathrm{Intent}(\mathrm{AccessibleName}(N_{\mathrm{close}})) \neq \mathrm{Dismissal}

### Bad Defaults / Preselection [interface-interference]
Applicable escapes: E1, E2, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Pre-initialized Activation State
FORMULA: \exists c \in C : \mathrm{State}(c, t_0) = \mathrm{True} \quad \land \quad \mathrm{UserEvents}(c, t_0) = \emptyset
#### 2. 2. Visual or Structural Obfuscation
FORMULA: V(c, t_0) = \mathrm{False} \quad \lor \quad d_{\mathrm{spatial}}(c, N_{\mathrm{submit}}) > \tau_{\mathrm{peripheral\_vision}}
#### 3. 3. Semantic Intent of the Default Action
FORMULA: \mathrm{Intent}(L(c)) \in \{D_{\mathrm{privacy\_loss}}, D_{\mathrm{financial\_cost}}, D_{\mathrm{marketing\_opt\_in}}\}

### Trick Questions [interface-interference]
Applicable escapes: E1, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Label-Input Semantic Mismatch
FORMULA: \mathrm{SemanticDist}(L_{\mathrm{aria}}(N), L_{\mathrm{visual}}(N)) > \tau_{\mathrm{label\_mismatch}}
#### 2. 2. Affordance-Consequence Mismatch
FORMULA: (\mathrm{State}(c) = \mathrm{True}) \implies (\mathrm{Intent}(L(c)) \in D_{\mathrm{deny}})
#### 3. 3. Syntactic Obfuscation via Multiple Negations
FORMULA: N_{\mathrm{neg}}(L(c)) \geq 2 \quad \implies \quad \mathrm{Linguistic \: Obfuscation}

### Wrong Language [interface-interference]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Asymmetric State Application
FORMULA: \mathbb{L}(S_{\mathrm{acquisition}}) = \{L_{\mathrm{session}}\} \quad \land \quad \mathbb{L}(S_{\mathrm{termination}}) \setminus \{L_{\mathrm{session}}\} \neq \emptyset
#### 2. 2. Visual-Linguistic Locale Mismatch
FORMULA: L_{\mathrm{DOM}}(N_{\mathrm{critical}}) \neq L_{\mathrm{browser}}
#### 3. 3. Localized Linguistic Discrepancy
FORMULA: \mathrm{Lang}(N_{\mathrm{critical}}) \neq L_{\mathrm{session}} \quad \land \quad \mathrm{Confidence}(\mathrm{Lang}(N_{\mathrm{critical}})) > \tau_{\mathrm{lang\_id}}

### Complex Language [interface-interference]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Nesting Depth of Legal/Technical Text Nodes
FORMULA: D_{\mathrm{DOM}}(N_{\mathrm{complex}}) > \tau_{\mathrm{legal\_depth}} \quad \lor \quad \frac{1}{|N_{\mathrm{complex}}|} \sum_{n} |\mathrm{text}(n)| > \tau_{\mathrm{clause\_length}}
#### 2. 2. Visual Density of Legalese Text Blocks
FORMULA: \frac{\mathrm{fontSize}(N_{\mathrm{complex}})}{S_{\mathrm{base}}} < \tau_{\mathrm{shrink}} \quad \land \quad \mathrm{FKGL}(N_{\mathrm{complex}}) > 12
#### 3. 3. Exceedance of Baseline Readability Indices
FORMULA: \mathrm{FKGL}(N_{\mathrm{text}}) > \tau_{\mathrm{education\_limit}}

### Feedforward Ambiguity [interface-interference]
Applicable escapes: E1, E2, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Ambiguity of Action-Outcome Mapping
FORMULA: \exists N \in \mathrm{Interactive} : \mathrm{Distance}(\mathrm{Expect}(L(N)), \mathrm{Resolve}(N)) > \tau_{\mathrm{feedforward}}
#### 2. 2. Iconographic Entropy and Missing Affordances
FORMULA: H(\mathrm{CV}_{\mathrm{class}}(N_{\mathrm{icon}})) > \tau_{\mathrm{entropy}} \quad \land \quad T_{\mathrm{hover}} = \emptyset
#### 3. 3. Semantic Divergence of Action and Outcome
FORMULA: \mathrm{Sim}(\mathrm{Intent}_{\mathrm{NLP}}(L(n)), \mathrm{Outcome}_{\mathrm{System}}(n)) < \tau_{\mathrm{clarity}} \quad \land \quad \mathrm{Outcome}_{\mathrm{System}}(n) \in D_{\mathrm{critical}}

### Forced Registration [forced-action]
Applicable escapes: E1, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Absolute State Blocking
FORMULA: \forall \pi \in \mathrm{Paths}(S_{\mathrm{intent}} \to S_{\mathrm{terminal}}) : S_{\mathrm{auth}} \in \pi
#### 2. 2. Visual Degradation of the Guest Checkout Pathway
FORMULA: \frac{W(N_{\mathrm{guest}})}{W(N_{\mathrm{register}})} < \tau_{\mathrm{guest\_visibility}}
#### 3. 3. Semantic Framing of the Guest-Checkout Option
FORMULA: \mathrm{Sent}(L(N_{\mathrm{guest}})) < \tau_{\mathrm{guest\_sent}}

### Social Pyramid [forced-action]
Applicable escapes: E1, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Referral-Gated Progression
FORMULA: \mathrm{Access}(U_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad |R_{\mathrm{user}}| < k
#### 2. 2. Visual Prominence of Referral-Progress Gamification
FORMULA: \frac{A(N_{\mathrm{referral\_progress}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{gamification}}
#### 3. 3. Semantic Escalation of Referral-Reward Language
FORMULA: \frac{\Delta \mathrm{Intensity}(\mathrm{Reward}_n)}{\Delta \mathrm{Intensity}(\mathrm{Reward}_{n-1})} > \tau_{\mathrm{escalation}}

### Granting and Interaction [forced-action]
Applicable escapes: E1, E2, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Interaction Gating
FORMULA: \mathrm{State}(I_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad (P_{\mathrm{requested}} = \mathrm{False} \quad \land \quad \mathrm{Dep}(I_{\mathrm{core}}, P_{\mathrm{requested}}) = \emptyset)
#### 2. 2. Asynchronous Overlay Misdirection
FORMULA: \mathrm{Pos}(M_{\mathrm{system\_prompt}}, t) \approx \mathrm{Pos}(B_{\mathrm{benign}}, t) \quad \text{as} \quad t \to t_{\mathrm{interaction}}
#### 3. 3. Semantic Scope Creep in Permission Requests
FORMULA: |\mathrm{Perms}_{\mathrm{actual}} \setminus \mathrm{Perms}_{\mathrm{disclosed}}| > 0

### Pay-To-Play [forced-action]
Applicable escapes: E1, E2, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Exponential Friction and Paid Bypass
FORMULA: E_{\mathrm{free}}(L_i) \propto c^i \quad (c > 1) \quad \land \quad E_{\mathrm{paid}}(L_i) = \mathcal{O}(1)
#### 2. 2. Visual Dominance of Payment-Unlock Overlays
FORMULA: \frac{A(O_{\mathrm{unlock}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{occlusion}} \quad \lor \quad A(N_{\mathrm{dismiss}}) < 44 \times 44
#### 3. 3. Semantic Framing of Payment as Unlock
FORMULA: \mathrm{Frame}(T_{\mathrm{payment}}) \in \{\text{Unlock}, \text{Discover}, \text{Enhance}\} \quad \land \quad \mathrm{Frame}(T_{\mathrm{payment}}) \neq \mathrm{Transaction}

### Grinding [forced-action]
Applicable escapes: E1, E2, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Exponential Effort Scaling
FORMULA: E(L_i \to L_{i+1}) \propto c^i \quad (c > 1) \quad \land \quad V(L_{i+1}) \approx V(L_i) + k
#### 2. 2. Visual Diminishing-Returns Feedback Loop
FORMULA: \frac{\Delta P_{k}}{\Delta P_{1}} < e^{-\lambda(k-1)} \quad \land \quad \frac{d^2 P}{di^2} < 0
#### 3. 3. Semantic Attenuation of Progress-Milestone Language
FORMULA: \Delta a_i = \mathrm{Pos}(\mathrm{Milestone}_{i}) - \mathrm{Pos}(\mathrm{Milestone}_{i-1}) \quad \land \quad \frac{d\Delta a}{di} > 0

### Playing By Appointment [forced-action]
Applicable escapes: E1, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Temporal Gating
FORMULA: \mathrm{State}(A_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{until} \quad t \ge t_{\mathrm{depletion}} + \tau_{\mathrm{refill}}
#### 2. 2. Visual Prominence of Temporal-Gating Indicators
FORMULA: \frac{A(N_{\mathrm{temporal}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{appointment}} \quad \lor \quad \mathrm{Saturation}(N_{\mathrm{temporal}}) > 0.8
#### 3. 3. Semantic Urgency Encoding in Temporal-Gating Messages
FORMULA: \mathrm{Urgency}(T_{\mathrm{temporal}}) > \tau_{\mathrm{appointment\_urgency}} \quad \land \quad T_{\mathrm{temporal}} \cap L_{\mathrm{scarcity}} \neq \emptyset

### Watch Ads To Unlock Features Or Get Rewards [forced-action]
Applicable escapes: E1, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Attention as Transactional Currency
FORMULA: \int_{0}^{\Delta t_{\mathrm{ad}}} E_{\mathrm{playback}}(t) \, dt = \Delta t_{\mathrm{ad}} \implies \mathrm{State}(R_{\mathrm{target}}) \to \mathrm{Unlocked}
#### 2. 2. Visual Mismatch Between Reward Progress Display and Actual Progress
FORMULA: P_{\mathrm{visual}} - P_{\mathrm{actual}} > \tau_{\mathrm{mislead}}
#### 3. 3. Semantic Inflation of Reward Value
FORMULA: \mathrm{Hyperbole}(T_{\mathrm{reward}}) - \mathrm{Utility}(R_{\mathrm{actual}}) > \tau_{\mathrm{hype\_gap}}

### Pay To Avoid [forced-action]
Applicable escapes: E1, E2, E3, E4, E5.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Artificial State Degradation
FORMULA: U_{\mathrm{default}} = U_{\mathrm{system}} - D_{\mathrm{artificial}} \quad \land \quad U_{\mathrm{default}} \ll U_{\mathrm{system}}
#### 2. 2. Visual Occupancy of the Pain-Point Element
FORMULA: \frac{A(N_{\mathrm{pain}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{pain}}
#### 3. 3. Pain-Point Amplification
FORMULA: \frac{d}{dt} \lambda_{\mathrm{friction}}(t) > 0 \quad \implies \quad P(N_{\mathrm{prompt}} \mid \lambda_{\mathrm{friction}}) \approx 1

### Automating The User Away [forced-action]
Applicable escapes: E1, E2, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Autonomous Action Execution
FORMULA: A_{\mathrm{critical}} = \mathrm{Executed} \quad \text{given} \quad E_{\mathrm{user}} = \emptyset \quad \land \quad t \ge \tau_{\mathrm{system}}
#### 2. 2. Omission of the Interrupt Vector
FORMULA: B_{\mathrm{cancel}} \notin \mathrm{DOM}(t) \quad \lor \quad \Delta t_{\mathrm{warning}} < \tau_{\mathrm{reaction}}
#### 3. 3. Semantic Speed of Consent-Timing Language
FORMULA: t_{\mathrm{window}} < 2.0 \quad \land \quad \mathrm{SemanticType}(T_{\mathrm{prompt}}) = \mathrm{TimedConsent}

### Parasocial Pressure [forced-action]
Applicable escapes: E1, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Manufactured Livelihood Dependency
FORMULA: T_{\mathrm{fiat}} = 0 \implies \mathrm{State}(I_{\mathrm{creator}}) \to \mathrm{Failure} \quad \text{asserted within} \quad M_{\mathrm{pitch}}
#### 2. 2. Visual Proximity of Anthropomorphic Imagery to Action Prompts
FORMULA: \min_{i \in I_{\mathrm{face}}} d_{\mathrm{spatial}}(i, N_{\mathrm{prompt}}) < \tau_{\mathrm{social}} \quad \land \quad \frac{A(i)}{A_{\mathrm{viewport}}} > 0.05
#### 3. 3. Emotional Asymmetry
FORMULA: E_{\mathrm{user}} = \mathrm{Refusal} \implies \frac{d}{dt} V_{\mathrm{emotion}}(A_{\mathrm{mascot}}) \to -1

### Encouraging Anti-Social Behavior [forced-action]
Applicable escapes: E1, E2, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Reward-Coupled Social Externality
FORMULA: A_{\mathrm{antisocial}} \implies (V_{\mathrm{reward}} > 0 \quad \land \quad E_{\mathrm{externality}} \gg 0)
#### 2. 2. Visual Framing of Competitive Antagonism
FORMULA: \mathrm{LayoutType}(C_{\mathrm{container}}) = \mathrm{Competitive} \quad \land \quad \mathrm{SplitRatio} \approx 0.5
#### 3. 3. Algorithmic Amplification of Outrage
FORMULA: V_{\mathrm{visibility}}(M) \propto P_{\mathrm{polarity}}(M) \quad \implies \quad \text{Systemic Incentive for Hostility}

### Addictive Design [attention-manipulation]
Applicable escapes: E1, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Infinite Frictionless Continuation
FORMULA: Y_{\mathrm{max}}(t) - Y_{\mathrm{scroll}}(t) < \tau_{\mathrm{buffer}} \quad \implies \quad E_{\mathrm{append}} = \mathrm{True}
GIVEN: \lim_{t \to \infty} Y_{\mathrm{max}}(t) = \infty
#### 2. 2. Eradication of Natural Stopping Cues
FORMULA: \forall e \in E_{\mathrm{stop}} : \mathrm{Visible}(e, t) = \mathrm{False} \quad \lor \quad \frac{A(e)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \quad \lor \quad \mathrm{CR}(e, L_{\mathrm{bg}}) < 3.0
GIVEN: T_{\mathrm{session}} > \tau_{\mathrm{hyper\_engagement}}
#### 3. 3. Semantic Reinforcement-Trigger Lexicon Density
FORMULA: \frac{|\{w \in T : w \in L_{\mathrm{reinforcement}}\}|}{A_{\mathrm{viewport}}} > \tau_{\mathrm{addiction}}

### Infinite Scrolling [attention-manipulation]
Applicable escapes: E2, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Autonomous Content Injection
FORMULA: Y_{\mathrm{document\_end}} - Y_{\mathrm{viewport}} \leq \tau_{\mathrm{trigger}} \quad \implies \quad E_{\mathrm{fetch}}() = \mathrm{True}
#### 2. 2. The Unreachable Footer
FORMULA: v_{\mathrm{scroll}} > 0 \quad \implies \quad \frac{d}{dt} \mathrm{Pos}_{y}(N_{\mathrm{footer}}, t) \geq v_{\mathrm{scroll}}
GIVEN: \lim_{t \to \infty} d(Y_{\mathrm{viewport}}, \mathrm{Pos}_{y}(N_{\mathrm{footer}})) > 0
#### 3. 3. Semantic Attenuation of Content Boundaries
FORMULA: \neg\exists n \in N_{\mathrm{feed}} : \mathrm{Match}(T(n), \mathrm{Pattern}_{\mathrm{boundary}}) = \mathrm{True}

### Pull To Refresh (Variable-Reward Trap) [attention-manipulation]
Applicable escapes: E1, E2, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Kinesthetic Resistance and Action Commitment
FORMULA: \Delta Y_{\mathrm{touch}}(t) \geq \tau_{\mathrm{commit}} \quad \land \quad R_{\mathrm{elastic}} > 0 \quad \implies \quad E_{\mathrm{refresh}}() = \mathrm{True}
#### 2. 2. Artificial Anticipation Injection
FORMULA: \Delta t_{\mathrm{animation}} \gg \Delta t_{\mathrm{network}} \quad \land \quad \Delta t_{\mathrm{animation}} \geq \tau_{\mathrm{suspense}}
#### 3. 3. Semantic Variability of Refresh-Outcome Messaging
FORMULA: \sigma^2(\{\mathrm{Novelty}(T_i) : i = 1 \ldots k\}) > \tau_{\mathrm{slot\_machine}}

### Countdown On Ads [attention-manipulation]
Applicable escapes: E1, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Temporal Gating of Navigational Agency
FORMULA: \mathrm{State}(B_{\mathrm{skip}}, t_{\mathrm{active}}) = \mathrm{Disabled} \quad \text{given} \quad t_{\mathrm{active}} < \tau_{\mathrm{lock}}
#### 2. 2. Dynamic Affordance Injection
FORMULA: N_{\mathrm{close}} \notin \mathrm{DOM}(t) \quad \forall t < \tau_{\mathrm{lock}} \quad \land \quad N_{\mathrm{close}} \in \mathrm{DOM}(\tau_{\mathrm{lock}})
#### 3. 3. Semantic Framing of Ad-Watching as Exchange
FORMULA: \mathrm{Frame}(T_{\mathrm{ad\_context}}) \in \{\text{Reward}, \text{Offer}, \text{Bonus}\} \quad \land \quad \mathrm{UserAction} = \mathrm{ForcedViewing}

### Auto-Play [attention-manipulation]
Applicable escapes: E1, E2, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Autonomous Media Execution
FORMULA: S_{\mathrm{play}}(M_{\mathrm{media}}) = \mathrm{True} \quad \text{given} \quad E_{\mathrm{intent}} = \emptyset \quad \land \quad \mathrm{Intersection}(M_{\mathrm{media}}, \mathrm{Viewport}) > \tau_{\mathrm{visible}}
#### 2. 2. Affordance Suppression
FORMULA: \mathrm{Visibility}(B_{\mathrm{cancel}}) \to 0 \quad \lor \quad \mathrm{Cost}(S_{\mathrm{play}} \to \mathrm{False}) \gg 1
#### 3. 3. Semantic Framing of Auto-Play as Content Continuation
FORMULA: \mathrm{Frame}(T_{\mathrm{autoplay}}) \in \{\text{Continuation}, \text{Next}\} \quad \land \quad \neg\exists \text{``autoplay''} \in T_{\mathrm{visible}}

