import { describe, it, expect } from "vitest";
import { formatForClipboard } from "./formatForClipboard.js";
import type { Episode } from "./episode.js";

const anEpisode = (overrides: Partial<Episode> = {}): Episode => ({
  title: "An Episode",
  channel: "A Channel",
  url: "https://www.youtube.com/watch?v=abc123",
  chapters: [],
  segments: [],
  ...overrides,
});

describe("formatForClipboard", () => {
  it("leads with the episode title", () => {
    const output = formatForClipboard(anEpisode({ title: "Why Robotics Isn't Solved" }));

    expect(output.startsWith("# Why Robotics Isn't Solved\n")).toBe(true);
  });

  it("identifies the channel and links back to the source", () => {
    const output = formatForClipboard(
      anEpisode({
        channel: "Y Combinator",
        url: "https://www.youtube.com/watch?v=myDCd0hNqQU",
      }),
    );

    expect(output).toContain("**Channel:** Y Combinator");
    expect(output).toContain("**URL:** https://www.youtube.com/watch?v=myDCd0hNqQU");
  });

  it("reports publish date and a human-readable duration when known", () => {
    // 5052s = 84.2 minutes = 1h 24m.
    const output = formatForClipboard(
      anEpisode({ publishedAt: "2026-07-29", durationSeconds: 5052 }),
    );

    expect(output).toContain("**Published:** 2026-07-29");
    expect(output).toContain("**Duration:** 1h 24m");
  });

  it("renders a sub-hour duration without an hours component", () => {
    // 1037s = 17.28 minutes = 17m.
    const output = formatForClipboard(anEpisode({ durationSeconds: 1037 }));

    expect(output).toContain("**Duration:** 17m");
  });

  it("omits unknown fields entirely rather than emitting a blank or a placeholder", () => {
    const output = formatForClipboard(anEpisode());

    expect(output).not.toContain("Published:");
    expect(output).not.toContain("Duration:");
    expect(output).not.toMatch(/unknown/i);
    expect(output).not.toMatch(/\*\*\w+:\*\*\s*$/m);
  });

  it("lists chapters in order with their timestamps", () => {
    const output = formatForClipboard(
      anEpisode({
        chapters: [
          { startSeconds: 0, title: "Intro" },
          { startSeconds: 479, title: "MEM" }, // 7m59s
          { startSeconds: 1221, title: "Embodied Reasoning" }, // 20m21s
          { startSeconds: 4110, title: "World action models" }, // 1h08m30s
        ],
      }),
    );

    expect(output).toContain("## Chapters");
    expect(output).toContain("- 0:00 — Intro");
    expect(output).toContain("- 7:59 — MEM");
    expect(output).toContain("- 20:21 — Embodied Reasoning");
    expect(output).toContain("- 1:08:30 — World action models");
  });

  it("omits the chapter section entirely when the video has none", () => {
    const output = formatForClipboard(anEpisode({ chapters: [] }));

    expect(output).not.toContain("## Chapters");
  });

  it("joins caption fragments into continuous prose", () => {
    // Fragments break on caption-box width, not on meaning — the sentence
    // must survive the joins intact.
    const output = formatForClipboard(
      anEpisode({
        segments: [
          { text: "I go solo on this one to break down" },
          { text: "graph engineering, the term I keep" },
          { text: "seeing go viral on X." },
        ],
      }),
    );

    expect(output).toContain(
      "I go solo on this one to break down graph engineering, the term I keep seeing go viral on X.",
    );
  });

  it("renders the whole document with the expected section order and spacing", () => {
    // Expected document written by hand from the spec, not captured from a run.
    const output = formatForClipboard({
      title: "Test Episode",
      channel: "A Channel",
      publishedAt: "2026-08-09",
      durationSeconds: 3661, // 1h 1m 1s
      url: "https://www.youtube.com/watch?v=abc123",
      chapters: [
        { startSeconds: 0, title: "Intro" },
        { startSeconds: 61, title: "Middle" },
      ],
      segments: [{ text: "Hello there" }, { text: "world." }],
    });

    expect(output).toBe(
      [
        "# Test Episode",
        "",
        "**Channel:** A Channel",
        "**Published:** 2026-08-09",
        "**Duration:** 1h 1m",
        "**URL:** https://www.youtube.com/watch?v=abc123",
        "",
        "## Chapters",
        "",
        "- 0:00 — Intro",
        "- 1:01 — Middle",
        "",
        "## Transcript",
        "",
        "Hello there world.",
      ].join("\n"),
    );
  });

  it("handles the one-hour boundary in both duration and chapter timestamps", () => {
    const justUnder = formatForClipboard(
      anEpisode({
        durationSeconds: 3599,
        chapters: [{ startSeconds: 3599, title: "Just under" }],
      }),
    );
    expect(justUnder).toContain("**Duration:** 59m");
    expect(justUnder).toContain("- 59:59 — Just under");

    const exactlyOnHour = formatForClipboard(
      anEpisode({
        durationSeconds: 3600,
        chapters: [{ startSeconds: 3600, title: "On the hour" }],
      }),
    );
    expect(exactlyOnHour).toContain("**Duration:** 1h 0m");
    expect(exactlyOnHour).toContain("- 1:00:00 — On the hour");
  });

  it("never emits per-line timestamps in the transcript", () => {
    const output = formatForClipboard(
      anEpisode({
        segments: [{ text: "single context is the way to" }, { text: "go for most repos." }],
      }),
    );

    const transcript = output.slice(output.indexOf("## Transcript"));
    expect(transcript).not.toMatch(/\d+:\d{2}/);
  });
});
