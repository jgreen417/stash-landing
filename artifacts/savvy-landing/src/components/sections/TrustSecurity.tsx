import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, Eye, ShieldCheck, FileText, Server } from "lucide-react";

const pillars = [
  {
    icon: Eye,
    title: "Read-only by design",
    body: "Savvy reads your loyalty account balances and card data — it never makes transactions, transfers, or changes on your behalf.",
  },
  {
    icon: Lock,
    title: "Bank-grade encryption",
    body: "All data in transit and at rest is encrypted to the same standards used by Australian financial institutions.",
  },
  {
    icon: ShieldCheck,
    title: "You control your data",
    body: "Disconnect any account at any time. Delete your data with one click. No hidden retention, no selling to third parties.",
  },
  {
    icon: Server,
    title: "Australian data residency",
    body: "Your data is stored and processed in Australia. We follow Australian Privacy Act principles and do not route data offshore.",
  },
  {
    icon: FileText,
    title: "Factual guidance, not advice",
    body: "Savvy provides factual information about your points and perks. We are not a financial adviser and do not provide licensed financial advice.",
  },
];

export function TrustSecurity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="trust"
      className="py-24 px-6"
      ref={ref}
      style={{ background: "hsl(190 70% 25% / 0.03)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3 block">
            Trust and security
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Security is part of the product.
          </h2>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            You're sharing sensitive data. We don't take that lightly. Here's exactly how we handle it.
          </p>
        </motion.div>

        {/* Main trust card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 rounded-2xl border border-primary/20 overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(190 70% 25%) 0%, hsl(200 60% 20%) 100%)" }}
        >
          <div className="p-8 md:p-10 text-white">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                <ShieldCheck size={26} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Your trust comes first.</h3>
                <p className="text-white/75 leading-relaxed max-w-2xl">
                  We built Savvy knowing that connecting financial accounts requires real trust. That's why security
                  isn't bolted on as an afterthought — it's designed into how Savvy works from the ground up.
                  Read-only access. Encrypted storage. Australian data residency. Clear controls. Always.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                className="p-6 rounded-2xl bg-white border border-border hover:shadow-sm transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "hsl(190 70% 25% / 0.08)" }}
                >
                  <Icon size={17} style={{ color: "hsl(190,70%,25%)" }} />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-2">{pillar.title}</h3>
                <p className="text-sm text-foreground/55 leading-relaxed">{pillar.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
