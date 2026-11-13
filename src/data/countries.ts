export type Country = {
  name: string
  iso: string
  dialCode: string
  flag: string
  minLength: number
  maxLength: number
}

export const COUNTRIES: Country[] = [
  { name: 'Kuwait', iso: 'KW', dialCode: '+965', flag: '🇰🇼', minLength: 8, maxLength: 8 },
  { name: 'Saudi Arabia', iso: 'SA', dialCode: '+966', flag: '🇸🇦', minLength: 9, maxLength: 9 },
  { name: 'United Arab Emirates', iso: 'AE', dialCode: '+971', flag: '🇦🇪', minLength: 9, maxLength: 9 },
  { name: 'Qatar', iso: 'QA', dialCode: '+974', flag: '🇶🇦', minLength: 8, maxLength: 8 },
  { name: 'Bahrain', iso: 'BH', dialCode: '+973', flag: '🇧🇭', minLength: 8, maxLength: 8 },
  { name: 'Oman', iso: 'OM', dialCode: '+968', flag: '🇴🇲', minLength: 8, maxLength: 8 },
  { name: 'Egypt', iso: 'EG', dialCode: '+20', flag: '🇪🇬', minLength: 10, maxLength: 11 },
  { name: 'Jordan', iso: 'JO', dialCode: '+962', flag: '🇯🇴', minLength: 9, maxLength: 9 },
  { name: 'Lebanon', iso: 'LB', dialCode: '+961', flag: '🇱🇧', minLength: 7, maxLength: 8 },
  { name: 'India', iso: 'IN', dialCode: '+91', flag: '🇮🇳', minLength: 10, maxLength: 10 },
  { name: 'United Kingdom', iso: 'GB', dialCode: '+44', flag: '🇬🇧', minLength: 10, maxLength: 10 },
  { name: 'United States', iso: 'US', dialCode: '+1', flag: '🇺🇸', minLength: 10, maxLength: 10 },
  { name: 'Canada', iso: 'CA', dialCode: '+1', flag: '🇨🇦', minLength: 10, maxLength: 10 },
  { name: 'France', iso: 'FR', dialCode: '+33', flag: '🇫🇷', minLength: 9, maxLength: 9 },
  { name: 'Germany', iso: 'DE', dialCode: '+49', flag: '🇩🇪', minLength: 10, maxLength: 11 },
  { name: 'Turkey', iso: 'TR', dialCode: '+90', flag: '🇹🇷', minLength: 10, maxLength: 10 },
  { name: 'Pakistan', iso: 'PK', dialCode: '+92', flag: '🇵🇰', minLength: 10, maxLength: 10 },
  { name: 'Philippines', iso: 'PH', dialCode: '+63', flag: '🇵🇭', minLength: 10, maxLength: 10 },
]

export const DEFAULT_COUNTRY = COUNTRIES[0]
