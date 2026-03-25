// ─────────────────────────────────────────────────────────────────────────────
// types/aviability.types.ts
// Generati dallo schema DB — usare questi tipi in tutto il frontend.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Enums ───────────────────────────────────────────────────────────────────

export type AviabilityMode     = 'remote' | 'physical' | 'both'
export type AviabilityCategory = 'skills' | 'language' | 'tech' | 'sport' | 'music' | 'talent_magic' | 'event' | 'other'
export type AviabilityStatus   = 'open' | 'offered' | 'confirmed' | 'completed' | 'expired' | 'cancelled'

export type OfferStatus        = 'pending' | 'accepted' | 'declined' | 'withdrawn'
export type OfferPreferredMode = 'remote' | 'physical'

export type ReviewRequestStatus = 'pending' | 'completed' | 'overdue'

export type UserRole = 'user' | 'staff' | 'admin'

// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  id:                number
  email:             string
  verifiedEmail:     boolean
  name:              string
  givenName:         string
  familyName:        string
  picture:           string
  locale:            string
  handle:            string | null
  bio:               string | null
  affidabilityScore: number
  reviewCount:       number
  role:              UserRole
  createdAt:         string
}

/** Profilo pubblico — dati esposti nelle card e nelle pagine utente */
export interface PublicUser {
  id:                number
  name:              string
  handle:            string | null
  picture:           string
  bio:               string | null
  affidabilityScore: number
  reviewCount:       number
}

// ─── Aviability ──────────────────────────────────────────────────────────────

export interface Aviability {
  id:           number
  userId:       number
  title:        string
  description:  string
  wantInReturn: string | null
  mode:         AviabilityMode
  location:     string | null
  category:     AviabilityCategory
  status:       AviabilityStatus
  createdAt:    string
  expiresAt:    string
  removedAt:    string | null
}

/** Aviability con il profilo pubblico dell'autore — usato nelle liste/card */
export interface AviabilityWithUser extends Aviability {
  user: PublicUser
}

/** Aviability completa con offerte incluse — usato nella pagina di dettaglio */
export interface AviabilityDetail extends AviabilityWithUser {
  offers: OfferWithOfferer[]
}

// ─── Aviability Offer ────────────────────────────────────────────────────────

export interface AviabilityOffer {
  id:            number
  aviabilityId:  number
  offererId:     number
  message:       string
  offerDetail:   string | null
  preferredMode: OfferPreferredMode | null
  status:        OfferStatus
  createdAt:     string
  updatedAt:     string
}

/** Offerta con il profilo pubblico dell'offerente */
export interface OfferWithOfferer extends AviabilityOffer {
  offerer: PublicUser
}

/** Offerta con la sua Aviability di riferimento — utile nella dashboard utente */
export interface OfferWithAviability extends AviabilityOffer {
  aviability: Aviability
}

// ─── Exchange Confirmation ───────────────────────────────────────────────────

export interface ExchangeConfirmation {
  id:                   number
  aviabilityId:         number
  offerId:              number
  publisherConfirmed:   boolean
  offererConfirmed:     boolean
  publisherConfirmedAt: string | null
  offererConfirmedAt:   string | null
  locked:               boolean
  lockedAt:             string | null
  createdAt:            string
}

export interface ExchangeConfirmationDetail extends ExchangeConfirmation {
  aviability: Aviability
  offer:      OfferWithOfferer
}

// ─── Review Request ──────────────────────────────────────────────────────────

export interface ReviewRequest {
  id:             number
  exchangeId:     number
  reviewerId:     number
  reviewedUserId: number
  status:         ReviewRequestStatus
  expiresAt:      string
  completedAt:    string | null
  createdAt:      string
}

export interface ReviewRequestWithUsers extends ReviewRequest {
  reviewer:     PublicUser
  reviewedUser: PublicUser
}

/** Review request con tutto il contesto — usato nella pagina "lascia recensione" */
export interface ReviewRequestDetail extends ReviewRequestWithUsers {
  exchange: ExchangeConfirmationDetail
}

// ─── Review ──────────────────────────────────────────────────────────────────

export interface Review {
  id:              number
  reviewRequestId: number
  reviewerId:      number
  reviewedUserId:  number
  rating:          1 | 2 | 3 | 4 | 5
  comment:         string | null
  createdAt:       string
}

export interface ReviewWithUsers extends Review {
  reviewer:     PublicUser
  reviewedUser: PublicUser
}

// ─── Magic Link ──────────────────────────────────────────────────────────────

export interface MagicLink {
  id:        string
  email:     string
  expiresAt: string
  used:      boolean
  createdAt: string
}

// ─── Session ─────────────────────────────────────────────────────────────────

export interface Session {
  id:          string
  userId:      number
  expiresAt:   string
  createdAt:   string
  isValid:     boolean
}

// ─── API payloads ─────────────────────────────────────────────────────────────
// DTO in uscita dal frontend verso il backend.

export interface CreateAviabilityDto {
  title:        string
  description:  string
  wantInReturn?: string
  mode:         AviabilityMode
  location?:    string
  category:     AviabilityCategory
}

export interface UpdateAviabilityDto extends Partial<CreateAviabilityDto> {
  status?: Extract<AviabilityStatus, 'cancelled'>
}

export interface CreateOfferDto {
  aviabilityId:   number
  message:        string
  offerDetail?:   string
  preferredMode?: OfferPreferredMode
}

export interface ConfirmExchangeDto {
  exchangeId: number
}

export interface CreateReviewDto {
  reviewRequestId: number
  rating:          1 | 2 | 3 | 4 | 5
  comment?:        string
}

// ─── API responses ────────────────────────────────────────────────────────────
// Wrapper generici per le risposte paginate e singole.

export interface PaginatedResponse<T> {
  data:    T[]
  total:   number
  page:    number
  perPage: number
}

export interface ApiResponse<T> {
  data:    T
  message?: string
}