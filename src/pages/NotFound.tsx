import { LinkButton } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-indigo-500">
        <i className="bi bi-signpost-2-fill" aria-hidden />
      </span>
      <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">Page introuvable</h1>
      <p className="mt-2 text-sm text-slate-500">La page que vous cherchez n'existe pas ou a été déplacée.</p>
      <LinkButton to="/" className="mt-6">
        Retour à l'accueil
      </LinkButton>
    </div>
  )
}
