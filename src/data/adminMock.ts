import type { AdminActivity, AdminUserRow, AIProviderStatus, AILog } from '@/types'

export const ADMIN_USERS: AdminUserRow[] = [
  { id: 'u1', name: 'Ahmed Benali', email: 'ahmed@exemple.com', role: 'premium', plan: 'premium', lettersCount: 12, joinedAt: '2026-06-02', status: 'actif' },
  { id: 'u2', name: 'Fatima Nguema', email: 'fatima@exemple.com', role: 'utilisateur', plan: 'gratuit', lettersCount: 3, joinedAt: '2026-07-14', status: 'actif' },
  { id: 'u3', name: 'Jean Mballa', email: 'jean.mballa@exemple.com', role: 'utilisateur', plan: 'gratuit', lettersCount: 1, joinedAt: '2026-08-01', status: 'actif' },
  { id: 'u4', name: 'Sarah Kom', email: 'sarah.kom@exemple.com', role: 'premium', plan: 'entreprise', lettersCount: 47, joinedAt: '2026-04-19', status: 'actif' },
  { id: 'u5', name: 'Paul Etoundi', email: 'paul.etoundi@exemple.com', role: 'utilisateur', plan: 'gratuit', lettersCount: 0, joinedAt: '2026-09-10', status: 'suspendu' },
  { id: 'u6', name: 'Freddy', email: 'freddy@exemple.com', role: 'admin', plan: 'entreprise', lettersCount: 5, joinedAt: '2026-01-15', status: 'actif' },
]

export const AI_PROVIDERS: AIProviderStatus[] = [
  { name: 'Gemini', status: 'ok', latencyMs: 620, usagePercent: 42, callsToday: 312 },
  { name: 'Groq', status: 'ok', latencyMs: 210, usagePercent: 65, callsToday: 540 },
  { name: 'Mistral', status: 'quota', latencyMs: 890, usagePercent: 96, callsToday: 118 },
  { name: 'OpenRouter', status: 'ok', latencyMs: 740, usagePercent: 20, callsToday: 74 },
  { name: 'Ollama', status: 'indisponible', latencyMs: 0, usagePercent: 0, callsToday: 0 },
]

export const AI_LOGS: AILog[] = [
  { id: 'l1', task: 'generate', provider: 'Groq', status: 'succes', latencyMs: 640, userEmail: 'ahmed@exemple.com', createdAt: '2026-09-22T08:12:00Z' },
  { id: 'l2', task: 'rewrite', provider: 'Gemini', status: 'succes', latencyMs: 710, userEmail: 'sarah.kom@exemple.com', createdAt: '2026-09-22T08:05:00Z' },
  { id: 'l3', task: 'generate', provider: 'Mistral', status: 'fallback', latencyMs: 1450, userEmail: 'fatima@exemple.com', createdAt: '2026-09-22T07:58:00Z' },
  { id: 'l4', task: 'correct', provider: 'Groq', status: 'succes', latencyMs: 300, userEmail: 'jean.mballa@exemple.com', createdAt: '2026-09-22T07:40:00Z' },
  { id: 'l5', task: 'generate', provider: 'Ollama', status: 'erreur', latencyMs: 0, userEmail: 'paul.etoundi@exemple.com', createdAt: '2026-09-22T07:22:00Z' },
]

export const ADMIN_ACTIVITY: AdminActivity[] = [
  { id: 'a1', text: 'Sarah Kom est passée au plan Entreprise', createdAt: '2026-09-22T08:00:00Z', icon: 'bi-gem' },
  { id: 'a2', text: 'Nouveau modèle « Lettre de démission » publié', createdAt: '2026-09-21T17:30:00Z', icon: 'bi-file-earmark-plus' },
  { id: 'a3', text: 'Fournisseur Mistral proche du quota (96%)', createdAt: '2026-09-21T15:10:00Z', icon: 'bi-exclamation-triangle' },
  { id: 'a4', text: 'Paul Etoundi suspendu pour abus signalé', createdAt: '2026-09-20T11:05:00Z', icon: 'bi-slash-circle' },
]