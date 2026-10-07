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

export function QuizQuestion({ question, index, total }: { question: QuizQuestionData; index: number; total: number }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = question.options.find((option) => option.id === selectedId);
  const isCorrect = selected?.isCorrect ?? false;
  const feedbackId = `${question.id}-feedback`;

  return (
    <Card className="border-t-4 border-t-[#176b63]">
      <article aria-labelledby={`${question.id}-heading`} className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="text-sm font-semibold text-[#174f4a]">Question {index + 1} of {total}</span>
          <Badge variant="secondary">Concept check</Badge>
        </div>

        <h2 id={`${question.id}-heading`} className="text-lg font-bold leading-relaxed text-[#172b43] sm:text-xl">{question.question}</h2>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
          <MathBlock math={question.math} />
        </div>

        <fieldset aria-describedby={selectedId ? feedbackId : undefined} className="space-y-3">
          <legend className="mb-3 text-sm font-semibold text-slate-700">Choose the best answer</legend>
          {question.options.map((option) => {
            const checked = selectedId === option.id;
            const showCorrect = Boolean(selectedId) && option.isCorrect;
            return (
              <label
                key={option.id}
                className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                  checked
                    ? option.isCorrect
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-amber-500 bg-amber-50'
                    : showCorrect
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : 'border-slate-200 bg-white hover:border-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.id}
                  checked={checked}
                  onChange={() => setSelectedId(option.id)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#176b63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176b63]"
                />
                <span className="min-w-0 flex-1 text-sm leading-relaxed text-slate-800">
                  <span className="mr-2 font-bold text-[#174f4a]">{option.label}.</span>{option.text}
                  {checked && (
                    <span className="mt-1 block text-xs font-semibold" aria-hidden="true">
                      {option.isCorrect ? 'Your answer' : 'Your answer'}
                    </span>
                  )}
                  {showCorrect && !checked && (
                    <span className="mt-1 block text-xs font-semibold text-emerald-800">Correct answer</span>
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
            className={`rounded-xl border p-4 ${isCorrect ? 'border-emerald-300 bg-emerald-50 text-emerald-950' : 'border-amber-300 bg-amber-50 text-amber-950'}`}
          >
            <h3 className="flex items-center gap-2 font-bold">
              {isCorrect ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : <XCircle className="h-5 w-5" aria-hidden="true" />}
              {isCorrect ? 'That is correct.' : 'Not quite. Review the idea and try again.'}
            </h3>
            {!isCorrect && selected.misconception && (
              <p className="mt-2 text-sm leading-relaxed"><strong>What to watch for:</strong> {selected.misconception}</p>
            )}
            <p className="mt-2 text-sm leading-relaxed"><strong>Explanation:</strong> {question.explanation}</p>
          </div>
        )}
      </article>
    </Card>
  );
}
