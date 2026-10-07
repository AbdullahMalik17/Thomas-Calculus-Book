// scripts/curriculum-data-ch03-part2.ts
/**
 * Authoritative Curriculum Data for Chapter 3 Sections 3.3 to 3.9
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH03_SECTIONS_PART2: SectionDef[] = [
  {
    chapter: "ch03",
    chapterDir: "ch03-derivatives",
    section: "3.3",
    sectionDir: "3.3-differentiation-rules",
    title: "Differentiation Rules",
    definitions: [
      {
        id: "rule-power-rule",
        title: "The Power Rule for Differentiation",
        category: "rule",
        latex: "\\frac{d}{dx}[x^n] = n x^{n-1} \\quad (n \\in \\mathbb{R})",
        statement: "For any real number n, the derivative of x^n with respect to x is n*x^(n-1).",
        conditions: ["x > 0 if n is not an integer", "Domain exclusions at x = 0 if n < 1"],
        explanation: "One of the most widely used rules in calculus, valid for positive integers, negatives, fractions, and irrational exponents.",
        keyTakeaway: "Multiply by the exponent, then decrement the exponent by 1."
      },
      {
        id: "rule-product-rule",
        title: "The Product Rule",
        category: "rule",
        latex: "\\frac{d}{dx}[u(x)v(x)] = u'(x)v(x) + u(x)v'(x)",
        statement: "The derivative of a product of two differentiable functions is the derivative of the first times the second, plus the first times the derivative of the second.",
        conditions: ["Both u and v must be differentiable at x"],
        explanation: "Derived geometrically from the expansion of a rectangle's area: Delta(uv) = u*Delta(v) + v*Delta(u) + Delta(u)*Delta(v).",
        keyTakeaway: "Derivative of a product is NOT the product of derivatives: (uv)' = u'v + uv'."
      },
      {
        id: "rule-quotient-rule",
        title: "The Quotient Rule",
        category: "rule",
        latex: "\\frac{d}{dx}\\left[\\frac{u(x)}{v(x)}\\right] = \\frac{u'(x)v(x) - u(x)v'(x)}{[v(x)]^2}",
        statement: "The derivative of a quotient of two differentiable functions is low d-high minus high d-low over the square of what's below.",
        conditions: ["Both u and v differentiable at x", "v(x) != 0"],
        explanation: "Notice the minus sign in the numerator; the order of differentiation is critical.",
        keyTakeaway: "Quotient rule numerator has subtraction: (u/v)' = (u'v - uv') / v^2."
      }
    ],
    summaryMDX: `# Section 3.3: Differentiation Rules

Calculating derivatives via difference quotient limits is computationally tedious. This section develops systematic algebraic differentiation rules.

---

## 1. Basic Rules

- **Constant Rule**: $\\frac{d}{dx}[c] = 0$
- **Power Rule**: $\\frac{d}{dx}[x^n] = n x^{n-1}$
- **Constant Multiple Rule**: $\\frac{d}{dx}[c f(x)] = c f'(x)$
- **Sum & Difference Rule**: $\\frac{d}{dx}[f(x) \\pm g(x)] = f'(x) \\pm g'(x)$

---

## 2. Product and Quotient Rules

- **Product Rule**:
  $$
  \\frac{d}{dx}[u \\cdot v] = u' v + u v'
  $$
- **Quotient Rule**:
  $$
  \\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{u' v - u v'}{v^2} \\quad (v \\neq 0)
  $$

---

## 3. Higher-Order Derivatives

Differentiating $f'(x)$ yields the **second derivative** $f''(x) = \\frac{d^2 y}{dx^2}$. Repeating gives $f'''(x)$, $f^{(4)}(x)$, ..., $f^{(n)}(x)$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Differentiating a Polynomial Expression",
        exerciseReference: "Section 3.3, Exercise 1",
        originalTopic: "Power and Sum Rules",
        difficulty: "tier1",
        tags: ["power-rule", "polynomial", "derivative"],
        problemStatement: "Find dy/dx for y = 4x^5 - 3x^3 + 7x - 9.",
        finalAnswer: "\\frac{dy}{dx} = 20x^4 - 9x^2 + 7",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Sum and Constant Multiple Rules",
            mathExpression: "\\frac{dy}{dx} = 4\\frac{d}{dx}[x^5] - 3\\frac{d}{dx}[x^3] + 7\\frac{d}{dx}[x] - \\frac{d}{dx}[9]",
            explanation: "Distribute the derivative operator term-by-term.",
            why: "Linearity of differentiation."
          },
          {
            stepNumber: 2,
            title: "Apply Power Rule and Constant Rule",
            mathExpression: "4(5x^4) - 3(3x^2) + 7(1) - 0 = 20x^4 - 9x^2 + 7",
            explanation: "Differentiate each power using d/dx[x^n] = n*x^(n-1).",
            why: "Power rule and constant rule."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "4*x**5 - 3*x**3 + 7*x - 9",
          expected: "20*x**4 - 9*x**2 + 7",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Applying the Product Rule",
        exerciseReference: "Section 3.3, Exercise 2",
        originalTopic: "Product Rule",
        difficulty: "tier1",
        tags: ["product-rule", "polynomial"],
        problemStatement: "Differentiate f(x) = (3x^2 - 2)(x^3 + 4x) using the Product Rule.",
        finalAnswer: "f'(x) = 15x^4 + 30x^2 - 8",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Component Functions and Their Derivatives",
            mathExpression: "u(x) = 3x^2 - 2 \\implies u'(x) = 6x; \\quad v(x) = x^3 + 4x \\implies v'(x) = 3x^2 + 4",
            explanation: "Label the two factors as u and v and differentiate each individually.",
            why: "Product rule formula setup."
          },
          {
            stepNumber: 2,
            title: "Apply Product Rule Formula",
            mathExpression: "f'(x) = u'v + uv' = (6x)(x^3 + 4x) + (3x^2 - 2)(3x^2 + 4)",
            explanation: "Assemble factors according to (uv)' = u'v + uv'.",
            why: "Product rule definition."
          },
          {
            stepNumber: 3,
            title: "Expand and Combine Like Terms",
            mathExpression: "(6x^4 + 24x^2) + (9x^4 + 12x^2 - 6x^2 - 8) = 15x^4 + 30x^2 - 8",
            explanation: "Expand products and group powers of x.",
            why: "Algebraic simplification to standard form."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "(3*x**2 - 2)*(x**3 + 4*x)",
          expected: "15*x**4 + 30*x**2 - 8",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Applying the Quotient Rule",
        exerciseReference: "Section 3.3, Exercise 3",
        originalTopic: "Quotient Rule",
        difficulty: "tier2",
        tags: ["quotient-rule", "rational-function"],
        problemStatement: "Differentiate g(x) = (2x + 1)/(x^2 + 3) using the Quotient Rule.",
        finalAnswer: "g'(x) = \\frac{-2x^2 - 2x + 6}{(x^2 + 3)^2}",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Numerator and Denominator Derivatives",
            mathExpression: "u = 2x + 1 \\implies u' = 2; \\quad v = x^2 + 3 \\implies v' = 2x",
            explanation: "Find derivatives of top u and bottom v.",
            why: "Quotient rule setup."
          },
          {
            stepNumber: 2,
            title: "Apply the Quotient Rule Formula",
            mathExpression: "g'(x) = \\frac{u'v - uv'}{v^2} = \\frac{2(x^2 + 3) - (2x + 1)(2x)}{(x^2 + 3)^2}",
            explanation: "Substitute into (u'v - uv') / v^2.",
            why: "Quotient rule formula."
          },
          {
            stepNumber: 3,
            title: "Expand and Simplify the Numerator",
            mathExpression: "\\frac{2x^2 + 6 - (4x^2 + 2x)}{(x^2 + 3)^2} = \\frac{-2x^2 - 2x + 6}{(x^2 + 3)^2}",
            explanation: "Distribute and combine like quadratic terms in the numerator.",
            why: "Leave denominator in factored form."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "(2*x + 1)/(x**2 + 3)",
          expected: "(-2*x**2 - 2*x + 6)/(x**2 + 3)**2",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Differentiating Fractional and Negative Powers",
        exerciseReference: "Section 3.3, Exercise 4",
        originalTopic: "General Power Rule",
        difficulty: "tier2",
        tags: ["power-rule", "fractional-exponents", "negative-exponents"],
        problemStatement: "Find dy/dx for y = 3*sqrt(x) - 2/x^2 + 5*x^(-1/3).",
        finalAnswer: "\\frac{dy}{dx} = \\frac{3}{2\\sqrt{x}} + \\frac{4}{x^3} - \\frac{5}{3x^{4/3}}",
        steps: [
          {
            stepNumber: 1,
            title: "Rewrite in Power Form",
            mathExpression: "y = 3x^{1/2} - 2x^{-2} + 5x^{-1/3}",
            explanation: "Convert radicals and reciprocals to power notation x^n.",
            why: "Standard form for applying the Power Rule."
          },
          {
            stepNumber: 2,
            title: "Apply Power Rule to Each Term",
            mathExpression: "\\frac{dy}{dx} = 3\\left(\\frac{1}{2}x^{-1/2}\\right) - 2(-2x^{-3}) + 5\\left(-\\frac{1}{3}x^{-4/3}\\right)",
            explanation: "Multiply by the exponent and subtract 1: 1/2 - 1 = -1/2, -2 - 1 = -3, -1/3 - 1 = -4/3.",
            why: "Power rule d/dx[x^n] = n*x^(n-1)."
          },
          {
            stepNumber: 3,
            title: "Simplify Coefficients",
            mathExpression: "\\frac{3}{2}x^{-1/2} + 4x^{-3} - \\frac{5}{3}x^{-4/3} = \\frac{3}{2\\sqrt{x}} + \\frac{4}{x^3} - \\frac{5}{3x^{4/3}}",
            explanation: "Combine scalar factors.",
            why: "Standard reporting format."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "3*sqrt(x) - 2/x**2 + 5*x**(-Rational(1,3))",
          expected: "3/(2*sqrt(x)) + 4/x**3 - 5/(3*x**(Rational(4,3)))",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Higher-Order Derivatives of a Quartic Polynomial",
        exerciseReference: "Section 3.3, Exercise 5",
        originalTopic: "Higher Order Derivatives",
        difficulty: "tier1",
        tags: ["higher-derivatives", "second-derivative", "polynomial"],
        problemStatement: "Find the first four derivatives of f(x) = x^4 - 2x^3 + 5x^2 - x + 7.",
        finalAnswer: "f'(x) = 4x^3 - 6x^2 + 10x - 1; \\; f''(x) = 12x^2 - 12x + 10; \\; f'''(x) = 24x - 12; \\; f^{(4)}(x) = 24",
        steps: [
          {
            stepNumber: 1,
            title: "Compute First Derivative f'(x)",
            mathExpression: "f'(x) = 4x^3 - 6x^2 + 10x - 1",
            explanation: "Apply power rule to f(x).",
            why: "First derivative gives slope."
          },
          {
            stepNumber: 2,
            title: "Compute Second Derivative f''(x)",
            mathExpression: "f''(x) = \\frac{d}{dx}[4x^3 - 6x^2 + 10x - 1] = 12x^2 - 12x + 10",
            explanation: "Differentiate f'(x).",
            why: "Second derivative gives concavity and acceleration."
          },
          {
            stepNumber: 3,
            title: "Compute Third and Fourth Derivatives",
            mathExpression: "f'''(x) = 24x - 12, \\quad f^{(4)}(x) = 24",
            explanation: "Differentiate successively until degree reaches zero.",
            why: "The nth derivative of an nth degree polynomial is constant n!*a_n."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "x**4 - 2*x**3 + 5*x**2 - x + 7",
          expected: "12*x**2 - 12*x + 10",
          variable: "x",
          order: 2
        }
      }
    ]
  },
  {
    chapter: "ch03",
    chapterDir: "ch03-derivatives",
    section: "3.4",
    sectionDir: "3.4-the-derivative-as-a-rate-of-change",
    title: "The Derivative as a Rate of Change",
    definitions: [
      {
        id: "def-motion-derivatives",
        title: "Kinematics: Velocity, Speed, Acceleration, and Jerk",
        category: "definition",
        latex: "v(t) = s'(t), \\quad \\text{Speed} = |v(t)|, \\quad a(t) = v'(t) = s''(t), \\quad j(t) = a'(t) = s'''(t)",
        statement: "For an object with position s(t): velocity is the rate of change of position, speed is the absolute magnitude of velocity, acceleration is the rate of change of velocity, and jerk is the rate of change of acceleration.",
        conditions: ["Position function s(t) is three times differentiable"],
        explanation: "When velocity and acceleration have the same sign, the object is speeding up; when they have opposite signs, it is slowing down.",
        keyTakeaway: "Speeding up: v and a have same sign; Slowing down: v and a have opposite signs."
      },
      {
        id: "def-marginal-functions",
        title: "Marginal Cost, Revenue, and Profit",
        category: "definition",
        latex: "MC(x) = C'(x), \\quad MR(x) = R'(x), \\quad MP(x) = P'(x) = R'(x) - C'(x)",
        statement: "In economics, marginal cost C'(x) is the instantaneous rate of change of total cost with respect to output x. It approximates the cost of producing one additional unit.",
        conditions: ["Cost function C(x) is differentiable"],
        explanation: "C'(x) approx C(x+1) - C(x) by linear approximation.",
        keyTakeaway: "Marginal analysis uses derivatives to approximate the effect of adding one unit."
      }
    ],
    summaryMDX: `# Section 3.4: The Derivative as a Rate of Change

Calculus models dynamic systems in physics, chemistry, engineering, and economics through rates of change.

---

## 1. Rectilinear Motion (Motion along a Line)

For position $s(t)$:
- **Velocity**: $v(t) = \frac{ds}{dt} = s'(t)$
- **Speed**: $|v(t)|$ (always non-negative)
- **Acceleration**: $a(t) = \frac{dv}{dt} = s''(t)$
- **Jerk**: $j(t) = \frac{da}{dt} = s'''(t)$

### Motion Classification:
- Moving **forward** (right/up): $v(t) > 0$
- Moving **backward** (left/down): $v(t) < 0$
- **At rest**: $v(t) = 0$
- **Speeding up**: $v(t)$ and $a(t)$ have the **same sign** ($v(t) \cdot a(t) > 0$).
- **Slowing down**: $v(t)$ and $a(t)$ have **opposite signs** ($v(t) \cdot a(t) < 0$).

---

## 2. Economics Applications

- **Marginal Cost**: $C'(x)$ approximates the cost of producing the $(x+1)$st item.
- **Profit Maximization**: Profit $P(x) = R(x) - C(x)$ is maximized when $P'(x) = 0 \implies MR = MC$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Particle Motion, Velocity, and Direction Changes",
        exerciseReference: "Section 3.4, Exercise 1",
        originalTopic: "Kinematics Analysis",
        difficulty: "tier2",
        tags: ["velocity", "acceleration", "particle-motion"],
        problemStatement: "A particle moves along a coordinate axis with position s(t) = t^3 - 6t^2 + 9t for t >= 0. Find velocity, acceleration, when the particle is at rest, and when it is speeding up.",
        finalAnswer: "v(t) = 3(t - 1)(t - 3); \\; \\text{At rest: } t = 1, 3; \\; \\text{Speeding up: } (1, 2) \\cup (3, \\infty)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Velocity and Acceleration Functions",
            mathExpression: "v(t) = s'(t) = 3t^2 - 12t + 9 = 3(t^2 - 4t + 3) = 3(t - 1)(t - 3); \\quad a(t) = v'(t) = 6t - 12 = 6(t - 2)",
            explanation: "Differentiate s(t) once for velocity and twice for acceleration.",
            why: "Kinematics definitions: v = s' and a = s''."
          },
          {
            stepNumber: 2,
            title: "Determine When Particle is at Rest",
            mathExpression: "v(t) = 0 \\implies 3(t - 1)(t - 3) = 0 \\implies t = 1 \\text{ s and } t = 3 \\text{ s}",
            explanation: "A particle is instantaneously at rest when its velocity is zero.",
            why: "Zero velocity marks direction reversals."
          },
          {
            stepNumber: 3,
            title: "Analyze Speeding Up Condition",
            mathExpression: "v(t)a(t) > 0: \\quad t \\in (1, 2) \\implies v < 0, a < 0 \\implies \\text{speeding up}; \\quad t > 3 \\implies v > 0, a > 0 \\implies \\text{speeding up}",
            explanation: "An object speeds up when velocity and acceleration share the same sign.",
            why: "Same sign of velocity and acceleration accelerates magnitude of velocity."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "t**3 - 6*t**2 + 9*t",
          expected: "3*t**2 - 12*t + 9",
          variable: "t"
        }
      },
      {
        filename: "ex-02",
        title: "Vertical Projectile Motion",
        exerciseReference: "Section 3.4, Exercise 2",
        originalTopic: "Projectile Kinematics",
        difficulty: "tier2",
        tags: ["projectile", "free-fall", "maximum-height"],
        problemStatement: "A projectile launched upward has height s(t) = -16t^2 + 96t + 112 feet. Find its maximum height and impact velocity.",
        finalAnswer: "\\text{Max height: } 256 \\text{ ft at } t = 3 \\text{ s}; \\quad \\text{Impact velocity: } -128 \\text{ ft/s at } t = 7 \\text{ s}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Velocity Function",
            mathExpression: "v(t) = s'(t) = -32t + 96",
            explanation: "Differentiate position function s(t).",
            why: "Velocity is the derivative of position."
          },
          {
            stepNumber: 2,
            title: "Find Time of Maximum Height",
            mathExpression: "v(t) = 0 \\implies -32t + 96 = 0 \\implies t = 3 \\text{ s}",
            explanation: "The projectile peaks when upward velocity reaches zero.",
            why: "Peak occurs at v = 0 before reversal."
          },
          {
            stepNumber: 3,
            title: "Calculate Maximum Height",
            mathExpression: "s(3) = -16(9) + 96(3) + 112 = -144 + 288 + 112 = 256 \\text{ ft}",
            explanation: "Evaluate s(3).",
            why: "Peak position."
          },
          {
            stepNumber: 4,
            title: "Find Ground Impact Time and Velocity",
            mathExpression: "s(t) = 0 \\implies -16(t^2 - 6t - 7) = 0 \\implies (t - 7)(t + 1) = 0 \\implies t = 7 \\text{ s}; \\quad v(7) = -32(7) + 96 = -128 \\text{ ft/s}",
            explanation: "Solve s(t) = 0 for positive t, then compute v(7).",
            why: "Impact occurs at s = 0."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "-16*t**2 + 96*t + 112",
          expected: "-32*t + 96",
          variable: "t"
        }
      },
      {
        filename: "ex-03",
        title: "Rate of Change of Volume of a Sphere",
        exerciseReference: "Section 3.4, Exercise 3",
        originalTopic: "Geometric Rate of Change",
        difficulty: "tier1",
        tags: ["geometry", "sphere", "surface-area"],
        problemStatement: "Show that the rate of change of the volume of a sphere with respect to its radius equals its surface area.",
        finalAnswer: "\\frac{dV}{dr} = 4\\pi r^2 = A(r)",
        steps: [
          {
            stepNumber: 1,
            title: "State Sphere Volume Formula",
            mathExpression: "V(r) = \\frac{4}{3}\\pi r^3",
            explanation: "Standard geometric formula for sphere volume.",
            why: "Starting functional relation."
          },
          {
            stepNumber: 2,
            title: "Differentiate with Respect to Radius r",
            mathExpression: "\\frac{dV}{dr} = \\frac{4}{3}\\pi \\frac{d}{dr}[r^3] = \\frac{4}{3}\\pi (3r^2) = 4\\pi r^2",
            explanation: "Apply power rule to r^3.",
            why: "The 3 in the exponent cancels the denominator 3."
          },
          {
            stepNumber: 3,
            title: "Identify with Surface Area",
            mathExpression: "4\\pi r^2 = A(r) \\quad (\\text{Surface Area of the sphere})",
            explanation: "Recognize that 4*pi*r^2 is precisely the surface area of a sphere of radius r.",
            why: "Geometric theorem: d/dr[Volume] = Surface Area."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "Rational(4,3)*pi*r**3",
          expected: "4*pi*r**2",
          variable: "r"
        }
      },
      {
        filename: "ex-04",
        title: "Marginal Cost Analysis in Economics",
        exerciseReference: "Section 3.4, Exercise 4",
        originalTopic: "Marginal Cost",
        difficulty: "tier1",
        tags: ["economics", "marginal-cost", "approximation"],
        problemStatement: "A company's cost to produce x units is C(x) = 2000 + 10x + 0.1x^2 dollars. Find the marginal cost function C'(x), evaluate it at x = 100, and compare with the actual cost of the 101st unit.",
        finalAnswer: "C'(x) = 10 + 0.2x; \\quad C'(100) = \\$30; \\quad \\text{Actual cost of 101st unit } = \\$30.10",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Marginal Cost Function",
            mathExpression: "C'(x) = \\frac{d}{dx}[2000 + 10x + 0.1x^2] = 10 + 0.2x",
            explanation: "Differentiate cost function C(x).",
            why: "Marginal cost is defined as the derivative of total cost."
          },
          {
            stepNumber: 2,
            title: "Evaluate at Production Level x = 100",
            mathExpression: "C'(100) = 10 + 0.2(100) = 10 + 20 = \\$30",
            explanation: "Substitute x = 100 into C'(x).",
            why: "Estimates the marginal cost of producing the 101st item."
          },
          {
            stepNumber: 3,
            title: "Calculate Exact Cost of 101st Unit",
            mathExpression: "C(101) - C(100) = [2000 + 10(101) + 0.1(101)^2] - [2000 + 10(100) + 0.1(100)^2] = 10 + 0.1(10201 - 10000) = 10 + 20.1 = \\$30.10",
            explanation: "Compute Delta C = C(101) - C(100).",
            why: "Demonstrates that marginal cost ($30) closely approximates discrete incremental cost ($30.10)."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "2000 + 10*x + Rational(1,10)*x**2",
          expected: "10 + x/5",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Harmonic Oscillation and Jerk",
        exerciseReference: "Section 3.4, Exercise 5",
        originalTopic: "Simple Harmonic Motion",
        difficulty: "tier2",
        tags: ["harmonic-motion", "trigonometric", "jerk"],
        problemStatement: "A mass on a spring has displacement s(t) = 4*cos(2t). Find velocity, acceleration, and jerk as functions of t.",
        finalAnswer: "v(t) = -8\\sin(2t), \\quad a(t) = -16\\cos(2t) = -4s(t), \\quad j(t) = 32\\sin(2t)",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate to Find Velocity",
            mathExpression: "v(t) = s'(t) = 4(-\\sin(2t) \\cdot 2) = -8\\sin(2t)",
            explanation: "Apply chain rule: d/dt[cos(2t)] = -2*sin(2t).",
            why: "Velocity is the derivative of position."
          },
          {
            stepNumber: 2,
            title: "Differentiate to Find Acceleration",
            mathExpression: "a(t) = v'(t) = -8(\\cos(2t) \\cdot 2) = -16\\cos(2t)",
            explanation: "Differentiate velocity.",
            why: "Acceleration is the derivative of velocity. Notice a(t) = -4s(t)."
          },
          {
            stepNumber: 3,
            title: "Differentiate to Find Jerk",
            mathExpression: "j(t) = a'(t) = -16(-\\sin(2t) \\cdot 2) = 32\\sin(2t)",
            explanation: "Differentiate acceleration.",
            why: "Jerk is the third time derivative of position."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          type: "derivative",
          expression: "4*cos(2*t)",
          expected: "-16*cos(2*t)",
          variable: "t",
          order: 2
        }
      }
    ]
  }
];
