import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearSession,
  completeRegistration,
  getOtpChallenge,
  getPendingVerification,
  getStoredSession,
  initializeAuthStore,
  loginWithPhone,
  persistSession,
  resendPendingOtp,
  startRegistration,
  updatePendingPhone,
} from '../services/authService'
import type { OtpChallenge } from '../services/otpService'
import type { PendingVerification, RegisterPayload, User } from '../types/auth'

type AuthContextValue = {
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
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [pending, setPending] = useState<PendingVerification | null>(null)
  const [otpChallenge, setOtpChallenge] = useState<OtpChallenge | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let active = true

    async function hydrate() {
      await initializeAuthStore()
      if (!active) return
      setUser(getStoredSession())
      setPending(getPendingVerification())
      setOtpChallenge(getOtpChallenge())
      setIsReady(true)
    }

    void hydrate()
    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (phone: string, password: string, remember: boolean) => {
    const nextUser = await loginWithPhone(phone, password)
    persistSession(nextUser, remember)
    setUser(nextUser)
    return nextUser
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const register = useCallback(async (payload: RegisterPayload) => {
    const result = await startRegistration(payload)
    setPending(result.pending)
    setOtpChallenge(result.challenge)
  }, [])

  const verifyOtp = useCallback(async (code: string) => {
    const nextUser = await completeRegistration(code)
    persistSession(nextUser, true)
    setUser(nextUser)
    setPending(null)
    setOtpChallenge(null)
    return nextUser
  }, [])

  const resendOtp = useCallback(async () => {
    const challenge = await resendPendingOtp()
    setOtpChallenge(challenge)
  }, [])

  const editPendingPhone = useCallback(async (phone: string) => {
    const result = await updatePendingPhone(phone)
    setPending(result.pending)
    setOtpChallenge(result.challenge)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isReady,
      pending,
      otpChallenge,
      login,
      logout,
      register,
      verifyOtp,
      resendOtp,
      editPendingPhone,
    }),
    [
      user,
      isReady,
      pending,
      otpChallenge,
      login,
      logout,
      register,
      verifyOtp,
      resendOtp,
      editPendingPhone,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
