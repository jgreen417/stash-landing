import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Store, BarChart3, Target, TrendingDown, Shield, Lightbulb } from "lucide-react";

const items = [
  {
    icon: Store,
    title: "Reach the right customers",
    body: "Stash matches your offers with the shoppers most likely to value them — based on real spending behaviour, reward preferences, and shopping goals. No spray and pray.",
    impact: "Precision targeting with zero wasted reach",
  },
  {
    icon: BarChart3,
    title: "Campaign intelligence",
    body: "See exactly how your promotions perform. Stash provides privacy-safe insights on acquisition, retention, repeat purchase, and campaign lift — aggregated across your audience.",
    impact: "Know what works. Measure what matters.",
  },
  {
    icon: Target,
    title: "Competitor benchmarking",
    body: "How does your program stack up? Compare earn rates, redemption values, perk structures, and member satisfaction against competitors in your category.",
    impact: "Your program vs the market, in real data",
  },
  {
    icon: TrendingDown,
    title: "Lower wasted promotion spend",
    body: "Stop sending offers to people who won't use them. Stash's AI routes each promotion to the audience segment most likely to convert — slashing cost-per-acquisition.",
    impact: "Higher conversion, lower CPA",
  },
  {
    icon: Shield,
    title: "Privacy-safe by design",
    body: "All seller insights are anonymised and aggregated. Individual consumer data stays private. Stash is built on a model where both sides win — without compromising the consumer.",
    impact: "Consumer trust meets seller intelligence",
  },
  {
    icon: Lightbulb,
    title: "Loyalty program recommendations",
    body: "Get AI-generated suggestions for improving your program design — earn rates, tier structures, perk mix, and redemption options — based on real member behaviour data.",
    impact: "Data-driven program optimisation",
  },
];

export function Differentiators() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="for-sellers"
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
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5" style={{ background: "hsl(190,70%,25%)", color: "white" }}>
            For sellers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Promote smarter, not louder.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Stash is an AI loyalty intelligence platform that helps retailers, banks, and programs reach the right customers, benchmark performance, and design better rewards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
          {items.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="p-5 md:p-6 relative cursor-default"
                style={{
                  borderLeft: "3px solid hsl(190 70% 25% / 0.15)",
                  borderRadius: 0,
                  transition: "background 0.25s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(190 70% 25% / 0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -8, scale: 0.8 }}
                  animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{
                    delay: i * 0.07 + 0.1,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mb-3"
                >
                  <Icon size={20} style={{ color: "hsl(190,70%,25%)" }} />
                </motion.div>
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-2 leading-snug">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{d.body}</p>
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.07 + 0.25, duration: 0.35 }}
                  className="text-xs font-medium inline-flex items-center gap-1.5"
                  style={{ color: "hsl(190,70%,25%)" }}
                >
                  {d.impact}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        {/* ── Seller CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-12"
        >
          <a
            href="#cta"
            onClick={() => {
              sessionStorage.setItem("stash_referral", "SELLER");
              window.dispatchEvent(new CustomEvent("stash-referral", { detail: "SELLER" }));
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "999px",
              background: "hsl(190,70%,25%)",
              color: "white",
              fontSize: "15px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 20px hsl(190 70% 25% / 0.32)",
            }}
          >
            Talk to us about seller access
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            No commitment. We'll reach out to learn about your program.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
