"use client";

export default function EditorPanel() {
  return (
    <div>

      <h2 className="mb-8 text-3xl font-bold">
        Frage bearbeiten
      </h2>

      <div className="space-y-5">

        <input
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4"
          placeholder="Frage"
        />

        <input
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4"
          placeholder="Antwort A"
        />

        <input
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4"
          placeholder="Antwort B"
        />

        <input
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4"
          placeholder="Antwort C"
        />

        <input
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4"
          placeholder="Antwort D"
        />

      </div>

    </div>
  );
}