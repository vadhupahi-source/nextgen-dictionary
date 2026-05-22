"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { DictionaryWord } from "@/types";

interface SearchBarProps {
  onSearch: (word: DictionaryWord) => void;
  allWords: DictionaryWord[];
}

export default function SearchBar({ onSearch, allWords }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<DictionaryWord[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const updateSuggestions = useCallback(
    (value: string) => {
      if (value.trim().length === 0) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      const q = value.toLowerCase();
      const matches = allWords
        .filter((w) => w.english_word.toLowerCase().startsWith(q))
        .slice(0, 8);
      if (matches.length === 0) {
        const fuzzy = allWords
          .filter((w) => w.english_word.toLowerCase().includes(q))
          .slice(0, 8);
        setSuggestions(fuzzy);
      } else {
        setSuggestions(matches);
      }
      setShowSuggestions(true);
      setSelectedIdx(-1);
    },
    [allWords]
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (word: DictionaryWord) => {
    setQuery(word.english_word);
    setShowSuggestions(false);
    onSearch(word);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "Enter") {
        const match = allWords.find(
          (w) => w.english_word.toLowerCase() === query.toLowerCase()
        );
        if (match) handleSelect(match);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIdx >= 0 && selectedIdx < suggestions.length) {
        handleSelect(suggestions[selectedIdx]);
      } else {
        const match = allWords.find(
          (w) => w.english_word.toLowerCase() === query.toLowerCase()
        );
        if (match) handleSelect(match);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl group-focus-within:blur-2xl transition-all duration-500 opacity-0 group-focus-within:opacity-100" />
        <div className="relative flex items-center">
          <svg
            className="absolute left-5 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              updateSuggestions(e.target.value);
            }}
            onFocus={() => {
              if (query.trim()) updateSuggestions(query);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search for an English word..."
            className="w-full pl-14 pr-5 py-4 text-lg bg-surface border-2 border-border rounded-2xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
          />
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-2 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden animate-fade-in"
        >
          {suggestions.map((word, idx) => (
            <button
              key={word.id}
              onClick={() => handleSelect(word)}
              className={`w-full px-5 py-3 text-left flex items-center justify-between transition-colors ${
                idx === selectedIdx
                  ? "bg-primary/10 text-primary"
                  : "text-text-primary hover:bg-primary/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="font-medium">{word.english_word}</span>
              </div>
              <span className={`word-type-badge word-type-${word.word_type}`}>
                {word.word_type}
              </span>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && query.trim() && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-surface border border-border rounded-xl shadow-2xl p-5 text-center animate-fade-in">
          <p className="text-text-secondary">
            No results found for &ldquo;<span className="font-semibold text-text-primary">{query}</span>&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
