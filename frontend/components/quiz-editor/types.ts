export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: number;
}

export interface Quiz {
  title: string;
  category: string;
  questions: Question[];
}