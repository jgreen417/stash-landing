# Stash — Design System

## Brand

| | |
|---|---|
| **Name** | Stash |
| **Tagline** | "Your rewards, finally working for you." |
| **Sub-tagline** | "Stop your points expiring." |
| **Personality** | Confident, clear, friendly expert — not corporate, not casual |
| **Market** | Australian consumers with credit card & loyalty program rewards |

### Logo
Treasure chest with three fanned credit cards peeking out the top + the wordmark "stash" in bold teal. The chest lid is a slightly lighter teal; the latch is gold. Rendered as an inline SVG in `Navbar.tsx` → `StashLogo`.

---

## Colour Palette

| Token | CSS Variable | HSL | Hex approx | Use |
|---|---|---|---|---|
| Background | `--background` | `hsl(40 33% 98%)` | `#FAFAF7` | Page background — warm off-white |
| Foreground | `--foreground` | `hsl(200 40% 15%)` | `#152329` | Primary text — deep navy |
| **Primary (Teal)** | `--primary` | `hsl(190 70% 25%)` | `#126075` | Brand colour, CTAs, icons, progress bar |
| **Secondary (Gold)** | `--secondary` | `hsl(45 80% 50%)` | `#E6A817` | Highlights, badges, latch, eyebrow labels |
| Border | `--border` | `hsl(40 20% 90%)` | `#EAE8E2` | Dividers, card outlines |
| Muted bg | `--muted` | `hsl(40 20% 92%)` | `#EDEAE4` | Subtle backgrounds |
| Muted text | `--muted-foreground` | `hsl(200 15% 45%)` | `#637480` | Secondary / helper text |
| Card | `--card` | `hsl(0 0% 100%)` | `#FFFFFF` | Card backgrounds |
| Destructive | `--destructive` | `hsl(0 84% 60%)` | `#F04040` | Errors only |

### Data / Chart colours
| Name | HSL |
|---|---|
| Teal (primary) | `hsl(190 70% 25%)` |
| Gold (secondary) | `hsl(45 80% 50%)` |
| Green (success/gain) | `hsl(160 60% 45%)` |
| Amber (warning/expiry) | `hsl(30 80% 65%)` |
| Rose (alert) | `hsl(340 75% 55%)` |

### Derived tints (used via opacity)
- `hsl(190 70% 25% / 0.08)` — icon container backgrounds
- `hsl(190 70% 25% / 0.04)` — section tinted backgrounds
- `hsl(45 80% 50% / 0.12)` — highlight badge backgrounds
- `hsl(45 80% 50% / 0.25)` — CTA pill on dark backgrounds

---

## Typography

**Font family:** Plus Jakarta Sans (Google Fonts)
```css
font-family: 'Plus Jakarta Sans', sans-serif;
```

| Role | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|
| Display / Hero H1 | `clamp(38px, 4.6vw, 60px)` | 800 | `-0.03em` | 1.08 |
| Section H2 | `40–48px` (responsive) | 700 | `-0.02em` (tight) | 1.15 |
| Card H3 | `18–20px` | 600 | normal | 1.3 |
| Body large | `17px` | 400 | normal | 1.65 |
| Body | `14–15px` | 400 | normal | 1.6 |
| Body small | `13px` | 400 | normal | 1.55 |
| Label / eyebrow | `11–12px` | 700 | `0.08–0.10em` | — |
| Caption / legal | `12px` | 400 | normal | 1.5 |

**Eyebrow pattern** (used above every section heading):
```tsx
<span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3 block">
  Section label
</span>
```

---

## Spacing & Layout

| Token | Value | Use |
|---|---|---|
| Max content width (hero) | `1152px` | Full hero layout |
| Max content width (sections) | `1024px` (max-w-5xl) | Section grids |
| Section vertical padding | `96px` (py-24) | Top & bottom of every section |
| Horizontal padding | `24px` (px-6) | Left & right gutter |
| Card gap | `16–20px` | Grid gap between cards |
| Card inner padding | `24–32px` | Padding inside cards |

### Border radius
| Token | Value | Use |
|---|---|---|
| Card standard | `16px` (rounded-2xl) | Problem, Feature, Trust cards |
| Card large | `20px` | Solution cards, phone UI elements |
| CTA block | `24px` (rounded-3xl) | FinalCTA container |
| Buttons | `999px` | All pill buttons |
| Icon container small | `12px` (rounded-xl) | 40×40 icon wrappers |
| Icon container large | `16px` (rounded-2xl) | 56×56 icon wrappers |
| Badges / pills | `999px` | Eyebrow labels, highlight tags |

---

## Shadows

| Use | Value |
|---|---|
| Card hover | `0 12px 32px rgba(0,0,0,0.08)` |
| Elevated card | `0 4px 16px rgba(0,0,0,0.06)` |
| Primary CTA button | `0 4px 20px hsl(190 70% 25% / 0.32)` |
| Phone mockup | `0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)` |
| Pricing highlight card | `shadow-xl shadow-primary/12` |
| Floating pills | `0 4px 20px rgba(0,0,0,0.10), 0 0 0 1px hsl(40 20% 90%)` |

---

## Animation Principles

All animation uses **Framer Motion**.

### Hero scroll storytelling
The Hero is a `280vh` sticky container. Scroll progress (`useScroll`) drives all motion values, piped through `useSpring` for natural inertia.

**Spring tiers:**
| Tier | Config | Applied to |
|---|---|---|
| Heavy | `{ stiffness: 55, damping: 18 }` | Phone float, floating pills Y |
| Medium | `{ stiffness: 80, damping: 20 }` | H1, wallet card slide, progress bar |
| Light | `{ stiffness: 110, damping: 24 }` | Badge, CTA, scene copy, pills X |

> Opacity values are **never** sprung — they stay as raw `useTransform` to prevent values going outside [0,1].

**Scene milestones** (scroll %):
| Range | Scene |
|---|---|
| 0–6% | Trust badges (initial state) |
| 6–42% | Scene 1: Woolworths / Amex Gold |
| 42–72% | Scene 2: Sydney Airport / Velocity |
| 72–100% | Scene 3: Hotel booking / Hilton |

### Section entrance animations
- **Trigger:** `useInView({ once: true, margin: "-80px" })`
- **Default entry:** `initial={{ opacity:0, y:24 }}` → `animate={{ opacity:1, y:0 }}`, ease `[0.22, 1, 0.36, 1]`, duration `0.65s`
- **Alternating x-slide:** even-index cards from `x: -28`, odd from `x: 28`
- **Icon pop:** `initial={{ scale:0.4, rotate:-12 }}` → spring `{ stiffness:260, damping:16 }`
- **Stagger:** `70–110ms` delay per item

### Hover interactions
- Cards: `whileHover={{ y: -4 }}`, spring `{ stiffness:300, damping:20 }`
- Buttons: `whileHover={{ scale: 1.02–1.04 }}`, `whileTap={{ scale: 0.96–0.98 }}`
- Highlighted pricing card hovers to `y: -14`

### Persistent animations (loop)
- Shield pulse (TrustSecurity): box-shadow ring, 2.4s ease-in-out
- Pricing glow ring: 2.8s ease-in-out
- FinalCTA glow orb: scale + opacity, 4s ease-in-out
- FinalCTA dot texture: opacity pulse, 3.5s ease-in-out

---

## Component Patterns

### Primary CTA button
```tsx
<a style={{
  padding: "13px 26px",
  borderRadius: "999px",
  background: "hsl(190,70%,25%)",
  color: "white",
  fontSize: "15px",
  fontWeight: 600,
  boxShadow: "0 4px 20px hsl(190 70% 25% / 0.32)",
}}>
  Get early access <ArrowRight size={15} />
</a>
```

### Secondary (ghost) button
```tsx
<a style={{
  padding: "13px 26px",
  borderRadius: "999px",
  border: "1px solid hsl(40 20% 88%)",
  background: "white",
  color: "hsl(200 40% 20%)",
  fontSize: "15px",
  fontWeight: 500,
}}>
  See how it works
</a>
```

### Standard card
```tsx
<div className="p-6 rounded-2xl border border-border bg-white hover:shadow-md hover:border-primary/20 transition-shadow" />
```

### Teal icon container (small)
```tsx
<div className="w-10 h-10 rounded-xl flex items-center justify-center"
  style={{ background: "hsl(190 70% 25% / 0.08)" }}>
  <Icon size={17} style={{ color: "hsl(190,70%,25%)" }} />
</div>
```

### Gold highlight badge
```tsx
<span className="text-xs font-semibold px-3 py-1 rounded-full"
  style={{ background: "hsl(45 80% 50% / 0.12)", color: "hsl(35,70%,35%)" }}>
  Tag text
</span>
```

### Section heading block
```tsx
<div className="text-center mb-16">
  <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3 block">
    Eyebrow
  </span>
  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
    Section heading
  </h2>
  <p className="text-lg text-foreground/60 max-w-xl mx-auto">
    Supporting subtext.
  </p>
</div>
```

---

## Voice & Tone

| Principle | Do | Don't |
|---|---|---|
| **Clear over clever** | "Know which card earns most at Coles" | "Leverage your rewards ecosystem" |
| **Specific not vague** | "18,400 Qantas points expiring in 14 days" | "Your points may be at risk" |
| **Empowering not alarming** | "Here's the opportunity" | "You've been losing money" |
| **Australian** | "optimise", Coles/Woolworths/Qantas/Velocity | US-centric references, "optimize" |
| **Not financial advice** | "Stash shows you factual information about your points" | "You should transfer your points to…" |

**Sentence structure:** Short. Active voice. No filler. End with the payoff.
> ❌ "Stash is an innovative platform that helps Australians manage their loyalty rewards."
> ✅ "Stop your points expiring."
