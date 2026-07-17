"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getSlidesStorageKey,
  type SavedQuiz,
} from "@/app/lib/slide-builder";

export default function MyQuizzesPage() {
  const [quizzes, setQuizzes] = useState<SavedQuiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    try {
      const raw = localStorage.getItem("quizarena_quizzes");
      if (!raw) {
        setQuizzes([]);
        setIsLoading(false);
        return;
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        setQuizzes([]);
        setIsLoading(false);
        return;
      }

      const normalized = parsed
        .map((quiz) => normalizeQuiz(quiz))
        .filter(Boolean) as SavedQuiz[];

      normalized.sort((a, b) => {
        const aTime = new Date(a.createdAt || 0).getTime();
        const bTime = new Date(b.createdAt || 0).getTime();
        return bTime - aTime;
      });

      setQuizzes(normalized);
    } catch (error) {
      console.error(error);
      setQuizzes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const totalQuestions = useMemo(() => {
    return quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0);
  }, [quizzes]);

  function handleDeleteQuiz(quizId: string) {
    const confirmed = window.confirm("Willst du dieses Quiz wirklich löschen?");
    if (!confirmed) return;

    try {
      const raw = localStorage.getItem("quizarena_quizzes");
      const parsed: SavedQuiz[] = raw ? JSON.parse(raw) : [];
      const next = parsed.filter((entry) => entry.id !== quizId);

      localStorage.setItem("quizarena_quizzes", JSON.stringify(next));
      localStorage.removeItem(getSlidesStorageKey(quizId));

      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
    } catch (error) {
      console.error(error);
      alert("Das Quiz konnte nicht gelöscht werden.");
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white md:px-10 md:py-10">
      <div className="mx-auto max-w-[1700px]">
        <div className="mb-10 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              QuizArena Studio
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-7xl">
              Meine Quizze
            </h1>
            <p className="mt-4 max-w-4xl text-lg text-zinc-400 md:text-2xl">
              Hier siehst du alle lokal gespeicherten Quizze. Öffne ein Quiz,
              bearbeite es weiter und generiere daraus Premium-Slides.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-[28px] border border-zinc-800 px-6 py-4 text-lg text-white transition hover:bg-zinc-900"
            >
              ← Start
            </Link>

            <Link
              href="/new-quiz"
              className="rounded-[28px] bg-lime-400 px-6 py-4 text-lg font-bold text-black transition hover:bg-lime-300"
            >
              + Neues Quiz
            </Link>
          </div>
        </div>

        <div className="mb-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[36px] border border-zinc-800 bg-zinc-950 p-6 md:p-8">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                Übersicht
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-5xl">
                Deine Quiz-Bibliothek
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard label="Quizze" value={`${quizzes.length}`} />
              <InfoCard label="Fragen gesamt" value={`${totalQuestions}`} />
              <InfoCard
                label="Letzter Speicherort"
                value="LocalStorage"
              />
            </div>
          </section>

          <section className="rounded-[36px] border border-zinc-800 bg-zinc-950 p-6 md:p-8">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                Workflow
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-5xl">
                So geht’s weiter
              </h2>
            </div>

            <div className="space-y-4">
              <StepCard
                step="1"
                title="Quiz öffnen"
                text="Öffne ein gespeichertes Quiz aus der Liste, um alle Fragen und Antworten zu prüfen."
              />
              <StepCard
                step="2"
                title="Slides generieren"
                text="Auf der Detailseite erzeugst du automatisch Cover-, Fragen-, Lösungen- und CTA-Slides."
              />
              <StepCard
                step="3"
                title="PNG exportieren"
                text="Auf der Slides-Seite kannst du anschließend jede Slide oder alle Slides als PNG exportieren."
              />
            </div>
          </section>
        </div>

        <section className="rounded-[36px] border border-zinc-800 bg-zinc-950 p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                Gespeicherte Quizze
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-5xl">
                Übersicht
              </h2>
            </div>

            <div className="rounded-full border border-lime-500/30 bg-lime-500/10 px-5 py-3 text-sm font-bold text-lime-300 md:text-base">
              {quizzes.length} {quizzes.length === 1 ? "Quiz" : "Quizze"}
            </div>
          </div>

          {isLoading ? (
            <div className="rounded-[32px] border border-zinc-800 bg-black/40 px-6 py-12 text-center">
              <p className="text-lg text-zinc-400 md:text-2xl">
                Quizze werden geladen…
              </p>
            </div>
          ) : quizzes.length === 0 ? (
            <div className="rounded-[32px] border border-zinc-800 bg-black/40 px-6 py-12 text-center">
              <h3 className="text-2xl font-bold text-white md:text-4xl">
                Noch keine Quizze gespeichert
              </h3>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-zinc-400 md:text-2xl">
                Erstelle jetzt dein erstes Quiz und baue daraus direkt
                Premium-Slides.
              </p>

              <div className="mt-8">
                <Link
                  href="/new-quiz"
                  className="inline-flex rounded-[28px] bg-lime-400 px-6 py-4 text-lg font-bold text-black transition hover:bg-lime-300"
                >
                  + Erstes Quiz erstellen
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onDelete={handleDeleteQuiz}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function QuizCard({
  quiz,
  onDelete,
}: {
  quiz: SavedQuiz;
  onDelete: (quizId: string) => void;
}) {
  const previewQuestions = quiz.questions.slice(0, 3);

  return (
    <article className="flex h-full flex-col rounded-[32px] border border-zinc-800 bg-black/40 p-5 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="inline-flex rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-lime-300">
            {quiz.category || "Fußball Quiz"}
          </div>

          <h3 className="mt-4 break-words text-3xl font-black tracking-[-0.03em] text-white">
            {quiz.title || "Unbenanntes Quiz"}
          </h3>
        </div>

        <div className="rounded-full border border-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-300">
          {quiz.questions.length} {quiz.questions.length === 1 ? "Frage" : "Fragen"}
        </div>
      </div>

      <div className="flex-1 space-y-5">
        {previewQuestions.length > 0 ? (
          previewQuestions.map((question, index) => (
            <div
              key={`${quiz.id}-preview-${index}`}
              className="rounded-[24px] border border-zinc-800 bg-zinc-950 p-4"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                Frage {index + 1}
              </p>
              <p className="mt-3 text-lg font-semibold leading-7 text-white">
                {question.question || "Keine Frage eingetragen"}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-[24px] border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-lg text-zinc-400">
              Dieses Quiz enthält noch keine Fragen.
            </p>
          </div>
        )}

        <div className="rounded-[24px] border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">CTA</p>
          <p className="mt-3 text-lg font-semibold leading-7 text-white">
            {quiz.cta || "Folge für mehr Fußball-Quizze ⚽"}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-zinc-800 pt-5">
        <p className="text-sm text-zinc-500">
          Gespeichert: {formatDate(quiz.createdAt)}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/my-quizzes/${quiz.id}`}
            className="inline-flex rounded-[22px] bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300 md:text-base"
          >
            Quiz öffnen
          </Link>

          <Link
            href={`/my-quizzes/${quiz.id}/slides`}
            className="inline-flex rounded-[22px] border border-zinc-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-900 md:text-base"
          >
            Slides
          </Link>

          <button
            type="button"
            onClick={() => onDelete(quiz.id)}
            className="inline-flex rounded-[22px] border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/20 md:text-base"
          >
            Löschen
          </button>
        </div>
      </div>
    </article>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] border border-zinc-800 bg-black/40 p-5">
      <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
        {label}
      </p>
      <p className="mt-3 break-words text-xl font-bold text-white md:text-2xl">
        {value}
      </p>
    </div>
  );
}

function StepCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-zinc-800 bg-black/40 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-400 text-base font-black text-black">
          {step}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="mt-2 text-base leading-7 text-zinc-400">{text}</p>
        </div>
      </div>
    </div>
  );
}

function normalizeQuiz(input: unknown): SavedQuiz | null {
  if (!input || typeof input !== "object") return null;

  const quiz = input as Record<string, unknown>;

  const questions = Array.isArray(quiz.questions)
    ? quiz.questions.map((question) => {
        const q = (question ?? {}) as Record<string, unknown>;

        return {
          question: toStringValue(q.question),
          answerA: toStringValue(q.answerA),
          answerB: toStringValue(q.answerB),
          answerC: toStringValue(q.answerC),
          correctAnswer: normalizeCorrectAnswer(q.correctAnswer),
        };
      })
    : [];

  return {
    id: toStringValue(quiz.id) || cryptoFallback(),
    title: toStringValue(quiz.title) || "Unbenanntes Quiz",
    category: toStringValue(quiz.category) || "Fußball Quiz",
    cta: toStringValue(quiz.cta) || "Folge für mehr Fußball-Quizze ⚽",
    createdAt: toStringValue(quiz.createdAt) || new Date().toISOString(),
    questions,
  };
}

function normalizeCorrectAnswer(value: unknown): "A" | "B" | "C" {
  if (value === "A" || value === "B" || value === "C") return value;
  return "A";
}

function toStringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function formatDate(value?: string) {
  if (!value) return "Unbekannt";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unbekannt";

  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function cryptoFallback() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `quiz_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}