const BARE_ID = /^[\w-]{11}$/;
/** Pull the video id out of any form of YouTube link, or undefined if it isn't one. */
export function videoIdFrom(input) {
    const trimmed = input.trim();
    if (BARE_ID.test(trimmed))
        return trimmed;
    let url;
    try {
        url = new URL(trimmed);
    }
    catch {
        return undefined;
    }
    if (url.hostname === "youtu.be") {
        const id = url.pathname.slice(1);
        return BARE_ID.test(id) ? id : undefined;
    }
    if (!url.hostname.endsWith("youtube.com"))
        return undefined;
    const id = url.searchParams.get("v");
    return id && BARE_ID.test(id) ? id : undefined;
}
