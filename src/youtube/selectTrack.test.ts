import { describe, it, expect } from "vitest";
import { selectTrack } from "./selectTrack.js";

const asr = (lang: string) => ({ languageCode: lang, kind: "asr", baseUrl: `u-${lang}-asr` });
const manual = (lang: string) => ({ languageCode: lang, baseUrl: `u-${lang}-manual` });

describe("selectTrack", () => {
  it("prefers a human-written track over an auto-generated one", () => {
    const chosen = selectTrack([asr("en"), manual("en")], "en");

    expect(chosen?.track.baseUrl).toBe("u-en-manual");
    expect(chosen?.warning).toBeUndefined();
  });

  it("takes the auto-generated original when that is all there is", () => {
    const chosen = selectTrack([asr("en")], "en");

    expect(chosen?.track.baseUrl).toBe("u-en-asr");
    expect(chosen?.warning).toBeUndefined();
  });

  it("never silently prefers another language over the original", () => {
    // A Brazilian session may list pt first; the talk is still in English.
    const chosen = selectTrack([manual("pt"), asr("en")], "en");

    expect(chosen?.track.languageCode).toBe("en");
  });

  it("warns when only a non-original language is available", () => {
    const chosen = selectTrack([manual("pt")], "en");

    expect(chosen?.track.languageCode).toBe("pt");
    expect(chosen?.warning).toMatch(/pt/);
  });

  it("declines when there are no tracks at all", () => {
    expect(selectTrack([], "en")).toBeUndefined();
  });

  it("falls back to the first track when the original language is unknown", () => {
    const chosen = selectTrack([asr("de")], undefined);

    expect(chosen?.track.languageCode).toBe("de");
  });
});
