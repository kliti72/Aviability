# Aviability

> **Switch your availability with others.**

Aviability is a platform where you publish what you can offer — and find what you need in return. 
No money. 
No algorithms. 

Just people exchanging availability.

---

## What is Aviability?

Most platforms connect people through money. 

Aviability connects people through **time and skills**.

You have something to offer — a language lesson, a ride, a coding session, company on Discord. 
Someone else has something you need. You match. You exchange. That's it.

---

## Core Loop

```
Publish → Offer → Match
```

1. **Publish** — Post what you're available for
2. **Offer** — Browse and make an offer on someone else's availability
3. **Match** — Both confirm → the exchange happens

---

## Features

- 📌 **Publish your availability** — anything you can offer: skills, time, presence, services
- 🔍 **Browse & offer** — find what you need and propose an exchange
- 🤝 **Match system** — both parties confirm before the exchange is locked
- ⭐ **Affidability Score** — after each exchange, both users leave a review. Your score reflects how many people had a good experience with you
- 🔐 **Auth** — Google OAuth + Magic Link login, session management, role-based access

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (App Router) |
| Backend | Elysia + Bun |
| ORM | Drizzle ORM |
| Database | SQLite |
| Auth | Google OAuth, Magic Link, Email Verification |
| Deploy | GitHub Actions → VPS |
---

## Roadmap

- [x] Core publish / offer / match flow
- [x] Affidability Score (post-exchange reviews)
- [x] Authentication (Google OAuth + Magic Link)
- [ ] Real-time notifications
- [ ] Categories & search filters
- [ ] Events — create a gathering, reward participants
- [ ] Mobile app

---

## Philosophy

> In a world optimized for transactions, Aviability ids optimize for **people**.
> Your availability has value. Someone out there needs exactly what you can offer.