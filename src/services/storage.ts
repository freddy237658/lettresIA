/**
 * Mock persistence layer for the prototype.
 * In the real app, every function here becomes a call to the Laravel API
 * (see cahier des charges §9 — API REST) instead of localStorage.
 */
const PREFIX = 'lettreai:'

export function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function writeStore<T>(key: string, value: T) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* storage unavailable — ignore in prototype */
  }
}

export function removeStore(key: string) {
  localStorage.removeItem(PREFIX + key)
}

export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}
