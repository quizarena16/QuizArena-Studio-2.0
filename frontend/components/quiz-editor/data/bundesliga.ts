import { Question } from "../types";

export const bundesligaQuestions: Question[] = [
  {
    id: crypto.randomUUID(),
    question: "Welcher Verein gewann die erste Bundesliga?",
    answers: [
      "1. FC Köln",
      "Bayern München",
      "Hamburger SV",
      "Borussia Dortmund"
    ],
    correctAnswer: 0
  },
  {
    id: crypto.randomUUID(),
    question: "Welcher Verein hat die meisten Meisterschaften?",
    answers: [
      "Bayern München",
      "Dortmund",
      "Bremen",
      "HSV"
    ],
    correctAnswer: 0
  },
  {
    id: crypto.randomUUID(),
    question: "Wie viele Mannschaften spielen in der Bundesliga?",
    answers: [
      "18",
      "20",
      "16",
      "22"
    ],
    correctAnswer: 0
  }
];