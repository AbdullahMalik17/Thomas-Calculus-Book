# Original User Request

## 2026-10-05T07:39:20Z

Build the foundational architecture for `calculus-guide`: an interactive Next.js study platform for Thomas' Calculus (14th Edition) with verifiable math, automated validation pipelines, and a verified Golden Example (Chapter 1, Section 1.1).

Working directory: d:\Thomas-Calculus-Book\calculus-guide
Integrity mode: development

## Operational Boundaries & Attribution
- **Creator & Attribution**: Made by Muhammad Abdullah Athar (GitHub: `https://github.com/AbdullahMalik17`). Every page must contain a persistent global footer: `"Made by Muhammad Abdullah Athar"` linking to the GitHub profile. Include JSON-LD and page metadata authoring attributed to Muhammad Abdullah Athar.
- **Copyright Safeguards**: Never copy textbook problem statements, descriptions, or figures verbatim. Paraphrase all exercises with references strictly by identifier (e.g., "Section 1.1, Exercise 21"). Generate original practice sets and MCQs. Gitignore `source/` (do not commit raw PDF pages or extracted raster assets).
- **Scope**: Golden Example Pattern — build out infrastructure, verification tools, Section 1.1 reference standard, and agent definitions. Do not attempt all 16 chapters in this run.

## Requirements

### R1. Project & Environment Scaffolding
- Initialize project in `calculus-guide/` with `.gitignore` excluding `node_modules/`, `.next/`, `source/`, and python virtual environments.
- Create `PROGRESS.md` (Status Dashboard, Done, In Progress, Blocked) and `CLAUDE.md` documenting attribution, legal boundaries, schema contracts, and math verification standards.
- Provide `scripts/extract_pages.sh` leveraging `pdftoppm` and `pdftotext` to export target page ranges from the textbook PDF.
- Scaffold Next.js App Router (TypeScript, Tailwind CSS, MDX with `remark-math` and `rehype-katex`, `katex/dist/katex.min.css` in root layout).
- Persistent global footer with attribution to Muhammad Abdullah Athar.
- Setup route placeholders: `/`, `/chapters/[ch]`, `/chapters/[ch]/[section]`, `/practice/[section]`, `/quiz/[chapter]`, `/dashboard`, `/about`.

### R2. Schema Definition & Content Guardrails
- Define strict Zod schemas in `lib/content/schema.ts` (`DifficultyEnum`, `StatusEnum`, `BaseItemSchema`, `SolutionSchema`, `MCQSchema`).
- Implement `scripts/validate-content.ts` asserting:
  - File path corresponds directly to item `id`.
  - Every MCQ contains exactly 1 valid `correctId` and 3 distractors, each having a non-empty `misconception` property.
  - No duplicate IDs exist across files.
- Expose npm scripts: `npm run content:validate` and `npm run content:stats`.

### R3. Automated SymPy Math Verification Engine
- Implement a standalone Python verification CLI under `tools/verify/` using SymPy.
- Implement subcommands / verification operations:
  - Symbolic algebraic equivalence check (`simplify(expr - expected) == 0`).
  - MCQ verification confirming `correctId` matches expected evaluation and distractors are mathematically non-equivalent.
  - Domain, derivative, and integral checks via JSON payload.
- Create automated test suite with at least 20 test fixtures covering edge cases (factoring, expansion, trig identities).

### R4. Golden Example Reference Implementation (Section 1.1)
- In `content/ch01-functions/1.1-functions-and-graphs/`:
  - `summary.mdx`: Original definitions, theorems, domain/range, piecewise functions, symmetry tests, and common pitfalls.
  - Paraphrased solutions for text-only exercises with numbered steps and explicit "why" annotations.
  - 8 original practice problems across difficulty tiers 1, 2, and 3 with hints.
  - 8 original MCQs with explicit misconception metadata for every incorrect distractor.

### R5. Multi-Agent Infrastructure & Documentation
- Define subagent prompt templates in `.claude/agents/`:
  - `chNN-writer.md` (strict file-scoping rules: edit only `content/chNN-*/`).
  - `math-verifier.md` (read-only execution agent for SymPy tooling).
  - `content-reviewer.md` (audit agent checking copyright compliance, pedagogy, and schema requirements).
- Provide `docs/STYLE_GUIDE.md` and `docs/SOURCE_WORKFLOW.md`.

## Acceptance Criteria

### Build & Code Quality
- [ ] `npm run build` completes with exit code 0 (zero type, lint, or hydration errors).
- [ ] Next.js app renders all route placeholders, KaTeX math displays correctly, and persistent footer is present with link to `https://github.com/AbdullahMalik17`.

### Content Validation & Guardrails
- [ ] `npm run content:validate` runs cleanly with exit code 0 on all Section 1.1 content.
- [ ] All Section 1.1 MCQs have exactly 1 correct answer and 3 distractors with non-empty misconception explanations.
- [ ] Paraphrased exercise solutions include multi-step rationales with explicit "why" fields.

### Math Verification
- [ ] `python tools/verify/verify.py` passes with exit code 0 and verifies at least 20 algebraic edge-case test fixtures.
- [ ] Math verification CLI successfully validates Section 1.1 exercise answers and MCQs.

### Subagent Profiles & Documentation
- [ ] `.claude/agents/chNN-writer.md`, `math-verifier.md`, and `content-reviewer.md` exist and specify scoped operational boundaries.
- [ ] `PROGRESS.md`, `CLAUDE.md`, `docs/STYLE_GUIDE.md`, and `docs/SOURCE_WORKFLOW.md` are documented with Section 1.1 metrics.


## Follow-up — 2026-10-05T07:53:32Z

User Directive: "Use all the skills that are present in the skills"

Please ensure the Orchestrator and all implementing agents actively apply the relevant skills available in the environment to the calculus-guide platform:
1. `modern-web-guidance`: Apply modern web standards for Next.js App Router, CSS styling, responsive layout, and performance.
2. `agency-ux-architect` & `agency-ui-designer`: Build a cohesive design token system in Tailwind CSS, responsive layouts, clear visual hierarchy for formulas and proofs, and intuitive navigation.
3. `agency-ui-finish-gate-reviewer`: Enforce a high aesthetic finish gate to ensure the UI feels like a premier modern math learning platform rather than a generic template.
4. `agency-brand-guardian`: Enforce persistent author branding & attribution to Muhammad Abdullah Athar (GitHub: https://github.com/AbdullahMalik17) in global footers, page headers, metadata, and JSON-LD structured data.
5. `agency-aeo-foundations-architect` & `agency-seo-specialist`: Implement `public/llms.txt`, AI-aware `robots.txt`, OpenGraph/meta tags, and structured JSON-LD schemas so search and AI citation engines can discover and cite the content.
6. `a11y-debugging` / Accessibility: Ensure semantic HTML, WCAG AA color contrast, ARIA labels for interactive MCQ options and quizzes, and keyboard accessibility.
7. `generative_ui`: Provide interactive visual components (e.g. interactive SVG/Canvas graphing for functions like piecewise definitions and domain/range visualizers).
8. `agency-content-creator`: Ensure engaging, rigorous, original mathematical pedagogical prose in Section 1.1 with deep conceptual explanations and clear step-by-step reasoning.
