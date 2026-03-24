import { eq, and } from 'drizzle-orm'
import { reviewRequests, reviews } from '../../config/schema'
import type { CreateReviewRequestsDto, CreateReviewsDto, ReviewRequests, Reviews } from '../types/auth/types'
import { db } from '../../config/database'

// ── review requests ───────────────────────────────────────────

export function findRequestById(id: number): ReviewRequests | undefined {
  return db.select().from(reviewRequests).where(eq(reviewRequests.id, id)).get()
}

export function findPendingByReviewerId(reviewerId: number): ReviewRequests[] {
  return db.select().from(reviewRequests)
    .where(and(eq(reviewRequests.reviewerId, reviewerId), eq(reviewRequests.status, 'pending')))
    .all()
}

export function findOverdueByReviewerId(reviewerId: number): ReviewRequests[] {
  return db.select().from(reviewRequests)
    .where(and(eq(reviewRequests.reviewerId, reviewerId), eq(reviewRequests.status, 'overdue')))
    .all()
}

export function insertRequest(dto: CreateReviewRequestsDto): ReviewRequests {
  return db.insert(reviewRequests).values(dto).returning().get()!
}

export function updateRequest(id: number, dto: Partial<CreateReviewRequestsDto>): ReviewRequests | undefined {
  return db.update(reviewRequests).set(dto).where(eq(reviewRequests.id, id)).returning().get()
}

// ── reviews ───────────────────────────────────────────────────

export function findReviewById(id: number): Reviews | undefined {
  return db.select().from(reviews).where(eq(reviews.id, id)).get()
}

export function findReviewsByReviewedUserId(reviewedUserId: number): Reviews[] {
  return db.select().from(reviews).where(eq(reviews.reviewedUserId, reviewedUserId)).all()
}

export function insertReview(dto: CreateReviewsDto): Reviews {
  return db.insert(reviews).values(dto).returning().get()!
}
