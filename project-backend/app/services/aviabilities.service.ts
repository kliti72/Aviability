import * as aviabilitiesRepository from '../repositories/aviabilities.repository'
import type { Aviabilities, CreateAviabilitiesDto } from '../types/auth/types'

// 10 giorni in ms
const TEN_DAYS_MS = 1000 * 60 * 60 * 24 * 10

export const aviabilitiesService = {

  getAll() {
    return aviabilitiesRepository.findAll()
  },

  getOpen() {
    return aviabilitiesRepository.findOpen()
  },

  getById(id: number) {
    const item = aviabilitiesRepository.findById(id)
    if (!item) throw new Error(`Aviability ${id} not found.`)
    return item
  },

  getByUserId(userId: number) {
    return aviabilitiesRepository.findByUserId(userId)
  },

  publish(userId: number, dto: Omit<CreateAviabilitiesDto, 'userId' | 'expiresAt' | 'status'>) {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + TEN_DAYS_MS).toISOString()

    const payload: CreateAviabilitiesDto = {
      ...dto,
      userId,
      status: 'open',
      expiresAt,
    }

    return aviabilitiesRepository.insert(payload)
  },

  update(id: number, userId: number, dto: Partial<Omit<CreateAviabilitiesDto, 'userId'>>) {
    const item = aviabilitiesRepository.findById(id)
    if (!item) throw new Error(`Aviability ${id} not found.`)
    if (item.userId !== userId) throw new Error('Forbidden: not your aviability.')
    return aviabilitiesRepository.update(id, dto)
  },

  cancel(id: number, userId: number) {
    const item = aviabilitiesRepository.findById(id)
    if (!item) throw new Error(`Aviability ${id} not found.`)
    if (item.userId !== userId) throw new Error('Forbidden: not your aviability.')
    if (item.status === 'confirmed') throw new Error('Cannot cancel a confirmed exchange.')
    return aviabilitiesRepository.update(id, {
      status: 'cancelled',
      removedAt: new Date().toISOString(),
    })
  },

  // chiamato da un job schedulato — segna come expired le aviability scadute
  expireStale() {
    const all = aviabilitiesRepository.findOpen()
    const now = new Date()
    const expired: Aviabilities[] = []

    for (const av of all) {
      if (new Date(av.expiresAt) < now) {
        const updated = aviabilitiesRepository.update(av.id, { status: 'expired' })
        if (updated) expired.push(updated)
      }
    }

    return expired
  },

}
