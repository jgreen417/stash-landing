import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, Eye, ShieldCheck, FileText, Server, ArrowUpRight } from "lucide-react";

const tiers = [
  {
    icon: Eye,
    title: "Read-only by design",
    body: "Stash reads your loyalty account balances and card data — it never makes transactions, transfers, or changes on your behalf.",
    tier: 1 as const,
  },
  {
    icon: Lock,
    title: "Bank-grade encryption",
    body: "All data in transit and at rest is encrypted to the same standards used by Australian financial institutions.",
    tier: 2 as const,
  },
  {
    icon: Server,
    title: "Australian data residency",
    body: "Your data is stored and processed in Australia. We follow Australian Privacy Act principles and do not route data offshore.",
    tier: 2 as const,
  },
  {
    icon: ShieldCheck,
    title: "You control your data",
    body: "Disconnect any account at any time. Delete your data with one click. No hidden retention, no selling to third parties.",
    tier: 3 as const,
  },
  {
    icon: FileText,
    title: "Factual guidance, not advice",
    body: "Stash provides factual information about your points and perks. We are not a financial adviser and do not provide licensed financial advice.",
    tier: 3 as const,
  },
];

const tier1 = tiers[0];
const tier2 = tiers.filter((t) => t.tier === 2);
const tier3 = tiers.filter((t) => t.tier === 3);

const iconVariant = {
  hidden: { scale: 0.4, rotate: -12, opacity: 0 },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 16 },
  },
};

export function TrustSecurity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="trust"
      className="py-16 md:py-24 px-6"
      ref={ref}
      style={{ background: "hsl(190 70% 25% / 0.03)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3 block">
            Trust and security
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Security is part of the product.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            You're sharing sensitive data. We don't take that lightly. Here's exactly how we handle it.
          </p>
        </motion.div>

        {/* ── Hero card — "Your trust comes first" ── */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.7, type: "spring", stiffness: 160, damping: 22 }}
          className="mb-8 rounded-2xl border border-primary/20 overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(190 70% 25%) 0%, hsl(200 60% 20%) 100%)" }}
        >
          <div className="p-8 md:p-10 text-white">
            <div className="flex items-start gap-5">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0"
                animate={{ boxShadow: ["0 0 0 0 rgba(255,255,255,0)", "0 0 0 10px rgba(255,255,255,0.07)", "0 0 0 0 rgba(255,255,255,0)"] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 1 }}
              >
                <ShieldCheck size={26} className="text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Your trust comes first.</h3>
                <p className="text-white/75 leading-relaxed max-w-2xl">
                  We built Stash knowing that connecting financial accounts requires real trust. That's why security
                  isn't bolted on as an afterthought — it's designed into how Stash works from the ground up.
                  Read-only access. Encrypted storage. Australian data residency. Clear controls. Always.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Tier 1: Read-only (dominant, full-width) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            y: -3,
            boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
            transition: { type: "spring", stiffness: 280, damping: 18 },
          }}
          className="p-6 md:p-7 rounded-2xl border cursor-default mb-4"
          style={{
            background: "linear-gradient(135deg, hsl(190 70% 25% / 0.06) 0%, white 60%)",
            borderColor: "hsl(190 70% 25% / 0.12)",
          }}
        >
          <div className="flex items-start gap-4 md:gap-6">
            <motion.div
              variants={iconVariant}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "hsl(190 70% 25% / 0.08)" }}
            >
              <Eye size={22} className="md:w-[26px] md:h-[26px]" style={{ color: "hsl(190,70%,25%)" }} />
            </motion.div>
            <div className="min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{tier1.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{tier1.body}</p>
            </div>
          </div>
        </motion.div>

        {/* ── Tier 2: Infrastructure (2-col grid) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {tier2.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="p-5 md:p-6 rounded-xl md:rounded-2xl bg-white border border-border hover:border-primary/20 hover:shadow-md transition-shadow cursor-default"
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
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.body}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ── Tier 3: User-facing rights (2-col grid) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tier3.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="p-5 md:p-6 rounded-xl md:rounded-2xl bg-white border border-border hover:border-primary/20 hover:shadow-md transition-shadow cursor-default"
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
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
