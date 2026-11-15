'use client';

import React, { useRef, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  Sliders,
} from 'lucide-react';

type ExplorerTabId = 'derivative' | 'integral' | 'sympy';
type QuadratureRule = 'midpoint' | 'trapezoidal';

interface TabConfig {
  id: ExplorerTabId;
  index: string;
  label: string;
  shortFormula: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

const EXPLORER_TABS: TabConfig[] = [
  {
    id: 'derivative',
    index: '01',
    label: 'Derivative',
    shortFormula: 'Secant → Tangent',
    icon: Sliders,
  },
  {
    id: 'integral',
    index: '02',
    label: 'Riemann Sum',
    shortFormula: 'N ∈ [2, 32]',
    icon: Layers,
  },
  {
    id: 'sympy',
    index: '03',
    label: 'SymPy Audit',
    shortFormula: 'CAS + Distractor',
    icon: Cpu,
  },
];

interface CandidateStep {
  id: string;
  badge: string;
  studentLatex: string;
  sympyExpr: string;
  residual: string;
  isEquivalent: boolean;
  diagnosisTitle: string;
  diagnosisBody: string;
}

const SYMPY_CANDIDATES: CandidateStep[] = [
  {
    id: 'exact-chain',
    badge: 'Golden Step',
    studentLatex: '3(x^2 + 1)^2 · 2x = 6x(x^2 + 1)^2',
    sympyExpr: 'simplify((6*x*(x**2 + 1)**2) - diff((x**2 + 1)**3, x))',
    residual: '0',
    isEquivalent: true,
    diagnosisTitle: 'Symbolically Equivalent (PASS)',
    diagnosisBody:
      'Outer power rule 3u² multiplied by inner derivative du/dx = 2x reduces identically to 0 in SymPy.',
  },
  {
    id: 'omitted-inner',
    badge: 'Distractor A',
    studentLatex: '3(x^2 + 1)^2',
    sympyExpr: 'simplify((3*(x**2 + 1)**2) - diff((x**2 + 1)**3, x))',
    residual: '3*(1 - 2*x)*(x**2 + 1)**2 != 0',
    isEquivalent: false,
    diagnosisTitle: 'Misconception: Omitted Inner Derivative',
    diagnosisBody:
      'Applied outer power rule d/du[u³] = 3u² but omitted the Chain Rule factor g′(x) = 2x.',
  },
  {
    id: 'inner-substituted',
    badge: 'Distractor B',
    studentLatex: '3(2x)^2 = 12x^2',
    sympyExpr: 'simplify((12*x**2) - diff((x**2 + 1)**3, x))',
    residual: '-6*x**5 - 12*x**3 + 12*x**2 - 6*x != 0',
    isEquivalent: false,
    diagnosisTitle: 'Misconception: Collapsed Composition',
    diagnosisBody:
      'Replaced inner function g(x) = x² + 1 with g′(x) = 2x inside the exponent instead of multiplying outside.',
  },
];

// Primary function f(x) = 0.25x^2 + 0.5
function f(x: number): number {
  return 0.25 * x * x + 0.5;
}

// Exact antiderivative F(x) = (0.25 / 3) * x^3 + 0.5 * x
function F(x: number): number {
  return (0.25 / 3) * x * x * x + 0.5 * x;
}

export function HeroCalculusCard() {
  const [activeTab, setActiveTab] = useState<ExplorerTabId>('derivative');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Tab 1 State: Derivative (Secant -> Tangent at x0 = 1.5, h in [0.01, 2.00])
  const [stepH, setStepH] = useState<number>(0.85);
  const x0 = 1.5;
  const y0 = f(x0);
  const x1 = x0 + stepH;
  const y1 = f(x1);
  const secantSlope = (y1 - y0) / stepH;
  const exactSlope = 0.5 * x0; // f'(1.5) = 0.7500
  const slopeError = Math.abs(secantSlope - exactSlope);

  // Tab 2 State: Definite Integral (Riemann Sums for N in [2, 32] on [0.4, 3.4])
  const [subintervalsN, setSubintervalsN] = useState<number>(8);
  const [quadRule, setQuadRule] = useState<QuadratureRule>('midpoint');
  const intA = 0.4;
  const intB = 3.4;
  const dx = (intB - intA) / subintervalsN;
  const exactIntegral = F(intB) - F(intA);

  let riemannSum = 0;
  const partitions: Array<{
    xLeft: number;
    xRight: number;
    xMid: number;
    yLeft: number;
    yRight: number;
    yMid: number;
  }> = [];

  for (let i = 0; i < subintervalsN; i++) {
    const xLeft = intA + i * dx;
    const xRight = xLeft + dx;
    const xMid = 0.5 * (xLeft + xRight);
    const yLeft = f(xLeft);
    const yRight = f(xRight);
    const yMid = f(xMid);
    partitions.push({ xLeft, xRight, xMid, yLeft, yRight, yMid });
    if (quadRule === 'midpoint') {
      riemannSum += yMid * dx;
    } else {
      riemannSum += 0.5 * (yLeft + yRight) * dx;
    }
  }
  const integralError = Math.abs(riemannSum - exactIntegral);

  // Tab 3 State: SymPy Step & Misconception Preview
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('exact-chain');
  const activeCandidate =
    SYMPY_CANDIDATES.find((c) => c.id === selectedCandidateId) ?? SYMPY_CANDIDATES[0];

  // Shared SVG Coordinate Mapping: x in [0, 3.8] -> [42, 398], y in [0, 4.2] -> [196, 18]
  const toSvgX = (x: number) => 42 + (x / 3.8) * 356;
  const toSvgY = (y: number) => 196 - (y / 4.2) * 178;

  // Smooth curve path for f(x) = 0.25x^2 + 0.5
  const curveCommands: string[] = [];
  for (let i = 0; i <= 38; i++) {
    const xv = i * 0.1;
    const yv = f(xv);
    curveCommands.push(
      `${i === 0 ? 'M' : 'L'} ${toSvgX(xv).toFixed(1)} ${toSvgY(yv).toFixed(1)}`
    );
  }
  const curvePath = curveCommands.join(' ');

  // Secant and Tangent line endpoints for Tab 1
  const lineXMin = 0.15;
  const lineXMax = 3.65;
  const secYMin = y0 + secantSlope * (lineXMin - x0);
  const secYMax = y0 + secantSlope * (lineXMax - x0);
  const tanYMin = y0 + exactSlope * (lineXMin - x0);
  const tanYMax = y0 + exactSlope * (lineXMax - x0);

  const px0 = toSvgX(x0);
  const py0 = toSvgY(y0);
  const px1 = toSvgX(x1);
  const py1 = toSvgY(y1);

  // Selection-follows-focus keyboard handler for tablist
  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % EXPLORER_TABS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + EXPLORER_TABS.length) % EXPLORER_TABS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = EXPLORER_TABS.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const targetTab = EXPLORER_TABS[nextIndex];
      setActiveTab(targetTab.id);
      const btn = tabRefs.current[nextIndex];
      btn?.focus();
      btn?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  };

  return (
    <aside
      aria-label="Interactive Calculus Explorer"
      className="surface-grain relative flex w-full flex-col justify-between rounded-2xl border border-specular bg-surface-2/85 p-4 shadow-sm sm:p-5"
    >
      {/* Top Swiss Monograph Telemetry Bar */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-2.5">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-brand-accent"
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-primary tabular-nums">
            FIG 1.1–5.3 // LIVE MATH LAB
          </span>
        </div>
        <span className="rounded border border-specular bg-surface-1 px-2 py-0.5 font-mono text-[11px] font-semibold text-brand-accent tabular-nums">
          f(x) = 0.25x² + 0.5
        </span>
      </div>

      {/* Single-Row Accessible Tab Switcher (Selection Follows Focus + Pseudo-Element Underline) */}
      <div
        role="tablist"
        aria-label="Calculus interactive explorer modes"
        {...({ focusgroup: 'tablist nomemory' } as React.HTMLAttributes<HTMLDivElement>)}
        className="mb-3.5 flex overflow-x-auto rounded-xl border border-specular bg-surface-1 p-1"
      >
        {EXPLORER_TABS.map((tab, idx) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              id={`hero-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              {...(isSelected
                ? ({ focusgroupstart: '' } as React.ButtonHTMLAttributes<HTMLButtonElement>)
                : {})}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
              className="relative flex min-h-9 flex-1 flex-none cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 font-sans text-xs font-semibold text-ink-secondary transition-colors hover:text-ink-primary aria-selected:bg-surface-2 aria-selected:text-ink-primary after:pointer-events-none after:absolute after:inset-x-2 after:bottom-0.5 after:border-b-2 after:border-transparent aria-selected:after:border-brand-accent"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-brand-accent" aria-hidden="true" />
              <span>{tab.label}</span>
              <span className="hidden font-mono text-[10px] text-ink-muted tabular-nums xl:inline">
                [{tab.index}]
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1 PANEL: Derivative (Secant -> Tangent) */}
      <div
        role="tabpanel"
        id="hero-panel-derivative"
        aria-labelledby="hero-tab-derivative"
        hidden={activeTab !== 'derivative'}
      >
        <div className="space-y-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <h2 className="font-reading text-base font-bold tracking-display text-ink-primary sm:text-lg">
                Secant to Tangent Convergence at{' '}
                <span className="font-mono text-sm tabular-nums">x₀ = 1.50</span>
              </h2>
              <p className="font-reading text-xs text-ink-secondary">
                Shrink step size <span className="font-mono tabular-nums">h → 0</span> to watch the difference quotient approach{' '}
                <span className="font-mono tabular-nums">f′(1.5) = 0.7500</span>.
              </p>
            </div>
            <span className="shrink-0 rounded-md border border-specular bg-surface-1 px-2 py-0.5 font-mono text-xs font-bold text-brand-primary tabular-nums">
              h = {stepH.toFixed(2)}
            </span>
          </div>

          {/* Recessed Obsidian Mathematical Viewport */}
          <div className="rounded-xl border border-specular bg-surface-3 p-3 text-ink-inverse shadow-inner">
            <svg
              role="img"
              aria-label="Interactive graph of f(x) = 0.25x squared plus 0.5 showing the secant line through x0 = 1.5 and x0 + h converging to the tangent line"
              viewBox="0 0 420 218"
              className="h-auto w-full select-none overflow-visible"
            >
              <title>
                Secant to Tangent Limit on f(x) = 0.25x² + 0.5 at x₀ = 1.5 (h = {stepH.toFixed(2)})
              </title>

              {/* Coordinate Grid Lines */}
              {[1, 2, 3].map((gx) => (
                <line
                  key={`d-vx-${gx}`}
                  x1={toSvgX(gx)}
                  y1={16}
                  x2={toSvgX(gx)}
                  y2={196}
                  stroke="rgba(226, 232, 240, 0.12)"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
              ))}
              {[1, 2, 3, 4].map((gy) => (
                <line
                  key={`d-hy-${gy}`}
                  x1={42}
                  y1={toSvgY(gy)}
                  x2={398}
                  y2={toSvgY(gy)}
                  stroke="rgba(226, 232, 240, 0.12)"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
              ))}

              {/* Swiss Coordinate Crosshairs (+) at Grid Intersections */}
              {[1, 2, 3].map((gx) =>
                [1, 2, 3].map((gy) => {
                  const cx = toSvgX(gx);
                  const cy = toSvgY(gy);
                  return (
                    <g key={`d-cross-${gx}-${gy}`} stroke="rgba(226, 232, 240, 0.28)" strokeWidth="1">
                      <line x1={cx - 3} y1={cy} x2={cx + 3} y2={cy} />
                      <line x1={cx} y1={cy - 3} x2={cx} y2={cy + 3} />
                    </g>
                  );
                })
              )}

              {/* Coordinate Axes */}
              <line x1={42} y1={196} x2={402} y2={196} stroke="rgba(226, 232, 240, 0.55)" strokeWidth="1.25" />
              <line x1={42} y1={14} x2={42} y2={196} stroke="rgba(226, 232, 240, 0.55)" strokeWidth="1.25" />

              {/* Axis Tick Numerals */}
              {[1, 2, 3].map((gx) => (
                <text
                  key={`d-tx-${gx}`}
                  x={toSvgX(gx)}
                  y={210}
                  textAnchor="middle"
                  fontSize="10"
                  fill="rgba(226, 232, 240, 0.72)"
                  fontFamily="monospace"
                >
                  {gx}.0
                </text>
              ))}
              {[1, 2, 3, 4].map((gy) => (
                <text
                  key={`d-ty-${gy}`}
                  x={34}
                  y={toSvgY(gy) + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill="rgba(226, 232, 240, 0.72)"
                  fontFamily="monospace"
                >
                  {gy}.0
                </text>
              ))}

              {/* Rise / Run Right Triangle */}
              <line
                x1={px0}
                y1={py0}
                x2={px1}
                y2={py0}
                stroke="oklch(0.78 0.14 75)"
                strokeDasharray="4 2"
                strokeWidth="1.5"
              />
              <line
                x1={px1}
                y1={py0}
                x2={px1}
                y2={py1}
                stroke="oklch(0.78 0.14 75)"
                strokeDasharray="4 2"
                strokeWidth="1.5"
              />

              {/* Exact Tangent Line at x0 = 1.5 */}
              <line
                x1={toSvgX(lineXMin)}
                y1={toSvgY(tanYMin)}
                x2={toSvgX(lineXMax)}
                y2={toSvgY(tanYMax)}
                stroke="oklch(0.78 0.14 185)"
                strokeDasharray="5 4"
                strokeWidth="1.75"
              />

              {/* Function Curve f(x) */}
              <path
                d={curvePath}
                fill="none"
                stroke="oklch(0.96 0.01 85)"
                strokeWidth="2.5"
              />

              {/* Live Secant Line */}
              <line
                x1={toSvgX(lineXMin)}
                y1={toSvgY(secYMin)}
                x2={toSvgX(lineXMax)}
                y2={toSvgY(secYMax)}
                stroke="oklch(0.78 0.14 75)"
                strokeWidth="2.25"
              />

              {/* Anchor Point P(x0, f(x0)) and Moving Point Q(x0+h, f(x0+h)) */}
              <circle
                cx={px0}
                cy={py0}
                r="5"
                fill="oklch(0.78 0.14 185)"
                stroke="var(--surface-3)"
                strokeWidth="1.75"
              />
              <circle
                cx={px1}
                cy={py1}
                r="5"
                fill="oklch(0.78 0.14 75)"
                stroke="var(--surface-3)"
                strokeWidth="1.75"
              />

              {/* Point Labels */}
              <text
                x={px0 - 8}
                y={py0 - 10}
                textAnchor="end"
                fontSize="10.5"
                fontWeight="700"
                fill="oklch(0.86 0.11 185)"
                fontFamily="monospace"
              >
                P(1.5, 1.06)
              </text>
              <text
                x={Math.min(px1 + 7, 315)}
                y={Math.max(py1 - 8, 24)}
                fontSize="10.5"
                fontWeight="700"
                fill="oklch(0.85 0.13 75)"
                fontFamily="monospace"
              >
                Q({x1.toFixed(2)}, {y1.toFixed(2)})
              </text>

              {/* In-Plot Legend Badge */}
              <g transform="translate(52, 20)">
                <rect
                  x="0"
                  y="0"
                  width="196"
                  height="38"
                  rx="6"
                  fill="rgba(15, 23, 42, 0.78)"
                  stroke="rgba(226, 232, 240, 0.16)"
                />
                <line x1="10" y1="13" x2="26" y2="13" stroke="oklch(0.78 0.14 75)" strokeWidth="2.25" />
                <text x="32" y="16" fontSize="10" fill="rgba(241, 245, 249, 0.92)" fontFamily="monospace">
                  Secant m = {secantSlope.toFixed(4)}
                </text>
                <line
                  x1="10"
                  y1="27"
                  x2="26"
                  y2="27"
                  stroke="oklch(0.78 0.14 185)"
                  strokeDasharray="4 3"
                  strokeWidth="1.75"
                />
                <text x="32" y="30" fontSize="10" fill="oklch(0.86 0.11 185)" fontFamily="monospace">
                  Tangent f′(1.5) = {exactSlope.toFixed(4)}
                </text>
              </g>
            </svg>
          </div>

          {/* Accessible Range Slider Control for Step Size h */}
          <div className="rounded-xl border border-hairline bg-surface-1 p-3 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="hero-h-slider"
                className="font-sans text-xs font-semibold text-ink-primary"
              >
                Step size <span className="font-mono tabular-nums">h ∈ [0.01, 2.00]</span>
              </label>
              <div className="flex items-center gap-1">
                {[1.5, 0.75, 0.2, 0.01].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setStepH(preset)}
                    className={`min-h-6 cursor-pointer rounded border px-1.5 py-0.5 font-mono text-[11px] font-semibold tabular-nums transition-colors ${
                      Math.abs(stepH - preset) < 0.005
                        ? 'border-brand-primary bg-brand-primary text-ink-inverse'
                        : 'border-hairline bg-surface-2 text-ink-secondary hover:bg-surface-0'
                    }`}
                  >
                    {preset.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>

            <input
              id="hero-h-slider"
              type="range"
              min="0.01"
              max="2.00"
              step="0.01"
              value={stepH}
              aria-valuetext={`Step size h equals ${stepH.toFixed(2)}, difference quotient equals ${secantSlope.toFixed(4)}`}
              onChange={(e) => setStepH(parseFloat(e.target.value))}
              style={
                {
                  '--control-value': stepH,
                  '--attr-min': 0.01,
                  '--attr-max': 2.0,
                } as React.CSSProperties
              }
              className="calculus-slider"
            />

            {/* Difference Quotient Telemetry Readout */}
            <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs tabular-nums">
              <div className="rounded-lg border border-hairline bg-surface-2 px-2.5 py-2">
                <span className="block text-[10px] uppercase tracking-wider text-ink-muted">
                  (f(x₀+h)−f(x₀))/h
                </span>
                <strong className="text-sm font-bold text-brand-primary">
                  {secantSlope.toFixed(4)}
                </strong>
              </div>
              <div className="rounded-lg border border-hairline bg-surface-2 px-2.5 py-2">
                <span className="block text-[10px] uppercase tracking-wider text-ink-muted">
                  Exact f′(1.5)
                </span>
                <strong className="text-sm font-bold text-brand-accent">
                  {exactSlope.toFixed(4)}
                </strong>
              </div>
              <div className="rounded-lg border border-hairline bg-surface-2 px-2.5 py-2">
                <span className="block text-[10px] uppercase tracking-wider text-ink-muted">
                  |Slope Error|
                </span>
                <strong className="text-sm font-bold text-ink-primary">
                  {slopeError.toFixed(4)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TAB 2 PANEL: Definite Integral (Riemann Sums) */}
      <div
        role="tabpanel"
        id="hero-panel-integral"
        aria-labelledby="hero-tab-integral"
        hidden={activeTab !== 'integral'}
      >
        <div className="space-y-3.5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h2 className="font-reading text-base font-bold tracking-display text-ink-primary sm:text-lg">
                Definite Integral Partition on{' '}
                <span className="font-mono text-sm tabular-nums">[0.4, 3.4]</span>
              </h2>
              <p className="font-reading text-xs text-ink-secondary">
                Increase partitions <span className="font-mono tabular-nums">N → 32</span> to reduce quadrature error{' '}
                <span className="font-mono tabular-nums">|S_N − ∫f(x)dx|</span>.
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-hairline bg-surface-1 p-0.5">
              {(['midpoint', 'trapezoidal'] as const).map((rule) => (
                <button
                  key={rule}
                  type="button"
                  onClick={() => setQuadRule(rule)}
                  className={`min-h-6 cursor-pointer rounded-md px-2 py-0.5 font-sans text-[11px] font-semibold capitalize transition-colors ${
                    quadRule === rule
                      ? 'bg-brand-primary text-ink-inverse'
                      : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  {rule}
                </button>
              ))}
            </div>
          </div>

          {/* Recessed Obsidian Riemann Sum Viewport */}
          <div className="rounded-xl border border-specular bg-surface-3 p-3 text-ink-inverse shadow-inner">
            <svg
              role="img"
              aria-label={`Interactive Riemann sum graph with ${subintervalsN} ${quadRule} subintervals under f(x) = 0.25x squared plus 0.5 from x = 0.4 to 3.4`}
              viewBox="0 0 420 218"
              className="h-auto w-full select-none overflow-visible"
            >
              <title>
                Riemann Sum Quadrature ({quadRule}, N = {subintervalsN}) on f(x) = 0.25x² + 0.5
              </title>

              {/* Coordinate Grid Lines */}
              {[1, 2, 3].map((gx) => (
                <line
                  key={`i-vx-${gx}`}
                  x1={toSvgX(gx)}
                  y1={16}
                  x2={toSvgX(gx)}
                  y2={196}
                  stroke="rgba(226, 232, 240, 0.12)"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
              ))}
              {[1, 2, 3, 4].map((gy) => (
                <line
                  key={`i-hy-${gy}`}
                  x1={42}
                  y1={toSvgY(gy)}
                  x2={398}
                  y2={toSvgY(gy)}
                  stroke="rgba(226, 232, 240, 0.12)"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
              ))}

              {/* Shaded Subinterval Rectangles / Trapezoids */}
              {partitions.map((part, idx) => {
                const xL = toSvgX(part.xLeft);
                const xR = toSvgX(part.xRight);
                const yBase = toSvgY(0);
                if (quadRule === 'midpoint') {
                  const yTop = toSvgY(part.yMid);
                  return (
                    <rect
                      key={`rect-${idx}`}
                      x={xL}
                      y={yTop}
                      width={Math.max(1, xR - xL)}
                      height={Math.max(0, yBase - yTop)}
                      fill="rgba(45, 212, 191, 0.24)"
                      stroke="oklch(0.78 0.14 185)"
                      strokeWidth={subintervalsN > 20 ? '0.6' : '1'}
                    />
                  );
                }
                const yTL = toSvgY(part.yLeft);
                const yTR = toSvgY(part.yRight);
                const points = `${xL.toFixed(1)},${yBase.toFixed(1)} ${xL.toFixed(1)},${yTL.toFixed(1)} ${xR.toFixed(1)},${yTR.toFixed(1)} ${xR.toFixed(1)},${yBase.toFixed(1)}`;
                return (
                  <polygon
                    key={`trap-${idx}`}
                    points={points}
                    fill="rgba(45, 212, 191, 0.24)"
                    stroke="oklch(0.78 0.14 185)"
                    strokeWidth={subintervalsN > 20 ? '0.6' : '1'}
                  />
                );
              })}

              {/* Coordinate Axes */}
              <line x1={42} y1={196} x2={402} y2={196} stroke="rgba(226, 232, 240, 0.55)" strokeWidth="1.25" />
              <line x1={42} y1={14} x2={42} y2={196} stroke="rgba(226, 232, 240, 0.55)" strokeWidth="1.25" />

              {/* True Function Curve f(x) */}
              <path
                d={curvePath}
                fill="none"
                stroke="oklch(0.96 0.01 85)"
                strokeWidth="2.5"
              />

              {/* Bounds Labels a = 0.4, b = 3.4 */}
              <text
                x={toSvgX(intA)}
                y={210}
                textAnchor="middle"
                fontSize="10"
                fill="oklch(0.86 0.11 185)"
                fontFamily="monospace"
              >
                a=0.4
              </text>
              <text
                x={toSvgX(intB)}
                y={210}
                textAnchor="middle"
                fontSize="10"
                fill="oklch(0.86 0.11 185)"
                fontFamily="monospace"
              >
                b=3.4
              </text>

              {/* In-Plot Summary Overlay */}
              <g transform="translate(52, 20)">
                <rect
                  x="0"
                  y="0"
                  width="206"
                  height="38"
                  rx="6"
                  fill="rgba(15, 23, 42, 0.78)"
                  stroke="rgba(226, 232, 240, 0.16)"
                />
                <text x="10" y="15" fontSize="10" fill="oklch(0.86 0.11 185)" fontFamily="monospace">
                  N = {subintervalsN} partitions (Δx = {dx.toFixed(3)})
                </text>
                <text x="10" y="29" fontSize="10" fill="rgba(241, 245, 249, 0.92)" fontFamily="monospace">
                  S_N = {riemannSum.toFixed(4)} vs ∫f = {exactIntegral.toFixed(4)}
                </text>
              </g>
            </svg>
          </div>

          {/* Accessible Range Slider Control for N */}
          <div className="rounded-xl border border-hairline bg-surface-1 p-3 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="hero-n-slider"
                className="font-sans text-xs font-semibold text-ink-primary"
              >
                Subintervals <span className="font-mono tabular-nums">N = {subintervalsN}</span>
              </label>
              <div className="flex items-center gap-1">
                {[4, 8, 16, 32].map((presetN) => (
                  <button
                    key={presetN}
                    type="button"
                    onClick={() => setSubintervalsN(presetN)}
                    className={`min-h-6 cursor-pointer rounded border px-1.5 py-0.5 font-mono text-[11px] font-semibold tabular-nums transition-colors ${
                      subintervalsN === presetN
                        ? 'border-brand-primary bg-brand-primary text-ink-inverse'
                        : 'border-hairline bg-surface-2 text-ink-secondary hover:bg-surface-0'
                    }`}
                  >
                    N={presetN}
                  </button>
                ))}
              </div>
            </div>

            <input
              id="hero-n-slider"
              type="range"
              min="2"
              max="32"
              step="1"
              value={subintervalsN}
              aria-valuetext={`${subintervalsN} subintervals, Riemann sum ${riemannSum.toFixed(4)}, error ${integralError.toFixed(5)}`}
              onChange={(e) => setSubintervalsN(parseInt(e.target.value, 10))}
              style={
                {
                  '--control-value': subintervalsN,
                  '--attr-min': 2,
                  '--attr-max': 32,
                } as React.CSSProperties
              }
              className="calculus-slider"
            />

            <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs tabular-nums">
              <div className="rounded-lg border border-hairline bg-surface-2 px-2.5 py-2">
                <span className="block text-[10px] uppercase tracking-wider text-ink-muted">
                  Sum S_{subintervalsN}
                </span>
                <strong className="text-sm font-bold text-brand-primary">
                  {riemannSum.toFixed(4)}
                </strong>
              </div>
              <div className="rounded-lg border border-hairline bg-surface-2 px-2.5 py-2">
                <span className="block text-[10px] uppercase tracking-wider text-ink-muted">
                  ∫ f(x) dx
                </span>
                <strong className="text-sm font-bold text-brand-accent">
                  {exactIntegral.toFixed(4)}
                </strong>
              </div>
              <div className="rounded-lg border border-hairline bg-surface-2 px-2.5 py-2">
                <span className="block text-[10px] uppercase tracking-wider text-ink-muted">
                  |S_N − ∫f|
                </span>
                <strong className="text-sm font-bold text-ink-primary">
                  {integralError.toFixed(5)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TAB 3 PANEL: SymPy Symbolic Verification & Misconception Preview */}
      <div
        role="tabpanel"
        id="hero-panel-sympy"
        aria-labelledby="hero-tab-sympy"
        hidden={activeTab !== 'sympy'}
      >
        <div className="space-y-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <h2 className="font-reading text-base font-bold tracking-display text-ink-primary sm:text-lg">
                SymPy Equivalence &amp; Distractor Audit
              </h2>
              <p className="font-reading text-xs text-ink-secondary">
                Select a candidate derivative for{' '}
                <span className="font-mono tabular-nums">d/dx[(x² + 1)³]</span> to inspect live CAS diagnostics.
              </p>
            </div>
            <span className="shrink-0 rounded-md border border-specular bg-callout-theorem-bg px-2 py-0.5 font-mono text-[11px] font-bold text-callout-theorem-ink tabular-nums">
              SymPy CAS
            </span>
          </div>

          {/* Candidate Step Selector */}
          <div className="grid grid-cols-3 gap-1.5">
            {SYMPY_CANDIDATES.map((cand) => {
              const active = cand.id === activeCandidate.id;
              return (
                <button
                  key={cand.id}
                  type="button"
                  onClick={() => setSelectedCandidateId(cand.id)}
                  className={`cursor-pointer rounded-xl border p-2 text-left transition-colors ${
                    active
                      ? 'border-brand-accent bg-surface-1 shadow-sm'
                      : 'border-hairline bg-surface-1/60 hover:bg-surface-1'
                  }`}
                >
                  <span className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                    {cand.badge}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-xs font-bold text-ink-primary tabular-nums">
                    {cand.studentLatex}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Recessed Obsidian SymPy Terminal & SVG Pipeline */}
          <div className="rounded-xl border border-specular bg-surface-3 p-3.5 text-ink-inverse shadow-inner space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 font-mono text-[11px] tabular-nums">
              <span className="text-sky-300">tools/verify/calculus_verifier.py</span>
              <span
                className={
                  activeCandidate.isEquivalent
                    ? 'font-bold text-emerald-300'
                    : 'font-bold text-amber-300'
                }
              >
                {activeCandidate.isEquivalent ? 'PASS · RESIDUAL = 0' : 'DISTRACTOR CAUGHT'}
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs tabular-nums">
              <div className="text-slate-300">
                <span className="text-sky-400">&gt;&gt;&gt;</span> {activeCandidate.sympyExpr}
              </div>
              <div
                className={
                  activeCandidate.isEquivalent
                    ? 'font-bold text-emerald-300'
                    : 'font-bold text-amber-300'
                }
              >
                {activeCandidate.residual}
              </div>
            </div>

            {/* Miniature SVG AST Verification Pipeline */}
            <svg
              role="img"
              aria-label="SymPy symbolic verification pipeline from student expression to AST canonicalization and misconception tag"
              viewBox="0 0 380 44"
              className="h-auto w-full select-none"
            >
              <title>SymPy Symbolic AST Equivalence Pipeline</title>
              <rect
                x="2"
                y="6"
                width="108"
                height="32"
                rx="6"
                fill="rgba(30, 41, 59, 0.9)"
                stroke="rgba(148, 163, 184, 0.35)"
              />
              <text x="56" y="25" textAnchor="middle" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">
                parse_expr(step)
              </text>

              <line x1="110" y1="22" x2="134" y2="22" stroke="oklch(0.78 0.14 185)" strokeWidth="1.5" />

              <rect
                x="134"
                y="6"
                width="116"
                height="32"
                rx="6"
                fill="rgba(30, 41, 59, 0.9)"
                stroke="rgba(148, 163, 184, 0.35)"
              />
              <text x="192" y="25" textAnchor="middle" fontSize="9.5" fill="#7dd3fc" fontFamily="monospace">
                simplify(Δ) == 0
              </text>

              <line x1="250" y1="22" x2="274" y2="22" stroke="oklch(0.78 0.14 185)" strokeWidth="1.5" />

              <rect
                x="274"
                y="6"
                width="104"
                height="32"
                rx="6"
                fill={
                  activeCandidate.isEquivalent
                    ? 'rgba(6, 78, 59, 0.75)'
                    : 'rgba(120, 53, 15, 0.75)'
                }
                stroke={
                  activeCandidate.isEquivalent
                    ? 'rgba(52, 211, 153, 0.6)'
                    : 'rgba(251, 191, 36, 0.6)'
                }
              />
              <text
                x="326"
                y="25"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="700"
                fill={activeCandidate.isEquivalent ? '#6ee7b7' : '#fcd34d'}
                fontFamily="monospace"
              >
                {activeCandidate.isEquivalent ? 'VERIFIED == 0' : 'TAGGED ERROR'}
              </text>
            </svg>
          </div>

          {/* Pedagogical Diagnosis Callout */}
          <div
            className={`rounded-xl border p-3 ${
              activeCandidate.isEquivalent ? 'callout-theorem' : 'callout-misconception'
            }`}
          >
            <div className="flex items-center gap-2">
              {activeCandidate.isEquivalent ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
              ) : (
                <AlertTriangle
                  className="h-4 w-4 shrink-0 text-callout-misconception-ink"
                  aria-hidden="true"
                />
              )}
              <span className="font-sans text-xs font-bold">
                {activeCandidate.diagnosisTitle}
              </span>
            </div>
            <p className="mt-1 font-reading text-xs leading-relaxed">
              {activeCandidate.diagnosisBody}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Status Strip */}
      <div className="mt-3.5 flex items-center justify-between border-t border-hairline pt-2.5 font-mono text-[11px] text-ink-muted tabular-nums">
        <span className="inline-flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
          Interactive SVG · 60fps Client Telemetry
        </span>
        <span>Ch 02–05 Core</span>
      </div>
    </aside>
  );
}
