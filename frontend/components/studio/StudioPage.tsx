"use client";

import { useMemo, useState } from "react";
import EditorPanel from "./EditorPanel";
import PhonePreview from "./PhonePreview";
import QuestionSidebar from "./QuestionSidebar";
import StudioLayout from "./StudioLayout";

type AnswerLetter = "A" | "B" | "C";

type QuizQuestion = {
  id: string;
  question: string;
  answers: string[];
  correct: AnswerLetter;
};

type Quiz = {
  title: string;
  description: string;
  questions: QuizQuestion[];
};

const initialQuiz: Quiz = {
  title: "Untitled Quiz",
  description: "",
  questions: [
    {
      id: "q1",
      question: "",
      answers: ["", "", ""],
      correct: "A",
    },
  ],
};

const answerLetters: AnswerLetter[] = ["A", "B", "C"];

function createQuestion(index: number): QuizQuestion {
  return {
    id: `q${Date.now()}-${index}`,
    question: "",
    answers: ["", "", ""],
    correct: "A",
  };
}

export default function StudioPage() {
  const [quiz, setQuiz] = useState<Quiz>(initialQuiz);
  const [selectedId, setSelectedId] = useState(initialQuiz.questions[0]?.id ?? "");

  const selectedQuestion = useMemo(() => {
    return quiz.questions.find((question) => question.id === selectedId) ?? quiz.questions[0];
  }, [quiz.questions, selectedId]);

  function addQuestion() {
    const nextQuestion = createQuestion(quiz.questions.length + 1);

    setQuiz((currentQuiz) => ({
      ...currentQuiz,
      questions: [...currentQuiz.questions, nextQuestion],
    }));
    setSelectedId(nextQuestion.id);
  }

  function updateQuestion(value: string) {
    if (!selectedQuestion) return;

    setQuiz((currentQuiz) => ({
      ...currentQuiz,
      questions: currentQuiz.questions.map((question) =>
        question.id === selectedQuestion.id
          ? {
              ...question,
              question: value,
            }
          : question
      ),
    }));
  }

  function updateAnswer(index: number, value: string) {
    if (!selectedQuestion) return;

    setQuiz((currentQuiz) => ({
      ...currentQuiz,
      questions: currentQuiz.questions.map((question) =>
        question.id === selectedQuestion.id
          ? {
              ...question,
              answers: question.answers.map((answer, answerIndex) =>
                answerIndex === index ? value : answer
              ),
            }
          : question
      ),
    }));
  }

  function updateCorrect(value: AnswerLetter) {
    if (!selectedQuestion) return;

    setQuiz((currentQuiz) => ({
      ...currentQuiz,
      questions: currentQuiz.questions.map((question) =>
        question.id === selectedQuestion.id
          ? {
              ...question,
              correct: value,
            }
          : question
      ),
    }));
  }

  function handleGenerateQuiz() {
    console.log("Generate quiz", quiz);
  }

  return (
    <StudioLayout>
      <QuestionSidebar
        questions={quiz.questions}
        selectedId={selectedId}
        onSelectQuestion={setSelectedId}
        onAddQuestion={addQuestion}
      />

      <EditorPanel
        quiz={quiz}
        selectedQuestion={selectedQuestion}
        answerLetters={answerLetters}
        onUpdateQuestion={updateQuestion}
        onUpdateAnswer={updateAnswer}
        onUpdateCorrect={updateCorrect}
        onGenerateQuiz={handleGenerateQuiz}
      />

      <PhonePreview quiz={quiz} selectedQuestion={selectedQuestion} />
    </StudioLayout>
  );
}
