import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/useLanguage'

type LogoProps = {
  to?: string | null
  inverted?: boolean
  showSlogan?: boolean
  compact?: boolean
}

export function Logo({ to = '/', inverted = false, showSlogan = false, compact = false }: LogoProps) {
  const { t } = useLanguage()
  const wordmarkClass = inverted ? 'text-cream' : 'text-deep'
  const sloganClass = inverted ? 'text-gold-soft/90' : 'text-muted'

  const mark = (
    <span className="flex items-center gap-3">
      <span
        className="relative grid h-11 w-11 place-items-center rounded-2xl bg-deep shadow-[0_10px_24px_-12px_rgba(66,20,95,0.7)]"
        aria-hidden="true"
      >
        <span className="font-display text-[1.55rem] font-semibold leading-none text-cream">K</span>
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-cream" />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className={`block font-display text-[1.7rem] font-semibold tracking-[0.18em] ${wordmarkClass}`}>
            KOVEN
          </span>
          {showSlogan && (
            <span className={`block text-[0.7rem] font-medium tracking-[0.22em] uppercase ${sloganClass}`}>
              {t('Connect • Support • Grow')}
            </span>
          )}
        </span>
      )}
    </span>
  )

  if (!to) return mark

  return (
    <Link to={to} className="inline-flex rounded-xl outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-gold">
      {mark}
    </Link>
  )
}
