import * as offersRepository from '../repositories/aviabilityOffers.repository'
import * as aviabilitiesRepository from '../repositories/aviabilities.repository'
import { exchangeConfirmationsService } from './exchangeConfirmations.service'
import type { CreateAviabilityOffersDto } from '../types/auth/types'

export const aviabilityOffersService = {

  getByAviabilityId(aviabilityId: number) {
    return offersRepository.findByAviabilityIdWithUser(aviabilityId)
  },

  getByOffererId(offererId: number) {
    return offersRepository.findByOffererId(offererId)
  },

  getById(id: number) {
    const item = offersRepository.findById(id)
    if (!item) throw new Error(`Offer ${id} not found.`)
    return item
  },

  // un utente fa un'offerta su una aviability
  makeOffer(
    offererId: number,
    dto: Omit<CreateAviabilityOffersDto, 'offererId' | 'status'>
  ) {
    const av = aviabilitiesRepository.findById(dto.aviabilityId)
    if (!av) throw new Error(`Aviability ${dto.aviabilityId} not found.`)
      console.log(av);
    if (av.status === 'completed' ||
       av.status ===  'expired' || 
       av.status ===  "cancelled") {
       throw new Error('Questa Aviability è stata chiusa concretamente.')       
      }
    if (av.userId === offererId) throw new Error('Cannot offer on your own aviability.')

    const offer = offersRepository.insert({ ...dto, offererId, status: 'pending' })

    // aggiorna status aviability → offered (se era ancora open)
    if (av.status === 'open') {
      aviabilitiesRepository.update(av.id, { status: 'offered' })
    }

    return offer
  },

  // il publisher accetta un'offerta → parte il flusso di conferma bilaterale
  accept(offerId: number, publisherUserId: number) {
    const offer = offersRepository.findById(offerId)
    if (!offer) throw new Error(`Offer ${offerId} not found.`)

    const av = aviabilitiesRepository.findById(offer.aviabilityId)
    if (!av) throw new Error(`Aviability ${offer.aviabilityId} not found.`)
    if (av.userId !== publisherUserId) throw new Error('Forbidden: not your aviability.')
    if (offer.status !== 'pending') throw new Error('Offer is not in pending state.')

    // segna offerta come accepted
    const accepted = offersRepository.update(offerId, { status: 'accepted' })

    // declina tutte le altre offerte pending sulla stessa aviability
    const others = offersRepository.findPendingByAviabilityId(av.id)
    for (const other of others) {
      if (other.id !== offerId) {
        offersRepository.update(other.id, { status: 'declined' })
      }
    }

    // crea il record di conferma bilaterale
    exchangeConfirmationsService.create(av.id, offerId)

    return accepted
  },

  // il publisher declina un'offerta
  decline(offerId: number, publisherUserId: number) {
    const offer = offersRepository.findById(offerId)
    if (!offer) throw new Error(`Offer ${offerId} not found.`)

    const av = aviabilitiesRepository.findById(offer.aviabilityId)
    if (!av) throw new Error(`Aviability not found.`)
    if (av.userId !== publisherUserId) throw new Error('Forbidden: not your aviability.')
    if (offer.status !== 'pending') throw new Error('Offer is not in pending state.')

    return offersRepository.update(offerId, { status: 'declined' })
  },

  // l'offerente ritira la propria offerta
  withdraw(offerId: number, offererId: number) {
    const offer = offersRepository.findById(offerId)
    if (!offer) throw new Error(`Offer ${offerId} not found.`)
    if (offer.offererId !== offererId) throw new Error('Forbidden: not your offer.')
    if (offer.status !== 'pending') throw new Error('Offer is not in pending state.')

    return offersRepository.update(offerId, { status: 'withdrawn' })
  },

}
