/* @vitest-environment jsdom */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadDropzone from '../../src/components/UploadDropzone';

vi.mock('../../src/lib/uploads/validate', () => ({
  validateUpload: (_: any) => ({ ok: false, reason: 'mime' }),
}));

describe('UploadDropzone', () => {
  it('shows an error when validation fails (non-image)', async () => {
    render(<UploadDropzone />);
    const input = await screen.findByLabelText(/上传|upload/i);
    const file = new File(['%PDF-1.4'], 'doc.pdf', { type: 'application/pdf' });
    await userEvent.upload(input as HTMLInputElement, file);
    expect(await screen.findByText(/mime|文件类型/i)).toBeInTheDocument();
  });
});

