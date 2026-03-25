import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import {
  users,
  sessions,
  magicLinks,
  aviabilities,
  aviabilityOffers,
  exchangeConfirmations,
  reviewRequests,
  reviews,
} from '../../../config/schema'

// ── users ────────────────────────────────────────────────────
export type Users          = InferSelectModel<typeof users>
export type CreateUsersDto = InferInsertModel<typeof users>

// ── Magic Link ────────────────────────────────────────────────────
export type MagicLink = InferSelectModel<typeof magicLinks>
export type CreateMagiLinkDto = InferInsertModel<typeof magicLinks>

// ── sessions ─────────────────────────────────────────────────
export type Sessions          = InferSelectModel<typeof sessions>
export type CreateSessionsDto = InferInsertModel<typeof sessions>

// ── magic links ──────────────────────────────────────────────
export type MagicLinks          = InferSelectModel<typeof magicLinks>
export type CreateMagicLinksDto = InferInsertModel<typeof magicLinks>

// ── aviabilities ─────────────────────────────────────────────
export type Aviabilities          = InferSelectModel<typeof aviabilities>
export type CreateAviabilitiesDto = InferInsertModel<typeof aviabilities>

// ── aviability offers ────────────────────────────────────────
export type AviabilityOffers          = InferSelectModel<typeof aviabilityOffers>
export type CreateAviabilityOffersDto = InferInsertModel<typeof aviabilityOffers>

// ── exchange confirmations ───────────────────────────────────
export type ExchangeConfirmations          = InferSelectModel<typeof exchangeConfirmations>
export type CreateExchangeConfirmationsDto = InferInsertModel<typeof exchangeConfirmations>

// ── review requests ──────────────────────────────────────────
export type ReviewRequests          = InferSelectModel<typeof reviewRequests>
export type CreateReviewRequestsDto = InferInsertModel<typeof reviewRequests>

// ── reviews ──────────────────────────────────────────────────
export type Reviews          = InferSelectModel<typeof reviews>
export type CreateReviewsDto = InferInsertModel<typeof reviews>


// ── composite types ──────────────────────────────────────────

export type PublicUser = Pick<
  Users,
  'id' | 'name' | 'handle' | 'picture' | 'affidabilityScore' | 'reviewCount'
>

export type AviabilitiesWithUser = Aviabilities & {
  user: PublicUser
}

export type AviabilityOfferWithOfferer = AviabilityOffers & {
  offerer: PublicUser
}

export type AviabilitiesDetail = AviabilitiesWithUser & {
  offers: AviabilityOfferWithOfferer[]
}

export type ExchangeConfirmationDetail = ExchangeConfirmations & {
  aviability: AviabilitiesWithUser
  offer:      AviabilityOfferWithOfferer
}

export type ReviewRequestWithUsers = ReviewRequests & {
  reviewer:     PublicUser
  reviewedUser: PublicUser
}