export type UploadMeta = {
  mime: string;
  sizeBytes: number;
  width?: number;
  height?: number;
};

export type ValidationResult = { ok: true } | { ok: false; reason: string };

export function validateUpload(meta: UploadMeta): ValidationResult {
  // TDD: implement later according to tests
  throw new Error("Not implemented: validateUpload");
}

