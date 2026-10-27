import React from 'react';
import Link from 'next/link';
import { MathBlock } from '@/components/math/MathBlock';

import {
  CHAPTER_METADATA,
  normalizeChapterKey,
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
  const params: { ch: string }[] = [];
  for (let i = 1; i <= 16; i++) {
    const padded = i.toString().padStart(2, '0');
    params.push({ ch: `ch${padded}` });
    params.push({ ch: `${i}` });
  }
  return params;
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
        badgeVariant: 'info' as const,
        practiceCount: 0,
        mcqCount: 0,
        solutionsCount: 0,
      },
    ],
  };

  const totalSolutions = chapterMeta.sections.reduce((acc, s) => acc + s.solutionsCount, 0);
  const subject = chapterMeta.title.replace(/^Chapter\s*\d+\s*[:—-]\s*/i, '');

  return (
    <div className="mx-auto max-w-4xl space-y-8 sm:space-y-10">
      {/* Shelf marker */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-[#8a7a63]">
        <Link href="/chapters" className="hover:text-[#1f1a13]">All chapters</Link>
        <span aria-hidden="true">&rsaquo;</span>
        <span className="text-[#1f1a13]">Chapter {chapterMeta.num}</span>
      </nav>

      {/* ——— Frontispiece ——— */}
      <header className="book-page px-5 py-12 text-center sm:px-12 sm:py-16">
        <p className="book-kicker">Thomas&rsquo; Calculus &middot; 14th Edition Study Guide</p>
        <p className="mt-8 font-reading text-sm italic tracking-[0.3em] text-[#6d6357]">
          CHAPTER
        </p>
        <p className="font-reading text-[7rem] font-bold leading-none text-[#7c5c2e] sm:text-[9rem]">
          {chapterMeta.num}
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl font-reading text-4xl font-bold tracking-tight text-[#1f1a13] sm:text-5xl [text-wrap:balance]">
          {subject}
        </h1>
        <div className="book-rule mx-auto my-7 max-w-xs">
          <span className="book-ornament">&#10086;</span>
        </div>
        <p className="book-prose book-dropcap mx-auto text-left text-[1.02rem]">
          {chapterMeta.description}
        </p>
        <p className="mt-6 font-reading text-sm italic text-[#6d6357]">
          {chapterMeta.sections.length} lessons &middot; {totalSolutions} worked examples &middot; all answers checked with SymPy
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-reading text-sm text-[#7c5c2e]">
          {chapterMeta.sections[0] && (
            <Link
              href={`/chapters/${chapterMeta.key}/${chapterMeta.sections[0].id}`}
              className="underline underline-offset-4 hover:text-[#5c431f]"
            >
              Begin reading &mdash; Section {chapterMeta.sections[0].number} &rarr;
            </Link>
          )}
          <Link href={`/quiz/${chapterMeta.key}`} className="underline underline-offset-4 hover:text-[#5c431f]">
            Take the chapter quiz &rarr;
          </Link>
        </div>
      </header>

      {/* ——— Contents of this chapter ——— */}
      <section className="book-page px-5 py-8 sm:px-12 sm:py-10" aria-labelledby="chapter-contents-heading">
        <p className="book-kicker">Contents</p>
        <h2 id="chapter-contents-heading" className="mt-2 font-reading text-3xl font-bold text-[#1f1a13]">
          <span className="book-part-number">Lessons in This Chapter</span>
        </h2>
        <div className="book-rule my-5 max-w-xs">
          <span className="book-ornament">&#10087;</span>
        </div>

        <ol className="space-y-5">
          {chapterMeta.sections.map((sec) => (
            <li key={sec.id}>
              <Link
                href={`/chapters/${chapterMeta.key}/${sec.id}`}
                className="group block"
              >
                <span className="toc-line">
                  <span className="font-reading text-lg font-semibold text-[#1f1a13] group-hover:text-[#7c5c2e]">
                    {sec.number}&ensp;{sec.title}
                  </span>
                  <span className="toc-dots" aria-hidden="true" />
                  <span className="toc-folio">{sec.solutionsCount} examples</span>
                </span>
                <p className="mt-1 max-w-[64ch] font-reading text-sm italic leading-relaxed text-[#6d6357]">
                  {sec.description}
                </p>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-reading text-xs text-[#8a7a63]">
                  <span>{sec.status}</span>
                  {sec.practiceCount > 0 && (
                    <>
                      <span aria-hidden="true">&middot;</span>
                      <Link
                        href={`/practice/${sec.id}`}
                        className="underline underline-offset-2 hover:text-[#5c431f]"
                      >
                        {sec.practiceCount} interactive practice problems
                      </Link>
                    </>
                  )}
                  {sec.mcqCount > 0 && (
                    <>
                      <span aria-hidden="true">&middot;</span>
                      <span>{sec.mcqCount} concept checks</span>
                    </>
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ——— Guiding principle of the chapter ——— */}
      <section className="book-page px-5 py-8 sm:px-12 sm:py-10">
        <p className="book-kicker">{chapterMeta.theoremHeader}</p>
        <p className="mt-3 max-w-[64ch] font-reading text-[1.02rem] italic text-[#4a4234]">
          {chapterMeta.theoremIntro}
        </p>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2 border border-[#e5dcc9] bg-[#fffdf8] px-4 py-5 text-center">
            <p className="book-part-number font-reading text-sm font-semibold text-[#7c5c2e]">
              {chapterMeta.leftTheoremTitle}
            </p>
            <MathBlock math={chapterMeta.leftTheoremMath} />
          </div>
          <div className="space-y-2 border border-[#e5dcc9] bg-[#fffdf8] px-4 py-5 text-center">
            <p className="font-reading text-sm font-semibold text-[#7c5c2e]">
              {chapterMeta.rightTheoremTitle}
            </p>
            <MathBlock math={chapterMeta.rightTheoremMath} />
          </div>
        </div>
      </section>
    </div>
  );
}
