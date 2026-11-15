import type { Metadata } from 'next';
import Link from 'next/link';
import { BookMarked, CheckCircle2, FileCheck2, FileText, GraduationCap, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { MidsExamHub } from '@/components/mids/MidsExamHub';
import { MIDS_CHAPTERS, MIDS_EXAM_QUESTIONS } from '@/lib/content/mids-exam-data';
import { MIDS_DEFINITION_BLOCKS } from '@/lib/content/mids-definitions-data';
import { AUTHOR_NAME, AUTHOR_URL, SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Midterm Exam Preparation (Chapters 1–3) | 65 Verified MCQs & Mock Simulator",
  description:
    'Dedicated midterm exam practice bank and timed mock exam simulator covering Chapter 1 (Functions), Chapter 2 (Limits & Continuity), and Chapter 3 (Derivatives) with distractor misconception diagnostics.',
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
  alternates: {
    canonical: '/mids',
  },
  openGraph: {
    title: `Midterm Exam Preparation (Chapters 1–3) | ${SITE_NAME}`,
    description:
      'Practice 65 verified midterm MCQs across Functions, Limits & Continuity, and Derivatives in Study Mode or Timed Mock Exam Mode.',
    url: `${SITE_URL}/mids`,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Midterm Exam Preparation (Chapters 1–3) | Thomas' Calculus",
    description: '65 verified midterm MCQs with distractor misconception explanations and timed mock simulator.',
    creator: '@AbdullahMalik17',
  },
};

export default function MidsExamPage() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link href="/" className="hover:text-blue-700">
          Home
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-800">Midterm Exam Prep</span>
      </nav>

      {/* Midterm Companion Switcher Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#b8d6d0] bg-gradient-to-r from-[#f2f8f7] via-white to-[#eef4fb] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#174f4a] sm:text-sm">
          <BookMarked className="h-4 w-4 text-[#176b63] shrink-0" aria-hidden="true" />
          <span>Midterm Prep Hub (Chapters 1–3):</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/mids/definitions"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#176b63] hover:text-[#174f4a] transition-colors"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Blocks &amp; Definitions ({MIDS_DEFINITION_BLOCKS.length}) &rarr;
          </Link>
          <span
            aria-current="page"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#176b63] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm"
          >
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            {MIDS_EXAM_QUESTIONS.length} MCQs &amp; Mock Simulator
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl border border-[#dbe2ea] bg-white px-5 py-8 shadow-sm sm:px-10 sm:py-10">
        <div
          className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-bl from-[#e8f1ef] via-[#f2f5f7] to-transparent lg:block"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">Midterm Exam Bank</Badge>
            <Badge variant="success">Chapters 1–3</Badge>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#176b63]" aria-hidden="true" />
              {MIDS_EXAM_QUESTIONS.length} Verified Multiple-Choice Questions
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#172b43] sm:text-4xl">
            Midterm Exam Preparation &amp; Mock Simulator
          </h1>

          <p className="reading-copy text-base leading-relaxed text-slate-600">
            Master the core midterm syllabus across Functions, Limits &amp; Continuity, and Derivatives. Practice
            question-by-question with instant misconception feedback in Study Mode, or test yourself under timed exam
            conditions in Mock Exam Mode.
          </p>

          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            {MIDS_CHAPTERS.map((ch) => (
              <div
                key={ch.key}
                className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#174f4a]">
                    <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                    Chapter {ch.chapter}
                  </span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-slate-700 border border-slate-200">
                    {ch.questionCount} Qs
                  </span>
                </div>
                <p className="text-xs font-bold text-[#172b43]">{ch.title.replace(/^Chapter \d+:\s*/, '')}</p>
                <p className="text-[11px] leading-snug text-slate-600">{ch.description}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <FileCheck2 className="h-4 w-4 text-[#176b63] shrink-0" aria-hidden="true" />
            <span>Every question includes 4 standardized options, distractor misconception notes, and full KaTeX solutions.</span>
          </div>
        </div>
      </section>

      {/* Interactive Study & Mock Exam Hub */}
      <MidsExamHub />
    </div>
  );
}
