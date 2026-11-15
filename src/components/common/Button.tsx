import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useLanguage } from '../../context/useLanguage'

type ButtonVariant = 'gold' | 'purple' | 'ghost' | 'outline'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  loading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
}

const variants: Record<ButtonVariant, string> = {
  gold:
    'bg-gold text-deep hover:bg-gold-soft shadow-[0_12px_24px_-14px_rgba(214,179,106,0.9)]',
  purple:
    'bg-primary text-cream hover:bg-deep shadow-[0_12px_24px_-14px_rgba(89,36,119,0.9)]',
  ghost: 'bg-transparent text-deep hover:bg-beige',
  outline: 'bg-cream text-deep border border-line hover:border-lavender hover:text-primary',
}

export function Button({
  variant = 'gold',
  loading = false,
  icon,
  fullWidth,
  className = '',
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const { t } = useLanguage()
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold tracking-wide transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : icon}
      {typeof children === 'string' ? t(children) : children}
    </button>
  )
}
