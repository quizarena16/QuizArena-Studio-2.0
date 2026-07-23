import { Quiz } from "./types";

export const demoQuiz: Quiz = {
  title: "Bundesliga Quiz",
  category: "bundesliga",
  questions: [
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
    }
  ]
};