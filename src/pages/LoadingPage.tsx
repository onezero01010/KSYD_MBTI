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
    <section className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <div
        className="h-16 w-16 animate-spin rounded-full border-4 border-gold border-t-wine"
        aria-hidden="true"
      />
      <div className="space-y-2">
        <h1 className="text-3xl font-black">분석 중...</h1>
        <p className="text-cocoa/70">
          카나의 잔치 안에서 당신의 자리를 살펴보고 있어요.
        </p>
      </div>
    </section>
  );
}
