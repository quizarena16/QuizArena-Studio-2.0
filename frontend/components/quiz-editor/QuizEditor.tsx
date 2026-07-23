"use client";

import { useMemo, useState } from "react";
import { demoQuiz } from "./sampleData";
import { Question } from "./types";
import AIQuizGenerator from "./AIQuizGenerator";

export default function QuizEditor() {
  const [quiz, setQuiz] = useState(demoQuiz);

  const [selectedId, setSelectedId] = useState(
    demoQuiz.questions[0]?.id ?? ""
  );

  const selectedQuestion = useMemo(() => {
    return (
      quiz.questions.find((q) => q.id === selectedId) ??
      quiz.questions[0]
    );
  }, [quiz, selectedId]);

  function addQuestion() {
    const question: Question = {
      id: crypto.randomUUID(),
      question: "Neue Frage",
      answers: [
        "Antwort A",
        "Antwort B",
        "Antwort C",
        "Antwort D",
      ],
      correctAnswer: 0,
    };

    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, question],
    }));

    setSelectedId(question.id);
  }

  function updateQuestion(value: string) {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === selectedId
          ? {
              ...q,
              question: value,
            }
          : q
      ),
    }));
  }

  function updateAnswer(index: number, value: string) {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id !== selectedId) return q;

        const answers = [...q.answers];
        answers[index] = value;

        return {
          ...q,
          answers,
        };
      }),
    }));
  }

  function updateCorrect(index: number) {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === selectedId
          ? {
              ...q,
              correctAnswer: index,
            }
          : q
      ),
    }));
  }

 function handleGenerateQuiz(
  questions: Question[],
  topic: string
) {
  setQuiz({
    title: topic,
    category: topic,
    questions,
  });

  if (questions.length > 0) {
    setSelectedId(questions[0].id);
  }
}

  if (!selectedQuestion) {
    return null;
  }

  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#0b0b0d] text-white">

      {/* Sidebar */}

      <aside className="w-72 border-r border-zinc-800 p-5 overflow-auto">

        <button
          onClick={addQuestion}
          className="mb-6 w-full rounded-xl bg-lime-400 py-3 font-bold text-black"
        >
          + Neue Frage
        </button>

        <div className="space-y-3">

          {quiz.questions.map((question, index) => (

            <button
              key={question.id}
              onClick={() => setSelectedId(question.id)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                selectedId === question.id
                  ? "border-lime-400 bg-lime-400/10"
                  : "border-zinc-700 bg-zinc-900"
              }`}
            >
              <div className="font-bold">
                Frage {index + 1}
              </div>

              <div className="mt-2 line-clamp-2 text-sm text-zinc-400">
                {question.question}
              </div>

            </button>

          ))}

        </div>

        <div className="mt-8">

          <AIQuizGenerator
            onGenerate={handleGenerateQuiz}
          />

        </div>

      </aside>

      {/* Editor */}

      <section className="w-[420px] border-r border-zinc-800 p-6 overflow-auto">

        <h2 className="mb-6 text-2xl font-bold">
          Frage bearbeiten
        </h2>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Frage
            </label>

            <textarea
              value={selectedQuestion.question}
              onChange={(e) => updateQuestion(e.target.value)}
              className="h-32 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 outline-none"
            />
          </div>
                    {selectedQuestion.answers.map((answer, index) => (

            <div key={index}>

              <label className="mb-2 block text-sm text-zinc-400">
                Antwort {String.fromCharCode(65 + index)}
              </label>

              <input
                value={answer}
                onChange={(e) => updateAnswer(index, e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 outline-none"
              />

            </div>

          ))}

          <div>

            <label className="mb-3 block text-sm text-zinc-400">
              Richtige Antwort
            </label>

            <div className="grid grid-cols-2 gap-3">

              {selectedQuestion.answers.map((_, index) => (

                <button
                  key={index}
                  onClick={() => updateCorrect(index)}
                  className={`rounded-xl border p-4 font-bold transition ${
                    selectedQuestion.correctAnswer === index
                      ? "border-lime-400 bg-lime-400 text-black"
                      : "border-zinc-700 bg-zinc-900"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </button>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* Live Vorschau */}

      <main className="flex flex-1 items-center justify-center p-10">

        <div className="w-[390px] rounded-[36px] border border-zinc-700 bg-black p-8 shadow-2xl">

          <div className="text-center">

            <div className="mb-8 text-sm uppercase tracking-[8px] text-lime-400">
              {quiz.title}
            </div>

            <h1 className="mb-10 text-4xl font-black leading-tight">
              {selectedQuestion.question}
            </h1>

            <div className="space-y-4">

              {selectedQuestion.answers.map((answer, index) => (

                <div
                  key={index}
                  className={`rounded-xl border p-4 text-left transition ${
                    selectedQuestion.correctAnswer === index
                      ? "border-lime-400 bg-lime-400/15"
                      : "border-zinc-700 bg-zinc-900"
                  }`}
                >
                  <span className="mr-2 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>

                  {answer}

                </div>

              ))}

            </div>

          </div>

        </div>

      </main>

    </div>

  );
}