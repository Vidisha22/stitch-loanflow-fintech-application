const MAX_WIDTH = 1200;
const JPEG_QUALITY = 0.7;
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const QUALITY_DECREMENT = 0.1;
const MIN_QUALITY = 0.1;

export interface CompressionResult {
  compressed: Blob;
  originalSize: number;
  compressedSize: number;
  originalSizeFormatted: string;
  compressedSizeFormatted: string;
  compressionRatio: string;
  skipped?: boolean;
  reason?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function isImageFile(file: File): boolean {
  return !!(file && file.type && typeof file.type === 'string' && file.type.startsWith('image/'));
}

/**
 * Compress an image file client-side using Canvas API.
 * Resizes to max 1200px width, iteratively reduces JPEG quality until under 2MB.
 */
export function compressImage(file: File): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    if (!isImageFile(file)) {
      return resolve({
        compressed: file,
        originalSize: file.size,
        compressedSize: file.size,
        originalSizeFormatted: formatFileSize(file.size),
        compressedSizeFormatted: formatFileSize(file.size),
        compressionRatio: '0%',
        skipped: true,
        reason: 'Not an image file',
      });
    }

    if (file.size <= MAX_FILE_SIZE) {
      return resolve({
        compressed: file,
        originalSize: file.size,
        compressedSize: file.size,
        originalSizeFormatted: formatFileSize(file.size),
        compressedSizeFormatted: formatFileSize(file.size),
        compressionRatio: '0%',
        skipped: true,
        reason: 'Already under 2MB',
      });
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) {
            const ratio = MAX_WIDTH / width;
            width = MAX_WIDTH;
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0, width, height);

          const quality = JPEG_QUALITY;
          let lastSize = Infinity;

          function attemptCompress(currentQuality: number) {
            canvas.toBlob((blob) => {
              if (!blob) {
                canvas.toBlob((fallbackBlob) => {
                  if (!fallbackBlob) return reject(new Error('Failed to compress image'));
                  resolveWithBlob(fallbackBlob);
                }, 'image/jpeg', Math.max(currentQuality, MIN_QUALITY));
                return;
              }

              if (blob.size <= MAX_FILE_SIZE || currentQuality <= MIN_QUALITY || blob.size >= lastSize) {
                resolveWithBlob(blob);
              } else {
                lastSize = blob.size;
                attemptCompress(Math.max(currentQuality - QUALITY_DECREMENT, MIN_QUALITY));
              }
            }, 'image/jpeg', currentQuality);
          }

          function resolveWithBlob(blob: Blob) {
            const originalSize = file.size;
            const compressedSize = blob.size;
            const ratio = originalSize > 0
              ? ((1 - compressedSize / originalSize) * 100).toFixed(1) + '%'
              : '0%';

            resolve({
              compressed: blob,
              originalSize,
              compressedSize,
              originalSizeFormatted: formatFileSize(originalSize),
              compressedSizeFormatted: formatFileSize(compressedSize),
              compressionRatio: ratio,
            });
          }

          attemptCompress(quality);
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target!.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/** Create a File from a compressed Blob */
export function blobToFile(blob: Blob, originalName: string): File {
  const name = originalName.replace(/\.[^.]+$/, '') + '.jpg';
  return new File([blob], name, { type: 'image/jpeg' });
}