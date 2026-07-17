"use client";

import { ReactNode } from "react";

type SlideCanvasProps = {
  children: ReactNode;
};

export default function SlideCanvas({
  children,
}: SlideCanvasProps) {
  return (
    <div
      className="
        relative
        w-[1080px]
        h-[1920px]
        overflow-hidden
        rounded-[48px]
        bg-black
        text-white
      "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.18),transparent_45%)]" />

      <div className="relative z-10 flex h-full flex-col p-20">
        {children}
      </div>
    </div>
  );
}