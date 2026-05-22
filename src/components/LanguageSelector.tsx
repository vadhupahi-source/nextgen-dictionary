"use client";

import { Language, LANGUAGES } from "@/types";

interface LanguageSelectorProps {
  selected: Language;
  onSelect: (lang: Language) => void;
}

export default function LanguageSelector({ selected, onSelect }: LanguageSelectorProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {LANGUAGES.map((lang) => {
        const isActive = selected === lang.key;
        return (
          <button
            key={lang.key}
            onClick={() => onSelect(lang.key)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
              transition-all duration-300 transform
              ${
                isActive
                  ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/30 scale-105"
                  : "bg-surface text-text-secondary hover:bg-primary/5 hover:text-primary border border-border hover:border-primary/30 hover:scale-102"
              }
            `}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
}
