"use client";

import SlideCanvas from "./SlideCanvas";

type Answer = {
  letter: string;
  text: string;
};

type QuestionSlideProps = {
  questionNumber: number;
  question: string;
  answers: Answer[];
};

export default function QuestionSlide({
  questionNumber,
  question,
  answers,
}: QuestionSlideProps) {
  return (
    <SlideCanvas>
      <div className="flex h-full flex-col">

        <div className="flex items-center justify-between">
          <p className="text-[36px] uppercase tracking-[0.3em] text-lime-300">
            Frage {questionNumber}
          </p>

          <div className="rounded-full border border-zinc-700 px-8 py-3 text-[28px] text-zinc-300">
            3 Antworten
          </div>
        </div>

        <div className="mt-14 rounded-[40px] border border-zinc-800 bg-zinc-900/70 p-12">
          <h1 className="text-[70px] font-black leading-tight">
            {question}
          </h1>
        </div>

        <div className="mt-12 flex flex-col gap-8">
          {answers.map((answer) => (
            <div
              key={answer.letter}
              className="flex items-center rounded-[32px] border border-zinc-800 bg-zinc-900/60 p-8"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-lime-400 text-[34px] font-bold text-black">
                {answer.letter}
              </div>

              <p className="ml-8 text-[46px] font-semibold">
                {answer.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </SlideCanvas>
  );
}