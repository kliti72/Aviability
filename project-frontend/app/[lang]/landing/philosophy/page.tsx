"use client";

/**
 * Philosophy — Landing page /landing/philosophy
 * Aviability — scambio di tempo e competenze
 *
 * Tono: manifesto/editoriale, lettera aperta agli utenti.
 * Sezioni:
 * 1. Hero — apertura manifesto
 * 2. Il problema — critica all'economia monetaria
 * 3. Il valore è soggettivo — pilastro filosofico
 * 4. I nostri principi — 4 pilastri
 * 5. Lettera aperta
 * 6. Quote wall
 * 7. CTA
 */

import Link from "next/link";

/* ─────────────────────────────────────────── DATA ── */

const PRINCIPLES = [
  {
    n: "I",
    title: "Il valore è soggettivo.",
    body: "Un'ora di lezione di inglese non vale 30€. Vale ciò che vale per te, in questo momento, nella tua vita. Se per te equivale a un passaggio all'aeroporto, lo scambio è perfettamente equo. Nessuno stabilisce il prezzo tranne voi.",
    icon: "⚖️",
    color: "#059669",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    n: "II",
    title: "Il tempo non si compra.",
    body: "Ogni ora che dai a qualcuno è unica e irripetibile. Non esiste un mercato che possa prezzarla correttamente. Aviability non ci prova nemmeno. Lasciamo che siate voi a decidere cosa vale la vostra disponibilità.",
    icon: "⏳",
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
  },
  {
    n: "III",
    title: "La fiducia si costruisce, non si compra.",
    body: "In un sistema monetario, il denaro sostituisce la fiducia: paghi un estraneo perché non ti fidi di lui. Noi crediamo che la fiducia vera — quella che costruisce comunità — si guadagni attraverso esperienze condivise, non transazioni.",
    icon: "🤝",
    color: "#047857",
    bg: "#ecfdf5",
    border: "#6ee7b7",
  },
  {
    n: "IV",
    title: "Le persone prima degli algoritmi.",
    body: "Non c'è un feed ottimizzato per massimizzare il tuo tempo su schermo. Non c'è un algoritmo che decide cosa ti mostrare per farti comprare di più. Aviability è uno strumento. Usalo quando ne hai bisogno, poi mettilo giù.",
    icon: "👥",
    color: "#065f46",
    bg: "#f0fdf4",
    border: "#a7f3d0",
  },
];

const PROBLEMS = [
  {
    title: "Hai competenze che non monetizzi",
    desc: "Sai parlare tedesco, cucinare la pasta fresca, fare video editing. Ma non hai un'azienda, non hai una Partita IVA, non hai voglia di diventare un freelancer. Eppure c'è qualcuno che ha bisogno esattamente di quello che sai fare.",
    icon: "🧠",
  },
  {
    title: "Il denaro non è sempre la risposta",
    desc: "A volte non puoi permetterti di pagare per qualcosa. A volte non vuoi. A volte quello che hai da offrire vale più dei soldi che potresti dare. Il baratto esiste da millenni — era il modello di default prima che qualcuno inventasse la moneta.",
    icon: "💶",
  },
  {
    title: "Le piattaforme prendono la percentuale",
    desc: "Ogni marketplace prende una commissione. Ogni intermediario si prende la sua fetta. Finisci per lavorare per la piattaforma, non per te stesso. Noi non vogliamo quella fetta. Non la prendiamo.",
    icon: "📉",
  },
];

const QUOTES = [
  {
    text: "Il baratto non è un'alternativa primitiva all'economia moderna. È l'economia moderna, senza le distrazioni.",
    attr: "Aviability Manifesto, 2024",
  },
  {
    text: "In un mondo ottimizzato per le transazioni, Aviability è ottimizzata per le persone.",
    attr: "Aviability Manifesto, 2024",
  },
  {
    text: "Non vendiamo il tuo tempo. Ti aiutiamo a scambiarlo.",
    attr: "Aviability Manifesto, 2024",
  },
];

/* ─────────────────────────────────────────── PAGE ── */

export default function PhilosophyPage() {
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
          50%       { transform: translateY(-8px); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .av-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .av-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(5,150,105,0.14) !important;
        }
        .av-problem-card {
          transition: background 0.18s, border-color 0.18s, transform 0.18s;
        }
        .av-problem-card:hover {
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
        .av-principle-n {
          background: linear-gradient(135deg, #059669, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .av-marquee-track {
          display: flex;
          gap: 48px;
          animation: marquee 28s linear infinite;
          width: max-content;
        }
        .av-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── HERO — MANIFESTO ─────────────────── */}
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
          { top: "44%", left: "10%",  size: 4,  delay: "1.1s" },
          { top: "36%", right: "12%", size: 4,  delay: "1.4s" },
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
            <path d="M7 1l1.5 4h4l-3.2 2.4 1.2 4L7 9l-3.5 2.4 1.2-4L1.5 5H5.5z" stroke="#059669" strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
          La nostra filosofia
        </div>

        {/* Opening line — manifesto */}
        <div style={{
          maxWidth: "160px", height: "2px",
          background: "linear-gradient(90deg, transparent, #059669, transparent)",
          margin: "0 auto 36px",
          animation: "fadeIn 0.8s ease 0.1s both",
        }} />

        <h1 style={{
          fontSize: "clamp(44px, 8vw, 92px)",
          fontWeight: 800, lineHeight: 1.0,
          letterSpacing: "-0.045em", color: "#0a1628",
          maxWidth: "900px", margin: "0 auto 32px",
          animation: "fadeUp 0.7s ease 0.1s both",
        }}>
          Il denaro è un mezzo.<br />
          <span style={{
            background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Non l'unico.
          </span>
        </h1>

        <p style={{
          fontSize: "clamp(17px, 2.2vw, 22px)",
          color: "#4b5563", maxWidth: "640px",
          margin: "0 auto 56px", lineHeight: 1.7,
          animation: "fadeUp 0.7s ease 0.2s both",
        }}>
          Aviability nasce da una domanda semplice:{" "}
          <em style={{ color: "#0a1628", fontStyle: "italic" }}>
            perché ogni scambio deve passare per il denaro?
          </em>{" "}
          Abbiamo competenze, tempo, energia. Qualcuno ne ha bisogno.
          Qualcuno ha ciò di cui abbiamo bisogno noi. Il cerchio si chiude — senza intermediari.
        </p>

        {/* Floating manifesto pill */}
        <div style={{
          display: "inline-block",
          background: "#fff",
          border: "1px solid #d1fae5",
          borderRadius: "20px",
          padding: "20px 36px",
          boxShadow: "0 8px 36px rgba(5,150,105,0.10)",
          animation: "fadeUp 0.7s ease 0.35s both, float 4s ease-in-out 1s infinite",
          maxWidth: "520px",
        }}>
          <p style={{
            fontSize: "clamp(14px, 2vw, 17px)",
            color: "#374151", lineHeight: 1.6, fontStyle: "italic",
            margin: 0,
          }}>
            "Aviability non assegna un valore monetario a niente.{" "}
            <strong style={{ color: "#059669", fontStyle: "normal" }}>
              Siete voi a negoziare.
            </strong>{" "}
            Il valore è soggettivo."
          </p>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────── */}
      <div style={{
        overflow: "hidden",
        borderTop: "1px solid #e5e7eb",
        borderBottom: "1px solid #e5e7eb",
        padding: "16px 0",
        background: "#fff",
      }}>
        <div className="av-marquee-track">
          {[...Array(2)].map((_, rep) => (
            ["Baratto Moderno", "·", "Valore Soggettivo", "·", "Nessuna Commissione", "·", "Tempo & Competenze", "·", "Scambio Diretto", "·", "Senza Algoritmi", "·", "Community First", "·"].map((item, i) => (
              <span key={`${rep}-${i}`} style={{
                fontSize: "14px", fontWeight: item === "·" ? 400 : 700,
                color: item === "·" ? "#d1fae5" : "#059669",
                letterSpacing: item === "·" ? 0 : "0.04em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}>
                {item}
              </span>
            ))
          ))}
        </div>
      </div>

      {/* ── IL PROBLEMA ──────────────────────── */}
      <section style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "100px 24px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{
            fontSize: "13px", fontWeight: 700, color: "#059669",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px",
          }}>Il problema</p>
          <h2 style={{
            fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: "#0a1628", lineHeight: 1.1,
          }}>
            L'economia monetaria ha dei limiti.<br />
            <span style={{ color: "#6b7280", fontWeight: 600, fontSize: "0.75em" }}>
              Parliamone apertamente.
            </span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {PROBLEMS.map((p, i) => (
            <div
              key={p.title}
              className="av-problem-card"
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "20px",
                padding: "32px 28px",
                animation: `fadeUp 0.6s ease ${i * 0.1}s both`,
              }}
            >
              <div style={{
                fontSize: "32px", marginBottom: "20px",
                width: "56px", height: "56px",
                background: "#f0fdf4", border: "1px solid #bbf7d0",
                borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {p.icon}
              </div>
              <h3 style={{
                fontSize: "19px", fontWeight: 800,
                color: "#0a1628", letterSpacing: "-0.02em",
                marginBottom: "12px", lineHeight: 1.2,
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: "15px", color: "#4b5563", lineHeight: 1.7,
              }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bridge */}
        <div style={{
          marginTop: "56px", textAlign: "center",
          padding: "40px", background: "#f0fdf4",
          border: "1px solid #bbf7d0", borderRadius: "24px",
        }}>
          <p style={{
            fontSize: "clamp(18px, 2.5vw, 24px)",
            fontWeight: 700, color: "#065f46",
            lineHeight: 1.5, maxWidth: "680px", margin: "0 auto",
            letterSpacing: "-0.02em",
          }}>
            Aviability non è contro il denaro.{" "}
            <span style={{ color: "#059669" }}>
              È un'alternativa per quando il denaro non è la risposta giusta.
            </span>
          </p>
        </div>
      </section>

      {/* ── VALORE SOGGETTIVO — FEATURE ──────── */}
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
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "72px", alignItems: "center",
          position: "relative",
        }}>
          {/* Left: testo */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(52,211,153,0.15)", border: "1px solid rgba(110,231,183,0.3)",
              borderRadius: "999px", padding: "6px 18px",
              color: "#6ee7b7", fontSize: "13px", fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "28px",
            }}>
              Il cuore di tutto
            </div>

            <h2 style={{
              fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800,
              letterSpacing: "-0.04em", color: "#fff",
              lineHeight: 1.1, marginBottom: "24px",
            }}>
              Il valore<br />è soggettivo.
            </h2>

            <p style={{
              fontSize: "17px", color: "rgba(255,255,255,0.75)",
              lineHeight: 1.75, marginBottom: "28px",
            }}>
              L'economia tradizionale cerca di assegnare un prezzo oggettivo a tutto.
              Ma il valore non è oggettivo — è personale, contestuale, mutevole.
            </p>
            <p style={{
              fontSize: "17px", color: "rgba(255,255,255,0.75)",
              lineHeight: 1.75, marginBottom: "28px",
            }}>
              Un'ora di lezione di inglese non vale 30€ per tutti.
              Per qualcuno vale un passaggio all'aeroporto. Per qualcuno vale
              una sessione di yoga. Per qualcuno vale una cena cucinata a casa.
            </p>
            <p style={{
              fontSize: "17px", color: "#6ee7b7",
              lineHeight: 1.75, fontWeight: 600,
            }}>
              Se entrambe le parti sono soddisfatte, lo scambio è equo. Punto.
            </p>
          </div>

          {/* Right: visual scambio */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { left: "1h lezione di inglese", right: "Passaggio aeroporto" },
              { left: "Revisione CV",          right: "Sessione di yoga" },
              { left: "Pet sitting weekend",   right: "Lezione di cucina" },
              { left: "Video editing 5min",    right: "Giardinaggio 2h" },
            ].map((row, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "12px",
                animation: `fadeUp 0.5s ease ${0.1 + i * 0.1}s both`,
              }}>
                <div style={{
                  flex: 1, background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "12px", padding: "14px 18px",
                  fontSize: "14px", fontWeight: 600, color: "#fff",
                  textAlign: "center",
                }}>
                  {row.left}
                </div>
                <div style={{
                  flexShrink: 0, width: "32px", height: "32px",
                  background: "rgba(52,211,153,0.2)", border: "1px solid rgba(110,231,183,0.3)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h5M9 8h5M11 5l3 3-3 3M5 5L2 8l3 3" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{
                  flex: 1, background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "12px", padding: "14px 18px",
                  fontSize: "14px", fontWeight: 600, color: "#fff",
                  textAlign: "center",
                }}>
                  {row.right}
                </div>
                <div style={{
                  flexShrink: 0, padding: "4px 12px",
                  background: "rgba(52,211,153,0.2)", border: "1px solid rgba(110,231,183,0.3)",
                  borderRadius: "999px",
                  fontSize: "11px", fontWeight: 700, color: "#6ee7b7",
                  letterSpacing: "0.05em",
                }}>
                  ✓ equo
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── I NOSTRI PRINCIPI ────────────────── */}
      <section style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "100px 24px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{
            fontSize: "13px", fontWeight: 700, color: "#059669",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px",
          }}>I nostri principi</p>
          <h2 style={{
            fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: "#0a1628", lineHeight: 1.1,
          }}>
            Su cosa si fonda Aviability.
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}>
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.n}
              className="av-card"
              style={{
                background: "#fff",
                border: `1px solid ${p.border}`,
                borderRadius: "28px",
                padding: "40px 32px",
                position: "relative", overflow: "hidden",
                boxShadow: "0 4px 24px rgba(5,150,105,0.07)",
                animation: `fadeUp 0.6s ease ${i * 0.12}s both`,
              }}
            >
              {/* Roman numeral watermark */}
              <div aria-hidden style={{
                position: "absolute", bottom: "-16px", right: "-4px",
                fontSize: "100px", fontWeight: 900, color: p.bg,
                lineHeight: 1, userSelect: "none",
                letterSpacing: "-0.02em", filter: "saturate(1.5)",
              }}>
                {p.n}
              </div>

              <div className="av-principle-n" style={{
                fontSize: "13px", fontWeight: 800,
                letterSpacing: "0.1em", marginBottom: "20px",
              }}>
                PRINCIPIO {p.n}
              </div>

              <div style={{
                width: "60px", height: "60px",
                background: p.bg, border: `1px solid ${p.border}`,
                borderRadius: "16px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "26px", marginBottom: "24px",
              }}>
                {p.icon}
              </div>

              <h3 style={{
                fontSize: "22px", fontWeight: 800,
                letterSpacing: "-0.03em", color: "#0a1628",
                marginBottom: "16px", lineHeight: 1.2,
                position: "relative", zIndex: 1,
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: "15px", color: "#4b5563",
                lineHeight: 1.7, position: "relative", zIndex: 1,
              }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LETTERA APERTA ───────────────────── */}
      <section style={{
        background: "linear-gradient(180deg, #f8fffe 0%, #ecfdf5 100%)",
        padding: "100px 24px",
      }}>
        <div style={{
          maxWidth: "720px", margin: "0 auto",
        }}>
          {/* Header lettera */}
          <div style={{
            display: "flex", alignItems: "center", gap: "16px",
            marginBottom: "48px",
          }}>
            <div style={{
              width: "48px", height: "48px",
              background: "#ecfdf5", border: "1px solid #6ee7b7",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px", flexShrink: 0,
            }}>
              ✉️
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#059669", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "2px" }}>
                Lettera aperta
              </p>
              <p style={{ fontSize: "15px", color: "#6b7280", fontWeight: 500 }}>
                A chiunque abbia mai pensato: "ho qualcosa da dare, ma non so come."
              </p>
            </div>
          </div>

          {/* Corpo lettera */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[
              {
                text: "Ti è mai capitato di sapere fare qualcosa — davvero bene — e non avere idea di come metterla a disposizione degli altri senza trasformarla in un secondo lavoro? Senza aprire una Partita IVA, senza creare un profilo su una piattaforma da freelancer, senza fissare un prezzo e sentirti in imbarazzo?",
              },
              {
                text: "O al contrario: avevi bisogno di qualcosa — una mano con un trasloco, qualcuno che ti aiutasse a studiare per un esame, qualcuno che ti accompagnasse in ospedale — ma non volevi, o non potevi, pagare?",
              },
              {
                text: "Aviability esiste per quelle due persone. Quella che sa fare, e quella che ha bisogno. Spesso sono la stessa persona, in momenti diversi della vita.",
              },
              {
                text: "Non vogliamo costruire un altro marketplace. Non vogliamo ottimizzare le metriche di engagement. Non vogliamo sapere quante ore passi sull'app. Vogliamo che tu usi Aviability quando ne hai bisogno, e poi la dimentichi — perché hai già ottenuto ciò che cercavi.",
                highlight: true,
              },
              {
                text: "Il baratto non è una cosa del passato. È la forma più onesta di scambio che esiste. Hai qualcosa che io voglio. Io ho qualcosa che vuoi tu. Troviamoci a metà strada.",
              },
              {
                text: "Nessun algoritmo. Nessuna commissione. Solo persone.",
                signature: true,
              },
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: para.signature ? "20px" : "17px",
                  color: para.highlight ? "#065f46" : para.signature ? "#059669" : "#374151",
                  lineHeight: 1.8,
                  fontWeight: para.highlight ? 600 : para.signature ? 700 : 400,
                  fontStyle: para.signature ? "italic" : "normal",
                  background: para.highlight ? "#f0fdf4" : "transparent",
                  border: para.highlight ? "1px solid #bbf7d0" : "none",
                  borderRadius: para.highlight ? "12px" : 0,
                  padding: para.highlight ? "20px 24px" : 0,
                  letterSpacing: para.signature ? "-0.01em" : "normal",
                  animation: `fadeUp 0.6s ease ${i * 0.08}s both`,
                }}
              >
                {para.text}
              </p>
            ))}
          </div>

          {/* Firma */}
          <div style={{
            marginTop: "48px", paddingTop: "32px",
            borderTop: "1px solid #d1fae5",
            display: "flex", alignItems: "center", gap: "16px",
          }}>
            <div style={{
              width: "44px", height: "44px",
              background: "linear-gradient(135deg, #059669, #34d399)",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", fontWeight: 800, color: "#fff",
              letterSpacing: "-0.03em", flexShrink: 0,
            }}>
              A
            </div>
            <div>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#0a1628", marginBottom: "2px" }}>
                Il team di Aviability
              </p>
              <p style={{ fontSize: "13px", color: "#6b7280" }}>
                aviability.com · 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE WALL ───────────────────────── */}
      <section style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "80px 24px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {QUOTES.map((q, i) => (
            <div
              key={i}
              className="av-card"
              style={{
                background: i === 1
                  ? "linear-gradient(135deg, #064e3b 0%, #065f46 100%)"
                  : "#fff",
                border: i === 1 ? "none" : "1px solid #e5e7eb",
                borderRadius: "24px",
                padding: "36px 32px",
                boxShadow: i === 1
                  ? "0 8px 36px rgba(5,150,105,0.20)"
                  : "0 4px 20px rgba(5,150,105,0.05)",
                animation: `fadeUp 0.6s ease ${i * 0.12}s both`,
              }}
            >
              <div style={{
                fontSize: "48px", lineHeight: 0.8, fontWeight: 900, marginBottom: "20px",
                color: i === 1 ? "rgba(110,231,183,0.4)" : "rgba(5,150,105,0.2)",
              }}>"</div>
              <p style={{
                fontSize: "16px", fontWeight: 600,
                color: i === 1 ? "#fff" : "#0a1628",
                lineHeight: 1.65, letterSpacing: "-0.01em",
                marginBottom: "20px",
              }}>
                {q.text}
              </p>
              <p style={{
                fontSize: "12px", fontWeight: 600,
                color: i === 1 ? "rgba(110,231,183,0.7)" : "#9ca3af",
                letterSpacing: "0.04em", textTransform: "uppercase",
              }}>
                — {q.attr}
              </p>
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
              Unisciti a noi
            </p>
            <h2 style={{
              fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800,
              letterSpacing: "-0.04em", color: "#fff",
              lineHeight: 1.1, marginBottom: "20px",
            }}>
              Credi nel valore<br />
              <span style={{ color: "#6ee7b7" }}>delle persone?</span>
            </h2>
            <p style={{
              fontSize: "17px", color: "rgba(255,255,255,0.70)",
              lineHeight: 1.65, marginBottom: "40px",
            }}>
              Allora Aviability è il tuo posto.
              Pubblica la tua prima disponibilità in 2 minuti.
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
              <Link href="/landing/how-it-works" className="av-outline-btn" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "transparent", color: "rgba(255,255,255,0.85)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                borderRadius: "14px", padding: "16px 32px",
                fontSize: "16px", fontWeight: 600,
                textDecoration: "none", letterSpacing: "-0.01em",
              }}>
                Come funziona →
              </Link>
            </div>

            <p style={{
              marginTop: "28px", fontSize: "13px",
              color: "rgba(255,255,255,0.40)",
            }}>
              Nessuna carta di credito · Zero commissioni · Sempre
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}