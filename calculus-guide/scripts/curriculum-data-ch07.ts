// scripts/curriculum-data-ch07.ts
/**
 * Authoritative Curriculum Data for Chapter 7: Transcendental Functions
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH07_SECTIONS: SectionDef[] = [
  {
    chapter: "ch07",
    chapterDir: "ch07-transcendental-functions",
    section: "7.1",
    sectionDir: "7.1-inverse-functions-and-their-derivatives",
    title: "Inverse Functions and Their Derivatives",
    definitions: [
      {
        id: "theorem-derivative-of-inverse-function",
        title: "Derivative Rule for Inverses",
        category: "theorem",
        latex: "(f^{-1})'(b) = \\frac{1}{f'(a)}, \\quad \\text{where } b = f(a) \\text{ and } f'(a) \\ne 0",
        statement: "If f is one-to-one and differentiable with non-zero derivative at a, then its inverse f^(-1) is differentiable at b = f(a) and its slope is the reciprocal of the slope of f at a.",
        conditions: ["f is one-to-one", "f'(a) != 0"],
        explanation: "Reflecting a tangent line across the line y = x inverts its slope (Delta y / Delta x becomes Delta x / Delta y).",
        keyTakeaway: "The derivative of the inverse function is the reciprocal of the derivative of the original function."
      }
    ],
    summaryMDX: `# Section 7.1: Inverse Functions and Their Derivatives

A function $f$ has an inverse $f^{-1}$ if and only if it is one-to-one (passes the Horizontal Line Test).

---

## 1. Derivative of an Inverse Function

If $b = f(a)$, then:

$$
(f^{-1})'(b) = \\frac{1}{f'(f^{-1}(b))} = \\frac{1}{f'(a)}
$$

This allows calculating the slope of an inverse function without explicitly solving for its algebraic formula.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Derivative of an Inverse Function at a Specific Point",
        exerciseReference: "Section 7.1, Exercise 1",
        originalTopic: "Derivative of Inverse Function",
        difficulty: "tier1",
        tags: ["inverse-function", "derivative", "reciprocal-slope"],
        problemStatement: "Given f(x) = x^3 + 2x - 1, verify that f is one-to-one and find (f^(-1))'(2).",
        finalAnswer: "(f^{-1})'(2) = \\frac{1}{5}",
        steps: [
          {
            stepNumber: 1,
            title: "Verify One-to-One Property",
            mathExpression: "f'(x) = 3x^2 + 2 > 0 \\quad \\forall x \\in \\mathbb{R}",
            explanation: "Since f'(x) > 0 everywhere, f is strictly increasing and therefore invertible.",
            why: "Strict monotonicity implies injectivity."
          },
          {
            stepNumber: 2,
            title: "Find a such that f(a) = 2",
            mathExpression: "a^3 + 2a - 1 = 2 \\implies a^3 + 2a - 3 = 0 \\implies a = 1",
            explanation: "By inspection, f(1) = 1 + 2 - 1 = 2.",
            why: "Finding the original domain value corresponding to b = 2."
          },
          {
            stepNumber: 3,
            title: "Compute Inverse Derivative",
            mathExpression: "f'(1) = 3(1)^2 + 2 = 5 \\implies (f^{-1})'(2) = \\frac{1}{f'(1)} = \\frac{1}{5}",
            explanation: "Take the reciprocal of f'(1).",
            why: "Derivative of inverse function formula."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 / (3*1**2 + 2)",
          expected: "1/5"
        }
      },
      {
        filename: "ex-02",
        title: "Finding the Explicit Inverse Formula and Derivative",
        exerciseReference: "Section 7.1, Exercise 2",
        originalTopic: "Algebraic Inverse and Derivative",
        difficulty: "tier1",
        tags: ["algebraic-inverse", "derivative", "rational-function"],
        problemStatement: "Find the inverse of f(x) = (2x + 1)/(x - 3) and find (f^(-1))'(y).",
        finalAnswer: "f^{-1}(y) = \\frac{3y + 1}{y - 2}, \\quad (f^{-1})'(y) = -\\frac{7}{(y - 2)^2}",
        steps: [
          {
            stepNumber: 1,
            title: "Solve for x in Terms of y",
            mathExpression: "y(x - 3) = 2x + 1 \\implies yx - 3y = 2x + 1 \\implies x(y - 2) = 3y + 1 \\implies x = \\frac{3y + 1}{y - 2}",
            explanation: "Rearrange to isolate x.",
            why: "Inverse function definition."
          },
          {
            stepNumber: 2,
            title: "Differentiate Inverse Function",
            mathExpression: "\\frac{d}{dy}\\left[ \\frac{3y + 1}{y - 2} \\right] = \\frac{3(y - 2) - (3y + 1)(1)}{(y - 2)^2} = \\frac{3y - 6 - 3y - 1}{(y - 2)^2} = -\\frac{7}{(y - 2)^2}",
            explanation: "Apply quotient rule with respect to y.",
            why: "Quotient rule of differentiation."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "(3*x + 1)/(x - 2)",
          expected: "-7/(x - 2)**2",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Slope of Inverse Tangent Line",
        exerciseReference: "Section 7.1, Exercise 3",
        originalTopic: "Inverse Tangent Line",
        difficulty: "tier2",
        tags: ["inverse-tangent", "tangent-line", "cubic"],
        problemStatement: "Find the tangent line to the graph of y = f^(-1)(x) at (3, 1) where f(x) = x^5 + x + 1.",
        finalAnswer: "y - 1 = \\frac{1}{6}(x - 3) \\implies y = \\frac{1}{6}x + \\frac{1}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Verify Point on Graph",
            mathExpression: "f(1) = 1^5 + 1 + 1 = 3 \\implies f^{-1}(3) = 1",
            explanation: "Point (3, 1) on inverse corresponds to (1, 3) on f.",
            why: "Coordinate reflection."
          },
          {
            stepNumber: 2,
            title: "Compute Slope",
            mathExpression: "f'(x) = 5x^4 + 1 \\implies f'(1) = 6 \\implies m = (f^{-1})'(3) = \\frac{1}{6}",
            explanation: "Slope is 1/f'(1).",
            why: "Derivative of inverse."
          },
          {
            stepNumber: 3,
            title: "Write Tangent Line Equation",
            mathExpression: "y - 1 = \\frac{1}{6}(x - 3) \\implies y = \\frac{1}{6}x + \\frac{1}{2}",
            explanation: "Point-slope formula at (3, 1).",
            why: "Linear equation formulation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1/6)*(x - 3) + 1 - (x/6 + 1/2)",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Domain and Range Inversion for Radical Relations",
        exerciseReference: "Section 7.1, Exercise 4",
        originalTopic: "Domain and Range Inversion",
        difficulty: "tier1",
        tags: ["domain", "range", "radicals"],
        problemStatement: "Determine the domain and range of the inverse of f(x) = sqrt(2x - 4) for x >= 2.",
        finalAnswer: "\\text{Domain of } f^{-1}: [0, \\infty); \\quad \\text{Range of } f^{-1}: [2, \\infty)",
        steps: [
          {
            stepNumber: 1,
            title: "Find Domain and Range of f",
            mathExpression: "\\text{Domain}(f) = [2, \\infty); \\quad \\text{Range}(f) = [0, \\infty)",
            explanation: "f(2) = 0 and f(x) grows without bound.",
            why: "Direct function analysis."
          },
          {
            stepNumber: 2,
            title: "Invert Sets",
            mathExpression: "\\text{Domain}(f^{-1}) = \\text{Range}(f) = [0, \\infty); \\quad \\text{Range}(f^{-1}) = \\text{Domain}(f) = [2, \\infty)",
            explanation: "Domain and range swap roles for inverse functions.",
            why: "Fundamental inverse property."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "x - x",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Second Derivative of an Inverse Function",
        exerciseReference: "Section 7.1, Exercise 5",
        originalTopic: "Higher Derivatives of Inverse Functions",
        difficulty: "tier3",
        tags: ["second-derivative", "inverse-function", "chain-rule"],
        problemStatement: "Derive the formula for (f^(-1))''(b) in terms of derivatives of f.",
        finalAnswer: "(f^{-1})''(b) = -\\frac{f''(a)}{[f'(a)]^3}, \\quad \\text{where } b = f(a)",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate First Derivative Formula",
            mathExpression: "\\frac{d}{db}[(f^{-1})'(b)] = \\frac{d}{db} \\left[ \\frac{1}{f'(f^{-1}(b))} \\right]",
            explanation: "Differentiate with respect to b.",
            why: "Second derivative definition."
          },
          {
            stepNumber: 2,
            title: "Apply Chain Rule and Quotient Rule",
            mathExpression: "-\\frac{1}{[f'(f^{-1}(b))]^2} \\cdot f''(f^{-1}(b)) \\cdot (f^{-1})'(b)",
            explanation: "Inner derivative of f'(f^(-1)(b)) with respect to b is f''(f^(-1)(b)) * (f^(-1))'(b).",
            why: "Chain Rule on composite inverse."
          },
          {
            stepNumber: 3,
            title: "Substitute (f^(-1))'(b) = 1/f'(a)",
            mathExpression: "-\\frac{f''(a)}{[f'(a)]^2} \\cdot \\frac{1}{f'(a)} = -\\frac{f''(a)}{[f'(a)]^3}",
            explanation: "Combine denominator powers.",
            why: "General second derivative formula for inverse functions."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "-1 / (y**2) * (1/y) - (-1 / y**3)",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch07",
    chapterDir: "ch07-transcendental-functions",
    section: "7.2",
    sectionDir: "7.2-natural-logarithms",
    title: "Natural Logarithms",
    definitions: [
      {
        id: "def-natural-logarithm",
        title: "The Natural Logarithm as an Integral",
        category: "definition",
        latex: "\\ln(x) = \\int_1^x \\frac{1}{t} \\, dt, \\quad x > 0",
        statement: "The natural logarithm function ln(x) is defined for all x > 0 as the accumulated area under the hyperbola y = 1/t from t = 1 to t = x.",
        conditions: ["x > 0"],
        explanation: "By FTC Part 1, d/dx[ln(x)] = 1/x for all x > 0.",
        keyTakeaway: "ln(x) fills the gap in the power rule int t^(-1) dt."
      },
      {
        id: "rule-logarithmic-differentiation",
        title: "Logarithmic Differentiation",
        category: "rule",
        latex: "y = f(x) \\implies \\ln|y| = \\ln|f(x)| \\implies \\frac{y'}{y} = \\frac{d}{dx}[\\ln|f(x)|] \\implies y' = y \\frac{d}{dx}[\\ln|f(x)|]",
        statement: "Technique that simplifies products, quotients, and variable exponents by taking the natural logarithm before differentiating.",
        conditions: ["f(x) != 0"],
        explanation: "Logarithms convert products into sums and exponents into coefficients.",
        keyTakeaway: "Essential for differentiating variable-base and variable-exponent functions u(x)^v(x)."
      }
    ],
    summaryMDX: `# Section 7.2: Natural Logarithms

Defined analytically as an integral, the natural logarithm is the inverse of the natural exponential function.

---

## 1. Derivative and Integral Rules

$$
\\frac{d}{dx}[\\ln(x)] = \\frac{1}{x} \\quad (x > 0)
$$

$$
\\frac{d}{dx}[\\ln|u|] = \\frac{u'}{u}
$$

$$
\\int \\frac{1}{u} du = \\ln|u| + C
$$

---

## 2. Standard Trigonometric Antiderivatives via Logarithms

$$
\\int \\tan(x) dx = \\ln|\\sec(x)| + C = -\\ln|\\cos(x)| + C
$$

$$
\\int \\sec(x) dx = \\ln|\\sec(x) + \\tan(x)| + C
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Differentiating a Logarithmic Composite Expression",
        exerciseReference: "Section 7.2, Exercise 1",
        originalTopic: "Chain Rule with Natural Logarithm",
        difficulty: "tier1",
        tags: ["logarithm", "derivative", "chain-rule"],
        problemStatement: "Find the derivative of y = ln(x^3 + 5x).",
        finalAnswer: "\\frac{dy}{dx} = \\frac{3x^2 + 5}{x^3 + 5x}",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Derivative of ln(u)",
            mathExpression: "\\frac{d}{dx}[\\ln(u)] = \\frac{u'}{u}",
            explanation: "Set u = x^3 + 5x.",
            why: "Logarithmic Chain Rule."
          },
          {
            stepNumber: 2,
            title: "Compute u' and Form Quotient",
            mathExpression: "u' = 3x^2 + 5 \\implies \\frac{dy}{dx} = \\frac{3x^2 + 5}{x^3 + 5x}",
            explanation: "Place derivative over original function.",
            why: "Final evaluated derivative."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "log(x**3 + 5*x)",
          expected: "(3*x**2 + 5)/(x**3 + 5*x)",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Logarithmic Differentiation for a Rational Product",
        exerciseReference: "Section 7.2, Exercise 2",
        originalTopic: "Logarithmic Differentiation",
        difficulty: "tier2",
        tags: ["logarithmic-differentiation", "rational-function", "derivatives"],
        problemStatement: "Use logarithmic differentiation to find dy/dx for y = (x^2 + 1)^3 / sqrt(2x - 3).",
        finalAnswer: "\\frac{dy}{dx} = \\frac{(x^2 + 1)^3}{\\sqrt{2x - 3}} \\left( \\frac{6x}{x^2 + 1} - \\frac{1}{2x - 3} \\right)",
        steps: [
          {
            stepNumber: 1,
            title: "Take Natural Logarithm and Expand",
            mathExpression: "\\ln(y) = 3 \\ln(x^2 + 1) - \\frac{1}{2} \\ln(2x - 3)",
            explanation: "Use log laws: ln(A/B) = ln A - ln B, and ln(A^p) = p ln A.",
            why: "Expands products into linear sums."
          },
          {
            stepNumber: 2,
            title: "Differentiate Implicitly",
            mathExpression: "\\frac{y'}{y} = 3\\left(\\frac{2x}{x^2 + 1}\\right) - \\frac{1}{2}\\left(\\frac{2}{2x - 3}\\right) = \\frac{6x}{x^2 + 1} - \\frac{1}{2x - 3}",
            explanation: "Differentiate each log term.",
            why: "Term-by-term differentiation."
          },
          {
            stepNumber: 3,
            title: "Multiply by y",
            mathExpression: "y' = y \\left( \\frac{6x}{x^2 + 1} - \\frac{1}{2x - 3} \\right)",
            explanation: "Back-substitute original y.",
            why: "Isolating dy/dx."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "log((x**2 + 1)**3 / sqrt(2*x - 3))",
          expected: "6*x/(x**2 + 1) - 1/(2*x - 3)",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Definite Integral Resulting in a Natural Logarithm",
        exerciseReference: "Section 7.2, Exercise 3",
        originalTopic: "Logarithmic Antiderivative",
        difficulty: "tier1",
        tags: ["logarithm", "definite-integral", "substitution"],
        problemStatement: "Evaluate int_0^2 (2x + 1)/(x^2 + x + 1) dx.",
        finalAnswer: "\\int_0^2 \\frac{2x + 1}{x^2 + x + 1} dx = \\ln(7)",
        steps: [
          {
            stepNumber: 1,
            title: "Recognize u'/u Pattern",
            mathExpression: "u = x^2 + x + 1 \\implies du = (2x + 1) \\, dx",
            explanation: "Numerator is the exact derivative of denominator.",
            why: "u-substitution."
          },
          {
            stepNumber: 2,
            title: "Transform Integration Limits",
            mathExpression: "x = 0 \\implies u = 1; \\quad x = 2 \\implies u = 4 + 2 + 1 = 7",
            explanation: "Limits transform from [0, 2] to [1, 7].",
            why: "Definite integral substitution."
          },
          {
            stepNumber: 3,
            title: "Integrate and Evaluate",
            mathExpression: "\\int_1^7 \\frac{1}{u} du = [\\ln(u)]_1^7 = \\ln(7) - \\ln(1) = \\ln(7)",
            explanation: "Since ln(1) = 0, the result is ln(7).",
            why: "Final exact value."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "(2*x + 1)/(x**2 + x + 1)",
          expected: "log(7)",
          kind: "definite",
          lower: "0",
          upper: "2"
        }
      },
      {
        filename: "ex-04",
        title: "Antiderivative of the Tangent Function",
        exerciseReference: "Section 7.2, Exercise 4",
        originalTopic: "Trigonometric Logarithmic Integral",
        difficulty: "tier2",
        tags: ["tangent", "logarithm", "antiderivative"],
        problemStatement: "Evaluate int tan(x) dx.",
        finalAnswer: "\\int \\tan(x) dx = \\ln|\\sec(x)| + C",
        steps: [
          {
            stepNumber: 1,
            title: "Rewrite in Terms of Sine and Cosine",
            mathExpression: "\\int \\tan(x) dx = \\int \\frac{\\sin(x)}{\\cos(x)} dx",
            explanation: "Use quotient definition of tangent.",
            why: "Prepares for substitution."
          },
          {
            stepNumber: 2,
            title: "Substitute u = cos(x)",
            mathExpression: "u = \\cos(x) \\implies du = -\\sin(x) dx \\implies \\int -\\frac{du}{u} = -\\ln|u| + C",
            explanation: "Numerator provides -du.",
            why: "Logarithmic integration."
          },
          {
            stepNumber: 3,
            title: "Simplify using Log Rules",
            mathExpression: "-\\ln|\\cos(x)| = \\ln|(\\cos(x))^{-1}| = \\ln|\\sec(x)| + C",
            explanation: "Negative sign becomes exponent -1 inside log.",
            why: "Standard formula form."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "tan(x)",
          expected: "log(sec(x))",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-05",
        title: "Derivative of Variable Base and Exponent x^x",
        exerciseReference: "Section 7.2, Exercise 5",
        originalTopic: "Logarithmic Differentiation of x^x",
        difficulty: "tier2",
        tags: ["x-to-the-x", "log-differentiation", "transcendental"],
        problemStatement: "Find the derivative of y = x^x for x > 0.",
        finalAnswer: "\\frac{d}{dx}[x^x] = x^x (\\ln(x) + 1)",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Natural Logarithm",
            mathExpression: "\\ln(y) = \\ln(x^x) = x \\ln(x)",
            explanation: "Bring down variable exponent.",
            why: "Logarithmic property."
          },
          {
            stepNumber: 2,
            title: "Differentiate with Respect to x",
            mathExpression: "\\frac{y'}{y} = (1)\\ln(x) + x\\left(\\frac{1}{x}\\right) = \\ln(x) + 1",
            explanation: "Product rule on x ln(x).",
            why: "Implicit differentiation."
          },
          {
            stepNumber: 3,
            title: "Solve for y'",
            mathExpression: "y' = y(\\ln(x) + 1) = x^x (\\ln(x) + 1)",
            explanation: "Replace y with x^x.",
            why: "Final derivative formula."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "x**x",
          expected: "x**x * (log(x) + 1)",
          variable: "x"
        }
      }
    ]
  },
  {
    chapter: "ch07",
    chapterDir: "ch07-transcendental-functions",
    section: "7.3",
    sectionDir: "7.3-exponential-functions",
    title: "Exponential Functions",
    definitions: [
      {
        id: "def-exponential-function",
        title: "The Natural Exponential Function e^x",
        category: "definition",
        latex: "e^x = \\ln^{-1}(x) \\iff \\ln(e^x) = x \\quad \\text{and} \\quad e^{\\ln(x)} = x \\; (x > 0)",
        statement: "The natural exponential function exp(x) = e^x is the inverse of the natural logarithm function. It is its own derivative: d/dx[e^x] = e^x.",
        conditions: ["Domain: (-oo, oo)", "Range: (0, oo)"],
        explanation: "Because e^x is its own derivative, it models natural growth and decay processes where the rate of change is proportional to current size.",
        keyTakeaway: "e^x is the unique non-trivial real function that equals its own derivative."
      }
    ],
    summaryMDX: `# Section 7.3: Exponential Functions

The exponential function $e^x$ is the unique function equal to its own derivative.

---

## 1. Calculus Rules for $e^x$ and $a^x$

$$
\\frac{d}{dx}[e^x] = e^x, \\quad \\frac{d}{dx}[e^{u(x)}] = e^{u(x)} \\cdot u'(x)
$$

$$
\\frac{d}{dx}[a^x] = a^x \\ln(a) \\quad (a > 0)
$$

$$
\\int e^u du = e^u + C, \\quad \\int a^u du = \\frac{a^u}{\\ln(a)} + C
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Derivative of Exponential with Composite Exponent",
        exerciseReference: "Section 7.3, Exercise 1",
        originalTopic: "Chain Rule with Exponential",
        difficulty: "tier1",
        tags: ["exponential", "chain-rule", "derivative"],
        problemStatement: "Find the derivative of y = e^(x^2 - 3x).",
        finalAnswer: "\\frac{dy}{dx} = (2x - 3)e^{x^2 - 3x}",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Exponential Chain Rule",
            mathExpression: "\\frac{d}{dx}[e^u] = e^u \\cdot u', \\quad u = x^2 - 3x",
            explanation: "The derivative of e^u is e^u times the derivative of exponent.",
            why: "Chain Rule."
          },
          {
            stepNumber: 2,
            title: "Compute u' and Combine",
            mathExpression: "u' = 2x - 3 \\implies \\frac{dy}{dx} = (2x - 3)e^{x^2 - 3x}",
            explanation: "Multiply e^u by (2x - 3).",
            why: "Final evaluated derivative."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "exp(x**2 - 3*x)",
          expected: "(2*x - 3)*exp(x**2 - 3*x)",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Definite Integral of an Exponential Substitution",
        exerciseReference: "Section 7.3, Exercise 2",
        originalTopic: "Definite Exponential Integration",
        difficulty: "tier1",
        tags: ["exponential", "u-substitution", "definite-integral"],
        problemStatement: "Evaluate int_0^1 x e^(-x^2) dx.",
        finalAnswer: "\\int_0^1 x e^{-x^2} dx = \\frac{1 - e^{-1}}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Substitute u = -x^2",
            mathExpression: "u = -x^2 \\implies du = -2x \\, dx \\implies x \\, dx = -\\frac{1}{2} du",
            explanation: "Isolate x dx.",
            why: "Substitution setup."
          },
          {
            stepNumber: 2,
            title: "Transform Limits",
            mathExpression: "x = 0 \\implies u = 0; \\quad x = 1 \\implies u = -1",
            explanation: "Find transformed integration limits.",
            why: "Definite integral limits."
          },
          {
            stepNumber: 3,
            title: "Integrate and Evaluate",
            mathExpression: "-\\frac{1}{2} \\int_0^{-1} e^u du = \\frac{1}{2} \\int_{-1}^0 e^u du = \\frac{1}{2} [e^0 - e^{-1}] = \\frac{1 - e^{-1}}{2}",
            explanation: "Evaluate at limits.",
            why: "Final exact value."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "x*exp(-x**2)",
          expected: "(1 - exp(-1))/2",
          kind: "definite",
          lower: "0",
          upper: "1"
        }
      },
      {
        filename: "ex-03",
        title: "Differentiation of General Base Exponential a^x",
        exerciseReference: "Section 7.3, Exercise 3",
        originalTopic: "General Base Exponential",
        difficulty: "tier1",
        tags: ["general-base", "exponential", "derivative"],
        problemStatement: "Find the derivative of f(x) = 5^(3x).",
        finalAnswer: "f'(x) = 3 \\ln(5) \\cdot 5^{3x}",
        steps: [
          {
            stepNumber: 1,
            title: "Recall Rule for a^u",
            mathExpression: "\\frac{d}{dx}[a^u] = a^u \\ln(a) \\cdot u'",
            explanation: "General base exponential rule with Chain Rule.",
            why: "General exponential differentiation."
          },
          {
            stepNumber: 2,
            title: "Substitute Parameters",
            mathExpression: "a = 5, \\quad u = 3x \\implies u' = 3 \\implies f'(x) = 5^{3x} \\ln(5) \\cdot 3 = 3\\ln(5) \\cdot 5^{3x}",
            explanation: "Evaluate the product.",
            why: "Final derivative."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "5**(3*x)",
          expected: "3*log(5)*5**(3*x)",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Integration of General Base Exponential",
        exerciseReference: "Section 7.3, Exercise 4",
        originalTopic: "Integral of a^x",
        difficulty: "tier1",
        tags: ["general-base", "antiderivative", "exponential"],
        problemStatement: "Evaluate int 2^x dx.",
        finalAnswer: "\\int 2^x dx = \\frac{2^x}{\\ln(2)} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Express 2^x in Base e",
            mathExpression: "2^x = e^{x \\ln(2)}",
            explanation: "Convert general base to natural base.",
            why: "Natural logarithm identity."
          },
          {
            stepNumber: 2,
            title: "Integrate with Respect to x",
            mathExpression: "\\int e^{x \\ln(2)} dx = \\frac{e^{x \\ln(2)}}{\\ln(2)} + C = \\frac{2^x}{\\ln(2)} + C",
            explanation: "Divide by the constant factor ln(2).",
            why: "Standard exponential integral."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "2**x",
          expected: "2**x / log(2)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-05",
        title: "Area Under an Exponential Decay Curve",
        exerciseReference: "Section 7.3, Exercise 5",
        originalTopic: "Exponential Area",
        difficulty: "tier2",
        tags: ["exponential-decay", "area", "definite-integral"],
        problemStatement: "Find the area under y = e^(-2x) on the interval [0, \\ln(2)].",
        finalAnswer: "\\text{Area} = \\frac{3}{8}",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Area Integral",
            mathExpression: "A = \\int_0^{\\ln(2)} e^{-2x} dx",
            explanation: "Since e^(-2x) > 0, the integral gives the area directly.",
            why: "Definite integral for area."
          },
          {
            stepNumber: 2,
            title: "Find Antiderivative",
            mathExpression: "\\int e^{-2x} dx = -\\frac{1}{2} e^{-2x}",
            explanation: "Divide by constant coefficient -2.",
            why: "Exponential integration rule."
          },
          {
            stepNumber: 3,
            title: "Evaluate at Endpoints",
            mathExpression: "-\\frac{1}{2} \\left[ e^{-2\\ln(2)} - e^0 \\right] = -\\frac{1}{2} \\left( \\frac{1}{4} - 1 \\right) = -\\frac{1}{2} \\left( -\\frac{3}{4} \\right) = \\frac{3}{8}",
            explanation: "e^(-2 ln 2) = (2)^(-2) = 1/4.",
            why: "Final exact rational area."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "exp(-2*x)",
          expected: "3/8",
          kind: "definite",
          lower: "0",
          upper: "log(2)"
        }
      }
    ]
  },
  {
    chapter: "ch07",
    chapterDir: "ch07-transcendental-functions",
    section: "7.4",
    sectionDir: "7.4-exponential-change-and-separable-differential-equations",
    title: "Exponential Change and Separable Differential Equations",
    definitions: [
      {
        id: "law-exponential-growth-decay",
        title: "The Law of Exponential Change",
        category: "rule",
        latex: "\\frac{dy}{dt} = k y \\implies y(t) = y_0 e^{kt}",
        statement: "If the rate of change of a quantity y is directly proportional to y itself, then y grows (k > 0) or decays (k < 0) exponentially with time, where y_0 is the initial quantity.",
        conditions: ["k is a non-zero proportionality constant"],
        explanation: "Governs population growth, radioactive decay, continuously compounded interest, and Newton's Law of Cooling.",
        keyTakeaway: "Proportional rate of change produces exponential dynamics."
      }
    ],
    summaryMDX: `# Section 7.4: Exponential Change and Separable Differential Equations

Differential equations of the form $\\frac{dy}{dt} = ky$ model phenomena where growth rate depends directly on population size.

---

## 1. Half-Life and Doubling Time

- **Half-life ($t_{1/2}$)** in radioactive decay:
  $$
  t_{1/2} = \\frac{\\ln(2)}{-k} = \\frac{\\ln(2)}{\\lambda}
  $$
- **Doubling time ($T_2$)** in population growth:
  $$
  T_2 = \\frac{\\ln(2)}{k}
  $$

---

## 2. Newton's Law of Cooling

$$
\\frac{dT}{dt} = -k(T - T_s) \\implies T(t) = T_s + (T_0 - T_s)e^{-kt}
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Radioactive Half-Life Decay Calculation",
        exerciseReference: "Section 7.4, Exercise 1",
        originalTopic: "Radioactive Decay Law",
        difficulty: "tier1",
        tags: ["half-life", "radioactive-decay", "exponential"],
        problemStatement: "A radioactive substance has a half-life of 1000 years. What fraction of the original mass remains after 2500 years?",
        finalAnswer: "\\frac{y(2500)}{y_0} = \\frac{1}{4\\sqrt{2}} = 2^{-5/2} \\approx 0.1768",
        steps: [
          {
            stepNumber: 1,
            title: "Find Decay Constant k",
            mathExpression: "k = -\\frac{\\ln(2)}{t_{1/2}} = -\\frac{\\ln(2)}{1000}",
            explanation: "Use standard half-life relationship.",
            why: "Determining growth/decay constant."
          },
          {
            stepNumber: 2,
            title: "Formulate Remaining Fraction",
            mathExpression: "\\frac{y(t)}{y_0} = e^{kt} = e^{-\\frac{\\ln(2)}{1000} \\cdot 2500} = e^{-2.5 \\ln(2)} = 2^{-2.5}",
            explanation: "Substitute t = 2500 years.",
            why: "Exponential decay formula."
          },
          {
            stepNumber: 3,
            title: "Simplify Exponential Power",
            mathExpression: "2^{-5/2} = \\frac{1}{2^{5/2}} = \\frac{1}{4\\sqrt{2}}",
            explanation: "Evaluate 2^(5/2) = 4 sqrt(2).",
            why: "Exact radical fraction."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "exp(-log(2)/1000 * 2500) - 2**(-Rational(5, 2))",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Newton's Law of Cooling Application",
        exerciseReference: "Section 7.4, Exercise 2",
        originalTopic: "Newton's Law of Cooling",
        difficulty: "tier2",
        tags: ["cooling", "differential-equation", "separation-of-variables"],
        problemStatement: "A cup of coffee at 90 deg C is placed in a 20 deg C room. After 10 minutes, the coffee cools to 60 deg C. When will its temperature reach 30 deg C?",
        finalAnswer: "t = 10 \\frac{\\ln(1/7)}{\\ln(4/7)} \\approx 28.07 \\text{ minutes}",
        steps: [
          {
            stepNumber: 1,
            title: "State Solution to Newton's Law of Cooling",
            mathExpression: "T(t) = T_s + (T_0 - T_s)e^{-kt} = 20 + (90 - 20)e^{-kt} = 20 + 70e^{-kt}",
            explanation: "Substitute ambient temperature T_s = 20 and initial T_0 = 90.",
            why: "Newton's cooling law solution."
          },
          {
            stepNumber: 2,
            title: "Use Condition at t = 10 to Solve for k",
            mathExpression: "60 = 20 + 70e^{-10k} \\implies 40 = 70e^{-10k} \\implies e^{-10k} = \\frac{4}{7} \\implies -k = \\frac{1}{10}\\ln(4/7)",
            explanation: "Substitute T(10) = 60.",
            why: "Determining cooling parameter."
          },
          {
            stepNumber: 3,
            title: "Solve for t when T = 30",
            mathExpression: "30 = 20 + 70e^{-kt} \\implies 10 = 70e^{-kt} \\implies e^{-kt} = \\frac{1}{7} \\implies -kt = \\ln(1/7) \\implies t = 10 \\frac{\\ln(1/7)}{\\ln(4/7)}",
            explanation: "Divide logarithms to isolate t.",
            why: "Exact cooling time."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "20 + 70 * exp(log(Rational(4, 7))/10 * (10*log(Rational(1, 7))/log(Rational(4, 7))))",
          expected: "30"
        }
      },
      {
        filename: "ex-03",
        title: "Separation of Variables with Rational Integrals",
        exerciseReference: "Section 7.4, Exercise 3",
        originalTopic: "Separation of Variables",
        difficulty: "tier2",
        tags: ["separable-ode", "differential-equations", "rational"],
        problemStatement: "Solve the differential equation dy/dx = 2x y^2 with initial condition y(0) = 1.",
        finalAnswer: "y(x) = \\frac{1}{1 - x^2}",
        steps: [
          {
            stepNumber: 1,
            title: "Separate Variables",
            mathExpression: "\\frac{1}{y^2} dy = 2x \\, dx",
            explanation: "Group y-terms on the left and x-terms on the right.",
            why: "Separation of variables technique."
          },
          {
            stepNumber: 2,
            title: "Integrate Both Sides",
            mathExpression: "\\int y^{-2} dy = \\int 2x \\, dx \\implies -\\frac{1}{y} = x^2 + C",
            explanation: "Integrate power terms.",
            why: "Solving separated integrals."
          },
          {
            stepNumber: 3,
            title: "Apply Initial Condition y(0) = 1",
            mathExpression: "-\\frac{1}{1} = 0^2 + C \\implies C = -1 \\implies -\\frac{1}{y} = x^2 - 1 \\implies y = \\frac{1}{1 - x^2}",
            explanation: "Solve for C and isolate y.",
            why: "Particular solution."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "1/(1 - x**2)",
          expected: "2*x / (1 - x**2)**2",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Continuously Compounded Interest",
        exerciseReference: "Section 7.4, Exercise 4",
        originalTopic: "Financial Exponential Growth",
        difficulty: "tier1",
        tags: ["interest", "continuous-compounding", "financial-math"],
        problemStatement: "An investment of $1000 earns 6% annual interest compounded continuously. What is the account balance after 5 years?",
        finalAnswer: "A(5) = 1000 e^{0.3} \\approx \\$1349.86",
        steps: [
          {
            stepNumber: 1,
            title: "State Continuous Compounding Model",
            mathExpression: "A(t) = P e^{rt}, \\quad P = 1000, \\; r = 0.06, \\; t = 5",
            explanation: "Continuous compounding exponential formula.",
            why: "Financial growth law."
          },
          {
            stepNumber: 2,
            title: "Compute Exponent",
            mathExpression: "rt = 0.06 \\times 5 = 0.30",
            explanation: "Multiply rate by time.",
            why: "Evaluating exponent."
          },
          {
            stepNumber: 3,
            title: "Evaluate Account Balance",
            mathExpression: "A(5) = 1000 e^{0.3}",
            explanation: "Account balance formula.",
            why: "Exact continuous value."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1000 * exp(0.06 * 5) - 1000 * exp(0.3)",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Logistic Differential Equation Form",
        exerciseReference: "Section 7.4, Exercise 5",
        originalTopic: "Separable Logistic Growth",
        difficulty: "tier3",
        tags: ["logistic-ode", "separation-of-variables", "partial-fractions"],
        problemStatement: "Solve dP/dt = P(1 - P) with initial population P(0) = 1/2.",
        finalAnswer: "P(t) = \\frac{1}{1 + e^{-t}} = \\frac{e^t}{e^t + 1}",
        steps: [
          {
            stepNumber: 1,
            title: "Separate Variables",
            mathExpression: "\\frac{dP}{P(1 - P)} = dt \\implies \\left( \\frac{1}{P} + \\frac{1}{1 - P} \\right) dP = dt",
            explanation: "Apply partial fractions: 1/(P(1-P)) = 1/P + 1/(1-P).",
            why: "Partial fraction decomposition."
          },
          {
            stepNumber: 2,
            title: "Integrate",
            mathExpression: "\\ln|P| - \\ln|1 - P| = t + C \\implies \\ln\\left|\\frac{P}{1 - P}\\right| = t + C",
            explanation: "Integrate each rational term.",
            why: "Logarithmic antiderivative."
          },
          {
            stepNumber: 3,
            title: "Apply P(0) = 1/2 and Solve for P",
            mathExpression: "\\ln\\left(\\frac{1/2}{1/2}\\right) = \\ln(1) = 0 \\implies C = 0 \\implies \\frac{P}{1 - P} = e^t \\implies P(t) = \\frac{e^t}{1 + e^t} = \\frac{1}{1 + e^{-t}}",
            explanation: "Solve algebraically for P(t).",
            why: "Standard logistic sigmoid solution."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "1 / (1 + exp(-x))",
          expected: "exp(-x) / (1 + exp(-x))**2",
          variable: "x"
        }
      }
    ]
  },
  {
    chapter: "ch07",
    chapterDir: "ch07-transcendental-functions",
    section: "7.5",
    sectionDir: "7.5-indeterminate-forms-and-lhospitals-rule",
    title: "Indeterminate Forms and L'Hôpital's Rule",
    definitions: [
      {
        id: "theorem-lhospitals-rule",
        title: "L'Hôpital's Rule (Indeterminate Forms 0/0 and inf/inf)",
        category: "theorem",
        latex: "\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}",
        statement: "If lim f(x)/g(x) produces an indeterminate form 0/0 or (+-oo)/(+-oo), and if lim f'(x)/g'(x) exists or is +-oo, then the limit of the quotient equals the limit of the quotient of their derivatives.",
        conditions: ["Form must be 0/0 or inf/inf", "g'(x) != 0 near c", "Limit of derivatives must exist or diverge to +-inf"],
        explanation: "Differentiating numerator and denominator separately evaluates the ratio of their instantaneous rates of approach to 0 or infinity.",
        keyTakeaway: "Never apply quotient rule when applying L'Hôpital's Rule; differentiate numerator and denominator independently."
      }
    ],
    summaryMDX: `# Section 7.5: Indeterminate Forms and L'Hôpital's Rule

L'Hôpital's Rule resolves indeterminate limits via derivatives of numerator and denominator.

---

## 1. Primary Forms: $\\frac{0}{0}$ and $\\frac{\\infty}{\\infty}$

$$
\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}
$$

---

## 2. Other Indeterminate Forms

- **$0 \\cdot \\infty$**: Rewrite as $\\frac{f}{1/g}$ or $\\frac{g}{1/f}$.
- **$\\infty - \\infty$**: Combine over a common denominator or factor out common terms.
- **$1^\\infty, 0^0, \\infty^0$**: Take the natural logarithm $y = f^g \\implies \\ln(y) = g \\ln(f)$ and evaluate $\\lim \\ln(y)$, then compute $e^L$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Evaluating a 0/0 Form with Exponentials",
        exerciseReference: "Section 7.5, Exercise 1",
        originalTopic: "L'Hopital Rule 0/0 Form",
        difficulty: "tier1",
        tags: ["lhopital", "indeterminate-0-0", "exponential"],
        problemStatement: "Evaluate lim_{x -> 0} (e^x - 1 - x) / x^2.",
        finalAnswer: "\\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2} = \\frac{1}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Check Indeterminate Form",
            mathExpression: "\\frac{e^0 - 1 - 0}{0^2} = \\frac{0}{0}",
            explanation: "Direct substitution yields 0/0.",
            why: "Qualifies for L'Hopital's Rule."
          },
          {
            stepNumber: 2,
            title: "Apply L'Hopital's Rule First Time",
            mathExpression: "\\lim_{x \\to 0} \\frac{e^x - 1}{2x} \\quad \\left( \\frac{0}{0} \\right)",
            explanation: "Differentiate numerator and denominator.",
            why: "First derivative quotient."
          },
          {
            stepNumber: 3,
            title: "Apply L'Hopital's Rule Second Time",
            mathExpression: "\\lim_{x \\to 0} \\frac{e^x}{2} = \\frac{e^0}{2} = \\frac{1}{2}",
            explanation: "Differentiate again to resolve indeterminacy.",
            why: "Final evaluated limit."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1/2 - 1/2",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Evaluating an inf/inf Form with Logarithms",
        exerciseReference: "Section 7.5, Exercise 2",
        originalTopic: "L'Hopital Rule inf/inf Form",
        difficulty: "tier1",
        tags: ["lhopital", "infinity-infinity", "logarithm"],
        problemStatement: "Evaluate lim_{x -> oo} ln(x) / sqrt(x).",
        finalAnswer: "\\lim_{x \\to \\infty} \\frac{\\ln(x)}{\\sqrt{x}} = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Indeterminate Form",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{\\ln(x)}{\\sqrt{x}} = \\frac{\\infty}{\\infty}",
            explanation: "Both numerator and denominator grow without bound.",
            why: "inf/inf condition."
          },
          {
            stepNumber: 2,
            title: "Apply L'Hopital's Rule",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{1/x}{1/(2\\sqrt{x})} = \\lim_{x \\to \\infty} \\frac{2\\sqrt{x}}{x} = \\lim_{x \\to \\infty} \\frac{2}{\\sqrt{x}}",
            explanation: "Differentiate top and bottom and simplify compound fraction.",
            why: "Algebraic simplification of derivative ratio."
          },
          {
            stepNumber: 3,
            title: "Evaluate Limit",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{2}{\\sqrt{x}} = 0",
            explanation: "Denominator approaches infinity while numerator is constant.",
            why: "Zero limit."
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
        title: "Indeterminate Product 0 * infinity",
        exerciseReference: "Section 7.5, Exercise 3",
        originalTopic: "Indeterminate Product Transformation",
        difficulty: "tier2",
        tags: ["indeterminate-product", "lhopital", "logarithm"],
        problemStatement: "Evaluate lim_{x -> 0^+} x ln(x).",
        finalAnswer: "\\lim_{x \\to 0^+} x \\ln(x) = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Transform into Quotient",
            mathExpression: "x \\ln(x) = \\frac{\\ln(x)}{1/x} \\quad \\left( \\frac{-\\infty}{\\infty} \\right)",
            explanation: "Rewrite multiplication by x as division by 1/x.",
            why: "Converts product to standard indeterminate quotient."
          },
          {
            stepNumber: 2,
            title: "Apply L'Hopital's Rule",
            mathExpression: "\\lim_{x \\to 0^+} \\frac{1/x}{-1/x^2} = \\lim_{x \\to 0^+} \\left( -\\frac{x^2}{x} \\right) = \\lim_{x \\to 0^+} (-x)",
            explanation: "Differentiate numerator and denominator.",
            why: "L'Hopital derivative step."
          },
          {
            stepNumber: 3,
            title: "Evaluate",
            mathExpression: "\\lim_{x \\to 0^+} (-x) = 0",
            explanation: "Direct evaluation as x -> 0.",
            why: "Final limit."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Indeterminate Power 1^infinity",
        exerciseReference: "Section 7.5, Exercise 4",
        originalTopic: "Indeterminate Power 1^oo",
        difficulty: "tier3",
        tags: ["indeterminate-power", "e-definition", "logarithm"],
        problemStatement: "Evaluate lim_{x -> 0} (1 + 2x)^(1/x).",
        finalAnswer: "\\lim_{x \\to 0} (1 + 2x)^{1/x} = e^2",
        steps: [
          {
            stepNumber: 1,
            title: "Take Natural Logarithm of Expression",
            mathExpression: "y = (1 + 2x)^{1/x} \\implies \\ln(y) = \\frac{\\ln(1 + 2x)}{x}",
            explanation: "Use log to bring exponent 1/x down.",
            why: "Converts power to quotient."
          },
          {
            stepNumber: 2,
            title: "Evaluate Limit of ln(y) via L'Hopital's Rule",
            mathExpression: "\\lim_{x \\to 0} \\frac{\\ln(1 + 2x)}{x} \\; \\left(\\frac{0}{0}\\right) = \\lim_{x \\to 0} \\frac{2/(1 + 2x)}{1} = \\frac{2}{1} = 2",
            explanation: "Differentiate numerator and denominator.",
            why: "Evaluating log limit."
          },
          {
            stepNumber: 3,
            title: "Exponentiate to Find Original Limit",
            mathExpression: "\\lim_{x \\to 0} y = e^{\\lim \\ln(y)} = e^2",
            explanation: "Invert logarithm using base e.",
            why: "Final exponential limit value."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "exp(2) - exp(2)",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Indeterminate Difference infinity - infinity",
        exerciseReference: "Section 7.5, Exercise 5",
        originalTopic: "Indeterminate Difference",
        difficulty: "tier2",
        tags: ["infinity-minus-infinity", "lhopital", "trigonometry"],
        problemStatement: "Evaluate lim_{x -> 0} (1/x - 1/sin(x)).",
        finalAnswer: "\\lim_{x \\to 0} \\left( \\frac{1}{x} - \\frac{1}{\\sin(x)} \\right) = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Combine Fractions over Common Denominator",
            mathExpression: "\\frac{1}{x} - \\frac{1}{\\sin(x)} = \\frac{\\sin(x) - x}{x \\sin(x)} \\quad \\left( \\frac{0}{0} \\right)",
            explanation: "Common denominator is x sin(x).",
            why: "Converts difference to 0/0 quotient."
          },
          {
            stepNumber: 2,
            title: "Apply L'Hopital's Rule",
            mathExpression: "\\lim_{x \\to 0} \\frac{\\cos(x) - 1}{\\sin(x) + x \\cos(x)} \\quad \\left( \\frac{0}{0} \\right)",
            explanation: "Differentiate top and bottom (using product rule on bottom).",
            why: "First L'Hopital application."
          },
          {
            stepNumber: 3,
            title: "Apply L'Hopital's Rule a Second Time",
            mathExpression: "\\lim_{x \\to 0} \\frac{-\\sin(x)}{\\cos(x) + \\cos(x) - x\\sin(x)} = \\frac{0}{1 + 1 - 0} = \\frac{0}{2} = 0",
            explanation: "Differentiate once more to obtain non-zero denominator.",
            why: "Final evaluated limit."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch07",
    chapterDir: "ch07-transcendental-functions",
    section: "7.6",
    sectionDir: "7.6-inverse-trigonometric-functions",
    title: "Inverse Trigonometric Functions",
    definitions: [
      {
        id: "def-inverse-trig-derivatives",
        title: "Derivatives of Inverse Trigonometric Functions",
        category: "formula",
        latex: "\\frac{d}{dx}[\\arcsin(x)] = \\frac{1}{\\sqrt{1 - x^2}}, \\quad \\frac{d}{dx}[\\arctan(x)] = \\frac{1}{1 + x^2}, \\quad \\frac{d}{dx}[\\text{arcsec}(x)] = \\frac{1}{|x|\\sqrt{x^2 - 1}}",
        statement: "The restricted trigonometric functions possess differentiable inverses whose derivatives are purely algebraic functions.",
        conditions: ["|x| < 1 for arcsin", "x in R for arctan", "|x| > 1 for arcsec"],
        explanation: "Derived by implicit differentiation applied to sin(y) = x and using Pythagorean identities.",
        keyTakeaway: "Inverse trig derivatives bridge algebraic and transcendental integration."
      }
    ],
    summaryMDX: `# Section 7.6: Inverse Trigonometric Functions

Restricting domains of periodic trigonometric functions enables defining invertible functions whose derivatives generate algebraic expressions.

---

## 1. Key Inverse Trig Derivatives and Integrals

$$
\\int \\frac{1}{\\sqrt{a^2 - u^2}} du = \\arcsin\\left(\\frac{u}{a}\\right) + C
$$

$$
\\int \\frac{1}{a^2 + u^2} du = \\frac{1}{a} \\arctan\\left(\\frac{u}{a}\\right) + C
$$

$$
\\int \\frac{1}{u \\sqrt{u^2 - a^2}} du = \\frac{1}{a} \\text{arcsec}\\left(\\frac{|u|}{a}\\right) + C
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Derivative of an Inverse Sine Function",
        exerciseReference: "Section 7.6, Exercise 1",
        originalTopic: "Inverse Sine Chain Rule",
        difficulty: "tier1",
        tags: ["arcsin", "inverse-trig", "derivative"],
        problemStatement: "Find the derivative of y = arcsin(3x).",
        finalAnswer: "\\frac{dy}{dx} = \\frac{3}{\\sqrt{1 - 9x^2}}",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Inverse Sine Rule",
            mathExpression: "\\frac{d}{dx}[\\arcsin(u)] = \\frac{u'}{\\sqrt{1 - u^2}}",
            explanation: "Set u = 3x.",
            why: "Chain Rule for arcsine."
          },
          {
            stepNumber: 2,
            title: "Compute u' and Substitute",
            mathExpression: "u' = 3, \\quad u^2 = 9x^2 \\implies \\frac{dy}{dx} = \\frac{3}{\\sqrt{1 - 9x^2}}",
            explanation: "Multiply by inner derivative.",
            why: "Final evaluated derivative."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "asin(3*x)",
          expected: "3/sqrt(1 - 9*x**2)",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Derivative of Inverse Tangent with Quadratic Argument",
        exerciseReference: "Section 7.6, Exercise 2",
        originalTopic: "Inverse Tangent Chain Rule",
        difficulty: "tier1",
        tags: ["arctan", "inverse-trig", "chain-rule"],
        problemStatement: "Find the derivative of y = arctan(x^2).",
        finalAnswer: "\\frac{dy}{dx} = \\frac{2x}{1 + x^4}",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Inverse Tangent Rule",
            mathExpression: "\\frac{d}{dx}[\\arctan(u)] = \\frac{u'}{1 + u^2}",
            explanation: "Set u = x^2.",
            why: "Arctan differentiation formula."
          },
          {
            stepNumber: 2,
            title: "Evaluate Derivative",
            mathExpression: "u' = 2x, \\quad u^2 = (x^2)^2 = x^4 \\implies \\frac{dy}{dx} = \\frac{2x}{1 + x^4}",
            explanation: "Substitute u and u'.",
            why: "Final derivative expression."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "atan(x**2)",
          expected: "2*x/(1 + x**4)",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Definite Integral Yielding Inverse Tangent",
        exerciseReference: "Section 7.6, Exercise 3",
        originalTopic: "Arctan Integration Formula",
        difficulty: "tier1",
        tags: ["arctan-integral", "definite-integral", "rational"],
        problemStatement: "Evaluate int_0^1 1 / (1 + x^2) dx.",
        finalAnswer: "\\int_0^1 \\frac{1}{1 + x^2} dx = \\frac{\\pi}{4}",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Antiderivative",
            mathExpression: "\\int \\frac{1}{1 + x^2} dx = \\arctan(x)",
            explanation: "Fundamental inverse tangent integral formula.",
            why: "Direct antiderivative."
          },
          {
            stepNumber: 2,
            title: "Evaluate at Limits 0 and 1",
            mathExpression: "[\\arctan(x)]_0^1 = \\arctan(1) - \\arctan(0) = \\frac{\\pi}{4} - 0 = \\frac{\\pi}{4}",
            explanation: "Recall tan(pi/4) = 1 and tan(0) = 0.",
            why: "Exact angle evaluation."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "1/(1 + x**2)",
          expected: "pi/4",
          kind: "definite",
          lower: "0",
          upper: "1"
        }
      },
      {
        filename: "ex-04",
        title: "Completing the Square to Evaluate an Inverse Sine Integral",
        exerciseReference: "Section 7.6, Exercise 4",
        originalTopic: "Completing the Square for Inverse Trig",
        difficulty: "tier2",
        tags: ["completing-the-square", "arcsin", "integration"],
        problemStatement: "Evaluate int 1 / sqrt(5 - 4x - x^2) dx.",
        finalAnswer: "\\arcsin\\left(\\frac{x + 2}{3}\\right) + C",
        steps: [
          {
            stepNumber: 1,
            title: "Complete the Square in the Radicand",
            mathExpression: "5 - 4x - x^2 = 5 - (x^2 + 4x + 4) + 4 = 9 - (x + 2)^2 = 3^2 - (x + 2)^2",
            explanation: "Rewrite quadratic radicand in a^2 - u^2 form.",
            why: "Prepares for arcsin formula."
          },
          {
            stepNumber: 2,
            title: "Apply Inverse Sine Integral Formula",
            mathExpression: "\\int \\frac{1}{\\sqrt{a^2 - u^2}} du = \\arcsin(u/a) + C, \\quad u = x + 2, \\; a = 3",
            explanation: "Direct identification of parameters.",
            why: "Standard table formula."
          },
          {
            stepNumber: 3,
            title: "State Result",
            mathExpression: "\\arcsin\\left(\\frac{x + 2}{3}\\right) + C",
            explanation: "Substitute u = x + 2 and a = 3.",
            why: "Final indefinite integral."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "1/sqrt(5 - 4*x - x**2)",
          expected: "asin((x + 2)/3)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-05",
        title: "Integration with Linear-Quadratic Scaling",
        exerciseReference: "Section 7.6, Exercise 5",
        originalTopic: "Scaled Inverse Tangent Integral",
        difficulty: "tier2",
        tags: ["arctan", "scaled-integral", "definite-integral"],
        problemStatement: "Evaluate int_0^2 1 / (4 + 9x^2) dx.",
        finalAnswer: "\\int_0^2 \\frac{1}{4 + 9x^2} dx = \\frac{1}{6} \\arctan(3)",
        steps: [
          {
            stepNumber: 1,
            title: "Rewrite in Standard Form a^2 + u^2",
            mathExpression: "4 + 9x^2 = 2^2 + (3x)^2 \\implies u = 3x, \\; du = 3 dx \\implies dx = \\frac{1}{3} du",
            explanation: "Identify a = 2 and u = 3x.",
            why: "Linear scaling substitution."
          },
          {
            stepNumber: 2,
            title: "Transform Limits",
            mathExpression: "x = 0 \\implies u = 0; \\quad x = 2 \\implies u = 6",
            explanation: "u runs from 0 to 6.",
            why: "Definite limits transformation."
          },
          {
            stepNumber: 3,
            title: "Integrate and Evaluate",
            mathExpression: "\\frac{1}{3} \\int_0^6 \\frac{1}{2^2 + u^2} du = \\frac{1}{3} \\left[ \\frac{1}{2} \\arctan\\left(\\frac{u}{2}\\right) \\right]_0^6 = \\frac{1}{6} [\\arctan(3) - \\arctan(0)] = \\frac{1}{6} \\arctan(3)",
            explanation: "Evaluate arctan at 3.",
            why: "Final exact result."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "1/(4 + 9*x**2)",
          expected: "atan(3)/6",
          kind: "definite",
          lower: "0",
          upper: "2"
        }
      }
    ]
  },
  {
    chapter: "ch07",
    chapterDir: "ch07-transcendental-functions",
    section: "7.7",
    sectionDir: "7.7-hyperbolic-functions",
    title: "Hyperbolic Functions",
    definitions: [
      {
        id: "def-hyperbolic-functions",
        title: "Definitions of Hyperbolic Sine and Cosine",
        category: "definition",
        latex: "\\sinh(x) = \\frac{e^x - e^{-x}}{2}, \\quad \\cosh(x) = \\frac{e^x + e^{-x}}{2}",
        statement: "Hyperbolic functions are symmetric combinations of exponential functions satisfying the fundamental hyperbolic identity cosh^2(x) - sinh^2(x) = 1.",
        conditions: ["x in R"],
        explanation: "Parameterize the unit hyperbola x^2 - y^2 = 1 in the same way circular trigonometric functions parameterize x^2 + y^2 = 1.",
        keyTakeaway: "Hyperbolic functions model hanging cables (catenaries) and wave transmission."
      }
    ],
    summaryMDX: `# Section 7.7: Hyperbolic Functions

Hyperbolic functions mirror the algebraic and differential relationships of circular trigonometric functions.

---

## 1. Fundamental Identities

$$
\\cosh^2(x) - \\sinh^2(x) = 1
$$

$$
1 - \\tanh^2(x) = \\text{sech}^2(x)
$$

---

## 2. Derivatives and Integrals

$$
\\frac{d}{dx}[\\sinh(x)] = \\cosh(x), \\quad \\frac{d}{dx}[\\cosh(x)] = \\sinh(x) \\quad (\\text{no negative sign!})
$$

$$
\\frac{d}{dx}[\\tanh(x)] = \\text{sech}^2(x)
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Derivative of Hyperbolic Tangent with Composite Argument",
        exerciseReference: "Section 7.7, Exercise 1",
        originalTopic: "Hyperbolic Chain Rule",
        difficulty: "tier1",
        tags: ["tanh", "hyperbolic", "derivative"],
        problemStatement: "Find the derivative of y = tanh(4x).",
        finalAnswer: "\\frac{dy}{dx} = 4 \\text{sech}^2(4x)",
        steps: [
          {
            stepNumber: 1,
            title: "Recall Derivative of tanh",
            mathExpression: "\\frac{d}{dx}[\\tanh(u)] = \\text{sech}^2(u) \\cdot u'",
            explanation: "Hyperbolic tangent derivative rule.",
            why: "Chain Rule."
          },
          {
            stepNumber: 2,
            title: "Differentiate Argument 4x",
            mathExpression: "u = 4x \\implies u' = 4 \\implies \\frac{dy}{dx} = 4 \\text{sech}^2(4x)",
            explanation: "Multiply by 4.",
            why: "Final evaluated derivative."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "tanh(4*x)",
          expected: "4*(1 - tanh(4*x)**2)",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Definite Integral of Hyperbolic Sine",
        exerciseReference: "Section 7.7, Exercise 2",
        originalTopic: "Definite Hyperbolic Integral",
        difficulty: "tier1",
        tags: ["sinh", "cosh", "hyperbolic-integral"],
        problemStatement: "Evaluate int_0^{\\ln(2)} sinh(x) dx.",
        finalAnswer: "\\int_0^{\\ln(2)} \\sinh(x) dx = \\frac{1}{4}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Antiderivative of sinh",
            mathExpression: "\\int \\sinh(x) dx = \\cosh(x)",
            explanation: "Antiderivative of sinh is cosh without sign change.",
            why: "Hyperbolic integration rule."
          },
          {
            stepNumber: 2,
            title: "Evaluate at Limits",
            mathExpression: "[\\cosh(x)]_0^{\\ln(2)} = \\cosh(\\ln(2)) - \\cosh(0)",
            explanation: "Substitute upper and lower limits.",
            why: "FTC Part 2."
          },
          {
            stepNumber: 3,
            title: "Compute Numerical Value",
            mathExpression: "\\cosh(\\ln(2)) = \\frac{e^{\\ln(2)} + e^{-\\ln(2)}}{2} = \\frac{2 + 1/2}{2} = \\frac{5}{4}; \\quad \\cosh(0) = 1 \\implies \\frac{5}{4} - 1 = \\frac{1}{4}",
            explanation: "Evaluate exponential definition.",
            why: "Final exact rational value."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sinh(x)",
          expected: "1/4",
          kind: "definite",
          lower: "0",
          upper: "log(2)"
        }
      },
      {
        filename: "ex-03",
        title: "Verification of Hyperbolic Pythagorean Identity",
        exerciseReference: "Section 7.7, Exercise 3",
        originalTopic: "Hyperbolic Identity Proof",
        difficulty: "tier1",
        tags: ["hyperbolic-identity", "exponential-expansion", "algebra"],
        problemStatement: "Prove using exponential definitions that cosh^2(x) - sinh^2(x) = 1.",
        finalAnswer: "\\cosh^2(x) - \\sinh^2(x) = 1",
        steps: [
          {
            stepNumber: 1,
            title: "Square cosh(x) and sinh(x)",
            mathExpression: "\\cosh^2(x) = \\frac{e^{2x} + 2 + e^{-2x}}{4}, \\quad \\sinh^2(x) = \\frac{e^{2x} - 2 + e^{-2x}}{4}",
            explanation: "Expand squared binomials.",
            why: "Algebraic expansion of definitions."
          },
          {
            stepNumber: 2,
            title: "Subtract the Expressions",
            mathExpression: "\\cosh^2(x) - \\sinh^2(x) = \\frac{(e^{2x} + 2 + e^{-2x}) - (e^{2x} - 2 + e^{-2x})}{4} = \\frac{4}{4} = 1",
            explanation: "The exponential terms cancel completely.",
            why: "Identity proven."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "cosh(x)**2 - sinh(x)**2",
          expected: "1"
        }
      },
      {
        filename: "ex-04",
        title: "Derivative of Inverse Hyperbolic Sine",
        exerciseReference: "Section 7.7, Exercise 4",
        originalTopic: "Inverse Hyperbolic Derivative",
        difficulty: "tier2",
        tags: ["asinh", "inverse-hyperbolic", "derivative"],
        problemStatement: "Find the derivative of y = asinh(x) = ln(x + sqrt(x^2 + 1)).",
        finalAnswer: "\\frac{d}{dx}[\\text{arsinh}(x)] = \\frac{1}{\\sqrt{x^2 + 1}}",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate Logarithmic Expression",
            mathExpression: "y' = \\frac{1}{x + \\sqrt{x^2 + 1}} \\cdot \\left( 1 + \\frac{2x}{2\\sqrt{x^2 + 1}} \\right)",
            explanation: "Apply chain rule to ln(u).",
            why: "Logarithmic differentiation."
          },
          {
            stepNumber: 2,
            title: "Simplify Factor inside Parentheses",
            mathExpression: "1 + \\frac{x}{\\sqrt{x^2 + 1}} = \\frac{\\sqrt{x^2 + 1} + x}{\\sqrt{x^2 + 1}}",
            explanation: "Combine over common denominator.",
            why: "Algebraic simplification."
          },
          {
            stepNumber: 3,
            title: "Cancel Common Factor",
            mathExpression: "y' = \\frac{1}{x + \\sqrt{x^2 + 1}} \\cdot \\frac{x + \\sqrt{x^2 + 1}}{\\sqrt{x^2 + 1}} = \\frac{1}{\\sqrt{x^2 + 1}}",
            explanation: "The numerator cancels with the leading denominator.",
            why: "Final simplified derivative."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "log(x + sqrt(x**2 + 1))",
          expected: "1/sqrt(x**2 + 1)",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Integration with Hyperbolic Substitution",
        exerciseReference: "Section 7.7, Exercise 5",
        originalTopic: "Hyperbolic Antiderivative",
        difficulty: "tier2",
        tags: ["hyperbolic-integral", "sech", "antiderivative"],
        problemStatement: "Evaluate int sech^2(3x) dx.",
        finalAnswer: "\\int \\text{sech}^2(3x) dx = \\frac{1}{3}\\tanh(3x) + C",
        steps: [
          {
            stepNumber: 1,
            title: "Recall Standard Hyperbolic Antiderivative",
            mathExpression: "\\frac{d}{dx}[\\tanh(x)] = \\text{sech}^2(x) \\implies \\int \\text{sech}^2(u) du = \\tanh(u) + C",
            explanation: "Antiderivative of sech^2 is tanh.",
            why: "Hyperbolic calculus table rule."
          },
          {
            stepNumber: 2,
            title: "Apply Linear Scaling Substitution",
            mathExpression: "u = 3x \\implies du = 3 dx \\implies dx = \\frac{1}{3} du",
            explanation: "Divide by 3.",
            why: "Linear argument rule."
          },
          {
            stepNumber: 3,
            title: "State Result",
            mathExpression: "\\frac{1}{3} \\tanh(3x) + C",
            explanation: "Complete integration.",
            why: "Final evaluated antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "1 - tanh(3*x)**2",
          expected: "tanh(3*x)/3",
          kind: "indefinite"
        }
      }
    ]
  },
  {
    chapter: "ch07",
    chapterDir: "ch07-transcendental-functions",
    section: "7.8",
    sectionDir: "7.8-relative-rates-of-growth",
    title: "Relative Rates of Growth",
    definitions: [
      {
        id: "def-relative-growth-rates",
        title: "Relative Rates of Growth and Big-O Notation",
        category: "definition",
        latex: "f = o(g) \\iff \\lim_{x \\to \\infty} \\frac{f(x)}{g(x)} = 0, \\quad f = O(g) \\iff \\frac{f(x)}{g(x)} \\le M",
        statement: "Function g grows faster than f as x -> oo if f/g -> 0. Logarithms grow slower than polynomials, which grow slower than exponentials, which grow slower than factorials.",
        conditions: ["f(x), g(x) > 0 for large x"],
        explanation: "Quantifies algorithmic complexity and asymptotic dominance in mathematical analysis.",
        keyTakeaway: "Growth hierarchy: (ln x)^a << x^b << e^(cx) << x! << x^x."
      }
    ],
    summaryMDX: `# Section 7.8: Relative Rates of Growth

Comparing the asymptotic behavior of transcendental and polynomial functions as $x \\to \\infty$.

---

## 1. Asymptotic Dominance Hierarchy

As $x \\to \\infty$, for any positive constants $a, b, c$:

$$
(\\ln x)^a \\ll x^b \\ll e^{cx} \\ll x!
$$

---

## 2. Little-o and Big-O Definitions

- **$f = o(g)$**: $f$ grows strictly slower than $g$:
  $$
  \\lim_{x \\to \\infty} \\frac{f(x)}{g(x)} = 0
  $$
- **$f = O(g)$**: $f$ grows at most as fast as $g$:
  $$
  \\frac{f(x)}{g(x)} \\le M \\quad \\text{for large } x
  $$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Comparing Logarithmic and Polynomial Growth",
        exerciseReference: "Section 7.8, Exercise 1",
        originalTopic: "Logarithmic vs Polynomial Growth",
        difficulty: "tier1",
        tags: ["growth-rates", "logarithm", "asymptotics"],
        problemStatement: "Determine whether f(x) = (ln x)^5 or g(x) = x^(0.1) grows faster as x -> oo.",
        finalAnswer: "g(x) = x^{0.1} \\text{ grows faster than } f(x) = (\\ln x)^5",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Limit Quotient",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{(\\ln x)^5}{x^{0.1}}",
            explanation: "Evaluate the ratio of the two functions as x approaches infinity.",
            why: "Growth rate comparison criterion."
          },
          {
            stepNumber: 2,
            title: "Apply Repeated L'Hopital or Power Substitution",
            mathExpression: "u = x^{0.1/5} = x^{0.02} \\implies \\ln(x) = 50 \\ln(u) \\implies \\lim_{u \\to \\infty} \\frac{50^5 (\\ln u)^5}{u^5} = 0",
            explanation: "Any positive power of x eventually dominates any power of ln(x).",
            why: "Fundamental growth hierarchy theorem."
          },
          {
            stepNumber: 3,
            title: "Conclude Dominance",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{f(x)}{g(x)} = 0 \\implies g(x) \\text{ grows faster than } f(x)",
            explanation: "The limit is 0, proving g(x) dominates.",
            why: "Definition of relative growth rate."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Comparing Exponential and Factorial Growth",
        exerciseReference: "Section 7.8, Exercise 2",
        originalTopic: "Exponential vs Factorial Growth",
        difficulty: "tier2",
        tags: ["factorial", "exponential", "growth-rates"],
        problemStatement: "Show that 10^n grows slower than n! as n -> oo.",
        finalAnswer: "10^n = o(n!) \\implies n! \\text{ grows faster}",
        steps: [
          {
            stepNumber: 1,
            title: "Express Ratio of Consecutive Terms",
            mathExpression: "a_n = \\frac{10^n}{n!} \\implies \\frac{a_{n+1}}{a_n} = \\frac{10^{n+1}}{(n+1)!} \\cdot \\frac{n!}{10^n} = \\frac{10}{n+1}",
            explanation: "Calculate term ratio.",
            why: "Ratio Test logic."
          },
          {
            stepNumber: 2,
            title: "Evaluate Limit of Ratio",
            mathExpression: "\\lim_{n \\to \\infty} \\frac{10}{n+1} = 0 < 1",
            explanation: "The ratio approaches 0.",
            why: "Convergence of terms to zero."
          },
          {
            stepNumber: 3,
            title: "Conclude Relative Growth",
            mathExpression: "\\lim_{n \\to \\infty} \\frac{10^n}{n!} = 0 \\implies 10^n = o(n!)",
            explanation: "Factorials outgrow any fixed base exponential.",
            why: "Asymptotic dominance."
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
        title: "Polynomial vs Exponential Growth",
        exerciseReference: "Section 7.8, Exercise 3",
        originalTopic: "Polynomial vs Exponential",
        difficulty: "tier1",
        tags: ["polynomial", "exponential", "growth-comparison"],
        problemStatement: "Evaluate lim_{x -> oo} x^100 e^(-0.01x).",
        finalAnswer: "\\lim_{x \\to \\infty} x^{100} e^{-0.01x} = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Rewrite as Quotient",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{x^{100}}{e^{0.01x}}",
            explanation: "Express as polynomial over exponential.",
            why: "inf/inf indeterminate form."
          },
          {
            stepNumber: 2,
            title: "Apply Asymptotic Dominance Principle",
            mathExpression: "\\frac{d^{100}}{dx^{100}}[x^{100}] = 100!, \\quad \\frac{d^{100}}{dx^{100}}[e^{0.01x}] = (0.01)^{100} e^{0.01x}",
            explanation: "After 100 applications of L'Hopital's rule, the numerator becomes constant while denominator continues to grow exponentially.",
            why: "Repeated L'Hopital analysis."
          },
          {
            stepNumber: 3,
            title: "Evaluate Limit",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{100!}{(0.01)^{100} e^{0.01x}} = 0",
            explanation: "Exponential decay overcomes any finite power polynomial.",
            why: "Final limit."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Big-O Equivalence of Polynomial Sums",
        exerciseReference: "Section 7.8, Exercise 4",
        originalTopic: "Big-O Polynomial Dominance",
        difficulty: "tier1",
        tags: ["big-O", "polynomial", "dominant-term"],
        problemStatement: "Show that 5x^3 + 20x^2 - 12 = O(x^3) as x -> oo.",
        finalAnswer: "5x^3 + 20x^2 - 12 = O(x^3)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Ratio to Leading Power",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{5x^3 + 20x^2 - 12}{x^3} = \\lim_{x \\to \\infty} \\left( 5 + \\frac{20}{x} - \\frac{12}{x^3} \\right) = 5",
            explanation: "Divide each term by x^3.",
            why: "Limit ratio test for big-O."
          },
          {
            stepNumber: 2,
            title: "State Constant Bound M",
            mathExpression: "\\left| \\frac{5x^3 + 20x^2 - 12}{x^3} \\right| \\le 6 \\quad \\text{for all } x \\ge 20",
            explanation: "Since the ratio approaches finite limit 5, it is bounded by M = 6.",
            why: "Definition of Big-O."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "5 - 5",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Comparing Exponential Functions with Different Bases",
        exerciseReference: "Section 7.8, Exercise 5",
        originalTopic: "Exponential Base Comparison",
        difficulty: "tier1",
        tags: ["exponential", "base-comparison", "growth-rates"],
        problemStatement: "Determine whether 2^x = o(3^x) as x -> oo.",
        finalAnswer: "2^x = o(3^x) \\implies 3^x \\text{ grows strictly faster}",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Limit Quotient",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{2^x}{3^x} = \\lim_{x \\to \\infty} \\left( \\frac{2}{3} \\right)^x",
            explanation: "Combine bases under single exponent x.",
            why: "Exponential quotient law."
          },
          {
            stepNumber: 2,
            title: "Evaluate Limit of Base Less Than 1",
            mathExpression: "\\text{Since } 0 < \\frac{2}{3} < 1, \\quad \\lim_{x \\to \\infty} \\left(\\frac{2}{3}\\right)^x = 0",
            explanation: "Powers of fractions strictly between 0 and 1 decay to 0.",
            why: "Geometric progression limit."
          },
          {
            stepNumber: 3,
            title: "Conclude Little-o Relation",
            mathExpression: "2^x = o(3^x)",
            explanation: "By definition, quotient tending to 0 implies little-o.",
            why: "Final asymptotic relation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      }
    ]
  }
];
