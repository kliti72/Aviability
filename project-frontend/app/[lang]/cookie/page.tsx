'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cookie_consent_v1'

export type CookieConsent = {
  necessary: true
  consentedAt: string
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setConsent(JSON.parse(raw) as CookieConsent)
    } catch {}
  }, [])

  const accept = () => {
    const c: CookieConsent = { necessary: true, consentedAt: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c))
    setConsent(c)
  }

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setConsent(null)
  }

  return { consent, accept, reset }
}

type Props = {
  onConsent?: (consent: CookieConsent) => void
  privacyHref?: string
}

export function CookieBanner({ onConsent, privacyHref = '/privacy' }: Props) {
  const { consent, accept } = useCookieConsent()
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 400)
      return () => clearTimeout(t)
    }
  }, [consent])

  if (consent || !visible) return null

  const handleAccept = () => {
    setLeaving(true)
    setTimeout(() => {
      accept()
      const c: CookieConsent = { necessary: true, consentedAt: new Date().toISOString() }
      onConsent?.(c)
    }, 280)
  }

  return (
    <div
      data-leaving={leaving ? 'true' : undefined}
      style={{
        position: 'fixed',
        bottom: 24,
        right: '2%',
        transform: 'translateX(-50%)',
        width: 'min(520px, calc(100vw - 32px))',
        zIndex: 9999,
        animation: leaving
          ? 'avi-cookie-down 0.28s ease forwards'
          : 'avi-cookie-up 0.28s ease forwards',
      }}
    >
      <div style={{
        background: '#ffffff',
        border: '1.5px solid #bbf7d0',
        borderRadius: 24,
        boxShadow: '0 4px 32px rgba(5,150,105,0.10), 0 1px 4px rgba(5,150,105,0.06)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        {/* Icon */}
        <div style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#059669" strokeWidth="1.6" />
            <path d="M12 8v4m0 4h.01" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: '0 0 2px',
            fontSize: 13,
            fontWeight: 700,
            color: '#0a1628',
            letterSpacing: '-0.01em',
          }}>
            Cookie essenziali
          </p>
          <p style={{ margin: 0, fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>
            Usiamo solo cookie necessari al funzionamento.{' '}
            <Link
              href={privacyHref}
              className="avi-cookie-link"
              style={{
                color: '#4b5563',
                textDecoration: 'underline',
                textDecorationColor: '#d1fae5',
                textUnderlineOffset: 3,
                transition: 'color 0.18s ease',
              }}
            >
              Privacy policy
            </Link>
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button
            onClick={handleAccept}
            className="avi-cookie-btn-primary"
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              padding: '9px 18px',
              borderRadius: 14,
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #059669, #10b981)',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(5,150,105,0.28)',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              whiteSpace: 'nowrap',
            }}
          >
            Ho capito
          </button>
          <button
            onClick={handleAccept}
            className="avi-cookie-btn-ghost"
            aria-label="Chiudi"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: '1.5px solid #e5e7eb',
              background: '#fff',
              color: '#9ca3af',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.18s ease',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}