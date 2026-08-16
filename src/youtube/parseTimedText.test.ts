import { describe, it, expect } from "vitest";
import { parseTimedText } from "./parseTimedText.js";

// Shape taken from a real srv3 response.
const XML = `<?xml version="1.0" encoding="utf-8" ?><timedtext format="3">
<head><ws id="0"/><wp id="0"/></head>
<body>
<p t="1200" d="2400">Okay, Patrick. Thanks so much for being</p>
<p t="3600" d="1800">here. Welcome to Startup School.</p>
<p t="5400" d="2000">&gt;&gt; Great to be here &amp; thanks.</p>
</body>
</timedtext>`;

describe("parseTimedText", () => {
  it("reads every cue with its start time", () => {
    const cues = parseTimedText(XML);

    expect(cues).toHaveLength(3);
    expect(cues[0]).toEqual({ startSeconds: 1.2, text: "Okay, Patrick. Thanks so much for being" });
    expect(cues[2]?.startSeconds).toBe(5.4);
  });

  it("decodes XML entities", () => {
    expect(parseTimedText(XML)[2]?.text).toBe(">> Great to be here & thanks.");
  });

  it("flattens per-word timing spans into plain text", () => {
    const withSpans = `<timedtext><body><p t="0" d="900"><s t="0">Hello</s><s t="300"> there</s></p></body></timedtext>`;

    expect(parseTimedText(withSpans)[0]?.text).toBe("Hello there");
  });

  it("skips cues that carry no words", () => {
    const withBlanks = `<timedtext><body><p t="0" d="10"></p><p t="500" d="900">real</p><p t="2000" d="10">   </p></body></timedtext>`;

    expect(parseTimedText(withBlanks)).toEqual([{ startSeconds: 0.5, text: "real" }]);
  });

  it("returns nothing for a track with no cues", () => {
    expect(parseTimedText(`<timedtext><body></body></timedtext>`)).toEqual([]);
  });
});
