/**
 * Demo registry. The dynamic pattern page looks up the demo component
 * for a built pattern by its slug. Adding a new interactive demo means
 * dropping a new file under `./demos/` and registering it here.
 *
 * Each demo accepts a `mode` prop (user | auditor) and a small bag of
 * `DemoShell`-bound auditor chrome props. Per-demo annotations live in
 * `src/lib/auditor-annotations.ts` so the demos stay focused on the
 * dark-pattern simulation.
 */

import type { ComponentType } from "react";

import type { ViewMode } from "@/components/demos/demo-shell";
import type { AnnotationItem } from "@/components/demos/demo-shell";
import { ImmortalAccountsDemo } from "@/components/demos/immortal-accounts-demo";
import { DeadEndDemo } from "@/components/demos/dead-end-demo";
import { ForcedGracePeriodDemo } from "@/components/demos/forced-grace-period-demo";
import { PriceComparisonPreventionDemo } from "@/components/demos/price-comparison-prevention-demo";
import { IntermediateCurrencyDemo } from "@/components/demos/intermediate-currency-demo";
import { DisguisedAdDemo } from "@/components/demos/disguised-ad-demo";
import { SneakIntoBasketDemo } from "@/components/demos/sneak-into-basket-demo";
import { PrivacyMazeDemo } from "@/components/demos/privacy-maze-demo";
import { LabyrinthineNavigationDemo } from "@/components/demos/labyrinthine-navigation-demo";
import { DripPricingDemo } from "@/components/demos/drip-pricing-demo";
import { ReferencePricingDemo } from "@/components/demos/reference-pricing-demo";
import { ConflictingInformationDemo } from "@/components/demos/conflicting-information-demo";
import { InformationWithoutContextDemo } from "@/components/demos/information-without-context-demo";
import { FalseHierarchyDemo } from "@/components/demos/false-hierarchy-demo";
import { VisualProminenceDemo } from "@/components/demos/visual-prominence-demo";
import { BundlingDemo } from "@/components/demos/bundling-demo";
import { PressuredSellingDemo } from "@/components/demos/pressured-selling-demo";
import { PersuasiveLanguageDemo } from "@/components/demos/persuasive-language-demo";
import { SmallOrMovingCloseButtonDemo } from "@/components/demos/small-or-moving-close-button-demo";
import { BadDefaultsPreselectionDemo } from "@/components/demos/bad-defaults-preselection-demo";
import { CutenessDemo } from "@/components/demos/cuteness-demo";
import { PositiveOrNegativeFramingDemo } from "@/components/demos/positive-or-negative-framing-demo";
import { FearOfMissingOutFomoDemo } from "@/components/demos/fear-of-missing-out-fomo-demo";
import { TrickQuestionsDemo } from "@/components/demos/trick-questions-demo";
import { ChoiceOverloadDemo } from "@/components/demos/choice-overload-demo";
import { HiddenInformationDemo } from "@/components/demos/hidden-information-demo";
import { WrongLanguageDemo } from "@/components/demos/wrong-language-demo";
import { ComplexLanguageDemo } from "@/components/demos/complex-language-demo";
import { FeedforwardAmbiguityDemo } from "@/components/demos/feedforward-ambiguity-demo";
import { PlainEvilDemo } from "@/components/demos/plain-evil-demo";
import { AddictiveDesignDemo } from "@/components/demos/addictive-design-demo";
import { InfiniteScrollingDemo } from "@/components/demos/infinite-scrolling-demo";
import { PullToRefreshDemo } from "@/components/demos/pull-to-refresh-demo";
import { ReducedFrictionDemo } from "@/components/demos/reduced-friction-demo";
import { CustomisationDemo } from "@/components/demos/customisation-demo";
import { ForcedContinuityDemo } from "@/components/demos/forced-continuity-demo";
import { ForcedRegistrationDemo } from "@/components/demos/forced-registration-demo";
import { PrivacyZuckeringDemo } from "@/components/demos/privacy-zuckering-demo";
import { FriendSpamDemo } from "@/components/demos/friend-spam-demo";
import { AddressBookLeechingDemo } from "@/components/demos/address-book-leeching-demo";
import { SocialPyramidDemo } from "@/components/demos/social-pyramid-demo";
import { GrantingAndInteractionDemo } from "@/components/demos/granting-and-interaction-demo";
import { PayToPlayDemo } from "@/components/demos/pay-to-play-demo";
import { GrindingDemo } from "@/components/demos/grinding-demo";
import { PlayingByAppointmentDemo } from "@/components/demos/playing-by-appointment-demo";
import { CountdownOnAdsDemo } from "@/components/demos/countdown-on-ads-demo";
import { WatchAdsToUnlockFeaturesDemo } from "@/components/demos/watch-ads-to-unlock-features-demo";
import { PayToAvoidDemo } from "@/components/demos/pay-to-avoid-demo";
import { AutomatingTheUserAwayDemo } from "@/components/demos/automating-the-user-away-demo";
import { AutomaticAcceptThirdPartyTermDemo } from "@/components/demos/automatic-accept-third-party-term-demo";
import { AutoPlayDemo } from "@/components/demos/auto-play-demo";
import { HighDemandDemo } from "@/components/demos/high-demand-demo";
import { LowStockDemo } from "@/components/demos/low-stock-demo";
import { EndorsementAndTestimonialsDemo } from "@/components/demos/endorsement-and-testimonials-demo";
import { ParasocialPressureDemo } from "@/components/demos/parasocial-pressure-demo";
import { ActivityMessagesDemo } from "@/components/demos/activity-messages-demo";
import { CountdownTimerDemo } from "@/components/demos/countdown-timer-demo";
import { LimitedTimeMessageDemo } from "@/components/demos/limited-time-message-demo";
import { ConfirmshamingDemo } from "@/components/demos/confirmshaming-demo";
import { EncouragingAntiSocialBehaviorDemo } from "@/components/demos/encouraging-anti-social-behavior-demo";
import { PsychologicalTricksDemo } from "@/components/demos/psychological-tricks-demo";
import { PreDeliveredContentDemo } from "@/components/demos/pre-delivered-content-demo";

export interface DemoProps {
  /** "user" hides all audit chrome; "auditor" reveals it. */
  mode?: ViewMode;
  /** Auditor-only: dark-pattern element callouts. */
  annotations?: AnnotationItem[];
  /** Auditor-only: re-mount the demo. */
  onRestart?: () => void;
}

export type DemoComponent = ComponentType<DemoProps>;

const registry: Record<string, DemoComponent> = {
  "immortal-accounts": ImmortalAccountsDemo,
  "dead-end": DeadEndDemo,
  "forced-grace-period": ForcedGracePeriodDemo,
  "price-comparison-prevention": PriceComparisonPreventionDemo,
  "intermediate-currency": IntermediateCurrencyDemo,
  "disguised-ad": DisguisedAdDemo,
  "sneak-into-basket": SneakIntoBasketDemo,
  "privacy-maze": PrivacyMazeDemo,
  "labyrinthine-navigation": LabyrinthineNavigationDemo,
  "drip-pricing": DripPricingDemo,
  "reference-pricing": ReferencePricingDemo,
  "conflicting-information": ConflictingInformationDemo,
  "information-without-context": InformationWithoutContextDemo,
  "false-hierarchy": FalseHierarchyDemo,
  "visual-prominence": VisualProminenceDemo,
  "bundling": BundlingDemo,
  "pressured-selling": PressuredSellingDemo,
  "persuasive-language": PersuasiveLanguageDemo,
  "small-or-moving-close-button": SmallOrMovingCloseButtonDemo,
  "bad-defaults-preselection": BadDefaultsPreselectionDemo,
  "cuteness": CutenessDemo,
  "positive-or-negative-framing": PositiveOrNegativeFramingDemo,
  "fear-of-missing-out-fomo": FearOfMissingOutFomoDemo,
  "trick-questions": TrickQuestionsDemo,
  "choice-overload": ChoiceOverloadDemo,
  "hidden-information": HiddenInformationDemo,
  "wrong-language": WrongLanguageDemo,
  "complex-language": ComplexLanguageDemo,
  "feedforward-ambiguity": FeedforwardAmbiguityDemo,
  "plain-evil": PlainEvilDemo,
  "addictive-design": AddictiveDesignDemo,
  "infinite-scrolling": InfiniteScrollingDemo,
  "pull-to-refresh": PullToRefreshDemo,
  "reduced-friction": ReducedFrictionDemo,
  "customisation": CustomisationDemo,
  "forced-continuity": ForcedContinuityDemo,
  "forced-registration": ForcedRegistrationDemo,
  "privacy-zuckering": PrivacyZuckeringDemo,
  "friend-spam": FriendSpamDemo,
  "address-book-leeching": AddressBookLeechingDemo,
  "social-pyramid": SocialPyramidDemo,
  "granting-and-interaction": GrantingAndInteractionDemo,
  "pay-to-play": PayToPlayDemo,
  "grinding": GrindingDemo,
  "playing-by-appointment": PlayingByAppointmentDemo,
  "countdown-on-ads": CountdownOnAdsDemo,
  "watch-ads-to-unlock-features": WatchAdsToUnlockFeaturesDemo,
  "pay-to-avoid": PayToAvoidDemo,
  "automating-the-user-away": AutomatingTheUserAwayDemo,
  "automatic-accept-third-party-term": AutomaticAcceptThirdPartyTermDemo,
  "auto-play": AutoPlayDemo,
  "high-demand": HighDemandDemo,
  "low-stock": LowStockDemo,
  "endorsement-and-testimonials": EndorsementAndTestimonialsDemo,
  "parasocial-pressure": ParasocialPressureDemo,
  "activity-messages": ActivityMessagesDemo,
  "countdown-timer": CountdownTimerDemo,
  "limited-time-message": LimitedTimeMessageDemo,
  "confirmshaming": ConfirmshamingDemo,
  "encouraging-anti-social-behavior": EncouragingAntiSocialBehaviorDemo,
  "psychological-tricks": PsychologicalTricksDemo,
  "pre-delivered-content": PreDeliveredContentDemo
};

/** Get the static demo component for a pattern slug, or undefined. */
export function getDemo(slug: string): DemoComponent | undefined {
  return registry[slug];
}
