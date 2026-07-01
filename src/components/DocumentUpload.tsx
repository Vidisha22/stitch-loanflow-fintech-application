import { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import type { FileRejection } from 'react-dropzone';
import {
  validateDocument,
  generateFilePreview,
  formatFileSize,
  generateDocumentId,
  getFileTypeLabel,
} from '../utils/documentValidation';
import { ALLOWED_DOCUMENT_TYPES } from '../types';
import type { UploadedDocument, UploadProgressConfig } from '../types';

interface DocumentUploadProps {
  /** Array of currently uploaded documents */
  documents: UploadedDocument[];
  /** Called when a new document is successfully added */
  onDocumentAdd: (doc: UploadedDocument) => void;
  /** Called when a document should be removed */
  onDocumentRemove: (docId: string) => void;
  /** Maximum number of documents allowed (default: 5) */
  maxDocuments?: number;
  /** Upload progress simulation config */
  uploadConfig?: UploadProgressConfig;
}

const DEFAULT_UPLOAD_CONFIG: UploadProgressConfig = {
  minDuration: 1500,
  maxDuration: 3000,
  interval: 100,
};

/**
 * Document upload component with drag-and-drop, file validation,
 * preview generation, and simulated upload progress.
 */
export function DocumentUpload({
  documents,
  onDocumentAdd,
  onDocumentRemove,
  maxDocuments = 5,
  uploadConfig = DEFAULT_UPLOAD_CONFIG,
}: DocumentUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const abortRef = useRef<(() => void) | null>(null);

  // Cleanup upload simulation on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.();
    };
  }, []);

  const simulateUpload = useCallback(
    (doc: UploadedDocument) => {
      const duration =
        uploadConfig.minDuration +
        Math.random() * (uploadConfig.maxDuration - uploadConfig.minDuration);
      let elapsed = 0;
      let aborted = false;

      const tick = () => {
        if (aborted) return;
        elapsed += uploadConfig.interval;
        const progress = Math.min(Math.round((elapsed / duration) * 100), 100);
        onDocumentAdd({
          ...doc,
          uploadProgress: progress,
        });

        if (progress < 100) {
          setTimeout(tick, uploadConfig.interval);
        } else {
          setUploadingId(null);
          abortRef.current = null;
        }
      };

      abortRef.current = () => {
        aborted = true;
        setUploadingId(null);
      };

      setUploadingId(doc.id);
      setTimeout(tick, uploadConfig.interval);
    },
    [uploadConfig, onDocumentAdd]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejections: FileRejection[]) => {
      setError(null);

      // Handle rejections from react-dropzone
      if (rejections.length > 0) {
        const rejection = rejections[0];
        if (rejection.errors[0]?.code === 'file-too-large') {
          setError(`File "${rejection.file.name}" exceeds the maximum size of ${formatFileSize(10 * 1024 * 1024)}`);
        } else if (rejection.errors[0]?.code === 'file-invalid-type') {
          setError(`File "${rejection.file.name}" has an unsupported format. Allowed: PDF, JPG, PNG`);
        } else {
          setError(rejection.errors[0]?.message || 'Invalid file');
        }
        return;
      }

      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      // Manual validation (double-check)
      const validation = validateDocument(file);
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        return;
      }

      // Check max documents limit
      if (documents.length >= maxDocuments) {
        setError(`Maximum of ${maxDocuments} documents allowed. Remove an existing document first.`);
        return;
      }

      // Generate preview for images
      const preview = await generateFilePreview(file);

      const newDoc: UploadedDocument = {
        id: generateDocumentId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview,
        uploadedAt: Date.now(),
        uploadProgress: 0,
      };

      onDocumentAdd(newDoc);
      simulateUpload(newDoc);
    },
    [documents, maxDocuments, onDocumentAdd, simulateUpload]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 10 * 1024 * 1024,
    maxFiles: 1,
    disabled: documents.length >= maxDocuments || uploadingId !== null,
    multiple: false,
  });

  const dropzoneBorderClass = isDragReject
    ? 'border-error bg-error/5'
    : isDragAccept
      ? 'border-secondary bg-secondary/5'
      : isDragActive
        ? 'border-secondary bg-secondary/5'
        : 'border-outline-variant bg-surface-container-lowest';

  const isDisabled = documents.length >= maxDocuments || uploadingId !== null;

  return (
    <div className="space-y-base">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-lg text-center cursor-pointer transition-all duration-200 ${dropzoneBorderClass} ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-secondary hover:bg-secondary/5'
        }`}
        role="button"
        tabIndex={0}
        aria-label="Upload document area"
      >
        <input {...getInputProps()} aria-label="File input for document upload" />
        <div className="flex flex-col items-center gap-sm">
          <span
            className={`material-symbols-outlined text-[40px] ${
              isDragActive ? 'text-secondary' : 'text-on-surface-variant'
            }`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isDragActive ? 'cloud_upload' : 'upload_file'}
          </span>
          {isDragActive ? (
            <p className="font-body-md text-body-md text-secondary font-medium">
              Drop your document here...
            </p>
          ) : (
            <>
              <p className="font-body-md text-body-md text-on-surface font-medium">
                Drag & drop your document here
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                or click to browse files
              </p>
            </>
          )}
          <div className="flex gap-sm mt-xs">
            {ALLOWED_DOCUMENT_TYPES.map((mime) => (
              <span
                key={mime}
                className="px-sm py-xs rounded-full bg-surface-container-high font-label-xs text-label-xs text-on-surface-variant"
              >
                {getFileTypeLabel(mime)}
              </span>
            ))}
            <span className="px-sm py-xs rounded-full bg-surface-container-high font-label-xs text-label-xs text-on-surface-variant">
              Max 10MB
            </span>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div
          className="flex items-start gap-xs p-sm rounded-lg bg-error/10 border border-error/20"
          role="alert"
        >
          <span
            className="material-symbols-outlined text-error text-[18px] mt-[2px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            error
          </span>
          <p className="font-label-sm text-label-sm text-error flex-1">{error}</p>
          <button
            type="button"
            className="text-error hover:opacity-70 transition-opacity"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Uploaded documents list */}
      {documents.length > 0 && (
        <div className="space-y-sm">
          <p className="font-label-md text-label-md text-on-surface">
            Uploaded Documents ({documents.length}/{maxDocuments})
          </p>
          <ul className="space-y-sm">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center gap-sm p-sm rounded-lg border border-outline-variant bg-surface-container-lowest transition-all"
              >
                {/* Preview thumbnail */}
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {doc.preview ? (
                    <img
                      src={doc.preview}
                      alt={`Preview of ${doc.name}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-on-surface-variant text-[24px]">
                      description
                    </span>
                  )}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="font-label-md text-label-md text-on-surface truncate">{doc.name}</p>
                  <div className="flex items-center gap-xs font-label-xs text-label-xs text-on-surface-variant">
                    <span>{getFileTypeLabel(doc.type)}</span>
                    <span>·</span>
                    <span>{formatFileSize(doc.size)}</span>
                  </div>
                </div>

                {/* Progress or status */}
                {doc.uploadProgress < 100 ? (
                  <div className="flex items-center gap-xs min-w-[100px]">
                    <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                      <div
                        className="h-full rounded-full bg-secondary transition-all duration-200 ease-out"
                        style={{ width: `${doc.uploadProgress}%` }}
                      />
                    </div>
                    <span className="font-label-xs text-label-xs text-secondary min-w-[36px] text-right">
                      {doc.uploadProgress}%
                    </span>
                  </div>
                ) : (
                  <span className="flex items-center gap-xs text-green-600 font-label-xs text-label-xs">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    Uploaded
                  </span>
                )}

                {/* Remove button */}
                <button
                  type="button"
                  className="p-1 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-error transition-all"
                  onClick={() => onDocumentRemove(doc.id)}
                  aria-label={`Remove ${doc.name}`}
                  disabled={doc.uploadProgress < 100}
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}