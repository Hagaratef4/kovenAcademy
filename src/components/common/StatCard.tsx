import type { ReactNode } from 'react'

type StatCardProps = {
  label: string
  value: string
  delta: string
  icon: ReactNode
  tone?: 'purple' | 'gold'
}

export function StatCard({ label, value, delta, icon, tone = 'purple' }: StatCardProps) {
  const iconWrap =
    tone === 'gold' ? 'bg-gold/15 text-deep' : 'bg-primary/10 text-primary'

  return (
    <article className="rounded-3xl border border-line bg-cream p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold text-deep">{value}</p>
        </div>
        <span className={`grid h-11 w-11 place-items-center rounded-2xl ${iconWrap}`}>{icon}</span>
      </div>
      <p className="mt-4 text-xs font-medium tracking-wide text-primary">{delta}</p>
    </article>
  )
}
