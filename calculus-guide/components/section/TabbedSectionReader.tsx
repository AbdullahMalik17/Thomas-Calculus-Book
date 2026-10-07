'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MathBlock } from '@/components/math/MathBlock';
import { InlineMath } from '@/components/math/InlineMath';
import { SectionContentData } from '@/lib/content/loader';
import { Solution } from '@/lib/content/schema';
import {
  BookOpen,
  ListOrdered,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Compass,
  Award,
  Layers,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

interface TabbedSectionReaderProps {
  data: SectionContentData;
  summary?: React.ReactNode;
  initialTab?: 'theory' | 'solutions';
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

export function TabbedSectionReader({
  data,
  summary,
  initialTab = 'theory',
  prevSection,
  nextSection,
}: TabbedSectionReaderProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'solutions'>(initialTab);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [revealedWhy, setRevealedWhy] = useState<Record<string, boolean>>({});
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  useEffect(() => {
    const handleUrlSync = () => {
      if (typeof window === 'undefined') return;
      const searchParams = new URLSearchParams(window.location.search);
      const tabParam = searchParams.get('tab');
      const hash = window.location.hash.toLowerCase();

      const isSolutionsIntent =
        tabParam === 'solutions' ||
        hash === '#solutions' ||
        hash.startsWith('#ex') ||
        hash.startsWith('#exercise');

      if (isSolutionsIntent) {
        setActiveTab('solutions');
        // Auto-expand targeted exercise if hash corresponds to a solution ID or number
        if (hash.startsWith('#ex') || hash.startsWith('#exercise')) {
          const target = hash.replace(/^#/, '');
          const matchedSol = data.solutions.find((s) => {
            const lastPart = s.id.split('/').pop()?.toLowerCase();
            return (
              lastPart === target ||
              s.id.toLowerCase().includes(target) ||
              s.exerciseReference.toLowerCase().includes(target)
            );
          });
          if (matchedSol) {
            setExpandedSolutions((prev) => ({ ...prev, [matchedSol.id]: true }));
          }
        }
      } else if (tabParam === 'theory' || hash === '#theory') {
        setActiveTab('theory');
      } else if (initialTab) {
        setActiveTab(initialTab);
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);
    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, [initialTab, data.sectionKey, data.solutions]);

  const handleTabChange = (tab: 'theory' | 'solutions') => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const tab = event.key === 'Home'
      ? 'theory'
      : event.key === 'End'
      ? 'solutions'
      : activeTab === 'theory'
      ? 'solutions'
      : 'theory';
    handleTabChange(tab);
    document.getElementById(`section-tab-${tab}`)?.focus();
  };

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleWhy = (stepKey: string) => {
    setRevealedWhy((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    data.solutions.forEach((s) => {
      allExpanded[s.id] = true;
    });
    setExpandedSolutions(allExpanded);
  };

  const collapseAll = () => {
    setExpandedSolutions({});
  };

  const filteredSolutions = data.solutions.filter((s) => {
    if (filterDifficulty === 'all') return true;
    return s.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
  });

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'definition':
        return 'primary';
      case 'theorem':
        return 'success';
      case 'formula':
        return 'info';
      case 'rule':
        return 'warning';
      case 'test':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Section {data.sectionNumber}</Badge>
          <Badge variant="success">Math checked</Badge>
          {data.solutions.length > 0 && (
            <Badge variant="secondary">{data.solutions.length} Worked Solutions</Badge>
          )}
        </div>

        <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-[#172b43] sm:text-4xl [text-wrap:balance]">
          Section {data.sectionNumber}: {data.title}
        </h1>

        <p className="reading-copy text-slate-600">
          Begin with the key ideas, then explore worked examples and practice. Each solution explains both what to do and why the step works.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button href={`/practice/${data.sectionKey}`} size="sm" variant="outline" className="gap-1.5">
            <Compass className="w-4 h-4 text-blue-600" />
            Interactive Practice
          </Button>
          <Button href={`/quiz/${data.chapterKey}`} variant="outline" size="sm" className="gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            Chapter Quiz
          </Button>
        </div>
      </div>

      {/* Main Tab Bar */}
      <div className="sticky top-16 z-30 -mx-4 border-b border-slate-200 bg-slate-50/95 px-4 backdrop-blur sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
        <div className="flex gap-2 overflow-x-auto sm:gap-8" role="tablist" aria-label="Section study materials" onKeyDown={handleTabKeyDown}>
          <button
            id="section-tab-theory"
            type="button"
            role="tab"
            aria-selected={activeTab === 'theory'}
            aria-controls="section-panel-theory"
            tabIndex={activeTab === 'theory' ? 0 : -1}
            onClick={() => handleTabChange('theory')}
            className={`min-h-12 shrink-0 border-b-2 px-2 py-3 inline-flex items-center gap-2 font-semibold text-sm transition-colors ${
              activeTab === 'theory'
                ? 'border-[#176b63] text-[#174f4a]'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Important Definitions &amp; Theory
            {data.definitionsFile && (
              <span className="ml-1.5 py-0.5 px-2 text-xs rounded-full bg-blue-50 text-blue-700">
                {data.definitionsFile.definitions.length}
              </span>
            )}
          </button>

          <button
            id="section-tab-solutions"
            type="button"
            role="tab"
            aria-selected={activeTab === 'solutions'}
            aria-controls="section-panel-solutions"
            tabIndex={activeTab === 'solutions' ? 0 : -1}
            onClick={() => handleTabChange('solutions')}
            className={`min-h-12 shrink-0 border-b-2 px-2 py-3 inline-flex items-center gap-2 font-semibold text-sm transition-colors ${
              activeTab === 'solutions'
                ? 'border-[#176b63] text-[#174f4a]'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            Worked Exercise Solutions
            <span className="ml-1.5 py-0.5 px-2 text-xs rounded-full bg-slate-100 text-slate-700">
              {data.solutions.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1: Important Definitions & Theory */}
      <div id="section-panel-theory" role="tabpanel" aria-labelledby="section-tab-theory" tabIndex={0} hidden={activeTab !== 'theory'} className="w-full space-y-8 animate-fadeIn">
          <nav className="flex flex-wrap gap-x-3 gap-y-1 rounded-xl border border-[#d6e5e2] bg-[#f3f8f7] px-4 py-3 text-sm text-[#174f4a]" aria-label="Suggested study sequence">
            <span className="font-semibold">A useful study order:</span>
            <span>1. Read the idea</span><span aria-hidden="true">→</span>
            <span>2. Follow an example</span><span aria-hidden="true">→</span>
            <span>3. Try it yourself</span>
          </nav>

          {summary && (
            <section aria-labelledby="section-notes-heading" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <h2 id="section-notes-heading" className="mb-6 text-2xl font-bold text-[#172b43]">Section notes</h2>
              <div className="reading-copy mdx-content">
                {summary}
              </div>
            </section>
          )}

          {data.definitionsFile && data.definitionsFile.definitions.length > 0 ? (
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-blue-600" />
                  Quick reference: definitions and rules
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {data.definitionsFile.definitions.length} Curated Mathematical Standards
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                {data.definitionsFile.definitions.map((def) => (
                  <div
                    key={def.id}
                    className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant={getCategoryBadgeVariant(def.category)} size="sm">
                          {def.category.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-slate-400 font-mono">#{def.id}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">{def.title}</h3>

                      {def.latex && (
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 my-2">
                          <MathBlock math={def.latex} />
                        </div>
                      )}

                      <p className="text-sm text-slate-700 leading-relaxed">
                        {def.statement}
                      </p>

                      {def.conditions && def.conditions.length > 0 && (
                        <div className="space-y-1.5 pt-2">
                          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                            Conditions &amp; Requirements:
                          </span>
                          <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                            {def.conditions.map((cond, i) => (
                              <li key={i}>{cond}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs text-blue-900 leading-relaxed">
                        <strong className="block font-semibold mb-0.5 text-blue-950">Pedagogical Insight:</strong>
                        {def.explanation}
                      </div>
                    </div>

                    {def.keyTakeaway && (
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Takeaway: {def.keyTakeaway}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <Card title="Theory Section" subtitle="In Progress">
              <p className="text-slate-600 text-sm">
                Definitions and theoretical notes are being formatted for this section.
              </p>
            </Card>
          )}

          {/* Theoretical Guide Callout Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Ready to see these principles in action?</h3>
              <p className="text-sm text-blue-200">
                Explore {data.solutions.length} fully worked textbook exercises with step-by-step rationales.
              </p>
            </div>
            <button
              onClick={() => handleTabChange('solutions')}
              className="px-5 py-2.5 rounded-lg bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 transition-colors shrink-0 shadow"
            >
              View Worked Solutions &rarr;
            </button>
          </div>
      </div>

      {/* Tab 2: Worked Exercise Solutions */}
      <div id="section-panel-solutions" role="tabpanel" aria-labelledby="section-tab-solutions" tabIndex={0} hidden={activeTab !== 'solutions'} className="w-full space-y-6 animate-fadeIn">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Filter by Difficulty:
              </span>
              <div className="flex gap-1.5">
                {['all', 'tier1', 'tier2', 'tier3'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    aria-pressed={filterDifficulty === tier}
                    onClick={() => setFilterDifficulty(tier)}
                    className={`min-h-11 px-3 py-2 text-sm rounded-md font-medium transition-colors ${
                      filterDifficulty === tier
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tier === 'all' ? 'All Problems' : tier.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={expandAll}
                className="min-h-11 px-2 text-sm text-blue-700 hover:text-blue-900 font-medium"
              >
                Expand All
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={collapseAll}
                className="min-h-11 px-2 text-sm text-slate-600 hover:text-slate-800 font-medium"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Solutions List */}
          {filteredSolutions.length === 0 ? (
            <Card title="No Solutions Found" subtitle="Filter result">
              <p className="text-slate-600 text-sm">
                No solutions matched the selected difficulty filter.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredSolutions.map((sol: Solution) => {
                const isExpanded = !!expandedSolutions[sol.id];
                return (
                  <div
                    key={sol.id}
                    id={`solution-${sol.id.split('/').pop() || 'item'}`}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all scroll-mt-24"
                  >
                    {/* Header Clickable Row */}
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={`solution-content-${sol.id.split('/').pop() || 'item'}`}
                      onClick={() => toggleSolution(sol.id)}
                      className="flex w-full items-start justify-between gap-4 p-4 text-left transition-colors hover:bg-slate-50/80 sm:p-5"
                    >
                      <span className="block space-y-1.5 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 font-mono">
                            {sol.exerciseReference}
                          </span>
                          <Badge
                            variant={
                              sol.difficulty === 'tier1'
                                ? 'primary'
                                : sol.difficulty === 'tier2'
                                ? 'info'
                                : 'warning'
                            }
                            size="sm"
                          >
                            {sol.difficulty.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-slate-500 font-medium">
                            {sol.originalTopic}
                          </span>
                        </span>
                        <span className="block text-base font-bold text-slate-900">{sol.title}</span>
                        <span className="block text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {sol.problemStatement}
                        </span>
                      </span>

                      <span className="flex items-center gap-3 shrink-0 pt-1">
                        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                          {sol.steps.length} Steps
                        </span>
                        <span className="p-1 rounded-full bg-slate-100 text-slate-600" aria-hidden="true">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </span>
                      </span>
                    </button>

                    {/* Expandable Solution Content */}
                    <div id={`solution-content-${sol.id.split('/').pop() || 'item'}`} hidden={!isExpanded} role="region" aria-label={`Worked solution for ${sol.exerciseReference}`} className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-6 space-y-6">
                        {/* Paraphrased Problem Box */}
                        <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Problem Restatement ({sol.exerciseReference})
                          </span>
                          <p className="text-sm text-slate-800 font-medium leading-relaxed">
                            {sol.problemStatement}
                          </p>
                        </div>

                        {/* Sequential Steps */}
                        <div className="space-y-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                            Step-by-Step Derivation:
                          </span>
                          {sol.steps.map((step) => {
                            const stepKey = `${sol.id}-step-${step.stepNumber}`;
                            const isWhyOpen = !!revealedWhy[stepKey];
                            return (
                              <div
                                key={step.stepNumber}
                                className="bg-white rounded-lg border border-slate-200 p-4 space-y-3 sm:p-5"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                                      {step.stepNumber}
                                    </span>
                                    <h4 className="text-sm font-bold text-slate-900">
                                      {step.title}
                                    </h4>
                                  </div>
                                  <button
                                    type="button"
                                    aria-expanded={isWhyOpen}
                                    onClick={() => toggleWhy(stepKey)}
                                    className={`min-h-11 px-3 py-1 text-sm rounded border font-medium transition-colors flex items-center gap-1 ${
                                      isWhyOpen
                                        ? 'bg-amber-100 border-amber-300 text-amber-900'
                                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200'
                                    }`}
                                  >
                                    <Lightbulb className="w-3 h-3 text-amber-600" />
                                    <span>{isWhyOpen ? 'Hide Why' : 'Why this step?'}</span>
                                  </button>
                                </div>

                                {step.mathExpression && (
                                  <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                                    <MathBlock math={step.mathExpression} />
                                  </div>
                                )}

                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                  {step.explanation}
                                </p>

                                {/* Revealed 'Why' Callout */}
                                {isWhyOpen && (
                                  <div id={`why-${sol.id.split('/').pop()}-${step.stepNumber}`} className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-950 space-y-1 animate-fadeIn">
                                    <strong className="block font-semibold text-amber-950 flex items-center gap-1">
                                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                                      Mathematical Rationale (&quot;Why&quot;):
                                    </strong>
                                    <p className="leading-relaxed">{step.why}</p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Final Answer Box */}
                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                              Final Verified Answer
                            </span>
                            <div className="text-sm font-bold text-emerald-950">
                              <InlineMath math={sol.finalAnswer} />
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-white px-2.5 py-1 rounded border border-emerald-200 shrink-0">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>SymPy CAS Proven</span>
                          </div>
                        </div>
                      </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>

      {/* Adjacent Section Navigation Footer */}
      {(() => {
        const getNavHref = (baseHref: string) => {
          if (activeTab === 'solutions') {
            return baseHref.includes('?') ? `${baseHref}&tab=solutions` : `${baseHref}?tab=solutions`;
          }
          return baseHref;
        };

        return (
          <nav aria-label="Adjacent Section Navigation" className="pt-8 border-t border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevSection ? (
                <Link
                  href={getNavHref(prevSection.href)}
                  className="group flex flex-col p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 group-hover:text-blue-700 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                    Previous Section {activeTab === 'solutions' ? '(Solutions)' : ''}
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-1 group-hover:text-blue-800 transition-colors">
                    Section {prevSection.number}: {prevSection.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:flex items-center p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-xs text-slate-400">
                  Beginning of Thomas&apos; Calculus
                </div>
              )}

              {nextSection ? (
                <Link
                  href={getNavHref(nextSection.href)}
                  className="group flex flex-col p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all text-left sm:text-right"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 sm:justify-end group-hover:text-blue-700 transition-colors">
                    Next Section {activeTab === 'solutions' ? '(Solutions)' : ''}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-1 group-hover:text-blue-800 transition-colors">
                    Section {nextSection.number}: {nextSection.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:flex items-center justify-end p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-xs text-slate-400">
                  End of Chapter 4 Curriculum
                </div>
              )}
            </div>
          </nav>
        );
      })()}
    </div>
  );
}
