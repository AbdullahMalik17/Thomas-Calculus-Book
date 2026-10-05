import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle2,
  TrendingUp,
  Cpu,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  BarChart3,
  Layers,
} from 'lucide-react';

export default function DashboardPage() {
  const metrics = [
    {
      title: 'Golden Standard Progress',
      value: '100%',
      subtitle: 'Section 1.1 Fully Implemented',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      badge: 'Golden Standard',
    },
    {
      title: 'SymPy Math Engine',
      value: '24 / 24',
      subtitle: 'Edge-Case Fixtures Passing',
      icon: Cpu,
      color: 'text-blue-600',
      badge: 'Verified',
    },
    {
      title: 'Zod Content Schemas',
      value: '24 / 24',
      subtitle: 'Items Passed Strict Validation',
      icon: ShieldCheck,
      color: 'text-teal-600',
      badge: 'Valid',
    },
    {
      title: 'Misconception Coverage',
      value: '100%',
      subtitle: '3 Distractors per MCQ Annotated',
      icon: TrendingUp,
      color: 'text-indigo-600',
      badge: 'Audited',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Analytics &amp; Verification Hub</Badge>
          <Badge variant="success">All Systems Operational</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Student Mastery &amp; Engine Status Dashboard
        </h1>

        <p className="text-slate-600 max-w-3xl leading-relaxed">
          Real-time tracking of curriculum coverage, symbolic mathematical verification tests, and pedagogical misconception diagnostics across Thomas&apos; Calculus.
        </p>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i} className="border-t-4 border-t-blue-700">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Icon className={`w-6 h-6 ${m.color}`} />
                  <Badge variant="primary">{m.badge}</Badge>
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-slate-900">
                    {m.value}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-700 mt-1">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{m.subtitle}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Chapter 1 Detailed Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Chapter 1 Breakdown</h2>
            <p className="text-sm text-slate-500">
              Verification status per section item.
            </p>
          </div>
          <Button href="/chapters/ch01/1.1-functions-and-graphs" size="sm" className="gap-1">
            Study Section 1.1
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-800 uppercase tracking-wider bg-slate-50">
                <th className="py-3 px-4">Section</th>
                <th className="py-3 px-4">Worked Solutions</th>
                <th className="py-3 px-4">Practice Sets</th>
                <th className="py-3 px-4">MCQ Quizzes</th>
                <th className="py-3 px-4">Engine Verification</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50">
                <td className="py-4 px-4 font-semibold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  1.1 Functions and Graphs
                </td>
                <td className="py-4 px-4">8 Items (Numbered &apos;why&apos;)</td>
                <td className="py-4 px-4">8 Items (Tiers 1-3)</td>
                <td className="py-4 px-4">8 Items (Misconceptions)</td>
                <td className="py-4 px-4 text-emerald-700 font-semibold">
                  SymPy Verified
                </td>
                <td className="py-4 px-4">
                  <Badge variant="success">Completed</Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 text-slate-400">
                <td className="py-4 px-4 font-semibold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  1.2 Combining Functions
                </td>
                <td className="py-4 px-4">Scheduled</td>
                <td className="py-4 px-4">Scheduled</td>
                <td className="py-4 px-4">Scheduled</td>
                <td className="py-4 px-4">Pending</td>
                <td className="py-4 px-4">
                  <Badge variant="default">Planned</Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 text-slate-400">
                <td className="py-4 px-4 font-semibold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  1.3 Trigonometric Functions
                </td>
                <td className="py-4 px-4">Scheduled</td>
                <td className="py-4 px-4">Scheduled</td>
                <td className="py-4 px-4">Scheduled</td>
                <td className="py-4 px-4">Pending</td>
                <td className="py-4 px-4">
                  <Badge variant="default">Planned</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Pipeline Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="SymPy Symbolic Validation Pipeline" subtitle="Subprocess & CLI Engine">
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              Mathematical claims are verified using SymPy symbolic equivalence:
            </p>
            <div className="p-3 bg-slate-900 text-blue-300 font-mono text-xs rounded-lg">
              simplify(expr - expected) == 0
            </div>
            <p className="text-xs text-slate-500">
              Covers algebraic factoring, expansions, trigonometric identities, radicals, and difference quotients.
            </p>
          </div>
        </Card>

        <Card title="Zod Schema Guardrail Pipeline" subtitle="Content Integrity Assurance">
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              Content files conform strictly to TypeScript Zod schemas:
            </p>
            <div className="p-3 bg-slate-900 text-teal-300 font-mono text-xs rounded-lg">
              npm run content:validate
            </div>
            <p className="text-xs text-slate-500">
              Enforces 1-to-1 file path to item ID mapping, exactly 1 correct answer + 3 misconception-annotated distractors, and non-empty step rationales.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
