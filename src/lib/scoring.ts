import { questions } from "../data/questions";
import type { Answers, Pole, TypeCode } from "../types";

export const TOTAL_QUESTIONS = questions.length;

export function isComplete(answers: Answers) {
  return questions.every((question) => answers[question.id]);
}

export function scoreAnswers(answers: Answers): TypeCode {
  if (!isComplete(answers)) {
    throw new Error("All questions must be answered before scoring.");
  }

  const counts: Record<Pole, number> = {
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
    E: 0,
    I: 0,
  };

  for (const question of questions) {
    const answer = answers[question.id];
    const pole = answer === "A" ? question.optionA.pole : question.optionB.pole;
    counts[pole] += 1;
  }

  return `${counts.E >= counts.I ? "E" : "I"}${
    counts.S >= counts.N ? "S" : "N"
  }${counts.T >= counts.F ? "T" : "F"}${
    counts.J >= counts.P ? "J" : "P"
  }` as TypeCode;
}
