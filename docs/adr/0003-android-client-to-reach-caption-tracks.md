# Fetch captions as the Android client

Supersedes [ADR 0001](./0001-browser-extension-because-sabr-killed-server-side-captions.md).

We call `POST /youtubei/v1/player` identifying as `clientName: "ANDROID"`, read the caption track URL from the response, and fetch it. That returns the complete timedtext track in one request, with no browser, no playback, and no session.

**The client identity is the entire mechanism.** Caption URLs minted for the `WEB` client carry an `exp=xpe` parameter — a Proof-of-Origin gate we cannot satisfy — and those URLs answer `HTTP 200` with a zero-byte body. URLs minted for the `ANDROID` client carry no `exp` parameter and serve the track normally. Same endpoint, same video, same network: only the claimed client differs.

Verified 2026-08-09 against a 31-minute episode: 948 cues, 5,919 words, captions running to 1860s of an 1860s video — 100% coverage.

## Why ADR 0001 was wrong

ADR 0001 concluded that SABR had made server-side caption fetching impossible, and that only a browser extension could reach captions. Both claims were false, and the reasoning behind them was bad in an instructive way.

The measurement was real: `timedtext` did return empty bodies. The error was inferring a *cause* from that observation and never testing it. Empty responses were attributed to SABR because SABR was visible in the network trace and looked plausible. The actual cause was the client identity, which was never varied. One changed field would have settled it on the first day.

Everything built on that inference — a browser extension, a caption harvester that played episodes at speed, rolling-window deduplication, a progress badge — existed only to work around a constraint that was not real. It also shipped a transcript that was 40% incomplete while reporting success.

## Consequences

The tool is a CLI first; the extension is a convenience wrapper over the same functions. Headless and batch operation both work. No clipboard-only limitation, no permission lifecycle, no dependency on a logged-in browser.

This is unofficial and unsupported. If YouTube extends the Proof-of-Origin gate to the Android client, this stops working — and the honest fallback is then to reconsider a transcript vendor, not to rebuild the harvester.
