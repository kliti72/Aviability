"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { AviabilityWithUser, OfferWithOfferer } from "../../types/Aviability.types";
import { aviabilitiesService } from "../../services/aviabilities.service";
import { aviabilityOffersService } from "../../services/aviabilityOffers.service";
import { exchangeConfirmationsService } from "../../services/Exchangeconfirmations.service";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CAT_EMOJI: Record<string, string> = {
  skills: "⚡", language: "🗣️", tech: "💻", sport: "🏃",
  music: "🎵", talent_magic: "✨", event: "📍", other: "🌱",
};

const CAT_LABEL: Record<string, string> = {
  skills: "Skills", language: "Language", tech: "Tech", sport: "Sport",
  music: "Music", talent_magic: "Talent", event: "Event", other: "Altro",
};

const MODE_LABEL: Record<string, string> = {
  remote: "🌐 Remoto",
  physical: "📍 Dal vivo",
  both: "🌐 Remoto & 📍 Dal vivo",
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  open: { label: "Aperta", color: "#059669", bg: "#f0fdf4", border: "#bbf7d0" },
  offered: { label: "Offerta", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  confirmed: { label: "Confermata", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  completed: { label: "Completata", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  expired: { label: "Scaduta", color: "#6b7280", bg: "#f9fafb", border: "#e5e7eb" },
  cancelled: { label: "Cancellata", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
};

function daysLeft(expiresAt: string): number {
  return Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86_400_000);
}

const styles = `
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .offer-card:hover {
    border-color: #bbf7d0 !important;
    box-shadow: 0 8px 28px rgba(5,150,105,0.10) !important;
    transform: translateY(-2px);
  }
  .offer-btn:hover {
    box-shadow: 0 6px 20px rgba(5,150,105,0.38) !important;
    transform: translateY(-1px);
  }
  .back-link:hover { color: #059669 !important; }
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarScore({ score, count }: { score: number; count: number }) {
  if (count === 0) return (
    <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>Nessuna review</span>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <span style={{ color: "#f59e0b", fontSize: 14 }}>★</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: "#0a1628" }}>{score.toFixed(1)}</span>
      <span style={{ fontSize: 12, color: "#9ca3af" }}>({count})</span>
    </div>
  );
}

function Avatar({ user }: { user: { name: string; picture: string; handle: string | null } }) {
  if (user.picture) {
    return (
      <img
        src={user.picture}
        alt={user.name}
        style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #d1fae5", flexShrink: 0 }}
      />
    );
  }
  const initials = user.name.slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 800, color: "#059669", flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

/** Banner pinnato in cima quando l'aviability è confirmed/completed */
function AcceptedOfferBanner({ offer }: { offer: OfferWithOfferer }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
      border: "1.5px solid #6ee7b7",
      borderRadius: 18, padding: "18px 22px",
      marginBottom: 28,
      animation: "fadeIn .4s ease both",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 18 }}>✅</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#047857", letterSpacing: "-0.01em" }}>
          Offerta accettata
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Avatar user={offer.offerer} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1628", marginBottom: 2 }}>
            {offer.offerer.handle ? `@${offer.offerer.handle}` : offer.offerer.name}
          </div>
          <p style={{ fontSize: 13, color: "#065f46", lineHeight: 1.6, margin: 0 }}>
            {offer.message}
          </p>
          {offer.offerDetail && (
            <div style={{
              marginTop: 8, fontSize: 12, color: "#047857",
              background: "#fff", borderRadius: 8, padding: "6px 10px",
              border: "1px solid #a7f3d0", display: "inline-block",
            }}>
              {offer.offerDetail}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OfferCard({
  offer, index, isAuthor, onAccept,
}: {
  offer: OfferWithOfferer
  index: number
  isAuthor: boolean
  onAccept?: (offerId: number) => void
}) {
  return (
    <div
      className="offer-card"
      style={{
        background: "#fff", borderRadius: 18,
        border: "1.5px solid #e5e7eb",
        boxShadow: "0 2px 12px rgba(5,150,105,0.05)",
        padding: "18px 20px",
        transition: "all .2s ease",
        animation: `fadeUp .35s ease ${index * 0.05}s both`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
        <Avatar user={offer.offerer} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0a1628" }}>
              {offer.offerer.handle ? `@${offer.offerer.handle}` : offer.offerer.name}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af" }}>
              {new Date(offer.createdAt).toLocaleDateString("it-IT", { day: "numeric", month: "short" })}
            </span>
          </div>
          <StarScore score={offer.offerer.affidabilityScore} count={offer.offerer.reviewCount} />
        </div>
      </div>

      <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6, margin: "0 0 10px" }}>
        {offer.message}
      </p>

      {offer.offerDetail && (
        <div style={{
          fontSize: 12, color: "#047857", fontWeight: 600,
          background: "#f0fdf4", borderRadius: 8, padding: "6px 10px",
          border: "1px solid #d1fae5", display: "inline-block", marginBottom: 6,
        }}>
          offre: {offer.offerDetail}
        </div>
      )}

      {offer.preferredMode && (
        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6 }}>
          {MODE_LABEL[offer.preferredMode]}
        </div>
      )}
  {isAuthor ? 
  ( <button
        onClick={() => onAccept?.(offer.id)}
        className="offer-accept-btn"

        style={{
          width: "100%", padding: "10px 16px",
          background: "linear-gradient(135deg, #059669, #10b981)",
          borderRadius: 12, border: "none",
          fontWeight: 700, fontSize: 13,
          transition: "transform .18s ease, box-shadow .18s ease",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}

      > Accetta offerta </button> ) : ("")
  }
  </div>
)}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AviabilityDetailPage() {
  const params = useParams<{ aviabilityId: string }>();
  const { user } = useAuth();

  const [av, setAv] = useState<AviabilityWithUser | null>(null);
  const [offers, setOffers] = useState<OfferWithOfferer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  

  async function handleAcceptOffer(offerId: number) {
    if (!av) return
    try {
      // 1 — accetta l'offerta
      await aviabilityOffersService.accept(offerId)

      // 2 — recupera la confirmation appena creata
      const confirmation = await exchangeConfirmationsService.getByAviabilityId(av.id)

      // 3 — publisher conferma il proprio lato
      await exchangeConfirmationsService.confirmAsPublisher(confirmation.id)

      // aggiorna UI
      setOffers((prev) =>
        prev.map((o) => o.id === offerId ? { ...o, status: 'accepted' } : o)
      )
    } catch (e) {
      console.error(e)
    } 
  }
  
  useEffect(() => { setMounted(true) }, []);

  useEffect(() => {
    if (!params?.aviabilityId) return;
    const id = Number(params.aviabilityId);

    Promise.all([
      aviabilitiesService.getById(id),
      aviabilityOffersService.getByAviabilityId(id),
    ])
      .then(([aviability, offerList]) => {
        setAv(aviability);
        setOffers(offerList);
      })
      .catch(() => setError("Impossibile caricare la pagina. Riprova."))
      .finally(() => setLoading(false));
  }, [params?.aviabilityId]);

  if (!mounted) return null;

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#fafffe", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#9ca3af", fontSize: 15 }}>Caricamento...</span>
    </div>
  );

  if (error || !av) return (
    <div style={{ minHeight: "100vh", background: "#fafffe", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <span style={{ color: "#ef4444", fontSize: 15 }}>{error ?? "Aviability non trovata."}</span>
      <Link href="/aviabilities" style={{ color: "#059669", fontSize: 14, fontWeight: 600 }}>← Torna alla lista</Link>
    </div>
  );

  const isAuthor = user?.id === av.userId;
  const isActive = av.status === "open" || av.status === "offered";
  const statusCfg = STATUS_CONFIG[av.status] ?? STATUS_CONFIG.open;
  const days = daysLeft(av.expiresAt);

  // offerta accettata — quella con status accepted
  const acceptedOffer = offers.find((o) => o.status === "accepted");
  // altre offerte visibili in lista (escludi accepted se pinned, escludi withdrawn)
  const visibleOffers = offers.filter((o) =>
    o.status !== "withdrawn" &&
    (acceptedOffer ? o.id !== acceptedOffer.id : true)
  );


  return (
    <>
      <style precedence="default" href="aviability-detail">{styles}</style>

      <div style={{ minHeight: "100vh", background: "#fafffe" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "36px 24px 64px" }}>

          {/* ── back ──────────────────────────────────────────── */}
          <Link
            href="/aviabilities"
            className="back-link"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 600, color: "#6b7280",
              textDecoration: "none", marginBottom: 28,
              transition: "color .18s ease",
            }}
          >
            ← Torna alle aviability
          </Link>

          {/* ── accepted offer banner (se confirmed/completed) ── */}
          {acceptedOffer && (av.status === "confirmed" || av.status === "completed") && (
            <AcceptedOfferBanner offer={acceptedOffer} />
          )}

          {/* ── main card ─────────────────────────────────────── */}
          <div style={{
            background: "#fff", borderRadius: 24,
            border: "1.5px solid #e5e7eb",
            boxShadow: "0 4px 24px rgba(5,150,105,0.07)",
            padding: "28px 28px 24px",
            marginBottom: 24,
            animation: "fadeUp .4s ease both",
          }}>
            {/* top row: categoria + status + giorni */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              <span style={{
                padding: "4px 11px", borderRadius: 999,
                background: "#f0fdf4", border: "1px solid #bbf7d0",
                fontSize: 11, fontWeight: 700, color: "#059669",
                letterSpacing: "0.05em", textTransform: "uppercase",
              }}>
                {CAT_EMOJI[av.category]} {CAT_LABEL[av.category]}
              </span>

              <span style={{
                padding: "4px 11px", borderRadius: 999,
                background: statusCfg.bg, border: `1px solid ${statusCfg.border}`,
                fontSize: 11, fontWeight: 700, color: statusCfg.color,
                letterSpacing: "0.05em", textTransform: "uppercase",
              }}>
                {statusCfg.label}
              </span>

              <span style={{ marginLeft: "auto", fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
                {days > 0 ? `${days} giorni rimasti` : "Scaduta"}
              </span>
            </div>

            {/* title */}
            <h1 style={{
              fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800,
              color: "#0a1628", letterSpacing: "-0.03em",
              lineHeight: 1.25, marginBottom: 14,
            }}>
              {av.title}
            </h1>

            {/* description */}
            <p style={{
              fontSize: 15, color: "#4b5563", lineHeight: 1.7,
              marginBottom: 20, whiteSpace: "pre-wrap",
            }}>
              {av.description}
            </p>

            {/* meta pills */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
              <span style={{
                fontSize: 12, color: "#4b5563", fontWeight: 600,
                background: "#f9fafb", border: "1px solid #e5e7eb",
                borderRadius: 8, padding: "5px 10px",
              }}>
                {MODE_LABEL[av.mode]}
              </span>
              {av.location && (
                <span style={{
                  fontSize: 12, color: "#4b5563", fontWeight: 600,
                  background: "#f9fafb", border: "1px solid #e5e7eb",
                  borderRadius: 8, padding: "5px 10px",
                }}>
                  📍 {av.location}
                </span>
              )}
            </div>

            {/* want in return */}
            {av.wantInReturn && (
              <div style={{
                background: "#fafffe", border: "1.5px solid #d1fae5",
                borderRadius: 12, padding: "12px 16px", marginBottom: 20,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Cerca in cambio
                </span>
                <p style={{ fontSize: 14, color: "#047857", fontWeight: 600, margin: "4px 0 0", lineHeight: 1.5 }}>
                  {av.wantInReturn}
                </p>
              </div>
            )}

            {/* divider */}
            <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              {/* author */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar user={av.user} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1628" }}>
                    {av.user.handle ? `@${av.user.handle}` : av.user.name}
                  </div>
                  <StarScore score={av.user.affidabilityScore} count={av.user.reviewCount} />
                </div>
              </div>

              {/* CTA — solo se loggato, non autore, aviability attiva */}
              {!isAuthor && isActive && (
                user ? (
                  <Link
                    href={`/aviabilities/${av.id}/offer`}
                    className="offer-btn"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "11px 22px", borderRadius: 14, border: "none",
                      background: "linear-gradient(135deg, #059669, #10b981)",
                      color: "#fff", fontWeight: 700, fontSize: 14,
                      letterSpacing: "-0.01em",
                      boxShadow: "0 4px 14px rgba(5,150,105,0.28)",
                      textDecoration: "none",
                      transition: "transform .18s ease, box-shadow .18s ease",
                    }}
                  >
                    Fai un'offerta →
                  </Link>
                ) : (
                  <Link
                    href="/auth"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "11px 22px", borderRadius: 14,
                      border: "1.5px solid #d1d5db", background: "#fff",
                      color: "#0a1628", fontWeight: 700, fontSize: 14,
                      textDecoration: "none", transition: "all .18s ease",
                    }}
                  >
                    Accedi per offrire
                  </Link>
                )
              )}

              {isAuthor && (
                <span style={{
                  fontSize: 12, fontWeight: 700, color: "#059669",
                  background: "#f0fdf4", border: "1px solid #bbf7d0",
                  borderRadius: 999, padding: "5px 12px",
                }}>
                  La tua aviability
                </span>
              )}
            </div>
          </div>

          {/* ── offers section ────────────────────────────────── */}
          <div style={{ animation: "fadeUp .4s ease .1s both" }}>
            <h2 style={{
              fontSize: 18, fontWeight: 800, color: "#0a1628",
              letterSpacing: "-0.03em", marginBottom: 16,
            }}>
              {visibleOffers.length > 0
                ? `${visibleOffers.length} offert${visibleOffers.length === 1 ? "a" : "e"}`
                : "Nessuna offerta ancora"}
            </h2>

            {visibleOffers.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "40px 24px",
                background: "#fff", borderRadius: 20,
                border: "1.5px solid #e5e7eb",
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🤝</div>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
                  {isActive
                    ? "Ancora nessuna offerta — sii il primo!"
                    : "Nessuna offerta per questa aviability."}
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {visibleOffers.map((offer, i) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                index={i}
                isAuthor={isAuthor}
                onAccept={handleAcceptOffer}
              />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}