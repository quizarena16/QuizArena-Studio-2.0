"use client";

type Props = {
  question: string;
  answers: string[];
  correct: number;
};

export default function QuestionEditor({
  question,
  answers,
  correct,
}: Props) {
  return (
    <div className="space-y-4">

      <input
        className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3"
        value={question}
        readOnly
      />

      {answers.map((answer, index) => (
        <div
          key={index}
          className={`rounded-xl border p-3 ${
            index === correct
              ? "border-lime-400 bg-lime-400/10"
              : "border-zinc-700 bg-zinc-900"
          }`}
        >
          <div className="font-bold mb-1">
            {String.fromCharCode(65 + index)}
          </div>

          <input
            className="w-full bg-transparent outline-none"
            value={answer}
            readOnly
          />
        </div>
      ))}

    </div>
  );
}