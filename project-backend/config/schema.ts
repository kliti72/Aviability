// NOT EDIT MUCH THIS FILE, USE ONLY WITH Elysia-cli
// https://github.com/kliti72/elysia-cli

import { sqliteTable, integer, text, check, real } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

// ═══════════════════════════════════
// users
// ═══════════════════════════════════
// GDPR / privacy note:
//   - ip_address è cifrata a livello applicativo (AES-256) prima di salvare
//   - user_agent loggato solo per sicurezza / fraud detection
//   - tutti i campi sensibili hanno limite di lunghezza esplicito (check constraint)
//   - per cancellare un utente → soft delete via deleted_at, poi purge schedulato a 30gg
export const users = sqliteTable('users', {
  id:            integer('id').primaryKey({ autoIncrement: true }),
  email:         text('email').notNull().unique(),
  password:      text('password'),                          // null se login OAuth / magic link
  verifiedEmail: integer('verified_email', { mode: 'boolean' }).notNull().default(false),
  name:          text('name').notNull(),
  givenName:     text('given_name').notNull(),
  familyName:    text('family_name').notNull(),
  picture:       text('picture').notNull(),
  locale:        text('locale').notNull(),
  handle:        text('handle').unique(),
  bio:           text('bio'),

  // ── campi legali / sicurezza ─────────────────────────────────
  // ip_address: cifrata AES-256 lato app, max 45 char (IPv6 expanded)
  ipAddress:    text('ip_address'),
  // user_agent: solo per fraud / bot detection, max 512 char
  userAgent:    text('user_agent'),
  // soft delete GDPR compliant — l'utente viene anonimizzato dopo 30gg
  deletedAt:    text('deleted_at'),

  // ── affidability score ───────────────────────────────────────
  // media pesata delle review ricevute — aggiornata dopo ogni review confermata
  affidabilityScore: real('affidability_score').notNull().default(0),
  reviewCount:       integer('review_count').notNull().default(0),

  role:      text('role', { enum: ['user', 'staff', 'admin'] }).notNull().default('user'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
}, (table) => [
  check('bio_length',        sql`length(${table.bio}) <= 300`),
  check('handle_length',     sql`length(${table.handle}) <= 32`),
  check('user_agent_length', sql`length(${table.userAgent}) <= 512`),
  check('affidability_range',sql`${table.affidabilityScore} >= 0 AND ${table.affidabilityScore} <= 5`),
])

// ═══════════════════════════════════
// aviabilities
// ═══════════════════════════════════
// Ogni utente pubblica quello che può offrire.
// Scade automaticamente 10 giorni dopo la pubblicazione (expiresAt).
// Lo status segue il ciclo:
//   open → offered → confirmed → completed → (review_requested generato)
//                └→ cancelled
export const aviabilities = sqliteTable('aviabilities', {
  id:          integer('id').primaryKey({ autoIncrement: true }),
  userId:      integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  // ── contenuto ────────────────────────────────────────────────
  title:       text('title').notNull(),        // titolo breve dell'offerta (max 80 char)
  description: text('description').notNull(), // descrizione dettagliata (max 1000 char)
  // cosa vuole in cambio — può essere vuoto ("offro gratis") o specificato
  wantInReturn: text('want_in_return'),        // max 300 char

  // ── modalità ─────────────────────────────────────────────────
  // remoto = online / fisico = in presenza
  mode:        text('mode', { enum: ['remote', 'physical', 'both'] }).notNull().default('both'),
  // city/area per le offerte fisiche (opzionale se mode = remote)
  location:    text('location'),               // es. "Roma, Prati" — max 100 char

  // ── categorie (roadmap: sport, music, talent, events) ────────
  category: text('category', {
    enum: ['skills', 'language', 'tech', 'sport', 'music', 'talent_magic', 'event', 'other'],
  }).notNull().default('other'),

  // ── lifecycle ────────────────────────────────────────────────
  //   open        → pubblicata, riceve offerte
  //   offered     → almeno 1 offerta ricevuta
  //   confirmed   → offerta accettata dal publisher + confermata dall'offerente
  //   completed   → scambio avvenuto, review_request generata
  //   expired     → scaduta senza match (dopo 10gg)
  //   cancelled   → cancellata manualmente
  status: text('status', {
    enum: ['open', 'offered', 'confirmed', 'completed', 'expired', 'cancelled'],
  }).notNull().default('open'),

  // ── date ─────────────────────────────────────────────────────
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  // expiresAt = createdAt + 10 giorni, calcolato lato app al momento dell'inserimento
  expiresAt: text('expires_at').notNull(),
  removedAt: text('removed_at'),              // quando viene rimossa/cancelled
}, (table) => [
  check('title_length',       sql`length(${table.title}) <= 80`),
  check('description_length', sql`length(${table.description}) <= 1000`),
  check('want_in_return_length', sql`length(${table.wantInReturn}) <= 300`),
  check('location_length',    sql`length(${table.location}) <= 100`),
])

// ═══════════════════════════════════
// aviability_offers
// ═══════════════════════════════════
// Offerte fatte su una Aviability.
// Nessun limite di offerte — più circolano, più il sistema vive.
// Tutto è pubblico — niente chat privata finché non c'è match.
// Status:
//   pending   → offerta inviata, in attesa risposta del publisher
//   accepted  → publisher ha accettato → si passa alla conferma bilaterale
//   declined  → publisher ha rifiutato
//   withdrawn → l'offerente ha ritirato l'offerta
export const aviabilityOffers = sqliteTable('aviability_offers', {
  id:            integer('id').primaryKey({ autoIncrement: true }),
  aviabilityId:  integer('aviability_id').notNull().references(() => aviabilities.id, { onDelete: 'cascade' }),
  offererId:     integer('offerer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  // messaggio pubblico dell'offerente — cosa propone in cambio
  message:       text('message').notNull(),   // max 500 char
  // cosa offre concretamente (può differire dal want_in_return del publisher)
  offerDetail:   text('offer_detail'),        // max 300 char

  // modalità preferita dall'offerente (deve essere compatibile con l'Aviability)
  preferredMode: text('preferred_mode', { enum: ['remote', 'physical'] }),

  status: text('status', {
    enum: ['pending', 'accepted', 'declined', 'withdrawn'],
  }).notNull().default('pending'),

  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
}, (table) => [
  check('message_length',      sql`length(${table.message}) <= 500`),
  check('offer_detail_length', sql`length(${table.offerDetail}) <= 300`),
])

// ═══════════════════════════════════
// exchange_confirmations
// ═══════════════════════════════════
// Dopo che il publisher accetta un'offerta, entrambi devono confermare.
// Solo quando ENTRAMBI confermano → lo scambio è locked e si genera la review_request.
// publisherConfirmed + offererConfirmed = true → trigger app per creare review_requests
export const exchangeConfirmations = sqliteTable('exchange_confirmations', {
  id:           integer('id').primaryKey({ autoIncrement: true }),
  aviabilityId: integer('aviability_id').notNull().references(() => aviabilities.id, { onDelete: 'cascade' }),
  offerId:      integer('offer_id').notNull().references(() => aviabilityOffers.id, { onDelete: 'cascade' }),

  publisherConfirmed:   integer('publisher_confirmed',   { mode: 'boolean' }).notNull().default(false),
  offererConfirmed:     integer('offerer_confirmed',     { mode: 'boolean' }).notNull().default(false),
  publisherConfirmedAt: text('publisher_confirmed_at'),
  offererConfirmedAt:   text('offerer_confirmed_at'),

  // locked = true quando entrambi hanno confermato → immutabile
  locked:    integer('locked', { mode: 'boolean' }).notNull().default(false),
  lockedAt:  text('locked_at'),

  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
})

// ═══════════════════════════════════
// review_requests
// ═══════════════════════════════════
// Generata automaticamente per ENTRAMBI gli utenti dopo che l'exchange è locked.
// È obbligatoria:
//   - se hai review_request pendenti NON puoi fare nuove offerte
//   - dopo `expiresAt` la review_request diventa `overdue` e l'utente viene bloccato
//     finché non la completa (o viene gestita da staff)
// Status:
//   pending   → in attesa di review
//   completed → review lasciata
//   overdue   → scaduta senza review → utente bloccato sulle nuove offerte
export const reviewRequests = sqliteTable('review_requests', {
  id:             integer('id').primaryKey({ autoIncrement: true }),
  exchangeId:     integer('exchange_id').notNull().references(() => exchangeConfirmations.id, { onDelete: 'cascade' }),
  // l'utente a cui viene chiesta la review
  reviewerId:     integer('reviewer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  // l'utente che viene recensito
  reviewedUserId: integer('reviewed_user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  status: text('status', {
    enum: ['pending', 'completed', 'overdue'],
  }).notNull().default('pending'),

  // scade 7 giorni dopo la creazione — dopo questa data → overdue
  expiresAt:   text('expires_at').notNull(),
  completedAt: text('completed_at'),
  createdAt:   text('created_at').notNull().default(sql`(datetime('now'))`),
})

// ═══════════════════════════════════
// reviews
// ═══════════════════════════════════
// La review vera e propria, compilata in risposta a una review_request.
// rating: 1-5 stelle → contribuisce all'affidability_score dell'utente recensito.
export const reviews = sqliteTable('reviews', {
  id:              integer('id').primaryKey({ autoIncrement: true }),
  reviewRequestId: integer('review_request_id').notNull().references(() => reviewRequests.id, { onDelete: 'cascade' }),
  reviewerId:      integer('reviewer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  reviewedUserId:  integer('reviewed_user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  rating:  integer('rating').notNull(),          // 1-5
  comment: text('comment'),                      // max 500 char, opzionale

  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
}, (table) => [
  check('rating_range',    sql`${table.rating} >= 1 AND ${table.rating} <= 5`),
  check('comment_length',  sql`length(${table.comment}) <= 500`),
])

// ═══════════════════════════════════
// exchange_messages
// ═══════════════════════════════════
// Messaggi privati tra publisher e offerente dopo che lo scambio è confermato.
// Solo testo, max 1000 char.
// readAt: null = non letto, stringa = timestamp lettura
export const exchangeMessages = sqliteTable('exchange_messages', {
  id:         integer('id').primaryKey({ autoIncrement: true }),
  exchangeId: integer('exchange_id').notNull().references(() => exchangeConfirmations.id, { onDelete: 'cascade' }),
  senderId:   integer('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  message:    text('message').notNull(),
  readAt:     text('read_at'),
  createdAt:  text('created_at').notNull().default(sql`(datetime('now'))`),
}, (table) => [
  check('message_length', sql`length(${table.message}) <= 1000`),
])

export const exchangeMessagesRelations = relations(exchangeMessages, ({ one }) => ({
  exchange: one(exchangeConfirmations, {
    fields:     [exchangeMessages.exchangeId],
    references: [exchangeConfirmations.id],
  }),
  sender: one(users, {
    fields:     [exchangeMessages.senderId],
    references: [users.id],
  }),
}))

// ═══════════════════════════════════
// magic_links
// ═══════════════════════════════════
export const magicLinks = sqliteTable('magic_links', {
  id:        text('id').primaryKey(),
  email:     text('email').notNull(),
  token:     text('token').notNull().unique(),
  expiresAt: text('expires_at').notNull(),
  used:      integer('used', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
})

// ═══════════════════════════════════
// sessions
// ═══════════════════════════════════
export const sessions = sqliteTable('sessions', {
  id:          text('id').primaryKey(),
  userId:      integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token').notNull(),
  expiresAt:   text('expires_at').notNull(),
  createdAt:   text('created_at').notNull().default(sql`(datetime('now'))`),
  isValid:     integer('is_valid', { mode: 'boolean' }).notNull().default(true),
})

// ═══════════════════════════════════
// RELATIONS
// ═══════════════════════════════════

export const usersRelations = relations(users, ({ many }) => ({
  sessions:              many(sessions),
  aviabilities:          many(aviabilities),
  offers:                many(aviabilityOffers),
  reviewRequestsGiven:   many(reviewRequests, { relationName: 'reviewer' }),
  reviewRequestsReceived:many(reviewRequests, { relationName: 'reviewedUser' }),
  reviewsGiven:          many(reviews, { relationName: 'reviewer' }),
  reviewsReceived:       many(reviews, { relationName: 'reviewedUser' }),
  messages: many(exchangeMessages),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const aviabilitiesRelations = relations(aviabilities, ({ one, many }) => ({
  user:         one(users, { fields: [aviabilities.userId], references: [users.id] }),
  offers:       many(aviabilityOffers),
  confirmation: many(exchangeConfirmations),
}))

export const aviabilityOffersRelations = relations(aviabilityOffers, ({ one, many }) => ({
  aviability:   one(aviabilities, { fields: [aviabilityOffers.aviabilityId], references: [aviabilities.id] }),
  offerer:      one(users,        { fields: [aviabilityOffers.offererId],    references: [users.id] }),
  confirmation: many(exchangeConfirmations),
}))

export const exchangeConfirmationsRelations = relations(exchangeConfirmations, ({ one, many }) => ({
  aviability:     one(aviabilities,     { fields: [exchangeConfirmations.aviabilityId], references: [aviabilities.id] }),
  offer:          one(aviabilityOffers, { fields: [exchangeConfirmations.offerId],       references: [aviabilityOffers.id] }),
  reviewRequests: many(reviewRequests),
  messages:        many(exchangeMessages), // ← aggiunto
}))

export const reviewRequestsRelations = relations(reviewRequests, ({ one }) => ({
  exchange:    one(exchangeConfirmations, { fields: [reviewRequests.exchangeId],     references: [exchangeConfirmations.id] }),
  reviewer:    one(users, { relationName: 'reviewer',    fields: [reviewRequests.reviewerId],     references: [users.id] }),
  reviewedUser:one(users, { relationName: 'reviewedUser',fields: [reviewRequests.reviewedUserId], references: [users.id] }),
  review:      one(reviews, { fields: [reviewRequests.id], references: [reviews.reviewRequestId] }),
}))

export const reviewsRelations = relations(reviews, ({ one }) => ({
  reviewRequest: one(reviewRequests, { fields: [reviews.reviewRequestId], references: [reviewRequests.id] }),
  reviewer:      one(users, { relationName: 'reviewer',    fields: [reviews.reviewerId],     references: [users.id] }),
  reviewedUser:  one(users, { relationName: 'reviewedUser',fields: [reviews.reviewedUserId], references: [users.id] }),
}))