import { createContext } from "react";
import type { AnswerChoice, Answers } from "../types";

export interface QuizContextValue {
  answers: Answers;
  answerQuestion: (questionId: number, choice: AnswerChoice) => void;
  reset: () => void;
}

export const QuizContext = createContext<QuizContextValue | null>(null);
