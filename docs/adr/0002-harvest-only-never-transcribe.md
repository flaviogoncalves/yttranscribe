# Harvest only — never transcribe

The tool obtains transcripts that already exist and never creates one. An episode with no caption track is refused with a clear message explaining why, rather than falling back to speech-to-text over captured audio.

This is deliberate, not an unfinished feature. Adding Whisper would pull in tab audio capture, a per-episode API bill, minutes of latency, and a whole second class of failure — all to serve the minority of episodes YouTube hasn't already captioned.

## Consequences

No `tabCapture` permission, no audio pipeline, no transcription cost. The project name is a mild misnomer: it never transcribes.

A future reader will notice speech-to-text is "missing" and be tempted to add it. That is the thing this record exists to prevent — reopen it only if uncaptioned episodes turn out to be common in practice, which today they are not.
