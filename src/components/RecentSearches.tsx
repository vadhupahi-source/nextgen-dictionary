"use client";

import { DictionaryWord } from "@/types";

interface RecentSearchesProps {
  searches: string[];
  allWords: DictionaryWord[];
  onWordClick: (word: DictionaryWord) => void;
}

export default function RecentSearches({
  searches,
  allWords,
  onWordClick,
}: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-text-primary">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((s) => {
          const word = allWords.find(
            (w) => w.english_word.toLowerCase() === s.toLowerCase()
          );
          if (!word) return null;
          return (
            <button
              key={s}
              onClick={() => onWordClick(word)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-surface-alt text-text-primary hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-border capitalize"
            >
              <svg className="w-3.5 h-3.5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
