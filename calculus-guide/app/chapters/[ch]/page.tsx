import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MathBlock } from '@/components/math/MathBlock';
import { ArrowLeft, BookOpen, Compass, Award, CheckCircle2, ListOrdered } from 'lucide-react';

import {
  CHAPTER_METADATA,
  normalizeChapterKey,
  ChapterMetadata,
  SectionItem,
} from '@/lib/content/curriculum';

interface ChapterPageProps {
  params: {
    ch: string;
  };
}

export function generateMetadata({ params }: ChapterPageProps) {
  const normalizedKey = normalizeChapterKey(params.ch);
  const chapterMeta = CHAPTER_METADATA[normalizedKey];
  if (!chapterMeta) {
    return {
      title: `Chapter ${params.ch.toUpperCase()} | Thomas' Calculus`,
      description: `Curriculum module for Chapter ${params.ch}.`,
    };
  }
  const solCount = chapterMeta.sections.reduce((acc, s) => acc + s.solutionsCount, 0);
  return {
    title: `${chapterMeta.title} (${chapterMeta.sections.length} Sections, ${solCount} Solutions) | Thomas' Calculus`,
    description: chapterMeta.description,
  };
}

export function generateStaticParams() {
  return [
    { ch: 'ch01' },
    { ch: 'ch02' },
    { ch: 'ch03' },
    { ch: 'ch04' },
    { ch: '1' },
    { ch: '2' },
    { ch: '3' },
    { ch: '4' },
  ];
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const normalizedKey = normalizeChapterKey(params.ch);
  const rawCh = params.ch.toLowerCase();

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
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link href="/" className="hover:text-blue-700 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
        <span>/</span>
        <Link href="/chapters" className="hover:text-blue-700">Chapters</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Chapter {chapterMeta.num}</span>
      </nav>

      {/* Chapter Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Thomas&apos; Calculus 14th Ed</Badge>
          <Badge variant="info">Chapter {chapterMeta.num}</Badge>
          <Badge variant="success">{chapterMeta.sections.length} Sections Available</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#172b43]">
          {chapterMeta.title}
        </h1>
        <p className="reading-copy text-slate-600">
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
                    Read Guide
                  </Button>
                  <Button
                    href={`/chapters/${chapterMeta.key}/${sec.id}?tab=solutions`}
                    variant="secondary"
                    size="sm"
                    className="gap-1"
                  >
                    <ListOrdered className="w-3.5 h-3.5 text-blue-700" />
                    Solutions ({sec.solutionsCount})
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
