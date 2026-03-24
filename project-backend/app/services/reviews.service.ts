import * as reviewsRepository from '../repositories/reviews.repository'
import * as offersRepository from '../repositories/aviabilityOffers.repository'
import * as usersRepository from '../repositories/auth/users.repository'

// review request scade dopo 7 giorni
const SEVEN_DAYS_MS = 1000 * 60 * 60 * 24 * 7

export const reviewsService = {

  // controlla se l'utente ha review pendenti o overdue → blocca le nuove offerte
  hasPendingReviews(userId: number): boolean {
    const pending = reviewsRepository.findPendingByReviewerId(userId)
    const overdue = reviewsRepository.findOverdueByReviewerId(userId)
    return pending.length > 0 || overdue.length > 0
  },

  getPendingByReviewerId(userId: number) {
    return reviewsRepository.findPendingByReviewerId(userId)
  },

  // chiamato da exchangeConfirmationsService._tryLock quando exchange è locked
  // crea 2 review requests: publisher → offerer e offerer → publisher
  createRequestsForExchange(exchangeId: number, publisherUserId: number, offerId: number) {
    const offer = offersRepository.findById(offerId)
    if (!offer) throw new Error(`Offer ${offerId} not found.`)

    const expiresAt = new Date(Date.now() + SEVEN_DAYS_MS).toISOString()

    // publisher deve recensire l'offerente
    const req1 = reviewsRepository.insertRequest({
      exchangeId,
      reviewerId: publisherUserId,
      reviewedUserId: offer.offererId,
      status: 'pending',
      expiresAt,
    })

    // offerente deve recensire il publisher
    const req2 = reviewsRepository.insertRequest({
      exchangeId,
      reviewerId: offer.offererId,
      reviewedUserId: publisherUserId,
      status: 'pending',
      expiresAt,
    })

    return [req1, req2]
  },

  // l'utente lascia la review
  submitReview(reviewerId: number, reviewRequestId: number, dto: { rating: number; comment?: string }) {
    const request = reviewsRepository.findRequestById(reviewRequestId)
    if (!request) throw new Error(`Review request ${reviewRequestId} not found.`)
    if (request.reviewerId !== reviewerId) throw new Error('Forbidden: not your review request.')
    if (request.status === 'completed') throw new Error('Review already submitted.')

    const review = reviewsRepository.insertReview({
      reviewRequestId,
      reviewerId,
      reviewedUserId: request.reviewedUserId,
      rating: dto.rating,
      comment: dto.comment,
    })

    // segna la request come completed
    reviewsRepository.updateRequest(reviewRequestId, {
      status: 'completed',
      completedAt: new Date().toISOString(),
    })

    // aggiorna affidability score dell'utente recensito
    this._updateAffidabilityScore(request.reviewedUserId)

    return review
  },

  // ricalcola e salva l'affidability score — media semplice di tutti i rating ricevuti
  _updateAffidabilityScore(userId: number) {
    const allReviews = reviewsRepository.findReviewsByReviewedUserId(userId)
    if (allReviews.length === 0) return

    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    const rounded = Math.round(avg * 10) / 10 // 1 decimale

    usersRepository.update(userId, {
      affidabilityScore: rounded,
      reviewCount: allReviews.length,
    })
  },

  // job schedulato — segna overdue le review scadute e blocca l'utente
  markOverdueRequests() {
    // da implementare lato job scheduler — query su expiresAt < now AND status = pending
    // poi update status → overdue
  },

}
