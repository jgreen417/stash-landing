import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "How it works", href: "#solution" },
    { label: "Features", href: "#features" },
    { label: "Security", href: "#trust" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid hsl(40 20% 90%)" : "none",
        boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px",
        }}
      >
        <a href="#" style={{ textDecoration: "none", flexShrink: 0 }}>
          <StashLogo />
        </a>

        <div
          className="hidden md:flex"
          style={{ display: "flex", alignItems: "center", gap: "32px", flex: 1, justifyContent: "center" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "hsl(200 40% 25%)",
                textDecoration: "none",
                opacity: 0.7,
                transition: "opacity 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ flexShrink: 0 }} className="hidden md:block">
          <a
            href="#cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 22px",
              borderRadius: "999px",
              background: "hsl(190,70%,25%)",
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "opacity 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            Join waitlist
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            padding: "8px",
            color: "hsl(200 40% 15%)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "white",
              borderTop: "1px solid hsl(40 20% 90%)",
              padding: "0 24px",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingTop: "16px", paddingBottom: "24px" }}>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{ fontSize: "14px", fontWeight: 500, color: "hsl(200 40% 20%)", textDecoration: "none" }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  padding: "12px 24px",
                  borderRadius: "999px",
                  background: "hsl(190,70%,25%)",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Join waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function StashLogo({ size = "default" }: { size?: "default" | "large" }) {
  const fontSize = size === "large" ? "22px" : "18px";
  const iconSize = size === "large" ? 28 : 22;
  const scale = iconSize / 28;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontWeight: 800, fontSize, letterSpacing: "-0.02em" }}>
      {/* Treasure chest with cards */}
      <svg
        width={iconSize}
        height={Math.round(24 * scale)}
        viewBox="0 0 28 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left card — tilted */}
        <rect x="1" y="4" width="10.5" height="7" rx="1.4" fill="hsl(190,55%,40%)" transform="rotate(-16 6.25 7.5)" />
        {/* Centre card — gold, straight */}
        <rect x="8.75" y="0" width="10.5" height="7" rx="1.4" fill="hsl(45,80%,52%)" />
        {/* Right card — tilted */}
        <rect x="16.5" y="4" width="10.5" height="7" rx="1.4" fill="hsl(190,70%,25%)" transform="rotate(16 21.75 7.5)" />
        {/* Chest lid */}
        <rect x="2" y="9.5" width="24" height="5.5" rx="3" fill="hsl(190,58%,30%)" />
        {/* Chest body */}
        <rect x="2" y="13" width="24" height="11" rx="3" fill="hsl(190,70%,25%)" />
        {/* Lid/body seam */}
        <rect x="2" y="14.5" width="24" height="0.75" fill="rgba(0,0,0,0.14)" />
        {/* Gold latch */}
        <rect x="10.5" y="15.5" width="7" height="5" rx="1.6" fill="hsl(45,80%,50%)" />
        {/* Latch shine */}
        <rect x="10.5" y="15.5" width="7" height="2.2" rx="1.6" fill="rgba(255,255,255,0.28)" />
      </svg>
      <span style={{ color: "hsl(190,70%,25%)" }}>stash</span>
    </span>
  );
}
