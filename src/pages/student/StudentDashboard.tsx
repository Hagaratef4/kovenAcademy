import { BookOpenCheck, CalendarDays, ClipboardList } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WorkspaceCard } from '../../components/common/WorkspaceCard'
import { useAuth } from '../../context/useAuth'
import { useLanguage } from '../../context/useLanguage'

export function StudentDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="rounded-3xl border border-line bg-cream p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t('Student space')}</p>
        <h1 className="mt-2 font-display text-4xl text-deep">{t('Welcome, {name}.', { name: user?.fullName.split(' ')[0] ?? '' })}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{t('Your learning overview: requests, teacher matches, and upcoming lessons.')}</p>
        <Link to="/student/profile" className="mt-4 inline-flex rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-gold">{t('Complete learning profile')}</Link>
      </header>

      <div className="rounded-2xl border border-gold/35 bg-beige/70 px-4 py-3 text-sm leading-6 text-ink">
        {t('Student request and lesson services are not connected. No requests or lessons are being stored yet.')}
      </div>

      <section>
        <h2 className="mb-4 font-display text-2xl text-deep">{t('Your learning journey')}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <WorkspaceCard to="/student/requests" title="My requests" description="Submitted requests and their status will appear here when request services are connected." icon={<ClipboardList className="h-5 w-5" />} />
          <WorkspaceCard to="/student/teachers" title="Teacher matches" description="Teachers who accept your requests will be listed here." icon={<BookOpenCheck className="h-5 w-5" />} />
          <WorkspaceCard to="/student/schedule" title="My schedule" description="Lessons and upcoming sessions will appear here after scheduling is connected." icon={<CalendarDays className="h-5 w-5" />} />
        </div>
      </section>
    </div>
  )
}
