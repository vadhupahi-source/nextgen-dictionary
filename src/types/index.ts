export type Language = "tamil" | "arabic" | "sinhala" | "french";

export interface DictionaryWord {
  id: string;
  english_word: string;
  tamil_meaning: string;
  arabic_meaning: string;
  sinhala_meaning: string;
  french_meaning: string;
  example_sentence: string;
  translated_sentences: {
    tamil: string;
    arabic: string;
    sinhala: string;
    french: string;
  };
  word_type: string;
  pronunciation: string;
  image_url?: string;
}

export interface SearchResult {
  word: DictionaryWord;
  selectedLanguage: Language;
  translation: string;
  translatedExample: string;
}

export const LANGUAGES: { key: Language; label: string; flag: string }[] = [
  { key: "tamil", label: "Tamil", flag: "🇱🇰" },
  { key: "arabic", label: "Arabic", flag: "🇸🇦" },
  { key: "sinhala", label: "Sinhala", flag: "🇱🇰" },
  { key: "french", label: "French", flag: "🇫🇷" },
];
