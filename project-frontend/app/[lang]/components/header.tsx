"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    items: [
      { label: "Come funziona", href: "/landing/how-it-works", desc: "Scopri il loop Publish → Offer → Match" },
      { label: "Filosofia", href: "/landing/philosophy", desc: "Perché il tempo vale più del denaro" },
      { label: "Roadmap", href: "/landing/roadmap", desc: "Cosa stiamo costruendo" },
    ],
  },
  {
    label: "Explore",
    href: "/explore",
    items: [
      { label: "Browse Availabilities", href: "/explore", desc: "Trova ciò di cui hai bisogno" },
      { label: "Categories", href: "/explore/categories", desc: "Skills, tempo, presenza, servizi" },
      { label: "Search & Filters", href: "/explore/search", desc: "Ricerca avanzata per tipo e zona" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    items: [
      { label: "Community", href: "/community", desc: "Un idea di creazione di community locali, in fase di sviluppo." },
      // { label: "Sport", href: "/community", desc: "Un idea di creazione di community locali, in fase di sviluppo." },
      // { label: "Musica", href: "/musica", desc: "Un idea di creazione di community locali, in fase di sviluppo." },
      // { label: "Eventi", href: "/eventi", desc: "Un idea di creazione di community locali, in fase di sviluppo." },
      // { label: "Talent", href: "/talenti", desc: "Un idea di creazione di community locali, in fase di sviluppo." },
      // { label: "Magia", href: "/magia", desc: "Un idea di creazione di community locali, in fase di sviluppo." },
    ],
  },
];

function DropdownMenu({ items }: { items: typeof NAV_ITEMS[0]["items"] }) {
  return (
    <div
      className="av-dropdown"
      style={{
        position: "absolute",
        top: "calc(100% + 12px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#fff",
        border: "1px solid #d1fae5",
        borderRadius: "16px",
        boxShadow: "0 8px 40px 0 rgba(16,185,129,0.13), 0 2px 8px 0 rgba(0,0,0,0.07)",
        padding: "8px",
        minWidth: "260px",
        zIndex: 100,
        pointerEvents: "auto",
      }}
    >
      {/* Triangle arrow */}
      <div style={{
        position: "absolute",
        top: "-8px",
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderBottom: "8px solid #d1fae5",
      }} />
      <div style={{
        position: "absolute",
        top: "-7px",
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent",
        borderBottom: "7px solid #fff",
      }} />
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "12px 16px",
            borderRadius: "10px",
            textDecoration: "none",
            transition: "background 0.15s",
            gap: "2px",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f0fdf4")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <span style={{
            
            fontWeight: 600,
            fontSize: "14px",
            color: "#065f46",
            letterSpacing: "-0.01em",
          }}>{item.label}</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            color: "#6b7280",
            fontWeight: 400,
          }}>{item.desc}</span>
        </Link>
      ))}
    </div>
  );
}

function NavItem({ item }: { item: typeof NAV_ITEMS[0] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };
  const hide = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div
      ref={ref}
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <Link
        href={item.href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          
          fontWeight: 600,
          fontSize: "15px",
          color: open ? "#059669" : "#1a1a1a",
          textDecoration: "none",
          padding: "6px 4px",
          borderBottom: open ? "2px solid #059669" : "2px solid transparent",
          transition: "color 0.15s, border-color 0.15s",
          letterSpacing: "-0.01em",
        }}
      >
        {item.label}
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", marginTop: "1px" }}
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      {open && <DropdownMenu items={item.items} />}
    </div>
  );
}

export default function Header() {
  const { status, user, logout } = useAuth();
  const isAuthenticated = status === "authenticated" && !!user;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');
      `}</style>

      <header style={{
        background: "#fff",
        borderBottom: "1px solid #d1fae5",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 24px 0 rgba(16,185,129,0.07)",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: "68px",
        }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(42, 255, 4, 0.33)",
            }}>
				<img src="/logo.png" />
            </div>
            <span style={{
              fontWeight: 800,
              fontSize: "20px",
              color: "#059669",
              letterSpacing: "-0.03em",
			  textTransform: "uppercase"
            }}>
              Aviability</span>
          </Link>

          {/* Nav - desktop */}
          <nav style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            flex: 1,
            justifyContent: "center",
          }} className="av-desktop-nav">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
            {isAuthenticated && (
              <Link
                href="/create-disponibility"
                style={{
                  
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#fff",
                  background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
                  borderRadius: "8px",
                  padding: "7px 16px",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  boxShadow: "0 2px 8px rgba(5,150,105,0.18)",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                + Publish
              </Link>
            )}
          </nav>

          {/* Auth actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {isAuthenticated ? (
              <>
              <Link href={"/me"}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "24px",
                  padding: "5px 14px 5px 8px",
                }}>
                  <div style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #059669, #34d399)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    
                    fontWeight: 700,
                    fontSize: "11px",
                  }}>
                    {(user?.name ?? "U")[0].toUpperCase()}
                  </div>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    color: "#065f46",
                    fontWeight: 500,
                  }}>{user?.name ?? "User"}</span>
                </div>
                </Link>
                <button
                  onClick={logout}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#6b7280",
                    background: "none",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "6px 14px",
                    cursor: "pointer",
                    transition: "border-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#059669"; e.currentTarget.style.color = "#059669"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#6b7280"; }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                style={{
                  
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#fff",
                  background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                  borderRadius: "10px",
                  padding: "9px 22px",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  boxShadow: "0 2px 12px rgba(5,150,105,0.28)",
                  transition: "box-shadow 0.15s, opacity 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(5,150,105,0.38)"; e.currentTarget.style.opacity = "0.93"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(5,150,105,0.28)"; e.currentTarget.style.opacity = "1"; }}
              >
                Login
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="av-mobile-btn"
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                color: "#059669",
              }}
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {mobileOpen ? (
                  <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            borderTop: "1px solid #d1fae5",
            background: "#fff",
            padding: "16px 24px 20px",
          }} className="av-mobile-menu">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} style={{ marginBottom: "16px" }}>
                <p style={{
                  
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#059669",
                  marginBottom: "8px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}>{item.label}</p>
                {item.items.map(sub => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "15px",
                      color: "#065f46",
                      textDecoration: "none",
                      padding: "6px 0",
                      borderBottom: "1px solid #f0fdf4",
                    }}
                  >{sub.label}</Link>
                ))}
              </div>
            ))}
          </div>
        )}

        <style>{`
          @media (max-width: 768px) {
            .av-desktop-nav { display: none !important; }
            .av-mobile-btn { display: flex !important; }
          }
        `}</style>
      </header>
    </>
  );
}