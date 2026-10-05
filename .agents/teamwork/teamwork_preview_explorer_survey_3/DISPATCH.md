# Dispatch: Math Verification & Agent Infrastructure Explorer (Survey 3)

## Identity
- Role: Math Verification & Agent Infrastructure Explorer
- Archetype: teamwork_preview_explorer
- Working Directory: d:\Thomas-Calculus-Book\.agents\teamwork\teamwork_preview_explorer_survey_3

## Objective
Survey the requirements for Automated SymPy Math Verification Engine (R3), Multi-Agent Infrastructure & Documentation (R5), and overall Acceptance Criteria.

## Source of Truth & Inputs
- Original Request: d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md
- Workspace Root: d:\Thomas-Calculus-Book
- Target App Directory: d:\Thomas-Calculus-Book\calculus-guide

## Specific Instructions
1. Read `ORIGINAL_REQUEST.md`.
2. Analyze requirements for standalone Python verification CLI under `tools/verify/` using SymPy:
   - CLI design, entrypoints, virtual environment / dependencies setup.
   - Symbolic algebraic equivalence check: `simplify(expr - expected) == 0`.
   - MCQ verification: confirming `correctId` matches expected evaluation, and distractors are mathematically non-equivalent.
   - Domain, derivative, and integral checks via JSON payload.
   - Automated test suite with >= 20 test fixtures covering edge cases (factoring, expansion, trig identities).
   - How CLI validates Section 1.1 exercises & MCQs.
3. Analyze requirements for subagent prompt templates in `.claude/agents/`:
   - `chNN-writer.md` (strict file-scoping: edit only `content/chNN-*/`)
   - `math-verifier.md` (read-only execution agent for SymPy tooling)
   - `content-reviewer.md` (audit agent checking copyright compliance, pedagogy, schema)
   - `docs/STYLE_GUIDE.md` and `docs/SOURCE_WORKFLOW.md`
4. Formulate the technical specifications, architecture, and feature inventory mapping in `handoff.md` and keep `progress.md` updated in your working directory. Send a message to parent when done.


## 2026-10-05T07:42:13Z
You are teamwork_preview_explorer (Survey 3: Math Verification & Agent Infrastructure Explorer).
Your working directory is: d:\Thomas-Calculus-Book\.agents\teamwork\teamwork_preview_explorer_survey_3
Your task instructions are detailed in: d:\Thomas-Calculus-Book\.agents\teamwork\teamwork_preview_explorer_survey_3\DISPATCH.md
Also read the original request: d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md

Investigate R3 (SymPy verification CLI tools/verify/, algebraic equivalence, MCQ verification, domain/derivative/integral JSON payloads, >= 20 edge-case test fixtures) and R5 (subagent prompt templates in .claude/agents/, docs/STYLE_GUIDE.md, docs/SOURCE_WORKFLOW.md, acceptance criteria).
Maintain progress.md in your working directory.
When complete, write your comprehensive report to handoff.md in your working directory, and send a message back to parent.
