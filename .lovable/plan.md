
# Altar — A Minimalist Focus Ritual

A dark, cinematic web app where users "sacrifice" a distraction for a set time and complete a focus ritual at a glowing orb.
The experience is intentionally frontend-only with ephemeral in-memory state.

## Screens & Flow

### 1. Altar (Entry) — `/`
- Centered, vertically balanced layout. Deep black background (`#06070A`), faint vignette.
- Title "ALTAR" in tracked uppercase serif/mono accent at the top.
- One-line prompt: *"What do you sacrifice?"*
- Minimal text input — borderless, thin underline that glows cyan on focus.
- Three duration chips: **15 · 30 · 60** (minutes). Selected chip gets a soft cyan ring.
- Single CTA: **Begin Ritual** — ghost button with subtle purple glow on hover.

### 2. Focus State — `/focus`
- Pure black, immersive. No nav, no chrome.
- Centered glowing **orb** (radial gradient, cyan core → purple bleed) that breathes via Framer Motion (4s scale + opacity pulse loop).
- A thin **progress ring** draws around the orb as time elapses (no numerical countdown).
- Below the orb, in faded uppercase mono: *"Sacrificing [sacrifice_text]"*.
- Tiny "abandon" link in the bottom corner — confirms before exiting and resets the ritual.
- Page warns on tab close / back navigation.

### 3. Blessing — `/blessing`
- Soft fade-in. The orb dissolves into a still, brighter halo.
- Headline: *"The offering is accepted."*
- A randomly chosen **affirmation** from a curated set (10–15 lines, calm/poetic tone).
- Duration completed shown subtly underneath.
- Two actions: **Begin Another** · **Return to Altar**.
- Completing a ritual updates local in-memory completion state only.

## Aesthetic System
- **Palette:** background `#06070A`, surface `#0C0E12`, text `#E8E8EC`, muted `#6B6E78`, accent cyan `#7CE7FF`, accent purple `#B794F4`. All defined as semantic tokens in `index.css`.
- **Type:** Inter for UI, a mono (JetBrains Mono) for labels/numbers, tracked uppercase for headings.
- **Motion (Framer Motion):**
  - Orb: continuous breathing pulse (scale 1 → 1.06, opacity 0.85 → 1).
  - Page transitions: 600ms fade + slight blur for cinematic feel.
  - Buttons: subtle glow ring on hover, scale 0.98 on press.
- **Glows:** layered `box-shadow` + `filter: blur` for halo, never harsh.
- Mobile-first, single-column, generous whitespace.

## Tech
- TanStack Start routes: `index.tsx`, `focus.tsx`, `blessing.tsx`.
- Framer Motion for orb pulse, ring progress, and transitions.
- Affirmations stored as a static array in the codebase (no extra table needed).

Press **Implement plan** to build it.
