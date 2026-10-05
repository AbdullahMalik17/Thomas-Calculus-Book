import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Heart, Github, Award, Code2, BookOpen } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <Badge variant="primary">Platform Mission &amp; Safeguards</Badge>
          <Badge variant="success">Attribution Standard</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          About Thomas&apos; Calculus Study Guide
        </h1>

        <p className="text-slate-600 leading-relaxed text-base">
          An open, mathematically rigorous educational platform engineered by{' '}
          <a
            href="https://github.com/AbdullahMalik17"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-4"
          >
            Muhammad Abdullah Athar
          </a>
          . Built to provide verifiable calculus explanations, automated validation pipelines, and deep conceptual clarity.
        </p>

        <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-3">
          <a
            href="https://github.com/AbdullahMalik17"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub: AbdullahMalik17
          </a>
          <Button href="/" variant="outline" size="sm">
            Back to Home
          </Button>
        </div>
      </div>

      {/* Creator & Attribution Card */}
      <Card title="Creator & Attribution" subtitle="Architect & Primary Maintainer" className="border-t-4 border-t-blue-700">
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            This interactive guide is designed, authored, and engineered by{' '}
            <strong className="text-slate-900">Muhammad Abdullah Athar</strong>.
          </p>
          <p>
            The project represents an effort to bridge digital mathematics pedagogy with modern formal verification systems. All pages in this platform include persistent author attribution, metadata schemas, and JSON-LD structured data linking to the creator&apos;s GitHub profile:{' '}
            <a
              href="https://github.com/AbdullahMalik17"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-semibold underline underline-offset-2"
            >
              https://github.com/AbdullahMalik17
            </a>.
          </p>
        </div>
      </Card>

      {/* Strict Copyright Safeguards */}
      <Card title="Copyright Safeguards & Fair-Use Standards" subtitle="Legal Boundaries & Pedagogical Integrity" className="border-t-4 border-t-amber-600">
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Core Boundary Rules
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-amber-800">
              <li>
                <strong>No Verbatim Reproduction:</strong> Never copy textbook problem statements, figures, or prose verbatim from Thomas&apos; Calculus (14th Edition).
              </li>
              <li>
                <strong>Identifier References Only:</strong> Worked solutions reference problems strictly by identifier (e.g., &quot;Section 1.1, Exercise 21&quot;) and provide completely independent, paraphrased conceptual explanations.
              </li>
              <li>
                <strong>Original Practice Sets &amp; MCQs:</strong> All interactive practice problems and multiple-choice questions are original creations specifically written for this platform.
              </li>
              <li>
                <strong>Gitignore Source Assets:</strong> Raw textbook PDFs and extracted raster pages are strictly excluded via <code>.gitignore</code> and never committed to version control.
              </li>
            </ul>
          </div>

          <p>
            This study guide serves as a pedagogical companion to help students master core mathematical concepts while fully respecting intellectual property boundaries.
          </p>
        </div>
      </Card>

      {/* Tech Stack */}
      <Card title="Technical Architecture" subtitle="Built with Modern Web & Mathematical Engines">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600 pt-1">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="font-bold text-slate-900 block text-xs uppercase text-blue-700 mb-1">
              Frontend &amp; Application
            </span>
            <p className="text-xs">
              Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, KaTeX mathematical typesetting.
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="font-bold text-slate-900 block text-xs uppercase text-teal-700 mb-1">
              Validation &amp; Schemas
            </span>
            <p className="text-xs">
              Zod TypeScript schemas ensuring 1-to-1 ID mapping, misconception annotations, and step-by-step why fields.
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="font-bold text-slate-900 block text-xs uppercase text-indigo-700 mb-1">
              Verification Engine
            </span>
            <p className="text-xs">
              Python SymPy computer algebra engine for symbolic algebraic equivalence, domain equality, and calculus assertions.
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="font-bold text-slate-900 block text-xs uppercase text-amber-700 mb-1">
              AEO &amp; SEO Infrastructure
            </span>
            <p className="text-xs">
              AI-aware <code>robots.txt</code>, machine-readable <code>llms.txt</code>, and JSON-LD structured educational metadata.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
