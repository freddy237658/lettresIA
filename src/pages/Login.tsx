import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as { state?: { from?: string } }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError('Merci de renseigner votre e-mail et votre mot de passe.')
      return
    }
    setError('')
    setLoading(true)
    await login(email, password)
    setLoading(false)
    navigate(location.state?.from || '/app/tableau-de-bord', { replace: true })
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
          <i className="bi bi-envelope-paper-fill text-xl" aria-hidden />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">Connexion</h1>
        <p className="mt-1 text-sm text-slate-500">Bon retour ! Connectez-vous à votre compte.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/40">
        {error && (
          <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">{error}</p>
        )}

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Mot de passe
            </label>
            <Link to="/mot-de-passe-oublie" className="text-xs font-medium text-indigo-600 hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
          />
          Se souvenir de moi
        </label>

        <Button type="submit" fullWidth size="lg" disabled={loading}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </Button>

        <p className="text-center text-xs text-slate-400">
          Prototype : n'importe quel e-mail / mot de passe fonctionne.
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Vous n'avez pas de compte ?{' '}
        <Link to="/inscription" className="font-semibold text-indigo-600 hover:underline">
          S'inscrire
        </Link>
      </p>
    </div>
  )
}
