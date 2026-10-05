# Style Guide: Mathematical Exposition & Content Design

> **Platform**: `calculus-guide` — Thomas' Calculus (14th Edition) Interactive Study Guide  
> **Creator & Author**: **Muhammad Abdullah Athar** ([GitHub: AbdullahMalik17](https://github.com/AbdullahMalik17))  
> **Version**: 1.0.0  
> **Target Audience**: Content Authors, Subagents, Editors, Reviewers

---

## 1. Core Philosophy

`calculus-guide` is built on three core educational principles:
1. **Mathematical Rigor & Verification**: Every mathematical statement, expression, and solution must be symbolically verified using SymPy.
2. **Cognitive Empathy**: Mathematics is learned by demystifying false intuitions. Explanations must address *why* an operation is performed and *why* plausible distractors fail.
3. **Academic Integrity & Attribution**: All content is original pedagogical exposition and cleanroom paraphrasing attributed to **Muhammad Abdullah Athar** (`https://github.com/AbdullahMalik17`), with zero verbatim reproduction of proprietary textbook prose or figures.

---

## 2. KaTeX Mathematical Notation Standards

All mathematical typesetting is rendered client-side via KaTeX with `remark-math` and `rehype-katex`. The following formatting standards must be strictly observed.

### 2.1 Delimiters
- **Inline Mathematics**: Wrap in single dollar signs `$ ... $`.
  - *Example*: `$f(x) = \sqrt{x^2 - 1}$` renders as $f(x) = \sqrt{x^2 - 1}$.
  - *Rule*: Never leave whitespace immediately inside the delimiters (write `$x$`, not `$ x $`).
- **Display Mathematics**: Wrap in double dollar signs `$$ ... $$` on dedicated lines.
  - *Example*:
    ```markdown
    $$
    \lim_{x \to 0} \frac{\sin x}{x} = 1
    $$
    ```

### 2.2 Fractions & Division
- **Always use `\frac{numerator}{denominator}`** for algebraic fractions:
  - ✅ **Standard**: `\frac{3x + 1}{x^2 - 4}`
  - ❌ **Prohibited**: `(3x + 1)/(x^2 - 4)` in display math.
- **Avoid Ambiguous Inline Slashes**:
  - Never write `1/2x` because it creates ambiguity between $\frac{1}{2x}$ and $\frac{1}{2}x$.
  - Explicitly write `\frac{1}{2x}` or `\frac{1}{2}x`.

### 2.3 Derivatives & Differentials
- **Leibniz First Derivative**: `\frac{dy}{dx}` or `\frac{df}{dx}`
- **Leibniz Higher Derivatives**: `\frac{d^2y}{dx^2}`, `\frac{d^n y}{dx^n}`
- **Differential Operator**: `\frac{d}{dx}\left[ f(x) \right]`
- **Lagrange / Prime Notation**: `f'(x)`, `f''(x)`, `f^{(n)}(x)`
- **Partial Derivatives**: `\frac{\partial f}{\partial x}`, `\frac{\partial^2 f}{\partial x^2}`

### 2.4 Integrals & Integration Measures
- **Differential Measure Spacing**: Always include a thin space `\,` before the differential measure `dx`:
  - ✅ **Standard**: `\int f(x) \, dx` and `\int_{a}^{b} f(x) \, dx`
  - ❌ **Prohibited**: `\int f(x)dx`
- **Multiple Integrals**:
  - `\iint_{R} f(x, y) \, dA = \int_{c}^{d} \int_{a}^{b} f(x, y) \, dx \, dy`

### 2.5 Limits & Sequences
- **Limit Syntax**: `\lim_{x \to c} f(x) = L`
- **One-Sided Limits**:
  - Right-hand limit: `\lim_{x \to c^+} f(x)`
  - Left-hand limit: `\lim_{x \to c^-} f(x)`
- **Infinite Limits**: `\lim_{x \to \infty} f(x)` or `\lim_{x \to -\infty} f(x)`

### 2.6 Intervals, Sets & Logic
- **Intervals**:
  - Closed: `[a, b]`
  - Open: `(a, b)`
  - Half-open: `[a, b)` or `(a, b]`
  - Unbounded: `(-\infty, \infty)`, `[0, \infty)`, `(-\infty, 3)`
  - Set Unions: Use `\cup` (e.g. `(-\infty, -2) \cup (2, \infty)`). Do NOT use capital letter `U`.
- **Set Theory**:
  - Elements: `x \in \mathbb{R}`, `k \in \mathbb{Z}`, `n \in \mathbb{N}`
  - Exclusions: `\mathbb{R} \setminus \{0\}` or `x \ne 0`
  - Empty set: `\emptyset`
- **Logic**:
  - Implications: `\implies` (implies), `\iff` (if and only if)
  - Quantifiers: `\forall x > 0`, `\exists c \in (a, b)`

### 2.7 Functions & Operators
Never typeset function names as raw variables (which italicizes letters as separate variables):
- ✅ **Standard**: `\sin(x)`, `\cos(x)`, `\tan(x)`, `\sec(x)`, `\csc(x)`, `\cot(x)`
- ✅ **Standard**: `\arcsin(x)`, `\arccos(x)`, `\arctan(x)`
- ✅ **Standard**: `\ln(x)`, `\log_{10}(x)`, `\exp(x)`
- ✅ **Standard**: `\max`, `\min`, `\sup`, `\inf`
- ❌ **Prohibited**: `sin(x)`, `cos(x)`, `ln(x)` (renders as $s \cdot i \cdot n(x)$)

### 2.8 Piecewise Functions & Systems
Use the `cases` environment for piecewise definitions:
```latex
f(x) = \begin{cases}
-x, & \text{if } x < 0 \\
x^2, & \text{if } 0 \le x < 2 \\
4, & \text{if } x \ge 2
\end{cases}
```

---

## 3. MDX Callout Components & Tailwind Typography

In MDX documentation and section summaries, structure theoretical concepts using consistent semantic callout blocks.

### 3.1 Definition Callout
Use for introducing formal mathematical definitions:
- **Tailwind Classes**: `border-l-4 border-blue-500 bg-blue-50/10 p-4 rounded-r-lg shadow-sm text-slate-800 dark:text-slate-200`
- **Accent**: Blue (`#3B82F6`)
- **Icon / Label**: `📘 Definition N.N`

```html
<div className="border-l-4 border-blue-500 bg-blue-50/10 p-4 rounded-r-lg my-6">
  <h4 className="font-semibold text-blue-600 dark:text-blue-400 text-sm uppercase tracking-wider mb-1">
    Definition: Function
  </h4>
  <p className="text-slate-700 dark:text-slate-300">
    A <strong>function</strong> $f$ from a set $D$ to a set $Y$ is a rule that assigns a unique (single) element $f(x) \in Y$ to each element $x \in D$.
  </p>
</div>
```

### 3.2 Theorem & Property Callout
Use for formal theorems, lemmas, corollaries, and algebraic rules:
- **Tailwind Classes**: `border-l-4 border-emerald-500 bg-emerald-50/10 p-4 rounded-r-lg shadow-sm text-slate-800 dark:text-slate-200`
- **Accent**: Emerald (`#10B981`)
- **Icon / Label**: `📐 Theorem N.N`

```html
<div className="border-l-4 border-emerald-500 bg-emerald-50/10 p-4 rounded-r-lg my-6">
  <h4 className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm uppercase tracking-wider mb-1">
    Theorem: The Vertical Line Test
  </h4>
  <p className="text-slate-700 dark:text-slate-300">
    A curve in the coordinate plane is the graph of a function $y = f(x)$ if and only if no vertical line intersects the curve more than once.
  </p>
</div>
```

### 3.3 Common Pitfall Callout
Use for warning students against cognitive traps, illegal operations, or domain misconceptions:
- **Tailwind Classes**: `border-l-4 border-amber-500 bg-amber-50/10 p-4 rounded-r-lg shadow-sm text-slate-800 dark:text-slate-200`
- **Accent**: Amber (`#F59E0B`)
- **Icon / Label**: `⚠️ Common Pitfall`

```html
<div className="border-l-4 border-amber-500 bg-amber-50/10 p-4 rounded-r-lg my-6">
  <h4 className="font-semibold text-amber-600 dark:text-amber-400 text-sm uppercase tracking-wider mb-1">
    Common Pitfall: Simplifying Before Finding Domain
  </h4>
  <p className="text-slate-700 dark:text-slate-300">
    Never simplify a rational function before identifying its natural domain. For $f(x) = \frac{x^2 - 4}{x - 2}$, the domain is $\mathbb{R} \setminus \{2\}$, even though $f(x) = x + 2$ for all $x \ne 2$.
  </p>
</div>
```

### 3.4 Example Walkthrough Callout
Use for in-depth worked pedagogical examples:
- **Tailwind Classes**: `border-l-4 border-purple-500 bg-purple-50/10 p-4 rounded-r-lg shadow-sm text-slate-800 dark:text-slate-200`
- **Accent**: Purple (`#8B5CF6`)
- **Icon / Label**: `💡 Worked Example`

---

## 4. Solution Step Architecture & The "Why" Requirement

Every solution in `solutions/*.json` and `practice/*.json` must provide multi-step reasoning.

### 4.1 Step Schema Contract
```json
{
  "stepNumber": 1,
  "title": "Establish Natural Domain Restrictions",
  "mathExpression": "3 - t \\ne 0 \\implies t \\ne 3",
  "explanation": "A fraction is defined in real arithmetic only when its denominator is non-zero. Set the denominator to zero to identify the excluded values.",
  "why": "Division by zero is undefined in the real number system, requiring that the denominator 3 - t cannot equal 0."
}
```

### 4.2 The "Why" Field Rubric
The `why` field must articulate the **mathematical principle, theorem, or axiom** that justifies taking this step, rather than merely restating the mechanical action.

| Quality | Example `why` Text | Evaluation & Rationale |
|---------|-------------------|------------------------|
| ❌ **Rejected** | `"Solve for x"` | Merely restates the imperative; provides zero mathematical justification. |
| ❌ **Rejected** | `"Next step"` | Vacuous placeholder; violates schema minimum length and intent. |
| ❌ **Rejected** | `"Calculate the answer"` | Fails to state any mathematical principle. |
| ✅ **Approved** | `"The square root function produces real values if and only if the radicand is non-negative ($5x + 10 \ge 0$)."` | States the mathematical axiom governing real radical functions. |
| ✅ **Approved** | `"To test for origin symmetry (an odd function), we substitute $-x$ into $f(x)$ and check whether $f(-x) = -f(x)$ identically."` | Cites the formal definition and algebraic condition for function parity. |
| ✅ **Approved** | `"Factoring the difference of squares $(t-4)(t+4)$ isolates the exact zeros of the polynomial denominator."` | Explains why factoring is chosen to determine excluded domain points. |

---

## 5. Multiple-Choice Question (MCQ) Formulation Standards

Every MCQ in `mcq/*.json` must be a high-yield diagnostic tool, not simple trivia.

### 5.1 Structural Requirements
1. **Exactly 4 Options**: Options must have IDs `'A'`, `'B'`, `'C'`, `'D'`.
2. **Exactly 1 Correct Option**: Indicated by `correctId`.
3. **Exactly 3 Distractors**: Each distractor MUST include a non-empty `misconception` field (minimum 10 characters).
4. **Mutual Exclusivity**: The correct answer and all distractors must be mathematically non-equivalent (enforced via SymPy in `verify.py`).
5. **No Ambiguous Distractors**: No two distractors may evaluate to the same mathematical entity.

### 5.2 Cognitive Misconception Taxonomy
Every distractor must represent a specific, authentic cognitive hurdle:

1. **Domain & Radical Traps**:
   - Forgetting that radicands must be $\ge 0$.
   - Forgetting to exclude zero when a radical is in a denominator ($> 0$ vs $\ge 0$).
   - Forgetting to invert an inequality when multiplying or dividing by a negative number.
2. **Symmetry & Parity Traps**:
   - Confusing odd degree with odd functions (e.g. thinking $f(x) = x^3 + 1$ is odd because of the power 3).
   - Confusing neither even nor odd with both even and odd.
3. **Rational Function Traps**:
   - Canceling common factors before establishing domain restrictions.
   - Forgetting that the reciprocal function range $y \ne 0$.
4. **Boundary & Interval Traps**:
   - Confusing open parentheses `( )` with closed brackets `[ ]`.
   - Applying union $\cup$ vs intersection $\cap$ improperly.

### 5.3 Exemplar MCQ Distractor Comparison

```json
{
  "id": "A",
  "text": "$[0, \\infty)$",
  "explanation": "Incorrect. The square root allows non-negative values, but $x=0$ causes division by zero in this denominator.",
  "misconception": "The student applied the non-negativity rule for radicals ($x \\ge 0$) but failed to strictly exclude $x = 0$ where the denominator vanishes."
}
```

- **Bad Misconception**: `"Student selected choice A"` (Rejection: non-diagnostic).
- **Bad Misconception**: `"Wrong calculation"` (Rejection: generic).
- **Good Misconception**: `"The student assumed that adding 1 to the function shifts the graph horizontally left rather than vertically upward."` (Approved: precise cognitive diagnosis).

---

## 6. Original Practice Problems Architecture

Every practice problem in `practice/*.json` must provide:
- **`difficulty`**: Categorized as `'tier1'`, `'tier2'`, or `'tier3'`.
- **`hints`**: At least 1 hint. Hints must be progressive:
  - *Hint 1*: High-level strategy (which theorem or definition applies).
  - *Hint 2*: Intermediate algebraic milestone (how to set up the equation/inequality).
  - *Hint 3*: Guidance on resolving the final step (without stating the final answer).
- **`steps`**: Full step-by-step verified solution with `"why"` justifications.

---

## 7. Mandatory Creator Attribution

All templates, components, documentation, and metadata must adhere to the attribution mandate:
- **Author**: Muhammad Abdullah Athar
- **GitHub Profile**: `https://github.com/AbdullahMalik17`
- **Global Footer**:
  ```tsx
  Made by <a href="https://github.com/AbdullahMalik17" target="_blank" rel="noopener noreferrer">Muhammad Abdullah Athar</a>
  ```
- **Metadata**: In all content items, set `"author": "Muhammad Abdullah Athar"`.
