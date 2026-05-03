import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, TrendingUp, CreditCard, Sparkles, Bell, Wifi, Battery, ChevronRight, MousePointer2 } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const TIPS = [
  {
    scene: "At Woolworths",
    eyebrow: "At the checkout",
    headline: "Always know your best card.",
    body: "Savvy surfaces which card earns the most points before you tap — across groceries, dining, travel, and more.",
    logo: "AX",
    logoBg: "linear-gradient(135deg, #006FCF 0%, #0057a8 100%)",
    card: "Amex Gold",
    earn: "3× points on groceries",
    value: "+240 pts",
    valueBg: "hsl(140,58%,32%)",
  },
  {
    scene: "At Sydney Airport",
    eyebrow: "At the airport",
    headline: "Every perk, right on time.",
    body: "Free lounge access, priority boarding, travel credits — Savvy reminds you of what you've earned before you board.",
    logo: "VA",
    logoBg: "linear-gradient(135deg, #E11D48 0%, #b0142f 100%)",
    card: "Velocity Flyer",
    earn: "Free lounge access available",
    value: "Perk",
    valueBg: "hsl(45,80%,38%)",
  },
  {
    scene: "Hotel booking",
    eyebrow: "When booking",
    headline: "Maximise every dollar.",
    body: "Get pointed to the right loyalty program for hotels, flights, and experiences — so you never leave points on the table.",
    logo: "HH",
    logoBg: "linear-gradient(135deg, #054A91 0%, #033160 100%)",
    card: "Hilton Honors",
    earn: "10× pts + status night",
    value: "+1,200 pts",
    valueBg: "hsl(190,70%,28%)",
  },
];

// ─── Wallet card overlay ──────────────────────────────────────────────────────

function WalletCardFace({ tip }: { tip: typeof TIPS[0] }) {
  return (
    <div
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          background: "rgba(18, 20, 34, 0.86)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          padding: "14px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
          <Sparkles size={9} style={{ color: "hsl(45,85%,65%)" }} />
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "hsl(45,85%,65%)" }}>
            Savvy suggests
          </span>
          <span style={{ marginLeft: "auto", fontSize: "9px", color: "rgba(255,255,255,0.38)", fontWeight: 500 }}>
            {tip.scene}
          </span>
        </div>

        {/* Card row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "42px",
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.28)",
            }}
          >
            {tip.logo}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "white", marginBottom: "2px" }}>{tip.card}</p>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.48)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {tip.earn}
            </p>
          </div>
          <div
            style={{
              padding: "4px 9px",
              borderRadius: "8px",
              background: tip.valueBg,
              display: "flex",
              alignItems: "center",
              gap: "3px",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "10px", fontWeight: 700, color: "white" }}>{tip.value}</span>
            <ChevronRight size={9} style={{ color: "rgba(255,255,255,0.65)" }} />
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginTop: "12px" }}>
          {TIPS.map((t, i) => (
            <div
              key={t.scene}
              style={{
                width: t.scene === tip.scene ? "16px" : "4px",
                height: "4px",
                borderRadius: "4px",
                background: t.scene === tip.scene ? "hsl(45,85%,65%)" : "rgba(255,255,255,0.18)",
                transition: "all 0.35s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Phone mockup ─────────────────────────────────────────────────────────────

interface PhoneProps {
  walletY: MotionValue<number>;
  walletOpacity: MotionValue<number>;
  tipIndex: number;
}

function PhoneMockup({ walletY, walletOpacity, tipIndex }: PhoneProps) {
  return (
    <div
      style={{
        width: "288px",
        height: "600px",
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
      <div style={{ position: "absolute", left: "-3px", top: "110px", width: "3px", height: "34px", borderRadius: "2px 0 0 2px", background: "#252535" }} />
      <div style={{ position: "absolute", left: "-3px", top: "156px", width: "3px", height: "58px", borderRadius: "2px 0 0 2px", background: "#252535" }} />
      <div style={{ position: "absolute", left: "-3px", top: "226px", width: "3px", height: "58px", borderRadius: "2px 0 0 2px", background: "#252535" }} />
      <div style={{ position: "absolute", right: "-3px", top: "158px", width: "3px", height: "78px", borderRadius: "0 2px 2px 0", background: "#252535" }} />

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
        <div style={{ padding: "14px 20px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "hsl(200 40% 15%)" }}>9:41</span>
          <div style={{ width: "78px", height: "24px", borderRadius: "20px", background: "#0f0f1a", position: "absolute", left: "50%", transform: "translateX(-50%)", top: "10px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Wifi size={11} style={{ color: "hsl(200 40% 20%)" }} />
            <Battery size={11} style={{ color: "hsl(200 40% 20%)" }} />
          </div>
        </div>

        {/* App header */}
        <div style={{ padding: "4px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: "10px", color: "hsl(200 15% 55%)", fontWeight: 500 }}>Good morning, Sarah</p>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "hsl(200 40% 15%)", marginTop: "1px" }}>Your rewards</p>
          </div>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "hsl(190 70% 25% / 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bell size={14} style={{ color: "hsl(190,70%,25%)" }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "hidden", padding: "0 14px 8px" }}>
          {/* Total value card */}
          <div style={{ borderRadius: "20px", background: "linear-gradient(135deg, hsl(190,70%,25%) 0%, hsl(200,60%,18%) 100%)", padding: "16px", marginBottom: "11px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", fontWeight: 500, marginBottom: "5px" }}>Total rewards value</p>
            <p style={{ fontSize: "26px", fontWeight: 800, color: "white", lineHeight: 1, marginBottom: "3px" }}>$2,840</p>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>across 4 programs</p>
            <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", gap: "14px" }}>
              {[
                { label: "Expiring", val: "18,400 pts", color: "hsl(30,100%,70%)" },
                { label: "Unused perks", val: "$180", color: "hsl(45,90%,70%)" },
                { label: "This month", val: "+1,240", color: "hsl(140,60%,70%)" },
              ].map((s) => (
                <div key={s.label}>
                  <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.45)", marginBottom: "2px" }}>{s.label}</p>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: s.color }}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Program rows */}
          <p style={{ fontSize: "10px", fontWeight: 700, color: "hsl(200 15% 50%)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "7px" }}>Programs</p>
          {[
            { name: "Qantas Frequent Flyer", pts: "18,400 pts", logo: "QF", bg: "#E4002B" },
            { name: "Velocity Frequent Flyer", pts: "42,100 pts", logo: "VA", bg: "#E11D48" },
            { name: "Amex Rewards", pts: "67,500 pts", logo: "AX", bg: "#006FCF" },
            { name: "Hilton Honors", pts: "24,800 pts", logo: "HH", bg: "#054A91" },
          ].map((card) => (
            <div key={card.name} style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px", borderRadius: "12px", background: "white", border: "1px solid hsl(40 20% 92%)", marginBottom: "5px" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "9px", fontWeight: 700, flexShrink: 0 }}>
                {card.logo}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "hsl(200 40% 15%)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{card.name}</p>
                <p style={{ fontSize: "10px", color: "hsl(200 15% 55%)" }}>{card.pts}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Home indicator */}
        <div style={{ paddingBottom: "10px", display: "flex", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: "96px", height: "4px", borderRadius: "4px", background: "hsl(200 40% 15% / 0.12)" }} />
        </div>

        {/* ── Wallet card: scroll-driven slide-in ── */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "18px",
            left: "10px",
            right: "10px",
            y: walletY,
            opacity: walletOpacity,
            zIndex: 10,
          }}
        >
          <AnimatePresence mode="wait">
            {tipIndex >= 0 && (
              <motion.div
                key={tipIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <WalletCardFace tip={TIPS[tipIndex]} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Left-side scene copy ─────────────────────────────────────────────────────

function SceneCopy({ sceneIdx }: { sceneIdx: number }) {
  return (
    <div style={{ marginTop: "36px", minHeight: "90px" }}>
      <AnimatePresence mode="wait">
        {sceneIdx >= 0 ? (
          <motion.div
            key={sceneIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Step pip + eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div style={{ display: "flex", gap: "5px" }}>
                {TIPS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === sceneIdx ? "20px" : "6px",
                      height: "6px",
                      borderRadius: "6px",
                      background: i === sceneIdx ? "hsl(190,70%,25%)" : "hsl(190 70% 25% / 0.2)",
                      transition: "all 0.35s ease",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "hsl(190,70%,28%)", letterSpacing: "0.02em" }}>
                {TIPS[sceneIdx].eyebrow}
              </span>
            </div>
            <p style={{ fontSize: "15px", color: "hsl(200 15% 45%)", lineHeight: 1.65, maxWidth: "400px" }}>
              {TIPS[sceneIdx].body}
            </p>
          </motion.div>
        ) : (
          /* Placeholder spacer when no scene active */
          <motion.div
            key="empty"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ height: "90px" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Hero (scroll container) ──────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Tip index driven by scroll
  const [tipIndex, setTipIndex] = useState(-1);
  const [sceneIdx, setSceneIdx] = useState(-1);

  // Wallet card slides up from the phone bottom
  const walletY = useTransform(scrollYProgress, [0.06, 0.22], [140, 0]);
  const walletOpacity = useTransform(scrollYProgress, [0.06, 0.20], [0, 1]);

  // Scroll hint fades away
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let idx: number;
    if (v < 0.06) idx = -1;
    else if (v < 0.42) idx = 0;
    else if (v < 0.72) idx = 1;
    else idx = 2;

    setTipIndex(idx);
    setSceneIdx(idx);
  });

  return (
    /* Tall scroll container — 280vh gives enough room for 3 tip transitions */
    <div ref={containerRef} style={{ height: "280vh", position: "relative" }}>
      {/* Sticky viewport — stays pinned while user scrolls through the container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 55% 60% at 72% 50%, hsl(190 70% 25% / 0.07) 0%, transparent 70%)",
          }}
        />

        <div
          className="max-w-6xl mx-auto w-full px-6"
          style={{ display: "flex", alignItems: "center", gap: "56px", justifyContent: "center" }}
        >
          {/* ── Left: headline + CTA (always visible) + scroll-driven scene copy ── */}
          <div style={{ flex: 1, maxWidth: "520px" }}>
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 14px", borderRadius: "999px",
                border: "1px solid hsl(40 20% 88%)", background: "rgba(255,255,255,0.85)",
                fontSize: "13px", fontWeight: 500, color: "hsl(200 15% 45%)",
                marginBottom: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(45,80%,50%)", display: "inline-block" }} />
              Now in private waitlist
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              style={{
                fontSize: "clamp(38px, 4.6vw, 60px)", fontWeight: 800,
                letterSpacing: "-0.03em", lineHeight: 1.08,
                color: "hsl(200 40% 12%)", marginBottom: "20px",
              }}
            >
              Stop your points{" "}
              <span style={{ color: "hsl(190,70%,25%)" }}>expiring.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              style={{ fontSize: "17px", color: "hsl(200 15% 45%)", lineHeight: 1.65, marginBottom: "32px", maxWidth: "440px" }}
            >
              Savvy is a rewards copilot for Australians — track balances, prevent expiry,
              and know your best move at every moment.
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
            >
              <a
                href="#cta"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "13px 26px", borderRadius: "999px",
                  background: "hsl(190,70%,25%)", color: "white",
                  fontSize: "15px", fontWeight: 600, textDecoration: "none",
                  boxShadow: "0 4px 20px hsl(190 70% 25% / 0.32)",
                }}
              >
                Get early access <ArrowRight size={15} />
              </a>
              <a
                href="#solution"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "13px 26px", borderRadius: "999px",
                  border: "1px solid hsl(40 20% 88%)", background: "white",
                  color: "hsl(200 40% 20%)", fontSize: "15px", fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                See how it works
              </a>
            </motion.div>

            {/* Scroll-driven scene copy */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}>
              <SceneCopy sceneIdx={sceneIdx} />
            </motion.div>

            {/* Static trust signals — visible when no scene active */}
            <AnimatePresence>
              {sceneIdx < 0 && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}
                >
                  {[
                    { icon: TrendingUp, text: "From 2% to 14% captured rewards value" },
                    { icon: CreditCard, text: "Built for the Australian market" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", color: "hsl(200 15% 50%)", fontSize: "13px" }}>
                      <Icon size={14} style={{ color: "hsl(190,70%,25%)", flexShrink: 0 }} />
                      {text}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: sticky phone ── */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="hidden lg:flex"
            style={{ flexShrink: 0, position: "relative", alignItems: "center", justifyContent: "center" }}
          >
            {/* Glow */}
            <div
              style={{
                position: "absolute", inset: "-60px", borderRadius: "50%",
                background: "radial-gradient(circle, hsl(190 70% 25% / 0.14) 0%, transparent 70%)",
                filter: "blur(24px)", pointerEvents: "none",
              }}
            />
            <PhoneMockup walletY={walletY} walletOpacity={walletOpacity} tipIndex={tipIndex} />
          </motion.div>
        </div>

        {/* ── Scroll hint ── */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: scrollHintOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: "11px", color: "hsl(200 15% 60%)", fontWeight: 500, letterSpacing: "0.06em" }}>
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <MousePointer2 size={14} style={{ color: "hsl(200 15% 60%)" }} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
