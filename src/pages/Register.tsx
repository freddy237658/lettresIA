import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.firstName || !form.email || !form.password) {
      setError('Merci de remplir les champs obligatoires.')
      return
    }
    if (form.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }
    setError('')
    setLoading(true)
    await register(form)
    setLoading(false)
    navigate('/app/tableau-de-bord', { replace: true })
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
          <i className="bi bi-person-plus-fill text-xl" aria-hidden />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">Créer un compte</h1>
        <p className="mt-1 text-sm text-slate-500">Rejoignez LettreAI et commencez à créer vos lettres dès maintenant.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/40">
        {error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">{error}</p>}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Prénom</label>
            <input
              value={form.firstName}
              onChange={(e) => set('firstName', e.target.value)}
              placeholder="Freddy"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Nom</label>
            <input
              value={form.lastName}
              onChange={(e) => set('lastName', e.target.value)}
              placeholder="Nom"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">E-mail</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="vous@exemple.com"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Mot de passe</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => set('password', e.target.value)}
            placeholder="Au moins 6 caractères"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <Button type="submit" fullWidth size="lg" disabled={loading}>
          {loading ? 'Création du compte…' : "S'inscrire"}
        </Button>

        <p className="text-center text-xs leading-relaxed text-slate-400">
          En vous inscrivant, vous acceptez les conditions d'utilisation et la politique de confidentialité.
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Vous avez déjà un compte ?{' '}
        <Link to="/connexion" className="font-semibold text-indigo-600 hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  )
}
