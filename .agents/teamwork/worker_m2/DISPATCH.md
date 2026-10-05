# Dispatch: Milestone 2 Implementation Worker (Content Schema & Validation)

## Identity
- Role: M2 Implementation Worker
- Archetype: teamwork_preview_worker
- Working Directory: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m2

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Author & Attribution Mandate
Author attribute across all items must be "Muhammad Abdullah Athar".
Attribution link: https://github.com/AbdullahMalik17.

## Reference Materials
- Original Request: d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md
- Project Scope: d:\Thomas-Calculus-Book\PROJECT.md
- Survey 2 Blueprint: d:\Thomas-Calculus-Book\.agents\teamwork\teamwork_preview_explorer_survey_2\handoff.md

## Scope of Work (Exclusive Write Ownership)
Files owned: `calculus-guide/lib/content/schema.ts`, `calculus-guide/scripts/validate-content.ts`, `calculus-guide/scripts/content-stats.ts`, and `calculus-guide/package.json` scripts section.

1. Implement `lib/content/schema.ts`:
   - `DifficultyEnum`: `'tier1' | 'tier2' | 'tier3' | 'easy' | 'medium' | 'hard'`
   - `StatusEnum`: `'draft' | 'in-review' | 'verified' | 'published' | 'deprecated'`
   - `BaseItemSchema`: `id`, `chapter`, `section`, `title`, `difficulty`, `status`, `tags`, `author`, `createdAt`, `updatedAt`
   - `SolutionStepSchema`: `stepNumber`, `title`, `mathExpression`, `explanation`, and mandatory explicit `why` (min 5 characters)
   - `SympyVerificationSchema`: `operation`, `expression`, `expected`, `variable`, `intervals`
   - `SolutionSchema`: `exerciseReference` (matching `/^Section \d+\.\d+, Exercise \d+$/`), `originalTopic`, `problemStatement`, `finalAnswer`, `steps` (min 1), `sympyVerification`
   - `MCQOptionSchema`: `id` in `['A', 'B', 'C', 'D']`, `text`, `explanation`, `misconception`
   - `MCQSchema`: exactly 4 options with IDs A, B, C, D; exactly 1 `correctId`; all 3 distractors must have non-empty `misconception` (min 10 characters)
   - `PracticeProblemSchema`: `problemStatement`, `hints` (min 1), `finalAnswer`, `steps`, `sympyVerification`
   - `ContentItemSchema`: discriminated union on `type`
2. Implement `scripts/validate-content.ts`:
   - Walk all JSON and MDX files in `content/`
   - Assert file path corresponds directly to item `id` (e.g. `ch01-functions/1.1-functions-and-graphs/practice/practice-01.json` -> `id === "ch01-functions/1.1-functions-and-graphs/practice/practice-01"`)
   - Assert no duplicate IDs exist across files
   - Validate against Zod schemas
   - Assert all MCQ guardrails (4 options, 1 correct, 3 distractors with non-empty misconceptions)
   - Assert solution step `why` fields
   - Exit 0 on clean validation, exit 1 on errors
3. Implement `scripts/content-stats.ts`:
   - Collect and display formatted ANSI dashboard: item counts, tier breakdown, step metrics, and 100% misconception coverage percentage
4. Update `package.json` to expose:
   - `"content:validate": "tsx scripts/validate-content.ts"`
   - `"content:stats": "tsx scripts/content-stats.ts"`
   - `"math:verify": "python tools/verify/verify.py"`
5. Verify `npx tsc --noEmit` and ensure scripts execute cleanly.
Write your detailed report to `handoff.md` and message parent when complete.


## 2026-10-05T08:32:47Z
You are teamwork_preview_worker (M2 Implementation Worker: Content Schema & Validation).
Working directory: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m2
Detailed dispatch instructions: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m2\DISPATCH.md
Read the following authoritative references:
- d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md
- d:\Thomas-Calculus-Book\PROJECT.md
- d:\Thomas-Calculus-Book\.agents\teamwork\teamwork_preview_explorer_survey_2\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

ATTRIBUTION REQUIREMENT:
Author attribute across all items must be "Muhammad Abdullah Athar" (https://github.com/AbdullahMalik17).

Implement:
1. lib/content/schema.ts (Zod schemas: DifficultyEnum, StatusEnum, BaseItemSchema, SolutionStepSchema with mandatory why, SympyVerificationSchema, SolutionSchema, MCQOptionSchema, MCQSchema with 4 options, 1 correctId and 3 distractors with non-empty misconceptions, PracticeProblemSchema, ContentItemSchema)
2. scripts/validate-content.ts (direct file path <-> ID mapping assertion, duplicate ID check, Zod validation, MCQ guardrails, step why checks, exit code 0/1)
3. scripts/content-stats.ts (ANSI dashboard with item counts, tiers, step metrics, and 100% misconception coverage)
4. Update package.json scripts: "content:validate", "content:stats", "math:verify"
5. Verify npx tsc --noEmit passes.
Write report to handoff.md and send message when complete.
