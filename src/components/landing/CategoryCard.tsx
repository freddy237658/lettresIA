import { Link } from 'react-router-dom'
import type { ShowcaseCard } from '@/data/showcase'
import { LetterPreview } from './LetterPreview'

export function CategoryCard({ card, className = '' }: { card: ShowcaseCard; className?: string }) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-900/5 p-6 sm:p-7 ${card.bg} h-[340px] sm:h-[380px] lg:h-[400px] transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-900/10 ${className}`}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-14 h-44 w-44 rounded-full bg-white/50 blur-2xl"
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="max-w-sm">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${card.chip}`}
          >
            <i className={`bi ${card.icon} text-[10px]`} aria-hidden />
            {card.tag}
          </span>
          <h3 className="mt-3 text-lg font-extrabold leading-snug text-slate-900 sm:text-xl">{card.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
          <Link
            to={card.to}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {card.cta}
            <i className="bi bi-arrow-right transition group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
        <span
          className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg sm:flex ${card.chip}`}
        >
          <i className={`bi ${card.icon}`} aria-hidden />
        </span>
      </div>
      <div className="relative mt-6 flex min-h-0 flex-1 items-end justify-center overflow-visible">
        <LetterPreview variant={card.preview} />
      </div>
    </article>
  )
}