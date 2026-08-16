# Example output

Produced by running the `signal-noise` skill over the complete `yttranscribe` output for
[Patrick Collison: Is AI Breaking the Lean Startup Playbook?](https://www.youtube.com/watch?v=5d6y3poKwK4)
(Y Combinator, 31 minutes, 5,919 words).

Nothing below was hand-edited.

The source transcript is Y Combinator's content and is not redistributed here — see
[`input-transcript.md`](./input-transcript.md) for its shape and the one-line command that
regenerates it.

---

**Video transcript (interview) | 5,919 words → ~210 words (~3.5%)**

## Verdict

**The summary below is the whole thing.** One disclosure clears both gates. Everything else in 31 minutes is background, career advice, or forecasting. 31 min → ~45 sec.

## What is new — and what it changes

Stripe disclosed internal data showing **new businesses starting on Stripe running at just under 2x year-over-year** — the largest relative jump it has recorded, against ~50% during COVID (Feb–Apr 2020), the prior record. The growth is not dilution: the **median** business is performing better than a year ago, and the probability of crossing $1M, $5M and $10M in revenue is rising at all three thresholds, with time-to-revenue falling ([25:17 Why It's Never Been a Better Time to Start a Company](https://www.youtube.com/watch?v=5d6y3poKwK4&t=1517s)).

**Which means:** anyone arguing that AI is consolidating the economy into a few winners is now arguing against the payment rails' own numbers. This bears on founders judging whether to start now, investors pricing "the market is frozen", and operators deciding whether small new entrants are a real competitive threat. The generalization rests on scale — **25% of all Delaware corporations are now incorporated through Stripe Atlas** ([19:07 The Hidden Reward of Building Stripe](https://www.youtube.com/watch?v=5d6y3poKwK4&t=1147s)) — so this is closer to a census of US company formation than one vendor's book.

## Signal

- Collison's own reading of that data, offered with **no figures attached**: AI is not centralizing; expect "many thousands of winners" ([29:23 What Stripe's Data Says About the AI Economy](https://www.youtube.com/watch?v=5d6y3poKwK4&t=1763s)). He explicitly declines to call it a prediction.
- Narrow but actionable, for Startup School attendees only: free Atlas incorporation via startupschool@stripe.com ([19:07 The Hidden Reward of Building Stripe](https://www.youtube.com/watch?v=5d6y3poKwK4&t=1147s)).

## Background, not new

Stripe's build timeline — first code 2009, public launch September 2011, first production customer January 2010 when it could only charge a card — is on the record and recounted here, not disclosed. Its one consequence: a counterexample to launch-early orthodoxy, survived because production users existed from month two ([12:10 Building Stripe Before Launching](https://www.youtube.com/watch?v=5d6y3poKwK4&t=730s)).

## Skip list

- **0:00 Intro** — greetings.
- **0:07 What Should You Still Learn in the Age of AI?** — metaphor, no evidence.
- **5:12 Should You Drop Out of College?** — generic advice.
- **9:58 Why Stripe Worked** — retrospective narrative.
- **17:20 Is the Lean Startup Still the Right Playbook?** — speculation, explicitly "I don't know".
- **22:36 Will AI Kill Your Startup?** — 20-year-old Google analogy, no data.
- **30:45 Build Something People Truly Need** — sign-off.

## Tensions and gaps

- **The 2x measures Stripe, not the economy.** Share-shift toward Stripe produces an identical curve. The Atlas 25% figure mitigates this but does not eliminate it, and nobody raises it.
- **"Median business doing better" is undefined** — no metric, no cohort window.

## Cut

All forecasting and career advice; the origin anecdote; the Lisp and Jacobian asides; his personal writing habits and zero-AI-replies disclosure (new, but no stated consequence — trivia by Gate 2).

---

## Why this output looks the way it does

Four rules in `SKILL.md` did the visible work:

**Two gates: new AND relevant.** A fact must be something the reader could not already have known, *and*
something that changes a decision. That is why the headline block carries a "which means" clause naming
who is affected, and why Collison's personal habit of never sending AI-suggested replies was cut — new,
but with no consequence the source states, so trivia by Gate 2.

**Old facts are labelled, not promoted.** Stripe's 2009–2011 build timeline is genuinely interesting and
entirely on the public record, so it sits under `Background, not new` rather than in the lead. Recounting
a known thing is not disclosing it.

**Opinion is noise until it is earned.** `17:20 Is the Lean Startup Still the Right Playbook?` is the most
quotable segment in the video and it lands in the skip list, because under the test *could this be false,
and could someone check?* it is a man saying "I don't know" for two minutes. The Stripe numbers survive
because they rest on data only the speaker has.

**Anchors are chapter-accurate or absent.** `yttranscribe` emits no inline timestamps, so per-sentence
`mm:ss` cannot be derived — only guessed. Every anchor here is a real chapter from the video's own chapter
list, converted to seconds (`25:17` → `&t=1517s`). A link that looks exact and is wrong is worse than no link.
