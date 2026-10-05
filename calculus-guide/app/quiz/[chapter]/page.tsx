import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MathBlock } from '@/components/math/MathBlock';
import { InlineMath } from '@/components/math/InlineMath';
import { ArrowLeft, CheckCircle2, XCircle, BrainCircuit, Award } from 'lucide-react';

interface QuizPageProps {
  params: {
    chapter: string;
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  const { chapter } = params;

  const sampleMCQs = [
    {
      id: 'mcq-01',
      question:
        'What is the natural domain of the rational function f(x) = (x^2 - 4) / (x - 2)?',
      math: 'f(x) = \\frac{x^2 - 4}{x - 2}',
      options: [
        {
          id: 'A',
          label: 'A',
          text: 'All real numbers: (-infty, infty)',
          isCorrect: false,
          misconception:
            'Canceling the factor (x - 2) algebraically before identifying the domain. The denominator is undefined at x = 2 in the original expression.',
        },
        {
          id: 'B',
          label: 'B',
          text: 'All real numbers except x = 2: (-infty, 2) U (2, infty)',
          isCorrect: true,
          misconception: '',
        },
        {
          id: 'C',
          label: 'C',
          text: 'All real numbers except x = 2 and x = -2',
          isCorrect: false,
          misconception:
            'Confusing numerator roots with domain restrictions. The numerator being zero at x = -2 yields f(-2) = 0, which is perfectly valid.',
        },
        {
          id: 'D',
          label: 'D',
          text: '[2, infty)',
          isCorrect: false,
          misconception:
            'Confusing rational functions with square root radical constraints. No square root is present.',
        },
      ],
      explanation:
        'The natural domain is determined by the unsimplified expression. Division by zero occurs when x - 2 = 0, which implies x = 2 must be excluded.',
    },
    {
      id: 'mcq-02',
      question:
        'Which of the following functions is an odd function (symmetric about the origin)?',
      math: 'f(-x) = -f(x)',
      options: [
        {
          id: 'A',
          label: 'A',
          text: 'f(x) = x^3 - x',
          isCorrect: true,
          misconception: '',
        },
        {
          id: 'B',
          label: 'B',
          text: 'f(x) = x^3 + 1',
          isCorrect: false,
          misconception:
            'Assuming adding a nonzero constant to an odd power retains odd symmetry. Notice f(-0) = 1 but -f(0) = -1, failing symmetry.',
        },
        {
          id: 'C',
          label: 'C',
          text: 'f(x) = |x|',
          isCorrect: false,
          misconception:
            'Confusing odd symmetry with even symmetry. Absolute value satisfies |-x| = |x|, which is even (y-axis reflection).',
        },
        {
          id: 'D',
          label: 'D',
          text: 'f(x) = x^2 - 4',
          isCorrect: false,
          misconception:
            'Equating polynomial with even powers to odd behavior. Since (-x)^2 - 4 = x^2 - 4, this function is strictly even.',
        },
      ],
      explanation:
        'Testing f(-x): (-x)^3 - (-x) = -x^3 + x = -(x^3 - x) = -f(x). Thus f is an odd function.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>/</span>
        <Link href="/chapters/ch01" className="hover:text-blue-700">Chapter 1</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">MCQ Quiz</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Misconception-Driven Quiz</Badge>
          <Badge variant="info">Chapter {chapter.toUpperCase()}</Badge>
          <Badge variant="success">Pedagogically Audited</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Chapter 1 Diagnostic &amp; Conceptual MCQ Quiz
        </h1>

        <p className="text-slate-600 max-w-3xl leading-relaxed">
          Every distractor in our quiz engine targets a specific documented student misconception. When you pick an incorrect choice, the engine explains the exact cognitive error and how to rectify it.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Zod Contract Enforced:</strong> 4 options per question, exactly 1 correct answer, 3 distractors with non-empty misconception explanations.
            </span>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {sampleMCQs.map((q, idx) => (
          <Card key={q.id} className="border-t-4 border-t-indigo-600">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Question {idx + 1} of {sampleMCQs.length}
                </span>
                <Badge variant="primary">{q.id}</Badge>
              </div>

              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {q.question}
              </h2>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 max-w-md mx-auto text-center">
                <MathBlock math={q.math} />
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {q.options.map((opt) => (
                  <div
                    key={opt.id}
                    className={`p-4 rounded-xl border transition-all ${
                      opt.isCorrect
                        ? 'border-emerald-300 bg-emerald-50/70'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          opt.isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {opt.label}
                      </span>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900 text-sm">
                            {opt.text}
                          </span>
                          {opt.isCorrect && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                            </span>
                          )}
                        </div>

                        {!opt.isCorrect && opt.misconception && (
                          <div className="text-xs text-amber-800 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 mt-2 flex gap-2">
                            <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <strong>Targeted Misconception:</strong> {opt.misconception}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <strong>Explanation:</strong> {q.explanation}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
