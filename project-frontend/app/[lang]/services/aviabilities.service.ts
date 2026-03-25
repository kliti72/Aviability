// ─────────────────────────────────────────────────────────────────────────────
// services/aviabilities.service.ts
// ─────────────────────────────────────────────────────────────────────────────

import { ApiError } from "../types/Auth.magic"
import { ApiResponse, Aviability, AviabilityWithUser, CreateAviabilityDto, UpdateAviabilityDto } from "../types/Aviability.types"


const API = process.env.NEXT_PUBLIC_API_URL ?? ''

const base: RequestInit = { credentials: 'include' }

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) return res.json() as Promise<T>
  const body = await res.json().catch(() => ({ message: 'Errore sconosciuto' }))
  throw new ApiError(body.message ?? 'Errore sconosciuto', res.status)
}

export const aviabilitiesService = {

  /** GET /aviabilities — tutte le aviability aperte (pubbliche) */
  async getOpen(): Promise<AviabilityWithUser[]> {
    const res = await fetch(`${API}/aviabilities`, base)
    return handleResponse<AviabilityWithUser[]>(res)
  },

  /** GET /aviabilities/:id */
  async getById(id: number): Promise<AviabilityWithUser> {
    const res = await fetch(`${API}/aviabilities/${id}`, base)
    return handleResponse<AviabilityWithUser>(res)
  },

  /** GET /aviabilities/me — le mie aviability (autenticato) */
  async getMine(): Promise<Aviability[]> {
    const res = await fetch(`${API}/aviabilities/me`, base)
    return handleResponse<Aviability[]>(res)
  },

  /** POST /aviabilities — pubblica una nuova aviability */
  async publish(dto: CreateAviabilityDto): Promise<Aviability> {
    const res = await fetch(`${API}/aviabilities`, {
      ...base,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    })
    return handleResponse<Aviability>(res)
  },

  /** PATCH /aviabilities/:id — aggiorna la mia aviability */
  async update(id: number, dto: UpdateAviabilityDto): Promise<Aviability> {
    const res = await fetch(`${API}/aviabilities/${id}`, {
      ...base,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    })
    return handleResponse<Aviability>(res)
  },

  /** DELETE /aviabilities/:id — cancella (soft) la mia aviability */
  async cancel(id: number): Promise<ApiResponse<Aviability>> {
    const res = await fetch(`${API}/aviabilities/${id}`, {
      ...base,
      method: 'DELETE',
    })
    return handleResponse<ApiResponse<Aviability>>(res)
  },
}