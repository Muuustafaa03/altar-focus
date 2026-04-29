// Ephemeral in-memory ritual state.
// Intentionally resets on full page refresh.

export type ActiveRitual = {
  id: string;
  sacrifice: string;
  duration: number; // minutes
  startedAt: number; // epoch ms
};

let activeRitual: ActiveRitual | null = null;

export function setActiveRitual(r: ActiveRitual) {
  activeRitual = r;
}

export function getActiveRitual(): ActiveRitual | null {
  return activeRitual;
}

export function clearActiveRitual() {
  activeRitual = null;
}

let lastCompleted: CompletedRitual | null = null;

export type CompletedRitual = {
  sacrifice: string;
  duration: number;
};

export function setLastCompleted(r: CompletedRitual) {
  lastCompleted = r;
}

export function getLastCompleted(): CompletedRitual | null {
  return lastCompleted;
}
