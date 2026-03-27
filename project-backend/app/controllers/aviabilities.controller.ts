import { Elysia, t } from 'elysia'
import { aviabilitiesService } from '../services/aviabilities.service'
import { sessionsService } from '../services/auth/sessions.service'

export const aviabilitiesController = new Elysia({ prefix: '/aviabilities' })

  // ── GET tutte (pubbliche) ────────────────────────────────────
  .get('/', () => {
    return aviabilitiesService.getWithUser()
  })

  // ── GET per id ───────────────────────────────────────────────
  .get('/:aviabilityId', ({ params }) => {
    return aviabilitiesService.getWithUserById(Number(params.aviabilityId))
  }, {
    params: t.Object({ aviabilityId: t.Numeric() }),
  })

  // ── GET le mie aviability ────────────────────────────────────
  .get('/me', async ({ cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    return aviabilitiesService.getByUserId(session.userId)
  }, {
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
  })

  // ── POST pubblica una nuova aviability ───────────────────────
  .post('/', async ({ body, cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    set.status = 201
    return aviabilitiesService.publish(session.userId, body)
  }, {
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
    body: t.Object({
      title:        t.String({ minLength: 1, maxLength: 80 }),
      description:  t.String({ minLength: 1, maxLength: 1000 }),
      wantInReturn: t.Optional(t.String({ maxLength: 300 })),
      mode:         t.Union([t.Literal('remote'), t.Literal('physical'), t.Literal('both')]),
      location:     t.Optional(t.String({ maxLength: 100 })),
      category:     t.Union([
        t.Literal('skills'), t.Literal('language'), t.Literal('tech'),
        t.Literal('sport'), t.Literal('music'), t.Literal('talent_magic'),
        t.Literal('event'), t.Literal('other'),
      ]),
    }),
  })

  // ── PATCH aggiorna la mia aviability ────────────────────────
  .patch('/:aviabilityId', async ({ params, body, cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    return aviabilitiesService.update(Number(params.aviabilityId), session.userId, body)
  }, {
    params: t.Object({ aviabilityId: t.Numeric() }),
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
    body: t.Object({
      title:        t.Optional(t.String({ minLength: 1, maxLength: 80 })),
      description:  t.Optional(t.String({ minLength: 1, maxLength: 1000 })),
      wantInReturn: t.Optional(t.String({ maxLength: 300 })),
      mode:         t.Optional(t.Union([t.Literal('remote'), t.Literal('physical'), t.Literal('both')])),
      location:     t.Optional(t.String({ maxLength: 100 })),
      category:     t.Optional(t.Union([
        t.Literal('skills'), t.Literal('language'), t.Literal('tech'),
        t.Literal('sport'), t.Literal('music'), t.Literal('talent_magic'),
        t.Literal('event'), t.Literal('other'),
      ])),
    }),
  })

  // ── DELETE cancella la mia aviability ───────────────────────
  .delete('/:aviabilityId', async ({ params, cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    return aviabilitiesService.cancel(Number(params.aviabilityId), session.userId)
  }, {
    params: t.Object({ aviabilityId: t.Numeric() }),
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
  })