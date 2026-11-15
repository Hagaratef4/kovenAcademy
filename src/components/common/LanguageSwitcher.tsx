import { Languages } from 'lucide-react'
import { useLanguage } from '../../context/useLanguage'
import type { Language } from '../../context/languageContextStore'

type LanguageSwitcherProps = {
  inverted?: boolean
  compact?: boolean
}

export function LanguageSwitcher({ inverted = false, compact = false }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage()
  const frame = inverted
    ? 'border-white/15 bg-white/8 text-cream'
    : 'border-line bg-cream text-deep'
  const active = inverted ? 'bg-gold text-deep' : 'bg-deep text-cream'

  return (
    <div className={`inline-flex items-center gap-1 rounded-full border p-1 ${frame}`} role="group" aria-label={t('Language selector')}>
      {!compact && <Languages aria-hidden="true" className="mx-1 h-4 w-4 opacity-75" />}
      {(['ar', 'en'] as Language[]).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          aria-pressed={language === option}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${language === option ? active : 'opacity-75 hover:opacity-100'}`}
        >
          {option === 'ar' ? 'العربية' : 'English'}
        </button>
      ))}
    </div>
  )
}
