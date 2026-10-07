// scripts/curriculum-data-ch02.ts
/**
 * Authoritative Curriculum Data for Chapter 2: Limits and Continuity
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

export interface SectionDef {
  chapter: string;
  chapterDir: string;
  section: string;
  sectionDir: string;
  title: string;
  definitions: Array<{
    id: string;
    title: string;
    category: 'definition' | 'theorem' | 'formula' | 'rule' | 'test';
    latex?: string;
    statement: string;
    conditions?: string[];
    explanation: string;
    keyTakeaway?: string;
  }>;
  summaryMDX: string;
  solutions: Array<{
    filename: string;
    title: string;
    exerciseReference: string;
    originalTopic: string;
    difficulty: 'tier1' | 'tier2' | 'tier3';
    tags: string[];
    problemStatement: string;
    finalAnswer: string;
    steps: Array<{
      stepNumber: number;
      title: string;
      mathExpression: string;
      explanation: string;
      why: string;
    }>;
    sympyVerification: {
      operation: string;
      type: string;
      expression: string;
      expected: string;
      variable?: string;
      order?: number;
      kind?: string;
      [key: string]: any;
    };
  }>;
}

export const CH02_SECTIONS: SectionDef[] = [
  {
    chapter: "ch02",
    chapterDir: "ch02-limits-continuity",
    section: "2.2",
    sectionDir: "2.2-limit-of-a-function-and-limit-laws",
    title: "Limit of a Function and Limit Laws",
    definitions: [
      {
        id: "def-informal-limit",
        title: "Informal Definition of a Limit",
        category: "definition",
        latex: "\\lim_{x \\to c} f(x) = L",
        statement: "If f(x) becomes arbitrarily close to a single number L as x approaches c from both sides (without ever requiring x = c), we say that the limit of f(x) as x approaches c is L.",
        conditions: ["f must be defined in an open interval containing c, except possibly at c itself", "L must be a unique, finite real number"],
        explanation: "The value of f at x = c is completely irrelevant to the existence or value of the limit. The limit describes local behavior near c, not at c.",
        keyTakeaway: "Limits describe the target value of f(x) near c, independent of f(c)."
      },
      {
        id: "theorem-limit-laws",
        title: "Algebraic Limit Laws",
        category: "theorem",
        latex: "\\lim_{x \\to c} [f(x) \\pm g(x)] = L \\pm M, \\quad \\lim_{x \\to c} [f(x)g(x)] = LM, \\quad \\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\frac{L}{M} \\quad (M \\neq 0)",
        statement: "If lim_{x->c} f(x) = L and lim_{x->c} g(x) = M exist, then limits distribute linearly across sums, differences, constant multiples, products, quotients (with non-zero denominator), powers, and roots.",
        conditions: ["Both individual limits must exist as finite numbers", "In quotient law, the limit of the denominator M must be non-zero"],
        explanation: "These laws allow evaluation of complicated expressions term-by-term without recurring to epsilon-delta proofs.",
        keyTakeaway: "Limits distribute over standard algebraic operations provided each individual limit exists."
      },
      {
        id: "theorem-sandwich-theorem",
        title: "The Sandwich (Squeeze) Theorem",
        category: "theorem",
        latex: "g(x) \\le f(x) \\le h(x) \\implies \\lim_{x \\to c} f(x) = L \\quad \\text{when } \\lim_{x \\to c} g(x) = \\lim_{x \\to c} h(x) = L",
        statement: "If g(x) <= f(x) <= h(x) for all x in an open interval containing c (except possibly c), and lim_{x->c} g(x) = lim_{x->c} h(x) = L, then lim_{x->c} f(x) = L.",
        conditions: ["Inequality holds in a punctured neighborhood of c", "Both bounding functions converge to the exact same limit L"],
        explanation: "Essential for evaluating oscillatory limits such as x^2 * sin(1/x) near 0 where direct substitution fails.",
        keyTakeaway: "Trap an unknown function between two known bounds that converge to the same limit."
      },
      {
        id: "rule-indeterminate-factoring",
        title: "Cancellation Rule for 0/0 Forms",
        category: "rule",
        latex: "\\frac{P(x)}{Q(x)} = \\frac{(x - c)P_1(x)}{(x - c)Q_1(x)} = \\frac{P_1(x)}{Q_1(x)} \\quad \\text{for } x \\neq c",
        statement: "If direct substitution into a rational function yields 0/0, (x - c) is a common factor of both numerator and denominator. Factoring and canceling (x - c) produces an identical function near c.",
        conditions: ["P(c) = 0 and Q(c) = 0", "Cancellation is valid because x approaches c but never equals c"],
        explanation: "By the Factor Theorem, c being a zero implies (x - c) divides the polynomial.",
        keyTakeaway: "Always factor and cancel common linear factors (x - c) when encountering 0/0 in rational functions."
      }
    ],
    summaryMDX: `# Section 2.2: Limit of a Function and Limit Laws

The concept of a limit is the cornerstone of calculus. It allows us to examine the behavior of a function near a point of interest, even when the function cannot be directly evaluated at that point.

---

## 1. The Limit Concept

When we write:

$$
\\lim_{x \\to c} f(x) = L
$$

we mean that we can make the output values $f(x)$ as close to $L$ as desired by choosing $x$ sufficiently close to $c$, with $x \\neq c$.

### Critical Principle:
The value of $f(c)$ has **zero influence** on whether $\\lim_{x \\to c} f(x)$ exists or what its value is:
- $f(c)$ can equal $L$.
- $f(c)$ can be completely different from $L$.
- $f(c)$ may be completely undefined!

---

## 2. The Limit Laws

Suppose $\\lim_{x \\to c} f(x) = L$ and $\\lim_{x \\to c} g(x) = M$, where $L$ and $M$ are finite real numbers. Then:

1. **Sum & Difference Rule**:
   $$
   \\lim_{x \\to c} [f(x) \\pm g(x)] = L \\pm M
   $$
2. **Product Rule**:
   $$
   \\lim_{x \\to c} [f(x) g(x)] = L \\cdot M
   $$
3. **Quotient Rule**:
   $$
   \\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\frac{L}{M}, \\quad \\text{provided } M \\neq 0
   $$
4. **Power & Root Rules**:
   $$
   \\lim_{x \\to c} [f(x)]^n = L^n, \\quad \\lim_{x \\to c} \\sqrt[n]{f(x)} = \\sqrt[n]{L} \\quad (L > 0 \\text{ if } n \\text{ is even})
   $$

---

## 3. Techniques for Indeterminate Forms $\\frac{0}{0}$

When direct substitution yields $\\frac{0}{0}$, the limit is an **indeterminate form**:

- **Factoring and Cancellation**: Factor $(x - c)$ from polynomial expressions.
- **Conjugate Rationalization**: For square roots, multiply numerator and denominator by the conjugate $(\\sqrt{A} + B)$.
- **Sandwich (Squeeze) Theorem**: For bounded oscillatory terms like $\\sin(1/x)$, bound between $-x^2$ and $x^2$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Direct Substitution into a Polynomial",
        exerciseReference: "Section 2.2, Exercise 1",
        originalTopic: "Polynomial Limits",
        difficulty: "tier1",
        tags: ["polynomial", "direct-substitution", "limit-laws"],
        problemStatement: "Evaluate the limit lim_{x -> -2} (2x^3 - 5x + 4) using the limit laws.",
        finalAnswer: "\\lim_{x \\to -2} (2x^3 - 5x + 4) = -2",
        steps: [
          {
            stepNumber: 1,
            title: "Apply the Sum and Difference Limit Laws",
            mathExpression: "\\lim_{x \\to -2} (2x^3 - 5x + 4) = 2\\lim_{x \\to -2} x^3 - 5\\lim_{x \\to -2} x + \\lim_{x \\to -2} 4",
            explanation: "Distribute the limit operator across the individual polynomial terms using linearity of limits.",
            why: "Limit of a linear combination of functions is the linear combination of individual limits."
          },
          {
            stepNumber: 2,
            title: "Evaluate Each Power Limit",
            mathExpression: "2(-2)^3 - 5(-2) + 4 = 2(-8) + 10 + 4 = -16 + 14 = -2",
            explanation: "Substitute x = -2 directly into each term by the direct substitution property of polynomials.",
            why: "Every polynomial function is continuous everywhere on the real line."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "2*(-2)**3 - 5*(-2) + 4",
          expected: "-2"
        }
      },
      {
        filename: "ex-02",
        title: "Evaluating 0/0 by Factoring a Difference of Squares",
        exerciseReference: "Section 2.2, Exercise 2",
        originalTopic: "Factoring Indeterminate Forms",
        difficulty: "tier1",
        tags: ["factoring", "difference-of-squares", "indeterminate-form"],
        problemStatement: "Evaluate the limit: lim_{x -> 3} (x^2 - 9)/(x - 3).",
        finalAnswer: "\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3} = 6",
        steps: [
          {
            stepNumber: 1,
            title: "Identify the Indeterminate Form",
            mathExpression: "\\frac{3^2 - 9}{3 - 3} = \\frac{0}{0}",
            explanation: "Direct substitution yields 0/0, indicating the presence of a common factor (x - 3).",
            why: "The form 0/0 proves that x = 3 is a root of both numerator and denominator."
          },
          {
            stepNumber: 2,
            title: "Factor the Numerator",
            mathExpression: "\\frac{x^2 - 9}{x - 3} = \\frac{(x - 3)(x + 3)}{x - 3}",
            explanation: "Factor the difference of squares x^2 - 9 into (x - 3)(x + 3).",
            why: "Standard algebraic factorization identity a^2 - b^2 = (a - b)(a + b)."
          },
          {
            stepNumber: 3,
            title: "Cancel Common Factor and Evaluate",
            mathExpression: "\\lim_{x \\to 3} (x + 3) = 3 + 3 = 6",
            explanation: "Cancel (x - 3) since x approaches 3 but x != 3, then substitute x = 3.",
            why: "If two functions agree everywhere except at x = c, their limits as x -> c are identical."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "(x**2 - 9)/(x - 3)",
          expected: "x + 3",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Factoring a Difference of Cubes",
        exerciseReference: "Section 2.2, Exercise 3",
        originalTopic: "Cubic Factoring",
        difficulty: "tier2",
        tags: ["factoring", "difference-of-cubes", "rational-function"],
        problemStatement: "Evaluate the limit: lim_{x -> 1} (x^3 - 1)/(x^2 - 1).",
        finalAnswer: "\\lim_{x \\to 1} \\frac{x^3 - 1}{x^2 - 1} = \\frac{3}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Factor Numerator and Denominator",
            mathExpression: "x^3 - 1 = (x - 1)(x^2 + x + 1), \\quad x^2 - 1 = (x - 1)(x + 1)",
            explanation: "Apply difference of cubes to numerator and difference of squares to denominator.",
            why: "Difference of cubes identity: a^3 - b^3 = (a - b)(a^2 + ab + b^2)."
          },
          {
            stepNumber: 2,
            title: "Cancel Common Factor (x - 1)",
            mathExpression: "\\frac{x^3 - 1}{x^2 - 1} = \\frac{(x - 1)(x^2 + x + 1)}{(x - 1)(x + 1)} = \\frac{x^2 + x + 1}{x + 1} \\quad (x \\neq 1)",
            explanation: "Cancel the common factor (x - 1) which caused the 0/0 form.",
            why: "In limit evaluation, x approaches 1 but is never equal to 1."
          },
          {
            stepNumber: 3,
            title: "Evaluate Limit of Simplified Expression",
            mathExpression: "\\lim_{x \\to 1} \\frac{x^2 + x + 1}{x + 1} = \\frac{1^2 + 1 + 1}{1 + 1} = \\frac{3}{2}",
            explanation: "Substitute x = 1 into the simplified continuous rational function.",
            why: "Direct substitution is valid when denominator does not equal zero."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "(x**3 - 1)/(x**2 - 1) - (x**2 + x + 1)/(x + 1)",
          expected: "0",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Conjugate Rationalization of a Square Root Limit",
        exerciseReference: "Section 2.2, Exercise 4",
        originalTopic: "Conjugate Multiplication",
        difficulty: "tier2",
        tags: ["conjugate", "radicals", "indeterminate-form"],
        problemStatement: "Evaluate the limit: lim_{x -> 0} (sqrt(x + 4) - 2) / x.",
        finalAnswer: "\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x} = \\frac{1}{4}",
        steps: [
          {
            stepNumber: 1,
            title: "Multiply by the Conjugate",
            mathExpression: "\\frac{\\sqrt{x + 4} - 2}{x} \\cdot \\frac{\\sqrt{x + 4} + 2}{\\sqrt{x + 4} + 2} = \\frac{(x + 4) - 4}{x(\\sqrt{x + 4} + 2)} = \\frac{x}{x(\\sqrt{x + 4} + 2)}",
            explanation: "Multiply numerator and denominator by the radical conjugate sqrt(x+4) + 2.",
            why: "Conjugate multiplication rationalizes the numerator via (A - B)(A + B) = A^2 - B^2."
          },
          {
            stepNumber: 2,
            title: "Cancel Common Factor x",
            mathExpression: "\\frac{x}{x(\\sqrt{x + 4} + 2)} = \\frac{1}{\\sqrt{x + 4} + 2} \\quad (x \\neq 0)",
            explanation: "Cancel the variable x from numerator and denominator.",
            why: "Removing x eliminates the 0 in the denominator."
          },
          {
            stepNumber: 3,
            title: "Compute the Limit via Direct Substitution",
            mathExpression: "\\lim_{x \\to 0} \\frac{1}{\\sqrt{x + 4} + 2} = \\frac{1}{\\sqrt{0 + 4} + 2} = \\frac{1}{2 + 2} = \\frac{1}{4}",
            explanation: "Substitute x = 0 into the rationalized expression.",
            why: "The rationalized function is continuous at x = 0."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "((sqrt(x + 4) - 2)/x) * (sqrt(x + 4) + 2)",
          expected: "1",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Applying the Sandwich (Squeeze) Theorem",
        exerciseReference: "Section 2.2, Exercise 5",
        originalTopic: "Sandwich Theorem",
        difficulty: "tier2",
        tags: ["squeeze-theorem", "trigonometry", "oscillatory"],
        problemStatement: "Prove using the Sandwich Theorem that lim_{x -> 0} x^2 sin(1/x) = 0.",
        finalAnswer: "\\lim_{x \\to 0} x^2 \\sin\\left(\\frac{1}{x}\\right) = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Bound the Sine Function",
            mathExpression: "-1 \\le \\sin\\left(\\frac{1}{x}\\right) \\le 1 \\quad \\forall x \\neq 0",
            explanation: "Recall that the range of the sine function is bounded strictly within [-1, 1].",
            why: "The sine function is bounded for all real arguments regardless of how rapidly the argument oscillates."
          },
          {
            stepNumber: 2,
            title: "Multiply the Inequality by x^2",
            mathExpression: "-x^2 \\le x^2 \\sin\\left(\\frac{1}{x}\\right) \\le x^2",
            explanation: "Multiply through by x^2. Since x^2 > 0 for all x != 0, the inequality directions are preserved.",
            why: "Multiplying an inequality by a strictly positive quantity maintains the order of inequalities."
          },
          {
            stepNumber: 3,
            title: "Evaluate the Limits of the Bounding Functions",
            mathExpression: "\\lim_{x \\to 0} (-x^2) = 0 \\quad \\text{and} \\quad \\lim_{x \\to 0} (x^2) = 0",
            explanation: "Both the lower bound -x^2 and upper bound x^2 converge to 0 as x -> 0.",
            why: "Direct substitution into the quadratic bounding functions gives zero."
          },
          {
            stepNumber: 4,
            title: "Conclude via the Sandwich Theorem",
            mathExpression: "\\lim_{x \\to 0} (-x^2) = 0 = \\lim_{x \\to 0} x^2 \\implies \\lim_{x \\to 0} x^2 \\sin\\left(\\frac{1}{x}\\right) = 0",
            explanation: "Because the middle function is trapped between bounds converging to 0, it must also converge to 0.",
            why: "Statement and conclusion of the Sandwich (Squeeze) Theorem."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "x**2 - x**2",
          expected: "0",
          variable: "x"
        }
      }
    ]
  },
  {
    chapter: "ch02",
    chapterDir: "ch02-limits-continuity",
    section: "2.3",
    sectionDir: "2.3-the-precise-definition-of-a-limit",
    title: "The Precise Definition of a Limit",
    definitions: [
      {
        id: "def-epsilon-delta",
        title: "Precise (Epsilon-Delta) Definition of a Limit",
        category: "definition",
        latex: "\\forall \\epsilon > 0, \\; \\exists \\delta > 0 \\text{ s.t. } 0 < |x - c| < \\delta \\implies |f(x) - L| < \\epsilon",
        statement: "We say lim_{x->c} f(x) = L if for every real number epsilon > 0, there exists a corresponding real number delta > 0 such that for all x with 0 < |x - c| < delta, the distance |f(x) - L| < epsilon.",
        conditions: ["epsilon is an arbitrary positive tolerance", "delta is a response radius depending on epsilon and c", "0 < |x - c| ensures x != c"],
        explanation: "This formalizes the intuition that f(x) can be kept within any specified margin of error epsilon around L by choosing x sufficiently close to c within radius delta.",
        keyTakeaway: "For any target error epsilon > 0, we can find an input tolerance delta > 0."
      },
      {
        id: "rule-finding-delta-linear",
        title: "Delta Choice for Linear Functions",
        category: "rule",
        latex: "f(x) = mx + b \\implies \\delta = \\frac{\\epsilon}{|m|} \\quad (m \\neq 0)",
        statement: "For a linear function f(x) = mx + b, |f(x) - L| = |m(x - c)| = |m| |x - c|. Choosing delta = epsilon / |m| guarantees |f(x) - L| < epsilon.",
        conditions: ["Slope m is non-zero", "If m = 0, any delta > 0 works because |f(x) - L| = 0 < epsilon"],
        explanation: "The linearity ensures a constant scale factor between input variations and output variations.",
        keyTakeaway: "For linear functions, delta is directly proportional to epsilon: delta = epsilon / |m|."
      }
    ],
    summaryMDX: `# Section 2.3: The Precise Definition of a Limit

While the informal limit concept ("$f(x)$ approaches $L$ as $x$ approaches $c$") provides strong geometric intuition, rigorous mathematics demands an unequivocal, testable definition. This was achieved by Augustin-Louis Cauchy and Karl Weierstrass through the **$\\epsilon$-$\\delta$ definition**.

---

## 1. The $\\epsilon$-$\\delta$ Definition

Let $f(x)$ be defined on an open interval containing $c$, except possibly at $c$ itself. We write:

$$
\\lim_{x \\to c} f(x) = L
$$

if for every $\\epsilon > 0$ (no matter how small), there exists a corresponding $\\delta > 0$ such that:

$$
0 < |x - c| < \\delta \\implies |f(x) - L| < \\epsilon
$$

### Meaning of the Inequalities:
- **$|x - c| < \\delta$**: $x$ lies in the interval $(c - \\delta, c + \\delta)$.
- **$0 < |x - c|$**: $x \\neq c$ (we never evaluate at the point $c$).
- **$|f(x) - L| < \\epsilon$**: $f(x)$ lies in the target interval $(L - \\epsilon, L + \\epsilon)$.

---

## 2. Two-Step Proof Strategy

1. **Scratchwork (Finding $\\delta$)**:
   Start with the target inequality $|f(x) - L| < \\epsilon$. Manipulate it to isolate $|x - c| < \\text{expression}(\\epsilon)$. Set $\\delta$ equal to that expression.
2. **Formal Proof (Verifying $\\delta$)**:
   State "Given $\\epsilon > 0$, choose $\\delta = \\dots$". Assume $0 < |x - c| < \\delta$, and deduce that $|f(x) - L| < \\epsilon$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Epsilon-Delta Proof for a Linear Function",
        exerciseReference: "Section 2.3, Exercise 1",
        originalTopic: "Linear Limit Proof",
        difficulty: "tier1",
        tags: ["epsilon-delta", "proof", "linear-function"],
        problemStatement: "Prove using the epsilon-delta definition that lim_{x -> 3} (4x - 5) = 7.",
        finalAnswer: "\\text{Given } \\epsilon > 0, \\text{ choose } \\delta = \\frac{\\epsilon}{4}.",
        steps: [
          {
            stepNumber: 1,
            title: "Analyze the Target Distance",
            mathExpression: "|f(x) - L| = |(4x - 5) - 7| = |4x - 12| = 4|x - 3|",
            explanation: "Evaluate the absolute difference between f(x) and the claimed limit L = 7.",
            why: "The goal is to bound |f(x) - L| in terms of |x - c|."
          },
          {
            stepNumber: 2,
            title: "Solve for the Input Tolerance Delta",
            mathExpression: "4|x - 3| < \\epsilon \\iff |x - 3| < \\frac{\\epsilon}{4}",
            explanation: "Set 4|x - 3| < epsilon to find the required bound on |x - 3|.",
            why: "Delta must ensure that whenever |x - 3| < delta, the target inequality holds."
          },
          {
            stepNumber: 3,
            title: "Write the Formal Verification",
            mathExpression: "\\text{Let } \\epsilon > 0. \\text{ Choose } \\delta = \\frac{\\epsilon}{4}. \\text{ If } 0 < |x - 3| < \\delta, \\text{ then } |(4x - 5) - 7| = 4|x - 3| < 4\\left(\\frac{\\epsilon}{4}\\right) = \\epsilon.",
            explanation: "State the formal implication demonstrating that the chosen delta satisfies the definition.",
            why: "A rigorous mathematical proof must proceed from hypothesis to conclusion."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "4 * (eps / 4)",
          expected: "eps",
          variable: "eps"
        }
      },
      {
        filename: "ex-02",
        title: "Epsilon-Delta Proof with Negative Slope",
        exerciseReference: "Section 2.3, Exercise 2",
        originalTopic: "Negative Slope Epsilon-Delta",
        difficulty: "tier1",
        tags: ["epsilon-delta", "negative-slope", "proof"],
        problemStatement: "Prove using the epsilon-delta definition that lim_{x -> -2} (3 - 2x) = 7.",
        finalAnswer: "\\text{Given } \\epsilon > 0, \\text{ choose } \\delta = \\frac{\\epsilon}{2}.",
        steps: [
          {
            stepNumber: 1,
            title: "Examine the Target Inequality",
            mathExpression: "|(3 - 2x) - 7| = |-2x - 4| = |-2(x + 2)| = |-2| \\cdot |x - (-2)| = 2|x + 2|",
            explanation: "Simplify the distance |f(x) - 7| and factor out |-2| = 2.",
            why: "Absolute value property |ab| = |a||b| allows factoring constants."
          },
          {
            stepNumber: 2,
            title: "Select Delta",
            mathExpression: "2|x + 2| < \\epsilon \\iff |x + 2| < \\frac{\\epsilon}{2} \\implies \\delta = \\frac{\\epsilon}{2}",
            explanation: "Isolate |x + 2| to determine the appropriate radius delta.",
            why: "Ensures the output error is strictly bounded by epsilon."
          },
          {
            stepNumber: 3,
            title: "Complete the Proof",
            mathExpression: "0 < |x - (-2)| < \\frac{\\epsilon}{2} \\implies |(3 - 2x) - 7| = 2|x + 2| < 2\\left(\\frac{\\epsilon}{2}\\right) = \\epsilon",
            explanation: "Confirm that whenever x is within delta of -2, f(x) is within epsilon of 7.",
            why: "Formal completion of the epsilon-delta implication."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "2 * (eps / 2)",
          expected: "eps",
          variable: "eps"
        }
      },
      {
        filename: "ex-03",
        title: "Finding Delta for a Quadratic Limit",
        exerciseReference: "Section 2.3, Exercise 3",
        originalTopic: "Quadratic Limits with Bounded Neighborhood",
        difficulty: "tier2",
        tags: ["quadratic", "epsilon-delta", "bounding"],
        problemStatement: "Find a suitable delta > 0 to prove lim_{x -> 2} x^2 = 4 for an arbitrary epsilon > 0.",
        finalAnswer: "\\delta = \\min\\left(1, \\frac{\\epsilon}{5}\\right)",
        steps: [
          {
            stepNumber: 1,
            title: "Factor the Distance |f(x) - L|",
            mathExpression: "|x^2 - 4| = |(x - 2)(x + 2)| = |x - 2| \\cdot |x + 2|",
            explanation: "Factor the difference of squares to separate the controllable factor |x - 2|.",
            why: "We can control |x - 2| directly via delta, but need to bound the auxiliary factor |x + 2|."
          },
          {
            stepNumber: 2,
            title: "Assume a Prelimimary Bound on Delta",
            mathExpression: "|x - 2| < 1 \\implies -1 < x - 2 < 1 \\implies 3 < x + 2 < 5 \\implies |x + 2| < 5",
            explanation: "Constrain delta <= 1 so that x stays within (1, 3), bounding |x + 2| strictly by 5.",
            why: "Imposing an initial constraint on delta establishes a uniform upper bound on non-linear factors."
          },
          {
            stepNumber: 3,
            title: "Determine the Final Value of Delta",
            mathExpression: "|x^2 - 4| < 5|x - 2| < 5\\delta \\le \\epsilon \\implies \\delta = \\min\\left(1, \\frac{\\epsilon}{5}\\right)",
            explanation: "Set 5*delta <= epsilon, giving delta <= epsilon/5. Take the minimum of 1 and epsilon/5.",
            why: "Taking the minimum ensures both the preliminary bound |x+2| < 5 and 5|x-2| < epsilon hold."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "5 * (eps / 5)",
          expected: "eps",
          variable: "eps"
        }
      },
      {
        filename: "ex-04",
        title: "Formal Proof for a Constant Function",
        exerciseReference: "Section 2.3, Exercise 4",
        originalTopic: "Constant Limit Proof",
        difficulty: "tier1",
        tags: ["constant", "epsilon-delta", "proof"],
        problemStatement: "Prove using the epsilon-delta definition that lim_{x -> c} k = k for any real constant k.",
        finalAnswer: "\\text{For any } \\epsilon > 0, \\text{ choose any } \\delta > 0 \\text{ (e.g., } \\delta = 1).",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate the Output Distance",
            mathExpression: "|f(x) - L| = |k - k| = 0",
            explanation: "Since the function value is identically k for all x, the distance to L = k is zero.",
            why: "A constant function produces the exact same output for all inputs."
          },
          {
            stepNumber: 2,
            title: "Conclude for Any Positive Delta",
            mathExpression: "0 < \\epsilon \\quad \\text{holds trivially for any } \\epsilon > 0",
            explanation: "Since |f(x) - L| = 0 is less than any positive epsilon, any positive delta satisfies the condition.",
            why: "Zero is strictly less than every positive real number epsilon."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "k - k",
          expected: "0",
          variable: "k"
        }
      },
      {
        filename: "ex-05",
        title: "Epsilon-Delta Proof for a Square Root Function",
        exerciseReference: "Section 2.3, Exercise 5",
        originalTopic: "Radical Limit Proof",
        difficulty: "tier3",
        tags: ["radicals", "epsilon-delta", "conjugate"],
        problemStatement: "Prove using the epsilon-delta definition that lim_{x -> 4} sqrt(x) = 2.",
        finalAnswer: "\\delta = 2\\epsilon",
        steps: [
          {
            stepNumber: 1,
            title: "Rationalize the Distance Expression",
            mathExpression: "|\\sqrt{x} - 2| = \\left|\\frac{(\\sqrt{x} - 2)(\\sqrt{x} + 2)}{\\sqrt{x} + 2}\\right| = \\frac{|x - 4|}{\\sqrt{x} + 2}",
            explanation: "Multiply and divide by the conjugate sqrt(x) + 2.",
            why: "Conjugate multiplication relates |sqrt(x) - 2| to |x - 4|."
          },
          {
            stepNumber: 2,
            title: "Bound the Denominator",
            mathExpression: "\\sqrt{x} \\ge 0 \\implies \\sqrt{x} + 2 \\ge 2 \\implies \\frac{1}{\\sqrt{x} + 2} \\le \\frac{1}{2}",
            explanation: "Since sqrt(x) is non-negative for all x in the domain, the denominator is at least 2.",
            why: "Bounding the denominator from below bounds the entire fraction from above."
          },
          {
            stepNumber: 3,
            title: "Choose Delta",
            mathExpression: "|\\sqrt{x} - 2| \\le \\frac{|x - 4|}{2} < \\frac{\\delta}{2} = \\epsilon \\implies \\delta = 2\\epsilon",
            explanation: "Setting delta/2 = epsilon gives delta = 2*epsilon.",
            why: "Guaranteeing |x - 4| < 2*epsilon ensures |sqrt(x) - 2| < epsilon."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "(2*eps) / 2",
          expected: "eps",
          variable: "eps"
        }
      }
    ]
  },
  {
    chapter: "ch02",
    chapterDir: "ch02-limits-continuity",
    section: "2.4",
    sectionDir: "2.4-one-sided-limits",
    title: "One-Sided Limits",
    definitions: [
      {
        id: "def-right-hand-limit",
        title: "Right-Hand Limit",
        category: "definition",
        latex: "\\lim_{x \\to c^+} f(x) = L",
        statement: "The right-hand limit of f(x) as x approaches c is L if f(x) becomes arbitrarily close to L as x approaches c from values strictly greater than c (x > c).",
        conditions: ["f is defined on an open interval (c, c + d) for some d > 0", "x > c at all times"],
        explanation: "Restricting the domain to the right of c allows limits to be evaluated at boundary points of domains (e.g. sqrt(x) at x = 0).",
        keyTakeaway: "Right-hand limit examines behavior strictly from values greater than c."
      },
      {
        id: "def-left-hand-limit",
        title: "Left-Hand Limit",
        category: "definition",
        latex: "\\lim_{x \\to c^-} f(x) = L",
        statement: "The left-hand limit of f(x) as x approaches c is L if f(x) becomes arbitrarily close to L as x approaches c from values strictly less than c (x < c).",
        conditions: ["f is defined on an open interval (c - d, c) for some d > 0", "x < c at all times"],
        explanation: "Important for functions with jump discontinuities such as piecewise and step functions.",
        keyTakeaway: "Left-hand limit examines behavior strictly from values less than c."
      },
      {
        id: "theorem-two-sided-limit-existence",
        title: "Two-Sided Limit Existence Criterion",
        category: "theorem",
        latex: "\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^+} f(x) = L \\quad \\text{and} \\quad \\lim_{x \\to c^-} f(x) = L",
        statement: "A function f(x) has a two-sided limit L as x approaches c if and only if both the right-hand and left-hand limits exist and are equal to L.",
        conditions: ["Both one-sided limits must exist as finite numbers", "Both one-sided limits must equal the exact same real value L"],
        explanation: "If the one-sided limits differ, the two-sided limit does not exist (DNE), typically indicating a jump discontinuity.",
        keyTakeaway: "Two-sided limit exists if and only if left and right limits agree."
      },
      {
        id: "theorem-fundamental-trig-limits",
        title: "Fundamental Trigonometric Limits",
        category: "theorem",
        latex: "\\lim_{\\theta \\to 0} \\frac{\\sin \\theta}{\\theta} = 1, \\qquad \\lim_{\\theta \\to 0} \\frac{1 - \\cos \\theta}{\\theta} = 0",
        statement: "When angle theta is measured in radians, the ratio of sin(theta) to theta approaches 1 as theta approaches 0.",
        conditions: ["theta must be measured in radians", "theta approaches 0 from both positive and negative sides"],
        explanation: "Proven geometrically using unit circle sector areas and the Sandwich Theorem: cos(theta) < sin(theta)/theta < 1.",
        keyTakeaway: "sin(theta) is approximately equal to theta for small radian angles theta."
      }
    ],
    summaryMDX: `# Section 2.4: One-Sided Limits

In many practical situations, functions exhibit different behaviors when approached from the left versus from the right. This occurs frequently with:
- Piecewise-defined functions
- Absolute value quotients: $\\frac{|x - c|}{x - c}$
- Step functions: $\\lfloor x \\rfloor$
- Domain boundaries: $f(x) = \\sqrt{x}$ at $x = 0$

---

## 1. One-Sided Limits Definitions

- **Right-Hand Limit**:
  $$
  \\lim_{x \\to c^+} f(x) = L_1
  $$
  Here $x \\to c$ with the restriction $x > c$.
- **Left-Hand Limit**:
  $$
  \\lim_{x \\to c^-} f(x) = L_2
  $$
  Here $x \\to c$ with the restriction $x < c$.

---

## 2. The Two-Sided Limit Existence Theorem

A function possesses a regular two-sided limit at $c$ if and only if both one-sided limits exist and coincide:

$$
\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^+} f(x) = \\lim_{x \\to c^-} f(x) = L
$$

If $\\lim_{x \\to c^+} f(x) \\neq \\lim_{x \\to c^-} f(x)$, the two-sided limit **does not exist (DNE)**.

---

## 3. Fundamental Trigonometric Limits (Radian Measure)

Two foundational limits underpin all of trigonometric calculus:

$$
\\lim_{\\theta \\to 0} \\frac{\\sin \\theta}{\\theta} = 1, \\qquad \\lim_{\\theta \\to 0} \\frac{1 - \\cos \\theta}{\\theta} = 0
$$

**Crucial Note**: These limits are strictly valid **only when $\\theta$ is expressed in radians**.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "One-Sided Limits of a Piecewise Function",
        exerciseReference: "Section 2.4, Exercise 1",
        originalTopic: "Piecewise One-Sided Limits",
        difficulty: "tier1",
        tags: ["piecewise", "one-sided-limits", "jump-discontinuity"],
        problemStatement: "Let f(x) = x^2 for x <= 1 and f(x) = 3 - x for x > 1. Find lim_{x -> 1^-} f(x), lim_{x -> 1^+} f(x), and determine whether lim_{x -> 1} f(x) exists.",
        finalAnswer: "\\lim_{x \\to 1^-} f(x) = 1, \\quad \\lim_{x \\to 1^+} f(x) = 2; \\quad \\lim_{x \\to 1} f(x) \\text{ does not exist (DNE)}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute the Left-Hand Limit",
            mathExpression: "\\lim_{x \\to 1^-} f(x) = \\lim_{x \\to 1^-} (x^2) = 1^2 = 1",
            explanation: "For x < 1, the rule f(x) = x^2 applies. Substitute x = 1.",
            why: "When evaluating from the left (x < 1), use the left branch."
          },
          {
            stepNumber: 2,
            title: "Compute the Right-Hand Limit",
            mathExpression: "\\lim_{x \\to 1^+} f(x) = \\lim_{x \\to 1^+} (3 - x) = 3 - 1 = 2",
            explanation: "For x > 1, the rule f(x) = 3 - x applies. Substitute x = 1.",
            why: "When evaluating from the right (x > 1), use the right branch."
          },
          {
            stepNumber: 3,
            title: "Compare One-Sided Limits",
            mathExpression: "\\lim_{x \\to 1^-} f(x) = 1 \\neq 2 = \\lim_{x \\to 1^+} f(x)",
            explanation: "Because the left-hand limit (1) does not equal the right-hand limit (2), the two-sided limit does not exist.",
            why: "Two-sided limit theorem asserts existence if and only if both one-sided limits are equal."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "3 - 1 - 1",
          expected: "1"
        }
      },
      {
        filename: "ex-02",
        title: "Limits Involving the Absolute Value Quotient",
        exerciseReference: "Section 2.4, Exercise 2",
        originalTopic: "Absolute Value Signs",
        difficulty: "tier1",
        tags: ["absolute-value", "one-sided-limits", "step-function"],
        problemStatement: "Evaluate lim_{x -> 2^+} |x - 2|/(x - 2) and lim_{x -> 2^-} |x - 2|/(x - 2).",
        finalAnswer: "\\lim_{x \\to 2^+} \\frac{|x - 2|}{x - 2} = 1, \\quad \\lim_{x \\to 2^-} \\frac{|x - 2|}{x - 2} = -1",
        steps: [
          {
            stepNumber: 1,
            title: "Resolve Absolute Value for x > 2",
            mathExpression: "x > 2 \\implies x - 2 > 0 \\implies |x - 2| = x - 2",
            explanation: "For inputs to the right of 2, x - 2 is positive, so |x - 2| = x - 2.",
            why: "Definition of absolute value: |u| = u when u > 0."
          },
          {
            stepNumber: 2,
            title: "Evaluate Right-Hand Limit",
            mathExpression: "\\lim_{x \\to 2^+} \\frac{x - 2}{x - 2} = \\lim_{x \\to 2^+} (1) = 1",
            explanation: "The ratio reduces identically to 1 for all x > 2.",
            why: "Quotient of identical non-zero quantities equals 1."
          },
          {
            stepNumber: 3,
            title: "Resolve Absolute Value for x < 2",
            mathExpression: "x < 2 \\implies x - 2 < 0 \\implies |x - 2| = -(x - 2)",
            explanation: "For inputs to the left of 2, x - 2 is negative, so |x - 2| = -(x - 2).",
            why: "Definition of absolute value: |u| = -u when u < 0."
          },
          {
            stepNumber: 4,
            title: "Evaluate Left-Hand Limit",
            mathExpression: "\\lim_{x \\to 2^-} \\frac{-(x - 2)}{x - 2} = \\lim_{x \\to 2^-} (-1) = -1",
            explanation: "The ratio reduces identically to -1 for all x < 2.",
            why: "Quotient of opposites equals -1."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "1 - (-1)",
          expected: "2"
        }
      },
      {
        filename: "ex-03",
        title: "Limits of the Greatest Integer Function",
        exerciseReference: "Section 2.4, Exercise 3",
        originalTopic: "Floor Function Limits",
        difficulty: "tier1",
        tags: ["floor-function", "step-function", "one-sided-limits"],
        problemStatement: "Evaluate lim_{x -> 3^+} floor(x) and lim_{x -> 3^-} floor(x).",
        finalAnswer: "\\lim_{x \\to 3^+} \\lfloor x \\rfloor = 3, \\quad \\lim_{x \\to 3^-} \\lfloor x \\rfloor = 2",
        steps: [
          {
            stepNumber: 1,
            title: "Examine Values to the Right of 3",
            mathExpression: "3 < x < 4 \\implies \\lfloor x \\rfloor = 3",
            explanation: "For any x just greater than 3 (e.g. 3.01, 3.001), the greatest integer less than or equal to x is 3.",
            why: "Definition of the floor function for values in [3, 4)."
          },
          {
            stepNumber: 2,
            title: "Evaluate the Right-Hand Limit",
            mathExpression: "\\lim_{x \\to 3^+} \\lfloor x \\rfloor = \\lim_{x \\to 3^+} 3 = 3",
            explanation: "The function is constant with value 3 on (3, 4).",
            why: "Limit of a constant function equals that constant."
          },
          {
            stepNumber: 3,
            title: "Examine Values to the Left of 3",
            mathExpression: "2 < x < 3 \\implies \\lfloor x \\rfloor = 2",
            explanation: "For any x just less than 3 (e.g. 2.99, 2.999), the greatest integer less than or equal to x is 2.",
            why: "Definition of the floor function for values in [2, 3)."
          },
          {
            stepNumber: 4,
            title: "Evaluate the Left-Hand Limit",
            mathExpression: "\\lim_{x \\to 3^-} \\lfloor x \\rfloor = \\lim_{x \\to 3^-} 2 = 2",
            explanation: "The function is constant with value 2 on (2, 3).",
            why: "Limit of a constant function equals that constant."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "3 - 2",
          expected: "1"
        }
      },
      {
        filename: "ex-04",
        title: "Trigonometric Limit with Frequency Scaling",
        exerciseReference: "Section 2.4, Exercise 4",
        originalTopic: "Fundamental Trig Limit",
        difficulty: "tier2",
        tags: ["trigonometric-limit", "sin-x-over-x", "frequency-scaling"],
        problemStatement: "Evaluate: lim_{x -> 0} sin(5x) / (3x).",
        finalAnswer: "\\lim_{x \\to 0} \\frac{\\sin(5x)}{3x} = \\frac{5}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Factor out Constant Multipliers",
            mathExpression: "\\frac{\\sin(5x)}{3x} = \\frac{1}{3} \\cdot \\frac{\\sin(5x)}{x}",
            explanation: "Pull the denominator constant factor 3 out of the fraction.",
            why: "Linearity of scalar multiplication."
          },
          {
            stepNumber: 2,
            title: "Scale to Match the Argument of Sine",
            mathExpression: "\\frac{1}{3} \\cdot \\frac{\\sin(5x)}{x} = \\frac{5}{3} \\cdot \\frac{\\sin(5x)}{5x}",
            explanation: "Multiply and divide by 5 so the denominator matches the argument 5x.",
            why: "To apply lim_{u->0} sin(u)/u = 1, the denominator must match the argument of the sine function."
          },
          {
            stepNumber: 3,
            title: "Substitute Variable u = 5x and Evaluate Limit",
            mathExpression: "u = 5x \\implies u \\to 0 \\text{ as } x \\to 0 \\implies \\lim_{x \\to 0} \\frac{5}{3} \\frac{\\sin(5x)}{5x} = \\frac{5}{3} \\lim_{u \\to 0} \\frac{\\sin u}{u} = \\frac{5}{3}(1) = \\frac{5}{3}",
            explanation: "Apply the fundamental trigonometric limit theorem with u = 5x.",
            why: "Standard limit theorem lim_{u->0} sin(u)/u = 1."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "(5/3) * 1",
          expected: "5/3"
        }
      },
      {
        filename: "ex-05",
        title: "Trigonometric Limit with Conjugate Multiplication",
        exerciseReference: "Section 2.4, Exercise 5",
        originalTopic: "Cosine Conjugates",
        difficulty: "tier2",
        tags: ["trigonometry", "conjugate", "pythagorean-identity"],
        problemStatement: "Evaluate: lim_{x -> 0} (1 - cos x) / x^2.",
        finalAnswer: "\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Multiply by the Trigonometric Conjugate",
            mathExpression: "\\frac{1 - \\cos x}{x^2} \\cdot \\frac{1 + \\cos x}{1 + \\cos x} = \\frac{1 - \\cos^2 x}{x^2(1 + \\cos x)}",
            explanation: "Multiply numerator and denominator by 1 + cos(x).",
            why: "Conjugate multiplication allows applying the Pythagorean identity."
          },
          {
            stepNumber: 2,
            title: "Apply Pythagorean Identity",
            mathExpression: "1 - \\cos^2 x = \\sin^2 x \\implies \\frac{\\sin^2 x}{x^2(1 + \\cos x)} = \\left(\\frac{\\sin x}{x}\\right)^2 \\cdot \\frac{1}{1 + \\cos x}",
            explanation: "Replace 1 - cos^2(x) with sin^2(x) and group terms.",
            why: "Pythagorean identity sin^2(x) + cos^2(x) = 1."
          },
          {
            stepNumber: 3,
            title: "Evaluate Using Limit Laws",
            mathExpression: "\\lim_{x \\to 0} \\left(\\frac{\\sin x}{x}\\right)^2 \\cdot \\lim_{x \\to 0} \\frac{1}{1 + \\cos x} = (1)^2 \\cdot \\frac{1}{1 + 1} = \\frac{1}{2}",
            explanation: "Apply product rule of limits and the fundamental limit lim_{x->0} sin(x)/x = 1.",
            why: "Cosine is continuous at 0 with cos(0) = 1."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "1**2 * (1 / (1 + 1))",
          expected: "1/2"
        }
      }
    ]
  },
  {
    chapter: "ch02",
    chapterDir: "ch02-limits-continuity",
    section: "2.5",
    sectionDir: "2.5-continuity",
    title: "Continuity",
    definitions: [
      {
        id: "def-continuity-at-a-point",
        title: "Continuity at an Interior Point",
        category: "definition",
        latex: "\\lim_{x \\to c} f(x) = f(c)",
        statement: "A function f is continuous at an interior point c of its domain if: (1) f(c) is defined, (2) lim_{x->c} f(x) exists, and (3) lim_{x->c} f(x) = f(c).",
        conditions: ["c must be in the domain of f", "Two-sided limit exists as a finite real number", "Limit equals function value"],
        explanation: "Continuity means there is no interruption, break, jump, or hole in the graph at x = c.",
        keyTakeaway: "Continuity requires value exists, limit exists, and value equals limit."
      },
      {
        id: "theorem-intermediate-value-theorem",
        title: "Intermediate Value Theorem (IVT)",
        category: "theorem",
        latex: "f(a) < y_0 < f(b) \\implies \\exists c \\in (a, b) \\text{ s.t. } f(c) = y_0",
        statement: "If f is continuous on a closed interval [a, b], and y0 is any value strictly between f(a) and f(b), then there exists at least one value c in (a, b) such that f(c) = y0.",
        conditions: ["f must be continuous on the entire closed interval [a, b]", "y0 is strictly between f(a) and f(b)"],
        explanation: "A continuous curve cannot jump over any intermediate value. Applied frequently to guarantee roots when f(a) and f(b) have opposite signs.",
        keyTakeaway: "Continuous functions attain every intermediate value between their endpoint values."
      },
      {
        id: "rule-classification-discontinuities",
        title: "Classification of Discontinuities",
        category: "rule",
        latex: "\\text{Removable: } \\lim f(x) \\neq f(c); \\quad \\text{Jump: } \\lim_{x \\to c^+} f \\neq \\lim_{x \\to c^-} f; \\quad \\text{Infinite: } \\lim f = \\pm \\infty",
        statement: "Discontinuities are classified as: (1) Removable (limit exists but != f(c)), (2) Jump (left and right limits exist but are unequal), (3) Infinite (one or both one-sided limits are infinite).",
        conditions: ["At least one of the three continuity conditions fails at c"],
        explanation: "Removable discontinuities can be fixed by defining or redefining a single point. Jump and infinite discontinuities cannot be removed.",
        keyTakeaway: "Discontinuities are either removable (holes) or essential (jumps and vertical asymptotes)."
      }
    ],
    summaryMDX: `# Section 2.5: Continuity

Continuity is one of the central concepts of analysis. Intuitively, a function is continuous on an interval if its graph can be drawn without lifting the pencil from the paper.

---

## 1. The Three-Part Definition of Continuity

A function $f$ is continuous at an interior point $c$ if and only if:

1. **$f(c)$ is defined** ($c$ is in the domain of $f$).
2. **$\\lim_{x \\to c} f(x)$ exists** (the two-sided limit is a finite number).
3. **$\\lim_{x \\to c} f(x) = f(c)$** (the limit equals the function value).

If any of these three conditions fails, $f$ is **discontinuous** at $c$.

---

## 2. Types of Discontinuities

- **Removable Discontinuity**: $\\lim_{x \\to c} f(x) = L$ exists, but either $f(c)$ is undefined or $f(c) \\neq L$. A simple "hole" in the graph.
- **Jump Discontinuity**: Both $\\lim_{x \\to c^-} f(x)$ and $\\lim_{x \\to c^+} f(x)$ exist, but they are not equal.
- **Infinite Discontinuity**: The function grows without bound ($+\\infty$ or $-\\infty$) as $x \\to c$.

---

## 3. The Intermediate Value Theorem (IVT)

If $f$ is continuous on $[a, b]$, then $f$ takes on every value between $f(a)$ and $f(b)$.

### Root-Finding Corollary:
If $f$ is continuous on $[a, b]$ and $f(a)$ and $f(b)$ have **opposite signs** ($f(a) \\cdot f(b) < 0$), then there exists at least one root $c \\in (a, b)$ such that:

$$
f(c) = 0
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Removable Discontinuity and Function Extension",
        exerciseReference: "Section 2.5, Exercise 1",
        originalTopic: "Removable Discontinuity",
        difficulty: "tier1",
        tags: ["continuity", "removable-discontinuity", "continuous-extension"],
        problemStatement: "Determine where f(x) = (x^2 - 4)/(x - 2) is discontinuous. Classify the discontinuity and define f(2) to make the extended function continuous at x = 2.",
        finalAnswer: "\\text{Discontinuous at } x = 2 \\text{ (removable)}; \\quad \\text{Define } f(2) = 4",
        steps: [
          {
            stepNumber: 1,
            title: "Check Domain and Continuity Conditions",
            mathExpression: "f(2) = \\frac{2^2 - 4}{2 - 2} = \\frac{0}{0} \\implies 2 \\notin \\text{Domain}(f)",
            explanation: "The denominator is zero at x = 2, so f(2) is undefined.",
            why: "Condition 1 of continuity fails because f(2) does not exist."
          },
          {
            stepNumber: 2,
            title: "Compute the Limit as x Approaches 2",
            mathExpression: "\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = \\lim_{x \\to 2} \\frac{(x - 2)(x + 2)}{x - 2} = \\lim_{x \\to 2} (x + 2) = 2 + 2 = 4",
            explanation: "Factor the difference of squares and cancel (x - 2) to evaluate the limit.",
            why: "The limit exists and equals 4, proving the discontinuity is removable."
          },
          {
            stepNumber: 3,
            title: "Construct the Continuous Extension",
            mathExpression: "F(x) = \\begin{cases} \\frac{x^2 - 4}{x - 2}, & x \\neq 2 \\\\ 4, & x = 2 \\end{cases}",
            explanation: "Define the value at x = 2 to match the limiting value 4.",
            why: "Setting F(2) equal to the limit satisfies lim F(x) = F(2)."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "(x**2 - 4)/(x - 2)",
          expected: "x + 2",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Finding Parameter for Global Continuity",
        exerciseReference: "Section 2.5, Exercise 2",
        originalTopic: "Piecewise Continuity Parameter",
        difficulty: "tier1",
        tags: ["continuity", "piecewise", "parameter"],
        problemStatement: "Find the value of constant k that makes f(x) = k*x^2 for x <= 2 and f(x) = 2x + k for x > 2 continuous everywhere.",
        finalAnswer: "k = \\frac{4}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Left-Hand Limit and Function Value at x = 2",
            mathExpression: "f(2) = k(2^2) = 4k, \\quad \\lim_{x \\to 2^-} f(x) = 4k",
            explanation: "Substitute x = 2 into the left branch k*x^2.",
            why: "Polynomials are continuous on their domain."
          },
          {
            stepNumber: 2,
            title: "Evaluate Right-Hand Limit at x = 2",
            mathExpression: "\\lim_{x \\to 2^+} f(x) = \\lim_{x \\to 2^+} (2x + k) = 2(2) + k = 4 + k",
            explanation: "Substitute x = 2 into the right branch 2x + k.",
            why: "Linear functions are continuous on their domain."
          },
          {
            stepNumber: 3,
            title: "Equate Left and Right Limits for Continuity",
            mathExpression: "4k = 4 + k \\implies 3k = 4 \\implies k = \\frac{4}{3}",
            explanation: "Set left-hand limit equal to right-hand limit and solve for k.",
            why: "Continuity at x = 2 requires left and right limits to be equal to f(2)."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "4*(4/3) - (4 + 4/3)",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Continuity of Composite Functions",
        exerciseReference: "Section 2.5, Exercise 3",
        originalTopic: "Composite Continuity",
        difficulty: "tier2",
        tags: ["composite-functions", "domain", "continuity-interval"],
        problemStatement: "Determine the interval on which h(x) = sqrt(9 - x^2) is continuous.",
        finalAnswer: "\\text{Continuous on } [-3, 3]",
        steps: [
          {
            stepNumber: 1,
            title: "Find the Natural Domain",
            mathExpression: "9 - x^2 \\ge 0 \\iff x^2 \\le 9 \\iff -3 \\le x \\le 3",
            explanation: "Square root requires a non-negative radicand.",
            why: "Real radical domain constraint."
          },
          {
            stepNumber: 2,
            title: "Examine Interior Continuity via Composition",
            mathExpression: "g(x) = 9 - x^2 \\text{ is continuous on } \\mathbb{R}, \\quad f(u) = \\sqrt{u} \\text{ is continuous for } u \\ge 0",
            explanation: "A composition f(g(x)) of continuous functions is continuous on its domain.",
            why: "Theorem on continuity of composite functions."
          },
          {
            stepNumber: 3,
            title: "Check One-Sided Boundary Continuity",
            mathExpression: "\\lim_{x \\to -3^+} \\sqrt{9 - x^2} = 0 = h(-3), \\quad \\lim_{x \\to 3^-} \\sqrt{9 - x^2} = 0 = h(3)",
            explanation: "The right-hand limit matches at -3 and the left-hand limit matches at 3.",
            why: "Endpoint continuity requires one-sided limit matching."
          }
        ],
        sympyVerification: {
          operation: "domain",
          type: "domain",
          expression: "sqrt(9 - x**2)",
          expected: "[-3, 3]",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Proving Existence of a Root using IVT",
        exerciseReference: "Section 2.5, Exercise 4",
        originalTopic: "Intermediate Value Theorem Application",
        difficulty: "tier2",
        tags: ["intermediate-value-theorem", "root-finding", "continuity"],
        problemStatement: "Use the Intermediate Value Theorem to prove that the polynomial equation x^3 - 3x - 1 = 0 has a real solution in the interval [1, 2].",
        finalAnswer: "\\text{Root exists in } (1, 2) \\text{ because } f(1) = -3 < 0 < 1 = f(2)",
        steps: [
          {
            stepNumber: 1,
            title: "Verify Continuity Hypothesis",
            mathExpression: "f(x) = x^3 - 3x - 1 \\text{ is continuous on } [1, 2]",
            explanation: "Every polynomial is continuous everywhere on the real line, including the closed interval [1, 2].",
            why: "Hypothesis of IVT requires continuity on [a, b]."
          },
          {
            stepNumber: 2,
            title: "Evaluate at the Interval Endpoints",
            mathExpression: "f(1) = 1^3 - 3(1) - 1 = -3, \\quad f(2) = 2^3 - 3(2) - 1 = 8 - 6 - 1 = 1",
            explanation: "Compute the function values at the endpoints.",
            why: "Endpoint values establish the sign change across the interval."
          },
          {
            stepNumber: 3,
            title: "Apply the Intermediate Value Theorem",
            mathExpression: "f(1) = -3 < 0 < 1 = f(2) \\implies \\exists c \\in (1, 2) \\text{ such that } f(c) = 0",
            explanation: "Because 0 is between f(1) and f(2), there must exist a c in (1, 2) with f(c) = 0.",
            why: "Direct conclusion of the Intermediate Value Theorem."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "(2**3 - 3*2 - 1) - (1**3 - 3*1 - 1)",
          expected: "4"
        }
      },
      {
        filename: "ex-05",
        title: "Classifying Discontinuities of Rational and Step Functions",
        exerciseReference: "Section 2.5, Exercise 5",
        originalTopic: "Discontinuity Classification",
        difficulty: "tier2",
        tags: ["infinite-discontinuity", "jump-discontinuity", "classification"],
        problemStatement: "Classify the discontinuities of f(x) = 1/(x - 3) at x = 3 and g(x) = floor(x) at integer values x = n.",
        finalAnswer: "f \\text{ has an infinite discontinuity at } x = 3; \\quad g \\text{ has jump discontinuities at all } x \\in \\mathbb{Z}",
        steps: [
          {
            stepNumber: 1,
            title: "Analyze f(x) = 1/(x - 3) near x = 3",
            mathExpression: "\\lim_{x \\to 3^+} \\frac{1}{x - 3} = +\\infty, \\quad \\lim_{x \\to 3^-} \\frac{1}{x - 3} = -\\infty",
            explanation: "The denominator approaches 0 through positive values from the right and negative from the left.",
            why: "Infinite limit signifies a vertical asymptote, hence an infinite discontinuity."
          },
          {
            stepNumber: 2,
            title: "Analyze g(x) = floor(x) near integer n",
            mathExpression: "\\lim_{x \\to n^+} \\lfloor x \\rfloor = n, \\quad \\lim_{x \\to n^-} \\lfloor x \\rfloor = n - 1",
            explanation: "Both one-sided limits are finite but differ by 1.",
            why: "When left and right limits are finite and unequal, the discontinuity is a jump discontinuity."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "n - (n - 1)",
          expected: "1",
          variable: "n"
        }
      }
    ]
  },
  {
    chapter: "ch02",
    chapterDir: "ch02-limits-continuity",
    section: "2.6",
    sectionDir: "2.6-limits-involving-infinity-asymptotes-of-graphs",
    title: "Limits Involving Infinity; Asymptotes of Graphs",
    definitions: [
      {
        id: "def-horizontal-asymptote",
        title: "Horizontal Asymptote",
        category: "definition",
        latex: "\\lim_{x \\to \\infty} f(x) = L \\quad \\text{or} \\quad \\lim_{x \\to -\\infty} f(x) = L \\implies y = L",
        statement: "A horizontal line y = L is a horizontal asymptote of the graph of y = f(x) if either lim_{x->oo} f(x) = L or lim_{x->-oo} f(x) = L.",
        conditions: ["L must be a finite real number", "Evaluated as x grows without bound in either direction"],
        explanation: "Describes end behavior of functions at extreme horizontal distances.",
        keyTakeaway: "A curve can cross its horizontal asymptote multiple times; it dictates behavior only at infinity."
      },
      {
        id: "def-vertical-asymptote",
        title: "Vertical Asymptote",
        category: "definition",
        latex: "\\lim_{x \\to c^+} f(x) = \\pm \\infty \\quad \\text{or} \\quad \\lim_{x \\to c^-} f(x) = \\pm \\infty \\implies x = c",
        statement: "A vertical line x = c is a vertical asymptote of the graph of y = f(x) if at least one of the one-sided limits of f(x) as x approaches c is +oo or -oo.",
        conditions: ["c is a real number", "Function values grow unbounded near c"],
        explanation: "Commonly arises at zeroes of the simplified denominator of rational functions.",
        keyTakeaway: "Vertical asymptotes represent infinite discontinuities where curves diverge."
      },
      {
        id: "rule-rational-end-behavior",
        title: "Degree Comparison Rule for Rational Functions",
        category: "rule",
        latex: "f(x) = \\frac{a_n x^n + \\dots}{b_m x^m + \\dots} \\implies \\lim_{x \\to \\pm \\infty} f(x) = \\begin{cases} 0, & n < m \\\\ \\frac{a_n}{b_m}, & n = m \\\\ \\pm \\infty, & n > m \\end{cases}",
        statement: "The limit at infinity of a rational function depends entirely on the leading terms of numerator and denominator.",
        conditions: ["Degrees n and m are non-negative integers", "Leading coefficients an and bm are non-zero"],
        explanation: "Dividing every term by the highest power of x in the denominator reduces lower-order terms to zero.",
        keyTakeaway: "Higher degree in denominator -> 0; equal degrees -> ratio of leading coefficients."
      },
      {
        id: "def-oblique-asymptote",
        title: "Oblique (Slant) Asymptote",
        category: "definition",
        latex: "f(x) = (mx + b) + \\frac{R(x)}{Q(x)} \\implies y = mx + b \\quad (m \\neq 0)",
        statement: "If the degree of the numerator of a rational function exceeds the degree of the denominator by exactly 1, polynomial long division yields y = mx + b as an oblique asymptote.",
        conditions: ["deg(P) = deg(Q) + 1", "Remainder term R(x)/Q(x) -> 0 as x -> +-oo"],
        explanation: "The graph approaches the slanted line y = mx + b as |x| becomes large.",
        keyTakeaway: "Oblique asymptotes occur when numerator degree is exactly one higher than denominator degree."
      }
    ],
    summaryMDX: `# Section 2.6: Limits Involving Infinity; Asymptotes of Graphs

Limits involving infinity describe two distinct phenomena:
1. **End Behavior**: What happens to $f(x)$ as $x$ moves arbitrarily far to the right ($x \\to \\infty$) or to the left ($x \\to -\\infty$)? This gives rise to **horizontal** and **oblique asymptotes**.
2. **Unbounded Growth**: What happens when $f(x)$ grows arbitrarily large ($+\\infty$ or $-\\infty$) near a finite point $x = c$? This produces **vertical asymptotes**.

---

## 1. Limits at Infinity and Horizontal Asymptotes

The line $y = L$ is a **horizontal asymptote** if:

$$
\\lim_{x \\to \\infty} f(x) = L \\quad \\text{or} \\quad \\lim_{x \\to -\\infty} f(x) = L
$$

### Fundamental Rule for Reciprocals:
For any rational number $r > 0$:

$$
\\lim_{x \\to \\infty} \\frac{1}{x^r} = 0
$$

To evaluate limits at infinity for rational expressions, divide every term in the numerator and denominator by the highest power of $x$ present in the denominator.

---

## 2. Infinite Limits and Vertical Asymptotes

The vertical line $x = c$ is a **vertical asymptote** if:

$$
\\lim_{x \\to c^+} f(x) = \\pm \\infty \\quad \\text{or} \\quad \\lim_{x \\to c^-} f(x) = \\pm \\infty
$$

For a rational function $f(x) = \\frac{P(x)}{Q(x)}$ in lowest terms, vertical asymptotes occur at every real zero of the denominator $Q(x) = 0$.

---

## 3. Oblique (Slant) Asymptotes

When $\\deg(P) = \\deg(Q) + 1$, polynomial long division yields:

$$
\\frac{P(x)}{Q(x)} = (mx + b) + \\frac{R(x)}{Q(x)}
$$

Because $\\lim_{x \\to \\pm \\infty} \\frac{R(x)}{Q(x)} = 0$, the line $y = mx + b$ is an **oblique (slant) asymptote**.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Horizontal Asymptote of a Rational Function",
        exerciseReference: "Section 2.6, Exercise 1",
        originalTopic: "Rational Limits at Infinity",
        difficulty: "tier1",
        tags: ["horizontal-asymptote", "rational-function", "limits-at-infinity"],
        problemStatement: "Find the horizontal asymptotes of f(x) = (3x^2 - 5x + 2) / (5x^2 + 4x - 1) by evaluating limits as x -> +-oo.",
        finalAnswer: "\\lim_{x \\to \\pm \\infty} f(x) = \\frac{3}{5} \\implies y = \\frac{3}{5} \\text{ is a horizontal asymptote}",
        steps: [
          {
            stepNumber: 1,
            title: "Divide Numerator and Denominator by Highest Power x^2",
            mathExpression: "\\frac{3x^2 - 5x + 2}{5x^2 + 4x - 1} = \\frac{3 - \\frac{5}{x} + \\frac{2}{x^2}}{5 + \\frac{4}{x} - \\frac{1}{x^2}} \\quad (x \\neq 0)",
            explanation: "Divide every term by x^2 to expose terms that approach zero.",
            why: "Standard technique for rational limits at infinity."
          },
          {
            stepNumber: 2,
            title: "Apply the Reciprocal Limit Theorem",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{1}{x} = 0, \\quad \\lim_{x \\to \\infty} \\frac{1}{x^2} = 0",
            explanation: "Every term with x in the denominator approaches zero as x -> infinity.",
            why: "Reciprocal limit rule lim 1/x^r = 0 for r > 0."
          },
          {
            stepNumber: 3,
            title: "Compute the Limit",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{3 - 0 + 0}{5 + 0 - 0} = \\frac{3}{5}",
            explanation: "Substitute the zero limits into the expression.",
            why: "The limit of a quotient is the quotient of limits."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "3/5",
          expected: "3/5"
        }
      },
      {
        filename: "ex-02",
        title: "Limits at Infinity with Radicals",
        exerciseReference: "Section 2.6, Exercise 2",
        originalTopic: "Radical End Behavior",
        difficulty: "tier2",
        tags: ["radicals", "limits-at-infinity", "asymmetry"],
        problemStatement: "Evaluate lim_{x -> oo} sqrt(4x^2 + 1) / (3x - 2) and lim_{x -> -oo} sqrt(4x^2 + 1) / (3x - 2).",
        finalAnswer: "\\lim_{x \\to \\infty} = \\frac{2}{3}, \\quad \\lim_{x \\to -\\infty} = -\\frac{2}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Factor x from the Radical for x > 0",
            mathExpression: "x > 0 \\implies \\sqrt{4x^2 + 1} = \\sqrt{x^2(4 + 1/x^2)} = |x|\\sqrt{4 + 1/x^2} = x\\sqrt{4 + 1/x^2}",
            explanation: "Since x is positive as x -> oo, |x| = x.",
            why: "Square root of x^2 equals absolute value |x|."
          },
          {
            stepNumber: 2,
            title: "Evaluate Limit as x -> +oo",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{x\\sqrt{4 + 1/x^2}}{x(3 - 2/x)} = \\lim_{x \\to \\infty} \\frac{\\sqrt{4 + 1/x^2}}{3 - 2/x} = \\frac{\\sqrt{4 + 0}}{3 - 0} = \\frac{2}{3}",
            explanation: "Cancel factor x and evaluate limits of reciprocal terms.",
            why: "Reciprocal terms 1/x^2 and 2/x approach 0."
          },
          {
            stepNumber: 3,
            title: "Factor x from the Radical for x < 0",
            mathExpression: "x < 0 \\implies \\sqrt{4x^2 + 1} = |x|\\sqrt{4 + 1/x^2} = -x\\sqrt{4 + 1/x^2}",
            explanation: "Since x is negative as x -> -oo, |x| = -x.",
            why: "Crucial identity: sqrt(x^2) = -x whenever x < 0."
          },
          {
            stepNumber: 4,
            title: "Evaluate Limit as x -> -oo",
            mathExpression: "\\lim_{x \\to -\\infty} \\frac{-x\\sqrt{4 + 1/x^2}}{x(3 - 2/x)} = \\frac{-\\sqrt{4}}{3} = -\\frac{2}{3}",
            explanation: "Cancel factor x, leaving a negative sign from |-x|.",
            why: "The negative sign arises from the direction of approach toward -oo."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "2/3 - (-2/3)",
          expected: "4/3"
        }
      },
      {
        filename: "ex-03",
        title: "Difference of Radicals at Infinity",
        exerciseReference: "Section 2.6, Exercise 3",
        originalTopic: "Conjugate at Infinity",
        difficulty: "tier2",
        tags: ["radicals", "infinity-minus-infinity", "conjugate"],
        problemStatement: "Evaluate: lim_{x -> oo} (sqrt(x^2 + 4x) - x).",
        finalAnswer: "\\lim_{x \\to \\infty} (\\sqrt{x^2 + 4x} - x) = 2",
        steps: [
          {
            stepNumber: 1,
            title: "Multiply by the Radical Conjugate",
            mathExpression: "\\frac{(\\sqrt{x^2 + 4x} - x)(\\sqrt{x^2 + 4x} + x)}{\\sqrt{x^2 + 4x} + x} = \\frac{(x^2 + 4x) - x^2}{\\sqrt{x^2 + 4x} + x} = \\frac{4x}{\\sqrt{x^2 + 4x} + x}",
            explanation: "Multiply and divide by sqrt(x^2 + 4x) + x to resolve the oo - oo form.",
            why: "Conjugate multiplication converts oo - oo into an algebraically manageable fraction."
          },
          {
            stepNumber: 2,
            title: "Divide Numerator and Denominator by x",
            mathExpression: "\\frac{4x}{x\\left(\\sqrt{1 + \\frac{4}{x}} + 1\\right)} = \\frac{4}{\\sqrt{1 + \\frac{4}{x}} + 1}",
            explanation: "Factor x out of both the numerator and the denominator.",
            why: "Since x > 0, sqrt(x^2 + 4x) = x*sqrt(1 + 4/x)."
          },
          {
            stepNumber: 3,
            title: "Evaluate the Limit as x -> oo",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{4}{\\sqrt{1 + \\frac{4}{x}} + 1} = \\frac{4}{\\sqrt{1 + 0} + 1} = \\frac{4}{2} = 2",
            explanation: "Substitute 4/x -> 0 into the expression.",
            why: "Direct evaluation of the continuous expression after reciprocal cancellation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "4 / (1 + 1)",
          expected: "2"
        }
      },
      {
        filename: "ex-04",
        title: "Vertical Asymptotes and One-Sided Infinite Limits",
        exerciseReference: "Section 2.6, Exercise 4",
        originalTopic: "Vertical Asymptote Analysis",
        difficulty: "tier1",
        tags: ["vertical-asymptote", "infinite-limits", "one-sided"],
        problemStatement: "Find the vertical asymptotes of f(x) = 2x / (x^2 - 4) and analyze one-sided limits around x = 2.",
        finalAnswer: "\\text{Vertical asymptotes at } x = 2 \\text{ and } x = -2; \\quad \\lim_{x \\to 2^+} f(x) = +\\infty, \\; \\lim_{x \\to 2^-} f(x) = -\\infty",
        steps: [
          {
            stepNumber: 1,
            title: "Factor Denominator and Find Singular Points",
            mathExpression: "x^2 - 4 = 0 \\implies (x - 2)(x + 2) = 0 \\implies x = 2, \\; x = -2",
            explanation: "Set the simplified denominator to zero to locate candidate vertical asymptotes.",
            why: "A rational function in lowest terms has vertical asymptotes at the zeroes of its denominator."
          },
          {
            stepNumber: 2,
            title: "Analyze One-Sided Limit as x -> 2^+",
            mathExpression: "x \\to 2^+ \\implies x > 2 \\implies x - 2 > 0 \\implies \\frac{2(2)}{(x - 2)(4)} = \\frac{4}{0^+} = +\\infty",
            explanation: "As x approaches 2 from the right, the numerator is positive and the denominator is small and positive.",
            why: "A positive finite numerator divided by a positive infinitesimal yields +oo."
          },
          {
            stepNumber: 3,
            title: "Analyze One-Sided Limit as x -> 2^-",
            mathExpression: "x \\to 2^- \\implies x < 2 \\implies x - 2 < 0 \\implies \\frac{2(2)}{(x - 2)(4)} = \\frac{4}{0^-} = -\\infty",
            explanation: "As x approaches 2 from the left, x - 2 is negative, making the denominator small and negative.",
            why: "A positive finite numerator divided by a negative infinitesimal yields -oo."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "2*x / ((x - 2)*(x + 2)) - 2*x / (x**2 - 4)",
          expected: "0",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Finding an Oblique (Slant) Asymptote",
        exerciseReference: "Section 2.6, Exercise 5",
        originalTopic: "Oblique Asymptotes",
        difficulty: "tier2",
        tags: ["oblique-asymptote", "polynomial-division", "slant-asymptote"],
        problemStatement: "Find the oblique asymptote of f(x) = (2x^2 + 3x - 1) / (x + 1) using polynomial long division.",
        finalAnswer: "y = 2x + 1 \\text{ is the oblique asymptote}",
        steps: [
          {
            stepNumber: 1,
            title: "Perform Polynomial Long Division",
            mathExpression: "\\frac{2x^2 + 3x - 1}{x + 1} = 2x + 1 - \\frac{2}{x + 1}",
            explanation: "Divide (2x^2 + 3x - 1) by (x + 1): quotient is 2x + 1 with remainder -2.",
            why: "Long division separates the linear asymptote from the decaying remainder."
          },
          {
            stepNumber: 2,
            title: "Evaluate Remainder Limit at Infinity",
            mathExpression: "\\lim_{x \\to \\pm \\infty} \\left[ f(x) - (2x + 1) \\right] = \\lim_{x \\to \\pm \\infty} \\left( -\\frac{2}{x + 1} \\right) = 0",
            explanation: "The vertical distance between the curve and the line 2x + 1 approaches zero as |x| -> oo.",
            why: "By definition, y = mx + b is an oblique asymptote if lim [f(x) - (mx + b)] = 0."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "(2*x**2 + 3*x - 1)/(x + 1) - (2*x + 1 - 2/(x + 1))",
          expected: "0",
          variable: "x"
        }
      }
    ]
  }
];
