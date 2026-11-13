import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from './Input'

type PasswordInputProps = {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  error?: string
  autoComplete?: string
  placeholder?: string
}

export function PasswordInput({
  label,
  name,
  value,
  onChange,
  error,
  autoComplete = 'current-password',
  placeholder = 'Enter your password',
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <Input
      label={label}
      name={name}
      type={visible ? 'text' : 'password'}
      value={value}
      autoComplete={autoComplete}
      placeholder={placeholder}
      error={error}
      onChange={(event) => onChange(event.target.value)}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="rounded-lg p-1 text-muted transition hover:text-primary"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  )
}
