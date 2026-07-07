import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { results } from "../data/results";

export function TypesPage() {
  return (
    <section className="flex flex-1 flex-col gap-6 py-3">
      <div className="space-y-3">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-cocoa/70 hover:text-wine"
        >
          <ArrowLeft aria-hidden="true" size={18} />
          처음으로
        </Link>
        <h1 className="text-3xl font-black">모든 일꾼 유형</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((result) => (
          <article
            key={result.code}
            className="rounded-lg border border-wine/15 bg-white p-5 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                {result.emoji}
              </span>
              <div>
                <p className="text-xs font-black text-gold">{result.topKeyword}</p>
                <h2 className="text-xl font-black">{result.name}</h2>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-cocoa/75">{result.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
