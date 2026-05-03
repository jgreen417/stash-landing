import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, TrendingUp, CreditCard, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, hsl(190 70% 25% / 0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background:
              "linear-gradient(to top, hsl(40 33% 98%) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto text-center">
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
          className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Savvy is a points and card companion for Australians. Track every balance,
          catch expiring rewards, and know your best next move — automatically.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
            style={{ background: "hsl(190,70%,25%)" }}
          >
            Get early access
            <ArrowRight size={16} />
          </a>
          <a
            href="#solution"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-foreground/80 border border-border bg-white hover:bg-muted transition-all"
          >
            See how it works
          </a>
        </motion.div>

        {/* Product Mockup */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="relative max-w-2xl mx-auto"
        >
          <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-20" style={{ background: "hsl(190,70%,25%)" }} />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
            {/* Mockup header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <div className="w-3 h-3 rounded-full bg-yellow-300" />
                <div className="w-3 h-3 rounded-full bg-green-300" />
              </div>
              <span className="text-xs font-medium text-foreground/40">Savvy Dashboard</span>
              <div className="w-16" />
            </div>

            <div className="p-5 space-y-4">
              {/* Summary row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Total Points Value", value: "$2,840", sub: "across 4 programs", color: "hsl(190,70%,25%)" },
                  { label: "Expiring Soon", value: "18,400 pts", sub: "Qantas in 23 days", color: "hsl(25,90%,55%)" },
                  { label: "Perks Unused", value: "3 perks", sub: "$180 remaining", color: "hsl(45,80%,50%)" },
                ].map((item) => (
                  <div key={item.label} className="bg-muted/50 rounded-xl p-3 text-left">
                    <p className="text-[10px] text-foreground/50 mb-1">{item.label}</p>
                    <p className="text-base font-bold" style={{ color: item.color }}>{item.value}</p>
                    <p className="text-[10px] text-foreground/50">{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* Cards row */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wide">Your programs</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "Qantas Frequent Flyer", pts: "18,400", logo: "QF", color: "#E4002B", expiring: true },
                    { name: "Velocity Frequent Flyer", pts: "42,100", logo: "VA", color: "#E11D48" },
                    { name: "Amex Membership Rewards", pts: "67,500", logo: "AX", color: "#006FCF" },
                    { name: "Hilton Honors", pts: "24,800", logo: "HH", color: "#054A91" },
                  ].map((card) => (
                    <div
                      key={card.name}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border bg-white hover:shadow-sm transition-shadow"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                        style={{ background: card.color }}
                      >
                        {card.logo}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-foreground truncate">{card.name}</p>
                        <p className="text-[11px] text-foreground/50">{card.pts} pts</p>
                      </div>
                      {card.expiring && (
                        <AlertCircle size={12} className="shrink-0 text-orange-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Next best action */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Sparkles size={14} style={{ color: "hsl(190,70%,25%)" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-0.5">Next best action</p>
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    Your 18,400 Qantas points expire in 23 days. Transfer to Hilton to extend validity
                    and book a Sydney night worth ~$220.
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
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-foreground/50"
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={16} style={{ color: "hsl(190,70%,25%)" }} />
            <span>From 2% to 14% captured rewards value</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-foreground/20" />
          <div className="flex items-center gap-2">
            <CreditCard size={16} style={{ color: "hsl(190,70%,25%)" }} />
            <span>Built for the Australian market</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
