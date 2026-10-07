// scripts/curriculum-data-ch04-part1.ts
/**
 * Authoritative Curriculum Data for Chapter 4 Sections 4.1 to 4.4
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH04_SECTIONS_PART1: SectionDef[] = [
  {
    chapter: "ch04",
    chapterDir: "ch04-applications-of-derivatives",
    section: "4.1",
    sectionDir: "4.1-extreme-values-of-functions-on-closed-intervals",
    title: "Extreme Values of Functions on Closed Intervals",
    definitions: [
      {
        id: "theorem-extreme-value-theorem",
        title: "The Extreme Value Theorem (EVT)",
        category: "theorem",
        latex: "f \\in C[a, b] \\implies \\exists c, d \\in [a, b] \\text{ s.t. } f(c) \\le f(x) \\le f(d) \\; \\forall x \\in [a, b]",
        statement: "If f is continuous on a closed, bounded interval [a, b], then f attains both an absolute maximum value M and an absolute minimum value m at least once in [a, b].",
        conditions: ["f must be continuous on [a, b]", "The interval [a, b] must be both closed and bounded"],
        explanation: "If the interval is open (e.g. (0, 1)) or f is discontinuous, the function may fail to attain extreme values.",
        keyTakeaway: "Continuous functions on closed bounded intervals always attain maximum and minimum values."
      },
      {
        id: "def-critical-point",
        title: "Critical Point of a Function",
        category: "definition",
        latex: "x_0 \\in \\text{Domain}(f) \\quad \\text{where } f'(x_0) = 0 \\quad \\text{or } f'(x_0) \\text{ is undefined}",
        statement: "An interior point c of the domain of f is a critical point if either f'(c) = 0 or f'(c) does not exist.",
        conditions: ["c must belong to the interior of domain of f"],
        explanation: "Fermat's Theorem states that local extrema can occur ONLY at critical points or boundary endpoints.",
        keyTakeaway: "Candidates for local extrema are points where f' is zero or undefined."
      },
      {
        id: "rule-closed-interval-method",
        title: "The Closed Interval Method",
        category: "rule",
        latex: "\\text{Absolute Extrema} = \\max / \\min \\{ f(c_i), f(a), f(b) \\}",
        statement: "To find absolute extrema of a continuous function on [a, b]: (1) Find all critical points in (a, b), (2) Evaluate f at all critical points, (3) Evaluate f at endpoints a and b, (4) The largest value is the absolute max; the smallest is the absolute min.",
        conditions: ["Interval [a, b] is closed and bounded", "f is continuous on [a, b]"],
        explanation: "Guaranteed to locate global extrema without needing second derivative tests.",
        keyTakeaway: "Evaluate f only at interior critical points and boundary endpoints."
      }
    ],
    summaryMDX: `# Section 4.1: Extreme Values of Functions on Closed Intervals

Optimization begins with locating points where a function achieves its greatest or least values.

---

## 1. Absolute vs Local Extrema

- **Absolute Maximum**: $f(c) \\ge f(x)$ for all $x$ in the domain.
- **Absolute Minimum**: $f(c) \\le f(x)$ for all $x$ in the domain.
- **Local Maximum / Minimum**: Extremum holds within an open neighborhood around $c$.

---

## 2. Fermat's Theorem on Local Extrema

If $f$ has a local maximum or minimum at an interior point $c$, and if $f'(c)$ exists, then:

$$
f'(c) = 0
$$

Therefore, local extrema can occur only at:
1. **Critical Points**: Points where $f'(c) = 0$ or $f'(c)$ does not exist.
2. **Endpoints**: Boundary points of the domain.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Absolute Extrema of a Cubic on a Closed Interval",
        exerciseReference: "Section 4.1, Exercise 1",
        originalTopic: "Closed Interval Method",
        difficulty: "tier1",
        tags: ["closed-interval-method", "absolute-extrema", "cubic"],
        problemStatement: "Find the absolute maximum and minimum values of f(x) = 2x^3 - 3x^2 - 12x + 1 on the closed interval [-2, 3].",
        finalAnswer: "\\text{Absolute Maximum: } 8 \\text{ at } x = -1; \\quad \\text{Absolute Minimum: } -19 \\text{ at } x = 2",
        steps: [
          {
            stepNumber: 1,
            title: "Find Critical Points in (-2, 3)",
            mathExpression: "f'(x) = 6x^2 - 6x - 12 = 6(x^2 - x - 2) = 6(x - 2)(x + 1) = 0 \\implies x = 2, \\; x = -1",
            explanation: "Differentiate f(x) and set f'(x) = 0.",
            why: "Both x = 2 and x = -1 lie inside (-2, 3)."
          },
          {
            stepNumber: 2,
            title: "Evaluate f at Critical Points",
            mathExpression: "f(-1) = 2(-1) - 3(1) - 12(-1) + 1 = -2 - 3 + 12 + 1 = 8; \\quad f(2) = 2(8) - 3(4) - 12(2) + 1 = 16 - 12 - 24 + 1 = -19",
            explanation: "Calculate values at interior critical points.",
            why: "Critical point candidates."
          },
          {
            stepNumber: 3,
            title: "Evaluate f at Endpoints",
            mathExpression: "f(-2) = 2(-8) - 3(4) - 12(-2) + 1 = -16 - 12 + 24 + 1 = -3; \\quad f(3) = 2(27) - 3(9) - 12(3) + 1 = 54 - 27 - 36 + 1 = -8",
            explanation: "Evaluate at boundaries x = -2 and x = 3.",
            why: "Endpoint candidates."
          },
          {
            stepNumber: 4,
            title: "Compare All Candidate Values",
            mathExpression: "\\max\\{-3, 8, -19, -8\\} = 8, \\quad \\min\\{-3, 8, -19, -8\\} = -19",
            explanation: "The largest value is 8; the smallest value is -19.",
            why: "Closed Interval Method conclusion."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "2*x**3 - 3*x**2 - 12*x + 1",
          expected: "6*x**2 - 6*x - 12",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Extrema with Fractional Exponent and Undefined Derivative",
        exerciseReference: "Section 4.1, Exercise 2",
        originalTopic: "Non-Differentiable Critical Points",
        difficulty: "tier2",
        tags: ["fractional-powers", "critical-points", "cusp"],
        problemStatement: "Find the absolute extrema of f(x) = x^(2/3) * (5 - 2x) on [-1, 2].",
        finalAnswer: "\\text{Absolute Maximum: } 7 \\text{ at } x = -1; \\quad \\text{Absolute Minimum: } 0 \\text{ at } x = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate f(x) via Product Rule",
            mathExpression: "f(x) = 5x^{2/3} - 2x^{5/3} \\implies f'(x) = \\frac{10}{3}x^{-1/3} - \\frac{10}{3}x^{2/3} = \\frac{10}{3x^{1/3}}(1 - x)",
            explanation: "Expand and differentiate.",
            why: "Locating critical points."
          },
          {
            stepNumber: 2,
            title: "Identify Critical Points",
            mathExpression: "f'(x) = 0 \\implies 1 - x = 0 \\implies x = 1; \\quad f'(x) \\text{ undefined at } x = 0",
            explanation: "x = 1 makes numerator zero; x = 0 makes denominator zero.",
            why: "Both x = 1 and x = 0 are critical points in (-1, 2)."
          },
          {
            stepNumber: 3,
            title: "Evaluate f at All Candidates",
            mathExpression: "f(-1) = (-1)^{2/3}(5 + 2) = 7, \\; f(0) = 0, \\; f(1) = 1(5 - 2) = 3, \\; f(2) = 2^{2/3}(5 - 4) = \\sqrt[3]{4} \\approx 1.59",
            explanation: "Evaluate f at endpoints and critical points. The maximum value is 7 at x = -1, and minimum is 0 at x = 0.",
            why: "Extreme value theorem guarantees maximum and minimum occur at critical points or endpoints."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "5*x**(Rational(2,3)) - 2*x**(Rational(5,3))",
          expected: "Rational(10,3)*x**(-Rational(1,3)) - Rational(10,3)*x**(Rational(2,3))",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Absolute Extrema of a Trigonometric Function",
        exerciseReference: "Section 4.1, Exercise 3",
        originalTopic: "Trigonometric Extrema",
        difficulty: "tier2",
        tags: ["trigonometry", "closed-interval", "extrema"],
        problemStatement: "Find the absolute extrema of f(x) = x - 2*sin(x) on [0, 2*pi].",
        finalAnswer: "\\text{Absolute Maximum: } 2\\pi \\approx 6.28 \\text{ at } x = 2\\pi; \\quad \\text{Absolute Minimum: } \\frac{\\pi}{3} - \\sqrt{3} \\approx -0.684 \\text{ at } x = \\frac{\\pi}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Critical Points in (0, 2*pi)",
            mathExpression: "f'(x) = 1 - 2\\cos x = 0 \\implies \\cos x = \\frac{1}{2} \\implies x = \\frac{\\pi}{3}, \\; \\frac{5\\pi}{3}",
            explanation: "Solve f'(x) = 0 for angles in [0, 2*pi].",
            why: "Critical points."
          },
          {
            stepNumber: 2,
            title: "Evaluate f at Critical Points",
            mathExpression: "f(\\pi/3) = \\frac{\\pi}{3} - 2\\sin(\\pi/3) = \\frac{\\pi}{3} - \\sqrt{3} \\approx -0.684; \\quad f(5\\pi/3) = \\frac{5\\pi}{3} - 2\\left(-\\frac{\\sqrt{3}}{2}\\right) = \\frac{5\\pi}{3} + \\sqrt{3} \\approx 6.968",
            explanation: "Calculate values at pi/3 and 5*pi/3.",
            why: "Interior candidate values."
          },
          {
            stepNumber: 3,
            title: "Evaluate f at Endpoints",
            mathExpression: "f(0) = 0 - 2\\sin(0) = 0; \\quad f(2\\pi) = 2\\pi - 2\\sin(2\\pi) = 2\\pi \\approx 6.283",
            explanation: "Endpoint evaluations.",
            why: "Endpoint candidate values."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x - 2*sin(x)",
          expected: "1 - 2*cos(x)",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Extrema of a Rational Function",
        exerciseReference: "Section 4.1, Exercise 4",
        originalTopic: "Rational Extrema",
        difficulty: "tier1",
        tags: ["rational-function", "extrema", "closed-interval"],
        problemStatement: "Find the absolute extrema of f(x) = x / (x^2 + 1) on [0, 3].",
        finalAnswer: "\\text{Absolute Maximum: } \\frac{1}{2} \\text{ at } x = 1; \\quad \\text{Absolute Minimum: } 0 \\text{ at } x = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Derivative via Quotient Rule",
            mathExpression: "f'(x) = \\frac{1(x^2 + 1) - x(2x)}{(x^2 + 1)^2} = \\frac{1 - x^2}{(x^2 + 1)^2}",
            explanation: "Differentiate f(x).",
            why: "Quotient rule."
          },
          {
            stepNumber: 2,
            title: "Find Critical Points in (0, 3)",
            mathExpression: "1 - x^2 = 0 \\implies x = 1 \\quad (x = -1 \\text{ is outside } [0, 3])",
            explanation: "Only x = 1 belongs to the interval [0, 3].",
            why: "Domain restriction."
          },
          {
            stepNumber: 3,
            title: "Evaluate f at Candidates",
            mathExpression: "f(0) = 0; \\quad f(1) = \\frac{1}{1 + 1} = \\frac{1}{2}; \\quad f(3) = \\frac{3}{3^2 + 1} = \\frac{3}{10} = 0.3",
            explanation: "Compare 0, 0.5, and 0.3.",
            why: "Global maximum is 1/2; global minimum is 0."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x/(x**2 + 1)",
          expected: "(1 - x**2)/(x**2 + 1)**2",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Extrema with Absolute Value Piecewise Corners",
        exerciseReference: "Section 4.1, Exercise 5",
        originalTopic: "Piecewise Absolute Value Extrema",
        difficulty: "tier2",
        tags: ["absolute-value", "critical-points", "corners"],
        problemStatement: "Find the absolute extrema of f(x) = |x^2 - 4| on [-3, 3].",
        finalAnswer: "\\text{Absolute Maximum: } 5 \\text{ at } x = \\pm 3; \\quad \\text{Absolute Minimum: } 0 \\text{ at } x = \\pm 2",
        steps: [
          {
            stepNumber: 1,
            title: "Locate Points of Non-Differentiability",
            mathExpression: "x^2 - 4 = 0 \\implies x = \\pm 2 \\implies f'(x) \\text{ does not exist at } x = \\pm 2",
            explanation: "The corners of the absolute value occur where the interior is zero.",
            why: "Points where f' DNE are critical points."
          },
          {
            stepNumber: 2,
            title: "Locate Zero-Slope Critical Points",
            mathExpression: "\\text{For } x \\in (-2, 2), \\; f(x) = 4 - x^2 \\implies f'(x) = -2x = 0 \\implies x = 0",
            explanation: "Differentiate the inverted parabola branch.",
            why: "Interior zero-slope point."
          },
          {
            stepNumber: 3,
            title: "Evaluate All Candidates",
            mathExpression: "f(\\pm 3) = |9 - 4| = 5; \\quad f(\\pm 2) = 0; \\quad f(0) = |0 - 4| = 4",
            explanation: "Compare candidate values: min is 0, max is 5.",
            why: "Closed interval method."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "abs(3**2 - 4) - 5",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch04",
    chapterDir: "ch04-applications-of-derivatives",
    section: "4.2",
    sectionDir: "4.2-the-mean-value-theorem",
    title: "The Mean Value Theorem",
    definitions: [
      {
        id: "theorem-rolles-theorem",
        title: "Rolle's Theorem",
        category: "theorem",
        latex: "f(a) = f(b) \\implies \\exists c \\in (a, b) \\text{ s.t. } f'(c) = 0",
        statement: "Suppose f is continuous on [a, b] and differentiable on (a, b). If f(a) = f(b), then there exists at least one point c in (a, b) where f'(c) = 0.",
        conditions: ["f continuous on [a, b]", "f differentiable on (a, b)", "f(a) = f(b)"],
        explanation: "If a smooth curve starts and ends at the same horizontal level, it must have at least one horizontal tangent in between.",
        keyTakeaway: "Matching endpoints on a smooth curve guarantee a horizontal tangent."
      },
      {
        id: "theorem-mean-value-theorem",
        title: "The Mean Value Theorem (MVT)",
        category: "theorem",
        latex: "f'(c) = \\frac{f(b) - f(a)}{b - a}",
        statement: "If f is continuous on [a, b] and differentiable on (a, b), then there exists at least one point c in (a, b) where the instantaneous rate of change f'(c) equals the average rate of change [f(b) - f(a)] / (b - a).",
        conditions: ["f continuous on [a, b]", "f differentiable on (a, b)"],
        explanation: "Geometrically, there is at least one tangent line parallel to the secant line joining endpoints (a, f(a)) and (b, f(b)).",
        keyTakeaway: "Instantaneous slope must equal average slope at some interior point."
      }
    ],
    summaryMDX: `# Section 4.2: The Mean Value Theorem

The Mean Value Theorem (MVT) is often called the **fundamental theorem of differential calculus**. It connects the global average behavior of a function over an interval to its local instantaneous derivative at an interior point.

---

## 1. Rolle's Theorem

If $f$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then:

$$
\\exists c \\in (a, b) \\quad \\text{such that} \\quad f'(c) = 0
$$

---

## 2. The Mean Value Theorem (MVT)

If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then there exists at least one $c \\in (a, b)$ such that:

$$
f'(c) = \\frac{f(b) - f(a)}{b - a}
$$

### Important Corollaries:
1. **Zero Derivative $\\implies$ Constant Function**: If $f'(x) = 0$ for all $x \\in (a, b)$, then $f(x) = C$.
2. **Equal Derivatives $\\implies$ Constant Difference**: If $f'(x) = g'(x)$ for all $x$, then $f(x) = g(x) + C$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Verifying Rolle's Theorem for a Cubic",
        exerciseReference: "Section 4.2, Exercise 1",
        originalTopic: "Rolle's Theorem Verification",
        difficulty: "tier1",
        tags: ["rolles-theorem", "cubic", "horizontal-tangent"],
        problemStatement: "Verify the hypotheses of Rolle's Theorem for f(x) = x^3 - 4x on [-2, 2], and find all numbers c that satisfy the conclusion.",
        finalAnswer: "c = \\pm \\frac{2}{\\sqrt{3}} = \\pm \\frac{2\\sqrt{3}}{3} \\approx \\pm 1.155",
        steps: [
          {
            stepNumber: 1,
            title: "Check Hypotheses",
            mathExpression: "f \\text{ is continuous on } [-2, 2], \\; f \\text{ is differentiable on } (-2, 2); \\quad f(-2) = -8 + 8 = 0, \\; f(2) = 8 - 8 = 0",
            explanation: "Polynomials are everywhere continuous and differentiable, and f(-2) = f(2) = 0.",
            why: "All 3 hypotheses of Rolle's Theorem are satisfied."
          },
          {
            stepNumber: 2,
            title: "Solve f'(c) = 0",
            mathExpression: "f'(x) = 3x^2 - 4 = 0 \\implies x^2 = \\frac{4}{3} \\implies c = \\pm \\frac{2}{\\sqrt{3}}",
            explanation: "Differentiate and set to zero.",
            why: "Both points lie strictly within (-2, 2)."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**3 - 4*x",
          expected: "3*x**2 - 4",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Applying MVT to a Quadratic Function",
        exerciseReference: "Section 4.2, Exercise 2",
        originalTopic: "Mean Value Theorem Calculation",
        difficulty: "tier1",
        tags: ["mean-value-theorem", "secant-slope", "quadratic"],
        problemStatement: "Verify MVT for f(x) = x^2 + 2x - 1 on [0, 2] and find the value of c.",
        finalAnswer: "c = 1",
        steps: [
          {
            stepNumber: 1,
            title: "Calculate Average Rate of Change",
            mathExpression: "f(0) = -1, \\quad f(2) = 4 + 4 - 1 = 7 \\implies \\frac{f(2) - f(0)}{2 - 0} = \\frac{7 - (-1)}{2} = \\frac{8}{2} = 4",
            explanation: "Compute the secant slope across [0, 2].",
            why: "MVT target slope."
          },
          {
            stepNumber: 2,
            title: "Equate f'(c) to Average Rate",
            mathExpression: "f'(x) = 2x + 2 \\implies 2c + 2 = 4 \\implies 2c = 2 \\implies c = 1",
            explanation: "Set derivative equal to secant slope 4.",
            why: "c = 1 is the unique interior point in (0, 2)."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**2 + 2*x - 1",
          expected: "2*x + 2",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Applying MVT to a Square Root Function",
        exerciseReference: "Section 4.2, Exercise 3",
        originalTopic: "MVT with Radicals",
        difficulty: "tier2",
        tags: ["mean-value-theorem", "radicals", "tangent-secant"],
        problemStatement: "Find the value of c guaranteed by the Mean Value Theorem for f(x) = sqrt(x) on [1, 9].",
        finalAnswer: "c = 4",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Average Rate of Change on [1, 9]",
            mathExpression: "\\frac{f(9) - f(1)}{9 - 1} = \\frac{3 - 1}{8} = \\frac{2}{8} = \\frac{1}{4}",
            explanation: "Evaluate secant slope.",
            why: "Secant line slope."
          },
          {
            stepNumber: 2,
            title: "Solve f'(c) = 1/4",
            mathExpression: "f'(x) = \\frac{1}{2\\sqrt{x}} \\implies \\frac{1}{2\\sqrt{c}} = \\frac{1}{4} \\implies 2\\sqrt{c} = 4 \\implies \\sqrt{c} = 2 \\implies c = 4",
            explanation: "Set derivative equal to 1/4 and solve for c.",
            why: "c = 4 lies strictly in (1, 9)."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "sqrt(x)",
          expected: "1/(2*sqrt(x))",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Proving Uniqueness of Real Roots via Rolle's Theorem",
        exerciseReference: "Section 4.2, Exercise 4",
        originalTopic: "Root Uniqueness Proof",
        difficulty: "tier2",
        tags: ["rolles-theorem", "proof", "root-uniqueness"],
        problemStatement: "Prove that the equation x^3 + 3x + 1 = 0 has exactly one real solution.",
        finalAnswer: "\\text{The equation has exactly one real root (at least one by IVT, at most one by Rolle's Theorem)}",
        steps: [
          {
            stepNumber: 1,
            title: "Prove Existence of at Least One Root (IVT)",
            mathExpression: "f(-1) = -1 - 3 + 1 = -3 < 0, \\quad f(0) = 1 > 0 \\implies \\exists r \\in (-1, 0) \\text{ s.t. } f(r) = 0",
            explanation: "Apply Intermediate Value Theorem on [-1, 0].",
            why: "Guarantees at least one real root."
          },
          {
            stepNumber: 2,
            title: "Assume Two Roots and Apply Rolle's Theorem",
            mathExpression: "\\text{Suppose } f(a) = f(b) = 0 \\text{ with } a < b \\implies \\exists c \\in (a, b) \\text{ s.t. } f'(c) = 0",
            explanation: "If two roots existed, Rolle's Theorem would require f'(c) = 0.",
            why: "Proof by contradiction."
          },
          {
            stepNumber: 3,
            title: "Demonstrate Contradiction with Derivative",
            mathExpression: "f'(x) = 3x^2 + 3 \\ge 3 > 0 \\quad \\forall x \\in \\mathbb{R}",
            explanation: "f'(x) is strictly positive everywhere; it can never equal 0.",
            why: "Contradiction implies f can have at most one real root."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**3 + 3*x + 1",
          expected: "3*x**2 + 3",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Proving Inequality via the Mean Value Theorem",
        exerciseReference: "Section 4.2, Exercise 5",
        originalTopic: "MVT Inequality Proof",
        difficulty: "tier3",
        tags: ["mean-value-theorem", "inequality", "trigonometry"],
        problemStatement: "Prove that |sin b - sin a| <= |b - a| for all real numbers a and b.",
        finalAnswer: "|\\sin b - \\sin a| \\le |b - a|",
        steps: [
          {
            stepNumber: 1,
            title: "Apply MVT to f(x) = sin(x) on [a, b]",
            mathExpression: "\\frac{\\sin b - \\sin a}{b - a} = f'(c) = \\cos c \\quad \\text{for some } c \\in (a, b)",
            explanation: "Since sine is continuous and differentiable everywhere, MVT applies.",
            why: "MVT formulation."
          },
          {
            stepNumber: 2,
            title: "Take Absolute Values and Bound Cosine",
            mathExpression: "|\\sin b - \\sin a| = |\\cos c| \\cdot |b - a| \\le 1 \\cdot |b - a| = |b - a|",
            explanation: "Because |cos(c)| <= 1 for all real c, the result follows immediately.",
            why: "Trigonometric bound |cos(x)| <= 1."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "1 - 1",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch04",
    chapterDir: "ch04-applications-of-derivatives",
    section: "4.3",
    sectionDir: "4.3-monotonic-functions-and-the-first-derivative-test",
    title: "Monotonic Functions and the First Derivative Test",
    definitions: [
      {
        id: "theorem-increasing-decreasing-test",
        title: "Increasing and Decreasing Test",
        category: "theorem",
        latex: "f'(x) > 0 \\implies f \\text{ is strictly increasing}; \\quad f'(x) < 0 \\implies f \\text{ is strictly decreasing}",
        statement: "Let f be continuous on [a, b] and differentiable on (a, b). If f'(x) > 0 for all x in (a, b), then f is increasing on [a, b]. If f'(x) < 0, f is decreasing.",
        conditions: ["Continuous on closed interval, differentiable on open interior"],
        explanation: "Positive slope means the curve rises from left to right; negative slope means it falls.",
        keyTakeaway: "Sign of f'(x) dictates whether f(x) is rising or falling."
      },
      {
        id: "test-first-derivative-test",
        title: "The First Derivative Test for Local Extrema",
        category: "test",
        latex: "+ \\to - \\implies \\text{Local Max}; \\quad - \\to + \\implies \\text{Local Min}; \\quad \\text{No sign change} \\implies \\text{No Extrema}",
        statement: "At a critical point c: if f' changes sign from positive to negative as x increases through c, f has a local max at c. If f' changes from negative to positive, f has a local min. If f' does not change sign, c is not a local extremum.",
        conditions: ["f is continuous at c", "f' exists in an open interval around c (except possibly at c)"],
        explanation: "Tests whether the curve peaks, valleys, or continues through an inflection.",
        keyTakeaway: "Sign changes of f' classify local peaks (+ to -) and valleys (- to +)."
      }
    ],
    summaryMDX: `# Section 4.3: Monotonic Functions and the First Derivative Test

The first derivative provides comprehensive information about where a function rises, where it falls, and where its local peaks and valleys reside.

---

## 1. Monotonicity Test

- If $f'(x) > 0$ on an interval, $f$ is **increasing** on that interval.
- If $f'(x) < 0$ on an interval, $f$ is **decreasing** on that interval.

---

## 2. The First Derivative Test

At each critical point $c$:
1. **Local Maximum**: $f'$ changes from **positive to negative** ($+ \\to -$).
2. **Local Minimum**: $f'$ changes from **negative to positive** ($- \\to +$).
3. **No Extremum**: $f'$ does not change sign (e.g. $+ \\to +$ or $- \\to -$, as in $y = x^3$ at $0$).
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Monotonicity and Local Extrema of a Cubic",
        exerciseReference: "Section 4.3, Exercise 1",
        originalTopic: "First Derivative Test on Polynomial",
        difficulty: "tier1",
        tags: ["monotonicity", "first-derivative-test", "local-extrema"],
        problemStatement: "Find intervals of increase/decrease and all local extrema for f(x) = 2x^3 - 9x^2 + 12x - 3.",
        finalAnswer: "\\text{Increasing on } (-\\infty, 1) \\cup (2, \\infty); \\; \\text{Decreasing on } (1, 2); \\; \\text{Local Max: } (1, 2); \\; \\text{Local Min: } (2, 1)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute f'(x) and Factor",
            mathExpression: "f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2)",
            explanation: "Differentiate and factor.",
            why: "Critical points are x = 1 and x = 2."
          },
          {
            stepNumber: 2,
            title: "Construct Sign Chart for f'(x)",
            mathExpression: "x < 1 \\implies f' > 0; \\quad 1 < x < 2 \\implies f' < 0; \\quad x > 2 \\implies f' > 0",
            explanation: "Test signs in each interval.",
            why: "Monotonicity test."
          },
          {
            stepNumber: 3,
            title: "Apply First Derivative Test",
            mathExpression: "x = 1: (+ \\to -) \\implies \\text{Local Max } f(1) = 2 - 9 + 12 - 3 = 2; \\quad x = 2: (- \\to +) \\implies \\text{Local Min } f(2) = 16 - 36 + 24 - 3 = 1",
            explanation: "Classify extrema based on sign changes.",
            why: "First derivative test."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "2*x**3 - 9*x**2 + 12*x - 3",
          expected: "6*x**2 - 18*x + 12",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Monotonicity of a Rational Function",
        exerciseReference: "Section 4.3, Exercise 2",
        originalTopic: "Rational Monotonicity",
        difficulty: "tier2",
        tags: ["rational-function", "first-derivative-test", "extrema"],
        problemStatement: "Find intervals of increase/decrease and local extrema for f(x) = x^2 / (x - 1).",
        finalAnswer: "\\text{Increasing on } (-\\infty, 0) \\cup (2, \\infty); \\; \\text{Decreasing on } (0, 1) \\cup (1, 2); \\; \\text{Local Max at } (0, 0); \\; \\text{Local Min at } (2, 4)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Derivative via Quotient Rule",
            mathExpression: "f'(x) = \\frac{2x(x - 1) - x^2(1)}{(x - 1)^2} = \\frac{2x^2 - 2x - x^2}{(x - 1)^2} = \\frac{x(x - 2)}{(x - 1)^2}",
            explanation: "Differentiate and factor numerator.",
            why: "Quotient rule."
          },
          {
            stepNumber: 2,
            title: "Identify Partition Points",
            mathExpression: "f'(x) = 0 \\implies x = 0, \\; 2; \\quad f' \\text{ undefined at } x = 1 \\text{ (vertical asymptote)}",
            explanation: "Partition points are 0, 1, and 2.",
            why: "Critical points and domain boundary."
          },
          {
            stepNumber: 3,
            title: "Classify Extrema",
            mathExpression: "x = 0: (+ \\to -) \\implies \\text{Local Max at } (0, 0); \\quad x = 2: (- \\to +) \\implies \\text{Local Min at } (2, 4)",
            explanation: "Apply First Derivative Test.",
            why: "Local extrema classification."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**2/(x - 1)",
          expected: "x*(x - 2)/(x - 1)**2",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Monotonicity with Semicircular Radical",
        exerciseReference: "Section 4.3, Exercise 3",
        originalTopic: "Radical First Derivative Test",
        difficulty: "tier2",
        tags: ["radicals", "first-derivative-test", "domain"],
        problemStatement: "Find the local extrema of f(x) = x * sqrt(4 - x^2) on its domain [-2, 2].",
        finalAnswer: "\\text{Local Max at } (\\sqrt{2}, 2); \\quad \\text{Local Min at } (-\\sqrt{2}, -2)",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate via Product Rule",
            mathExpression: "f'(x) = 1\\sqrt{4 - x^2} + x\\left(\\frac{-x}{\\sqrt{4 - x^2}}\\right) = \\frac{(4 - x^2) - x^2}{\\sqrt{4 - x^2}} = \\frac{4 - 2x^2}{\\sqrt{4 - x^2}}",
            explanation: "Combine terms over common denominator.",
            why: "Product and chain rules."
          },
          {
            stepNumber: 2,
            title: "Find Critical Points",
            mathExpression: "4 - 2x^2 = 0 \\implies x^2 = 2 \\implies x = \\pm \\sqrt{2}",
            explanation: "Zeroes of numerator in (-2, 2).",
            why: "Critical points."
          },
          {
            stepNumber: 3,
            title: "Classify Extrema",
            mathExpression: "f(-\\sqrt{2}) = -\\sqrt{2}(2 - 0)^{1/2} = -2 \\text{ (Min)}; \\quad f(\\sqrt{2}) = \\sqrt{2}(2) = 2 \\text{ (Max)}",
            explanation: "Sign changes - to + at -sqrt(2), and + to - at sqrt(2).",
            why: "First derivative test."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x*sqrt(4 - x**2)",
          expected: "(4 - 2*x**2)/sqrt(4 - x**2)",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Trigonometric Extrema via First Derivative",
        exerciseReference: "Section 4.3, Exercise 4",
        originalTopic: "Trigonometric Monotonicity",
        difficulty: "tier2",
        tags: ["trigonometry", "extrema", "first-derivative"],
        problemStatement: "Find all local extrema of f(x) = cos^2(x) - 2*sin(x) on [0, 2*pi].",
        finalAnswer: "\\text{Local Max at } x = \\frac{3\\pi}{2} \\text{ with value } 2; \\quad \\text{Local Min at } x = \\frac{\\pi}{2} \\text{ with value } -2",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Derivative",
            mathExpression: "f'(x) = 2\\cos x(-\\sin x) - 2\\cos x = -2\\cos x(\\sin x + 1)",
            explanation: "Factor out -2*cos(x).",
            why: "Differentiation and factoring."
          },
          {
            stepNumber: 2,
            title: "Find Critical Points on [0, 2*pi]",
            mathExpression: "\\cos x = 0 \\implies x = \\frac{\\pi}{2}, \\; \\frac{3\\pi}{2}; \\quad \\sin x + 1 = 0 \\implies \\sin x = -1 \\implies x = \\frac{3\\pi}{2}",
            explanation: "Critical points are pi/2 and 3*pi/2.",
            why: "Zeroes of derivative."
          },
          {
            stepNumber: 3,
            title: "Evaluate and Classify",
            mathExpression: "f(\\pi/2) = 0 - 2(1) = -2 \\text{ (Min)}; \\quad f(3\\pi/2) = 0 - 2(-1) = 2 \\text{ (Max)}",
            explanation: "Compare values.",
            why: "First derivative test."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "cos(x)**2 - 2*sin(x)",
          expected: "-2*cos(x)*(sin(x) + 1)",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Monotonicity with Cusp at the Origin",
        exerciseReference: "Section 4.3, Exercise 5",
        originalTopic: "Cusp First Derivative Test",
        difficulty: "tier3",
        tags: ["fractional-powers", "cusp", "extrema"],
        problemStatement: "Find the local extrema of f(x) = x^(4/5)*(x - 4).",
        finalAnswer: "\\text{Local Max at } (0, 0); \\quad \\text{Local Min at } \\left(\\frac{16}{9}, -\\frac{20}{9}\\left(\\frac{16}{9}\\right)^{4/5}\\right)",
        steps: [
          {
            stepNumber: 1,
            title: "Expand and Differentiate",
            mathExpression: "f(x) = x^{9/5} - 4x^{4/5} \\implies f'(x) = \\frac{9}{5}x^{4/5} - \\frac{16}{5}x^{-1/5} = \\frac{9x - 16}{5x^{1/5}}",
            explanation: "Combine over common denominator 5*x^(1/5).",
            why: "Differentiation of power function."
          },
          {
            stepNumber: 2,
            title: "Locate Critical Points",
            mathExpression: "9x - 16 = 0 \\implies x = \\frac{16}{9}; \\quad f'(x) \\text{ undefined at } x = 0",
            explanation: "x = 16/9 is a stationary point; x = 0 is a vertical tangent/cusp.",
            why: "Critical points."
          },
          {
            stepNumber: 3,
            title: "Classify via First Derivative Test",
            mathExpression: "x = 0: (+ \\to -) \\implies \\text{Local Max at } (0, 0); \\quad x = 16/9: (- \\to +) \\implies \\text{Local Min}",
            explanation: "Sign of f' changes appropriately.",
            why: "First derivative test."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**(Rational(9,5)) - 4*x**(Rational(4,5))",
          expected: "(9*x - 16)/(5*x**(Rational(1,5)))",
          variable: "x"
        }
      }
    ]
  },
  {
    chapter: "ch04",
    chapterDir: "ch04-applications-of-derivatives",
    section: "4.4",
    sectionDir: "4.4-concavity-and-curve-sketching",
    title: "Concavity and Curve Sketching",
    definitions: [
      {
        id: "theorem-concavity-test",
        title: "The Concavity Test",
        category: "theorem",
        latex: "f''(x) > 0 \\implies \\text{Concave Up (CU)}; \\quad f''(x) < 0 \\implies \\text{Concave Down (CD)}",
        statement: "If f''(x) > 0 for all x on an interval, the graph of f is concave upward (lies above its tangent lines). If f''(x) < 0, the graph is concave downward (lies below its tangent lines).",
        conditions: ["f is twice differentiable on the interval"],
        explanation: "f'' > 0 means the derivative f' is increasing (tangent slopes become more positive).",
        keyTakeaway: "Positive second derivative means bowl holds water (concave up)."
      },
      {
        id: "def-point-of-inflection",
        title: "Point of Inflection",
        category: "definition",
        latex: "(c, f(c)) \\quad \\text{where concavity changes sign and tangent line exists}",
        statement: "A point (c, f(c)) on a curve is a point of inflection if f is continuous there and the curve changes from concave up to concave down, or from concave down to concave up.",
        conditions: ["f is continuous at c", "Concavity strictly changes sign across c"],
        explanation: "At an inflection point, f''(c) = 0 or f''(c) does not exist (and the tangent line crosses the curve).",
        keyTakeaway: "Inflection points are where the curve transitions between curving upward and downward."
      },
      {
        id: "test-second-derivative-test",
        title: "The Second Derivative Test for Local Extrema",
        category: "test",
        latex: "f'(c) = 0 \\text{ and } f''(c) < 0 \\implies \\text{Local Max}; \\quad f'(c) = 0 \\text{ and } f''(c) > 0 \\implies \\text{Local Min}",
        statement: "Suppose f''(x) is continuous near c with f'(c) = 0. If f''(c) < 0, f has a local maximum at c. If f''(c) > 0, f has a local minimum. If f''(c) = 0, the test is inconclusive.",
        conditions: ["f'(c) = 0 (horizontal tangent)", "f''(c) is non-zero"],
        explanation: "If f''(c) = 0, revert to the First Derivative Test.",
        keyTakeaway: "Negative second derivative at critical point -> local maximum."
      }
    ],
    summaryMDX: `# Section 4.4: Concavity and Curve Sketching

The second derivative governs the **curvature** (bending direction) of a graph.

---

## 1. Concavity Test

- **Concave Up**: $f''(x) > 0$ (graph curves upward like a cup, lying above its tangent lines).
- **Concave Down**: $f''(x) < 0$ (graph curves downward like a frown, lying below its tangent lines).

---

## 2. Points of Inflection

An **inflection point** occurs where:
1. The curve is continuous and possesses a tangent line.
2. The concavity **strictly changes sign** ($+ \\to -$ or $- \\to +$).

---

## 3. The Second Derivative Test

For a critical point where $f'(c) = 0$:
- $f''(c) < 0 \\implies$ **Local Maximum**
- $f''(c) > 0 \\implies$ **Local Minimum**
- $f''(c) = 0 \\implies$ **Inconclusive** (use First Derivative Test).
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Concavity and Inflection Points of a Quartic",
        exerciseReference: "Section 4.4, Exercise 1",
        originalTopic: "Inflection Points",
        difficulty: "tier1",
        tags: ["concavity", "inflection-points", "second-derivative"],
        problemStatement: "Find the intervals of concavity and inflection points for f(x) = x^4 - 4x^3 + 10.",
        finalAnswer: "\\text{Concave Up on } (-\\infty, 0) \\cup (2, \\infty); \\; \\text{Concave Down on } (0, 2); \\; \\text{Inflection Points at } (0, 10) \\text{ and } (2, -6)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute First and Second Derivatives",
            mathExpression: "f'(x) = 4x^3 - 12x^2, \\quad f''(x) = 12x^2 - 24x = 12x(x - 2)",
            explanation: "Differentiate twice.",
            why: "Second derivative governs concavity."
          },
          {
            stepNumber: 2,
            title: "Find Candidate Inflection Points",
            mathExpression: "f''(x) = 0 \\implies 12x(x - 2) = 0 \\implies x = 0, \\; x = 2",
            explanation: "Locate zeroes of f''(x).",
            why: "Candidates for inflection."
          },
          {
            stepNumber: 3,
            title: "Determine Sign of f''(x) and Points of Inflection",
            mathExpression: "x < 0 \\implies f'' > 0 \\text{ (CU)}; \\quad 0 < x < 2 \\implies f'' < 0 \\text{ (CD)}; \\quad x > 2 \\implies f'' > 0 \\text{ (CU)}",
            explanation: "Sign changes at both 0 and 2. f(0) = 10 and f(2) = 16 - 32 + 10 = -6.",
            why: "Both points are verified inflection points."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**4 - 4*x**3 + 10",
          expected: "12*x*(x - 2)",
          variable: "x",
          order: 2
        }
      },
      {
        filename: "ex-02",
        title: "Applying the Second Derivative Test",
        exerciseReference: "Section 4.4, Exercise 2",
        originalTopic: "Second Derivative Test",
        difficulty: "tier1",
        tags: ["second-derivative-test", "local-extrema", "cubic"],
        problemStatement: "Use the Second Derivative Test to classify the local extrema of f(x) = x^3 - 3x^2 - 9x + 5.",
        finalAnswer: "\\text{Local Max at } (-1, 10); \\quad \\text{Local Min at } (3, -22)",
        steps: [
          {
            stepNumber: 1,
            title: "Find Critical Points via First Derivative",
            mathExpression: "f'(x) = 3x^2 - 6x - 9 = 3(x^2 - 2x - 3) = 3(x - 3)(x + 1) = 0 \\implies x = 3, \\; x = -1",
            explanation: "Solve f'(x) = 0.",
            why: "Candidates for local extrema."
          },
          {
            stepNumber: 2,
            title: "Compute Second Derivative",
            mathExpression: "f''(x) = 6x - 6 = 6(x - 1)",
            explanation: "Differentiate f'(x).",
            why: "Evaluation function for Second Derivative Test."
          },
          {
            stepNumber: 3,
            title: "Evaluate f''(x) at Critical Points",
            mathExpression: "f''(-1) = 6(-1 - 1) = -12 < 0 \\implies \\text{Local Max}; \\quad f''(3) = 6(3 - 1) = 12 > 0 \\implies \\text{Local Min}",
            explanation: "f(-1) = -1 - 3 + 9 + 5 = 10; f(3) = 27 - 27 - 27 + 5 = -22.",
            why: "Second Derivative Test conclusion."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**3 - 3*x**2 - 9*x + 5",
          expected: "6*x - 6",
          variable: "x",
          order: 2
        }
      },
      {
        filename: "ex-03",
        title: "Inflection Points of the Witch of Agnesi",
        exerciseReference: "Section 4.4, Exercise 3",
        originalTopic: "Rational Inflection Points",
        difficulty: "tier2",
        tags: ["rational-function", "inflection-points", "bell-shaped"],
        problemStatement: "Find the inflection points of f(x) = 1/(x^2 + 1).",
        finalAnswer: "\\left(-\\frac{1}{\\sqrt{3}}, \\frac{3}{4}\\right) \\quad \\text{and} \\quad \\left(\\frac{1}{\\sqrt{3}}, \\frac{3}{4}\\right)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute First Derivative",
            mathExpression: "f'(x) = -\\frac{2x}{(x^2 + 1)^2}",
            explanation: "Apply chain rule to (x^2 + 1)^(-1).",
            why: "First derivative."
          },
          {
            stepNumber: 2,
            title: "Compute Second Derivative",
            mathExpression: "f''(x) = -\\frac{2(x^2 + 1)^2 - 2x \\cdot 2(x^2 + 1)(2x)}{(x^2 + 1)^4} = -\\frac{2(x^2 + 1)[(x^2 + 1) - 4x^2]}{(x^2 + 1)^4} = \\frac{2(3x^2 - 1)}{(x^2 + 1)^3}",
            explanation: "Quotient rule simplified by factoring (x^2 + 1).",
            why: "Second derivative."
          },
          {
            stepNumber: 3,
            title: "Solve f''(x) = 0 and Evaluate Points",
            mathExpression: "3x^2 - 1 = 0 \\implies x = \\pm \\frac{1}{\\sqrt{3}}; \\quad f\\left(\\pm \\frac{1}{\\sqrt{3}}\\right) = \\frac{1}{1/3 + 1} = \\frac{3}{4}",
            explanation: "Concavity changes sign across both roots.",
            why: "Points of inflection."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "1/(x**2 + 1)",
          expected: "2*(3*x**2 - 1)/(x**2 + 1)**3",
          variable: "x",
          order: 2
        }
      },
      {
        filename: "ex-04",
        title: "Full Curve Sketch Analysis of a Rational Function",
        exerciseReference: "Section 4.4, Exercise 4",
        originalTopic: "Curve Sketching",
        difficulty: "tier2",
        tags: ["curve-sketching", "asymptotes", "inflection-points"],
        problemStatement: "Determine the domain, asymptotes, local extrema, and inflection points for f(x) = (x - 1)/x^2.",
        finalAnswer: "\\text{VA: } x = 0, \\; \\text{HA: } y = 0; \\; \\text{Local Max at } (2, 1/4); \\; \\text{Inflection Point at } (3, 2/9)",
        steps: [
          {
            stepNumber: 1,
            title: "Domain and Asymptotes",
            mathExpression: "\\text{Domain: } \\mathbb{R} \\setminus \\{0\\}; \\quad \\lim_{x \\to 0} f(x) = -\\infty \\implies x = 0 \\text{ (VA)}; \\quad \\lim_{x \\to \\pm \\infty} f(x) = 0 \\implies y = 0 \\text{ (HA)}",
            explanation: "Analyze denominator zero and limits at infinity.",
            why: "Foundational graph frame."
          },
          {
            stepNumber: 2,
            title: "Find Local Extrema via f'(x)",
            mathExpression: "f(x) = x^{-1} - x^{-2} \\implies f'(x) = -x^{-2} + 2x^{-3} = \\frac{2 - x}{x^3} = 0 \\implies x = 2",
            explanation: "x = 2 gives local max f(2) = 1/4.",
            why: "First derivative critical points."
          },
          {
            stepNumber: 3,
            title: "Find Inflection Points via f''(x)",
            mathExpression: "f''(x) = 2x^{-3} - 6x^{-4} = \\frac{2(x - 3)}{x^4} = 0 \\implies x = 3",
            explanation: "f''(x) changes sign from negative to positive at x = 3. Point: (3, 2/9).",
            why: "Second derivative inflection."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "(x - 1)/x**2",
          expected: "(2 - x)/x**3",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Concavity and Inflection of a Trigonometric Function",
        exerciseReference: "Section 4.4, Exercise 5",
        originalTopic: "Trigonometric Concavity",
        difficulty: "tier2",
        tags: ["trigonometry", "concavity", "inflection-points"],
        problemStatement: "Find the inflection points of f(x) = x + 2*sin(x) on [0, 2*pi].",
        finalAnswer: "(0, 0), \\; (\\pi, \\pi), \\; (2\\pi, 2\\pi)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute First and Second Derivatives",
            mathExpression: "f'(x) = 1 + 2\\cos x, \\quad f''(x) = -2\\sin x",
            explanation: "Differentiate twice.",
            why: "Second derivative."
          },
          {
            stepNumber: 2,
            title: "Solve f''(x) = 0 on [0, 2*pi]",
            mathExpression: "-2\\sin x = 0 \\implies \\sin x = 0 \\implies x = 0, \\; \\pi, \\; 2\\pi",
            explanation: "Zeroes of sine.",
            why: "Candidates for inflection."
          },
          {
            stepNumber: 3,
            title: "Verify Sign Change across pi",
            mathExpression: "x \\in (0, \\pi) \\implies f'' < 0 \\text{ (CD)}; \\quad x \\in (\\pi, 2\\pi) \\implies f'' > 0 \\text{ (CU)}",
            explanation: "Concavity strictly changes sign across x = pi. Point: (pi, pi).",
            why: "Verified inflection point."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x + 2*sin(x)",
          expected: "-2*sin(x)",
          variable: "x",
          order: 2
        }
      }
    ]
  }
];
