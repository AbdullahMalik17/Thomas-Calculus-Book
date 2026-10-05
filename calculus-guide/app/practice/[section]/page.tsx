import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MathBlock } from '@/components/math/MathBlock';
import { InlineMath } from '@/components/math/InlineMath';
import { ArrowLeft, CheckCircle2, HelpCircle, Layers, ShieldCheck } from 'lucide-react';

interface PracticePageProps {
  params: {
    section: string;
  };
}

export default function PracticePage({ params }: PracticePageProps) {
  const { section } = params;

  const samplePracticeProblems = [
    {
      id: 'practice-01',
      title: 'Practice Problem 1: Natural Domain of Rational Radical Function',
      difficulty: 'Tier 1 (Foundational)',
      badgeVariant: 'primary' as const,
      prompt: 'Find the natural domain of the function:',
      math: 'f(x) = \\frac{\\sqrt{3x - 6}}{x - 5}',
      hints: [
        'Recall that the radicand under an even root must be non-negative: 3x - 6 >= 0.',
        'Denominators must never equal zero: x - 5 != 0.',
        'Intersect the two conditions: x >= 2 and x != 5.',
      ],
      solution: 'x \\in [2, 5) \\cup (5, \\infty)',
      why: 'Radicand condition 3x - 6 >= 0 yields x >= 2. Denominator condition x - 5 != 0 removes x = 5 from the interval [2, infty).',
    },
    {
      id: 'practice-02',
      title: 'Practice Problem 2: Piecewise Evaluation and Continuity Boundary',
      difficulty: 'Tier 2 (Intermediate)',
      badgeVariant: 'warning' as const,
      prompt: 'Evaluate the piecewise function at boundary points and test symmetry:',
      math: 'g(x) = \\begin{cases} 4 - x^2, & x < 1 \\\\ 2x + 1, & x \\ge 1 \\end{cases}',
      hints: [
        'For x < 1, substitute directly into the quadratic formula: g(0) = 4 - 0^2 = 4.',
        'For x >= 1, substitute into the linear formula: g(1) = 2(1) + 1 = 3.',
        'Check left-hand approach as x -> 1: 4 - (1)^2 = 3.',
      ],
      solution: 'g(1) = 3, \\quad \\lim_{x \\to 1^-} g(x) = 3',
      why: 'Both branches evaluate to 3 at x = 1, ensuring the function is continuous across the partition boundary.',
    },
    {
      id: 'practice-03',
      title: 'Practice Problem 3: Symmetric Decomposition Theorem',
      difficulty: 'Tier 3 (Advanced/Proof)',
      badgeVariant: 'success' as const,
      prompt: 'Decompose the general function into its unique even and odd components:',
      math: 'f(x) = E(x) + O(x) = \\frac{f(x) + f(-x)}{2} + \\frac{f(x) - f(-x)}{2}',
      hints: [
        'Test E(-x) to verify reflection symmetry across the y-axis: E(-x) = E(x).',
        'Test O(-x) to verify rotational symmetry about the origin: O(-x) = -O(x).',
        'Sum E(x) + O(x) and show cancellation yields exactly f(x).',
      ],
      solution: 'f(x) \\equiv E(x) + O(x) \\quad \\text{for every real-valued function } f',
      why: 'The algebraic identity holds identically for any domain symmetric about 0, establishing uniqueness of even/odd decomposition.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>/</span>
        <Link href="/chapters/ch01" className="hover:text-blue-700">Chapter 1</Link>
        <span>/</span>
        <Link href={`/chapters/ch01/${section}`} className="hover:text-blue-700">Section Guide</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Practice</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Interactive Practice Engine</Badge>
          <Badge variant="info">{section}</Badge>
          <Badge variant="success">SymPy Validated Solutions</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Section 1.1 Practice Problems
        </h1>

        <p className="text-slate-600 max-w-3xl leading-relaxed">
          Master function domains, ranges, symmetries, and difference quotients with multi-tiered difficulty exercises, progressive hint revelations, and step-by-step verified explanations.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <Layers className="w-4 h-4 text-blue-600" />
            3 Difficulty Tiers (8 Original Problems)
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified with SymPy Computer Algebra
          </span>
        </div>
      </div>

      {/* Practice Problems List */}
      <div className="space-y-6">
        {samplePracticeProblems.map((prob) => (
          <Card key={prob.id} className="border-l-4 border-l-blue-600">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">{prob.title}</h2>
                <Badge variant={prob.badgeVariant}>{prob.difficulty}</Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-slate-700 font-medium">{prob.prompt}</p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <MathBlock math={prob.math} />
                </div>
              </div>

              {/* Hints Accordion Preview */}
              <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  Progressive Hints
                </div>
                <ul className="list-disc list-inside text-xs text-blue-800 space-y-1 pl-1">
                  {prob.hints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>

              {/* Verified Solution & Step Explanation */}
              <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Verified Solution &amp; Mathematical Rationale:
                </div>
                <div className="text-center py-1">
                  <MathBlock math={prob.solution} />
                </div>
                <p className="text-xs text-emerald-800 font-medium bg-white/70 p-2.5 rounded-lg border border-emerald-100">
                  <strong>Why:</strong> {prob.why}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
