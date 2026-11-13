import { Link } from 'react-router-dom'
import { Button } from '../../components/common/Button'
import { AuthLayout } from '../../layouts/AuthLayout'

export function ForgotPassword() {
  return (
    <AuthLayout
      title="Reset through WhatsApp."
      subtitle="Password resets will be delivered to the WhatsApp number on your account — not email."
    >
      <section className="rounded-[2rem] border border-line bg-cream p-6 shadow-[var(--shadow-card)] sm:p-8">
        <h2 className="font-display text-4xl text-deep">Forgot password</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          This prototype does not send WhatsApp messages yet. When the WhatsApp Business API is connected, reset
          codes will arrive on your registered number.
        </p>
        <Link to="/login">
          <Button className="mt-6" fullWidth>
            Return to login
          </Button>
        </Link>
      </section>
    </AuthLayout>
  )
}
