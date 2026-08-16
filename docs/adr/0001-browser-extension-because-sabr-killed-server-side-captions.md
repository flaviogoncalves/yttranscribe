# Ship as a browser extension, because server-side caption fetch is dead

YouTube now delivers media via SABR: playback is a POST to `/videoplayback` with `sabr=1`, and captions are multiplexed into that stream rather than served as a separate `timedtext` request. Measured 2026-08-08 across three videos, the standalone `timedtext` endpoint returns **HTTP 200 with a zero-byte body** — it answers, but no longer carries content. We therefore ship as a browser extension rather than a CLI, because only code running inside a real playing player can reach the captions at all.

## Considered options

- **CLI wrapping `yt-dlp`** — the obvious choice, and what this repo was originally named for. Rejected because it inherits the same dead endpoint; any tool that works today does so by tracking YouTube's token scheme, which is a permanent maintenance tax.
- **Server-side scrape via third-party transcript sites** — rejected: `youtubetotranscript.com` and `youtubetranscript.com` both 403 server-side fetches, and coverage depends on whether an episode happens to be indexed.
- **YouTube Data API v3 `captions.download`** — rejected because it is impossible, not because it is undesirable. It requires OAuth from the video's *owner*; any video you do not own returns 403. There is no official endpoint for third-party transcripts. Do not revisit this one.
- **A paid third-party transcript API** (Supadata, TranscriptAPI, youtube-transcript.io, and others) — these work, cost roughly $0–5/month at personal volume, and would shrink this project enormously: no caption harvesting, no deduplication, and batch operation becomes possible. **Rejected on principle.** They are reverse-engineering YouTube too; buying one means renting a solution from a vendor who can raise prices, break, or disappear, and who sees every URL. A tool this small should not have a dependency that can die. If the extension ever breaks, the fix is ours to make.

## Consequences

The tool can only ever work on a machine with a logged-in browser and the tab open. There is no headless or batch mode, and there cannot be one without solving token generation. Accept this rather than fighting it.

---

> **Superseded by [ADR 0003](./0003-android-client-to-reach-caption-tracks.md) on 2026-08-09.** The conclusion below is wrong. Captions are reachable server-side; the empty responses were caused by the WEB client identity, not by SABR. Kept as a record of the mistake.
