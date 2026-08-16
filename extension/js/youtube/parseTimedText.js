const CUE = /<p\s+t="(\d+)"[^>]*>([\s\S]*?)<\/p>/g;
const ENTITIES = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&nbsp;": " ",
};
/**
 * Parse a timedtext (srv3) track into cues.
 *
 * Cues may contain per-word `<s>` spans for karaoke-style highlighting; those
 * are flattened, since we want sentences rather than word timings. Written
 * with regexes rather than DOMParser because the extension runs on a page
 * whose Trusted Types policy forbids it.
 */
export function parseTimedText(xml) {
    const cues = [];
    for (const match of xml.matchAll(CUE)) {
        const text = decode(stripTags(match[2] ?? ""));
        if (text.length === 0)
            continue;
        cues.push({ startSeconds: Number(match[1]) / 1000, text });
    }
    return cues;
}
function stripTags(fragment) {
    return fragment.replace(/<[^>]*>/g, "");
}
function decode(text) {
    return text
        .replace(/&(?:amp|lt|gt|quot|#39|apos|nbsp);/g, (entity) => ENTITIES[entity] ?? entity)
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/\s+/g, " ")
        .trim();
}
