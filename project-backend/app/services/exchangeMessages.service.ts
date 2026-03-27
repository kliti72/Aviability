// services/exchangeMessages.service.ts

import * as repo from '../repositories/exchangeMessages.repository'
import * as confirmationsRepo from '../repositories/exchangeConfirmations.repository'

export function getMyChats(userId: number) {
  const rows = repo.findChatsByUserId(userId)

  // risolvi otherUser e unread lato JS — niente join aggiuntivi
  return rows.map((c) => {
    const isPublisher = c.publisherId === userId
    const otherUser   = isPublisher
      ? { id: c.offererId,   name: c.offererName,   handle: c.offererHandle,   picture: c.offererPicture }
      : { id: c.publisherId, name: c.publisherName, handle: c.publisherHandle, picture: c.publisherPicture }

    const unreadCount = repo.countUnread(c.exchangeId, userId)

    return {
      exchangeId:      c.exchangeId,
      aviabilityId:    c.aviabilityId,
      aviabilityTitle: c.aviabilityTitle,
      otherUser,
      publisherConfirmed: c.publisherConfirmed,
      offererConfirmed:   c.offererConfirmed,
      locked:          c.locked,
      lastMessage:     c.lastMessage
        ? { message: c.lastMessage, createdAt: c.lastMessageAt!, isMine: c.lastMessageSender === userId }
        : null,
      unreadCount,
    }
  })
}

export function getMessages(exchangeId: number, requestingUserId: number) {
  const exchange = confirmationsRepo.findByIdWithRelations(exchangeId)
  if (!exchange) throw new Error('Exchange non trovato')

  const isParticipant =
    exchange.aviability.userId  === requestingUserId ||
    exchange.offer.offererId    === requestingUserId
  if (!isParticipant) throw new Error('Non autorizzato')

  // marca come letti i messaggi dell'altro
  repo.markAsRead(exchangeId, requestingUserId)

  return repo.findByExchangeId(exchangeId)
}

export function sendMessage(exchangeId: number, senderId: number, message: string) {
  const exchange = confirmationsRepo.findByIdWithRelations(exchangeId)
  if (!exchange) throw new Error('Exchange non trovato')

  const isParticipant =
    exchange.aviability.userId === senderId ||
    exchange.offer.offererId   === senderId
  if (!isParticipant) throw new Error('Non autorizzato')

  if (!exchange.publisherConfirmed) throw new Error('Exchange non ancora confermato')

  const inserted = repo.insert({ exchangeId, senderId, message: message.trim() })
  return repo.findByExchangeId(exchangeId).find((m) => m.id === inserted.id)!
}