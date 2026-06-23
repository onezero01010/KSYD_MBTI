import { useContext } from "react";
import { QuizContext } from "./quizContextCore";

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within QuizProvider.");
  }
  return context;
}
