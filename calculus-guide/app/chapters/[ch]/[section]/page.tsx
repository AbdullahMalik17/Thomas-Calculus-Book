import React from 'react';
import Link from 'next/link';
import { loadSectionContent } from '@/lib/content/loader';
import { TabbedSectionReader } from '@/components/section/TabbedSectionReader';
import { Card } from '@/components/ui/Card';

interface SectionPageProps {
  params: {
    ch: string;
    section: string;
  };
}

export default function SectionPage({ params }: SectionPageProps) {
  const { ch, section } = params;
  const sectionData = loadSectionContent(ch, section);

  if (!sectionData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link href={`/chapters/${ch}`} className="hover:text-blue-700">Chapter {ch.toUpperCase()}</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">{section}</span>
        </div>
        <Card title="Module Status" subtitle="Under Development">
          <p className="text-slate-600">
            Section {section} is currently queued in the curriculum expansion roadmap.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>/</span>
        <Link href={`/chapters/${ch}`} className="hover:text-blue-700">Chapter {ch.toUpperCase()}</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Section {sectionData.sectionNumber}</span>
      </div>

      <TabbedSectionReader data={sectionData} />
    </div>
  );
}
