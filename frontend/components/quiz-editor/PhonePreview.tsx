"use client";

import { Question } from "./types";

type Props = {
  title: string;
  question: Question;
};

export default function PhonePreview({
  title,
  question,
}: Props) {
  return (
    <aside className="sticky top-8 flex w-[420px] items-start justify-center p-8">

      <div className="w-[390px] rounded-[36px] border border-zinc-700 bg-black p-8 shadow-2xl">

        <div className="text-center">

          <div className="mb-8 text-sm font-bold uppercase tracking-[8px] text-lime-400">
            {title}
          </div>

          <h1 className="mb-10 text-4xl font-black leading-tight">
            {question.question}
          </h1>

          <div className="space-y-4">

            {question.answers.map((answer, index) => (

              <div
                key={index}
                className={`rounded-xl border p-4 text-left transition ${
                  question.correctAnswer === index
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

    </aside>
  );
}