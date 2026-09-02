/**
 * Per-pattern auditor annotations.
 *
 * Each entry is a list of {label, description} callouts that the auditor
 * view shows under "Dark pattern elements". Callouts name the specific
 * UI element the auditor should be looking at, and explain why that
 * element is a dark pattern.
 *
 * Content is hand-authored from the master thesis formal conditions; if
 * a pattern is missing an entry the auditor view simply hides the
 * annotation panel.
 */

import type { AnnotationItem } from "@/components/demos/demo-shell";

export const AUDITOR_ANNOTATIONS: Record<string, AnnotationItem[]> = {
  // ── Obstacles ─────────────────────────────────────────────────────
  "immortal-accounts": [
    {
      label: "Account deletion path",
      description:
        "Removed from the main settings; reachable only by mailing support and waiting up to 30 days.",
    },
  ],
  "dead-end": [
    {
      label: "Final screen",
      description:
        "Shows a confirmation but no link back to edit, undo, or change a just-entered value.",
    },
  ],
  "forced-grace-period": [
    {
      label: "Skip-to-confirmation button",
      description:
        "Takes the user past the deletion confirmation straight to a holding screen with a 30-day timer.",
    },
  ],
  "privacy-maze": [
    {
      label: "Opt-out link",
      description:
        "Buried under five nested menus, deliberately renamed, and not reachable from the main settings page.",
    },
  ],
  "labyrinthine-navigation": [
    {
      label: "Cancellation flow",
      description:
        "Requires traversing 12+ screens, each with a default that re-opts the user into marketing.",
    },
  ],
  "customisation": [
    {
      label: "Reset to defaults",
      description:
        "Promotes a 'reset to defaults' button that wipes all privacy opt-outs in one click.",
    },
  ],

  // ── Sleight of hand ───────────────────────────────────────────────
  "intermediate-currency": [
    {
      label: "Coin / token balance",
      description:
        "Real money is converted into an in-site currency at a non-transparent rate; the user loses track of the actual spend.",
    },
  ],
  "disguised-ad": [
    {
      label: "Sponsored card",
      description:
        "An advertisement is styled to look like organic content, often with the same border, font, and CTA shape.",
    },
  ],
  "sneak-into-basket": [
    {
      label: "Buy now button",
      description:
        "Silently adds a $9.99 warranty to the cart on first click; the line item only appears in the receipt.",
    },
  ],
  "drip-pricing": [
    {
      label: "Headline price",
      description:
        "Display price excludes taxes, service fees, and shipping — each added only at checkout.",
    },
  ],
  "bundling": [
    {
      label: "Package / bundle selector",
      description:
        "Bundled add-ons (insurance, accessories) cannot be removed individually; the user must deselect the whole bundle.",
    },
  ],
  "hidden-information": [
    {
      label: "Terms link",
      description:
        "Crucial conditions (auto-renewal, fee structure) are inside a 12,000-word document rather than next to the price.",
    },
  ],
  "reduced-friction": [
    {
      label: "One-tap default",
      description:
        "The previous choice is auto-applied to speed up the next decision — usually the more expensive one.",
    },
  ],

  // ── Attention theft ───────────────────────────────────────────────
  "forced-continuity": [
    {
      label: "Cancel button",
      description:
        "Disabled for 24h after the renewal charge so a user who notices the charge cannot claw it back immediately.",
    },
  ],
  "privacy-zuckering": [
    {
      label: "Discount offer",
      description:
        "Discount is gated on sharing contacts, location, or browsing data — the price of the product is effectively inflated.",
    },
  ],
  "friend-spam": [
    {
      label: "Address book importer",
      description:
        "Imports contacts on first login and then sends messages that appear to come from the user.",
    },
  ],
  "address-book-leeching": [
    {
      label: "Find friends",
      description:
        "Asks for full address-book access 'to find your friends' — the data is then retained regardless of consent.",
    },
  ],
  "automatic-accept-third-party-term": [
    {
      label: "Onboarding checkbox",
      description:
        "Third-party terms are pre-accepted, with a tiny 'details' link the user has to actively hunt for.",
    },
  ],
  "pre-delivered-content": [
    {
      label: "Outbox / drafts",
      description:
        "Drafts the user never wrote are queued in the outbox; the user can only send or delete — not opt out of the queue.",
    },
  ],

  // ── Urgency & scarcity ───────────────────────────────────────────
  "fear-of-missing-out-fomo": [
    {
      label: "Viewer / shopper count",
      description:
        "'17 people are looking at this' — the counter is usually synthetic and not tied to actual sessions.",
    },
  ],
  "high-demand": [
    {
      label: "Demand badge",
      description:
        "'Trending', 'In high demand', 'Popular' — a static label with no underlying inventory or popularity data.",
    },
  ],
  "low-stock": [
    {
      label: "Stock counter",
      description:
        "'Only 2 left!' — often a hard-coded number that resets when the page is refreshed.",
    },
  ],
  "activity-messages": [
    {
      label: "Live activity feed",
      description:
        "'Sarah from London just bought…' — fabricated events designed to trigger loss aversion.",
    },
  ],
  "countdown-timer": [
    {
      label: "Countdown",
      description:
        "Resets to a new 'exclusive offer' the moment it hits zero so the user can never actually check out in time.",
    },
  ],
  "limited-time-message": [
    {
      label: "Banner / pop-up",
      description:
        "'Sale ends in 24 hours' — the timer keeps restarting on every visit; the 'sale' is permanent.",
    },
  ],
  "price-comparison-prevention": [
    {
      label: "Listing page",
      description:
        "Search results are ranked, filtered, or re-sorted to make competitor prices impossible to find in one view.",
    },
  ],
  "reference-pricing": [
    {
      label: "Strike-through price",
      description:
        "'Was $129, now $59' — the 'was' price is inflated or never actually charged to most buyers.",
    },
  ],

  // ── Social proof ──────────────────────────────────────────────────
  "conflicting-information": [
    {
      label: "Conflicting badges / counts",
      description:
        "'Only 2 left!' displayed next to '20+ in stock' — internal data sources are intentionally mismatched.",
    },
  ],
  "information-without-context": [
    {
      label: "Bare statistic",
      description:
        "'90% of users love this!' — the comparison base, sample size, and definition of 'love' are withheld.",
    },
  ],
  "false-hierarchy": [
    {
      label: "Plan tier list",
      description:
        "A 'Most popular' tier is highlighted even when its actual margin is the highest; the user is steered away from cheaper plans.",
    },
  ],
  "visual-prominence": [
    {
      label: "Primary CTA",
      description:
        "A button is given 5× the size, contrast, and copy emphasis of the 'decline' option next to it.",
    },
  ],
  "persuasive-language": [
    {
      label: "CTA copy",
      description:
        "'Yes, I want to save 50%!' vs. 'No thanks, I prefer to pay full price' — the opt-out is weaponised with shaming language.",
    },
  ],
  "cuteness": [
    {
      label: "Mascot / illustration",
      description:
        "A friendly cartoon face is placed next to a consent dialog to lower the user's critical scrutiny.",
    },
  ],
  "positive-or-negative-framing": [
    {
      label: "Toggle / opt-in copy",
      description:
        "'Get personalised deals' (positive) vs. 'Stop getting personalised deals' (negative) — the wording alone changes opt-in rates.",
    },
  ],
  "choice-overload": [
    {
      label: "Subscription tier grid",
      description:
        "8+ near-identical tiers are shown so the user picks the middle / recommended one rather than comparing them.",
    },
  ],
  "plain-evil": [
    {
      label: "Compound interaction surface",
      description:
        "Multiple controls and framed messages are combined in one product flow; use the condition-specific evidence and live statistics to inspect the mechanism.",
    },
  ],
  "endorsement-and-testimonials": [
    {
      label: "Testimonial cards",
      description:
        "Quotes are attributed to a real customer name + city, but are pulled from marketing copy rather than verified reviews.",
    },
  ],
  "confirmshaming": [
    {
      label: "Opt-out link",
      description:
        "'No thanks, I hate saving money' — the decline option is wrapped in self-deprecating language to guilt the user into opting in.",
    },
  ],
  "psychological-tricks": [
    {
      label: "Anchored price",
      description:
        "An artificial first price is shown large, with the real (smaller) price underneath — the anchor is what the user remembers.",
    },
  ],
  "pressured-selling": [
    {
      label: "Order pressure",
      description:
        "'2,134 sold in the last hour' — synthetic, time-pressured sales metrics with no real-time backing.",
    },
  ],
  "small-or-moving-close-button": [
    {
      label: "Close (×) button",
      description:
        "The dismiss button is shrunk to 6px, has low contrast, or moves away from the cursor on hover.",
    },
  ],
  "bad-defaults-preselection": [
    {
      label: "Newsletter / opt-in checkbox",
      description:
        "Pre-checked boxes for marketing emails, data sharing, or paid add-ons that the user must actively uncheck.",
    },
  ],
  "trick-questions": [
    {
      label: "Opt-out double-negative",
      description:
        "'Uncheck the box if you do NOT want to receive…' — the double negative trips up inattentive readers into opting in.",
    },
  ],
  "wrong-language": [
    {
      label: "Translated copy",
      description:
        "Critical parts of the consent screen (price, auto-renewal clause) are shown in a different language from the rest of the page.",
    },
  ],
  "complex-language": [
    {
      label: "Legal copy",
      description:
        "Conditions are written in 30+ words of legalese that no casual reader will parse ('reoccurring billing cycles…').",
    },
  ],
  "feedforward-ambiguity": [
    {
      label: "Preview text",
      description:
        "'Continue' — the actual consequence of the next step (a paid subscription) is only revealed after the click.",
    },
  ],

  // ── Forced action ─────────────────────────────────────────────────
  "forced-registration": [
    {
      label: "Checkout / continue button",
      description:
        "Disabled until the user creates an account, even when guest checkout is technically possible.",
    },
  ],
  "social-pyramid": [
    {
      label: "Recruit-friends reward",
      description:
        "Unlocks a feature only after inviting N friends, who must in turn invite N more — the user is the bottom of a chain.",
    },
  ],
  "granting-and-interaction": [
    {
      label: "Permission prompt",
      description:
        "Notifications, location, or microphone access is asked in exchange for an unrelated core feature.",
    },
  ],
  "pay-to-play": [
    {
      label: "Featured placement",
      description:
        "Free-tier content is demoted in rankings unless the seller pays for 'boost' — visibility is sold, not earned.",
    },
  ],
  "grinding": [
    {
      label: "Daily progress bar",
      description:
        "Free users must complete 30+ minutes of low-value tasks per day to unlock the next feature tier.",
    },
  ],
  "playing-by-appointment": [
    {
      label: "Energy / stamina bar",
      description:
        "A timer (3h, 6h, 24h) gates the next session; the user is trained to return at specific times.",
    },
  ],
  "watch-ads-to-unlock-features": [
    {
      label: "Ad-watched progress",
      description:
        "Each ad increments a counter; the feature unlocks only after watching 5–10 ads in a row.",
    },
  ],
  "pay-to-avoid": [
    {
      label: "Ad-skip / ad-free button",
      description:
        "The free experience is padded with unavoidable ads; the only way out is a paid subscription.",
    },
  ],
  "automating-the-user-away": [
    {
      label: "Opt-in / 'find duplicates' button",
      description:
        "A bulk action is offered that emails every contact in the user's address book — pre-filled, no per-recipient confirmation.",
    },
  ],
  "parasocial-pressure": [
    {
      label: "Streamer / creator prompt",
      description:
        "'Your favourite streamer uses this!' — a fabricated personal endorsement without disclosure.",
    },
  ],
  "encouraging-anti-social-behavior": [
    {
      label: "Streak / comeback reward",
      description:
        "Rewarding a user for not taking a break pushes them to keep playing through fatigue or distress.",
    },
  ],
  "addictive-design": [
    {
      label: "Variable reward / pull-to-refresh",
      description:
        "A slot-machine loop (random likes, surprise badges) hooks the user with unpredictable micro-rewards.",
    },
  ],
  "addictive-design-infinite-scroll": [
    {
      label: "Infinite feed",
      description:
        "New content is always loaded just before the user reaches the bottom — they can never reach the end of the feed.",
    },
    {
      label: "Loading indicator",
      description:
        "A 'Loading more...' message at the bottom signals that content will continue indefinitely.",
    },
  ],
  "addictive-design-variable-reinforcement": [
    {
      label: "Notification badge",
      description:
        "An animated red badge appears unpredictably, triggering compulsive checking behaviour.",
    },
    {
      label: "Unpredictable timing",
      description:
        "Notifications arrive at random intervals (1-6 seconds), matching a Skinnerian variable ratio schedule.",
    },
  ],
  "addictive-design-hidden-stopping-cues": [
    {
      label: "Missing end-of-content marker",
      description:
        "No 'end of results' or pagination boundary — the user never knows they've seen everything.",
    },
    {
      label: "Hidden progress indicator",
      description:
        "The progress bar and time estimate are removed, so the user cannot gauge how much content remains.",
    },
    {
      label: "Missing pagination",
      description:
        "No page numbers or 'next' button — the user has no structural cue that content is finite.",
    },
  ],
  "infinite-scrolling": [
    {
      label: "Feed",
      description:
        "No 'end of feed' — the user can scroll forever, with no built-in way to stop or reflect on time spent.",
    },
  ],
  "pull-to-refresh": [
    {
      label: "Pull-to-refresh gesture",
      description:
        "Refreshing the feed shows a 'new' set of items that are often the same ones recycled, training compulsive checking.",
    },
  ],
  "countdown-on-ads": [
    {
      label: "Ad countdown",
      description:
        "An ad cannot be skipped for N seconds; the reward is gated on waiting for the timer to finish.",
    },
  ],
  "auto-play": [
    {
      label: "Auto-playing video",
      description:
        "The next video starts immediately after the previous one, with no natural pause and no clear off switch.",
    },
  ],  "immortal-accounts-condition-1": [
    {
      label: "Absolute Absence of Deletion Vectors",
      description: "The dismissal vector (close button, X, escape handler) is completely absent from the interface.",
    },
  ],

};
