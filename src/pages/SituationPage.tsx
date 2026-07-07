import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const canaWeddingImage = `${import.meta.env.BASE_URL}assets/worker-test/cana-wedding.png`;

export function SituationPage() {
  return (
    <section className="flex flex-1 flex-col gap-6 py-3">
      <div className="text-center">
        <p className="text-sm font-bold text-wine">
          카나의 혼인잔치가 당신을 기다립니다
        </p>
        <h1 className="mt-4 text-3xl font-black leading-tight text-cocoa sm:text-4xl">
          성모님이 당신을
          <br />
          잔치의 일꾼으로 부르셨어요
        </h1>
        <img
          src={canaWeddingImage}
          alt="카나의 혼인잔치에 모인 사람들과 항아리를 든 일꾼 일러스트"
          className="mx-auto mt-5 w-full max-w-md object-contain drop-shadow-[0_18px_26px_rgba(58,42,36,0.14)]"
        />
      </div>

      <div className="rounded-lg border border-wine/10 bg-white p-5 shadow-soft">
        <div className="space-y-4 leading-8 text-cocoa/78">
          <p>오늘은 기쁜 혼인잔치가 열리는 날.</p>
          <p>사람들은 웃고, 잔은 채워지고, 집 안은 축하로 가득합니다.</p>
          <p>그런데 잔치 한가운데에서 작은 빈틈이 조용히 드러나고 있어요.</p>
          <p>
            그때 성모님은 당신을 바라보시며 잔치의 일꾼으로 초대하십니다.
          </p>
        </div>
      </div>

      <p className="text-center text-sm font-semibold leading-6 text-cocoa/65">
        정답은 없습니다. 당신답게 선택하면 됩니다.
      </p>

      <div className="grid gap-3">
        <Link
          to="/q/1"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#25c96a] px-5 py-4 text-base font-black text-white shadow-soft transition hover:bg-[#20b85f] focus:outline-none focus:ring-4 focus:ring-[#25c96a]/30"
        >
          일꾼으로 들어가기
          <ChevronRight aria-hidden="true" size={20} />
        </Link>
        <Link
          to="/"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-wine/20 bg-white px-5 py-4 text-base font-bold text-wine transition hover:border-wine/45"
        >
          <ArrowLeft aria-hidden="true" size={18} />
          처음으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
