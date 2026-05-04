import { StashLogo } from "./Navbar";

export function Footer() {
  const links = {
    Product: ["How it works", "Pricing", "Trust & Security"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  const anchorHrefs: Record<string, string> = {
    "How it works": "#solution",
    "Pricing": "#pricing",
    "Trust & Security": "#trust",
  };

  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 mb-10 md:mb-12">
          <div className="col-span-2">
            <StashLogo />
            <p className="mt-4 text-sm text-foreground/55 leading-relaxed max-w-xs">
              A rewards copilot for Australians. Points, vouchers, cashback, offers — all working together.
            </p>
            <p className="mt-4 text-xs text-foreground/35">
              Stash does not provide financial advice. We provide factual information about loyalty programs, offers, and rewards.
            </p>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground/40 mb-4">{group}</p>
              <ul className="space-y-1.5 md:space-y-2.5">
                {items.map((item) => {
                  const href = anchorHrefs[item] || "#";
                  return (
                    <li key={item}>
                      <a href={href} className="text-sm text-foreground/60 hover:text-foreground transition-colors py-2 block">
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-foreground/35">
            © 2026 Stash. All rights reserved.
          </p>
          <p className="text-xs text-foreground/35">
            Sydney, Australia
          </p>
        </div>
      </div>
    </footer>
  );
}
