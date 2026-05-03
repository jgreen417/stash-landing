import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Entry",
    priceNum: 0,
    price: "$0",
    period: "free to start",
    description: "Get the full picture of your rewards — and start making smarter choices.",
    features: [
      "Up to 3 loyalty programs",
      "Points balance dashboard",
      "Basic expiry alerts",
      "Savvy AI assistant (limited)",
      "Mobile app access",
    ],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Premium",
    priceNum: 9,
    price: "$9",
    period: "per month",
    description: "Unlock the full rewards intelligence engine for serious optimisers.",
    features: [
      "Unlimited loyalty programs",
      "All card and perk tracking",
      "Proactive next best action feed",
      "Advanced redemption helper",
      "Travel rewards planning",
      "Priority expiry alerts",
      "Full Savvy AI assistant",
    ],
    cta: "Join waitlist",
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "Family & Concierge",
    priceNum: 24,
    price: "$24",
    period: "per month",
    description: "Everything in Premium, plus human expert support for complex redemptions.",
    features: [
      "Everything in Premium",
      "Up to 4 household members",
      "Human expert consultations",
      "Award flight search assistance",
      "Dedicated redemption support",
      "White-glove onboarding",
    ],
    cta: "Join waitlist",
    highlight: false,
  },
];

function AnimatedPrice({ num, inView, highlight }: { num: number; inView: boolean; highlight: boolean }) {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `$${Math.round(v)}`);

  useEffect(() => {
    if (inView && num > 0) {
      const ctrl = animate(count, num, { duration: 0.9, ease: "easeOut", delay: 0.3 });
      return ctrl.stop;
    }
  }, [inView, num, count]);

  if (num === 0) {
    return (
      <span className={`text-4xl font-bold ${highlight ? "text-white" : "text-foreground"}`}>$0</span>
    );
  }

  return (
    <motion.span className={`text-4xl font-bold tabular-nums ${highlight ? "text-white" : "text-foreground"}`}>
      {display}
    </motion.span>
  );
}

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3 block">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Start free. Upgrade when it pays off.
          </h2>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            Pricing that earns back its own cost — typically in the first month.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={inView ? { opacity: 1, y: plan.highlight ? -8 : 0, scale: 1 } : {}}
              transition={{
                delay: i * 0.11,
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
              whileHover={{
                y: plan.highlight ? -14 : -6,
                transition: { type: "spring", stiffness: 280, damping: 18 },
              }}
              className={`relative rounded-2xl border p-7 flex flex-col cursor-default ${
                plan.highlight
                  ? "border-primary/30 shadow-xl shadow-primary/12"
                  : "border-border bg-white hover:shadow-md hover:border-primary/20 transition-shadow"
              }`}
              style={
                plan.highlight
                  ? {
                      background: "linear-gradient(160deg, hsl(190 70% 25%) 0%, hsl(200 60% 18%) 100%)",
                      color: "white",
                    }
                  : {}
              }
            >
              {/* Glow ring on highlighted card */}
              {plan.highlight && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 hsl(190 70% 40% / 0)",
                      "0 0 0 6px hsl(190 70% 40% / 0.2)",
                      "0 0 0 0 hsl(190 70% 40% / 0)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 1.5 }}
                />
              )}

              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ background: "hsl(45,80%,50%)" }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className={`text-sm font-semibold mb-3 ${plan.highlight ? "text-white/60" : "text-foreground/50"}`}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <AnimatedPrice num={plan.priceNum} inView={inView} highlight={plan.highlight} />
                  <span className={`text-sm ${plan.highlight ? "text-white/60" : "text-foreground/50"}`}>
                    /{plan.period}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${plan.highlight ? "text-white/70" : "text-foreground/60"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, fi) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.11 + fi * 0.05 + 0.25, duration: 0.35 }}
                    className="flex items-start gap-2.5"
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.highlight ? "bg-white/20" : "bg-primary/10"
                      }`}
                    >
                      <Check
                        size={11}
                        strokeWidth={2.5}
                        style={{ color: plan.highlight ? "white" : "hsl(190,70%,25%)" }}
                      />
                    </div>
                    <span className={`text-sm ${plan.highlight ? "text-white/85" : "text-foreground/70"}`}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#cta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`text-sm font-semibold px-5 py-3 rounded-full text-center transition-all ${
                  plan.highlight ? "bg-white text-foreground" : ""
                }`}
                style={!plan.highlight ? { color: "white", background: "hsl(190,70%,25%)" } : {}}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-sm text-foreground/40 mt-8"
        >
          All prices in AUD. Cancel anytime. No lock-in contracts.
        </motion.p>
      </div>
    </section>
  );
}
