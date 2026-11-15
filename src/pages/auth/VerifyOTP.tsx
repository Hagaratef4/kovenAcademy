import { MessageCircle } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../../components/common/Button'
import { PhoneInput } from '../../components/common/PhoneInput'
import { useAuth } from '../../context/useAuth'
import { DEFAULT_COUNTRY } from '../../data/countries'
import { parseE164, toE164, validateNationalNumber } from '../../lib/phone'
import { AuthLayout } from '../../layouts/AuthLayout'
import { getDashboardPath } from '../../services/authService'
import { useLanguage } from '../../context/useLanguage'

const RESEND_SECONDS = 45

export function VerifyOTP() {
  const navigate = useNavigate()
  const { pending, otpChallenge, verifyOtp, resendOtp, editPendingPhone, isReady } = useAuth()
  const { t } = useLanguage()
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [seconds, setSeconds] = useState(RESEND_SECONDS)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [editingPhone, setEditingPhone] = useState(false)
  const pendingPhone = useMemo(() => pending ? parseE164(pending.payload.phone) : null, [pending])
  const [phoneDraft, setPhoneDraft] = useState<ReturnType<typeof parseE164> | null>(null)
  const country = phoneDraft?.country ?? pendingPhone?.country ?? DEFAULT_COUNTRY
  const nationalNumber = phoneDraft?.nationalNumber ?? pendingPhone?.nationalNumber ?? ''
  const inputs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (seconds <= 0) return
    const timer = window.setTimeout(() => setSeconds((current) => current - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [seconds])

  if (!isReady) return null

  if (!pending) {
    return <Navigate to="/register" replace />
  }

  async function submitCode(code: string) {
    setLoading(true)
    setError('')
    try {
      const user = await verifyOtp(code)
      navigate(getDashboardPath(user.role), { replace: true })
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : 'Verification failed.')
      setDigits(['', '', '', '', '', ''])
      inputs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  function handleDigit(index: number, value: string) {
    const nextValue = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = nextValue
    setDigits(next)
    if (nextValue && index < 5) inputs.current[index + 1]?.focus()
    if (next.every((digit) => digit)) void submitCode(next.join(''))
  }

  function handleKeyDown(index: number, key: string) {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  async function handleResend() {
    if (seconds > 0) return
    try {
      await resendOtp()
      setDigits(['', '', '', '', '', ''])
      setSeconds(RESEND_SECONDS)
      setError('')
    } catch (resendError) {
      setError(resendError instanceof Error ? resendError.message : 'Unable to resend the code.')
    }
  }

  async function handlePhoneEdit(event: FormEvent) {
    event.preventDefault()
    const phoneError = validateNationalNumber(country, nationalNumber)
    if (phoneError) {
      setError(phoneError)
      return
    }
    try {
      await editPendingPhone(toE164(country, nationalNumber))
      setEditingPhone(false)
      setDigits(['', '', '', '', '', ''])
      setSeconds(RESEND_SECONDS)
      setError('')
    } catch (editError) {
      setError(editError instanceof Error ? editError.message : 'Unable to update phone number.')
    }
  }

  return (
    <AuthLayout
      title="Verify with WhatsApp."
      subtitle="Koven uses WhatsApp — never email — so families can confirm accounts on the number they already use."
    >
      <section className="rounded-[2rem] border border-line bg-cream p-6 shadow-[var(--shadow-card)] sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-beige px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          <MessageCircle className="h-3.5 w-3.5" />
          {t('WhatsApp verification')}
        </span>
        <h2 className="mt-4 font-display text-4xl text-deep">{t('Enter your code')}</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          {t('In production, a 6-digit code will be sent to WhatsApp at')}{' '}
          <span className="font-semibold text-ink">{pending.payload.phone}</span>.
        </p>
        <div className="mt-4 rounded-2xl border border-gold/40 bg-beige px-4 py-3 text-sm text-ink">
          {t('Prototype mode: no WhatsApp message was sent. Use demo code ')}
          <span className="font-semibold tracking-[0.18em]">{otpChallenge?.demoCode ?? '246810'}</span>{t(' to continue.')}
        </div>
        <form
          className="mt-6"
          onSubmit={(event) => {
            event.preventDefault()
            void submitCode(digits.join(''))
          }}
        >
          <div dir="ltr" className="flex justify-between gap-2">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(node) => {
                  inputs.current[index] = node
                }}
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(event) => handleDigit(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event.key)}
                className="h-14 w-11 rounded-2xl border border-line bg-canvas text-center font-display text-2xl text-deep outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20 sm:h-16 sm:w-14"
              />
            ))}
          </div>
          {error && <p className="mt-3 text-sm text-danger">{t(error)}</p>}
          <Button type="submit" className="mt-6" fullWidth loading={loading}>
            Verify and continue
          </Button>
        </form>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
          <button
            type="button"
            onClick={() => void handleResend()}
            disabled={seconds > 0}
            className="font-medium text-primary disabled:text-muted"
          >
            {seconds > 0 ? t('Resend code in 0:{seconds}', { seconds: String(seconds).padStart(2, '0') }) : t('Resend demo code')}
          </button>
          <button type="button" onClick={() => setEditingPhone((current) => !current)} className="font-medium text-deep">
            {t('Edit phone number')}
          </button>
        </div>
        {editingPhone && (
          <form className="mt-5 space-y-4" onSubmit={handlePhoneEdit}>
            <PhoneInput
              country={country}
              nationalNumber={nationalNumber}
              onCountryChange={(nextCountry) => setPhoneDraft({ country: nextCountry, nationalNumber })}
              onNumberChange={(nextNumber) => setPhoneDraft({ country, nationalNumber: nextNumber })}
            />
            <Button type="submit" variant="purple" fullWidth>
              Save number
            </Button>
          </form>
        )}
      </section>
    </AuthLayout>
  )
}
