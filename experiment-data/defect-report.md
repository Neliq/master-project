# Corpus construct-validity defects (from run-3 blind audit)


## FN2_A: 24 instances — A variant does NOT exhibit the pattern (both arms benign — pattern missing/too subtle/honest-looking)

### inst-0007 information-without-context cond2 variant A
- c0: False conf=0.7 | Review stat is accurately qualified: '98% of 12 customer reviews rate this product 5 stars' discloses the small sample size; no fabricated review counts.
- c1: False conf=0.7 | Information Without Context#3 fails: '98%' is anchored with unit AND denominator ('of 12 customer reviews… 5 stars') in the same cluster; Endorsement#1: sample size n=12 disclosed, no fabricated distribution claim.

### inst-0023 small-or-moving-close-button cond3 variant A
- c0: False conf=0.6 | 'You've been selected!' banner is marketing puffery, but the escape is explicit and honest: 'Prefer not to? Just use the button below the text — it will take you where you need to go', and the button is labeled 'Continue reading'.
- c1: False conf=0.65 | No ontology condition fully fires: dismissal vector present and functional ('Continue reading'), no fabricated metric, no trapped state (Dead End#1/#2 fail); 'You've been selected!' is puffery — Persuasive Language#3 (satisfiable, non-contradictory) holds.

### inst-0031 pull-to-refresh cond1 variant A
- c0: False conf=0.7 | Pull-to-refresh requires a deliberate hold to the disclosed 80px threshold with progress bar; early release yields no result (prevents accidental triggers). Mechanic fully disclosed, no fake failure.
- c1: False conf=0.75 | Pull To Refresh #3 (variable-ratio novelty) not met: feed content is static across states (no novel payloads, deterministic outcome); the 80px commitment threshold and elastic-resistance behavior are explicitly disclosed with a progress bar — no artificial anticipation.

### inst-0037 encouraging-anti-social-behavior cond2 variant A
- c0: False conf=0.6 | Math battle game with scoreboard and loss-aversion text ('loser gets demoted'); gamification pressure but no falsified claims, hidden costs, or forced actions evident.
- c1: False conf=0.6 | Encouraging Anti-Social Behavior: §1 (reward-coupled externality) not triggered — no invites/referrals; §2 competitive split is the game's core mechanic (1v1 math battle), not a manipulation for social extraction; no fabricated metric or hidden cost; loss-aversion text is mild gamification.

### inst-0042 positive-or-negative-framing cond1 variant A
- c0: False conf=0.85 | Welcome offer presents two clearly-labeled radio choices: claim 20% discount (save $24) or skip and pay full $120; both prices disclosed, decline option plainly worded.
- c1: False conf=0.85 | Bad Defaults #1 not met (no radio pre-checked); Confirmshaming #1 not met (decline is a real <label><input type=radio> with full structural affordance, not a bare link); both outcomes fully priced/disclosed so Positive Framing asymmetry is cosmetic only.

### inst-0043 false-hierarchy cond3 variant A
- c0: False conf=0.6 | Tracking consent dialog with a clear binary choice ('I accept tracking' / 'No, I don't accept tracking'); wording is honest and both options are full-width buttons; accept is slightly more prominent (filled vs outline) but no misleading copy, no guilt, no hidden terms.
- c1: False conf=0.65 | Privacy Maze checks: reject path depth == accept path depth (both on first screen), no FKGL>14, no preselect; decline button is full-width and clearly worded ('No, I don't accept tracking') — no ontology condition fires.

### inst-0068 disguised-ad cond2 variant A
- c0: False conf=0.9 | News feed where the ad card is clearly labeled 'AD' and 'Sponsored'; genuine editorial content kept separate.
- c1: False conf=0.9 | Disguised Ad checks fail: the ad card is explicitly labeled 'AD' and 'Sponsored' with clear container separation — no cross-origin action masking, no morphological/semantic masquerade of native actions.

### inst-0077 automating-the-user-away cond1 variant A
- c0: False conf=0.6 | Autoplay next is ON with no local toggle, but this is transparently disclosed ('managed in Settings — no toggle here'; 'Autoplay is controlled by the system'). No manipulation.
- c1: False conf=0.65 | Auto-Play check: playback only after explicit click ('User clicked Play'); 'Autoplay next: ON' is disclosed in visible text ('Autoplay' literal present), so pattern 3 (semantic framing w/o disclosure) does not trigger; no countdown/urgency. Benign.

### inst-0078 false-hierarchy cond1 variant A
- c0: False conf=0.85 | Cookie banner: 'You can choose how we process your data' with equal 'Accept all cookies' and 'Reject all' buttons, unchanged across states — genuine choice.
- c1: False conf=0.85 | Privacy Maze checks fail: 'Accept all cookies' and 'Reject all' are equal buttons, d(reject)=d(accept)=1; no prominence disparity, no obfuscation — genuine choice.

### inst-0086 intermediate-currency cond2 variant A
- c0: False conf=0.7 | Premium skin priced in gems with real dollar equivalent disclosed ('about $45.00', magnify reveals 'the real price, shown at base size') and explicitly 'Cosmetic only — no stat changes' — price not hidden, no pay-to-win.
- c1: False conf=0.7 | Intermediate Currency #2 not met: real-price disclosure 'about $45.00' is present in-viewport and magnify reveals it 'at base size' (not <50% font); 'Cosmetic only — no stat changes' is an honest utility disclosure; 'LIMITED' alone is insufficient lexeme density for FOMO #3.

### inst-0121 bundling cond2 variant A
- c0: False conf=0.85 | Bundle pricing is transparent: $1199 vs $1297 if bought separately with full component breakdown ($899+$349+$49) shown and collapsible — genuine savings, no hidden fees.
- c1: False conf=0.85 | Bundling #2 not met: individual component prices ($899/$349/$49) are fully rendered with a breakdown section and toggle; Bundling #1 not met (no hidden forced item — bundle is a single disclosed SKU with savings math shown).

### inst-0127 reduced-friction cond1 variant A
- c0: False conf=0.85 | Honest one-time license purchase: $79.00 billed once, no subscription/renewal, card shown, and the no-review-step charging behavior is explicitly disclosed.
- c1: False conf=0.85 | Reduced Friction §3: NOT triggered — 'No review step — your card is charged instantly' is explicit feedforward disclosure, not concealment; one-time $79.00 with no renewal (Forced Continuity absent); no hidden fees.

### inst-0145 conflicting-information cond2 variant A
- c0: False conf=0.95 | Gym membership cancellation is the primary prominent action; 'cancel anytime' disclosed; no retention tricks.
- c1: False conf=0.95 | Immortal Accounts checks fail: deletion ('Cancel my membership') is the primary prominent button (no asymmetry, no absence of exit vector); 'cancel anytime' disclosed.

### inst-0162 low-stock cond2 variant A
- c0: False conf=0.65 | 'Only 2 left!' low-stock badge is backed by a live stock feed that consistently reports 2 units across refreshes, so the scarcity claim appears genuine rather than fabricated.
- c1: False conf=0.65 | Low Stock #1: no fabrication detected — 'Live stock feed — backend source' consistently reports 2 units across 4 refreshes; #2's alarm hue (12°) is warranted by genuinely low, stable stock (ΔStock=0 across refreshes = consistency, not manipulation); refresh counter exposes the live source.

### inst-0191 friend-spam cond1 variant A
- c0: False conf=0.7 | Contacts permission request clearly labeled 'Read-only' and explains matching purpose; after grant it shows 'Access granted'. Transparent and honest.
- c1: False conf=0.8 | Address Book Leeching §1 (Utility-Permission Decoupling): NOT triggered — contact matching is the app's core stated utility, so Dep(I_core,P)≠∅; request labeled 'Read-only' and confirmed by 'Connected'/'Access granted' state; no invite-all or granularity violation.

### inst-0198 choice-overload cond2 variant A
- c0: False conf=0.9 | Optional add-on channel picker; all 30 options shown, each priced $2/mo, nothing pre-selected (button reads 'Add 0 add-ons'), honest wording.
- c1: False conf=0.92 | Bad Defaults 1: no toggle/option checked at t0 ('Add 0 add-ons' disabled); Bundling 1: no forced inclusion; all 30 add-ons disclosed at $2/mo with 'review them all' — no ontology condition fires.

### inst-0251 choice-overload cond3 variant A
- c0: False conf=0.7 | Car insurance comparison with 8 policies; prices and policy details (excess, breakdown, courtesy car) disclosed in expandable fine-print sections; no preselection or hidden terms found.
- c1: False conf=0.72 | No ontology trigger fires: policy terms (excess, breakdown, courtesy car) disclosed in expandable details for all 8 policies; no preselection (Bad Defaults §1 not triggered); no hidden fees; 'Most popular' badge is not a decoy since pricing aligns with benefits.

### inst-0261 forced-continuity cond3 variant A
- c0: False conf=0.8 | Honest free-trial signup: '30-day free trial, Cancel anytime', card shown, '$0.00 for 30 days' stated upfront; simple friendly copy, no hidden auto-renewal trap visible.
- c1: False conf=0.85 | Forced Continuity#2 fails: 'Cancel anytime' and '$0.00 for 30 days' disclosed at signup (feedforward present); Reduced Friction#3 fails: reversibility language present; FKGL≈4.9 (annotation) — no Complex Language.

### inst-0273 pull-to-refresh cond2 variant A
- c0: False conf=0.9 | Simple social feed with 3 posts and a plain refresh control; progress shown during refresh. Benign.
- c1: False conf=0.9 | Pull-To-Refresh checks fail: refresh is an explicit button click with 400ms honest latency, no artificial suspense delay, no variable-reward novelty schedule. Benign.

### inst-0310 granting-and-interaction cond3 variant A
- c0: False conf=0.7 | Legitimate camera permission prompt for a video call app; 'Don't Allow' available; purpose stated; no misdirection
- c1: False conf=0.75 | Granting and Interaction #3 NOT triggered: request discloses exactly the permission needed ('access your camera for video calls') with functional dependency (Dep(camera, videocall) non-empty); 'Don't Allow' present; no coordinate misdirection (#2 absent)

### inst-0343 trick-questions cond2 variant A
- c0: False conf=0.75 | Welcome bonus claim: $10 bonus checkbox starts UNCHECKED (opt-in required) and the signup button is disabled until the user ticks it — honest, no preselection or misrepresentation.
- c1: False conf=0.85 | Bad Defaults cond1: bonus checkbox starts UNCHECKED (no State=True at t0); no hidden cost, no trick-question label inversion; button gating until explicit opt-in is honest. No pattern fires.

### inst-0345 cuteness cond2 variant A
- c0: False conf=0.7 | Cancellation flow: retention modal 'Don't leave us…' but 'Yes, cancel' remains available and states access ends at billing period end; no obstruction.
- c1: False conf=0.68 | No formal trigger: 'Yes, cancel' is a <button> (False Hierarchy 1 fails), cancel remains reachable; 'Don't leave us…' retention copy is mild, decline not shamed (Confirmshaming 3 fails); access-end disclosed.

### inst-0357 countdown-on-ads cond1 variant A
- c0: False conf=0.7 | Benign: clearly labeled 'Sponsored' video ad with standard 'Skip in 15s' countdown; no deception.
- c1: False conf=0.65 | No deceptive trigger: ad clearly labeled 'Sponsored', skip becomes available after disclosed 15s countdown (standard pre-roll, not framed as reward, exit not suppressed).

### inst-0370 feedforward-ambiguity cond1 variant A
- c0: False conf=0.75 | Transparent order review: all line items shown ($59 + $25 + free shipping = $89 total, consistent), non-refundable policy stated, and a second review step promised before placement.
- c1: False conf=0.85 | Drip Pricing#1 fails: P(s)=$89 across all states, exactly $59+$25+$0 shipping — no sequential inflation; Reduced Friction#3 fails: confirmation language present ('Non-refundable once placed', review again next screen).


## FP2_B: 13 instances — B variant STILL exhibits the pattern (both arms deceptive — manipulation not removed)

### inst-0034 hidden-information cond1 variant B
- c0: True conf=0.85 | Hidden recurring cost: headline says '$0 for the first month' but the T&C scrollbox buries an auto-renewal clause at $49.99/month with a 24h cancel window; the financial clause is only surfaced via a separate 'Locate the financial clause' button.
- c1: True conf=0.9 | Drip Pricing cond1/3: advertised '$0 for the first month' vs $49.99/mo auto-renewal clause disclosed only inside the scrollable 309-word T&C; Forced Continuity cond1: subscription auto-converts at expiry with no visible renewal warning in any state.

### inst-0060 endorsement-and-testimonials cond2 variant B
- c0: True conf=0.6 | Miracle-cure testimonials ('lost 9kg in 3 weeks', 'Doctors hate this one trick') with 'Verified buyer · Linked profile' badges; tap-to-verify reveals no verification — unsubstantiated social proof.
- c1: True conf=0.65 | Endorsement & Testimonials #2/#3: 'Verified buyer · Linked profile' attribution asserted but tap-to-verify renders no profile (ring only); templated miracle claims ('lost 9kg in 3 weeks', 'Doctors hate this one trick') with ~zero rating variance.

### inst-0156 encouraging-anti-social-behavior cond3 variant B
- c0: True conf=0.6 | Compose UI defaults to a 'Heated' tone pre-selection (accent-highlighted with P=0.6) and feed posts are labeled by tone with 'Not boosted' markers — interface nudges users toward hostile engagement.
- c1: True conf=0.65 | Bad Defaults cond1: 'Heated' tone pre-initialized at s0 without user selection (P=0.6 auto-highlighted); Encouraging Anti-Social Behavior cond3: feed marks posts 'Not boosted' implying algorithmic boost of polarized (heated/hostile) content — interface defaults users toward hostile engagement.

### inst-0158 limited-time-message cond1 variant B
- c0: True conf=0.85 | Flash-sale countdown is frozen at 0:10 in every captured state — a fake countdown manufacturing urgency.
- c1: True conf=0.95 | Countdown Timer #1 (stateless expiration): 'Sale ends in 0:10' is frozen at 0:10 across all captured states — never decrements, synthetic deadline; #3 countdown paired with 'Flash sale'/'Claim 40% off' amplify lexemes. Deceptive.

### inst-0163 low-stock cond3 variant B
- c0: True conf=0.7 | 'Only 5 left' scarcity badge persists across 4 reloads while the transaction log shows 0 purchases — the stock claim is not backed by any recorded transaction (fake scarcity).
- c1: True conf=0.75 | Low Stock #1 (Inventory Fabrication): displayed 'Only 5 left' ≤ tau_scarcity=5 while the on-page transaction log shows 0 purchases across 4 loads — the low-stock claim has no backing transaction evidence; stock quantifier never changes despite zero sales.

### inst-0194 dead-end cond2 variant B
- c0: True conf=0.8 | Cookie banner offers only 'Accept all' vs ambiguous 'Not now' — no reject/decline option, nudging acceptance.
- c1: True conf=0.85 | Privacy Zuckering #1 (bundled consent): the only full-access option is 'Accept all'; 'Not now' merely postpones and no t_alt exists to grant essential access while denying monetization — reject vector absent. Deceptive.

### inst-0200 infinite-scrolling cond3 variant B
- c0: True conf=0.6 | Pagination is misleading: each 'Next page' appends the same 6 items again (items repeat 1-6,1-12,1-18,1-24), so users are led to think there are new results when content is duplicated; Next button still active on final page.
- c1: True conf=0.6 | Pagination labels exist ('Page 1 of 4'..'4 of 4') but the same 6 items are re-rendered on every page (24 slots for 6 unique stories) — implicit claim of new results per page contradicted by identical repeated content (Conflicting Information #3); 'Next page' still active at the announced end, undermining the stop cue (Addictive Design #2 / Infinite Scrolling #3 boundary semantics).

### inst-0211 social-pyramid cond2 variant B
- c0: True conf=0.55 | Fabricated activity counter: 'Invite friends (optional) · 0/2 joined' progresses to 1/2, 2/2, then an impossible 3/2 across states without user action, suggesting a scripted/fake join counter used as social pressure.
- c1: True conf=0.6 | Activity Messages #1: join counter advances 0/2→1/2→2/2→3/2 across states without user action and exceeds the 2-person target — an impossible count (3/2) proves the activity feed is procedurally fabricated, not derived from events.

### inst-0227 forced-continuity cond1 variant B
- c0: True conf=0.7 | Free trial silently converts to a paid $14.99/mo subscription charged to a cached Visa token once the trial concludes; no cancellation/opt-out control is offered in any state.
- c1: True conf=0.9 | Forced Continuity #1 (time-triggered silent mutation): trial→premium + charge on cached Visa token executes at expiry with Consent_explicit=False at conversion; #2: no renewal warning/cancel affordance in any state. Deceptive.

### inst-0308 automating-the-user-away cond3 variant B
- c0: True conf=0.8 | Location-consent prompt auto-registers consent after a 5-second countdown if the user does nothing; the agree checkbox is disabled — consent-by-default timer.
- c1: True conf=0.9 | Automating the User Away #1 (autonomous action execution): 'Consent will be registered in 5 seconds unless you decide' — consent state transition executes on a timer without user event; the agree checkbox is disabled (no explicit affirmation possible); Granting-and-Interaction-style scope: sharing location with 14 ad partners bundled into one prompt. Deceptive.

### inst-0331 high-demand cond2 variant B
- c0: True conf=0.75 | Fabricated social proof: '14 people bought this in the last hour' with no backend provenance (unlike verified instances) plus a large $195→$119 discount framing — unverifiable activity claim to pressure purchase.
- c1: True conf=0.8 | High Demand cond1: '14 people bought this in the last hour' carries a precise quantifier but no structural mapping to any event log (unlike verified instances with a backend refresh node) — fabricated demand metric; paired with $195→$119 anchoring.

### inst-0346 forced-grace-period cond2 variant B
- c0: True conf=0.7 | Cancellation flow pushes a retention offer framed as 'we've unlocked a one-time offer' (fake urgency/scarcity); keep-subscription CTA is primary and bold while the cancel path is secondary; one-time framing manufactures urgency to deter cancellation.
- c1: True conf=0.75 | Visual Prominence cond2/3: 'Keep my subscription — 50% off' is the dominant filled/shadow CTA vs outline cancel; Limited Time Message cond3: 'we've unlocked a one-time offer' with zero specificity (no deadline/terms), and the same offer persists identically across all states — artificial one-time framing in the cancellation flow.

### inst-0349 intermediate-currency cond1 variant B
- c0: True conf=0.65 | Price obfuscation: bundle shown only as '1,299 coins'; real fiat price ($40.79) revealed only at checkout step.
- c1: True conf=0.8 | Intermediate Currency #2 (Visual Obscuration): N_real absent from product state — only '1,299 coins' shown; fiat $40.79 revealed only at checkout. Price Comparison Prevention #1 (Fiat Decoupling) also holds.
