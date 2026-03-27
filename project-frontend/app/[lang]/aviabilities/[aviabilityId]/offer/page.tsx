"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { AviabilityWithUser } from "@/app/[lang]/types/Aviability.types";
import { aviabilitiesService } from "@/app/[lang]/services/aviabilities.service";
import { aviabilityOffersService } from "@/app/[lang]/services/aviabilityOffers.service";
import { ApiError } from "next/dist/server/api-utils";

type PreferredMode = "remote" | "physical";

interface FormState {
  message:       string;
  offerDetail:   string;
  preferredMode: PreferredMode | null;
}

const CHAR_LIMITS = { message: 500, offerDetail: 300 };

const MODES: { value: PreferredMode; label: string; icon: string; sub: string }[] = [
  { value: "remote",   label: "Remoto",   icon: "🌐", sub: "online, da ovunque" },
  { value: "physical", label: "Fisico",   icon: "📍", sub: "in presenza" },
];

const styles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: .6; }
    50%  { transform: scale(1.5); opacity: 0;  }
    100% { transform: scale(1);   opacity: 0;  }
  }
  @keyframes success-pop {
    0%   { transform: scale(0.7); opacity: 0; }
    60%  { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .av-input:focus { outline: none; border-color: #059669 !important; box-shadow: 0 0 0 3px rgba(5,150,105,0.13) !important; }
  .av-input::placeholder { color: #9ca3af; }
  .mode-card:hover { border-color: #34d399 !important; background: #f0fdf4 !important; }
  .step-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(5,150,105,0.28) !important; }
  .step-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .back-btn:hover { background: #f0fdf4 !important; }
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function AviabilityPreviewBadge({ av }: { av: AviabilityWithUser }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 18,
      border: "1.5px solid #d1fae5",
      boxShadow: "0 2px 12px rgba(5,150,105,0.07)",
      padding: "16px 20px", marginBottom: 36,
      display: "flex", gap: 14, alignItems: "flex-start",
      animation: "fadeIn .35s ease both",
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12, flexShrink: 0,
        background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18,
      }}>
        🤝
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.05em", textTransform: "uppercase", margin: "0 0 3px" }}>
          Stai offrendo per
        </p>
        <p style={{
          fontSize: 14, fontWeight: 800, color: "#0a1628",
          letterSpacing: "-0.02em", margin: "0 0 4px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {av.title}
        </p>
        <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
          di {av.user.handle ? `@${av.user.handle}` : av.user.name}
          {av.wantInReturn && (
            <span style={{ color: "#059669", fontWeight: 600 }}> · cerca: {av.wantInReturn}</span>
          )}
        </p>
      </div>
      <Link
        href={`/aviabilities/${av.id}`}
        style={{ fontSize: 12, color: "#6b7280", textDecoration: "none", fontWeight: 600, flexShrink: 0, alignSelf: "center" }}
      >
        vedi →
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MakeOfferPage() {
  const params   = useParams<{ aviabilityId: string }>();
  const router   = useRouter();
  const { user, status } = useAuth();

  const [av, setAv]           = useState<AviabilityWithUser | null>(null);
  const [loadingAv, setLoadingAv] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [step, setStep]       = useState<1 | 2>(1);
  const [form, setForm]       = useState<FormState>({
    message:       "",
    offerDetail:   "",
    preferredMode: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => { setMounted(true) }, []);

  useEffect(() => {
    if (!params?.aviabilityId) return;
    aviabilitiesService.getById(Number(params.aviabilityId))
      .then(setAv)
      .catch(() => setAv(null))
      .finally(() => setLoadingAv(false));
  }, [params?.aviabilityId]);

  if (!mounted) return null;

  const update = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((p) => ({ ...p, [key]: val }));

  const canNext1  = form.message.trim().length >= 10;
  const canSubmit = canNext1;

  // ── redirect se non loggato ──────────────────────────────────
  if (status === "unauthenticated") {
    return (
      <>
        <style precedence="default" href="make-offer">{styles}</style>
        <div style={{ minHeight: "100vh", background: "#fafffe", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ textAlign: "center", animation: "fadeUp .5s ease both", maxWidth: 400 }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🔐</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0a1628", letterSpacing: "-0.03em", marginBottom: 10 }}>
              Accedi per fare un'offerta
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 28, lineHeight: 1.6 }}>
              Devi essere autenticato per proporre uno scambio.
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

  // ── success ──────────────────────────────────────────────────
  if (success && av) {
    return (
      <>
        <style precedence="default" href="make-offer">{styles}</style>
        <div style={{ minHeight: "100vh", background: "#fafffe", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ textAlign: "center", animation: "success-pop .55s cubic-bezier(.34,1.56,.64,1) both", maxWidth: 460 }}>
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
              }}>🙌</div>
            </div>

            <h2 style={{ fontSize: "clamp(24px,4vw,32px)", fontWeight: 800, color: "#0a1628", letterSpacing: "-0.04em", marginBottom: 12 }}>
              Offerta inviata!
            </h2>
            <p style={{ color: "#4b5563", lineHeight: 1.7, marginBottom: 8, fontSize: 16 }}>
              Hai fatto un'offerta per <strong style={{ color: "#059669" }}>"{av.title}"</strong>.
            </p>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 36 }}>
              Aspetta che {av.user.handle ? `@${av.user.handle}` : av.user.name} risponda 🤞
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => router.push(`/aviabilities/${av.id}`)}
                style={{
                  padding: "12px 28px",
                  background: "linear-gradient(135deg,#059669,#10b981)",
                  color: "#fff", borderRadius: 14, fontWeight: 700,
                  border: "none", cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(5,150,105,0.3)", fontSize: 15,
                }}
              >
                Vedi l'aviability →
              </button>
              <Link href="/aviabilities" style={{
                padding: "12px 24px", background: "#fff",
                color: "#0a1628", borderRadius: 14, fontWeight: 600,
                border: "1.5px solid #d1d5db", textDecoration: "none", fontSize: 15,
              }}>
                Torna alla lista
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  async function handleSubmit() {
    if (!canSubmit || !av) return;
    setSubmitting(true);
    setError(null);
    try {
      await aviabilityOffersService.makeOffer({
        aviabilityId:  av.id,
        message:       form.message.trim(),
        offerDetail:   form.offerDetail.trim() || undefined,
        preferredMode: form.preferredMode ?? undefined,
      });
      setSuccess(true);
    } catch (e) {
      if (e instanceof ApiError && e.statusCode === 403) {
        setError("Hai delle recensioni in sospeso. Completale prima di fare nuove offerte.");
      } else {
        setError("Qualcosa è andato storto. Riprova.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  // ── loading aviability ───────────────────────────────────────
  if (loadingAv) return (
    <div style={{ minHeight: "100vh", background: "#fafffe", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#9ca3af", fontSize: 15 }}>Caricamento...</span>
    </div>
  );

  if (!av) return (
    <div style={{ minHeight: "100vh", background: "#fafffe", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <span style={{ color: "#ef4444", fontSize: 15 }}>Aviability non trovata.</span>
      <Link href="/aviabilities" style={{ color: "#059669", fontSize: 14, fontWeight: 600 }}>← Torna alla lista</Link>
    </div>
  );

  // ── se sei l'autore non puoi offrire ────────────────────────
  if (user?.id === av.userId) return (
    <div style={{ minHeight: "100vh", background: "#fafffe", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", animation: "fadeUp .5s ease both", maxWidth: 400 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🫣</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0a1628", letterSpacing: "-0.03em", marginBottom: 10 }}>
          Non puoi offrire sulla tua aviability
        </h2>
        <Link href={`/aviabilities/${av.id}`} style={{
          display: "inline-block", marginTop: 8, padding: "11px 24px",
          background: "linear-gradient(135deg,#059669,#10b981)",
          color: "#fff", borderRadius: 14, fontWeight: 700,
          textDecoration: "none", boxShadow: "0 4px 16px rgba(5,150,105,0.3)", fontSize: 14,
        }}>
          Torna all'aviability
        </Link>
      </div>
    </div>
  );

  // ── form ─────────────────────────────────────────────────────
  return (
    <>
      <style precedence="default" href="make-offer">{styles}</style>

      <div style={{ minHeight: "100vh", background: "#fafffe" }}>

        {/* ── sticky header ─────────────────────────────────── */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          background: "rgba(250,255,254,0.92)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #d1fae5",
          padding: "14px 24px", display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>
          <Link href={`/aviabilities/${av.id}`} style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", fontSize: 13, fontWeight: 600, color: "#6b7280" }}>
            ← Indietro
          </Link>

          {/* stepper */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {[1, 2].map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: step >= s ? "linear-gradient(135deg,#059669,#10b981)" : "#e5e7eb",
                  color: step >= s ? "#fff" : "#9ca3af",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, transition: "all .3s ease",
                  boxShadow: step === s ? "0 2px 10px rgba(5,150,105,0.4)" : "none",
                }}>
                  {step > s ? "✓" : s}
                </div>
                {s < 2 && (
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
            {step === 1 ? "La tua proposta" : "Modalità & invio"}
          </div>
        </div>

        {/* ── content ───────────────────────────────────────── */}
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "clamp(32px,5vw,56px) 24px" }}>

          <AviabilityPreviewBadge av={av} />

          {/* ══ STEP 1 — messaggio + offerDetail ══════════════ */}
          {step === 1 && (
            <div key="step1" style={{ animation: "fadeUp .45s ease both" }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                  borderRadius: 999, padding: "5px 14px", marginBottom: 20,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#059669", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Step 1 di 2
                  </span>
                </div>
                <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "#0a1628", letterSpacing: "-0.04em", marginBottom: 8 }}>
                  Cosa proponi?
                </h1>
                <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.6 }}>
                  Spiega perché sei la persona giusta per questo scambio.
                </p>
              </div>

              {/* message */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#0a1628", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 10 }}>
                  Il tuo messaggio <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <textarea
                    className="av-input"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value.slice(0, CHAR_LIMITS.message))}
                    placeholder="Presentati, spiega cosa puoi offrire in cambio e perché sei interessato a questo scambio..."
                    rows={5}
                    style={{
                      width: "100%", padding: "16px 20px",
                      fontSize: 15, color: "#0a1628",
                      background: "#fff", borderRadius: 16,
                      border: "1.5px solid #bbf7d0",
                      boxShadow: "0 2px 12px rgba(5,150,105,0.06)",
                      transition: "all .2s ease", boxSizing: "border-box",
                      resize: "vertical", lineHeight: 1.6, fontFamily: "inherit",
                    }}
                  />
                  <span style={{ position: "absolute", right: 16, bottom: -22, fontSize: 12, color: form.message.length > 450 ? "#ef4444" : "#9ca3af" }}>
                    {form.message.length}/{CHAR_LIMITS.message}
                  </span>
                </div>
              </div>

              {/* offer detail */}
              <div style={{ marginTop: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#0a1628", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 6 }}>
                  Cosa offri concretamente{" "}
                  <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, textTransform: "none" }}>(opzionale)</span>
                </label>
                <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 10, lineHeight: 1.5 }}>
                  Una riga sintetica — es. "3 sessioni di yoga da 1h", "Code review di 2h su React".
                </p>
                <div style={{ position: "relative" }}>
                  <input
                    className="av-input"
                    value={form.offerDetail}
                    onChange={(e) => update("offerDetail", e.target.value.slice(0, CHAR_LIMITS.offerDetail))}
                    placeholder="es. 2 lezioni di chitarra acustica da 45 min..."
                    style={{
                      width: "100%", padding: "14px 20px",
                      fontSize: 15, color: "#0a1628",
                      background: "#fff", borderRadius: 16,
                      border: "1.5px solid #e5e7eb",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "all .2s ease", boxSizing: "border-box",
                    }}
                  />
                  <span style={{ position: "absolute", right: 16, bottom: -22, fontSize: 12, color: "#9ca3af" }}>
                    {form.offerDetail.length}/{CHAR_LIMITS.offerDetail}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: 52, display: "flex", justifyContent: "flex-end" }}>
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
                  Continua <span style={{ fontSize: 18 }}>→</span>
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 2 — modalità + preview + submit ══════════ */}
          {step === 2 && (
            <div key="step2" style={{ animation: "fadeUp .45s ease both" }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                  borderRadius: 999, padding: "5px 14px", marginBottom: 20,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#059669", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Step 2 di 2 — Ultimo!
                  </span>
                </div>
                <h1 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#0a1628", letterSpacing: "-0.04em", marginBottom: 8 }}>
                  Come preferisci incontrarti?
                </h1>
                <p style={{ color: "#6b7280", fontSize: 15 }}>
                  Opzionale — se hai una preferenza.
                </p>
              </div>

              {/* mode selector */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
                {/* nessuna preferenza */}
                <button
                  className="mode-card"
                  onClick={() => update("preferredMode", null)}
                  style={{
                    flex: "1 1 140px", padding: "18px 16px", borderRadius: 18, cursor: "pointer",
                    border: form.preferredMode === null ? "2px solid #059669" : "1.5px solid #e5e7eb",
                    background: form.preferredMode === null ? "#f0fdf4" : "#fff",
                    textAlign: "center", transition: "all .18s ease",
                    boxShadow: form.preferredMode === null ? "0 4px 16px rgba(5,150,105,0.18)" : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>♾️</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1628", marginBottom: 3 }}>Flessibile</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>nessuna preferenza</div>
                </button>

                {MODES.map((m) => (
                  <button
                    key={m.value}
                    className="mode-card"
                    onClick={() => update("preferredMode", m.value)}
                    style={{
                      flex: "1 1 140px", padding: "18px 16px", borderRadius: 18, cursor: "pointer",
                      border: form.preferredMode === m.value ? "2px solid #059669" : "1.5px solid #e5e7eb",
                      background: form.preferredMode === m.value ? "#f0fdf4" : "#fff",
                      textAlign: "center", transition: "all .18s ease",
                      boxShadow: form.preferredMode === m.value ? "0 4px 16px rgba(5,150,105,0.18)" : "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1628", marginBottom: 3 }}>{m.label}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{m.sub}</div>
                  </button>
                ))}
              </div>

              {/* preview */}
              <div style={{
                background: "linear-gradient(135deg,#064e3b,#047857)",
                borderRadius: 24, padding: "24px 28px",
                boxShadow: "0 8px 32px rgba(4,78,59,0.28)",
                marginBottom: 28, position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", right: -10, top: -10,
                  fontSize: 120, fontWeight: 900, color: "rgba(255,255,255,0.04)",
                  lineHeight: 1, pointerEvents: "none", userSelect: "none",
                }}>∞</div>

                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(110,231,183,0.7)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 10px" }}>
                  La tua offerta
                </p>
                <p style={{ fontSize: 15, color: "#fff", lineHeight: 1.65, margin: "0 0 12px", fontWeight: 400 }}>
                  {form.message}
                </p>
                {form.offerDetail && (
                  <span style={{
                    fontSize: 12, color: "rgba(110,231,183,0.9)", fontWeight: 600,
                    background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "5px 10px",
                    display: "inline-block", marginBottom: 12,
                  }}>
                    {form.offerDetail}
                  </span>
                )}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  {user?.picture && (
                    <img src={user.picture} alt={user.name ?? ""} style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)" }} />
                  )}
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
                    {user?.handle ? `@${user.handle}` : user?.name}
                  </span>
                  {form.preferredMode && (
                    <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(110,231,183,0.7)", fontWeight: 600 }}>
                      {form.preferredMode === "remote" ? "🌐 Remoto" : "📍 Fisico"}
                    </span>
                  )}
                </div>
              </div>

              {/* error */}
              {error && (
                <div style={{
                  padding: "14px 18px", borderRadius: 12,
                  background: "#fef2f2", border: "1px solid #fecaca",
                  color: "#dc2626", fontSize: 14, fontWeight: 500, marginBottom: 20,
                }}>
                  ⚠️ {error}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
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
                  disabled={submitting || !canSubmit}
                  onClick={handleSubmit}
                  style={{
                    padding: "14px 36px",
                    background: submitting ? "#d1fae5" : "linear-gradient(135deg,#059669,#10b981)",
                    color: submitting ? "#059669" : "#fff",
                    borderRadius: 14, fontWeight: 800,
                    border: "none", cursor: submitting ? "not-allowed" : "pointer",
                    fontSize: 16,
                    boxShadow: submitting ? "none" : "0 4px 20px rgba(5,150,105,0.35)",
                    transition: "all .2s ease",
                    display: "flex", alignItems: "center", gap: 10,
                    minWidth: 180, justifyContent: "center",
                  }}
                >
                  {submitting ? (
                    <>
                      <span style={{
                        display: "inline-block", width: 16, height: 16,
                        border: "2px solid #059669", borderTopColor: "transparent",
                        borderRadius: "50%", animation: "spin 0.7s linear infinite",
                      }} />
                      Invio...
                    </>
                  ) : (
                    <>🤝 Invia l'offerta</>
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