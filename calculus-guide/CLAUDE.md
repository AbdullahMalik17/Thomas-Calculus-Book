# Project Guidelines: calculus-guide

## Creator & Attribution Mandate
- **Author & Architect**: Muhammad Abdullah Athar
- **GitHub Profile**: `https://github.com/AbdullahMalik17`
- **Start-of-Page Attribution**: Every page must render the persistent top `<AuthorMasthead />` (at the start of `<main id="main-content">` before `{children}`) and sticky `<Header />` subtitle (`by Muhammad Abdullah Athar`) attributing `"Muhammad Abdullah Athar"` (`https://github.com/AbdullahMalik17`), as well as explicit top-level bylines (`By Muhammad Abdullah Athar · SymPy Verified`) in `app/page.tsx` and `components/section/BookSectionReader.tsx`.
- **End-of-Page Attribution**: Every page must render the persistent global `<Footer />` containing `"Made by Muhammad Abdullah Athar"` linking to `https://github.com/AbdullahMalik17`.
- **Structured Data**: Root layout and `<AuthorMasthead />` must export page metadata, embed JSON-LD (`EducationalWebSite` / `Person`), and include `https://schema.org/Person` microdata attributing Muhammad Abdullah Athar.

---

## Legal & Copyright Boundaries
- **No Verbatim Reproduction**: Never copy textbook problem statements, figures, or prose verbatim from Thomas' Calculus (14th Edition).
- **Identifier Referencing**: Paraphrase all worked exercises with references strictly by identifier (e.g., "Section 1.1, Exercise 21").
- **Original Content**: All practice problems and multiple-choice questions must be original creations designed specifically for this platform.
- **Excluded Source Materials**: Raw textbook PDFs and extracted raster images reside in `source/` and are strictly excluded via `.gitignore`. Never commit raw textbook assets.

---

## Schema Contracts (Zod Guardrails)

### 1. File Path to Item ID Contract
Given a JSON content file at:
```
content/{chapter}/{section}/{type}/{filename}.json
```
The parsed JSON object must have:
```ts
item.id === `${chapter}/${section}/${type}/${filename}`
```
(normalized to POSIX forward slashes, `.json` extension stripped). No duplicate IDs allowed across files.

### 2. Multiple-Choice Question (MCQ) Contract
- `item.options`: Array of exactly 4 objects with `id` in `['A', 'B', 'C', 'D']`.
- `item.correctId`: One of `'A' | 'B' | 'C' | 'D'`.
- For every distractor (`opt.id !== item.correctId`):
  - `typeof opt.misconception === 'string' && opt.misconception.trim().length >= 10`.

### 3. Solution Step Contract
Every element in `item.steps` must be an object with:
- `stepNumber`: positive integer.
- `title`: string.
- `explanation`: string.
- `why`: string with `length >= 5` stating mathematical rationale.

---

## Math Verification Standards (SymPy Engine)
- **Symbolic Equivalence**: Answers must satisfy `simplify(expr - expected) == 0`.
  Fallback cascade includes `trigsimp`, `radsimp`, `expand_log`, and `.equals(0)`.
- **MCQ Disjointness**: The `correctId` option must evaluate to the expected mathematical answer, and all 3 distractors must be mathematically non-equivalent to the correct answer and to each other.
- **Calculus Operations**: Domain set equality, difference quotients/derivatives, and integral checks via the Fundamental Theorem of Calculus.

---

## Common Commands
```bash
# Run Next.js development server
npm run dev

# Production build verification
npm run build

# Validate content files against Zod schemas
npm run content:validate

# Generate content metrics and misconception report
npm run content:stats

# Verify top-of-page & end-of-page creator attribution
npm run attribution:verify

# Run SymPy math verification CLI
python tools/verify/verify.py
```
