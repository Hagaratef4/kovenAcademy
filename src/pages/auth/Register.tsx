import { BookOpen, GraduationCap, Users } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { PasswordInput } from '../../components/common/PasswordInput'
import { PhoneInput } from '../../components/common/PhoneInput'
import { useAuth } from '../../context/useAuth'
import { DEFAULT_COUNTRY, type Country } from '../../data/countries'
import { toE164, validateNationalNumber } from '../../lib/phone'
import { AuthLayout } from '../../layouts/AuthLayout'
import { useLanguage } from '../../context/useLanguage'
import type { PublicRole } from '../../types/auth'

const roles: Array<{
  id: PublicRole
  title: string
  description: string
  icon: typeof GraduationCap
}> = [
  {
    id: 'student',
    title: 'Join as a Student',
    description: 'Find your teacher and next favorite subject.',
    icon: GraduationCap,
  },
  {
    id: 'teacher',
    title: 'Join as a Teacher',
    description: 'Meet learners and grow your teaching practice.',
    icon: BookOpen,
  },
  {
    id: 'parent',
    title: 'Join as a Parent',
    description: 'Support your child’s learning journey.',
    icon: Users,
  },
]

type FormState = {
  fullName: string
  city: string
  password: string
  confirmPassword: string
}

const emptyForm: FormState = {
  fullName: '',
  city: '',
  password: '',
  confirmPassword: '',
}

export function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { t } = useLanguage()
  const [step, setStep] = useState<'role' | 'form'>('role')
  const [role, setRole] = useState<PublicRole | null>(null)
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY)
  const [nationalNumber, setNationalNumber] = useState('')
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)

  function continueWithRole() {
    if (!role) {
      setErrors({ role: 'Select how you would like to join Koven.' })
      return
    }
    setErrors({})
    setStep('form')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!role) return

    const nextErrors: Record<string, string> = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Enter your full name.'
    if (!form.city.trim()) nextErrors.city = 'Enter your city.'
    const phoneError = validateNationalNumber(country, nationalNumber)
    if (phoneError) nextErrors.phone = phoneError
    if (form.password.length < 8) nextErrors.password = 'Use at least 8 characters.'
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    setSubmitError('')
    try {
      await register({
        fullName: form.fullName,
        city: form.city,
        password: form.password,
        phone: toE164(country, nationalNumber),
        role,
      })
      navigate('/verify-otp')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to start registration.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Start something good"
      title="A little progress goes a long way."
      subtitle="A trusted circle of learners, families, and educators — all growing together with Koven."
    >
      {step === 'role' ? (
        <div>
          <h2 className="font-display text-[2.2rem] leading-none text-deep">{t('Create your account')}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{t('First, tell us how you’d like to be part of Koven.')}</p>
          <div className="mt-5 grid gap-2.5">
            {roles.map((item) => {
              const Icon = item.icon
              const selected = role === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRole(item.id)}
                  aria-pressed={selected}
                  className={`rounded-3xl border p-5 text-start transition ${
                    selected
                      ? 'border-gold bg-beige/80 shadow-[var(--shadow-soft)] ring-2 ring-gold/20'
                      : 'border-line bg-white/60 hover:-translate-y-0.5 hover:border-lavender/60 hover:bg-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition ${selected ? 'bg-gold text-deep' : 'bg-primary/10 text-primary'}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-deep">{t(item.title)}</span>
                      <span className="mt-0.5 block text-xs leading-5 text-muted">{t(item.description)}</span>
                    </span>
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${selected ? 'border-deep bg-deep text-gold' : 'border-line bg-cream'}`}>
                      {selected && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
          {errors.role && <p className="mt-3 text-sm text-danger">{t(errors.role)}</p>}
          <Button className="mt-4" fullWidth onClick={continueWithRole}>
            Continue
          </Button>
          <p className="mt-4 text-center text-sm text-muted">
            {t('Already have an account?')}{' '}
            <Link to="/login" className="font-semibold text-primary hover:text-deep">
              {t('Log in')}
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setStep('role')}
            className="text-sm font-medium text-primary hover:text-deep"
          >
            <span className="inline-block rtl:rotate-180">←</span> {t('Change role')}
          </button>
          <h2 className="mt-3 font-display text-[2.2rem] leading-none text-deep">{t('Your details')}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {t('Joining as {role}. We’ll verify your WhatsApp number next.', { role: role ? t(role) : '' })}
          </p>
          <form className="mt-5 space-y-3.5" onSubmit={handleSubmit}>
            <Input
              label="Full name"
              name="fullName"
              value={form.fullName}
              error={errors.fullName}
              placeholder="Your name"
              onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
            />
            <PhoneInput
              country={country}
              nationalNumber={nationalNumber}
              onCountryChange={setCountry}
              onNumberChange={setNationalNumber}
              error={errors.phone}
            />
            <Input
              label="City"
              name="city"
              value={form.city}
              error={errors.city}
              placeholder="Kuwait City"
              onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
            />
            <PasswordInput
              label="Password"
              name="password"
              value={form.password}
              error={errors.password}
              autoComplete="new-password"
              onChange={(value) => setForm((current) => ({ ...current, password: value }))}
            />
            <PasswordInput
              label="Confirm password"
              name="confirmPassword"
              value={form.confirmPassword}
              error={errors.confirmPassword}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              onChange={(value) => setForm((current) => ({ ...current, confirmPassword: value }))}
            />
            {submitError && <p className="text-sm text-danger">{t(submitError)}</p>}
            <Button type="submit" fullWidth loading={loading}>
              Continue to WhatsApp verification
            </Button>
          </form>
        </div>
      )}
    </AuthLayout>
  )
}
