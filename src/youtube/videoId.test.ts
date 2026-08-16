import { describe, it, expect } from "vitest";
import { videoIdFrom } from "./videoId.js";

describe("videoIdFrom", () => {
  it("reads a standard watch URL", () => {
    expect(videoIdFrom("https://www.youtube.com/watch?v=5d6y3poKwK4")).toBe("5d6y3poKwK4");
  });

  it("ignores trailing parameters like a timestamp", () => {
    expect(videoIdFrom("https://www.youtube.com/watch?v=M6mYodf0dJM&t=10s")).toBe("M6mYodf0dJM");
  });

  it("reads a short youtu.be link", () => {
    expect(videoIdFrom("https://youtu.be/I4B37S1dyQQ?si=abc")).toBe("I4B37S1dyQQ");
  });

  it("accepts a bare video id", () => {
    expect(videoIdFrom("myDCd0hNqQU")).toBe("myDCd0hNqQU");
  });

  it("rejects anything that is not a video", () => {
    expect(videoIdFrom("https://www.youtube.com/@ycombinator")).toBeUndefined();
    expect(videoIdFrom("not a url")).toBeUndefined();
  });
});
