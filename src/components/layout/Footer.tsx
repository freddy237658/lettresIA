import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Produit',
    links: [
      { to: '/modeles', label: 'Modèles' },
      { to: '/categories', label: 'Catégories' },
      { to: '/tarifs', label: 'Tarifs' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Catégories',
    links: [
      { to: '/categories/emploi', label: 'Emploi' },
      { to: '/categories/scolaire', label: 'Scolaire & Universitaire' },
      { to: '/categories/administratif', label: 'Administratif' },
      { to: '/categories/personnel', label: 'Personnel' },
    ],
  },
  {
    title: 'Compte',
    links: [
      { to: '/connexion', label: 'Connexion' },
      { to: '/inscription', label: "S'inscrire" },
      { to: '/app/mon-compte', label: 'Mon compte' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                <i className="bi bi-envelope-paper-fill text-lg" aria-hidden />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                Lettre<span className="text-indigo-600">AI</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              Vos lettres, notre intelligence. Rédigez des lettres professionnelles, administratives, scolaires et
              personnelles en quelques secondes.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-slate-900">{col.title}</h3>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-slate-500 transition hover:text-indigo-700">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} LettreAI — Projet Applications web de création de lettre.</p>
          <p className="text-xs text-slate-400">Fait avec React, TypeScript & Laravel.</p>
        </div>
      </div>
    </footer>
  )
}
