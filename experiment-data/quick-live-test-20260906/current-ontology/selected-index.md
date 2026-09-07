# Quick-test current ontology cards

This index contains only the ten cards used by the quick live-URL test.
The cards are copied byte-for-byte from Master-Thesis/ontology/cards.

| Website route | Pattern | Current card |
|---:|---|---|
| 1 | Immortal Accounts | `card-001-immortal-accounts.md` |

## Immortal Accounts

### DP-001-C1: Asymmetrical Navigational Depth
- Operational reading: Measured deletion path is longer than creation path
- Required atoms: ["The creation and deletion actions are identified from the same starting state.", "The shortest interaction path for both actions is observed or directly countable.", "The stated deletion/creation ratio exceeds the formula threshold."]
- UNKNOWN when: ["A path, action, or threshold is not exposed by the evidence."]
- Direct counterevidence: ["The measured deletion path is not longer than the creation path."]

### DP-001-C2: Visual Accessibility of Offboarding Vectors
- Operational reading: Deletion affordance is visually subordinate to creation affordance
- Required atoms: ["A deletion/offboarding affordance and a creation affordance are both identified in the same state.", "Their comparable visual areas are observed or measured.", "The ratio is below the stated threshold, using the same viewport and element-selection rule."]
- UNKNOWN when: ["One comparison affordance or its visual measurement is unavailable."]
- Direct counterevidence: ["The exit affordance has equal or greater comparable prominence."]

### DP-001-C3: Absolute Absence of Deletion Vectors
- Operational reading: No deletion vector in the complete inspected account scope
- Required atoms: ["The assigned evidence exposes the complete visible account-settings/profile scope being evaluated.", "The deletion-keyword set and equivalent labelled controls are absent from that complete visible scope."]
- UNKNOWN when: ["The visible account scope is partial, truncated, or not identifiable."]
- Direct counterevidence: ["A deletion, deactivation, close-account, or equivalent vector is present in the inspected scope."]

| 26 | Price Comparison Prevention | `card-026-price-comparison-prevention.md` |

## Price Comparison Prevention

### DP-004-C1: Fiat Decoupling
- Operational reading: A price is shown without an available fiat conversion
- Required atoms: ["A nonempty price token is visible in the complete relevant price scope.", "No fiat conversion function/label is present in that same scope."]
- UNKNOWN when: ["The relevant price scope or conversion affordances are incomplete."]
- Direct counterevidence: ["A direct fiat conversion is available and visible in the relevant scope."]

### DP-004-C2: Visual Suppression of Unit-Price Information
- Operational reading: Unit price is visually subordinate to the headline price
- Required atoms: ["Unit-price and headline-price nodes are identified in the same state.", "The same font-size/contrast measurements, or an explicit direct visual comparison with direction, are available for both nodes.", "The stated suppression relation is met; qualitative direction is acceptable only when both operands and direction are explicit."]
- UNKNOWN when: ["The unit/headline comparison or its direction is not exposed."]
- Direct counterevidence: ["Unit-price information meets the stated relative visibility threshold."]

### DP-004-C3: Semantic Omission of Comparison-Relevant Qualifiers
- Operational reading: Comparison-relevant qualifiers are absent from the rendered price
- Required atoms: ["The standard qualifier set for this price/product is known from the evidence.", "The rendered qualifier set is complete and comparable.", "Their intersection is empty."]
- UNKNOWN when: ["The standard qualifier set cannot be established from the evidence."]
- Direct counterevidence: ["At least one relevant qualifier is rendered."]

| 9 | Sneak Into Basket | `card-009-sneak-into-basket.md` |

## Sneak Into Basket

### DP-007-C1: Unprompted State Mutation
- Operational reading: An item appears in the cart without a matching user event
- Required atoms: ["The item is present in the cart/final checkout state.", "The item is absent from the set of explicitly selected items.", "The aligned event trace shows no user event that adds or selects that item."]
- UNKNOWN when: ["The cart state or user-event trace is incomplete."]
- Direct counterevidence: ["A matching explicit add/select event is observed for the item."]

### DP-007-C2: Visual Indistinguishability of Surcharged Items
- Operational reading: An identified injected item visually resembles legitimate cart items
- Required atoms: ["An injected/surcharged item has already been established by the relevant cart/event evidence.", "At least one legitimate comparison item is identified in the same state.", "The visual distance is below the stated camouflage threshold under the same feature representation."]
- UNKNOWN when: ["No legitimate comparator or measurable visual representation is available."]
- Direct counterevidence: ["The injected item is visually distinguished or the threshold is not met."]

### DP-007-C3: Semantic Obscuration of Injected Line Items
- Operational reading: An unconsented injected item is semantically presented as optional
- Required atoms: ["The line item is established as injected by the cart/event evidence.", "The item description entails optional add-on status.", "No explicit user consent event for that item is observed."]
- UNKNOWN when: ["Consent history or item identity is unavailable."]
- Direct counterevidence: ["An explicit user opt-in for the item is observed."]

| 28 | Conflicting Information | `card-028-conflicting-information.md` |

## Conflicting Information

### DP-012-C1: Structural Proximity of Contradictory Factual Nodes
- Operational reading: Two nearby factual propositions trigger only when their extracted truth conditions are explicitly mutually unsatisfiable within the same DOM scope.
- Required atoms: ["Two factual propositions are identified within the same named container.", "Their proposition representations are directly evaluated as mutually unsatisfiable.", "Their DOM distance is below the stated proximity threshold."]
- UNKNOWN when: ["The propositions, their truth conditions, or their proximity cannot be established."]
- Direct counterevidence: ["The propositions are jointly satisfiable or are not in the same relevant scope."]

### DP-012-C2: Semantic-Visual Mismatch
- Operational reading: A label--affordance mismatch triggers only when both semantic intent and the comparison affordance are directly observed as incompatible under a declared mapping.
- Required atoms: ["The interactive label and its affordance are identified in the same state.", "The intent and affordance mappings are explicitly defined and directly supported.", "The mapped sets have no compatible intersection."]
- UNKNOWN when: ["The mapping from color or visual affordance to action meaning is not explicit or directly supported."]
- Direct counterevidence: ["The label and affordance have a compatible interpretation under the declared mapping."]

### DP-012-C3: Mutually Exclusive Factual Claims
- Operational reading: Two claims trigger only when their extracted semantic constraints form an explicitly unsatisfiable conjunction in one informational container.
- Required atoms: ["Two truth-bearing claims are identified in the same container.", "Their extracted constraints are directly evaluated as unsatisfiable together."]
- UNKNOWN when: ["The claims or their semantic constraints are incomplete, ambiguous, or not directly evaluable."]
- Direct counterevidence: ["The claims are jointly satisfiable."]

| 32 | Persuasive Language | `card-032-persuasive-language.md` |

## Persuasive Language

### DP-018-C1: Structural Density of Event Listeners on Coercive Text Nodes
- Operational reading: Coercive text has greater event-listener density than neutral text
- Required atoms: ["Coercive and neutral comparison text nodes are identified.", "Event-listener counts are directly exposed for both nodes.", "The ratio exceeds the stated threshold."]
- UNKNOWN when: ["Event handlers are not exposed by the DOM/evidence bundle."]
- Direct counterevidence: ["The ratio does not exceed the threshold."]

### DP-018-C2: Visual Emphasis Asymmetry on Coercive Text
- Operational reading: Coercive text is more visually emphasized than neutral text
- Required atoms: ["Coercive and neutral comparison text nodes are identified in the same state.", "Font-weight and/or area measurements are comparable.", "At least one stated emphasis ratio exceeds threshold."]
- UNKNOWN when: ["The neutral comparator or CSS/area measurement is unavailable."]
- Direct counterevidence: ["No stated emphasis ratio is exceeded."]

### DP-018-C3: Jointly Satisfiable Claims (Counterevidence)
- Operational reading: Joint satisfiability is counterevidence to contradiction and cannot create a persuasive-language trigger.
- Required atoms: ["The relevant claims are identified in the same decision context.", "Their semantic relation is evaluated under the displayed context.", "The claims are jointly satisfiable."]
- UNKNOWN when: ["The propositions or their semantic relation cannot be established."]
- Direct counterevidence: ["The claims are mutually inconsistent or unsatisfiable."]

| 33 | Cuteness | `card-033-cuteness.md` |

## Cuteness

### DP-021-C1: Structural Conditional Injection of Affective Assets
- Operational reading: Affective assets appear in cancellation but not onboarding DOM
- Required atoms: ["The onboarding and cancellation states are identified and aligned.", "The affective asset is absent from onboarding DOM and present in cancellation DOM."]
- UNKNOWN when: ["The relevant states or DOM asset identity cannot be matched."]
- Direct counterevidence: ["The asset is present in both states or absent from both."]

### DP-021-C2: Context-Dependent Image Injection
- Operational reading: Affective image appears only in the cancellation context
- Required atoms: ["The onboarding and cancellation image sets are identified and aligned.", "The affective image is absent from onboarding and present in cancellation.", "The image identity is matched across the two states."]
- UNKNOWN when: ["Image identity or state alignment is uncertain."]
- Direct counterevidence: ["The image is not context-dependent under the stated comparison."]

### DP-021-C3: Semantic Pairing of Guilt
- Operational reading: Guilt-inducing text is spatially paired with an affective image
- Required atoms: ["Affect score exceeds the threshold for the relevant text.", "The affective text and image are spatially within the stated proximity."]
- UNKNOWN when: ["Affect score or spatial relationship is not available."]
- Direct counterevidence: ["The text is neutral or not spatially paired with the image."]

| 58 | Addictive Design | `card-058-addictive-design.md` |

## Addictive Design

### DP-031-C1: Infinite Frictionless Continuation
- Operational reading: Near-end scrolling triggers observed content append
- Required atoms: ["The evidence shows the pattern-specific scroll/feed context near a document boundary.", "A fetch/append transition is observed after that near-end state, with repeated continuation or no stable end boundary."]
- UNKNOWN when: ["The evidence contains only a reward/play loop, or lacks a scroll/feed boundary and append transition."]
- Direct counterevidence: ["A stable end boundary is observed, or the interface is a bounded reward/play loop without scroll/feed continuation."]

### DP-031-C2: Eradication of Natural Stopping Cues
- Operational reading: Stopping cues are absent or below threshold in the inspected state
- Required atoms: ["The relevant stopping-cue set is defined for the inspected interface.", "Every relevant cue fails visibility/area/contrast in the same state(s)."]
- UNKNOWN when: ["The complete stopping-cue set or session-duration claim is unavailable."]
- Direct counterevidence: ["A clear stopping cue is visible at the stated threshold."]

### DP-031-C3: Semantic Reinforcement-Trigger Lexicon Density
- Operational reading: Reinforcement lexemes exceed the stated density in the viewport
- Required atoms: ["The relevant viewport text and reinforcement lexicon are available.", "The stated normalized density exceeds threshold."]
- UNKNOWN when: ["The viewport text or lexicon denominator is incomplete."]
- Direct counterevidence: ["The density does not exceed the threshold."]

| 16 | Friend Spam | `card-016-friend-spam.md` |

## Friend Spam

### DP-039-C1: Feedforward Intent vs. Payload Execution
- Operational reading: Read-only contact intent leads to observed outbound messaging
- Required atoms: ["The prompt's intended action is read-only matching/searching.", "An outbound message/broadcast action is directly observed after the access event.", "The transition from access to outbound action is evidenced in the aligned state/event record."]
- UNKNOWN when: ["Backend execution or the access-to-message transition is not observable."]
- Direct counterevidence: ["Only read-only matching occurs and no outbound message action is observed."]

### DP-039-C2: Absence of Granular Selection
- Operational reading: Messages are sent to the contact set without granular selection
- Required atoms: ["The selection state shows zero explicitly selected contacts.", "The dispatched-message set is observed and approximately covers the extracted contact set.", "The dispatch occurs without an affirmative granular-selection event."]
- UNKNOWN when: ["The extracted contact set or dispatched-message set is not exposed."]
- Direct counterevidence: ["The user selects recipients or the dispatch set is limited to selected recipients."]

### DP-039-C3: Sender Identity Spoofing
- Operational reading: Corporate outbound message uses the user's identity as sender alias
- Required atoms: ["The outbound message's sender alias matches the user's identity vector.", "The message author is identified as the corporate entity."]
- UNKNOWN when: ["Sender alias or actual author is not observable."]
- Direct counterevidence: ["The sender alias accurately identifies the corporate sender."]

| 54 | Pay To Avoid | `card-054-pay-to-avoid.md` |

## Pay To Avoid

### DP-048-C1: Artificial State Degradation
- Operational reading: The default state is materially degraded by an artificial penalty
- Required atoms: ["Default and system/reference utility states are identified for the same feature.", "The artificial degradation term is observed or explicitly represented.", "The stated utility inequality is met."]
- UNKNOWN when: ["Utility reference, degradation cause, or comparable states are unavailable."]
- Direct counterevidence: ["The default state is not materially degraded or the feature is inherently unavailable."]

### DP-048-C2: Visual Occupancy of the Pain-Point Element
- Operational reading: Pain-point element occupies more than the stated viewport share
- Required atoms: ["The pain-point element is identified in the same viewport as its denominator.", "Its area ratio exceeds the stated threshold."]
- UNKNOWN when: ["Element bounds or viewport denominator is unavailable."]
- Direct counterevidence: ["The area ratio does not exceed threshold."]

### DP-048-C3: Pain-Point Amplification
- Operational reading: Observed friction increases and is followed by a payment prompt
- Required atoms: ["At least two aligned states expose a measurable increase in friction.", "The payment prompt appears after that increase in the observed path."]
- UNKNOWN when: ["Friction change, temporal order, or prompt transition is not observable."]
- Direct counterevidence: ["No increase precedes the prompt or the prompt is unrelated to the feature."]

| 38 | Confirmshaming | `card-038-confirmshaming.md` |

## Confirmshaming

### DP-059-C1: Structural Asymmetry in Decline-Option Accessibility
- Operational reading: Decline is not exposed as an equivalent interactive control
- Required atoms: ["Accept and decline nodes are identified in the same state.", "The decline node is not a button/equivalent button role while accept is."]
- UNKNOWN when: ["The control semantics are not exposed."]
- Direct counterevidence: ["Both choices expose equivalent interactive semantics."]

### DP-059-C2: Visual Hierarchy Subversion
- Operational reading: Decline is visually subordinated below the stated accessibility threshold
- Required atoms: ["Accept and decline visual nodes are identified in the same state.", "Their relative visibility is observed and exceeds the stated disparity.", "Decline visibility meets the stated minimum-accessibility failure condition."]
- UNKNOWN when: ["Relative visibility or the minimum threshold is not measurable."]
- Direct counterevidence: ["Decline is comparably visible and accessible."]

### DP-059-C3: Semantic Asymmetry
- Operational reading: Accept language is positive while decline language is negative
- Required atoms: ["Accept and decline labels are identified as the opposing choices.", "Their sentiment values meet the stated positive/negative relationship."]
- UNKNOWN when: ["Choice roles or sentiment cannot be reliably determined."]
- Direct counterevidence: ["Decline language is neutral/respectful or accept language is not positive under the stated measure."]

