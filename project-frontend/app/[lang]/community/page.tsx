"use client";

/**
 * Community — Landing page /landing/community
 * Aviability — scambio di tempo e competenze
 *
 * Feature: community locali per città e categoria — visione futura.
 *
 * Sezioni:
 * 1. Hero — "gli scambi sono meglio insieme"
 * 2. Come funzionano le community
 * 3. Preview community (città + categoria)
 * 4. Come partecipare
 * 5. CTA — notify me / waitlist
 */

import Link from "next/link";

/* ─────────────────────────────────────────── DATA ── */

const COMMUNITIES_CITY = [
  {
    city: "Roma",
    emoji: "🏛️",
    members: 0,
    desc: "La community di Roma per scambiare skill, tempo e presenze nella capitale.",
    tags: ["Coding", "Lingue", "Musica", "Cucina"],
    color: "#059669",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    city: "Milano",
    emoji: "🏙️",
    members: 0,
    desc: "Milano: la community per chi vuole scambiare senza passare per il denaro.",
    tags: ["Design", "Finance", "Yoga", "Fotografia"],
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
  },
  {
    city: "Napoli",
    emoji: "🌋",
    members: 0,
    desc: "Napoli — dove il baratto ha sempre avuto senso. Ora ha una piattaforma.",
    tags: ["Cucina", "Lingue", "Musica", "Arte"],
    color: "#047857",
    bg: "#ecfdf5",
    border: "#6ee7b7",
  },
  {
    city: "Torino",
    emoji: "🚗",
    members: 0,
    desc: "La community torinese: tech, cultura e scambi tra persone vere.",
    tags: ["Tech", "Cinema", "Sport", "Coding"],
    color: "#065f46",
    bg: "#f0fdf4",
    border: "#a7f3d0",
  },
  {
    city: "Bologna",
    emoji: "🎓",
    members: 0,
    desc: "Universitari, professionisti, creativi — Bologna è fatta per gli scambi.",
    tags: ["Studio", "Musica", "Lingue", "Cucina"],
    color: "#059669",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    city: "La tua città",
    emoji: "📍",
    members: 0,
    desc: "Non trovi la tua città? Puoi creare tu la prima community locale.",
    tags: ["Coming soon"],
    color: "#9ca3af",
    bg: "#f9fafb",
    border: "#e5e7eb",
    isPlaceholder: true,
  },
];

const COMMUNITIES_CATEGORY = [
  {
    name: "Coding & Tech",
    emoji: "💻",
    desc: "Pair programming, code review, mentorship, aiuto su progetti personali.",
    tags: ["React", "Python", "DevOps", "AI"],
    color: "#059669",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    name: "Lingue",
    emoji: "🗣️",
    desc: "Language exchange, conversazione, correzione testi, lezioni informali.",
    tags: ["Inglese", "Spagnolo", "Francese", "Giapponese"],
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
  },
  {
    name: "Musica",
    emoji: "🎸",
    desc: "Lezioni, jam session, registrazioni, feedback su composizioni.",
    tags: ["Chitarra", "Piano", "Produzione", "Canto"],
    color: "#047857",
    bg: "#ecfdf5",
    border: "#6ee7b7",
  },
  {
    name: "Design & Arte",
    emoji: "🎨",
    desc: "Feedback su portfolio, collaborazioni, scambi tra creativi.",
    tags: ["UI/UX", "Illustrazione", "Fotografia", "3D"],
    color: "#065f46",
    bg: "#f0fdf4",
    border: "#a7f3d0",
  },
  {
    name: "Sport & Benessere",
    emoji: "🧘",
    desc: "Allenamenti condivisi, coaching, yoga, running partner, nutrizione.",
    tags: ["Yoga", "Corsa", "Palestra", "Cucina sana"],
    color: "#059669",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    name: "Professionale",
    emoji: "💼",
    desc: "CV, colloqui, networking, mentorship, presentazioni e pitch.",
    tags: ["CV", "LinkedIn", "Startup", "Career"],
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
  },
];

const HOW_IT_WORKS = [
  {
    icon: "🔍",
    title: "Trova la tua community",
    desc: "Cerca per città o per categoria. Ogni community ha una bio, i suoi tag e il creatore a cui puoi scrivere direttamente.",
  },
  {
    icon: "👋",
    title: "Clicca Partecipa",
    desc: "Un click e sei dentro. Puoi unirti a più community — per città e per interesse. Non c'è un limite.",
  },
  {
    icon: "💬",
    title: "Scrivi al creatore",
    desc: "Ogni community ha un creatore. Puoi contattarlo direttamente per capire come funziona, cosa si scambia, come entrare nel vivo.",
  },
  {
    icon: "🔄",
    title: "Scambia dentro la community",
    desc: "Le disponibilità dei membri sono visibili prima agli altri membri. La community accelera i match.",
  },
];

/* ─────────────────────────────────────────── PAGE ── */

export default function CommunityPage() {
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        .av-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .av-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(5,150,105,0.14) !important;
        }
        .av-community-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .av-community-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(5,150,105,0.12) !important;
          border-color: #6ee7b7 !important;
        }
        .av-how-card {
          transition: background 0.18s, border-color 0.18s, transform 0.18s;
        }
        .av-how-card:hover {
          background: #f0fdf4 !important;
          border-color: #6ee7b7 !important;
          transform: translateY(-2px);
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
        .av-partecipa-btn {
          transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
        }
        .av-partecipa-btn:hover {
          background: #047857 !important;
          box-shadow: 0 4px 16px rgba(5,150,105,0.3) !important;
          transform: translateY(-1px);
        }
        .av-contact-btn {
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }
        .av-contact-btn:hover {
          background: #f0fdf4 !important;
          border-color: #059669 !important;
          color: #059669 !important;
        }
        .av-shimmer {
          background: linear-gradient(90deg, #f0fdf4 25%, #ecfdf5 50%, #f0fdf4 75%);
          background-size: 400px 100%;
          animation: shimmer 2s infinite;
        }
        .av-placeholder-card {
          transition: border-color 0.18s, background 0.18s;
        }
        .av-placeholder-card:hover {
          border-color: #059669 !important;
          background: #f0fdf4 !important;
        }
      `}</style>

      {/* ── HERO ─────────────────────────────── */}
      <section style={{
        position: "relative",
        padding: "120px 24px 100px",
        textAlign: "center",
        overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(5,150,105,0.11) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {[
          { top: "14%", left: "5%",   size: 8,  delay: "0s"   },
          { top: "68%", left: "4%",   size: 5,  delay: "0.5s" },
          { top: "22%", right: "5%",  size: 6,  delay: "0.3s" },
          { top: "75%", right: "7%",  size: 9,  delay: "0.8s" },
          { top: "44%", left: "10%",  size: 4,  delay: "1.1s" },
          { top: "36%", right: "13%", size: 4,  delay: "1.4s" },
        ].map((d, i) => (
          <div key={i} aria-hidden style={{
            position: "absolute", top: d.top,
            left: (d as any).left, right: (d as any).right,
            width: d.size, height: d.size,
            borderRadius: "50%", background: "#059669", opacity: 0.2,
            animation: `pulse-dot 2.8s ease-in-out ${d.delay} infinite`,
          }} />
        ))}

        {/* Coming soon badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "#fefce8", border: "1px solid #fde68a",
          borderRadius: "999px", padding: "6px 18px",
          color: "#92400e", fontSize: "13px", fontWeight: 600,
          letterSpacing: "0.06em", textTransform: "uppercase",
          marginBottom: "16px",
          animation: "fadeIn 0.6s ease both",
        }}>
          ✦ Coming soon
        </div>

        {/* Badge secondario */}
        <div style={{
          display: "flex", justifyContent: "center", marginBottom: "32px",
          animation: "fadeIn 0.6s ease 0.1s both",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#ecfdf5", border: "1px solid #6ee7b7",
            borderRadius: "999px", padding: "6px 18px",
            color: "#059669", fontSize: "13px", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#059669" strokeWidth="1.4"/>
              <path d="M4.5 7c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5" stroke="#059669" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="7" cy="7" r="1" fill="#059669"/>
            </svg>
            Community locali
          </div>
        </div>

        <h1 style={{
          fontSize: "clamp(42px, 7.5vw, 88px)",
          fontWeight: 800, lineHeight: 1.02,
          letterSpacing: "-0.045em", color: "#0a1628",
          maxWidth: "900px", margin: "0 auto 28px",
          animation: "fadeUp 0.7s ease 0.1s both",
        }}>
          Gli scambi sono{" "}
          <span style={{
            background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            meglio insieme.
          </span>
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "#4b5563", maxWidth: "620px",
          margin: "0 auto 24px", lineHeight: 1.75,
          animation: "fadeUp 0.7s ease 0.2s both",
        }}>
          Presto potrai unirti a community locali — per città o per interesse.
          Trovare persone vicine a te, con le tue stesse passioni, disposte a scambiare.{" "}
          <strong style={{ color: "#059669" }}>Senza soldi. Con più senso.</strong>
        </p>

        {/* Floating preview pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "20px",
          background: "#fff", border: "1px solid #d1fae5",
          borderRadius: "20px", padding: "16px 28px",
          boxShadow: "0 8px 36px rgba(5,150,105,0.10)",
          animation: "fadeUp 0.7s ease 0.35s both, float 4s ease-in-out 1s infinite",
          flexWrap: "wrap", justifyContent: "center",
          marginBottom: "56px",
        }}>
          {["Roma 🏛️", "Milano 🏙️", "Napoli 🌋", "Coding 💻", "Lingue 🗣️", "Musica 🎸"].map((item, i) => (
            <span key={i} style={{
              fontSize: "14px", fontWeight: 700,
              color: i < 3 ? "#059669" : "#0d9488",
              letterSpacing: "-0.01em",
            }}>
              {item}
            </span>
          ))}
          <span style={{ fontSize: "14px", color: "#9ca3af", fontWeight: 500 }}>e tante altre…</span>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "48px",
          flexWrap: "wrap",
          animation: "fadeUp 0.7s ease 0.5s both",
        }}>
          {[
            { value: "2",    label: "Tipi di community" },
            { value: "∞",    label: "Città supportate" },
            { value: "1",    label: "Click per unirti" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800,
                letterSpacing: "-0.04em", color: "#059669", lineHeight: 1,
              }}>{s.value}</div>
              <div style={{
                fontSize: "14px", color: "#6b7280",
                marginTop: "4px", fontWeight: 500,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COME FUNZIONANO ──────────────────── */}
      <section style={{
        background: "linear-gradient(180deg, #f8fffe 0%, #ecfdf5 100%)",
        padding: "100px 24px",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{
              fontSize: "13px", fontWeight: 700, color: "#059669",
              letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px",
            }}>Come funziona</p>
            <h2 style={{
              fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800,
              letterSpacing: "-0.04em", color: "#0a1628", lineHeight: 1.1,
            }}>
              Non solo scambi.<br />
              <span style={{
                background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Un posto dove appartieni.
              </span>
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={step.title}
                className="av-how-card"
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "20px",
                  padding: "28px",
                  animation: `fadeUp 0.6s ease ${i * 0.1}s both`,
                }}
              >
                <div style={{
                  width: "52px", height: "52px",
                  background: "#f0fdf4", border: "1px solid #bbf7d0",
                  borderRadius: "14px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "24px", marginBottom: "18px",
                }}>
                  {step.icon}
                </div>
                <div style={{
                  fontSize: "11px", fontWeight: 800, color: "#059669",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  marginBottom: "8px",
                }}>
                  Step 0{i + 1}
                </div>
                <h4 style={{
                  fontSize: "17px", fontWeight: 700,
                  color: "#0a1628", letterSpacing: "-0.01em",
                  marginBottom: "10px",
                }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY PER CITTÀ ──────────────── */}
      <section style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "100px 24px 60px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontSize: "13px", fontWeight: 700, color: "#059669",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px",
          }}>Per città</p>
          <h2 style={{
            fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: "#0a1628", lineHeight: 1.1,
          }}>
            Trova la community<br />vicino a te.
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {COMMUNITIES_CITY.map((c, i) => (
            <div
              key={c.city}
              className={(c as any).isPlaceholder ? "av-placeholder-card" : "av-community-card"}
              style={{
                background: "#fff",
                border: `1px solid ${(c as any).isPlaceholder ? "#e5e7eb" : c.border}`,
                borderRadius: "24px",
                padding: "28px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(5,150,105,0.06)",
                animation: `fadeUp 0.6s ease ${i * 0.08}s both`,
                opacity: (c as any).isPlaceholder ? 0.8 : 1,
              }}
            >
              {/* Shimmer overlay per placeholder */}
              {(c as any).isPlaceholder && (
                <div className="av-shimmer" style={{
                  position: "absolute", inset: 0, borderRadius: "24px",
                  opacity: 0.5, pointerEvents: "none",
                }} />
              )}

              {/* Header */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: "16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "48px", height: "48px",
                    background: (c as any).isPlaceholder ? "#f3f4f6" : c.bg,
                    border: `1px solid ${(c as any).isPlaceholder ? "#e5e7eb" : c.border}`,
                    borderRadius: "14px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px",
                  }}>
                    {c.emoji}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: "18px", fontWeight: 800,
                      color: (c as any).isPlaceholder ? "#9ca3af" : "#0a1628",
                      letterSpacing: "-0.02em", lineHeight: 1.1,
                    }}>
                      {c.city}
                    </h3>
                    <p style={{
                      fontSize: "12px", color: "#9ca3af", fontWeight: 500,
                    }}>
                      Community locale
                    </p>
                  </div>
                </div>

                {/* Coming soon badge */}
                <div style={{
                  background: "#fefce8", border: "1px solid #fde68a",
                  borderRadius: "999px", padding: "3px 10px",
                  fontSize: "11px", fontWeight: 700, color: "#92400e",
                }}>
                  Soon
                </div>
              </div>

              <p style={{
                fontSize: "14px",
                color: (c as any).isPlaceholder ? "#9ca3af" : "#4b5563",
                lineHeight: 1.65, marginBottom: "18px",
              }}>
                {c.desc}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                {c.tags.map(t => (
                  <span key={t} style={{
                    background: (c as any).isPlaceholder ? "#f9fafb" : c.bg,
                    border: `1px solid ${(c as any).isPlaceholder ? "#e5e7eb" : c.border}`,
                    borderRadius: "999px", padding: "3px 10px",
                    fontSize: "12px", fontWeight: 600,
                    color: (c as any).isPlaceholder ? "#9ca3af" : c.color,
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Azioni */}
              {!(c as any).isPlaceholder ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="av-partecipa-btn" style={{
                    flex: 1,
                    background: "#059669", color: "#fff",
                    border: "none", borderRadius: "10px",
                    padding: "10px 0", fontSize: "14px", fontWeight: 700,
                    cursor: "pointer", letterSpacing: "-0.01em",
                  }}>
                    Partecipa
                  </button>
                  <button className="av-contact-btn" style={{
                    flex: 1,
                    background: "#fff", color: "#374151",
                    border: "1px solid #e5e7eb", borderRadius: "10px",
                    padding: "10px 0", fontSize: "14px", fontWeight: 600,
                    cursor: "pointer", letterSpacing: "-0.01em",
                  }}>
                    Scrivi al creatore
                  </button>
                </div>
              ) : (
                <button className="av-contact-btn" style={{
                  width: "100%",
                  background: "#f9fafb", color: "#6b7280",
                  border: "1px dashed #d1d5db", borderRadius: "10px",
                  padding: "10px 0", fontSize: "14px", fontWeight: 600,
                  cursor: "pointer", letterSpacing: "-0.01em",
                }}>
                  + Crea la tua community
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── COMMUNITY PER CATEGORIA ──────────── */}
      <section style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "40px 24px 100px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontSize: "13px", fontWeight: 700, color: "#059669",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px",
          }}>Per categoria</p>
          <h2 style={{
            fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: "#0a1628", lineHeight: 1.1,
          }}>
            Trova persone con<br />le tue stesse passioni.
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {COMMUNITIES_CATEGORY.map((c, i) => (
            <div
              key={c.name}
              className="av-community-card"
              style={{
                background: "#fff",
                border: `1px solid ${c.border}`,
                borderRadius: "24px",
                padding: "28px",
                boxShadow: "0 4px 20px rgba(5,150,105,0.06)",
                animation: `fadeUp 0.6s ease ${i * 0.08}s both`,
              }}
            >
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: "16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "48px", height: "48px",
                    background: c.bg, border: `1px solid ${c.border}`,
                    borderRadius: "14px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px",
                  }}>
                    {c.emoji}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: "17px", fontWeight: 800,
                      color: "#0a1628", letterSpacing: "-0.02em", lineHeight: 1.1,
                    }}>
                      {c.name}
                    </h3>
                    <p style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>
                      Community globale
                    </p>
                  </div>
                </div>
                <div style={{
                  background: "#fefce8", border: "1px solid #fde68a",
                  borderRadius: "999px", padding: "3px 10px",
                  fontSize: "11px", fontWeight: 700, color: "#92400e",
                }}>
                  Soon
                </div>
              </div>

              <p style={{
                fontSize: "14px", color: "#4b5563",
                lineHeight: 1.65, marginBottom: "18px",
              }}>
                {c.desc}
              </p>

              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                {c.tags.map(t => (
                  <span key={t} style={{
                    background: c.bg, border: `1px solid ${c.border}`,
                    borderRadius: "999px", padding: "3px 10px",
                    fontSize: "12px", fontWeight: 600, color: c.color,
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button className="av-partecipa-btn" style={{
                  flex: 1,
                  background: "#059669", color: "#fff",
                  border: "none", borderRadius: "10px",
                  padding: "10px 0", fontSize: "14px", fontWeight: 700,
                  cursor: "pointer", letterSpacing: "-0.01em",
                }}>
                  Partecipa
                </button>
                <button className="av-contact-btn" style={{
                  flex: 1,
                  background: "#fff", color: "#374151",
                  border: "1px solid #e5e7eb", borderRadius: "10px",
                  padding: "10px 0", fontSize: "14px", fontWeight: 600,
                  cursor: "pointer", letterSpacing: "-0.01em",
                }}>
                  Scrivi al creatore
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VISION DARK SECTION ──────────────── */}
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
          <div style={{
            fontSize: "64px", lineHeight: 0.9,
            color: "rgba(52,211,153,0.35)",
            fontWeight: 900, marginBottom: "24px",
            letterSpacing: "-0.05em",
          }}>
            "
          </div>

          <p style={{
            fontSize: "clamp(20px, 3.5vw, 30px)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.45, letterSpacing: "-0.02em",
            marginBottom: "28px",
          }}>
            Una community non è solo un gruppo di persone.
            È un motivo per{" "}
            <span style={{ color: "#6ee7b7" }}>tornare.</span>
          </p>

          <p style={{
            fontSize: "16px", color: "rgba(255,255,255,0.62)",
            lineHeight: 1.75, maxWidth: "560px", margin: "0 auto 48px",
          }}>
            Le community locali di Aviability nascono per dare un contesto agli scambi.
            Non sei solo qualcuno che offre una lezione di inglese — sei parte
            di un gruppo che si aiuta, che si incontra, che costruisce fiducia nel tempo.
          </p>

          {/* Feature preview list */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px", textAlign: "left",
          }}>
            {[
              { icon: "📍", text: "Community per città, quartiere o zona" },
              { icon: "🏷️", text: "Community per categoria e interesse" },
              { icon: "👤", text: "Profilo del creatore + contatto diretto" },
              { icon: "🔔", text: "Feed scambi dedicato ai membri" },
              { icon: "🤝", text: "Match prioritario tra membri della stessa community" },
              { icon: "🌱", text: "Chiunque può creare la sua community" },
            ].map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "12px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "12px", padding: "14px 16px",
              }}>
                <span style={{ fontSize: "18px", flexShrink: 0 }}>{f.icon}</span>
                <span style={{
                  fontSize: "14px", color: "rgba(255,255,255,0.85)",
                  fontWeight: 500, lineHeight: 1.5,
                }}>
                  {f.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section style={{ padding: "100px 24px 120px", textAlign: "center" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#fefce8", border: "1px solid #fde68a",
            borderRadius: "999px", padding: "6px 18px",
            color: "#92400e", fontSize: "13px", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: "24px",
          }}>
            ✦ In arrivo
          </div>

          <h2 style={{
            fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: "#0a1628",
            lineHeight: 1.1, marginBottom: "20px",
          }}>
            Vuoi sapere quando<br />
            <span style={{
              background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              le community arrivano?
            </span>
          </h2>

          <p style={{
            fontSize: "18px", color: "#4b5563",
            lineHeight: 1.65, marginBottom: "40px",
          }}>
            Registrati su Aviability — sarai tra i primi a sapere quando
            le community locali saranno disponibili nella tua città.
          </p>

          <div style={{
            display: "flex", justifyContent: "center",
            gap: "14px", flexWrap: "wrap",
          }}>
            <Link href="/auth" className="av-cta-btn" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
              color: "#fff", borderRadius: "14px", padding: "16px 36px",
              fontSize: "16px", fontWeight: 700,
              textDecoration: "none", letterSpacing: "-0.01em",
              boxShadow: "0 4px 20px rgba(5,150,105,0.30)",
            }}>
              Registrati ora
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5 9h8M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/landing/roadmap" className="av-outline-btn" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#fff", color: "#0a1628",
              border: "1.5px solid #d1d5db",
              borderRadius: "14px", padding: "16px 32px",
              fontSize: "16px", fontWeight: 600,
              textDecoration: "none", letterSpacing: "-0.01em",
            }}>
              Vedi la roadmap →
            </Link>
          </div>

          <p style={{
            marginTop: "24px", fontSize: "13px", color: "#9ca3af",
          }}>
            Già registrato? Sarai notificato automaticamente.
          </p>
        </div>
      </section>
    </div>
  );
}