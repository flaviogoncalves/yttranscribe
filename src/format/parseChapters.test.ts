import { describe, it, expect } from "vitest";
import { parseChapters } from "./parseChapters.js";

describe("parseChapters", () => {
  it("reads timestamped lines from a description", () => {
    // Shape taken from the real YC Paper Club description.
    const chapters = parseChapters(
      [
        "Chapters:",
        "0:00 – Intro",
        "7:59 – MEM",
        "1:08:30 – World action models",
        "",
        "Apply to Y Combinator",
      ].join("\n"),
    );

    expect(chapters).toEqual([
      { startSeconds: 0, title: "Intro" },
      { startSeconds: 479, title: "MEM" },
      { startSeconds: 4110, title: "World action models" },
    ]);
  });

  it("yields nothing for a description without a chapter list", () => {
    expect(parseChapters("A video about robots.\nNo timestamps here.")).toEqual([]);
  });

  it("ignores stray timestamps when the list does not open at zero", () => {
    expect(parseChapters("As I said at 4:35 the model diverges.")).toEqual([]);
  });
});
