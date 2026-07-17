"use client";

import SlideCanvas from "./SlideCanvas";

type Solution = {
  questionNumber: number;
  correctLetter: string;
  correctText: string;
};

type SolutionsSlideProps = {
  solutions: Solution[];
};

export default function SolutionsSlide({
  solutions,
}: SolutionsSlideProps) {
  return (
    <SlideCanvas>
      <div className="flex h-full flex-col">

        <div>
          <p className="text-[36px] uppercase tracking-[0.3em] text-lime-300">
            Lösungen
          </p>

          <h1 className="mt-6 text-[96px] font-black">
            Hier sind die Antworten
          </h1>
        </div>

        <div className="mt-16 flex flex-col gap-8">

          {solutions.map((solution) => (
            <div
              key={solution.questionNumber}
              className="rounded-[36px] border border-zinc-800 bg-zinc-900/70 p-8"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[30px] uppercase tracking-[0.25em] text-zinc-400">
                    Frage {solution.questionNumber}
                  </p>

                  <p className="mt-3 text-[44px] font-bold">
                    {solution.correctText}
                  </p>
                </div>

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-lime-400 text-[42px] font-black text-black">
                  {solution.correctLetter}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </SlideCanvas>
  );
}