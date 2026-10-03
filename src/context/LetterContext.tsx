import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { AppNotification, Letter, PaymentRecord } from '@/types'
import { readStore, writeStore, uid } from '@/services/storage'

interface LetterContextValue {
  letters: Letter[]
  favorites: string[]
  notifications: AppNotification[]
  payments: PaymentRecord[]
  addLetter: (letter: Letter) => void
  updateLetter: (id: string, patch: Partial<Letter>) => void
  deleteLetter: (id: string) => void
  duplicateLetter: (id: string) => void
  toggleFavorite: (templateId: string) => void
  isFavorite: (templateId: string) => boolean
  markAllNotificationsRead: () => void
  addPayment: (payment: PaymentRecord) => void
}

const LetterContext = createContext<LetterContextValue | null>(null)

const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: uid('notif'),
    type: 'template',
    title: 'Nouveau modèle disponible',
    text: '3 nouveaux modèles premium ont été ajoutés à la catégorie Emploi.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    read: false,
  },
  {
    id: uid('notif'),
    type: 'info',
    title: 'Astuce',
    text: "Ajoutez une signature dans Mon compte pour la retrouver automatiquement dans vos lettres.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    read: true,
  },
]

export function LetterProvider({ children }: { children: ReactNode }) {
  const [letters, setLetters] = useState<Letter[]>(() => readStore('letters', []))
  const [favorites, setFavorites] = useState<string[]>(() => readStore('favorites', []))
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    readStore('notifications', SEED_NOTIFICATIONS),
  )
  const [payments, setPayments] = useState<PaymentRecord[]>(() => readStore('payments', []))

  useEffect(() => writeStore('letters', letters), [letters])
  useEffect(() => writeStore('favorites', favorites), [favorites])
  useEffect(() => writeStore('notifications', notifications), [notifications])
  useEffect(() => writeStore('payments', payments), [payments])

  function addLetter(letter: Letter) {
    setLetters((prev) => [letter, ...prev])
    setNotifications((prev) => [
      {
        id: uid('notif'),
        type: 'success',
        title: 'Lettre terminée',
        text: `« ${letter.title} » a été générée avec succès.`,
        createdAt: new Date().toISOString(),
        read: false,
      },
      ...prev,
    ])
  }

  function updateLetter(id: string, patch: Partial<Letter>) {
    setLetters((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...patch, updatedAt: new Date().toISOString() } : l)),
    )
  }

  function deleteLetter(id: string) {
    setLetters((prev) => prev.filter((l) => l.id !== id))
  }

  function duplicateLetter(id: string) {
    setLetters((prev) => {
      const source = prev.find((l) => l.id === id)
      if (!source) return prev
      const copy: Letter = {
        ...source,
        id: uid('letter'),
        title: `${source.title} (copie)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return [copy, ...prev]
    })
  }

  function toggleFavorite(templateId: string) {
    setFavorites((prev) =>
      prev.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId],
    )
  }

  function isFavorite(templateId: string) {
    return favorites.includes(templateId)
  }

  function markAllNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function addPayment(payment: PaymentRecord) {
    setPayments((prev) => [payment, ...prev])
  }

  return (
    <LetterContext.Provider
      value={{
        letters,
        favorites,
        notifications,
        payments,
        addLetter,
        updateLetter,
        deleteLetter,
        duplicateLetter,
        toggleFavorite,
        isFavorite,
        markAllNotificationsRead,
        addPayment,
      }}
    >
      {children}
    </LetterContext.Provider>
  )
}

export function useLetters() {
  const ctx = useContext(LetterContext)
  if (!ctx) throw new Error('useLetters must be used within LetterProvider')
  return ctx
}
