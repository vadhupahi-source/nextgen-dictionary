"use client";

import { useSyncExternalStore, useCallback } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("local-storage-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("local-storage-change", callback);
  };
}

export function dispatchStorageChange() {
  window.dispatchEvent(new Event("local-storage-change"));
}

export function useLocalStorageValue<T>(key: string, fallback: T): T {
  const getSnapshot = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : fallback;
    } catch {
      return fallback;
    }
  }, [key, fallback]);

  const getServerSnapshot = useCallback(() => fallback, [fallback]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
