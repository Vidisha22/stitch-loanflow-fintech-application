import { ALLOWED_DOCUMENT_TYPES, MAX_UPLOAD_SIZE } from '../types';
import type { AllowedMimeType } from '../types';

interface ValidationResult {
  valid: boolean;
  error?: string;
}

function validateFileType(file: File): ValidationResult {
  const isValid = ALLOWED_DOCUMENT_TYPES.includes(file.type as AllowedMimeType);
  if (!isValid) {
    const allowed = ALLOWED_DOCUMENT_TYPES.map((t) => t.split('/')[1].toUpperCase()).join(', ');
    return {
      valid: false,
      error: `Unsupported file type "${file.type || 'unknown'}". Allowed: ${allowed}`,
    };
  }
  return { valid: true };
}

function validateFileSize(file: File): ValidationResult {
  if (file.size > MAX_UPLOAD_SIZE) {
    return {
      valid: false,
      error: `File size (${formatFileSize(file.size)}) exceeds the maximum of ${formatFileSize(MAX_UPLOAD_SIZE)}`,
    };
  }
  return { valid: true };
}

export function validateDocument(file: File): ValidationResult {
  const typeResult = validateFileType(file);
  if (!typeResult.valid) return typeResult;
  const sizeResult = validateFileSize(file);
  if (!sizeResult.valid) return sizeResult;
  return { valid: true };
}

/**
 * Generate a file preview URL for image files.
 * Returns null for non-image files (e.g., PDF).
 */
export function generateFilePreview(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

/**
 * Format file size in human-readable format.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Generate a unique document ID.
 */
export function generateDocumentId(): string {
  return `doc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get a human-readable file type label.
 */
export function getFileTypeLabel(mimeType: string): string {
  const map: Record<string, string> = {
    'application/pdf': 'PDF',
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
  };
  return map[mimeType] || mimeType.split('/')[1].toUpperCase();
}