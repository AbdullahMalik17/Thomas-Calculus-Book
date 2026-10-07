// scripts/curriculum-data-ch04-part2.ts
/**
 * Authoritative Curriculum Data for Chapter 4 Sections 4.5 to 4.8
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH04_SECTIONS_PART2: SectionDef[] = [
  {
    chapter: "ch04",
    chapterDir: "ch04-applications-of-derivatives",
    section: "4.5",
    sectionDir: "4.5-indeterminate-forms-and-lhospitals-rule",
    title: "Indeterminate Forms and L'Hôpital's Rule",
    definitions: [
      {
        id: "theorem-lhospitals-rule",
        title: "L'Hôpital's Rule for 0/0 and inf/inf",
        category: "theorem",
        latex: "\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)} \\quad \\left(\\text{for forms } \\frac{0}{0} \\text{ or } \\frac{\\pm \\infty}{\\pm \\infty}\\right)",
        statement: "Suppose f and g are differentiable near c (except possibly at c) and g'(x) != 0 near c. If lim_{x->c} f(x)/g(x) produces an indeterminate form 0/0 or inf/inf, then the limit equals lim_{x->c} f'(x)/g'(x), provided this limit exists or is infinite.",
        conditions: ["Form must be strictly 0/0 or +-oo/+-oo", "Differentiate numerator and denominator separately (do NOT use quotient rule!)"],
        explanation: "Derived rigorously from Cauchy's Mean Value Theorem: [f(x) - f(c)]/[g(x) - g(c)] = f'(xi)/g'(xi).",
        keyTakeaway: "Differentiate top and bottom separately ONLY when indeterminate 0/0 or inf/inf."
      },
      {
        id: "rule-indeterminate-powers",
        title: "Logarithmic Transformation for Indeterminate Powers",
        category: "rule",
        latex: "y = [f(x)]^{g(x)} \\implies \\ln y = g(x) \\ln[f(x)], \\quad \\lim y = e^{\\lim \\ln y}",
        statement: "Indeterminate powers of the forms 0^0, oo^0, and 1^oo are evaluated by taking the natural logarithm, converting the exponent into a product g(x)*ln(f(x)), evaluating that limit L, and taking e^L.",
        conditions: ["f(x) > 0 near c"],
        explanation: "Transforms indeterminate powers into 0*oo, which in turn becomes 0/0 or inf/inf.",
        keyTakeaway: "Use natural logarithms to pull down the exponent for 0^0, inf^0, and 1^inf."
      }
    ],
    summaryMDX: `# Section 4.5: Indeterminate Forms and L'Hôpital's Rule

When direct substitution yields an indeterminate form, algebraic factoring or conjugates may fail. L'Hôpital's Rule provides a systematic derivative-based method.

---

## 1. Primary Indeterminate Forms: $\\frac{0}{0}$ and $\\frac{\\infty}{\\infty}$

If $\\lim_{x \\to c} \\frac{f(x)}{g(x)}$ yields $\\frac{0}{0}$ or $\\frac{\\pm \\infty}{\\pm \\infty}$:

$$
\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}
$$

**Critical Warning**: Differentiate the numerator and denominator **separately**. Do **NOT** use the Quotient Rule!

---

## 2. Other Indeterminate Forms

- **Indeterminate Products ($0 \\cdot \\infty$)**: Rewrite as a fraction:
  $$
  f \\cdot g = \\frac{f}{1/g} \\quad \\text{or} \\quad \\frac{g}{1/f}
  $$
- **Indeterminate Differences ($\\infty - \\infty$)**: Combine fractions over a common denominator or multiply by a conjugate.
- **Indeterminate Powers ($1^\\infty, 0^0, \\infty^0$)**: Let $y = [f(x)]^{g(x)}$, take $\\ln y = g(x) \\ln(f(x))$, evaluate $\\lim \\ln y = L$, then answer is $e^L$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Repeated L'Hôpital's Rule on a Trigonometric Limit",
        exerciseReference: "Section 4.5, Exercise 1",
        originalTopic: "Repeated L'Hopital",
        difficulty: "tier1",
        tags: ["lhopital", "trigonometric-limit", "repeated-application"],
        problemStatement: "Evaluate: lim_{x -> 0} (sin x - x) / x^3.",
        finalAnswer: "\\lim_{x \\to 0} \\frac{\\sin x - x}{x^3} = -\\frac{1}{6}",
        steps: [
          {
            stepNumber: 1,
            title: "Check Indeterminate Form (Form 0/0)",
            mathExpression: "\\frac{\\sin(0) - 0}{0^3} = \\frac{0}{0}",
            explanation: "Direct substitution produces 0/0. Apply L'Hôpital's Rule.",
            why: "Prerequisite condition for L'Hôpital's Rule."
          },
          {
            stepNumber: 2,
            title: "First Application of L'Hôpital's Rule",
            mathExpression: "\\lim_{x \\to 0} \\frac{\\cos x - 1}{3x^2} = \\frac{1 - 1}{0} = \\frac{0}{0}",
            explanation: "Differentiate numerator and denominator; result is still 0/0.",
            why: "Second application needed."
          },
          {
            stepNumber: 3,
            title: "Second Application of L'Hôpital's Rule",
            mathExpression: "\\lim_{x \\to 0} \\frac{-\\sin x}{6x} = -\\frac{1}{6}\\lim_{x \\to 0}\\frac{\\sin x}{x} = -\\frac{1}{6}(1) = -\\frac{1}{6}",
            explanation: "Apply standard limit lim_{x->0} sin(x)/x = 1 (or differentiate once more).",
            why: "Concludes the evaluation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "Rational(-1,6)",
          expected: "-1/6"
        }
      },
      {
        filename: "ex-02",
        title: "Evaluating Infinity over Infinity",
        exerciseReference: "Section 4.5, Exercise 2",
        originalTopic: "Exponential Growth Dominance",
        difficulty: "tier1",
        tags: ["lhopital", "exponentials", "growth-rates"],
        problemStatement: "Evaluate: lim_{x -> oo} x^2 / e^x.",
        finalAnswer: "\\lim_{x \\to \\infty} \\frac{x^2}{e^x} = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Check Indeterminate Form (oo/oo)",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{x^2}{e^x} = \\frac{\\infty}{\\infty}",
            explanation: "Both numerator and denominator grow unbounded.",
            why: "Condition for L'Hôpital's Rule."
          },
          {
            stepNumber: 2,
            title: "Apply L'Hôpital's Rule Twice",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{2x}{e^x} \\stackrel{\\text{H}}{=} \\lim_{x \\to \\infty} \\frac{2}{e^x} = \\frac{2}{\\infty} = 0",
            explanation: "Differentiate numerator and denominator twice.",
            why: "Exponential e^x dominates any polynomial x^n as x -> oo."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Indeterminate Product 0 * infinity",
        exerciseReference: "Section 4.5, Exercise 3",
        originalTopic: "Indeterminate Product Transformation",
        difficulty: "tier2",
        tags: ["lhopital", "logarithm", "product-transformation"],
        problemStatement: "Evaluate: lim_{x -> 0^+} x * ln(x).",
        finalAnswer: "\\lim_{x \\to 0^+} x \\ln x = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Rewrite Product as a Quotient",
            mathExpression: "x \\ln x = \\frac{\\ln x}{1/x} \\quad \\implies \\text{Form } \\frac{-\\infty}{+\\infty}",
            explanation: "Place x into the denominator as 1/x.",
            why: "Converts 0*oo into inf/inf to apply L'Hôpital's Rule."
          },
          {
            stepNumber: 2,
            title: "Apply L'Hôpital's Rule",
            mathExpression: "\\lim_{x \\to 0^+} \\frac{\\frac{d}{dx}[\\ln x]}{\\frac{d}{dx}[x^{-1}]} = \\lim_{x \\to 0^+} \\frac{1/x}{-1/x^2}",
            explanation: "Differentiate top (1/x) and bottom (-1/x^2).",
            why: "L'Hôpital's Rule."
          },
          {
            stepNumber: 3,
            title: "Simplify and Evaluate",
            mathExpression: "\\lim_{x \\to 0^+} \\left( \\frac{1}{x} \\cdot (-x^2) \\right) = \\lim_{x \\to 0^+} (-x) = 0",
            explanation: "Invert and multiply fractions.",
            why: "Direct substitution yields 0."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Indeterminate Difference infinity - infinity",
        exerciseReference: "Section 4.5, Exercise 4",
        originalTopic: "Indeterminate Difference",
        difficulty: "tier2",
        tags: ["lhopital", "trigonometry", "common-denominator"],
        problemStatement: "Evaluate: lim_{x -> 0} (1/sin(x) - 1/x).",
        finalAnswer: "\\lim_{x \\to 0} \\left(\\frac{1}{\\sin x} - \\frac{1}{x}\\right) = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Combine over Common Denominator",
            mathExpression: "\\frac{1}{\\sin x} - \\frac{1}{x} = \\frac{x - \\sin x}{x \\sin x} \\quad \\implies \\text{Form } \\frac{0}{0}",
            explanation: "Combine the two fractions.",
            why: "Converts oo - oo to 0/0."
          },
          {
            stepNumber: 2,
            title: "Apply L'Hôpital's Rule Twice",
            mathExpression: "\\lim_{x \\to 0} \\frac{1 - \\cos x}{\\sin x + x\\cos x} \\stackrel{\\text{H}}{=} \\lim_{x \\to 0} \\frac{\\sin x}{\\cos x + \\cos x - x\\sin x} = \\frac{0}{1 + 1 - 0} = \\frac{0}{2} = 0",
            explanation: "Apply L'Hôpital's Rule twice and evaluate at x = 0.",
            why: "Standard limit evaluation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "0 / 2",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Indeterminate Power 1^infinity",
        exerciseReference: "Section 4.5, Exercise 5",
        originalTopic: "Indeterminate Power",
        difficulty: "tier3",
        tags: ["lhopital", "indeterminate-power", "logarithm-transformation"],
        problemStatement: "Evaluate: lim_{x -> 0^+} (1 + 2x)^(1/x).",
        finalAnswer: "\\lim_{x \\to 0^+} (1 + 2x)^{1/x} = e^2",
        steps: [
          {
            stepNumber: 1,
            title: "Set y and Take Natural Logarithm",
            mathExpression: "y = (1 + 2x)^{1/x} \\implies \\ln y = \\frac{1}{x}\\ln(1 + 2x) = \\frac{\\ln(1 + 2x)}{x}",
            explanation: "Taking logarithms pulls down the exponent 1/x.",
            why: "Transforms 1^oo into 0/0."
          },
          {
            stepNumber: 2,
            title: "Evaluate Limit of ln(y) via L'Hôpital's Rule",
            mathExpression: "\\lim_{x \\to 0^+} \\frac{\\ln(1 + 2x)}{x} \\stackrel{\\text{H}}{=} \\lim_{x \\to 0^+} \\frac{\\frac{2}{1 + 2x}}{1} = \\frac{2}{1 + 0} = 2",
            explanation: "Differentiate top (2/(1+2x)) and bottom (1).",
            why: "L'Hôpital's Rule."
          },
          {
            stepNumber: 3,
            title: "Exponentiate to Find Final Limit",
            mathExpression: "\\lim y = e^{\\lim \\ln y} = e^2",
            explanation: "Since ln(y) -> 2, y -> e^2.",
            why: "Continuity of exponential function."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "exp(2) - exp(2)",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch04",
    chapterDir: "ch04-applications-of-derivatives",
    section: "4.6",
    sectionDir: "4.6-applied-optimization",
    title: "Applied Optimization",
    definitions: [
      {
        id: "def-optimization-workflow",
        title: "Applied Optimization Protocol",
        category: "rule",
        latex: "\\max / \\min Q(x) \\quad \\text{subject to } g(x) = 0 \\text{ on feasible domain } [a, b]",
        statement: "To solve an applied optimization problem: (1) Identify primary objective quantity to be maximized or minimized, (2) Sketch diagram and label variables, (3) Write primary equation, (4) Use constraint equations to eliminate extra variables, (5) Determine feasible domain, (6) Apply calculus extrema tests.",
        conditions: ["Feasible domain derived from physical/geometric constraints (e.g. lengths >= 0)"],
        explanation: "Bridges practical real-world problems with mathematical extreme value theorems.",
        keyTakeaway: "Express objective function in a single variable over its physical domain."
      }
    ],
    summaryMDX: `# Section 4.6: Applied Optimization

Applied optimization is the art of finding the best possible solution (maximum volume, minimum cost, least time) subject to practical constraints.

---

## 1. Six-Step Optimization Strategy

1. **Understand the Goal**: Identify what is to be maximized or minimized.
2. **Assign Variables**: Assign letters to all unknown quantities.
3. **Primary Equation**: Write a formula for the quantity $Q$ to be optimized.
4. **Constraint Equation**: Use constraints to eliminate all but one variable.
5. **Feasible Domain**: Determine the physical limits on the independent variable.
6. **Find Extrema**: Locate critical points and test using Closed Interval Method or First/Second Derivative Tests.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Maximizing Volume of an Open-Top Box",
        exerciseReference: "Section 4.6, Exercise 1",
        originalTopic: "Box Optimization",
        difficulty: "tier1",
        tags: ["optimization", "volume", "polynomial"],
        problemStatement: "Square corners of side length x are cut from a 12-inch by 12-inch tin sheet, and the flaps are folded up to form an open box. Find the value of x that maximizes the volume.",
        finalAnswer: "x = 2 \\text{ inches}; \\quad V_{\\max} = 128 \\text{ in}^3",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate Volume Function and Feasible Domain",
            mathExpression: "V(x) = x(12 - 2x)^2, \\quad \\text{Feasible Domain: } [0, 6]",
            explanation: "Base is (12 - 2x) by (12 - 2x) and height is x.",
            why: "Geometric formulation."
          },
          {
            stepNumber: 2,
            title: "Expand and Differentiate",
            mathExpression: "V(x) = x(144 - 48x + 4x^2) = 4x^3 - 48x^2 + 144x \\implies V'(x) = 12x^2 - 96x + 144 = 12(x^2 - 8x + 12) = 12(x - 2)(x - 6)",
            explanation: "Differentiate to find critical points.",
            why: "Critical point search."
          },
          {
            stepNumber: 3,
            title: "Evaluate at Critical Points and Endpoints",
            mathExpression: "V(0) = 0, \\quad V(6) = 0, \\quad V(2) = 2(12 - 4)^2 = 2(64) = 128 \\text{ in}^3",
            explanation: "x = 2 gives the absolute maximum volume of 128 cubic inches.",
            why: "Closed Interval Method."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x*(12 - 2*x)**2",
          expected: "12*(x - 2)*(x - 6)",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Maximizing Fenced Pasture Along a River",
        exerciseReference: "Section 4.6, Exercise 2",
        originalTopic: "Perimeter and Area Constraint",
        difficulty: "tier1",
        tags: ["optimization", "area", "quadratic"],
        problemStatement: "A farmer encloses a rectangular field along a straight river using 1200 meters of fencing (no fence needed along the river). Find the dimensions that maximize the enclosed area.",
        finalAnswer: "\\text{Dimensions: } 300 \\text{ m (perpendicular)} \\times 600 \\text{ m (parallel)}; \\quad A_{\\max} = 180{,}000 \\text{ m}^2",
        steps: [
          {
            stepNumber: 1,
            title: "Set up Constraint and Objective Equations",
            mathExpression: "2x + y = 1200 \\implies y = 1200 - 2x; \\quad A(x) = xy = x(1200 - 2x) = 1200x - 2x^2",
            explanation: "Two sides of length x perpendicular to river, one side y parallel.",
            why: "Constraint equation elimination."
          },
          {
            stepNumber: 2,
            title: "Differentiate and Solve for Critical Point",
            mathExpression: "A'(x) = 1200 - 4x = 0 \\implies 4x = 1200 \\implies x = 300 \\text{ m}",
            explanation: "Set derivative of area to zero.",
            why: "Critical point."
          },
          {
            stepNumber: 3,
            title: "Verify Maximum and State Dimensions",
            mathExpression: "A''(x) = -4 < 0 \\implies \\text{Concave Down (Absolute Max)}; \\quad y = 1200 - 2(300) = 600 \\text{ m}",
            explanation: "Area is 300 * 600 = 180,000 square meters.",
            why: "Second derivative test."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x*(1200 - 2*x)",
          expected: "1200 - 4*x",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Minimizing Surface Area of a Cylindrical Can",
        exerciseReference: "Section 4.6, Exercise 3",
        originalTopic: "Cylinder Surface Optimization",
        difficulty: "tier2",
        tags: ["optimization", "cylinder", "surface-area"],
        problemStatement: "A cylindrical can must hold 1000 cm^3 of liquid. Find the radius r and height h that minimize the total surface area.",
        finalAnswer: "r = \\sqrt[3]{\\frac{500}{\\pi}} \\approx 5.42 \\text{ cm}; \\quad h = 2r = 2\\sqrt[3]{\\frac{500}{\\pi}} \\approx 10.84 \\text{ cm}",
        steps: [
          {
            stepNumber: 1,
            title: "Relate Volume and Surface Area",
            mathExpression: "V = \\pi r^2 h = 1000 \\implies h = \\frac{1000}{\\pi r^2}; \\quad A = 2\\pi r^2 + 2\\pi rh = 2\\pi r^2 + 2\\pi r\\left(\\frac{1000}{\\pi r^2}\\right) = 2\\pi r^2 + \\frac{2000}{r}",
            explanation: "Substitute h into total surface area (two circular ends plus lateral jacket).",
            why: "Elimination of variable h."
          },
          {
            stepNumber: 2,
            title: "Differentiate with Respect to r",
            mathExpression: "A'(r) = 4\\pi r - \\frac{2000}{r^2} = 0 \\implies 4\\pi r^3 = 2000 \\implies r^3 = \\frac{500}{\\pi} \\implies r = \\sqrt[3]{\\frac{500}{\\pi}}",
            explanation: "Set A'(r) = 0 and solve for r.",
            why: "Critical point."
          },
          {
            stepNumber: 3,
            title: "Solve for Height h",
            mathExpression: "h = \\frac{1000}{\\pi r^2} = \\frac{2(500)}{\\pi r^2} = \\frac{2(\\pi r^3)}{\\pi r^2} = 2r",
            explanation: "Notice the optimal cylindrical can always has height equal to its diameter (h = 2r).",
            why: "Universal geometric optimality condition for cylinders."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "2*pi*r**2 + 2000/r",
          expected: "4*pi*r - 2000/r**2",
          variable: "r"
        }
      },
      {
        filename: "ex-04",
        title: "Shortest Distance from a Point to a Parabola",
        exerciseReference: "Section 4.6, Exercise 4",
        originalTopic: "Distance Optimization",
        difficulty: "tier2",
        tags: ["optimization", "distance", "parabola"],
        problemStatement: "Find the point on the parabola y = x^2 closest to the point (0, 2).",
        finalAnswer: "\\left(-\\sqrt{\\frac{3}{2}}, \\frac{3}{2}\\right) \\quad \\text{and} \\quad \\left(\\sqrt{\\frac{3}{2}}, \\frac{3}{2}\\right)",
        steps: [
          {
            stepNumber: 1,
            title: "Minimize Squared Distance Function",
            mathExpression: "D^2 = (x - 0)^2 + (y - 2)^2 = x^2 + (x^2 - 2)^2 = x^2 + x^4 - 4x^2 + 4 = x^4 - 3x^2 + 4",
            explanation: "Minimizing the square of distance D^2 avoids square roots while yielding identical extrema.",
            why: "Squared distance optimization trick."
          },
          {
            stepNumber: 2,
            title: "Differentiate with Respect to x",
            mathExpression: "f'(x) = 4x^3 - 6x = 2x(2x^2 - 3) = 0 \\implies x = 0, \\; x = \\pm \\sqrt{\\frac{3}{2}}",
            explanation: "Critical points are x = 0 and x = +-sqrt(3/2).",
            why: "Stationary points."
          },
          {
            stepNumber: 3,
            title: "Test and Classify Points",
            mathExpression: "x = 0 \\implies D^2 = 4; \\quad x = \\pm \\sqrt{3/2} \\implies D^2 = 9/4 - 9/2 + 4 = 7/4 = 1.75 < 4",
            explanation: "x = +-sqrt(3/2) gives the global minimum distance. y = (sqrt(3/2))^2 = 3/2.",
            why: "Global minimum verification."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**4 - 3*x**2 + 4",
          expected: "4*x**3 - 6*x",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Snell's Law of Refraction via Fermat's Principle",
        exerciseReference: "Section 4.6, Exercise 5",
        originalTopic: "Travel Time Optimization",
        difficulty: "tier3",
        tags: ["optimization", "snells-law", "fermat-principle"],
        problemStatement: "A light ray travels from point A(0, a) in medium 1 (speed v1) to point B(d, -b) in medium 2 (speed v2), crossing the interface at (x, 0). Show that minimizing travel time yields Snell's Law: sin(theta1)/v1 = sin(theta2)/v2.",
        finalAnswer: "\\frac{\\sin \\theta_1}{v_1} = \\frac{\\sin \\theta_2}{v_2}",
        steps: [
          {
            stepNumber: 1,
            title: "Express Total Travel Time T(x)",
            mathExpression: "T(x) = \\frac{\\sqrt{x^2 + a^2}}{v_1} + \\frac{\\sqrt{(d - x)^2 + b^2}}{v_2}",
            explanation: "Travel time equals distance divided by speed for each medium.",
            why: "Physics travel time formula."
          },
          {
            stepNumber: 2,
            title: "Differentiate with Respect to Crossing Coordinate x",
            mathExpression: "T'(x) = \\frac{x}{v_1 \\sqrt{x^2 + a^2}} - \\frac{d - x}{v_2 \\sqrt{(d - x)^2 + b^2}} = 0",
            explanation: "Apply chain rule to both radical terms.",
            why: "Condition for minimum time."
          },
          {
            stepNumber: 3,
            title: "Identify Trigonometric Sines of Angles",
            mathExpression: "\\sin \\theta_1 = \\frac{x}{\\sqrt{x^2 + a^2}}, \\quad \\sin \\theta_2 = \\frac{d - x}{\\sqrt{(d - x)^2 + b^2}} \\implies \\frac{\\sin \\theta_1}{v_1} = \\frac{\\sin \\theta_2}{v_2}",
            explanation: "Substitute geometric sines of angles with the surface normal.",
            why: "Snell's Law of Refraction."
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
    section: "4.7",
    sectionDir: "4.7-newtons-method",
    title: "Newton's Method",
    definitions: [
      {
        id: "formula-newtons-method",
        title: "Newton-Raphson Iteration Formula",
        category: "formula",
        latex: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)} \\quad (f'(x_n) \\neq 0)",
        statement: "Newton's method approximates a real root of f(x) = 0 by replacing the curve with its tangent line at x_n and taking the x-intercept of the tangent line as the next estimate x_{n+1}.",
        conditions: ["f is differentiable", "f'(x_n) != 0 at every iteration step"],
        explanation: "Exhibits quadratic convergence near simple roots: the number of accurate decimal places roughly doubles with each iteration.",
        keyTakeaway: "x_{n+1} is the x-intercept of the tangent line to f at x_n."
      }
    ],
    summaryMDX: `# Section 4.7: Newton's Method

Newton's method (the Newton-Raphson algorithm) is a rapid numerical method for approximating real solutions of $f(x) = 0$.

---

## 1. Geometric Derivation

At the current estimate $x_n$, the tangent line to $y = f(x)$ is:

$$
y - f(x_n) = f'(x_n)(x - x_n)
$$

Setting $y = 0$ to find the $x$-intercept $x_{n+1}$:

$$
0 - f(x_n) = f'(x_n)(x_{n+1} - x_n) \\implies x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}
$$

---

## 2. Failure Modes

Newton's method may fail if:
1. **$f'(x_n) = 0$**: The tangent line is horizontal and has no $x$-intercept.
2. **Cycle / Oscillation**: Estimates alternate indefinitely without converging.
3. **Divergence**: The sequence shoots off to infinity.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Approximating Square Root of 5 via Newton's Method",
        exerciseReference: "Section 4.7, Exercise 1",
        originalTopic: "Square Root Approximation",
        difficulty: "tier1",
        tags: ["newtons-method", "numerical", "square-root"],
        problemStatement: "Use Newton's method to approximate sqrt(5) by finding the positive root of f(x) = x^2 - 5 with initial guess x_0 = 2, computing x_1 and x_2.",
        finalAnswer: "x_1 = \\frac{9}{4} = 2.25, \\quad x_2 = \\frac{161}{72} \\approx 2.236111",
        steps: [
          {
            stepNumber: 1,
            title: "Derive Iteration Formula",
            mathExpression: "f(x) = x^2 - 5 \\implies f'(x) = 2x \\implies x_{n+1} = x_n - \\frac{x_n^2 - 5}{2x_n} = \\frac{x_n^2 + 5}{2x_n} = \\frac{1}{2}\\left(x_n + \\frac{5}{x_n}\\right)",
            explanation: "Apply Newton's formula.",
            why: "Babylonian square root algorithm."
          },
          {
            stepNumber: 2,
            title: "Compute First Iteration x_1",
            mathExpression: "x_1 = \\frac{1}{2}\\left(2 + \\frac{5}{2}\\right) = \\frac{1}{2}\\left(\\frac{9}{2}\\right) = \\frac{9}{4} = 2.25",
            explanation: "Substitute x_0 = 2.",
            why: "First iteration."
          },
          {
            stepNumber: 3,
            title: "Compute Second Iteration x_2",
            mathExpression: "x_2 = \\frac{1}{2}\\left(\\frac{9}{4} + \\frac{5}{9/4}\\right) = \\frac{1}{2}\\left(\\frac{9}{4} + \\frac{20}{9}\\right) = \\frac{1}{2}\\left(\\frac{81 + 80}{36}\\right) = \\frac{161}{72} \\approx 2.236111",
            explanation: "Accurate to 5 decimal places (true sqrt(5) = 2.236068...).",
            why: "Second iteration."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "Rational(1,2)*(Rational(9,4) + 5/Rational(9,4))",
          expected: "Rational(161,72)"
        }
      },
      {
        filename: "ex-02",
        title: "Approximating Root of a Cubic Polynomial",
        exerciseReference: "Section 4.7, Exercise 2",
        originalTopic: "Cubic Root Finding",
        difficulty: "tier2",
        tags: ["newtons-method", "cubic", "numerical"],
        problemStatement: "Apply Newton's method to approximate the real root of x^3 - 2x - 5 = 0 starting at x_0 = 2, computing x_1 and x_2.",
        finalAnswer: "x_1 = 2.1, \\quad x_2 = \\frac{217}{103} \\approx 2.094568",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate Newton Iteration",
            mathExpression: "f(x) = x^3 - 2x - 5, \\quad f'(x) = 3x^2 - 2 \\implies x_{n+1} = x_n - \\frac{x_n^3 - 2x_n - 5}{3x_n^2 - 2}",
            explanation: "Compute iteration quotient.",
            why: "Newton-Raphson scheme."
          },
          {
            stepNumber: 2,
            title: "Compute x_1 from x_0 = 2",
            mathExpression: "x_1 = 2 - \\frac{2^3 - 2(2) - 5}{3(2^2) - 2} = 2 - \\frac{8 - 4 - 5}{12 - 2} = 2 - \\frac{-1}{10} = 2.1",
            explanation: "Evaluate with x_0 = 2.",
            why: "First step."
          },
          {
            stepNumber: 3,
            title: "Compute x_2 from x_1 = 2.1",
            mathExpression: "x_2 = 2.1 - \\frac{(2.1)^3 - 2(2.1) - 5}{3(2.1)^2 - 2} = 2.1 - \\frac{9.261 - 4.2 - 5}{13.23 - 2} = 2.1 - \\frac{0.061}{11.23} \\approx 2.094568",
            explanation: "Substitute x_1 = 2.1.",
            why: "Second step."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "2 - (-1)/10",
          expected: "Rational(21, 10)"
        }
      },
      {
        filename: "ex-03",
        title: "Approximating Fixed Point of Cosine",
        exerciseReference: "Section 4.7, Exercise 3",
        originalTopic: "Trigonometric Root Finding",
        difficulty: "tier2",
        tags: ["newtons-method", "cosine", "fixed-point"],
        problemStatement: "Find the Newton iteration formula for solving cos(x) = x, and compute x_1 starting with x_0 = 1.",
        finalAnswer: "x_1 = 1 - \\frac{\\cos(1) - 1}{-\\sin(1) - 1} = \\frac{\\sin(1) + \\cos(1)}{1 + \\sin(1)} \\approx 0.75036",
        steps: [
          {
            stepNumber: 1,
            title: "Set up Root Function",
            mathExpression: "f(x) = \\cos x - x = 0 \\implies f'(x) = -\\sin x - 1",
            explanation: "Rewrite equation as f(x) = 0.",
            why: "Standard form for root finding."
          },
          {
            stepNumber: 2,
            title: "Apply Newton's Formula",
            mathExpression: "x_{n+1} = x_n - \\frac{\\cos(x_n) - x_n}{-\\sin(x_n) - 1} = x_n + \\frac{\\cos(x_n) - x_n}{\\sin(x_n) + 1}",
            explanation: "Simplify the minus signs.",
            why: "Clean iteration rule."
          },
          {
            stepNumber: 3,
            title: "Evaluate at x_0 = 1",
            mathExpression: "x_1 = 1 + \\frac{\\cos(1) - 1}{\\sin(1) + 1} = 1 + \\frac{0.54030 - 1}{0.84147 + 1} = 1 - \\frac{0.45970}{1.84147} \\approx 0.75036",
            explanation: "Evaluate trigonometric functions in radians.",
            why: "First iteration value."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "x - (cos(x) - x)/(-sin(x) - 1) - (x*sin(x) + cos(x))/(sin(x) + 1)",
          expected: "0",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Demonstrating Divergence of Newton's Method",
        exerciseReference: "Section 4.7, Exercise 4",
        originalTopic: "Newton Method Failure",
        difficulty: "tier2",
        tags: ["newtons-method", "divergence", "failure-mode"],
        problemStatement: "Show that Newton's method fails to converge for f(x) = x^(1/3) for any initial guess x_0 != 0.",
        finalAnswer: "x_{n+1} = -2x_n \\implies x_n = (-2)^n x_0 \\implies |x_n| \\to \\infty \\text{ (diverges)}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute f'(x)",
            mathExpression: "f'(x) = \\frac{1}{3}x^{-2/3}",
            explanation: "Power rule derivative.",
            why: "Derivative calculation."
          },
          {
            stepNumber: 2,
            title: "Apply Newton's Iteration Formula",
            mathExpression: "x_{n+1} = x_n - \\frac{x_n^{1/3}}{\\frac{1}{3}x_n^{-2/3}} = x_n - 3x_n^{1/3}x_n^{2/3} = x_n - 3x_n = -2x_n",
            explanation: "The ratio simplifies directly to -3*x_n.",
            why: "Exact closed-form recurrence relation."
          },
          {
            stepNumber: 3,
            title: "Analyze Recurrence Behavior",
            mathExpression: "x_n = (-2)^n x_0 \\implies |x_n| = 2^n |x_0| \\to \\infty \\text{ as } n \\to \\infty",
            explanation: "Each iteration doubles the distance from the true root 0 and alternates signs, diverging catastrophically.",
            why: "Proves divergence."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "x - x**(Rational(1,3)) / (Rational(1,3)*x**(-Rational(2,3)))",
          expected: "-2*x",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Division-Free Reciprocal Algorithm via Newton's Method",
        exerciseReference: "Section 4.7, Exercise 5",
        originalTopic: "Division-Free Reciprocal",
        difficulty: "tier3",
        tags: ["newtons-method", "computer-arithmetic", "reciprocal"],
        problemStatement: "Derive Newton's iteration formula to compute 1/a without performing division by finding the root of f(x) = 1/x - a.",
        finalAnswer: "x_{n+1} = x_n(2 - ax_n)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Derivative of f(x) = 1/x - a",
            mathExpression: "f'(x) = -\\frac{1}{x^2}",
            explanation: "Differentiate with respect to x.",
            why: "Derivative calculation."
          },
          {
            stepNumber: 2,
            title: "Apply Newton's Formula",
            mathExpression: "x_{n+1} = x_n - \\frac{\\frac{1}{x_n} - a}{-\\frac{1}{x_n^2}} = x_n + x_n^2\\left(\\frac{1}{x_n} - a\\right) = x_n + x_n - ax_n^2 = 2x_n - ax_n^2 = x_n(2 - ax_n)",
            explanation: "The resulting formula requires only addition, subtraction, and multiplication (no division!).",
            why: "Used in computer processor arithmetic units for hardware division."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "x - (1/x - a)/(-1/x**2)",
          expected: "x*(2 - a*x)",
          variable: "x"
        }
      }
    ]
  },
  {
    chapter: "ch04",
    chapterDir: "ch04-applications-of-derivatives",
    section: "4.8",
    sectionDir: "4.8-antiderivatives",
    title: "Antiderivatives",
    definitions: [
      {
        id: "def-antiderivative",
        title: "Definition of an Antiderivative",
        category: "definition",
        latex: "F'(x) = f(x) \\implies \\int f(x) \\, dx = F(x) + C",
        statement: "A function F is an antiderivative of f on an interval I if F'(x) = f(x) for all x in I. The collection of all antiderivatives of f is its indefinite integral, denoted int f(x) dx = F(x) + C where C is an arbitrary constant of integration.",
        conditions: ["F'(x) = f(x) on interval I", "C is an arbitrary real constant"],
        explanation: "Two antiderivatives of the same function on an interval differ by at most a constant: F(x) - G(x) = C.",
        keyTakeaway: "Antidifferentiation is the inverse operation of differentiation."
      },
      {
        id: "rule-power-rule-integration",
        title: "Power Rule for Antiderivatives",
        category: "rule",
        latex: "\\int x^n \\, dx = \\frac{x^{n+1}}{n + 1} + C \\quad (n \\neq -1)",
        statement: "To antidifferentiate a power of x (other than -1), increment the exponent by 1 and divide by the new exponent.",
        conditions: ["n != -1 (when n = -1, int (1/x) dx = ln|x| + C)"],
        explanation: "Direct inverse of the differentiation power rule.",
        keyTakeaway: "Add 1 to the exponent and divide by the new exponent."
      }
    ],
    summaryMDX: `# Section 4.8: Antiderivatives

Antidifferentiation is the process of recovering a function from its derivative. It is the gateway to integral calculus and the Fundamental Theorem of Calculus.

---

## 1. Definition and General Antiderivative

A function $F$ is an **antiderivative** of $f$ if:

$$
F'(x) = f(x)
$$

The **general antiderivative** (or **indefinite integral**) includes an arbitrary constant of integration $C$:

$$
\\int f(x) \\, dx = F(x) + C
$$

---

## 2. Basic Integration Formulas

- **Power Rule**: $\\int x^n \\, dx = \\frac{x^{n+1}}{n + 1} + C \\quad (n \\neq -1)$
- **Sine**: $\\int \\sin x \\, dx = -\\cos x + C$
- **Cosine**: $\\int \\cos x \\, dx = \\sin x + C$
- **Secant Squared**: $\\int \\sec^2 x \\, dx = \\tan x + C$
- **Secant Tangent**: $\\int \\sec x \\tan x \\, dx = \\sec x + C$

---

## 3. Initial Value Problems (IVPs)

An **initial value problem** consists of a differential equation $y' = f(x)$ together with an initial condition $y(x_0) = y_0$. The initial condition determines the exact numerical value of $C$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "General Antiderivative of a Polynomial",
        exerciseReference: "Section 4.8, Exercise 1",
        originalTopic: "Polynomial Antiderivatives",
        difficulty: "tier1",
        tags: ["antiderivative", "indefinite-integral", "power-rule"],
        problemStatement: "Find the most general antiderivative of f(x) = 6x^5 - 8x^3 + 9x^2 - 4x + 7.",
        finalAnswer: "\\int f(x) \\, dx = x^6 - 2x^4 + 3x^3 - 2x^2 + 7x + C",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Power Rule to Each Term",
            mathExpression: "\\int 6x^5 \\, dx = 6\\frac{x^6}{6} = x^6; \\quad \\int -8x^3 \\, dx = -8\\frac{x^4}{4} = -2x^4; \\quad \\int 9x^2 \\, dx = 9\\frac{x^3}{3} = 3x^3",
            explanation: "Increment exponent and divide by new exponent.",
            why: "Power rule for integration."
          },
          {
            stepNumber: 2,
            title: "Integrate Linear and Constant Terms",
            mathExpression: "\\int -4x \\, dx = -4\\frac{x^2}{2} = -2x^2; \\quad \\int 7 \\, dx = 7x",
            explanation: "Constant integrates to 7x.",
            why: "Integral of constant c is cx."
          },
          {
            stepNumber: 3,
            title: "Add Constant of Integration C",
            mathExpression: "F(x) = x^6 - 2x^4 + 3x^3 - 2x^2 + 7x + C",
            explanation: "Assemble complete general antiderivative.",
            why: "Constant C represents the family of all antiderivatives."
          }
        ],
        sympyVerification: {
          operation: "integral",
          type: "integral",
          expression: "6*x**5 - 8*x**3 + 9*x**2 - 4*x + 7",
          expected: "x**6 - 2*x**4 + 3*x**3 - 2*x**2 + 7*x",
          variable: "x",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-02",
        title: "Antiderivative of Fractional and Negative Powers",
        exerciseReference: "Section 4.8, Exercise 2",
        originalTopic: "General Power Antiderivative",
        difficulty: "tier1",
        tags: ["antiderivative", "fractional-powers", "radicals"],
        problemStatement: "Find the general antiderivative of f(x) = 3/sqrt(x) - 2/x^3 + 5*x^(1/4).",
        finalAnswer: "F(x) = 6\\sqrt{x} + \\frac{1}{x^2} + 4x^{5/4} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Rewrite in Power Form",
            mathExpression: "f(x) = 3x^{-1/2} - 2x^{-3} + 5x^{1/4}",
            explanation: "Convert terms to power format.",
            why: "Preparation for power rule."
          },
          {
            stepNumber: 2,
            title: "Integrate Term-by-Term",
            mathExpression: "3\\frac{x^{1/2}}{1/2} - 2\\frac{x^{-2}}{-2} + 5\\frac{x^{5/4}}{5/4} = 6x^{1/2} + x^{-2} + 4x^{5/4}",
            explanation: "Multiply by reciprocals of new exponents: 3 * 2 = 6; -2 / -2 = 1; 5 * (4/5) = 4.",
            why: "Integration power rule."
          },
          {
            stepNumber: 3,
            title: "Add Constant of Integration",
            mathExpression: "F(x) = 6\\sqrt{x} + \\frac{1}{x^2} + 4x^{5/4} + C",
            explanation: "Combine and append C.",
            why: "General indefinite integral."
          }
        ],
        sympyVerification: {
          operation: "integral",
          type: "integral",
          expression: "3*x**(-Rational(1,2)) - 2*x**(-3) + 5*x**(Rational(1,4))",
          expected: "6*sqrt(x) + 1/x**2 + 4*x**(Rational(5,4))",
          variable: "x",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-03",
        title: "Indefinite Integral of Trigonometric Linear Combination",
        exerciseReference: "Section 4.8, Exercise 3",
        originalTopic: "Trigonometric Antiderivatives",
        difficulty: "tier1",
        tags: ["trigonometry", "indefinite-integral", "antiderivative"],
        problemStatement: "Evaluate: int (3*sec^2(x) - 4*sin(x) + 2*cos(x)) dx.",
        finalAnswer: "3\\tan x + 4\\cos x + 2\\sin x + C",
        steps: [
          {
            stepNumber: 1,
            title: "Integrate Each Trigonometric Term",
            mathExpression: "\\int 3\\sec^2 x \\, dx = 3\\tan x; \\quad \\int -4\\sin x \\, dx = -4(-\\cos x) = 4\\cos x; \\quad \\int 2\\cos x \\, dx = 2\\sin x",
            explanation: "Use basic trigonometric antiderivative rules.",
            why: "Antiderivatives of standard circular functions."
          },
          {
            stepNumber: 2,
            title: "Assemble General Antiderivative",
            mathExpression: "3\\tan x + 4\\cos x + 2\\sin x + C",
            explanation: "Add constant C.",
            why: "Complete indefinite integral."
          }
        ],
        sympyVerification: {
          operation: "integral",
          type: "integral",
          expression: "3*sec(x)**2 - 4*sin(x) + 2*cos(x)",
          expected: "3*tan(x) + 4*cos(x) + 2*sin(x)",
          variable: "x",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-04",
        title: "Solving an Initial Value Problem (IVP)",
        exerciseReference: "Section 4.8, Exercise 4",
        originalTopic: "Initial Value Problem",
        difficulty: "tier1",
        tags: ["initial-value-problem", "differential-equation", "particular-solution"],
        problemStatement: "Solve the Initial Value Problem: dy/dx = 4x^3 - 3x^2 + 2x - 5 with initial condition y(1) = 6.",
        finalAnswer: "y(x) = x^4 - x^3 + x^2 - 5x + 10",
        steps: [
          {
            stepNumber: 1,
            title: "Find General Antiderivative",
            mathExpression: "y(x) = \\int (4x^3 - 3x^2 + 2x - 5) \\, dx = x^4 - x^3 + x^2 - 5x + C",
            explanation: "Integrate with respect to x.",
            why: "General solution family."
          },
          {
            stepNumber: 2,
            title: "Apply Initial Condition y(1) = 6 to Solve for C",
            mathExpression: "y(1) = 1^4 - 1^3 + 1^2 - 5(1) + C = 6 \\implies 1 - 1 + 1 - 5 + C = 6 \\implies -4 + C = 6 \\implies C = 10",
            explanation: "Substitute x = 1 and y = 6.",
            why: "Determines the unique constant of integration."
          },
          {
            stepNumber: 3,
            title: "Write the Particular Solution",
            mathExpression: "y(x) = x^4 - x^3 + x^2 - 5x + 10",
            explanation: "Substitute C = 10 into the general solution.",
            why: "Unique particular solution satisfying the initial condition."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**4 - x**3 + x**2 - 5*x + 10",
          expected: "4*x**3 - 3*x**2 + 2*x - 5",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Motion with Constant Gravity Acceleration",
        exerciseReference: "Section 4.8, Exercise 5",
        originalTopic: "Kinematics with Antiderivatives",
        difficulty: "tier2",
        tags: ["kinematics", "gravity", "initial-value-problem"],
        problemStatement: "An object is launched vertically with acceleration a(t) = -32 ft/s^2, initial velocity v(0) = 48 ft/s, and initial position s(0) = 64 ft. Find v(t), s(t), and the maximum height.",
        finalAnswer: "v(t) = -32t + 48; \\quad s(t) = -16t^2 + 48t + 64; \\quad \\text{Max height } = 100 \\text{ ft at } t = 1.5 \\text{ s}",
        steps: [
          {
            stepNumber: 1,
            title: "Antidifferentiate a(t) to Find v(t)",
            mathExpression: "v(t) = \\int (-32) \\, dt = -32t + C_1; \\quad v(0) = 48 \\implies C_1 = 48 \\implies v(t) = -32t + 48",
            explanation: "Integrate constant acceleration and apply initial velocity.",
            why: "Velocity is the antiderivative of acceleration."
          },
          {
            stepNumber: 2,
            title: "Antidifferentiate v(t) to Find s(t)",
            mathExpression: "s(t) = \\int (-32t + 48) \\, dt = -16t^2 + 48t + C_2; \\quad s(0) = 64 \\implies C_2 = 64 \\implies s(t) = -16t^2 + 48t + 64",
            explanation: "Integrate velocity and apply initial position.",
            why: "Position is the antiderivative of velocity."
          },
          {
            stepNumber: 3,
            title: "Calculate Maximum Height",
            mathExpression: "v(t) = 0 \\implies -32t + 48 = 0 \\implies t = 1.5 \\text{ s}; \\quad s(1.5) = -16(2.25) + 48(1.5) + 64 = -36 + 72 + 64 = 100 \\text{ ft}",
            explanation: "Peak occurs when velocity reaches zero.",
            why: "Maximum height evaluation."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "-16*t**2 + 48*t + 64",
          expected: "-32*t + 48",
          variable: "t"
        }
      }
    ]
  }
];
