"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/[lang]/context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type Section = "profile" | "account" | "privacy";

type Toast = { message: string; type: "success" | "error" } | null;

export default function EditProfilePage() {
  const { user, setUser } = useAuth();

  const [section, setSection] = useState<Section>("profile");
  const [toast, setToast] = useState<Toast>(null);
  const [loading, setLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name:       user?.name       ?? "",
    givenName:  user?.givenName  ?? "",
    familyName: user?.familyName ?? "",
    handle:     user?.handle     ?? "",
    bio:        user?.bio        ?? "",
    locale:     user?.locale     ?? "it",
  });

  // Delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Export loading
  const [exportLoading, setExportLoading] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/users/me`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setUser(updated, "");
      showToast("Profilo aggiornato ✓", "success");
    } catch {
      showToast("Errore nel salvataggio", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    setExportLoading(true);
    try {
      const res = await fetch(`${API}/users/me/export`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `aviability-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Download avviato ✓", "success");
    } catch {
      showToast("Errore nell'export", "error");
    } finally {
      setExportLoading(false);
    }
  };

  const handleDeleteRequest = async () => {
    if (deleteConfirm !== user?.email) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`${API}/users/me`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      showToast("Richiesta inviata. Verrai anonimizzato entro 30 giorni.", "success");
      setDeleteModal(false);
    } catch {
      showToast("Errore nella richiesta", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const bioLeft = 300 - (form.bio?.length ?? 0);

  return (
    <div style={s.page}>
      <style>{keyframes}</style>

      {/* Toast */}
      {toast && (
        <div style={{ ...s.toast, ...(toast.type === "error" ? s.toastError : {}) }}>
          {toast.message}
        </div>
      )}

      <main style={s.main}>

        {/* Page title */}
        <div style={s.pageTitle}>
          <div style={s.badge}>⚙️ Impostazioni</div>
          <h1 style={s.h1}>Il tuo account</h1>
          <p style={s.subtitle}>Gestisci profilo, dati personali e privacy.</p>
        </div>

        <div style={s.layout}>

          {/* Sidebar nav */}
          <nav style={s.sidebar}>
            {(["profile", "account", "privacy"] as Section[]).map((sec) => {
              const labels: Record<Section, string> = {
                profile: "👤 Profilo",
                account: "🔐 Account",
                privacy: "🛡️ Privacy & GDPR",
              };
              return (
                <button
                  key={sec}
                  style={{ ...s.navItem, ...(section === sec ? s.navItemActive : {}) }}
                  onClick={() => setSection(sec)}
                >
                  {labels[sec]}
                </button>
              );
            })}
          </nav>

          {/* Content */}
          <div style={s.content} key={section}>

            {/* ─── PROFILO ─── */}
            {section === "profile" && (
              <div style={s.card}>
                <h2 style={s.cardTitle}>Informazioni pubbliche</h2>
                <p style={s.cardSub}>Queste informazioni sono visibili agli altri utenti.</p>

                <div style={s.row}>
                  <Field label="Nome" hint="max 50 caratteri">
                    <input style={s.input} value={form.givenName}
                      onChange={e => setForm(p => ({ ...p, givenName: e.target.value }))}
                      placeholder="Es. Marco" />
                  </Field>
                  <Field label="Cognome" hint="max 50 caratteri">
                    <input style={s.input} value={form.familyName}
                      onChange={e => setForm(p => ({ ...p, familyName: e.target.value }))}
                      placeholder="Es. Rossi" />
                  </Field>
                </div>

                <Field label="Nome display">
                  <input style={s.input} value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Come vuoi apparire" />
                </Field>

                <Field label="Handle" hint="max 32 caratteri — unico">
                  <div style={s.inputPrefix}>
                    <span style={s.prefix}>@</span>
                    <input style={{ ...s.input, borderRadius: "0 12px 12px 0", borderLeft: "none" }}
                      value={form.handle}
                      maxLength={32}
                      onChange={e => setForm(p => ({ ...p, handle: e.target.value.replace(/[^a-z0-9_]/g, "") }))}
                      placeholder="il_tuo_handle" />
                  </div>
                </Field>

                <Field label="Bio" hint={`${bioLeft} caratteri rimasti`}>
                  <textarea style={{ ...s.input, minHeight: "100px", resize: "vertical", fontFamily: "inherit" }}
                    value={form.bio ?? ""}
                    maxLength={300}
                    onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                    placeholder="Raccontati in poche righe..." />
                </Field>

                <Field label="Lingua preferita">
                  <select style={s.input} value={form.locale}
                    onChange={e => setForm(p => ({ ...p, locale: e.target.value }))}>
                    <option value="it">🇮🇹 Italiano</option>
                    <option value="en">🇬🇧 English</option>
                    <option value="es">🇪🇸 Español</option>
                    <option value="fr">🇫🇷 Français</option>
                    <option value="de">🇩🇪 Deutsch</option>
                  </select>
                </Field>

                <div style={s.btnRow}>
                  <button style={{ ...s.btnPrimary, opacity: loading ? 0.6 : 1 }}
                    onClick={handleSave} disabled={loading}>
                    {loading ? "Salvataggio..." : "✓ Salva modifiche"}
                  </button>
                </div>
              </div>
            )}

            {/* ─── ACCOUNT ─── */}
            {section === "account" && (
              <div style={s.card}>
                <h2 style={s.cardTitle}>Dettagli account</h2>
                <p style={s.cardSub}>Informazioni non modificabili o legate all'autenticazione.</p>

                <InfoRow label="Email" value={user?.email ?? "—"} verified={user?.verifiedEmail} />
                <InfoRow label="Metodo login" value="Magic Link / Google OAuth" />
                <InfoRow label="Ruolo" value={user?.role ?? "user"} />
                <InfoRow label="Account creato" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString("it-IT", { year: "numeric", month: "long", day: "numeric" }) : "—"} />

                <div style={s.scoreBox}>
                  <div style={s.scoreLabel}>⭐ Affidability Score</div>
                  <div style={s.scoreValue}>{user?.affidabilityScore?.toFixed(1) ?? "0.0"}</div>
                  <div style={s.scoreCount}>su {user?.reviewCount ?? 0} review</div>
                </div>
              </div>
            )}

            {/* ─── PRIVACY & GDPR ─── */}
            {section === "privacy" && (
              <>
                {/* Export dati */}
                <div style={s.card}>
                  <h2 style={s.cardTitle}>📦 Esporta i tuoi dati</h2>
                  <p style={s.cardSub}>
                    Ai sensi dell'Art. 20 GDPR hai diritto alla portabilità dei tuoi dati.
                    Riceverai un file JSON con tutte le informazioni associate al tuo account.
                  </p>
                  <button style={{ ...s.btnOutline, opacity: exportLoading ? 0.6 : 1 }}
                    onClick={handleExportData} disabled={exportLoading}>
                    {exportLoading ? "Preparazione..." : "⬇ Scarica i miei dati"}
                  </button>
                </div>

                {/* Info trattamento */}
                <div style={s.card}>
                  <h2 style={s.cardTitle}>📋 Dati trattati</h2>
                  <p style={s.cardSub}>Ecco cosa conserviamo e perché.</p>
                  <div style={s.dataList}>
                    {[
                      ["Email & nome", "Identificazione account e comunicazioni"],
                      ["IP address", "Sicurezza, fraud detection — cifrata AES-256"],
                      ["User agent", "Rilevamento bot — max 512 caratteri"],
                      ["Review & score", "Affidabilità pubblica della community"],
                      ["Dati scambi", "Storico offerte e match completati"],
                    ].map(([key, val]) => (
                      <div key={key} style={s.dataRow}>
                        <span style={s.dataKey}>{key}</span>
                        <span style={s.dataVal}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cancellazione */}
                <div style={{ ...s.card, borderColor: "#fecaca" }}>
                  <h2 style={{ ...s.cardTitle, color: "#dc2626" }}>🗑 Cancella account</h2>
                  <p style={s.cardSub}>
                    Ai sensi dell'Art. 17 GDPR (diritto all'oblio) puoi richiedere la cancellazione.
                    Il tuo account sarà <strong>anonimizzato entro 30 giorni</strong> — i dati pubblici
                    (review, scambi) resteranno anonimi per integrità della community.
                  </p>
                  <button style={s.btnDanger} onClick={() => setDeleteModal(true)}>
                    Richiedi cancellazione account
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </main>

      {/* Delete modal */}
      {deleteModal && (
        <div style={s.modalOverlay} onClick={() => setDeleteModal(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <h3 style={s.modalTitle}>Sei sicuro?</h3>
            <p style={s.modalDesc}>
              Questa azione avvia la procedura di cancellazione. Il tuo account sarà
              anonimizzato entro <strong>30 giorni</strong>. Non potrai recuperarlo.
            </p>
            <p style={s.modalLabel}>
              Scrivi la tua email <strong>{user?.email}</strong> per confermare:
            </p>
            <input style={{ ...s.input, marginBottom: "20px" }}
              value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
              placeholder={user?.email ?? "la tua email"} />
            <div style={s.btnRow}>
              <button style={s.btnOutline} onClick={() => setDeleteModal(false)}>
                Annulla
              </button>
              <button
                style={{ ...s.btnDanger, opacity: deleteConfirm === user?.email && !deleteLoading ? 1 : 0.4 }}
                disabled={deleteConfirm !== user?.email || deleteLoading}
                onClick={handleDeleteRequest}>
                {deleteLoading ? "Invio..." : "Conferma cancellazione"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={s.watermark}>✎</div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={s.label}>
        {label}
        {hint && <span style={s.labelHint}>{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function InfoRow({ label, value, verified }: { label: string; value: string; verified?: boolean }) {
  return (
    <div style={s.infoRow}>
      <span style={s.infoLabel}>{label}</span>
      <span style={s.infoValue}>
        {value}
        {verified !== undefined && (
          <span style={{ ...s.verifiedBadge, ...(verified ? {} : s.unverifiedBadge) }}>
            {verified ? "✓ verificata" : "non verificata"}
          </span>
        )}
      </span>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#fafffe",
    color: "#0a1628",
    position: "relative",
    overflow: "hidden",
  },
  header: {
    padding: "20px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #d1fae5",
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 16px rgba(5,150,105,0.06)",
  },
  logo: {
    fontWeight: 800,
    fontSize: "20px",
    color: "#059669",
    letterSpacing: "-0.04em",
    textDecoration: "none",
  },
  backBtn: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#6b7280",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#fff",
  },
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 24px 80px",
  },
  pageTitle: {
    marginBottom: "36px",
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
    padding: "5px 14px",
    borderRadius: "999px",
    border: "1px solid #bbf7d0",
    marginBottom: "14px",
  },
  h1: {
    fontSize: "clamp(26px, 4vw, 38px)",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    color: "#0a1628",
    margin: "0 0 8px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#6b7280",
    fontWeight: 500,
  },
  layout: {
    display: "flex",
    gap: "28px",
    alignItems: "flex-start",
    animation: "fadeUp 0.5s ease forwards",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: "200px",
    position: "sticky",
    top: "80px",
  },
  navItem: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "transparent",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s ease",
  },
  navItemActive: {
    backgroundColor: "#f0fdf4",
    color: "#059669",
    border: "1px solid #bbf7d0",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    animation: "fadeUp 0.3s ease forwards",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    border: "1.5px solid #e5e7eb",
    padding: "28px",
    boxShadow: "0 2px 12px rgba(5,150,105,0.05)",
  },
  cardTitle: {
    fontSize: "17px",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: "#0a1628",
    margin: "0 0 4px",
  },
  cardSub: {
    fontSize: "13px",
    color: "#9ca3af",
    fontWeight: 500,
    margin: "0 0 24px",
    lineHeight: 1.6,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0a1628",
    marginBottom: "7px",
    letterSpacing: "-0.01em",
  },
  labelHint: {
    fontWeight: 500,
    color: "#9ca3af",
    fontSize: "11px",
    marginLeft: "8px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1.5px solid #e5e7eb",
    backgroundColor: "#fafffe",
    fontSize: "14px",
    fontWeight: 500,
    color: "#0a1628",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease",
  },
  inputPrefix: {
    display: "flex",
    alignItems: "stretch",
  },
  prefix: {
    padding: "12px 14px",
    backgroundColor: "#f0fdf4",
    border: "1.5px solid #e5e7eb",
    borderRight: "none",
    borderRadius: "12px 0 0 12px",
    fontSize: "14px",
    fontWeight: 700,
    color: "#059669",
    display: "flex",
    alignItems: "center",
  },
  btnRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginTop: "8px",
    flexWrap: "wrap",
  },
  btnPrimary: {
    padding: "13px 28px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #059669, #10b981)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(5,150,105,0.28)",
    transition: "all 0.18s ease",
    letterSpacing: "-0.01em",
  },
  btnOutline: {
    padding: "13px 24px",
    borderRadius: "12px",
    background: "#fff",
    color: "#4b5563",
    fontSize: "14px",
    fontWeight: 700,
    border: "1.5px solid #e5e7eb",
    cursor: "pointer",
    transition: "all 0.18s ease",
  },
  btnDanger: {
    padding: "13px 24px",
    borderRadius: "12px",
    background: "#fff",
    color: "#dc2626",
    fontSize: "14px",
    fontWeight: 700,
    border: "1.5px solid #fecaca",
    cursor: "pointer",
    transition: "all 0.18s ease",
  },
  // Info rows (account section)
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #f3f4f6",
  },
  infoLabel: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#6b7280",
  },
  infoValue: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#0a1628",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  verifiedBadge: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#059669",
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
    padding: "2px 8px",
    borderRadius: "999px",
  },
  unverifiedBadge: {
    color: "#d97706",
    backgroundColor: "#fffbeb",
    border: "1px solid #fde68a",
  },
  scoreBox: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "14px",
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
    textAlign: "center",
  },
  scoreLabel: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#059669",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  scoreValue: {
    fontSize: "40px",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    color: "#0a1628",
    lineHeight: 1,
  },
  scoreCount: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "4px",
  },
  // Privacy data list
  dataList: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  dataRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #f3f4f6",
    gap: "16px",
  },
  dataKey: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#0a1628",
    minWidth: "120px",
  },
  dataVal: {
    fontSize: "13px",
    color: "#6b7280",
    fontWeight: 500,
    textAlign: "right",
  },
  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(10,22,40,0.5)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    padding: "24px",
    animation: "fadeIn 0.2s ease forwards",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "32px",
    maxWidth: "440px",
    width: "100%",
    border: "1.5px solid #fecaca",
    boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
    animation: "fadeUp 0.3s ease forwards",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: "#dc2626",
    margin: "0 0 10px",
  },
  modalDesc: {
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: 1.6,
    margin: "0 0 20px",
  },
  modalLabel: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#0a1628",
    margin: "0 0 8px",
  },
  // Toast
  toast: {
    position: "fixed",
    bottom: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#059669",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 700,
    zIndex: 9999,
    boxShadow: "0 4px 20px rgba(5,150,105,0.3)",
    animation: "fadeUp 0.3s ease forwards",
    whiteSpace: "nowrap",
  },
  toastError: {
    backgroundColor: "#dc2626",
    boxShadow: "0 4px 20px rgba(220,38,38,0.3)",
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
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  input:focus, textarea:focus, select:focus {
    border-color: #059669 !important;
    box-shadow: 0 0 0 3px rgba(5,150,105,0.10) !important;
  }
`;