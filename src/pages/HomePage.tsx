import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuiz } from "../state/useQuiz";

export function HomePage() {
  const { reset } = useQuiz();

  return (
    <section className="flex flex-1 flex-col justify-center gap-8">
      <div className="space-y-5">
        <p className="text-sm font-semibold text-wine">KSYD 2026 프로그램 3</p>
        <div className="space-y-4">
          <h1 className="text-4xl font-black leading-tight text-cocoa sm:text-5xl">
            카나의 혼인잔치,
            <br />
            나는 어떤 일꾼?
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-cocoa/75">
            예상치 못한 자리 앞에서 나는 무엇을 알아차리고 어떻게 움직일까요?
            12개의 질문으로 나의 봉사 자리와 일꾼 유형을 찾아봅니다.
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        <Link
          to="/situation"
          onClick={reset}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-wine px-5 py-4 text-base font-bold text-white shadow-soft transition hover:bg-wine/90 focus:outline-none focus:ring-4 focus:ring-gold/35"
        >
          테스트 시작하기
          <ChevronRight aria-hidden="true" size={20} />
        </Link>
        <Link
          to="/types"
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-wine/20 bg-white px-5 py-4 text-base font-bold text-wine transition hover:border-wine/45"
        >
          모든 유형 보기
        </Link>
      </div>
    </section>
  );
}
