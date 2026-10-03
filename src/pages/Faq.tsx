import { useState } from 'react'
import { FAQ } from '@/data/faq'
import { Badge } from '@/components/ui/Primitives'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <Badge tone="indigo">Centre d'aide</Badge>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Questions fréquentes</h1>
        <p className="mt-2 text-sm text-slate-500">Trouvez rapidement les réponses à vos questions.</p>
      </div>

      <div className="mt-8 space-y-2">
        {FAQ.map((item, i) => (
          <div key={item.q} className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-slate-800">{item.q}</span>
              <i className={`bi bi-chevron-down text-slate-400 transition ${open === i ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            {open === i && <p className="px-5 pb-4 text-sm leading-relaxed text-slate-500">{item.a}</p>}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-8 text-center text-white">
        <p className="text-sm font-semibold">Vous ne trouvez pas de réponse ?</p>
        <p className="mt-1 text-xs text-indigo-100">Notre équipe support vous répond sous 24h.</p>
        <a
          href="mailto:support@lettreai.com"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-indigo-700"
        >
          <i className="bi bi-envelope-fill" aria-hidden /> Contacter le support
        </a>
      </div>
    </div>
  )
}
