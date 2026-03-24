import { eq } from 'drizzle-orm'
import { exchangeConfirmations } from '../../config/schema'
import type { CreateExchangeConfirmationsDto, ExchangeConfirmations } from '../types/auth/types'
import { db } from '../../config/database'

export function findById(id: number): ExchangeConfirmations | undefined {
  return db.select().from(exchangeConfirmations).where(eq(exchangeConfirmations.id, id)).get()
}

export function findByAviabilityId(aviabilityId: number): ExchangeConfirmations | undefined {
  return db.select().from(exchangeConfirmations).where(eq(exchangeConfirmations.aviabilityId, aviabilityId)).get()
}

export function findByOfferId(offerId: number): ExchangeConfirmations | undefined {
  return db.select().from(exchangeConfirmations).where(eq(exchangeConfirmations.offerId, offerId)).get()
}

export function insert(dto: CreateExchangeConfirmationsDto): ExchangeConfirmations {
  return db.insert(exchangeConfirmations).values(dto).returning().get()!
}

export function update(id: number, dto: Partial<CreateExchangeConfirmationsDto>): ExchangeConfirmations | undefined {
  return db.update(exchangeConfirmations).set(dto).where(eq(exchangeConfirmations.id, id)).returning().get()
}
