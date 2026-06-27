export type Pole = "S" | "N" | "T" | "F" | "J" | "P" | "E" | "I";
export type Dimension = "SN" | "TF" | "JP" | "EI";
export type AnswerChoice = "A" | "B";
export type TypeCode =
  | "ESTP"
  | "ISTP"
  | "ESFP"
  | "ISFP"
  | "ENFP"
  | "INFP"
  | "ENTP"
  | "INTP"
  | "ESTJ"
  | "ISTJ"
  | "ESFJ"
  | "ISFJ"
  | "ENFJ"
  | "INFJ"
  | "ENTJ"
  | "INTJ";

export interface Option {
  label: AnswerChoice;
  text: string;
  pole: Pole;
}

export interface Question {
  id: number;
  phase: 1 | 2 | 3;
  phaseTitle: string;
  dimension: Dimension;
  prompt: string;
  optionA: Option;
  optionB: Option;
}

export interface ResultType {
  code: TypeCode;
  name: string;
  topKeyword: string;
  summary: string;
  emoji: string;
  description: string[];
  interpretation: {
    title: string;
    body: string;
  }[];
  oneLine: string;
}

export type Answers = Partial<Record<number, AnswerChoice>>;
