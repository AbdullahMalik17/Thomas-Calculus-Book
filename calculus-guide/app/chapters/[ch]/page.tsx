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

export default function ChapterPage({ params }: ChapterPageProps) {
  const chapterId = params.ch;
  const isCh01 = chapterId === 'ch01' || chapterId === '1';

  const sections = isCh01
    ? [
        {
          id: '1.1-functions-and-graphs',
          number: '1.1',
          title: 'Functions and Their Graphs',
          description:
            'Definitions, domain, range, piecewise functions, vertical line test, even and odd symmetry.',
          status: 'Golden Example (Verified)',
          badgeVariant: 'success' as const,
          practiceCount: 8,
          mcqCount: 8,
          solutionsCount: 8,
        },
        {
          id: '1.2-combining-functions',
          number: '1.2',
          title: 'Combining Functions; Shifting and Scaling Graphs',
          description:
            'Algebra of functions, composition, horizontal and vertical shifts, scaling, reflection.',
          status: 'Planned',
          badgeVariant: 'default' as const,
          practiceCount: 0,
          mcqCount: 0,
          solutionsCount: 0,
        },
        {
          id: '1.3-trigonometric-functions',
          number: '1.3',
          title: 'Trigonometric Functions',
          description:
            'Radian measure, circular functions, trigonometric identities, periodicity, transformations.',
          status: 'Planned',
          badgeVariant: 'default' as const,
          practiceCount: 0,
          mcqCount: 0,
          solutionsCount: 0,
        },
      ]
    : [
        {
          id: 'overview',
          number: `${chapterId}.1`,
          title: `Chapter ${chapterId} Foundation`,
          description: 'Curriculum module in development according to multi-agent production workflow.',
          status: 'In Development',
          badgeVariant: 'info' as const,
          practiceCount: 0,
          mcqCount: 0,
          solutionsCount: 0,
        },
      ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Chapter {chapterId.toUpperCase()}</span>
      </div>

      {/* Chapter Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Thomas&apos; Calculus 14th Ed</Badge>
          <Badge variant="info">Chapter {isCh01 ? '1' : chapterId}</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {isCh01 ? 'Chapter 1: Functions' : `Chapter ${chapterId}`}
        </h1>
        <p className="text-slate-600 max-w-3xl leading-relaxed">
          {isCh01
            ? "Functions are the fundamental building blocks of calculus. This chapter examines their graphs, natural domains, ranges, symmetries, and algebraic combinations with SymPy-verified mathematical standards."
            : `Detailed study module for Chapter ${chapterId} of Thomas' Calculus (14th Edition).`}
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <Button href={`/quiz/${chapterId}`} variant="outline" size="sm" className="gap-1.5">
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
      {isCh01 && (
        <div className="p-6 rounded-xl bg-slate-900 text-white space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">
            Mathematical Theorem &bull; Symmetry Criterion
          </span>
          <p className="text-sm text-slate-300">
            A function <span className="font-mono text-blue-200">f</span> has even symmetry (reflection across y-axis) or odd symmetry (180&deg; rotational origin symmetry) if and only if:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700 space-y-2 text-center">
              <span className="text-xs font-semibold text-sky-400 block mb-1">Even Function (y-axis reflection)</span>
              <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-700/80 shadow-inner">
                <MathBlock math="f(-x) = f(x)" theme="dark" />
              </div>
            </div>
            <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700 space-y-2 text-center">
              <span className="text-xs font-semibold text-emerald-400 block mb-1">Odd Function (Origin symmetry)</span>
              <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-700/80 shadow-inner">
                <MathBlock math="f(-x) = -f(x)" theme="dark" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sections List */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Sections in this Chapter</h2>
        <div className="space-y-4">
          {sections.map((sec) => (
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
                    href={`/chapters/${chapterId}/${sec.id}`}
                    variant="primary"
                    size="sm"
                    className="gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Read Guide
                  </Button>
                  <Button
                    href={`/practice/${sec.id}`}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Practice
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
