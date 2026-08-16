# Formal Ontology of Deceptive Interface Heuristics

The following is the complete formal framework used to audit web interfaces for deceptive design. Each pattern is decomposed into formal conditions. Use these definitions to verify your classifications with explicit checks.

## Immortal Accounts  [obstruction]
### 1. Asymmetrical Navigational Depth
Drawing on the Keystroke-Level Model for measuring human-computer interaction cost, we establish$N(x)$to represent the minimum number of discrete user interactions (e.g., clicks, modal confirmations) required to complete a given action$x$from the primary dashboard. By comparing the onboarding process ($x_{\mathrm{create}}$) against the offboarding process ($x_{\mathrm{delete}}$), the system triggers an alert if$N(x_{\mathrm{delete}})$exceeds a predefined heuristic threshold ($\tau = 4$), or if the ratio of deletion effort to creation effort represents a highly skewed asymmetry beyond a tolerance constant$\delta$:
FORMULA: \frac{N(x_{\mathrm{delete}})}{N(x_{\mathrm{create}})} > \delta

### 2. Visual Accessibility of Offboarding Vectors
To establish a visual baseline for Immortal Accounts, the algorithm evaluates whether account deletion or offboarding UI elements are rendered with visual properties commensurate to their onboarding counterparts. The bounding box area$A(N_{\mathrm{delete}})$of the highest-ranked deletion affordance is compared against$A(N_{\mathrm{create}})$, the mean area of primary creation-flow call-to-action buttons (e.g., “Sign Up”). The feature triggers if the visual prominence of the exit vector is systematically demoted below a fairness threshold$\tau_{\mathrm{exit\_visibility}}$, indicating that the interface deliberately conceals the means of account termination through visual subordination:
FORMULA: \frac{A(N_{\mathrm{delete}})}{A(N_{\mathrm{create}})} < \tau_{\mathrm{exit\_visibility}}

### 3. Absolute Absence of Deletion Vectors
To detect the complete omission of exit pathways, we define$K_{\mathrm{del}}$as the semantic set of account termination keywords (e.g., {“delete account”, “deactivate”, “close account”, “remove profile”}) and$T_{\mathrm{DOM}}$as the collection of all visible text nodes within the user's account settings and profile sub-pages. The feature triggers if the intersection of these sets evaluates to empty, proving that the interface offers no structural exit affordance:
FORMULA: K_{\mathrm{del}} \cap T_{\mathrm{DOM}} = \emptyset

## Dead End  [obstruction]
### 1. Topological Sink in the Navigational Graph
To model the interface as a directed graph$G = (V, E)$, we define$V$as the set of user interface states (such as pages or modals) and$E$as the available interactive transitions. From the active interface state$v_{\mathrm{current}}$, we evaluate the set of all outgoing transition edges, denoted as$E_{\mathrm{out}}(v_{\mathrm{current}})$. If we define$V_{\mathrm{forced}}$as the subset of states representing business-favorable compliance (e.g., “Accept All” or “Subscribe”), the feature triggers if every available outgoing edge strictly forces compliance. This occurs when no edge maps back to a neutral exit state or the previous state$v_{\mathrm{prev}}$, mathematically establishing a navigational trap:
FORMULA: \forall e \in E_{\mathrm{out}}(v_{\mathrm{current}}), \text{target}(e) \in V_{\mathrm{forced}} \implies \text{No Escape Path}

### 2. Visual Absence of Dismissal Vectors
Modals and overlays represent temporary interruptions in a user's workflow, demanding an explicit dismissal affordance to maintain usability and trust. To identify structural traps, we define$C_{\mathrm{dismiss}}$as the set of bounding boxes identified by the vision-language model as “close icons”, “dismissal vectors”, or “cancel/back buttons”. If the current interface state$v_{\mathrm{current}}$is identified structurally as an overlay or modal (e.g., characterized by a CSS z-index greater than 100), the visual feature triggers if the set of dismissal objects is entirely empty. This proves the system has deliberately removed the visual means to escape the interruption:
FORMULA: C_{\mathrm{dismiss}} = \emptyset \quad \land \quad \text{IsOverlay}(v_{\mathrm{current}}) = \mathrm{True}

### 3. Semantic Coercion Density in Trapped States
To establish a semantic baseline for Dead End, the algorithm evaluates the NLP sentiment of all visible text within a navigational dead-end state$v_{\mathrm{trap}}$. The feature triggers if the semantic payload of the trapped page exhibits coercive language density—measured as the ratio of imperative verbs and urgency-signaling lexemes to total word count—exceeding a coercion threshold$\tau_{\mathrm{coercion}}$, indicating that the interface compounds structural entrapment with linguistic pressure:
FORMULA: \frac{|\{\text{Imperative}(w) \lor \text{Urgency}(w) : w \in T(v_{\mathrm{trap}})\}|}{|T(v_{\mathrm{trap}})|} > \tau_{\mathrm{coercion}}

## Forced Grace Period  [obstruction]
### 1. Temporal Discrepancy Extraction
To quantify the artificial delay imposed on the user, we define$T_{\mathrm{request}}$as the exact timestamp when the termination request is submitted. The system then utilizes a Named Entity Recognition (NER) model to parse the confirmation text node$n_{\mathrm{confirm}}$and extract future date or time span entities, denoted as$E_{\mathrm{time}}$(e.g., “30 days” or “next billing cycle”). By converting these entities into a parsed future timestamp$T_{\mathrm{execute}}$, the feature triggers if the calculated delay strictly exceeds a predefined heuristic threshold$\Delta t_{\mathrm{min}}$(such as 24 hours), proving the delay is a programmatic constraint rather than a technical necessity:
FORMULA: T_{\mathrm{execute}} - T_{\mathrm{request}} \geq \Delta t_{\mathrm{min}}

### 2. Visual Conspicuity of Cancellation Affordance
To establish a visual baseline for Forced Grace Period, the algorithm evaluates the rendered salience of the cancellation or opt-out vector during the mandatory waiting window. Let$S(N_{\mathrm{cancel}})$denote the composite visual salience score of the cancellation element—computed as the product of its bounding box area, contrast ratio, and font-weight multiplier normalized to$[0,1]$. The feature triggers if the cancellation affordance is rendered at a conspicuity level systematically inferior to the confirmation or renewal prompt$N_{\mathrm{confirm}}$, weighted by a tolerance ratio$\delta_{\mathrm{salience}}$:
FORMULA: \frac{S(N_{\mathrm{cancel}})}{S(N_{\mathrm{confirm}})} < \delta_{\mathrm{salience}}

### 3. Semantic Proximity of Reversal
To identify whether this temporal delay is actively coupled with an entrapment mechanism, we establish$K_{\mathrm{revert}}$as a set of keywords indicating the cancellation of the deletion process (e.g., {“log in to cancel”, “reactivate”, “undo”}). By analyzing the sequence of words$W(n_{\mathrm{confirm}})$within the confirmation node, the algorithm calculates the textual distance$d$between the temporal delay entity$e$and a reversal keyword$k$. The feature triggers if this distance falls below a minimum semantic threshold$\tau_{\mathrm{words}}$, strongly indicating that the waiting period and the reversal trap are syntactically and logically bound as a single condition:
FORMULA: \min_{k \in K_{\mathrm{revert}}, e \in E_{\mathrm{time}}} d(k, e) < \tau_{\mathrm{words}}

## Privacy Maze  [obstruction]
### 1. Asymmetrical Path Depth
To model the structural friction of the consent architecture, we represent the interface as a directed graph$G = (V, E)$, where$V$encapsulates the interface states and$E$signifies user interaction events, such as clicks. Starting from$v_{\mathrm{start}}$, the initial state of the privacy prompt upon page load, we identify two critical terminal states:$v_{\mathrm{accept\_all}}$and$v_{\mathrm{reject\_all}}$, representing maximum and minimum data consent, respectively. By calculating$d(v_i, v_j)$as the minimum number of edges required to traverse from state$v_i$to state$v_j$, the feature triggers if the navigational effort required to reject tracking strictly exceeds the effort required to accept it. This mathematical disparity, or a rejection path exceeding a heuristic depth threshold$\tau_{\mathrm{depth}}$, proves the presence of deliberate structural friction:
FORMULA: d(v_{\mathrm{start}}, v_{\mathrm{reject\_all}}) > d(v_{\mathrm{start}}, v_{\mathrm{accept\_all}}) \quad \lor \quad d(v_{\mathrm{start}}, v_{\mathrm{reject\_all}}) > \tau_{\mathrm{depth}}

### 2. Visual Prominence Disparity
Beyond structural depth, the interface often weaponizes visual hierarchy to suppress user agency. We isolate$B_{\mathrm{accept}}$as the primary node for maximum consent and$B_{\mathrm{manage}}$as the node required to initiate the opt-out flow. Applying a visual prominence function$P(x)$calculated via the vision-language model's visual perception—which derives a composite score based on bounding box area, computed CSS contrast ratio, and z-index—we evaluate the visual weight of these opposing choices. The feature triggers if the system identifies a severe mathematical disparity in the visual prominence between the two vectors, effectively rendering the privacy-preserving route invisible against the baseline UI design constraint$\delta_{\mathrm{contrast}}$:
FORMULA: \frac{P(B_{\mathrm{accept}})}{P(B_{\mathrm{manage}})} > \delta_{\mathrm{contrast}}

### 3. Semantic Obfuscation of Privacy-Related Terminology
To establish a semantic baseline for Privacy Maze, the algorithm measures the FKGL readability and lexical complexity of text nodes within privacy-settings pages. The feature triggers if privacy-critical text—cookie descriptions, data-sharing explanations, consent requests—registers an FKGL score above 14 or a lexical density (ratio of unique terms to total words) exceeding$\tau_{\mathrm{obfuscation}}$, indicating that the interface deploys unnecessarily complex vocabulary to discourage informed consent:
FORMULA: \mathrm{FKGL}(T_{\mathrm{privacy}}) > 14 \quad \lor \quad \frac{|\mathrm{Unique}(T_{\mathrm{privacy}})|}{|T_{\mathrm{privacy}}|} > \tau_{\mathrm{obfuscation}}

## Labyrinthine Navigation  [obstruction]
### 1. Excessive Navigational Depth
To evaluate the structural burden of the interface, we model the application's architecture as a directed graph$G = (V, E)$. We define$v_{\mathrm{home}}$as the primary authenticated dashboard or landing page, and$v_{\mathrm{target}}$as the specific node representing the critical user action. Utilizing a standard distance function$d(v_i, v_j)$to calculate the shortest path length (minimum number of clicks) between two nodes, the feature triggers if the absolute depth required to reach the target node strictly exceeds a predefined maximum heuristic threshold$\tau_{\mathrm{depth}}$(e.g., 4 or 5 levels deep). This metric mathematically proves the interface is intentionally burying the exit path:
FORMULA: d(v_{\mathrm{home}}, v_{\mathrm{target}}) > \tau_{\mathrm{depth}}

### 2. Visual Nesting Depth of Navigation Elements
To establish a visual baseline for Labyrinthine Navigation, the algorithm computes the rendered indentation depth$D_{\mathrm{render}}(N)$of each navigational menu node, measured as the cumulative CSS padding-left or margin-left in viewport-relative units. The feature triggers if the maximum nesting depth of any privacy- or account-relevant menu item exceeds a cognitive-overload threshold$\tau_{\mathrm{nesting}}$, indicating that the user must traverse an unreasonable visual hierarchy to locate essential features:
FORMULA: \max_{n \in N_{\mathrm{nav}}} D_{\mathrm{render}}(n) > \tau_{\mathrm{nesting}}

### 3. Semantic Obfuscation
When humans navigate a graph, they rely on the semantic relevance of local links to estimate their proximity to a global target, a process governed by information scent. To measure the deliberate destruction of this scent, we define$P = (e_1, e_2, \dots, e_k)$as the sequence of interaction edges required to reach$v_{\mathrm{target}}$. We extract the NLP-derived text label$L(e_i)$for each edge (e.g., “Account Settings” or “More Options”) and establish$\mathrm{Topic}(v_{\mathrm{target}})$as the core semantic vector of the final destination. By computing the cosine similarity$\mathrm{Sim}(x, y)$between these vectors, the feature triggers if intermediate navigational labels deliberately lack semantic correlation with the target action. This forces the user to guess the correct pathway, formalized by the similarity score dropping below a required threshold$\tau_{\mathrm{semantic}}$:
FORMULA: \exists e_i \in P : \mathrm{Sim}(L(e_i), \mathrm{Topic}(v_{\mathrm{target}})) < \tau_{\mathrm{semantic}}

## Customisation (Interface Nesting)  [obstruction]
### 1. Path Depth Asymmetry
To quantify the structural hurdle of reaching a user-favorable state, we model the interface as a state transition graph$G = (V, E)$. Let$S_0$be the initial, primary layer rendered to the user, and$d(S_0, S_{\mathrm{target}})$be the minimum topological depth (number of required interactions) to reach a terminal state. The feature triggers if the depth to achieve the provider-favorable state ($S_{\mathrm{accept\_all}}$) is minimal, while the user-favorable state ($S_{\mathrm{reject\_all}}$) requires traversing into a nested customization layer$S_{\mathrm{custom}}$. This ensures the path of least resistance is mathematically biased toward the provider:
FORMULA: d(S_0, S_{\mathrm{accept\_all}}) = 1 \quad \land \quad d(S_0, S_{\mathrm{reject\_all}}) \ge 2

### 2. Visual Indentation Depth of Privacy Controls
To establish a visual baseline for Customisation Interface Nesting, the algorithm traverses the rendered privacy-settings subtree and measures the cumulative horizontal offset of each toggle from the root settings container. The feature triggers if the mean indentation depth—computed from CSS box-model offsets—exceeds a threshold$\tau_{\mathrm{indent}}$, indicating that privacy-preserving options have been visually obfuscated beneath layers of hierarchical nesting:
FORMULA: \frac{1}{|N_{\mathrm{privacy}}|} \sum_{n \in N_{\mathrm{privacy}}} \mathrm{offsetX}(n) > \tau_{\mathrm{indent}}

### 3. Semantic Obfuscation of Privacy Toggle Labels
To establish a semantic baseline for Customisation Interface Nesting, the algorithm evaluates the FKGL readability and technical-jargon density of labels describing privacy-relevant toggles. The feature triggers if privacy-toggle labels contain domain-specific technical terminology (“interest-based advertising,” “cross-device graph linkage”) without accompanying plain-language explanations, quantified as a jargon ratio exceeding$\tau_{\mathrm{jargon}}$:
FORMULA: \frac{|\{w \in L(N_{\mathrm{privacy}}) : w \in D_{\mathrm{jargon}}\}|}{|L(N_{\mathrm{privacy}})|} > \tau_{\mathrm{jargon}}

## Intermediate Currency  [sneaking]
### 1. Interception of the Fiat Checkout Flow
To model this coercive redirection, we define$V_{\mathrm{product}}$as the current interface state displaying a purchasable digital item, and$E_{\mathrm{purchase}}$as its primary transaction trigger (e.g., a “Buy” button). We contrast$V_{\mathrm{checkout}}$, representing a standard fiat payment gateway, with$V_{\mathrm{exchange}}$, representing an internal storefront built strictly for purchasing virtual currency. The feature triggers if the targeted transition edge systematically bypasses direct fiat payment, forcibly routing the user away from the checkout and into the virtual exchange:
FORMULA: \mathrm{target}(E_{\mathrm{purchase}}) = V_{\mathrm{exchange}} \quad \land \quad \mathrm{target}(E_{\mathrm{purchase}}) \neq V_{\mathrm{checkout}}

### 2. Visual Obscuration of Real-Currency Equivalence
To establish a visual baseline for Intermediate Currency, the algorithm identifies virtual-currency price labels$N_{\mathrm{virtual}}$(e.g., “500 Gems”) and searches for their real-currency conversion equivalents$N_{\mathrm{real}}$within the same viewport. The feature triggers if the real-cost disclosure is either entirely absent from the rendered output or, if present, rendered at a font size below 50% of the base body text, mathematically establishing deliberate visual obscuration of the actual monetary cost:
FORMULA: N_{\mathrm{real}} = \emptyset \quad \lor \quad \frac{\mathrm{fontSize}(N_{\mathrm{real}})}{S_{\mathrm{base}}} < 0.5

### 3. Lexical Tokenization mapped to Forced Exchange
To verify that the abstraction is structurally enforced rather than merely cosmetic, we establish$C_{\mathrm{virtual}}$as a localized, non-standard token system and$T_{\mathrm{price}}(n)$as the extracted price text of the item located on state$V_{\mathrm{product}}$. By tracking$E_{\mathrm{exchange}}$as the mandatory interaction vector required to acquire$C_{\mathrm{virtual}}$with fiat money, the feature triggers if the token classifier determines the price is strictly expressed in a virtual lexicon AND the system actively gates the final transaction behind the prior execution of the exchange vector:
FORMULA: T_{\mathrm{price}}(n) \in C_{\mathrm{virtual}} \quad \land \quad \text{TransactionStatus}(n) \implies \text{Executed}(E_{\mathrm{exchange}})

## Disguised Ad  [sneaking]
### 1. Cross-Origin Action Masking
The most adversarial variant of this pattern occurs when an ad intercepts a user's functional intent. We define$B_{\mathrm{action}}$as a node styled as a primary action button, bearing an NLP-extracted text label that matches high-intent native tasks (e.g., {“Download”, “Start”, “Play”, “Next”}). We compare the primary domain of the web application,$D_{\mathrm{host}}$, against the destination domain$D_{\mathrm{target}}(B_{\mathrm{action}})$resolved by inspecting the href attribute or intercepting the click event. The feature triggers if a visually prominent action button falsely masquerades as a native function but structurally routes the user to an external advertising domain:
FORMULA: B_{\mathrm{action}} \neq \emptyset \quad \land \quad D_{\mathrm{target}}(B_{\mathrm{action}}) \neq D_{\mathrm{host}}

### 2. Morphological Similarity
To quantify visual mimicry, we define$V_{\mathrm{native}}$as the set of visual feature vectors (encompassing computed background color, typography, border radius, and aspect ratio) extracted from legitimate, primary action nodes on the page via image analysis. We contrast this with$v_{\mathrm{ad}}$, representing the feature vector of a structurally distinct third-party node, such as an <iframe> or a container injected by an external ad network. By calculating the cosine similarity$\mathrm{sim}(v_1, v_2)$between these vectors, the algorithm triggers if the ad element is styled to structurally and visually mimic native elements beyond a predefined similarity threshold$\tau_{\mathrm{blend}}$:
FORMULA: \max_{v_i \in V_{\mathrm{native}}} \mathrm{sim}(v_{\mathrm{ad}}, v_i) > \tau_{\mathrm{blend}}

### 3. Semantic Mimicry of Native Action Labels
To establish a semantic baseline for Disguised Ad, the algorithm compares the text label of third-party advertising nodes$N_{\mathrm{ad}}$against a corpus of native functional labels$L_{\mathrm{native}}$(e.g., “Download,” “Next,” “Play”). Using cosine similarity over LLM-generated semantic embeddings, the feature triggers if an ad's button label achieves a semantic similarity score exceeding$\tau_{\mathrm{masquerade}}$with any native function label, indicating deliberate linguistic impersonation:
FORMULA: \max_{\ell \in L_{\mathrm{native}}} \mathrm{sim}(L(N_{\mathrm{ad}}), \ell) > \tau_{\mathrm{masquerade}}

## Sneak Into Basket  [sneaking]
### 1. Unprompted State Mutation
To formalize this unauthorized injection, we define$I_{\mathrm{explicit}}$as the set of product items the user has actively selected via direct DOM interaction events$E_{\mathrm{user}}$(e.g., explicit clicks on “Add to Cart” buttons). We then compare this to$I_{\mathrm{cart}}$, representing the actual set of items present in the final checkout session data structure or rendered cart node. The feature triggers if the set difference between the actual cart items and explicitly requested items is not empty. This mathematically proves an unrequested item$y$was injected by the system without a corresponding user event$e$:
FORMULA: (I_{\mathrm{cart}} \setminus I_{\mathrm{explicit}} \neq \emptyset) \quad \land \quad \nexists e \in E_{\mathrm{user}} \implies \mathrm{Add}(y)

### 2. Visual Indistinguishability of Surcharged Items
To establish a visual baseline for Sneak Into Basket, the algorithm compares the visual feature vectors of cart line items explicitly selected by the user ($V_{\mathrm{user}}$) against those surreptitiously injected by the system ($V_{\mathrm{injected}}$). Let$\Delta_{\mathrm{color}}(i,j)$denote the Euclidean distance in CIELAB color space between items$i$and$j$. The feature triggers if the injected item is rendered with chromatic and typographic properties falling within a similarity radius$\tau_{\mathrm{camouflage}}$of legitimate items, causing the user to overlook its presence:
FORMULA: \min_{v_u \in V_{\mathrm{user}}} \|v_{\mathrm{injected}} - v_u\|_2 < \tau_{\mathrm{camouflage}}

### 3. Semantic Obscuration of Injected Line Items
To establish a semantic baseline for Sneak Into Basket, the algorithm inspects the text content of cart line items for disclosure language indicating optional add-ons—“donation,” “optional,” “you may also like.” The feature triggers if a surreptitiously added item$N_{\mathrm{injected}}$carries a text description whose semantic content reveals its add-on nature (classified via NLP entailment) but the item was not preceded by an explicit user opt-in action in the interaction log:
FORMULA: \mathrm{Entailment}(T(N_{\mathrm{injected}}), \text{``optional add-on''}) = \mathrm{True} \quad \land \quad \mathrm{UserConsented}(N_{\mathrm{injected}}) = \mathrm{False}

## Drip Pricing, Hidden Costs, or Partitioned Pricing  [sneaking]
### 1. Sequential Price Inflation
To track the inflation of cost across a transaction, we model the checkout flow as a sequence of user states$S = (s_0, s_1, \dots, s_n)$, where$s_0$represents the initial product page and$s_n$denotes the final payment confirmation page. We track$P(s_i)$as the NLP-extracted primary total price displayed to the user at any given state$s_i$, while$I_{\mathrm{added}}$accounts for the value of any optional items or upgrades explicitly selected by the user during the flow. The feature triggers if the final price at$s_n$strictly exceeds the initially advertised price at$s_0$by an amount greater than the explicitly added items. This mathematically proves that hidden fees were incrementally dripped into the transaction:
FORMULA: P(s_n) > P(s_0) + I_{\mathrm{added}} \quad \implies \quad P_{\mathrm{dripped}} > 0

### 2. Visual Disparity of Cost Partitioning
Even when partitioned fees are technically disclosed on the same page, their impact is frequently minimized through visual suppression. We identify$N_{\mathrm{base}}$as the DOM node displaying the advertised base price, and$N_{\mathrm{fee}}$as the node disclosing the partitioned fees. By calculating$V(x)$, the computed visual prominence of node$x$derived from vision-language model bounding box area, CSS font-size, font-weight, and contrast ratio, we can compare their relative weights. The feature triggers if the interface deliberately obscures the partitioned fees by rendering them with a severe visual deficiency compared to the base price, pushing the prominence ratio beyond a deceptive heuristic threshold$\tau_{\mathrm{prominence}}$:
FORMULA: \frac{V(N_{\mathrm{base}})}{V(N_{\mathrm{fee}})} > \tau_{\mathrm{prominence}}

### 3. Semantic Concealment of Mandatory Fee Disclosure
To establish a semantic baseline for Drip Pricing, the algorithm scans the checkout flow for mandatory-fee descriptors (“service fee,” “booking fee,” “convenience charge”) and evaluates whether these terms appear in the initial price presentation or only at the final confirmation step. The feature triggers if mandatory-fee terminology is semantically absent from all text nodes above the fold on the initial pricing page but present on the final checkout page:
FORMULA: T_{\mathrm{initial}} \cap K_{\mathrm{fees}} = \emptyset \quad \land \quad T_{\mathrm{final}} \cap K_{\mathrm{fees}} \neq \emptyset

## Bundling  [sneaking]
### 1. Inseparable Transactional Nodes
To detect this artificial fusion, we define$I_{\mathrm{primary}}$as the digital good or service the user explicitly intends to purchase, and$I_{\mathrm{supp}}$as a supplementary item (such as an extended warranty, a mandatory accessory, or a secondary subscription). By tracking$E_{\mathrm{purchase}}$as the primary transactional event (e.g., “Add to Cart” or “Buy Now”), and$C_{\mathrm{state}}$as the set of items actively staged for checkout, the feature triggers if the targeted transition edge algorithmically forces the inclusion of both items. This is verified if the execution of the primary purchase event inevitably results in both items entering the cart, without offering any discrete event$e$to add the primary item alone:
FORMULA: E_{\mathrm{purchase}}(I_{\mathrm{primary}}) \implies \{I_{\mathrm{primary}}, I_{\mathrm{supp}}\} \subseteq C_{\mathrm{state}} \quad \land \quad \nexists e : e(I_{\mathrm{primary}}) \implies C_{\mathrm{state}} = \{I_{\mathrm{primary}}\}

### 2. Visual Obscuration of Individual Component Pricing
To establish a visual baseline for Bundling, the algorithm inspects the rendered pricing breakdown within a bundle offer container$C_{\mathrm{bundle}}$. Let$N_{\mathrm{components}}$be the set of individually priced sub-items. The feature triggers if the aggregate visual area devoted to individual-component prices is less than a fraction$\tau_{\mathrm{breakdown}}$of the total bundle card area, indicating that the interface visually suppresses the decomposition that would enable rational comparison:
FORMULA: \frac{\sum_{n \in N_{\mathrm{components}}} A(n)}{A(C_{\mathrm{bundle}})} < \tau_{\mathrm{breakdown}}

### 3. Semantic Suppression of Individual Item Descriptions
To establish a semantic baseline for Bundling, the algorithm compares the average text length and descriptive granularity of individual item descriptions within a bundle against equivalent standalone product descriptions on the same site. The feature triggers if bundled items receive semantically impoverished descriptions—shorter text, fewer feature mentions, missing specification rows—relative to their standalone counterparts, quantified as a description-entropy ratio below$\tau_{\mathrm{description}}$:
FORMULA: \frac{H(T_{\mathrm{bundled}})}{H(T_{\mathrm{standalone}})} < \tau_{\mathrm{description}}

## Hidden Information  [sneaking]
### 1. Structural Burial in High-Density Text
Information is frequently hidden by drowning it in a high-density textual monolith designed to induce cognitive exhaustion. We define$N_{\mathrm{document}}$as a parent node representing a dense text block (e.g., Terms and Conditions), and$|W(N_{\mathrm{document}})|$as its total word count. Within this document,$t_{\mathrm{clause}}$represents the specific sentence containing critical financial or privacy information. Applying a boolean function$P(x)$to evaluate the presence of visual emphasis tags (such as <strong> or <em>), the feature triggers if the critical clause is buried in an excessively long document without any semantic or visual highlighting to distinguish it from surrounding boilerplate text:
FORMULA: |W(N_{\mathrm{document}})| > \tau_{\mathrm{fatigue}} \quad \land \quad P(t_{\mathrm{clause}}) = \mathrm{False}

### 2. Typographical and Chromatic Camouflage
To quantify the visual suppression of essential terms, we identify$N_{\mathrm{critical}}$as a DOM node containing NLP-identified critical phrases (e.g., {“auto-renew”, “subscription”, “cancel at any time”}). We define$S_{\mathrm{font}}(x)$as the computed CSS font size of node$x$in pixels, and$\mathrm{CR}(x, L_{\mathrm{bg}})$as its WCAG contrast ratio against the background. The feature triggers if the critical node is deliberately rendered at the extreme margins of legibility, falling below baseline accessibility thresholds while the primary interface elements remain highly visible. This is formalized when the font size or contrast drops below the limits of standard human perception$\tau_{\mathrm{min\_readable}}$or$\tau_{\mathrm{wcag\_min}}$:
FORMULA: S_{\mathrm{font}}(N_{\mathrm{critical}}) < \tau_{\mathrm{min\_readable}} \quad \lor \quad \mathrm{CR}(N_{\mathrm{critical}}, L_{\mathrm{bg}}) < \tau_{\mathrm{wcag\_min}}

### 3. Semantic Concealment of Adverse Terms
To establish a semantic baseline for Hidden Information, the algorithm searches for adverse disclosure terms—“fee,” “cancellation,” “auto-renew,” “liability”—and evaluates their visibility status. A term is semantically hidden if it appears only within collapsed <details> elements, hover-triggered tooltips, or text styled with display:none or visibility:hidden properties. The feature triggers if any adverse-term keyword set$K_{\mathrm{adverse}}$has non-empty intersection with the visible DOM but its rendering properties place it in a concealed state:
FORMULA: K_{\mathrm{adverse}} \cap T_{\mathrm{DOM}} \neq \emptyset \quad \land \quad \mathrm{IsConcealed}(N_{\mathrm{adverse}}) = \mathrm{True}

## Reduced Friction  [sneaking]
### 1. Absence of Confirmation Interstitial
To identify the removal of critical decision boundaries, we define$S_{\mathrm{intent}}$as the state where the user views an offer and$S_{\mathrm{commit}}$as the final, irreversible transactional state (e.g., payment processed). We contrast this with$S_{\mathrm{confirm}}$, a standard intermediary state requiring explicit user review and secondary validation. The feature triggers if the targeted transition edge for a high-stakes domain ($D_{\mathrm{financial}}$or$D_{\mathrm{privacy}}$) bypasses the confirmation node entirely. This is mathematically verified when a single interaction vector$E_{\mathrm{click}}$executes the commitment without a path through the confirmation node:
FORMULA: E_{\mathrm{click}}(S_{\mathrm{intent}}) \implies S_{\mathrm{commit}} \quad \land \quad S_{\mathrm{confirm}} \notin \mathrm{Path}(S_{\mathrm{intent}} \to S_{\mathrm{commit}})

### 2. Visual Proximity of Destructive Actions to Neutral UI
To establish a visual baseline for Reduced Friction, the algorithm measures the spatial separation$d_{\mathrm{spatial}}(N_{\mathrm{destructive}}, N_{\mathrm{neutral}})$between a business-favorable destructive action (e.g., one-click purchase, irreversible delete) and adjacent neutral UI elements. The feature triggers if the destructive action is placed within a safety-margin radius$\tau_{\mathrm{safety}}$of routine interface controls, exploiting muscle memory to induce accidental commitment:
FORMULA: \min_{n \in N_{\mathrm{neutral}}} d_{\mathrm{spatial}}(N_{\mathrm{destructive}}, n) < \tau_{\mathrm{safety}}

### 3. Semantic Absence of Confirmation Language
To establish a semantic baseline for Reduced Friction, the algorithm searches for confirmation-seeking or reversibility-assuring language preceding a high-commitment action—“Are you sure?,” “This cannot be undone,” “Confirm purchase.” The feature triggers if a one-click purchase, irreversible deletion, or subscription commitment is executed without any semantically equivalent confirmation text node appearing in the interaction path preceding the action:
FORMULA: \neg\exists n \in \mathrm{Path}(v_{\mathrm{pre}}, v_{\mathrm{commit}}) : \mathrm{Match}(T(n), \mathrm{Pattern}_{\mathrm{confirm}}) = \mathrm{True}

## Forced Continuity  [sneaking]
### 1. Time-Triggered Silent State Mutation
To identify the automated nature of this financial trap, we define$t_{\mathrm{expiry}}$as the exact timestamp when the promotional period concludes. We monitor$S_{\mathrm{account}}(t)$, the user's subscription state, as it transitions from$S_{\mathrm{trial}}$to$S_{\mathrm{premium}}$, and$E_{\mathrm{charge}}$, the backend event executing a transaction against a cached payment token$T_{\mathrm{payment}}$. The feature triggers if the system algorithmically executes the state transition and the financial charge strictly based on the temporal threshold, without demanding explicit, contemporary user confirmation ($\mathrm{Consent}_{\mathrm{explicit}}$) at the point of conversion:
FORMULA: t \geq t_{\mathrm{expiry}} \quad \implies \quad S_{\mathrm{account}}(t) \to S_{\mathrm{premium}} \quad \land \quad E_{\mathrm{charge}}(T_{\mathrm{payment}}) = \mathrm{True}
GIVEN: \mathrm{Consent}_{\mathrm{explicit}}(t) = \mathrm{False}

### 2. Absence of Temporal Feedforward
The efficacy of forced continuity depends on suppressing the user's visual awareness of impending charges. We define$W_{\mathrm{renewal}}$as the set of visual warning elements that should appear within the interface prior to a subscription renewal—such as banner notifications, modal countdowns, or prominently styled expiration alerts. For each warning element$w \in W_{\mathrm{renewal}}$, the algorithm evaluates its bounding box visibility within the viewport and its contrast ratio against the surrounding background. The feature triggers if the interface renders no visible renewal warning within a fair-notice window$\tau_{\mathrm{fair\_notice}}$(e.g., 3 to 7 days prior to expiry), or renders the warning at a scale or contrast below accessibility thresholds:
FORMULA: \forall w \in W_{\mathrm{renewal}} : \mathrm{Visible}(w, t) = \mathrm{False} \quad \forall t \in [t_{\mathrm{expiry}} - \tau_{\mathrm{fair\_notice}}, t_{\mathrm{expiry}}]
GIVEN: \lor \quad \frac{A(w)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \quad \lor \quad \mathrm{CR}(w, L_{\mathrm{bg}}) < 3.0

### 3. Semantic Asymmetry Between Subscription and Cancellation Language
To establish a semantic baseline for Forced Continuity, the algorithm compares the Flesch-Kincaid readability and emotional valence of text on the subscription-initiation page against the cancellation page. The feature triggers if the cancellation flow employs text at a significantly higher FKGL ($>2$grade levels above the signup page) or embeds guilt-inducing lexemes (“lose your benefits,” “abandon your progress”) absent from the signup flow, weaponizing linguistic complexity as a retention barrier:
FORMULA: \mathrm{FKGL}(T_{\mathrm{cancel}}) - \mathrm{FKGL}(T_{\mathrm{signup}}) > 2 \quad \lor \quad \mathrm{Guilt}(T_{\mathrm{cancel}}) - \mathrm{Guilt}(T_{\mathrm{signup}}) > \tau_{\mathrm{guilt\_gap}}

## Privacy Zuckering  [sneaking]
### 1. Bundled Consent and Granularity Violation
To identify the forced fusion of data categories, we define$D_{\mathrm{essential}}$as the subset of user data required to operate the core service and$D_{\mathrm{monetization}}$as data used strictly for profiling or third-party brokerage. We monitor$T_{\mathrm{accept}}$, the primary boolean interaction node for granting consent. The feature triggers if the interface structurally fuses these distinct categories into an indivisible toggle, forcing the user to accept monetization tracking as a mandatory condition for basic utility access. This is mathematically confirmed when no alternative interaction$t_{\mathrm{alt}}$exists to grant essential access while denying monetization:
FORMULA: T_{\mathrm{accept}} = \mathrm{True} \quad \implies \quad (\mathrm{Access}(D_{\mathrm{essential}}) = \mathrm{True} \quad \land \quad \mathrm{Access}(D_{\mathrm{monetization}}) = \mathrm{True})
GIVEN: \nexists t_{\mathrm{alt}} : (t_{\mathrm{alt}} \implies \mathrm{Access}(D_{\mathrm{essential}}) \land \neg \mathrm{Access}(D_{\mathrm{monetization}}))

### 2. Visual Asymmetry Between Privacy-Invasive and Privacy-Preserving Options
To establish a visual baseline for Privacy Zuckering, the algorithm compares the visual weight of user-facing privacy choices. Let$N_{\mathrm{invasive}}$be the set of toggle switches, radio buttons, or checkboxes pre-set to data-sharing “on” and$N_{\mathrm{preserving}}$those defaulting to “off.” The feature triggers if the invasive options are rendered with larger hitboxes, higher contrast, and more saturated accent colors—quantified as a visual-weight asymmetry exceeding$\tau_{\mathrm{privacy\_skew}}$:
FORMULA: \frac{W(N_{\mathrm{invasive}})}{W(N_{\mathrm{preserving}})} > \tau_{\mathrm{privacy\_skew}}

### 3. Semantic Ambiguity of Third-Party Entities
Deceptive interfaces often mask the scale of data distribution using linguistic \"umbrellas\". We define$N_{\mathrm{disclosure}}$as the text node explaining data usage and$E_{\mathrm{actual}}$as the true set of third-party entities receiving the payload. Using an NLP function$\mathrm{Specificity}(x)$to measure the exactness of named entity recognition (where corporate names score near 1 and euphemisms near 0), the feature triggers if the true cardinality of receiving entities is high, but the text relies on low-specificity terms like “partners” or “affiliates” to mask the distribution reality:
FORMULA: |E_{\mathrm{actual}}| \gg 1 \quad \land \quad \mathrm{Specificity}(N_{\mathrm{disclosure}}) < \tau_{\mathrm{vague}}

## Friend Spam  [sneaking]
### 1. Feedforward Intent vs. Payload Execution
To identify this deceptive shift in intent, we define$N_{\mathrm{prompt}}$as the text node requesting OAuth access or native contact permissions. We map the NLP-derived intent,$\mathrm{Intent}_{\mathrm{NLP}}(N_{\mathrm{prompt}})$, to an expected action domain. The feature triggers if the textual promise implies a localized, read-only matching operation (e.g., {“find”, “search”}), but the backend script immediately executes a write-oriented mass broadcast protocol ($E_{\mathrm{backend\_action}}$) upon receiving the access token$T_{\mathrm{access}}$:
FORMULA: \mathrm{Intent}_{\mathrm{NLP}}(N_{\mathrm{prompt}}) \in D_{\mathrm{read\_only}} \quad \land \quad E_{\mathrm{backend\_action}}(T_{\mathrm{access}}) \implies \mathrm{SendMessages()}

### 2. Absence of Granular Selection
The most common implementation of Friend Spam involves bypassing the curation process to maximize message reach. We define$C_{\mathrm{network}}$as the full set of contacts extracted and$S_{\mathrm{selected}}$as the subset explicitly chosen by the user via DOM checkboxes. Let$M_{\mathrm{dispatched}}$be the set of promotional messages generated. The feature triggers if the interface skips the curation state entirely, automatically setting the dispatch target to the maximum theoretical limit of the extracted contact array without affirmative, granular user selection:
FORMULA: |S_{\mathrm{selected}}| = 0 \quad \land \quad |M_{\mathrm{dispatched}}| \approx |C_{\mathrm{network}}| \quad \implies \quad \mathrm{Unauthorized \: Broadcast}

### 3. Sender Identity Spoofing
To quantify the deceptive appropriation of identity, we isolate$I_{\mathrm{user}}$as the user's personal identity vectors (e.g., name or profile picture) and$I_{\mathrm{corp}}$as the actual corporate entity. We analyze$m_{\mathrm{outbound}}$as a single message dispatched to a contact. The feature triggers if the system deliberately injects the user's identity vectors into the sender alias of a corporate marketing message. This non-consensual usage transforms the user into a trusted \"trojan horse\" to increase the conversion rate of the marketing payload:
FORMULA: \mathrm{SenderAlias}(m_{\mathrm{outbound}}) = I_{\mathrm{user}} \quad \land \quad \mathrm{Author}(m_{\mathrm{outbound}}) = I_{\mathrm{corp}}

## Address Book Leeching  [sneaking]
### 1. Utility-Permission Decoupling
To identify the coercive nature of the data request, we define$U_{\mathrm{core}}$as the primary, advertised utility of the application (e.g., a local music player or utility tool) and$P_{\mathrm{contacts}}$as the operating system-level permission to read the address book. We apply a function$\mathrm{Dep}(U, P)$to evaluate the technical dependency of the utility on the requested permission. The feature triggers if the application algorithmically blocks initialization or core functionality until the permission is granted, despite the mathematical absence of any functional requirement for contact data:
FORMULA: \mathrm{State}(U_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad P_{\mathrm{contacts}} = \mathrm{False} \quad \land \quad \mathrm{Dep}(U_{\mathrm{core}}, P_{\mathrm{contacts}}) = \emptyset

### 2. Visual Prominence of the Invite-All Affordance
To establish a visual baseline for Address Book Leeching, the algorithm identifies a mass-invitation button$N_{\mathrm{invite\_all}}$(e.g., “Invite All Contacts”) and a skip or deselect affordance$N_{\mathrm{skip}}$. The feature triggers if the collective-invite button dominates the viewport with a bounding-box area exceeding the skip element by a dominance ratio$\tau_{\mathrm{invite\_dominance}}$, pressuring the user toward indiscriminate contact sharing:
FORMULA: \frac{A(N_{\mathrm{invite\_all}})}{A(N_{\mathrm{skip}})} > \tau_{\mathrm{invite\_dominance}}

### 3. Semantic Framing of Contact-Sharing Consent
To establish a semantic baseline for Address Book Leeching, the algorithm inspects the text accompanying the contact-import permission prompt. The feature triggers if the prompt frames contact access as a social benefit to the user's friends (“Find your friends,” “Let your contacts know you're here”) rather than as a data-access permission, semantically reframing a privacy-invasive action as a social courtesy:
FORMULA: \mathrm{Frame}(T_{\mathrm{prompt}}) = \mathrm{Benefactive} \quad \land \quad \mathrm{Subject}(T_{\mathrm{prompt}}) = \mathrm{ThirdParty}

## Automatic Accept Third Party Term  [sneaking]
### 1. Bundled Transitive Consent
To identify the forced fusion of distinct legal entities, we define$T_{\mathrm{primary}}$as the core terms of the main application and$T_{\mathrm{third\_party}} = \{t_1, t_2, \dots, t_n\}$as the set of agreements for external partner entities. We monitor$\mathrm{Accept}(x)$, the boolean backend state registering user consent. The feature triggers if the interface algorithmically fuses these contracts together, ensuring that affirmatively interacting with the primary consent node inherently forces the acceptance of the entire third-party array without providing individual decoupling toggles within the Document Object Model (DOM):
FORMULA: \mathrm{Accept}(T_{\mathrm{primary}}) \implies \forall t_i \in T_{\mathrm{third\_party}} : \mathrm{Accept}(t_i) = \mathrm{True}
GIVEN: \nexists \mathrm{Toggle}(t_i) \in \mathrm{DOM}

### 2. Opaque Entity Resolution
Deceptive interfaces often mask the scale of legal binding through linguistic \"umbrellas\". We define$N_{\mathrm{consent}}$as the immediate UI text node and$E_{\mathrm{declared}}$as the set of specific corporate entities explicitly named within that text. We contrast this with$E_{\mathrm{actual}}$, the true set of entities granted legal consent upon execution. The feature triggers if the interface relies on vague terms like “trusted partners” to mask a reality where the actual cardinality of the entities gaining consent vastly exceeds what is presented to the user's immediate cognitive layer:
FORMULA: E_{\mathrm{declared}} \subset E_{\mathrm{actual}} \quad \land \quad |E_{\mathrm{actual}}| \gg |E_{\mathrm{declared}}| \approx 0

### 3. Semantic Concealment of Third-Party Agreement Language
To establish a semantic baseline for Automatic Accept Third Party Term, the algorithm searches for legal-agreement language—“by continuing, you agree to,” “terms apply,” “third-party policies”—within pre-checked checkboxes or auto-accepted clauses. The feature triggers if third-party-agreement terminology is semantically present but structurally pre-consented, with no affirmative user interaction recorded in the event log:
FORMULA: T(N_{\mathrm{legal}}) \cap K_{\mathrm{agreement}} \neq \emptyset \quad \land \quad \mathrm{Checked}(N_{\mathrm{legal}}) = \mathrm{True} \quad \land \quad \mathrm{UserToggled}(N_{\mathrm{legal}}) = \mathrm{False}

## Pre-Delivered Content  [sneaking]
### 1. Unconsented Local Storage Consumption
To quantify the unauthorized appropriation of user hardware, we define$S_{\mathrm{local}}$as the user's physical storage environment and$C_{\mathrm{premium}}$as the set of high-capacity assets intended for future monetization. We contrast this with$E_{\mathrm{consent}}$, the explicit user request to install said content. The feature triggers if the system autonomously injects the payload into the storage architecture without authorization, permanently consuming capacity as a hidden cost of the baseline installation:
FORMULA: C_{\mathrm{premium}} \subseteq S_{\mathrm{local}} \quad \text{given} \quad E_{\mathrm{consent}} = \emptyset \quad \land \quad \mathrm{Size}(C_{\mathrm{premium}}) \gg 0

### 2. Visual Density of Locked-Content Badges
To establish a visual baseline for Pre-Delivered Content, the algorithm scans the rendered interface for locked-content indicators—padlock icons, “Purchase to Unlock” overlays, or greyed-out premium feature tiles. The feature triggers if the volumetric density of locked-versus-accessible content nodes exceeds a threshold$\tau_{\mathrm{locked\_ratio}}$, indicating that the interface is visually dominated by assets the user has already been forced to host locally but cannot access without payment:
FORMULA: \frac{|\{n \in N : \mathrm{IsLocked}(n)\}|}{|\{n \in N : \mathrm{IsAccessible}(n)\}|} > \tau_{\mathrm{locked\_ratio}}

### 3. Semantic Framing of Local Assets as Purchase Opportunities
To establish a semantic baseline for Pre-Delivered Content, the algorithm compares the semantic framing of content items already present on the user's storage device. The feature triggers if locally stored assets are semantically described as “unlockable,” “premium,” or “downloadable” when the download has already occurred and the data resides on the user's hardware, reframing an already-consumed storage cost as a purchase opportunity:
FORMULA: \mathrm{Frame}(T_{\mathrm{asset}}) = \mathrm{Purchaseable} \quad \land \quad \mathrm{IsLocal}(A_{\mathrm{asset}}) = \mathrm{True}

## Fear Of Missing Out (FOMO)  [urgency]
### 1. Artificial Temporal Scarcity
To algorithmically detect fabricated temporal scarcity, we monitor a dynamic DOM node$N_{\mathrm{timer}}$that actively decrements a time value. By capturing the parsed remaining time$T(s_i)$at a given session load state$s_i$, we compare it across two independent, sequential browsing sessions,$s_0$and$s_1$(e.g., achieved by clearing cookies or initializing an incognito window). The feature triggers if the countdown timer fails to maintain a global server-side state, deterministically resetting its duration$\Delta t$upon a new session initialization rather than reflecting a genuine, universal deadline:
FORMULA: T(s_0) \approx \Delta t \quad \land \quad T(s_1) \approx \Delta t \quad \implies \quad \mathrm{Fabricated \: Urgency}

### 2. Visual Pulsation Frequency of Urgency Indicators
To establish a visual baseline for Fear of Missing Out, the algorithm monitors the temporal update rate of urgency-signaling visual elements—including countdown timers, stock counters, and “selling fast” badges. Let$\Delta t_{\mathrm{refresh}}(N)$denote the interval between successive visual updates of node$N$. The feature triggers if any urgency indicator refreshes at a sub-second cadence ($\tau_{\mathrm{pulsation}} \approx 1000$ms), creating an artificial sense of temporal scarcity through rapid visual churn:
FORMULA: \min_{n \in N_{\mathrm{urgency}}} \Delta t_{\mathrm{refresh}}(n) < \tau_{\mathrm{pulsation}}

### 3. Semantic Density of Scarcity and Urgency Lexemes
To establish a semantic baseline for Fear of Missing Out, the algorithm computes the frequency of temporally urgent and scarcity-signaling lexemes—“limited,” “only X left,” “selling fast,” “ends soon”—within the visible text of a product or offer page. The feature triggers if the normalized occurrence rate of urgency lexemes per 100 words exceeds a psychological-manipulation threshold$\tau_{\mathrm{fomo}}$, indicating that the page weaponizes linguistic scarcity to override rational deliberation:
FORMULA: \frac{|\{w \in T : w \in L_{\mathrm{FOMO}}\}|}{|T|} \times 100 > \tau_{\mathrm{fomo}}

## High Demand  [urgency]
### 1. Metric Fabrication
To identify the decoupling of interface claims from reality, we define$U_{\mathrm{true}}(i, t)$as the actual count of unique users interacting with item$i$in the backend and$U_{\mathrm{displayed}}(i, t)$as the value rendered on the frontend. Utilizing a pseudo-random function$R(a, b)$, the feature triggers if the system generates a high-arousal number that bears no mathematical relation to factual data. This creates a false sense of social proof by ensuring the displayed count is significantly higher than the true count:
FORMULA: U_{\mathrm{displayed}}(i, t) = R(a, b) \quad \text{given} \quad U_{\mathrm{displayed}}(i, t) \gg U_{\mathrm{true}}(i, t)

### 2. Visual Dynamics of Social-Proof Badges
To establish a visual baseline for High Demand, the algorithm inspects demand-signaling badges (“X people are viewing this,” “Y purchased in the last hour”) for visual embellishment. The feature triggers if these indicators employ animation—pulsing, flashing, or rapid numeric incrementation—at a refresh rate$\Delta t_{\mathrm{update}}$below a perceptual-realism threshold$\tau_{\mathrm{animate}}$, indicating fabricated urgency through artificial visual dynamism:
FORMULA: \exists n \in N_{\mathrm{demand}} : \mathrm{IsAnimated}(n) = \mathrm{True} \quad \land \quad \Delta t_{\mathrm{update}}(n) < \tau_{\mathrm{animate}}

### 3. Semantic Verifiability of Social-Proof Quantifiers
To establish a semantic baseline for High Demand, the algorithm evaluates whether demand-asserting statements (“X people are viewing,” “Y bought this”) contain verifiable temporal or geographic qualifiers. The feature triggers if a social-proof claim employs a precise numeric quantifier but lacks any bounding qualifier (“in the last hour,” “from your city”), rendering the claim semantically unfalsifiable:
FORMULA: \exists q \in \mathbb{Z}^+ \subset T(N_{\mathrm{demand}}) \quad \land \quad \neg\exists \text{Qualifier}_{\mathrm{temporal/geographic}} \in T(N_{\mathrm{demand}})

## Low Stock  [urgency]
### 1. Inventory Fabrication
To identify the decoupling of interface claims from inventory reality, we define$I_{\mathrm{true}}(x)$as the actual quantity of item$x$in the backend database and$I_{\mathrm{displayed}}(x)$as the value rendered on the frontend. We establish$\tau_{\mathrm{scarcity}}$as the psychological threshold for panic (typically$I \le 5$). The feature triggers if the system algorithmically generates a low number strictly to manufacture urgency, regardless of the true stock depth:
FORMULA: I_{\mathrm{displayed}}(x) \le \tau_{\mathrm{scarcity}} \quad \text{given} \quad I_{\mathrm{displayed}}(x) \ll I_{\mathrm{true}}(x)

### 2. Visual Alarm Salience of Scarcity Indicators
To establish a visual baseline for Low Stock, the algorithm examines stock-level messages for chromatic urgency coding. Let$h$be the hue angle of the dominant color used in the scarcity badge$N_{\mathrm{stock}}$. The feature triggers if the badge employs colors in the red-orange alarm spectrum ($h \in [0^\circ, 30^\circ]$)—a visual convention associated with danger and immediate action—while the underlying stock level has not verifiably changed, indicating color-manipulated urgency:
FORMULA: \mathrm{Hue}(N_{\mathrm{stock}}) \in [0^\circ, 30^\circ] \quad \land \quad \Delta\mathrm{Stock}_{\mathrm{actual}} = 0

### 3. Semantic Verifiability of Stock-Level Quantifiers
To establish a semantic baseline for Low Stock, the algorithm inspects scarcity claims (“Only X left,” “X in stock”) for semantic consistency over time. The feature triggers if successive page loads within a short temporal window ($\Delta t < 60$s) yield semantically inconsistent stock-level quantifiers—e.g., “Only 3 left” followed by “Only 5 left” on reload—indicating that the scarcity claim is procedurally generated rather than reflecting actual inventory:
FORMULA: \exists t_1, t_2 : |t_2 - t_1| < 60\text{s} \quad \land \quad Q_{\mathrm{stock}}(t_1) \neq Q_{\mathrm{stock}}(t_2) \quad \land \quad \neg\mathrm{HasTransaction}(t_1, t_2)

## Activity Messages  [urgency]
### 1. Asynchronous Event Fabrication
To identify the manufacture of synthetic social proof, we define$E_{\mathrm{real}}(t)$as the set of genuine transactions in the database and$M_{\mathrm{displayed}}(t)$as the activity message rendered on the client interface. The feature triggers if the system algorithmically generates activity pop-ups that have no structural mapping to the backend event log. This indicates that the \"social activity\" presented to the user is a narrative fabrication intended to mimic high demand:
FORMULA: M_{\mathrm{displayed}}(t) \neq \emptyset \quad \land \quad M_{\mathrm{displayed}}(t) \notin E_{\mathrm{real}}(t)

### 2. Cognitive Interruption
The hostility of activity messages is often defined by their power to disrupt deliberative thinking. We define$S_{\mathrm{focus}}$as the user's cognitive state while evaluating product specifications and$N_{\mathrm{activity}}$as the dynamically injected notification node. By measuring the visual$\mathrm{Salience}(N)$and the injection frequency$\lambda_{\mathrm{interrupt}}$, the algorithm detects predatory interruption. The feature triggers if the system continuously injects high-salience elements at a rate that exceeds the user's cognitive load threshold$\tau_{\mathrm{cognitive\_load}}$, effectively disrupting rational processing to trigger impulsive, herd-following behavior:
FORMULA: \mathrm{Salience}(N_{\mathrm{activity}}) \to \mathrm{Max} \quad \land \quad \lambda_{\mathrm{interrupt}} > \tau_{\mathrm{cognitive\_load}} \implies S_{\mathrm{focus}} \to \mathrm{Disrupted}

### 3. Semantic Specificity of Activity-Notification Content
To establish a semantic baseline for Activity Messages, the algorithm evaluates the semantic specificity of social-activity notifications. The feature triggers if activity messages use vague, non-attributable language—“Someone liked your post,” “A user is viewing your profile”—that lacks verifiable identity references (name, handle, profile link), indicating fabricated or aggregated social signals presented as individualized interactions:
FORMULA: \mathrm{Specificity}(T_{\mathrm{activity}}) < \tau_{\mathrm{specificity}} \quad \land \quad \neg\exists \text{IdentityRef} \in T_{\mathrm{activity}}

## Countdown Timer  [urgency]
### 1. Stateless Expiration
To identify the manufacture of synthetic urgency, we define$t_{\mathrm{load}}$as the timestamp of the client session initialization and$\Delta t_{\mathrm{countdown}}$as a hardcoded frontend duration. The feature triggers if the expiration time$T_{\mathrm{expire}}$is functionally tethered to the individual's page load rather than a server-validated deadline. This ensures the urgency is simulated and infinitely repeatable upon a DOM refresh, proving the \"deadline\" is an interface illusion:
FORMULA: T_{\mathrm{expire}} = t_{\mathrm{load}} + \Delta t_{\mathrm{countdown}} \quad \implies \quad \text{Urgency is functionally synthetic}

### 2. Cognitive Compression
The efficacy of a countdown timer relies on narrowing the window for rational thought. We define$\Delta t_{\mathrm{timer}}$as the duration of the countdown and$\tau_{\mathrm{deliberation}}$as the baseline threshold required for a human to process terms and evaluate alternatives. The feature triggers if the system deliberately configures the window to be shorter than the deliberation requirement, algorithmically enforcing an impulsive, under-informed transaction by driving the probability of rational evaluation toward zero:
FORMULA: \Delta t_{\mathrm{timer}} < \tau_{\mathrm{deliberation}} \quad \implies \quad \mathrm{Probability}(\mathrm{Rational\_Evaluation}) \to 0

### 3. Semantic Urgency Inflation via Temporal Lexemes
To establish a semantic baseline for Countdown Timer, the algorithm analyzes the text accompanying a visible countdown element for urgency-amplifying language. The feature triggers if the countdown is paired with semantically compounding urgency lexemes—“hurry,” “now or never,” “don't wait”—that amplify the psychological pressure beyond what the numerical countdown alone conveys:
FORMULA: \mathrm{IsCountdown}(N) = \mathrm{True} \quad \land \quad |T_{\mathrm{adjacent}}(N) \cap L_{\mathrm{amplify}}| > 0

## Limited Time Message  [urgency]
### 1. Perpetual Extension
A fundamental indicator of deceptive urgency is the dynamic temporal shifting of the promotional constraint. We define$T_{\mathrm{end}}(i)$as the implied deadline during cycle$i$. The feature triggers if the backend system algorithmically shifts the expiration threshold forward ($T_{\mathrm{end}}(i+1)$) the moment the real-time system clock$t_{\mathrm{current}}$approaches the deadline. This renders the “limited” constraint infinite and proves the temporal pressure is a manufactured interface layer:
FORMULA: t_{\mathrm{current}} \ge T_{\mathrm{end}}(i) \implies T_{\mathrm{end}}(i+1) = t_{\mathrm{current}} + \Delta t_{\mathrm{extension}}

### 2. Visual Salience of Temporal-Urgency Chromatics
To establish a visual baseline for Limited Time Message, the algorithm inspects the container$C_{\mathrm{offer}}$for the co-occurrence of a time-constrained claim and high-saturation, warm-spectrum color styling. The feature triggers if the offer container's dominant accent color falls within the urgency spectrum ($h \in [0^\circ, 45^\circ]$) and the text matches a temporal-scarcity pattern (e.g., “ends in”, “only today”), creating a compound visual-linguistic urgency signal:
FORMULA: \mathrm{Hue}(C_{\mathrm{offer}}) \in [0^\circ, 45^\circ] \quad \land \quad \mathrm{Match}(T(C_{\mathrm{offer}}), \mathrm{Pattern}_{\mathrm{temporal}}) = \mathrm{True}

### 3. Ambiguous Temporal Bounding
To identify the manufacture of anxiety through uncertainty, we define$M_{\mathrm{urgency}}$as the promotional text node and$T_{\mathrm{end}}$as the factual backend expiration. We utilize a Natural Language Processing (NLP) function$\mathrm{Specificity}(M)$to evaluate the presence of concrete temporal data. The feature triggers if the interface algorithmically maximizes the emotional arousal of the message while driving factual specificity to zero, deliberately preventing the user from performing rational schedule planning or comparison:
FORMULA: \mathrm{Specificity}(M_{\mathrm{urgency}}) \approx 0 \quad \land \quad T_{\mathrm{end}} \notin \mathrm{DOM} \implies \mathrm{Urgency_{perceived}} \to \mathrm{Max}

## Price Comparison Prevention  [misdirection]
### 1. Fiat Decoupling
To detect the artificial severing of a price from its real-world value, we define$T_{\mathrm{price}}(n)$as the extracted textual value representing the cost within a product node$n$. We then introduce an algorithmic function$F_{\mathrm{convert}}(x)$designed to normalize or resolve any given value$x$into a standardized fiat currency$C_{\mathrm{fiat}}$(e.g., {$, pounds, EUR, PLN, USD}). The feature triggers if the interface actively presents a cost but mathematically prevents the evaluation of its real-world equivalent. This occurs when the conversion function resolves to a null set within the user's local Document Object Model (DOM), deliberately blocking cross-market comparison:
FORMULA: T_{\mathrm{price}}(n) \neq \emptyset \quad \land \quad F_{\mathrm{convert}}(T_{\mathrm{price}}(n)) = \emptyset

### 2. Visual Suppression of Unit-Price Information
To establish a visual baseline for Price Comparison Prevention, the algorithm extracts all rendered price-related text nodes and segments them into headline prices$N_{\mathrm{headline}}$and unit prices$N_{\mathrm{unit}}$(e.g., price-per-liter, price-per-gram). The feature triggers if the unit-price nodes are rendered at a font size or contrast ratio significantly suppressed relative to the headline price, quantified as a suppression ratio below the threshold$\tau_{\mathrm{suppress}}$:
FORMULA: \frac{\mathrm{fontSize}(N_{\mathrm{unit}})}{\mathrm{fontSize}(N_{\mathrm{headline}})} < \tau_{\mathrm{suppress}} \quad \lor \quad \frac{\mathrm{CR}(N_{\mathrm{unit}}, L_{\mathrm{bg}})}{\mathrm{CR}(N_{\mathrm{headline}}, L_{\mathrm{bg}})} < \tau_{\mathrm{suppress}}

### 3. Semantic Omission of Comparison-Relevant Qualifiers
To establish a semantic baseline for Price Comparison Prevention, the algorithm parses all price-adjacent text nodes for the presence of standardized unit-price qualifiers—“per liter,” “per oz,” “per 100g.” Let$Q_{\mathrm{standard}}$be the set of expected unit-price qualifiers for the product category and$Q_{\mathrm{rendered}}$be those actually present in the DOM. The feature triggers if the intersection is empty, indicating that the interface semantically strips the vocabulary necessary for cross-product comparison:
FORMULA: Q_{\mathrm{standard}} \cap Q_{\mathrm{rendered}} = \emptyset

## Reference Pricing  [misdirection]
### 1. Mathematical Exaggeration of Discount
Deceptive platforms frequently utilize extreme, mathematically improbable discounts to short-circuit rational evaluation and induce urgency. To detect this, we calculate the implied percentage discount$\Delta_{\mathrm{pct}}$derived directly from the reference anchor. Establishing$\tau_{\mathrm{unrealistic}}$as a heuristic threshold for suspicious, exaggerated discounts typical of low-quality e-commerce platforms (e.g.,$> 70\%$), the feature triggers if the calculated discount strictly exceeds this threshold without contextual justification:
FORMULA: \Delta_{\mathrm{pct}} = \frac{P_{\mathrm{ref}} - P_{\mathrm{cur}}}{P_{\mathrm{ref}}} \quad \implies \quad \Delta_{\mathrm{pct}} > \tau_{\mathrm{unrealistic}}

### 2. Visual Salience of Reference-Price Strikethrough
To establish a visual baseline for Reference Pricing, the algorithm extracts the strikethrough or “was” price node$N_{\mathrm{ref}}$and its accompanying current-price node$N_{\mathrm{current}}$. The feature triggers if the reference price is rendered at a contrast ratio below the WCAG 2.1 minimum for informational text ($\tau_{\mathrm{ref\_cr}} = 3.0$), effectively fading the comparison baseline to near-invisibility while the current price dominates the visual field:
FORMULA: \mathrm{CR}(N_{\mathrm{ref}}, L_{\mathrm{bg}}) < \tau_{\mathrm{ref\_cr}} \quad \land \quad \frac{\mathrm{fontSize}(N_{\mathrm{current}})}{\mathrm{fontSize}(N_{\mathrm{ref}})} > \tau_{\mathrm{size\_skew}}

### 3. Dual-Pricing Co-occurrence and Anchoring
To mathematically capture this visual anchoring, we identify$N_{\mathrm{cur}}$as the primary DOM node displaying the current selling price$P_{\mathrm{cur}}$, and$N_{\mathrm{ref}}$as an adjacent node displaying a secondary, higher reference price$P_{\mathrm{ref}}$. We define$S_{\mathrm{strike}}$as a set of CSS properties indicating a deprecated or “slashed” visual state (such as text-decoration: line-through or applied diagonal SVG vectors). The feature triggers if the system detects an anchored price comparison where the reference price is structurally marked as deprecated to artificially emphasize the current price's value:
FORMULA: P_{\mathrm{ref}} > P_{\mathrm{cur}} \quad \land \quad \mathrm{CSS}(N_{\mathrm{ref}}) \cap S_{\mathrm{strike}} \neq \emptyset

## Conflicting Information  [misdirection]
### 1. Structural Proximity of Contradictory Factual Nodes
To establish a structural baseline for Conflicting Information, the algorithm inspects the DOM tree for sibling or nested text nodes containing propositions whose logical intersection is null. Let$t_1, t_2$be text nodes within a shared parent container$C$whose extracted factual propositions$\mathrm{Prop}(t_1)$and$\mathrm{Prop}(t_2)$are mutually unsatisfiable. The feature triggers if contradictory truth-bearing nodes are positioned within a DOM distance$d_{\mathrm{DOM}}(t_1, t_2)$below the perceptual grouping threshold$\tau_{\mathrm{proximity}}$, indicating the interface deliberately co-locates false assertions to induce cognitive confusion:
FORMULA: \exists t_1, t_2 \in \mathrm{Descendants}(C) : \mathrm{Prop}(t_1) \land \mathrm{Prop}(t_2) \implies \bot \quad \land \quad d_{\mathrm{DOM}}(t_1, t_2) < \tau_{\mathrm{proximity}}

### 2. Semantic-Visual Mismatch
Interfaces frequently weaponize established design heuristics to create deceptive feedforward cues. Targeting an interactive DOM node$B$(such as a button), the algorithm extracts$\mathrm{Intent}(L(B))$, the NLP-derived semantic intent of its text label$L$(e.g., “Cancel” mapping to a negative/destructive action). Simultaneously, it calculates$\mathrm{Affordance}(C(B))$, the psychological affordance of its primary background color$C$extracted via CSS or the vision-language model (e.g., Green typically mapping to a positive/confirm action). The feature triggers if the semantic intent of the text diametrically opposes the established visual affordance of the element, deliberately confusing the user's automated psychological responses:
FORMULA: \mathrm{Intent}(L(B)) \cap \mathrm{Affordance}(C(B)) = \emptyset \quad \implies \quad \mathrm{Contradiction}

### 3. Mutually Exclusive Factual Claims
To identify explicit structural deception, we define$N_{\mathrm{container}}$as a parent DOM node representing a single informational context (e.g., a pricing tier card or a modal window), containing distinct text nodes such as$t_1$and$t_2$. Using Natural Language Processing, we extract$\mathrm{Sem}(x)$, which denotes the factual constraints encoded within text$x$. The feature triggers if the logical intersection of the constraints extracted from proximally close nodes evaluates to an unsatisfiable, mutually exclusive state. This mathematically proves the interface is presenting a logical paradox designed to mislead the user:
FORMULA: \exists t_1, t_2 \in N_{\mathrm{container}} : \mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Unsatisfiable}

## Information Without Context  [misdirection]
### 1. Structural Orphaned Nodes
Notification badges are often weaponized to exploit the human psychological drive for task completion, driving engagement through unresolved cognitive tension. We identify$N_{\mathrm{metric}}$as a node containing an isolated numerical alert (e.g., a badge displaying just the number “1”). This metric must logically correspond to a descriptor node$N_{\mathrm{descriptor}}$that defines its meaning (e.g., “New Messages”). By computing$d(N_{\mathrm{metric}}, N_{\mathrm{descriptor}})$as the DOM traversal distance or physical rendered distance (using vision-language model bounding boxes), the feature triggers if the metric node is structurally orphaned from its descriptor. This occurs when the distance strictly exceeds a threshold$\tau_{\mathrm{orphan}}$, dictating the maximum acceptable boundary for cognitive association and forcing the user to interact out of uninformed exploratory compulsion:
FORMULA: d(N_{\mathrm{metric}}, N_{\mathrm{descriptor}}) > \tau_{\mathrm{orphan}}

### 2. Visual Prominence Imbalance Between Metric and Baseline
To establish a visual baseline for Information Without Context, the algorithm examines the spatial rendering of the orphaned metric node$N_{\mathrm{metric}}$relative to its descriptor. The feature triggers if the metric (e.g., “98%”) is rendered at a disproportionately large font size and saturated color—quantified by the ratio of its visual weight$W(N) = \mathrm{fontSize}(N) \times \mathrm{contrastRatio}(N)$against any contextual qualifier$N_{\mathrm{context}}$in the same visual cluster, exceeding a balance threshold$\tau_{\mathrm{context\_imbalance}}$:
FORMULA: \frac{W(N_{\mathrm{metric}})}{W(N_{\mathrm{context}})} > \tau_{\mathrm{context\_imbalance}} \quad \land \quad \mathrm{CR}(N_{\mathrm{metric}}, L_{\mathrm{bg}}) > 7.0

### 3. Unanchored Quantitative Metrics
To evaluate the intentional omission of scale, we define$N_{\mathrm{info}}$as a DOM node containing a prominent numerical value or metric extracted via Natural Language Processing (NLP), denoted as$v$(e.g., “Save 50” or “Score: 98”). We establish$U_{\mathrm{val}}$as the expected unit of measurement (e.g., %, \$, PLN) and$B_{mathrm{val}}$as the necessary comparative baseline (e.g., ``out of 100'' or ``off the original price''). The feature triggers if the system extracts a high-prominence numerical value$v$that lacks both a definitive unit and a denominator within its immediate semantic cluster$S_{mathrm{cluster}}$. This mathematically proves the interface deliberately obscures the metric's true value:
FORMULA: v \in N_{\mathrm{info}} \quad \land \quad (U_{\mathrm{val}} \notin S_{\mathrm{cluster}} \lor B_{\mathrm{val}} \notin S_{\mathrm{cluster}})

## False Hierarchy  [misdirection]
### 1. Structural Element Downgrading
Beyond aesthetic manipulation, interfaces frequently deprive user-favorable actions of their fundamental interaction signifiers and affordances. We define$\mathrm{Tag}(x)$to represent the HTML tag type of an element, and$S_{\mathrm{padding}}(x)$as its computed clickable surface area padding. The feature triggers if the business action is rendered as a primary interactive component (e.g., a <button>), while its semantic opposite is structurally downgraded to a bare textual link (<a>). This is formalized by verifying the tag mismatch and confirming the padding mathematically approaches zero, effectively camouflaging the user's escape route:
FORMULA: \mathrm{Tag}(B_{\mathrm{business}}) = \texttt{<button>} \quad \land \quad \mathrm{Tag}(B_{\mathrm{user}}) = \texttt{<a>} \quad \land \quad S_{\mathrm{padding}}(B_{\mathrm{user}}) \approx 0

### 2. Relational Visual Weight Disparity
We define$B_{\mathrm{business}}$as the node representing the provider-favorable action, and$B_{\mathrm{user}}$as the opposing user-favorable action. To quantify their visual imbalance, we introduce a composite visual weight function$W(x)$, calculated as a linear combination of the vision-language model-extracted bounding box area$A(x)$, CSS background contrast$C(x)$, and font weight$F(x)$: The feature triggers if the visual weight of the business option vastly exceeds its direct semantic opposite. This indicates intentional relational suppression, formalized when the ratio pushes beyond a heuristic threshold$\tau_{\mathrm{hierarchy}}$:
FORMULA: W(x) = \alpha \cdot A(x) + \beta \cdot C(x) + \gamma \cdot F(x)
GIVEN: \frac{W(B_{\mathrm{business}})}{W(B_{\mathrm{user}})} > \tau_{\mathrm{hierarchy}}

### 3. Strict Semantic Opposition
To establish this relational dependency, we evaluate two proximally close interactive DOM nodes,$B_{1}$and$B_{2}$, located within the same container$N_{\mathrm{parent}}$. By extracting$\mathrm{Intent}(L(x))$, representing the NLP-derived semantic intent of the text label$L$for node$x$, the algorithm evaluates their relationship. The feature cannot trigger unless the system first mathematically establishes that the two elements represent mutually exclusive, binary opposing choices:
FORMULA: \exists \mathrm{Intent}(L(B_{1})) \equiv \neg \mathrm{Intent}(L(B_{2}))

## Visual Prominence  [misdirection]
### 1. Structural Asymmetry in DOM Subtree Weight
To establish a structural baseline for Visual Prominence, the algorithm compares the DOM subtree complexity of the business-favorable action node$N_{\mathrm{favorable}}$against the median subtree of all other interactive siblings. Let$\mathrm{Desc}(n)$count the total descendant nodes in the rendered subtree of node$n$. The feature triggers if the favorable action's subtree is structurally bloated—injecting extra wrapper <div> elements, icon containers, or gradient overlays—to a ratio exceeding$\tau_{\mathrm{subtree\_bloat}}$relative to its peers:
FORMULA: \frac{|\mathrm{Desc}(N_{\mathrm{favorable}})|}{\mathrm{median}_{s \in \mathrm{Siblings}(N_{\mathrm{favorable}})} |\mathrm{Desc}(s)|} > \tau_{\mathrm{subtree\_bloat}}

### 2. Absolute Bounding Box Dominance
To quantify this absolute dominance, we define$N_{\mathrm{favorable}}$as the DOM node representing the business-favorable action. We contrast its scale against$E_{\mathrm{baseline}}$, which represents the mean bounding box area of standard interactive elements within the current viewport. By calculating$A(x)$as the computed pixel area of a node's bounding box, the feature triggers if the interactive surface area of the target node mathematically dwarfs the baseline UI environment. This intentional manipulation of human motor interaction minimizes the friction to click the target, formalized when the ratio exceeds a severe size multiplier threshold$\tau_{\mathrm{area}}$:
FORMULA: \frac{A(N_{\mathrm{favorable}})}{A(E_{\mathrm{baseline}})} > \tau_{\mathrm{area}}

### 3. Semantic Neutrality of Dominant Action Labels
To establish a semantic baseline for Visual Prominence, the algorithm computes the NLP sentiment and coercion scores of the text label on the visually dominant business-favorable action button$N_{\mathrm{favorable}}$. The feature triggers if the label text carries a sentiment score deviating from neutrality by more than$\pm 0.5$on a normalized scale, or if it contains lexemes from a curated coercion dictionary (“unlock,” “claim,” “don't miss”), indicating that visual dominance is compounded by manipulative semantics:
FORMULA: |\mathrm{Sent}(L(N_{\mathrm{favorable}}))| > 0.5 \quad \lor \quad L(N_{\mathrm{favorable}}) \cap D_{\mathrm{coercion}} \neq \emptyset

## Persuasive Language  [misdirection]
### 1. Structural Density of Event Listeners on Coercive Text Nodes
To establish a structural baseline for Persuasive Language, the algorithm examines the DOM event-registration map for nodes classified as containing manipulative or coercive text. Let$N_{\mathrm{coercive}}$be the set of text-bearing nodes with an NLP coercion score above threshold, and let$E(n)$be the count of registered event listeners on node$n$. The feature triggers if coercive text nodes carry a disproportionately high listener density—including onclick, onmouseover, or delegated handlers—relative to neutral text nodes, indicating that manipulative language is structurally weaponized as a conversion trap:
FORMULA: \frac{|E(N_{\mathrm{coercive}})|}{|E(N_{\mathrm{neutral}})|} > \tau_{\mathrm{listener\_skew}}

### 2. Visual Emphasis Asymmetry on Coercive Text
To establish a visual baseline for Persuasive Language, the algorithm evaluates whether emotionally manipulative text nodes receive disproportionate typographic emphasis. Let$N_{\mathrm{coercive}}$be the subset of text nodes flagged by NLP as containing pressure-language (e.g., “Act Now”, “Don't Miss Out”) and$N_{\mathrm{neutral}}$be the remainder. The feature triggers if the mean font weight, color saturation, or bounding-box area of coercive nodes exceeds that of neutral nodes by a bias multiplier$\tau_{\mathrm{emphasis}}$:
FORMULA: \frac{\mathrm{fontWeight}(N_{\mathrm{coercive}})}{\mathrm{fontWeight}(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}} \quad \lor \quad \frac{A(N_{\mathrm{coercive}})}{A(N_{\mathrm{neutral}})} > \tau_{\mathrm{emphasis}}

### 3. Truth-Conditional Satisfiability
To distinguish this pattern from outright deception, we analyze distinct semantic text nodes,$t_1$and$t_2$, within the same informational container. By extracting their factual truth conditions, denoted as$\mathrm{Sem}(x)$, the feature strictly requires that the persuasive claims do not logically contradict one another. They must maintain a mathematically satisfiable state, proving the manipulation relies exclusively on emotional framing rather than factual falsity:
FORMULA: \mathrm{Sem}(t_1) \land \mathrm{Sem}(t_2) \implies \mathrm{Satisfiable}

## Cuteness  [misdirection]
### 1. Structural Conditional Injection of Affective Assets
To establish a structural baseline for Cuteness, the algorithm models the DOM mutation log$\Delta\mathrm{DOM}(t)$during a user session and cross-references it against the application state machine. The feature triggers if image nodes classified as affective ($I_{\mathrm{affective}}$, containing anthropomorphic or high-valence imagery) are exclusively injected into the DOM during cancellation or opt-out flows ($s = s_{\mathrm{cancel}}$) and are structurally absent during onboarding or normal usage ($s = s_{\mathrm{onboard}}$):
FORMULA: I_{\mathrm{affective}} \cap \mathrm{DOM}(s_{\mathrm{onboard}}) = \emptyset \quad \land \quad I_{\mathrm{affective}} \subset \mathrm{DOM}(s_{\mathrm{cancel}})

### 2. Context-Dependent Image Injection
To detect the manipulative visual deployment of affective assets, we model the application flow as a state machine where$s_{\mathrm{onboard}}$is the acquisition state and$s_{\mathrm{cancel}}$is the termination state. We track the bounding box properties of all rendered image elements during each state. The feature triggers if specific graphical assets, denoted as$I_{\mathrm{affective}}$, are deliberately withheld during standard usage but injected exclusively during the termination flow with visual properties engineered to maximize emotional impact—specifically, an affective image is rendered at a viewport-dominant scale (its bounding box area exceeds a prominence threshold$\tau_{\mathrm{prominence}}$) or at a high-contrast, emotionally salient chromatic profile:
FORMULA: I_{\mathrm{affective}} \notin I(s_{\mathrm{onboard}}) \quad \land \quad I_{\mathrm{affective}} \in I(s_{\mathrm{cancel}})
GIVEN: \land \quad \left( \frac{A(i)}{A_{\mathrm{viewport}}} > \tau_{\mathrm{prominence}} \quad \lor \quad \mathrm{CR}(i, L_{\mathrm{bg}}) > 7.0 \right) \quad \forall i \in I_{\mathrm{affective}}

### 3. Semantic Pairing of Guilt
Emotional manipulation is most effective when visual and semantic cues are combined. We identify$N_{\mathrm{text}}$as the textual node rendered in immediate proximity to the image$i$, structurally verified via vision-language model bounding box intersection or DOM tree sibling relationships. Applying an NLP function$\mathrm{Affect}(x)$that maps text$x$to an emotional vector—specifically scoring for guilt-inducing semantics or parasocial distress (e.g., “You are breaking our heart”, “Sad to see you go”)—the feature evaluates the combined payload. It triggers if the text reinforces the visual emotional manipulation, creating a compound psychological barrier to the cancellation event. This is mathematically verified when the affective score surpasses a manipulation threshold$\tau_{\mathrm{guilt}}$and the spatial distance$d_{\mathrm{spatial}}(N_{\mathrm{text}}, i)$falls within a strict proximity boundary$\delta_{\mathrm{proximity}}$, ensuring the text and image act as a single contextual unit:
FORMULA: \mathrm{Affect}(N_{\mathrm{text}}) > \tau_{\mathrm{guilt}} \quad \land \quad d_{\mathrm{spatial}}(N_{\mathrm{text}}, i) < \delta_{\mathrm{proximity}}

## Positive Or Negative Framing  [misdirection]
### 1. Structural Asymmetry of Framed Option Subtrees
To establish a structural baseline for Positive or Negative Framing, the algorithm compares the DOM topology of options presented under gain-framed and loss-framed modalities within the same decision container. Let$T_{\mathrm{gain}}$and$T_{\mathrm{loss}}$be the respective DOM subtrees. The feature triggers if one framing pole contains additional structural embellishments—extra icon nodes, badge overlays, or color-wrapper <span> elements—not present in the counterpart, quantified as a subtree-difference ratio exceeding$\tau_{\mathrm{frame\_structure}}$:
FORMULA: \frac{|T_{\mathrm{gain}} \setminus T_{\mathrm{loss}}|}{|T_{\mathrm{gain}} \cup T_{\mathrm{loss}}|} > \tau_{\mathrm{frame\_structure}}

### 2. Visual Weight Asymmetry Between Framing Poles
To establish a visual baseline for Positive or Negative Framing, the algorithm identifies paired interface segments presenting the same information under gain-framed ($F_{\mathrm{gain}}$) and loss-framed ($F_{\mathrm{loss}}$) modalities. The feature triggers if the visual weight—computed as the product of bounding box area and contrast ratio—is asymmetrically distributed between the two frames, with one pole rendered at a multiplier exceeding$\tau_{\mathrm{frame\_asymmetry}}$relative to the other:
FORMULA: \max\left(\frac{W(F_{\mathrm{gain}})}{W(F_{\mathrm{loss}})}, \frac{W(F_{\mathrm{loss}})}{W(F_{\mathrm{gain}})}\right) > \tau_{\mathrm{frame\_asymmetry}}

### 3. Identification of Mutually Exclusive Vectors
To mathematically evaluate the decision context, we isolate$M_{\mathrm{decision}}$, a bounded DOM container (such as a modal or consent form) demanding a user choice. Within this container, we identify two interactive nodes,$B_{\mathrm{opt\_in}}$and$B_{\mathrm{opt\_out}}$. By tracking$A(x)$, which denotes the backend state transition or boolean consequence of interacting with a given node$x$, the system first verifies that the nodes represent a strict, binary, mutually exclusive choice:
FORMULA: A(B_{\mathrm{opt\_in}}) \equiv \neg A(B_{\mathrm{opt\_out}})

## Choice Overload  [misdirection]
### 1. Excessive Element Quantization
To quantify the cognitive burden of an interface, we define$C_{\mathrm{choices}} = \{c_1, c_2, \dots, c_n\}$as the set of distinct, actionable input nodes (e.g., vendor checkboxes or cookie toggles) rendered within a singular decision context$M_{\mathrm{decision}}$. We establish$\tau_{\mathrm{cognitive\_limit}}$as the psychological threshold for comfortable human working memory, typically modeled around$7 \pm 2$items. The feature triggers if the sheer volume of presented granular choices strictly exceeds a heuristic upper bound$\tau_{\mathrm{overload}}$(e.g.,$> 20$individual toggles), mathematically guaranteeing cognitive overload and the subsequent degradation of informed consent:
FORMULA: |C_{\mathrm{choices}}| > \tau_{\mathrm{overload}}

### 2. Visual Density of Interactive Decision Elements
To establish a visual baseline for Choice Overload, the algorithm computes the spatial density$\rho$of interactive elements within the primary decision viewport. Let$n_{\mathrm{interactive}}$be the count of clickable, tappable, or selectable nodes and$A_{\mathrm{viewport}}$the visible area. The feature triggers if the interactive-element density exceeds Miller's cognitive processing capacity, quantified as a density threshold$\tau_{\mathrm{density}}$beyond which rational comparison becomes infeasible:
FORMULA: \rho = \frac{n_{\mathrm{interactive}}}{A_{\mathrm{viewport}}} > \tau_{\mathrm{density}}

### 3. Semantic Similarity Collapse Among Options
To establish a semantic baseline for Choice Overload, the algorithm computes pairwise semantic similarity among all option descriptions within a decision container using LLM-generated semantic embeddings. The feature triggers if the mean pairwise cosine similarity exceeds$\tau_{\mathrm{similarity}}$, indicating that options are semantically near-identical despite being presented as distinct choices—a structural exploitation of Hick's Law that maximizes decision paralysis:
FORMULA: \frac{1}{|C|(|C|-1)} \sum_{i \neq j} \mathrm{sim}(T_i, T_j) > \tau_{\mathrm{similarity}}

## Plain Evil (Theoretical Construct)  [misdirection]
### 1. Dark Pattern Singularity
To model the cumulative impact of an adversarial interface, we define$\mathbb{D} = \{D_1, D_2, \dots, D_n\}$as the set of all structurally defined dark patterns (e.g., Hidden Costs, Sneak into Basket, or Labyrinthine Navigation). We apply a boolean function$\mathrm{Active}(D_i, M_{\mathrm{context}})$to evaluate if a specific pattern$D_i$is active within the user's current interface context. The feature triggers if the density of simultaneously active dark patterns exceeds a catastrophic hostility threshold$\tau_{\mathrm{hostility}}$. This creates an environment where the user cannot initiate a single action without encountering a manipulative vector, effectively saturating the decision-making space:
FORMULA: \sum_{i=1}^{n} \mathrm{Active}(D_i, M_{\mathrm{context}}) \ge \tau_{\mathrm{hostility}}

### 2. Visual Hostility Density Index
To establish a visual baseline for Compound Adversarial Architecture, the algorithm computes a compound hostility score$H$over the entire viewport by aggregating multiple visual-manipulation signals: dark-pattern-classified bounding boxes, urgency-color palettes (red/orange dominance), and below-threshold font sizes on cancellation vectors. The feature triggers if the spatial density of hostile visual markers exceeds a compound threshold$\tau_{\mathrm{hostility}}$:
FORMULA: H = \frac{\sum_{i} \mathbb{1}_{\mathrm{hostile}}(N_i) \cdot w_i}{A_{\mathrm{viewport}}} > \tau_{\mathrm{hostility}}

### 3. Semantic Hostility Density Score
To establish a semantic baseline for Compound Adversarial Architecture, the algorithm computes a composite semantic hostility vector$H_{\mathrm{sem}}$over all visible text nodes, aggregating: (a) coercive-language density, (b) FKGL-complexity outliers, (c) sentiment-polarity spread, and (d) connotative manipulation score. The feature triggers if the$L_2$norm of this hostility vector exceeds a compound threshold$\tau_{\mathrm{hostile\_sem}}$, indicating pervasive linguistic manipulation across the interface:
FORMULA: \|H_{\mathrm{sem}}\|_2 = \sqrt{\rho_{\mathrm{coerce}}^2 + \sigma_{\mathrm{FKGL}}^2 + \sigma_{\mathrm{sent}}^2 + \rho_{\mathrm{connot}}^2} > \tau_{\mathrm{hostile\_sem}}

## Endorsement And Testimonials  [misdirection]
### 1. Statistical Implausibility
To identify the manipulation of sentiment, we define$R_{\mathrm{total}}$as the total set of user reviews and$S(r_i)$as the star rating (1–5). We contrast the rendered distribution$D_{\mathrm{rendered}}$with$D_{\mathrm{organic}}$, the expected distribution of genuine feedback which naturally exhibits variance. The feature triggers if the interface algorithmically filters the dataset such that the distribution clustering around the maximum score lacks organic variance, suggesting a scrubbed or fabricated environment:
FORMULA: \mathrm{Mean}(S(R_{\mathrm{total}})) \approx 5.0 \quad \land \quad \mathrm{Var}(S(R_{\mathrm{total}})) \approx 0 \implies D_{\mathrm{rendered}} \neq D_{\mathrm{organic}}

### 2. Visual Verifiability of Testimonial Attribution
To establish a visual baseline for Endorsement and Testimonials, the algorithm examines each testimonial or review card$C_{\mathrm{testimonial}}$for the presence of verifiable source attribution—a full name, photograph, or linked profile. The feature triggers if testimonials lack any rendered attribution element within the card's bounding-box hierarchy, indicating potentially fabricated or unverifiable social proof:
FORMULA: \exists C_{\mathrm{testimonial}} : \neg\exists N_{\mathrm{attribution}} \in \mathrm{Descendants}(C_{\mathrm{testimonial}})

### 3. Provenance Obfuscation
Fabricated endorsements often rely on repetitive templates and reused assets to scale. We analyze$I_{\mathrm{avatar}}(P_i)$, the profile image, and$T_{\mathrm{text}}(r_i)$, the review text. Using a$\mathrm{Similarity}(x, y)$function for both computer vision and NLP, the feature triggers if endorsements utilize non-unique stock imagery or templated syntactic structures. This indicates bot-driven generation rather than authentic human experience:
FORMULA: \mathrm{Similarity}(I_{\mathrm{avatar}}(P_i), I_{\mathrm{stock\_database}}) \approx 1 \quad \lor \quad \mathrm{Similarity}(T_{\mathrm{text}}(r_i), T_{\mathrm{text}}(r_j)) > \tau_{\mathrm{template}}

## Confirmshaming  [misdirection]
### 1. Structural Asymmetry in Decline-Option Accessibility
To establish a structural baseline for Confirmshaming, the algorithm compares the DOM properties of the acceptance node$N_{\mathrm{accept}}$against the decline node$N_{\mathrm{decline}}$. The feature triggers if the decline option is structurally demoted—lacking a <button> wrapper, rendered as a plain <a> link without role=\"button\", or positioned outside the primary modal <div> hierarchy—while the acceptance option receives full structural affordance:
FORMULA: \mathrm{Tag}(N_{\mathrm{decline}}) \notin \{\texttt{<button>}, \texttt{[role=\"button\"]}\} \quad \land \quad \mathrm{Tag}(N_{\mathrm{accept}}) = \texttt{<button>}

### 2. Visual Hierarchy Subversion
The efficacy of confirmshaming is often compounded by structural invisibility. We define$\mathrm{Vis}(N)$as the visual prominence of a node derived from font size, bounding box area, and contrast ratio. The feature triggers if the interface compounds linguistic manipulation by degrading the visual accessibility of the shaming link. By hyper-illuminating the positive choice while rendering the exit link at the threshold of minimum accessibility ($\tau_{\mathrm{minimum\_accessibility}}$), the interface forces the user into the provider-favorable path:
FORMULA: \mathrm{Vis}(N_{\mathrm{accept}}) \gg \mathrm{Vis}(N_{\mathrm{decline}}) \quad \land \quad \mathrm{Vis}(N_{\mathrm{decline}}) \to \tau_{\mathrm{minimum\_accessibility}}

### 3. Semantic Asymmetry
To identify the emotional weaponization of UI text, we define$N_{\mathrm{accept}}$as the affirmative node and$N_{\mathrm{decline}}$as the user's dismissal node. Utilizing an NLP function$S_{\mathrm{sentiment}}(x)$to evaluate emotional valence (bounded between$-1$for highly negative/shameful and$+1$for positive/affirming), the feature triggers if the interface algorithmically forces a severe polarization between choices. This ensures the functional exit route is assigned a toxic semantic score, creating an artificial emotional barrier to rejection:
FORMULA: S_{\mathrm{sentiment}}(N_{\mathrm{accept}}) > 0 \quad \land \quad S_{\mathrm{sentiment}}(N_{\mathrm{decline}}) \ll 0

## Psychological Tricks  [misdirection]
### 1. Asymmetric Dominance
To identify the manipulation of relative perception, we define$O_{\mathrm{target}}$as the provider's preferred tier and$O_{\mathrm{competitor}}$as a lower-cost alternative. We introduce$O_{\mathrm{decoy}}$, a third option engineered strictly to alter the choice matrix. The feature triggers if the decoy is designed to be inferior to the target option in every metric while remaining structurally similar in price. This artificially inflates the target's perceived value, mathematically shifting the user's preference probability toward the more expensive, yet seemingly more \"valuable\" option:
FORMULA: V(O_{\mathrm{target}}) \gg V(O_{\mathrm{decoy}}) \quad \land \quad \mathrm{Cost}(O_{\mathrm{target}}) \approx \mathrm{Cost}(O_{\mathrm{decoy}}) \implies P_{\mathrm{select}}(O_{\mathrm{target}}) \to \mathrm{Max}

### 2. Cognitive Overload
The hostility of an interface is often measurable by the exhaustion it induces in the user. We define$C_{\mathrm{matrix}}$as a sequence of complex configuration choices and$\tau_{\mathrm{fatigue}}$as the psychological threshold for decision fatigue. Let$D_{\mathrm{favorable}}$be the pre-selected default state that serves the provider's extraction goals. The feature triggers if the interface inflates the cardinality and complexity of the matrix beyond human cognitive stamina, statistically guaranteeing that the exhausted user will abandon active evaluation and surrender to the hostile default:
FORMULA: |C_{\mathrm{matrix}}| \gg \tau_{\mathrm{fatigue}} \quad \implies \quad \lim_{t \to \infty} P_{\mathrm{select}}(D_{\mathrm{favorable}}) = 1

### 3. Reference Point Obfuscation
A fundamental indicator of cognitive contamination is the use of arbitrary anchors to inflate perceived value. We define$P_{\mathrm{actual}}$as the intended selling price and$P_{\mathrm{anchor}}$as an inflated numerical value (e.g., a fabricated “MSRP”) positioned with high visual salience. The feature triggers if the interface forces the user to process the inflated anchor first, contaminating their Willingness To Pay ($\mathrm{WTP}$) threshold. This makes the baseline cost appear as a compelling discount regardless of its actual market value:
FORMULA: P_{\mathrm{anchor}} \gg P_{\mathrm{actual}} \quad \implies \quad \mathrm{WTP}(U_{\mathrm{anchored}}) > \mathrm{WTP}(U_{\mathrm{baseline}})

## Pressured Selling  [nagging]
### 1. Transactional Flow Interruption
To formalize this commandeering of user intent, we model the expected linear sequence of user states required to complete a purchase as$S_{\mathrm{checkout}}$. Within this sequence,$B_{\mathrm{proceed}}$acts as the primary action node moving the user to the final payment state$s_{\mathrm{final}}$. We define$M_{\mathrm{upsell}}$as an unexpected modal window or full-screen overlay containing a secondary product offer$I_{\mathrm{secondary}}$. The feature triggers if interacting with the primary progression node intercepts the standard flow, forcefully injecting the upsell modal into the Document Object Model (DOM). This temporarily disables the checkout process until a secondary decision is made, mathematically verifying the structural interruption:
FORMULA: \mathrm{Click}(B_{\mathrm{proceed}}) \implies \mathrm{Visibility}(M_{\mathrm{upsell}}) = \mathrm{True} \quad \land \quad s_{\mathrm{final}} \notin S_{\mathrm{current}}

### 2. Localized Temporal or Visual Constraints
Scarcity and urgency are frequently enforced using adversarial visual stimuli and synthetic temporal constraints. We isolate$T_{\mathrm{offer}}$as a dynamic temporal node (countdown timer) explicitly bound to the secondary offer$I_{\mathrm{secondary}}$inside the modal, with$\Delta t_{\mathrm{offer}}$representing the total duration of the countdown. Simultaneously, we monitor$V_{\mathrm{animations}}$, the set of CSS properties associated with high-stress visual stimuli (e.g., animation: blink, rapidly changing background colors, or shaking UI elements). The feature triggers if the system detects an extremely short, localized timer designed to induce immediate panic (e.g., under 5 minutes), often coupled with aggressive, attention-hijacking visual animations:
FORMULA: \Delta t_{\mathrm{offer}} < \tau_{\mathrm{panic\_duration}} \quad \lor \quad (\mathrm{CSS}(M_{\mathrm{upsell}}) \cap V_{\mathrm{animations}} \neq \emptyset)

### 3. High-Arousal Lexical Density
To quantify the psychological stress induced by the interface, we extract$W(M)$, representing the set of textual tokens rendered within the newly injected modal$M_{\mathrm{upsell}}$. This is evaluated against$D_{\mathrm{pressure}}$, an NLP-defined lexicon of high-arousal, urgency-inducing, or FOMO trigger phrases (e.g., {“Wait!”, “Don't miss out”, “Last chance”, “Offer expires”}). The feature triggers if the semantic density of pressure-inducing tokens relative to the total word count exceeds a predefined aggressive marketing threshold$\tau_{\mathrm{arousal}}$, proving the copy is actively attempting to manufacture panic: [Image of a high-arousal e-commerce modal featuring a bright red countdown timer and blinking text emphasizing a fleeting, limited-time offer]
FORMULA: \frac{|W(M) \cap D_{\mathrm{pressure}}|}{|W(M)|} > \tau_{\mathrm{arousal}}

## Small or Moving Close Button  [interface-interference]
### 1. Structural Event-Listener Commandeering on Dismissal Vectors
To establish a structural baseline for Small or Moving Close Button, the algorithm traces the registered event handlers on the identified close-button node$N_{\mathrm{close}}$. The feature triggers if the onclick or onpointerdown handler for the close element is either (a) intercepted by a parent-level capture-phase listener that redirects the event, or (b) dynamically rebound at a rate$\Delta t_{\mathrm{rebind}}$below$\tau_{\mathrm{rebind}}$, indicating kinetic evasion where the handler target mutates faster than human reaction time:
FORMULA: \mathrm{IsIntercepted}(N_{\mathrm{close}}) = \mathrm{True} \quad \lor \quad \Delta t_{\mathrm{rebind}}(N_{\mathrm{close}}) < \tau_{\mathrm{rebind}}

### 2. Microscopic Hitbox
To evaluate the physical accessibility of the dismissal vector, we define$N_{\mathrm{close}}$as the DOM node or vision-language model-detected bounding box representing the close action. We calculate its interactive surface area in CSS pixels as$A(x) = \mathrm{width}(x) \times \mathrm{height}(x)$, and contrast this with$A(M_{\mathrm{parent}})$, the total rendered area of the parent modal or advertisement container. The feature triggers if the absolute area of the close button falls below established Web Content Accessibility Guidelines (WCAG) minimums for touch targets (codified as$44 \times 44$pixels), or if its relative size compared to the parent container is geometrically insignificant, falling below a fractional threshold$\delta_{\mathrm{micro}}$(e.g.,$0.001$):
FORMULA: A(N_{\mathrm{close}}) < \tau_{\mathrm{wcag\_hitbox}} \quad \lor \quad \frac{A(N_{\mathrm{close}})}{A(M_{\mathrm{parent}})} < \delta_{\mathrm{micro}}

### 3. Semantic Obfuscation of Dismissal Labels
To establish a semantic baseline for Small or Moving Close Button, the algorithm examines the aria-label, title attribute, and visible text of dismissal elements. The feature triggers if the close button's accessible name is absent, semantically vacuous (e.g., a non-descriptive icon with no label), or misleading—such as labeling a close action with “Continue” or “Learn More”—indicating that even if the element is visually detected, its semantic identity is deliberately obscured:
FORMULA: \mathrm{AccessibleName}(N_{\mathrm{close}}) = \emptyset \quad \lor \quad \mathrm{Intent}(\mathrm{AccessibleName}(N_{\mathrm{close}})) \neq \mathrm{Dismissal}

## Bad Defaults / Preselection  [interface-interference]
### 1. Pre-initialized Activation State
To formally define this state manipulation, we monitor the set$C$of all boolean input nodes within the interface (e.g., <input type=\"checkbox\">, <input type=\"radio\">, or custom toggle <div> elements). Establishing$t_0$as the timestamp immediately following the DOMContentLoaded event, prior to any user input, we apply a state evaluation function$\mathrm{State}(c, t)$to capture the boolean activation status (checked/unchecked) of any node$c \in C$at time$t$. The feature triggers if a node is algorithmically initialized to an active state without explicit user initiation, exploiting default acceptance heuristics:
FORMULA: \exists c \in C : \mathrm{State}(c, t_0) = \mathrm{True} \quad \land \quad \mathrm{UserEvents}(c, t_0) = \emptyset

### 2. Visual or Structural Obfuscation
The efficacy of a bad default is maximized when the user is unaware it exists. We identify$N_{\mathrm{submit}}$as the primary progression node (e.g., the “Register” or “Checkout” button). Applying a boolean function$V(c, t_0)$, we evaluate whether the pre-selected node$c$is actually rendered within the visible viewport at$t_0$, ensuring it is not hidden inside a collapsed accordion or pushed below the fold. Simultaneously, we calculate$d_{\mathrm{spatial}}(c, N_{\mathrm{submit}})$, the Euclidean distance between the checkbox and the submit button derived from vision-language model bounding boxes. The feature triggers if the pre-selected node is intentionally hidden from immediate visual parsing, maximizing the probability of unnoticed progression because it falls outside the user's peripheral vision threshold$\tau_{\mathrm{peripheral\_vision}}$:
FORMULA: V(c, t_0) = \mathrm{False} \quad \lor \quad d_{\mathrm{spatial}}(c, N_{\mathrm{submit}}) > \tau_{\mathrm{peripheral\_vision}}

### 3. Semantic Intent of the Default Action
Because not all defaults are malicious (e.g., defaulting to the cheapest shipping tier is user-favorable), we evaluate$L(c)$, the text label structurally bound to the pre-selected node$c$(often via the HTML for attribute). Using an NLP classification function$\mathrm{Intent}(x)$that maps the text$x$to a defined consequence domain$D$(such as$D_{\mathrm{privacy\_loss}}$,$D_{\mathrm{financial\_cost}}$, or$D_{\mathrm{marketing\_opt\_in}}$), the algorithm contextualizes the danger. The feature triggers if the NLP model determines that the pre-selected node explicitly maps to a provider-favorable domain, actively penalizing the user's privacy or finances by default:
FORMULA: \mathrm{Intent}(L(c)) \in \{D_{\mathrm{privacy\_loss}}, D_{\mathrm{financial\_cost}}, D_{\mathrm{marketing\_opt\_in}}\}

## Trick Questions  [interface-interference]
### 1. Structural Label-Input Semantic Mismatch
To establish a structural baseline for Trick Questions, the algorithm examines <input>, <select>, and <button> elements for a mismatch between their structural aria-label or associated <label> text and the NLP-inferred action semantics. The feature triggers if a form element's programmatic label ($L_{\mathrm{aria}}$) maps to one action (e.g., “Opt out”) while its visual label text ($L_{\mathrm{visual}}$) maps to its semantic opposite (e.g., “Stay subscribed”), creating a structural double-bind:
FORMULA: \mathrm{SemanticDist}(L_{\mathrm{aria}}(N), L_{\mathrm{visual}}(N)) > \tau_{\mathrm{label\_mismatch}}

### 2. Affordance-Consequence Mismatch
To capture the manipulation of standard UI heuristics, we define$\mathrm{State}(c) = \mathrm{True}$as the physical affordance of checking a box, which psychologically aligns with acceptance, inclusion, or addition. We then map the actual backend consequence of that action to$\mathrm{Intent}(L(c))$using semantic classification. Defining$D_{\mathrm{deny}}$as the domain of rejection or exclusion (e.g., “do not send” or “opt-out”), the feature triggers if the positive physical action of checking the box explicitly maps to a negative or exclusionary intent. This reversal of standard UI conventions acts as a trap for users who quickly skim text:
FORMULA: (\mathrm{State}(c) = \mathrm{True}) \implies (\mathrm{Intent}(L(c)) \in D_{\mathrm{deny}})

### 3. Syntactic Obfuscation via Multiple Negations
To quantify linguistic deception, we extract the text label$L(c)$associated with a boolean input node$c$(e.g., a checkbox) and generate its syntactic dependency tree$T_{\mathrm{parse}}(L(c))$using an NLP parser. By isolating$N_{\mathrm{neg}}(L(c))$—the discrete count of negation modifiers (e.g., “not”, “un-”, “prevent”, “refuse”) directly acting upon the primary action verbs—the feature triggers if the system detects an unnatural stacking of negations (such as double or triple negatives). This structural convolution is deliberately designed to overwhelm the user's cognitive parsing capacity:
FORMULA: N_{\mathrm{neg}}(L(c)) \geq 2 \quad \implies \quad \mathrm{Linguistic \: Obfuscation}

## Wrong Language  [interface-interference]
### 1. Asymmetric State Application
The most deceptive implementation of this pattern involves maintaining linguistic clarity during user acquisition while introducing barriers during termination. We define$S_{\mathrm{acquisition}}$as states beneficial to the provider (e.g., checkout) and$S_{\mathrm{termination}}$as states beneficial to the user (e.g., account deletion). By evaluating$\mathbb{L}(s)$as the set of languages rendered during a given state, the feature triggers if the application maintains consistency during acquisition but introduces a foreign language strictly during termination or opt-out flows, proving the discrepancy is non-stochastic and intentional:
FORMULA: \mathbb{L}(S_{\mathrm{acquisition}}) = \{L_{\mathrm{session}}\} \quad \land \quad \mathbb{L}(S_{\mathrm{termination}}) \setminus \{L_{\mathrm{session}}\} \neq \emptyset

### 2. Visual-Linguistic Locale Mismatch
To establish a visual baseline for Wrong Language, the algorithm compares the dominant language$L_{\mathrm{DOM}}$detected in rendered text nodes (via lang attribute or character-set heuristics) against the user agent's declared locale$L_{\mathrm{browser}}$. The feature triggers if the interface renders critical functional text—privacy toggles, consent buttons, cancellation flows—in a language not matching the user's declared preference, exploiting comprehension barriers to manufacture consent:
FORMULA: L_{\mathrm{DOM}}(N_{\mathrm{critical}}) \neq L_{\mathrm{browser}}

### 3. Localized Linguistic Discrepancy
To identify this structural obfuscation, we define$L_{\mathrm{session}}$as the primary language of the user's browsing session, typically determined by the <html lang=\"...\"> attribute. We monitor$N_{\mathrm{critical}}$as a specific DOM node containing high-stakes interactive elements or legal disclosures. Utilizing an NLP function$\mathrm{Lang}(x)$to predict the dominant language of the text within a node, the feature triggers if the detected language of the critical node explicitly deviates from the established session language. This is verified when the language identification confidence$\mathrm{Confidence}(\mathrm{Lang}(N_{\mathrm{critical}}))$exceeds a reliability threshold$\tau_{\mathrm{lang\_id}}$:
FORMULA: \mathrm{Lang}(N_{\mathrm{critical}}) \neq L_{\mathrm{session}} \quad \land \quad \mathrm{Confidence}(\mathrm{Lang}(N_{\mathrm{critical}})) > \tau_{\mathrm{lang\_id}}

## Complex Language  [interface-interference]
### 1. Structural Nesting Depth of Legal/Technical Text Nodes
To establish a structural baseline for Complex Language, the algorithm measures the DOM nesting depth and text-node length distribution within legal or terms-of-service containers$C_{\mathrm{legal}}$. The feature triggers if FKGL-flagged complex text nodes are structurally buried at a DOM depth$D_{\mathrm{DOM}}(N_{\mathrm{complex}})$significantly exceeding the site's median content depth, or if the mean clause length (measured in DOM text-node character count) exceeds readability thresholds:
FORMULA: D_{\mathrm{DOM}}(N_{\mathrm{complex}}) > \tau_{\mathrm{legal\_depth}} \quad \lor \quad \frac{1}{|N_{\mathrm{complex}}|} \sum_{n} |\mathrm{text}(n)| > \tau_{\mathrm{clause\_length}}

### 2. Visual Density of Legalese Text Blocks
To establish a visual baseline for Complex Language, the algorithm identifies text nodes flagged by FKGL analysis as exceeding a 12th-grade reading level and evaluates their visual presentation. The feature triggers if these legally or technically complex passages are rendered below the site's median body font size—making them visually inconspicuous while semantically impenetrable—quantified by a shrinkage ratio$\tau_{\mathrm{shrink}}$:
FORMULA: \frac{\mathrm{fontSize}(N_{\mathrm{complex}})}{S_{\mathrm{base}}} < \tau_{\mathrm{shrink}} \quad \land \quad \mathrm{FKGL}(N_{\mathrm{complex}}) > 12

### 3. Exceedance of Baseline Readability Indices
To quantify the mismatch between user literacy and interface complexity, we identify$N_{\mathrm{text}}$as a DOM node containing a disclosure or policy paragraph. We compute$\mathrm{FKGL}(N_{\mathrm{text}})$, the Flesch-Kincaid Grade Level, which estimates the years of education required to parse the text based on average sentence length and syllables per word. We contrast this against$\tau_{\mathrm{education\_limit}}$, a heuristic threshold representing the general public's reading level (typically an 8th to 10th-grade level). The feature triggers if the computed grade level of consumer-facing disclosures severely exceeds this threshold, indicating the text requires advanced collegiate or legal education to comprehend:
FORMULA: \mathrm{FKGL}(N_{\mathrm{text}}) > \tau_{\mathrm{education\_limit}}

## Feedforward Ambiguity  [interface-interference]
### 1. Structural Ambiguity of Action-Outcome Mapping
To establish a structural baseline for Feedforward Ambiguity, the algorithm inspects interactive elements whose onclick, href, or formaction targets resolve to URLs or state transitions with semantics that conflict with the element's rendered label. Let$\mathrm{Expect}(L(N))$be the user's expected outcome derived from the button label, and$\mathrm{Resolve}(N)$be the actual structural target. The feature triggers if the semantic divergence between expectation and resolution exceeds a threshold$\tau_{\mathrm{feedforward}}$:
FORMULA: \exists N \in \mathrm{Interactive} : \mathrm{Distance}(\mathrm{Expect}(L(N)), \mathrm{Resolve}(N)) > \tau_{\mathrm{feedforward}}

### 2. Iconographic Entropy and Missing Affordances
Visual polysemy is frequently weaponized by removing textual anchors from interactive icons. We define$N_{\mathrm{icon}}$as a graphical interactive node that lacks adjacent visible text and accessibility attributes. Using an icon-classification model, we derive$\mathrm{CV}_{\mathrm{class}}(N_{\mathrm{icon}})$, representing the probability distribution of possible semantic meanings. We calculate the Shannon entropy$H(\mathrm{CV}_{\mathrm{class}})$of these predictions, where high entropy indicates the icon is contextually ambiguous. The feature triggers if the interface relies on a highly ambiguous icon for a critical action without providing a clarifying tooltip$T_{\mathrm{hover}}$or accessible label:
FORMULA: H(\mathrm{CV}_{\mathrm{class}}(N_{\mathrm{icon}})) > \tau_{\mathrm{entropy}} \quad \land \quad T_{\mathrm{hover}} = \emptyset

### 3. Semantic Divergence of Action and Outcome
To identify deceptive labeling, we define$L(n)$as the text label of an interactive DOM node (e.g., “Next” or “I Agree”). We map the user's expected outcome to a semantic vector space,$\mathrm{Intent}_{\mathrm{NLP}}(L(n))$, and contrast it with$\mathrm{Outcome}_{\mathrm{System}}(n)$, the actual backend execution or state transition triggered by the interaction (e.g., SubmitPayment() or OptInAll()). The feature triggers if the semantic similarity between the predicted linguistic intent and the actual programmatic outcome falls below a clarity threshold$\tau_{\mathrm{clarity}}$. This is particularly critical if the outcome resides in a high-stakes domain$D_{\mathrm{critical}}$, such as finance or data privacy:
FORMULA: \mathrm{Sim}(\mathrm{Intent}_{\mathrm{NLP}}(L(n)), \mathrm{Outcome}_{\mathrm{System}}(n)) < \tau_{\mathrm{clarity}} \quad \land \quad \mathrm{Outcome}_{\mathrm{System}}(n) \in D_{\mathrm{critical}}

## Forced Registration  [forced-action]
### 1. Absolute State Blocking
To identify the coercive nature of the interface flow, we define$S_{\mathrm{intent}}$as the initial user state (e.g., viewing a cart) and$S_{\mathrm{terminal}}$as the desired completion state (e.g., order confirmed). We contrast these with$S_{\mathrm{auth}}$, a state requiring explicit user registration and authentication. The feature triggers if the system algorithmically blocks all direct transition paths from intent to completion, routing every possible interaction graph through the authentication node. This ensures that the user cannot reach their objective without first yielding to the registration requirement:
FORMULA: \forall \pi \in \mathrm{Paths}(S_{\mathrm{intent}} \to S_{\mathrm{terminal}}) : S_{\mathrm{auth}} \in \pi

### 2. Visual Degradation of the Guest Checkout Pathway
To establish a visual baseline for Forced Registration, the algorithm extracts the “Continue as Guest” or “Skip Registration” link$N_{\mathrm{guest}}$and compares its visual rendering against the primary registration call-to-action$N_{\mathrm{register}}$. The feature triggers if the guest pathway is rendered as a text-only hyperlink while the registration button occupies a high-contrast, large-area filled button, quantified as a visual-weight ratio below$\tau_{\mathrm{guest\_visibility}}$:
FORMULA: \frac{W(N_{\mathrm{guest}})}{W(N_{\mathrm{register}})} < \tau_{\mathrm{guest\_visibility}}

### 3. Semantic Framing of the Guest-Checkout Option
To establish a semantic baseline for Forced Registration, the algorithm analyzes the text label of the guest-checkout or skip-registration pathway. The feature triggers if the label employs diminutive or deterring language—“Continue without benefits,” “Skip for now (you'll miss out)”—that semantically frames the user-favorable choice as a loss, quantified by a negative sentiment score below$\tau_{\mathrm{guest\_sent}}$:
FORMULA: \mathrm{Sent}(L(N_{\mathrm{guest}})) < \tau_{\mathrm{guest\_sent}}

## Social Pyramid  [forced-action]
### 1. Referral-Gated Progression
To identify the coercive gating of features, we define$U_{\mathrm{core}}$as a locked core utility of the platform. We track$R_{\mathrm{user}}$as the set of new, unique accounts successfully registered via the user's specific referral link, and$k$as the hardcoded recruitment threshold. The feature triggers if the system algorithmically blocks access to the utility until the cardinality of the referral set meets or exceeds the threshold. This conditional access restriction compels the user to choose between losing access or indiscriminately broadcasting to their peer network:
FORMULA: \mathrm{Access}(U_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad |R_{\mathrm{user}}| < k

### 2. Visual Prominence of Referral-Progress Gamification
To establish a visual baseline for Social Pyramid, the algorithm scans for gamified progress indicators—progress bars, tier-badges, referral counters—associated with invite-N-friends mechanics. The feature triggers if such indicators occupy a viewport area fraction exceeding$\tau_{\mathrm{gamification}}$, indicating that recruitment mechanics have been visually elevated to a core interface function rather than a secondary feature:
FORMULA: \frac{A(N_{\mathrm{referral\_progress}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{gamification}}

### 3. Semantic Escalation of Referral-Reward Language
To establish a semantic baseline for Social Pyramid, the algorithm tracks the semantic framing of referral incentives across progressive tiers. The feature triggers if reward descriptions escalate in hyperbolic language—“unlock exclusive,” “earn premium status,” “become a VIP”—at a semantic-intensity growth rate exceeding linear progression, indicating that the linguistic framing of rewards follows an exponential incentivization curve characteristic of pyramid-recruitment structures:
FORMULA: \frac{\Delta \mathrm{Intensity}(\mathrm{Reward}_n)}{\Delta \mathrm{Intensity}(\mathrm{Reward}_{n-1})} > \tau_{\mathrm{escalation}}

## Granting and Interaction  [forced-action]
### 1. Interaction Gating
To identify the coercive fusion of utility and data access, we define$I_{\mathrm{core}}$as the primary set of interactions required to utilize the application's core functionality. We monitor$P_{\mathrm{requested}}$, a system-level permission or data-access grant, and apply a function$\mathrm{Dep}(I, P)$to evaluate if the interaction technically requires that permission to execute. The feature triggers if the interface algorithmically blocks all access to core interactions until the permission is explicitly granted, despite the mathematical absence of a functional dependency:
FORMULA: \mathrm{State}(I_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{given} \quad (P_{\mathrm{requested}} = \mathrm{False} \quad \land \quad \mathrm{Dep}(I_{\mathrm{core}}, P_{\mathrm{requested}}) = \emptyset)

### 2. Asynchronous Overlay Misdirection
A particularly coercive tactic involves intercepting user momentum to manufacture \"accidental\" consent. We define$B_{\mathrm{benign}}$as a high-engagement, visually prominent node and$M_{\mathrm{system\_prompt}}$as the native operating system modal. By measuring the spatial coordinates$(x, y)$of the touch event at timestamp$t_{\mathrm{interaction}}$, the algorithm detects misdirection. The feature triggers if the application intentionally injects the system prompt into the exact spatial coordinates of the benign node milliseconds before the interaction, converting the user's original intent into an involuntary permission grant:
FORMULA: \mathrm{Pos}(M_{\mathrm{system\_prompt}}, t) \approx \mathrm{Pos}(B_{\mathrm{benign}}, t) \quad \text{as} \quad t \to t_{\mathrm{interaction}}

### 3. Semantic Scope Creep in Permission Requests
To establish a semantic baseline for Granting and Interaction, the algorithm compares the initial permission-request text against the actual permissions enumerated in the subsequent browser API call or manifest. The feature triggers if the natural-language request mentions only a subset of the permissions actually requested—e.g., asking to “access your camera for video calls” while also requesting microphone and location access—quantified as a semantic-disclosure gap$\Delta_{\mathrm{perms}}$:
FORMULA: |\mathrm{Perms}_{\mathrm{actual}} \setminus \mathrm{Perms}_{\mathrm{disclosed}}| > 0

## Pay-To-Play  [forced-action]
### 1. Exponential Friction and Paid Bypass
To identify the manufacture of artificial inconvenience, we define$E_{\mathrm{free}}(L_i)$as the required effort—measured in time or repetitive tasks—to progress through stage$L_i$without spending currency. We contrast this with$E_{\mathrm{paid}}(L_i)$, the effort required following a fiat transaction$T_{\mathrm{usd}}$. The feature triggers if the system algorithmically scales the free effort exponentially to induce frustration ($c^i$), while the paid bypass instantly reduces friction to a trivial constant, effectively monetizing the user's time as a captive resource:
FORMULA: E_{\mathrm{free}}(L_i) \propto c^i \quad (c > 1) \quad \land \quad E_{\mathrm{paid}}(L_i) = \mathcal{O}(1)

### 2. Visual Dominance of Payment-Unlock Overlays
To establish a visual baseline for Pay-To-Play, the algorithm detects locked-content regions$C_{\mathrm{locked}}$and their associated unlock-prompt overlays$O_{\mathrm{unlock}}$. The feature triggers if the payment prompt overlay occludes more than a fraction$\tau_{\mathrm{occlusion}}$of the viewport or if its dismiss affordance is below WCAG minimum touch-target size, creating a paywall that visually dominates the user's field of interaction:
FORMULA: \frac{A(O_{\mathrm{unlock}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{occlusion}} \quad \lor \quad A(N_{\mathrm{dismiss}}) < 44 \times 44

### 3. Semantic Framing of Payment as Unlock
To establish a semantic baseline for Pay-To-Play, the algorithm inspects the lexical framing of payment prompts. The feature triggers if the interface frames a required payment as an “unlock,” “discovery,” or “enhancement” rather than as a purchase or transaction, using semantic reframing to dissociate the monetary cost from the action and reduce spending inhibition:
FORMULA: \mathrm{Frame}(T_{\mathrm{payment}}) \in \{\text{Unlock}, \text{Discover}, \text{Enhance}\} \quad \land \quad \mathrm{Frame}(T_{\mathrm{payment}}) \neq \mathrm{Transaction}

## Grinding  [forced-action]
### 1. Exponential Effort Scaling
To identify the manufacture of artificial tedium, we define$E(L_i \to L_{i+1})$as the interaction effort—measured in hours or repetitive tasks—required to transition between progression states. We contrast this with$V(L_{i+1})$, the objective utility or narrative value gained by reaching the new state. The feature triggers if the application algorithmically enforces an exponential or severe polynomial scaling of required effort, while the corresponding value of the reward scales only linearly or sub-linearly. This creates a mathematical \"wall\" designed to exhaust the user's patience:
FORMULA: E(L_i \to L_{i+1}) \propto c^i \quad (c > 1) \quad \land \quad V(L_{i+1}) \approx V(L_i) + k

### 2. Visual Diminishing-Returns Feedback Loop
To establish a visual baseline for Grinding, the algorithm monitors the incremental visual progress feedback$\Delta P_{\mathrm{visual}}$per user action over a sequence of$k$repeated interactions. The feature triggers if the per-action visual-reward delta decays exponentially—$\Delta P_i \approx \Delta P_0 \cdot e^{-\lambda i}$—indicating that the interface deliberately attenuates positive feedback to compel extended repetitive engagement:
FORMULA: \frac{\Delta P_{k}}{\Delta P_{1}} < e^{-\lambda(k-1)} \quad \land \quad \frac{d^2 P}{di^2} < 0

### 3. Semantic Attenuation of Progress-Milestone Language
To establish a semantic baseline for Grinding, the algorithm monitors the semantic content of progress-feedback messages over a grinding session of$n$actions. The feature triggers if milestone-acknowledgment language (“Great job!,” “You're halfway there!”) appears at exponentially increasing action intervals—the semantic reinforcement schedule decays while the action requirement grows—mathematically described by a widening gap function$g(i)$:
FORMULA: \Delta a_i = \mathrm{Pos}(\mathrm{Milestone}_{i}) - \mathrm{Pos}(\mathrm{Milestone}_{i-1}) \quad \land \quad \frac{d\Delta a}{di} > 0

## Playing By Appointment  [forced-action]
### 1. Temporal Gating
To identify the removal of user-paced progression, we define$A_{\mathrm{core}}$as a primary interaction and$C_{\mathrm{energy}}(t)$as the user's available stamina or action currency. We establish$\tau_{\mathrm{refill}}$as the hardcoded real-world time delay required to regenerate one unit of currency. The feature triggers if the system algorithmically blocks the core action due to resource depletion, forcing the user to wait for a specific real-world appointment time to resume interaction, regardless of in-app skill or effort:
FORMULA: \mathrm{State}(A_{\mathrm{core}}) = \mathrm{Blocked} \quad \text{until} \quad t \ge t_{\mathrm{depletion}} + \tau_{\mathrm{refill}}

### 2. Visual Prominence of Temporal-Gating Indicators
To establish a visual baseline for Playing By Appointment, the algorithm identifies countdown timers, “available at” labels, and time-window restrictions$N_{\mathrm{temporal}}$that gate content access. The feature triggers if these temporal-gating elements are rendered at a viewport-dominant scale or with high-saturation urgency colors, transforming an artificial schedule constraint into a central visual event:
FORMULA: \frac{A(N_{\mathrm{temporal}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{appointment}} \quad \lor \quad \mathrm{Saturation}(N_{\mathrm{temporal}}) > 0.8

### 3. Semantic Urgency Encoding in Temporal-Gating Messages
To establish a semantic baseline for Playing By Appointment, the algorithm analyzes the sentiment and urgency scores of time-gating messages—“Come back at 3 PM,” “New content drops in 2 hours.” The feature triggers if temporal-gate messages carry an urgency sentiment score exceeding$\tau_{\mathrm{appointment\_urgency}}$while also embedding scarcity language (“limited window,” “don't be late”), creating compound semantic pressure:
FORMULA: \mathrm{Urgency}(T_{\mathrm{temporal}}) > \tau_{\mathrm{appointment\_urgency}} \quad \land \quad T_{\mathrm{temporal}} \cap L_{\mathrm{scarcity}} \neq \emptyset

## Watch Ads To Unlock Features Or Get Rewards  [forced-action]
### 1. Attention as Transactional Currency
To identify the commodification of user time, we define$R_{\mathrm{target}}$as the desired reward or locked feature and$V_{\mathrm{ad}}$as a video advertisement with a strictly defined duration$\Delta t_{\mathrm{ad}}$. We monitor$E_{\mathrm{playback}}(t)$, a boolean function evaluating whether the video is actively playing and fully visible. The feature triggers if the application algorithmically demands the uninterrupted completion of the ad to generate a transactional token, treating verified attention time as the sole accepted currency for the unlock:
FORMULA: \int_{0}^{\Delta t_{\mathrm{ad}}} E_{\mathrm{playback}}(t) \, dt = \Delta t_{\mathrm{ad}} \implies \mathrm{State}(R_{\mathrm{target}}) \to \mathrm{Unlocked}

### 2. Visual Mismatch Between Reward Progress Display and Actual Progress
To establish a visual baseline for Watch Ads To Unlock Features, the algorithm compares the rendered progress indicator$P_{\mathrm{visual}}$(e.g., a progress bar shown to the user) against the actual reward-earned ratio$P_{\mathrm{actual}} = \frac{\text{ads watched}}{\text{ads required}}$. The feature triggers if the visual representation overstates progress beyond a tolerance$\tau_{\mathrm{mislead}}$, creating a false sense of near-completion to sustain ad-watching behavior:
FORMULA: P_{\mathrm{visual}} - P_{\mathrm{actual}} > \tau_{\mathrm{mislead}}

### 3. Semantic Inflation of Reward Value
To establish a semantic baseline for Watch Ads To Unlock Features, the algorithm compares the semantic framing of the advertised reward against its actual in-application utility. The feature triggers if the reward's descriptive language employs superlative or hyperbolic modifiers (“amazing,” “exclusive,” “premium”) while the actual reward has an objectively quantifiable low value (e.g., a cosmetic item with zero functional impact), quantified as a hype-utility divergence:
FORMULA: \mathrm{Hyperbole}(T_{\mathrm{reward}}) - \mathrm{Utility}(R_{\mathrm{actual}}) > \tau_{\mathrm{hype\_gap}}

## Pay To Avoid  [forced-action]
### 1. Artificial State Degradation
To identify the intentional suppression of software utility, we define$U_{\mathrm{system}}$as the objective, unthrottled performance capability of the software and$U_{\mathrm{default}}$as the baseline utility provided to the free user. We monitor$D_{\mathrm{artificial}}$as the set of deliberately injected friction elements, such as watermarks or speed throttling. The feature triggers if the application algorithmically suppresses the user's experience far below its technical capacity by intentionally injecting these degradation vectors into the default state:
FORMULA: U_{\mathrm{default}} = U_{\mathrm{system}} - D_{\mathrm{artificial}} \quad \land \quad U_{\mathrm{default}} \ll U_{\mathrm{system}}

### 2. Visual Occupancy of the Pain-Point Element
To establish a visual baseline for Pay To Avoid, the algorithm identifies the friction element$N_{\mathrm{pain}}$—a countdown timer, a full-screen ad, or a forced waiting screen—that the user can pay to remove. The feature triggers if this pain-point element occupies more than a fraction$\tau_{\mathrm{pain}}$of the interactive viewport, maximizing discomfort to coerce payment for relief:
FORMULA: \frac{A(N_{\mathrm{pain}})}{A_{\mathrm{viewport}}} > \tau_{\mathrm{pain}}

### 3. Pain-Point Amplification
The system frequently weaponizes the user's growing frustration to force capitulation. We define$\lambda_{\mathrm{friction}}(t)$as the severity of the injected friction—such as the frequency of unskippable ads or the duration of artificial delays—and$N_{\mathrm{prompt}}$as the interface modal demanding payment to \"remove\" the annoyance. The feature triggers if the system dynamically scales the severity of the degradation the longer the user resists paying, ensuring that the probability of a payment prompt$P(N_{\mathrm{prompt}})$becomes absolute as friction intensity increases:
FORMULA: \frac{d}{dt} \lambda_{\mathrm{friction}}(t) > 0 \quad \implies \quad P(N_{\mathrm{prompt}} \mid \lambda_{\mathrm{friction}}) \approx 1

## Automating The User Away  [forced-action]
### 1. Autonomous Action Execution
To identify the removal of user-led intent, we define$A_{\mathrm{critical}}$as a primary, state-altering action (e.g., loading a new media asset or initiating a download). We contrast this with$E_{\mathrm{user}}$, an explicit affirmative interaction event. The feature triggers if the system systematically executes the critical action entirely independent of user intent, relying solely on an internal temporal or state-based threshold$\tau_{\mathrm{system}}$. This formalizes the transition from active tool to autonomous agent:
FORMULA: A_{\mathrm{critical}} = \mathrm{Executed} \quad \text{given} \quad E_{\mathrm{user}} = \emptyset \quad \land \quad t \ge \tau_{\mathrm{system}}

### 2. Omission of the Interrupt Vector
The hostility of an automated system is defined by the window of opportunity it grants the user to intervene. We define$\Delta t_{\mathrm{warning}}$as the time between the system signaling intent and actual execution, and$B_{\mathrm{cancel}}$as the UI node allowing the user to abort the action. By establishing$\tau_{\mathrm{reaction}}$as the baseline human biological reaction time ($\approx 2.0$s for UI tasks), the algorithm detects predatory timing. The feature triggers if the interface omits the cancellation affordance or shrinks the warning window below the biological threshold, making manual interception mathematically improbable:
FORMULA: B_{\mathrm{cancel}} \notin \mathrm{DOM}(t) \quad \lor \quad \Delta t_{\mathrm{warning}} < \tau_{\mathrm{reaction}}

### 3. Semantic Speed of Consent-Timing Language
To establish a semantic baseline for Automating The User Away, the algorithm evaluates whether the interface provides semantically adequate processing time for consent decisions. The feature triggers if a time-limited consent prompt (“This action will proceed in 5 seconds”) uses a countdown expressed in seconds where$t_{\mathrm{window}}$falls below the human visual-reaction-time baseline of approximately 2.0 s, semantically manufacturing consent through temporal coercion:
FORMULA: t_{\mathrm{window}} < 2.0 \quad \land \quad \mathrm{SemanticType}(T_{\mathrm{prompt}}) = \mathrm{TimedConsent}

## Parasocial Pressure  [forced-action]
### 1. Manufactured Livelihood Dependency
A fundamental deceptive tactic involves framing transactions as acute rescues of a creator's well-being rather than commercial exchanges. We define$T_{\mathrm{fiat}}$as the requested transaction and$M_{\mathrm{pitch}}$as the justification messaging. Let$I_{\mathrm{creator}}$represent the creator’s existential continuity on the platform. The feature triggers if the platform asserts that$T_{\mathrm{fiat}} = 0$will lead to the failure of$I_{\mathrm{creator}}$, directly exploiting the user's empathy to sustain algorithmic or financial engagement:
FORMULA: T_{\mathrm{fiat}} = 0 \implies \mathrm{State}(I_{\mathrm{creator}}) \to \mathrm{Failure} \quad \text{asserted within} \quad M_{\mathrm{pitch}}

### 2. Visual Proximity of Anthropomorphic Imagery to Action Prompts
To establish a visual baseline for Parasocial Pressure, the algorithm detects face-like or mascot imagery$I_{\mathrm{face}}$(via the vision-language model's face detection or anthropomorphic classification) and measures the spatial distance$d$to the nearest action-prompt node$N_{\mathrm{prompt}}$. The feature triggers if a face image is rendered within a parasocial-intimacy radius$\tau_{\mathrm{social}}$of a decision point, weaponizing the human instinct for social compliance:
FORMULA: \min_{i \in I_{\mathrm{face}}} d_{\mathrm{spatial}}(i, N_{\mathrm{prompt}}) < \tau_{\mathrm{social}} \quad \land \quad \frac{A(i)}{A_{\mathrm{viewport}}} > 0.05

### 3. Emotional Asymmetry
To identify the weaponization of artificial guilt, we define$A_{\mathrm{mascot}}$as the representation of the parasocial entity and$E_{\mathrm{user}}$as the user's intent to disengage or decline an offer. We monitor$V_{\mathrm{emotion}}(A)$, the expressed emotional valence of the entity (bounded between$-1$for extreme distress and$+1$for joy). The feature triggers if the interface algorithmically mutates the entity's emotional state toward a severe negative extreme strictly as a response to the user's refusal, engineering a state of \"Confirmshaming\" through visual distress:
FORMULA: E_{\mathrm{user}} = \mathrm{Refusal} \implies \frac{d}{dt} V_{\mathrm{emotion}}(A_{\mathrm{mascot}}) \to -1

## Encouraging Anti-Social Behavior  [forced-action]
### 1. Reward-Coupled Social Externality
To identify the subsidization of user success through social extraction, we define$A_{\mathrm{antisocial}}$as an action directed at non-consenting third parties (e.g., unsolicited mass-invites) and$V_{\mathrm{reward}}$as the in-app value granted to the initiating user. Let$E_{\mathrm{externality}}$represent the negative social cost—such as notification fatigue—borne by the target network. The feature triggers if the platform structurally hinges progression on the generation of these negative externalities, mathematically decoupling user benefit from network health:
FORMULA: A_{\mathrm{antisocial}} \implies (V_{\mathrm{reward}} > 0 \quad \land \quad E_{\mathrm{externality}} \gg 0)

### 2. Visual Framing of Competitive Antagonism
To establish a visual baseline for Encouraging Anti-Social Behavior, the algorithm detects competitive-visualization layouts—side-by-side scoreboards, “You vs.\ Them” splits, or leaderboard tables with the user's row highlighted in a confrontational color. The feature triggers if the interface spatial layout employs a binary oppositional split ($\mathrm{LayoutType} = \mathrm{Competitive}$) with the user's avatar or score rendered in direct visual opposition to another entity:
FORMULA: \mathrm{LayoutType}(C_{\mathrm{container}}) = \mathrm{Competitive} \quad \land \quad \mathrm{SplitRatio} \approx 0.5

### 3. Algorithmic Amplification of Outrage
Deceptive systems often utilize operant conditioning to erode pro-social norms. We define$M_{\mathrm{content}}$as user-generated content and$P_{\mathrm{polarity}}(M)$as an NLP-derived metric measuring its hostility or capacity to induce outrage. The feature triggers if the system's distribution algorithm assigns higher visibility ($V_{\mathrm{visibility}}$) to highly polarized content. This creates a systemic incentive for hostility, where social capital is optimized through the abandonment of civil discourse:
FORMULA: V_{\mathrm{visibility}}(M) \propto P_{\mathrm{polarity}}(M) \quad \implies \quad \text{Systemic Incentive for Hostility}

## Addictive Design  [attention-manipulation]
### 1. Infinite Frictionless Continuation
To model the elimination of physical boundaries, we define$Y_{\mathrm{scroll}}(t)$as the user's vertical scroll position and$Y_{\mathrm{max}}(t)$as the total renderable height of the document$N_{\mathrm{document}}$. We establish$\tau_{\mathrm{buffer}}$as a spatial threshold representing the distance to the apparent bottom of the page. The feature triggers if the interface algorithmically prevents the user from reaching a terminal state by executing a background asynchronous event$E_{\mathrm{append}}$that fetches and injects new content nodes before the natural stopping point is perceived. This creates a mathematically infinite document where the total height approaches infinity over time:
FORMULA: Y_{\mathrm{max}}(t) - Y_{\mathrm{scroll}}(t) < \tau_{\mathrm{buffer}} \quad \implies \quad E_{\mathrm{append}} = \mathrm{True}
GIVEN: \lim_{t \to \infty} Y_{\mathrm{max}}(t) = \infty

### 2. Eradication of Natural Stopping Cues
A fundamental deceptive tactic involves the systematic removal of visual signals that allow for cognitive closure. We define$E_{\mathrm{stop}}$as the set of traditional visual elements that signal content completion—such as pagination controls, “End of Results” markers, section dividers, or scroll position indicators. For each element$e \in E_{\mathrm{stop}}$, the algorithm evaluates its bounding box visibility within the current viewport: the element must be either absent from the rendered layout entirely ($\mathrm{Visible}(e, t) = \mathrm{False}$) or rendered at a scale or contrast that renders it effectively imperceptible. The feature triggers if the interface suppresses all visual completion cues while the user's session duration exceeds a hyper-engagement threshold$\tau_{\mathrm{hyper\_engagement}}$:
FORMULA: \forall e \in E_{\mathrm{stop}} : \mathrm{Visible}(e, t) = \mathrm{False} \quad \lor \quad \frac{A(e)}{A_{\mathrm{viewport}}} < \tau_{\mathrm{min\_visible}} \quad \lor \quad \mathrm{CR}(e, L_{\mathrm{bg}}) < 3.0
GIVEN: T_{\mathrm{session}} > \tau_{\mathrm{hyper\_engagement}}

### 3. Semantic Reinforcement-Trigger Lexicon Density
To establish a semantic baseline for Addictive Design, the algorithm scans the interface for operant-conditioning language patterns—“streak,” “level up,” “claim reward,” “daily bonus,” “spin again.” The feature triggers if reinforcement-schedule lexemes appear at a density exceeding$\tau_{\mathrm{addiction}}$per visible text area, indicating that the interface linguistically structures variable-reward loops to maximize compulsive re-engagement:
FORMULA: \frac{|\{w \in T : w \in L_{\mathrm{reinforcement}}\}|}{A_{\mathrm{viewport}}} > \tau_{\mathrm{addiction}}

## Infinite Scrolling  [attention-manipulation]
### 1. Autonomous Content Injection
To identify the removal of explicit user choice, we define$Y_{\mathrm{viewport}}$as the bottom vertical coordinate of the user's current screen and$Y_{\mathrm{document\_end}}$as the absolute vertical coordinate of the content container's end. We establish$\tau_{\mathrm{trigger}}$as a predefined spatial threshold (e.g.,$800\mathrm{px}$before the end of the document). The feature triggers if the interface algorithmically forces the continuation of content via an asynchronous event$E_{\mathrm{fetch}}$without requiring an affirmative user action, such as a “Load More” button, whenever the viewport crosses the spatial threshold:
FORMULA: Y_{\mathrm{document\_end}} - Y_{\mathrm{viewport}} \leq \tau_{\mathrm{trigger}} \quad \implies \quad E_{\mathrm{fetch}}() = \mathrm{True}

### 2. The Unreachable Footer
A fundamental deceptive tactic involves the literal evasion of utility links. We define$N_{\mathrm{footer}}$as the semantic <footer> node and$\mathrm{Pos}_{y}(N_{\mathrm{footer}}, t)$as its absolute vertical Y-coordinate at time$t$. By calculating the distance$d$between the viewport and the footer relative to the user's scroll velocity$v_{\mathrm{scroll}}$, the algorithm detects kinetic displacement. The feature triggers if the system continuously mutates the DOM to push the terminal node further down the Y-axis at a rate equal to or faster than the user's scroll velocity, effectively preventing any physical interaction with terminal information:
FORMULA: v_{\mathrm{scroll}} > 0 \quad \implies \quad \frac{d}{dt} \mathrm{Pos}_{y}(N_{\mathrm{footer}}, t) \geq v_{\mathrm{scroll}}
GIVEN: \lim_{t \to \infty} d(Y_{\mathrm{viewport}}, \mathrm{Pos}_{y}(N_{\mathrm{footer}})) > 0

### 3. Semantic Attenuation of Content Boundaries
To establish a semantic baseline for Infinite Scrolling, the algorithm detects the absence of pagination or content-termination language—“page 1 of N,” “end of results,” “no more items.” The feature triggers if a scrollable content feed lacks any semantic boundary marker within the rendered text, indicating that the interface deliberately removes linguistic cues of completion to encourage endless consumption:
FORMULA: \neg\exists n \in N_{\mathrm{feed}} : \mathrm{Match}(T(n), \mathrm{Pattern}_{\mathrm{boundary}}) = \mathrm{True}

## Pull To Refresh (Variable-Reward Trap)  [attention-manipulation]
### 1. Kinesthetic Resistance and Action Commitment
To model the physical investment required by the interface, we define$\Delta Y_{\mathrm{touch}}(t)$as the continuous downward vertical displacement of the user's touch event at the top of the scroll container. We introduce$R_{\mathrm{elastic}}(\Delta Y)$, a programmed friction function that non-linearly slows visual displacement, requiring sustained user effort. The feature mirrors a physical lever mechanism by requiring the user to apply deliberate tension against the simulated physics until the threshold$\tau_{\mathrm{commit}}$is released or “snapped,” triggering the refresh event$E_{\mathrm{refresh}}$. This structural requirement ensures a high level of physical engagement before the reward is revealed:
FORMULA: \Delta Y_{\mathrm{touch}}(t) \geq \tau_{\mathrm{commit}} \quad \land \quad R_{\mathrm{elastic}} > 0 \quad \implies \quad E_{\mathrm{refresh}}() = \mathrm{True}

### 2. Artificial Anticipation Injection
A fundamental deceptive tactic involves the decoupling of animation from technical necessity to build psychological suspense. We define$\Delta t_{\mathrm{network}}$as the actual time required for the backend API to resolve the data payload and$\Delta t_{\mathrm{animation}}$as the hardcoded minimum duration of the visual loading indicator. The feature triggers if the interface artificially delays the content delivery beyond actual network latency. By maintaining the spinning state for a duration exceeding a psychological suspense threshold$\tau_{\mathrm{suspense}}$(typically 1.0 to 2.5 seconds), the system maximizes the user's anticipation before the payload reveal:
FORMULA: \Delta t_{\mathrm{animation}} \gg \Delta t_{\mathrm{network}} \quad \land \quad \Delta t_{\mathrm{animation}} \geq \tau_{\mathrm{suspense}}

### 3. Semantic Variability of Refresh-Outcome Messaging
To establish a semantic baseline for Pull-To-Refresh Variable Reward Trap, the algorithm monitors the textual content of refresh-feedback messages over$k$consecutive refresh actions. The feature triggers if the semantic content of feedback messages follows a variable-ratio schedule—the user receives novel, high-valence content on an unpredictable subset of refreshes—quantified by a semantic-novelty variance$\sigma^2_{\mathrm{novelty}}$exceeding$\tau_{\mathrm{slot\_machine}}$, indicating a slot-machine reinforcement schedule:
FORMULA: \sigma^2(\{\mathrm{Novelty}(T_i) : i = 1 \ldots k\}) > \tau_{\mathrm{slot\_machine}}

## Countdown On Ads  [attention-manipulation]
### 1. Temporal Gating of Navigational Agency
To identify the removal of navigational control, we define$B_{\mathrm{skip}}$as the interactive node required to dismiss the advertisement and$t_{\mathrm{active}}$as the continuous time elapsed since the ad entered the viewport. We establish$\tau_{\mathrm{lock}}$as the hardcoded mandatory wait time (e.g., 15 seconds). The feature triggers if the system algorithmically disables or intercepts all user interaction intended to dismiss the overlay until the temporal threshold is strictly met, proving the interface is prioritizing ad-exposure over user-intent:
FORMULA: \mathrm{State}(B_{\mathrm{skip}}, t_{\mathrm{active}}) = \mathrm{Disabled} \quad \text{given} \quad t_{\mathrm{active}} < \tau_{\mathrm{lock}}

### 2. Dynamic Affordance Injection
A fundamental deceptive tactic involves the total suppression of exit indicators to prevent the user from planning their departure. We define$\mathrm{DOM}(t)$as the active render tree at time$t$and$N_{\mathrm{close}}$as the specific semantic node (e.g., an `X` icon) that facilitates the exit. The feature triggers if the system completely omits the exit node from the interface until the exact moment the countdown expires. This forces the user to remain in a state of visual uncertainty until the system-defined threshold is reached:
FORMULA: N_{\mathrm{close}} \notin \mathrm{DOM}(t) \quad \forall t < \tau_{\mathrm{lock}} \quad \land \quad N_{\mathrm{close}} \in \mathrm{DOM}(\tau_{\mathrm{lock}})

### 3. Semantic Framing of Ad-Watching as Exchange
To establish a semantic baseline for Countdown On Ads, the algorithm assesses whether the ad-viewing experience is framed as a quid-pro-quo exchange. The feature triggers if the interface semantically frames the forced ad as a “reward,” “offer,” or “gift” rather than as an advertising interruption, recharacterizing a mandatory viewing obligation as a user benefit:
FORMULA: \mathrm{Frame}(T_{\mathrm{ad\_context}}) \in \{\text{Reward}, \text{Offer}, \text{Bonus}\} \quad \land \quad \mathrm{UserAction} = \mathrm{ForcedViewing}

## Auto-Play  [attention-manipulation]
### 1. Autonomous Media Execution
To identify the removal of user-led intent, we define$M_{\mathrm{media}}$as a continuous audiovisual asset and$S_{\mathrm{play}}(M)$as its active playback state. We contrast this with$E_{\mathrm{intent}}$, a discrete user action specifically targeting the play affordance. The feature triggers if the application algorithmically forces the playback state to active solely based on the spatial rendering$\mathrm{Intersection}(M_{\mathrm{media}}, \mathrm{Viewport})$exceeding a visibility threshold$\tau_{\mathrm{visible}}$. This ensures media consumption begins as a side effect of navigation rather than a result of intent:
FORMULA: S_{\mathrm{play}}(M_{\mathrm{media}}) = \mathrm{True} \quad \text{given} \quad E_{\mathrm{intent}} = \emptyset \quad \land \quad \mathrm{Intersection}(M_{\mathrm{media}}, \mathrm{Viewport}) > \tau_{\mathrm{visible}}

### 2. Affordance Suppression
The hostility of an auto-play system is exacerbated by inflating the friction required to regain control. We identify$B_{\mathrm{cancel}}$as the interactive UI node required to abort the auto-advance or pause the media. By evaluating the visual prominence$\mathrm{Visibility}(x)$and the interaction effort$\mathrm{Cost}(S_{\mathrm{play}} \to \mathrm{False})$, the algorithm detects suppression. The feature triggers if the system deliberately minimizes, hides, or delays the rendering of the cancellation node, artificially increasing the cognitive and motor effort required to stop the automation:
FORMULA: \mathrm{Visibility}(B_{\mathrm{cancel}}) \to 0 \quad \lor \quad \mathrm{Cost}(S_{\mathrm{play}} \to \mathrm{False}) \gg 1

### 3. Semantic Framing of Auto-Play as Content Continuation
To establish a semantic baseline for Auto-Play, the algorithm inspects the labeling of the auto-play mechanism. The feature triggers if the interface semantically frames automatic content playback as a “next episode,” “continue watching,” or “up next” feature without an explicit “autoplay enabled” disclosure, reframing an automatic action as user-initiated continuity:
FORMULA: \mathrm{Frame}(T_{\mathrm{autoplay}}) \in \{\text{Continuation}, \text{Next}\} \quad \land \quad \neg\exists \text{``autoplay''} \in T_{\mathrm{visible}}
