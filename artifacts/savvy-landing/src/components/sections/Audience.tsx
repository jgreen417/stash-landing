import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Heart } from "lucide-react";

const profiles = [
  {
    icon: TrendingUp,
    tag: "Young professionals",
    age: "Ages 20–40",
    headline: "You've got the cards. Now get the most out of them.",
    body: "You've signed up for the Amex, the Qantas card, maybe a hotel program. But optimising across all of them takes time you don't have. Savvy does the monitoring, surfaces the opportunities, and tells you exactly what to do next — so you're not leaving points on the table every month.",
    points: [
      "Know which card earns most for each purchase category",
      "Get alerted before points expire or perks lapse",
      "Plan your first business-class flight using points you already have",
    ],
    accent: "hsl(190,70%,25%)",
    bg: "hsl(190 70% 25% / 0.04)",
    border: "hsl(190 70% 25% / 0.15)",
  },
  {
    icon: Heart,
    tag: "Older Australians",
    age: "Ages 60+",
    headline: "Your points are worth more than you think.",
    body: "You've been earning Qantas or Velocity points for years. But it's hard to know what they're worth, which ones are about to expire, or what you can even do with them. Savvy makes it simple: clear balances, plain English, no complexity. We watch your accounts and tell you when something needs attention.",
    points: [
      "See all your points balances in one clear dashboard",
      "Get simple, plain-English alerts before expiry",
      "Understand what you can actually do with what you have",
    ],
    accent: "hsl(45,70%,38%)",
    bg: "hsl(45 80% 50% / 0.05)",
    border: "hsl(45 80% 50% / 0.20)",
  },
];

export function Audience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3 block">
            Who it's for
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Built for every kind of rewards holder.
          </h2>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            Whether you're just starting to optimise or have years of points quietly sitting there — Savvy meets you where you are.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profiles.map((profile, i) => {
            const Icon = profile.icon;
            return (
              <motion.div
                key={profile.tag}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="rounded-2xl border p-8 hover:shadow-md transition-shadow"
                style={{ background: profile.bg, borderColor: profile.border }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: profile.accent + "20" }}
                  >
                    <Icon size={18} style={{ color: profile.accent }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50">{profile.tag}</p>
                    <p className="text-sm font-medium text-foreground/70">{profile.age}</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">{profile.headline}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-6">{profile.body}</p>

                <ul className="space-y-2.5">
                  {profile.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: profile.accent }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4l1.5 1.5 3.5-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm text-foreground/70">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
