import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, LayoutDashboard, Users } from "lucide-react";

const layers = [
  {
    number: "01",
    icon: Zap,
    title: "AI guidance, instantly",
    body: "Ask Savvy anything about your cards, points, or perks. Get clear, factual answers in plain English — no jargon, no advice disclaimers, just the right information when you need it.",
    detail: "Proactive alerts when something needs your attention.",
  },
  {
    number: "02",
    icon: LayoutDashboard,
    title: "Your rewards, unified",
    body: "One dashboard for every card, loyalty account, and perk you hold. Savvy connects the dots so you can see your full rewards picture in seconds — not hours.",
    detail: "Tracks Qantas, Velocity, Amex, Hilton, IHG, and more.",
  },
  {
    number: "03",
    icon: Users,
    title: "Human experts, when you need them",
    body: "For complex redemptions, award flight searches, or maximising a large points balance — connect with a specialist who knows Australian programs inside out.",
    detail: "Available on Premium and Family plans.",
  },
];

export function Solution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="solution"
      className="py-24 px-6"
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
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3 block">
            How Savvy works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Your rewards copilot.<br />Three layers deep.
          </h2>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            Most apps show you data. Savvy tells you what to do with it — and backs it up when things get complex.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line draws itself */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px overflow-hidden">
            <div style={{ height: "1px", background: "hsl(40 20% 88%)", position: "absolute", inset: 0 }} />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute", inset: 0, height: "1px",
                background: "linear-gradient(to right, transparent, hsl(190,70%,25%), transparent)",
                transformOrigin: "left",
              }}
            />
          </div>

          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.number}
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  delay: i * 0.14,
                  duration: 0.65,
                  type: "spring",
                  stiffness: 180,
                  damping: 22,
                }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 280, damping: 18 } }}
                className="relative flex flex-col cursor-default"
              >
                <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md hover:border-primary/25 transition-shadow">
                  {/* Icon pops in with spring after card */}
                  <motion.div
                    initial={{ scale: 0.2, rotate: -20, opacity: 0 }}
                    animate={inView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
                    transition={{
                      delay: i * 0.14 + 0.2,
                      type: "spring",
                      stiffness: 280,
                      damping: 16,
                    }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative z-10"
                    style={{ background: "hsl(190,70%,25%)", boxShadow: "0 4px 16px hsl(190 70% 25% / 0.3)" }}
                  >
                    <Icon size={22} className="text-white" />
                  </motion.div>

                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: i * 0.14 + 0.35, duration: 0.4 }}
                    className="text-xs font-bold text-foreground/25 tracking-widest mb-2"
                  >
                    {layer.number}
                  </motion.span>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{layer.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-4">{layer.body}</p>
                  <span className="text-xs text-foreground/40 italic">{layer.detail}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
