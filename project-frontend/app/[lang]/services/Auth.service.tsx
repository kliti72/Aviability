


// ─── Helpers ─────────────────────────────────────────────────────────────────

import { ApiError, ApiErrorBody, MagicLinkSendPayload, MagicLinkSendResponse, MagicLinkVerifyPayload, MagicLinkVerifyResponse } from "../types/Auth.magic"

const API = process.env.NEXT_PUBLIC_API_URL;

/**
 * Tenta di recuperare l'IP pubblico del client tramite un servizio esterno.
 * In produzione potresti preferire che sia il backend a leggerlo dall'header
 * X-Forwarded-For — in tal caso rimuovi questa funzione e non passare ipAddress.
 */
async function fetchClientIp(): Promise<string | undefined> {
  try {
    const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(2000) })
    if (!res.ok) return undefined
    const data = await res.json() as { ip: string }
    return data.ip
  } catch {
    return undefined
  }
}

/**
 * Raccoglie i metadati di rete del client (IP + User-Agent).
 * Entrambi sono opzionali: se il fetch fallisce vengono omessi silenziosamente.
 */
async function collectClientMeta(): Promise<{ ipAddress?: string; userAgent?: string }> {
  const [ipAddress] = await Promise.all([fetchClientIp()])
  const userAgent = navigator.userAgent.slice(0, 512) || undefined
  return { ipAddress, userAgent }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) return res.json() as Promise<T>

  const body = await res.json().catch((): ApiErrorBody => ({ message: 'Errore sconosciuto' }))
  throw new ApiError(body.message ?? 'Errore sconosciuto', res.status)
}

// ─── Auth service ─────────────────────────────────────────────────────────────

export const authService = {
  /**
   * Invia il magic link all'email fornita.
   * Allega automaticamente IP e User-Agent per il backend (fraud / bot detection).
   */
  async sendMagicLink(email: string): Promise<MagicLinkSendResponse> {
    const meta = await collectClientMeta()

    const payload: MagicLinkSendPayload = {
      email: email.trim(),
      ...meta,
    }

    const res = await fetch(`${API}/auth/magic/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    })

    return handleResponse<MagicLinkSendResponse>(res)
  },

  /**
   * Verifica il token del magic link e restituisce l'utente autenticato.
   */
  async verifyMagicLink(token: string): Promise<MagicLinkVerifyResponse> {
    const payload: MagicLinkVerifyPayload = { token }

    const res = await fetch(`${API}/auth/magic/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    })

    return handleResponse<MagicLinkVerifyResponse>(res)
  },
}