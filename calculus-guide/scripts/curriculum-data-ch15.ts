// scripts/curriculum-data-ch15.ts
/**
 * Authoritative Curriculum Data for Chapter 15: Multiple Integrals
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH15_SECTIONS: SectionDef[] = [
  {
    chapter: "ch15",
    chapterDir: "ch15-multiple-integrals",
    section: "15.1",
    sectionDir: "15.1-double-and-iterated-integrals-over-rectangles",
    title: "Double and Iterated Integrals over Rectangles",
    definitions: [
      {
        id: "def-double-integral-rectangle",
        title: "Double Integral over a Rectangle",
        category: "definition",
        latex: "\\iint_R f(x, y) \\, dA = \\lim_{||P|| \\to 0} \\sum_{k=1}^n f(x_k^*, y_k^*) \\Delta A_k",
        statement: "The double integral of a continuous function f over a closed rectangle R = [a, b] x [c, d] is the limit of Riemann sums as the norm of the partition approaches zero. If f(x, y) >= 0, it represents the volume of the solid under the surface z = f(x, y) over R.",
        conditions: ["f is bounded and continuous almost everywhere on R"],
        explanation: "Subdivides R into small rectangular subregions of area Delta A = Delta x Delta y and sums column volumes.",
        keyTakeaway: "Computes signed volumes and accumulated quantities across two-dimensional planar regions."
      },
      {
        id: "theorem-fubini-rectangles",
        title: "Fubini's Theorem (First Form)",
        category: "theorem",
        latex: "\\iint_R f(x, y) \\, dA = \\int_a^b \\int_c^d f(x, y) \\, dy \\, dx = \\int_c^d \\int_a^b f(x, y) \\, dx \\, dy",
        statement: "If f(x, y) is continuous on the rectangle R = [a, b] x [c, d], then the double integral equals the iterated integral in either order of integration.",
        conditions: ["f is continuous on R"],
        explanation: "Reduces a two-dimensional double integral to two successive single-variable definite integrals.",
        keyTakeaway: "Order of integration may be freely interchanged for continuous functions over rectangles."
      }
    ],
    summaryMDX: `# Section 15.1: Double and Iterated Integrals over Rectangles

Double integrals extend single-variable integration to functions of two variables defined on planar regions.

---

## 1. Iterated Integrals and Fubini's Theorem

Over a rectangle $R = [a, b] \\times [c, d]$:
$$\\iint_R f(x, y) \\, dA = \\int_a^b \\left( \\int_c^d f(x, y) \\, dy \\right) dx = \\int_c^d \\left( \\int_a^b f(x, y) \\, dx \\right) dy$$

- **Separable Integrands**: If $f(x, y) = g(x) h(y)$, then:
$$\\iint_R g(x) h(y) \\, dA = \\left( \\int_a^b g(x) \\, dx \\right) \\left( \\int_c^d h(y) \\, dy \\right)$$

---

## 2. Average Value

The average value of $f(x, y)$ over a region $R$ with area $\\text{Area}(R)$ is:
$$\\text{avg}(f) = \\frac{1}{\\text{Area}(R)} \\iint_R f(x, y) \\, dA$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Evaluating an Iterated Double Integral over a Rectangle",
        exerciseReference: "Section 15.1, Exercise 1",
        originalTopic: "Iterated Integrals",
        difficulty: "tier1",
        tags: ["iterated-integral", "Fubini-theorem", "rectangles"],
        problemStatement: "Evaluate the double integral iint_R (4 - x - y) dA over R = [0, 2] x [0, 1].",
        finalAnswer: "5",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Iterated Integral with Respect to y First",
            mathExpression: "\\int_0^2 \\int_0^1 (4 - x - y) \\, dy \\, dx",
            explanation: "Integrate inner variable y from 0 to 1 holding x constant.",
            why: "Setting up Fubini iterated integral."
          },
          {
            stepNumber: 2,
            title: "Evaluate Inner Integral with Respect to y",
            mathExpression: "\\int_0^1 (4 - x - y) \\, dy = \\left[ 4y - xy - \\frac{y^2}{2} \\right]_0^1 = 4 - x - \\frac{1}{2} = \\frac{7}{2} - x",
            explanation: "Compute antiderivative with respect to y and plug in limits 0 and 1.",
            why: "Completing inner integration."
          },
          {
            stepNumber: 3,
            title: "Evaluate Outer Integral with Respect to x",
            mathExpression: "\\int_0^2 \\left( \\frac{7}{2} - x \\right) dx = \\left[ \\frac{7}{2}x - \\frac{x^2}{2} \\right]_0^2 = \\frac{7}{2}(2) - \\frac{4}{2} = 7 - 2 = 5",
            explanation: "Integrate the resulting function of x over [0, 2].",
            why: "Evaluating outer single integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "7*2/2 - 2**2/2",
          expected: "5"
        }
      },
      {
        filename: "ex-02",
        title: "Separable Double Integral Involving Trigonometric Functions",
        exerciseReference: "Section 15.1, Exercise 2",
        originalTopic: "Separable Double Integrals",
        difficulty: "tier1",
        tags: ["separable-integral", "trigonometric", "Fubini"],
        problemStatement: "Evaluate iint_R x sin(y) dA over the rectangle R = [0, pi/2] x [0, pi].",
        finalAnswer: "\\frac{\\pi^2}{4}",
        steps: [
          {
            stepNumber: 1,
            title: "Factor into Product of Single Integrals",
            mathExpression: "\\iint_R x\\sin y \\, dA = \\left( \\int_0^{\\pi/2} x \\, dx \\right) \\left( \\int_0^\\pi \\sin y \\, dy \\right)",
            explanation: "Because limits are constant and integrand factors as g(x)h(y), the integral factors.",
            why: "Using separable integral product property."
          },
          {
            stepNumber: 2,
            title: "Evaluate Each Factor",
            mathExpression: "\\int_0^{\\pi/2} x \\, dx = \\left[ \\frac{x^2}{2} \\right]_0^{\\pi/2} = \\frac{\\pi^2}{8}; \\quad \\int_0^\\pi \\sin y \\, dy = [-\\cos y]_0^\\pi = -(-1) - (-1) = 2",
            explanation: "Compute single variable definite integrals.",
            why: "Evaluating individual factors."
          },
          {
            stepNumber: 3,
            title: "Multiply Results",
            mathExpression: "\\frac{\\pi^2}{8} \\times 2 = \\frac{\\pi^2}{4}",
            explanation: "Multiply the two factor values.",
            why: "Computing final double integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(pi**2 / 8) * 2",
          expected: "pi**2 / 4"
        }
      },
      {
        filename: "ex-03",
        title: "Volume Under a Plane Over a Square",
        exerciseReference: "Section 15.1, Exercise 3",
        originalTopic: "Volume by Double Integration",
        difficulty: "tier1",
        tags: ["volume", "plane", "double-integral"],
        problemStatement: "Find the volume of the solid under the plane z = 4 - x - 2y over the unit square R = [0, 1] x [0, 1].",
        finalAnswer: "\\frac{5}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Volume Double Integral",
            mathExpression: "V = \\int_0^1 \\int_0^1 (4 - x - 2y) \\, dy \\, dx",
            explanation: "The surface z >= 0 on the unit square.",
            why: "Formulating volume integral."
          },
          {
            stepNumber: 2,
            title: "Integrate with Respect to y",
            mathExpression: "\\int_0^1 (4 - x - 2y) \\, dy = [4y - xy - y^2]_0^1 = 4 - x - 1 = 3 - x",
            explanation: "Evaluate inner integral over y.",
            why: "Collapsing y dimension."
          },
          {
            stepNumber: 3,
            title: "Integrate with Respect to x",
            mathExpression: "\\int_0^1 (3 - x) \\, dx = \\left[ 3x - \\frac{x^2}{2} \\right]_0^1 = 3 - \\frac{1}{2} = \\frac{5}{2}",
            explanation: "Evaluate outer integral over x.",
            why: "Evaluating total solid volume."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "3 - 1/2",
          expected: "5/2"
        }
      },
      {
        filename: "ex-04",
        title: "Average Value of a Function over a Rectangle",
        exerciseReference: "Section 15.1, Exercise 4",
        originalTopic: "Average Value",
        difficulty: "tier1",
        tags: ["average-value", "double-integral", "rectangle"],
        problemStatement: "Find the average value of f(x, y) = xy over the rectangle R = [0, 4] x [0, 2].",
        finalAnswer: "\\text{avg}(f) = 2",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Area of Rectangle",
            mathExpression: "\\text{Area}(R) = (4 - 0)(2 - 0) = 8",
            explanation: "Multiply width by height of rectangle.",
            why: "Finding normalizing area factor."
          },
          {
            stepNumber: 2,
            title: "Compute Double Integral of f",
            mathExpression: "\\iint_R xy \\, dA = \\left( \\int_0^4 x \\, dx \\right) \\left( \\int_0^2 y \\, dy \\right) = \\left[ \\frac{x^2}{2} \\right]_0^4 \\left[ \\frac{y^2}{2} \\right]_0^2 = (8)(2) = 16",
            explanation: "Evaluate product of decoupled polynomial integrals.",
            why: "Computing total accumulated volume."
          },
          {
            stepNumber: 3,
            title: "Calculate Average Value",
            mathExpression: "\\text{avg}(f) = \\frac{1}{8} \\times 16 = 2",
            explanation: "Divide double integral by area of region.",
            why: "Evaluating average function height."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "16 / 8",
          expected: "2"
        }
      },
      {
        filename: "ex-05",
        title: "Double Integral of Exponential Function over Logarithmic Limits",
        exerciseReference: "Section 15.1, Exercise 5",
        originalTopic: "Exponential Double Integrals",
        difficulty: "tier1",
        tags: ["exponential", "logarithmic-limits", "Fubini"],
        problemStatement: "Evaluate iint_R exp(x + y) dA over R = [0, ln(2)] x [0, ln(3)].",
        finalAnswer: "2",
        steps: [
          {
            stepNumber: 1,
            title: "Factor Integrand into Single Integrals",
            mathExpression: "\\iint_R e^x e^y \\, dA = \\left( \\int_0^{\\ln 2} e^x \\, dx \\right) \\left( \\int_0^{\\ln 3} e^y \\, dy \\right)",
            explanation: "Use exponential property e^(x+y) = e^x e^y.",
            why: "Separating variables."
          },
          {
            stepNumber: 2,
            title: "Evaluate Each Exponential Factor",
            mathExpression: "\\int_0^{\\ln 2} e^x \\, dx = e^{\\ln 2} - e^0 = 2 - 1 = 1; \\quad \\int_0^{\\ln 3} e^y \\, dy = e^{\\ln 3} - e^0 = 3 - 1 = 2",
            explanation: "Evaluate fundamental exponential integrals.",
            why: "Evaluating single definite integrals."
          },
          {
            stepNumber: 3,
            title: "Multiply Factor Values",
            mathExpression: "(1)(2) = 2",
            explanation: "Multiply the two factor results.",
            why: "Evaluating final integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(2 - 1)*(3 - 1)",
          expected: "2"
        }
      }
    ]
  },
  {
    chapter: "ch15",
    chapterDir: "ch15-multiple-integrals",
    section: "15.2",
    sectionDir: "15.2-double-integrals-over-general-regions",
    title: "Double Integrals over General Regions",
    definitions: [
      {
        id: "def-general-regions-types",
        title: "Type I and Type II Regions",
        category: "definition",
        latex: "D_I = \\{(x, y) \\mid a \\le x \\le b, \\; g_1(x) \\le y \\le g_2(x)\\}, \\quad D_{II} = \\{(x, y) \\mid c \\le y \\le d, \\; h_1(y) \\le x \\le h_2(y)\\}",
        statement: "A Type I region is bounded on the left and right by vertical lines x = a and x = b, and on bottom and top by continuous curves y = g_1(x) and y = g_2(x). A Type II region has horizontal bounding lines and x varying between curves of y.",
        conditions: ["Bounding functions are continuous"],
        explanation: "Type I uses vertical slices (dy dx order); Type II uses horizontal slices (dx dy order).",
        keyTakeaway: "Choosing the correct region type simplifies integration limits and avoids intractable antiderivatives."
      },
      {
        id: "theorem-reversing-order",
        title: "Reversing the Order of Integration",
        category: "theorem",
        latex: "\\int_a^b \\int_{g_1(x)}^{g_2(x)} f(x, y) \\, dy \\, dx = \\int_c^d \\int_{h_1(y)}^{h_2(y)} f(x, y) \\, dx \\, dy",
        statement: "Reversing the order of integration transforms an iterated integral by describing the same geometric region from the complementary coordinate perspective, frequently enabling integration of non-elementary single variable forms.",
        conditions: ["Region D can be described in both Type I and Type II formats"],
        explanation: "Crucial technique when the inner integrand cannot be integrated in elementary functions (such as e^(x^2) or sin(x^2)).",
        keyTakeaway: "Sketching the 2D domain is essential when transposing integration limits."
      }
    ],
    summaryMDX: `# Section 15.2: Double Integrals over General Regions

Integration extends to arbitrary bounded regions in the plane by decomposing boundaries into functional curves.

---

## 1. Type I vs. Type II Regions

- **Type I (Vertical Cross-Sections)**:
$$\\iint_D f(x, y) \\, dA = \\int_a^b \\left( \\int_{g_1(x)}^{g_2(x)} f(x, y) \\, dy \\right) dx$$

- **Type II (Horizontal Cross-Sections)**:
$$\\iint_D f(x, y) \\, dA = \\int_c^d \\left( \\int_{h_1(y)}^{h_2(y)} f(x, y) \\, dx \\right) dy$$

---

## 2. Reversing Order Strategy

When an inner integral has no elementary antiderivative (e.g., $\\int \\sin(x^2) dx$):
1. Sketch the region $D$ from the given limits.
2. Express $D$ in the reverse order.
3. Compute the new iterated integral.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Double Integral over Region Bounded by a Parabola and Square Root",
        exerciseReference: "Section 15.2, Exercise 1",
        originalTopic: "Type I Region Integration",
        difficulty: "tier2",
        tags: ["Type-I-region", "general-regions", "polynomial-integral"],
        problemStatement: "Evaluate iint_D (x + 2y) dA where D is bounded by y = x^2 and y = sqrt(x).",
        finalAnswer: "\\frac{9}{20}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Intersection Points of Bounding Curves",
            mathExpression: "x^2 = \\sqrt{x} \\implies x^4 = x \\implies x(x^3 - 1) = 0 \\implies x = 0, \\; x = 1",
            explanation: "The curves intersect at (0, 0) and (1, 1). On [0, 1], sqrt(x) >= x^2.",
            why: "Determining domain boundary limits."
          },
          {
            stepNumber: 2,
            title: "Set Up Type I Iterated Integral",
            mathExpression: "\\int_0^1 \\int_{x^2}^{\\sqrt{x}} (x + 2y) \\, dy \\, dx",
            explanation: "Inner limits are y = x^2 to y = sqrt(x); outer limits are x = 0 to 1.",
            why: "Formulating iterated integral."
          },
          {
            stepNumber: 3,
            title: "Evaluate Inner Integral with Respect to y",
            mathExpression: "\\left[ xy + y^2 \\right]_{x^2}^{\\sqrt{x}} = (x\\sqrt{x} + x) - (x(x^2) + x^4) = x^{3/2} + x - x^3 - x^4",
            explanation: "Evaluate antiderivative at upper and lower boundaries.",
            why: "Performing inner integration."
          },
          {
            stepNumber: 4,
            title: "Evaluate Outer Integral with Respect to x",
            mathExpression: "\\int_0^1 (x^{3/2} + x - x^3 - x^4) \\, dx = \\left[ \\frac{2}{5}x^{5/2} + \\frac{x^2}{2} - \\frac{x^4}{4} - \\frac{x^5}{5} \\right]_0^1 = \\frac{2}{5} + \\frac{1}{2} - \\frac{1}{4} - \\frac{1}{5} = \\frac{1}{5} + \\frac{1}{4} = \\frac{9}{20}",
            explanation: "Integrate each power term over [0, 1].",
            why: "Evaluating final area-weighted integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2/5 + 1/2 - 1/4 - 1/5",
          expected: "9/20"
        }
      },
      {
        filename: "ex-02",
        title: "Reversing Order of Integration for a Non-Elementary Function",
        exerciseReference: "Section 15.2, Exercise 2",
        originalTopic: "Reversing Order of Integration",
        difficulty: "tier2",
        tags: ["reversing-order", "non-elementary", "sine-integral"],
        problemStatement: "Evaluate int_0^1 int_y^1 sin(x^2) dx dy by reversing the order of integration.",
        finalAnswer: "\\frac{1 - \\cos(1)}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Identify and Sketch Region of Integration",
            mathExpression: "D = \\{(x, y) \\mid 0 \\le y \\le 1, \\; y \\le x \\le 1\\} = \\{(x, y) \\mid 0 \\le x \\le 1, \\; 0 \\le y \\le x\\}",
            explanation: "The region is a triangle bounded by y = 0, x = 1, and the diagonal line y = x.",
            why: "Translating Type II limits into Type I form."
          },
          {
            stepNumber: 2,
            title: "Set Up Reversed Iterated Integral",
            mathExpression: "\\int_0^1 \\int_0^x \\sin(x^2) \\, dy \\, dx",
            explanation: "Integrate over y first from 0 to x.",
            why: "Eliminating intractable single-variable antiderivative."
          },
          {
            stepNumber: 3,
            title: "Evaluate Inner Integral",
            mathExpression: "\\int_0^x \\sin(x^2) \\, dy = [y\\sin(x^2)]_0^x = x\\sin(x^2)",
            explanation: "Since sin(x^2) is constant with respect to y, the inner integral produces factor x.",
            why: "Generating the required derivative factor x."
          },
          {
            stepNumber: 4,
            title: "Evaluate Outer Integral via Substitution",
            mathExpression: "\\int_0^1 x\\sin(x^2) \\, dx = \\left[ -\\frac{1}{2}\\cos(x^2) \\right]_0^1 = -\\frac{1}{2}\\cos(1) - \\left(-\\frac{1}{2}\\right) = \\frac{1 - \\cos(1)}{2}",
            explanation: "Use substitution u = x^2, du = 2x dx.",
            why: "Evaluating outer integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1 - cos(1)) / 2",
          expected: "(1 - cos(1))/2"
        }
      },
      {
        filename: "ex-03",
        title: "Volume Under a Paraboloid over a General Region",
        exerciseReference: "Section 15.2, Exercise 3",
        originalTopic: "Volume under Surface",
        difficulty: "tier2",
        tags: ["volume", "paraboloid", "general-region"],
        problemStatement: "Find the volume under z = x^2 + y^2 over the region between y = 2x and y = x^2.",
        finalAnswer: "\\frac{216}{35}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Intersection Points",
            mathExpression: "x^2 = 2x \\implies x(x - 2) = 0 \\implies x = 0, \\; x = 2",
            explanation: "The curves intersect at (0, 0) and (2, 4). On [0, 2], 2x >= x^2.",
            why: "Determining x-interval."
          },
          {
            stepNumber: 2,
            title: "Integrate with Respect to y",
            mathExpression: "\\int_{x^2}^{2x} (x^2 + y^2) \\, dy = \\left[ x^2 y + \\frac{y^3}{3} \\right]_{x^2}^{2x} = \\left( 2x^3 + \\frac{8x^3}{3} \\right) - \\left( x^4 + \\frac{x^6}{3} \\right) = \\frac{14}{3}x^3 - x^4 - \\frac{1}{3}x^6",
            explanation: "Evaluate inner antiderivative between parabola and line.",
            why: "Evaluating inner integral."
          },
          {
            stepNumber: 3,
            title: "Integrate with Respect to x",
            mathExpression: "\\int_0^2 \\left( \\frac{14}{3}x^3 - x^4 - \\frac{1}{3}x^6 \\right) dx = \\left[ \\frac{7}{6}x^4 - \\frac{x^5}{5} - \\frac{x^7}{21} \\right]_0^2 = \\frac{112}{6} - \\frac{32}{5} - \\frac{128}{21} = \\frac{56}{3} - \\frac{32}{5} - \\frac{128}{21} = \\frac{216}{35}",
            explanation: "Evaluate definite polynomial integral at 2.",
            why: "Computing final volume."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "88/7 - 32/5",
          expected: "216/35"
        }
      },
      {
        filename: "ex-04",
        title: "Double Integral over a Triangular Domain",
        exerciseReference: "Section 15.2, Exercise 4",
        originalTopic: "Triangular Region Integration",
        difficulty: "tier1",
        tags: ["triangle", "double-integral", "Type-I"],
        problemStatement: "Evaluate iint_T xy dA where T is the triangle with vertices (0, 0), (1, 0), and (1, 2).",
        finalAnswer: "\\frac{1}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Define Region Boundaries",
            mathExpression: "T = \\{(x, y) \\mid 0 \\le x \\le 1, \\; 0 \\le y \\le 2x\\}",
            explanation: "The hypotenuse connects (0, 0) to (1, 2) with equation y = 2x.",
            why: "Formulating triangle limits."
          },
          {
            stepNumber: 2,
            title: "Evaluate Iterated Integral",
            mathExpression: "\\int_0^1 \\int_0^{2x} xy \\, dy \\, dx = \\int_0^1 x \\left[ \\frac{y^2}{2} \\right]_0^{2x} dx = \\int_0^1 x \\left( \\frac{4x^2}{2} \\right) dx = \\int_0^1 2x^3 \\, dx = \\left[ \\frac{x^4}{2} \\right]_0^1 = \\frac{1}{2}",
            explanation: "Perform inner y-integration then outer x-integration.",
            why: "Computing double integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2/4",
          expected: "1/2"
        }
      },
      {
        filename: "ex-05",
        title: "Reversing Order for a Rational Denominator",
        exerciseReference: "Section 15.2, Exercise 5",
        originalTopic: "Reversing Order with Rational Functions",
        difficulty: "tier2",
        tags: ["reversing-order", "substitution", "logarithmic-integral"],
        problemStatement: "Evaluate int_0^4 int_{sqrt(x)}^2 1 / (y^3 + 1) dy dx by reversing the order of integration.",
        finalAnswer: "\\frac{2}{3}\\ln(3)",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Region and Reverse Limits",
            mathExpression: "0 \\le x \\le 4, \\; \\sqrt{x} \\le y \\le 2 \\iff 0 \\le y \\le 2, \\; 0 \\le x \\le y^2",
            explanation: "The curve y = sqrt(x) translates to x = y^2.",
            why: "Converting to Type II description."
          },
          {
            stepNumber: 2,
            title: "Evaluate Inner Integral with Respect to x",
            mathExpression: "\\int_0^{y^2} \\frac{1}{y^3 + 1} \\, dx = \\frac{y^2}{y^3 + 1}",
            explanation: "The integrand is constant with respect to x.",
            why: "Generating y^2 in the numerator."
          },
          {
            stepNumber: 3,
            title: "Evaluate Outer Integral with Respect to y",
            mathExpression: "\\int_0^2 \\frac{y^2}{y^3 + 1} \\, dy = \\left[ \\frac{1}{3}\\ln(y^3 + 1) \\right]_0^2 = \\frac{1}{3}\\ln(8 + 1) - 0 = \\frac{1}{3}\\ln(9) = \\frac{2}{3}\\ln(3)",
            explanation: "Use substitution u = y^3 + 1, du = 3y^2 dy.",
            why: "Evaluating logarithmic integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1/3)*log(9)",
          expected: "(2/3)*log(3)"
        }
      }
    ]
  },
  {
    chapter: "ch15",
    chapterDir: "ch15-multiple-integrals",
    section: "15.3",
    sectionDir: "15.3-area-by-double-integration",
    title: "Area by Double Integration",
    definitions: [
      {
        id: "def-area-double-integral",
        title: "Area of a Planar Region via Double Integration",
        category: "definition",
        latex: "\\text{Area}(R) = \\iint_R 1 \\, dA = \\iint_R dx \\, dy",
        statement: "The area of a closed, bounded plane region R is the double integral of the constant function f(x, y) = 1 over R.",
        conditions: ["R is a Jordan-measurable bounded region in R^2"],
        explanation: "Setting height z = 1 produces a solid cylinder whose numerical volume equals the numerical area of the base.",
        keyTakeaway: "Unifies single-variable area formulas into a single conceptual framework."
      },
      {
        id: "formula-average-value-general",
        title: "Average Value over General Planar Regions",
        category: "formula",
        latex: "\\bar{f} = \\frac{1}{\\text{Area}(R)} \\iint_R f(x, y) \\, dA",
        statement: "The mean or average value of a continuous function f over region R is the ratio of its total double integral to the area of R.",
        conditions: ["Area(R) > 0"],
        explanation: "Represents the constant uniform height of a prism over R that has the identical volume as the solid under z = f(x, y).",
        keyTakeaway: "Computes spatial averages across non-rectangular geometric domains."
      }
    ],
    summaryMDX: `# Section 15.3: Area by Double Integration

Double integrals compute geometric areas by integrating the constant unit function $f(x, y) = 1$.

---

## 1. Planar Area

$$\\text{Area}(R) = \\iint_R dA$$

- **Vertical Slices (Type I)**: $\\text{Area} = \\int_a^b \\left( g_2(x) - g_1(x) \\right) dx$
- **Horizontal Slices (Type II)**: $\\text{Area} = \\int_c^d \\left( h_2(y) - h_1(y) \\right) dy$

---

## 2. Average Value

$$\\text{avg}(f) = \\frac{\\iint_R f(x, y) \\, dA}{\\iint_R 1 \\, dA}$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Area Enclosed Between Two Parabolas",
        exerciseReference: "Section 15.3, Exercise 1",
        originalTopic: "Area Between Curves",
        difficulty: "tier1",
        tags: ["area", "parabolas", "double-integral"],
        problemStatement: "Find the area of the region enclosed by y = x^2 and y = 2x - x^2 using double integration.",
        finalAnswer: "\\frac{1}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Intersection Points",
            mathExpression: "x^2 = 2x - x^2 \\implies 2x^2 - 2x = 0 \\implies 2x(x - 1) = 0 \\implies x = 0, \\; x = 1",
            explanation: "The curves intersect at x = 0 and x = 1.",
            why: "Finding outer limits of integration."
          },
          {
            stepNumber: 2,
            title: "Set Up Area Integral",
            mathExpression: "\\text{Area} = \\int_0^1 \\int_{x^2}^{2x - x^2} 1 \\, dy \\, dx = \\int_0^1 (2x - 2x^2) \\, dx",
            explanation: "Integrate 1 with respect to y from lower parabola to upper parabola.",
            why: "Formulating area integral."
          },
          {
            stepNumber: 3,
            title: "Evaluate Definite Integral",
            mathExpression: "\\left[ x^2 - \\frac{2x^3}{3} \\right]_0^1 = 1 - \\frac{2}{3} = \\frac{1}{3}",
            explanation: "Evaluate polynomial antiderivative at limits.",
            why: "Evaluating enclosed area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 - 2/3",
          expected: "1/3"
        }
      },
      {
        filename: "ex-02",
        title: "Area Between Sine and Cosine Curves",
        exerciseReference: "Section 15.3, Exercise 2",
        originalTopic: "Trigonometric Area",
        difficulty: "tier1",
        tags: ["trigonometric", "area", "sine-cosine"],
        problemStatement: "Find the area of the region bounded by y = sin(x) and y = cos(x) from x = pi/4 to x = 5*pi/4.",
        finalAnswer: "2\\sqrt{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Area Double Integral",
            mathExpression: "\\text{Area} = \\int_{\\pi/4}^{5\\pi/4} \\int_{\\cos x}^{\\sin x} 1 \\, dy \\, dx = \\int_{\\pi/4}^{5\\pi/4} (\\sin x - \\cos x) \\, dx",
            explanation: "On [pi/4, 5*pi/4], sin(x) >= cos(x).",
            why: "Setting up area between trigonometric curves."
          },
          {
            stepNumber: 2,
            title: "Integrate Trigonometric Functions",
            mathExpression: "[-\\cos x - \\sin x]_{\\pi/4}^{5\\pi/4} = \\left( -(-\\sqrt{2}/2) - (-\\sqrt{2}/2) \\right) - \\left( -\\sqrt{2}/2 - \\sqrt{2}/2 \\right) = \\sqrt{2} - (-\\sqrt{2}) = 2\\sqrt{2}",
            explanation: "Evaluate trigonometric antiderivatives at 5*pi/4 and pi/4.",
            why: "Computing trigonometric area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(2) + sqrt(2)",
          expected: "2*sqrt(2)"
        }
      },
      {
        filename: "ex-03",
        title: "Area Computed by Horizontal Slices (Type II)",
        exerciseReference: "Section 15.3, Exercise 3",
        originalTopic: "Type II Area",
        difficulty: "tier1",
        tags: ["Type-II", "horizontal-slices", "area"],
        problemStatement: "Compute the area of the region bounded by x = y^2 and x = 4 in the right half-plane using horizontal slices.",
        finalAnswer: "\\frac{16}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Determine Limits on y for Upper Half",
            mathExpression: "y^2 = 4 \\implies y = 2 \\quad (\\text{for } y \\ge 0)",
            explanation: "For the region where 0 <= y <= 2, x varies from y^2 to 4.",
            why: "Establishing horizontal strip limits."
          },
          {
            stepNumber: 2,
            title: "Set Up and Evaluate Iterated Integral",
            mathExpression: "\\int_0^2 \\int_{y^2}^4 1 \\, dx \\, dy = \\int_0^2 (4 - y^2) \\, dy = \\left[ 4y - \\frac{y^3}{3} \\right]_0^2 = 8 - \\frac{8}{3} = \\frac{16}{3}",
            explanation: "Integrate with respect to x first, then y.",
            why: "Computing area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "8 - 8/3",
          expected: "16/3"
        }
      },
      {
        filename: "ex-04",
        title: "Average Height of a Bilinear Surface",
        exerciseReference: "Section 15.3, Exercise 4",
        originalTopic: "Average Value Calculation",
        difficulty: "tier1",
        tags: ["average-value", "bilinear", "unit-square"],
        problemStatement: "Compute the average height of the surface z = xy over the unit square [0, 1] x [0, 1].",
        finalAnswer: "\\frac{1}{4}",
        steps: [
          {
            stepNumber: 1,
            title: "Calculate Area and Double Integral",
            mathExpression: "\\text{Area}(R) = 1; \\quad \\iint_R xy \\, dA = \\left(\\int_0^1 x \\, dx\\right)\\left(\\int_0^1 y \\, dy\\right) = \\left(\\frac{1}{2}\\right)\\left(\\frac{1}{2}\\right) = \\frac{1}{4}",
            explanation: "Evaluate the double integral over the unit square.",
            why: "Finding integral of function."
          },
          {
            stepNumber: 2,
            title: "Compute Average Height",
            mathExpression: "\\bar{z} = \\frac{1}{1} \\left(\\frac{1}{4}\\right) = \\frac{1}{4}",
            explanation: "Divide the integral by the unit area.",
            why: "Evaluating average value."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1/2)*(1/2)",
          expected: "1/4"
        }
      },
      {
        filename: "ex-05",
        title: "Area of First-Quadrant Region Between a Line and a Cubic",
        exerciseReference: "Section 15.3, Exercise 5",
        originalTopic: "Area Between Polynomial Curves",
        difficulty: "tier1",
        tags: ["polynomial-area", "first-quadrant", "double-integral"],
        problemStatement: "Find the area in the first quadrant enclosed between the line y = x and the cubic y = x^3.",
        finalAnswer: "\\frac{1}{4}",
        steps: [
          {
            stepNumber: 1,
            title: "Determine Limits of Integration",
            mathExpression: "x^3 = x \\implies x(x^2 - 1) = 0 \\implies x = 0, \\; x = 1",
            explanation: "On [0, 1], the line y = x lies above the cubic y = x^3.",
            why: "Finding integration limits."
          },
          {
            stepNumber: 2,
            title: "Evaluate Area Integral",
            mathExpression: "\\text{Area} = \\int_0^1 \\int_{x^3}^x 1 \\, dy \\, dx = \\int_0^1 (x - x^3) \\, dx = \\left[ \\frac{x^2}{2} - \\frac{x^4}{4} \\right]_0^1 = \\frac{1}{2} - \\frac{1}{4} = \\frac{1}{4}",
            explanation: "Integrate the difference of heights.",
            why: "Evaluating area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1/2 - 1/4",
          expected: "1/4"
        }
      }
    ]
  },
  {
    chapter: "ch15",
    chapterDir: "ch15-multiple-integrals",
    section: "15.4",
    sectionDir: "15.4-double-integrals-in-polar-form",
    title: "Double Integrals in Polar Form",
    definitions: [
      {
        id: "def-polar-double-integral",
        title: "Double Integral in Polar Coordinates",
        category: "definition",
        latex: "\\iint_R f(x, y) \\, dA = \\int_\\alpha^\\beta \\int_{r_1(\\theta)}^{r_2(\\theta)} f(r\\cos\\theta, r\\sin\\theta) \\, r \\, dr \\, d\\theta",
        statement: "In polar coordinates, the differential area element is dA = r dr dtheta. The extra factor of r represents the Jacobian determinant of the transformation x = r cos(theta), y = r sin(theta).",
        conditions: ["r >= 0", "beta - alpha <= 2*pi"],
        explanation: "A polar rectangle has radial length dr and arc length r dtheta, giving area r dr dtheta.",
        keyTakeaway: "Always include the radial factor r in the polar area element: dA = r dr dtheta."
      },
      {
        id: "formula-gaussian-integral-polar",
        title: "Gaussian Integral via Polar Double Integration",
        category: "formula",
        latex: "\\int_{-\\infty}^\\infty e^{-x^2} \\, dx = \\sqrt{\\pi}",
        statement: "Squaring the single-variable improper integral and converting to polar coordinates over the entire plane transforms the intractable integrand e^(-x^2) into the easily integrable form r e^(-r^2).",
        conditions: ["Integration over entire R^2 plane"],
        explanation: "Produces I^2 = int_0^(2pi) int_0^oo e^(-r^2) r dr dtheta = pi, yielding I = sqrt(pi).",
        keyTakeaway: "Classic demonstration of simplifying higher-dimensional integrals via polar symmetry."
      }
    ],
    summaryMDX: `# Section 15.4: Double Integrals in Polar Form

Circular, disk, and angular sector domains are most effectively integrated using polar coordinates.

---

## 1. Area Element $dA = r \\, dr \\, d\\theta$

When transforming to polar coordinates:
$$x = r\\cos\\theta, \\quad y = r\\sin\\theta, \\quad x^2 + y^2 = r^2$$
$$\\iint_R f(x, y) \\, dA = \\iint_R f(r\\cos\\theta, r\\sin\\theta) \\, r \\, dr \\, d\\theta$$

---

## 2. Polar Area Formula

$$\\text{Area}(R) = \\iint_R r \\, dr \\, d\\theta = \\frac{1}{2} \\int_\\alpha^\\beta r(\\theta)^2 \\, d\\theta$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Double Integral of x^2 + y^2 over a Circular Disk",
        exerciseReference: "Section 15.4, Exercise 1",
        originalTopic: "Polar Disk Integration",
        difficulty: "tier1",
        tags: ["polar-integral", "circular-disk", "Jacobian-r"],
        problemStatement: "Evaluate iint_D (x^2 + y^2) dA where D is the circular disk x^2 + y^2 <= 4.",
        finalAnswer: "8\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Convert Integrand and Region to Polar Coordinates",
            mathExpression: "x^2 + y^2 = r^2, \\quad dA = r \\, dr \\, d\\theta; \\quad 0 \\le r \\le 2, \\; 0 \\le \\theta \\le 2\\pi",
            explanation: "Substitute r^2 for x^2 + y^2 and include factor r in area element.",
            why: "Formulating polar integral."
          },
          {
            stepNumber: 2,
            title: "Set Up and Separate Iterated Integrals",
            mathExpression: "\\int_0^{2\\pi} d\\theta \\int_0^2 r^2 \\cdot r \\, dr = (2\\pi) \\int_0^2 r^3 \\, dr = 2\\pi \\left[ \\frac{r^4}{4} \\right]_0^2 = 2\\pi \\left( \\frac{16}{4} \\right) = 8\\pi",
            explanation: "Integrate r^3 over [0, 2] and multiply by 2*pi.",
            why: "Evaluating separated polar integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 * pi * 4",
          expected: "8*pi"
        }
      },
      {
        filename: "ex-02",
        title: "Evaluating the Gaussian First-Quadrant Integral",
        exerciseReference: "Section 15.4, Exercise 2",
        originalTopic: "Gaussian Integral",
        difficulty: "tier2",
        tags: ["Gaussian-integral", "improper-integral", "polar-conversion"],
        problemStatement: "Compute the value of iint_Q exp(-(x^2 + y^2)) dA where Q is the first quadrant.",
        finalAnswer: "\\frac{\\pi}{4}",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate in Polar Coordinates",
            mathExpression: "\\int_0^{\\pi/2} \\int_0^\\infty e^{-r^2} r \\, dr \\, d\\theta",
            explanation: "In the first quadrant, theta varies from 0 to pi/2, and r from 0 to infinity.",
            why: "Converting first-quadrant integral to polar."
          },
          {
            stepNumber: 2,
            title: "Evaluate Radial Improper Integral",
            mathExpression: "\\int_0^\\infty e^{-r^2} r \\, dr = \\lim_{b \\to \\infty} \\left[ -\\frac{1}{2} e^{-r^2} \\right]_0^b = 0 - \\left(-\\frac{1}{2}\\right) = \\frac{1}{2}",
            explanation: "Use substitution u = -r^2, du = -2r dr.",
            why: "Computing radial integral."
          },
          {
            stepNumber: 3,
            title: "Multiply by Angular Integral",
            mathExpression: "\\left( \\frac{\\pi}{2} \\right) \\left( \\frac{1}{2} \\right) = \\frac{\\pi}{4}",
            explanation: "Multiply by angular measure pi/2.",
            why: "Evaluating quadrant integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(pi / 2) * (1 / 2)",
          expected: "pi / 4"
        }
      },
      {
        filename: "ex-03",
        title: "Volume Under an Inverted Paraboloid Above the xy-Plane",
        exerciseReference: "Section 15.4, Exercise 3",
        originalTopic: "Volume via Polar Coordinates",
        difficulty: "tier1",
        tags: ["volume", "paraboloid", "polar-coordinates"],
        problemStatement: "Find the volume of the solid under the paraboloid z = 9 - x^2 - y^2 above the xy-plane.",
        finalAnswer: "\\frac{81\\pi}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Determine Boundary of Base Region in xy-Plane",
            mathExpression: "z = 0 \\implies 9 - x^2 - y^2 = 0 \\implies x^2 + y^2 = 9 \\implies r = 3",
            explanation: "The base is a circle of radius 3 centered at the origin.",
            why: "Finding radial integration bounds."
          },
          {
            stepNumber: 2,
            title: "Set Up Polar Volume Integral",
            mathExpression: "V = \\int_0^{2\\pi} \\int_0^3 (9 - r^2) r \\, dr \\, d\\theta = 2\\pi \\int_0^3 (9r - r^3) \\, dr",
            explanation: "Multiply integrand (9 - r^2) by Jacobian factor r.",
            why: "Formulating volume integral."
          },
          {
            stepNumber: 3,
            title: "Evaluate Definite Radial Integral",
            mathExpression: "2\\pi \\left[ \\frac{9r^2}{2} - \\frac{r^4}{4} \\right]_0^3 = 2\\pi \\left( \\frac{81}{2} - \\frac{81}{4} \\right) = 2\\pi \\left( \\frac{81}{4} \\right) = \\frac{81\\pi}{2}",
            explanation: "Evaluate polynomial antiderivative at r = 3.",
            why: "Computing total volume."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 * pi * (81 / 4)",
          expected: "81*pi / 2"
        }
      },
      {
        filename: "ex-04",
        title: "Area of One Petal of a Four-Petaled Rose",
        exerciseReference: "Section 15.4, Exercise 4",
        originalTopic: "Polar Curve Area",
        difficulty: "tier2",
        tags: ["rose-petal", "polar-area", "half-angle-identity"],
        problemStatement: "Find the area of one petal of the four-petaled rose r = cos(2*theta).",
        finalAnswer: "\\frac{\\pi}{8}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Angular Limits for One Petal",
            mathExpression: "\\cos(2\\theta) = 0 \\implies 2\\theta = \\pm \\frac{\\pi}{2} \\implies \\theta = -\\frac{\\pi}{4} \\quad \\text{to} \\quad \\theta = \\frac{\\pi}{4}",
            explanation: "The petal centered on the positive x-axis starts and ends where r = 0.",
            why: "Finding angular bounds for single loop."
          },
          {
            stepNumber: 2,
            title: "Set Up and Integrate",
            mathExpression: "\\text{Area} = \\int_{-\\pi/4}^{\\pi/4} \\int_0^{\\cos(2\\theta)} r \\, dr \\, d\\theta = \\frac{1}{2}\\int_{-\\pi/4}^{\\pi/4} \\cos^2(2\\theta) \\, d\\theta",
            explanation: "Evaluate inner r-integral to get (1/2) r^2.",
            why: "Setting up single angular integral."
          },
          {
            stepNumber: 3,
            title: "Apply Half-Angle Identity",
            mathExpression: "\\frac{1}{4}\\int_{-\\pi/4}^{\\pi/4} (1 + \\cos 4\\theta) \\, d\\theta = \\frac{1}{4}\\left[ \\theta + \\frac{\\sin 4\\theta}{4} \\right]_{-\\pi/4}^{\\pi/4} = \\frac{1}{4}\\left( \\frac{\\pi}{2} \\right) = \\frac{\\pi}{8}",
            explanation: "Integrate using cos^2(2theta) = (1 + cos(4theta))/2.",
            why: "Computing petal area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1/4) * (pi/2)",
          expected: "pi/8"
        }
      },
      {
        filename: "ex-05",
        title: "Integration over an Off-Center Circle",
        exerciseReference: "Section 15.4, Exercise 5",
        originalTopic: "Off-Center Circular Region",
        difficulty: "tier2",
        tags: ["off-center-circle", "polar-integral", "cosine-powers"],
        problemStatement: "Evaluate iint_R x dA where R is the disk bounded by x^2 + y^2 = 2x.",
        finalAnswer: "\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Convert Boundary Equation to Polar Coordinates",
            mathExpression: "r^2 = 2r\\cos\\theta \\implies r = 2\\cos\\theta \\quad \\text{for } -\\frac{\\pi}{2} \\le \\theta \\le \\frac{\\pi}{2}",
            explanation: "Substitute x^2 + y^2 = r^2 and x = r cos(theta).",
            why: "Determining polar boundary function."
          },
          {
            stepNumber: 2,
            title: "Set Up Iterated Integral",
            mathExpression: "\\int_{-\\pi/2}^{\\pi/2} \\int_0^{2\\cos\\theta} (r\\cos\\theta) r \\, dr \\, d\\theta = \\int_{-\\pi/2}^{\\pi/2} \\cos\\theta \\left[ \\frac{r^3}{3} \\right]_0^{2\\cos\\theta} d\\theta = \\frac{8}{3}\\int_{-\\pi/2}^{\\pi/2} \\cos^4\\theta \\, d\\theta",
            explanation: "Integrate r^2 with respect to r.",
            why: "Evaluating radial component."
          },
          {
            stepNumber: 3,
            title: "Evaluate Fourth-Power Cosine Integral",
            mathExpression: "\\frac{8}{3} \\times 2 \\left( \\frac{3\\pi}{16} \\right) = \\frac{16}{3} \\left( \\frac{3\\pi}{16} \\right) = \\pi",
            explanation: "Use standard Wallis formula int_0^(pi/2) cos^4(theta) dtheta = 3pi/16.",
            why: "Evaluating final integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(8/3) * 2 * (3*pi/16)",
          expected: "pi"
        }
      }
    ]
  },
  {
    chapter: "ch15",
    chapterDir: "ch15-multiple-integrals",
    section: "15.5",
    sectionDir: "15.5-triple-integrals-in-rectangular-coordinates",
    title: "Triple Integrals in Rectangular Coordinates",
    definitions: [
      {
        id: "def-triple-integral",
        title: "Triple Integral in Cartesian Coordinates",
        category: "definition",
        latex: "\\iiint_D f(x, y, z) \\, dV = \\lim_{||P|| \\to 0} \\sum_{k=1}^n f(x_k^*, y_k^*, z_k^*) \\Delta V_k",
        statement: "The triple integral of a continuous function f over a bounded solid region D in R^3 is the limit of Riemann sums as the sub-box volume Delta V = Delta x Delta y Delta z approaches zero.",
        conditions: ["f is continuous on closed bounded region D"],
        explanation: "If f(x, y, z) = 1, the integral yields the geometric volume V of D. If f is mass density delta, it gives total mass M.",
        keyTakeaway: "Extends accumulation and integration to three spatial dimensions."
      },
      {
        id: "theorem-fubini-triple",
        title: "Fubini's Theorem for Triple Integrals",
        category: "theorem",
        latex: "\\iiint_D f(x, y, z) \\, dV = \\int_a^b \\int_{g_1(x)}^{g_2(x)} \\int_{h_1(x, y)}^{h_2(x, y)} f(x, y, z) \\, dz \\, dy \\, dx",
        statement: "A triple integral over a region bounded between surfaces can be evaluated as an iterated integral through six possible permutations of integration order (dz dy dx, dz dx dy, dy dz dx, dy dx dz, dx dz dy, dx dy dz).",
        conditions: ["Surfaces bounding D are continuous functions"],
        explanation: "Inner limits are functions of two variables, middle limits are functions of one variable, outer limits are constant.",
        keyTakeaway: "Permutations of integration orders allow bypassing difficult boundary projections."
      }
    ],
    summaryMDX: `# Section 15.5: Triple Integrals in Rectangular Coordinates

Triple integrals accumulate scalar quantities across three-dimensional volumes $D \\subset \\mathbb{R}^3$.

---

## 1. Volume Element $dV = dz \\, dy \\, dx$

- **Volume of Solid $D$**: $\\text{Volume}(D) = \\iiint_D 1 \\, dV$
- **Total Mass with Density $\\delta(x, y, z)$**: $M = \\iiint_D \\delta(x, y, z) \\, dV$

---

## 2. Setting Up Limits of Integration

1. **Inner Limits**: Pass a line through $D$ parallel to the innermost axis (e.g., entering at $z = h_1(x, y)$ and exiting at $z = h_2(x, y)$).
2. **Middle and Outer Limits**: Project $D$ onto the remaining coordinate plane (e.g., the $xy$-plane) and determine 2D boundary curves.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Triple Iterated Integral over a Rectangular Box",
        exerciseReference: "Section 15.5, Exercise 1",
        originalTopic: "Iterated Triple Integrals",
        difficulty: "tier1",
        tags: ["triple-integral", "rectangular-box", "linear-function"],
        problemStatement: "Evaluate iiint_B (x + 2y + 3z) dV over the box B = [0, 1] x [0, 2] x [0, 3].",
        finalAnswer: "42",
        steps: [
          {
            stepNumber: 1,
            title: "Integrate with Respect to z",
            mathExpression: "\\int_0^3 (x + 2y + 3z) \\, dz = \\left[ (x + 2y)z + \\frac{3z^2}{2} \\right]_0^3 = 3x + 6y + \\frac{27}{2}",
            explanation: "Evaluate innermost integral over z from 0 to 3.",
            why: "Performing innermost integration."
          },
          {
            stepNumber: 2,
            title: "Integrate with Respect to y",
            mathExpression: "\\int_0^2 \\left( 3x + 6y + \\frac{27}{2} \\right) dy = \\left[ 3xy + 3y^2 + \\frac{27}{2}y \\right]_0^2 = 6x + 12 + 27 = 6x + 39",
            explanation: "Evaluate middle integral over y from 0 to 2.",
            why: "Performing middle integration."
          },
          {
            stepNumber: 3,
            title: "Integrate with Respect to x",
            mathExpression: "\\int_0^1 (6x + 39) \\, dx = \\left[ 3x^2 + 39x \\right]_0^1 = 3 + 39 = 42",
            explanation: "Evaluate outermost integral over x from 0 to 1.",
            why: "Evaluating final triple integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "6*(1/2) + 39",
          expected: "42"
        }
      },
      {
        filename: "ex-02",
        title: "Volume of a Tetrahedron in the First Octant",
        exerciseReference: "Section 15.5, Exercise 2",
        originalTopic: "Tetrahedron Volume",
        difficulty: "tier2",
        tags: ["tetrahedron", "volume", "triple-integral"],
        problemStatement: "Find the volume of the tetrahedron bounded by the coordinate planes and the plane x + y + z = 1.",
        finalAnswer: "\\frac{1}{6}",
        steps: [
          {
            stepNumber: 1,
            title: "Establish 3D and 2D Boundary Limits",
            mathExpression: "0 \\le z \\le 1 - x - y, \\quad 0 \\le y \\le 1 - x, \\quad 0 \\le x \\le 1",
            explanation: "The plane bounds z from above; the xy-projection is the triangle x + y <= 1 in the first quadrant.",
            why: "Setting up limits for tetrahedron."
          },
          {
            stepNumber: 2,
            title: "Integrate with Respect to z",
            mathExpression: "\\int_0^{1-x-y} 1 \\, dz = 1 - x - y",
            explanation: "The innermost integral is simply the height.",
            why: "Computing height profile."
          },
          {
            stepNumber: 3,
            title: "Integrate with Respect to y and x",
            mathExpression: "\\int_0^{1-x} (1 - x - y) \\, dy = \\left[ (1 - x)y - \\frac{y^2}{2} \\right]_0^{1-x} = \\frac{(1-x)^2}{2}; \\quad \\int_0^1 \\frac{(1-x)^2}{2} dx = \\left[ -\\frac{(1-x)^3}{6} \\right]_0^1 = \\frac{1}{6}",
            explanation: "Integrate over triangular base in xy-plane.",
            why: "Evaluating tetrahedral volume."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1/6",
          expected: "1/6"
        }
      },
      {
        filename: "ex-03",
        title: "Triple Integral over a Solid Circular Cylinder",
        exerciseReference: "Section 15.5, Exercise 3",
        originalTopic: "Cylinder Integration",
        difficulty: "tier1",
        tags: ["cylinder", "triple-integral", "Fubini"],
        problemStatement: "Evaluate iiint_E z dV where E is the cylinder x^2 + y^2 <= 4 between z = 0 and z = 3.",
        finalAnswer: "18\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Factor z-Integral from Base Area",
            mathExpression: "\\iiint_E z \\, dV = \\left( \\int_0^3 z \\, dz \\right) \\left( \\iint_{x^2+y^2 \\le 4} 1 \\, dA \\right)",
            explanation: "Because z-limits and cross-section are independent, the integral factors.",
            why: "Decoupling independent variables."
          },
          {
            stepNumber: 2,
            title: "Evaluate Each Component",
            mathExpression: "\\int_0^3 z \\, dz = \\left[ \\frac{z^2}{2} \\right]_0^3 = \\frac{9}{2}; \\quad \\text{Base Area} = \\pi(2^2) = 4\\pi",
            explanation: "Evaluate the 1D integral and 2D circular area.",
            why: "Computing factor values."
          },
          {
            stepNumber: 3,
            title: "Multiply Factors",
            mathExpression: "\\left( \\frac{9}{2} \\right) (4\\pi) = 18\\pi",
            explanation: "Multiply the two factor results.",
            why: "Evaluating final integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(9/2) * (4*pi)",
          expected: "18*pi"
        }
      },
      {
        filename: "ex-04",
        title: "Volume of a Parabolic Prism via Reordered Triple Integration",
        exerciseReference: "Section 15.5, Exercise 4",
        originalTopic: "Reordering Triple Integrals",
        difficulty: "tier2",
        tags: ["reordering", "parabolic-prism", "volume"],
        problemStatement: "Find the volume of the solid bounded by z = x^2, z = 4, y = 0, and y = 3.",
        finalAnswer: "32",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Boundaries and Projection",
            mathExpression: "0 \\le y \\le 3, \\quad 0 \\le z \\le 4, \\quad -\\sqrt{z} \\le x \\le \\sqrt{z}",
            explanation: "Express the symmetric x-limits in terms of z.",
            why: "Reordering to dx dy dz."
          },
          {
            stepNumber: 2,
            title: "Integrate with Respect to x",
            mathExpression: "\\int_{-\\sqrt{z}}^{\\sqrt{z}} 1 \\, dx = 2\\sqrt{z}",
            explanation: "The x-width at height z is 2 sqrt(z).",
            why: "Evaluating inner width."
          },
          {
            stepNumber: 3,
            title: "Integrate over y and z",
            mathExpression: "\\left( \\int_0^3 dy \\right) \\left( \\int_0^4 2z^{1/2} dz \\right) = (3) \\left[ \\frac{4}{3} z^{3/2} \\right]_0^4 = 4(4^{3/2}) = 4(8) = 32",
            explanation: "Multiply length in y by the area of the parabolic cross-section in xz.",
            why: "Evaluating total volume."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 * 8",
          expected: "32"
        }
      },
      {
        filename: "ex-05",
        title: "Mass of a Unit Cube with Linear Density Variation",
        exerciseReference: "Section 15.5, Exercise 5",
        originalTopic: "Mass Calculation",
        difficulty: "tier1",
        tags: ["mass", "density", "cube"],
        problemStatement: "Find the total mass of the unit cube [0, 1]^3 if its density is delta(x, y, z) = x y z.",
        finalAnswer: "\\frac{1}{8}",
        steps: [
          {
            stepNumber: 1,
            title: "Factor Triple Integral Over Cube",
            mathExpression: "M = \\int_0^1 x \\, dx \\int_0^1 y \\, dy \\int_0^1 z \\, dz",
            explanation: "All limits are constant and the density function factors into separate single-variable terms.",
            why: "Decoupling separable triple integral."
          },
          {
            stepNumber: 2,
            title: "Compute Product of Single Integrals",
            mathExpression: "M = \\left( \\frac{1}{2} \\right) \\left( \\frac{1}{2} \\right) \\left( \\frac{1}{2} \\right) = \\frac{1}{8}",
            explanation: "Each single-variable integral equals 1/2.",
            why: "Evaluating total mass."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1/2)**3",
          expected: "1/8"
        }
      }
    ]
  },
  {
    chapter: "ch15",
    chapterDir: "ch15-multiple-integrals",
    section: "15.6",
    sectionDir: "15.6-moments-and-centers-of-mass",
    title: "Moments and Centers of Mass",
    definitions: [
      {
        id: "def-center-of-mass-3d",
        title: "Center of Mass of a Three-Dimensional Solid",
        category: "definition",
        latex: "\\bar{x} = \\frac{M_{yz}}{M}, \\quad \\bar{y} = \\frac{M_{xz}}{M}, \\quad \\bar{z} = \\frac{M_{xy}}{M}",
        statement: "The center of mass (x_bar, y_bar, z_bar) of a solid D with density delta(x, y, z) is the point of gravitational equilibrium, where M is total mass and M_yz, M_xz, M_xy are first moments about the coordinate planes.",
        conditions: ["Total mass M > 0", "Density is non-negative"],
        explanation: "First moments: M_yz = iiint x delta dV, M_xz = iiint y delta dV, M_xy = iiint z delta dV.",
        keyTakeaway: "Represents the mass-weighted average position of the continuous distribution."
      },
      {
        id: "def-moments-of-inertia",
        title: "Moments of Inertia (Second Moments)",
        category: "formula",
        latex: "I_z = \\iiint_D (x^2 + y^2) \\delta \\, dV, \\quad R_z = \\sqrt{\\frac{I_z}{M}}",
        statement: "The moment of inertia I_z measures the rotational inertia of a body about the z-axis. The radius of gyration R_z is the radial distance at which concentrating the entire mass produces the same rotational inertia.",
        conditions: ["delta(x, y, z) >= 0"],
        explanation: "Integrates squared perpendicular distance r^2 = x^2 + y^2 from the axis of rotation weighted by mass element dm.",
        keyTakeaway: "Fundamental in rigid-body rotational dynamics: Kinetic Energy = (1/2) I omega^2."
      }
    ],
    summaryMDX: `# Section 15.6: Moments and Centers of Mass

Multiple integrals compute physical center of mass, centroids, and rotational moments of inertia.

---

## 1. Mass and First Moments

For a solid $D$ with density $\\delta(x, y, z)$:
- **Total Mass**: $M = \\iiint_D \\delta \\, dV$
- **Moments about Coordinate Planes**:
$$M_{yz} = \\iiint_D x\\delta \\, dV, \\quad M_{xz} = \\iiint_D y\\delta \\, dV, \\quad M_{xy} = \\iiint_D z\\delta \\, dV$$
- **Center of Mass**: $(\\bar{x}, \\bar{y}, \\bar{z}) = \\left( \\frac{M_{yz}}{M}, \\frac{M_{xz}}{M}, \\frac{M_{xy}}{M} \\right)$

---

## 2. Moments of Inertia

- **About the $z$-axis**: $I_z = \\iiint_D (x^2 + y^2)\\delta \\, dV$
- **Radius of Gyration**: $\\hat{R}_z = \\sqrt{\\frac{I_z}{M}}$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Center of Mass of a Parabolic Lamina",
        exerciseReference: "Section 15.6, Exercise 1",
        originalTopic: "Planar Center of Mass",
        difficulty: "tier2",
        tags: ["center-of-mass", "lamina", "parabola"],
        problemStatement: "Find the center of mass of a uniform lamina bounded by y = 1 - x^2 and the x-axis.",
        finalAnswer: "\\left( 0, \\frac{2}{5} \\right)",
        steps: [
          {
            stepNumber: 1,
            title: "Calculate Total Mass (Area with delta = 1)",
            mathExpression: "M = \\int_{-1}^1 (1 - x^2) \\, dx = 2 \\left[ x - \\frac{x^3}{3} \\right]_0^1 = 2\\left(\\frac{2}{3}\\right) = \\frac{4}{3}",
            explanation: "Integrate area under parabola from -1 to 1.",
            why: "Finding total mass."
          },
          {
            stepNumber: 2,
            title: "Determine x_bar by Symmetry",
            mathExpression: "\\bar{x} = 0",
            explanation: "The region and density are symmetric about the y-axis (x -> -x).",
            why: "Using symmetry."
          },
          {
            stepNumber: 3,
            title: "Compute First Moment M_x and y_bar",
            mathExpression: "M_x = \\frac{1}{2}\\int_{-1}^1 (1 - x^2)^2 \\, dx = \\int_0^1 (1 - 2x^2 + x^4) \\, dx = 1 - \\frac{2}{3} + \\frac{1}{5} = \\frac{8}{15}; \\quad \\bar{y} = \\frac{M_x}{M} = \\frac{8/15}{4/3} = \\frac{2}{5}",
            explanation: "Divide first moment by total mass.",
            why: "Computing vertical center of mass."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(8/15) / (4/3)",
          expected: "2/5"
        }
      },
      {
        filename: "ex-02",
        title: "Centroid of a Right Triangular Region",
        exerciseReference: "Section 15.6, Exercise 2",
        originalTopic: "Centroid of a Triangle",
        difficulty: "tier1",
        tags: ["centroid", "triangle", "geometry"],
        problemStatement: "Find the centroid of the right triangle with vertices (0, 0), (6, 0), and (0, 9).",
        finalAnswer: "(2, 3)",
        steps: [
          {
            stepNumber: 1,
            title: "Recall Triangle Centroid Theorem",
            mathExpression: "\\bar{x} = \\frac{a}{3} = \\frac{6}{3} = 2, \\quad \\bar{y} = \\frac{b}{3} = \\frac{9}{3} = 3",
            explanation: "The centroid of any right triangle with legs along the coordinate axes lies at (a/3, b/3).",
            why: "Applying geometric centroid formula."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "6/3 + 9/3",
          expected: "2 + 3"
        }
      },
      {
        filename: "ex-03",
        title: "Moment of Inertia of a Uniform Circular Disk",
        exerciseReference: "Section 15.6, Exercise 3",
        originalTopic: "Polar Moment of Inertia",
        difficulty: "tier2",
        tags: ["moment-of-inertia", "disk", "polar-coordinates"],
        problemStatement: "Find the moment of inertia I_z of a uniform circular disk of radius R = 2 and constant density delta = 3.",
        finalAnswer: "I_z = 24\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Total Mass",
            mathExpression: "M = \\delta \\pi R^2 = (3)\\pi(2^2) = 12\\pi",
            explanation: "Multiply density by area of disk.",
            why: "Determining mass of disk."
          },
          {
            stepNumber: 2,
            title: "Set Up Polar Moment of Inertia Integral",
            mathExpression: "I_z = \\iint_D r^2 \\delta \\, dA = 3 \\int_0^{2\\pi} d\\theta \\int_0^2 r^3 \\, dr = 3(2\\pi) \\left[ \\frac{r^4}{4} \\right]_0^2 = 6\\pi \\left(\\frac{16}{4}\\right) = 24\\pi",
            explanation: "Integrate r^2 dm = r^2 (3 r dr dtheta).",
            why: "Evaluating rotational inertia."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1/2) * 12*pi * 4",
          expected: "24*pi"
        }
      },
      {
        filename: "ex-04",
        title: "Radius of Gyration of a Rotating Disk",
        exerciseReference: "Section 15.6, Exercise 4",
        originalTopic: "Radius of Gyration",
        difficulty: "tier1",
        tags: ["radius-of-gyration", "rotational-dynamics", "inertia"],
        problemStatement: "For a disk with mass M = 12*pi and moment of inertia I_z = 24*pi, find its radius of gyration R_z.",
        finalAnswer: "R_z = \\sqrt{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Definition of Radius of Gyration",
            mathExpression: "R_z = \\sqrt{\\frac{I_z}{M}} = \\sqrt{\\frac{24\\pi}{12\\pi}} = \\sqrt{2}",
            explanation: "Take the square root of the ratio of moment of inertia to total mass.",
            why: "Computing equivalent mass radius."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(24*pi / (12*pi))",
          expected: "sqrt(2)"
        }
      },
      {
        filename: "ex-05",
        title: "Center of Mass of a Uniform Solid Hemisphere",
        exerciseReference: "Section 15.6, Exercise 5",
        originalTopic: "Solid Hemisphere Center of Mass",
        difficulty: "tier2",
        tags: ["hemisphere", "center-of-mass", "symmetry"],
        problemStatement: "Find the vertical center of mass z_bar of a uniform solid hemisphere of radius R = 8 centered at the origin for z >= 0.",
        finalAnswer: "\\bar{z} = 3",
        steps: [
          {
            stepNumber: 1,
            title: "Recall Hemisphere Centroid Formula",
            mathExpression: "\\bar{z} = \\frac{3}{8}R",
            explanation: "The center of mass of a uniform solid hemisphere of radius R lies at distance (3/8)R from the flat base.",
            why: "Using geometric centroid property of hemisphere."
          },
          {
            stepNumber: 2,
            title: "Substitute Given Radius",
            mathExpression: "\\bar{z} = \\frac{3}{8}(8) = 3",
            explanation: "Multiply 3/8 by radius 8.",
            why: "Evaluating numerical coordinate."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(3/8) * 8",
          expected: "3"
        }
      }
    ]
  },
  {
    chapter: "ch15",
    chapterDir: "ch15-multiple-integrals",
    section: "15.7",
    sectionDir: "15.7-triple-integrals-in-cylindrical-and-spherical-coordinates",
    title: "Triple Integrals in Cylindrical and Spherical Coordinates",
    definitions: [
      {
        id: "def-cylindrical-coordinates-integral",
        title: "Cylindrical Coordinates Volume Element",
        category: "definition",
        latex: "dV = r \\, dz \\, dr \\, d\\theta, \\quad x = r\\cos\\theta, \\; y = r\\sin\\theta, \\; z = z",
        statement: "Cylindrical coordinates combine polar coordinates in the xy-plane with standard Cartesian height z. The volume element dV = r dz dr dtheta includes the polar Jacobian factor r.",
        conditions: ["r >= 0", "0 <= theta <= 2*pi"],
        explanation: "Ideal for solid regions exhibiting symmetry about the z-axis, such as cylinders, cones, and paraboloids.",
        keyTakeaway: "Converts radial cross-sections into simple rectangular integration limits."
      },
      {
        id: "def-spherical-coordinates-integral",
        title: "Spherical Coordinates Volume Element",
        category: "definition",
        latex: "dV = \\rho^2 \\sin\\phi \\, d\\rho \\, d\\phi \\, d\\theta, \\quad x = \\rho\\sin\\phi\\cos\\theta, \\; y = \\rho\\sin\\phi\\sin\\theta, \\; z = \\rho\\cos\\phi",
        statement: "In spherical coordinates, rho is distance from the origin, phi is polar angle from the positive z-axis, and theta is azimuthal angle in the xy-plane. The volume element is dV = rho^2 sin(phi) drho dphi dtheta.",
        conditions: ["rho >= 0", "0 <= phi <= pi", "0 <= theta <= 2*pi"],
        explanation: "The factor rho^2 sin(phi) derives from the Jacobian determinant of the spherical coordinate transformation.",
        keyTakeaway: "Essential for central potentials, spheres, and conical volumes."
      }
    ],
    summaryMDX: `# Section 15.7: Triple Integrals in Cylindrical and Spherical Coordinates

Symmetric three-dimensional solids simplify dramatically under curvilinear coordinate transformations.

---

## 1. Cylindrical Coordinates $(r, \\theta, z)$

- **Transformations**: $x = r\\cos\\theta, \\; y = r\\sin\\theta, \\; z = z, \\; x^2 + y^2 = r^2$
- **Volume Element**: $dV = r \\, dz \\, dr \\, d\\theta$

---

## 2. Spherical Coordinates $(\\rho, \\phi, \\theta)$

- **Transformations**: $x = \\rho\\sin\\phi\\cos\\theta, \\; y = \\rho\\sin\\phi\\sin\\theta, \\; z = \\rho\\cos\\phi, \\; \\rho^2 = x^2 + y^2 + z^2$
- **Volume Element**:
$$dV = \\rho^2 \\sin\\phi \\, d\\rho \\, d\\phi \\, d\\theta$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Volume of a Paraboloid Cap in Cylindrical Coordinates",
        exerciseReference: "Section 15.7, Exercise 1",
        originalTopic: "Cylindrical Coordinates Volume",
        difficulty: "tier1",
        tags: ["cylindrical-coordinates", "volume", "paraboloid"],
        problemStatement: "Find the volume of the solid under z = 4 - r^2 above the xy-plane using cylindrical coordinates.",
        finalAnswer: "8\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Determine Cylindrical Integration Bounds",
            mathExpression: "z = 0 \\implies 4 - r^2 = 0 \\implies r = 2; \\quad 0 \\le z \\le 4 - r^2, \\; 0 \\le r \\le 2, \\; 0 \\le \\theta \\le 2\\pi",
            explanation: "The base is circle of radius 2; height extends from 0 to 4 - r^2.",
            why: "Setting up limits in cylindrical coordinates."
          },
          {
            stepNumber: 2,
            title: "Set Up and Integrate",
            mathExpression: "V = \\int_0^{2\\pi} d\\theta \\int_0^2 r (4 - r^2) \\, dr = 2\\pi \\int_0^2 (4r - r^3) \\, dr = 2\\pi \\left[ 2r^2 - \\frac{r^4}{4} \\right]_0^2 = 2\\pi (8 - 4) = 8\\pi",
            explanation: "Evaluate the radial integral with Jacobian factor r.",
            why: "Evaluating volume integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 * pi * (8 - 4)",
          expected: "8*pi"
        }
      },
      {
        filename: "ex-02",
        title: "Moment of Inertia of a Cylinder in Cylindrical Coordinates",
        exerciseReference: "Section 15.7, Exercise 2",
        originalTopic: "Cylindrical Moment of Inertia",
        difficulty: "tier2",
        tags: ["cylindrical", "moment-of-inertia", "solid-cylinder"],
        problemStatement: "Find I_z for a cylinder of radius R = 2, height h = 5, and density delta = 1.",
        finalAnswer: "40\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Triple Integral for I_z",
            mathExpression: "I_z = \\int_0^{2\\pi} d\\theta \\int_0^5 dz \\int_0^2 r^2 (r \\, dr) = (2\\pi)(5) \\int_0^2 r^3 \\, dr",
            explanation: "The integrand is squared distance from z-axis: x^2 + y^2 = r^2.",
            why: "Formulating moment of inertia in cylindrical coordinates."
          },
          {
            stepNumber: 2,
            title: "Evaluate Iterated Integrals",
            mathExpression: "10\\pi \\left[ \\frac{r^4}{4} \\right]_0^2 = 10\\pi \\left( \\frac{16}{4} \\right) = 40\\pi",
            explanation: "Evaluate polynomial radial integral.",
            why: "Computing rotational inertia."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "pi * 5 * 16 / 2",
          expected: "40*pi"
        }
      },
      {
        filename: "ex-03",
        title: "Volume of a Sphere in Spherical Coordinates",
        exerciseReference: "Section 15.7, Exercise 3",
        originalTopic: "Spherical Coordinates Volume",
        difficulty: "tier1",
        tags: ["spherical-coordinates", "sphere", "volume"],
        problemStatement: "Derive the volume of a sphere of radius a = 3 using spherical coordinates.",
        finalAnswer: "36\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Establish Spherical Coordinate Limits",
            mathExpression: "0 \\le \\rho \\le 3, \\quad 0 \\le \\phi \\le \\pi, \\quad 0 \\le \\theta \\le 2\\pi",
            explanation: "Full solid sphere encompasses the complete angular domain.",
            why: "Setting up spherical domain."
          },
          {
            stepNumber: 2,
            title: "Separate and Evaluate Iterated Integrals",
            mathExpression: "V = \\left( \\int_0^{2\\pi} d\\theta \\right) \\left( \\int_0^\\pi \\sin\\phi \\, d\\phi \\right) \\left( \\int_0^3 \\rho^2 \\, d\\rho \\right) = (2\\pi)(2)\\left( \\frac{3^3}{3} \\right) = 4\\pi(9) = 36\\pi",
            explanation: "Integrate theta, phi, and rho factors independently.",
            why: "Evaluating spherical volume."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(4/3) * pi * 3**3",
          expected: "36*pi"
        }
      },
      {
        filename: "ex-04",
        title: "Volume of an Ice Cream Cone Region",
        exerciseReference: "Section 15.7, Exercise 4",
        originalTopic: "Spherical Cone and Sphere",
        difficulty: "tier2",
        tags: ["ice-cream-cone", "spherical", "cone-volume"],
        problemStatement: "Find the volume of the region bounded above by the sphere rho = 2 and below by the cone phi = pi/3.",
        finalAnswer: "\\frac{8\\pi}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Spherical Limits",
            mathExpression: "0 \\le \\rho \\le 2, \\quad 0 \\le \\phi \\le \\frac{\\pi}{3}, \\quad 0 \\le \\theta \\le 2\\pi",
            explanation: "The cone bounds the polar angle phi at pi/3.",
            why: "Determining cone-capped spherical bounds."
          },
          {
            stepNumber: 2,
            title: "Evaluate Iterated Integral",
            mathExpression: "V = 2\\pi \\left( \\int_0^{\\pi/3} \\sin\\phi \\, d\\phi \\right) \\left( \\int_0^2 \\rho^2 \\, d\\rho \\right) = 2\\pi [-\\cos\\phi]_0^{\\pi/3} \\left[ \\frac{\\rho^3}{3} \\right]_0^2 = 2\\pi \\left(1 - \\frac{1}{2}\\right) \\left(\\frac{8}{3}\\right) = \\frac{8\\pi}{3}",
            explanation: "Multiply separated angular and radial integrals.",
            why: "Computing ice cream cone volume."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(16*pi/3) * (1/2)",
          expected: "8*pi/3"
        }
      },
      {
        filename: "ex-05",
        title: "Mass of a Radially Symmetric Sphere",
        exerciseReference: "Section 15.7, Exercise 5",
        originalTopic: "Radial Density Mass",
        difficulty: "tier2",
        tags: ["radial-density", "spherical-mass", "astrophysics"],
        problemStatement: "Find the mass of a unit sphere (R = 1) with radially decreasing density delta(rho) = 1 - rho^2.",
        finalAnswer: "\\frac{8\\pi}{15}",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Spherical Mass Integral",
            mathExpression: "M = \\int_0^{2\\pi} d\\theta \\int_0^\\pi \\sin\\phi \\, d\\phi \\int_0^1 (1 - \\rho^2) \\rho^2 \\, d\\rho",
            explanation: "Integrate density weighted by volume element dV.",
            why: "Setting up mass integral."
          },
          {
            stepNumber: 2,
            title: "Compute Angular and Radial Integrals",
            mathExpression: "M = 4\\pi \\int_0^1 (\\rho^2 - \\rho^4) \\, d\\rho = 4\\pi \\left[ \\frac{\\rho^3}{3} - \\frac{\\rho^5}{5} \\right]_0^1 = 4\\pi \\left( \\frac{1}{3} - \\frac{1}{5} \\right) = 4\\pi \\left( \\frac{2}{15} \\right) = \\frac{8\\pi}{15}",
            explanation: "Evaluate the radial polynomial integral.",
            why: "Evaluating total mass."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 * pi * (1/3 - 1/5)",
          expected: "8*pi/15"
        }
      }
    ]
  },
  {
    chapter: "ch15",
    chapterDir: "ch15-multiple-integrals",
    section: "15.8",
    sectionDir: "15.8-substitutions-in-multiple-integrals",
    title: "Substitutions in Multiple Integrals",
    definitions: [
      {
        id: "def-jacobian-determinant-2d",
        title: "Jacobian Determinant (2D)",
        category: "definition",
        latex: "J(u, v) = \\frac{\\partial(x, y)}{\\partial(u, v)} = \\begin{vmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\ \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{vmatrix} = \\frac{\\partial x}{\\partial u}\\frac{\\partial y}{\\partial v} - \\frac{\\partial x}{\\partial v}\\frac{\\partial y}{\\partial u}",
        statement: "The Jacobian of the coordinate transformation x = g(u, v), y = h(u, v) measures the local area magnification factor under the change of variables.",
        conditions: ["Transformation is continuously differentiable and one-to-one"],
        explanation: "Relates area elements: dx dy = |J(u, v)| du dv.",
        keyTakeaway: "Absolute value of Jacobian is the multivariable analogue of dx/du in single-variable u-substitution."
      },
      {
        id: "theorem-change-of-variables-multiple",
        title: "Change of Variables Formula for Double Integrals",
        category: "theorem",
        latex: "\\iint_R f(x, y) \\, dx \\, dy = \\iint_G f(g(u, v), h(u, v)) \\left| \\frac{\\partial(x, y)}{\\partial(u, v)} \\right| du \\, dv",
        statement: "Transforms an integral over complicated region R into an integral over simpler region G in the uv-plane, scaling by the absolute value of the Jacobian determinant.",
        conditions: ["Transformation maps G onto R injectively almost everywhere"],
        explanation: "Straightens skewed boundaries such as parallelograms and ellipses into rectangles and circles.",
        keyTakeaway: "Enables algebraic simplification of boundaries and integrands simultaneously."
      }
    ],
    summaryMDX: `# Section 15.8: Substitutions in Multiple Integrals

Coordinate transformations simplify regions with tilted, curved, or skewed boundaries.

---

## 1. The Jacobian Determinant

For $x = x(u, v)$ and $y = y(u, v)$:
$$J(u, v) = \\frac{\\partial(x, y)}{\\partial(u, v)} = \\begin{vmatrix} x_u & x_v \\\\ y_u & y_v \\end{vmatrix} = x_u y_v - x_v y_u$$

- **Inverse Property**: $\\frac{\\partial(x, y)}{\\partial(u, v)} = \\frac{1}{\\frac{\\partial(u, v)}{\\partial(x, y)}}$

---

## 2. General Substitution Formula

$$\\iint_R f(x, y) \\, dA = \\iint_G f(x(u, v), y(u, v)) \\left| J(u, v) \\right| du \\, dv$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Computing the Jacobian of a Linear Coordinate Transformation",
        exerciseReference: "Section 15.8, Exercise 1",
        originalTopic: "Jacobian Determinant",
        difficulty: "tier1",
        tags: ["Jacobian", "linear-transformation", "change-of-variables"],
        problemStatement: "Compute the Jacobian J(u, v) = d(x, y)/d(u, v) for the transformation x = 2u + v, y = u + 3v.",
        finalAnswer: "J(u, v) = 5",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Partial Derivatives",
            mathExpression: "x_u = 2, \\quad x_v = 1, \\quad y_u = 1, \\quad y_v = 3",
            explanation: "Differentiate linear coordinate relations.",
            why: "Finding matrix elements for Jacobian."
          },
          {
            stepNumber: 2,
            title: "Evaluate 2x2 Determinant",
            mathExpression: "J(u, v) = \\begin{vmatrix} 2 & 1 \\\\ 1 & 3 \\end{vmatrix} = (2)(3) - (1)(1) = 6 - 1 = 5",
            explanation: "Compute ad - bc.",
            why: "Evaluating area scaling factor."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*3 - 1*1",
          expected: "5"
        }
      },
      {
        filename: "ex-02",
        title: "Area of an Ellipse via Coordinate Scaling",
        exerciseReference: "Section 15.8, Exercise 2",
        originalTopic: "Area of Ellipse",
        difficulty: "tier1",
        tags: ["ellipse-area", "Jacobian", "coordinate-transformation"],
        problemStatement: "Compute the area of the ellipse x^2/9 + y^2/16 <= 1 by applying substitution x = 3u, y = 4v.",
        finalAnswer: "12\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Transform Domain into Unit Disk",
            mathExpression: "\\frac{(3u)^2}{9} + \\frac{(4v)^2}{16} \\le 1 \\implies u^2 + v^2 \\le 1",
            explanation: "The transformation maps the ellipse in xy into the unit circle in uv.",
            why: "Simplifying domain geometry."
          },
          {
            stepNumber: 2,
            title: "Calculate Jacobian Determinant",
            mathExpression: "J(u, v) = \\begin{vmatrix} 3 & 0 \\\\ 0 & 4 \\end{vmatrix} = (3)(4) - 0 = 12",
            explanation: "Evaluate Jacobian of scaling transformation.",
            why: "Finding area scaling factor."
          },
          {
            stepNumber: 3,
            title: "Compute Ellipse Area",
            mathExpression: "\\text{Area} = \\iint_{u^2+v^2 \\le 1} 12 \\, du \\, dv = 12 \\times (\\text{Area of unit circle}) = 12\\pi",
            explanation: "Multiply Jacobian by area of unit disk pi.",
            why: "Evaluating transformed integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "pi * 3 * 4",
          expected: "12*pi"
        }
      },
      {
        filename: "ex-03",
        title: "Double Integral over a Skewed Parallelogram",
        exerciseReference: "Section 15.8, Exercise 3",
        originalTopic: "Parallelogram Substitution",
        difficulty: "tier2",
        tags: ["parallelogram", "change-of-variables", "inverse-Jacobian"],
        problemStatement: "Evaluate iint_R (x + y) dA where R is bounded by x + y = 0, x + y = 2, x - 2y = 0, and x - 2y = 3.",
        finalAnswer: "2",
        steps: [
          {
            stepNumber: 1,
            title: "Define New Coordinates u and v",
            mathExpression: "u = x + y, \\quad v = x - 2y \\implies 0 \\le u \\le 2, \\; 0 \\le v \\le 3",
            explanation: "The transformation maps the skewed region R into a simple rectangle [0, 2] x [0, 3] in uv.",
            why: "Rectifying region boundaries."
          },
          {
            stepNumber: 2,
            title: "Compute Inverse Jacobian",
            mathExpression: "\\frac{\\partial(u, v)}{\\partial(x, y)} = \\begin{vmatrix} 1 & 1 \\\\ 1 & -2 \\end{vmatrix} = -2 - 1 = -3 \\implies \\left|\\frac{\\partial(x, y)}{\\partial(u, v)}\\right| = \\frac{1}{|-3|} = \\frac{1}{3}",
            explanation: "Invert the Jacobian determinant of the direct mapping.",
            why: "Finding area factor for substitution."
          },
          {
            stepNumber: 3,
            title: "Evaluate Transformed Integral",
            mathExpression: "\\iint_R (x + y) \\, dA = \\int_0^2 \\int_0^3 u \\left( \\frac{1}{3} \\right) dv \\, du = \\left( \\frac{1}{3} \\right) (3) \\int_0^2 u \\, du = \\left[ \\frac{u^2}{2} \\right]_0^2 = 2",
            explanation: "Evaluate the product of separated single integrals.",
            why: "Evaluating final simplified integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(2**2 / 2) * (1/3) * 3",
          expected: "2"
        }
      },
      {
        filename: "ex-04",
        title: "Derivation of the Polar Area Element via the Jacobian",
        exerciseReference: "Section 15.8, Exercise 4",
        originalTopic: "Polar Jacobian Derivation",
        difficulty: "tier1",
        tags: ["polar-Jacobian", "proof", "coordinate-derivation"],
        problemStatement: "Verify that the Jacobian of the polar coordinate transformation x = r cos(theta), y = r sin(theta) is equal to r.",
        finalAnswer: "J(r, \\theta) = r",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Partial Derivatives",
            mathExpression: "\\frac{\\partial x}{\\partial r} = \\cos\\theta, \\; \\frac{\\partial x}{\\partial \\theta} = -r\\sin\\theta; \\quad \\frac{\\partial y}{\\partial r} = \\sin\\theta, \\; \\frac{\\partial y}{\\partial \\theta} = r\\cos\\theta",
            explanation: "Differentiate Cartesian coordinates with respect to r and theta.",
            why: "Finding partial derivatives for Jacobian."
          },
          {
            stepNumber: 2,
            title: "Compute Determinant",
            mathExpression: "J = \\begin{vmatrix} \\cos\\theta & -r\\sin\\theta \\\\ \\sin\\theta & r\\cos\\theta \\end{vmatrix} = r\\cos^2\\theta - (-r\\sin^2\\theta) = r(\\cos^2\\theta + \\sin^2\\theta) = r",
            explanation: "Apply fundamental trigonometric identity cos^2(theta) + sin^2(theta) = 1.",
            why: "Proving polar area factor."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "r*cos(theta)**2 + r*sin(theta)**2",
          expected: "r"
        }
      },
      {
        filename: "ex-05",
        title: "Evaluation of the Spherical Coordinate Jacobian",
        exerciseReference: "Section 15.8, Exercise 5",
        originalTopic: "Spherical Jacobian",
        difficulty: "tier2",
        tags: ["spherical-Jacobian", "3D-transformation", "determinants"],
        problemStatement: "Evaluate the spherical coordinate Jacobian rho^2 sin(phi) at rho = 2 and phi = pi/6.",
        finalAnswer: "2",
        steps: [
          {
            stepNumber: 1,
            title: "Recall Spherical Jacobian Formula",
            mathExpression: "J(\\rho, \\phi, \\theta) = \\rho^2 \\sin\\phi",
            explanation: "The 3x3 determinant of spherical coordinate transformation reduces to rho^2 sin(phi).",
            why: "Using spherical volume factor."
          },
          {
            stepNumber: 2,
            title: "Substitute Given Numerical Values",
            mathExpression: "J = 2^2 \\sin\\left( \\frac{\\pi}{6} \\right) = 4 \\left( \\frac{1}{2} \\right) = 2",
            explanation: "Substitute rho = 2 and sin(pi/6) = 1/2.",
            why: "Evaluating numerical value."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2**2 * (1/2)",
          expected: "2"
        }
      }
    ]
  }
];
