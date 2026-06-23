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
        1: "B",
        2: "A",
        3: "B",
        4: "A",
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
});
