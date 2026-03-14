# VTEX Marp Template

A fully editable **Marp** presentation theme that faithfully recreates the official VTEX Presentation Template 2024. Write slides in plain Markdown — no PowerPoint required.

---

## Previews

<table>
  <tr>
    <td><img src="docs/previews/slide_01.png" alt="Cover slide" /></td>
    <td><img src="docs/previews/slide_03.png" alt="Chapter slide" /></td>
    <td><img src="docs/previews/slide_06.png" alt="Speaker slide" /></td>
  </tr>
  <tr>
    <td align="center">Cover</td>
    <td align="center">Chapter</td>
    <td align="center">Speaker</td>
  </tr>
  <tr>
    <td><img src="docs/previews/slide_12.png" alt="Two-col numbered list" /></td>
    <td><img src="docs/previews/slide_23.png" alt="Timeline slide" /></td>
    <td><img src="docs/previews/slide_35.png" alt="Sectioned cards" /></td>
  </tr>
  <tr>
    <td align="center">Two-col numbered list</td>
    <td align="center">Timeline</td>
    <td align="center">Sectioned cards</td>
  </tr>
  <tr>
    <td><img src="docs/previews/slide_39.png" alt="Quote / statement" /></td>
    <td><img src="docs/previews/slide_44.png" alt="Thanks slide" /></td>
    <td><img src="docs/previews/slide_45.png" alt="Cover end" /></td>
  </tr>
  <tr>
    <td align="center">Quote / statement</td>
    <td align="center">Thanks</td>
    <td align="center">Cover end</td>
  </tr>
</table>

---

## Getting started

**Requirements:** Node.js ≥ 18, [Marp CLI](https://github.com/marp-team/marp-cli)

```bash
git clone https://github.com/vtexdocs/vtex-marp-template
cd vtex-marp-template
npm install
```

### Build HTML

```bash
npm run build
# → dist/vtex-template.html
```

### Export PDF

```bash
npm run export-pdf
# → dist/vtex-template.pdf
```

### Live preview while editing

```bash
npm run watch
# opens a browser that hot-reloads on save
```

> **Fonts:** Helvetica Neue woff2 files must be placed in `assets/fonts/` — they are not committed to the repo for licensing reasons. Any sans-serif will fall back gracefully.

---

## Usage

Edit `slides/vtex-template.md`. Each slide starts with `---` and declares its layout via an HTML comment:

```markdown
---

<!-- _class: cover -->

# Your presentation title<br>goes here

---

<!-- _class: chapter -->

## Chapter

# Section title

Optional subtitle text

<span class="section-number">01</span>
```

The `footer:` directive in the frontmatter controls the tagline that appears at the bottom of every slide:

```yaml
---
marp: true
theme: vtex
size: 16:9
html: true
footer: 'The Composable and Complete Commerce Platform'
---
```

---

## Layout classes

| Class | Description |
|---|---|
| `cover` | Full-bleed pink opening slide |
| `cover-end` | Closing slide with centered logo + tagline |
| `chapter` | Section divider with large number |
| `subchapter` | Sub-section divider with white rounded card |
| `speaker` | Speaker intro with photo; supports `.team-grid` for multi-person grids |
| `content-light` | Light background, image right |
| `content-dark` | White background, image right |
| `dark-content` | Dark navy background, image right |
| `content-mockup` | Light background optimised for tall/scrolling screenshots |
| `quote-image` | Image left, large quote right |
| `quote-pink` | Full-width typographic statement with pink highlights |
| `statement-dark` | Large statement with optional decorative image |
| `statement-pink` | Centred text on a full-bleed pink card |
| `two-col` | Dark bg, 4-column numbered layout |
| `two-col-2` | Dark bg, 2-column numbered layout |
| `stats` | Big numbers with optional side image |
| `timeline` | Horizontal timeline with 4 milestones |
| `highlight` | Large quote, image right |
| `highlight-left` | Large quote, image left |
| `highlight-left-dark` | Same but dark background |
| `highlight-card` | Pastel gradient card, centred text |
| `highlight-card-dark` | Same but dark background |
| `sectioned` | Coloured header cards (`.pink-card`, `.blue-card`, `.purple-card`, `.white-card`) |
| `card` | White container card with pink content area |
| `results` | Full-bleed chart / screenshot |
| `icons` | Icon showcase grid |
| `thanks` | Closing "Thanks!" slide |
| `no-footer` | Hides logo + tagline |

---

## Project structure

```
vtex-marp-template/
├── slides/
│   └── vtex-template.md      # The full 45-slide example deck
├── theme/
│   └── vtex.css              # Marp theme — all layout classes
├── assets/
│   ├── fonts/                # Helvetica Neue (not committed — add your own)
│   └── images/               # Logos, decorative art, mockups, avatars
├── scripts/
│   └── screenshot_and_compare.py   # Visual QA pipeline (see below)
├── dist/                     # Built HTML / PDF output (gitignored)
└── slide-previews/           # Generated PNGs for comparison (gitignored)
    ├── marp/
    ├── reference/
    └── comparison/
```

---

## Visual review loop

This project was built and iteratively refined using a pixel-comparison workflow. Here's how it works:

### 1. Export Marp slides as PNGs

```bash
python3 scripts/screenshot_and_compare.py
```

The script runs `marp --images png` on the slide deck and renames the outputs to `slide_01.png … slide_45.png`.

### 2. Generate side-by-side comparisons

The same script then composites each Marp render next to the original PowerPoint reference export — adding labelled borders so the two versions are instantly identifiable:

- 🔵 **Blue border** = Reference (original PPTX export)
- 🟢 **Green border** = Marp render

| Example comparison — Slide 01 (Cover) |
|---|
| ![Comparison slide 01](docs/previews/comparison_01.png) |

| Example comparison — Slide 23 (Timeline) |
|---|
| ![Comparison slide 23](docs/previews/comparison_23.png) |

### 3. Review every slide

Each comparison image is reviewed with a vision model that lists every visual difference — background colors, font sizes, layout mismatches, missing elements. Issues are catalogued per slide.

### 4. Fix & repeat

CSS and Markdown are updated to address the reported differences, then the entire pipeline reruns. The loop continues until the vision model can no longer identify meaningful differences between reference and render.

This approach catches regressions automatically and ensures no slide is silently broken by a CSS change.

---

## Credits

Original design: VTEX Design System team  
Marp implementation: [brunoamui](https://github.com/brunoamui) + Sisyphus AI
