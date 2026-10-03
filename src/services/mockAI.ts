import type { Template, Tone } from '@/types'

const TONE_OPENERS: Record<Tone, string> = {
  formel: 'Madame, Monsieur,',
  professionnel: 'Madame, Monsieur,',
  academique: 'Madame, Monsieur,',
  cordial: 'Bonjour,',
  administratif: 'Madame, Monsieur,',
  simple: 'Bonjour,',
}

const TONE_CLOSERS: Record<Tone, string> = {
  formel: "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.",
  professionnel: 'Je reste à votre disposition pour toute information complémentaire et vous prie d’agréer mes salutations distinguées.',
  academique: "Je vous prie d'agréer, Madame, Monsieur, l'expression de ma considération distinguée.",
  cordial: 'Bien cordialement,',
  administratif: "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations respectueuses.",
  simple: 'Merci d’avance, bien à vous,',
}

/**
 * Builds a French letter body strictly from the data the user typed into the
 * dynamic form. No name, company, date or experience is invented — fields
 * left empty by the user are simply omitted, per cahier des charges §5.4.
 */
function buildParagraphs(template: Template, data: Record<string, string>): string[] {
  const get = (name: string) => (data[name] ?? '').trim()
  const paragraphs: string[] = []

  switch (template.id) {
    case 'lettre-motivation':
    case 'demande-emploi':
    case 'candidature-spontanee': {
      const poste = get('poste')
      const entreprise = get('entreprise')
      let p1 = `Je vous adresse ma candidature`
      if (poste) p1 += ` pour le poste de ${poste}`
      if (entreprise) p1 += ` au sein de ${entreprise}`
      p1 += '.'
      paragraphs.push(p1)
      if (get('experience')) paragraphs.push(get('experience'))
      if (get('points_forts')) paragraphs.push(`Parmi mes atouts : ${get('points_forts')}`)
      if (get('competences')) paragraphs.push(`Compétences principales : ${get('competences')}`)
      if (get('motivation')) paragraphs.push(get('motivation'))
      if (get('disponibilite')) paragraphs.push(`Disponibilité : ${get('disponibilite')}`)
      break
    }
    case 'demande-stage': {
      const etab = get('etablissement')
      const filiere = get('filiere')
      let p1 = `Actuellement`
      if (filiere) p1 += ` en ${filiere}`
      if (etab) p1 += ` à ${etab}`
      p1 += `, je vous adresse ma candidature pour un stage${get('poste') ? ` en ${get('poste')}` : ''}${get('entreprise') ? ` au sein de ${get('entreprise')}` : ''}.`
      paragraphs.push(p1)
      if (get('duree') || get('periode')) {
        paragraphs.push(
          [get('duree') && `Durée souhaitée : ${get('duree')}.`, get('periode') && `Période envisagée : ${get('periode')}.`]
            .filter(Boolean)
            .join(' '),
        )
      }
      if (get('motivation')) paragraphs.push(get('motivation'))
      break
    }
    default: {
      // Generic fallback used by every other template of the catalogue.
      const objet = get('objet') || get('motif') || get('sujet')
      if (objet) paragraphs.push(`Par la présente, je souhaite vous soumettre la demande suivante : ${objet}.`)
      for (const field of template.fields) {
        if (['nom', 'email', 'telephone', 'ville', 'profession', 'destinataire', 'objet', 'motif', 'sujet'].includes(field.name)) continue
        const value = get(field.name)
        if (value) paragraphs.push(value)
      }
      if (paragraphs.length === 0) {
        paragraphs.push('Je vous adresse la présente demande et reste à votre disposition pour tout renseignement complémentaire.')
      }
    }
  }

  return paragraphs
}

export interface GenerateResult {
  content: string
}

export async function generateLetter(
  template: Template,
  data: Record<string, string>,
  tone: Tone,
): Promise<GenerateResult> {
  // Simulated latency — the real call goes through POST /api/ai/generate,
  // routed by Laravel to Gemini/Groq/Mistral/OpenRouter with fallback.
  await new Promise((resolve) => setTimeout(resolve, 1800))

  const opener = TONE_OPENERS[tone]
  const closer = TONE_CLOSERS[tone]
  const paragraphs = buildParagraphs(template, data)
  const signatureName = data.nom || ''

  const lines = [opener, '', ...paragraphs.flatMap((p) => [p, '']), closer]
  if (signatureName) lines.push('', signatureName)

  return { content: lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() }
}

export async function rewriteText(text: string, action: 'corriger' | 'reformuler' | 'raccourcir' | 'developper' | 'professionnaliser'): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 900))
  switch (action) {
    case 'raccourcir':
      return text
        .split('\n')
        .map((line) => (line.length > 140 ? line.slice(0, 137) + '…' : line))
        .join('\n')
    case 'developper':
      return text
    case 'professionnaliser':
    case 'reformuler':
    case 'corriger':
    default:
      return text
  }
}
