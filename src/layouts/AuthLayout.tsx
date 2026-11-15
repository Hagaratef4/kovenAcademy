import type { ReactNode } from 'react'
import { BookOpen, GraduationCap, Sparkles, Users } from 'lucide-react'
import { Logo } from '../components/common/Logo'
import { LanguageSwitcher } from '../components/common/LanguageSwitcher'
import { useLanguage } from '../context/useLanguage'

type AuthLayoutProps = {
  children: ReactNode
  eyebrow?: string
  title: string
  subtitle: string
}

export function AuthLayout({ children, eyebrow = 'A place to grow', title, subtitle }: AuthLayoutProps) {
  const { t } = useLanguage()
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-canvas px-4 py-8 sm:px-6 sm:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-12 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-lavender/10 blur-3xl" />

      <div className="relative grid w-full max-w-[970px] overflow-hidden rounded-[2rem] border border-white/80 bg-cream shadow-[0_35px_100px_-50px_rgba(66,20,95,0.46)] md:min-h-[590px] md:grid-cols-[0.82fr_1.18fr]">
        <aside className="relative isolate flex min-h-[185px] flex-col justify-between overflow-hidden koven-panel px-6 py-5 text-cream sm:min-h-[215px] sm:px-8 md:min-h-full md:px-9 md:py-8">
          <div aria-hidden="true" className="absolute inset-0 -z-10 koven-grid opacity-60" />
          <div aria-hidden="true" className="absolute -right-14 -top-20 -z-10 h-56 w-56 rounded-full border border-gold/20" />
          <div aria-hidden="true" className="absolute -right-4 -top-10 -z-10 h-36 w-36 rounded-full border border-white/10" />

          <div dir="ltr" className="w-fit"><Logo to={null} inverted showSlogan /></div>

          <div className="relative mt-8 max-w-sm md:mt-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold sm:text-xs">{t(eyebrow)}</p>
            <h1 className="mt-2 font-display text-3xl font-semibold leading-[1.03] sm:text-4xl md:mt-3 md:text-[2.65rem]">{t(title)}</h1>
            <p className="mt-3 hidden max-w-xs text-sm leading-6 text-cream/75 md:block">{t(subtitle)}</p>
          </div>

          <div aria-hidden="true" className="absolute bottom-5 right-5 hidden md:block">
            <div className="relative h-36 w-36">
              <div className="absolute inset-2 rounded-[2rem] border border-gold/40 rotate-12" />
              <div className="absolute inset-5 grid place-items-center rounded-[1.6rem] border border-white/15 bg-white/8 backdrop-blur-sm">
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gold text-deep shadow-xl shadow-black/15">
                  <BookOpen className="h-8 w-8" strokeWidth={1.6} />
                </div>
              </div>
              <span className="absolute -left-1 top-3 grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/10 text-gold backdrop-blur"><GraduationCap className="h-4 w-4" /></span>
              <span className="absolute -bottom-1 right-0 grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/10 text-gold backdrop-blur"><Users className="h-5 w-5" /></span>
              <Sparkles className="absolute -right-3 top-0 h-5 w-5 text-gold" />
            </div>
          </div>

          <p className="relative mt-5 hidden text-xs tracking-wide text-cream/55 md:block">{t('Connect • Support • Grow')}</p>
        </aside>

        <section className="flex items-center justify-center px-5 py-7 sm:px-9 sm:py-9 md:px-10 md:py-10">
          <div className="w-full max-w-[420px]">
            <div className="mb-6 flex items-center justify-between gap-3">
              <Logo to={null} compact />
              <span className="hidden rounded-full border border-gold/40 bg-beige/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-deep sm:inline-flex">{t('A brighter way to learn')}</span>
              <LanguageSwitcher compact />
            </div>
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}
