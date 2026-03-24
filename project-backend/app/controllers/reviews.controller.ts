import { Elysia, t } from 'elysia'
import { sessionsService } from '../services/auth/sessions.service';
import { reviewsService } from '../services/reviews.service';

export const reviewsController = new Elysia({ prefix: '/reviews' })

  // ── GET le mie review request pendenti ──────────────────────
  .get('/me/pending', async ({ cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    return reviewsService.getPendingByReviewerId(session.userId)
  }, {
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
  })

  // ── POST lascia una review ───────────────────────────────────
  .post('/requests/:requestId', async ({ params, body, cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    set.status = 201
    return reviewsService.submitReview(session.userId, Number(params.requestId), body)
  }, {
    params: t.Object({ requestId: t.Numeric() }),
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
    body: t.Object({
      rating:  t.Number({ minimum: 1, maximum: 5 }),
      comment: t.Optional(t.String({ maxLength: 500 })),
    }),
  })
