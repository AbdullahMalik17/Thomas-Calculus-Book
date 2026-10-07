// scripts/curriculum-data-ch03-part3.ts
/**
 * Authoritative Curriculum Data for Chapter 3 Sections 3.5 to 3.9
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH03_SECTIONS_PART3: SectionDef[] = [
  {
    chapter: "ch03",
    chapterDir: "ch03-derivatives",
    section: "3.5",
    sectionDir: "3.5-derivatives-of-trigonometric-functions",
    title: "Derivatives of Trigonometric Functions",
    definitions: [
      {
        id: "theorem-six-trig-derivatives",
        title: "Derivatives of the Six Trigonometric Functions",
        category: "theorem",
        latex: "\\frac{d}{dx}[\\sin x] = \\cos x, \\; \\frac{d}{dx}[\\cos x] = -\\sin x, \\; \\frac{d}{dx}[\\tan x] = \\sec^2 x, \\; \\frac{d}{dx}[\\sec x] = \\sec x \\tan x, \\; \\frac{d}{dx}[\\csc x] = -\\csc x \\cot x, \\; \\frac{d}{dx}[\\cot x] = -\\csc^2 x",
        statement: "The derivatives of all six trigonometric functions exist wherever the functions are defined, with radian measure assumed throughout.",
        conditions: ["x measured in radians", "x is in the domain of the respective trig function"],
        explanation: "Notice the cofunction pattern: every 'co' function (cosine, cotangent, cosecant) has a negative sign in its derivative.",
        keyTakeaway: "All 'co' trigonometric derivatives have a negative sign."
      }
    ],
    summaryMDX: `# Section 3.5: Derivatives of Trigonometric Functions

Trigonometric functions model periodic and oscillatory phenomena. Their derivatives depend fundamentally on radian angle measure.

---

## 1. Primary Derivatives

$$
\\frac{d}{dx}[\\sin x] = \\cos x, \\qquad \\frac{d}{dx}[\\cos x] = -\\sin x
$$

---

## 2. Derived Trigonometric Rules

Using the Quotient Rule:
- $\\frac{d}{dx}[\\tan x] = \\sec^2 x$
- $\\frac{d}{dx}[\\sec x] = \\sec x \\tan x$
- $\\frac{d}{dx}[\\cot x] = -\\csc^2 x$
- $\\frac{d}{dx}[\\csc x] = -\\csc x \\cot x$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Product Rule with Sine and Cosine",
        exerciseReference: "Section 3.5, Exercise 1",
        originalTopic: "Trigonometric Product Rule",
        difficulty: "tier1",
        tags: ["trigonometry", "product-rule", "derivative"],
        problemStatement: "Differentiate y = x^2*sin(x) + 2x*cos(x) - 2*sin(x).",
        finalAnswer: "\\frac{dy}{dx} = x^2 \\cos x",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate Each Group Using Product Rule",
            mathExpression: "\\frac{d}{dx}[x^2 \\sin x] = 2x\\sin x + x^2\\cos x; \\quad \\frac{d}{dx}[2x\\cos x] = 2\\cos x - 2x\\sin x; \\quad \\frac{d}{dx}[-2\\sin x] = -2\\cos x",
            explanation: "Differentiate each term individually.",
            why: "Linearity of derivative operator."
          },
          {
            stepNumber: 2,
            title: "Combine and Cancel Terms",
            mathExpression: "(2x\\sin x + x^2\\cos x) + (2\\cos x - 2x\\sin x) - 2\\cos x = x^2\\cos x",
            explanation: "Notice that 2x*sin(x) cancels with -2x*sin(x), and 2*cos(x) cancels with -2*cos(x).",
            why: "Algebraic cancellation yields a single term."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**2*sin(x) + 2*x*cos(x) - 2*sin(x)",
          expected: "x**2*cos(x)",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Quotient Rule with Secant and Tangent",
        exerciseReference: "Section 3.5, Exercise 2",
        originalTopic: "Trigonometric Quotient Rule",
        difficulty: "tier2",
        tags: ["trigonometry", "quotient-rule", "secant"],
        problemStatement: "Differentiate y = sec(x) / (1 + tan(x)).",
        finalAnswer: "\\frac{dy}{dx} = \\frac{\\sec(x)(\\tan(x) - 1)}{(1 + \\tan(x))^2}",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Quotient Rule",
            mathExpression: "y' = \\frac{\\frac{d}{dx}[\\sec x](1 + \\tan x) - \\sec x \\frac{d}{dx}[1 + \\tan x]}{(1 + \\tan x)^2}",
            explanation: "Set up the quotient rule formula.",
            why: "Quotient rule structure."
          },
          {
            stepNumber: 2,
            title: "Substitute Derivatives and Factor",
            mathExpression: "\\frac{(\\sec x \\tan x)(1 + \\tan x) - \\sec x(\\sec^2 x)}{(1 + \\tan x)^2} = \\frac{\\sec x [\\tan x + \\tan^2 x - \\sec^2 x]}{(1 + \\tan x)^2}",
            explanation: "Factor out sec(x) from both terms in the numerator.",
            why: "Factoring exposes trigonometric identities."
          },
          {
            stepNumber: 3,
            title: "Use Pythagorean Identity tan^2(x) - sec^2(x) = -1",
            mathExpression: "\\tan^2 x - \\sec^2 x = -1 \\implies y' = \\frac{\\sec x (\\tan x - 1)}{(1 + \\tan x)^2}",
            explanation: "Replace tan^2(x) - sec^2(x) with -1.",
            why: "Fundamental Pythagorean identity 1 + tan^2(x) = sec^2(x)."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "sec(x)/(1 + tan(x))",
          expected: "sec(x)*(tan(x) - 1)/(1 + tan(x))**2",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Tangent Line to a Trigonometric Curve",
        exerciseReference: "Section 3.5, Exercise 3",
        originalTopic: "Trigonometric Tangents",
        difficulty: "tier1",
        tags: ["tangent-line", "trigonometry", "slope"],
        problemStatement: "Find the equation of the tangent line to y = 3*tan(x) - 2*cos(x) at x = 0.",
        finalAnswer: "y = 3x - 2",
        steps: [
          {
            stepNumber: 1,
            title: "Find y-Coordinate at x = 0",
            mathExpression: "y(0) = 3\\tan(0) - 2\\cos(0) = 3(0) - 2(1) = -2",
            explanation: "Evaluate the function at x = 0 to get point (0, -2).",
            why: "Point of tangency."
          },
          {
            stepNumber: 2,
            title: "Compute Derivative y'",
            mathExpression: "y' = 3\\sec^2 x - 2(-\\sin x) = 3\\sec^2 x + 2\\sin x",
            explanation: "Differentiate each trigonometric term.",
            why: "Standard trigonometric derivatives."
          },
          {
            stepNumber: 3,
            title: "Evaluate Slope at x = 0 and Form Line Equation",
            mathExpression: "m = y'(0) = 3\\sec^2(0) + 2\\sin(0) = 3(1) + 0 = 3; \\quad y - (-2) = 3(x - 0) \\implies y = 3x - 2",
            explanation: "Substitute slope m = 3 and point (0, -2) into point-slope form.",
            why: "Tangent line equation."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "3*tan(x) - 2*cos(x)",
          expected: "3*sec(x)**2 + 2*sin(x)",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Proof of the Derivative of Tangent Function",
        exerciseReference: "Section 3.5, Exercise 4",
        originalTopic: "Proof of Tan Derivative",
        difficulty: "tier2",
        tags: ["proof", "tangent", "quotient-rule"],
        problemStatement: "Prove that d/dx[tan x] = sec^2(x) using the quotient identity tan(x) = sin(x)/cos(x).",
        finalAnswer: "\\frac{d}{dx}[\\tan x] = \\sec^2 x",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Quotient Rule to sin(x)/cos(x)",
            mathExpression: "\\frac{d}{dx}\\left[\\frac{\\sin x}{\\cos x}\\right] = \\frac{(\\cos x)(\\cos x) - (\\sin x)(-\\sin x)}{\\cos^2 x}",
            explanation: "Numerator derivative is cos(x); denominator derivative is -sin(x).",
            why: "Quotient rule."
          },
          {
            stepNumber: 2,
            title: "Simplify Numerator via Pythagorean Identity",
            mathExpression: "\\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x} = \\sec^2 x",
            explanation: "Apply cos^2(x) + sin^2(x) = 1 and reciprocal identity 1/cos(x) = sec(x).",
            why: "Pythagorean and reciprocal trigonometric identities."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "tan(x)",
          expected: "sec(x)**2",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Higher-Order Derivatives of Sine (Cyclic Pattern)",
        exerciseReference: "Section 3.5, Exercise 5",
        originalTopic: "Higher Order Trig Derivatives",
        difficulty: "tier2",
        tags: ["higher-derivatives", "periodicity", "sine"],
        problemStatement: "Determine the 50th derivative of f(x) = sin(x).",
        finalAnswer: "f^{(50)}(x) = -\\sin x",
        steps: [
          {
            stepNumber: 1,
            title: "Establish the 4-Cycle Pattern of Derivatives",
            mathExpression: "f'(x) = \\cos x, \\quad f''(x) = -\\sin x, \\quad f'''(x) = -\\cos x, \\quad f^{(4)}(x) = \\sin x",
            explanation: "The derivatives of sin(x) repeat in a cycle of length 4.",
            why: "Differentiation cycle of circular functions."
          },
          {
            stepNumber: 2,
            title: "Reduce Exponent Modulo 4",
            mathExpression: "50 = 4 \\times 12 + 2 \\implies 50 \\equiv 2 \\pmod 4",
            explanation: "Divide 50 by the cycle length 4; the remainder is 2.",
            why: "Cyclic repetition allows modular reduction."
          },
          {
            stepNumber: 3,
            title: "Conclude with the Second Derivative",
            mathExpression: "f^{(50)}(x) = f''(x) = -\\sin x",
            explanation: "The 50th derivative is identical to the second derivative.",
            why: "Cycle alignment."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "sin(x)",
          expected: "-sin(x)",
          variable: "x",
          order: 2
        }
      }
    ]
  },
  {
    chapter: "ch03",
    chapterDir: "ch03-derivatives",
    section: "3.6",
    sectionDir: "3.6-the-chain-rule",
    title: "The Chain Rule",
    definitions: [
      {
        id: "theorem-chain-rule",
        title: "The Chain Rule for Composite Functions",
        category: "theorem",
        latex: "\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x), \\qquad \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}",
        statement: "If g is differentiable at x and f is differentiable at g(x), then the composite function F(x) = f(g(x)) is differentiable at x, and its derivative is the derivative of the outer function evaluated at the inner function times the derivative of the inner function.",
        conditions: ["Inner function g differentiable at x", "Outer function f differentiable at g(x)"],
        explanation: "Rate of change multiplies across successive transformations: if y changes twice as fast as u, and u changes three times as fast as x, y changes 6 times as fast as x.",
        keyTakeaway: "Differentiate outside leaving inside alone, then multiply by derivative of inside."
      },
      {
        id: "rule-generalized-power-rule",
        title: "The Generalized Power Rule",
        category: "rule",
        latex: "\\frac{d}{dx}[u(x)^n] = n [u(x)]^{n-1} \\cdot u'(x)",
        statement: "The derivative of any differentiable function raised to a real power n is n times the function to the power (n-1) times the derivative of the function.",
        conditions: ["u(x) is differentiable", "u(x) > 0 if n is not an integer"],
        explanation: "Specialization of the chain rule where outer function is f(u) = u^n.",
        keyTakeaway: "Never forget to multiply by u'(x) when differentiating [u(x)]^n."
      }
    ],
    summaryMDX: `# Section 3.6: The Chain Rule

The Chain Rule is the most powerful differentiation tool in calculus, enabling differentiation of nested and composite functions.

---

## 1. Theorem and Notations

- **Function Notation**:
  $$
  \\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)
  $$
- **Leibniz Notation**: If $y = f(u)$ and $u = g(x)$:
  $$
  \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}
  $$

---

## 2. Repeated Chain Rule

For multiple nested compositions $y = f(g(h(x)))$:

$$
\\frac{dy}{dx} = f'(g(h(x))) \\cdot g'(h(x)) \\cdot h'(x)
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Generalized Power Rule on a Polynomial",
        exerciseReference: "Section 3.6, Exercise 1",
        originalTopic: "Generalized Power Rule",
        difficulty: "tier1",
        tags: ["chain-rule", "power-rule", "composite"],
        problemStatement: "Differentiate y = (3x^2 - 5x + 1)^4.",
        finalAnswer: "\\frac{dy}{dx} = 4(3x^2 - 5x + 1)^3(6x - 5)",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Inner Function u and Outer Function f",
            mathExpression: "u = 3x^2 - 5x + 1, \\quad y = u^4",
            explanation: "Set u equal to the inside polynomial.",
            why: "Chain rule decomposition."
          },
          {
            stepNumber: 2,
            title: "Differentiate Inner and Outer Functions",
            mathExpression: "\\frac{dy}{du} = 4u^3, \\quad \\frac{du}{dx} = 6x - 5",
            explanation: "Differentiate y with respect to u and u with respect to x.",
            why: "Component derivatives."
          },
          {
            stepNumber: 3,
            title: "Multiply and Substitute Back u",
            mathExpression: "\\frac{dy}{dx} = 4u^3 \\frac{du}{dx} = 4(3x^2 - 5x + 1)^3(6x - 5)",
            explanation: "Assemble via chain rule dy/dx = (dy/du)(du/dx).",
            why: "Chain rule formula."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "(3*x**2 - 5*x + 1)**4",
          expected: "4*(3*x**2 - 5*x + 1)**3*(6*x - 5)",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Repeated Chain Rule with Trigonometric Powers",
        exerciseReference: "Section 3.6, Exercise 2",
        originalTopic: "Repeated Chain Rule",
        difficulty: "tier2",
        tags: ["chain-rule", "trigonometry", "repeated-composition"],
        problemStatement: "Differentiate y = sin^3(4x) = (sin(4x))^3.",
        finalAnswer: "\\frac{dy}{dx} = 12\\sin^2(4x)\\cos(4x)",
        steps: [
          {
            stepNumber: 1,
            title: "Identify the Three-Stage Composition",
            mathExpression: "y = u^3, \\quad u = \\sin(v), \\quad v = 4x",
            explanation: "Decompose into outer cube, middle sine, and inner linear function.",
            why: "Three-tier composite structure."
          },
          {
            stepNumber: 2,
            title: "Differentiate Each Stage",
            mathExpression: "\\frac{dy}{du} = 3u^2, \\quad \\frac{du}{v} = \\cos v, \\quad \\frac{dv}{dx} = 4",
            explanation: "Compute the three intermediate derivatives.",
            why: "Leibniz chain rule components."
          },
          {
            stepNumber: 3,
            title: "Multiply Chain Factors",
            mathExpression: "\\frac{dy}{dx} = 3(\\sin(4x))^2 \\cdot \\cos(4x) \\cdot 4 = 12\\sin^2(4x)\\cos(4x)",
            explanation: "Multiply factors together.",
            why: "Repeated chain rule."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "sin(4*x)**3",
          expected: "12*sin(4*x)**2*cos(4*x)",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Chain Rule on Square Root of a Quotient",
        exerciseReference: "Section 3.6, Exercise 3",
        originalTopic: "Radical Quotient Chain Rule",
        difficulty: "tier2",
        tags: ["chain-rule", "quotient-rule", "radicals"],
        problemStatement: "Find dy/dx for y = sqrt((x + 1)/(x - 1)).",
        finalAnswer: "\\frac{dy}{dx} = -\\frac{1}{(x - 1)^2 \\sqrt{\\frac{x + 1}{x - 1}}} = -\\frac{1}{(x - 1)\\sqrt{x^2 - 1}}",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Outer Power Rule (Exponent 1/2)",
            mathExpression: "\\frac{dy}{dx} = \\frac{1}{2}\\left(\\frac{x + 1}{x - 1}\\right)^{-1/2} \\cdot \\frac{d}{dx}\\left[\\frac{x + 1}{x - 1}\\right]",
            explanation: "Differentiate the outer square root.",
            why: "Power rule for outer function."
          },
          {
            stepNumber: 2,
            title: "Differentiate the Inner Quotient",
            mathExpression: "\\frac{d}{dx}\\left[\\frac{x + 1}{x - 1}\\right] = \\frac{1(x - 1) - (x + 1)(1)}{(x - 1)^2} = \\frac{-2}{(x - 1)^2}",
            explanation: "Apply quotient rule to the inner rational function.",
            why: "Quotient rule for inner derivative."
          },
          {
            stepNumber: 3,
            title: "Combine Factors",
            mathExpression: "\\frac{1}{2}\\left(\\frac{x + 1}{x - 1}\\right)^{-1/2} \\cdot \\frac{-2}{(x - 1)^2} = -\\frac{1}{(x - 1)^2}\\sqrt{\\frac{x - 1}{x + 1}}",
            explanation: "Multiply and cancel factor of 2.",
            why: "Final algebraic consolidation."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "sqrt((x + 1)/(x - 1))",
          expected: "-1/((x - 1)**2*sqrt((x + 1)/(x - 1)))",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Chain Rule with Nested Trigonometric Functions",
        exerciseReference: "Section 3.6, Exercise 4",
        originalTopic: "Nested Trigonometry",
        difficulty: "tier2",
        tags: ["chain-rule", "trigonometry", "nested"],
        problemStatement: "Differentiate y = tan(cos(2x)).",
        finalAnswer: "\\frac{dy}{dx} = -2\\sec^2(\\cos(2x))\\sin(2x)",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate Outer Tangent Function",
            mathExpression: "\\frac{dy}{dx} = \\sec^2(\\cos(2x)) \\cdot \\frac{d}{dx}[\\cos(2x)]",
            explanation: "d/du[tan u] = sec^2(u) with u = cos(2x).",
            why: "Outer derivative."
          },
          {
            stepNumber: 2,
            title: "Differentiate Middle Cosine Function",
            mathExpression: "\\frac{d}{dx}[\\cos(2x)] = -\\sin(2x) \\cdot \\frac{d}{dx}[2x] = -2\\sin(2x)",
            explanation: "Chain rule on cos(2x).",
            why: "Middle derivative times inner derivative."
          },
          {
            stepNumber: 3,
            title: "Combine",
            mathExpression: "\\frac{dy}{dx} = -2\\sec^2(\\cos(2x))\\sin(2x)",
            explanation: "Multiply the chain of derivatives.",
            why: "Complete chain rule result."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "tan(cos(2*x))",
          expected: "-2*sin(2*x)*sec(cos(2*x))**2",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Tangent Line to a High-Power Polynomial",
        exerciseReference: "Section 3.6, Exercise 5",
        originalTopic: "Chain Rule Tangent Line",
        difficulty: "tier1",
        tags: ["tangent-line", "chain-rule", "power-rule"],
        problemStatement: "Find the equation of the tangent line to y = (2x - 1)^5 at x = 1.",
        finalAnswer: "y = 10x - 9",
        steps: [
          {
            stepNumber: 1,
            title: "Find y-Coordinate at x = 1",
            mathExpression: "y(1) = (2(1) - 1)^5 = 1^5 = 1",
            explanation: "Point of tangency is (1, 1).",
            why: "Contact point evaluation."
          },
          {
            stepNumber: 2,
            title: "Differentiate via Chain Rule",
            mathExpression: "y' = 5(2x - 1)^4 \\cdot \\frac{d}{dx}[2x - 1] = 5(2x - 1)^4 (2) = 10(2x - 1)^4",
            explanation: "Apply generalized power rule.",
            why: "Derivative function."
          },
          {
            stepNumber: 3,
            title: "Evaluate Slope and Construct Tangent Line",
            mathExpression: "m = y'(1) = 10(1)^4 = 10; \\quad y - 1 = 10(x - 1) \\implies y = 10x - 9",
            explanation: "Apply point-slope formula with m = 10 and (1, 1).",
            why: "Tangent line equation."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "(2*x - 1)**5",
          expected: "10*(2*x - 1)**4",
          variable: "x"
        }
      }
    ]
  },
  {
    chapter: "ch03",
    chapterDir: "ch03-derivatives",
    section: "3.7",
    sectionDir: "3.7-implicit-differentiation",
    title: "Implicit Differentiation",
    definitions: [
      {
        id: "def-implicit-differentiation",
        title: "Implicit Differentiation Technique",
        category: "rule",
        latex: "\\frac{d}{dx}[F(x, y)] = 0 \\implies \\text{apply chain rule with } \\frac{d}{dx}[g(y)] = g'(y)\\frac{dy}{dx}, \\text{ then solve for } \\frac{dy}{dx}",
        statement: "When an equation F(x, y) = 0 defines y implicitly as a differentiable function of x, differentiate both sides with respect to x treating y as a function of x, then isolate dy/dx algebraically.",
        conditions: ["Equation defines y as a locally differentiable function of x", "Denominator in dy/dx expression is non-zero"],
        explanation: "Avoids having to solve explicitly for y, which is often difficult or impossible.",
        keyTakeaway: "Every time you differentiate a term with y with respect to x, append dy/dx."
      }
    ],
    summaryMDX: `# Section 3.7: Implicit Differentiation

Many important geometric curves (circles, ellipses, hyperbolas, folia) are defined **implicitly** by equations relating $x$ and $y$, rather than explicit formulas $y = f(x)$.

---

## 1. The Implicit Differentiation Algorithm

1. Differentiate both sides of the equation with respect to $x$.
2. Apply the Chain Rule whenever differentiating terms containing $y$:
   $$
   \\frac{d}{dx}[y^n] = n y^{n-1} \\frac{dy}{dx}, \\qquad \\frac{d}{dx}[\\sin y] = \\cos y \\frac{dy}{dx}
   $$
3. Collect all terms containing $\\frac{dy}{dx}$ on one side, and all other terms on the opposite side.
4. Factor out $\\frac{dy}{dx}$ and divide to solve for the derivative.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Tangent Line to a Circle via Implicit Differentiation",
        exerciseReference: "Section 3.7, Exercise 1",
        originalTopic: "Implicit Circle Tangent",
        difficulty: "tier1",
        tags: ["implicit-differentiation", "circle", "tangent-line"],
        problemStatement: "Find dy/dx for the circle x^2 + y^2 = 25, and find the equation of the tangent line at (3, 4).",
        finalAnswer: "\\frac{dy}{dx} = -\\frac{x}{y}; \\quad \\text{Tangent at (3, 4): } y - 4 = -\\frac{3}{4}(x - 3) \\iff 3x + 4y = 25",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate Both Sides with Respect to x",
            mathExpression: "\\frac{d}{dx}[x^2] + \\frac{d}{dx}[y^2] = \\frac{d}{dx}[25] \\implies 2x + 2y\\frac{dy}{dx} = 0",
            explanation: "Apply chain rule to y^2, producing 2y dy/dx.",
            why: "Implicit differentiation rule."
          },
          {
            stepNumber: 2,
            title: "Solve Algebraically for dy/dx",
            mathExpression: "2y\\frac{dy}{dx} = -2x \\implies \\frac{dy}{dx} = -\\frac{x}{y} \\quad (y \\neq 0)",
            explanation: "Subtract 2x and divide by 2y.",
            why: "Isolating dy/dx."
          },
          {
            stepNumber: 3,
            title: "Evaluate Slope at (3, 4) and Write Line Equation",
            mathExpression: "m = -\\frac{3}{4}; \\quad y - 4 = -\\frac{3}{4}(x - 3) \\implies 4y - 16 = -3x + 9 \\implies 3x + 4y = 25",
            explanation: "Substitute (3, 4) into dy/dx and apply point-slope form.",
            why: "Tangent line equation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "2*x + 2*y*(-x/y)",
          expected: "0",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Tangent to the Folium of Descartes",
        exerciseReference: "Section 3.7, Exercise 2",
        originalTopic: "Folium of Descartes",
        difficulty: "tier2",
        tags: ["implicit-differentiation", "product-rule", "folium"],
        problemStatement: "Find dy/dx for x^3 + y^3 = 6xy, and determine the tangent slope at (3, 3).",
        finalAnswer: "\\frac{dy}{dx} = \\frac{2y - x^2}{y^2 - 2x}; \\quad \\text{Slope at (3, 3) } = -1",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate Both Sides Term-by-Term",
            mathExpression: "3x^2 + 3y^2\\frac{dy}{dx} = 6\\left(1 \\cdot y + x\\frac{dy}{dx}\\right) = 6y + 6x\\frac{dy}{dx}",
            explanation: "Apply product rule to 6xy: d/dx[6xy] = 6y + 6x(dy/dx).",
            why: "Product rule combined with chain rule."
          },
          {
            stepNumber: 2,
            title: "Group dy/dx Terms and Factor",
            mathExpression: "3y^2\\frac{dy}{dx} - 6x\\frac{dy}{dx} = 6y - 3x^2 \\implies 3(y^2 - 2x)\\frac{dy}{dx} = 3(2y - x^2)",
            explanation: "Collect dy/dx terms on the left.",
            why: "Linear grouping for isolation."
          },
          {
            stepNumber: 3,
            title: "Solve for dy/dx and Evaluate at (3, 3)",
            mathExpression: "\\frac{dy}{dx} = \\frac{2y - x^2}{y^2 - 2x} \\implies \\frac{dy}{dx}\\Big|_{(3,3)} = \\frac{2(3) - 3^2}{3^2 - 2(3)} = \\frac{6 - 9}{9 - 6} = \\frac{-3}{3} = -1",
            explanation: "Divide by (y^2 - 2x) and evaluate at point (3, 3).",
            why: "Tangent slope at specified point."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "(2*3 - 3**2)/(3**2 - 2*3)",
          expected: "-1"
        }
      },
      {
        filename: "ex-03",
        title: "Implicit Differentiation with Symmetrical Product",
        exerciseReference: "Section 3.7, Exercise 3",
        originalTopic: "Mixed Products",
        difficulty: "tier2",
        tags: ["implicit-differentiation", "mixed-terms", "product-rule"],
        problemStatement: "Find dy/dx for x^2*y + y^2*x = 6.",
        finalAnswer: "\\frac{dy}{dx} = -\\frac{2xy + y^2}{x^2 + 2xy}",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate Each Product Term",
            mathExpression: "\\frac{d}{dx}[x^2 y] = 2xy + x^2\\frac{dy}{dx}; \\quad \\frac{d}{dx}[y^2 x] = 2y\\frac{dy}{dx}x + y^2(1) = y^2 + 2xy\\frac{dy}{dx}",
            explanation: "Apply product rule to both terms.",
            why: "Both terms involve products of functions of x."
          },
          {
            stepNumber: 2,
            title: "Assemble and Solve for dy/dx",
            mathExpression: "(2xy + y^2) + (x^2 + 2xy)\\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = -\\frac{2xy + y^2}{x^2 + 2xy}",
            explanation: "Isolate dy/dx.",
            why: "Standard algebraic solving."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "(2*x*y + y**2) + (x**2 + 2*x*y)*(- (2*x*y + y**2)/(x**2 + 2*x*y))",
          expected: "0",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Implicit Second Derivative of an Ellipse",
        exerciseReference: "Section 3.7, Exercise 4",
        originalTopic: "Implicit Second Derivative",
        difficulty: "tier3",
        tags: ["second-derivative", "implicit-differentiation", "ellipse"],
        problemStatement: "Find d^2y/dx^2 for the ellipse 2x^2 + 3y^2 = 6 in terms of y alone.",
        finalAnswer: "\\frac{d^2y}{dx^2} = -\\frac{4}{3y^3}",
        steps: [
          {
            stepNumber: 1,
            title: "Find First Derivative dy/dx",
            mathExpression: "4x + 6y\\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = -\\frac{2x}{3y}",
            explanation: "Differentiate implicitly once.",
            why: "First derivative calculation."
          },
          {
            stepNumber: 2,
            title: "Differentiate dy/dx via Quotient Rule",
            mathExpression: "\\frac{d^2y}{dx^2} = -\\frac{2}{3}\\frac{1 \\cdot y - x \\frac{dy}{dx}}{y^2} = -\\frac{2}{3}\\frac{y - x\\left(-\\frac{2x}{3y}\\right)}{y^2} = -\\frac{2}{3}\\frac{3y^2 + 2x^2}{3y^3}",
            explanation: "Apply quotient rule and substitute dy/dx = -2x/(3y).",
            why: "Second derivative via chain and quotient rules."
          },
          {
            stepNumber: 3,
            title: "Substitute the Original Curve Equation",
            mathExpression: "2x^2 + 3y^2 = 6 \\implies \\frac{d^2y}{dx^2} = -\\frac{2}{3}\\frac{6}{3y^3} = -\\frac{12}{9y^3} = -\\frac{4}{3y^3}",
            explanation: "Replace 2x^2 + 3y^2 with 6 from the original equation.",
            why: "Simplifies second derivative to depend purely on y."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "Rational(-2,3) * 6 / (3*y**3) - (-Rational(4,3)/y**3)",
          expected: "0",
          variable: "y"
        }
      },
      {
        filename: "ex-05",
        title: "Slope of a Trigonometric Implicit Relation",
        exerciseReference: "Section 3.7, Exercise 5",
        originalTopic: "Trigonometric Implicit Differentiation",
        difficulty: "tier2",
        tags: ["trigonometry", "implicit-differentiation", "origin-tangent"],
        problemStatement: "Find the slope of the curve sin(x + y) = 2x - 2y at (0, 0).",
        finalAnswer: "\\frac{dy}{dx}\\Big|_{(0,0)} = \\frac{1}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate Both Sides via Chain Rule",
            mathExpression: "\\cos(x + y)\\left(1 + \\frac{dy}{dx}\\right) = 2 - 2\\frac{dy}{dx}",
            explanation: "d/dx[sin(x+y)] = cos(x+y)*(1 + dy/dx).",
            why: "Chain rule on trigonometric composite function."
          },
          {
            stepNumber: 2,
            title: "Group dy/dx Terms",
            mathExpression: "\\cos(x + y) + \\cos(x + y)\\frac{dy}{dx} = 2 - 2\\frac{dy}{dx} \\implies [\\cos(x + y) + 2]\\frac{dy}{dx} = 2 - \\cos(x + y)",
            explanation: "Collect dy/dx on the left.",
            why: "Algebraic isolation."
          },
          {
            stepNumber: 3,
            title: "Solve and Evaluate at (0, 0)",
            mathExpression: "\\frac{dy}{dx} = \\frac{2 - \\cos(x + y)}{2 + \\cos(x + y)} \\implies \\frac{dy}{dx}\\Big|_{(0,0)} = \\frac{2 - \\cos(0)}{2 + \\cos(0)} = \\frac{2 - 1}{2 + 1} = \\frac{1}{3}",
            explanation: "Substitute x = 0, y = 0 and cos(0) = 1.",
            why: "Slope evaluation at the origin."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "(2 - 1)/(2 + 1)",
          expected: "1/3"
        }
      }
    ]
  },
  {
    chapter: "ch03",
    chapterDir: "ch03-derivatives",
    section: "3.8",
    sectionDir: "3.8-related-rates",
    title: "Related Rates",
    definitions: [
      {
        id: "def-related-rates-strategy",
        title: "Related Rates Problem-Solving Strategy",
        category: "rule",
        latex: "\\frac{d}{dt}[F(x(t), y(t))] = 0 \\implies F_x \\frac{dx}{dt} + F_y \\frac{dy}{dt} = 0",
        statement: "To solve a related rates problem: (1) Assign variables and sketch a diagram, (2) State given numerical rates and required rate, (3) Write an equation relating the variables, (4) Differentiate implicitly with respect to time t, (5) Substitute known values and solve.",
        conditions: ["All geometric and physical relations hold for all t", "Never substitute static instantaneous values before differentiating!"],
        explanation: "Substituting numerical values before differentiation turns dynamic variables into constants, falsely resulting in zero derivatives.",
        keyTakeaway: "Differentiate first with respect to time t; substitute numerical values last."
      }
    ],
    summaryMDX: `# Section 3.8: Related Rates

In related rates problems, we calculate the rate of change of one quantity in terms of the known rates of change of other related quantities, all varying with respect to time $t$.

---

## 1. Golden Rule of Related Rates

> **NEVER substitute numerical values for variables that are changing before differentiating!**
> If you substitute before differentiating, the variable becomes a constant and its derivative erroneously becomes $0$.

---

## 2. Classic Problem Archetypes

1. **Expanding Geometric Bodies**: Balloons (spheres), ripples (circles), melting ice cubes.
2. **Pythagorean Triangles**: Sliding ladders, separating ships, tracking radar.
3. **Similar Triangles**: Inverted conical water tanks, shadow cast by a moving person near a streetlight.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Expanding Spherical Balloon",
        exerciseReference: "Section 3.8, Exercise 1",
        originalTopic: "Spherical Volume Rate",
        difficulty: "tier1",
        tags: ["related-rates", "sphere", "volume"],
        problemStatement: "Air is pumped into a spherical balloon at a rate of 100 cm^3/s. How fast is the radius of the balloon increasing when the radius is 5 cm?",
        finalAnswer: "\\frac{dr}{dt} = \\frac{1}{\\pi} \\approx 0.318 \\text{ cm/s}",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Rates and Relation",
            mathExpression: "\\frac{dV}{dt} = 100 \\text{ cm}^3/\\text{s}, \\quad r = 5 \\text{ cm}, \\quad V = \\frac{4}{3}\\pi r^3",
            explanation: "Record given volume rate dV/dt and sphere volume equation.",
            why: "Problem setup."
          },
          {
            stepNumber: 2,
            title: "Differentiate with Respect to Time t",
            mathExpression: "\\frac{d}{dt}[V] = \\frac{d}{dt}\\left[\\frac{4}{3}\\pi r^3\\right] \\implies \\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}",
            explanation: "Apply chain rule: d/dt[r^3] = 3r^2 (dr/dt).",
            why: "Related rates differentiation."
          },
          {
            stepNumber: 3,
            title: "Substitute Known Values and Solve for dr/dt",
            mathExpression: "100 = 4\\pi (5^2) \\frac{dr}{dt} = 100\\pi \\frac{dr}{dt} \\implies \\frac{dr}{dt} = \\frac{100}{100\\pi} = \\frac{1}{\\pi} \\text{ cm/s}",
            explanation: "Substitute r = 5 and dV/dt = 100.",
            why: "Numerical evaluation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "100 / (4*pi * 5**2)",
          expected: "1/pi"
        }
      },
      {
        filename: "ex-02",
        title: "The Sliding Ladder",
        exerciseReference: "Section 3.8, Exercise 2",
        originalTopic: "Pythagorean Related Rates",
        difficulty: "tier2",
        tags: ["related-rates", "ladder", "pythagorean-theorem"],
        problemStatement: "A 10-ft ladder leans against a vertical wall. If the base slides away from the wall at 2 ft/s, how fast is the top of the ladder sliding down when the base is 6 ft from the wall?",
        finalAnswer: "\\frac{dy}{dt} = -\\frac{3}{2} \\text{ ft/s} \\quad (\\text{sliding down at } 1.5 \\text{ ft/s})",
        steps: [
          {
            stepNumber: 1,
            title: "State Pythagorean Relation",
            mathExpression: "x^2 + y^2 = 10^2 = 100",
            explanation: "Let x be distance from wall to base, y be height of top on wall.",
            why: "Geometric constraint."
          },
          {
            stepNumber: 2,
            title: "Find y When x = 6",
            mathExpression: "6^2 + y^2 = 100 \\implies y^2 = 64 \\implies y = 8 \\text{ ft}",
            explanation: "Solve for instantaneous height y.",
            why: "Instantaneous triangle geometry."
          },
          {
            stepNumber: 3,
            title: "Differentiate with Respect to Time t",
            mathExpression: "2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0 \\implies x\\frac{dx}{dt} + y\\frac{dy}{dt} = 0",
            explanation: "Ladder length 10 is constant, so its derivative is zero.",
            why: "Constant length constraint."
          },
          {
            stepNumber: 4,
            title: "Substitute and Solve for dy/dt",
            mathExpression: "6(2) + 8\\frac{dy}{dt} = 0 \\implies 12 + 8\\frac{dy}{dt} = 0 \\implies \\frac{dy}{dt} = -\\frac{12}{8} = -\\frac{3}{2} \\text{ ft/s}",
            explanation: "The negative sign confirms the top of the ladder is moving downwards.",
            why: "Negative rate corresponds to decreasing vertical distance."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "-(6 * 2) / 8",
          expected: "-3/2"
        }
      },
      {
        filename: "ex-03",
        title: "Filling an Inverted Conical Tank",
        exerciseReference: "Section 3.8, Exercise 3",
        originalTopic: "Similar Triangles Conical Tank",
        difficulty: "tier2",
        tags: ["related-rates", "cone", "similar-triangles"],
        problemStatement: "Water pours into an inverted cone (height 10 m, base radius 4 m) at 2 m^3/min. How fast is the water level rising when the depth is 5 m?",
        finalAnswer: "\\frac{dh}{dt} = \\frac{1}{2\\pi} \\approx 0.159 \\text{ m/min}",
        steps: [
          {
            stepNumber: 1,
            title: "Use Similar Triangles to Relate Radius and Height",
            mathExpression: "\\frac{r}{h} = \\frac{4}{10} = \\frac{2}{5} \\implies r = \\frac{2}{5}h",
            explanation: "The cross section of the conical water column forms similar triangles with the tank.",
            why: "Eliminates r to express volume solely in terms of depth h."
          },
          {
            stepNumber: 2,
            title: "Express Volume as a Single Variable Function of h",
            mathExpression: "V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\left(\\frac{2}{5}h\\right)^2 h = \\frac{4}{75}\\pi h^3",
            explanation: "Substitute r = (2/5)h into conical volume formula.",
            why: "Simplifies differentiation to a single independent variable."
          },
          {
            stepNumber: 3,
            title: "Differentiate with Respect to Time",
            mathExpression: "\\frac{dV}{dt} = \\frac{4}{75}\\pi (3h^2) \\frac{dh}{dt} = \\frac{4}{25}\\pi h^2 \\frac{dh}{dt}",
            explanation: "Apply chain rule.",
            why: "Related rates equation."
          },
          {
            stepNumber: 4,
            title: "Substitute h = 5 m and dV/dt = 2 m^3/min",
            mathExpression: "2 = \\frac{4}{25}\\pi (5^2) \\frac{dh}{dt} = 4\\pi \\frac{dh}{dt} \\implies \\frac{dh}{dt} = \\frac{2}{4\\pi} = \\frac{1}{2\\pi} \\text{ m/min}",
            explanation: "Solve for the rate of rise dh/dt.",
            why: "Final calculation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "2 / (4*pi)",
          expected: "1/(2*pi)"
        }
      },
      {
        filename: "ex-04",
        title: "Speed of Shadow Cast by a Streetlight",
        exerciseReference: "Section 3.8, Exercise 4",
        originalTopic: "Shadow Rates",
        difficulty: "tier2",
        tags: ["related-rates", "shadow", "similar-triangles"],
        problemStatement: "A 6-ft person walks away from a 15-ft streetlight at 4 ft/s. How fast is the tip of the person's shadow moving along the ground?",
        finalAnswer: "\\frac{ds}{dt} = \\frac{20}{3} \\approx 6.67 \\text{ ft/s}",
        steps: [
          {
            stepNumber: 1,
            title: "Set up Geometry via Similar Triangles",
            mathExpression: "\\frac{s}{15} = \\frac{s - x}{6}",
            explanation: "Let x be the person's distance from the pole, and s be the distance from the pole to the tip of the shadow.",
            why: "Similar triangles formed by the light pole and the person."
          },
          {
            stepNumber: 2,
            title: "Cross-Multiply and Simplify the Relation",
            mathExpression: "6s = 15(s - x) = 15s - 15x \\implies 9s = 15x \\implies s = \\frac{5}{3}x",
            explanation: "Isolate shadow tip position s in terms of person position x.",
            why: "Direct linear relationship between positions."
          },
          {
            stepNumber: 3,
            title: "Differentiate with Respect to Time",
            mathExpression: "\\frac{ds}{dt} = \\frac{5}{3}\\frac{dx}{dt} = \\frac{5}{3}(4) = \\frac{20}{3} \\text{ ft/s}",
            explanation: "Substitute dx/dt = 4 ft/s.",
            why: "Rate of change of shadow tip."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "Rational(5,3) * 4",
          expected: "Rational(20,3)"
        }
      },
      {
        filename: "ex-05",
        title: "Separation Rate of Two Ships",
        exerciseReference: "Section 3.8, Exercise 5",
        originalTopic: "Separating Vehicles",
        difficulty: "tier2",
        tags: ["related-rates", "ships", "distance"],
        problemStatement: "Ship A sails south at 20 knots, Ship B sails east at 15 knots, both leaving the same port at noon. At 2:00 PM, at what rate is the distance between them increasing?",
        finalAnswer: "\\frac{dz}{dt} = 25 \\text{ knots}",
        steps: [
          {
            stepNumber: 1,
            title: "Calculate Positions at t = 2 Hours",
            mathExpression: "x = 15(2) = 30 \\text{ nautical miles}, \\quad y = 20(2) = 40 \\text{ nautical miles}",
            explanation: "Determine distances traveled in 2 hours.",
            why: "Instantaneous coordinates."
          },
          {
            stepNumber: 2,
            title: "Compute Distance z via Pythagorean Theorem",
            mathExpression: "z = \\sqrt{x^2 + y^2} = \\sqrt{30^2 + 40^2} = \\sqrt{900 + 1600} = \\sqrt{2500} = 50 \\text{ nm}",
            explanation: "3-4-5 right triangle scaled by 10.",
            why: "Current distance."
          },
          {
            stepNumber: 3,
            title: "Differentiate Distance Equation",
            mathExpression: "z^2 = x^2 + y^2 \\implies 2z\\frac{dz}{dt} = 2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} \\implies \\frac{dz}{dt} = \\frac{x\\frac{dx}{dt} + y\\frac{dy}{dt}}{z}",
            explanation: "Implicit differentiation with respect to time.",
            why: "Related rates equation."
          },
          {
            stepNumber: 4,
            title: "Substitute Known Values",
            mathExpression: "\\frac{dz}{dt} = \\frac{30(15) + 40(20)}{50} = \\frac{450 + 800}{50} = \\frac{1250}{50} = 25 \\text{ knots}",
            explanation: "Substitute positions and velocities.",
            why: "Rate of separation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "(30*15 + 40*20) / 50",
          expected: "25"
        }
      }
    ]
  },
  {
    chapter: "ch03",
    chapterDir: "ch03-derivatives",
    section: "3.9",
    sectionDir: "3.9-linearization-and-differentials",
    title: "Linearization and Differentials",
    definitions: [
      {
        id: "def-linearization",
        title: "Linearization (Tangent Line Approximation)",
        category: "definition",
        latex: "L(x) = f(a) + f'(a)(x - a)",
        statement: "If f is differentiable at x = a, the approximating function L(x) = f(a) + f'(a)(x - a) is the linearization of f at a. The approximation f(x) approx L(x) is the standard linear approximation.",
        conditions: ["f differentiable at a", "x is near a"],
        explanation: "Replaces complicated non-linear functions with their tangent line locally around a.",
        keyTakeaway: "L(x) is the tangent line equation used as a local estimator for f(x)."
      },
      {
        id: "def-differentials",
        title: "Differentials and Propagated Error",
        category: "definition",
        latex: "dy = f'(x) dx, \\qquad \\text{Relative Error} = \\frac{dy}{y}, \\quad \\text{Percentage Error} = \\frac{dy}{y} \\times 100\\%",
        statement: "Let y = f(x) be differentiable. The differential dx is an independent variable (the increment Delta x); the differential dy is defined by dy = f'(x) dx.",
        conditions: ["dx is small"],
        explanation: "dy represents the change along the tangent line, which approximates the true change Delta y along the curve.",
        keyTakeaway: "dy = f'(x)dx estimates the true change Delta y."
      }
    ],
    summaryMDX: `# Section 3.9: Linearization and Differentials

Linearization harnesses the tangent line as an analytical computing tool, replacing complex non-linear functions with simple linear ones near a reference point $a$.

---

## 1. Linearization Formula

$$
f(x) \\approx L(x) = f(a) + f'(a)(x - a)
$$

### Important Standard Linear Approximations near $x = 0$:
- $\\sqrt{1 + x} \\approx 1 + \\frac{1}{2}x$
- $\\sin x \\approx x$
- $\\cos x \\approx 1$
- $(1 + x)^k \\approx 1 + kx$

---

## 2. Differentials and Error Propagation

If an input $x$ is measured with an uncertainty $dx$, the resulting propagated error in $y = f(x)$ is estimated by the differential:

$$
dy = f'(x) dx
$$

- **Relative Error**: $\\frac{dy}{y}$
- **Percentage Error**: $\\frac{dy}{y} \\times 100\\%$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Approximating Square Roots via Linearization",
        exerciseReference: "Section 3.9, Exercise 1",
        originalTopic: "Radical Linearization",
        difficulty: "tier1",
        tags: ["linearization", "approximation", "radicals"],
        problemStatement: "Find the linearization of f(x) = sqrt(x) at a = 25, and use it to approximate sqrt(26).",
        finalAnswer: "L(x) = 5 + \\frac{1}{10}(x - 25); \\quad \\sqrt{26} \\approx L(26) = 5.1",
        steps: [
          {
            stepNumber: 1,
            title: "Compute f(25) and f'(25)",
            mathExpression: "f(25) = \\sqrt{25} = 5, \\quad f'(x) = \\frac{1}{2\\sqrt{x}} \\implies f'(25) = \\frac{1}{2(5)} = \\frac{1}{10}",
            explanation: "Evaluate the function and its derivative at center a = 25.",
            why: "Linearization coefficients."
          },
          {
            stepNumber: 2,
            title: "Construct Linearization Formula",
            mathExpression: "L(x) = f(25) + f'(25)(x - 25) = 5 + \\frac{1}{10}(x - 25)",
            explanation: "Assemble L(x) = f(a) + f'(a)(x - a).",
            why: "Definition of linearization."
          },
          {
            stepNumber: 3,
            title: "Evaluate at x = 26",
            mathExpression: "L(26) = 5 + \\frac{1}{10}(26 - 25) = 5 + 0.1 = 5.1",
            explanation: "Substitute x = 26. Note exact sqrt(26) approx 5.0990, error < 0.001.",
            why: "Linear estimation of sqrt(26)."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "5 + Rational(1,10)*(26 - 25)",
          expected: "Rational(51,10)"
        }
      },
      {
        filename: "ex-02",
        title: "Linearization of Power Function near Zero",
        exerciseReference: "Section 3.9, Exercise 2",
        originalTopic: "Binomial Linearization",
        difficulty: "tier1",
        tags: ["linearization", "binomial", "powers"],
        problemStatement: "Use the standard linear approximation (1 + x)^k approx 1 + kx to approximate (1.02)^5.",
        finalAnswer: "(1.02)^5 \\approx 1 + 5(0.02) = 1.10",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Base Parameters",
            mathExpression: "f(x) = (1 + x)^5, \\quad k = 5, \\quad x = 0.02",
            explanation: "Represent 1.02 as 1 + 0.02.",
            why: "Expansion around a = 0."
          },
          {
            stepNumber: 2,
            title: "Apply Linear Approximation",
            mathExpression: "(1 + x)^k \\approx 1 + kx \\implies (1 + 0.02)^5 \\approx 1 + 5(0.02) = 1 + 0.10 = 1.10",
            explanation: "Substitute k = 5 and x = 0.02.",
            why: "First order Taylor/linear polynomial."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "1 + 5 * Rational(2, 100)",
          expected: "Rational(11, 10)"
        }
      },
      {
        filename: "ex-03",
        title: "Linearization of Cosine Function",
        exerciseReference: "Section 3.9, Exercise 3",
        originalTopic: "Trigonometric Linearization",
        difficulty: "tier2",
        tags: ["trigonometry", "linearization", "cosine"],
        problemStatement: "Find the linearization of f(x) = cos(x) at a = pi/3.",
        finalAnswer: "L(x) = \\frac{1}{2} - \\frac{\\sqrt{3}}{2}\\left(x - \\frac{\\pi}{3}\\right)",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Function and Derivative at a = pi/3",
            mathExpression: "f(\\pi/3) = \\cos(\\pi/3) = \\frac{1}{2}, \\quad f'(x) = -\\sin x \\implies f'(\\pi/3) = -\\sin(\\pi/3) = -\\frac{\\sqrt{3}}{2}",
            explanation: "Special trigonometric angles.",
            why: "Coefficients of the tangent line."
          },
          {
            stepNumber: 2,
            title: "Write Linearization Formula",
            mathExpression: "L(x) = \\frac{1}{2} - \\frac{\\sqrt{3}}{2}\\left(x - \\frac{\\pi}{3}\\right)",
            explanation: "Apply L(x) = f(a) + f'(a)(x - a).",
            why: "Tangent approximation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "Rational(1,2) - (sqrt(3)/2)*(x - pi/3)",
          expected: "1/2 - sqrt(3)*(x - pi/3)/2",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Differentials vs True Change Delta y",
        exerciseReference: "Section 3.9, Exercise 4",
        originalTopic: "Differentials Comparison",
        difficulty: "tier2",
        tags: ["differentials", "delta-y", "error-analysis"],
        problemStatement: "For y = 3x^2 - 5x + 2, compute dy and compare with Delta y when x changes from 2 to 2.01.",
        finalAnswer: "dy = 0.07; \\quad \\Delta y = 0.0703; \\quad |\\Delta y - dy| = 0.0003",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Differential dy",
            mathExpression: "dy = f'(x)dx = (6x - 5)dx = [6(2) - 5](0.01) = (7)(0.01) = 0.07",
            explanation: "Substitute x = 2 and dx = 0.01 into dy = f'(x)dx.",
            why: "Differential along tangent line."
          },
          {
            stepNumber: 2,
            title: "Compute True Change Delta y",
            mathExpression: "\\Delta y = f(2.01) - f(2) = [3(2.01)^2 - 5(2.01) + 2] - [3(4) - 10 + 2] = 4.0703 - 4 = 0.0703",
            explanation: "Calculate exact difference between function values.",
            why: "True increment along curve."
          },
          {
            stepNumber: 3,
            title: "Compare Accuracy",
            mathExpression: "\\Delta y - dy = 0.0703 - 0.0700 = 0.0003",
            explanation: "The differential approximates Delta y to within 3 parts in ten thousand.",
            why: "Demonstrates that dy is the principal linear part of Delta y."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "(6*2 - 5)*Rational(1, 100)",
          expected: "Rational(7, 100)"
        }
      },
      {
        filename: "ex-05",
        title: "Estimating Propagated Error in Sphere Volume",
        exerciseReference: "Section 3.9, Exercise 5",
        originalTopic: "Propagated Error in Measurement",
        difficulty: "tier2",
        tags: ["differentials", "error-propagation", "sphere-volume"],
        problemStatement: "The radius of a sphere is measured as r = 10 cm with maximum measurement error dr = +-0.05 cm. Estimate the maximum propagated error and percentage error in the calculated volume.",
        finalAnswer: "dV \\approx \\pm 20\\pi \\text{ cm}^3 \\approx \\pm 62.83 \\text{ cm}^3; \\quad \\text{Percentage Error} = \\pm 1.5\\%",
        steps: [
          {
            stepNumber: 1,
            title: "Find Differential of Volume",
            mathExpression: "V = \\frac{4}{3}\\pi r^3 \\implies dV = 4\\pi r^2 dr",
            explanation: "Differentiate volume with respect to radius.",
            why: "Differential formula for volume."
          },
          {
            stepNumber: 2,
            title: "Compute Propagated Error dV",
            mathExpression: "dV = 4\\pi (10^2)(\\pm 0.05) = 4\\pi (100)(\\pm 0.05) = \\pm 20\\pi \\text{ cm}^3",
            explanation: "Substitute r = 10 and dr = +-0.05.",
            why: "Linear estimation of measurement error propagation."
          },
          {
            stepNumber: 3,
            title: "Compute Relative and Percentage Error",
            mathExpression: "\\frac{dV}{V} = \\frac{4\\pi r^2 dr}{\\frac{4}{3}\\pi r^3} = 3\\frac{dr}{r} = 3\\left(\\frac{\\pm 0.05}{10}\\right) = \\pm 0.015 \\implies \\pm 1.5\\%",
            explanation: "Notice the relative error in volume is exactly 3 times the relative error in radius.",
            why: "For power V proportional to r^3, relative error multiplies by exponent 3."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          type: "algebraic_equivalence",
          expression: "3 * (Rational(5, 100) / 10)",
          expected: "Rational(15, 1000)"
        }
      }
    ]
  }
];
