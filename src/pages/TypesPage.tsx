import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { results } from "../data/results";

export function TypesPage() {
  return (
    <section className="flex flex-1 flex-col gap-4 py-1 sm:gap-6 sm:py-3">
      <div className="space-y-2 sm:space-y-3">
        <Link
          to="/"
          className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-cocoa/70 hover:text-wine sm:min-h-11"
        >
          <ArrowLeft aria-hidden="true" size={18} />
          처음으로
        </Link>
        <h1 className="text-2xl font-black sm:text-3xl">모든 일꾼 유형</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {results.map((result) => (
          <article
            key={result.code}
            className="rounded-lg border border-wine/15 bg-white p-4 shadow-soft sm:p-5"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl" aria-hidden="true">
                {result.emoji}
              </span>
              <div>
                <p className="text-xs font-black text-gold">{result.topKeyword}</p>
                <h2 className="text-lg font-black sm:text-xl">{result.name}</h2>
              </div>
            </div>
            <p className="mt-2 text-sm leading-6 text-cocoa/75 sm:mt-3">
              {result.summary}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
