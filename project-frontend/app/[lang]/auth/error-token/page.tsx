"use client";

import Link from "next/link";

export default function ErrorTokenPage() {
  return (
    <div style={styles.page}>
      <style>{keyframes}</style>

      <div style={styles.card}>
        <div style={styles.logo}>aviability</div>

        <div style={styles.iconWrap}>
          <span style={styles.icon}>⚡</span>
        </div>

        <h1 style={styles.title}>Link non valido</h1>
        <p style={styles.desc}>
          Questo magic link è già stato usato o è scaduto.<br />
          Ne basta uno nuovo, ci vogliono 5 secondi.
        </p>

        <Link href="/auth" style={styles.btn}>
          → Richiedi un nuovo link
        </Link>
      </div>

      <div style={styles.watermark}>✕</div>
    </div>
  );
}

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
    textAlign: "center",
    padding: "48px 40px",
    borderRadius: "28px",
    backgroundColor: "#fff",
    border: "1.5px solid #bbf7d0",
    boxShadow: "0 8px 40px rgba(5,150,105,0.10)",
    maxWidth: "360px",
    width: "90%",
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
    borderRadius: "50%",
    background: "linear-gradient(135deg, #fef3c7, #fde68a)",
    border: "1.5px solid #fcd34d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    lineHeight: "64px",
    textAlign: "center",
    marginBottom: "24px",
    animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
  },
  icon: {
    lineHeight: 1,
  },
  title: {
    fontSize: "22px",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    color: "#0a1628",
    margin: "0 0 10px",
  },
  desc: {
    fontSize: "14px",
    color: "#6b7280",
    fontWeight: 500,
    lineHeight: 1.7,
    margin: "0 0 28px",
  },
  btn: {
    display: "inline-block",
    padding: "14px 28px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #059669, #10b981)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    textDecoration: "none",
    letterSpacing: "-0.01em",
    boxShadow: "0 4px 16px rgba(5,150,105,0.28)",
    transition: "all 0.18s ease",
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
  @keyframes popIn {
    from { transform: scale(0.6); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
`;