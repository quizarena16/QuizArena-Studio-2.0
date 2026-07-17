"use client";

import SlideCanvas from "./SlideCanvas";

type CtaSlideProps = {
  text: string;
};

export default function CtaSlide({
  text,
}: CtaSlideProps) {
  return (
    <SlideCanvas>
      <div className="flex h-full flex-col items-center justify-center text-center">

        <p className="text-[38px] uppercase tracking-[0.35em] text-lime-300">
          QUIZARENA
        </p>

        <h1 className="mt-16 text-[120px] font-black leading-tight">
          Folge für mehr
        </h1>

        <p className="mt-12 max-w-[820px] text-[56px] leading-tight text-zinc-300">
          {text}
        </p>

        <div className="mt-24 rounded-full bg-lime-400 px-16 py-8">
          <span className="text-[54px] font-black text-black">
            ⚽ FOLLOW ⚽
          </span>
        </div>

      </div>
    </SlideCanvas>
  );
}