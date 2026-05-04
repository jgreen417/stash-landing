import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { TrustSecurity } from "@/components/sections/TrustSecurity";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1" style={{ position: "relative" }}>
        <Hero />
        <TrustBar />
        <Problem />
        <Solution />
        <TrustSecurity />
        {/* <Pricing /> */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
