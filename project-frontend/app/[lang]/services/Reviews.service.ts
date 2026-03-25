// ─────────────────────────────────────────────────────────────────────────────
// services/reviews.service.ts
// ─────────────────────────────────────────────────────────────────────────────

import { ApiError } from "../types/Auth.magic"
import { CreateReviewDto, Review, ReviewRequest } from "../types/Aviability.types"

const API = process.env.NEXT_PUBLIC_API_URL ?? ''
const base: RequestInit = { credentials: 'include' }

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) return res.json() as Promise<T>
  const body = await res.json().catch(() => ({ message: 'Errore sconosciuto' }))
  throw new ApiError(body.message ?? 'Errore sconosciuto', res.status)
}

export const reviewsService = {

  /** GET /reviews/me/pending — le mie review request pendenti (autenticato) */
  async getPendingRequests(): Promise<ReviewRequest[]> {
    const res = await fetch(`${API}/reviews/me/pending`, base)
    return handleResponse<ReviewRequest[]>(res)
  },

  /** POST /reviews/requests/:requestId — lascia una review */
  async submitReview(requestId: number, dto: Omit<CreateReviewDto, 'reviewRequestId'>): Promise<Review> {
    const res = await fetch(`${API}/reviews/requests/${requestId}`, {
      ...base,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    })
    return handleResponse<Review>(res)
  },
}