/**
 * Pure Base64 -> Uint8Array decoder used to safely open or download embedded
 * PDF data URIs in standalone single-file HTML builds (since Chrome/Edge block
 * top-level navigation to `data:application/pdf;base64,...` URLs).
 */
export function isBase64PdfDataUri(url: string): boolean {
  return url.startsWith('data:application/pdf;base64,');
}

export function decodeBase64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function openOrDownloadPdf(
  pdfUrl: string,
  filename = 'G-Sri-Vignesh-VEDA-2K26-Certificate.pdf',
): void {
  if (!isBase64PdfDataUri(pdfUrl)) {
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
    return;
  }

  const base64 = pdfUrl.slice('data:application/pdf;base64,'.length);
  const bytes = decodeBase64ToBytes(base64);
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 60_000);
}
