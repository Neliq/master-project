#!/usr/bin/env python3
"""Build an operational, three-valued presentation of the frozen ontology.

The original ontology remains unchanged. This sidecar rewrites how formulas are
applied to evidence: no vacuous implications, explicit observability, and
pattern-specific proof obligations.
"""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "run6-multimodal" / "ontology.md"
OUT = ROOT / "formalization-revision-v1"

GENERAL_UNKNOWN = (
    "If an atom cannot be determined from the aligned visual, DOM, or semantic "
    "evidence, mark it UNKNOWN. Do not treat absence of an observable artifact "
    "as proof of an unobservable mechanism."
)

TARGET_OVERRIDES: dict[tuple[str, str], dict[str, Any]] = {
    ("Immortal Accounts", "1. Asymmetrical Navigational Depth"): {
        "operational_name": "Measured deletion path is longer than creation path",
        "required_atoms": [
            "The creation and deletion actions are identified from the same starting state.",
            "The shortest interaction path for both actions is observed or directly countable.",
            "The stated deletion/creation ratio exceeds the formula threshold.",
        ],
        "unknown_atoms": ["A path, action, or threshold is not exposed by the evidence."],
        "counterevidence": ["The measured deletion path is not longer than the creation path."],
        "anti_inference": ["Do not infer hidden deletion steps from the absence of a settings page."],
    },
    ("Immortal Accounts", "2. Visual Accessibility of Offboarding Vectors"): {
        "operational_name": "Deletion affordance is visually subordinate to creation affordance",
        "required_atoms": [
            "A deletion/offboarding affordance and a creation affordance are both identified in the same state.",
            "Their comparable visual areas are observed or measured.",
            "The ratio is below the stated threshold, using the same viewport and element-selection rule.",
        ],
        "unknown_atoms": ["One comparison affordance or its visual measurement is unavailable."],
        "counterevidence": ["The exit affordance has equal or greater comparable prominence."],
        "anti_inference": ["A small control is not deceptive without the named within-interface comparison."],
    },
    ("Immortal Accounts", "3. Absolute Absence of Deletion Vectors"): {
        "operational_name": "No deletion vector in the complete inspected account scope",
        "required_atoms": [
            "The inspected DOM scope covers the account settings/profile pages relevant to offboarding.",
            "The deletion-keyword set and equivalent labelled controls are absent from that complete scope.",
        ],
        "unknown_atoms": ["The evidence does not establish complete account-scope coverage."],
        "counterevidence": ["A deletion, deactivation, close-account, or equivalent vector is present in the inspected scope."],
        "anti_inference": ["Do not convert a missing state or missing page into absolute absence."],
    },
    ("Sneak Into Basket", "1. Unprompted State Mutation"): {
        "operational_name": "An item appears in the cart without a matching user event",
        "required_atoms": [
            "The item is present in the cart/final checkout state.",
            "The item is absent from the set of explicitly selected items.",
            "The aligned event trace shows no user event that adds or selects that item.",
        ],
        "unknown_atoms": ["The cart state or user-event trace is incomplete."],
        "counterevidence": ["A matching explicit add/select event is observed for the item."],
        "anti_inference": ["The conclusion Add(y) is not evidence; prove the set difference and missing event directly."],
    },
    ("Sneak Into Basket", "2. Visual Indistinguishability of Surcharged Items"): {
        "operational_name": "An identified injected item visually resembles legitimate cart items",
        "required_atoms": [
            "An injected/surcharged item has already been established by the relevant cart/event evidence.",
            "At least one legitimate comparison item is identified in the same state.",
            "The visual distance is below the stated camouflage threshold under the same feature representation.",
        ],
        "unknown_atoms": ["No legitimate comparator or measurable visual representation is available."],
        "counterevidence": ["The injected item is visually distinguished or the threshold is not met."],
        "anti_inference": ["Similarity alone cannot establish injection or user impact."],
    },
    ("Sneak Into Basket", "3. Semantic Obscuration of Injected Line Items"): {
        "operational_name": "An unconsented injected item is semantically presented as optional",
        "required_atoms": [
            "The line item is established as injected by the cart/event evidence.",
            "The item description entails optional add-on status.",
            "No explicit user consent event for that item is observed.",
        ],
        "unknown_atoms": ["Consent history or item identity is unavailable."],
        "counterevidence": ["An explicit user opt-in for the item is observed."],
        "anti_inference": ["An optional label does not prove lack of consent; keep those atoms separate."],
    },
    ("Bundling", "1. Inseparable Transactional Nodes"): {
        "operational_name": "Primary purchase necessarily includes a supplementary item",
        "required_atoms": [
            "The primary purchase event is observed from the relevant starting state.",
            "The resulting checkout state contains both primary and supplementary items.",
            "No primary-only purchase event/path is observed in the inspected flow.",
        ],
        "unknown_atoms": ["The resulting cart or alternative path is not observable."],
        "counterevidence": ["A primary-only purchase path is directly available."],
        "anti_inference": ["Do not infer inseparability from a bundle label without a transition or complete path check."],
    },
    ("Bundling", "2. Visual Obscuration of Individual Component Pricing"): {
        "operational_name": "Component prices occupy less than the stated share of the bundle presentation",
        "required_atoms": [
            "The bundle container and all relevant component-price nodes are identified in the same state.",
            "The component-price area and bundle area use the same coordinate/viewport basis.",
            "The stated area ratio is below the threshold.",
        ],
        "unknown_atoms": ["Component inventory or comparable area measurements are incomplete."],
        "counterevidence": ["Component prices are visibly and proportionally presented above the threshold."],
        "anti_inference": ["Small text alone is not concealment without the defined bundle comparison."],
    },
    ("Bundling", "3. Semantic Suppression of Individual Item Descriptions"): {
        "operational_name": "Bundled descriptions are less informative than comparable standalone descriptions",
        "required_atoms": [
            "Bundled and standalone descriptions for equivalent items are identified.",
            "The same entropy/description representation is available for both sets.",
            "The ratio is below the stated threshold.",
        ],
        "unknown_atoms": ["No equivalent standalone comparator or entropy measurement is available."],
        "counterevidence": ["Bundled descriptions are comparably informative under the stated representation."],
        "anti_inference": ["Do not invent a standalone comparator from another product category."],
    },
    ("Friend Spam", "1. Feedforward Intent vs. Payload Execution"): {
        "operational_name": "Read-only contact intent leads to observed outbound messaging",
        "required_atoms": [
            "The prompt's intended action is read-only matching/searching.",
            "An outbound message/broadcast action is directly observed after the access event.",
            "The transition from access to outbound action is evidenced in the aligned state/event record.",
        ],
        "unknown_atoms": ["Backend execution or the access-to-message transition is not observable."],
        "counterevidence": ["Only read-only matching occurs and no outbound message action is observed."],
        "anti_inference": ["Permission request wording does not prove backend sending."],
    },
    ("Friend Spam", "2. Absence of Granular Selection"): {
        "operational_name": "Messages are sent to the contact set without granular selection",
        "required_atoms": [
            "The selection state shows zero explicitly selected contacts.",
            "The dispatched-message set is observed and approximately covers the extracted contact set.",
            "The dispatch occurs without an affirmative granular-selection event.",
        ],
        "unknown_atoms": ["The extracted contact set or dispatched-message set is not exposed."],
        "counterevidence": ["The user selects recipients or the dispatch set is limited to selected recipients."],
        "anti_inference": ["Do not infer a broadcast from a contact-import prompt alone."],
    },
    ("Friend Spam", "3. Sender Identity Spoofing"): {
        "operational_name": "Corporate outbound message uses the user's identity as sender alias",
        "required_atoms": [
            "The outbound message's sender alias matches the user's identity vector.",
            "The message author is identified as the corporate entity.",
        ],
        "unknown_atoms": ["Sender alias or actual author is not observable."],
        "counterevidence": ["The sender alias accurately identifies the corporate sender."],
        "anti_inference": ["A user's name in a message body is not the sender alias."],
    },
    ("Pre-Delivered Content", "1. Unconsented Local Storage Consumption"): {
        "operational_name": "Premium content is locally present without consent",
        "required_atoms": [
            "The premium content is established as present in local storage.",
            "No explicit consent/request to install that content is observed.",
            "The content size is materially greater than zero.",
        ],
        "unknown_atoms": ["Local storage presence, consent history, or content size is not exposed."],
        "counterevidence": ["The content was explicitly requested or is not locally present."],
        "anti_inference": ["A locked UI tile does not prove downloaded local content."],
    },
    ("Pre-Delivered Content", "2. Visual Density of Locked-Content Badges"): {
        "operational_name": "Locked-content nodes dominate accessible nodes",
        "required_atoms": [
            "Locked and accessible content nodes are countable in the same inspected scope.",
            "The accessible-node denominator is nonzero.",
            "The stated locked/accessibility ratio exceeds the threshold.",
        ],
        "unknown_atoms": ["The inspected content inventory or denominator is incomplete/zero."],
        "counterevidence": ["The ratio does not exceed the threshold."],
        "anti_inference": ["The presence of locked badges alone is not a density calculation."],
    },
    ("Pre-Delivered Content", "3. Semantic Framing of Local Assets as Purchase Opportunities"): {
        "operational_name": "Locally present assets are framed as purchasable",
        "required_atoms": [
            "The asset is established as locally present.",
            "The asset text frames the asset as purchasable/unlockable/downloadable.",
        ],
        "unknown_atoms": ["Local presence or asset framing is not directly observable."],
        "counterevidence": ["The asset is remote/not present locally or is described as already included."],
        "anti_inference": ["A purchase button for a future asset does not establish local presence."],
    },
    ("Price Comparison Prevention", "1. Fiat Decoupling"): {
        "operational_name": "A price is shown without an available fiat conversion",
        "required_atoms": [
            "A nonempty price token is visible in the complete relevant price scope.",
            "No fiat conversion function/label is present in that same scope.",
        ],
        "unknown_atoms": ["The relevant price scope or conversion affordances are incomplete."],
        "counterevidence": ["A direct fiat conversion is available and visible in the relevant scope."],
        "anti_inference": ["Do not treat an unfamiliar currency symbol as absence of conversion."],
    },
    ("Price Comparison Prevention", "2. Visual Suppression of Unit-Price Information"): {
        "operational_name": "Unit price is visually subordinate to the headline price",
        "required_atoms": [
            "Unit-price and headline-price nodes are identified in the same state.",
            "The same font-size/contrast measurements are available for both nodes.",
            "At least one stated suppression ratio is below threshold.",
        ],
        "unknown_atoms": ["One price node or comparable CSS/visual measurements are missing."],
        "counterevidence": ["Unit-price information meets the stated relative visibility threshold."],
        "anti_inference": ["A small unit label is not suppression without the named headline comparison."],
    },
    ("Price Comparison Prevention", "3. Semantic Omission of Comparison-Relevant Qualifiers"): {
        "operational_name": "Comparison-relevant qualifiers are absent from the rendered price",
        "required_atoms": [
            "The standard qualifier set for this price/product is known from the evidence.",
            "The rendered qualifier set is complete and comparable.",
            "Their intersection is empty.",
        ],
        "unknown_atoms": ["The standard qualifier set cannot be established from the evidence."],
        "counterevidence": ["At least one relevant qualifier is rendered."],
        "anti_inference": ["Do not assume a universal standard qualifier set."],
    },
    ("Persuasive Language", "1. Structural Density of Event Listeners on Coercive Text Nodes"): {
        "operational_name": "Coercive text has greater event-listener density than neutral text",
        "required_atoms": [
            "Coercive and neutral comparison text nodes are identified.",
            "Event-listener counts are directly exposed for both nodes.",
            "The ratio exceeds the stated threshold.",
        ],
        "unknown_atoms": ["Event handlers are not exposed by the DOM/evidence bundle."],
        "counterevidence": ["The ratio does not exceed the threshold."],
        "anti_inference": ["Text tone or clickability alone cannot establish listener-density asymmetry."],
    },
    ("Persuasive Language", "2. Visual Emphasis Asymmetry on Coercive Text"): {
        "operational_name": "Coercive text is more visually emphasized than neutral text",
        "required_atoms": [
            "Coercive and neutral comparison text nodes are identified in the same state.",
            "Font-weight and/or area measurements are comparable.",
            "At least one stated emphasis ratio exceeds threshold.",
        ],
        "unknown_atoms": ["The neutral comparator or CSS/area measurement is unavailable."],
        "counterevidence": ["No stated emphasis ratio is exceeded."],
        "anti_inference": ["Negative or urgent wording without a visual comparator is insufficient."],
    },
    ("Persuasive Language", "3. Truth-Conditional Satisfiability"): {
        "operational_name": "Satisfiable claims are counterevidence, not a trigger",
        "polarity": "counterevidence",
        "required_atoms": [
            "The relevant claims are identified and their semantic relation is evaluated.",
            "The claims are jointly satisfiable under the displayed context.",
        ],
        "unknown_atoms": ["The propositions or their semantic relation are not clear."],
        "counterevidence": ["Claims are mutually inconsistent or unsatisfiable."],
        "anti_inference": ["Satisfiability cannot itself support a deceptive verdict."],
    },
    ("Cuteness", "1. Structural Conditional Injection of Affective Assets"): {
        "operational_name": "Affective assets appear in cancellation but not onboarding DOM",
        "required_atoms": [
            "The onboarding and cancellation states are identified and aligned.",
            "The affective asset is absent from onboarding DOM and present in cancellation DOM.",
        ],
        "unknown_atoms": ["The relevant states or DOM asset identity cannot be matched."],
        "counterevidence": ["The asset is present in both states or absent from both."],
        "anti_inference": ["Do not infer conditional injection from different screenshots without matching DOM state IDs."],
    },
    ("Cuteness", "2. Context-Dependent Image Injection"): {
        "operational_name": "Affective image appears only in the cancellation context",
        "required_atoms": [
            "The onboarding and cancellation image sets are identified and aligned.",
            "The affective image is absent from onboarding and present in cancellation.",
            "The image identity is matched across the two states.",
        ],
        "unknown_atoms": ["Image identity or state alignment is uncertain."],
        "counterevidence": ["The image is not context-dependent under the stated comparison."],
        "anti_inference": ["A general mascot image is not a context-dependent injection."],
    },
    ("Cuteness", "3. Semantic Pairing of Guilt"): {
        "operational_name": "Guilt-inducing text is spatially paired with an affective image",
        "required_atoms": [
            "Affect score exceeds the threshold for the relevant text.",
            "The affective text and image are spatially within the stated proximity.",
        ],
        "unknown_atoms": ["Affect score or spatial relationship is not available."],
        "counterevidence": ["The text is neutral or not spatially paired with the image."],
        "anti_inference": ["Cute imagery without guilt language is not this condition."],
    },
    ("Endorsement And Testimonials", "1. Statistical Implausibility"): {
        "operational_name": "Review distribution is uniform-looking and requires provenance checking",
        "required_atoms": [
            "The complete displayed review-score distribution is available.",
            "Mean and variance meet the stated approximate values.",
            "A separate provenance observation is available before claiming rendered/organic mismatch.",
        ],
        "unknown_atoms": ["Review distribution or provenance cannot be observed."],
        "counterevidence": ["The distribution does not meet the stated values or provenance is directly established as organic."],
        "anti_inference": ["A near-perfect average does not prove fabrication by itself."],
    },
    ("Endorsement And Testimonials", "2. Visual Verifiability of Testimonial Attribution"): {
        "operational_name": "A testimonial has no attribution in its complete container DOM",
        "required_atoms": [
            "A testimonial container is identified and its descendant DOM is completely inspected.",
            "No attribution node is present in that container.",
        ],
        "unknown_atoms": ["The testimonial container or descendant DOM is incomplete."],
        "counterevidence": ["An attribution node is present."],
        "anti_inference": ["Absence of a visible avatar is not absence of attribution."],
    },
    ("Endorsement And Testimonials", "3. Provenance Obfuscation"): {
        "operational_name": "Testimonial avatar or text matches a stock/template source",
        "required_atoms": [
            "A testimonial instance and comparison source are identified.",
            "The stated image or text similarity threshold is met.",
            "The similarity result is treated as provenance evidence, not proof of deception without context.",
        ],
        "unknown_atoms": ["A stock database, comparison corpus, or similarity measure is unavailable."],
        "counterevidence": ["The stated similarity threshold is not met."],
        "anti_inference": ["Generic wording or a common avatar alone does not prove copied provenance."],
    },
    ("Confirmshaming", "1. Structural Asymmetry in Decline-Option Accessibility"): {
        "operational_name": "Decline is not exposed as an equivalent interactive control",
        "required_atoms": [
            "Accept and decline nodes are identified in the same state.",
            "The decline node is not a button/equivalent button role while accept is.",
        ],
        "unknown_atoms": ["The control semantics are not exposed."],
        "counterevidence": ["Both choices expose equivalent interactive semantics."],
        "anti_inference": ["Different HTML tags are insufficient if accessibility semantics are equivalent."],
    },
    ("Confirmshaming", "2. Visual Hierarchy Subversion"): {
        "operational_name": "Decline is visually subordinated below the stated accessibility threshold",
        "required_atoms": [
            "Accept and decline visual nodes are identified in the same state.",
            "Their relative visibility is observed and exceeds the stated disparity.",
            "Decline visibility meets the stated minimum-accessibility failure condition.",
        ],
        "unknown_atoms": ["Relative visibility or the minimum threshold is not measurable."],
        "counterevidence": ["Decline is comparably visible and accessible."],
        "anti_inference": ["A text link is not automatically shaming without the relative comparison."],
    },
    ("Confirmshaming", "3. Semantic Asymmetry"): {
        "operational_name": "Accept language is positive while decline language is negative",
        "required_atoms": [
            "Accept and decline labels are identified as the opposing choices.",
            "Their sentiment values meet the stated positive/negative relationship.",
        ],
        "unknown_atoms": ["Choice roles or sentiment cannot be reliably determined."],
        "counterevidence": ["Decline language is neutral/respectful or accept language is not positive under the stated measure."],
        "anti_inference": ["A negative product consequence is not the same as a negative label aimed at the user."],
    },
    ("Addictive Design", "1. Infinite Frictionless Continuation"): {
        "operational_name": "Near-end scrolling triggers observed content append",
        "required_atoms": [
            "The viewport is observed near the document end under the stated buffer.",
            "A fetch/append transition is observed after the near-end state.",
            "The append is repeated or the evidence otherwise supports continuation beyond the prior end.",
        ],
        "unknown_atoms": ["Only a static near-end screenshot exists without an append transition."],
        "counterevidence": ["A stable document end or stopping boundary is observed."],
        "anti_inference": ["The limit statement is a definition, not proof that the captured interface appended content."],
    },
    ("Addictive Design", "2. Eradication of Natural Stopping Cues"): {
        "operational_name": "Stopping cues are absent or below threshold in the inspected state",
        "required_atoms": [
            "The relevant stopping-cue set is defined for the inspected interface.",
            "Every relevant cue fails visibility/area/contrast in the same state(s).",
        ],
        "unknown_atoms": ["The complete stopping-cue set or session-duration claim is unavailable."],
        "counterevidence": ["A clear stopping cue is visible at the stated threshold."],
        "anti_inference": ["Long engagement or psychological dependence cannot be inferred from a static screenshot."],
    },
    ("Addictive Design", "3. Semantic Reinforcement-Trigger Lexicon Density"): {
        "operational_name": "Reinforcement lexemes exceed the stated density in the viewport",
        "required_atoms": [
            "The relevant viewport text and reinforcement lexicon are available.",
            "The stated normalized density exceeds threshold.",
        ],
        "unknown_atoms": ["The viewport text or lexicon denominator is incomplete."],
        "counterevidence": ["The density does not exceed the threshold."],
        "anti_inference": ["Lexical density is an observable signal, not proof of addiction or user harm."],
    },
    ("Pay To Avoid", "1. Artificial State Degradation"): {
        "operational_name": "The default state is materially degraded by an artificial penalty",
        "required_atoms": [
            "Default and system/reference utility states are identified for the same feature.",
            "The artificial degradation term is observed or explicitly represented.",
            "The stated utility inequality is met.",
        ],
        "unknown_atoms": ["Utility reference, degradation cause, or comparable states are unavailable."],
        "counterevidence": ["The default state is not materially degraded or the feature is inherently unavailable."],
        "anti_inference": ["A paid upgrade is not automatically pay-to-avoid without an artificial default penalty."],
    },
    ("Pay To Avoid", "2. Visual Occupancy of the Pain-Point Element"): {
        "operational_name": "Pain-point element occupies more than the stated viewport share",
        "required_atoms": [
            "The pain-point element is identified in the same viewport as its denominator.",
            "Its area ratio exceeds the stated threshold.",
        ],
        "unknown_atoms": ["Element bounds or viewport denominator is unavailable."],
        "counterevidence": ["The area ratio does not exceed threshold."],
        "anti_inference": ["Large size alone is not deception without the pattern's artificial-degradation context."],
    },
    ("Pay To Avoid", "3. Pain-Point Amplification"): {
        "operational_name": "Observed friction increases and is followed by a payment prompt",
        "required_atoms": [
            "At least two aligned states expose a measurable increase in friction.",
            "The payment prompt appears after that increase in the observed path.",
        ],
        "unknown_atoms": ["Friction change, temporal order, or prompt transition is not observable."],
        "counterevidence": ["No increase precedes the prompt or the prompt is unrelated to the feature."],
        "anti_inference": ["The probability conclusion is not observable evidence; use the event sequence instead."],
    },
}


def parse() -> list[dict[str, Any]]:
    lines = SOURCE.read_text().splitlines()
    pattern = condition = None
    pattern_family = "unspecified"
    records: list[dict[str, Any]] = []
    for line_no, line in enumerate(lines, 1):
        if line.startswith("## "):
            header = line[3:]
            pattern = header.split("  [", 1)[0].strip()
            family_match = re.search(r"\[([^]]+)\]", header)
            pattern_family = family_match.group(1) if family_match else "unspecified"
        elif line.startswith("### "):
            condition = line[4:].strip()
        elif line.startswith("FORMULA:"):
            records.append({
                "pattern": pattern,
                "family": pattern_family,
                "condition": condition,
                "source_line": line_no,
                "original_formula": line.split(":", 1)[1].strip(),
                "given": [],
            })
        elif line.startswith("GIVEN:") and records:
            records[-1]["given"].append(line.split(":", 1)[1].strip())
    if len(records) != 186:
        raise SystemExit(f"expected 186 formulas, got {len(records)}")
    return records


def fallback(record: dict[str, Any]) -> dict[str, Any]:
    formula = record["original_formula"]
    needs_conjunction = bool(re.search(r"\\implies|\\Rightarrow| implies ", formula))
    operation = (
        "Treat every premise and stated consequence as a required observed atom; "
        "do not evaluate the implication materially or vacuously."
        if needs_conjunction else
        "Treat every atomic requirement in the formula as mandatory; preserve AND/OR grouping."
    )
    return {
        "operational_name": "Strict observable evaluation of the original predicate",
        "required_atoms": ["Every atomic clause in the original formula is identified and evaluated in the stated scope."],
        "unknown_atoms": ["Any referenced variable, threshold, comparator, transition, or set is not directly available."],
        "counterevidence": ["A directly observed atom contradicts a mandatory requirement."],
        "anti_inference": [operation, "Do not infer backend truth, future behavior, psychological effect, or causal intent from a static cue."],
    }


def main() -> None:
    records = parse()
    source_hash = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
    cards = []
    for record in records:
        override = TARGET_OVERRIDES.get((record["pattern"], record["condition"]), fallback(record))
        cards.append({
            **record,
            **override,
            "polarity": override.get("polarity", "trigger"),
            "unknown_rule": GENERAL_UNKNOWN,
            "status_rule": "TRUE iff all required atoms are TRUE; FALSE iff direct counterevidence is TRUE; UNKNOWN otherwise.",
            "source_sha256": source_hash,
        })
    if len(cards) != 186 or len({c["pattern"] for c in cards}) != 62:
        raise SystemExit("coverage failure")
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "operational-cards.json").write_text(json.dumps({
        "revision": "formalization-revision-v1",
        "source": str(SOURCE),
        "source_sha256": source_hash,
        "patterns": 62,
        "conditions": 186,
        "cards": cards,
    }, indent=2, ensure_ascii=False) + "\n")

    pattern_names = []
    for card in cards:
        if card["pattern"] not in pattern_names:
            pattern_names.append(card["pattern"])
    lines = [
        "# Operational formalization revision v1",
        "",
        "This is a versioned application-oriented rewrite of the frozen ontology.",
        "The original formulas are retained verbatim in `operational-cards.json`;",
        "this document changes how they are evaluated against evidence, not the",
        "corpus labels or the Run 6 benchmark.",
        "",
        "## Three-valued semantics",
        "",
        "- **TRUE**: every mandatory atom in one condition is directly supported by aligned evidence.",
        "- **FALSE**: direct evidence contradicts a mandatory atom or supplies a listed counterevidence.",
        "- **UNKNOWN**: a required atom is unobservable, the evidence scope is incomplete, or the comparison cannot be measured.",
        "- A pattern is **DECEPTIVE** only if one complete trigger condition is TRUE.",
        "- A pattern is **BENIGN** only when no trigger condition is TRUE and direct counterevidence/escape evidence is available.",
        "- Otherwise the pattern is **UNKNOWN**; do not silently map missing evidence to BENIGN.",
        "- `polarity: counterevidence` conditions can disqualify a trigger but cannot create a deceptive verdict.",
        "",
        "## Proof-obligation grammar",
        "",
        "1. Read all aligned states and build separate visual, DOM, semantic, and transition facts.",
        "2. Identify the pattern/condition's required objects and scope before evaluating atoms.",
        "3. Evaluate every mandatory atom. For `A ⇒ B`, require observed A and observed B; never use vacuous truth.",
        "4. Keep unobservable backend truth, future behavior, user psychology, and intent UNKNOWN.",
        "5. Require the named comparison, path, event, denominator, or state transition; a keyword or similarity is not a complete condition.",
        "6. Apply only pattern/condition-specific counterevidence and escapes.",
        "",
        "## Coverage",
        "",
        f"- Patterns: 62",
        f"- Conditions: 186",
        f"- Detailed operational rewrites: {sum((p, c) in TARGET_OVERRIDES for p, c in [(r['pattern'], r['condition']) for r in records])}",
        f"- Conservative fallback cards: {sum((r['pattern'], r['condition']) not in TARGET_OVERRIDES for r in records)}",
        "",
        "## Pattern cards",
        "",
    ]
    for pattern in pattern_names:
        cards_for_pattern = [c for c in cards if c["pattern"] == pattern]
        lines += [f"### {pattern} [{cards_for_pattern[0]['family']}]", ""]
        for index, card in enumerate(cards_for_pattern, 1):
            lines += [
                f"#### {index}. {card['condition']}",
                f"Original: `{card['original_formula']}`",
                f"Operational reading: {card['operational_name']}",
                "Required atoms:",
                *[f"- {item}" for item in card["required_atoms"]],
                "Unknown when:",
                *[f"- {item}" for item in card["unknown_atoms"]],
                "Direct counterevidence:",
                *[f"- {item}" for item in card["counterevidence"]],
                "Do not infer:",
                *[f"- {item}" for item in card["anti_inference"]],
                f"Status rule: {card['status_rule']}",
                f"Polarity: {card['polarity']}",
                "",
            ]
    (OUT / "operational-formalization.md").write_text("\n".join(lines) + "\n")
    print(json.dumps({
        "patterns": 62,
        "conditions": 186,
        "detailed_rewrites": sum((r["pattern"], r["condition"]) in TARGET_OVERRIDES for r in records),
        "fallback_cards": sum((r["pattern"], r["condition"]) not in TARGET_OVERRIDES for r in records),
        "output": str(OUT),
    }, indent=2))


if __name__ == "__main__":
    main()
