import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { DashboardLayout } from '../layouts/DashboardLayout'
import type { UserRole } from '../types/auth'
import { useLanguage } from '../context/useLanguage'
import { getDashboardPath } from '../services/authService'

type ProtectedRouteProps = {
  roles: UserRole[]
  children: ReactNode
}

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const { user, isReady } = useAuth()
  const { t } = useLanguage()

  if (!isReady) {
    return (
      <div className="grid min-h-svh place-items-center bg-canvas text-sm text-muted">
        {t('Preparing Koven...')}
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />
  }

  return <DashboardLayout>{children}</DashboardLayout>
}
