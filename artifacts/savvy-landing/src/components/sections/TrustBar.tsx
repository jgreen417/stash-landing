import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const programs = [
  { label: "Qantas", code: "QF", bg: "#E4002B" },
  { label: "Velocity", code: "VA", bg: "#E11D48" },
  { label: "Amex", code: "AX", bg: "#006FCF" },
  { label: "Hilton", code: "HH", bg: "#054A91" },
  { label: "Cash Rewards", code: "CR", bg: "#2E7D32" },
];

export function TrustBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-10 px-6" style={{ background: "hsl(190 70% 25% / 0.03)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary whitespace-nowrap">
            Works with
          </span>

          <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-center">
            {programs.map((p, i) => (
              <motion.div
                key={p.code}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{
                  background: "white",
                  border: "1px solid hsl(40 20% 90%)",
                }}
              >
                <div
                  style={{
                    width: "20px", height: "20px", borderRadius: "5px",
                    background: p.bg, display: "flex", alignItems: "center",
                    justifyContent: "center", color: "white", fontSize: "7px",
                    fontWeight: 800, flexShrink: 0,
                  }}
                >
                  {p.code}
                </div>
                <span className="text-xs font-medium text-foreground/70">{p.label}</span>
              </motion.div>
            ))}
            <span className="text-xs text-foreground/40 font-medium">+ more</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
