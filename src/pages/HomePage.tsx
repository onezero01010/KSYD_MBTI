import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="flex flex-1 flex-col justify-center gap-8">
      <div className="space-y-5">
        <p className="text-sm font-semibold text-wine">KSYD 2026 프로그램3</p>
        <div className="space-y-4">
          <h1 className="text-4xl font-black leading-tight text-cocoa sm:text-5xl">
            카나의 혼인잔치,
            <br />
            나는 어떤 일꾼?
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-cocoa/75">
            그가 시키는 대로 하여라. 12개의 질문으로 나의 봉사 자리와
            일꾼 유형을 돌아봅니다.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-wine/15 bg-white/70 p-5 shadow-soft">
        <div className="mb-5 flex items-center gap-4 text-5xl" aria-hidden="true">
          <span>🍇</span>
          <span>🏺</span>
          <span>🍷</span>
        </div>
        <p className="text-sm font-semibold text-cocoa/60">예상 소요 시간 약 2분</p>
      </div>

      <Link
        to="/q/1"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-wine px-5 py-4 text-base font-bold text-white shadow-soft transition hover:bg-wine/90 focus:outline-none focus:ring-4 focus:ring-gold/35"
      >
        시작하기
        <ChevronRight aria-hidden="true" size={20} />
      </Link>
    </section>
  );
}
