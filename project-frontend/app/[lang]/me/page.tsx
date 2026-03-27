"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import Link from "next/link";

/* ─── MOCK DATA ───────────────────────────────────────────── */
const MOCK_AVIABILITIES = [
  {
    id: "1",
    title: "Lezione di Python per principianti",
    category: "Tech",
    categoryColor: "#059669",
    categoryBg: "#ecfdf5",
    categoryBorder: "#6ee7b7",
    description: "Ti insegno le basi di Python: variabili, cicli, funzioni. 1h via Google Meet. Paziente e con esempi pratici.",
    tags: ["coding", "python", "principianti"],
    offers: 4,
    status: "active",
    createdAt: "2 giorni fa",
    icon: "💻",
  },
  {
    id: "2",
    title: "Accompagnamento in macchina — Roma Centro",
    category: "Trasporti",
    categoryColor: "#0d9488",
    categoryBg: "#f0fdfa",
    categoryBorder: "#99f6e4",
    description: "Disponibile per accompagnamenti nel centro di Roma nei weekend mattina. Max 2 persone, macchina comoda.",
    tags: ["macchina", "roma", "weekend"],
    offers: 2,
    status: "active",
    createdAt: "5 giorni fa",
    icon: "🚗",
  },
  {
    id: "3",
    title: "Revisione CV e LinkedIn",
    category: "Carriera",
    categoryColor: "#7c3aed",
    categoryBg: "#f5f3ff",
    categoryBorder: "#c4b5fd",
    description: "Ho assunto per 3 anni in ambito tech. Ti aiuto a riscrivere il CV e ottimizzare il profilo LinkedIn per il mercato IT.",
    tags: ["cv", "linkedin", "tech"],
    offers: 7,
    status: "active",
    createdAt: "1 settimana fa",
    icon: "📄",
  },
  {
    id: "4",
    title: "Compagnia su Discord — gaming o chat",
    category: "Sociale",
    categoryColor: "#d97706",
    categoryBg: "#fffbeb",
    categoryBorder: "#fde68a",
    description: "Se ti senti solo o vuoi qualcuno con cui parlare mentre giochi, sono qui. Gioco a tutto tranne FPS.",
    tags: ["discord", "gaming", "compagnia"],
    offers: 1,
    status: "paused",
    createdAt: "2 settimane fa",
    icon: "🎮",
  },
];

const MOCK_RECEIVED_OFFERS = [
  {
    id: "o1",
    from: "Martina R.",
    avatar: "M",
    avatarColor: "#059669",
    aviability: "Lezione di Python per principianti",
    message: "Ciao! Sono una designer e in cambio ti offro 1h di feedback sul tuo portfolio o UI. Ci stai?",
    time: "3 ore fa",
    status: "pending",
  },
  {
    id: "o2",
    from: "Luca B.",
    avatar: "L",
    avatarColor: "#7c3aed",
    aviability: "Revisione CV e LinkedIn",
    message: "Ho bisogno di una revisione del CV, in cambio posso darti lezioni di chitarra o fotografia.",
    time: "1 giorno fa",
    status: "pending",
  },
  {
    id: "o3",
    from: "Sara C.",
    avatar: "S",
    avatarColor: "#d97706",
    aviability: "Accompagnamento in macchina",
    message: "Perfetto per sabato mattina! Ti offro un corso di cucina thai 2h nel mio appartamento.",
    time: "2 giorni fa",
    status: "accepted",
  },
];

const STATS = [
  { value: "4", label: "Aviability attive" },
  { value: "13", label: "Offerte ricevute" },
  { value: "6", label: "Scambi completati" },
  { value: "4.8", label: "Affidability Score" },
];

/* ─── PAGE ───────────────────────────────────────────────── */
export default function MePage() {
  const router = useRouter();
  const { status, user } = useAuth();
  const [activeTab, setActiveTab] = useState<"aviabilities" | "offers">("aviabilities");

  if (status === "unauthenticated") { router.replace("/auth"); return null; }
  if (status === "loading") return (
    <div style={{ minHeight: "100vh", background: "#fafffe", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#059669" }}>
        <div style={{
          width: "18px", height: "18px",
          border: "2px solid #bbf7d0",
          borderTop: "2px solid #059669",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }} />
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#059669" }}>Caricamento...</span>
      </div>
    </div>
  );

  const lang = useLang();
  const pendingOffers = MOCK_RECEIVED_OFFERS.filter((o) => o.status === "pending").length;

  return (
    <div style={{ minHeight: "100vh", background: "#fafffe", overflowX: "hidden" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50%       { transform: scale(1.5); opacity: 0.45; }
        }
        .av-card {
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .av-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(5,150,105,0.12) !important;
        }
        .av-tab {
          transition: color 0.15s, border-color 0.15s;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0 0 14px;
        }
        .av-btn {
          transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
          cursor: pointer;
        }
        .av-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .av-btn:active { transform: scale(0.98); }
        .av-offer-card {
          transition: background 0.15s, border-color 0.15s;
        }
        .av-offer-card:hover {
          background: #f0fdf4 !important;
          border-color: #6ee7b7 !important;
        }
        .av-tag {
          transition: background 0.15s, color 0.15s;
        }
        .av-tag:hover {
          background: #d1fae5 !important;
          color: #047857 !important;
        }
      `}</style>

      {/* ── TOPBAR ── */}
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
          position: "sticky",
          top: 0,
          zIndex: 0,
        }}
      >
        <Link
          href={`/${lang}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <div style={{
            width: "28px", height: "28px",
            background: "#ecfdf5",
            border: "1px solid #6ee7b7",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5l1.5 3h3l-2.5 2 .8 3L7 7.8 4.2 9.5l.8-3-2.5-2h3z" fill="#059669" />
            </svg>
          </div>
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#0a1628", letterSpacing: "-0.03em" }}>
            Aviability
          </span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href={`/${lang}/aviabilities`} style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280", textDecoration: "none" }}>
            Esplora scambi
          </Link>
          <Link href={`/${lang}/publish`} style={{
            display: "flex", alignItems: "center", gap: "6px",
            fontSize: "13px", fontWeight: 700, color: "#059669",
            textDecoration: "none",
            background: "#ecfdf5", border: "1px solid #6ee7b7",
            borderRadius: "8px", padding: "6px 14px",
          }}>
            + Pubblica
          </Link>
          <div style={{
            width: "34px", height: "34px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #059669, #34d399)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: 800, color: "#fff",
            cursor: "pointer",
          }}>
            {user?.givenName?.[0] ?? "U"}
          </div>
        </nav>
      </header>

      {/* ── HERO PROFILE BAND ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
          padding: "56px 32px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px", pointerEvents: "none",
        }} />
        {/* Glow */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 15% 50%, rgba(52,211,153,0.15) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />
        {/* Dots */}
        {[
          { top: "18%", right: "5%", size: 6, delay: "0s" },
          { top: "60%", right: "12%", size: 4, delay: "0.8s" },
          { top: "30%", right: "20%", size: 8, delay: "0.4s" },
        ].map((d, i) => (
          <div key={i} aria-hidden style={{
            position: "absolute", top: d.top, right: d.right,
            width: d.size, height: d.size, borderRadius: "50%",
            background: "#34d399",
            animation: `pulse-dot 2.5s ease-in-out ${d.delay} infinite`,
          }} />
        ))}

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          {/* Profile row */}
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", gap: "24px",
            flexWrap: "wrap",
            animation: "fadeUp 0.6s ease both",
          }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "24px" }}>
              {/* Avatar */}
              <div style={{
                width: "80px", height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #34d399, #059669)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "32px", fontWeight: 800, color: "#fff",
                border: "3px solid rgba(255,255,255,0.2)",
                flexShrink: 0,
              }}>
                {user?.givenName?.[0] ?? "U"}
              </div>

              <div style={{ paddingBottom: "4px" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: "rgba(52,211,153,0.15)",
                  border: "1px solid rgba(52,211,153,0.3)",
                  borderRadius: "999px",
                  padding: "3px 10px",
                  fontSize: "11px", fontWeight: 700,
                  color: "#6ee7b7",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}>
                  ⭐ Score 4.8
                </div>
                <h1 style={{
                  fontSize: "clamp(24px, 3vw, 34px)",
                  fontWeight: 800, letterSpacing: "-0.04em",
                  color: "#fff", lineHeight: 1.1, marginBottom: "4px",
                }}>
                  {user?.givenName ?? "Utente"}
                </h1>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>
                  {user?.email ?? ""}
                </p>
              </div>
            </div>

            {/* Edit profile btn */}
            <Link href={"/me/edit"}>
            <button className="av-btn" style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "10px", padding: "10px 18px",
              fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)",
              marginBottom: "4px",
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9.5 2.5l2 2-7 7H2.5v-2l7-7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Modifica profilo
            </button>
            </Link>
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", gap: "0",
            marginTop: "36px",
            animation: "fadeUp 0.6s ease 0.1s both",
          }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{
                flex: 1, textAlign: "center",
                padding: "16px 12px",
                borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <div style={{ fontSize: "24px", fontWeight: 800, color: "#6ee7b7", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "4px", letterSpacing: "0.02em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{
            display: "flex", gap: "0", marginTop: "12px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}>
            {[
              { id: "aviabilities", label: "Le mie Aviability", count: 4 },
              { id: "offers", label: "Offerte ricevute", count: pendingOffers },
            ].map((tab) => (
              <button
                key={tab.id}
                className="av-tab"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  marginRight: "32px",
                  fontSize: "14px",
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? "#6ee7b7" : "rgba(255,255,255,0.45)",
                  borderBottom: activeTab === tab.id ? "2px solid #6ee7b7" : "2px solid transparent",
                  paddingTop: "16px",
                }}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span style={{
                    marginLeft: "6px",
                    background: activeTab === tab.id ? "rgba(110,231,183,0.2)" : "rgba(255,255,255,0.08)",
                    border: `1px solid ${activeTab === tab.id ? "rgba(110,231,183,0.4)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: "999px",
                    padding: "1px 7px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: activeTab === tab.id ? "#6ee7b7" : "rgba(255,255,255,0.4)",
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 32px 80px" }}>

        {activeTab === "aviabilities" && (
          <div>
            {/* Header row */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "28px",
              animation: "fadeUp 0.5s ease both",
            }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.03em", color: "#0a1628", marginBottom: "4px" }}>
                  Le tue Aviability
                </h2>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                  Ciò che hai pubblicato e che puoi offrire in scambio.
                </p>
              </div>
              <Link href={`/${lang}/publish`} className="av-btn" style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                color: "#fff", textDecoration: "none",
                borderRadius: "12px", padding: "12px 22px",
                fontSize: "14px", fontWeight: 700,
                boxShadow: "0 4px 16px rgba(5,150,105,0.25)",
              }}>
                + Nuova Aviability
              </Link>
            </div>

            {/* Cards grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}>
              {MOCK_AVIABILITIES.map((av, i) => (
                <div
                  key={av.id}
                  className="av-card"
                  style={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "20px",
                    padding: "24px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    animation: `fadeUp 0.5s ease ${i * 0.07}s both`,
                    cursor: "pointer",
                  }}
                >
                  {/* Top row */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        width: "44px", height: "44px",
                        background: av.categoryBg,
                        border: `1px solid ${av.categoryBorder}`,
                        borderRadius: "12px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "20px",
                      }}>
                        {av.icon}
                      </div>
                      <div>
                        <span style={{
                          display: "inline-block",
                          background: av.categoryBg,
                          border: `1px solid ${av.categoryBorder}`,
                          borderRadius: "999px",
                          padding: "2px 10px",
                          fontSize: "11px", fontWeight: 700,
                          color: av.categoryColor,
                          letterSpacing: "0.04em",
                        }}>
                          {av.category}
                        </span>
                      </div>
                    </div>
                    {/* Status badge */}
                    <span style={{
                      fontSize: "11px", fontWeight: 700,
                      color: av.status === "active" ? "#059669" : "#d97706",
                      background: av.status === "active" ? "#ecfdf5" : "#fffbeb",
                      border: `1px solid ${av.status === "active" ? "#6ee7b7" : "#fde68a"}`,
                      borderRadius: "999px",
                      padding: "2px 10px",
                      letterSpacing: "0.04em",
                    }}>
                      {av.status === "active" ? "● Attiva" : "⏸ In pausa"}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: "16px", fontWeight: 800,
                    letterSpacing: "-0.02em", color: "#0a1628",
                    marginBottom: "10px", lineHeight: 1.25,
                  }}>
                    {av.title}
                  </h3>

                  <p style={{
                    fontSize: "13px", color: "#6b7280",
                    lineHeight: 1.6, marginBottom: "16px",
                  }}>
                    {av.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {av.tags.map((tag) => (
                      <span key={tag} className="av-tag" style={{
                        fontSize: "11px", fontWeight: 600,
                        background: "#f3f4f6", color: "#6b7280",
                        borderRadius: "6px", padding: "3px 9px",
                        cursor: "default",
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid #f3f4f6",
                    paddingTop: "14px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{
                        width: "22px", height: "22px",
                        background: av.offers > 0 ? "#ecfdf5" : "#f3f4f6",
                        border: `1px solid ${av.offers > 0 ? "#6ee7b7" : "#e5e7eb"}`,
                        borderRadius: "6px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", fontWeight: 800,
                        color: av.offers > 0 ? "#059669" : "#9ca3af",
                      }}>
                        {av.offers}
                      </div>
                      <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                        {av.offers === 1 ? "offerta" : "offerte"}
                      </span>
                    </div>
                    <span style={{ fontSize: "11px", color: "#9ca3af" }}>{av.createdAt}</span>
                  </div>

                  {/* Hover line accent */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${av.categoryColor}, transparent)`,
                    borderRadius: "20px 20px 0 0",
                    opacity: 0.6,
                  }} />
                </div>
              ))}

              {/* Empty / add card */}
              <Link
                href={`/${lang}/publish`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  background: "#fff",
                  border: "1.5px dashed #d1fae5",
                  borderRadius: "20px",
                  padding: "40px 24px",
                  textDecoration: "none",
                  cursor: "pointer",
                  minHeight: "200px",
                  transition: "border-color 0.18s, background 0.18s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#6ee7b7";
                  (e.currentTarget as HTMLElement).style.background = "#f0fdf4";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#d1fae5";
                  (e.currentTarget as HTMLElement).style.background = "#fff";
                }}
              >
                <div style={{
                  width: "44px", height: "44px",
                  background: "#ecfdf5", border: "1px solid #6ee7b7",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "20px",
                }}>
                  +
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#059669", marginBottom: "4px" }}>
                    Nuova Aviability
                  </p>
                  <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                    Pubblica qualcosa in 2 minuti
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}

        {activeTab === "offers" && (
          <div>
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "28px",
              animation: "fadeUp 0.5s ease both",
            }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.03em", color: "#0a1628", marginBottom: "4px" }}>
                  Offerte ricevute
                </h2>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                  Qualcuno vuole scambiare qualcosa con te.
                </p>
              </div>
              {pendingOffers > 0 && (
                <div style={{
                  background: "#ecfdf5", border: "1px solid #6ee7b7",
                  borderRadius: "999px", padding: "6px 16px",
                  fontSize: "13px", fontWeight: 700, color: "#059669",
                }}>
                  {pendingOffers} in attesa
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {MOCK_RECEIVED_OFFERS.map((offer, i) => (
                <div
                  key={offer.id}
                  className="av-offer-card"
                  style={{
                    background: "#fff",
                    border: offer.status === "pending" ? "1px solid #e5e7eb" : "1px solid #d1fae5",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    display: "flex", alignItems: "flex-start",
                    gap: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    cursor: "pointer",
                    animation: `fadeUp 0.5s ease ${i * 0.07}s both`,
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: "44px", height: "44px",
                    borderRadius: "50%",
                    background: `${offer.avatarColor}20`,
                    border: `2px solid ${offer.avatarColor}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", fontWeight: 800, color: offer.avatarColor,
                    flexShrink: 0,
                  }}>
                    {offer.avatar}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: "#0a1628" }}>{offer.from}</span>
                        <span style={{ fontSize: "11px", color: "#9ca3af" }}>{offer.time}</span>
                      </div>
                      <span style={{
                        fontSize: "11px", fontWeight: 700,
                        color: offer.status === "pending" ? "#d97706" : "#059669",
                        background: offer.status === "pending" ? "#fffbeb" : "#ecfdf5",
                        border: `1px solid ${offer.status === "pending" ? "#fde68a" : "#6ee7b7"}`,
                        borderRadius: "999px", padding: "2px 10px",
                        letterSpacing: "0.03em",
                      }}>
                        {offer.status === "pending" ? "In attesa" : "✓ Accettata"}
                      </span>
                    </div>

                    <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "8px" }}>
                      su: <span style={{ color: "#059669", fontWeight: 600 }}>{offer.aviability}</span>
                    </p>

                    <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.55, marginBottom: "14px" }}>
                      {offer.message}
                    </p>

                    {offer.status === "pending" && (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button className="av-btn" style={{
                          background: "linear-gradient(135deg, #059669, #10b981)",
                          color: "#fff", border: "none",
                          borderRadius: "8px", padding: "8px 18px",
                          fontSize: "13px", fontWeight: 700,
                          boxShadow: "0 2px 10px rgba(5,150,105,0.25)",
                        }}>
                          Accetta scambio
                        </button>
                        <button className="av-btn" style={{
                          background: "#fff", color: "#6b7280",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px", padding: "8px 16px",
                          fontSize: "13px", fontWeight: 600,
                        }}>
                          Declina
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}