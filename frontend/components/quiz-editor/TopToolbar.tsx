"use client";

type Props = {
  topic: string;
  setTopic: (value: string) => void;

  difficulty: string;
  setDifficulty: (value: string) => void;

  amount: number;
  setAmount: (value: number) => void;

  onGenerate: () => void;

  loading: boolean;
};

export default function TopToolbar({
  topic,
  setTopic,
  difficulty,
  setDifficulty,
  amount,
  setAmount,
  onGenerate,
  loading,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <select
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="rounded-xl bg-zinc-800 px-4 py-3"
      >
        <option value="bundesliga">Bundesliga</option>
        <option value="championsLeague">Champions League</option>
        <option value="premierLeague">Premier League</option>
        <option value="laliga">La Liga</option>
        <option value="serieA">Serie A</option>
        <option value="wm">WM</option>
        <option value="em">EM</option>
      </select>

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="rounded-xl bg-zinc-800 px-4 py-3"
      >
        <option>Leicht</option>
        <option>Mittel</option>
        <option>Schwer</option>
        <option>Experte</option>
      </select>

      <select
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="rounded-xl bg-zinc-800 px-4 py-3"
      >
        <option value={5}>5 Fragen</option>
        <option value={10}>10 Fragen</option>
        <option value={15}>15 Fragen</option>
        <option value={20}>20 Fragen</option>
      </select>

      <button
        onClick={onGenerate}
        disabled={loading}
        className="rounded-xl bg-lime-400 px-8 py-3 font-bold text-black"
      >
        {loading ? "Quiz wird erzeugt..." : "⚡ KI erzeugen"}
      </button>

      <button className="rounded-xl border border-zinc-700 px-6 py-3">
        💾 Speichern
      </button>

      <button className="rounded-xl border border-zinc-700 px-6 py-3">
        📤 Export
      </button>
    </div>
  );
}