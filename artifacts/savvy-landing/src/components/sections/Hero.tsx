import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, TrendingUp, CreditCard, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ paddingTop: "100px", paddingBottom: "80px" }}>
      {/* Subtle radial gradient background */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, hsl(190 70% 25% / 0.07) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Top text content — centered */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-white/80 text-sm font-medium text-foreground/70 mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Now in private waitlist
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08] mb-6"
          >
            Stop your points{" "}
            <span style={{ color: "hsl(190,70%,25%)" }}>expiring.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-xl text-foreground/60 leading-relaxed mb-10"
          >
            Savvy is a points and card companion for Australians. Track every balance,
            catch expiring rewards, and know your best next move — automatically.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="#cta"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-95 text-sm"
              style={{ background: "hsl(190,70%,25%)", boxShadow: "0 4px 14px hsl(190 70% 25% / 0.3)" }}
            >
              Get early access
              <ArrowRight size={15} />
            </a>
            <a
              href="#solution"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-foreground/70 border border-border bg-white hover:bg-muted transition-all text-sm"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        {/* Product Mockup — constrained card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          style={{ maxWidth: "680px", margin: "0 auto" }}
        >
          {/* Glow */}
          <div
            className="absolute -inset-6 rounded-3xl blur-3xl opacity-15 pointer-events-none"
            style={{ background: "hsl(190,70%,25%)" }}
          />

          <div
            className="relative bg-white rounded-2xl overflow-hidden"
            style={{
              border: "1px solid hsl(40 20% 88%)",
              boxShadow: "0 20px 60px -12px rgba(0,0,0,0.15), 0 4px 16px -4px rgba(0,0,0,0.08)",
            }}
          >
            {/* Window chrome */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{
                borderBottom: "1px solid hsl(40 20% 92%)",
                background: "hsl(40 33% 98%)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <div className="w-3 h-3 rounded-full bg-yellow-300" />
                <div className="w-3 h-3 rounded-full bg-green-300" />
              </div>
              <span className="text-xs font-medium text-foreground/35">savvy — dashboard</span>
              <div className="w-14" />
            </div>

            {/* Dashboard content */}
            <div className="p-5 space-y-4">
              {/* Stats row — 3 columns */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                {[
                  { label: "Total Value", value: "$2,840", sub: "across 4 programs", color: "hsl(190,70%,25%)" },
                  { label: "Expiring Soon", value: "18,400", sub: "Qantas · 23 days", color: "hsl(25,85%,52%)" },
                  { label: "Unused Perks", value: "3 perks", sub: "$180 remaining", color: "hsl(45,75%,42%)" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "hsl(40 20% 97%)",
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  >
                    <p style={{ fontSize: "10px", color: "hsl(200 15% 55%)", marginBottom: "4px" }}>{item.label}</p>
                    <p style={{ fontSize: "16px", fontWeight: 700, color: item.color, lineHeight: 1.2 }}>{item.value}</p>
                    <p style={{ fontSize: "10px", color: "hsl(200 15% 60%)", marginTop: "2px" }}>{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* Section label */}
              <p style={{ fontSize: "10px", fontWeight: 600, color: "hsl(200 15% 55%)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Your programs
              </p>

              {/* Cards row — 2 columns */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {[
                  { name: "Qantas Frequent Flyer", pts: "18,400 pts", logo: "QF", bg: "#E4002B", expiring: true },
                  { name: "Velocity Frequent Flyer", pts: "42,100 pts", logo: "VA", bg: "#E11D48" },
                  { name: "Amex Membership Rewards", pts: "67,500 pts", logo: "AX", bg: "#006FCF" },
                  { name: "Hilton Honors", pts: "24,800 pts", logo: "HH", bg: "#054A91" },
                ].map((card) => (
                  <div
                    key={card.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      borderRadius: "12px",
                      border: "1px solid hsl(40 20% 91%)",
                      background: "white",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: card.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "10px",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {card.logo}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ fontSize: "11px", fontWeight: 600, color: "hsl(200 40% 15%)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {card.name}
                      </p>
                      <p style={{ fontSize: "11px", color: "hsl(200 15% 55%)" }}>{card.pts}</p>
                    </div>
                    {card.expiring && (
                      <AlertCircle size={13} style={{ color: "hsl(25,85%,52%)", flexShrink: 0 }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Next best action */}
              <div
                style={{
                  borderRadius: "12px",
                  border: "1px solid hsl(190 70% 25% / 0.18)",
                  background: "hsl(190 70% 25% / 0.05)",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    background: "hsl(190 70% 25% / 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={13} style={{ color: "hsl(190,70%,25%)" }} />
                </div>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "hsl(200 40% 15%)", marginBottom: "3px" }}>Next best action</p>
                  <p style={{ fontSize: "11px", color: "hsl(200 15% 50%)", lineHeight: 1.5 }}>
                    Your 18,400 Qantas points expire in 23 days. Transfer to Hilton to extend validity — worth ~$220 in hotel stays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-foreground/45"
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={15} style={{ color: "hsl(190,70%,25%)" }} />
            <span>From 2% to 14% captured rewards value</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-foreground/20" />
          <div className="flex items-center gap-2">
            <CreditCard size={15} style={{ color: "hsl(190,70%,25%)" }} />
            <span>Built for the Australian market</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
