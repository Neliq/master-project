## Error inventory (instances where any arm disagreed with ground truth)

Total disagreements: **43** (c0: 23, c1: 20) across **24** distinct instances
| Instance | Variant | Layer | Truth | Agent | Arm | Conf | Justification (first 120 chars) |
|---|---|---|---|---|---|---|---|---|
| conflicting-information-cond2-A | A | 2 | True | agent-01 | c0 | 0.7 | Cancellation is the visually primary action and the 'cancel anytime' claim is consistent with the visible flow; no confl |
| conflicting-information-cond2-A | A | 2 | True | agent-01 | c1 | 0.75 | Conflicting Information checks fail: cancel rendered as the positive primary action, consistent with the stated 'cancel  |
| conflicting-information-cond2-B | B | 2 | False | agent-01 | c0 | 0.55 | Opt-out discouraged via color semantics: 'Cancel my membership' styled red/danger while 'Keep my membership' is green/po |
| conflicting-information-cond2-B | B | 2 | False | agent-01 | c1 | 0.6 | Conflicting Information §2 (semantic-visual mismatch): page claims 'cancel anytime' yet cancel is styled with danger sem |
| countdown-on-ads-cond1-A | A | 1 | True | agent-10 | c0 | 0.9 | No countdown or timer; plain 'Play video' button |
| countdown-on-ads-cond1-A | A | 1 | True | agent-10 | c1 | 0.9 | Countdown On Ads: no temporal gate (no countdown, no disabled skip) — plain Play video button → no trigger |
| countdown-on-ads-cond2-A | A | 2 | True | agent-02 | c0 | 0.55 | Snapshot is a plain 'watch the video' page with a single Play button; no countdown, ad or deadline element is present in |
| countdown-on-ads-cond2-A | A | 2 | True | agent-02 | c1 | 0.55 | CountdownOnAds conditions: no ad overlay, no countdown, no skip-lock, no exit-node omission - the snapshot is a bare 'wa |
| countdown-on-ads-cond3-A | A | 3 | True | agent-01 | c0 | 0.55 | Snapshot shows only a 'Continue to next level' button; no countdown or ad is present to judge as deceptive. |
| countdown-on-ads-cond3-A | A | 3 | True | agent-01 | c1 | 0.6 | Countdown On Ads checks fail on this snapshot: DOM shows only 'Continue to next level'; no countdown, ad, or skip-gating |
| cuteness-cond2-A | A | 2 | True | agent-07 | c0 | 0.6 | Cancel-plan screen shows a mascot but the cancel button is plainly visible and functional; no obstruction or misdirectio |
| feedforward-ambiguity-cond3-A | A | 3 | True | agent-08 | c0 | 0.8 | Straightforward 3-step signup with clear email/password fields and a labeled Continue button. |
| feedforward-ambiguity-cond3-A | A | 3 | True | agent-08 | c1 | 0.85 | FeedforwardAmbiguity#1/#3 not triggered: email/password inputs labeled by placeholders, 'Continue' resolves to next step |
| forced-continuity-cond1-B | B | 1 | False | agent-04 | c0 | 0.65 | Same as A: free trial with cached payment token enabling automatic charge at expiry; only 'advance to t_expiry' affordan |
| forced-continuity-cond1-B | B | 1 | False | agent-04 | c1 | 0.75 | Forced Continuity §1/§2: identical to A — trial with cached payment token for time-triggered charge, no renewal warning, |
| forced-continuity-cond3-A | A | 3 | True | agent-01 | c0 | 0.75 | Trial terms clear ('Cancel anytime', $0 for 30 days); no forced continuation visible in the snapshot. |
| forced-continuity-cond3-A | A | 3 | True | agent-01 | c1 | 0.8 | Forced Continuity checks fail: 'Cancel anytime' and $0-for-30-days disclosed in simple language; no silent state mutatio |
| forced-grace-period-cond1-A | A | 1 | True | agent-01 | c0 | 0.6 | Renewal stated plainly; direct delete button; no forced grace period visible in the snapshot. |
| forced-grace-period-cond1-A | A | 1 | True | agent-01 | c1 | 0.65 | Forced Grace Period §1/§3 fail: no temporal delay entity and no reversal keyword near a delay; renewal disclosed plainly |
| forced-grace-period-cond3-A | A | 3 | True | agent-01 | c0 | 0.6 | Snapshot contains only a delete button; no grace-period or waiting text present (red styling is a standard destructive a |
| forced-grace-period-cond3-A | A | 3 | True | agent-01 | c1 | 0.65 | Forced Grace Period checks fail: no delay entity or waiting-period text in the snapshot; delete button present (red styl |
| friend-spam-cond1-A | A | 1 | True | agent-06 | c0 | 0.55 | Contacts-permission page states a scoped purpose (match contacts to find existing friends) and labels the access 'Read-o |
| friend-spam-cond1-A | A | 1 | True | agent-06 | c1 | 0.5 | Friend Spam §1: prompt states scoped read-only matching ('so you can find friends already on the platform', badge 'Read- |
| granting-and-interaction-cond3-A | A | 3 | True | agent-07 | c0 | 0.6 | Join-video-call screen; action clearly labeled, no deceptive framing - only unusual button color. |
| intermediate-currency-cond1-B | B | 1 | False | agent-05 | c0 | 0.55 | Bundle priced only in virtual coins with no real-money equivalent shown, obscuring the actual cost. |
| intermediate-currency-cond1-B | B | 1 | False | agent-05 | c1 | 0.8 | Intermediate Currency #2: N_real=∅ — '1,299 coins' is the only price token, no real-currency equivalence rendered; virtu |
| intermediate-currency-cond2-B | B | 2 | False | agent-08 | c0 | 0.6 | 'LIMITED' scarcity badge on a digital cosmetic skin (no natural scarcity) plus premium-currency pricing, though dollar e |
| pay-to-avoid-cond2-B | B | 2 | False | agent-07 | c0 | 0.6 | Free access deliberately throttled with a 10-second wait that can be removed by paying $1.99 - artificial friction monet |
| pay-to-avoid-cond2-B | B | 2 | False | agent-07 | c1 | 0.7 | Pay To Avoid #1 (Artificial State Degradation): 10-second wait is a deliberately injected friction vector throttling fre |
| playing-by-appointment-cond1-A | A | 1 | True | agent-10 | c0 | 0.7 | Energy mechanic transparently explained (refill 1/30 min); appointment scheduling is disclosed |
| pressured-selling-cond1-A | A | 1 | True | agent-02 | c0 | 0.6 | Straightforward checkout: item price, free shipping and total all transparently itemized; no pressure tactics in the DOM |
| pressured-selling-cond1-A | A | 1 | True | agent-02 | c1 | 0.6 | PressuredSelling#1 (flow interruption): no upsell modal injected on Proceed-to-payment path (s_final reachable, no M_ups |
| small-or-moving-close-button-cond1-B | B | 1 | False | agent-08 | c1 | 0.6 | SmallOrMovingCloseButton#2 triggered: close hitbox 24×24=576px² < WCAG τ=44×44=1936px², a microscopic dismissal target;  |
| sneak-into-basket-cond1-A | A | 1 | True | agent-06 | c0 | 0.55 | Plain product page: single item, clear price ($129.99), free-returns note, and a single Add to Cart button. No extra ite |
| sneak-into-basket-cond1-A | A | 1 | True | agent-06 | c1 | 0.5 | Sneak Into Basket §1: snapshot shows only a product page with a single 'Add to Cart' button; no cart state is rendered,  |
| trick-questions-cond2-B | B | 2 | False | agent-07 | c0 | 0.6 | Signup button disabled until 'claim my $10 welcome bonus' box is ticked - benefit-framed required consent, misleading qu |
| trick-questions-cond2-B | B | 2 | False | agent-07 | c1 | 0.7 | Trick Questions #2/#1: checkbox label 'Yes, I'd like to claim my $10 welcome bonus' (benefit framing) is the required ga |
| watch-ads-to-unlock-features-cond1-B | B | 1 | False | agent-01 | c0 | 0.5 | Same forced-action mechanic as the A variant: level locked, watching an ad is the only way to earn energy (calmly presen |
| watch-ads-to-unlock-features-cond1-B | B | 1 | False | agent-01 | c1 | 0.6 | Watch Ads §1: identical mechanic to the A variant — locked level, ad playback is the sole currency for the unlock ('Watc |
| watch-ads-to-unlock-features-cond2-A | A | 2 | True | agent-05 | c0 | 0.9 | Rewarded-ads unlock with an accurate progress bar (overstates by 0%); honest tracking of ad-watching. |
| watch-ads-to-unlock-features-cond2-A | A | 2 | True | agent-05 | c1 | 0.9 | Watch Ads To Unlock #2 (progress mismatch): P_visual−P_actual=0 (bar overstates by 0%) ≤ τ_mislead — accurate progress b |
| wrong-language-cond1-A | A | 1 | True | agent-04 | c0 | 0.85 | UI in English, explicitly disclosed; easy cancel; identical content to B variant — no manipulation. |
| wrong-language-cond1-A | A | 1 | True | agent-04 | c1 | 0.9 | Wrong Language §2/§3: content identical to B — all English, disclosed, easy cancel; no locale mismatch or foreign-langua |
