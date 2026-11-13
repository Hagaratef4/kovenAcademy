import { createId } from '../lib/crypto'

export type OtpChallenge = {
  requestId: string
  phone: string
  expiresAt: string
  demoCode: string
}

type PendingOtp = OtpChallenge & {
  code: string
}

const OTP_TTL_MS = 5 * 60 * 1000
const DEMO_CODE = '246810'

/**
 * WhatsApp OTP provider contract.
 * Swap MockWhatsAppOtpProvider for a WhatsApp Business API implementation later.
 */
export type WhatsAppOtpProvider = {
  sendVerificationCode: (phone: string) => Promise<OtpChallenge>
  verifyCode: (challenge: OtpChallenge, code: string) => Promise<boolean>
}

class MockWhatsAppOtpProvider implements WhatsAppOtpProvider {
  private challenges = new Map<string, PendingOtp>()

  async sendVerificationCode(phone: string): Promise<OtpChallenge> {
    const requestId = createId('otp')
    const challenge: PendingOtp = {
      requestId,
      phone,
      code: DEMO_CODE,
      demoCode: DEMO_CODE,
      expiresAt: new Date(Date.now() + OTP_TTL_MS).toISOString(),
    }
    this.challenges.set(requestId, challenge)

    return {
      requestId,
      phone,
      expiresAt: challenge.expiresAt,
      demoCode: DEMO_CODE,
    }
  }

  async verifyCode(challenge: OtpChallenge, code: string) {
    if (Date.now() > new Date(challenge.expiresAt).getTime()) return false
    // The challenge is stored in sessionStorage by the auth service, so the
    // mock remains verifiable if the user refreshes before entering the code.
    const storedChallenge = this.challenges.get(challenge.requestId)
    const expectedCode = storedChallenge?.code ?? challenge.demoCode
    const isValid = expectedCode === code.trim() && challenge.demoCode === DEMO_CODE
    if (isValid) this.challenges.delete(challenge.requestId)
    return isValid
  }
}

export const whatsappOtpProvider: WhatsAppOtpProvider = new MockWhatsAppOtpProvider()
export const PROTOTYPE_OTP_CODE = DEMO_CODE
