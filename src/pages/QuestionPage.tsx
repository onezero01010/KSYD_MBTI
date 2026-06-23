import { ArrowLeft } from "lucide-react";
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

  const selectAnswer = (choice: AnswerChoice) => {
    answerQuestion(question.id, choice);
    const nextQuestion = question.id + 1;
    window.setTimeout(() => {
      navigate(nextQuestion > TOTAL_QUESTIONS ? "/loading" : `/q/${nextQuestion}`);
    }, 180);
  };

  const selected = answers[question.id];

  return (
    <section className="flex flex-1 flex-col gap-8 py-3">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm font-semibold text-cocoa/65">
          <span>
            {question.id}/{TOTAL_QUESTIONS}
          </span>
          <span>Phase {question.phase}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-gold transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm font-semibold text-wine">{question.phaseTitle}</p>
      </div>

      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold leading-snug text-cocoa sm:text-3xl">
          {question.prompt}
        </h1>

        <div className="grid gap-4">
          {[question.optionA, question.optionB].map((option) => {
            const isSelected = selected === option.label;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => selectAnswer(option.label)}
                className={`min-h-28 rounded-lg border p-5 text-left shadow-soft transition focus:outline-none focus:ring-4 focus:ring-gold/35 ${
                  isSelected
                    ? "border-wine bg-wine text-white"
                    : "border-wine/15 bg-white hover:border-wine/45"
                }`}
              >
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-black text-cocoa">
                  {option.label}
                </span>
                <span className="block text-lg font-bold leading-relaxed">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto">
        {question.id > 1 ? (
          <Link
            to={`/q/${question.id - 1}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-cocoa/70 hover:text-wine"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            이전
          </Link>
        ) : (
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-cocoa/70 hover:text-wine"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            처음으로
          </Link>
        )}
      </div>
    </section>
  );
}
