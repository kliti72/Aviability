import { Elysia, t } from 'elysia'
import { aviabilityOffersService } from '../services/aviabilityOffers.service';
import { sessionsService } from '../services/auth/sessions.service';
import { reviewsService } from '../services/reviews.service';

export const aviabilityOffersController = new Elysia({ prefix: '/aviabilities' })

  // ── GET offerte di una aviability (pubbliche) ────────────────
  .get('/:aviabilityId/offers', ({ params }) => {
    return aviabilityOffersService.getByAviabilityId(Number(params.aviabilityId))
  }, {
    params: t.Object({ aviabilityId: t.Numeric() }),
  })

  // ── GET le mie offerte ───────────────────────────────────────
  .get('/offers/me', async ({ cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    return aviabilityOffersService.getByOffererId(session.userId)
  }, {
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
  })

  // ── POST fai un'offerta ──────────────────────────────────────
  .post('/:aviabilityId/offers', async ({ params, body, cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    // blocca se l'utente ha review pending/overdue
    const blocked = reviewsService.hasPendingReviews(session.userId)
    if (blocked) {
      set.status = 403
      return { error: 'Hai delle recensioni in sospeso. Completale prima di fare nuove offerte.' }
    }

    set.status = 201
    return aviabilityOffersService.makeOffer(session.userId, {
      aviabilityId: Number(params.aviabilityId),
      ...body,
    })
  }, {
    params: t.Object({ aviabilityId: t.Numeric() }),
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
    body: t.Object({
      message:       t.String({ minLength: 1, maxLength: 500 }),
      offerDetail:   t.Optional(t.String({ maxLength: 300 })),
      preferredMode: t.Optional(t.Union([t.Literal('remote'), t.Literal('physical')])),
    }),
  })

  // ── PATCH accetta un'offerta (solo publisher) ────────────────
  .patch('/offers/:offerId/accept', async ({ params, cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    return aviabilityOffersService.accept(Number(params.offerId), session.userId)
  }, {
    params: t.Object({ offerId: t.Numeric() }),
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
  })

  // ── PATCH declina un'offerta (solo publisher) ────────────────
  .patch('/offers/:offerId/decline', async ({ params, cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    return aviabilityOffersService.decline(Number(params.offerId), session.userId)
  }, {
    params: t.Object({ offerId: t.Numeric() }),
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
  })

  // ── PATCH ritira la propria offerta (solo offerente) ─────────
  .patch('/offers/:offerId/withdraw', async ({ params, cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    return aviabilityOffersService.withdraw(Number(params.offerId), session.userId)
  }, {
    params: t.Object({ offerId: t.Numeric() }),
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
  })
