'use client';

import React, { useId, useMemo, useState } from 'react';
import { InlineMath } from '@/components/math/InlineMath';

interface CurvePreset {
  id: 'parabola' | 'cubic' | 'sine';
  label: string;
  formulaLatex: string;
  derivativeLatex: string;
  defaultX0: number;
  xRange: [number, number];
  yRange: [number, number];
  fn: (x: number) => number;
  dfn: (x: number) => number;
}

const CURVE_PRESETS: Record<CurvePreset['id'], CurvePreset> = {
  parabola: {
    id: 'parabola',
    label: 'Parabola: f(x) = 0.25x² + 0.5',
    formulaLatex: 'f(x) = 0.25x^2 + 0.5',
    derivativeLatex: "f'(x) = 0.5x",
    defaultX0: 1.5,
    xRange: [-0.5, 4.2],
    yRange: [0, 5.2],
    fn: (x) => 0.25 * x * x + 0.5,
    dfn: (x) => 0.5 * x,
  },
  cubic: {
    id: 'cubic',
    label: 'Cubic: f(x) = 0.15x³ - 0.3x + 1.5',
    formulaLatex: 'f(x) = 0.15x^3 - 0.3x + 1.5',
    derivativeLatex: "f'(x) = 0.45x^2 - 0.3",
    defaultX0: 1.6,
    xRange: [-1.0, 3.6],
    yRange: [0, 6.2],
    fn: (x) => 0.15 * x * x * x - 0.3 * x + 1.5,
    dfn: (x) => 0.45 * x * x - 0.3,
  },
  sine: {
    id: 'sine',
    label: 'Sinusoid: f(x) = 1.4 sin(x) + 2.0',
    formulaLatex: 'f(x) = 1.4\\sin(x) + 2',
    derivativeLatex: "f'(x) = 1.4\\cos(x)",
    defaultX0: 1.0,
    xRange: [-0.4, 4.4],
    yRange: [0.2, 3.8],
    fn: (x) => 1.4 * Math.sin(x) + 2.0,
    dfn: (x) => 1.4 * Math.cos(x),
  },
};

const H_PRESETS = [-1.0, -0.5, -0.1, 0.01, 0.1, 0.5, 1.0, 1.5];

export interface SecantTangentExplorerProps {
  defaultPreset?: CurvePreset['id'];
  compact?: boolean;
}

export function SecantTangentExplorer({
  defaultPreset = 'parabola',
  compact = false,
}: SecantTangentExplorerProps) {
  const baseId = useId();
  const presetSelectId = `${baseId}-preset`;
  const x0SliderId = `${baseId}-x0`;
  const hSliderId = `${baseId}-h`;
  const svgTitleId = `${baseId}-svg-title`;
  const svgDescId = `${baseId}-svg-desc`;

  const [presetId, setPresetId] = useState<CurvePreset['id']>(defaultPreset);
  const preset = CURVE_PRESETS[presetId];

  const [x0, setX0] = useState<number>(preset.defaultX0);
  const [h, setH] = useState<number>(1.2);

  const handlePresetChange = (nextId: CurvePreset['id']) => {
    setPresetId(nextId);
    setX0(CURVE_PRESETS[nextId].defaultX0);
    setH(1.1);
  };

  // Avoid exact h = 0 division by clamping |h| >= 0.005 for difference quotient computation
  const effectiveH = Math.abs(h) < 0.005 ? (h >= 0 ? 0.005 : -0.005) : h;

  const calc = useMemo(() => {
    const y0 = preset.fn(x0);
    const x1 = x0 + effectiveH;
    const y1 = preset.fn(x1);
    const deltaY = y1 - y0;
    const secantSlope = deltaY / effectiveH;
    const tangentSlope = preset.dfn(x0);
    const slopeError = Math.abs(secantSlope - tangentSlope);
    return {
      y0,
      x1,
      y1,
      deltaY,
      secantSlope,
      tangentSlope,
      slopeError,
    };
  }, [preset, x0, effectiveH]);

  // SVG Layout
  const W = 640;
  const H = compact ? 310 : 350;
  const pad = { top: 24, right: 32, bottom: 44, left: 56 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const [xMin, xMax] = preset.xRange;
  const [yMin, yMax] = preset.yRange;

  const toSvgX = (x: number) => pad.left + ((x - xMin) / (xMax - xMin)) * plotW;
  const toSvgY = (y: number) => pad.top + plotH - ((y - yMin) / (yMax - yMin)) * plotH;

  const curvePath = useMemo(() => {
    const steps = 90;
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = preset.fn(x);
      pts.push(`${i === 0 ? 'M' : 'L'} ${toSvgX(x).toFixed(2)} ${toSvgY(y).toFixed(2)}`);
    }
    return pts.join(' ');
  }, [preset, xMin, xMax, yMin, yMax, plotW, plotH]);

  // Line endpoints across [xMin, xMax]
  const tangentYAtMin = calc.y0 + calc.tangentSlope * (xMin - x0);
  const tangentYAtMax = calc.y0 + calc.tangentSlope * (xMax - x0);

  const secantYAtMin = calc.y0 + calc.secantSlope * (xMin - x0);
  const secantYAtMax = calc.y0 + calc.secantSlope * (xMax - x0);

  const svgP = { x: toSvgX(x0), y: toSvgY(calc.y0) };
  const svgQ = { x: toSvgX(calc.x1), y: toSvgY(calc.y1) };

  const x0Progress = ((x0 - 0.4) / (2.4 - 0.4)) * 100;
  const hProgress = ((h - -1.5) / (1.8 - -1.5)) * 100;

  return (
    <section
      aria-label="Interactive Secant to Tangent Explorer"
      className="rounded-2xl border border-[#dbe2ea] bg-white p-4 shadow-sm sm:p-6 space-y-5"
    >
      <p className="visually-hidden">
        Interactive calculus visualizer showing the secant line connecting P(x0, f(x0)) and Q(x0+h, f(x0+h)) converging to the tangent line at x0 as step size h approaches 0.
      </p>

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
              Sections 2.1 &amp; 3.1 Interactive Lab
            </span>
            <span className="text-xs font-medium text-slate-500">
              Difference Quotient &amp; Derivative Limit
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#172b43] sm:text-xl">
            Secant-to-Tangent Convergence:{' '}
            <span className="font-normal">
              <InlineMath math="f'(x_0) = \lim_{h \to 0} \frac{f(x_0+h)-f(x_0)}{h}" />
            </span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor={presetSelectId} className="text-xs font-semibold text-slate-600 shrink-0">
            Curve:
          </label>
          <select
            id={presetSelectId}
            value={presetId}
            onChange={(e) => handlePresetChange(e.target.value as CurvePreset['id'])}
            className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-[#176b63] focus:bg-white focus:outline-none"
          >
            {Object.values(CURVE_PRESETS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sliders + Quick Presets */}
      <div className="grid gap-4 sm:grid-cols-2 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor={hSliderId} className="font-bold text-amber-800">
              1. Step Size <InlineMath math="h = \Delta x" /> (Shrink toward 0)
            </label>
            <output
              htmlFor={hSliderId}
              className="rounded bg-amber-100 px-2 py-0.5 font-mono text-xs font-bold text-amber-950 tabular-nums"
            >
              h = {effectiveH > 0 ? `+${effectiveH.toFixed(3)}` : effectiveH.toFixed(3)}
            </output>
          </div>
          <input
            id={hSliderId}
            type="range"
            min={-1.5}
            max={1.8}
            step={0.02}
            value={h}
            aria-label="Secant step size h"
            onChange={(e) => setH(parseFloat(e.target.value))}
            style={{ '--progress': `${hProgress}%` } as React.CSSProperties}
            className="w-full cursor-pointer"
          />
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-500 mr-1">Quick h:</span>
            {H_PRESETS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setH(val)}
                className={`rounded px-2 py-0.5 font-mono text-[11px] font-semibold tabular-nums transition-colors ${
                  Math.abs(effectiveH - val) < 0.015
                    ? 'bg-amber-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50'
                }`}
              >
                {val > 0 ? `+${val}` : val}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor={x0SliderId} className="font-bold text-[#176b63]">
              2. Anchor Point <InlineMath math="x_0" /> on Curve
            </label>
            <output
              htmlFor={x0SliderId}
              className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-xs font-bold text-emerald-950 tabular-nums"
            >
              x₀ = {x0.toFixed(2)}
            </output>
          </div>
          <input
            id={x0SliderId}
            type="range"
            min={0.4}
            max={2.4}
            step={0.05}
            value={x0}
            aria-label="Anchor point x0"
            onChange={(e) => setX0(parseFloat(e.target.value))}
            style={{ '--progress': `${x0Progress}%` } as React.CSSProperties}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-500 tabular-nums pt-1">
            <span>P({x0.toFixed(2)}, {calc.y0.toFixed(2)})</span>
            <span>Q({calc.x1.toFixed(2)}, {calc.y1.toFixed(2)})</span>
          </div>
        </div>
      </div>

      {/* Live Numeric Readouts (tabular-nums) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
            Secant Slope (m_sec)
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-amber-900 tabular-nums sm:text-base">
            {calc.secantSlope.toFixed(4)}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-slate-600 tabular-nums">
            Δy / h = {calc.deltaY.toFixed(3)} / {effectiveH.toFixed(3)}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
            Exact Tangent f&apos;(x₀)
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-[#176b63] tabular-nums sm:text-base">
            {calc.tangentSlope.toFixed(4)}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-slate-600 tabular-nums">
            Instantaneous rate at x₀ = {x0.toFixed(2)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Rise &amp; Run (Δy, Δx)
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-slate-900 tabular-nums sm:text-base">
            Δy = {calc.deltaY >= 0 ? `+${calc.deltaY.toFixed(3)}` : calc.deltaY.toFixed(3)}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-slate-600 tabular-nums">
            Δx = h = {effectiveH.toFixed(3)}
          </p>
        </div>

        <div
          className={`rounded-xl border p-3 ${
            calc.slopeError < 0.05
              ? 'border-emerald-300 bg-emerald-50/70'
              : 'border-slate-200 bg-slate-50/70'
          }`}
        >
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
            Slope Discrepancy
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-slate-900 tabular-nums sm:text-base">
            |m_sec - f&apos;(x₀)| = {calc.slopeError.toFixed(4)}
          </p>
          <p className="mt-0.5 font-mono text-[11px] font-semibold tabular-nums">
            {calc.slopeError < 0.03 ? (
              <span className="text-emerald-800">Practically tangent! (h ≈ 0)</span>
            ) : (
              <span className="text-slate-600">Shrink |h| to reduce error</span>
            )}
          </p>
        </div>
      </div>

      {/* SVG Coordinate Plot */}
      <figure className="rounded-xl border border-slate-200 bg-[#fcfdfe] p-2 sm:p-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-labelledby={svgTitleId}
          aria-describedby={svgDescId}
          className="w-full h-auto select-none"
        >
          <title id={svgTitleId}>
            Secant and Tangent Lines on {preset.label}
          </title>
          <desc id={svgDescId}>
            Graph of {preset.label} with anchor point P at x0 = {x0.toFixed(2)}, second point Q at x0+h ={' '}
            {calc.x1.toFixed(2)}, secant slope {calc.secantSlope.toFixed(4)}, and tangent slope{' '}
            {calc.tangentSlope.toFixed(4)}.
          </desc>

          <defs>
            <clipPath id={`${baseId}-clip`}>
              <rect x={pad.left} y={pad.top} width={plotW} height={plotH} />
            </clipPath>
          </defs>

          <rect
            x={pad.left}
            y={pad.top}
            width={plotW}
            height={plotH}
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="1"
          />

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((gx) => {
            if (gx < xMin || gx > xMax) return null;
            const sx = toSvgX(gx);
            return (
              <g key={`gx-${gx}`}>
                <line
                  x1={sx}
                  y1={pad.top}
                  x2={sx}
                  y2={pad.top + plotH}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={sx}
                  y={pad.top + plotH + 16}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="#64748b"
                >
                  {gx}
                </text>
              </g>
            );
          })}

          {[1, 2, 3, 4, 5].map((gy) => {
            if (gy < yMin || gy > yMax) return null;
            const sy = toSvgY(gy);
            return (
              <g key={`gy-${gy}`}>
                <line
                  x1={pad.left}
                  y1={sy}
                  x2={pad.left + plotW}
                  y2={sy}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={pad.left - 8}
                  y={sy + 4}
                  textAnchor="end"
                  fontSize="10.5"
                  fill="#64748b"
                >
                  {gy}
                </text>
              </g>
            );
          })}

          <g clipPath={`url(#${baseId}-clip)`}>
            {/* Exact Tangent Line at P */}
            <line
              x1={toSvgX(xMin)}
              y1={toSvgY(tangentYAtMin)}
              x2={toSvgX(xMax)}
              y2={toSvgY(tangentYAtMax)}
              stroke="#176b63"
              strokeWidth="2.2"
            />

            {/* Secant Line through P and Q */}
            <line
              x1={toSvgX(xMin)}
              y1={toSvgY(secantYAtMin)}
              x2={toSvgX(xMax)}
              y2={toSvgY(secantYAtMax)}
              stroke="#d97706"
              strokeWidth="2.2"
              strokeDasharray="6 4"
            />

            {/* Rise / Run Right Triangle (Δx = h, Δy) */}
            <line
              x1={svgP.x}
              y1={svgP.y}
              x2={svgQ.x}
              y2={svgP.y}
              stroke="#64748b"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <line
              x1={svgQ.x}
              y1={svgP.y}
              x2={svgQ.x}
              y2={svgQ.y}
              stroke="#d97706"
              strokeWidth="1.75"
              strokeDasharray="3 3"
            />

            {/* Function Curve */}
            <path
              d={curvePath}
              fill="none"
              stroke="#1e3a5f"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Point Q(x0 + h, f(x0 + h)) */}
            <circle
              cx={svgQ.x}
              cy={svgQ.y}
              r="5.5"
              fill="#d97706"
              stroke="#ffffff"
              strokeWidth="2"
            />

            {/* Anchor Point P(x0, f(x0)) */}
            <circle
              cx={svgP.x}
              cy={svgP.y}
              r="6"
              fill="#176b63"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </g>

          {/* Point Labels */}
          <text
            x={svgP.x - 8}
            y={svgP.y - 10}
            textAnchor="end"
            fontSize="11"
            fontWeight="700"
            fill="#176b63"
          >
            P({x0.toFixed(2)}, {calc.y0.toFixed(2)})
          </text>
          <text
            x={svgQ.x + 8}
            y={svgQ.y - 8}
            textAnchor="start"
            fontSize="11"
            fontWeight="700"
            fill="#b45309"
          >
            Q({calc.x1.toFixed(2)}, {calc.y1.toFixed(2)})
          </text>

          {/* Legend Overlay */}
          <rect
            x={pad.left + 12}
            y={pad.top + 10}
            width="245"
            height="48"
            rx="6"
            fill="#ffffff"
            fillOpacity="0.93"
            stroke="#cbd5e1"
          />
          <line
            x1={pad.left + 22}
            y1={pad.top + 25}
            x2={pad.left + 44}
            y2={pad.top + 25}
            stroke="#176b63"
            strokeWidth="2.5"
          />
          <text x={pad.left + 50} y={pad.top + 29} fontSize="11" fontWeight="700" fill="#176b63">
            Tangent Slope f&apos;(x₀) = {calc.tangentSlope.toFixed(4)}
          </text>
          <line
            x1={pad.left + 22}
            y1={pad.top + 43}
            x2={pad.left + 44}
            y2={pad.top + 43}
            stroke="#d97706"
            strokeWidth="2.5"
            strokeDasharray="4 3"
          />
          <text x={pad.left + 50} y={pad.top + 47} fontSize="11" fontWeight="700" fill="#b45309">
            Secant Quotient = {calc.secantSlope.toFixed(4)}
          </text>
        </svg>
        <figcaption className="mt-2 px-1 text-xs text-slate-600">
          <strong>Geometric Insight:</strong> Drag <InlineMath math="h \to 0" /> from either the left (<InlineMath math="h < 0" />) or the right (<InlineMath math="h > 0" />) to watch the dashed amber secant line rotate into the solid teal tangent line at <InlineMath math="P" />.
        </figcaption>
      </figure>
    </section>
  );
}
