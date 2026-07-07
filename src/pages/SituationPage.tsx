import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const canaWeddingImage = `${import.meta.env.BASE_URL}assets/worker-test/cana-wedding.png`;

export function SituationPage() {
  return (
    <section className="flex flex-1 flex-col gap-4 py-1 sm:gap-6 sm:py-3">
      <div className="text-center">
        <p className="text-xs font-bold text-wine sm:text-sm">
          카나의 혼인잔치가 당신을 기다립니다
        </p>
        <h1 className="mt-3 text-2xl font-black leading-tight text-cocoa sm:mt-4 sm:text-4xl">
          성모님이 당신을
          <br />
          잔치의 일꾼으로 부르셨어요
        </h1>
      </div>

      <p className="text-center text-xs font-semibold leading-5 text-cocoa/65 sm:text-sm sm:leading-6">
        정답은 없습니다. 당신답게 선택하면 됩니다.
      </p>

      <img
        src={canaWeddingImage}
        alt="카나의 혼인잔치에 모인 사람들과 항아리를 든 일꾼 일러스트"
        className="mx-auto w-full max-w-[20rem] object-contain drop-shadow-[0_18px_26px_rgba(58,42,36,0.14)] sm:max-w-md"
      />

      <div className="grid gap-2 sm:gap-3">
        <Link
          to="/q/1"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#25c96a] px-5 py-3 text-base font-black text-white shadow-soft transition hover:bg-[#20b85f] focus:outline-none focus:ring-4 focus:ring-[#25c96a]/30 sm:min-h-12 sm:py-4"
        >
          일꾼으로 들어가기
          <ChevronRight aria-hidden="true" size={20} />
        </Link>
      </div>
    </section>
  );
}
