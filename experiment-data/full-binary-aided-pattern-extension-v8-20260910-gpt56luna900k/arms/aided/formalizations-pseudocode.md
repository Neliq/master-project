# Extension formalization index

## DP-063-C1 — Nagging — condition 1: Repeated Prompt Injection

Operational reading: The same request reappears after dismissal within the declared observation window.

Required observable atoms:
- The prompts have equal normalized action signatures, not merely similar wording.
- The first prompt is dismissed or deferred.
- An equivalent prompt is newly inserted or visibly re-presented within the declared recurrence window.

Direct counterevidence:
- The prompt does not recur, or it recurs only after a new user request or materially changed context.

## DP-063-C2 — Nagging — condition 2: Persistent Interruption Salience

Operational reading: The recurring request is rendered as a visually salient interruption.

Required observable atoms:
- The recurring prompt and viewport are identified in the same rendered state.
- The area or stacking-layer measurement is directly available.
- At least one disjunct in the source formula is directly supported.

Direct counterevidence:
- The recurring request is not visually salient under either declared disjunct.

## DP-063-C3 — Nagging — condition 3: Imperative Repetition Without New Context

Operational reading: Imperative wording repeats without materially new task context.

Required observable atoms:
- The prompt instances have equal normalized action signatures.
- The prompt token multiset is non-empty and the imperative lexicon is declared.
- The imperative-word density is computed over the declared prompt text.
- The two equivalent prompt states are comparable and show no material context change.

Direct counterevidence:
- The repeated prompt adds material information or does not exceed the declared imperative-density threshold.

## DP-064-C1 — Games For Other Purposes — condition 1: Game Layer Coupled to a Non-Game Task

Operational reading: A game-like layer governs progression in a task outside an entertainment-game context.

Required observable atoms:
- Points, levels, quests, lives, badges, or another game-like progression mechanism is present.
- The surrounding task purpose is outside the declared entertainment-game purpose set.
- The game layer governs at least one visible non-game task action.
- That action produces an observable change in game progress.

Direct counterevidence:
- No game-like layer is present, or it does not affect the non-game task.

## DP-064-C2 — Games For Other Purposes — condition 2: Visual Dominance of Repurposed Game Mechanics

Operational reading: The repurposed game layer is visually dominant over the ordinary task controls.

Required observable atoms:
- The game layer and ordinary task controls are identified in the same viewport.
- Their comparable area and visual-weight measurements are available.
- Both visual inequalities are evaluated in the declared scope.

Direct counterevidence:
- The game layer does not exceed either declared visual threshold.

## DP-064-C3 — Games For Other Purposes — condition 3: Reward Framing of Non-Game Compliance

Operational reading: Non-game compliance is framed as game advancement and access depends on the associated reward state.

Required observable atoms:
- The task copy contains a declared game-reward or progression term.
- The associated reward state is identified.
- Access, completion, or continued utility depends on that reward state.

Direct counterevidence:
- The task is described neutrally and remains fully available without the game reward.
