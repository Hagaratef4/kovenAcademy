import { useAuth } from '../../context/AuthContext'

export function StudentDashboard() {
  const { user } = useAuth()

  return (
    <section className="rounded-[2rem] border border-line bg-cream p-8 shadow-[var(--shadow-soft)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Student space</p>
      <h1 className="mt-2 font-display text-4xl text-deep">Welcome, {user?.fullName.split(' ')[0]}.</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Soon you’ll request teachers, browse packages, and track sessions here. Your account is ready and tied to
        the student role.
      </p>
    </section>
  )
}
