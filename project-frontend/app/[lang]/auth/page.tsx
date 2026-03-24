"use client";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Link from "next/link";
import { getT } from "../i18n/translations";
import { useLang } from "../context/LangContext";

interface AuthPageProps {
  callbackUrl?: string;
}

export default function AuthPage({ callbackUrl = "/" }: AuthPageProps) {
  const lang = useLang();
  const tr = getT(lang);

  const { loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

  const handleMagicLink = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/auth/magic/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? "Errore invio");
      }
      setSent(true);
    } catch (e) {
      console.log(e);
      setError("Qualcosa è andato storto. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "#fafffe",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50%       { transform: scale(1.5); opacity: 0.5; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .av-btn-primary {
          transition: box-shadow 0.18s, opacity 0.18s, transform 0.18s;
        }
        .av-btn-primary:hover {
          box-shadow: 0 8px 32px rgba(5,150,105,0.38) !important;
          opacity: 0.93;
          transform: translateY(-1px);
        }
        .av-btn-primary:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }
        .av-btn-google {
          transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
        }
        .av-btn-google:hover {
          background: #f3f4f6 !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important;
          transform: translateY(-1px);
        }
        .av-input {
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .av-input:focus {
          border-color: #059669 !important;
          box-shadow: 0 0 0 3px rgba(5,150,105,0.10);
          outline: none;
        }
        .av-input.error {
          border-color: #f87171 !important;
        }
        @media (max-width: 768px) {
          .av-auth-grid {
            grid-template-columns: 1fr !important;
          }
          .av-auth-left {
            display: none !important;
          }
          .av-auth-right {
            padding: 48px 24px !important;
            justify-content: center;
          }
        }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div
        className="av-auth-left"
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 45%, #047857 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 56px",
        }}
      >
        {/* Background glows */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(52,211,153,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(5,150,105,0.25) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        {/* Floating dots */}
        {[
          { top: "12%", left: "10%", size: 7, delay: "0s" },
          { top: "35%", left: "6%", size: 4, delay: "0.5s" },
          { top: "65%", left: "12%", size: 9, delay: "1.1s" },
          { top: "20%", right: "8%", size: 5, delay: "0.3s" },
          { top: "80%", right: "15%", size: 6, delay: "0.8s" },
          { top: "50%", right: "5%", size: 4, delay: "1.4s" },
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
              background: "#34d399",
              animation: `pulse-dot 2.5s ease-in-out ${d.delay} infinite`,
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div style={{ position: "relative", animation: "fadeIn 0.6s ease both" }}>
          <Link
            href={`/${lang}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "rgba(52,211,153,0.2)",
                border: "1px solid rgba(52,211,153,0.4)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" fill="#34d399" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
              }}
            >
              Aviability
            </span>
          </Link>
        </div>

        {/* Center content */}
        <div style={{ position: "relative" }}>
          {/* Loop badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "999px",
              padding: "6px 16px",
              marginBottom: "32px",
              animation: "fadeIn 0.6s ease 0.1s both",
            }}
          >
            {["Publish", "Offer", "Match"].map((step, i) => (
              <div key={step} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: 700, fontSize: "13px", color: "#6ee7b7" }}>{step}</span>
                {i < 2 && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.4 }}>
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="#6ee7b7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <h2
            style={{
              fontSize: "clamp(34px, 3.5vw, 52px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              marginBottom: "24px",
              animation: "fadeUp 0.7s ease 0.2s both",
            }}
          >
            Il tuo tempo{" "}
            <span style={{ color: "#6ee7b7" }}>vale qualcosa.</span>
            <br />
            Qualcuno ne ha bisogno.
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              maxWidth: "400px",
              animation: "fadeUp 0.7s ease 0.3s both",
            }}
          >
            Pubblica cosa puoi offrire, trova ciò di cui hai bisogno.
            Scambia tempo e competenze — senza denaro.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "48px",
              animation: "fadeUp 0.7s ease 0.4s both",
            }}
          >
            {[
              { value: "2 min", label: "per pubblicare" },
              { value: "100%", label: "gratuito" },
              { value: "∞", label: "scambi possibili" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: 800,
                    color: "#6ee7b7",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "4px", letterSpacing: "0.04em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div
          style={{
            position: "relative",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "28px",
            animation: "fadeIn 0.7s ease 0.5s both",
          }}
        >
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, fontStyle: "italic" }}>
            "In un mondo ottimizzato per le transazioni,
            <br />
            Aviability è ottimizzata per le <span style={{ color: "#6ee7b7" }}>persone</span>."
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="av-auth-right"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 72px",
          position: "relative",
          background: "#fafffe",
        }}
      >
        {/* Back link */}
        <Link
          href={`/${lang}`}
          style={{
            position: "absolute",
            top: "32px",
            left: "40px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#9ca3af",
            textDecoration: "none",
            letterSpacing: "0.02em",
            transition: "color 0.18s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#059669")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Torna indietro
        </Link>

        {!sent ? (
          <div style={{ maxWidth: "400px", width: "100%" }}>
            {/* Header */}
            <div style={{ marginBottom: "48px", animation: "fadeUp 0.6s ease both" }}>
              <div
                style={{
                  display: "inline-block",
                  background: "#ecfdf5",
                  border: "1px solid #6ee7b7",
                  borderRadius: "999px",
                  padding: "5px 14px",
                  color: "#059669",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                Accedi o Registrati
              </div>
              <h1
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "#0a1628",
                  lineHeight: 1.1,
                  marginBottom: "12px",
                }}
              >
                Benvenuto su{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Aviability
                </span>
              </h1>
              <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.6 }}>
                Entra con Google o usa il tuo indirizzo email — è gratis, sempre.
              </p>
            </div>

            {/* Google button */}
            <button
              onClick={handleGoogle}
              disabled={googleLoading}
              className="av-btn-google"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                background: "#fff",
                border: "1.5px solid #e5e7eb",
                borderRadius: "14px",
                padding: "15px 24px",
                fontSize: "15px",
                fontWeight: 600,
                color: "#0a1628",
                cursor: "pointer",
                marginBottom: "28px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                animation: "fadeUp 0.6s ease 0.1s both",
              }}
            >
              {googleLoading ? (
                <span
                  style={{
                    width: "18px",
                    height: "18px",
                    border: "2px solid #e5e7eb",
                    borderTop: "2px solid #059669",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin-slow 0.7s linear infinite",
                  }}
                />
              ) : (
                <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
                  <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" />
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" />
                </svg>
              )}
              Continua con Google
            </button>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "28px",
                animation: "fadeUp 0.6s ease 0.2s both",
              }}
            >
              <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
              <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                oppure via email
              </span>
              <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
            </div>

            {/* Magic link form */}
            <div style={{ animation: "fadeUp 0.6s ease 0.3s both" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#374151",
                  marginBottom: "8px",
                  letterSpacing: "0.02em",
                }}
              >
                Indirizzo email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleMagicLink()}
                placeholder="tua@email.com"
                className={`av-input ${error ? "error" : ""}`}
                autoComplete="email"
                disabled={loading}
                style={{
                  width: "100%",
                  background: "#fff",
                  border: `1.5px solid ${error ? "#f87171" : "#e5e7eb"}`,
                  borderRadius: "12px",
                  padding: "14px 16px",
                  fontSize: "15px",
                  color: "#0a1628",
                  marginBottom: error ? "8px" : "16px",
                  boxSizing: "border-box",
                }}
              />

              {error && (
                <p style={{ fontSize: "12px", color: "#ef4444", marginBottom: "12px" }}>{error}</p>
              )}

              <button
                onClick={handleMagicLink}
                disabled={!email.trim() || loading}
                className="av-btn-primary"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "15px 24px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  boxShadow: "0 4px 20px rgba(5,150,105,0.28)",
                  marginBottom: "12px",
                }}
              >
                {loading ? (
                  <span
                    style={{
                      width: "18px",
                      height: "18px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid #fff",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin-slow 0.7s linear infinite",
                    }}
                  />
                ) : (
                  <>
                    Invia Magic Link
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              <p style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center", lineHeight: 1.5 }}>
                Riceverai un link magico via email — nessuna password necessaria.
              </p>
            </div>

            {/* Terms */}
            <p
              style={{
                fontSize: "11px",
                color: "#9ca3af",
                textAlign: "center",
                marginTop: "32px",
                lineHeight: 1.6,
                animation: "fadeUp 0.6s ease 0.4s both",
              }}
            >
              Continuando accetti i{" "}
              <Link href={`/${lang}/terms`} style={{ color: "#6b7280", textDecoration: "underline" }}>
                Termini di servizio
              </Link>
              {" "}e la{" "}
              <Link href={`/${lang}/privacy`} style={{ color: "#6b7280", textDecoration: "underline" }}>
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        ) : (
          /* ── SENT STATE ── */
          <div
            style={{
              maxWidth: "400px",
              width: "100%",
              animation: "fadeUp 0.6s ease both",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
                border: "1px solid #6ee7b7",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                marginBottom: "32px",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              ✉️
            </div>

            <div
              style={{
                display: "inline-block",
                background: "#ecfdf5",
                border: "1px solid #6ee7b7",
                borderRadius: "999px",
                padding: "5px 14px",
                color: "#059669",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Email inviata
            </div>

            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 38px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#0a1628",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              Controlla{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                la tua inbox
              </span>
            </h2>

            <p style={{ fontSize: "15px", color: "#4b5563", lineHeight: 1.7, marginBottom: "8px" }}>
              Abbiamo inviato un link magico a:
            </p>
            <div
              style={{
                display: "inline-block",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "10px",
                padding: "10px 16px",
                fontSize: "15px",
                fontWeight: 700,
                color: "#059669",
                marginBottom: "32px",
                letterSpacing: "-0.01em",
              }}
            >
              {email}
            </div>

            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                lineHeight: 1.7,
                marginBottom: "32px",
                padding: "16px 20px",
                background: "#f9fafb",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
              }}
            >
              Clicca il link nell'email per accedere. Non trovate? Controlla la cartella spam o{" "}
              <button
                onClick={() => { setSent(false); setEmail(""); setError(""); }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#059669",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "inherit",
                  textDecoration: "underline",
                }}
              >
                invia di nuovo
              </button>
              .
            </p>

            <button
              onClick={() => { setSent(false); setEmail(""); setError(""); }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "none",
                color: "#9ca3af",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
                transition: "color 0.18s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#059669")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Usa un altro indirizzo email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}