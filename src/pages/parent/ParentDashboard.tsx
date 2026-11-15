import { CalendarDays, ClipboardList, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WorkspaceCard } from '../../components/common/WorkspaceCard'
import { useAuth } from '../../context/useAuth'
import { useLanguage } from '../../context/useLanguage'

export function ParentDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="rounded-3xl border border-line bg-cream p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t('Family hub')}</p>
        <h1 className="mt-2 font-display text-4xl text-deep">{t('Welcome, {name}.', { name: user?.fullName.split(' ')[0] ?? '' })}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{t('Follow your children’s learning activity, requests, and schedules from one family account.')}</p>
        <Link to="/parent/profile" className="mt-4 inline-flex rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-gold">{t('Manage family profile')}</Link>
      </header>

      <div className="rounded-2xl border border-gold/35 bg-beige/70 px-4 py-3 text-sm leading-6 text-ink">
        {t('Linked child profiles and family learning services are not connected. No child or request records are stored yet.')}
      </div>

      <section>
        <h2 className="mb-4 font-display text-2xl text-deep">{t('Family learning overview')}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <WorkspaceCard to="/parent/children" title="Children’s profiles" description="Linked student profiles and multi-child management require a family profile service." icon={<UsersRound className="h-5 w-5" />} />
          <WorkspaceCard to="/parent/requests" title="Family requests" description="Requests for your children and teacher responses will appear here when available." icon={<ClipboardList className="h-5 w-5" />} />
          <WorkspaceCard to="/parent/schedule" title="Family schedule" description="Accepted teachers, lessons, and schedules will be shown here after service integration." icon={<CalendarDays className="h-5 w-5" />} />
        </div>
      </section>
    </div>
  )
}
