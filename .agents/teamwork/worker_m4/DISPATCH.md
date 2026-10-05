# Dispatch: Milestone 4 Implementation Worker (Section 1.1 Golden Example)

## Identity
- Role: M4 Implementation Worker
- Archetype: teamwork_preview_worker
- Working Directory: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m4

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Author & Attribution Mandate
Author attribute across all items must be "Muhammad Abdullah Athar".
Attribution link: https://github.com/AbdullahMalik17.

## Copyright Safeguards (CRITICAL)
Never copy textbook problem statements, descriptions, or figures verbatim. Paraphrase all exercises with references strictly by identifier (e.g., "Section 1.1, Exercise 1"). Generate original practice sets and MCQs.

## Skills to Apply
1. `agency-content-creator` (`d:\Thomas-Calculus-Book\.agents\skills\marketing-content-creator\SKILL.md`): Ensure engaging, rigorous, original mathematical pedagogical prose in Section 1.1 with deep conceptual explanations and clear step-by-step reasoning.
2. `generative_ui`: In `summary.mdx`, include clear KaTeX display blocks for piecewise function definitions, domain/range interval notation, and symmetry test tables.

## Reference Materials
- Original Request: d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md
- Project Scope: d:\Thomas-Calculus-Book\PROJECT.md
- Survey 2 Blueprint (Section 4.4): d:\Thomas-Calculus-Book\.agents\teamwork\teamwork_preview_explorer_survey_2\handoff.md
- Zod Schema: `calculus-guide/lib/content/schema.ts`
- SymPy Verification: `calculus-guide/tools/verify/`

## Scope of Work (Exclusive Write Ownership)
Files owned: `calculus-guide/content/ch01-functions/1.1-functions-and-graphs/**`

1. Create `calculus-guide/content/ch01-functions/1.1-functions-and-graphs/summary.mdx`:
   - Rigorous mathematical exposition: Definition of function, domain, range, input-output pairs.
   - Natural domain principles (denominators != 0, radicands of even roots >= 0).
   - Visualizing functions, Cartesian graphs, Vertical Line Test.
   - Piecewise-defined functions, absolute value function $|x|$, greatest integer / floor function $\lfloor x \rfloor$.
   - Symmetry tests: Even functions ($f(-x) = f(x)$, y-axis symmetry) and Odd functions ($f(-x) = -f(x)$, origin symmetry).
   - Common function types catalogue (linear, power, polynomial, rational, algebraic, transcendental).
   - Common pitfalls alert (simplifying before domain, parity misconception, piecewise boundary evaluation).
2. Create 8 paraphrased textbook solutions in `solutions/`:
   - `ex-01.json` (Sec 1.1, Ex 1: $f(x) = 1 + x^2$, domain $(-\infty, \infty)$, range $[1, \infty)$)
   - `ex-02.json` (Sec 1.1, Ex 2: $f(x) = 1 - \sqrt{x}$, domain $[0, \infty)$, range $(-\infty, 1]$)
   - `ex-03.json` (Sec 1.1, Ex 3: $F(x) = \sqrt{5x+10}$, domain $[-2, \infty)$, range $[0, \infty)$)
   - `ex-04.json` (Sec 1.1, Ex 4: $g(x) = \sqrt{x^2 - 3x}$, domain $(-\infty, 0] \cup [3, \infty)$, range $[0, \infty)$)
   - `ex-05.json` (Sec 1.1, Ex 5: $f(t) = 4/(3-t)$, domain $(-\infty, 3) \cup (3, \infty)$, range $(-\infty, 0) \cup (0, \infty)$)
   - `ex-06.json` (Sec 1.1, Ex 6: $G(t) = 2/(t^2-16)$, domain $\mathbb{R} \setminus \{-4, 4\}$, range $(-\infty, -1/8] \cup (0, \infty)$)
   - `ex-51.json` (Sec 1.1, Ex 51: $g(x) = x^3 + x$, Odd function with origin symmetry)
   - `ex-54.json` (Sec 1.1, Ex 54: $g(x) = x/(x^2-1)$, Odd function with origin symmetry)
   - *Requirement*: Every step has positive `stepNumber`, `title`, `mathExpression`, `explanation`, and explicit `why` field (min 5 chars).
   - *Requirement*: `exerciseReference` strictly formatted as `"Section 1.1, Exercise N"`.
   - *Requirement*: Attach `sympyVerification` payload.
3. Create 8 original practice problems in `practice/` across tiers 1, 2, 3:
   - `practice-01.json` (Tier 1: Linear radicand domain & range $f(x) = \sqrt{4-2x}$)
   - `practice-02.json` (Tier 1: Rational function domain $g(x) = (3x+1)/(x^2-9)$)
   - `practice-03.json` (Tier 1: Symmetry test $h(x) = x^3/(x^2+4)$)
   - `practice-04.json` (Tier 2: Radical in denominator $f(x) = 1/\sqrt{x^2-5x+6}$)
   - `practice-05.json` (Tier 2: Piecewise function evaluation & boundary continuity)
   - `practice-06.json` (Tier 2: Applied geometric modeling: inscribed rectangle under parabola $y = 9 - x^2$)
   - `practice-07.json` (Tier 3: Even/Odd function decomposition of $f(x) = (x+2)/(x+1)$)
   - `practice-08.json` (Tier 3: Dual radicand inequality system domain of $f(x) = \sqrt{(x-1)/(x+3)} + \sqrt{(4-x)/(x+1)}$)
   - *Requirement*: Progressive `hints` (min 1 hint), step-by-step solution with `why`, and `sympyVerification`.
4. Create 8 original MCQs in `mcq/`:
   - `mcq-01.json` through `mcq-08.json`
   - *Requirement*: Exactly 4 options (A, B, C, D), exactly 1 `correctId`, and all 3 distractors have non-empty, authentic cognitive `misconception` metadata (min 10 characters).
   - *Requirement*: Attach `sympyVerification`.
5. Verification:
   - Run `npm run content:validate` in `calculus-guide/` -> exit code 0.
   - Run `npm run content:stats` in `calculus-guide/` -> confirms 100% misconception coverage.
   - Run `python tools/verify/verify.py` in `calculus-guide/` -> exit code 0, validates Section 1.1.
Write your detailed report to `handoff.md` and message parent when complete.

## 2026-10-05T08:48:40Z
You are teamwork_preview_worker (M4 Implementation Worker: Section 1.1 Golden Example).
Working directory: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m4
Detailed dispatch instructions: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m4\DISPATCH.md
Read the authoritative references:
- d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md
- d:\Thomas-Calculus-Book\PROJECT.md
- d:\Thomas-Calculus-Book\.agents\teamwork\teamwork_preview_explorer_survey_2\handoff.md (especially Section 4.4)
- d:\Thomas-Calculus-Book\calculus-guide\lib\content\schema.ts

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

ATTRIBUTION & COPYRIGHT MANDATE:
Author is "Muhammad Abdullah Athar" (https://github.com/AbdullahMalik17).
Never copy textbook problem statements verbatim. Paraphrase all exercises referencing identifiers ("Section 1.1, Exercise N"). Create original practice sets and MCQs.

Implement in content/ch01-functions/1.1-functions-and-graphs/:
1. summary.mdx (exposition on function definitions, domain, range, vertical line test, piecewise functions, symmetry tests, catalogue of basic functions, common pitfalls)
2. solutions/ (8 paraphrased exercise solutions: ex-01.json, ex-02.json, ex-03.json, ex-04.json, ex-05.json, ex-06.json, ex-51.json, ex-54.json with numbered steps and explicit "why" annotations)
3. practice/ (8 original practice problems across tiers 1, 2, 3 with hints and solutions: practice-01.json through practice-08.json)
4. mcq/ (8 original MCQs with 4 options, 1 correctId, and 3 distractors with non-empty misconceptions: mcq-01.json through mcq-08.json)
5. Run npm run content:validate, npm run content:stats, and python tools/verify/verify.py.
Write report to handoff.md and send message when complete.
