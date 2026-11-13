import { COUNTRIES, DEFAULT_COUNTRY, type Country } from '../data/countries'

export function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

export function findCountryByDialCode(dialCode: string) {
  return COUNTRIES.find((country) => country.dialCode === dialCode) ?? DEFAULT_COUNTRY
}

export function toE164(country: Country, nationalNumber: string) {
  return `${country.dialCode}${digitsOnly(nationalNumber)}`
}

export function parseE164(phone: string) {
  const match = COUNTRIES.find((country) => phone.startsWith(country.dialCode))
  const country = match ?? DEFAULT_COUNTRY
  return {
    country,
    nationalNumber: phone.slice(country.dialCode.length),
  }
}

export function validateNationalNumber(country: Country, nationalNumber: string) {
  const digits = digitsOnly(nationalNumber)

  if (!digits) {
    return 'Enter a phone number.'
  }

  if (digits.length < country.minLength || digits.length > country.maxLength) {
    const expected =
      country.minLength === country.maxLength
        ? `${country.minLength} digits`
        : `${country.minLength}–${country.maxLength} digits`
    return `${country.name} numbers should be ${expected}.`
  }

  return null
}

export function formatPhoneDisplay(phone: string) {
  const { country, nationalNumber } = parseE164(phone)
  return `${country.dialCode} ${nationalNumber}`
}
