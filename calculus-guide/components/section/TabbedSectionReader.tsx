'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

interface TabbedSectionReaderProps {
  data: SectionContentData;
}

export function TabbedSectionReader({ data }: TabbedSectionReaderProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'solutions'>('theory');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [revealedWhy, setRevealedWhy] = useState<Record<string, boolean>>({});
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

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
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Section {data.sectionNumber}</Badge>
          <Badge variant="success">SymPy CAS Verified</Badge>
          <Badge variant="info">Zod Content Guardrails</Badge>
          {data.solutions.length > 0 && (
            <Badge variant="secondary">{data.solutions.length} Worked Solutions</Badge>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Section {data.sectionNumber}: {data.title}
        </h1>

        <p className="text-slate-600 max-w-3xl leading-relaxed text-base">
          Curated study module for Thomas&apos; Calculus (14th Edition). Features authoritative mathematical definitions, theorem conditions, and fully worked exercise solutions with step-by-step pedagogical rationales.
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
      <div className="border-b border-slate-200">
        <nav className="flex space-x-4 sm:space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('theory')}
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-semibold text-sm transition-colors ${
              activeTab === 'theory'
                ? 'border-blue-600 text-blue-600'
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
            onClick={() => setActiveTab('solutions')}
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-semibold text-sm transition-colors ${
              activeTab === 'solutions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            Worked Exercise Solutions
            <span className="ml-1.5 py-0.5 px-2 text-xs rounded-full bg-slate-100 text-slate-700">
              {data.solutions.length}
            </span>
          </button>
        </nav>
      </div>

      {/* Tab 1: Important Definitions & Theory */}
      {activeTab === 'theory' && (
        <div className="space-y-8 animate-fadeIn">
          {data.definitionsFile && data.definitionsFile.definitions.length > 0 ? (
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-blue-600" />
                  Core Definitions, Theorems &amp; Rules
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {data.definitionsFile.definitions.length} Curated Mathematical Standards
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                      <p className="text-sm text-slate-700 font-medium leading-relaxed">
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
              onClick={() => setActiveTab('solutions')}
              className="px-5 py-2.5 rounded-lg bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 transition-colors shrink-0 shadow"
            >
              View Worked Solutions &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Worked Exercise Solutions */}
      {activeTab === 'solutions' && (
        <div className="space-y-6 animate-fadeIn">
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
                    onClick={() => setFilterDifficulty(tier)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
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
                onClick={expandAll}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Expand All
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={collapseAll}
                className="text-xs text-slate-500 hover:text-slate-700 font-medium"
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
                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all"
                  >
                    {/* Header Clickable Row */}
                    <div
                      onClick={() => toggleSolution(sol.id)}
                      className="p-5 cursor-pointer hover:bg-slate-50/80 transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
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
                        </div>
                        <h3 className="text-base font-bold text-slate-900">{sol.title}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {sol.problemStatement}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 pt-1">
                        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                          {sol.steps.length} Steps
                        </span>
                        <div className="p-1 rounded-full bg-slate-100 text-slate-600">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Solution Content */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50/50 p-5 sm:p-6 space-y-6">
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
                                className="bg-white rounded-lg border border-slate-200 p-4 space-y-3"
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
                                    onClick={() => toggleWhy(stepKey)}
                                    className={`px-2 py-0.5 text-xs rounded border font-medium transition-colors flex items-center gap-1 ${
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
                                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1 animate-fadeIn">
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
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
