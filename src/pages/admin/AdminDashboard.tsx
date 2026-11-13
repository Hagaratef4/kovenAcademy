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
import { useAuth } from '../../context/AuthContext'

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
  const firstName = user?.fullName.split(' ')[0] ?? 'Admin'

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Admin control</p>
          <h1 className="mt-1 font-display text-4xl text-deep">Welcome back, {firstName}!</h1>
          <p className="mt-2 text-sm text-muted">Here's what's happening with Koven today.</p>
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            delta={stat.delta}
            tone={stat.tone}
            icon={statIcons[stat.id]}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="overflow-hidden rounded-3xl border border-line bg-cream shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="font-display text-2xl text-deep">Recent requests</h2>
            <Link to="/admin/requests" className="text-sm font-medium text-primary">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-left text-sm">
              <thead className="bg-beige text-muted">
                <tr>
                  {['Request', 'Student', 'Subject', 'City', 'Package', 'Status', 'Submitted'].map((heading) => (
                    <th key={heading} className="px-5 py-3 font-medium">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((request) => (
                  <tr key={request.id} className="border-t border-line">
                    <td className="px-5 py-3 font-medium text-deep">{request.id}</td>
                    <td className="px-5 py-3">{request.student}</td>
                    <td className="px-5 py-3">{request.subject}</td>
                    <td className="px-5 py-3">{request.city}</td>
                    <td className="px-5 py-3">{request.package}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[request.status]}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted">{request.submitted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-3xl border border-line bg-cream p-5 shadow-[var(--shadow-soft)]">
            <h2 className="font-display text-2xl text-deep">Recently registered</h2>
            <ul className="mt-4 space-y-3">
              {recentUsers.map((entry) => (
                <li key={entry.name} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-deep">{entry.name}</p>
                    <p className="text-xs text-muted">
                      {entry.role} · {entry.city}
                    </p>
                  </div>
                  <span className="text-xs text-muted">{entry.joined}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-line bg-cream p-5 shadow-[var(--shadow-soft)]">
            <h2 className="font-display text-2xl text-deep">Platform activity</h2>
            <div className="mt-5 flex h-28 items-end justify-between gap-2">
              {[42, 58, 36, 74, 61, 88, 70].map((value, index) => (
                <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div
                    className="w-3 rounded-full bg-gradient-to-t from-deep to-lavender"
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-[10px] text-muted">{['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}</span>
                </div>
              ))}
            </div>
            <ul className="mt-5 space-y-3">
              {activityFeed.slice(0, 4).map((item) => (
                <li key={item.title} className="text-sm">
                  <p className="text-ink">{item.title}</p>
                  <p className="text-xs text-muted">{item.time}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="rounded-3xl border border-line bg-cream p-5 shadow-[var(--shadow-soft)]">
        <h2 className="font-display text-2xl text-deep">Quick actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Link to="/admin/subjects" className="rounded-2xl border border-line bg-canvas p-4 transition hover:border-gold">
            <Sparkles className="h-5 w-5 text-gold" />
            <p className="mt-3 font-semibold text-deep">Add a subject</p>
            <p className="mt-1 text-sm text-muted">Keep the catalog aligned with demand.</p>
          </Link>
          <Link to="/admin/teachers" className="rounded-2xl border border-line bg-canvas p-4 transition hover:border-gold">
            <GraduationCap className="h-5 w-5 text-primary" />
            <p className="mt-3 font-semibold text-deep">Review teachers</p>
            <p className="mt-1 text-sm text-muted">Approve new educator profiles.</p>
          </Link>
          <Link to="/admin/bookings" className="rounded-2xl border border-line bg-canvas p-4 transition hover:border-gold">
            <CalendarDays className="h-5 w-5 text-gold" />
            <p className="mt-3 font-semibold text-deep">Check bookings</p>
            <p className="mt-1 text-sm text-muted">Spot conflicts before they happen.</p>
          </Link>
          <Link to="/admin/reports" className="rounded-2xl border border-line bg-canvas p-4 transition hover:border-gold">
            <ClipboardList className="h-5 w-5 text-primary" />
            <p className="mt-3 font-semibold text-deep">Open reports</p>
            <p className="mt-1 text-sm text-muted">See weekly marketplace health.</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
