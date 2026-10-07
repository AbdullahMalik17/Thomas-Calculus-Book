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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-blue-800 transition-colors">
                &int;dx
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                  Thomas&apos; Calculus
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Interactive Study Guide
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
              <div className="flex items-center rounded-lg hover:bg-slate-50 transition-colors">
                <Link
                  href="/chapters"
                  aria-current={pathname === '/chapters' ? 'page' : undefined}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Chapters</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setChaptersDropdownOpen((prev) => !prev)}
                  aria-expanded={chaptersDropdownOpen}
                  aria-controls="desktop-chapter-menu"
                  aria-label="Toggle chapters menu"
                  className="p-2 -ml-1 text-slate-500 hover:text-blue-700 transition-colors"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      chaptersDropdownOpen ? 'rotate-180 text-blue-700' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu Panel */}
              {chaptersDropdownOpen && (
                <div id="desktop-chapter-menu" className="absolute left-0 mt-1 w-80 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Select Chapter
                    </span>
                    <Link
                      href="/chapters"
                      onClick={() => setChaptersDropdownOpen(false)}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
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
                        className="flex items-start gap-3 px-4 py-2.5 hover:bg-blue-50/70 transition-colors group"
                      >
                        <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          {ch.num}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                            Chapter {ch.num}: {ch.title}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{ch.sectionsCount} Sections</span>
                            <span>&bull;</span>
                            <span className="text-emerald-700 font-medium">{ch.solutionsCount} Solutions</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="pt-2 px-3 pb-1 border-t border-slate-100">
                    <Link
                      href="/chapters"
                      onClick={() => setChaptersDropdownOpen(false)}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-blue-50 text-xs font-semibold text-slate-700 hover:text-blue-700 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      <span>Full Curriculum Table of Contents</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            <Link
              href="/practice/1.1-functions-and-graphs"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-700 hover:bg-slate-50 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Practice</span>
            </Link>

            <Link
              href="/quiz/ch01"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-700 hover:bg-slate-50 transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>Quizzes</span>
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-700 hover:bg-slate-50 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/about"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-700 hover:bg-slate-50 transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </nav>

          {/* Right Actions & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/chapters/ch01/1.1-functions-and-graphs"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 shadow-sm transition-colors"
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
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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
            className="fixed inset-0 top-16 bg-slate-900/30 backdrop-blur-xs z-40 md:hidden animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div id="mobile-navigation" className="relative z-50 md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Chapters Accordion */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileChaptersOpen((prev) => !prev)}
                aria-expanded={mobileChaptersOpen}
                aria-controls="mobile-chapter-list"
                className="min-h-11 w-full flex items-center justify-between p-3 bg-slate-50 text-sm font-bold text-slate-900"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Chapters Curriculum (1 - 4)</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileChaptersOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                }`}
              />
            </button>

              <div id="mobile-chapter-list" hidden={!mobileChaptersOpen} className="divide-y divide-slate-100 bg-white">
                <Link
                  href="/chapters"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-11 flex items-center justify-between p-3 text-sm font-bold text-blue-800 bg-blue-50/50 hover:bg-blue-100/50 transition-colors"
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
                    className="min-h-11 flex items-center justify-between p-3 hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Chapter {ch.num}: {ch.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {ch.sectionsCount} sections &bull; {ch.solutionsCount} verified solutions
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
          </div>

          {/* Main Links */}
          <div className="space-y-1 pt-1">
            <Link
              href="/practice/1.1-functions-and-graphs"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-11 flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Interactive Practice</span>
            </Link>

            <Link
              href="/quiz/ch01"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-11 flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Chapter Quizzes</span>
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-11 flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-600" />
              <span>Mastery Dashboard</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-11 flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <Info className="w-4 h-4 text-teal-600" />
              <span>About &amp; Mission</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <Link
              href="/chapters/ch01/1.1-functions-and-graphs"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-11 w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-blue-700 rounded-lg shadow-sm"
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
