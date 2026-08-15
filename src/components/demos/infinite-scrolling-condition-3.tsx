"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/* ───── Article pool ───── */

interface Article {
  id: number;
  emoji: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  readTime: string;
}

const ARTICLE_POOL: Article[] = [
  { id: 0, emoji: "🧠", category: "Neuroscience", categoryColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300", title: "The Brain Rewires Itself Every Time You Scroll", excerpt: "New research reveals how infinite feeds physically restructure neural pathways, creating dopamine loops that strengthen with every swipe.", body: "A landmark study published in Nature Neuroscience has confirmed what many have long suspected: the structure of social media feeds literally rewires the brain. Using fMRI scans of 200 participants over 18 months, researchers observed significant thickening of the striatum — the brain's reward center — in heavy infinite-scroll users. More concerning, the prefrontal cortex showed reduced grey matter density, suggesting diminished impulse control. 'The feed becomes a slot machine for the mind,' warns Dr. Elena Vasquez, lead author. The study found that even a two-week detox began reversing some changes, though the structural reinforcement of the dopamine loop can persist for months.", author: "Dr. Elena Vasquez", readTime: "4 min" },
  { id: 1, emoji: "📱", category: "Technology", categoryColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300", title: "How Apps Engineer Addiction at Scale", excerpt: "Inside the design labs where behavioral psychology meets billion-dollar engagement metrics.", body: "Behind every infinite scroll is a team of behavioral designers who meticulously calibrate the friction between you and the content you crave. Former employees of major platforms describe 'engagement velocity' as the north star metric — the speed at which a user consumes and re-engages with fresh content. 'We ran A/B tests on scroll resistance, on the exact pixel threshold for triggering the next load, on the emotional valence of the last card in a batch,' recalls one ex-engineer. The goal: make the user forget they ever wanted to stop. The most successful patterns are those that hide the boundary between choice and compulsion.", author: "Alex Chen", readTime: "6 min" },
  { id: 2, emoji: "🎭", category: "Psychology", categoryColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300", title: "The Variable Reward Trap You Didn't Notice", excerpt: "Why checking your feed feels like pulling a slot machine lever — and why you can't stop.", body: "Psychologist B.F. Skinner's experiments with variable ratio reinforcement in the 1950s found that pigeons, when rewarded unpredictably, would peck a lever thousands of times without stopping. Modern feeds operate on the exact same principle. Every pull-to-refresh is a lever pull. The reward — a funny post, a like notification, a breaking news alert — arrives on an unpredictable schedule. This unpredictability is the key: it triggers a stronger dopamine response than predictable rewards. 'The brain treats each scroll as a potential jackpot,' explains Dr. Mark Rivera. 'You're not reading content anymore — you're gambling for it.'", author: "Mark Rivera", readTime: "5 min" },
  { id: 3, emoji: "🌊", category: "UX Design", categoryColor: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300", title: "Why Stopping Cues Disappeared From Interfaces", excerpt: "A brief history of how pagination died and infinite feeds took over the internet.", body: "In 2006, pagination was the standard. You saw page 1, 2, 3, and knew when you'd reached the end. By 2010, Twitter had popularised the infinite scroll. By 2015, it was everywhere. The reason wasn't better usability — it was longer sessions. Data from early adopters showed that infinite feeds increased time-on-site by 300-400% compared to paginated equivalents. 'We knew users felt less in control,' admits a former product manager. 'But they also scrolled more. And scrolling is revenue.' The removal of the 'end' marker — that simple 'you've reached the end' line — was a deliberate design choice tested across thousands of user sessions.", author: "Sarah Okafor", readTime: "7 min" },
  { id: 4, emoji: "🔬", category: "Research", categoryColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300", title: "Study: 73% of Users Can't Recall What They Scrolled", excerpt: "A landmark experiment reveals the alarming gap between consumption and comprehension.", body: "Participants in a University of Copenhagen study were asked to scroll through a typical social media feed for 15 minutes, then immediately recall as much content as possible. The average participant remembered just 2.3 out of 47 items — less than 5%. When asked the same question an hour later, recall dropped to 0.8 items. 'The feed becomes a blur,' says researcher Hanne Lindqvist. 'The act of scrolling itself becomes the behaviour, not reading or learning. Users are in a trance state, and the content is almost irrelevant.' The study suggests that the primary product of infinite scroll design is not content consumption but continuous engagement — a behaviour divorced from meaning.", author: "Hanne Lindqvist", readTime: "5 min" },
  { id: 5, emoji: "🏛️", category: "Policy", categoryColor: "bg-amber-500/20 text-amber-700 dark:text-amber-300", title: "Regulators Are Finally Looking at Infinite Scroll", excerpt: "The EU's Digital Services Act and emerging legislation targeting addictive interface patterns.", body: "Infinite scroll has become a target for regulators worldwide. The EU's Digital Services Act now requires platforms to provide 'non-addictive' alternatives to their default feeds — options without algorithmic curation or infinite loading. California's Age-Appropriate Design Code similarly targets features that 'increase, sustain, or extend use.' Industry lobbyists argue that infinite scroll is a neutral technology, but behavioural design experts counter that 'neutrality is a myth when every element has been optimised for retention.' The coming years may see mandatory 'stopping cues' — digital speed bumps that force intentionality before the next load.", author: "James Kowalski", readTime: "8 min" },
  { id: 6, emoji: "📊", category: "Data", categoryColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300", title: "We Scrolled 14,000 Feet in One Sitting", excerpt: "An experiment in endurance scrolling reveals the staggering scale of unconscious consumption.", body: "Over a single 8-hour workday, our reporter scrolled continuously on a single platform, tracking every metric imaginable. The result: 14,000 feet of content — roughly the height of Denali, the tallest mountain in North America. 847 posts. 62 video autoplays. 34 advertisements. 11 'trending' notifications. And at the end of the day, they could recall exactly three posts. 'It felt like waking from a dream,' they wrote. 'I had consumed for eight hours and had nothing to show for it but a sore thumb and a vague sense of having seen something about a cat.' The experiment underscores the sheer scale of content that modern feeds can push through a single user in a day.", author: "Maya Torres", readTime: "6 min" },
  { id: 7, emoji: "🧘", category: "Wellness", categoryColor: "bg-green-500/20 text-green-700 dark:text-green-300", title: "How to Recognise When a Feed Owns You", excerpt: "Signs that your scrolling has shifted from habit to compulsion — and what to do.", body: "Psychologists have identified several red flags that separate casual scrolling from compulsive behaviour. Do you scroll while walking? In meetings? Immediately upon waking and right before sleep? Have you tried to stop and found yourself reaching for your phone within minutes? The clinical term is 'problematic interactive media use,' and therapists report it's on the rise. The key differentiator is autonomy — if you feel a sense of loss of control or distress when you can't scroll, it may be time for a digital boundaries reset. Simple interventions like greyscale mode, app timers, and 'stopping cue' bookmarks can help re-establish intentionality.", author: "Dr. Priya Sharma", readTime: "4 min" },
  { id: 8, emoji: "🎮", category: "Gaming", categoryColor: "bg-purple-500/20 text-purple-700 dark:text-purple-300", title: "Loot Boxes and Feeds Share the Same Brain Hack", excerpt: "Game designers saw the connection years ago. Now regulators are catching up.", body: "The psychological mechanism that makes loot boxes addictive — variable ratio reinforcement, uncertain rewards, intermittent positive feedback — is identical to the mechanism that powers infinite scroll feeds. Both were refined in casino slot machines long before they reached digital interfaces. 'The feed is a loot box you don't have to pay for with money,' says game designer Tom Nakamura. 'You pay with your attention instead.' The comparison has led some researchers to propose that infinite feeds should carry warning labels similar to gambling products, especially for minor users whose developing brains are particularly susceptible to variable reward structures.", author: "Tom Nakamura", readTime: "5 min" },
  { id: 9, emoji: "📖", category: "History", categoryColor: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300", title: "Before Infinite Scroll: The Lost Art of Finishing", excerpt: "What we sacrificed when we traded 'The End' for 'Keep Going.'", body: "Before infinite scroll, every piece of media had a clear ending — a last page, a final chapter, a closing credit. This structure provided closure and allowed the brain to file away experiences as complete. Neuroscientists call this 'cognitive closure' — the mental bookmark that says 'this is done, move on.' Infinite feeds deny users closure. There is no 'done.' The feed is always waiting, always unfinished. 'The feeling of incompleteness is a powerful driver,' explains cognitive scientist Dr. Liam Foster. 'It taps into the Zeigarnik effect — our brains remember uncompleted tasks far better than completed ones. The feed exploits this by never letting you finish.'", author: "Liam Foster", readTime: "7 min" },
  { id: 10, emoji: "🔮", category: "Future", categoryColor: "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300", title: "Will AI Feeds Make Infinite Scroll Obsolete?", excerpt: "Predictive content delivery might replace scrolling altogether — for better or worse.", body: "As AI-powered recommendation systems grow more sophisticated, some designers predict the end of scrolling itself. Why scroll when the feed can predict what you want before you want it? 'Autonomous content injection is the logical endpoint,' says futurist Amara Obi. 'You won't scroll because content will flow to you.' But critics warn this removes the last vestiges of user agency. At least with scrolling, there's a physical act of choice — a swipe that says 'show me more.' Passive consumption removes even that thin layer of intentionality. The future might not be infinite scroll, but something far more insidious: infinite autoplay.", author: "Amara Obi", readTime: "6 min" },
  { id: 11, emoji: "📋", category: "Psychology", categoryColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300", title: "The Zeigarnik Effect: Why Unfinished Feeds Haunt You", excerpt: "Your brain remembers incomplete tasks better than completed ones. Feeds exploit this.", body: "In 1927, Soviet psychologist Bluma Zeigarnik noticed something curious: waiters remembered unpaid orders far better than paid ones. This became known as the Zeigarnik effect — the tendency to remember incomplete tasks more vividly than completed ones. Modern feeds weaponise this cognitive quirk. By never showing an 'end of feed' marker, they keep every session in a state of perpetual incompleteness. Your brain flags the unfinished feed as important, creating a low-level anxiety that pulls you back. 'It's the reason you open the app again five minutes after closing it,' explains Dr. Zeigarnik's intellectual successor. 'The task isn't complete because the feed never ends.'", author: "Dr. Rachel Kim", readTime: "5 min" },
  { id: 12, emoji: "💡", category: "Design", categoryColor: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300", title: "The Designer Who Refused to Build Infinite Scroll", excerpt: "One UX designer's stand against engagement-driven design cost them their job.", body: "When product designer Marcus Webb refused to implement an infinite scroll feature on a major news platform, citing ethical concerns, he was replaced within two weeks. 'I told them it was a dark pattern,' he recalls. 'They told me it was industry standard.' Webb's story is not unique. As awareness of dark patterns grows, a quiet resistance is building among rank-and-file designers who question the ethics of engagement-optimised interfaces. 'We need a Hippocratic Oath for design,' Webb says. 'First, do no harm. And infinite scroll, in its current form, does harm.' Several design schools have begun incorporating ethics-of-persuasion modules into their curricula.", author: "Marcus Webb", readTime: "5 min" },
  { id: 13, emoji: "🧪", category: "Research", categoryColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300", title: "Dopamine, Scroll, Repeat: The Chemistry of the Feed", excerpt: "What actually happens in your brain when you see 'loading more…'", body: "Each time new content loads at the bottom of your feed, your brain receives a small pulse of dopamine — the neurotransmitter associated with anticipation and reward. Functional MRI studies show that the dopaminergic response to content loading is strongest not when content appears, but in the moment just before — the 'anticipatory spike.' This is exactly how slot machines work: the moment between the lever pull and the outcome is neurologically the most intense. 'The loading indicator isn't a bug or a necessary evil,' says neurobiologist Dr. James Park. 'It's a feature. That brief moment of uncertainty is chemically valuable.' Removing even that tiny delay could reduce engagement by making the reward loop less exciting.", author: "Dr. James Park", readTime: "6 min" },
  { id: 14, emoji: "🌐", category: "Technology", categoryColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300", title: "The Open Source Movement Against Infinite Feeds", excerpt: "Developers are building alternatives — but can they compete with engagement engines?", body: "A growing movement of open-source developers is building feed alternatives that explicitly reject infinite scroll patterns. Projects like 'FiniteFeed,' 'PaginateNow,' and 'EndlessAreNot' offer plugins that restore pagination to popular platforms. 'We're not against feeds,' says one contributor. 'We're against feeds designed to never let you stop.' The technical challenge is significant — most modern platforms are architecturally built around infinite load models. Adding a stopping point requires rethinking data fetching, state management, and rendering. But the tools exist. The question is whether users will choose them over the convenience of seamless consumption.", author: "Riku Sato", readTime: "7 min" },
  { id: 15, emoji: "📈", category: "Data", categoryColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300", title: "The 83% Statistic: How Much Feed Content Goes Unread", excerpt: "The vast majority of loaded content is never seen. So why do we keep loading more?", body: "Analytics from major platforms reveal a startling statistic: approximately 83% of content loaded in infinite scroll feeds is never actually looked at by the user. It loads, it appears briefly in the viewport as the user scrolls past, and it's gone. 'The feed treats content as friction, not as value,' explains data scientist Priya Nair. 'The goal is to load content fast enough that the user doesn't experience a gap, not to load content the user will read.' This insight flips the conventional understanding of feed design: the content is not the product. The scrolling itself — the continuous, frictionless motion — is the product. Content is merely the fuel.", author: "Priya Nair", readTime: "5 min" },
  { id: 16, emoji: "🎯", category: "Psychology", categoryColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300", title: "Attention Residue: Why You Can't Focus After Scrolling", excerpt: "The cognitive cost of switching between feed fragments is higher than you think.", body: "Every time you switch between pieces of content in a feed, a small amount of attention 'residue' remains — a cognitive echo of the previous item that interferes with processing the next. Multitasking researcher Dr. Sophie Leroy at the University of Minnesota found that attention residue can reduce cognitive performance by up to 40%. In an infinite feed where users switch between content every 2-3 seconds, the cumulative residue creates a state of continuous partial attention. 'You're not processing anything deeply,' she explains. 'You're skimming the surface of everything. The feed is designed to keep you there, but it's also designed to keep you shallow.'", author: "Dr. Sophie Leroy", readTime: "6 min" },
  { id: 17, emoji: "📵", category: "Wellness", categoryColor: "bg-green-500/20 text-green-700 dark:text-green-300", title: "What Happens When You Stop Scrolling for 30 Days", excerpt: "One journalist's month-long detox from infinite feeds and what it revealed about attention.", body: "After 30 days without infinite scroll feeds, journalist Emma Richardson reported dramatic changes: her average reading time per article tripled, she finished four books, and her 'phantom buzz' — the sensation of feeling a phone notification that never arrived — disappeared entirely. 'The first week was agony,' she writes. 'I reached for my phone dozens of times per hour. But by week three, I felt something I hadn't felt in years: boredom. And out of that boredom came reading, thinking, and writing.' Richardson's experience mirrors emerging research that suggests feed abstinence can restore baseline attention capacity within 2-4 weeks.", author: "Emma Richardson", readTime: "4 min" },
  { id: 18, emoji: "⚖️", category: "Policy", categoryColor: "bg-amber-500/20 text-amber-700 dark:text-amber-300", title: "The Legal Case Against Infinite Scroll", excerpt: "Could dark pattern legislation eventually ban infinite feeds?", body: "Legal scholars are increasingly arguing that infinite scroll may violate consumer protection laws that prohibit 'unfair or deceptive acts or practices.' The case hinges on whether infinite scroll qualifies as a dark pattern — a design choice that tricks users into doing something they didn't intend. 'If a user intends to check one notification and ends up scrolling for 45 minutes, the design has subverted their intent,' argues legal scholar Dr. Helen Park. While no court has yet ruled directly on infinite scroll, the FTC's 2022 report on dark patterns specifically identified 'continuous or endless scrolling' as a pattern of concern. Several class-action lawsuits are currently in early stages.", author: "Dr. Helen Park", readTime: "8 min" },
  { id: 19, emoji: "🎨", category: "Design", categoryColor: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300", title: "Can We Design Feeds That Respect Attention?", excerpt: "A new generation of designers is asking: what if feeds prioritised completion over consumption?", body: "A small but growing cohort of interaction designers is experimenting with feed formats that prioritise completion. Concepts include 'finite feeds' that cap daily content at a fixed number of items, 'scroll budgets' that show a remaining count, and 'mindful pagination' that requires an explicit button press to load each page. 'The infinite scroll was a solution to a technical problem — slow mobile networks — that no longer exists,' says designer Yuki Tanaka. 'We can now design feeds that respect the user's time and attention without sacrificing engagement. The question is whether platforms want to.' Early experiments show that respectful feeds actually increase per-item satisfaction and recall, even if total time-on-site decreases.", author: "Yuki Tanaka", readTime: "6 min" },
  { id: 20, emoji: "🧬", category: "Neuroscience", categoryColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300", title: "Scroll Fatigue Is a Real Neurological Condition", excerpt: "Researchers have identified measurable brain changes associated with prolonged feed use.", body: "A 2024 study published in Frontiers in Neuroscience identified a measurable neurological pattern they termed 'scroll fatigue syndrome' — characterised by reduced alpha wave activity (associated with calm focus), elevated theta waves (associated with drowsy automation), and a blunted P300 response (indicating reduced cognitive engagement). Participants who scrolled for more than 30 minutes continuously showed brain activity patterns nearly identical to those of fatigued air traffic controllers. 'The brain enters a low-power mode during prolonged scrolling,' explains neurologist Dr. Anita Rao. 'You're awake, but you're not fully present. The feed has put you in a trance.'", author: "Dr. Anita Rao", readTime: "5 min" },
  { id: 21, emoji: "📡", category: "Technology", categoryColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300", title: "How TikTok's Algorithm Mastered the Art of No Escap", excerpt: "The platform that perfected variable reward scheduling at scale.", body: "TikTok's 'For You' page represents perhaps the most refined implementation of infinite scroll principles in existence. Its algorithm doesn't just predict what you want to see — it predicts the exact moment you'll want to see something different, and serves that thing next. 'TikTok has reduced the scroll to the smallest possible unit: one video. Each swipe is a complete variable reward event,' explains tech analyst Maria Santos. The platform's success has forced competitors to adopt similar models, accelerating an industry-wide shift toward infinite, algorithmically-curated feeds. TikTok's average session length of 95 minutes dwarfs other platforms.", author: "Maria Santos", readTime: "6 min" },
  { id: 22, emoji: "📚", category: "History", categoryColor: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300", title: "From Scrolls to Screens: A 5,000-Year History", excerpt: "The ancient technology of the scroll has come full circle — with one crucial difference.", body: "The first scrolls appeared in ancient Egypt around 3000 BCE — rolled papyrus that had to be unrolled to be read. The format persisted for millennia until the codex (the bound book) replaced it around the 4th century CE. The codex offered something the scroll could not: random access, bookmarks, and a clear sense of progress. Now, digital interfaces have resurrected the scroll — but without the physical cue of unrolling papyrus, users have no sense of how much remains. 'The digital scroll is an infinite scroll,' says media historian Dr. Thomas Grey. 'It has no physical constraint. In eliminating the scroll's natural endpoint, we eliminated one of reading's fundamental orienting mechanisms.'", author: "Dr. Thomas Grey", readTime: "7 min" },
  { id: 23, emoji: "🕹️", category: "Gaming", categoryColor: "bg-purple-500/20 text-purple-700 dark:text-purple-300", title: "The Game Designers Who Saw It Coming", excerpt: "How the gaming industry anticipated the infinite scroll problem two decades ago.", body: "In 2004, game designer Clint Hocking coined the term 'ludonarrative dissonance' to describe the conflict between a game's story and its mechanics. But a decade earlier, pioneering game developers had already recognised that endless gameplay loops could be addictive. 'We called it the 'one more turn' problem,' recalls Sid Meier, creator of Civilization. 'The question was always: how do you make players want to stop, but choose to keep going?' Social media feeds removed the first part — they simply never offer a natural stopping point. Game designers, by contrast, have always built in closure mechanisms (levels, endings, credits) even as they encourage replayability.", author: "Sid Meier", readTime: "6 min" },
  { id: 24, emoji: "🧩", category: "Psychology", categoryColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300", title: "The Curiosity Gap: Why You Scroll Past What Bores You", excerpt: "The cognitive bias that keeps you scrolling even when you're not enjoying it.", body: "The 'curiosity gap' — the feeling that there's something just ahead worth knowing — is one of the most powerful drivers of scrolling behaviour. It exploits the brain's tendency to overvalue potential future rewards relative to current costs. 'The cost of one more scroll is tiny,' explains behavioural economist Dr. Katherine Mills. 'But the potential reward — a funny post, an interesting article, a message from a friend — feels significant. Multiply that calculus across hundreds of scrolls and you have a session. The feed's design ensures that the cost never compounds but the potential reward is always present.' This asymmetry is the engine of infinite scrolling.", author: "Dr. Katherine Mills", readTime: "5 min" },
  { id: 25, emoji: "🏥", category: "Health", categoryColor: "bg-green-500/20 text-green-700 dark:text-green-300", title: "The Physical Toll of Infinite Scroll", excerpt: "Scrolling isn't just psychologically addictive — it's physically damaging.", body: "Repetitive strain injuries from scrolling, colloquially known as 'scroll thumb' or 'swipe syndrome,' have increased 340% over the past decade according to the American Academy of Orthopaedic Surgeons. Beyond RSI, the posture associated with prolonged scrolling — hunched neck, rounded shoulders, downward gaze — has created a generation of 'tech neck' patients. 'I'm seeing 25-year-olds with the cervical spines of 60-year-olds,' says orthopaedic surgeon Dr. Michael Torres. The physical consequences compound the psychological: the more it hurts, the more users adjust their posture to compensate, creating a feedback loop of discomfort and compensation that paradoxically makes it harder to disengage.", author: "Dr. Michael Torres", readTime: "4 min" },
  { id: 26, emoji: "🌍", category: "Technology", categoryColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300", title: "The Carbon Cost of Infinite Loading", excerpt: "Every 'load more' request has an environmental price. It adds up fast.", body: "A 2023 study estimated that the global energy consumption from infinite feed content delivery is equivalent to the annual electricity usage of Belgium. Each 'load more' request triggers a chain of server-side computation, database queries, content delivery network transfers, and client-side rendering. For a heavy user scrolling through 1,000 items per day, the carbon footprint is approximately 0.4 kg CO2 per month — roughly equivalent to driving one mile. Multiply by 4.8 billion internet users and the environmental impact becomes staggering. 'Infinite scroll isn't just an attention problem,' says environmental researcher Dr. Aisha Patel. 'It's an environmental one. Every endless session has a carbon cost.'", author: "Dr. Aisha Patel", readTime: "5 min" },
  { id: 27, emoji: "🎬", category: "Media", categoryColor: "bg-red-500/20 text-red-700 dark:text-red-300", title: "Why YouTube Keeps Autoplaying the Next Video", excerpt: "The platform that turned the infinite scroll from a pull mechanism into a push mechanism.", body: "When YouTube introduced autoplay in 2010, it transformed the infinite scroll from a user-driven pull mechanism into a platform-driven push mechanism. Users no longer had to decide to scroll — the next video played automatically. 'Autoplay is infinite scroll without the thumb workout,' says media critic James Nolan. The change increased watch time by an estimated 40%. But it also removed one of the last intentional checkpoints in the content consumption loop: the decision to click. With autoplay, the default state becomes 'continue consuming' rather than 'choose what's next.' Removing that choice point is considered by many designers to be the most consequential dark pattern of the 2010s.", author: "James Nolan", readTime: "6 min" },
  { id: 28, emoji: "💭", category: "Neuroscience", categoryColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300", title: "Your Brain on Infinite Feeds: An fMRI Tour", excerpt: "What brain scans reveal about the moment of scroll — and the moment of stopping.", body: "Neuroimaging studies comparing feed-scrolling to intentional reading reveal stark differences. During scrolling, the default mode network — the brain system associated with self-reflection and deep thought — is suppressed. Meanwhile, the salience network, which flags novel stimuli, is hyperactive. 'The brain is in a vigilant state,' explains Dr. Yuki Tanaka, a cognitive neuroscientist at Kyoto University. 'It's scanning for threat or reward, not engaging with content.' By contrast, intentional reading engages the language network, the default mode network, and areas associated with comprehension and memory consolidation. 'Scrolling and reading are almost neurologically opposite activities,' Tanaka concludes. 'The feed interface actively discourages the brain state required to process information.'", author: "Dr. Yuki Tanaka", readTime: "7 min" },
  { id: 29, emoji: "🗺️", category: "UX Design", categoryColor: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300", title: "The Lost Art of the Sitemap", excerpt: "Once every website had a clear map. Now feeds deliberately disorient you.", body: "Early websites prioritised navigable structure — clear hierarchies, breadcrumb trails, and sitemaps that gave users a mental model of where they were. Infinite feeds inverted this. By design, an infinite feed has no map — you cannot know where you are relative to the whole because there is no whole. 'Disorientation is a feature,' argues UX researcher Dr. Amina Diallo. 'A user who knows exactly where they are can make an intentional decision to leave. A disoriented user stays.' The absence of spatial anchors in digital environments — the inability to bookmark a position in a feed, to return to a specific scroll depth — creates a learned helplessness that paradoxically drives further scrolling.", author: "Dr. Amina Diallo", readTime: "6 min" },
];

/* ───── Helpers ───── */

function shuffleArticles(articles: Article[]): Article[] {
  const copy = [...articles];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ───── Component ───── */

export function InfiniteScrollingCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [shuffledPool] = React.useState(() => shuffleArticles(ARTICLE_POOL));
  const [visibleIds, setVisibleIds] = React.useState(() => shuffledPool.slice(0, 6).map(a => a.id));
  const [loading, setLoading] = React.useState(false);
  const [loadCount, setLoadCount] = React.useState(0);
  const [reshuffleCount, setReshuffleCount] = React.useState(0);
  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const wasAtRef = React.useRef(0);
  const batchRef = React.useRef(6);
  const loadingRef = React.useRef(false);

  /* Load another batch of articles */
  const loadMore = React.useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setLoadCount((c) => c + 1);
    setTimeout(() => {
      setVisibleIds((prev) => {
        const BATCH = 4;
        const start = batchRef.current;
        if (start >= shuffledPool.length) {
          // Wrap around the pool
          batchRef.current = BATCH;
          const wrapped = shuffledPool.slice(0, BATCH).map(a => a.id);
          loadingRef.current = false;
          return [...prev, ...wrapped];
        }
        const end = Math.min(start + BATCH, shuffledPool.length);
        batchRef.current = end;
        const newIds = shuffledPool.slice(start, end).map(a => a.id);
        loadingRef.current = false;
        return [...prev, ...newIds];
      });
      setLoading(false);
    }, 300);
  }, [shuffledPool]);

  /* Scroll handler — trigger early (400px threshold) */
  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (el.scrollTop + el.clientHeight > el.scrollHeight - 400) {
        loadMore();
      }
    },
    [loadMore]
  );

  /* Mount preload */
  React.useEffect(() => { loadMore(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Open article */
  const openArticle = React.useCallback((article: Article) => {
    if (scrollRef.current) wasAtRef.current = scrollRef.current.scrollTop;
    setSelectedArticle(article);
  }, []);

  /* Close article — reshuffle! */
  const closeArticle = React.useCallback(() => {
    setSelectedArticle(null);
    const reshuffled = shuffleArticles(ARTICLE_POOL);
    const newSlice = reshuffled.slice(0, 6).map(a => a.id);
    setVisibleIds(newSlice);
    batchRef.current = 6;
    setLoadCount(0);
    setReshuffleCount((c) => c + 1);
    // Reset scroll to top
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    });
  }, []);

  const reset = () => {
    setSelectedArticle(null);
    const reshuffled = shuffleArticles(ARTICLE_POOL);
    const newSlice = reshuffled.slice(0, 6).map(a => a.id);
    setVisibleIds(newSlice);
    batchRef.current = 6;
    setLoadCount(0);
    setReshuffleCount(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Articles in pool</span>
        <span className="font-mono font-semibold tabular-nums">{ARTICLE_POOL.length}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Visible articles</span>
        <span className="font-mono font-semibold tabular-nums">{visibleIds.length}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Times reshuffled</span>
        <span className="font-mono font-semibold tabular-nums">{reshuffleCount}</span>
      </div>
    </>
  ) : null;

  const articleMap = React.useMemo(() => {
    const map = new Map<number, Article>();
    ARTICLE_POOL.forEach(a => map.set(a.id, a));
    return map;
  }, []);

  const visibleArticles = visibleIds.map(id => articleMap.get(id)).filter(Boolean) as Article[];

  /* ─── Article Detail Overlay ─── */
  if (selectedArticle) {
    const a = selectedArticle;
    return (
      <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
        title="Infinite Scrolling: Absence of State Anchoring"
        caption="Absence of State Anchoring — the feed reshuffles when you return from an article, destroying your place in the content stream." auditorStats={stats}>
        <div className="space-y-3">
          <div className="rounded-md border bg-foreground/5 p-4 text-xs">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${a.categoryColor}`}>{a.category}</span>
              <button onClick={closeArticle}
                className="bg-muted hover:bg-muted/80 text-muted-foreground rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors">
                Close ×
              </button>
            </div>
            <div className="text-2xl mb-2">{a.emoji}</div>
            <h2 className="text-sm font-semibold leading-snug mb-2">{a.title}</h2>
            <div className="flex items-center gap-2 text-[9px] text-muted-foreground mb-3">
              <span>{a.author}</span>
              <span>·</span>
              <span>{a.readTime}</span>
            </div>
            {a.body.split('\n').filter(Boolean).map((p, i) => (
              <p key={i} className="text-[10px] leading-relaxed text-muted-foreground mb-2 last:mb-0">{p}</p>
            ))}
          </div>
        </div>
      </DemoShell>
    );
  }

  /* ─── Feed View ─── */
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Infinite Scrolling: Absence of State Anchoring"
      caption="Absence of State Anchoring — tap any article to read. When you close it, the feed reshuffles entirely, erasing your place in the content stream." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 text-xs">
          {/* Scrollable article feed */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-56 space-y-2 overflow-y-auto rounded-md p-2"
          >
            {visibleArticles.map((article) => (
              <button
                key={article.id}
                onClick={() => openArticle(article)}
                className="w-full text-left rounded-lg border bg-card hover:bg-accent/50 transition-colors p-3 cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex gap-3">
                  <div className="text-xl flex-shrink-0 mt-0.5">{article.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium ${article.categoryColor}`}>
                        {article.category}
                      </span>
                      <span className="text-[8px] text-muted-foreground">{article.readTime}</span>
                    </div>
                    <h3 className="text-[11px] font-semibold leading-snug mb-0.5">{article.title}</h3>
                    <p className="text-[9px] text-muted-foreground leading-relaxed line-clamp-2">{article.excerpt}</p>
                    <p className="text-[8px] text-muted-foreground mt-1">{article.author}</p>
                  </div>
                </div>
              </button>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-center justify-center gap-2 py-3 text-[10px] text-muted-foreground">
                <span className="inline-block w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                Loading more articles...
              </div>
            )}
          </div>

          <p className="text-[8px] text-muted-foreground text-center pb-2 px-2">
            Scroll down — tap any article to read. Close it and the feed reshuffles.
          </p>
        </div>
      </div>
    </DemoShell>
  );
}
