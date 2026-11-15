import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  FileText,
  GraduationCap,
  Presentation,
  Sliders,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import {
  EpsilonDeltaExplorer,
  SecantTangentExplorer,
  RiemannSumVisualizer,
} from '@/components/math/visualizers';
import { MIDS_EXAM_QUESTIONS } from '@/lib/content/mids-exam-data';
import { MIDS_DEFINITION_BLOCKS } from '@/lib/content/mids-definitions-data';

export const metadata: Metadata = {
  title: "Interactive Calculus Visualizers & Midterm Review Lab | Thomas' Calculus Guide",
  description:
    'Interactive React + SVG calculus visualizers for Epsilon-Delta limits (Ch 2), Secant-to-Tangent derivatives (Ch 3), and Riemann Sum integration (Ch 5), paired with the 10-slide Midterm Review Deck and 65-MCQ Exam Simulator.',
};

export default function MidtermVisualizersPage() {
  return (
    <div className="space-y-10">
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
        <span className="font-medium text-slate-800">Interactive Visualizers &amp; Review Lab</span>
      </nav>

      {/* Midterm Companion Switcher Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#b8d6d0] bg-gradient-to-r from-[#f2f8f7] via-white to-[#eef4fb] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#174f4a] sm:text-sm">
          <BookMarked className="h-4 w-4 text-[#176b63] shrink-0" aria-hidden="true" />
          <span>Midterm Prep &amp; Interactive Learning Suite:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/mids"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#176b63] hover:text-[#174f4a] transition-colors"
          >
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            {MIDS_EXAM_QUESTIONS.length} MCQs &amp; Mock Simulator
          </Link>
          <Link
            href="/mids/definitions"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#176b63] hover:text-[#174f4a] transition-colors"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Blocks &amp; Definitions ({MIDS_DEFINITION_BLOCKS.length})
          </Link>
          <span
            aria-current="page"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#176b63] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm"
          >
            <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
            Interactive Visualizers Lab
          </span>
          <a
            href="/slides/calculus-midterm-review.html"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e3a5f] bg-[#1e3a5f] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#142d4d] transition-colors"
          >
            <Presentation className="h-3.5 w-3.5" aria-hidden="true" />
            10-Slide Lecture Deck &rarr;
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-[#dbe2ea] bg-white px-5 py-8 shadow-sm sm:px-10 sm:py-10">
        <div
          className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-bl from-[#e8f1ef] via-[#eef4fb] to-transparent lg:block"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">Interactive Mathematical Visualizers</Badge>
            <Badge variant="success">Chapters 2, 3 &amp; 5</Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#172b43] sm:text-4xl">
            Interactive Calculus Visualizers &amp; Midterm Lecture Lab
          </h1>
          <p className="reading-copy text-base leading-relaxed text-slate-600">
            Explore the three foundational limit processes of single-variable calculus through live SVG geometric simulations: the precise{' '}
            <strong>ε-δ limit band</strong> (Chapter 2), the <strong>secant-to-tangent difference quotient</strong> (Chapter 3), and{' '}
            <strong>Riemann sum convergence</strong> to the definite integral (Chapter 5).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/slides/calculus-midterm-review.html"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1e3a5f] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#142d4d] transition-colors sm:text-sm"
            >
              <Presentation className="h-4 w-4" aria-hidden="true" />
              Launch 10-Slide Midterm Review Presentation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/mids"
              className="inline-flex items-center gap-2 rounded-xl border border-[#176b63] bg-emerald-50/70 px-4 py-2.5 text-xs font-semibold text-[#174f4a] hover:bg-emerald-100/70 transition-colors sm:text-sm"
            >
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              Practice {MIDS_EXAM_QUESTIONS.length} Midterm MCQs &amp; Timed Simulator
            </Link>
          </div>
        </div>
      </section>

      {/* Visualizer 1: Epsilon-Delta */}
      <div id="epsilon-delta" className="scroll-mt-24 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <h2 className="text-xl font-bold text-[#172b43] sm:text-2xl">
            1. Precise Limit Definition (ε–δ Target Explorer)
          </h2>
          <Link
            href="/chapters/ch02/2.3-the-precise-definition-of-a-limit"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176b63] hover:underline"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Read Section 2.3 Full Notes &amp; Solutions &rarr;
          </Link>
        </div>
        <EpsilonDeltaExplorer />
      </div>

      {/* Visualizer 2: Secant-Tangent */}
      <div id="secant-tangent" className="scroll-mt-24 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <h2 className="text-xl font-bold text-[#172b43] sm:text-2xl">
            2. Difference Quotient &amp; Tangent Slope (h → 0 Explorer)
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/chapters/ch02/2.1-rates-of-change-and-tangents-to-curves"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176b63] hover:underline"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Section 2.1 Notes &rarr;
            </Link>
            <Link
              href="/chapters/ch03/3.1-tangents-and-the-derivative-at-a-point"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176b63] hover:underline"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Section 3.1 Notes &rarr;
            </Link>
          </div>
        </div>
        <SecantTangentExplorer />
      </div>

      {/* Visualizer 3: Riemann Sums */}
      <div id="riemann-sums" className="scroll-mt-24 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <h2 className="text-xl font-bold text-[#172b43] sm:text-2xl">
            3. Definite Integral &amp; Riemann Sums (N = 2 … 64 Explorer)
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/chapters/ch05/5.1-area-and-estimating-with-finite-sums"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176b63] hover:underline"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Section 5.1 Notes &rarr;
            </Link>
            <Link
              href="/chapters/ch05/5.3-the-definite-integral"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176b63] hover:underline"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Section 5.3 Notes &rarr;
            </Link>
          </div>
        </div>
        <RiemannSumVisualizer />
      </div>
    </div>
  );
}
