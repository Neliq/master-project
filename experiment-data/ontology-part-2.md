# Formal Ontology (part 2)

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
