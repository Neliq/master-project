/**
 * Dark pattern registry for the educational site.
 *
 * 62 patterns sourced from the Master's thesis, organised by
 * Brignull's high-level taxonomy. Every pattern ships with its
 * formal conditions (extracted from the thesis LaTeX) and a
 * short summary derived from the thesis prose. The `built` flag
 * drives whether the subpage renders a full interactive demo or
 * a stub view that points to the formal conditions.
 */

import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  Bell,
  Boxes,
  CheckSquare,
  CircleHelp,
  Clock,
  Coins,
  Contact,
  Contrast,
  CreditCard,
  DollarSign,
  EyeOff,
  FastForward,
  FileCheck,
  Flame,
  Frown,
  GitBranch,
  Heart,
  HelpCircle,
  Hourglass,
  Infinity as InfinityIcon,
  Info,
  Languages,
  Layers,
  List,
  Lock,
  Map,
  Megaphone,
  MessageCircleWarning,
  MousePointerClick,
  Package,
  PackageX,
  Pilcrow,
  Play,
  Receipt,
  RefreshCw,
  Rocket,
  Scale,
  Send,
  Shield,
  ShoppingCart,
  Skull,
  SlidersHorizontal,
  Smile,
  Split,
  Star,
  Tag,
  Timer,
  TrendingUp,
  Tv,
  Type,
  User,
  UserPlus,
  Users,
  WandSparkles,
  X,
  Zap
} from "lucide-react";

export type CategoryId =
  | "sneaking"
  | "urgency"
  | "misdirection"
  | "forced-action"
  | "obstruction"
  | "nagging"
  | "interface-interference"
  | "attention-manipulation";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "sneaking",
    name: "Sneaking",
    description: "Covert transfer of money, attention or data the user never agreed to.",
  },
  {
    id: "urgency",
    name: "Urgency",
    description: "Manufactured time pressure that pushes the user to act before they can think.",
  },
  {
    id: "misdirection",
    name: "Misdirection",
    description: "Visual or linguistic bias that steers the user toward an outcome the designer prefers.",
  },
  {
    id: "forced-action",
    name: "Forced Action",
    description: "A desired action is gated on surrendering data, attention, or social capital.",
  },
  {
    id: "obstruction",
    name: "Obstruction",
    description: "Making a legitimate, user-benefiting flow harder than it has to be.",
  },
  {
    id: "nagging",
    name: "Nagging",
    description: "Persistent, interruptive requests that the user has to actively dismiss.",
  },
  {
    id: "interface-interference",
    name: "Interface Interference",
    description: "UI mechanics that subvert the user's mental model of how the control works.",
  },
  {
    id: "attention-manipulation",
    name: "Attention Manipulation",
    description: "Designing the interface to fight for the user's attention rather than earn it.",
  },
];

/** A single formal condition for the dark pattern, rendered with KaTeX. */
export interface Condition {
  /** Short title, e.g. "Autonomous Media Execution". */
  title: string;
  /** Plain-English description of the condition. */
  description: string;
  /** KaTeX-compatible LaTeX source for the predicate. */
  formula?: string;
  /** Optional additional LaTeX for the "given" clause. */
  given?: string;
  /** Optional explanatory note rendered beneath the formula. */
  note?: string;
}

export interface ConditionDemo {
  /** 0-based index into the conditions array this demo illustrates. */
  conditionIndex: number;
  /** Slug key into the demo registry (pattern-demo.tsx). */
  demoSlug: string;
}

export interface Pattern {
  slug: string;
  name: string;
  category: CategoryId;
  /** One-paragraph description shown on the card and at the top of the subpage. */
  summary: string;
  /** Lucide icon name — keyed here to a stable icon import. */
  iconName: IconName;
  /** Whether the subpage ships a full interactive demo. */
  built: boolean;
  /** Optional formal conditions shown on the subpage. */
  conditions?: Condition[];
  /**
   * Per-condition demos. When present the page renders one demo per entry
   * instead of the single legacy demo looked up by `slug`. Each entry maps
   * a condition index to a demo component key in the registry.
   */
  conditionDemos?: ConditionDemo[];
  /** Related patterns the reader should look at next. */
  related?: string[];
  /** Reference number in the source taxonomy (Mathur et al., Brignull, Gray et al.). */
  references?: string[];
}

export type IconName =
  | "arrow-down"  | "bell"  | "boxes"  | "check-square"  | "circle-help"  | "clock"  | "coins"  | "contact"  | "contrast"  | "credit-card"  | "dollar-sign"  | "eye-off"  | "fast-forward"  | "file-check"  | "flame"  | "frown"  | "git-branch"  | "heart"  | "help-circle"  | "hourglass"  | "infinity"  | "info"  | "languages"  | "layers"  | "list"  | "lock"  | "map"  | "megaphone"  | "message-circle-warning"  | "mouse-pointer-click"  | "package"  | "package-x"  | "pilcrow"  | "play"  | "receipt"  | "refresh-cw"  | "rocket"  | "scale"  | "send"  | "shield"  | "shopping-cart"  | "skull"  | "sliders-horizontal"  | "smile"  | "split"  | "star"  | "tag"  | "timer"  | "trending-up"  | "tv"  | "type"  | "user"  | "user-plus"  | "users"  | "wand-sparkles"  | "x"  | "zap";

export const ICONS: Record<IconName, LucideIcon> = {
  "arrow-down": ArrowDown,
  "bell": Bell,
  "boxes": Boxes,
  "check-square": CheckSquare,
  "circle-help": CircleHelp,
  "clock": Clock,
  "coins": Coins,
  "contact": Contact,
  "contrast": Contrast,
  "credit-card": CreditCard,
  "dollar-sign": DollarSign,
  "eye-off": EyeOff,
  "fast-forward": FastForward,
  "file-check": FileCheck,
  "flame": Flame,
  "frown": Frown,
  "git-branch": GitBranch,
  "heart": Heart,
  "help-circle": HelpCircle,
  "hourglass": Hourglass,
  "infinity": InfinityIcon,
  "info": Info,
  "languages": Languages,
  "layers": Layers,
  "list": List,
  "lock": Lock,
  "map": Map,
  "megaphone": Megaphone,
  "message-circle-warning": MessageCircleWarning,
  "mouse-pointer-click": MousePointerClick,
  "package": Package,
  "package-x": PackageX,
  "pilcrow": Pilcrow,
  "play": Play,
  "receipt": Receipt,
  "refresh-cw": RefreshCw,
  "rocket": Rocket,
  "scale": Scale,
  "send": Send,
  "shield": Shield,
  "shopping-cart": ShoppingCart,
  "skull": Skull,
  "sliders-horizontal": SlidersHorizontal,
  "smile": Smile,
  "split": Split,
  "star": Star,
  "tag": Tag,
  "timer": Timer,
  "trending-up": TrendingUp,
  "tv": Tv,
  "type": Type,
  "user": User,
  "user-plus": UserPlus,
  "users": Users,
  "wand-sparkles": WandSparkles,
  "x": X,
  "zap": Zap
};

export const PATTERNS: Pattern[] = [
  // ── Obstruction ──,
  {
    slug: "immortal-accounts",
    name: "Immortal Accounts",
    category: "obstruction",
    summary: "Immortal Accounts is a lifecycle-constrained specialization of Labyrinthine Navigation with a null-terminal state, heavily associated with the \"Roach Motel'' category of deceptive design .",
    iconName: "infinity",
    built: true,
    conditions: [
        { title: "Absolute Absence of Deletion Vectors", description: "To detect the complete omission of exit pathways, we define $K_{\\mathrm{del}}$ as the semantic set of account termination keywords (e.g., \\{\"delete account'', \"deactivate'', \"close account'', \"remove profile''\\}) and $T_{\\mathrm{DOM}}$ as the collection of all visible text nodes within the user's account settings and profile sub-pages. The feature triggers if the intersection of these sets evaluates to empty, proving that the interface offers no structural exit affordance:", formula: "K_{\\mathrm{del}} \\cap T_{\\mathrm{DOM}} == \\emptyset" },
        { title: "Asymmetrical Navigational Depth", description: "Drawing on the Keystroke-Level Model for measuring human-computer interaction cost , we establish $N(x)$ to represent the minimum number of discrete user interactions (e.g., clicks, modal confirmations) required to complete a given action $x$ from the primary dashboard. By comparing the onboarding process ($x_{\\mathrm{create}}$) against the offboarding process ($x_{\\mathrm{delete}}$), the system triggers an alert if $N(x_{\\mathrm{delete}})$ exceeds a predefined heuristic threshold ($\\tau = 4$), or if the ratio of deletion effort to creation effort represents a highly skewed asymmetry beyond a tolerance constant $\\delta$:", formula: "\\frac{N(x_{\\mathrm{delete}})}{N(x_{\\mathrm{create}})} > \\delta" },
        { title: "External Action Requirement", description: "When an interface formally acknowledges deletion but artificially externalizes the process, it deliberately shifts the operational burden from the automated backend to the user . If a termination keyword $k \\in K_{\\mathrm{del}}$ is successfully detected, the algorithm inspects its associated DOM node $n$ alongside its immediate parent containers. The pattern is flagged if node $n$ resolves to an external communication protocol rather than a standard, automated request. Specifically, this is logically verified if Node(n).attributes.href contains a \"mailto:\" directive, or if the destination URL routes to a generic \"Customer Support'' form rather than a dedicated account deletion endpoint." }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "immortal-accounts-condition-1" },
    { conditionIndex: 1, demoSlug: "immortal-accounts-condition-2" },
    { conditionIndex: 2, demoSlug: "immortal-accounts-condition-3" },
  ],
  },
  {
    slug: "dead-end",
    name: "Dead End",
    category: "obstruction",
    summary: "The Dead End pattern occurs when a user is guided into a specific interface state or navigational node from which they cannot easily return, exit, or proceed without completing a forced action (such as accepting tracking cookies or viewing an advertisement).",
    iconName: "lock",
    built: true,
    conditions: [
        { title: "Topological Sink in the Navigational Graph", description: "To model the interface as a directed graph $G = (V, E)$, we define $V$ as the set of user interface states (such as pages or modals) and $E$ as the available interactive transitions. From the active interface state $v_{\\mathrm{current}}$, we evaluate the set of all outgoing transition edges, denoted as $E_{\\mathrm{out}}(v_{\\mathrm{current}})$. If we define $V_{\\mathrm{forced}}$ as the subset of states representing business-favorable compliance (e.g., \"Accept All'' or \"Subscribe''), the feature triggers if every available outgoing edge strictly forces compliance. This occurs when no edge maps back to a neutral exit state or the previous state $v_{\\mathrm{prev}}$, mathematically establishing a navigational trap:", formula: "\\forall e \\in E_{\\mathrm{out}}(v_{\\mathrm{current}}), \\text{target}(e) \\in V_{\\mathrm{forced}} \\implies \\text{No Escape Path}" },
        { title: "Interception of Native Browser Navigation", description: "A fundamental principle of user autonomy relies on the ability to retreat from an unwanted interaction using native browser tools . To detect the subversion of this principle, we define $E_{\\mathrm{browser}}$ as native browser navigation events, specifically targeting the popstate triggered by the browser's \"Back'' button. The system monitors the Document Object Model (DOM) for aggressive history manipulation scripts. The feature triggers if the active page continually overwrites the history stack to trap the user, or explicitly intercepts and nullifies the return action. This is formalized by checking if the count of history.pushState() injections exceeds an anomalously high threshold $\\tau$, or if the return event is programmatically prevented:", formula: "\\text{count}(\\texttt{history.pushState()}) > \\tau \\quad \\lor \\quad \\text{Event}(\\texttt{popstate}).\\texttt{preventDefault()} == \\mathrm{True}" },
        { title: "Visual Absence of Dismissal Vectors", description: "Modals and overlays represent temporary interruptions in a user's workflow, demanding an explicit dismissal affordance to maintain usability and trust . To identify structural traps, we define $C_{\\mathrm{dismiss}}$ as the set of bounding boxes classified by the YOLO object detection model as \"close icons'', \"X marks'', or \"cancel/back buttons''. If the current interface state $v_{\\mathrm{current}}$ is identified structurally as an overlay or modal (e.g., characterized by a CSS z-index greater than 100), the visual feature triggers if the set of dismissal objects is entirely empty. This proves the system has deliberately removed the visual means to escape the interruption:", formula: "C_{\\mathrm{dismiss}} == \\emptyset \\quad \\land \\quad \\text{IsOverlay}(v_{\\mathrm{current}}) == \\mathrm{True}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "dead-end-condition-1" },
    { conditionIndex: 1, demoSlug: "dead-end-condition-2" },
    { conditionIndex: 2, demoSlug: "dead-end-condition-3" },
  ],
  },
  {
    slug: "forced-grace-period",
    name: "Forced Grace Period",
    category: "obstruction",
    summary: "The Forced Grace Period pattern introduces an artificial temporal barrier to an action that should technically be instantaneous, most commonly occurring during account deletion or subscription cancellation.",
    iconName: "hourglass",
    built: true,
    conditions: [
        { title: "Temporal Discrepancy Extraction", description: "To quantify the artificial delay imposed on the user, we define $T_{\\mathrm{request}}$ as the exact timestamp when the termination request is submitted. The system then utilizes a Named Entity Recognition (NER) model to parse the confirmation text node $n_{\\mathrm{confirm}}$ and extract future date or time span entities, denoted as $E_{\\mathrm{time}}$ (e.g., \"30 days'' or \"next billing cycle''). By converting these entities into a parsed future timestamp $T_{\\mathrm{execute}}$, the feature triggers if the calculated delay strictly exceeds a predefined heuristic threshold $\\Delta t_{\\mathrm{min}}$ (such as 24 hours), proving the delay is a programmatic constraint rather than a technical necessity:", formula: "T_{\\mathrm{execute}} - T_{\\mathrm{request}} \\geq \\Delta t_{\\mathrm{min}}" },
        { title: "Semantic Proximity of Reversal", description: "To identify whether this temporal delay is actively coupled with an entrapment mechanism, we establish $K_{\\mathrm{revert}}$ as a set of keywords indicating the cancellation of the deletion process (e.g., \\{\"log in to cancel'', \"reactivate'', \"undo''\\}). By analyzing the sequence of words $W(n_{\\mathrm{confirm}})$ within the confirmation node, the algorithm calculates the textual distance $d$ between the temporal delay entity $e$ and a reversal keyword $k$. The feature triggers if this distance falls below a minimum semantic threshold $\\tau_{\\mathrm{words}}$, strongly indicating that the waiting period and the reversal trap are syntactically and logically bound as a single condition:", formula: "\\min_{k \\in K_{\\mathrm{revert}}, e \\in E_{\\mathrm{time}}} d(k, e) < \\tau_{\\mathrm{words}}" },
        { title: "Vulnerable State Transition Graph", description: "Modeling the user account's lifecycle as a finite state machine reveals the mechanical core of this trap . We define the set of possible account states as $S = \\{s_{\\mathrm{active}}, s_{\\mathrm{pending\\_delete}}, s_{\\mathrm{deleted}}\\}$. Furthermore, we denote $A_{\\mathrm{login}}$ as the standard, highly habituated user action of authenticating into the application . Using a standard state transition function $\\delta: S \\times A \\to S$, the feature triggers if performing a routine login while localized in the pending state automatically resolves back to the active state. This confirms a structural vulnerability where the system requires no explicit \"abort deletion'' confirmation to override the user's prior termination intent:", formula: "\\delta(s_{\\mathrm{pending\\_delete}}, A_{\\mathrm{login}}) = s_{\\mathrm{active}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "forced-grace-period-condition-1" },
    { conditionIndex: 1, demoSlug: "forced-grace-period-condition-2" },
    { conditionIndex: 2, demoSlug: "forced-grace-period-condition-3" },
  ],
  },
  {
    slug: "privacy-maze",
    name: "Privacy Maze",
    category: "obstruction",
    summary: "The Privacy Maze pattern is a consent-scoped specialization of Labyrinthine Navigation.",
    iconName: "map",
    built: true,
    conditions: [
        { title: "Asymmetrical Path Depth", description: "To model the structural friction of the consent architecture, we represent the interface as a directed graph $G = (V, E)$, where $V$ encapsulates the interface states and $E$ signifies user interaction events, such as clicks. Starting from $v_{\\mathrm{start}}$, the initial state of the privacy prompt upon page load, we identify two critical terminal states: $v_{\\mathrm{accept\\_all}}$ and $v_{\\mathrm{reject\\_all}}$, representing maximum and minimum data consent, respectively. By calculating $d(v_i, v_j)$ as the minimum number of edges required to traverse from state $v_i$ to state $v_j$, the feature triggers if the navigational effort required to reject tracking strictly exceeds the effort required to accept it. This mathematical disparity, or a rejection path exceeding a heuristic depth threshold $\\tau_{\\mathrm{depth}}$, proves the presence of deliberate structural friction:", formula: "d(v_{\\mathrm{start}}, v_{\\mathrm{reject\\_all}}) > d(v_{\\mathrm{start}}, v_{\\mathrm{accept\\_all}}) \\quad \\lor \\quad d(v_{\\mathrm{start}}, v_{\\mathrm{reject\\_all}}) > \\tau_{\\mathrm{depth}}" },
        { title: "Excessive Interaction Density", description: "A common tactic to force abandonment of the privacy-preserving route is to artificially inflate the interaction cost . We define $T_{\\mathrm{consent}} = \\{t_1, t_2, \\dots, t_n\\}$ as the set of individual boolean toggles or checkboxes representing specific third-party vendors or cookie categories. We search for $B_{\\mathrm{global\\_reject}}$, a singular DOM node that algorithmically sets all elements $t_i \\in T_{\\mathrm{consent}}$ to a False state (effectively a global \"Reject All'' button). The feature triggers if the interface lacks this global opt-out vector and simultaneously forces the user to manually interact with a set of granular toggles whose cardinality exceeds a reasonable cognitive density threshold $\\tau_{\\mathrm{density}}$:", formula: "B_{\\mathrm{global\\_reject}} == \\emptyset \\quad \\land \\quad |T_{\\mathrm{consent}}| > \\tau_{\\mathrm{density}}" },
        { title: "Visual Prominence Disparity", description: "Beyond structural depth, the interface often weaponizes visual hierarchy to suppress user agency . We isolate $B_{\\mathrm{accept}}$ as the primary node for maximum consent and $B_{\\mathrm{manage}}$ as the node required to initiate the opt-out flow. Applying a visual prominence function $P(x)$ calculated via object detection (YOLO)---which derives a composite score based on bounding box area, computed CSS contrast ratio, and z-index---we evaluate the visual weight of these opposing choices. The feature triggers if the system identifies a severe mathematical disparity in the visual prominence between the two vectors, effectively rendering the privacy-preserving route invisible against the baseline UI design constraint $\\delta_{\\mathrm{contrast}}$:", formula: "\\frac{P(B_{\\mathrm{accept}})}{P(B_{\\mathrm{manage}})} > \\delta_{\\mathrm{contrast}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "privacy-maze-condition-1" },
    { conditionIndex: 1, demoSlug: "privacy-maze-condition-2" },
    { conditionIndex: 2, demoSlug: "privacy-maze-condition-3" },
  ],
  },
  {
    slug: "labyrinthine-navigation",
    name: "Labyrinthine Navigation",
    category: "obstruction",
    summary: "Labyrinthine Navigation is the foundational architectural implementation of exit friction, categorized formally under \"Adding Steps.'' It deliberately weaponizes complex information architecture to deter users from executing critical, user-beneficial actions (such as canceling a subscription or deleting an account).",
    iconName: "git-branch",
    built: true,
    conditions: [
        { title: "Excessive Navigational Depth", description: "To evaluate the structural burden of the interface, we model the application's architecture as a directed graph $G = (V, E)$. We define $v_{\\mathrm{home}}$ as the primary authenticated dashboard or landing page, and $v_{\\mathrm{target}}$ as the specific node representing the critical user action. Utilizing a standard distance function $d(v_i, v_j)$ to calculate the shortest path length (minimum number of clicks) between two nodes, the feature triggers if the absolute depth required to reach the target node strictly exceeds a predefined maximum heuristic threshold $\\tau_{\\mathrm{depth}}$ (e.g., 4 or 5 levels deep). This metric mathematically proves the interface is intentionally burying the exit path:", formula: "d(v_{\\mathrm{home}}, v_{\\mathrm{target}}) > \\tau_{\\mathrm{depth}}" },
        { title: "Semantic Obfuscation", description: "When humans navigate a graph, they rely on the semantic relevance of local links to estimate their proximity to a global target, a process governed by information scent . To measure the deliberate destruction of this scent, we define $P = (e_1, e_2, \\dots, e_k)$ as the sequence of interaction edges required to reach $v_{\\mathrm{target}}$. We extract the NLP-derived text label $L(e_i)$ for each edge (e.g., \"Account Settings'' or \"More Options'') and establish $\\mathrm{Topic}(v_{\\mathrm{target}})$ as the core semantic vector of the final destination. By computing the cosine similarity $\\mathrm{Sim}(x, y)$ between these vectors, the feature triggers if intermediate navigational labels deliberately lack semantic correlation with the target action. This forces the user to guess the correct pathway, formalized by the similarity score dropping below a required threshold $\\tau_{\\mathrm{semantic}}$:", formula: "\\exists e_i \\in P : \\mathrm{Sim}(L(e_i), \\mathrm{Topic}(v_{\\mathrm{target}})) < \\tau_{\\mathrm{semantic}}" },
        { title: "Navigational Loops", description: "Architectural disorientation is significantly amplified when linear progression is replaced with cyclic traps . Analyzing an intermediate node $v_{\\mathrm{current}}$ in the user's search path, we extract the set of all outgoing links $E_{\\mathrm{out}}(v_{\\mathrm{current}})$. The feature triggers if clicking a link that semantically implies progression toward the target instead routes the user backwards to a previously visited higher-level node ($v_{\\mathrm{visited}}$). This creates a frustrating circular loop, verified mathematically when the target of the edge resolves to an ancestor of the current node rather than the actual objective:", formula: "\\exists e \\in E_{\\mathrm{out}}(v_{\\mathrm{current}}) : \\mathrm{target}(e) \\in \\mathrm{Ancestors}(v_{\\mathrm{current}}) \\quad \\land \\quad \\mathrm{target}(e) \\neq v_{\\mathrm{target}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "labyrinthine-navigation-condition-1" },
    { conditionIndex: 1, demoSlug: "labyrinthine-navigation-condition-2" },
    { conditionIndex: 2, demoSlug: "labyrinthine-navigation-condition-3" },
  ],
  },
  {
    slug: "customisation",
    name: "Customisation (Interface Nesting)",
    category: "obstruction",
    summary: "Customisation—often overlapping with the \"Privacy Maze'' or \"Adding Steps'' patterns—is a structural dark pattern that weaponizes interface depth to manipulate user consent.",
    iconName: "sliders-horizontal",
    built: true,
    conditions: [
        { title: "Path Depth Asymmetry", description: "To quantify the structural hurdle of reaching a user-favorable state, we model the interface as a state transition graph $G = (V, E)$. Let $S_0$ be the initial, primary layer rendered to the user, and $d(S_0, S_{\\mathrm{target}})$ be the minimum topological depth (number of required interactions) to reach a terminal state. The feature triggers if the depth to achieve the provider-favorable state ($S_{\\mathrm{accept\\_all}}$) is minimal, while the user-favorable state ($S_{\\mathrm{reject\\_all}}$) requires traversing into a nested customization layer $S_{\\mathrm{custom}}$. This ensures the path of least resistance is mathematically biased toward the provider:", formula: "d(S_0, S_{\\mathrm{accept\\_all}}) == 1 \\quad \\land \\quad d(S_0, S_{\\mathrm{reject\\_all}}) \\ge 2" },
        { title: "Interaction Tax and Friction Multiplication", description: "The \"interaction tax\" represents the literal physical cost of privacy . We define $\\mathrm{Cost}(x)$ as the discrete number of clicks required to fully execute an intent $x$. We compare $A_{\\mathrm{provider}}$ (the intent to grant all permissions) against $A_{\\mathrm{user}}$ (the intent to deny non-essential permissions). The feature triggers if the interface optimizes the provider's intent into a single $\\mathcal{O}(1)$ click, but structurally inflates the user's intent by forcing a sequence of navigation, manual toggling, and final preference saving:", formula: "\\mathrm{Cost}(A_{\\mathrm{provider}}) == 1 \\quad \\land \\quad \\mathrm{Cost}(A_{\\mathrm{user}}) = \\mathrm{Cost}(\\mathrm{Navigate}) + \\mathrm{Cost}(\\mathrm{Toggle}) + \\mathrm{Cost}(\\mathrm{Save}) \\ge 3" },
        { title: "Hostile Initialization within the Customization Matrix", description: "The efficacy of a privacy maze is finalized by the state of its internal toggles . Within the secondary settings matrix $M_{\\mathrm{custom}}$, we identify a set of granular toggles $T = \\{t_1, t_2, \\dots, t_n\\}$. We define $\\mathrm{State}(t_i)$ as the boolean activation status upon first rendering the customization layer. The feature triggers if, after forcing the user to pay the interaction tax to reach $M_{\\mathrm{custom}}$, the system has pre-selected the business-favorable options by default. This forces the user to perform a linear series of manual de-selections to achieve their original intent:", formula: "\\forall t_i \\in T : \\mathrm{State}(t_i) == \\mathrm{True} \\quad \\text{prior to user interaction within } M_{\\mathrm{custom}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "customisation-condition-1" },
    { conditionIndex: 1, demoSlug: "customisation-condition-2" },
    { conditionIndex: 2, demoSlug: "customisation-condition-3" },
  ],
  },
  // ── Sneaking ──,
  {
    slug: "intermediate-currency",
    name: "Intermediate Currency",
    category: "sneaking",
    summary: "The Intermediate Currency pattern introduces an artificial layer of abstraction between the user's fiat money and the digital goods or services they wish to purchase.",
    iconName: "coins",
    built: true,
    conditions: [
        { title: "Interception of the Fiat Checkout Flow", description: "To model this coercive redirection, we define $V_{\\mathrm{product}}$ as the current interface state displaying a purchasable digital item, and $E_{\\mathrm{purchase}}$ as its primary transaction trigger (e.g., a \"Buy'' button). We contrast $V_{\\mathrm{checkout}}$, representing a standard fiat payment gateway, with $V_{\\mathrm{exchange}}$, representing an internal storefront built strictly for purchasing virtual currency. The feature triggers if the targeted transition edge systematically bypasses direct fiat payment, forcibly routing the user away from the checkout and into the virtual exchange:", formula: "\\mathrm{target}(E_{\\mathrm{purchase}}) == V_{\\mathrm{exchange}} \\quad \\land \\quad \\mathrm{target}(E_{\\mathrm{purchase}}) \\neq V_{\\mathrm{checkout}}" },
        { title: "Lexical Tokenization mapped to Forced Exchange", description: "To verify that the abstraction is structurally enforced rather than merely cosmetic, we establish $C_{\\mathrm{virtual}}$ as a localized, non-standard token system and $T_{\\mathrm{price}}(n)$ as the extracted price text of the item located on state $V_{\\mathrm{product}}$. By tracking $E_{\\mathrm{exchange}}$ as the mandatory interaction vector required to acquire $C_{\\mathrm{virtual}}$ with fiat money, the feature triggers if the token classifier determines the price is strictly expressed in a virtual lexicon AND the system actively gates the final transaction behind the prior execution of the exchange vector:", formula: "T_{\\mathrm{price}}(n) \\in C_{\\mathrm{virtual}} \\quad \\land \\quad \\text{TransactionStatus}(n) \\implies \\text{Executed}(E_{\\mathrm{exchange}})" },
        { title: "Asymmetric Denomination Arrays", description: "The most mathematically exploitative element of intermediate currency is the intentional misalignment of purchase bundles . We denote $P_{\\mathrm{item}}$ as the absolute cost of the desired digital good expressed in the virtual currency (e.g., 400 tokens) and $B_{\\mathrm{virtual}} = \\{b_1, b_2, \\dots, b_n\\}$ as the set of predefined virtual currency bundle sizes that the user can purchase with fiat money (e.g., \\{100, 500, 1000\\} tokens). By calculating $b_{\\mathrm{min\\_required}}$ as the smallest available bundle (or combination of bundles) satisfying $b_{\\mathrm{min\\_required}} \\geq P_{\\mathrm{item}}$, the feature triggers if the system detects an intentional mathematical mismatch. This occurs when the user is forced to buy a bundle strictly larger than the item's cost, resulting in a positive, unspendable remainder $R$:", formula: "R = b_{\\mathrm{min\\_required}} - P_{\\mathrm{item}} > 0 \\quad \\land \\quad P_{\\mathrm{item}} \\notin B_{\\mathrm{virtual}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "intermediate-currency-condition-1" },
    { conditionIndex: 1, demoSlug: "intermediate-currency-condition-2" },
    { conditionIndex: 2, demoSlug: "intermediate-currency-condition-3" },
  ],
  },
  {
    slug: "disguised-ad",
    name: "Disguised Ad",
    category: "sneaking",
    summary: "The Disguised Ad pattern is a visual manipulation technique where promotional content is engineered to mimic native interface elements, such as navigation menus, editorial content, or primary action buttons (e.g., a fake \"Download'' button).",
    iconName: "megaphone",
    built: true,
    conditions: [
        { title: "Morphological Similarity", description: "To quantify visual mimicry, we define $V_{\\mathrm{native}}$ as the set of visual feature vectors (encompassing computed background color, typography, border radius, and aspect ratio) extracted from legitimate, primary action nodes on the page via image analysis. We contrast this with $v_{\\mathrm{ad}}$, representing the feature vector of a structurally distinct third-party node, such as an <iframe> or a container injected by an external ad network. By calculating the cosine similarity $\\mathrm{sim}(v_1, v_2)$ between these vectors, the algorithm triggers if the ad element is styled to structurally and visually mimic native elements beyond a predefined similarity threshold $\\tau_{\\mathrm{blend}}$:", formula: "\\max_{v_i \\in V_{\\mathrm{native}}} \\mathrm{sim}(v_{\\mathrm{ad}}, v_i) > \\tau_{\\mathrm{blend}}" },
        { title: "Obfuscation of Disclosure Markers", description: "While advertising regulations require promotional content to be explicitly labeled, platforms frequently camouflage these disclosures to maintain the disguised illusion. We identify $L_{\\mathrm{disclosure}}$ as the textual node within the ad container holding mandatory regulatory keywords (e.g., \\{\"Ad'', \"Sponsored'', \"Advertisement''\\}). We evaluate $C(L_{\\mathrm{disclosure}})$, the calculated WCAG relative luminance contrast ratio between the disclosure text color and its immediate background, and compare the label's font size against $S_{\\mathrm{base}}$, the median font size of the surrounding native paragraph text. The feature triggers if the disclosure label is deliberately rendered illegible through extremely low contrast or diminutive scaling, falling below a scalar threshold $\\delta_{\\mathrm{scale}}$:", formula: "C(L_{\\mathrm{disclosure}}) < 3.0 \\quad \\lor \\quad \\frac{\\mathrm{fontSize}(L_{\\mathrm{disclosure}})}{S_{\\mathrm{base}}} < \\delta_{\\mathrm{scale}}" },
        { title: "Cross-Origin Action Masking", description: "The most hostile variant of this pattern occurs when an ad intercepts a user's functional intent. We define $B_{\\mathrm{action}}$ as a node styled as a primary action button, bearing an NLP-extracted text label that matches high-intent native tasks (e.g., \\{\"Download'', \"Start'', \"Play'', \"Next''\\}). We compare the primary domain of the web application, $D_{\\mathrm{host}}$, against the destination domain $D_{\\mathrm{target}}(B_{\\mathrm{action}})$ resolved by inspecting the href attribute or intercepting the click event. The feature triggers if a visually prominent action button falsely masquerades as a native function but structurally routes the user to an external advertising domain:", formula: "B_{\\mathrm{action}} \\neq \\emptyset \\quad \\land \\quad D_{\\mathrm{target}}(B_{\\mathrm{action}}) \\neq D_{\\mathrm{host}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "disguised-ad-condition-1" },
    { conditionIndex: 1, demoSlug: "disguised-ad-condition-2" },
    { conditionIndex: 2, demoSlug: "disguised-ad-condition-3" },
  ],
  },
  {
    slug: "sneak-into-basket",
    name: "Sneak Into Basket",
    category: "sneaking",
    summary: "The Sneak Into Basket pattern, often categorized under the broader \"Sneaking'' or \"Hiding Information'' umbrella, occurs when an e-commerce platform automatically adds supplementary, unrequested items---such as extended warranties, premium shipping, or complementary products---to the user's shopping cart.",
    iconName: "shopping-cart",
    built: true,
    conditions: [
        { title: "Unprompted State Mutation", description: "To formalize this unauthorized injection, we define $I_{\\mathrm{explicit}}$ as the set of product items the user has actively selected via direct DOM interaction events $E_{\\mathrm{user}}$ (e.g., explicit clicks on \"Add to Cart'' buttons). We then compare this to $I_{\\mathrm{cart}}$, representing the actual set of items present in the final checkout session data structure or rendered cart node. The feature triggers if the set difference between the actual cart items and explicitly requested items is not empty. This mathematically proves an unrequested item $y$ was injected by the system without a corresponding user event $e$:", formula: "(I_{\\mathrm{cart}} \\setminus I_{\\mathrm{explicit}} \\neq \\emptyset) \\quad \\land \\quad \\nexists e \\in E_{\\mathrm{user}} \\implies \\mathrm{Add}(y)" },
        { title: "Opt-Out Checkbox Initialization", description: "A common vehicle for sneaking items is the manipulation of default choice architecture . We identify $C_{\\mathrm{opt\\_out}}$ as a boolean input node (such as an <input type=\"checkbox\"> or a toggle switch) that represents the inclusion of a supplementary good or service $y$ (e.g., \"Add device protection for \\$9.99''). Using $t_0$ to represent the timestamp of the initial page load or DOM rendering for the product page, the feature triggers if the default initialization state of the node evaluates to true (checked) before any user interaction occurs. This structurally defaults the user into an unintended purchase by exploiting cognitive inertia:", formula: "\\mathrm{State}(C_{\\mathrm{opt\\_out}}, t_0) == \\mathrm{True} \\quad \\land \\quad \\mathrm{Interactions}(C_{\\mathrm{opt\\_out}}) == \\emptyset" },
        { title: "Implicit Price Inflation", description: "To catch sneaking mechanisms that bypass standard DOM inputs entirely, we monitor the mathematical consistency of the checkout totals. We define $P(x)$ as the NLP-extracted numerical price of an actively selected item $x \\in I_{\\mathrm{explicit}}$, and $P_{\\mathrm{total}}$ as the final numerical total rendered in the primary checkout button or summary node. Accounting for $P_{\\mathrm{standard\\_fees}}$ as legally or contextually expected additions (e.g., standard flat-rate shipping or baseline VAT), the feature triggers if the rendered total strictly exceeds the sum of the explicitly requested items plus standard fees. This discrepancy mathematically proves a hidden \"sneaked'' cost $P_{\\mathrm{sneaked}}$ has been appended to the payload:", formula: "P_{\\mathrm{total}} > \\sum_{x \\in I_{\\mathrm{explicit}}} P(x) + P_{\\mathrm{standard\\_fees}} \\implies P_{\\mathrm{sneaked}} > 0" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "sneak-into-basket-condition-1" },
    { conditionIndex: 1, demoSlug: "sneak-into-basket-condition-2" },
    { conditionIndex: 2, demoSlug: "sneak-into-basket-condition-3" },
  ],
  },
  {
    slug: "drip-pricing",
    name: "Drip Pricing, Hidden Costs, or Partitioned Pricing",
    category: "sneaking",
    summary: "Drip Pricing, also known as Partitioned Pricing or Hidden Costs, is a deceptive pricing strategy formally categorized under \"Hiding Information.'' The interface lures the user in by prominently advertising a low, incomplete base price.",
    iconName: "receipt",
    built: true,
    conditions: [
        { title: "Sequential Price Inflation", description: "To track the inflation of cost across a transaction, we model the checkout flow as a sequence of user states $S = (s_0, s_1, \\dots, s_n)$, where $s_0$ represents the initial product page and $s_n$ denotes the final payment confirmation page. We track $P(s_i)$ as the NLP-extracted primary total price displayed to the user at any given state $s_i$, while $I_{\\mathrm{added}}$ accounts for the value of any optional items or upgrades explicitly selected by the user during the flow. The feature triggers if the final price at $s_n$ strictly exceeds the initially advertised price at $s_0$ by an amount greater than the explicitly added items. This mathematically proves that hidden fees were incrementally dripped into the transaction:", formula: "P(s_n) > P(s_0) + I_{\\mathrm{added}} \\quad \\implies \\quad P_{\\mathrm{dripped}} > 0" },
        { title: "Late-Stage Injection of Mandatory Fees", description: "To identify exactly when the epistemic obstruction is lifted, we define $F = \\{f_1, f_2, \\dots, f_k\\}$ as a set of fee nodes rendered in the DOM (e.g., \"Service Fee'' or \"Processing Fee''). Using a boolean function $\\mathrm{Visibility}(f_j, s_i)$ to determine if a specific fee $f_j$ is rendered and visually accessible at state $s_i$, the algorithm scans the sequence. The feature triggers if mandatory fees $F_{\\mathrm{mandatory}} \\subseteq F$ are completely absent from the DOM during the initial decision-making states, and are only structurally injected into the UI at the terminal state $s_n$, trapping the user through their sunk interaction cost:", formula: "\\exists f \\in F_{\\mathrm{mandatory}} : \\mathrm{Visibility}(f, s_0) == \\mathrm{False} \\quad \\land \\quad \\mathrm{Visibility}(f, s_n) == \\mathrm{True}" },
        { title: "Visual Disparity of Cost Partitioning", description: "Even when partitioned fees are technically disclosed on the same page, their impact is frequently minimized through visual suppression . We identify $N_{\\mathrm{base}}$ as the DOM node displaying the advertised base price, and $N_{\\mathrm{fee}}$ as the node disclosing the partitioned fees. By calculating $V(x)$, the computed visual prominence of node $x$ derived from YOLO bounding box area, CSS font-size, font-weight, and contrast ratio, we can compare their relative weights. The feature triggers if the interface deliberately obscures the partitioned fees by rendering them with a severe visual deficiency compared to the base price, pushing the prominence ratio beyond a deceptive heuristic threshold $\\tau_{\\mathrm{prominence}}$:", formula: "\\frac{V(N_{\\mathrm{base}})}{V(N_{\\mathrm{fee}})} > \\tau_{\\mathrm{prominence}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "drip-pricing-condition-1" },
    { conditionIndex: 1, demoSlug: "drip-pricing-condition-2" },
    { conditionIndex: 2, demoSlug: "drip-pricing-condition-3" },
  ],
  },
  {
    slug: "bundling",
    name: "Bundling",
    category: "sneaking",
    summary: "Bundling is an e-commerce and structural dark pattern formally recognized as a severe manipulation of choice architecture.",
    iconName: "boxes",
    built: true,
    conditions: [
        { title: "Inseparable Transactional Nodes", description: "To detect this artificial fusion, we define $I_{\\mathrm{primary}}$ as the digital good or service the user explicitly intends to purchase, and $I_{\\mathrm{supp}}$ as a supplementary item (such as an extended warranty, a mandatory accessory, or a secondary subscription). By tracking $E_{\\mathrm{purchase}}$ as the primary transactional event (e.g., \"Add to Cart'' or \"Buy Now''), and $C_{\\mathrm{state}}$ as the set of items actively staged for checkout, the feature triggers if the targeted transition edge algorithmically forces the inclusion of both items. This is verified if the execution of the primary purchase event inevitably results in both items entering the cart, without offering any discrete event $e$ to add the primary item alone:", formula: "E_{\\mathrm{purchase}}(I_{\\mathrm{primary}}) \\implies \\{I_{\\mathrm{primary}}, I_{\\mathrm{supp}}\\} \\subseteq C_{\\mathrm{state}} \\quad \\land \\quad \\nexists e : e(I_{\\mathrm{primary}}) \\implies C_{\\mathrm{state}} = \\{I_{\\mathrm{primary}}\\}" },
        { title: "Irreversible Set Addition", description: "To evaluate the coercive nature of the cart architecture, we establish $\\mathrm{Remove}(x)$ as the user-initiated DOM event designed to delete item $x$ from the checkout array $C_{\\mathrm{state}}$. The feature triggers if attempting to remove the unrequested bundled item $I_{\\mathrm{supp}}$ automatically triggers a backend script that simultaneously removes the primary item $I_{\\mathrm{primary}}$. Furthermore, the feature is flagged if the interface structurally disables the interaction entirely by omitting the removal button for the supplementary item, creating a strict topological lock:", formula: "\\mathrm{Remove}(I_{\\mathrm{supp}}) \\implies C_{\\mathrm{state}} \\cap \\{I_{\\mathrm{primary}}\\} = \\emptyset \\quad \\lor \\quad \\mathrm{DOM}(I_{\\mathrm{supp}}).\\mathrm{removeButton} == \\mathrm{Null}" },
        { title: "Suppression of Individual Pricing", description: "The economic deception of forced bundling relies heavily on obscuring the independent market value of the forced additions . We extract $P_{\\mathrm{bundle}}$ via NLP as the aggregated price of the forced bundle, while $P(I_{\\mathrm{primary}})$ and $P(I_{\\mathrm{supp}})$ represent the theoretical standalone prices of the individual components. Scanning $S_{\\mathrm{nodes}}$, the set of textual nodes rendered on the product and checkout pages, the feature triggers if the system structurally omits the standalone prices of the forcibly bundled items. This prevents the user from calculating the mathematical value or exact cost burden of the supplementary item:", formula: "P_{\\mathrm{bundle}} \\in S_{\\mathrm{nodes}} \\quad \\land \\quad (P(I_{\\mathrm{primary}}) \\notin S_{\\mathrm{nodes}} \\quad \\lor \\quad P(I_{\\mathrm{supp}}) \\notin S_{\\mathrm{nodes}})" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "bundling-condition-1" },
    { conditionIndex: 1, demoSlug: "bundling-condition-2" },
    { conditionIndex: 2, demoSlug: "bundling-condition-3" },
  ],
  },
  {
    slug: "hidden-information",
    name: "Hidden Information",
    category: "sneaking",
    summary: "The Hidden Information pattern, frequently overlapping with \"Sneaking'' and \"Interface Interference,'' deliberately obscures critical details---such as auto-renewal clauses, additional fees, or extensive data-sharing agreements---by displacing them from the user's primary visual locus.",
    iconName: "eye-off",
    built: true,
    conditions: [
        { title: "Typographical and Chromatic Camouflage", description: "To quantify the visual suppression of essential terms, we identify $N_{\\mathrm{critical}}$ as a DOM node containing NLP-identified critical phrases (e.g., \\{\"auto-renew'', \"subscription'', \"cancel at any time''\\}). We define $S_{\\mathrm{font}}(x)$ as the computed CSS font size of node $x$ in pixels, and $\\mathrm{CR}(x, L_{\\mathrm{bg}})$ as its WCAG contrast ratio against the background. The feature triggers if the critical node is deliberately rendered at the extreme margins of legibility, falling below baseline accessibility thresholds while the primary interface elements remain highly visible. This is formalized when the font size or contrast drops below the limits of standard human perception $\\tau_{\\mathrm{min\\_readable}}$ or $\\tau_{\\mathrm{wcag\\_min}}$:", formula: "S_{\\mathrm{font}}(N_{\\mathrm{critical}}) < \\tau_{\\mathrm{min\\_readable}} \\quad \\lor \\quad \\mathrm{CR}(N_{\\mathrm{critical}}, L_{\\mathrm{bg}}) \\approx \\tau_{\\mathrm{wcag\\_min}}" },
        { title: "Structural Burial in High-Density Text", description: "Information is frequently hidden by drowning it in a \"wall of text\" designed to induce cognitive exhaustion . We define $N_{\\mathrm{document}}$ as a parent node representing a dense text block (e.g., Terms and Conditions), and $|W(N_{\\mathrm{document}})|$ as its total word count. Within this document, $t_{\\mathrm{clause}}$ represents the specific sentence containing critical financial or privacy information. Applying a boolean function $P(x)$ to evaluate the presence of visual emphasis tags (such as <strong> or <em>), the feature triggers if the critical clause is buried in an excessively long document without any semantic or visual highlighting to distinguish it from surrounding boilerplate text:", formula: "|W(N_{\\mathrm{document}})| > \\tau_{\\mathrm{fatigue}} \\quad \\land \\quad P(t_{\\mathrm{clause}}) == \\mathrm{False}" },
        { title: "Extreme Spatial Displacement", description: "Beyond typographical manipulation, interfaces leverage vertical space to ensure critical information remains outside the user's immediate attention. We define $\\mathrm{Pos}_{y}(x)$ as the absolute vertical Y-coordinate of node $x$ and $V_{\\mathrm{height}}$ as the height of the initial rendering viewport. By comparing the position of $N_{\\mathrm{critical}}$ to the primary interaction node $N_{\\mathrm{action}}$ (e.g., \"Complete Purchase''), the feature triggers if the critical information is positioned so far outside the initial viewport and the primary action zone that it necessitates significant, unintuitive scrolling to discover. This is verified by a vertical distance threshold $\\tau_{\\mathrm{displacement}}$ indicating severe intentional separation:", formula: "\\mathrm{Pos}_{y}(N_{\\mathrm{critical}}) \\gg V_{\\mathrm{height}} \\quad \\land \\quad |\\mathrm{Pos}_{y}(N_{\\mathrm{action}}) - \\mathrm{Pos}_{y}(N_{\\mathrm{critical}})| > \\tau_{\\mathrm{displacement}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "hidden-information-condition-1" },
    { conditionIndex: 1, demoSlug: "hidden-information-condition-2" },
    { conditionIndex: 2, demoSlug: "hidden-information-condition-3" },
  ],
  },
  {
    slug: "reduced-friction",
    name: "Reduced Friction",
    category: "sneaking",
    summary: "Reduced Friction—also referred to as Frictionless Design when weaponized—is a behavioral dark pattern formally categorized under \"Interface Interference'' and \"Forced Action.'' While removing friction is traditionally a best practice in UX design to improve usability, it becomes a dark pattern when applied exclusively to high-stakes, business-favorable actions, such as spending money, subscribing, or granting broad data permissions .",
    iconName: "zap",
    built: true,
    conditions: [
        { title: "Absence of Confirmation Interstitial", description: "To identify the removal of critical decision boundaries, we define $S_{\\mathrm{intent}}$ as the state where the user views an offer and $S_{\\mathrm{commit}}$ as the final, irreversible transactional state (e.g., payment processed). We contrast this with $S_{\\mathrm{confirm}}$, a standard intermediary state requiring explicit user review and secondary validation. The feature triggers if the targeted transition edge for a high-stakes domain ($D_{\\mathrm{financial}}$ or $D_{\\mathrm{privacy}}$) bypasses the confirmation node entirely. This is mathematically verified when a single interaction vector $E_{\\mathrm{click}}$ executes the commitment without a path through the confirmation node:", formula: "E_{\\mathrm{click}}(S_{\\mathrm{intent}}) \\implies S_{\\mathrm{commit}} \\quad \\land \\quad S_{\\mathrm{confirm}} \\notin \\mathrm{Path}(S_{\\mathrm{intent}} \\to S_{\\mathrm{commit}})" },
        { title: "Asymmetric Action-Reversal Friction", description: "Hostile interfaces often create a \"one-way valve\" effect by mismatching the effort required to enter and exit a commitment . We define $\\mathrm{Cost}(A \\to B)$ as the interaction cost (measured in clicks, time, or cognitive load) to transition between states. Let $S_{\\mathrm{initial}}$ be the pre-action state and $S_{\\mathrm{commit}}$ be the post-action state. The feature triggers if the interface heavily optimizes the path to commit (approaching $\\mathcal{O}(1)$ effort) while algorithmically inflating the friction required to undo or reverse that exact action (approaching $\\mathcal{O}(n)$ effort), effectively trapping the user:", formula: "\\mathrm{Cost}(S_{\\mathrm{initial}} \\to S_{\\mathrm{commit}}) = 1 \\quad \\land \\quad \\mathrm{Cost}(S_{\\mathrm{commit}} \\to S_{\\mathrm{initial}}) \\gg 1" },
        { title: "Pre-authorized State Exploitation", description: "A fundamental deceptive tactic involves the silent reuse of sensitive credentials to bypass contemporaneous consent. We define $T_{\\mathrm{auth}}$ as a cached authentication or payment token generated during a prior session and $V_{\\mathrm{secondary}}()$ as a boolean function representing a secondary check, such as a biometric prompt or CVV request. The feature triggers if the system silently reuses $T_{\\mathrm{auth}}$ for a new, distinct transaction without invoking $V_{\\mathrm{secondary}}()$. This proves the system is prioritizing transaction speed over the user's explicit, contemporaneous intent:", formula: "S_{\\mathrm{commit}} == \\mathrm{True}", given: "\\quad (T_{\\mathrm{auth}} \\neq \\emptyset \\quad \\land \\quad V_{\\mathrm{secondary}}() == \\mathrm{False})" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "reduced-friction-condition-1" },
    { conditionIndex: 1, demoSlug: "reduced-friction-condition-2" },
    { conditionIndex: 2, demoSlug: "reduced-friction-condition-3" },
  ],
  },
  {
    slug: "forced-continuity",
    name: "Forced Continuity",
    category: "sneaking",
    summary: "Forced Continuity is a financial dark pattern typically categorized under \"Sneaking'' or \"Bait and Switch.'' It occurs when a free trial or heavily discounted promotional period silently and automatically converts into a recurring, full-priced subscription without adequate prior warning or a transparent, frictionless cancellation mechanism .",
    iconName: "credit-card",
    built: true,
    conditions: [
        { title: "Time-Triggered Silent State Mutation", description: "To identify the automated nature of this financial trap, we define $t_{\\mathrm{expiry}}$ as the exact timestamp when the promotional period concludes. We monitor $S_{\\mathrm{account}}(t)$, the user's subscription state, as it transitions from $S_{\\mathrm{trial}}$ to $S_{\\mathrm{premium}}$, and $E_{\\mathrm{charge}}$, the backend event executing a transaction against a cached payment token $T_{\\mathrm{payment}}$. The feature triggers if the system algorithmically executes the state transition and the financial charge strictly based on the temporal threshold, without demanding explicit, contemporary user confirmation ($ \\mathrm{Consent}_{\\mathrm{explicit}}$) at the point of conversion:", formula: "t \\geq t_{\\mathrm{expiry}} \\quad \\implies \\quad S_{\\mathrm{account}}(t) \\to S_{\\mathrm{premium}} \\quad \\land \\quad E_{\\mathrm{charge}}(T_{\\mathrm{payment}}) == \\mathrm{True}", given: "\\text{given} \\quad \\mathrm{Consent}_{\\mathrm{explicit}}(t) == \\mathrm{False}" },
        { title: "Absence of Temporal Feedforward", description: "The efficacy of forced continuity depends on the suppression of user awareness . We define $N_{\\mathrm{warning}}$ as an out-of-band notification (e.g., an email or push notification) and $t_{\\mathrm{warning}}$ as the dispatch timestamp. Utilizing an ethical cooling-off period $\\tau_{\\mathrm{fair\\_notice}}$ (e.g., 3 to 7 days prior to expiry), the algorithm detects the absence of \"fair notice.\" The feature triggers if the service omits the warning entirely or dispatches it with insufficient lead time for the user to react and cancel:", formula: "N_{\\mathrm{warning}} == \\emptyset \\quad \\lor \\quad (t_{\\mathrm{expiry}} - t_{\\mathrm{warning}}) < \\tau_{\\mathrm{fair\\_notice}}" },
        { title: "Asymmetric Offboarding Friction", description: "A fundamental deceptive tactic involves the \"Roach Motel\" effect, where entering a subscription is frictionless but exiting is structurally prohibited . We contrast $\\mathrm{Cost}(F_{\\mathrm{signup}})$, the interaction cost to initiate the trial, with $\\mathrm{Cost}(F_{\\mathrm{cancel}})$, the cost to terminate the recurring state. The feature triggers if the provider heavily optimizes acquisition while artificially inflating the difficulty of cancellation, specifically when the cancellation requires a different, higher-friction medium than the signup (e.g., forcing a phone call to cancel a web signup):", formula: "\\mathrm{Cost}(F_{\\mathrm{cancel}}) \\gg \\mathrm{Cost}(F_{\\mathrm{signup}}) \\quad \\lor \\quad \\mathrm{Channel}(F_{\\mathrm{cancel}}) \\neq \\mathrm{Channel}(F_{\\mathrm{signup}})" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "forced-continuity-condition-1" },
    { conditionIndex: 1, demoSlug: "forced-continuity-condition-2" },
    { conditionIndex: 2, demoSlug: "forced-continuity-condition-3" },
  ],
  },
  {
    slug: "privacy-zuckering",
    name: "Privacy Zuckering",
    category: "sneaking",
    summary: "Privacy Zuckering—a term originally coined by the Electronic Frontier Foundation (EFF)—is a data-harvesting dark pattern formally categorized under \"Sneaking'' and \"Interface Interference.'' It occurs when an interface intentionally tricks, confuses, or coerces a user into surrendering significantly more personal data than they intend to .",
    iconName: "user",
    built: true,
    conditions: [
        { title: "Bundled Consent and Granularity Violation", description: "To identify the forced fusion of data categories, we define $D_{\\mathrm{essential}}$ as the subset of user data required to operate the core service and $D_{\\mathrm{monetization}}$ as data used strictly for profiling or third-party brokerage. We monitor $T_{\\mathrm{accept}}$, the primary boolean interaction node for granting consent. The feature triggers if the interface structurally fuses these distinct categories into an indivisible toggle, forcing the user to accept monetization tracking as a mandatory condition for basic utility access. This is mathematically confirmed when no alternative interaction $t_{\\mathrm{alt}}$ exists to grant essential access while denying monetization:", formula: "T_{\\mathrm{accept}} == \\mathrm{True} \\quad \\implies \\quad (\\mathrm{Access}(D_{\\mathrm{essential}}) == \\mathrm{True} \\quad \\land \\quad \\mathrm{Access}(D_{\\mathrm{monetization}}) == \\mathrm{True})", given: "\\text{given} \\quad \\nexists t_{\\mathrm{alt}} : (t_{\\mathrm{alt}} \\implies \\mathrm{Access}(D_{\\mathrm{essential}}) \\land \\neg \\mathrm{Access}(D_{\\mathrm{monetization}}))" },
        { title: "Semantic Ambiguity of Third-Party Entities", description: "Deceptive interfaces often mask the scale of data distribution using linguistic \"umbrellas\" . We define $N_{\\mathrm{disclosure}}$ as the text node explaining data usage and $E_{\\mathrm{actual}}$ as the true set of third-party entities receiving the payload. Using an NLP function $\\mathrm{Specificity}(x)$ to measure the exactness of named entity recognition (where corporate names score near 1 and euphemisms near 0), the feature triggers if the true cardinality of receiving entities is high, but the text relies on low-specificity terms like \"partners'' or \"affiliates'' to mask the distribution reality:", formula: "|E_{\\mathrm{actual}}| \\gg 1 \\quad \\land \\quad \\mathrm{Specificity}(N_{\\mathrm{disclosure}}) < \\tau_{\\mathrm{vague}}" },
        { title: "Pre-Emptive Exposure", description: "A fundamental tactic in Privacy Zuckering is exploiting the status quo bias at the moment of account creation . We define $P = \\{p_1, p_2, \\dots, p_n\\}$ as the set of granular privacy settings and $\\mathrm{Exposure}(p_i)$ as the boolean state of maximum data sharing. Establishing $t_{\\mathrm{creation}}$ as the timestamp immediately following registration, the feature triggers if the system initializes the account with every setting defaulted to its most exposed state. This maximizes data harvesting before the user even attempts to discover the configuration menu:", formula: "\\forall p_i \\in P : \\mathrm{Exposure}(p_i, t_{\\mathrm{creation}}) == \\mathrm{True} \\quad \\land \\quad \\mathrm{UserEvents}(P, t_{\\mathrm{creation}}) == \\emptyset" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "privacy-zuckering-condition-1" },
    { conditionIndex: 1, demoSlug: "privacy-zuckering-condition-2" },
    { conditionIndex: 2, demoSlug: "privacy-zuckering-condition-3" },
  ],
  },
  {
    slug: "friend-spam",
    name: "Friend Spam",
    category: "sneaking",
    summary: "Friend Spam is an aggressive and privacy-invasive dark pattern categorized under \"Sneaking'' and \"Interface Interference.'' It occurs when an application requests access to a user's contact list or social media graph under the explicit pretense of a benign utility—such as \"finding friends already on the platform''—but then silently weaponizes those permissions to broadcast unsolicited promotional messages to the user's entire network .",
    iconName: "send",
    built: true,
    conditions: [
        { title: "Feedforward Intent vs. Payload Execution", description: "To identify this deceptive shift in intent, we define $N_{\\mathrm{prompt}}$ as the text node requesting OAuth access or native contact permissions. We map the NLP-derived intent, $\\mathrm{Intent}_{\\mathrm{NLP}}(N_{\\mathrm{prompt}})$, to an expected action domain. The feature triggers if the textual promise implies a localized, read-only matching operation (e.g., \\{\"find'', \"search''\\}), but the backend script immediately executes a write-oriented mass broadcast protocol ($E_{\\mathrm{backend\\_action}}$) upon receiving the access token $T_{\\mathrm{access}}$:", formula: "\\mathrm{Intent}_{\\mathrm{NLP}}(N_{\\mathrm{prompt}}) \\in D_{\\mathrm{read\\_only}} \\quad \\land \\quad E_{\\mathrm{backend\\_action}}(T_{\\mathrm{access}}) \\implies \\mathrm{SendMessages()}" },
        { title: "Absence of Granular Selection", description: "The most common implementation of Friend Spam involves bypassing the curation process to maximize message reach . We define $C_{\\mathrm{network}}$ as the full set of contacts extracted and $S_{\\mathrm{selected}}$ as the subset explicitly chosen by the user via DOM checkboxes. Let $M_{\\mathrm{dispatched}}$ be the set of promotional messages generated. The feature triggers if the interface skips the curation state entirely, automatically setting the dispatch target to the maximum theoretical limit of the extracted contact array without affirmative, granular user selection:", formula: "|S_{\\mathrm{selected}}| == 0 \\quad \\land \\quad |M_{\\mathrm{dispatched}}| \\approx |C_{\\mathrm{network}}| \\quad \\implies \\quad \\mathrm{Unauthorized \\: Broadcast}" },
        { title: "Sender Identity Spoofing", description: "To quantify the deceptive appropriation of identity, we isolate $I_{\\mathrm{user}}$ as the user's personal identity vectors (e.g., name or profile picture) and $I_{\\mathrm{corp}}$ as the actual corporate entity. We analyze $m_{\\mathrm{outbound}}$ as a single message dispatched to a contact. The feature triggers if the system deliberately injects the user's identity vectors into the sender alias of a corporate marketing message. This non-consensual usage transforms the user into a trusted \"trojan horse\" to increase the conversion rate of the marketing payload:", formula: "\\mathrm{SenderAlias}(m_{\\mathrm{outbound}}) == I_{\\mathrm{user}} \\quad \\land \\quad \\mathrm{Author}(m_{\\mathrm{outbound}}) == I_{\\mathrm{corp}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "friend-spam-condition-1" },
    { conditionIndex: 1, demoSlug: "friend-spam-condition-2" },
    { conditionIndex: 2, demoSlug: "friend-spam-condition-3" },
  ],
  },
  {
    slug: "address-book-leeching",
    name: "Address Book Leeching",
    category: "sneaking",
    summary: "Address Book Leeching is a severe data-harvesting dark pattern formally categorized under \"Privacy Manipulation'' and \"Forced Action.'' While closely related to Friend Spam, Leeching focuses specifically on the covert extraction, upload, and permanent retention of a user's entire contact list.",
    iconName: "contact",
    built: true,
    conditions: [
        { title: "Utility-Permission Decoupling", description: "To identify the coercive nature of the data request, we define $U_{\\mathrm{core}}$ as the primary, advertised utility of the application (e.g., a local music player or utility tool) and $P_{\\mathrm{contacts}}$ as the operating system-level permission to read the address book. We apply a function $\\mathrm{Dep}(U, P)$ to evaluate the technical dependency of the utility on the requested permission. The feature triggers if the application algorithmically blocks initialization or core functionality until the permission is granted, despite the mathematical absence of any functional requirement for contact data:", formula: "\\mathrm{State}(U_{\\mathrm{core}}) == \\mathrm{Blocked}", given: "\\quad P_{\\mathrm{contacts}} == \\mathrm{False} \\quad \\land \\quad \\mathrm{Dep}(U_{\\mathrm{core}}, P_{\\mathrm{contacts}}) == \\emptyset" },
        { title: "Silent Remote Exfiltration", description: "The most deceptive phase of leeching involves the unannounced transmission of local data to a provider-controlled server . We define $C_{\\mathrm{local}}$ as the array of contact entities stored on the device and $S_{\\mathrm{remote}}$ as the backend server infrastructure. By monitoring the outbound network payload $\\mathrm{Packet}(t)$ immediately following the granting of $P_{\\mathrm{contacts}}$, the algorithm detects exfiltration. The feature triggers if the application serializes the entire contact array into a network payload transmitted to a remote server without explicit, high-prominence feedforward disclosure of the upload:", formula: "\\exists t > t_{\\mathrm{permission}} : C_{\\mathrm{local}} \\subseteq \\mathrm{Packet}(t) \\quad \\land \\quad \\mathrm{Destination}(\\mathrm{Packet}(t)) == S_{\\mathrm{remote}}" },
        { title: "Shadow Graph Construction", description: "To quantify the impact on non-consenting third parties, we model the provider's backend social graph as $G_{\\mathrm{social}} = (V, E)$, where $V$ represents registered users . We define $v_{\\mathrm{shadow}} \\notin V$ as an individual who has never registered for the service but whose data is present within an uploaded contact $c_i$. The feature triggers if the backend ingests exfiltrated contacts to algorithmically generate persistent \"shadow profile\" nodes and relational edges for these non-consenting parties, mapping the social network without their knowledge or legal authorization:", formula: "C_{\\mathrm{local}} \\to S_{\\mathrm{remote}} \\implies v_{\\mathrm{shadow}} \\in V_{\\mathrm{database}} \\quad \\land \\quad \\mathrm{Consent}(v_{\\mathrm{shadow}}) == \\mathrm{False}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "address-book-leeching-condition-1" },
    { conditionIndex: 1, demoSlug: "address-book-leeching-condition-2" },
    { conditionIndex: 2, demoSlug: "address-book-leeching-condition-3" },
  ],
  },
  {
    slug: "automatic-accept-third-party-term",
    name: "Automatic Accept Third Party Term",
    category: "sneaking",
    summary: "Automatic Accept Third Party Term is a consent-based dark pattern formally categorized under \"Sneaking'' and \"Forced Action.'' It occurs when an interface structurally bundles the agreement to a primary service provider's Terms of Service with the hidden, mandatory acceptance of numerous third-party agreements .",
    iconName: "file-check",
    built: true,
    conditions: [
        { title: "Bundled Transitive Consent", description: "To identify the forced fusion of distinct legal entities, we define $T_{\\mathrm{primary}}$ as the core terms of the main application and $T_{\\mathrm{third\\_party}} = \\{t_1, t_2, \\dots, t_n\\}$ as the set of agreements for external partner entities. We monitor $\\mathrm{Accept}(x)$, the boolean backend state registering user consent. The feature triggers if the interface algorithmically fuses these contracts together, ensuring that affirmatively interacting with the primary consent node inherently forces the acceptance of the entire third-party array without providing individual decoupling toggles within the Document Object Model (DOM):", formula: "\\mathrm{Accept}(T_{\\mathrm{primary}}) \\implies \\forall t_i \\in T_{\\mathrm{third\\_party}} : \\mathrm{Accept}(t_i) == \\mathrm{True}", given: "\\text{given} \\quad \\nexists \\mathrm{Toggle}(t_i) \\in \\mathrm{DOM}" },
        { title: "Opaque Entity Resolution", description: "Deceptive interfaces often mask the scale of legal binding through linguistic \"umbrellas\" . We define $N_{\\mathrm{consent}}$ as the immediate UI text node and $E_{\\mathrm{declared}}$ as the set of specific corporate entities explicitly named within that text. We contrast this with $E_{\\mathrm{actual}}$, the true set of entities granted legal consent upon execution. The feature triggers if the interface relies on vague terms like \"trusted partners'' to mask a reality where the actual cardinality of the entities gaining consent vastly exceeds what is presented to the user's immediate cognitive layer:", formula: "E_{\\mathrm{declared}} \\subset E_{\\mathrm{actual}} \\quad \\land \\quad |E_{\\mathrm{actual}}| \\gg |E_{\\mathrm{declared}}| \\approx 0" },
        { title: "Asymmetric Review Friction", description: "A fundamental indicator of this pattern is the structural hurdle placed between the user and the external agreements they are forced to accept . We define $\\mathrm{Cost}(R(x))$ as the interaction effort—measured in clicks and page loads—required to render the readable text of an agreement. The feature triggers if the primary terms are rendered with low friction, but accessing the third-party terms requires traversing deep, external hyperlinks. This ensures the cognitive cost of reviewing the bundled agreements scales linearly with the number of partners ($n$), effectively deterring the user from performing due diligence:", formula: "\\mathrm{Cost}(R(T_{\\mathrm{primary}})) \\approx 0 \\quad \\land \\quad \\sum_{i=1}^{n} \\mathrm{Cost}(R(t_i)) \\propto n \\cdot c \\quad (c \\gg 1)" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "automatic-accept-third-party-term-condition-1" },
    { conditionIndex: 1, demoSlug: "automatic-accept-third-party-term-condition-2" },
    { conditionIndex: 2, demoSlug: "automatic-accept-third-party-term-condition-3" },
  ],
  },
  {
    slug: "pre-delivered-content",
    name: "Pre-Delivered Content",
    category: "sneaking",
    summary: "The Pre-Delivered Content pattern—historically termed \"On-Disc DLC''—is a manipulative resource-extraction strategy formally categorized under \"Hidden Costs'' and \"Forced Action.'' It occurs when a software provider covertly installs premium, locked digital assets (e.g., expansion packs or high-resolution textures) directly onto the user's local hardware without explicit consent .",
    iconName: "package",
    built: true,
    conditions: [
        { title: "Unconsented Local Storage Consumption", description: "To quantify the unauthorized appropriation of user hardware, we define $S_{\\mathrm{local}}$ as the user's physical storage environment and $C_{\\mathrm{premium}}$ as the set of high-capacity assets intended for future monetization. We contrast this with $E_{\\mathrm{consent}}$, the explicit user request to install said content. The feature triggers if the system autonomously injects the payload into the storage architecture without authorization, permanently consuming capacity as a hidden cost of the baseline installation:", formula: "C_{\\mathrm{premium}} \\subseteq S_{\\mathrm{local}}", given: "\\quad E_{\\mathrm{consent}} == \\emptyset \\quad \\land \\quad \\mathrm{Size}(C_{\\mathrm{premium}}) \\gg 0" },
        { title: "Artificial Local Access Gating", description: "A fundamental indicator of this pattern is the imposition of a logical lock on physically possessed data . We define $\\mathrm{Access}(C)$ as the technical ability to execute content $C$, and $K_{\\mathrm{license}}$ as the DRM boolean flag controlled by the backend. The feature triggers if the application algorithmically blocks interaction with assets already resident on the user's hardware, proving the gate is purely artificial rather than a result of pending delivery:", formula: "\\mathrm{State}(\\mathrm{Access}(C_{\\mathrm{premium}})) == \\mathrm{Blocked}", given: "\\quad C_{\\mathrm{premium}} \\subseteq S_{\\mathrm{local}} \\quad \\land \\quad K_{\\mathrm{license}} == \\mathrm{False}" },
        { title: "Transactional Key Provision", description: "The efficacy of this coercive model is revealed at the point of sale . We define $T_{\\mathrm{fiat}}$ as the monetary transaction and $\\Delta B_{\\mathrm{network}}(t)$ as the bandwidth consumed to deliver the asset at time $t$. The feature triggers if the provider demands payment strictly to toggle the local DRM flag, executing the transaction with zero actual data delivery at the point of sale. This confirms that the user’s resources were utilized for pre-emptive, coercive upselling:", formula: "T_{\\mathrm{fiat}} > 0 \\implies K_{\\mathrm{license}} \\to \\mathrm{True}", given: "\\quad \\Delta B_{\\mathrm{network}}(t_{\\mathrm{transaction}}) == 0" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "pre-delivered-content-condition-1" },
    { conditionIndex: 1, demoSlug: "pre-delivered-content-condition-2" },
    { conditionIndex: 2, demoSlug: "pre-delivered-content-condition-3" },
  ],
  },
  // ── Urgency ──,
  {
    slug: "fear-of-missing-out-fomo",
    name: "Fear Of Missing Out (FOMO)",
    category: "urgency",
    summary: "The Fear Of Missing Out (FOMO) pattern is a psychological manipulation tactic formally categorized under \"Deceptive Sniping'' or \"Urgency and Scarcity.'' It aggressively pressures the user into an immediate transaction by fabricating artificial constraints on either time (temporal scarcity) or availability (inventory scarcity).",
    iconName: "flame",
    built: true,
    conditions: [
        { title: "Artificial Temporal Scarcity", description: "To algorithmically detect fake urgency, we monitor a dynamic DOM node $N_{\\mathrm{timer}}$ that actively decrements a time value . By capturing the parsed remaining time $T(s_i)$ at a given session load state $s_i$, we compare it across two independent, sequential browsing sessions, $s_0$ and $s_1$ (e.g., achieved by clearing cookies or initializing an incognito window). The feature triggers if the countdown timer fails to maintain a global server-side state, deterministically resetting its duration $\\Delta t$ upon a new session initialization rather than reflecting a genuine, universal deadline:", formula: "T(s_0) \\approx \\Delta t \\quad \\land \\quad T(s_1) \\approx \\Delta t \\quad \\implies \\quad \\mathrm{Fabricated \\: Urgency}" },
        { title: "Fabricated Inventory Scarcity", description: "For inventory manipulation, we identify $N_{\\mathrm{stock}}$ as a text node conveying inventory levels, extracting the available quantity as an integer $Q_{\\mathrm{avail}}$ via NLP. We cross-reference the surrounding text $W(N_{\\mathrm{stock}})$ with $L_{\\mathrm{scarcity}}$, a predefined lexicon of scarcity-inducing keywords (e.g., \\{\"hurry'', \"almost gone'', \"sold out soon''\\}). Utilizing a heuristic threshold $\\tau_{\\mathrm{low\\_stock}}$ for critical inventory (typically $\\leq 5$), the feature triggers if the extracted quantity is suspiciously pinned below this critical threshold, heavily reinforced by scarcity semantics, and remains completely static over time ($\\frac{d Q_{\\mathrm{avail}}}{dt} == 0$) across multiple independent requests:", formula: "Q_{\\mathrm{avail}} \\leq \\tau_{\\mathrm{low\\_stock}} \\quad \\land \\quad (W(N_{\\mathrm{stock}}) \\cap L_{\\mathrm{scarcity}} \\neq \\emptyset) \\quad \\land \\quad \\frac{d Q_{\\mathrm{avail}}}{dt} == 0" },
        { title: "High-Frequency Social Proof Injection", description: "To identify weaponized social proof, we define $E_{\\mathrm{social}}$ as an ephemeral, dynamically injected DOM node displaying a recent conversion event (such as a toast notification showing another user's purchase). By measuring the injection frequency $\\lambda_{\\mathrm{inject}}$ in occurrences per minute, and tracking the set of unique strings $S_{\\mathrm{content}}$ rendered inside $E_{\\mathrm{social}}$ over time $t$, the system audits the legitimacy of the activity stream . The feature triggers if the injection rate exceeds an established cognitive distraction threshold $\\tau_{\\mathrm{distract}}$, or if the sequence of notifications loops deterministically from a finite, hardcoded array rather than a genuinely stochastic server stream:", formula: "\\lambda_{\\mathrm{inject}} > \\tau_{\\mathrm{distract}} \\quad \\lor \\quad |S_{\\mathrm{content}}| \\leq \\tau_{\\mathrm{unique\\_events}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "fear-of-missing-out-fomo-condition-1" },
    { conditionIndex: 1, demoSlug: "fear-of-missing-out-fomo-condition-2" },
    { conditionIndex: 2, demoSlug: "fear-of-missing-out-fomo-condition-3" },
  ],
  },
  {
    slug: "high-demand",
    name: "High Demand",
    category: "urgency",
    summary: "The High Demand pattern is a manipulative psychological tactic formally categorized under \"Social Proof'' and \"Urgency.'' It functions by artificially injecting notifications or metrics that claim a large number of other users are concurrently viewing, purchasing, or booking the same item .",
    iconName: "trending-up",
    built: true,
    conditions: [
        { title: "Metric Fabrication", description: "To identify the decoupling of interface claims from reality, we define $U_{\\mathrm{true}}(i, t)$ as the actual count of unique users interacting with item $i$ in the backend and $U_{\\mathrm{displayed}}(i, t)$ as the value rendered on the frontend. Utilizing a pseudo-random function $R(a, b)$, the feature triggers if the system generates a high-arousal number that bears no mathematical relation to factual data. This creates a false sense of social proof by ensuring the displayed count is significantly higher than the true count:", formula: "U_{\\mathrm{displayed}}(i, t) == R(a, b)", given: "\\quad U_{\\mathrm{displayed}}(i, t) \\gg U_{\\mathrm{true}}(i, t)" },
        { title: "Strategic Temporal Injection", description: "Deceptive interfaces often weaponize the timing of demand signals to maximize panic . We define $S_{\\mathrm{browse}}$ as a low-stakes exploration state and $S_{\\mathrm{checkout}}$ as the high-stakes evaluation of financial commitment. The feature triggers if the system systematically suppresses demand notifications during early exploration but injects them into the Document Object Model (DOM) precisely as the user enters the critical path toward purchase. This timing is designed to disrupt the user's final deliberative phase:", formula: "N_{\\mathrm{demand}} \\notin \\mathrm{DOM}(S_{\\mathrm{browse}}) \\quad \\land \\quad N_{\\mathrm{demand}} \\in \\mathrm{DOM}(S_{\\mathrm{checkout}})" },
        { title: "Scarcity Coupling", description: "The most effective iteration of this pattern involves the mathematical pairing of demand and inventory to simulate imminent loss . We define $I_{\\mathrm{available}}$ as the displayed inventory and $\\lambda_{\\mathrm{purchase}}$ as the implied rate of consumption derived from the high demand metric. By calculating $t_{\\mathrm{stockout}}$, the projected time until inventory reaches zero, the algorithm detects manufactured urgency. The feature triggers if the interface pairs inflated demand with an artificially low stock threshold, forcing the perceived urgency toward infinity as the projected stock-out time approaches zero:", formula: "t_{\\mathrm{stockout}} = \\frac{I_{\\mathrm{available}}}{\\lambda_{\\mathrm{purchase}}} \\quad \\land \\quad t_{\\mathrm{stockout}} \\to 0 \\implies \\mathrm{Urgency_{perceived}} \\to \\infty" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "high-demand-condition-1" },
    { conditionIndex: 1, demoSlug: "high-demand-condition-2" },
    { conditionIndex: 2, demoSlug: "high-demand-condition-3" },
  ],
  },
  {
    slug: "low-stock",
    name: "Low Stock",
    category: "urgency",
    summary: "The Low Stock pattern is a psychological manipulation tactic formally categorized under \"Scarcity'' and \"Urgency.'' It weaponizes the economic principle of supply and demand by artificially presenting an item as being on the verge of selling out (e.g., \"Only 2 left at this price!'').",
    iconName: "package-x",
    built: true,
    conditions: [
        { title: "Inventory Fabrication", description: "To identify the decoupling of interface claims from inventory reality, we define $I_{\\mathrm{true}}(x)$ as the actual quantity of item $x$ in the backend database and $I_{\\mathrm{displayed}}(x)$ as the value rendered on the frontend. We establish $\\tau_{\\mathrm{scarcity}}$ as the psychological threshold for panic (typically $I \\le 5$). The feature triggers if the system algorithmically generates a low number strictly to manufacture urgency, regardless of the true stock depth:", formula: "I_{\\mathrm{displayed}}(x) \\le \\tau_{\\mathrm{scarcity}}", given: "\\quad I_{\\mathrm{displayed}}(x) \\ll I_{\\mathrm{true}}(x)" },
        { title: "Perpetual Scarcity", description: "A fundamental indicator of deceptive scarcity is the \"static\" nature of the stock level despite purported high demand . We define $I_{\\mathrm{displayed}}(t_i)$ as the stock level at time $t_i$ and $E_{\\mathrm{purchase}}$ as transaction events by the wider user base. The feature triggers if the inventory remains static as purchases increase, or if it algorithmically resets to the exact same \"low\" threshold upon a new session ($S_{\\mathrm{refresh}}$), proving the constraint is a static script rather than a dynamic reflection of supply:", formula: "\\frac{d}{dt} I_{\\mathrm{displayed}}(t) == 0 \\quad \\text{as} \\quad E_{\\mathrm{purchase}} \\to \\infty \\quad \\lor \\quad I_{\\mathrm{displayed}}(t_{i+1} \\mid S_{\\mathrm{refresh}}) == I_{\\mathrm{displayed}}(t_i)" },
        { title: "Selective Scope Narrowing", description: "Deceptive interfaces often manipulate perception by anchoring urgency warnings to arbitrarily small subsets of inventory . We define $I_{\\mathrm{total}}$ as the aggregate available inventory and $I_{\\mathrm{subset}}$ as a specific variant or promotional rate. The feature triggers if the system deliberately obfuscates high overall availability by visually anchoring the warning exclusively to the artificially constrained subset. This manipulates the user's perception of overall scarcity, forcing the perceived urgency toward infinity:", formula: "I_{\\mathrm{subset}} \\ll I_{\\mathrm{total}} \\quad \\land \\quad N_{\\mathrm{warning}} \\propto (I_{\\mathrm{subset}})^{-1} \\quad \\implies \\quad \\mathrm{Urgency_{perceived}} \\to \\infty" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "low-stock-condition-1" },
    { conditionIndex: 1, demoSlug: "low-stock-condition-2" },
    { conditionIndex: 2, demoSlug: "low-stock-condition-3" },
  ],
  },
  {
    slug: "activity-messages",
    name: "Activity Messages",
    category: "urgency",
    summary: "Activity Messages is a behavioral manipulation pattern formally categorized under \"Social Proof'' and \"Urgency.'' It functions by continuously injecting asynchronous notifications into the user's viewport, detailing the purported recent actions of other users—such as \"Sarah from New York just purchased this item'' .",
    iconName: "bell",
    built: true,
    conditions: [
        { title: "Asynchronous Event Fabrication", description: "To identify the manufacture of synthetic social proof, we define $E_{\\mathrm{real}}(t)$ as the set of genuine transactions in the database and $M_{\\mathrm{displayed}}(t)$ as the activity message rendered on the client interface. The feature triggers if the system algorithmically generates activity pop-ups that have no structural mapping to the backend event log. This indicates that the \"social activity\" presented to the user is a narrative fabrication intended to mimic high demand:", formula: "M_{\\mathrm{displayed}}(t) \\neq \\emptyset \\quad \\land \\quad M_{\\mathrm{displayed}}(t) \\notin E_{\\mathrm{real}}(t)" },
        { title: "Temporal Compression", description: "A fundamental indicator of deceptive urgency is the \"re-aging\" of historical data . We define $t_{\\mathrm{actual}}(e_i)$ as the true timestamp of a historical transaction and $t_{\\mathrm{rendered}}(e_i)$ as the timestamp displayed to the user (e.g., \"3 minutes ago''). The feature triggers if the interface mines old transactions but applies a pseudo-random temporal deduction $\\Delta t_{\\mathrm{offset}}$ to make them appear concurrent. This manufactures a false sense of immediate, high-velocity demand:", formula: "t_{\\mathrm{rendered}}(e_i) == t_{\\mathrm{current}} - \\Delta t_{\\mathrm{offset}}", given: "\\quad (t_{\\mathrm{current}} - t_{\\mathrm{actual}}(e_i)) \\gg \\Delta t_{\\mathrm{offset}}" },
        { title: "Cognitive Interruption", description: "The hostility of activity messages is often defined by their power to disrupt deliberative thinking . We define $S_{\\mathrm{focus}}$ as the user's cognitive state while evaluating product specifications and $N_{\\mathrm{activity}}$ as the dynamically injected notification node. By measuring the visual $\\mathrm{Salience}(N)$ and the injection frequency $\\lambda_{\\mathrm{interrupt}}$, the algorithm detects predatory interruption. The feature triggers if the system continuously injects high-salience elements at a rate that exceeds the user's cognitive load threshold $\\tau_{\\mathrm{cognitive\\_load}}$, effectively disrupting rational processing to trigger impulsive, herd-following behavior:", formula: "\\mathrm{Salience}(N_{\\mathrm{activity}}) \\to \\mathrm{Max} \\quad \\land \\quad \\lambda_{\\mathrm{interrupt}} > \\tau_{\\mathrm{cognitive\\_load}} \\implies S_{\\mathrm{focus}} \\to \\mathrm{Disrupted}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "activity-messages-condition-1" },
    { conditionIndex: 1, demoSlug: "activity-messages-condition-2" },
    { conditionIndex: 2, demoSlug: "activity-messages-condition-3" },
  ],
  },
  {
    slug: "countdown-timer",
    name: "Countdown Timer",
    category: "urgency",
    summary: "The Countdown Timer is a psychological manipulation tactic formally categorized under \"Urgency'' and \"Deception.'' It visualizes a strict temporal constraint—usually a rapidly ticking clock—imploring the user to complete a transaction before a promised discount or cart reservation expires .",
    iconName: "timer",
    built: true,
    conditions: [
        { title: "Stateless Expiration", description: "To identify the manufacture of synthetic urgency, we define $t_{\\mathrm{load}}$ as the timestamp of the client session initialization and $\\Delta t_{\\mathrm{countdown}}$ as a hardcoded frontend duration. The feature triggers if the expiration time $T_{\\mathrm{expire}}$ is functionally tethered to the individual's page load rather than a server-validated deadline. This ensures the urgency is simulated and infinitely repeatable upon a DOM refresh, proving the \"deadline\" is an interface illusion:", formula: "T_{\\mathrm{expire}} == t_{\\mathrm{load}} + \\Delta t_{\\mathrm{countdown}} \\quad \\implies \\quad \\text{Urgency is functionally synthetic}" },
        { title: "Consequence Invalidation", description: "A fundamental indicator of a deceptive timer is the absence of state mutation upon expiration . We define $S_{\\mathrm{offer}}(t)$ as the financial state of the item and $E_{\\mathrm{zero}}$ as the timestamp when the timer reaches zero. The feature triggers if the expiration of the timer fails to alter the backend state or price of the offer. This reveals the temporal constraint was a pure fabrication with no structural enforcement:", formula: "t > E_{\\mathrm{zero}} \\quad \\implies \\quad S_{\\mathrm{offer}}(t) == S_{\\mathrm{offer}}(t \\le E_{\\mathrm{zero}})" },
        { title: "Cognitive Compression", description: "The efficacy of a countdown timer relies on narrowing the window for rational thought . We define $\\Delta t_{\\mathrm{timer}}$ as the duration of the countdown and $\\tau_{\\mathrm{deliberation}}$ as the baseline threshold required for a human to process terms and evaluate alternatives. The feature triggers if the system deliberately configures the window to be shorter than the deliberation requirement, algorithmically enforcing an impulsive, under-informed transaction by driving the probability of rational evaluation toward zero:", formula: "\\Delta t_{\\mathrm{timer}} < \\tau_{\\mathrm{deliberation}} \\quad \\implies \\quad \\mathrm{Probability}(\\mathrm{Rational\\_Evaluation}) \\to 0" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "countdown-timer-condition-1" },
    { conditionIndex: 1, demoSlug: "countdown-timer-condition-2" },
    { conditionIndex: 2, demoSlug: "countdown-timer-condition-3" },
  ],
  },
  {
    slug: "limited-time-message",
    name: "Limited Time Message",
    category: "urgency",
    summary: "The Limited Time Message is a linguistic manipulation tactic formally categorized under \"Urgency'' and \"Deception.'' Unlike a strict Countdown Timer that relies on a specific numerical deadline, this pattern employs vague, high-arousal semantics (e.g., \"Sale Ends Soon!'' or \"Today Only!'') to manufacture an artificial sense of scarcity .",
    iconName: "hourglass",
    built: true,
    conditions: [
        { title: "Ambiguous Temporal Bounding", description: "To identify the manufacture of anxiety through uncertainty, we define $M_{\\mathrm{urgency}}$ as the promotional text node and $T_{\\mathrm{end}}$ as the factual backend expiration. We utilize a Natural Language Processing (NLP) function $\\mathrm{Specificity}(M)$ to evaluate the presence of concrete temporal data. The feature triggers if the interface algorithmically maximizes the emotional arousal of the message while driving factual specificity to zero, deliberately preventing the user from performing rational schedule planning or comparison:", formula: "\\mathrm{Specificity}(M_{\\mathrm{urgency}}) \\approx 0 \\quad \\land \\quad T_{\\mathrm{end}} \\notin \\mathrm{DOM} \\implies \\mathrm{Urgency_{perceived}} \\to \\mathrm{Max}" },
        { title: "Perpetual Extension", description: "A fundamental indicator of deceptive urgency is the \"moving goalpost\" of the promotion . We define $T_{\\mathrm{end}}(i)$ as the implied deadline during cycle $i$. The feature triggers if the backend system algorithmically shifts the expiration threshold forward ($T_{\\mathrm{end}}(i+1)$) the moment the real-time system clock $t_{\\mathrm{current}}$ approaches the deadline. This renders the \"limited'' constraint infinite and proves the temporal pressure is a manufactured interface layer:", formula: "t_{\\mathrm{current}} \\ge T_{\\mathrm{end}}(i) \\implies T_{\\mathrm{end}}(i+1) == t_{\\mathrm{current}} + \\Delta t_{\\mathrm{extension}}" },
        { title: "Price Invariance", description: "The efficacy of this pattern relies on the user's belief in fleeting value . We define $P_{\\mathrm{promo}}(t)$ as the financial cost during the advertised window and $P_{\\mathrm{baseline}}$ as the historical median price (e.g., over the preceding 90 days). The feature triggers if the interface asserts a state of exceptional value while the promotional price remains indistinguishable from the historical cost, proving that the urgency is synthetic and based on deceptive anchoring:", formula: "P_{\\mathrm{promo}}(t \\in \\mathrm{Limited\\_Window}) == P_{\\mathrm{baseline}} \\quad \\implies \\quad \\text{Deceptive Anchoring}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "limited-time-message-condition-1" },
    { conditionIndex: 1, demoSlug: "limited-time-message-condition-2" },
    { conditionIndex: 2, demoSlug: "limited-time-message-condition-3" },
  ],
  },
  // ── Misdirection ──,
  {
    slug: "price-comparison-prevention",
    name: "Price Comparison Prevention",
    category: "misdirection",
    summary: "The Price Comparison Prevention pattern, often implemented as part of a broader \"Creating Barriers'' strategy, deliberately obscures the true cost of a product or service to prevent the user from making informed, cross-platform or cross-product evaluations.",
    iconName: "scale",
    built: true,
    conditions: [
        { title: "Fiat Decoupling", description: "To detect the artificial severing of a price from its real-world value, we define $T_{\\mathrm{price}}(n)$ as the extracted textual value representing the cost within a product node $n$. We then introduce an algorithmic function $F_{\\mathrm{convert}}(x)$ designed to normalize or resolve any given value $x$ into a standardized fiat currency $C_{\\mathrm{fiat}}$ (e.g., \\{\\$, \\pounds, EUR, PLN, USD\\}). The feature triggers if the interface actively presents a cost but mathematically prevents the evaluation of its real-world equivalent. This occurs when the conversion function resolves to a null set within the user's local Document Object Model (DOM), deliberately blocking cross-market comparison:", formula: "T_{\\mathrm{price}}(n) \\neq \\emptyset \\quad \\land \\quad F_{\\mathrm{convert}}(T_{\\mathrm{price}}(n)) == \\emptyset" },
        { title: "Suppression of Normalized Unit Pricing", description: "Retailers frequently exploit bounded rationality by forcing users to perform mental arithmetic to compare bulk or packaged goods . To identify this omission, we denote $P$ as the absolute price of the product and $V$ as the quantified volume, mass, or count (e.g., 850g, 50 pieces). We establish $U_{\\mathrm{norm}}$ as the mathematically expected unit price, defined as the quotient $U_{\\mathrm{norm}} = \\frac{P}{V}$. If the natural language processing (NLP) model detects a quantifiable metric $V$ within the set of semantic text strings $S_{\\mathrm{node}}$ rendered inside the product container, the feature triggers if the normalized unit price $U_{\\mathrm{norm}}$ is structurally omitted. This confirms the interface is forcing the user to calculate the comparative value manually:", formula: "V \\neq \\emptyset \\quad \\land \\quad U_{\\mathrm{norm}} \\notin S_{\\mathrm{node}}" },
        { title: "Intentional Disablement of Text Extraction", description: "A direct method of manufacturing search friction is to break native browser functionalities that facilitate data portability . We define $E_{\\mathrm{select}}$ as the set of DOM events associated with text selection and clipboard interaction, such as selectstart, copy, or contextmenu. The algorithm targets $N_{\\mathrm{product}}$, the specific DOM node containing the product title, model number, or price. The feature triggers if the site actively intercepts and neutralizes these standard events on product nodes to prevent the user from copying the data to a competitor's search engine. This is structurally verified if the event's default behavior is programmatically prevented or if the CSS property explicitly disables user selection:", formula: "\\exists e \\in E_{\\mathrm{select}} : \\text{Event}(e, N_{\\mathrm{product}}).\\texttt{preventDefault()} == \\mathrm{True} \\quad \\lor \\quad \\text{CSS}(N_{\\mathrm{product}}).\\texttt{user-select} == \\mathrm{none}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "price-comparison-prevention-condition-1" },
    { conditionIndex: 1, demoSlug: "price-comparison-prevention-condition-2" },
    { conditionIndex: 2, demoSlug: "price-comparison-prevention-condition-3" },
  ],
  },
  {
    slug: "reference-pricing",
    name: "Reference Pricing",
    category: "misdirection",
    summary: "The Reference Pricing pattern, categorized formally under \"(De)Contextualizing Cues,'' exploits the anchoring cognitive bias to manufacture the illusion of a significant discount .",
    iconName: "tag",
    built: true,
    conditions: [
        { title: "Dual-Pricing Co-occurrence and Anchoring", description: "To mathematically capture this visual anchoring, we identify $N_{\\mathrm{cur}}$ as the primary DOM node displaying the current selling price $P_{\\mathrm{cur}}$, and $N_{\\mathrm{ref}}$ as an adjacent node displaying a secondary, higher reference price $P_{\\mathrm{ref}}$. We define $S_{\\mathrm{strike}}$ as a set of CSS properties indicating a deprecated or \"slashed'' visual state (such as text-decoration: line-through or applied diagonal SVG vectors). The feature triggers if the system detects an anchored price comparison where the reference price is structurally marked as deprecated to artificially emphasize the current price's value:", formula: "P_{\\mathrm{ref}} > P_{\\mathrm{cur}} \\quad \\land \\quad \\mathrm{CSS}(N_{\\mathrm{ref}}) \\cap S_{\\mathrm{strike}} \\neq \\emptyset" },
        { title: "Mathematical Exaggeration of Discount", description: "Deceptive platforms frequently utilize extreme, mathematically improbable discounts to short-circuit rational evaluation and induce urgency . To detect this, we calculate the implied percentage discount $\\Delta_{\\mathrm{pct}}$ derived directly from the reference anchor. Establishing $\\tau_{\\mathrm{unrealistic}}$ as a heuristic threshold for suspicious, exaggerated discounts typical of low-quality e-commerce platforms (e.g., $> 70%$), the feature triggers if the calculated discount strictly exceeds this threshold without contextual justification:", formula: "\\Delta_{\\mathrm{pct}} = \\frac{P_{\\mathrm{ref}} - P_{\\mathrm{cur}}}{P_{\\mathrm{ref}}} \\quad \\implies \\quad \\Delta_{\\mathrm{pct}} > \\tau_{\\mathrm{unrealistic}}" },
        { title: "Obfuscation of Legal Historical Baselines", description: "In regulated markets, platforms attempt to bypass price transparency laws by visually burying the true historical baseline . We extract $P_{\\mathrm{30d}}$ as the numerical value from the legally mandated node displaying the lowest price in the last 30 days. Using $V(N)$ to calculate the computed visual prominence (derived from font size, weight, and contrast) of a given node, the feature triggers if the interface structurally emphasizes the fabricated reference price over the true historical baseline. Furthermore, it triggers if the advertised discount is falsely calculated against the inflated $P_{\\mathrm{ref}}$ while the current price $P_{\\mathrm{cur}}$ is actually equal to or higher than the 30-day historical low $P_{\\mathrm{30d}}$:", formula: "V(N_{\\mathrm{ref}}) \\gg V(N_{\\mathrm{30d}}) \\quad \\lor \\quad (P_{\\mathrm{ref}} > P_{\\mathrm{30d}} \\land P_{\\mathrm{cur}} \\geq P_{\\mathrm{30d}})" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "reference-pricing-condition-1" },
    { conditionIndex: 1, demoSlug: "reference-pricing-condition-2" },
    { conditionIndex: 2, demoSlug: "reference-pricing-condition-3" },
  ],
  },
  {
    slug: "conflicting-information",
    name: "Conflicting Information",
    category: "misdirection",
    summary: "Conflicting Information is a dark pattern formally categorized under \"(De)Contextualizing Cues'' or \"Feedforward Ambiguity'' .",
    iconName: "split",
    built: true,
    conditions: [
        { title: "Mutually Exclusive Factual Claims", description: "To identify explicit structural deception, we define $N_{\\mathrm{container}}$ as a parent DOM node representing a single informational context (e.g., a pricing tier card or a modal window), containing distinct text nodes such as $t_1$ and $t_2$. Using Natural Language Processing, we extract $\\mathrm{Sem}(x)$, which denotes the factual constraints encoded within text $x$. The feature triggers if the logical intersection of the constraints extracted from proximally close nodes evaluates to an unsatisfiable, mutually exclusive state. This mathematically proves the interface is presenting a logical paradox designed to mislead the user:", formula: "\\exists t_1, t_2 \\in N_{\\mathrm{container}} : \\mathrm{Sem}(t_1) \\land \\mathrm{Sem}(t_2) \\implies \\mathrm{Unsatisfiable}" },
        { title: "Semantic-Visual Mismatch", description: "Interfaces frequently weaponize established design heuristics to create deceptive feedforward cues . Targeting an interactive DOM node $B$ (such as a button), the algorithm extracts $\\mathrm{Intent}(L(B))$, the NLP-derived semantic intent of its text label $L$ (e.g., \"Cancel'' mapping to a negative/destructive action). Simultaneously, it calculates $\\mathrm{Affordance}(C(B))$, the psychological affordance of its primary background color $C$ extracted via CSS or YOLO (e.g., Green typically mapping to a positive/confirm action). The feature triggers if the semantic intent of the text diametrically opposes the established visual affordance of the element, deliberately confusing the user's automated psychological responses:", formula: "\\mathrm{Intent}(L(B)) \\cap \\mathrm{Affordance}(C(B)) == \\emptyset \\quad \\implies \\quad \\mathrm{Contradiction}" },
        { title: "Action versus Label Discrepancy", description: "The most aggressive form of conflicting information occurs when the explicit textual promise of a node diverges entirely from its structural navigational reality . We identify $E_{\\mathrm{trigger}}$ as the primary event listener or form action associated with button $B$. The system calculates $S_{\\mathrm{expected}}$, the anticipated future state based purely on the NLP classification of the label (e.g., navigating to the homepage), and compares it against $S_{\\mathrm{actual}}$, the actual resolved state or backend endpoint targeted by the trigger (e.g., initiating a checkout sequence). The feature triggers if these states are not equivalent and their semantic similarity falls below a minimum relevance threshold $\\tau_{\\mathrm{relevance}}$, proving the button is a functional trap:", formula: "S_{\\mathrm{expected}} \\neq S_{\\mathrm{actual}} \\quad \\land \\quad \\mathrm{Sim}(S_{\\mathrm{expected}}, S_{\\mathrm{actual}}) < \\tau_{\\mathrm{relevance}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "conflicting-information-condition-1" },
    { conditionIndex: 1, demoSlug: "conflicting-information-condition-2" },
    { conditionIndex: 2, demoSlug: "conflicting-information-condition-3" },
  ],
  },
  {
    slug: "information-without-context",
    name: "Information Without Context",
    category: "misdirection",
    summary: "Information Without Context is a dark pattern classified under \"(De)Contextualizing Cues.'' It occurs when an interface presents a compelling metric, claim, or data point (such as a discount, a popularity score, or a stock level) but deliberately omits the necessary baseline, unit of measurement, or temporal boundaries required for the user to rationally evaluate its significance.",
    iconName: "info",
    built: true,
    conditions: [
        { title: "Unanchored Quantitative Metrics", description: "To evaluate the intentional omission of scale, we define $N_{\\mathrm{info}}$ as a DOM node containing a prominent numerical value or metric extracted via Natural Language Processing (NLP), denoted as $v$ (e.g., \"Save 50'' or \"Score: 98''). We establish $U_{\\mathrm{val}}$ as the expected unit of measurement (e.g., %, \\$, PLN) and $B_{\\mathrm{val}}$ as the necessary comparative baseline (e.g., \"out of 100'' or \"off the original price''). The feature triggers if the system extracts a high-prominence numerical value $v$ that lacks both a definitive unit and a denominator within its immediate semantic cluster $S_{\\mathrm{cluster}}$. This mathematically proves the interface deliberately obscures the metric's true value:", formula: "v \\in N_{\\mathrm{info}} \\quad \\land \\quad (U_{\\mathrm{val}} \\notin S_{\\mathrm{cluster}} \\lor B_{\\mathrm{val}} \\notin S_{\\mathrm{cluster}})" },
        { title: "Temporal and Spatial Ambiguity of Claims", description: "Interfaces frequently weaponize ambiguous social proof to manufacture artificial scarcity or urgency, exploiting the psychological herd heuristic . We define $C_{\\mathrm{claim}}$ as an NLP-classified social proof or urgency claim (e.g., \"500 people viewed this item''). To be empirically verifiable, this claim requires a temporal window $\\Delta t$ (e.g., \"in the last 24 hours'') and a spatial or geographic boundary $D_{\\mathrm{spatial}}$. The feature triggers if the claim $C_{\\mathrm{claim}}$ is presented to induce action, but the dependency parser evaluates the temporal vector $\\Delta t$ as null. This renders the claim mathematically meaningless and confirms the presence of contextless urgency:", formula: "C_{\\mathrm{claim}} \\neq \\emptyset \\quad \\land \\quad \\Delta t == \\emptyset \\quad \\implies \\quad \\mathrm{Contextless \\: Urgency}" },
        { title: "Structural Orphaned Nodes", description: "Notification badges are often weaponized to exploit the human psychological drive for task completion, driving engagement through unresolved cognitive tension . We identify $N_{\\mathrm{metric}}$ as a node containing an isolated numerical alert (e.g., a badge displaying just the number \"1''). This metric must logically correspond to a descriptor node $N_{\\mathrm{descriptor}}$ that defines its meaning (e.g., \"New Messages''). By computing $d(N_{\\mathrm{metric}}, N_{\\mathrm{descriptor}})$ as the DOM traversal distance or physical rendered distance (using YOLO bounding boxes), the feature triggers if the metric node is structurally orphaned from its descriptor. This occurs when the distance strictly exceeds a threshold $\\tau_{\\mathrm{orphan}}$, dictating the maximum acceptable boundary for cognitive association and forcing the user to interact out of blind curiosity:", formula: "d(N_{\\mathrm{metric}}, N_{\\mathrm{descriptor}}) > \\tau_{\\mathrm{orphan}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "information-without-context-condition-1" },
    { conditionIndex: 1, demoSlug: "information-without-context-condition-2" },
    { conditionIndex: 2, demoSlug: "information-without-context-condition-3" },
  ],
  },
  {
    slug: "false-hierarchy",
    name: "False Hierarchy",
    category: "misdirection",
    summary: "False Hierarchy is a structural and visual dark pattern formally categorized under \"Interface Interference'' and \"Manipulating Visual Choice Architecture.'' Distinct from general visual prominence, this pattern strictly requires a binary relational structure between two opposing actions.",
    iconName: "layers",
    built: true,
    conditions: [
        { title: "Strict Semantic Opposition", description: "To establish this relational dependency, we evaluate two proximally close interactive DOM nodes, $B_{1}$ and $B_{2}$, located within the same container $N_{\\mathrm{parent}}$. By extracting $\\mathrm{Intent}(L(x))$, representing the NLP-derived semantic intent of the text label $L$ for node $x$, the algorithm evaluates their relationship. The feature cannot trigger unless the system first mathematically establishes that the two elements represent mutually exclusive, binary opposing choices:", formula: "\\exists \\mathrm{Intent}(L(B_{1})) \\equiv \\neg \\mathrm{Intent}(L(B_{2}))" },
        { title: "Relational Visual Weight Disparity", description: "We define $B_{\\mathrm{business}}$ as the node representing the provider-favorable action, and $B_{\\mathrm{user}}$ as the opposing user-favorable action. To quantify their visual imbalance, we introduce a composite visual weight function $W(x)$, calculated as a linear combination of the YOLO-extracted bounding box area $A(x)$, CSS background contrast $C(x)$, and font weight $F(x)$: The feature triggers if the visual weight of the business option vastly exceeds its direct semantic opposite. This indicates intentional relational suppression, formalized when the ratio pushes beyond a heuristic threshold $\\tau_{\\mathrm{hierarchy}}$:", formula: "W(x) = \\alpha \\cdot A(x) + \\beta \\cdot C(x) + \\gamma \\cdot F(x)", given: "\\frac{W(B_{\\mathrm{business}})}{W(B_{\\mathrm{user}})} > \\tau_{\\mathrm{hierarchy}}" },
        { title: "Structural Element Downgrading", description: "Beyond aesthetic manipulation, interfaces frequently strip user-favorable actions of their fundamental interaction signifiers and affordances . We define $\\mathrm{Tag}(x)$ to represent the HTML tag type of an element, and $S_{\\mathrm{padding}}(x)$ as its computed clickable surface area padding. The feature triggers if the business action is rendered as a primary interactive component (e.g., a <button>), while its semantic opposite is structurally downgraded to a bare textual link (<a>). This is formalized by verifying the tag mismatch and confirming the padding mathematically approaches zero, effectively camouflaging the user's escape route:", formula: "\\mathrm{Tag}(B_{\\mathrm{business}}) == \\texttt{<button>} \\quad \\land \\quad \\mathrm{Tag}(B_{\\mathrm{user}}) == \\texttt{<a>} \\quad \\land \\quad S_{\\mathrm{padding}}(B_{\\mathrm{user}}) \\approx 0" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "false-hierarchy-condition-1" },
    { conditionIndex: 1, demoSlug: "false-hierarchy-condition-2" },
    { conditionIndex: 2, demoSlug: "false-hierarchy-condition-3" },
  ],
  },
  {
    slug: "visual-prominence",
    name: "Visual Prominence",
    category: "misdirection",
    summary: "Visual Prominence is a fundamental dark pattern formally categorized under \"Manipulating Visual Choice Architecture.'' While False Hierarchy manipulates the relationship between opposing choices, Visual Prominence operates as an absolute metric.",
    iconName: "contrast",
    built: true,
    conditions: [
        { title: "Absolute Bounding Box Dominance", description: "To quantify this absolute dominance, we define $N_{\\mathrm{favorable}}$ as the DOM node representing the business-favorable action. We contrast its scale against $E_{\\mathrm{baseline}}$, which represents the mean bounding box area of standard interactive elements within the current viewport. By calculating $A(x)$ as the computed pixel area of a node's bounding box, the feature triggers if the interactive surface area of the target node mathematically dwarfs the baseline UI environment. This intentional manipulation of human motor interaction minimizes the friction to click the target, formalized when the ratio exceeds a severe size multiplier threshold $\\tau_{\\mathrm{area}}$:", formula: "\\frac{A(N_{\\mathrm{favorable}})}{A(E_{\\mathrm{baseline}})} > \\tau_{\\mathrm{area}}" },
        { title: "Relative Luminance and Contrast Differential", description: "Visual saliency is heavily driven by contrast differentials that hijack pre-attentive processing . We define $L_{\\mathrm{bg}}$ as the relative luminance of the container's background, and $L(x)$ as the relative luminance of any given node $x$. Utilizing the standard WCAG contrast ratio function $\\mathrm{CR}(x, y)$, we evaluate the target action alongside $N_{\\mathrm{neutral}}$, representing any non-opposing secondary elements such as standard disclaimers or alternative navigational links. The feature triggers if the target action possesses a maximum, hyper-salient contrast ratio against the background, while secondary elements are deliberately suppressed to approach the minimum legible threshold (e.g., WCAG's 3.0:1 limit $\\tau_{\\mathrm{wcag\\_min}}$):", formula: "\\mathrm{CR}(N_{\\mathrm{favorable}}, L_{\\mathrm{bg}}) \\gg \\mathrm{CR}(N_{\\mathrm{neutral}}, L_{\\mathrm{bg}}) \\quad \\land \\quad \\mathrm{CR}(N_{\\mathrm{neutral}}, L_{\\mathrm{bg}}) \\approx \\tau_{\\mathrm{wcag\\_min}}" },
        { title: "Typographical Weight and Saturation Vectors", description: "Beyond spatial area and contrast, interfaces utilize typographical density and color purity to monopolize user focus. Extracting $\\mathrm{FontWeight}(x)$ as the computed CSS numerical font weight and $S_{\\mathrm{color}}(x)$ as the calculated HSV saturation value of the node, the feature triggers if the system identifies extreme aesthetic maximization. Regardless of relational pairs, this absolute prominence is flagged when the target node is maximally saturated and heavily bolded:", formula: "S_{\\mathrm{color}}(N_{\\mathrm{favorable}}) \\approx 1.0 \\quad \\land \\quad \\mathrm{FontWeight}(N_{\\mathrm{favorable}}) \\geq 700" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "visual-prominence-condition-1" },
    { conditionIndex: 1, demoSlug: "visual-prominence-condition-2" },
    { conditionIndex: 2, demoSlug: "visual-prominence-condition-3" },
  ],
  },
  {
    slug: "persuasive-language",
    name: "Persuasive Language",
    category: "misdirection",
    summary: "The Persuasive Language pattern manipulates the user's decision-making process by heavily biasing the framing of choices .",
    iconName: "type",
    built: true,
    conditions: [
        { title: "Truth-Conditional Satisfiability", description: "To distinguish this pattern from outright deception, we analyze distinct semantic text nodes, $t_1$ and $t_2$, within the same informational container. By extracting their factual truth conditions, denoted as $\\mathrm{Sem}(x)$, the feature strictly requires that the persuasive claims do not logically contradict one another. They must maintain a mathematically satisfiable state, proving the manipulation relies exclusively on emotional framing rather than factual falsity:", formula: "\\mathrm{Sem}(t_1) \\land \\mathrm{Sem}(t_2) \\implies \\mathrm{Satisfiable}" },
        { title: "Connotative Sentiment Asymmetry", description: "To quantify emotional manipulation (often termed \"confirmshaming\"), we identify two opposing interactive nodes: $B_{\\mathrm{favorable}}$ and $B_{\\mathrm{unfavorable}}$. Using an NLP model (such as RoBERTa) to apply a continuous sentiment scoring function $\\mathrm{Sent}(x)$, we map the semantic payload of each node to a scale of $[-1.0, 1.0]$. The feature triggers if the system detects an unnatural divergence in emotional valence, intentionally penalizing the user's preferred action by pushing the scores beyond established positive ($\\tau_{\\mathrm{pos}}$) and negative ($\\tau_{\\mathrm{neg}}$) thresholds:", formula: "\\mathrm{Sent}(B_{\\mathrm{favorable}}) > \\tau_{\\mathrm{pos}} \\quad \\land \\quad \\mathrm{Sent}(B_{\\mathrm{unfavorable}}) < \\tau_{\\mathrm{neg}}" },
        { title: "Density of Manipulative Lexicon", description: "We examine the set of textual tokens $W_{\\mathrm{prompt}}$ rendered within the decision-making container. By cross-referencing these tokens against $D_{\\mathrm{persuasive}}$, a predefined dictionary of subjective, high-arousal, or emotionally manipulative terms (e.g., \\{\"exclusive'', \"ridiculous'', \"danger'', \"smart choice''\\}), the system calculates the relative density of manipulative language. The feature triggers if this ratio exceeds an established baseline threshold $\\tau_{\\mathrm{density}}$ for neutral interface copy :", formula: "\\frac{|W_{\\mathrm{prompt}} \\cap D_{\\mathrm{persuasive}}|}{|W_{\\mathrm{prompt}}|} > \\tau_{\\mathrm{density}}" },
        { title: "Intentional Syntactic Obfuscation", description: "To catch manipulative \"trick wording,\" we generate an abstract syntax tree $T_{\\mathrm{parse}}(n)$ using a dependency parser for the target text node. By counting the negation modifiers $N_{\\mathrm{neg}}(n)$ applied to the root verb, the feature triggers if the phrasing of a user-favorable action deliberately employs double negatives or convoluted conditional logic. This is formalized when the negation count reaches or exceeds 2, or when the overall syntactic complexity surpasses a heuristic limit $\\tau_{\\mathrm{syntax}}$, effectively inducing cognitive confusion and tricking the user into selecting the opposite of their intent :", formula: "N_{\\mathrm{neg}}(B_{\\mathrm{unfavorable}}) \\ge 2 \\quad \\lor \\quad \\mathrm{Complexity}(T_{\\mathrm{parse}}(B_{\\mathrm{unfavorable}})) > \\tau_{\\mathrm{syntax}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "persuasive-language-condition-1" },
    { conditionIndex: 1, demoSlug: "persuasive-language-condition-2" },
    { conditionIndex: 2, demoSlug: "persuasive-language-condition-3" },
    { conditionIndex: 3, demoSlug: "persuasive-language-condition-4" },
  ],
  },
  {
    slug: "cuteness",
    name: "Cuteness",
    category: "misdirection",
    summary: "The Cuteness dark pattern is a distinct form of emotional and sensory manipulation .",
    iconName: "smile",
    built: true,
    conditions: [
        { title: "Context-Dependent Image Injection", description: "To detect the manipulative deployment of these assets, we model the application flow as a state machine where $s_{\\mathrm{onboard}}$ is the acquisition state and $s_{\\mathrm{cancel}}$ is the termination state. We track $I(s)$, representing the set of graphical assets (e.g., images, SVGs, or animations) rendered in the DOM during state $s$. The feature triggers if specific graphical assets, denoted as $I_{\\mathrm{affective}}$, are deliberately withheld during standard usage but injected exclusively during the termination flow to disrupt the user's momentum:", formula: "I_{\\mathrm{affective}} \\subset I(s_{\\mathrm{cancel}}) \\quad \\land \\quad I_{\\mathrm{affective}} \\notin I(s_{\\mathrm{onboard}})" },
        { title: "Affective Visual Classification", description: "Utilizing a computer vision classifier $\\mathrm{CV}_{\\mathrm{emotion}}(i)$ trained to detect anthropomorphic features and categorize emotional expressions (e.g., \\{\"Happiness'', \"Sadness'', \"Pleading'', \"Neutral''\\}) from an image $i$, the algorithm evaluates the injected assets. The feature triggers if the targeted asset $i \\in I_{\\mathrm{affective}}$ is classified as exhibiting high-arousal negative or pleading emotions intended to elicit pity. This is confirmed when the classification confidence $\\mathrm{Confidence}(i)$ exceeds a predefined heuristic threshold $\\tau_{\\mathrm{cv\\_threshold}}$:", formula: "\\mathrm{CV}_{\\mathrm{emotion}}(i) \\in \\{\\mathrm{Sadness}, \\mathrm{Pleading}\\} \\quad \\land \\quad \\mathrm{Confidence}(i) > \\tau_{\\mathrm{cv\\_threshold}}" },
        { title: "Semantic Pairing of Guilt", description: "Emotional manipulation is most effective when visual and semantic cues are combined . We identify $N_{\\mathrm{text}}$ as the textual node rendered in immediate proximity to the image $i$, structurally verified via YOLO bounding box intersection or DOM tree sibling relationships. Applying an NLP function $\\mathrm{Affect}(x)$ that maps text $x$ to an emotional vector—specifically scoring for guilt-inducing semantics or parasocial distress (e.g., \"You are breaking our heart'', \"Sad to see you go'')—the feature evaluates the combined payload. It triggers if the text reinforces the visual emotional manipulation, creating a compound psychological barrier to the cancellation event. This is mathematically verified when the affective score surpasses a manipulation threshold $\\tau_{\\mathrm{guilt}}$ and the spatial distance $d_{\\mathrm{spatial}}(N_{\\mathrm{text}}, i)$ falls within a strict proximity boundary $\\delta_{\\mathrm{proximity}}$, ensuring the text and image act as a single contextual unit:", formula: "\\mathrm{Affect}(N_{\\mathrm{text}}) > \\tau_{\\mathrm{guilt}} \\quad \\land \\quad d_{\\mathrm{spatial}}(N_{\\mathrm{text}}, i) < \\delta_{\\mathrm{proximity}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "cuteness-condition-1" },
    { conditionIndex: 1, demoSlug: "cuteness-condition-2" },
    { conditionIndex: 2, demoSlug: "cuteness-condition-3" },
  ],
  },
  {
    slug: "positive-or-negative-framing",
    name: "Positive Or Negative Framing",
    category: "misdirection",
    summary: "Positive or Negative Framing is a cognitive dark pattern rooted deeply in Prospect Theory and the framing effect .",
    iconName: "scale",
    built: true,
    conditions: [
        { title: "Identification of Mutually Exclusive Vectors", description: "To mathematically evaluate the decision context, we isolate $M_{\\mathrm{decision}}$, a bounded DOM container (such as a modal or consent form) demanding a user choice. Within this container, we identify two interactive nodes, $B_{\\mathrm{opt\\_in}}$ and $B_{\\mathrm{opt\\_out}}$. By tracking $A(x)$, which denotes the backend state transition or boolean consequence of interacting with a given node $x$, the system first verifies that the nodes represent a strict, binary, mutually exclusive choice:", formula: "A(B_{\\mathrm{opt\\_in}}) \\equiv \\neg A(B_{\\mathrm{opt\\_out}})" },
        { title: "Asymmetric Valence Calculation", description: "To quantify the emotional manipulation applied to these vectors, we utilize a continuous function $V_{\\mathrm{sentiment}}(n)$ derived from an NLP model (e.g., BERT). This function calculates the emotional valence of the text label of node $n$ on a scale from $-1.0$ (highly negative or fearful) to $1.0$ (highly positive or rewarding). The feature triggers if the system detects a severe, engineered discrepancy in the emotional framing of the two options, intentionally skewing the user toward the opt-in by breaching a heuristic asymmetry threshold $\\tau_{\\mathrm{bias}}$:", formula: "V_{\\mathrm{sentiment}}(B_{\\mathrm{opt\\_in}}) - V_{\\mathrm{sentiment}}(B_{\\mathrm{opt\\_out}}) > \\tau_{\\mathrm{bias}}" },
        { title: "Exploitation of Loss Aversion", description: "The most aggressive implementations of this pattern explicitly threaten the user with forfeiture or risk . We analyze $W(n)$, the set of textual tokens associated with the descriptive paragraph surrounding node $n$. We cross-reference these tokens against two predefined NLP lexicons: $L_{\\mathrm{loss}}$, containing risk or penalty terminology (e.g., \\{\"lose'', \"miss out'', \"risk'', \"unsafe'', \"downgrade''\\}), and $L_{\\mathrm{gain}}$, containing reward and safety terminology (e.g., \\{\"secure'', \"protect'', \"save'', \"exclusive''\\}). The feature triggers if the interface structurally binds gain terminology exclusively to the provider-favorable action and loss terminology exclusively to the user-favorable action:", formula: "(W(B_{\\mathrm{opt\\_in}}) \\cap L_{\\mathrm{gain}} \\neq \\emptyset) \\quad \\land \\quad (W(B_{\\mathrm{opt\\_out}}) \\cap L_{\\mathrm{loss}} \\neq \\emptyset)" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "positive-or-negative-framing-condition-1" },
    { conditionIndex: 1, demoSlug: "positive-or-negative-framing-condition-2" },
    { conditionIndex: 2, demoSlug: "positive-or-negative-framing-condition-3" },
  ],
  },
  {
    slug: "choice-overload",
    name: "Choice Overload",
    category: "misdirection",
    summary: "Choice Overload, also known as Overchoice or Decision Fatigue, is a cognitive dark pattern formally categorized under \"Interface Interference'' or \"Adding Steps.'' It deliberately overwhelms the user's cognitive processing capacity by presenting an excessive, uncurated volume of granular options, toggles, or text.",
    iconName: "list",
    built: true,
    conditions: [
        { title: "Excessive Element Quantization", description: "To quantify the cognitive burden of an interface, we define $C_{\\mathrm{choices}} = \\{c_1, c_2, \\dots, c_n\\}$ as the set of distinct, actionable input nodes (e.g., vendor checkboxes or cookie toggles) rendered within a singular decision context $M_{\\mathrm{decision}}$. We establish $\\tau_{\\mathrm{cognitive\\_limit}}$ as the psychological threshold for comfortable human working memory, typically modeled around $7 \\pm 2$ items. The feature triggers if the sheer volume of presented granular choices strictly exceeds a heuristic upper bound $\\tau_{\\mathrm{overload}}$ (e.g., $> 20$ individual toggles), mathematically guaranteeing cognitive overload and the subsequent degradation of informed consent:", formula: "|C_{\\mathrm{choices}}| > \\tau_{\\mathrm{overload}}" },
        { title: "Absence of Global Mutators", description: "The hostility of choice overload is significantly amplified when the interface denies the user a macro-action to resolve the complexity. We define $A_{\\mathrm{interface}}$ as the set of available macro-actions (buttons) and $F_{\\mathrm{bulk\\_reject}}$ as a hypothetical global action that simultaneously sets all non-essential elements in $C_{\\mathrm{choices}}$ to a $\\mathrm{False}$ state. The feature triggers if the interface provides a massive array of choices but intentionally omits a single-click negative mutator, forcing the user to process and interact with each node individually to protect their privacy:", formula: "|C_{\\mathrm{choices}}| > \\tau_{\\mathrm{overload}} \\quad \\land \\quad \\nexists a \\in A_{\\mathrm{interface}} : a(c_i) \\to \\mathrm{False} \\quad \\forall c_i \\in C_{\\mathrm{choices}}" },
        { title: "Linear Scaling of Interaction Cost", description: "A defining characteristic of this pattern is the mathematical asymmetry in effort between provider-favorable and user-favorable outcomes . We define $E_{\\mathrm{user\\_favorable}}$ as the minimum number of discrete interactions (clicks) required to achieve a fully privacy-preserving state, and $E_{\\mathrm{provider\\_favorable}}$ as the effort required for maximum data collection (e.g., clicking \"Accept All''). The feature triggers if the interaction cost for the user-favorable outcome scales linearly with the number of options $\\mathcal{O}(n)$, while the provider-favorable outcome remains a constant $\\mathcal{O}(1)$ effort, creating a structural incentive for the user to surrender:", formula: "E_{\\mathrm{user\\_favorable}} \\propto |C_{\\mathrm{choices}}| \\quad \\land \\quad E_{\\mathrm{provider\\_favorable}} == 1" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "choice-overload-condition-1" },
    { conditionIndex: 1, demoSlug: "choice-overload-condition-2" },
    { conditionIndex: 2, demoSlug: "choice-overload-condition-3" },
  ],
  },
  {
    slug: "plain-evil",
    name: "Plain Evil (Theoretical Construct)",
    category: "misdirection",
    summary: "While not a formally recognized pattern in Thomas Mildner’s (or any established HCI) taxonomy, the colloquial concept of \"Plain Evil'' represents the theoretical absolute limit of hostile choice architecture.",
    iconName: "skull",
    built: true,
    conditions: [
        { title: "Dark Pattern Singularity", description: "To model the cumulative impact of an adversarial interface, we define $\\mathbb{D} = \\{D_1, D_2, \\dots, D_n\\}$ as the set of all structurally defined dark patterns (e.g., Hidden Costs, Sneak into Basket, or Labyrinthine Navigation). We apply a boolean function $\\mathrm{Active}(D_i, M_{\\mathrm{context}})$ to evaluate if a specific pattern $D_i$ is active within the user's current interface context. The feature triggers if the density of simultaneously active dark patterns exceeds a catastrophic hostility threshold $\\tau_{\\mathrm{hostility}}$. This creates an environment where the user cannot initiate a single action without encountering a manipulative vector, effectively saturating the decision-making space:", formula: "\\sum_{i=1}^{n} \\mathrm{Active}(D_i, M_{\\mathrm{context}}) \\ge \\tau_{\\mathrm{hostility}}" },
        { title: "Absolute Agency Deprivation", description: "At the theoretical limit of \"Plain Evil,\" the interface moves beyond manipulation and into the realm of structural coercion . We represent the user's free agency as a continuous function $A_{\\mathrm{user}}(t)$, constrained between 0 (no control) and 1 (total control), and contrast it with $C_{\\mathrm{provider}}(t)$, the system's control over the final transactional outcome. This state is achieved when the interface forces a business-favorable outcome regardless of the user's explicit structural inputs—such as a \"No'' interaction technically executing a \"Yes'' command. In this scenario, user agency drops to an absolute zero vector for the duration of the session:", formula: "A_{\\mathrm{user}}(t) = 0 \\quad \\land \\quad C_{\\mathrm{provider}}(t) = 1 \\quad \\forall t > t_{\\mathrm{onboard}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "plain-evil-condition-1" },
    { conditionIndex: 1, demoSlug: "plain-evil-condition-2" },
  ],
  },
  {
    slug: "endorsement-and-testimonials",
    name: "Endorsement And Testimonials",
    category: "misdirection",
    summary: "Endorsement And Testimonials is a manipulative dark pattern formally categorized under \"Social Proof'' and \"Deception.'' It occurs when an interface artificially engineers trust by presenting fabricated, paid, or algorithmically generated reviews as genuine user feedback .",
    iconName: "star",
    built: true,
    conditions: [
        { title: "Statistical Implausibility", description: "To identify the manipulation of sentiment, we define $R_{\\mathrm{total}}$ as the total set of user reviews and $S(r_i)$ as the star rating (1--5). We contrast the rendered distribution $D_{\\mathrm{rendered}}$ with $D_{\\mathrm{organic}}$, the expected distribution of genuine feedback which naturally exhibits variance. The feature triggers if the interface algorithmically filters the dataset such that the distribution clustering around the maximum score lacks organic variance, suggesting a scrubbed or fabricated environment:", formula: "\\mathrm{Mean}(S(R_{\\mathrm{total}})) \\approx 5.0 \\quad \\land \\quad \\mathrm{Var}(S(R_{\\mathrm{total}})) \\approx 0 \\implies D_{\\mathrm{rendered}} \\neq D_{\\mathrm{organic}}" },
        { title: "Provenance Obfuscation", description: "Fabricated endorsements often rely on repetitive templates and reused assets to scale . We analyze $I_{\\mathrm{avatar}}(P_i)$, the profile image, and $T_{\\mathrm{text}}(r_i)$, the review text. Using a $\\mathrm{Similarity}(x, y)$ function for both computer vision and NLP, the feature triggers if endorsements utilize non-unique stock imagery or templated syntactic structures. This indicates bot-driven generation rather than authentic human experience:", formula: "\\mathrm{Similarity}(I_{\\mathrm{avatar}}(P_i), I_{\\mathrm{stock\\_database}}) \\approx 1 \\quad \\lor \\quad \\mathrm{Similarity}(T_{\\mathrm{text}}(r_i), T_{\\mathrm{text}}(r_j)) > \\tau_{\\mathrm{template}}" },
        { title: "Coordinated Temporal Injection", description: "The most aggressive campaigns are identified by their temporal velocity . We define $\\lambda_{\\mathrm{baseline}}$ as the historical organic review rate and $\\Delta t_{\\mathrm{burst}}$ as an anomalous, compressed window. The feature triggers if the system registers a massive influx of maximum-sentiment reviews within $\\Delta t_{\\mathrm{burst}}$ that violates the historical velocity model. This signifies a purchased endorsement burst designed to artificially inflate a product's reputation within a specific marketing window:", formula: "\\frac{| \\{ r \\in R \\mid t(r) \\in \\Delta t_{\\mathrm{burst}} \\} |}{\\Delta t_{\\mathrm{burst}}} \\gg \\lambda_{\\mathrm{baseline}} \\quad \\land \\quad S(r \\in \\Delta t_{\\mathrm{burst}}) == \\mathrm{Max\\_Score}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "endorsement-and-testimonials-condition-1" },
    { conditionIndex: 1, demoSlug: "endorsement-and-testimonials-condition-2" },
    { conditionIndex: 2, demoSlug: "endorsement-and-testimonials-condition-3" },
  ],
  },
  {
    slug: "confirmshaming",
    name: "Confirmshaming",
    category: "misdirection",
    summary: "Confirmshaming is a manipulative linguistic and psychological dark pattern formally categorized under \"Social Manipulation'' and \"Interface Interference.'' It occurs when the interface copy designed for a dismissal or opt-out action is deliberately formulated to evoke guilt, shame, embarrassment, or feelings of inadequacy in the user .",
    iconName: "frown",
    built: true,
    conditions: [
        { title: "Semantic Asymmetry", description: "To identify the emotional weaponization of UI text, we define $N_{\\mathrm{accept}}$ as the affirmative node and $N_{\\mathrm{decline}}$ as the user's dismissal node. Utilizing an NLP function $S_{\\mathrm{sentiment}}(x)$ to evaluate emotional valence (bounded between $-1$ for highly negative/shameful and $+1$ for positive/affirming), the feature triggers if the interface algorithmically forces a severe polarization between choices. This ensures the functional exit route is assigned a toxic semantic score, creating an artificial emotional barrier to rejection:", formula: "S_{\\mathrm{sentiment}}(N_{\\mathrm{accept}}) > 0 \\quad \\land \\quad S_{\\mathrm{sentiment}}(N_{\\mathrm{decline}}) \\ll 0" },
        { title: "Self-Attribution of Harm", description: "A fundamental deceptive tactic involves forcing the user to endorse a proposition of personal or moral failure . We define $P_{\\mathrm{user}}$ as a universally acknowledged positive trait (e.g., intelligence or fiscal responsibility) and $\\mathrm{Meaning}(N_{\\mathrm{decline}})$ as the semantic proposition the user must \"confirm\" to click. The feature triggers if the dismissal action is syntactically structured such that the click equates to a first-person declaration of irrationality or self-harm, weaponizing the user's self-image against their autonomy:", formula: "\\mathrm{Meaning}(N_{\\mathrm{decline}}) \\implies \\neg P_{\\mathrm{user}}" },
        { title: "Visual Hierarchy Subversion", description: "The efficacy of confirmshaming is often compounded by structural invisibility . We define $\\mathrm{Vis}(N)$ as the visual prominence of a node derived from font size, bounding box area, and contrast ratio. The feature triggers if the interface compounds linguistic manipulation by degrading the visual accessibility of the shaming link. By hyper-illuminating the positive choice while rendering the exit link at the threshold of minimum accessibility ($\\tau_{\\mathrm{minimum\\_accessibility}}$), the interface forces the user into the provider-favorable path:", formula: "\\mathrm{Vis}(N_{\\mathrm{accept}}) \\gg \\mathrm{Vis}(N_{\\mathrm{decline}}) \\quad \\land \\quad \\mathrm{Vis}(N_{\\mathrm{decline}}) \\to \\tau_{\\mathrm{minimum\\_accessibility}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "confirmshaming-condition-1" },
    { conditionIndex: 1, demoSlug: "confirmshaming-condition-2" },
    { conditionIndex: 2, demoSlug: "confirmshaming-condition-3" },
  ],
  },
  {
    slug: "psychological-tricks",
    name: "Psychological Tricks",
    category: "misdirection",
    summary: "Psychological Tricks represent a meta-category of dark patterns formally classified under \"Cognitive Manipulation'' and \"Deception.'' Rather than relying on technical coercion or outright lies, these interfaces weaponize innate human cognitive biases—such as the framing effect, anchoring, and decision fatigue—to steer users toward suboptimal, business-favorable outcomes .",
    iconName: "wand-sparkles",
    built: true,
    conditions: [
        { title: "Asymmetric Dominance", description: "To identify the manipulation of relative perception, we define $O_{\\mathrm{target}}$ as the provider's preferred tier and $O_{\\mathrm{competitor}}$ as a lower-cost alternative. We introduce $O_{\\mathrm{decoy}}$, a third option engineered strictly to alter the choice matrix. The feature triggers if the decoy is designed to be inferior to the target option in every metric while remaining structurally similar in price. This artificially inflates the target's perceived value, mathematically shifting the user's preference probability toward the more expensive, yet seemingly more \"valuable\" option:", formula: "V(O_{\\mathrm{target}}) \\gg V(O_{\\mathrm{decoy}}) \\quad \\land \\quad \\mathrm{Cost}(O_{\\mathrm{target}}) \\approx \\mathrm{Cost}(O_{\\mathrm{decoy}}) \\implies P_{\\mathrm{select}}(O_{\\mathrm{target}}) \\to \\mathrm{Max}" },
        { title: "Reference Point Obfuscation", description: "A fundamental indicator of cognitive contamination is the use of arbitrary anchors to inflate perceived value . We define $P_{\\mathrm{actual}}$ as the intended selling price and $P_{\\mathrm{anchor}}$ as an inflated numerical value (e.g., a fabricated \"MSRP'') positioned with high visual salience. The feature triggers if the interface forces the user to process the inflated anchor first, contaminating their Willingness To Pay ($\\mathrm{WTP}$) threshold. This makes the baseline cost appear as a compelling discount regardless of its actual market value:", formula: "P_{\\mathrm{anchor}} \\gg P_{\\mathrm{actual}} \\quad \\implies \\quad \\mathrm{WTP}(U_{\\mathrm{anchored}}) > \\mathrm{WTP}(U_{\\mathrm{baseline}})" },
        { title: "Cognitive Overload", description: "The hostility of an interface is often measurable by the exhaustion it induces in the user . We define $C_{\\mathrm{matrix}}$ as a sequence of complex configuration choices and $\\tau_{\\mathrm{fatigue}}$ as the psychological threshold for decision fatigue. Let $D_{\\mathrm{favorable}}$ be the pre-selected default state that serves the provider's extraction goals. The feature triggers if the interface inflates the cardinality and complexity of the matrix beyond human cognitive stamina, statistically guaranteeing that the exhausted user will abandon active evaluation and surrender to the hostile default:", formula: "|C_{\\mathrm{matrix}}| \\gg \\tau_{\\mathrm{fatigue}} \\quad \\implies \\quad \\lim_{t \\to \\infty} P_{\\mathrm{select}}(D_{\\mathrm{favorable}}) = 1" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "psychological-tricks-condition-1" },
    { conditionIndex: 1, demoSlug: "psychological-tricks-condition-2" },
    { conditionIndex: 2, demoSlug: "psychological-tricks-condition-3" },
  ],
  },
  // ── Nagging ──,
  {
    slug: "pressured-selling",
    name: "Pressured Selling",
    category: "nagging",
    summary: "Pressured Selling is an aggressive e-commerce dark pattern that interrupts the user's transactional flow, typically right before the final checkout step, to force a rapid decision on an upsell, cross-sell, or premium subscription.",
    iconName: "megaphone",
    built: true,
    conditions: [
        { title: "Transactional Flow Interruption", description: "To formalize this hijacking of user intent, we model the expected linear sequence of user states required to complete a purchase as $S_{\\mathrm{checkout}}$. Within this sequence, $B_{\\mathrm{proceed}}$ acts as the primary action node moving the user to the final payment state $s_{\\mathrm{final}}$. We define $M_{\\mathrm{upsell}}$ as an unexpected modal window or full-screen overlay containing a secondary product offer $I_{\\mathrm{secondary}}$. The feature triggers if interacting with the primary progression node intercepts the standard flow, forcefully injecting the upsell modal into the Document Object Model (DOM). This temporarily disables the checkout process until a secondary decision is made, mathematically verifying the structural interruption:", formula: "\\mathrm{Click}(B_{\\mathrm{proceed}}) \\implies \\mathrm{Visibility}(M_{\\mathrm{upsell}}) == \\mathrm{True} \\quad \\land \\quad s_{\\mathrm{final}} \\notin S_{\\mathrm{current}}" },
        { title: "High-Arousal Lexical Density", description: "To quantify the psychological stress induced by the interface, we extract $W(M)$, representing the set of textual tokens rendered within the newly injected modal $M_{\\mathrm{upsell}}$. This is evaluated against $D_{\\mathrm{pressure}}$, an NLP-defined lexicon of high-arousal, urgency-inducing, or FOMO trigger phrases (e.g., \\{\"Wait!'', \"Don't miss out'', \"Last chance'', \"Offer expires''\\}). The feature triggers if the semantic density of pressure-inducing tokens relative to the total word count exceeds a predefined aggressive marketing threshold $\\tau_{\\mathrm{arousal}}$, proving the copy is actively attempting to manufacture panic: [Image of a high-arousal e-commerce modal featuring a bright red countdown timer and blinking text emphasizing a fleeting, limited-time offer]", formula: "\\frac{|W(M) \\cap D_{\\mathrm{pressure}}|}{|W(M)|} > \\tau_{\\mathrm{arousal}}" },
        { title: "Localized Temporal or Visual Constraints", description: "Scarcity and urgency are frequently enforced using hostile visual stimuli and artificial time limits . We isolate $T_{\\mathrm{offer}}$ as a dynamic temporal node (countdown timer) explicitly bound to the secondary offer $I_{\\mathrm{secondary}}$ inside the modal, with $\\Delta t_{\\mathrm{offer}}$ representing the total duration of the countdown. Simultaneously, we monitor $V_{\\mathrm{animations}}$, the set of CSS properties associated with high-stress visual stimuli (e.g., animation: blink, rapidly changing background colors, or shaking UI elements). The feature triggers if the system detects an extremely short, localized timer designed to induce immediate panic (e.g., under 5 minutes), often coupled with aggressive, attention-hijacking visual animations:", formula: "\\Delta t_{\\mathrm{offer}} < \\tau_{\\mathrm{panic\\_duration}} \\quad \\lor \\quad (\\mathrm{CSS}(M_{\\mathrm{upsell}}) \\cap V_{\\mathrm{animations}} \\neq \\emptyset)" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "pressured-selling-condition-1" },
    { conditionIndex: 1, demoSlug: "pressured-selling-condition-2" },
    { conditionIndex: 2, demoSlug: "pressured-selling-condition-3" },
  ],
  },
  // ── Interface Interference ──,
  {
    slug: "small-or-moving-close-button",
    name: "Small or Moving Close Button",
    category: "interface-interference",
    summary: "The Small or Moving Close Button is a visual and interaction-based dark pattern formally classified under the \"Hard To Close'' taxonomy .",
    iconName: "x",
    built: true,
    conditions: [
        { title: "Microscopic Hitbox", description: "To evaluate the physical accessibility of the dismissal vector, we define $N_{\\mathrm{close}}$ as the DOM node or YOLO-detected bounding box representing the close action. We calculate its interactive surface area in CSS pixels as $A(x) = \\mathrm{width}(x) \\times \\mathrm{height}(x)$, and contrast this with $A(M_{\\mathrm{parent}})$, the total rendered area of the parent modal or advertisement container. The feature triggers if the absolute area of the close button falls below established Web Content Accessibility Guidelines (WCAG) minimums for touch targets (codified as $44 \\times 44$ pixels) , or if its relative size compared to the parent container is geometrically insignificant, falling below a fractional threshold $\\delta_{\\mathrm{micro}}$ (e.g., $0.001$):", formula: "A(N_{\\mathrm{close}}) < \\tau_{\\mathrm{wcag\\_hitbox}} \\quad \\lor \\quad \\frac{A(N_{\\mathrm{close}})}{A(M_{\\mathrm{parent}})} < \\delta_{\\mathrm{micro}}" },
        { title: "Kinetic Evasion", description: "To detect dynamic structural traps that actively evade interaction, we track the 2D centroid coordinates of the close node over time as $\\mathrm{Pos}(N, t) = (x(t), y(t))$, alongside the real-time coordinates of the user's mouse pointer $\\mathrm{Pos}_{\\mathrm{cursor}}(t)$. Using the standard Euclidean distance $d(A, B)$ between these two points, the feature triggers if the interface dynamically mutates the position of the close button in direct response to the cursor's approach. This deliberate evasion is mathematically verified when the button shifts its position significantly ($\\gg 0$) the exact moment the cursor breaches a predefined activation radius $\\tau_{\\mathrm{proximity}}$:", formula: "\\exists \\Delta t > 0 : \\lVert \\mathrm{Pos}(N_{\\mathrm{close}}, t + \\Delta t) - \\mathrm{Pos}(N_{\\mathrm{close}}, t) \\rVert \\gg 0", given: "\\text{given} \\quad d(\\mathrm{Pos}_{\\mathrm{cursor}}(t), \\mathrm{Pos}(N_{\\mathrm{close}}, t)) < \\tau_{\\mathrm{proximity}}" },
        { title: "Visual Camouflage and Delayed Injection", description: "Obscuring the exit path temporally or visually is a direct violation of user autonomy . We compute the contrast ratio $\\mathrm{CR}(N, L_{\\mathrm{bg}})$ between the node $N$ and its immediate background luminance $L_{\\mathrm{bg}}$. Additionally, we track the computed CSS opacity or visibility state at a given time as $\\mathrm{Opacity}(N, t)$, with $t_0$ representing the exact timestamp when the parent modal is fully rendered. The feature triggers if the button is rendered illegible through extremely low contrast (e.g., dropping below the WCAG 3.0:1 minimum), or if its visibility is artificially delayed by a forced waiting period $\\Delta t$ to compel the user to consume the modal's promotional content before escape is permitted:", formula: "\\mathrm{CR}(N_{\\mathrm{close}}, L_{\\mathrm{bg}}) < 3.0 \\quad \\lor \\quad (\\mathrm{Opacity}(N_{\\mathrm{close}}, t_0) \\approx 0 \\land \\mathrm{Opacity}(N_{\\mathrm{close}}, t_0 + \\Delta t) > 0)" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "small-or-moving-close-button-condition-1" },
    { conditionIndex: 1, demoSlug: "small-or-moving-close-button-condition-2" },
    { conditionIndex: 2, demoSlug: "small-or-moving-close-button-condition-3" },
  ],
  },
  {
    slug: "bad-defaults-preselection",
    name: "Bad Defaults / Preselection",
    category: "interface-interference",
    summary: "The Bad Defaults or Preselection pattern exploits user inertia and the psychological status quo bias by initializing interface elements with values that disproportionately benefit the service provider.",
    iconName: "check-square",
    built: true,
    conditions: [
        { title: "Pre-initialized Activation State", description: "To formally define this state manipulation, we monitor the set $C$ of all boolean input nodes within the interface (e.g., <input type=\"checkbox\">, <input type=\"radio\">, or custom toggle <div> elements). Establishing $t_0$ as the timestamp immediately following the DOMContentLoaded event, prior to any user input, we apply a state evaluation function $\\mathrm{State}(c, t)$ to capture the boolean activation status (checked/unchecked) of any node $c \\in C$ at time $t$. The feature triggers if a node is algorithmically initialized to an active state without explicit user initiation, exploiting default acceptance heuristics:", formula: "\\exists c \\in C : \\mathrm{State}(c, t_0) == \\mathrm{True} \\quad \\land \\quad \\mathrm{UserEvents}(c, t_0) == \\emptyset" },
        { title: "Semantic Intent of the Default Action", description: "Because not all defaults are malicious (e.g., defaulting to the cheapest shipping tier is user-favorable), we evaluate $L(c)$, the text label structurally bound to the pre-selected node $c$ (often via the HTML for attribute). Using an NLP classification function $\\mathrm{Intent}(x)$ that maps the text $x$ to a defined consequence domain $D$ (such as $D_{\\mathrm{privacy\\_loss}}$, $D_{\\mathrm{financial\\_cost}}$, or $D_{\\mathrm{marketing\\_opt\\_in}}$), the algorithm contextualizes the danger. The feature triggers if the NLP model determines that the pre-selected node explicitly maps to a provider-favorable domain, actively penalizing the user's privacy or finances by default:", formula: "\\mathrm{Intent}(L(c)) \\in \\{D_{\\mathrm{privacy\\_loss}}, D_{\\mathrm{financial\\_cost}}, D_{\\mathrm{marketing\\_opt\\_in}}\\}" },
        { title: "Visual or Structural Obfuscation", description: "The efficacy of a bad default is maximized when the user is unaware it exists . We identify $N_{\\mathrm{submit}}$ as the primary progression node (e.g., the \"Register'' or \"Checkout'' button). Applying a boolean function $V(c, t_0)$, we evaluate whether the pre-selected node $c$ is actually rendered within the visible viewport at $t_0$, ensuring it is not hidden inside a collapsed accordion or pushed below the fold. Simultaneously, we calculate $d_{\\mathrm{spatial}}(c, N_{\\mathrm{submit}})$, the Euclidean distance between the checkbox and the submit button derived from YOLO bounding boxes. The feature triggers if the pre-selected node is intentionally hidden from immediate visual parsing, maximizing the probability of unnoticed progression because it falls outside the user's peripheral vision threshold $\\tau_{\\mathrm{peripheral\\_vision}}$:", formula: "V(c, t_0) == \\mathrm{False} \\quad \\lor \\quad d_{\\mathrm{spatial}}(c, N_{\\mathrm{submit}}) > \\tau_{\\mathrm{peripheral\\_vision}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "bad-defaults-preselection-condition-1" },
    { conditionIndex: 1, demoSlug: "bad-defaults-preselection-condition-2" },
    { conditionIndex: 2, demoSlug: "bad-defaults-preselection-condition-3" },
  ],
  },
  {
    slug: "trick-questions",
    name: "Trick Questions",
    category: "interface-interference",
    summary: "The Trick Questions pattern operates within the \"Sneaking'' and \"Interface Interference'' domains.",
    iconName: "help-circle",
    built: true,
    conditions: [
        { title: "Syntactic Obfuscation via Multiple Negations", description: "To quantify linguistic deception, we extract the text label $L(c)$ associated with a boolean input node $c$ (e.g., a checkbox) and generate its syntactic dependency tree $T_{\\mathrm{parse}}(L(c))$ using an NLP parser. By isolating $N_{\\mathrm{neg}}(L(c))$—the discrete count of negation modifiers (e.g., \"not'', \"un-'', \"prevent'', \"refuse'') directly acting upon the primary action verbs—the feature triggers if the system detects an unnatural stacking of negations (such as double or triple negatives). This structural convolution is deliberately designed to overwhelm the user's cognitive parsing capacity :", formula: "N_{\\mathrm{neg}}(L(c)) \\geq 2 \\quad \\implies \\quad \\mathrm{Linguistic \\: Obfuscation}" },
        { title: "Shifting Semantic Polarity in Node Arrays", description: "Users rely on established Gestalt principles, assuming that visually grouped elements share consistent interaction paradigms. Analyzing a visually grouped array of sequential checkboxes $C_{\\mathrm{group}} = \\{c_1, c_2, \\dots, c_n\\}$, we apply an NLP-derived boolean function $\\mathrm{Polarity}(c_i)$. Here, $\\mathrm{True}$ indicates an opt-in or additive action, and $\\mathrm{False}$ indicates an opt-out or subtractive action when the box is checked. The feature triggers if the semantic polarity of the affirmative state (`checked`) is not uniform across the contiguous visual group, mathematically proving the interface intentionally breaks the user's assumed pattern to induce errors:", formula: "\\exists c_i, c_{i+1} \\in C_{\\mathrm{group}} : \\mathrm{Polarity}(c_i) \\neq \\mathrm{Polarity}(c_{i+1})" },
        { title: "Affordance-Consequence Mismatch", description: "To capture the manipulation of standard UI heuristics, we define $\\mathrm{State}(c) == \\mathrm{True}$ as the physical affordance of checking a box, which psychologically aligns with acceptance, inclusion, or addition . We then map the actual backend consequence of that action to $\\mathrm{Intent}(L(c))$ using semantic classification. Defining $D_{\\mathrm{deny}}$ as the domain of rejection or exclusion (e.g., \"do not send'' or \"opt-out''), the feature triggers if the positive physical action of checking the box explicitly maps to a negative or exclusionary intent. This reversal of standard UI conventions acts as a trap for users who quickly skim text:", formula: "(\\mathrm{State}(c) == \\mathrm{True}) \\implies (\\mathrm{Intent}(L(c)) \\in D_{\\mathrm{deny}})" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "trick-questions-condition-1" },
    { conditionIndex: 1, demoSlug: "trick-questions-condition-2" },
    { conditionIndex: 2, demoSlug: "trick-questions-condition-3" },
  ],
  },
  {
    slug: "wrong-language",
    name: "Wrong Language",
    category: "interface-interference",
    summary: "The Wrong Language pattern is an obfuscation technique formally categorized under \"Interface Interference'' and \"Hiding Information.'' It occurs when an interface abruptly and intentionally switches the language of critical text nodes---such as Terms and Conditions, privacy opt-out forms, or cancellation flows---to a language different from the user's established session language.",
    iconName: "languages",
    built: true,
    conditions: [
        { title: "Localized Linguistic Discrepancy", description: "To identify this structural obfuscation, we define $L_{\\mathrm{session}}$ as the primary language of the user's browsing session, typically determined by the <html lang=\"...\"> attribute. We monitor $N_{\\mathrm{critical}}$ as a specific DOM node containing high-stakes interactive elements or legal disclosures. Utilizing an NLP function $\\mathrm{Lang}(x)$ to predict the dominant language of the text within a node, the feature triggers if the detected language of the critical node explicitly deviates from the established session language. This is verified when the language identification confidence $\\mathrm{Confidence}(\\mathrm{Lang}(N_{\\mathrm{critical}}))$ exceeds a reliability threshold $\\tau_{\\mathrm{lang\\_id}}$:", formula: "\\mathrm{Lang}(N_{\\mathrm{critical}}) \\neq L_{\\mathrm{session}} \\quad \\land \\quad \\mathrm{Confidence}(\\mathrm{Lang}(N_{\\mathrm{critical}})) > \\tau_{\\mathrm{lang\\_id}}" },
        { title: "Asymmetric State Application", description: "The most deceptive implementation of this pattern involves maintaining linguistic clarity during user acquisition while introducing barriers during termination . We define $S_{\\mathrm{acquisition}}$ as states beneficial to the provider (e.g., checkout) and $S_{\\mathrm{termination}}$ as states beneficial to the user (e.g., account deletion). By evaluating $\\mathbb{L}(s)$ as the set of languages rendered during a given state, the feature triggers if the application maintains consistency during acquisition but introduces a foreign language strictly during termination or opt-out flows, proving the discrepancy is non-stochastic and intentional:", formula: "\\mathbb{L}(S_{\\mathrm{acquisition}}) == \\{L_{\\mathrm{session}}\\} \\quad \\land \\quad \\mathbb{L}(S_{\\mathrm{termination}}) \\setminus \\{L_{\\mathrm{session}}\\} \\neq \\emptyset" },
        { title: "Suppression of Localization Controls", description: "The hostility of the linguistic barrier is finalized when the user is denied the tools to rectify the state. We identify $B_{\\mathrm{locale}}$ as the interface control, such as a dropdown menu, that allows the user to change the application's language. Using a boolean function $\\mathrm{Visibility}(x, s)$ to evaluate element accessibility, the feature triggers if the system dynamically removes or disables these controls at the exact moment the wrong language is injected. This traps the user in a state of forced incomprehension during the critical decision phase:", formula: "\\mathrm{Visibility}(B_{\\mathrm{locale}}, S_{\\mathrm{acquisition}}) == \\mathrm{True} \\quad \\land \\quad \\mathrm{Visibility}(B_{\\mathrm{locale}}, S_{\\mathrm{termination}}) == \\mathrm{False}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "wrong-language-condition-1" },
    { conditionIndex: 1, demoSlug: "wrong-language-condition-2" },
    { conditionIndex: 2, demoSlug: "wrong-language-condition-3" },
  ],
  },
  {
    slug: "complex-language",
    name: "Complex Language",
    category: "interface-interference",
    summary: "The Complex Language pattern—also referred to as Legalese, Jargon, or Bafflement—is a linguistic dark pattern formally categorized under \"Hiding Information'' and \"Interface Interference.'' It deliberately utilizes overly technical, legalistic, or convoluted vocabulary and extremely long sentence structures to obscure the true meaning of a disclosure, privacy policy, or set of terms.",
    iconName: "pilcrow",
    built: true,
    conditions: [
        { title: "Exceedance of Baseline Readability Indices", description: "To quantify the mismatch between user literacy and interface complexity, we identify $N_{\\mathrm{text}}$ as a DOM node containing a disclosure or policy paragraph. We compute $\\mathrm{FKGL}(N_{\\mathrm{text}})$, the Flesch-Kincaid Grade Level, which estimates the years of education required to parse the text based on average sentence length and syllables per word. We contrast this against $\\tau_{\\mathrm{education\\_limit}}$, a heuristic threshold representing the general public's reading level (typically an 8th to 10th-grade level). The feature triggers if the computed grade level of consumer-facing disclosures severely exceeds this threshold, indicating the text requires advanced collegiate or legal education to comprehend:", formula: "\\mathrm{FKGL}(N_{\\mathrm{text}}) > \\tau_{\\mathrm{education\\_limit}}" },
        { title: "Density of Domain-Specific Jargon", description: "The use of \"bafflement\" relies on high concentrations of obscure terminology to prevent the formation of an accurate mental model of the agreement . We define $W(N_{\\mathrm{text}}) = \\{w_1, w_2, \\dots, w_k\\}$ as the set of tokenized words in the text node and $D_{\\mathrm{legalese}}$ as a predefined NLP dictionary containing obscure legal or technical jargon (e.g., \\{\"indemnify'', \"heretofore'', \"force majeure'', \"arbitration''\\}). The feature triggers if the ratio of jargon tokens to standard vocabulary tokens exceeds a predefined obfuscation threshold $\\tau_{\\mathrm{jargon}}$, mathematically proving the text is not written in plain language:", formula: "\\frac{|W(N_{\\mathrm{text}}) \\cap D_{\\mathrm{legalese}}|}{|W(N_{\\mathrm{text}})|} > \\tau_{\\mathrm{jargon}}" },
        { title: "Syntactic Bloat and Clause Chaining", description: "Beyond individual word choice, the structural arrangement of clauses can be weaponized to prevent quick skimming . We identify $S_i$ as an individual sentence within $N_{\\mathrm{text}}$ and generate its abstract syntax tree $T_{\\mathrm{parse}}(S_i)$ via a dependency parser. By measuring $\\mathrm{Depth}(T)$—the maximum hierarchical depth of the syntax tree—and $\\mathrm{Len}(S_i)$—the absolute word count—the algorithm detects \"run-on\" structures with excessive nesting. The feature triggers if the text relies on these structures to bury the primary subject and verb under layers of conditional clauses, exceeding the word count ($\\tau_{\\mathrm{word\\_count}}$) and nesting ($\\tau_{\\mathrm{nesting}}$) thresholds:", formula: "\\mathrm{Mean}(\\mathrm{Len}(S_i)) > \\tau_{\\mathrm{word\\_count}} \\quad \\land \\quad \\max_{S_i \\in N_{\\mathrm{text}}} \\mathrm{Depth}(T_{\\mathrm{parse}}(S_i)) > \\tau_{\\mathrm{nesting}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "complex-language-condition-1" },
    { conditionIndex: 1, demoSlug: "complex-language-condition-2" },
    { conditionIndex: 2, demoSlug: "complex-language-condition-3" },
  ],
  },
  {
    slug: "feedforward-ambiguity",
    name: "Feedforward Ambiguity",
    category: "interface-interference",
    summary: "Feedforward Ambiguity is an interaction-based dark pattern formally categorized under \"(De)Contextualizing Cues'' and \"Interface Interference.'' While feedback informs a user about what has happened, feedforward informs the user about what will happen before they initiate an action .",
    iconName: "circle-help",
    built: true,
    conditions: [
        { title: "Semantic Divergence of Action and Outcome", description: "To identify deceptive labeling, we define $L(n)$ as the text label of an interactive DOM node (e.g., \"Next'' or \"I Agree''). We map the user's expected outcome to a semantic vector space, $\\mathrm{Intent}_{\\mathrm{NLP}}(L(n))$, and contrast it with $\\mathrm{Outcome}_{\\mathrm{System}}(n)$, the actual backend execution or state transition triggered by the interaction (e.g., SubmitPayment() or OptInAll()). The feature triggers if the semantic similarity between the predicted linguistic intent and the actual programmatic outcome falls below a clarity threshold $\\tau_{\\mathrm{clarity}}$. This is particularly critical if the outcome resides in a high-stakes domain $D_{\\mathrm{critical}}$, such as finance or data privacy:", formula: "\\mathrm{Sim}(\\mathrm{Intent}_{\\mathrm{NLP}}(L(n)), \\mathrm{Outcome}_{\\mathrm{System}}(n)) < \\tau_{\\mathrm{clarity}} \\quad \\land \\quad \\mathrm{Outcome}_{\\mathrm{System}}(n) \\in D_{\\mathrm{critical}}" },
        { title: "Iconographic Entropy and Missing Affordances", description: "Visual polysemy is frequently weaponized by removing textual anchors from interactive icons . We define $N_{\\mathrm{icon}}$ as a graphical interactive node that lacks adjacent visible text and accessibility attributes. Using an icon-classification model, we derive $\\mathrm{CV}_{\\mathrm{class}}(N_{\\mathrm{icon}})$, representing the probability distribution of possible semantic meanings. We calculate the Shannon entropy $H(\\mathrm{CV}_{\\mathrm{class}})$ of these predictions, where high entropy indicates the icon is contextually ambiguous. The feature triggers if the interface relies on a highly ambiguous icon for a critical action without providing a clarifying tooltip $T_{\\mathrm{hover}}$ or accessible label:", formula: "H(\\mathrm{CV}_{\\mathrm{class}}(N_{\\mathrm{icon}})) > \\tau_{\\mathrm{entropy}} \\quad \\land \\quad T_{\\mathrm{hover}} == \\emptyset" },
        { title: "State Transition Magnitude vs. Cue Prominence", description: "A fundamental deceptive tactic involves mismatching the severity of an action with the prominence of its warning . We represent the magnitude of a state change as $\\Delta S = \\lVert S_{t+1} - S_t \\rVert$ (e.g., spending currency or committing data). We then evaluate $V(M_{\\mathrm{feedforward}})$, the calculated visual prominence (based on contrast and size) of the supplementary informational nodes $M_{\\mathrm{feedforward}}$ structurally bound to the trigger. The feature triggers if the magnitude of the consequence is severe, but the visual prominence of the feedforward information warning the user of that consequence is negligible or artificially suppressed:", formula: "\\Delta S > \\tau_{\\mathrm{impact\\_severe}} \\quad \\land \\quad V(M_{\\mathrm{feedforward}}) < \\tau_{\\mathrm{prominence\\_min}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "feedforward-ambiguity-condition-1" },
    { conditionIndex: 1, demoSlug: "feedforward-ambiguity-condition-2" },
    { conditionIndex: 2, demoSlug: "feedforward-ambiguity-condition-3" },
  ],
  },
  // ── Forced Action ──,
  {
    slug: "forced-registration",
    name: "Forced Registration",
    category: "forced-action",
    summary: "Forced Registration is a structural dark pattern formally categorized under \"Forced Action'' and is closely linked to aggressive data harvesting strategies.",
    iconName: "user-plus",
    built: true,
    conditions: [
        { title: "Absolute State Blocking", description: "To identify the coercive nature of the interface flow, we define $S_{\\mathrm{intent}}$ as the initial user state (e.g., viewing a cart) and $S_{\\mathrm{terminal}}$ as the desired completion state (e.g., order confirmed). We contrast these with $S_{\\mathrm{auth}}$, a state requiring explicit user registration and authentication. The feature triggers if the system algorithmically blocks all direct transition paths from intent to completion, routing every possible interaction graph through the authentication node. This ensures that the user cannot reach their objective without first yielding to the registration requirement:", formula: "\\forall \\pi \\in \\mathrm{Paths}(S_{\\mathrm{intent}} \\to S_{\\mathrm{terminal}}) : S_{\\mathrm{auth}} \\in \\pi" },
        { title: "Structural Omission of Anonymous Pathways", description: "The efficacy of forced registration relies on the elimination of frictionless alternatives . We identify $B_{\\mathrm{register}}$ as the primary node forcing account creation and $B_{\\mathrm{guest}}$ as an alternative, stateless progression node (e.g., \"Checkout as Guest''). The feature triggers if the interface entirely omits the stateless alternative from $\\mathrm{DOM}(S_{\\mathrm{intent}})$, or structurally downgrades it to the point of being functionally hidden. This forces the user into a binary choice between account creation or task abandonment:", formula: "B_{\\mathrm{guest}} \\notin \\mathrm{DOM}(S_{\\mathrm{intent}}) \\quad \\lor \\quad \\mathrm{Visibility}(B_{\\mathrm{guest}}) == \\mathrm{False}" },
        { title: "Disproportionate Data Collection", description: "A fundamental deceptive tactic involves inflating the data \"toll\" required for passage . We define $D_{\\mathrm{essential}}$ as the set of data fields strictly necessary to fulfill the user's intent (e.g., shipping address) and $D_{\\mathrm{demanded}}$ as the set of fields made mandatory by the interface. Let $F_{\\mathrm{persistent}}$ represent relational fields intended for long-term tracking, such as passwords or marketing opt-ins. The feature triggers if the required data payload strictly supersedes essential transactional requirements, forcing the user to provide persistent identifiers as a condition for completing a one-time task:", formula: "D_{\\mathrm{essential}} \\subset D_{\\mathrm{demanded}} \\quad \\land \\quad (D_{\\mathrm{demanded}} \\cap F_{\\mathrm{persistent}} \\neq \\emptyset)" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "forced-registration-condition-1" },
    { conditionIndex: 1, demoSlug: "forced-registration-condition-2" },
    { conditionIndex: 2, demoSlug: "forced-registration-condition-3" },
  ],
  },
  {
    slug: "social-pyramid",
    name: "Social Pyramid",
    category: "forced-action",
    summary: "The Social Pyramid pattern is an aggressive growth-hacking technique formally categorized under \"Social Manipulation'' and \"Forced Action.'' It functionally mimics a digital multi-level marketing (MLM) scheme by gating core application features, essential progress, or promised rewards behind mandatory user recruitment .",
    iconName: "users",
    built: true,
    conditions: [
        { title: "Referral-Gated Progression", description: "To identify the coercive gating of features, we define $U_{\\mathrm{core}}$ as a locked core utility of the platform. We track $R_{\\mathrm{user}}$ as the set of new, unique accounts successfully registered via the user's specific referral link, and $k$ as the hardcoded recruitment threshold. The feature triggers if the system algorithmically blocks access to the utility until the cardinality of the referral set meets or exceeds the threshold. This holding of utility hostage forces the user to choose between losing access or spamming their social graph:", formula: "\\mathrm{Access}(U_{\\mathrm{core}}) == \\mathrm{Blocked}", given: "\\quad |R_{\\mathrm{user}}| < k" },
        { title: "Exponential Threshold Scaling", description: "Predictive modeling of social pyramids relies on identifying non-linear progression costs . We define $L_i$ as the $i$-th reward tier and $T(L_i)$ as the cumulative number of required referrals to unlock it. The feature triggers if the interaction cost—measured in required human recruits—scales exponentially rather than linearly. This ensures that higher tiers become mathematically improbable for the average user to reach, necessitating a \"spam-loop\" behavior to achieve perceived rewards:", formula: "T(L_{i+1}) \\approx c \\cdot T(L_i) \\quad \\text{where} \\quad c > 1" },
        { title: "Asymmetric Value Exchange", description: "A fundamental indicator of the pyramid structure is the discrepancy between user reward and platform gain . We define $V_{\\mathrm{reward}}$ as the objective utility value of the unlocked feature to the user and $V_{\\mathrm{LTV}}(r)$ as the projected Lifetime Value of a recruited user $r$ to the provider. The feature triggers if the system structurally enforces a trade where the cumulative value extracted from the user's network fundamentally dwarfs the micro-reward distributed back to the user, confirming an exploitative economic model:", formula: "V_{\\mathrm{reward}} \\ll \\sum_{r \\in R_{\\mathrm{user}}} V_{\\mathrm{LTV}}(r)" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "social-pyramid-condition-1" },
    { conditionIndex: 1, demoSlug: "social-pyramid-condition-2" },
    { conditionIndex: 2, demoSlug: "social-pyramid-condition-3" },
  ],
  },
  {
    slug: "granting-and-interaction",
    name: "Granting and Interaction",
    category: "forced-action",
    summary: "The Granting and Interaction pattern is a structural dark pattern formally categorized under \"Forced Action'' and \"Interface Interference,'' primarily found in mobile applications and consent management platforms.",
    iconName: "mouse-pointer-click",
    built: true,
    conditions: [
        { title: "Interaction Gating", description: "To identify the coercive fusion of utility and data access, we define $I_{\\mathrm{core}}$ as the primary set of interactions required to utilize the application's core functionality. We monitor $P_{\\mathrm{requested}}$, a system-level permission or data-access grant, and apply a function $\\mathrm{Dep}(I, P)$ to evaluate if the interaction technically requires that permission to execute. The feature triggers if the interface algorithmically blocks all access to core interactions until the permission is explicitly granted, despite the mathematical absence of a functional dependency:", formula: "\\mathrm{State}(I_{\\mathrm{core}}) == \\mathrm{Blocked}", given: "\\quad (P_{\\mathrm{requested}} == \\mathrm{False} \\quad \\land \\quad \\mathrm{Dep}(I_{\\mathrm{core}}, P_{\\mathrm{requested}}) == \\emptyset)" },
        { title: "Asynchronous Overlay Misdirection", description: "A particularly aggressive tactic involves intercepting user momentum to manufacture \"accidental\" consent . We define $B_{\\mathrm{benign}}$ as a high-engagement, visually prominent node and $M_{\\mathrm{system\\_prompt}}$ as the native operating system modal. By measuring the spatial coordinates $(x, y)$ of the touch event at timestamp $t_{\\mathrm{interaction}}$, the algorithm detects misdirection. The feature triggers if the application intentionally injects the system prompt into the exact spatial coordinates of the benign node milliseconds before the interaction, converting the user's original intent into an involuntary permission grant:", formula: "\\mathrm{Pos}(M_{\\mathrm{system\\_prompt}}, t) \\approx \\mathrm{Pos}(B_{\\mathrm{benign}}, t) \\quad \\text{as} \\quad t \\to t_{\\mathrm{interaction}}" },
        { title: "Punitive Friction on Rejection", description: "Hostile interfaces often retaliate against users who exercise their right to deny access . We define $E_{\\mathrm{deny}}$ as the user's explicit action of denying a grant and $\\mathrm{Cost}(I_{\\mathrm{subsequent}})$ as the interaction cost required to perform subsequent tasks. The feature triggers if the system punishes the denial by algorithmically injecting \"nagging\" nodes ($N_{\\mathrm{nag}}$) into every subsequent core interaction loop. This perpetually inflates the cost of using the application compared to the baseline, effectively wearing down user resistance through attrition:", formula: "E_{\\mathrm{deny}} == \\mathrm{True} \\implies N_{\\mathrm{nag}} \\in \\mathrm{Path}(I_{\\mathrm{subsequent}}) \\quad \\land \\quad \\mathrm{Cost}(I_{\\mathrm{subsequent}}) \\gg \\mathrm{Cost}(I_{\\mathrm{baseline}})" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "granting-and-interaction-condition-1" },
    { conditionIndex: 1, demoSlug: "granting-and-interaction-condition-2" },
    { conditionIndex: 2, demoSlug: "granting-and-interaction-condition-3" },
  ],
  },
  {
    slug: "pay-to-play",
    name: "Pay-To-Play",
    category: "forced-action",
    summary: "The Pay-To-Play pattern—often overlapping with Pay-To-Win—is an aggressive monetization strategy primarily found in freemium games, dating applications, and SaaS platforms, categorized under \"Forced Action'' and \"Hidden Costs.'' It lures users in with a seemingly free experience, only to artificially inflate the difficulty, inject massive temporal delays (grinding), or hard-block core progression once the user is psychologically invested .",
    iconName: "dollar-sign",
    built: true,
    conditions: [
        { title: "Exponential Friction and Paid Bypass", description: "To identify the manufacture of artificial inconvenience, we define $E_{\\mathrm{free}}(L_i)$ as the required effort—measured in time or repetitive tasks—to progress through stage $L_i$ without spending currency. We contrast this with $E_{\\mathrm{paid}}(L_i)$, the effort required following a fiat transaction $T_{\\mathrm{usd}}$. The feature triggers if the system algorithmically scales the free effort exponentially to induce frustration ($c^i$), while the paid bypass instantly reduces friction to a trivial constant, effectively monetizing the user's time as a captive resource:", formula: "E_{\\mathrm{free}}(L_i) \\propto c^i \\quad (c > 1) \\quad \\land \\quad E_{\\mathrm{paid}}(L_i) == \\mathcal{O}(1)" },
        { title: "Absolute Progression Gating", description: "A fundamental deceptive tactic involves the \"Paywall\" where free accumulation is mathematically capped below the requirement for advancement . We define $\\mathrm{Req}_{\\mathrm{resource}}$ as the amount of in-app currency required to unlock $S_{\\mathrm{progress}}$ and $\\mathrm{Max}_{\\mathrm{free\\_yield}}$ as the absolute maximum theoretical yield achievable through standard usage. The feature triggers if the application ensures that the required threshold strictly exceeds the maximum free yield, forcing a transaction to continue utilizing the core software functionality:", formula: "\\mathrm{Req}_{\\mathrm{resource}} > \\mathrm{Max}_{\\mathrm{free\\_yield}} \\implies S_{\\mathrm{progress}} == \\mathrm{Blocked} \\quad \\text{until} \\quad T_{\\mathrm{usd}} > 0" },
        { title: "Competitive Statistical Asymmetry", description: "In competitive environments, this pattern erodes fairness by allowing fiat currency to supersede user skill . We define $V_{\\mathrm{stats}}(U)$ as the cumulative statistical power (e.g., algorithmic visibility or matchmaking strength) of a user. Comparing user $U_A$ (free) and $U_B$ (premium), the algorithm calculates $P_{\\mathrm{success}}(U_A, U_B)$, the probability of $U_A$ achieving a favorable outcome. The feature triggers if the system allows un-capped statistical advantages to be purchased, driving the free user's probability of success toward zero regardless of time or skill invested:", formula: "V_{\\mathrm{stats}}(U_B) \\gg V_{\\mathrm{stats}}(U_A) \\quad \\implies \\quad \\lim_{\\mathrm{Spend}(U_B) \\to \\infty} P_{\\mathrm{success}}(U_A, U_B) = 0" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "pay-to-play-condition-1" },
    { conditionIndex: 1, demoSlug: "pay-to-play-condition-2" },
    { conditionIndex: 2, demoSlug: "pay-to-play-condition-3" },
  ],
  },
  {
    slug: "grinding",
    name: "Grinding",
    category: "forced-action",
    summary: "Grinding is a temporal and interactive dark pattern, heavily prevalent in gaming and gamified applications, formally categorized under \"Playing with Time'' and \"Engagement Traps.'' It forces the user to perform highly repetitive, low-skill, and monotonous tasks to achieve necessary progression, unlock core content, or maintain competitive parity .",
    iconName: "timer",
    built: true,
    conditions: [
        { title: "Exponential Effort Scaling", description: "To identify the manufacture of artificial tedium, we define $E(L_i \\to L_{i+1})$ as the interaction effort—measured in hours or repetitive tasks—required to transition between progression states. We contrast this with $V(L_{i+1})$, the objective utility or narrative value gained by reaching the new state. The feature triggers if the application algorithmically enforces an exponential or severe polynomial scaling of required effort, while the corresponding value of the reward scales only linearly or sub-linearly. This creates a mathematical \"wall\" designed to exhaust the user's patience:", formula: "E(L_i \\to L_{i+1}) \\propto c^i \\quad (c > 1) \\quad \\land \\quad V(L_{i+1}) \\approx V(L_i) + k" },
        { title: "Monotonous Loop Forcing", description: "The \"Grind\" is characterized by a lack of interactive variety intended to minimize cognitive engagement . We define $A_{\\mathrm{available}}$ as the total set of mechanics available and $A_{\\mathrm{grind}}$ as the limited subset of actions that yield the specific resource required for progression. Let $N_{\\mathrm{executions}}$ be the necessary repetitions of these actions. The feature triggers if the user is forced into a highly restrictive interaction loop, repeating an identical, non-variable action set an excessive number of times, mathematically eliminating gameplay variety in favor of repetitive labor:", formula: "|A_{\\mathrm{grind}}| \\le \\tau_{\\mathrm{variety}} \\quad \\land \\quad N_{\\mathrm{executions}} \\gg \\tau_{\\mathrm{tedium}}" },
        { title: "Diminishing Yields over Time", description: "To maximize retention metrics and prevent rapid progression, interfaces often penalize sustained effort . We define $\\mathrm{Yield}(t)$ as the amount of progression resources earned per unit of interaction at time $t$. The system monitors $\\tau_{\\mathrm{session}}$, a provider-defined \"optimal\" session length. The feature triggers if the system silently penalizes sustained effort by degrading the reward output the longer the user interacts in a single sitting. This forces the user to abandon the session and return on subsequent days to artificially inflate retention and Daily Active User (DAU) metrics:", formula: "\\frac{d}{dt} \\mathrm{Yield}(t) < 0", given: "\\quad t > \\tau_{\\mathrm{session}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "grinding-condition-1" },
    { conditionIndex: 1, demoSlug: "grinding-condition-2" },
    { conditionIndex: 2, demoSlug: "grinding-condition-3" },
  ],
  },
  {
    slug: "playing-by-appointment",
    name: "Playing By Appointment",
    category: "forced-action",
    summary: "The Playing By Appointment pattern is a behavioral manipulation tactic formally categorized under \"Playing with Time'' and \"Engagement Traps.'' Prevalent in freemium games, habit-tracking apps, and gamified educational platforms, this pattern dictates exactly when a user must interact with the system, effectively hijacking their real-world schedule .",
    iconName: "clock",
    built: true,
    conditions: [
        { title: "Temporal Gating", description: "To identify the removal of user-paced progression, we define $A_{\\mathrm{core}}$ as a primary interaction and $C_{\\mathrm{energy}}(t)$ as the user's available stamina or action currency. We establish $\\tau_{\\mathrm{refill}}$ as the hardcoded real-world time delay required to regenerate one unit of currency. The feature triggers if the system algorithmically blocks the core action due to resource depletion, forcing the user to wait for a specific real-world appointment time to resume interaction, regardless of in-app skill or effort:", formula: "\\mathrm{State}(A_{\\mathrm{core}}) == \\mathrm{Blocked} \\quad \\text{until} \\quad t \\ge t_{\\mathrm{depletion}} + \\tau_{\\mathrm{refill}}" },
        { title: "Punitive State Decay", description: "A fundamental deceptive tactic involves using loss aversion to force return visits . We define $S_{\\mathrm{asset}}$ as a valuable digital asset or cumulative streak and $V(S_{\\mathrm{asset}}, t)$ as its objective value at time $t$. By monitoring the timestamp of the user's last session, $t_{\\mathrm{last\\_interaction}}$, the algorithm detects punitive decay. The feature triggers if the system degrades the asset's value or resets a streak to zero if the user fails to interact before a strictly enforced real-world deadline $\\tau_{\\mathrm{deadline}}$:", formula: "t - t_{\\mathrm{last\\_interaction}} > \\tau_{\\mathrm{deadline}} \\implies V(S_{\\mathrm{asset}}, t) \\to 0" },
        { title: "Narrow Reward Windows", description: "The manufacture of FOMO relies on creating artificial scarcity in time . We define $R_{\\mathrm{premium}}$ as a highly desirable system reward claimable only during a server-defined window $W_{\\mathrm{active}} = [t_{\\mathrm{start}}, t_{\\mathrm{end}}]$. The feature triggers if the duration of this window $\\Delta t$ is intentionally engineered to be extremely narrow relative to a standard day. This forces the user to prioritize the application over real-world obligations to successfully claim the reward:", formula: "\\Delta t \\ll 24\\mathrm{h} \\quad \\land \\quad \\mathrm{Claim}(R_{\\mathrm{premium}}, t) == \\mathrm{False} \\quad \\forall t \\notin W_{\\mathrm{active}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "playing-by-appointment-condition-1" },
    { conditionIndex: 1, demoSlug: "playing-by-appointment-condition-2" },
    { conditionIndex: 2, demoSlug: "playing-by-appointment-condition-3" },
  ],
  },
  {
    slug: "watch-ads-to-unlock-features",
    name: "Watch Ads To Unlock Features Or Get Rewards",
    category: "forced-action",
    summary: "The \"Watch Ads To Unlock Features Or Get Rewards'' pattern—commonly referred to as Rewarded Video or Ad-Gating—is a monetization and attention-extraction strategy formally categorized under \"Forced Action'' and \"Playing with Time.'' It presents the user with a pseudo-choice: pay for a necessary resource, feature, or progression step with fiat currency, or pay with their attention by consuming an unskippable third-party advertisement .",
    iconName: "play",
    built: true,
    conditions: [
        { title: "Attention as Transactional Currency", description: "To identify the commodification of user time, we define $R_{\\mathrm{target}}$ as the desired reward or locked feature and $V_{\\mathrm{ad}}$ as a video advertisement with a strictly defined duration $\\Delta t_{\\mathrm{ad}}$. We monitor $E_{\\mathrm{playback}}(t)$, a boolean function evaluating whether the video is actively playing and fully visible. The feature triggers if the application algorithmically demands the uninterrupted completion of the ad to generate a transactional token, treating verified attention time as the sole accepted currency for the unlock:", formula: "\\int_{0}^{\\Delta t_{\\mathrm{ad}}} E_{\\mathrm{playback}}(t) \\, dt == \\Delta t_{\\mathrm{ad}} \\implies \\mathrm{State}(R_{\\mathrm{target}}) \\to \\mathrm{Unlocked}" },
        { title: "Artificial Resource Starvation", description: "A fundamental deceptive tactic involves the systematic throttling of non-ad-based progression to make the \"choice'' illusory . We define $\\mathrm{Yield}_{\\mathrm{standard}}$ as the value earned through active interaction and $\\mathrm{Yield}_{\\mathrm{ad}}$ as the instantaneous value injected by the ad-gate. Let $C_{\\mathrm{required}}$ be the minimum resource cost for core interactions. The feature triggers if the system throttles standard yields so severely that reaching the required threshold without ads becomes mathematically improbable, effectively eliminating genuine user autonomy:", formula: "\\mathrm{Yield}_{\\mathrm{standard}} \\ll \\mathrm{Yield}_{\\mathrm{ad}} \\quad \\land \\quad \\mathrm{Yield}_{\\mathrm{standard}} \\ll C_{\\mathrm{required}}" },
        { title: "Critical Path Interception", description: "The most intrusive iteration of this pattern involves placing the ad-gate on the primary functional path . We define $\\pi_{\\mathrm{core}} = \\{s_1, s_2, \\dots, s_n\\}$ as the critical path of states required for fundamental utility (e.g., saving a file or proceeding to the next level). The feature triggers if the interface algorithmically injects the ad-gate state ($s_{\\mathrm{ad\\_gate}}$) directly into this operational path, rendering core functions structurally dependent on ad completion rather than treating the advertisement as an auxiliary or external bonus:", formula: "s_{\\mathrm{ad\\_gate}} \\in \\pi_{\\mathrm{core}} \\quad \\land \\quad \\mathrm{Path}(s_i \\to s_n) == \\emptyset \\quad \\text{without} \\quad V_{\\mathrm{ad}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "watch-ads-to-unlock-features-condition-1" },
    { conditionIndex: 1, demoSlug: "watch-ads-to-unlock-features-condition-2" },
    { conditionIndex: 2, demoSlug: "watch-ads-to-unlock-features-condition-3" },
  ],
  },
  {
    slug: "pay-to-avoid",
    name: "Pay To Avoid",
    category: "forced-action",
    summary: "The Pay To Avoid pattern is a coercive monetization strategy formally categorized under \"Forced Action'' and \"Interface Interference.'' Instead of charging users for novel, premium features or enhanced utility, the system artificially degrades the baseline user experience—injecting excessive advertisements, capping download speeds, applying non-removable watermarks, or imposing severe usage limits .",
    iconName: "shield",
    built: true,
    conditions: [
        { title: "Artificial State Degradation", description: "To identify the intentional suppression of software utility, we define $U_{\\mathrm{system}}$ as the objective, unthrottled performance capability of the software and $U_{\\mathrm{default}}$ as the baseline utility provided to the free user. We monitor $D_{\\mathrm{artificial}}$ as the set of deliberately injected friction elements, such as watermarks or speed throttling. The feature triggers if the application algorithmically suppresses the user's experience far below its technical capacity by intentionally injecting these degradation vectors into the default state:", formula: "U_{\\mathrm{default}} == U_{\\mathrm{system}} - D_{\\mathrm{artificial}} \\quad \\land \\quad U_{\\mathrm{default}} \\ll U_{\\mathrm{system}}" },
        { title: "Restorative Monetization", description: "A defining characteristic of this pattern is the absence of novel utility following a transaction . We define $T_{\\mathrm{premium}}$ as the financial transaction and $F_{\\mathrm{new}}$ as the set of genuinely novel functionalities added post-purchase. The feature triggers if the sole mechanical consequence of the transaction is the removal of the artificial friction $D_{\\mathrm{artificial}}$, returning the user to the baseline unthrottled state without expanding the software's actual core capabilities:", formula: "T_{\\mathrm{premium}} > 0 \\implies (D_{\\mathrm{artificial}} \\to \\emptyset \\quad \\land \\quad F_{\\mathrm{new}} == \\emptyset)" },
        { title: "Pain-Point Amplification", description: "The system frequently weaponizes the user's growing frustration to force capitulation . We define $\\lambda_{\\mathrm{friction}}(t)$ as the severity of the injected friction—such as the frequency of unskippable ads or the duration of artificial delays—and $N_{\\mathrm{prompt}}$ as the interface modal demanding payment to \"remove\" the annoyance. The feature triggers if the system dynamically scales the severity of the degradation the longer the user resists paying, ensuring that the probability of a payment prompt $P(N_{\\mathrm{prompt}})$ becomes absolute as friction intensity increases:", formula: "\\frac{d}{dt} \\lambda_{\\mathrm{friction}}(t) > 0 \\quad \\implies \\quad P(N_{\\mathrm{prompt}} \\mid \\lambda_{\\mathrm{friction}}) \\approx 1" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "pay-to-avoid-condition-1" },
    { conditionIndex: 1, demoSlug: "pay-to-avoid-condition-2" },
    { conditionIndex: 2, demoSlug: "pay-to-avoid-condition-3" },
  ],
  },
  {
    slug: "automating-the-user-away",
    name: "Automating The User Away",
    category: "forced-action",
    summary: "The Automating The User Away pattern is a behavioral and structural dark pattern formally categorized under \"Forced Action'' and \"Interface Interference.'' It usurps user agency by autonomously executing high-engagement or high-stakes actions—such as auto-playing the next video, automatically rolling over a queue, or silently executing a transaction—without requiring explicit, contemporary user confirmation .",
    iconName: "fast-forward",
    built: true,
    conditions: [
        { title: "Autonomous Action Execution", description: "To identify the removal of user-led intent, we define $A_{\\mathrm{critical}}$ as a primary, state-altering action (e.g., loading a new media asset or initiating a download). We contrast this with $E_{\\mathrm{user}}$, an explicit affirmative interaction event. The feature triggers if the system systematically executes the critical action entirely independent of user intent, relying solely on an internal temporal or state-based threshold $\\tau_{\\mathrm{system}}$. This formalizes the transition from active tool to autonomous agent:", formula: "A_{\\mathrm{critical}} == \\mathrm{Executed}", given: "\\quad E_{\\mathrm{user}} == \\emptyset \\quad \\land \\quad t \\ge \\tau_{\\mathrm{system}}" },
        { title: "Omission of the Interrupt Vector", description: "The hostility of an automated system is defined by the window of opportunity it grants the user to intervene . We define $\\Delta t_{\\mathrm{warning}}$ as the time between the system signaling intent and actual execution, and $B_{\\mathrm{cancel}}$ as the UI node allowing the user to abort the action. By establishing $\\tau_{\\mathrm{reaction}}$ as the baseline human biological reaction time ($\\approx 2.0$s for UI tasks), the algorithm detects predatory timing. The feature triggers if the interface omits the cancellation affordance or shrinks the warning window below the biological threshold, making manual interception mathematically improbable:", formula: "B_{\\mathrm{cancel}} \\notin \\mathrm{DOM}(t) \\quad \\lor \\quad \\Delta t_{\\mathrm{warning}} < \\tau_{\\mathrm{reaction}}" },
        { title: "Asymmetric Control Reversion", description: "A fundamental indicator of this pattern is the spatial and structural divorce of the control mechanism from the automated event . We define $S_{\\mathrm{auto}}$ as the boolean state of the automated behavior and $\\mathrm{Cost}(S_{\\mathrm{auto}} \\to \\mathrm{False})$ as the interaction cost required to disable it. The feature triggers if the toggle to regain agency is absent from the primary interaction viewport $M_{\\mathrm{primary}}$ and is instead buried deep within a secondary settings matrix, artificially inflating the friction of regaining manual control over the interface:", formula: "\\mathrm{Toggle}(S_{\\mathrm{auto}}) \\notin M_{\\mathrm{primary}} \\quad \\land \\quad \\mathrm{Cost}(S_{\\mathrm{auto}} \\to \\mathrm{False}) \\gg 1" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "automating-the-user-away-condition-1" },
    { conditionIndex: 1, demoSlug: "automating-the-user-away-condition-2" },
    { conditionIndex: 2, demoSlug: "automating-the-user-away-condition-3" },
  ],
  },
  {
    slug: "parasocial-pressure",
    name: "Parasocial Pressure",
    category: "forced-action",
    summary: "The Parasocial Pressure pattern is a behavioral manipulation tactic formally categorized under \"Social Manipulation'' and is closely related to \"Confirmshaming.'' It weaponizes the psychological phenomenon of parasocial interaction—the one-sided emotional attachment a user forms with a content creator, influencer, or anthropomorphized platform mascot .",
    iconName: "heart",
    built: true,
    conditions: [
        { title: "Emotional Asymmetry", description: "To identify the weaponization of artificial guilt, we define $A_{\\mathrm{mascot}}$ as the representation of the parasocial entity and $E_{\\mathrm{user}}$ as the user's intent to disengage or decline an offer. We monitor $V_{\\mathrm{emotion}}(A)$, the expressed emotional valence of the entity (bounded between $-1$ for extreme distress and $+1$ for joy). The feature triggers if the interface algorithmically mutates the entity's emotional state toward a severe negative extreme strictly as a response to the user's refusal, engineering a state of \"Confirmshaming\" through visual distress:", formula: "E_{\\mathrm{user}} == \\mathrm{Refusal} \\implies \\frac{d}{dt} V_{\\mathrm{emotion}}(A_{\\mathrm{mascot}}) \\to -1" },
        { title: "Manufactured Livelihood Dependency", description: "A fundamental deceptive tactic involves framing transactions as acute rescues of a creator's well-being rather than commercial exchanges . We define $T_{\\mathrm{fiat}}$ as the requested transaction and $M_{\\mathrm{pitch}}$ as the justification messaging. Let $I_{\\mathrm{creator}}$ represent the creator’s existential continuity on the platform. The feature triggers if the platform asserts that $T_{\\mathrm{fiat}} == 0$ will lead to the failure of $I_{\\mathrm{creator}}$, directly exploiting the user's empathy to sustain algorithmic or financial engagement:", formula: "T_{\\mathrm{fiat}} == 0 \\implies \\mathrm{State}(I_{\\mathrm{creator}}) \\to \\mathrm{Failure} \\quad \\text{asserted within} \\quad M_{\\mathrm{pitch}}" },
        { title: "Algorithmic Status Gating", description: "In social spaces, this pattern transforms emotional attachment into a competitive bidding war . We define $C_{\\mathrm{community}}$ as the interactive space and $\\mathrm{Vis}(U_i, A_{\\mathrm{creator}})$ as the probability that a user's message is visibly rendered to the creator. The feature triggers if the social architecture ensures that parasocial visibility is strictly a function of $\\mathrm{Spend}(U_i)$. This weaponizes the user's desire for recognition, driving the probability of connection to zero for non-paying users:", formula: "\\mathrm{Vis}(U_i, A_{\\mathrm{creator}}) \\propto \\mathrm{Spend}(U_i) \\quad \\land \\quad \\lim_{\\mathrm{Spend}(U_i) \\to 0} \\mathrm{Vis}(U_i, A_{\\mathrm{creator}}) = 0" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "parasocial-pressure-condition-1" },
    { conditionIndex: 1, demoSlug: "parasocial-pressure-condition-2" },
    { conditionIndex: 2, demoSlug: "parasocial-pressure-condition-3" },
  ],
  },
  {
    slug: "encouraging-anti-social-behavior",
    name: "Encouraging Anti-Social Behavior",
    category: "forced-action",
    summary: "Encouraging Anti-Social Behavior is a behavioral manipulation pattern formally categorized under \"Social Manipulation'' and \"Engagement Traps.'' It occurs when an application explicitly gamifies, incentivizes, or algorithmically rewards users for engaging in actions that are socially harmful, annoying to their peers, or detrimental to social trust .",
    iconName: "message-circle-warning",
    built: true,
    conditions: [
        { title: "Reward-Coupled Social Externality", description: "To identify the subsidization of user success through social extraction, we define $A_{\\mathrm{antisocial}}$ as an action directed at non-consenting third parties (e.g., unsolicited mass-invites) and $V_{\\mathrm{reward}}$ as the in-app value granted to the initiating user. Let $E_{\\mathrm{externality}}$ represent the negative social cost—such as notification fatigue—borne by the target network. The feature triggers if the platform structurally hinges progression on the generation of these negative externalities, mathematically decoupling user benefit from network health:", formula: "A_{\\mathrm{antisocial}} \\implies (V_{\\mathrm{reward}} > 0 \\quad \\land \\quad E_{\\mathrm{externality}} \\gg 0)" },
        { title: "Algorithmic Amplification of Outrage", description: "Deceptive systems often utilize operant conditioning to erode pro-social norms . We define $M_{\\mathrm{content}}$ as user-generated content and $P_{\\mathrm{polarity}}(M)$ as an NLP-derived metric measuring its hostility or capacity to induce outrage. The feature triggers if the system's distribution algorithm assigns higher visibility ($V_{\\mathrm{visibility}}$) to highly polarized content. This creates a systemic incentive for hostility, where social capital is optimized through the abandonment of civil discourse:", formula: "V_{\\mathrm{visibility}}(M) \\propto P_{\\mathrm{polarity}}(M) \\quad \\implies \\quad \\text{Systemic Incentive for Hostility}" },
        { title: "Frictionless Execution of Nuisance", description: "A fundamental indicator of this pattern is the elimination of the natural social friction required to contact large groups of people . We define $N_{\\mathrm{targets}}$ as the cardinality of the user's social graph and $\\mathrm{Cost}(A_{\\mathrm{antisocial}}, N)$ as the interaction effort required to execute a nuisance action. The feature triggers if the interface heavily optimizes mass-nuisance, reducing the action to a single $\\mathcal{O}(1)$ operation. This weaponizes technical efficiency to maximize the spread of un-curated social spam:", formula: "\\mathrm{Cost}(A_{\\mathrm{antisocial}}, N_{\\mathrm{targets}}) == \\mathcal{O}(1) \\quad \\text{as} \\quad N_{\\mathrm{targets}} \\to \\infty" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "encouraging-anti-social-behavior-condition-1" },
    { conditionIndex: 1, demoSlug: "encouraging-anti-social-behavior-condition-2" },
    { conditionIndex: 2, demoSlug: "encouraging-anti-social-behavior-condition-3" },
  ],
  },
  // ── Attention Manipulation ──,
  {
    slug: "addictive-design",
    name: "Addictive Design",
    category: "attention-manipulation",
    summary: "Addictive Design—often intersecting with \"Engagement Traps'' or \"Attention Theft''—refers to a constellation of structural and algorithmic mechanisms designed to maximize a user's time-on-site far beyond their original conscious intent.",
    iconName: "rocket",
    built: true,
    conditions: [
        { title: "Infinite Frictionless Continuation", description: "To model the elimination of physical boundaries, we define $Y_{\\mathrm{scroll}}(t)$ as the user's vertical scroll position and $Y_{\\mathrm{max}}(t)$ as the total renderable height of the document $N_{\\mathrm{document}}$. We establish $\\tau_{\\mathrm{buffer}}$ as a spatial threshold representing the distance to the apparent bottom of the page. The feature triggers if the interface algorithmically prevents the user from reaching a terminal state by executing a background asynchronous event $E_{\\mathrm{append}}$ that fetches and injects new content nodes before the natural stopping point is perceived. This creates a mathematically infinite document where the total height approaches infinity over time:", formula: "Y_{\\mathrm{max}}(t) - Y_{\\mathrm{scroll}}(t) < \\tau_{\\mathrm{buffer}} \\quad \\implies \\quad E_{\\mathrm{append}} = \\mathrm{True}", given: "\\lim_{t \\to \\infty} Y_{\\mathrm{max}}(t) = \\infty" },
        { title: "Variable Ratio Reinforcement", description: "Addictive interfaces often mimic the reward structures of slot machines to induce compulsive checking . We define $R = \\{r_1, r_2, \\dots, r_n\\}$ as a sequence of high-arousal \"reward'' events injected into the user's feed (e.g., highly salient posts or unread notification badges). By measuring the interval $\\Delta t_i$ between consecutive rewards—whether temporal or interaction-based—the algorithm evaluates the unpredictability of the stream. The feature triggers if the variance in these intervals is intentionally high, matching a Skinnerian variable ratio schedule where the mean interval remains below the average human attention span $\\tau_{\\mathrm{attention\\_span}}$:", formula: "\\mathrm{Var}(\\Delta t) > \\tau_{\\mathrm{variable\\_schedule}} \\quad \\land \\quad \\mathrm{Mean}(\\Delta t) < \\tau_{\\mathrm{attention\\_span}}" },
        { title: "Eradication of Natural Stopping Cues", description: "A fundamental deceptive tactic involves the systematic removal of \"stopping rules'' that allow for cognitive closure . We identify $C_{\\mathrm{stop}}$ as the set of traditional structural elements that signal the completion of a consumption phase, such as pagination menus or \"End of Results'' markers. Tracking $T_{\\mathrm{session}}$ as the total elapsed time of the active session, the feature triggers if the interface deliberately omits all elements of $C_{\\mathrm{stop}}$ while the session duration strictly exceeds normal task-oriented boundaries ($\\tau_{\\mathrm{hyper\\_engagement}}$). This actively denies the user an organic moment to disengage:", formula: "C_{\\mathrm{stop}} \\cap \\mathrm{DOM}(t) = \\emptyset \\quad \\forall t \\in T_{\\mathrm{session}} \\quad \\land \\quad T_{\\mathrm{session}} > \\tau_{\\mathrm{hyper\\_engagement}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "addictive-design-condition-1" },
    { conditionIndex: 1, demoSlug: "addictive-design-condition-2" },
    { conditionIndex: 2, demoSlug: "addictive-design-condition-3" },
  ],
  },
  {
    slug: "infinite-scrolling",
    name: "Infinite Scrolling",
    category: "attention-manipulation",
    summary: "Infinite Scrolling is an interaction pattern formally classified under \"Engagement Traps'' and \"Interface Interference.'' While initially designed for seamless mobile consumption, it functions as a dark pattern when it deliberately removes a user's navigational agency and natural stopping cues .",
    iconName: "arrow-down",
    built: true,
    conditions: [
        { title: "Autonomous Content Injection", description: "To identify the removal of explicit user choice, we define $Y_{\\mathrm{viewport}}$ as the bottom vertical coordinate of the user's current screen and $Y_{\\mathrm{document\\_end}}$ as the absolute vertical coordinate of the content container's end. We establish $\\tau_{\\mathrm{trigger}}$ as a predefined spatial threshold (e.g., $800\\mathrm{px}$ before the end of the document). The feature triggers if the interface algorithmically forces the continuation of content via an asynchronous event $E_{\\mathrm{fetch}}$ without requiring an affirmative user action, such as a \"Load More'' button, whenever the viewport crosses the spatial threshold:", formula: "Y_{\\mathrm{document\\_end}} - Y_{\\mathrm{viewport}} \\leq \\tau_{\\mathrm{trigger}} \\quad \\implies \\quad E_{\\mathrm{fetch}}() == \\mathrm{True}" },
        { title: "The Unreachable Footer", description: "A fundamental deceptive tactic involves the literal evasion of utility links . We define $N_{\\mathrm{footer}}$ as the semantic <footer> node and $\\mathrm{Pos}_{y}(N_{\\mathrm{footer}}, t)$ as its absolute vertical Y-coordinate at time $t$. By calculating the distance $d$ between the viewport and the footer relative to the user's scroll velocity $v_{\\mathrm{scroll}}$, the algorithm detects kinetic displacement. The feature triggers if the system continuously mutates the DOM to push the terminal node further down the Y-axis at a rate equal to or faster than the user's scroll velocity, effectively preventing any physical interaction with terminal information:", formula: "v_{\\mathrm{scroll}} > 0 \\quad \\implies \\quad \\frac{d}{dt} \\mathrm{Pos}_{y}(N_{\\mathrm{footer}}, t) \\geq v_{\\mathrm{scroll}}", given: "\\lim_{t \\to \\infty} d(Y_{\\mathrm{viewport}}, \\mathrm{Pos}_{y}(N_{\\mathrm{footer}})) > 0" },
        { title: "Absence of State Anchoring", description: "Infinite feeds often induce navigational fatigue by failing to provide a persistent \"place\" in the content stream . We represent the browser's history state or URL parameters as $S_{\\mathrm{history}}(t)$ and the set of dynamically injected content nodes as $C_{\\mathrm{loaded}}$. The feature triggers if the interface continuously loads massive content arrays without updating the semantic history state to anchor the user's position. This structural failure ensures that if the user navigates away and returns, they lose their place entirely, creating a high-friction environment that discourages users from ever leaving the feed:", formula: "|C_{\\mathrm{loaded}}| \\to \\infty \\quad \\land \\quad \\frac{d}{dt} S_{\\mathrm{history}}(t) == 0" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "infinite-scrolling-condition-1" },
    { conditionIndex: 1, demoSlug: "infinite-scrolling-condition-2" },
    { conditionIndex: 2, demoSlug: "infinite-scrolling-condition-3" },
  ],
  },
  {
    slug: "pull-to-refresh",
    name: "Pull To Refresh (Variable-Reward Trap)",
    category: "attention-manipulation",
    summary: "While originally designed as a utilitarian mobile interaction paradigm, Pull To Refresh functions as a dark pattern—categorized under \"Engagement Traps'' and \"Addictive Design''—when deliberately engineered to mimic the mechanics of a slot machine.",
    iconName: "refresh-cw",
    built: true,
    conditions: [
        { title: "Kinesthetic Resistance and Action Commitment", description: "To model the physical investment required by the interface, we define $\\Delta Y_{\\mathrm{touch}}(t)$ as the continuous downward vertical displacement of the user's touch event at the top of the scroll container. We introduce $R_{\\mathrm{elastic}}(\\Delta Y)$, a programmed friction function that non-linearly slows visual displacement, requiring sustained user effort. The feature mirrors a physical lever mechanism by requiring the user to apply deliberate tension against the simulated physics until the threshold $\\tau_{\\mathrm{commit}}$ is released or \"snapped,'' triggering the refresh event $E_{\\mathrm{refresh}}$. This structural requirement ensures a high level of physical engagement before the reward is revealed:", formula: "\\Delta Y_{\\mathrm{touch}}(t) \\geq \\tau_{\\mathrm{commit}} \\quad \\land \\quad R_{\\mathrm{elastic}} > 0 \\quad \\implies \\quad E_{\\mathrm{refresh}}() == \\mathrm{True}" },
        { title: "Artificial Anticipation Injection", description: "A fundamental deceptive tactic involves the decoupling of animation from technical necessity to build psychological suspense . We define $\\Delta t_{\\mathrm{network}}$ as the actual time required for the backend API to resolve the data payload and $\\Delta t_{\\mathrm{animation}}$ as the hardcoded minimum duration of the visual loading indicator. The feature triggers if the interface artificially delays the content delivery beyond actual network latency. By maintaining the spinning state for a duration exceeding a psychological suspense threshold $\\tau_{\\mathrm{suspense}}$ (typically 1.0 to 2.5 seconds), the system maximizes the user's anticipation before the payload reveal:", formula: "\\Delta t_{\\mathrm{animation}} \\gg \\Delta t_{\\mathrm{network}} \\quad \\land \\quad \\Delta t_{\\mathrm{animation}} \\geq \\tau_{\\mathrm{suspense}}" },
        { title: "Unpredictable Payload Variance", description: "The efficacy of the \"slot machine\" effect depends entirely on the unpredictability of the result . We define $P_{\\mathrm{new}}$ as the set of newly fetched content items and $V(P_{\\mathrm{new}})$ as an engagement-based valuation function determining the personal relevance or arousal of that content (e.g., 0 for no new data, 1 for a high-value notification). The pattern is confirmed if the system maintains a high variance in $V(P_{\\mathrm{new}})$ across sequential refresh events. This mathematical unpredictability ensures the user cannot form a stable expectation and must repeatedly pull to test the probability of a high-value reward:", formula: "\\mathrm{Var}(V(P_{\\mathrm{new}})) > \\tau_{\\mathrm{unpredictability}} \\quad \\forall E_{\\mathrm{refresh}}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "pull-to-refresh-condition-1" },
    { conditionIndex: 1, demoSlug: "pull-to-refresh-condition-2" },
    { conditionIndex: 2, demoSlug: "pull-to-refresh-condition-3" },
  ],
  },
  {
    slug: "countdown-on-ads",
    name: "Countdown On Ads",
    category: "attention-manipulation",
    summary: "The Countdown On Ads pattern—categorized under \"Playing with Time'' and \"Interface Interference''—deliberately hijacks the user's navigational agency by forcing the consumption of advertising content for a mandatory, unskippable duration.",
    iconName: "tv",
    built: true,
    conditions: [
        { title: "Temporal Gating of Navigational Agency", description: "To identify the removal of navigational control, we define $B_{\\mathrm{skip}}$ as the interactive node required to dismiss the advertisement and $t_{\\mathrm{active}}$ as the continuous time elapsed since the ad entered the viewport. We establish $\\tau_{\\mathrm{lock}}$ as the hardcoded mandatory wait time (e.g., 15 seconds). The feature triggers if the system algorithmically disables or intercepts all user interaction intended to dismiss the overlay until the temporal threshold is strictly met, proving the interface is prioritizing ad-exposure over user-intent:", formula: "\\mathrm{State}(B_{\\mathrm{skip}}, t_{\\mathrm{active}}) == \\mathrm{Disabled}", given: "\\quad t_{\\mathrm{active}} < \\tau_{\\mathrm{lock}}" },
        { title: "Dynamic Affordance Injection", description: "A fundamental deceptive tactic involves the total suppression of exit indicators to prevent the user from planning their departure . We define $\\mathrm{DOM}(t)$ as the active render tree at time $t$ and $N_{\\mathrm{close}}$ as the specific semantic node (e.g., an `X` icon) that facilitates the exit. The feature triggers if the system completely omits the exit node from the interface until the exact moment the countdown expires. This forces the user to remain in a state of visual uncertainty until the system-defined threshold is reached:", formula: "N_{\\mathrm{close}} \\notin \\mathrm{DOM}(t) \\quad \\forall t < \\tau_{\\mathrm{lock}} \\quad \\land \\quad N_{\\mathrm{close}} \\in \\mathrm{DOM}(\\tau_{\\mathrm{lock}})" },
        { title: "Sequential Timer Chaining", description: "The most predatory iteration of this pattern involves \"moving the goalpost\" by chaining multiple unskippable events . We define $C_i$ as the $i$-th discrete countdown sequence and $E_{\\mathrm{complete}}(C_i)$ as the event triggered when the timer reaches zero. The feature triggers if the completion of the initially promised countdown does not restore user agency, but instead immediately initializes a new, undisclosed secondary countdown $C_{i+1}$. This ensures that even after the user pays the initial \"time tax,\" their agency remains suspended:", formula: "E_{\\mathrm{complete}}(C_1) \\implies \\mathrm{Init}(C_2) \\quad \\land \\quad \\mathrm{State}(B_{\\mathrm{skip}}, t) == \\mathrm{Disabled}" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "countdown-on-ads-condition-1" },
    { conditionIndex: 1, demoSlug: "countdown-on-ads-condition-2" },
    { conditionIndex: 2, demoSlug: "countdown-on-ads-condition-3" },
  ],
  },
  {
    slug: "auto-play",
    name: "Auto-Play",
    category: "attention-manipulation",
    summary: "Auto-Play is an attention-hijacking dark pattern formally categorized under \"Forced Action'' and \"Interface Interference.'' It occurs when a system autonomously initiates the playback of continuous media—such as video advertisements, algorithmic feeds, or the next episode in a queue—without requiring an explicit, affirmative interaction from the user .",
    iconName: "play",
    built: true,
    conditions: [
        { title: "Autonomous Media Execution", description: "To identify the removal of user-led intent, we define $M_{\\mathrm{media}}$ as a continuous audiovisual asset and $S_{\\mathrm{play}}(M)$ as its active playback state. We contrast this with $E_{\\mathrm{intent}}$, a discrete user action specifically targeting the play affordance. The feature triggers if the application algorithmically forces the playback state to active solely based on the spatial rendering $\\mathrm{Intersection}(M_{\\mathrm{media}}, \\mathrm{Viewport})$ exceeding a visibility threshold $\\tau_{\\mathrm{visible}}$. This ensures media consumption begins as a side effect of navigation rather than a result of intent:", formula: "S_{\\mathrm{play}}(M_{\\mathrm{media}}) == \\mathrm{True}", given: "\\quad E_{\\mathrm{intent}} == \\emptyset \\quad \\land \\quad \\mathrm{Intersection}(M_{\\mathrm{media}}, \\mathrm{Viewport}) > \\tau_{\\mathrm{visible}}" },
        { title: "Sequential Auto-Advance", description: "A fundamental deceptive tactic involves \"chaining\" media consumption to bypass the user's natural stopping cues . We define $Q = \\{M_1, M_2, \\dots, M_n\\}$ as an algorithmic queue and $t_{\\mathrm{end}}(M_i)$ as the timestamp of an asset's terminal frame. Following a brief countdown window $\\Delta t_{\\mathrm{countdown}}$, the feature triggers if the completion of one asset acts as the autonomous trigger for the next. This creates an indefinite loop of consumption that persists until the user physically interrupts the sequence:", formula: "t \\ge t_{\\mathrm{end}}(M_i) + \\Delta t_{\\mathrm{countdown}} \\implies S_{\\mathrm{play}}(M_{i+1}) == \\mathrm{True}", given: "\\quad E_{\\mathrm{intent}}(M_{i+1}) == \\emptyset" },
        { title: "Affordance Suppression", description: "The hostility of an auto-play system is exacerbated by inflating the friction required to regain control . We identify $B_{\\mathrm{cancel}}$ as the interactive UI node required to abort the auto-advance or pause the media. By evaluating the visual prominence $\\mathrm{Visibility}(x)$ and the interaction effort $\\mathrm{Cost}(S_{\\mathrm{play}} \\to \\mathrm{False})$, the algorithm detects suppression. The feature triggers if the system deliberately minimizes, hides, or delays the rendering of the cancellation node, artificially increasing the cognitive and motor effort required to stop the automation:", formula: "\\mathrm{Visibility}(B_{\\mathrm{cancel}}) \\to 0 \\quad \\lor \\quad \\mathrm{Cost}(S_{\\mathrm{play}} \\to \\mathrm{False}) \\gg 1" }
    ],
  conditionDemos: [
    { conditionIndex: 0, demoSlug: "auto-play-condition-1" },
    { conditionIndex: 1, demoSlug: "auto-play-condition-2" },
    { conditionIndex: 2, demoSlug: "auto-play-condition-3" },
  ],
  }
];

export const PATTERNS_BY_SLUG: Record<string, Pattern> = PATTERNS.reduce(
  (acc, p) => {
    acc[p.slug] = p;
    return acc;
  },
  {} as Record<string, Pattern>
);

/** Look up a category by its id; falls back to a stub so the page never throws. */
export function getCategory(id: string): Category {
  return (
    CATEGORIES.find((c) => c.id === id) ?? {
      id: id as CategoryId,
      name: id,
      description: "",
    }
  );
}

/** All patterns in a category, in the order they were declared. */
export function patternsInCategory(id: string): Pattern[] {
  return PATTERNS.filter((p) => p.category === id);
}
