
import { eq, asc, isNull, and, ne, count } from 'drizzle-orm'
import type { CreateExchangeMessagesDto, ExchangeMessages, ExchangeMessageWithSender } from '../types/auth/types'
import { exchangeMessages, users } from '../../config/schema'
import { db } from '../../config/database'

export function findByExchangeId(exchangeId: number): ExchangeMessageWithSender[] {
  return db
    .select({
      id:         exchangeMessages.id,
      exchangeId: exchangeMessages.exchangeId,
      senderId:   exchangeMessages.senderId,
      message:    exchangeMessages.message,
      readAt:     exchangeMessages.readAt,
      createdAt:  exchangeMessages.createdAt,
      sender: {
        id:                users.id,
        name:              users.name,
        handle:            users.handle,
        picture:           users.picture,
        affidabilityScore: users.affidabilityScore,
        reviewCount:       users.reviewCount,
      },
    })
    .from(exchangeMessages)
    .innerJoin(users, eq(exchangeMessages.senderId, users.id))
    .where(eq(exchangeMessages.exchangeId, exchangeId))
    .orderBy(asc(exchangeMessages.createdAt))
    .all()
}

export function insert(dto: CreateExchangeMessagesDto): ExchangeMessages {
  return db
    .insert(exchangeMessages)
    .values(dto)
    .returning()
    .get()
}

export function markAsRead(exchangeId: number, readerId: number): void {
  db.update(exchangeMessages)
    .set({ readAt: new Date().toISOString() })
    .where(
      and(
        eq(exchangeMessages.exchangeId, exchangeId),
        ne(exchangeMessages.senderId, readerId),
        isNull(exchangeMessages.readAt),
      )
    )
    .run()
}

export function countUnread(exchangeId: number, userId: number): number {
  const result = db
    .select({ count: count() })
    .from(exchangeMessages)
    .where(
      and(
        eq(exchangeMessages.exchangeId, exchangeId),
        ne(exchangeMessages.senderId, userId),
        isNull(exchangeMessages.readAt),
      )
    )
    .get()
  return result?.count ?? 0
}