# Project: calculus-guide

## Architecture
`calculus-guide` is an interactive study platform for Thomas' Calculus (14th Edition) with verifiable math, automated validation pipelines, and a verified Golden Example (Chapter 1, Section 1.1).

### Core Architectural Layers:
1. **Presentation & Application Layer (`calculus-guide/app`, `components`)**:
   - Next.js 14 App Router with TypeScript and Tailwind CSS.
   - MDX documentation with `@next/mdx`, `remark-math`, and `rehype-katex`.
   - KaTeX stylesheet (`katex/dist/katex.min.css`) in root layout.
   - Persistent global footer attributed to Muhammad Abdullah Athar (`https://github.com/AbdullahMalik17`).
   - Route placeholders: `/`, `/chapters/[ch]`, `/chapters/[ch]/[section]`, `/practice/[section]`, `/quiz/[chapter]`, `/dashboard`, `/about`.
2. **Content Schema & Guardrails Layer (`calculus-guide/lib/content`, `scripts`)**:
   - Strict Zod schemas in `lib/content/schema.ts` (`DifficultyEnum`, `StatusEnum`, `BaseItemSchema`, `SolutionSchema`, `MCQSchema`, `PracticeProblemSchema`).
   - Automated content validation script `scripts/validate-content.ts` asserting 1-to-1 file path to item `id` mapping, exactly 1 `correctId` + 3 distractors with non-empty `misconception` metadata, no duplicate IDs across files, and step `why` justifications.
   - Content statistics script `scripts/content-stats.ts`.
3. **Symbolic Mathematical Verification Engine (`calculus-guide/tools/verify/`)**:
   - Standalone Python CLI using SymPy 1.14.0.
   - Algebraic simplification cascade: `simplify(expr - expected) == 0`, `trigsimp`, `radsimp`, `expand_log`, `.equals(0)`.
   - MCQ verification: asserts option `correctId` evaluates to expected solution, and all distractors are mathematically non-equivalent to the correct answer and to each other.
   - Calculus JSON payloads: continuous domain set equality, difference quotients/derivatives, and integral checks via the Fundamental Theorem of Calculus.
   - Automated test suite with >= 20 edge-case test fixtures (24 implemented).
4. **Golden Example Content Layer (`calculus-guide/content/ch01-functions/1.1-functions-and-graphs/`)**:
   - `summary.mdx`: Original exposition of definitions, theorems, domain/range, piecewise functions, symmetry tests, and pitfalls.
   - Paraphrased textbook solutions for 8 text-only exercises with numbered steps and explicit "why" justifications.
   - 8 original practice problems across difficulty tiers 1, 2, and 3 with progressive hints.
   - 8 original MCQs with explicit misconception metadata for every distractor.
5. **Multi-Agent Infrastructure & Documentation (`.claude/agents/`, `docs/`)**:
   - Prompt templates: `chNN-writer.md` (scoped to `content/chNN-*/`), `math-verifier.md` (read-only execution agent), `content-reviewer.md` (pedagogy & copyright audit).
   - Documentation: `docs/STYLE_GUIDE.md`, `docs/SOURCE_WORKFLOW.md`, `PROGRESS.md`, `CLAUDE.md`.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Scaffolding & Config | Next.js App Router, TypeScript, Tailwind, MDX, KaTeX | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Persistent Footer | "Made by Muhammad Abdullah Athar" linking to GitHub | M1 | ORIGINAL_REQUEST §Operational Boundaries |
| 3 | Route Placeholders | 7 routes: `/`, `/chapters/[ch]`, `/chapters/[ch]/[section]`, `/practice/[section]`, `/quiz/[chapter]`, `/dashboard`, `/about` | M1 | ORIGINAL_REQUEST §R1 |
| 4 | PDF Extraction Script | `scripts/extract_pages.sh` & `scripts/extract_pages.py` | M1 | ORIGINAL_REQUEST §R1 |
| 5 | Scaffolding Docs | `PROGRESS.md`, `CLAUDE.md`, `.gitignore` | M1 | ORIGINAL_REQUEST §R1 |
| 6 | Zod Schemas | `DifficultyEnum`, `StatusEnum`, `BaseItemSchema`, `SolutionSchema`, `MCQSchema`, `PracticeProblemSchema` in `lib/content/schema.ts` | M2 | ORIGINAL_REQUEST §R2 |
| 7 | Content Validator | `scripts/validate-content.ts` (ID mapping, MCQ 1+3 misconceptions, unique IDs, step 'why') | M2 | ORIGINAL_REQUEST §R2 |
| 8 | Content Stats Script | `scripts/content-stats.ts` generating ANSI summary and misconception coverage | M2 | ORIGINAL_REQUEST §R2 |
| 9 | SymPy Verification CLI | Standalone CLI `tools/verify/verify.py` with zero-argument execution | M3 | ORIGINAL_REQUEST §R3 |
| 10 | Algebraic Equivalence | SymPy symbolic equivalence cascade (`simplify(expr - expected) == 0`) | M3 | ORIGINAL_REQUEST §R3 |
| 11 | MCQ Verification Engine | Verify `correctId` evaluation and mathematical non-equivalence of distractors | M3 | ORIGINAL_REQUEST §R3 |
| 12 | Calculus Payloads | Domain set equality, difference quotient/derivative, integral verification | M3 | ORIGINAL_REQUEST §R3 |
| 13 | Edge-Case Fixtures | 24 test fixtures covering factoring, expansion, trig identities, radicals, logs/exponentials | M3 | ORIGINAL_REQUEST §R3 |
| 14 | Section 1.1 Summary | `content/ch01-functions/1.1-functions-and-graphs/summary.mdx` | M4 | ORIGINAL_REQUEST §R4 |
| 15 | Paraphrased Solutions | 8 solutions with numbered steps and explicit "why" annotations | M4 | ORIGINAL_REQUEST §R4 |
| 16 | Original Practice Set | 8 practice problems across tiers 1, 2, 3 with hints and solutions | M4 | ORIGINAL_REQUEST §R4 |
| 17 | Original MCQs Set | 8 MCQs with explicit misconception metadata for all distractors | M4 | ORIGINAL_REQUEST §R4 |
| 18 | Multi-Agent Prompts | `.claude/agents/chNN-writer.md`, `math-verifier.md`, `content-reviewer.md` | M5 | ORIGINAL_REQUEST §R5 |
| 19 | Project Documentation | `docs/STYLE_GUIDE.md` and `docs/SOURCE_WORKFLOW.md` | M5 | ORIGINAL_REQUEST §R5 |
| 20 | E2E Acceptance Suite | Full build, validation, SymPy test suite, and adversarial hardening | M6 | ORIGINAL_REQUEST §Acceptance Criteria |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Project & Scaffolding | Next.js App Router, Tailwind, MDX, KaTeX, Footer, 7 Routes, scripts, .gitignore, PROGRESS.md, CLAUDE.md | none | DONE |
| 2 | M2: Schema & Validation | `lib/content/schema.ts`, `scripts/validate-content.ts`, `scripts/content-stats.ts`, npm scripts | M1 | DONE |
| 3 | M3: SymPy Verification CLI | `tools/verify/` CLI, algebraic cascade, MCQ verification, calculus payloads, 24 fixtures | none (Python runtime) | DONE |
| 4 | M4: Section 1.1 Golden Example | `summary.mdx`, 8 solutions with "why", 8 practice (tiers 1-3) with hints, 8 MCQs with misconceptions | M2, M3 | PLANNED |
| 5 | M5: Multi-Agent Prompts & Docs | `.claude/agents/*.md`, `docs/STYLE_GUIDE.md`, `docs/SOURCE_WORKFLOW.md` | M1, M4 | PLANNED |
| 6 | M6: Final Verification & Hardening | Full build test, content validate, SymPy test pass, adversarial audit | M1, M2, M3, M4, M5 | PLANNED |

---

## Interface Contracts

### 1. Content Path <-> ID Contract
- Given file at path `content/{chapter}/{section}/{type}/{filename}.json`:
  - `expectedId = "{chapter}/{section}/{type}/{filename}"` (normalized to POSIX forward slashes, `.json` stripped).
  - The parsed JSON object must have `item.id === expectedId`.

### 2. MCQ Schema Contract
- `item.options`: Array of exactly 4 objects with `id` in `['A', 'B', 'C', 'D']`.
- `item.correctId`: One of `'A' | 'B' | 'C' | 'D'`.
- For every distractor (`opt.id !== item.correctId`):
  - `typeof opt.misconception === 'string' && opt.misconception.trim().length >= 10`.

### 3. Solution Step Contract
- Every element in `item.steps` must be an object with:
  - `stepNumber`: positive integer.
  - `title`: string.
  - `explanation`: string.
  - `why`: string with `length >= 5` stating mathematical rationale.

### 4. SymPy CLI Contract
- Command: `python tools/verify/verify.py`
  - Exit code `0`: All fixtures and section items valid.
  - Exit code `1`: Any assertion failure.
- Subcommand: `python tools/verify/verify.py validate-section --dir content/ch01-functions/1.1-functions-and-graphs/`
  - Validates all solutions and MCQs in the target directory.

---

## Code Layout
```
calculus-guide/
├── .gitignore
├── CLAUDE.md
├── PROGRESS.md
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── mdx-components.tsx
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── dashboard/page.tsx
│   ├── chapters/[ch]/page.tsx
│   ├── chapters/[ch]/[section]/page.tsx
│   ├── practice/[section]/page.tsx
│   └── quiz/[chapter]/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── math/
│   │   ├── MathBlock.tsx
│   │   └── InlineMath.tsx
│   └── ui/
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── Button.tsx
├── content/
│   └── ch01-functions/
│       └── 1.1-functions-and-graphs/
│           ├── summary.mdx
│           ├── solutions/
│           │   ├── ex-01.json ... ex-54.json (8 items)
│           ├── practice/
│           │   ├── practice-01.json ... practice-08.json (8 items)
│           └── mcq/
│               ├── mcq-01.json ... mcq-08.json (8 items)
├── lib/
│   └── content/
│       └── schema.ts
├── scripts/
│   ├── extract_pages.sh
│   ├── extract_pages.py
│   ├── validate-content.ts
│   └── content-stats.ts
├── tools/
│   └── verify/
│       ├── __init__.py
│       ├── verify.py
│       ├── engine.py
│       ├── mcq_verifier.py
│       ├── calculus_verifier.py
│       ├── section_validator.py
│       ├── fixtures.py
│       ├── requirements.txt
│       └── README.md
├── .claude/
│   └── agents/
│       ├── chNN-writer.md
│       ├── math-verifier.md
│       └── content-reviewer.md
└── docs/
    ├── STYLE_GUIDE.md
    └── SOURCE_WORKFLOW.md
```
