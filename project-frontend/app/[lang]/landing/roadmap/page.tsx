"use client";

/**
 * Roadmap — Landing page /landing/roadmap
 * Aviability — scambio di tempo e competenze
 *
 * Sezioni:
 * 1. Hero — "costruita da una persona sola"
 * 2. Versioni — timeline v0.1 → v1.0 → v2.0 → v3.0
 * 3. Open Source — call to contribute
 * 4. Cerco una mano — contributor CTA
 * 5. CTA finale
 */

import Link from "next/link";

/* ─────────────────────────────────────────── DATA ── */

const VERSIONS = [
  {
    version: "v0.1",
    name: "Foundation",
    status: "live",
    label: "Live ora",
    date: "2024",
    color: "#059669",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    description: "Le basi del sistema. Tutto quello che serve per fare il primo scambio.",
    features: [
      { done: true,  text: "Autenticazione Google OAuth + Magic Link" },
      { done: true,  text: "Profilo utente con bio e competenze" },
      { done: true,  text: "Pubblicazione disponibilità" },
      { done: true,  text: "Feed esplora con filtri base" },
      { done: true,  text: "Sistema di offerta scambio" },
      { done: true,  text: "Match con doppia conferma" },
      { done: true,  text: "Affidability Score base" },
      { done: true,  text: "Recensioni post-scambio" },
    ],
  },
  {
    version: "v0.5",
    name: "Connect",
    status: "in-progress",
    label: "In sviluppo",
    date: "Early 2025",
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
    description: "Comunicazione diretta e notifiche. Perché uno scambio inizia sempre da una conversazione.",
    features: [
      { done: true,  text: "Chat in-app tra utenti" },
      { done: false, text: "Notifiche real-time (WebSocket)" },
      { done: false, text: "Notifiche email per offerte e match" },
      { done: false, text: "Ricerca avanzata per skill e posizione" },
      { done: false, text: "Filtri per modalità (online / presenza)" },
      { done: false, text: "Profilo pubblico shareable" },
    ],
  },
  {
    version: "v1.0",
    name: "Trust",
    status: "planned",
    label: "Pianificato",
    date: "Mid 2025",
    color: "#047857",
    bg: "#ecfdf5",
    border: "#6ee7b7",
    description: "Il sistema di fiducia diventa robusto. La community si autoregola e cresce in modo sano.",
    features: [
      { done: false, text: "Affidability Score v2 — multi-dimensionale" },
      { done: false, text: "Verifica identità opzionale (badge)" },
      { done: false, text: "Segnalazione e moderazione community" },
      { done: false, text: "Storico scambi completo" },
      { done: false, text: "Categorie ufficiali e tag curati" },
      { done: false, text: "Onboarding guidato per nuovi utenti" },
      { done: false, text: "App mobile (PWA)" },
    ],
  },
  {
    version: "v2.0",
    name: "Scale",
    status: "vision",
    label: "Visione",
    date: "2026",
    color: "#065f46",
    bg: "#f0fdf4",
    border: "#a7f3d0",
    description: "Aviability cresce oltre i confini locali. Gli scambi diventano più ricchi, strutturati e verificabili.",
    features: [
      { done: false, text: "Gruppi e community tematiche" },
      { done: false, text: "Scambi multi-utente (1 → molti)" },
      { done: false, text: "Calendario integrato per disponibilità" },
      { done: false, text: "API pubblica per integrazioni" },
      { done: false, text: "Localizzazione multi-lingua" },
      { done: false, text: "Dashboard analytics per gli utenti" },
    ],
  },
  {
    version: "v3.0",
    name: "Ecosystem",
    status: "dream",
    label: "Il sogno",
    date: "2027+",
    color: "#064e3b",
    bg: "#ecfdf5",
    border: "#6ee7b7",
    description: "Un ecosistema aperto dove il baratto moderno diventa infrastruttura. Costruito dalla community, per la community.",
    features: [
      { done: false, text: "Protocollo aperto per scambi decentralizzati" },
      { done: false, text: "Reputazione portabile cross-piattaforma" },
      { done: false, text: "Plugin system per terze parti" },
      { done: false, text: "Aviability for Organizations (scuole, associazioni)" },
      { done: false, text: "SDK open source per builder" },
      { done: false, text: "DAO per governance della community" },
    ],
  },
];

const CONTRIBUTE_AREAS = [
  {
    icon: "⚛️",
    title: "Frontend / React",
    desc: "Next.js, TypeScript, UI components, animazioni, accessibilità. Se ami costruire interfacce belle e funzionali, c'è tanto da fare.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    icon: "🔧",
    title: "Backend / API",
    desc: "Node.js, database, autenticazione, WebSocket per le notifiche real-time. Il core del sistema ha bisogno di mani esperte.",
    tags: ["Node.js", "PostgreSQL", "WebSocket"],
  },
  {
    icon: "🎨",
    title: "Design / UX",
    desc: "Il design system è definito ma c'è tanto da migliorare: mobile, onboarding, micro-interazioni. Se hai occhio, voglio sentirti.",
    tags: ["Figma", "Motion", "Accessibility"],
  },
  {
    icon: "📝",
    title: "Content / Copy",
    desc: "Testi, documentazione, guide per i contributori, traduzioni. Il progetto parla italiano, ma vuole crescere.",
    tags: ["Italiano", "English", "Docs"],
  },
  {
    icon: "🧪",
    title: "Testing / QA",
    desc: "Test unitari, E2E, bug report. Ogni PR senza test è un debito tecnico che prima o poi si paga.",
    tags: ["Jest", "Playwright", "Bug hunting"],
  },
  {
    icon: "💡",
    title: "Idee & Feedback",
    desc: "Non sai programmare ma hai idee? Perfetto. Apri una issue, scrivi una proposta, racconta come usi il prodotto.",
    tags: ["GitHub Issues", "Feedback", "Vision"],
  },
];

/* ─────────────────────────────────────────── PAGE ── */

export default function RoadmapPage() {
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
          50%       { transform: scale(1.5); opacity: 0.5; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }

        .av-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .av-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(5,150,105,0.14) !important;
        }
        .av-contribute-card {
          transition: background 0.18s, border-color 0.18s, transform 0.18s;
        }
        .av-contribute-card:hover {
          background: #f0fdf4 !important;
          border-color: #6ee7b7 !important;
          transform: translateY(-3px);
        }
        .av-cta-btn {
          transition: box-shadow 0.18s, transform 0.18s;
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
        .av-github-btn {
          transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
        }
        .av-github-btn:hover {
          background: #1a1a2e !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.25) !important;
        }
        .av-version-live {
          animation: blink 2.5s ease-in-out infinite;
        }
        .av-step-number {
          background: linear-gradient(135deg, #059669, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ── HERO ─────────────────────────────── */}
      <section style={{
        position: "relative",
        padding: "120px 24px 100px",
        textAlign: "center",
        overflow: "hidden",
      }}>
        {/* Radial bg */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(5,150,105,0.11) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Floating dots */}
        {[
          { top: "14%", left: "5%",   size: 8,  delay: "0s"   },
          { top: "68%", left: "4%",   size: 5,  delay: "0.5s" },
          { top: "22%", right: "5%",  size: 6,  delay: "0.3s" },
          { top: "75%", right: "7%",  size: 9,  delay: "0.8s" },
        ].map((d, i) => (
          <div key={i} aria-hidden style={{
            position: "absolute", top: d.top,
            left: (d as any).left, right: (d as any).right,
            width: d.size, height: d.size,
            borderRadius: "50%", background: "#059669", opacity: 0.2,
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
          marginBottom: "32px",
          animation: "fadeIn 0.6s ease both",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v3M7 10v3M1 7h3M10 7h3M3.2 3.2l2.1 2.1M8.7 8.7l2.1 2.1M3.2 10.8l2.1-2.1M8.7 5.3l2.1-2.1" stroke="#059669" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Roadmap pubblica
        </div>

        <h1 style={{
          fontSize: "clamp(42px, 7.5vw, 88px)",
          fontWeight: 800, lineHeight: 1.0,
          letterSpacing: "-0.045em", color: "#0a1628",
          maxWidth: "880px", margin: "0 auto 28px",
          animation: "fadeUp 0.7s ease 0.1s both",
        }}>
          Costruita da{" "}
          <span style={{
            background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            una persona sola.
          </span>
          <br />Per ora.
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "#4b5563", maxWidth: "620px",
          margin: "0 auto 40px", lineHeight: 1.75,
          animation: "fadeUp 0.7s ease 0.2s both",
        }}>
          Aviability è un progetto{" "}
          <strong style={{ color: "#059669" }}>open source</strong> sviluppato da una sola persona.
          Questa roadmap è pubblica, onesta e in continua evoluzione.
          Se credi nel progetto — o anche solo in una singola feature —{" "}
          <strong style={{ color: "#0a1628" }}>c'è spazio per te.</strong>
        </p>

        {/* Solo dev callout — animato */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "16px",
          background: "#fff", border: "1px solid #d1fae5",
          borderRadius: "20px", padding: "18px 28px",
          boxShadow: "0 4px 24px rgba(5,150,105,0.10)",
          animation: "fadeUp 0.7s ease 0.35s both, float 4s ease-in-out 1s infinite",
          maxWidth: "520px", textAlign: "left",
        }}>
          <div style={{
            width: "44px", height: "44px", flexShrink: 0,
            background: "linear-gradient(135deg, #059669, #34d399)",
            borderRadius: "50%", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "20px",
          }}>
            👨‍💻
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#0a1628", marginBottom: "2px" }}>
              Progetto solo-dev, open source
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.5 }}>
              Ogni contributo — codice, design, feedback — è buono che ci sia.
            </p>
          </div>
        </div>

        {/* Status pills */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "10px",
          flexWrap: "wrap", marginTop: "48px",
          animation: "fadeUp 0.7s ease 0.5s both",
        }}>
          {[
            { label: "Live ora",     color: "#059669", bg: "#f0fdf4", border: "#bbf7d0", dot: true  },
            { label: "In sviluppo",  color: "#0d9488", bg: "#f0fdfa", border: "#99f6e4", dot: true  },
            { label: "Pianificato",  color: "#047857", bg: "#ecfdf5", border: "#6ee7b7", dot: false },
            { label: "Visione",      color: "#6b7280", bg: "#f9fafb", border: "#e5e7eb", dot: false },
            { label: "Il sogno",     color: "#9ca3af", bg: "#f9fafb", border: "#e5e7eb", dot: false },
          ].map((p) => (
            <div key={p.label} style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: p.bg, border: `1px solid ${p.border}`,
              borderRadius: "999px", padding: "6px 14px",
              fontSize: "13px", fontWeight: 600, color: p.color,
            }}>
              {p.dot && (
                <div className="av-version-live" style={{
                  width: "7px", height: "7px",
                  borderRadius: "50%", background: p.color,
                }} />
              )}
              {p.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE VERSIONI ─────────────────── */}
      <section style={{
        maxWidth: "900px", margin: "0 auto",
        padding: "20px 24px 100px",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          {VERSIONS.map((v, i) => {
            const isLive       = v.status === "live";
            const isInProgress = v.status === "in-progress";
            const isDream      = v.status === "dream";
            const isVision     = v.status === "vision";
            const isFaded      = isDream || isVision;

            return (
              <div key={v.version} style={{
                display: "flex", gap: "0px",
                animation: `fadeUp 0.6s ease ${i * 0.12}s both`,
              }}>
                {/* Timeline column */}
                <div style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", width: "48px", flexShrink: 0,
                }}>
                  {/* Dot */}
                  <div style={{
                    width: "20px", height: "20px",
                    borderRadius: "50%",
                    background: isFaded ? "#e5e7eb" : isLive ? "#059669" : isInProgress ? "#0d9488" : "#d1fae5",
                    border: isFaded ? "2px solid #d1d5db" : `2px solid ${v.color}`,
                    flexShrink: 0, marginTop: "32px",
                    boxShadow: isLive ? `0 0 0 4px rgba(5,150,105,0.15)` : "none",
                    position: "relative", zIndex: 1,
                  }}>
                    {isLive && (
                      <div className="av-version-live" style={{
                        position: "absolute", inset: "-5px",
                        borderRadius: "50%",
                        border: "2px solid rgba(5,150,105,0.3)",
                      }} />
                    )}
                  </div>
                  {/* Line */}
                  {i < VERSIONS.length - 1 && (
                    <div style={{
                      width: "2px", flex: 1,
                      background: isFaded
                        ? "repeating-linear-gradient(to bottom, #e5e7eb 0px, #e5e7eb 6px, transparent 6px, transparent 12px)"
                        : `linear-gradient(to bottom, ${v.color}40, ${VERSIONS[i+1].color}40)`,
                      marginTop: "4px", marginBottom: "4px",
                      minHeight: "32px",
                    }} />
                  )}
                </div>

                {/* Card */}
                <div
                  className="av-card"
                  style={{
                    flex: 1,
                    background: "#fff",
                    border: `1px solid ${isFaded ? "#e5e7eb" : v.border}`,
                    borderRadius: "24px",
                    padding: "32px 32px",
                    margin: "16px 0 16px 20px",
                    position: "relative", overflow: "hidden",
                    boxShadow: isLive
                      ? "0 8px 36px rgba(5,150,105,0.12)"
                      : "0 4px 20px rgba(5,150,105,0.05)",
                    opacity: isFaded ? 0.75 : 1,
                  }}
                >
                  {/* Watermark version */}
                  <div aria-hidden style={{
                    position: "absolute", bottom: "-20px", right: "12px",
                    fontSize: "90px", fontWeight: 900,
                    color: isFaded ? "#f3f4f6" : v.bg,
                    lineHeight: 1, userSelect: "none",
                    letterSpacing: "-0.04em",
                  }}>
                    {v.version}
                  </div>

                  {/* Header */}
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", flexWrap: "wrap", gap: "12px",
                    marginBottom: "20px",
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <span style={{
                          fontSize: "13px", fontWeight: 800,
                          color: isFaded ? "#9ca3af" : v.color,
                          letterSpacing: "0.08em",
                        }}>
                          {v.version}
                        </span>
                        <span style={{
                          fontSize: "13px", fontWeight: 600,
                          color: "#6b7280",
                        }}>
                          · {v.date}
                        </span>
                      </div>
                      <h3 style={{
                        fontSize: "26px", fontWeight: 800,
                        letterSpacing: "-0.03em", color: isFaded ? "#6b7280" : "#0a1628",
                        lineHeight: 1.1,
                      }}>
                        {v.name}
                      </h3>
                    </div>

                    {/* Status badge */}
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      background: isFaded ? "#f9fafb" : v.bg,
                      border: `1px solid ${isFaded ? "#e5e7eb" : v.border}`,
                      borderRadius: "999px", padding: "5px 14px",
                      fontSize: "12px", fontWeight: 700,
                      color: isFaded ? "#9ca3af" : v.color,
                      letterSpacing: "0.04em", textTransform: "uppercase",
                      flexShrink: 0,
                    }}>
                      {(isLive || isInProgress) && (
                        <div
                          className={isLive || isInProgress ? "av-version-live" : ""}
                          style={{
                            width: "6px", height: "6px",
                            borderRadius: "50%",
                            background: isFaded ? "#d1d5db" : v.color,
                          }}
                        />
                      )}
                      {v.label}
                    </div>
                  </div>

                  <p style={{
                    fontSize: "15px", color: isFaded ? "#9ca3af" : "#4b5563",
                    lineHeight: 1.65, marginBottom: "24px",
                    position: "relative", zIndex: 1,
                  }}>
                    {v.description}
                  </p>

                  {/* Features list */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                    gap: "8px",
                    position: "relative", zIndex: 1,
                  }}>
                    {v.features.map((f, fi) => (
                      <div key={fi} style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "8px 12px",
                        background: f.done ? "#f0fdf4" : isFaded ? "#f9fafb" : "#fafffe",
                        border: `1px solid ${f.done ? "#bbf7d0" : "#f3f4f6"}`,
                        borderRadius: "8px",
                      }}>
                        <div style={{
                          width: "18px", height: "18px", flexShrink: 0,
                          borderRadius: "50%",
                          background: f.done ? "#059669" : isFaded ? "#e5e7eb" : "#f3f4f6",
                          border: f.done ? "none" : `1.5px solid ${isFaded ? "#d1d5db" : "#d1d5db"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {f.done && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span style={{
                          fontSize: "13px", fontWeight: f.done ? 600 : 500,
                          color: f.done ? "#065f46" : isFaded ? "#9ca3af" : "#374151",
                          lineHeight: 1.4,
                        }}>
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── OPEN SOURCE ──────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
        padding: "100px 24px",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 15% 50%, rgba(52,211,153,0.18) 0%, transparent 50%), radial-gradient(circle at 85% 50%, rgba(5,150,105,0.22) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: "820px", margin: "0 auto",
          textAlign: "center", position: "relative",
        }}>
          {/* GitHub icon */}
          <div style={{
            width: "72px", height: "72px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "20px",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 28px",
            fontSize: "36px",
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(52,211,153,0.15)", border: "1px solid rgba(110,231,183,0.3)",
            borderRadius: "999px", padding: "6px 18px",
            color: "#6ee7b7", fontSize: "13px", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "24px",
          }}>
            Open Source
          </div>

          <h2 style={{
            fontSize: "clamp(32px, 5.5vw, 58px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: "#fff",
            lineHeight: 1.08, marginBottom: "24px",
          }}>
            Il codice è pubblico.<br />
            <span style={{ color: "#6ee7b7" }}>Il futuro lo scriviamo insieme.</span>
          </h2>

          <p style={{
            fontSize: "18px", color: "rgba(255,255,255,0.72)",
            lineHeight: 1.75, maxWidth: "580px", margin: "0 auto 40px",
          }}>
            Aviability è open source perché crediamo che un progetto costruito
            per le persone debba essere trasparente, verificabile e migliorabile
            da chiunque. Non c'è un'azienda dietro — c'è una persona
            con un'idea e la voglia di costruirla bene.
          </p>

          {/* Stats */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "40px",
            flexWrap: "wrap", marginBottom: "44px",
          }}>
            {[
              { value: "1",      label: "Contributore" },
              { value: "100%",   label: "Open source" },
              { value: "∞",      label: "Spazio per te" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800,
                  letterSpacing: "-0.04em", color: "#6ee7b7", lineHeight: 1,
                }}>{s.value}</div>
                <div style={{
                  fontSize: "14px", color: "rgba(255,255,255,0.55)",
                  marginTop: "4px", fontWeight: 500,
                }}>{s.label}</div>
              </div>
            ))}
          </div>

          <a
            href="https://github.com/kliti72/Aviability"
            target="_blank"
            rel="noopener noreferrer"
            className="av-github-btn"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "#0d1117", color: "#fff",
              borderRadius: "14px", padding: "16px 36px",
              fontSize: "16px", fontWeight: 700,
              textDecoration: "none", letterSpacing: "-0.01em",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            Vedi il codice su GitHub
          </a>
        </div>
      </section>

      {/* ── CERCO UNA MANO ────────────────────── */}
      <section style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "100px 24px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <p style={{
            fontSize: "13px", fontWeight: 700, color: "#059669",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px",
          }}>Contribuisci</p>
          <h2 style={{
            fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: "#0a1628", lineHeight: 1.1,
            marginBottom: "20px",
          }}>
            Cerco una mano.
          </h2>
          <p style={{
            fontSize: "18px", color: "#4b5563", maxWidth: "620px",
            margin: "0 auto 56px", lineHeight: 1.7,
          }}>
            Sono solo. Il progetto è ambizioso. Se una feature ti accende, se vedi
            un bug che ti fa venire voglia di fixarlo, se hai un'idea — la porta è aperta.
            Non serve esperienza da senior, serve curiosità e voglia di costruire qualcosa di vero.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {CONTRIBUTE_AREAS.map((area, i) => (
            <div
              key={area.title}
              className="av-contribute-card"
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "20px",
                padding: "28px",
                animation: `fadeUp 0.6s ease ${i * 0.08}s both`,
              }}
            >
              <div style={{
                width: "52px", height: "52px",
                background: "#f0fdf4", border: "1px solid #bbf7d0",
                borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", marginBottom: "18px",
              }}>
                {area.icon}
              </div>

              <h4 style={{
                fontSize: "17px", fontWeight: 700,
                color: "#0a1628", letterSpacing: "-0.01em",
                marginBottom: "10px",
              }}>
                {area.title}
              </h4>
              <p style={{
                fontSize: "14px", color: "#6b7280",
                lineHeight: 1.65, marginBottom: "16px",
              }}>
                {area.desc}
              </p>

              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {area.tags.map(t => (
                  <span key={t} style={{
                    background: "#f0fdf4", border: "1px solid #bbf7d0",
                    borderRadius: "999px", padding: "3px 10px",
                    fontSize: "12px", fontWeight: 600, color: "#059669",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Come contribuire */}
        <div style={{
          marginTop: "56px",
          background: "#fff",
          border: "1px solid #bbf7d0",
          borderRadius: "24px",
          padding: "40px 40px",
          boxShadow: "0 4px 24px rgba(5,150,105,0.07)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "32px",
          alignItems: "center",
        }}>
          <div>
            <h3 style={{
              fontSize: "22px", fontWeight: 800,
              color: "#0a1628", letterSpacing: "-0.02em",
              marginBottom: "10px",
            }}>
              Come iniziare
            </h3>
            <p style={{ fontSize: "15px", color: "#4b5563", lineHeight: 1.65 }}>
              Fork, clona, apri una issue o manda direttamente una PR.
              Nessun processo complicato — solo GitHub.
            </p>
          </div>

          {[
            { n: "1", text: "Leggi il README e la CONTRIBUTING guide" },
            { n: "2", text: "Scegli una issue o proponi la tua idea" },
            { n: "3", text: "Manda una PR — anche piccola va benissimo" },
          ].map((step) => (
            <div key={step.n} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{
                width: "32px", height: "32px", flexShrink: 0,
                background: "#ecfdf5", border: "1px solid #bbf7d0",
                borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", fontWeight: 800, color: "#059669",
              }}>
                {step.n}
              </div>
              <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.6, marginTop: "4px" }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINALE ───────────────────────── */}
      <section style={{ padding: "0 24px 120px", textAlign: "center" }}>
        <div style={{
          maxWidth: "680px", margin: "0 auto",
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
          borderRadius: "32px", padding: "clamp(48px, 7vw, 80px) 48px",
          position: "relative", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(5,150,105,0.25)",
        }}>
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
              Unisciti al progetto
            </p>
            <h2 style={{
              fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 800,
              letterSpacing: "-0.04em", color: "#fff",
              lineHeight: 1.1, marginBottom: "20px",
            }}>
              Ogni riga di codice<br />
              <span style={{ color: "#6ee7b7" }}>conta davvero.</span>
            </h2>
            <p style={{
              fontSize: "17px", color: "rgba(255,255,255,0.70)",
              lineHeight: 1.65, marginBottom: "40px",
            }}>
              Che tu voglia contribuire al codice o semplicemente usare Aviability —
              sei il benvenuto. Il progetto cresce con le persone che ci credono.
            </p>

            <div style={{
              display: "flex", justifyContent: "center",
              gap: "14px", flexWrap: "wrap",
            }}>
              <a
                href="https://github.com/kliti72/Aviability"
                target="_blank"
                rel="noopener noreferrer"
                className="av-github-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  background: "#fff", color: "#0d1117",
                  borderRadius: "14px", padding: "16px 32px",
                  fontSize: "16px", fontWeight: 700,
                  textDecoration: "none", letterSpacing: "-0.01em",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                Contribuisci su GitHub
              </a>
              <Link href="/auth" className="av-outline-btn" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "transparent", color: "rgba(255,255,255,0.85)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                borderRadius: "14px", padding: "16px 28px",
                fontSize: "16px", fontWeight: 600,
                textDecoration: "none", letterSpacing: "-0.01em",
              }}>
                Usa Aviability →
              </Link>
            </div>

            <p style={{
              marginTop: "28px", fontSize: "13px",
              color: "rgba(255,255,255,0.40)",
            }}>
              MIT License · Open source · Built with ❤️ da una persona sola
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}