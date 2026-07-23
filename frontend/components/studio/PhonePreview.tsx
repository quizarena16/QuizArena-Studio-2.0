"use client";

export default function PhonePreview() {
  return (
    <div className="flex justify-center">

      <div className="aspect-[9/16] w-full max-w-[330px] rounded-[40px] border-8 border-zinc-800 bg-black p-6">

        <div className="mb-8 text-center text-xs tracking-[8px] text-lime-400">
          BUNDESLIGA
        </div>

        <h1 className="mb-10 text-center text-3xl font-bold">
          Vorschau
        </h1>

        <div className="space-y-3">

          <div className="rounded-xl bg-lime-500 p-4 font-bold text-black">
            Antwort A
          </div>

          <div className="rounded-xl bg-zinc-800 p-4">
            Antwort B
          </div>

          <div className="rounded-xl bg-zinc-800 p-4">
            Antwort C
          </div>

          <div className="rounded-xl bg-zinc-800 p-4">
            Antwort D
          </div>

        </div>

      </div>

    </div>
  );
}