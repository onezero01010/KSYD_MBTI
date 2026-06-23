import { type ReactNode, useEffect, useMemo, useReducer } from "react";
import { QuizContext, type QuizContextValue } from "./quizContextCore";
import type { AnswerChoice, Answers } from "../types";

interface QuizState {
  answers: Answers;
}

type QuizAction =
  | { type: "answer"; questionId: number; choice: AnswerChoice }
  | { type: "reset" };

const STORAGE_KEY = "ksyd-mbti-answers";

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "answer":
      return {
        answers: {
          ...state.answers,
          [action.questionId]: action.choice,
        },
      };
    case "reset":
      return { answers: {} };
  }
}

function getInitialState(): QuizState {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? { answers: JSON.parse(stored) as Answers } : { answers: {} };
  } catch {
    return { answers: {} };
  }
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  useEffect(() => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.answers));
  }, [state.answers]);

  const value = useMemo<QuizContextValue>(
    () => ({
      answers: state.answers,
      answerQuestion: (questionId, choice) =>
        dispatch({ type: "answer", questionId, choice }),
      reset: () => dispatch({ type: "reset" }),
    }),
    [state.answers],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}
