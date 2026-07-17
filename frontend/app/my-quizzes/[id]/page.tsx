"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import html2canvas from "html2canvas";
import {
  getSlidesStorageKey,
  type GeneratedSlide,
  type SavedQuiz,
} from "@/app/lib/slide-builder";

type SlideType = GeneratedSlide["type"];

export default function QuizSlidesPage() {
  const params = useParams();
  const quizId = params?.id as string;

  const [quiz, setQuiz] = useState<SavedQuiz | null>(null);
  const [slides, setSlides] = useState<GeneratedSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !quizId) return;

    try {
      const rawQuizzes = localStorage.getItem("quizarena_quizzes");
      if (rawQuizzes) {
        const parsed = JSON.parse(rawQuizzes) as SavedQuiz[];
        const foundQuiz = parsed.find((entry) => entry.id === quizId) ?? null;
        setQuiz(foundQuiz);
      }

      const rawSlides = localStorage.getItem(getSlidesStorageKey(quizId));
      if (rawSlides) {
        const parsedSlides = JSON.parse(rawSlides) as GeneratedSlide[];
        setSlides(Array.isArray(parsedSlides) ? parsedSlides : []);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Slides:", error);
      setSlides([]);
      setQuiz(null);
    } finally {
      setIsLoading(false);
    }
  }, [quizId]);

  const currentSlide = slides[currentIndex] ?? null;

  async function exportCurrentSlide() {
    if (!currentSlide) return;
    setIsExporting(true);

    try {
      const element = document.getElementById(`slide-export-${currentIndex}`);
      if (!element) return;

      const canvas = await html2canvas(element, {
        backgroundColor: "#000000",
        scale: 2,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${slugify(quiz?.title || "quiz")}-${currentIndex + 1}-${currentSlide.type}.png`;
      link.click();
    } finally {
      setIsExporting(false);
    }
  }

  async function exportAllSlides() {
    if (!slides.length) return;
    setIsExporting(true);

    try {
      for (let index = 0; index < slides.length; index++) {
        setCurrentIndex(index);
        await wait(180);

        const element = document.getElementById(`slide-export-${index}`);
        if (!element) continue;

        const canvas = await html2canvas(element, {
          backgroundColor: "#000000",
          scale: 2,
          useCORS: true,
        });

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${slugify(quiz?.title || "quiz")}-${index + 1}-${slides[index].type}.png`;
        link.click();

        await wait(120);
      }
    } finally {
      setIsExporting(false);
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black px-6 py-8 text-white md:px-10 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[36px] border border-zinc-800 bg-zinc-950/80 p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              QuizArena Studio
            </p>
            <h1 className="mt-4 text-4xl font-black md:text-6xl">
              Slides werden geladen…
            </h1>
          </div>
        </div>
      </main>
    );
  }

  if (!quiz) {
    return (
      <main className="min-h-screen bg-black px-6 py-8 text-white md:px-10 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex justify-end">
            <Link
              href="/my-quizzes"
              className="rounded-[24px] border border-zinc-800 px-6 py-4 text-lg font-medium text-white transition hover:bg-zinc-900"
            >
              ← Zurück zu Meine Quizze
            </Link>
          </div>

          <div className="rounded-[40px] border border-zinc-800 bg-zinc-950/80 p-10 md:p-14">
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              QuizArena Studio
            </p>
            <h1 className="mt-4 text-5xl font-black md:text-7xl">
              Quiz nicht gefunden
            </h1>
            <p className="mt-4 max-w-3xl text-2xl text-zinc-400">
              Für diese ID wurde kein gespeichertes Quiz gefunden.
            </p>

            <div className="mt-12 rounded-[36px] border border-zinc-800 bg-zinc-950 p-10 text-center">
              <h2 className="text-4xl font-black md:text-6xl">
                Dieses Quiz existiert nicht
              </h2>
              <p className="mx-auto mt-5 max-w-4xl text-xl leading-9 text-zinc-400 md:text-2xl">
                Möglicherweise wurde es gelöscht oder der LocalStorage wurde
                zurückgesetzt.
              </p>

              <Link
                href="/new-quiz"
                className="mt-10 inline-flex rounded-[28px] bg-lime-400 px-8 py-5 text-2xl font-black text-black transition hover:bg-lime-300"
              >
                + Neues Quiz erstellen
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!slides.length) {
    return (
      <main className="min-h-screen bg-black px-6 py-8 text-white md:px-10 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                QuizArena Studio
              </p>
              <h1 className="mt-4 text-5xl font-black md:text-7xl">
                Generierte Slides
              </h1>
            </div>

            <Link
              href={`/my-quizzes/${quiz.id}`}
              className="h-fit rounded-[24px] border border-zinc-800 px-6 py-4 text-lg font-medium text-white transition hover:bg-zinc-900"
            >
              ← Zurück zum Quiz
            </Link>
          </div>

          <div className="rounded-[40px] border border-zinc-800 bg-zinc-950/80 p-10 md:p-14">
            <h2 className="text-4xl font-black md:text-6xl">
              Keine Slides gefunden
            </h2>
            <p className="mt-5 max-w-4xl text-xl leading-9 text-zinc-400 md:text-2xl">
              Für dieses Quiz wurden noch keine Slides im LocalStorage gefunden.
              Öffne das Quiz und klicke dort auf{" "}
              <span className="text-white">„Slides generieren“</span>.
            </p>

            <Link
              href={`/my-quizzes/${quiz.id}`}
              className="mt-10 inline-flex rounded-[28px] bg-lime-400 px-8 py-5 text-2xl font-black text-black transition hover:bg-lime-300"
            >
              Zum Quiz
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white md:px-10 md:py-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              QuizArena Studio
            </p>
            <h1 className="mt-4 text-5xl font-black md:text-7xl">
              Generierte Slides
            </h1>
            <p className="mt-4 max-w-4xl text-xl text-zinc-400 md:text-2xl">
              Vorschau deiner automatisch erzeugten TikTok-Quiz-Slides.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/my-quizzes/${quiz.id}`}
              className="rounded-[24px] border border-zinc-800 px-6 py-4 text-lg font-medium text-white transition hover:bg-zinc-900"
            >
              ← Zurück zum Quiz
            </Link>

            <button
              onClick={exportCurrentSlide}
              disabled={isExporting}
              className="rounded-[24px] border border-zinc-800 bg-zinc-900 px-6 py-4 text-lg font-bold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isExporting ? "Export läuft…" : "Aktuelle Slide als PNG"}
            </button>

            <button
              onClick={exportAllSlides}
              disabled={isExporting}
              className="rounded-[24px] bg-lime-400 px-6 py-4 text-lg font-black text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isExporting ? "Export läuft…" : "Alle Slides exportieren"}
            </button>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="rounded-[36px] border border-zinc-800 bg-zinc-950/80 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Slides
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {slides.length} gesamt
                </h2>
              </div>

              <div className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
                {currentIndex + 1}/{slides.length}
              </div>
            </div>

            <div className="space-y-3">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.type}-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full rounded-[24px] border p-4 text-left transition ${
                    index === currentIndex
                      ? "border-lime-400 bg-lime-400/10"
                      : "border-zinc-800 bg-zinc-950 hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                        {getSlideLabel(slide.type)}
                      </div>
                      <div className="mt-2 text-lg font-bold text-white">
                        {getSlideHeadline(slide)}
                      </div>
                    </div>

                    <div className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">
                      {index + 1}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="rounded-[36px] border border-zinc-800 bg-zinc-950/80 p-6 md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                  {currentSlide ? getSlideLabel(currentSlide.type) : "Slide"}
                </p>
                <h2 className="mt-2 text-3xl font-black md:text-4xl">
                  {currentSlide ? getSlideHeadline(currentSlide) : "Keine Slide"}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="rounded-[20px] border border-zinc-800 px-5 py-3 text-base font-semibold text-white transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Vorherige
                </button>

                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      Math.min(slides.length - 1, prev + 1)
                    )
                  }
                  disabled={currentIndex === slides.length - 1}
                  className="rounded-[20px] border border-zinc-800 px-5 py-3 text-base font-semibold text-white transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Nächste →
                </button>
              </div>
            </div>

            {currentSlide && (
              <div className="overflow-auto rounded-[32px] border border-zinc-800 bg-black p-4">
                <SlideStage
                  slide={currentSlide}
                  index={currentIndex}
                  quiz={quiz}
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function SlideStage({
  slide,
  index,
  quiz,
}: {
  slide: GeneratedSlide;
  index: number;
  quiz: SavedQuiz;
}) {
  return (
    <div className="flex min-w-[1120px] justify-center">
      <div id={`slide-export-${index}`} className="w-[1080px]">
        <TikTokCanvas>
          {slide.type === "cover" && <CoverSlideView slide={slide} quiz={quiz} />}
          {slide.type === "question" && <QuestionSlideView slide={slide} />}
          {slide.type === "solutions" && <SolutionsSlideView slide={slide} />}
          {slide.type === "cta" && <CtaSlideView slide={slide} quiz={quiz} />}
        </TikTokCanvas>
      </div>
    </div>
  );
}

function TikTokCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[9/16] w-[1080px] overflow-hidden rounded-[44px] border border-zinc-800 bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(163,230,53,0.18),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(163,230,53,0.08),_transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
      <div className="relative z-10 flex h-full flex-col p-[72px]">
        {children}
      </div>
    </div>
  );
}

function CoverSlideView({
  slide,
  quiz,
}: {
  slide: Extract<GeneratedSlide, { type: "cover" }>;
  quiz: SavedQuiz;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[24px] uppercase tracking-[0.45em] text-zinc-500">
            QuizArena
          </div>
          <div className="mt-6 inline-flex rounded-full border border-lime-500/30 bg-lime-500/10 px-6 py-3 text-[28px] font-bold text-lime-300">
            {slide.category}
          </div>
        </div>

        <div className="text-[28px] uppercase tracking-[0.45em] text-zinc-500">
          Cover
        </div>
      </div>

      <div className="mt-16 rounded-[42px] border border-lime-500/20 bg-[linear-gradient(180deg,rgba(101,163,13,0.22),rgba(6,10,6,0.3))] p-12 shadow-[0_0_60px_rgba(163,230,53,0.08)]">
        <div className="text-[28px] uppercase tracking-[0.4em] text-zinc-400">
          {slide.subtitle}
        </div>
        <h1 className="mt-8 text-[96px] font-black uppercase leading-[0.92] tracking-[-0.05em] text-white">
          {slide.title}
        </h1>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-6">
        <StatBox label="Fragen" value={String(quiz.questions.length)} />
        <StatBox label="Kategorie" value={quiz.category || "Quiz"} />
        <StatBox label="Format" value="TikTok 9:16" />
      </div>

      <div className="mt-auto rounded-[42px] border border-zinc-800 bg-zinc-950/80 p-10">
        <div className="text-[26px] uppercase tracking-[0.35em] text-zinc-500">
          Challenge
        </div>
        <div className="mt-4 text-[42px] font-black leading-[1.05] text-white">
          Schaffst du alle Fragen ohne Fehler?
        </div>
        <div className="mt-4 text-[28px] leading-[1.35] text-zinc-400">
          Speichere das Quiz und schick es an deine Freunde.
        </div>
      </div>
    </div>
  );
}

function QuestionSlideView({
  slide,
}: {
  slide: Extract<GeneratedSlide, { type: "question" }>;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <div className="text-[38px] font-bold uppercase tracking-[0.3em] text-lime-300">
          Frage {slide.questionNumber}
        </div>
        <div className="rounded-full border border-zinc-700 px-5 py-2 text-[24px] text-zinc-300">
          3 Antworten
        </div>
      </div>

      <div className="mt-10 rounded-[38px] border border-zinc-800 bg-zinc-950/80 p-10">
        <h2 className="text-[66px] font-black leading-[1.06] tracking-[-0.03em] text-white">
          {slide.question}
        </h2>
      </div>

      <div className="mt-8 flex-1 space-y-5">
        {slide.answers.map((answer) => (
          <div
            key={answer.letter}
            className="rounded-[28px] border border-zinc-800 bg-zinc-950/80 p-6 md:p-7"
          >
            <div className="flex items-start gap-5">
              <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[34px] font-black text-white">
                {answer.letter}
              </div>
              <div className="pt-1 text-[34px] font-semibold leading-[1.2] text-white">
                {answer.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[34px] border border-lime-500/20 bg-lime-500/10 p-7">
        <div className="text-[24px] uppercase tracking-[0.35em] text-lime-300">
          QuizArena
        </div>
        <div className="mt-3 text-[28px] font-semibold text-white">
          Kommentiere deine Antwort und swipe bis zur Lösung.
        </div>
      </div>
    </div>
  );
}

function SolutionsSlideView({
  slide,
}: {
  slide: Extract<GeneratedSlide, { type: "solutions" }>;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[24px] uppercase tracking-[0.4em] text-zinc-500">
            Lösungen
          </div>
          <h2 className="mt-5 text-[84px] font-black leading-[0.95] tracking-[-0.05em] text-white">
            {slide.title}
          </h2>
        </div>

        <div className="rounded-full border border-lime-500/30 bg-lime-500/10 px-6 py-3 text-[28px] font-bold text-lime-300">
          {slide.solutions.length} Antworten
        </div>
      </div>

      <div className="mt-10 flex-1 space-y-5">
        {slide.solutions.map((solution) => (
          <div
            key={solution.questionNumber}
            className="rounded-[32px] border border-zinc-800 bg-zinc-950/80 p-7"
          >
            <div className="flex items-start gap-5">
              <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full bg-lime-400 text-[30px] font-black text-black">
                {solution.questionNumber}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-2 text-[22px] font-bold text-lime-300">
                    {solution.correctLetter}
                  </span>
                  <span className="text-[24px] uppercase tracking-[0.3em] text-zinc-500">
                    Richtige Antwort
                  </span>
                </div>

                <div className="mt-3 text-[34px] font-bold leading-[1.15] text-white">
                  {solution.correctText}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[34px] border border-zinc-800 bg-zinc-950/80 p-7">
        <div className="text-[24px] uppercase tracking-[0.35em] text-zinc-500">
          Nächster Schritt
        </div>
        <div className="mt-3 text-[28px] font-semibold text-white">
          Wie viele hattest du richtig? Schreib es in die Kommentare.
        </div>
      </div>
    </div>
  );
}

function CtaSlideView({
  slide,
  quiz,
}: {
  slide: Extract<GeneratedSlide, { type: "cta" }>;
  quiz: SavedQuiz;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="text-[24px] uppercase tracking-[0.45em] text-zinc-500">
          QuizArena
        </div>
        <div className="text-[28px] uppercase tracking-[0.45em] text-zinc-500">
          CTA
        </div>
      </div>

      <div className="my-auto rounded-[48px] border border-lime-500/20 bg-[radial-gradient(circle_at_top,rgba(163,230,53,0.2),rgba(0,0,0,0.15))] p-14 text-center shadow-[0_0_80px_rgba(163,230,53,0.08)]">
        <div className="text-[28px] uppercase tracking-[0.35em] text-lime-300">
          {slide.title}
        </div>
        <h2 className="mt-6 text-[86px] font-black leading-[0.95] tracking-[-0.05em] text-white">
          {slide.text}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StatBox label="Kategorie" value={quiz.category || "Quiz"} />
        <StatBox label="Mehr" value="Tägliche Fußball-Quizze" />
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[28px] border border-zinc-800 bg-zinc-950/80 p-7">
      <div className="text-[22px] uppercase tracking-[0.3em] text-zinc-500">
        {label}
      </div>
      <div className="mt-4 text-[34px] font-bold leading-[1.1] text-white">
        {value}
      </div>
    </div>
  );
}

function getSlideHeadline(slide: GeneratedSlide) {
  switch (slide.type) {
    case "cover":
      return slide.title;
    case "question":
      return `Frage ${slide.questionNumber}`;
    case "solutions":
      return slide.title;
    case "cta":
      return slide.title;
    default:
      return "Slide";
  }
}

function getSlideLabel(type: SlideType) {
  switch (type) {
    case "cover":
      return "Cover";
    case "question":
      return "Frage";
    case "solutions":
      return "Lösungen";
    case "cta":
      return "CTA";
    default:
      return "Slide";
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}