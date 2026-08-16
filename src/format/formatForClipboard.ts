import type { Episode, Segment } from "./episode.js";

/** Turn an episode into the text that lands on the clipboard. */
export function formatForClipboard(episode: Episode): string {
  const header = [
    `**Channel:** ${episode.channel}`,
    episode.publishedAt === undefined ? null : `**Published:** ${episode.publishedAt}`,
    episode.durationSeconds === undefined
      ? null
      : `**Duration:** ${humanDuration(episode.durationSeconds)}`,
    `**URL:** ${episode.url}`,
  ].filter((line): line is string => line !== null);

  const chapters =
    episode.chapters.length === 0
      ? []
      : [
          "",
          "## Chapters",
          "",
          ...episode.chapters.map((c) => `- ${timestamp(c.startSeconds)} — ${c.title}`),
        ];

  const transcript = ["", "## Transcript", "", toProse(episode.segments)];

  return [`# ${episode.title}`, "", ...header, ...chapters, ...transcript].join("\n");
}

/**
 * Caption fragments break on the width of the caption box, not on meaning, so
 * a sentence routinely spans several of them. Join them back into prose.
 */
function toProse(segments: Segment[]): string {
  return segments
    .map((s) => s.text.trim())
    .filter((text) => text.length > 0)
    .join(" ");
}

/** `m:ss`, gaining an `h:mm:ss` form only past the hour. */
function timestamp(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds % 60;
  const ss = String(seconds).padStart(2, "0");
  return hours === 0 ? `${minutes}:${ss}` : `${hours}:${String(minutes).padStart(2, "0")}:${ss}`;
}

/** Whole minutes, with an hours component only when there is one. */
function humanDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
}
