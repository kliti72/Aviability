// services/exchangeMessages.service.ts

import { ApiError } from "../types/Auth.magic"
import { ExchangeMessageWithSender } from "../types/Aviability.types"


const API = process.env.NEXT_PUBLIC_API_URL ?? ''
const base: RequestInit = { credentials: 'include' }

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) return res.json() as Promise<T>
  const body = await res.json().catch(() => ({ message: 'Errore sconosciuto' }))
  throw new ApiError(body.message ?? 'Errore sconosciuto', res.status)
}

export const exchangeMessagesService = {

  /** GET /exchanges/:exchangeId/messages */
  async getMessages(exchangeId: number): Promise<ExchangeMessageWithSender[]> {
    const res = await fetch(`${API}/exchanges/${exchangeId}/messages`, base)
    return handleResponse<ExchangeMessageWithSender[]>(res)
  },

  /** POST /exchanges/:exchangeId/messages */
  async sendMessage(exchangeId: number, message: string): Promise<ExchangeMessageWithSender> {
    const res = await fetch(`${API}/exchanges/${exchangeId}/messages`, {
      ...base,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
    return handleResponse<ExchangeMessageWithSender>(res)
  },
}