import { UserRole } from "./Auth.magic";

export type AuthStatus = "idle" | "loading" | "authenticated" | "error" | "unauthenticated";

export type AuthState =
  | { status: "loading";         user: null;  error: null }
  | { status: "unauthenticated"; user: null;  error: string | null }
  | { status: "authenticated";   user: User;  error: null }

export type AuthContextValue = AuthState & {
  loginWithGoogle: () => void
  setUser: (user: User, accessToken: string) => void
  logout: () => void
}

export interface User {
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

export interface Session {
  id: string;
  userId: number;
  accessToken: string;
  expiresAt: string;
  createdAt: string;
  isValid: boolean;
}

export interface MagicLink {
  id: string;
  email: string;
  token: string;
  expiresAt: string;
  used: boolean;
  createdAt: string;
}

export interface MagicLinkSendResponse {
  success: boolean;
  message?: string;
}

export interface MagicLinkVerifyResponse {
  success: boolean;
  userId?: number;
  sessionId?: string;
}

export interface SessionValidateResponse {
  valid: boolean;
  session?: Session & { user: User };
}

