import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck } from 'lucide-react';
import { MidsDefinitionsHub } from '@/components/mids/MidsDefinitionsHub';
import { getMidsDefinitions } from '@/lib/content/mids-definitions-data';

export const metadata: Metadata = {
  title: "Midterm Definitions | Thomas' Calculus Guide",
  description:
    'Beginner-friendly definitions, formulas, examples, and exam warnings for Chapters 1–3.',
};

export default function MidsDefinitionsPage() {
  const definitions = getMidsDefinitions();

  return (
    <div className="space-y-7">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/mids" className="hover:text-blue-700">Midterm Prep</Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-slate-800">Definitions</span>
      </nav>

      <section className="rounded-2xl border border-[#dbe2ea] bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#edf8f5] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#176b63]">
            <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
            Midterm definitions
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#172b43] sm:text-4xl">
            Start with the idea, then learn the rule.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Review the intuition first, see the formal idea, and practice it immediately. Chapters 1–3 are organized in a calm, repeatable order so you always know what to look for.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="#definitions"
              className="inline-flex items-center gap-2 rounded-xl bg-[#176b63] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0f4e49]"
            >
              Start with Chapter 1 <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/mids"
              className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              View exam practice
            </Link>
          </div>
        </div>
      </section>

      <section id="definitions" className="scroll-mt-24">
        <MidsDefinitionsHub definitions={definitions} />
      </section>
    </div>
  );
}
