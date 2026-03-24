// NOT EDIT MUCH THIS FILE, USE ONLY WITH Elysia-cli
// https://github.com/kliti72/elysia-cli

import { sqliteTable, integer, text, check } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password'),
  verifiedEmail: integer('verified_email', { mode: 'boolean' }).notNull().default(false),
  name: text('name').notNull(),
  givenName: text('given_name').notNull(),
  familyName: text('family_name').notNull(),
  picture: text('picture').notNull(),
  locale: text('locale').notNull(),
  handle: text('handle').unique(),
  bio: text('bio'),
  role: text('role', { enum: ['user', 'staff', 'admin'] }).notNull().default('user'), 
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
}, (table) => [
  check('bio_length', sql`length(${table.bio}) <= 300`),
])

// Ci sono anche informazioni dell'utente, indirizzo ip,
// deve essere tutto a norma legale, criptazione dei dati sensibili
// e limiti di input chiari per ogni colonna


// Qui ogni utente deve avere le Aviability
// C'è da definire lo schema delle Avviability
// L'aviability ha data di inserimento
// Data di rimozione (10 giorni dopo la pubblicazione)
// Status Chi richiede richiede remoto o fisico
// Status Fisico o Remota
// slag descrizione, cosa vuole l'utente in cambio di questo scambio
// chi cerca, se è remoto o fisico
// Se accetta un scambio solo remoto o fisico
// c'è da definire meglio
// status dopo che l'offerente ha accettato,
// anche l'utente deve confermare la sua accettazione
// dopo la seconda accettazione bisogna creare la review request

// Poi si deve essere Aviability_offers
// le offerte fatte per ogni Aviability
// Ogni utente può fare al massimo 2 offerte per lo scambio
// Tutto il contenuto è pubblico niente chat privata.
// Solo quando ci si mette d'accordo con lo scambio
// status se è stata accettata (viene accettata dall'utente che ha creato l'Aviability)

// Poi viene creato la Review_request
// Viene creata nel momento in cui un utente accetta uno scambio
// A ogni utente viene chiesto la review,
// Deve essere obbligatoria, se si hanno delle review in sospese
// l'utente non deve poter scrivere altre offerte
// deve essere prima invitato a lasciare la recensione di quella vecchia
// Dovrà essere bloccatodopo tot giorni che la review è stata aperta ed è scaduta.


export const magicLinks = sqliteTable('magic_links', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  token: text('token').notNull().unique(),
  expiresAt: text('expires_at').notNull(),
  used: integer('used', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
})

// ═══════════════════════════════════
// sessions
// ═══════════════════════════════════
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token').notNull(),
  expiresAt: text('expires_at').notNull(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  isValid: integer('is_valid', { mode: 'boolean' }).notNull().default(true),
})

// Relations — drizzle le vuole esplicite frat
export const usersRelations = relations(users, ({ many }) => ({
  sessions:    many(sessions),
}))


export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))




