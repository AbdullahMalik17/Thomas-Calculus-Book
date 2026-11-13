'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Filter,
  Flag,
  GraduationCap,
  HelpCircle,
  RotateCcw,
  Search,
  Timer,
  Trophy,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InlineMath } from '@/components/math/InlineMath';
import { MathBlock } from '@/components/math/MathBlock';
import {
  MIDS_CHAPTERS,
  MIDS_EXAM_QUESTIONS,
  type MidsExamQuestion,
} from '@/lib/content/mids-exam-data';

type HubMode = 'study' | 'mock';
type ChapterFilter = 'all' | 1 | 2 | 3;
type StatusFilter = 'all' | 'unanswered' | 'correct' | 'incorrect';
type ExamSizeOption = 65 | 30 | 15;
type TimerOptionMinutes = 0 | 30 | 60 | 90;
type ExamPhase = 'setup' | 'active' | 'submitted';

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

function formatDuration(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getLetterGrade(percent: number): { label: string; variant: 'success' | 'primary' | 'warning' | 'default' } {
  if (percent >= 90) return { label: 'A (Excellent)', variant: 'success' };
  if (percent >= 80) return { label: 'B (Strong)', variant: 'primary' };
  if (percent >= 70) return { label: 'C (Passing)', variant: 'info' as 'primary' };
  if (percent >= 60) return { label: 'D (Needs Practice)', variant: 'warning' };
  return { label: 'Review Recommended', variant: 'warning' };
}

function buildExamQuestions(size: ExamSizeOption): MidsExamQuestion[] {
  if (size === 65) {
    return MIDS_EXAM_QUESTIONS;
  }
  const perChapter = size / 3; // 10 for 30, 5 for 15
  const selected: MidsExamQuestion[] = [];
  for (const ch of [1, 2, 3] as const) {
    const chQuestions = MIDS_EXAM_QUESTIONS.filter((q) => q.chapter === ch);
    // Deterministic even spread across the chapter so all topic areas are sampled
    const step = chQuestions.length / perChapter;
    for (let i = 0; i < perChapter; i++) {
      const idx = Math.min(chQuestions.length - 1, Math.floor(i * step));
      selected.push(chQuestions[idx]);
    }
  }
  return selected;
}

export function MidsExamHub() {
  const [mode, setMode] = useState<HubMode>('study');

  // Study & Review Mode state
  const [chapterFilter, setChapterFilter] = useState<ChapterFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [studyAnswers, setStudyAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});

  // Mock Exam Mode state
  const [examPhase, setExamPhase] = useState<ExamPhase>('setup');
  const [examSize, setExamSize] = useState<ExamSizeOption>(30);
  const [timerMinutes, setTimerMinutes] = useState<TimerOptionMinutes>(60);
  const [examQuestions, setExamQuestions] = useState<MidsExamQuestion[]>(() => buildExamQuestions(30));
  const [examAnswers, setExamAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedIds, setFlaggedIds] = useState<Record<string, boolean>>({});
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60 * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [showMissedOnly, setShowMissedOnly] = useState<boolean>(false);

  // Study mode metrics
  const studyStats = useMemo(() => {
    const answeredIds = Object.keys(studyAnswers);
    let correctCount = 0;
    for (const q of MIDS_EXAM_QUESTIONS) {
      if (studyAnswers[q.id] === q.correctId) {
        correctCount++;
      }
    }
    const answeredCount = answeredIds.length;
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    const byChapter = MIDS_CHAPTERS.map((meta) => {
      const chQs = MIDS_EXAM_QUESTIONS.filter((q) => q.chapter === meta.chapter);
      const chAnswered = chQs.filter((q) => Boolean(studyAnswers[q.id])).length;
      const chCorrect = chQs.filter((q) => studyAnswers[q.id] === q.correctId).length;
      return {
        ...meta,
        answered: chAnswered,
        correct: chCorrect,
      };
    });

    return { answeredCount, correctCount, accuracy, byChapter };
  }, [studyAnswers]);

  // Filtered study questions
  const filteredStudyQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MIDS_EXAM_QUESTIONS.filter((q) => {
      if (chapterFilter !== 'all' && q.chapter !== chapterFilter) return false;

      const userChoice = studyAnswers[q.id];
      if (statusFilter === 'unanswered' && userChoice) return false;
      if (statusFilter === 'correct' && userChoice !== q.correctId) return false;
      if (statusFilter === 'incorrect' && (!userChoice || userChoice === q.correctId)) return false;

      if (query) {
        const haystack = `${q.topic} ${q.question} ${q.chapterTitle} q${q.questionNumber} #${q.globalNumber}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [chapterFilter, statusFilter, searchQuery, studyAnswers]);

  // Timer effect during active Mock Exam
  useEffect(() => {
    if (mode !== 'mock' || examPhase !== 'active') return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      if (timerMinutes > 0) {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setExamPhase('submitted');
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, examPhase, timerMinutes]);

  const startMockExam = () => {
    const qs = buildExamQuestions(examSize);
    setExamQuestions(qs);
    setExamAnswers({});
    setFlaggedIds({});
    setActiveQuestionIdx(0);
    setElapsedSeconds(0);
    setSecondsRemaining(timerMinutes * 60);
    setShowMissedOnly(false);
    setExamPhase('active');
  };

  const submitMockExam = () => {
    setExamPhase('submitted');
  };

  const toggleFlag = (id: string) => {
    setFlaggedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Mock Exam scoring breakdown
  const mockResults = useMemo(() => {
    let correct = 0;
    let answered = 0;
    for (const q of examQuestions) {
      if (examAnswers[q.id]) answered++;
      if (examAnswers[q.id] === q.correctId) correct++;
    }
    const total = examQuestions.length;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    const perChapter = MIDS_CHAPTERS.map((meta) => {
      const chQs = examQuestions.filter((q) => q.chapter === meta.chapter);
      const chCorrect = chQs.filter((q) => examAnswers[q.id] === q.correctId).length;
      const chPercent = chQs.length > 0 ? Math.round((chCorrect / chQs.length) * 100) : 0;
      return {
        ...meta,
        total: chQs.length,
        correct: chCorrect,
        percent: chPercent,
      };
    });

    return { correct, answered, total, percent, perChapter };
  }, [examQuestions, examAnswers]);

  const currentExamQuestion = examQuestions[activeQuestionIdx];

  return (
    <div className="space-y-8">
      {/* Mode Switcher & Overview Stats Bar */}
      <div className="rounded-2xl border border-[#dbe2ea] bg-white p-4 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 w-full sm:w-auto" role="tablist" aria-label="Midterm preparation mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'study'}
              onClick={() => setMode('study')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                mode === 'study'
                  ? 'bg-white text-[#172b43] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="h-4 w-4 text-[#176b63]" aria-hidden="true" />
              <span>Study &amp; Review Mode</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'mock'}
              onClick={() => setMode('mock')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                mode === 'mock'
                  ? 'bg-white text-[#172b43] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="h-4 w-4 text-blue-700" aria-hidden="true" />
              <span>Mock Exam Mode</span>
            </button>
          </div>

          {/* Chapter Pill Counters */}
          <div className="flex flex-wrap items-center gap-2">
            {studyStats.byChapter.map((ch) => (
              <div
                key={ch.key}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
              >
                <span className="font-bold text-[#172b43]">Ch {ch.chapter}</span>
                <span className="text-slate-500">{ch.questionCount} Qs</span>
                {mode === 'study' && ch.answered > 0 && (
                  <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-semibold text-emerald-800">
                    {ch.correct}/{ch.answered}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Study Mode Progress Bar */}
        {mode === 'study' && (
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
              <span className="font-medium text-slate-700">
                Study Progress: <strong className="text-[#172b43]">{studyStats.answeredCount}</strong> of{' '}
                <strong>{MIDS_EXAM_QUESTIONS.length}</strong> questions answered
              </span>
              <div className="flex items-center gap-4">
                <span className="text-slate-600">
                  Accuracy:{' '}
                  <strong className={studyStats.accuracy >= 70 ? 'text-emerald-700' : 'text-[#172b43]'}>
                    {studyStats.answeredCount > 0 ? `${studyStats.accuracy}%` : '—'}
                  </strong>{' '}
                  ({studyStats.correctCount} correct)
                </span>
                {studyStats.answeredCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setStudyAnswers({})}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-red-700 transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Reset
                  </button>
                )}
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#176b63] transition-all duration-300"
                style={{ width: `${(studyStats.answeredCount / MIDS_EXAM_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* STUDY & REVIEW MODE                                                   */}
      {/* ===================================================================== */}
      {mode === 'study' && (
        <div className="space-y-6">
          {/* Chapter Tabs & Filters */}
          <div className="rounded-2xl border border-[#dbe2ea] bg-white p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by chapter">
              <button
                type="button"
                onClick={() => setChapterFilter('all')}
                className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                  chapterFilter === 'all'
                    ? 'bg-[#172b43] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Chapters ({MIDS_EXAM_QUESTIONS.length})
              </button>
              {MIDS_CHAPTERS.map((ch) => (
                <button
                  key={ch.key}
                  type="button"
                  onClick={() => setChapterFilter(ch.chapter)}
                  className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                    chapterFilter === ch.chapter
                      ? 'bg-[#176b63] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {ch.title} ({ch.questionCount})
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-12">
              <div className="relative sm:col-span-7">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by topic or keyword (e.g., chain rule, domain, limit, continuity)..."
                  aria-label="Search midterm questions"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#176b63] focus:outline-none focus:ring-2 focus:ring-[#176b63]/20"
                />
              </div>

              <div className="flex items-center gap-2 sm:col-span-5">
                <Filter className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  aria-label="Filter by completion status"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-[#176b63] focus:outline-none focus:ring-2 focus:ring-[#176b63]/20"
                >
                  <option value="all">All Questions</option>
                  <option value="unanswered">Unanswered Only</option>
                  <option value="correct">Answered Correctly</option>
                  <option value="incorrect">Needs Review (Incorrect)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Question List */}
          {filteredStudyQuestions.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-base font-semibold text-slate-800">No questions match your current filters.</p>
              <p className="mt-1 text-sm text-slate-500">Try clearing the search term or switching the status filter.</p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setChapterFilter('all');
                    setStatusFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Show All 65 Questions
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredStudyQuestions.map((q) => {
                const selectedId = studyAnswers[q.id];
                const selectedOpt = q.options.find((o) => o.id === selectedId);
                const isCorrect = selectedId === q.correctId;
                const feedbackId = `${q.id}-study-feedback`;

                return (
                  <Card key={q.id} className="border-t-4 border-t-[#176b63]">
                    <article aria-labelledby={`${q.id}-title`} className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="primary">
                            Ch {q.chapter} &middot; Q{q.questionNumber}
                          </Badge>
                          <span className="text-xs font-medium text-slate-500">
                            Question #{q.globalNumber} of {MIDS_EXAM_QUESTIONS.length}
                          </span>
                        </div>
                        <Badge variant="secondary">{q.topic}</Badge>
                      </div>

                      <h2 id={`${q.id}-title`} className="text-base sm:text-lg font-bold leading-relaxed text-[#172b43]">
                        <FormattedMathText text={q.question} />
                      </h2>

                      {q.math && (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
                          <MathBlock math={q.math} />
                        </div>
                      )}

                      <fieldset aria-describedby={selectedId ? feedbackId : undefined} className="grid gap-3 sm:grid-cols-2">
                        <legend className="sr-only">Options for {q.id}</legend>
                        {q.options.map((opt) => {
                          const checked = selectedId === opt.id;
                          const optionIsCorrect = opt.id === q.correctId;
                          const showCorrectHighlight = Boolean(selectedId) && optionIsCorrect;

                          return (
                            <label
                              key={opt.id}
                              className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors ${
                                checked
                                  ? optionIsCorrect
                                    ? 'border-emerald-500 bg-emerald-50'
                                    : 'border-amber-500 bg-amber-50'
                                  : showCorrectHighlight
                                  ? 'border-emerald-300 bg-emerald-50/50'
                                  : 'border-slate-200 bg-white hover:border-slate-400'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`study-${q.id}`}
                                value={opt.id}
                                checked={checked}
                                onChange={() =>
                                  setStudyAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: opt.id,
                                  }))
                                }
                                className="mt-1 h-4 w-4 shrink-0 accent-[#176b63]"
                              />
                              <span className="min-w-0 flex-1 text-sm leading-relaxed text-slate-800">
                                <span className="mr-2 font-bold text-[#174f4a]">{opt.id}.</span>
                                <FormattedMathText text={opt.text} />
                                {showCorrectHighlight && !checked && (
                                  <span className="mt-1 block text-xs font-semibold text-emerald-800">
                                    Correct answer
                                  </span>
                                )}
                              </span>
                            </label>
                          );
                        })}
                      </fieldset>

                      {selectedId && (
                        <div
                          id={feedbackId}
                          role="status"
                          aria-live="polite"
                          className={`rounded-xl border p-4 space-y-2 ${
                            isCorrect
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                              : 'border-amber-300 bg-amber-50 text-amber-950'
                          }`}
                        >
                          <div className="flex items-center gap-2 font-bold">
                            {isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                            ) : (
                              <XCircle className="h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
                            )}
                            <span>
                              {isCorrect
                                ? 'Correct!'
                                : `Not quite — option ${q.correctId} is correct.`}
                            </span>
                          </div>

                          {!isCorrect && selectedOpt?.misconception && (
                            <p className="text-sm leading-relaxed">
                              <strong>Common misconception: </strong>
                              <FormattedMathText text={selectedOpt.misconception} />
                            </p>
                          )}

                          <p className="text-sm leading-relaxed">
                            <strong>Solution: </strong>
                            <FormattedMathText text={q.explanation} />
                          </p>
                        </div>
                      )}
                    </article>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* MOCK EXAM MODE                                                        */}
      {/* ===================================================================== */}
      {mode === 'mock' && (
        <div className="space-y-6">
          {/* Phase 1: Exam Setup */}
          {examPhase === 'setup' && (
            <Card className="border-t-4 border-t-blue-700">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Badge variant="primary">Exam Simulator</Badge>
                  <h2 className="text-2xl font-bold text-[#172b43]">Configure Your Midterm Mock Exam</h2>
                  <p className="text-sm leading-relaxed text-slate-600 max-w-2xl">
                    Simulate real midterm exam conditions covering Chapter 1 (Functions), Chapter 2 (Limits &amp; Continuity),
                    and Chapter 3 (Derivatives). Answers and step-by-step solutions remain hidden until you submit.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Length Picker */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-[#172b43]">
                      1. Select Question Set
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          size: 65 as ExamSizeOption,
                          title: 'Full Midterm Bank (65 Questions)',
                          desc: 'All 21 Ch 1 + 20 Ch 2 + 24 Ch 3 questions',
                        },
                        {
                          size: 30 as ExamSizeOption,
                          title: 'Standard Midterm (30 Questions)',
                          desc: 'Balanced 10 questions from each chapter',
                        },
                        {
                          size: 15 as ExamSizeOption,
                          title: 'Quick Diagnostic (15 Questions)',
                          desc: '5 representative questions per chapter',
                        },
                      ].map((opt) => (
                        <button
                          key={opt.size}
                          type="button"
                          onClick={() => setExamSize(opt.size)}
                          className={`w-full rounded-xl border p-3.5 text-left transition-colors ${
                            examSize === opt.size
                              ? 'border-blue-700 bg-blue-50/70 ring-1 ring-blue-700'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="text-sm font-bold text-[#172b43]">{opt.title}</div>
                          <div className="text-xs text-slate-600 mt-0.5">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timer Picker */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-[#172b43]">
                      2. Select Time Limit
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { mins: 0 as TimerOptionMinutes, label: 'Untimed', sub: 'No countdown' },
                        { mins: 30 as TimerOptionMinutes, label: '30 Minutes', sub: 'Fast sprint' },
                        { mins: 60 as TimerOptionMinutes, label: '60 Minutes', sub: 'Standard mid' },
                        { mins: 90 as TimerOptionMinutes, label: '90 Minutes', sub: 'Extended time' },
                      ].map((t) => (
                        <button
                          key={t.mins}
                          type="button"
                          onClick={() => setTimerMinutes(t.mins)}
                          className={`rounded-xl border p-3.5 text-left transition-colors ${
                            timerMinutes === t.mins
                              ? 'border-[#176b63] bg-emerald-50/60 ring-1 ring-[#176b63]'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-sm font-bold text-[#172b43]">
                            <Timer className="h-4 w-4 text-[#176b63]" aria-hidden="true" />
                            <span>{t.label}</span>
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5">{t.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                  <div className="text-xs text-slate-500">
                    Selected: <strong>{examSize} questions</strong> &middot;{' '}
                    <strong>{timerMinutes === 0 ? 'Untimed' : `${timerMinutes} minutes`}</strong>
                  </div>
                  <Button size="lg" onClick={startMockExam} className="bg-[#1e3a5f] hover:bg-[#142d4d]">
                    Start Midterm Exam
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Phase 2: Active Exam */}
          {examPhase === 'active' && currentExamQuestion && (
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Main Active Question Card */}
              <div className="lg:col-span-8 space-y-4">
                <Card className="border-t-4 border-t-blue-700">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="primary">
                          Question {activeQuestionIdx + 1} of {examQuestions.length}
                        </Badge>
                        <Badge variant="secondary">{currentExamQuestion.chapterTitle}</Badge>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFlag(currentExamQuestion.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                          flaggedIds[currentExamQuestion.id]
                            ? 'border-amber-400 bg-amber-50 text-amber-800'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Flag className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{flaggedIds[currentExamQuestion.id] ? 'Flagged' : 'Flag for Review'}</span>
                      </button>
                    </div>

                    <h2 className="text-lg font-bold leading-relaxed text-[#172b43]">
                      <FormattedMathText text={currentExamQuestion.question} />
                    </h2>

                    {currentExamQuestion.math && (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
                        <MathBlock math={currentExamQuestion.math} />
                      </div>
                    )}

                    <fieldset className="space-y-3">
                      <legend className="sr-only">Select your answer</legend>
                      {currentExamQuestion.options.map((opt) => {
                        const checked = examAnswers[currentExamQuestion.id] === opt.id;
                        return (
                          <label
                            key={opt.id}
                            className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                              checked
                                ? 'border-blue-700 bg-blue-50/80 ring-1 ring-blue-700'
                                : 'border-slate-200 bg-white hover:border-slate-400'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`mock-${currentExamQuestion.id}`}
                              value={opt.id}
                              checked={checked}
                              onChange={() =>
                                setExamAnswers((prev) => ({
                                  ...prev,
                                  [currentExamQuestion.id]: opt.id,
                                }))
                              }
                              className="mt-1 h-4 w-4 shrink-0 accent-blue-700"
                            />
                            <span className="min-w-0 flex-1 text-sm leading-relaxed text-slate-800">
                              <span className="mr-2 font-bold text-[#172b43]">{opt.id}.</span>
                              <FormattedMathText text={opt.text} />
                            </span>
                          </label>
                        );
                      })}
                    </fieldset>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <Button
                        variant="outline"
                        disabled={activeQuestionIdx === 0}
                        onClick={() => setActiveQuestionIdx((i) => Math.max(0, i - 1))}
                      >
                        Previous
                      </Button>

                      <div className="flex items-center gap-2">
                        {activeQuestionIdx < examQuestions.length - 1 ? (
                          <Button
                            onClick={() =>
                              setActiveQuestionIdx((i) => Math.min(examQuestions.length - 1, i + 1))
                            }
                          >
                            Next Question
                          </Button>
                        ) : (
                          <Button
                            onClick={submitMockExam}
                            className="bg-[#176b63] hover:bg-[#12554e]"
                          >
                            Submit Midterm Exam
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Exam Status & Question Navigator Sidebar */}
              <div className="lg:col-span-4 space-y-4">
                <Card>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-sm font-bold text-[#172b43]">Exam Status</span>
                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-mono font-bold text-[#172b43]">
                        <Clock className="h-3.5 w-3.5 text-[#176b63]" aria-hidden="true" />
                        <span>
                          {timerMinutes > 0
                            ? formatDuration(secondsRemaining)
                            : formatDuration(elapsedSeconds)}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 flex items-center justify-between">
                      <span>
                        Answered:{' '}
                        <strong className="text-[#172b43]">
                          {Object.keys(examAnswers).length}/{examQuestions.length}
                        </strong>
                      </span>
                      <span>
                        Flagged:{' '}
                        <strong className="text-amber-700">
                          {Object.values(flaggedIds).filter(Boolean).length}
                        </strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-5 gap-1.5">
                      {examQuestions.map((q, idx) => {
                        const isCurrent = idx === activeQuestionIdx;
                        const isAnswered = Boolean(examAnswers[q.id]);
                        const isFlagged = Boolean(flaggedIds[q.id]);

                        return (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => setActiveQuestionIdx(idx)}
                            aria-label={`Jump to question ${idx + 1}`}
                            className={`relative h-9 rounded-lg text-xs font-bold transition-all ${
                              isCurrent
                                ? 'bg-[#172b43] text-white ring-2 ring-blue-400'
                                : isFlagged
                                ? 'bg-amber-100 text-amber-900 border border-amber-400'
                                : isAnswered
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                      <Button
                        onClick={submitMockExam}
                        className="w-full bg-[#176b63] hover:bg-[#12554e]"
                      >
                        Submit Exam Now
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setExamPhase('setup')}
                        className="w-full text-xs"
                      >
                        Cancel &amp; Reconfigure
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Phase 3: Submitted Results & Detailed Review */}
          {examPhase === 'submitted' && (
            <div className="space-y-6">
              <Card className="border-t-4 border-t-[#176b63]">
                <div className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-amber-600" aria-hidden="true" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#176b63]">
                          Midterm Exam Results
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#172b43]">
                        Score: {mockResults.correct} / {mockResults.total} ({mockResults.percent}%)
                      </h2>
                      <p className="text-sm text-slate-600">
                        Answered {mockResults.answered} of {mockResults.total} questions &middot; Time elapsed:{' '}
                        <strong>{formatDuration(elapsedSeconds)}</strong>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant={getLetterGrade(mockResults.percent).variant} size="lg">
                        {getLetterGrade(mockResults.percent).label}
                      </Badge>
                      <Button onClick={startMockExam} variant="outline" className="gap-1.5">
                        <RotateCcw className="h-4 w-4" aria-hidden="true" />
                        Retake Exam
                      </Button>
                      <Button onClick={() => setExamPhase('setup')}>
                        New Configuration
                      </Button>
                    </div>
                  </div>

                  {/* Per-Chapter Mastery Breakdown */}
                  <div className="grid gap-4 md:grid-cols-3 border-t border-slate-100 pt-5">
                    {mockResults.perChapter.map((ch) => (
                      <div key={ch.key} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-[#172b43]">
                          <span>{ch.shortTitle}</span>
                          <span>
                            {ch.correct}/{ch.total} ({ch.percent}%)
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                          <div
                            className={`h-full rounded-full ${
                              ch.percent >= 75 ? 'bg-emerald-600' : ch.percent >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${ch.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Review Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-[#172b43]">Detailed Answer Review</h3>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={showMissedOnly}
                    onChange={(e) => setShowMissedOnly(e.target.checked)}
                    className="h-4 w-4 accent-[#176b63]"
                  />
                  <span>Show missed &amp; unanswered only</span>
                </label>
              </div>

              <div className="space-y-4">
                {examQuestions
                  .filter((q) => !showMissedOnly || examAnswers[q.id] !== q.correctId)
                  .map((q) => {
                    const userChoice = examAnswers[q.id];
                    const isRight = userChoice === q.correctId;
                    const chosenOpt = q.options.find((o) => o.id === userChoice);
                    const correctOpt = q.options.find((o) => o.id === q.correctId);

                    return (
                      <Card
                        key={q.id}
                        className={`border-l-4 ${isRight ? 'border-l-emerald-500' : 'border-l-amber-500'}`}
                      >
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Badge variant={isRight ? 'success' : 'warning'}>
                                {isRight ? 'Correct' : userChoice ? 'Incorrect' : 'Unanswered'}
                              </Badge>
                              <span className="text-xs font-semibold text-slate-500">
                                {q.chapterTitle} &middot; {q.topic}
                              </span>
                            </div>
                          </div>

                          <h4 className="text-base font-bold text-[#172b43]">
                            <FormattedMathText text={q.question} />
                          </h4>

                          {q.math && (
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
                              <MathBlock math={q.math} />
                            </div>
                          )}

                          <div className="grid gap-2 sm:grid-cols-2 text-sm">
                            <div
                              className={`rounded-lg border p-3 ${
                                isRight
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                                  : 'border-amber-300 bg-amber-50 text-amber-950'
                              }`}
                            >
                              <span className="font-bold">Your answer: </span>
                              {chosenOpt ? (
                                <>
                                  {chosenOpt.id}. <FormattedMathText text={chosenOpt.text} />
                                </>
                              ) : (
                                <span className="inline-flex items-center gap-1 italic">
                                  <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" /> No option selected
                                </span>
                              )}
                            </div>

                            <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-emerald-950">
                              <span className="font-bold">Correct answer: </span>
                              {correctOpt?.id}. <FormattedMathText text={correctOpt?.text ?? ''} />
                            </div>
                          </div>

                          {!isRight && chosenOpt?.misconception && (
                            <p className="text-sm text-amber-900 bg-amber-50/70 rounded-lg p-3 border border-amber-200">
                              <strong>Why that distractor traps students: </strong>
                              <FormattedMathText text={chosenOpt.misconception} />
                            </p>
                          )}

                          <p className="text-sm leading-relaxed text-slate-700">
                            <strong className="text-[#172b43]">Explanation: </strong>
                            <FormattedMathText text={q.explanation} />
                          </p>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
