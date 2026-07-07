import type { TypeCode } from "../types";

export const resultSlugByType: Record<TypeCode, string> = {
  ESTP: "quick-action",
  ISTP: "quiet-solver",
  ESFP: "joy-bringer",
  ISFP: "gentle-comfort",
  ENFP: "hope-spark",
  INFP: "deep-heart",
  ENTP: "creative-turn",
  INTP: "quiet-thinker",
  ESTJ: "steady-organizer",
  ISTJ: "faithful-helper",
  ESFJ: "warm-care",
  ISFJ: "silent-trust",
  ENFJ: "joy-sharer",
  INFJ: "deep-listener",
  ENTJ: "clear-leader",
  INTJ: "wise-planner",
};

export const typeByResultSlug = Object.fromEntries(
  Object.entries(resultSlugByType).map(([type, slug]) => [slug, type]),
) as Record<string, TypeCode>;

export function getResultSlug(typeCode: TypeCode) {
  return resultSlugByType[typeCode];
}

export function getTypeFromResultSlug(slug: string) {
  return typeByResultSlug[slug];
}
