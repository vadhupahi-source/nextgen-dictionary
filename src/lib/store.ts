const RECENT_KEY = "nextgen-recent-searches";
const BOOKMARKS_KEY = "nextgen-bookmarks";
const THEME_KEY = "nextgen-theme";

function notifyChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("local-storage-change"));
  }
}

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addRecentSearch(word: string): string[] {
  const recent = getRecentSearches().filter(
    (w) => w.toLowerCase() !== word.toLowerCase()
  );
  recent.unshift(word);
  const trimmed = recent.slice(0, 10);
  localStorage.setItem(RECENT_KEY, JSON.stringify(trimmed));
  notifyChange();
  return trimmed;
}

export function getBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleBookmark(wordId: string): string[] {
  const bookmarks = getBookmarks();
  const idx = bookmarks.indexOf(wordId);
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.push(wordId);
  }
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
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
