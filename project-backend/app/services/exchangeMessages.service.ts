// services/exchangeMessages.service.ts

import * as exchangeMessagesRepository from '../repositories/exchangeMessages.repository'
import * as exchangeConfirmationsRepository from '../repositories/exchangeConfirmations.repository'
import type { ExchangeMessageWithSender } from '../types/auth/types'

export function getMessages(exchangeId: number, requestingUserId: number): ExchangeMessageWithSender[] {
  const exchange = exchangeConfirmationsRepository.findByIdWithRelations (exchangeId)
  if (!exchange) throw new Error('Exchange non trovato')

  // solo publisher e offerente possono leggere
  const offer = exchange.offer
  const isParticipant = exchange.aviability.userId === requestingUserId || offer.offererId === requestingUserId
  if (!isParticipant) throw new Error('Non autorizzato')

  // marca come letti i messaggi dell'altro
  exchangeMessagesRepository.markAsRead(exchangeId, requestingUserId)

  return exchangeMessagesRepository.findByExchangeId(exchangeId)
}

export function sendMessage(
  exchangeId: number,
  senderId: number,
  message: string,
): ExchangeMessageWithSender {
  const exchange = exchangeConfirmationsRepository.findByIdWithRelations (exchangeId)
  if (!exchange) throw new Error('Exchange non trovato')

  // solo i partecipanti possono scrivere
  const offer = exchange.offer
  const isParticipant = exchange.aviability.userId === senderId || offer.offererId === senderId
  if (!isParticipant) throw new Error('Non autorizzato')

  // la chat è disponibile solo dopo che il publisher ha accettato
  if (!exchange.publisherConfirmed) throw new Error('Lo scambio non è ancora confermato')

  const inserted = exchangeMessagesRepository.insert({
    exchangeId,
    senderId,
    message: message.trim(),
  })

  // ritorna con sender popolato
  return exchangeMessagesRepository.findByExchangeId(exchangeId)
    .find((m) => m.id === inserted.id)!
}