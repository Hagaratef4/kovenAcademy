import { useAuth } from '../../context/AuthContext'

export function TeacherDashboard() {
  const { user } = useAuth()

  return (
    <section className="rounded-[2rem] border border-line bg-cream p-8 shadow-[var(--shadow-soft)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Teacher studio</p>
      <h1 className="mt-2 font-display text-4xl text-deep">Welcome, {user?.fullName.split(' ')[0]}.</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Your teaching dashboard will live here — incoming student requests, schedule, and packages. This first
        release focuses on authentication and the admin control panel.
      </p>
    </section>
  )
}
