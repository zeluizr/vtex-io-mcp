# Draft: VTEX Marp Template

## Goal
Recreate the official VTEX PowerPoint presentation template as a Marp markdown theme.
Source files: `~/Code/VTEX-presentation-template/` (PDF + PPTX)

## Design Tokens (confirmed from PPTX extraction)

### Colors
- `#F71963` — Primary pink (VTEX brand, cover/chapter BG, accents)
- `#142032` — Navy dark (body text, dark slides)
- `#5E6E82` — Body grey (secondary text)
- `#F5F9FF` — Light blue-grey BG (most content slides)
- `#E3ECFF` — Blue accent (card backgrounds)
- `#162035` — Deep navy (statement slides)
- `#E8ECF2` — Pale grey (thanks slide divider area)
- `#595959` — Mid grey (stat subtitles)
- `#FFFFFF` — White (text on dark/pink backgrounds)

### Typography
- **Heading font:** `Helvetica Neue Light`
- **Body font:** `Helvetica Neue`
- Font sizes extracted (in pts):
  - Cover title: ~121.5pt (sz=12150 / 100)
  - Chapter title: ~160pt / 200pt
  - Sub-chapter title: ~100pt / 140pt
  - Section label: ~26–40pt
  - Body text: ~12–24pt
  - Big stat numbers: ~100pt
  - Quote/statement: ~70–81pt
  - Footer text: ~10pt

### Slide Dimensions
- **20" × 11.25"** → 16:9 aspect ratio
- 1920 × 1080px at 96dpi

### Assets (extracted to ~/Code/vtex-marp-template/assets/images/)
- `vtex-logo.png` (305×109px RGBA) — appears on every slide, bottom-left
- `bg-hex-cover.png` (2048×2048 RGBA) — 3D pink cube art (cover slide)
- `bg-hex-pink.png` (2048×2048 RGBA) — pink cube art variant
- `bg-hex-dark.png` (2000×2000 RGB) — darker cube art
- `bg-hex-alt.png` (2048×2048 RGBA) — alt cube art

## Slide Layouts Identified (15 distinct types)

| # | Name | BG color | Key elements |
|---|------|----------|--------------|
| 1 | Cover | `#F71963` | Huge white title, 3D art right half, logo + tagline bottom-left |
| 3 | Chapter | `#F5F9FF` | "Chapter" label (navy) + big pink title + 3D art right + section # top-right |
| 4 | Sub-chapter | `#F5F9FF` | Floating rounded card with 3D art, section # bottom-right |
| 6 | Speaker intro | `#F5F9FF` | Left: photo+name+title; Right: 3D art |
| 9,11 | Content + image | `#F5F9FF` | Title top, body text, image panel |
| 10 | Quote (image left) | gradient/light | Left: vertical image; Right: large quote |
| 12,13 | Two-column numbered | white/light | Big 01/02 numbers + content blocks |
| 14–16 | Big stats | `#F5F9FF` | Giant number/% + supporting text |
| 27 | Dark statement | dark | Giant centered quote, light text |
| 32–34 | Highlight phrase | `#F5F9FF` | Large centered pull quote |
| 39 | Pink accent quote | white | Pink `#F71963` accent text + navy |
| 43 | Typed info/card | `#E3ECFF` | Blue card layout |
| 44 | Thanks/End | gradient light | Full-bleed pink rounded rect + "Thanks!" |

## Decisions (confirmed)
- [x] **Scope**: ALL layouts + a full 45-slide presentation pixel-perfect to official template
- [x] **3D art**: CSS `background-image` via theme CSS on layout classes
- [x] **Font**: Bundle Helvetica Neue via `@font-face` (extract from macOS system fonts)
- [x] **Tooling**: `package.json` + `@marp-team/marp-cli`
- [x] **Verification**: Side-by-side screenshots vs original rendered slides

## Known Constraints
- **Helvetica Neue @font-face**: Files live at `/System/Library/Fonts/HelveticaNeue.ttc` on macOS — need to copy + reference. Licensing applies to redistribution.
- **Chart/data slides** (slides 17, 31): These have bar charts and dashboards — Marp has no native chart support. Approach: approximate with CSS tables/divs or use screenshot of the original as a placeholder image with a note in the markdown.
- **Duplicate layout variants**: Several slides are slight variations of the same layout (e.g. 14/15/16 are all "big stats", 20/21/22 all "content+image dark"). These need distinct CSS modifier classes.
- **Rounded card** (Sub-chapter slide 4): Uses a large rounded-corner white card overlaid on the BG — achievable with CSS `border-radius` on a pseudo-element.

## Scope Boundaries
- IN: Marp theme CSS + example .md with all slide types
- OUT: charts/data visualization slide recreations (too complex for Marp), animation

## Technical Decisions
- Marp uses `<!-- _class: classname -->` directives for per-slide layout switching
- CSS custom properties for design tokens
- Each layout = a named CSS class on the `section` element
