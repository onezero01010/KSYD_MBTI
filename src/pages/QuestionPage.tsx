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
    <section className="flex flex-1 flex-col gap-3 py-0 sm:gap-8 sm:py-3">
      <div className="space-y-1 sm:space-y-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-white sm:h-2">
          <div
            className="h-full rounded-full bg-[#25c96a] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="space-y-1">
          <p className="text-[11px] font-black leading-4 text-wine sm:text-sm sm:leading-normal">
            Phase {question.phase}. {question.phaseTitle}
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-6">
        <div className="flex h-24 items-center sm:h-40">
          <h1 className="text-lg font-extrabold leading-7 text-cocoa sm:text-3xl sm:leading-snug">
            {question.prompt}
          </h1>
        </div>

        <div className="grid gap-2 sm:gap-4">
          {[question.optionA, question.optionB].map((option) => {
            const isSelected = selected === option.label;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => selectAnswer(option.label)}
                className={`flex h-24 items-center rounded-lg border p-3 text-left shadow-soft transition focus:outline-none focus:ring-4 focus:ring-gold/35 sm:h-40 sm:p-5 ${
                  isSelected
                    ? "border-wine bg-wine text-white"
                    : "border-wine/15 bg-white hover:border-wine/45"
                }`}
              >
                <span className="block text-[15px] font-bold leading-6 sm:text-lg sm:leading-relaxed">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        {isLastQuestion && selected ? (
          <Link
            to="/loading"
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-wine px-5 py-2 text-sm font-bold text-white shadow-soft transition hover:bg-wine/90 focus:outline-none focus:ring-4 focus:ring-gold/35 sm:min-h-12 sm:py-4 sm:text-base"
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
            className="inline-flex min-h-8 items-center gap-1.5 text-xs font-bold text-cocoa/70 hover:text-wine sm:min-h-11 sm:gap-2 sm:text-sm"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            이전
          </Link>
        ) : (
          <Link
            to="/situation"
            className="inline-flex min-h-8 items-center gap-1.5 text-xs font-bold text-cocoa/70 hover:text-wine sm:min-h-11 sm:gap-2 sm:text-sm"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            상황으로 돌아가기
          </Link>
        )}
      </div>
    </section>
  );
}
