"use client";

/**
 * How It Works — Landing page /landing/how-it-works
 * Aviability — scambio di tempo e competenze
 *
 * Sezioni:
 * 1. Hero
 * 2. Il Loop (Publish → Offer → Match)
 * 3. Step-by-step dettagliato
 * 4. Affidability Score
 * 5. FAQ
 * 6. CTA
 */

import Link from "next/link";

/* ─────────────────────────────────────────── DATA ── */

const LOOP_STEPS = [
  {
    number: "01",
    title: "Publish",
    subtitle: "Dì al mondo cosa puoi offrire",
    description:
      "Crea la tua disponibilità in pochi secondi. Una lezione di chitarra, un passaggio in macchina, una sessione di revisione CV, compagnia su Discord. Qualunque cosa tu possa dare — c'è qualcuno che ne ha bisogno.",
    detail:
      "Scegli categoria, durata, modalità (online/presenza) e pubblica. Niente tariffe, niente prezzi. Solo la tua disponibilità.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="7" y="5" width="22" height="26" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 12h12M12 18h12M12 24h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="27" cy="9" r="5.5" fill="#059669" stroke="#fff" strokeWidth="1.5"/>
        <path d="M25 9l1.5 1.5L28.5 7.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "#059669",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    tags: ["Skill", "Tempo", "Presenza", "Servizi"],
  },
  {
    number: "02",
    title: "Offer",
    subtitle: "Trova ciò di cui hai bisogno",
    description:
      "Sfoglia le disponibilità degli altri utenti. Filtra per categoria, distanza o modalità. Quando trovi qualcosa che ti interessa, proponi uno scambio diretto — nessun intermediario, nessuna piattaforma che si prende una percentuale.",
    detail:
      "La tua proposta include cosa offri in cambio. Lo scambio deve essere reciproco: entrambi date qualcosa, entrambi ricevete qualcosa.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="15" cy="15" r="9" stroke="currentColor" strokeWidth="2"/>
        <path d="M22 22l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 15h6M15 12v6" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
    tags: ["Browse", "Filtra", "Proponi"],
  },
  {
    number: "03",
    title: "Match",
    subtitle: "Entrambi confermano, lo scambio avviene",
    description:
      "Solo quando entrambe le parti accettano, lo scambio viene confermato. Potete accordarvi su data, ora e modalità direttamente in chat. Nessun obbligo prima della conferma reciproca.",
    detail:
      "Dopo lo scambio, entrambe le parti lasciano una recensione. Il tuo Affidability Score cresce con ogni esperienza positiva.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="12" cy="18" r="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="24" cy="18" r="6" stroke="currentColor" strokeWidth="2"/>
        <path d="M17 18h2" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 12l-4-4M8 24l-4 4M28 12l4-4M28 24l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
      </svg>
    ),
    color: "#047857",
    bg: "#ecfdf5",
    border: "#6ee7b7",
    tags: ["Conferma", "Chat", "Scambio"],
  },
];

const DETAILED_STEPS = [
  {
    n: "1",
    title: "Crea il tuo profilo",
    desc: "Registrati con Google o Magic Link. Il tuo profilo mostra le tue competenze, la tua disponibilità e il tuo Affidability Score. Più scambi fai, più il profilo diventa ricco.",
    note: "< 2 minuti",
    icon: "👤",
  },
  {
    n: "2",
    title: "Pubblica una disponibilità",
    desc: "Clicca su \"Pubblica\", scegli la categoria (skill, tempo, presenza, servizio), aggiungi una descrizione chiara e scegli la modalità: online, in presenza, o entrambe.",
    note: "30 secondi",
    icon: "📌",
  },
  {
    n: "3",
    title: "Esplora e fai un'offerta",
    desc: "Naviga il feed delle disponibilità. Quando trovi qualcosa di interessante, clicca \"Offri\" e proponi cosa puoi dare in cambio. L'altra persona riceve una notifica.",
    note: "Quando vuoi",
    icon: "🔍",
  },
  {
    n: "4",
    title: "Negozia in chat",
    desc: "Parlate direttamente. Accordatevi su data, ora, durata e modalità. Se non vi trovate, nessun problema — nessuno è obbligato ad accettare.",
    note: "Libero",
    icon: "💬",
  },
  {
    n: "5",
    title: "Conferma il match",
    desc: "Quando entrambi siete pronti, confermate lo scambio. Il sistema blocca la disponibilità e invia un reminder prima dell'appuntamento.",
    note: "Doppia conferma",
    icon: "✅",
  },
  {
    n: "6",
    title: "Scambia e recensisci",
    desc: "Fate lo scambio. Dopo, lasciate una recensione reciproca — breve, onesta. Il vostro Affidability Score si aggiorna automaticamente.",
    note: "Post-scambio",
    icon: "⭐",
  },
];

const FAQS = [
  {
    q: "Aviability è gratuita?",
    a: "Sì, completamente. Aviability non prende commissioni, non ha piani premium per le funzioni base, non vende i tuoi dati. Il modello è diverso: il valore lo create voi, scambiando.",
  },
  {
    q: "Cosa posso offrire?",
    a: "Qualunque cosa tu possa dare: competenze (lingue, coding, grafica, cucina), tempo (accompagnare qualcuno, fare commissioni), presenza (compagnia, supporto morale), servizi (riparazioni, pet sitting, giardinaggio).",
  },
  {
    q: "Come funziona lo scambio se le cose non hanno lo stesso valore?",
    a: "Aviability non assegna un valore monetario a niente. Siete voi a negoziare. Se un'ora di lezione di inglese vale per te quanto un passaggio all'aeroporto, lo scambio è equo. Il valore è soggettivo.",
  },
  {
    q: "Cosa succede se qualcuno non si presenta?",
    a: "Puoi lasciare una recensione negativa. L'Affidability Score riflette la storia degli scambi: chi accumula esperienze negative diventa meno visibile sul feed. La community si autoregola.",
  },
  {
    q: "Lo scambio deve essere simultaneo?",
    a: "No. Puoi fare uno scambio oggi e l'altro la settimana prossima. L'importante è che entrambe le disponibilità vengano segnate come completate.",
  },
  {
    q: "È disponibile solo in Italia?",
    a: "Per ora il focus è sul mercato italiano, ma Aviability funziona ovunque. Gli scambi online non hanno confini geografici.",
  },
];

/* ─────────────────────────────────────────── PAGE ── */

export default function HowItWorksPage() {
  return (
    <div style={{ background: "#fafffe", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .av-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .av-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(5,150,105,0.14) !important;
        }
        .av-feature-card {
          transition: background 0.18s, border-color 0.18s, transform 0.18s;
        }
        .av-feature-card:hover {
          background: #f0fdf4 !important;
          border-color: #6ee7b7 !important;
          transform: translateY(-2px);
        }
        .av-faq-item {
          transition: border-color 0.18s, background 0.18s;
        }
        .av-faq-item:hover {
          border-color: #6ee7b7 !important;
          background: #f0fdf4 !important;
        }
        .av-cta-btn {
          transition: box-shadow 0.18s, opacity 0.18s, transform 0.18s;
        }
        .av-cta-btn:hover {
          box-shadow: 0 8px 32px rgba(5,150,105,0.38) !important;
          transform: translateY(-2px);
        }
        .av-outline-btn {
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }
        .av-outline-btn:hover {
          background: #f0fdf4 !important;
          border-color: #6ee7b7 !important;
          color: #059669 !important;
        }
        .av-step-number {
          background: linear-gradient(135deg, #059669, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .av-tag {
          transition: background 0.15s;
        }
        .av-tag:hover {
          background: #d1fae5 !important;
        }
      `}</style>

      {/* ── HERO ────────────────────────────── */}
      <section
        style={{
          position: "relative",
          padding: "110px 24px 90px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Radial bg */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(5,150,105,0.11) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Floating dots */}
        {[
          { top: "15%", left: "6%",   size: 8,  delay: "0s"   },
          { top: "65%", left: "4%",   size: 5,  delay: "0.6s" },
          { top: "25%", right: "6%",  size: 6,  delay: "0.3s" },
          { top: "72%", right: "8%",  size: 9,  delay: "0.9s" },
          { top: "45%", left: "12%",  size: 4,  delay: "1.2s" },
          { top: "38%", right: "14%", size: 4,  delay: "1.5s" },
        ].map((d, i) => (
          <div key={i} aria-hidden style={{
            position: "absolute", top: d.top,
            left: (d as any).left, right: (d as any).right,
            width: d.size, height: d.size,
            borderRadius: "50%", background: "#059669",
            opacity: 0.22,
            animation: `pulse-dot 2.8s ease-in-out ${d.delay} infinite`,
          }} />
        ))}

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "#ecfdf5", border: "1px solid #6ee7b7",
          borderRadius: "999px", padding: "6px 18px",
          color: "#059669", fontSize: "13px", fontWeight: 600,
          letterSpacing: "0.06em", textTransform: "uppercase",
          marginBottom: "28px",
          animation: "fadeIn 0.6s ease both",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#059669" strokeWidth="1.5"/>
            <path d="M7 4v3.5l2 1.5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Come funziona
        </div>

        <h1 style={{
          fontSize: "clamp(42px, 7.5vw, 84px)",
          fontWeight: 800, lineHeight: 1.03,
          letterSpacing: "-0.04em", color: "#0a1628",
          maxWidth: "860px", margin: "0 auto 28px",
          animation: "fadeUp 0.7s ease 0.1s both",
        }}>
          Scambia il tuo{" "}
          <span style={{
            background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            tempo e le tue skill
          </span>
          <br />senza usare denaro.
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "#4b5563", maxWidth: "620px",
          margin: "0 auto 52px", lineHeight: 1.7,
          animation: "fadeUp 0.7s ease 0.2s both",
        }}>
          Aviability è una piattaforma di <strong style={{ color: "#059669" }}>baratto moderno</strong>:
          pubblichi cosa puoi offrire, trovi ciò di cui hai bisogno,
          e scambi direttamente con altre persone. Nessuna commissione, nessun algoritmo.
        </p>

        {/* Loop pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "#fff", border: "1px solid #d1fae5",
          borderRadius: "20px", padding: "16px 32px",
          boxShadow: "0 4px 24px rgba(5,150,105,0.10)",
          animation: "fadeUp 0.7s ease 0.35s both",
        }}>
          {["Publish", "Offer", "Match"].map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{
                fontWeight: 800, fontSize: "16px",
                color: "#059669", letterSpacing: "-0.02em",
              }}>{step}</span>
              {i < 2 && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.4 }}>
                  <path d="M5 10h10M12 6l4 4-4 4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
          <div style={{
            marginLeft: "12px", width: "28px", height: "28px",
            borderRadius: "50%", border: "2px dashed #6ee7b7",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "spin-slow 8s linear infinite",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6a4 4 0 1 1 4 4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 9V6h3" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "48px",
          flexWrap: "wrap", marginTop: "64px",
          animation: "fadeUp 0.7s ease 0.5s both",
        }}>
          {[
            { value: "0€", label: "Commissioni" },
            { value: "3", label: "Step per iniziare" },
            { value: "∞", label: "Tipo di scambi" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800,
                letterSpacing: "-0.04em", color: "#059669", lineHeight: 1,
              }}>{s.value}</div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── IL LOOP: 3 CARDS ─────────────────── */}
      <section style={{
        maxWidth: "1140px", margin: "0 auto",
        padding: "20px 24px 100px",
      }}>
        <div style={{
          textAlign: "center", marginBottom: "56px",
          animation: "fadeUp 0.6s ease both",
        }}>
          <p style={{
            fontSize: "13px", fontWeight: 700, color: "#059669",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px",
          }}>Il Loop</p>
          <h2 style={{
            fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: "#0a1628", lineHeight: 1.1,
          }}>
            Tre passi. Un ciclo infinito.
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}>
          {LOOP_STEPS.map((step, i) => (
            <div
              key={step.number}
              className="av-card"
              style={{
                background: "#fff",
                border: `1px solid ${step.border}`,
                borderRadius: "28px",
                padding: "40px 36px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(5,150,105,0.07)",
                animation: `fadeUp 0.6s ease ${0.1 + i * 0.15}s both`,
              }}
            >
              {/* Watermark */}
              <div aria-hidden style={{
                position: "absolute", bottom: "-28px", right: "-6px",
                fontSize: "130px", fontWeight: 900, color: step.bg,
                lineHeight: 1, userSelect: "none", letterSpacing: "-0.05em",
                filter: "saturate(1.4)",
              }}>
                {step.number}
              </div>

              {/* Step label */}
              <div className="av-step-number" style={{
                fontSize: "13px", fontWeight: 800,
                letterSpacing: "0.1em", marginBottom: "22px",
              }}>
                STEP {step.number}
              </div>

              {/* Icon */}
              <div style={{
                width: "68px", height: "68px",
                background: step.bg, border: `1px solid ${step.border}`,
                borderRadius: "18px", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: step.color, marginBottom: "26px",
              }}>
                {step.icon}
              </div>

              <h3 style={{
                fontSize: "28px", fontWeight: 800,
                letterSpacing: "-0.03em", color: "#0a1628",
                marginBottom: "6px", lineHeight: 1.1,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: "13px", fontWeight: 600,
                color: step.color, marginBottom: "16px", letterSpacing: "0.01em",
              }}>
                {step.subtitle}
              </p>
              <p style={{
                fontSize: "15px", color: "#4b5563",
                lineHeight: 1.65, marginBottom: "20px",
                position: "relative", zIndex: 1,
              }}>
                {step.description}
              </p>

              {/* Detail note */}
              <div style={{
                background: step.bg, borderRadius: "10px",
                padding: "12px 16px",
                fontSize: "13px", color: "#374151", lineHeight: 1.55,
                position: "relative", zIndex: 1,
              }}>
                {step.detail}
              </div>

              {/* Tags */}
              <div style={{ display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
                {step.tags.map(t => (
                  <span key={t} className="av-tag" style={{
                    background: "#f9fafb", border: "1px solid #e5e7eb",
                    borderRadius: "999px", padding: "4px 12px",
                    fontSize: "12px", fontWeight: 600, color: "#374151",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STEP BY STEP DETTAGLIATO ──────────── */}
      <section style={{
        background: "linear-gradient(180deg, #f8fffe 0%, #ecfdf5 100%)",
        padding: "100px 24px",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{
              fontSize: "13px", fontWeight: 700, color: "#059669",
              letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px",
            }}>Passo dopo passo</p>
            <h2 style={{
              fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 800,
              letterSpacing: "-0.04em", color: "#0a1628", lineHeight: 1.1,
            }}>
              Dal profilo al primo scambio.<br />
              <span style={{
                background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>In meno di 10 minuti.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {DETAILED_STEPS.map((s, i) => (
              <div
                key={s.n}
                className="av-feature-card"
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "20px",
                  padding: "28px",
                  display: "flex",
                  gap: "18px",
                  alignItems: "flex-start",
                  animation: `fadeUp 0.6s ease ${i * 0.08}s both`,
                }}
              >
                {/* Number + Icon */}
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    width: "52px", height: "52px",
                    background: "#f0fdf4", border: "1px solid #bbf7d0",
                    borderRadius: "14px", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "24px", marginBottom: "8px",
                  }}>
                    {s.icon}
                  </div>
                  <div style={{
                    fontSize: "11px", fontWeight: 800,
                    color: "#059669", letterSpacing: "0.08em",
                    textAlign: "center",
                  }}>
                    0{s.n}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h4 style={{
                      fontSize: "16px", fontWeight: 700,
                      color: "#0a1628", letterSpacing: "-0.01em",
                    }}>
                      {s.title}
                    </h4>
                    <span style={{
                      fontSize: "11px", fontWeight: 600,
                      color: "#059669", background: "#ecfdf5",
                      border: "1px solid #bbf7d0",
                      borderRadius: "999px", padding: "2px 10px",
                      whiteSpace: "nowrap", marginLeft: "8px",
                    }}>
                      {s.note}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AFFIDABILITY SCORE ───────────────── */}
      <section style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "100px 24px",
      }}>
        <div style={{
          background: "#fff",
          border: "1px solid #bbf7d0",
          borderRadius: "32px",
          padding: "clamp(40px, 6vw, 72px)",
          boxShadow: "0 8px 48px rgba(5,150,105,0.09)",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "48px",
          alignItems: "center",
        }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#fefce8", border: "1px solid #fde68a",
              borderRadius: "999px", padding: "5px 16px",
              fontSize: "12px", fontWeight: 700, color: "#92400e",
              letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "22px",
            }}>
              ⭐ Affidability Score
            </div>

            <h3 style={{
              fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800,
              color: "#0a1628", letterSpacing: "-0.03em",
              lineHeight: 1.15, marginBottom: "18px",
            }}>
              La tua reputazione si guadagna,<br />
              scambio dopo scambio.
            </h3>

            <p style={{
              fontSize: "16px", color: "#4b5563",
              lineHeight: 1.75, maxWidth: "520px", marginBottom: "28px",
            }}>
              Dopo ogni scambio, entrambe le parti lasciano una recensione. L'<strong style={{ color: "#059669" }}>Affidability Score</strong> è
              il cuore del sistema di fiducia di Aviability: riflette quante persone hanno avuto una buona
              esperienza con te. Non si compra, non si finge — si costruisce nel tempo.
            </p>

            {/* Score breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "380px" }}>
              {[
                { label: "Puntualità", pct: 95 },
                { label: "Qualità dello scambio", pct: 90 },
                { label: "Comunicazione", pct: 88 },
              ].map(({ label, pct }) => (
                <div key={label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>{label}</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#059669" }}>{pct}%</span>
                  </div>
                  <div style={{
                    height: "6px", background: "#e5e7eb",
                    borderRadius: "999px", overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", borderRadius: "999px",
                      background: "linear-gradient(90deg, #059669, #34d399)",
                      width: `${pct}%`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score donut */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "14px", flexShrink: 0,
          }}>
            <div style={{
              width: "136px", height: "136px", borderRadius: "50%",
              background: "conic-gradient(#059669 0% 87%, #e5e7eb 87% 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: "106px", height: "106px", borderRadius: "50%",
                background: "#fff", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontSize: "32px", fontWeight: 800,
                  color: "#059669", letterSpacing: "-0.04em",
                }}>4.9</span>
                <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600 }}>/ 5.0</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "3px" }}>
              {[1,2,3,4,5].map(s => (
                <span key={s} style={{ fontSize: "18px" }}>⭐</span>
              ))}
            </div>
            <p style={{ fontSize: "12px", color: "#6b7280", textAlign: "center", lineHeight: 1.5 }}>
              Basato su 42 scambi<br />
              <span style={{ color: "#059669", fontWeight: 600 }}>Top 5% su Aviability</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────── */}
      <section style={{
        maxWidth: "800px", margin: "0 auto",
        padding: "0 24px 100px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontSize: "13px", fontWeight: 700, color: "#059669",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px",
          }}>FAQ</p>
          <h2 style={{
            fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: "#0a1628", lineHeight: 1.1,
          }}>
            Domande frequenti
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="av-faq-item"
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "24px 28px",
                animation: `fadeUp 0.5s ease ${i * 0.07}s both`,
              }}
            >
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "8px",
                  background: "#ecfdf5", border: "1px solid #bbf7d0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: "1px",
                }}>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#059669" }}>?</span>
                </div>
                <div>
                  <p style={{
                    fontSize: "16px", fontWeight: 700,
                    color: "#0a1628", marginBottom: "10px", letterSpacing: "-0.01em",
                  }}>
                    {faq.q}
                  </p>
                  <p style={{
                    fontSize: "15px", color: "#4b5563", lineHeight: 1.7,
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section style={{
        padding: "0 24px 120px",
        textAlign: "center",
      }}>
        <div style={{
          maxWidth: "700px", margin: "0 auto",
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
          borderRadius: "32px", padding: "clamp(48px, 7vw, 80px) 48px",
          position: "relative", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(5,150,105,0.25)",
        }}>
          {/* Bg overlay */}
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(52,211,153,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(5,150,105,0.22) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative" }}>
            <p style={{
              fontSize: "13px", fontWeight: 700,
              color: "rgba(110,231,183,0.9)", letterSpacing: "0.1em",
              textTransform: "uppercase", marginBottom: "20px",
            }}>
              Inizia ora — È gratis
            </p>
            <h2 style={{
              fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800,
              letterSpacing: "-0.04em", color: "#fff",
              lineHeight: 1.1, marginBottom: "20px",
            }}>
              Pubblica la tua prima<br />
              disponibilità in 2 minuti.
            </h2>
            <p style={{
              fontSize: "17px", color: "rgba(255,255,255,0.72)",
              lineHeight: 1.65, marginBottom: "40px",
            }}>
              Zero commissioni. Zero algoritmi. Solo scambi tra persone reali.
            </p>

            <div style={{
              display: "flex", justifyContent: "center",
              gap: "14px", flexWrap: "wrap",
            }}>
              <Link href="/auth" className="av-cta-btn" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#fff", color: "#059669",
                borderRadius: "14px", padding: "16px 36px",
                fontSize: "16px", fontWeight: 700,
                textDecoration: "none", letterSpacing: "-0.01em",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}>
                Inizia ora
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M5 9h8M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/explore" className="av-outline-btn" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "transparent", color: "rgba(255,255,255,0.85)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                borderRadius: "14px", padding: "16px 32px",
                fontSize: "16px", fontWeight: 600,
                textDecoration: "none", letterSpacing: "-0.01em",
              }}>
                Esplora le disponibilità
              </Link>
            </div>

            {/* Trust note */}
            <p style={{
              marginTop: "28px", fontSize: "13px",
              color: "rgba(255,255,255,0.45)",
            }}>
              Nessuna carta di credito richiesta · Sempre gratuito
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}