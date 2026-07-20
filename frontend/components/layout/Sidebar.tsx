"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  PlusCircle,
  FolderOpen,
  Sparkles,
  Image,
  MonitorPlay,
  Download,
  Settings,
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Neues Quiz",
    href: "/my-quizzes/new-quiz",
    icon: PlusCircle,
  },
  {
    title: "Meine Quizze",
    href: "/my-quizzes",
    icon: FolderOpen,
  },
  {
    title: "KI Generator",
    href: "#",
    icon: Sparkles,
  },
  {
    title: "Slides",
    href: "#",
    icon: MonitorPlay,
  },
  {
    title: "Assets",
    href: "#",
    icon: Image,
  },
  {
    title: "Export",
    href: "#",
    icon: Download,
  },
  {
    title: "Einstellungen",
    href: "#",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-[280px] h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col">

      <div className="p-8 border-b border-zinc-800">

        <h1 className="text-3xl font-black text-lime-400">
          QuizArena
        </h1>

        <p className="text-zinc-500 mt-2">
          Studio 2.0
        </p>

      </div>

      <nav className="flex-1 p-5 space-y-2">

        {items.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-4 rounded-xl px-4 py-4 text-zinc-300 hover:bg-lime-400 hover:text-black transition-all"
            >
              <Icon size={22} />
              <span className="font-semibold">
                {item.title}
              </span>
            </Link>
          );
        })}

      </nav>

      <div className="p-6 border-t border-zinc-800">

        <div className="rounded-2xl bg-lime-400 text-black p-5">

          <div className="font-black text-xl">
            QuizArena Pro
          </div>

          <div className="text-sm mt-2">
            Premium Content Studio
          </div>

        </div>

      </div>

    </aside>
  );
}