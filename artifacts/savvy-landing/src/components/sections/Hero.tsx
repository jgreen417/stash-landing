import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, AlertCircle, TrendingUp, CreditCard, Sparkles, Bell, Wifi, Battery, ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const WALLET_TIPS = [
  {
    scene: "At Woolworths",
    logo: "AX",
    logoBg: "linear-gradient(135deg, #006FCF 0%, #0057a8 100%)",
    card: "Amex Gold",
    earn: "3× points on groceries",
    value: "+240 pts",
    valueBg: "hsl(140,60%,35%)",
  },
  {
    scene: "At Sydney Airport",
    logo: "VA",
    logoBg: "linear-gradient(135deg, #E11D48 0%, #b0142f 100%)",
    card: "Velocity Flyer",
    earn: "Free lounge access available",
    value: "Perk",
    valueBg: "hsl(45,80%,40%)",
  },
  {
    scene: "Hotel booking",
    logo: "HH",
    logoBg: "linear-gradient(135deg, #054A91 0%, #033160 100%)",
    card: "Hilton Honors",
    earn: "10× pts + status night",
    value: "+1,200 pts",
    valueBg: "hsl(190,70%,30%)",
  },
];

function WalletCard({ tip }: { tip: typeof WALLET_TIPS[0] }) {
  return (
    <motion.div
      key={tip.scene}
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.9 }}
      style={{
        position: "absolute",
        bottom: "22px",
        left: "12px",
        right: "12px",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.08)",
        zIndex: 10,
      }}
    >
      {/* Frosted backdrop */}
      <div
        style={{
          background: "rgba(20, 22, 35, 0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "14px",
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
          <Sparkles size={10} style={{ color: "hsl(45,85%,65%)" }} />
          <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "hsl(45,85%,65%)" }}>
            Savvy suggests
          </span>
          <span style={{ marginLeft: "auto", fontSize: "9px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
            {tip.scene}
          </span>
        </div>

        {/* Card row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Card logo */}
          <div
            style={{
              width: "40px",
              height: "28px",
              borderRadius: "7px",
              background: tip.logoBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            {tip.logo}
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "white", marginBottom: "2px" }}>
              {tip.card}
            </p>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {tip.earn}
            </p>
          </div>

          {/* Earn badge */}
          <div
            style={{
              padding: "4px 8px",
              borderRadius: "8px",
              background: tip.valueBg,
              display: "flex",
              alignItems: "center",
              gap: "3px",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "10px", fontWeight: 700, color: "white" }}>{tip.value}</span>
            <ChevronRight size={9} style={{ color: "rgba(255,255,255,0.7)" }} />
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginTop: "12px" }}>
          {WALLET_TIPS.map((t) => (
            <div
              key={t.scene}
              style={{
                width: t.scene === tip.scene ? "16px" : "4px",
                height: "4px",
                borderRadius: "4px",
                background: t.scene === tip.scene ? "hsl(45,85%,65%)" : "rgba(255,255,255,0.2)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PhoneMockup() {
  const [tipIndex, setTipIndex] = useState(-1); // -1 = not shown yet

  useEffect(() => {
    // First card slides in after 1.4s
    const show = setTimeout(() => setTipIndex(0), 1400);
    return () => clearTimeout(show);
  }, []);

  useEffect(() => {
    if (tipIndex < 0) return;
    // Cycle every 3.5s
    const cycle = setTimeout(() => {
      setTipIndex((prev) => (prev + 1) % WALLET_TIPS.length);
    }, 3500);
    return () => clearTimeout(cycle);
  }, [tipIndex]);

  const tip = tipIndex >= 0 ? WALLET_TIPS[tipIndex] : null;

  return (
    <div
      style={{
        width: "300px",
        height: "620px",
        borderRadius: "48px",
        background: "linear-gradient(160deg, #1a1a2e 0%, #0f0f1a 100%)",
        padding: "10px",
        boxShadow:
          "0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Side buttons */}
      <div style={{ position: "absolute", left: "-3px", top: "110px", width: "3px", height: "36px", borderRadius: "2px 0 0 2px", background: "#2a2a3e" }} />
      <div style={{ position: "absolute", left: "-3px", top: "158px", width: "3px", height: "60px", borderRadius: "2px 0 0 2px", background: "#2a2a3e" }} />
      <div style={{ position: "absolute", left: "-3px", top: "230px", width: "3px", height: "60px", borderRadius: "2px 0 0 2px", background: "#2a2a3e" }} />
      <div style={{ position: "absolute", right: "-3px", top: "160px", width: "3px", height: "80px", borderRadius: "0 2px 2px 0", background: "#2a2a3e" }} />

      {/* Screen */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "40px",
          background: "hsl(40 33% 97%)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            padding: "14px 20px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "hsl(40 33% 97%)",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: 700, color: "hsl(200 40% 15%)" }}>9:41</span>
          <div style={{ width: "80px", height: "24px", borderRadius: "20px", background: "#0f0f1a", position: "absolute", left: "50%", transform: "translateX(-50%)", top: "10px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Wifi size={11} style={{ color: "hsl(200 40% 20%)" }} />
            <Battery size={11} style={{ color: "hsl(200 40% 20%)" }} />
          </div>
        </div>

        {/* App header */}
        <div
          style={{
            padding: "4px 20px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <p style={{ fontSize: "10px", color: "hsl(200 15% 55%)", fontWeight: 500 }}>Good morning, Sarah</p>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "hsl(200 40% 15%)", marginTop: "1px" }}>Your rewards</p>
          </div>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "hsl(190 70% 25% / 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bell size={14} style={{ color: "hsl(190,70%,25%)" }} />
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "hidden", padding: "0 14px 20px" }}>
          {/* Total value card */}
          <div
            style={{
              borderRadius: "20px",
              background: "linear-gradient(135deg, hsl(190,70%,25%) 0%, hsl(200,60%,18%) 100%)",
              padding: "18px",
              marginBottom: "12px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", fontWeight: 500, marginBottom: "6px" }}>Total rewards value</p>
            <p style={{ fontSize: "28px", fontWeight: 800, color: "white", lineHeight: 1, marginBottom: "4px" }}>$2,840</p>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>across 4 programs</p>
            <div
              style={{
                marginTop: "14px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                gap: "16px",
              }}
            >
              <div>
                <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>Expiring</p>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "hsl(30,100%,70%)" }}>18,400 pts</p>
              </div>
              <div>
                <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>Unused perks</p>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "hsl(45,90%,70%)" }}>$180</p>
              </div>
              <div>
                <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>This month</p>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "hsl(140,60%,70%)" }}>+1,240 pts</p>
              </div>
            </div>
          </div>

          {/* Alert card */}
          <div
            style={{
              borderRadius: "16px",
              border: "1px solid hsl(25 85% 52% / 0.25)",
              background: "hsl(25 85% 52% / 0.06)",
              padding: "12px 14px",
              marginBottom: "12px",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "hsl(25,85%,52%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <AlertCircle size={14} style={{ color: "white" }} />
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "hsl(200 40% 15%)", marginBottom: "2px" }}>Qantas expiring in 23 days</p>
              <p style={{ fontSize: "10px", color: "hsl(200 15% 50%)", lineHeight: 1.4 }}>18,400 pts · Transfer now to extend validity</p>
            </div>
          </div>

          {/* Programs section */}
          <p style={{ fontSize: "10px", fontWeight: 700, color: "hsl(200 15% 50%)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
            Programs
          </p>

          {[
            { name: "Qantas Frequent Flyer", pts: "18,400 pts", logo: "QF", bg: "#E4002B", expiring: true },
            { name: "Velocity Frequent Flyer", pts: "42,100 pts", logo: "VA", bg: "#E11D48" },
            { name: "Amex Rewards", pts: "67,500 pts", logo: "AX", bg: "#006FCF" },
          ].map((card) => (
            <div
              key={card.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                borderRadius: "12px",
                background: "white",
                border: "1px solid hsl(40 20% 92%)",
                marginBottom: "6px",
              }}
            >
              <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "10px", fontWeight: 700, flexShrink: 0 }}>
                {card.logo}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "hsl(200 40% 15%)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{card.name}</p>
                <p style={{ fontSize: "10px", color: "hsl(200 15% 55%)" }}>{card.pts}</p>
              </div>
              {card.expiring && <AlertCircle size={12} style={{ color: "hsl(25,85%,52%)", flexShrink: 0 }} />}
            </div>
          ))}
        </div>

        {/* Home indicator */}
        <div style={{ paddingBottom: "10px", display: "flex", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
          <div style={{ width: "100px", height: "4px", borderRadius: "4px", background: "hsl(200 40% 15% / 0.15)" }} />
        </div>

        {/* Wallet card overlay — slides up from bottom */}
        <AnimatePresence mode="wait">
          {tip && <WalletCard key={tip.scene} tip={tip} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ paddingTop: "96px", paddingBottom: "80px" }}>
      {/* Subtle background */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, hsl(190 70% 25% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div
        className="max-w-6xl mx-auto px-6"
        style={{ display: "flex", alignItems: "center", gap: "60px", justifyContent: "center" }}
      >
        {/* Left — text content */}
        <div style={{ flex: 1, maxWidth: "540px" }}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid hsl(40 20% 88%)",
              background: "rgba(255,255,255,0.8)",
              fontSize: "13px",
              fontWeight: 500,
              color: "hsl(200 15% 45%)",
              marginBottom: "28px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(45,80%,50%)", display: "inline-block" }} />
            Now in private waitlist
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            style={{
              fontSize: "clamp(40px, 5vw, 62px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: "hsl(200 40% 12%)",
              marginBottom: "22px",
            }}
          >
            Stop your points{" "}
            <span style={{ color: "hsl(190,70%,25%)" }}>expiring.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            style={{
              fontSize: "18px",
              color: "hsl(200 15% 45%)",
              lineHeight: 1.65,
              marginBottom: "36px",
              maxWidth: "460px",
            }}
          >
            Savvy is a points and card companion for Australians. Track every balance,
            catch expiring rewards, and know your best next move — in your pocket.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "48px" }}
          >
            <a
              href="#cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "999px",
                background: "hsl(190,70%,25%)",
                color: "white",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 20px hsl(190 70% 25% / 0.35)",
                transition: "opacity 0.15s",
              }}
            >
              Get early access
              <ArrowRight size={16} />
            </a>
            <a
              href="#solution"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "999px",
                border: "1px solid hsl(40 20% 88%)",
                background: "white",
                color: "hsl(200 40% 20%)",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "background 0.15s",
              }}
            >
              See how it works
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {[
              { icon: TrendingUp, text: "From 2% to 14% captured rewards value" },
              { icon: CreditCard, text: "Built for the Australian market" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", color: "hsl(200 15% 50%)", fontSize: "14px" }}>
                <Icon size={15} style={{ color: "hsl(190,70%,25%)", flexShrink: 0 }} />
                {text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — phone mockup */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="hidden lg:flex"
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
          }}
        >
          {/* Glow behind phone */}
          <div
            style={{
              position: "absolute",
              inset: "-40px",
              borderRadius: "50%",
              background: "radial-gradient(circle, hsl(190 70% 25% / 0.15) 0%, transparent 70%)",
              filter: "blur(20px)",
              pointerEvents: "none",
            }}
          />
          <PhoneMockup />
        </motion.div>
      </div>

      {/* Mobile-only: centered phone below text */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={5}
        className="lg:hidden mt-12"
        style={{ justifyContent: "center" }}
      >
        <div style={{ transform: "scale(0.85)", transformOrigin: "top center" }}>
          <PhoneMockup />
        </div>
      </motion.div>
    </section>
  );
}
