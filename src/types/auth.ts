export type UserRole = 'admin' | 'teacher' | 'student' | 'parent'

export type PublicRole = Exclude<UserRole, 'admin'>

export type User = {
  id: string
  fullName: string
  phone: string
  city: string
  role: UserRole
  createdAt: string
  phoneVerified: boolean
}

export type RegisterPayload = {
  fullName: string
  phone: string
  city: string
  password: string
  role: PublicRole
}

export type PendingVerification = {
  id: string
  payload: RegisterPayload
  createdAt: string
}

export type SessionUser = User
