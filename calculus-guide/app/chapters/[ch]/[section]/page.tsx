import React from 'react';
import Link from 'next/link';
import { loadSectionContent } from '@/lib/content/loader';
import {
  normalizeChapterKey,
  CHAPTER_METADATA,
  getAdjacentSections,
  getAllSections,
} from '@/lib/content/curriculum';
import { TabbedSectionReader } from '@/components/section/TabbedSectionReader';
import { MDXSummary } from '@/components/section/MDXSummary';
import { Card } from '@/components/ui/Card';

interface SectionPageProps {
  params: {
    ch: string;
    section: string;
  };
  searchParams?: {
    tab?: string;
  };
}

export function generateMetadata({ params, searchParams }: SectionPageProps) {
  const normalizedCh = normalizeChapterKey(params.ch);
  const chapterMeta = CHAPTER_METADATA[normalizedCh];
  const sectionData = loadSectionContent(normalizedCh, params.section);
  if (!sectionData) {
    return {
      title: `Section ${params.section} | Thomas' Calculus`,
      description: `Curriculum study guide for Section ${params.section}.`,
    };
  }
  const isSolutions = searchParams?.tab === 'solutions';
  const title = isSolutions
    ? `Section ${sectionData.sectionNumber}: ${sectionData.title} - Worked Solutions (${sectionData.solutions.length}) | Thomas' Calculus`
    : `Section ${sectionData.sectionNumber}: ${sectionData.title} | Thomas' Calculus Study Guide`;
  const description = `Interactive study guide with ${sectionData.solutions.length} SymPy CAS-verified solutions for Section ${sectionData.sectionNumber}: ${sectionData.title} in Chapter ${chapterMeta?.num || ''}.`;
  return { title, description };
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

export default async function SectionPage({ params, searchParams }: SectionPageProps) {
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
  const initialTab = searchParams?.tab === 'solutions' ? 'solutions' : 'theory';

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>/</span>
        <Link href="/chapters" className="hover:text-blue-700">Chapters</Link>
        <span>/</span>
        <Link href={`/chapters/${normalizedCh}`} className="hover:text-blue-700">{chapterDisplayName}</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Section {sectionData.sectionNumber}</span>
      </nav>

      <TabbedSectionReader
        data={sectionData}
        summary={sectionData.summaryMDXContent ? <MDXSummary source={sectionData.summaryMDXContent} /> : null}
        initialTab={initialTab}
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
