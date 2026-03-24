"use client";

/**
 * How It Works — Landing page section for Aviability
 * Route: /how-it-works (or embed as section in homepage)
 *
 * Design direction: editorial/magazine, dark-on-light with strong green accents,
 * large typographic hierarchy, asymmetric layout, subtle motion via CSS animations.
 */

import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "Publish",
    subtitle: "Dì al mondo cosa puoi offrire",
    description:
      "Pubblica la tua disponibilità: una lezione di lingua, un passaggio in macchina, una sessione di coding, compagnia su Discord. Qualunque cosa tu possa dare, c'è qualcuno che ne ha bisogno.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="4" width="20" height="24" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M11 11h10M11 16h10M11 21h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="8" r="5" fill="#059669" stroke="#fff" strokeWidth="1.5"/>
        <path d="M22 8l1.5 1.5L26 6.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "#059669",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    number: "02",
    title: "Offer",
    subtitle: "Trova ciò di cui hai bisogno",
    description:
      "Sfoglia le disponibilità degli altri. Quando trovi qualcosa che ti interessa, proponi uno scambio. Niente soldi — solo tempo e competenze che si incrociano.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="13" cy="13" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="M19 19l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 13h6M13 10v6" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
  },
  {
    number: "03",
    title: "Match",
    subtitle: "Entrambi confermano, lo scambio avviene",
    description:
      "Solo quando entrambe le parti accettano, lo scambio si blocca. Dopo, lasciate una recensione reciproca. Il vostro Affidability Score cresce con ogni buona esperienza.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="10" cy="16" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="22" cy="16" r="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M15 16h2" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 10l-3-3M7 22l-3 3M25 10l3-3M25 22l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    color: "#047857",
    bg: "#ecfdf5",
    border: "#6ee7b7",
  },
];

const FEATURES = [
  {
    icon: "📌",
    title: "Pubblica la tua disponibilità",
    desc: "Skill, tempo, presenza, servizi — qualunque cosa tu abbia da offrire.",
  },
  {
    icon: "🔍",
    title: "Browse & Offer",
    desc: "Trova ciò che ti serve e proponi uno scambio diretto.",
  },
  {
    icon: "🤝",
    title: "Match System",
    desc: "Entrambe le parti confermano prima che lo scambio venga bloccato.",
  },
  {
    icon: "⭐",
    title: "Affidability Score",
    desc: "Dopo ogni scambio, le recensioni costruiscono la tua reputazione.",
  },
  {
    icon: "🔐",
    title: "Auth sicura",
    desc: "Google OAuth + Magic Link login, gestione sessioni, accesso basato sui ruoli.",
  },
  {
    icon: "🔔",
    title: "Notifiche real-time",
    desc: "Aggiornamenti istantanei su ogni offerta e match. Coming soon.",
  },
];

export default function HowItWorksPage() {
  return (
    <div
      style={{
        background: "#fafffe",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lineDraw {
          from { stroke-dashoffset: 200; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }
        .av-step-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .av-step-card:hover {
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
        .av-cta-btn {
          transition: box-shadow 0.18s, opacity 0.18s;
        }
        .av-cta-btn:hover {
          box-shadow: 0 6px 28px rgba(5,150,105,0.38) !important;
          opacity: 0.93;
        }
        .av-outline-btn {
          transition: background 0.18s, color 0.18s;
        }
        .av-outline-btn:hover {
          background: #f0fdf4 !important;
          color: #059669 !important;
        }
        .av-step-number {
          background: linear-gradient(135deg, #059669, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          padding: "100px 24px 80px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(5,150,105,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Floating dots */}
        {[
          { top: "18%", left: "8%", size: 8, delay: "0s" },
          { top: "60%", left: "5%", size: 5, delay: "0.6s" },
          { top: "30%", right: "7%", size: 6, delay: "0.3s" },
          { top: "70%", right: "10%", size: 9, delay: "0.9s" },
        ].map((d, i) => (
          <div
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              top: d.top,
              left: (d as any).left,
              right: (d as any).right,
              width: d.size,
              height: d.size,
              borderRadius: "50%",
              background: "#059669",
              opacity: 0.25,
              animation: `pulse-dot 2.5s ease-in-out ${d.delay} infinite`,
            }}
          />
        ))}

        <div
          style={{
            display: "inline-block",
            background: "#ecfdf5",
            border: "1px solid #6ee7b7",
            borderRadius: "999px",
            padding: "6px 18px",
            color: "#059669",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "28px",
            animation: "fadeIn 0.6s ease both",
          }}
        >
          Come funziona
        </div>

        <h1
          style={{
            fontSize: "clamp(40px, 7vw, 80px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "#0a1628",
            maxWidth: "820px",
            margin: "0 auto 24px",
            animation: "fadeUp 0.7s ease 0.1s both",
          }}
        >
          Il tuo tempo{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            vale qualcosa.
          </span>
          <br />
          Qualcuno ne ha bisogno.
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#4b5563",
            maxWidth: "600px",
            margin: "0 auto 48px",
            lineHeight: 1.65,
            animation: "fadeUp 0.7s ease 0.2s both",
          }}
        >
          Aviability connette le persone attraverso <strong style={{ color: "#059669" }}>tempo e competenze</strong>,
          non attraverso il denaro. Pubblica cosa puoi offrire, trova ciò di cui hai bisogno. Scambia.
        </p>

        {/* Loop badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#fff",
            border: "1px solid #d1fae5",
            borderRadius: "16px",
            padding: "14px 28px",
            boxShadow: "0 4px 24px rgba(5,150,105,0.10)",
            animation: "fadeUp 0.7s ease 0.35s both",
          }}
        >
          {["Publish", "Offer", "Match"].map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "#059669",
                  letterSpacing: "-0.01em",
                }}
              >
                {step}
              </span>
              {i < 2 && (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ opacity: 0.45 }}>
                  <path d="M5 9h8M10 5l4 4-4 4" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── STEPS ── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "20px 24px 100px",
        }}
      >
        {/* Connector line (desktop) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            position: "relative",
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="av-step-card"
              style={{
                background: "#fff",
                border: `1px solid ${step.border}`,
                borderRadius: "24px",
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(5,150,105,0.07)",
                animation: `fadeUp 0.6s ease ${0.1 + i * 0.15}s both`,
              }}
            >
              {/* Background number watermark */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "-8px",
                  fontSize: "120px",
                  fontWeight: 900,
                  color: step.bg,
                  lineHeight: 1,
                  userSelect: "none",
                  letterSpacing: "-0.05em",
                  filter: "saturate(1.5)",
                }}
              >
                {step.number}
              </div>

              {/* Step number */}
              <div
                className="av-step-number"
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  marginBottom: "20px",
                }}
              >
                STEP {step.number}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: step.bg,
                  border: `1px solid ${step.border}`,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: step.color,
                  marginBottom: "24px",
                }}
              >
                {step.icon}
              </div>

              <h3
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#0a1628",
                  marginBottom: "6px",
                  lineHeight: 1.1,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: step.color,
                  marginBottom: "16px",
                  letterSpacing: "0.01em",
                }}
              >
                {step.subtitle}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: "#4b5563",
                  lineHeight: 1.65,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY QUOTE ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(52,211,153,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(5,150,105,0.20) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              lineHeight: 0.8,
              color: "rgba(52,211,153,0.4)",
              fontWeight: 900,
              marginBottom: "24px",
              letterSpacing: "-0.05em",
            }}
          >
            "
          </div>
          <p
            style={{
              fontSize: "clamp(20px, 3.5vw, 30px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.45,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
            }}
          >
            In un mondo ottimizzato per le transazioni, Aviability è ottimizzata per le{" "}
            <span style={{ color: "#6ee7b7" }}>persone</span>.
          </p>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.6,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            La tua disponibilità ha valore. Scambiala con quella degli altri.
            Nessun denaro. Nessun algoritmo.
          </p>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "100px 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#059669",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Tutto in un unico posto
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#0a1628",
              lineHeight: 1.1,
            }}
          >
            Ogni strumento che ti serve
            <br />
            per scambiare.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="av-feature-card"
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "28px 28px",
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                animation: `fadeUp 0.6s ease ${i * 0.08}s both`,
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  width: "52px",
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f0fdf4",
                  borderRadius: "12px",
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#0a1628",
                    marginBottom: "6px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {f.title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AFFIDABILITY SCORE callout ── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto 100px",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #bbf7d0",
            borderRadius: "28px",
            padding: "clamp(40px, 6vw, 72px)",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "48px",
            alignItems: "center",
            boxShadow: "0 8px 40px rgba(5,150,105,0.09)",
            flexWrap: "wrap" as const,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#fefce8",
                border: "1px solid #fde68a",
                borderRadius: "999px",
                padding: "5px 14px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#92400e",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              ⭐ Affidability Score
            </div>
            <h3
              style={{
                fontSize: "clamp(24px, 4vw, 38px)",
                fontWeight: 800,
                color: "#0a1628",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              La tua reputazione
              <br />
              si guadagna, scambio dopo scambio.
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#4b5563",
                lineHeight: 1.7,
                maxWidth: "500px",
              }}
            >
              Dopo ogni scambio, entrambe le parti lasciano una recensione. Il tuo Affidability Score
              riflette quante persone hanno avuto una buona esperienza con te. Più scambi fai,
              più la tua reputazione cresce.
            </p>
          </div>

          {/* Score visual */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "conic-gradient(#059669 0% 87%, #e5e7eb 87% 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "94px",
                  height: "94px",
                  borderRadius: "50%",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "28px", fontWeight: 800, color: "#059669", letterSpacing: "-0.04em" }}>
                  4.9
                </span>
                <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600 }}>score</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "3px" }}>
              {[1,2,3,4,5].map(s => (
                <span key={s} style={{ fontSize: "16px" }}>⭐</span>
              ))}
            </div>
            <p style={{ fontSize: "12px", color: "#6b7280", textAlign: "center" }}>
              Basato su 42 scambi
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          textAlign: "center",
          padding: "0 24px 120px",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#0a1628",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Pronto a scambiare
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              la tua disponibilità?
            </span>
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#4b5563",
              lineHeight: 1.65,
              marginBottom: "40px",
            }}
          >
            Unisciti ad Aviability. Pubblica la tua prima disponibilità in 2 minuti.
            È gratis. Sempre.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/auth"
              className="av-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                color: "#fff",
                borderRadius: "14px",
                padding: "16px 36px",
                fontSize: "16px",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                boxShadow: "0 4px 20px rgba(5,150,105,0.30)",
              }}
            >
              Inizia ora
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5 9h8M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/explore"
              className="av-outline-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#fff",
                color: "#0a1628",
                border: "1.5px solid #d1d5db",
                borderRadius: "14px",
                padding: "16px 36px",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Esplora le disponibilità
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}