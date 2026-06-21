import { useRef, useEffect, useCallback, useState } from 'react';

interface SignaturePadProps {
  /** Current signature data URL (if re-editing) */
  initialData?: string | null;
  /** Called when signature is saved with the PNG data URL */
  onSave: (dataUrl: string) => void;
  /** Called when signature is cleared */
  onClear: () => void;
  /** Width of the signature pad */
  width?: number;
  /** Height of the signature pad */
  height?: number;
}

/**
 * Custom signature pad component using HTML Canvas.
 * Provides draw, clear, and save functionality.
 * Works with both mouse and touch input.
 */
export function SignaturePad({
  initialData = null,
  onSave,
  onClear,
  width = 500,
  height = 200,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  /** Get canvas coordinates from mouse/touch event */
  const getCoordinates = useCallback(
    (e: MouseEvent | TouchEvent): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      if ('touches' in e) {
        const touch = e.touches[0] || e.changedTouches[0];
        if (!touch) return null;
        return {
          x: (touch.clientX - rect.left) * scaleX,
          y: (touch.clientY - rect.top) * scaleY,
        };
      }
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    []
  );

  /** Draw a line segment between two points */
  const drawLine = useCallback(
    (from: { x: number; y: number }, to: { x: number; y: number }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = '#0b1c30';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    },
    []
  );

  /** Handle drawing start */
  const startDrawing = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const coords = getCoordinates(e);
      if (!coords) return;
      setIsDrawing(true);
      setHasDrawn(true);
      lastPoint.current = coords;
    },
    [getCoordinates]
  );

  /** Handle drawing move */
  const draw = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!isDrawing || !lastPoint.current) return;
      const coords = getCoordinates(e);
      if (!coords) return;
      drawLine(lastPoint.current, coords);
      lastPoint.current = coords;
    },
    [isDrawing, getCoordinates, drawLine]
  );

  /** Handle drawing end */
  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    lastPoint.current = null;
  }, []);

  /** Attach event listeners to canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
      canvas.removeEventListener('touchcancel', stopDrawing);
    };
  }, [startDrawing, draw, stopDrawing]);

  /** Initialize canvas with background and load initial data if present */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Set CSS size
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Background
    ctx.fillStyle = '#f8f9ff';
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = '#c6c6cd';
    ctx.lineWidth = 1;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // Placeholder text
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Sign above using mouse or touch', width / 2, height / 2);

    // Restore initial data if present
    if (initialData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        setHasDrawn(true);
      };
      img.src = initialData;
    }
  }, [width, height, initialData]);

  /** Save signature as PNG data URL */
  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
  }, [hasDrawn, onSave]);

  /** Clear the signature pad */
  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f8f9ff';
    ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

    // Redraw border
    ctx.strokeStyle = '#c6c6cd';
    ctx.lineWidth = 1;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // Redraw placeholder
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Sign above using mouse or touch', width / 2, height / 2);

    setHasDrawn(false);
    onClear();
  }, [width, height, onClear]);

  return (
    <div className="flex flex-col gap-sm">
      <label className="font-label-md text-label-md text-on-surface">
        Signature
      </label>
      <p className="font-label-sm text-label-sm text-on-surface-variant">
        Please sign in the box below using your mouse, finger, or stylus.
      </p>
      <div className="relative border border-outline-variant rounded-lg overflow-hidden bg-surface-container-low">
        <canvas
          ref={canvasRef}
          className="cursor-crosshair touch-none w-full"
          role="img"
          aria-label="Signature pad — draw your signature using mouse or touch"
          style={{ width: '100%', height: `${height}px`, maxWidth: `${width}px` }}
        />
      </div>
      <div className="flex gap-sm">
        <button
          type="button"
          className="px-md py-xs border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-all active:scale-95 flex items-center gap-xs"
          onClick={handleClear}
          disabled={!hasDrawn}
          aria-label="Clear signature"
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
          Clear
        </button>
        <button
          type="button"
          className={`px-md py-xs rounded-lg font-label-md text-label-md font-bold transition-all active:scale-95 flex items-center gap-xs ${
            hasDrawn
              ? 'bg-secondary text-on-secondary hover:brightness-90 shadow-sm'
              : 'bg-outline-variant text-on-surface-variant cursor-not-allowed'
          }`}
          onClick={handleSave}
          disabled={!hasDrawn}
          aria-label="Save signature"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          Save Signature
        </button>
      </div>
    </div>
  );
}