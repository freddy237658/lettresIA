import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@/types'
import { readStore, writeStore, removeStore, uid } from '@/services/storage'

interface RegisterInput {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  credits: number
  plan: 'gratuit' | 'premium' | 'entreprise'
  login: (email: string, password: string) => Promise<void>
  register: (input: RegisterInput) => Promise<void>
  logout: () => void
  updateProfile: (patch: Partial<User>) => void
  setPlan: (plan: 'gratuit' | 'premium' | 'entreprise') => void
  consumeCredit: () => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const DEFAULT_USER: User = {
  id: uid('user'),
  firstName: 'Freddy',
  lastName: '',
  email: 'freddy@exemple.com',
  phone: '',
  city: 'Douala',
  country: 'Cameroun',
  profession: '',
  institution: 'Institut Universitaire de la Côte',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStore<User | null>('user', null))
  const [plan, setPlanState] = useState<'gratuit' | 'premium' | 'entreprise'>(() =>
    readStore('plan', 'gratuit'),
  )
  const [credits, setCredits] = useState<number>(() => readStore('credits', 5))

  useEffect(() => {
    if (user) writeStore('user', user)
    else removeStore('user')
  }, [user])

  useEffect(() => writeStore('plan', plan), [plan])
  useEffect(() => writeStore('credits', credits), [credits])

  async function login(email: string) {
    // Prototype: any password is accepted — the real call is POST /api/auth/login
    await new Promise((r) => setTimeout(r, 500))
    const existing = readStore<User | null>('user', null)
    setUser(existing ?? { ...DEFAULT_USER, email })
  }

  async function register(input: RegisterInput) {
    await new Promise((r) => setTimeout(r, 600))
    setUser({
      id: uid('user'),
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: '',
      city: '',
      country: 'Cameroun',
      profession: '',
      institution: '',
    })
    setCredits(5)
    setPlanState('gratuit')
  }

  function logout() {
    setUser(null)
  }

  function updateProfile(patch: Partial<User>) {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev))
  }

  function setPlan(next: 'gratuit' | 'premium' | 'entreprise') {
    setPlanState(next)
    if (next !== 'gratuit') setCredits(Infinity)
    else setCredits(5)
  }

  function consumeCredit() {
    if (credits === Infinity) return true
    if (credits <= 0) return false
    setCredits((c) => c - 1)
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        credits,
        plan,
        login,
        register,
        logout,
        updateProfile,
        setPlan,
        consumeCredit,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
