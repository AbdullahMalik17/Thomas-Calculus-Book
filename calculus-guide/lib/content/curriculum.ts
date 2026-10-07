// lib/content/curriculum.ts
/**
 * Authoritative curriculum metadata and navigation helpers for Thomas' Calculus (14th Edition).
 * Authored by: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

export interface SectionItem {
  id: string;
  number: string;
  title: string;
  description: string;
  status: string;
  badgeVariant: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'secondary';
  practiceCount: number;
  mcqCount: number;
  solutionsCount: number;
}

export interface ChapterMetadata {
  num: number;
  key: string;
  title: string;
  description: string;
  theoremHeader: string;
  theoremIntro: string;
  leftTheoremTitle: string;
  leftTheoremMath: string;
  rightTheoremTitle: string;
  rightTheoremMath: string;
  sections: SectionItem[];
}

export interface FlattenedSection extends SectionItem {
  chapterKey: string;
  chapterNum: number;
  chapterTitle: string;
  href: string;
  solutionsHref: string;
}

export function normalizeChapterKey(ch: string): string {
  if (!ch) return 'ch01';
  const clean = ch.trim().toLowerCase();
  // Match forms like "ch1", "ch01", "1", "01", "chapter-1", "chapter 1", "ch01-functions", etc.
  const match = clean.match(/^(?:chapter[-_\s]*)?(?:ch)?0*(\d+)(?:[-_\s].*)?$/i);
  if (match && match[1]) {
    const num = parseInt(match[1], 10);
    if (!isNaN(num) && num >= 1 && num <= 99) {
      return `ch${String(num).padStart(2, '0')}`;
    }
  }
  return clean;
}

export const CHAPTER_METADATA: Record<string, ChapterMetadata> = {
  ch01: {
    num: 1,
    key: 'ch01',
    title: 'Chapter 1: Functions',
    description:
      "Functions are the fundamental building blocks of calculus. This chapter examines their graphs, natural domains, ranges, symmetries, and algebraic combinations with SymPy-verified mathematical standards.",
    theoremHeader: "Mathematical Theorem • Symmetry Criterion",
    theoremIntro:
      "A function f has even symmetry (reflection across y-axis) or odd symmetry (180° rotational origin symmetry) if and only if:",
    leftTheoremTitle: "Even Function (y-axis reflection)",
    leftTheoremMath: "f(-x) = f(x)",
    rightTheoremTitle: "Odd Function (Origin symmetry)",
    rightTheoremMath: "f(-x) = -f(x)",
    sections: [
      {
        id: '1.1-functions-and-graphs',
        number: '1.1',
        title: 'Functions and Their Graphs',
        description: 'Definitions, domain, range, piecewise functions, vertical line test, even and odd symmetry.',
        status: 'Golden Example (Verified)',
        badgeVariant: 'success',
        practiceCount: 8,
        mcqCount: 8,
        solutionsCount: 8,
      },
      {
        id: '1.2-combining-functions-shifting-scaling',
        number: '1.2',
        title: 'Combining Functions; Shifting and Scaling Graphs',
        description: 'Algebra of functions, composition, horizontal and vertical shifts, scaling, reflection.',
        status: 'Verified Solutions',
        badgeVariant: 'primary',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 10,
      },
      {
        id: '1.3-trigonometric-functions',
        number: '1.3',
        title: 'Trigonometric Functions',
        description: 'Radian measure, circular functions, trigonometric identities, periodicity, transformations.',
        status: 'Verified Solutions',
        badgeVariant: 'primary',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 10,
      },
      {
        id: '1.4-graphing-with-software',
        number: '1.4',
        title: 'Graphing with Software',
        description: 'Viewing windows, graphing technology, parametric equations, graph artifacts, software pitfalls.',
        status: 'Verified Solutions',
        badgeVariant: 'primary',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 10,
      },
    ],
  },
  ch02: {
    num: 2,
    key: 'ch02',
    title: 'Chapter 2: Limits and Continuity',
    description:
      "The foundational theory of limits and continuity, providing the rigorous analytical framework for rates of change, tangent slopes, and calculus analysis.",
    theoremHeader: "Mathematical Theorem • Limit & Continuity Principles",
    theoremIntro:
      "The two-sided limit exists if and only if one-sided limits coincide, and continuity connects limits to evaluation:",
    leftTheoremTitle: "Two-Sided Limit Existence",
    leftTheoremMath: "\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^+} f(x) = \\lim_{x \\to c^-} f(x) = L",
    rightTheoremTitle: "Continuity at a Point",
    rightTheoremMath: "\\lim_{x \\to c} f(x) = f(c)",
    sections: [
      {
        id: '2.1-rates-of-change-and-tangents-to-curves',
        number: '2.1',
        title: 'Rates of Change and Tangents to Curves',
        description: 'Average rates of change, secant lines, instantaneous rate of change, curve slopes.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '2.2-limit-of-a-function-and-limit-laws',
        number: '2.2',
        title: 'Limit of a Function and Limit Laws',
        description: 'Informal limit definition, limit laws, factoring 0/0 forms, conjugate rationalization, Sandwich Theorem.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '2.3-the-precise-definition-of-a-limit',
        number: '2.3',
        title: 'The Precise Definition of a Limit',
        description: 'Rigorous epsilon-delta definition, finding delta for linear and quadratic functions, formal proofs.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '2.4-one-sided-limits',
        number: '2.4',
        title: 'One-Sided Limits',
        description: 'Right-hand and left-hand limits, absolute values, floor function, fundamental trigonometric limits.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '2.5-continuity',
        number: '2.5',
        title: 'Continuity',
        description: 'Three continuity conditions, classifications of discontinuities, composite continuity, Intermediate Value Theorem.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '2.6-limits-involving-infinity-asymptotes-of-graphs',
        number: '2.6',
        title: 'Limits Involving Infinity; Asymptotes of Graphs',
        description: 'Horizontal and vertical asymptotes, limits at infinity, oblique asymptotes via polynomial division.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
    ],
  },
  ch03: {
    num: 3,
    key: 'ch03',
    title: 'Chapter 3: Derivatives',
    description:
      "The differential calculus engine: limit definition of derivatives, differentiation rules (power, product, quotient, chain rule), implicit differentiation, related rates, and linear approximations.",
    theoremHeader: "Mathematical Theorem • Differential Calculus Foundations",
    theoremIntro:
      "Differentiation rules enable systematic derivation of instantaneous rates for algebraic, composite, and implicit relations:",
    leftTheoremTitle: "The Chain Rule",
    leftTheoremMath: "\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)",
    rightTheoremTitle: "The Product Rule",
    rightTheoremMath: "\\frac{d}{dx}[u \\cdot v] = u'v + uv'",
    sections: [
      {
        id: '3.1-tangents-and-the-derivative-at-a-point',
        number: '3.1',
        title: 'Tangents and the Derivative at a Point',
        description: 'Difference quotients, tangent slopes, normal line equations, rates of change at a point.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '3.2-the-derivative-as-a-function',
        number: '3.2',
        title: 'The Derivative as a Function',
        description: 'First principles differentiation, differentiability implies continuity, corners, cusps, vertical tangents.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '3.3-differentiation-rules',
        number: '3.3',
        title: 'Differentiation Rules',
        description: 'Power rule, product rule, quotient rule, negative and fractional exponents, higher-order derivatives.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '3.4-the-derivative-as-a-rate-of-change',
        number: '3.4',
        title: 'The Derivative as a Rate of Change',
        description: 'Rectilinear motion, velocity, speed, acceleration, jerk, free-fall, marginal cost and profit in economics.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '3.5-derivatives-of-trigonometric-functions',
        number: '3.5',
        title: 'Derivatives of Trigonometric Functions',
        description: 'Sine, cosine, tangent, secant, cotangent, cosecant derivatives, tangent lines, 4-cycle periodicity.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '3.6-the-chain-rule',
        number: '3.6',
        title: 'The Chain Rule',
        description: 'Composite functions, generalized power rule, repeated chain rule, nested trigonometric differentiation.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '3.7-implicit-differentiation',
        number: '3.7',
        title: 'Implicit Differentiation',
        description: 'Implicit curves (circles, ellipses, folia), tangent and normal slopes, second derivatives implicitly.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '3.8-related-rates',
        number: '3.8',
        title: 'Related Rates',
        description: 'Time derivatives of geometric relations, expanding balloons, sliding ladders, conical tanks, moving shadows.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '3.9-linearization-and-differentials',
        number: '3.9',
        title: 'Linearization and Differentials',
        description: 'Tangent line approximations, standard linear formulas, differentials, propagated error analysis.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
    ],
  },
  ch04: {
    num: 4,
    key: 'ch04',
    title: 'Chapter 4: Applications of Derivatives',
    description:
      "Harnessing derivatives to analyze and optimize systems: extreme values on closed intervals, Mean Value Theorem, concavity, curve sketching, applied optimization, L'Hôpital's Rule, Newton's method, and antiderivatives.",
    theoremHeader: "Mathematical Theorem • Analytical Optimality & Existence",
    theoremIntro:
      "The cornerstone theorems governing existence of extrema and correspondence between average and instantaneous rates:",
    leftTheoremTitle: "The Mean Value Theorem",
    leftTheoremMath: "f'(c) = \\frac{f(b) - f(a)}{b - a}",
    rightTheoremTitle: "Extreme Value Theorem",
    rightTheoremMath: "f \\in C[a, b] \\implies \\exists \\max / \\min",
    sections: [
      {
        id: '4.1-extreme-values-of-functions-on-closed-intervals',
        number: '4.1',
        title: 'Extreme Values of Functions on Closed Intervals',
        description: 'Absolute and local extrema, critical points, Extreme Value Theorem, Closed Interval Method.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '4.2-the-mean-value-theorem',
        number: '4.2',
        title: 'The Mean Value Theorem',
        description: "Rolle's Theorem, Mean Value Theorem, constant derivative corollaries, root uniqueness proofs.",
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '4.3-monotonic-functions-and-the-first-derivative-test',
        number: '4.3',
        title: 'Monotonic Functions and the First Derivative Test',
        description: 'Increasing and decreasing tests, sign charts, First Derivative Test for local maximums and minimums.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '4.4-concavity-and-curve-sketching',
        number: '4.4',
        title: 'Concavity and Curve Sketching',
        description: 'Concavity test, points of inflection, Second Derivative Test, full curve sketching analysis.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '4.5-indeterminate-forms-and-lhospitals-rule',
        number: '4.5',
        title: "Indeterminate Forms and L'Hôpital's Rule",
        description: "Forms 0/0 and inf/inf, repeated applications, indeterminate products, differences, and powers.",
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '4.6-applied-optimization',
        number: '4.6',
        title: 'Applied Optimization',
        description: 'Real-world geometric and physical optimization: box volume, fenced pasture, cylindrical cans, Snell’s Law.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '4.7-newtons-method',
        number: '4.7',
        title: "Newton's Method",
        description: "Newton-Raphson iteration, tangent line root approximations, failure modes, division-free algorithms.",
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
      {
        id: '4.8-antiderivatives',
        number: '4.8',
        title: 'Antiderivatives',
        description: 'Indefinite integrals, power rule for integration, trigonometric antiderivatives, Initial Value Problems.',
        status: 'Verified Solutions',
        badgeVariant: 'success',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 5,
      },
    ],
  },
};

export function getAllSections(): FlattenedSection[] {
  const result: FlattenedSection[] = [];
  const chapterKeys = Object.keys(CHAPTER_METADATA).sort();

  for (const chKey of chapterKeys) {
    const chapter = CHAPTER_METADATA[chKey];
    for (const sec of chapter.sections) {
      result.push({
        ...sec,
        chapterKey: chapter.key,
        chapterNum: chapter.num,
        chapterTitle: chapter.title,
        href: `/chapters/${chapter.key}/${sec.id}`,
        solutionsHref: `/chapters/${chapter.key}/${sec.id}?tab=solutions`,
      });
    }
  }

  return result;
}

export function getAdjacentSections(
  chapterKey: string,
  sectionIdentifier: string
): {
  prev: FlattenedSection | null;
  next: FlattenedSection | null;
} {
  const all = getAllSections();
  const normalizedCh = normalizeChapterKey(chapterKey);
  const cleanId = sectionIdentifier.toLowerCase();
  const cleanDot = cleanId.replace(/[-_]/g, '.');

  const currentIndex = all.findIndex((s) => {
    const chMatch = s.chapterKey.toLowerCase() === normalizedCh;
    const secMatch =
      s.id.toLowerCase() === cleanId ||
      s.number.toLowerCase() === cleanId ||
      s.number.toLowerCase() === cleanDot ||
      cleanId.startsWith(s.number.toLowerCase()) ||
      cleanId.includes(s.id.toLowerCase());
    return chMatch && secMatch;
  });

  if (currentIndex === -1) {
    // Fallback: match by section identifier alone if unique
    const secOnlyIndex = all.findIndex(
      (s) =>
        s.id.toLowerCase() === cleanId ||
        s.number.toLowerCase() === cleanId ||
        s.number.toLowerCase() === cleanDot ||
        cleanId.startsWith(s.number.toLowerCase())
    );
    if (secOnlyIndex !== -1) {
      return {
        prev: secOnlyIndex > 0 ? all[secOnlyIndex - 1] : null,
        next: secOnlyIndex < all.length - 1 ? all[secOnlyIndex + 1] : null,
      };
    }
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? all[currentIndex - 1] : null,
    next: currentIndex < all.length - 1 ? all[currentIndex + 1] : null,
  };
}
