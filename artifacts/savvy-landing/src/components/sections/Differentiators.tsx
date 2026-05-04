import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bot, TrendingUp, Users, GitCompare, Target, Gift } from "lucide-react";

const differentiators = [
  {
    icon: Bot,
    title: "Savvy AI — not a generic chatbot",
    body: "A personalised, adaptive assistant that knows your cards, your spend patterns, and your goals. It gets smarter the more you use it.",
  },
  {
    icon: TrendingUp,
    title: "Your rewards gap, in dollars",
    body: "No vague 'optimisation'. Stash shows exactly what you're leaving on the table — every card, every point, every missed opportunity — in hard numbers.",
  },
  {
    icon: Users,
    title: "Human experts who get it",
    body: "For the complex stuff — award bookings, card strategy, points transfers — real specialists who know Australian programs inside out. Hard to replicate.",
  },
  {
    icon: GitCompare,
    title: "Compare with your actual points",
    body: "Qantas vs Jetstar for your specific trip. Amex transfer vs cashback. Stash uses your real balances, not generic examples.",
  },
  {
    icon: Target,
    title: "Goal planner that works backward",
    body: "Pick a destination or reward. Stash reverse-engineers the cards and spend you need to get there — and tracks progress every month.",
  },
  {
    icon: Gift,
    title: "Year-end Wrapped, built to share",
    body: "A personalised annual summary of every point earned, every perk claimed, and every dollar saved. Drives retention and word-of-mouth.",
  },
];

export function Differentiators() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="differentiators"
      className="py-24 px-6"
      ref={ref}
      style={{
        background:
          "linear-gradient(180deg, hsl(40 33% 98%) 0%, hsl(190 70% 25% / 0.04) 50%, hsl(40 33% 98%) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3 block">
            What makes Stash different
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Not another rewards tracker.<br />A rewards intelligence engine.
          </h2>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            Other apps show you data. Stash shows you what to do — and backs it up with real people when it matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
                  transition: { type: "spring", stiffness: 280, damping: 18 },
                }}
                className="p-6 rounded-2xl border border-border bg-white hover:border-primary/25 transition-colors cursor-default"
              >
                <motion.div
                  initial={{ scale: 0.4, rotate: -12, opacity: 0 }}
                  animate={inView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
                  transition={{
                    delay: i * 0.07 + 0.15,
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                  }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "hsl(190 70% 25% / 0.08)" }}
                >
                  <Icon size={18} style={{ color: "hsl(190,70%,25%)" }} />
                </motion.div>
                <h3 className="text-base font-semibold text-foreground mb-2">{d.title}</h3>
                <p className="text-sm text-foreground/55 leading-relaxed">{d.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
