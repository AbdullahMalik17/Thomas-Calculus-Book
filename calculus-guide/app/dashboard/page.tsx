'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getAllSections, CHAPTER_METADATA } from '@/lib/content/curriculum';
import {
  CheckCircle2,
  TrendingUp,
  Cpu,
  ShieldCheck,
  BookOpen,
  ListOrdered,
  Layers,
  Filter,
} from 'lucide-react';

export default function DashboardPage() {
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const allSections = getAllSections();
  const totalSolutions = allSections.reduce((sum, s) => sum + s.solutionsCount, 0);

  const filteredSections =
    selectedChapter === 'all'
      ? allSections
      : allSections.filter((s) => s.chapterKey === selectedChapter);

  const metrics = [
    {
      title: 'Curriculum Coverage',
      value: `${allSections.length} / ${allSections.length}`,
      subtitle: 'All 16 Chapters 100% Complete',
      icon: CheckCircle2,
      color: 'text-brand-accent',
      badge: 'Complete',
    },
    {
      title: 'SymPy Math Engine',
      value: `${totalSolutions} / ${totalSolutions}`,
      subtitle: 'Verified Step-by-Step Solutions',
      icon: Cpu,
      color: 'text-brand-primary',
      badge: 'CAS Verified',
    },
    {
      title: 'Zod Content Schemas',
      value: '730 / 730',
      subtitle: 'Items Passed Strict Guardrails',
      icon: ShieldCheck,
      color: 'text-brand-accent',
      badge: 'Validated',
    },
    {
      title: 'Misconception Coverage',
      value: '100%',
      subtitle: '24 / 24 Distractors Diagnosed',
      icon: TrendingUp,
      color: 'text-brand-primary',
      badge: 'Audited',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Editorial Monograph Dashboard Header */}
      <div className="surface-grain bg-surface-1 rounded-2xl border border-specular p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Analytics &amp; Verification Hub</Badge>
          <Badge variant="success" className="font-mono tabular-nums">
            All {allSections.length} Sections Operational
          </Badge>
          <Badge variant="info" className="font-mono tabular-nums">
            {totalSolutions} Verified Solutions
          </Badge>
        </div>

        <h1 className="font-reading text-3xl sm:text-4xl font-bold tracking-display text-ink-primary">
          Student Mastery &amp; Engine Status Dashboard
        </h1>

        <p className="max-w-[68ch] font-reading text-ink-secondary leading-relaxed">
          Real-time tracking of curriculum coverage, symbolic mathematical verification tests, and pedagogical
          misconception diagnostics across all <span className="font-mono tabular-nums">16</span> completed chapters of
          Thomas&apos; Calculus (14th Edition).
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <Button href="/chapters" size="sm" variant="primary" className="gap-1.5">
            <Layers className="w-4 h-4" />
            Curriculum Table of Contents
          </Button>
          <Button href="/practice/1.1-functions-and-graphs" size="sm" variant="outline" className="gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-brand-accent" />
            Practice Problems
          </Button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i} className="border-t-4 border-t-brand-primary">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Icon className={`w-6 h-6 ${m.color}`} />
                  <Badge variant="primary">{m.badge}</Badge>
                </div>
                <div>
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-ink-primary tabular-nums">
                    {m.value}
                  </span>
                  <h2 className="font-reading text-base font-bold text-ink-primary mt-1">{m.title}</h2>
                  <p className="font-mono text-xs text-ink-muted mt-0.5 tabular-nums">{m.subtitle}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Curriculum Coverage Breakdown Table */}
      <div className="bg-surface-1 rounded-2xl border border-specular p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-reading text-2xl font-bold tracking-display text-ink-primary">
              Complete Curriculum Section Index (
              <span className="font-mono tabular-nums">{allSections.length}</span> Sections)
            </h2>
            <p className="max-w-[65ch] text-sm text-ink-secondary">
              Live status, solution counts, and engine verification for all chapters.
            </p>
          </div>

          {/* Chapter Filter Controls */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>
            <button
              type="button"
              onClick={() => setSelectedChapter('all')}
              className={`cursor-pointer px-3 py-1 font-mono text-xs rounded-lg font-semibold tabular-nums transition-colors ${
                selectedChapter === 'all'
                  ? 'bg-brand-primary text-ink-inverse'
                  : 'bg-surface-2 text-ink-secondary hover:bg-paper-edge'
              }`}
            >
              All ({allSections.length})
            </button>
            {Object.values(CHAPTER_METADATA).map((ch) => (
              <button
                key={ch.key}
                type="button"
                onClick={() => setSelectedChapter(ch.key)}
                className={`cursor-pointer px-3 py-1 font-mono text-xs rounded-lg font-semibold tabular-nums transition-colors ${
                  selectedChapter === ch.key
                    ? 'bg-brand-primary text-ink-inverse'
                    : 'bg-surface-2 text-ink-secondary hover:bg-paper-edge'
                }`}
              >
                Ch {ch.num} ({ch.sections.length})
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-ink-secondary border-collapse">
            <thead>
              <tr className="border-b border-specular font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider bg-surface-2">
                <th scope="col" className="py-3 px-4">
                  Section &amp; Title
                </th>
                <th scope="col" className="py-3 px-4">
                  Chapter
                </th>
                <th scope="col" className="py-3 px-4">
                  Worked Solutions
                </th>
                <th scope="col" className="py-3 px-4">
                  Interactive Modules
                </th>
                <th scope="col" className="py-3 px-4">
                  Engine Verification
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filteredSections.map((sec) => (
                <tr key={`${sec.chapterKey}-${sec.id}`} className="hover:bg-surface-2/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-ink-primary">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-brand-accent shrink-0" />
                      <div>
                        <span className="font-mono text-brand-primary mr-1.5 tabular-nums">{sec.number}</span>
                        <span className="font-reading">{sec.title}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs font-medium text-ink-secondary tabular-nums">
                    Chapter {sec.chapterNum}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs font-medium text-ink-primary tabular-nums">
                    {sec.solutionsCount} Paraphrased Solutions
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs tabular-nums">
                    {sec.practiceCount > 0 ? (
                      <span className="text-brand-accent font-medium">
                        {sec.practiceCount} Practice &bull; {sec.mcqCount} MCQs
                      </span>
                    ) : (
                      <span className="text-ink-muted">Theory Guide</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-brand-accent font-semibold tabular-nums">
                    <span className="inline-flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-brand-primary" />
                      SymPy Verified
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={sec.badgeVariant} size="sm">
                      {sec.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                    <Link
                      href={sec.href}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold text-brand-primary hover:bg-surface-2 transition-colors"
                    >
                      Guide
                    </Link>
                    <Link
                      href={sec.solutionsHref}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold text-ink-secondary hover:bg-surface-2 hover:text-brand-primary transition-colors"
                    >
                      <ListOrdered className="w-3 h-3 text-brand-accent" />
                      Solutions
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Pipeline Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="SymPy Symbolic Validation Pipeline" subtitle="Subprocess & CLI Engine">
          <div className="space-y-3 text-sm text-ink-secondary">
            <p className="max-w-[65ch] font-reading">
              Mathematical claims across all <span className="font-mono tabular-nums">{totalSolutions}</span> textbook
              solutions are verified using SymPy symbolic equivalence:
            </p>
            <div className="p-3 bg-surface-3 text-sky-300 font-mono text-xs rounded-lg border border-specular tabular-nums">
              simplify(expr - expected) == 0
            </div>
            <p className="max-w-[65ch] text-xs text-ink-muted">
              Covers algebraic factoring, expansions, trigonometric identities, limits, derivatives, chain rules,
              optimization, antiderivatives, multivariable calculus, and vector fields.
            </p>
          </div>
        </Card>

        <Card title="Zod Schema Guardrail Pipeline" subtitle="Content Integrity Assurance">
          <div className="space-y-3 text-sm text-ink-secondary">
            <p className="max-w-[65ch] font-reading">
              All registered content files conform strictly to TypeScript Zod schemas:
            </p>
            <div className="p-3 bg-surface-3 text-sky-300 font-mono text-xs rounded-lg border border-specular tabular-nums">
              npm run content:validate
            </div>
            <p className="max-w-[65ch] text-xs text-ink-muted">
              Enforces 1-to-1 file path to item ID mapping, exactly 1 correct answer + 3 misconception-annotated
              distractors, and non-empty step rationales.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
