# Plan: Card Grid Convergence Fix

## The Problem

Three sections on the landing page (Solution, Features, Differentiators) use nearly identical card patterns — white card, teal-tinted icon container, icon, title, body, gold highlight badge. They bleed together. Per design-for-ai Ch 6 (Composition) and ai-tells.md, this is the page's biggest AI convergence signal.

## Current State

| Section | Layout | Icon Treatment | Badge | Hover |
|---------|--------|---------------|-------|-------|
| Problem | 2-col cards on teal-tint bg | White bg container | None | y:-4, shadow |
| Solution | 3-col cards on white bg | Teal-tint container | Gold badge | y:-4, shadow |
| Features | 2-col horizontal cards on white bg | Teal-tint container | Gold badge | y:-5, shadow |
| Differentiators | 3-col cards on white bg | Teal-tint container | None | y:-5, shadow |

Problem is already distinct (teal-tinted background, no badges). The other three blur together.

## Target State

Each section should be immediately identifiable by layout alone, even without reading the content:

### 1. Solution ("How Stash works") — Hero + Grid

**Rationale:** This is the most important section — it explains the product. It deserves dominance.

**Changes:**
- First item ("Savvy AI") → full-width hero card
  - Larger icon (h-14 instead of h-10)
  - Extended body (add "Ask it about any program, card, or perk")
  - Subtle gradient background on the card (teal-to-cream)
  - Sits above the remaining 5 items on its own row
- Remaining 5 items: 2-col layout on md+, 3-col on lg
- Icon backgrounds → gold tint (hsl 45 80% 50% / 0.12) instead of teal — visually separates this section from Problem and Differentiators
- Remove gold highlight badges from all cards — they're overused across sections
- Instead, add a subtle "→" arrow at the bottom-right of each card as an implicit affordance

**Layout:**
```
┌─────────────────────────────────────┐
│          Savvy AI (full-width)      │
│  [bot icon] Title + extended body   │
│                                     │
├─────────┬─────────┬─────────────────┤
│ Card 2  │  Card 3 │    Card 4       │
├─────────┼─────────┼─────────────────┤
│ Card 5  │  Card 6 │                 │
└─────────┴─────────┴─────────────────┘
```

### 2. Features ("Core features") — Keep + Polish

**Rationale:** Already distinct from the others (horizontal icon+text, staggered L/R animation). Needs minor differentiation, not a rebuild.

**Changes:**
- Keep the 2-col horizontal layout and L/R stagger
- Remove gold badges from all features except the first 2 — creates hierarchy within the section
- The first feature ("All programs, one place") gets a slightly larger icon (h-12 instead of h-10) and a subtle left border accent
- Add a thin connector line between related feature pairs (Pair 1: Dashboard + Alerts, Pair 2: Redemption + Proactive, Pair 3: Travel + Welcome Bonus, Pair 4: Comparison + Goals)
- Keep the staggered entrance animation — it's good

### 3. Differentiators ("What makes Stash different") — List Layout

**Rationale:** This is the "why choose us" section — should feel different from "what we do" (Solution) and "what we have" (Features).

**Changes:**
- Switch from cards to a bordered list pattern
- Each item has a 3px accent left border in teal, no card background or border
- Larger bare icons (no container — just the icon sitting directly on the background)
- No hover card effects — use a smooth background tint change instead
- Each body text gets a 1-line impact result underneath (e.g., "Knows your cards, spend, goals" — but make this a persistent sub-line, not a badge)
- 2-col on md+, 3-col on lg: same column structure, different visual treatment

**Before/After:**
```
BEFORE (card):
┌─────────────────────────┐
│ [icon]  Savvy AI        │
│         body text...    │
│         [badge]         │
└─────────────────────────┘

AFTER (list):
│[icon] Savvy AI
│       body text...
│       Knows your cards, spend, goals
│
│[icon] Your rewards gap, in dollars
│       body text...
│       See your missed value in hard numbers
```

## Implementation Order

1. **Solution.tsx** — redesign first item as full-width hero, change icon bg to gold tint, remove badges, add arrow affordance
2. **Differentiators.tsx** — switch to bordered list layout, remove card containers, add impact sub-lines
3. **Features.tsx** — Polish: reduce badges to first 2 items, enlarge first icon, add connector lines

## Files to Modify

- `/artifacts/savvy-landing/src/components/sections/Solution.tsx`
- `/artifacts/savvy-landing/src/components/sections/Features.tsx`
- `/artifacts/savvy-landing/src/components/sections/Differentiators.tsx`

## Effort Estimate

- Solution redesign: ~45 min (restructuring the grid, first-card hero treatment)
- Differentiators restyle: ~30 min (new layout pattern, removing card wrappers)
- Features polish: ~20 min (badge reduction, first-item enlargement, connector lines)
- **Total: ~1.5 hrs**

## Verification

- Mobile: check all grids collapse to single column cleanly
- Squint test: each section should be visually distinct when blurred
- No regressions on hover states, entrance animations, or responsive breakpoints
