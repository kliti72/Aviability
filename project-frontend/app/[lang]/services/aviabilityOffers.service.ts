// ─────────────────────────────────────────────────────────────────────────────
// services/aviabilityOffers.service.ts
// ─────────────────────────────────────────────────────────────────────────────

import { ApiError } from "../types/Auth.magic"
import { ApiResponse, AviabilityOffer, CreateOfferDto, OfferWithAviability, OfferWithOfferer } from "../types/Aviability.types"

const API = process.env.NEXT_PUBLIC_API_URL ?? ''
const base: RequestInit = { credentials: 'include' }

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) return res.json() as Promise<T>
  const body = await res.json().catch(() => ({ message: 'Errore sconosciuto' }))
  throw new ApiError(body.message ?? 'Errore sconosciuto', res.status)
}

export const aviabilityOffersService = {

  /** GET /aviabilities/:aviabilityId/offers — offerte di una aviability (pubbliche) */
  async getByAviabilityId(aviabilityId: number): Promise<OfferWithOfferer[]> {
    const res = await fetch(`${API}/aviabilities/${aviabilityId}/offers`, base)
    return handleResponse<OfferWithOfferer[]>(res)
  },

  /** GET /aviabilities/offers/me — le mie offerte (autenticato) */
  async getMine(): Promise<OfferWithAviability[]> {
    const res = await fetch(`${API}/aviabilities/offers/me`, base)
    return handleResponse<OfferWithAviability[]>(res)
  },

  /** POST /aviabilities/:aviabilityId/offers — fai un'offerta
   *  @throws ApiError 403 se hai review pending/overdue
   */
  async makeOffer(dto: CreateOfferDto): Promise<AviabilityOffer> {
    const { aviabilityId, ...body } = dto
    const res = await fetch(`${API}/aviabilities/${aviabilityId}/offers`, {
      ...base,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return handleResponse<AviabilityOffer>(res)
  },

  /** PATCH /aviabilities/offers/:offerId/accept — accetta un'offerta (publisher) */
  async accept(offerId: number): Promise<AviabilityOffer> {
    const res = await fetch(`${API}/aviabilities/offers/${offerId}/accept`, {
      ...base,
      method: 'PATCH',
    })
    return handleResponse<AviabilityOffer>(res)
  },

  /** PATCH /aviabilities/offers/:offerId/decline — declina un'offerta (publisher) */
  async decline(offerId: number): Promise<AviabilityOffer> {
    const res = await fetch(`${API}/aviabilities/offers/${offerId}/decline`, {
      ...base,
      method: 'PATCH',
    })
    return handleResponse<AviabilityOffer>(res)
  },

  /** PATCH /aviabilities/offers/:offerId/withdraw — ritira la propria offerta (offerente) */
  async withdraw(offerId: number): Promise<ApiResponse<AviabilityOffer>> {
    const res = await fetch(`${API}/aviabilities/offers/${offerId}/withdraw`, {
      ...base,
      method: 'PATCH',
    })
    return handleResponse<ApiResponse<AviabilityOffer>>(res)
  },
}