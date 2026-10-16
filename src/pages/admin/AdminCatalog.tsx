import { useState } from 'react'
import { CATEGORIES as SEED_CATEGORIES } from '@/data/categories'
import { TEMPLATES as SEED_TEMPLATES } from '@/data/templates'
import type { Category, FieldType, Template, TemplateField } from '@/types'
import { Badge } from '@/components/ui/Primitives'
import { Button } from '@/components/ui/Button'
import { uid } from '@/services/storage'

const FIELD_TYPES: FieldType[] = ['text', 'textarea', 'email', 'tel', 'date', 'select']

export default function AdminCatalog() {
  const [tab, setTab] = useState<'categories' | 'modeles'>('modeles')
  const [categories, setCategories] = useState<Category[]>(SEED_CATEGORIES)
  const [templates, setTemplates] = useState<Template[]>(SEED_TEMPLATES)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newCatName, setNewCatName] = useState('')

  const editing = templates.find((t) => t.id === editingId) ?? null

  function togglePremium(id: string) {
    setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, isPremium: !t.isPremium } : t)))
  }

  function togglePopular(id: string) {
    setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, popular: !t.popular } : t)))
  }

  function removeTemplate(id: string) {
    setTemplates((prev) => prev.filter((t) => t.id !== id))
    if (editingId === id) setEditingId(null)
  }

  function addCategory() {
    if (!newCatName.trim()) return
    setCategories((prev) => [
      ...prev,
      {
        id: uid('cat'),
        name: newCatName.trim(),
        icon: 'bi-folder-fill',
        description: 'Nouvelle catégorie — description à compléter.',
        examples: [],
        card: 'border-slate-100 from-slate-50',
        iconBox: 'bg-slate-100 text-slate-600',
        accent: 'text-slate-600',
      },
    ])
    setNewCatName('')
  }

  function removeCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  function updateField(templateId: string, fieldIndex: number, patch: Partial<TemplateField>) {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id !== templateId ? t : { ...t, fields: t.fields.map((f, i) => (i === fieldIndex ? { ...f, ...patch } : f)) },
      ),
    )
  }

  function addField(templateId: string) {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id !== templateId
          ? t
          : { ...t, fields: [...t.fields, { name: `champ_${t.fields.length + 1}`, label: 'Nouveau champ', type: 'text', required: false }] },
      ),
    )
  }

  function removeField(templateId: string, fieldIndex: number) {
    setTemplates((prev) =>
      prev.map((t) => (t.id !== templateId ? t : { ...t, fields: t.fields.filter((_, i) => i !== fieldIndex) })),
    )
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Catégories & modèles</h1>
      <p className="mt-1 text-sm text-slate-500">
        Gérez le catalogue sans toucher au code React — chaque modèle possède son propre schéma de champs.
      </p>

      <div className="mt-5 flex gap-1 border-b border-slate-100">
        {(['modeles', 'categories'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`border-b-2 px-3 py-2.5 text-sm font-semibold capitalize transition ${
              tab === t ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t === 'modeles' ? 'Modèles' : 'Catégories'}
          </button>
        ))}
      </div>

      {tab === 'categories' && (
        <div className="mt-6">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="Nom de la nouvelle catégorie…"
              className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            <Button icon={<i className="bi bi-plus-lg" />} onClick={addCategory}>
              Ajouter
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.iconBox}`}>
                    <i className={`bi ${c.icon}`} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                    <p className="text-xs text-slate-400">{templates.filter((t) => t.categoryId === c.id).length} modèles</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeCategory(c.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                  aria-label="Supprimer"
                >
                  <i className="bi bi-trash3" aria-hidden />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'modeles' && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="px-4 py-3 font-semibold">Modèle</th>
                  <th className="px-4 py-3 font-semibold">Catégorie</th>
                  <th className="px-4 py-3 font-semibold">Champs</th>
                  <th className="px-4 py-3 font-semibold">Premium</th>
                  <th className="px-4 py-3 font-semibold">Populaire</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((t) => {
                  const cat = categories.find((c) => c.id === t.categoryId)
                  return (
                    <tr key={t.id} className={`border-b border-slate-50 last:border-0 ${editingId === t.id ? 'bg-indigo-50/40' : ''}`}>
                      <td className="px-4 py-3">
                        <button type="button" onClick={() => setEditingId(t.id)} className="font-medium text-slate-800 hover:text-indigo-700">
                          {t.name}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{cat?.name ?? '—'}</td>
                      <td className="px-4 py-3 text-slate-500">{t.fields.length}</td>
                      <td className="px-4 py-3">
                        <button type="button" onClick={() => togglePremium(t.id)}>
                          <Badge tone={t.isPremium ? 'violet' : 'slate'}>{t.isPremium ? 'Premium' : 'Gratuit'}</Badge>
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button type="button" onClick={() => togglePopular(t.id)}>
                          <Badge tone={t.popular ? 'amber' : 'slate'}>{t.popular ? 'Oui' : 'Non'}</Badge>
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => removeTemplate(t.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                          aria-label="Supprimer"
                        >
                          <i className="bi bi-trash3" aria-hidden />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Field schema editor */}
          <div className="h-fit rounded-2xl border border-slate-100 bg-white p-5">
            {!editing ? (
              <p className="text-sm text-slate-400">Sélectionnez un modèle pour éditer son schéma de champs dynamiques.</p>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{editing.name}</h3>
                  <button type="button" onClick={() => setEditingId(null)} className="text-slate-400 hover:text-slate-700" aria-label="Fermer">
                    <i className="bi bi-x-lg" aria-hidden />
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-400">Champs du formulaire (table <code>template_fields</code>)</p>

                <div className="mt-4 space-y-3">
                  {editing.fields.map((f, i) => (
                    <div key={i} className="rounded-xl border border-slate-100 p-3">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          value={f.name}
                          onChange={(e) => updateField(editing.id, i, { name: e.target.value })}
                          placeholder="nom_technique"
                          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs focus:border-indigo-400 focus:outline-none"
                        />
                        <input
                          value={f.label}
                          onChange={(e) => updateField(editing.id, i, { label: e.target.value })}
                          placeholder="Libellé affiché"
                          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs focus:border-indigo-400 focus:outline-none"
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <select
                          value={f.type}
                          onChange={(e) => updateField(editing.id, i, { type: e.target.value as FieldType })}
                          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs focus:border-indigo-400 focus:outline-none"
                        >
                          {FIELD_TYPES.map((ft) => (
                            <option key={ft} value={ft}>
                              {ft}
                            </option>
                          ))}
                        </select>
                        <label className="flex items-center gap-1.5 text-xs text-slate-500">
                          <input
                            type="checkbox"
                            checked={!!f.required}
                            onChange={(e) => updateField(editing.id, i, { required: e.target.checked })}
                            className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600"
                          />
                          Requis
                        </label>
                        <button
                          type="button"
                          onClick={() => removeField(editing.id, i)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                          aria-label="Supprimer le champ"
                        >
                          <i className="bi bi-trash3 text-xs" aria-hidden />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addField(editing.id)}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-200 py-2.5 text-xs font-semibold text-slate-500 hover:border-indigo-300 hover:text-indigo-700"
                >
                  <i className="bi bi-plus-lg" aria-hidden /> Ajouter un champ
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}