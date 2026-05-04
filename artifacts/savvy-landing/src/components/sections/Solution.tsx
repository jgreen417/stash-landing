import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot,
  LayoutDashboard,
  BellRing,
  Route,
  GitCompare,
  Users,
} from "lucide-react";

const items = [
  {
    icon: Bot,
    title: "Savvy AI",
    body: "Ask about any card, point, or perk and get clear, factual answers — no jargon, just what matters.",
    detail: "Knows your cards, spend, goals",
  },
  {
    icon: LayoutDashboard,
    title: "Full dashboard",
    body: "Every loyalty program, card, and perk in one place. Qantas, Velocity, Amex, Hilton, IHG, and more.",
    detail: "No more app-switching",
  },
  {
    icon: BellRing,
    title: "Smart alerts",
    body: "Never let points expire or perks lapse. Stash watches your accounts 24/7 and notifies you with time to act.",
    detail: "Proactive, not reactive",
  },
  {
    icon: Route,
    title: "Best action feed",
    body: "Transfer here, use this card, claim that perk. Timely, specific, ranked by what's worth your time.",
    detail: "Shows your rewards gap in $",
  },
  {
    icon: GitCompare,
    title: "Compare + plan",
    body: "Qantas vs Jetstar for your trip. Amex transfer vs cashback. Your real balances ranked by actual value.",
    detail: "Plan with points you have",
  },
  {
    icon: Users,
    title: "Human experts",
    body: "For complex redemptions and card strategy — real specialists who know Australian programs inside out.",
    detail: "Premium tier. Book on demand",
  },
];

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
          <p className="text-base md:text-lg text-foreground/60 max-w-xl mx-auto">
            Track, compare, act, and ask — the only platform that does it all for Australian rewards.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 180,
                  damping: 22,
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
                  transition: { type: "spring", stiffness: 280, damping: 18 },
                }}
                className="p-4 md:p-5 rounded-xl md:rounded-2xl border border-border bg-white hover:border-primary/25 transition-colors cursor-default"
              >
                <motion.div
                  initial={{ scale: 0.3, rotate: -18, opacity: 0 }}
                  animate={inView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
                  transition={{
                    delay: i * 0.07 + 0.12,
                    type: "spring",
                    stiffness: 250,
                    damping: 16,
                  }}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4"
                  style={{ background: "hsl(190 70% 25% / 0.08)" }}
                >
                  <Icon size={16} className="md:w-[19px] md:h-[19px]" style={{ color: "hsl(190,70%,25%)" }} />
                </motion.div>
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-1.5 md:mb-2">{item.title}</h3>
                <p className="text-xs md:text-sm text-foreground/60 leading-relaxed mb-2 md:mb-3">{item.body}</p>
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.07 + 0.25, duration: 0.35 }}
                  className="text-[11px] md:text-xs font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded-full inline-block"
                  style={{
                    background: "hsl(45 80% 50% / 0.12)",
                    color: "hsl(35,70%,35%)",
                  }}
                >
                  {item.detail}
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
