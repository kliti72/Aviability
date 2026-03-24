
## Philosophy

> In a world optimized for transactions, Aviability ids optimize for **people**.
> Your availability has value. Someone out there needs exactly what you can offer.
> **Switch your availability with others.**

---

Aviability is a platform where you publish what you can offer — and find what you need in return. 

- No money. 
- No algorithms. 

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


## ToDo
Aggiungere la sezione sport, insegnare strumenti o altro per sport o passione
Aggiungere anche la sezione Talent o Magic, insegnare trucchi di magia
Aggiungere la Sezione anche Music, dove utenti possono pubblicare testi o farsi aiutare a produrrere musica
Aggiungere la sezione Event, Eventi in cui unirsi per città, con form di registrazione all'evento


## Style Prompt For Component

Stile Aviability — Next.js, inline styles, niente CSS framework.
Palette: bg #fafffe, dark #0a1628, primary green #059669, accent #34d399/#6ee7b7, grigi #4b5563/#6b7280, card bg #fff, borders verdi #bbf7d0/#d1fae5.
Typography: fontWeight 800 titoli / 700 label / 600 secondary. Letter-spacing -0.03em/-0.04em sui titoli. clamp() per fluid sizing. Badge uppercase 13px con letterSpacing: 0.06em.
Cards: borderRadius: 24px, border #bbf7d0 o #e5e7eb, boxShadow: 0 4px 20px rgba(5,150,105,0.07), hover translateY(-4px) + shadow più intenso.
Buttons: primario = gradiente #059669→#10b981, borderRadius: 14px, shadow verde. Outline = bg bianco, border #d1d5db, hover bg #f0fdf4.
Animations: fadeUp (opacity+translateY 28px), fadeIn, stagger con delay incrementale. Hover transition: 0.18–0.2s ease.
Sezioni dark: gradiente #064e3b→#047857 con radial-gradient overlay verde semitrasparente.
Decorazioni: floating dots pulse-dot, watermark numeri in background, badge pillola border-radius: 999px.
Il componente deve essere "use client", usare Link da Next.js per i link, nessuna dipendenza esterna.

---
