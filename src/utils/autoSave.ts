import type { DraftMeta } from '../types';

const DRAFT_KEY = 'loanflow_encrypted_draft';
const DRAFT_META_KEY = 'loanflow_draft_meta';
const DRAFT_EXPIRY_HOURS = 72;

/** Generate a unique draft ID */
export function generateDraftId(): string {
  const now = new Date();
  const random = Math.floor(Math.random() * 100000);
  return 'DRAFT-' + now.getFullYear() + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0') + '-' + String(random).padStart(5, '0');
}

/** Save draft metadata */
export function saveDraftMeta(step: number, draftId: string): void {
  const now = Date.now();
  const meta: DraftMeta = {
    draftId,
    step,
    timestamp: now,
    expiresAt: now + (DRAFT_EXPIRY_HOURS * 60 * 60 * 1000),
  };
  localStorage.setItem(DRAFT_META_KEY, JSON.stringify(meta));
}

/** Get draft metadata */
export function getDraftMeta(): DraftMeta | null {
  const meta = localStorage.getItem(DRAFT_META_KEY);
  if (!meta) return null;
  try {
    return JSON.parse(meta);
  } catch {
    return null;
  }
}

/** Check draft status */
export function checkDraftStatus(): { exists: boolean; expired: boolean; meta: DraftMeta | null } {
  const meta = getDraftMeta();
  if (!meta) return { exists: false, expired: false, meta: null };
  const now = Date.now();
  if (now > meta.expiresAt) {
    clearDraft();
    return { exists: true, expired: true, meta };
  }
  return { exists: true, expired: false, meta };
}

/** Clear all draft data */
export function clearDraft(): void {
  localStorage.removeItem(DRAFT_KEY);
  localStorage.removeItem(DRAFT_META_KEY);
  localStorage.removeItem('loanflow_draft_id');
  localStorage.removeItem('loanflow_application_id');
}

/** Generate a unique application reference number */
export function generateApplicationId(): string {
  const now = new Date();
  const dateStr = now.getFullYear() + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `LF-${dateStr}-${random}`;
}