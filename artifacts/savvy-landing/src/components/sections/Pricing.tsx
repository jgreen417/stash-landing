import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Entry",
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

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className={`relative rounded-2xl border p-7 flex flex-col ${
                plan.highlight
                  ? "border-primary/30 shadow-xl shadow-primary/10"
                  : "border-border bg-white"
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
                <p
                  className={`text-sm font-semibold mb-3 ${plan.highlight ? "text-white/60" : "text-foreground/50"}`}
                >
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? "text-white/60" : "text-foreground/50"}`}>
                    /{plan.period}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${plan.highlight ? "text-white/70" : "text-foreground/60"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
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
                    <span
                      className={`text-sm ${plan.highlight ? "text-white/85" : "text-foreground/70"}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`text-sm font-semibold px-5 py-3 rounded-full text-center transition-all hover:opacity-90 ${
                  plan.highlight
                    ? "bg-white text-foreground"
                    : "bg-primary text-white hover:shadow-md hover:shadow-primary/20"
                }`}
                style={!plan.highlight ? { color: "white", background: "hsl(190,70%,25%)" } : {}}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-sm text-foreground/40 mt-8"
        >
          All prices in AUD. Cancel anytime. No lock-in contracts.
        </motion.p>
      </div>
    </section>
  );
}
