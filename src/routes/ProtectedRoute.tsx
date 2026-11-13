import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DashboardLayout } from '../layouts/DashboardLayout'
import type { UserRole } from '../types/auth'

type ProtectedRouteProps = {
  roles: UserRole[]
  children: ReactNode
}

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const { user, isReady } = useAuth()

  if (!isReady) {
    return (
      <div className="grid min-h-svh place-items-center bg-canvas text-sm text-muted">
        Preparing Koven...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/login" replace />
  }

  return <DashboardLayout>{children}</DashboardLayout>
}
