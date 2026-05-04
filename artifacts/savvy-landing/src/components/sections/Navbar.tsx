import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileCtaVisible, setMobileCtaVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("hero-cta");
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setMobileCtaVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );
    observerRef.current.observe(el);

    return () => observerRef.current?.disconnect();
  }, []);

  const links = [
    { label: "How it works", href: "#solution" },
    { label: "Trust & security", href: "#trust" },
    { label: "For sellers", href: "#for-sellers" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        top: "env(safe-area-inset-top, 0px)",
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
          position: "relative",
        }}
      >
        <a href="#" style={{ textDecoration: "none", flexShrink: 0 }}>
          <StashLogo />
        </a>

        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "32px", flex: 1, justifyContent: "center" }}
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

        <div className="hidden md:block" style={{ flexShrink: 0 }}>
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
              whiteSpace: "nowrap",
              transition: "opacity 0.25s",
              opacity: mobileCtaVisible ? 1 : 0,
              pointerEvents: mobileCtaVisible ? "auto" : "none" as any,
            }}
          >
            Join waitlist
          </a>
        </div>

        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setOpen(!open)}
          style={{
            padding: "12px",
            color: "hsl(200 40% 15%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            minWidth: "44px",
            minHeight: "44px",
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

      {/* Mobile bottom CTA bar — slides up when hero CTA scrolls past */}
      <motion.div
        className="md:hidden"
        initial={{ y: 80, opacity: 0 }}
        animate={{
          y: mobileCtaVisible ? 0 : 80,
          opacity: mobileCtaVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          padding: "12px 24px",
          paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
          background: "linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 60%, transparent 100%)",
          pointerEvents: mobileCtaVisible ? "auto" : "none" as any,
        }}
      >
        <a
          href="#cta"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            padding: "14px 24px",
            borderRadius: "999px",
            background: "hsl(190,70%,25%)",
            color: "white",
            fontSize: "15px",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 4px 20px hsl(190 70% 25% / 0.32), 0 0 0 1px hsla(45,80%,50%,0.06)",
          }}
        >
          Join the waitlist
          <ArrowRight size={16} />
        </a>
      </motion.div>
    </motion.header>
  );
}

export function StashLogo({ size = "default" }: { size?: "default" | "large" }) {
  const fontSize = size === "large" ? "24px" : "21px";
  const iconSize = size === "large" ? 30 : 26;
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
