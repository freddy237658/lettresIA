export type FieldType = 'text' | 'textarea' | 'email' | 'tel' | 'date' | 'select'

/** Schéma d'un champ de formulaire : sera fourni par l'API Laravel (template_fields). */
export interface TemplateField {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: string[]
  /** true = occupe une demi-largeur sur desktop */
  half?: boolean
}

export type PaperLayout = 'minimal' | 'classic' | 'band' | 'sidebar'

export type Tone =
  | 'formel'
  | 'professionnel'
  | 'academique'
  | 'cordial'
  | 'administratif'
  | 'simple'

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  examples: string[]
  /** classes Tailwind complètes (pour être détectées au build) */
  card: string
  iconBox: string
  accent: string
}

export interface Template {
  id: string
  name: string
  categoryId: string
  description: string
  isPremium: boolean
  popular?: boolean
  addedAt: string
  layout: PaperLayout
  fields: TemplateField[]
}

export interface LetterVersion {
  id: string
  number: number
  label: string
  content: string
  createdAt: string
}

export interface PaperStyle {
  fontFamily: 'serif' | 'sans'
  fontSize: number
  lineHeight: number
  margin: 'narrow' | 'normal' | 'wide'
  signature: boolean
}

export interface Letter {
  id: string
  templateId: string
  title: string
  data: Record<string, string>
  tone: Tone
  content: string
  style: PaperStyle
  versions: LetterVersion[]
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  country: string
  profession: string
  institution: string
}

export type PlanId = 'gratuit' | 'premium' | 'entreprise'

export interface AppNotification {
  id: string
  type: 'success' | 'payment' | 'info' | 'security' | 'template'
  title: string
  text: string
  createdAt: string
  read: boolean
}

export interface PaymentRecord {
  id: string
  label: string
  amount: string
  method: string
  createdAt: string
  status: 'Payé' | 'Échoué'
}

export interface Settings {
  defaultTone: Tone
  defaultFont: 'serif' | 'sans'
  notifyLetters: boolean
  notifyCredits: boolean
  notifyNews: boolean
}

export interface Plan {
  id: PlanId
  name: string
  priceXAF: number
  priceEUR: number
  features: string[]
  highlight?: boolean
  cta: string
}


/* ---------------------------------------------------------------------- */
/* Espace administrateur (§12 du cahier des charges)                      */
/* ---------------------------------------------------------------------- */

export interface AdminUserRow {
  id: string
  name: string
  email: string
  role: Role
  plan: PlanId
  lettersCount: number
  joinedAt: string
  status: 'actif' | 'suspendu'
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  country: string
  profession: string
  institution: string
  role?: Role
}

export type Role = 'utilisateur' | 'premium' | 'admin'

export type AIProviderName = 'Gemini' | 'Groq' | 'Mistral' | 'OpenRouter' | 'Ollama'

export interface AIProviderStatus {
  name: AIProviderName
  status: 'ok' | 'quota' | 'indisponible'
  latencyMs: number
  usagePercent: number
  callsToday: number
}

export interface AILog {
  id: string
  task: 'generate' | 'rewrite' | 'correct' | 'shorten' | 'expand'
  provider: AIProviderName
  status: 'succes' | 'fallback' | 'erreur'
  latencyMs: number
  userEmail: string
  createdAt: string
}

export interface AdminActivity {
  id: string
  text: string
  createdAt: string
  icon: string
}