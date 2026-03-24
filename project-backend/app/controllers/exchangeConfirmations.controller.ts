import { Elysia, t } from 'elysia'
import { exchangeConfirmationsService } from '../services/exchangeConfirmations.service';
import { sessionsService } from '../services/auth/sessions.service';

export const exchangeConfirmationsController = new Elysia({ prefix: '/confirmations' })

  // ── GET conferma per aviability ──────────────────────────────
  .get('/aviability/:aviabilityId', ({ params }) => {
    return exchangeConfirmationsService.getByAviabilityId(Number(params.aviabilityId))
  }, {
    params: t.Object({ aviabilityId: t.Numeric() }),
  })

  // ── PATCH publisher conferma il proprio lato ─────────────────
  .patch('/:id/confirm-publisher', async ({ params, cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    return exchangeConfirmationsService.confirmAsPublisher(Number(params.id), session.userId)
  }, {
    params: t.Object({ id: t.Numeric() }),
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
  })

  // ── PATCH offerente conferma il proprio lato ─────────────────
  .patch('/:id/confirm-offerer', async ({ params, body, cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    return exchangeConfirmationsService.confirmAsOfferer(Number(params.id), session.userId, body.offerId)
  }, {
    params: t.Object({ id: t.Numeric() }),
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
    body: t.Object({ offerId: t.Number() }),
  })
