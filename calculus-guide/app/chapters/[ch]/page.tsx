import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MathBlock } from '@/components/math/MathBlock';
import { ArrowLeft, BookOpen, Compass, Award, CheckCircle2 } from 'lucide-react';

interface ChapterPageProps {
  params: {
    ch: string;
  };
}

interface SectionItem {
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

interface ChapterMetadata {
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

const CHAPTER_METADATA: Record<string, ChapterMetadata> = {
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

export default function ChapterPage({ params }: ChapterPageProps) {
  const rawCh = params.ch.toLowerCase();
  const normalizedKey = rawCh.startsWith('ch')
    ? rawCh
    : `ch${rawCh.padStart(2, '0')}`;

  const chapterMeta = CHAPTER_METADATA[normalizedKey] || {
    num: parseInt(rawCh.replace(/\D/g, '') || '1', 10),
    key: normalizedKey,
    title: `Chapter ${params.ch.toUpperCase()}`,
    description: `Curriculum module for Chapter ${params.ch} of Thomas' Calculus (14th Edition).`,
    theoremHeader: 'Curriculum Module Overview',
    theoremIntro: 'Core mathematical principles in active progression:',
    leftTheoremTitle: 'Analytical Foundation',
    leftTheoremMath: 'y = f(x)',
    rightTheoremTitle: 'Calculus Operator',
    rightTheoremMath: '\\frac{dy}{dx}',
    sections: [
      {
        id: 'overview',
        number: `${params.ch}.1`,
        title: `Chapter ${params.ch} Foundation`,
        description: 'Curriculum module in development according to multi-agent production workflow.',
        status: 'In Development',
        badgeVariant: 'info',
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 0,
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Chapter {chapterMeta.num}</span>
      </div>

      {/* Chapter Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Thomas&apos; Calculus 14th Ed</Badge>
          <Badge variant="info">Chapter {chapterMeta.num}</Badge>
          <Badge variant="success">{chapterMeta.sections.length} Sections Available</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {chapterMeta.title}
        </h1>
        <p className="text-slate-600 max-w-3xl leading-relaxed">
          {chapterMeta.description}
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <Button href={`/quiz/${chapterMeta.key}`} variant="outline" size="sm" className="gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            Chapter Quiz
          </Button>
          <Button href="/dashboard" variant="ghost" size="sm" className="gap-1.5">
            <Compass className="w-4 h-4 text-blue-600" />
            Track Mastery
          </Button>
        </div>
      </div>

      {/* Mathematical Principle Highlight */}
      <div className="p-6 rounded-xl bg-slate-900 text-white space-y-3">
        <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">
          {chapterMeta.theoremHeader}
        </span>
        <p className="text-sm text-slate-300">
          {chapterMeta.theoremIntro}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700 space-y-2 text-center">
            <span className="text-xs font-semibold text-sky-400 block mb-1">
              {chapterMeta.leftTheoremTitle}
            </span>
            <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-700/80 shadow-inner">
              <MathBlock math={chapterMeta.leftTheoremMath} theme="dark" />
            </div>
          </div>
          <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700 space-y-2 text-center">
            <span className="text-xs font-semibold text-emerald-400 block mb-1">
              {chapterMeta.rightTheoremTitle}
            </span>
            <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-700/80 shadow-inner">
              <MathBlock math={chapterMeta.rightTheoremMath} theme="dark" />
            </div>
          </div>
        </div>
      </div>

      {/* Sections List */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Sections in this Chapter</h2>
        <div className="space-y-4">
          {chapterMeta.sections.map((sec) => (
            <Card key={sec.id} className="hover:border-blue-300 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-blue-800 font-mono">
                      {sec.number}
                    </span>
                    <Badge variant={sec.badgeVariant}>{sec.status}</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{sec.title}</h3>
                  <p className="text-sm text-slate-600">{sec.description}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span>{sec.solutionsCount} Paraphrased Solutions</span>
                    <span>&bull;</span>
                    <span>{sec.practiceCount} Practice Problems</span>
                    <span>&bull;</span>
                    <span>{sec.mcqCount} Conceptual MCQs</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <Button
                    href={`/chapters/${chapterMeta.key}/${sec.id}`}
                    variant="primary"
                    size="sm"
                    className="gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Read Guide &amp; Solutions
                  </Button>
                  {sec.practiceCount > 0 && (
                    <Button
                      href={`/practice/${sec.id}`}
                      variant="outline"
                      size="sm"
                      className="gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Practice
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
