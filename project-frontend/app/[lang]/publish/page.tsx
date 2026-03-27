"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type Category =
  | "skills"
  | "language"
  | "tech"
  | "sport"
  | "music"
  | "talent_magic"
  | "event"
  | "other";
type Mode = "remote" | "physical" | "both";

interface FormState {
  title: string;
  description: string;
  wantInReturn: string;
  mode: Mode;
  location: string;
  category: Category;
}

const CATEGORIES: { value: Category; label: string; emoji: string; desc: string }[] = [
  { value: "skills",       label: "Skills",      emoji: "⚡", desc: "competenze & know-how" },
  { value: "language",     label: "Language",    emoji: "🗣️", desc: "lezioni & conversazione" },
  { value: "tech",         label: "Tech",        emoji: "💻", desc: "coding, design, devops" },
  { value: "sport",        label: "Sport",       emoji: "🏃", desc: "allenamento & passione" },
  { value: "music",        label: "Music",       emoji: "🎵", desc: "testi, produzione, strumenti" },
  { value: "talent_magic", label: "Talent",      emoji: "✨", desc: "magia, creatività, arte" },
  { value: "event",        label: "Event",       emoji: "📍", desc: "raduni & incontri in città" },
  { value: "other",        label: "Altro",       emoji: "🌱", desc: "qualsiasi cosa offri" },
];

const MODES: { value: Mode; label: string; icon: string; sub: string }[] = [
  { value: "remote",   label: "Remoto",   icon: "🌐", sub: "online, da ovunque" },
  { value: "physical", label: "Fisico",   icon: "📍", sub: "in presenza" },
  { value: "both",     label: "Entrambi", icon: "♾️", sub: "flessibile" },
];

const CHAR_LIMITS = { title: 80, description: 1000, wantInReturn: 300 };

export default function PublishAviability() {
  const { user, status } = useAuth();
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    wantInReturn: "",
    mode: "both",
    location: "",
    category: "other",
  });
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => titleRef.current?.focus(), 400);
  }, []);

  const update = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((p) => ({ ...p, [key]: val }));

  const canNext1 = form.title.trim().length >= 3 && form.category !== undefined;
  const canNext2 = form.description.trim().length >= 10;
  const canSubmit = canNext1 && canNext2;

  async function handleSubmit() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/aviabilities`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          wantInReturn: form.wantInReturn.trim() || undefined,
          mode: form.mode,
          location: form.location.trim() || undefined,
          category: form.category,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? "Errore nella pubblicazione");
      }
      setSuccess(true);
    } catch (e: any) {
      setError(e.message ?? "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  }

  // ── keyframes ──────────────────────────────────────────────
  const styles = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(1);   opacity: .6; }
      50%  { transform: scale(1.5); opacity: 0;  }
      100% { transform: scale(1);   opacity: 0;  }
    }
    @keyframes float {
      0%,100% { transform: translateY(0px); }
      50%     { transform: translateY(-12px); }
    }
    @keyframes success-pop {
      0%   { transform: scale(0.7); opacity: 0; }
      60%  { transform: scale(1.08); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    .av-input:focus { outline: none; border-color: #059669 !important; box-shadow: 0 0 0 3px rgba(5,150,105,0.13) !important; }
    .av-input::placeholder { color: #9ca3af; }
    .cat-card:hover { border-color: #34d399 !important; background: #f0fdf4 !important; transform: translateY(-2px); }
    .mode-card:hover { border-color: #34d399 !important; background: #f0fdf4 !important; }
    .step-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(5,150,105,0.28) !important; }
    .step-btn:disabled { opacity: 0.45; cursor: not-allowed; }
    .back-btn:hover { background: #f0fdf4 !important; }
  `;

  if (!mounted) return null;

  // ── not authenticated ──────────────────────────────────────
  if (status === "unauthenticated") {
    return (
      <>
        <style>{styles}</style>
        <div style={{
          minHeight: "100vh", background: "#fafffe", display: "flex",
          alignItems: "center", justifyContent: "center", padding: "24px",
        }}>
          <div style={{
            textAlign: "center", animation: "fadeUp .5s ease both",
            maxWidth: 400,
          }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🔐</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0a1628", letterSpacing: "-0.03em", marginBottom: 10 }}>
              Accedi per pubblicare
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 28, lineHeight: 1.6 }}>
              Devi essere autenticato per condividere la tua disponibilità.
            </p>
            <Link href="/auth" style={{
              display: "inline-block", padding: "12px 28px",
              background: "linear-gradient(135deg,#059669,#10b981)",
              color: "#fff", borderRadius: 14, fontWeight: 700,
              textDecoration: "none", boxShadow: "0 4px 16px rgba(5,150,105,0.3)",
            }}>
              Vai al login
            </Link>
          </div>
        </div>
      </>
    );
  }

  // ── success ────────────────────────────────────────────────
  if (success) {
    return (
      <>
        <style>{styles}</style>
        <div style={{
          minHeight: "100vh", background: "#fafffe",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px",
        }}>
          <div style={{
            textAlign: "center", animation: "success-pop .55s cubic-bezier(.34,1.56,.64,1) both",
            maxWidth: 460,
          }}>
            {/* ring animato */}
            <div style={{ position: "relative", display: "inline-flex", marginBottom: 28 }}>
              <div style={{
                position: "absolute", inset: -12, borderRadius: "50%",
                border: "2px solid #34d399", animation: "pulse-ring 1.8s ease-out infinite",
              }} />
              <div style={{
                width: 96, height: 96, borderRadius: "50%",
                background: "linear-gradient(135deg,#059669,#10b981)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 44, boxShadow: "0 8px 32px rgba(5,150,105,0.35)",
              }}>🤝</div>
            </div>
            <h2 style={{
              fontSize: "clamp(26px,4vw,34px)", fontWeight: 800,
              color: "#0a1628", letterSpacing: "-0.04em", marginBottom: 12,
            }}>
              Aviability pubblicata!
            </h2>
            <p style={{ color: "#4b5563", lineHeight: 1.7, marginBottom: 8, fontSize: 16 }}>
              <strong style={{ color: "#059669" }}>"{form.title}"</strong> è ora visibile a tutti.
            </p>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 36 }}>
              Resterà attiva per <strong>31 giorni</strong>. Aspetta le offerte 🙌
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => { setSuccess(false); setForm({ title:"",description:"",wantInReturn:"",mode:"both",location:"",category:"other" }); setStep(1); }}
                style={{
                  padding: "12px 24px",
                  background: "linear-gradient(135deg,#059669,#10b981)",
                  color: "#fff", borderRadius: 14, fontWeight: 700,
                  border: "none", cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(5,150,105,0.3)", fontSize: 15,
                }}
              >
                + Pubblica un'altra
              </button>
              <Link href="/aviabilities" style={{
                padding: "12px 24px", background: "#fff",
                color: "#0a1628", borderRadius: 14, fontWeight: 600,
                border: "1.5px solid #d1d5db", textDecoration: "none", fontSize: 15,
              }}>
                Vai alla lista
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const selectedCat = CATEGORIES.find((c) => c.value === form.category);

  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: "100vh", background: "#fafffe" }}>

        {/* ── header fisso ─────────────────────────────────── */}
        <div style={{
          position: "sticky", top: 0, zIndex: 0,
          background: "rgba(250,255,254,0.92)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #d1fae5",
          padding: "14px 24px", display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#059669", letterSpacing: "-0.04em" }}>
              Scambio
            </span>
          </Link>
          {/* stepper */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: step >= s ? "linear-gradient(135deg,#059669,#10b981)" : "#e5e7eb",
                  color: step >= s ? "#fff" : "#9ca3af",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700,
                  transition: "all .3s ease",
                  boxShadow: step === s ? "0 2px 10px rgba(5,150,105,0.4)" : "none",
                }}>
                  {step > s ? "✓" : s}
                </div>
                {s < 3 && (
                  <div style={{
                    width: 24, height: 2,
                    background: step > s ? "#059669" : "#e5e7eb",
                    borderRadius: 2, transition: "background .3s ease",
                  }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>
            {step === 1 ? "Cosa offri?" : step === 2 ? "Dettagli" : "Modalità"}
          </div>
        </div>

        {/* ── contenuto ────────────────────────────────────── */}
        <div style={{
          maxWidth: 680, margin: "0 auto",
          padding: "clamp(32px,5vw,64px) 24px",
        }}>

          {/* ══ STEP 1 — titolo + categoria ══════════════════ */}
          {step === 1 && (
            <div key="step1" style={{ animation: "fadeUp .45s ease both" }}>

              <div style={{ marginBottom: 48 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                  borderRadius: 999, padding: "5px 14px", marginBottom: 20,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#059669", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Step 1 di 3
                  </span>
                </div>
                <h1 style={{
                  fontSize: "clamp(28px,5vw,42px)", fontWeight: 800,
                  color: "#0a1628", letterSpacing: "-0.04em", lineHeight: 1.15,
                  marginBottom: 10,
                }}>
                  Cosa puoi offrire?
                </h1>
                <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.6 }}>
                  Un titolo chiaro fa la differenza. Chi cerca troverà te.
                </p>
              </div>

              {/* input titolo */}
              <div style={{ marginBottom: 36 }}>
                <label style={{
                  display: "block", fontSize: 13, fontWeight: 700,
                  color: "#0a1628", letterSpacing: "0.02em",
                  textTransform: "uppercase", marginBottom: 10,
                }}>
                  Titolo dell'offerta
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    ref={titleRef}
                    className="av-input"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value.slice(0, CHAR_LIMITS.title))}
                    placeholder="es. Lezione di chitarra acustica, Code review React, Giro in bici..."
                    style={{
                      width: "100%", padding: "16px 20px",
                      fontSize: 17, fontWeight: 500, color: "#0a1628",
                      background: "#fff", borderRadius: 16,
                      border: "1.5px solid #bbf7d0",
                      boxShadow: "0 2px 12px rgba(5,150,105,0.06)",
                      transition: "all .2s ease", boxSizing: "border-box",
                    }}
                  />
                  <span style={{
                    position: "absolute", right: 16, bottom: -22,
                    fontSize: 12, color: form.title.length > 70 ? "#ef4444" : "#9ca3af",
                  }}>
                    {form.title.length}/{CHAR_LIMITS.title}
                  </span>
                </div>
              </div>

              {/* categorie */}
              <div style={{ marginTop: 12 }}>
                <label style={{
                  display: "block", fontSize: 13, fontWeight: 700,
                  color: "#0a1628", letterSpacing: "0.02em",
                  textTransform: "uppercase", marginBottom: 16,
                }}>
                  Categoria
                </label>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
                  gap: 10,
                }}>
                  {CATEGORIES.map((cat, i) => (
                    <button
                      key={cat.value}
                      className="cat-card"
                      onClick={() => update("category", cat.value)}
                      style={{
                        padding: "14px 12px", borderRadius: 16, cursor: "pointer",
                        border: form.category === cat.value ? "2px solid #059669" : "1.5px solid #e5e7eb",
                        background: form.category === cat.value ? "#f0fdf4" : "#fff",
                        textAlign: "left", transition: "all .18s ease",
                        boxShadow: form.category === cat.value
                          ? "0 4px 16px rgba(5,150,105,0.15)"
                          : "0 2px 8px rgba(0,0,0,0.04)",
                        animation: `fadeUp .4s ease ${i * 0.04}s both`,
                      }}
                    >
                      <div style={{ fontSize: 22, marginBottom: 6 }}>{cat.emoji}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1628", marginBottom: 2 }}>
                        {cat.label}
                      </div>
                      <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.4 }}>
                        {cat.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 48, display: "flex", justifyContent: "flex-end" }}>
                <button
                  className="step-btn"
                  disabled={!canNext1}
                  onClick={() => setStep(2)}
                  style={{
                    padding: "14px 32px",
                    background: "linear-gradient(135deg,#059669,#10b981)",
                    color: "#fff", borderRadius: 14, fontWeight: 700,
                    border: "none", cursor: "pointer", fontSize: 16,
                    boxShadow: "0 4px 16px rgba(5,150,105,0.3)",
                    transition: "all .18s ease",
                    display: "flex", alignItems: "center", gap: 8,
                  }}
                >
                  Continua
                  <span style={{ fontSize: 18 }}>→</span>
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 2 — descrizione + wantInReturn ══════════ */}
          {step === 2 && (
            <div key="step2" style={{ animation: "fadeUp .45s ease both" }}>

              <div style={{ marginBottom: 40 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                  borderRadius: 999, padding: "5px 14px", marginBottom: 20,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#059669", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Step 2 di 3
                  </span>
                </div>
                <h1 style={{
                  fontSize: "clamp(26px,4vw,38px)", fontWeight: 800,
                  color: "#0a1628", letterSpacing: "-0.04em", marginBottom: 8,
                }}>
                  Raccontala bene
                </h1>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10, marginTop: 4,
                }}>
                  <span style={{
                    padding: "4px 12px", borderRadius: 999,
                    background: "#f0fdf4", border: "1px solid #bbf7d0",
                    fontSize: 13, fontWeight: 600, color: "#059669",
                  }}>
                    {selectedCat?.emoji} {selectedCat?.label}
                  </span>
                  <span style={{ color: "#6b7280", fontSize: 14 }}>· {form.title}</span>
                </div>
              </div>

              {/* descrizione */}
              <div style={{ marginBottom: 28 }}>
                <label style={{
                  display: "block", fontSize: 13, fontWeight: 700,
                  color: "#0a1628", letterSpacing: "0.02em",
                  textTransform: "uppercase", marginBottom: 10,
                }}>
                  Descrizione <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <textarea
                    className="av-input"
                    value={form.description}
                    onChange={(e) => update("description", e.target.value.slice(0, CHAR_LIMITS.description))}
                    placeholder="Descrivi cosa offri, come funziona, che livello hai, quante sessioni... più sei specifico più trovi il match giusto."
                    rows={6}
                    style={{
                      width: "100%", padding: "16px 20px",
                      fontSize: 15, fontWeight: 400, color: "#0a1628",
                      background: "#fff", borderRadius: 16,
                      border: "1.5px solid #bbf7d0",
                      boxShadow: "0 2px 12px rgba(5,150,105,0.06)",
                      transition: "all .2s ease", boxSizing: "border-box",
                      resize: "vertical", lineHeight: 1.6,
                      fontFamily: "inherit",
                    }}
                  />
                  <span style={{
                    position: "absolute", right: 16, bottom: -22,
                    fontSize: 12, color: form.description.length > 900 ? "#ef4444" : "#9ca3af",
                  }}>
                    {form.description.length}/{CHAR_LIMITS.description}
                  </span>
                </div>
              </div>

              {/* want in return */}
              <div style={{ marginTop: 16 }}>
                <label style={{
                  display: "block", fontSize: 13, fontWeight: 700,
                  color: "#0a1628", letterSpacing: "0.02em",
                  textTransform: "uppercase", marginBottom: 6,
                }}>
                  Cosa cerchi in cambio{" "}
                  <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, textTransform: "none" }}>
                    (opzionale)
                  </span>
                </label>
                <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 10, lineHeight: 1.5 }}>
                  Lascia vuoto se sei aperto a qualsiasi proposta.
                </p>
                <div style={{ position: "relative" }}>
                  <input
                    className="av-input"
                    value={form.wantInReturn}
                    onChange={(e) => update("wantInReturn", e.target.value.slice(0, CHAR_LIMITS.wantInReturn))}
                    placeholder="es. Lezioni di italiano, sessione di yoga, aiuto con il CV..."
                    style={{
                      width: "100%", padding: "14px 20px",
                      fontSize: 15, fontWeight: 400, color: "#0a1628",
                      background: "#fff", borderRadius: 16,
                      border: "1.5px solid #e5e7eb",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "all .2s ease", boxSizing: "border-box",
                    }}
                  />
                  <span style={{
                    position: "absolute", right: 16, bottom: -22,
                    fontSize: 12, color: "#9ca3af",
                  }}>
                    {form.wantInReturn.length}/{CHAR_LIMITS.wantInReturn}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: 52, display: "flex", justifyContent: "space-between", gap: 12 }}>
                <button
                  className="back-btn"
                  onClick={() => setStep(1)}
                  style={{
                    padding: "13px 24px", background: "#fff",
                    color: "#4b5563", borderRadius: 14, fontWeight: 600,
                    border: "1.5px solid #d1d5db", cursor: "pointer",
                    fontSize: 15, transition: "all .18s ease",
                  }}
                >
                  ← Indietro
                </button>
                <button
                  className="step-btn"
                  disabled={!canNext2}
                  onClick={() => setStep(3)}
                  style={{
                    padding: "14px 32px",
                    background: "linear-gradient(135deg,#059669,#10b981)",
                    color: "#fff", borderRadius: 14, fontWeight: 700,
                    border: "none", cursor: "pointer", fontSize: 16,
                    boxShadow: "0 4px 16px rgba(5,150,105,0.3)",
                    transition: "all .18s ease",
                    display: "flex", alignItems: "center", gap: 8,
                  }}
                >
                  Continua →
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 3 — modalità + location + preview ═══════ */}
          {step === 3 && (
            <div key="step3" style={{ animation: "fadeUp .45s ease both" }}>

              <div style={{ marginBottom: 40 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                  borderRadius: 999, padding: "5px 14px", marginBottom: 20,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#059669", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Step 3 di 3 — Ultimo!
                  </span>
                </div>
                <h1 style={{
                  fontSize: "clamp(26px,4vw,38px)", fontWeight: 800,
                  color: "#0a1628", letterSpacing: "-0.04em", marginBottom: 8,
                }}>
                  Come vuoi incontrarti?
                </h1>
                <p style={{ color: "#6b7280", fontSize: 15 }}>
                  Scegli la modalità e, se fisico, indica la città.
                </p>
              </div>

              {/* mode selector */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {MODES.map((m) => (
                    <button
                      key={m.value}
                      className="mode-card"
                      onClick={() => update("mode", m.value)}
                      style={{
                        flex: "1 1 140px", padding: "18px 16px",
                        borderRadius: 18, cursor: "pointer",
                        border: form.mode === m.value ? "2px solid #059669" : "1.5px solid #e5e7eb",
                        background: form.mode === m.value ? "#f0fdf4" : "#fff",
                        textAlign: "center", transition: "all .18s ease",
                        boxShadow: form.mode === m.value
                          ? "0 4px 16px rgba(5,150,105,0.18)"
                          : "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1628", marginBottom: 3 }}>
                        {m.label}
                      </div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>{m.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* location */}
              {(form.mode === "physical" || form.mode === "both") && (
                <div style={{ marginBottom: 32, animation: "fadeIn .3s ease both" }}>
                  <label style={{
                    display: "block", fontSize: 13, fontWeight: 700,
                    color: "#0a1628", letterSpacing: "0.02em",
                    textTransform: "uppercase", marginBottom: 10,
                  }}>
                    Città / zona{" "}
                    <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, textTransform: "none" }}>
                      (opzionale)
                    </span>
                  </label>
                  <input
                    className="av-input"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value.slice(0, 100))}
                    placeholder="es. Roma, Prati / Milano, Navigli"
                    style={{
                      width: "100%", padding: "14px 20px",
                      fontSize: 15, color: "#0a1628",
                      background: "#fff", borderRadius: 16,
                      border: "1.5px solid #bbf7d0",
                      boxShadow: "0 2px 8px rgba(5,150,105,0.06)",
                      transition: "all .2s ease", boxSizing: "border-box",
                    }}
                  />
                </div>
              )}

              {/* ── preview card ────────────────────────────── */}
              <div style={{
                background: "linear-gradient(135deg,#064e3b,#047857)",
                borderRadius: 24, padding: "28px",
                boxShadow: "0 8px 32px rgba(4,78,59,0.28)",
                marginBottom: 36, position: "relative", overflow: "hidden",
              }}>
                {/* watermark */}
                <div style={{
                  position: "absolute", right: -10, top: -10,
                  fontSize: 120, fontWeight: 900, color: "rgba(255,255,255,0.04)",
                  lineHeight: 1, pointerEvents: "none", userSelect: "none",
                }}>
                  ∞
                </div>
                <div style={{
                  display: "flex", alignItems: "flex-start",
                  justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12,
                }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{
                      padding: "4px 12px", borderRadius: 999,
                      background: "rgba(52,211,153,0.2)", border: "1px solid rgba(52,211,153,0.4)",
                      fontSize: 12, fontWeight: 700, color: "#6ee7b7",
                      letterSpacing: "0.05em", textTransform: "uppercase",
                    }}>
                      {selectedCat?.emoji} {selectedCat?.label}
                    </span>
                    <span style={{
                      padding: "4px 12px", borderRadius: 999,
                      background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                      fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)",
                    }}>
                      {MODES.find((m) => m.value === form.mode)?.icon}{" "}
                      {MODES.find((m) => m.value === form.mode)?.label}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 12, color: "rgba(110,231,183,0.7)", fontWeight: 600,
                  }}>
                    31 giorni · attiva
                  </span>
                </div>

                <h3 style={{
                  fontSize: "clamp(18px,3vw,22px)", fontWeight: 800,
                  color: "#fff", letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.25,
                }}>
                  {form.title || <span style={{ opacity: .4 }}>Titolo della tua offerta</span>}
                </h3>

                {form.description && (
                  <p style={{
                    fontSize: 14, color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.65, marginBottom: 14,
                    display: "-webkit-box", WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>
                    {form.description}
                  </p>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  {form.location && (
                    <span style={{ fontSize: 13, color: "rgba(110,231,183,0.85)", fontWeight: 500 }}>
                      📍 {form.location}
                    </span>
                  )}
                  {form.wantInReturn && (
                    <span style={{
                      fontSize: 12, color: "rgba(255,255,255,0.55)",
                      background: "rgba(255,255,255,0.07)",
                      borderRadius: 999, padding: "3px 10px",
                    }}>
                      cerca: {form.wantInReturn}
                    </span>
                  )}
                </div>

                <div style={{
                  marginTop: 18, paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  {user?.picture && (
                    <img
                      src={user.picture}
                      alt={user.name}
                      style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)" }}
                    />
                  )}
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
                    {user?.name ? `@${user.name}` : user?.name}
                  </span>
                </div>
              </div>

              {/* errore */}
              {error && (
                <div style={{
                  padding: "14px 18px", borderRadius: 12,
                  background: "#fef2f2", border: "1px solid #fecaca",
                  color: "#dc2626", fontSize: 14, fontWeight: 500,
                  marginBottom: 20,
                }}>
                  ⚠️ {error}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <button
                  className="back-btn"
                  onClick={() => setStep(2)}
                  style={{
                    padding: "13px 24px", background: "#fff",
                    color: "#4b5563", borderRadius: 14, fontWeight: 600,
                    border: "1.5px solid #d1d5db", cursor: "pointer",
                    fontSize: 15, transition: "all .18s ease",
                  }}
                >
                  ← Indietro
                </button>
                <button
                  className="step-btn"
                  disabled={loading || !canSubmit}
                  onClick={handleSubmit}
                  style={{
                    padding: "14px 36px",
                    background: loading ? "#d1fae5" : "linear-gradient(135deg,#059669,#10b981)",
                    color: loading ? "#059669" : "#fff",
                    borderRadius: 14, fontWeight: 800,
                    border: "none", cursor: loading ? "not-allowed" : "pointer",
                    fontSize: 16,
                    boxShadow: loading ? "none" : "0 4px 20px rgba(5,150,105,0.35)",
                    transition: "all .2s ease",
                    display: "flex", alignItems: "center", gap: 10,
                    minWidth: 180, justifyContent: "center",
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{
                        display: "inline-block", width: 16, height: 16,
                        border: "2px solid #059669", borderTopColor: "transparent",
                        borderRadius: "50%", animation: "spin 0.7s linear infinite",
                      }} />
                      Pubblicando...
                    </>
                  ) : (
                    <>🚀 Pubblica</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}