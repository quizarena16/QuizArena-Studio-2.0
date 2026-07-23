"use client";

import { Question } from "./types";

type Props = {
  question: Question;
  onQuestionChange: (value: string) => void;
  onAnswerChange: (index: number, value: string) => void;
  onCorrectChange: (index: number) => void;
};

export default function QuestionEditor({
  question,
  onQuestionChange,
  onAnswerChange,
  onCorrectChange,
}: Props) {
  return (
    <section className="flex-1 overflow-y-auto bg-[#17181d] p-8">

      <div className="mx-auto max-w-3xl space-y-8">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-4 text-xl font-bold">
            Frage
          </h2>

          <textarea
            value={question.question}
            onChange={(e) => onQuestionChange(e.target.value)}
            className="h-36 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 outline-none"
          />

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-6 text-xl font-bold">
            Antworten
          </h2>

          <div className="space-y-4">

            {question.answers.map((answer, index) => (

              <div
                key={index}
                className="flex items-center gap-4"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 font-bold text-black">
                  {String.fromCharCode(65 + index)}
                </div>

                <input
                  value={answer}
                  onChange={(e) =>
                    onAnswerChange(index, e.target.value)
                  }
                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 p-4 outline-none"
                />

              </div>

            ))}

          </div>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-5 text-xl font-bold">
            Richtige Antwort
          </h2>

          <div className="grid grid-cols-4 gap-4">

            {question.answers.map((_, index) => (

              <button
                key={index}
                onClick={() => onCorrectChange(index)}
                className={`rounded-xl p-4 font-bold transition ${
                  question.correctAnswer === index
                    ? "bg-lime-400 text-black"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </button>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}