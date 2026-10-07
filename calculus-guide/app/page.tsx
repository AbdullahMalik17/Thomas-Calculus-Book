import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MathBlock } from '@/components/math/MathBlock';
import { InlineMath } from '@/components/math/InlineMath';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  BookMarked,
  BrainCircuit,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 pb-8">
        <div className="inline-flex items-center gap-2">
          <Badge variant="primary" className="text-sm px-3 py-1">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-blue-600 inline" />
            Thomas&apos; Calculus (14th Edition) Interactive Companion
          </Badge>
          <Badge variant="success" className="text-sm px-3 py-1">
            Section 1.1 Golden Example Standard
          </Badge>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Master Calculus with <span className="text-blue-700">Verifiable Math</span> &amp; Automated Rigor
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          An interactive, mathematically grounded study platform designed by{' '}
          <span className="font-semibold text-slate-900">Muhammad Abdullah Athar</span>.
          Every formula, derivative, and solution is validated using SymPy symbolic verification engines.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button href="/chapters/ch01/1.1-functions-and-graphs" size="lg" className="gap-2">
            Explore Section 1.1 Golden Standard
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button href="/practice/1.1-functions-and-graphs" variant="outline" size="lg">
            Try Interactive Practice
          </Button>
          <Button href="/about" variant="ghost" size="lg">
            Platform Mission
          </Button>
        </div>
      </section>

      {/* Featured Mathematical Formula Box */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-xl">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-300">
            Core Concept &bull; Chapter 1 Functions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold">
            The Difference Quotient &amp; Function Rates
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            In Section 1.1, the foundation of modern calculus begins with functions <InlineMath math="y = f(x)" /> and their rate of change over an interval <InlineMath math="[x, x+h]" />:
          </p>

          <div className="my-6 bg-slate-950/90 rounded-xl p-4 border border-sky-500/40 shadow-inner">
            <MathBlock
              math="\frac{\Delta y}{\Delta x} = \frac{f(x + h) - f(x)}{h}, \quad h \neq 0"
              caption="The Average Rate of Change / Difference Quotient"
              theme="dark"
            />
          </div>

          <p className="text-xs text-slate-400">
            Verified with SymPy symbolic equivalence tests. Zero approximations.
          </p>
        </div>
      </section>

      {/* Architecture Highlights Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900">
            Engineered for Mathematical Precision
          </h2>
          <p className="text-slate-600 mt-2">
            Four pillars that separate this study platform from standard digital textbooks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="SymPy Engine"
            subtitle="Automated Verification"
            className="border-t-4 border-t-blue-600"
          >
            <div className="space-y-3">
              <Cpu className="w-8 h-8 text-blue-600" />
              <p className="text-sm text-slate-600 leading-relaxed">
                Every algebraic step and distractor is proved using Python&apos;s SymPy computer algebra engine.
              </p>
            </div>
          </Card>

          <Card
            title="Zod Guardrails"
            subtitle="Content Validation"
            className="border-t-4 border-t-teal-600"
          >
            <div className="space-y-3">
              <ShieldCheck className="w-8 h-8 text-teal-600" />
              <p className="text-sm text-slate-600 leading-relaxed">
                Strict type contracts enforce multi-tier difficulty, step-by-step &apos;why&apos; fields, and unique IDs.
              </p>
            </div>
          </Card>

          <Card
            title="Misconception Audit"
            subtitle="Pedagogical MCQs"
            className="border-t-4 border-t-indigo-600"
          >
            <div className="space-y-3">
              <BrainCircuit className="w-8 h-8 text-indigo-600" />
              <p className="text-sm text-slate-600 leading-relaxed">
                Every distractor choice in quizzes details the exact conceptual error students make.
              </p>
            </div>
          </Card>

          <Card
            title="Copyright Safe"
            subtitle="Paraphrased & Original"
            className="border-t-4 border-t-amber-600"
          >
            <div className="space-y-3">
              <BookMarked className="w-8 h-8 text-amber-600" />
              <p className="text-sm text-slate-600 leading-relaxed">
                Exercises refer strictly to textbook identifiers without verbatim reproduction of copyrighted text.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Chapters Overview List */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Curriculum Roadmap
            </h2>
            <p className="text-sm text-slate-500">
              Thomas&apos; Calculus (14th Edition) structured modules.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
          >
            View Mastery Dashboard &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="primary">Chapter 1</Badge>
                <Badge variant="success">38 Solutions Verified</Badge>
              </div>
              <h3 className="font-bold text-slate-900 pt-1">
                Functions &amp; Their Graphs
              </h3>
              <p className="text-xs text-slate-600">
                1.1 Functions and Graphs, 1.2 Combining Functions, 1.3 Trigonometry, 1.4 Software Graphing.
              </p>
            </div>
            <Button href="/chapters/ch01" size="sm" variant="primary">
              Open Chapter 1
            </Button>
          </div>

          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="primary">Chapter 2</Badge>
                <Badge variant="success">30 Solutions Verified</Badge>
              </div>
              <h3 className="font-bold text-slate-900 pt-1">
                Limits and Continuity
              </h3>
              <p className="text-xs text-slate-600">
                2.1 Rates of Change, 2.2 Limit Laws, 2.3 &epsilon;-&delta;, 2.4 One-Sided, 2.5 Continuity, 2.6 Asymptotes.
              </p>
            </div>
            <Button href="/chapters/ch02" size="sm" variant="primary">
              Open Chapter 2
            </Button>
          </div>

          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="primary">Chapter 3</Badge>
                <Badge variant="success">45 Solutions Verified</Badge>
              </div>
              <h3 className="font-bold text-slate-900 pt-1">
                Derivatives
              </h3>
              <p className="text-xs text-slate-600">
                3.1 Tangents, 3.2 Derivative Function, 3.3 Rules, 3.4 Rates of Change, 3.5 Trig, 3.6 Chain Rule, 3.7 Implicit, 3.8 Related Rates, 3.9 Differentials.
              </p>
            </div>
            <Button href="/chapters/ch03" size="sm" variant="primary">
              Open Chapter 3
            </Button>
          </div>

          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="primary">Chapter 4</Badge>
                <Badge variant="success">40 Solutions Verified</Badge>
              </div>
              <h3 className="font-bold text-slate-900 pt-1">
                Applications of Derivatives
              </h3>
              <p className="text-xs text-slate-600">
                4.1 Extreme Values, 4.2 Mean Value Theorem, 4.3 Monotonicity, 4.4 Concavity, 4.5 L&apos;H&ocirc;pital&apos;s Rule, 4.6 Optimization, 4.7 Newton&apos;s Method, 4.8 Antiderivatives.
              </p>
            </div>
            <Button href="/chapters/ch04" size="sm" variant="primary">
              Open Chapter 4
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
