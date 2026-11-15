'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Compass,
  CheckCircle2,
  Award,
  LayoutDashboard,
  Info,
  ChevronDown,
  Menu,
  X,
  Layers,
  ArrowRight,
  GraduationCap,
  BookMarked,
} from 'lucide-react';

import { CHAPTER_METADATA } from '@/lib/content/curriculum';

interface ChapterLink {
  num: number;
  key: string;
  title: string;
  sectionsCount: number;
  solutionsCount: number;
}

const CHAPTERS: ChapterLink[] = Object.values(CHAPTER_METADATA).map((ch) => ({
  num: ch.num,
  key: ch.key,
  title: ch.title.replace(/^Chapter \d+:\s*/, ''),
  sectionsCount: ch.sections.length,
  solutionsCount: ch.sections.reduce((acc, s) => acc + s.solutionsCount, 0),
}));

export function Header() {
  const [chaptersDropdownOpen, setChaptersDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileChaptersOpen, setMobileChaptersOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Close menus on route change
  useEffect(() => {
    setChaptersDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle click outside to close desktop dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setChaptersDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle Escape key to close menus
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setChaptersDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setChaptersDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setChaptersDropdownOpen(false);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-surface-1/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Editorial Monograph Brand Mark */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-lg border border-specular bg-brand-primary text-ink-inverse flex items-center justify-center font-reading font-bold text-lg shadow-sm group-hover:bg-brand-primary-hover transition-colors">
                &int;dx
              </div>
              <div className="flex flex-col">
                <span className="font-reading font-bold tracking-display text-ink-primary leading-tight group-hover:text-brand-accent transition-colors">
                  Thomas&apos; Calculus
                </span>
                <span className="text-xs font-mono text-ink-muted font-medium tabular-nums">
                  14th Ed · by Muhammad Abdullah Athar
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {/* Chapters Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center rounded-lg hover:bg-surface-2 transition-colors">
                <Link
                  href="/chapters"
                  aria-current={pathname === '/chapters' ? 'page' : undefined}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-ink-primary hover:text-brand-accent transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-brand-accent" />
                  <span>Chapters</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setChaptersDropdownOpen((prev) => !prev)}
                  aria-expanded={chaptersDropdownOpen}
                  aria-controls="desktop-chapter-menu"
                  aria-label="Toggle chapters menu"
                  className="cursor-pointer p-2 -ml-1 text-ink-muted hover:text-brand-accent transition-colors"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      chaptersDropdownOpen ? 'rotate-180 text-brand-accent' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu Panel */}
              {chaptersDropdownOpen && (
                <div
                  id="desktop-chapter-menu"
                  className="absolute left-0 mt-1 w-80 max-h-[28rem] overflow-y-auto rounded-xl bg-surface-1 border border-specular shadow-xl py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-hairline flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Select Chapter
                    </span>
                    <Link
                      href="/chapters"
                      onClick={() => setChaptersDropdownOpen(false)}
                      className="text-xs font-semibold text-brand-accent hover:text-brand-primary inline-flex items-center gap-1"
                    >
                      All Chapters &rarr;
                    </Link>
                  </div>

                  <div className="py-1">
                    {CHAPTERS.map((ch) => (
                      <Link
                        key={ch.key}
                        href={`/chapters/${ch.key}`}
                        onClick={() => setChaptersDropdownOpen(false)}
                        className="flex items-start gap-3 px-4 py-2.5 hover:bg-surface-2 transition-colors group"
                      >
                        <span className="w-6 h-6 rounded-md border border-specular bg-surface-2 text-brand-primary font-mono text-xs font-bold tabular-nums flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-primary group-hover:text-ink-inverse transition-colors">
                          {ch.num}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-reading text-sm font-bold text-ink-primary group-hover:text-brand-accent transition-colors">
                            <span className="font-mono tabular-nums">Ch {ch.num}:</span> {ch.title}
                          </div>
                          <div className="font-mono text-xs text-ink-muted tabular-nums flex items-center gap-2 mt-0.5">
                            <span>{ch.sectionsCount} Sections</span>
                            <span>&bull;</span>
                            <span className="text-brand-accent font-medium">{ch.solutionsCount} Solutions</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="pt-2 px-3 pb-1 border-t border-hairline">
                    <Link
                      href="/chapters"
                      onClick={() => setChaptersDropdownOpen(false)}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-surface-2 hover:bg-brand-accent-subtle text-xs font-semibold text-ink-primary hover:text-brand-accent transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-brand-accent" />
                      <span>Full Curriculum Table of Contents</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            <Link
              href="/practice/1.1-functions-and-graphs"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-ink-secondary rounded-md hover:text-brand-primary hover:bg-surface-2 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Practice</span>
            </Link>

            <Link
              href="/quiz/ch01"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-ink-secondary rounded-md hover:text-brand-primary hover:bg-surface-2 transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>Quizzes</span>
            </Link>

            <Link
              href="/mids"
              aria-current={pathname === '/mids' ? 'page' : undefined}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                pathname === '/mids'
                  ? 'bg-callout-theorem-bg text-callout-theorem-ink border border-specular'
                  : 'text-brand-accent hover:bg-callout-theorem-bg/70'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-brand-accent" />
              <span>Mids Exam</span>
            </Link>

            <Link
              href="/mids/definitions"
              aria-current={pathname === '/mids/definitions' ? 'page' : undefined}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                pathname === '/mids/definitions'
                  ? 'bg-callout-definition-bg text-callout-definition-ink border border-specular'
                  : 'text-brand-primary hover:bg-callout-definition-bg/70'
              }`}
            >
              <BookMarked className="w-4 h-4 text-brand-primary" />
              <span>Mids Definitions</span>
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-ink-secondary rounded-md hover:text-brand-primary hover:bg-surface-2 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/about"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-ink-secondary rounded-md hover:text-brand-primary hover:bg-surface-2 transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </nav>

          {/* Right Actions & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/chapters/ch01/1.1-functions-and-graphs"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 font-mono text-xs font-semibold tabular-nums text-ink-inverse bg-brand-primary rounded-lg hover:bg-brand-primary-hover shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Section 1.1 Standard</span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuOpen ? 'mobile-navigation' : undefined}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden cursor-pointer p-2 rounded-lg text-ink-secondary hover:text-ink-primary hover:bg-surface-2 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 bg-surface-3/40 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-navigation"
            className="relative z-50 md:hidden border-t border-hairline bg-surface-1 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            {/* Chapters Accordion */}
            <div className="border border-specular rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileChaptersOpen((prev) => !prev)}
                aria-expanded={mobileChaptersOpen}
                aria-controls="mobile-chapter-list"
                className="min-h-11 w-full cursor-pointer flex items-center justify-between p-3 bg-surface-2 text-sm font-bold text-ink-primary"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-accent" />
                  <span className="font-mono tabular-nums">Chapters Curriculum (1 – 16)</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileChaptersOpen ? 'rotate-180 text-brand-accent' : 'text-ink-muted'
                  }`}
                />
              </button>

              <div id="mobile-chapter-list" hidden={!mobileChaptersOpen} className="divide-y divide-hairline bg-surface-1">
                <Link
                  href="/chapters"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-11 flex items-center justify-between p-3 text-sm font-bold text-brand-primary bg-surface-2/60 hover:bg-surface-2 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    All Chapters Overview (Table of Contents)
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {CHAPTERS.map((ch) => (
                  <Link
                    key={ch.key}
                    href={`/chapters/${ch.key}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-11 flex items-center justify-between p-3 hover:bg-surface-2 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-ink-primary">
                        <span className="font-mono tabular-nums">Chapter {ch.num}:</span> {ch.title}
                      </div>
                      <div className="font-mono text-[11px] text-ink-muted tabular-nums">
                        {ch.sectionsCount} sections &bull; {ch.solutionsCount} verified solutions
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-ink-muted" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Links */}
            <div className="space-y-1 pt-1">
              <Link
                href="/practice/1.1-functions-and-graphs"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-11 flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-ink-primary rounded-lg hover:bg-surface-2"
              >
                <Compass className="w-4 h-4 text-brand-primary" />
                <span>Interactive Practice</span>
              </Link>

              <Link
                href="/quiz/ch01"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-11 flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-ink-primary rounded-lg hover:bg-surface-2"
              >
                <Award className="w-4 h-4 text-callout-example-ink" />
                <span>Chapter Quizzes</span>
              </Link>

              <Link
                href="/mids"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-11 flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-callout-theorem-ink bg-callout-theorem-bg rounded-lg border border-specular"
              >
                <GraduationCap className="w-4 h-4 text-brand-accent" />
                <span className="tabular-nums">Midterm Exam Prep (65 MCQs)</span>
              </Link>

              <Link
                href="/mids/definitions"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-11 flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-callout-definition-ink bg-callout-definition-bg rounded-lg border border-specular"
              >
                <BookMarked className="w-4 h-4 text-brand-primary" />
                <span className="tabular-nums">Midterm Blocks &amp; Definitions (Ch 1–3)</span>
              </Link>

              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-11 flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-ink-primary rounded-lg hover:bg-surface-2"
              >
                <LayoutDashboard className="w-4 h-4 text-brand-primary" />
                <span>Mastery Dashboard</span>
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-11 flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-ink-primary rounded-lg hover:bg-surface-2"
              >
                <Info className="w-4 h-4 text-brand-accent" />
                <span>About &amp; Mission</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-hairline">
              <Link
                href="/chapters/ch01/1.1-functions-and-graphs"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-11 w-full flex items-center justify-center gap-2 py-2.5 px-4 font-mono text-sm font-semibold tabular-nums text-ink-inverse bg-brand-primary rounded-lg shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Section 1.1 Golden Standard</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
