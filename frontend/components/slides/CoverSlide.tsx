"use client";

import SlideCanvas from "./SlideCanvas";

type CoverSlideProps = {
  title: string;
  category: string;
};

export default function CoverSlide({
  title,
  category,
}: CoverSlideProps) {
  return (
    <SlideCanvas>
      <div className="flex h-full flex-col justify-between">

        <div>
          <p className="text-[36px] uppercase tracking-[0.35em] text-zinc-400">
            QUIZARENA
          </p>

          <div className="mt-10 inline-flex rounded-full border border-lime-500/40 bg-lime-500/10 px-8 py-4">
            <span className="text-[40px] font-bold text-lime-300">
              {category}
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <h1 className="text-[118px] font-black leading-[0.95]">
            {title}
          </h1>
        </div>

        <div className="flex items-center justify-between">

          <div>
            <p className="text-[32px] uppercase tracking-[0.3em] text-zinc-500">
              Premium Fußball Quiz
            </p>

            <p className="mt-6 text-[46px] font-bold">
              Schaffst du alle Fragen?
            </p>
          </div>

          <div className="flex h-40 w-40 items-center justify-center rounded-full border border-lime-500 bg-lime-500/10">
            <span className="text-[60px]">⚽</span>
          </div>

        </div>

      </div>
    </SlideCanvas>
  );
}