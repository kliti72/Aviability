"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { id: "skills", label: "Skills", emoji: "🧠", desc: "Coding, design, lingue..." },
  { id: "time", label: "Tempo", emoji: "⏳", desc: "Compagnia, supporto, presenza" },
  { id: "sport", label: "Sport", emoji: "⚡", desc: "Allenamento, coaching, passioni" },
  { id: "music", label: "Music", emoji: "🎵", desc: "Testi, produzione, jam" },
  { id: "magic", label: "Talent & Magic", emoji: "✨", desc: "Trucchi, performance, talenti" },
  { id: "events", label: "Events", emoji: "🎪", desc: "Raduni, incontri, città" },
];

const DURATION_OPTIONS = [
  { value: "30min", label: "30 min" },
  { value: "1h", label: "1 ora" },
  { value: "2h", label: "2 ore" },
  { value: "half-day", label: "Mezza giornata" },
  { value: "full-day", label: "Giornata intera" },
  { value: "flexible", label: "Flessibile" },
];

export default function PublishPage() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", location: "", lookingFor: "" });
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "description") setCharCount(value.length);
  };

  const canProceedStep1 = selectedCategory !== null;
  const canProceedStep2 = form.title.trim().length >= 5 && form.description.trim().length >= 20 && selectedDuration;
  const canProceedStep3 = form.lookingFor.trim().length >= 5;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#fafffe",
      color: "#0a1628",
      padding: "0",
      overflowX: "hidden",
    },
    // Header
    header: {
      padding: "24px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1fae5",
      backgroundColor: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 20px rgba(5,150,105,0.06)",
    },
    logo: {
      fontWeight: 800,
      fontSize: "22px",
      color: "#059669",
      letterSpacing: "-0.04em",
      textDecoration: "none",
    },
    headerBack: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#6b7280",
      fontSize: "14px",
      fontWeight: 600,
      textDecoration: "none",
      padding: "8px 16px",
      borderRadius: "10px",
      border: "1px solid #e5e7eb",
      backgroundColor: "#fff",
      cursor: "pointer",
      transition: "all 0.18s ease",
    },
    // Progress bar
    progressWrap: {
      backgroundColor: "#fff",
      padding: "20px 32px",
      borderBottom: "1px solid #d1fae5",
    },
    progressLabel: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    progressStep: (active, done) => ({
      fontSize: "12px",
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: done ? "#059669" : active ? "#0a1628" : "#9ca3af",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }),
    progressBar: {
      height: "4px",
      backgroundColor: "#d1fae5",
      borderRadius: "999px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#059669",
      borderRadius: "999px",
      width: `${(step / 3) * 100}%`,
      transition: "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
    // Main content
    main: {
      maxWidth: "720px",
      margin: "0 auto",
      padding: "48px 24px 80px",
    },
    // Step heading
    stepHeading: {
      marginBottom: "40px",
      animation: "fadeUp 0.4s ease forwards",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      backgroundColor: "#f0fdf4",
      color: "#059669",
      fontSize: "12px",
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding: "6px 14px",
      borderRadius: "999px",
      border: "1px solid #bbf7d0",
      marginBottom: "16px",
    },
    h1: {
      fontSize: "clamp(28px, 5vw, 42px)",
      fontWeight: 800,
      letterSpacing: "-0.04em",
      color: "#0a1628",
      lineHeight: 1.1,
      margin: "0 0 12px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#6b7280",
      fontWeight: 500,
      lineHeight: 1.6,
    },
    // Category grid
    categoryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "16px",
      marginBottom: "40px",
    },
    categoryCard: (selected) => ({
      padding: "20px",
      borderRadius: "20px",
      border: selected ? "2px solid #059669" : "2px solid #e5e7eb",
      backgroundColor: selected ? "#f0fdf4" : "#fff",
      cursor: "pointer",
      transition: "all 0.18s ease",
      transform: selected ? "translateY(-3px)" : "translateY(0)",
      boxShadow: selected
        ? "0 8px 24px rgba(5,150,105,0.15)"
        : "0 2px 8px rgba(0,0,0,0.04)",
    }),
    catEmoji: {
      fontSize: "28px",
      marginBottom: "10px",
      display: "block",
    },
    catLabel: {
      fontWeight: 700,
      fontSize: "15px",
      color: "#0a1628",
      marginBottom: "4px",
    },
    catDesc: {
      fontSize: "12px",
      color: "#6b7280",
      fontWeight: 500,
    },
    // Form fields
    fieldWrap: {
      marginBottom: "28px",
    },
    label: {
      display: "block",
      fontWeight: 700,
      fontSize: "14px",
      color: "#0a1628",
      marginBottom: "8px",
      letterSpacing: "-0.01em",
    },
    labelHint: {
      fontWeight: 500,
      color: "#9ca3af",
      fontSize: "12px",
      marginLeft: "8px",
    },
    input: {
      width: "100%",
      padding: "14px 18px",
      borderRadius: "14px",
      border: "2px solid #e5e7eb",
      backgroundColor: "#fff",
      fontSize: "15px",
      fontWeight: 500,
      color: "#0a1628",
      outline: "none",
      transition: "border-color 0.18s ease, box-shadow 0.18s ease",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "14px 18px",
      borderRadius: "14px",
      border: "2px solid #e5e7eb",
      backgroundColor: "#fff",
      fontSize: "15px",
      fontWeight: 500,
      color: "#0a1628",
      outline: "none",
      transition: "border-color 0.18s ease",
      resize: "vertical",
      minHeight: "120px",
      boxSizing: "border-box",
      fontFamily: "inherit",
    },
    charCount: {
      textAlign: "right",
      fontSize: "12px",
      color: "#9ca3af",
      marginTop: "6px",
    },
    // Duration pills
    durationGrid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    durationPill: (selected) => ({
      padding: "10px 18px",
      borderRadius: "999px",
      border: selected ? "2px solid #059669" : "2px solid #e5e7eb",
      backgroundColor: selected ? "#059669" : "#fff",
      color: selected ? "#fff" : "#4b5563",
      fontSize: "13px",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.18s ease",
      letterSpacing: "0.02em",
    }),
    // Preview card (step 3)
    previewCard: {
      borderRadius: "24px",
      border: "2px solid #bbf7d0",
      backgroundColor: "#fff",
      padding: "28px",
      marginBottom: "28px",
      boxShadow: "0 4px 20px rgba(5,150,105,0.07)",
    },
    previewBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      backgroundColor: "#f0fdf4",
      color: "#059669",
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding: "4px 12px",
      borderRadius: "999px",
      border: "1px solid #bbf7d0",
      marginBottom: "14px",
    },
    previewTitle: {
      fontSize: "20px",
      fontWeight: 800,
      letterSpacing: "-0.03em",
      color: "#0a1628",
      marginBottom: "10px",
    },
    previewDesc: {
      fontSize: "14px",
      color: "#6b7280",
      lineHeight: 1.6,
      marginBottom: "16px",
    },
    previewMeta: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    previewMetaItem: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "13px",
      fontWeight: 600,
      color: "#4b5563",
      backgroundColor: "#f9fafb",
      padding: "6px 12px",
      borderRadius: "999px",
      border: "1px solid #e5e7eb",
    },
    // Buttons
    btnPrimary: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "16px 32px",
      borderRadius: "14px",
      background: "linear-gradient(135deg, #059669, #10b981)",
      color: "#fff",
      fontSize: "15px",
      fontWeight: 700,
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 20px rgba(5,150,105,0.3)",
      transition: "all 0.18s ease",
      letterSpacing: "-0.01em",
    },
    btnSecondary: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "16px 24px",
      borderRadius: "14px",
      background: "#fff",
      color: "#4b5563",
      fontSize: "15px",
      fontWeight: 700,
      border: "2px solid #e5e7eb",
      cursor: "pointer",
      transition: "all 0.18s ease",
    },
    btnRow: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      marginTop: "8px",
    },
    // Success
    successWrap: {
      textAlign: "center",
      padding: "60px 24px",
      animation: "fadeUp 0.5s ease forwards",
    },
    successIcon: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #059669, #34d399)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "36px",
      margin: "0 auto 24px",
      boxShadow: "0 8px 32px rgba(5,150,105,0.25)",
    },
    successH: {
      fontSize: "clamp(24px, 4vw, 36px)",
      fontWeight: 800,
      letterSpacing: "-0.04em",
      color: "#0a1628",
      marginBottom: "12px",
    },
    successSub: {
      fontSize: "16px",
      color: "#6b7280",
      lineHeight: 1.6,
      maxWidth: "420px",
      margin: "0 auto 32px",
    },
    // Watermark number
    watermark: {
      position: "fixed",
      bottom: "-20px",
      right: "-10px",
      fontSize: "200px",
      fontWeight: 800,
      color: "rgba(5,150,105,0.04)",
      letterSpacing: "-0.05em",
      pointerEvents: "none",
      userSelect: "none",
      zIndex: 0,
    },
  };

  // Keyframes injection
  const globalStyles = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-dot {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.4); opacity: 1; }
    }
    input:focus, textarea:focus {
      border-color: #059669 !important;
      box-shadow: 0 0 0 3px rgba(5,150,105,0.12) !important;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(5,150,105,0.4) !important;
    }
    .btn-secondary:hover {
      background: #f0fdf4 !important;
      border-color: #bbf7d0 !important;
    }
    .cat-card:hover {
      transform: translateY(-4px) !important;
    }
  `;

  if (submitted) {
    return (
      <div style={styles.page}>
        <style>{globalStyles}</style>
        <header style={styles.header}>
          <Link href="/" style={styles.logo}>aviability</Link>
        </header>
        <div style={styles.main}>
          <div style={styles.successWrap}>
            <div style={styles.successIcon}>🎉</div>
            <h1 style={styles.successH}>È live, fratello!</h1>
            <p style={styles.successSub}>
              La tua disponibilità è pubblicata. Ora il match può succedere — qualcuno là fuori ha bisogno esattamente di quello che offri.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/explore">
                <button className="btn-primary" style={styles.btnPrimary}>
                  🔍 Esplora le offerte
                </button>
              </Link>
              <button
                className="btn-secondary"
                style={styles.btnSecondary}
                onClick={() => { setSubmitted(false); setStep(1); setSelectedCategory(null); setSelectedDuration(null); setForm({ title: "", description: "", location: "", lookingFor: "" }); }}
              >
                + Pubblica un'altra
              </button>
            </div>
          </div>
        </div>
        <div style={styles.watermark}>✓</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <style>{globalStyles}</style>

      {/* Header */}
      <header style={styles.header}>
        <Link href="/" style={styles.logo}>aviability</Link>
        <Link href="/explore" style={styles.headerBack}>
          ← Esplora
        </Link>
      </header>

      {/* Progress */}
      <div style={styles.progressWrap}>
        <div style={styles.progressLabel}>
          {["Categoria", "Dettagli", "Preview"].map((s, i) => (
            <span key={s} style={styles.progressStep(step === i + 1, step > i + 1)}>
              {step > i + 1 ? "✓ " : `0${i + 1} `}{s}
            </span>
          ))}
        </div>
        <div style={styles.progressBar}>
          <div style={styles.progressFill} />
        </div>
      </div>

      {/* Main */}
      <main style={styles.main}>

        {/* ─── STEP 1 — Categoria ─── */}
        {step === 1 && (
          <div key="step1" style={{ animation: "fadeUp 0.4s ease forwards" }}>
            <div style={styles.stepHeading}>
              <div style={styles.badge}>
                <span>•</span> Step 1 di 3
              </div>
              <h1 style={styles.h1}>Cosa puoi offrire?</h1>
              <p style={styles.subtitle}>
                Scegli la categoria che meglio descrive quello che metti sul tavolo.
              </p>
            </div>

            <div style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="cat-card"
                  style={styles.categoryCard(selectedCategory === cat.id)}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span style={styles.catEmoji}>{cat.emoji}</span>
                  <div style={styles.catLabel}>{cat.label}</div>
                  <div style={styles.catDesc}>{cat.desc}</div>
                  {selectedCategory === cat.id && (
                    <div style={{ marginTop: "12px", fontSize: "11px", fontWeight: 700, color: "#059669", letterSpacing: "0.04em" }}>
                      ✓ SELEZIONATO
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={styles.btnRow}>
              <button
                className="btn-primary"
                style={{ ...styles.btnPrimary, opacity: canProceedStep1 ? 1 : 0.4, cursor: canProceedStep1 ? "pointer" : "not-allowed" }}
                onClick={() => canProceedStep1 && setStep(2)}
              >
                Continua →
              </button>
              {selectedCategory && (
                <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600 }}>
                  {CATEGORIES.find(c => c.id === selectedCategory)?.emoji} {CATEGORIES.find(c => c.id === selectedCategory)?.label} selezionato
                </span>
              )}
            </div>
          </div>
        )}

        {/* ─── STEP 2 — Dettagli ─── */}
        {step === 2 && (
          <div key="step2" style={{ animation: "fadeUp 0.4s ease forwards" }}>
            <div style={styles.stepHeading}>
              <div style={styles.badge}>
                <span>•</span> Step 2 di 3
              </div>
              <h1 style={styles.h1}>Raccontaci tutto.</h1>
              <p style={styles.subtitle}>
                Più sei specifico, meglio il match funziona.
              </p>
            </div>

            {/* Titolo */}
            <div style={styles.fieldWrap}>
              <label style={styles.label}>
                Titolo <span style={styles.labelHint}>min. 5 caratteri</span>
              </label>
              <input
                style={styles.input}
                placeholder="Es. Ti insegno React in 1 ora, ti accompagno a correre..."
                value={form.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
              />
            </div>

            {/* Descrizione */}
            <div style={styles.fieldWrap}>
              <label style={styles.label}>
                Descrizione <span style={styles.labelHint}>min. 20 caratteri</span>
              </label>
              <textarea
                style={styles.textarea}
                placeholder="Spiega cosa offri, come funziona, cosa serve sapere..."
                value={form.description}
                onChange={(e) => handleFormChange("description", e.target.value)}
              />
              <div style={styles.charCount}>{charCount} caratteri</div>
            </div>

            {/* Location */}
            <div style={styles.fieldWrap}>
              <label style={styles.label}>
                Dove / Come <span style={styles.labelHint}>opzionale</span>
              </label>
              <input
                style={styles.input}
                placeholder="Online, Roma, Milano, ovunque..."
                value={form.location}
                onChange={(e) => handleFormChange("location", e.target.value)}
              />
            </div>

            {/* Durata */}
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Durata</label>
              <div style={styles.durationGrid}>
                {DURATION_OPTIONS.map((d) => (
                  <button
                    key={d.value}
                    style={styles.durationPill(selectedDuration === d.value)}
                    onClick={() => setSelectedDuration(d.value)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.btnRow}>
              <button className="btn-secondary" style={styles.btnSecondary} onClick={() => setStep(1)}>
                ← Indietro
              </button>
              <button
                className="btn-primary"
                style={{ ...styles.btnPrimary, opacity: canProceedStep2 ? 1 : 0.4, cursor: canProceedStep2 ? "pointer" : "not-allowed" }}
                onClick={() => canProceedStep2 && setStep(3)}
              >
                Continua →
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3 — Preview & cosa cerchi ─── */}
        {step === 3 && (
          <div key="step3" style={{ animation: "fadeUp 0.4s ease forwards" }}>
            <div style={styles.stepHeading}>
              <div style={styles.badge}>
                <span>•</span> Step 3 di 3
              </div>
              <h1 style={styles.h1}>Preview & Pubblica.</h1>
              <p style={styles.subtitle}>
                Così apparirà agli altri. Dimmi anche cosa vuoi in cambio.
              </p>
            </div>

            {/* Preview card */}
            <div style={styles.previewCard}>
              <div style={styles.previewBadge}>
                {CATEGORIES.find(c => c.id === selectedCategory)?.emoji} {CATEGORIES.find(c => c.id === selectedCategory)?.label}
              </div>
              <div style={styles.previewTitle}>{form.title || "Il tuo titolo..."}</div>
              <div style={styles.previewDesc}>{form.description || "La tua descrizione..."}</div>
              <div style={styles.previewMeta}>
                {selectedDuration && (
                  <span style={styles.previewMetaItem}>⏱ {DURATION_OPTIONS.find(d => d.value === selectedDuration)?.label}</span>
                )}
                {form.location && (
                  <span style={styles.previewMetaItem}>📍 {form.location}</span>
                )}
                <span style={styles.previewMetaItem}>⭐ Affidability Score</span>
              </div>
            </div>

            {/* Cosa cerchi */}
            <div style={styles.fieldWrap}>
              <label style={styles.label}>
                Cosa cerchi in cambio? <span style={styles.labelHint}>min. 5 caratteri</span>
              </label>
              <textarea
                style={{ ...styles.textarea, minHeight: "90px" }}
                placeholder="Es. Una lezione di spagnolo, aiuto col design, compagnia per correre..."
                value={form.lookingFor}
                onChange={(e) => handleFormChange("lookingFor", e.target.value)}
              />
            </div>

            {/* Info strip */}
            <div style={{
              padding: "16px 20px",
              borderRadius: "14px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              <span style={{ fontSize: "20px" }}>ℹ️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "13px", color: "#059669", marginBottom: "2px" }}>
                  Scade automaticamente in 10 giorni
                </div>
                <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: 500 }}>
                  Potrai rinnovarla o pubblicarne una nuova in qualsiasi momento.
                </div>
              </div>
            </div>

            <div style={styles.btnRow}>
              <button className="btn-secondary" style={styles.btnSecondary} onClick={() => setStep(2)}>
                ← Indietro
              </button>
              <button
                className="btn-primary"
                style={{ ...styles.btnPrimary, opacity: canProceedStep3 ? 1 : 0.4, cursor: canProceedStep3 ? "pointer" : "not-allowed" }}
                onClick={() => canProceedStep3 && handleSubmit()}
              >
                🚀 Pubblica ora
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Watermark */}
      <div style={styles.watermark}>{step}</div>
    </div>
  );
}