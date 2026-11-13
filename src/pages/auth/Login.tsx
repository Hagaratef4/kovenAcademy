import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/common/Button'
import { PasswordInput } from '../../components/common/PasswordInput'
import { PhoneInput } from '../../components/common/PhoneInput'
import { useAuth } from '../../context/AuthContext'
import { DEFAULT_COUNTRY, type Country } from '../../data/countries'
import { AuthLayout } from '../../layouts/AuthLayout'
import { toE164, validateNationalNumber } from '../../lib/phone'
import { getDashboardPath } from '../../services/authService'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY)
  const [nationalNumber, setNationalNumber] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    const phoneError = validateNationalNumber(country, nationalNumber)
    if (phoneError) nextErrors.phone = phoneError
    if (!password) nextErrors.password = 'Enter your password.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    setSubmitError('')
    try {
      const user = await login(toE164(country, nationalNumber), password, remember)
      navigate(getDashboardPath(user.role), { replace: true })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to log in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Your learning circle"
      title="Good to have you back."
      subtitle="Pick up where you left off. Your teachers, learners, and next milestones are just around the corner."
    >
      <div>
        <h2 className="font-display text-[2.35rem] leading-none text-deep">Welcome back</h2>
        <p className="mt-2 text-sm leading-6 text-muted">Sign in with the phone number connected to your Koven account.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <PhoneInput
            country={country}
            nationalNumber={nationalNumber}
            onCountryChange={setCountry}
            onNumberChange={setNationalNumber}
            error={errors.phone}
          />
          <PasswordInput label="Password" name="password" value={password} error={errors.password} onChange={setPassword} />
          <div className="flex items-center justify-between gap-3 text-xs">
            <label className="flex items-center gap-2 text-muted">
              <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-4 w-4 rounded border-line accent-gold" />
              Remember me
            </label>
            <Link to="/forgot-password" className="font-medium text-primary transition hover:text-deep">Forgot password?</Link>
          </div>
          {submitError && <p className="text-sm text-danger">{submitError}</p>}
          <Button type="submit" fullWidth loading={loading} className="mt-1">
            Continue
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted">
          New to Koven?{' '}
          <Link to="/register" className="font-semibold text-primary transition hover:text-deep">Create an account</Link>
        </p>
        <p className="mt-5 border-t border-line pt-4 text-center text-[11px] leading-5 text-muted">
          By continuing, you agree to Koven’s <span className="font-medium text-deep">Terms</span> and <span className="font-medium text-deep">Privacy Policy</span>.
        </p>
      </div>
    </AuthLayout>
  )
}
