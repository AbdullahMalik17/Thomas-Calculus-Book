'use client';

import { useState } from 'react';
import { CheckCircle2, HelpCircle, Lightbulb, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MathBlock } from '@/components/math/MathBlock';

export interface PracticeProblem {
  id: string;
  title: string;
  difficulty: string;
  badgeVariant: 'primary' | 'warning' | 'success';
  prompt: string;
  math: string;
  hints: string[];
  solution: string;
  why: string;
}

export function PracticeProblemCard({ problem }: { problem: PracticeProblem }) {
  const [visibleHints, setVisibleHints] = useState(0);
  const [solutionVisible, setSolutionVisible] = useState(false);
  const hintsId = `${problem.id}-hints`;
  const solutionId = `${problem.id}-solution`;

  return (
    <Card className="border-l-4 border-l-[#176b63]">
      <article aria-labelledby={`${problem.id}-title`} className="space-y-5">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Practice problem</p>
            <h2 id={`${problem.id}-title`} className="text-lg font-bold leading-snug text-[#172b43]">{problem.title}</h2>
          </div>
          <Badge variant={problem.badgeVariant}>{problem.difficulty}</Badge>
        </div>

        <div className="space-y-2">
          <p className="text-base leading-relaxed text-slate-700">{problem.prompt}</p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <MathBlock math={problem.math} />
          </div>
        </div>

        <section aria-labelledby={`${problem.id}-hint-heading`} className="rounded-xl border border-[#d6e5e2] bg-[#f3f8f7] p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#174f4a]">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            <h3 id={`${problem.id}-hint-heading`}>Hints</h3>
            <span className="text-xs font-normal text-slate-600">{visibleHints} of {problem.hints.length} revealed</span>
          </div>
          <ol id={hintsId} className="space-y-2 pl-6 text-sm leading-relaxed text-slate-700" aria-live="polite">
            {problem.hints.slice(0, visibleHints).map((hint, index) => (
              <li key={index} className="list-decimal">{hint}</li>
            ))}
          </ol>
          <div className="mt-3 flex flex-wrap gap-2">
            {visibleHints < problem.hints.length ? (
              <button
                type="button"
                aria-controls={hintsId}
                onClick={() => setVisibleHints((count) => Math.min(count + 1, problem.hints.length))}
                className="min-h-11 rounded-lg border border-[#a8c8c2] bg-white px-3 py-2 text-sm font-semibold text-[#174f4a] hover:bg-[#e8f1ef]"
              >
                <Lightbulb className="mr-1.5 inline h-4 w-4" aria-hidden="true" />
                Show hint {visibleHints + 1}
              </button>
            ) : (
              <button
                type="button"
                aria-controls={hintsId}
                onClick={() => setVisibleHints(0)}
                className="min-h-11 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-[#174f4a]"
              >
                <RotateCcw className="mr-1.5 inline h-4 w-4" aria-hidden="true" />
                Reset hints
              </button>
            )}
            <button
              type="button"
              aria-expanded={solutionVisible}
              aria-controls={solutionId}
              onClick={() => setSolutionVisible((visible) => !visible)}
              className="min-h-11 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-[#174f4a]"
            >
              {solutionVisible ? 'Hide solution' : 'Show solution'}
            </button>
          </div>
        </section>

        <div id={solutionId} hidden={!solutionVisible} className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4" aria-label={`Solution to ${problem.title}`}>
          <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Solution and reasoning
          </h3>
          <MathBlock math={problem.solution} />
          <p className="text-sm leading-relaxed text-emerald-950"><strong>Why it works:</strong> {problem.why}</p>
        </div>
      </article>
    </Card>
  );
}
