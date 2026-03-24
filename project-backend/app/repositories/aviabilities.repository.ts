import { eq, desc, and, eq as eqAlias } from 'drizzle-orm'
import { aviabilities } from '../../config/schema'
import { db } from '../../config/database'
import type { Aviabilities, CreateAviabilitiesDto } from '../types/auth/types'

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
