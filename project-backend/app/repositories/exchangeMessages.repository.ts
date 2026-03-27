// repositories/exchangeMessages.repository.ts

import { eq, desc, ne, isNull, and, or, count, sql } from 'drizzle-orm'
import { aviabilities, aviabilityOffers, exchangeConfirmations, exchangeMessages, users } from '../../config/schema'
import type { CreateExchangeMessagesDto, ExchangeMessages, ExchangeMessageWithSender } from '../types/auth/types'
import { db } from '../../config/database'

// ── messaggi di un exchange ───────────────────────────────────
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
    .orderBy(desc(exchangeMessages.createdAt))
    .all()
}

// ── lista chat dell'utente ────────────────────────────────────
export function findChatsByUserId(userId: number) {
  return db
    .select({
      exchangeId:         exchangeConfirmations.id,
      aviabilityId:       exchangeConfirmations.aviabilityId,
      aviabilityTitle:    aviabilities.title,
      publisherConfirmed: exchangeConfirmations.publisherConfirmed,
      offererConfirmed:   exchangeConfirmations.offererConfirmed,
      locked:             exchangeConfirmations.locked,
      publisherId:        aviabilities.userId,
      publisherName:      sql<string>`pu.name`,
      publisherHandle:    sql<string>`pu.handle`,
      publisherPicture:   sql<string>`pu.picture`,
      offererId:          aviabilityOffers.offererId,
      offererName:        sql<string>`ou.name`,
      offererHandle:      sql<string>`ou.handle`,
      offererPicture:     sql<string>`ou.picture`,
      lastMessage:        exchangeMessages.message,
      lastMessageAt:      exchangeMessages.createdAt,
      lastMessageSender:  exchangeMessages.senderId,
    })
    .from(exchangeConfirmations)
    .innerJoin(aviabilities,     eq(exchangeConfirmations.aviabilityId, aviabilities.id))
    .innerJoin(aviabilityOffers, eq(exchangeConfirmations.offerId, aviabilityOffers.id))
    .innerJoin(sql`users pu`,    sql`pu.id = ${aviabilities.userId}`)
    .innerJoin(sql`users ou`,    sql`ou.id = ${aviabilityOffers.offererId}`)
    .leftJoin(exchangeMessages,  eq(exchangeMessages.exchangeId, exchangeConfirmations.id))
    .where(or(
      eq(aviabilities.userId,        userId),
      eq(aviabilityOffers.offererId, userId),
    ))
    .orderBy(desc(exchangeMessages.createdAt))
    .all()
}

// ── inserisci messaggio ───────────────────────────────────────
export function insert(dto: CreateExchangeMessagesDto): ExchangeMessages {
  return db
    .insert(exchangeMessages)
    .values(dto)
    .returning()
    .get()
}

// ── marca come letti i messaggi dell'altro ────────────────────
export function markAsRead(exchangeId: number, readerId: number): void {
  db.update(exchangeMessages)
    .set({ readAt: new Date().toISOString() })
    .where(and(
      eq(exchangeMessages.exchangeId, exchangeId),
      ne(exchangeMessages.senderId,   readerId),
      isNull(exchangeMessages.readAt),
    ))
    .run()
}

// ── conteggio non letti per exchange ─────────────────────────
export function countUnread(exchangeId: number, userId: number): number {
  const result = db
    .select({ count: count() })
    .from(exchangeMessages)
    .where(and(
      eq(exchangeMessages.exchangeId, exchangeId),
      ne(exchangeMessages.senderId,   userId),
      isNull(exchangeMessages.readAt),
    ))
    .get()
  return result?.count ?? 0
}