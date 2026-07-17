"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { SavedQuiz } from "@/app/lib/slide-builder";

const QUIZ_STORAGE_KEY = "quizarena_quizzes";

export default function HomePage() {
  const [quizzes, setQuizzes] = useState<SavedQuiz[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadQuizzes();
  }, []);

  function loadQuizzes() {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
      if (!raw) {
        setQuizzes([]);
        setIsLoaded(true);
        return;
      }

      const parsed = JSON.parse(raw) as SavedQuiz[];
      if (!Array.isArray(parsed)) {
        setQuizzes([]);
        setIsLoaded(true);
        return;
      }

      const normalized = parsed
        .filter(Boolean)
        .map(normalizeQuiz)
        .sort((a, b) => {
          const aTime = new Date(a.createdAt || 0).getTime();
          const bTime = new Date(b.createdAt || 0).getTime();
          return bTime - aTime;
        });

      setQuizzes(normalized);
      setIsLoaded(true);
    } catch (error) {
      console.error("Fehler beim Laden der Quizze:", error);
      setQuizzes([]);
      setIsLoaded(true);
    }
  }

  const stats = useMemo(() => {
    const totalQuizzes = quizzes.length;

    const totalQuestions = quizzes.reduce((sum, quiz) => {
      return sum + getValidQuestionCount(quiz);
    }, 0);

    const latestQuiz = quizzes[0] ?? null;
    const latestQuizTitle = latestQuiz?.title || "Noch kein Quiz";
    const latestQuizCategory = latestQuiz?.category || "—";

    return {
      totalQuizzes,
      totalQuestions,
      latestQuizTitle,
      latestQuizCategory,
    };
  }, [quizzes]);

  const latestQuizzes = useMemo(() => quizzes.slice(0, 3), [quizzes]);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white md:px-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[40px] border border-zinc-900 bg-zinc-950 px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,255,0,0.10),transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(132,255,0,0.05),transparent_40%)]" />

          <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                QuizArena Studio
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-lime-300">
                  Fußball Quiz Builder
                </span>

                <span className="rounded-full border border-zinc-800 bg-black px-4 py-2 text-sm font-medium text-zinc-300">
                  TikTok / Shorts Workflow
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-black leading-none md:text-7xl">
                Baue Quizze.
                <br />
                Generiere Slides.
                <br />
                Poste schneller.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400 md:text-2xl">
                Erstelle Fußball-Quizze mit 1 bis 10 Fragen, speichere sie lokal
                in QuizArena und generiere daraus automatisch Premium-Slides für
                TikTok, Reels oder YouTube Shorts.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/my-quizzes/new-quiz"
                  className="inline-flex items-center justify-center rounded-[26px] bg-lime-400 px-7 py-4 text-lg font-black text-black transition hover:bg-lime-300"
                >
                  + Neues Quiz erstellen
                </Link>

                <Link
                  href="/my-quizzes"
                  className="inline-flex items-center justify-center rounded-[26px] border border-zinc-800 px-6 py-4 text-lg font-medium transition hover:bg-zinc-900"
                >
                  Meine Quizze öffnen
                </Link>
              </div>
            </div>

            <div className="grid w-full max-w-[420px] gap-4">
              <DashboardStatCard
                label="Gespeicherte Quizze"
                value={`${stats.totalQuizzes}`}
                accent
              />
              <DashboardStatCard
                label="Gültige Fragen gesamt"
                value={`${stats.totalQuestions}`}
              />
              <DashboardStatCard
                label="Neuestes Quiz"
                value={stats.latestQuizTitle}
                subValue={stats.latestQuizCategory}
              />
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <QuickActionCard
            title="Neues Quiz"
            description="Erstelle ein neues Fußball-Quiz mit 1 bis 10 Fragen, Antworten und CTA."
            href="/my-quizzes/new-quiz"
            buttonText="Quiz erstellen"
            accent
          />

          <QuickActionCard
            title="Meine Quizze"
            description="Öffne deine gespeicherten Quizze, bearbeite sie oder springe direkt zur Slide-Ansicht."
            href="/my-quizzes"
            buttonText="Quiz-Übersicht öffnen"
          />

          <QuickActionCard
            title="Slide-Workflow"
            description="Jedes Quiz wird automatisch in Cover, Fragen, Lösungen und CTA-Slide übersetzt."
            href="/my-quizzes"
            buttonText="Zum Workflow"
          />
        </section>

        {/* WORKFLOW */}
        <section className="mt-8 rounded-[36px] border border-zinc-900 bg-zinc-950 p-6 md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                Workflow
              </p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                So funktioniert QuizArena
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                Das System ist so aufgebaut, dass du aus einer Quiz-Idee in
                wenigen Schritten ein komplettes Slide-Set bekommst.
              </p>
            </div>

            <div className="rounded-[28px] border border-lime-500/20 bg-lime-500/5 px-6 py-5">
              <div className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                Output
              </div>
              <div className="mt-3 text-lg font-semibold text-white">
                Cover → Fragen → Lösungen → CTA
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <WorkflowStepCard
              step="1"
              title="Quiz anlegen"
              description="Titel, Kategorie, CTA und Fragen im Quiz-Builder erfassen."
            />
            <WorkflowStepCard
              step="2"
              title="Quiz speichern"
              description="Das Quiz wird lokal gespeichert und ist in deiner Übersicht verfügbar."
            />
            <WorkflowStepCard
              step="3"
              title="Slides generieren"
              description="Aus dem Quiz werden automatisch Premium-Slides gebaut."
            />
            <WorkflowStepCard
              step="4"
              title="Content produzieren"
              description="Die Slides dienen als Basis für TikTok, Shorts oder Reels."
            />
          </div>
        </section>

        {/* LATEST QUIZZES */}
        <section className="mt-8 rounded-[36px] border border-zinc-900 bg-zinc-950 p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                Zuletzt gespeichert
              </p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                Deine letzten Quizze
              </h2>
            </div>

            <Link
              href="/my-quizzes"
              className="inline-flex items-center justify-center rounded-[24px] border border-zinc-800 px-5 py-3 text-base font-semibold transition hover:bg-zinc-900"
            >
              Alle Quizze anzeigen
            </Link>
          </div>

          {!isLoaded ? (
            <div className="rounded-[28px] border border-zinc-900 bg-black p-10 text-center">
              <h3 className="text-2xl font-black">Quizze werden geladen …</h3>
              <p className="mt-3 text-zinc-400">
                Einen Moment – deine Übersicht wird vorbereitet.
              </p>
            </div>
          ) : latestQuizzes.length === 0 ? (
            <div className="rounded-[28px] border border-zinc-900 bg-black p-10 text-center">
              <h3 className="text-2xl font-black">Noch keine Quizze vorhanden</h3>
              <p className="mt-3 text-zinc-400">
                Erstelle jetzt dein erstes Quiz und starte deinen Slide-Workflow.
              </p>

              <div className="mt-6">
                <Link
                  href="/my-quizzes/new-quiz"
                  className="inline-flex items-center justify-center rounded-[24px] bg-lime-400 px-6 py-3 text-base font-black text-black transition hover:bg-lime-300"
                >
                  Erstes Quiz erstellen
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 xl:grid-cols-3">
              {latestQuizzes.map((quiz) => (
                <LatestQuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          )}
        </section>

        {/* SYSTEM INFO */}
        <section className="mt-8 grid gap-5 xl:grid-cols-2">
          <InfoPanel
            title="Was dein aktuelles System jetzt kann"
            items={[
              "1 bis 10 Fragen pro Quiz",
              "Quiz lokal speichern",
              "Quiz-Übersicht mit Vorschau",
              "Detailseite für jedes Quiz",
              "Automatische Slide-Erzeugung",
              "Cover, Fragen, Lösungen und CTA-Slide",
            ]}
          />

          <InfoPanel
            title="Nächste sinnvolle Ausbaustufe"
            items={[
              "PNG-Export pro Slide",
              "Alle Slides gesammelt exportieren",
              "Mehrere Design-Themes (Neon / WM Gold / Bundesliga)",
              "Automatische KI-Fragengenerierung",
              "Direkter Download für TikTok-Slides",
              "Später: Social-Post-Workflow / Caption / Hashtags",
            ]}
          />
        </section>
      </div>
    </main>
  );
}

function QuickActionCard({
  title,
  description,
  href,
  buttonText,
  accent,
}: {
  title: string;
  description: string;
  href: string;
  buttonText: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-[32px] border p-6 md:p-7 ${
        accent
          ? "border-lime-500/20 bg-lime-500/5"
          : "border-zinc-900 bg-zinc-950"
      }`}
    >
      <h3 className="text-2xl font-black text-white">{title}</h3>
      <p className="mt-4 text-lg leading-relaxed text-zinc-400">
        {description}
      </p>

      <div className="mt-6">
        <Link
          href={href}
          className={`inline-flex items-center justify-center rounded-[24px] px-5 py-3 text-base font-semibold transition ${
            accent
              ? "bg-lime-400 text-black hover:bg-lime-300"
              : "border border-zinc-800 bg-black text-white hover:bg-zinc-900"
          }`}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

function DashboardStatCard({
  label,
  value,
  subValue,
  accent,
}: {
  label: string;
  value: string;
  subValue?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-[28px] border p-5 ${
        accent
          ? "border-lime-500/20 bg-lime-500/5"
          : "border-zinc-900 bg-black"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
        {label}
      </p>
      <p
        className={`mt-4 break-words text-2xl font-black leading-snug ${
          accent ? "text-lime-400" : "text-white"
        }`}
      >
        {value}
      </p>
      {subValue ? (
        <p className="mt-2 text-sm font-medium text-zinc-400">{subValue}</p>
      ) : null}
    </div>
  );
}

function WorkflowStepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[28px] border border-zinc-900 bg-black p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lime-400 text-lg font-black text-black">
          {step}
        </div>
        <div className="text-xl font-bold text-white">{title}</div>
      </div>

      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        {description}
      </p>
    </div>
  );
}

function LatestQuizCard({ quiz }: { quiz: SavedQuiz }) {
  const validQuestionCount = getValidQuestionCount(quiz);

  return (
    <article className="rounded-[30px] border border-zinc-900 bg-black p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-lime-300">
          {quiz.category || "Fußball Quiz"}
        </span>

        <span className="rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300">
          {validQuestionCount} Frage{validQuestionCount === 1 ? "" : "n"}
        </span>
      </div>

      <h3 className="mt-5 text-3xl font-black leading-tight text-white break-words">
        {quiz.title || "Unbenanntes Quiz"}
      </h3>

      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        {quiz.cta?.trim() || "Folge für mehr Fußball-Quizze ⚽"}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/my-quizzes/${quiz.id}`}
          className="inline-flex items-center justify-center rounded-[22px] border border-zinc-800 bg-zinc-950 px-5 py-3 text-base font-semibold transition hover:bg-zinc-900"
        >
          Öffnen
        </Link>

        <Link
          href={`/my-quizzes/${quiz.id}/slides`}
          className="inline-flex items-center justify-center rounded-[22px] bg-lime-400 px-5 py-3 text-base font-black text-black transition hover:bg-lime-300"
        >
          Slides
        </Link>
      </div>
    </article>
  );
}

function InfoPanel({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="rounded-[36px] border border-zinc-900 bg-zinc-950 p-6 md:p-8">
      <h2 className="text-3xl font-black md:text-4xl">{title}</h2>

      <div className="mt-6 grid gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-[24px] border border-zinc-900 bg-black px-5 py-4"
          >
            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime-400 text-sm font-black text-black">
              {index + 1}
            </div>
            <div className="text-lg leading-relaxed text-zinc-200">{item}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function normalizeQuiz(quiz: SavedQuiz): SavedQuiz {
  return {
    id: quiz?.id || crypto.randomUUID(),
    title: quiz?.title?.trim() || "Unbenanntes Quiz",
    category: quiz?.category?.trim() || "Fußball Quiz",
    cta: quiz?.cta?.trim() || "Folge für mehr Fußball-Quizze ⚽",
    createdAt: quiz?.createdAt || new Date().toISOString(),
    questions: Array.isArray(quiz?.questions)
      ? quiz.questions.map((q) => ({
          question: q?.question || "",
          answerA: q?.answerA || "",
          answerB: q?.answerB || "",
          answerC: q?.answerC || "",
          correctAnswer:
            q?.correctAnswer === "A" ||
            q?.correctAnswer === "B" ||
            q?.correctAnswer === "C"
              ? q.correctAnswer
              : "A",
        }))
      : [],
  };
}

function getValidQuestionCount(quiz: SavedQuiz) {
  if (!Array.isArray(quiz.questions)) return 0;

  return quiz.questions.filter((q) => {
    return Boolean(
      q?.question?.trim() ||
        q?.answerA?.trim() ||
        q?.answerB?.trim() ||
        q?.answerC?.trim()
    );
  }).length;
}