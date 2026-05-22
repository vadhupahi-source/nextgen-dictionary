import { dictionaryData } from "@/data/dictionary";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q")?.toLowerCase() || "";
  const lang = searchParams.get("lang") || "tamil";

  if (!q) {
    return Response.json({ results: [] });
  }

  const results = dictionaryData
    .filter((w) => w.english_word.toLowerCase().includes(q))
    .map((w) => {
      const meaningKey = `${lang}_meaning` as keyof typeof w;
      return {
        id: w.id,
        english_word: w.english_word,
        translation: w[meaningKey],
        word_type: w.word_type,
        pronunciation: w.pronunciation,
        example_sentence: w.example_sentence,
        translated_example:
          w.translated_sentences[lang as keyof typeof w.translated_sentences],
      };
    });

  return Response.json({ results });
}
