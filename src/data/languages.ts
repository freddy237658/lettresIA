export interface Language {
  /** Code ISO utilisé comme `lang` et comme identifiant de drapeau */
  code: string
  /** Nom de la langue affiché à l'utilisateur */
  label: string
}

export const LANGUAGES: Language[] = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
]

export const DEFAULT_LANGUAGE = LANGUAGES[0]
