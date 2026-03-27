// controllers/exchangeMessages.controller.ts

import { Elysia, t } from 'elysia'
import { sessionsService } from '../services/auth/sessions.service'
import * as exchangeMessagesService from '../services/exchangeMessages.service'

export const exchangeMessagesController = new Elysia({ prefix: '/exchanges' })

  // ── GET messaggi di un exchange ──────────────────────────────
  .get('/:exchangeId/messages', async ({ params, cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    try {
      return exchangeMessagesService.getMessages(Number(params.exchangeId), session.userId)
    } catch (e: any) {
      set.status = e.message === 'Non autorizzato' ? 403 : 404
      return { error: e.message }
    }
  }, {
    params: t.Object({ exchangeId: t.Numeric() }),
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
  })

  // ── POST invia un messaggio ──────────────────────────────────
  .post('/:exchangeId/messages', async ({ params, body, cookie, set }) => {
    const accessToken = cookie.sessionAccessToken.value
    if (!accessToken) { set.status = 401; return { error: 'Non autenticato' } }

    const session = await sessionsService.findByAccessToken(accessToken)
    if (!session) { set.status = 401; return { error: 'Sessione non valida' } }

    try {
      set.status = 201
      return exchangeMessagesService.sendMessage(Number(params.exchangeId), session.userId, body.message)
    } catch (e: any) {
      set.status = e.message === 'Non autorizzato' ? 403 : 400
      return { error: e.message }
    }
  }, {
    params: t.Object({ exchangeId: t.Numeric() }),
    cookie: t.Cookie({ sessionAccessToken: t.String() }),
    body: t.Object({
      message: t.String({ minLength: 1, maxLength: 1000 }),
    }),
  })