export type WalkthroughStatus = "dismissed" | "completed" | null;
const listeners = new Set<() => void>();
const sessionStatus = new Map<string, Exclude<WalkthroughStatus, null>>();

export function guideStorageKey(companyId: string) {
  return `qalt:guide:v1:${companyId}`;
}

export function readWalkthroughStatus(companyId: string): WalkthroughStatus {
  // Also remembers dismissal for this session if browser storage is blocked.
  const key = guideStorageKey(companyId);
  try {
    const value = window.localStorage.getItem(key);
    if (value === "dismissed" || value === "completed") return value;
  } catch { /* Browsing with storage disabled must not break the console. */ }
  return sessionStatus.get(key) ?? null;
}

export function saveWalkthroughStatus(companyId: string, status: Exclude<WalkthroughStatus, null>) {
  const key = guideStorageKey(companyId);
  sessionStatus.set(key, status);
  try { window.localStorage.setItem(key, status); } catch { /* Session fallback above. */ }
  listeners.forEach((listener) => listener());
}

export function subscribeToGuideState(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}
