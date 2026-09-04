## Error inventory (instances where any arm disagreed with ground truth)

Total disagreements: **160** across **129** distinct instances
| Instance | Variant | Layer | Truth | Agent | Arm | Conf | Justification (first 120 chars) |
|---|---|---|---|---|---|---|---|
| inst-0005 | B | 2 | False | agent-02 | c0 | 0.91 | Multiple tracking and profiling consents are checked by default in a flat privacy list, with no visible single-action re |
| inst-0005 | B | 2 | False | agent-02 | c1 | 0.9 | Deceptive: multiple privacy-invasive controls are checked before any captured user action and are presented with technic |
| inst-0006 | A | 3 | True | agent-10 | c0 | 0.98 | The checkout openly labels an optional $2 donation, shows it as selected, includes it in the displayed total, and offers |
| inst-0009 | B | 2 | False | agent-02 | c1 | 0.9 | Deceptive: the checkbox's programmatic accessible label says Opt me out of the newsletter while its visible label says K |
| inst-0012 | A | 3 | True | agent-02 | c0 | 0.98 | The guest route is plainly available, account creation is explicitly optional, and no account-related benefit or penalty |
| inst-0013 | A | 2 | True | agent-05 | c1 | 0.82 | BENIGN on observed evidence: the trace demonstrates ordinary expandable settings navigation, but it never reaches or hid |
| inst-0016 | A | 3 | True | agent-05 | c0 | 0.96 | Tracking is disclosed in plain language and acceptance and refusal are presented as two comparable full-width buttons. |
| inst-0016 | A | 3 | True | agent-05 | c1 | 0.91 | BENIGN: Tracking consent is presented as two equal-weight, mutually exclusive choices with no preselected state or captu |
| inst-0020 | A | 3 | True | agent-01 | c0 | 0.94 | The invitation names the three selected recipients before sending and confirms the same recipients afterward, without a  |
| inst-0022 | A | 3 | True | agent-09 | c1 | 0.94 | BENIGN: state and action labels match on every transition; Trick Questions fails. |
| inst-0023 | B | 3 | False | agent-02 | c1 | 0.78 | Deceptive: the upgrade card uses social-proof and scarcity framing while presenting those persuasive claims as neutral f |
| inst-0025 | B | 3 | False | agent-02 | c1 | 0.86 | Deceptive: the bundle advertises camera, lens, and case contents but gives the bundled lens only a minimal description w |
| inst-0027 | B | 1 | False | agent-03 | c1 | 0.82 | DECEPTIVE: Hidden Information #3 fires because material privacy and terms language is absent in collapsed states and app |
| inst-0030 | A | 1 | True | agent-09 | c1 | 0.58 | BENIGN on observable evidence under E5: moving-X behavior is asserted but not demonstrated. |
| inst-0033 | B | 1 | False | agent-03 | c1 | 0.95 | DECEPTIVE: Forced Registration #1, #2, and #3 fire. A one-time $89 order is blocked behind account creation, the guest p |
| inst-0036 | B | 3 | False | agent-04 | c0 | 0.8 | Premium and Premium Plus have different monthly prices but identical visible benefits despite copy saying the listed fea |
| inst-0039 | B | 1 | False | agent-04 | c0 | 0.95 | The product uses an unsubstantiated crossed-out reference price and a ‘2 people are viewing this right now’ social-proof |
| inst-0040 | A | 2 | True | agent-08 | c1 | 0.91 | BENIGN: Although the bonus checkbox starts checked, its semantic consequence is a user-favorable $10 reward rather than  |
| inst-0043 | A | 3 | True | agent-07 | c1 | 0.9 | No deceptive condition is observed in the static download page. The source domain, version, size, and action are explici |
| inst-0045 | A | 2 | True | agent-04 | c0 | 0.8 | The warranty is visibly listed as a separate $19.99 cart item and the total is correct; preselection and removal mechani |
| inst-0045 | A | 2 | True | agent-04 | c1 | 0.61 | BENIGN by preponderance with E5: the cart contains a warranty, but the single-state trace does not expose whether it was |
| inst-0047 | B | 2 | False | agent-03 | c1 | 0.84 | DECEPTIVE: Forced Registration #2 and its semantic framing condition fire. Guest checkout remains available, but it is a |
| inst-0050 | A | 1 | True | agent-01 | c0 | 0.96 | The notification badge and Open inbox action are generic but do not request sensitive information, assert false urgency, |
| inst-0050 | A | 1 | True | agent-01 | c1 | 0.91 | BENIGN. Playing By Appointment conditions do not fire: the interface merely states schedule information and does not sho |
| inst-0055 | B | 2 | False | agent-02 | c1 | 0.91 | Deceptive: the interface makes an unqualified numeric demand claim, 128 people are viewing this, with no temporal or geo |
| inst-0059 | B | 3 | False | agent-01 | c0 | 0.65 | The data-use explanation is generic, the referenced processing notice is not visibly available for review, and the appar |
| inst-0060 | A | 3 | True | agent-01 | c0 | 0.98 | The user selects three named contacts and the send confirmation repeats that exact recipient set and source profile. |
| inst-0060 | A | 3 | True | agent-01 | c1 | 0.9 | BENIGN. Pull To Refresh variable-reward conditions do not fire: refresh results are explicitly deterministic and unchang |
| inst-0070 | B | 3 | False | agent-01 | c0 | 0.96 | Account creation bundles extensive advertising and analytics sharing with privacy-policy agreement, provides no separate |
| inst-0070 | B | 3 | False | agent-01 | c1 | 0.84 | DECEPTIVE. Parasocial Pressure #1 and #3 are observed: the pet-centered pitch says Pip is counting on the user to buy, t |
| inst-0071 | B | 2 | False | agent-01 | c1 | 0.95 | DECEPTIVE. Granting and Interaction #2 fires: after Play live stream, a notification permission overlay is injected at t |
| inst-0072 | A | 2 | True | agent-05 | c1 | 0.9 | BENIGN: Cancellation is a visible, equal-weight choice with a confirmation step and a clear end-of-period consequence. T |
| inst-0073 | B | 1 | False | agent-07 | c0 | 0.99 | The displayed total and irreversible purchase button are $89, while the visible line items sum to only $84, leaving an u |
| inst-0073 | B | 1 | False | agent-07 | c1 | 0.98 | The flow explicitly mismatches the stated friend-finding purpose with immediate mass marketing invitations: 24 contacts  |
| inst-0074 | A | 3 | True | agent-06 | c0 | 0.99 | The data-sharing purpose is stated before consent, the checkbox is unchecked, and the create action is disabled until ac |
| inst-0075 | A | 2 | True | agent-01 | c0 | 0.98 | The flight checkout keeps the all-inclusive total and fee breakdown stable through the stages and matches the final Pay  |
| inst-0077 | A | 1 | True | agent-06 | c0 | 0.9 | The optional recurring plan is explicitly labeled, priced, and paired with an equally prominent no-thanks action without |
| inst-0080 | A | 2 | True | agent-08 | c0 | 0.95 | Most content is paywalled despite being installed locally, but the hub visibly marks locked items and their identical $7 |
| inst-0083 | A | 1 | True | agent-05 | c1 | 0.89 | BENIGN: Referral rewards remain flat and concrete. All tiers display intensity 1 and plain benefits; no nonlinear semant |
| inst-0086 | A | 2 | True | agent-07 | c1 | 0.9 | The renewal terms are disclosed directly beside the trial CTA in readable text, so E2 applies. The later state preserves |
| inst-0087 | B | 1 | False | agent-01 | c0 | 0.99 | Acceptance is a large primary button while rejection is reduced to a tiny underlined text link, creating unequal effort  |
| inst-0088 | A | 2 | True | agent-07 | c1 | 0.92 | The ad interruption is clearly labeled, the four-second duration is visible, and the interface supplies a visible Skip a |
| inst-0089 | A | 3 | True | agent-04 | c1 | 0.9 | BENIGN: Reference Pricing conditions are not met as a deceptive anchor; the displayed PLN 299 to PLN 199 calculation is  |
| inst-0090 | A | 2 | True | agent-06 | c0 | 0.76 | The evidence shows a repeated article feed with readable article titles and metadata but no explicit false claim, hidden |
| inst-0096 | B | 1 | False | agent-01 | c0 | 0.88 | The paid trial is visually favored, the free option uses loss-oriented wording, and a limited-offer badge and ambiguous  |
| inst-0096 | B | 1 | False | agent-01 | c1 | 0.91 | DECEPTIVE. Drip Pricing #1 and #3 fire: the initial state advertises $19 per night without mandatory fees, then the revi |
| inst-0101 | A | 2 | True | agent-04 | c0 | 0.7 | The ten-ad requirement and progress are explicit, and the claim control is disabled below completion; the generic ‘Almos |
| inst-0101 | A | 2 | True | agent-04 | c1 | 0.64 | BENIGN by E5/partial evidence: three labeled security options are visible, but no target action, hidden route, or multi- |
| inst-0103 | B | 3 | False | agent-07 | c1 | 0.95 | The account setup visibly preselects activity-data sharing with advertising partners and saves it without any shown affi |
| inst-0115 | A | 3 | True | agent-09 | c1 | 0.94 | BENIGN: reward progression is fixed and explicitly predictable; no variable-ratio trap is observed. |
| inst-0116 | A | 1 | True | agent-02 | c1 | 0.72 | Benign on observed evidence: the checkbox is unchecked and no event shows a silent opt-in or adverse consequence; O5 is  |
| inst-0117 | B | 2 | False | agent-09 | c0 | 0.99 | An optional 19.99 extended warranty is included in the initial cart total and must be explicitly declined to return to t |
| inst-0125 | A | 1 | True | agent-07 | c0 | 0.95 | The resource mechanic visibly states the five-unit energy limit, harvest increment, and 30-minute refill, with the four  |
| inst-0125 | A | 1 | True | agent-07 | c1 | 0.95 | The free trial clearly discloses its duration, recurring price, payment method, and cancellation path, then requests exp |
| inst-0128 | A | 1 | True | agent-01 | c0 | 0.88 | This is ordinary dashboard navigation with a visible Settings destination; the note that Messages lacks account deletion |
| inst-0129 | A | 3 | True | agent-02 | c0 | 0.99 | The donation choice is explicit and the accept and decline buttons are comparably prominent, with no emotional penalty a |
| inst-0129 | A | 3 | True | agent-02 | c1 | 0.88 | Benign: cancellation is directly labeled, visible, and offered beside an equally prominent keep action; the observed int |
| inst-0133 | A | 2 | True | agent-07 | c0 | 0.96 | The bundle total and item list are explicit, the add-to-cart transition is acknowledged, and removal is available; there |
| inst-0135 | A | 1 | True | agent-04 | c1 | 0.88 | BENIGN: Countdown Timer O1 does not show a reset; the observed timer decreases from 04:59 to 04:58 and payment completes |
| inst-0140 | B | 2 | False | agent-02 | c1 | 0.96 | Deceptive: activity notifications assert likes, views, and comments while lacking any identity reference or navigable ac |
| inst-0141 | A | 2 | True | agent-08 | c0 | 0.99 | The active subscription, renewal timing, recurring $14.99 monthly price, and masked payment method are plainly shown and |
| inst-0141 | A | 2 | True | agent-08 | c1 | 0.82 | BENIGN on the observed evidence: the renewal warning is concrete, visible, and advances monotonically from 7 to 4 days;  |
| inst-0144 | A | 2 | True | agent-10 | c0 | 0.98 | The cancellation entry point, confirmation question, consequence, affirmative cancellation action, retention action, and |
| inst-0144 | A | 2 | True | agent-10 | c1 | 0.82 | The reader uses explicit previous/next page controls and alternates between page content; no autonomous infinite feed or |
| inst-0147 | A | 1 | True | agent-02 | c1 | 0.9 | Benign: the rental price is disclosed as a one-time $3.99 charge and a 44px Later dismissal control is present, so no hi |
| inst-0148 | A | 3 | True | agent-01 | c0 | 0.98 | The selected default is the free cheapest shipping tier, the paid alternative is clearly priced, and the only checked no |
| inst-0148 | A | 3 | True | agent-01 | c1 | 0.84 | BENIGN. Countdown On Ads conditions are not observed: although the ad shows 15s, the close control is present and the te |
| inst-0149 | A | 3 | True | agent-10 | c1 | 0.9 | Account deletion is directly visible in settings in both captures; no absence, deep path, or visual demotion of the exit |
| inst-0150 | A | 2 | True | agent-03 | c1 | 0.74 | BENIGN on the observable evidence, with E5 caution. The initial newsletter subscription CTA is clear, but the later disa |
| inst-0151 | A | 1 | True | agent-02 | c1 | 0.93 | Benign: energy decreases exactly one unit per explicit harvest action and the interface states the user decides when to  |
| inst-0155 | A | 1 | True | agent-10 | c1 | 0.76 | Although the copy is urgent, the observed hue is 210°, outside the formal 0°–45° range; the diagnostic explicitly says t |
| inst-0160 | B | 2 | False | agent-09 | c0 | 0.98 | The displayed 98 percent five-star statistic cannot correspond exactly to a whole-number count of twelve reviews, making |
| inst-0161 | A | 2 | True | agent-04 | c0 | 0.9 | This is a balanced settings landing page with no preselected permission, unequal consent buttons, or account-creation pr |
| inst-0161 | A | 2 | True | agent-04 | c1 | 0.64 | BENIGN by E5/partial evidence: the single screen exposes three labeled security controls, but no interaction path or hid |
| inst-0163 | A | 1 | True | agent-04 | c1 | 0.9 | BENIGN: Choice Overload condition 1 does not fire because the visible decision context contains eight policies, below th |
| inst-0165 | B | 1 | False | agent-10 | c1 | 0.88 | A sponsored ad interrupts the requested video, but the flow is explicitly skippable immediately; the deceptive element i |
| inst-0167 | A | 2 | True | agent-07 | c0 | 0.92 | The content is visibly paywalled with a disclosed per-episode price, season price, explicit unlock action, and a small b |
| inst-0167 | A | 2 | True | agent-07 | c1 | 0.94 | The auto-renewal is disclosed before activation with a concrete price and duration, and the later state confirms the use |
| inst-0168 | A | 3 | True | agent-01 | c0 | 0.88 | Unit-price information is missing, but the listing explicitly identifies that limitation and shows both sizes and headli |
| inst-0168 | A | 3 | True | agent-01 | c1 | 0.91 | BENIGN. Bad Defaults / Preselection does not fire: the preselected Standard delivery is explicitly the cheapest and user |
| inst-0173 | B | 3 | False | agent-09 | c0 | 0.88 | A single required-looking checkbox bundles Terms, Privacy, and third-party data sharing, so accepting the service appear |
| inst-0177 | A | 1 | True | agent-04 | c0 | 0.82 | The interface is repetitive gamification with some motivational language, but progress, rewards, and available forging a |
| inst-0189 | B | 1 | False | agent-02 | c1 | 0.84 | Deceptive: the offer repeatedly uses vague, high-arousal limited-time language without a concrete deadline or timer, sat |
| inst-0196 | A | 3 | True | agent-06 | c0 | 0.78 | The notice is dense and legalistic, but it is presented before an unchecked acknowledgment and the account action is gat |
| inst-0198 | A | 2 | True | agent-01 | c0 | 0.83 | The reward diminishes, but the interface labels that mechanic and exposes the actual progress and last-action increments |
| inst-0198 | A | 2 | True | agent-01 | c1 | 0.93 | BENIGN. Immortal Accounts #1 and #2 do not fire on the observed comparison: sign-up is one click and Delete account is v |
| inst-0199 | B | 3 | False | agent-04 | c0 | 0.95 | The offer uses a strong same-day deadline and a large 50% anchor without showing the underlying prices, eligibility, exc |
| inst-0199 | B | 3 | False | agent-04 | c1 | 0.9 | DECEPTIVE: Addictive Design condition 3 fires from dense streak, level-up, spin, daily-bonus, and reward language, reinf |
| inst-0200 | A | 2 | True | agent-04 | c1 | 0.94 | BENIGN: Intermediate Currency’s real-cost disclosure condition is refuted by the visible $45.00 equivalence, and no mand |
| inst-0204 | A | 2 | True | agent-07 | c1 | 0.95 | The trial conversion is not forced: renewal timing and price are disclosed, cancellation is available before expiry and  |
| inst-0205 | B | 3 | False | agent-06 | c1 | 0.94 | Bad Defaults fires directly under O5: both marketing and partner-data-sharing checkboxes are checked before interaction, |
| inst-0209 | A | 1 | True | agent-02 | c1 | 0.98 | Benign: the footer is directly reachable after four sections and remains stationary, refuting the unreachable-footer and |
| inst-0211 | A | 2 | True | agent-05 | c0 | 0.93 | The add-ons are described as optional at $2 each, all options are shown, and the confirmation count reflects selection r |
| inst-0211 | A | 2 | True | agent-05 | c1 | 0.9 | BENIGN: Stock, pricing, shipping, and returns are plainly disclosed; 8 units is not a low-stock alarm and no cross-state |
| inst-0212 | B | 3 | False | agent-03 | c1 | 0.94 | DECEPTIVE: Forced Registration #1 and #3 fire. The flow explicitly blocks guest checkout, requires account creation to c |
| inst-0215 | A | 1 | True | agent-06 | c0 | 0.82 | The plan names, prices, capacities, and feature differences are all visible; the Most popular badge is persuasive but no |
| inst-0218 | B | 1 | False | agent-03 | c0 | 0.84 | The card combines unsubstantiated social-proof claims with an ambiguous post-cart state. |
| inst-0219 | A | 2 | True | agent-07 | c1 | 0.94 | The warranty offer is clearly priced and optional, with equal-weight Add and No thanks controls and a direct confirmatio |
| inst-0229 | A | 3 | True | agent-02 | c1 | 0.94 | Benign: stock remains stable across the interaction and is explicitly tied to inventory updates; O2 is negative and the  |
| inst-0234 | A | 2 | True | agent-01 | c0 | 0.99 | The promotional content is visibly segregated from editorial material and explicitly labeled as a sponsored third-party  |
| inst-0234 | A | 2 | True | agent-01 | c1 | 0.88 | BENIGN. Complex Language does not sufficiently fire because the financially adverse clause is surfaced, visually emphasi |
| inst-0236 | B | 2 | False | agent-07 | c1 | 0.96 | Cancellation technically exists but is intentionally rendered at roughly 1% of the retention action’s prominence. This f |
| inst-0238 | B | 1 | False | agent-02 | c1 | 0.99 | Deceptive: a prominent native-looking Download Now action routes to a different sponsored domain while the direct downlo |
| inst-0243 | A | 1 | True | agent-01 | c0 | 0.96 | The free month, automatic $49.99 monthly renewal, and the relevant clause are repeatedly surfaced directly above the agr |
| inst-0243 | A | 1 | True | agent-01 | c1 | 0.87 | BENIGN. Disguised Ad conditions are not sufficiently observed: the sponsored unit is labeled Sponsored and ad · third-pa |
| inst-0244 | A | 1 | True | agent-04 | c1 | 0.94 | BENIGN: Pre-Delivered Content condition 1 fails because the premium add-on checkbox is unchecked and the DOM says assets |
| inst-0247 | B | 3 | False | agent-05 | c1 | 0.92 | DECEPTIVE: Choice Overload’s excessive quantization condition fires with 30 actionable add-on buttons in one decision co |
| inst-0248 | A | 1 | True | agent-03 | c1 | 0.94 | BENIGN: Reduced Friction is refuted by explicit confirmation and disclosure. The recurring purchase has a clear confirma |
| inst-0249 | A | 3 | True | agent-06 | c0 | 0.78 | The uncertain refresh reward is openly described as uncertain and cost-free in the evidence; the design may encourage re |
| inst-0250 | B | 2 | False | agent-02 | c1 | 0.98 | Deceptive: the displayed item prices total $84 but the interface displays and charges $89 without a visible mandatory-fe |
| inst-0251 | A | 2 | True | agent-09 | c1 | 0.9 | BENIGN: eight listed policies do not exceed the formal >20 choice-overload threshold. |
| inst-0252 | A | 3 | True | agent-10 | c0 | 0.95 | The referral tiers state their invite thresholds and rewards directly, with no fake urgency, hidden cost, or ambiguous c |
| inst-0252 | A | 3 | True | agent-10 | c1 | 0.74 | Referral tiers are visible, but no core utility is blocked and no evidence establishes a referral-gated threshold or non |
| inst-0256 | B | 1 | False | agent-05 | c1 | 0.86 | DECEPTIVE: Parasocial Pressure’s manufactured livelihood dependency condition fires. The stream states that failure to r |
| inst-0257 | B | 2 | False | agent-10 | c0 | 0.88 | The cookie prompt combines broad consent-by-continuing language with an accept-all action that is more prominent than th |
| inst-0258 | A | 2 | True | agent-02 | c1 | 0.95 | Benign: the bundle breakdown is complete, mathematically consistent, and available before purchase, while the post-add s |
| inst-0263 | B | 3 | False | agent-07 | c1 | 0.98 | The interface shows 27 units in the underlying/displayed stock panel but presents ‘Only 2 left!’ in an alarm-colored pul |
| inst-0265 | A | 3 | True | agent-04 | c1 | 0.95 | BENIGN: Auto-Play condition 1 fails because playback starts only after Press to play, and the opt-in label remains visib |
| inst-0268 | B | 2 | False | agent-10 | c0 | 0.9 | The cookie modal uses broad ‘By continuing you agree’ consent wording and gives Accept all stronger treatment than the t |
| inst-0269 | B | 3 | False | agent-07 | c1 | 0.9 | The privacy interface visibly prechecks advertising and profiling controls and hides them when the accordion collapses.  |
| inst-0272 | B | 2 | False | agent-04 | c0 | 0.92 | Although accept and decline are visually balanced, the free-trial prompt omits the recurring price, payment requirement, |
| inst-0273 | B | 1 | False | agent-05 | c1 | 0.86 | DECEPTIVE: Privacy Zuckering’s visual asymmetry condition fires. Advertising-partner sharing is enabled in a prominent r |
| inst-0275 | B | 3 | False | agent-04 | c0 | 0.97 | The signup screen foregrounds a $0.00 30-day trial while omitting the post-trial price, automatic-renewal terms, first c |
| inst-0276 | A | 1 | True | agent-02 | c1 | 0.68 | Benign on the observable record: the promotional claim may be unsubstantiated, but the close control is directly availab |
| inst-0277 | A | 1 | True | agent-10 | c1 | 0.82 | Playback begins only after an explicit Play click, which the event log records; autonomous execution is not observed. |
| inst-0278 | B | 1 | False | agent-06 | c1 | 0.78 | Positive/Negative Framing and choice asymmetry are observed: the preferred discount is visually and semantically positiv |
| inst-0282 | B | 2 | False | agent-09 | c1 | 0.91 | DECEPTIVE: ten completed rewarded ads gate the 1080p export (Watch Ads To Unlock #1). |
| inst-0287 | A | 1 | True | agent-10 | c0 | 0.86 | The feed plainly labels three posts and provides a direct refresh control. The wording ‘Hold to pull down’ versus ‘Pull  |
| inst-0287 | A | 1 | True | agent-10 | c1 | 0.68 | Only one static state shows a clearly labeled user-initiated pull control; no artificial delay, variable reward, or mani |
| inst-0289 | B | 2 | False | agent-08 | c0 | 0.99 | The free path already makes the document readable, yet the UI sells $1.99 removal of a delay and later admits the paymen |
| inst-0291 | B | 3 | False | agent-08 | c0 | 0.99 | The optional claim for a welcome bonus is prechecked, so the interface opts the user in before an affirmative choice. |
| inst-0295 | A | 3 | True | agent-08 | c0 | 0.96 | The user’s goal is stated as account deletion, the destination is visible from the first menu, and breadcrumbs and step  |
| inst-0295 | A | 3 | True | agent-08 | c1 | 0.58 | BENIGN under the unchanged formal conditions. The evidence shows a multi-state menu with several generic intermediate la |
| inst-0301 | B | 1 | False | agent-02 | c1 | 0.82 | Deceptive: unit prices are visually subordinate and the post-action message says comparison is unavailable even though b |
| inst-0308 | B | 1 | False | agent-04 | c1 | 0.86 | DECEPTIVE: Auto-Play condition 3 fires because the next episode is described as seamless continuation with a three-secon |
| inst-0311 | A | 1 | True | agent-01 | c1 | 0.84 | BENIGN. Information Without Context does not fire: the notification count 1 is spatially and semantically paired with Ne |
| inst-0316 | A | 3 | True | agent-05 | c1 | 0.92 | BENIGN: The offer has moderate discounting, explicit stock, shipping, and return disclosure, and no manufactured panic.  |
| inst-0318 | A | 1 | True | agent-03 | c0 | 0.78 | The destructive action is explicitly named and warned as irreversible, with a clearly labeled equally prominent keep opt |
| inst-0318 | A | 1 | True | agent-03 | c1 | 0.9 | BENIGN: Forced Continuity conditions are refuted by O4 and E2. The renewal amount, payment method, seven-day timing, and |
| inst-0322 | B | 2 | False | agent-08 | c1 | 0.9 | DECEPTIVE: Automatic Accept Third Party Term #1 fires: continuing accepts usage-data sharing with all listed third parti |
| inst-0323 | A | 3 | True | agent-01 | c0 | 0.96 | The trial duration, no-charge timing, and subsequent monthly price are all stated together before activation and match t |
| inst-0323 | A | 3 | True | agent-01 | c1 | 0.88 | BENIGN. Choice Overload conditions do not fire: the captured decision interface presents only two clear, materially diff |
| inst-0325 | B | 1 | False | agent-09 | c1 | 0.72 | DECEPTIVE with limited confidence: observed paid path requires account creation and shows no guest route (Forced Registr |
| inst-0328 | A | 1 | True | agent-05 | c0 | 0.97 | The pre-roll is clearly marked as sponsored and presents an explicit countdown and skip status rather than disguising th |
| inst-0330 | B | 3 | False | agent-03 | c0 | 0.88 | The checkout bundles terms and privacy acceptance, inconsistently discloses data processing, and leaves an enabled-looki |
| inst-0331 | A | 3 | True | agent-04 | c0 | 0.74 | Ad escalation creates a monetization nudge, but each duration is stated for its episode and the escalation is explained  |
| inst-0332 | A | 1 | True | agent-10 | c0 | 0.97 | The reader presents ordinary content with visible previous/next navigation and an explicit continue-reading prompt. Repe |
| inst-0337 | B | 1 | False | agent-09 | c0 | 0.99 | A flashlight advertised as entirely local requests permission to upload contacts to servers even though the user can use |
| inst-0337 | B | 1 | False | agent-09 | c1 | 0.92 | DECEPTIVE: deletion is delayed 30 days and login cancels it (Forced Grace Period #1/#3). |
| inst-0341 | A | 1 | True | agent-10 | c0 | 0.97 | The watchlist clearly distinguishes queued from now playing, records the user’s Play click, and shows the current episod |
| inst-0341 | A | 1 | True | agent-10 | c1 | 0.82 | The user clicks Play explicitly before media starts; the event log provides direct evidence against autonomous action ex |
| inst-0344 | A | 2 | True | agent-06 | c0 | 0.76 | Deletion is visually subordinate, but it remains a direct, labeled control in account settings and the evidence does not |
| inst-0346 | A | 2 | True | agent-08 | c0 | 0.78 | The referral requirement is explicit as 0/2 and the two sharing actions are visible; the reward is vague, but the eviden |
| inst-0349 | B | 2 | False | agent-08 | c0 | 0.98 | The offer combines an unexplained 90% price anchor with Limited stock and Buy now urgency, and the later diagnostic call |
| inst-0352 | B | 1 | False | agent-10 | c0 | 0.99 | The cart contains a $19.99 warranty and $8.99 express shipping alongside the product even though the preceding product s |
| inst-0356 | B | 3 | False | agent-09 | c0 | 0.8 | Autoplay is already enabled and the next episode is starting in seconds; although a switch exists, the screen foreground |
| inst-0356 | B | 3 | False | agent-09 | c1 | 0.87 | DECEPTIVE: next-episode playback is scheduled automatically with autoplay enabled (Auto-Play #1). |
| inst-0357 | B | 1 | False | agent-09 | c0 | 0.96 | The quest promises energy for a six-second ad but the ad state says it is skippable after one second, creating a direct  |
| inst-0357 | B | 1 | False | agent-09 | c1 | 0.82 | DECEPTIVE: level access is gated on earning Energy through an ad (Watch Ads To Unlock #1). |
| inst-0372 | A | 3 | True | agent-03 | c1 | 0.85 | BENIGN: Infinite Scrolling's autonomous-injection and unreachable-footer conditions are not observed. The feed uses an e |
