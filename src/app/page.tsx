"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import LanguageSelector from "@/components/LanguageSelector";
import WordCard from "@/components/WordCard";
import TrendingWords from "@/components/TrendingWords";
import RecentSearches from "@/components/RecentSearches";
import { dictionaryData, trendingWordIds, popularWordIds } from "@/data/dictionary";
import { DictionaryWord, Language } from "@/types";
import { addRecentSearch, getRecentSearches } from "@/lib/store";

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("local-storage-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("local-storage-change", callback);
  };
}

const emptyArray: string[] = [];

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("tamil");
  const [selectedWord, setSelectedWord] = useState<DictionaryWord | null>(null);

  const recentSearches = useSyncExternalStore(
    subscribeToStorage,
    getRecentSearches,
    () => emptyArray
  );

  const trendingWords = dictionaryData.filter((w) => trendingWordIds.includes(w.id));
  const popularWords = dictionaryData.filter((w) => popularWordIds.includes(w.id));

  const handleSearch = useCallback((word: DictionaryWord) => {
    setSelectedWord(word);
    addRecentSearch(word.english_word);
  }, []);

  const handleWordClick = useCallback(
    (word: DictionaryWord) => {
      handleSearch(word);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [handleSearch]
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                NextGen English Academy
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-3">
                Multilingual{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Dictionary
                </span>
              </h1>
              <p className="text-lg text-text-secondary max-w-xl mx-auto">
                Search any English word and get instant translations in Tamil, Arabic,
                Sinhala, and French
              </p>
            </div>

            <div className="mb-6">
              <SearchBar onSearch={handleSearch} allWords={dictionaryData} />
            </div>

            <div className="mb-8">
              <LanguageSelector
                selected={selectedLanguage}
                onSelect={setSelectedLanguage}
              />
            </div>

            {selectedWord && (
              <div className="mb-8">
                <WordCard word={selectedWord} language={selectedLanguage} />
              </div>
            )}
          </div>
        </section>

        {/* Content Sections */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6">
          <RecentSearches
            searches={recentSearches}
            allWords={dictionaryData}
            onWordClick={handleWordClick}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <TrendingWords
              title="Trending Words"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
              words={trendingWords}
              onWordClick={handleWordClick}
              accentColor="primary"
            />
            <TrendingWords
              title="Popular Words"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              }
              words={popularWords}
              onWordClick={handleWordClick}
              accentColor="accent"
            />
          </div>

          {/* All Words Browse */}
          <div className="glass-card rounded-2xl p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-primary">Browse All Words</h3>
              <span className="ml-auto text-sm text-text-secondary">
                {dictionaryData.length} words
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {dictionaryData.map((word) => (
                <button
                  key={word.id}
                  onClick={() => handleWordClick(word)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 transition-all duration-200 capitalize border border-transparent hover:border-primary/20"
                >
                  {word.english_word}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
