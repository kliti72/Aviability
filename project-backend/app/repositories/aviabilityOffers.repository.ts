import { eq, desc, and } from 'drizzle-orm'
import { aviabilityOffers } from '../../config/schema'
import type { AviabilityOffers, CreateAviabilityOffersDto } from '../types/auth/types'
import { db } from '../../config/database'

export function findAll(): AviabilityOffers[] {
  return db.select().from(aviabilityOffers).orderBy(desc(aviabilityOffers.createdAt)).all()
}

export function findById(id: number): AviabilityOffers | undefined {
  return db.select().from(aviabilityOffers).where(eq(aviabilityOffers.id, id)).get()
}

export function findByAviabilityId(aviabilityId: number): AviabilityOffers[] {
  return db.select().from(aviabilityOffers).where(eq(aviabilityOffers.aviabilityId, aviabilityId)).orderBy(desc(aviabilityOffers.createdAt)).all()
}

export function findByOffererId(offererId: number): AviabilityOffers[] {
  return db.select().from(aviabilityOffers).where(eq(aviabilityOffers.offererId, offererId)).orderBy(desc(aviabilityOffers.createdAt)).all()
}

export function findPendingByAviabilityId(aviabilityId: number): AviabilityOffers[] {
  return db.select().from(aviabilityOffers)
    .where(and(eq(aviabilityOffers.aviabilityId, aviabilityId), eq(aviabilityOffers.status, 'pending')))
    .all()
}

export function insert(dto: CreateAviabilityOffersDto): AviabilityOffers {
  return db.insert(aviabilityOffers).values(dto).returning().get()!
}

export function update(id: number, dto: Partial<CreateAviabilityOffersDto>): AviabilityOffers | undefined {
  return db.update(aviabilityOffers)
    .set({ ...dto, updatedAt: new Date().toISOString() })
    .where(eq(aviabilityOffers.id, id))
    .returning()
    .get()
}

export function remove(id: number): boolean {
  const result = db.delete(aviabilityOffers).where(eq(aviabilityOffers.id, id)).returning().get()
  return result != undefined
}
