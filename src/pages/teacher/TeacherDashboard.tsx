import { CalendarDays, ClipboardList, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WorkspaceCard } from '../../components/common/WorkspaceCard'
import { useAuth } from '../../context/useAuth'
import { useLanguage } from '../../context/useLanguage'

export function TeacherDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-col gap-4 rounded-3xl border border-line bg-cream p-6 shadow-[var(--shadow-soft)] sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t('Teacher studio')}</p>
          <h1 className="mt-2 font-display text-4xl text-deep">{t('Welcome, {name}.', { name: user?.fullName.split(' ')[0] ?? '' })}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{t('Your teaching overview: requests, students, schedule, and availability.')}</p>
        </div>
        <Link to="/teacher/profile" className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-gold">{t('View teacher profile')}</Link>
      </header>

      <div className="rounded-2xl border border-gold/35 bg-beige/70 px-4 py-3 text-sm leading-6 text-ink">
        {t('Teacher marketplace services are not connected. Request, student, and schedule information will appear here after backend integration.')}
      </div>

      <section>
        <h2 className="mb-4 font-display text-2xl text-deep">{t('Teaching activity')}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <WorkspaceCard to="/teacher/requests" title="Incoming requests" description="Review and respond to student requests when the service is available." icon={<ClipboardList className="h-5 w-5" />} />
          <WorkspaceCard to="/teacher/requests" title="Accepted students" description="Accepted requests and active students will be shown here." icon={<GraduationCap className="h-5 w-5" />} />
          <WorkspaceCard to="/teacher/schedule" title="Schedule and availability" description="Manage lesson times and teaching availability when scheduling is connected." icon={<CalendarDays className="h-5 w-5" />} />
        </div>
      </section>
    </div>
  )
}
