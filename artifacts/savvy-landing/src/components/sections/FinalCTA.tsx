import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2, Mail } from "lucide-react";
import { supabase } from "../../lib/supabase";

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"email" | "name" | "done">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referralSource, setReferralSource] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef(null);
  const inView = useInView(innerRef, { once: true, margin: "-80px" });

  // Check for referral source from seller CTA
  useEffect(() => {
    const checkSource = () => {
      const source = sessionStorage.getItem("stash_referral");
      if (source) {
        setReferralSource(source);
        sessionStorage.removeItem("stash_referral");
      }
    };
    // Check on mount (page load / refresh)
    checkSource();
    // Listen for custom event from seller CTA
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        setReferralSource(detail);
      }
    };
    window.addEventListener("stash-referral", handler);
    return () => window.removeEventListener("stash-referral", handler);
  }, []);

  /* Subtle parallax scale on the card as it scrolls into view */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cardScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.94, 1, 1.02]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep("name");
    // Focus the name field after the animation
    setTimeout(() => nameRef.current?.focus(), 350);
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // If supabase isn't configured, simulate success so the app works in dev
    if (!supabase) {
      await new Promise((r) => setTimeout(r, 600));
      setStep("done");
      return;
    }

    setLoading(true);
    setError(null);
    const payload: Record<string, string> = { email: email.trim().toLowerCase(), name: name.trim() };
    if (referralSource) payload.referral_source = referralSource;
    const { error: err } = await supabase
      .from("waitlist")
      .insert(payload);
    setLoading(false);
    if (err) {
      if (err.code === "23505") {
        setStep("done");
      } else {
        setError(err.message);
      }
    } else {
      setStep("done");
    }
  };

  return (
    <section id="cta" className="py-16 md:py-24 px-6" ref={ref}>
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
              {referralSource === "SELLER" ? "Seller access" : "Private waitlist open"}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            >
              {referralSource === "SELLER" ? (
                "Interested in Stash for your brand?"
              ) : (
                <>Your rewards,<br />finally working for you.</>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.55 }}
              className="text-white/65 text-lg mb-10 leading-relaxed"
            >
              {referralSource === "SELLER"
                ? "Leave your details and we'll reach out to learn about your program and how Stash can help."
                : "Get early access to Stash. Every point, voucher, cashback, and offer working together — finally."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.38, duration: 0.55 }}
              style={{ minHeight: "152px" }}
            >
              <AnimatePresence mode="wait">
                {step === "email" && (
                  <motion.form
                    key="step-email"
                    onSubmit={handleEmailSubmit}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    noValidate
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
                      placeholder="Your email address"
                      aria-label="Email address for waitlist"
                      className="flex-1 px-5 py-3.5 rounded-full bg-white/15 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm backdrop-blur-sm"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-white text-foreground whitespace-nowrap shrink-0"
                    >
                      Join the waitlist
                      <ArrowRight size={15} />
                    </motion.button>
                  </motion.form>
                )}

                {referralSource === "SELLER" && step === "email" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.35 }}
                    className="text-center mt-4"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setReferralSource(null);
                        sessionStorage.removeItem("stash_referral");
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "13px",
                        fontWeight: 500,
                        cursor: "pointer",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                    >
                      Not a seller?
                    </button>
                  </motion.div>
                )}

                {step === "name" && (
                  <motion.form
                    key="step-name"
                    onSubmit={handleNameSubmit}
                    className="flex flex-col items-center gap-4 max-w-sm mx-auto"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Email pill — read-only */}
                    <div
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                      style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                    >
                      <Mail size={13} />
                      {email}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <input
                        ref={nameRef}
                        type="text"
                        required
                        value={name}
                        onChange={(e) => { setName(e.target.value); if (error) setError(null); }}
                        placeholder="Your first name"
                        aria-label="Your first name"
                        className="flex-1 px-5 py-3.5 rounded-full bg-white/15 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm backdrop-blur-sm"
                      />
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={loading ? {} : { scale: 1.04 }}
                        whileTap={loading ? {} : { scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-white text-foreground whitespace-nowrap shrink-0 disabled:opacity-60"
                      >
                        {loading ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <ArrowRight size={15} />
                        )}
                        {loading ? "Saving..." : "Almost done"}
                      </motion.button>
                    </div>
                  </motion.form>
                )}

                {step === "done" && (
                  <motion.div
                    key="step-done"
                    initial={{ opacity: 0, scale: 0.9, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="flex flex-col items-center justify-center gap-3 text-white"
                  >
                    <CheckCircle size={22} className="text-green-300" />
                    <p className="text-base font-medium">You're on the list — we'll be in touch soon.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && step !== "done" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-300 text-xs mt-3"
                >
                  Something went wrong. Try again or email us directly.
                </motion.p>
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
