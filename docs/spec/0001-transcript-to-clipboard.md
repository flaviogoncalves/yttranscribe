# Spec 0001 — Transcript to clipboard

## Problem Statement

To get a YouTube podcast into Claude, there is currently no reliable way to obtain the transcript. YouTube's `timedtext` endpoint returns HTTP 200 with an empty body, third-party transcript sites reject server-side requests, and only some publishers post an official transcript. The remaining option is reading captions off the screen by hand, which nobody does.

The result is that summarising an episode depends on whether its publisher happened to post a transcript — which is luck, not a workflow.

## Solution

A Chrome extension. You are on a YouTube video, you click the toolbar button, and the full transcript is on your clipboard a moment later, ready to paste into Claude.

It does not summarise. The transcript arrives with a short metadata header and the video's chapter list so the paste is self-describing, and the prose is left continuous so it reads as speech rather than as caption fragments.

When an episode has no captions, it says so and stops.

## User Stories

1. As a listener, I want to click one button on a YouTube video and get its transcript on my clipboard, so that I can paste it into Claude without any intermediate steps.
2. As a listener, I want the transcript to arrive as continuous prose rather than caption fragments, so that the model reads it as speech.
3. As a listener, I want a short header naming the title, channel, publish date, duration and URL, so that the paste is self-describing and I can cite the source later.
4. As a listener, I want the video's chapter list included when it has one, so that I can ask for a summary organised around the actual structure of the talk.
5. As a listener, I want the chapter list quietly omitted when the video has none, so that a missing nice-to-have never blocks the transcript.
6. As a listener, I want the transcript in the video's original language, so that I never receive a machine translation of a machine transcription.
7. As a listener, I want a human-written caption track preferred over an auto-generated one when both exist, so that I get the better source without having to check.
8. As a listener, I want to be warned when only an auto-translated track is available, so that I can judge the transcript's reliability rather than trusting it blindly.
9. As a listener, I want to be told plainly when an episode has no captions at all, so that I stop waiting and go find another source.
10. As a listener, I never want a partial or reconstructed transcript presented as complete, so that I can trust what lands on my clipboard.
11. As a listener, I want the extension to try the fast path first, so that the normal case takes about a second.
12. As a listener, I want it to fall back to reading captions off the player when the fast path fails, so that a YouTube change degrades me to slow rather than broken.
13. As a listener, I want to be told before the slow fallback starts how long it will take, so that I can cancel instead of discovering it later.
14. As a listener, I want to cancel a running slow harvest, so that I am never trapped waiting on a tab.
15. As a listener, I want the slow harvest to leave the player as it found it — same position, same volume, same speed — so that using the tool does not disrupt watching.
16. As a listener, I want to know which source produced a transcript, so that when quality is poor I know whether to blame the harvest.
17. As a listener, I want a clear message when I click the button somewhere that is not a YouTube video page, so that nothing fails silently.
18. As a listener, I want to see that something is happening while the transcript is being fetched, so that I do not click twice.
19. As a listener, I want a failure to tell me what went wrong in plain language, so that I know whether to retry or give up.
20. As a listener, I want repeated clicks on the same video to be safe, so that an impatient double-click does not start two harvests.
21. As a listener, I want long episodes to work, so that a three-hour interview is not silently truncated.
22. As a listener, I want the transcript to preserve sentence boundaries where the captions imply them, so that the prose is readable rather than one unbroken run.

## Implementation Decisions

**Shape.** A Manifest V3 Chrome extension in TypeScript, matching the house convention across sibling projects. Bundled with Vite. No framework for the popup — it has one button and a status line.

**The one seam: `TranscriptSource`.** Each source is asked for an episode and either returns one or declines with a reason. Sources are tried in order; the first that returns wins. This is the only place DOM and network dependencies live, and the only thing tests need to fake.

Two implementations ship:

- **Panel source (fast path).** Reads the whole transcript in one shot from YouTube's own transcript panel. Roughly one second.
- **Caption harvest source (fallback).** Plays the video muted at an increased rate and observes caption nodes as the player renders them. Bounded by playback speed.

**The fast path is unverified.** Reading the transcript panel failed under automation today, and the cause was never established — it may have been an artefact of how it was driven, or a real block. The `get_transcript` endpoint separately rejected a hand-built request. Because the entire user experience turns on whether the fast path works, **the first piece of work is a spike to settle it**, before any other code is written. If it turns out to be genuinely unavailable, the slow harvest becomes the only path and the product needs rethinking — a tool that takes thirty minutes per episode is a different tool.

**Track selection.** Prefer, in order: human-written in the original language, then auto-generated in the original language, then anything else accompanied by a warning. Auto-translated tracks are never chosen silently, because machine translation stacked on machine transcription compounds errors.

**Output.** Clipboard only. No file writing, so the File System Access API and its permission lifecycle are avoided entirely. The clipboard write happens from the popup, where a user gesture is already present.

**Format.** Metadata header, then the chapter list when present, then continuous prose. No per-line timestamps — they roughly double the token count and fragment sentences, and the chapter list already provides the navigational value at a fraction of the cost.

**Deduplication is the hard part of the fallback.** Caption nodes re-render as lines roll, so the same words appear repeatedly across mutations. Naive concatenation produces heavy duplication. Text must be reconciled against what has already been captured rather than appended blindly. This is the single most likely source of silent quality loss and deserves the most test attention.

**Player restoration.** The fallback mutates playback position, rate and mute state. The prior state is captured before starting and restored afterwards, including when the harvest is cancelled or errors.

## Testing Decisions

**What a good test looks like here.** Tests exercise external behaviour through the seam — given a page in a known state, what lands on the clipboard. They do not assert on internal call sequences or private structure. A test that breaks when the code is reorganised but the output is unchanged is a bad test.

**The formatter** is a pure function from episode to string and carries the most tests: header rendering, chapters present and absent, prose reconstruction from segments, sentence-boundary preservation, and long-episode handling. No DOM, no mocks, no seam — call it with fixture objects.

**Source selection and fallback** are tested through the `TranscriptSource` seam with fakes: fast path succeeds; fast path declines and the fallback runs; both decline and the refusal message is produced; only an auto-translated track exists and the warning appears.

**Deduplication** is tested against recorded caption-mutation sequences captured from real playback, including the rolling two-line case, repeated identical frames, and mid-word updates. These are the highest-value tests in the project.

**What is not unit tested:** the panel source and the live player interaction. Both are thin adapters over a third-party DOM that changes without notice, so fixtures would give false confidence. They are verified by hand against real videos, and the fallback chain exists precisely because they are expected to break.

There is no prior art in this repo — it is greenfield.

## Out of Scope

- **Summarising.** Raw transcript only.
- **Speech-to-text.** See ADR 0002. Uncaptioned episodes are refused.
- **Anything but YouTube.** No Spotify, Apple Podcasts, or arbitrary audio.
- **Saving to disk.** Clipboard only. Revisit if archiving turns out to be wanted.
- **Headless or batch operation.** Impossible by construction — see ADR 0001.
- **Publishing to the Chrome Web Store.** Personal tool, loaded unpacked.
- **Multi-language output.** Original language only.

## Further Notes

The project name is a mild misnomer: it harvests transcripts and never transcribes. Kept because it is short and the directory already exists.

Two decisions were made without grilling and are noted as reversible defaults rather than settled: Vite as the bundler, and the toolbar button as the trigger. Neither is load-bearing.
