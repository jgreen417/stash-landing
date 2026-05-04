import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, Eye, ShieldCheck, FileText, Server } from "lucide-react";

const pillars = [
  {
    icon: Eye,
    title: "Read-only by design",
    body: "Stash reads your loyalty account balances and card data — it never makes transactions, transfers, or changes on your behalf.",
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
    body: "Stash provides factual information about your points and perks. We are not a financial adviser and do not provide licensed financial advice.",
  },
];

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
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            You're sharing sensitive data. We don't take that lightly. Here's exactly how we handle it.
          </p>
        </motion.div>

        {/* Main trust card — scale + slide entry */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.7, type: "spring", stiffness: 160, damping: 22 }}
          className="mb-6 rounded-2xl border border-primary/20 overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(190 70% 25%) 0%, hsl(200 60% 20%) 100%)" }}
        >
          <div className="p-8 md:p-10 text-white">
            <div className="flex items-start gap-5">
              {/* Pulsing shield icon */}
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

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const xDir = i % 2 === 0 ? -20 : 20;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: xDir, y: 18, scale: 0.97 }}
                animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
                transition={{
                  delay: 0.18 + i * 0.07,
                  type: "spring",
                  stiffness: 200,
                  damping: 22,
                }}
                whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-white border border-border hover:border-primary/20 hover:shadow-md transition-shadow cursor-default"
              >
                <motion.div
                  initial={{ scale: 0.4, rotate: -12, opacity: 0 }}
                  animate={inView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
                  transition={{
                    delay: 0.25 + i * 0.07,
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                  }}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4"
                  style={{ background: "hsl(190 70% 25% / 0.08)" }}
                >
                  <Icon size={14} className="md:w-[17px] md:h-[17px]" style={{ color: "hsl(190,70%,25%)" }} />
                </motion.div>
                <h3 className="font-semibold text-xs md:text-sm text-foreground mb-1.5 md:mb-2">{pillar.title}</h3>
                <p className="text-xs md:text-sm text-foreground/55 leading-relaxed">{pillar.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
