export default function PhonePreview() {
  return (
    <div className="flex items-center justify-center h-full w-full">

      <div className="relative w-[390px] h-[690px] rounded-[42px] border border-zinc-700 bg-black shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden">

        {/* Statusleiste */}

        <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-center text-xs text-zinc-500">
          QuizArena Studio
        </div>

        {/* Slide */}

        <div className="absolute inset-0 flex flex-col items-center justify-center px-10">

          <span className="text-lime-400 uppercase tracking-[6px] text-sm mb-8">
            Bundesliga Quiz
          </span>

          <h1 className="text-5xl font-black text-center leading-tight">
            Wer gewann
            <br />
            die Bundesliga
            <br />
            2014?
          </h1>

          <div className="mt-14 space-y-4 w-full">

            <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-4">
              A) Bayern München
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-4">
              B) Dortmund
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-4">
              C) Leverkusen
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-4">
              D) Wolfsburg
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}