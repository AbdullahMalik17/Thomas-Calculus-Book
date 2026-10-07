import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MathBlock } from '@/components/math/MathBlock';
import { CHAPTER_METADATA } from '@/lib/content/curriculum';
import {
  BookOpen,
  CheckCircle2,
  Award,
  Layers,
  ArrowRight,
  ListOrdered,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const metadata = {
  title: "Complete Curriculum & Solutions Index | Thomas' Calculus (14th Ed)",
  description:
    "Comprehensive curriculum table of contents for Thomas' Calculus (14th Edition). Access all 4 chapters, 27 sections, and 153 SymPy CAS-verified worked exercise solutions.",
};

export default function ChaptersIndexPage() {
  const chapters = Object.values(CHAPTER_METADATA);
  const totalSections = chapters.reduce((acc, ch) => acc + ch.sections.length, 0);
  const totalSolutions = chapters.reduce(
    (acc, ch) => acc + ch.sections.reduce((sAcc, s) => sAcc + s.solutionsCount, 0),
    0
  );

  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Chapters Curriculum</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Thomas&apos; Calculus 14th Ed</Badge>
          <Badge variant="success">{totalSections} Sections Complete</Badge>
          <Badge variant="info">{totalSolutions} Verified Solutions</Badge>
          <Badge variant="secondary">SymPy CAS Proved</Badge>
        </div>

        <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-[#172b43] sm:text-5xl [text-wrap:balance]">
          Curriculum Overview &amp; Solutions Directory
        </h1>

        <p className="reading-copy text-slate-600 sm:text-lg">
          Explore the full calculus progression from functions and limits to derivatives and real-world optimization.
          Every section contains curated theory summaries, mathematical theorems, and step-by-step paraphrased exercise solutions.
        </p>

        {/* Quick Chapter Anchors */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
            Jump to:
          </span>
          {chapters.map((ch) => (
            <a
              key={ch.key}
              href={`#${ch.key}`}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors"
            >
              Chapter {ch.num}: {ch.title.replace(/^Chapter \d+:\s*/, '')}
            </a>
          ))}
        </div>
      </div>

      {/* Chapters Breakdown */}
      <div className="space-y-12">
        {chapters.map((ch) => {
          const chSolutionsCount = ch.sections.reduce((acc, s) => acc + s.solutionsCount, 0);

          return (
            <section
              key={ch.key}
              id={ch.key}
              className="scroll-mt-24 space-y-6"
            >
              {/* Chapter Header Card */}
              <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                        Chapter {ch.num} Module
                      </span>
                      <span className="text-slate-500">&bull;</span>
                      <span className="text-xs text-slate-300 font-medium">
                        {ch.sections.length} Sections ({chSolutionsCount} Solutions)
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {ch.title}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      href={`/chapters/${ch.key}`}
                      variant="primary"
                      size="sm"
                      className="bg-white text-blue-900 hover:bg-blue-50"
                    >
                      Chapter Overview
                    </Button>
                    <Button
                      href={`/quiz/${ch.key}`}
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-white hover:bg-slate-800"
                    >
                      <Award className="w-3.5 h-3.5 mr-1 text-amber-400 inline" />
                      Chapter Quiz
                    </Button>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                  {ch.description}
                </p>

                {/* Theorem Mini-Banner */}
                <div className="pt-2">
                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-sky-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      Key Principle: {ch.leftTheoremTitle}
                    </span>
                    <div className="bg-slate-900 px-3 py-1 rounded text-sky-200 font-mono">
                      <MathBlock math={ch.leftTheoremMath} theme="dark" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sections Grid */}
              <div className="grid grid-cols-1 gap-4">
                {ch.sections.map((sec) => (
                  <Card
                    key={sec.id}
                    className="hover:border-blue-300 hover:shadow-md transition-all p-5"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-blue-700 font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                            Section {sec.number}
                          </span>
                          <Badge variant={sec.badgeVariant}>{sec.status}</Badge>
                          <span className="text-xs text-slate-500 font-medium">
                            {sec.solutionsCount} Paraphrased Solutions
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900">
                          {sec.title}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                          {sec.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            SymPy CAS Proven
                          </span>
                          {sec.practiceCount > 0 && (
                            <>
                              <span>&bull;</span>
                              <span>{sec.practiceCount} Practice Exercises</span>
                            </>
                          )}
                          {sec.mcqCount > 0 && (
                            <>
                              <span>&bull;</span>
                              <span>{sec.mcqCount} Conceptual MCQs</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap sm:flex-nowrap gap-2 shrink-0 pt-2 lg:pt-0">
                        <Button
                          href={`/chapters/${ch.key}/${sec.id}`}
                          variant="primary"
                          size="sm"
                          className="gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Study Guide</span>
                        </Button>

                        <Button
                          href={`/chapters/${ch.key}/${sec.id}?tab=solutions`}
                          variant="secondary"
                          size="sm"
                          className="gap-1.5"
                        >
                          <ListOrdered className="w-3.5 h-3.5 text-blue-700" />
                          <span>Solutions ({sec.solutionsCount})</span>
                        </Button>

                        {sec.practiceCount > 0 && (
                          <Button
                            href={`/practice/${sec.id}`}
                            variant="outline"
                            size="sm"
                            className="gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Practice</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
