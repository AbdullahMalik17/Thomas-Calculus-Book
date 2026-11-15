import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { loadSectionContent } from '@/lib/content/loader';
import {
  normalizeChapterKey,
  CHAPTER_METADATA,
  getAdjacentSections,
  getAllSections,
} from '@/lib/content/curriculum';
import { BookSectionReader } from '@/components/section/BookSectionReader';
import { MDXSummary } from '@/components/section/MDXSummary';
import { Card } from '@/components/ui/Card';
import {
  AUTHOR_NAME,
  AUTHOR_PERSON_JSON_LD,
  AUTHOR_URL,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo';

interface SectionPageProps {
  params: {
    ch: string;
    section: string;
  };
  searchParams?: {
    tab?: string;
  };
}

export function generateMetadata({ params, searchParams }: SectionPageProps): Metadata {
  const normalizedCh = normalizeChapterKey(params.ch);
  const chapterMeta = CHAPTER_METADATA[normalizedCh];
  const sectionData = loadSectionContent(normalizedCh, params.section);
  if (!sectionData) {
    return {
      title: `Section ${params.section} | Thomas' Calculus`,
      description: `Curriculum study guide for Section ${params.section}.`,
      alternates: {
        canonical: `/chapters/${normalizedCh}/${params.section}`,
      },
    };
  }
  const canonicalPath = `/chapters/${normalizedCh}/${sectionData.sectionKey}`;
  const isSolutions = searchParams?.tab === 'solutions';
  const title = isSolutions
    ? `Section ${sectionData.sectionNumber}: ${sectionData.title} — Worked Solutions (${sectionData.solutions.length})`
    : `Section ${sectionData.sectionNumber}: ${sectionData.title}`;
  const description = `Interactive study guide with ${sectionData.solutions.length} SymPy CAS-verified solutions for Section ${sectionData.sectionNumber}: ${sectionData.title} in ${chapterMeta?.title || `Chapter ${normalizedCh.toUpperCase()}`} of Thomas' Calculus (14th Edition).`;

  return {
    title,
    description,
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
      type: 'article',
      siteName: SITE_NAME,
      locale: 'en_US',
      authors: [AUTHOR_NAME],
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
  const all = getAllSections();
  const params: { ch: string; section: string }[] = [];
  for (const s of all) {
    params.push({ ch: s.chapterKey, section: s.id });
    params.push({ ch: s.chapterKey, section: s.number });
    params.push({ ch: String(s.chapterNum), section: s.id });
    params.push({ ch: String(s.chapterNum), section: s.number });
  }
  return params;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const normalizedCh = normalizeChapterKey(params.ch);
  const sectionData = loadSectionContent(normalizedCh, params.section);
  const chapterMeta = CHAPTER_METADATA[normalizedCh];
  const chapterDisplayName = chapterMeta ? `Chapter ${chapterMeta.num}` : `Chapter ${params.ch.toUpperCase()}`;

  if (!sectionData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link href="/chapters" className="hover:text-blue-700">Chapters</Link>
          <span>/</span>
          <Link href={`/chapters/${normalizedCh}`} className="hover:text-blue-700">{chapterDisplayName}</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">{params.section}</span>
        </div>
        <Card title="Module Status" subtitle="Under Development">
          <p className="text-slate-600">
            Section {params.section} is currently queued in the curriculum expansion roadmap.
          </p>
        </Card>
      </div>
    );
  }

  const adjacent = getAdjacentSections(normalizedCh, sectionData.sectionKey);
  const sectionUrl = `${SITE_URL}/chapters/${normalizedCh}/${sectionData.sectionKey}`;

  const sectionJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      AUTHOR_PERSON_JSON_LD,
      {
        '@type': 'LearningResource',
        '@id': `${sectionUrl}#learning-resource`,
        name: `Section ${sectionData.sectionNumber}: ${sectionData.title} — Study Guide & ${sectionData.solutions.length} Solutions`,
        url: sectionUrl,
        description: `Comprehensive section notes, theorems, and ${sectionData.solutions.length} SymPy-verified step-by-step solutions for Section ${sectionData.sectionNumber}: ${sectionData.title} (${chapterMeta?.title || chapterDisplayName}).`,
        learningResourceType: ['Section Study Guide', 'Worked Example', 'Mathematical Theorems'],
        educationalLevel: 'Undergraduate',
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        author: AUTHOR_PERSON_JSON_LD,
        creator: AUTHOR_PERSON_JSON_LD,
        publisher: AUTHOR_PERSON_JSON_LD,
        isPartOf: {
          '@type': 'Course',
          '@id': `${SITE_URL}/chapters/${normalizedCh}#course`,
          name: chapterMeta?.title || chapterDisplayName,
          url: `${SITE_URL}/chapters/${normalizedCh}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${sectionUrl}#breadcrumb`,
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
            name: 'Chapters Curriculum',
            item: `${SITE_URL}/chapters`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: chapterMeta?.title || chapterDisplayName,
            item: `${SITE_URL}/chapters/${normalizedCh}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: `Section ${sectionData.sectionNumber}: ${sectionData.title}`,
            item: sectionUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sectionJsonLd) }}
      />

      {/* Shelf marker */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-[#8a7a63]">
        <Link href="/chapters" className="hover:text-[#1f1a13]">Contents</Link>
        <span aria-hidden="true">&rsaquo;</span>
        <Link href={`/chapters/${normalizedCh}`} className="hover:text-[#1f1a13]">{chapterDisplayName}</Link>
        <span aria-hidden="true">&rsaquo;</span>
        <span className="text-[#1f1a13]">Section {sectionData.sectionNumber}</span>
      </nav>

      <BookSectionReader
        data={sectionData}
        summary={sectionData.summaryMDXContent ? <MDXSummary source={sectionData.summaryMDXContent} /> : null}
        prevSection={adjacent.prev ? {
          title: adjacent.prev.title,
          number: adjacent.prev.number,
          href: adjacent.prev.href,
        } : null}
        nextSection={adjacent.next ? {
          title: adjacent.next.title,
          number: adjacent.next.number,
          href: adjacent.next.href,
        } : null}
      />
    </div>
  );
}
