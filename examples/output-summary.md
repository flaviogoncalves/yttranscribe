# Example output

Produced by running the `signal-noise` skill over the complete `yttranscribe` output for
[Patrick Collison: Is AI Breaking the Lean Startup Playbook?](https://www.youtube.com/watch?v=5d6y3poKwK4)
(Y Combinator, 31 minutes, 5,919 words).

Nothing below was hand-edited.

The source transcript is Y Combinator's content and is not redistributed here — see
[`input-transcript.md`](./input-transcript.md) for its shape and the one-line command that
regenerates it.

---

**Video transcript (interview) | 5,919 words → ~290 words (~5%)**

## Verdict

**The summary below is the whole thing.** Every checkable claim in 31 minutes fits in the next twenty lines. Seven of the twelve chapters contain no verifiable fact at all — they are career advice and forecasting. 31 min → ~1 min.

## What is new

Stripe's internal data shows new businesses starting on Stripe running at **just under 2x year-over-year**, which Collison states is the largest relative jump Stripe has recorded — against ~50% year-over-year during COVID (Feb–Apr 2020), the prior record ([25:17 Why It's Never Been a Better Time to Start a Company](https://www.youtube.com/watch?v=5d6y3poKwK4&t=1517s)).

## Thesis

The only thing this interview establishes is Stripe's business-formation data: volume up ~2x, with the median business and the $1M/$5M/$10M threshold-crossing rates all improving rather than diluting. The remaining 27 minutes are opinion and career advice with no data behind them.

## Signal

- **Formation is up and not diluted** ([25:17 Why It's Never Been a Better Time to Start a Company](https://www.youtube.com/watch?v=5d6y3poKwK4&t=1517s)): new businesses on Stripe just under 2x YoY (record; COVID was ~50%); the **median** business is performing better than a year ago; probability of crossing $1M, $5M and $10M revenue is rising at all three thresholds; time-to-revenue for Atlas-incorporated companies is declining. Anchored by him to "July 26th or whatever it is, of '26".
- **25% of all Delaware corporations are started via Stripe Atlas** ([19:07 The Hidden Reward of Building Stripe](https://www.youtube.com/watch?v=5d6y3poKwK4&t=1147s)).
- **Live offer:** free Stripe Atlas incorporation for Startup School attendees, via startupschool@stripe.com ([19:07 The Hidden Reward of Building Stripe](https://www.youtube.com/watch?v=5d6y3poKwK4&t=1147s)).
- **Stripe shipped 2 years after first commit, and survived it because of production users, not despite them** ([12:10 Building Stripe Before Launching](https://www.youtube.com/watch?v=5d6y3poKwK4&t=730s)): first code fall 2009; first production customer January 2010 — Ross Boucher, "Twilio North" — when the product could only charge a card; full-time summer 2010; public launch September 2011. Dashboard, refunds and payouts were each built when that one customer asked. Private-beta customer count grew every month to launch. Stated reason for the delay: security, banking partners, money movement and reliability had to exist first.
- **He has sent zero AI-suggested replies in his life** ([2:01 Knowledge Still Matters](https://www.youtube.com/watch?v=5d6y3poKwK4&t=121s)), across Gmail, WhatsApp and similar prompts.
- Collison's read, offered with Stripe data behind it but no figures given: AI is not centralizing the economy; expect "many thousands of winners" ([29:23 What Stripe's Data Says About the AI Economy](https://www.youtube.com/watch?v=5d6y3poKwK4&t=1763s)). He explicitly declines to make it a prediction.

## Skip list

- **0:00 Intro** — greetings.
- **0:07 What Should You Still Learn in the Age of AI?** — the "cognitive L1 cache" metaphor; no evidence.
- **5:12 Should You Drop Out of College?** — personal history, generic advice.
- **9:58 Why Stripe Worked** — retrospective narrative.
- **17:20 Is the Lean Startup Still the Right Playbook?** — speculation, explicitly "I don't know".
- **22:36 Will AI Kill Your Startup?** — 20-year-old Google analogy, no data.
- **30:45 Build Something People Truly Need** — sign-off.

## Tensions and gaps

- **The 2x measures Stripe, not the economy.** Stripe share-shift produces an identical curve. Nobody raises this.
- **"Median business doing better" is undefined** — no metric, no cohort window.
- **No figures accompany the decentralization claim**, which is the one conclusion he draws from the data.

## Cut

Removed: all forecasting (permanent-underclass meme, lean-startup obsolescence, whether the labs will crush you), college advice, the sushi-in-Potrero origin story, the Lisp and Jacobian asides, host-guest flattery, and the thesis restated at open and close. `## Numbers and commitments` omitted deliberately — every figure already sits in the body with its context, and a table would only restate it.

---

## Why this output looks the way it does

Three rules in `SKILL.md` did the visible work:

**The Verdict is a decision.** Not "it depends" — one of three calls, chosen on fact density rather than
on how enjoyable the talk was. Here every checkable claim fit in the summary, so the honest call is
"the summary below is the whole thing".

**Opinion is noise until it is earned.** `17:20 Is the Lean Startup Still the Right Playbook?` is the most
quotable segment in the video and it lands in the skip list, because under the test *could this be false,
and could someone check?* it is a man saying "I don't know" for two minutes. The Stripe numbers survive
because they rest on data only the speaker has.

**Anchors are chapter-accurate or absent.** `yttranscribe` emits no inline timestamps, so per-sentence
`mm:ss` cannot be derived — only guessed. Every anchor here is a real chapter from the video's own chapter
list, converted to seconds (`25:17` → `&t=1517s`). A link that looks exact and is wrong is worse than no link.
