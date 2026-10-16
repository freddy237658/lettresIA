import { useState } from 'react'
import { Badge } from '@/components/ui/Primitives'
import { SHOWCASE_CARDS, SHOWCASE_CATEGORIES } from '@/data/showcase'
import { CategoryCard } from './CategoryCard'

const ASYMMETRIC_PATTERN = ['lg:col-span-8', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-8']

function gridSpan(index: number, total: number) {
  const lg =
    total === ASYMMETRIC_PATTERN.length
      ? ASYMMETRIC_PATTERN[index] ?? 'lg:col-span-4'
      : index % 2 === 0
        ? 'lg:col-span-8'
        : 'lg:col-span-4'
  const sm = total === 1 ? 'sm:col-span-2' : 'sm:col-span-1'
  return `${sm} ${lg}`
}

export function CategoriesShowcase() {
  const [active, setActive] = useState('tous')
  const cards = SHOWCASE_CARDS.filter((card) => card.categories.includes(active))

  return (
    <section className="border-y border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="violet">
            <i className="bi bi-stars" aria-hidden /> Explorez nos modèles
          </Badge>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            Trouvez le modèle de lettre{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              qui vous correspond
            </span>
          </h2>
          <p className="mt-3 text-sm text-slate-500 sm:text-[15px]">
            Découvrez des modèles adaptés à vos besoins et rédigez des lettres professionnelles, claires et
            personnalisées en quelques secondes grâce à l'intelligence artificielle.
          </p>
        </div>

        <div className="-mx-1 mt-8 mb-2 flex gap-2 overflow-x-auto px-1 pb-2 lg:flex-wrap lg:justify-center lg:overflow-visible">
          {SHOWCASE_CATEGORIES.map((cat) => {
            const isActive = active === cat.id
            const activeStyle = 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
            const inactiveStyle =
              'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-indigo-700 hover:ring-indigo-300 hover:bg-indigo-50/50'
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                aria-pressed={isActive}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${isActive ? activeStyle : inactiveStyle}`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        <div
          key={active}
          className="animate-fade-up mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12"
        >
          {cards.map((card, i) => (
            <CategoryCard key={card.id} card={card} className={gridSpan(i, cards.length)} />
          ))}
        </div>
      </div>
    </section>
  )
}