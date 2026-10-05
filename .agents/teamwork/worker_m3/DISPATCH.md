# Dispatch: Milestone 3 Implementation Worker (SymPy Math Verification Engine)

## Identity
- Role: M3 Implementation Worker
- Archetype: teamwork_preview_worker
- Working Directory: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m3

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Author & Attribution Mandate
Attribution to Muhammad Abdullah Athar (https://github.com/AbdullahMalik17) in CLI banners and documentation.

## Reference Materials
- Original Request: d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md
- Project Scope: d:\Thomas-Calculus-Book\PROJECT.md
- Survey 3 Blueprint: d:\Thomas-Calculus-Book\.agents\teamwork\teamwork_preview_explorer_survey_3\handoff.md

## Scope of Work (Exclusive Write Ownership)
Files owned: `calculus-guide/tools/verify/**`.

1. Implement `calculus-guide/tools/verify/engine.py`:
   - Safe expression parser using SymPy with transformations (implicit multiplication, XOR power conversion)
   - Simplification cascade: AST comparison -> `simplify(expr - expected) == 0` -> `together()` / `cancel()` -> `trigsimp()` -> `radsimp()` -> `expand_log(force=True)` -> `.equals(0)` numerical probe
2. Implement `calculus-guide/tools/verify/mcq_verifier.py`:
   - Asserts exactly 4 options with IDs A, B, C, D
   - Asserts `correctId` evaluates to expected solution
   - Asserts all 3 distractors are mathematically non-equivalent to the correct answer (`simplify(distractor - correct) != 0`)
   - Asserts all distractors are mutually non-equivalent to each other
   - Asserts every distractor has a non-empty `misconception` string
3. Implement `calculus-guide/tools/verify/calculus_verifier.py`:
   - Continuous real domain set equality check (using `continuous_domain` and interval parsing)
   - Difference quotient and derivative check
   - Indefinite integral check (via FTC `diff(expected, x) - expr == 0`) and definite integrals
   - Symmetry verification: even ($f(-x) - f(x) == 0$) and odd ($f(-x) + f(x) == 0$)
4. Implement `calculus-guide/tools/verify/fixtures.py`:
   - 24 edge-case test fixtures covering factoring, expansion, rational functions, trig identities, radicals, logs/exponents, calculus operations, and negative distractor tests
5. Implement `calculus-guide/tools/verify/section_validator.py`:
   - Scans a section content directory (solutions, practice, mcqs) and evaluates all `sympyVerification` payloads
6. Implement `calculus-guide/tools/verify/verify.py`:
   - Standalone CLI entrypoint. When invoked with zero arguments: runs all 24 fixtures and validates Section 1.1 content if available; exits with code 0 on pass, code 1 on fail
   - CLI subcommands for `test`, `verify-expr`, `verify-mcq`, `validate-section`
7. Create `requirements.txt` (`sympy>=1.12.0`, `mpmath>=1.3.0`) and `README.md`
8. Verify execution: Run `python tools/verify/verify.py` and ensure exit code 0 with all 24 fixtures passing.
Write your detailed report to `handoff.md` and message parent when complete.


## 2026-10-05T08:32:47Z
Message from 7bab1d68-abbc-476d-958e-f8e722650076:
You are teamwork_preview_worker (M3 Implementation Worker: SymPy Math Verification Engine).
Working directory: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m3
Detailed dispatch instructions: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m3\DISPATCH.md
Read the following authoritative references:
- d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md
- d:\Thomas-Calculus-Book\PROJECT.md
- d:\Thomas-Calculus-Book\.agents\teamwork\teamwork_preview_explorer_survey_3\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

ATTRIBUTION REQUIREMENT:
Attribution to Muhammad Abdullah Athar (https://github.com/AbdullahMalik17) in CLI banners and documentation.

Implement under calculus-guide/tools/verify/:
1. engine.py (SymPy parser, simplification cascade: AST, simplify, together, cancel, trigsimp, radsimp, expand_log, equals(0))
2. mcq_verifier.py (4 options, correctId match, distractors mathematically non-equivalent to correct and each other, misconception presence)
3. calculus_verifier.py (continuous domain set equality, difference quotient/derivative, integral FTC check, symmetry tests)
4. fixtures.py (24 edge-case test fixtures covering factoring, expansion, rational, trig, radicals, logs/exponents, calculus, MCQ negative tests)
5. section_validator.py (validates chapter/section content items)
6. verify.py (standalone CLI, zero-argument run executes all 24 fixtures and section items, exit code 0)
7. requirements.txt and README.md
Verify python tools/verify/verify.py passes with exit code 0.
Write report to handoff.md and send message when complete.
