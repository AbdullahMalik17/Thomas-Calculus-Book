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
      <header className="book-page surface-grain px-5 py-10 text-center sm:px-12 sm:py-14">
        <p className="book-kicker font-mono tabular-nums">
          Thomas&rsquo; Calculus &middot; Chapter {chapterNum} &middot; Section {data.sectionNumber}
        </p>
        <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-wider text-brand-primary tabular-nums">
          By Muhammad Abdullah Athar · SymPy Verified
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-reading text-4xl font-bold tracking-display text-ink-primary sm:text-5xl [text-wrap:balance]">
          {data.title}
        </h1>
        <div className="book-rule my-6 max-w-xs mx-auto">
          <span className="book-ornament">&#10086;</span>
        </div>
        <p className="mx-auto max-w-[65ch] font-reading text-ink-secondary italic leading-relaxed">
          Read this page the way you would a book: first the notes, then the key
          ideas, then every worked example in order &mdash; each step explains not
          only what to do, but why it works.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-reading text-sm text-brand-primary">
          <Link href={`/practice/${data.sectionKey}`} className="underline underline-offset-4 hover:text-brand-accent">
            Try interactive practice &rarr;
          </Link>
          <Link href={`/quiz/${data.chapterKey}`} className="underline underline-offset-4 hover:text-brand-accent">
            Take the chapter quiz &rarr;
          </Link>
        </div>
      </header>

      {/* ——— Part One: Section notes ——— */}
      {summary && (
        <section id="section-notes" className="book-page surface-grain scroll-mt-24 px-5 py-8 sm:px-12 sm:py-10">
          <p className="book-kicker font-mono tabular-nums">Part One</p>
          <h2 className="mt-2 font-reading text-3xl font-bold tracking-display text-ink-primary">
            <span className="book-part-number">Section Notes</span>
          </h2>
          <div className="book-rule my-5 max-w-xs">
            <span className="book-ornament">&#10087;</span>
          </div>
          <div className="book-prose book-dropcap mdx-content max-w-[68ch]">
            {summary}
          </div>
        </section>
      )}

      {/* ——— Part Two: Key ideas (Theorems & Definitions Callouts) ——— */}
      {definitions.length > 0 && (
        <section className="book-page surface-grain px-5 py-8 sm:px-12 sm:py-10">
          <p className="book-kicker font-mono tabular-nums">Part Two</p>
          <h2 className="mt-2 font-reading text-3xl font-bold tracking-display text-ink-primary">
            <span className="book-part-number">Key Ideas to Remember</span>
          </h2>
          <p className="mt-3 max-w-[65ch] font-reading text-ink-secondary italic">
            <span className="font-mono not-italic tabular-nums">{definitions.length}</span> essential statements for this section, each with a
            plain-words explanation.
          </p>
          <div className="mt-7 space-y-6">
            {definitions.map((def, i) => {
              const isTheorem = def.category === 'theorem' || def.category === 'rule' || def.category === 'test';
              const calloutSurface = isTheorem ? 'callout-theorem' : 'callout-definition';
              return (
                <div
                  key={def.id}
                  className={`rounded-xl border border-specular p-5 sm:p-6 ${calloutSurface}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
                    <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-primary tabular-nums">
                      <span className="rounded border border-specular bg-surface-1 px-2 py-0.5 font-mono tabular-nums">
                        {CategoryLabel[def.category] ?? def.category} #{i + 1}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-ink-muted tabular-nums">
                      Sec {data.sectionNumber}
                    </span>
                  </div>

                  <h3 className="mt-3 font-reading text-xl font-bold tracking-display text-ink-primary">
                    {def.title}
                  </h3>

                  {def.latex && (
                    <div className="my-3 overflow-x-auto rounded-lg border border-specular bg-surface-1 px-3 py-2">
                      <MathBlock math={def.latex} />
                    </div>
                  )}

                  <p className="book-prose mt-2 max-w-[68ch] text-ink-primary">{def.statement}</p>

                  {def.conditions && def.conditions.length > 0 && (
                    <p className="mt-2 pl-4 font-reading text-sm text-ink-secondary">
                      <em>Conditions:</em> {def.conditions.join('; ')}
                    </p>
                  )}

                  <div className="mt-3 rounded-lg border border-specular bg-surface-1/85 py-2.5 pl-4 pr-3 font-reading text-[0.98rem] italic text-ink-secondary">
                    <strong className="font-mono text-xs uppercase tracking-wider not-italic text-brand-accent">
                      In plain words:{' '}
                    </strong>
                    {def.explanation}
                  </div>

                  {def.keyTakeaway && (
                    <p className="mt-2.5 pl-4 font-reading text-sm text-callout-theorem-ink">
                      <strong className="font-reading">Remember &mdash;</strong> {def.keyTakeaway}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ——— Part Three: Worked examples ——— */}
      <section id="worked-examples" className="book-page surface-grain scroll-mt-24 px-5 py-8 sm:px-12 sm:py-10">
        <p className="book-kicker font-mono tabular-nums">Part Three</p>
        <h2 className="mt-2 font-reading text-3xl font-bold tracking-display text-ink-primary">
          <span className="book-part-number">Worked Examples</span>
        </h2>
        <p className="mt-3 max-w-[65ch] font-reading text-ink-secondary italic">
          <span className="font-mono not-italic tabular-nums">{data.solutions.length}</span> exercises, solved in full. Every answer has been
          checked symbolically with SymPy before printing.
        </p>

        {data.solutions.length === 0 ? (
          <p className="mt-6 font-reading text-ink-muted italic">
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
                  className="book-example scroll-mt-24 rounded-xl border border-specular bg-surface-1/80 p-5 sm:p-7"
                >
                  <header className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-hairline pb-3">
                    <h3 className="font-reading text-xl font-bold tracking-display text-ink-primary">
                      <span className="mr-2 rounded border border-specular bg-surface-2 px-2 py-0.5 font-mono text-xs font-bold text-brand-primary tabular-nums">
                        Example {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-sm font-normal text-ink-muted tabular-nums">
                        ({sol.exerciseReference})
                      </span>
                    </h3>
                    <span className="rounded-full border border-specular bg-callout-example-bg px-2.5 py-0.5 font-mono text-xs font-semibold text-callout-example-ink tabular-nums">
                      {DifficultyLabel[sol.difficulty] ?? sol.difficulty}
                    </span>
                  </header>

                  <p className="mt-4 max-w-[68ch] font-reading text-[1rem] italic text-ink-primary">
                    <strong className="font-mono text-xs uppercase tracking-wider not-italic text-brand-primary">
                      Problem.{' '}
                    </strong>
                    {sol.problemStatement}
                  </p>

                  <div className="mt-5 space-y-5">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Step-by-Step Derivation ({sol.steps.length} steps)
                    </p>
                    {sol.steps.map((step) => (
                      <div key={step.stepNumber} className="flex gap-3.5">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-specular bg-surface-2 font-mono text-xs font-bold text-brand-primary tabular-nums">
                          {step.stepNumber}
                        </span>
                        <div className="min-w-0 flex-1 space-y-2">
                          <p className="font-reading font-bold text-ink-primary">
                            {step.title}
                          </p>
                          {step.mathExpression && (
                            <div className="overflow-x-auto rounded-lg border border-specular bg-surface-2 px-3 py-1.5">
                              <MathBlock math={step.mathExpression} />
                            </div>
                          )}
                          <p className="book-prose max-w-[68ch] text-[1rem]">{step.explanation}</p>
                          <div className="callout-example rounded-lg border border-specular px-3.5 py-2 font-reading text-[0.92rem] italic leading-relaxed">
                            <strong className="font-mono text-xs uppercase tracking-wider not-italic text-callout-example-ink">
                              Why this works:{' '}
                            </strong>
                            {step.why}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="callout-theorem mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg border border-specular px-4 py-3">
                    <p className="font-reading text-[1.02rem] text-callout-theorem-ink">
                      <strong className="font-mono text-xs uppercase tracking-wider">Answer: </strong>{' '}
                      <span className="font-semibold">
                        <InlineMath math={sol.finalAnswer} />
                      </span>
                    </p>
                    <p className="font-mono text-xs text-brand-accent tabular-nums">
                      &#10003; Verified by SymPy CAS
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ——— Page footer: folio + turn-the-page navigation ——— */}
      <nav
        aria-label="Section navigation"
        className="flex items-center justify-between gap-4 border-t border-specular pt-6 font-reading"
      >
        <span className="min-w-0 flex-1">
          {prevSection ? (
            <Link
              href={prevSection.href}
              className="group inline-flex flex-col text-sm text-ink-secondary hover:text-ink-primary"
            >
              <span className="book-kicker group-hover:text-brand-accent">&larr; Previous section</span>
              <span className="mt-1 font-semibold">
                <span className="font-mono tabular-nums">{prevSection.number}.</span> {prevSection.title}
              </span>
            </Link>
          ) : (
            <span className="text-sm italic text-ink-muted">
              &mdash; beginning of the book &mdash;
            </span>
          )}
        </span>

        <span className="shrink-0 rounded border border-hairline bg-surface-2 px-2.5 py-1 font-mono text-xs tracking-widest text-ink-muted tabular-nums">
          p. {chapterNum}&middot;{data.sectionNumber}
        </span>

        <span className="min-w-0 flex-1 text-right">
          {nextSection ? (
            <Link
              href={nextSection.href}
              className="group inline-flex flex-col text-sm text-ink-secondary hover:text-ink-primary"
            >
              <span className="book-kicker group-hover:text-brand-accent">Next section &rarr;</span>
              <span className="mt-1 font-semibold">
                <span className="font-mono tabular-nums">{nextSection.number}.</span> {nextSection.title}
              </span>
            </Link>
          ) : (
            <span className="text-sm italic text-ink-muted">
              end of chapter &mdash; <Link href={`/chapters/${data.chapterKey}`} className="underline">return to contents</Link>
            </span>
          )}
        </span>
      </nav>
    </article>
  );
}
