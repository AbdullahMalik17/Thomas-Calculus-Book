# Dispatch: Milestone 5 Implementation Worker (Multi-Agent Infrastructure & Documentation)

## Identity
- Role: M5 Implementation Worker
- Archetype: teamwork_preview_worker
- Working Directory: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m5

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Author & Attribution Mandate
Attribution to Muhammad Abdullah Athar (https://github.com/AbdullahMalik17) in all prompt templates and documentation.

## Reference Materials
- Original Request: d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md
- Project Scope: d:\Thomas-Calculus-Book\PROJECT.md
- Survey 3 Blueprint (Section 2, Steps 6 & 7): d:\Thomas-Calculus-Book\.agents\teamwork\teamwork_preview_explorer_survey_3\handoff.md

## Scope of Work (Exclusive Write Ownership)
Files owned: `calculus-guide/.claude/agents/**`, `calculus-guide/docs/**`, and update `calculus-guide/PROGRESS.md`.

1. Implement `.claude/agents/chNN-writer.md`:
   - Mission: Scoped chapter writer agent for chapter NN.
   - Strict File-Scoping: Allowed only to create/edit in `content/chNN-*/**`. Forbidden from touching other chapters, schemas, or application code.
   - Copyright safeguards: Paraphrase all exercises, identifier references only, original practice problems and MCQs.
   - Schema conformance: Validates against `lib/content/schema.ts`. Solutions require numbered steps with explicit "why" annotations. MCQs require 1 correctId + 3 distractors with misconception metadata.
   - Attribution: Muhammad Abdullah Athar (`https://github.com/AbdullahMalik17`).
2. Implement `.claude/agents/math-verifier.md`:
   - Mission: Independent mathematical verification agent.
   - Operational Boundary: READ-ONLY execution agent. Strictly forbidden from modifying content or code.
   - Workflow: Executes `python tools/verify/verify.py` against test fixtures and chapter items. Verifies symbolic algebraic equivalence, MCQ option evaluation, distractor mathematical non-equivalence, and distractor uniqueness. Outputs mathematical audit report.
3. Implement `.claude/agents/content-reviewer.md`:
   - Mission: Content, pedagogy, copyright, and schema audit gatekeeper.
   - 4-Pillar Review Rubric:
     1. Copyright & Source Compliance (0 verbatim text, `source/` gitignored).
     2. Schema & Structural Integrity (`npm run content:validate`, path-to-ID mapping, uniqueness).
     3. Pedagogical Quality (meaningful "why" fields, authentic cognitive misconceptions, tier 1-3 coverage).
     4. Attribution & Metadata (persistent footer, JSON-LD, metadata).
4. Implement `docs/STYLE_GUIDE.md`:
   - KaTeX math standards (fractions, derivatives, integrals, interval notation).
   - MDX typography, callouts (Definition, Theorem, Pitfall, Example), and Tailwind color tokens.
   - Solution format with `stepNumber`, `title`, `mathExpression`, `explanation`, and explicit `why`.
   - MCQ format with 4 options and distractor misconception specifications.
   - Author attribution rules.
5. Implement `docs/SOURCE_WORKFLOW.md`:
   - PDF extraction via `scripts/extract_pages.sh` / `scripts/extract_pages.py`.
   - Storage in `source/` (strictly gitignored).
   - Paraphrasing and exercise mapping guidelines.
   - Verification workflow: writer -> verifier -> reviewer -> git commit.
6. Update `PROGRESS.md`:
   - Status Dashboard: Section 1.1 Golden Example metrics, completed components, passing validation results.
Write your detailed report to `handoff.md` and message parent when complete.

## 2026-10-05T08:48:40Z
You are teamwork_preview_worker (M5 Implementation Worker: Multi-Agent Infrastructure & Docs).
Working directory: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m5
Detailed dispatch instructions: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m5\DISPATCH.md
Read the authoritative references:
- d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md
- d:\Thomas-Calculus-Book\PROJECT.md
- d:\Thomas-Calculus-Book\.agents\teamwork\teamwork_preview_explorer_survey_3\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

ATTRIBUTION REQUIREMENT:
Attribution to Muhammad Abdullah Athar (https://github.com/AbdullahMalik17) in all prompt templates and documentation.

Implement under calculus-guide/:
1. .claude/agents/chNN-writer.md (strict file scoping to content/chNN-*/**, copyright rules, schema validation, step why and MCQ misconception requirements)
2. .claude/agents/math-verifier.md (read-only execution agent for SymPy verify.py, mathematical non-equivalence checks)
3. .claude/agents/content-reviewer.md (4-pillar audit gate: copyright, schema, pedagogy, attribution)
4. docs/STYLE_GUIDE.md (KaTeX standards, callouts, solution steps with "why", MCQ formulation)
5. docs/SOURCE_WORKFLOW.md (PDF extraction, copyright boundaries, authoring lifecycle)
6. Update PROGRESS.md with full Section 1.1 metrics.
Write report to handoff.md and send message when complete.
