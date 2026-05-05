import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot,
  LayoutDashboard,
  BellRing,
  Route,
  GitCompare,
  Users,
  ArrowUpRight,
} from "lucide-react";

const items = [
  {
    icon: Bot,
    title: "Savvy AI",
    body: "Ask about any card, point, or perk and get clear, factual answers — no jargon, just what matters.",
    detail: "Knows your cards, spend, goals",
    tier: 1 as const,
  },
  {
    icon: LayoutDashboard,
    title: "Full dashboard",
    body: "Every loyalty program, card, and perk in one place. Qantas, Velocity, Amex, Hilton, IHG, and more.",
    detail: "No more app-switching",
    tier: 2 as const,
  },
  {
    icon: BellRing,
    title: "Smart alerts",
    body: "Never let points expire or perks lapse. Stash watches your accounts 24/7 and notifies you with time to act.",
    detail: "Proactive, not reactive",
    tier: 2 as const,
  },
  {
    icon: Route,
    title: "Best action feed",
    body: "Transfer here, use this card, claim that perk. Timely, specific, ranked by what's worth your time.",
    detail: "Shows your rewards gap in $",
    tier: 3 as const,
  },
  {
    icon: GitCompare,
    title: "Compare + plan",
    body: "Qantas vs Jetstar for your trip. Amex transfer vs cashback. Your real balances ranked by actual value.",
    detail: "Plan with points you have",
    tier: 3 as const,
  },
  {
    icon: Users,
    title: "Human experts",
    body: "For complex redemptions and card strategy — real specialists who know Australian programs inside out.",
    detail: "Premium tier. Book on demand",
    tier: 3 as const,
  },
];

const tier2 = items.filter((t) => t.tier === 2);
const tier3 = items.filter((t) => t.tier === 3);

const iconVariant = {
  hidden: { scale: 0.3, rotate: -18, opacity: 0 },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 250, damping: 16 },
  },
};

export function Solution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="solution"
      className="py-20 md:py-24 px-6"
      style={{
        background:
          "linear-gradient(180deg, hsl(40 33% 98%) 0%, hsl(190 70% 25% / 0.04) 50%, hsl(40 33% 98%) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3 block">
            How Stash works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3 md:mb-4">
            Your rewards copilot.<br />Six layers deep.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Track, compare, act, and ask — the only platform that does it all for Australian rewards.
          </p>
        </motion.div>

        {/* ── Tier 1: Savvy AI — full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            y: -4,
            boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
            transition: { type: "spring", stiffness: 280, damping: 18 },
          }}
          className="p-6 md:p-8 rounded-2xl border cursor-default mb-5"
          style={{
            background: "linear-gradient(135deg, hsl(190 70% 25% / 0.06) 0%, white 60%)",
            borderColor: "hsl(190 70% 25% / 0.12)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-5 md:gap-7">
            <motion.div
              variants={iconVariant}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "hsl(190 70% 25% / 0.08)" }}
            >
              <Bot size={22} className="md:w-[26px] md:h-[26px]" style={{ color: "hsl(190,70%,25%)" }} />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                {items[0].title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                {items[0].body}
              </p>
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.35 }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold mt-3 px-3 py-1 rounded-full"
                style={{
                  background: "hsl(190 70% 25% / 0.08)",
                  color: "hsl(190,70%,25%)",
                }}
              >
                {items[0].detail}
                <ArrowUpRight size={11} />
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* ── Tier 2: Foundation features (2-col grid) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {tier2.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
                  transition: { type: "spring", stiffness: 280, damping: 18 },
                }}
                className="p-5 md:p-6 rounded-xl md:rounded-2xl border border-border bg-white hover:border-primary/25 transition-colors cursor-default relative group"
              >
                <motion.div
                  variants={iconVariant}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: "hsl(190 70% 25% / 0.08)" }}
                >
                  <Icon size={18} style={{ color: "hsl(190,70%,25%)" }} />
                </motion.div>
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-1.5 md:mb-2">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                <span
                  className="absolute bottom-3 md:bottom-4 right-3 md:right-4 opacity-0 group-hover:opacity-40 transition-opacity duration-200"
                  style={{ color: "hsl(190,70%,25%)" }}
                >
                  <ArrowUpRight size={13} />
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* ── Tier 3: Guidance features (3-col grid) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tier3.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
                  transition: { type: "spring", stiffness: 280, damping: 18 },
                }}
                className="p-5 md:p-6 rounded-xl md:rounded-2xl border border-border bg-white hover:border-primary/25 transition-colors cursor-default relative group"
              >
                <motion.div
                  variants={iconVariant}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: "hsl(190 70% 25% / 0.08)" }}
                >
                  <Icon size={18} style={{ color: "hsl(190,70%,25%)" }} />
                </motion.div>
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-1.5 md:mb-2">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                <span
                  className="absolute bottom-3 md:bottom-4 right-3 md:right-4 opacity-0 group-hover:opacity-40 transition-opacity duration-200"
                  style={{ color: "hsl(190,70%,25%)" }}
                >
                  <ArrowUpRight size={13} />
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
