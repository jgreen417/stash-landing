import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef(null);
  const inView = useInView(innerRef, { once: true, margin: "-80px" });

  /* Subtle parallax scale on the card as it scrolls into view */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cardScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.94, 1, 1.02]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="cta" className="py-24 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto text-center" ref={innerRef}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ scale: cardScale }}
          className="relative rounded-3xl overflow-hidden p-12"
        >
          {/* Parallax background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, hsl(190 70% 25%) 0%, hsl(200 55% 18%) 100%)",
              y: bgY,
              scale: 1.12,
            }}
          />

          {/* Animated dot texture */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 20%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            animate={{ opacity: [0.04, 0.07, 0.04] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          />

          {/* Glow orb top-right */}
          <motion.div
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />

          <div className="relative">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
              style={{ background: "hsl(45 80% 50% / 0.25)", color: "hsl(45,80%,70%)" }}
            >
              Private waitlist open
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            >
              Your rewards,<br />finally working for you.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.55 }}
              className="text-white/65 text-lg mb-10 leading-relaxed"
            >
              Join thousands of Australians getting early access to Stash.
              Know your best next move before value disappears.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.38, duration: 0.55 }}
            >
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-5 py-3.5 rounded-full bg-white/15 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm backdrop-blur-sm"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-white text-foreground whitespace-nowrap"
                  >
                    Get early access
                    <ArrowRight size={15} />
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="flex items-center justify-center gap-3 text-white"
                >
                  <CheckCircle size={22} className="text-green-300" />
                  <p className="text-base font-medium">You're on the list — we'll be in touch soon.</p>
                </motion.div>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-white/35 text-xs mt-6"
            >
              No spam. Unsubscribe anytime. We'll email you when Stash is ready.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
