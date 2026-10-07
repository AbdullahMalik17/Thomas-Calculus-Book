import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Lightbulb, PencilLine } from 'lucide-react';
import { CHAPTER_METADATA } from '@/lib/content/curriculum';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MathBlock } from '@/components/math/MathBlock';

const chapters = Object.values(CHAPTER_METADATA);
const sectionCount = chapters.reduce((total, chapter) => total + chapter.sections.length, 0);
const solutionCount = chapters.reduce(
  (total, chapter) => total + chapter.sections.reduce((chapterTotal, section) => chapterTotal + section.solutionsCount, 0),
  0
);

const learningBenefits = [
  {
    icon: Lightbulb,
    title: 'Understand the idea',
    description: 'Start with clear definitions, key conditions, and concise explanations for each topic.',
  },
  {
    icon: BookOpen,
    title: 'Follow worked examples',
    description: 'Study each solution one step at a time, with the reasoning behind each move.',
  },
  {
    icon: PencilLine,
    title: 'Practice with purpose',
    description: 'Try original questions, reveal hints when you need them, and check your understanding.',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="relative overflow-hidden rounded-3xl border border-[#dbe2ea] bg-white px-5 py-10 shadow-sm sm:px-10 sm:py-14 lg:px-14">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-bl from-[#e8f1ef] via-[#f2f5f7] to-transparent lg:block" aria-hidden="true" />
        <div className="relative max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">Thomas&apos; Calculus · 14th Edition</Badge>
            <span className="text-sm text-slate-600">{chapters.length} chapters · {sectionCount} sections</span>
          </div>

          <h1 className="max-w-[18ch] text-4xl font-bold tracking-tight text-[#172b43] sm:text-5xl lg:text-6xl [text-wrap:balance]">
            Build your understanding, one idea at a time.
          </h1>
          <p className="reading-copy text-lg text-slate-600">
            A clear, step-by-step companion for learning calculus. Review the key ideas, follow worked examples, and practice at your own pace.
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            <Button href="/chapters" size="lg" className="gap-2 bg-[#1e3a5f] hover:bg-[#142d4d]">
              Explore the curriculum <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/chapters/ch01/1.1-functions-and-graphs" variant="outline" size="lg">
              Start with Section 1.1
            </Button>
          </div>

          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-sm text-slate-600">
            <CheckCircle2 className="h-4 w-4 text-[#176b63]" aria-hidden="true" />
            {solutionCount} worked solutions checked with symbolic math tools
          </p>
        </div>
      </section>

      <section aria-labelledby="study-flow-heading" className="space-y-7">
        <div className="max-w-2xl space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#176b63]">A practical way to study</p>
          <h2 id="study-flow-heading" className="text-2xl font-bold text-[#172b43] sm:text-3xl">Learn it, see it, try it.</h2>
          <p className="text-slate-600">Each section brings the main ideas and practice together, so you can move from explanation to independent work.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {learningBenefits.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className="rounded-2xl border border-[#dbe2ea] bg-white p-5 sm:p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f1ef] text-[#176b63]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Step {index + 1}</p>
              <h3 className="text-lg font-bold text-[#172b43]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="curriculum-heading" className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#176b63]">The learning path</p>
            <h2 id="curriculum-heading" className="text-2xl font-bold text-[#172b43] sm:text-3xl">Choose a chapter to begin</h2>
            <p className="text-slate-600">Go in order or jump straight to the topic you need.</p>
          </div>
          <Link href="/chapters" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#174f4a] underline-offset-4 hover:underline">
            View all sections <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {chapters.map((chapter) => {
            const count = chapter.sections.reduce((total, section) => total + section.solutionsCount, 0);
            return (
              <Link
                key={chapter.key}
                href={`/chapters/${chapter.key}`}
                className="group rounded-2xl border border-[#dbe2ea] bg-white p-5 shadow-sm transition-colors hover:border-[#8bb4ad] hover:bg-[#fbfdfc] sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <span className="inline-flex rounded-md bg-[#edf3f2] px-2 py-1 font-mono text-xs font-semibold text-[#174f4a]">
                      Chapter {chapter.num}
                    </span>
                    <h3 className="text-xl font-bold leading-snug text-[#172b43] group-hover:text-[#174f4a]">{chapter.title.replace(/^Chapter \d+:\s*/, '')}</h3>
                    <p className="max-w-prose text-sm leading-relaxed text-slate-600">{chapter.description}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#176b63]" aria-hidden="true" />
                </div>
                <p className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  {chapter.sections.length} sections <span aria-hidden="true">·</span> {count} worked solutions
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="concept-heading" className="rounded-3xl bg-[#172b43] px-5 py-8 text-white sm:px-10 sm:py-10">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#b8d6d0]">A first idea · Section 1.1</p>
          <h2 id="concept-heading" className="text-2xl font-bold sm:text-3xl">How quickly is a function changing?</h2>
          <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
            The difference quotient measures the average change in <span className="font-serif italic">f</span> over an interval. It is a useful starting point for understanding the derivative.
          </p>
          <div className="mx-auto max-w-2xl rounded-xl border border-white/15 bg-[#102237] p-3 sm:p-5">
            <MathBlock math="\\frac{f(x+h)-f(x)}{h}, \\quad h \\ne 0" caption="Average rate of change across an interval of width h" theme="dark" />
          </div>
          <Link href="/chapters/ch01/1.1-functions-and-graphs" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-white underline underline-offset-4 hover:text-[#c9e3de]">
            Explore functions and graphs <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
