import type { InputHTMLAttributes, ReactNode } from 'react'
import { useLanguage } from '../../context/useLanguage'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  hint?: string
  trailing?: ReactNode
}

export function Input({ label, error, hint, trailing, id, className = '', placeholder, ...props }: InputProps) {
  const { t } = useLanguage()
  const inputId = id ?? props.name

  return (
    <label className="block space-y-1.5" htmlFor={inputId}>
      <span className="text-sm font-medium text-ink">{t(label)}</span>
      <span className="relative block">
        <input
          id={inputId}
          placeholder={placeholder ? t(placeholder) : undefined}
          className={`w-full rounded-2xl border bg-cream px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-lavender focus:ring-4 focus:ring-lavender/15 ${error ? 'border-danger' : 'border-line'} ${trailing ? 'pe-12' : ''} ${className}`}
          {...props}
        />
        {trailing && (
          <span className="absolute inset-y-0 end-3 flex items-center text-muted">{trailing}</span>
        )}
      </span>
      {error ? (
        <span className="block text-xs text-danger">{t(error)}</span>
      ) : hint ? (
        <span className="block text-xs text-muted">{t(hint)}</span>
      ) : null}
    </label>
  )
}
