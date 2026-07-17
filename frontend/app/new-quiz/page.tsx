"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { SavedQuiz } from "@/app/lib/slide-builder";

export default function MyQuizzesPage() {
  const [quizzes, setQuizzes] = useState<SavedQuiz[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Alle");

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem("quizarena_quizzes");
      if (!raw) {
        setQuizzes([]);
        return;
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        setQuizzes([]);
        return;
      }

      setQuizzes(parsed as SavedQuiz[]);
    } catch {
      setQuizzes([]);
    }
  }, []);

  function handleDeleteQuiz(id: string) {
    const confirmed = window.confirm(
      "Willst du dieses Quiz wirklich löschen?"
    );

    if (!confirmed) return;

    const next = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(next);

    try {
      localStorage.setItem("quizarena_quizzes", JSON.stringify(next));
    } catch (error) {
      console.error(error);
      alert("Das Quiz konnte nicht gelöscht werden.");
    }
  }

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        quizzes
          .map((quiz) => quiz.category?.trim())
          .filter(Boolean)
      )
    ) as string[];

    return ["Alle", ...unique];
  }, [quizzes]);

  const filteredQuizzes = useMemo(() => {
    const term = search.trim().toLowerCase();

    return quizzes.filter((quiz) => {
      const matchesSearch =
        !term ||
        quiz.title.toLowerCase().includes(term) ||
        quiz.category.toLowerCase().includes(term) ||
        quiz.questions.some((question) =>
          question.question.toLowerCase().includes(term)
        );

      const matchesCategory =
        categoryFilter === "Alle" || quiz.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [quizzes, search, categoryFilter]);

  const totalQuestions = useMemo(() => {
    return quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0);
  }, [quizzes]);

  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white md:px-10 md:py-10">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-10 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              QuizArena Studio
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-7xl">
              Meine Quizze
            </h1>
            <p className="mt-4 max-w-4xl text-lg text-zinc-400 md:text-2xl">
              Hier findest du alle gespeicherten Fußball-Quizze, kannst sie
              öffnen, bearbeiten, Slides generieren oder löschen.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-[28px] border border-zinc-800 px-6 py-4 text-lg text-white transition hover:bg-zinc-900"
            >
              ← Zurück zur Startseite
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
                Dashboard
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <DashboardCard
                label="Gespeicherte Quizze"
                value={String(quizzes.length)}
              />
              <DashboardCard
                label="Fragen insgesamt"
                value={String(totalQuestions)}
              />
              <DashboardCard
                label="Gefilterte Quizze"
                value={String(filteredQuizzes.length)}
              />
            </div>
          </section>

          <section className="rounded-[36px] border border-zinc-800 bg-zinc-950 p-6 md:p-8">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                Filter
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-5xl">
                Suche & Kategorien
              </h2>
            </div>

            <div className="grid gap-5">
              <label className="block">
                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Suche
                </p>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Quiztitel, Kategorie oder Frage suchen..."
                  className="w-full rounded-[24px] border border-zinc-800 bg-black px-5 py-4 text-lg text-white outline-none transition placeholder:text-zinc-600 focus:border-lime-400"
                />
              </label>

              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Kategorie
                </p>

                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => {
                    const active = categoryFilter === category;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setCategoryFilter(category)}
                        className={`rounded-full border px-5 py-3 text-sm font-bold transition ${
                          active
                            ? "border-lime-400 bg-lime-400 text-black"
                            : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>

        {filteredQuizzes.length === 0 ? (
          <section className="rounded-[40px] border border-zinc-800 bg-zinc-950 px-8 py-16 text-center md:px-16">
            <h2 className="text-3xl font-bold md:text-5xl">
              Keine Quizze gefunden
            </h2>

            {quizzes.length === 0 ? (
              <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400 md:text-2xl">
                Du hast aktuell noch kein Quiz gespeichert. Erstelle jetzt dein
                erstes Fußball-Quiz.
              </p>
            ) : (
              <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400 md:text-2xl">
                Für deinen aktuellen Suchbegriff oder Filter wurde kein Quiz
                gefunden.
              </p>
            )}

            <div className="mt-8">
              <Link
                href="/new-quiz"
                className="inline-flex rounded-[28px] bg-lime-400 px-6 py-4 text-lg font-bold text-black transition hover:bg-lime-300"
              >
                + Neues Quiz erstellen
              </Link>
            </div>
          </section>
        ) : (
          <div className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-3">
            {filteredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onDelete={() => handleDeleteQuiz(quiz.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function QuizCard({
  quiz,
  onDelete,
}: {
  quiz: SavedQuiz;
  onDelete: () => void;
}) {
  const createdAt = formatDate(quiz.createdAt);
  const firstQuestions = quiz.questions.slice(0, 3);

  return (
    <article className="rounded-[36px] border border-zinc-800 bg-zinc-950 p-6 md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            {quiz.category || "Fußball Quiz"}
          </p>
          <h3 className="mt-3 break-words text-2xl font-black tracking-[-0.03em] text-white md:text-4xl">
            {quiz.title}
          </h3>
          <p className="mt-3 text-sm text-zinc-500 md:text-base">
            Erstellt am {createdAt}
          </p>
        </div>

        <div className="rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-2 text-sm font-bold text-lime-300">
          {quiz.questions.length}{" "}
          {quiz.questions.length === 1 ? "Frage" : "Fragen"}
        </div>
      </div>

      <div className="grid gap-4">
        <InfoBox label="CTA" value={quiz.cta || "—"} />

        <div className="rounded-[24px] border border-zinc-800 bg-black/40 p-5">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Vorschau der ersten Fragen
          </p>

          <div className="mt-4 space-y-3">
            {firstQuestions.length > 0 ? (
              firstQuestions.map((question, index) => (
                <div
                  key={`${quiz.id}-${index}`}
                  className="rounded-[18px] border border-zinc-800 bg-zinc-950 px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime-400 text-sm font-black text-black">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-zinc-200 md:text-base">
                      {question.question || "Keine Frage eingetragen"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-zinc-500">Keine Fragen vorhanden.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/my-quizzes/${quiz.id}`}
          className="rounded-[22px] bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300 md:text-base"
        >
          Quiz öffnen
        </Link>

        <Link
          href={`/my-quizzes/${quiz.id}/slides`}
          className="rounded-[22px] border border-zinc-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-900 md:text-base"
        >
          Zu den Slides
        </Link>

        <button
          type="button"
          onClick={onDelete}
          className="rounded-[22px] border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/20 md:text-base"
        >
          Löschen
        </button>
      </div>
    </article>
  );
}

function DashboardCard({
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
      <p className="mt-3 text-3xl font-black text-white md:text-4xl">
        {value}
      </p>
    </div>
  );
}

function InfoBox({
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
      <p className="mt-3 break-words text-base leading-7 text-zinc-200 md:text-lg">
        {value}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "Unbekannt";
  }
}