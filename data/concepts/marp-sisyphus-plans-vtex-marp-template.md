# VTEX Marp Template

## TL;DR

> **Quick Summary**: Build a pixel-perfect Marp recreation of VTEX's official 45-slide PowerPoint template — producing a reusable CSS theme file and a complete example presentation that visually matches the original slide-by-slide.
>
> **Deliverables**:
> - `theme/vtex.css` — Marp theme with all layout classes
> - `slides/vtex-template.md` — 45-slide example presentation
> - `assets/fonts/` — Helvetica Neue woff2 files extracted from macOS
> - `assets/images/` — logo + background art PNGs
> - `package.json` — marp-cli build/watch/export scripts
> - `slide-previews/` — side-by-side verification screenshots
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 4 waves
> **Critical Path**: T1 (setup) → T2 (fonts) → T3 (design tokens + base CSS) → T4–T11 (layout classes) → T12 (45-slide deck) → T13 (verification)

---

## Context

### Original Request
Recreate VTEX's official PowerPoint presentation template as a Marp markdown theme, producing both a reusable CSS theme and a full pixel-perfect 45-slide example presentation.

### Interview Summary
**Key Discussions**:
- Source: `~/Code/VTEX-presentation-template/` (Official Template VTEX.pdf + .pptx)
- Scope: ALL 15 layout types + complete 45-slide deck pixel-perfect to original
- 3D art: CSS `background-image` via theme CSS on layout class selectors
- Font: Helvetica Neue bundled via `@font-face` (extracted from macOS system .ttc)
- Tooling: `package.json` + `@marp-team/marp-cli`
- Verification: side-by-side PNG screenshots vs original rendered slides

**Research Findings**:
- Slide dimensions: 20" × 11.25" → 16:9, use Marp `size: 16:9`
- Colors: #F71963 (pink), #142032 (navy), #5E6E82 (grey), #F5F9FF (light bg), #E3ECFF (blue), #162035 (deep navy)
- Fonts: Helvetica Neue Light (headings), Helvetica Neue Regular (body) — macOS `.ttc` at `/System/Library/Fonts/HelveticaNeue.ttc`
- All 45 slides analyzed: backgrounds, font sizes, text content, image positions mapped
- Background art assets already extracted to `assets/images/`

---

## Work Objectives

### Core Objective
Produce a Marp CSS theme + 45-slide example deck that are visually indistinguishable from the official VTEX PowerPoint template.

### Concrete Deliverables
- `theme/vtex.css` — complete Marp theme
- `slides/vtex-template.md` — 45 slides using `<!-- _class: -->` directives
- `assets/fonts/helvetica-neue-light.woff2` + `helvetica-neue.woff2`
- `assets/images/vtex-logo.png` + 4 background art PNGs (already in place)
- `package.json` with `build`, `watch`, `export-pdf`, `export-html` scripts
- `slide-previews/comparison/` — side-by-side PNGs (Marp output vs original)

### Definition of Done
- [ ] `npm run build` exits 0 and produces `dist/vtex-template.pdf` and `dist/vtex-template.html`
- [ ] All 45 slides render without errors
- [ ] Side-by-side comparison shows visual match for all 15 layout types
- [ ] Font renders as Helvetica Neue (confirmed via screenshot inspection)

### Must Have
- All 15 layout types as named CSS classes
- VTEX logo bottom-left + tagline bottom-right on every slide (via CSS `section::after`)
- Correct background colors per layout
- Background art right-half positioned correctly on cover, chapter, sub-chapter, speaker intro
- Correct font sizes matching original (within ±2pt tolerance)
- Pink `#F71963` accent where original uses it

### Must NOT Have (Guardrails)
- NO chart/data visualization recreation in CSS (slides 17, 31 → embed screenshot images)
- NO animations or Marp transitions (not in original, out of scope)
- NO redistribution of Helvetica Neue font files in git (add `assets/fonts/*.woff2` to `.gitignore`)
- NO modifying the original source files in `~/Code/VTEX-presentation-template/`
- NO inventing new slide layouts not present in the original 45 slides
- NO scope inflation: do not add extra utility classes beyond what the 45 slides need

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None (visual/screenshot comparison only)
- **Framework**: N/A

### QA Policy
Every task includes agent-executed QA scenarios using Playwright (screenshot) and Bash (build commands).
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Build verification**: Bash — `npm run build`, assert exit 0, assert output files exist
- **Visual verification**: Playwright — open rendered HTML, screenshot each slide, compare against reference PNG from original PDF
- **Font verification**: Playwright — screenshot a text element, assert font renders as Helvetica Neue (visually check rendered glyph)

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — can all start immediately):
├── Task 1: Project scaffolding (package.json, .gitignore, dir structure) [quick]
├── Task 2: Font extraction (HelveticaNeue.ttc → woff2 files) [quick]
└── Task 3: Reference slide renders (render all 45 original PDF pages as PNGs) [quick]

Wave 2 (Theme core — after Wave 1):
├── Task 4: CSS design tokens + base section styles [quick]
├── Task 5: Global footer (logo + tagline on every slide via ::after) [quick]
└── Task 6: @font-face declarations + typography scale [quick]

Wave 3 (Layout classes — after Wave 2, MAX PARALLEL):
├── Task 7:  Cover layout class [visual-engineering]
├── Task 8:  Chapter layout class [visual-engineering]
├── Task 9:  Sub-chapter layout class (rounded card) [visual-engineering]
├── Task 10: Speaker intro layout class [visual-engineering]
├── Task 11: Content + image layout classes (light + dark variants) [visual-engineering]
├── Task 12: Quote layouts (image-left, statement dark, highlight phrase, pink accent) [visual-engineering]
├── Task 13: Big stats layout class (number variants) [visual-engineering]
├── Task 14: Two-column numbered layout class [visual-engineering]
├── Task 15: Card / typed-info layout class [visual-engineering]
└── Task 16: Thanks / end slide layout class [visual-engineering]

Wave 4 (Deck + verification — after Wave 3):
├── Task 17: 45-slide example deck (vtex-template.md) [unspecified-high]
└── Task 18: Side-by-side verification screenshots [unspecified-high]
```

### Dependency Matrix
- **T4, T5, T6**: depend on T1, T2 (need project + fonts)
- **T7–T16**: depend on T4, T5, T6 (need base CSS + tokens)
- **T3**: depends on T1 only (just needs output dir)
- **T17**: depends on T7–T16 (needs all layout classes defined)
- **T18**: depends on T3 + T17 (needs reference PNGs + built deck)

### Agent Dispatch Summary
- **Wave 1**: T1 → `quick`, T2 → `quick`, T3 → `quick`
- **Wave 2**: T4 → `quick`, T5 → `quick`, T6 → `quick`
- **Wave 3**: T7–T16 → `visual-engineering` (10 parallel)
- **Wave 4**: T17 → `unspecified-high`, T18 → `unspecified-high`

---

## TODOs

- [x] 1. Project scaffolding

  **What to do**:
  - Create `package.json` with `@marp-team/marp-cli` as dev dependency
  - Add scripts: `"build": "marp slides/vtex-template.md --theme theme/vtex.css --output dist/"`, `"watch": "marp --watch slides/vtex-template.md --theme theme/vtex.css", "export-pdf": "marp slides/vtex-template.md --theme theme/vtex.css --pdf --output dist/vtex-template.pdf"`, `"export-html": "marp slides/vtex-template.md --theme theme/vtex.css --output dist/vtex-template.html"`
  - Create `.gitignore`: `node_modules/`, `dist/`, `assets/fonts/*.woff2`, `assets/fonts/*.ttf`
  - Create empty placeholder files: `theme/vtex.css`, `slides/vtex-template.md`
  - Create `dist/` directory
  - Run `npm install` to confirm marp-cli installs cleanly

  **Must NOT do**:
  - Do not write any CSS or markdown content yet — just scaffolding
  - Do not add any fonts to git tracking

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 4, 5, 6
  - **Blocked By**: None

  **References**:
  - `~/Code/vtex-marp-template/` — project root (already created)
  - Marp CLI docs: https://github.com/marp-team/marp-cli#usage — `--theme`, `--output`, `--pdf` flags
  - Existing project for package.json pattern: `~/Code/vtexdocs-mcp-app/package.json`

  **Acceptance Criteria**:
  - [ ] `package.json` exists with all 4 scripts
  - [ ] `npm install` exits 0
  - [ ] `npx marp --version` prints a version number

  **QA Scenarios**:
  ```
  Scenario: npm install succeeds
    Tool: Bash
    Steps:
      1. cd ~/Code/vtex-marp-template && npm install
    Expected Result: exit 0, node_modules/@marp-team/marp-cli exists
    Evidence: .sisyphus/evidence/task-1-npm-install.txt

  Scenario: marp CLI is callable
    Tool: Bash
    Steps:
      1. cd ~/Code/vtex-marp-template && npx marp --version
    Expected Result: prints version like "3.x.x"
    Evidence: .sisyphus/evidence/task-1-marp-version.txt
  ```

  **Commit**: YES (group 1)
  - Message: `chore: scaffold vtex-marp-template project`
  - Files: `package.json`, `.gitignore`, `theme/vtex.css`, `slides/vtex-template.md`

- [x] 2. Font extraction (Helvetica Neue → woff2)

  **What to do**:
  - Locate Helvetica Neue on macOS: check `/System/Library/Fonts/HelveticaNeue.ttc` and `/Library/Fonts/`
  - Use `fonttools` (pip install fonttools) to extract individual TTF faces from the .ttc collection: Light (weight 300) and Regular (weight 400)
  - Convert extracted TTFs to woff2 using `fonttools` with brotli: `python3 -c "from fontTools.ttLib import TTFont; ..."`
  - Save as `assets/fonts/HelveticaNeue-Light.woff2` and `assets/fonts/HelveticaNeue.woff2`
  - Verify each file is a valid woff2 by checking file magic bytes

  **Must NOT do**:
  - Do not commit font files to git (they're in .gitignore)
  - Do not use any font other than Helvetica Neue
  - Do not rename the font family — keep it as "Helvetica Neue" in CSS

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Task 6 (@font-face declarations)
  - **Blocked By**: None

  **References**:
  - `/System/Library/Fonts/HelveticaNeue.ttc` — source font collection on macOS
  - fonttools docs: https://fonttools.readthedocs.io/en/latest/ttLib/index.html
  - Python script pattern: `TTFont("file.ttc", fontNumber=0)` to access specific face

  **Acceptance Criteria**:
  - [ ] `assets/fonts/HelveticaNeue-Light.woff2` exists and is >10KB
  - [ ] `assets/fonts/HelveticaNeue.woff2` exists and is >10KB
  - [ ] Both files start with woff2 magic bytes (`wOF2`)

  **QA Scenarios**:
  ```
  Scenario: woff2 files exist and are valid
    Tool: Bash
    Steps:
      1. ls -lh ~/Code/vtex-marp-template/assets/fonts/
      2. xxd ~/Code/vtex-marp-template/assets/fonts/HelveticaNeue-Light.woff2 | head -1
    Expected Result: two .woff2 files >10KB each; magic bytes show "7746 4f46 3200"
    Evidence: .sisyphus/evidence/task-2-font-files.txt
  ```

  **Commit**: YES (group 1)
  - Message: `chore: extract Helvetica Neue woff2 fonts (gitignored)`
  - Pre-commit: fonts must not be staged if .gitignore is correct

- [x] 3. Render all 45 original PDF slides as reference PNGs

  **What to do**:
  - Use PyMuPDF (already installed: `import fitz`) to render all 45 pages of `~/Code/VTEX-presentation-template/Official Template VTEX.pdf` at 2× resolution (2880×1620px)
  - Save to `slide-previews/reference/slide_01.png` through `slide_45.png`
  - Note: slides 13–45 may already exist from earlier session — check first, skip if present
  - Generate a simple HTML gallery page `slide-previews/index.html` that shows all 45 thumbnails for easy comparison

  **Must NOT do**:
  - Do not modify the source PDF
  - Do not use lower than 2× resolution (need pixel-accurate reference)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 18 (verification screenshots)
  - **Blocked By**: None

  **References**:
  - `~/Code/VTEX-presentation-template/Official Template VTEX.pdf` — source
  - `~/Code/VTEX-presentation-template/slide-previews/` — slides 1–12 already rendered here; check before re-rendering
  - PyMuPDF pattern: `fitz.open(path); page.get_pixmap(matrix=fitz.Matrix(2,2))`

  **Acceptance Criteria**:
  - [ ] `slide-previews/reference/` contains exactly 45 PNG files
  - [ ] Each file is 2880×1620px
  - [ ] `slide-previews/index.html` opens and shows all 45 thumbnails

  **QA Scenarios**:
  ```
  Scenario: all 45 reference slides rendered
    Tool: Bash
    Steps:
      1. ls ~/Code/vtex-marp-template/slide-previews/reference/ | wc -l
      2. python3 -c "from PIL import Image; img=Image.open('slide-previews/reference/slide_01.png'); assert img.size==(2880,1620)"
    Expected Result: 45 files, correct dimensions
    Evidence: .sisyphus/evidence/task-3-reference-slides.txt
  ```

  **Commit**: NO (generated artifacts, not source)

- [x] 4. CSS design tokens and base section styles

  **What to do**:
  - In `theme/vtex.css`, add Marp theme metadata comment: `/* @theme vtex */`
  - Define CSS custom properties (design tokens) on `:root`:
    - `--color-pink: #F71963`
    - `--color-navy: #142032`
    - `--color-grey: #5E6E82`
    - `--color-light-bg: #F5F9FF`
    - `--color-blue-accent: #E3ECFF`
    - `--color-deep-navy: #162035`
    - `--color-mid-grey: #595959`
    - `--color-pink-light: #FFC4DD`
    - `--color-white: #FFFFFF`
  - Set base `section` styles: `width: 1280px; height: 720px; padding: 60px 80px; font-family: "Helvetica Neue", sans-serif; background: var(--color-light-bg); color: var(--color-navy); box-sizing: border-box; overflow: hidden; position: relative;`
  - Set base heading styles: `h1`, `h2`, `h3` with Helvetica Neue Light, navy color, appropriate margin/line-height

  **Must NOT do**:
  - Do not add any layout-specific classes yet (those are Tasks 7–16)
  - Do not add `@font-face` here (that's Task 6)
  - Do not add the footer/logo yet (that's Task 5)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6)
  - **Blocks**: Tasks 7–16
  - **Blocked By**: Task 1

  **References**:
  - Draft file: `~/Code/vtex-marp-template/.sisyphus/drafts/vtex-marp-template.md` — full color list
  - Marp CSS docs: https://marpit.marp.app/theme-css — how `section` is the slide root, custom properties, size
  - Existing Marp theme examples for structure reference: https://github.com/marp-team/marp-core/tree/main/themes

  **Acceptance Criteria**:
  - [ ] `theme/vtex.css` contains `/* @theme vtex */` at top
  - [ ] All 9 CSS custom properties defined on `:root`
  - [ ] `section` base style sets correct dimensions (1280×720)

  **QA Scenarios**:
  ```
  Scenario: theme file is valid CSS with tokens
    Tool: Bash
    Steps:
      1. grep -c "var(--color" theme/vtex.css
      2. grep "@theme vtex" theme/vtex.css
    Expected Result: at least 9 token usages; theme name present
    Evidence: .sisyphus/evidence/task-4-css-tokens.txt
  ```

  **Commit**: YES (group 2)
  - Message: `feat(theme): add design tokens and base section styles`

- [x] 5. Global footer (logo + tagline on every slide)

  **What to do**:
  - In `theme/vtex.css`, add a `section::after` pseudo-element that renders on every slide:
    - VTEX logo at bottom-left: use `background-image: url('../assets/images/vtex-logo.png')`, positioned at approximately `left: 60px; bottom: 28px`, width ~80px
    - Tagline text "The Composable and Complete Commerce Platform" at bottom-right: `position: absolute; right: 60px; bottom: 32px; font-size: 10pt; color: var(--color-grey);`
  - Since CSS `::after` can't have two separate pieces of content (logo img + text), use TWO pseudo-elements: `section::before` for logo image, `section::after` for tagline text
  - For the cover slide (pink bg), the logo and text need to be white — handle via `.cover section::before` and `.cover section::after` overrides with `filter: brightness(0) invert(1)` for logo
  - Add `section.no-footer::before, section.no-footer::after { display: none; }` for slides that don't show it (slide 45 is blank)

  **Must NOT do**:
  - Do not use Marp's `header:` / `footer:` frontmatter directives — they add visible HTML elements that authors must manually control per slide; CSS pseudo-elements are cleaner
  - Do not show the footer on slide 45 (blank slide)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 6)
  - **Blocks**: Tasks 7–16 (footer positioning affects layout)
  - **Blocked By**: Task 1 (needs project structure), Task 2 (needs logo in assets/)

  **References**:
  - `assets/images/vtex-logo.png` (305×109px RGBA) — pink/dark logo, needs color inversion on pink BG slides
  - Slide 1 (cover): logo is white; Slide 3+ (light bg): logo is pink `#F71963`
  - Reference PNG: `slide-previews/reference/slide_01.png` — measure exact pixel position of logo and tagline
  - Marp pseudo-element CSS pattern: `section::after { content: ""; position: absolute; ... }`

  **Acceptance Criteria**:
  - [ ] VTEX logo appears bottom-left on a test slide
  - [ ] Tagline text appears bottom-right on a test slide
  - [ ] Logo appears white on pink-background slides

  **QA Scenarios**:
  ```
  Scenario: footer renders on content slide
    Tool: Playwright
    Steps:
      1. Open dist/vtex-template.html in browser
      2. Navigate to slide 3 (chapter slide, light bg)
      3. Screenshot bottom strip (y: 680-720)
      4. Assert VTEX logo visible bottom-left and tagline text bottom-right
    Expected Result: logo and tagline both visible
    Evidence: .sisyphus/evidence/task-5-footer-content-slide.png

  Scenario: logo is white on pink cover slide
    Tool: Playwright
    Steps:
      1. Open dist/vtex-template.html, navigate to slide 1
      2. Screenshot bottom-left corner (x:0-200, y:680-720)
      3. Assert logo pixels are white (not pink/dark)
    Expected Result: white logo on pink background
    Evidence: .sisyphus/evidence/task-5-footer-cover-slide.png
  ```

  **Commit**: YES (group 2)
  - Message: `feat(theme): add global footer with logo and tagline`

- [x] 6. @font-face declarations + typography scale

  **What to do**:
  - In `theme/vtex.css`, add `@font-face` blocks for both Helvetica Neue weights:
    ```css
    @font-face {
      font-family: "Helvetica Neue";
      font-weight: 300;
      src: url('../assets/fonts/HelveticaNeue-Light.woff2') format('woff2');
    }
    @font-face {
      font-family: "Helvetica Neue";
      font-weight: 400;
      src: url('../assets/fonts/HelveticaNeue.woff2') format('woff2');
    }
    ```
  - Update `section` base font to use weight 300 (Light is the default in VTEX template)
  - Define typography scale CSS classes matching extracted PPTX sizes:
    - `.text-cover-title`: 121.5pt (cover title)
    - `.text-chapter`: 160pt (chapter title in pink)
    - `.text-chapter-label`: 40pt (the "Chapter" label above)
    - `.text-section-number`: 160-200pt (the "01" top-right on chapter slides)
    - `.text-subchapter`: 100-140pt (sub-chapter title)
    - `.text-body`: 18-24pt (standard body)
    - `.text-small`: 12pt (captions, footers)
    - `.text-stat`: 100pt (big number slides)
    - `.text-quote`: 70-81pt (statement/quote slides)
  - Note: in Marp, font sizes are set via CSS on `h1`, `h2`, `p` within each layout class — the scale classes above are helpers

  **Must NOT do**:
  - Do not hard-code font sizes on the base `h1`/`h2`/`p` without layout context — sizes vary drastically by layout
  - Do not add fallback fonts to `@font-face` src list — the woff2 files must be present

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5)
  - **Blocks**: Tasks 7–16
  - **Blocked By**: Tasks 1, 2

  **References**:
  - `assets/fonts/HelveticaNeue-Light.woff2` and `HelveticaNeue.woff2` (from Task 2)
  - Font size mapping from PPTX XML analysis: sz values (divide by 100 for pt): 12150→121.5pt, 16000→160pt, 12100→121pt, 10000→100pt, 8100→81pt, 7000→70pt, 4000→40pt, 2400→24pt, 2000→20pt, 1800→18pt, 1200→12pt
  - Draft file: `~/Code/vtex-marp-template/.sisyphus/drafts/vtex-marp-template.md` — full size reference table

  **Acceptance Criteria**:
  - [ ] Two `@font-face` blocks present in `theme/vtex.css`
  - [ ] Font paths point to correct relative locations
  - [ ] After `npm run build`, a rendered slide screenshot shows non-fallback Helvetica Neue glyphs

  **QA Scenarios**:
  ```
  Scenario: font-face declarations present
    Tool: Bash
    Steps:
      1. grep -c "@font-face" theme/vtex.css
    Expected Result: 2 (one per weight)
    Evidence: .sisyphus/evidence/task-6-font-face.txt
  ```

  **Commit**: YES (group 2)
  - Message: `feat(theme): add @font-face and typography scale`

- [x] 7. Cover layout class (`cover`)

  **What to do**:
  - Add `.cover` class rules to `theme/vtex.css`:
    - `section.cover`: `background-color: var(--color-pink); color: white;`
    - Background art: `background-image: url('../assets/images/bg-hex-cover.png'); background-size: 65%; background-position: right -5% center; background-repeat: no-repeat;`
    - `section.cover h1`: `font-size: 121.5pt; font-weight: 300; line-height: 0.9; color: white; position: absolute; left: 60px; top: 60px; width: 55%; margin: 0;`
    - Footer override: logo in white (via `filter: brightness(0) invert(1)`), tagline in white
  - This maps to **slide 1** of the original template

  **Must NOT do**:
  - Do not add a subtitle placeholder — the cover has only the title in the original
  - Do not use a gradient for the cover background (it's solid pink `#F71963`)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 8–16)
  - **Blocks**: Task 17
  - **Blocked By**: Tasks 4, 5, 6

  **References**:
  - `slide-previews/reference/slide_01.png` — exact reference for cover layout
  - `assets/images/bg-hex-cover.png` (2048×2048) — the 3D art (top-right corner of original has the pinkest version)
  - PPTX XML slide1.xml: title text box at `x=546575 EMU, y=234875 EMU` → as % of 18288000×10287000 EMU slide: left≈3%, top≈2.3%, width≈59.8%, height≈61.1%
  - Font size from PPTX: `sz="12150"` → 121.5pt

  **Acceptance Criteria**:
  - [ ] `section.cover` has pink background and white text
  - [ ] 3D art appears on right half of slide
  - [ ] Title text is large (≈121pt), white, left-aligned, top-left position

  **QA Scenarios**:
  ```
  Scenario: cover slide renders correctly
    Tool: Playwright
    Steps:
      1. Open dist/vtex-template.html, navigate to slide 1 (cover)
      2. Screenshot full slide
      3. Assert: left ~55% of slide is solid pink #F71963
      4. Assert: right half shows 3D art image (non-pink pixels present)
      5. Assert: large white text visible top-left
    Expected Result: matches reference slide_01.png
    Evidence: .sisyphus/evidence/task-7-cover-slide.png
  ```

  **Commit**: YES (group 3 — commit all Wave 3 tasks together)

- [x] 8. Chapter layout class (`chapter`)

  **What to do**:
  - Add `.chapter` class rules:
    - `section.chapter`: `background-color: var(--color-light-bg);`
    - Background art top-right: `background-image: url('../assets/images/bg-hex-pink.png'); background-size: 52%; background-position: right -2% top -5%; background-repeat: no-repeat;`
    - Chapter label (e.g. "Chapter"): `section.chapter h2` → `font-size: 40pt; font-weight: 400; color: var(--color-navy); margin-bottom: 0;`
    - Chapter title (large pink): `section.chapter h1` → `font-size: 160pt; font-weight: 300; color: var(--color-pink); line-height: 0.85; margin-top: 0;`
    - Section number (top-right, huge, white): Use a `<span class="section-number">01</span>` convention in markdown — CSS: `section.chapter .section-number { position: absolute; top: 40px; right: 60px; font-size: 160pt; font-weight: 300; color: white; }`
    - Subtitle (optional, small grey below title): `section.chapter p` → `font-size: 20pt; color: var(--color-grey);`
  - Maps to **slide 3** of original

  **Must NOT do**:
  - Do not make the section number overlap the art (it sits on top of the art area, white on pink)
  - Do not use `#F71963` for the background — it's `#F5F9FF` (light blue-grey)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 7, 9–16)
  - **Blocks**: Task 17
  - **Blocked By**: Tasks 4, 5, 6

  **References**:
  - `slide-previews/reference/slide_03.png` — chapter slide reference
  - PPTX slide3.xml colors: `#F5F9FF` BG, text sizes `sz="16000"` (160pt), `sz="4000"` (40pt), `sz="2600"` (26pt)
  - The section number "01" is in the top-right, overlapping the art area, white color

  **Acceptance Criteria**:
  - [ ] `section.chapter h1` renders in pink `#F71963`, large (≈160pt)
  - [ ] `section.chapter h2` renders as the "Chapter" label in navy, smaller
  - [ ] Background art appears top-right
  - [ ] Section number appears top-right in white, very large

  **QA Scenarios**:
  ```
  Scenario: chapter slide renders correctly
    Tool: Playwright
    Steps:
      1. Open dist/vtex-template.html, navigate to chapter slide
      2. Screenshot full slide
      3. Assert: light bg (#F5F9FF), pink large title bottom-left, art top-right, white number top-right
    Expected Result: matches reference slide_03.png
    Evidence: .sisyphus/evidence/task-8-chapter-slide.png
  ```

  **Commit**: YES (group 3)

- [x] 9. Sub-chapter layout class (`subchapter`)

  **What to do**:
  - Add `.subchapter` class rules:
    - `section.subchapter`: `background-color: var(--color-light-bg);` — outer slide is light bg
    - The visual centerpiece is a large **rounded white card** overlaying the center of the slide, with the 3D art inside it. Implement via `section.subchapter::before`: `content: ""; position: absolute; left: 3%; top: 10%; width: 94%; height: 72%; background: white; border-radius: 20px; background-image: url('../assets/images/bg-hex-pink.png'); background-size: 60%; background-position: right center; background-repeat: no-repeat; z-index: 0;`
    - Speaker credit (top-left inside card): `section.subchapter .speaker { position: absolute; top: 14%; left: 6%; font-size: 12pt; color: var(--color-grey); z-index: 1; }`
    - Sub-chapter title (bottom-left inside card): `section.subchapter h1 { position: absolute; bottom: 18%; left: 6%; font-size: 100pt; font-weight: 300; color: var(--color-navy); z-index: 1; width: 45%; line-height: 0.95; }`
    - Section number (bottom-right inside card): `section.subchapter .section-number { position: absolute; bottom: 15%; right: 6%; font-size: 100pt; font-weight: 300; color: var(--color-navy); z-index: 1; }`
  - Maps to **slides 4–5** of original

  **Must NOT do**:
  - Do not make the card full-bleed — it has visible padding/margins showing the light bg behind it
  - The card has rounded corners (≈20px border-radius, matching the original's rounded rect shape)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 7, 8, 10–16)
  - **Blocks**: Task 17
  - **Blocked By**: Tasks 4, 5, 6

  **References**:
  - `slide-previews/reference/slide_04.png` — sub-chapter reference; note the white rounded card with art, "1.1" bottom-right, title bottom-left
  - `slide-previews/reference/slide_05.png` — sub-sub-chapter variant (same layout, "1.1.1" numbering)
  - PPTX slide4.xml: BG transparent (inherits), colors `#142032` (navy), `#115000` (likely a theme reference)

  **Acceptance Criteria**:
  - [ ] White rounded card visible in center of light-bg slide
  - [ ] 3D art appears inside the card, right half
  - [ ] Title and section number positioned inside card

  **QA Scenarios**:
  ```
  Scenario: sub-chapter card renders correctly
    Tool: Playwright
    Steps:
      1. Navigate to sub-chapter slide in dist/vtex-template.html
      2. Screenshot full slide
      3. Assert: white rounded card covering most of slide, art visible inside right portion
    Expected Result: matches reference slide_04.png
    Evidence: .sisyphus/evidence/task-9-subchapter-slide.png
  ```

  **Commit**: YES (group 3)

- [x] 10. Speaker intro layout class (`speaker`)

  **What to do**:
  - Add `.speaker` class rules:
    - `section.speaker`: `background-color: var(--color-light-bg);`
    - Background art right half: `background-image: url('../assets/images/bg-hex-pink.png'); background-size: 58%; background-position: right center; background-repeat: no-repeat;`
    - Section label top-left (e.g. "Introduction to VTEX"): `section.speaker .section-label { font-size: 28pt; color: var(--color-navy); }` — the word "VTEX" is in pink
    - Speaker photo (rounded square): author must supply as `![photo](...)` — CSS: `section.speaker img { width: 120px; height: 120px; border-radius: 12px; object-fit: cover; position: absolute; left: 60px; top: 45%; }`
    - Speaker name (large): `section.speaker h1 { font-size: 70pt; font-weight: 300; color: var(--color-navy); position: absolute; left: 60px; bottom: 25%; width: 40%; }`
    - Speaker title/role (small grey below name): `section.speaker p { font-size: 18pt; color: var(--color-grey); }`
  - Maps to **slides 6–8** of original (variants: with/without multiple speakers, with/without social handles)

  **Must NOT do**:
  - Do not hard-code a photo — the author provides their own image in markdown
  - Do not add social media icons (those are on slide 8 which has extra icons — implement as content, not layout)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 7, 8, 9, 11–16)
  - **Blocks**: Task 17
  - **Blocked By**: Tasks 4, 5, 6

  **References**:
  - `slide-previews/reference/slide_06.png` — speaker intro reference (photo left, 3D art right, name large)
  - `slide-previews/reference/slide_07.png` — variant with smaller art
  - PPTX slide6.xml: colors `#142032`, `#5E6E82`, `#F71963` (VTEX label in pink), font sizes 80pt for name, 44pt for section label

  **Acceptance Criteria**:
  - [ ] 3D art visible on right half of slide
  - [ ] Large name text renders bottom-left
  - [ ] `img` in markdown renders as small rounded photo

  **QA Scenarios**:
  ```
  Scenario: speaker intro slide renders
    Tool: Playwright
    Steps:
      1. Navigate to speaker slide in dist/vtex-template.html
      2. Screenshot full slide
      3. Assert: name visible large bottom-left, art right half
    Expected Result: matches reference slide_06.png
    Evidence: .sisyphus/evidence/task-10-speaker-slide.png
  ```

  **Commit**: YES (group 3)

- [x] 11. Content + image layout classes (`content-light`, `content-dark`, `content-mockup`)

  **What to do**:
  - Three variants of the "content with image" layout (slides 9, 20–22):
    - `.content-light`: `background: var(--color-light-bg)` — title top-left, body text left half, image right half
    - `.content-dark`: no BG color (white/transparent) with dark text overlay — `background: white`; image fills right half absolutely
    - `.content-mockup`: same as content-light but image is a device/screen mockup
  - Shared layout CSS:
    - `section.content-light h1, section.content-dark h1`: `font-size: 40pt; color: var(--color-navy); position: absolute; top: 60px; left: 60px; width: 50%;`
    - Body text: `font-size: 18-24pt; color: var(--color-grey); left: 60px; top: 160px; width: 50%;`
    - Image: author uses `![](img)` → CSS positions it to right half: `section[class*="content"] img { position: absolute; right: 0; top: 0; height: 100%; width: 52%; object-fit: cover; border-radius: 0; }`
  - Maps to slides 9, 11, 20, 21, 22, 24, 28, 29

  **Must NOT do**:
  - Do not force the image to stretch — use `object-fit: cover` not `stretch`

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 17
  - **Blocked By**: Tasks 4, 5, 6

  **References**:
  - `slide-previews/reference/slide_09.png` — content-light variant
  - `slide-previews/reference/slide_20.png` and `slide_21.png` — content-dark variants
  - `slide-previews/reference/slide_24.png` — content with long screen mockup

  **Acceptance Criteria**:
  - [ ] `content-light` has correct background, title positioned top-left
  - [ ] Image fills right half of slide

  **QA Scenarios**:
  ```
  Scenario: content-light slide
    Tool: Playwright
    Steps:
      1. Navigate to content-light slide
      2. Screenshot
      3. Assert: title top-left, body mid-left, image right half
    Expected Result: matches reference slide_09.png
    Evidence: .sisyphus/evidence/task-11-content-light.png
  ```

  **Commit**: YES (group 3)

- [x] 12. Quote layout classes (`quote-image`, `statement-dark`, `highlight`, `quote-pink`)

  **What to do**:
  - Four quote/statement variants:
    - `.quote-image` (slide 10): vertical image left ~40%, quote text right; `section.quote-image img { position: absolute; left: 60px; top: 60px; width: 38%; height: 80%; object-fit: cover; border-radius: 16px; }` — quote `font-size: 70pt; color: var(--color-navy); right: 10%; top: 25%; width: 48%;`
    - `.statement-dark` (slides 27, 40): white/near-white BG, giant centered quote; `section.statement-dark { background: white; } section.statement-dark h1 { font-size: 81pt; font-weight: 300; color: var(--color-navy); text-align: center; }`
    - `.highlight` (slides 32–34): `background: var(--color-light-bg)`, large centered quote, optional section label top-left; `section.highlight h1 { font-size: 50pt; font-weight: 300; color: var(--color-deep-navy); text-align: center; width: 80%; margin: auto; }`
    - `.quote-pink` (slide 39): white bg, quote text uses `#F71963` for emphasis words; handled via `<strong>` = pink: `section.quote-pink strong { color: var(--color-pink); font-weight: 300; }`
  - Maps to slides 10, 27, 32, 33, 34, 39, 40, 41, 42

  **Must NOT do**:
  - Do not make all quote slides identical — each has a distinct size, color treatment, and image arrangement

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 17
  - **Blocked By**: Tasks 4, 5, 6

  **References**:
  - `slide-previews/reference/slide_10.png` — quote-image (image left, quote right)
  - `slide-previews/reference/slide_27.png` — statement-dark (giant centered quote)
  - `slide-previews/reference/slide_32.png` — highlight (large centered on light bg)
  - `slide-previews/reference/slide_39.png` — quote-pink (pink accent text)

  **Acceptance Criteria**:
  - [ ] Each of the 4 variants renders distinctly with correct font size and color
  - [ ] `quote-pink` `<strong>` text renders in pink

  **QA Scenarios**:
  ```
  Scenario: quote-image layout
    Tool: Playwright
    Steps:
      1. Navigate to quote-image slide
      2. Screenshot
      3. Assert: image left column, large text right column
    Evidence: .sisyphus/evidence/task-12-quote-image.png
  ```

  **Commit**: YES (group 3)

- [x] 13. Big stats layout class (`stats`)

  **What to do**:
  - `.stats` class for slides 14–16, 18–19:
    - `section.stats { background: var(--color-light-bg); }`
    - Title (slide label top-left): `section.stats .slide-label { font-size: 40pt; color: var(--color-navy); position: absolute; top: 60px; left: 60px; }`
    - The giant number/stat: `section.stats h1 { font-size: 100pt; font-weight: 400; color: var(--color-navy); position: absolute; bottom: 30%; left: 60px; }`
    - Supporting description text: `section.stats p { font-size: 20pt; color: var(--color-mid-grey); }`
    - Variant for multiple stats side by side (slide 15–16): add `.stats-row` that uses flexbox to arrange 2-3 stats horizontally
  - Maps to slides 14, 15, 16, 18, 19

  **Must NOT do**:
  - Do not use `font-size: 100pt` for the supporting text — only the number itself is large
  - Do not add decorative line separators (not in original stats slides)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 17
  - **Blocked By**: Tasks 4, 5, 6

  **References**:
  - `slide-previews/reference/slide_14.png` — single stat "27" with description
  - `slide-previews/reference/slide_15.png` — "31%" stat
  - `slide-previews/reference/slide_18.png` — stat with image on right

  **Acceptance Criteria**:
  - [ ] Stat number renders at ≈100pt, navy colored
  - [ ] Supporting text renders at ≈20pt, grey

  **QA Scenarios**:
  ```
  Scenario: big stats slide
    Tool: Playwright
    Steps:
      1. Navigate to stats slide
      2. Screenshot
      3. Assert: very large number visible, smaller supporting text below
    Evidence: .sisyphus/evidence/task-13-stats-slide.png
  ```

  **Commit**: YES (group 3)

- [x] 14. Two-column numbered layout class (`two-col`)

  **What to do**:
  - `.two-col` class for slides 12–13, 37–38:
    - `section.two-col { background: white; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto 1fr; gap: 40px; padding: 60px 80px; }`
    - Section label top (spanning both cols): `section.two-col .slide-label { grid-column: 1 / -1; font-size: 40pt; color: var(--color-navy); }`
    - Column number (large "01", "02"): `section.two-col .col-number { font-size: 121pt; font-weight: 400; color: var(--color-navy); line-height: 1; }`
    - Column body text: `font-size: 20pt; color: var(--color-grey);`
    - In markdown: use `<div class="col-number">01</div>` convention or `##` heading for column content
  - Maps to slides 12, 13, 37, 38

  **Must NOT do**:
  - Do not make the column numbers pink — they are navy `#142032` in the original

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 17
  - **Blocked By**: Tasks 4, 5, 6

  **References**:
  - `slide-previews/reference/slide_12.png` — two-column numbered layout
  - `slide-previews/reference/slide_13.png` — variant with longer content

  **Acceptance Criteria**:
  - [ ] Two equal columns side by side
  - [ ] Large "01"/"02" numbers visible in each column

  **QA Scenarios**:
  ```
  Scenario: two-column layout
    Tool: Playwright
    Steps:
      1. Navigate to two-col slide
      2. Screenshot
      3. Assert: content split into two columns with large numbers
    Evidence: .sisyphus/evidence/task-14-two-col.png
  ```

  **Commit**: YES (group 3)

- [x] 15. Card / typed-info layout class (`card`) + Thanks layout class (`thanks`)

  **What to do**:
  - `.card` class (slide 43):
    - `section.card { background: var(--color-blue-accent); }` — the blue-tinted `#E3ECFF` background
    - Card content area centered: `section.card .card-body { background: white; border-radius: 16px; padding: 40px; margin: 20px 40px; }`
    - Title: `font-size: 36pt; color: var(--color-navy);`
    - Body: `font-size: 20pt; color: var(--color-grey);`
    - Pink divider strip (left edge): `section.card::before { content: ""; position: absolute; left: 0; top: 0; width: 8px; height: 100%; background: var(--color-pink); }`

  - `.thanks` class (slide 44):
    - `section.thanks { background: linear-gradient(135deg, var(--color-light-bg) 0%, #f0e8f5 100%); }` — subtle gradient outer area
    - Large pink rounded rectangle (the centerpiece): `section.thanks::before { content: ""; position: absolute; left: 3%; top: 10%; width: 94%; height: 75%; background: var(--color-pink); border-radius: 20px; z-index: 0; }`
    - "Thanks!" text centered: `section.thanks h1 { font-size: 81pt; font-weight: 300; color: white; position: absolute; left: 30%; top: 35%; z-index: 1; }`
    - Vertical divider line next to "Thanks!": `section.thanks::after { ... content: ""; position: absolute; left: 52%; top: 35%; height: 18%; border-left: 1px solid rgba(255,255,255,0.4); z-index: 1; }`

  **Must NOT do**:
  - The `thanks` slide's pink area is a ROUNDED RECTANGLE — not full bleed. Do not use `background` on the `section` itself for the pink.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 17
  - **Blocked By**: Tasks 4, 5, 6

  **References**:
  - `slide-previews/reference/slide_43.png` — card layout (blue bg, white card)
  - `slide-previews/reference/slide_44.png` — thanks slide (light outer, pink rounded rect center, "Thanks!" + divider line)

  **Acceptance Criteria**:
  - [ ] `card` slide has `#E3ECFF` background
  - [ ] `thanks` slide shows pink rounded rectangle with "Thanks!" in white

  **QA Scenarios**:
  ```
  Scenario: thanks slide matches original
    Tool: Playwright
    Steps:
      1. Navigate to thanks slide in dist/vtex-template.html
      2. Screenshot
      3. Assert: outer bg is light, pink rounded rect visible center, "Thanks!" white text
    Expected Result: matches reference slide_44.png
    Evidence: .sisyphus/evidence/task-15-thanks-slide.png
  ```

  **Commit**: YES (group 3)

- [x] 16. Dark content, operating results, and chart placeholder layouts (`dark-content`, `results`, `chart-placeholder`)

  **What to do**:
  - `.dark-content` (slides 25–26): `section.dark-content { background: var(--color-deep-navy); color: white; }` — image fills most of right side or bottom, text overlays
  - `.results` (slides 17, 31): Chart/dashboard slides — **DO NOT attempt to recreate charts in CSS**. Instead: `section.results { background: var(--color-light-bg); }` — the slide markdown will contain an `<img src="../slide-previews/reference/slide_17.png">` placeholder image with a comment `<!-- CHART: replace with actual chart image -->`. Add `section.results img { width: 100%; height: 100%; object-fit: contain; position: absolute; top: 0; left: 0; }` to make the screenshot fill the slide.
  - `.operating-results` variant for slide 31 (same treatment as `results`)
  - Also handle remaining misc slides: slides 23 (table/list), 35–36 (sectioned info with pink/blue cards):
    - `.sectioned` (slides 35–36): `background: var(--color-light-bg)`, grid of colored cards with pink `#FFC4DD` and blue `#E3ECFF` fills
  - Maps to slides 17, 23, 25, 26, 31, 35, 36

  **Must NOT do**:
  - Do NOT attempt to recreate bar charts, pie charts, or dashboards in CSS/HTML — embed the reference screenshot as placeholder
  - Note this clearly in the markdown with `<!-- CHART PLACEHOLDER -->` comments

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 17
  - **Blocked By**: Tasks 3, 4, 5, 6

  **References**:
  - `slide-previews/reference/slide_17.png` — operating results dashboard (chart placeholder)
  - `slide-previews/reference/slide_25.png` — dark content with text+image
  - `slide-previews/reference/slide_35.png` — sectioned info with pink/blue cards
  - `slide-previews/reference/slide_31.png` — results with data visualization

  **Acceptance Criteria**:
  - [ ] `dark-content` slide has deep navy background with white text
  - [ ] `results` slide shows reference screenshot as full-bleed image
  - [ ] `sectioned` slide shows colored card grid

  **QA Scenarios**:
  ```
  Scenario: results chart placeholder renders
    Tool: Playwright
    Steps:
      1. Navigate to results slide
      2. Screenshot
      3. Assert: reference screenshot image is visible (not broken img)
    Evidence: .sisyphus/evidence/task-16-results-placeholder.png
  ```

  **Commit**: YES (group 3)
  - Message: `feat(theme): implement all 15+ layout classes`
  - Files: `theme/vtex.css` (complete)

- [ ] 17. 45-slide example presentation deck (`slides/vtex-template.md`)

  **What to do**:
  - Write the full `slides/vtex-template.md` — 45 slides separated by `---`
  - Each slide uses the correct `<!-- _class: CLASSNAME -->` directive
  - Frontmatter at top:
    ```yaml
    ---
    marp: true
    theme: vtex
    size: 16:9
    ---
    ```
  - Use the original PPTX placeholder text as content for each slide (extracted from XML analysis):
    - Slide 1: cover — "The title of your presentation goes here."
    - Slide 3: chapter — "Chapter / title here / If you need subtitle, write here"
    - Slide 4: subchapter — "Sub-Chapter / title here / Speaker | Speaker / 1.1"
    - … and so on for all 45 slides, matching original text exactly
  - For chart slides (17, 31): embed `![](../slide-previews/reference/slide_17.png)` with `<!-- CHART PLACEHOLDER: replace with actual chart image -->`
  - For image slots (slides 6, 7, 9, 10, 11, etc.): use the extracted PPTX media images where available (people photos already in PPTX assets), otherwise use a grey placeholder `![placeholder](../assets/images/placeholder.png)`
  - Ensure slide count is exactly 45 (count `---` separators)
  - Run `npm run build` to confirm it compiles without errors

  **Must NOT do**:
  - Do not invent slide content not present in the original template
  - Do not add slides 46+ or remove any of the 45 original slides
  - Do not use layout classes not defined in Tasks 7–16
  - Do not skip the chart placeholder slides — they must exist even if using reference images

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential after Wave 3)
  - **Parallel Group**: Wave 4 (with Task 18, but Task 17 must complete before 18)
  - **Blocks**: Task 18, Final Verification
  - **Blocked By**: Tasks 7–16

  **References**:
  - ALL 45 slides' text content: extracted from PPTX XML analysis in this session. Key texts per slide:
    - Slide 1: "The title of your presentation goes here." (sz=12150, cover)
    - Slide 3: "Chapter / title here" (chapter)
    - Slide 4: "Sub-Chapter / title here / Speaker | Speaker" (subchapter)
    - Slide 6: "Introduction to VTEX / Geraldo Thomaz / Founder and co-CEO" (speaker)
    - Slide 10: "Write your important statement within this text box" (quote-image)
    - Slide 14: "27 / [description]" (stats)
    - Slide 15: "31% / [description]" (stats)
    - Slide 27: "Write your important statement within this text box" (statement-dark)
    - Slide 32: "Use this slide for highlight phrases" (highlight)
    - Slide 39: "Lorem ipsum dolor sit amet..." (quote-pink)
    - Slide 44: "Thanks!" (thanks)
    - Full text for all slides is in the PPTX XML at `~/Code/VTEX-presentation-template/pptx-extracted/unpacked/ppt/slides/slide*.xml`
  - Layout class mapping (use these exact class names):
    - Slide 1 → `cover`; Slide 3 → `chapter`; Slides 4–5 → `subchapter`; Slides 6–8 → `speaker`
    - Slides 9,11,20–22,24,28–30 → `content-light` or `content-dark`; Slide 10 → `quote-image`
    - Slides 12–13,37–38 → `two-col`; Slides 14–16,18–19 → `stats`; Slides 17,31 → `results`
    - Slides 23 → `two-col`; Slides 25–26 → `dark-content`; Slides 27,40,41,42 → `statement-dark`
    - Slides 32–34 → `highlight`; Slides 35–36 → `sectioned`; Slide 39 → `quote-pink`
    - Slide 43 → `card`; Slide 44 → `thanks`; Slide 45 → blank

  **Acceptance Criteria**:
  - [ ] `slides/vtex-template.md` has exactly 45 slides (44 `---` separators)
  - [ ] Every slide has a `<!-- _class: -->` directive
  - [ ] `npm run build` exits 0 with no errors
  - [ ] `dist/vtex-template.pdf` has exactly 45 pages

  **QA Scenarios**:
  ```
  Scenario: deck compiles to 45-page PDF
    Tool: Bash
    Steps:
      1. cd ~/Code/vtex-marp-template && npm run export-pdf
      2. python3 -c "import fitz; doc=fitz.open('dist/vtex-template.pdf'); assert len(doc)==45, f'Got {len(doc)} pages'"
    Expected Result: exit 0, 45 pages confirmed
    Evidence: .sisyphus/evidence/task-17-pdf-page-count.txt

  Scenario: HTML output has no JS console errors
    Tool: Playwright
    Steps:
      1. npx marp slides/vtex-template.md --theme theme/vtex.css --output dist/vtex-template.html
      2. Open dist/vtex-template.html in Playwright
      3. Collect console.error messages
    Expected Result: 0 console errors
    Evidence: .sisyphus/evidence/task-17-html-console-errors.txt
  ```

  **Commit**: YES
  - Message: `feat(slides): add complete 45-slide example presentation deck`
  - Files: `slides/vtex-template.md`

- [ ] 18. Side-by-side verification screenshots

  **What to do**:
  - Build the final HTML output: `npm run export-html`
  - Use Playwright to screenshot all 45 slides from `dist/vtex-template.html` — navigate to each slide, screenshot at 1280×720, save to `slide-previews/marp/slide_NN.png`
  - Use Python/PIL to create side-by-side comparison images: reference PNG (left, scaled to 1280×720) + Marp PNG (right, 1280×720) → combined 2560×720 image saved to `slide-previews/comparison/slide_NN_comparison.png`
  - Generate `slide-previews/comparison/index.html` gallery showing all 45 comparison pairs for easy human review
  - Focus attention on the 15 layout types — one representative comparison per layout is sufficient for the summary, but generate all 45 for completeness

  **Must NOT do**:
  - Do not attempt automated pixel-diff scoring (the exact pixel match will differ due to font rendering) — this is a human visual review, not automated pass/fail
  - Do not skip any of the 45 slides

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]

  **Parallelization**:
  - **Can Run In Parallel**: NO (needs Task 17 complete)
  - **Parallel Group**: Wave 4
  - **Blocks**: Final Verification
  - **Blocked By**: Tasks 3 (reference PNGs), 17 (built deck)

  **References**:
  - `slide-previews/reference/slide_NN.png` — 45 reference PNGs from Task 3
  - Playwright slide navigation: Marp HTML uses arrow keys or `section[data-marpit-pagination]` elements
  - PIL composition: `Image.new("RGB", (2560, 720))` + `paste(ref_img, (0,0))` + `paste(marp_img, (1280,0))`

  **Acceptance Criteria**:
  - [ ] `slide-previews/marp/` contains 45 PNG files
  - [ ] `slide-previews/comparison/` contains 45 side-by-side comparison images
  - [ ] `slide-previews/comparison/index.html` opens and shows all 45 pairs

  **QA Scenarios**:
  ```
  Scenario: comparison gallery generated
    Tool: Bash
    Steps:
      1. ls slide-previews/comparison/*.png | wc -l
      2. python3 -c "from PIL import Image; img=Image.open('slide-previews/comparison/slide_01_comparison.png'); assert img.size==(2560,720)"
    Expected Result: 45 comparison files, each 2560×720
    Evidence: .sisyphus/evidence/task-18-comparison-count.txt
  ```

  **Commit**: YES
  - Message: `chore: add side-by-side verification screenshots`
  - Files: `slide-previews/comparison/index.html` (committed); PNGs excluded via .gitignore

---

## Final Verification Wave

> Run AFTER all implementation tasks. Both must APPROVE.

- [ ] F1. **Build + Output Audit** — `unspecified-high`
  Run `npm run build`. Assert exit 0. Assert `dist/vtex-template.pdf` and `dist/vtex-template.html` exist. Open HTML in Playwright, navigate to each of the 15 layout types, screenshot, assert no missing images/fonts (no fallback sans-serif rendering). Check console for errors.
  Output: `Build [PASS/FAIL] | Slides [45/45] | Font [PASS/FAIL] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Visual Fidelity Review** — `visual-engineering`
  Open side-by-side comparison images in `slide-previews/comparison/`. For each layout type, review: background color match, font weight/size match, art placement match, logo/footer placement. Flag any slides with visible discrepancy > 5% layout difference.
  Output: `Layouts [N/15 match] | Slides [N/45 match] | Issues: [list] | VERDICT: APPROVE/REJECT`

---

## Commit Strategy

- **Wave 1**: `chore: scaffold vtex-marp-template project structure`
- **Wave 2**: `feat(theme): add design tokens, base styles, and font-face declarations`
- **Wave 3**: `feat(theme): implement all 15 layout classes`
- **Wave 4**: `feat(slides): add 45-slide pixel-perfect example deck` + `chore: add verification screenshots`

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: exit 0, dist/ contains PDF + HTML
npm run export-pdf     # Expected: dist/vtex-template.pdf, 45 pages
open dist/vtex-template.html  # Expected: all slides render correctly in browser
```

### Final Checklist
- [ ] `dist/vtex-template.pdf` has exactly 45 pages
- [ ] All 15 layout types visually match the original (confirmed via screenshots)
- [ ] VTEX logo appears on every slide
- [ ] Font is Helvetica Neue (not a fallback)
- [ ] `assets/fonts/*.woff2` listed in `.gitignore`
- [ ] No console errors when opening HTML output
