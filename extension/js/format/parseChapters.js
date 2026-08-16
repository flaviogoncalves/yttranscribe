const CHAPTER_LINE = /^\s*(?:(\d+):)?(\d{1,2}):(\d{2})\s*[-–—:]?\s+(.+?)\s*$/;
/**
 * Chapters come from the video's own description, written by the uploader as
 * timestamped lines. Accepts `m:ss` and `h:mm:ss`, with or without a dash.
 * A description with no timestamped lines yields no chapters — that is normal.
 */
export function parseChapters(description) {
    const chapters = [];
    for (const line of description.split("\n")) {
        const match = CHAPTER_LINE.exec(line);
        if (!match)
            continue;
        const [, h, m, s, title] = match;
        const startSeconds = Number(h ?? 0) * 3600 + Number(m) * 60 + Number(s);
        // Uploaders conventionally open at 0:00; anything else first is prose that
        // merely happens to contain a timestamp.
        if (chapters.length === 0 && startSeconds !== 0)
            continue;
        chapters.push({ startSeconds, title: title });
    }
    return chapters;
}
