# Product

What monostich is, why it works the way it does, and what order to build it in. This document records product decisions and the reasoning behind them — `architecture.md` covers technical structure, `gameplan.md` covers phases.

---

## The idea

Magnetic poetry as a social feed. Users are given word tiles and arrange them into a single-line poem (a *monostich*), then publish it. Functionally Twitter-shaped: profiles, following, a feed, likes.

## The values that decide everything else

**The constraint is the art.** Magnetic poetry is fun *because* the vocabulary is mundane. A good poem wrung out of "the", "moon", "is", "wet" is more impressive than one built from a hoard of evocative words. Anything that gives some users better vocabulary makes their work both easier and less interesting.

**Never gate expressive capability.** No rare tiles, no collecting, no loot boxes, no pay-to-win. Everyone has access to the same words. If monetization ever happens, the line is: sell how it *looks* (fridge themes, magnet styles, supporter badges), never what you can *make*.

**There is nothing to win.** No score, no ranking of poets, no competition. This is a deliberate product decision with two large technical consequences:

- No tile ownership → no per-user inventory, no per-copy tile identity
- Nothing to cheat at → no anti-cheat, so the dealt hand can live purely in client state

Both of those deleted whole subsystems. The egalitarian instinct is also the simplifying one.

---

## Two modes, one mechanic

### Sandbox — the primary feature

A large tile set. The user is dealt a random subset, can redraw for a different one, arranges tiles into a poem, and publishes. Poems appear in a feed. This is the everyday product and the bulk of the content.

### Daily — the recurring event

A small set (~20 words) curated for that specific day. **Everyone gets the same words** — no dealing, no redraw. Once you've submitted, you can browse everyone else's poems from the same twenty words. Past days are archived and browsable, and a profile shows the dailies a user has played.

The value is the shared constraint. "Look what we all made from the same words" is the social object, and it is weakened by giving each person a different draw. Weekly is a fine starting cadence — daily is a real content commitment.

### Themed sets — later

Named evergreen sets ("Nautical", a particular poet's vocabulary) playable any time. Mechanically identical to the sandbox with a different vocabulary. Poems may eventually be tagged with the set they came from.

### The unifying model

The two modes differ in exactly one way, so they are one mechanic with one parameter:

```
tile_sets.deal_size  nullable
```

- `null` → you receive the whole set (daily)
- `N` → you draw N tiles from it, redraw available (sandbox, themed)

One code path. The UI offers a redraw button when `deal_size` is non-null. Avoid a mode enum — branches drift.

---

## Vocabulary

| Term | Meaning | Lifetime |
|---|---|---|
| **word** | A unique string in the catalogue: `moon`, `the`, `ly` | Permanent |
| **tile set** | A named collection of words *with quantities* | Permanent |
| **daily prompt** | A row scheduling a set to a date. Holds no words. | One per date |
| **hand** | The tiles a user has this session — the whole set, or a draw from it | Ephemeral, client-side |
| **poem** | A published arrangement | Permanent |

A "daily set" is not a kind of set. It is an ordinary tile set that a `daily_prompts` row has scheduled to a date — which means a good set can be re-featured, or promoted into the browsable themed list.

"All tiles" is likewise just a set. Expressing the exception *inside* the rule keeps every poem attributable to exactly one set.

---

## Data model decisions

**Words are entities; copies are quantities.** One row per unique string, carrying properties (kind, and later category or era). Multiplicity lives in `set_words.quantity` — three copies of `the` in a set is `quantity = 3`, not three rows. No query will ever need to distinguish one copy from another, because tiles are not owned.

Quantity is load-bearing: it's what allows a hand to contain `the` twice, which is what allows "the moon and the sea."

**Poems snapshot their text.** `poem_tiles` stores both `word_id` (lineage, analytics) and `text` (what it actually said). A published poem is a historical artifact and must render identically forever, regardless of later edits to the catalogue. Same pattern as an invoice line item storing the price at time of sale.

**`poem_tiles` is keyed on `(poem_id, position)`**, never `(poem_id, word_id)` — a word can repeat within a poem.

**`poems.daily_date`** is a nullable reference to `daily_prompts`. Null means sandbox or themed; non-null identifies which day's daily this was submitted to. One column serves three features: today's submissions, the archive, and a profile's daily history.

**Text is stored exactly as it renders.** Mostly lowercase, proper nouns capitalized at curation time. No capitalization logic anywhere — `Emily` is its own row. Capitalization becomes an editorial decision, which is where it belongs.

**Words have a `kind`** — `word`, `suffix`, `prefix`, `punctuation` — because affixes like `ly`, `ed`, `s` attach to a neighbouring token with no space. Rendering is not `join(" ")`.

---

## Content operations

The vocabulary is curated by hand. No user-submitted words, which removes vocabulary moderation entirely.

Note that curating *words* is not moderating *poems*. People will make things with these tiles that were not intended — much of that is the fun, some of it eventually won't be. A nullable `hidden_at` on `poems` is enough, added when needed.

For the daily, sets need **structural balance**, not random selection. Twenty random words are frequently unusable — all nouns, no verbs, no connectors. A workable set needs function words, verbs, affixes, and a handful of evocative content words. Generate by rule, then review.

**Pre-generate a backlog** and review a week or more ahead. A daily product that generates just-in-time will eventually ship a broken day at 3am.

---

## Build sequence

**1. Sandbox, thin.** One large tile set, deal → arrange → publish, one global reverse-chronological feed. No follows, no likes, no daily, no ranking. This is a complete loop: create, share, read.

**2. Profiles and social.** Following, the home feed, likes.

**3. Daily (or weekly).** By this point the composer, persistence, and feed all exist — the daily is a set with `deal_size = null`, a scheduling table, and a filtered feed.

**4. Themed sets and tagging.**

Sandbox before daily, even though the daily is the more distinctive feature: the daily requires content operations that can't be designed until you know what a good set looks like, and you learn that by using the sandbox. The sandbox needs one word list, made once.

**Feed ranking starts as reverse chronological.** Ranking is a research problem disguised as a feature. With a small user base, chronological is honestly better, and by the time it stops working you'll have real data about what "good" means here.

---

## Open questions

- Does everyone see the daily's tiles in the same order? Fixed order makes it feel like a shared object; shuffling per user feels more personal and avoids anchoring.
- Does a redrawn hand clear the current arrangement, or preserve it? Decides whether a redraw is "a new attempt" or "more options."
- How strict is tile placement — can a suffix be placed first? Start permissive; decide after playing with it.
- Daily or weekly to start. Weekly is a much smaller content commitment.
