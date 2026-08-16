# Example input (excerpt)

This is what `yttranscribe` puts on your clipboard — the exact shape `signal-noise` expects.

**Only the opening is reproduced here.** The full transcript is Y Combinator's content, so it is not
redistributed in this repo. Regenerate the complete file yourself in about a second:

```bash
node dist/cli.js "https://www.youtube.com/watch?v=5d6y3poKwK4" > input-transcript.md
```

The real file is 5,919 words. Everything below the `## Transcript` heading continues as one
unbroken run of prose to the end of the episode — no inline timestamps, no speaker labels,
no caption fragments.

The [summary produced from it](./output-summary.md) was generated from the complete transcript,
not from this excerpt.

---

```markdown
# Patrick Collison: Is AI Breaking the Lean Startup Playbook?

**Channel:** Y Combinator
**Duration:** 31m
**URL:** https://www.youtube.com/watch?v=5d6y3poKwK4

## Chapters

- 0:00 — Intro
- 0:07 — What Should You Still Learn in the Age of AI?
- 2:01 — Knowledge Still Matters
- 5:12 — Should You Drop Out of College?
- 9:58 — Why Stripe Worked
- 12:10 — Building Stripe Before Launching
- 17:20 — Is the Lean Startup Still the Right Playbook?
- 19:07 — The Hidden Reward of Building Stripe
- 22:36 — Will AI Kill Your Startup?
- 25:17 — Why It's Never Been a Better Time to Start a Company
- 29:23 — What Stripe's Data Says About the AI Economy
- 30:45 — Build Something People Truly Need

## Transcript

Okay, Patrick. Thanks so much for being here. Welcome to Startup School.
[…continues for 5,919 words…]
```

---

## What matters about this shape

**The header carries the URL.** That is what lets the summary turn `25:17` into a clickable
`&t=1517s` link, so a claim can be verified in one click instead of a rewatch.

**The chapter list is the only navigational ground truth.** The transcript body has no time markers
at all, so a per-sentence `mm:ss` could only be guessed. Chapter granularity is the floor, and
claims are anchored by matching them to the chapter whose *title* names them.

**The prose is continuous.** Caption fragments are reassembled into sentences before they reach the
model, which reads it as speech rather than as subtitle rows — and costs far fewer tokens than
timestamping every line.

**Chapters are optional.** When a video has none, the list is omitted, and `signal-noise` ships the
summary with no anchors and says so in one line rather than fabricating them.
