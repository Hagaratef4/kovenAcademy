import { createId, hashSecret } from '../lib/crypto'
import type {
  PendingVerification,
  PublicRole,
  RegisterPayload,
  User,
} from '../types/auth'
import { PROTOTYPE_OTP_CODE, whatsappOtpProvider, type OtpChallenge } from './otpService'

type StoredUser = User & {
  passwordHash: string
}

const USERS_KEY = 'koven.users'
const SESSION_KEY = 'koven.session'
const PENDING_KEY = 'koven.pending'
const OTP_KEY = 'koven.otp'

const DEMO_PASSWORD = 'KovenDemo!26'

const seedAdmins = [
  { fullName: 'Lina Al-Sabah', phone: '+96550000001', city: 'Kuwait City' },
  { fullName: 'Omar Al-Mutairi', phone: '+96550000002', city: 'Hawalli' },
  { fullName: 'Noor Hassan', phone: '+96550000003', city: 'Salmiya' },
] as const

function readUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY)
  return raw ? (JSON.parse(raw) as StoredUser[]) : []
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function toPublicUser(user: StoredUser): User {
  const { passwordHash: _passwordHash, ...publicUser } = user
  void _passwordHash
  return publicUser
}

async function ensureSeedAdmins() {
  const users = readUsers()
  if (users.some((user) => user.role === 'admin')) return

  const passwordHash = await hashSecret(DEMO_PASSWORD)
  const seeded: StoredUser[] = seedAdmins.map((admin, index) => ({
    id: `admin_seed_${index + 1}`,
    fullName: admin.fullName,
    phone: admin.phone,
    city: admin.city,
    role: 'admin',
    createdAt: new Date().toISOString(),
    phoneVerified: true,
    passwordHash,
  }))

  writeUsers([...seeded, ...users])
}

export async function initializeAuthStore() {
  await ensureSeedAdmins()
}

export function getStoredSession(): User | null {
  const rememberRaw = localStorage.getItem(SESSION_KEY)
  const sessionRaw = sessionStorage.getItem(SESSION_KEY)
  const raw = rememberRaw ?? sessionRaw
  return raw ? (JSON.parse(raw) as User) : null
}

export function persistSession(user: User, remember: boolean) {
  const payload = JSON.stringify(user)
  sessionStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(SESSION_KEY)
  if (remember) localStorage.setItem(SESSION_KEY, payload)
  else sessionStorage.setItem(SESSION_KEY, payload)
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_KEY)
}

export async function loginWithPhone(phone: string, password: string) {
  await ensureSeedAdmins()
  const users = readUsers()
  const user = users.find((entry) => entry.phone === phone)
  if (!user) {
    throw new Error('No account was found for this phone number.')
  }

  const passwordHash = await hashSecret(password)
  if (passwordHash !== user.passwordHash) {
    throw new Error('Incorrect password. Please try again.')
  }

  if (!user.phoneVerified) {
    throw new Error('This account still needs WhatsApp verification.')
  }

  return toPublicUser(user)
}

function savePending(pending: PendingVerification, challenge: OtpChallenge) {
  sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending))
  sessionStorage.setItem(OTP_KEY, JSON.stringify(challenge))
}

export function getPendingVerification(): PendingVerification | null {
  const raw = sessionStorage.getItem(PENDING_KEY)
  return raw ? (JSON.parse(raw) as PendingVerification) : null
}

export function getOtpChallenge(): OtpChallenge | null {
  const raw = sessionStorage.getItem(OTP_KEY)
  return raw ? (JSON.parse(raw) as OtpChallenge) : null
}

export async function startRegistration(payload: RegisterPayload) {
  await ensureSeedAdmins()
  const users = readUsers()
  if (users.some((user) => user.phone === payload.phone)) {
    throw new Error('An account already exists for this phone number.')
  }

  const pending: PendingVerification = {
    id: createId('pending'),
    payload,
    createdAt: new Date().toISOString(),
  }
  const challenge = await whatsappOtpProvider.sendVerificationCode(payload.phone)
  savePending(pending, challenge)
  return { pending, challenge }
}

export async function resendPendingOtp() {
  const pending = getPendingVerification()
  if (!pending) throw new Error('No registration is waiting for verification.')
  const challenge = await whatsappOtpProvider.sendVerificationCode(pending.payload.phone)
  sessionStorage.setItem(OTP_KEY, JSON.stringify(challenge))
  return challenge
}

export async function updatePendingPhone(phone: string) {
  const pending = getPendingVerification()
  if (!pending) throw new Error('No registration is waiting for verification.')

  const users = readUsers()
  if (users.some((user) => user.phone === phone)) {
    throw new Error('An account already exists for this phone number.')
  }

  const nextPending: PendingVerification = {
    ...pending,
    payload: { ...pending.payload, phone },
  }
  const challenge = await whatsappOtpProvider.sendVerificationCode(phone)
  savePending(nextPending, challenge)
  return { pending: nextPending, challenge }
}

export async function completeRegistration(code: string) {
  const pending = getPendingVerification()
  const challenge = getOtpChallenge()
  if (!pending || !challenge) {
    throw new Error('Verification session expired. Please register again.')
  }

  const isValid = await whatsappOtpProvider.verifyCode(challenge, code)
  if (!isValid) {
    throw new Error('That code is incorrect or expired.')
  }

  const passwordHash = await hashSecret(pending.payload.password)
  const stored: StoredUser = {
    id: createId(pending.payload.role),
    fullName: pending.payload.fullName.trim(),
    phone: pending.payload.phone,
    city: pending.payload.city.trim(),
    role: pending.payload.role,
    createdAt: new Date().toISOString(),
    phoneVerified: true,
    passwordHash,
  }

  writeUsers([...readUsers(), stored])
  sessionStorage.removeItem(PENDING_KEY)
  sessionStorage.removeItem(OTP_KEY)
  return toPublicUser(stored)
}

export function getDashboardPath(role: User['role'] | PublicRole) {
  if (role === 'admin') return '/admin'
  if (role === 'teacher') return '/teacher'
  if (role === 'parent') return '/parent'
  return '/student'
}

export const DEMO_ADMIN_HINT = {
  phone: '+965 5000 0001',
  password: DEMO_PASSWORD,
  otp: PROTOTYPE_OTP_CODE,
}
