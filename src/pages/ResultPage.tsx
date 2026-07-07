import { toPng } from "html-to-image";
import { Download, RotateCcw, Share2 } from "lucide-react";
import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resultMap } from "../data/results";
import { getResultSlug, getTypeFromResultSlug } from "../lib/resultSlugs";
import { isComplete } from "../lib/scoring";
import { useQuiz } from "../state/useQuiz";
import type { TypeCode } from "../types";

export function ResultPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { typeCode: resultParam } = useParams();
  const { answers, reset } = useQuiz();
  const resolvedType = resultParam
    ? getTypeFromResultSlug(resultParam) ?? (resultParam as TypeCode)
    : undefined;
  const shouldHideLegacyCode =
    resolvedType && resultParam === resolvedType ? getResultSlug(resolvedType) : null;
  const result = resolvedType ? resultMap[resolvedType] : undefined;

  if (!result) {
    return <Navigate to="/" replace />;
  }

  if (shouldHideLegacyCode) {
    return <Navigate to={`/result/${shouldHideLegacyCode}`} replace />;
  }

  if (!isComplete(answers)) {
    return <Navigate to="/" replace />;
  }

  const saveImage = async () => {
    if (!cardRef.current) {
      return;
    }
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = `ksyd-${getResultSlug(result.code)}.png`;
    link.href = dataUrl;
    link.click();
  };

  const shareResult = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: `나는 ${result.name}`,
        text: result.summary,
        url: shareUrl,
      });
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    window.alert("결과 링크를 복사했어요.");
  };

  return (
    <section className="flex flex-1 flex-col gap-5 py-3">
      <div
        ref={cardRef}
        className="rounded-lg border border-wine/15 bg-white p-6 shadow-soft"
      >
        <p className="text-sm font-bold text-wine">나의 카나 일꾼 유형</p>
        <div className="mt-4 flex items-start gap-4">
          <span className="text-5xl" aria-hidden="true">
            {result.emoji}
          </span>
          <div>
            <p className="text-sm font-black text-gold">{result.topKeyword}</p>
            <h1 className="text-3xl font-black text-cocoa">{result.name}</h1>
          </div>
        </div>
        <p className="mt-5 text-lg font-bold leading-relaxed">{result.summary}</p>
        <div className="mt-5 space-y-3 leading-8 text-cocoa/78">
          {result.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-6 space-y-4 border-y border-wine/10 py-5">
          {result.interpretation.map((item) => (
            <div key={item.title}>
              <p className="font-black text-wine">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-cocoa/78">{item.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 border-l-4 border-wine pl-4 text-sm font-bold leading-6 text-cocoa">
          {result.oneLine}
        </p>
      </div>

      <p className="text-center text-sm text-cocoa/60">
        모바일에서는 저장한 이미지를 꾹 눌러 보관할 수 있어요.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={saveImage}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-wine px-4 font-bold text-white"
        >
          <Download aria-hidden="true" size={18} />
          결과 저장
        </button>
        <button
          type="button"
          onClick={shareResult}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-wine/20 bg-white px-4 font-bold text-wine"
        >
          <Share2 aria-hidden="true" size={18} />
          공유
        </button>
        <Link
          to="/situation"
          onClick={reset}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-wine/20 bg-white px-4 font-bold text-wine"
        >
          <RotateCcw aria-hidden="true" size={18} />
          다시하기
        </Link>
        <Link
          to="/types"
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-4 font-bold text-cocoa"
        >
          모든 유형 보기
        </Link>
      </div>
    </section>
  );
}
