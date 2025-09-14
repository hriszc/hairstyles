// Constants per docs
export const BASE_URL = "https://api.ai-wave.org";
export const TEXT_MODEL = "gemini-2.5-flash";
export const IMAGE_MODEL = "gemini-2.5-flash-image-preview";

export function getApiKeysFromEnv(envVar = "REPLICATE_API_KEYS"): string[] {
  // TDD: implement later
  throw new Error("Not implemented: getApiKeysFromEnv");
}

export function pickApiKey(keys: string[], state: { current: number } = { current: 0 }): string {
  // TDD: implement later (round-robin expected by tests)
  throw new Error("Not implemented: pickApiKey");
}

export function createClientConfig(apiKey: string) {
  // TDD: implement later; should return shape used to build OpenAI client
  throw new Error("Not implemented: createClientConfig");
}

