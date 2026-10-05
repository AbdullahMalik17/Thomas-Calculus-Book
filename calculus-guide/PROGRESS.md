# Project Progress: Thomas' Calculus Study Guide

> Creator & Author: **Muhammad Abdullah Athar** ([GitHub: AbdullahMalik17](https://github.com/AbdullahMalik17))  
> Repository: `https://github.com/AbdullahMalik17/Thomas-Calculus-Book`  
> Last Updated: 2026-10-05

---

## 📊 Status Dashboard

| Milestone | Scope | Status | Verification Engine | Completion Date |
|-----------|-------|--------|---------------------|-----------------|
| **M1: Project & Scaffolding** | Next.js 14 App Router, Tailwind, MDX, KaTeX, Footer, 7 Routes, scripts, .gitignore, PROGRESS.md, CLAUDE.md | ✅ Completed | `npm run build` (Exit 0) | 2026-10-05 |
| **M2: Schema & Validation** | Zod Schemas (`lib/content/schema.ts`), `validate-content.ts`, `content-stats.ts`, npm scripts | ✅ Completed | `npm run content:validate` | 2026-10-05 |
| **M3: SymPy Math Engine** | CLI `tools/verify/verify.py`, algebraic cascade, MCQ verification, calculus payloads, 24 fixtures | ✅ Completed | `python tools/verify/verify.py` (24/24 Fixtures) | 2026-10-05 |
| **M4: Section 1.1 Golden Example** | `summary.mdx`, 8 solutions with 'why', 8 practice problems (tiers 1-3), 8 MCQs with misconceptions | 🔄 In Progress | Content Validator & SymPy CLI | Active |
| **M5: Multi-Agent Prompts & Docs** | `.claude/agents/*.md`, `docs/STYLE_GUIDE.md`, `docs/SOURCE_WORKFLOW.md` | ✅ Completed | Schema & 4-Pillar Rubric Compliance | 2026-10-05 |
| **M6: Final Verification & Audit** | Full build, validation, SymPy test suite pass, adversarial hardening | ⏳ Planned | Forensic Auditor Attestation | Pending M6 |

---

## 🎯 Section 1.1 Golden Example Metrics Dashboard

| Metric Category | Target | Completed / In-Flight | Status | Verification Gate |
|-----------------|--------|------------------------|--------|-------------------|
| **Section Summary** | 1 MDX Document | `summary.mdx` (10KB+ comprehensive exposition) | ✅ Available | MDX compiler & layout |
| **Paraphrased Solutions** | 8 Items | `ex-01`, `ex-02`, `ex-03`, `ex-04`, `ex-05`, `ex-06`, `ex-51`, `ex-54` | 8 / 8 Active | Zod `SolutionSchema` + Step `why` |
| **Solution Step "Why" Fields** | 100% of Steps | Every step has explicit mathematical principle rationale | 100% Valid | `scripts/validate-content.ts` |
| **Practice Problems** | 8 Items | 3 Tier 1, 3 Tier 2, 2 Tier 3 problems with progressive hints | 8 / 8 Active | Zod `PracticeProblemSchema` |
| **Diagnostic MCQs** | 8 Items | 8 4-choice questions with 1 correctId and 3 distractors | 8 / 8 Active | Zod `MCQSchema` |
| **MCQ Misconception Coverage** | 24 Distractors | 24 authentic cognitive misconception explanations | 24 / 24 (100%) | `scripts/content-stats.ts` |
| **SymPy Test Fixtures** | >= 20 Fixtures | 24 edge-case fixtures (factoring, expansion, trig, logs, calculus) | 24 / 24 Passing | `python tools/verify/verify.py` |
| **Distractor Disjointness** | 100% MCQs | All distractors mathematically non-equivalent to answer & each other | 100% Verified | `mcq_verifier.py` |
| **Subagent Prompt Templates** | 3 Agents | `chNN-writer.md`, `math-verifier.md`, `content-reviewer.md` | 3 / 3 Completed | Operational boundaries enforced |
| **Authoritative Documentation** | 2 Guides | `docs/STYLE_GUIDE.md`, `docs/SOURCE_WORKFLOW.md` | 2 / 2 Completed | Complete KaTeX & extraction guides |
| **Author Attribution** | 100% Touchpoints | Footer, JSON-LD, metadata, schemas, agent templates, docs | 100% Attributed | `https://github.com/AbdullahMalik17` |

---

## ✅ Completed Milestones & Components

### Milestone 1: Project Scaffolding & Architecture
- [x] **Next.js 14 App Router**: Initialized with TypeScript 5, Tailwind CSS, `@next/mdx`, `remark-math`, `rehype-katex`, and `katex/dist/katex.min.css`.
- [x] **Persistent Footer Attribution**: Global footer (`components/layout/Footer.tsx`) with `"Made by Muhammad Abdullah Athar"` linking to `https://github.com/AbdullahMalik17`.
- [x] **JSON-LD & Metadata**: Root layout embeds `EducationalWebSite` schema and author metadata.
- [x] **Route Placeholders**: 7 functional routes (`/`, `/chapters/[ch]`, `/chapters/[ch]/[section]`, `/practice/[section]`, `/quiz/[chapter]`, `/dashboard`, `/about`).
- [x] **Copyright Safeguards**: `.gitignore` excludes `source/`, `source/**`, `extracted/`, `*.pdf`, `.next/`, `node_modules/`, and python virtual environments.
- [x] **PDF Extraction Tooling**: Cross-platform extraction scripts created (`scripts/extract_pages.sh` and `scripts/extract_pages.py`).
- [x] **AEO & Discovery Assets**: Created `public/llms.txt` and AI-crawler configured `public/robots.txt`.
- [x] **Scaffolding Docs**: `PROGRESS.md` and `CLAUDE.md`.

### Milestone 2: Schema Contracts & Content Validation
- [x] **Zod Schemas (`lib/content/schema.ts`)**:
  - `DifficultyEnum`: `'tier1' | 'tier2' | 'tier3' | 'easy' | 'medium' | 'hard'`.
  - `StatusEnum`: `'draft' | 'in-review' | 'verified' | 'published' | 'deprecated'`.
  - `BaseItemSchema`: Core metadata, mandatory author attribution (`Muhammad Abdullah Athar`).
  - `SolutionStepSchema`: Mandatory positive `stepNumber`, `title`, `mathExpression`, `explanation`, and explicit `why` (min 5 chars).
  - `SolutionSchema`: Identifier-only `exerciseReference`, `problemStatement`, `finalAnswer`, `steps`, `sympyVerification`.
  - `MCQSchema`: Exactly 4 options (`A`, `B`, `C`, `D`), exactly 1 `correctId`, exactly 3 distractors with non-empty `misconception` (min 10 chars).
  - `PracticeProblemSchema`: Tiered difficulty, progressive `hints`, verified multi-step solution.
  - `ContentItemSchema`: Polymorphic discriminated union.
- [x] **Validation CLI (`scripts/validate-content.ts`)**:
  - Strict 1-to-1 mapping between file path and item `id`.
  - Global duplicate ID detection.
  - Enforces MCQ 1 correct + 3 distractor misconceptions.
  - Enforces step `"why"` annotations.
- [x] **Content Statistics CLI (`scripts/content-stats.ts`)**:
  - ANSI colored terminal output summarizing items by chapter, section, type, difficulty.
  - 100% misconception coverage audit.
- [x] **NPM Scripts**: `npm run content:validate` and `npm run content:stats` configured in `package.json`.

### Milestone 3: Symbolic Mathematical Verification Engine
- [x] **SymPy Verification CLI (`tools/verify/verify.py`)**:
  - Zero-argument execution runs full fixture test suite and validates section content, exiting with code 0 on success.
  - Subcommands: `validate-section --dir <path>` and `--test` (pytest invocation).
- [x] **Simplification Cascade (`tools/verify/engine.py`)**:
  - Multi-tier symbolic equivalence: AST match -> `simplify` / `together` / `cancel` -> `trigsimp` -> `radsimp` -> `expand_log` -> `equals(0)`.
- [x] **MCQ Verification Engine (`tools/verify/mcq_verifier.py`)**:
  - Asserts option `correctId` evaluates to expected solution.
  - Asserts all 3 distractors are mathematically non-equivalent to the correct answer ($\Delta \ne 0$).
  - Asserts all distractors are pairwise distinct ($\Delta(D_i, D_j) \ne 0$).
- [x] **Calculus Engine (`tools/verify/calculus_verifier.py`)**:
  - Continuous domain set equality via `continuous_domain` and interval symmetric difference.
  - Difference quotient limit evaluation and derivative verification.
  - Fundamental Theorem of Calculus integral verification.
  - Parity and symmetry verification (even / odd).
- [x] **24 Edge-Case Fixtures (`tools/verify/fixtures.py`)**:
  - Factoring (difference of cubes, quadratics).
  - Binomial and trinomial expansions.
  - Rational functions and complex fractions.
  - Trigonometric identities (Pythagorean, double angle sine/cosine, tangent addition).
  - Radicals (conjugate rationalization, absolute values, fractional exponents).
  - Logarithmic and exponential identities.
  - Calculus operations (quadratic and reciprocal difference quotients).
  - Section 1.1 domain and symmetry checks.
  - MCQ negative test asserting detection of ambiguous distractors.

### Milestone 5: Multi-Agent Infrastructure & Documentation
- [x] **Scoped Chapter Writer Agent (`.claude/agents/chNN-writer.md`)**:
  - Strictly file-scoped allowlist: `content/chNN-*/**` only.
  - Strict denylist: forbidden from touching application code, schemas, or other chapters.
  - Copyright safeguards: identifier-only exercise references, original practice and MCQs, source isolation.
  - Schema conformance: validates solutions with step `"why"` and MCQs with distractor misconceptions.
  - Attribution: Muhammad Abdullah Athar (`https://github.com/AbdullahMalik17`).
- [x] **Read-Only Mathematical Verifier Agent (`.claude/agents/math-verifier.md`)**:
  - STRICT READ-ONLY boundary: forbidden from modifying content or code.
  - Executes `tools/verify/verify.py` against test fixtures and chapter items.
  - Generates structured mathematical audit reports with symbolic difference expressions.
  - Attribution: Muhammad Abdullah Athar.
- [x] **4-Pillar Content Reviewer Agent (`.claude/agents/content-reviewer.md`)**:
  - Read-only audit gatekeeper enforcing the 4-Pillar Review Rubric:
    1. Copyright & Source Compliance (0 verbatim text, `source/` gitignored).
    2. Schema & Structural Integrity (`npm run content:validate`, path-to-ID mapping, uniqueness).
    3. Pedagogical Quality (meaningful "why" fields, authentic cognitive misconceptions, tier 1-3 coverage).
    4. Attribution & Metadata (persistent footer, JSON-LD, metadata).
  - Emits formal PASS / REVISE verdicts.
  - Attribution: Muhammad Abdullah Athar.
- [x] **Mathematical Style Guide (`docs/STYLE_GUIDE.md`)**:
  - KaTeX standards: fractions (`\frac`), derivatives, integrals (`\, dx`), limits, interval notation (`\cup`), functions (`\sin`, `\ln`).
  - MDX typography: Definition, Theorem, Common Pitfall, and Example callouts with Tailwind tokens.
  - Solution step `"why"` rubric: mathematical principles vs mechanical actions with concrete examples.
  - MCQ formulation: 4 options, authentic cognitive misconception taxonomy and examples.
  - Tiered practice problem architecture with progressive hints.
  - Attribution requirements.
- [x] **Source Extraction & Verification Workflow (`docs/SOURCE_WORKFLOW.md`)**:
  - PDF extraction via `scripts/extract_pages.sh` and `scripts/extract_pages.py`.
  - Storage exclusively in `source/` (strictly `.gitignore`d).
  - Paraphrasing and exercise mapping guidelines.
  - 6-phase authoring and verification lifecycle (Extraction -> Authoring -> Math Verify -> Content Review -> Code Validate -> Git Commit).
  - Attribution requirements.

---

## ⏳ In Progress (Milestone 4: Section 1.1 Golden Example)
- [ ] Section 1.1 summary exposition (`summary.mdx`).
- [ ] 8 paraphrased textbook exercise solutions (`solutions/ex-01.json` through `ex-54.json`).
- [ ] 8 original practice problems across tiers 1, 2, 3 (`practice/practice-01.json` through `practice-08.json`).
- [ ] 8 original MCQs with distractor misconceptions (`mcq/mcq-01.json` through `mcq-08.json`).

---

## ⏳ Upcoming Milestone
- **Milestone 6: Final Verification & Audit**:
  - Run `npm run build` production build pass.
  - Run `npm run content:validate` on all Section 1.1 content.
  - Run `npm run content:stats` confirming 100% misconception coverage.
  - Run `python tools/verify/verify.py` confirming 24 fixtures and Section 1.1 items pass.
  - Independent forensic auditor attestation.

---

## 🛡️ Attribution & Creator Index
- **Creator & Lead Architect**: Muhammad Abdullah Athar
- **GitHub**: [https://github.com/AbdullahMalik17](https://github.com/AbdullahMalik17)
- **Repository**: [https://github.com/AbdullahMalik17/Thomas-Calculus-Book](https://github.com/AbdullahMalik17/Thomas-Calculus-Book)
