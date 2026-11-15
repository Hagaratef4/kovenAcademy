import { ArrowUpLeft, CircleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { UserRole } from '../../types/auth'
import { useLanguage } from '../../context/useLanguage'

type WorkspaceSection = 'requests' | 'schedule' | 'teachers' | 'children'

const workspaceCopy: Partial<Record<UserRole, Partial<Record<WorkspaceSection, { title: string; description: string }>>>> = {
  teacher: {
    requests: {
      title: 'Teacher request inbox',
      description: 'Incoming requests, accepted requests, and declined requests will be managed here when the marketplace API is available.',
    },
    schedule: {
      title: 'Teaching schedule',
      description: 'Lesson bookings and weekly availability require a connected scheduling service.',
    },
  },
  student: {
    requests: {
      title: 'Learning requests',
      description: 'Request submission and status tracking require a connected learning request service.',
    },
    teachers: {
      title: 'Find a teacher',
      description: 'Teacher discovery and accepted teacher matches require a connected teacher directory.',
    },
    schedule: {
      title: 'My lessons',
      description: 'Lesson times and session history will be available after a booking service is connected.',
    },
  },
  parent: {
    children: {
      title: 'Children’s profiles',
      description: 'Linked children and multi-child management need a family profile service. No child records are stored in this prototype.',
    },
    requests: {
      title: 'Family learning requests',
      description: 'Submitting and tracking learning requests for children requires a connected request service.',
    },
    schedule: {
      title: 'Family schedule',
      description: 'Children’s lessons, accepted teachers, and schedules require a connected booking service.',
    },
  },
}

export function RoleWorkspacePage({ role, section }: { role: UserRole; section: WorkspaceSection }) {
  const { t } = useLanguage()
  const content = workspaceCopy[role]?.[section]

  if (!content) return null

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t(role)}</p>
        <h1 className="mt-2 font-display text-4xl text-deep">{t(content.title)}</h1>
      </header>
      <section className="rounded-3xl border border-line bg-cream p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gold/20 text-deep"><CircleAlert className="h-5 w-5" /></span>
          <div>
            <h2 className="font-semibold text-deep">{t('This feature is not connected yet')}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{t(content.description)}</p>
            <p className="mt-3 text-xs leading-5 text-muted">{t('No backend or database is configured in this project, so this page does not create or modify records.')}</p>
          </div>
        </div>
        <Link to={`/${role}`} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-gold">
          <ArrowUpLeft className="h-4 w-4 rtl:rotate-180" />
          {t('Back to overview')}
        </Link>
      </section>
    </div>
  )
}
