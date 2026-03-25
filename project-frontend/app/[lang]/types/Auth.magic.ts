// ─── Auth ────────────────────────────────────────────────────────────────────

export interface MagicLinkSendPayload {
  email: string
  ipAddress?: string
  userAgent?: string
}

export interface MagicLinkSendResponse {
  message: string   // e.g. "Magic link sent"
  sent: boolean
}

export interface MagicLinkVerifyPayload {
  token: string
}

export interface MagicLinkVerifyResponse {
  accessToken: string
  user: AuthUser
}

// ─── User ────────────────────────────────────────────────────────────────────

export type UserRole = 'user' | 'staff' | 'admin'

export interface AuthUser {
  id: number
  email: string
  name: string
  givenName: string
  familyName: string
  picture: string
  locale: string
  handle: string | null
  bio: string | null
  verifiedEmail: boolean
  affidabilityScore: number
  reviewCount: number
  role: UserRole
  createdAt: string
}

// ─── Errors ──────────────────────────────────────────────────────────────────

export interface ApiErrorBody {
  message: string
  statusCode?: number
  error?: string
}

export class ApiError extends Error {
  statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}