"use client";

import { delay } from "@/lib/demo/delay";

export async function fetchFixture<T = unknown>(
  path: string,
  ms = 300,
): Promise<T> {
  const res = await fetch(`/demo/fixtures/${path}`, { cache: "no-store" });
  await delay(ms);
  if (!res.ok) throw new Error(`Failed to load fixture: ${path}`);
  return res.json();
}

export async function fetchWithShadow<T = unknown>(
  key: string,
  path: string,
  ms = 300,
): Promise<T> {
  // Always fetch fresh data (with cache: "no-store")
  const data = await fetchFixture<T>(path, ms);

  // Check if cached data exists and compare
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(key);
    if (raw) {
      try {
        const cached = JSON.parse(raw) as T;
        // If data hasn't changed, return cached version (faster)
        if (JSON.stringify(cached) === JSON.stringify(data)) {
          return cached;
        }
      } catch {}
    }
    // Data changed or no cache exists, update cache with fresh data
    window.localStorage.setItem(key, JSON.stringify(data));
  }
  return data;
}
