# Formal Ontology (part 3)

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
