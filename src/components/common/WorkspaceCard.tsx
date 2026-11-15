import type { ReactNode } from 'react'
import { ArrowUpLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/useLanguage'

type WorkspaceCardProps = {
  to: string
  title: string
  description: string
  icon: ReactNode
}

export function WorkspaceCard({ to, title, description, icon }: WorkspaceCardProps) {
  const { t } = useLanguage()

  return (
    <Link to={to} className="group rounded-3xl border border-line bg-cream p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-gold/70">
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">{icon}</span>
        <ArrowUpLeft className="h-4 w-4 text-muted transition group-hover:text-primary rtl:rotate-180" />
      </div>
      <h2 className="mt-4 font-display text-xl font-semibold text-deep">{t(title)}</h2>
      <p className="mt-1 text-sm leading-6 text-muted">{t(description)}</p>
      <p className="mt-4 inline-flex rounded-full bg-beige px-3 py-1 text-xs font-medium text-primary">{t('Not connected')}</p>
    </Link>
  )
}
