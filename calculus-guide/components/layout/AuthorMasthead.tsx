'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { BookOpenCheck, ExternalLink, ShieldCheck } from 'lucide-react';

interface FolioContext {
  badge: string;
  subtitle: string;
}

function resolveFolioContext(pathname: string): FolioContext {
  if (!pathname || pathname === '/') {
    return {
      badge: '14TH EDITION · 16 CHAPTERS',
      subtitle: 'Monograph Frontispiece & Interactive Curriculum',
    };
  }
  if (pathname === '/chapters') {
    return {
      badge: '14TH EDITION · 16 CHAPTERS',
      subtitle: 'Complete Curriculum Table of Contents · 119 Sections',
    };
  }
  if (pathname.startsWith('/chapters/')) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length >= 3) {
      return {
        badge: 'CHAPTER STUDY MONOGRAPH',
        subtitle: `Section Reader · ${segments[1].toUpperCase()} / ${segments[2]}`,
      };
    }
    return {
      badge: 'CHAPTER STUDY MONOGRAPH',
      subtitle: `Chapter Overview & Section Index · ${segments[1]?.toUpperCase() ?? 'CURRICULUM'}`,
    };
  }
  if (pathname.startsWith('/mids/definitions')) {
    return {
      badge: 'MIDTERM EXAM HUB',
      subtitle: 'Chapters 1–3 Core Definitions, Theorems & Blocks',
    };
  }
  if (pathname.startsWith('/mids') || pathname.startsWith('/midterm')) {
    return {
      badge: 'MIDTERM EXAM HUB',
      subtitle: '65 Verified Midterm MCQs · Study & Timed Exam Simulator',
    };
  }
  if (pathname.startsWith('/practice')) {
    return {
      badge: 'PRACTICE & SYMPY VERIFICATION',
      subtitle: 'Progressive 3-Tier Hints & Symbolic Equivalence Checks',
    };
  }
  if (pathname.startsWith('/quiz')) {
    return {
      badge: 'PRACTICE & SYMPY VERIFICATION',
      subtitle: 'Chapter Diagnostic Assessment & Misconception Analysis',
    };
  }
  if (pathname.startsWith('/dashboard')) {
    return {
      badge: 'PRACTICE & SYMPY VERIFICATION',
      subtitle: 'Mastery Telemetry & SymPy CAS Verification Dashboard',
    };
  }
  if (pathname.startsWith('/about')) {
    return {
      badge: 'CHAPTER STUDY MONOGRAPH',
      subtitle: 'Colophon, Academic Integrity & SymPy Verification Architecture',
    };
  }
  return {
    badge: '14TH EDITION · 16 CHAPTERS',
    subtitle: 'Interactive Mathematical Monograph & Verified Solutions',
  };
}

export function AuthorMasthead() {
  const pathname = usePathname() || '/';
  const folio = resolveFolioContext(pathname);

  return (
    <div
      data-testid="author-masthead"
      itemProp="author"
      itemScope
      itemType="https://schema.org/Person"
      className="surface-grain mb-6 sm:mb-8 relative overflow-hidden rounded-xl border border-specular border-l-4 border-l-brand-accent bg-surface-1 px-4 py-3.5 sm:px-6 sm:py-4 shadow-sm"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side: Author Identity */}
        <div className="space-y-1">
          <span className="book-kicker block font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted tabular-nums">
            {'AUTHORED & ENGINEERED BY'}
          </span>
          <div className="flex flex-wrap items-center gap-2.5">
            <strong
              itemProp="name"
              className="font-reading text-base sm:text-lg font-bold tracking-display text-ink-primary"
            >
              Muhammad Abdullah Athar
            </strong>
            <a
              itemProp="url"
              href="https://github.com/AbdullahMalik17"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile of Muhammad Abdullah Athar (@AbdullahMalik17)"
              className="inline-flex items-center gap-1.5 rounded-full border border-specular bg-surface-2 px-2.5 py-0.5 font-mono text-xs font-semibold text-brand-primary tabular-nums transition-colors hover:border-brand-accent hover:bg-brand-accent-subtle hover:text-brand-accent"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
              <span>@AbdullahMalik17</span>
              <ExternalLink className="h-3 w-3 text-ink-muted" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right Side: Page & Verification Metadata */}
        <div className="flex flex-col gap-1 lg:items-end">
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-specular bg-callout-theorem-bg px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-callout-theorem-ink tabular-nums">
              <BookOpenCheck className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
              <span>{folio.badge}</span>
            </span>
            <span className="font-mono text-xs text-ink-muted tabular-nums">
              {folio.subtitle}
            </span>
          </div>
          <p className="font-reading text-xs sm:text-sm italic text-ink-secondary lg:text-right">
            {'Original Mathematical Exposition & SymPy-Verified Solutions by Muhammad Abdullah Athar'}
          </p>
        </div>
      </div>
    </div>
  );
}
