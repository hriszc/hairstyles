import { describe, it, expect, beforeEach } from "vitest";
import { BASE_URL, TEXT_MODEL, IMAGE_MODEL, getApiKeysFromEnv, pickApiKey, createClientConfig } from "../src/lib/ai/aiClient";

describe("AI Client constants", () => {
  it("should expose correct base URL and model names", () => {
    expect(BASE_URL).toBe("https://api.ai-wave.org");
    expect(TEXT_MODEL).toBe("gemini-2.5-flash");
    expect(IMAGE_MODEL).toBe("gemini-2.5-flash-image-preview");
  });
});

describe("API keys handling", () => {
  const ENV = "REPLICATE_API_KEYS";

  it("parses comma-separated keys from env, trimming blanks", () => {
    const old = process.env[ENV];
    process.env[ENV] = "k1, k2, , k3 ";
    const keys = getApiKeysFromEnv();
    expect(keys).toEqual(["k1", "k2", "k3"]);
    process.env[ENV] = old;
  });

  it("supports round-robin pick across calls using state", () => {
    const keys = ["a", "b", "c"];
    const state = { current: 0 };
    expect(pickApiKey(keys, state)).toBe("a");
    expect(state.current).toBe(1);
    expect(pickApiKey(keys, state)).toBe("b");
    expect(state.current).toBe(2);
    expect(pickApiKey(keys, state)).toBe("c");
    expect(state.current).toBe(0); // wraps around
    expect(pickApiKey(keys, state)).toBe("a");
  });
});

describe("Client config", () => {
  it("returns config with baseURL and apiKey", () => {
    const cfg = createClientConfig("secret-key");
    expect(cfg).toEqual({ apiKey: "secret-key", baseURL: BASE_URL });
  });
});

