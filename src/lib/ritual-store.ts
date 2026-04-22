// Ephemeral in-memory + sessionStorage handoff for the active ritual.
// Avoids relying on router state across full page transitions.

export type ActiveRitual = {
  id: string;
  sacrifice: string;
  duration: number; // minutes
  startedAt: number; // epoch ms
};

const KEY = "altar:active-ritual";

export function setActiveRitual(r: ActiveRitual) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(r));
}

export function getActiveRitual(): ActiveRitual | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ActiveRitual;
  } catch {
    return null;
  }
}

export function clearActiveRitual() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}

const COMPLETED_KEY = "altar:last-completed";

export type CompletedRitual = {
  sacrifice: string;
  duration: number;
};

export function setLastCompleted(r: CompletedRitual) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(COMPLETED_KEY, JSON.stringify(r));
}

export function getLastCompleted(): CompletedRitual | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(COMPLETED_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CompletedRitual;
  } catch {
    return null;
  }
}
