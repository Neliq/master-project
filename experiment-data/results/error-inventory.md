## Error inventory (instances where any arm disagreed with ground truth)

Total disagreements: **377** across **201** distinct instances
| Instance | Variant | Layer | Truth | Agent | Arm | Conf | Justification (first 120 chars) |
|---|---|---|---|---|---|---|---|
| inst-0002 | B | 3 | False | agent-01 | c0 | 0.95 | All three testimonials use the same stock-photo avatar and the identical opening ‘Absolutely love it!’; s1 reports only  |
| inst-0002 | B | 3 | False | agent-01 | c1 | 0.95 | Endorsement and Testimonials #3 fires in s1: similarity is reported as 1.00, every avatar is the same stock asset, and r |
| inst-0003 | B | 2 | False | agent-02 | c0 | 0.94 | A large 50%-off keep-subscription button is paired with a tiny underlined “Cancel anyway” link and guilt-laden “sorry to |
| inst-0003 | B | 2 | False | agent-02 | c1 | 0.92 | s0–s1 retain the opt-out but render it as a tiny link beside a dominant accept button; Confirmshaming #2/#3 fire, with O |
| inst-0005 | B | 2 | False | agent-02 | c0 | 0.94 | Privacy controls for interest-based advertising and behavioral profiling are pre-checked and nested at 32px, with techni |
| inst-0005 | B | 2 | False | agent-02 | c1 | 0.95 | s0–s3 show privacy-loss checkboxes pre-checked inside nested categories and still checked when reopened; Bad Defaults #1 |
| inst-0009 | B | 2 | False | agent-02 | c0 | 0.86 | The same flow shows “Only 6 left” while the post-add-to-cart state says 8 units are available, an unexplained stock cont |
| inst-0009 | B | 2 | False | agent-02 | c1 | 0.84 | s0–s1 retain “Only 6 left” but s1 states “8 units are currently available” after add-to-cart, with no inventory decrease |
| inst-0010 | B | 1 | False | agent-01 | c0 | 0.92 | The positive discount CTA is a full button, while ‘No, thanks — I’ll pay full price’ is a plain decline text element; s1 |
| inst-0010 | B | 1 | False | agent-01 | c1 | 0.94 | Confirmshaming #1/#2 fires across s0–s1: accept is the fully interactive primary control, decline is structurally downgr |
| inst-0011 | B | 3 | False | agent-03 | c0 | 0.92 | The offer repeats a 04:29 countdown after the payment transition and surrounds it with HURRY, Now or never, don't wait,  |
| inst-0011 | B | 3 | False | agent-03 | c1 | 0.95 | States s0-s2 show the countdown stalled at 04:29 across s0→s1, then barely changing to 04:28, with repeated urgency copy |
| inst-0013 | A | 2 | True | agent-05 | c0 | 0.65 | Only a shallow Account settings accordion is exposed; the fragment never shows a harmful target, an excessive path, or u |
| inst-0013 | A | 2 | True | agent-05 | c1 | 0.78 | s0-s3 expose only Account settings and one 12px-indented level (General, Billing, Notifications); no target path, >4 dep |
| inst-0014 | B | 2 | False | agent-10 | c0 | 0.82 | The privacy prompt makes Accept All a large filled button while Manage options is a small quiet link below, steering att |
| inst-0014 | B | 2 | False | agent-10 | c1 | 0.84 | s0/s1 show the accept control as large, filled, and bold while Manage options is a small text control, firing Privacy Ma |
| inst-0015 | B | 3 | False | agent-03 | c0 | 0.95 | Reloads change Only 3 left to 5, 1, and 4 while the transaction log remains at zero purchases, and the interface admits  |
| inst-0015 | B | 3 | False | agent-03 | c1 | 0.95 | States s0-s3 show 3→5→1→4 with zero transactions; Low Stock #3 and O2 directly establish inconsistent quantifiers withou |
| inst-0016 | A | 3 | True | agent-05 | c0 | 0.9 | The interface presents two plainly labeled tracking choices, I accept and No, I don’t accept, with comparable button tre |
| inst-0016 | A | 3 | True | agent-05 | c1 | 0.9 | s0 presents explicit, mutually opposite tracking buttons with no preselection or label mismatch; O5 is negative and no o |
| inst-0019 | B | 2 | False | agent-06 | c0 | 0.99 | s0→s2 shows an automatic €9.99/mo renewal triggered by a 1.5s countdown; s2 reports renewal completed with no cancel but |
| inst-0019 | B | 2 | False | agent-06 | c1 | 0.98 | s0→s2 fires Forced Continuity #1/#2 and O1/O6: the 1.5s renewal timer resets to 3 then disappears, renewal executes auto |
| inst-0023 | B | 3 | False | agent-02 | c0 | 0.78 | The offer uses “left behind,” “deal of the year,” “last chance,” and “no reason to wait” to pressure an upgrade through  |
| inst-0025 | B | 3 | False | agent-02 | c0 | 0.95 | The donation accept button says “I care about the planet,” while the smaller decline link says “I don’t care about the e |
| inst-0025 | B | 3 | False | agent-02 | c1 | 0.94 | s0–s1 pair a dominant donation button with a shaming decline label; Confirmshaming #2/#3 fire, and O3 confirms the opt-o |
| inst-0027 | B | 1 | False | agent-03 | c0 | 0.9 | The item is priced only in coins; clicking Buy Now diverts to a wallet top-up, says fiat is not accepted, and requires p |
| inst-0027 | B | 1 | False | agent-03 | c1 | 0.95 | s0→s2 shows the purchase routed to a mandatory 1,500-coin exchange rather than checkout, with fiat explicitly rejected;  |
| inst-0028 | B | 2 | False | agent-07 | c0 | 0.82 | Although unit prices are printed, s1 says their contrast collapses to about 2.6 versus 7.6 for the headline and that the |
| inst-0028 | B | 2 | False | agent-07 | c1 | 0.9 | s0/s1 include the correct per-100g qualifiers, but s1 reports unit-price contrast about 2.6 versus headline 7.6 and effe |
| inst-0029 | B | 2 | False | agent-02 | c0 | 0.7 | A pulsing red 12° badge says “Only 2 left!” and remains unchanged through checkout, creating strong scarcity pressure wi |
| inst-0030 | A | 1 | True | agent-09 | c1 | 0.55 | Only s0 is available: the close button has a clear “Close dialog” name, while movement/handler interception is unobserva |
| inst-0033 | B | 1 | False | agent-03 | c0 | 0.93 | A cheerful mascot and Don’t go… we’ll really miss you appear only in the cancellation state, pairing emotional guilt wit |
| inst-0033 | B | 1 | False | agent-03 | c1 | 0.95 | s0 has no affective asset, while s2 injects a crying mascot beside Don’t go… we’ll really miss you; Cuteness #1/#3 fire  |
| inst-0034 | B | 1 | False | agent-01 | c0 | 0.95 | After Proceed to payment in s1, an unexpected optional protection-plan modal interrupts checkout with ‘Wait! Don’t leave |
| inst-0034 | B | 1 | False | agent-01 | c1 | 0.95 | Pressured Selling #1/#3 fires from s0→s1: proceeding injects an upsell modal before payment, with high-arousal ‘Wait!’/‘ |
| inst-0035 | B | 3 | False | agent-05 | c0 | 0.9 | The checkout shows a checked optional $2 donation and includes it in the $131.99 total without any shown user choice. |
| inst-0035 | B | 3 | False | agent-05 | c1 | 0.94 | s0 has a checked optional donation before any user event; s1 confirms it was checked at mount and folded into the total  |
| inst-0039 | B | 1 | False | agent-04 | c0 | 0.95 | The viewing count is animated and changes 37→55→36 across states without any purchase, while later text says the true co |
| inst-0039 | B | 1 | False | agent-04 | c1 | 0.95 | s0–s3 show 37, 55, and 36 viewers with no transaction; s2–s3 explicitly give displayed values unrelated to true=2, firin |
| inst-0040 | A | 2 | True | agent-08 | c1 | 0.58 | The sole s0 state visibly prechecks the box, so O5/pre-initialized activation is present, but its semantic consequence i |
| inst-0041 | B | 2 | False | agent-01 | c0 | 0.8 | A commercial DevGPT Pro pitch is inserted between ordinary TechDaily articles, presented with the same card imagery/byli |
| inst-0041 | B | 2 | False | agent-01 | c1 | 0.58 | The DevGPT card in s0 visibly mimics neighboring article cards and uses the native-looking Read more action, but cross-o |
| inst-0042 | B | 3 | False | agent-10 | c0 | 0.95 | The item is priced only in Gems, its Pay button is locked, and the interface says fiat must first be exchanged for 3,000 |
| inst-0042 | B | 3 | False | agent-10 | c1 | 0.95 | s0–s2 show the 2,500-Gem price, no fiat item price, and Pay enabled only after buying Gems with $29.99; Intermediate Cur |
| inst-0044 | B | 3 | False | agent-10 | c0 | 0.95 | The deletion confirmation uses repeated guilt and loss language (‘GONE FOREVER,’ ‘REGRET,’ friends will MISS you) while  |
| inst-0044 | B | 3 | False | agent-10 | c1 | 0.95 | s0/s1 show the delete decline path as a small outlined button beside a large ‘No — keep my account!’ button, with explic |
| inst-0045 | A | 2 | True | agent-04 | c0 | 0.55 | s0 shows a two-item cart containing headphones and an extended warranty, but no fragment evidence establishes that the w |
| inst-0045 | A | 2 | True | agent-04 | c1 | 0.55 | s0 only shows the warranty in the cart; no user-event or cross-state evidence proves unprompted mutation, so Sneak Into  |
| inst-0046 | B | 1 | False | agent-10 | c0 | 0.95 | The creator says the stream will end for good unless viewers raise $5 and asks for support, framing $1/$5/$10 payments a |
| inst-0046 | B | 1 | False | agent-10 | c1 | 0.94 | s0 explicitly asserts that $5 is necessary to keep the channel alive, and s1 celebrates a $1 payment as a rescue; Paraso |
| inst-0047 | B | 2 | False | agent-03 | c0 | 0.88 | Invite all 128 contacts is a huge bold button, while skip is much smaller and underlined, and the prompt frames mass sha |
| inst-0047 | B | 2 | False | agent-03 | c1 | 0.91 | States s0-s1 preserve the opt-out but heavily subordinate it to Invite all 128 contacts; Address Book Leeching #2/#3 and |
| inst-0048 | B | 1 | False | agent-09 | c0 | 0.9 | Across s0–s3, the required forges rise 1→2→4 while each action still yields only +10 gold, showing escalating repetitive |
| inst-0048 | B | 1 | False | agent-09 | c1 | 0.93 | s0–s3 show exponentially increasing forge requirements with nearly constant +10-gold value; Grinding #1 fires with multi |
| inst-0049 | B | 2 | False | agent-08 | c0 | 0.82 | Fragment evidence in both states shows "Accept all cookies" as a full-width 12px bold button with large padding, while t |
| inst-0049 | B | 2 | False | agent-08 | c1 | 0.8 | Privacy Maze/False Hierarchy visual-prominence conditions fire on the observed relative styling: accept is 12px bold wit |
| inst-0050 | A | 1 | True | agent-01 | c0 | 0.92 | The badge value 1 is accompanied by the visible New messages descriptor and an Open inbox action, giving the notificatio |
| inst-0050 | A | 1 | True | agent-01 | c1 | 0.92 | Information Without Context does not fire: the 1 badge is visibly anchored by New messages and the inbox instruction; E6 |
| inst-0051 | B | 3 | False | agent-01 | c0 | 0.78 | s0 says optional extras are already selected for checkout and tells the user to change what they do not need, without sh |
| inst-0055 | B | 2 | False | agent-02 | c0 | 0.88 | PLN 199 dominates a much smaller 9px struck-through “was PLN 299” reference, explicitly described as faded and hard to r |
| inst-0055 | B | 2 | False | agent-02 | c1 | 0.9 | s0–s1 show dual pricing with the reference struck through and visually much smaller; Reference Pricing #2/#3 fire throug |
| inst-0059 | B | 3 | False | agent-01 | c0 | 0.84 | The data-processing notice is an all-uppercase, highly technical legal block that users must accept before Create accoun |
| inst-0059 | B | 3 | False | agent-01 | c1 | 0.84 | Complex Language #3 fires in s0: the consumer-facing data notice is a long, all-caps legal/technical disclosure with pla |
| inst-0060 | A | 3 | True | agent-01 | c0 | 0.93 | The user has explicitly selected exactly three named recipients, and the interface states the welcome offer will be sent |
| inst-0060 | A | 3 | True | agent-01 | c1 | 0.93 | Friend Spam conditions fail in s0–s1: recipients are explicitly named and selected, the message is a single personal inv |
| inst-0067 | B | 2 | False | agent-05 | c0 | 0.87 | Four glowing five-star testimonials all come from Guest user/Unverified · no profile, making their provenance unverifiab |
| inst-0067 | B | 2 | False | agent-05 | c1 | 0.93 | s0-s1 show four five-star cards with no full name, photo, or linked profile; state1 confirms the absence. Endorsement an |
| inst-0069 | B | 2 | False | agent-01 | c0 | 0.94 | The account page labels sign-up as a 12,320 px² one-click action but Delete account as only 1,056 px² (88x12). |
| inst-0069 | B | 2 | False | agent-01 | c1 | 0.9 | Immortal Accounts #2 fires in s0–s1: the visible deletion affordance is explicitly 1,056 px² versus 12,320 px² for sign- |
| inst-0070 | B | 3 | False | agent-01 | c0 | 0.78 | Account creation requires accepting a single checkbox that combines Privacy Policy agreement with sharing data to vague  |
| inst-0070 | B | 3 | False | agent-01 | c1 | 0.88 | Privacy Zuckering #1 fires in s0: the only enabled path to account creation fuses essential access with advertising/busi |
| inst-0071 | B | 2 | False | agent-01 | c0 | 0.93 | Accept all cookies is a huge bold button, while Manage preferences and Decline are small underlined text actions; s1 con |
| inst-0071 | B | 2 | False | agent-01 | c1 | 0.93 | False Hierarchy #2/#3 fires in s0–s1: the mutually opposing accept/decline choices have strongly asymmetric visual weigh |
| inst-0072 | A | 2 | True | agent-05 | c1 | 0.9 | s0-s1 show a specific four-hour deadline, not an unbounded or fabricated timer; although Limited Time Message #2’s color |
| inst-0073 | B | 1 | False | agent-07 | c0 | 0.9 | The s0 Order review has a Continue button, but s1 jumps directly to Order confirmed and Charged $89 with no confirmation |
| inst-0073 | B | 1 | False | agent-07 | c1 | 0.95 | s0→s1 maps Continue directly to Order confirmed and Charged $89. Feedforward Ambiguity #1/#3 and Reduced Friction #1/#3  |
| inst-0078 | B | 3 | False | agent-04 | c0 | 0.95 | Deletion is delayed for 30 days, and the confirmation explicitly makes logging in restore the account; s2 confirms that  |
| inst-0078 | B | 3 | False | agent-04 | c1 | 0.94 | s1 states deletion executes in 30 days and places ‘Log in to cancel’ immediately beside the delay; s2 shows login cancel |
| inst-0079 | B | 1 | False | agent-08 | c0 | 0.92 | The fragments show a checked +$39.99 protection-plan checkbox before completion, copy urging the user to keep it selecte |
| inst-0079 | B | 1 | False | agent-08 | c1 | 0.95 | Two ontology conditions are observed. O5/Bad Defaults: s0 has a provider-favorable financial add-on (+$39.99) initialize |
| inst-0082 | A | 3 | True | agent-10 | c0 | 0.78 | The lamp shows both $299 MSRP and $149 current price with an explicit 50% saving, then adds the item normally; the fragm |
| inst-0087 | B | 1 | False | agent-01 | c0 | 0.95 | A 309-word, 8px scrollbox buries automatic renewal at $49.99 and the cancellation route inside dense terms, without visu |
| inst-0087 | B | 1 | False | agent-01 | c1 | 0.95 | Hidden Information #1–#3 fires in s0–s1: the renewal/cancellation clause is buried in an overflow scrollbox, tiny text,  |
| inst-0089 | A | 3 | True | agent-04 | c0 | 0.68 | s0 shows a clear PLN 199 vs PLN 299 comparison and calculates the 33% saving; nothing indicates the reference price is f |
| inst-0093 | B | 3 | False | agent-05 | c0 | 0.88 | Every state repeats ‘Hurry,’ ‘ends soon,’ and ‘don’t risk missing out’; requests for the exact end time receive only eva |
| inst-0093 | B | 3 | False | agent-05 | c1 | 0.9 | s0-s3 repeat high-pressure scarcity while the answer states never provide a concrete deadline; Limited Time Message #3 f |
| inst-0095 | B | 3 | False | agent-08 | c0 | 0.84 | The initial fragment presents five personalization checkboxes, with three already checked; labels include technical phra |
| inst-0095 | B | 3 | False | agent-08 | c1 | 0.92 | Customisation #3 fires in s0: all five privacy toggles use technical/domain jargon and each accompanying description exp |
| inst-0096 | B | 1 | False | agent-01 | c0 | 0.95 | The advertised $129.00 in s0 becomes $143.99 after a booking fee in s1 and $165.89 after convenience and tax charges in  |
| inst-0096 | B | 1 | False | agent-01 | c1 | 0.95 | Drip Pricing #1/#3 fires across s0–s3: $129.00 is advertised first, mandatory fees appear progressively in s1–s2, and O4 |
| inst-0097 | B | 3 | False | agent-09 | c0 | 0.74 | s0–s1 make free users face pre-roll ads that escalate from 5s to 10s to 15s, and the interface describes the longer ads  |
| inst-0097 | B | 3 | False | agent-09 | c1 | 0.78 | s0–s1 show deliberately increasing ad friction for the free plan; Pay To Avoid #1 fires from artificial degradation, alt |
| inst-0098 | B | 2 | False | agent-04 | c0 | 0.84 | Delete account is placed immediately beside Save changes with identical full-button treatment, inviting accidental destr |
| inst-0098 | B | 2 | False | agent-04 | c1 | 0.85 | s0–s1 keep the destructive Delete account within the stated safety-margin radius of Save changes; Reduced Friction #2 fi |
| inst-0100 | B | 1 | False | agent-07 | c0 | 0.94 | The camera offer contains a prechecked $49 warranty labeled ‘cannot be removed’; after Add to cart, the cart includes bo |
| inst-0100 | B | 1 | False | agent-07 | c1 | 0.95 | s0 has a checked, disabled warranty checkbox explicitly marked non-removable; s1’s cart contains the $899 camera plus $4 |
| inst-0103 | B | 3 | False | agent-07 | c0 | 0.83 | The upsell repeats WAIT, Don’t miss out, Last chance, only 3 left, expires soon, and Hurry; the alternative is framed as |
| inst-0103 | B | 3 | False | agent-07 | c1 | 0.86 | s0 contains dense urgency and scarcity language (‘only 3 left’, ‘expires soon’, ‘last chance’, ‘hurry’), and s1 confirms |
| inst-0108 | A | 2 | True | agent-02 | c1 | 0.58 | s0–s1 show animated social proof, but “in the last hour” is an honest temporal qualifier; High Demand #1/#3 are unverifi |
| inst-0109 | B | 1 | False | agent-06 | c0 | 0.64 | The dashboard advertises depth 0/6 and offers an irrelevant Messages branch; after s1 that branch explicitly says nothin |
| inst-0110 | B | 1 | False | agent-05 | c0 | 0.9 | The annual plan is priced only as 2,990 Coins, and the interface says its real-money value is never stated even when ask |
| inst-0110 | B | 1 | False | agent-05 | c1 | 0.93 | s0-s1 show 2,990 Coins and explicitly report convert(...)=none with no PLN/USD/EUR mapping; Price Comparison Prevention  |
| inst-0113 | B | 2 | False | agent-07 | c0 | 0.7 | Auto-renewal and the $49.99 charge are disclosed only in a tiny 6px gray line beneath the prominent trial CTA, making a  |
| inst-0113 | B | 2 | False | agent-07 | c1 | 0.78 | s0 and s1 place the auto-renewal/$49.99 disclosure in a 6px gray text button below an 11px primary CTA. Hidden Informati |
| inst-0117 | B | 2 | False | agent-09 | c0 | 0.68 | The cart already contains a supplementary 2-Year Extended Warranty with the headphones and no opt-in control; s1 explici |
| inst-0117 | B | 2 | False | agent-09 | c1 | 0.58 | s0 shows a supplementary warranty already in the cart and s1 calls it “Surcharge camouflaged into your total”; Sneak Int |
| inst-0118 | A | 2 | True | agent-08 | c1 | 0.58 | BENIGN under the formal protocol: s0→s1 adds only the text 'Invisible consent captured' after activation. No checkbox/to |
| inst-0122 | B | 2 | False | agent-08 | c0 | 0.84 | The fragment makes ‘Create account & checkout’ a large bold filled button while ‘Continue as guest’ is an 8px underlined |
| inst-0122 | B | 2 | False | agent-08 | c1 | 0.87 | s0 and s1 both retain a guest button, so O3 and Forced Registration condition 1 (absolute blocking) do not fire; however |
| inst-0125 | A | 1 | True | agent-07 | c0 | 0.58 | Across s0–s3 all five energy indicators remain available and Harvest remains usable; the 30-minute refill statement desc |
| inst-0125 | A | 1 | True | agent-07 | c1 | 0.58 | s0–s3 keep the Harvest control available and the energy display unchanged while the harvest count rises 0→3. Playing By  |
| inst-0126 | B | 2 | False | agent-03 | c0 | 0.82 | The only prompt says Nothing to read — just hit the button, and s1 reports Invisible consent captured, indicating consen |
| inst-0126 | B | 2 | False | agent-03 | c1 | 0.6 | The sole s0 action moves directly to s1 Invisible consent captured with no confirmation or consent control; Reduced Fric |
| inst-0127 | B | 3 | False | agent-04 | c0 | 0.92 | A $4.99 charge is presented as ‘Unlock’/‘enhance your journey’ rather than a purchase, with the price relegated to 7px t |
| inst-0127 | B | 3 | False | agent-04 | c1 | 0.88 | s0 frames the $4.99 transaction as ‘Unlock’ and s1 confirms payment; Pay-To-Play #3 fires because the payment is semanti |
| inst-0128 | A | 1 | True | agent-01 | c0 | 0.82 | The dashboard visibly offers a direct Settings button; seeing that Messages has no deletion information does not by itse |
| inst-0128 | A | 1 | True | agent-01 | c1 | 0.7 | No Immortal Accounts or Labyrinthine Navigation condition is observed: s0 has a direct Settings route, while s1 only sho |
| inst-0130 | B | 1 | False | agent-07 | c0 | 0.95 | s0 shows a free trial with a cached payment token; s1 activates Premium and charges $14.99 to that card without a prompt |
| inst-0130 | B | 1 | False | agent-07 | c1 | 0.95 | s0→s1 shows trial→premium and a charge to the cached card, with the trace explicitly stating no prompt, email warning, o |
| inst-0131 | B | 1 | False | agent-05 | c0 | 0.9 | Account deletion is scheduled 30 days after the request rather than performed immediately, with no visible cancellation  |
| inst-0131 | B | 1 | False | agent-05 | c1 | 0.94 | s1-s2 schedule deletion 30 days/720 hours after submission, provide no cancel or reversal affordance in any state, and c |
| inst-0132 | B | 2 | False | agent-06 | c0 | 0.96 | s0 explicitly identifies the dialog close target as a faded 8×8px X in the corner, with a 2×2 CSS hitbox and zero minimu |
| inst-0132 | B | 2 | False | agent-06 | c1 | 0.94 | s0 fires Small or Moving Close Button #2: the close element’s rendered h-2 w-2 / 8×8px hitbox is microscopic relative to |
| inst-0136 | B | 3 | False | agent-10 | c0 | 0.92 | The account/privacy settings screen is explicitly marked ‘No exit’ and lists data export, marketing, and retention contr |
| inst-0136 | B | 3 | False | agent-10 | c1 | 0.9 | s0’s visible account settings contain no deletion keyword or affordance, firing Immortal Accounts #3; O3/O6 find no capt |
| inst-0140 | B | 2 | False | agent-02 | c0 | 0.72 | The scroll region states that the footer keeps moving as the user scrolls, while the footer itself is presented as an ev |
| inst-0140 | B | 2 | False | agent-02 | c1 | 0.6 | s0 labels the footer “keeps moving” and offers Scroll to bottom, supporting Infinite Scrolling #2/#3; the actual displac |
| inst-0141 | A | 2 | True | agent-08 | c0 | 0.58 | Fragment s0 shows an active Premium plan with renewal in 7 days and $14.99/month stated next to the payment method; it d |
| inst-0141 | A | 2 | True | agent-08 | c1 | 0.92 | Across s0-s3, renewal moves 7→6→5→4 days monotonically; O1 supports a progressing deadline, and O4/E2 supports normal pr |
| inst-0142 | B | 1 | False | agent-08 | c1 | 0.94 | Countdown Timer #1 is corroborated across states: s0 is 14:58/session #0, s1 advances to 14:57, then s2 and s3 show new  |
| inst-0143 | A | 1 | True | agent-04 | c0 | 0.58 | s0–s1 show ‘Only 2 left at this price!’ and a pulsing badge, but no fragment evidence proves the stock claim is false or |
| inst-0143 | A | 1 | True | agent-04 | c1 | 0.55 | The counter remains 2 before and after adding to cart, so O2 is negative; actual inventory and badge hue are unobservabl |
| inst-0145 | B | 3 | False | agent-07 | c0 | 0.8 | The feed labels the hostile post as Boosted with 6,300 views, while the civil post is Not boosted with only 1,400; the i |
| inst-0145 | B | 3 | False | agent-07 | c1 | 0.87 | s0 shows the hostile item at 6,300 views and Boosted versus the civil item at 1,400 and Not boosted; s1 changes the comp |
| inst-0148 | A | 3 | True | agent-01 | c1 | 0.55 | Grinding #3 is not established: s0–s2 show no milestone and s3 shows the first one, so an increasing inter-milestone sch |
| inst-0152 | B | 1 | False | agent-10 | c0 | 0.93 | Accept all is one prominent action, while declining requires individually switching off all 24 named partners; the UI ex |
| inst-0152 | B | 1 | False | agent-10 | c1 | 0.94 | s0/s1 show a one-click Accept all path versus 24 partner toggles and no reject-all control, firing Privacy Maze #1/#2 an |
| inst-0156 | B | 2 | False | agent-06 | c0 | 0.93 | Across s0–s3, the same collection action yields +20%, then +10%, then +5% progress while the copy says the bar barely mo |
| inst-0156 | B | 2 | False | agent-06 | c1 | 0.92 | s0→s3 fires Grinding #2: the observed visual reward increments decline 20%→10%→5%, directly showing a diminishing-return |
| inst-0158 | A | 2 | True | agent-03 | c0 | 0.7 | The social-proof messages name Sarah and Mike and include New York, Berlin, and last-hour context; the fragment does not |
| inst-0158 | A | 2 | True | agent-03 | c1 | 0.6 | States s0-s1 show attributable, time/geography-qualified purchase messages; High Demand #3 fails, while authenticity/ani |
| inst-0159 | B | 2 | False | agent-02 | c0 | 0.84 | The card promises “cancel anytime” but also imposes a 12-month minimum and a $49 early-cancellation fee; the exit path i |
| inst-0159 | B | 2 | False | agent-02 | c1 | 0.82 | s0–s1 place “cancel anytime” beside “12-month minimum term” and an early fee; Conflicting Information #1/#3 fire even th |
| inst-0160 | B | 2 | False | agent-09 | c0 | 0.9 | s0 highlights “98%” but gives no review count or denominator, so the social-proof metric cannot be checked against a sca |
| inst-0160 | B | 2 | False | agent-09 | c1 | 0.9 | s0 supplies the unit % but no denominator or baseline; Information Without Context #3 fires and E3’s unit-and-denominato |
| inst-0161 | A | 2 | True | agent-04 | c0 | 0.55 | s0 shows each icon control next to a visible descriptive label (‘Account protection,’ ‘Activity alerts,’ or ‘Partner int |
| inst-0161 | A | 2 | True | agent-04 | c1 | 0.55 | The icon buttons have adjacent visible descriptors in s0, so Feedforward Ambiguity #2’s missing-context condition is not |
| inst-0162 | B | 3 | False | agent-05 | c0 | 0.78 | A visibly marked AD card uses ‘Continue reading’ and a full-width ‘Next’ button beside the article, making an advertisem |
| inst-0162 | B | 3 | False | agent-05 | c1 | 0.62 | s0-s1 show the AD card using native-looking ‘Next’/‘Continue reading’; Disguised Ad #3 semantic mimicry is observed, but |
| inst-0164 | B | 3 | False | agent-08 | c0 | 0.84 | Fragment evidence only: the free-trial button carries an auto-renewal/$5 monthly-fee title, while the same adverse terms |
| inst-0164 | B | 3 | False | agent-08 | c1 | 0.91 | The full trace keeps the fee and auto-renewal language only in a collapsed <details> block and a hover title in s0, then |
| inst-0165 | B | 1 | False | agent-10 | c0 | 0.9 | After Play video, s1 inserts a full sponsored ad and disables ‘Skip in 15s,’ forcing the viewer to wait before regaining |
| inst-0165 | B | 1 | False | agent-10 | c1 | 0.9 | s1 shows the ad’s Skip control disabled while a 15-second timer runs and no alternative close control, firing Countdown  |
| inst-0170 | B | 2 | False | agent-10 | c0 | 0.88 | The sale combines warm red-orange styling, ‘Only today — ends in 4 hours,’ ‘Don’t miss it,’ and a claim that full-price  |
| inst-0170 | B | 2 | False | agent-10 | c1 | 0.9 | s1 records hue 15° within the urgency spectrum and a true ‘ends in/only today’ match, directly firing Limited Time Messa |
| inst-0171 | B | 1 | False | agent-01 | c0 | 0.95 | Pro and Deluxe both cost $12, but Deluxe offers only 10 GB, no sync, and one device versus Pro’s 100 GB, sync, and three |
| inst-0171 | B | 1 | False | agent-01 | c1 | 0.95 | Asymmetric Dominance #1 fires across s0–s1: the $12 Deluxe option is structurally comparable in price but inferior on ev |
| inst-0172 | B | 3 | False | agent-08 | c0 | 0.78 | The fragments expand the feed from 6 to 12 to 18 to 24 items through repeated loading, and s3 says more posts are loadin |
| inst-0172 | B | 3 | False | agent-08 | c1 | 0.82 | Infinite Scrolling semantic-attenuation condition #3 fires because s3 explicitly records zero boundary markers. O1 and O |
| inst-0173 | B | 3 | False | agent-09 | c0 | 0.96 | s0 shows the third-party data-sharing agreement in a checked box and explicitly says it was already checked; s1 confirms |
| inst-0173 | B | 3 | False | agent-09 | c1 | 0.95 | s0–s1 show a checked third-party-sharing box with no user event and the text “already checked”; O5 and Bad Defaults #1/A |
| inst-0174 | B | 2 | False | agent-04 | c0 | 0.88 | The English cookie prompt places the opt-out action only in French (‘Refuser les cookies non essentiels’) while the acqu |
| inst-0174 | B | 2 | False | agent-04 | c1 | 0.86 | s0 presents English session text but the critical decline button is French despite locale en-US; Wrong Language #2/#3 fi |
| inst-0179 | B | 2 | False | agent-10 | c0 | 0.82 | The Settings UI says reaching ‘Data & cookies’ requires up to six expanding levels; s1 exposes only shallow entries at 1 |
| inst-0179 | B | 2 | False | agent-10 | c1 | 0.78 | s1 shows nested Account settings → General preferences at 12px while the UI states nesting up to six levels and points t |
| inst-0180 | A | 2 | True | agent-07 | c0 | 0.72 | The setup presents 14 preferences with unchecked checkboxes, visible select choices, and an explicit review/save action; |
| inst-0180 | A | 2 | True | agent-07 | c1 | 0.85 | s0 and s1 show the same 14 settings, with no checkbox marked checked and all preference controls visible. Choice Overloa |
| inst-0181 | B | 2 | False | agent-08 | c0 | 0.93 | Fragment-only evidence shows a pulsing "Limited-time" panel with a 02:59:41 countdown, "last chance" language, and a rew |
| inst-0181 | B | 2 | False | agent-08 | c1 | 0.93 | Countdown Timer #1/#3 fire: the exact 02:59:41 value and urgency copy persist from s0 to s1 even after the reward action |
| inst-0183 | B | 2 | False | agent-02 | c0 | 0.95 | A full paywall prompts “Unlock now — $3.99” while its close control is only 16×16; s1 confirms the paid transaction unlo |
| inst-0183 | B | 2 | False | agent-02 | c1 | 0.95 | s0–s1 show a dominant payment-unlock overlay and a tiny 16×16 dismissal target; Pay-To-Play #2/#3 fire, with s1 confirmi |
| inst-0184 | A | 3 | True | agent-03 | c0 | 0.9 | Each state adds six listings only after the visible Show more results action; the interface does not autonomously inject |
| inst-0184 | A | 3 | True | agent-03 | c1 | 0.94 | States s0-s3 increase 6→12→18→24 only through the visible Show more results control; Infinite Scrolling #1 fails because |
| inst-0185 | B | 2 | False | agent-03 | c0 | 0.95 | The hub states that 12 locked assets were written to disk during install, then presents most of them as $7.99 unlock opp |
| inst-0185 | B | 2 | False | agent-03 | c1 | 0.95 | States s0-s1 explicitly describe locally installed assets, 12 locked versus only 2 accessible, and repeated Unlock — $7. |
| inst-0186 | B | 3 | False | agent-03 | c0 | 0.9 | The cancellation page places a crying mascot beside You’re breaking our heart and Sad to see you go, while the alternati |
| inst-0186 | B | 3 | False | agent-03 | c1 | 0.93 | The mascot and guilt copy are adjacent in s0-s1; Cuteness #3 and Confirmshaming #3 fire through the tightly paired affec |
| inst-0189 | B | 1 | False | agent-02 | c1 | 0.8 | s0 fuses Terms, Privacy, and advertising-partner sharing into one acceptance control with no separate third-party toggle |
| inst-0191 | B | 3 | False | agent-01 | c0 | 0.72 | The refresh flow openly uses variable-reward language: most pulls give nothing, some surprise the user, and the page ask |
| inst-0194 | B | 1 | False | agent-04 | c0 | 0.95 | The installer says optional premium files will be written regardless of consent, and storage drops from 120.0 GB to 96.6 |
| inst-0194 | B | 1 | False | agent-04 | c1 | 0.94 | s0–s1 show no checkbox, an explicit ‘payload is written regardless’ notice, and unrequested local storage consumption; P |
| inst-0197 | B | 2 | False | agent-05 | c0 | 0.88 | Entering cancellation adds a large sad puppy and ‘Don’t leave us…’ before the user can confirm cancellation, using guilt |
| inst-0197 | B | 2 | False | agent-05 | c1 | 0.93 | s0→s1 injects a large sad puppy only in the cancellation flow with ‘Don’t leave us…’; Cuteness #1-#3 and guilt proximity |
| inst-0199 | B | 3 | False | agent-04 | c0 | 0.86 | The prominent ‘SAVE 50’ metric has no unit or denominator in s0, while its actual PLN threshold appears only in the late |
| inst-0200 | A | 2 | True | agent-04 | c0 | 0.75 | s0–s1 show 4,500 Gems alongside a visible approximate $45.00 equivalence; the price and cosmetic-only nature are disclos |
| inst-0202 | A | 2 | True | agent-03 | c0 | 0.7 | The countdown is transparently tied to the named Harvest Moon Festival and a double-points event; no reset, hidden cost, |
| inst-0202 | A | 2 | True | agent-03 | c1 | 0.6 | States s0-s1 preserve the same event timer and show a concrete seasonal-event context; O1 finds no reset, and E4 counsel |
| inst-0205 | B | 3 | False | agent-06 | c0 | 0.86 | The s0 product cards show two sizes and headline PLN prices but no per-volume comparison; s1 explicitly says the compari |
| inst-0205 | B | 3 | False | agent-06 | c1 | 0.91 | s0/s1 fire Price Comparison Prevention #3: 500 ml and 1 L are priced in fiat, but no “per liter” or equivalent unit-pric |
| inst-0206 | B | 1 | False | agent-06 | c0 | 0.93 | Clicking the s0 “Buy now” action leads directly to s1 “Payment processed”; the fragment states there was no separate rev |
| inst-0206 | B | 1 | False | agent-06 | c1 | 0.93 | s0→s1 fires Reduced Friction #1/#3: a one-click purchase commits immediately, with no confirmation interstitial or confi |
| inst-0207 | B | 3 | False | agent-06 | c0 | 0.68 | The mascot’s upgrade pitch says Pip is “counting on you” to spend $2.99, applying direct emotional pressure beside Upgra |
| inst-0208 | B | 2 | False | agent-05 | c0 | 0.82 | The full-width, shadowed renewal button dominates a tiny underlined cancel link, which is paired with loss-of-access pre |
| inst-0208 | B | 2 | False | agent-05 | c1 | 0.83 | s0-s1 give renewal a large 12px/py-3.5 filled button and cancel an 8px text link with loss framing; False Hierarchy #2/# |
| inst-0210 | B | 3 | False | agent-03 | c0 | 0.9 | The stated goal is account deletion, but s0-s3 route it through irrelevant menu categories, advancing only from step 1/7 |
| inst-0210 | B | 3 | False | agent-03 | c1 | 0.92 | States s0-s3 visibly advance a deletion task through a seven-step menu of low-similarity categories; Labyrinthine Naviga |
| inst-0212 | B | 3 | False | agent-03 | c0 | 0.8 | Clicking the prominent Start my plan button immediately produces a $29.99 charge, while the surrounding offer emphasizes |
| inst-0212 | B | 3 | False | agent-03 | c1 | 0.86 | The s0→s1 action immediately charges $29.99/month with no confirmation interstitial or confirmation wording; Reduced Fri |
| inst-0214 | B | 3 | False | agent-10 | c0 | 0.95 | The consent modal grants location sharing with 14 partners automatically after a 1-second window; s2 says the countdown  |
| inst-0214 | B | 3 | False | agent-10 | c1 | 0.95 | s1 shows a 1.0s timed-consent window, automatic registration, and ‘Customize (coming soon)’; s2 confirms consent without |
| inst-0218 | B | 1 | False | agent-03 | c0 | 0.94 | The product claims 5.0 from 1,284 reviews and says every rating is a 5-star Verified Purchase, an implausibly variance-f |
| inst-0218 | B | 1 | False | agent-03 | c1 | 0.95 | States s0-s1 preserve a 5.0 rating across 1,284 reviews while every rating is five-star; Endorsement and Testimonials #1 |
| inst-0221 | B | 1 | False | agent-07 | c0 | 0.8 | Accept All is a large filled 11px button, while Customise settings is a small 9px underlined link; the trace offers no v |
| inst-0221 | B | 1 | False | agent-07 | c1 | 0.82 | s0 shows Accept All as the dominant filled control and Customise settings as a smaller text link; s1 only reports saved  |
| inst-0223 | B | 2 | False | agent-08 | c0 | 0.93 | The fragment shows a 0:57 countdown, "HURRY!", "Only 57 seconds left at this price!", and "Offer expires in 59 seconds"  |
| inst-0223 | B | 2 | False | agent-08 | c1 | 0.94 | Pressured Selling #2 fires in s0 and s1: the $19.99 extended-care upsell has a 0:57/59-second timer plus CSS dp-shake an |
| inst-0224 | B | 1 | False | agent-10 | c0 | 0.95 | The feed says new stories arrive on their own with no Load More control; s1–s3 show loading more posts and counts growin |
| inst-0224 | B | 1 | False | agent-10 | c1 | 0.95 | s0–s3 provide cross-state autonomous additions (8→10→12) and no semantic boundary or Load More action, firing Infinite S |
| inst-0225 | B | 3 | False | agent-06 | c0 | 0.98 | s1 explicitly shows a sent promotional message presented as Alex Rivera’s verified personal invite to the selected conta |
| inst-0225 | B | 3 | False | agent-06 | c1 | 0.97 | s1 fires Friend Spam #3: the outbound message uses the user identity “Alex Rivera” while carrying PopSocial signup/disco |
| inst-0226 | B | 1 | False | agent-01 | c0 | 0.9 | Accept All is a large prominent button, while Manage options is a small text link; s1 states that the quieter route requ |
| inst-0226 | B | 1 | False | agent-01 | c1 | 0.9 | Privacy Maze #1/#2 fires: s0 gives Accept All the dominant surface and a buried Manage options route, while s1 records s |
| inst-0232 | B | 2 | False | agent-01 | c0 | 0.95 | Clicking Play video changes s0 into a sponsored ad in s1 with no exit available until 15 seconds, removing immediate con |
| inst-0232 | B | 2 | False | agent-01 | c1 | 0.95 | Countdown On Ads #1/#2 fires from s0→s1: Play leads to a sponsored overlay with no skip/close until 15s; O6 confirms no  |
| inst-0238 | B | 1 | False | agent-02 | c0 | 0.7 | The camera flow asks for location access, and s1 says the camera stays blocked until Allow despite a visible Not now opt |
| inst-0238 | B | 1 | False | agent-02 | c1 | 0.6 | s0–s1 show camera use gated on a location grant, supporting Granting and Interaction #1; technical dependency and the fu |
| inst-0241 | B | 1 | False | agent-06 | c0 | 0.98 | s0 selects 248 contacts and offers +500 coins to unlock the app; s1 states that all 248 received unsolicited notificatio |
| inst-0241 | B | 1 | False | agent-06 | c1 | 0.96 | s1 fires Encouraging Anti-Social Behavior #1: unsolicited broadcasts to 248 contacts produce an immediate +500-coin rewa |
| inst-0242 | B | 1 | False | agent-08 | c0 | 0.75 | The fragment starts account deletion at "Step 0 of 7" and explicitly mentions "7 interactions," making the exit path app |
| inst-0242 | B | 1 | False | agent-08 | c1 | 0.88 | Immortal Accounts #1 fires: s0 visibly reports the deletion flow as "Step 0 of 7" and "7 interactions," exceeding the on |
| inst-0245 | B | 2 | False | agent-04 | c0 | 0.95 | A financial order auto-confirms at 00:00 after a 13-second countdown, and s1 shows it confirmed without a visible cancel |
| inst-0245 | B | 2 | False | agent-04 | c1 | 0.94 | s0 announces an order auto-confirming at 00:00 and s1 shows confirmation; Automating The User Away #1/#2 fire, while the |
| inst-0246 | B | 2 | False | agent-10 | c0 | 0.78 | The plan exposes 30 separate $2/mo add-on choices in a dense six-column grid and asks the user to review them all, creat |
| inst-0246 | B | 2 | False | agent-10 | c1 | 0.84 | s0–s3 render 30 actionable add-on buttons in one decision context, directly exceeding Choice Overload #1’s >20 threshold |
| inst-0247 | B | 3 | False | agent-05 | c1 | 0.8 | s0-s1 expose reward intensities 1→3→9 and escalating ‘exclusive,’ ‘premium,’ and ‘Circle’ language; Social Pyramid #3 fi |
| inst-0249 | A | 3 | True | agent-06 | c1 | 0.55 | s0→s1 shows only one refresh entering a loading state; no repeated outcomes, artificial delay, threshold physics, or rew |
| inst-0252 | A | 3 | True | agent-10 | c0 | 0.7 | The referral tiers are plainly labeled with invite counts and optional rewards, with no locked core feature, forced broa |
| inst-0253 | B | 3 | False | agent-06 | c0 | 0.78 | The trial option is gain-framed with “unlock everything,” while the alternative threatens lost exports, downgrade, and l |
| inst-0253 | B | 3 | False | agent-06 | c1 | 0.81 | s0 fires Positive or Negative Framing #2/#3: the mutually exclusive trial/free radios receive unequal visual emphasis an |
| inst-0254 | B | 1 | False | agent-06 | c0 | 0.94 | Free progression escalates from 1 to 2 to 4 taps across s0–s3, then offers a $4.99 instant stage skip, explicitly moneti |
| inst-0254 | B | 1 | False | agent-06 | c1 | 0.95 | s0→s3 fires Pay-To-Play #1/#3: free effort grows 1→2→4 taps while a paid “Skip this stage instantly — $4.99” bypasses th |
| inst-0257 | B | 2 | False | agent-10 | c0 | 0.95 | In s0 a z-index 1000 cookie overlay covers the app and offers only ‘Accept all’; no close, reject, manage, or cancel con |
| inst-0257 | B | 2 | False | agent-10 | c1 | 0.94 | s0 is an overlay with z-index 1000 and C_dismiss empty, with only ‘Accept all’; Dead End #2 fires and O6 finds no dismis |
| inst-0258 | A | 2 | True | agent-02 | c0 | 0.84 | Both granola options visibly show their unit prices as PLN per 100 g alongside the pack prices, enabling direct comparis |
| inst-0258 | A | 2 | True | agent-02 | c1 | 0.86 | s0–s1 render “PLN 2.58 / 100 g” and “PLN 2.29 / 100 g”; Price Comparison Prevention #3 fails because Q_standard is prese |
| inst-0262 | B | 2 | False | agent-06 | c0 | 0.96 | After the s0 Play action, s1 places a notification permission prompt at the exact coordinates of Play; s2 says the swap  |
| inst-0262 | B | 2 | False | agent-06 | c1 | 0.96 | s0→s1 fires Granting and Interaction #2: the system prompt is injected at (212, 288), the Play button’s coordinates, imm |
| inst-0263 | B | 3 | False | agent-07 | c0 | 0.9 | Opening the crate requires watching a 4-second ad, while the copy uses extreme superlatives and a 0.01% rare-loot claim  |
| inst-0263 | B | 3 | False | agent-07 | c1 | 0.92 | s0→s1 turns ‘Watch 1 ad to open’ into a 0:04 ad gate with progress at 0%. Watch Ads To Unlock Features #1 and Countdown  |
| inst-0268 | B | 2 | False | agent-10 | c0 | 0.88 | Privacy sharing with advertising partners is already on, while the essential-only alternative is smaller and 60% opaque; |
| inst-0268 | B | 2 | False | agent-10 | c1 | 0.9 | s0 has aria-checked=true for ‘Share data with advertising partners’ and aria-checked=false for the subdued essential-onl |
| inst-0272 | B | 2 | False | agent-04 | c0 | 0.91 | The large, uppercase free-trial button dominates the paywall while the decline option is a small plain link framed as co |
| inst-0272 | B | 2 | False | agent-04 | c1 | 0.9 | s0–s1 make the business-favorable trial a large filled button and the opposing choice a bare link; False Hierarchy #1/#2 |
| inst-0273 | B | 1 | False | agent-05 | c0 | 0.91 | Automatic renewal and no-further-confirmation billing are buried in nested Terms details at DOM depth 6 and in tiny text |
| inst-0273 | B | 1 | False | agent-05 | c1 | 0.92 | s0 places an automatic-renewal/charge-without-confirmation clause in collapsed nested details at DOM=6; Hidden Informati |
| inst-0274 | B | 3 | False | agent-02 | c0 | 0.82 | A control labeled “Continue” is described as a way to keep reading but s1 reveals that it actually dismissed the modal. |
| inst-0274 | B | 3 | False | agent-02 | c1 | 0.86 | s0→s1 shows “Continue” resolving to modal dismissal; Feedforward Ambiguity #1 fires on the observed label/outcome diverg |
| inst-0275 | B | 3 | False | agent-04 | c0 | 0.9 | Signup uses friendly simple copy with no renewal warning, while cancellation uses a long guilt-heavy paragraph about aba |
| inst-0275 | B | 3 | False | agent-04 | c1 | 0.91 | s0 omits renewal/cancellation language, whereas s1 adds complex guilt framing (‘irreversible,’ ‘lose all benefits,’ ‘for |
| inst-0278 | B | 1 | False | agent-06 | c0 | 0.79 | The first radio option is gain-framed with a Best deal badge, gift icon, bold claim, and savings copy, while the equal a |
| inst-0278 | B | 1 | False | agent-06 | c1 | 0.84 | s0 fires Positive or Negative Framing #1/#2/#3: mutually exclusive radios are structurally and visually asymmetric, with |
| inst-0280 | B | 1 | False | agent-08 | c0 | 0.92 | The HTML fragments show a one-time $89 purchase progressing from s0 to s1, where the interface explicitly says "No guest |
| inst-0280 | B | 1 | False | agent-08 | c1 | 0.94 | Forced Registration #1 fires: s1 explicitly states that no guest checkout exists and an account is required, and s2 conf |
| inst-0281 | B | 2 | False | agent-04 | c0 | 0.76 | The $49 headline is prominent while mandatory processing and service fees are a tiny light-gray 8px line inside a clicka |
| inst-0281 | B | 2 | False | agent-04 | c1 | 0.82 | s0–s1 render the fee disclosure at 8px/light gray against a 20px headline, a severe relative suppression; Drip Pricing # |
| inst-0282 | B | 2 | False | agent-09 | c0 | 0.94 | s0–s3 show the visual reward bar overstating actual progress by 0%, 10%, 20%, and 30% while the user watches ads to unlo |
| inst-0282 | B | 2 | False | agent-09 | c1 | 0.95 | s0–s3 explicitly pair bars at 20/40/60% with actual markers at 10/20/30%; Watch Ads To Unlock Features #2 fires with cro |
| inst-0283 | B | 2 | False | agent-03 | c0 | 0.87 | In s0 every shown contact is already checked, 19 more are said to be selected, and the dominant action is Invite all 24  |
| inst-0283 | B | 2 | False | agent-03 | c1 | 0.8 | At s0 all 24 contacts are preselected and the copy says just confirm; Bad Defaults #1 and Friend Spam #2/O5 apply, thoug |
| inst-0284 | B | 1 | False | agent-05 | c0 | 0.93 | The page claims others are buying now, while its visible backend event log has zero entries and says no transactions wer |
| inst-0284 | B | 1 | False | agent-05 | c1 | 0.95 | s0 directly contrasts ‘Others are buying right now’ with real(t)=0 and no records; High Demand #1’s displayed-versus-tru |
| inst-0285 | B | 3 | False | agent-07 | c0 | 0.84 | The interface claims 128 people are viewing the item but supplies no time or location boundary; s1 explicitly calls the  |
| inst-0285 | B | 3 | False | agent-07 | c1 | 0.88 | s0 and s1 repeat the precise ‘128 people are viewing this’ claim without a temporal or geographic qualifier, and s1 expl |
| inst-0287 | A | 1 | True | agent-10 | c0 | 0.88 | The single state shows an ordinary ‘Hold to pull down’ refresh control and a clear instruction; no forced wait, hidden c |
| inst-0287 | A | 1 | True | agent-10 | c1 | 0.55 | Only s0 is captured: a labeled hold-to-refresh control is present, but no state shows resistance, artificial animation d |
| inst-0288 | B | 3 | False | agent-05 | c0 | 0.84 | The offer repeats ‘only 3 left,’ ‘selling fast,’ ‘ends soon,’ ‘last chance,’ and ‘don’t miss out’ without giving a concr |
| inst-0288 | B | 3 | False | agent-05 | c1 | 0.88 | s0-s1 repeat dense scarcity language and provide no concrete deadline or timer; Limited Time Message #3 and FOMO #3 fire |
| inst-0289 | B | 2 | False | agent-08 | c0 | 0.77 | The fragments visibly couple free access to a 10-second wait with ‘Pay $1.99 for instant access’/‘Skip the wait — $1.99’ |
| inst-0289 | B | 2 | False | agent-08 | c1 | 0.93 | s0→s1 inserts an absolute z-10 waiting overlay with a 10-second countdown, a paid skip button, and an explicit 78% area/ |
| inst-0290 | B | 1 | False | agent-09 | c0 | 0.84 | s0 shows a feed already appending next reels and explicitly says there is no end marker or Load More control, preventing |
| inst-0290 | B | 1 | False | agent-09 | c1 | 0.84 | s0 observes “appending next reels,” no boundary marker, and no Load More control; Infinite Scrolling #1 and #3 fire. |
| inst-0291 | B | 3 | False | agent-08 | c0 | 0.88 | Fragment s0 visibly couples a free-30-day trial with automatic full-price renewal and presents an extremely convoluted c |
| inst-0291 | B | 3 | False | agent-08 | c1 | 0.89 | Trick Questions #3 fires on the visible checkbox label: the DOM trace itself states 15 negation words and the sentence c |
| inst-0292 | B | 3 | False | agent-04 | c0 | 0.86 | The plan-selection button says ‘Next,’ but s2 shows a $29 charge and active subscription rather than a review/confirmati |
| inst-0292 | B | 3 | False | agent-04 | c1 | 0.92 | The s1 ‘Next’ action leads directly to s2 ‘Subscription active’ and ‘Charged $29.00’; Feedforward Ambiguity #3 and Reduc |
| inst-0293 | B | 3 | False | agent-08 | c0 | 0.84 | s0 shows three premium add-ons marked Download while displaying NebulaDrift data/media paths, and says to get them ‘befo |
| inst-0293 | B | 3 | False | agent-08 | c1 | 0.94 | s0→s1 leaves the library rows unchanged and adds that the 4K Texture Pack (4.2 GB) is already at the local path, was tra |
| inst-0294 | B | 2 | False | agent-09 | c0 | 0.88 | s0 displays a 4,500-Gem price while the about-$45 real cost is tiny; s1 confirms it was printed at 7px against a 16px ba |
| inst-0294 | B | 2 | False | agent-09 | c1 | 0.92 | s0–s1 show the real-currency equivalent at 7px versus a 16px base (0.44), firing Intermediate Currency #2. |
| inst-0295 | A | 3 | True | agent-08 | c0 | 0.82 | Although the fragment shows a breadcrumb progressing from step 1/7 to step 4/7, every loaded state visibly includes the  |
| inst-0295 | A | 3 | True | agent-08 | c1 | 0.84 | Labyrinthine Navigation does not fire on the observed DOM: the user-favorable ‘Terminate account’ destination is visibly |
| inst-0296 | B | 3 | False | agent-10 | c0 | 0.94 | The prompt frames address-book access as ‘Find your friends’ and ‘Let your contacts know you’re here’; s1 reveals that 1 |
| inst-0296 | B | 3 | False | agent-10 | c1 | 0.93 | s1 explicitly reports 128 contacts uploaded while the s0 prompt uses friends’ benefit as its rationale, firing Address B |
| inst-0297 | B | 1 | False | agent-07 | c0 | 0.94 | On filevaultpro.io, the prominent Download Now link goes to offers.northstar-security.com and is marked sponsored, while |
| inst-0297 | B | 1 | False | agent-07 | c1 | 0.95 | s0 identifies host filevaultpro.io but sends the prominent ‘Download Now’ action cross-origin to offers.northstar-securi |
| inst-0298 | B | 3 | False | agent-09 | c1 | 0.86 | s0–s1 show a higher reference price (PLN 299) next to current PLN 199 with line-through CSS; Reference Pricing #3 fires  |
| inst-0299 | B | 3 | False | agent-01 | c0 | 0.8 | s0 hides privacy consequences in one dense jargon-heavy legal sentence; readable wording appears only after using Transl |
| inst-0299 | B | 3 | False | agent-01 | c1 | 0.78 | Privacy Maze #3/Complex Language #3 is supported by the highly technical, long privacy disclosure in s0; s1 exposes plai |
| inst-0300 | B | 1 | False | agent-03 | c0 | 0.92 | The free download is deliberately throttled to 40 KB/s, watermarked, and paired with an interstitial ad, while $3.99/mo  |
| inst-0300 | B | 1 | False | agent-03 | c1 | 0.94 | States s0-s3 show artificial free-plan degradation and a paid path to restore 18 MB/s/remove watermarks and ads; Pay To  |
| inst-0303 | B | 2 | False | agent-02 | c0 | 0.82 | The purchase control adds a three-item bundle while showing only one bundle total and no component prices; s1 confirms a |
| inst-0303 | B | 2 | False | agent-02 | c1 | 0.84 | s0–s1 list three forced bundle components but no individual prices; Bundling #2 (component-pricing suppression) fires, a |
| inst-0304 | B | 2 | False | agent-10 | c0 | 0.78 | The initial state is already ‘playing,’ offers only a Pause preview control, and says the next episode starts in 8 secon |
| inst-0304 | B | 2 | False | agent-10 | c1 | 0.6 | s0 is the initial render with ‘playing,’ no Play control, and ‘Next episode in 8s’; this supports Auto-Play #1/#3, while |
| inst-0305 | B | 1 | False | agent-07 | c0 | 0.9 | Export is locked behind inviting three friends: the trace progresses from 0/3 to 1/3 to 2/3 before s3 unlocks export. |
| inst-0305 | B | 1 | False | agent-07 | c1 | 0.95 | s0–s2 explicitly block export until referrals reach 3, with 0/3→1/3→2/3, and s3 unlocks it. Social Pyramid #1 is directl |
| inst-0306 | B | 1 | False | agent-07 | c0 | 0.9 | A 0:10 flash-sale timer and urgent claim are followed by s1’s explicit statement that the deadline is repeatedly shifted |
| inst-0306 | B | 1 | False | agent-07 | c1 | 0.95 | s0 and s1 retain the 0:10 timer, and s1 states that each reached deadline is shifted to the current time plus a delay. O |
| inst-0307 | B | 1 | False | agent-09 | c0 | 0.92 | The reservation timer reads 04:58 in both s0 and s1 even after the payment interaction, while the button pressures payme |
| inst-0307 | B | 1 | False | agent-09 | c1 | 0.94 | The 04:58 timer resets across s0–s1 with no real deadline progression; O1 and Countdown Timer/FOMO #1 fire. |
| inst-0308 | B | 1 | False | agent-04 | c0 | 0.78 | s0 shows a video already Playing and says playback started automatically because it is in view, without a pause/stop con |
| inst-0308 | B | 1 | False | agent-04 | c1 | 0.6 | s0 visibly shows Playing without a user play event and provides no cancel/pause vector; Auto-Play #1/#2 fire, with singl |
| inst-0309 | B | 1 | False | agent-06 | c0 | 0.97 | s0 demotes “Reject all” to a 9px zero-padding link beside a full-width Accept button; s1 states that rejection opens a n |
| inst-0309 | B | 1 | False | agent-06 | c1 | 0.96 | s0→s1 fires False Hierarchy #1/#2 and O3: reject is a bare link with zero padding while accept is a padded button, and t |
| inst-0310 | A | 3 | True | agent-01 | c1 | 0.55 | s0 shows a mascot and ‘counting on you,’ but no refusal transition, emotional mutation, or explicit claim that nonpaymen |
| inst-0315 | B | 3 | False | agent-07 | c0 | 0.82 | Clicking Continue to next level exposes a 15-second ‘Claiming’ offer that must be watched to claim an exclusive bonus, w |
| inst-0315 | B | 3 | False | agent-07 | c1 | 0.6 | s0→s1 replaces level continuation with a 15s ‘Watch the offer to claim your bonus’ countdown. Countdown On Ads #3 framin |
| inst-0317 | B | 3 | False | agent-09 | c0 | 0.83 | s0–s3 repeatedly prompt “Spin again” while rewarding streaks, daily bonuses, level-ups, and warnings not to lose the str |
| inst-0317 | B | 3 | False | agent-09 | c1 | 0.84 | s0–s3 show repeated reward actions and dense “streak,” “level up,” “daily bonus,” “claim reward,” and “spin again” langu |
| inst-0318 | A | 1 | True | agent-03 | c0 | 0.76 | The visible states show a normal Delete account confirmation with equally available Keep account and Yes, continue contr |
| inst-0318 | A | 1 | True | agent-03 | c1 | 0.7 | Across s0-s3 the same delete affordance and reversible confirmation recur; O3 is negative because opt-out remains presen |
| inst-0319 | B | 2 | False | agent-10 | c0 | 0.88 | Although the shared activity is described as cooperative, every state reframes it as ‘vs.’ a duel with ‘Beat Alex to win |
| inst-0319 | B | 2 | False | agent-10 | c1 | 0.87 | s0–s3 place You and Alex in a 50/50 competitive layout and repeatedly turn cooperative practice into a duel; this fires  |
| inst-0320 | B | 3 | False | agent-02 | c0 | 0.92 | The large account-checkout button promises perks, while the small guest link says “without benefits” and “you’ll miss ou |
| inst-0320 | B | 3 | False | agent-02 | c1 | 0.9 | s0–s1 show a dominant registration CTA beside a text-only guest route framed as a loss; Forced Registration #2/#3 fire,  |
| inst-0321 | B | 2 | False | agent-07 | c0 | 0.86 | The offer uses prominent saturated ‘DON’T MISS OUT — ACT NOW!’ and ‘deal of the year’ copy to push the annual subscripti |
| inst-0321 | B | 2 | False | agent-07 | c1 | 0.95 | s0 and s1 explicitly report coercive copy at font-weight 800 versus 400, a 2.0 ratio, and roughly 3.8x the neutral bound |
| inst-0322 | B | 2 | False | agent-08 | c1 | 0.95 | s0→s1 adds the explicit result that zero entities are named in the immediate text but execution grants consent to 23 ent |
| inst-0326 | B | 3 | False | agent-08 | c0 | 0.91 | The fragment pairs a very large, bold YES button saying ‘Unlock my $50 savings — don’t miss out!’ with a tiny understate |
| inst-0326 | B | 3 | False | agent-08 | c1 | 0.88 | False Hierarchy visual-weight and strict-opposition conditions, Positive/Negative Framing visual asymmetry, and Persuasi |
| inst-0329 | B | 1 | False | agent-07 | c0 | 0.84 | The painted label says ‘Keep me subscribed’ while the input’s aria-label says ‘Opt me out’; after saving, s1 says the su |
| inst-0329 | B | 1 | False | agent-07 | c1 | 0.93 | In s0 and s1 the visible label ‘Keep me subscribed’ conflicts with aria-label ‘Opt me out’, while s1 confirms the subscr |
| inst-0330 | B | 3 | False | agent-03 | c0 | 0.82 | The English checkout presents its critical terms and consent explanation in Spanish in alternating states, creating a la |
| inst-0330 | B | 3 | False | agent-03 | c1 | 0.9 | With html lang=“en”, states s1/s3 render the critical legal disclosure in Spanish while s0/s2 do not; Wrong Language #1/ |
| inst-0331 | A | 3 | True | agent-04 | c0 | 0.62 | s0–s1 openly list pre-roll durations of 5, 10, and 15 seconds; the escalating ad burden is disclosed rather than hidden. |
| inst-0331 | A | 3 | True | agent-04 | c1 | 0.55 | s0–s1 disclose the 5/10/15-second ad schedule, but show neither a paid bypass nor a locked reward; Pay To Avoid and Watc |
| inst-0333 | B | 3 | False | agent-05 | c0 | 0.88 | A struck $299 MSRP anchors the $149 price and is paired with ‘Save 50% — today only’; the later state identifies the anc |
| inst-0333 | B | 3 | False | agent-05 | c1 | 0.9 | s0-s1 show $299 above a struck-through $149 and state1 reports a fabricated MSRP/2.01 anchor ratio; Reference Pricing #3 |
| inst-0334 | B | 1 | False | agent-01 | c0 | 0.95 | s0 places ‘No charges during your trial period’ beside ‘Payment of $49.00 due today’; s1 confirms the card was charged. |
| inst-0334 | B | 1 | False | agent-01 | c1 | 0.95 | Conflicting Information #1/#3 fires in s0: the co-located no-charge and due-today propositions are mutually unsatisfiabl |
| inst-0335 | B | 2 | False | agent-04 | c0 | 0.8 | The optional donation is paired with a mascot face and ‘Coco would be so happy if you helped,’ applying emotional pressu |
| inst-0335 | B | 2 | False | agent-04 | c1 | 0.82 | The affective mascot is 4px from the support button and its stated area/viewport is 0.18 > 0.05 in s0–s1; Parasocial Pre |
| inst-0337 | B | 1 | False | agent-09 | c0 | 0.94 | s0 disables the core flashlight until contact access is granted, despite calling it a local device utility; s1–s3 show t |
| inst-0337 | B | 1 | False | agent-09 | c1 | 0.94 | s0 blocks the core interaction while contacts are denied even though the utility is local; Address Book Leeching #1/Gran |
| inst-0339 | B | 3 | False | agent-06 | c0 | 0.99 | s0 advertises $19/night and says all prices are above the fold; s1 introduces $13.75 in mandatory fees and raises the to |
| inst-0339 | B | 3 | False | agent-06 | c1 | 0.99 | s0→s2 fires Drip Pricing #1/#3 and O4: service, booking, and convenience fees first appear after Continue, before the fi |
| inst-0341 | A | 1 | True | agent-10 | c0 | 0.95 | s0 presents an explicit Play Episode 1 control, and s1 records ‘User clicked Play on Episode 1’ before playback begins;  |
| inst-0341 | A | 1 | True | agent-10 | c1 | 0.94 | s0 has a Play button and s1’s event log explicitly records the user click, refuting Auto-Play #1; the observed user inte |
| inst-0343 | B | 1 | False | agent-05 | c0 | 0.82 | The clickable scare-copy says ‘Act now’ and ‘Don’t miss out’; the later state reports six listeners on that coercive tex |
| inst-0343 | B | 1 | False | agent-05 | c1 | 0.9 | s0-s1 show coercive text in a role=button and report 6 listeners versus 1 (6/1=6, above the displayed threshold 3); Pers |
| inst-0346 | A | 2 | True | agent-08 | c0 | 0.63 | Fragment s0 contains referral gamification (‘0/2 friends’, ‘Unlock Silver in 2 more!’, ‘Only 2 friends away’) and sharin |
| inst-0346 | A | 2 | True | agent-08 | c1 | 0.84 | The s0→s1 transition only adds ‘Referral link copied.’ while the focus session remains available at 0/2 friends. Social  |
| inst-0347 | B | 3 | False | agent-08 | c0 | 0.84 | The initial fragment uses repeated all-caps imperatives and loss threats ("MUST upgrade NOW", "risk LOSING your photos T |
| inst-0347 | B | 3 | False | agent-08 | c1 | 0.86 | In s0, "limited-time offer ends SOON" supplies urgency without a concrete date, time, timer, or factual expiration in th |
| inst-0348 | B | 2 | False | agent-06 | c0 | 0.86 | s0 puts authorization for subsequent surcharges, fees, taxes, and adjustments in 7px all-caps legalese; s1 additionally  |
| inst-0348 | B | 2 | False | agent-06 | c1 | 0.84 | s0 satisfies Hidden Information #2 with critical fee/cancellation language visually suppressed at 7px relative to contro |
| inst-0349 | B | 2 | False | agent-08 | c0 | 0.99 | The fragment says the payload arrived in 195ms but the spinner is intentionally kept running until 2400ms, an explicit a |
| inst-0349 | B | 2 | False | agent-08 | c1 | 0.94 | DECEPTIVE: s0→s1 records a refresh and s1 explicitly reports payload latency 195ms versus a forced spinner duration of 2 |
| inst-0350 | B | 2 | False | agent-08 | c0 | 0.68 | Fragment-only evidence shows repeated purchase-activity notifications—"Sarah from New York just purchased" and later "Mi |
| inst-0351 | B | 1 | False | agent-05 | c0 | 0.95 | After Add to Cart, the cart jumps from one product to three, adding a warranty and priority shipping that were never sel |
| inst-0351 | B | 1 | False | agent-05 | c1 | 0.95 | s0→s1 changes one selected product into three cart items, adding a warranty and priority shipping without a user event;  |
| inst-0352 | B | 1 | False | agent-10 | c0 | 0.95 | The account is English in s0, but the critical cancellation confirmation in s1 is entirely German before s2 reports canc |
| inst-0352 | B | 1 | False | agent-10 | c1 | 0.95 | s0 acquisition/settings text is English while critical cancellation controls in s1 use lang=de and German labels, firing |
| inst-0353 | B | 3 | False | agent-04 | c0 | 0.95 | The same plan card claims ‘Unlimited storage’ while its fine print says storage is capped at 5 GB, a direct factual cont |
| inst-0353 | B | 3 | False | agent-04 | c1 | 0.94 | s0–s1 place ‘Unlimited storage’ and ‘Storage is capped at 5 GB’ in one card; Conflicting Information #1/#3 fire on the u |
| inst-0355 | A | 2 | True | agent-04 | c0 | 0.78 | s0–s1 disclose the renewal warning, exact renewal timestamp, price increase, and a visible cancellation button with cont |
| inst-0355 | A | 2 | True | agent-04 | c1 | 0.84 | s0–s1 provide a concrete renewal date and normal-prominence cancellation route; no automatic charge without consent or h |
| inst-0356 | B | 3 | False | agent-09 | c0 | 0.82 | s0 says the next episode starts automatically in three seconds and presents that auto-start as seamless viewing. |
| inst-0356 | B | 3 | False | agent-09 | c1 | 0.86 | s0 frames automatic playback as “Continue watching”/“Up next” and never discloses autoplay; Auto-Play #3 fires. |
| inst-0357 | B | 1 | False | agent-09 | c0 | 0.94 | s1 shows a six-second sponsored ad with disabled “Skip ad”; s2 pauses progress when leaving and s3 restores the unskippa |
| inst-0357 | B | 1 | False | agent-09 | c1 | 0.94 | s1–s3 show disabled Skip ad, forced 0:06 viewing, and return-to-app gating; Watch Ads To Unlock #1 and Countdown On Ads  |
| inst-0358 | B | 1 | False | agent-02 | c0 | 0.95 | After contact access, s1 reports 24 invites sent without preview, picker, or confirmation, and the marketing messages ar |
| inst-0358 | B | 1 | False | agent-02 | c1 | 0.95 | s0→s1 changes a read-only friend-finder request into 24 uncurated broadcasts; Friend Spam #1–#3 fire (intent/payload shi |
| inst-0359 | B | 3 | False | agent-07 | c0 | 0.82 | The profile repeatedly claims someone liked, viewed, or commented but gives no identity; s1 says there is no profile to  |
| inst-0359 | B | 3 | False | agent-07 | c1 | 0.93 | s0/s1 show repeated vague activity notices, and s1 explicitly states ‘Someone liked your post’ has no name, handle, or p |
| inst-0361 | B | 1 | False | agent-04 | c0 | 0.87 | The purchase action is wrapped, decorated, enlarged, and marked SAVE 20%, while Cancel order is a tiny underlined link. |
| inst-0361 | B | 1 | False | agent-04 | c1 | 0.88 | s0–s1 give Complete purchase extra wrapper/subtree weight and a prominent badge while Cancel order is a bare link; Visua |
| inst-0362 | B | 1 | False | agent-06 | c0 | 0.9 | s0 offers no neutral close—Esc and outside clicks do not dismiss—and s1 states every path led to compliance, with analyt |
| inst-0362 | B | 1 | False | agent-06 | c1 | 0.88 | s0→s1 fires Dead End #1 and O6: the trace reports that Accept all, Essential only, and Reject all all led to compliance, |
| inst-0363 | A | 3 | True | agent-09 | c0 | 0.74 | s0 presents eight concise radio choices with prices and short descriptions; it shows no coercive default, hidden option, |
| inst-0363 | A | 3 | True | agent-09 | c1 | 0.8 | s0 has only eight choices, below Choice Overload #1’s >20 condition; no measured density or semantic-similarity collapse |
| inst-0365 | B | 3 | False | agent-01 | c0 | 0.84 | s0 repeatedly uses scarcity and pressure language: miss a window forever, limited window, don’t be late, and a streak en |
| inst-0365 | B | 3 | False | agent-01 | c1 | 0.82 | Playing By Appointment #3 fires in s0: time-gating messages combine concrete times with urgency and scarcity (limited wi |
| inst-0366 | B | 1 | False | agent-03 | c0 | 0.9 | The interface anchors a PLN 99.90 sale to PLN 999.00 and advertises a stark 90% discount with Limited stock language. |
| inst-0366 | B | 1 | False | agent-03 | c1 | 0.94 | States s0-s1 consistently show PLN 999.00 struck through against PLN 99.90; Reference Pricing #1/#3 fire because the 90% |
| inst-0370 | B | 3 | False | agent-09 | c0 | 0.88 | s1 asks for camera access while the displayed manifest requests Camera, Microphone, and Location, exceeding the stated p |
| inst-0370 | B | 3 | False | agent-09 | c1 | 0.9 | In s1, the request names camera but the manifest lists microphone and location too; Granting and Interaction #3 fires fr |
