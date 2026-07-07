import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const storySteps = [
  {
    id: "01",
    title: "초대받다",
    description: "성모님이 나를 잔치의 일꾼으로 부르셨어요.",
  },
  {
    id: "02",
    title: "알아차리다",
    description: "잔치의 빈틈과 사람들의 마음을 살펴봅니다.",
  },
  {
    id: "03",
    title: "순명하다",
    description: "그가 시키는 대로 하여라라는 말씀을 듣습니다.",
  },
  {
    id: "04",
    title: "발견하다",
    description: "물이 포도주로 변하는 기적을 마주합니다.",
  },
];

export function SituationPage() {
  return (
    <section className="flex flex-1 flex-col gap-6 py-3">
      <div className="text-center">
        <p className="text-sm font-bold text-wine">
          카나의 혼인잔치가 당신을 기다립니다
        </p>
        <div className="mx-auto mt-5 flex aspect-[4/3] max-w-sm items-center justify-center rounded-lg border border-wine/15 bg-white shadow-soft">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-white via-cream to-[#f9f7f2]">
            <span className="absolute left-8 top-8 text-5xl" aria-hidden="true">
              🏺
            </span>
            <span className="absolute right-9 top-10 text-4xl" aria-hidden="true">
              🍷
            </span>
            <span
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-6xl"
              aria-hidden="true"
            >
              ✨
            </span>
          </div>
        </div>
        <h1 className="mt-6 text-3xl font-black leading-tight text-cocoa sm:text-4xl">
          성모님이 당신을
          <br />
          잔치의 일꾼으로 부르셨어요
        </h1>
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

      <div className="grid gap-3 sm:grid-cols-2">
        {storySteps.map((step) => (
          <article
            key={step.id}
            className="rounded-lg border border-wine/10 bg-[#fffdf8] p-4"
          >
            <p className="text-xs font-black text-gold">{step.id}</p>
            <h2 className="mt-1 text-lg font-black text-cocoa">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-cocoa/70">
              {step.description}
            </p>
          </article>
        ))}
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
