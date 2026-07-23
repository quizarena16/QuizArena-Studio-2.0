import PhonePreview from "./PhonePreview";
export default function EditorLayout() {
  return (
    <div className="flex h-screen bg-[#0b0b0d] text-white">

      {/* Linke Sidebar */}
      <aside className="w-80 border-r border-zinc-800 bg-[#101012] p-6">

        <h2 className="text-2xl font-bold mb-8">
          Quiz bearbeiten
        </h2>

        <div className="space-y-4">

          <input
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3"
            placeholder="Quiz Titel"
          />

          <select
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3"
          >
            <option>Bundesliga</option>
            <option>Champions League</option>
            <option>WM</option>
            <option>Premier League</option>
          </select>

          <button
            className="w-full rounded-xl bg-lime-400 text-black font-bold p-4 hover:bg-lime-300 transition"
          >
            + Neue Frage
          </button>

        </div>

      </aside>

      {/* Mitte */}

      <main className="flex-1 flex items-center justify-center">

        <div className="w-[390px] h-[690px] rounded-[35px] bg-black border border-zinc-700 shadow-2xl flex items-center justify-center">

          <PhonePreview />

        </div>

      </main>

      {/* Rechte Sidebar */}

      <aside className="w-80 border-l border-zinc-800 bg-[#101012] p-6">

        <h2 className="text-xl font-bold mb-6">
          Export
        </h2>

        <button className="w-full rounded-xl bg-lime-400 text-black font-bold p-4 mb-4">
          PNG exportieren
        </button>

        <button className="w-full rounded-xl bg-zinc-800 p-4">
          Quiz speichern
        </button>

      </aside>

    </div>
  );
}