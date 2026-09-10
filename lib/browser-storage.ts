export function readBrowserValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

export function writeBrowserValue<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Persistence is an enhancement; private browsing must not block the flow.
  }
}

export function removeBrowserValue(key: string) {
  if (typeof window === 'undefined') return
  try { window.localStorage.removeItem(key) } catch { /* noop */ }
}
