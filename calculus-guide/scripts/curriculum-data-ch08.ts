// scripts/curriculum-data-ch08.ts
/**
 * Authoritative Curriculum Data for Chapter 8: Techniques of Integration
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH08_SECTIONS: SectionDef[] = [
  {
    chapter: "ch08",
    chapterDir: "ch08-techniques-of-integration",
    section: "8.1",
    sectionDir: "8.1-using-basic-integration-formulas",
    title: "Using Basic Integration Formulas",
    definitions: [
      {
        id: "rule-algebraic-transformation-integrals",
        title: "Algebraic Pre-processing for Integration",
        category: "rule",
        latex: "\\frac{P(x)}{Q(x)} = S(x) + \\frac{R(x)}{Q(x)}, \\quad \\text{where } \\deg(R) < \\deg(Q)",
        statement: "Before applying advanced integration techniques, simplify integrands algebraically through polynomial long division, completing the square, expanding products, or splitting numerators.",
        conditions: ["Rational functions with degree(numerator) >= degree(denominator)"],
        explanation: "Reduces complex rational and radical integrands into sums of elementary known antiderivatives.",
        keyTakeaway: "Always check for algebraic simplification and simple substitution first."
      }
    ],
    summaryMDX: `# Section 8.1: Using Basic Integration Formulas

Effective integration relies on strategic algebraic preparation before applying specialized techniques.

---

## 1. Key Algebraic Tools

1. **Polynomial Long Division**: When degree of numerator $\\ge$ degree of denominator.
2. **Completing the Square**: Transforms $a x^2 + bx + c$ into $(u \\pm k)^2 \\pm C$ for inverse trig or log forms.
3. **Splitting Numerators**: $\\int \\frac{ax + b}{cx^2 + d} dx = \\int \\frac{ax}{cx^2 + d} dx + \\int \\frac{b}{cx^2 + d} dx$.
4. **Trigonometric Identities**: Pythagorean, double-angle, and product-to-sum identities.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Polynomial Long Division Before Integration",
        exerciseReference: "Section 8.1, Exercise 1",
        originalTopic: "Rational Simplification via Division",
        difficulty: "tier1",
        tags: ["long-division", "rational-integrals", "algebra"],
        problemStatement: "Evaluate int (x^3 + 2x^2 + 1) / (x + 1) dx.",
        finalAnswer: "\\frac{x^3}{3} + \\frac{x^2}{2} - x + 2\\ln|x + 1| + C",
        steps: [
          {
            stepNumber: 1,
            title: "Perform Polynomial Long Division",
            mathExpression: "\\frac{x^3 + 2x^2 + 1}{x + 1} = x^2 + x - 1 + \\frac{2}{x + 1}",
            explanation: "Divide numerator by (x + 1) to extract polynomial quotient and remainder 2.",
            why: "Degree of numerator (3) exceeds denominator (1)."
          },
          {
            stepNumber: 2,
            title: "Integrate Term by Term",
            mathExpression: "\\int \\left( x^2 + x - 1 + \\frac{2}{x + 1} \\right) dx = \\frac{x^3}{3} + \\frac{x^2}{2} - x + 2\\ln|x + 1| + C",
            explanation: "Apply power rule to polynomial and logarithm to remainder.",
            why: "Standard integration rules."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "(x**3 + 2*x**2 + 1)/(x + 1)",
          expected: "x**3/3 + x**2/2 - x + 2*log(x + 1)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-02",
        title: "Completing the Square in the Denominator",
        exerciseReference: "Section 8.1, Exercise 2",
        originalTopic: "Completing the Square Integration",
        difficulty: "tier1",
        tags: ["completing-the-square", "arctan", "rational"],
        problemStatement: "Evaluate int 1 / (x^2 + 6x + 13) dx.",
        finalAnswer: "\\frac{1}{2} \\arctan\\left(\\frac{x + 3}{2}\\right) + C",
        steps: [
          {
            stepNumber: 1,
            title: "Complete the Square",
            mathExpression: "x^2 + 6x + 13 = (x^2 + 6x + 9) + 4 = (x + 3)^2 + 2^2",
            explanation: "Add and subtract 9 to form perfect square.",
            why: "Prepares for arctan integral formula."
          },
          {
            stepNumber: 2,
            title: "Apply Arctan Formula",
            mathExpression: "\\int \\frac{1}{u^2 + a^2} du = \\frac{1}{a} \\arctan(u/a) + C, \\quad u = x + 3, \\; a = 2",
            explanation: "Evaluate using standard table rule.",
            why: "Direct integral matching."
          },
          {
            stepNumber: 3,
            title: "State Final Antiderivative",
            mathExpression: "\\frac{1}{2} \\arctan\\left(\\frac{x + 3}{2}\\right) + C",
            explanation: "Substitute parameters.",
            why: "Final evaluated result."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "1/(x**2 + 6*x + 13)",
          expected: "atan((x + 3)/2)/2",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-03",
        title: "Splitting a Linear-Quadratic Numerator",
        exerciseReference: "Section 8.1, Exercise 3",
        originalTopic: "Numerator Decomposition",
        difficulty: "tier2",
        tags: ["split-numerator", "u-sub", "arctan"],
        problemStatement: "Evaluate int (3x + 2) / (x^2 + 4) dx.",
        finalAnswer: "\\frac{3}{2}\\ln(x^2 + 4) + \\arctan\\left(\\frac{x}{2}\\right) + C",
        steps: [
          {
            stepNumber: 1,
            title: "Split into Logarithmic and Arctan Parts",
            mathExpression: "\\int \\frac{3x + 2}{x^2 + 4} dx = 3 \\int \\frac{x}{x^2 + 4} dx + 2 \\int \\frac{1}{x^2 + 4} dx",
            explanation: "Separate the numerator terms 3x and 2.",
            why: "Linearity of integration."
          },
          {
            stepNumber: 2,
            title: "Evaluate Logarithmic Component",
            mathExpression: "3 \\int \\frac{x}{x^2 + 4} dx = \\frac{3}{2} \\ln(x^2 + 4)",
            explanation: "u = x^2 + 4 implies du = 2x dx.",
            why: "u-substitution."
          },
          {
            stepNumber: 3,
            title: "Evaluate Arctan Component",
            mathExpression: "2 \\int \\frac{1}{x^2 + 2^2} dx = 2 \\left( \\frac{1}{2} \\arctan(x/2) \\right) = \\arctan(x/2)",
            explanation: "Apply standard arctan formula with a = 2.",
            why: "Standard inverse trig integral."
          },
          {
            stepNumber: 4,
            title: "Combine Results",
            mathExpression: "\\frac{3}{2}\\ln(x^2 + 4) + \\arctan(x/2) + C",
            explanation: "Add both integrated terms.",
            why: "Final combined antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "(3*x + 2)/(x**2 + 4)",
          expected: "(3/2)*log(x**2 + 4) + atan(x/2)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-04",
        title: "Multiplying by Conjugate to Eliminate Radical Denominator",
        exerciseReference: "Section 8.1, Exercise 4",
        originalTopic: "Conjugate Multiplication",
        difficulty: "tier2",
        tags: ["conjugate", "rationalization", "radicals"],
        problemStatement: "Evaluate int 1 / (1 + cos(x)) dx.",
        finalAnswer: "\\tan\\left(\\frac{x}{2}\\right) + C = \\csc(x) - \\cot(x) + C",
        steps: [
          {
            stepNumber: 1,
            title: "Multiply Numerator and Denominator by Conjugate",
            mathExpression: "\\frac{1}{1 + \\cos(x)} \\cdot \\frac{1 - \\cos(x)}{1 - \\cos(x)} = \\frac{1 - \\cos(x)}{1 - \\cos^2(x)} = \\frac{1 - \\cos(x)}{\\sin^2(x)}",
            explanation: "Pythagorean identity 1 - cos^2(x) = sin^2(x).",
            why: "Conjugate multiplication simplifies single trigonometric term."
          },
          {
            stepNumber: 2,
            title: "Split into Elementary Trigonometric Functions",
            mathExpression: "\\frac{1}{\\sin^2(x)} - \\frac{\\cos(x)}{\\sin^2(x)} = \\csc^2(x) - \\cot(x)\\csc(x)",
            explanation: "Express in terms of cosecant and cotangent.",
            why: "Recognizing standard derivative formulas."
          },
          {
            stepNumber: 3,
            title: "Integrate Term by Term",
            mathExpression: "\\int (\\csc^2(x) - \\csc(x)\\cot(x)) dx = -\\cot(x) - (-\\csc(x)) + C = \\csc(x) - \\cot(x) + C = \\tan(x/2) + C",
            explanation: "Direct antiderivative evaluation.",
            why: "Final exact result."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "1/(1 + cos(x))",
          expected: "tan(x/2)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-05",
        title: "Definite Integral with Radical Quadratic Radicand",
        exerciseReference: "Section 8.1, Exercise 5",
        originalTopic: "Arcsine Definite Evaluation",
        difficulty: "tier1",
        tags: ["arcsin", "definite-integral", "radicals"],
        problemStatement: "Evaluate int_0^{1/2} 1 / sqrt(1 - x^2) dx.",
        finalAnswer: "\\int_0^{1/2} \\frac{1}{\\sqrt{1 - x^2}} dx = \\frac{\\pi}{6}",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Antiderivative",
            mathExpression: "\\int \\frac{1}{\\sqrt{1 - x^2}} dx = \\arcsin(x)",
            explanation: "Standard inverse sine integral formula.",
            why: "Direct antiderivative."
          },
          {
            stepNumber: 2,
            title: "Evaluate at Limits",
            mathExpression: "[\\arcsin(x)]_0^{1/2} = \\arcsin(1/2) - \\arcsin(0) = \\frac{\\pi}{6} - 0 = \\frac{\\pi}{6}",
            explanation: "sin(pi/6) = 1/2.",
            why: "Final exact angular value."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "1/sqrt(1 - x**2)",
          expected: "pi/6",
          kind: "definite",
          lower: "0",
          upper: "1/2"
        }
      }
    ]
  },
  {
    chapter: "ch08",
    chapterDir: "ch08-techniques-of-integration",
    section: "8.2",
    sectionDir: "8.2-integration-by-parts",
    title: "Integration by Parts",
    definitions: [
      {
        id: "theorem-integration-by-parts",
        title: "Integration by Parts Formula",
        category: "theorem",
        latex: "\\int u \\, dv = u v - \\int v \\, du",
        statement: "Derived from the Product Rule of differentiation d(uv) = u dv + v du. Enables transforming an integral of a product into an easier integral by differentiating u and integrating dv.",
        conditions: ["u and v are continuously differentiable"],
        explanation: "Priority for choosing u follows LIATE rule: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential.",
        keyTakeaway: "Integration by parts is the integral calculus reversal of the product rule."
      },
      {
        id: "rule-tabular-integration",
        title: "Tabular Integration by Parts",
        category: "rule",
        latex: "\\int f(x) g(x) dx = f(x) G_1(x) - f'(x) G_2(x) + f''(x) G_3(x) - \\dots",
        statement: "A rapid systematic algorithm for repeated integration by parts where polynomial f(x) is repeatedly differentiated until 0, and g(x) is repeatedly integrated.",
        conditions: ["f(x) is a polynomial", "g(x) is repeatedly integrable (sin, cos, exp)"],
        explanation: "Eliminates repetitive bookkeeping and sign errors.",
        keyTakeaway: "Tabular method executes repeated integration by parts instantly."
      }
    ],
    summaryMDX: `# Section 8.2: Integration by Parts

Integration by parts evaluates integrals containing products of algebraic and transcendental functions.

---

## 1. LIATE Selection Guide for $u$

1. **L** - Logarithmic functions ($\\ln x$)
2. **I** - Inverse trigonometric functions ($\\arcsin x, \\arctan x$)
3. **A** - Algebraic powers ($x^n$)
4. **T** - Trigonometric functions ($\\sin x, \\cos x$)
5. **E** - Exponential functions ($e^x$)

---

## 2. Definite Integral by Parts

$$
\\int_a^b u \\, dv = [u v]_a^b - \\int_a^b v \\, du
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Classic Polynomial Times Exponential Integration by Parts",
        exerciseReference: "Section 8.2, Exercise 1",
        originalTopic: "Basic Integration by Parts",
        difficulty: "tier1",
        tags: ["integration-by-parts", "exponential", "polynomial"],
        problemStatement: "Evaluate int x e^(2x) dx.",
        finalAnswer: "\\frac{x}{2} e^{2x} - \\frac{1}{4} e^{2x} + C = \\frac{e^{2x}}{4}(2x - 1) + C",
        steps: [
          {
            stepNumber: 1,
            title: "Choose u and dv",
            mathExpression: "u = x \\implies du = dx; \\quad dv = e^{2x} dx \\implies v = \\frac{1}{2} e^{2x}",
            explanation: "Apply LIATE rule: algebraic u = x, exponential dv = e^(2x) dx.",
            why: "Integration by parts setup."
          },
          {
            stepNumber: 2,
            title: "Apply Integration by Parts Formula",
            mathExpression: "\\int u \\, dv = uv - \\int v \\, du = \\frac{x}{2} e^{2x} - \\frac{1}{2} \\int e^{2x} dx",
            explanation: "Substitute u, v, du, dv.",
            why: "Formula application."
          },
          {
            stepNumber: 3,
            title: "Integrate Remaining Term and Factor",
            mathExpression: "\\frac{x}{2} e^{2x} - \\frac{1}{4} e^{2x} + C = \\frac{e^{2x}}{4}(2x - 1) + C",
            explanation: "Integrate e^(2x) and factor out e^(2x)/4.",
            why: "Final simplified antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "x*exp(2*x)",
          expected: "exp(2*x)*(2*x - 1)/4",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-02",
        title: "Integration of Natural Logarithm via Parts",
        exerciseReference: "Section 8.2, Exercise 2",
        originalTopic: "Logarithm Integration by Parts",
        difficulty: "tier1",
        tags: ["logarithm", "integration-by-parts", "antiderivative"],
        problemStatement: "Evaluate int ln(x) dx.",
        finalAnswer: "x \\ln(x) - x + C",
        steps: [
          {
            stepNumber: 1,
            title: "Choose u = ln(x) and dv = dx",
            mathExpression: "u = \\ln(x) \\implies du = \\frac{1}{x} dx; \\quad dv = dx \\implies v = x",
            explanation: "Treat integrand as ln(x) * 1 dx.",
            why: "Standard strategy for single transcendental functions."
          },
          {
            stepNumber: 2,
            title: "Apply Parts Formula",
            mathExpression: "\\int \\ln(x) dx = x \\ln(x) - \\int x \\left(\\frac{1}{x}\\right) dx = x \\ln(x) - \\int 1 \\, dx",
            explanation: "x and 1/x cancel to 1.",
            why: "Algebraic cancellation."
          },
          {
            stepNumber: 3,
            title: "Integrate 1",
            mathExpression: "x \\ln(x) - x + C",
            explanation: "Antiderivative of 1 is x.",
            why: "Final standard antiderivative of natural log."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "log(x)",
          expected: "x*log(x) - x",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-03",
        title: "Repeated Integration by Parts via Tabular Method",
        exerciseReference: "Section 8.2, Exercise 3",
        originalTopic: "Tabular Integration by Parts",
        difficulty: "tier2",
        tags: ["tabular-integration", "polynomial-trig", "repeated-parts"],
        problemStatement: "Evaluate int x^2 sin(x) dx using tabular integration.",
        finalAnswer: "-x^2 \\cos(x) + 2x \\sin(x) + 2\\cos(x) + C",
        steps: [
          {
            stepNumber: 1,
            title: "Build Differentiation and Integration Columns",
            mathExpression: "\\begin{array}{ccc} \\text{Sign} & D & I \\\\ + & x^2 & \\sin(x) \\\\ - & 2x & -\\cos(x) \\\\ + & 2 & -\\sin(x) \\\\ - & 0 & \\cos(x) \\end{array}",
            explanation: "Repeatedly differentiate x^2 to 0 and repeatedly integrate sin(x).",
            why: "Tabular method construction."
          },
          {
            stepNumber: 2,
            title: "Sum Diagonal Products",
            mathExpression: "(+)(x^2)(-\\cos(x)) + (-)(2x)(-\\sin(x)) + (+)(2)(\\cos(x))",
            explanation: "Multiply along descending diagonals with alternating signs.",
            why: "Tabular evaluation rule."
          },
          {
            stepNumber: 3,
            title: "State Result",
            mathExpression: "-x^2 \\cos(x) + 2x \\sin(x) + 2\\cos(x) + C",
            explanation: "Combine terms and add integration constant.",
            why: "Final evaluated antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "x**2 * sin(x)",
          expected: "-x**2*cos(x) + 2*x*sin(x) + 2*cos(x)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-04",
        title: "Cyclic Integration by Parts (Solving for the Unknown Integral)",
        exerciseReference: "Section 8.2, Exercise 4",
        originalTopic: "Cyclic Integration",
        difficulty: "tier2",
        tags: ["cyclic-parts", "exponential-trig", "solving-for-integral"],
        problemStatement: "Evaluate int e^x cos(x) dx.",
        finalAnswer: "\\frac{e^x}{2}(\\cos(x) + \\sin(x)) + C",
        steps: [
          {
            stepNumber: 1,
            title: "First Integration by Parts",
            mathExpression: "I = \\int e^x \\cos(x) dx; \\quad u = \\cos(x), \\; dv = e^x dx \\implies I = e^x \\cos(x) + \\int e^x \\sin(x) dx",
            explanation: "du = -sin(x) dx, v = e^x.",
            why: "First step."
          },
          {
            stepNumber: 2,
            title: "Second Integration by Parts on Remaining Integral",
            mathExpression: "u = \\sin(x), \\; dv = e^x dx \\implies \\int e^x \\sin(x) dx = e^x \\sin(x) - \\int e^x \\cos(x) dx = e^x \\sin(x) - I",
            explanation: "The original integral I reappears on the right side.",
            why: "Cyclic reproduction of integrand."
          },
          {
            stepNumber: 3,
            title: "Solve Algebraically for I",
            mathExpression: "I = e^x \\cos(x) + e^x \\sin(x) - I \\implies 2I = e^x(\\cos(x) + \\sin(x)) \\implies I = \\frac{e^x}{2}(\\cos(x) + \\sin(x)) + C",
            explanation: "Add I to both sides and divide by 2.",
            why: "Algebraic solution for cyclic integral."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "exp(x)*cos(x)",
          expected: "exp(x)*(cos(x) + sin(x))/2",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-05",
        title: "Definite Integral by Parts with Inverse Trigonometry",
        exerciseReference: "Section 8.2, Exercise 5",
        originalTopic: "Definite Parts with Arctan",
        difficulty: "tier2",
        tags: ["arctan", "definite-parts", "evaluation"],
        problemStatement: "Evaluate int_0^1 arctan(x) dx.",
        finalAnswer: "\\int_0^1 \\arctan(x) dx = \\frac{\\pi}{4} - \\frac{1}{2}\\ln(2)",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Parts Formulation",
            mathExpression: "u = \\arctan(x) \\implies du = \\frac{1}{1 + x^2} dx; \\quad dv = dx \\implies v = x",
            explanation: "Differentiate arctan and integrate 1.",
            why: "LIATE rule."
          },
          {
            stepNumber: 2,
            title: "Apply Definite Parts Formula",
            mathExpression: "\\int_0^1 \\arctan(x) dx = [x \\arctan(x)]_0^1 - \\int_0^1 \\frac{x}{1 + x^2} dx",
            explanation: "Evaluate boundary term and set up remaining integral.",
            why: "Definite integration by parts."
          },
          {
            stepNumber: 3,
            title: "Evaluate Both Terms",
            mathExpression: "(1 \\cdot \\arctan(1) - 0) - \\left[ \\frac{1}{2} \\ln(1 + x^2) \\right]_0^1 = \\frac{\\pi}{4} - \\frac{1}{2}\\ln(2)",
            explanation: "Compute arctan(1) = pi/4 and ln(2) - ln(1) = ln(2).",
            why: "Final exact value."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "atan(x)",
          expected: "pi/4 - log(2)/2",
          kind: "definite",
          lower: "0",
          upper: "1"
        }
      }
    ]
  },
  {
    chapter: "ch08",
    chapterDir: "ch08-techniques-of-integration",
    section: "8.3",
    sectionDir: "8.3-trigonometric-integrals",
    title: "Trigonometric Integrals",
    definitions: [
      {
        id: "rule-sin-cos-powers",
        title: "Integration Rules for Products of Powers of Sine and Cosine",
        category: "rule",
        latex: "\\int \\sin^m(x) \\cos^n(x) dx",
        statement: "1. If power of cosine n is odd, save one cos(x) factor (du = cos(x) dx) and express remaining cosines as 1 - sin^2(x).\n2. If power of sine m is odd, save one sin(x) factor and express remaining sines as 1 - cos^2(x).\n3. If both m and n are even, reduce powers using half-angle identities sin^2(x) = (1 - cos(2x))/2 and cos^2(x) = (1 + cos(2x))/2.",
        conditions: ["m, n non-negative integers"],
        explanation: "Converts high trigonometric powers into polynomial substitutions.",
        keyTakeaway: "Odd power -> save one factor for du; All even powers -> apply half-angle identities."
      }
    ],
    summaryMDX: `# Section 8.3: Trigonometric Integrals

Techniques for integrating products of trigonometric powers using Pythagorean and half-angle identities.

---

## 1. Key Half-Angle Identities

$$
\\sin^2(x) = \\frac{1 - \\cos(2x)}{2}
$$

$$
\\cos^2(x) = \\frac{1 + \\cos(2x)}{2}
$$

$$
\\sin(x)\\cos(x) = \\frac{\\sin(2x)}{2}
$$

---

## 2. Secant and Tangent Powers $\\int \\tan^m(x) \\sec^n(x) dx$

- If $n$ (secant power) is **even**: Save $\\sec^2(x) dx$ for $du$ ($u = \\tan x$).
- If $m$ (tangent power) is **odd**: Save $\\sec(x)\\tan(x) dx$ for $du$ ($u = \\sec x$).
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Trigonometric Integral with Odd Cosine Power",
        exerciseReference: "Section 8.3, Exercise 1",
        originalTopic: "Odd Cosine Power",
        difficulty: "tier1",
        tags: ["trigonometric-integrals", "odd-power", "substitution"],
        problemStatement: "Evaluate int sin^2(x) cos^3(x) dx.",
        finalAnswer: "\\frac{\\sin^3(x)}{3} - \\frac{\\sin^5(x)}{5} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Isolate One Factor of cos(x)",
            mathExpression: "\\sin^2(x) \\cos^3(x) dx = \\sin^2(x) \\cos^2(x) \\cos(x) dx = \\sin^2(x)(1 - \\sin^2(x)) \\cos(x) dx",
            explanation: "Convert cos^2(x) to 1 - sin^2(x).",
            why: "Prepares for u = sin(x) substitution."
          },
          {
            stepNumber: 2,
            title: "Substitute u = sin(x)",
            mathExpression: "u = \\sin(x) \\implies du = \\cos(x) dx \\implies \\int u^2(1 - u^2) du = \\int (u^2 - u^4) du",
            explanation: "Expand polynomial in u.",
            why: "Polynomial integration."
          },
          {
            stepNumber: 3,
            title: "Integrate and Back-Substitute",
            mathExpression: "\\frac{u^3}{3} - \\frac{u^5}{5} + C = \\frac{\\sin^3(x)}{3} - \\frac{\\sin^5(x)}{5} + C",
            explanation: "Replace u with sin(x).",
            why: "Final evaluated antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sin(x)**2 * cos(x)**3",
          expected: "sin(x)**3/3 - sin(x)**5/5",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-02",
        title: "Trigonometric Integral with Even Powers via Half-Angle",
        exerciseReference: "Section 8.3, Exercise 2",
        originalTopic: "Half-Angle Power Reduction",
        difficulty: "tier2",
        tags: ["half-angle", "even-powers", "trigonometric-integrals"],
        problemStatement: "Evaluate int sin^2(x) cos^2(x) dx.",
        finalAnswer: "\\frac{x}{8} - \\frac{\\sin(4x)}{32} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Combine Using Double-Angle Sine",
            mathExpression: "\\sin(x)\\cos(x) = \\frac{\\sin(2x)}{2} \\implies \\sin^2(x)\\cos^2(x) = \\frac{\\sin^2(2x)}{4}",
            explanation: "Use sin(2x) = 2 sin(x) cos(x).",
            why: "Condenses two trigonometric factors into one."
          },
          {
            stepNumber: 2,
            title: "Apply Half-Angle Formula to sin^2(2x)",
            mathExpression: "\\frac{1}{4} \\int \\frac{1 - \\cos(4x)}{2} dx = \\frac{1}{8} \\int (1 - \\cos(4x)) dx",
            explanation: "sin^2(theta) = (1 - cos(2 theta))/2 where theta = 2x.",
            why: "Reduces degree from 2 to 1."
          },
          {
            stepNumber: 3,
            title: "Integrate Linear Terms",
            mathExpression: "\\frac{1}{8} \\left( x - \\frac{\\sin(4x)}{4} \\right) + C = \\frac{x}{8} - \\frac{\\sin(4x)}{32} + C",
            explanation: "Antiderivative of cos(4x) is sin(4x)/4.",
            why: "Final evaluated antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sin(x)**2 * cos(x)**2",
          expected: "x/8 - sin(4*x)/32",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-03",
        title: "Integral of Secant to the Fourth Power",
        exerciseReference: "Section 8.3, Exercise 3",
        originalTopic: "Even Secant Powers",
        difficulty: "tier2",
        tags: ["secant", "tangent", "even-secant"],
        problemStatement: "Evaluate int sec^4(x) dx.",
        finalAnswer: "\\tan(x) + \\frac{\\tan^3(x)}{3} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Isolate sec^2(x) Factor for du",
            mathExpression: "\\sec^4(x) dx = \\sec^2(x) \\sec^2(x) dx = (1 + \\tan^2(x)) \\sec^2(x) dx",
            explanation: "Apply Pythagorean identity sec^2(x) = 1 + tan^2(x).",
            why: "Prepares for u = tan(x) substitution."
          },
          {
            stepNumber: 2,
            title: "Substitute u = tan(x)",
            mathExpression: "u = \\tan(x) \\implies du = \\sec^2(x) dx \\implies \\int (1 + u^2) du",
            explanation: "Direct polynomial in u.",
            why: "Algebraic conversion."
          },
          {
            stepNumber: 3,
            title: "Integrate and Back-Substitute",
            mathExpression: "u + \\frac{u^3}{3} + C = \\tan(x) + \\frac{\\tan^3(x)}{3} + C",
            explanation: "Replace u with tan(x).",
            why: "Final evaluated result."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sec(x)**4",
          expected: "tan(x) + tan(x)**3/3",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-04",
        title: "Odd Tangent and Odd Secant Powers",
        exerciseReference: "Section 8.3, Exercise 4",
        originalTopic: "Odd Tangent Powers",
        difficulty: "tier2",
        tags: ["tangent-secant", "odd-tangent", "substitution"],
        problemStatement: "Evaluate int tan^3(x) sec(x) dx.",
        finalAnswer: "\\frac{\\sec^3(x)}{3} - \\sec(x) + C",
        steps: [
          {
            stepNumber: 1,
            title: "Isolate sec(x) tan(x) Factor",
            mathExpression: "\\tan^3(x) \\sec(x) dx = \\tan^2(x) \\cdot (\\sec(x)\\tan(x) dx) = (\\sec^2(x) - 1) \\sec(x)\\tan(x) dx",
            explanation: "Use identity tan^2(x) = sec^2(x) - 1.",
            why: "Prepares for u = sec(x) substitution."
          },
          {
            stepNumber: 2,
            title: "Substitute u = sec(x)",
            mathExpression: "u = \\sec(x) \\implies du = \\sec(x)\\tan(x) dx \\implies \\int (u^2 - 1) du",
            explanation: "Standard polynomial form.",
            why: "Power integration."
          },
          {
            stepNumber: 3,
            title: "Integrate and Back-Substitute",
            mathExpression: "\\frac{u^3}{3} - u + C = \\frac{\\sec^3(x)}{3} - \\sec(x) + C",
            explanation: "Substitute back u = sec(x).",
            why: "Final antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "tan(x)**3 * sec(x)",
          expected: "sec(x)**3/3 - sec(x)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-05",
        title: "Definite Integral of Cosine Cubed",
        exerciseReference: "Section 8.3, Exercise 5",
        originalTopic: "Definite Trigonometric Integral",
        difficulty: "tier1",
        tags: ["cosine-cubed", "definite-integral", "trig"],
        problemStatement: "Evaluate int_0^{pi/2} cos^3(x) dx.",
        finalAnswer: "\\int_0^{\\pi/2} \\cos^3(x) dx = \\frac{2}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Rewrite Integrand",
            mathExpression: "\\cos^3(x) = (1 - \\sin^2(x)) \\cos(x)",
            explanation: "Isolate one factor of cos(x).",
            why: "u-substitution preparation."
          },
          {
            stepNumber: 2,
            title: "Substitute u = sin(x) with Limits",
            mathExpression: "u = \\sin(x); \\quad x = 0 \\implies u = 0, \\; x = \\pi/2 \\implies u = 1",
            explanation: "Limits transform from [0, pi/2] to [0, 1].",
            why: "Definite limits."
          },
          {
            stepNumber: 3,
            title: "Evaluate Transformed Integral",
            mathExpression: "\\int_0^1 (1 - u^2) du = \\left[ u - \\frac{u^3}{3} \\right]_0^1 = 1 - \\frac{1}{3} = \\frac{2}{3}",
            explanation: "Evaluate power antiderivative.",
            why: "Final exact value."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "cos(x)**3",
          expected: "2/3",
          kind: "definite",
          lower: "0",
          upper: "pi/2"
        }
      }
    ]
  },
  {
    chapter: "ch08",
    chapterDir: "ch08-techniques-of-integration",
    section: "8.4",
    sectionDir: "8.4-trigonometric-substitutions",
    title: "Trigonometric Substitutions",
    definitions: [
      {
        id: "rule-trig-substitution-dictionary",
        title: "Trigonometric Substitution Dictionary",
        category: "rule",
        latex: "\\begin{array}{c|c|c} \\text{Radical Form} & \\text{Substitution} & \\text{Identity} \\\\ \\hline \\sqrt{a^2 - x^2} & x = a\\sin(\\theta) & a^2 - a^2\\sin^2(\\theta) = a^2\\cos^2(\\theta) \\\\ \\sqrt{a^2 + x^2} & x = a\\tan(\\theta) & a^2 + a^2\\tan^2(\\theta) = a^2\\sec^2(\\theta) \\\\ \\sqrt{x^2 - a^2} & x = a\\sec(\\theta) & a^2\\sec^2(\\theta) - a^2 = a^2\\tan^2(\\theta) \\end{array}",
        statement: "Trigonometric substitutions eliminate square roots containing quadratic binomials by transforming them into single trigonometric squared terms via Pythagorean identities.",
        conditions: ["a > 0"],
        explanation: "Right triangle geometry facilitates back-substitution from theta to original variable x.",
        keyTakeaway: "sqrt(a^2 - x^2) -> x = a sin theta; sqrt(a^2 + x^2) -> x = a tan theta; sqrt(x^2 - a^2) -> x = a sec theta."
      }
    ],
    summaryMDX: `# Section 8.4: Trigonometric Substitutions

Eliminating radical expressions of the forms $\\sqrt{a^2 - x^2}$, $\\sqrt{a^2 + x^2}$, and $\\sqrt{x^2 - a^2}$.

---

## 1. Reference Right Triangles

To back-substitute after integrating in $\\theta$:
- For $x = a\\sin\\theta$: Opposite $= x$, Hypotenuse $= a$, Adjacent $= \\sqrt{a^2 - x^2}$.
- For $x = a\\tan\\theta$: Opposite $= x$, Adjacent $= a$, Hypotenuse $= \\sqrt{a^2 + x^2}$.
- For $x = a\\sec\\theta$: Hypotenuse $= x$, Adjacent $= a$, Opposite $= \\sqrt{x^2 - a^2}$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Sine Substitution for sqrt(a^2 - x^2)",
        exerciseReference: "Section 8.4, Exercise 1",
        originalTopic: "Sine Substitution",
        difficulty: "tier1",
        tags: ["trig-sub", "sine-substitution", "radicals"],
        problemStatement: "Evaluate int sqrt(9 - x^2) dx.",
        finalAnswer: "\\frac{9}{2}\\arcsin\\left(\\frac{x}{3}\\right) + \\frac{x\\sqrt{9 - x^2}}{2} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Trigonometric Substitution",
            mathExpression: "x = 3\\sin(\\theta) \\implies dx = 3\\cos(\\theta) d\\theta, \\quad \\sqrt{9 - x^2} = 3\\cos(\\theta)",
            explanation: "Use x = a sin(theta) with a = 3.",
            why: "Eliminates square root via 1 - sin^2 = cos^2."
          },
          {
            stepNumber: 2,
            title: "Substitute and Integrate in theta",
            mathExpression: "\\int (3\\cos(\\theta))(3\\cos(\\theta) d\\theta) = 9 \\int \\cos^2(\\theta) d\\theta = 9 \\int \\frac{1 + \\cos(2\\theta)}{2} d\\theta = \\frac{9}{2}\\theta + \\frac{9}{4}\\sin(2\\theta) + C",
            explanation: "Apply half-angle formula.",
            why: "Even power integration."
          },
          {
            stepNumber: 3,
            title: "Back-Substitute Using Right Triangle",
            mathExpression: "\\sin(2\\theta) = 2\\sin(\\theta)\\cos(\\theta) = 2\\left(\\frac{x}{3}\\right)\\left(\\frac{\\sqrt{9 - x^2}}{3}\\right) = \\frac{2x\\sqrt{9 - x^2}}{9} \\implies \\frac{9}{2}\\arcsin(x/3) + \\frac{x\\sqrt{9 - x^2}}{2} + C",
            explanation: "Replace theta with arcsin(x/3) and sin(2 theta) with 2 sin cos.",
            why: "Returning to algebraic variable x."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sqrt(9 - x**2)",
          expected: "(9/2)*asin(x/3) + x*sqrt(9 - x**2)/2",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-02",
        title: "Tangent Substitution for sqrt(a^2 + x^2)",
        exerciseReference: "Section 8.4, Exercise 2",
        originalTopic: "Tangent Substitution",
        difficulty: "tier2",
        tags: ["tangent-substitution", "trig-sub", "radicals"],
        problemStatement: "Evaluate int 1 / (x^2 sqrt(x^2 + 4)) dx.",
        finalAnswer: "-\\frac{\\sqrt{x^2 + 4}}{4x} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Tangent Substitution",
            mathExpression: "x = 2\\tan(\\theta) \\implies dx = 2\\sec^2(\\theta) d\\theta, \\quad \\sqrt{x^2 + 4} = 2\\sec(\\theta)",
            explanation: "Use x = a tan(theta) with a = 2.",
            why: "1 + tan^2 = sec^2."
          },
          {
            stepNumber: 2,
            title: "Substitute into Integrand",
            mathExpression: "\\int \\frac{2\\sec^2(\\theta) d\\theta}{(4\\tan^2(\\theta))(2\\sec(\\theta))} = \\frac{1}{4} \\int \\frac{\\sec(\\theta)}{\\tan^2(\\theta)} d\\theta = \\frac{1}{4} \\int \\frac{1/\\cos}{\\sin^2/\\cos^2} d\\theta = \\frac{1}{4} \\int \\frac{\\cos(\\theta)}{\\sin^2(\\theta)} d\\theta",
            explanation: "Simplify trigonometric powers into sine and cosine.",
            why: "Prepares for simple substitution."
          },
          {
            stepNumber: 3,
            title: "Integrate and Back-Substitute",
            mathExpression: "\\frac{1}{4} \\left( -\\frac{1}{\\sin(\\theta)} \\right) + C = -\\frac{1}{4}\\csc(\\theta) + C = -\\frac{\\sqrt{x^2 + 4}}{4x} + C",
            explanation: "From triangle, csc(theta) = hypotenuse/opposite = sqrt(x^2 + 4)/x.",
            why: "Final evaluated antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "1 / (x**2 * sqrt(x**2 + 4))",
          expected: "-sqrt(x**2 + 4)/(4*x)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-03",
        title: "Secant Substitution for sqrt(x^2 - a^2)",
        exerciseReference: "Section 8.4, Exercise 3",
        originalTopic: "Secant Substitution",
        difficulty: "tier2",
        tags: ["secant-substitution", "trig-sub", "radicals"],
        problemStatement: "Evaluate int sqrt(x^2 - 16) / x dx for x > 4.",
        finalAnswer: "\\sqrt{x^2 - 16} - 4\\text{arcsec}\\left(\\frac{x}{4}\\right) + C",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Secant Substitution",
            mathExpression: "x = 4\\sec(\\theta) \\implies dx = 4\\sec(\\theta)\\tan(\\theta) d\\theta, \\quad \\sqrt{x^2 - 16} = 4\\tan(\\theta)",
            explanation: "Use x = a sec(theta) with a = 4.",
            why: "sec^2 - 1 = tan^2."
          },
          {
            stepNumber: 2,
            title: "Substitute into Integrand",
            mathExpression: "\\int \\frac{4\\tan(\\theta)}{4\\sec(\\theta)} (4\\sec(\\theta)\\tan(\\theta) d\\theta) = 4 \\int \\tan^2(\\theta) d\\theta = 4 \\int (\\sec^2(\\theta) - 1) d\\theta",
            explanation: "Simplify integrand.",
            why: "Convert tan^2 to sec^2 - 1."
          },
          {
            stepNumber: 3,
            title: "Integrate and Back-Substitute",
            mathExpression: "4(\\tan(\\theta) - \\theta) + C = 4\\left( \\frac{\\sqrt{x^2 - 16}}{4} - \\text{arcsec}(x/4) \\right) + C = \\sqrt{x^2 - 16} - 4\\text{arcsec}(x/4) + C",
            explanation: "tan(theta) = sqrt(x^2 - 16)/4 and theta = arcsec(x/4).",
            why: "Final exact result."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sqrt(x**2 - 16)/x",
          expected: "sqrt(x**2 - 16) - 4*asec(x/4)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-04",
        title: "Area of an Ellipse Derived via Trig Substitution",
        exerciseReference: "Section 8.4, Exercise 4",
        originalTopic: "Geometric Application: Ellipse Area",
        difficulty: "tier2",
        tags: ["ellipse", "area", "trig-sub"],
        problemStatement: "Find the area enclosed by the ellipse x^2/a^2 + y^2/b^2 = 1.",
        finalAnswer: "\\text{Area} = \\pi a b",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate Quadrant Area Integral",
            mathExpression: "y = b \\sqrt{1 - \\frac{x^2}{a^2}} = \\frac{b}{a}\\sqrt{a^2 - x^2} \\implies A = 4 \\frac{b}{a} \\int_0^a \\sqrt{a^2 - x^2} dx",
            explanation: "By symmetry, full area is 4 times the first quadrant.",
            why: "Quarter ellipse formulation."
          },
          {
            stepNumber: 2,
            title: "Substitute x = a sin(theta)",
            mathExpression: "x = a\\sin(\\theta) \\implies dx = a\\cos(\\theta) d\\theta; \\quad x = 0 \\implies \\theta = 0, \\; x = a \\implies \\theta = \\pi/2",
            explanation: "Limits transform from [0, a] to [0, pi/2].",
            why: "Trigonometric substitution with transformed limits."
          },
          {
            stepNumber: 3,
            title: "Evaluate Integral",
            mathExpression: "4 \\frac{b}{a} \\int_0^{\\pi/2} (a\\cos(\\theta))(a\\cos(\\theta) d\\theta) = 4ab \\int_0^{\\pi/2} \\cos^2(\\theta) d\\theta = 4ab \\left( \\frac{\\pi}{4} \\right) = \\pi a b",
            explanation: "Integral of cos^2 over [0, pi/2] is pi/4.",
            why: "Classical ellipse area formula."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 * (pi/4)",
          expected: "pi"
        }
      },
      {
        filename: "ex-05",
        title: "Completing the Square Prior to Trig Substitution",
        exerciseReference: "Section 8.4, Exercise 5",
        originalTopic: "Completed Square Trig Substitution",
        difficulty: "tier3",
        tags: ["completing-the-square", "trig-sub", "radicals"],
        problemStatement: "Evaluate int 1 / (x^2 - 4x + 13)^(3/2) dx.",
        finalAnswer: "\\frac{x - 2}{9\\sqrt{(x - 2)^2 + 9}} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Complete the Square",
            mathExpression: "x^2 - 4x + 13 = (x - 2)^2 + 9 = u^2 + 3^2, \\quad u = x - 2, \\; du = dx",
            explanation: "Transform into sum of squares u^2 + a^2.",
            why: "Prepares for tangent substitution."
          },
          {
            stepNumber: 2,
            title: "Substitute u = 3 tan(theta)",
            mathExpression: "u = 3\\tan(\\theta) \\implies du = 3\\sec^2(\\theta) d\\theta, \\quad (u^2 + 9)^{3/2} = (9\\sec^2(\\theta))^{3/2} = 27\\sec^3(\\theta)",
            explanation: "Substitute into radical power.",
            why: "Trigonometric conversion."
          },
          {
            stepNumber: 3,
            title: "Integrate and Back-Substitute",
            mathExpression: "\\int \\frac{3\\sec^2(\\theta)}{27\\sec^3(\\theta)} d\\theta = \\frac{1}{9} \\int \\cos(\\theta) d\\theta = \\frac{1}{9}\\sin(\\theta) + C = \\frac{1}{9} \\frac{u}{\\sqrt{u^2 + 9}} + C = \\frac{x - 2}{9\\sqrt{(x - 2)^2 + 9}} + C",
            explanation: "From triangle, sin(theta) = u/sqrt(u^2 + 9).",
            why: "Final exact result."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "1/(x**2 - 4*x + 13)**(Rational(3, 2))",
          expected: "(x - 2)/(9*sqrt((x - 2)**2 + 9))",
          kind: "indefinite"
        }
      }
    ]
  },
  {
    chapter: "ch08",
    chapterDir: "ch08-techniques-of-integration",
    section: "8.5",
    sectionDir: "8.5-integration-of-rational-functions-by-partial-fractions",
    title: "Integration of Rational Functions by Partial Fractions",
    definitions: [
      {
        id: "theorem-partial-fraction-decomposition",
        title: "Partial Fraction Decomposition Theorem",
        category: "theorem",
        latex: "\\frac{P(x)}{Q(x)} = \\sum \\frac{A_i}{(x - r_i)^{k_i}} + \\sum \\frac{B_j x + C_j}{(x^2 + b_j x + c_j)^{m_j}}",
        statement: "Any proper rational function P(x)/Q(x) with real coefficients can be uniquely decomposed into a sum of partial fractions corresponding to the linear and irreducible quadratic factors of its denominator.",
        conditions: ["deg(P) < deg(Q)", "Denominator Q(x) factored completely over R"],
        explanation: "Reduces rational integration into elementary logarithms and inverse tangents.",
        keyTakeaway: "Linear factors produce logarithms; irreducible quadratics produce inverse tangents."
      }
    ],
    summaryMDX: `# Section 8.5: Integration of Rational Functions by Partial Fractions

Partial fractions decompose complex rational functions into sums of simpler, easily integrable fractions.

---

## 1. Denominator Factor Types

1. **Distinct Linear Factors $(x - r)$**:
   $$
   \\frac{A}{x - r} \\implies \\int = A \\ln|x - r|
   $$
2. **Repeated Linear Factors $(x - r)^k$**:
   $$
   \\frac{A_1}{x - r} + \\frac{A_2}{(x - r)^2} + \\dots + \\frac{A_k}{(x - r)^k}
   $$
3. **Irreducible Quadratic Factors $(x^2 + bx + c)$**:
   $$
   \\frac{Bx + C}{x^2 + bx + c} \\implies \\text{Linear part gives } \\ln, \\; \\text{constant part gives } \\arctan
   $$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Partial Fractions with Distinct Linear Factors",
        exerciseReference: "Section 8.5, Exercise 1",
        originalTopic: "Distinct Linear Factors",
        difficulty: "tier1",
        tags: ["partial-fractions", "linear-factors", "rational"],
        problemStatement: "Evaluate int (5x - 3) / (x^2 - 2x - 3) dx.",
        finalAnswer: "3\\ln|x - 3| + 2\\ln|x + 1| + C",
        steps: [
          {
            stepNumber: 1,
            title: "Factor Denominator and Set Up Decomposition",
            mathExpression: "x^2 - 2x - 3 = (x - 3)(x + 1) \\implies \\frac{5x - 3}{(x - 3)(x + 1)} = \\frac{A}{x - 3} + \\frac{B}{x + 1}",
            explanation: "Distinct linear factors.",
            why: "Partial fractions form."
          },
          {
            stepNumber: 2,
            title: "Solve for A and B via Heaviside Cover-Up",
            mathExpression: "5x - 3 = A(x + 1) + B(x - 3); \\quad x = 3 \\implies 12 = 4A \\implies A = 3; \\quad x = -1 \\implies -8 = -4B \\implies B = 2",
            explanation: "Substitute roots of factors.",
            why: "Evaluating undetermined coefficients."
          },
          {
            stepNumber: 3,
            title: "Integrate Term by Term",
            mathExpression: "\\int \\left( \\frac{3}{x - 3} + \\frac{2}{x + 1} \\right) dx = 3\\ln|x - 3| + 2\\ln|x + 1| + C",
            explanation: "Direct logarithmic antiderivatives.",
            why: "Final evaluated antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "(5*x - 3)/(x**2 - 2*x - 3)",
          expected: "3*log(x - 3) + 2*log(x + 1)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-02",
        title: "Partial Fractions with Repeated Linear Factor",
        exerciseReference: "Section 8.5, Exercise 2",
        originalTopic: "Repeated Linear Factor",
        difficulty: "tier2",
        tags: ["repeated-factor", "partial-fractions", "power-rule"],
        problemStatement: "Evaluate int (x^2 + 1) / (x(x - 1)^2) dx.",
        finalAnswer: "\\ln|x| - \\frac{2}{x - 1} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Partial Fraction Decomposition",
            mathExpression: "\\frac{x^2 + 1}{x(x - 1)^2} = \\frac{A}{x} + \\frac{B}{x - 1} + \\frac{C}{(x - 1)^2}",
            explanation: "Include single and repeated powers of (x - 1).",
            why: "Decomposition template."
          },
          {
            stepNumber: 2,
            title: "Solve Coefficients",
            mathExpression: "x^2 + 1 = A(x - 1)^2 + Bx(x - 1) + Cx; \\quad x = 0 \\implies 1 = A; \\quad x = 1 \\implies 2 = C; \\quad x^2 \\text{ coeff}: 1 = A + B \\implies B = 0",
            explanation: "A = 1, B = 0, C = 2.",
            why: "Determining coefficients."
          },
          {
            stepNumber: 3,
            title: "Integrate Terms",
            mathExpression: "\\int \\left( \\frac{1}{x} + \\frac{2}{(x - 1)^2} \\right) dx = \\ln|x| - \\frac{2}{x - 1} + C",
            explanation: "Integrate 1/x to ln|x| and 2(x-1)^(-2) to -2/(x-1).",
            why: "Final exact antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "(x**2 + 1)/(x*(x - 1)**2)",
          expected: "log(x) - 2/(x - 1)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-03",
        title: "Partial Fractions with Irreducible Quadratic Factor",
        exerciseReference: "Section 8.5, Exercise 3",
        originalTopic: "Irreducible Quadratic Factor",
        difficulty: "tier2",
        tags: ["irreducible-quadratic", "partial-fractions", "arctan"],
        problemStatement: "Evaluate int (2x^2 - x + 4) / (x^3 + 4x) dx.",
        finalAnswer: "\\ln|x| + \\frac{1}{2}\\ln(x^2 + 4) - \\frac{1}{2}\\arctan\\left(\\frac{x}{2}\\right) + C",
        steps: [
          {
            stepNumber: 1,
            title: "Factor Denominator and Set Up Fractions",
            mathExpression: "x^3 + 4x = x(x^2 + 4) \\implies \\frac{2x^2 - x + 4}{x(x^2 + 4)} = \\frac{A}{x} + \\frac{Bx + C}{x^2 + 4}",
            explanation: "x^2 + 4 has no real roots.",
            why: "Irreducible quadratic template."
          },
          {
            stepNumber: 2,
            title: "Solve for A, B, C",
            mathExpression: "2x^2 - x + 4 = A(x^2 + 4) + (Bx + C)x = (A + B)x^2 + Cx + 4A; \\quad 4A = 4 \\implies A = 1; \\quad C = -1; \\quad A + B = 2 \\implies B = 1",
            explanation: "A = 1, B = 1, C = -1.",
            why: "Equating polynomial coefficients."
          },
          {
            stepNumber: 3,
            title: "Integrate Decomposition",
            mathExpression: "\\int \\left( \\frac{1}{x} + \\frac{x - 1}{x^2 + 4} \\right) dx = \\ln|x| + \\frac{1}{2}\\ln(x^2 + 4) - \\frac{1}{2}\\arctan(x/2) + C",
            explanation: "Split (x - 1)/(x^2 + 4) into x/(x^2 + 4) and -1/(x^2 + 4).",
            why: "Final evaluated antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "(2*x**2 - x + 4)/(x**3 + 4*x)",
          expected: "log(x) + log(x**2 + 4)/2 - atan(x/2)/2",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-04",
        title: "Improper Rational Function Requiring Long Division First",
        exerciseReference: "Section 8.5, Exercise 4",
        originalTopic: "Improper Rational Integration",
        difficulty: "tier2",
        tags: ["long-division", "improper-rational", "partial-fractions"],
        problemStatement: "Evaluate int (x^3) / (x^2 - 1) dx.",
        finalAnswer: "\\frac{x^2}{2} + \\frac{1}{2}\\ln|x^2 - 1| + C",
        steps: [
          {
            stepNumber: 1,
            title: "Perform Long Division",
            mathExpression: "\\frac{x^3}{x^2 - 1} = x + \\frac{x}{x^2 - 1}",
            explanation: "Divide x^3 by x^2 - 1.",
            why: "Numerator degree >= denominator degree."
          },
          {
            stepNumber: 2,
            title: "Integrate Both Terms",
            mathExpression: "\\int x \\, dx + \\int \\frac{x}{x^2 - 1} dx = \\frac{x^2}{2} + \\frac{1}{2}\\ln|x^2 - 1| + C",
            explanation: "Use simple substitution u = x^2 - 1 for remainder.",
            why: "Direct integration."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "x**3 / (x**2 - 1)",
          expected: "x**2/2 + log(x**2 - 1)/2",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-05",
        title: "Definite Integral of a Rational Function",
        exerciseReference: "Section 8.5, Exercise 5",
        originalTopic: "Definite Partial Fraction Integration",
        difficulty: "tier2",
        tags: ["definite-integral", "partial-fractions", "logarithm"],
        problemStatement: "Evaluate int_2^3 1 / (x^2 - 1) dx.",
        finalAnswer: "\\int_2^3 \\frac{1}{x^2 - 1} dx = \\frac{1}{2}\\ln\\left(\\frac{3}{2}\\right)",
        steps: [
          {
            stepNumber: 1,
            title: "Decompose into Partial Fractions",
            mathExpression: "\\frac{1}{x^2 - 1} = \\frac{1}{(x - 1)(x + 1)} = \\frac{1}{2}\\left( \\frac{1}{x - 1} - \\frac{1}{x + 1} \\right)",
            explanation: "Standard difference of squares decomposition.",
            why: "Partial fractions."
          },
          {
            stepNumber: 2,
            title: "Find Antiderivative",
            mathExpression: "\\frac{1}{2} [\\ln|x - 1| - \\ln|x + 1|] = \\frac{1}{2} \\ln\\left|\\frac{x - 1}{x + 1}\\right|",
            explanation: "Combine logs.",
            why: "Logarithm quotient law."
          },
          {
            stepNumber: 3,
            title: "Evaluate at Limits 2 and 3",
            mathExpression: "\\frac{1}{2} \\left( \\ln\\left(\\frac{2}{4}\\right) - \\ln\\left(\\frac{1}{3}\\right) \\right) = \\frac{1}{2} \\ln\\left( \\frac{1/2}{1/3} \\right) = \\frac{1}{2} \\ln\\left(\\frac{3}{2}\\right)",
            explanation: "Compute ratio of logs.",
            why: "Final exact value."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "1/(x**2 - 1)",
          expected: "log(Rational(3, 2))/2",
          kind: "definite",
          lower: "2",
          upper: "3"
        }
      }
    ]
  },
  {
    chapter: "ch08",
    chapterDir: "ch08-techniques-of-integration",
    section: "8.6",
    sectionDir: "8.6-integral-tables-and-computer-algebra-systems",
    title: "Integral Tables and Computer Algebra Systems",
    definitions: [
      {
        id: "rule-reduction-formulas",
        title: "Integration Reduction Formulas",
        category: "rule",
        latex: "\\int \\sin^n(x) dx = -\\frac{\\sin^{n-1}(x)\\cos(x)}{n} + \\frac{n-1}{n} \\int \\sin^{n-2}(x) dx",
        statement: "Reduction formulas use integration by parts to express an integral involving a high power n in terms of an identical integral with reduced power n - 1 or n - 2.",
        conditions: ["n >= 2"],
        explanation: "Serves as the recursive basis for CAS algorithms and tabulated integral handbooks.",
        keyTakeaway: "Reduction formulas step down powers recursively to elementary base cases."
      }
    ],
    summaryMDX: `# Section 8.6: Integral Tables and Computer Algebra Systems

Utilizing mathematical handbooks, reduction formulas, and CAS tools (such as SymPy) to evaluate advanced antiderivatives.

---

## 1. Key Reduction Formulas

$$
\\int \\sec^n(x) dx = \\frac{\\sec^{n-2}(x)\\tan(x)}{n - 1} + \\frac{n - 2}{n - 1} \\int \\sec^{n-2}(x) dx
$$

$$
\\int (\\ln x)^n dx = x(\\ln x)^n - n \\int (\\ln x)^{n-1} dx
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Reduction Formula for Sine Cubed",
        exerciseReference: "Section 8.6, Exercise 1",
        originalTopic: "Sine Reduction Formula",
        difficulty: "tier1",
        tags: ["reduction-formula", "sine", "tables"],
        problemStatement: "Use the reduction formula for sine to evaluate int sin^3(x) dx.",
        finalAnswer: "-\\frac{1}{3}\\sin^2(x)\\cos(x) - \\frac{2}{3}\\cos(x) + C",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Sine Reduction Formula for n = 3",
            mathExpression: "\\int \\sin^3(x) dx = -\\frac{\\sin^2(x)\\cos(x)}{3} + \\frac{2}{3} \\int \\sin(x) dx",
            explanation: "Substitute n = 3 into the reduction formula.",
            why: "Reduction formula application."
          },
          {
            stepNumber: 2,
            title: "Integrate Base Case",
            mathExpression: "\\int \\sin(x) dx = -\\cos(x)",
            explanation: "Evaluate the remaining single power integral.",
            why: "Elementary antiderivative."
          },
          {
            stepNumber: 3,
            title: "Combine Terms",
            mathExpression: "-\\frac{\\sin^2(x)\\cos(x)}{3} - \\frac{2}{3}\\cos(x) + C",
            explanation: "Combine components.",
            why: "Final evaluated antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sin(x)**3",
          expected: "-sin(x)**2*cos(x)/3 - 2*cos(x)/3",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-02",
        title: "Reduction Formula for Secant Cubed",
        exerciseReference: "Section 8.6, Exercise 2",
        originalTopic: "Secant Cubed Integration",
        difficulty: "tier2",
        tags: ["secant-cubed", "reduction-formula", "by-parts"],
        problemStatement: "Evaluate int sec^3(x) dx using the secant reduction formula.",
        finalAnswer: "\\frac{1}{2}\\sec(x)\\tan(x) + \\frac{1}{2}\\ln|\\sec(x) + \\tan(x)| + C",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Reduction Formula for n = 3",
            mathExpression: "\\int \\sec^3(x) dx = \\frac{\\sec(x)\\tan(x)}{2} + \\frac{1}{2} \\int \\sec(x) dx",
            explanation: "Substitute n = 3 into secant reduction formula.",
            why: "Reduction formula step."
          },
          {
            stepNumber: 2,
            title: "Substitute Integral of Secant",
            mathExpression: "\\int \\sec(x) dx = \\ln|\\sec(x) + \\tan(x)|",
            explanation: "Standard integral table entry.",
            why: "Base case evaluation."
          },
          {
            stepNumber: 3,
            title: "State Result",
            mathExpression: "\\frac{1}{2}\\sec(x)\\tan(x) + \\frac{1}{2}\\ln|\\sec(x) + \\tan(x)| + C",
            explanation: "Combine terms.",
            why: "Famous calculus result."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sec(x)**3",
          expected: "sec(x)*tan(x)/2 + log(sec(x) + tan(x))/2",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-03",
        title: "Reduction Formula for Powers of Natural Logarithm",
        exerciseReference: "Section 8.6, Exercise 3",
        originalTopic: "Logarithm Reduction Formula",
        difficulty: "tier2",
        tags: ["logarithm", "reduction-formula", "by-parts"],
        problemStatement: "Evaluate int (ln x)^2 dx using a reduction formula.",
        finalAnswer: "x(\\ln x)^2 - 2x\\ln(x) + 2x + C",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Logarithm Reduction Formula for n = 2",
            mathExpression: "\\int (\\ln x)^2 dx = x(\\ln x)^2 - 2 \\int \\ln(x) dx",
            explanation: "Substitute n = 2 into integral (ln x)^n dx.",
            why: "Reduction step."
          },
          {
            stepNumber: 2,
            title: "Substitute Known Integral of ln(x)",
            mathExpression: "\\int \\ln(x) dx = x\\ln(x) - x",
            explanation: "Use result from Section 8.2.",
            why: "Known base integral."
          },
          {
            stepNumber: 3,
            title: "Expand and Simplify",
            mathExpression: "x(\\ln x)^2 - 2(x\\ln(x) - x) + C = x(\\ln x)^2 - 2x\\ln(x) + 2x + C",
            explanation: "Distribute -2.",
            why: "Final exact result."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "log(x)**2",
          expected: "x*log(x)**2 - 2*x*log(x) + 2*x",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-04",
        title: "Using Table Formula for sqrt(x^2 + a^2)",
        exerciseReference: "Section 8.6, Exercise 4",
        originalTopic: "Table Entry Application",
        difficulty: "tier1",
        tags: ["integral-tables", "radicals", "hyperbolic-form"],
        problemStatement: "Evaluate int sqrt(x^2 + 9) dx using standard integral table formulas.",
        finalAnswer: "\\frac{x}{2}\\sqrt{x^2 + 9} + \\frac{9}{2}\\ln|x + \\sqrt{x^2 + 9}| + C",
        steps: [
          {
            stepNumber: 1,
            title: "Locate Matching Table Entry",
            mathExpression: "\\int \\sqrt{u^2 + a^2} du = \\frac{u}{2}\\sqrt{u^2 + a^2} + \\frac{a^2}{2}\\ln|u + \\sqrt{u^2 + a^2}| + C",
            explanation: "Identify parameters: u = x, a = 3.",
            why: "Table matching."
          },
          {
            stepNumber: 2,
            title: "Substitute Parameters",
            mathExpression: "\\frac{x}{2}\\sqrt{x^2 + 9} + \\frac{9}{2}\\ln|x + \\sqrt{x^2 + 9}| + C",
            explanation: "Substitute a^2 = 9 directly.",
            why: "Final evaluated antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sqrt(x**2 + 9)",
          expected: "x*sqrt(x**2 + 9)/2 + (9/2)*log(x + sqrt(x**2 + 9))",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-05",
        title: "Evaluating a Definite Integral via Reduction",
        exerciseReference: "Section 8.6, Exercise 5",
        originalTopic: "Definite Reduction Evaluation",
        difficulty: "tier2",
        tags: ["reduction", "definite-integral", "wallis"],
        problemStatement: "Evaluate int_0^{pi/2} sin^4(x) dx.",
        finalAnswer: "\\int_0^{\\pi/2} \\sin^4(x) dx = \\frac{3\\pi}{16}",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Definite Reduction Rule",
            mathExpression: "\\int_0^{\\pi/2} \\sin^n(x) dx = \\frac{n - 1}{n} \\int_0^{\\pi/2} \\sin^{n-2}(x) dx \\quad (\\text{since } [\\sin^{n-1}(x)\\cos(x)]_0^{\\pi/2} = 0)",
            explanation: "Boundary terms vanish at both 0 and pi/2.",
            why: "Wallis' formula structure."
          },
          {
            stepNumber: 2,
            title: "Cascade for n = 4",
            mathExpression: "\\int_0^{\\pi/2} \\sin^4(x) dx = \\frac{3}{4} \\int_0^{\\pi/2} \\sin^2(x) dx = \\frac{3}{4} \\cdot \\frac{1}{2} \\int_0^{\\pi/2} 1 \\, dx",
            explanation: "Multiply cascading fractions 3/4 and 1/2.",
            why: "Recursive evaluation."
          },
          {
            stepNumber: 3,
            title: "Compute Final Product",
            mathExpression: "\\frac{3}{8} \\left( \\frac{\\pi}{2} \\right) = \\frac{3\\pi}{16}",
            explanation: "Multiply by pi/2.",
            why: "Final exact value."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sin(x)**4",
          expected: "3*pi/16",
          kind: "definite",
          lower: "0",
          upper: "pi/2"
        }
      }
    ]
  },
  {
    chapter: "ch08",
    chapterDir: "ch08-techniques-of-integration",
    section: "8.7",
    sectionDir: "8.7-numerical-integration",
    title: "Numerical Integration",
    definitions: [
      {
        id: "formula-trapezoidal-simpsons-rules",
        title: "Trapezoidal Rule and Simpson's Rule",
        category: "formula",
        latex: "T_n = \\frac{\\Delta x}{2} [y_0 + 2y_1 + 2y_2 + \\dots + 2y_{n-1} + y_n], \\quad S_n = \\frac{\\Delta x}{3} [y_0 + 4y_1 + 2y_2 + 4y_3 + \\dots + y_n]",
        statement: "Numerical quadrature algorithms to approximate definite integrals when antiderivatives cannot be expressed in elementary terms. Simpson's Rule fits parabolic arcs across pairs of subintervals (n must be even).",
        conditions: ["Delta x = (b - a)/n", "n is even for Simpson's Rule"],
        explanation: "Trapezoidal error scales with (Delta x)^2; Simpson's error scales with (Delta x)^4.",
        keyTakeaway: "Simpson's Rule integrates cubic polynomials with zero error."
      }
    ],
    summaryMDX: `# Section 8.7: Numerical Integration

When a function lacks an elementary antiderivative (e.g. $e^{-x^2}$, $\\frac{\\sin x}{x}$), numerical quadrature approximates the definite integral.

---

## 1. Quadrature Formulas

- **Trapezoidal Rule**: Weights $1, 2, 2, \\dots, 2, 1$ scaled by $\\frac{\\Delta x}{2}$.
- **Simpson's Rule**: Weights $1, 4, 2, 4, \\dots, 4, 1$ scaled by $\\frac{\\Delta x}{3}$ ($n$ even).

---

## 2. Error Bounds

- $|E_T| \\le \\frac{M_2 (b - a)^3}{12 n^2}$ where $|f''(x)| \\le M_2$.
- $|E_S| \\le \\frac{M_4 (b - a)^5}{180 n^4}$ where $|f^{(4)}(x)| \\le M_4$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Trapezoidal Rule Approximation for Reciprocal Curve",
        exerciseReference: "Section 8.7, Exercise 1",
        originalTopic: "Trapezoidal Rule Calculation",
        difficulty: "tier1",
        tags: ["trapezoidal-rule", "numerical-integration", "reciprocal"],
        problemStatement: "Use the Trapezoidal Rule with n = 4 to approximate int_1^2 1/x dx.",
        finalAnswer: "T_4 = \\frac{1}{8}\\left( 1 + 2\\left(\\frac{4}{5}\\right) + 2\\left(\\frac{2}{3}\\right) + 2\\left(\\frac{4}{7}\\right) + \\frac{1}{2} \\right) = \\frac{1171}{1680} \\approx 0.6970",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Delta x and Grid Points",
            mathExpression: "\\Delta x = \\frac{2 - 1}{4} = \\frac{1}{4}; \\quad x_0 = 1, \\; x_1 = \\frac{5}{4}, \\; x_2 = \\frac{3}{2}, \\; x_3 = \\frac{7}{4}, \\; x_4 = 2",
            explanation: "Partition [1, 2] into 4 equal slices.",
            why: "Uniform grid spacing."
          },
          {
            stepNumber: 2,
            title: "Evaluate Function Values",
            mathExpression: "y_0 = 1, \\; y_1 = \\frac{4}{5}, \\; y_2 = \\frac{2}{3}, \\; y_3 = \\frac{4}{7}, \\; y_4 = \\frac{1}{2}",
            explanation: "Evaluate f(x) = 1/x at all grid points.",
            why: "Function ordinate evaluation."
          },
          {
            stepNumber: 3,
            title: "Apply Trapezoidal Formula",
            mathExpression: "T_4 = \\frac{1/4}{2} \\left[ 1 + 2\\left(\\frac{4}{5}\\right) + 2\\left(\\frac{2}{3}\\right) + 2\\left(\\frac{4}{7}\\right) + \\frac{1}{2} \\right] = \\frac{1}{8} \\left( \\frac{1171}{210} \\right) = \\frac{1171}{1680}",
            explanation: "Sum weighted values and multiply by Delta x / 2.",
            why: "Trapezoidal approximation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1/8)*(1 + 2*(4/5) + 2*(2/3) + 2*(4/7) + 1/2) - 1171/1680",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Simpson's Rule for Reciprocal Curve",
        exerciseReference: "Section 8.7, Exercise 2",
        originalTopic: "Simpson's Rule Calculation",
        difficulty: "tier1",
        tags: ["simpsons-rule", "numerical-quadrature", "logarithm"],
        problemStatement: "Use Simpson's Rule with n = 4 to approximate int_1^2 1/x dx.",
        finalAnswer: "S_4 = \\frac{1}{12}\\left( 1 + 4\\left(\\frac{4}{5}\\right) + 2\\left(\\frac{2}{3}\\right) + 4\\left(\\frac{4}{7}\\right) + \\frac{1}{2} \\right) = \\frac{1747}{2520} \\approx 0.69325",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Ordinates and Weights",
            mathExpression: "\\Delta x = \\frac{1}{4}, \\quad \\text{Weights: } 1, 4, 2, 4, 1",
            explanation: "Simpson's 1-4-2-4-1 pattern.",
            why: "Simpson's quadrature rule."
          },
          {
            stepNumber: 2,
            title: "Apply Formula",
            mathExpression: "S_4 = \\frac{1/4}{3} \\left[ 1 + 4\\left(\\frac{4}{5}\\right) + 2\\left(\\frac{2}{3}\\right) + 4\\left(\\frac{4}{7}\\right) + \\frac{1}{2} \\right] = \\frac{1}{12} \\left( 1 + \\frac{16}{5} + \\frac{4}{3} + \\frac{16}{7} + \\frac{1}{2} \\right)",
            explanation: "Multiply sum by Delta x / 3.",
            why: "Simpson's sum evaluation."
          },
          {
            stepNumber: 3,
            title: "Calculate Rational Value",
            mathExpression: "\\frac{1}{12} \\left( \\frac{1747}{210} \\right) = \\frac{1747}{2520} \\approx 0.693254 \\dots \\text{(True value } \\ln(2) \\approx 0.693147)",
            explanation: "Simpson's rule matches ln(2) to 3 decimal places.",
            why: "High-order accuracy demonstration."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1/12)*(1 + 4*(4/5) + 2*(2/3) + 4*(4/7) + 1/2) - 1747/2520",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Error Bound Estimation for Trapezoidal Rule",
        exerciseReference: "Section 8.7, Exercise 3",
        originalTopic: "Trapezoidal Error Bound",
        difficulty: "tier2",
        tags: ["error-bound", "trapezoidal", "second-derivative"],
        problemStatement: "Determine the minimum number of subintervals n required to ensure the Trapezoidal Rule approximation of int_1^2 1/x dx has error <= 10^(-4).",
        finalAnswer: "n \\ge 41",
        steps: [
          {
            stepNumber: 1,
            title: "Find Maximum of Second Derivative M_2",
            mathExpression: "f(x) = x^{-1} \\implies f'(x) = -x^{-2} \\implies f''(x) = 2x^{-3} = \\frac{2}{x^3}",
            explanation: "On [1, 2], f''(x) achieves its maximum at x = 1.",
            why: "Locating upper bound M_2."
          },
          {
            stepNumber: 2,
            title: "State M_2 and Error Bound Inequality",
            mathExpression: "M_2 = 2; \\quad |E_T| \\le \\frac{M_2 (b - a)^3}{12 n^2} = \\frac{2(1)^3}{12 n^2} = \\frac{1}{6n^2} \\le 10^{-4}",
            explanation: "Substitute M_2 = 2 and b - a = 1.",
            why: "Trapezoidal error bound formula."
          },
          {
            stepNumber: 3,
            title: "Solve for n",
            mathExpression: "6n^2 \\ge 10^4 \\implies n^2 \\ge \\frac{10000}{6} \\approx 1666.67 \\implies n \\ge \\sqrt{1666.67} \\approx 40.82 \\implies n \\ge 41",
            explanation: "Round up to the nearest integer.",
            why: "Integer subinterval constraint."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "ceil(sqrt(10000/6)) - 41",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Exactness of Simpson's Rule on Cubics",
        exerciseReference: "Section 8.7, Exercise 4",
        originalTopic: "Cubic Exactness Proof",
        difficulty: "tier2",
        tags: ["simpsons-rule", "cubics", "exactness"],
        problemStatement: "Verify that Simpson's Rule with n = 2 gives the exact value for int_0^2 x^3 dx.",
        finalAnswer: "S_2 = \\int_0^2 x^3 dx = 4",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Definite Integral Exactly",
            mathExpression: "\\int_0^2 x^3 dx = \\left[ \\frac{x^4}{4} \\right]_0^2 = \\frac{16}{4} = 4",
            explanation: "Standard FTC evaluation.",
            why: "Exact target value."
          },
          {
            stepNumber: 2,
            title: "Compute Simpson's Rule with n = 2",
            mathExpression: "\\Delta x = 1; \\quad x_0 = 0, \\; x_1 = 1, \\; x_2 = 2; \\quad y_0 = 0, \\; y_1 = 1, \\; y_2 = 8",
            explanation: "Grid points and function values.",
            why: "Simpson's parameters."
          },
          {
            stepNumber: 3,
            title: "Calculate S_2",
            mathExpression: "S_2 = \\frac{\\Delta x}{3} [y_0 + 4y_1 + y_2] = \\frac{1}{3} [0 + 4(1) + 8] = \\frac{12}{3} = 4",
            explanation: "S_2 = 4 matches exact value 4 identically.",
            why: "Since f^(4)(x) = 0 for cubics, E_S = 0 exactly."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "x**3",
          expected: "4",
          kind: "definite",
          lower: "0",
          upper: "2"
        }
      },
      {
        filename: "ex-05",
        title: "Error Bound for Simpson's Rule",
        exerciseReference: "Section 8.7, Exercise 5",
        originalTopic: "Simpson's Error Estimation",
        difficulty: "tier3",
        tags: ["simpson-error", "fourth-derivative", "numerical"],
        problemStatement: "Find the maximum error when approximating int_0^1 e^(x^2) dx with Simpson's Rule if M_4 = max |f^(4)(x)| = 76 and n = 10.",
        finalAnswer: "|E_S| \\le \\frac{76}{1800000} \\approx 4.22 \\times 10^{-5}",
        steps: [
          {
            stepNumber: 1,
            title: "State Simpson's Error Bound Formula",
            mathExpression: "|E_S| \\le \\frac{M_4 (b - a)^5}{180 n^4}",
            explanation: "Standard fourth-order error bound.",
            why: "Formula definition."
          },
          {
            stepNumber: 2,
            title: "Substitute Given Parameters",
            mathExpression: "M_4 = 76, \\quad b - a = 1, \\quad n = 10 \\implies n^4 = 10000",
            explanation: "Calculate denominator 180 * 10000 = 1,800,000.",
            why: "Arithmetic evaluation."
          },
          {
            stepNumber: 3,
            title: "Compute Bound",
            mathExpression: "|E_S| \\le \\frac{76(1)^5}{180(10000)} = \\frac{76}{1800000} = \\frac{19}{450000} \\approx 4.22 \\times 10^{-5}",
            explanation: "Fraction reduces to 19/450000.",
            why: "Final error bound."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "76 / 1800000 - 19/450000",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch08",
    chapterDir: "ch08-techniques-of-integration",
    section: "8.8",
    sectionDir: "8.8-improper-integrals",
    title: "Improper Integrals",
    definitions: [
      {
        id: "def-improper-integrals",
        title: "Improper Integrals of Type I and Type II",
        category: "definition",
        latex: "\\int_a^\\infty f(x) dx = \\lim_{t \\to \\infty} \\int_a^t f(x) dx, \\quad \\int_a^b f(x) dx = \\lim_{t \\to b^-} \\int_a^t f(x) dx",
        statement: "Type I improper integrals have infinite integration intervals. Type II improper integrals have integrands with vertical asymptotes (infinite discontinuities) within or at the boundaries of the interval. An improper integral converges if the limit exists and diverges otherwise.",
        conditions: ["f is integrable on all finite subintervals"],
        explanation: "Replaces unbounded integration with limits of proper definite integrals.",
        keyTakeaway: "Improper integrals are defined by taking limits of definite integrals."
      },
      {
        id: "theorem-p-integral-test",
        title: "The p-Integral Convergence Theorem",
        category: "theorem",
        latex: "\\int_1^\\infty \\frac{1}{x^p} dx = \\begin{cases} \\frac{1}{p - 1} & p > 1 \\\\ \\text{diverges} & p \\le 1 \\end{cases}",
        statement: "The improper integral of 1/x^p over [1, oo) converges if and only if p > 1. Conversely, near zero, int_0^1 1/x^p dx converges if and only if p < 1.",
        conditions: ["p is a real constant"],
        explanation: "Serves as the universal benchmark for comparison tests in improper integrals and infinite series.",
        keyTakeaway: "1/x^p on [1, oo) converges iff p > 1; on [0, 1] converges iff p < 1."
      }
    ],
    summaryMDX: `# Section 8.8: Improper Integrals

Extending integration to infinite domains (Type I) or functions with infinite asymptotes (Type II).

---

## 1. Type I: Infinite Limits of Integration

$$
\\int_a^\\infty f(x) dx = \\lim_{t \\to \\infty} \\int_a^t f(x) dx
$$

$$
\\int_{-\\infty}^\\infty f(x) dx = \\int_{-\\infty}^c f(x) dx + \\int_c^\\infty f(x) dx
$$

---

## 2. Direct Comparison Test

If $0 \\le f(x) \\le g(x)$ for all $x \\ge a$:
- If $\\int_a^\\infty g(x) dx$ **converges**, then $\\int_a^\\infty f(x) dx$ **converges**.
- If $\\int_a^\\infty f(x) dx$ **diverges**, then $\\int_a^\\infty g(x) dx$ **diverges**.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Type I Improper Integral with Exponential Decay",
        exerciseReference: "Section 8.8, Exercise 1",
        originalTopic: "Type I Improper Integral",
        difficulty: "tier1",
        tags: ["improper-integral", "type-I", "exponential"],
        problemStatement: "Evaluate the improper integral int_0^oo e^(-3x) dx or state that it diverges.",
        finalAnswer: "\\int_0^\\infty e^{-3x} dx = \\frac{1}{3} \\quad (\\text{Converges})",
        steps: [
          {
            stepNumber: 1,
            title: "Express as a Limit",
            mathExpression: "\\int_0^\\infty e^{-3x} dx = \\lim_{t \\to \\infty} \\int_0^t e^{-3x} dx",
            explanation: "Replace infinite limit with variable t.",
            why: "Definition of Type I improper integral."
          },
          {
            stepNumber: 2,
            title: "Evaluate Definite Integral in t",
            mathExpression: "\\int_0^t e^{-3x} dx = \\left[ -\\frac{1}{3} e^{-3x} \\right]_0^t = -\\frac{1}{3}e^{-3t} - \\left(-\\frac{1}{3}\\right) = \\frac{1}{3} - \\frac{1}{3}e^{-3t}",
            explanation: "Antiderivative of e^(-3x).",
            why: "FTC Part 2 on finite interval."
          },
          {
            stepNumber: 3,
            title: "Take Limit as t -> oo",
            mathExpression: "\\lim_{t \\to \\infty} \\left( \\frac{1}{3} - \\frac{1}{3}e^{-3t} \\right) = \\frac{1}{3} - 0 = \\frac{1}{3}",
            explanation: "Since e^(-3t) -> 0 as t -> oo, the integral converges.",
            why: "Final evaluated convergent limit."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "exp(-3*x)",
          expected: "1/3",
          kind: "definite",
          lower: "0",
          upper: "oo"
        }
      },
      {
        filename: "ex-02",
        title: "Convergence of a p-Integral",
        exerciseReference: "Section 8.8, Exercise 2",
        originalTopic: "p-Integral Evaluation",
        difficulty: "tier1",
        tags: ["p-integral", "power-rule", "convergence"],
        problemStatement: "Evaluate int_1^oo 1 / x^3 dx.",
        finalAnswer: "\\int_1^\\infty \\frac{1}{x^3} dx = \\frac{1}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate Limit",
            mathExpression: "\\lim_{t \\to \\infty} \\int_1^t x^{-3} dx",
            explanation: "Set up limit for Type I integral.",
            why: "Improper integral definition."
          },
          {
            stepNumber: 2,
            title: "Evaluate Antiderivative",
            mathExpression: "\\left[ -\\frac{1}{2x^2} \\right]_1^t = -\\frac{1}{2t^2} - \\left(-\\frac{1}{2}\\right) = \\frac{1}{2} - \\frac{1}{2t^2}",
            explanation: "Apply power rule.",
            why: "FTC evaluation."
          },
          {
            stepNumber: 3,
            title: "Compute Limit",
            mathExpression: "\\lim_{t \\to \\infty} \\left( \\frac{1}{2} - \\frac{1}{2t^2} \\right) = \\frac{1}{2} - 0 = \\frac{1}{2}",
            explanation: "Term 1/(2t^2) vanishes.",
            why: "Convergent p-integral with p = 3."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "1/x**3",
          expected: "1/2",
          kind: "definite",
          lower: "1",
          upper: "oo"
        }
      },
      {
        filename: "ex-03",
        title: "Type II Improper Integral with Vertical Asymptote",
        exerciseReference: "Section 8.8, Exercise 3",
        originalTopic: "Type II Improper Integral",
        difficulty: "tier1",
        tags: ["type-II", "vertical-asymptote", "fractional-power"],
        problemStatement: "Evaluate int_0^4 1 / sqrt(x) dx.",
        finalAnswer: "\\int_0^4 \\frac{1}{\\sqrt{x}} dx = 4",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Discontinuity at x = 0",
            mathExpression: "\\lim_{x \\to 0^+} \\frac{1}{\\sqrt{x}} = \\infty",
            explanation: "The integrand has an infinite discontinuity at the lower limit.",
            why: "Type II classification."
          },
          {
            stepNumber: 2,
            title: "Set Up Right-Hand Limit",
            mathExpression: "\\lim_{c \\to 0^+} \\int_c^4 x^{-1/2} dx = \\lim_{c \\to 0^+} [2\\sqrt{x}]_c^4",
            explanation: "Antiderivative of x^(-1/2) is 2 x^(1/2).",
            why: "Limit from the right."
          },
          {
            stepNumber: 3,
            title: "Evaluate Limit",
            mathExpression: "\\lim_{c \\to 0^+} (2\\sqrt{4} - 2\\sqrt{c}) = 4 - 0 = 4",
            explanation: "The limit exists, so the integral converges to 4.",
            why: "Convergent improper integral."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "1/sqrt(x)",
          expected: "4",
          kind: "definite",
          lower: "0",
          upper: "4"
        }
      },
      {
        filename: "ex-04",
        title: "Divergence of a Reciprocal Integral near 0",
        exerciseReference: "Section 8.8, Exercise 4",
        originalTopic: "Divergent Type II Integral",
        difficulty: "tier2",
        tags: ["divergence", "type-II", "logarithm"],
        problemStatement: "Show that int_0^1 1/x dx diverges.",
        finalAnswer: "\\int_0^1 \\frac{1}{x} dx \\text{ diverges to } \\infty",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Limit at Discontinuity x = 0",
            mathExpression: "\\lim_{c \\to 0^+} \\int_c^1 \\frac{1}{x} dx = \\lim_{c \\to 0^+} [\\ln|x|]_c^1",
            explanation: "Evaluate proper integral from c to 1.",
            why: "Type II definition."
          },
          {
            stepNumber: 2,
            title: "Evaluate Expression in c",
            mathExpression: "\\ln(1) - \\ln(c) = 0 - \\ln(c) = -\\ln(c)",
            explanation: "Apply bounds.",
            why: "Algebraic limit expression."
          },
          {
            stepNumber: 3,
            title: "Take Limit as c -> 0+",
            mathExpression: "\\lim_{c \\to 0^+} (-\\ln(c)) = -(-\\infty) = +\\infty",
            explanation: "Since the limit is infinite, the integral diverges.",
            why: "Divergence conclusion."
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
        title: "Gabriel's Horn Paradox: Finite Volume and Infinite Area",
        exerciseReference: "Section 8.8, Exercise 5",
        originalTopic: "Gabriel's Horn Paradox",
        difficulty: "tier3",
        tags: ["gabriels-horn", "paradox", "improper-integral"],
        problemStatement: "For the curve y = 1/x on [1, oo) revolved about the x-axis, show that its volume V is finite (pi) while its surface area S is infinite.",
        finalAnswer: "V = \\pi < \\infty, \\quad S > 2\\pi \\int_1^\\infty \\frac{1}{x} dx = \\infty",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Volume of Revolution via Disks",
            mathExpression: "V = \\pi \\int_1^\\infty \\left(\\frac{1}{x}\\right)^2 dx = \\pi \\lim_{t \\to \\infty} \\left[ -\\frac{1}{x} \\right]_1^t = \\pi (0 - (-1)) = \\pi",
            explanation: "The p-integral with p = 2 converges to 1.",
            why: "Finite volume calculation."
          },
          {
            stepNumber: 2,
            title: "Formulate Surface Area Integral",
            mathExpression: "S = 2\\pi \\int_1^\\infty \\frac{1}{x} \\sqrt{1 + \\frac{1}{x^4}} \\, dx",
            explanation: "Since sqrt(1 + 1/x^4) > 1 for all x >= 1.",
            why: "Surface area formula."
          },
          {
            stepNumber: 3,
            title: "Apply Comparison Test to Surface Area",
            mathExpression: "S > 2\\pi \\int_1^\\infty \\frac{1}{x} dx = \\infty",
            explanation: "Since int 1/x dx diverges, the surface area diverges to infinity.",
            why: "Gabriel's horn paradox verified."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "pi/x**2",
          expected: "pi",
          kind: "definite",
          lower: "1",
          upper: "oo"
        }
      }
    ]
  },
  {
    chapter: "ch08",
    chapterDir: "ch08-techniques-of-integration",
    section: "8.9",
    sectionDir: "8.9-probability",
    title: "Probability",
    definitions: [
      {
        id: "def-probability-density-function",
        title: "Probability Density Function (PDF)",
        category: "definition",
        latex: "f(x) \\ge 0 \\quad \\forall x, \\quad \\int_{-\\infty}^\\infty f(x) dx = 1, \\quad P(a \\le X \\le b) = \\int_a^b f(x) dx",
        statement: "A probability density function f(x) models a continuous random variable X. The probability that X falls in [a, b] is the definite integral of f(x) over [a, b].",
        conditions: ["f(x) is non-negative", "Total integral over real line equals 1"],
        explanation: "Continuous probability is represented by area under the curve rather than discrete point values.",
        keyTakeaway: "Total area under any valid PDF must equal 1."
      },
      {
        id: "formula-mean-expected-value",
        title: "Expected Value (Mean) of a Random Variable",
        category: "formula",
        latex: "\\mu = E[X] = \\int_{-\\infty}^\\infty x \\, f(x) \\, dx",
        statement: "The mean or expected value of a continuous random variable X is the first moment of the probability density function with respect to the origin.",
        conditions: ["Integral converges absolutely"],
        explanation: "Analogous to the center of mass x_bar of a wire with density f(x).",
        keyTakeaway: "The expected value is the probability-weighted average of all possible outcomes."
      }
    ],
    summaryMDX: `# Section 8.9: Probability

Continuous probability models use definite and improper integrals to measure probabilities, expected values, and variances.

---

## 1. Core Properties of a PDF $f(x)$

1. $f(x) \\ge 0$ for all $x$.
2. $\\int_{-\\infty}^\\infty f(x) dx = 1$.
3. $P(a \\le X \\le b) = \\int_a^b f(x) dx$.

---

## 2. Exponential Distribution

$$
f(t) = \\begin{cases} c e^{-ct} & t \\ge 0 \\\\ 0 & t < 0 \\end{cases} \\implies \\mu = \\frac{1}{c}
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Normalizing a Linear Probability Density Function",
        exerciseReference: "Section 8.9, Exercise 1",
        originalTopic: "PDF Normalization Constant",
        difficulty: "tier1",
        tags: ["probability", "PDF", "normalization"],
        problemStatement: "Find the constant C such that f(x) = C x on [0, 4] (and 0 elsewhere) is a valid probability density function.",
        finalAnswer: "C = \\frac{1}{8}",
        steps: [
          {
            stepNumber: 1,
            title: "Set Total Probability Integral to 1",
            mathExpression: "\\int_0^4 C x \\, dx = 1",
            explanation: "The total area under any PDF must equal 1.",
            why: "PDF normalization condition."
          },
          {
            stepNumber: 2,
            title: "Evaluate Definite Integral",
            mathExpression: "C \\left[ \\frac{x^2}{2} \\right]_0^4 = C \\left( \\frac{16}{2} \\right) = 8C = 1",
            explanation: "Compute antiderivative of x.",
            why: "Linear integration."
          },
          {
            stepNumber: 3,
            title: "Solve for C",
            mathExpression: "8C = 1 \\implies C = \\frac{1}{8}",
            explanation: "Divide by 8.",
            why: "Determining constant."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1/8 * (4**2 / 2)",
          expected: "1"
        }
      },
      {
        filename: "ex-02",
        title: "Computing Probability from a PDF",
        exerciseReference: "Section 8.9, Exercise 2",
        originalTopic: "Event Probability Calculation",
        difficulty: "tier1",
        tags: ["probability", "definite-integral", "event"],
        problemStatement: "Given PDF f(x) = (1/8) x on [0, 4], find the probability P(1 <= X <= 3).",
        finalAnswer: "P(1 \\le X \\le 3) = \\frac{1}{2} = 0.5",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Probability Integral",
            mathExpression: "P(1 \\le X \\le 3) = \\int_1^3 \\frac{1}{8} x \\, dx",
            explanation: "Integrate PDF over interval [1, 3].",
            why: "Definition of continuous probability."
          },
          {
            stepNumber: 2,
            title: "Evaluate Integral",
            mathExpression: "\\frac{1}{8} \\left[ \\frac{x^2}{2} \\right]_1^3 = \\frac{1}{16} (9 - 1) = \\frac{8}{16} = \\frac{1}{2}",
            explanation: "Evaluate power antiderivative at boundaries.",
            why: "Final exact probability."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "(1/8)*x",
          expected: "1/2",
          kind: "definite",
          lower: "1",
          upper: "3"
        }
      },
      {
        filename: "ex-03",
        title: "Expected Value of a Continuous Random Variable",
        exerciseReference: "Section 8.9, Exercise 3",
        originalTopic: "Expected Value Calculation",
        difficulty: "tier1",
        tags: ["expected-value", "mean", "probability"],
        problemStatement: "Find the mean (expected value) E[X] for f(x) = (1/8) x on [0, 4].",
        finalAnswer: "\\mu = E[X] = \\frac{8}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "State Expected Value Integral",
            mathExpression: "E[X] = \\int_0^4 x \\cdot f(x) \\, dx = \\int_0^4 x \\left(\\frac{1}{8} x\\right) dx = \\frac{1}{8} \\int_0^4 x^2 dx",
            explanation: "Multiply x by f(x) and integrate.",
            why: "First moment definition of expected value."
          },
          {
            stepNumber: 2,
            title: "Evaluate Integral",
            mathExpression: "\\frac{1}{8} \\left[ \\frac{x^3}{3} \\right]_0^4 = \\frac{1}{24} (64 - 0) = \\frac{64}{24} = \\frac{8}{3}",
            explanation: "Simplify the fraction 64/24 by dividing by 8.",
            why: "Final exact mean."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "(1/8)*x**2",
          expected: "8/3",
          kind: "definite",
          lower: "0",
          upper: "4"
        }
      },
      {
        filename: "ex-04",
        title: "Exponential Waiting Time Distribution",
        exerciseReference: "Section 8.9, Exercise 4",
        originalTopic: "Exponential Distribution",
        difficulty: "tier2",
        tags: ["exponential-distribution", "improper-integral", "reliability"],
        problemStatement: "The waiting time T (in minutes) at a customer service line is exponentially distributed with PDF f(t) = 0.2 e^(-0.2t) for t >= 0. Find the probability that a customer waits more than 5 minutes.",
        finalAnswer: "P(T > 5) = e^{-1} \\approx 0.3679",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate Improper Probability Integral",
            mathExpression: "P(T > 5) = \\int_5^\\infty 0.2 e^{-0.2t} dt",
            explanation: "Integrate from 5 to infinity.",
            why: "Tail probability."
          },
          {
            stepNumber: 2,
            title: "Evaluate Antiderivative",
            mathExpression: "\\int 0.2 e^{-0.2t} dt = -e^{-0.2t} \\implies \\lim_{M \\to \\infty} [-e^{-0.2t}]_5^M",
            explanation: "Antiderivative of c e^(-ct) is -e^(-ct).",
            why: "Exponential integration."
          },
          {
            stepNumber: 3,
            title: "Evaluate Limit",
            mathExpression: "\\lim_{M \\to \\infty} (-e^{-0.2M} + e^{-0.2(5)}) = 0 + e^{-1} = e^{-1}",
            explanation: "e^(-0.2 * 5) = e^(-1).",
            why: "Final exact probability."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "0.2*exp(-0.2*x)",
          expected: "exp(-1)",
          kind: "definite",
          lower: "5",
          upper: "oo"
        }
      },
      {
        filename: "ex-05",
        title: "Mean of an Exponential Distribution via Integration by Parts",
        exerciseReference: "Section 8.9, Exercise 5",
        originalTopic: "Mean of Exponential Distribution",
        difficulty: "tier2",
        tags: ["exponential-distribution", "by-parts", "mean"],
        problemStatement: "Verify that the mean of the exponential distribution f(t) = c e^(-ct) on [0, oo) is 1/c.",
        finalAnswer: "\\mu = E[T] = \\frac{1}{c}",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Expected Value Integral",
            mathExpression: "E[T] = \\int_0^\\infty t (c e^{-ct}) dt",
            explanation: "Integrate t times PDF.",
            why: "Expected value formula."
          },
          {
            stepNumber: 2,
            title: "Apply Integration by Parts",
            mathExpression: "u = t \\implies du = dt; \\quad dv = c e^{-ct} dt \\implies v = -e^{-ct}",
            explanation: "Parts setup.",
            why: "Integration by parts on t e^(-ct)."
          },
          {
            stepNumber: 3,
            title: "Evaluate Boundary Terms and Remaining Integral",
            mathExpression: "\\lim_{M \\to \\infty} [-t e^{-ct}]_0^M + \\int_0^\\infty e^{-ct} dt = 0 + \\left[ -\\frac{e^{-ct}}{c} \\right]_0^\\infty = \\frac{1}{c}",
            explanation: "Boundary terms vanish; remaining integral yields 1/c.",
            why: "Mean of exponential distribution."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1/c - 1/c",
          expected: "0"
        }
      }
    ]
  }
];
