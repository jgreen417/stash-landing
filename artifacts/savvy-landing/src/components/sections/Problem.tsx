import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, SplitSquareHorizontal, AlertTriangle, Gift, Layers } from "lucide-react";

const problems = [
  {
    icon: Layers,
    title: "Too many programs, not enough clarity",
    body: "Qantas, Velocity, Amex, hotel chains, supermarket points — managing them all means juggling apps, websites, and half-forgotten logins.",
  },
  {
    icon: SplitSquareHorizontal,
    title: "Wrong card for the wrong purchase",
    body: "Leaving earn rates on the table every single day. Most Australians don't know which card earns best at Coles versus overseas versus online.",
  },
  {
    icon: Clock,
    title: "Points expire without warning",
    body: "Billions of loyalty points go unused every year in Australia. They disappear quietly, often without even a notification.",
  },
  {
    icon: Gift,
    title: "Perks sit unused until they vanish",
    body: "Annual travel credits, dining allowances, lounge passes — premium card benefits that never get claimed because no one tracks them.",
  },
  {
    icon: AlertTriangle,
    title: "No single place to see the full picture",
    body: "There's no dashboard, no alert system, no guide. Just scattered apps and the vague sense that you're probably missing out.",
  },
];

export function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="problem" className="py-24 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3 block">
            The problem
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Rewards are broken for most Australians.
          </h2>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            You earned the points. You pay the annual fees. But value keeps slipping through the cracks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`p-6 rounded-2xl border border-border bg-white hover:shadow-md transition-shadow ${
                  i === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <Icon size={18} className="text-foreground/60" />
                </div>
                <h3 className="font-semibold text-base text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-foreground/55 leading-relaxed">{p.body}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-foreground/40 italic">
            The average Australian household has 3.2 loyalty program memberships and captures less than 30% of potential value.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
