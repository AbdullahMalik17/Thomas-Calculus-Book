'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, ExternalLink, Search, Sparkles } from 'lucide-react';
import { MathBlock } from '@/components/math/MathBlock';
import type { MidsDefinition } from '@/lib/content/mids-definitions-data';

interface MidsDefinitionsHubProps {
  definitions: MidsDefinition[];
}

const chapterNames: Record<number, string> = {
  1: 'Functions',
  2: 'Limits & Continuity',
  3: 'Derivatives',
};

const categoryLabels: Record<MidsDefinition['category'], string> = {
  definition: 'Definition',
  theorem: 'Theorem',
  formula: 'Formula',
  rule: 'Rule',
  test: 'Test',
};

const storageKey = 'calculus-guide:mids-definitions:mastered';

export function MidsDefinitionsHub({ definitions }: MidsDefinitionsHubProps) {
  const [chapter, setChapter] = useState<number | 'all'>('all');
  const [query, setQuery] = useState('');
  const [mastered, setMastered] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setMastered(JSON.parse(saved));
    } catch {
      // Local storage is an enhancement; the page remains usable without it.
    }
  }, []);

  const chapters = useMemo(
    () => Array.from(new Set(definitions.map((definition) => definition.chapterNumber))).sort(),
    [definitions]
  );

  const filteredDefinitions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return definitions.filter((definition) => {
      const matchesChapter = chapter === 'all' || definition.chapterNumber === chapter;
      const searchable = [
        definition.title,
        definition.statement,
        definition.intuition,
        definition.sectionTitle,
        definition.chapterTitle,
      ]
        .join(' ')
        .toLowerCase();
      return matchesChapter && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [chapter, definitions, query]);

  function toggleMastered(id: string) {
    const next = mastered.includes(id) ? mastered.filter((item) => item !== id) : [...mastered, id];
    setMastered(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Keep the in-memory state when storage is unavailable.
    }
  }

  return (
    <div className="space-y-7">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5" aria-label="Definition filters">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose a chapter">
            <button
              type="button"
              role="tab"
              aria-selected={chapter === 'all'}
              onClick={() => setChapter('all')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                chapter === 'all'
                  ? 'bg-[#176b63] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All chapters
            </button>
            {chapters.map((number) => (
              <button
                key={number}
                type="button"
                role="tab"
                aria-selected={chapter === number}
                onClick={() => setChapter(number)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  chapter === number
                    ? 'bg-[#176b63] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Chapter {number}
              </button>
            ))}
          </div>

          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Search definitions</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a concept or section"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#176b63] focus:outline-none focus:ring-2 focus:ring-[#176b63]/20"
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
          <span>
            Showing <strong className="text-slate-900">{filteredDefinitions.length}</strong> of {definitions.length} key ideas
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#176b63]">
            <Check className="h-4 w-4" aria-hidden="true" />
            {mastered.length} mastered
          </span>
        </div>
      </section>

      <div className="space-y-6">
        {filteredDefinitions.map((definition) => {
          const isMastered = mastered.includes(definition.id);
          const example = definition.example;
          return (
            <article
              key={definition.id}
              className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
                isMastered ? 'border-[#9ed2c9]' : 'border-slate-200'
              }`}
            >
              <header className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <span className="text-[#176b63]">Chapter {definition.chapterNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>Section {definition.sectionNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{categoryLabels[definition.category]}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-[#172b43] sm:text-2xl">{definition.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">{definition.sectionTitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleMastered(definition.id)}
                    aria-pressed={isMastered}
                    className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                      isMastered
                        ? 'border-[#9ed2c9] bg-[#edf8f5] text-[#176b63]'
                        : 'border-slate-200 text-slate-600 hover:border-[#9ed2c9] hover:text-[#176b63]'
                    }`}
                  >
                    <Check className="mr-1 inline-block h-3.5 w-3.5" aria-hidden="true" />
                    {isMastered ? 'Mastered' : 'Mark mastered'}
                  </button>
                </div>
                <p className="max-w-3xl text-base leading-7 text-slate-700">{definition.statement}</p>
              </header>

              <div className="grid gap-4 px-5 py-5 sm:px-7 lg:grid-cols-2">
                <section className="rounded-xl bg-[#edf8f5] p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#176b63]">Build the Intuition</p>
                  <p className="mt-2 text-base leading-7 text-slate-700">{definition.intuition}</p>
                </section>

                <section className="rounded-xl bg-sky-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-sky-700">Formal Idea</p>
                  {definition.latex && (
                    <div className="mt-3 rounded-lg bg-white p-3 shadow-sm">
                      <MathBlock math={definition.latex} className="my-0" />
                    </div>
                  )}
                  {definition.conditions.length > 0 && (
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      <strong>The rule:</strong> {definition.conditions.join('; ')}.
                    </p>
                  )}
                </section>

                {example && (
                  <section className="rounded-xl border border-sky-100 bg-white p-4 lg:col-span-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-sky-700">Practice Example</p>
                    <p className="mt-2 font-semibold text-slate-900">{example.problemStatement}</p>
                    <ol className="mt-3 space-y-3">
                      {example.steps.slice(0, 2).map((step) => (
                        <li key={step.stepNumber} className="flex gap-3 text-sm leading-6 text-slate-700">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                            {step.stepNumber}
                          </span>
                          <span>
                            <strong className="text-slate-900">{step.title}:</strong> {step.explanation}
                          </span>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                      <strong className="text-slate-900">Takeaway:</strong> {example.finalAnswer}
                    </p>
                    {example.steps.length > 2 && (
                      <details className="mt-3 text-sm text-slate-600">
                        <summary className="cursor-pointer font-semibold text-sky-700">Reveal the remaining steps</summary>
                        <ol className="mt-3 space-y-3">
                          {example.steps.slice(2).map((step) => (
                            <li key={step.stepNumber} className="flex gap-3 leading-6">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                                {step.stepNumber}
                              </span>
                              <span>{step.explanation}</span>
                            </li>
                          ))}
                        </ol>
                      </details>
                    )}
                  </section>
                )}

                {definition.takeaway && (
                  <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 lg:col-span-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-800">Exam Warning</p>
                    <p className="mt-2 text-sm leading-6 text-amber-950">{definition.takeaway}</p>
                  </section>
                )}

                {definition.conditions.length > 0 && (
                  <details className="rounded-xl border border-slate-200 bg-slate-50 p-4 lg:col-span-2">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-slate-800">
                      Go Deeper
                      <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
                    </summary>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                      {definition.conditions.map((condition) => <li key={condition}>• {condition}</li>)}
                    </ul>
                  </details>
                )}
              </div>

              <footer className="flex flex-wrap gap-4 border-t border-slate-100 px-5 py-4 text-sm sm:px-7">
                <Link href={definition.notesHref} className="font-semibold text-[#176b63] hover:text-[#0f4e49]">
                  Read full notes <ExternalLink className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <Link href={definition.practiceHref} className="font-semibold text-sky-700 hover:text-sky-900">
                  Practice this section <Sparkles className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </footer>
            </article>
          );
        })}
      </div>

      {filteredDefinitions.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-semibold text-slate-900">No definitions match that search.</p>
          <p className="mt-1 text-sm text-slate-600">Try a different concept or choose all chapters.</p>
        </div>
      )}
    </div>
  );
}
