import { bundesligaQuestions } from "./bundesliga";

export const footballDatabase = {
  bundesliga: bundesligaQuestions
};

export type FootballTopic = keyof typeof footballDatabase;