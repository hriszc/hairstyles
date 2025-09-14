import { describe, it, expect } from "vitest";
import { validateUpload, type UploadMeta } from "../src/lib/uploads/validate";

const MAX = 10 * 1024 * 1024; // 10MB

describe("Upload validation", () => {
  it("rejects non-image mime types", () => {
    const meta: UploadMeta = { mime: "application/pdf", sizeBytes: 1234, width: 800, height: 800 };
    const res = validateUpload(meta);
    expect(res).toEqual({ ok: false, reason: "mime" });
  });

  it("rejects oversized files (>10MB)", () => {
    const meta: UploadMeta = { mime: "image/jpeg", sizeBytes: MAX + 1, width: 1024, height: 1024 };
    const res = validateUpload(meta);
    expect(res).toEqual({ ok: false, reason: "size" });
  });

  it("rejects images with too small dimensions (<256x256)", () => {
    const meta: UploadMeta = { mime: "image/png", sizeBytes: 1024, width: 200, height: 255 };
    const res = validateUpload(meta);
    expect(res).toEqual({ ok: false, reason: "dimensions" });
  });

  it("accepts valid jpeg under size with adequate dimensions", () => {
    const meta: UploadMeta = { mime: "image/jpeg", sizeBytes: 2 * 1024 * 1024, width: 1024, height: 768 };
    const res = validateUpload(meta);
    expect(res).toEqual({ ok: true });
  });
});

