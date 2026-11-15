import { useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, CircleUserRound, ShieldCheck } from 'lucide-react'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { useAuth } from '../../context/useAuth'
import { useLanguage } from '../../context/useLanguage'
import type { UserRole } from '../../types/auth'

const roleProfile: Record<UserRole, { title: string; detailTitle: string; fields: string[]; detailNote?: string }> = {
  admin: {
    title: 'Administrator profile',
    detailTitle: 'Administrator access',
    fields: ['Email address', 'Password and security settings'],
    detailNote: 'Administrator email and password settings are not stored in the current prototype account model.',
  },
  teacher: {
    title: 'Teacher profile',
    detailTitle: 'Professional teaching profile',
    fields: [
      'Professional biography',
      'Qualifications and education',
      'Teaching experience',
      'Subjects taught',
      'Grades and educational levels',
      'Teaching preferences',
      'Online or in-person teaching',
      'Location and service area',
      'Availability',
      'Hourly rate',
      'Verification status and documents',
    ],
  },
  student: {
    title: 'Student profile',
    detailTitle: 'Learning profile',
    fields: [
      'Educational grade or level',
      'School information',
      'Subjects needing support',
      'Learning goals',
      'Preferred learning method',
      'Educational preferences',
    ],
  },
  parent: {
    title: 'Parent profile',
    detailTitle: 'Family account',
    fields: [
      'Linked child profiles',
      'Manage multiple children',
      'Children’s requests and schedules',
    ],
  },
}

function getInitials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}

export function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { language, t } = useLanguage()
  const [fullName, setFullName] = useState(user?.fullName ?? '')
  const [city, setCity] = useState(user?.city ?? '')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  if (!user) return null

  const profile = roleProfile[user.role]
  const registrationDate = new Intl.DateTimeFormat(language === 'ar' ? 'ar-KW' : 'en-KW', {
    dateStyle: 'medium',
  }).format(new Date(user.createdAt))

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setSaved(false)
    setSaving(true)
    try {
      const updated = await updateProfile({ fullName, city })
      setFullName(updated.fullName)
      setCity(updated.city)
      setSaved(true)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save profile changes.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t(profile.title)}</p>
        <h1 className="mt-1 font-display text-4xl text-deep">{t('Your profile')}</h1>
        <p className="mt-2 text-sm text-muted">{t('Manage your account details and review profile information for your role.')}</p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-3xl border border-line bg-cream p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-deep font-display text-2xl font-semibold text-gold">
              {getInitials(user.fullName) || <CircleUserRound className="h-7 w-7" />}
            </div>
            <div className="min-w-0">
              <h2 className="truncate font-semibold text-deep">{user.fullName}</h2>
              <p className="mt-1 text-sm capitalize text-muted">{t(user.role)}</p>
            </div>
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-gold/35 bg-beige/70 p-4 text-sm leading-6 text-ink">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>{t('Profile changes are saved in this browser’s prototype account store only. There is no backend connected.')}</p>
          </div>
          <div className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted">{t('Phone verification')}</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-success">
                <ShieldCheck className="h-4 w-4" />
                {t(user.phoneVerified ? 'Verified' : 'Not verified')}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted">{t('Member since')}</span>
              <span className="text-end text-ink">{registrationDate}</span>
            </div>
          </div>
          <p className="mt-4 border-t border-line pt-4 text-xs leading-5 text-muted">{t('Profile photo upload requires a connected storage service and is not available yet.')}</p>
        </section>

        <section className="rounded-3xl border border-line bg-cream p-6 shadow-[var(--shadow-soft)]">
          <h2 className="font-display text-2xl text-deep">{t('Account information')}</h2>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Full name"
              name="profileFullName"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value)
                setSaved(false)
              }}
              required
              minLength={2}
              autoComplete="name"
            />
            <Input
              label="Phone number"
              name="profilePhone"
              value={user.phone}
              readOnly
              dir="ltr"
              hint="Phone changes require WhatsApp re-verification and are not editable in this prototype."
            />
            <Input
              label="City"
              name="profileCity"
              value={city}
              onChange={(event) => {
                setCity(event.target.value)
                setSaved(false)
              }}
              required
              autoComplete="address-level2"
            />
            {error && <p role="alert" className="text-sm text-danger">{t(error)}</p>}
            {saved && (
              <p role="status" className="flex items-center gap-2 text-sm font-medium text-success">
                <CheckCircle2 className="h-4 w-4" />
                {t('Your profile was updated in this browser.')}
              </p>
            )}
            <Button type="submit" loading={saving}>
              Save changes
            </Button>
          </form>
        </section>
      </div>

      <section className="rounded-3xl border border-line bg-cream p-6 shadow-[var(--shadow-soft)]">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"><CircleUserRound className="h-5 w-5" /></span>
          <div>
            <h2 className="font-display text-2xl text-deep">{t(profile.detailTitle)}</h2>
            <p className="mt-1 text-sm leading-6 text-muted">{t(profile.detailNote ?? 'These details are not part of the current account model. They will remain unavailable until a backend profile service is connected.')}</p>
          </div>
        </div>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {profile.fields.map((field) => (
            <li key={field} className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm">
              <span className="block font-medium text-ink">{t(field)}</span>
              <span className="mt-1 block text-xs text-muted">{t('Not connected')}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
