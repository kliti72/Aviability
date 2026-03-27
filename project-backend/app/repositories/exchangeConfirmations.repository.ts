import { eq } from 'drizzle-orm'
import { aviabilities, aviabilityOffers, exchangeConfirmations } from '../../config/schema'
import type { CreateExchangeConfirmationsDto, ExchangeConfirmations, ExchangeConfirmationWithRelations } from '../types/auth/types'
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


export function findByIdWithRelations(id: number): ExchangeConfirmationWithRelations | undefined {
  return db
    .select({
      id:                   exchangeConfirmations.id,
      aviabilityId:         exchangeConfirmations.aviabilityId,
      offerId:              exchangeConfirmations.offerId,
      publisherConfirmed:   exchangeConfirmations.publisherConfirmed,
      publisherConfirmedAt: exchangeConfirmations.publisherConfirmedAt,
      offererConfirmed:     exchangeConfirmations.offererConfirmed,
      offererConfirmedAt:   exchangeConfirmations.offererConfirmedAt,
      locked:               exchangeConfirmations.locked,
      lockedAt:             exchangeConfirmations.lockedAt,
      createdAt:            exchangeConfirmations.createdAt,
      aviability: {
        userId: aviabilities.userId,
      },
      offer: {
        offererId: aviabilityOffers.offererId,
      },
    })
    .from(exchangeConfirmations)
    .innerJoin(aviabilities, eq(exchangeConfirmations.aviabilityId, aviabilities.id))
    .innerJoin(aviabilityOffers, eq(exchangeConfirmations.offerId, aviabilityOffers.id))
    .where(eq(exchangeConfirmations.id, id))
    .get()
}