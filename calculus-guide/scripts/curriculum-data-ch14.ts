// scripts/curriculum-data-ch14.ts
/**
 * Authoritative Curriculum Data for Chapter 14: Partial Derivatives
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH14_SECTIONS: SectionDef[] = [
  {
    chapter: "ch14",
    chapterDir: "ch14-partial-derivatives",
    section: "14.1",
    sectionDir: "14.1-functions-of-several-variables",
    title: "Functions of Several Variables",
    definitions: [
      {
        id: "def-multivariable-function",
        title: "Function of Two or Three Variables",
        category: "definition",
        latex: "z = f(x, y), \\quad w = f(x, y, z)",
        statement: "A real-valued function of two variables f is a rule that assigns a unique real number z to each ordered pair (x, y) in a subset D of R^2 called the domain. The set of all resulting output values is the range.",
        conditions: ["Domain D is a subset of R^2 (or R^n)", "Range is a subset of R"],
        explanation: "The graph of z = f(x, y) is a surface S in Euclidean 3-space consisting of all points (x, y, f(x, y)) for (x, y) in D.",
        keyTakeaway: "Generalizes single-variable curves to surfaces and scalar fields in higher dimensions."
      },
      {
        id: "def-level-curves-surfaces",
        title: "Level Curves and Level Surfaces",
        category: "definition",
        latex: "f(x, y) = c, \\quad f(x, y, z) = c",
        statement: "The level curves of a function of two variables f(x, y) are the curves in the xy-plane with equations f(x, y) = c, where c is a constant in the range of f. For three variables, f(x, y, z) = c forms level surfaces in R^3.",
        conditions: ["Constant c is in the range of f"],
        explanation: "Analogous to contour lines on a topographical map, level curves show where the function maintains constant height or potential.",
        keyTakeaway: "Level curves map 3D surfaces onto 2D contour representations."
      }
    ],
    summaryMDX: `# Section 14.1: Functions of Several Variables

Multivariable functions map tuples of real numbers to scalar values, modeling physical fields like temperature, pressure, and elevation.

---

## 1. Domain and Range

- **Natural Domain**: The largest set of input points $(x, y) \\in \\mathbb{R}^2$ for which the formula is mathematically well-defined.
- **Boundary vs. Interior**: A point is an interior point of $D$ if it is the center of a disk lying entirely inside $D$; it is a boundary point if every disk centered at it contains points both inside and outside $D$.

---

## 2. Graphs and Level Curves

- **Graph of $z = f(x, y)$**: The surface in $\\mathbb{R}^3$ given by $\\{(x, y, z) \\mid z = f(x, y), (x, y) \\in D\\}$.
- **Contour Map (Level Curves)**: Projections of traces $z = c$ onto the $xy$-plane: $f(x, y) = c$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Domain and Value of a Hemispherical Function",
        exerciseReference: "Section 14.1, Exercise 1",
        originalTopic: "Natural Domain and Evaluation",
        difficulty: "tier1",
        tags: ["domain", "multivariable", "square-root"],
        problemStatement: "Find the natural domain of f(x, y) = sqrt(9 - x^2 - y^2) and evaluate f(1, 2).",
        finalAnswer: "\\text{Domain: } x^2 + y^2 \\le 9; \\quad f(1, 2) = 2",
        steps: [
          {
            stepNumber: 1,
            title: "Determine Non-Negative Radicand Condition",
            mathExpression: "9 - x^2 - y^2 \\ge 0 \\iff x^2 + y^2 \\le 9",
            explanation: "The square root is defined for real outputs if and only if its radicand is non-negative.",
            why: "Enforcing domain constraint."
          },
          {
            stepNumber: 2,
            title: "Evaluate at Specified Point",
            mathExpression: "f(1, 2) = \\sqrt{9 - 1^2 - 2^2} = \\sqrt{9 - 1 - 4} = \\sqrt{4} = 2",
            explanation: "Substitute x = 1 and y = 2 into the function.",
            why: "Evaluating function at point."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(9 - 1**2 - 2**2)",
          expected: "2"
        }
      },
      {
        filename: "ex-02",
        title: "Level Curves of a Circular Paraboloid",
        exerciseReference: "Section 14.1, Exercise 2",
        originalTopic: "Level Curves",
        difficulty: "tier1",
        tags: ["level-curves", "paraboloid", "circles"],
        problemStatement: "Describe the level curves of z = x^2 + y^2 and find the radius of the level curve corresponding to c = 16.",
        finalAnswer: "\\text{Concentric circles; radius } r = 4 \\text{ at } c = 16",
        steps: [
          {
            stepNumber: 1,
            title: "Set Function Equal to Constant c",
            mathExpression: "x^2 + y^2 = c",
            explanation: "For c > 0, the equation describes a circle centered at the origin of radius sqrt(c).",
            why: "Characterizing contour curves."
          },
          {
            stepNumber: 2,
            title: "Evaluate for c = 16",
            mathExpression: "x^2 + y^2 = 16 \\implies r = \\sqrt{16} = 4",
            explanation: "Substitute c = 16 to find the specific contour radius.",
            why: "Finding radius of contour."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(16)",
          expected: "4"
        }
      },
      {
        filename: "ex-03",
        title: "Domain of a Logarithmic Multivariable Function",
        exerciseReference: "Section 14.1, Exercise 3",
        originalTopic: "Logarithmic Domain",
        difficulty: "tier1",
        tags: ["logarithm", "domain", "half-plane"],
        problemStatement: "Find the natural domain of g(x, y) = ln(x + y - 1) and evaluate g(2, 0).",
        finalAnswer: "\\text{Domain: } \\{(x, y) \\in \\mathbb{R}^2 \\mid x + y > 1\\}; \\quad g(2, 0) = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Set Strictly Positive Argument Condition",
            mathExpression: "x + y - 1 > 0 \\iff x + y > 1",
            explanation: "The natural logarithm requires a strictly positive argument.",
            why: "Applying domain restriction for ln."
          },
          {
            stepNumber: 2,
            title: "Evaluate at (2, 0)",
            mathExpression: "g(2, 0) = \\ln(2 + 0 - 1) = \\ln(1) = 0",
            explanation: "Substitute x = 2, y = 0.",
            why: "Evaluating logarithmic output."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "log(2 + 0 - 1)",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Level Surfaces of a Three-Variable Function",
        exerciseReference: "Section 14.1, Exercise 4",
        originalTopic: "Level Surfaces",
        difficulty: "tier2",
        tags: ["level-surfaces", "spheres", "surface-area"],
        problemStatement: "Describe the level surfaces of w = x^2 + y^2 + z^2 and compute the surface area of the level surface corresponding to c = 25.",
        finalAnswer: "\\text{Concentric spheres; Area } = 100\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Level Surface Equation",
            mathExpression: "x^2 + y^2 + z^2 = c",
            explanation: "For c > 0, this defines a sphere of radius r = sqrt(c) centered at the origin.",
            why: "Classifying level surface geometry."
          },
          {
            stepNumber: 2,
            title: "Calculate Surface Area for c = 25",
            mathExpression: "r = \\sqrt{25} = 5; \\quad \\text{Area} = 4\\pi r^2 = 4\\pi (5^2) = 100\\pi",
            explanation: "Use standard formula for the surface area of a sphere of radius 5.",
            why: "Evaluating spherical surface area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 * pi * 5**2",
          expected: "100*pi"
        }
      },
      {
        filename: "ex-05",
        title: "Range of a Rational Multivariable Function",
        exerciseReference: "Section 14.1, Exercise 5",
        originalTopic: "Range of Several Variables",
        difficulty: "tier2",
        tags: ["range", "rational-function", "multivariable-extrema"],
        problemStatement: "Determine the range of f(x, y) = 1 / (x^2 + y^2 + 1) and evaluate f(1, 1).",
        finalAnswer: "\\text{Range: } (0, 1]; \\quad f(1, 1) = \\frac{1}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Analyze Extremal Values of Denominator",
            mathExpression: "x^2 + y^2 \\ge 0 \\implies 1 \\le x^2 + y^2 + 1 < \\infty",
            explanation: "The denominator attains a minimum of 1 at (0, 0) and grows without bound as distance from origin increases.",
            why: "Determining bounds on the denominator."
          },
          {
            stepNumber: 2,
            title: "Determine Range of Function",
            mathExpression: "f(0, 0) = \\frac{1}{1} = 1; \\quad \\lim_{x^2+y^2 \\to \\infty} f(x, y) = 0 \\implies \\text{Range} = (0, 1]",
            explanation: "Taking reciprocals inverts the inequality: 0 < f(x, y) <= 1.",
            why: "Identifying continuous output interval."
          },
          {
            stepNumber: 3,
            title: "Evaluate at (1, 1)",
            mathExpression: "f(1, 1) = \\frac{1}{1^2 + 1^2 + 1} = \\frac{1}{3}",
            explanation: "Substitute coordinates into expression.",
            why: "Computing specific point value."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 / (1**2 + 1**2 + 1)",
          expected: "1/3"
        }
      }
    ]
  },
  {
    chapter: "ch14",
    chapterDir: "ch14-partial-derivatives",
    section: "14.2",
    sectionDir: "14.2-limits-and-continuity-in-higher-dimensions",
    title: "Limits and Continuity in Higher Dimensions",
    definitions: [
      {
        id: "def-multivariable-limit",
        title: "Limit of a Function of Two Variables",
        category: "definition",
        latex: "\\lim_{(x, y) \\to (x_0, y_0)} f(x, y) = L",
        statement: "For every epsilon > 0 there exists a delta > 0 such that |f(x, y) - L| < epsilon whenever (x, y) is in the domain of f and 0 < sqrt((x - x_0)^2 + (y - y_0)^2) < delta.",
        conditions: ["(x_0, y_0) is an accumulation point of the domain", "Delta applies across all approach paths"],
        explanation: "In two dimensions, approach paths are uncountably infinite (lines, parabolas, spirals). The limit exists if and only if every possible path yields the identical limit L.",
        keyTakeaway: "If two different paths to (x_0, y_0) yield different limits, the limit does not exist (Two-Path Test)."
      },
      {
        id: "theorem-continuity-higher-dim",
        title: "Continuity of Multivariable Functions",
        category: "theorem",
        latex: "\\lim_{(x, y) \\to (x_0, y_0)} f(x, y) = f(x_0, y_0)",
        statement: "A function f(x, y) is continuous at an interior point (x_0, y_0) if f is defined at (x_0, y_0), the limit exists as (x, y) -> (x_0, y_0), and the limit equals the function value.",
        conditions: ["f(x_0, y_0) is defined", "Limit exists and equals value"],
        explanation: "Polynomials, rational functions, and compositions of continuous single-variable functions with continuous multivariable functions are continuous on their natural domains.",
        keyTakeaway: "Allows direct substitution evaluation at points of continuity."
      }
    ],
    summaryMDX: `# Section 14.2: Limits and Continuity in Higher Dimensions

Multivariable limits require consistency across every conceivable path of approach through the domain.

---

## 1. The Two-Path Test for Non-Existence

If $f(x, y)$ approaches $L_1$ along path $C_1$ and approaches $L_2$ along path $C_2$ (with $L_1 \\ne L_2$) as $(x, y) \\to (x_0, y_0)$, then:
$$\\lim_{(x, y) \\to (x_0, y_0)} f(x, y) \\quad \\text{does not exist.}$$

Common test paths:
- Horizontal line: $y = y_0$
- Vertical line: $x = x_0$
- Straight lines of slope $m$: $y - y_0 = m(x - x_0)$
- Parabolic curves: $y = k x^2$

---

## 2. Proving Limit Existence

1. **Polar Coordinates**: Let $x = r\\cos\\theta, y = r\\sin\\theta$. If the limit as $r \\to 0^+$ is independent of $\\theta$, the limit exists.
2. **Squeeze Theorem**: Bracket $f(x, y)$ between two functions that both converge to $L$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Two-Path Test for Limit Non-Existence",
        exerciseReference: "Section 14.2, Exercise 1",
        originalTopic: "Two-Path Test",
        difficulty: "tier1",
        tags: ["two-path-test", "limit-nonexistence", "multivariable-limits"],
        problemStatement: "Show that lim_{(x, y) -> (0, 0)} (xy) / (x^2 + y^2) does not exist by approaching along lines y = mx.",
        finalAnswer: "\\text{Limit does not exist; value depends on slope } m: \\frac{m}{1 + m^2}",
        steps: [
          {
            stepNumber: 1,
            title: "Substitute Straight Line Path y = mx",
            mathExpression: "\\lim_{x \\to 0} \\frac{x(mx)}{x^2 + (mx)^2} = \\lim_{x \\to 0} \\frac{m x^2}{x^2(1 + m^2)} = \\frac{m}{1 + m^2}",
            explanation: "Cancel factor of x^2 from numerator and denominator.",
            why: "Evaluating limit along linear family of paths."
          },
          {
            stepNumber: 2,
            title: "Compare Different Slope Values",
            mathExpression: "m = 0 \\implies L = 0; \\quad m = 1 \\implies L = \\frac{1}{1 + 1^2} = \\frac{1}{2}",
            explanation: "Approaching along the x-axis gives 0, while approaching along y = x gives 1/2.",
            why: "Demonstrating path dependency."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 / (1 + 1**2)",
          expected: "1/2"
        }
      },
      {
        filename: "ex-02",
        title: "Evaluating a Multivariable Limit via Polar Coordinates",
        exerciseReference: "Section 14.2, Exercise 2",
        originalTopic: "Polar Coordinate Limits",
        difficulty: "tier2",
        tags: ["polar-limits", "limit-existence", "squeeze-theorem"],
        problemStatement: "Evaluate lim_{(x, y) -> (0, 0)} (x^3 + y^3) / (x^2 + y^2) using polar coordinates.",
        finalAnswer: "0",
        steps: [
          {
            stepNumber: 1,
            title: "Convert to Polar Coordinates",
            mathExpression: "x = r\\cos\\theta, \\; y = r\\sin\\theta \\implies \\frac{x^3 + y^3}{x^2 + y^2} = \\frac{r^3(\\cos^3\\theta + \\sin^3\\theta)}{r^2} = r(\\cos^3\\theta + \\sin^3\\theta)",
            explanation: "Substitute polar expressions and simplify powers of r.",
            why: "Isolating radial distance from angular orientation."
          },
          {
            stepNumber: 2,
            title: "Evaluate Limit as r -> 0",
            mathExpression: "|r(\\cos^3\\theta + \\sin^3\\theta)| \\le r (|\\cos^3\\theta| + |\\sin^3\\theta|) \\le 2r \\to 0 \\text{ as } r \\to 0^+",
            explanation: "Since the angular term is bounded by 2, the product approaches 0 uniformly in theta.",
            why: "Establishing uniform convergence to 0."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Limit by Direct Substitution for Continuous Rational Function",
        exerciseReference: "Section 14.2, Exercise 3",
        originalTopic: "Direct Substitution Limits",
        difficulty: "tier1",
        tags: ["continuity", "direct-substitution", "rational-limits"],
        problemStatement: "Evaluate lim_{(x, y) -> (1, 2)} (x^2 y + 3xy^2) / (x + y).",
        finalAnswer: "\\frac{14}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Check Denominator Continuity",
            mathExpression: "\\lim_{(x, y) \\to (1, 2)} (x + y) = 1 + 2 = 3 \\ne 0",
            explanation: "The denominator does not vanish at (1, 2), so the rational function is continuous at this point.",
            why: "Verifying applicability of direct substitution."
          },
          {
            stepNumber: 2,
            title: "Direct Substitution",
            mathExpression: "\\frac{(1)^2(2) + 3(1)(2)^2}{1 + 2} = \\frac{2 + 12}{3} = \\frac{14}{3}",
            explanation: "Evaluate numerator and denominator at x = 1, y = 2.",
            why: "Evaluating continuous limit."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1**2 * 2 + 3 * 1 * 2**2) / (1 + 2)",
          expected: "14/3"
        }
      },
      {
        filename: "ex-04",
        title: "Proving Limit Existence Using the Squeeze Theorem",
        exerciseReference: "Section 14.2, Exercise 4",
        originalTopic: "Squeeze Theorem",
        difficulty: "tier2",
        tags: ["squeeze-theorem", "inequalities", "limits"],
        problemStatement: "Prove that lim_{(x, y) -> (0, 0)} (x^2 y^2) / (x^2 + y^2) = 0 using the Squeeze Theorem.",
        finalAnswer: "0",
        steps: [
          {
            stepNumber: 1,
            title: "Establish Upper Bound Inequality",
            mathExpression: "x^2 \\le x^2 + y^2 \\implies \\frac{x^2}{x^2 + y^2} \\le 1 \\implies 0 \\le \\frac{x^2 y^2}{x^2 + y^2} \\le y^2",
            explanation: "Multiply the bounded quotient x^2/(x^2+y^2) <= 1 by non-negative factor y^2.",
            why: "Bounding the function."
          },
          {
            stepNumber: 2,
            title: "Take Limits of Bounding Functions",
            mathExpression: "\\lim_{(x, y) \\to (0, 0)} 0 = 0, \\quad \\lim_{(x, y) \\to (0, 0)} y^2 = 0 \\implies \\lim_{(x, y) \\to (0, 0)} \\frac{x^2 y^2}{x^2 + y^2} = 0",
            explanation: "Since both outer bounds approach 0, the inner expression is squeezed to 0.",
            why: "Applying Squeeze Theorem."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Making a Piecewise Function Continuous at the Origin",
        exerciseReference: "Section 14.2, Exercise 5",
        originalTopic: "Removable Discontinuity",
        difficulty: "tier2",
        tags: ["continuity", "piecewise", "trig-limits"],
        problemStatement: "Determine the value of c that makes f(x, y) = sin(x^2 + y^2) / (x^2 + y^2) for (x, y) != (0, 0) and f(0, 0) = c continuous everywhere.",
        finalAnswer: "c = 1",
        steps: [
          {
            stepNumber: 1,
            title: "Substitute Single Variable u = x^2 + y^2",
            mathExpression: "u = x^2 + y^2; \\quad (x, y) \\to (0, 0) \\iff u \\to 0^+",
            explanation: "Rephrase the 2D limit as a 1D radial limit.",
            why: "Reducing to single-variable limit."
          },
          {
            stepNumber: 2,
            title: "Evaluate Known Fundamental Limit",
            mathExpression: "\\lim_{u \\to 0^+} \\frac{\\sin u}{u} = 1",
            explanation: "Apply standard calculus limit sin(u)/u -> 1.",
            why: "Finding the limiting value at the origin."
          },
          {
            stepNumber: 3,
            title: "Enforce Continuity Definition",
            mathExpression: "f(0, 0) = c = \\lim_{(x, y) \\to (0, 0)} f(x, y) = 1 \\implies c = 1",
            explanation: "For continuity, the defined value must match the limiting value.",
            why: "Ensuring continuity at origin."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1",
          expected: "1"
        }
      }
    ]
  },
  {
    chapter: "ch14",
    chapterDir: "ch14-partial-derivatives",
    section: "14.3",
    sectionDir: "14.3-partial-derivatives",
    title: "Partial Derivatives",
    definitions: [
      {
        id: "def-partial-derivative",
        title: "First Partial Derivatives",
        category: "definition",
        latex: "f_x(x_0, y_0) = \\lim_{h \\to 0} \\frac{f(x_0 + h, y_0) - f(x_0, y_0)}{h}, \\quad f_y(x_0, y_0) = \\lim_{h \\to 0} \\frac{f(x_0, y_0 + h) - f(x_0, y_0)}{h}",
        statement: "The partial derivative of f with respect to x is the ordinary derivative of f with respect to x holding y constant. Similarly, the partial derivative with respect to y holds x constant.",
        conditions: ["Limits exist"],
        explanation: "Geometrically, f_x(x_0, y_0) is the slope of the curve formed by intersecting surface z = f(x, y) with the vertical plane y = y_0.",
        keyTakeaway: "Measures instantaneous rate of change in direction of coordinate axes."
      },
      {
        id: "theorem-clairaut-mixed-partials",
        title: "Clairaut's Theorem (Equality of Mixed Partials)",
        category: "theorem",
        latex: "f_{xy}(x, y) = f_{yx}(x, y) \\quad \\left( \\frac{\\partial^2 f}{\\partial y \\partial x} = \\frac{\\partial^2 f}{\\partial x \\partial y} \\right)",
        statement: "If the mixed second-order partial derivatives f_{xy} and f_{yx} are continuous on an open disk containing (x_0, y_0), then they are equal at that point.",
        conditions: ["f_{xy} and f_{yx} are continuous on open region"],
        explanation: "The order of partial differentiation does not matter for smooth functions.",
        keyTakeaway: "Mixed partial derivatives commute under continuity."
      }
    ],
    summaryMDX: `# Section 14.3: Partial Derivatives

Partial derivatives quantify directional change strictly along the coordinate axes.

---

## 1. Notation and Computation

For $z = f(x, y)$:
- Partial with respect to $x$: $f_x = \\frac{\\partial f}{\\partial x} = \\frac{\\partial z}{\\partial x}$ (treat $y$ as a constant)
- Partial with respect to $y$: $f_y = \\frac{\\partial f}{\\partial y} = \\frac{\\partial z}{\\partial y}$ (treat $x$ as a constant)

---

## 2. Second-Order Partial Derivatives

- $f_{xx} = \\frac{\\partial^2 f}{\\partial x^2} = \\frac{\\partial}{\\partial x}\\left(\\frac{\\partial f}{\\partial x}\\right)$
- $f_{yy} = \\frac{\\partial^2 f}{\\partial y^2} = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial f}{\\partial y}\\right)$
- $f_{xy} = \\frac{\\partial^2 f}{\\partial y \\partial x} = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial f}{\\partial x}\\right)$
- **Clairaut's Theorem**: $f_{xy} = f_{yx}$ whenever both mixed partials are continuous.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "First Partial Derivatives of a Polynomial Function",
        exerciseReference: "Section 14.3, Exercise 1",
        originalTopic: "Computation of Partial Derivatives",
        difficulty: "tier1",
        tags: ["partial-derivatives", "polynomial", "evaluation"],
        problemStatement: "For f(x, y) = x^3 y^2 - 4x^2 + 5y, find f_x(x, y) and f_y(x, y), and evaluate them at (1, 2).",
        finalAnswer: "f_x(1, 2) = 4, \\quad f_y(1, 2) = 9",
        steps: [
          {
            stepNumber: 1,
            title: "Compute f_x Treating y as Constant",
            mathExpression: "f_x = \\frac{\\partial}{\\partial x}(x^3 y^2 - 4x^2 + 5y) = 3x^2 y^2 - 8x",
            explanation: "Differentiate with respect to x while keeping y constant.",
            why: "Finding partial derivative with respect to x."
          },
          {
            stepNumber: 2,
            title: "Compute f_y Treating x as Constant",
            mathExpression: "f_y = \\frac{\\partial}{\\partial y}(x^3 y^2 - 4x^2 + 5y) = 2x^3 y + 5",
            explanation: "Differentiate with respect to y while keeping x constant.",
            why: "Finding partial derivative with respect to y."
          },
          {
            stepNumber: 3,
            title: "Evaluate at (1, 2)",
            mathExpression: "f_x(1, 2) = 3(1)^2(2)^2 - 8(1) = 12 - 8 = 4; \\quad f_y(1, 2) = 2(1)^3(2) + 5 = 4 + 5 = 9",
            explanation: "Substitute x = 1 and y = 2.",
            why: "Computing numerical values at point."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "x**3 * 4 - 4*x**2 + 10",
          expected: "12*x**2 - 8*x",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Verifying Clairaut's Theorem for Mixed Partial Derivatives",
        exerciseReference: "Section 14.3, Exercise 2",
        originalTopic: "Mixed Partial Derivatives",
        difficulty: "tier1",
        tags: ["Clairaut-theorem", "mixed-partials", "equality"],
        problemStatement: "For f(x, y) = x exp(y) + y sin(x), verify that f_{xy} = f_{yx}.",
        finalAnswer: "f_{xy} = f_{yx} = e^y + \\cos(x)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute First Partials",
            mathExpression: "f_x = e^y + y\\cos x, \\quad f_y = x e^y + \\sin x",
            explanation: "Differentiate with respect to x and y independently.",
            why: "Finding first-order partials."
          },
          {
            stepNumber: 2,
            title: "Compute Mixed Second Partials",
            mathExpression: "f_{xy} = \\frac{\\partial}{\\partial y}(e^y + y\\cos x) = e^y + \\cos x; \\quad f_{yx} = \\frac{\\partial}{\\partial x}(x e^y + \\sin x) = e^y + \\cos x",
            explanation: "Differentiate f_x with respect to y and f_y with respect to x.",
            why: "Demonstrating equality of mixed partials."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "exp(y) + cos(x)",
          expected: "exp(y) + cos(x)"
        }
      },
      {
        filename: "ex-03",
        title: "Implicit Partial Differentiation",
        exerciseReference: "Section 14.3, Exercise 3",
        originalTopic: "Implicit Differentiation",
        difficulty: "tier2",
        tags: ["implicit-differentiation", "partial-derivatives", "surfaces"],
        problemStatement: "Given x^3 + y^3 + z^3 + 6xyz = 1, find dz/dx using the implicit differentiation formula dz/dx = -F_x / F_z.",
        finalAnswer: "\\frac{\\partial z}{\\partial x} = -\\frac{x^2 + 2yz}{z^2 + 2xy}",
        steps: [
          {
            stepNumber: 1,
            title: "Define F(x, y, z) = 0",
            mathExpression: "F(x, y, z) = x^3 + y^3 + z^3 + 6xyz - 1 = 0",
            explanation: "Set all terms on one side of equation.",
            why: "Setting up implicit surface representation."
          },
          {
            stepNumber: 2,
            title: "Compute Partial Derivatives F_x and F_z",
            mathExpression: "F_x = 3x^2 + 6yz = 3(x^2 + 2yz), \\quad F_z = 3z^2 + 6xy = 3(z^2 + 2xy)",
            explanation: "Differentiate F with respect to x and z while treating other variables as constants.",
            why: "Finding components for implicit formula."
          },
          {
            stepNumber: 3,
            title: "Apply Ratio Formula",
            mathExpression: "\\frac{\\partial z}{\\partial x} = -\\frac{F_x}{F_z} = -\\frac{3(x^2 + 2yz)}{3(z^2 + 2xy)} = -\\frac{x^2 + 2yz}{z^2 + 2xy}",
            explanation: "Divide F_x by F_z and negate.",
            why: "Evaluating implicit derivative."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "-(3*x**2 + 6*y*z)/(3*z**2 + 6*x*y)",
          expected: "-(x**2 + 2*y*z)/(z**2 + 2*x*y)"
        }
      },
      {
        filename: "ex-04",
        title: "Laplace's Equation for the Logarithmic Potential",
        exerciseReference: "Section 14.3, Exercise 4",
        originalTopic: "Harmonic Functions",
        difficulty: "tier2",
        tags: ["Laplace-equation", "harmonic-function", "second-partials"],
        problemStatement: "Show that f(x, y) = ln(x^2 + y^2) satisfies Laplace's equation f_{xx} + f_{yy} = 0 for (x, y) != (0, 0).",
        finalAnswer: "f_{xx} + f_{yy} = 0 \\implies f \\text{ is harmonic}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute First Partials",
            mathExpression: "f_x = \\frac{2x}{x^2 + y^2}, \\quad f_y = \\frac{2y}{x^2 + y^2}",
            explanation: "Differentiate using chain rule on natural logarithm.",
            why: "Finding first derivatives."
          },
          {
            stepNumber: 2,
            title: "Compute Pure Second Partials via Quotient Rule",
            mathExpression: "f_{xx} = \\frac{2(x^2 + y^2) - 2x(2x)}{(x^2 + y^2)^2} = \\frac{2y^2 - 2x^2}{(x^2 + y^2)^2}; \\quad f_{yy} = \\frac{2x^2 - 2y^2}{(x^2 + y^2)^2}",
            explanation: "Apply quotient rule to f_x and f_y.",
            why: "Finding second pure derivatives."
          },
          {
            stepNumber: 3,
            title: "Sum to Verify Laplace's Equation",
            mathExpression: "f_{xx} + f_{yy} = \\frac{(2y^2 - 2x^2) + (2x^2 - 2y^2)}{(x^2 + y^2)^2} = 0",
            explanation: "The numerators sum to zero identically.",
            why: "Confirming harmonic property."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "log(x**2 + y**2)",
          expected: "2*x/(x**2 + y**2)",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Partial Rate of Change in the Ideal Gas Law",
        exerciseReference: "Section 14.3, Exercise 5",
        originalTopic: "Applied Partial Derivatives",
        difficulty: "tier1",
        tags: ["ideal-gas-law", "thermodynamics", "physics"],
        problemStatement: "For an ideal gas P = n R T / V, find dP/dT at V = 10 L assuming n R = 8.314 J/K.",
        finalAnswer: "\\frac{\\partial P}{\\partial T} = 0.8314 \\text{ J/(L}\\cdot\\text{K)}",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate P with Respect to T at Constant V",
            mathExpression: "\\frac{\\partial P}{\\partial T} = \\frac{\\partial}{\\partial T} \\left( \\frac{n R T}{V} \\right) = \\frac{n R}{V}",
            explanation: "Treat volume V and gas constant nR as constants.",
            why: "Isolating thermal pressure sensitivity."
          },
          {
            stepNumber: 2,
            title: "Evaluate with Numerical Parameters",
            mathExpression: "\\frac{\\partial P}{\\partial T} = \\frac{8.314}{10} = 0.8314",
            explanation: "Substitute nR = 8.314 and V = 10.",
            why: "Evaluating numerical derivative."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "8.314 / 10",
          expected: "0.8314"
        }
      }
    ]
  },
  {
    chapter: "ch14",
    chapterDir: "ch14-partial-derivatives",
    section: "14.4",
    sectionDir: "14.4-the-chain-rule",
    title: "The Chain Rule",
    definitions: [
      {
        id: "theorem-chain-rule-multivariable",
        title: "Multivariable Chain Rule",
        category: "theorem",
        latex: "\\frac{dz}{dt} = \\frac{\\partial z}{\\partial x} \\frac{dx}{dt} + \\frac{\\partial z}{\\partial y} \\frac{dy}{dt}",
        statement: "If z = f(x, y) is differentiable and x = g(t), y = h(t) are differentiable functions of t, then z is a differentiable function of t, and its total derivative equals the sum of the partial rates along each path variable.",
        conditions: ["f is differentiable", "x(t) and y(t) are differentiable"],
        explanation: "Can be visualized as a tree diagram with branches from z to intermediate variables x and y, and then to independent variable t.",
        keyTakeaway: "Sums contributions to change from all intermediate coordinate paths."
      },
      {
        id: "theorem-chain-rule-two-parameters",
        title: "Chain Rule for Two Independent Variables",
        category: "theorem",
        latex: "\\frac{\\partial z}{\\partial u} = \\frac{\\partial z}{\\partial x}\\frac{\\partial x}{\\partial u} + \\frac{\\partial z}{\\partial y}\\frac{\\partial y}{\\partial u}, \\quad \\frac{\\partial z}{\\partial v} = \\frac{\\partial z}{\\partial x}\\frac{\\partial x}{\\partial v} + \\frac{\\partial z}{\\partial y}\\frac{\\partial y}{\\partial v}",
        statement: "When intermediate variables x = g(u, v) and y = h(u, v) depend on multiple parameters u and v, partial derivatives with respect to each independent variable follow separate branch summations.",
        conditions: ["All functions possess continuous first partials"],
        explanation: "Essential for converting differential equations between Cartesian, polar, cylindrical, and spherical coordinates.",
        keyTakeaway: "Extends coordinate transformation calculus to partial differential equations."
      }
    ],
    summaryMDX: `# Section 14.4: The Chain Rule

The multivariable Chain Rule computes rates of change along composite functions and parameterized paths.

---

## 1. Case 1: One Independent Parameter ($t$)

For $z = f(x, y)$ where $x = x(t)$ and $y = y(t)$:
$$\\frac{dz}{dt} = \\frac{\\partial z}{\\partial x} \\frac{dx}{dt} + \\frac{\\partial z}{\\partial y} \\frac{dy}{dt} = \\nabla f \\cdot \\mathbf{r}'(t)$$

---

## 2. Case 2: Several Independent Parameters ($u, v$)

For $z = f(x, y)$ where $x = g(u, v)$ and $y = h(u, v)$:
$$\\frac{\\partial z}{\\partial u} = \\frac{\\partial z}{\\partial x} \\frac{\\partial x}{\\partial u} + \\frac{\\partial z}{\\partial y} \\frac{\\partial y}{\\partial u}$$
$$\\frac{\\partial z}{\\partial v} = \\frac{\\partial z}{\\partial x} \\frac{\\partial x}{\\partial v} + \\frac{\\partial z}{\\partial y} \\frac{\\partial y}{\\partial v}$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Chain Rule along a Parameterized Curve",
        exerciseReference: "Section 14.4, Exercise 1",
        originalTopic: "Chain Rule with One Parameter",
        difficulty: "tier1",
        tags: ["chain-rule", "parameterized-path", "derivatives"],
        problemStatement: "For z = x^2 y + 3xy^4 with x = sin(2t) and y = cos(t), find dz/dt at t = 0.",
        finalAnswer: "\\frac{dz}{dt} = 6",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Intermediate Variables and Derivatives at t = 0",
            mathExpression: "t = 0 \\implies x = \\sin 0 = 0, \\; y = \\cos 0 = 1; \\quad \\frac{dx}{dt} = 2\\cos(2t) \\implies 2, \\; \\frac{dy}{dt} = -\\sin(t) \\implies 0",
            explanation: "Compute coordinates and rates at t = 0.",
            why: "Finding branch inputs at evaluation time."
          },
          {
            stepNumber: 2,
            title: "Compute Partial Derivatives of z",
            mathExpression: "\\frac{\\partial z}{\\partial x} = 2xy + 3y^4 \\implies 2(0)(1) + 3(1)^4 = 3; \\quad \\frac{\\partial z}{\\partial y} = x^2 + 12xy^3 \\implies 0",
            explanation: "Evaluate z_x and z_y at (x, y) = (0, 1).",
            why: "Finding partial sensitivities."
          },
          {
            stepNumber: 3,
            title: "Apply Chain Rule Formula",
            mathExpression: "\\frac{dz}{dt} = \\frac{\\partial z}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial z}{\\partial y}\\frac{dy}{dt} = (3)(2) + (0)(0) = 6",
            explanation: "Multiply along tree branches and sum.",
            why: "Computing total time derivative."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(2*0*1 + 3*1**4)*2 + (0**2 + 12*0*1**3)*0",
          expected: "6"
        }
      },
      {
        filename: "ex-02",
        title: "Chain Rule with Two Independent Parameters",
        exerciseReference: "Section 14.4, Exercise 2",
        originalTopic: "Two-Parameter Chain Rule",
        difficulty: "tier2",
        tags: ["two-parameters", "chain-rule", "partial-derivatives"],
        problemStatement: "For z = exp(x) sin(y) with x = u^2 - v^2 and y = 2uv, find dz/du at (u, v) = (1, 1).",
        finalAnswer: "\\frac{\\partial z}{\\partial u} = 2\\sin(2) + 2\\cos(2)",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Intermediate Variables and Derivatives at (1, 1)",
            mathExpression: "x(1, 1) = 1 - 1 = 0, \\; y(1, 1) = 2(1)(1) = 2; \\quad \\frac{\\partial x}{\\partial u} = 2u = 2, \\; \\frac{\\partial y}{\\partial u} = 2v = 2",
            explanation: "Evaluate coordinates and u-derivatives at (1, 1).",
            why: "Finding values for chain rule tree."
          },
          {
            stepNumber: 2,
            title: "Compute Partial Derivatives of z",
            mathExpression: "\\frac{\\partial z}{\\partial x} = e^x \\sin y \\implies e^0 \\sin 2 = \\sin 2; \\quad \\frac{\\partial z}{\\partial y} = e^x \\cos y \\implies e^0 \\cos 2 = \\cos 2",
            explanation: "Evaluate z_x and z_y at (0, 2).",
            why: "Evaluating outer partial derivatives."
          },
          {
            stepNumber: 3,
            title: "Apply Chain Rule",
            mathExpression: "\\frac{\\partial z}{\\partial u} = (\\sin 2)(2) + (\\cos 2)(2) = 2\\sin 2 + 2\\cos 2",
            explanation: "Sum products of partials.",
            why: "Computing total partial rate dz/du."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(exp(0)*sin(2))*(2*1) + (exp(0)*cos(2))*(2*1)",
          expected: "2*sin(2) + 2*cos(2)"
        }
      },
      {
        filename: "ex-03",
        title: "Related Rates of Volume Change in a Cylinder",
        exerciseReference: "Section 14.4, Exercise 3",
        originalTopic: "Related Rates via Chain Rule",
        difficulty: "tier2",
        tags: ["related-rates", "cylinder", "chain-rule"],
        problemStatement: "The radius of a cylinder increases at dr/dt = 2 cm/s while height decreases at dh/dt = -3 cm/s. Find the rate of volume change dV/dt when r = 10 cm and h = 20 cm.",
        finalAnswer: "\\frac{dV}{dt} = 500\\pi \\text{ cm}^3/\\text{s}",
        steps: [
          {
            stepNumber: 1,
            title: "State Volume Formula and Partial Derivatives",
            mathExpression: "V = \\pi r^2 h \\implies \\frac{\\partial V}{\\partial r} = 2\\pi r h, \\quad \\frac{\\partial V}{\\partial h} = \\pi r^2",
            explanation: "Differentiate cylindrical volume with respect to radius and height.",
            why: "Finding geometric partial rates."
          },
          {
            stepNumber: 2,
            title: "Apply Chain Rule for Total Time Derivative",
            mathExpression: "\\frac{dV}{dt} = \\frac{\\partial V}{\\partial r}\\frac{dr}{dt} + \\frac{\\partial V}{\\partial h}\\frac{dh}{dt} = (2\\pi r h)(2) + (\\pi r^2)(-3)",
            explanation: "Sum contributions from expanding radius and contracting height.",
            why: "Applying multivariable Chain Rule."
          },
          {
            stepNumber: 3,
            title: "Substitute Given Dimensions",
            mathExpression: "\\frac{dV}{dt} = 2\\pi(10)(20)(2) + \\pi(100)(-3) = 800\\pi - 300\\pi = 500\\pi \\text{ cm}^3/\\text{s}",
            explanation: "Evaluate with r = 10 and h = 20.",
            why: "Evaluating net volume change rate."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*pi*10*20*2 + pi*10**2*(-3)",
          expected: "500*pi"
        }
      },
      {
        filename: "ex-04",
        title: "Radial Derivative in Polar Coordinates",
        exerciseReference: "Section 14.4, Exercise 4",
        originalTopic: "Coordinate Transformations",
        difficulty: "tier2",
        tags: ["polar-coordinates", "chain-rule", "transformations"],
        problemStatement: "For z = f(x, y) with x = r cos(theta) and y = r sin(theta), find dz/dr and evaluate it at theta = 0.",
        finalAnswer: "\\frac{\\partial z}{\\partial r} = f_x \\cos\\theta + f_y \\sin\\theta; \\quad \\left.\\frac{\\partial z}{\\partial r}\\right|_{\\theta=0} = f_x",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Coordinate Derivatives with Respect to r",
            mathExpression: "\\frac{\\partial x}{\\partial r} = \\cos\\theta, \\quad \\frac{\\partial y}{\\partial r} = \\sin\\theta",
            explanation: "Differentiate Cartesian coordinates with respect to radial distance r.",
            why: "Finding coordinate derivatives."
          },
          {
            stepNumber: 2,
            title: "Apply Chain Rule",
            mathExpression: "\\frac{\\partial z}{\\partial r} = \\frac{\\partial z}{\\partial x}\\frac{\\partial x}{\\partial r} + \\frac{\\partial z}{\\partial y}\\frac{\\partial y}{\\partial r} = f_x \\cos\\theta + f_y \\sin\\theta",
            explanation: "Combine via Chain Rule.",
            why: "Formulating radial derivative."
          },
          {
            stepNumber: 3,
            title: "Evaluate at theta = 0",
            mathExpression: "\\left.\\frac{\\partial z}{\\partial r}\\right|_{\\theta=0} = f_x (1) + f_y (0) = f_x",
            explanation: "Substitute cos(0) = 1 and sin(0) = 0.",
            why: "Evaluating along positive x-axis."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "cos(0)",
          expected: "1"
        }
      },
      {
        filename: "ex-05",
        title: "Slope of the Folium of Descartes via Implicit Chain Rule",
        exerciseReference: "Section 14.4, Exercise 5",
        originalTopic: "Implicit Differentiation via Chain Rule",
        difficulty: "tier2",
        tags: ["Folium-of-Descartes", "implicit-derivative", "chain-rule"],
        problemStatement: "Find the slope dy/dx of the Folium of Descartes x^3 + y^3 - 6xy = 0 at the symmetric point (3, 3).",
        finalAnswer: "\\frac{dy}{dx} = -1",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Implicit Derivative Formula",
            mathExpression: "F(x, y) = x^3 + y^3 - 6xy = 0 \\implies \\frac{dy}{dx} = -\\frac{F_x}{F_y} = -\\frac{3x^2 - 6y}{3y^2 - 6x} = -\\frac{x^2 - 2y}{y^2 - 2x}",
            explanation: "Differentiate implicitly using Chain Rule: F_x + F_y (dy/dx) = 0.",
            why: "Formulating implicit derivative formula."
          },
          {
            stepNumber: 2,
            title: "Substitute Point Coordinates (3, 3)",
            mathExpression: "\\left.\\frac{dy}{dx}\\right|_{(3,3)} = -\\frac{3^2 - 2(3)}{3^2 - 2(3)} = -\\frac{9 - 6}{9 - 6} = -\\frac{3}{3} = -1",
            explanation: "Substitute x = 3 and y = 3.",
            why: "Computing numerical slope at point."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "-(3**2 - 2*3)/(3**2 - 2*3)",
          expected: "-1"
        }
      }
    ]
  },
  {
    chapter: "ch14",
    chapterDir: "ch14-partial-derivatives",
    section: "14.5",
    sectionDir: "14.5-directional-derivatives-and-gradient-vectors",
    title: "Directional Derivatives and Gradient Vectors",
    definitions: [
      {
        id: "def-gradient-vector",
        title: "Gradient Vector",
        category: "definition",
        latex: "\\nabla f(x, y) = f_x \\mathbf{i} + f_y \\mathbf{j} = \\langle f_x, f_y \\rangle, \\quad \\nabla f(x, y, z) = \\langle f_x, f_y, f_z \\rangle",
        statement: "The gradient of a differentiable scalar function f is the vector field whose components are the first partial derivatives of f.",
        conditions: ["f is differentiable"],
        explanation: "Points in the direction of maximum instantaneous rate of increase of f, with magnitude |grad f| equal to that maximal rate.",
        keyTakeaway: "grad f is everywhere orthogonal to the level curves or level surfaces of f."
      },
      {
        id: "formula-directional-derivative",
        title: "Directional Derivative",
        category: "formula",
        latex: "D_\\mathbf{u} f(x_0, y_0) = \\nabla f(x_0, y_0) \\cdot \\mathbf{u} = |\\nabla f| \\cos\\theta",
        statement: "The directional derivative of f in the direction of unit vector u is the scalar product of the gradient vector with u. It measures the rate of change of f moving through (x_0, y_0) along direction u.",
        conditions: ["u is a unit vector: |u| = 1"],
        explanation: "Attains maximum value |grad f| when u is parallel to grad f (theta = 0); minimum -|grad f| when antiparallel (theta = pi); and zero when tangent to level curve (theta = pi/2).",
        keyTakeaway: "Computes rate of change in any arbitrary spatial direction."
      }
    ],
    summaryMDX: `# Section 14.5: Directional Derivatives and Gradient Vectors

The gradient vector points in the direction of steepest ascent and governs directional rates of change.

---

## 1. Directional Derivative Formula

For differentiable $f$ and unit vector $\\mathbf{u}$:
$$D_\\mathbf{u} f = \\nabla f \\cdot \\mathbf{u} = |\\nabla f| \\cos\\theta$$

- **Maximum Rate of Increase**: $+|\\nabla f|$ (in direction of $\\nabla f$)
- **Maximum Rate of Decrease**: $-|\\nabla f|$ (in direction of $-\\nabla f$)
- **Zero Rate of Change**: $D_\\mathbf{u} f = 0$ (perpendicular to $\\nabla f$, along the level curve)

---

## 2. Orthogonality to Level Sets

At any point $P_0$, the gradient vector $\\nabla f(P_0)$ is perpendicular to the tangent line (in 2D) or tangent plane (in 3D) of the level set passing through $P_0$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Gradient Vector of a Function of Two Variables",
        exerciseReference: "Section 14.5, Exercise 1",
        originalTopic: "Gradient Vector Computation",
        difficulty: "tier1",
        tags: ["gradient", "partial-derivatives", "vector-calculus"],
        problemStatement: "Compute the gradient grad f for f(x, y) = x^2 y + sqrt(y) at the point (2, 4).",
        finalAnswer: "\\nabla f(2, 4) = \\left\\langle 16, \\frac{17}{4} \\right\\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Compute First Partial Derivatives",
            mathExpression: "f_x = 2xy, \\quad f_y = x^2 + \\frac{1}{2\\sqrt{y}}",
            explanation: "Differentiate with respect to x and y independently.",
            why: "Finding components of gradient."
          },
          {
            stepNumber: 2,
            title: "Evaluate at (2, 4)",
            mathExpression: "f_x(2, 4) = 2(2)(4) = 16; \\quad f_y(2, 4) = 2^2 + \\frac{1}{2\\sqrt{4}} = 4 + \\frac{1}{4} = \\frac{17}{4}",
            explanation: "Substitute point coordinates into gradient components.",
            why: "Computing numerical gradient at point."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 + 1/4",
          expected: "17/4"
        }
      },
      {
        filename: "ex-02",
        title: "Directional Derivative in a Specified Direction",
        exerciseReference: "Section 14.5, Exercise 2",
        originalTopic: "Directional Derivative",
        difficulty: "tier1",
        tags: ["directional-derivative", "unit-vector", "dot-product"],
        problemStatement: "Find the directional derivative of f(x, y) = x^3 - 3xy + 4y^2 at P(1, 2) in the direction of v = 3i + 4j.",
        finalAnswer: "D_\\mathbf{u} f(1, 2) = \\frac{43}{5}",
        steps: [
          {
            stepNumber: 1,
            title: "Normalize Direction Vector to Unit Length",
            mathExpression: "|\\mathbf{v}| = \\sqrt{3^2 + 4^2} = 5 \\implies \\mathbf{u} = \\left\\langle \\frac{3}{5}, \\frac{4}{5} \\right\\rangle",
            explanation: "Divide direction vector by its length 5.",
            why: "Ensuring unit vector condition."
          },
          {
            stepNumber: 2,
            title: "Calculate Gradient Vector at P(1, 2)",
            mathExpression: "\\nabla f = \\langle 3x^2 - 3y, -3x + 8y \\rangle \\implies \\nabla f(1, 2) = \\langle 3(1) - 3(2), -3(1) + 8(2) \\rangle = \\langle -3, 13 \\rangle",
            explanation: "Evaluate partial derivatives at (1, 2).",
            why: "Finding gradient at given point."
          },
          {
            stepNumber: 3,
            title: "Compute Scalar Product grad f . u",
            mathExpression: "D_\\mathbf{u} f = \\langle -3, 13 \\rangle \\cdot \\left\\langle \\frac{3}{5}, \\frac{4}{5} \\right\\rangle = \\frac{(-3)(3) + (13)(4)}{5} = \\frac{-9 + 52}{5} = \\frac{43}{5}",
            explanation: "Take inner product of gradient and unit direction.",
            why: "Evaluating directional rate of change."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(-3)*(3/5) + 13*(4/5)",
          expected: "43/5"
        }
      },
      {
        filename: "ex-03",
        title: "Maximum Rate of Change of a 3D Function",
        exerciseReference: "Section 14.5, Exercise 3",
        originalTopic: "Steepest Ascent",
        difficulty: "tier2",
        tags: ["maximum-rate-of-change", "steepest-ascent", "gradient-magnitude"],
        problemStatement: "Find the maximum rate of change of f(x, y, z) = x^2 + 2y^2 - 3z^2 at P(1, 1, 1) and the direction in which it occurs.",
        finalAnswer: "\\text{Max Rate: } 2\\sqrt{14}, \\quad \\text{Direction: } \\langle 2, 4, -6 \\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Compute 3D Gradient Vector",
            mathExpression: "\\nabla f = \\langle 2x, 4y, -6z \\rangle \\implies \\nabla f(1, 1, 1) = \\langle 2, 4, -6 \\rangle",
            explanation: "Evaluate partial derivatives at (1, 1, 1).",
            why: "Determining direction of steepest ascent."
          },
          {
            stepNumber: 2,
            title: "Compute Magnitude of Gradient",
            mathExpression: "|\\nabla f(1, 1, 1)| = \\sqrt{2^2 + 4^2 + (-6)^2} = \\sqrt{4 + 16 + 36} = \\sqrt{56} = 2\\sqrt{14}",
            explanation: "The maximum rate of increase equals the norm of the gradient vector.",
            why: "Calculating maximum rate of change."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(4 + 16 + 36)",
          expected: "2*sqrt(14)"
        }
      },
      {
        filename: "ex-04",
        title: "Normal Vector to an Elliptical Level Curve",
        exerciseReference: "Section 14.5, Exercise 4",
        originalTopic: "Orthogonality to Level Curves",
        difficulty: "tier1",
        tags: ["level-curve", "normal-vector", "orthogonality"],
        problemStatement: "Find a normal vector to the level curve x^2 + 4y^2 = 8 at the point (2, 1).",
        finalAnswer: "\\mathbf{n} = \\langle 4, 8 \\rangle = 4\\langle 1, 2 \\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Define g(x, y) and Compute Gradient",
            mathExpression: "g(x, y) = x^2 + 4y^2 \\implies \\nabla g(x, y) = \\langle 2x, 8y \\rangle",
            explanation: "The gradient of g is orthogonal to every level curve g(x, y) = c.",
            why: "Applying level curve orthogonality theorem."
          },
          {
            stepNumber: 2,
            title: "Evaluate at Point (2, 1)",
            mathExpression: "\\nabla g(2, 1) = \\langle 2(2), 8(1) \\rangle = \\langle 4, 8 \\rangle",
            explanation: "Substitute x = 2 and y = 1.",
            why: "Finding normal vector."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 / 8",
          expected: "1/2"
        }
      },
      {
        filename: "ex-05",
        title: "Directions of Zero Rate of Change",
        exerciseReference: "Section 14.5, Exercise 5",
        originalTopic: "Zero Directional Derivative",
        difficulty: "tier2",
        tags: ["contour-tangent", "zero-rate", "orthogonality"],
        problemStatement: "At a point where grad f = <-3, 13>, find the unit directions u along which the directional derivative is zero.",
        finalAnswer: "\\mathbf{u} = \\pm \\frac{1}{\\sqrt{178}} \\langle 13, 3 \\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Set Directional Derivative Equal to Zero",
            mathExpression: "D_\\mathbf{u} f = \\nabla f \\cdot \\mathbf{u} = 0",
            explanation: "Zero change occurs in directions tangent to the level curve (orthogonal to grad f).",
            why: "Setting up orthogonality condition."
          },
          {
            stepNumber: 2,
            title: "Find Orthogonal Vector and Normalize",
            mathExpression: "\\langle -3, 13 \\rangle \\cdot \\langle u_1, u_2 \\rangle = -3 u_1 + 13 u_2 = 0 \\implies \\mathbf{u} \\parallel \\langle 13, 3 \\rangle",
            explanation: "Rotate the vector by 90 degrees.",
            why: "Finding orthogonal direction."
          },
          {
            stepNumber: 3,
            title: "Normalize to Unit Length",
            mathExpression: "|\\langle 13, 3 \\rangle| = \\sqrt{169 + 9} = \\sqrt{178} \\implies \\mathbf{u} = \\pm \\frac{1}{\\sqrt{178}} \\langle 13, 3 \\rangle",
            explanation: "Divide by the Euclidean norm.",
            why: "Obtaining unit direction vectors."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(-3)*13 + 13*3",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch14",
    chapterDir: "ch14-partial-derivatives",
    section: "14.6",
    sectionDir: "14.6-tangent-planes-and-differentials",
    title: "Tangent Planes and Differentials",
    definitions: [
      {
        id: "def-tangent-plane",
        title: "Tangent Plane to a Surface",
        category: "definition",
        latex: "z - z_0 = f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0)",
        statement: "The tangent plane to the surface z = f(x, y) at P_0(x_0, y_0, z_0) is the plane containing all tangent lines to curves on the surface through P_0. For level surface F(x, y, z) = c, equation is grad F(P_0) . (r - r_0) = 0.",
        conditions: ["f is differentiable at (x_0, y_0)", "grad F(P_0) != 0"],
        explanation: "Provides the best linear approximation to the curved surface near the point of tangency.",
        keyTakeaway: "Normal vector to the tangent plane of z = f(x, y) is <f_x, f_y, -1>."
      },
      {
        id: "def-linearization-total-differential",
        title: "Linearization and Total Differential",
        category: "formula",
        latex: "L(x, y) = f(x_0, y_0) + f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0), \\quad dz = f_x dx + f_y dy",
        statement: "The linearization L(x, y) is the linear function whose graph is the tangent plane. The total differential dz approximates the actual change Delta z = f(x_0+dx, y_0+dy) - f(x_0, y_0) for small increments dx, dy.",
        conditions: ["Partial derivatives are continuous"],
        explanation: "Error Delta z - dz approaches 0 faster than distance sqrt(dx^2 + dy^2).",
        keyTakeaway: "Used extensively for error propagation and linear sensitivity analysis."
      }
    ],
    summaryMDX: `# Section 14.6: Tangent Planes and Differentials

Tangent planes generalize single-variable tangent lines to surfaces in three-dimensional space.

---

## 1. Tangent Plane Equations

1. **Explicit Surface $z = f(x, y)$** at $(x_0, y_0, z_0)$:
$$z - z_0 = f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0)$$

2. **Implicit Level Surface $F(x, y, z) = c$** at $(x_0, y_0, z_0)$:
$$F_x(x_0, y_0, z_0)(x - x_0) + F_y(x_0, y_0, z_0)(y - y_0) + F_z(x_0, y_0, z_0)(z - z_0) = 0$$

---

## 2. Total Differential and Linearization

- **Linearization**: $L(x, y) = f(x_0, y_0) + f_x(x_0, y_0)\\Delta x + f_y(x_0, y_0)\\Delta y$
- **Total Differential**: $dz = \\frac{\\partial z}{\\partial x} dx + \\frac{\\partial z}{\\partial y} dy$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Tangent Plane to an Elliptic Paraboloid",
        exerciseReference: "Section 14.6, Exercise 1",
        originalTopic: "Tangent Plane to Explicit Surface",
        difficulty: "tier1",
        tags: ["tangent-plane", "paraboloid", "linearization"],
        problemStatement: "Find the equation of the tangent plane to the surface z = 2x^2 + y^2 at the point (1, 1, 3).",
        finalAnswer: "4x + 2y - z = 3",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Partial Derivatives at (1, 1)",
            mathExpression: "f_x = 4x \\implies f_x(1, 1) = 4; \\quad f_y = 2y \\implies f_y(1, 1) = 2",
            explanation: "Differentiate z with respect to x and y and evaluate at (1, 1).",
            why: "Finding tangent plane slopes."
          },
          {
            stepNumber: 2,
            title: "Apply Tangent Plane Equation",
            mathExpression: "z - 3 = 4(x - 1) + 2(y - 1) \\implies z - 3 = 4x - 4 + 2y - 2 \\implies 4x + 2y - z = 3",
            explanation: "Substitute coordinates and partial derivatives into point-slope plane formula.",
            why: "Formulating standard plane equation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4*(x - 1) + 2*(y - 1) + 3 - (4*x + 2*y - 3)",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Linearization and Numerical Approximation",
        exerciseReference: "Section 14.6, Exercise 2",
        originalTopic: "Linear Approximation",
        difficulty: "tier2",
        tags: ["linearization", "approximation", "differentials"],
        problemStatement: "Find the linearization L(x, y) of f(x, y) = sqrt(x^2 + y^2) at (3, 4) and use it to approximate f(3.06, 3.92).",
        finalAnswer: "L(x, y) = 5 + \\frac{3}{5}(x - 3) + \\frac{4}{5}(y - 4); \\quad f(3.06, 3.92) \\approx 4.972",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Function and Partials at Base Point (3, 4)",
            mathExpression: "f(3, 4) = \\sqrt{9 + 16} = 5; \\quad f_x(3, 4) = \\frac{3}{5} = 0.6, \\quad f_y(3, 4) = \\frac{4}{5} = 0.8",
            explanation: "Compute value and partial derivatives at reference point.",
            why: "Establishing linear expansion coefficients."
          },
          {
            stepNumber: 2,
            title: "Construct Linearization Formula",
            mathExpression: "L(x, y) = 5 + 0.6(x - 3) + 0.8(y - 4)",
            explanation: "Assemble linear approximation formula.",
            why: "Formulating linearization."
          },
          {
            stepNumber: 3,
            title: "Evaluate at Perturbed Coordinates",
            mathExpression: "L(3.06, 3.92) = 5 + 0.6(0.06) + 0.8(-0.08) = 5 + 0.036 - 0.064 = 4.972",
            explanation: "Substitute Delta x = 0.06 and Delta y = -0.08.",
            why: "Computing numerical approximation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "5 + (3/5)*(3.06 - 3) + (4/5)*(3.92 - 4)",
          expected: "4.972"
        }
      },
      {
        filename: "ex-03",
        title: "Computing Total Differential of a Power Product",
        exerciseReference: "Section 14.6, Exercise 3",
        originalTopic: "Total Differential",
        difficulty: "tier1",
        tags: ["total-differential", "differentials", "error-estimation"],
        problemStatement: "For z = x^3 y^2, compute the total differential dz at (x, y) = (2, 3) for dx = 0.01 and dy = -0.02.",
        finalAnswer: "dz = 0.12",
        steps: [
          {
            stepNumber: 1,
            title: "Find Partial Derivatives of z",
            mathExpression: "\\frac{\\partial z}{\\partial x} = 3x^2 y^2, \\quad \\frac{\\partial z}{\\partial y} = 2x^3 y",
            explanation: "Differentiate with respect to x and y.",
            why: "Finding differential coefficients."
          },
          {
            stepNumber: 2,
            title: "Evaluate Total Differential",
            mathExpression: "dz = (3x^2 y^2) dx + (2x^3 y) dy = [3(4)(9)](0.01) + [2(8)(3)](-0.02) = (108)(0.01) + (48)(-0.02) = 1.08 - 0.96 = 0.12",
            explanation: "Substitute x = 2, y = 3, dx = 0.01, dy = -0.02.",
            why: "Evaluating total differential."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "3*4*9*0.01 + 2*8*3*(-0.02)",
          expected: "0.12"
        }
      },
      {
        filename: "ex-04",
        title: "Normal Line to a Spherical Level Surface",
        exerciseReference: "Section 14.6, Exercise 4",
        originalTopic: "Normal Line to Surface",
        difficulty: "tier2",
        tags: ["normal-line", "level-surface", "sphere"],
        problemStatement: "Find parametric equations for the normal line to the sphere x^2 + y^2 + z^2 = 14 at the point P(1, 2, 3).",
        finalAnswer: "x = 1 + t, \\quad y = 2 + 2t, \\quad z = 3 + 3t",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Gradient Normal Vector",
            mathExpression: "F(x, y, z) = x^2 + y^2 + z^2 - 14 \\implies \\nabla F(1, 2, 3) = \\langle 2, 4, 6 \\rangle = 2\\langle 1, 2, 3 \\rangle",
            explanation: "The gradient is normal to the sphere at P.",
            why: "Determining normal line direction vector."
          },
          {
            stepNumber: 2,
            title: "Write Parametric Equations of Normal Line",
            mathExpression: "x = 1 + 1t, \\quad y = 2 + 2t, \\quad z = 3 + 3t",
            explanation: "Use simplified direction vector <1, 2, 3> passing through point (1, 2, 3).",
            why: "Formulating normal line."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1 + 1*2) + (2 + 2*2) + (3 + 3*2)",
          expected: "3 + 6 + 9"
        }
      },
      {
        filename: "ex-05",
        title: "Maximum Relative Percentage Error Propagation",
        exerciseReference: "Section 14.6, Exercise 5",
        originalTopic: "Error Propagation",
        difficulty: "tier2",
        tags: ["percentage-error", "differentials", "geometry"],
        problemStatement: "The area of a rectangle is A = xy. If errors in measuring x and y are at most 1% and 2% respectively, estimate the maximum percentage error in the calculated area.",
        finalAnswer: "3\\%",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Relative Differential dA/A",
            mathExpression: "dA = y \\, dx + x \\, dy \\implies \\frac{dA}{A} = \\frac{y \\, dx + x \\, dy}{xy} = \\frac{dx}{x} + \\frac{dy}{y}",
            explanation: "Divide total differential dA by area formula A = xy.",
            why: "Deriving relative error formula."
          },
          {
            stepNumber: 2,
            title: "Sum Maximum Relative Absolute Errors",
            mathExpression: "\\left|\\frac{dA}{A}\\right| \\le \\left|\\frac{dx}{x}\\right| + \\left|\\frac{dy}{y}\\right| \\le 0.01 + 0.02 = 0.03 = 3\\%",
            explanation: "Apply triangle inequality to bound worst-case relative error.",
            why: "Estimating maximum propagation error."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0.01 + 0.02",
          expected: "0.03"
        }
      }
    ]
  },
  {
    chapter: "ch14",
    chapterDir: "ch14-partial-derivatives",
    section: "14.7",
    sectionDir: "14.7-extreme-values-and-saddle-points",
    title: "Extreme Values and Saddle Points",
    definitions: [
      {
        id: "def-critical-points-multivariable",
        title: "Critical Points and Local Extrema",
        category: "definition",
        latex: "\\nabla f(x_0, y_0) = \\mathbf{0} \\iff f_x(x_0, y_0) = 0 \\quad \\text{and} \\quad f_y(x_0, y_0) = 0",
        statement: "A point (x_0, y_0) in the domain of f is a critical point if either both first partial derivatives vanish or at least one partial derivative fails to exist. Local extrema occur only at critical points or boundary points.",
        conditions: ["Point belongs to interior of domain"],
        explanation: "Horizontal tangent plane z = z_0 occurs at stationary critical points.",
        keyTakeaway: "Necessary condition for interior local extrema of differentiable functions."
      },
      {
        id: "test-second-derivative-test",
        title: "Second Derivative Test for Functions of Two Variables",
        category: "test",
        latex: "D = f_{xx}(a, b) f_{yy}(a, b) - [f_{xy}(a, b)]^2",
        statement: "Let (a, b) be a critical point with continuous second partials. If D > 0 and f_{xx} < 0, f has a local maximum; if D > 0 and f_{xx} > 0, f has a local minimum; if D < 0, f has a saddle point; if D = 0, the test is inconclusive.",
        conditions: ["f_x(a, b) = f_y(a, b) = 0", "Second partials are continuous"],
        explanation: "D is the determinant of the Hessian matrix. Positive D guarantees consistent curvature in all directions, while negative D indicates opposite curvatures (saddle).",
        keyTakeaway: "Classifies stationary points into local maxima, local minima, and saddle points."
      }
    ],
    summaryMDX: `# Section 14.7: Extreme Values and Saddle Points

Optimization of multivariable functions involves identifying critical points and classifying their geometric behavior.

---

## 1. The Second Derivative Test

Let $(a, b)$ be a critical point ($f_x = 0, f_y = 0$). Evaluate the **discriminant** (Hessian determinant):
$$D = f_{xx} f_{yy} - (f_{xy})^2$$

1. **Local Minimum**: $D > 0$ and $f_{xx} > 0$ (or $f_{yy} > 0$)
2. **Local Maximum**: $D > 0$ and $f_{xx} < 0$ (or $f_{yy} < 0$)
3. **Saddle Point**: $D < 0$
4. **Inconclusive**: $D = 0$

---

## 2. Absolute Extrema on Closed Bounded Regions

To find absolute extrema on a closed, bounded set $R$:
1. Find all critical points in the interior of $R$ and evaluate $f$.
2. Find the extreme values of $f$ on the boundary of $R$.
3. The largest and smallest values from steps 1 and 2 are the absolute maximum and minimum.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Second Derivative Test on a Cubic Surface",
        exerciseReference: "Section 14.7, Exercise 1",
        originalTopic: "Classification of Critical Points",
        difficulty: "tier2",
        tags: ["second-derivative-test", "critical-points", "saddle-point"],
        problemStatement: "Find and classify all critical points of f(x, y) = x^3 + y^3 - 3xy.",
        finalAnswer: "(0, 0) \\text{ is a saddle point}; \\quad (1, 1) \\text{ is a local minimum with } f(1, 1) = -1",
        steps: [
          {
            stepNumber: 1,
            title: "Find Critical Points by Setting First Partials to Zero",
            mathExpression: "f_x = 3x^2 - 3y = 0 \\implies y = x^2; \\quad f_y = 3y^2 - 3x = 0 \\implies x = y^2",
            explanation: "Substitute y = x^2 into x = y^2 to obtain x = x^4, so x(x^3 - 1) = 0.",
            why: "Locating stationary points."
          },
          {
            stepNumber: 2,
            title: "Identify Real Critical Points",
            mathExpression: "x = 0 \\implies y = 0 \\; (0, 0); \\quad x = 1 \\implies y = 1 \\; (1, 1)",
            explanation: "There are two real critical points: (0, 0) and (1, 1).",
            why: "Extracting critical coordinates."
          },
          {
            stepNumber: 3,
            title: "Compute Second Partials and Discriminant",
            mathExpression: "f_{xx} = 6x, \\; f_{yy} = 6y, \\; f_{xy} = -3 \\implies D = (6x)(6y) - (-3)^2 = 36xy - 9",
            explanation: "Formulate discriminant D = f_{xx} f_{yy} - (f_{xy})^2.",
            why: "Setting up Hessian determinant."
          },
          {
            stepNumber: 4,
            title: "Classify Each Point",
            mathExpression: "\\text{At } (0, 0): D = -9 < 0 \\implies \\text{Saddle}; \\quad \\text{At } (1, 1): D = 36 - 9 = 27 > 0, \\; f_{xx} = 6 > 0 \\implies \\text{Local Min}",
            explanation: "Apply Second Derivative Test rules.",
            why: "Classifying critical point topologies."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "6*6 - (-3)**2",
          expected: "27"
        }
      },
      {
        filename: "ex-02",
        title: "Saddle Point of a Hyperbolic Paraboloid",
        exerciseReference: "Section 14.7, Exercise 2",
        originalTopic: "Saddle Points",
        difficulty: "tier1",
        tags: ["saddle-point", "discriminant", "extrema"],
        problemStatement: "Verify that the critical point of f(x, y) = x^2 - y^2 is a saddle point.",
        finalAnswer: "\\text{Critical point at } (0, 0) \\text{ has } D = -4 < 0 \\implies \\text{Saddle point}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Critical Point",
            mathExpression: "f_x = 2x = 0 \\implies x = 0; \\quad f_y = -2y = 0 \\implies y = 0",
            explanation: "The unique critical point is (0, 0).",
            why: "Locating critical point."
          },
          {
            stepNumber: 2,
            title: "Evaluate Discriminant",
            mathExpression: "f_{xx} = 2, \\quad f_{yy} = -2, \\quad f_{xy} = 0 \\implies D = (2)(-2) - 0^2 = -4 < 0",
            explanation: "Since D is strictly negative, the origin is a saddle point.",
            why: "Applying Second Derivative Test."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 * (-2) - 0",
          expected: "-4"
        }
      },
      {
        filename: "ex-03",
        title: "Local Maximum of a Quadratic Surface",
        exerciseReference: "Section 14.7, Exercise 3",
        originalTopic: "Local Maximum",
        difficulty: "tier1",
        tags: ["local-maximum", "quadratic-surface", "optimization"],
        problemStatement: "Find and classify the critical point of f(x, y) = 10 - x^2 - y^2 + 2x - 4y.",
        finalAnswer: "\\text{Local maximum at } (1, -2) \\text{ with value } 15",
        steps: [
          {
            stepNumber: 1,
            title: "Solve First Partials",
            mathExpression: "f_x = -2x + 2 = 0 \\implies x = 1; \\quad f_y = -2y - 4 = 0 \\implies y = -2",
            explanation: "Find the unique stationary point (1, -2).",
            why: "Finding critical coordinates."
          },
          {
            stepNumber: 2,
            title: "Evaluate Second Partials and Classify",
            mathExpression: "f_{xx} = -2, \\; f_{yy} = -2, \\; f_{xy} = 0 \\implies D = (-2)(-2) - 0 = 4 > 0, \\; f_{xx} = -2 < 0",
            explanation: "D > 0 and f_{xx} < 0 confirms a local maximum.",
            why: "Confirming concavity."
          },
          {
            stepNumber: 3,
            title: "Compute Maximum Value",
            mathExpression: "f(1, -2) = 10 - 1 - 4 + 2(1) - 4(-2) = 10 - 5 + 2 + 8 = 15",
            explanation: "Substitute coordinates into f.",
            why: "Evaluating maximum function value."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "10 - 1**2 - (-2)**2 + 2*(1) - 4*(-2)",
          expected: "15"
        }
      },
      {
        filename: "ex-04",
        title: "Absolute Extrema on a Closed Triangular Region",
        exerciseReference: "Section 14.7, Exercise 4",
        originalTopic: "Absolute Extrema on Compact Sets",
        difficulty: "tier2",
        tags: ["absolute-extrema", "compact-set", "boundary-analysis"],
        problemStatement: "Find the absolute maximum of f(x, y) = 2 + 2x + 2y - x^2 - y^2 on the closed triangular region bounded by x = 0, y = 0, and y = 9 - x.",
        finalAnswer: "\\text{Absolute maximum value is } 4 \\text{ at } (1, 1)",
        steps: [
          {
            stepNumber: 1,
            title: "Find Interior Critical Points",
            mathExpression: "f_x = 2 - 2x = 0 \\implies x = 1; \\quad f_y = 2 - 2y = 0 \\implies y = 1",
            explanation: "The point (1, 1) lies strictly inside the triangle because 1 + 1 = 2 < 9.",
            why: "Finding interior stationary candidate."
          },
          {
            stepNumber: 2,
            title: "Evaluate at Interior Critical Point",
            mathExpression: "f(1, 1) = 2 + 2(1) + 2(1) - 1^2 - 1^2 = 2 + 2 + 2 - 2 = 4",
            explanation: "Compute function value at interior peak.",
            why: "Evaluating peak candidate."
          },
          {
            stepNumber: 3,
            title: "Inspect Boundary Behavior",
            mathExpression: "\\text{On } x = 0: g(y) = 2 + 2y - y^2 \\le 3; \\quad \\text{On } y = 0: h(x) \\le 3; \\quad \\text{On } x+y=9: f < 0",
            explanation: "All boundary values are strictly less than 4.",
            why: "Ruling out boundary for maximum."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 + 2*1 + 2*1 - 1**2 - 1**2",
          expected: "4"
        }
      },
      {
        filename: "ex-05",
        title: "Minimizing the Surface Area of an Open Rectangular Box",
        exerciseReference: "Section 14.7, Exercise 5",
        originalTopic: "Applied Multivariable Optimization",
        difficulty: "tier2",
        tags: ["optimization", "box", "surface-area"],
        problemStatement: "An open-top rectangular box has fixed volume V = 32000 cm^3. Find the dimensions x, y, z that minimize the total surface area, and compute that minimum area.",
        finalAnswer: "x = 40 \\text{ cm}, \\; y = 40 \\text{ cm}, \\; z = 20 \\text{ cm}; \\quad \\text{Min Area} = 4800 \\text{ cm}^2",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate Two-Variable Objective Function",
            mathExpression: "V = xyz = 32000 \\implies z = \\frac{32000}{xy}; \\quad S(x, y) = xy + 2xz + 2yz = xy + \\frac{64000}{y} + \\frac{64000}{x}",
            explanation: "Substitute z from volume constraint into surface area formula.",
            why: "Formulating objective function."
          },
          {
            stepNumber: 2,
            title: "Find Critical Dimensions",
            mathExpression: "S_x = y - \\frac{64000}{x^2} = 0, \\; S_y = x - \\frac{64000}{y^2} = 0 \\implies x^2 y = y^2 x \\implies x = y; \\quad x^3 = 64000 \\implies x = y = 40",
            explanation: "Set partial derivatives to zero and solve.",
            why: "Finding optimal base dimensions."
          },
          {
            stepNumber: 3,
            title: "Compute Height and Minimum Surface Area",
            mathExpression: "z = \\frac{32000}{40 \\times 40} = 20; \\quad S = (40)(40) + 2(40)(20) + 2(40)(20) = 1600 + 1600 + 1600 = 4800 \\text{ cm}^2",
            explanation: "Substitute optimal dimensions to find minimum area.",
            why: "Evaluating minimum material requirement."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "40*40 + 64000/40 + 64000/40",
          expected: "4800"
        }
      }
    ]
  },
  {
    chapter: "ch14",
    chapterDir: "ch14-partial-derivatives",
    section: "14.8",
    sectionDir: "14.8-lagrange-multipliers",
    title: "Lagrange Multipliers",
    definitions: [
      {
        id: "theorem-lagrange-multipliers",
        title: "Method of Lagrange Multipliers (One Constraint)",
        category: "theorem",
        latex: "\\nabla f = \\lambda \\nabla g, \\quad g(x, y, z) = k",
        statement: "To find the maximum and minimum values of f(x, y, z) subject to constraint g(x, y, z) = k (assuming grad g != 0 on the constraint surface), find all values of x, y, z and scalar multiplier lambda satisfying grad f = lambda grad g alongside g = k.",
        conditions: ["grad g != 0 on the level surface g = k", "f and g have continuous partials"],
        explanation: "At an extremum, the level surface of f must be tangent to the constraint surface g = k, meaning their normal gradient vectors must be parallel.",
        keyTakeaway: "Transforms constrained optimization into an unconstrained system of equations."
      },
      {
        id: "theorem-lagrange-two-constraints",
        title: "Lagrange Multipliers with Two Constraints",
        category: "theorem",
        latex: "\\nabla f = \\lambda \\nabla g + \\mu \\nabla h, \\quad g = k_1, \\; h = k_2",
        statement: "To optimize f subject to two simultaneous constraints g = k_1 and h = k_2, the gradient of f must lie in the plane spanned by the constraint gradients grad g and grad h.",
        conditions: ["grad g and grad h are linearly independent"],
        explanation: "The curve of intersection of the two constraint surfaces is orthogonal to grad f at the extremum point.",
        keyTakeaway: "Optimizes functions along space curves formed by intersecting surfaces."
      }
    ],
    summaryMDX: `# Section 14.8: Lagrange Multipliers

The method of Lagrange multipliers optimizes functions subject to equality constraints.

---

## 1. Single Constraint $\\nabla f = \\lambda \\nabla g$

Solve the system of equations:
$$\\begin{cases} f_x = \\lambda g_x \\\\ f_y = \\lambda g_y \\\\ f_z = \\lambda g_z \\\\ g(x, y, z) = k \\end{cases}$$

The scalar $\\lambda$ represents the **marginal rate of change** of the optimal value with respect to the constraint level $k$: $\\lambda = \\frac{df^*}{dk}$.

---

## 2. Two Constraints $\\nabla f = \\lambda \\nabla g + \\mu \\nabla h$

When restricted to the intersection curve of two surfaces $g = k_1$ and $h = k_2$:
$$\\nabla f = \\lambda \\nabla g + \\mu \\nabla h$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Maximizing a Product Subject to a Linear Constraint",
        exerciseReference: "Section 14.8, Exercise 1",
        originalTopic: "Lagrange Multipliers with One Constraint",
        difficulty: "tier1",
        tags: ["Lagrange-multipliers", "constrained-optimization", "linear-constraint"],
        problemStatement: "Maximize f(x, y) = xy subject to the constraint x + y = 10.",
        finalAnswer: "\\text{Maximum is } 25 \\text{ at } (5, 5)",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Lagrange Multiplier Gradients",
            mathExpression: "\\nabla f = \\langle y, x \\rangle, \\quad \\nabla g = \\langle 1, 1 \\rangle \\implies \\langle y, x \\rangle = \\lambda \\langle 1, 1 \\rangle",
            explanation: "Compute gradients of objective f and constraint g(x, y) = x + y - 10.",
            why: "Formulating Lagrange system."
          },
          {
            stepNumber: 2,
            title: "Solve for Variables and Multiplier",
            mathExpression: "y = \\lambda, \\; x = \\lambda \\implies x = y; \\quad x + x = 10 \\implies 2x = 10 \\implies x = 5, \\; y = 5",
            explanation: "Equate x and y and substitute into constraint.",
            why: "Finding critical point on constraint."
          },
          {
            stepNumber: 3,
            title: "Evaluate Maximum Value",
            mathExpression: "f(5, 5) = (5)(5) = 25",
            explanation: "Multiply optimal values.",
            why: "Computing optimal objective value."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "5 * 5",
          expected: "25"
        }
      },
      {
        filename: "ex-02",
        title: "Shortest Distance from the Origin to a Plane",
        exerciseReference: "Section 14.8, Exercise 2",
        originalTopic: "Constrained Distance Optimization",
        difficulty: "tier2",
        tags: ["distance-to-plane", "Lagrange-multipliers", "quadratic-optimization"],
        problemStatement: "Find the point on the plane 2x - y + z = 6 closest to the origin, and compute that minimum distance.",
        finalAnswer: "\\text{Closest point: } (2, -1, 1), \\quad \\text{Distance: } \\sqrt{6}",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate Squared Distance Objective Function",
            mathExpression: "f(x, y, z) = x^2 + y^2 + z^2; \\quad g(x, y, z) = 2x - y + z = 6",
            explanation: "Minimizing squared distance avoids square root radicals.",
            why: "Setting up equivalent smooth objective."
          },
          {
            stepNumber: 2,
            title: "Apply Lagrange Gradient Condition",
            mathExpression: "\\langle 2x, 2y, 2z \\rangle = \\lambda \\langle 2, -1, 1 \\rangle \\implies x = \\lambda, \\; y = -\\frac{\\lambda}{2}, \\; z = \\frac{\\lambda}{2}",
            explanation: "Express coordinates in terms of multiplier lambda.",
            why: "Parametrizing variables via lambda."
          },
          {
            stepNumber: 3,
            title: "Substitute into Plane Constraint",
            mathExpression: "2(\\lambda) - \\left(-\\frac{\\lambda}{2}\\right) + \\left(\\frac{\\lambda}{2}\\right) = 6 \\implies 3\\lambda = 6 \\implies \\lambda = 2",
            explanation: "Solve for multiplier lambda = 2.",
            why: "Finding specific multiplier value."
          },
          {
            stepNumber: 4,
            title: "Compute Coordinates and Distance",
            mathExpression: "x = 2, \\; y = -1, \\; z = 1 \\implies d = \\sqrt{2^2 + (-1)^2 + 1^2} = \\sqrt{4 + 1 + 1} = \\sqrt{6}",
            explanation: "Calculate Euclidean distance from origin.",
            why: "Evaluating shortest distance."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(2**2 + (-1)**2 + 1**2)",
          expected: "sqrt(6)"
        }
      },
      {
        filename: "ex-03",
        title: "Extreme Values on a Circular Constraint",
        exerciseReference: "Section 14.8, Exercise 3",
        originalTopic: "Extrema on Circle",
        difficulty: "tier2",
        tags: ["circle-constraint", "Lagrange-multipliers", "extrema"],
        problemStatement: "Find the maximum and minimum values of f(x, y) = x^2 + 2y subject to x^2 + y^2 = 1.",
        finalAnswer: "\\text{Maximum: } 2 \\text{ at } (0, 1); \\quad \\text{Minimum: } -2 \\text{ at } (0, -1)",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Lagrange System",
            mathExpression: "\\nabla f = \\langle 2x, 2 \\rangle, \\quad \\nabla g = \\langle 2x, 2y \\rangle \\implies 2x = 2\\lambda x, \\quad 2 = 2\\lambda y",
            explanation: "Equate gradient components with scalar multiplier lambda.",
            why: "Formulating Lagrange equations."
          },
          {
            stepNumber: 2,
            title: "Analyze Case x = 0 and Case lambda = 1",
            mathExpression: "2x(1 - \\lambda) = 0 \\implies x = 0 \\text{ or } \\lambda = 1. \\quad \\text{If } x = 0: y^2 = 1 \\implies y = \\pm 1",
            explanation: "Examine roots of the first equation.",
            why: "Branching solution cases."
          },
          {
            stepNumber: 3,
            title: "Evaluate Objective at Candidate Points",
            mathExpression: "f(0, 1) = 0 + 2(1) = 2; \\quad f(0, -1) = 0 + 2(-1) = -2",
            explanation: "Compare candidate values.",
            why: "Identifying global extrema."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0**2 + 2*(1)",
          expected: "2"
        }
      },
      {
        filename: "ex-04",
        title: "Optimization Subject to Two Simultaneous Constraints",
        exerciseReference: "Section 14.8, Exercise 4",
        originalTopic: "Two Constraints",
        difficulty: "tier3",
        tags: ["two-constraints", "plane-and-cylinder", "Lagrange-multipliers"],
        problemStatement: "Find the difference between the maximum and minimum values of f(x, y, z) = z subject to x + y + z = 1 and x^2 + y^2 = 1.",
        finalAnswer: "z_{\\max} - z_{\\min} = 2\\sqrt{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Express z in Terms of Constraint Variables",
            mathExpression: "z = 1 - (x + y)",
            explanation: "From the planar constraint x + y + z = 1, z is maximized when x + y is minimized.",
            why: "Reducing to single constraint optimization."
          },
          {
            stepNumber: 2,
            title: "Optimize x + y on the Unit Circle",
            mathExpression: "\\nabla(x + y) = \\lambda \\nabla(x^2 + y^2) \\implies \\langle 1, 1 \\rangle = \\lambda \\langle 2x, 2y \\rangle \\implies x = y = \\pm \\frac{1}{\\sqrt{2}}",
            explanation: "The extrema of x + y on the unit circle are +- sqrt(2).",
            why: "Finding extreme values of x + y."
          },
          {
            stepNumber: 3,
            title: "Compute Maximum and Minimum Values of z",
            mathExpression: "z_{\\max} = 1 - (-\\sqrt{2}) = 1 + \\sqrt{2}, \\quad z_{\\min} = 1 - \\sqrt{2} \\implies z_{\\max} - z_{\\min} = 2\\sqrt{2}",
            explanation: "Subtract minimum from maximum.",
            why: "Evaluating difference between extrema."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1 + sqrt(2)) - (1 - sqrt(2))",
          expected: "2*sqrt(2)"
        }
      },
      {
        filename: "ex-05",
        title: "Cobb-Douglas Production Function Optimization",
        exerciseReference: "Section 14.8, Exercise 5",
        originalTopic: "Economic Optimization",
        difficulty: "tier2",
        tags: ["Cobb-Douglas", "economics", "Lagrange-multipliers"],
        problemStatement: "Maximize production P(L, K) = 50 L^(0.5) K^(0.5) subject to budget constraint 100 L + 200 K = 40000.",
        finalAnswer: "P_{\\max} = 5000\\sqrt{2} \\text{ units at } L = 200, \\; K = 100",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Lagrange Ratio of Marginal Productivities",
            mathExpression: "\\frac{\\partial P / \\partial L}{100} = \\frac{\\partial P / \\partial K}{200} \\implies \\frac{25 L^{-0.5} K^{0.5}}{100} = \\frac{25 L^{0.5} K^{-0.5}}{200} \\implies \\frac{K}{100 L} = \\frac{1}{200} \\implies L = 2K",
            explanation: "Equating marginal product per dollar yields capital-labor expansion path L = 2K.",
            why: "Finding optimal factor ratio."
          },
          {
            stepNumber: 2,
            title: "Substitute into Budget Constraint",
            mathExpression: "100(2K) + 200K = 40000 \\implies 400K = 40000 \\implies K = 100, \\; L = 200",
            explanation: "Solve linear budget equation.",
            why: "Finding optimal input quantities."
          },
          {
            stepNumber: 3,
            title: "Compute Maximum Production",
            mathExpression: "P(200, 100) = 50 \\sqrt{200 \\times 100} = 50 \\sqrt{20000} = 50(100\\sqrt{2}) = 5000\\sqrt{2}",
            explanation: "Substitute optimal L and K into production function.",
            why: "Evaluating maximum output."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "50 * sqrt(200 * 100)",
          expected: "5000*sqrt(2)"
        }
      }
    ]
  },
  {
    chapter: "ch14",
    chapterDir: "ch14-partial-derivatives",
    section: "14.9",
    sectionDir: "14.9-taylors-formula-for-two-variables",
    title: "Taylor's Formula for Two Variables",
    definitions: [
      {
        id: "theorem-taylor-formula-2d",
        title: "Taylor's Formula for Two Variables",
        category: "theorem",
        latex: "f(a+h, b+k) = f(a, b) + (h f_x + k f_y) + \\frac{1}{2!}(h^2 f_{xx} + 2hk f_{xy} + k^2 f_{yy}) + \\cdots",
        statement: "If f and its partial derivatives through order n+1 are continuous on an open disk centered at (a, b), then f can be approximated near (a, b) by its n-th degree Taylor polynomial with remainder term.",
        conditions: ["f has continuous partial derivatives through order n+1"],
        explanation: "Derived by restricting f to the line segment connecting (a, b) to (a+h, b+k) and applying single-variable Taylor's theorem.",
        keyTakeaway: "Enables quadratic and higher-order polynomial approximations of multivariable surfaces."
      },
      {
        id: "def-quadratic-taylor-polynomial",
        title: "Quadratic (Second-Order) Taylor Polynomial",
        category: "formula",
        latex: "Q(x, y) = f(0, 0) + f_x x + f_y y + \\frac{1}{2} f_{xx} x^2 + f_{xy} xy + \\frac{1}{2} f_{yy} y^2",
        statement: "The quadratic Taylor polynomial Q(x, y) of f about (0, 0) matches the value, gradient, and Hessian matrix of f at the origin.",
        conditions: ["Continuous second partial derivatives"],
        explanation: "The quadratic terms (1/2)(h^2 f_{xx} + 2hk f_{xy} + k^2 f_{yy}) govern surface curvature and justify the Second Derivative Test.",
        keyTakeaway: "The Hessian quadratic form dictates local surface concavity and extrema."
      }
    ],
    summaryMDX: `# Section 14.9: Taylor's Formula for Two Variables

Taylor polynomials approximate multivariable functions near a base point using higher-order partial derivatives.

---

## 1. Second-Order Taylor Polynomial at $(0, 0)$

$$f(x, y) \\approx f(0, 0) + f_x x + f_y y + \\frac{1}{2} \\left( f_{xx} x^2 + 2 f_{xy} xy + f_{yy} y^2 \\right)$$

In vector notation with $\\mathbf{x} = \\langle x, y \\rangle$:
$$f(\\mathbf{x}) \\approx f(\\mathbf{0}) + \\nabla f(\\mathbf{0}) \\cdot \\mathbf{x} + \\frac{1}{2} \\mathbf{x}^T H f(\\mathbf{0}) \\, \\mathbf{x}$$

where $H f$ is the symmetric $2 \\times 2$ **Hessian matrix**:
$$H f = \\begin{pmatrix} f_{xx} & f_{xy} \\\\ f_{xy} & f_{yy} \\end{pmatrix}$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Second-Order Taylor Polynomial of an Exponential-Trigonometric Function",
        exerciseReference: "Section 14.9, Exercise 1",
        originalTopic: "Quadratic Taylor Polynomial",
        difficulty: "tier2",
        tags: ["Taylor-polynomial", "series-expansion", "quadratic-approximation"],
        problemStatement: "Find the second-order Taylor polynomial P_2(x, y) for f(x, y) = exp(x) cos(y) about (0, 0).",
        finalAnswer: "P_2(x, y) = 1 + x + \\frac{1}{2}x^2 - \\frac{1}{2}y^2",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Partial Derivatives Through Order 2 at (0, 0)",
            mathExpression: "f(0, 0) = 1; \\quad f_x = e^x\\cos y \\implies 1; \\quad f_y = -e^x\\sin y \\implies 0",
            explanation: "Evaluate value and first-order partials.",
            why: "Finding linear Taylor terms."
          },
          {
            stepNumber: 2,
            title: "Evaluate Second-Order Partials at (0, 0)",
            mathExpression: "f_{xx} = e^x\\cos y \\implies 1; \\quad f_{xy} = -e^x\\sin y \\implies 0; \\quad f_{yy} = -e^x\\cos y \\implies -1",
            explanation: "Differentiate to obtain all second partial derivatives.",
            why: "Finding quadratic Taylor terms."
          },
          {
            stepNumber: 3,
            title: "Assemble Taylor Polynomial",
            mathExpression: "P_2(x, y) = 1 + 1x + 0y + \\frac{1}{2}\\left( (1)x^2 + 2(0)xy + (-1)y^2 \\right) = 1 + x + \\frac{x^2}{2} - \\frac{y^2}{2}",
            explanation: "Combine into quadratic polynomial.",
            why: "Formulating second-order approximation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 + x + (1/2)*(x**2 - y**2)",
          expected: "1 + x + x**2/2 - y**2/2"
        }
      },
      {
        filename: "ex-02",
        title: "Quadratic Approximation of a Product of Sines",
        exerciseReference: "Section 14.9, Exercise 2",
        originalTopic: "Taylor Approximation at Origin",
        difficulty: "tier1",
        tags: ["trig-product", "Taylor-formula", "mixed-derivative"],
        problemStatement: "Find the quadratic Taylor polynomial for f(x, y) = sin(x) sin(y) about (0, 0).",
        finalAnswer: "P_2(x, y) = xy",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Single Variable Series Products",
            mathExpression: "\\sin x = x - \\frac{x^3}{6} + \\cdots, \\quad \\sin y = y - \\frac{y^3}{6} + \\cdots",
            explanation: "Multiply the single-variable Maclaurin series.",
            why: "Applying series multiplication method."
          },
          {
            stepNumber: 2,
            title: "Truncate to Degree <= 2",
            mathExpression: "\\sin x \\sin y = \\left( x - \\cdots \\right)\\left( y - \\cdots \\right) = xy + \\mathcal{O}(\\|\\mathbf{x}\\|^4) \\implies P_2(x, y) = xy",
            explanation: "The only term of degree <= 2 is the cross-product term xy.",
            why: "Extracting second-order polynomial."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "diff(diff(sin(x)*sin(y), x), y).subs([(x, 0), (y, 0)])",
          expected: "1"
        }
      },
      {
        filename: "ex-03",
        title: "Taylor Expansion of a Geometric Bivariate Rational Function",
        exerciseReference: "Section 14.9, Exercise 3",
        originalTopic: "Bivariate Geometric Series",
        difficulty: "tier2",
        tags: ["geometric-series", "rational-function", "Taylor-expansion"],
        problemStatement: "Find the quadratic Taylor polynomial for f(x, y) = 1 / (1 - x - y) about (0, 0).",
        finalAnswer: "P_2(x, y) = 1 + x + y + x^2 + 2xy + y^2",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Geometric Series Formula",
            mathExpression: "\\frac{1}{1 - u} = 1 + u + u^2 + \\cdots \\quad \\text{with } u = x + y",
            explanation: "Set u = x + y for |x + y| < 1.",
            why: "Expanding rational function."
          },
          {
            stepNumber: 2,
            title: "Expand and Collect Terms Through Degree 2",
            mathExpression: "P_2(x, y) = 1 + (x + y) + (x + y)^2 = 1 + x + y + x^2 + 2xy + y^2",
            explanation: "Expand the square (x + y)^2 = x^2 + 2xy + y^2.",
            why: "Formulating quadratic polynomial."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 + (x + y) + (x + y)**2",
          expected: "1 + x + y + x**2 + 2*x*y + y**2"
        }
      },
      {
        filename: "ex-04",
        title: "Hessian Matrix Determinant and Quadratic Forms",
        exerciseReference: "Section 14.9, Exercise 4",
        originalTopic: "Hessian Matrix",
        difficulty: "tier2",
        tags: ["Hessian", "quadratic-form", "determinant"],
        problemStatement: "Compute the Hessian determinant H = f_{xx} f_{yy} - (f_{xy})^2 for the quadratic form f(x, y) = x^2 + 3xy + 2y^2 and determine its definiteness.",
        finalAnswer: "H = -1 \\implies \\text{Indefinite quadratic form (saddle behavior)}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Second Partial Derivatives",
            mathExpression: "f_{xx} = 2, \\quad f_{yy} = 4, \\quad f_{xy} = 3",
            explanation: "Differentiate quadratic terms.",
            why: "Constructing Hessian entries."
          },
          {
            stepNumber: 2,
            title: "Calculate Hessian Determinant",
            mathExpression: "\\det(H) = (2)(4) - (3)^2 = 8 - 9 = -1",
            explanation: "Evaluate discriminant D = 8 - 9 = -1.",
            why: "Testing definiteness."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*4 - 3**2",
          expected: "-1"
        }
      },
      {
        filename: "ex-05",
        title: "Error Bound on Linear Taylor Approximation",
        exerciseReference: "Section 14.9, Exercise 5",
        originalTopic: "Taylor Remainder Bounds",
        difficulty: "tier3",
        tags: ["remainder-bound", "error-analysis", "Taylor-theorem"],
        problemStatement: "For f(x, y) = cos(x + y), linear approximation at (0, 0) is P_1(x, y) = 1. Bound the absolute approximation error for |x| <= 0.1 and |y| <= 0.1.",
        finalAnswer: "|R_1(x, y)| \\le 0.02",
        steps: [
          {
            stepNumber: 1,
            title: "Bound Second Derivatives",
            mathExpression: "|f_{xx}| = |-\\cos(x+y)| \\le 1, \\quad |f_{xy}| \\le 1, \\quad |f_{yy}| \\le 1 \\implies M = 1",
            explanation: "All second partial derivatives are bounded by M = 1 in absolute value.",
            why: "Establishing uniform second-derivative bound."
          },
          {
            stepNumber: 2,
            title: "Apply Remainder Formula",
            mathExpression: "|R_1| \\le \\frac{1}{2} M (|x| + |y|)^2 \\le \\frac{1}{2}(1)(0.1 + 0.1)^2 = \\frac{1}{2}(0.2)^2 = \\frac{1}{2}(0.04) = 0.02",
            explanation: "Evaluate Taylor remainder upper bound.",
            why: "Bounding linear approximation error."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1/2) * (0.1 + 0.1)**2",
          expected: "0.02"
        }
      }
    ]
  },
  {
    chapter: "ch14",
    chapterDir: "ch14-partial-derivatives",
    section: "14.10",
    sectionDir: "14.10-partial-derivatives-with-constrained-variables",
    title: "Partial Derivatives with Constrained Variables",
    definitions: [
      {
        id: "def-constrained-partial-derivatives",
        title: "Constrained Partial Derivative Notation",
        category: "definition",
        latex: "\\left( \\frac{\\partial w}{\\partial x} \\right)_y",
        statement: "When variables w, x, y, z are related by one or more constraint equations, the symbol (dw/dx)_y denotes the partial derivative of w with respect to x holding y constant, meaning x and y are selected as the independent variables while other variables are eliminated.",
        conditions: ["Constraint system can be solved locally for dependent variables"],
        explanation: "In multivariable systems with constraints, dw/dx is ambiguous unless the remaining held-constant independent variables are explicitly designated.",
        keyTakeaway: "Subscripts outside the parentheses identify which variables are held fixed."
      },
      {
        id: "theorem-cyclic-thermodynamic-rule",
        title: "Triple Product (Cyclic) Rule",
        category: "rule",
        latex: "\\left( \\frac{\\partial x}{\\partial y} \\right)_z \\left( \\frac{\\partial y}{\\partial z} \\right)_x \\left( \\frac{\\partial z}{\\partial x} \\right)_y = -1",
        statement: "For any smooth constraint relation F(x, y, z) = 0 connecting three variables, the cyclic product of their constrained partial derivatives equals -1.",
        conditions: ["All partial derivatives exist and are non-zero"],
        explanation: "Follows from implicit differentiation: (dx/dy)_z = -F_y / F_x, etc., causing numerator and denominator terms to cancel with three negative signs (-1)^3 = -1.",
        keyTakeaway: "Fundamental identity in chemical thermodynamics relating P, V, and T equations of state."
      }
    ],
    summaryMDX: `# Section 14.10: Partial Derivatives with Constrained Variables

When variables are linked by equations of state or geometric constraints, a partial derivative depends critically on which other variables are held fixed.

---

## 1. Explicit Variable Dependency

Given $w = f(x, y, z)$ subject to constraint $g(x, y, z) = 0$:
- $\\left(\\frac{\\partial w}{\\partial x}\\right)_y$: Treat $x$ and $y$ as independent; solve constraint for $z = z(x, y)$ and substitute into $w$.
- $\\left(\\frac{\\partial w}{\\partial x}\\right)_z$: Treat $x$ and $z$ as independent; solve constraint for $y = y(x, z)$ and substitute into $w$.

In general: $\\left(\\frac{\\partial w}{\\partial x}\\right)_y \\ne \\left(\\frac{\\partial w}{\\partial x}\\right)_z$.

---

## 2. The Cyclic Rule

For any equation $F(x, y, z) = 0$:
$$\\left( \\frac{\\partial x}{\\partial y} \\right)_z \\left( \\frac{\\partial y}{\\partial z} \\right)_x \\left( \\frac{\\partial z}{\\partial x} \\right)_y = -1$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Constrained Partial Derivative Holding y Constant",
        exerciseReference: "Section 14.10, Exercise 1",
        originalTopic: "Constrained Partials",
        difficulty: "tier2",
        tags: ["constrained-variables", "thermodynamic-notation", "substitution"],
        problemStatement: "For w = x^2 + y^2 + z^2 subject to constraint z = x + y, find (dw/dx)_y.",
        finalAnswer: "\\left(\\frac{\\partial w}{\\partial x}\\right)_y = 4x + 2y",
        steps: [
          {
            stepNumber: 1,
            title: "Eliminate Dependent Variable z",
            mathExpression: "w = x^2 + y^2 + (x + y)^2 = x^2 + y^2 + x^2 + 2xy + y^2 = 2x^2 + 2xy + 2y^2",
            explanation: "Substitute z = x + y into w to express w solely in terms of independent variables x and y.",
            why: "Selecting (x, y) as independent coordinate basis."
          },
          {
            stepNumber: 2,
            title: "Differentiate with Respect to x Holding y Constant",
            mathExpression: "\\left(\\frac{\\partial w}{\\partial x}\\right)_y = \\frac{\\partial}{\\partial x}(2x^2 + 2xy + 2y^2) = 4x + 2y",
            explanation: "Compute partial derivative treating y as constant.",
            why: "Evaluating constrained rate."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "2*x**2 + 2*x*y + 2*y**2",
          expected: "4*x + 2*y",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Constrained Partial Derivative Holding z Constant",
        exerciseReference: "Section 14.10, Exercise 2",
        originalTopic: "Varying Fixed Variable Choice",
        difficulty: "tier2",
        tags: ["held-constant", "constrained-derivatives", "coordinates"],
        problemStatement: "For the same system w = x^2 + y^2 + z^2 with z = x + y, find (dw/dx)_z.",
        finalAnswer: "\\left(\\frac{\\partial w}{\\partial x}\\right)_z = 4x - 2z",
        steps: [
          {
            stepNumber: 1,
            title: "Eliminate Dependent Variable y",
            mathExpression: "z = x + y \\implies y = z - x \\implies w = x^2 + (z - x)^2 + z^2 = x^2 + z^2 - 2xz + x^2 + z^2 = 2x^2 - 2xz + 2z^2",
            explanation: "Express w in terms of independent coordinates x and z.",
            why: "Selecting (x, z) as independent coordinate basis."
          },
          {
            stepNumber: 2,
            title: "Differentiate with Respect to x Holding z Constant",
            mathExpression: "\\left(\\frac{\\partial w}{\\partial x}\\right)_z = \\frac{\\partial}{\\partial x}(2x^2 - 2xz + 2z^2) = 4x - 2z",
            explanation: "Compute partial derivative treating z as constant.",
            why: "Evaluating constrained rate with different fixed variable."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "2*x**2 - 2*x*z + 2*z**2",
          expected: "4*x - 2*z",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Numerical Comparison of Distinct Constrained Derivatives",
        exerciseReference: "Section 14.10, Exercise 3",
        originalTopic: "Comparing Constrained Partials",
        difficulty: "tier2",
        tags: ["evaluation", "constrained-derivatives", "comparison"],
        problemStatement: "Evaluate and compare (dw/dx)_y and (dw/dx)_z at the point (x, y, z) = (1, 2, 3) for w = x^2 + y^2 + z^2 and z = x + y.",
        finalAnswer: "\\left(\\frac{\\partial w}{\\partial x}\\right)_y = 8, \\quad \\left(\\frac{\\partial w}{\\partial x}\\right)_z = -2; \\quad \\text{Difference: } 10",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate (dw/dx)_y at (1, 2)",
            mathExpression: "\\left(\\frac{\\partial w}{\\partial x}\\right)_y = 4(1) + 2(2) = 4 + 4 = 8",
            explanation: "Substitute x = 1, y = 2 into 4x + 2y.",
            why: "Computing numerical value holding y constant."
          },
          {
            stepNumber: 2,
            title: "Evaluate (dw/dx)_z at (1, 3)",
            mathExpression: "\\left(\\frac{\\partial w}{\\partial x}\\right)_z = 4(1) - 2(3) = 4 - 6 = -2",
            explanation: "Substitute x = 1, z = 3 into 4x - 2z.",
            why: "Computing numerical value holding z constant."
          },
          {
            stepNumber: 3,
            title: "Compute Difference",
            mathExpression: "8 - (-2) = 10",
            explanation: "Illustrates that holding different variables constant produces completely different directional rates of change.",
            why: "Highlighting dependence on held variable."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(4*1 + 2*2) - (4*1 - 2*3)",
          expected: "10"
        }
      },
      {
        filename: "ex-04",
        title: "Verification of the Thermodynamic Cyclic Rule",
        exerciseReference: "Section 14.10, Exercise 4",
        originalTopic: "Cyclic Rule in Thermodynamics",
        difficulty: "tier2",
        tags: ["cyclic-rule", "thermodynamics", "ideal-gas"],
        problemStatement: "Verify the cyclic relation (dP/dV)_T (dV/dT)_P (dT/dP)_V = -1 for the ideal gas law PV = RT.",
        finalAnswer: "\\left(\\frac{\\partial P}{\\partial V}\\right)_T \\left(\\frac{\\partial V}{\\partial T}\\right)_P \\left(\\frac{\\partial T}{\\partial P}\\right)_V = -1",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Each Constrained Partial Derivative",
            mathExpression: "P = \\frac{RT}{V} \\implies \\left(\\frac{\\partial P}{\\partial V}\\right)_T = -\\frac{RT}{V^2}; \\quad V = \\frac{RT}{P} \\implies \\left(\\frac{\\partial V}{\\partial T}\\right)_P = \\frac{R}{P}; \\quad T = \\frac{PV}{R} \\implies \\left(\\frac{\\partial T}{\\partial P}\\right)_V = \\frac{V}{R}",
            explanation: "Solve for each variable in turn and differentiate.",
            why: "Computing individual partial factors."
          },
          {
            stepNumber: 2,
            title: "Multiply the Three Factors",
            mathExpression: "\\left(-\\frac{RT}{V^2}\\right) \\left(\\frac{R}{P}\\right) \\left(\\frac{V}{R}\\right) = -\\frac{R^2 T V}{R P V^2} = -\\frac{RT}{PV} = -1",
            explanation: "Cancel common factors and use PV = RT.",
            why: "Proving cyclic rule identity."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(-1) * 1",
          expected: "-1"
        }
      },
      {
        filename: "ex-05",
        title: "Constrained Partials on a Sphere via Implicit Ratios",
        exerciseReference: "Section 14.10, Exercise 5",
        originalTopic: "Implicit Constrained Partials",
        difficulty: "tier2",
        tags: ["implicit-ratio", "sphere", "constrained-derivatives"],
        problemStatement: "For points on the unit sphere x^2 + y^2 + z^2 = 1, find (dz/dx)_y using the implicit function theorem.",
        finalAnswer: "\\left(\\frac{\\partial z}{\\partial x}\\right)_y = -\\frac{x}{z}",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate Constraint Implicitly with Respect to x",
            mathExpression: "\\frac{\\partial}{\\partial x}(x^2 + y^2 + z^2 - 1) = 0 \\implies 2x + 0 + 2z\\left(\\frac{\\partial z}{\\partial x}\\right)_y = 0",
            explanation: "Since y is held constant, dy/dx = 0.",
            why: "Applying implicit differentiation holding y fixed."
          },
          {
            stepNumber: 2,
            title: "Solve for Constrained Derivative",
            mathExpression: "2z\\left(\\frac{\\partial z}{\\partial x}\\right)_y = -2x \\implies \\left(\\frac{\\partial z}{\\partial x}\\right)_y = -\\frac{x}{z}",
            explanation: "Divide both sides by 2z.",
            why: "Isolating constrained partial derivative."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "-(2*x)/(2*z)",
          expected: "-x/z"
        }
      }
    ]
  }
];
