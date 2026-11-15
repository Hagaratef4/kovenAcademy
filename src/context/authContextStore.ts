import { createContext } from 'react'
import type { OtpChallenge } from '../services/otpService'
import type { PendingVerification, RegisterPayload, User } from '../types/auth'

export type AuthContextValue = {
  user: User | null
  isReady: boolean
  pending: PendingVerification | null
  otpChallenge: OtpChallenge | null
  login: (phone: string, password: string, remember: boolean) => Promise<User>
  logout: () => void
  register: (payload: RegisterPayload) => Promise<void>
  verifyOtp: (code: string) => Promise<User>
  resendOtp: () => Promise<void>
  editPendingPhone: (phone: string) => Promise<void>
  updateProfile: (fields: Pick<User, 'fullName' | 'city'>) => Promise<User>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
