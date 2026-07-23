"use client";

export default function QuestionSidebar() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">
        Fragen
      </h2>

      <button className="mb-6 w-full rounded-xl bg-lime-500 py-3 font-semibold text-black">
        + Neue Frage
      </button>

      <div className="space-y-3">
        <div className="rounded-xl border border-lime-500 p-4">
          Frage 1
        </div>

        <div className="rounded-xl border border-zinc-700 p-4">
          Frage 2
        </div>

        <div className="rounded-xl border border-zinc-700 p-4">
          Frage 3
        </div>
      </div>
    </div>
  );
}