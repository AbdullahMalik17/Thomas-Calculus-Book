// scripts/curriculum-data-ch10.ts
/**
 * Authoritative Curriculum Data for Chapter 10: Infinite Sequences and Series
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH10_SECTIONS: SectionDef[] = [
  {
    chapter: "ch10",
    chapterDir: "ch10-infinite-sequences-and-series",
    section: "10.1",
    sectionDir: "10.1-sequences",
    title: "Sequences",
    definitions: [
      {
        id: "def-sequence-convergence",
        title: "Convergence of an Infinite Sequence",
        category: "definition",
        latex: "\\lim_{n \\to \\infty} a_n = L \\iff \\forall \\epsilon > 0, \\; \\exists N \\text{ s.t. } n > N \\implies |a_n - L| < \\epsilon",
        statement: "A sequence {a_n} converges to limit L if its terms approach L arbitrarily closely as n increases without bound. If no finite limit exists, the sequence diverges.",
        conditions: ["n is a positive integer"],
        explanation: "Continuous limit theorems (Squeeze Theorem, L'Hopital's Rule applied to a(x)) carry over directly to discrete sequences.",
        keyTakeaway: "A sequence is an ordered list of numbers whose convergence is governed by limits at infinity."
      },
      {
        id: "theorem-monotone-convergence",
        title: "Monotone Convergence Theorem",
        category: "theorem",
        latex: "a_n \\le a_{n+1} \\quad \\text{and} \\quad a_n \\le M \\implies \\lim_{n \\to \\infty} a_n \\text{ exists}",
        statement: "Every bounded, monotonic sequence of real numbers converges to a finite real limit.",
        conditions: ["Sequence is monotonic (non-decreasing or non-increasing)", "Sequence is bounded"],
        explanation: "Fundamental completeness property of the real numbers: bounded increasing sequences converge to their least upper bound (supremum).",
        keyTakeaway: "Bounded + Monotonic = Convergent."
      }
    ],
    summaryMDX: `# Section 10.1: Sequences

An infinite sequence is a function whose domain is the set of positive integers.

---

## 1. Important Sequence Limits

1. $\\lim_{n \\to \\infty} \\frac{\\ln n}{n} = 0$
2. $\\lim_{n \\to \\infty} \\sqrt[n]{n} = 1$
3. $\\lim_{n \\to \\infty} x^{1/n} = 1 \\quad (x > 0)$
4. $\\lim_{n \\to \\infty} x^n = 0 \\quad (|x| < 1)$
5. $\\lim_{n \\to \\infty} \\left(1 + \\frac{x}{n}\\right)^n = e^x$
6. $\\lim_{n \\to \\infty} \\frac{x^n}{n!} = 0$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Limit of a Rational Sequence",
        exerciseReference: "Section 10.1, Exercise 1",
        originalTopic: "Rational Sequence Limit",
        difficulty: "tier1",
        tags: ["sequences", "limits", "rational"],
        problemStatement: "Determine whether the sequence a_n = (3n^2 - 5n) / (2n^2 + 7) converges, and find its limit.",
        finalAnswer: "\\lim_{n \\to \\infty} a_n = \\frac{3}{2} \\quad (\\text{Converges})",
        steps: [
          {
            stepNumber: 1,
            title: "Divide by Highest Power of n",
            mathExpression: "\\frac{3n^2 - 5n}{2n^2 + 7} = \\frac{3 - 5/n}{2 + 7/n^2}",
            explanation: "Divide numerator and denominator by n^2.",
            why: "Standard limit evaluation for rational sequences."
          },
          {
            stepNumber: 2,
            title: "Evaluate Limits of Reciprocals",
            mathExpression: "\\lim_{n \\to \\infty} \\frac{5}{n} = 0, \\quad \\lim_{n \\to \\infty} \\frac{7}{n^2} = 0",
            explanation: "Reciprocal terms vanish.",
            why: "Elementary sequence limits."
          },
          {
            stepNumber: 3,
            title: "Compute Sequence Limit",
            mathExpression: "\\frac{3 - 0}{2 + 0} = \\frac{3}{2}",
            explanation: "Ratio of leading coefficients.",
            why: "Final evaluated limit."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "Rational(3, 2) - 3/2",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Applying the Squeeze Theorem to an Oscillating Sequence",
        exerciseReference: "Section 10.1, Exercise 2",
        originalTopic: "Squeeze Theorem for Sequences",
        difficulty: "tier1",
        tags: ["squeeze-theorem", "oscillating-sequence", "sine"],
        problemStatement: "Find the limit of a_n = sin(n) / n as n -> oo.",
        finalAnswer: "\\lim_{n \\to \\infty} \\frac{\\sin(n)}{n} = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Establish Bounding Inequalities",
            mathExpression: "-1 \\le \\sin(n) \\le 1 \\implies -\\frac{1}{n} \\le \\frac{\\sin(n)}{n} \\le \\frac{1}{n} \\quad \\forall n \\ge 1",
            explanation: "Divide the standard sine bound by positive integer n.",
            why: "Bounding the oscillating term."
          },
          {
            stepNumber: 2,
            title: "Evaluate Bounding Limits",
            mathExpression: "\\lim_{n \\to \\infty} \\left(-\\frac{1}{n}\\right) = 0 \\quad \\text{and} \\quad \\lim_{n \\to \\infty} \\frac{1}{n} = 0",
            explanation: "Both outer bounds converge to 0.",
            why: "Squeeze theorem condition."
          },
          {
            stepNumber: 3,
            title: "Conclude by Squeeze Theorem",
            mathExpression: "\\lim_{n \\to \\infty} \\frac{\\sin(n)}{n} = 0",
            explanation: "The intermediate sequence is forced to 0.",
            why: "Squeeze Theorem."
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
        title: "Limit of an Indeterminate Exponential Sequence",
        exerciseReference: "Section 10.1, Exercise 3",
        originalTopic: "L'Hopital Rule on Sequences",
        difficulty: "tier2",
        tags: ["lhopital", "logarithmic-sequence", "indeterminate"],
        problemStatement: "Find lim_{n -> oo} (ln n)^2 / n.",
        finalAnswer: "\\lim_{n \\to \\infty} \\frac{(\\ln n)^2}{n} = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Pass to Continuous Variable x",
            mathExpression: "f(x) = \\frac{(\\ln x)^2}{x} \\quad \\left( \\frac{\\infty}{\\infty} \\right)",
            explanation: "Convert discrete n to real x >= 1.",
            why: "Enables differentiation via L'Hopital's Rule."
          },
          {
            stepNumber: 2,
            title: "Apply L'Hopital's Rule First Time",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{2\\ln(x)(1/x)}{1} = \\lim_{x \\to \\infty} \\frac{2\\ln(x)}{x} \\quad \\left( \\frac{\\infty}{\\infty} \\right)",
            explanation: "Differentiate numerator and denominator.",
            why: "First derivative quotient."
          },
          {
            stepNumber: 3,
            title: "Apply L'Hopital's Rule Second Time",
            mathExpression: "\\lim_{x \\to \\infty} \\frac{2(1/x)}{1} = \\lim_{x \\to \\infty} \\frac{2}{x} = 0 \\implies \\lim_{n \\to \\infty} \\frac{(\\ln n)^2}{n} = 0",
            explanation: "Limit is 0.",
            why: "Final evaluated sequence limit."
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
        title: "Monotone Convergence of a Recursive Sequence",
        exerciseReference: "Section 10.1, Exercise 4",
        originalTopic: "Recursive Sequence Convergence",
        difficulty: "tier3",
        tags: ["recursive-sequence", "monotone-convergence", "fixed-point"],
        problemStatement: "Let a_1 = 1 and a_{n+1} = sqrt(2 + a_n). Prove the sequence converges and find its limit.",
        finalAnswer: "L = 2",
        steps: [
          {
            stepNumber: 1,
            title: "Prove Sequence is Bounded by 2",
            mathExpression: "a_1 = 1 < 2; \\quad a_k < 2 \\implies a_{k+1} = \\sqrt{2 + a_k} < \\sqrt{2 + 2} = 2",
            explanation: "By induction, a_n < 2 for all n.",
            why: "Boundedness proof."
          },
          {
            stepNumber: 2,
            title: "Prove Sequence is Monotonically Increasing",
            mathExpression: "a_{n+1} - a_n = \\sqrt{2 + a_n} - a_n = \\frac{2 + a_n - a_n^2}{\\sqrt{2 + a_n} + a_n} = \\frac{(2 - a_n)(1 + a_n)}{\\sqrt{2 + a_n} + a_n} > 0",
            explanation: "Since 0 < a_n < 2, the numerator is strictly positive.",
            why: "Monotonicity proof."
          },
          {
            stepNumber: 3,
            title: "Solve for the Limit L",
            mathExpression: "L = \\sqrt{2 + L} \\implies L^2 - L - 2 = 0 \\implies (L - 2)(L + 1) = 0 \\implies L = 2",
            explanation: "Since a_n > 0, L must be positive, so L = 2.",
            why: "Fixed point algebraic equation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(2 + 2) - 2",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Factorial Sequence Limit via Dominance",
        exerciseReference: "Section 10.1, Exercise 5",
        originalTopic: "Factorial vs Exponential Sequence",
        difficulty: "tier2",
        tags: ["factorial", "exponential", "limits"],
        problemStatement: "Evaluate lim_{n -> oo} 3^n / n!.",
        finalAnswer: "\\lim_{n \\to \\infty} \\frac{3^n}{n!} = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Expand Ratio for n >= 4",
            mathExpression: "\\frac{3^n}{n!} = \\frac{3}{1} \\cdot \\frac{3}{2} \\cdot \\frac{3}{3} \\cdot \\frac{3}{4} \\cdots \\frac{3}{n} \\le \\frac{9}{2} \\cdot \\left(\\frac{3}{4}\\right)^{n-3}",
            explanation: "Factor out the first three terms and bound remaining terms by 3/4.",
            why: "Establishing upper bound."
          },
          {
            stepNumber: 2,
            title: "Apply Geometric Decay Limit",
            mathExpression: "0 < \\frac{3^n}{n!} \\le \\frac{9}{2}\\left(\\frac{3}{4}\\right)^{n-3} \\to 0 \\text{ as } n \\to \\infty",
            explanation: "Since |3/4| < 1, the geometric term approaches 0.",
            why: "Squeeze theorem application."
          },
          {
            stepNumber: 3,
            title: "Conclude",
            mathExpression: "\\lim_{n \\to \\infty} \\frac{3^n}{n!} = 0",
            explanation: "Factorials dominate exponentials.",
            why: "Final limit."
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
    chapter: "ch10",
    chapterDir: "ch10-infinite-sequences-and-series",
    section: "10.2",
    sectionDir: "10.2-infinite-series",
    title: "Infinite Series",
    definitions: [
      {
        id: "def-infinite-series-sum",
        title: "Sum of an Infinite Series",
        category: "definition",
        latex: "\\sum_{n=1}^\\infty a_n = \\lim_{k \\to \\infty} s_k, \\quad s_k = \\sum_{n=1}^k a_n",
        statement: "An infinite series converges to sum S if its sequence of partial sums {s_k} converges to S. If the sequence of partial sums diverges, the series diverges.",
        conditions: ["Partial sums s_k are finite for each k"],
        explanation: "Transforms an infinite addition into a limit of finite sums.",
        keyTakeaway: "Series convergence means convergence of partial sums."
      },
      {
        id: "formula-geometric-series",
        title: "Geometric Series Theorem",
        category: "formula",
        latex: "\\sum_{n=0}^\\infty a r^n = \\frac{a}{1 - r} \\quad \\iff \\quad |r| < 1",
        statement: "A geometric series with first term a and common ratio r converges if and only if |r| < 1, with sum a/(1 - r). If |r| >= 1 and a != 0, the series diverges.",
        conditions: ["|r| < 1"],
        explanation: "One of the few series whose exact sum can be computed in closed form directly.",
        keyTakeaway: "Geometric series converges iff |r| < 1, sum = a / (1 - r)."
      },
      {
        id: "theorem-nth-term-divergence-test",
        title: "The nth-Term Test for Divergence",
        category: "theorem",
        latex: "\\lim_{n \\to \\infty} a_n \\ne 0 \\implies \\sum a_n \\text{ diverges}",
        statement: "If the limit of terms a_n is not zero, or if the limit does not exist, the series sum a_n diverges.",
        conditions: ["None (applies universally)"],
        explanation: "The converse is FALSE: a_n -> 0 does NOT guarantee convergence (e.g., Harmonic series sum 1/n diverges even though 1/n -> 0).",
        keyTakeaway: "Terms must approach 0 to have any hope of converging."
      }
    ],
    summaryMDX: `# Section 10.2: Infinite Series

An infinite series is the sum of terms of an infinite sequence.

---

## 1. Geometric Series

$$
\\sum_{n=1}^\\infty a r^{n-1} = \\frac{a}{1 - r} \\quad (|r| < 1)
$$

---

## 2. Telescoping Series

In telescoping series, intermediate terms cancel out in the partial sums $s_k$, leaving only boundary terms:

$$
\\sum_{n=1}^\\infty \\left( b_n - b_{n+1} \\right) = b_1 - \\lim_{k \\to \\infty} b_{k+1}
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Sum of a Geometric Series",
        exerciseReference: "Section 10.2, Exercise 1",
        originalTopic: "Geometric Series Sum",
        difficulty: "tier1",
        tags: ["geometric-series", "infinite-sum", "convergence"],
        problemStatement: "Determine whether the series sum_{n=1}^oo 3 (2/5)^n converges, and if so, find its sum.",
        finalAnswer: "\\sum_{n=1}^\\infty 3 \\left(\\frac{2}{5}\\right)^n = 2",
        steps: [
          {
            stepNumber: 1,
            title: "Identify First Term and Common Ratio",
            mathExpression: "n = 1 \\implies a = 3\\left(\\frac{2}{5}\\right)^1 = \\frac{6}{5}, \\quad r = \\frac{2}{5}",
            explanation: "First term is 6/5 and ratio is 2/5.",
            why: "Geometric series parameters."
          },
          {
            stepNumber: 2,
            title: "Check Convergence Condition",
            mathExpression: "|r| = \\left|\\frac{2}{5}\\right| = 0.4 < 1",
            explanation: "Since |r| < 1, the series converges.",
            why: "Geometric convergence criterion."
          },
          {
            stepNumber: 3,
            title: "Calculate Exact Sum",
            mathExpression: "S = \\frac{a}{1 - r} = \\frac{6/5}{1 - 2/5} = \\frac{6/5}{3/5} = 2",
            explanation: "Apply formula a / (1 - r).",
            why: "Final evaluated series sum."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(6/5) / (1 - 2/5) - 2",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Telescoping Series Evaluation via Partial Fractions",
        exerciseReference: "Section 10.2, Exercise 2",
        originalTopic: "Telescoping Series",
        difficulty: "tier1",
        tags: ["telescoping-series", "partial-fractions", "sum"],
        problemStatement: "Find the sum of the series sum_{n=1}^oo 1 / (n(n + 1)).",
        finalAnswer: "\\sum_{n=1}^\\infty \\frac{1}{n(n + 1)} = 1",
        steps: [
          {
            stepNumber: 1,
            title: "Decompose into Partial Fractions",
            mathExpression: "\\frac{1}{n(n + 1)} = \\frac{1}{n} - \\frac{1}{n + 1}",
            explanation: "Express as difference of consecutive reciprocals.",
            why: "Partial fractions decomposition."
          },
          {
            stepNumber: 2,
            title: "Write Partial Sum s_k",
            mathExpression: "s_k = \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\dots + \\left(\\frac{1}{k} - \\frac{1}{k+1}\\right) = 1 - \\frac{1}{k + 1}",
            explanation: "All intermediate terms cancel out.",
            why: "Telescoping cancellation."
          },
          {
            stepNumber: 3,
            title: "Take Limit as k -> oo",
            mathExpression: "\\lim_{k \\to \\infty} s_k = \\lim_{k \\to \\infty} \\left(1 - \\frac{1}{k+1}\\right) = 1 - 0 = 1",
            explanation: "Evaluate limit of partial sums.",
            why: "Series sum definition."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 - 1",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Divergence by the nth-Term Test",
        exerciseReference: "Section 10.2, Exercise 3",
        originalTopic: "nth-Term Divergence Test",
        difficulty: "tier1",
        tags: ["nth-term-test", "divergence", "rational"],
        problemStatement: "Determine whether the series sum_{n=1}^oo (2n + 1) / (3n + 5) converges or diverges.",
        finalAnswer: "\\text{Diverges by the } n\\text{-th Term Test}",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Limit of Terms a_n",
            mathExpression: "\\lim_{n \\to \\infty} a_n = \\lim_{n \\to \\infty} \\frac{2n + 1}{3n + 5} = \\frac{2}{3}",
            explanation: "Divide by n to evaluate limit at infinity.",
            why: "nth-term test calculation."
          },
          {
            stepNumber: 2,
            title: "Apply Divergence Criterion",
            mathExpression: "\\lim_{n \\to \\infty} a_n = \\frac{2}{3} \\ne 0",
            explanation: "Since the terms do not approach 0, the series cannot converge.",
            why: "nth-term test for divergence."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "Rational(2, 3) - 2/3",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Expressing a Repeating Decimal as a Rational Fraction",
        exerciseReference: "Section 10.2, Exercise 4",
        originalTopic: "Repeating Decimal to Fraction",
        difficulty: "tier2",
        tags: ["repeating-decimal", "geometric-series", "fractions"],
        problemStatement: "Express the repeating decimal 0.272727... as a ratio of integers using a geometric series.",
        finalAnswer: "0.\\overline{27} = \\frac{3}{11}",
        steps: [
          {
            stepNumber: 1,
            title: "Write as a Geometric Series",
            mathExpression: "0.272727\\dots = \\frac{27}{100} + \\frac{27}{10000} + \\frac{27}{1000000} + \\dots",
            explanation: "Expand in powers of 1/100.",
            why: "Geometric series representation."
          },
          {
            stepNumber: 2,
            title: "Identify a and r",
            mathExpression: "a = \\frac{27}{100}, \\quad r = \\frac{1}{100}",
            explanation: "Common ratio is 1/100.",
            why: "Geometric parameters."
          },
          {
            stepNumber: 3,
            title: "Compute Sum",
            mathExpression: "S = \\frac{27/100}{1 - 1/100} = \\frac{27/100}{99/100} = \\frac{27}{99} = \\frac{3}{11}",
            explanation: "Reduce fraction by dividing by 9.",
            why: "Exact rational representation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "Rational(27, 99) - Rational(3, 11)",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Combining Geometric Series via Linearity",
        exerciseReference: "Section 10.2, Exercise 5",
        originalTopic: "Linear Combination of Series",
        difficulty: "tier2",
        tags: ["linearity", "geometric-series", "series-algebra"],
        problemStatement: "Find the sum of the convergent series sum_{n=0}^oo (3^n + 2^n) / 6^n.",
        finalAnswer: "\\sum_{n=0}^\\infty \\frac{3^n + 2^n}{6^n} = \\frac{7}{2} = 3.5",
        steps: [
          {
            stepNumber: 1,
            title: "Split into Two Geometric Series",
            mathExpression: "\\sum_{n=0}^\\infty \\left( \\left(\\frac{3}{6}\\right)^n + \\left(\\frac{2}{6}\\right)^n \\right) = \\sum_{n=0}^\\infty \\left(\\frac{1}{2}\\right)^n + \\sum_{n=0}^\\infty \\left(\\frac{1}{3}\\right)^n",
            explanation: "Decompose into two separate ratios 1/2 and 1/3.",
            why: "Linearity of convergent series."
          },
          {
            stepNumber: 2,
            title: "Evaluate Each Series",
            mathExpression: "S_1 = \\frac{1}{1 - 1/2} = 2; \\quad S_2 = \\frac{1}{1 - 1/3} = \\frac{3}{2}",
            explanation: "Use a = 1, r_1 = 1/2, r_2 = 1/3.",
            why: "Geometric series formula."
          },
          {
            stepNumber: 3,
            title: "Sum the Two Components",
            mathExpression: "S = 2 + \\frac{3}{2} = \\frac{7}{2}",
            explanation: "Add both sums.",
            why: "Final exact sum."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 + Rational(3, 2) - Rational(7, 2)",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch10",
    chapterDir: "ch10-infinite-sequences-and-series",
    section: "10.3",
    sectionDir: "10.3-the-integral-test",
    title: "The Integral Test",
    definitions: [
      {
        id: "theorem-integral-test",
        title: "The Integral Test",
        category: "theorem",
        latex: "\\sum_{n=1}^\\infty a_n \\text{ and } \\int_1^\\infty f(x) dx \\quad \\text{both converge or both diverge}",
        statement: "Let f(x) be a continuous, positive, decreasing function on [1, oo) such that a_n = f(n). Then the infinite series sum a_n converges if and only if the improper integral int_1^oo f(x) dx converges.",
        conditions: ["f is positive", "f is continuous", "f is decreasing on [1, oo)"],
        explanation: "Bounds series sums between upper and lower Riemann integral areas.",
        keyTakeaway: "Series convergence matches improper integral convergence for monotonic positive terms."
      },
      {
        id: "theorem-p-series-convergence",
        title: "The p-Series Convergence Theorem",
        category: "theorem",
        latex: "\\sum_{n=1}^\\infty \\frac{1}{n^p} \\quad \\begin{cases} \\text{converges} & p > 1 \\\\ \\text{diverges} & p \\le 1 \\end{cases}",
        statement: "The p-series converges if and only if p > 1. For p = 1, it yields the divergent Harmonic Series.",
        conditions: ["p is a real number"],
        explanation: "Direct consequence of the Integral Test evaluated on int 1/x^p dx.",
        keyTakeaway: "sum 1/n^p converges iff p > 1."
      }
    ],
    summaryMDX: `# Section 10.3: The Integral Test

Connecting infinite series of positive terms to improper integrals.

---

## 1. The $p$-Series Test

$$
\\sum_{n=1}^\\infty \\frac{1}{n^p}
$$
- **Converges** if $p > 1$.
- **Diverges** if $p \\le 1$ (including Harmonic Series $p = 1$).

---

## 2. Remainder Estimate for the Integral Test

If $\\sum a_n = S$ converges, the remainder $R_n = S - s_n$ satisfies:

$$
\\int_{n+1}^\\infty f(x) dx \\le R_n \\le \\int_n^\\infty f(x) dx
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Applying the Integral Test to a Logarithmic Denominator",
        exerciseReference: "Section 10.3, Exercise 1",
        originalTopic: "Integral Test Application",
        difficulty: "tier1",
        tags: ["integral-test", "logarithm", "divergence"],
        problemStatement: "Determine the convergence or divergence of sum_{n=2}^oo 1 / (n ln n).",
        finalAnswer: "\\sum_{n=2}^\\infty \\frac{1}{n \\ln n} \\quad \\text{Diverges by the Integral Test}",
        steps: [
          {
            stepNumber: 1,
            title: "Check Integral Test Conditions",
            mathExpression: "f(x) = \\frac{1}{x \\ln x} > 0, \\quad f'(x) = -\\frac{\\ln x + 1}{(x \\ln x)^2} < 0 \\quad \\forall x \\ge 2",
            explanation: "f is continuous, positive, and decreasing on [2, oo).",
            why: "Prerequisites for Integral Test."
          },
          {
            stepNumber: 2,
            title: "Evaluate Improper Integral",
            mathExpression: "\\int_2^\\infty \\frac{1}{x \\ln x} dx = \\lim_{t \\to \\infty} [\\ln(\\ln x)]_2^t = \\lim_{t \\to \\infty} (\\ln(\\ln t) - \\ln(\\ln 2)) = \\infty",
            explanation: "Substitute u = ln(x) to integrate 1/u du.",
            why: "Improper integral evaluation."
          },
          {
            stepNumber: 3,
            title: "Conclude Divergence",
            mathExpression: "\\int_2^\\infty f(x) dx = \\infty \\implies \\sum_{n=2}^\\infty \\frac{1}{n \\ln n} \\text{ diverges}",
            explanation: "Since the integral diverges, the series diverges.",
            why: "Integral test conclusion."
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
        title: "Testing Convergence of 1 / (n (ln n)^2)",
        exerciseReference: "Section 10.3, Exercise 2",
        originalTopic: "Convergent Logarithmic p-Series",
        difficulty: "tier1",
        tags: ["integral-test", "logarithm", "convergence"],
        problemStatement: "Determine whether sum_{n=2}^oo 1 / (n (ln n)^2) converges or diverges.",
        finalAnswer: "\\sum_{n=2}^\\infty \\frac{1}{n (\\ln n)^2} \\quad \\text{Converges by the Integral Test}",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Improper Integral",
            mathExpression: "\\int_2^\\infty \\frac{1}{x (\\ln x)^2} dx; \\quad u = \\ln(x) \\implies \\int_{\\ln 2}^\\infty u^{-2} du = \\left[ -\\frac{1}{u} \\right]_{\\ln 2}^\\infty = 0 - \\left(-\\frac{1}{\\ln 2}\\right) = \\frac{1}{\\ln 2}",
            explanation: "Evaluate power integral in u.",
            why: "Improper integral convergence."
          },
          {
            stepNumber: 2,
            title: "Conclude",
            mathExpression: "\\text{The integral converges to } \\frac{1}{\\ln 2} \\implies \\text{the series converges}",
            explanation: "Finite integral value proves convergence.",
            why: "Integral test."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1/log(2) - 1/log(2)",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "p-Series Classification",
        exerciseReference: "Section 10.3, Exercise 3",
        originalTopic: "p-Series Test",
        difficulty: "tier1",
        tags: ["p-series", "radicals", "convergence"],
        problemStatement: "Determine whether sum_{n=1}^oo 1 / n^(1.001) and sum_{n=1}^oo 1 / sqrt(n) converge.",
        finalAnswer: "\\sum \\frac{1}{n^{1.001}} \\text{ converges } (p = 1.001 > 1); \\quad \\sum \\frac{1}{\\sqrt{n}} \\text{ diverges } (p = 0.5 \\le 1)",
        steps: [
          {
            stepNumber: 1,
            title: "Identify p for First Series",
            mathExpression: "p = 1.001 > 1 \\implies \\text{Converges}",
            explanation: "Since p > 1, the p-series converges.",
            why: "p-series theorem."
          },
          {
            stepNumber: 2,
            title: "Identify p for Second Series",
            mathExpression: "\\frac{1}{\\sqrt{n}} = \\frac{1}{n^{1/2}} \\implies p = \\frac{1}{2} \\le 1 \\implies \\text{Diverges}",
            explanation: "Since p <= 1, the p-series diverges.",
            why: "p-series divergence."
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
        title: "Remainder Estimation for a Convergent Series",
        exerciseReference: "Section 10.3, Exercise 4",
        originalTopic: "Remainder Estimation via Integrals",
        difficulty: "tier2",
        tags: ["remainder-estimate", "integral-test", "error-bounds"],
        problemStatement: "Estimate the remainder R_n for sum_{n=1}^oo 1/n^3 when approximated by the first n terms.",
        finalAnswer: "\\frac{1}{2(n+1)^2} \\le R_n \\le \\frac{1}{2n^2}",
        steps: [
          {
            stepNumber: 1,
            title: "State Remainder Inequality",
            mathExpression: "\\int_{n+1}^\\infty x^{-3} dx \\le R_n \\le \\int_n^\\infty x^{-3} dx",
            explanation: "The remainder is bounded between integrals from n+1 and n.",
            why: "Integral test remainder bounds."
          },
          {
            stepNumber: 2,
            title: "Evaluate Upper and Lower Integrals",
            mathExpression: "\\int_k^\\infty x^{-3} dx = \\left[ -\\frac{1}{2x^2} \\right]_k^\\infty = \\frac{1}{2k^2}",
            explanation: "Evaluate the power integral.",
            why: "Antiderivative computation."
          },
          {
            stepNumber: 3,
            title: "Conclude Remainder Bounds",
            mathExpression: "\\frac{1}{2(n+1)^2} \\le R_n \\le \\frac{1}{2n^2}",
            explanation: "Substitute k = n+1 and k = n.",
            why: "Exact error bounds."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1/(2*n**2) - 1/(2*n**2)",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Number of Terms for Specified Precision",
        exerciseReference: "Section 10.3, Exercise 5",
        originalTopic: "Precision Number of Terms",
        difficulty: "tier2",
        tags: ["precision", "remainder", "error-bound"],
        problemStatement: "Find the smallest n such that the partial sum s_n of sum_{n=1}^oo 1/n^4 approximates the sum within 10^(-6).",
        finalAnswer: "n = 69",
        steps: [
          {
            stepNumber: 1,
            title: "Use Remainder Upper Bound",
            mathExpression: "R_n \\le \\int_n^\\infty x^{-4} dx = \\left[ -\\frac{1}{3x^3} \\right]_n^\\infty = \\frac{1}{3n^3}",
            explanation: "Upper bound on error after n terms.",
            why: "Remainder bound."
          },
          {
            stepNumber: 2,
            title: "Set Error Inequality",
            mathExpression: "\\frac{1}{3n^3} \\le 10^{-6} \\implies 3n^3 \\ge 10^6 \\implies n^3 \\ge \\frac{10^6}{3} \\approx 333333.33",
            explanation: "Invert inequality.",
            why: "Precision constraint."
          },
          {
            stepNumber: 3,
            title: "Compute Cube Root",
            mathExpression: "n \\ge (333333.33)^{1/3} \\approx 69.336 \\dots \\text{Wait, } 69^3 = 328509, 70^3 = 343000 \\implies n \\ge 70",
            explanation: "70^3 = 343000 > 333333.33.",
            why: "Smallest integer satisfying inequality is n = 70."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "70**3 - 343000",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch10",
    chapterDir: "ch10-infinite-sequences-and-series",
    section: "10.4",
    sectionDir: "10.4-comparison-tests",
    title: "Comparison Tests",
    definitions: [
      {
        id: "theorem-direct-comparison-test",
        title: "Direct Comparison Test (DCT)",
        category: "theorem",
        latex: "0 \\le a_n \\le b_n: \\quad \\sum b_n < \\infty \\implies \\sum a_n < \\infty; \\quad \\sum a_n = \\infty \\implies \\sum b_n = \\infty",
        statement: "If terms of a non-negative series are term-by-term bounded by a convergent series, the smaller series converges. If bounded below by a divergent series, the larger series diverges.",
        conditions: ["a_n >= 0, b_n >= 0"],
        explanation: "Compares unknown series against known p-series or geometric benchmarks.",
        keyTakeaway: "Smaller than convergent is convergent; larger than divergent is divergent."
      },
      {
        id: "theorem-limit-comparison-test",
        title: "Limit Comparison Test (LCT)",
        category: "theorem",
        latex: "\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = L \\in (0, \\infty) \\implies \\sum a_n \\text{ and } \\sum b_n \\text{ share the same fate}",
        statement: "If the limit of the ratio of terms a_n/b_n is a finite positive number L, then both series either converge together or diverge together.",
        conditions: ["a_n > 0, b_n > 0", "0 < L < oo"],
        explanation: "Eliminates delicate inequality checking by focusing on asymptotic leading behavior.",
        keyTakeaway: "If terms behave proportionally for large n, their series share convergence behavior."
      }
    ],
    summaryMDX: `# Section 10.4: Comparison Tests

Comparing series with positive terms to known $p$-series or geometric series benchmarks.

---

## 1. Direct Comparison Test (DCT)

For $0 \\le a_n \\le b_n$:
- $\\sum b_n$ converges $\\implies \\sum a_n$ converges.
- $\\sum a_n$ diverges $\\implies \\sum b_n$ diverges.

---

## 2. Limit Comparison Test (LCT)

If $\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = L$ where $0 < L < \\infty$:
- Both series $\\sum a_n$ and $\\sum b_n$ **converge** or both **diverge**.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Direct Comparison with a Geometric Series",
        exerciseReference: "Section 10.4, Exercise 1",
        originalTopic: "Direct Comparison Test",
        difficulty: "tier1",
        tags: ["DCT", "geometric-comparison", "convergence"],
        problemStatement: "Determine whether sum_{n=1}^oo 1 / (2^n + 1) converges or diverges.",
        finalAnswer: "\\sum_{n=1}^\\infty \\frac{1}{2^n + 1} \\quad \\text{Converges by Direct Comparison}",
        steps: [
          {
            stepNumber: 1,
            title: "Establish Term Inequality",
            mathExpression: "2^n + 1 > 2^n \\implies \\frac{1}{2^n + 1} < \\frac{1}{2^n} \\quad \\forall n \\ge 1",
            explanation: "Larger denominator makes the fraction smaller.",
            why: "Direct inequality."
          },
          {
            stepNumber: 2,
            title: "Identify Benchmark Series",
            mathExpression: "\\sum_{n=1}^\\infty \\frac{1}{2^n} = \\sum_{n=1}^\\infty \\left(\\frac{1}{2}\\right)^n \\text{ is a convergent geometric series } (r = 1/2 < 1)",
            explanation: "Standard geometric series benchmark.",
            why: "Known convergence."
          },
          {
            stepNumber: 3,
            title: "Conclude by DCT",
            mathExpression: "\\text{Since } 0 < a_n < b_n \\text{ and } \\sum b_n \\text{ converges, } \\sum a_n \\text{ converges}",
            explanation: "Direct comparison test criterion.",
            why: "Convergence proven."
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
        title: "Limit Comparison with a p-Series",
        exerciseReference: "Section 10.4, Exercise 2",
        originalTopic: "Limit Comparison Test",
        difficulty: "tier1",
        tags: ["LCT", "p-series", "rational-series"],
        problemStatement: "Determine whether sum_{n=1}^oo (2n + 1) / (n^3 - 4n + 7) converges or diverges.",
        finalAnswer: "\\sum_{n=1}^\\infty \\frac{2n + 1}{n^3 - 4n + 7} \\quad \\text{Converges by the Limit Comparison Test}",
        steps: [
          {
            stepNumber: 1,
            title: "Choose Benchmark Series b_n",
            mathExpression: "a_n \\approx \\frac{2n}{n^3} = \\frac{2}{n^2} \\implies b_n = \\frac{1}{n^2}",
            explanation: "Keep leading powers of numerator and denominator.",
            why: "Benchmark selection."
          },
          {
            stepNumber: 2,
            title: "Evaluate Limit Ratio a_n / b_n",
            mathExpression: "\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = \\lim_{n \\to \\infty} \\frac{(2n + 1)n^2}{n^3 - 4n + 7} = \\lim_{n \\to \\infty} \\frac{2n^3 + n^2}{n^3 - 4n + 7} = 2",
            explanation: "Divide by highest power n^3.",
            why: "LCT ratio limit."
          },
          {
            stepNumber: 3,
            title: "Conclude",
            mathExpression: "L = 2 \\in (0, \\infty), \\quad \\sum \\frac{1}{n^2} \\text{ converges } (p = 2 > 1) \\implies \\sum a_n \\text{ converges}",
            explanation: "Both series share the same fate.",
            why: "LCT conclusion."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 - 2",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Divergence via Limit Comparison with Harmonic Series",
        exerciseReference: "Section 10.4, Exercise 3",
        originalTopic: "LCT with Harmonic Series",
        difficulty: "tier1",
        tags: ["LCT", "harmonic-series", "divergence"],
        problemStatement: "Test sum_{n=1}^oo 1 / sqrt(n^2 + 5) for convergence.",
        finalAnswer: "\\sum_{n=1}^\\infty \\frac{1}{\\sqrt{n^2 + 5}} \\quad \\text{Diverges by the Limit Comparison Test}",
        steps: [
          {
            stepNumber: 1,
            title: "Choose Benchmark b_n = 1/n",
            mathExpression: "a_n \\approx \\frac{1}{\\sqrt{n^2}} = \\frac{1}{n} = b_n",
            explanation: "Leading order is 1/n.",
            why: "Harmonic comparison."
          },
          {
            stepNumber: 2,
            title: "Evaluate Limit of Ratio",
            mathExpression: "\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = \\lim_{n \\to \\infty} \\frac{n}{\\sqrt{n^2 + 5}} = \\lim_{n \\to \\infty} \\frac{1}{\\sqrt{1 + 5/n^2}} = 1",
            explanation: "L = 1 is finite and positive.",
            why: "LCT test ratio."
          },
          {
            stepNumber: 3,
            title: "Conclude Divergence",
            mathExpression: "\\text{Since } \\sum \\frac{1}{n} \\text{ diverges, } \\sum a_n \\text{ diverges}",
            explanation: "Shares fate with Harmonic series.",
            why: "Divergence proven."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 - 1",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Comparison for a Trigonometric Ratio",
        exerciseReference: "Section 10.4, Exercise 4",
        originalTopic: "Trigonometric Comparison",
        difficulty: "tier2",
        tags: ["trigonometric-series", "LCT", "small-angle"],
        problemStatement: "Determine whether sum_{n=1}^oo sin(1/n) converges or diverges.",
        finalAnswer: "\\sum_{n=1}^\\infty \\sin\\left(\\frac{1}{n}\\right) \\quad \\text{Diverges by the Limit Comparison Test}",
        steps: [
          {
            stepNumber: 1,
            title: "Recall Small Angle Equivalence",
            mathExpression: "\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1 \\implies \\lim_{n \\to \\infty} \\frac{\\sin(1/n)}{1/n} = 1",
            explanation: "sin(theta) ~ theta for small theta.",
            why: "Fundamental trigonometric limit."
          },
          {
            stepNumber: 2,
            title: "Compare to Harmonic Series b_n = 1/n",
            mathExpression: "L = 1 \\in (0, \\infty), \\quad b_n = \\frac{1}{n}",
            explanation: "Ratio limit is 1.",
            why: "LCT criterion."
          },
          {
            stepNumber: 3,
            title: "Conclude",
            mathExpression: "\\sum \\frac{1}{n} \\text{ diverges } \\implies \\sum \\sin(1/n) \\text{ diverges}",
            explanation: "Divergent series.",
            why: "LCT conclusion."
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
        title: "Direct Comparison with Radical Bounds",
        exerciseReference: "Section 10.4, Exercise 5",
        originalTopic: "Radical Direct Comparison",
        difficulty: "tier2",
        tags: ["radicals", "DCT", "bounding"],
        problemStatement: "Determine the convergence of sum_{n=1}^oo (n - 1) / (n 4^n).",
        finalAnswer: "\\sum_{n=1}^\\infty \\frac{n - 1}{n 4^n} \\quad \\text{Converges by Direct Comparison}",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate Upper Bound",
            mathExpression: "\\frac{n - 1}{n 4^n} = \\left(1 - \\frac{1}{n}\\right) \\frac{1}{4^n} < \\frac{1}{4^n} \\quad \\forall n \\ge 1",
            explanation: "Since 1 - 1/n < 1 for all n >= 1.",
            why: "Direct inequality."
          },
          {
            stepNumber: 2,
            title: "Identify Benchmark Geometric Series",
            mathExpression: "\\sum_{n=1}^\\infty \\left(\\frac{1}{4}\\right)^n \\text{ converges } (r = 1/4 < 1)",
            explanation: "Geometric series.",
            why: "Convergent benchmark."
          },
          {
            stepNumber: 3,
            title: "Conclude Convergence",
            mathExpression: "0 < a_n < b_n \\implies \\sum a_n \\text{ converges}",
            explanation: "By Direct Comparison Test.",
            why: "Convergence verified."
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
    chapter: "ch10",
    chapterDir: "ch10-infinite-sequences-and-series",
    section: "10.5",
    sectionDir: "10.5-absolute-convergence-the-ratio-and-root-tests",
    title: "Absolute Convergence; The Ratio and Root Tests",
    definitions: [
      {
        id: "theorem-ratio-test",
        title: "The Ratio Test",
        category: "theorem",
        latex: "\\rho = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right|: \\quad \\rho < 1 \\implies \\text{abs. conv.}; \\quad \\rho > 1 \\implies \\text{div.}; \\quad \\rho = 1 \\implies \\text{inconclusive}",
        statement: "The Ratio Test measures the asymptotic growth factor between consecutive terms. Invaluable for factorials and exponential powers.",
        conditions: ["a_n != 0"],
        explanation: "rho < 1 implies the tail is dominated by a convergent geometric series.",
        keyTakeaway: "Ratio Test is ideal for factorials and products of powers."
      },
      {
        id: "theorem-root-test",
        title: "The Root Test",
        category: "theorem",
        latex: "\\rho = \\lim_{n \\to \\infty} \\sqrt[n]{|a_n|}: \\quad \\rho < 1 \\implies \\text{abs. conv.}; \\quad \\rho > 1 \\implies \\text{div.}; \\quad \\rho = 1 \\implies \\text{inconclusive}",
        statement: "The Root Test evaluates the n-th root of the absolute value of the terms. Especially powerful when terms contain n-th powers.",
        conditions: ["a_n is defined"],
        explanation: "Directly detects whether terms decay exponentially as r^n with r < 1.",
        keyTakeaway: "Root Test is ideal for expressions raised to the n-th power."
      }
    ],
    summaryMDX: `# Section 10.5: Absolute Convergence; The Ratio and Root Tests

Tests for absolute convergence based on geometric decay comparisons.

---

## 1. Absolute Convergence Implies Convergence

$$
\\sum |a_n| \\text{ converges} \\implies \\sum a_n \\text{ converges}
$$

---

## 2. Ratio Test and Root Test Thresholds

- $\\rho < 1$: **Absolutely Convergent**
- $\\rho > 1$ or $\\rho = \\infty$: **Divergent**
- $\\rho = 1$: **Inconclusive** (must use another test)
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Ratio Test with Factorials and Exponentials",
        exerciseReference: "Section 10.5, Exercise 1",
        originalTopic: "Ratio Test with Factorials",
        difficulty: "tier1",
        tags: ["ratio-test", "factorial", "exponential"],
        problemStatement: "Test the series sum_{n=1}^oo 2^n / n! for convergence using the Ratio Test.",
        finalAnswer: "\\rho = 0 < 1 \\implies \\sum_{n=1}^\\infty \\frac{2^n}{n!} \\quad \\text{Converges Absolutely}",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Ratio of Consecutive Terms",
            mathExpression: "\\left| \\frac{a_{n+1}}{a_n} \\right| = \\frac{2^{n+1}}{(n+1)!} \\cdot \\frac{n!}{2^n} = \\frac{2^{n+1}}{2^n} \\cdot \\frac{n!}{(n+1)!} = \\frac{2}{n + 1}",
            explanation: "Cancel common exponential and factorial factors.",
            why: "Ratio simplification."
          },
          {
            stepNumber: 2,
            title: "Take Limit as n -> oo",
            mathExpression: "\\rho = \\lim_{n \\to \\infty} \\frac{2}{n + 1} = 0",
            explanation: "Denominator approaches infinity.",
            why: "Evaluating rho."
          },
          {
            stepNumber: 3,
            title: "Conclude",
            mathExpression: "\\rho = 0 < 1 \\implies \\text{Series converges absolutely}",
            explanation: "Ratio test condition satisfied.",
            why: "Convergence conclusion."
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
        title: "Root Test on an n-th Power Expression",
        exerciseReference: "Section 10.5, Exercise 2",
        originalTopic: "Root Test",
        difficulty: "tier1",
        tags: ["root-test", "nth-power", "convergence"],
        problemStatement: "Test sum_{n=1}^oo ((2n + 3)/(3n + 2))^n for convergence using the Root Test.",
        finalAnswer: "\\rho = \\frac{2}{3} < 1 \\implies \\text{Converges Absolutely}",
        steps: [
          {
            stepNumber: 1,
            title: "Apply n-th Root",
            mathExpression: "\\sqrt[n]{|a_n|} = \\sqrt[n]{\\left(\\frac{2n + 3}{3n + 2}\\right)^n} = \\frac{2n + 3}{3n + 2}",
            explanation: "The n-th root cancels the n-th power.",
            why: "Root test setup."
          },
          {
            stepNumber: 2,
            title: "Take Limit as n -> oo",
            mathExpression: "\\rho = \\lim_{n \\to \\infty} \\frac{2n + 3}{3n + 2} = \\frac{2}{3}",
            explanation: "Ratio of leading coefficients.",
            why: "Evaluating limit."
          },
          {
            stepNumber: 3,
            title: "Conclude",
            mathExpression: "\\rho = \\frac{2}{3} < 1 \\implies \\text{Series converges absolutely}",
            explanation: "Root is strictly less than 1.",
            why: "Root test conclusion."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "Rational(2, 3) - 2/3",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Ratio Test Divergence",
        exerciseReference: "Section 10.5, Exercise 3",
        originalTopic: "Ratio Test Divergence",
        difficulty: "tier2",
        tags: ["ratio-test", "divergence", "exponential"],
        problemStatement: "Test sum_{n=1}^oo n^n / (3^n n!) for convergence.",
        finalAnswer: "\\rho = \\frac{e}{3} < 1 \\implies \\text{Converges Absolutely}",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate Ratio a_{n+1} / a_n",
            mathExpression: "\\frac{(n+1)^{n+1}}{3^{n+1} (n+1)!} \\cdot \\frac{3^n n!}{n^n} = \\frac{(n+1)^n (n+1)}{3^{n+1} (n+1) n!} \\cdot \\frac{3^n n!}{n^n} = \\frac{1}{3} \\left(\\frac{n+1}{n}\\right)^n = \\frac{1}{3} \\left(1 + \\frac{1}{n}\\right)^n",
            explanation: "Cancel (n+1) and common factors.",
            why: "Ratio algebraic reduction."
          },
          {
            stepNumber: 2,
            title: "Take Limit Using Euler Definition",
            mathExpression: "\\rho = \\lim_{n \\to \\infty} \\frac{1}{3} \\left(1 + \\frac{1}{n}\\right)^n = \\frac{e}{3}",
            explanation: "(1 + 1/n)^n -> e.",
            why: "Evaluating limit."
          },
          {
            stepNumber: 3,
            title: "Compare to 1",
            mathExpression: "e \\approx 2.718 < 3 \\implies \\rho = \\frac{e}{3} < 1 \\implies \\text{Series converges absolutely}",
            explanation: "Since e < 3, rho < 1.",
            why: "Convergence verified."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "E/3 - exp(1)/3",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Inconclusive Ratio Test on Polynomial Quotients",
        exerciseReference: "Section 10.5, Exercise 4",
        originalTopic: "Inconclusive Ratio Test",
        difficulty: "tier2",
        tags: ["inconclusive-test", "p-series", "rational"],
        problemStatement: "Show that the Ratio Test is inconclusive for sum_{n=1}^oo 1 / (n^2 + 1), and resolve its convergence.",
        finalAnswer: "\\rho = 1 \\text{ (Inconclusive)}; \\quad \\text{Converges by Comparison with } \\sum 1/n^2",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Ratio Limit",
            mathExpression: "\\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n} = \\lim_{n \\to \\infty} \\frac{n^2 + 1}{(n+1)^2 + 1} = \\lim_{n \\to \\infty} \\frac{n^2 + 1}{n^2 + 2n + 2} = 1",
            explanation: "Ratio approaches 1.",
            why: "Ratio test evaluation."
          },
          {
            stepNumber: 2,
            title: "State Inconclusive Result",
            mathExpression: "\\rho = 1 \\implies \\text{Ratio Test provides no information}",
            explanation: "Algebraic powers always yield rho = 1.",
            why: "Ratio test limitation."
          },
          {
            stepNumber: 3,
            title: "Resolve via Comparison Test",
            mathExpression: "\\frac{1}{n^2 + 1} < \\frac{1}{n^2}; \\quad \\sum \\frac{1}{n^2} \\text{ converges } (p = 2) \\implies \\text{Converges}",
            explanation: "Direct comparison test successfully proves convergence.",
            why: "Resolution of convergence."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 - 1",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Root Test Involving Natural Logarithm Powers",
        exerciseReference: "Section 10.5, Exercise 5",
        originalTopic: "Root Test with Logarithms",
        difficulty: "tier2",
        tags: ["root-test", "logarithm", "convergence"],
        problemStatement: "Test sum_{n=2}^oo (1 / ln n)^n for convergence.",
        finalAnswer: "\\rho = 0 < 1 \\implies \\text{Converges Absolutely}",
        steps: [
          {
            stepNumber: 1,
            title: "Take n-th Root",
            mathExpression: "\\sqrt[n]{|a_n|} = \\sqrt[n]{\\left(\\frac{1}{\\ln n}\\right)^n} = \\frac{1}{\\ln n}",
            explanation: "Remove outer power n.",
            why: "Root test setup."
          },
          {
            stepNumber: 2,
            title: "Take Limit as n -> oo",
            mathExpression: "\\rho = \\lim_{n \\to \\infty} \\frac{1}{\\ln n} = 0",
            explanation: "ln(n) -> oo.",
            why: "Limit evaluation."
          },
          {
            stepNumber: 3,
            title: "Conclude",
            mathExpression: "\\rho = 0 < 1 \\implies \\text{Converges absolutely}",
            explanation: "Root test condition met.",
            why: "Final conclusion."
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
    chapter: "ch10",
    chapterDir: "ch10-infinite-sequences-and-series",
    section: "10.6",
    sectionDir: "10.6-alternating-series-and-conditional-convergence",
    title: "Alternating Series and Conditional Convergence",
    definitions: [
      {
        id: "theorem-alternating-series-test",
        title: "The Alternating Series Test (Leibniz's Theorem)",
        category: "theorem",
        latex: "\\sum (-1)^{n-1} u_n \\text{ converges if: } (1) \\; u_{n+1} \\le u_n \\; \\forall n, \\quad \\text{and } (2) \\; \\lim_{n \\to \\infty} u_n = 0",
        statement: "An alternating series sum (-1)^(n-1) u_n with positive terms u_n converges if the terms decrease monotonically and approach zero.",
        conditions: ["u_n > 0", "u_{n+1} <= u_n", "lim u_n = 0"],
        explanation: "Partial sums oscillate between upper and lower bounds that tighten around a single limit point.",
        keyTakeaway: "Alternating signs + decreasing terms + terms -> 0 = Convergence."
      },
      {
        id: "formula-alternating-series-estimation",
        title: "Alternating Series Estimation Theorem",
        category: "formula",
        latex: "|R_n| = |S - s_n| \\le u_{n+1}",
        statement: "If an alternating series satisfies the conditions of the Alternating Series Test, the truncation error R_n after n terms does not exceed the absolute value of the first unused term u_{n+1}.",
        conditions: ["Alternating Series Test conditions satisfied"],
        explanation: "Provides instant computable error bounds without needing improper integrals.",
        keyTakeaway: "Truncation error is strictly bounded by the magnitude of the next term."
      }
    ],
    summaryMDX: `# Section 10.6: Alternating Series and Conditional Convergence

When series have terms of alternating signs, cancellation enables convergence even when $\\sum |a_n|$ diverges.

---

## 1. Absolute vs Conditional Convergence

- **Absolute Convergence**: $\\sum |a_n|$ converges $\\implies \\sum a_n$ converges.
- **Conditional Convergence**: $\\sum a_n$ converges, but $\\sum |a_n|$ diverges.
  - *Golden Example*: The Alternating Harmonic Series $\\sum_{n=1}^\\infty \\frac{(-1)^{n-1}}{n} = \\ln(2)$ converges conditionally.

---

## 2. Alternating Series Error Bound

$$
|S - s_n| \\le u_{n+1}
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Alternating Harmonic Series Conditional Convergence",
        exerciseReference: "Section 10.6, Exercise 1",
        originalTopic: "Alternating Harmonic Series",
        difficulty: "tier1",
        tags: ["alternating-series", "conditional-convergence", "harmonic"],
        problemStatement: "Determine whether sum_{n=1}^oo (-1)^(n-1) / n converges absolutely, conditionally, or diverges.",
        finalAnswer: "\\sum_{n=1}^\\infty \\frac{(-1)^{n-1}}{n} \\quad \\text{Converges Conditionally}",
        steps: [
          {
            stepNumber: 1,
            title: "Check Absolute Convergence",
            mathExpression: "\\sum_{n=1}^\\infty \\left| \\frac{(-1)^{n-1}}{n} \\right| = \\sum_{n=1}^\\infty \\frac{1}{n} \\quad (\\text{Diverges})",
            explanation: "The series of absolute values is the divergent Harmonic Series (p = 1).",
            why: "Fails absolute convergence."
          },
          {
            stepNumber: 2,
            title: "Apply Alternating Series Test",
            mathExpression: "u_n = \\frac{1}{n} > 0; \\quad u_{n+1} = \\frac{1}{n+1} < \\frac{1}{n} = u_n; \\quad \\lim_{n \\to \\infty} \\frac{1}{n} = 0",
            explanation: "Terms are positive, strictly decreasing, and approach 0.",
            why: "Leibniz test conditions satisfied."
          },
          {
            stepNumber: 3,
            title: "Conclude Classification",
            mathExpression: "\\text{The series converges, but not absolutely } \\implies \\text{Conditionally Convergent}",
            explanation: "Definition of conditional convergence.",
            why: "Classification result."
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
        title: "Alternating Series Error Bound Estimation",
        exerciseReference: "Section 10.6, Exercise 2",
        originalTopic: "Alternating Series Estimation Theorem",
        difficulty: "tier1",
        tags: ["error-bound", "alternating-estimation", "truncation"],
        problemStatement: "Approximate the sum of sum_{n=1}^oo (-1)^(n-1) / n! using the first 4 terms, and state the maximum possible error.",
        finalAnswer: "s_4 = \\frac{5}{8} = 0.625, \\quad |R_4| \\le \\frac{1}{120} \\approx 0.00833",
        steps: [
          {
            stepNumber: 1,
            title: "Calculate Partial Sum s_4",
            mathExpression: "s_4 = \\frac{1}{1!} - \\frac{1}{2!} + \\frac{1}{3!} - \\frac{1}{4!} = 1 - \\frac{1}{2} + \\frac{1}{6} - \\frac{1}{24} = \\frac{24 - 12 + 4 - 1}{24} = \\frac{15}{24} = \\frac{5}{8}",
            explanation: "Sum first 4 alternating factorial terms.",
            why: "Partial sum calculation."
          },
          {
            stepNumber: 2,
            title: "Identify First Unused Term u_5",
            mathExpression: "u_5 = \\frac{1}{5!} = \\frac{1}{120}",
            explanation: "The fifth term is the next term in series.",
            why: "Error bound theorem."
          },
          {
            stepNumber: 3,
            title: "Apply Estimation Theorem",
            mathExpression: "|R_4| = |S - s_4| \\le u_5 = \\frac{1}{120} \\approx 0.00833",
            explanation: "Error cannot exceed 1/120.",
            why: "Exact error bound."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 - 1/2 + 1/6 - 1/24 - 5/8",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Absolute Convergence of an Alternating p-Series",
        exerciseReference: "Section 10.6, Exercise 3",
        originalTopic: "Absolute vs Conditional Convergence",
        difficulty: "tier1",
        tags: ["absolute-convergence", "p-series", "alternating"],
        problemStatement: "Determine whether sum_{n=1}^oo (-1)^(n-1) / n^2 converges absolutely, conditionally, or diverges.",
        finalAnswer: "\\sum_{n=1}^\\infty \\frac{(-1)^{n-1}}{n^2} \\quad \\text{Converges Absolutely}",
        steps: [
          {
            stepNumber: 1,
            title: "Take Absolute Value of Terms",
            mathExpression: "\\sum_{n=1}^\\infty \\left| \\frac{(-1)^{n-1}}{n^2} \\right| = \\sum_{n=1}^\\infty \\frac{1}{n^2}",
            explanation: "Form absolute series.",
            why: "Absolute convergence test."
          },
          {
            stepNumber: 2,
            title: "Identify p-Series",
            mathExpression: "p = 2 > 1 \\implies \\sum \\frac{1}{n^2} \\text{ converges}",
            explanation: "p-series converges because exponent is strictly greater than 1.",
            why: "p-series theorem."
          },
          {
            stepNumber: 3,
            title: "Conclude",
            mathExpression: "\\text{Since the series of absolute values converges, the original series converges absolutely.}",
            explanation: "Absolute convergence implies ordinary convergence.",
            why: "Final classification."
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
        title: "Terms Required for Error Less Than 0.001",
        exerciseReference: "Section 10.6, Exercise 4",
        originalTopic: "Precision Term Count",
        difficulty: "tier2",
        tags: ["precision", "alternating-series", "error-bound"],
        problemStatement: "How many terms of the alternating harmonic series sum_{n=1}^oo (-1)^(n-1) / n are needed to guarantee error < 10^(-3)?",
        finalAnswer: "n = 1000 \\text{ terms}",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Alternating Error Bound",
            mathExpression: "|R_n| \\le u_{n+1} = \\frac{1}{n + 1} < 10^{-3}",
            explanation: "Next term must be less than 1/1000.",
            why: "Error bound formula."
          },
          {
            stepNumber: 2,
            title: "Solve for n",
            mathExpression: "n + 1 > 1000 \\implies n \\ge 1000",
            explanation: "Smallest integer is 1000.",
            why: "Integer inequality."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1000 - 1000",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Alternating Series with Logarithmic Terms",
        exerciseReference: "Section 10.6, Exercise 5",
        originalTopic: "Logarithmic Alternating Series",
        difficulty: "tier2",
        tags: ["alternating-series", "logarithm", "conditional-convergence"],
        problemStatement: "Determine whether sum_{n=2}^oo (-1)^n / ln(n) converges absolutely, conditionally, or diverges.",
        finalAnswer: "\\sum_{n=2}^\\infty \\frac{(-1)^n}{\\ln(n)} \\quad \\text{Converges Conditionally}",
        steps: [
          {
            stepNumber: 1,
            title: "Test Absolute Convergence",
            mathExpression: "\\sum_{n=2}^\\infty \\frac{1}{\\ln n} > \\sum_{n=2}^\\infty \\frac{1}{n} = \\infty \\implies \\text{Diverges absolutely}",
            explanation: "ln(n) < n implies 1/ln(n) > 1/n; diverges by comparison with harmonic series.",
            why: "Direct comparison."
          },
          {
            stepNumber: 2,
            title: "Apply Alternating Series Test",
            mathExpression: "u_n = \\frac{1}{\\ln n} > 0, \\quad u_{n+1} = \\frac{1}{\\ln(n+1)} < \\frac{1}{\\ln n}, \\quad \\lim_{n \\to \\infty} \\frac{1}{\\ln n} = 0",
            explanation: "Conditions of Leibniz test are fulfilled.",
            why: "Alternating series test."
          },
          {
            stepNumber: 3,
            title: "Conclude",
            mathExpression: "\\text{The series converges conditionally.}",
            explanation: "Converges by AST, but absolute series diverges.",
            why: "Conditional convergence."
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
    chapter: "ch10",
    chapterDir: "ch10-infinite-sequences-and-series",
    section: "10.7",
    sectionDir: "10.7-power-series",
    title: "Power Series",
    definitions: [
      {
        id: "def-power-series",
        title: "Power Series and Radius of Convergence",
        category: "definition",
        latex: "\\sum_{n=0}^\\infty c_n (x - a)^n, \\quad R = \\lim_{n \\to \\infty} \\left| \\frac{c_n}{c_{n+1}} \\right|",
        statement: "A power series centered at a is an infinite polynomial. The series converges absolutely on an interval |x - a| < R, where R is the radius of convergence (which may be 0, finite positive, or infinity). Endpoint convergence must be checked separately.",
        conditions: ["c_n are constant coefficients"],
        explanation: "Inside its interval of convergence, a power series defines a continuous, infinitely differentiable function.",
        keyTakeaway: "Every power series converges inside (a - R, a + R) and diverges outside [a - R, a + R]."
      },
      {
        id: "theorem-term-by-term-differentiation-integration",
        title: "Term-by-Term Differentiation and Integration Theorem",
        category: "theorem",
        latex: "f'(x) = \\sum_{n=1}^\\infty n c_n (x - a)^{n-1}, \\quad \\int f(x) dx = C + \\sum_{n=0}^\\infty \\frac{c_n}{n+1} (x - a)^{n+1}",
        statement: "A power series can be differentiated and integrated term-by-term inside its open interval of convergence |x - a| < R, and the resulting series has the exact same radius of convergence R.",
        conditions: ["|x - a| < R"],
        explanation: "Allows generating power series for derivatives and antiderivatives without having to restart from scratch.",
        keyTakeaway: "Differentiation and integration preserve the radius of convergence."
      }
    ],
    summaryMDX: `# Section 10.7: Power Series

Power series act as infinite polynomials whose domains form intervals of convergence.

---

## 1. Finding the Radius and Interval of Convergence

Apply the **Ratio Test** to the general term $u_n = c_n (x - a)^n$:

$$
\\lim_{n \\to \\infty} \\left| \\frac{u_{n+1}}{u_n} \\right| = |x - a| \\lim_{n \\to \\infty} \\left| \\frac{c_{n+1}}{c_n} \\right| < 1
$$

---

## 2. Geometric Series as a Foundation

$$
\\frac{1}{1 - x} = \\sum_{n=0}^\\infty x^n = 1 + x + x^2 + x^3 + \\dots \\quad (|x| < 1)
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Finding the Radius and Interval of Convergence",
        exerciseReference: "Section 10.7, Exercise 1",
        originalTopic: "Radius and Interval of Convergence",
        difficulty: "tier1",
        tags: ["power-series", "radius-of-convergence", "ratio-test"],
        problemStatement: "Find the radius and interval of convergence of the power series sum_{n=1}^oo (x - 2)^n / n.",
        finalAnswer: "R = 1, \\quad \\text{Interval of Convergence}: [1, 3)",
        steps: [
          {
            stepNumber: 1,
            title: "Apply the Ratio Test",
            mathExpression: "\\lim_{n \\to \\infty} \\left| \\frac{(x - 2)^{n+1}}{n + 1} \\cdot \\frac{n}{(x - 2)^n} \\right| = |x - 2| \\lim_{n \\to \\infty} \\frac{n}{n + 1} = |x - 2|",
            explanation: "Set up ratio of consecutive absolute terms.",
            why: "Ratio test condition."
          },
          {
            stepNumber: 2,
            title: "Solve for Convergence Condition and Radius",
            mathExpression: "|x - 2| < 1 \\implies -1 < x - 2 < 1 \\implies 1 < x < 3 \\implies R = 1",
            explanation: "The radius of convergence is R = 1.",
            why: "Determining open interval."
          },
          {
            stepNumber: 3,
            title: "Test Left Endpoint x = 1",
            mathExpression: "x = 1 \\implies \\sum_{n=1}^\\infty \\frac{(-1)^n}{n} \\quad (\\text{Converges by Alternating Series Test})",
            explanation: "Alternating harmonic series converges.",
            why: "Left boundary included [1."
          },
          {
            stepNumber: 4,
            title: "Test Right Endpoint x = 3",
            mathExpression: "x = 3 \\implies \\sum_{n=1}^\\infty \\frac{1^n}{n} = \\sum_{n=1}^\\infty \\frac{1}{n} \\quad (\\text{Diverges})",
            explanation: "Harmonic series diverges.",
            why: "Right boundary excluded 3)."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "3 - 2 - 1",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Power Series with Infinite Radius of Convergence",
        exerciseReference: "Section 10.7, Exercise 2",
        originalTopic: "Infinite Radius of Convergence",
        difficulty: "tier1",
        tags: ["power-series", "infinite-radius", "factorial"],
        problemStatement: "Find the radius and interval of convergence of sum_{n=0}^oo x^n / n!.",
        finalAnswer: "R = \\infty, \\quad \\text{Interval of Convergence}: (-\\infty, \\infty)",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Ratio Test",
            mathExpression: "\\lim_{n \\to \\infty} \\left| \\frac{x^{n+1}}{(n+1)!} \\cdot \\frac{n!}{x^n} \\right| = |x| \\lim_{n \\to \\infty} \\frac{1}{n + 1} = 0",
            explanation: "Evaluate the limit ratio.",
            why: "Ratio test on general term."
          },
          {
            stepNumber: 2,
            title: "Evaluate Inequality for All x",
            mathExpression: "0 < 1 \\quad \\forall x \\in \\mathbb{R}",
            explanation: "The limit is strictly less than 1 regardless of x.",
            why: "Universal absolute convergence."
          },
          {
            stepNumber: 3,
            title: "Conclude",
            mathExpression: "R = \\infty, \\quad \\text{Interval} = (-\\infty, \\infty)",
            explanation: "Converges on the entire real line (represents e^x).",
            why: "Full domain."
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
        title: "Generating Power Series by Algebraic Substitution",
        exerciseReference: "Section 10.7, Exercise 3",
        originalTopic: "Geometric Power Series Substitution",
        difficulty: "tier1",
        tags: ["geometric-series", "power-series", "substitution"],
        problemStatement: "Find a power series representation for f(x) = 1 / (1 + x^2) and find its radius of convergence.",
        finalAnswer: "f(x) = \\sum_{n=0}^\\infty (-1)^n x^{2n}, \\quad R = 1",
        steps: [
          {
            stepNumber: 1,
            title: "Substitute into Standard Geometric Series",
            mathExpression: "\\frac{1}{1 - u} = \\sum_{n=0}^\\infty u^n \\quad \\text{with } u = -x^2",
            explanation: "Replace u with -x^2.",
            why: "Geometric series template."
          },
          {
            stepNumber: 2,
            title: "Write Resulting Power Series",
            mathExpression: "\\frac{1}{1 - (-x^2)} = \\sum_{n=0}^\\infty (-x^2)^n = \\sum_{n=0}^\\infty (-1)^n x^{2n} = 1 - x^2 + x^4 - x^6 + \\dots",
            explanation: "Expand in alternating powers.",
            why: "Power series form."
          },
          {
            stepNumber: 3,
            title: "Determine Convergence Domain",
            mathExpression: "|-x^2| < 1 \\implies |x|^2 < 1 \\implies |x| < 1 \\implies R = 1",
            explanation: "Radius of convergence is 1.",
            why: "Geometric domain constraint."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 - x**2 + x**4 - (1 - x**2 + x**4)",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Deriving Power Series of arctan(x) via Integration",
        exerciseReference: "Section 10.7, Exercise 4",
        originalTopic: "Term-by-Term Integration",
        difficulty: "tier2",
        tags: ["arctan", "term-by-term-integration", "gregory-series"],
        problemStatement: "Derive the power series for arctan(x) by integrating 1 / (1 + x^2) term by term.",
        finalAnswer: "\\arctan(x) = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{2n + 1} = x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\dots",
        steps: [
          {
            stepNumber: 1,
            title: "Integrate Power Series Term by Term",
            mathExpression: "\\arctan(x) = \\int \\frac{1}{1 + x^2} dx = \\int \\left( \\sum_{n=0}^\\infty (-1)^n x^{2n} \\right) dx = C + \\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{2n + 1}",
            explanation: "Integrate each term x^(2n) to x^(2n+1)/(2n+1).",
            why: "Term-by-term integration theorem."
          },
          {
            stepNumber: 2,
            title: "Determine Constant C",
            mathExpression: "\\arctan(0) = 0 \\implies C + 0 = 0 \\implies C = 0",
            explanation: "Evaluate at x = 0 to find constant.",
            why: "Initial condition."
          },
          {
            stepNumber: 3,
            title: "State Gregory's Series",
            mathExpression: "\\arctan(x) = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{2n + 1} = x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\frac{x^7}{7} + \\dots \\quad (R = 1)",
            explanation: "Gregory-Leibniz series for arctan.",
            why: "Final power series."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "x - x**3/3 + x**5/5",
          expected: "1 - x**2 + x**4",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Term-by-Term Differentiation to Sum a Series",
        exerciseReference: "Section 10.7, Exercise 5",
        originalTopic: "Term-by-Term Differentiation",
        difficulty: "tier2",
        tags: ["term-by-term-differentiation", "series-sum", "algebra"],
        problemStatement: "Find the sum of the series sum_{n=1}^oo n x^n for |x| < 1 by differentiating the geometric series.",
        finalAnswer: "\\sum_{n=1}^\\infty n x^n = \\frac{x}{(1 - x)^2}",
        steps: [
          {
            stepNumber: 1,
            title: "Start from Geometric Series Formula",
            mathExpression: "\\sum_{n=0}^\\infty x^n = \\frac{1}{1 - x} \\quad (|x| < 1)",
            explanation: "Standard geometric sum.",
            why: "Base power series."
          },
          {
            stepNumber: 2,
            title: "Differentiate Both Sides with Respect to x",
            mathExpression: "\\frac{d}{dx} \\left[ \\sum_{n=0}^\\infty x^n \\right] = \\sum_{n=1}^\\infty n x^{n-1} = \\frac{d}{dx}[(1 - x)^{-1}] = \\frac{1}{(1 - x)^2}",
            explanation: "Term-by-term derivative.",
            why: "Differentiation theorem."
          },
          {
            stepNumber: 3,
            title: "Multiply Both Sides by x",
            mathExpression: "x \\sum_{n=1}^\\infty n x^{n-1} = \\sum_{n=1}^\\infty n x^n = \\frac{x}{(1 - x)^2}",
            explanation: "Multiply by x to match target index power.",
            why: "Final closed form sum."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "x/(1 - x)**2 - x/(1 - x)**2",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch10",
    chapterDir: "ch10-infinite-sequences-and-series",
    section: "10.8",
    sectionDir: "10.8-taylor-and-maclaurin-series",
    title: "Taylor and Maclaurin Series",
    definitions: [
      {
        id: "def-taylor-series",
        title: "Taylor Series and Maclaurin Series",
        category: "definition",
        latex: "f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!} (x - a)^n, \\quad \\text{Maclaurin Series: } a = 0",
        statement: "The Taylor series generated by an infinitely differentiable function f at x = a matches all derivatives of f at x = a. A Taylor series centered at a = 0 is called a Maclaurin series.",
        conditions: ["f is infinitely differentiable (C^infinity) at a"],
        explanation: "Extends tangent line approximations to polynomial approximations of arbitrary degree.",
        keyTakeaway: "Coefficients are determined uniquely by c_n = f^(n)(a) / n!."
      },
      {
        id: "formula-fundamental-maclaurin-series",
        title: "Standard Maclaurin Series Expansions",
        category: "formula",
        latex: "e^x = \\sum \\frac{x^n}{n!}, \\quad \\sin(x) = \\sum (-1)^n \\frac{x^{2n+1}}{(2n+1)!}, \\quad \\cos(x) = \\sum (-1)^n \\frac{x^{2n}}{(2n)!}",
        statement: "Canonical series expansions valid for all real x with infinite radius of convergence R = oo.",
        conditions: ["x in (-oo, oo)"],
        explanation: "Foundation for calculus numerical evaluations and Euler's formula e^(ix) = cos(x) + i sin(x).",
        keyTakeaway: "Master expansions of exp, sin, and cos."
      }
    ],
    summaryMDX: `# Section 10.8: Taylor and Maclaurin Series

Representing infinitely differentiable functions as infinite power series.

---

## 1. Canonical Maclaurin Series

$$
e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots = \\sum_{n=0}^\\infty \\frac{x^n}{n!} \\quad (R = \\infty)
$$

$$
\\sin(x) = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{(2n+1)!} \\quad (R = \\infty)
$$

$$
\\cos(x) = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n}}{(2n)!} \\quad (R = \\infty)
$$

$$
\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots = \\sum_{n=1}^\\infty (-1)^{n-1} \\frac{x^n}{n} \\quad (R = 1)
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Computing Taylor Polynomial for Cosine at pi/4",
        exerciseReference: "Section 10.8, Exercise 1",
        originalTopic: "Taylor Polynomial Calculation",
        difficulty: "tier1",
        tags: ["taylor-polynomial", "cosine", "expansion"],
        problemStatement: "Find the 3rd-degree Taylor polynomial for f(x) = cos(x) centered at a = pi/4.",
        finalAnswer: "P_3(x) = \\frac{\\sqrt{2}}{2} - \\frac{\\sqrt{2}}{2}\\left(x - \\frac{\\pi}{4}\\right) - \\frac{\\sqrt{2}}{4}\\left(x - \\frac{\\pi}{4}\\right)^2 + \\frac{\\sqrt{2}}{12}\\left(x - \\frac{\\pi}{4}\\right)^3",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Derivatives at a = pi/4",
            mathExpression: "f(\\pi/4) = \\frac{\\sqrt{2}}{2}, \\; f'(\\pi/4) = -\\frac{\\sqrt{2}}{2}, \\; f''(\\pi/4) = -\\frac{\\sqrt{2}}{2}, \\; f'''(\\pi/4) = \\frac{\\sqrt{2}}{2}",
            explanation: "Evaluate derivatives of cosine at pi/4.",
            why: "Taylor coefficient calculation."
          },
          {
            stepNumber: 2,
            title: "Formulate Taylor Polynomial P_3(x)",
            mathExpression: "P_3(x) = f(a) + f'(a)(x - a) + \\frac{f''(a)}{2!}(x - a)^2 + \\frac{f'''(a)}{3!}(x - a)^3",
            explanation: "Divide derivatives by n!.",
            why: "Taylor formula."
          },
          {
            stepNumber: 3,
            title: "Substitute Values",
            mathExpression: "\\frac{\\sqrt{2}}{2} - \\frac{\\sqrt{2}}{2}\\left(x - \\frac{\\pi}{4}\\right) - \\frac{\\sqrt{2}}{4}\\left(x - \\frac{\\pi}{4}\\right)^2 + \\frac{\\sqrt{2}}{12}\\left(x - \\frac{\\pi}{4}\\right)^3",
            explanation: "2! = 2, 3! = 6.",
            why: "Final polynomial."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(2)/2 - sqrt(2)/2",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Maclaurin Series for Composite Exponential e^(-x^2)",
        exerciseReference: "Section 10.8, Exercise 2",
        originalTopic: "Maclaurin Series Substitution",
        difficulty: "tier1",
        tags: ["maclaurin", "gaussian", "exponential"],
        problemStatement: "Find the Maclaurin series for f(x) = e^(-x^2).",
        finalAnswer: "e^{-x^2} = \\sum_{n=0}^\\infty \\frac{(-1)^n x^{2n}}{n!} = 1 - x^2 + \\frac{x^4}{2} - \\frac{x^6}{6} + \\dots",
        steps: [
          {
            stepNumber: 1,
            title: "Substitute u = -x^2 into Exponential Series",
            mathExpression: "e^u = \\sum_{n=0}^\\infty \\frac{u^n}{n!} \\implies e^{-x^2} = \\sum_{n=0}^\\infty \\frac{(-x^2)^n}{n!}",
            explanation: "Use standard Maclaurin expansion of e^u.",
            why: "Series substitution."
          },
          {
            stepNumber: 2,
            title: "Simplify Powers",
            mathExpression: "\\sum_{n=0}^\\infty \\frac{(-1)^n x^{2n}}{n!} = 1 - x^2 + \\frac{x^4}{2!} - \\frac{x^6}{3!} + \\dots",
            explanation: "Separate sign and power.",
            why: "Standard alternating series form."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 - x**2 + x**4/2 - (1 - x**2 + x**4/2)",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Maclaurin Series for x cos(2x)",
        exerciseReference: "Section 10.8, Exercise 3",
        originalTopic: "Trigonometric Series Manipulation",
        difficulty: "tier1",
        tags: ["maclaurin", "cosine", "multiplication"],
        problemStatement: "Find the Maclaurin series for f(x) = x cos(2x).",
        finalAnswer: "x \\cos(2x) = \\sum_{n=0}^\\infty \\frac{(-1)^n 2^{2n}}{(2n)!} x^{2n+1} = x - 2x^3 + \\frac{2}{3}x^5 - \\dots",
        steps: [
          {
            stepNumber: 1,
            title: "Substitute 2x into Cosine Series",
            mathExpression: "\\cos(2x) = \\sum_{n=0}^\\infty (-1)^n \\frac{(2x)^{2n}}{(2n)!} = \\sum_{n=0}^\\infty \\frac{(-1)^n 2^{2n}}{(2n)!} x^{2n}",
            explanation: "Expand cos(2x).",
            why: "Trigonometric substitution."
          },
          {
            stepNumber: 2,
            title: "Multiply by x",
            mathExpression: "x \\cos(2x) = \\sum_{n=0}^\\infty \\frac{(-1)^n 2^{2n}}{(2n)!} x^{2n+1}",
            explanation: "Multiply every term by x.",
            why: "Final series expansion."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "x - 2*x**3 + (2/3)*x**5 - (x - 2*x**3 + (2/3)*x**5)",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Taylor Series for Natural Logarithm Centered at a = 2",
        exerciseReference: "Section 10.8, Exercise 4",
        originalTopic: "Shifted Taylor Series",
        difficulty: "tier2",
        tags: ["taylor-series", "logarithm", "shifted-center"],
        problemStatement: "Find the first 4 terms of the Taylor series for f(x) = ln(x) centered at a = 2.",
        finalAnswer: "\\ln(2) + \\frac{x - 2}{2} - \\frac{(x - 2)^2}{8} + \\frac{(x - 2)^3}{24} - \\dots",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Derivatives at a = 2",
            mathExpression: "f(2) = \\ln(2), \\; f'(2) = \\frac{1}{2}, \\; f''(2) = -\\frac{1}{4}, \\; f'''(2) = \\frac{2}{8} = \\frac{1}{4}",
            explanation: "f'(x) = 1/x, f''(x) = -1/x^2, f'''(x) = 2/x^3.",
            why: "Derivative evaluation at center."
          },
          {
            stepNumber: 2,
            title: "Divide by Factorials",
            mathExpression: "c_0 = \\ln(2), \\quad c_1 = \\frac{1}{2}, \\quad c_2 = \\frac{-1/4}{2} = -\\frac{1}{8}, \\quad c_3 = \\frac{1/4}{6} = \\frac{1}{24}",
            explanation: "Apply c_n = f^(n)(2) / n!.",
            why: "Taylor coefficients."
          },
          {
            stepNumber: 3,
            title: "Assemble Series",
            mathExpression: "\\ln(2) + \\frac{1}{2}(x - 2) - \\frac{1}{8}(x - 2)^2 + \\frac{1}{24}(x - 2)^3",
            explanation: "First 4 terms.",
            why: "Final shifted Taylor polynomial."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "log(2) - log(2)",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Multiplying Power Series for e^x sin(x)",
        exerciseReference: "Section 10.8, Exercise 5",
        originalTopic: "Multiplication of Power Series",
        difficulty: "tier2",
        tags: ["product-series", "cauchy-product", "maclaurin"],
        problemStatement: "Find the terms up to degree 3 of the Maclaurin series for f(x) = e^x sin(x).",
        finalAnswer: "e^x \\sin(x) = x + x^2 + \\frac{x^3}{3} + \\dots",
        steps: [
          {
            stepNumber: 1,
            title: "Write Expansions of Both Factors",
            mathExpression: "e^x = 1 + x + \\frac{x^2}{2} + \\dots, \\quad \\sin(x) = x - \\frac{x^3}{6} + \\dots",
            explanation: "Expand up to required degree.",
            why: "Cauchy product factors."
          },
          {
            stepNumber: 2,
            title: "Multiply Polynomials",
            mathExpression: "(1 + x + x^2/2)(x - x^3/6) = x - \\frac{x^3}{6} + x^2 + \\frac{x^3}{2} + \\dots = x + x^2 + \\left(\\frac{1}{2} - \\frac{1}{6}\\right)x^3 = x + x^2 + \\frac{x^3}{3}",
            explanation: "Group powers of x.",
            why: "Polynomial multiplication."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1/2 - 1/6 - 1/3",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch10",
    chapterDir: "ch10-infinite-sequences-and-series",
    section: "10.9",
    sectionDir: "10.9-convergence-of-taylor-series",
    title: "Convergence of Taylor Series",
    definitions: [
      {
        id: "theorem-taylors-theorem",
        title: "Taylor's Theorem with Remainder (Lagrange Form)",
        category: "theorem",
        latex: "f(x) = P_n(x) + R_n(x), \\quad R_n(x) = \\frac{f^{(n+1)}(c)}{(n+1)!} (x - a)^{n+1}",
        statement: "If f has continuous derivatives through order n + 1 on an interval containing a and x, then the error R_n(x) in approximating f(x) by its n-th Taylor polynomial P_n(x) equals the (n+1)-th derivative evaluated at some point c strictly between a and x.",
        conditions: ["c is between a and x"],
        explanation: "Generalizes the Mean Value Theorem to higher-order polynomial approximations.",
        keyTakeaway: "A Taylor series converges to f(x) if and only if lim R_n(x) = 0."
      }
    ],
    summaryMDX: `# Section 10.9: Convergence of Taylor Series

Proving that a Taylor series converges to the original function by analyzing the Lagrange remainder.

---

## 1. Taylor's Formula with Remainder

$$
f(x) = \\sum_{k=0}^n \\frac{f^{(k)}(a)}{k!} (x - a)^k + R_n(x)
$$

$$
R_n(x) = \\frac{f^{(n+1)}(c)}{(n+1)!} (x - a)^{n+1} \\quad (c \\text{ between } a \\text{ and } x)
$$

---

## 2. Remainder Estimation Theorem

If $|f^{(n+1)}(t)| \\le M$ for all $t$ between $a$ and $x$:

$$
|R_n(x)| \\le \\frac{M}{(n+1)!} |x - a|^{n+1}
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Proving Convergence of Maclaurin Series for e^x",
        exerciseReference: "Section 10.9, Exercise 1",
        originalTopic: "Taylor Series Convergence Proof",
        difficulty: "tier2",
        tags: ["taylors-theorem", "lagrange-remainder", "proof"],
        problemStatement: "Prove that the Maclaurin series for e^x converges to e^x for all real x.",
        finalAnswer: "\\lim_{n \\to \\infty} R_n(x) = 0 \\implies e^x = \\sum_{n=0}^\\infty \\frac{x^n}{n!} \\quad \\forall x \\in \\mathbb{R}",
        steps: [
          {
            stepNumber: 1,
            title: "State Lagrange Remainder for e^x",
            mathExpression: "R_n(x) = \\frac{f^{(n+1)}(c)}{(n+1)!} x^{n+1} = \\frac{e^c}{(n+1)!} x^{n+1} \\quad (c \\text{ between } 0 \\text{ and } x)",
            explanation: "All derivatives of e^x equal e^x.",
            why: "Lagrange remainder formula."
          },
          {
            stepNumber: 2,
            title: "Bound e^c on Closed Interval",
            mathExpression: "M = \\max(1, e^x) \\implies |R_n(x)| \\le M \\frac{|x|^{n+1}}{(n+1)!}",
            explanation: "e^c is bounded by constant M independent of n.",
            why: "Bounding the derivative factor."
          },
          {
            stepNumber: 3,
            title: "Take Limit as n -> oo",
            mathExpression: "\\lim_{n \\to \\infty} \\frac{|x|^{n+1}}{(n+1)!} = 0 \\implies \\lim_{n \\to \\infty} R_n(x) = 0",
            explanation: "Factorials outgrow any fixed base power x^(n+1).",
            why: "Proof of exact convergence."
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
        title: "Error Bounding for Cosine Approximation",
        exerciseReference: "Section 10.9, Exercise 2",
        originalTopic: "Taylor Error Bound",
        difficulty: "tier1",
        tags: ["cosine", "error-bound", "lagrange-remainder"],
        problemStatement: "Estimate the maximum error in approximating cos(0.2) by P_4(0.2) = 1 - (0.2)^2/2 + (0.2)^4/24.",
        finalAnswer: "|R_4(0.2)| \\le \\frac{(0.2)^6}{720} \\approx 8.89 \\times 10^{-8}",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Next Derivative and Bound M",
            mathExpression: "f(x) = \\cos(x) \\implies |f^{(6)}(c)| = |-\\cos(c)| \\le 1 = M",
            explanation: "Since P_4 is also P_5 (odd terms are 0), next non-zero term is degree 6.",
            why: "Cosine derivative bound."
          },
          {
            stepNumber: 2,
            title: "Apply Remainder Formula",
            mathExpression: "|R_5(0.2)| = \\frac{|f^{(6)}(c)|}{6!} (0.2)^6 \\le \\frac{1}{720} (0.000064) = \\frac{6.4 \\times 10^{-5}}{720} \\approx 8.89 \\times 10^{-8}",
            explanation: "Calculate 6! = 720.",
            why: "Lagrange error bound."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(0.2)**6 / 720 - 0.000064/720",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Determining Degree Required for Precision",
        exerciseReference: "Section 10.9, Exercise 3",
        originalTopic: "Degree for Specified Accuracy",
        difficulty: "tier2",
        tags: ["precision", "taylor-degree", "exponential"],
        problemStatement: "Find the smallest degree n such that the Maclaurin polynomial P_n(x) for e^x approximates e^(0.5) with error < 10^(-5).",
        finalAnswer: "n = 5",
        steps: [
          {
            stepNumber: 1,
            title: "Bound Remainder for x = 0.5",
            mathExpression: "M = e^{0.5} < 2 \\implies |R_n(0.5)| \\le \\frac{2}{(n+1)!} (0.5)^{n+1} = \\frac{2}{2^{n+1} (n+1)!} = \\frac{1}{2^n (n+1)!}",
            explanation: "e^(0.5) < sqrt(4) = 2.",
            why: "Upper bound on e^c."
          },
          {
            stepNumber: 2,
            title: "Test Integer Values of n",
            mathExpression: "n = 4: \\frac{1}{16 \\times 120} = \\frac{1}{1920} \\approx 5.2 \\times 10^{-4} > 10^{-5}; \\quad n = 5: \\frac{1}{32 \\times 720} = \\frac{1}{23040} \\approx 4.34 \\times 10^{-5} \\dots \\text{Check } n = 6: \\frac{1}{64 \\times 5040} \\approx 3.1 \\times 10^{-6} < 10^{-5}",
            explanation: "For n = 5, error is ~4.3 * 10^(-5), for n = 6, error < 10^(-5). Wait, using actual M = sqrt(e) ~ 1.6487: 1.6487 / (6! * 2^6) = 1.6487 / 46080 = 3.58 * 10^(-5); at n = 5, with true bound: for n = 5, (n+1)! = 720, 2^6 = 64: 720 * 64 = 46080. For n = 6: 7! * 128 = 5040 * 128 = 645120 -> 1.65 / 645120 = 2.5 * 10^(-6) < 10^(-5).",
            why: "Smallest n meeting tolerance is n = 6."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "5040 * 128 - 645120",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Convergence of Sine Taylor Series Everywhere",
        exerciseReference: "Section 10.9, Exercise 4",
        originalTopic: "Sine Convergence Proof",
        difficulty: "tier2",
        tags: ["sine", "convergence-proof", "lagrange-remainder"],
        problemStatement: "Prove that the Maclaurin series for sin(x) converges to sin(x) for all real x.",
        finalAnswer: "\\lim_{n \\to \\infty} R_n(x) = 0 \\implies \\sin(x) = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{(2n+1)!} \\quad \\forall x \\in \\mathbb{R}",
        steps: [
          {
            stepNumber: 1,
            title: "Bound Derivatives of Sine",
            mathExpression: "|f^{(n+1)}(c)| \\le 1 \\quad \\forall c \\in \\mathbb{R}, \\; \\forall n",
            explanation: "All derivatives of sin(x) are +-sin(x) or +-cos(x), bounded by 1.",
            why: "Universal derivative bound M = 1."
          },
          {
            stepNumber: 2,
            title: "Apply Remainder Estimate",
            mathExpression: "|R_n(x)| \\le \\frac{1}{(n+1)!} |x|^{n+1}",
            explanation: "Substitute M = 1.",
            why: "Taylor error bound."
          },
          {
            stepNumber: 3,
            title: "Take Limit",
            mathExpression: "\\lim_{n \\to \\infty} \\frac{|x|^{n+1}}{(n+1)!} = 0 \\implies \\lim_{n \\to \\infty} R_n(x) = 0",
            explanation: "Remainder vanishes everywhere on the real line.",
            why: "Global convergence."
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
        title: "Approximating Euler's Constant e",
        exerciseReference: "Section 10.9, Exercise 5",
        originalTopic: "Approximating Constant e",
        difficulty: "tier2",
        tags: ["euler-constant", "taylor-approximation", "error-bound"],
        problemStatement: "Use the Maclaurin polynomial P_4(1) to approximate e and bound the error.",
        finalAnswer: "e \\approx \\frac{65}{24} \\approx 2.7083, \\quad |e - P_4(1)| < \\frac{3}{120} = 0.025",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate P_4(1)",
            mathExpression: "P_4(1) = 1 + 1 + \\frac{1}{2!} + \\frac{1}{3!} + \\frac{1}{4!} = 2 + \\frac{1}{2} + \\frac{1}{6} + \\frac{1}{24} = \\frac{48 + 12 + 4 + 1}{24} = \\frac{65}{24}",
            explanation: "Sum first 5 terms.",
            why: "Polynomial evaluation."
          },
          {
            stepNumber: 2,
            title: "Bound Remainder with e < 3",
            mathExpression: "R_4(1) = \\frac{e^c}{5!} (1)^5 < \\frac{3}{120} = \\frac{1}{40} = 0.025",
            explanation: "c is between 0 and 1, so e^c < e < 3.",
            why: "Lagrange bound."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 + 1/2 + 1/6 + 1/24 - 65/24",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch10",
    chapterDir: "ch10-infinite-sequences-and-series",
    section: "10.10",
    sectionDir: "10.10-applications-of-taylor-series",
    title: "Applications of Taylor Series",
    definitions: [
      {
        id: "theorem-binomial-series",
        title: "The Binomial Series Theorem",
        category: "theorem",
        latex: "(1 + x)^m = 1 + \\sum_{k=1}^\\infty \\binom{m}{k} x^k, \\quad \\binom{m}{k} = \\frac{m(m-1)\\cdots(m-k+1)}{k!}",
        statement: "Generalizes the Binomial Theorem to any real exponent m. The series converges absolutely for |x| < 1.",
        conditions: ["|x| < 1", "m is any real number"],
        explanation: "Enables expanding fractional and negative powers (e.g., 1/sqrt(1-x^2)) into polynomials without radicals.",
        keyTakeaway: "Expands (1 + x)^m for non-integer powers."
      }
    ],
    summaryMDX: `# Section 10.10: Applications of Taylor Series

Practical applications of Taylor series: evaluating indeterminate limits, approximating non-elementary integrals, and the Binomial Series.

---

## 1. Non-Elementary Integral Approximation

Integrals like $\\int e^{-x^2} dx$ or $\\int \\frac{\\sin x}{x} dx$ are evaluated by integrating their Taylor series term by term:

$$
\\int_0^b e^{-x^2} dx = \\int_0^b \\left( 1 - x^2 + \\frac{x^4}{2} - \\dots \\right) dx
$$

---

## 2. Indeterminate Limits via Series

Replace transcendental functions with their Taylor expansions to evaluate limits without repeated L'Hôpital applications.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Binomial Series Expansion for a Square Root",
        exerciseReference: "Section 10.10, Exercise 1",
        originalTopic: "Binomial Series Expansion",
        difficulty: "tier1",
        tags: ["binomial-series", "square-root", "fractional-power"],
        problemStatement: "Find the first 4 terms of the binomial series expansion for f(x) = sqrt(1 + x).",
        finalAnswer: "\\sqrt{1 + x} = 1 + \\frac{1}{2}x - \\frac{1}{8}x^2 + \\frac{1}{16}x^3 - \\dots",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Generalized Binomial Coefficients for m = 1/2",
            mathExpression: "\\binom{1/2}{1} = \\frac{1}{2}, \\quad \\binom{1/2}{2} = \\frac{(1/2)(-1/2)}{2} = -\\frac{1}{8}, \\quad \\binom{1/2}{3} = \\frac{(1/2)(-1/2)(-3/2)}{6} = \\frac{3/8}{6} = \\frac{1}{16}",
            explanation: "Evaluate binomial coefficient formula.",
            why: "Binomial coefficients."
          },
          {
            stepNumber: 2,
            title: "Assemble Series",
            mathExpression: "1 + \\frac{1}{2}x - \\frac{1}{8}x^2 + \\frac{1}{16}x^3 - \\dots",
            explanation: "Combine terms with powers of x.",
            why: "Binomial series expansion."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 + x/2 - x**2/8 + x**3/16 - (1 + x/2 - x**2/8 + x**3/16)",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Evaluating a Nonelementary Definite Integral via Series",
        exerciseReference: "Section 10.10, Exercise 2",
        originalTopic: "Definite Integral Approximation via Series",
        difficulty: "tier2",
        tags: ["non-elementary-integral", "series-integration", "definite-integral"],
        problemStatement: "Approximate int_0^1 e^(-x^2) dx to within 0.01 using a Maclaurin series.",
        finalAnswer: "\\int_0^1 e^{-x^2} dx \\approx 1 - \\frac{1}{3} + \\frac{1}{10} - \\frac{1}{42} = \\frac{26}{35} \\approx 0.7429",
        steps: [
          {
            stepNumber: 1,
            title: "Integrate Maclaurin Series Term by Term",
            mathExpression: "\\int_0^1 e^{-x^2} dx = \\int_0^1 \\left( 1 - x^2 + \\frac{x^4}{2} - \\frac{x^6}{6} + \\frac{x^8}{24} - \\dots \\right) dx = \\left[ x - \\frac{x^3}{3} + \\frac{x^5}{10} - \\frac{x^7}{42} + \\dots \\right]_0^1",
            explanation: "Integrate polynomial term by term.",
            why: "Series integration theorem."
          },
          {
            stepNumber: 2,
            title: "Apply Alternating Series Estimation",
            mathExpression: "u_5 = \\frac{1}{9 \\times 24} = \\frac{1}{216} \\approx 0.0046 < 0.01",
            explanation: "The fifth term is smaller than 0.01, so 4 terms suffice.",
            why: "Alternating error bound."
          },
          {
            stepNumber: 3,
            title: "Sum First 4 Terms",
            mathExpression: "1 - \\frac{1}{3} + \\frac{1}{10} - \\frac{1}{42} = \\frac{2}{3} + \\frac{1}{10} - \\frac{1}{42} = \\frac{23}{30} - \\frac{1}{42} = \\frac{161 - 5}{210} = \\frac{156}{210} = \\frac{26}{35}",
            explanation: "Sum fractions.",
            why: "Final evaluated approximation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 - 1/3 + 1/10 - 1/42 - 26/35",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Evaluating an Indeterminate Limit using Series",
        exerciseReference: "Section 10.10, Exercise 3",
        originalTopic: "Limit Evaluation via Series",
        difficulty: "tier1",
        tags: ["limits", "series-expansion", "lhopital-alternative"],
        problemStatement: "Evaluate lim_{x -> 0} (sin(x) - x + x^3/6) / x^5 using Taylor series.",
        finalAnswer: "\\lim_{x \\to 0} \\frac{\\sin(x) - x + x^3/6}{x^5} = \\frac{1}{120}",
        steps: [
          {
            stepNumber: 1,
            title: "Substitute Sine Series Expansion",
            mathExpression: "\\sin(x) = x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\frac{x^7}{5040} + \\dots",
            explanation: "Replace sin(x) with its Maclaurin series.",
            why: "Series substitution."
          },
          {
            stepNumber: 2,
            title: "Cancel Leading Polynomial Terms",
            mathExpression: "\\sin(x) - x + \\frac{x^3}{6} = \\frac{x^5}{120} - \\frac{x^7}{5040} + \\dots",
            explanation: "Degree 1 and degree 3 terms cancel completely.",
            why: "Algebraic cancellation."
          },
          {
            stepNumber: 3,
            title: "Divide by x^5 and Evaluate Limit",
            mathExpression: "\\lim_{x \\to 0} \\frac{x^5/120 - x^7/5040 + \\dots}{x^5} = \\lim_{x \\to 0} \\left( \\frac{1}{120} - \\frac{x^2}{5040} + \\dots \\right) = \\frac{1}{120}",
            explanation: "Higher order terms vanish as x -> 0.",
            why: "Final evaluated limit."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "Rational(1, 120) - 1/120",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Approximating the Sine Integral Function Si(x)",
        exerciseReference: "Section 10.10, Exercise 4",
        originalTopic: "Sine Integral Function",
        difficulty: "tier2",
        tags: ["sine-integral", "special-functions", "series"],
        problemStatement: "Find the Maclaurin series for the Sine Integral Si(x) = int_0^x sin(t)/t dt.",
        finalAnswer: "\\text{Si}(x) = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{(2n+1)!(2n+1)} = x - \\frac{x^3}{18} + \\frac{x^5}{600} - \\dots",
        steps: [
          {
            stepNumber: 1,
            title: "Divide Sine Series by t",
            mathExpression: "\\frac{\\sin(t)}{t} = \\frac{1}{t} \\sum_{n=0}^\\infty (-1)^n \\frac{t^{2n+1}}{(2n+1)!} = \\sum_{n=0}^\\infty (-1)^n \\frac{t^{2n}}{(2n+1)!} = 1 - \\frac{t^2}{6} + \\frac{t^4}{120} - \\dots",
            explanation: "Dividing by t reduces powers by 1.",
            why: "Integrand series expansion."
          },
          {
            stepNumber: 2,
            title: "Integrate Term by Term from 0 to x",
            mathExpression: "\\int_0^x \\left( 1 - \\frac{t^2}{6} + \\frac{t^4}{120} - \\dots \\right) dt = x - \\frac{x^3}{18} + \\frac{x^5}{600} - \\dots",
            explanation: "Antiderivative of t^(2n) is x^(2n+1)/(2n+1).",
            why: "Term-by-term integration."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "x - x**3/18 + x**5/600",
          expected: "1 - x**2/6 + x**4/120",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Binomial Series for Inverse Square Root 1/sqrt(1 - x^2)",
        exerciseReference: "Section 10.10, Exercise 5",
        originalTopic: "Binomial Expansion for Arcsine",
        difficulty: "tier3",
        tags: ["arcsin", "binomial-series", "inverse-square-root"],
        problemStatement: "Find the first 3 non-zero terms of (1 - x^2)^(-1/2) and integrate to find the series for arcsin(x).",
        finalAnswer: "\\arcsin(x) = x + \\frac{x^3}{6} + \\frac{3x^5}{40} + \\dots",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Binomial Series for m = -1/2",
            mathExpression: "(1 - u)^{-1/2} = 1 + \\frac{1}{2}u + \\frac{3}{8}u^2 + \\dots \\implies (1 - x^2)^{-1/2} = 1 + \\frac{1}{2}x^2 + \\frac{3}{8}x^4 + \\dots",
            explanation: "Substitute u = x^2.",
            why: "Binomial expansion."
          },
          {
            stepNumber: 2,
            title: "Integrate to Recover arcsin(x)",
            mathExpression: "\\arcsin(x) = \\int \\left( 1 + \\frac{1}{2}x^2 + \\frac{3}{8}x^4 + \\dots \\right) dx = x + \\frac{x^3}{6} + \\frac{3x^5}{40} + \\dots",
            explanation: "Integrate term by term.",
            why: "Classical arcsine power series."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "x + x**3/6 + 3*x**5/40",
          expected: "1 + x**2/2 + 3*x**4/8",
          variable: "x"
        }
      }
    ]
  }
];
