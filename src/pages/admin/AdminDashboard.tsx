import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Package,
  Plus,
  Sparkles,
  Users,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/common/Button'
import { StatCard } from '../../components/common/StatCard'
import { activityFeed, dashboardStats, recentRequests, recentUsers } from '../../data/mockDashboard'
import { useAuth } from '../../context/useAuth'
import { useLanguage } from '../../context/useLanguage'

const statIcons: Record<(typeof dashboardStats)[number]['id'], ReactNode> = {
  students: <GraduationCap className="h-5 w-5" />,
  teachers: <BookOpen className="h-5 w-5" />,
  parents: <Users className="h-5 w-5" />,
  requests: <ClipboardList className="h-5 w-5" />,
  bookings: <CalendarDays className="h-5 w-5" />,
  packages: <Package className="h-5 w-5" />,
}

const statusStyles: Record<string, string> = {
  Pending: 'bg-gold/20 text-deep',
  Matched: 'bg-lavender/20 text-primary',
  Accepted: 'bg-success/10 text-success',
}

export function AdminDashboard() {
  const { user } = useAuth()
  const { t, language } = useLanguage()
  const firstName = user?.fullName.split(' ')[0] ?? 'Admin'

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{t('Admin control')}</p>
          <h1 className="mt-1 font-display text-4xl text-deep">{t('Welcome back, {name}!', { name: firstName })}</h1>
          <p className="mt-2 text-sm text-muted">{t("Here's what's happening with Koven today.")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/admin/requests">
            <Button variant="purple" icon={<ClipboardList className="h-4 w-4" />}>
              Review requests
            </Button>
          </Link>
          <Link to="/admin/packages">
            <Button icon={<Plus className="h-4 w-4" />}>New package</Button>
          </Link>
        </div>
      </div>

      <p className="rounded-2xl border border-gold/35 bg-beige/70 px-4 py-3 text-sm leading-6 text-ink">
        {t('This dashboard uses sample preview metrics and records. It is not connected to live platform data.')}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={t(stat.label)}
            value={Number(stat.value.replaceAll(',', '')).toLocaleString(language === 'ar' ? 'ar-KW' : 'en-KW')}
            delta={t(stat.delta)}
            tone={stat.tone}
            icon={statIcons[stat.id]}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="overflow-hidden rounded-3xl border border-line bg-cream shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="font-display text-2xl text-deep">{t('Recent requests')}</h2>
            <Link to="/admin/requests" className="text-sm font-medium text-primary">
              {t('View all')}
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-start text-sm">
              <thead className="bg-beige text-muted">
                <tr>
                  {['Request', 'Student', 'Subject', 'City', 'Package', 'Status', 'Submitted'].map((heading) => (
                    <th key={heading} className="px-5 py-3 font-medium">
                      {t(heading)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((request) => (
                  <tr key={request.id} className="border-t border-line">
                    <td className="px-5 py-3 font-medium text-deep">{request.id}</td>
                    <td className="px-5 py-3">{t(request.student)}</td>
                    <td className="px-5 py-3">{t(request.subject)}</td>
                    <td className="px-5 py-3">{t(request.city)}</td>
                    <td className="px-5 py-3">{t(request.package)}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[request.status]}`}>
                        {t(request.status)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted">{t(request.submitted)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-3xl border border-line bg-cream p-5 shadow-[var(--shadow-soft)]">
            <h2 className="font-display text-2xl text-deep">{t('Recently registered')}</h2>
            <ul className="mt-4 space-y-3">
              {recentUsers.map((entry) => (
                <li key={entry.name} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-deep">{t(entry.name)}</p>
                    <p className="text-xs text-muted">
                      {t(entry.role)} · {t(entry.city)}
                    </p>
                  </div>
                  <span className="text-xs text-muted">{t(entry.joined)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-line bg-cream p-5 shadow-[var(--shadow-soft)]">
            <h2 className="font-display text-2xl text-deep">{t('Platform activity')}</h2>
            <div className="mt-5 flex h-28 items-end justify-between gap-2">
              {[42, 58, 36, 74, 61, 88, 70].map((value, index) => (
                <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div
                    className="w-3 rounded-full bg-gradient-to-t from-deep to-lavender"
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-[10px] text-muted">{t(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index])}</span>
                </div>
              ))}
            </div>
            <ul className="mt-5 space-y-3">
              {activityFeed.slice(0, 4).map((item) => (
                <li key={item.title} className="text-sm">
                  <p className="text-ink">{t(item.title)}</p>
                  <p className="text-xs text-muted">{t(item.time)}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="rounded-3xl border border-line bg-cream p-5 shadow-[var(--shadow-soft)]">
        <h2 className="font-display text-2xl text-deep">{t('Quick actions')}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Link to="/admin/subjects" className="rounded-2xl border border-line bg-canvas p-4 transition hover:border-gold">
            <Sparkles className="h-5 w-5 text-gold" />
            <p className="mt-3 font-semibold text-deep">{t('Add a subject')}</p>
            <p className="mt-1 text-sm text-muted">{t('Keep the catalog aligned with demand.')}</p>
          </Link>
          <Link to="/admin/teachers" className="rounded-2xl border border-line bg-canvas p-4 transition hover:border-gold">
            <GraduationCap className="h-5 w-5 text-primary" />
            <p className="mt-3 font-semibold text-deep">{t('Review teachers')}</p>
            <p className="mt-1 text-sm text-muted">{t('Approve new educator profiles.')}</p>
          </Link>
          <Link to="/admin/bookings" className="rounded-2xl border border-line bg-canvas p-4 transition hover:border-gold">
            <CalendarDays className="h-5 w-5 text-gold" />
            <p className="mt-3 font-semibold text-deep">{t('Check bookings')}</p>
            <p className="mt-1 text-sm text-muted">{t('Spot conflicts before they happen.')}</p>
          </Link>
          <Link to="/admin/reports" className="rounded-2xl border border-line bg-canvas p-4 transition hover:border-gold">
            <ClipboardList className="h-5 w-5 text-primary" />
            <p className="mt-3 font-semibold text-deep">{t('Open reports')}</p>
            <p className="mt-1 text-sm text-muted">{t('See weekly marketplace health.')}</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
