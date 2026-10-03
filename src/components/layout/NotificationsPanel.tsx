import { useEffect, useRef } from 'react'
import { useLetters } from '@/context/LetterContext'
import { EmptyState } from '@/components/ui/Primitives'

const ICONS: Record<string, string> = {
  success: 'bi-check-circle-fill text-emerald-500',
  payment: 'bi-credit-card-fill text-indigo-500',
  info: 'bi-info-circle-fill text-sky-500',
  security: 'bi-shield-fill-exclamation text-amber-500',
  template: 'bi-stars text-violet-500',
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diff / 3_600_000)
  if (hours < 1) return "à l'instant"
  if (hours < 24) return `il y a ${hours} h`
  return `il y a ${Math.floor(hours / 24)} j`
}

export function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const { notifications, markAllNotificationsRead } = useLetters()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [onClose])

  return (
    <div ref={ref} className="absolute right-0 top-12 z-40 w-80 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/60">
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
        <button type="button" onClick={markAllNotificationsRead} className="text-xs font-medium text-indigo-600 hover:underline">
          Tout marquer comme lu
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-3 py-6">
            <EmptyState icon="bi-bell" title="Aucune notification" />
          </div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className={`flex gap-3 rounded-xl px-3 py-2.5 ${!n.read ? 'bg-indigo-50/60' : ''}`}>
              <i className={`bi ${ICONS[n.type]} mt-0.5 text-base`} aria-hidden />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">{n.title}</p>
                <p className="text-xs text-slate-500">{n.text}</p>
                <p className="mt-1 text-[11px] text-slate-400">{timeAgo(n.createdAt)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
