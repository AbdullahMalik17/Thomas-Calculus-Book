# Handoff Report: Math Verification & Agent Infrastructure Survey (Survey 3)

**Author**: `teamwork_preview_explorer` (Survey 3: Math Verification & Agent Infrastructure Explorer)  
**Date**: 2026-10-05T07:49:00Z  
**Target Work Items**: R3 (Automated SymPy Math Verification Engine), R5 (Multi-Agent Infrastructure & Documentation), Acceptance Criteria  
**Destination**: Project Orchestrator (`orchestrator_1`), Implementation Agents for M3 & M5  

---

## 1. Observation

### 1.1 Toolchain & Runtime Environment Observations
- **Python Version**: Python 3.14.6 (`tags/v3.14.6:c63aec6, Jun 10 2026, 10:26:10 [MSC v.1944 64 bit (AMD64)]`).
- **Global PyTest**: `pytest 9.1.1` is pre-installed.
- **SymPy Installation**: SymPy was initially not installed globally. Running `python -m pip install sympy` successfully installed `sympy-1.14.0` and `mpmath-1.3.0` into the user environment (`C:\Users\HP\AppData\Roaming\Python\Python314\site-packages`).
- **Workspace State**: `d:\Thomas-Calculus-Book\` contains `Thomas-Calculus-14th-Edition-[konkur.in].pdf` and `.agents/`. The Next.js application directory `calculus-guide/` has not yet been initialized (currently in Step 0 Survey phase prior to Milestone 1 scaffolding).

### 1.2 Verbatim Requirements from `ORIGINAL_REQUEST.md`
- **R3. Automated SymPy Math Verification Engine**:
  > - Implement a standalone Python verification CLI under `tools/verify/` using SymPy.
  > - Implement subcommands / verification operations:
  >   - Symbolic algebraic equivalence check (`simplify(expr - expected) == 0`).
  >   - MCQ verification confirming `correctId` matches expected evaluation and distractors are mathematically non-equivalent.
  >   - Domain, derivative, and integral checks via JSON payload.
  > - Create automated test suite with at least 20 test fixtures covering edge cases (factoring, expansion, trig identities).
- **R5. Multi-Agent Infrastructure & Documentation**:
  > - Define subagent prompt templates in `.claude/agents/`:
  >   - `chNN-writer.md` (strict file-scoping rules: edit only `content/chNN-*/`).
  >   - `math-verifier.md` (read-only execution agent for SymPy tooling).
  >   - `content-reviewer.md` (audit agent checking copyright compliance, pedagogy, and schema requirements).
  > - Provide `docs/STYLE_GUIDE.md` and `docs/SOURCE_WORKFLOW.md`.
- **Attribution & Legal Boundaries**:
  > - Made by Muhammad Abdullah Athar (GitHub: `https://github.com/AbdullahMalik17`). Every page must contain a persistent global footer: `"Made by Muhammad Abdullah Athar"` linking to the GitHub profile. Include JSON-LD and page metadata authoring attributed to Muhammad Abdullah Athar.
  > - Never copy textbook problem statements, descriptions, or figures verbatim. Paraphrase all exercises with references strictly by identifier (e.g., "Section 1.1, Exercise 21"). Generate original practice sets and MCQs. Gitignore `source/`.
- **Acceptance Criteria for Math Verification & Subagent Profiles**:
  > - `python tools/verify/verify.py` passes with exit code 0 and verifies at least 20 algebraic edge-case test fixtures.
  > - Math verification CLI successfully validates Section 1.1 exercise answers and MCQs.
  > - `.claude/agents/chNN-writer.md`, `math-verifier.md`, and `content-reviewer.md` exist and specify scoped operational boundaries.
  > - `PROGRESS.md`, `CLAUDE.md`, `docs/STYLE_GUIDE.md`, and `docs/SOURCE_WORKFLOW.md` are documented with Section 1.1 metrics.

---

## 2. Logic Chain

```
[Observation: Python 3.14.6 + SymPy 1.14.0 Available]
                      │
                      ▼
[Step 1: Standalone CLI Architecture in tools/verify/]
                      │
                      ▼
[Step 2: SymPy Robust Simplification Cascade (simplify, trigsimp, radsimp, equals)]
                      │
                      ▼
[Step 3: MCQ Non-Equivalence Engine (correctId check + distractor separation)]
                      │
                      ▼
[Step 4: Calculus JSON Payloads (Domain, Derivative, Integral, Symmetry)]
                      │
                      ▼
[Step 5: 24 Edge-Case Test Fixtures (exceeds >= 20 requirement)]
                      │
                      ▼
[Step 6: Subagent Prompt Architecture in .claude/agents/]
                      │
                      ▼
[Step 7: Documentation Standards (STYLE_GUIDE.md & SOURCE_WORKFLOW.md)]
                      │
                      ▼
[Conclusion & Implementation Blueprint for M3 and M5]
```

### Step 1: Architecture of `tools/verify/`
To ensure clean isolation, reproducibility, and compliance with acceptance criteria:
- **Location**: `tools/verify/` inside `calculus-guide/tools/verify/` (or repository root `tools/verify/`, with symlink or relative path resolution; the prompt specifies `tools/verify/`).
- **File Layout**:
  ```
  tools/verify/
  ├── __init__.py
  ├── verify.py               # Main CLI executable; runs test fixtures on 0 args; subcommands for operations
  ├── engine.py               # Core SymPy algebraic & calculus algorithms
  ├── mcq_verifier.py         # MCQ options & distractor uniqueness validator
  ├── calculus_verifier.py    # Domain, derivative, integral, difference quotient validator
  ├── section_validator.py    # Scanner & validator for Section 1.1 content files
  ├── fixtures.py             # 24 comprehensive edge-case test fixtures
  ├── test_verify.py          # Pytest test suite (invoked via pytest or verify.py --test)
  ├── requirements.txt        # sympy>=1.12, mpmath>=1.3.0
  └── README.md               # Tooling documentation and CLI usage guide
  ```

### Step 2: Symbolic Algebraic Equivalence Simplification Cascade
Checking `expr == expected` directly in SymPy is insufficient because expressions like `(x+1)**2` and `x**2 + 2*x + 1` have different AST structures (`Pow` vs `Add`).
- **Standard formula**: `diff_expr = expr - expected`.
- **Simplification Cascade**:
  1. **Direct AST Equality**: `if expr == expected: return True`
  2. **Polynomial / Rational**: `if diff_expr.simplify() == 0 or diff_expr.together() == 0 or diff_expr.cancel() == 0: return True`
  3. **Trigonometric Identities**: `if diff_expr.trigsimp() == 0: return True`
  4. **Radicals & Algebraic Expressions**: `if diff_expr.radsimp() == 0: return True`
  5. **Logarithms & Powers**: `if diff_expr.expand_log(force=True) == 0 or diff_expr.powsimp() == 0: return True`
  6. **Zero Equivalence Probe**: `if diff_expr.equals(0): return True` (uses randomized numerical evaluation across valid complex/real domain points).
- **Safe Parsing**: Use `sympy.parsing.sympy_parser.parse_expr` with:
  - `standard_transformations`
  - `implicit_multiplication_application` (converts `2x` -> `2*x`)
  - `convert_xor` (converts `x^2` -> `x**2`)
  - Strict sandbox preventing `eval` of unsafe arbitrary Python functions.

### Step 3: MCQ Verification Algorithm & Distractor Separation
A valid multiple-choice question in higher mathematics must satisfy four rigorous criteria:
1. **Option Cardinality**: Exactly 4 options (`A`, `B`, `C`, `D`).
2. **Correct Option Evaluation**: The option corresponding to `correctId` must simplify to the verified solution:
   $$\text{simplify}(\text{Option}_{\text{correctId}} - \text{Expected}) = 0$$
3. **Distractor Non-Equivalence (Correct vs Distractor)**:
   For every distractor $D_i$ ($i \ne \text{correctId}$):
   $$\text{simplify}(D_i - \text{Option}_{\text{correctId}}) \ne 0$$
   *Failure Condition*: If any distractor is algebraically equivalent to the correct answer, the MCQ is invalid (ambiguous question with multiple correct answers).
4. **Distractor Pairwise Distinction (Distractor vs Distractor)**:
   For all distractor pairs $D_i, D_j$ ($i \ne j$):
   $$\text{simplify}(D_i - D_j) \ne 0$$
   *Failure Condition*: If two distractors evaluate to the same mathematical entity, the MCQ is invalid (redundant/duplicate distractors).
5. **Pedagogical Misconception Explanation**:
   Every distractor $D_i$ must have a non-empty `misconception` string explaining the conceptual error leading to that distractor.

### Step 4: Calculus JSON Payloads (Domain, Derivative, Integral, Symmetry)
The CLI must accept structured JSON payloads via `--payload <file.json>` or stdin.

#### A. Domain Payload:
```json
{
  "type": "domain",
  "id": "sec1.1-ex01-domain",
  "expression": "sqrt(x + 1) / (x - 2)",
  "variable": "x",
  "expected_domain": "[-1, 2) U (2, oo)",
  "intervals": [
    {"start": "-1", "end": "2", "left_open": false, "right_open": true},
    {"start": "2", "end": "oo", "left_open": true, "right_open": true}
  ]
}
```
*Verification Logic*: Evaluates `sympy.calculus.util.continuous_domain(expr, x, S.Reals)`. Asserts set equality or symmetric difference is empty: `(computed_domain ^ expected_domain).is_empty`.

#### B. Derivative & Difference Quotient Payload:
```json
{
  "type": "derivative",
  "id": "sec1.1-ex04-diff-quotient",
  "expression": "x^2",
  "variable": "x",
  "operation": "difference_quotient",
  "h_var": "h",
  "expected_quotient": "2*x + h",
  "expected_derivative": "2*x"
}
```
*Verification Logic*:
- Evaluates `quotient = ((expr.subs(x, x+h) - expr) / h).simplify()`.
- Checks `simplify(quotient - expected_quotient) == 0`.
- Evaluates `limit(quotient, h, 0)` and checks `diff(expr, x) == expected_derivative`.

#### C. Integral Payload:
```json
{
  "type": "integral",
  "id": "sample-indefinite-integral",
  "expression": "2*x / (x^2 + 1)",
  "variable": "x",
  "kind": "indefinite",
  "expected": "log(x^2 + 1)"
}
```
*Verification Logic*: Fundamental Theorem of Calculus consistency check:
$$\text{simplify}\left(\frac{d}{dx}[\text{expected}] - \text{expression}\right) == 0$$
For definite integrals: `simplify(integrate(expr, (x, lower, upper)) - expected) == 0`.

#### D. Symmetry Payload (Section 1.1 Golden Example):
```json
{
  "type": "symmetry",
  "id": "sec1.1-ex03-symmetry",
  "expression": "x^3 - x",
  "variable": "x",
  "expected_symmetry": "odd"
}
```
*Verification Logic*:
- Tests `is_even = simplify(expr.subs(x, -x) - expr) == 0`
- Tests `is_odd = simplify(expr.subs(x, -x) + expr) == 0`
- Asserts calculated symmetry equals `expected_symmetry`.

### Step 5: Test Fixtures Inventory (24 Edge Cases)
The requirement mandates *at least 20 test fixtures covering edge cases (factoring, expansion, trig identities)*. We have formulated 24 fixtures across 8 categories:

| # | Category | Expression 1 | Expression 2 | Verification Type | Expected Result |
|---|----------|--------------|--------------|-------------------|-----------------|
| 1 | Factoring | `(x - 3)*(x**2 + 3*x + 9)` | `x**3 - 27` | Algebraic Equiv | PASS (Difference of Cubes) |
| 2 | Factoring | `(2*x + 5)*(3*x - 4)` | `6*x**2 + 7*x - 20` | Algebraic Equiv | PASS (Quadratic Factoring) |
| 3 | Expansion | `(x + 2)**3` | `x**3 + 6*x**2 + 12*x + 8` | Algebraic Equiv | PASS (Binomial Cube) |
| 4 | Expansion | `(x + y + z)**2` | `x**2 + y**2 + z**2 + 2*x*y + 2*x*z + 2*y*z` | Algebraic Equiv | PASS (Trinomial Square) |
| 5 | Rational | `1/(x - 1) - 1/(x + 1)` | `2/(x**2 - 1)` | Algebraic Equiv | PASS (Common Denominator) |
| 6 | Rational | `(1/x + 1/y) / (1/x - 1/y)` | `(y + x)/(y - x)` | Algebraic Equiv | PASS (Complex Fraction) |
| 7 | Rational | `(x**4 - 16)/(x**2 - 4)` | `x**2 + 4` | Algebraic Equiv | PASS (Cancellation) |
| 8 | Trig Identity | `sin(x)**2 + cos(x)**2` | `1` | Algebraic Equiv | PASS (Pythagorean Identity) |
| 9 | Trig Identity | `sin(2*x)` | `2*sin(x)*cos(x)` | Algebraic Equiv | PASS (Double Angle Sine) |
| 10 | Trig Identity | `cos(2*x)` | `cos(x)**2 - sin(x)**2` | Algebraic Equiv | PASS (Double Angle Cosine 1) |
| 11 | Trig Identity | `cos(2*x)` | `1 - 2*sin(x)**2` | Algebraic Equiv | PASS (Double Angle Cosine 2) |
| 12 | Trig Identity | `tan(x + y)` | `(tan(x) + tan(y))/(1 - tan(x)*tan(y))` | Algebraic Equiv | PASS (Tangent Addition) |
| 13 | Radical | `1/(sqrt(x) + sqrt(y))` | `(sqrt(x) - sqrt(y))/(x - y)` | Algebraic Equiv | PASS (Conjugate Rationalization) |
| 14 | Radical | `sqrt(x**2 + 2*x + 1)` | `Abs(x + 1)` | Algebraic Equiv | PASS (Radical Absolute Value) |
| 15 | Radical | `(x**(1/3))*(x**(2/3))` | `x` (for $x > 0$) | Algebraic Equiv | PASS (Fractional Exponents) |
| 16 | Log/Exp | `log(a*b)` | `log(a) + log(b)` (positive) | Algebraic Equiv | PASS (Log Product Rule) |
| 17 | Log/Exp | `log(x**3 / y)` | `3*log(x) - log(y)` (positive) | Algebraic Equiv | PASS (Log Power & Quotient) |
| 18 | Log/Exp | `exp(x + y)` | `exp(x)*exp(y)` | Algebraic Equiv | PASS (Exponential Addition) |
| 19 | Sec 1.1 Calculus | `((x+h)**2 - x**2)/h` | `2*x + h` | Diff Quotient | PASS (Quadratic Diff Quotient) |
| 20 | Sec 1.1 Calculus | `(1/(x+h) - 1/x)/h` | `-1/(x*(x+h))` | Diff Quotient | PASS (Reciprocal Diff Quotient) |
| 21 | Sec 1.1 Domain | `sqrt(9 - x**2)` | `[-3, 3]` | Domain Check | PASS (Interval Equality) |
| 22 | Sec 1.1 Symmetry | `x**3 - 5*x` | `odd` | Symmetry Check | PASS (Odd Function) |
| 23 | MCQ Validation | Valid 4-choice MCQ | 1 correct, 3 distinct | MCQ Verifier | PASS (All distractors distinct) |
| 24 | MCQ Validation | Invalid MCQ (distractor = correct) | Distractor 1 == Correct | MCQ Verifier | EXPECTED FAIL (Catches ambiguity) |

### Step 6: Multi-Agent Prompt Architecture in `.claude/agents/`
Three subagent prompt templates are required in `.claude/agents/`:

#### 1. `.claude/agents/chNN-writer.md`
- **Identity & Mission**: Specialized Chapter Content Writer agent for chapter `chNN`.
- **Strict File-Scoping Boundary**:
  - `AllowPath`: `content/chNN-*/**`
  - `DenyPath`: `lib/**`, `tools/**`, `components/**`, `app/**`, `package.json`, `.claude/**`, and all other `content/chMM-*/**` where $MM \ne NN$.
- **Attribution Guardrail**: Must inject persistent author attribution to Muhammad Abdullah Athar (`https://github.com/AbdullahMalik17`).
- **Copyright Policy**:
  - Never copy textbook problem statements, prose, or figures verbatim.
  - Paraphrase all exercises with references strictly by identifier ("Section 1.1, Exercise 21").
  - Create original practice sets (tiers 1-3) and original MCQs.
- **Schema & Formatting Contract**:
  - Validates output against `lib/content/schema.ts`.
  - Solutions must provide numbered steps with explicit `"why"` annotations.
  - MCQs must contain 1 `correctId` and 3 distractors with non-empty `misconception` explanations.
  - Math expressions in standard LaTeX/KaTeX (`$...$` inline, `$$...$$` display).

#### 2. `.claude/agents/math-verifier.md`
- **Identity & Mission**: Independent Mathematical Verification Agent.
- **Operational Boundary**:
  - **READ-ONLY**: Strictly forbidden from creating, updating, or deleting content files or application source code.
  - **Permitted Tools**: `run_command` with `python tools/verify/verify.py` and read-only inspection tools (`view_file`, `grep_search`).
- **Verification Workflow**:
  1. Executes `python tools/verify/verify.py` on test fixtures to ensure engine integrity.
  2. Runs verification against chapter items: `python tools/verify/verify.py validate-section --dir content/chNN-*/...`.
  3. Verifies symbolic algebraic equivalence of all solutions.
  4. Verifies MCQs: correct evaluation, distractor mathematical non-equivalence, distractor pairwise uniqueness.
  5. Outputs a structured mathematical audit report with symbolic difference expressions for any failed assertions.

#### 3. `.claude/agents/content-reviewer.md`
- **Identity & Mission**: Content, Pedagogy, and Schema Gatekeeper Auditor.
- **Operational Boundary**: Read-only audit across all content, schemas, and git status.
- **Four-Pillar Review Rubric**:
  1. **Copyright & Source Compliance**: Verifies 0 verbatim text duplication against textbook PDF excerpts. Asserts `source/` is properly gitignored.
  2. **Schema & Structural Integrity**: Runs `npm run content:validate`. Asserts file paths match item IDs, no duplicate IDs, exactly 4 MCQ options.
  3. **Pedagogical Quality**: Checks that solution steps have meaningful "why" explanations. Checks that MCQ misconceptions address real cognitive errors. Checks that practice problems cover difficulty tiers 1, 2, and 3.
  4. **Attribution & Metadata**: Asserts persistent footer `"Made by Muhammad Abdullah Athar"` with link to GitHub profile. Checks JSON-LD metadata.
- **Approval Gate**: Emits formal PASS / REVISE verdict with specific line citations.

### Step 7: Documentation Standards
- **`docs/STYLE_GUIDE.md`**:
  - KaTeX math standards: rules for fractions (`\frac`), derivatives (`\frac{df}{dx}`), integrals, interval notation, avoid ambiguous syntax like `1/2x`.
  - MDX component typography and Tailwind color tokens: Definition callouts (`border-blue-500 bg-blue-50/10`), Theorem callouts (`border-emerald-500 bg-emerald-50/10`), Common Pitfall alerts (`border-amber-500 bg-amber-50/10`), Example walkthroughs.
  - Pedagogical solution template: `step`, `action`, `latex`, `why`.
  - MCQ formulation template: Question stem, 4 choices, `correctId`, `misconception` per distractor.
  - Author and attribution specifications.
- **`docs/SOURCE_WORKFLOW.md`**:
  - Step 1: Extraction via `scripts/extract_pages.sh` using `pdftoppm -png` and `pdftotext`.
  - Step 2: Storage policy: Extracted files remain exclusively in `source/` (strictly `.gitignore`d, zero commits of PDF or raw text).
  - Step 3: Paraphrasing pipeline: Transforming textbook exercises into original pedagogical problems referencing identifiers.
  - Step 4: Verification loop: `chNN-writer` -> `math-verifier` (SymPy) -> `content-reviewer` (Schema & Pedagogy) -> Git commit.

---

## 3. Caveats

1. **Python Environment Scope**:
   - SymPy 1.14.0 is installed in the user's Python 3.14.6 environment. When executing on other developer machines or CI environments, a `tools/verify/requirements.txt` file and a virtual environment (`venv`) check should be implemented in `verify.py` to give clear instructions if `sympy` is missing.
2. **Symbolic vs. Branch-Cut Limitations**:
   - SymPy `simplify()` can occasionally be inconclusive for complex multivalued functions (e.g. fractional powers of negative numbers or multivalued logarithms). The simplification cascade solves this by combining `radsimp()`, `trigsimp()`, `expand_log(force=True)`, and numerical random evaluation probe `.equals(0)`.
3. **CLI Exit Code Standard**:
   - The CLI must return exit code 0 if and only if all tests and assertions succeed. Any assertion failure, missing file, or schema error must return exit code 1 to ensure pipeline stoppage in CI/CD.
4. **Integration with TypeScript Validator**:
   - `scripts/validate-content.ts` (R2) will validate JSON and schema types. For math verification, `validate-content.ts` can either invoke Python via child process (`npm run math:verify`) or run as a companion script. Having a dedicated npm script `npm run math:verify` that executes `python tools/verify/verify.py` provides seamless developer UX.

---

## 4. Conclusion

The technical specifications and architectural contracts for **R3 (SymPy Verification Engine)**, **R5 (Multi-Agent Infrastructure & Documentation)**, and **Acceptance Criteria** are completely analyzed, designed, and ready for immediate implementation in Milestones 3 and 5.

### Implementation Checklist & Action Plan:
1. **Milestone 3 (R3 Implementation)**:
   - Create `tools/verify/` with `requirements.txt`, `engine.py`, `mcq_verifier.py`, `calculus_verifier.py`, `fixtures.py`, `section_validator.py`, and `verify.py`.
   - Embed 24 edge-case test fixtures covering factoring, expansion, trig identities, rational functions, radicals, logs/exponents, calculus operations, and distractor negative tests.
   - Implement zero-argument runner: `python tools/verify/verify.py` runs all fixtures and Section 1.1 content, exiting with code 0.
   - Add `npm run math:verify` to `package.json`.
2. **Milestone 5 (R5 Implementation)**:
   - Create `.claude/agents/chNN-writer.md` with strict file scoping to `content/chNN-*/`.
   - Create `.claude/agents/math-verifier.md` with read-only SymPy execution boundaries.
   - Create `.claude/agents/content-reviewer.md` with 4-pillar review rubric.
   - Create `docs/STYLE_GUIDE.md` and `docs/SOURCE_WORKFLOW.md`.
3. **Acceptance Criteria Alignment**:
   - All criteria for math verification and subagent documentation are mapped to deterministic shell commands and inspection gates.

---

## 5. Verification Method

To independently verify this specification and its future implementation:

1. **Verify Python & SymPy Runtime**:
   ```bash
   python -c "import sympy; print('SymPy:', sympy.__version__)"
   ```
   *Expected Output*: `SymPy: 1.14.0` (or >= 1.12.0).

2. **Verify Math Verification Engine & Test Fixtures (Once Implemented)**:
   ```bash
   python tools/verify/verify.py
   ```
   *Expected Output*: Runs all 24 test fixtures, reports passing status, validates Section 1.1 items, and exits with code 0.

3. **Verify Section 1.1 Math Specifically**:
   ```bash
   python tools/verify/verify.py validate-section --dir content/ch01-functions/1.1-functions-and-graphs/
   ```
   *Expected Output*: Validates all 8 Section 1.1 MCQs (correct answer match + distractor separation) and exercise solutions, exit code 0.

4. **Verify Subagent Templates & Documentation**:
   - Inspect `.claude/agents/chNN-writer.md`, `.claude/agents/math-verifier.md`, `.claude/agents/content-reviewer.md`.
   - Confirm strict file-scoping rules: `chNN-writer.md` edits only `content/chNN-*/`.
   - Confirm read-only boundaries in `math-verifier.md` and `content-reviewer.md`.
   - Inspect `docs/STYLE_GUIDE.md` and `docs/SOURCE_WORKFLOW.md` for KaTeX, MDX, and extraction standards.

5. **Invalidation Conditions**:
   - Any test fixture failing or throwing an unhandled exception in `verify.py`.
   - Failure of `verify.py` to detect an intentionally duplicate or equivalent MCQ distractor.
   - Non-zero exit code on clean valid content.
   - Any subagent template permitting write access outside designated scopes.
