"use client";

import { Question } from "./types";

type Props = {
  questions: Question[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
};

export default function QuestionSidebar({
  questions,
  selectedId,
  onSelect,
  onAdd,
}: Props) {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-zinc-800 bg-[#111214]">

      <div className="border-b border-zinc-800 p-5">

        <h2 className="text-xl font-bold">
          Fragen
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          {questions.length} Fragen
        </p>

        <button
          onClick={onAdd}
          className="mt-5 w-full rounded-xl bg-lime-400 py-3 font-bold text-black transition hover:bg-lime-300"
        >
          ➕ Neue Frage
        </button>

      </div>

      <div className="flex-1 overflow-y-auto p-4">

        <div className="space-y-3">

          {questions.map((question, index) => (

            <button
              key={question.id}
              onClick={() => onSelect(question.id)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                selectedId === question.id
                  ? "border-lime-400 bg-lime-400/10"
                  : "border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              <div className="font-bold text-lime-400">
                Frage {index + 1}
              </div>

              <div className="mt-2 line-clamp-2 text-sm text-zinc-300">
                {question.question}
              </div>

            </button>

          ))}

        </div>

      </div>

    </aside>
  );
}