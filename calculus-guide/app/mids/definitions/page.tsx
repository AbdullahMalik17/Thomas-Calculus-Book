import type { Metadata } from 'next';
import Link from 'next/link';
import { BookMarked, CheckCircle2, FileText, GraduationCap, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { MidsDefinitionsHub } from '@/components/mids/MidsDefinitionsHub';
import { MIDS_DEF_CHAPTERS, MIDS_DEFINITION_BLOCKS } from '@/lib/content/mids-definitions-data';
import { AUTHOR_NAME, AUTHOR_URL, SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Midterm Definitions & Textbook Blocks (Chapters 1–3)",
  description:
    'Clear, two-level explanations of every key Definition, Theorem, Rule, and Test in Chapters 1–3 of Thomas’ Calculus (Functions, Limits & Continuity, Derivatives) for both foundation and advanced students.',
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
  alternates: {
    canonical: '/mids/definitions',
  },
  openGraph: {
    title: `Midterm Definitions & Textbook Blocks (Chapters 1–3) | ${SITE_NAME}`,
    description:
      'Two-level intuition, quick examples, interactive diagrams, and subtle exam traps for all core Definitions, Theorems, and Rules in Chapters 1–3.',
    url: `${SITE_URL}/mids/definitions`,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Midterm Definitions & Textbook Blocks (Ch 1–3) | Thomas' Calculus",
    description: 'Two-level explanations, geometric diagrams, and exam traps for Chapters 1–3.',
    creator: '@AbdullahMalik17',
  },
};

export default function MidsDefinitionsPage() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link href="/" className="hover:text-blue-700">
          Home
        </Link>
        <span>/</span>
        <Link href="/mids" className="hover:text-blue-700">
          Midterm Exam Prep
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-800">Blocks &amp; Definitions</span>
      </nav>

      {/* Midterm Companion Switcher Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#b8d6d0] bg-gradient-to-r from-[#f2f8f7] via-white to-[#eef4fb] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#174f4a] sm:text-sm">
          <BookMarked className="h-4 w-4 text-[#176b63] shrink-0" aria-hidden="true" />
          <span>Midterm Prep Hub (Chapters 1–3):</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            aria-current="page"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#176b63] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Blocks &amp; Definitions ({MIDS_DEFINITION_BLOCKS.length})
          </span>
          <Link
            href="/mids"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#176b63] hover:text-[#174f4a] transition-colors"
          >
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            65 MCQs &amp; Mock Simulator &rarr;
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl border border-[#dbe2ea] bg-white px-5 py-8 shadow-sm sm:px-10 sm:py-10">
        <div
          className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-bl from-[#e0f2fe] via-[#f0fdfa] to-transparent lg:block"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">Textbook Blocks &amp; Definitions</Badge>
            <Badge variant="success">Chapters 1–3 Only</Badge>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#176b63]" aria-hidden="true" />
              {MIDS_DEFINITION_BLOCKS.length} Core Definitions, Theorems &amp; Rules
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#172b43] sm:text-4xl">
            Midterm Definitions &amp; Important Textbook Blocks
          </h1>

          <p className="reading-copy text-base leading-relaxed text-slate-600">
            Every key <strong>Definition</strong>, <strong>Theorem</strong>, <strong>Test</strong>, and{' '}
            <strong>Rule</strong> from Chapters 1, 2, and 3 explained in plain English first so struggling students
            build rock-solid intuition—followed by quick 10-second examples, visual diagrams, and subtle exam traps
            for top scorers.
          </p>

          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            {MIDS_DEF_CHAPTERS.map((ch) => {
              const count = MIDS_DEFINITION_BLOCKS.filter((b) => b.chapter === ch.chapter).length;
              return (
                <div
                  key={ch.chapter}
                  className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#174f4a]">
                      <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                      Chapter {ch.chapter}
                    </span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-slate-700 border border-slate-200">
                      {count} Blocks
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#172b43]">
                    {ch.title.replace(/^Chapter \d+:\s*/, '')} ({ch.sectionsRange})
                  </p>
                  <p className="text-[11px] leading-snug text-slate-600">{ch.summary}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Blocks & Definitions Hub */}
      <MidsDefinitionsHub />
    </div>
  );
}
