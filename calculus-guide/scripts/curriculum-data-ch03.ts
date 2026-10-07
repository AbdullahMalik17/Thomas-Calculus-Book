// scripts/curriculum-data-ch03.ts
/**
 * Authoritative Curriculum Data for Chapter 3: Derivatives
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH03_SECTIONS: SectionDef[] = [
  {
    chapter: "ch03",
    chapterDir: "ch03-derivatives",
    section: "3.1",
    sectionDir: "3.1-tangents-and-the-derivative-at-a-point",
    title: "Tangents and the Derivative at a Point",
    definitions: [
      {
        id: "def-derivative-at-a-point",
        title: "Derivative of a Function at a Point",
        category: "definition",
        latex: "f'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h} = \\lim_{z \\to x_0} \\frac{f(z) - f(x_0)}{z - x_0}",
        statement: "The derivative of a function f at a point x0 is the limit of the difference quotient as h approaches zero, provided this limit exists.",
        conditions: ["f is defined in an open interval containing x0", "The limit is a finite real number"],
        explanation: "Represents both the slope of the tangent line to y = f(x) at (x0, f(x0)) and the instantaneous rate of change of y with respect to x at x0.",
        keyTakeaway: "f'(x0) is the instantaneous rate of change and the tangent slope at x0."
      },
      {
        id: "formula-tangent-and-normal",
        title: "Tangent and Normal Line Equations",
        category: "formula",
        latex: "\\text{Tangent: } y - y_0 = f'(x_0)(x - x_0), \\qquad \\text{Normal: } y - y_0 = -\\frac{1}{f'(x_0)}(x - x_0) \\quad (f'(x_0) \\neq 0)",
        statement: "The tangent line passes through (x0, y0) with slope f'(x0). The normal line is perpendicular to the tangent line at the point of tangency.",
        conditions: ["f'(x0) exists and is non-zero for normal line", "If f'(x0) = 0, tangent is horizontal y = y0 and normal is vertical x = x0"],
        explanation: "Perpendicular lines in the Cartesian plane have negative reciprocal slopes: m1 * m2 = -1.",
        keyTakeaway: "Normal line slope is the negative reciprocal of tangent slope."
      }
    ],
    summaryMDX: `# Section 3.1: Tangents and the Derivative at a Point

The derivative is the mathematical engine of calculus, quantifying how rapidly a dependent variable changes in response to infinitesimal adjustments in an independent variable.

---

## 1. Definition of the Derivative at a Point

Let $f$ be defined on an open interval containing $x_0$. The **derivative of $f$ at $x_0$**, denoted $f'(x_0)$, is:

$$
f'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h}
$$

An equivalent formulation letting $z = x_0 + h$:

$$
f'(x_0) = \\lim_{z \\to x_0} \\frac{f(z) - f(x_0)}{z - x_0}
$$

---

## 2. Geometric Interpretation: Tangent and Normal Lines

- **Tangent Line**: The line passing through $P(x_0, f(x_0))$ with slope $m = f'(x_0)$:
  $$
  y - f(x_0) = f'(x_0)(x - x_0)
  $$
- **Normal Line**: The line through $P$ perpendicular to the tangent line:
  $$
  y - f(x_0) = -\\frac{1}{f'(x_0)}(x - x_0) \\quad (f'(x_0) \\neq 0)
  $$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Derivative and Tangent of a Quadratic at a Point",
        exerciseReference: "Section 3.1, Exercise 1",
        originalTopic: "Limit Definition of Derivative",
        difficulty: "tier1",
        tags: ["derivative-definition", "tangent-line", "quadratic"],
        problemStatement: "Use the limit definition of the derivative to find f'(2) for f(x) = x^2 - 4x + 1, and write the equation of the tangent line at x = 2.",
        finalAnswer: "f'(2) = 0; \\quad \\text{Tangent line: } y = -3",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate f(2) and Form Difference Quotient",
            mathExpression: "f(2) = 2^2 - 4(2) + 1 = 4 - 8 + 1 = -3",
            explanation: "Evaluate the function at the target point.",
            why: "Function value provides the y-coordinate of the point of tangency."
          },
          {
            stepNumber: 2,
            title: "Expand f(2 + h)",
            mathExpression: "f(2 + h) = (2 + h)^2 - 4(2 + h) + 1 = (4 + 4h + h^2) - 8 - 4h + 1 = h^2 - 3",
            explanation: "Substitute 2+h into the quadratic polynomial.",
            why: "Evaluation of the perturbed function coordinate."
          },
          {
            stepNumber: 3,
            title: "Compute Limit as h -> 0",
            mathExpression: "f'(2) = \\lim_{h \\to 0} \\frac{(h^2 - 3) - (-3)}{h} = \\lim_{h \\to 0} \\frac{h^2}{h} = \\lim_{h \\to 0} h = 0",
            explanation: "Cancel the constant terms and factor out h.",
            why: "Canceling h resolves the 0/0 indeterminate difference quotient."
          },
          {
            stepNumber: 4,
            title: "Construct Tangent Line Equation",
            mathExpression: "y - (-3) = 0(x - 2) \\implies y = -3",
            explanation: "Substitute point (2, -3) and horizontal slope m = 0 into point-slope form.",
            why: "A derivative of zero produces a horizontal tangent line."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**2 - 4*x + 1",
          expected: "2*x - 4",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Tangent and Normal Lines to Square Root Curve",
        exerciseReference: "Section 3.1, Exercise 2",
        originalTopic: "Normal Lines",
        difficulty: "tier2",
        tags: ["tangent-line", "normal-line", "radical"],
        problemStatement: "Find equations of the tangent and normal lines to y = sqrt(x) at (4, 2).",
        finalAnswer: "\\text{Tangent: } y = \\frac{1}{4}x + 1; \\quad \\text{Normal: } y = -4x + 18",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Derivative at x = 4 via Limit",
            mathExpression: "f'(4) = \\lim_{h \\to 0} \\frac{\\sqrt{4 + h} - 2}{h} = \\lim_{h \\to 0} \\frac{(4 + h) - 4}{h(\\sqrt{4 + h} + 2)} = \\lim_{h \\to 0} \\frac{1}{\\sqrt{4 + h} + 2} = \\frac{1}{4}",
            explanation: "Multiply numerator and denominator by conjugate sqrt(4+h) + 2.",
            why: "Conjugate rationalization eliminates radical difference."
          },
          {
            stepNumber: 2,
            title: "Write Tangent Line Equation",
            mathExpression: "y - 2 = \\frac{1}{4}(x - 4) \\implies y = \\frac{1}{4}x - 1 + 2 = \\frac{1}{4}x + 1",
            explanation: "Apply point-slope formula with slope 1/4 and point (4, 2).",
            why: "Standard tangent equation."
          },
          {
            stepNumber: 3,
            title: "Write Normal Line Equation",
            mathExpression: "m_{\\text{normal}} = -\\frac{1}{1/4} = -4 \\implies y - 2 = -4(x - 4) \\implies y = -4x + 18",
            explanation: "The normal slope is the negative reciprocal -4.",
            why: "Normal line is perpendicular to the tangent line."
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
        filename: "ex-03",
        title: "Derivative of Reciprocal Function at a Point",
        exerciseReference: "Section 3.1, Exercise 3",
        originalTopic: "Reciprocal Derivative",
        difficulty: "tier1",
        tags: ["reciprocal", "derivative", "difference-quotient"],
        problemStatement: "Compute f'(1) for f(x) = 1/(x + 1) using the limit definition.",
        finalAnswer: "f'(1) = -\\frac{1}{4}",
        steps: [
          {
            stepNumber: 1,
            title: "Set up Difference Quotient",
            mathExpression: "\\frac{f(1 + h) - f(1)}{h} = \\frac{\\frac{1}{1 + h + 1} - \\frac{1}{2}}{h} = \\frac{\\frac{1}{2 + h} - \\frac{1}{2}}{h}",
            explanation: "Substitute into the difference quotient definition.",
            why: "Evaluation of reciprocal function at 1+h and 1."
          },
          {
            stepNumber: 2,
            title: "Simplify Common Denominator",
            mathExpression: "\\frac{2 - (2 + h)}{2h(2 + h)} = \\frac{-h}{2h(2 + h)} = \\frac{-1}{2(2 + h)}",
            explanation: "Combine terms in numerator and cancel h.",
            why: "Removing factor h eliminates the 0/0 singularity."
          },
          {
            stepNumber: 3,
            title: "Evaluate Limit",
            mathExpression: "f'(1) = \\lim_{h \\to 0} \\frac{-1}{2(2 + h)} = -\\frac{1}{4}",
            explanation: "Substitute h = 0 into the simplified expression.",
            why: "Direct substitution yields the derivative."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "1/(x + 1)",
          expected: "-1/(x + 1)**2",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Horizontal Tangents of a Cubic Curve",
        exerciseReference: "Section 3.1, Exercise 4",
        originalTopic: "Horizontal Tangents",
        difficulty: "tier2",
        tags: ["horizontal-tangents", "cubic", "critical-points"],
        problemStatement: "Find all points on the curve f(x) = 2x^3 - 3x^2 - 12x + 5 where the tangent line is horizontal.",
        finalAnswer: "(-1, 12) \\quad \\text{and} \\quad (2, -15)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Derivative Function f'(x)",
            mathExpression: "f'(x) = 6x^2 - 6x - 12",
            explanation: "Apply power rule to differentiate each term.",
            why: "Derivative gives the slope of the tangent at any x."
          },
          {
            stepNumber: 2,
            title: "Set Derivative Equal to Zero for Horizontal Tangents",
            mathExpression: "6x^2 - 6x - 12 = 0 \\implies 6(x^2 - x - 2) = 0 \\implies 6(x - 2)(x + 1) = 0",
            explanation: "Horizontal tangent means slope m = 0. Factor the quadratic.",
            why: "Horizontal lines have slope zero."
          },
          {
            stepNumber: 3,
            title: "Solve for x and Find Corresponding y-values",
            mathExpression: "x = 2 \\implies f(2) = 16 - 12 - 24 + 5 = -15; \\quad x = -1 \\implies f(-1) = -2 - 3 + 12 + 5 = 12",
            explanation: "Substitute critical x-values back into original curve f(x).",
            why: "Points on the curve require coordinates (x, f(x))."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "2*x**3 - 3*x**2 - 12*x + 5",
          expected: "6*x**2 - 6*x - 12",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Instantaneous Rate of a Cubic at a Point",
        exerciseReference: "Section 3.1, Exercise 5",
        originalTopic: "Rate of Change",
        difficulty: "tier1",
        tags: ["rate-of-change", "cubic", "derivative"],
        problemStatement: "Find the instantaneous rate of change of f(x) = x^3 at x = -1.",
        finalAnswer: "f'(-1) = 3",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate Difference Quotient at x = -1",
            mathExpression: "\\frac{f(-1 + h) - f(-1)}{h} = \\frac{(-1 + h)^3 - (-1)}{h} = \\frac{(-1 + 3h - 3h^2 + h^3) + 1}{h}",
            explanation: "Expand the binomial cube (-1 + h)^3.",
            why: "Definition of difference quotient for cubic polynomial."
          },
          {
            stepNumber: 2,
            title: "Cancel h and Take Limit",
            mathExpression: "\\lim_{h \\to 0} \\frac{3h - 3h^2 + h^3}{h} = \\lim_{h \\to 0} (3 - 3h + h^2) = 3",
            explanation: "Divide through by h and evaluate at h = 0.",
            why: "Canceling h resolves 0/0."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**3",
          expected: "3*x**2",
          variable: "x"
        }
      }
    ]
  },
  {
    chapter: "ch03",
    chapterDir: "ch03-derivatives",
    section: "3.2",
    sectionDir: "3.2-the-derivative-as-a-function",
    title: "The Derivative as a Function",
    definitions: [
      {
        id: "def-derivative-function",
        title: "The Derivative as a Function",
        category: "definition",
        latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}",
        statement: "The derivative of f with respect to x is the function f' whose value at x is the limit of the difference quotient. The domain of f' is the set of all x for which this limit exists.",
        conditions: ["x is an interior point of domain of f", "Limit exists as a real number"],
        explanation: "Differentiating a function produces a new function that assigns to each input x the instantaneous slope of the original graph at x.",
        keyTakeaway: "Differentiation is an operation that maps a function f to a new function f'."
      },
      {
        id: "theorem-differentiability-implies-continuity",
        title: "Differentiability Implies Continuity",
        category: "theorem",
        latex: "f \\text{ is differentiable at } c \\implies f \\text{ is continuous at } c",
        statement: "If f has a derivative at x = c, then f is continuous at x = c.",
        conditions: ["f'(c) exists"],
        explanation: "Since f(x) - f(c) = [(f(x) - f(c))/(x - c)] * (x - c), taking the limit gives f'(c) * 0 = 0, which proves lim f(x) = f(c). The converse is FALSE: f(x) = |x| is continuous at 0 but not differentiable.",
        keyTakeaway: "Differentiability is a strictly stronger smoothness condition than continuity."
      },
      {
        id: "rule-failure-of-differentiability",
        title: "Modes of Non-Differentiability",
        category: "rule",
        latex: "\\text{Corner } (f'_+ \\neq f'_-), \\quad \\text{Cusp } (f' \\to \\pm \\infty), \\quad \\text{Vertical Tangent } (|f'| \\to \\infty), \\quad \\text{Discontinuity}",
        statement: "A function fails to be differentiable at x = c if: (1) it has a corner (one-sided derivatives exist but differ), (2) a cusp, (3) a vertical tangent, or (4) a discontinuity.",
        conditions: ["c in domain of f or boundary"],
        explanation: "Smoothness requires the graph to have a well-defined non-vertical tangent line with matching left and right slopes.",
        keyTakeaway: "Corners, cusps, vertical tangents, and discontinuities prevent differentiability."
      }
    ],
    summaryMDX: `# Section 3.2: The Derivative as a Function

Rather than calculating the derivative at a single numerical point $x_0$, we treat the independent variable $x$ as arbitrary. This transforms differentiation into an **operator** that inputs a function $f$ and outputs its derivative function $f'$.

---

## 1. Definition and Notation

$$
f'(x) = \\frac{dy}{dx} = \\frac{d}{dx}[f(x)] = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}
$$

Common notations:
- **Lagrange**: $y'$, $f'(x)$
- **Leibniz**: $\\frac{dy}{dx}$, $\\frac{df}{dx}$
- **Euler / Cauchy**: $D_x y$, $Df(x)$

---

## 2. Differentiability vs Continuity

**Theorem**: If $f$ is differentiable at $c$, then $f$ is continuous at $c$.

### Crucial Warning (Converse is FALSE):
Continuity does **NOT** guarantee differentiability:
- $f(x) = |x|$ is continuous at $x = 0$, but has a sharp **corner** where $f'_+(0) = 1$ and $f'_-(0) = -1$. Hence $f'(0)$ does not exist.
- $f(x) = x^{1/3}$ has a **vertical tangent** at $x = 0$ ($f'(x) \\to \\infty$).
- $f(x) = x^{2/3}$ has a **cusp** at $x = 0$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Derivative of a Quadratic from First Principles",
        exerciseReference: "Section 3.2, Exercise 1",
        originalTopic: "First Principles Differentiation",
        difficulty: "tier1",
        tags: ["first-principles", "difference-quotient", "quadratic"],
        problemStatement: "Find the derivative function f'(x) for f(x) = 3x^2 - 5x + 2 directly from the definition.",
        finalAnswer: "f'(x) = 6x - 5",
        steps: [
          {
            stepNumber: 1,
            title: "Set up the General Difference Quotient",
            mathExpression: "f'(x) = \\lim_{h \\to 0} \\frac{[3(x + h)^2 - 5(x + h) + 2] - [3x^2 - 5x + 2]}{h}",
            explanation: "Apply the definition of the derivative function with variable x.",
            why: "Definition of derivative as a function."
          },
          {
            stepNumber: 2,
            title: "Expand and Group Terms",
            mathExpression: "3(x^2 + 2xh + h^2) - 5x - 5h + 2 - 3x^2 + 5x - 2 = 6xh + 3h^2 - 5h",
            explanation: "Expand the squared binomial and cancel opposite terms.",
            why: "Polynomial expansion clears constant and quadratic terms."
          },
          {
            stepNumber: 3,
            title: "Cancel h and Take Limit",
            mathExpression: "\\lim_{h \\to 0} \\frac{h(6x + 3h - 5)}{h} = \\lim_{h \\to 0} (6x + 3h - 5) = 6x - 5",
            explanation: "Factor out h, cancel the denominator, and evaluate at h = 0.",
            why: "Canceling h resolves the indeterminate form."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "3*x**2 - 5*x + 2",
          expected: "6*x - 5",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Derivative of Reciprocal Square Root from First Principles",
        exerciseReference: "Section 3.2, Exercise 2",
        originalTopic: "Radical First Principles",
        difficulty: "tier2",
        tags: ["radicals", "first-principles", "conjugate"],
        problemStatement: "Find f'(x) for f(x) = 1/sqrt(x) for x > 0 using the definition of derivative.",
        finalAnswer: "f'(x) = -\\frac{1}{2x^{3/2}} = -\\frac{1}{2x\\sqrt{x}}",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate the Difference Quotient",
            mathExpression: "\\frac{f(x + h) - f(x)}{h} = \\frac{\\frac{1}{\\sqrt{x + h}} - \\frac{1}{\\sqrt{x}}}{h} = \\frac{\\sqrt{x} - \\sqrt{x + h}}{h\\sqrt{x}\\sqrt{x + h}}",
            explanation: "Combine the fractions in the numerator with common denominator sqrt(x)*sqrt(x+h).",
            why: "Standard algebraic fraction simplification."
          },
          {
            stepNumber: 2,
            title: "Rationalize Using the Conjugate",
            mathExpression: "\\frac{(\\sqrt{x} - \\sqrt{x + h})(\\sqrt{x} + \\sqrt{x + h})}{h\\sqrt{x}\\sqrt{x + h}(\\sqrt{x} + \\sqrt{x + h})} = \\frac{x - (x + h)}{h\\sqrt{x}\\sqrt{x + h}(\\sqrt{x} + \\sqrt{x + h})} = \\frac{-h}{h\\dots} = \\frac{-1}{\\sqrt{x}\\sqrt{x + h}(\\sqrt{x} + \\sqrt{x + h})}",
            explanation: "Multiply numerator and denominator by sqrt(x) + sqrt(x+h) and cancel h.",
            why: "Conjugate multiplication rationalizes the radical numerator."
          },
          {
            stepNumber: 3,
            title: "Evaluate Limit as h -> 0",
            mathExpression: "\\lim_{h \\to 0} \\frac{-1}{\\sqrt{x}\\sqrt{x + 0}(\\sqrt{x} + \\sqrt{x})} = \\frac{-1}{x(2\\sqrt{x})} = -\\frac{1}{2x\\sqrt{x}} = -\\frac{1}{2}x^{-3/2}",
            explanation: "Substitute h = 0 into the continuous simplified expression.",
            why: "Taking the limit produces the power rule derivative for n = -1/2."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "1/sqrt(x)",
          expected: "-1/(2*x**(3/2))",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Non-Differentiability of Absolute Value at a Corner",
        exerciseReference: "Section 3.2, Exercise 3",
        originalTopic: "Corners and One-Sided Derivatives",
        difficulty: "tier1",
        tags: ["absolute-value", "corner", "non-differentiable"],
        problemStatement: "Show that f(x) = |x - 3| is continuous at x = 3, but fails to be differentiable at x = 3.",
        finalAnswer: "f \\text{ is continuous at } x = 3, \\text{ but } f'(3) \\text{ does not exist because } f'_+(3) = 1 \\neq -1 = f'_-(3)",
        steps: [
          {
            stepNumber: 1,
            title: "Verify Continuity at x = 3",
            mathExpression: "\\lim_{x \\to 3} |x - 3| = |3 - 3| = 0 = f(3)",
            explanation: "Direct substitution demonstrates that the limit equals the function value.",
            why: "Proves continuity at x = 3."
          },
          {
            stepNumber: 2,
            title: "Compute Right-Hand Derivative at x = 3",
            mathExpression: "f'_+(3) = \\lim_{h \\to 0^+} \\frac{|(3 + h) - 3| - 0}{h} = \\lim_{h \\to 0^+} \\frac{|h|}{h} = \\lim_{h \\to 0^+} \\frac{h}{h} = 1",
            explanation: "For h > 0, |h| = h.",
            why: "Definition of right-hand derivative."
          },
          {
            stepNumber: 3,
            title: "Compute Left-Hand Derivative at x = 3",
            mathExpression: "f'_-(3) = \\lim_{h \\to 0^-} \\frac{|(3 + h) - 3| - 0}{h} = \\lim_{h \\to 0^-} \\frac{|h|}{h} = \\lim_{h \\to 0^-} \\frac{-h}{h} = -1",
            explanation: "For h < 0, |h| = -h.",
            why: "Definition of left-hand derivative."
          },
          {
            stepNumber: 4,
            title: "Conclude Failure of Differentiability",
            mathExpression: "f'_+(3) = 1 \\neq -1 = f'_-(3) \\implies f'(3) \\text{ DNE}",
            explanation: "The two one-sided derivatives disagree, creating a sharp corner.",
            why: "A derivative exists if and only if both one-sided derivatives agree."
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
        filename: "ex-04",
        title: "Derivative and Domain of a Rational Function",
        exerciseReference: "Section 3.2, Exercise 4",
        originalTopic: "Rational Derivative from Definition",
        difficulty: "tier2",
        tags: ["rational-function", "domain", "quotient"],
        problemStatement: "Find f'(x) for f(x) = x/(x + 2) from first principles and state its domain.",
        finalAnswer: "f'(x) = \\frac{2}{(x + 2)^2}; \\quad \\text{Domain of } f' = \\mathbb{R} \\setminus \\{-2\\}",
        steps: [
          {
            stepNumber: 1,
            title: "Set up Difference Quotient",
            mathExpression: "\\frac{\\frac{x + h}{x + h + 2} - \\frac{x}{x + 2}}{h} = \\frac{(x + h)(x + 2) - x(x + h + 2)}{h(x + h + 2)(x + 2)}",
            explanation: "Put numerator over common denominator (x + h + 2)(x + 2).",
            why: "Rational function arithmetic."
          },
          {
            stepNumber: 2,
            title: "Expand Numerator and Cancel Terms",
            mathExpression: "(x^2 + 2x + hx + 2h) - (x^2 + hx + 2x) = 2h",
            explanation: "Expand and cancel identical terms.",
            why: "All terms not containing h drop out."
          },
          {
            stepNumber: 3,
            title: "Evaluate Limit",
            mathExpression: "f'(x) = \\lim_{h \\to 0} \\frac{2h}{h(x + h + 2)(x + 2)} = \\lim_{h \\to 0} \\frac{2}{(x + h + 2)(x + 2)} = \\frac{2}{(x + 2)^2}",
            explanation: "Cancel h and evaluate at h = 0.",
            why: "Canceling h produces the continuous quotient."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x/(x + 2)",
          expected: "2/(x + 2)**2",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "One-Sided Differentiability of Piecewise Join",
        exerciseReference: "Section 3.2, Exercise 5",
        originalTopic: "Piecewise Differentiability",
        difficulty: "tier2",
        tags: ["piecewise", "differentiability", "smoothness"],
        problemStatement: "Determine whether f(x) = x^2 for x <= 0 and f(x) = x for x > 0 is differentiable at x = 0.",
        finalAnswer: "f \\text{ is continuous at } x = 0, \\text{ but not differentiable because } f'_-(0) = 0 \\neq 1 = f'_+(0)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Left-Hand Derivative at 0",
            mathExpression: "f'_-(0) = \\lim_{h \\to 0^-} \\frac{f(h) - f(0)}{h} = \\lim_{h \\to 0^-} \\frac{h^2 - 0}{h} = \\lim_{h \\to 0^-} h = 0",
            explanation: "Use the left parabola branch x^2 for h < 0.",
            why: "Left-hand derivative uses values strictly less than 0."
          },
          {
            stepNumber: 2,
            title: "Compute Right-Hand Derivative at 0",
            mathExpression: "f'_+(0) = \\lim_{h \\to 0^+} \\frac{f(h) - f(0)}{h} = \\lim_{h \\to 0^+} \\frac{h - 0}{h} = \\lim_{h \\to 0^+} (1) = 1",
            explanation: "Use the right linear branch x for h > 0.",
            why: "Right-hand derivative uses values strictly greater than 0."
          },
          {
            stepNumber: 3,
            title: "Conclude",
            mathExpression: "f'_-(0) = 0 \\neq 1 = f'_+(0) \\implies f'(0) \\text{ does not exist}",
            explanation: "The tangent slope jumps abruptly from 0 to 1 at x = 0.",
            why: "Differentiability requires left and right derivatives to match."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "1 - 0",
          expected: "1"
        }
      }
    ]
  }
];
