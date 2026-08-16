# Formal Ontology (part 4)

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
