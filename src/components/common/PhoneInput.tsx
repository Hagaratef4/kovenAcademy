import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { COUNTRIES, type Country } from '../../data/countries'
import { digitsOnly } from '../../lib/phone'

type PhoneInputProps = {
  country: Country
  nationalNumber: string
  onCountryChange: (country: Country) => void
  onNumberChange: (value: string) => void
  error?: string
}

export function PhoneInput({
  country,
  nationalNumber,
  onCountryChange,
  onNumberChange,
  error,
}: PhoneInputProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return COUNTRIES
    return COUNTRIES.filter(
      (item) =>
        item.name.toLowerCase().includes(needle) ||
        item.dialCode.includes(needle) ||
        item.iso.toLowerCase().includes(needle),
    )
  }, [query])

  return (
    <div className="space-y-1.5">
      <span className="text-sm font-medium text-ink">Phone number</span>
      <div className={`flex rounded-2xl border bg-cream ${error ? 'border-danger' : 'border-line'}`}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="flex h-full min-w-[7.5rem] items-center gap-2 rounded-l-2xl border-r border-line px-3 text-sm font-medium text-ink transition hover:bg-beige"
            aria-label="Select country code"
          >
            <span aria-hidden="true">{country.flag}</span>
            <span>{country.dialCode}</span>
            <ChevronDown className="h-4 w-4 text-muted" />
          </button>
          {open && (
            <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-72 overflow-hidden rounded-2xl border border-line bg-cream shadow-[var(--shadow-card)]">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search country"
                className="w-full border-b border-line bg-transparent px-3 py-2.5 text-sm outline-none"
              />
              <ul className="max-h-56 overflow-y-auto py-1">
                {filtered.map((item) => (
                  <li key={`${item.iso}-${item.dialCode}`}>
                    <button
                      type="button"
                      onClick={() => {
                        onCountryChange(item)
                        setOpen(false)
                        setQuery('')
                      }}
                      className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-beige"
                    >
                      <span>
                        {item.flag} {item.name}
                      </span>
                      <span className="text-muted">{item.dialCode}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={nationalNumber}
          maxLength={country.maxLength}
          placeholder={country.iso === 'KW' ? '5XXXXXXX' : 'National number'}
          onChange={(event) => onNumberChange(digitsOnly(event.target.value))}
          className="w-full rounded-r-2xl bg-transparent px-4 py-3 text-sm outline-none"
        />
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}
