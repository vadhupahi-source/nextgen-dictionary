"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { dictionaryData } from "@/data/dictionary";
import { DictionaryWord } from "@/types";
import Link from "next/link";

const ADMIN_PASSWORD = "nextgen2024";

interface WordFormData {
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
}

const emptyForm: WordFormData = {
  english_word: "",
  tamil_meaning: "",
  arabic_meaning: "",
  sinhala_meaning: "",
  french_meaning: "",
  example_sentence: "",
  translated_sentences: { tamil: "", arabic: "", sinhala: "", french: "" },
  word_type: "noun",
  pronunciation: "",
};

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [words, setWords] = useState<DictionaryWord[]>(() => [...dictionaryData]);
  const [editingWord, setEditingWord] = useState<DictionaryWord | null>(null);
  const [formData, setFormData] = useState<WordFormData>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid password. Please try again.");
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleAddWord = () => {
    setEditingWord(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const handleEditWord = (word: DictionaryWord) => {
    setEditingWord(word);
    setFormData({
      english_word: word.english_word,
      tamil_meaning: word.tamil_meaning,
      arabic_meaning: word.arabic_meaning,
      sinhala_meaning: word.sinhala_meaning,
      french_meaning: word.french_meaning,
      example_sentence: word.example_sentence,
      translated_sentences: { ...word.translated_sentences },
      word_type: word.word_type,
      pronunciation: word.pronunciation,
    });
    setShowForm(true);
  };

  const handleDeleteWord = (id: string) => {
    if (confirm("Are you sure you want to delete this word?")) {
      setWords(words.filter((w) => w.id !== id));
      showSuccess("Word deleted successfully!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWord) {
      setWords(
        words.map((w) =>
          w.id === editingWord.id ? { ...editingWord, ...formData } : w
        )
      );
      showSuccess("Word updated successfully!");
    } else {
      const newWord: DictionaryWord = {
        id: String(Date.now()),
        ...formData,
      };
      setWords([...words, newWord]);
      showSuccess("Word added successfully!");
    }
    setShowForm(false);
    setFormData(emptyForm);
    setEditingWord(null);
  };

  const filteredWords = words.filter((w) =>
    w.english_word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!loggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="glass-card rounded-2xl p-8 shadow-xl animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-text-primary">Admin Login</h2>
                <p className="text-sm text-text-secondary mt-1">
                  Enter password to manage dictionary
                </p>
              </div>
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 mb-4"
                />
                {loginError && (
                  <p className="text-red-500 text-sm mb-4">{loginError}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Login
                </button>
              </form>
              <Link
                href="/"
                className="block text-center mt-4 text-sm text-text-secondary hover:text-primary transition-colors"
              >
                &larr; Back to Dictionary
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Admin Dashboard
            </h1>
            <p className="text-text-secondary mt-1">
              Manage dictionary words and translations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddWord}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Word
            </button>
            <button
              onClick={() => setLoggedIn(false)}
              className="px-4 py-2.5 text-text-secondary hover:text-red-500 transition-colors rounded-xl border border-border hover:border-red-300"
            >
              Logout
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300 font-medium animate-fade-in">
            {successMessage}
          </div>
        )}

        {showForm && (
          <div className="mb-8 glass-card rounded-2xl p-6 animate-slide-up">
            <h2 className="text-xl font-bold text-text-primary mb-6">
              {editingWord ? "Edit Word" : "Add New Word"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-1">
                    English Word *
                  </label>
                  <input
                    required
                    value={formData.english_word}
                    onChange={(e) =>
                      setFormData({ ...formData, english_word: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-1">
                    Pronunciation
                  </label>
                  <input
                    value={formData.pronunciation}
                    onChange={(e) =>
                      setFormData({ ...formData, pronunciation: e.target.value })
                    }
                    placeholder="/wɜːrd/"
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-1">
                    Word Type *
                  </label>
                  <select
                    value={formData.word_type}
                    onChange={(e) =>
                      setFormData({ ...formData, word_type: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="noun">Noun</option>
                    <option value="verb">Verb</option>
                    <option value="adjective">Adjective</option>
                    <option value="adverb">Adverb</option>
                    <option value="preposition">Preposition</option>
                    <option value="conjunction">Conjunction</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-1">
                    Tamil Meaning
                  </label>
                  <input
                    value={formData.tamil_meaning}
                    onChange={(e) =>
                      setFormData({ ...formData, tamil_meaning: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-1">
                    Arabic Meaning
                  </label>
                  <input
                    value={formData.arabic_meaning}
                    onChange={(e) =>
                      setFormData({ ...formData, arabic_meaning: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-1">
                    Sinhala Meaning
                  </label>
                  <input
                    value={formData.sinhala_meaning}
                    onChange={(e) =>
                      setFormData({ ...formData, sinhala_meaning: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-1">
                    French Meaning
                  </label>
                  <input
                    value={formData.french_meaning}
                    onChange={(e) =>
                      setFormData({ ...formData, french_meaning: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">
                  Example Sentence (English)
                </label>
                <input
                  value={formData.example_sentence}
                  onChange={(e) =>
                    setFormData({ ...formData, example_sentence: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-1">
                    Tamil Translated Sentence
                  </label>
                  <input
                    value={formData.translated_sentences.tamil}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translated_sentences: {
                          ...formData.translated_sentences,
                          tamil: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-1">
                    Arabic Translated Sentence
                  </label>
                  <input
                    value={formData.translated_sentences.arabic}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translated_sentences: {
                          ...formData.translated_sentences,
                          arabic: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-1">
                    Sinhala Translated Sentence
                  </label>
                  <input
                    value={formData.translated_sentences.sinhala}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translated_sentences: {
                          ...formData.translated_sentences,
                          sinhala: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-1">
                    French Translated Sentence
                  </label>
                  <input
                    value={formData.translated_sentences.french}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translated_sentences: {
                          ...formData.translated_sentences,
                          french: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  {editingWord ? "Update Word" : "Add Word"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingWord(null);
                  }}
                  className="px-6 py-2.5 text-text-secondary border border-border rounded-xl hover:bg-surface-alt transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words..."
            className="w-full sm:w-80 px-4 py-2.5 bg-surface border border-border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface-alt/50">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-text-secondary">
                    English
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-text-secondary hidden sm:table-cell">
                    Tamil
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-text-secondary hidden md:table-cell">
                    Arabic
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-text-secondary hidden lg:table-cell">
                    Sinhala
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-text-secondary hidden lg:table-cell">
                    French
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-text-secondary">
                    Type
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredWords.map((word) => (
                  <tr
                    key={word.id}
                    className="border-b border-border last:border-b-0 hover:bg-primary/5 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-text-primary capitalize">
                      {word.english_word}
                    </td>
                    <td className="px-4 py-3 text-text-secondary hidden sm:table-cell">
                      {word.tamil_meaning}
                    </td>
                    <td className="px-4 py-3 text-text-secondary hidden md:table-cell" dir="rtl">
                      {word.arabic_meaning}
                    </td>
                    <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">
                      {word.sinhala_meaning}
                    </td>
                    <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">
                      {word.french_meaning}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`word-type-badge word-type-${word.word_type}`}>
                        {word.word_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditWord(word)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          aria-label="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteWord(word.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          aria-label="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredWords.length === 0 && (
            <div className="text-center py-12 text-text-secondary">
              No words found matching your search.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
