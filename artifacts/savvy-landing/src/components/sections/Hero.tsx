import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Particles from "@/components/Particles";
import { supabase } from "../../lib/supabase";
import {
  ArrowRight,
  TrendingUp,
  CreditCard,
  Sparkles,
  Bell,
  Wifi,
  Battery,
  ChevronRight,
  MousePointer2,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TIPS = [
  {
    scene: "At Woolworths",
    eyebrow: "At the checkout",
    headline: "Always know your best card.",
    body: "Stash surfaces which card earns the most points before you tap — across groceries, dining, travel, and more.",
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
    body: "Free lounge access, priority boarding, travel credits — Stash reminds you of what you've earned before you board.",
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
  {
    scene: "At the checkout",
    eyebrow: "After paying",
    headline: "Never overpay for a deal.",
    body: "Stash validates whether that '40% off' is genuinely worth taking — and flags when a cashback or voucher from another program would save you more.",
    logo: "CB",
    logoBg: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)",
    card: "Cash Rewards",
    earn: "$12.40 unclaimed cashback",
    value: "+$12.40",
    valueBg: "hsl(160,60%,32%)",
  },
];

// ─── Wallet card overlay ───────────────────────────────────────────────────────

function WalletCardFace({ tip }: { tip: typeof TIPS[0] }) {
  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          background: "rgba(18, 20, 34, 0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          padding: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
          <Sparkles size={9} style={{ color: "hsl(45,85%,65%)" }} />
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "hsl(45,85%,65%)" }}>
            Stash suggests
          </span>
          <span style={{ marginLeft: "auto", fontSize: "9px", color: "rgba(255,255,255,0.36)", fontWeight: 500 }}>
            {tip.scene}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "42px", height: "28px", borderRadius: "7px",
              background: tip.logoBg, display: "flex", alignItems: "center",
              justifyContent: "center", color: "white", fontSize: "10px",
              fontWeight: 800, letterSpacing: "-0.02em", flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.28)",
            }}
          >
            {tip.logo}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "white", marginBottom: "2px" }}>{tip.card}</p>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.46)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {tip.earn}
            </p>
          </div>
          <div
            style={{
              padding: "4px 9px", borderRadius: "8px", background: tip.valueBg,
              display: "flex", alignItems: "center", gap: "3px", flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "10px", fontWeight: 700, color: "white" }}>{tip.value}</span>
            <ChevronRight size={9} style={{ color: "rgba(255,255,255,0.65)" }} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginTop: "12px" }}>
          {TIPS.map((t) => (
            <div
              key={t.scene}
              style={{
                width: t.scene === tip.scene ? "16px" : "4px",
                height: "4px", borderRadius: "4px",
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

// ─── Phone mockup ──────────────────────────────────────────────────────────────

interface PhoneProps {
  walletY: MotionValue<number>;
  walletOpacity: MotionValue<number>;
  tipIndex: number;
}

function PhoneMockup({ walletY, walletOpacity, tipIndex }: PhoneProps) {
  return (
    <div
      style={{
        width: "288px", height: "600px", borderRadius: "48px",
        background: "linear-gradient(160deg, #1a1a2e 0%, #0f0f1a 100%)",
        padding: "10px",
        boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)",
        position: "relative", flexShrink: 0,
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
          width: "100%", height: "100%", borderRadius: "40px",
          background: "hsl(40 33% 97%)", overflow: "hidden",
          display: "flex", flexDirection: "column", position: "relative",
        }}
      >
        {/* Status bar */}
        <div style={{ padding: "14px 20px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "hsl(200 40% 15%)" }}>9:41</span>
          <div style={{ width: "78px", height: "24px", borderRadius: "16px", background: "#0f0f1a", position: "absolute", left: "50%", transform: "translateX(-50%)", top: "10px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Wifi size={11} style={{ color: "hsl(200 40% 20%)" }} />
            <Battery size={11} style={{ color: "hsl(200 40% 20%)" }} />
          </div>
        </div>

        {/* App header */}
        <div style={{ padding: "4px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: "10px", color: "hsl(30 8% 55%)", fontWeight: 500 }}>Good morning, Sarah</p>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "hsl(200 40% 15%)", marginTop: "1px" }}>Your rewards</p>
          </div>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "hsl(190 70% 25% / 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bell size={14} style={{ color: "hsl(190,70%,25%)" }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "hidden", padding: "0 14px 8px" }}>
            <div style={{ borderRadius: "16px", background: "linear-gradient(135deg, hsl(190,70%,25%) 0%, hsl(200,60%,18%) 100%)", padding: "16px", marginBottom: "11px", position: "relative", overflow: "hidden" }}>
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

          <p style={{ fontSize: "10px", fontWeight: 700, color: "hsl(30 8% 50%)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "7px" }}>Programs</p>
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
                <p style={{ fontSize: "10px", color: "hsl(30 8% 55%)" }}>{card.pts}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Home indicator */}
        <div style={{ paddingBottom: "10px", display: "flex", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: "96px", height: "4px", borderRadius: "4px", background: "hsl(200 40% 15% / 0.12)" }} />
        </div>

        {/* Wallet overlay */}
        <motion.div
          style={{
            position: "absolute", bottom: "18px", left: "10px", right: "10px",
            y: walletY, opacity: walletOpacity, zIndex: 10,
          }}
        >
          <AnimatePresence mode="wait">
            {tipIndex >= 0 && (
              <motion.div
                key={tipIndex}
                initial={{ opacity: 0, y: 6, boxShadow: "0 0 0px rgba(42,157,143,0)" }}
                animate={{
                  opacity: 1, y: 0,
                  boxShadow: [
                    "0 0 0px rgba(42,157,143,0)",
                    "0 0 22px rgba(42,157,143,0.4)",
                    "0 0 0px rgba(42,157,143,0)",
                  ],
                }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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

// ─── Scene copy (left side) ────────────────────────────────────────────────────

function SceneCopy({ sceneIdx, onSelectScene, isMobile }: { sceneIdx: number; onSelectScene?: (idx: number) => void; isMobile?: boolean }) {
  return (
    <div
      style={{ touchAction: "pan-y", minHeight: isMobile ? "50px" : "100px", overflow: "hidden" }}
    >
      {/* Scene dots — always visible for discoverability */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : undefined, gap: "10px", marginBottom: sceneIdx >= 0 ? "10px" : "14px" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          {TIPS.map((_, i) => (
            <div
              key={i}
              onClick={() => onSelectScene?.(i)}
              style={{
                width: i === sceneIdx ? "20px" : "6px", height: "6px",
                borderRadius: "6px",
                background: i === sceneIdx ? "hsl(190,70%,25%)" : "hsl(190 70% 25% / 0.18)",
                transition: "all 0.35s ease",
                cursor: onSelectScene ? "pointer" : "default",
              }}
            />
          ))}
        </div>
        {sceneIdx >= 0 && !isMobile && (
          <span style={{ fontSize: "12px", fontWeight: 600, color: "hsl(190,70%,28%)", letterSpacing: "0.02em" }}>
            {TIPS[sceneIdx].eyebrow}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {sceneIdx >= 0 ? (
          <motion.div
            key={sceneIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "0" }}
          >
            {isMobile && (
              <button
                onClick={() => onSelectScene?.(sceneIdx > 0 ? sceneIdx - 1 : TIPS.length - 1)}
                aria-label="Previous tip"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "8px 6px", color: "hsl(190 70% 25% / 0.4)",
                  fontSize: "18px", lineHeight: 1, flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                {"<"}
              </button>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "20px", fontWeight: 700, color: "hsl(200 40% 12%)", lineHeight: 1.25, marginBottom: "10px" }}>
                {TIPS[sceneIdx].headline}
              </p>
              <p style={{ fontSize: "15px", color: "hsl(30 8% 45%)", lineHeight: 1.65, maxWidth: isMobile ? "280px" : "400px" }}>
                {TIPS[sceneIdx].body}
              </p>
            </div>
            {isMobile && (
              <button
                onClick={() => onSelectScene?.(sceneIdx < TIPS.length - 1 ? sceneIdx + 1 : 0)}
                aria-label="Next tip"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "8px 6px", color: "hsl(190 70% 25% / 0.4)",
                  fontSize: "18px", lineHeight: 1, flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                {">"}
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="trust"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {[
              { icon: TrendingUp, text: "37B points went unredeemed last year" },
              { icon: CreditCard, text: "\$292 in forgotten points per person" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", color: "hsl(30 8% 50%)", fontSize: "13px" }}>
                <Icon size={14} style={{ color: "hsl(190,70%,25%)", flexShrink: 0 }} />
                {text}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



// ─── Hero ──────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [tipIndex, setTipIndex] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches ? 0 : -1
  );
  const [sceneIdx, setSceneIdx] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches ? 0 : -1
  );
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  // ── Fetch live waitlist count ──
  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => setWaitlistCount(count ?? null));
  }, []);

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setSceneIdx((prev) => (prev + 1) % TIPS.length);
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [isMobile]);

  // ── Spring configs (different inertia for depth layers) ──
  const SPRING_HEAVY = { stiffness: 55,  damping: 26, restDelta: 0.001 }; // phone — most lag
  const SPRING_MED   = { stiffness: 80,  damping: 28, restDelta: 0.001 }; // h1, wallet
  const SPRING_LIGHT = { stiffness: 110, damping: 32, restDelta: 0.001 }; // badge, cta, pills

  // ── Wallet card ──
  const _walletY       = useTransform(scrollYProgress, [0.06, 0.28], [140, 0]);
  const walletY        = useSpring(_walletY, SPRING_MED);
  const walletOpacity  = useTransform(scrollYProgress, [0.06, 0.20], [0, 1]); // opacity — no spring

  // ── Scroll progress bar ──
  const _progressScaleY = useTransform(scrollYProgress, [0.06, 0.96], [0, 1]);
  const progressScaleY  = useSpring(_progressScaleY, SPRING_MED);

  // ── Phone float upward + scale in ──
  const _phoneY    = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const _phoneScale = useTransform(scrollYProgress, [0, 0.08, 0.5, 1], [0.92, 1, 1.02, 0.96]);
  const phoneY     = useSpring(_phoneY, SPRING_HEAVY);
  const phoneScale = useSpring(_phoneScale, SPRING_MED);

  // ── Left column parallax (different speeds for depth) ──
  const _badgeY   = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const _h1Y      = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const _subtextY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const _ctaY     = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const _sceneY   = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const badgeY    = useSpring(_badgeY, SPRING_LIGHT);
  const h1Y       = useSpring(_h1Y, SPRING_MED);
  const subtextY  = useSpring(_subtextY, SPRING_MED);
  const ctaY      = useSpring(_ctaY, SPRING_LIGHT);
  const sceneY    = useSpring(_sceneY, SPRING_LIGHT);

  // ── Background glow ──
  const glowOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.04, 0.08, 0.16, 0.12, 0.06]);
  const glowX = useTransform(scrollYProgress, [0, 1], ["52%", "82%"]);

  // ── Floating pills ──


  // ── Scroll hint ──
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (isMobile) return;
    let idx: number;
    if (v < 0.05) idx = -1;
    else if (v < 0.32) idx = 0;
    else if (v < 0.52) idx = 1;
    else if (v < 0.70) idx = 2;
    else idx = 3;
    setTipIndex(idx);
    setSceneIdx(idx);
  });

  return (
    <div ref={containerRef} style={{ height: prefersReducedMotion || isMobile ? "auto" : "280vh", position: "relative" }}>
      <div
        style={{
          position: prefersReducedMotion || isMobile ? "relative" : "sticky" as any, top: 0,
          minHeight: "100dvh",
          paddingTop: isMobile ? "calc(96px + env(safe-area-inset-top, 0px))" : "64px",
          display: "flex", alignItems: "center", overflow: "hidden",
        }}
      >
        {/* Ambient glow — animated opacity and position */}
        <motion.div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: useTransform(glowX, (x) => `radial-gradient(ellipse 50% 60% at ${x} 50%, hsl(190,70%,25%) 0%, transparent 70%)`),
            opacity: glowOpacity,
          }}
        />

        {/* Particles — floating teal/gold atmosphere */}
        {!prefersReducedMotion && (
          <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            <Particles
              particleCount={35}
              color1="#1a7a6e"
              color2="#E9B640"
              speed={0.4}
            />
          </div>
        )}

        <div
          className="max-w-6xl mx-auto w-full px-6"
          style={{ display: "flex", alignItems: "center", gap: "56px", justifyContent: "center", position: "relative" }}
        >
          {/* ── Left column ── */}
          <div style={{ flex: 1, maxWidth: "520px" }}>
            {/* Badge — parallax */}
            <motion.div style={{ y: isMobile ? 0 : badgeY }}>
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={0}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "6px 14px", borderRadius: "999px",
                  border: "1px solid hsl(40 20% 88%)", background: "rgba(255,255,255,0.88)",
                  fontSize: "13px", fontWeight: 500, color: "hsl(30 8% 45%)",
                  marginBottom: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(45,80%,50%)", display: "inline-block" }}
                />
                {waitlistCount !== null
                  ? `Join ${waitlistCount.toLocaleString()} others making every point count`
                  : "Join our private waitlist"}
              </motion.div>
            </motion.div>

            {/* H1 — faster parallax */}
            <motion.div style={{ y: isMobile ? 0 : h1Y }}>
              <motion.h1
                variants={fadeUp} initial="hidden" animate="show" custom={1}
                style={{
                  fontSize: "clamp(38px, 4.6vw, 60px)", fontWeight: 800,
                  letterSpacing: "-0.03em", lineHeight: 1.08,
                  color: "hsl(200 40% 12%)", marginBottom: "20px",
                }}
              >
                Every point, perk, and program.{" "}
                <span style={{ color: "hsl(190,70%,25%)" }}>One place.</span>
              </motion.h1>
            </motion.div>

            {/* Subtext */}
            <motion.div style={{ y: isMobile ? 0 : subtextY }}>
              <motion.p
                variants={fadeUp} initial="hidden" animate="show" custom={2}
                style={{ fontSize: "17px", color: "hsl(var(--muted-foreground))", lineHeight: 1.65, marginBottom: "32px", maxWidth: "440px" }}
              >
                Your rewards copilot. Stash tracks points, vouchers, cashback, and offers — then tells you the next best action, every time.
              </motion.p>
            </motion.div>

            {/* CTAs */}
            <motion.div style={{ y: isMobile ? 0 : ctaY }}>
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={3}
                style={{ marginBottom: "36px" }}
              >
                <a
                  id="hero-cta"
                  href="#cta"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "15px 32px", borderRadius: "999px",
                    background: "hsl(190,70%,25%)", color: "white",
                    fontSize: "16px", fontWeight: 600, textDecoration: "none",
                    boxShadow: "0 4px 20px hsl(190 70% 25% / 0.32), 0 0 0 1px hsla(45,80%,50%,0.06)",
                  }}
                >
                  Join the waitlist <ArrowRight size={16} />
                </a>
              </motion.div>
            </motion.div>

            {/* Scene copy */}
            <motion.div style={{ y: isMobile ? 0 : sceneY }}>
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}>
                <SceneCopy sceneIdx={sceneIdx} onSelectScene={(i) => { setSceneIdx(i); setTipIndex(i); }} isMobile={isMobile} />
              </motion.div>
            </motion.div>

            {/* Mobile product preview — wallet card faces */}
            {isMobile && (
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={5}
                style={{ marginTop: "20px" }}
              >
                <AnimatePresence mode="wait">
                  {sceneIdx >= 0 && (
                    <motion.div
                      key={sceneIdx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{
                        padding: "10px 12px", borderRadius: "12px",
                        background: "white", border: "1px solid hsl(40 20% 90%)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                          style={{
                            width: "28px", height: "20px", borderRadius: "5px",
                            background: TIPS[sceneIdx].logoBg, display: "flex", alignItems: "center",
                            justifyContent: "center", color: "white", fontSize: "10px",
                            fontWeight: 800, flexShrink: 0,
                          }}
                        >
                          {TIPS[sceneIdx].logo}
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: "hsl(200 40% 15%)", lineHeight: 1.2 }}>
                          {TIPS[sceneIdx].card}
                        </span>
                      </div>
                      <div style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "11px", color: "hsl(30 8% 55%)", flex: 1 }}>
                          {TIPS[sceneIdx].earn}
                        </span>
                        <span
                          style={{
                            fontSize: "11px", fontWeight: 700, color: "white",
                            padding: "2px 7px", borderRadius: "6px",
                            background: TIPS[sceneIdx].valueBg, whiteSpace: "nowrap",
                          }}
                        >
                          {TIPS[sceneIdx].value}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* ── Right column: phone + decorations ── */}
          <motion.div
            className="hidden md:flex"
            style={{
              flexShrink: 0, position: "relative",
              alignItems: "center", justifyContent: "center",
              y: phoneY,
              scale: phoneScale,
            }}
          >
            {/* Ambient glow behind phone */}
            <div
              style={{
                position: "absolute", inset: "-60px", borderRadius: "50%",
                background: "radial-gradient(circle, hsl(190 70% 25% / 0.13) 0%, transparent 70%)",
                filter: "blur(24px)", pointerEvents: "none",
              }}
            />

            {/* ── Progress bar — right edge of phone ── */}
            <div
              style={{
                position: "absolute", right: "-16px",
                top: "12%", bottom: "12%",
                width: "2px", borderRadius: "2px",
                background: "hsl(190 70% 25% / 0.12)",
              }}
            />
            <motion.div
              style={{
                position: "absolute", right: "-16px",
                top: "12%", bottom: "12%",
                width: "2px", borderRadius: "2px",
                background: "linear-gradient(to bottom, hsl(190,70%,40%), hsl(190,70%,25%))",
                scaleY: progressScaleY,
                originY: 0,
              }}
            />
            {/* Progress dot at top */}
            <motion.div
              style={{
                position: "absolute", right: "-19px", top: "12%",
                width: "8px", height: "8px", borderRadius: "50%",
                background: "hsl(190,70%,25%)",
                opacity: useTransform(scrollYProgress, [0.04, 0.10], [0, 1]),
                marginTop: "-4px",
              }}
            />

            {/* ── Floating pills removed — info shown in wallet card + scene copy ── */}

            <PhoneMockup walletY={walletY} walletOpacity={walletOpacity} tipIndex={tipIndex} />
          </motion.div>
        </div>

        {/* ── Scroll hint ── */}
        {!prefersReducedMotion && !isMobile && (
        <motion.div
          style={{
            position: "absolute", bottom: "28px", left: "50%",
            transform: "translateX(-50%)",
            opacity: scrollHintOpacity,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "6px", pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: "10px", color: "hsl(30 8% 55%)", fontWeight: 600, letterSpacing: "0.1em" }}>
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <MousePointer2 size={13} style={{ color: "hsl(30 8% 55%)" }} />
          </motion.div>
        </motion.div>
        )}
      </div>
    </div>
  );
}
