'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { MathBlock } from '@/components/math/MathBlock';
import { InlineMath } from '@/components/math/InlineMath';
import { SectionContentData } from '@/lib/content/loader';
import { Solution } from '@/lib/content/schema';

interface BookSectionReaderProps {
  data: SectionContentData;
  summary?: React.ReactNode;
  prevSection?: {
    title: string;
    number: string;
    href: string;
  } | null;
  nextSection?: {
    title: string;
    number: string;
    href: string;
  } | null;
}

const DifficultyLabel: Record<string, string> = {
  tier1: 'Warm-up',
  tier2: 'Core practice',
  tier3: 'Challenge',
  easy: 'Warm-up',
  medium: 'Core practice',
  hard: 'Challenge',
};

const CategoryLabel: Record<string, string> = {
  definition: 'Definition',
  theorem: 'Theorem',
  formula: 'Formula',
  rule: 'Rule',
  test: 'Test',
};

export function BookSectionReader({
  data,
  summary,
  prevSection,
  nextSection,
}: BookSectionReaderProps) {
  const chapterNum = data.chapterKey.replace(/\D/g, '') || '1';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const scrollToExample = (behavior: ScrollBehavior) => {
      const searchParams = new URLSearchParams(window.location.search);
      const tabParam = searchParams.get('tab');
      const hash = window.location.hash.toLowerCase();

      if (hash.startsWith('#ex') || hash.startsWith('#exercise') || hash.startsWith('#solution')) {
        const target = hash.replace(/^#/, '');
        const matched = document.getElementById(
          target.startsWith('solution-') ? target : `solution-${target}`
        );
        if (matched) {
          matched.scrollIntoView({ behavior, block: 'start' });
          return;
        }
      }

      if (tabParam === 'solutions' || hash === '#solutions') {
        document
          .getElementById('worked-examples')
          ?.scrollIntoView({ behavior, block: 'start' });
        return;
      }

      if (tabParam === 'theory' || hash === '#theory') {
        document
          .getElementById('section-notes')
          ?.scrollIntoView({ behavior, block: 'start' });
      }
    };

    const timer = window.setTimeout(() => scrollToExample('smooth'), 120);
    const onNavigate = () => scrollToExample('smooth');
    window.addEventListener('hashchange', onNavigate);
    window.addEventListener('popstate', onNavigate);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('hashchange', onNavigate);
      window.removeEventListener('popstate', onNavigate);
    };
  }, [data.sectionKey]);

  const definitions = data.definitionsFile?.definitions ?? [];

  return (
    <article className="space-y-8 sm:space-y-10">
      {/* ——— Section opener ——— */}
      <header className="book-page px-5 py-10 text-center sm:px-12 sm:py-14">
        <p className="book-kicker">
          Thomas&rsquo; Calculus &middot; Chapter {chapterNum} &middot; Section {data.sectionNumber}
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl font-reading text-4xl font-bold tracking-tight text-[#1f1a13] sm:text-5xl [text-wrap:balance]">
          {data.title}
        </h1>
        <div className="book-rule my-6 max-w-xs mx-auto">
          <span className="book-ornament">&#10086;</span>
        </div>
        <p className="mx-auto max-w-[58ch] font-reading text-[#6d6357] italic leading-relaxed">
          Read this page the way you would a book: first the notes, then the key
          ideas, then every worked example in order &mdash; each step explains not
          only what to do, but why it works.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-reading text-sm text-[#7c5c2e]">
          <Link href={`/practice/${data.sectionKey}`} className="underline underline-offset-4 hover:text-[#5c431f]">
            Try interactive practice &rarr;
          </Link>
          <Link href={`/quiz/${data.chapterKey}`} className="underline underline-offset-4 hover:text-[#5c431f]">
            Take the chapter quiz &rarr;
          </Link>
        </div>
      </header>

      {/* ——— Part One: Section notes ——— */}
      {summary && (
        <section id="section-notes" className="book-page scroll-mt-24 px-5 py-8 sm:px-12 sm:py-10">
          <p className="book-kicker">Part One</p>
          <h2 className="mt-2 font-reading text-3xl font-bold text-[#1f1a13]">
            <span className="book-part-number">Section Notes</span>
          </h2>
          <div className="book-rule my-5 max-w-xs">
            <span className="book-ornament">&#10087;</span>
          </div>
          <div className="book-prose book-dropcap mdx-content">
            {summary}
          </div>
        </section>
      )}

      {/* ——— Part Two: Key ideas ——— */}
      {definitions.length > 0 && (
        <section className="book-page px-5 py-8 sm:px-12 sm:py-10">
          <p className="book-kicker">Part Two</p>
          <h2 className="mt-2 font-reading text-3xl font-bold text-[#1f1a13]">
            <span className="book-part-number">Key Ideas to Remember</span>
          </h2>
          <p className="mt-3 max-w-[62ch] font-reading text-[#6d6357] italic">
            {definitions.length} essential statements for this section, each with a
            plain-words explanation.
          </p>
          <div className="mt-7 space-y-8">
            {definitions.map((def, i) => (
              <div key={def.id}>
                <h3 className="font-reading text-xl font-bold text-[#1f1a13]">
                  <span className="book-part-number text-[#7c5c2e]">
                    {CategoryLabel[def.category] ?? def.category}
                  </span>{' '}
                  {i + 1}. &mdash; {def.title}
                </h3>

                {def.latex && (
                  <div className="my-3 rounded-sm border border-[#e8dfcc] bg-[#fffdf8] px-3 py-1">
                    <MathBlock math={def.latex} />
                  </div>
                )}

                <p className="book-prose mt-2">{def.statement}</p>

                {def.conditions && def.conditions.length > 0 && (
                  <p className="mt-2 pl-4 font-reading text-sm text-[#6d6357]">
                    <em>Conditions:</em>{' '}
                    {def.conditions.join('; ')}
                  </p>
                )}

                <p className="mt-3 border-l-2 border-[#c9b892] bg-[#f6f1e7]/60 py-2 pl-4 pr-3 font-reading text-[0.98rem] italic text-[#4a4234]">
                  In plain words: {def.explanation}
                </p>

                {def.keyTakeaway && (
                  <p className="mt-2 pl-4 font-reading text-sm text-[#3f5a3a]">
                    <strong className="font-reading">Remember &mdash;</strong> {def.keyTakeaway}
                  </p>
                )}

                {i < definitions.length - 1 && (
                  <div className="book-rule mt-8 max-w-[10rem]">
                    <span className="book-ornament">&bull; &bull; &bull;</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ——— Part Three: Worked examples ——— */}
      <section id="worked-examples" className="book-page scroll-mt-24 px-5 py-8 sm:px-12 sm:py-10">
        <p className="book-kicker">Part Three</p>
        <h2 className="mt-2 font-reading text-3xl font-bold text-[#1f1a13]">
          <span className="book-part-number">Worked Examples</span>
        </h2>
        <p className="mt-3 max-w-[62ch] font-reading text-[#6d6357] italic">
          {data.solutions.length} exercises, solved in full. Every answer has been
          checked symbolically with SymPy before printing.
        </p>

        {data.solutions.length === 0 ? (
          <p className="mt-6 font-reading text-[#6d6357] italic">
            The worked examples for this section are being set in type and will
            appear here shortly.
          </p>
        ) : (
          <div className="mt-8 space-y-10">
            {data.solutions.map((sol: Solution, i: number) => {
              const slug = sol.id.split('/').pop() || 'item';
              return (
                <article
                  key={sol.id}
                  id={`solution-${slug}`}
                  className="book-example scroll-mt-24"
                >
                  <header className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-[#e5dcc9] pb-2">
                    <h3 className="font-reading text-xl font-bold text-[#1f1a13]">
                      Example {i + 1}
                      <span className="ml-2 font-normal italic text-[#6d6357]">
                        ({sol.exerciseReference})
                      </span>
                    </h3>
                    <p className="book-kicker">
                      {DifficultyLabel[sol.difficulty] ?? sol.difficulty}
                    </p>
                  </header>

                  <p className="mt-4 font-reading text-[0.98rem] italic text-[#4a4234]">
                    <strong className="not-italic">Problem.</strong> {sol.problemStatement}
                  </p>

                  <div className="mt-4 space-y-5">
                    <p className="font-reading font-semibold text-[#1f1a13]">Solution.</p>
                    {sol.steps.map((step) => (
                      <div key={step.stepNumber} className="flex gap-3">
                        <span className="mt-0.5 w-6 shrink-0 text-right font-reading text-sm font-bold text-[#7c5c2e]">
                          {step.stepNumber}.
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-reading font-semibold text-[#1f1a13]">
                            {step.title}
                          </p>
                          {step.mathExpression && (
                            <div className="mt-1">
                              <MathBlock math={step.mathExpression} />
                            </div>
                          )}
                          <p className="book-prose mt-1.5 text-[1rem]">{step.explanation}</p>
                          <p className="mt-2 border-l-2 border-[#c9b892] pl-3 font-reading text-[0.92rem] italic leading-relaxed text-[#5a5142]">
                            Why this works: {step.why}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-sm border border-[#cdd8c6] bg-[#f2f6ee] px-4 py-3">
                    <p className="font-reading text-[1.02rem] text-[#24331e]">
                      <strong>Answer.</strong>{' '}
                      <span className="font-semibold">
                        <InlineMath math={sol.finalAnswer} />
                      </span>
                    </p>
                    <p className="font-reading text-xs italic text-[#4f6148]">
                      &mdash; verified by the SymPy engine
                    </p>
                  </div>

                  {i < data.solutions.length - 1 && (
                    <div className="book-rule mt-9 max-w-[10rem]">
                      <span className="book-ornament">&bull; &bull; &bull;</span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ——— Page footer: folio + turn-the-page navigation ——— */}
      <nav
        aria-label="Section navigation"
        className="flex items-center justify-between gap-4 border-t border-[#e5dcc9] pt-6 font-reading"
      >
        <span className="min-w-0 flex-1">
          {prevSection ? (
            <Link
              href={prevSection.href}
              className="group inline-flex flex-col text-sm text-[#6d6357] hover:text-[#1f1a13]"
            >
              <span className="book-kicker group-hover:text-[#7c5c2e]">&larr; Previous section</span>
              <span className="mt-1 font-semibold">
                {prevSection.number}. {prevSection.title}
              </span>
            </Link>
          ) : (
            <span className="text-sm italic text-[#a4967c]">
              &mdash; beginning of the book &mdash;
            </span>
          )}
        </span>

        <span className="shrink-0 text-xs italic tracking-widest text-[#a4967c]">
          p. {chapterNum}&middot;{data.sectionNumber}
        </span>

        <span className="min-w-0 flex-1 text-right">
          {nextSection ? (
            <Link
              href={nextSection.href}
              className="group inline-flex flex-col text-sm text-[#6d6357] hover:text-[#1f1a13]"
            >
              <span className="book-kicker group-hover:text-[#7c5c2e]">Next section &rarr;</span>
              <span className="mt-1 font-semibold">
                {nextSection.number}. {nextSection.title}
              </span>
            </Link>
          ) : (
            <span className="text-sm italic text-[#a4967c]">
              end of chapter &mdash; <Link href={`/chapters/${data.chapterKey}`} className="underline">return to contents</Link>
            </span>
          )}
        </span>
      </nav>
    </article>
  );
}
