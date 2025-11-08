"use client";

type Listener<T> = (value: T) => void;

export function createShadowStore<T>(key: string, initial: T) {
  let state: T = initial;
  const listeners = new Set<Listener<T>>();

  function load(): T {
    if (typeof window === "undefined") return state;
    const raw = window.localStorage.getItem(key);
    if (raw) {
      try {
        state = JSON.parse(raw) as T;
      } catch {}
    } else {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
    return state;
  }

  function get(): T {
    return state;
  }

  function set(next: T) {
    state = next;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
    listeners.forEach((l) => l(state));
  }

  function update(mutator: (draft: T) => T) {
    set(mutator(state));
  }

  function subscribe(listener: Listener<T>) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  // Initialize from storage on first client access
  if (typeof window !== "undefined") {
    load();
  }

  return { get, set, update, subscribe };
}
