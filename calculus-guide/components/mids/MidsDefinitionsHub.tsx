'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Compass,
  Filter,
  GraduationCap,
  Lightbulb,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { InlineMath } from '@/components/math/InlineMath';
import { MathBlock } from '@/components/math/MathBlock';
import { MidtermDiagram } from '@/components/mids/MidtermDiagrams';
import {
  MIDS_DEF_CHAPTERS,
  MIDS_DEFINITION_BLOCKS,
  type BlockKind,
  type DifficultyTag,
  type MidtermBlock,
} from '@/lib/content/mids-definitions-data';

type ChapterFilter = 'all' | 1 | 2 | 3;
type TypeFilter = 'all' | 'definitions' | 'theorems' | 'rules' | 'tests';

const STORAGE_KEY = 'calculus-guide-mids-defs-mastered-v1';

/**
 * Splits prose containing inline `$...$` LaTeX segments and renders them via KaTeX.
 */
function FormattedMathText({ text, className = '' }: { text: string; className?: string }) {
  const parts = useMemo(() => text.split(/(\$[^$]+\$)/g), [text]);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
          return <InlineMath key={index} math={part.slice(1, -1)} />;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}

function getKindColor(kind: BlockKind): {
  labelColor: string;
  borderAccent: string;
  bgTint: string;
} {
  switch (kind) {
    case 'DEFINITION':
    case 'DEFINITIONS':
      return {
        labelColor: 'text-[#0284c7]',
        borderAccent: 'border-slate-300',
        bgTint: 'bg-sky-50/40',
      };
    case 'THEOREM':
      return {
        labelColor: 'text-[#176b63]',
        borderAccent: 'border-teal-300',
        bgTint: 'bg-emerald-50/35',
      };
    case 'TEST':
    case 'STRATEGY':
      return {
        labelColor: 'text-[#b45309]',
        borderAccent: 'border-amber-300',
        bgTint: 'bg-amber-50/35',
      };
    case 'RULE':
    case 'RULES':
    case 'METHOD':
      return {
        labelColor: 'text-[#1e3a5f]',
        borderAccent: 'border-indigo-200',
        bgTint: 'bg-slate-50/60',
      };
  }
}

function getDifficultyBadgeVariant(tag: DifficultyTag): 'info' | 'success' | 'warning' {
  switch (tag) {
    case 'Core Foundation':
      return 'info';
    case 'Midterm Favorite':
      return 'success';
    case 'High-Yield Trap':
      return 'warning';
  }
}

function matchesTypeFilter(kind: BlockKind, filter: TypeFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'definitions') return kind === 'DEFINITION' || kind === 'DEFINITIONS';
  if (filter === 'theorems') return kind === 'THEOREM';
  if (filter === 'rules') return kind === 'RULE' || kind === 'RULES' || kind === 'METHOD';
  if (filter === 'tests') return kind === 'TEST' || kind === 'STRATEGY';
  return true;
}

export function MidsDefinitionsHub() {
  const [chapterFilter, setChapterFilter] = useState<ChapterFilter>('all');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [unmasteredOnly, setUnmasteredOnly] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>({});
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [expandAllActive, setExpandAllActive] = useState<boolean>(false);

  // Hydrate mastered progress from localStorage
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setMasteredIds(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const persistMastered = (next: Record<string, boolean>) => {
    setMasteredIds(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage errors
    }
  };

  const toggleMastered = (id: string) => {
    const next = { ...masteredIds, [id]: !masteredIds[id] };
    if (!next[id]) delete next[id];
    persistMastered(next);
  };

  const resetMastered = () => {
    persistMastered({});
  };

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Available section options based on selected chapter
  const availableSections = useMemo(() => {
    if (chapterFilter === 'all') {
      return MIDS_DEF_CHAPTERS.flatMap((c) => c.sections);
    }
    return MIDS_DEF_CHAPTERS.find((c) => c.chapter === chapterFilter)?.sections ?? [];
  }, [chapterFilter]);

  // Reset section filter when switching chapters if current section isn't in that chapter
  useEffect(() => {
    if (sectionFilter !== 'all' && !availableSections.some((s) => s.number === sectionFilter)) {
      setSectionFilter('all');
    }
  }, [availableSections, sectionFilter]);

  // Filtered blocks
  const filteredBlocks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MIDS_DEFINITION_BLOCKS.filter((block) => {
      if (chapterFilter !== 'all' && block.chapter !== chapterFilter) return false;
      if (sectionFilter !== 'all' && block.section !== sectionFilter) return false;
      if (!matchesTypeFilter(block.kind, typeFilter)) return false;
      if (unmasteredOnly && masteredIds[block.id]) return false;
      if (q) {
        const haystack = [
          block.title,
          block.section,
          block.sectionTitle,
          block.blockLabel,
          block.formalIntro,
          block.weakIntuition.headline,
          block.weakIntuition.explanation,
          block.quickExample.prompt,
          ...block.keywords,
          ...block.strongDive.midtermTraps,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [chapterFilter, sectionFilter, typeFilter, searchQuery, unmasteredOnly, masteredIds]);

  const handleToggleExpandAll = () => {
    const nextState = !expandAllActive;
    setExpandAllActive(nextState);
    const updated: Record<string, boolean> = {};
    for (const block of MIDS_DEFINITION_BLOCKS) {
      updated[block.id] = nextState;
    }
    setExpandedIds(updated);
  };

  const totalCount = MIDS_DEFINITION_BLOCKS.length;
  const masteredCount = useMemo(
    () => MIDS_DEFINITION_BLOCKS.filter((b) => masteredIds[b.id]).length,
    [masteredIds]
  );
  const progressPercent = Math.round((masteredCount / totalCount) * 100);

  const chapterStats = useMemo(
    () =>
      MIDS_DEF_CHAPTERS.map((ch) => {
        const items = MIDS_DEFINITION_BLOCKS.filter((b) => b.chapter === ch.chapter);
        const done = items.filter((b) => masteredIds[b.id]).length;
        return {
          ...ch,
          total: items.length,
          done,
          pct: items.length > 0 ? Math.round((done / items.length) * 100) : 0,
        };
      }),
    [masteredIds]
  );

  return (
    <div className="space-y-8">
      {/* Mastery Progress Overview */}
      <section className="rounded-2xl border border-[#dbe2ea] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#176b63]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#176b63]">
                Midterm Concept Mastery Tracker
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#172b43]">
              {masteredCount} of {totalCount} Core Blocks Understood ({progressPercent}%)
            </h2>
            <p className="text-sm text-slate-600">
              Read the textbook block, lock in the simple intuition, test the 10-second example, then check the strong-student traps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleToggleExpandAll}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {expandAllActive ? (
                <>
                  <ChevronUp className="h-4 w-4 text-slate-500" />
                  Collapse All Deep Dives
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                  Expand All Deep Dives
                </>
              )}
            </button>

            {masteredCount > 0 && (
              <button
                type="button"
                onClick={resetMastered}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Progress
              </button>
            )}
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#176b63] to-[#0284c7] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Per-Chapter Mini Progress */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {chapterStats.map((ch) => (
            <button
              key={ch.chapter}
              type="button"
              onClick={() => setChapterFilter(chapterFilter === ch.chapter ? 'all' : ch.chapter)}
              className={`text-left rounded-xl border p-3 transition-all ${
                chapterFilter === ch.chapter
                  ? 'border-[#176b63] bg-emerald-50/50 ring-1 ring-[#176b63]/30'
                  : 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#172b43]">{ch.shortTitle}</span>
                <span className="text-[#176b63]">
                  {ch.done}/{ch.total}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[#176b63] transition-all duration-300"
                  style={{ width: `${ch.pct}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <section
        aria-label="Filter Midterm Definitions and Blocks"
        className="rounded-2xl border border-[#dbe2ea] bg-white p-4 shadow-sm sm:p-5 space-y-4"
      >
        {/* Chapter Tabs + Search */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
              <Filter className="h-3.5 w-3.5" />
              Chapter:
            </span>
            {(['all', 1, 2, 3] as const).map((ch) => {
              const label =
                ch === 'all'
                  ? `All (${totalCount})`
                  : ch === 1
                  ? 'Ch 1: Functions'
                  : ch === 2
                  ? 'Ch 2: Limits & Continuity'
                  : 'Ch 3: Derivatives';
              const active = chapterFilter === ch;
              return (
                <button
                  key={String(ch)}
                  type="button"
                  onClick={() => setChapterFilter(ch)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-[#1e3a5f] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search (e.g. even, squeeze, chain rule)..."
              aria-label="Search midterm definitions and theorems"
              className="w-full rounded-lg border border-slate-300 bg-slate-50/60 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#176b63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176b63]/20"
            />
          </div>
        </div>

        {/* Secondary Row: Section Selector, Block Type, Unmastered Toggle */}
        <div className="flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="section-filter" className="text-xs font-semibold text-slate-600">
              Section:
            </label>
            <select
              id="section-filter"
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:border-[#176b63] focus:outline-none"
            >
              <option value="all">All Sections</option>
              {availableSections.map((sec) => (
                <option key={sec.number} value={sec.number}>
                  §{sec.number} — {sec.title}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap items-center gap-1.5 sm:ml-2">
              {(
                [
                  { id: 'all', label: 'All Types' },
                  { id: 'definitions', label: 'Definitions' },
                  { id: 'theorems', label: 'Theorems' },
                  { id: 'rules', label: 'Rules & Methods' },
                  { id: 'tests', label: 'Tests & Strategies' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTypeFilter(t.id)}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                    typeFilter === t.id
                      ? 'bg-[#176b63] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={unmasteredOnly}
                onChange={(e) => setUnmasteredOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#176b63] focus:ring-[#176b63]"
              />
              Hide understood blocks
            </label>
            <span className="text-xs font-medium text-slate-500">
              Showing <strong className="text-slate-800">{filteredBlocks.length}</strong> of {totalCount}
            </span>
          </div>
        </div>
      </section>

      {/* Empty State */}
      {filteredBlocks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center space-y-3">
          <p className="text-base font-bold text-slate-800">No matching definitions or blocks found.</p>
          <p className="text-sm text-slate-600">
            Try clearing your search query or switching back to all chapters and block types.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setChapterFilter('all');
              setSectionFilter('all');
              setTypeFilter('all');
              setSearchQuery('');
              setUnmasteredOnly(false);
            }}
          >
            Reset All Filters
          </Button>
        </div>
      ) : (
        /* Blocks Feed */
        <div className="space-y-7">
          {filteredBlocks.map((block) => (
            <DefinitionBlockCard
              key={block.id}
              block={block}
              isMastered={!!masteredIds[block.id]}
              isExpanded={!!expandedIds[block.id]}
              onToggleMastered={() => toggleMastered(block.id)}
              onToggleExpanded={() => toggleExpanded(block.id)}
            />
          ))}
        </div>
      )}

      {/* Bottom Midterm Practice CTA */}
      <section className="rounded-3xl border border-[#b8d6d0] bg-gradient-to-r from-[#172b43] to-[#174f4a] p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-emerald-100">
              <GraduationCap className="h-3.5 w-3.5" />
              Ready to Test Yourself?
            </span>
            <h2 className="text-xl font-bold sm:text-2xl">
              Now apply these Chapters 1–3 definitions on 65 Midterm MCQs
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              Switch over to the Midterm Exam Hub for instant misconception feedback in Study Mode or launch a timed 15, 30, or 65-question Mock Exam.
            </p>
          </div>
          <Button
            href="/mids"
            size="lg"
            className="shrink-0 gap-2 bg-white text-[#172b43] hover:bg-emerald-50"
          >
            Go to Midterm Exam Hub
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

interface DefinitionBlockCardProps {
  block: MidtermBlock;
  isMastered: boolean;
  isExpanded: boolean;
  onToggleMastered: () => void;
  onToggleExpanded: () => void;
}

function DefinitionBlockCard({
  block,
  isMastered,
  isExpanded,
  onToggleMastered,
  onToggleExpanded,
}: DefinitionBlockCardProps) {
  const kindStyle = getKindColor(block.kind);

  return (
    <article
      id={block.id}
      className={`rounded-2xl border bg-white shadow-sm transition-all ${
        isMastered ? 'border-emerald-300 ring-1 ring-emerald-200/70' : 'border-[#dbe2ea]'
      }`}
    >
      {/* Card Top Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-[#edf3f2] px-2 py-0.5 font-mono text-xs font-bold text-[#174f4a]">
              &sect;{block.section}
            </span>
            <span className="text-xs font-semibold text-slate-500">{block.chapterTitle}</span>
            <Badge variant={getDifficultyBadgeVariant(block.difficultyTag)} size="sm">
              {block.difficultyTag}
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-[#172b43] sm:text-xl">{block.title}</h3>
        </div>

        <button
          type="button"
          onClick={onToggleMastered}
          aria-pressed={isMastered}
          className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 self-start rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors sm:self-center ${
            isMastered
              ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          {isMastered ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Understood
            </>
          ) : (
            <>
              <Circle className="h-4 w-4 text-slate-400" />
              Mark as Understood
            </>
          )}
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* 1. Classic Textbook-Style Framed Block (Matching Uploaded Screenshot Style) */}
        <div
          className={`rounded-lg border ${kindStyle.borderAccent} ${kindStyle.bgTint} px-4 py-4 sm:px-6 sm:py-5`}
        >
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-[11px] font-medium text-slate-500">{block.bookRef}</span>
          </div>

          <div className="text-[15px] leading-relaxed text-slate-900">
            <span
              className={`mr-2.5 font-sans text-xs font-extrabold uppercase tracking-wider ${kindStyle.labelColor}`}
            >
              {block.blockLabel}
            </span>
            <span className="font-serif text-[16px]">
              <FormattedMathText text={block.formalIntro} />
            </span>
          </div>

          {block.formalConditions && block.formalConditions.length > 0 && (
            <ul className="mt-3 space-y-2 pl-2 sm:pl-8 font-serif text-[15.5px] text-slate-900">
              {block.formalConditions.map((cond, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2.5">
                  <span className="font-bold text-slate-950 shrink-0">
                    <FormattedMathText text={cond.label} />
                  </span>
                  <span>
                    <FormattedMathText text={cond.text} />
                  </span>
                </li>
              ))}
            </ul>
          )}

          {block.formalFormula && (
            <div className="mt-3">
              <MathBlock math={block.formalFormula} theme="light" />
            </div>
          )}

          {block.formalOutro && (
            <p className="mt-3 font-serif text-[15px] leading-relaxed text-slate-800">
              <FormattedMathText text={block.formalOutro} />
            </p>
          )}
        </div>

        {/* 2. Layer 1: Simple Intuition (For Weak / Foundation Learners) */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/55 p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176b63]">
            <Lightbulb className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Simple Idea (Start Here)</span>
          </div>
          <p className="text-base font-bold text-[#172b43]">
            <FormattedMathText text={block.weakIntuition.headline} />
          </p>
          <p className="text-sm leading-relaxed text-slate-700">
            <FormattedMathText text={block.weakIntuition.explanation} />
          </p>
          <div className="rounded-lg bg-white/80 border border-emerald-100 px-3.5 py-2.5 text-xs leading-relaxed text-slate-700">
            <strong className="text-[#174f4a]">Real-world picture: </strong>
            <FormattedMathText text={block.weakIntuition.everydayAnalogy} />
          </div>
        </div>

        {/* 3. Layer 2: Quick Worked Example (+ Optional Visual SVG Diagram) */}
        <div
          className={`grid gap-4 ${
            block.diagramId ? 'lg:grid-cols-12 lg:items-start' : 'grid-cols-1'
          }`}
        >
          <div
            className={`${
              block.diagramId ? 'lg:col-span-7' : ''
            } rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 space-y-3`}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1e3a5f]">
              <Zap className="h-4 w-4 text-sky-600 shrink-0" aria-hidden="true" />
              <span>Quick 10-Second Example</span>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              <FormattedMathText text={block.quickExample.prompt} />
            </p>
            <ol className="space-y-1.5 text-sm text-slate-700 list-decimal pl-5">
              {block.quickExample.steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  <FormattedMathText text={step} />
                </li>
              ))}
            </ol>
            <div className="rounded-lg border border-sky-200 bg-sky-50/70 px-3.5 py-2 text-xs font-medium text-sky-950">
              <strong className="font-bold">Takeaway: </strong>
              <FormattedMathText text={block.quickExample.takeaway} />
            </div>
          </div>

          {block.diagramId && (
            <div className="lg:col-span-5 space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                Visual Guide
              </p>
              <MidtermDiagram id={block.diagramId} />
            </div>
          )}
        </div>

        {/* 4. Layer 3: Expandable Deep Dive & Midterm Traps (For Strong Students) */}
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={onToggleExpanded}
            aria-expanded={isExpanded}
            className="flex w-full items-center justify-between bg-slate-50 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#172b43] hover:bg-slate-100/80 transition-colors sm:px-5"
          >
            <span className="inline-flex items-center gap-2">
              <Target className="h-4 w-4 text-amber-600" aria-hidden="true" />
              <span>Deep Dive, Edge Cases &amp; Midterm Traps (For Strong Students)</span>
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-slate-500 shrink-0" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />
            )}
          </button>

          {isExpanded && (
            <div className="border-t border-slate-200 bg-white p-4 sm:p-5 space-y-4 text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Why the Exact Hypotheses Matter
                </p>
                <p className="text-slate-700 leading-relaxed">
                  <FormattedMathText text={block.strongDive.whyItMatters} />
                </p>
              </div>

              {block.strongDive.edgeCases.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Subtle Edge Cases &amp; Counterexamples
                  </p>
                  <ul className="space-y-1.5 list-disc pl-5 text-slate-700">
                    {block.strongDive.edgeCases.map((item, i) => (
                      <li key={i} className="leading-relaxed">
                        <FormattedMathText text={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Common Midterm MCQ Traps</span>
                </div>
                <ul className="space-y-1.5 list-disc pl-5 text-xs sm:text-sm text-amber-950">
                  {block.strongDive.midtermTraps.map((trap, i) => (
                    <li key={i} className="leading-relaxed">
                      <FormattedMathText text={trap} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-indigo-200 bg-indigo-50/60 px-3.5 py-2.5 text-xs text-indigo-950">
                <strong className="font-bold">Exam Pro Tip: </strong>
                <FormattedMathText text={block.strongDive.proTip} />
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                <Link
                  href={block.sectionHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Open Section &sect;{block.section} Full Notes &amp; Solutions
                </Link>
                <Link
                  href="/mids"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176b63] hover:text-[#12554e] hover:underline"
                >
                  <Compass className="h-3.5 w-3.5" />
                  Practice Midterm MCQs &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
