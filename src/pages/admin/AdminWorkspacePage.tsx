import { useState } from 'react'
import { AlertCircle, CalendarDays, Languages, Search } from 'lucide-react'
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher'
import { useLanguage } from '../../context/useLanguage'

type AdminSection =
  | 'teachers'
  | 'students'
  | 'parents'
  | 'requests'
  | 'packages'
  | 'subjects'
  | 'bookings'
  | 'schedules'
  | 'reports'
  | 'settings'

const pageContent: Record<Exclude<AdminSection, 'settings'>, { title: string; description: string; columns: string[]; note: string }> = {
  teachers: {
    title: 'Teachers',
    description: 'Review educator profiles, subjects, locations, and verification status.',
    columns: ['Teacher', 'Subjects', 'Location', 'Verification', 'Account status', 'Actions'],
    note: 'Teacher profiles and verification records will appear here when the admin API is connected.',
  },
  students: {
    title: 'Students',
    description: 'Review learner accounts, educational levels, subjects, and parent links.',
    columns: ['Student', 'Educational level', 'Subjects', 'Parent', 'Account status', 'Actions'],
    note: 'Student and family records will appear here when the admin API is connected.',
  },
  parents: {
    title: 'Parents',
    description: 'Review family accounts and linked children using authorized contact details.',
    columns: ['Parent', 'Contact information', 'Linked children', 'Account status', 'Actions'],
    note: 'Parent profiles and linked-child records will appear here when the admin API is connected.',
  },
  requests: {
    title: 'Requests',
    description: 'Review incoming learning requests and their assignment progress.',
    columns: ['Request ID', 'Student', 'Parent', 'Subject', 'Preferred teacher', 'Location', 'Submitted', 'Status', 'Actions'],
    note: 'Marketplace requests and their current statuses will appear here when the admin API is connected.',
  },
  packages: {
    title: 'Packages',
    description: 'Review learning packages, session counts, duration, pricing, and availability.',
    columns: ['Package', 'Description', 'Sessions', 'Duration', 'Price', 'Status', 'Actions'],
    note: 'Package records and pricing will appear here when the admin API is connected.',
  },
  subjects: {
    title: 'Subjects',
    description: 'Review the learning catalog, educational levels, and teacher coverage.',
    columns: ['Subject', 'Category', 'Educational levels', 'Teachers', 'Status', 'Actions'],
    note: 'Subject catalog records and teacher associations will appear here when the admin API is connected.',
  },
  bookings: {
    title: 'Bookings',
    description: 'Review confirmed learning sessions and booking status.',
    columns: ['Booking', 'Student', 'Teacher', 'Subject', 'Date and time', 'Status', 'Actions'],
    note: 'Booking records and session details will appear here when the admin API is connected.',
  },
  schedules: {
    title: 'Schedules',
    description: 'Review platform booking times and teacher availability.',
    columns: ['Date', 'Time', 'Teacher', 'Student', 'Subject', 'Availability', 'Booking status'],
    note: 'Teacher availability and bookings will appear here when scheduling services are connected.',
  },
  reports: {
    title: 'Reports',
    description: 'Review platform activity and performance using connected records.',
    columns: ['Report area', 'Available measures', 'Data source', 'Status'],
    note: 'Reports are unavailable because there is no connected platform database. No statistics are estimated or generated here.',
  },
}

const scheduleDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function AdminWorkspacePage({ section }: { section: AdminSection }) {
  const { t, language } = useLanguage()
  const [query, setQuery] = useState('')
  const content = section === 'settings' ? null : pageContent[section]

  if (section === 'settings') {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t('Admin control')}</p>
          <h1 className="mt-1 font-display text-4xl text-deep">{t('Settings')}</h1>
          <p className="mt-2 text-sm text-muted">{t('Manage your account preferences and review platform configuration.')}</p>
        </header>
        <section className="rounded-3xl border border-line bg-cream p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"><Languages className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl text-deep">{t('Language preference')}</h2>
              <p className="mt-1 text-sm leading-6 text-muted">{t('Your language choice is saved in this browser and applies across the website.')}</p>
              <div className="mt-4"><LanguageSwitcher /></div>
            </div>
          </div>
        </section>
        <section className="rounded-3xl border border-line bg-cream p-6 shadow-[var(--shadow-soft)]">
          <h2 className="font-display text-2xl text-deep">{t('Administrator access')}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{t('The three founder accounts share the admin role in this prototype. Server-side permissions require a connected backend.')}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-beige px-3 py-1.5 text-xs font-medium text-primary">{t('Current language')}: {language === 'ar' ? 'العربية' : 'English'}</span>
            <span className="rounded-full bg-beige px-3 py-1.5 text-xs font-medium text-primary">{t('Direction')}: {language === 'ar' ? 'RTL' : 'LTR'}</span>
          </div>
        </section>
        <UnavailableNotice text="Platform-wide preferences and security settings cannot be saved until the admin API is connected." />
      </div>
    )
  }

  if (!content) return null

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t('Admin control')}</p>
          <h1 className="mt-1 font-display text-4xl text-deep">{t(content.title)}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{t(content.description)}</p>
        </div>
        <span className="rounded-full border border-gold/40 bg-beige/70 px-3 py-1.5 text-xs font-semibold text-primary">{t('Data source unavailable')}</span>
      </header>

      {section === 'schedules' ? (
        <section className="rounded-3xl border border-line bg-cream p-5 shadow-[var(--shadow-soft)] sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary"><CalendarDays className="h-5 w-5" /></span>
            <div><h2 className="font-display text-2xl text-deep">{t('Weekly schedule')}</h2><p className="text-sm text-muted">{t('Booking and availability slots')}</p></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {scheduleDays.map((day) => <div key={day} className="min-h-28 rounded-2xl border border-line bg-canvas p-4"><p className="text-sm font-semibold text-deep">{t(day)}</p><p className="mt-5 text-xs text-muted">{t('No schedule data connected')}</p></div>)}
          </div>
          <UnavailableNotice text={content.note} />
        </section>
      ) : (
        <section className="overflow-hidden rounded-3xl border border-line bg-cream shadow-[var(--shadow-soft)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4 sm:p-5">
            <div>
              <h2 className="font-display text-2xl text-deep">{section === 'reports' ? t('Report data') : t('Records')}</h2>
              <p className="mt-1 text-sm text-muted">{t('Connect a backend to load and manage current records.')}</p>
            </div>
            {section !== 'reports' && (
              <label className="relative block w-full sm:w-72">
                <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} disabled placeholder={t('Search unavailable until data is connected')} className="w-full rounded-2xl border border-line bg-canvas py-2.5 ps-10 pe-4 text-sm text-muted outline-none disabled:cursor-not-allowed disabled:opacity-70" />
              </label>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-max w-full text-start text-sm">
              <thead className="bg-beige/80 text-muted"><tr>{content.columns.map((column) => <th key={column} className="whitespace-nowrap px-4 py-3 font-medium sm:px-5">{t(column)}</th>)}</tr></thead>
            </table>
          </div>
          <div className="grid min-h-52 place-items-center px-5 py-8 text-center">
            <div className="max-w-md">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-primary"><AlertCircle className="h-5 w-5" /></span>
              <h3 className="mt-4 font-semibold text-deep">{t('No records available')}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{t(content.note)}</p>
            </div>
          </div>
          <div className="border-t border-line bg-canvas/70 px-5 py-3 text-xs text-muted">{t('Actions such as viewing, editing, and changing status will be enabled when connected data services are available.')}</div>
        </section>
      )}
    </div>
  )
}

function UnavailableNotice({ text }: { text: string }) {
  const { t } = useLanguage()
  return <p className="mt-5 rounded-2xl border border-gold/35 bg-beige/70 px-4 py-3 text-sm leading-6 text-ink">{t(text)}</p>
}
