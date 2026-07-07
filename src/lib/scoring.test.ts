import { describe, expect, it } from "vitest";
import { questions } from "../data/questions";
import type { Answers } from "../types";
import { scoreAnswers } from "./scoring";

const buildAnswers = (choice: "A" | "B"): Answers =>
  Object.fromEntries(questions.map((question) => [question.id, choice]));

describe("scoreAnswers", () => {
  it("returns ESTJ when every answer is A", () => {
    expect(scoreAnswers(buildAnswers("A"))).toBe("ESTJ");
  });

  it("returns INFP when every answer is B", () => {
    expect(scoreAnswers(buildAnswers("B"))).toBe("INFP");
  });

  it("uses majority vote for each axis", () => {
    expect(
      scoreAnswers({
        1: "A",
        2: "B",
        3: "A",
        4: "B",
        5: "A",
        6: "B",
        7: "A",
        8: "B",
        9: "A",
        10: "B",
        11: "B",
        12: "A",
      }),
    ).toBe("ENTP");
  });

  it("keeps the revised phase and dimension distribution", () => {
    expect(questions.map((question) => question.phase)).toEqual([
      1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3,
    ]);
    expect(questions.map((question) => question.dimension)).toEqual([
      "EI",
      "SN",
      "EI",
      "SN",
      "TF",
      "JP",
      "SN",
      "JP",
      "TF",
      "EI",
      "TF",
      "JP",
    ]);
  });
});
