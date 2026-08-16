# Formal Ontology (part 1)

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
