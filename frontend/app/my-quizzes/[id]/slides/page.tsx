"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import html2canvas from "html2canvas";
import {
  getSlidesStorageKey,
  type GeneratedSlide,
  type CoverSlide,
  type QuestionSlide,
  type SolutionsSlide,
  type CtaSlide,
} from "@/app/lib/slide-builder";

type SlideType = GeneratedSlide["type"];

export default function QuizSlidesPage() {
  const params = useParams();
  const quizId = params?.id as string;

  const slides = useMemo<GeneratedSlide[]>(() => {
    if (typeof window === "undefined" || !quizId) return [];

    const storageKey = getSlidesStorageKey(quizId);
    const raw = localStorage.getItem(storageKey);

    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed as GeneratedSlide[];
    } catch {
      return [];
    }
  }, [quizId]);

  const [exportingAll, setExportingAll] = useState(false);

  async function exportElementAsPng(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const canvas = await html2canvas(element, {
    backgroundColor: "#050505",
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}


  async function handleExport() {
  if (!exportRef.current) return;

  setExporting(true);

  try {
    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: "#050505",
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const link = document.createElement("a");
    link.download = `${String(index + 1).padStart(2, "0")}-${getSlideLabel(
      slide.type
    )}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error(error);
  } finally {
    setExporting(false);
  }
}
    if (!slides.length) return;

    setExportingAll(true);

    try {
      for (let i = 0; i < slides.length; i += 1) {
        const element = document.getElementById(`export-slide-${i}`);
        if (!element) continue;

        await exportElementAsPng(
          element,
          `${String(i + 1).padStart(2, "0")}-${getSlideLabel(
            slides[i].type
          )}.png`
        );

        await wait(180);
      }
    } catch (error) {
      console.error("Export aller Slides fehlgeschlagen:", error);
      alert("Der Export aller Slides ist fehlgeschlagen.");
    } finally {
      setExportingAll(false);
    }
  }

  if (!slides.length) {
    return (
      <main className="min-h-screen bg-black px-6 py-8 text-white md:px-10 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                QuizArena Studio
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-7xl">
                Generierte Slides
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-zinc-400 md:text-2xl">
                Vorschau deiner automatisch erzeugten TikTok-Quiz-Slides.
              </p>
            </div>

            <Link
              href={`/my-quizzes/${quizId}`}
              className="rounded-[28px] border border-zinc-800 px-6 py-4 text-lg text-white transition hover:bg-zinc-900"
            >
              ← Zurück zum Quiz
            </Link>
          </div>

          <div className="rounded-[40px] border border-zinc-800 bg-zinc-950 px-8 py-16 text-center md:px-16">
            <h2 className="text-3xl font-bold md:text-5xl">
              Keine Slides gefunden
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400 md:text-2xl">
              Für dieses Quiz wurden noch keine Slides im LocalStorage gefunden.
            </p>
            <p className="mt-3 text-base text-zinc-500 md:text-xl">
              Öffne das Quiz und klicke dort auf „Slides generieren“.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white md:px-10 md:py-10">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-10 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              QuizArena Studio
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-7xl">
              Generierte Slides
            </h1>
            <p className="mt-4 max-w-4xl text-lg text-zinc-400 md:text-2xl">
              Vorschau deiner automatisch erzeugten TikTok-Quiz-Slides.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExportAll}
              disabled={exportingAll}
              className="rounded-[28px] bg-lime-400 px-6 py-4 text-lg font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {exportingAll ? "Export läuft..." : "Alle als PNG exportieren"}
            </button>

            <Link
              href={`/my-quizzes/${quizId}`}
              className="rounded-[28px] border border-zinc-800 px-6 py-4 text-lg text-white transition hover:bg-zinc-900"
            >
              ← Zurück zum Quiz
            </Link>
          </div>
        </div>

        <div className="space-y-10">
          {slides.map((slide, index) => (
            <SlideCard
              key={`${slide.type}-${index}`}
              slide={slide}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function SlideCard({
  slide,
  index,
}: {
  slide: GeneratedSlide;
  index: number;
}) {
 


    if (!exportRef.current) return;

    setExporting(true);

    try {
     async function handleExport() {
  if (!exportRef.current) return;

  setExporting(true);

  try {
    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: "#050505",
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const link = document.createElement("a");
    link.download = `${String(index + 1).padStart(2, "0")}-${getSlideLabel(
      slide.type
    )}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error(error);
  } finally {
    setExporting(false);
  }
}

     
 
  }

  return (
    <section className="rounded-[40px] border border-zinc-800 bg-zinc-950 p-6 md:p-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-end gap-6">
          <div className="text-5xl font-black tracking-[-0.04em] text-lime-400 md:text-7xl">
            Slide {index + 1}
          </div>
          <div className="pb-2 text-lg uppercase tracking-[0.35em] text-zinc-500 md:text-3xl">
            {getSlideLabel(slide.type)}
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="rounded-[24px] border border-zinc-800 px-5 py-3 text-base text-white transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-70 md:text-lg"
        >
          {exporting ? "Exportiere..." : "PNG exportieren"}
        </button>
      </div>

      <div className="rounded-[40px] border border-zinc-900 bg-[#070b0d] p-6 md:p-10">
        <div
          id={`export-slide-${index}`}
          ref={exportRef}
          className="mx-auto w-full max-w-[1080px] overflow-hidden rounded-[42px]"
          style={{
            aspectRatio: "9 / 16",
            border: "1px solid rgba(132,255,0,0.2)",
            background: "#081107",
            boxShadow: "0 0 80px rgba(132,255,0,0.08)",
          }}
        >
          <TikTokCanvas slide={slide} />
        </div>
      </div>
    </section>
  );
}

function TikTokCanvas({ slide }: { slide: GeneratedSlide }) {
  switch (slide.type) {
    case "cover":
      return <CoverSlideView slide={slide} />;

    case "question":
      return <QuestionSlideView slide={slide} />;

    case "solutions":
      return <SolutionsSlideView slide={slide} />;

    case "cta":
      return <CtaSlideView slide={slide} />;

    default:
      return null;
  }
}

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 56px",
        color: "#ffffff",
        background:
          "radial-gradient(circle at top, rgba(132,255,0,0.16), transparent 35%), linear-gradient(180deg, #11240a 0%, #081107 48%, #050505 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 30,
            textTransform: "uppercase",
            letterSpacing: "0.45em",
            color: "#d4d4d8",
          }}
        >
          QUIZARENA
        </div>

        <div
          style={{
            borderRadius: 9999,
            border: "1px solid rgba(132,255,0,0.3)",
            background: "rgba(132,255,0,0.1)",
            padding: "12px 24px",
            fontSize: 28,
            fontWeight: 700,
            color: "#b9ff6a",
          }}
        >
          {slide.category}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 820 }}>
          <p
            style={{
              fontSize: 34,
              textTransform: "uppercase",
              letterSpacing: "0.35em",
              color: "rgba(185,255,106,0.8)",
              margin: 0,
            }}
          >
            Premium Fußball Quiz
          </p>

          <h1
            style={{
              marginTop: 32,
              marginBottom: 0,
              fontSize: 118,
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 0.92,
              letterSpacing: "-0.05em",
            }}
          >
            {slide.title}
          </h1>

          <p
            style={{
              marginTop: 40,
              maxWidth: 760,
              fontSize: 40,
              lineHeight: 1.25,
              color: "#e4e4e7",
            }}
          >
            {slide.subtitle}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            borderRadius: 30,
            border: "1px solid #3f3f46",
            background: "rgba(0,0,0,0.25)",
            padding: "20px 32px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 28,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#a1a1aa",
            }}
          >
            Format
          </p>
          <p
            style={{
              marginTop: 8,
              marginBottom: 0,
              fontSize: 38,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            TikTok Quiz Slide
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <p
            style={{
              margin: 0,
              fontSize: 28,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#71717a",
            }}
          >
            Safe Zone
          </p>
          <p
            style={{
              marginTop: 8,
              marginBottom: 0,
              fontSize: 34,
              fontWeight: 600,
              color: "#d4d4d8",
            }}
          >
            Premium V1
          </p>
        </div>
      </div>
    </div>
  );
}

function QuestionSlideView({ slide }: { slide: QuestionSlide }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 56px",
        color: "#ffffff",
        background:
          "radial-gradient(circle at top, rgba(132,255,0,0.14), transparent 28%), linear-gradient(180deg, #0a1408 0%, #070707 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#b9ff6a",
          }}
        >
          Frage {slide.questionNumber}
        </div>

        <div
          style={{
            borderRadius: 9999,
            border: "1px solid #3f3f46",
            padding: "8px 20px",
            fontSize: 24,
            color: "#d4d4d8",
          }}
        >
          3 Antworten
        </div>
      </div>

      <div
        style={{
          marginTop: 40,
          borderRadius: 38,
          border: "1px solid #27272a",
          background: "rgba(9,9,11,0.8)",
          padding: 40,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 66,
            fontWeight: 900,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          {slide.question}
        </h2>
      </div>

      <div
        style={{
          marginTop: 32,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: 20,
        }}
      >
        {slide.answers.map((answer) => (
          <div
            key={answer.letter}
            style={{
              borderRadius: 28,
              border: "1px solid #27272a",
              background: "rgba(9,9,11,0.8)",
              padding: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 78,
                  height: 78,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 9999,
                  background: "#a3e635",
                  color: "#000000",
                  fontSize: 34,
                  fontWeight: 900,
                }}
              >
                {answer.letter}
              </div>

              <div
                style={{
                  paddingTop: 8,
                  fontSize: 40,
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: "#ffffff",
                }}
              >
                {answer.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, textAlign: "center" }}>
        <p
          style={{
            margin: 0,
            fontSize: 28,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#71717a",
          }}
        >
          Kommentiere deine Antwort 👇
        </p>
      </div>
    </div>
  );
}

function SolutionsSlideView({ slide }: { slide: SolutionsSlide }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 56px",
        color: "#ffffff",
        background:
          "radial-gradient(circle at top, rgba(132,255,0,0.14), transparent 28%), linear-gradient(180deg, #0a1408 0%, #070707 100%)",
      }}
    >
      <div
        style={{
          fontSize: 34,
          textTransform: "uppercase",
          letterSpacing: "0.35em",
          color: "rgba(185,255,106,0.8)",
        }}
      >
        Lösungen
      </div>

      <h2
        style={{
          marginTop: 20,
          marginBottom: 0,
          fontSize: 96,
          fontWeight: 900,
          textTransform: "uppercase",
          lineHeight: 0.95,
          letterSpacing: "-0.05em",
          color: "#ffffff",
        }}
      >
        {slide.title}
      </h2>

      <div
        style={{
          marginTop: 40,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: 20,
        }}
      >
        {slide.solutions.map((solution) => (
          <div
            key={solution.questionNumber}
            style={{
              borderRadius: 30,
              border: "1px solid #27272a",
              background: "rgba(9,9,11,0.8)",
              padding: "24px 28px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 9999,
                  background: "#a3e635",
                  color: "#000000",
                  fontSize: 30,
                  fontWeight: 900,
                }}
              >
                {solution.questionNumber}
              </div>

              <div style={{ minWidth: 0, flex: 1 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 22,
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    color: "#71717a",
                  }}
                >
                  Richtige Antwort
                </p>
                <p
                  style={{
                    marginTop: 8,
                    marginBottom: 0,
                    fontSize: 38,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: "#ffffff",
                  }}
                >
                  {solution.correctLetter}: {solution.correctText}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, textAlign: "center" }}>
        <p
          style={{
            margin: 0,
            fontSize: 28,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#71717a",
          }}
        >
          Wie viele hattest du richtig?
        </p>
      </div>
    </div>
  );
}

function CtaSlideView({ slide }: { slide: CtaSlide }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 56px",
        color: "#ffffff",
        background:
          "radial-gradient(circle at top, rgba(132,255,0,0.18), transparent 28%), linear-gradient(180deg, #12260a 0%, #081107 45%, #050505 100%)",
      }}
    >
      <div
        style={{
          fontSize: 34,
          textTransform: "uppercase",
          letterSpacing: "0.35em",
          color: "#d4d4d8",
        }}
      >
        QUIZARENA
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            borderRadius: 9999,
            border: "1px solid rgba(132,255,0,0.3)",
            background: "rgba(132,255,0,0.1)",
            padding: "12px 28px",
            fontSize: 28,
            fontWeight: 700,
            color: "#b9ff6a",
          }}
        >
          CTA
        </div>

        <h2
          style={{
            marginTop: 32,
            marginBottom: 0,
            fontSize: 118,
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 0.92,
            letterSpacing: "-0.05em",
            color: "#ffffff",
          }}
        >
          {slide.title}
        </h2>

        <p
          style={{
            marginTop: 40,
            maxWidth: 820,
            fontSize: 48,
            fontWeight: 600,
            lineHeight: 1.25,
            color: "#ffffff",
          }}
        >
          {slide.text}
        </p>

        <div
          style={{
            marginTop: 56,
            borderRadius: 34,
            background: "#a3e635",
            padding: "24px 40px",
            fontSize: 40,
            fontWeight: 900,
            color: "#000000",
          }}
        >
          @QuizArena folgen
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <p
          style={{
            margin: 0,
            fontSize: 26,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#71717a",
          }}
        >
          Mehr tägliche Fußball-Quizze, Battles und Rätsel
        </p>
      </div>
    </div>
  );
}

function getSlideLabel(type: SlideType) {
  switch (type) {
    case "cover":
      return "cover";
    case "question":
      return "frage";
    case "solutions":
      return "loesungen";
    case "cta":
      return "cta";
    default:
      return "slide";
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}