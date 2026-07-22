"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  buildSlidesFromQuiz,
  getSlidesStorageKey,
  type QuizQuestion,
  type SavedQuiz,
} from "@/app/lib/slide-builder";

const QUIZ_STORAGE_KEY = "quizarena_quizzes";
const DEFAULT_CTA = "Folge für mehr Fußball-Quizze ⚽";
const DIFFICULTIES = ["Einsteiger", "Fortgeschritten", "Experte"] as const;

type Difficulty = (typeof DIFFICULTIES)[number];

const EMPTY_QUESTION: QuizQuestion = {
  question: "",
  answerA: "",
  answerB: "",
  answerC: "",
  correctAnswer: "A",
};

export default function NewQuizPage() {
  const [topic, setTopic] = useState("Bundesliga Legenden");
  const [difficulty, setDifficulty] = useState<Difficulty>("Fortgeschritten");
  const [questionCount, setQuestionCount] = useState(5);
  const [title, setTitle] = useState("Bundesliga Legenden Quiz");
  const [category, setCategory] = useState("Fußball");
  const [cta, setCta] = useState(DEFAULT_CTA);
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    createGeneratedQuestions("Bundesliga Legenden", "Fortgeschritten", 5)
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [status, setStatus] = useState("");

  const selectedQuestion = questions[selectedIndex] ?? questions[0];
  const answeredQuestions = useMemo(
    () => questions.filter((question) => hasQuestionContent(question)).length,
    [questions]
  );

  function handleGenerateAiQuestions() {
    const safeTopic = topic.trim() || "Fußball";
    const generated = createGeneratedQuestions(safeTopic, difficulty, questionCount);

    setTitle(`${safeTopic} Quiz`);
    setCategory(safeTopic);
    setQuestions(generated);
    setSelectedIndex(0);
    setStatus(`${generated.length} KI-Fragen wurden erzeugt.`);
  }

  function updateQuestion(index: number, patch: Partial<QuizQuestion>) {
    setQuestions((current) =>
      current.map((question, questionIndex) =>
        questionIndex === index ? { ...question, ...patch } : question
      )
    );
  }

  function addQuestion() {
    setQuestions((current) => [...current, { ...EMPTY_QUESTION }]);
    setSelectedIndex(questions.length);
  }

  function duplicateQuestion(index: number) {
    setQuestions((current) => {
      const next = [...current];
      next.splice(index + 1, 0, { ...current[index] });
      return next;
    });
    setSelectedIndex(index + 1);
  }

  function removeQuestion(index: number) {
    setQuestions((current) => {
      if (current.length === 1) return [{ ...EMPTY_QUESTION }];
      return current.filter((_, questionIndex) => questionIndex !== index);
    });
    setSelectedIndex((current) => Math.max(0, Math.min(current - 1, questions.length - 2)));
  }

  function buildQuiz(): SavedQuiz {
    return {
      id: createId(),
      title: title.trim() || `${topic.trim() || "Fußball"} Quiz`,
      category: category.trim() || topic.trim() || "Fußball",
      cta: cta.trim() || DEFAULT_CTA,
      createdAt: new Date().toISOString(),
      questions: questions.map(normalizeQuestion).filter(hasQuestionContent),
    };
  }

  function saveQuiz() {
    const quiz = buildQuiz();

    if (!quiz.questions.length) {
      setStatus("Bitte lege mindestens eine Frage an.");
      return;
    }

    try {
      const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const existingQuizzes = Array.isArray(parsed) ? (parsed as SavedQuiz[]) : [];
      const nextQuizzes = [quiz, ...existingQuizzes];
      const slides = buildSlidesFromQuiz(quiz);

      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(nextQuizzes));
      localStorage.setItem(getSlidesStorageKey(quiz.id), JSON.stringify(slides));
      setStatus("Quiz gespeichert und Slides vorbereitet.");
    } catch (error) {
      console.error(error);
      setStatus("Das Quiz konnte nicht gespeichert werden.");
    }
  }

  function exportQuiz() {
    const quiz = buildQuiz();
    const payload = JSON.stringify({ quiz, slides: buildSlidesFromQuiz(quiz) }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${slugify(quiz.title)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Export wurde gestartet.");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070c] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,230,53,0.22),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.14),transparent_30%),linear-gradient(180deg,#05070c_0%,#09090b_100%)]" />
      <div className="relative mx-auto max-w-[1900px] px-5 py-6 md:px-8 lg:px-10">
        <header className="mb-6 flex flex-col gap-5 rounded-[34px] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/40 backdrop-blur md:p-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-lime-300/80">
              QuizArena Studio 2.0
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">
              Neues Quiz bauen
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-400 md:text-xl">
              Schnellere Erstellung mit Top-Toolbar, fokussierter Fragenliste,
              großem Editor und sticky Phone Preview.
            </p>
          </div>
          <Link href="/my-quizzes" className="w-fit rounded-2xl border border-white/10 px-5 py-3 font-bold text-zinc-200 transition hover:bg-white/10">
            Meine Quizze
          </Link>
        </header>

        <section className="sticky top-0 z-20 mb-6 rounded-[30px] border border-lime-300/20 bg-zinc-950/90 p-4 shadow-2xl shadow-lime-950/20 backdrop-blur-xl">
          <div className="grid gap-3 lg:grid-cols-[1.4fr_210px_150px_auto_auto_auto] lg:items-end">
            <ToolbarInput label="Thema" value={topic} onChange={setTopic} />
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.28em] text-zinc-500">Schwierigkeit</span>
              <select value={difficulty} onChange={(event) => setDifficulty(event.target.value as Difficulty)} className="h-12 w-full rounded-2xl border border-white/10 bg-black/50 px-4 font-bold text-white outline-none focus:border-lime-300">
                {DIFFICULTIES.map((entry) => <option key={entry}>{entry}</option>)}
              </select>
            </label>
            <ToolbarInput label="Anzahl Fragen" type="number" min={1} max={10} value={String(questionCount)} onChange={(value) => setQuestionCount(clamp(Number(value), 1, 10))} />
            <ToolbarButton onClick={handleGenerateAiQuestions}>KI erzeugen</ToolbarButton>
            <ToolbarButton onClick={saveQuiz} variant="primary">Speichern</ToolbarButton>
            <ToolbarButton onClick={exportQuiz}>Export</ToolbarButton>
          </div>
          {status ? <p className="mt-3 text-sm font-semibold text-lime-200">{status}</p> : null}
        </section>

        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_390px]">
          <aside className="rounded-[34px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Fragenliste</p>
                <h2 className="mt-1 text-2xl font-black">{questions.length} Fragen</h2>
              </div>
              <button type="button" onClick={addQuestion} className="rounded-2xl bg-lime-300 px-4 py-3 text-sm font-black text-black">+</button>
            </div>
            <div className="space-y-3">
              {questions.map((question, index) => (
                <button key={index} type="button" onClick={() => setSelectedIndex(index)} className={`w-full rounded-3xl border p-4 text-left transition ${selectedIndex === index ? "border-lime-300 bg-lime-300 text-black" : "border-white/10 bg-black/30 text-white hover:bg-white/10"}`}>
                  <span className="text-xs font-black uppercase tracking-[0.25em] opacity-70">Frage {index + 1}</span>
                  <span className="mt-2 line-clamp-2 block text-base font-bold">{question.question || "Neue Frage ohne Text"}</span>
                </button>
              ))}
            </div>
          </aside>

          <section className="rounded-[38px] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/30 backdrop-blur md:p-7">
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <EditorInput label="Quiz-Titel" value={title} onChange={setTitle} />
              <EditorInput label="Kategorie" value={category} onChange={setCategory} />
              <label className="block md:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.28em] text-zinc-500">Call to Action</span>
                <input value={cta} onChange={(event) => setCta(event.target.value)} className="h-14 w-full rounded-2xl border border-white/10 bg-black/40 px-5 text-lg font-semibold text-white outline-none focus:border-lime-300" />
              </label>
            </div>

            {selectedQuestion ? (
              <div className="rounded-[32px] border border-white/10 bg-black/35 p-5 md:p-6">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.32em] text-lime-300">Editor</p>
                    <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Frage {selectedIndex + 1}</h2>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => duplicateQuestion(selectedIndex)} className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold text-zinc-200 hover:bg-white/10">Duplizieren</button>
                    <button type="button" onClick={() => removeQuestion(selectedIndex)} className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100 hover:bg-red-500/20">Löschen</button>
                  </div>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.28em] text-zinc-500">Fragetext</span>
                  <textarea value={selectedQuestion.question} onChange={(event) => updateQuestion(selectedIndex, { question: event.target.value })} rows={4} className="w-full rounded-[26px] border border-white/10 bg-zinc-950/80 px-5 py-4 text-xl font-bold leading-8 text-white outline-none focus:border-lime-300" />
                </label>

                <div className="mt-5 grid gap-4">
                  {(["A", "B", "C"] as const).map((letter) => (
                    <AnswerInput key={letter} letter={letter} value={selectedQuestion[`answer${letter}`]} checked={selectedQuestion.correctAnswer === letter} onTextChange={(value) => updateQuestion(selectedIndex, { [`answer${letter}`]: value })} onCorrectChange={() => updateQuestion(selectedIndex, { correctAnswer: letter })} />
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          <aside className="xl:sticky xl:top-28 xl:self-start">
            <PhonePreview title={title} category={category} question={selectedQuestion} index={selectedIndex} total={questions.length} answered={answeredQuestions} />
          </aside>
        </div>
      </div>
    </main>
  );
}

function ToolbarInput({ label, value, onChange, type = "text", min, max }: { label: string; value: string; onChange: (value: string) => void; type?: string; min?: number; max?: number }) {
  return <label className="block"><span className="mb-2 block text-xs font-black uppercase tracking-[0.28em] text-zinc-500">{label}</span><input type={type} min={min} max={max} value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-full rounded-2xl border border-white/10 bg-black/50 px-4 font-bold text-white outline-none placeholder:text-zinc-600 focus:border-lime-300" /></label>;
}

function ToolbarButton({ children, onClick, variant = "secondary" }: { children: ReactNode; onClick: () => void; variant?: "primary" | "secondary" }) {
  return <button type="button" onClick={onClick} className={`h-12 rounded-2xl px-5 text-sm font-black transition ${variant === "primary" ? "bg-lime-300 text-black hover:bg-lime-200" : "border border-white/10 bg-white/10 text-white hover:bg-white/15"}`}>{children}</button>;
}

function EditorInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block"><span className="mb-2 block text-xs font-black uppercase tracking-[0.28em] text-zinc-500">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="h-14 w-full rounded-2xl border border-white/10 bg-black/40 px-5 text-lg font-semibold text-white outline-none focus:border-lime-300" /></label>;
}

function AnswerInput({ letter, value, checked, onTextChange, onCorrectChange }: { letter: "A" | "B" | "C"; value: string; checked: boolean; onTextChange: (value: string) => void; onCorrectChange: () => void }) {
  return <div className={`rounded-[26px] border p-4 ${checked ? "border-lime-300/70 bg-lime-300/10" : "border-white/10 bg-zinc-950/70"}`}><div className="flex gap-3"><button type="button" onClick={onCorrectChange} className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black ${checked ? "bg-lime-300 text-black" : "bg-white/10 text-white"}`}>{letter}</button><input value={value} onChange={(event) => onTextChange(event.target.value)} placeholder={`Antwort ${letter}`} className="min-w-0 flex-1 bg-transparent text-lg font-semibold text-white outline-none placeholder:text-zinc-600" /></div></div>;
}

function PhonePreview({ title, category, question, index, total, answered }: { title: string; category: string; question?: QuizQuestion; index: number; total: number; answered: number }) {
  return <div className="rounded-[42px] border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-black/50 backdrop-blur"><div className="mx-auto aspect-[9/16] max-h-[720px] rounded-[36px] border border-zinc-700 bg-gradient-to-br from-zinc-950 via-black to-lime-950 p-5 shadow-inner"><div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.24em] text-lime-200"><span>{category || "Fußball"}</span><span>{index + 1}/{total}</span></div><div className="mt-10 rounded-[28px] border border-white/10 bg-white/10 p-5"><p className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-400">{title || "QuizArena Quiz"}</p><h3 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em]">{question?.question || "Wähle links eine Frage aus."}</h3></div><div className="mt-6 space-y-3">{(["A", "B", "C"] as const).map((letter) => <div key={letter} className={`rounded-2xl border px-4 py-3 ${question?.correctAnswer === letter ? "border-lime-300 bg-lime-300 text-black" : "border-white/10 bg-black/35 text-white"}`}><span className="font-black">{letter}</span><span className="ml-3 font-bold">{question?.[`answer${letter}`] || `Antwort ${letter}`}</span></div>)}</div><div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-bold text-zinc-300">{answered} von {total} Fragen mit Inhalt</div></div></div>;
}

function createGeneratedQuestions(topic: string, difficulty: Difficulty, count: number): QuizQuestion[] {
  const safeCount = clamp(count, 1, 10);
  return Array.from({ length: safeCount }, (_, index) => {
    const number = index + 1;
    return {
      question: `${difficulty}-Frage ${number}: Welche Aussage passt am besten zu ${topic}?`,
      answerA: `${topic} Fakt ${number}`,
      answerB: `${topic} Mythos ${number}`,
      answerC: `${topic} Überraschung ${number}`,
      correctAnswer: (["A", "B", "C"] as const)[index % 3],
    };
  });
}

function normalizeQuestion(question: QuizQuestion): QuizQuestion {
  return {
    question: question.question.trim(),
    answerA: question.answerA.trim(),
    answerB: question.answerB.trim(),
    answerC: question.answerC.trim(),
    correctAnswer: question.correctAnswer,
  };
}

function hasQuestionContent(question: QuizQuestion) {
  return Boolean(question.question.trim() || question.answerA.trim() || question.answerB.trim() || question.answerC.trim());
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function slugify(value: string) {
  return (value || "quiz").toLowerCase().replace(/[^a-z0-9äöüß]+/gi, "-").replace(/^-+|-+$/g, "") || "quiz";
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `quiz_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
