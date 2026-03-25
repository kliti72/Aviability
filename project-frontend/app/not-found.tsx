import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 – Pagina non trovata | Aviability',
  description: 'La pagina che stai cercando non esiste o è stata spostata. Torna alla home di Aviability.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: '404 – Pagina non trovata | Aviability',
    description: 'La pagina che stai cercando non esiste o è stata spostata.',
    siteName: 'Aviability',
  },
}

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#fafffe',
      }}
    >
      {/* Ambient background */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* green glow top-left */}
        <div style={{
          position: 'absolute', top: -120, left: -120,
          width: 420, height: 420, borderRadius: '50%',
          backgroundColor: '#059669', opacity: 0.07,
          filter: 'blur(80px)',
        }} />
        {/* accent glow bottom-right */}
        <div style={{
          position: 'absolute', bottom: -120, right: -120,
          width: 380, height: 380, borderRadius: '50%',
          backgroundColor: '#34d399', opacity: 0.08,
          filter: 'blur(80px)',
        }} />
        {/* subtle dot grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.035,
          backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        padding: '0 24px', maxWidth: 560,
      }}>

        {/* 404 */}
        <div style={{ position: 'relative', marginBottom: 24, userSelect: 'none' }}>
          <span style={{
            fontSize: 'clamp(96px,16vw,148px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            background: 'linear-gradient(135deg, #059669 0%, #34d399 60%, #6ee7b7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 40px rgba(5,150,105,0.18))',
            display: 'block',
          }}>
            404
          </span>
          {/* linea decorativa */}
          <div style={{
            position: 'absolute', bottom: -4,
            left: '50%', transform: 'translateX(-50%)',
            height: 2, width: 80,
            background: 'linear-gradient(90deg, transparent, #059669, transparent)',
            opacity: 0.5,
            borderRadius: 2,
          }} />
        </div>

        {/* heading */}
        <h1 style={{
          fontSize: 'clamp(22px,4vw,30px)',
          fontWeight: 800,
          color: '#0a1628',
          letterSpacing: '-0.03em',
          marginBottom: 14,
          lineHeight: 1.2,
        }}>
          Questa pagina non esiste
        </h1>

        {/* subtext */}
        <p style={{
          fontSize: 15,
          color: '#6b7280',
          lineHeight: 1.7,
          marginBottom: 40,
          maxWidth: 400,
        }}>
          La pagina che cerchi è stata spostata, eliminata o non è mai esistita.
          Torna alla home e trova il tuo prossimo scambio.
        </p>

        {/* CTA */}
        <Link
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 28px',
            background: 'linear-gradient(135deg, #059669, #10b981)',
            color: '#fff', borderRadius: 14,
            fontWeight: 700, fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(5,150,105,0.3)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Torna alla home
        </Link>

        {/* bottom tag */}
        <p style={{
          marginTop: 64, fontSize: 11,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#0a1628', opacity: 0.15, fontWeight: 700,
        }}>
          Aviability — 404
        </p>
      </div>
    </main>
  )
}