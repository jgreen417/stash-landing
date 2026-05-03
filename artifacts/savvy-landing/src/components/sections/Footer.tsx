import { SavvyLogo } from "./Navbar";

export function Footer() {
  const links = {
    Product: ["Features", "Pricing", "Security", "How it works"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <SavvyLogo />
            <p className="mt-4 text-sm text-foreground/55 leading-relaxed max-w-xs">
              A points and card companion for Australians. Track, optimise, and protect your rewards — automatically.
            </p>
            <p className="mt-4 text-xs text-foreground/35">
              Savvy does not provide financial advice. We provide factual information about points and loyalty programs.
            </p>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground/40 mb-4">{group}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-foreground/35">
            2025 Savvy. All rights reserved. ABN 00 000 000 000.
          </p>
          <p className="text-xs text-foreground/35">
            Sydney, Australia
          </p>
        </div>
      </div>
    </footer>
  );
}
