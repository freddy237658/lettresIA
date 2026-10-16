import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { LANGUAGES } from '@/data/languages'
import { Flag } from './Flag'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Langue : ${language.label}`}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
      >
        <span>{language.label}</span>
        <Flag code={language.code} className="h-4 w-6" />
        <i className={`bi bi-chevron-down text-xs transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Choisir une langue"
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-slate-100 bg-white p-1 shadow-lg shadow-slate-200/60"
        >
          {LANGUAGES.map((item) => {
            const active = item.code === language.code
            return (
              <li key={item.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLanguage(item.code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    active ? 'bg-indigo-50 font-semibold text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="flex items-center gap-2">
                    {active && <i className="bi bi-check2 text-indigo-600" aria-hidden />}
                    <Flag code={item.code} className="h-4 w-6" />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
