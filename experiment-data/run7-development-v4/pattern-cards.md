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
Mechanism summary: Drawing on the Keystroke-Level Model for measuring human-computer interaction cost, we establish$N(x)$to represent the minimum number of discrete user interactions (e.g., clicks, modal confirmations) required to complete a given action$x$from the primary dashboard.
FORMULA: \frac{N(x_{\mathrm{delete}})}{N(x_{\mathrm{create}})} > \delta
#### 2. 2. Visual Accessibility of Offboarding Vectors
Mechanism summary: To establish a visual baseline for Immortal Accounts, the algorithm evaluates whether account deletion or offboarding UI elements are rendered with visual properties commensurate to their onboarding counterparts.
FORMULA: \frac{A(N_{\mathrm{delete}})}{A(N_{\mathrm{create}})} < \tau_{\mathrm{exit\_visibility}}
#### 3. 3. Absolute Absence of Deletion Vectors
Mechanism summary: To detect the complete omission of exit pathways, we define$K_{\mathrm{del}}$as the semantic set of account termination keywords (e.g., {“delete account”, “deactivate”, “close account”, “remove profile”}) and$T_{\mathrm{DOM}}$as the collection of all visible text nodes within the user's account settings and profile sub-pages.
FORMULA: K_{\mathrm{del}} \cap T_{\mathrm{DOM}} = \emptyset

### Dead End [obstruction]
Applicable escapes: E1, E2, E3, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Topological Sink in the Navigational Graph
Mechanism summary: To model the interface as a directed graph$G = (V, E)$, we define$V$as the set of user interface states (such as pages or modals) and$E$as the available interactive transitions.
FORMULA: \forall e \in E_{\mathrm{out}}(v_{\mathrm{current}}), \text{target}(e) \in V_{\mathrm{forced}} \implies \text{No Escape Path}
#### 2. 2. Visual Absence of Dismissal Vectors
Mechanism summary: Modals and overlays represent temporary interruptions in a user's workflow, demanding an explicit dismissal affordance to maintain usability and trust.
FORMULA: C_{\mathrm{dismiss}} = \emptyset \quad \land \quad \text{IsOverlay}(v_{\mathrm{current}}) = \mathrm{True}
#### 3. 3. Semantic Coercion Density in Trapped States
Mechanism summary: To establish a semantic baseline for Dead End, the algorithm evaluates the NLP sentiment of all visible text within a navigational dead-end state$v_{\mathrm{trap}}$.
FORMULA: \frac{|\{\text{Imperative}(w) \lor \text{Urgency}(w) : w \in T(v_{\mathrm{trap}})\}|}{|T(v_{\mathrm{trap}})|} > \tau_{\mathrm{coercion}}

### Forced Grace Period [obstruction]
Applicable escapes: E1, E2, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Temporal Discrepancy Extraction
Mechanism summary: To quantify the artificial delay imposed on the user, we define$T_{\mathrm{request}}$as the exact timestamp when the termination request is submitted.
FORMULA: T_{\mathrm{execute}} - T_{\mathrm{request}} \geq \Delta t_{\mathrm{min}}
#### 2. 2. Visual Conspicuity of Cancellation Affordance
Mechanism summary: To establish a visual baseline for Forced Grace Period, the algorithm evaluates the rendered salience of the cancellation or opt-out vector during the mandatory waiting window.
FORMULA: \frac{S(N_{\mathrm{cancel}})}{S(N_{\mathrm{confirm}})} < \delta_{\mathrm{salience}}
#### 3. 3. Semantic Proximity of Reversal
Mechanism summary: To identify whether this temporal delay is actively coupled with an entrapment mechanism, we establish$K_{\mathrm{revert}}$as a set of keywords indicating the cancellation of the deletion process (e.g., {“log in to cancel”, “reactivate”, “undo”}).
FORMULA: \min_{k \in K_{\mathrm{revert}}, e \in E_{\mathrm{time}}} d(k, e) < \tau_{\mathrm{words}}

### Privacy Maze [obstruction]
Applicable escapes: E1, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Asymmetrical Path Depth
Mechanism summary: To model the structural friction of the consent architecture, we represent the interface as a directed graph$G = (V, E)$, where$V$encapsulates the interface states and$E$signifies user interaction events, such as clicks.
FORMULA: d(v_{\mathrm{start}}, v_{\mathrm{reject\_all}}) > d(v_{\mathrm{start}}, v_{\mathrm{accept\_all}}) \quad \lor \quad d(v_{\mathrm{start}}, v_{\mathrm{reject\_all}}) > \tau_{\mathrm{depth}}
#### 2. 2. Visual Prominence Disparity
Mechanism summary: Beyond structural depth, the interface often weaponizes visual hierarchy to suppress user agency.
FORMULA: \frac{P(B_{\mathrm{accept}})}{P(B_{\mathrm{manage}})} > \delta_{\mathrm{contrast}}
#### 3. 3. Semantic Obfuscation of Privacy-Related Terminology
Mechanism summary: To establish a semantic baseline for Privacy Maze, the algorithm measures the FKGL readability and lexical complexity of text nodes within privacy-settings pages.
FORMULA: \mathrm{FKGL}(T_{\mathrm{privacy}}) > 14 \quad \lor \quad \frac{|\mathrm{Unique}(T_{\mathrm{privacy}})|}{|T_{\mathrm{privacy}}|} > \tau_{\mathrm{obfuscation}}

### Labyrinthine Navigation [obstruction]
Applicable escapes: E1, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Excessive Navigational Depth
Mechanism summary: To evaluate the structural burden of the interface, we model the application's architecture as a directed graph$G = (V, E)$.
FORMULA: d(v_{\mathrm{home}}, v_{\mathrm{target}}) > \tau_{\mathrm{depth}}
#### 2. 2. Visual Nesting Depth of Navigation Elements
Mechanism summary: To establish a visual baseline for Labyrinthine Navigation, the algorithm computes the rendered indentation depth$D_{\mathrm{render}}(N)$of each navigational menu node, measured as the cumulative CSS padding-left or margin-left in viewport-relative units.
FORMULA: \max_{n \in N_{\mathrm{nav}}} D_{\mathrm{render}}(n) > \tau_{\mathrm{nesting}}
#### 3. 3. Semantic Obfuscation
Mechanism summary: When humans navigate a graph, they rely on the semantic relevance of local links to estimate their proximity to a global target, a process governed by information scent.
FORMULA: \exists e_i \in P : \mathrm{Sim}(L(e_i), \mathrm{Topic}(v_{\mathrm{target}})) < \tau_{\mathrm{semantic}}

### Customisation (Interface Nesting) [obstruction]
Applicable escapes: E1, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Path Depth Asymmetry
Mechanism summary: To quantify the structural hurdle of reaching a user-favorable state, we model the interface as a state transition graph$G = (V, E)$.
FORMULA: d(S_0, S_{\mathrm{accept\_all}}) = 1 \quad \land \quad d(S_0, S_{\mathrm{reject\_all}}) \ge 2
#### 2. 2. Visual Indentation Depth of Privacy Controls
Mechanism summary: To establish a visual baseline for Customisation Interface Nesting, the algorithm traverses the rendered privacy-settings subtree and measures the cumulative horizontal offset of each toggle from the root settings container.
FORMULA: \frac{1}{|N_{\mathrm{privacy}}|} \sum_{n \in N_{\mathrm{privacy}}} \mathrm{offsetX}(n) > \tau_{\mathrm{indent}}
#### 3. 3. Semantic Obfuscation of Privacy Toggle Labels
Mechanism summary: To establish a semantic baseline for Customisation Interface Nesting, the algorithm evaluates the FKGL readability and technical-jargon density of labels describing privacy-relevant toggles.
FORMULA: \frac{|\{w \in L(N_{\mathrm{privacy}}) : w \in D_{\mathrm{jargon}}\}|}{|L(N_{\mathrm{privacy}})|} > \tau_{\mathrm{jargon}}

### Intermediate Currency [sneaking]
Applicable escapes: E1, E2, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Interception of the Fiat Checkout Flow
Mechanism summary: To model this coercive redirection, we define$V_{\mathrm{product}}$as the current interface state displaying a purchasable digital item, and$E_{\mathrm{purchase}}$as its primary transaction trigger (e.g., a “Buy” button).
FORMULA: \mathrm{target}(E_{\mathrm{purchase}}) = V_{\mathrm{exchange}} \quad \land \quad \mathrm{target}(E_{\mathrm{purchase}}) \neq V_{\mathrm{checkout}}
#### 2. 2. Visual Obscuration of Real-Currency Equivalence
Mechanism summary: To establish a visual baseline for Intermediate Currency, the algorithm identifies virtual-currency price labels$N_{\mathrm{virtual}}$(e.g., “500 Gems”) and searches for their real-currency conversion equivalents$N_{\mathrm{real}}$within the same viewport.
FORMULA: N_{\mathrm{real}} = \emptyset \quad \lor \quad \frac{\mathrm{fontSize}(N_{\mathrm{real}})}{S_{\mathrm{base}}} < 0.5
#### 3. 3. Lexical Tokenization mapped to Forced Exchange
Mechanism summary: To verify that the abstraction is structurally enforced rather than merely cosmetic, we establish$C_{\mathrm{virtual}}$as a localized, non-standard token system and$T_{\mathrm{price}}(n)$as the extracted price text of the item located on state$V_{\mathrm{product}}$.
FORMULA: T_{\mathrm{price}}(n) \in C_{\mathrm{virtual}} \quad \land \quad \text{TransactionStatus}(n) \implies \text{Executed}(E_{\mathrm{exchange}})

### Disguised Ad [sneaking]
Applicable escapes: E1, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Cross-Origin Action Masking
Mechanism summary: The most adversarial variant of this pattern occurs when an ad intercepts a user's functional intent.
FORMULA: B_{\mathrm{action}} \neq \emptyset \quad \land \quad D_{\mathrm{target}}(B_{\mathrm{action}}) \neq D_{\mathrm{host}}
#### 2. 2. Morphological Similarity
Mechanism summary: To quantify visual mimicry, we define$V_{\mathrm{native}}$as the set of visual feature vectors (encompassing computed background color, typography, border radius, and aspect ratio) extracted from legitimate, primary action nodes on the page via image analysis.
FORMULA: \max_{v_i \in V_{\mathrm{native}}} \mathrm{sim}(v_{\mathrm{ad}}, v_i) > \tau_{\mathrm{blend}}
#### 3. 3. Semantic Mimicry of Native Action Labels
Mechanism summary: To establish a semantic baseline for Disguised Ad, the algorithm compares the text label of third-party advertising nodes$N_{\mathrm{ad}}$against a corpus of native functional labels$L_{\mathrm{native}}$(e.g., “Download,” “Next,” “Play”).
FORMULA: \max_{\ell \in L_{\mathrm{native}}} \mathrm{sim}(L(N_{\mathrm{ad}}), \ell) > \tau_{\mathrm{masquerade}}

### Sneak Into Basket [sneaking]
Applicable escapes: E1, E2, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Unprompted State Mutation
Mechanism summary: To formalize this unauthorized injection, we define$I_{\mathrm{explicit}}$as the set of product items the user has actively selected via direct DOM interaction events$E_{\mathrm{user}}$(e.g., explicit clicks on “Add to Cart” buttons).
FORMULA: (I_{\mathrm{cart}} \setminus I_{\mathrm{explicit}} \neq \emptyset) \quad \land \quad \nexists e \in E_{\mathrm{user}} \implies \mathrm{Add}(y)
#### 2. 2. Visual Indistinguishability of Surcharged Items
Mechanism summary: To establish a visual baseline for Sneak Into Basket, the algorithm compares the visual feature vectors of cart line items explicitly selected by the user ($V_{\mathrm{user}}$) against those surreptitiously injected by the system ($V_{\mathrm{injected}}$).
FORMULA: \min_{v_u \in V_{\mathrm{user}}} \|v_{\mathrm{injected}} - v_u\|_2 < \tau_{\mathrm{camouflage}}
#### 3. 3. Semantic Obscuration of Injected Line Items
Mechanism summary: To establish a semantic baseline for Sneak Into Basket, the algorithm inspects the text content of cart line items for disclosure language indicating optional add-ons—“donation,” “optional,” “you may also like.” The feature triggers if a surreptitiously added item$N_{\mathrm{injected}}$carries a text description whose semantic content reveals its add-on natu
FORMULA: \mathrm{Entailment}(T(N_{\mathrm{injected}}), \text{``optional add-on''}) = \mathrm{True} \quad \land \quad \mathrm{UserConsented}(N_{\mathrm{injected}}) = \mathrm{False}

### Drip Pricing, Hidden Costs, or Partitioned Pricing [sneaking]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Sequential Price Inflation
Mechanism summary: To track the inflation of cost across a transaction, we model the checkout flow as a sequence of user states$S = (s_0, s_1, \dots, s_n)$, where$s_0$represents the initial product page and$s_n$denotes the final payment confirmation page.
FORMULA: P(s_n) > P(s_0) + I_{\mathrm{added}} \quad \implies \quad P_{\mathrm{dripped}} > 0
#### 2. 2. Visual Disparity of Cost Partitioning
Mechanism summary: Even when partitioned fees are technically disclosed on the same page, their impact is frequently minimized through visual suppression.
FORMULA: \frac{V(N_{\mathrm{base}})}{V(N_{\mathrm{fee}})} > \tau_{\mathrm{prominence}}
#### 3. 3. Semantic Concealment of Mandatory Fee Disclosure
Mechanism summary: To establish a semantic baseline for Drip Pricing, the algorithm scans the checkout flow for mandatory-fee descriptors (“service fee,” “booking fee,” “convenience charge”) and evaluates whether these terms appear in the initial price presentation or only at the final confirmation step.
FORMULA: T_{\mathrm{initial}} \cap K_{\mathrm{fees}} = \emptyset \quad \land \quad T_{\mathrm{final}} \cap K_{\mathrm{fees}} \neq \emptyset

### Bundling [sneaking]
Applicable escapes: E1, E2, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Inseparable Transactional Nodes
Mechanism summary: To detect this artificial fusion, we define$I_{\mathrm{primary}}$as the digital good or service the user explicitly intends to purchase, and$I_{\mathrm{supp}}$as a supplementary item (such as an extended warranty, a mandatory accessory, or a secondary subscription).
FORMULA: E_{\mathrm{purchase}}(I_{\mathrm{primary}}) \implies \{I_{\mathrm{primary}}, I_{\mathrm{supp}}\} \subseteq C_{\mathrm{state}} \quad \land \quad \nexists e : e(I_{\mathrm{primary}}) \implies C_{\mathrm{state}} = \{I_{\mathrm{primary}}\}
#### 2. 2. Visual Obscuration of Individual Component Pricing
Mechanism summary: To establish a visual baseline for Bundling, the algorithm inspects the rendered pricing breakdown within a bundle offer container$C_{\mathrm{bundle}}$.
FORMULA: \frac{\sum_{n \in N_{\mathrm{components}}} A(n)}{A(C_{\mathrm{bundle}})} < \tau_{\mathrm{breakdown}}
#### 3. 3. Semantic Suppression of Individual Item Descriptions
Mechanism summary: To establish a semantic baseline for Bundling, the algorithm compares the average text length and descriptive granularity of individual item descriptions within a bundle against equivalent standalone product descriptions on the same site.
FORMULA: \frac{H(T_{\mathrm{bundled}})}{H(T_{\mathrm{standalone}})} < \tau_{\mathrm{description}}

### Hidden Information [sneaking]
Applicable escapes: E1, E2, E3, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Burial in High-Density Text
Mechanism summary: Information is frequently hidden by drowning it in a high-density textual monolith designed to induce cognitive exhaustion.
FORMULA: |W(N_{\mathrm{document}})| > \tau_{\mathrm{fatigue}} \quad \land \quad P(t_{\mathrm{clause}}) = \mathrm{False}
#### 2. 2. Typographical and Chromatic Camouflage
Mechanism summary: To quantify the visual suppression of essential terms, we identify$N_{\mathrm{critical}}$as a DOM node containing NLP-identified critical phrases (e.g., {“auto-renew”, “subscription”, “cancel at any time”}).
FORMULA: S_{\mathrm{font}}(N_{\mathrm{critical}}) < \tau_{\mathrm{min\_readable}} \quad \lor \quad \mathrm{CR}(N_{\mathrm{critical}}, L_{\mathrm{bg}}) < \tau_{\mathrm{wcag\_min}}
#### 3. 3. Semantic Concealment of Adverse Terms
Mechanism summary: To establish a semantic baseline for Hidden Information, the algorithm searches for adverse disclosure terms—“fee,” “cancellation,” “auto-renew,” “liability”—and evaluates their visibility status.
FORMULA: K_{\mathrm{adverse}} \cap T_{\mathrm{DOM}} \neq \emptyset \quad \land \quad \mathrm{IsConcealed}(N_{\mathrm{adverse}}) = \mathrm{True}

### Reduced Friction [sneaking]
Applicable escapes: E1, E2, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Absence of Confirmation Interstitial
Mechanism summary: To identify the removal of critical decision boundaries, we define$S_{\mathrm{intent}}$as the state where the user views an offer and$S_{\mathrm{commit}}$as the final, irreversible transactional state (e.g., payment processed).
FORMULA: E_{\mathrm{click}}(S_{\mathrm{intent}}) \implies S_{\mathrm{commit}} \quad \land \quad S_{\mathrm{confirm}} \notin \mathrm{Path}(S_{\mathrm{intent}} \to S_{\mathrm{commit}})
#### 2. 2. Visual Proximity of Destructive Actions to Neutral UI
Mechanism summary: To establish a visual baseline for Reduced Friction, the algorithm measures the spatial separation$d_{\mathrm{spatial}}(N_{\mathrm{destructive}}, N_{\mathrm{neutral}})$between a business-favorable destructive action (e.g., one-click purchase, irreversible delete) and adjacent neutral UI elements.
FORMULA: \min_{n \in N_{\mathrm{neutral}}} d_{\mathrm{spatial}}(N_{\mathrm{destructive}}, n) < \tau_{\mathrm{safety}}
#### 3. 3. Semantic Absence of Confirmation Language
Mechanism summary: To establish a semantic baseline for Reduced Friction, the algorithm searches for confirmation-seeking or reversibility-assuring language preceding a high-commitment action—“Are you sure?,” “This cannot be undone,” “Confirm purchase.” The feature triggers if a one-click purchase, irreversible deletion, or subscription commitment is executed without any seman
FORMULA: \neg\exists n \in \mathrm{Path}(v_{\mathrm{pre}}, v_{\mathrm{commit}}) : \mathrm{Match}(T(n), \mathrm{Pattern}_{\mathrm{confirm}}) = \mathrm{True}

### Forced Continuity [sneaking]
Applicable escapes: E1, E2, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Time-Triggered Silent State Mutation
Mechanism summary: To identify the automated nature of this financial trap, we define$t_{\mathrm{expiry}}$as the exact timestamp when the promotional period concludes.
FORMULA: t \geq t_{\mathrm{expiry}} \quad \implies \quad S_{\mathrm{account}}(t) \to S_{\mathrm{premium}} \quad \land \quad E_{\mathrm{charge}}(T_{\mathrm{payment}}) = \mathrm{True}
GIVEN: \mathrm{Consent}_{\mathrm{explicit}}(t) = \mathrm{False}
#### 2. 2. Absence of Temporal Feedforward
Mechanism summary: The efficacy of forced continuity depends on suppressing the user's visual awareness of impending charges.
FORMULA: \forall w \in W_{\mathrm{renewal}} : \mathrm{Visible}(w, t) = \mathrm{False} \quad \forall t \in [t_{\mathrm{expiry}} - \tau_{\mathrm{fair\_notice}}, t_{\mathrm{expiry}}]
GIVEN: \lor \quad \frac{A(w)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \quad \lor \quad \mathrm{CR}(w, L_{\mathrm{bg}}) < 3.0
#### 3. 3. Semantic Asymmetry Between Subscription and Cancellation Language
Mechanism summary: To establish a semantic baseline for Forced Continuity, the algorithm compares the Flesch-Kincaid readability and emotional valence of text on the subscription-initiation page against the cancellation page.
FORMULA: \mathrm{FKGL}(T_{\mathrm{cancel}}) - \mathrm{FKGL}(T_{\mathrm{signup}}) > 2 \quad \lor \quad \mathrm{Guilt}(T_{\mathrm{cancel}}) - \mathrm{Guilt}(T_{\mathrm{signup}}) > \tau_{\mathrm{guilt\_gap}}

### Privacy Zuckering [sneaking]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Bundled Consent and Granularity Violation
Mechanism summary: To identify the forced fusion of data categories, we define$D_{\mathrm{essential}}$as the subset of user data required to operate the core service and$D_{\mathrm{monetization}}$as data used strictly for profiling or third-party brokerage.
FORMULA: T_{\mathrm{accept}} = \mathrm{True} \quad \implies \quad (\mathrm{Access}(D_{\mathrm{essential}}) = \mathrm{True} \quad \land \quad \mathrm{Access}(D_{\mathrm{monetization}}) = \mathrm{True})
GIVEN: \nexists t_{\mathrm{alt}} : (t_{\mathrm{alt}} \implies \mathrm{Access}(D_{\mathrm{essential}}) \land \neg \mathrm{Access}(D_{\mathrm{monetization}}))
#### 2. 2. Visual Asymmetry Between Privacy-Invasive and Privacy-Preserving Options
Mechanism summary: To establish a visual baseline for Privacy Zuckering, the algorithm compares the visual weight of user-facing privacy choices.
FORMULA: \frac{W(N_{\mathrm{invasive}})}{W(N_{\mathrm{preserving}})} > \tau_{\mathrm{privacy\_skew}}
#### 3. 3. Semantic Ambiguity of Third-Party Entities
Mechanism summary: Deceptive interfaces often mask the scale of data distribution using linguistic \"umbrellas\".
FORMULA: |E_{\mathrm{actual}}| \gg 1 \quad \land \quad \mathrm{Specificity}(N_{\mathrm{disclosure}}) < \tau_{\mathrm{vague}}

### Friend Spam [sneaking]
Applicable escapes: E1, E2, E5.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Feedforward Intent vs. Payload Execution
Mechanism summary: To identify this deceptive shift in intent, we define$N_{\mathrm{prompt}}$as the text node requesting OAuth access or native contact permissions.
FORMULA: \mathrm{Intent}_{\mathrm{NLP}}(N_{\mathrm{prompt}}) \in D_{\mathrm{read\_only}} \quad \land \quad E_{\mathrm{backend\_action}}(T_{\mathrm{access}}) \implies \mathrm{SendMessages()}
#### 2. 2. Absence of Granular Selection
Mechanism summary: The most common implementation of Friend Spam involves bypassing the curation process to maximize message reach.
FORMULA: |S_{\mathrm{selected}}| = 0 \quad \land \quad |M_{\mathrm{dispatched}}| \approx |C_{\mathrm{network}}| \quad \implies \quad \mathrm{Unauthorized \: Broadcast}
#### 3. 3. Sender Identity Spoofing
Mechanism summary: To quantify the deceptive appropriation of identity, we isolate$I_{\mathrm{user}}$as the user's personal identity vectors (e.g., name or profile picture) and$I_{\mathrm{corp}}$as the actual corporate entity.
FORMULA: \mathrm{SenderAlias}(m_{\mathrm{outbound}}) = I_{\mathrm{user}} \quad \land \quad \mathrm{Author}(m_{\mathrm{outbound}}) = I_{\mathrm{corp}}

### Address Book Leeching [sneaking]
Applicable escapes: E1, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Utility-Permission Decoupling
Mechanism summary: To identify the coercive nature of the data request, we define$U_{\mathrm{core}}$as the primary, advertised utility of the application (e.g., a local music player or utility tool) and$P_{\mathrm{contacts}}$as the operating system-level permission to read the address book.
FORMULA: \mathrm{State}(U_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad P_{\mathrm{contacts}} = \mathrm{False} \quad \land \quad \mathrm{Dep}(U_{\mathrm{core}}, P_{\mathrm{contacts}}) = \emptyset
#### 2. 2. Visual Prominence of the Invite-All Affordance
Mechanism summary: To establish a visual baseline for Address Book Leeching, the algorithm identifies a mass-invitation button$N_{\mathrm{invite\_all}}$(e.g., “Invite All Contacts”) and a skip or deselect affordance$N_{\mathrm{skip}}$.
FORMULA: \frac{A(N_{\mathrm{invite\_all}})}{A(N_{\mathrm{skip}})} > \tau_{\mathrm{invite\_dominance}}
#### 3. 3. Semantic Framing of Contact-Sharing Consent
Mechanism summary: To establish a semantic baseline for Address Book Leeching, the algorithm inspects the text accompanying the contact-import permission prompt.
FORMULA: \mathrm{Frame}(T_{\mathrm{prompt}}) = \mathrm{Benefactive} \quad \land \quad \mathrm{Subject}(T_{\mathrm{prompt}}) = \mathrm{ThirdParty}

### Automatic Accept Third Party Term [sneaking]
Applicable escapes: E1, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Bundled Transitive Consent
Mechanism summary: To identify the forced fusion of distinct legal entities, we define$T_{\mathrm{primary}}$as the core terms of the main application and$T_{\mathrm{third\_party}} = \{t_1, t_2, \dots, t_n\}$as the set of agreements for external partner entities.
FORMULA: \mathrm{Accept}(T_{\mathrm{primary}}) \implies \forall t_i \in T_{\mathrm{third\_party}} : \mathrm{Accept}(t_i) = \mathrm{True}
GIVEN: \nexists \mathrm{Toggle}(t_i) \in \mathrm{DOM}
#### 2. 2. Opaque Entity Resolution
Mechanism summary: Deceptive interfaces often mask the scale of legal binding through linguistic \"umbrellas\".
FORMULA: E_{\mathrm{declared}} \subset E_{\mathrm{actual}} \quad \land \quad |E_{\mathrm{actual}}| \gg |E_{\mathrm{declared}}| \approx 0
#### 3. 3. Semantic Concealment of Third-Party Agreement Language
Mechanism summary: To establish a semantic baseline for Automatic Accept Third Party Term, the algorithm searches for legal-agreement language—“by continuing, you agree to,” “terms apply,” “third-party policies”—within pre-checked checkboxes or auto-accepted clauses.
FORMULA: T(N_{\mathrm{legal}}) \cap K_{\mathrm{agreement}} \neq \emptyset \quad \land \quad \mathrm{Checked}(N_{\mathrm{legal}}) = \mathrm{True} \quad \land \quad \mathrm{UserToggled}(N_{\mathrm{legal}}) = \mathrm{False}

### Pre-Delivered Content [sneaking]
Applicable escapes: E1, E2, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Unconsented Local Storage Consumption
Mechanism summary: To quantify the unauthorized appropriation of user hardware, we define$S_{\mathrm{local}}$as the user's physical storage environment and$C_{\mathrm{premium}}$as the set of high-capacity assets intended for future monetization.
FORMULA: C_{\mathrm{premium}} \subseteq S_{\mathrm{local}} \quad \text{given} \quad E_{\mathrm{consent}} = \emptyset \quad \land \quad \mathrm{Size}(C_{\mathrm{premium}}) \gg 0
#### 2. 2. Visual Density of Locked-Content Badges
Mechanism summary: To establish a visual baseline for Pre-Delivered Content, the algorithm scans the rendered interface for locked-content indicators—padlock icons, “Purchase to Unlock” overlays, or greyed-out premium feature tiles.
FORMULA: \frac{|\{n \in N : \mathrm{IsLocked}(n)\}|}{|\{n \in N : \mathrm{IsAccessible}(n)\}|} > \tau_{\mathrm{locked\_ratio}}
#### 3. 3. Semantic Framing of Local Assets as Purchase Opportunities
Mechanism summary: To establish a semantic baseline for Pre-Delivered Content, the algorithm compares the semantic framing of content items already present on the user's storage device.
FORMULA: \mathrm{Frame}(T_{\mathrm{asset}}) = \mathrm{Purchaseable} \quad \land \quad \mathrm{IsLocal}(A_{\mathrm{asset}}) = \mathrm{True}

### Fear Of Missing Out (FOMO) [urgency]
Applicable escapes: E1, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Artificial Temporal Scarcity
Mechanism summary: To algorithmically detect fabricated temporal scarcity, we monitor a dynamic DOM node$N_{\mathrm{timer}}$that actively decrements a time value.
FORMULA: T(s_0) \approx \Delta t \quad \land \quad T(s_1) \approx \Delta t \quad \implies \quad \mathrm{Fabricated \: Urgency}
#### 2. 2. Visual Pulsation Frequency of Urgency Indicators
Mechanism summary: To establish a visual baseline for Fear of Missing Out, the algorithm monitors the temporal update rate of urgency-signaling visual elements—including countdown timers, stock counters, and “selling fast” badges.
FORMULA: \min_{n \in N_{\mathrm{urgency}}} \Delta t_{\mathrm{refresh}}(n) < \tau_{\mathrm{pulsation}}
#### 3. 3. Semantic Density of Scarcity and Urgency Lexemes
Mechanism summary: To establish a semantic baseline for Fear of Missing Out, the algorithm computes the frequency of temporally urgent and scarcity-signaling lexemes—“limited,” “only X left,” “selling fast,” “ends soon”—within the visible text of a product or offer page.
FORMULA: \frac{|\{w \in T : w \in L_{\mathrm{FOMO}}\}|}{|T|} \times 100 > \tau_{\mathrm{fomo}}

### High Demand [urgency]
Applicable escapes: E1, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Metric Fabrication
Mechanism summary: To identify the decoupling of interface claims from reality, we define$U_{\mathrm{true}}(i, t)$as the actual count of unique users interacting with item$i$in the backend and$U_{\mathrm{displayed}}(i, t)$as the value rendered on the frontend.
FORMULA: U_{\mathrm{displayed}}(i, t) = R(a, b) \quad \text{given} \quad U_{\mathrm{displayed}}(i, t) \gg U_{\mathrm{true}}(i, t)
#### 2. 2. Visual Dynamics of Social-Proof Badges
Mechanism summary: To establish a visual baseline for High Demand, the algorithm inspects demand-signaling badges (“X people are viewing this,” “Y purchased in the last hour”) for visual embellishment.
FORMULA: \exists n \in N_{\mathrm{demand}} : \mathrm{IsAnimated}(n) = \mathrm{True} \quad \land \quad \Delta t_{\mathrm{update}}(n) < \tau_{\mathrm{animate}}
#### 3. 3. Semantic Verifiability of Social-Proof Quantifiers
Mechanism summary: To establish a semantic baseline for High Demand, the algorithm evaluates whether demand-asserting statements (“X people are viewing,” “Y bought this”) contain verifiable temporal or geographic qualifiers.
FORMULA: \exists q \in \mathbb{Z}^+ \subset T(N_{\mathrm{demand}}) \quad \land \quad \neg\exists \text{Qualifier}_{\mathrm{temporal/geographic}} \in T(N_{\mathrm{demand}})

### Low Stock [urgency]
Applicable escapes: E1, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Inventory Fabrication
Mechanism summary: To identify the decoupling of interface claims from inventory reality, we define$I_{\mathrm{true}}(x)$as the actual quantity of item$x$in the backend database and$I_{\mathrm{displayed}}(x)$as the value rendered on the frontend.
FORMULA: I_{\mathrm{displayed}}(x) \le \tau_{\mathrm{scarcity}} \quad \text{given} \quad I_{\mathrm{displayed}}(x) \ll I_{\mathrm{true}}(x)
#### 2. 2. Visual Alarm Salience of Scarcity Indicators
Mechanism summary: To establish a visual baseline for Low Stock, the algorithm examines stock-level messages for chromatic urgency coding.
FORMULA: \mathrm{Hue}(N_{\mathrm{stock}}) \in [0^\circ, 30^\circ] \quad \land \quad \Delta\mathrm{Stock}_{\mathrm{actual}} = 0
#### 3. 3. Semantic Verifiability of Stock-Level Quantifiers
Mechanism summary: To establish a semantic baseline for Low Stock, the algorithm inspects scarcity claims (“Only X left,” “X in stock”) for semantic consistency over time.
FORMULA: \exists t_1, t_2 : |t_2 - t_1| < 60\text{s} \quad \land \quad Q_{\mathrm{stock}}(t_1) \neq Q_{\mathrm{stock}}(t_2) \quad \land \quad \neg\mathrm{HasTransaction}(t_1, t_2)

### Activity Messages [urgency]
Applicable escapes: E1, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Asynchronous Event Fabrication
Mechanism summary: To identify the manufacture of synthetic social proof, we define$E_{\mathrm{real}}(t)$as the set of genuine transactions in the database and$M_{\mathrm{displayed}}(t)$as the activity message rendered on the client interface.
FORMULA: M_{\mathrm{displayed}}(t) \neq \emptyset \quad \land \quad M_{\mathrm{displayed}}(t) \notin E_{\mathrm{real}}(t)
#### 2. 2. Cognitive Interruption
Mechanism summary: The hostility of activity messages is often defined by their power to disrupt deliberative thinking.
FORMULA: \mathrm{Salience}(N_{\mathrm{activity}}) \to \mathrm{Max} \quad \land \quad \lambda_{\mathrm{interrupt}} > \tau_{\mathrm{cognitive\_load}} \implies S_{\mathrm{focus}} \to \mathrm{Disrupted}
#### 3. 3. Semantic Specificity of Activity-Notification Content
Mechanism summary: To establish a semantic baseline for Activity Messages, the algorithm evaluates the semantic specificity of social-activity notifications.
FORMULA: \mathrm{Specificity}(T_{\mathrm{activity}}) < \tau_{\mathrm{specificity}} \quad \land \quad \neg\exists \text{IdentityRef} \in T_{\mathrm{activity}}

### Countdown Timer [urgency]
Applicable escapes: E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Stateless Expiration
Mechanism summary: To identify the manufacture of synthetic urgency, we define$t_{\mathrm{load}}$as the timestamp of the client session initialization and$\Delta t_{\mathrm{countdown}}$as a hardcoded frontend duration.
FORMULA: T_{\mathrm{expire}} = t_{\mathrm{load}} + \Delta t_{\mathrm{countdown}} \quad \implies \quad \text{Urgency is functionally synthetic}
#### 2. 2. Cognitive Compression
Mechanism summary: The efficacy of a countdown timer relies on narrowing the window for rational thought.
FORMULA: \Delta t_{\mathrm{timer}} < \tau_{\mathrm{deliberation}} \quad \implies \quad \mathrm{Probability}(\mathrm{Rational\_Evaluation}) \to 0
#### 3. 3. Semantic Urgency Inflation via Temporal Lexemes
Mechanism summary: To establish a semantic baseline for Countdown Timer, the algorithm analyzes the text accompanying a visible countdown element for urgency-amplifying language.
FORMULA: \mathrm{IsCountdown}(N) = \mathrm{True} \quad \land \quad |T_{\mathrm{adjacent}}(N) \cap L_{\mathrm{amplify}}| > 0

### Limited Time Message [urgency]
Applicable escapes: E1, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Perpetual Extension
Mechanism summary: A fundamental indicator of deceptive urgency is the dynamic temporal shifting of the promotional constraint.
FORMULA: t_{\mathrm{current}} \ge T_{\mathrm{end}}(i) \implies T_{\mathrm{end}}(i+1) = t_{\mathrm{current}} + \Delta t_{\mathrm{extension}}
#### 2. 2. Visual Salience of Temporal-Urgency Chromatics
Mechanism summary: To establish a visual baseline for Limited Time Message, the algorithm inspects the container$C_{\mathrm{offer}}$for the co-occurrence of a time-constrained claim and high-saturation, warm-spectrum color styling.
FORMULA: \mathrm{Hue}(C_{\mathrm{offer}}) \in [0^\circ, 45^\circ] \quad \land \quad \mathrm{Match}(T(C_{\mathrm{offer}}), \mathrm{Pattern}_{\mathrm{temporal}}) = \mathrm{True}
#### 3. 3. Ambiguous Temporal Bounding
Mechanism summary: To identify the manufacture of anxiety through uncertainty, we define$M_{\mathrm{urgency}}$as the promotional text node and$T_{\mathrm{end}}$as the factual backend expiration.
FORMULA: \mathrm{Specificity}(M_{\mathrm{urgency}}) \approx 0 \quad \land \quad T_{\mathrm{end}} \notin \mathrm{DOM} \implies \mathrm{Urgency_{perceived}} \to \mathrm{Max}

### Price Comparison Prevention [misdirection]
Applicable escapes: E1, E2, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Fiat Decoupling
Mechanism summary: To detect the artificial severing of a price from its real-world value, we define$T_{\mathrm{price}}(n)$as the extracted textual value representing the cost within a product node$n$.
FORMULA: T_{\mathrm{price}}(n) \neq \emptyset \quad \land \quad F_{\mathrm{convert}}(T_{\mathrm{price}}(n)) = \emptyset
#### 2. 2. Visual Suppression of Unit-Price Information
Mechanism summary: To establish a visual baseline for Price Comparison Prevention, the algorithm extracts all rendered price-related text nodes and segments them into headline prices$N_{\mathrm{headline}}$and unit prices$N_{\mathrm{unit}}$(e.g., price-per-liter, price-per-gram).
FORMULA: \frac{\mathrm{fontSize}(N_{\mathrm{unit}})}{\mathrm{fontSize}(N_{\mathrm{headline}})} < \tau_{\mathrm{suppress}} \quad \lor \quad \frac{\mathrm{CR}(N_{\mathrm{unit}}, L_{\mathrm{bg}})}{\mathrm{CR}(N_{\mathrm{headline}}, L_{\mathrm{bg}})} < \tau_{\mathrm{suppress}}
#### 3. 3. Semantic Omission of Comparison-Relevant Qualifiers
Mechanism summary: To establish a semantic baseline for Price Comparison Prevention, the algorithm parses all price-adjacent text nodes for the presence of standardized unit-price qualifiers—“per liter,” “per oz,” “per 100g.” Let$Q_{\mathrm{standard}}$be the set of expected unit-price qualifiers for the product category and$Q_{\mathrm{rendered}}$be those actually present in th
FORMULA: Q_{\mathrm{standard}} \cap Q_{\mathrm{rendered}} = \emptyset

### Reference Pricing [misdirection]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Mathematical Exaggeration of Discount
Mechanism summary: Deceptive platforms frequently utilize extreme, mathematically improbable discounts to short-circuit rational evaluation and induce urgency.
FORMULA: \Delta_{\mathrm{pct}} = \frac{P_{\mathrm{ref}} - P_{\mathrm{cur}}}{P_{\mathrm{ref}}} \quad \implies \quad \Delta_{\mathrm{pct}} > \tau_{\mathrm{unrealistic}}
#### 2. 2. Visual Salience of Reference-Price Strikethrough
Mechanism summary: To establish a visual baseline for Reference Pricing, the algorithm extracts the strikethrough or “was” price node$N_{\mathrm{ref}}$and its accompanying current-price node$N_{\mathrm{current}}$.
FORMULA: \mathrm{CR}(N_{\mathrm{ref}}, L_{\mathrm{bg}}) < \tau_{\mathrm{ref\_cr}} \quad \land \quad \frac{\mathrm{fontSize}(N_{\mathrm{current}})}{\mathrm{fontSize}(N_{\mathrm{ref}})} > \tau_{\mathrm{size\_skew}}
#### 3. 3. Dual-Pricing Co-occurrence and Anchoring
Mechanism summary: To mathematically capture this visual anchoring, we identify$N_{\mathrm{cur}}$as the primary DOM node displaying the current selling price$P_{\mathrm{cur}}$, and$N_{\mathrm{ref}}$as an adjacent node displaying a secondary, higher reference price$P_{\mathrm{ref}}$.
FORMULA: P_{\mathrm{ref}} > P_{\mathrm{cur}} \quad \land \quad \mathrm{CSS}(N_{\mathrm{ref}}) \cap S_{\mathrm{strike}} \neq \emptyset

### Conflicting Information [misdirection]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Proximity of Contradictory Factual Nodes
Mechanism summary: To establish a structural baseline for Conflicting Information, the algorithm inspects the DOM tree for sibling or nested text nodes containing propositions whose logical intersection is null.
FORMULA: \exists t_1, t_2 \in \mathrm{Descendants}(C) : \mathrm{Prop}(t_1) \land \mathrm{Prop}(t_2) \implies \bot \quad \land \quad d_{\mathrm{DOM}}(t_1, t_2) < \tau_{\mathrm{proximity}}
#### 2. 2. Semantic-Visual Mismatch
Mechanism summary: Interfaces frequently weaponize established design heuristics to create deceptive feedforward cues.
FORMULA: \mathrm{Intent}(L(B)) \cap \mathrm{Affordance}(C(B)) = \emptyset \quad \implies \quad \mathrm{Contradiction}
#### 3. 3. Mutually Exclusive Factual Claims
Mechanism summary: To identify explicit structural deception, we define$N_{\mathrm{container}}$as a parent DOM node representing a single informational context (e.g., a pricing tier card or a modal window), containing distinct text nodes such as$t_1$and$t_2$.
FORMULA: \exists t_1, t_2 \in N_{\mathrm{container}} : \mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Unsatisfiable}

### Information Without Context [misdirection]
Applicable escapes: E1, E2, E3, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Orphaned Nodes
Mechanism summary: Notification badges are often weaponized to exploit the human psychological drive for task completion, driving engagement through unresolved cognitive tension.
FORMULA: d(N_{\mathrm{metric}}, N_{\mathrm{descriptor}}) > \tau_{\mathrm{orphan}}
#### 2. 2. Visual Prominence Imbalance Between Metric and Baseline
Mechanism summary: To establish a visual baseline for Information Without Context, the algorithm examines the spatial rendering of the orphaned metric node$N_{\mathrm{metric}}$relative to its descriptor.
FORMULA: \frac{W(N_{\mathrm{metric}})}{W(N_{\mathrm{context}})} > \tau_{\mathrm{context\_imbalance}} \quad \land \quad \mathrm{CR}(N_{\mathrm{metric}}, L_{\mathrm{bg}}) > 7.0
#### 3. 3. Unanchored Quantitative Metrics
Mechanism summary: To evaluate the intentional omission of scale, we define$N_{\mathrm{info}}$as a DOM node containing a prominent numerical value or metric extracted via Natural Language Processing (NLP), denoted as$v$(e.g., “Save 50” or “Score: 98”).
FORMULA: v \in N_{\mathrm{info}} \quad \land \quad (U_{\mathrm{val}} \notin S_{\mathrm{cluster}} \lor B_{\mathrm{val}} \notin S_{\mathrm{cluster}})

### False Hierarchy [misdirection]
Applicable escapes: E1, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Element Downgrading
Mechanism summary: Beyond aesthetic manipulation, interfaces frequently deprive user-favorable actions of their fundamental interaction signifiers and affordances.
FORMULA: \mathrm{Tag}(B_{\mathrm{business}}) = \texttt{<button>} \quad \land \quad \mathrm{Tag}(B_{\mathrm{user}}) = \texttt{<a>} \quad \land \quad S_{\mathrm{padding}}(B_{\mathrm{user}}) \approx 0
#### 2. 2. Relational Visual Weight Disparity
Mechanism summary: We define$B_{\mathrm{business}}$as the node representing the provider-favorable action, and$B_{\mathrm{user}}$as the opposing user-favorable action.
FORMULA: W(x) = \alpha \cdot A(x) + \beta \cdot C(x) + \gamma \cdot F(x)
GIVEN: \frac{W(B_{\mathrm{business}})}{W(B_{\mathrm{user}})} > \tau_{\mathrm{hierarchy}}
#### 3. 3. Strict Semantic Opposition
Mechanism summary: To establish this relational dependency, we evaluate two proximally close interactive DOM nodes,$B_{1}$and$B_{2}$, located within the same container$N_{\mathrm{parent}}$.
FORMULA: \exists \mathrm{Intent}(L(B_{1})) \equiv \neg \mathrm{Intent}(L(B_{2}))

### Visual Prominence [misdirection]
Applicable escapes: E1, E3, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Asymmetry in DOM Subtree Weight
Mechanism summary: To establish a structural baseline for Visual Prominence, the algorithm compares the DOM subtree complexity of the business-favorable action node$N_{\mathrm{favorable}}$against the median subtree of all other interactive siblings.
FORMULA: \frac{|\mathrm{Desc}(N_{\mathrm{favorable}})|}{\mathrm{median}_{s \in \mathrm{Siblings}(N_{\mathrm{favorable}})} |\mathrm{Desc}(s)|} > \tau_{\mathrm{subtree\_bloat}}
#### 2. 2. Absolute Bounding Box Dominance
Mechanism summary: To quantify this absolute dominance, we define$N_{\mathrm{favorable}}$as the DOM node representing the business-favorable action.
FORMULA: \frac{A(N_{\mathrm{favorable}})}{A(E_{\mathrm{baseline}})} > \tau_{\mathrm{area}}
#### 3. 3. Semantic Neutrality of Dominant Action Labels
Mechanism summary: To establish a semantic baseline for Visual Prominence, the algorithm computes the NLP sentiment and coercion scores of the text label on the visually dominant business-favorable action button$N_{\mathrm{favorable}}$.
FORMULA: |\mathrm{Sent}(L(N_{\mathrm{favorable}}))| > 0.5 \quad \lor \quad L(N_{\mathrm{favorable}}) \cap D_{\mathrm{coercion}} \neq \emptyset

### Persuasive Language [misdirection]
Applicable escapes: E1, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Density of Event Listeners on Coercive Text Nodes
Mechanism summary: To establish a structural baseline for Persuasive Language, the algorithm examines the DOM event-registration map for nodes classified as containing manipulative or coercive text.
FORMULA: \frac{|E(N_{\mathrm{coercive}})|}{|E(N_{\mathrm{neutral}})|} > \tau_{\mathrm{listener\_skew}}
#### 2. 2. Visual Emphasis Asymmetry on Coercive Text
Mechanism summary: To establish a visual baseline for Persuasive Language, the algorithm evaluates whether emotionally manipulative text nodes receive disproportionate typographic emphasis.
FORMULA: \frac{\mathrm{fontWeight}(N_{\mathrm{coercive}})}{\mathrm{fontWeight}(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}} \quad \lor \quad \frac{A(N_{\mathrm{coercive}})}{A(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}}
#### 3. 3. Truth-Conditional Satisfiability
Mechanism summary: To distinguish this pattern from outright deception, we analyze distinct semantic text nodes,$t_1$and$t_2$, within the same informational container.
FORMULA: \mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Satisfiable}

### Cuteness [misdirection]
Applicable escapes: E1, E2, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Conditional Injection of Affective Assets
Mechanism summary: To establish a structural baseline for Cuteness, the algorithm models the DOM mutation log$\Delta\mathrm{DOM}(t)$during a user session and cross-references it against the application state machine.
FORMULA: I_{\mathrm{affective}} \cap \mathrm{DOM}(s_{\mathrm{onboard}}) = \emptyset \quad \land \quad I_{\mathrm{affective}} \subset \mathrm{DOM}(s_{\mathrm{cancel}})
#### 2. 2. Context-Dependent Image Injection
Mechanism summary: To detect the manipulative visual deployment of affective assets, we model the application flow as a state machine where$s_{\mathrm{onboard}}$is the acquisition state and$s_{\mathrm{cancel}}$is the termination state.
FORMULA: I_{\mathrm{affective}} \notin I(s_{\mathrm{onboard}}) \quad \land \quad I_{\mathrm{affective}} \in I(s_{\mathrm{cancel}})
GIVEN: \land \quad \left( \frac{A(i)}{A_{\mathrm{viewport}}} > \tau_{\mathrm{prominence}} \quad \lor \quad \mathrm{CR}(i, L_{\mathrm{bg}}) > 7.0 \right) \quad \forall i \in I_{\mathrm{affective}}
#### 3. 3. Semantic Pairing of Guilt
Mechanism summary: Emotional manipulation is most effective when visual and semantic cues are combined.
FORMULA: \mathrm{Affect}(N_{\mathrm{text}}) > \tau_{\mathrm{guilt}} \quad \land \quad d_{\mathrm{spatial}}(N_{\mathrm{text}}, i) < \delta_{\mathrm{proximity}}

### Positive Or Negative Framing [misdirection]
Applicable escapes: E1, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Asymmetry of Framed Option Subtrees
Mechanism summary: To establish a structural baseline for Positive or Negative Framing, the algorithm compares the DOM topology of options presented under gain-framed and loss-framed modalities within the same decision container.
FORMULA: \frac{|T_{\mathrm{gain}} \setminus T_{\mathrm{loss}}|}{|T_{\mathrm{gain}} \cup T_{\mathrm{loss}}|} > \tau_{\mathrm{frame\_structure}}
#### 2. 2. Visual Weight Asymmetry Between Framing Poles
Mechanism summary: To establish a visual baseline for Positive or Negative Framing, the algorithm identifies paired interface segments presenting the same information under gain-framed ($F_{\mathrm{gain}}$) and loss-framed ($F_{\mathrm{loss}}$) modalities.
FORMULA: \max\left(\frac{W(F_{\mathrm{gain}})}{W(F_{\mathrm{loss}})}, \frac{W(F_{\mathrm{loss}})}{W(F_{\mathrm{gain}})}\right) > \tau_{\mathrm{frame\_asymmetry}}
#### 3. 3. Identification of Mutually Exclusive Vectors
Mechanism summary: To mathematically evaluate the decision context, we isolate$M_{\mathrm{decision}}$, a bounded DOM container (such as a modal or consent form) demanding a user choice.
FORMULA: A(B_{\mathrm{opt\_in}}) \equiv \neg A(B_{\mathrm{opt\_out}})

### Choice Overload [misdirection]
Applicable escapes: E1, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Excessive Element Quantization
Mechanism summary: To quantify the cognitive burden of an interface, we define$C_{\mathrm{choices}} = \{c_1, c_2, \dots, c_n\}$as the set of distinct, actionable input nodes (e.g., vendor checkboxes or cookie toggles) rendered within a singular decision context$M_{\mathrm{decision}}$.
FORMULA: |C_{\mathrm{choices}}| > \tau_{\mathrm{overload}}
#### 2. 2. Visual Density of Interactive Decision Elements
Mechanism summary: To establish a visual baseline for Choice Overload, the algorithm computes the spatial density$\rho$of interactive elements within the primary decision viewport.
FORMULA: \rho = \frac{n_{\mathrm{interactive}}}{A_{\mathrm{viewport}}} > \tau_{\mathrm{density}}
#### 3. 3. Semantic Similarity Collapse Among Options
Mechanism summary: To establish a semantic baseline for Choice Overload, the algorithm computes pairwise semantic similarity among all option descriptions within a decision container using LLM-generated semantic embeddings.
FORMULA: \frac{1}{|C|(|C|-1)} \sum_{i \neq j} \mathrm{sim}(T_i, T_j) > \tau_{\mathrm{similarity}}

### Plain Evil (Theoretical Construct) [misdirection]
Applicable escapes: E1, E2, E3, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Dark Pattern Singularity
Mechanism summary: To model the cumulative impact of an adversarial interface, we define$\mathbb{D} = \{D_1, D_2, \dots, D_n\}$as the set of all structurally defined dark patterns (e.g., Hidden Costs, Sneak into Basket, or Labyrinthine Navigation).
FORMULA: \sum_{i=1}^{n} \mathrm{Active}(D_i, M_{\mathrm{context}}) \ge \tau_{\mathrm{hostility}}
#### 2. 2. Visual Hostility Density Index
Mechanism summary: To establish a visual baseline for Compound Adversarial Architecture, the algorithm computes a compound hostility score$H$over the entire viewport by aggregating multiple visual-manipulation signals: dark-pattern-classified bounding boxes, urgency-color palettes (red/orange dominance), and below-threshold font sizes on cancellation vectors.
FORMULA: H = \frac{\sum_{i} \mathbb{1}_{\mathrm{hostile}}(N_i) \cdot w_i}{A_{\mathrm{viewport}}} > \tau_{\mathrm{hostility}}
#### 3. 3. Semantic Hostility Density Score
Mechanism summary: To establish a semantic baseline for Compound Adversarial Architecture, the algorithm computes a composite semantic hostility vector$H_{\mathrm{sem}}$over all visible text nodes, aggregating: (a) coercive-language density, (b) FKGL-complexity outliers, (c) sentiment-polarity spread, and (d) connotative manipulation score.
FORMULA: \|H_{\mathrm{sem}}\|_2 = \sqrt{\rho_{\mathrm{coerce}}^2 + \sigma_{\mathrm{FKGL}}^2 + \sigma_{\mathrm{sent}}^2 + \rho_{\mathrm{connot}}^2} > \tau_{\mathrm{hostile\_sem}}

### Endorsement And Testimonials [misdirection]
Applicable escapes: E1, E2, E3, E4.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Statistical Implausibility
Mechanism summary: To identify the manipulation of sentiment, we define$R_{\mathrm{total}}$as the total set of user reviews and$S(r_i)$as the star rating (1–5).
FORMULA: \mathrm{Mean}(S(R_{\mathrm{total}})) \approx 5.0 \quad \land \quad \mathrm{Var}(S(R_{\mathrm{total}})) \approx 0 \implies D_{\mathrm{rendered}} \neq D_{\mathrm{organic}}
#### 2. 2. Visual Verifiability of Testimonial Attribution
Mechanism summary: To establish a visual baseline for Endorsement and Testimonials, the algorithm examines each testimonial or review card$C_{\mathrm{testimonial}}$for the presence of verifiable source attribution—a full name, photograph, or linked profile.
FORMULA: \exists C_{\mathrm{testimonial}} : \neg\exists N_{\mathrm{attribution}} \in \mathrm{Descendants}(C_{\mathrm{testimonial}})
#### 3. 3. Provenance Obfuscation
Mechanism summary: Fabricated endorsements often rely on repetitive templates and reused assets to scale.
FORMULA: \mathrm{Similarity}(I_{\mathrm{avatar}}(P_i), I_{\mathrm{stock\_database}}) \approx 1 \quad \lor \quad \mathrm{Similarity}(T_{\mathrm{text}}(r_i), T_{\mathrm{text}}(r_j)) > \tau_{\mathrm{template}}

### Confirmshaming [misdirection]
Applicable escapes: E1, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Asymmetry in Decline-Option Accessibility
Mechanism summary: To establish a structural baseline for Confirmshaming, the algorithm compares the DOM properties of the acceptance node$N_{\mathrm{accept}}$against the decline node$N_{\mathrm{decline}}$.
FORMULA: \mathrm{Tag}(N_{\mathrm{decline}}) \notin \{\texttt{<button>}, \texttt{[role=\"button\"]}\} \quad \land \quad \mathrm{Tag}(N_{\mathrm{accept}}) = \texttt{<button>}
#### 2. 2. Visual Hierarchy Subversion
Mechanism summary: The efficacy of confirmshaming is often compounded by structural invisibility.
FORMULA: \mathrm{Vis}(N_{\mathrm{accept}}) \gg \mathrm{Vis}(N_{\mathrm{decline}}) \quad \land \quad \mathrm{Vis}(N_{\mathrm{decline}}) \to \tau_{\mathrm{minimum\_accessibility}}
#### 3. 3. Semantic Asymmetry
Mechanism summary: To identify the emotional weaponization of UI text, we define$N_{\mathrm{accept}}$as the affirmative node and$N_{\mathrm{decline}}$as the user's dismissal node.
FORMULA: S_{\mathrm{sentiment}}(N_{\mathrm{accept}}) > 0 \quad \land \quad S_{\mathrm{sentiment}}(N_{\mathrm{decline}}) \ll 0

### Psychological Tricks [misdirection]
Applicable escapes: E1, E2, E3.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Asymmetric Dominance
Mechanism summary: To identify the manipulation of relative perception, we define$O_{\mathrm{target}}$as the provider's preferred tier and$O_{\mathrm{competitor}}$as a lower-cost alternative.
FORMULA: V(O_{\mathrm{target}}) \gg V(O_{\mathrm{decoy}}) \quad \land \quad \mathrm{Cost}(O_{\mathrm{target}}) \approx \mathrm{Cost}(O_{\mathrm{decoy}}) \implies P_{\mathrm{select}}(O_{\mathrm{target}}) \to \mathrm{Max}
#### 2. 2. Cognitive Overload
Mechanism summary: The hostility of an interface is often measurable by the exhaustion it induces in the user.
FORMULA: |C_{\mathrm{matrix}}| \gg \tau_{\mathrm{fatigue}} \quad \implies \quad \lim_{t \to \infty} P_{\mathrm{select}}(D_{\mathrm{favorable}}) = 1
#### 3. 3. Reference Point Obfuscation
Mechanism summary: A fundamental indicator of cognitive contamination is the use of arbitrary anchors to inflate perceived value.
FORMULA: P_{\mathrm{anchor}} \gg P_{\mathrm{actual}} \quad \implies \quad \mathrm{WTP}(U_{\mathrm{anchored}}) > \mathrm{WTP}(U_{\mathrm{baseline}})

### Pressured Selling [nagging]
Applicable escapes: E1, E2, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Transactional Flow Interruption
Mechanism summary: To formalize this commandeering of user intent, we model the expected linear sequence of user states required to complete a purchase as$S_{\mathrm{checkout}}$.
FORMULA: \mathrm{Click}(B_{\mathrm{proceed}}) \implies \mathrm{Visibility}(M_{\mathrm{upsell}}) = \mathrm{True} \quad \land \quad s_{\mathrm{final}} \notin S_{\mathrm{current}}
#### 2. 2. Localized Temporal or Visual Constraints
Mechanism summary: Scarcity and urgency are frequently enforced using adversarial visual stimuli and synthetic temporal constraints.
FORMULA: \Delta t_{\mathrm{offer}} < \tau_{\mathrm{panic\_duration}} \quad \lor \quad (\mathrm{CSS}(M_{\mathrm{upsell}}) \cap V_{\mathrm{animations}} \neq \emptyset)
#### 3. 3. High-Arousal Lexical Density
Mechanism summary: To quantify the psychological stress induced by the interface, we extract$W(M)$, representing the set of textual tokens rendered within the newly injected modal$M_{\mathrm{upsell}}$.
FORMULA: \frac{|W(M) \cap D_{\mathrm{pressure}}|}{|W(M)|} > \tau_{\mathrm{arousal}}

### Small or Moving Close Button [interface-interference]
Applicable escapes: E1, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Event-Listener Commandeering on Dismissal Vectors
Mechanism summary: To establish a structural baseline for Small or Moving Close Button, the algorithm traces the registered event handlers on the identified close-button node$N_{\mathrm{close}}$.
FORMULA: \mathrm{IsIntercepted}(N_{\mathrm{close}}) = \mathrm{True} \quad \lor \quad \Delta t_{\mathrm{rebind}}(N_{\mathrm{close}}) < \tau_{\mathrm{rebind}}
#### 2. 2. Microscopic Hitbox
Mechanism summary: To evaluate the physical accessibility of the dismissal vector, we define$N_{\mathrm{close}}$as the DOM node or vision-language model-detected bounding box representing the close action.
FORMULA: A(N_{\mathrm{close}}) < \tau_{\mathrm{wcag\_hitbox}} \quad \lor \quad \frac{A(N_{\mathrm{close}})}{A(M_{\mathrm{parent}})} < \delta_{\mathrm{micro}}
#### 3. 3. Semantic Obfuscation of Dismissal Labels
Mechanism summary: To establish a semantic baseline for Small or Moving Close Button, the algorithm examines the aria-label, title attribute, and visible text of dismissal elements.
FORMULA: \mathrm{AccessibleName}(N_{\mathrm{close}}) = \emptyset \quad \lor \quad \mathrm{Intent}(\mathrm{AccessibleName}(N_{\mathrm{close}})) \neq \mathrm{Dismissal}

### Bad Defaults / Preselection [interface-interference]
Applicable escapes: E1, E2, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Pre-initialized Activation State
Mechanism summary: To formally define this state manipulation, we monitor the set$C$of all boolean input nodes within the interface (e.g., <input type=\"checkbox\">, <input type=\"radio\">, or custom toggle <div> elements).
FORMULA: \exists c \in C : \mathrm{State}(c, t_0) = \mathrm{True} \quad \land \quad \mathrm{UserEvents}(c, t_0) = \emptyset
#### 2. 2. Visual or Structural Obfuscation
Mechanism summary: The efficacy of a bad default is maximized when the user is unaware it exists.
FORMULA: V(c, t_0) = \mathrm{False} \quad \lor \quad d_{\mathrm{spatial}}(c, N_{\mathrm{submit}}) > \tau_{\mathrm{peripheral\_vision}}
#### 3. 3. Semantic Intent of the Default Action
Mechanism summary: Because not all defaults are malicious (e.g., defaulting to the cheapest shipping tier is user-favorable), we evaluate$L(c)$, the text label structurally bound to the pre-selected node$c$(often via the HTML for attribute).
FORMULA: \mathrm{Intent}(L(c)) \in \{D_{\mathrm{privacy\_loss}}, D_{\mathrm{financial\_cost}}, D_{\mathrm{marketing\_opt\_in}}\}

### Trick Questions [interface-interference]
Applicable escapes: E1, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Label-Input Semantic Mismatch
Mechanism summary: To establish a structural baseline for Trick Questions, the algorithm examines <input>, <select>, and <button> elements for a mismatch between their structural aria-label or associated <label> text and the NLP-inferred action semantics.
FORMULA: \mathrm{SemanticDist}(L_{\mathrm{aria}}(N), L_{\mathrm{visual}}(N)) > \tau_{\mathrm{label\_mismatch}}
#### 2. 2. Affordance-Consequence Mismatch
Mechanism summary: To capture the manipulation of standard UI heuristics, we define$\mathrm{State}(c) = \mathrm{True}$as the physical affordance of checking a box, which psychologically aligns with acceptance, inclusion, or addition.
FORMULA: (\mathrm{State}(c) = \mathrm{True}) \implies (\mathrm{Intent}(L(c)) \in D_{\mathrm{deny}})
#### 3. 3. Syntactic Obfuscation via Multiple Negations
Mechanism summary: To quantify linguistic deception, we extract the text label$L(c)$associated with a boolean input node$c$(e.g., a checkbox) and generate its syntactic dependency tree$T_{\mathrm{parse}}(L(c))$using an NLP parser.
FORMULA: N_{\mathrm{neg}}(L(c)) \geq 2 \quad \implies \quad \mathrm{Linguistic \: Obfuscation}

### Wrong Language [interface-interference]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Asymmetric State Application
Mechanism summary: The most deceptive implementation of this pattern involves maintaining linguistic clarity during user acquisition while introducing barriers during termination.
FORMULA: \mathbb{L}(S_{\mathrm{acquisition}}) = \{L_{\mathrm{session}}\} \quad \land \quad \mathbb{L}(S_{\mathrm{termination}}) \setminus \{L_{\mathrm{session}}\} \neq \emptyset
#### 2. 2. Visual-Linguistic Locale Mismatch
Mechanism summary: To establish a visual baseline for Wrong Language, the algorithm compares the dominant language$L_{\mathrm{DOM}}$detected in rendered text nodes (via lang attribute or character-set heuristics) against the user agent's declared locale$L_{\mathrm{browser}}$.
FORMULA: L_{\mathrm{DOM}}(N_{\mathrm{critical}}) \neq L_{\mathrm{browser}}
#### 3. 3. Localized Linguistic Discrepancy
Mechanism summary: To identify this structural obfuscation, we define$L_{\mathrm{session}}$as the primary language of the user's browsing session, typically determined by the <html lang=\"...\"> attribute.
FORMULA: \mathrm{Lang}(N_{\mathrm{critical}}) \neq L_{\mathrm{session}} \quad \land \quad \mathrm{Confidence}(\mathrm{Lang}(N_{\mathrm{critical}})) > \tau_{\mathrm{lang\_id}}

### Complex Language [interface-interference]
Applicable escapes: E1, E2, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Nesting Depth of Legal/Technical Text Nodes
Mechanism summary: To establish a structural baseline for Complex Language, the algorithm measures the DOM nesting depth and text-node length distribution within legal or terms-of-service containers$C_{\mathrm{legal}}$.
FORMULA: D_{\mathrm{DOM}}(N_{\mathrm{complex}}) > \tau_{\mathrm{legal\_depth}} \quad \lor \quad \frac{1}{|N_{\mathrm{complex}}|} \sum_{n} |\mathrm{text}(n)| > \tau_{\mathrm{clause\_length}}
#### 2. 2. Visual Density of Legalese Text Blocks
Mechanism summary: To establish a visual baseline for Complex Language, the algorithm identifies text nodes flagged by FKGL analysis as exceeding a 12th-grade reading level and evaluates their visual presentation.
FORMULA: \frac{\mathrm{fontSize}(N_{\mathrm{complex}})}{S_{\mathrm{base}}} < \tau_{\mathrm{shrink}} \quad \land \quad \mathrm{FKGL}(N_{\mathrm{complex}}) > 12
#### 3. 3. Exceedance of Baseline Readability Indices
Mechanism summary: To quantify the mismatch between user literacy and interface complexity, we identify$N_{\mathrm{text}}$as a DOM node containing a disclosure or policy paragraph.
FORMULA: \mathrm{FKGL}(N_{\mathrm{text}}) > \tau_{\mathrm{education\_limit}}

### Feedforward Ambiguity [interface-interference]
Applicable escapes: E1, E2, E3, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Structural Ambiguity of Action-Outcome Mapping
Mechanism summary: To establish a structural baseline for Feedforward Ambiguity, the algorithm inspects interactive elements whose onclick, href, or formaction targets resolve to URLs or state transitions with semantics that conflict with the element's rendered label.
FORMULA: \exists N \in \mathrm{Interactive} : \mathrm{Distance}(\mathrm{Expect}(L(N)), \mathrm{Resolve}(N)) > \tau_{\mathrm{feedforward}}
#### 2. 2. Iconographic Entropy and Missing Affordances
Mechanism summary: Visual polysemy is frequently weaponized by removing textual anchors from interactive icons.
FORMULA: H(\mathrm{CV}_{\mathrm{class}}(N_{\mathrm{icon}})) > \tau_{\mathrm{entropy}} \quad \land \quad T_{\mathrm{hover}} = \emptyset
#### 3. 3. Semantic Divergence of Action and Outcome
Mechanism summary: To identify deceptive labeling, we define$L(n)$as the text label of an interactive DOM node (e.g., “Next” or “I Agree”).
FORMULA: \mathrm{Sim}(\mathrm{Intent}_{\mathrm{NLP}}(L(n)), \mathrm{Outcome}_{\mathrm{System}}(n)) < \tau_{\mathrm{clarity}} \quad \land \quad \mathrm{Outcome}_{\mathrm{System}}(n) \in D_{\mathrm{critical}}

### Forced Registration [forced-action]
Applicable escapes: E1, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Absolute State Blocking
Mechanism summary: To identify the coercive nature of the interface flow, we define$S_{\mathrm{intent}}$as the initial user state (e.g., viewing a cart) and$S_{\mathrm{terminal}}$as the desired completion state (e.g., order confirmed).
FORMULA: \forall \pi \in \mathrm{Paths}(S_{\mathrm{intent}} \to S_{\mathrm{terminal}}) : S_{\mathrm{auth}} \in \pi
#### 2. 2. Visual Degradation of the Guest Checkout Pathway
Mechanism summary: To establish a visual baseline for Forced Registration, the algorithm extracts the “Continue as Guest” or “Skip Registration” link$N_{\mathrm{guest}}$and compares its visual rendering against the primary registration call-to-action$N_{\mathrm{register}}$.
FORMULA: \frac{W(N_{\mathrm{guest}})}{W(N_{\mathrm{register}})} < \tau_{\mathrm{guest\_visibility}}
#### 3. 3. Semantic Framing of the Guest-Checkout Option
Mechanism summary: To establish a semantic baseline for Forced Registration, the algorithm analyzes the text label of the guest-checkout or skip-registration pathway.
FORMULA: \mathrm{Sent}(L(N_{\mathrm{guest}})) < \tau_{\mathrm{guest\_sent}}

### Social Pyramid [forced-action]
Applicable escapes: E1, E3, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Referral-Gated Progression
Mechanism summary: To identify the coercive gating of features, we define$U_{\mathrm{core}}$as a locked core utility of the platform.
FORMULA: \mathrm{Access}(U_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad |R_{\mathrm{user}}| < k
#### 2. 2. Visual Prominence of Referral-Progress Gamification
Mechanism summary: To establish a visual baseline for Social Pyramid, the algorithm scans for gamified progress indicators—progress bars, tier-badges, referral counters—associated with invite-N-friends mechanics.
FORMULA: \frac{A(N_{\mathrm{referral\_progress}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{gamification}}
#### 3. 3. Semantic Escalation of Referral-Reward Language
Mechanism summary: To establish a semantic baseline for Social Pyramid, the algorithm tracks the semantic framing of referral incentives across progressive tiers.
FORMULA: \frac{\Delta \mathrm{Intensity}(\mathrm{Reward}_n)}{\Delta \mathrm{Intensity}(\mathrm{Reward}_{n-1})} > \tau_{\mathrm{escalation}}

### Granting and Interaction [forced-action]
Applicable escapes: E1, E2, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Interaction Gating
Mechanism summary: To identify the coercive fusion of utility and data access, we define$I_{\mathrm{core}}$as the primary set of interactions required to utilize the application's core functionality.
FORMULA: \mathrm{State}(I_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad (P_{\mathrm{requested}} = \mathrm{False} \quad \land \quad \mathrm{Dep}(I_{\mathrm{core}}, P_{\mathrm{requested}}) = \emptyset)
#### 2. 2. Asynchronous Overlay Misdirection
Mechanism summary: A particularly coercive tactic involves intercepting user momentum to manufacture \"accidental\" consent.
FORMULA: \mathrm{Pos}(M_{\mathrm{system\_prompt}}, t) \approx \mathrm{Pos}(B_{\mathrm{benign}}, t) \quad \text{as} \quad t \to t_{\mathrm{interaction}}
#### 3. 3. Semantic Scope Creep in Permission Requests
Mechanism summary: To establish a semantic baseline for Granting and Interaction, the algorithm compares the initial permission-request text against the actual permissions enumerated in the subsequent browser API call or manifest.
FORMULA: |\mathrm{Perms}_{\mathrm{actual}} \setminus \mathrm{Perms}_{\mathrm{disclosed}}| > 0

### Pay-To-Play [forced-action]
Applicable escapes: E1, E2, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Exponential Friction and Paid Bypass
Mechanism summary: To identify the manufacture of artificial inconvenience, we define$E_{\mathrm{free}}(L_i)$as the required effort—measured in time or repetitive tasks—to progress through stage$L_i$without spending currency.
FORMULA: E_{\mathrm{free}}(L_i) \propto c^i \quad (c > 1) \quad \land \quad E_{\mathrm{paid}}(L_i) = \mathcal{O}(1)
#### 2. 2. Visual Dominance of Payment-Unlock Overlays
Mechanism summary: To establish a visual baseline for Pay-To-Play, the algorithm detects locked-content regions$C_{\mathrm{locked}}$and their associated unlock-prompt overlays$O_{\mathrm{unlock}}$.
FORMULA: \frac{A(O_{\mathrm{unlock}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{occlusion}} \quad \lor \quad A(N_{\mathrm{dismiss}}) < 44 \times 44
#### 3. 3. Semantic Framing of Payment as Unlock
Mechanism summary: To establish a semantic baseline for Pay-To-Play, the algorithm inspects the lexical framing of payment prompts.
FORMULA: \mathrm{Frame}(T_{\mathrm{payment}}) \in \{\text{Unlock}, \text{Discover}, \text{Enhance}\} \quad \land \quad \mathrm{Frame}(T_{\mathrm{payment}}) \neq \mathrm{Transaction}

### Grinding [forced-action]
Applicable escapes: E1, E2, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Exponential Effort Scaling
Mechanism summary: To identify the manufacture of artificial tedium, we define$E(L_i \to L_{i+1})$as the interaction effort—measured in hours or repetitive tasks—required to transition between progression states.
FORMULA: E(L_i \to L_{i+1}) \propto c^i \quad (c > 1) \quad \land \quad V(L_{i+1}) \approx V(L_i) + k
#### 2. 2. Visual Diminishing-Returns Feedback Loop
Mechanism summary: To establish a visual baseline for Grinding, the algorithm monitors the incremental visual progress feedback$\Delta P_{\mathrm{visual}}$per user action over a sequence of$k$repeated interactions.
FORMULA: \frac{\Delta P_{k}}{\Delta P_{1}} < e^{-\lambda(k-1)} \quad \land \quad \frac{d^2 P}{di^2} < 0
#### 3. 3. Semantic Attenuation of Progress-Milestone Language
Mechanism summary: To establish a semantic baseline for Grinding, the algorithm monitors the semantic content of progress-feedback messages over a grinding session of$n$actions.
FORMULA: \Delta a_i = \mathrm{Pos}(\mathrm{Milestone}_{i}) - \mathrm{Pos}(\mathrm{Milestone}_{i-1}) \quad \land \quad \frac{d\Delta a}{di} > 0

### Playing By Appointment [forced-action]
Applicable escapes: E1, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Temporal Gating
Mechanism summary: To identify the removal of user-paced progression, we define$A_{\mathrm{core}}$as a primary interaction and$C_{\mathrm{energy}}(t)$as the user's available stamina or action currency.
FORMULA: \mathrm{State}(A_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{until} \quad t \ge t_{\mathrm{depletion}} + \tau_{\mathrm{refill}}
#### 2. 2. Visual Prominence of Temporal-Gating Indicators
Mechanism summary: To establish a visual baseline for Playing By Appointment, the algorithm identifies countdown timers, “available at” labels, and time-window restrictions$N_{\mathrm{temporal}}$that gate content access.
FORMULA: \frac{A(N_{\mathrm{temporal}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{appointment}} \quad \lor \quad \mathrm{Saturation}(N_{\mathrm{temporal}}) > 0.8
#### 3. 3. Semantic Urgency Encoding in Temporal-Gating Messages
Mechanism summary: To establish a semantic baseline for Playing By Appointment, the algorithm analyzes the sentiment and urgency scores of time-gating messages—“Come back at 3 PM,” “New content drops in 2 hours.” The feature triggers if temporal-gate messages carry an urgency sentiment score exceeding$\tau_{\mathrm{appointment\_urgency}}$while also embedding scarcity language 
FORMULA: \mathrm{Urgency}(T_{\mathrm{temporal}}) > \tau_{\mathrm{appointment\_urgency}} \quad \land \quad T_{\mathrm{temporal}} \cap L_{\mathrm{scarcity}} \neq \emptyset

### Watch Ads To Unlock Features Or Get Rewards [forced-action]
Applicable escapes: E1, E4, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Attention as Transactional Currency
Mechanism summary: To identify the commodification of user time, we define$R_{\mathrm{target}}$as the desired reward or locked feature and$V_{\mathrm{ad}}$as a video advertisement with a strictly defined duration$\Delta t_{\mathrm{ad}}$.
FORMULA: \int_{0}^{\Delta t_{\mathrm{ad}}} E_{\mathrm{playback}}(t) \, dt = \Delta t_{\mathrm{ad}} \implies \mathrm{State}(R_{\mathrm{target}}) \to \mathrm{Unlocked}
#### 2. 2. Visual Mismatch Between Reward Progress Display and Actual Progress
Mechanism summary: To establish a visual baseline for Watch Ads To Unlock Features, the algorithm compares the rendered progress indicator$P_{\mathrm{visual}}$(e.g., a progress bar shown to the user) against the actual reward-earned ratio$P_{\mathrm{actual}} = \frac{\text{ads watched}}{\text{ads required}}$.
FORMULA: P_{\mathrm{visual}} - P_{\mathrm{actual}} > \tau_{\mathrm{mislead}}
#### 3. 3. Semantic Inflation of Reward Value
Mechanism summary: To establish a semantic baseline for Watch Ads To Unlock Features, the algorithm compares the semantic framing of the advertised reward against its actual in-application utility.
FORMULA: \mathrm{Hyperbole}(T_{\mathrm{reward}}) - \mathrm{Utility}(R_{\mathrm{actual}}) > \tau_{\mathrm{hype\_gap}}

### Pay To Avoid [forced-action]
Applicable escapes: E1, E2, E3, E4, E5.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Artificial State Degradation
Mechanism summary: To identify the intentional suppression of software utility, we define$U_{\mathrm{system}}$as the objective, unthrottled performance capability of the software and$U_{\mathrm{default}}$as the baseline utility provided to the free user.
FORMULA: U_{\mathrm{default}} = U_{\mathrm{system}} - D_{\mathrm{artificial}} \quad \land \quad U_{\mathrm{default}} \ll U_{\mathrm{system}}
#### 2. 2. Visual Occupancy of the Pain-Point Element
Mechanism summary: To establish a visual baseline for Pay To Avoid, the algorithm identifies the friction element$N_{\mathrm{pain}}$—a countdown timer, a full-screen ad, or a forced waiting screen—that the user can pay to remove.
FORMULA: \frac{A(N_{\mathrm{pain}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{pain}}
#### 3. 3. Pain-Point Amplification
Mechanism summary: The system frequently weaponizes the user's growing frustration to force capitulation.
FORMULA: \frac{d}{dt} \lambda_{\mathrm{friction}}(t) > 0 \quad \implies \quad P(N_{\mathrm{prompt}} \mid \lambda_{\mathrm{friction}}) \approx 1

### Automating The User Away [forced-action]
Applicable escapes: E1, E2, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Autonomous Action Execution
Mechanism summary: To identify the removal of user-led intent, we define$A_{\mathrm{critical}}$as a primary, state-altering action (e.g., loading a new media asset or initiating a download).
FORMULA: A_{\mathrm{critical}} = \mathrm{Executed} \quad \text{given} \quad E_{\mathrm{user}} = \emptyset \quad \land \quad t \ge \tau_{\mathrm{system}}
#### 2. 2. Omission of the Interrupt Vector
Mechanism summary: The hostility of an automated system is defined by the window of opportunity it grants the user to intervene.
FORMULA: B_{\mathrm{cancel}} \notin \mathrm{DOM}(t) \quad \lor \quad \Delta t_{\mathrm{warning}} < \tau_{\mathrm{reaction}}
#### 3. 3. Semantic Speed of Consent-Timing Language
Mechanism summary: To establish a semantic baseline for Automating The User Away, the algorithm evaluates whether the interface provides semantically adequate processing time for consent decisions.
FORMULA: t_{\mathrm{window}} < 2.0 \quad \land \quad \mathrm{SemanticType}(T_{\mathrm{prompt}}) = \mathrm{TimedConsent}

### Parasocial Pressure [forced-action]
Applicable escapes: E1, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Manufactured Livelihood Dependency
Mechanism summary: A fundamental deceptive tactic involves framing transactions as acute rescues of a creator's well-being rather than commercial exchanges.
FORMULA: T_{\mathrm{fiat}} = 0 \implies \mathrm{State}(I_{\mathrm{creator}}) \to \mathrm{Failure} \quad \text{asserted within} \quad M_{\mathrm{pitch}}
#### 2. 2. Visual Proximity of Anthropomorphic Imagery to Action Prompts
Mechanism summary: To establish a visual baseline for Parasocial Pressure, the algorithm detects face-like or mascot imagery$I_{\mathrm{face}}$(via the vision-language model's face detection or anthropomorphic classification) and measures the spatial distance$d$to the nearest action-prompt node$N_{\mathrm{prompt}}$.
FORMULA: \min_{i \in I_{\mathrm{face}}} d_{\mathrm{spatial}}(i, N_{\mathrm{prompt}}) < \tau_{\mathrm{social}} \quad \land \quad \frac{A(i)}{A_{\mathrm{viewport}}} > 0.05
#### 3. 3. Emotional Asymmetry
Mechanism summary: To identify the weaponization of artificial guilt, we define$A_{\mathrm{mascot}}$as the representation of the parasocial entity and$E_{\mathrm{user}}$as the user's intent to disengage or decline an offer.
FORMULA: E_{\mathrm{user}} = \mathrm{Refusal} \implies \frac{d}{dt} V_{\mathrm{emotion}}(A_{\mathrm{mascot}}) \to -1

### Encouraging Anti-Social Behavior [forced-action]
Applicable escapes: E1, E2, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Reward-Coupled Social Externality
Mechanism summary: To identify the subsidization of user success through social extraction, we define$A_{\mathrm{antisocial}}$as an action directed at non-consenting third parties (e.g., unsolicited mass-invites) and$V_{\mathrm{reward}}$as the in-app value granted to the initiating user.
FORMULA: A_{\mathrm{antisocial}} \implies (V_{\mathrm{reward}} > 0 \quad \land \quad E_{\mathrm{externality}} \gg 0)
#### 2. 2. Visual Framing of Competitive Antagonism
Mechanism summary: To establish a visual baseline for Encouraging Anti-Social Behavior, the algorithm detects competitive-visualization layouts—side-by-side scoreboards, “You vs.\ Them” splits, or leaderboard tables with the user's row highlighted in a confrontational color.
FORMULA: \mathrm{LayoutType}(C_{\mathrm{container}}) = \mathrm{Competitive} \quad \land \quad \mathrm{SplitRatio} \approx 0.5
#### 3. 3. Algorithmic Amplification of Outrage
Mechanism summary: Deceptive systems often utilize operant conditioning to erode pro-social norms.
FORMULA: V_{\mathrm{visibility}}(M) \propto P_{\mathrm{polarity}}(M) \quad \implies \quad \text{Systemic Incentive for Hostility}

### Addictive Design [attention-manipulation]
Applicable escapes: E1, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Infinite Frictionless Continuation
Mechanism summary: To model the elimination of physical boundaries, we define$Y_{\mathrm{scroll}}(t)$as the user's vertical scroll position and$Y_{\mathrm{max}}(t)$as the total renderable height of the document$N_{\mathrm{document}}$.
FORMULA: Y_{\mathrm{max}}(t) - Y_{\mathrm{scroll}}(t) < \tau_{\mathrm{buffer}} \quad \implies \quad E_{\mathrm{append}} = \mathrm{True}
GIVEN: \lim_{t \to \infty} Y_{\mathrm{max}}(t) = \infty
#### 2. 2. Eradication of Natural Stopping Cues
Mechanism summary: A fundamental deceptive tactic involves the systematic removal of visual signals that allow for cognitive closure.
FORMULA: \forall e \in E_{\mathrm{stop}} : \mathrm{Visible}(e, t) = \mathrm{False} \quad \lor \quad \frac{A(e)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \quad \lor \quad \mathrm{CR}(e, L_{\mathrm{bg}}) < 3.0
GIVEN: T_{\mathrm{session}} > \tau_{\mathrm{hyper\_engagement}}
#### 3. 3. Semantic Reinforcement-Trigger Lexicon Density
Mechanism summary: To establish a semantic baseline for Addictive Design, the algorithm scans the interface for operant-conditioning language patterns—“streak,” “level up,” “claim reward,” “daily bonus,” “spin again.” The feature triggers if reinforcement-schedule lexemes appear at a density exceeding$\tau_{\mathrm{addiction}}$per visible text area, indicating that the interfa
FORMULA: \frac{|\{w \in T : w \in L_{\mathrm{reinforcement}}\}|}{A_{\mathrm{viewport}}} > \tau_{\mathrm{addiction}}

### Infinite Scrolling [attention-manipulation]
Applicable escapes: E2, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Autonomous Content Injection
Mechanism summary: To identify the removal of explicit user choice, we define$Y_{\mathrm{viewport}}$as the bottom vertical coordinate of the user's current screen and$Y_{\mathrm{document\_end}}$as the absolute vertical coordinate of the content container's end.
FORMULA: Y_{\mathrm{document\_end}} - Y_{\mathrm{viewport}} \leq \tau_{\mathrm{trigger}} \quad \implies \quad E_{\mathrm{fetch}}() = \mathrm{True}
#### 2. 2. The Unreachable Footer
Mechanism summary: A fundamental deceptive tactic involves the literal evasion of utility links.
FORMULA: v_{\mathrm{scroll}} > 0 \quad \implies \quad \frac{d}{dt} \mathrm{Pos}_{y}(N_{\mathrm{footer}}, t) \geq v_{\mathrm{scroll}}
GIVEN: \lim_{t \to \infty} d(Y_{\mathrm{viewport}}, \mathrm{Pos}_{y}(N_{\mathrm{footer}})) > 0
#### 3. 3. Semantic Attenuation of Content Boundaries
Mechanism summary: To establish a semantic baseline for Infinite Scrolling, the algorithm detects the absence of pagination or content-termination language—“page 1 of N,” “end of results,” “no more items.” The feature triggers if a scrollable content feed lacks any semantic boundary marker within the rendered text, indicating that the interface deliberately removes linguistic 
FORMULA: \neg\exists n \in N_{\mathrm{feed}} : \mathrm{Match}(T(n), \mathrm{Pattern}_{\mathrm{boundary}}) = \mathrm{True}

### Pull To Refresh (Variable-Reward Trap) [attention-manipulation]
Applicable escapes: E1, E2, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Kinesthetic Resistance and Action Commitment
Mechanism summary: To model the physical investment required by the interface, we define$\Delta Y_{\mathrm{touch}}(t)$as the continuous downward vertical displacement of the user's touch event at the top of the scroll container.
FORMULA: \Delta Y_{\mathrm{touch}}(t) \geq \tau_{\mathrm{commit}} \quad \land \quad R_{\mathrm{elastic}} > 0 \quad \implies \quad E_{\mathrm{refresh}}() = \mathrm{True}
#### 2. 2. Artificial Anticipation Injection
Mechanism summary: A fundamental deceptive tactic involves the decoupling of animation from technical necessity to build psychological suspense.
FORMULA: \Delta t_{\mathrm{animation}} \gg \Delta t_{\mathrm{network}} \quad \land \quad \Delta t_{\mathrm{animation}} \geq \tau_{\mathrm{suspense}}
#### 3. 3. Semantic Variability of Refresh-Outcome Messaging
Mechanism summary: To establish a semantic baseline for Pull-To-Refresh Variable Reward Trap, the algorithm monitors the textual content of refresh-feedback messages over$k$consecutive refresh actions.
FORMULA: \sigma^2(\{\mathrm{Novelty}(T_i) : i = 1 \ldots k\}) > \tau_{\mathrm{slot\_machine}}

### Countdown On Ads [attention-manipulation]
Applicable escapes: E1, E3, E4, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Temporal Gating of Navigational Agency
Mechanism summary: To identify the removal of navigational control, we define$B_{\mathrm{skip}}$as the interactive node required to dismiss the advertisement and$t_{\mathrm{active}}$as the continuous time elapsed since the ad entered the viewport.
FORMULA: \mathrm{State}(B_{\mathrm{skip}}, t_{\mathrm{active}}) = \mathrm{Disabled} \quad \text{given} \quad t_{\mathrm{active}} < \tau_{\mathrm{lock}}
#### 2. 2. Dynamic Affordance Injection
Mechanism summary: A fundamental deceptive tactic involves the total suppression of exit indicators to prevent the user from planning their departure.
FORMULA: N_{\mathrm{close}} \notin \mathrm{DOM}(t) \quad \forall t < \tau_{\mathrm{lock}} \quad \land \quad N_{\mathrm{close}} \in \mathrm{DOM}(\tau_{\mathrm{lock}})
#### 3. 3. Semantic Framing of Ad-Watching as Exchange
Mechanism summary: To establish a semantic baseline for Countdown On Ads, the algorithm assesses whether the ad-viewing experience is framed as a quid-pro-quo exchange.
FORMULA: \mathrm{Frame}(T_{\mathrm{ad\_context}}) \in \{\text{Reward}, \text{Offer}, \text{Bonus}\} \quad \land \quad \mathrm{UserAction} = \mathrm{ForcedViewing}

### Auto-Play [attention-manipulation]
Applicable escapes: E1, E2, E5, E6.
Evaluate the following unchanged predicates; do not invent missing values:
#### 1. 1. Autonomous Media Execution
Mechanism summary: To identify the removal of user-led intent, we define$M_{\mathrm{media}}$as a continuous audiovisual asset and$S_{\mathrm{play}}(M)$as its active playback state.
FORMULA: S_{\mathrm{play}}(M_{\mathrm{media}}) = \mathrm{True} \quad \text{given} \quad E_{\mathrm{intent}} = \emptyset \quad \land \quad \mathrm{Intersection}(M_{\mathrm{media}}, \mathrm{Viewport}) > \tau_{\mathrm{visible}}
#### 2. 2. Affordance Suppression
Mechanism summary: The hostility of an auto-play system is exacerbated by inflating the friction required to regain control.
FORMULA: \mathrm{Visibility}(B_{\mathrm{cancel}}) \to 0 \quad \lor \quad \mathrm{Cost}(S_{\mathrm{play}} \to \mathrm{False}) \gg 1
#### 3. 3. Semantic Framing of Auto-Play as Content Continuation
Mechanism summary: To establish a semantic baseline for Auto-Play, the algorithm inspects the labeling of the auto-play mechanism.
FORMULA: \mathrm{Frame}(T_{\mathrm{autoplay}}) \in \{\text{Continuation}, \text{Next}\} \quad \land \quad \neg\exists \text{``autoplay''} \in T_{\mathrm{visible}}

