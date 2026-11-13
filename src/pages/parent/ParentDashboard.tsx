import { useAuth } from '../../context/AuthContext'

export function ParentDashboard() {
  const { user } = useAuth()

  return (
    <section className="rounded-[2rem] border border-line bg-cream p-8 shadow-[var(--shadow-soft)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Family hub</p>
      <h1 className="mt-2 font-display text-4xl text-deep">Welcome, {user?.fullName.split(' ')[0]}.</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Parents will manage children’s learning journeys from this space. For now, authentication and role
        routing are in place.
      </p>
    </section>
  )
}
