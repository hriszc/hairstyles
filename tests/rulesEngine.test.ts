import { describe, it, expect } from "vitest";
import { generateRecommendation } from "../src/lib/rules/engine";

describe("Rules engine", () => {
  it("returns structured recommendation with required fields", () => {
    const rec = generateRecommendation({
      faceShape: "oval",
      hairline: "normal",
      hairVolume: "medium",
      hairTexture: "straight",
      skinTone: "neutral",
      scenario: "commute",
    });

    expect(rec).toBeTruthy();
    expect(typeof rec.hairstyleName).toBe("string");
    expect(rec.hairstyleName.length).toBeGreaterThan(0);
    expect(rec.barberCard).toBeTypeOf("object");
    expect(Array.isArray(rec.outfits)).toBe(true);
    expect(rec.outfits.length).toBeGreaterThan(0);
    expect(rec.colors && Array.isArray(rec.colors.palette || [])).toBe(true);
  });

  it("scenario influences output (job vs campus)", () => {
    const job = generateRecommendation({ faceShape: "heart", scenario: "job" });
    const campus = generateRecommendation({ faceShape: "heart", scenario: "campus" });
    expect(job.scenarioTag).toBe("business-casual");
    expect(campus.scenarioTag).toBe("campus-casual");
  });
});

