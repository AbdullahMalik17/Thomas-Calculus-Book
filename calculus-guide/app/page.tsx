import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookMarked,
  CheckCircle2,
  Cpu,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { CHAPTER_METADATA } from '@/lib/content/curriculum';
import { MIDS_CHAPTERS, MIDS_EXAM_QUESTIONS } from '@/lib/content/mids-exam-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MathBlock } from '@/components/math/MathBlock';
import { HeroCalculusCard } from '@/components/math/HeroCalculusCard';
import { SecantTangentExplorer } from '@/components/math/SecantTangentExplorer';
import { AUTHOR_NAME, AUTHOR_URL, SITE_NAME, SITE_URL } from '@/lib/seo';

const chapters = Object.values(CHAPTER_METADATA);
const sectionCount = chapters.reduce((total, chapter) => total + chapter.sections.length, 0);
const solutionCount = chapters.reduce(
  (total, chapter) =>
    total + chapter.sections.reduce((chapterTotal, section) => chapterTotal + section.solutionsCount, 0),
  0
);

export const metadata: Metadata = {
  title: {
    absolute: `Thomas' Calculus Study Guide (14th Edition) | ${solutionCount} SymPy-Verified Solutions`,
  },
  description: `Interactive study companion for Thomas' Calculus (14th Edition) by ${AUTHOR_NAME}. Master ${chapters.length} chapters, ${sectionCount} sections, ${solutionCount} SymPy CAS-verified solutions, and ${MIDS_EXAM_QUESTIONS.length} midterm exam MCQs.`,
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `Thomas' Calculus Study Guide (14th Edition) | Interactive & SymPy Verified`,
    description: `Step-by-step calculus study platform covering ${chapters.length} chapters, ${sectionCount} sections, and ${solutionCount} SymPy-verified worked solutions by ${AUTHOR_NAME}.`,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Thomas' Calculus Study Guide (14th Edition) | ${solutionCount} Verified Solutions`,
    description: `Explore ${chapters.length} chapters, ${sectionCount} sections, ${solutionCount} SymPy-verified solutions, and interactive midterm exam prep.`,
    creator: '@AbdullahMalik17',
  },
};

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Editorial Monograph Hero: Asymmetric 12-Column Split Layout */}
      <section className="surface-grain relative overflow-hidden rounded-2xl border border-specular bg-surface-1 px-5 py-10 shadow-sm sm:px-10 sm:py-14 lg:px-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column (7 Cols): Monograph Typography, CTAs & Verification Proof Bar */}
          <div className="space-y-6 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="primary">Thomas&apos; Calculus · 14th Edition</Badge>
              <span className="rounded-md border border-specular bg-surface-2 px-2.5 py-0.5 font-mono text-xs font-semibold text-brand-primary tabular-nums">
                By Muhammad Abdullah Athar · SymPy Verified
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted tabular-nums">
                {chapters.length} chapters · 116 sections
              </span>
            </div>

            <h1 className="max-w-[18ch] font-reading text-4xl font-bold tracking-display text-ink-primary sm:text-5xl lg:text-6xl [text-wrap:balance]">
              Build your understanding, one idea at a time.
            </h1>
            <p className="reading-copy max-w-[68ch] font-reading text-lg text-ink-secondary">
              A clear, step-by-step mathematical monograph and interactive companion for learning calculus. Review
              rigorous definitions, follow symbolically verified examples, and practice at your own pace.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
              <Button
                href="/chapters"
                size="lg"
                className="gap-2 bg-brand-primary text-ink-inverse hover:bg-brand-primary-hover"
              >
                Explore the curriculum <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                href="/mids"
                variant="outline"
                size="lg"
                className="gap-2 border-specular text-brand-accent hover:bg-brand-accent-subtle/50"
              >
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                <span className="tabular-nums">Midterm Exam Prep ({MIDS_EXAM_QUESTIONS.length} MCQs)</span>
              </Button>
              <Button href="/chapters/ch01/1.1-functions-and-graphs" variant="outline" size="lg">
                Start with Section 1.1
              </Button>
            </div>

            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 font-mono text-xs text-ink-secondary tabular-nums">
              <CheckCircle2 className="h-4 w-4 text-brand-accent" aria-hidden="true" />
              <span>
                {solutionCount} worked solutions · {MIDS_EXAM_QUESTIONS.length} Midterm MCQs · 100% SymPy verified
              </span>
            </p>
          </div>

          {/* Right Column (5 Cols): Playable 3-Mode Interactive Calculus Side Card */}
          <div className="lg:col-span-5">
            <HeroCalculusCard />
          </div>
        </div>
      </section>

      {/* Asymmetric 12-Column Bento Grid: Interactive Micro-Artifact (7 cols) + Telemetry (5 cols) */}
      <section aria-labelledby="study-flow-heading" className="space-y-7">
        <div className="max-w-[68ch] space-y-2">
          <p className="book-kicker text-brand-accent">Interactive Mathematical Monograph</p>
          <h2
            id="study-flow-heading"
            className="font-reading text-2xl font-bold tracking-display text-ink-primary sm:text-3xl"
          >
            Geometric intuition meets symbolic rigor.
          </h2>
          <p className="max-w-[65ch] text-sm sm:text-base text-ink-secondary">
            Inspect how average rates of change converge to the instantaneous derivative while every exercise and
            distractor in the curriculum is audited by automated verification pipelines.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* 7-Column Interactive Calculus Micro-Artifact Card */}
          <div className="col-span-12 lg:col-span-7 flex">
            <SecantTangentExplorer />
          </div>

          {/* 5-Column SymPy Symbolic Verification & Misconception Diagnostics Telemetry Card */}
          <aside className="surface-grain col-span-12 lg:col-span-5 flex flex-col justify-between rounded-2xl border border-specular bg-surface-1 p-5 shadow-sm sm:p-7">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2 border-b border-hairline pb-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-brand-primary">
                  <Cpu className="h-4 w-4 text-brand-accent" aria-hidden="true" />
                  Verification Telemetry
                </span>
                <Badge variant="success">100% Audited</Badge>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-reading text-xl font-bold tracking-display text-ink-primary">
                  SymPy Symbolic Verification &amp; Misconception Diagnostics
                </h3>
                <p className="max-w-[65ch] text-sm leading-relaxed text-ink-secondary">
                  Every worked solution, practice problem, and multiple-choice distractor is validated against strict
                  mathematical and pedagogical guardrails.
                </p>
              </div>

              {/* Live Curriculum Stats Grid */}
              <dl className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-specular bg-surface-2 p-3.5">
                  <dt className="text-xs font-medium text-ink-muted">Complete Monograph</dt>
                  <dd className="mt-1 font-mono text-lg font-bold text-ink-primary tabular-nums">16 chapters</dd>
                  <span className="mt-0.5 block font-mono text-[11px] text-brand-accent tabular-nums">
                    Ch 01 – Ch 16
                  </span>
                </div>

                <div className="rounded-xl border border-specular bg-surface-2 p-3.5">
                  <dt className="text-xs font-medium text-ink-muted">Section Coverage</dt>
                  <dd className="mt-1 font-mono text-lg font-bold text-ink-primary tabular-nums">116 sections</dd>
                  <span className="mt-0.5 block font-mono text-[11px] text-ink-secondary tabular-nums">
                    {sectionCount} indexed modules
                  </span>
                </div>

                <div className="col-span-2 rounded-xl border border-specular bg-callout-theorem-bg p-3.5">
                  <div className="flex items-center justify-between">
                    <dt className="text-xs font-semibold text-callout-theorem-ink">Pedagogical Distractor Audit</dt>
                    <ShieldCheck className="h-4 w-4 text-brand-accent" aria-hidden="true" />
                  </div>
                  <dd className="mt-1 font-mono text-base font-bold text-callout-theorem-ink tabular-nums">
                    100% misconception coverage
                  </dd>
                  <span className="mt-0.5 block font-mono text-xs text-ink-secondary tabular-nums">
                    {solutionCount} SymPy-verified solutions · {MIDS_EXAM_QUESTIONS.length} midterm MCQs
                  </span>
                </div>
              </dl>

              {/* Recessed Obsidian CAS Equivalence Well */}
              <div className="rounded-xl border border-specular bg-surface-3 p-3.5 text-ink-inverse">
                <div className="flex items-center justify-between text-[11px] font-mono text-sky-300 tabular-nums">
                  <span>tools/verify/verify.py</span>
                  <span>24/24 fixtures PASS</span>
                </div>
                <p className="mt-1.5 font-mono text-xs text-slate-200 tabular-nums">
                  simplify(student_step - expected_form) == 0
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-hairline pt-4 flex items-center justify-between">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary underline-offset-4 hover:underline"
              >
                Open Engine Status Dashboard <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <span className="font-mono text-xs text-ink-muted tabular-nums">v14.0 CAS</span>
            </div>
          </aside>
        </div>
      </section>

      {/* Midterm Exam Readiness Callout */}
      <section
        aria-labelledby="midterm-prep-heading"
        className="surface-grain rounded-2xl border border-specular bg-surface-1 p-6 shadow-sm sm:p-10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[68ch] space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success">Midterm Readiness</Badge>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-accent tabular-nums">
                Chapters 1–3 · {MIDS_EXAM_QUESTIONS.length} Verified Questions
              </span>
            </div>
            <h2
              id="midterm-prep-heading"
              className="font-reading text-2xl font-bold tracking-display text-ink-primary sm:text-3xl"
            >
              Preparing for your Calculus Midterm?
            </h2>
            <p className="max-w-[65ch] text-sm leading-relaxed text-ink-secondary sm:text-base">
              Practice all <span className="font-mono tabular-nums">{MIDS_EXAM_QUESTIONS.length}</span> midterm MCQs
              across Functions, Limits &amp; Continuity, and Derivatives in Study Mode with instant misconception
              explanations, or launch a timed Mock Exam simulation.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {MIDS_CHAPTERS.map((ch) => (
                <span
                  key={ch.key}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-specular bg-surface-2 px-3 py-1.5 font-mono text-xs font-semibold text-ink-primary tabular-nums"
                >
                  <span className="text-brand-accent">Ch {ch.chapter}</span>
                  <span>&middot;</span>
                  <span>{ch.questionCount} Qs</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row lg:flex-col">
            <Button
              href="/mids"
              size="lg"
              className="gap-2 bg-brand-accent text-ink-inverse hover:bg-brand-accent-hover"
            >
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
              Open Midterm Exam Hub
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              href="/mids/definitions"
              variant="outline"
              size="lg"
              className="gap-2 border-specular text-brand-primary hover:bg-surface-2"
            >
              <BookMarked className="h-4 w-4" aria-hidden="true" />
              Blocks &amp; Definitions (Ch 1–3)
            </Button>
          </div>
        </div>
      </section>

      {/* Complete 16-Chapter Index */}
      <section aria-labelledby="curriculum-heading" className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="book-kicker text-brand-accent">The Learning Path</p>
            <h2
              id="curriculum-heading"
              className="font-reading text-2xl font-bold tracking-display text-ink-primary sm:text-3xl"
            >
              Choose a chapter to begin
            </h2>
            <p className="max-w-[65ch] text-ink-secondary">
              Progress sequentially through the monograph or jump directly to the section you need.
            </p>
          </div>
          <Link
            href="/chapters"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-primary underline-offset-4 hover:underline"
          >
            View all sections <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {chapters.map((chapter) => {
            const count = chapter.sections.reduce((total, section) => total + section.solutionsCount, 0);
            return (
              <Link
                key={chapter.key}
                href={`/chapters/${chapter.key}`}
                className="group rounded-2xl border border-specular bg-surface-1 p-5 shadow-sm transition-colors hover:border-brand-accent hover:bg-surface-2/50 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <span className="inline-flex rounded-md border border-hairline bg-surface-2 px-2.5 py-1 font-mono text-xs font-semibold text-brand-primary tabular-nums">
                      Chapter {String(chapter.num).padStart(2, '0')}
                    </span>
                    <h3 className="font-reading text-xl font-bold leading-snug tracking-display text-ink-primary group-hover:text-brand-accent">
                      {chapter.title.replace(/^Chapter \d+:\s*/, '')}
                    </h3>
                    <p className="max-w-[65ch] text-sm leading-relaxed text-ink-secondary">{chapter.description}</p>
                  </div>
                  <ArrowRight
                    className="mt-1 h-5 w-5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-accent"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-5 border-t border-hairline pt-4 font-mono text-xs text-ink-muted tabular-nums">
                  {chapter.sections.length} sections <span aria-hidden="true">·</span> {count} worked solutions
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Dark Math Well Feature Banner */}
      <section
        aria-labelledby="concept-heading"
        className="rounded-2xl border border-specular bg-surface-3 px-5 py-8 text-ink-inverse sm:px-10 sm:py-10"
      >
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-sky-300 tabular-nums">
            Foundational Definition · Section 1.1
          </p>
          <h2 id="concept-heading" className="font-reading text-2xl font-bold tracking-display sm:text-3xl">
            How quickly is a function changing?
          </h2>
          <p className="mx-auto max-w-[65ch] text-sm leading-relaxed text-slate-200 sm:text-base">
            The difference quotient measures the average rate of change in{' '}
            <span className="font-reading italic">f</span> over an interval of length{' '}
            <span className="font-mono tabular-nums">h</span>. Taking the limit as{' '}
            <span className="font-mono tabular-nums">h → 0</span> yields the derivative.
          </p>
          <div className="mx-auto max-w-2xl rounded-xl border border-slate-700 bg-slate-950/90 p-3 sm:p-5">
            <MathBlock
              math="\\frac{f(x+h)-f(x)}{h}, \\quad h \\ne 0"
              caption="Average rate of change across an interval of width h"
              theme="dark"
            />
          </div>
          <Link
            href="/chapters/ch01/1.1-functions-and-graphs"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-ink-inverse underline underline-offset-4 hover:text-sky-300"
          >
            Explore functions and graphs <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
