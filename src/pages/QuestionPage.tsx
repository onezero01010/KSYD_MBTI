import { ArrowLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { questions } from "../data/questions";
import { TOTAL_QUESTIONS } from "../lib/scoring";
import { useQuiz } from "../state/useQuiz";
import type { AnswerChoice } from "../types";

export function QuestionPage() {
  const navigate = useNavigate();
  const { answers, answerQuestion } = useQuiz();
  const { questionNumber } = useParams();
  const currentIndex = Number(questionNumber) - 1;
  const question = questions[currentIndex];

  const progress = useMemo(
    () => ((currentIndex + 1) / TOTAL_QUESTIONS) * 100,
    [currentIndex],
  );

  if (!question || Number.isNaN(currentIndex)) {
    return <Navigate to="/" replace />;
  }

  const selected = answers[question.id];
  const isLastQuestion = question.id === TOTAL_QUESTIONS;

  const selectAnswer = (choice: AnswerChoice) => {
    answerQuestion(question.id, choice);

    if (isLastQuestion) {
      return;
    }

    window.setTimeout(() => {
      navigate(`/q/${question.id + 1}`);
    }, 220);
  };

  return (
    <section className="flex flex-1 flex-col gap-5 py-1 sm:gap-8 sm:py-3">
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-cocoa/65 sm:text-sm">
          <span>
            {question.id}/{TOTAL_QUESTIONS}
          </span>
          <span>Phase {question.phase}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-[#25c96a] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black text-wine sm:text-sm">
            Phase {question.phase}. {question.phaseTitle}
          </p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex h-32 items-center sm:h-40">
          <h1 className="text-xl font-extrabold leading-snug text-cocoa sm:text-3xl">
            {question.prompt}
          </h1>
        </div>

        <div className="grid gap-3 sm:gap-4">
          {[question.optionA, question.optionB].map((option) => {
            const isSelected = selected === option.label;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => selectAnswer(option.label)}
                className={`flex h-32 items-center rounded-lg border p-4 text-left shadow-soft transition focus:outline-none focus:ring-4 focus:ring-gold/35 sm:h-40 sm:p-5 ${
                  isSelected
                    ? "border-wine bg-wine text-white"
                    : "border-wine/15 bg-white hover:border-wine/45"
                }`}
              >
                <span className="block text-base font-bold leading-7 sm:text-lg sm:leading-relaxed">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        {isLastQuestion && selected ? (
          <Link
            to="/loading"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-wine px-5 py-3 text-base font-bold text-white shadow-soft transition hover:bg-wine/90 focus:outline-none focus:ring-4 focus:ring-gold/35 sm:min-h-12 sm:py-4"
          >
            결과 보기
            <ChevronRight aria-hidden="true" size={20} />
          </Link>
        ) : null}
      </div>

      <div className="mt-auto">
        {question.id > 1 ? (
          <Link
            to={`/q/${question.id - 1}`}
            className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-cocoa/70 hover:text-wine sm:min-h-11"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            이전
          </Link>
        ) : (
          <Link
            to="/situation"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-cocoa/70 hover:text-wine sm:min-h-11"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            상황으로 돌아가기
          </Link>
        )}
      </div>
    </section>
  );
}
