import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="cta" className="py-24 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden p-12"
          style={{
            background: "linear-gradient(135deg, hsl(190 70% 25%) 0%, hsl(200 55% 18%) 100%)",
          }}
        >
          {/* Subtle texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 20%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
              style={{ background: "hsl(45 80% 50% / 0.25)", color: "hsl(45,80%,70%)" }}
            >
              Private waitlist open
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Your rewards,<br />finally working for you.
            </h2>

            <p className="text-white/65 text-lg mb-10 leading-relaxed">
              Join thousands of Australians getting early access to Savvy.
              Know your best next move before value disappears.
            </p>

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
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-white text-foreground hover:opacity-90 transition-all active:scale-95 whitespace-nowrap"
                >
                  Get early access
                  <ArrowRight size={15} />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 text-white"
              >
                <CheckCircle size={22} className="text-green-300" />
                <p className="text-base font-medium">You're on the list — we'll be in touch soon.</p>
              </motion.div>
            )}

            <p className="text-white/35 text-xs mt-6">
              No spam. Unsubscribe anytime. We'll email you when Savvy is ready.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
