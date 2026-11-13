import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AdminDashboard } from '../pages/admin/AdminDashboard'
import { AdminPlaceholder } from '../pages/admin/AdminPlaceholder'
import { ForgotPassword } from '../pages/auth/ForgotPassword'
import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import { VerifyOTP } from '../pages/auth/VerifyOTP'
import { ParentDashboard } from '../pages/parent/ParentDashboard'
import { StudentDashboard } from '../pages/student/StudentDashboard'
import { TeacherDashboard } from '../pages/teacher/TeacherDashboard'
import { getDashboardPath } from '../services/authService'
import { ProtectedRoute } from './ProtectedRoute'

function HomeRedirect() {
  const { user, isReady } = useAuth()
  if (!isReady) return null
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={getDashboardPath(user.role)} replace />
}

function GuestRoute({ children }: { children: ReactNode }) {
  const { user, isReady } = useAuth()
  if (!isReady) return null
  if (user) return <Navigate to={getDashboardPath(user.role)} replace />
  return children
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route
        path="/forgot-password"
        element={
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/teachers"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminPlaceholder
              title="Teachers"
              description="Educator profiles, verification, and availability will be managed from this page."
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminPlaceholder title="Students" description="Student accounts and learning packages will appear here." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/parents"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminPlaceholder title="Parents" description="Family accounts and linked children will be administered here." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/requests"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminPlaceholder title="Requests" description="Marketplace requests will be triaged from this queue." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/packages"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminPlaceholder title="Packages" description="Create and feature learning packages for families." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/subjects"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminPlaceholder title="Subjects" description="The subject catalog will be curated from this screen." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminPlaceholder title="Bookings" description="Confirmed sessions and conflicts will live here." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/schedules"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminPlaceholder title="Schedules" description="Platform-wide scheduling tools will be added next." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminPlaceholder title="Reports" description="Marketplace health and founder reports will be generated here." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminPlaceholder title="Settings" description="Shared admin settings for the three founders." />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher"
        element={
          <ProtectedRoute roles={['teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedRoute roles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent"
        element={
          <ProtectedRoute roles={['parent']}>
            <ParentDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
