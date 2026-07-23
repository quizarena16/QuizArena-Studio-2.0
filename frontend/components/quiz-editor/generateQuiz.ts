import { footballDatabase, FootballTopic } from "./data";
import { Question } from "./types";

export function generateQuiz(
  topic: FootballTopic,
  amount: number
): Question[] {
  const pool = footballDatabase[topic];

  return [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, amount)
    .map((question) => ({
      ...question,
      id: crypto.randomUUID()
    }));
}