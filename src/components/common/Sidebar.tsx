import {
  BookOpen,
  CalendarClock,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Sparkles,
  Users,
  ClipboardList,
  CalendarDays,
  BarChart3,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Logo } from './Logo'
import type { UserRole } from '../../types/auth'
import { useLanguage } from '../../context/useLanguage'

type NavItem = {
  to: string
  label: string
  icon: LucideIcon
}

const adminNav: NavItem[] = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/teachers', label: 'Teachers', icon: GraduationCap },
  { to: '/admin/students', label: 'Students', icon: BookOpen },
  { to: '/admin/parents', label: 'Parents', icon: Users },
  { to: '/admin/requests', label: 'Requests', icon: ClipboardList },
  { to: '/admin/packages', label: 'Packages', icon: Package },
  { to: '/admin/subjects', label: 'Subjects', icon: Sparkles },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/admin/schedules', label: 'Schedules', icon: CalendarClock },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
  { to: '/admin/profile', label: 'My Profile', icon: UserRound },
]

function roleNav(role: UserRole): NavItem[] {
  if (role === 'admin') return adminNav
  if (role === 'teacher') {
    return [
      { to: '/teacher', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/teacher/profile', label: 'My Profile', icon: UserRound },
      { to: '/teacher/requests', label: 'Student Requests', icon: ClipboardList },
      { to: '/teacher/schedule', label: 'My Schedule', icon: CalendarClock },
    ]
  }
  if (role === 'parent') {
    return [
      { to: '/parent', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/parent/profile', label: 'My Profile', icon: UserRound },
      { to: '/parent/children', label: 'My Children', icon: Users },
      { to: '/parent/requests', label: 'Educational Requests', icon: ClipboardList },
      { to: '/parent/schedule', label: 'Schedules', icon: CalendarDays },
    ]
  }
  return [
    { to: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/profile', label: 'My Profile', icon: UserRound },
    { to: '/student/teachers', label: 'Find Teachers', icon: GraduationCap },
    { to: '/student/requests', label: 'My Requests', icon: ClipboardList },
    { to: '/student/schedule', label: 'My Schedule', icon: CalendarDays },
  ]
}

type SidebarProps = {
  role: UserRole
  open: boolean
  onClose: () => void
  onLogout: () => void
}

export function Sidebar({ role, open, onClose, onLogout }: SidebarProps) {
  const items = roleNav(role)
  const { t } = useLanguage()

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-ink/40 transition md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 start-0 z-40 flex w-[17.5rem] shrink-0 flex-col border-e border-white/10 koven-panel text-cream transition-transform duration-300 ${
            open ? 'translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full'
          } md:!sticky md:!top-0 md:!bottom-auto md:!translate-x-0 md:h-svh`}
      >
        <div dir="ltr" className="shrink-0 px-5 py-6">
          <Logo inverted showSlogan to={role === 'admin' ? '/admin' : `/${role}`} />
        </div>
        <nav aria-label={t('Role navigation')} className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 pb-4">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.label}
                to={item.to}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-white/15 text-gold'
                      : 'text-cream/80 hover:bg-white/10 hover:text-cream'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {t(item.label)}
              </NavLink>
            )
          })}
        </nav>
        <div className="shrink-0 border-t border-white/15 p-4">
          <button
            type="button"
            onClick={onLogout}
            aria-label={t('Logout')}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-cream/80 transition hover:bg-white/10 hover:text-gold"
          >
            <LogOut className="h-4 w-4" />
            {t('Logout')}
          </button>
        </div>
      </aside>
    </>
  )
}
