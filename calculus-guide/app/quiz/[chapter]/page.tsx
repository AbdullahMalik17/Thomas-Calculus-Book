import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { BrainCircuit } from 'lucide-react';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';

interface QuizPageProps {
  params: {
    chapter: string;
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  const { chapter } = params;
  const chapterNumber = Number.parseInt(chapter.replace(/\D/g, ''), 10) || 1;

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
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>/</span>
        <Link href="/chapters/ch01" className="hover:text-blue-700">Chapter 1</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">MCQ Quiz</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Concept check</Badge>
          <Badge variant="info">Chapter {chapterNumber}</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#172b43]">
          Chapter {chapterNumber} Diagnostic &amp; Conceptual Quiz
        </h1>

        <p className="reading-copy text-slate-600">
          Choose an answer to check your understanding. If you miss one, review the idea behind the choice and try again.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-[#176b63] shrink-0" />
            <span>
              Wrong answers include a short explanation of the common misconception they reflect.
            </span>
          </div>
        </div>
      </div>

      {/* Questions */}
      <section aria-label="Quiz questions" className="space-y-6">
        {sampleMCQs.map((q, idx) => (
          <QuizQuestion key={q.id} question={q} index={idx} total={sampleMCQs.length} />
        ))}
      </section>
    </div>
  );
}
