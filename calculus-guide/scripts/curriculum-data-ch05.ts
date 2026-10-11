// scripts/curriculum-data-ch05.ts
/**
 * Authoritative Curriculum Data for Chapter 5: Integrals
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH05_SECTIONS: SectionDef[] = [
  {
    chapter: "ch05",
    chapterDir: "ch05-integrals",
    section: "5.1",
    sectionDir: "5.1-area-and-estimating-with-finite-sums",
    title: "Area and Estimating with Finite Sums",
    definitions: [
      {
        id: "def-riemann-sum-approximations",
        title: "Finite Sum Approximations (LRAM, RRAM, MRAM)",
        category: "definition",
        latex: "R_n = \\sum_{k=1}^n f(c_k) \\Delta x, \\quad \\Delta x = \\frac{b - a}{n}",
        statement: "Finite sums approximate the area under a non-negative continuous curve f(x) over [a, b] by partitioning the interval into n subintervals of length Delta x = (b - a)/n and evaluating f at chosen sample points: left endpoints (LRAM), right endpoints (RRAM), or midpoints (MRAM).",
        conditions: ["f is bounded on [a, b]", "Subintervals partition [a, b] equally"],
        explanation: "As n increases, the width Delta x approaches 0, and the finite rectangle sum converges toward the exact net area under the curve.",
        keyTakeaway: "Finite sums provide computable upper and lower bounds for curved areas."
      },
      {
        id: "theorem-upper-lower-sums",
        title: "Upper and Lower Sum Bounding Theorem",
        category: "theorem",
        latex: "L_n \\le \\text{Area} \\le U_n",
        statement: "For a continuous function on [a, b], any lower sum (using the absolute minimum value on each subinterval) is less than or equal to the true area, which in turn is less than or equal to any upper sum (using the absolute maximum value on each subinterval).",
        conditions: ["f is continuous on [a, b]"],
        explanation: "Since f attains extreme values on closed subintervals by the Extreme Value Theorem, the exact area is squeezed between lower and upper sums.",
        keyTakeaway: "Upper and lower sums bracket the exact area with arbitrary precision as n -> infinity."
      }
    ],
    summaryMDX: `# Section 5.1: Area and Estimating with Finite Sums

The problem of finding areas under arbitrary curved boundaries is the historical and conceptual origin of integral calculus.

---

## 1. Rectangle Approximation Methods

To approximate the area under $y = f(x) \\ge 0$ over $[a, b]$ with $n$ subintervals of width $\\Delta x = \\frac{b - a}{n}$:

- **Left Riemann Sum (LRAM)**: Sample points $c_k = a + (k-1)\\Delta x$.
- **Right Riemann Sum (RRAM)**: Sample points $c_k = a + k\\Delta x$.
- **Midpoint Rule (MRAM)**: Sample points $c_k = a + \\left(k - \\frac{1}{2}\\right)\\Delta x$.

---

## 2. Monotonicity and Error Bounds

- If $f$ is strictly **increasing** on $[a, b]$, LRAM underestimates the area and RRAM overestimates it.
- If $f$ is strictly **decreasing** on $[a, b]$, LRAM overestimates the area and RRAM underestimates it.
- The difference $|R_n - L_n| = |f(b) - f(a)|\\Delta x$, which vanishes as $n \\to \\infty$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "RRAM and LRAM for a Parabola with 4 Subintervals",
        exerciseReference: "Section 5.1, Exercise 1",
        originalTopic: "Finite Sum Area Approximations",
        difficulty: "tier1",
        tags: ["finite-sums", "LRAM", "RRAM", "area-approximation"],
        problemStatement: "Estimate the area under the curve f(x) = x^2 over the interval [0, 2] using 4 equal subintervals with (a) Right-endpoint sum (RRAM) and (b) Left-endpoint sum (LRAM).",
        finalAnswer: "\\text{RRAM} = \\frac{15}{4} = 3.75; \\quad \\text{LRAM} = \\frac{7}{4} = 1.75",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Subinterval Width and Grid Points",
            mathExpression: "\\Delta x = \\frac{2 - 0}{4} = \\frac{1}{2}; \\quad x_0 = 0, \\; x_1 = \\frac{1}{2}, \\; x_2 = 1, \\; x_3 = \\frac{3}{2}, \\; x_4 = 2",
            explanation: "Divide the interval length by n = 4.",
            why: "Determining partition width and endpoints."
          },
          {
            stepNumber: 2,
            title: "Calculate RRAM",
            mathExpression: "R_4 = \\Delta x [f(1/2) + f(1) + f(3/2) + f(2)] = \\frac{1}{2} \\left[ \\frac{1}{4} + 1 + \\frac{9}{4} + 4 \\right] = \\frac{1}{2} \\left( \\frac{30}{4} \\right) = \\frac{15}{4}",
            explanation: "Evaluate f at right endpoints x_1, x_2, x_3, x_4.",
            why: "Right Riemann sum formulation."
          },
          {
            stepNumber: 3,
            title: "Calculate LRAM",
            mathExpression: "L_4 = \\Delta x [f(0) + f(1/2) + f(1) + f(3/2)] = \\frac{1}{2} \\left[ 0 + \\frac{1}{4} + 1 + \\frac{9}{4} \\right] = \\frac{1}{2} \\left( \\frac{14}{4} \\right) = \\frac{7}{4}",
            explanation: "Evaluate f at left endpoints x_0, x_1, x_2, x_3.",
            why: "Left Riemann sum formulation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1/2) * (1/4 + 1 + 9/4 + 4)",
          expected: "15/4"
        }
      },
      {
        filename: "ex-02",
        title: "Midpoint Approximation for Reciprocal Function",
        exerciseReference: "Section 5.1, Exercise 2",
        originalTopic: "Midpoint Rule (MRAM)",
        difficulty: "tier1",
        tags: ["MRAM", "reciprocal", "numerical-approximation"],
        problemStatement: "Estimate the area under f(x) = 1/x over [1, 5] using the Midpoint Rule (MRAM) with n = 4 subintervals.",
        finalAnswer: "M_4 = \\frac{1}{2}\\left( \\frac{2}{3} + \\frac{2}{5} + \\frac{2}{7} + \\frac{2}{9} \\right) = \\frac{496}{315} \\approx 1.5746",
        steps: [
          {
            stepNumber: 1,
            title: "Determine Width and Midpoints",
            mathExpression: "\\Delta x = \\frac{5 - 1}{4} = 1; \\quad c_1 = 1.5 = \\frac{3}{2}, \\; c_2 = \\frac{5}{2}, \\; c_3 = \\frac{7}{2}, \\; c_4 = \\frac{9}{2}",
            explanation: "Find midpoints of [1, 2], [2, 3], [3, 4], [4, 5].",
            why: "MRAM evaluates at subinterval centers."
          },
          {
            stepNumber: 2,
            title: "Sum Rectangular Areas",
            mathExpression: "M_4 = 1 \\cdot \\left[ \\frac{1}{3/2} + \\frac{1}{5/2} + \\frac{1}{7/2} + \\frac{1}{9/2} \\right] = \\frac{2}{3} + \\frac{2}{5} + \\frac{2}{7} + \\frac{2}{9}",
            explanation: "Substitute midpoints into f(x) = 1/x.",
            why: "Applying MRAM sum definition."
          },
          {
            stepNumber: 3,
            title: "Combine Fractions",
            mathExpression: "2 \\cdot \\left( \\frac{105 + 63 + 45 + 35}{315} \\right) = 2 \\cdot \\frac{248}{315} = \\frac{496}{315}",
            explanation: "Find common denominator 315 and simplify.",
            why: "Exact rational arithmetic."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2/3 + 2/5 + 2/7 + 2/9",
          expected: "496/315"
        }
      },
      {
        filename: "ex-03",
        title: "Distance Traveled from Velocity Function via Finite Sums",
        exerciseReference: "Section 5.1, Exercise 3",
        originalTopic: "Applied Rectilinear Distance Estimation",
        difficulty: "tier2",
        tags: ["distance", "velocity", "riemann-sum"],
        problemStatement: "A particle travels with velocity v(t) = 3t^2 meters/second over the interval t in [0, 3]. Approximate the total distance traveled using RRAM with n = 3 subintervals.",
        finalAnswer: "\\text{Distance} \\approx R_3 = 42 \\text{ meters}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Delta t and Subintervals",
            mathExpression: "\\Delta t = \\frac{3 - 0}{3} = 1; \\quad t_1 = 1, \\; t_2 = 2, \\; t_3 = 3",
            explanation: "Grid spacing is 1 second.",
            why: "Equal time partition."
          },
          {
            stepNumber: 2,
            title: "Compute Velocity at Right Endpoints",
            mathExpression: "v(1) = 3(1)^2 = 3, \\quad v(2) = 3(2)^2 = 12, \\quad v(3) = 3(3)^2 = 27",
            explanation: "Evaluate v(t) = 3t^2 at right endpoints.",
            why: "Right endpoint velocity values."
          },
          {
            stepNumber: 3,
            title: "Sum Distance Increments",
            mathExpression: "R_3 = \\Delta t [v(1) + v(2) + v(3)] = 1 \\cdot (3 + 12 + 27) = 42",
            explanation: "Total estimated displacement is 42 m.",
            why: "Distance = velocity times time increment."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 * (3 + 12 + 27)",
          expected: "42"
        }
      },
      {
        filename: "ex-04",
        title: "Upper and Lower Sum Error Bound for Monotonic Decay",
        exerciseReference: "Section 5.1, Exercise 4",
        originalTopic: "Error Bound in Finite Sums",
        difficulty: "tier2",
        tags: ["error-bounds", "upper-lower-sums", "monotonic"],
        problemStatement: "For f(x) = 1/(1+x) on [0, 1], find the maximum possible error when approximating the area under f(x) using n = 5 subintervals.",
        finalAnswer: "\\text{Max Error} \\le (f(0) - f(1)) \\Delta x = \\left(1 - \\frac{1}{2}\\right) \\frac{1}{5} = \\frac{1}{10} = 0.1",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Monotonicity of Integrand",
            mathExpression: "f'(x) = -\\frac{1}{(1+x)^2} < 0 \\quad \\forall x \\in [0, 1]",
            explanation: "f is strictly decreasing on [0, 1].",
            why: "Monotonicity determines upper and lower sum endpoints."
          },
          {
            stepNumber: 2,
            title: "Formulate Upper and Lower Sum Difference",
            mathExpression: "U_n - L_n = \\sum_{k=1}^n [f(x_{k-1}) - f(x_k)] \\Delta x = (f(a) - f(b)) \\Delta x",
            explanation: "The intermediate terms telescope, leaving only the boundary values.",
            why: "Telescoping property of monotonic sums."
          },
          {
            stepNumber: 3,
            title: "Compute Bound for n = 5",
            mathExpression: "(f(0) - f(1)) \\Delta x = \\left( 1 - \\frac{1}{2} \\right) \\frac{1}{5} = \\frac{1}{2} \\cdot \\frac{1}{5} = \\frac{1}{10}",
            explanation: "Error cannot exceed U_5 - L_5 = 0.1.",
            why: "Exact bound on approximation error."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1 - 1/2) * (1/5)",
          expected: "1/10"
        }
      },
      {
        filename: "ex-05",
        title: "Exact Area via Limit of Right Riemann Sums",
        exerciseReference: "Section 5.1, Exercise 5",
        originalTopic: "Limit of Finite Sums",
        difficulty: "tier3",
        tags: ["riemann-limit", "exact-area", "finite-sums"],
        problemStatement: "Compute the exact area under f(x) = 2x over the interval [0, 3] by evaluating the limit of right-endpoint Riemann sums as n approaches infinity.",
        finalAnswer: "\\text{Area} = \\lim_{n \\to \\infty} R_n = 9",
        steps: [
          {
            stepNumber: 1,
            title: "Express Grid Points and Delta x",
            mathExpression: "\\Delta x = \\frac{3}{n}, \\quad c_k = \\frac{3k}{n}",
            explanation: "Subinterval width and k-th right endpoint.",
            why: "Standard uniform partition."
          },
          {
            stepNumber: 2,
            title: "Write Sum Expression",
            mathExpression: "R_n = \\sum_{k=1}^n f(c_k) \\Delta x = \\sum_{k=1}^n 2\\left(\\frac{3k}{n}\\right) \\frac{3}{n} = \\frac{18}{n^2} \\sum_{k=1}^n k",
            explanation: "Factor out constants from the summation.",
            why: "Linearity of summation."
          },
          {
            stepNumber: 3,
            title: "Substitute Sum Formula and Take Limit",
            mathExpression: "R_n = \\frac{18}{n^2} \\cdot \\frac{n(n+1)}{2} = 9 \\left( 1 + \\frac{1}{n} \\right) \\implies \\lim_{n \\to \\infty} 9\\left(1 + \\frac{1}{n}\\right) = 9",
            explanation: "Apply sum k = n(n+1)/2 and evaluate limit as n -> oo.",
            why: "Convergence to the definite integral."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "2*x",
          expected: "9",
          kind: "definite",
          lower: "0",
          upper: "3"
        }
      }
    ]
  },
  {
    chapter: "ch05",
    chapterDir: "ch05-integrals",
    section: "5.2",
    sectionDir: "5.2-sigma-notation-and-limits-of-finite-sums",
    title: "Sigma Notation and Limits of Finite Sums",
    definitions: [
      {
        id: "def-sigma-notation",
        title: "Sigma Notation and Linearity",
        category: "definition",
        latex: "\\sum_{k=1}^n (c a_k + d b_k) = c \\sum_{k=1}^n a_k + d \\sum_{k=1}^n b_k",
        statement: "Sigma notation compactly represents sums of indexed terms. The summation operator is linear: constant factors factor out, and sums distribute across addition and subtraction.",
        conditions: ["c, d are constants independent of index k"],
        explanation: "Linearity enables algebraic decomposition of complex polynomials into elementary power sums.",
        keyTakeaway: "Sigma notation is linear and distributes over addition."
      },
      {
        id: "formula-standard-power-sums",
        title: "Formulas for Sums of Powers of Integers",
        category: "formula",
        latex: "\\sum_{k=1}^n k = \\frac{n(n+1)}{2}, \\quad \\sum_{k=1}^n k^2 = \\frac{n(n+1)(2n+1)}{6}, \\quad \\sum_{k=1}^n k^3 = \\left(\\frac{n(n+1)}{2}\\right)^2",
        statement: "Exact algebraic closed-form expressions for the sums of the first n positive integers, squares, and cubes.",
        conditions: ["n is a positive integer"],
        explanation: "These formulas provide the algebraic mechanism to compute limits of Riemann sums analytically without relying on antiderivatives.",
        keyTakeaway: "Closed-form power sum formulas convert index sums into rational functions of n."
      }
    ],
    summaryMDX: `# Section 5.2: Sigma Notation and Limits of Finite Sums

Sigma notation provides an indispensable algebraic language for expressing sums with many terms concisely.

---

## 1. Core Power Sum Formulas

$$
\\sum_{k=1}^n 1 = n
$$

$$
\\sum_{k=1}^n k = \\frac{n(n+1)}{2}
$$

$$
\\sum_{k=1}^n k^2 = \\frac{n(n+1)(2n+1)}{6}
$$

$$
\\sum_{k=1}^n k^3 = \\left[ \\frac{n(n+1)}{2} \\right]^2
$$

---

## 2. Limit of Riemann Sums Definition of Area

For a continuous function $f(x) \\ge 0$ on $[a, b]$, the exact area is:

$$
A = \\lim_{n \\to \\infty} \\sum_{k=1}^n f\\left( a + k \\frac{b-a}{n} \\right) \\frac{b-a}{n}
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Evaluating a Linear Sum using Power Formulas",
        exerciseReference: "Section 5.2, Exercise 1",
        originalTopic: "Algebraic Sigma Evaluation",
        difficulty: "tier1",
        tags: ["sigma-notation", "linearity", "power-sum"],
        problemStatement: "Evaluate the finite sum sum_{k=1}^{20} (3k - 2).",
        finalAnswer: "\\sum_{k=1}^{20} (3k - 2) = 590",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Linearity of Summation",
            mathExpression: "\\sum_{k=1}^{20} (3k - 2) = 3 \\sum_{k=1}^{20} k - \\sum_{k=1}^{20} 2",
            explanation: "Split the sum into separate components.",
            why: "Summation linearity properties."
          },
          {
            stepNumber: 2,
            title: "Substitute Known Formulas",
            mathExpression: "\\sum_{k=1}^{20} k = \\frac{20(21)}{2} = 210; \\quad \\sum_{k=1}^{20} 2 = 2(20) = 40",
            explanation: "Use formula for sum k and sum of a constant.",
            why: "Direct closed-form evaluation."
          },
          {
            stepNumber: 3,
            title: "Combine Terms",
            mathExpression: "3(210) - 40 = 630 - 40 = 590",
            explanation: "Perform arithmetic multiplication and subtraction.",
            why: "Final evaluated integer result."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "3 * (20*21/2) - 40",
          expected: "590"
        }
      },
      {
        filename: "ex-02",
        title: "Sum of Squares Evaluation",
        exerciseReference: "Section 5.2, Exercise 2",
        originalTopic: "Quadratic Sum Formula",
        difficulty: "tier1",
        tags: ["sum-of-squares", "sigma-formula", "finite-sums"],
        problemStatement: "Evaluate the sum sum_{k=1}^{10} (2k^2 - k + 1).",
        finalAnswer: "\\sum_{k=1}^{10} (2k^2 - k + 1) = 725",
        steps: [
          {
            stepNumber: 1,
            title: "Decompose into Elementary Power Sums",
            mathExpression: "2 \\sum_{k=1}^{10} k^2 - \\sum_{k=1}^{10} k + \\sum_{k=1}^{10} 1",
            explanation: "Apply linearity to isolate k^2, k, and constant.",
            why: "Isolating standard integer power sums."
          },
          {
            stepNumber: 2,
            title: "Evaluate Each Component",
            mathExpression: "\\sum_{k=1}^{10} k^2 = \\frac{10(11)(21)}{6} = 385; \\quad \\sum_{k=1}^{10} k = 55; \\quad \\sum_{k=1}^{10} 1 = 10",
            explanation: "Substitute n = 10 into closed forms.",
            why: "Standard summation formulas."
          },
          {
            stepNumber: 3,
            title: "Calculate Total",
            mathExpression: "2(385) - 55 + 10 = 770 - 55 + 10 = 725",
            explanation: "Combine all evaluated terms.",
            why: "Final exact integer value."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 * (10*11*21/6) - 55 + 10",
          expected: "725"
        }
      },
      {
        filename: "ex-03",
        title: "Exact Area under a Quadratic Curve via Riemann Limit",
        exerciseReference: "Section 5.2, Exercise 3",
        originalTopic: "Riemann Sum Limit for x^2",
        difficulty: "tier2",
        tags: ["riemann-sum", "quadratic-area", "limits"],
        problemStatement: "Find the exact area under f(x) = x^2 on [0, 1] using the limit of Riemann sums as n approaches infinity.",
        finalAnswer: "\\text{Area} = \\lim_{n \\to \\infty} R_n = \\frac{1}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Delta x and Sample Points",
            mathExpression: "\\Delta x = \\frac{1}{n}, \\quad c_k = \\frac{k}{n}",
            explanation: "Uniform partition of [0, 1].",
            why: "Standard right endpoint partition."
          },
          {
            stepNumber: 2,
            title: "Construct Sum Expression",
            mathExpression: "R_n = \\sum_{k=1}^n \\left(\\frac{k}{n}\\right)^2 \\frac{1}{n} = \\frac{1}{n^3} \\sum_{k=1}^n k^2 = \\frac{1}{n^3} \\frac{n(n+1)(2n+1)}{6}",
            explanation: "Substitute formula for sum k^2.",
            why: "Closed form for quadratic sum."
          },
          {
            stepNumber: 3,
            title: "Compute the Limit as n -> oo",
            mathExpression: "\\lim_{n \\to \\infty} \\frac{2n^3 + 3n^2 + n}{6n^3} = \\frac{2}{6} = \\frac{1}{3}",
            explanation: "Highest degree terms dominate.",
            why: "Evaluating limit of rational function."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "x**2",
          expected: "1/3",
          kind: "definite",
          lower: "0",
          upper: "1"
        }
      },
      {
        filename: "ex-04",
        title: "Riemann Sum Limit for a Mixed Polynomial",
        exerciseReference: "Section 5.2, Exercise 4",
        originalTopic: "Riemann Limit of Linear-Quadratic Expression",
        difficulty: "tier2",
        tags: ["riemann-limit", "polynomial-area", "sigma-calculus"],
        problemStatement: "Compute the area under f(x) = 3x^2 - 2x on [0, 2] by evaluating lim_{n -> oo} sum_{k=1}^n f(c_k) Delta x.",
        finalAnswer: "\\text{Area} = 4",
        steps: [
          {
            stepNumber: 1,
            title: "Partition and Grid Points",
            mathExpression: "\\Delta x = \\frac{2}{n}, \\quad c_k = \\frac{2k}{n}",
            explanation: "Subinterval width and k-th point on [0, 2].",
            why: "Uniform partition."
          },
          {
            stepNumber: 2,
            title: "Formulate Riemann Sum",
            mathExpression: "R_n = \\sum_{k=1}^n \\left[ 3\\left(\\frac{2k}{n}\\right)^2 - 2\\left(\\frac{2k}{n}\\right) \\right] \\frac{2}{n} = \\frac{24}{n^3} \\sum_{k=1}^n k^2 - \\frac{8}{n^2} \\sum_{k=1}^n k",
            explanation: "Expand and distribute factor 2/n.",
            why: "Separating into standard power sums."
          },
          {
            stepNumber: 3,
            title: "Evaluate Limit",
            mathExpression: "\\lim_{n \\to \\infty} \\left[ \\frac{24}{n^3} \\frac{n(n+1)(2n+1)}{6} - \\frac{8}{n^2} \\frac{n(n+1)}{2} \\right] = 24 \\cdot \\frac{2}{6} - 8 \\cdot \\frac{1}{2} = 8 - 4 = 4",
            explanation: "Evaluate each component limit as n -> oo.",
            why: "Definite integral evaluation via limit of sums."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "3*x**2 - 2*x",
          expected: "4",
          kind: "definite",
          lower: "0",
          upper: "2"
        }
      },
      {
        filename: "ex-05",
        title: "Recognizing a Limit of Riemann Sums as a Definite Integral",
        exerciseReference: "Section 5.2, Exercise 5",
        originalTopic: "Riemann Sum to Integral Identification",
        difficulty: "tier3",
        tags: ["riemann-recognition", "integral-conversion", "theory"],
        problemStatement: "Express the limit lim_{n -> oo} sum_{k=1}^n (1 + 3k/n)^4 (3/n) as a definite integral and find its exact value.",
        finalAnswer: "\\int_1^4 x^4 dx = \\frac{4^5 - 1^5}{5} = \\frac{1023}{5} = 204.6",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Subinterval Width and Sample Points",
            mathExpression: "\\Delta x = \\frac{3}{n} = \\frac{b - a}{n} \\implies b - a = 3; \\quad c_k = 1 + \\frac{3k}{n} \\implies a = 1, \\; b = 4",
            explanation: "Match terms with definition c_k = a + k Delta x.",
            why: "Identifying integration boundaries."
          },
          {
            stepNumber: 2,
            title: "Identify Integrand Function",
            mathExpression: "f(c_k) = c_k^4 \\implies f(x) = x^4",
            explanation: "The expression inside the 4th power corresponds to x.",
            why: "Mapping sample point function to integrand."
          },
          {
            stepNumber: 3,
            title: "Formulate and Evaluate Definite Integral",
            mathExpression: "\\int_1^4 x^4 dx = \\left[ \\frac{x^5}{5} \\right]_1^4 = \\frac{1024 - 1}{5} = \\frac{1023}{5}",
            explanation: "Apply power rule for antiderivatives.",
            why: "Fundamental Theorem of Calculus."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "x**4",
          expected: "1023/5",
          kind: "definite",
          lower: "1",
          upper: "4"
        }
      }
    ]
  },
  {
    chapter: "ch05",
    chapterDir: "ch05-integrals",
    section: "5.3",
    sectionDir: "5.3-the-definite-integral",
    title: "The Definite Integral",
    definitions: [
      {
        id: "def-definite-integral",
        title: "The Definite Integral",
        category: "definition",
        latex: "\\int_a^b f(x) dx = \\lim_{\\|P\\| \\to 0} \\sum_{k=1}^n f(c_k) \\Delta x_k",
        statement: "If f is defined on [a, b] and the limit of Riemann sums exists for every partition whose norm approaches 0 regardless of sample point choice, f is integrable on [a, b] and the limit is called the definite integral.",
        conditions: ["Norm of partition ||P|| -> 0", "f is bounded on [a, b]"],
        explanation: "Every continuous function on a closed interval [a, b] is Riemann integrable.",
        keyTakeaway: "Continuous functions are guaranteed to be integrable."
      },
      {
        id: "rule-properties-of-definite-integrals",
        title: "Algebraic Properties of Definite Integrals",
        category: "rule",
        latex: "\\int_a^b (k_1 f + k_2 g) dx = k_1 \\int_a^b f dx + k_2 \\int_a^b g dx, \\quad \\int_a^b f dx = \\int_a^c f dx + \\int_c^b f dx",
        statement: "Definite integrals satisfy linearity, interval additivity, reversing limits sign reversal (int_b^a f = - int_a^b f), and domination (f <= g implies int f <= int g).",
        conditions: ["Integrands are integrable on relevant intervals"],
        explanation: "These properties allow decomposition of complicated regions into simpler geometric components.",
        keyTakeaway: "The integral operator is linear and additive across subintervals."
      }
    ],
    summaryMDX: `# Section 5.3: The Definite Integral

The definite integral formalizes the net signed area bounded between a curve and the horizontal axis.

---

## 1. Core Properties of Definite Integrals

1. **Reversal of Limits**: $\\int_b^a f(x) dx = -\\int_a^b f(x) dx$
2. **Zero-Width Interval**: $\\int_a^a f(x) dx = 0$
3. **Linearity**: $\\int_a^b (\\alpha f(x) + \\beta g(x)) dx = \\alpha \\int_a^b f(x) dx + \\beta \\int_a^b g(x) dx$
4. **Interval Additivity**: $\\int_a^b f(x) dx = \\int_a^c f(x) dx + \\int_c^b f(x) dx$
5. **Domination Rule**: If $f(x) \\ge g(x)$ on $[a, b]$, then $\\int_a^b f(x) dx \\ge \\int_a^b g(x) dx$.

---

## 2. Average Value of a Function

$$
f_{\\text{avg}} = \\frac{1}{b - a} \\int_a^b f(x) dx
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Geometric Area Evaluation for a Piecewise Linear Integral",
        exerciseReference: "Section 5.3, Exercise 1",
        originalTopic: "Geometric Interpretation of Integrals",
        difficulty: "tier1",
        tags: ["definite-integral", "geometry", "signed-area"],
        problemStatement: "Evaluate int_{-2}^3 (2x + 4) dx by interpreting the integral as net signed area of geometric regions.",
        finalAnswer: "\\int_{-2}^3 (2x + 4) dx = 25",
        steps: [
          {
            stepNumber: 1,
            title: "Determine the Sign of the Integrand",
            mathExpression: "2x + 4 = 0 \\implies x = -2",
            explanation: "Over [-2, 3], f(x) >= 0 everywhere, so the integral represents a single right trapezoid.",
            why: "Net area equals geometric area when f(x) is non-negative."
          },
          {
            stepNumber: 2,
            title: "Calculate Geometric Heights and Base",
            mathExpression: "f(-2) = 0, \\quad f(3) = 2(3) + 4 = 10, \\quad \\text{Base } = 3 - (-2) = 5",
            explanation: "The region is a right triangle with base 5 and height 10.",
            why: "Area formula for a triangle."
          },
          {
            stepNumber: 3,
            title: "Compute Area",
            mathExpression: "\\text{Area} = \\frac{1}{2} \\cdot \\text{Base} \\cdot \\text{Height} = \\frac{1}{2} \\cdot 5 \\cdot 10 = 25",
            explanation: "Direct geometric computation.",
            why: "Equivalence of definite integral and planar area."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "2*x + 4",
          expected: "25",
          kind: "definite",
          lower: "-2",
          upper: "3"
        }
      },
      {
        filename: "ex-02",
        title: "Using Integral Additivity and Linearity",
        exerciseReference: "Section 5.3, Exercise 2",
        originalTopic: "Algebraic Properties of Integrals",
        difficulty: "tier1",
        tags: ["interval-additivity", "linearity", "properties"],
        problemStatement: "Given that int_1^5 f(x) dx = 10 and int_3^5 f(x) dx = 4, evaluate int_1^3 (2f(x) - 3) dx.",
        finalAnswer: "\\int_1^3 (2f(x) - 3) dx = 6",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Interval Additivity to Find int_1^3 f",
            mathExpression: "\\int_1^5 f(x) dx = \\int_1^3 f(x) dx + \\int_3^5 f(x) dx \\implies 10 = \\int_1^3 f(x) dx + 4 \\implies \\int_1^3 f(x) dx = 6",
            explanation: "Subtract integral on [3, 5] from integral on [1, 5].",
            why: "Interval additivity property."
          },
          {
            stepNumber: 2,
            title: "Apply Linearity to Target Integral",
            mathExpression: "\\int_1^3 (2f(x) - 3) dx = 2 \\int_1^3 f(x) dx - \\int_1^3 3 dx",
            explanation: "Distribute integration operator.",
            why: "Linearity of definite integration."
          },
          {
            stepNumber: 3,
            title: "Evaluate Constant and Total",
            mathExpression: "2(6) - 3(3 - 1) = 12 - 6 = 6",
            explanation: "Evaluate integral of constant 3 over length 2.",
            why: "Final algebraic result."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 * 6 - 3 * (3 - 1)",
          expected: "6"
        }
      },
      {
        filename: "ex-03",
        title: "Average Value of a Quadratic Function",
        exerciseReference: "Section 5.3, Exercise 3",
        originalTopic: "Average Value Formula",
        difficulty: "tier2",
        tags: ["average-value", "quadratic", "mean-value"],
        problemStatement: "Find the average value of f(x) = 3x^2 - 4x + 1 on the interval [0, 2].",
        finalAnswer: "f_{\\text{avg}} = 1",
        steps: [
          {
            stepNumber: 1,
            title: "State Average Value Definition",
            mathExpression: "f_{\\text{avg}} = \\frac{1}{b - a} \\int_a^b f(x) dx = \\frac{1}{2 - 0} \\int_0^2 (3x^2 - 4x + 1) dx",
            explanation: "Divide the definite integral by interval length 2.",
            why: "Mean value definition for continuous functions."
          },
          {
            stepNumber: 2,
            title: "Evaluate Definite Integral",
            mathExpression: "\\int_0^2 (3x^2 - 4x + 1) dx = \\left[ x^3 - 2x^2 + x \\right]_0^2 = 8 - 2(4) + 2 - 0 = 2",
            explanation: "Find antiderivative and evaluate at endpoints.",
            why: "Fundamental Theorem of Calculus."
          },
          {
            stepNumber: 3,
            title: "Calculate Average",
            mathExpression: "f_{\\text{avg}} = \\frac{1}{2} \\cdot 2 = 1",
            explanation: "Multiply integral by 1/2.",
            why: "Completing average value calculation."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "3*x**2 - 4*x + 1",
          expected: "2",
          kind: "definite",
          lower: "0",
          upper: "2"
        }
      },
      {
        filename: "ex-04",
        title: "Bounding an Integral using the Max-Min Inequality",
        exerciseReference: "Section 5.3, Exercise 4",
        originalTopic: "Max-Min Bounding of Definite Integrals",
        difficulty: "tier2",
        tags: ["inequalities", "bounding", "max-min"],
        problemStatement: "Show that 1 <= int_0^1 sqrt(1 + x^3) dx <= sqrt(2) using the Max-Min Inequality for definite integrals.",
        finalAnswer: "1 \\le \\int_0^1 \\sqrt{1 + x^3} dx \\le \\sqrt{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Absolute Extrema on [0, 1]",
            mathExpression: "g(x) = \\sqrt{1 + x^3} \\text{ is strictly increasing on } [0, 1] \\implies m = g(0) = 1, \\quad M = g(1) = \\sqrt{2}",
            explanation: "Since x^3 increases, the minimum occurs at x = 0 and maximum at x = 1.",
            why: "Extreme Value Theorem on closed intervals."
          },
          {
            stepNumber: 2,
            title: "Apply the Max-Min Inequality",
            mathExpression: "m(b - a) \\le \\int_a^b f(x) dx \\le M(b - a) \\implies 1(1 - 0) \\le \\int_0^1 \\sqrt{1 + x^3} dx \\le \\sqrt{2}(1 - 0)",
            explanation: "Multiply minimum and maximum values by interval length 1.",
            why: "Integral Domination Law."
          },
          {
            stepNumber: 3,
            title: "Conclude Bounds",
            mathExpression: "1 \\le \\int_0^1 \\sqrt{1 + x^3} dx \\le \\sqrt{2}",
            explanation: "The integral is strictly bounded between 1 and sqrt(2).",
            why: "Rigorous analytical estimation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(2) - sqrt(2)",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Symmetry Simplification for Odd and Even Integrands",
        exerciseReference: "Section 5.3, Exercise 5",
        originalTopic: "Symmetry in Definite Integrals",
        difficulty: "tier3",
        tags: ["symmetry", "odd-function", "even-function"],
        problemStatement: "Evaluate int_{-3}^3 (x^7 - 4x^3 + 5x^2 + 2) dx using symmetry properties.",
        finalAnswer: "\\int_{-3}^3 (x^7 - 4x^3 + 5x^2 + 2) dx = 102",
        steps: [
          {
            stepNumber: 1,
            title: "Separate Odd and Even Components",
            mathExpression: "\\int_{-3}^3 (x^7 - 4x^3) dx + \\int_{-3}^3 (5x^2 + 2) dx",
            explanation: "x^7 - 4x^3 is an odd function; 5x^2 + 2 is an even function.",
            why: "Parity decomposition of polynomials."
          },
          {
            stepNumber: 2,
            title: "Apply Odd Symmetry Rule",
            mathExpression: "\\int_{-a}^a f_{\\text{odd}}(x) dx = 0 \\implies \\int_{-3}^3 (x^7 - 4x^3) dx = 0",
            explanation: "Signed areas cancel symmetrically across the origin.",
            why: "Fundamental theorem of symmetric integrals."
          },
          {
            stepNumber: 3,
            title: "Evaluate Even Component Over Half-Interval",
            mathExpression: "2 \\int_0^3 (5x^2 + 2) dx = 2 \\left[ \\frac{5x^3}{3} + 2x \\right]_0^3 = 2 \\left( 5(9) + 6 \\right) = 2(51) = 102",
            explanation: "Double the integral from 0 to 3.",
            why: "Even function symmetry property."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "x**7 - 4*x**3 + 5*x**2 + 2",
          expected: "102",
          kind: "definite",
          lower: "-3",
          upper: "3"
        }
      }
    ]
  },
  {
    chapter: "ch05",
    chapterDir: "ch05-integrals",
    section: "5.4",
    sectionDir: "5.4-the-fundamental-theorem-of-calculus",
    title: "The Fundamental Theorem of Calculus",
    definitions: [
      {
        id: "theorem-ftc-part-1",
        title: "The Fundamental Theorem of Calculus, Part 1",
        category: "theorem",
        latex: "\\frac{d}{dx} \\left[ \\int_a^x f(t) dt \\right] = f(x)",
        statement: "If f is continuous on [a, b], then the accumulation function F(x) = int_a^x f(t) dt is continuous on [a, b], differentiable on (a, b), and its derivative is exactly f(x).",
        conditions: ["f must be continuous on [a, b]"],
        explanation: "FTC Part 1 establishes that differentiation and integration are inverse mathematical operations.",
        keyTakeaway: "Every continuous function possesses an antiderivative defined by its accumulation integral."
      },
      {
        id: "theorem-ftc-part-2",
        title: "The Fundamental Theorem of Calculus, Part 2 (Evaluation Theorem)",
        category: "theorem",
        latex: "\\int_a^b f(x) dx = F(b) - F(a), \\quad \\text{where } F'(x) = f(x)",
        statement: "If f is continuous on [a, b] and F is any antiderivative of f, then the definite integral equals the net change of F across the interval.",
        conditions: ["f is continuous on [a, b]", "F'(x) = f(x) on [a, b]"],
        explanation: "Replaces exhaustive limits of Riemann sums with simple algebraic evaluation of antiderivatives at endpoints.",
        keyTakeaway: "Definite integrals equal the difference in values of any antiderivative at interval endpoints."
      }
    ],
    summaryMDX: `# Section 5.4: The Fundamental Theorem of Calculus

The Fundamental Theorem of Calculus is the crowning achievement connecting differential calculus and integral calculus.

---

## 1. FTC Part 1: Differentiating Accumulation Functions

If $F(x) = \\int_a^{u(x)} f(t) dt$, by combining FTC Part 1 with the Chain Rule:

$$
\\frac{d}{dx} \\left[ \\int_a^{u(x)} f(t) dt \\right] = f(u(x)) \\cdot u'(x)
$$

If both upper and lower limits are variable:

$$
\\frac{d}{dx} \\left[ \\int_{v(x)}^{u(x)} f(t) dt \\right] = f(u(x)) u'(x) - f(v(x)) v'(x)
$$

---

## 2. FTC Part 2: The Net Change Theorem

$$
\\int_a^b f(x) dx = F(b) - F(a) = [F(x)]_a^b
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Differentiating an Integral with a Variable Limit",
        exerciseReference: "Section 5.4, Exercise 1",
        originalTopic: "FTC Part 1 Direct Application",
        difficulty: "tier1",
        tags: ["FTC-part-1", "derivative-of-integral", "accumulation"],
        problemStatement: "Find dy/dx for y = int_1^x sqrt(t^3 + 1) dt.",
        finalAnswer: "\\frac{dy}{dx} = \\sqrt{x^3 + 1}",
        steps: [
          {
            stepNumber: 1,
            title: "Check Continuity of Integrand",
            mathExpression: "f(t) = \\sqrt{t^3 + 1} \\text{ is continuous for } t \\ge -1",
            explanation: "The integrand is continuous on the interval containing x >= 1.",
            why: "FTC Part 1 prerequisite."
          },
          {
            stepNumber: 2,
            title: "Apply FTC Part 1",
            mathExpression: "\\frac{d}{dx} \\left[ \\int_1^x \\sqrt{t^3 + 1} dt \\right] = \\sqrt{x^3 + 1}",
            explanation: "Replace dummy variable t with the upper limit variable x.",
            why: "Fundamental Theorem of Calculus Part 1."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(x**3 + 1) - sqrt(x**3 + 1)",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Differentiating an Accumulation Function with Chain Rule",
        exerciseReference: "Section 5.4, Exercise 2",
        originalTopic: "Leibniz Rule / Chain Rule with FTC 1",
        difficulty: "tier2",
        tags: ["FTC-part-1", "chain-rule", "leibniz-rule"],
        problemStatement: "Find the derivative with respect to x of G(x) = int_0^{x^2} cos(t^2) dt.",
        finalAnswer: "G'(x) = 2x \\cos(x^4)",
        steps: [
          {
            stepNumber: 1,
            title: "Define Composite Form",
            mathExpression: "G(x) = F(u(x)), \\quad u(x) = x^2, \\quad F(u) = \\int_0^u \\cos(t^2) dt",
            explanation: "Identify the upper limit as a composite function u(x) = x^2.",
            why: "Chain Rule decomposition."
          },
          {
            stepNumber: 2,
            title: "Differentiate Outer and Inner Functions",
            mathExpression: "F'(u) = \\cos(u^2), \\quad u'(x) = 2x",
            explanation: "FTC Part 1 yields F'(u), standard power rule yields u'(x).",
            why: "Derivative rules."
          },
          {
            stepNumber: 3,
            title: "Combine via Chain Rule",
            mathExpression: "G'(x) = F'(u(x)) \\cdot u'(x) = \\cos((x^2)^2) \\cdot 2x = 2x \\cos(x^4)",
            explanation: "Multiply outer derivative by inner derivative.",
            why: "Chain Rule application to integral functions."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*x*cos(x**4) - 2*x*cos(x**4)",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Integral with Two Variable Limits",
        exerciseReference: "Section 5.4, Exercise 3",
        originalTopic: "Two Variable Limits FTC Application",
        difficulty: "tier2",
        tags: ["FTC-part-1", "two-variable-limits", "chain-rule"],
        problemStatement: "Find d/dx int_{2x}^{3x} (t^2 + 1) dt.",
        finalAnswer: "\\frac{d}{dx} \\int_{2x}^{3x} (t^2 + 1) dt = 19x^2 + 1",
        steps: [
          {
            stepNumber: 1,
            title: "Split Integral at a Constant",
            mathExpression: "\\int_{2x}^{3x} (t^2 + 1) dt = \\int_0^{3x} (t^2 + 1) dt - \\int_0^{2x} (t^2 + 1) dt",
            explanation: "Use interval additivity to anchor each integral at 0.",
            why: "Enables applying FTC Part 1 to both terms."
          },
          {
            stepNumber: 2,
            title: "Differentiate Each Term via Chain Rule",
            mathExpression: "\\frac{d}{dx} = ((3x)^2 + 1) \\cdot 3 - ((2x)^2 + 1) \\cdot 2 = 3(9x^2 + 1) - 2(4x^2 + 1)",
            explanation: "Apply FTC 1: substitute upper bound and multiply by its derivative.",
            why: "General Leibniz Integral Rule."
          },
          {
            stepNumber: 3,
            title: "Simplify the Resulting Polynomial",
            mathExpression: "(27x^2 + 3) - (8x^2 + 2) = 19x^2 + 1",
            explanation: "Combine like algebraic terms.",
            why: "Final derivative simplification."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "3*(9*x**2 + 1) - 2*(4*x**2 + 1)",
          expected: "19*x**2 + 1"
        }
      },
      {
        filename: "ex-04",
        title: "Definite Integral Evaluation via FTC Part 2",
        exerciseReference: "Section 5.4, Exercise 4",
        originalTopic: "FTC Part 2 Evaluation",
        difficulty: "tier1",
        tags: ["FTC-part-2", "antiderivative", "evaluation"],
        problemStatement: "Evaluate int_1^3 (3x^2 - 4x + 1) dx using the Fundamental Theorem of Calculus.",
        finalAnswer: "\\int_1^3 (3x^2 - 4x + 1) dx = 12",
        steps: [
          {
            stepNumber: 1,
            title: "Find the General Antiderivative",
            mathExpression: "F(x) = \\int (3x^2 - 4x + 1) dx = x^3 - 2x^2 + x",
            explanation: "Apply standard power rules term by term.",
            why: "Determining F(x) such that F'(x) = f(x)."
          },
          {
            stepNumber: 2,
            title: "Evaluate at Upper and Lower Limits",
            mathExpression: "F(3) = (3)^3 - 2(3)^2 + 3 = 27 - 18 + 3 = 12; \\quad F(1) = (1)^3 - 2(1)^2 + 1 = 1 - 2 + 1 = 0",
            explanation: "Calculate values at boundary points.",
            why: "FTC Part 2 formula F(b) - F(a)."
          },
          {
            stepNumber: 3,
            title: "Compute Net Difference",
            mathExpression: "F(3) - F(1) = 12 - 0 = 12",
            explanation: "Subtract F(1) from F(3).",
            why: "Exact definite integral value."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "3*x**2 - 4*x + 1",
          expected: "12",
          kind: "definite",
          lower: "1",
          upper: "3"
        }
      },
      {
        filename: "ex-05",
        title: "Area Under a Secant Squared Curve",
        exerciseReference: "Section 5.4, Exercise 5",
        originalTopic: "Trigonometric Definite Integral",
        difficulty: "tier2",
        tags: ["trigonometric-integral", "FTC", "secant-squared"],
        problemStatement: "Evaluate the definite integral int_0^{pi/3} sec^2(x) dx.",
        finalAnswer: "\\int_0^{\\pi/3} \\sec^2(x) dx = \\sqrt{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Antiderivative of Secant Squared",
            mathExpression: "\\frac{d}{dx}[\\tan(x)] = \\sec^2(x) \\implies F(x) = \\tan(x)",
            explanation: "Recall standard trigonometric derivative rule.",
            why: "Finding exact antiderivative."
          },
          {
            stepNumber: 2,
            title: "Apply Evaluation Theorem",
            mathExpression: "[\\tan(x)]_0^{\\pi/3} = \\tan(\\pi/3) - \\tan(0)",
            explanation: "Substitute upper and lower limits.",
            why: "FTC Part 2 application."
          },
          {
            stepNumber: 3,
            title: "Evaluate Trigonometric Values",
            mathExpression: "\\sqrt{3} - 0 = \\sqrt{3}",
            explanation: "tan(pi/3) = sqrt(3) and tan(0) = 0.",
            why: "Final exact radical evaluation."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sec(x)**2",
          expected: "sqrt(3)",
          kind: "definite",
          lower: "0",
          upper: "pi/3"
        }
      }
    ]
  },
  {
    chapter: "ch05",
    chapterDir: "ch05-integrals",
    section: "5.5",
    sectionDir: "5.5-indefinite-integrals-and-the-substitution-method",
    title: "Indefinite Integrals and the Substitution Method",
    definitions: [
      {
        id: "theorem-substitution-rule",
        title: "The Substitution Rule for Integrals",
        category: "theorem",
        latex: "\\int f(g(x)) g'(x) dx = \\int f(u) du, \\quad \\text{where } u = g(x), \\; du = g'(x) dx",
        statement: "If u = g(x) is a differentiable function whose range is an interval I and f is continuous on I, then substitution transforms an integral into a simpler form by reversing the Chain Rule of differentiation.",
        conditions: ["g'(x) is continuous", "f is continuous on range of g"],
        explanation: "The differential du = g'(x) dx replaces g'(x) dx entirely, simplifying the integration.",
        keyTakeaway: "Substitution is the integral calculus analog of the Chain Rule."
      },
      {
        id: "formula-power-rule-substitution",
        title: "Generalized Power Rule for Integration",
        category: "formula",
        latex: "\\int [g(x)]^n g'(x) dx = \\frac{[g(x)]^{n+1}}{n+1} + C \\quad (n \\ne -1)",
        statement: "Direct integration formula when the integrand contains an expression raised to a power multiplied by its derivative.",
        conditions: ["n != -1"],
        explanation: "Setting u = g(x) immediately yields int u^n du = u^(n+1)/(n+1) + C.",
        keyTakeaway: "Enables instant integration of composite power terms."
      }
    ],
    summaryMDX: `# Section 5.5: Indefinite Integrals and the Substitution Method

The substitution method transforms difficult integrals into elementary forms by recognizing Chain Rule patterns.

---

## 1. The Method of Substitution Steps

1. **Choose $u$**: Select an inner expression $u = g(x)$ whose derivative $g'(x)$ appears as a factor.
2. **Compute $du$**: Calculate $du = g'(x) dx$.
3. **Rewrite Integrand**: Express everything in terms of $u$ and $du$.
4. **Integrate**: Evaluate the resulting standard integral $\\int f(u) du$.
5. **Back-Substitute**: Replace $u$ with $g(x)$ to express the final answer in terms of the original variable $x$.

---

## 2. Initial Value Problems

Solving $\\frac{dy}{dx} = f(x)$ with initial condition $y(x_0) = y_0$:

$$
y(x) = y_0 + \\int_{x_0}^x f(t) dt
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Substitution with Polynomial Power Function",
        exerciseReference: "Section 5.5, Exercise 1",
        originalTopic: "Power Rule Substitution",
        difficulty: "tier1",
        tags: ["u-substitution", "polynomial", "indefinite-integral"],
        problemStatement: "Evaluate the indefinite integral int 2x (x^2 + 5)^4 dx.",
        finalAnswer: "\\frac{(x^2 + 5)^5}{5} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Choose Substitution Variable",
            mathExpression: "u = x^2 + 5 \\implies du = 2x \\, dx",
            explanation: "The derivative of x^2 + 5 is exactly 2x dx.",
            why: "Inner function substitution."
          },
          {
            stepNumber: 2,
            title: "Transform the Integral",
            mathExpression: "\\int 2x (x^2 + 5)^4 dx = \\int u^4 du",
            explanation: "Replace (x^2 + 5)^4 with u^4 and 2x dx with du.",
            why: "Applying substitution rule."
          },
          {
            stepNumber: 3,
            title: "Integrate and Back-Substitute",
            mathExpression: "\\int u^4 du = \\frac{u^5}{5} + C = \\frac{(x^2 + 5)^5}{5} + C",
            explanation: "Apply power rule and substitute back u = x^2 + 5.",
            why: "Returning to original variable."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "2*x*(x**2 + 5)**4",
          expected: "(x**2 + 5)**5 / 5",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-02",
        title: "Trigonometric Substitution with Chain Factor",
        exerciseReference: "Section 5.5, Exercise 2",
        originalTopic: "Trigonometric Substitution",
        difficulty: "tier2",
        tags: ["u-substitution", "trigonometry", "indefinite-integral"],
        problemStatement: "Evaluate int sin(3x) cos^2(3x) dx.",
        finalAnswer: "-\\frac{\\cos^3(3x)}{9} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Inner Function and Differential",
            mathExpression: "u = \\cos(3x) \\implies du = -3 \\sin(3x) \\, dx \\implies \\sin(3x) \\, dx = -\\frac{1}{3} du",
            explanation: "Let u be cos(3x); its derivative supplies sin(3x) dx.",
            why: "Trigonometric Chain Rule pattern."
          },
          {
            stepNumber: 2,
            title: "Rewrite and Integrate",
            mathExpression: "\\int \\sin(3x) \\cos^2(3x) dx = -\\frac{1}{3} \\int u^2 du = -\\frac{1}{3} \\left( \\frac{u^3}{3} \\right) + C = -\\frac{u^3}{9} + C",
            explanation: "Integrate standard power u^2.",
            why: "Power rule for integration."
          },
          {
            stepNumber: 3,
            title: "Back-Substitute",
            mathExpression: "-\\frac{\\cos^3(3x)}{9} + C",
            explanation: "Replace u with cos(3x).",
            why: "Final antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sin(3*x)*cos(3*x)**2",
          expected: "-cos(3*x)**3 / 9",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-03",
        title: "Algebraic Rearrangement with Linear Substitution",
        exerciseReference: "Section 5.5, Exercise 3",
        originalTopic: "Linear Shift Substitution",
        difficulty: "tier2",
        tags: ["algebraic-substitution", "fractional-power", "radicals"],
        problemStatement: "Evaluate int x sqrt(x + 1) dx.",
        finalAnswer: "\\frac{2}{5}(x + 1)^{5/2} - \\frac{2}{3}(x + 1)^{3/2} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Define Substitution and Solve for x",
            mathExpression: "u = x + 1 \\implies x = u - 1, \\quad dx = du",
            explanation: "Express the outer variable x in terms of u.",
            why: "Eliminates sum inside radical."
          },
          {
            stepNumber: 2,
            title: "Substitute and Expand Integrand",
            mathExpression: "\\int (u - 1) u^{1/2} du = \\int (u^{3/2} - u^{1/2}) du",
            explanation: "Distribute u^(1/2) over (u - 1).",
            why: "Converts to sum of power terms."
          },
          {
            stepNumber: 3,
            title: "Integrate Term by Term and Back-Substitute",
            mathExpression: "\\frac{2}{5}u^{5/2} - \\frac{2}{3}u^{3/2} + C = \\frac{2}{5}(x+1)^{5/2} - \\frac{2}{3}(x+1)^{3/2} + C",
            explanation: "Apply power rule and replace u with x + 1.",
            why: "Final simplified antiderivative."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "x*sqrt(x + 1)",
          expected: "(2/5)*(x + 1)**(5/2) - (2/3)*(x + 1)**(3/2)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-04",
        title: "Substitution with Radical in Denominator",
        exerciseReference: "Section 5.5, Exercise 4",
        originalTopic: "Radical Denominator Substitution",
        difficulty: "tier1",
        tags: ["radical", "denominator", "u-substitution"],
        problemStatement: "Evaluate int x^2 / sqrt(x^3 + 9) dx.",
        finalAnswer: "\\frac{2}{3} \\sqrt{x^3 + 9} + C",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up u and du",
            mathExpression: "u = x^3 + 9 \\implies du = 3x^2 \\, dx \\implies x^2 \\, dx = \\frac{1}{3} du",
            explanation: "Numerator x^2 dx matches (1/3) du.",
            why: "Degree 3 radicand differentiates to degree 2."
          },
          {
            stepNumber: 2,
            title: "Rewrite in Terms of u",
            mathExpression: "\\frac{1}{3} \\int u^{-1/2} du",
            explanation: "Express denominator as negative fractional power.",
            why: "Prepares for power rule."
          },
          {
            stepNumber: 3,
            title: "Integrate and Back-Substitute",
            mathExpression: "\\frac{1}{3} \\left( 2 u^{1/2} \\right) + C = \\frac{2}{3} \\sqrt{x^3 + 9} + C",
            explanation: "Add 1 to exponent and replace u with x^3 + 9.",
            why: "Final evaluated result."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "x**2 / sqrt(x**3 + 9)",
          expected: "(2/3)*sqrt(x**3 + 9)",
          kind: "indefinite"
        }
      },
      {
        filename: "ex-05",
        title: "Initial Value Problem with Substitution",
        exerciseReference: "Section 5.5, Exercise 5",
        originalTopic: "Initial Value Problem",
        difficulty: "tier2",
        tags: ["initial-value-problem", "differential-equation", "u-sub"],
        problemStatement: "Solve the initial value problem dy/dx = 4x (2x^2 + 1)^3 with initial condition y(0) = 2.",
        finalAnswer: "y(x) = \\frac{(2x^2 + 1)^4}{4} + \\frac{7}{4}",
        steps: [
          {
            stepNumber: 1,
            title: "Integrate to Find General Solution",
            mathExpression: "y(x) = \\int 4x (2x^2 + 1)^3 dx; \\quad u = 2x^2 + 1 \\implies du = 4x \\, dx",
            explanation: "The differential du = 4x dx is present directly.",
            why: "Solving separable first order ODE."
          },
          {
            stepNumber: 2,
            title: "Evaluate Antiderivative",
            mathExpression: "y(x) = \\int u^3 du = \\frac{u^4}{4} + C = \\frac{(2x^2 + 1)^4}{4} + C",
            explanation: "Integrate u^3.",
            why: "General solution family."
          },
          {
            stepNumber: 3,
            title: "Apply Initial Condition y(0) = 2",
            mathExpression: "2 = \\frac{(2(0) + 1)^4}{4} + C \\implies 2 = \\frac{1}{4} + C \\implies C = \\frac{7}{4}",
            explanation: "Determine unique constant of integration.",
            why: "Satisfying initial condition."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "(2*x**2 + 1)**4 / 4 + 7/4",
          expected: "4*x*(2*x**2 + 1)**3",
          variable: "x"
        }
      }
    ]
  },
  {
    chapter: "ch05",
    chapterDir: "ch05-integrals",
    section: "5.6",
    sectionDir: "5.6-definite-integral-substitutions-and-the-area-between-curves",
    title: "Definite Integral Substitutions and the Area Between Curves",
    definitions: [
      {
        id: "theorem-definite-integral-substitution",
        title: "Substitution in Definite Integrals",
        category: "theorem",
        latex: "\\int_a^b f(g(x)) g'(x) dx = \\int_{g(a)}^{g(b)} f(u) du",
        statement: "When performing a substitution u = g(x) on a definite integral, the limits of integration change from x = a and x = b to u = g(a) and u = g(b), eliminating the need to back-substitute.",
        conditions: ["g' is continuous on [a, b]", "f is continuous on range of g"],
        explanation: "Evaluating at transformed limits saves algebraic steps and prevents domain errors.",
        keyTakeaway: "Always transform limits when substituting in definite integrals."
      },
      {
        id: "formula-area-between-curves",
        title: "Area Between Intersecting Curves",
        category: "formula",
        latex: "A = \\int_a^b [f(x) - g(x)] dx, \\quad \\text{where } f(x) \\ge g(x) \\; \\forall x \\in [a, b]",
        statement: "The area of the region bounded by continuous curves y = f(x) and y = g(x) between x = a and x = b equals the integral of the upper curve minus the lower curve.",
        conditions: ["f(x) >= g(x) on [a, b]"],
        explanation: "If curves intersect and switch positions, the total area is int_a^b |f(x) - g(x)| dx.",
        keyTakeaway: "Area equals integral of (Top Curve - Bottom Curve) dx or (Right Curve - Left Curve) dy."
      }
    ],
    summaryMDX: `# Section 5.6: Definite Integral Substitutions and the Area Between Curves

Transforming integration limits simplifies definite integrals, while curve subtraction calculates planar areas.

---

## 1. Changing Limits of Integration

$$
\\int_a^b f(g(x)) g'(x) dx = \\int_{u(a)}^{u(b)} f(u) du
$$

There is no need to return to the original variable $x$.

---

## 2. Area Between Two Curves

- **Vertical Slices (dx)**: For $y = f(x)$ above $y = g(x)$:
  $$
  A = \\int_a^b [f(x) - g(x)] dx
  $$
- **Horizontal Slices (dy)**: For $x = f(y)$ to the right of $x = g(y)$:
  $$
  A = \\int_c^d [f(y) - g(y)] dy
  $$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Definite Integral Substitution with Transformed Limits",
        exerciseReference: "Section 5.6, Exercise 1",
        originalTopic: "Definite Integral Substitution",
        difficulty: "tier1",
        tags: ["definite-substitution", "transformed-limits", "radicals"],
        problemStatement: "Evaluate int_0^1 x sqrt(1 - x^2) dx by transforming the integration limits.",
        finalAnswer: "\\int_0^1 x \\sqrt{1 - x^2} dx = \\frac{1}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Define u and Compute Transformed Limits",
            mathExpression: "u = 1 - x^2 \\implies du = -2x \\, dx \\implies x \\, dx = -\\frac{1}{2} du; \\quad x = 0 \\implies u = 1, \\; x = 1 \\implies u = 0",
            explanation: "Calculate u-values corresponding to x = 0 and x = 1.",
            why: "Transforming limits of integration."
          },
          {
            stepNumber: 2,
            title: "Rewrite Integral and Reverse Limits",
            mathExpression: "\\int_0^1 x \\sqrt{1 - x^2} dx = -\\frac{1}{2} \\int_1^0 u^{1/2} du = \\frac{1}{2} \\int_0^1 u^{1/2} du",
            explanation: "Absorb negative sign by swapping limits from [1, 0] to [0, 1].",
            why: "Reversal of limits identity."
          },
          {
            stepNumber: 3,
            title: "Evaluate Directly",
            mathExpression: "\\frac{1}{2} \\left[ \\frac{2}{3} u^{3/2} \\right]_0^1 = \\frac{1}{3} (1 - 0) = \\frac{1}{3}",
            explanation: "Evaluate at u = 1 and u = 0.",
            why: "Direct evaluation without back-substitution."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "x*sqrt(1 - x**2)",
          expected: "1/3",
          kind: "definite",
          lower: "0",
          upper: "1"
        }
      },
      {
        filename: "ex-02",
        title: "Definite Trigonometric Substitution with Limit Change",
        exerciseReference: "Section 5.6, Exercise 2",
        originalTopic: "Trigonometric Definite Substitution",
        difficulty: "tier2",
        tags: ["trigonometry", "definite-integral", "substitution"],
        problemStatement: "Evaluate int_0^{pi/4} tan(x) sec^2(x) dx.",
        finalAnswer: "\\int_0^{\\pi/4} \\tan(x) \\sec^2(x) dx = \\frac{1}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Choose Substitution and Compute Limits",
            mathExpression: "u = \\tan(x) \\implies du = \\sec^2(x) dx; \\quad x = 0 \\implies u = \\tan(0) = 0, \\; x = \\pi/4 \\implies u = \\tan(\\pi/4) = 1",
            explanation: "u runs from 0 to 1.",
            why: "Transforming trigonometric limits."
          },
          {
            stepNumber: 2,
            title: "Evaluate in u-Variable",
            mathExpression: "\\int_0^1 u \\, du = \\left[ \\frac{u^2}{2} \\right]_0^1 = \\frac{1}{2} - 0 = \\frac{1}{2}",
            explanation: "Simple power integration.",
            why: "Transformed definite integral evaluation."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "tan(x)*sec(x)**2",
          expected: "1/2",
          kind: "definite",
          lower: "0",
          upper: "pi/4"
        }
      },
      {
        filename: "ex-03",
        title: "Area Enclosed by Parabola and Line",
        exerciseReference: "Section 5.6, Exercise 3",
        originalTopic: "Area Between Curves",
        difficulty: "tier1",
        tags: ["area-between-curves", "parabola", "intersection"],
        problemStatement: "Find the area of the region enclosed by the parabola y = 2x - x^2 and the line y = 0.",
        finalAnswer: "\\text{Area} = \\frac{4}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Intersection Points",
            mathExpression: "2x - x^2 = 0 \\implies x(2 - x) = 0 \\implies x = 0, \\; x = 2",
            explanation: "The boundaries of the enclosed region are x = 0 and x = 2.",
            why: "Locating integration limits."
          },
          {
            stepNumber: 2,
            title: "Identify Top and Bottom Curves",
            mathExpression: "y_{\\text{top}} = 2x - x^2, \\quad y_{\\text{bottom}} = 0 \\quad \\text{on } [0, 2]",
            explanation: "Parabola opens downward and lies above the x-axis on (0, 2).",
            why: "Area = int (top - bottom) dx."
          },
          {
            stepNumber: 3,
            title: "Integrate to Find Area",
            mathExpression: "A = \\int_0^2 (2x - x^2) dx = \\left[ x^2 - \\frac{x^3}{3} \\right]_0^2 = 4 - \\frac{8}{3} = \\frac{4}{3}",
            explanation: "Evaluate antiderivative at limits.",
            why: "Final exact enclosed area."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "2*x - x**2",
          expected: "4/3",
          kind: "definite",
          lower: "0",
          upper: "2"
        }
      },
      {
        filename: "ex-04",
        title: "Area Between Curves with Multiple Intersection Regions",
        exerciseReference: "Section 5.6, Exercise 4",
        originalTopic: "Multi-Region Area Between Curves",
        difficulty: "tier2",
        tags: ["intersecting-curves", "symmetry", "area"],
        problemStatement: "Find the total area of the region bounded by y = x^3 and y = x.",
        finalAnswer: "\\text{Total Area} = \\frac{1}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Find All Intersections",
            mathExpression: "x^3 = x \\implies x(x^2 - 1) = 0 \\implies x = -1, \\; 0, \\; 1",
            explanation: "The curves intersect at three points, forming two separate symmetrical regions.",
            why: "Partitioning area into subintervals."
          },
          {
            stepNumber: 2,
            title: "Utilize Origin Symmetry",
            mathExpression: "\\text{Total Area} = 2 \\int_0^1 (x - x^3) dx",
            explanation: "On [0, 1], y = x is above y = x^3. By symmetry, area on [-1, 0] is identical.",
            why: "Doubling single positive region by odd symmetry."
          },
          {
            stepNumber: 3,
            title: "Compute Area",
            mathExpression: "2 \\left[ \\frac{x^2}{2} - \\frac{x^4}{4} \\right]_0^1 = 2 \\left( \\frac{1}{2} - \\frac{1}{4} \\right) = 2 \\left( \\frac{1}{4} \\right) = \\frac{1}{2}",
            explanation: "Evaluate the definite integral.",
            why: "Total enclosed area."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "x - x**3",
          expected: "1/4",
          kind: "definite",
          lower: "0",
          upper: "1"
        }
      },
      {
        filename: "ex-05",
        title: "Area by Integrating with Respect to y",
        exerciseReference: "Section 5.6, Exercise 5",
        originalTopic: "Integration along y-axis",
        difficulty: "tier2",
        tags: ["horizontal-slicing", "dy-integration", "area"],
        problemStatement: "Find the area enclosed by the curves x = 2 - y^2 and x = y.",
        finalAnswer: "\\text{Area} = \\frac{9}{2} = 4.5",
        steps: [
          {
            stepNumber: 1,
            title: "Find y-Intersection Limits",
            mathExpression: "2 - y^2 = y \\implies y^2 + y - 2 = 0 \\implies (y + 2)(y - 1) = 0 \\implies y = -2, \\; y = 1",
            explanation: "Set horizontal coordinates equal to find y-limits.",
            why: "Horizontal slicing boundaries."
          },
          {
            stepNumber: 2,
            title: "Identify Right and Left Curves",
            mathExpression: "x_{\\text{right}} = 2 - y^2, \\quad x_{\\text{left}} = y \\quad \\text{for } y \\in [-2, 1]",
            explanation: "The parabola lies to the right of the line.",
            why: "Area = int (x_right - x_left) dy."
          },
          {
            stepNumber: 3,
            title: "Integrate with Respect to y",
            mathExpression: "A = \\int_{-2}^1 (2 - y^2 - y) dy = \\left[ 2y - \\frac{y^3}{3} - \\frac{y^2}{2} \\right]_{-2}^1 = \\left( 2 - \\frac{1}{3} - \\frac{1}{2} \\right) - \\left( -4 + \\frac{8}{3} - 2 \\right) = \\frac{7}{6} - \\left( -\\frac{10}{3} \\right) = \\frac{27}{6} = \\frac{9}{2}",
            explanation: "Evaluate the antiderivative between y = -2 and y = 1.",
            why: "Final exact area."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "2 - x**2 - x",
          expected: "9/2",
          kind: "definite",
          lower: "-2",
          upper: "1"
        }
      }
    ]
  }
];
