import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LayoutGrid, BellRing, Route, Flame, Plane } from "lucide-react";

const features = [
  {
    icon: LayoutGrid,
    title: "All programs, one place",
    body: "Connect Qantas, Velocity, Amex Membership Rewards, hotel chains, and more. Your complete loyalty portfolio, always in sync.",
    highlight: "No more app-switching.",
  },
  {
    icon: BellRing,
    title: "Expiry and perk alerts",
    body: "Savvy watches your accounts 24/7 and notifies you before points expire or perks are about to lapse — with time to act.",
    highlight: "Never lose value silently again.",
  },
  {
    icon: Route,
    title: "Points redemption helper",
    body: "Explore what your points are actually worth. Savvy shows real redemption options ranked by value — flights, hotels, transfers, cashback.",
    highlight: "Get the most from every point.",
  },
  {
    icon: Flame,
    title: "Proactive next best action",
    body: "A personalised feed of what to do right now. Transfer here, use this card there, claim this perk before it expires. Factual, timely, specific.",
    highlight: "Guidance that fits your life.",
  },
  {
    icon: Plane,
    title: "Travel rewards planning",
    body: "Working towards a trip? Savvy helps you map the fastest path using points you already have — and flags gaps before you book.",
    highlight: "Points-first travel planning.",
  },
];

export function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3 block">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Everything working in the background.
          </h2>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            Savvy runs quietly behind the scenes so you capture more value without the effort.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                className={`group p-7 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-md transition-all ${
                  i === 4 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                    style={{ background: "hsl(190 70% 25% / 0.08)" }}
                  >
                    <Icon size={20} style={{ color: "hsl(190,70%,25%)" }} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed mb-3">{feature.body}</p>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: "hsl(45 80% 50% / 0.12)",
                        color: "hsl(35,70%,35%)",
                      }}
                    >
                      {feature.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
