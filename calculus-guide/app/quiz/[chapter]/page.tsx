import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { BrainCircuit } from 'lucide-react';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { CHAPTER_METADATA, normalizeChapterKey } from '@/lib/content/curriculum';
import {
  AUTHOR_NAME,
  AUTHOR_PERSON_JSON_LD,
  AUTHOR_URL,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo';

interface QuizPageProps {
  params: {
    chapter: string;
  };
}

export function generateMetadata({ params }: QuizPageProps): Metadata {
  const normalizedKey = normalizeChapterKey(params.chapter);
  const chapterMeta = CHAPTER_METADATA[normalizedKey];
  const chapterNumber = chapterMeta?.num || Number.parseInt(params.chapter.replace(/\D/g, ''), 10) || 1;
  const canonicalKey = chapterMeta?.key || `ch${String(chapterNumber).padStart(2, '0')}`;
  const canonicalPath = `/quiz/${canonicalKey}`;
  const chapterTitle = chapterMeta?.title || `Chapter ${chapterNumber}`;
  const subject = chapterTitle.replace(/^Chapter\s*\d+\s*[:—-]\s*/i, '');

  const title = `${chapterTitle} — Diagnostic MCQ Quiz & Misconception Check`;
  const description = `Interactive multiple-choice diagnostic quiz for ${chapterTitle} of Thomas' Calculus (14th Edition). Test conceptual understanding of ${subject} with instant distractor misconception explanations by ${AUTHOR_NAME}.`;

  return {
    title,
    description,
    keywords: [
      `${chapterTitle} Quiz`,
      `Thomas' Calculus Chapter ${chapterNumber} MCQs`,
      `${subject} Calculus Quiz`,
      'Calculus Misconception Diagnostics',
      AUTHOR_NAME,
    ],
    authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
    creator: AUTHOR_NAME,
    publisher: AUTHOR_NAME,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Thomas' Calculus`,
      description,
      creator: '@AbdullahMalik17',
    },
  };
}

export function generateStaticParams() {
  return Object.keys(CHAPTER_METADATA).map((key) => ({ chapter: key }));
}

export default function QuizPage({ params }: QuizPageProps) {
  const { chapter } = params;
  const normalizedKey = normalizeChapterKey(chapter);
  const chapterMeta = CHAPTER_METADATA[normalizedKey];
  const chapterNumber = chapterMeta?.num || Number.parseInt(chapter.replace(/\D/g, ''), 10) || 1;
  const canonicalKey = chapterMeta?.key || `ch${String(chapterNumber).padStart(2, '0')}`;
  const chapterTitle = chapterMeta?.title || `Chapter ${chapterNumber}`;
  const quizUrl = `${SITE_URL}/quiz/${canonicalKey}`;

  const sampleMCQs = [
    {
      id: 'mcq-01',
      question:
        'What is the natural domain of the rational function f(x) = (x^2 - 4) / (x - 2)?',
      math: 'f(x) = \\frac{x^2 - 4}{x - 2}',
      options: [
        {
          id: 'A',
          label: 'A',
          text: 'All real numbers: (-infty, infty)',
          isCorrect: false,
          misconception:
            'Canceling the factor (x - 2) algebraically before identifying the domain. The denominator is undefined at x = 2 in the original expression.',
        },
        {
          id: 'B',
          label: 'B',
          text: 'All real numbers except x = 2: (-infty, 2) U (2, infty)',
          isCorrect: true,
          misconception: '',
        },
        {
          id: 'C',
          label: 'C',
          text: 'All real numbers except x = 2 and x = -2',
          isCorrect: false,
          misconception:
            'Confusing numerator roots with domain restrictions. The numerator being zero at x = -2 yields f(-2) = 0, which is perfectly valid.',
        },
        {
          id: 'D',
          label: 'D',
          text: '[2, infty)',
          isCorrect: false,
          misconception:
            'Confusing rational functions with square root radical constraints. No square root is present.',
        },
      ],
      explanation:
        'The natural domain is determined by the unsimplified expression. Division by zero occurs when x - 2 = 0, which implies x = 2 must be excluded.',
    },
    {
      id: 'mcq-02',
      question:
        'Which of the following functions is an odd function (symmetric about the origin)?',
      math: 'f(-x) = -f(x)',
      options: [
        {
          id: 'A',
          label: 'A',
          text: 'f(x) = x^3 - x',
          isCorrect: true,
          misconception: '',
        },
        {
          id: 'B',
          label: 'B',
          text: 'f(x) = x^3 + 1',
          isCorrect: false,
          misconception:
            'Assuming adding a nonzero constant to an odd power retains odd symmetry. Notice f(-0) = 1 but -f(0) = -1, failing symmetry.',
        },
        {
          id: 'C',
          label: 'C',
          text: 'f(x) = |x|',
          isCorrect: false,
          misconception:
            'Confusing odd symmetry with even symmetry. Absolute value satisfies |-x| = |x|, which is even (y-axis reflection).',
        },
        {
          id: 'D',
          label: 'D',
          text: 'f(x) = x^2 - 4',
          isCorrect: false,
          misconception:
            'Equating polynomial with even powers to odd behavior. Since (-x)^2 - 4 = x^2 - 4, this function is strictly even.',
        },
      ],
      explanation:
        'Testing f(-x): (-x)^3 - (-x) = -x^3 + x = -(x^3 - x) = -f(x). Thus f is an odd function.',
    },
  ];

  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      AUTHOR_PERSON_JSON_LD,
      {
        '@type': 'LearningResource',
        '@id': `${quizUrl}#learning-resource`,
        name: `${chapterTitle} — Diagnostic & Conceptual MCQ Quiz`,
        url: quizUrl,
        description: `Multiple-choice conceptual diagnostic quiz for ${chapterTitle} of Thomas' Calculus (14th Edition) with distractor misconception explanations.`,
        learningResourceType: ['Quiz', 'Diagnostic Assessment'],
        educationalLevel: 'Undergraduate',
        educationalUse: ['Self-Assessment', 'Concept Check', 'Exam Preparation'],
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        author: AUTHOR_PERSON_JSON_LD,
        creator: AUTHOR_PERSON_JSON_LD,
        isPartOf: {
          '@type': 'Course',
          '@id': `${SITE_URL}/chapters/${canonicalKey}#course`,
          name: chapterTitle,
          url: `${SITE_URL}/chapters/${canonicalKey}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${quizUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: chapterTitle,
            item: `${SITE_URL}/chapters/${canonicalKey}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Diagnostic MCQ Quiz',
            item: quizUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
      />

      {/* Navigation */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>/</span>
        <Link href={`/chapters/${canonicalKey}`} className="hover:text-blue-700">{chapterTitle}</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">MCQ Quiz</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Concept check</Badge>
          <Badge variant="info">Chapter {chapterNumber}</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#172b43]">
          {chapterTitle} — Diagnostic &amp; Conceptual Quiz
        </h1>

        <p className="reading-copy text-slate-600">
          Choose an answer to check your understanding. If you miss one, review the idea behind the choice and try again.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-[#176b63] shrink-0" />
            <span>
              Wrong answers include a short explanation of the common misconception they reflect.
            </span>
          </div>
        </div>
      </div>

      {/* Questions */}
      <section aria-label="Quiz questions" className="space-y-6">
        {sampleMCQs.map((q, idx) => (
          <QuizQuestion key={q.id} question={q} index={idx} total={sampleMCQs.length} />
        ))}
      </section>
    </div>
  );
}
