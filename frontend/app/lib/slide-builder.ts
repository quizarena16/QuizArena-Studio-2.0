export type QuizQuestion = {
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  correctAnswer: "A" | "B" | "C";
};

export type SavedQuiz = {
  id: string;
  title: string;
  category: string;
  cta: string;
  createdAt: string;
  questions: QuizQuestion[];
};

export type SlideAnswer = {
  letter: "A" | "B" | "C";
  text: string;
};

export type CoverSlide = {
  type: "cover";
  title: string;
  subtitle: string;
  category: string;
};

export type QuestionSlide = {
  type: "question";
  questionNumber: number;
  question: string;
  answers: SlideAnswer[];
};

export type SolutionsSlide = {
  type: "solutions";
  title: string;
  solutions: {
    questionNumber: number;
    correctLetter: "A" | "B" | "C";
    correctText: string;
  }[];
};

export type CtaSlide = {
  type: "cta";
  title: string;
  text: string;
};

export type GeneratedSlide =
  | CoverSlide
  | QuestionSlide
  | SolutionsSlide
  | CtaSlide;

export function getSlidesStorageKey(quizId: string) {
  return `quizarena_slides_${quizId}`;
}

export function buildSlidesFromQuiz(quiz: SavedQuiz): GeneratedSlide[] {
  const safeQuiz = normalizeQuiz(quiz);
  const safeQuestions = safeQuiz.questions
    .map(normalizeQuestion)
    .filter(hasVisibleQuestionContent)
    .slice(0, 10);

  const slides: GeneratedSlide[] = [];

  // Cover
  slides.push({
    type: "cover",
    title: safeQuiz.title || "Fußball Quiz",
    subtitle: `Schaffst du alle ${safeQuestions.length || 1} Fragen?`,
    category: safeQuiz.category || "Fußball Quiz",
  });

  // Frage-Slides
  safeQuestions.forEach((q, index) => {
    slides.push({
      type: "question",
      questionNumber: index + 1,
      question: q.question || `Frage ${index + 1}`,
      answers: [
        {
          letter: "A",
          text: q.answerA?.trim() || "Antwort A",
        },
        {
          letter: "B",
          text: q.answerB?.trim() || "Antwort B",
        },
        {
          letter: "C",
          text: q.answerC?.trim() || "Antwort C",
        },
      ],
    });
  });

  // Solutions
  slides.push({
    type: "solutions",
    title: "Hier sind die Antworten",
    solutions: safeQuestions.map((q, index) => {
      const correctLetter = normalizeCorrectAnswer(q.correctAnswer);

      const correctText =
        correctLetter === "A"
          ? q.answerA?.trim() || "—"
          : correctLetter === "B"
          ? q.answerB?.trim() || "—"
          : q.answerC?.trim() || "—";

      return {
        questionNumber: index + 1,
        correctLetter,
        correctText,
      };
    }),
  });

  // CTA
  slides.push({
    type: "cta",
    title: "Folge für mehr",
    text:
      safeQuiz.cta?.trim() ||
      "Folge für mehr Fußball-Quizze ⚽",
  });

  return slides;
}

function normalizeQuiz(quiz: SavedQuiz): SavedQuiz {
  return {
    id: quiz?.id || cryptoFallback(),
    title: quiz?.title?.trim() || "Fußball Quiz",
    category: quiz?.category?.trim() || "Fußball Quiz",
    cta: quiz?.cta?.trim() || "Folge für mehr Fußball-Quizze ⚽",
    createdAt: quiz?.createdAt || new Date().toISOString(),
    questions: Array.isArray(quiz?.questions) ? quiz.questions : [],
  };
}

function normalizeQuestion(question: Partial<QuizQuestion>): QuizQuestion {
  return {
    question: question?.question?.trim() || "",
    answerA: question?.answerA?.trim() || "",
    answerB: question?.answerB?.trim() || "",
    answerC: question?.answerC?.trim() || "",
    correctAnswer: normalizeCorrectAnswer(question?.correctAnswer),
  };
}

function normalizeCorrectAnswer(
  value?: string
): "A" | "B" | "C" {
  if (value === "A" || value === "B" || value === "C") return value;
  return "A";
}

function hasVisibleQuestionContent(question: QuizQuestion) {
  return Boolean(
    question.question?.trim() ||
      question.answerA?.trim() ||
      question.answerB?.trim() ||
      question.answerC?.trim()
  );
}

function cryptoFallback() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `quiz_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}