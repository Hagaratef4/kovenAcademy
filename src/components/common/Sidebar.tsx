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
  type LucideIcon,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Logo } from './Logo'
import type { UserRole } from '../../types/auth'

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
]

function roleNav(role: UserRole): NavItem[] {
  if (role === 'admin') return adminNav
  if (role === 'teacher') {
    return [
      { to: '/teacher', label: 'Overview', icon: LayoutDashboard },
      { to: '/teacher', label: 'Requests', icon: ClipboardList },
      { to: '/teacher', label: 'Schedule', icon: CalendarClock },
    ]
  }
  if (role === 'parent') {
    return [
      { to: '/parent', label: 'Overview', icon: LayoutDashboard },
      { to: '/parent', label: 'Children', icon: Users },
      { to: '/parent', label: 'Bookings', icon: CalendarDays },
    ]
  }
  return [
    { to: '/student', label: 'Overview', icon: LayoutDashboard },
    { to: '/student', label: 'Find teachers', icon: GraduationCap },
    { to: '/student', label: 'My packages', icon: Package },
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

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-ink/40 transition lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[17.5rem] flex-col border-r border-white/10 koven-panel text-cream transition duration-300 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="px-5 py-6">
          <Logo inverted showSlogan to={role === 'admin' ? '/admin' : `/${role}`} />
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/admin' || item.to === `/${role}`}
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
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="p-4">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-cream/80 transition hover:bg-white/10 hover:text-gold"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
