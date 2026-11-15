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
    <Card className="border-l-4 border-l-brand-accent">
      <article aria-labelledby={`${problem.id}-title`} className="space-y-5">
        <div className="flex flex-col gap-3 border-b border-hairline pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted tabular-nums">
              Practice Problem · {problem.id}
            </p>
            <h2
              id={`${problem.id}-title`}
              className="font-reading text-lg font-bold leading-snug tracking-display text-ink-primary"
            >
              {problem.title}
            </h2>
          </div>
          <Badge variant={problem.badgeVariant}>{problem.difficulty}</Badge>
        </div>

        <div className="space-y-2">
          <p className="max-w-[68ch] font-reading text-base leading-relaxed text-ink-primary">{problem.prompt}</p>
          <div className="overflow-x-auto rounded-xl border border-specular bg-surface-2 p-3 sm:p-4">
            <MathBlock math={problem.math} />
          </div>
        </div>

        <section
          aria-labelledby={`${problem.id}-hint-heading`}
          className="callout-example rounded-xl border border-specular p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-2 text-sm font-semibold text-callout-example-ink">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              <h3 id={`${problem.id}-hint-heading`}>Progressive Hints</h3>
            </div>
            <span className="rounded border border-specular bg-surface-1 px-2 py-0.5 font-mono text-xs font-semibold text-ink-secondary tabular-nums">
              {visibleHints} / {problem.hints.length} revealed
            </span>
          </div>
          <ol id={hintsId} className="space-y-2 pl-6 text-sm leading-relaxed text-ink-primary" aria-live="polite">
            {problem.hints.slice(0, visibleHints).map((hint, index) => (
              <li key={index} className="list-decimal font-reading">
                {hint}
              </li>
            ))}
          </ol>
          <div className="mt-3 flex flex-wrap gap-2">
            {visibleHints < problem.hints.length ? (
              <button
                type="button"
                aria-controls={hintsId}
                onClick={() => setVisibleHints((count) => Math.min(count + 1, problem.hints.length))}
                className="min-h-11 cursor-pointer rounded-lg border border-specular bg-surface-1 px-3.5 py-2 font-mono text-xs font-semibold tabular-nums text-brand-primary transition-colors hover:bg-surface-2"
              >
                <Lightbulb className="mr-1.5 inline h-4 w-4 text-brand-accent" aria-hidden="true" />
                Show hint {visibleHints + 1}
              </button>
            ) : (
              <button
                type="button"
                aria-controls={hintsId}
                onClick={() => setVisibleHints(0)}
                className="min-h-11 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-ink-secondary underline underline-offset-4 hover:text-brand-primary"
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
              className="min-h-11 cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-brand-primary underline underline-offset-4 hover:text-brand-accent"
            >
              {solutionVisible ? 'Hide solution' : 'Show solution'}
            </button>
          </div>
        </section>

        <div
          id={solutionId}
          hidden={!solutionVisible}
          className="callout-theorem space-y-3 rounded-xl border border-specular p-4"
          aria-label={`Solution to ${problem.title}`}
        >
          <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-callout-theorem-ink">
            <CheckCircle2 className="h-4 w-4 text-brand-accent" aria-hidden="true" />
            Verified Solution &amp; Rationale
          </h3>
          <div className="overflow-x-auto rounded-lg border border-specular bg-surface-1 p-2.5">
            <MathBlock math={problem.solution} />
          </div>
          <p className="max-w-[68ch] font-reading text-sm leading-relaxed text-callout-theorem-ink">
            <strong className="font-mono text-xs uppercase tracking-wider">Why it works: </strong>
            {problem.why}
          </p>
        </div>
      </article>
    </Card>
  );
}
