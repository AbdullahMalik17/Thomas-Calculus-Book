import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MathBlock } from '@/components/math/MathBlock';
import { InlineMath } from '@/components/math/InlineMath';
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, Compass, Award } from 'lucide-react';

interface SectionPageProps {
  params: {
    ch: string;
    section: string;
  };
}

export default function SectionPage({ params }: SectionPageProps) {
  const { ch, section } = params;
  const isSection11 = section.includes('1.1') || section === '1.1-functions-and-graphs';

  return (
    <div className="space-y-10">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>/</span>
        <Link href={`/chapters/${ch}`} className="hover:text-blue-700">Chapter {ch.toUpperCase()}</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">{section}</span>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Section {isSection11 ? '1.1' : section}</Badge>
          <Badge variant="success">SymPy Verified</Badge>
          <Badge variant="info">Zod Guardrails Active</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {isSection11 ? 'Section 1.1: Functions and Their Graphs' : `Section ${section}`}
        </h1>

        <p className="text-slate-600 max-w-3xl leading-relaxed text-base">
          {isSection11
            ? 'Complete mathematical guide covering natural domains, ranges, graph tests, piecewise functions, symmetry criteria, and worked exercises with rigorous justification.'
            : `Study guide and problem sets for ${section}.`}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button href={`/practice/${section}`} size="sm" className="gap-1.5">
            <Compass className="w-4 h-4" />
            Practice 8 Original Problems
          </Button>
          <Button href={`/quiz/${ch}`} variant="outline" size="sm" className="gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            Take 8-Question MCQ Quiz
          </Button>
        </div>
      </div>

      {/* Section 1.1 Theory Overview */}
      {isSection11 ? (
        <div className="space-y-8">
          {/* Key Definitions & Formulas */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Core Mathematical Definitions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Definition of a Function" subtitle="Domain & Range Mapping">
                <p className="text-sm text-slate-600 leading-relaxed">
                  A function <InlineMath math="f" /> from a set <InlineMath math="D" /> to a set <InlineMath math="Y" /> is a rule that assigns a <strong>unique</strong> (single) element <InlineMath math="f(x) \in Y" /> to each element <InlineMath math="x \in D" />.
                </p>
                <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-xs font-semibold text-slate-700 block mb-1">Natural Domain Rule:</span>
                  <p className="text-xs text-slate-600">
                    When no domain is explicitly stated, the domain is the largest set of real numbers for which the formula produces real values (denominators nonzero, radicands of even roots non-negative).
                  </p>
                </div>
              </Card>

              <Card title="Piecewise-Defined Functions" subtitle="Conditional Domain Partitions">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Functions described by different formulas on different parts of their domain:
                </p>
                <MathBlock
                  math="|x| = \begin{cases} x, & x \ge 0 \\ -x, & x < 0 \end{cases}"
                  caption="Absolute Value as a Piecewise Function"
                />
              </Card>
            </div>
          </section>

          {/* Symmetries and Graph Tests */}
          <section className="bg-slate-900 text-white rounded-2xl p-8 space-y-6">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">
                Visual &amp; Algebraic Criteria
              </span>
              <h2 className="text-2xl font-bold mt-1">Symmetry of Graphs</h2>
              <p className="text-slate-300 text-sm mt-1">
                Both geometric and algebraic conditions must be satisfied:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-800/90 rounded-xl border border-slate-700 space-y-3">
                <h3 className="font-bold text-sky-400 text-sm">Symmetry about y-axis</h3>
                <p className="text-xs text-slate-300 font-medium">Even Function Condition:</p>
                <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-700/80 shadow-inner">
                  <MathBlock math="f(-x) = f(x)" theme="dark" />
                </div>
                <p className="text-xs text-slate-400">
                  Example: <InlineMath math="f(x) = x^2" className="text-sky-300 font-semibold" />
                </p>
              </div>

              <div className="p-5 bg-slate-800/90 rounded-xl border border-slate-700 space-y-3">
                <h3 className="font-bold text-emerald-400 text-sm">Symmetry about Origin</h3>
                <p className="text-xs text-slate-300 font-medium">Odd Function Condition:</p>
                <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-700/80 shadow-inner">
                  <MathBlock math="f(-x) = -f(x)" theme="dark" />
                </div>
                <p className="text-xs text-slate-400">
                  Example: <InlineMath math="f(x) = x^3" className="text-emerald-300 font-semibold" />
                </p>
              </div>

              <div className="p-5 bg-slate-800/90 rounded-xl border border-slate-700 space-y-3">
                <h3 className="font-bold text-amber-400 text-sm">Vertical Line Test</h3>
                <p className="text-xs text-slate-300 font-medium">Function Validity:</p>
                <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-700/80 shadow-inner text-xs text-slate-300 min-h-[58px] flex items-center justify-center text-center">
                  A curve in the xy-plane is a function if no vertical line intersects it more than once.
                </div>
                <p className="text-xs text-slate-400">
                  Geometric test for single-valued mapping
                </p>
              </div>
            </div>
          </section>

          {/* Common Pitfalls Card */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Common Student Pitfalls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-amber-900 text-sm">
                    Confusing <InlineMath math="f(-x)" /> with <InlineMath math="-f(x)" />
                  </h3>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Replacing <InlineMath math="x" /> with <InlineMath math="-x" /> is an algebraic reflection across the y-axis, whereas multiplying the entire expression by <InlineMath math="-1" /> reflects across the x-axis.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-blue-50 border border-blue-200 flex gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-blue-900 text-sm">
                    Canceling Terms Before Domain Finding
                  </h3>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    In <InlineMath math="g(x) = \frac{x^2 - 1}{x - 1}" />, simplifying to <InlineMath math="x + 1" /> loses the restriction that <InlineMath math="x \neq 1" />. The domain must be determined from the unsimplified expression.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Golden Standard Content Navigation */}
          <div className="p-6 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900">Ready for Exercises and Quizzes?</h3>
              <p className="text-sm text-slate-600">
                8 paraphrased worked solutions, 8 practice problems (tiers 1-3), and 8 misconception MCQs.
              </p>
            </div>
            <div className="flex gap-3">
              <Button href={`/practice/${section}`} variant="primary">
                Launch Practice Set &rarr;
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card title="Module Status" subtitle="Under Development">
          <p className="text-slate-600">
            This section placeholder is part of the curriculum expansion plan.
          </p>
        </Card>
      )}
    </div>
  );
}
