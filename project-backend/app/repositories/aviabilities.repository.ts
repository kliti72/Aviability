import { eq, desc, and, eq as eqAlias, inArray, notInArray } from 'drizzle-orm'
import { aviabilities, users } from '../../config/schema'
import { db } from '../../config/database'
import type { Aviabilities, AviabilitiesWithUser, CreateAviabilitiesDto } from '../types/auth/types'

export function findAll(): Aviabilities[] {
  return db.select().from(aviabilities).orderBy(desc(aviabilities.createdAt)).all()
}

export function findById(id: number): Aviabilities | undefined {
  return db.select().from(aviabilities).where(eq(aviabilities.id, id)).get()
}

export function findByUserId(userId: number): Aviabilities[] {
  return db.select().from(aviabilities).where(eq(aviabilities.userId, userId)).orderBy(desc(aviabilities.createdAt)).all()
}

export function findOpen(): Aviabilities[] {
  return db.select().from(aviabilities).where(eq(aviabilities.status, 'open')).orderBy(desc(aviabilities.createdAt)).all()
}

export function findWithUser(): AviabilitiesWithUser[] {
  return db
    .select({
      // tutti i campi di aviabilities
      id:           aviabilities.id,
      userId:       aviabilities.userId,
      title:        aviabilities.title,
      description:  aviabilities.description,
      wantInReturn: aviabilities.wantInReturn,
      mode:         aviabilities.mode,
      location:     aviabilities.location,
      category:     aviabilities.category,
      status:       aviabilities.status,
      createdAt:    aviabilities.createdAt,
      expiresAt:    aviabilities.expiresAt,
      removedAt:    aviabilities.removedAt,
      // solo i campi pubblici dell'utente
      user: {
        id:                users.id,
        name:              users.name,
        handle:            users.handle,
        picture:           users.picture,
        affidabilityScore: users.affidabilityScore,
        reviewCount:       users.reviewCount,
      },
    })
    .from(aviabilities)
    .innerJoin(users, eq(aviabilities.userId, users.id))
    .where(notInArray(aviabilities.status, ['expired', 'cancelled']))
    .orderBy(desc(aviabilities.createdAt))
    .all()
}

export function findByIdWithUser(aviabilityId: number): AviabilitiesWithUser | undefined {
  return db
    .select({
      id:           aviabilities.id,
      userId:       aviabilities.userId,
      title:        aviabilities.title,
      description:  aviabilities.description,
      wantInReturn: aviabilities.wantInReturn,
      mode:         aviabilities.mode,
      location:     aviabilities.location,
      category:     aviabilities.category,
      status:       aviabilities.status,
      createdAt:    aviabilities.createdAt,
      expiresAt:    aviabilities.expiresAt,
      removedAt:    aviabilities.removedAt,
      user: {
        id:                users.id,
        name:              users.name,
        handle:            users.handle,
        picture:           users.picture,
        affidabilityScore: users.affidabilityScore,
        reviewCount:       users.reviewCount,
      },
    })
    .from(aviabilities)
    .innerJoin(users, eq(aviabilities.userId, users.id))
    .where(eq(aviabilities.id, aviabilityId))
    .get()
}

export function insert(dto: CreateAviabilitiesDto): Aviabilities {
  return db.insert(aviabilities).values(dto).returning().get()!
}

export function update(id: number, dto: Partial<CreateAviabilitiesDto>): Aviabilities | undefined {
  return db.update(aviabilities).set(dto).where(eq(aviabilities.id, id)).returning().get()
}

export function remove(id: number): boolean {
  const result = db.delete(aviabilities).where(eq(aviabilities.id, id)).returning().get()
  return result != undefined
}
