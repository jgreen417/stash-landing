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
          <SavvyLogo />
        </a>

        {/* Desktop nav links */}
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

export function SavvyLogo({ size = "default" }: { size?: "default" | "large" }) {
  const fontSize = size === "large" ? "22px" : "18px";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize, letterSpacing: "-0.01em" }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9" stroke="hsl(190,70%,25%)" strokeWidth="1.5" />
        <path d="M6.5 10.5l2 2 5-5" stroke="hsl(190,70%,25%)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ color: "hsl(190,70%,25%)" }}>savvy</span>
    </span>
  );
}
