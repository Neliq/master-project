## Error inventory (instances where any arm disagreed with ground truth)

Total disagreements: **64** across **38** distinct instances
| Instance | Variant | Layer | Truth | Agent | Arm | Conf | Justification (first 120 chars) |
|---|---|---|---|---|---|---|---|
| inst-0005 | B | 2 | False | agent-02 | c0 | 0.65 | Privacy settings: all invasive toggles (interest-based ads, behavioural profiling, cross-site tracking) pre-checked - pr |
| inst-0005 | B | 2 | False | agent-02 | c1 | 0.62 | Bad Defaults #1 (Pre-initialized Activation State) + #3: 5+ privacy-invasive toggles (interest-based advertising, behavi |
| inst-0018 | A | 3 | True | agent-08 | c0 | 0.85 | Checkout with explicit terms checkbox (Spanish), full terms text shown after click, order button disabled until acceptan |
| inst-0018 | A | 3 | True | agent-08 | c1 | 0.75 | Wrong Language #1 fails: UI consistently Spanish in acquisition and consent; terms text disclosed at normal prominence ( |
| inst-0040 | A | 2 | True | agent-08 | c0 | 0.7 | Pre-checked box claims a $10 welcome bonus — a benefit to the user, fully described ('Tick the box, and the bonus is you |
| inst-0040 | A | 2 | True | agent-08 | c1 | 0.65 | Bad Defaults #1 fires (checkbox pre-checked at t0) but #3 does NOT: intent is user-favorable ($10 bonus credit, not priv |
| inst-0050 | A | 1 | True | agent-01 | c0 | 0.6 | Notification bell shows badge '1' with unclear meaning and descriptor 'New Messages' far away — ambiguous, but no actual |
| inst-0058 | A | 3 | True | agent-03 | c0 | 0.8 | Free trial button discloses auto-renewal and $5.00 fee in title and details; transparent subscription terms. |
| inst-0058 | A | 3 | True | agent-03 | c1 | 0.7 | O4 fee disclosure timing: $5.00/mo auto-renewal disclosed BEFORE commitment (button title + 'Subscription details' block |
| inst-0060 | A | 3 | True | agent-01 | c0 | 0.85 | Invite flow clearly states it sends a welcome offer to the 3 contacts YOU selected, sent as your personal invite — trans |
| inst-0060 | A | 3 | True | agent-01 | c1 | 0.8 | Friend Spam #2 fails: recipients are 'the 3 contacts you selected' (granular selection present, dispatch ≠ full network) |
| inst-0073 | B | 1 | False | agent-07 | c0 | 0.65 | Final confirmation screen (step 2 of 2) tells user they 'can review the order again on the next screen' — misleading cla |
| inst-0073 | B | 1 | False | agent-07 | c1 | 0.75 | Conflicting Information #1/#3: 'Step 2 of 2 — final confirmation' vs 'You can review the order again on the next screen' |
| inst-0079 | B | 1 | False | agent-08 | c0 | 0.6 | Manufactured urgency/scarcity: '2 units in stock' and 'Sale ends tonight at midnight' with no substantiation; though the |
| inst-0099 | A | 3 | True | agent-04 | c0 | 0.7 | Permission dialog lists requested permissions (camera, mic, location) with equal Don't Allow / Allow buttons; disclosed, |
| inst-0099 | A | 3 | True | agent-04 | c1 | 0.75 | Granting and Interaction #3 fails: manifest explicitly lists Camera+Microphone+Location so disclosed = actual permission |
| inst-0105 | A | 1 | True | agent-01 | c0 | 0.85 | One-time Pro license: 'No subscription, no renewal. Billed once as $79.00'; price consistent on card row and button. |
| inst-0105 | A | 1 | True | agent-01 | c1 | 0.85 | Forced Continuity fails (E2): 'No subscription, no renewal. Billed once as $79.00' disclosed at normal prominence in bot |
| inst-0117 | B | 2 | False | agent-09 | c0 | 0.6 | Paid add-on ($19.99 warranty) is included in the order and total by default (sneak-into-basket); removable via decline b |
| inst-0117 | B | 2 | False | agent-09 | c1 | 0.65 | Sneak Into Basket #1: warranty $19.99 in cart total at s0 with no user add event ('1 item you added' vs $149.98 total);  |
| inst-0125 | A | 1 | True | agent-07 | c0 | 0.55 | Energy system disclosed transparently (refill rate, counts); 'until we say otherwise' phrasing is odd but mechanic is ho |
| inst-0125 | A | 1 | True | agent-07 | c1 | 0.65 | Playing By Appointment #1 structurally present (energy-gated farming) but fully disclosed: exact refill rate (1/30min),  |
| inst-0129 | A | 3 | True | agent-02 | c0 | 0.6 | Social app with explicit tone selector (P values shown) and feed labels 'Boosted'/'Not boosted' with view counts - trans |
| inst-0129 | A | 3 | True | agent-02 | c1 | 0.6 | No condition fires. Tone selector exposes probabilities (P=0.2/0.6/0.9) and feed labels every post 'Boosted'/'Not booste |
| inst-0133 | A | 2 | True | agent-07 | c0 | 0.85 | Transparent bundle listing with itemized contents and single honest price; no pressure or hidden terms. |
| inst-0133 | A | 2 | True | agent-07 | c1 | 0.9 | All six operators negative: no timer (O1), no inventory claims (O2), no opt-out needed, price disclosed upfront (O4), no |
| inst-0138 | A | 3 | True | agent-03 | c0 | 0.65 | Game add-on downloads with mild 'grab them before they're gone' phrasing; no real manipulation. |
| inst-0138 | A | 3 | True | agent-03 | c1 | 0.6 | Limited Time Message #3 partially plausible ('grab them before they're gone' with no deadline/timer) but no observed pre |
| inst-0141 | A | 2 | True | agent-08 | c0 | 0.85 | Subscription renewal is fully disclosed across states: countdown ('Renews in 7d'..'4d'), renewal notice naming $14.99 ch |
| inst-0141 | A | 2 | True | agent-08 | c1 | 0.85 | Forced Continuity #2 fails: renewal notice '$14.99 charged to •••• 4242' visible in EVERY state (E2); O1 negative — coun |
| inst-0144 | A | 2 | True | agent-10 | c0 | 0.6 | Article paginated 1/3 pages with next/prev controls; 'Keep reading' copy and reading-time display are mild engagement nu |
| inst-0144 | A | 2 | True | agent-10 | c1 | 0.65 | BENIGN — Infinite Scrolling #3 / Addictive Design #2 fail: boundary marker '1/3' and prev/next controls present; content |
| inst-0150 | A | 2 | True | agent-03 | c0 | 0.65 | Simple feed refresh; spinner outlasts the payload slightly but no manipulation of content. |
| inst-0170 | B | 2 | False | agent-10 | c0 | 0.6 | Flash-sale urgency copy 'Only today — ends in 4 hours', 'Don't miss it', 'Full-price customers pay double' — unverifiabl |
| inst-0175 | A | 1 | True | agent-08 | c0 | 0.7 | Unsubscribe flow works in two steps; the 'Don't go… we'll really miss you' guilt-trip is mild and 'Unsubscribe anyway' r |
| inst-0177 | A | 1 | True | agent-04 | c0 | 0.8 | Simple game grind loop (forge swords, earn gold); no deceptive mechanics |
| inst-0178 | A | 2 | True | agent-04 | c0 | 0.6 | Plain product page for skincare with a 98% five-star review claim and a buy button; no manipulative elements visible |
| inst-0184 | A | 3 | True | agent-03 | c0 | 0.85 | Standard show-more-results pagination; items simply accumulate. |
| inst-0184 | A | 3 | True | agent-03 | c1 | 0.85 | Infinite Scrolling #1 fails: content appends only via explicit 'Show more results' button (affirmative user action), no  |
| inst-0211 | A | 2 | True | agent-05 | c0 | 0.75 | Optional add-on channels (30, each $2/mo) all shown explicitly with 'review them all before choosing'; count reflects se |
| inst-0211 | A | 2 | True | agent-05 | c1 | 0.6 | BENIGN (with flagged uncertainty). Choice Overload #1 structurally near-threshold (30 options > 20) BUT: all 30 add-ons  |
| inst-0235 | A | 2 | True | agent-09 | c0 | 0.6 | Ticket price $49 with processing/service fees disclosed on-screen before booking (fee button shows exact $6.50/$3.25 amo |
| inst-0236 | B | 2 | False | agent-07 | c0 | 0.7 | '14 people bought this in the last hour' social-proof claim backed by a displayed 'backend log' — fabricated-feeling act |
| inst-0236 | B | 2 | False | agent-07 | c1 | 0.6 | High Demand #1 plausible-but-unverifiable: 'backend purchase log' UI prop (named entries, timestamps) presented to shopp |
| inst-0287 | A | 1 | True | agent-10 | c0 | 0.85 | Plain social feed with manual pull-to-refresh, 3 posts, no manipulation — benign. |
| inst-0287 | A | 1 | True | agent-10 | c1 | 0.7 | BENIGN — Pull To Refresh #3 (variable-reward novelty variance) not observable — single static feed, no refresh outcomes  |
| inst-0294 | B | 2 | False | agent-09 | c0 | 0.6 | Fake scarcity: unsubstantiated 'LIMITED' badge and 'one-of-a-kind' claim with no timer, stock count, or any mechanism ba |
| inst-0294 | B | 2 | False | agent-09 | c1 | 0.6 | FOMO #3: scarcity lexemes 'LIMITED' + 'one-of-a-kind' with no timer, stock count, or removal mechanism anywhere (claim-o |
| inst-0297 | B | 1 | False | agent-07 | c0 | 0.6 | Bare download page pushing a direct .exe with grandiose 'military-grade' claims and 'free for personal use' — classic mi |
| inst-0302 | A | 3 | True | agent-09 | c0 | 0.85 | Account deletion with clear 30-day grace period and restore-on-login policy; honest confirmation flow, not a forced or c |
| inst-0313 | A | 2 | True | agent-03 | c0 | 0.65 | Disclosed 10-second free-access wait with pay-to-skip; wait actually ends and content unlocks (s2). |
| inst-0313 | A | 2 | True | agent-03 | c1 | 0.6 | O1 resolves: countdown reaches 0 and overlay disappears (s2 shows content unlocked); O4: $1.99 skip and 10s wait disclos |
| inst-0318 | A | 1 | True | agent-03 | c0 | 0.8 | Delete account with clear confirmation dialog and honest warning about photos/memories. |
| inst-0318 | A | 1 | True | agent-03 | c1 | 0.8 | O3 present in every state: Keep-account dismissal in the confirmation overlay; Dead End #2 fails (C_dismiss ≠ ∅). Honest |
| inst-0328 | A | 1 | True | agent-05 | c0 | 0.8 | Video ad clearly labeled 'Sponsored' with standard 'Skip in 15s' countdown — honest ad disclosure, conventional pattern. |
| inst-0329 | B | 1 | False | agent-07 | c0 | 0.6 | User is 'currently subscribed' but the 'Keep me subscribed' checkbox renders unchecked — default would silently unsubscr |
| inst-0329 | B | 1 | False | agent-07 | c1 | 0.6 | Feedforward Ambiguity #1: page states 'You are currently subscribed' while the 'Keep me subscribed' control renders unch |
| inst-0341 | A | 1 | True | agent-10 | c0 | 0.75 | Video watchlist that auto-plays queued episodes ('Autonomous' queue, 'Up next: Episode 2'); autoplay with visible queue  |
| inst-0341 | A | 1 | True | agent-10 | c1 | 0.6 | BENIGN — Auto-Play #1 fails: playback starts only after explicit 'Play Episode 1' click (E_intent present in event log); |
| inst-0343 | B | 1 | False | agent-05 | c0 | 0.55 | Flash sale with vague unverifiable urgency ('Limited-time price... ends tonight') plus was-price anchoring ($29.99 was $ |
| inst-0343 | B | 1 | False | agent-05 | c1 | 0.7 | DECEPTIVE. Limited Time Message #3: 'Limited-time price... ends tonight' with NO concrete date/time in DOM (T_end ∉ DOM) |
| inst-0347 | B | 3 | False | agent-08 | c1 | 0.6 | Limited Time Message #3: 'Upgrade now — save 50% TODAY' — temporal urgency with zero specificity, no deadline, no timer, |
| inst-0368 | A | 3 | True | agent-10 | c0 | 0.6 | Article with a mid-read promoted card clearly labeled 'AD' and native pagination control; disclosure present — benign. |
| inst-0368 | A | 3 | True | agent-10 | c1 | 0.7 | BENIGN — Disguised Ad checks fail: promoted card explicitly labeled 'AD', separate from article, pagination marked as na |
