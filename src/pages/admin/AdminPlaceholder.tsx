import { useLanguage } from '../../context/useLanguage'

type AdminPlaceholderProps = {
  title: string
  description: string
}

export function AdminPlaceholder({ title, description }: AdminPlaceholderProps) {
  const { t } = useLanguage()
  return (
    <section className="rounded-[2rem] border border-line bg-cream p-8 shadow-[var(--shadow-soft)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{t('Coming next')}</p>
      <h1 className="mt-2 font-display text-4xl text-deep">{t(title)}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{t(description)}</p>
      <p className="mt-5 max-w-2xl rounded-2xl border border-gold/35 bg-beige/70 px-4 py-3 text-sm leading-6 text-ink">
        {t('This prototype has no management API connected. This page does not create or change platform records.')}
      </p>
    </section>
  )
}

