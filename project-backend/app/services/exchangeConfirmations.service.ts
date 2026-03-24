import * as confirmationsRepository from '../repositories/exchangeConfirmations.repository'
import * as aviabilitiesRepository from '../repositories/aviabilities.repository'
import { reviewsService } from './reviews.service'

export const exchangeConfirmationsService = {

  getById(id: number) {
    const item = confirmationsRepository.findById(id)
    if (!item) throw new Error(`Confirmation ${id} not found.`)
    return item
  },

  getByAviabilityId(aviabilityId: number) {
    return confirmationsRepository.findByAviabilityId(aviabilityId)
  },

  // chiamato da aviabilityOffersService.accept — crea il record di conferma
  create(aviabilityId: number, offerId: number) {
    return confirmationsRepository.insert({ aviabilityId, offerId })
  },

  // il publisher conferma la sua parte
  confirmAsPublisher(confirmationId: number, publisherUserId: number) {
    const confirmation = confirmationsRepository.findById(confirmationId)
    if (!confirmation) throw new Error(`Confirmation ${confirmationId} not found.`)
    if (confirmation.locked) throw new Error('Exchange already locked.')

    const av = aviabilitiesRepository.findById(confirmation.aviabilityId)
    if (!av) throw new Error('Aviability not found.')
    if (av.userId !== publisherUserId) throw new Error('Forbidden: not your aviability.')

    const updated = confirmationsRepository.update(confirmationId, {
      publisherConfirmed: true,
      publisherConfirmedAt: new Date().toISOString(),
    })

    return this._tryLock(confirmationId)
  },

  // l'offerente conferma la sua parte
  confirmAsOfferer(confirmationId: number, offererUserId: number, offerId: number) {
    const confirmation = confirmationsRepository.findById(confirmationId)
    if (!confirmation) throw new Error(`Confirmation ${confirmationId} not found.`)
    if (confirmation.locked) throw new Error('Exchange already locked.')
    if (confirmation.offerId !== offerId) throw new Error('Offer mismatch.')

    confirmationsRepository.update(confirmationId, {
      offererConfirmed: true,
      offererConfirmedAt: new Date().toISOString(),
    })

    return this._tryLock(confirmationId)
  },

  // controlla se entrambi hanno confermato → lock + genera review requests
  _tryLock(confirmationId: number) {
    const confirmation = confirmationsRepository.findById(confirmationId)
    if (!confirmation) throw new Error(`Confirmation ${confirmationId} not found.`)

    if (confirmation.publisherConfirmed && confirmation.offererConfirmed && !confirmation.locked) {
      const locked = confirmationsRepository.update(confirmationId, {
        locked: true,
        lockedAt: new Date().toISOString(),
      })

      // aggiorna aviability → completed
      aviabilitiesRepository.update(confirmation.aviabilityId, { status: 'completed' })

      // recupera gli userId coinvolti per creare le review requests
      const av = aviabilitiesRepository.findById(confirmation.aviabilityId)
      if (av) {
        // offerer id lo prendiamo dalla offer — lo passa il layer superiore
        // qui creiamo le review requests tramite reviewsService
        reviewsService.createRequestsForExchange(confirmationId, av.userId, confirmation.offerId)
      }

      return locked
    }

    return confirmation
  },

}
