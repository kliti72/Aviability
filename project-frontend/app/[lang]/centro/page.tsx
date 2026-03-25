"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type Mode = "remote" | "physical" | "both";
type Category =
  | "skills" | "language" | "tech" | "sport"
  | "music" | "talent_magic" | "event" | "other";

interface Aviability {
  id: number;
  userId: number;
  title: string;
  description: string;
  wantInReturn?: string;
  mode: Mode;
  location?: string;
  category: Category;
  status: string;
  expiresAt: string;
  createdAt: string;
  user?: {
    id: number;
    name: string;
    handle?: string;
    picture?: string;
    affidabilityScore: number;
    reviewCount: number;
  };
}

const CAT_EMOJI: Record<Category, string> = {
  skills: "⚡", language: "🗣️", tech: "💻", sport: "🏃",
  music: "🎵", talent_magic: "✨", event: "📍", other: "🌱",
};

const CAT_LABEL: Record<Category, string> = {
  skills: "Skills", language: "Language", tech: "Tech", sport: "Sport",
  music: "Music", talent_magic: "Talent", event: "Event", other: "Altro",
};

const REGIONS = [
  "Tutte", "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna",
  "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche",
  "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana",
  "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto",
];

const PAGE_SIZE = 9;

const styles = `
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .av-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(5,150,105,0.14) !important;
    border-color: #bbf7d0 !important;
  }
  .av-offer-btn:hover { background: linear-gradient(135deg,#047857,#059669) !important; transform:translateY(-1px); }
  .av-tab:hover { background: #f0fdf4 !important; }
  .av-input:focus { outline:none; border-color:#059669 !important; box-shadow:0 0 0 3px rgba(5,150,105,0.12) !important; }
  .av-input::placeholder { color:#9ca3af; }
  .pg-btn:hover:not(:disabled) { background:#f0fdf4 !important; border-color:#bbf7d0 !important; }
  .pg-btn:disabled { opacity:.4; cursor:not-allowed; }
`;

function StarScore({ score, count }: { score: number; count: number }) {
  if (count === 0) return (
    <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>Nessuna review</span>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <span style={{ color: "#f59e0b", fontSize: 13 }}>★</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#0a1628" }}>{score.toFixed(1)}</span>
      <span style={{ fontSize: 11, color: "#9ca3af" }}>({count})</span>
    </div>
  );
}

function AviabilityCard({ av, index }: { av: Aviability; index: number }) {
  return (
    <Link
      href={`/aviabilities/${av.id}`}
      style={{ textDecoration: "none" }}
    >
      <div
        className="av-card"
        style={{
          background: "#fff", borderRadius: 24,
          border: "1.5px solid #e5e7eb",
          boxShadow: "0 4px 20px rgba(5,150,105,0.07)",
          padding: "22px 22px 18px",
          transition: "all .2s ease",
          cursor: "pointer",
          animation: `fadeUp .4s ease ${index * 0.06}s both`,
          display: "flex", flexDirection: "column", gap: 0,
          height: "100%", boxSizing: "border-box",
        }}
      >
        {/* top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <span style={{
            padding: "4px 11px", borderRadius: 999,
            background: "#f0fdf4", border: "1px solid #bbf7d0",
            fontSize: 11, fontWeight: 700, color: "#059669",
            letterSpacing: "0.05em", textTransform: "uppercase",
          }}>
            {CAT_EMOJI[av.category]} {CAT_LABEL[av.category]}
          </span>
          {av.location && (
            <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>
              📍 {av.location}
            </span>
          )}
        </div>

        {/* titolo */}
        <h3 style={{
          fontSize: 16, fontWeight: 800, color: "#0a1628",
          letterSpacing: "-0.02em", lineHeight: 1.3,
          marginBottom: 8,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {av.title}
        </h3>

        {/* descrizione */}
        <p style={{
          fontSize: 13, color: "#4b5563", lineHeight: 1.6,
          marginBottom: 14, flexGrow: 1,
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {av.description}
        </p>

        {/* want in return */}
        {av.wantInReturn && (
          <div style={{
            background: "#fafffe", border: "1px solid #d1fae5",
            borderRadius: 10, padding: "7px 12px", marginBottom: 14,
            fontSize: 12, color: "#047857", fontWeight: 600,
          }}>
            cerca: {av.wantInReturn}
          </div>
        )}

        {/* footer */}
        <div style={{
          paddingTop: 14, borderTop: "1px solid #f3f4f6",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {av.user?.picture && (
              <img
                src={av.user.picture} alt={av.user.name}
                style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #d1fae5" }}
              />
            )}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0a1628" }}>
                {av.user?.handle ? `@${av.user.handle}` : av.user?.name ?? "Utente"}
              </div>
              <StarScore score={av.user?.affidabilityScore ?? 0} count={av.user?.reviewCount ?? 0} />
            </div>
          </div>
          <div style={{
            fontSize: 11, color: "#9ca3af", fontWeight: 500,
          }}>
            {Math.ceil((new Date(av.expiresAt).getTime() - Date.now()) / 86400000)}g rimasti
          </div>
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ tab }: { tab: "remote" | "physical" }) {
  return (
    <div style={{
      textAlign: "center", padding: "64px 24px",
      animation: "fadeIn .4s ease both",
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>
        {tab === "remote" ? "🌐" : "📍"}
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0a1628", marginBottom: 8 }}>
        Nessuna aviability trovata
      </h3>
      <p style={{ color: "#6b7280", marginBottom: 28, lineHeight: 1.6 }}>
        Sii il primo a pubblicare qualcosa {tab === "remote" ? "in remoto" : "nella tua zona"}.
      </p>
      <Link href="/aviabilities/publish" style={{
        display: "inline-block", padding: "12px 24px",
        background: "linear-gradient(135deg,#059669,#10b981)",
        color: "#fff", borderRadius: 14, fontWeight: 700,
        textDecoration: "none", boxShadow: "0 4px 16px rgba(5,150,105,0.3)",
        fontSize: 14,
      }}>
        + Pubblica la tua
      </Link>
    </div>
  );
}

export default function AviabilitiesPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"remote" | "physical">("remote");
  const [all, setAll] = useState<Aviability[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("Tutte");
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true) }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/aviabilities`, { credentials: "include" })
      .then((r) => r.json())
      .then((data: Aviability[]) => setAll(Array.isArray(data) ? data : []))
      .catch(() => setAll([]))
      .finally(() => setLoading(false));
  }, []);

  // reset pagina quando cambiano filtri/tab
  useEffect(() => { setPage(1) }, [tab, search, region]);

  if (!mounted) return null;

  // filtraggio
  const filtered = all.filter((av) => {
    const matchesTab =
      tab === "remote"
        ? av.mode === "remote" || av.mode === "both"
        : av.mode === "physical" || av.mode === "both";

    const matchesSearch =
      !search.trim() ||
      av.title.toLowerCase().includes(search.toLowerCase()) ||
      av.description.toLowerCase().includes(search.toLowerCase());

    const matchesRegion =
      tab === "remote" ||
      region === "Tutte" ||
      (av.location ?? "").toLowerCase().includes(region.toLowerCase());

    return matchesTab && matchesSearch && matchesRegion;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: "100vh", background: "#fafffe" }}>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>

          {/* ── hero text ──────────────────────────────────── */}
          <div style={{ marginBottom: 36, animation: "fadeUp .4s ease both" }}>
            <h1 style={{
              fontSize: "clamp(26px,4vw,40px)", fontWeight: 800,
              color: "#0a1628", letterSpacing: "-0.04em", marginBottom: 8,
            }}>
              Cosa offrono le persone
            </h1>
            <p style={{ color: "#6b7280", fontSize: 16 }}>
              {all.length > 0 ? `${all.length} aviability attive — trova il tuo match.` : "Caricamento..."}
            </p>
          </div>

          {/* ── tabs ───────────────────────────────────────── */}
          <div style={{
            display: "flex", gap: 8, marginBottom: 28,
            background: "#f3f4f6", borderRadius: 16, padding: 5,
            width: "fit-content",
          }}>
            {(["remote", "physical"] as const).map((t) => (
              <button
                key={t}
                className="av-tab"
                onClick={() => setTab(t)}
                style={{
                  padding: "10px 22px", borderRadius: 12, border: "none",
                  cursor: "pointer", fontWeight: 700, fontSize: 14,
                  transition: "all .18s ease",
                  background: tab === t ? "#fff" : "transparent",
                  color: tab === t ? "#059669" : "#6b7280",
                  boxShadow: tab === t ? "0 2px 10px rgba(5,150,105,0.1)" : "none",
                }}
              >
                {t === "remote" ? "🌐 Remoto" : "📍 Dal vivo"}
              </button>
            ))}
          </div>

          {/* ── filtri ─────────────────────────────────────── */}
          <div style={{
            display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap",
            animation: "fadeIn .35s ease both",
          }}>
            <input
              className="av-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cerca per titolo o descrizione..."
              style={{
                flex: "1 1 260px", padding: "11px 16px",
                fontSize: 14, color: "#0a1628", background: "#fff",
                borderRadius: 12, border: "1.5px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all .2s ease",
              }}
            />
            {tab === "physical" && (
              <select
                className="av-input"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                style={{
                  flex: "0 1 200px", padding: "11px 16px",
                  fontSize: 14, color: "#0a1628", background: "#fff",
                  borderRadius: 12, border: "1.5px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  cursor: "pointer", transition: "all .2s ease",
                }}
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r === "Tutte" ? "📍 Tutte le regioni" : r}</option>
                ))}
              </select>
            )}
          </div>

          {/* ── contenuto ──────────────────────────────────── */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af", fontSize: 15 }}>
              Caricamento...
            </div>
          ) : paginated.length === 0 ? (
            <EmptyState tab={tab} />
          ) : (
            <>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 18,
                marginBottom: 40,
              }}>
                {paginated.map((av, i) => (
                  <AviabilityCard key={av.id} av={av} index={i} />
                ))}
              </div>

              {/* ── paginazione ──────────────────────────────── */}
              {totalPages > 1 && (
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8,
                  animation: "fadeIn .3s ease both",
                }}>
                  <button
                    className="pg-btn"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    style={{
                      padding: "9px 16px", borderRadius: 10,
                      border: "1.5px solid #e5e7eb", background: "#fff",
                      cursor: "pointer", fontWeight: 600, fontSize: 14,
                      color: "#4b5563", transition: "all .18s ease",
                    }}
                  >
                    ←
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      style={{
                        width: 36, height: 36, borderRadius: 10,
                        border: p === page ? "2px solid #059669" : "1.5px solid #e5e7eb",
                        background: p === page ? "#f0fdf4" : "#fff",
                        color: p === page ? "#059669" : "#4b5563",
                        fontWeight: p === page ? 800 : 500,
                        cursor: "pointer", fontSize: 14,
                        transition: "all .18s ease",
                      }}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    className="pg-btn"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    style={{
                      padding: "9px 16px", borderRadius: 10,
                      border: "1.5px solid #e5e7eb", background: "#fff",
                      cursor: "pointer", fontWeight: 600, fontSize: 14,
                      color: "#4b5563", transition: "all .18s ease",
                    }}
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}