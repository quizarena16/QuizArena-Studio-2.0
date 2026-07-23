"use client";

import { Question } from "./types";

type Props = {
  questions: Question[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
};

export default function QuestionList({
  questions,
  selectedId,
  onSelect,
  onAdd,
}: Props) {
  return (
    <div className="space-y-3">

      <button
        onClick={onAdd}
        className="w-full rounded-xl bg-lime-400 py-3 font-bold text-black"
      >
        + Neue Frage
      </button>

      {questions.map((question, index) => (
        <button
          key={question.id}
          onClick={() => onSelect(question.id)}
          className={`w-full rounded-xl border p-4 text-left transition ${
            selectedId === question.id
              ? "border-lime-400 bg-lime-400/10"
              : "border-zinc-700 bg-zinc-900"
          }`}
        >
          <div className="font-bold">
            Frage {index + 1}
          </div>

          <div className="mt-2 text-sm text-zinc-400 line-clamp-2">
            {question.question}
          </div>
        </button>
      ))}

    </div>
  );
}