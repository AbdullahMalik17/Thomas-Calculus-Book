'use client';

import React, { useId, useMemo, useState } from 'react';
import { InlineMath } from '@/components/math/InlineMath';

export type PartitionRule = 'left' | 'right' | 'midpoint' | 'trapezoidal';

interface IntegralPreset {
  id: 'parabola' | 'sine' | 'concave';
  label: string;
  latex: string;
  a: number;
  b: number;
  yMax: number;
  fn: (x: number) => number;
  exactIntegral: number;
}

const INTEGRAL_PRESETS: Record<IntegralPreset['id'], IntegralPreset> = {
  parabola: {
    id: 'parabola',
    label: 'f(x) = 0.25x² + 0.5 on [0, 4]',
    latex: '\\int_0^4 (0.25x^2 + 0.5)\\,dx = \\frac{22}{3} \\approx 7.3333',
    a: 0,
    b: 4,
    yMax: 5.0,
    fn: (x) => 0.25 * x * x + 0.5,
    // [0.25 * x^3 / 3 + 0.5x]_0^4 = 16/3 + 2 = 22/3
    exactIntegral: 22 / 3,
  },
  sine: {
    id: 'sine',
    label: 'f(x) = 2 sin(πx/4) + 1 on [0, 4]',
    latex: '\\int_0^4 \\left(2\\sin\\frac{\\pi x}{4} + 1\\right)dx = \\frac{16}{\\pi} + 4 \\approx 9.0930',
    a: 0,
    b: 4,
    yMax: 3.4,
    fn: (x) => 2 * Math.sin((Math.PI * x) / 4) + 1,
    exactIntegral: 16 / Math.PI + 4,
  },
  concave: {
    id: 'concave',
    label: 'f(x) = 4 - 0.2x² on [0, 4]',
    latex: '\\int_0^4 (4 - 0.2x^2)\\,dx = \\frac{176}{15} \\approx 11.7333',
    a: 0,
    b: 4,
    yMax: 4.5,
    fn: (x) => 4 - 0.2 * x * x,
    // [4x - 0.2 * x^3 / 3]_0^4 = 16 - 12.8/3 = 35.2/3 = 176/15
    exactIntegral: 176 / 15,
  },
};

const N_PRESETS = [2, 4, 8, 16, 32, 64];

export interface RiemannSumVisualizerProps {
  defaultPreset?: IntegralPreset['id'];
  defaultRule?: PartitionRule;
  compact?: boolean;
}

export function RiemannSumVisualizer({
  defaultPreset = 'parabola',
  defaultRule = 'midpoint',
  compact = false,
}: RiemannSumVisualizerProps) {
  const baseId = useId();
  const presetSelectId = `${baseId}-preset`;
  const nSliderId = `${baseId}-n`;
  const svgTitleId = `${baseId}-svg-title`;
  const svgDescId = `${baseId}-svg-desc`;

  const [presetId, setPresetId] = useState<IntegralPreset['id']>(defaultPreset);
  const [rule, setRule] = useState<PartitionRule>(defaultRule);
  const [nSubintervals, setNSubintervals] = useState<number>(8);

  const preset = INTEGRAL_PRESETS[presetId];
  const { a, b, yMax, fn, exactIntegral } = preset;

  const computation = useMemo(() => {
    const dx = (b - a) / nSubintervals;
    let sum = 0;
    const shapes: {
      x0: number;
      x1: number;
      y0: number;
      y1: number;
      sampleX: number;
      sampleY: number;
    }[] = [];

    for (let k = 0; k < nSubintervals; k++) {
      const x0 = a + k * dx;
      const x1 = x0 + dx;
      const yLeft = fn(x0);
      const yRight = fn(x1);
      const xMid = 0.5 * (x0 + x1);
      const yMid = fn(xMid);

      if (rule === 'left') {
        sum += yLeft * dx;
        shapes.push({ x0, x1, y0: yLeft, y1: yLeft, sampleX: x0, sampleY: yLeft });
      } else if (rule === 'right') {
        sum += yRight * dx;
        shapes.push({ x0, x1, y0: yRight, y1: yRight, sampleX: x1, sampleY: yRight });
      } else if (rule === 'midpoint') {
        sum += yMid * dx;
        shapes.push({ x0, x1, y0: yMid, y1: yMid, sampleX: xMid, sampleY: yMid });
      } else {
        const trapHeight = 0.5 * (yLeft + yRight);
        sum += trapHeight * dx;
        shapes.push({ x0, x1, y0: yLeft, y1: yRight, sampleX: xMid, sampleY: trapHeight });
      }
    }

    const absError = Math.abs(sum - exactIntegral);
    const relErrorPct = (absError / Math.abs(exactIntegral)) * 100;

    return {
      dx,
      sum,
      absError,
      relErrorPct,
      shapes,
    };
  }, [a, b, fn, exactIntegral, nSubintervals, rule]);

  // SVG Layout
  const W = 640;
  const H = compact ? 310 : 350;
  const pad = { top: 24, right: 32, bottom: 44, left: 56 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const xMin = -0.2;
  const xMax = 4.3;

  const toSvgX = (x: number) => pad.left + ((x - xMin) / (xMax - xMin)) * plotW;
  const toSvgY = (y: number) => pad.top + plotH - (y / yMax) * plotH;
  const baselineY = toSvgY(0);

  const { curvePath, exactAreaPath } = useMemo(() => {
    const steps = 90;
    const curvePts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = a + (i / steps) * (b - a);
      const y = fn(x);
      curvePts.push(`${i === 0 ? 'M' : 'L'} ${toSvgX(x).toFixed(2)} ${toSvgY(y).toFixed(2)}`);
    }
    const cPath = curvePts.join(' ');
    const aPath = `${cPath} L ${toSvgX(b).toFixed(2)} ${baselineY.toFixed(2)} L ${toSvgX(a).toFixed(2)} ${baselineY.toFixed(2)} Z`;
    return { curvePath: cPath, exactAreaPath: aPath };
  }, [a, b, fn, yMax, plotW, plotH, baselineY]);

  const nProgress = ((nSubintervals - 2) / (64 - 2)) * 100;

  const ruleDescriptions: Record<PartitionRule, { name: string; tag: string }> = {
    left: { name: 'Left Endpoint (LRAM)', tag: 'xₖ* = xₖ₋₁' },
    right: { name: 'Right Endpoint (RRAM)', tag: 'xₖ* = xₖ' },
    midpoint: { name: 'Midpoint Rule (MRAM)', tag: 'xₖ* = (xₖ₋₁+xₖ)/2' },
    trapezoidal: { name: 'Trapezoidal Rule', tag: '(f(xₖ₋₁)+f(xₖ))/2' },
  };

  return (
    <section
      aria-label="Interactive Riemann Sum Visualizer"
      className="rounded-2xl border border-[#dbe2ea] bg-white p-4 shadow-sm sm:p-6 space-y-5"
    >
      <p className="visually-hidden">
        Interactive Riemann sum visualizer comparing Left, Right, Midpoint, and Trapezoidal approximations for N from 2 to 64 subintervals against the exact definite integral.
      </p>

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-[#176b63] border border-emerald-200">
              Sections 5.1 – 5.3 Interactive Lab
            </span>
            <span className="text-xs font-medium text-slate-500">
              Finite Sums &amp; Definite Integral Limit
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#172b43] sm:text-xl">
            Riemann Sum Partition Explorer:{' '}
            <span className="font-normal">
              <InlineMath math={preset.latex} />
            </span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor={presetSelectId} className="text-xs font-semibold text-slate-600 shrink-0">
            Integrand:
          </label>
          <select
            id={presetSelectId}
            value={presetId}
            onChange={(e) => setPresetId(e.target.value as IntegralPreset['id'])}
            className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-[#176b63] focus:bg-white focus:outline-none"
          >
            {Object.values(INTEGRAL_PRESETS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Controls: Partition Method + Subintervals Slider */}
      <div className="grid gap-4 lg:grid-cols-2 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="space-y-2">
          <span className="block text-xs font-bold text-[#172b43]">
            1. Sampling Rule (<InlineMath math="S_N = \sum_{k=1}^N f(x_k^*)\,\Delta x" />)
          </span>
          <div
            role="group"
            aria-label="Riemann sum sampling method"
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          >
            {(['left', 'right', 'midpoint', 'trapezoidal'] as const).map((r) => {
              const active = rule === r;
              return (
                <button
                  key={r}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRule(r)}
                  className={`rounded-lg border px-2.5 py-2 text-xs font-bold capitalize transition-colors ${
                    active
                      ? 'border-[#176b63] bg-[#176b63] text-white shadow-xs'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] font-mono text-slate-600">
            Active Rule: <strong>{ruleDescriptions[rule].name}</strong> ({ruleDescriptions[rule].tag})
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor={nSliderId} className="font-bold text-[#176b63]">
              2. Number of Subintervals <InlineMath math="N" /> (2 to 64)
            </label>
            <output
              htmlFor={nSliderId}
              className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-xs font-bold text-emerald-950 tabular-nums"
            >
              N = {nSubintervals} (Δx = {computation.dx.toFixed(4)})
            </output>
          </div>
          <input
            id={nSliderId}
            type="range"
            min={2}
            max={64}
            step={1}
            value={nSubintervals}
            aria-label="Number of Riemann sum subintervals N"
            onChange={(e) => setNSubintervals(parseInt(e.target.value, 10))}
            style={{ '--progress': `${nProgress}%` } as React.CSSProperties}
            className="w-full cursor-pointer"
          />
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-500 mr-1">Presets:</span>
            {N_PRESETS.map((nVal) => (
              <button
                key={nVal}
                type="button"
                onClick={() => setNSubintervals(nVal)}
                className={`rounded px-2 py-0.5 font-mono text-[11px] font-semibold tabular-nums transition-colors ${
                  nSubintervals === nVal
                    ? 'bg-[#176b63] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                N={nVal}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Numeric Readouts (tabular-nums) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-sky-900">
            Finite Sum S_{nSubintervals}
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-sky-950 tabular-nums sm:text-base">
            {computation.sum.toFixed(5)}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-slate-600 tabular-nums">
            {ruleDescriptions[rule].name}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
            Exact Integral I
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-[#176b63] tabular-nums sm:text-base">
            {exactIntegral.toFixed(5)}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-slate-600 tabular-nums">
            Limit as N → ∞ (Δx → 0)
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Partition Width Δx
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-slate-900 tabular-nums sm:text-base">
            {computation.dx.toFixed(4)}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-slate-600 tabular-nums">
            (b - a) / N = 4 / {nSubintervals}
          </p>
        </div>

        <div
          className={`rounded-xl border p-3 ${
            computation.relErrorPct < 0.5
              ? 'border-emerald-300 bg-emerald-50/70'
              : 'border-amber-200 bg-amber-50/40'
          }`}
        >
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
            Approximation Error
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-slate-900 tabular-nums sm:text-base">
            {computation.absError.toFixed(5)}
          </p>
          <p className="mt-0.5 font-mono text-[11px] font-semibold text-slate-600 tabular-nums">
            Relative Error: {computation.relErrorPct.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* SVG Plot */}
      <figure className="rounded-xl border border-slate-200 bg-[#fcfdfe] p-2 sm:p-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-labelledby={svgTitleId}
          aria-describedby={svgDescId}
          className="w-full h-auto select-none"
        >
          <title id={svgTitleId}>
            {ruleDescriptions[rule].name} Riemann Sum with N = {nSubintervals} on {preset.label}
          </title>
          <desc id={svgDescId}>
            Visual partition of the area under {preset.label} into {nSubintervals} subintervals of width{' '}
            {computation.dx.toFixed(4)}, producing an estimated area of {computation.sum.toFixed(4)} compared to the exact area {exactIntegral.toFixed(4)}.
          </desc>

          <rect
            x={pad.left}
            y={pad.top}
            width={plotW}
            height={plotH}
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="1"
          />

          {/* Subtle Exact Area Shading */}
          <path d={exactAreaPath} fill="#e2e8f0" fillOpacity="0.45" />

          {/* Partition Rectangles / Trapezoids */}
          {computation.shapes.map((s, idx) => {
            const sx0 = toSvgX(s.x0);
            const sx1 = toSvgX(s.x1);
            const sy0 = toSvgY(s.y0);
            const sy1 = toSvgY(s.y1);
            const polyPoints = `${sx0.toFixed(2)},${baselineY.toFixed(2)} ${sx0.toFixed(2)},${sy0.toFixed(2)} ${sx1.toFixed(2)},${sy1.toFixed(2)} ${sx1.toFixed(2)},${baselineY.toFixed(2)}`;
            return (
              <g key={idx}>
                <polygon
                  points={polyPoints}
                  fill="#0284c7"
                  fillOpacity="0.28"
                  stroke="#0284c7"
                  strokeWidth={nSubintervals <= 24 ? '1.1' : '0.6'}
                />
                {nSubintervals <= 24 && (
                  <circle
                    cx={toSvgX(s.sampleX)}
                    cy={toSvgY(s.sampleY)}
                    r={nSubintervals <= 12 ? '3.5' : '2.2'}
                    fill="#0f766e"
                  />
                )}
              </g>
            );
          })}

          {/* Baseline and X-Axis Ticks */}
          <line
            x1={pad.left}
            y1={baselineY}
            x2={pad.left + plotW}
            y2={baselineY}
            stroke="#475569"
            strokeWidth="1.4"
          />
          {[0, 1, 2, 3, 4].map((xTick) => {
            const sx = toSvgX(xTick);
            return (
              <g key={`xt-${xTick}`}>
                <line
                  x1={sx}
                  y1={baselineY}
                  x2={sx}
                  y2={baselineY + 6}
                  stroke="#475569"
                  strokeWidth="1.2"
                />
                <text
                  x={sx}
                  y={baselineY + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#334155"
                >
                  x = {xTick}
                </text>
              </g>
            );
          })}

          {/* Y-Axis Ticks */}
          {[0, 1, 2, 3, 4].map((yTick) => {
            if (yTick > yMax) return null;
            const sy = toSvgY(yTick);
            return (
              <g key={`yt-${yTick}`}>
                <line
                  x1={pad.left - 5}
                  y1={sy}
                  x2={pad.left}
                  y2={sy}
                  stroke="#64748b"
                  strokeWidth="1"
                />
                <text
                  x={pad.left - 9}
                  y={sy + 4}
                  textAnchor="end"
                  fontSize="10.5"
                  fill="#475569"
                >
                  {yTick}
                </text>
              </g>
            );
          })}

          {/* Exact Function Curve on Top */}
          <path
            d={curvePath}
            fill="none"
            stroke="#1e3a5f"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Top-Left Summary Badge */}
          <rect
            x={pad.left + 12}
            y={pad.top + 10}
            width="255"
            height="46"
            rx="6"
            fill="#ffffff"
            fillOpacity="0.93"
            stroke="#cbd5e1"
          />
          <text x={pad.left + 22} y={pad.top + 28} fontSize="11" fontWeight="700" fill="#1e3a5f">
            {ruleDescriptions[rule].name} (N = {nSubintervals})
          </text>
          <text x={pad.left + 22} y={pad.top + 45} fontSize="11" fill="#0f766e" fontWeight="700">
            S_{nSubintervals} = {computation.sum.toFixed(4)} vs Exact = {exactIntegral.toFixed(4)}
          </text>
        </svg>
        <figcaption className="mt-2 px-1 text-xs text-slate-600">
          <strong>Convergence Insight:</strong> Notice how Midpoint and Trapezoidal sums cancel first-order triangle errors on each subinterval, converging at rate <InlineMath math="O(1/N^2)" /> compared to <InlineMath math="O(1/N)" /> for Left and Right endpoint sums.
        </figcaption>
      </figure>
    </section>
  );
}
