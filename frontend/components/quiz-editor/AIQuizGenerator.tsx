"use client";

import { useState } from "react";

type Props = {
  onGenerate: (questions: any[], topic: string) => void;
};

export default function AIQuizGenerator({ onGenerate }: Props) {
  const [topic, setTopic] = useState("bundesliga");
  const [amount, setAmount] = useState(5);
  const [loading, setLoading] = useState(false);

  async function generate() {
    try {
      setLoading(true);

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          amount,
        }),
      });

      if (!res.ok) {
        throw new Error("API-Fehler");
      }

     const data = await res.json();

const questions = data.questions;

if (!questions || !Array.isArray(questions)) {
  throw new Error("Ungültige Antwort der API.");
}

onGenerate(questions, topic);
    } catch (err) {
      console.error(err);
      alert("Quiz konnte nicht erzeugt werden.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-2 text-xl font-bold">
        🤖 KI Generator
      </h2>

      <p className="mb-6 text-sm text-zinc-400">
        Erstelle automatisch komplette Fußball-Quizze mit GPT.
      </p>

      <select
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="mb-4 w-full rounded-xl bg-zinc-800 p-3"
      >
        <option value="bundesliga">Bundesliga</option>
        <option value="championsLeague">Champions League</option>
      </select>

      <select
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="mb-6 w-full rounded-xl bg-zinc-800 p-3"
      >
        <option value={5}>5 Fragen</option>
        <option value={10}>10 Fragen</option>
        <option value={15}>15 Fragen</option>
        <option value={20}>20 Fragen</option>
      </select>

      <button
        onClick={generate}
        disabled={loading}
        className="w-full rounded-xl bg-lime-400 py-4 font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Quiz wird erstellt..." : "Quiz automatisch erzeugen"}
      </button>
    </div>
  );
}