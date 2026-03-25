// ─────────────────────────────────────────────────────────────────────────────
// services/exchangeConfirmations.service.ts
// ─────────────────────────────────────────────────────────────────────────────

import { ApiError } from "../types/Auth.magic"
import { ExchangeConfirmation, ExchangeConfirmationDetail } from "../types/Aviability.types"

const API = process.env.NEXT_PUBLIC_API_URL ?? ''
const base: RequestInit = { credentials: 'include' }

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) return res.json() as Promise<T>
  const body = await res.json().catch(() => ({ message: 'Errore sconosciuto' }))
  throw new ApiError(body.message ?? 'Errore sconosciuto', res.status)
}

export const exchangeConfirmationsService = {

  /** GET /confirmations/aviability/:aviabilityId */
  async getByAviabilityId(aviabilityId: number): Promise<ExchangeConfirmationDetail> {
    const res = await fetch(`${API}/confirmations/aviability/${aviabilityId}`, base)
    return handleResponse<ExchangeConfirmationDetail>(res)
  },

  /** PATCH /confirmations/:id/confirm-publisher — publisher conferma il proprio lato */
  async confirmAsPublisher(confirmationId: number): Promise<ExchangeConfirmation> {
    const res = await fetch(`${API}/confirmations/${confirmationId}/confirm-publisher`, {
      ...base,
      method: 'PATCH',
    })
    return handleResponse<ExchangeConfirmation>(res)
  },

  /** PATCH /confirmations/:id/confirm-offerer — offerente conferma il proprio lato */
  async confirmAsOfferer(confirmationId: number, offerId: number): Promise<ExchangeConfirmation> {
    const res = await fetch(`${API}/confirmations/${confirmationId}/confirm-offerer`, {
      ...base,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offerId }),
    })
    return handleResponse<ExchangeConfirmation>(res)
  },
}