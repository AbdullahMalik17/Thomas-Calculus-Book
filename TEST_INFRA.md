# E2E Test Infra: calculus-guide

## Test Philosophy
- Opaque-box, requirement-driven verification covering the full platform lifecycle.
- Zero assumptions on internal code hacks — tests exercise real commands, real web routes, strict schema parsing, and symbolic algebraic checks.
- Zero tolerance for hardcoded facades or integrity violations.

## Feature Inventory & Test Coverage Mapping
| # | Feature | Requirement | Tier 1 (Coverage) | Tier 2 (Boundary) | Tier 3 (Cross-Feature) | Tier 4 (Scenario) |
|---|---------|-------------|:-----------------:|:-----------------:|:----------------------:|:-----------------:|
| F1 | Next.js App Router Scaffolding | R1 | 5 | 5 | ✓ | ✓ |
| F2 | Persistent Attribution Footer | Boundaries | 5 | 5 | ✓ | ✓ |
| F3 | 7 Route Placeholders | R1 | 7 | 5 | ✓ | ✓ |
| F4 | KaTeX Math & MDX Rendering | R1 | 5 | 5 | ✓ | ✓ |
| F5 | Zod Content Schemas | R2 | 6 | 6 | ✓ | ✓ |
| F6 | Content Validation Script | R2 | 5 | 6 | ✓ | ✓ |
| F7 | SymPy Algebraic Verification | R3 | 6 | 6 | ✓ | ✓ |
| F8 | MCQ Distractor Uniqueness | R3 | 5 | 5 | ✓ | ✓ |
| F9 | Calculus Payloads (Domain/Diff/Int) | R3 | 5 | 5 | ✓ | ✓ |
| F10 | Section 1.1 Golden Example | R4 | 8 | 5 | ✓ | ✓ |
| F11 | Multi-Agent Infrastructure | R5 | 5 | 5 | ✓ | ✓ |

## Test Architecture
1. **Build & Route Verification**:
   - Command: `npm run build`
   - Verification: Produces static/server chunks with 0 errors, renders all 7 route endpoints with KaTeX math CSS and persistent footer.
2. **Schema & Content Guardrails**:
   - Command: `npm run content:validate`
   - Verification: Checks file path to ID mapping, uniqueness, 4 options, 1 correct + 3 distractors with non-empty misconception explanations, solution steps with "why".
3. **Repository Statistics**:
   - Command: `npm run content:stats`
   - Verification: Confirms 100% misconception coverage and difficulty tier distribution.
4. **Symbolic Mathematical Engine**:
   - Command: `python tools/verify/verify.py`
   - Verification: 24 edge-case fixtures and Section 1.1 validation, exit code 0.
5. **E2E Test Runner**:
   - Script: `scripts/test-e2e.ts` (runs all checks sequentially and generates an acceptance report).

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Expected Outcome |
|---|----------|--------------------|------------------|
| 1 | Student Study Flow | F1, F3, F4, F10 | Section 1.1 summary renders definitions, theorems, piecewise functions, and KaTeX notation without hydration or styling bugs. |
| 2 | Practice Problem Solving | F4, F5, F10 | Student expands progressive hints for Tier 1-3 practice problems and inspects multi-step solutions with explicit "why" rationales. |
| 3 | Interactive Quiz & Misconception Diagnosis | F5, F6, F8, F10 | Student selects an incorrect MCQ distractor and receives the targeted cognitive misconception explanation. |
| 4 | Mathematical Integrity Audit | F7, F8, F9, F10 | SymPy verification engine symbolically proves all exercise answers are algebraically identical to solutions and all distractors are distinct. |
| 5 | Author Attribution & SEO/AEO Discovery | F1, F2, F3 | Every page includes persistent footer linking to Muhammad Abdullah Athar (`https://github.com/AbdullahMalik17`), valid JSON-LD, `llms.txt`, and `robots.txt`. |
