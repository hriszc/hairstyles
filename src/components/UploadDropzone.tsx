import React from 'react';
import type { ValidationResult } from '../lib/uploads/validate';

export interface UploadDropzoneProps {
  onFileAccepted?: (file: File) => void;
}

export default function UploadDropzone(_props: UploadDropzoneProps) {
  throw new Error('Not implemented: UploadDropzone');
}

