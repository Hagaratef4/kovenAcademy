type AdminPlaceholderProps = {
  title: string
  description: string
}

export function AdminPlaceholder({ title, description }: AdminPlaceholderProps) {
  return (
    <section className="rounded-[2rem] border border-line bg-cream p-8 shadow-[var(--shadow-soft)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Coming next</p>
      <h1 className="mt-2 font-display text-4xl text-deep">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{description}</p>
    </section>
  )
}
