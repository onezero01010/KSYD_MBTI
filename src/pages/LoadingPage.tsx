import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getResultSlug } from "../lib/resultSlugs";
import { isComplete, scoreAnswers } from "../lib/scoring";
import { useQuiz } from "../state/useQuiz";

export function LoadingPage() {
  const navigate = useNavigate();
  const { answers } = useQuiz();

  useEffect(() => {
    if (!isComplete(answers)) {
      return;
    }
    const timer = window.setTimeout(() => {
      navigate(`/result/${getResultSlug(scoreAnswers(answers))}`, { replace: true });
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [answers, navigate]);

  if (!isComplete(answers)) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 text-center sm:gap-6">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-wine sm:h-16 sm:w-16"
        aria-hidden="true"
      />
      <div className="space-y-2">
        <h1 className="text-2xl font-black sm:text-3xl">분석 중...</h1>
        <p className="text-sm text-cocoa/70 sm:text-base">
          카나의 잔치 안에서 당신의 자리를 살펴보고 있어요.
        </p>
      </div>
    </section>
  );
}
