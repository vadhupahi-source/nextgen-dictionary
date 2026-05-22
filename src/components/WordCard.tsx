"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { DictionaryWord, Language, LANGUAGES } from "@/types";
import { getBookmarks, toggleBookmark } from "@/lib/store";

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("local-storage-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("local-storage-change", callback);
  };
}

const emptyArray: string[] = [];

interface WordCardProps {
  word: DictionaryWord;
  language: Language;
}

export default function WordCard({ word, language }: WordCardProps) {
  const [speaking, setSpeaking] = useState(false);

  const bookmarks = useSyncExternalStore(
    subscribeToStorage,
    getBookmarks,
    () => emptyArray
  );
  const bookmarked = bookmarks.includes(word.id);

  const langInfo = LANGUAGES.find((l) => l.key === language);

  const meaningKey = `${language}_meaning` as keyof DictionaryWord;
  const translation = word[meaningKey] as string;
  const translatedExample = word.translated_sentences[language];

  const handleBookmark = useCallback(() => {
    toggleBookmark(word.id);
  }, [word.id]);

  const handleSpeak = (text: string, lang?: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (lang) utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const langCodes: Record<Language, string> = {
    tamil: "ta",
    arabic: "ar",
    sinhala: "si",
    french: "fr",
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-up">
      <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-bold capitalize">{word.english_word}</h2>
                <button
                  onClick={() => handleSpeak(word.english_word, "en")}
                  className={`p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors ${
                    speaking ? "animate-pulse" : ""
                  }`}
                  aria-label="Pronounce word"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-white/80 text-sm font-mono">{word.pronunciation}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="word-type-badge bg-white/20 text-white">
                {word.word_type}
              </span>
              <button
                onClick={handleBookmark}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <svg
                  className="w-5 h-5"
                  fill={bookmarked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl border border-accent/20">
            <span className="text-2xl">{langInfo?.flag}</span>
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                {langInfo?.label} Translation
              </p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-text-primary">{translation}</p>
                <button
                  onClick={() => handleSpeak(translation, langCodes[language])}
                  className="p-1.5 rounded-full text-accent hover:bg-accent/10 transition-colors"
                  aria-label="Pronounce translation"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
              Example Sentence
            </h3>
            <div className="p-4 bg-surface-alt rounded-xl space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold text-sm mt-0.5">EN</span>
                <p className="text-text-primary italic">&ldquo;{word.example_sentence}&rdquo;</p>
              </div>
              <div className="border-t border-border" />
              <div className="flex items-start gap-2">
                <span className="text-accent font-bold text-sm mt-0.5">
                  {langInfo?.label?.slice(0, 2).toUpperCase()}
                </span>
                <p className="text-text-primary italic">&ldquo;{translatedExample}&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
