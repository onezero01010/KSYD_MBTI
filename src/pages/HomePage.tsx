import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuiz } from "../state/useQuiz";

const workerTypeImage = `${import.meta.env.BASE_URL}assets/worker-test/worker-type-16.png`;

export function HomePage() {
  const { reset } = useQuiz();

  return (
    <section className="flex flex-1 flex-col justify-center gap-5 sm:gap-8">
      <div className="space-y-4 sm:space-y-5">
        <p className="text-xs font-semibold text-wine sm:text-sm">
          KSYD 2026 프로그램 3
        </p>
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl font-black leading-tight text-cocoa sm:text-5xl">
            카나의 혼인잔치,
            <br />
            나는 어떤 일꾼?
          </h1>
          <p className="max-w-xl text-base leading-7 text-cocoa/75 sm:text-lg sm:leading-relaxed">
            예상치 못한 자리 앞에서 나는 무엇을 알아차리고 어떻게 움직일까요?
            12개의 질문으로 일꾼 유형을 찾아봅니다.
          </p>
        </div>
      </div>

      <img
        src={workerTypeImage}
        alt="카나의 혼인잔치 일꾼 유형 캐릭터 모음"
        className="mx-auto w-full max-w-[17rem] object-contain drop-shadow-[0_16px_22px_rgba(58,42,36,0.12)] sm:max-w-sm"
      />

      <div className="grid gap-2 sm:gap-3">
        <Link
          to="/situation"
          onClick={reset}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-wine px-5 py-3 text-base font-bold text-white shadow-soft transition hover:bg-wine/90 focus:outline-none focus:ring-4 focus:ring-gold/35 sm:min-h-12 sm:py-4"
        >
          테스트 시작하기
          <ChevronRight aria-hidden="true" size={20} />
        </Link>
      </div>
    </section>
  );
}
