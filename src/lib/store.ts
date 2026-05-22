const RECENT_KEY = "nextgen-recent-searches";
const BOOKMARKS_KEY = "nextgen-bookmarks";
const THEME_KEY = "nextgen-theme";

let cachedRecent: string[] = [];
let cachedRecentRaw = "";

let cachedBookmarks: string[] = [];
let cachedBookmarksRaw = "";

function notifyChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("local-storage-change"));
  }
}

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return cachedRecent;
  try {
    const raw = localStorage.getItem(RECENT_KEY) || "[]";
    if (raw !== cachedRecentRaw) {
      cachedRecentRaw = raw;
      cachedRecent = JSON.parse(raw);
    }
    return cachedRecent;
  } catch {
    return cachedRecent;
  }
}

export function addRecentSearch(word: string): string[] {
  const recent = getRecentSearches().filter(
    (w) => w.toLowerCase() !== word.toLowerCase()
  );
  recent.unshift(word);
  const trimmed = recent.slice(0, 10);
  const raw = JSON.stringify(trimmed);
  localStorage.setItem(RECENT_KEY, raw);
  cachedRecentRaw = raw;
  cachedRecent = trimmed;
  notifyChange();
  return trimmed;
}

export function getBookmarks(): string[] {
  if (typeof window === "undefined") return cachedBookmarks;
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY) || "[]";
    if (raw !== cachedBookmarksRaw) {
      cachedBookmarksRaw = raw;
      cachedBookmarks = JSON.parse(raw);
    }
    return cachedBookmarks;
  } catch {
    return cachedBookmarks;
  }
}

export function toggleBookmark(wordId: string): string[] {
  const bookmarks = [...getBookmarks()];
  const idx = bookmarks.indexOf(wordId);
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.push(wordId);
  }
  const raw = JSON.stringify(bookmarks);
  localStorage.setItem(BOOKMARKS_KEY, raw);
  cachedBookmarksRaw = raw;
  cachedBookmarks = bookmarks;
  notifyChange();
  return bookmarks;
}

export function getTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light";
}

export function setTheme(theme: "light" | "dark"): void {
  localStorage.setItem(THEME_KEY, theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  notifyChange();
}
