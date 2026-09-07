# General formalization pseudocode

This file contains general rules only. It contains no demonstrations, page examples, or labelled cases.
Use the rules as observable-evidence obligations; do not infer hidden intent or backend state.

## DP-001-C1 — Immortal Accounts

Operational reading: Measured deletion path is longer than creation path

Pseudocode:
- `INPUT evidence_ledger, with state IDs and modality availability.`
- `CHECK the pattern-specific domain/context gate.`
- `IF the core context is contradicted: RETURN NO_MATCH.`
- `PARSE the original formula while preserving every AND, OR, NOT, quantifier, and grouping.`
- `EVALUATE each atomic operand only from directly observed evidence.`
- `EVALUATE implication only as an observed premise-and-consequence proof obligation; never use vacuous truth.`
- `IF the formula result is FALSE: RETURN FALSE.`
- `IF direct_counterevidence is observed: RETURN FALSE.`
- `RETURN TRUE.`
- `IF the formal proof is not directly established: RETURN BENIGN for this binary test.`

Required observable atoms:
- The creation and deletion actions are identified from the same starting state.
- The shortest interaction path for both actions is observed or directly countable.
- The stated deletion/creation ratio exceeds the formula threshold.

Direct counterevidence:
- The measured deletion path is not longer than the creation path.

## DP-004-C1 — Price Comparison Prevention

Operational reading: A price is shown without an available fiat conversion

Pseudocode:
- `INPUT evidence_ledger, with state IDs and modality availability.`
- `CHECK the pattern-specific domain/context gate.`
- `IF the core context is contradicted: RETURN NO_MATCH.`
- `PARSE the original formula while preserving every AND, OR, NOT, quantifier, and grouping.`
- `EVALUATE each atomic operand only from directly observed evidence.`
- `EVALUATE implication only as an observed premise-and-consequence proof obligation; never use vacuous truth.`
- `IF the formula result is FALSE: RETURN FALSE.`
- `IF direct_counterevidence is observed: RETURN FALSE.`
- `RETURN TRUE.`
- `IF the formal proof is not directly established: RETURN BENIGN for this binary test.`

Required observable atoms:
- A nonempty price token is visible in the complete relevant price scope.
- No fiat conversion function/label is present in that same scope.

Direct counterevidence:
- A direct fiat conversion is available and visible in the relevant scope.

## DP-007-C1 — Sneak Into Basket

Operational reading: An item appears in the cart without a matching user event

Pseudocode:
- `INPUT evidence_ledger, with state IDs and modality availability.`
- `CHECK the pattern-specific domain/context gate.`
- `IF the core context is contradicted: RETURN NO_MATCH.`
- `PARSE the original formula while preserving every AND, OR, NOT, quantifier, and grouping.`
- `EVALUATE each atomic operand only from directly observed evidence.`
- `EVALUATE implication only as an observed premise-and-consequence proof obligation; never use vacuous truth.`
- `IF the formula result is FALSE: RETURN FALSE.`
- `IF direct_counterevidence is observed: RETURN FALSE.`
- `RETURN TRUE.`
- `IF the formal proof is not directly established: RETURN BENIGN for this binary test.`

Required observable atoms:
- The item is present in the cart/final checkout state.
- The item is absent from the set of explicitly selected items.
- The aligned event trace shows no user event that adds or selects that item.

Direct counterevidence:
- A matching explicit add/select event is observed for the item.

## DP-012-C1 — Conflicting Information

Operational reading: Two nearby factual propositions trigger only when their extracted truth conditions are explicitly mutually unsatisfiable within the same DOM scope.

Pseudocode:
- `INPUT evidence_ledger, with state IDs and modality availability.`
- `CHECK the pattern-specific domain/context gate.`
- `IF the core context is contradicted: RETURN NO_MATCH.`
- `PARSE the original formula while preserving every AND, OR, NOT, quantifier, and grouping.`
- `EVALUATE each atomic operand only from directly observed evidence.`
- `EVALUATE implication only as an observed premise-and-consequence proof obligation; never use vacuous truth.`
- `IF the formula result is FALSE: RETURN FALSE.`
- `IF direct_counterevidence is observed: RETURN FALSE.`
- `RETURN TRUE.`
- `IF the formal proof is not directly established: RETURN BENIGN for this binary test.`

Required observable atoms:
- Two factual propositions are identified within the same named container.
- Their proposition representations are directly evaluated as mutually unsatisfiable.
- Their DOM distance is below the stated proximity threshold.

Direct counterevidence:
- The propositions are jointly satisfiable or are not in the same relevant scope.

## DP-018-C1 — Persuasive Language

Operational reading: Coercive text has greater event-listener density than neutral text

Pseudocode:
- `INPUT evidence_ledger, with state IDs and modality availability.`
- `CHECK the pattern-specific domain/context gate.`
- `IF the core context is contradicted: RETURN NO_MATCH.`
- `PARSE the original formula while preserving every AND, OR, NOT, quantifier, and grouping.`
- `EVALUATE each atomic operand only from directly observed evidence.`
- `EVALUATE implication only as an observed premise-and-consequence proof obligation; never use vacuous truth.`
- `IF the formula result is FALSE: RETURN FALSE.`
- `IF direct_counterevidence is observed: RETURN FALSE.`
- `RETURN TRUE.`
- `IF the formal proof is not directly established: RETURN BENIGN for this binary test.`

Required observable atoms:
- Coercive and neutral comparison text nodes are identified.
- Event-listener counts are directly exposed for both nodes.
- The ratio exceeds the stated threshold.

Direct counterevidence:
- The ratio does not exceed the threshold.

## DP-021-C1 — Cuteness

Operational reading: Affective assets appear in cancellation but not onboarding DOM

Pseudocode:
- `INPUT evidence_ledger, with state IDs and modality availability.`
- `CHECK the pattern-specific domain/context gate.`
- `IF the core context is contradicted: RETURN NO_MATCH.`
- `PARSE the original formula while preserving every AND, OR, NOT, quantifier, and grouping.`
- `EVALUATE each atomic operand only from directly observed evidence.`
- `EVALUATE implication only as an observed premise-and-consequence proof obligation; never use vacuous truth.`
- `IF the formula result is FALSE: RETURN FALSE.`
- `IF direct_counterevidence is observed: RETURN FALSE.`
- `RETURN TRUE.`
- `IF the formal proof is not directly established: RETURN BENIGN for this binary test.`

Required observable atoms:
- The onboarding and cancellation states are identified and aligned.
- The affective asset is absent from onboarding DOM and present in cancellation DOM.

Direct counterevidence:
- The asset is present in both states or absent from both.

## DP-031-C1 — Addictive Design

Operational reading: Near-end scrolling triggers observed content append

Pseudocode:
- `INPUT evidence_ledger, with state IDs and modality availability.`
- `CHECK the pattern-specific domain/context gate.`
- `IF the core context is contradicted: RETURN NO_MATCH.`
- `PARSE the original formula while preserving every AND, OR, NOT, quantifier, and grouping.`
- `EVALUATE each atomic operand only from directly observed evidence.`
- `EVALUATE implication only as an observed premise-and-consequence proof obligation; never use vacuous truth.`
- `IF the formula result is FALSE: RETURN FALSE.`
- `IF direct_counterevidence is observed: RETURN FALSE.`
- `RETURN TRUE.`
- `IF the formal proof is not directly established: RETURN BENIGN for this binary test.`

Required observable atoms:
- The evidence shows the pattern-specific scroll/feed context near a document boundary.
- A fetch/append transition is observed after that near-end state, with repeated continuation or no stable end boundary.

Direct counterevidence:
- A stable end boundary is observed, or the interface is a bounded reward/play loop without scroll/feed continuation.

## DP-039-C1 — Friend Spam

Operational reading: Read-only contact intent leads to observed outbound messaging

Pseudocode:
- `INPUT evidence_ledger, with state IDs and modality availability.`
- `CHECK the pattern-specific domain/context gate.`
- `IF the core context is contradicted: RETURN NO_MATCH.`
- `PARSE the original formula while preserving every AND, OR, NOT, quantifier, and grouping.`
- `EVALUATE each atomic operand only from directly observed evidence.`
- `EVALUATE implication only as an observed premise-and-consequence proof obligation; never use vacuous truth.`
- `IF the formula result is FALSE: RETURN FALSE.`
- `IF direct_counterevidence is observed: RETURN FALSE.`
- `RETURN TRUE.`
- `IF the formal proof is not directly established: RETURN BENIGN for this binary test.`

Required observable atoms:
- The prompt's intended action is read-only matching/searching.
- An outbound message/broadcast action is directly observed after the access event.
- The transition from access to outbound action is evidenced in the aligned state/event record.

Direct counterevidence:
- Only read-only matching occurs and no outbound message action is observed.

## DP-048-C1 — Pay To Avoid

Operational reading: The default state is materially degraded by an artificial penalty

Pseudocode:
- `INPUT evidence_ledger, with state IDs and modality availability.`
- `CHECK the pattern-specific domain/context gate.`
- `IF the core context is contradicted: RETURN NO_MATCH.`
- `PARSE the original formula while preserving every AND, OR, NOT, quantifier, and grouping.`
- `EVALUATE each atomic operand only from directly observed evidence.`
- `EVALUATE implication only as an observed premise-and-consequence proof obligation; never use vacuous truth.`
- `IF the formula result is FALSE: RETURN FALSE.`
- `IF direct_counterevidence is observed: RETURN FALSE.`
- `RETURN TRUE.`
- `IF the formal proof is not directly established: RETURN BENIGN for this binary test.`

Required observable atoms:
- Default and system/reference utility states are identified for the same feature.
- The artificial degradation term is observed or explicitly represented.
- The stated utility inequality is met.

Direct counterevidence:
- The default state is not materially degraded or the feature is inherently unavailable.

## DP-059-C1 — Confirmshaming

Operational reading: Decline is not exposed as an equivalent interactive control

Pseudocode:
- `INPUT evidence_ledger, with state IDs and modality availability.`
- `CHECK the pattern-specific domain/context gate.`
- `IF the core context is contradicted: RETURN NO_MATCH.`
- `PARSE the original formula while preserving every AND, OR, NOT, quantifier, and grouping.`
- `EVALUATE each atomic operand only from directly observed evidence.`
- `EVALUATE implication only as an observed premise-and-consequence proof obligation; never use vacuous truth.`
- `IF the formula result is FALSE: RETURN FALSE.`
- `IF direct_counterevidence is observed: RETURN FALSE.`
- `RETURN TRUE.`
- `IF the formal proof is not directly established: RETURN BENIGN for this binary test.`

Required observable atoms:
- Accept and decline nodes are identified in the same state.
- The decline node is not a button/equivalent button role while accept is.

Direct counterevidence:
- Both choices expose equivalent interactive semantics.
