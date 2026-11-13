import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/common/Navbar'
import { Sidebar } from '../components/common/Sidebar'
import { useAuth } from '../context/AuthContext'

type DashboardLayoutProps = {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  if (!user) return null

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-svh bg-canvas">
      <Sidebar role={user.role} open={open} onClose={() => setOpen(false)} onLogout={handleLogout} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar user={user} onMenu={() => setOpen(true)} />
        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  )
}
