"use client";

interface StudioLayoutProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

export default function StudioLayout({
  left,
  center,
  right,
}: StudioLayoutProps) {
  return (
    <div className="grid h-[calc(100vh-80px)] grid-cols-[320px_1fr_420px] gap-6 p-6">

      <aside className="overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4">
        {left}
      </aside>

      <main className="overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        {center}
      </main>

      <aside className="overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4">
        {right}
      </aside>

    </div>
  );
}