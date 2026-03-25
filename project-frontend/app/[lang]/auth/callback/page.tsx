"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/[lang]/context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type Status = "loading" | "success" | "error";

const STEPS = [
  "Verifica sessione...",
  "Caricamento profilo...",
  "Quasi fatto...",
];

export default function CallbackPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<Status>("loading");
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cicla i messaggi di step ogni 900ms mentre è in loading
  useEffect(() => {
    if (status !== "loading") return;
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 900);
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (!mounted) return;

    fetch(`${API}/auth/session`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Session non valida");
        return res.json();
      })
      .then((data) => {
        const { user, accessToken } = data;
        if (!user) throw new Error("User mancante");
        setUser(user, accessToken);
        setStatus("success");
        setTimeout(() => router.replace("/centro"), 900);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => router.replace("/auth"), 2000);
      });
  }, [mounted]);

  if (!mounted) return (
    <div style={{ ...styles.page, opacity: 0 }} />
  );

  return (
    <div style={styles.page}>
      <style>{keyframes}</style>

      {/* Card centrale */}
      <div style={styles.card}>

        {/* Logo */}
        <div style={styles.logo}>aviability</div>

        {/* Icona animata */}
        <div style={styles.iconWrap}>
          {status === "loading" && <LoadingOrb />}
          {status === "success" && <span style={styles.iconEmoji}>✓</span>}
          {status === "error"   && <span style={styles.iconEmoji}>✕</span>}
        </div>

        {/* Testo status */}
        {status === "loading" && (
          <div style={{ animation: "fadeSwap 0.4s ease" }} key={stepIndex}>
            <p style={styles.statusText}>{STEPS[stepIndex]}</p>
          </div>
        )}
        {status === "success" && (
          <div style={{ animation: "fadeUp 0.4s ease forwards" }}>
            <p style={{ ...styles.statusText, color: "#059669" }}>Bentornato 👋</p>
            <p style={styles.subText}>Redirect in corso...</p>
          </div>
        )}
        {status === "error" && (
          <div style={{ animation: "fadeUp 0.4s ease forwards" }}>
            <p style={{ ...styles.statusText, color: "#ef4444" }}>Qualcosa è andato storto</p>
            <p style={styles.subText}>Ti rimando al login...</p>
          </div>
        )}

        {/* Dots indicator */}
        {status === "loading" && (
          <div style={styles.dots}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ ...styles.dot, animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        )}
      </div>

      {/* Watermark */}
      <div style={styles.watermark}>⚡</div>
    </div>
  );
}

// Orb animato SVG — più bello di uno spinner generico
function LoadingOrb() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ animation: "spin 1.4s linear infinite" }}>
      <circle cx="28" cy="28" r="23" stroke="#d1fae5" strokeWidth="3" />
      <circle
        cx="28" cy="28" r="23"
        stroke="url(#g)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="90 55"
      />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Styles ───────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#fafffe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0px",
    padding: "48px 40px",
    borderRadius: "28px",
    backgroundColor: "#fff",
    border: "1.5px solid #bbf7d0",
    boxShadow: "0 8px 40px rgba(5,150,105,0.10)",
    minWidth: "300px",
    textAlign: "center",
    animation: "fadeUp 0.5s ease forwards",
    zIndex: 1,
  },
  logo: {
    fontWeight: 800,
    fontSize: "20px",
    color: "#059669",
    letterSpacing: "-0.04em",
    marginBottom: "28px",
  },
  iconWrap: {
    width: "64px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
  },
  iconEmoji: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#059669,#34d399)",
    color: "#fff",
    fontSize: "24px",
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "56px",
    textAlign: "center",
    animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
  },
  statusText: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#0a1628",
    margin: "0 0 4px",
    letterSpacing: "-0.02em",
  },
  subText: {
    fontSize: "12px",
    color: "#9ca3af",
    fontWeight: 500,
    margin: 0,
  },
  dots: {
    display: "flex",
    gap: "6px",
    marginTop: "20px",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#34d399",
    display: "inline-block",
    animation: "pulseDot 1.2s ease-in-out infinite",
  },
  watermark: {
    position: "fixed",
    bottom: "-30px",
    right: "10px",
    fontSize: "220px",
    fontWeight: 800,
    color: "rgba(5,150,105,0.04)",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: 0,
  },
};

const keyframes = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeSwap {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulseDot {
    0%, 100% { transform: scale(0.8); opacity: 0.4; }
    50%       { transform: scale(1.2); opacity: 1; }
  }
  @keyframes popIn {
    from { transform: scale(0.6); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
`;