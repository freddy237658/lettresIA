import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
          <i className="bi bi-key-fill text-xl" aria-hidden />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">Mot de passe oublié</h1>
        <p className="mt-1 text-sm text-slate-500">Recevez un lien de réinitialisation par e-mail.</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        {sent ? (
          <p className="rounded-xl bg-emerald-50 px-3 py-3 text-sm font-medium text-emerald-700">
            <i className="bi bi-check-circle-fill mr-1" aria-hidden /> Si un compte existe pour {email}, un lien de réinitialisation vient d'être envoyé.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <Button type="submit" fullWidth size="lg">
              Envoyer le lien
            </Button>
          </form>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        <Link to="/connexion" className="font-semibold text-indigo-600 hover:underline">
          ← Retour à la connexion
        </Link>
      </p>
    </div>
  )
}
