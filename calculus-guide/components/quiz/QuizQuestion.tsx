'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MathBlock } from '@/components/math/MathBlock';

interface QuizOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
  misconception: string;
}

interface QuizQuestionData {
  id: string;
  question: string;
  math: string;
  options: QuizOption[];
  explanation: string;
}

export function QuizQuestion({
  question,
  index,
  total,
}: {
  question: QuizQuestionData;
  index: number;
  total: number;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = question.options.find((option) => option.id === selectedId);
  const isCorrect = selected?.isCorrect ?? false;
  const feedbackId = `${question.id}-feedback`;

  return (
    <Card className="border-t-4 border-t-brand-accent">
      <article aria-labelledby={`${question.id}-heading`} className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
          <span className="rounded border border-specular bg-surface-2 px-2.5 py-0.5 font-mono text-xs font-semibold text-brand-primary tabular-nums">
            Question {index + 1} of {total}
          </span>
          <Badge variant="secondary">Concept Check</Badge>
        </div>

        <h2
          id={`${question.id}-heading`}
          className="max-w-[68ch] font-reading text-lg font-bold leading-relaxed tracking-display text-ink-primary sm:text-xl"
        >
          {question.question}
        </h2>
        <div className="overflow-x-auto rounded-xl border border-specular bg-surface-2 p-3 sm:p-4">
          <MathBlock math={question.math} />
        </div>

        <fieldset aria-describedby={selectedId ? feedbackId : undefined} className="space-y-3">
          <legend className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Choose the best answer
          </legend>
          {question.options.map((option) => {
            const checked = selectedId === option.id;
            const showCorrect = Boolean(selectedId) && option.isCorrect;
            return (
              <label
                key={option.id}
                className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                  checked
                    ? option.isCorrect
                      ? 'border-specular bg-callout-theorem-bg text-callout-theorem-ink'
                      : 'border-specular bg-callout-misconception-bg text-callout-misconception-ink'
                    : showCorrect
                    ? 'border-specular bg-callout-theorem-bg/60'
                    : 'border-hairline bg-surface-1 hover:border-specular hover:bg-surface-2/60'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.id}
                  checked={checked}
                  onChange={() => setSelectedId(option.id)}
                  className="mt-1 h-4 w-4 shrink-0 accent-brand-accent"
                />
                <span className="min-w-0 flex-1 text-sm leading-relaxed text-ink-primary">
                  <span className="mr-2 inline-flex rounded border border-specular bg-surface-2 px-1.5 py-0.5 font-mono text-xs font-bold text-brand-primary tabular-nums">
                    {option.label}
                  </span>
                  <span className="font-reading">{option.text}</span>
                  {checked && (
                    <span className="mt-1 block font-mono text-xs font-semibold tabular-nums" aria-hidden="true">
                      Your selection
                    </span>
                  )}
                  {showCorrect && !checked && (
                    <span className="mt-1 block font-mono text-xs font-semibold text-callout-theorem-ink tabular-nums">
                      Correct option
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </fieldset>

        {selected && (
          <div
            id={feedbackId}
            role="status"
            aria-live="polite"
            className={`rounded-xl border border-specular p-4 space-y-2 ${
              isCorrect ? 'callout-theorem' : 'callout-misconception'
            }`}
          >
            <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
              {isCorrect ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
              ) : (
                <XCircle className="h-4 w-4 shrink-0 text-callout-misconception-ink" aria-hidden="true" />
              )}
              {isCorrect ? 'Verified Correct' : 'Diagnostic Misconception Alert'}
            </h3>
            {!isCorrect && selected.misconception && (
              <p className="max-w-[68ch] rounded-lg border border-specular bg-surface-1/85 p-3 font-reading text-sm leading-relaxed text-ink-primary">
                <strong className="font-mono text-xs uppercase tracking-wider text-callout-misconception-ink">
                  Misconception Diagnosis:{' '}
                </strong>
                {selected.misconception}
              </p>
            )}
            <p className="max-w-[68ch] font-reading text-sm leading-relaxed">
              <strong className="font-mono text-xs uppercase tracking-wider">Mathematical Rationale: </strong>
              {question.explanation}
            </p>
          </div>
        )}
      </article>
    </Card>
  );
}
