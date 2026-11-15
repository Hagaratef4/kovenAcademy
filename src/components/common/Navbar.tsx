import { Bell, Menu, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { User } from '../../types/auth'
import { notifications } from '../../data/mockDashboard'
import { useLanguage } from '../../context/useLanguage'
import { LanguageSwitcher } from './LanguageSwitcher'

type NavbarProps = {
  user: User
  onMenu: () => void
}

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function Navbar({ user, onMenu }: NavbarProps) {
  const [openNotifications, setOpenNotifications] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-cream/90 px-4 py-3 backdrop-blur md:px-6">
      <button
        type="button"
        onClick={onMenu}
        className="rounded-xl p-2 text-deep transition hover:bg-beige md:hidden"
        aria-label={t('Open menu')}
      >
        <Menu className="h-5 w-5" />
      </button>
      <label className="relative hidden min-w-0 flex-1 items-center md:flex">
        <Search className="pointer-events-none absolute start-3 h-4 w-4 text-muted" />
        <input
          type="search"
          placeholder={t('Search teachers, students, requests...')}
          className="w-full max-w-xl rounded-2xl border border-line bg-canvas py-2.5 ps-10 pe-4 text-sm outline-none transition focus:border-lavender focus:ring-4 focus:ring-lavender/15"
        />
      </label>
      <div className="ms-auto flex items-center gap-2">
        <LanguageSwitcher compact />
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenNotifications((current) => !current)}
            className="relative rounded-xl p-2 text-deep transition hover:bg-beige"
            aria-label={t('Notifications')}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute end-1.5 top-1.5 h-2 w-2 rounded-full bg-gold" />
          </button>
          {openNotifications && (
            <div className="absolute end-0 top-[calc(100%+8px)] w-80 overflow-hidden rounded-2xl border border-line bg-cream shadow-[var(--shadow-card)]">
              <p className="border-b border-line px-4 py-3 text-sm font-semibold text-deep">{t('Notifications')}</p>
              <ul>
                {notifications.map((item) => (
                  <li key={item.title} className="border-b border-line px-4 py-3 last:border-0">
                    <p className="text-sm text-ink">{t(item.title)}</p>
                    <p className="mt-1 text-xs text-muted">{t(item.time)}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Link to={`/${user.role}/profile`} aria-label={t('Open your profile')} className="flex items-center gap-3 rounded-2xl bg-beige px-2 py-1.5 pe-3 transition hover:ring-2 hover:ring-gold/50">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-deep font-display text-sm font-semibold text-gold">
            {initials(user.fullName)}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold text-deep">{user.fullName}</span>
            <span className="block text-[11px] uppercase tracking-[0.16em] text-muted">{t(user.role)}</span>
          </span>
        </Link>
      </div>
    </header>
  )
}
