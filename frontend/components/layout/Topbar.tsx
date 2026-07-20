"use client";

import { Search, Bell, User, Plus } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-8">

      <div>
        <h1 className="text-2xl font-black text-white">
          QuizArena Studio 2.0
        </h1>

        <p className="text-zinc-500 text-sm">
          Premium Fußball Quiz Creator
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="relative">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Suche..."
            className="w-72 rounded-xl border border-zinc-700 bg-black py-3 pl-11 pr-4 text-white outline-none focus:border-lime-400"
          />

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 font-bold text-black hover:bg-lime-300 transition">

          <Plus size={18} />

          Neues Quiz

        </button>

        <button className="rounded-xl border border-zinc-700 p-3 hover:bg-zinc-900">

          <Bell size={20} />

        </button>

        <button className="rounded-xl border border-zinc-700 p-3 hover:bg-zinc-900">

          <User size={20} />

        </button>

      </div>

    </header>
  );
}