import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { AdminDashboard } from '../pages/admin/AdminDashboard'
import { AdminWorkspacePage } from '../pages/admin/AdminWorkspacePage'
import { ForgotPassword } from '../pages/auth/ForgotPassword'
import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import { VerifyOTP } from '../pages/auth/VerifyOTP'
import { ParentDashboard } from '../pages/parent/ParentDashboard'
import { StudentDashboard } from '../pages/student/StudentDashboard'
import { TeacherDashboard } from '../pages/teacher/TeacherDashboard'
import { ProfilePage } from '../pages/profile/ProfilePage'
import { RoleWorkspacePage } from '../pages/shared/RoleWorkspacePage'
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
            <AdminWorkspacePage section="teachers" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminWorkspacePage section="students" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/parents"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminWorkspacePage section="parents" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/requests"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminWorkspacePage section="requests" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/packages"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminWorkspacePage section="packages" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/subjects"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminWorkspacePage section="subjects" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminWorkspacePage section="bookings" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/schedules"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminWorkspacePage section="schedules" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminWorkspacePage section="reports" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminWorkspacePage section="settings" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute roles={['admin']}>
            <ProfilePage />
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
      <Route path="/teacher/requests" element={<ProtectedRoute roles={['teacher']}><RoleWorkspacePage role="teacher" section="requests" /></ProtectedRoute>} />
      <Route path="/teacher/schedule" element={<ProtectedRoute roles={['teacher']}><RoleWorkspacePage role="teacher" section="schedule" /></ProtectedRoute>} />
      <Route path="/teacher/profile" element={<ProtectedRoute roles={['teacher']}><ProfilePage /></ProtectedRoute>} />
      <Route
        path="/student"
        element={
          <ProtectedRoute roles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/student/requests" element={<ProtectedRoute roles={['student']}><RoleWorkspacePage role="student" section="requests" /></ProtectedRoute>} />
      <Route path="/student/teachers" element={<ProtectedRoute roles={['student']}><RoleWorkspacePage role="student" section="teachers" /></ProtectedRoute>} />
      <Route path="/student/schedule" element={<ProtectedRoute roles={['student']}><RoleWorkspacePage role="student" section="schedule" /></ProtectedRoute>} />
      <Route path="/student/profile" element={<ProtectedRoute roles={['student']}><ProfilePage /></ProtectedRoute>} />
      <Route
        path="/parent"
        element={
          <ProtectedRoute roles={['parent']}>
            <ParentDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/parent/children" element={<ProtectedRoute roles={['parent']}><RoleWorkspacePage role="parent" section="children" /></ProtectedRoute>} />
      <Route path="/parent/requests" element={<ProtectedRoute roles={['parent']}><RoleWorkspacePage role="parent" section="requests" /></ProtectedRoute>} />
      <Route path="/parent/schedule" element={<ProtectedRoute roles={['parent']}><RoleWorkspacePage role="parent" section="schedule" /></ProtectedRoute>} />
      <Route path="/parent/profile" element={<ProtectedRoute roles={['parent']}><ProfilePage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
