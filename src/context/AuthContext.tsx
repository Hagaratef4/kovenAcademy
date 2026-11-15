import {
  useCallback,
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
  updateMockProfile,
} from '../services/authService'
import type { PendingVerification, RegisterPayload, User } from '../types/auth'
import type { OtpChallenge } from '../services/otpService'
import { AuthContext } from './authContextStore'

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

  const updateProfile = useCallback(async (fields: Pick<User, 'fullName' | 'city'>) => {
    if (!user) throw new Error('Please sign in again before editing your profile.')
    const nextUser = await updateMockProfile(user.id, fields)
    const remember = localStorage.getItem('koven.session') !== null
    persistSession(nextUser, remember)
    setUser(nextUser)
    return nextUser
  }, [user])

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
      updateProfile,
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
      updateProfile,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
