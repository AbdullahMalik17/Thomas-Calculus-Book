# Thomas' Calculus Mathematical Verification Engine

**Author**: Muhammad Abdullah Athar ([GitHub Profile](https://github.com/AbdullahMalik17))  
**Powered by**: [SymPy](https://www.sympy.org/) (Symbolic Mathematics for Python)  
**Location**: `calculus-guide/tools/verify/`

---

## 1. Overview

The **Thomas' Calculus Mathematical Verification Engine** is an automated, symbolic computation toolchain designed to mathematically guarantee the correctness of all content in the `calculus-guide` interactive platform. It provides:

1. **Symbolic Algebraic Equivalence**: Multi-stage simplification cascades verifying equations without false negatives or naive string comparisons.
2. **Pedagogical MCQ Integrity**: Enforces strict option cardinality (A, B, C, D), correct option mathematical evaluation, pairwise distractor uniqueness, and distractor misconception presence.
3. **Calculus Concept Payloads**: Domain interval set equality, difference quotient limits, derivative checking, Fundamental Theorem of Calculus (FTC) indefinite/definite integral checks, and function parity (even/odd symmetry).
4. **Comprehensive Test Suite**: 24 edge-case test fixtures covering factoring, binomial expansions, rational functions, trigonometric identities, radicals, logarithmic laws, calculus operations, and negative distractor tests.
5. **Section Content Scanner**: Validates chapter/section directory trees containing solutions, practice exercises, and multiple-choice questions.

---

## 2. Architecture & Simplification Cascade

Direct AST equality check (`expr1 == expr2`) is insufficient in CAS systems because algebraically identical expressions like $(x+1)^2$ and $x^2 + 2x + 1$ possess different tree representations (`Pow` vs `Add`).

The engine evaluates the difference $\Delta = \text{expr}_1 - \text{expr}_2$ through a multi-pass simplification cascade:

```
[Expression Input] ──> [Safe SymPy Parser] ──> [Compute Difference Δ = expr1 - expr2]
                                                        │
┌───────────────────────────────────────────────────────┘
▼
1. Direct AST Equality (expr1 == expr2)
2. Polynomial Expansion (expand(Δ) == 0)
3. Standard Simplification (simplify(Δ) == 0)
4. Rational Arithmetic (together(Δ) == 0, cancel(Δ) == 0)
5. Trigonometric Identities (trigsimp(Δ) == 0)
6. Radical Conjugate Simplification (radsimp(Δ) == 0)
7. Logarithmic & Power Laws (expand_log(Δ, force=True) == 0, powsimp(Δ) == 0)
8. Factorization Check (factor(Δ) == 0)
9. SymPy Randomized Algebraic Probe (Δ.equals(0))
10. Multi-point Numerical Evaluation Probe (random non-singular points)
```

---

## 3. Installation & Requirements

Requirements:
- Python 3.10+
- `sympy >= 1.12.0`
- `mpmath >= 1.3.0`

Install dependencies:
```bash
pip install -r tools/verify/requirements.txt
```

---

## 4. CLI Usage

### 4.1 Zero-Argument Default Run
Running the tool with zero arguments executes all 24 edge-case test fixtures and validates Section 1.1 content if present. Exits with code `0` on complete success, or `1` on any failure:

```bash
python tools/verify/verify.py
```

### 4.2 Run Test Fixtures
Execute the test fixtures with optional category or name filtering:

```bash
# Run all fixtures
python tools/verify/verify.py test

# Filter by category
python tools/verify/verify.py test --category Trigonometry

# Filter by name
python tools/verify/verify.py test --filter "Cubes"
```

### 4.3 Verify Expression Equivalence
Verify whether two expressions are algebraically identical:

```bash
python tools/verify/verify.py verify-expr --expr "(x - 3)*(x**2 + 3*x + 9)" --expected "x**3 - 27"
python tools/verify/verify.py verify-expr --expr "sin(2*x)" --expected "2*sin(x)*cos(x)"
```

### 4.4 Verify Multiple-Choice Question (MCQ)
Verify distractor separation and misconception explanations for an MCQ JSON item:

```bash
python tools/verify/verify.py verify-mcq --file content/ch01-functions/1.1-functions-and-graphs/mcq/mcq-01.json
```

Or using an inline JSON payload:
```bash
python tools/verify/verify.py verify-mcq --json '{"id":"test","question":"f(x)","options":[{"id":"A","text":"x","misconception":"None"},{"id":"B","text":"-x","misconception":"Negated sign error"},{"id":"C","text":"2x","misconception":"Doubled coefficient"},{"id":"D","text":"x/2","misconception":"Halved coefficient"}],"correctId":"A"}'
```

### 4.5 Verify Calculus Payloads
Verify domain, difference quotient, derivative, integral, or symmetry:

```bash
# Verify from file
python tools/verify/verify.py verify-calculus --file payload.json

# Verify via stdin
cat payload.json | python tools/verify/verify.py verify-calculus --stdin
```

### 4.6 Validate Entire Section Directory
Recursively scan and validate all solutions, practice problems, and MCQs in a section:

```bash
python tools/verify/verify.py validate-section --dir content/ch01-functions/1.1-functions-and-graphs/
```

---

## 5. JSON Payload Specifications

### Domain Verification Payload
```json
{
  "type": "domain",
  "id": "sec1.1-ex01-domain",
  "expression": "sqrt(9 - x**2)",
  "variable": "x",
  "expected_domain": "[-3, 3]"
}
```

### Difference Quotient & Derivative Payload
```json
{
  "type": "difference_quotient",
  "id": "sec1.1-diff-quot-01",
  "expression": "x^2",
  "variable": "x",
  "h_var": "h",
  "expected_quotient": "2*x + h",
  "expected_derivative": "2*x"
}
```

### Indefinite Integral Payload (FTC Verification)
```json
{
  "type": "integral",
  "id": "sec1.1-integral-01",
  "expression": "2*x / (x^2 + 1)",
  "variable": "x",
  "kind": "indefinite",
  "expected": "log(x^2 + 1)"
}
```

### Function Symmetry Payload
```json
{
  "type": "symmetry",
  "id": "sec1.1-symmetry-01",
  "expression": "x^3 - 5*x",
  "variable": "x",
  "expected_symmetry": "odd"
}
```

---

## 6. Fixtures Inventory (24 Edge Cases)

| ID | Category | Fixture Name | Mathematical Concept |
|---|---|---|---|
| 1 | Factoring | Difference of Cubes | $(x - 3)(x^2 + 3x + 9) = x^3 - 27$ |
| 2 | Factoring | Quadratic Factoring | $(2x + 5)(3x - 4) = 6x^2 + 7x - 20$ |
| 3 | Expansion | Binomial Cube Expansion | $(x + 2)^3 = x^3 + 6x^2 + 12x + 8$ |
| 4 | Expansion | Trinomial Square Expansion | $(x + y + z)^2 = x^2 + y^2 + z^2 + 2xy + 2xz + 2yz$ |
| 5 | Rational | Common Denominator | $\frac{1}{x - 1} - \frac{1}{x + 1} = \frac{2}{x^2 - 1}$ |
| 6 | Rational | Complex Fraction | $\frac{1/x + 1/y}{1/x - 1/y} = \frac{y + x}{y - x}$ |
| 7 | Rational | Factor Cancellation | $\frac{x^4 - 16}{x^2 - 4} = x^2 + 4$ |
| 8 | Trigonometry | Pythagorean Identity | $\sin^2(x) + \cos^2(x) = 1$ |
| 9 | Trigonometry | Double Angle Sine | $\sin(2x) = 2\sin(x)\cos(x)$ |
| 10 | Trigonometry | Double Angle Cosine Form 1 | $\cos(2x) = \cos^2(x) - \sin^2(x)$ |
| 11 | Trigonometry | Double Angle Cosine Form 2 | $\cos(2x) = 1 - 2\sin^2(x)$ |
| 12 | Trigonometry | Tangent Addition Formula | $\tan(x + y) = \frac{\tan(x) + \tan(y)}{1 - \tan(x)\tan(y)}$ |
| 13 | Radicals | Conjugate Rationalization | $\frac{1}{\sqrt{x} + \sqrt{y}} = \frac{\sqrt{x} - \sqrt{y}}{x - y}$ |
| 14 | Radicals | Radical Absolute Value | $\sqrt{x^2 + 2x + 1} = \|x + 1\|$ |
| 15 | Radicals | Fractional Exponents | $x^{1/3} \cdot x^{2/3} = x$ |
| 16 | Logarithms/Exponents | Logarithm Product Rule | $\ln(ab) = \ln(a) + \ln(b)$ |
| 17 | Logarithms/Exponents | Logarithm Power & Quotient | $\ln(x^3 / y) = 3\ln(x) - \ln(y)$ |
| 18 | Logarithms/Exponents | Exponential Addition Law | $e^{x + y} = e^x \cdot e^y$ |
| 19 | Calculus Operations | Quadratic Difference Quotient | $\frac{(x+h)^2 - x^2}{h} = 2x + h \implies f'(x) = 2x$ |
| 20 | Calculus Operations | Reciprocal Difference Quotient | $\frac{1/(x+h) - 1/x}{h} = -\frac{1}{x(x+h)} \implies f'(x) = -\frac{1}{x^2}$ |
| 21 | Calculus Operations | Continuous Domain Set | $\text{Domain of } \sqrt{9 - x^2} \equiv [-3, 3]$ |
| 22 | Calculus Operations | Function Symmetry Test | $f(-x) + f(x) = 0 \implies \text{odd parity for } x^3 - 5x$ |
| 23 | MCQ Verification | Valid MCQ Distractor Separation | 4 options, 1 correct, 3 distinct with misconceptions |
| 24 | MCQ Verification | Ambiguity Detection (Negative Test) | Correctly catches and rejects equivalent distractor |

---

## 7. License & Attribution

Author: **Muhammad Abdullah Athar**  
GitHub: [https://github.com/AbdullahMalik17](https://github.com/AbdullahMalik17)  
Project: Thomas' Calculus Interactive Study Platform
