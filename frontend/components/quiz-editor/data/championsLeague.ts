import { Question } from "../types";

export const championsLeagueQuestions: Question[] = [
  {
    id: crypto.randomUUID(),
    question: "Welcher Verein gewann die Champions League 2020?",
    answers: [
      "Bayern München",
      "Paris Saint-Germain",
      "Liverpool",
      "Real Madrid",
    ],
    correctAnswer: 0,
  },
  {
    id: crypto.randomUUID(),
    question: "Welcher Spieler hält den Torrekord der Champions League?",
    answers: [
      "Cristiano Ronaldo",
      "Lionel Messi",
      "Robert Lewandowski",
      "Karim Benzema",
    ],
    correctAnswer: 0,
  },
  {
    id: crypto.randomUUID(),
    question: "Welcher Verein hat die meisten Champions-League-Titel?",
    answers: [
      "Real Madrid",
      "FC Barcelona",
      "AC Mailand",
      "Bayern München",
    ],
    correctAnswer: 0,
  },
  {
    id: crypto.randomUUID(),
    question: "Wo fand das Champions-League-Finale 2013 statt?",
    answers: [
      "Wembley",
      "Allianz Arena",
      "Olympiastadion Berlin",
      "San Siro",
    ],
    correctAnswer: 0,
  },
  {
    id: crypto.randomUUID(),
    question: "Wer erzielte das Siegtor im Finale 2013?",
    answers: [
      "Arjen Robben",
      "Franck Ribéry",
      "Thomas Müller",
      "Mario Mandžukić",
    ],
    correctAnswer: 0,
  },
];