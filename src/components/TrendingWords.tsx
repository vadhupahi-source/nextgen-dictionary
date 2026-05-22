"use client";

import { DictionaryWord } from "@/types";

interface TrendingWordsProps {
  title: string;
  icon: React.ReactNode;
  words: DictionaryWord[];
  onWordClick: (word: DictionaryWord) => void;
  accentColor: "primary" | "accent";
}

export default function TrendingWords({
  title,
  icon,
  words,
  onWordClick,
  accentColor,
}: TrendingWordsProps) {
  const gradientClass =
    accentColor === "primary"
      ? "from-primary/10 to-primary/5"
      : "from-accent/10 to-accent/5";
  const iconBg =
    accentColor === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent";

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${iconBg}`}>{icon}</div>
        <h3 className="text-lg font-bold text-text-primary">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {words.map((word) => (
          <button
            key={word.id}
            onClick={() => onWordClick(word)}
            className={`px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r ${gradientClass} text-text-primary hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-border hover:border-transparent capitalize`}
          >
            {word.english_word}
          </button>
        ))}
      </div>
    </div>
  );
}
