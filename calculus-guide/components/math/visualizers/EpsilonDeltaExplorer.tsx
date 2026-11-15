'use client';

import React, { useId, useMemo, useState } from 'react';
import { InlineMath } from '@/components/math/InlineMath';

interface FunctionPreset {
  id: 'quadratic' | 'linear' | 'cubic';
  label: string;
  latex: string;
  c: number;
  L: number;
  fn: (x: number) => number;
  invFn: (y: number) => number;
  domain: [number, number];
  range: [number, number];
}

const PRESETS: Record<FunctionPreset['id'], FunctionPreset> = {
  quadratic: {
    id: 'quadratic',
    label: 'Quadratic: f(x) = 0.25x² + 0.5x + 1 at c = 2',
    latex: '\\lim_{x \\to 2} (0.25x^2 + 0.5x + 1) = 3',
    c: 2,
    L: 3,
    fn: (x) => 0.25 * x * x + 0.5 * x + 1,
    // For x > -1, 0.25x^2 + 0.5x + (1 - y) = 0 => x = -1 + 2*sqrt(y - 0.75)
    invFn: (y) => -1 + 2 * Math.sqrt(Math.max(0, y - 0.75)),
    domain: [0, 3.6],
    range: [0.5, 5.5],
  },
  linear: {
    id: 'linear',
    label: 'Linear: f(x) = 1.5x + 0.5 at c = 2',
    latex: '\\lim_{x \\to 2} (1.5x + 0.5) = 3.5',
    c: 2,
    L: 3.5,
    fn: (x) => 1.5 * x + 0.5,
    invFn: (y) => (y - 0.5) / 1.5,
    domain: [0, 3.6],
    range: [0.5, 6.0],
  },
  cubic: {
    id: 'cubic',
    label: 'Cubic: f(x) = 0.2x³ + 1.4 at c = 2',
    latex: '\\lim_{x \\to 2} (0.2x^3 + 1.4) = 3',
    c: 2,
    L: 3,
    fn: (x) => 0.2 * x * x * x + 1.4,
    invFn: (y) => Math.cbrt((y - 1.4) / 0.2),
    domain: [0, 3.2],
    range: [0.5, 6.2],
  },
};

export interface EpsilonDeltaExplorerProps {
  defaultPreset?: FunctionPreset['id'];
  compact?: boolean;
}

export function EpsilonDeltaExplorer({
  defaultPreset = 'quadratic',
  compact = false,
}: EpsilonDeltaExplorerProps) {
  const baseId = useId();
  const presetSelectId = `${baseId}-preset`;
  const epsSliderId = `${baseId}-epsilon`;
  const probeSliderId = `${baseId}-probe`;
  const svgTitleId = `${baseId}-svg-title`;
  const svgDescId = `${baseId}-svg-desc`;

  const [presetId, setPresetId] = useState<FunctionPreset['id']>(defaultPreset);
  const [epsilon, setEpsilon] = useState<number>(0.65);
  const [probeOffset, setProbeOffset] = useState<number>(0.18);

  const preset = PRESETS[presetId];
  const { c, L, fn, invFn, domain, range } = preset;

  const metrics = useMemo(() => {
    const yLow = L - epsilon;
    const yHigh = L + epsilon;
    const xLeftExact = invFn(yLow);
    const xRightExact = invFn(yHigh);

    const deltaLeft = Math.max(0.01, c - xLeftExact);
    const deltaRight = Math.max(0.01, xRightExact - c);
    // Symmetric valid delta must be the minimum of the two one-sided distances
    const delta = Math.min(deltaLeft, deltaRight);

    const probeX = Number((c + probeOffset).toFixed(3));
    const probeY = fn(probeX);
    const dxAbs = Math.abs(probeX - c);
    const dyAbs = Math.abs(probeY - L);
    const insideDelta = dxAbs > 0 && dxAbs < delta;
    const insideEpsilon = dyAbs < epsilon;

    return {
      yLow,
      yHigh,
      xLeftExact,
      xRightExact,
      deltaLeft,
      deltaRight,
      delta,
      cMinusDelta: c - delta,
      cPlusDelta: c + delta,
      probeX,
      probeY,
      dxAbs,
      dyAbs,
      insideDelta,
      insideEpsilon,
    };
  }, [L, c, epsilon, fn, invFn, probeOffset]);

  // SVG Coordinate System
  const W = 640;
  const H = compact ? 310 : 350;
  const pad = { top: 24, right: 32, bottom: 44, left: 56 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const toSvgX = (x: number) =>
    pad.left + ((x - domain[0]) / (domain[1] - domain[0])) * plotW;
  const toSvgY = (y: number) =>
    pad.top + plotH - ((y - range[0]) / (range[1] - range[0])) * plotH;

  const curvePath = useMemo(() => {
    const steps = 90;
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = domain[0] + (i / steps) * (domain[1] - domain[0]);
      const y = fn(x);
      const sx = toSvgX(x).toFixed(2);
      const sy = toSvgY(y).toFixed(2);
      pts.push(`${i === 0 ? 'M' : 'L'} ${sx} ${sy}`);
    }
    return pts.join(' ');
  }, [domain, range, fn, plotW, plotH]);

  const epsProgress = ((epsilon - 0.1) / (1.2 - 0.1)) * 100;
  const probeProgress = ((probeOffset - -0.75) / (0.75 - -0.75)) * 100;

  const svgC = toSvgX(c);
  const svgL = toSvgY(L);
  const svgYHigh = toSvgY(metrics.yHigh);
  const svgYLow = toSvgY(metrics.yLow);
  const svgXMinusDelta = toSvgX(metrics.cMinusDelta);
  const svgXPlusDelta = toSvgX(metrics.cPlusDelta);
  const svgProbeX = toSvgX(metrics.probeX);
  const svgProbeY = toSvgY(metrics.probeY);

  return (
    <section
      aria-label="Interactive Epsilon-Delta Limit Explorer"
      className="rounded-2xl border border-[#dbe2ea] bg-white p-4 shadow-sm sm:p-6 space-y-5"
    >
      <p className="visually-hidden">
        Interactive epsilon-delta limit visualizer showing how choosing a target tolerance epsilon around L dynamically determines the largest symmetric delta interval around c so that f(x) stays inside (L - epsilon, L + epsilon).
      </p>

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-sky-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-[#0284c7] border border-sky-200">
              Section 2.3 Interactive Lab
            </span>
            <span className="text-xs font-medium text-slate-500">
              Precise Limit Definition (<InlineMath math="\varepsilon\text{--}\delta" />)
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#172b43] sm:text-xl">
            <InlineMath math="\varepsilon\text{--}\delta" /> Target Band Explorer:{' '}
            <span className="font-normal">
              <InlineMath math={preset.latex} />
            </span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor={presetSelectId} className="text-xs font-semibold text-slate-600 shrink-0">
            Function:
          </label>
          <select
            id={presetSelectId}
            value={presetId}
            onChange={(e) => setPresetId(e.target.value as FunctionPreset['id'])}
            className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-[#176b63] focus:bg-white focus:outline-none"
          >
            {Object.values(PRESETS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-4 sm:grid-cols-2 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor={epsSliderId} className="font-bold text-[#0284c7]">
              1. Challenger Tolerance <InlineMath math="\varepsilon" /> (Vertical Band)
            </label>
            <output
              htmlFor={epsSliderId}
              className="rounded bg-sky-100 px-2 py-0.5 font-mono text-xs font-bold text-sky-900 tabular-nums"
            >
              ε = {epsilon.toFixed(2)}
            </output>
          </div>
          <input
            id={epsSliderId}
            type="range"
            min={0.1}
            max={1.2}
            step={0.05}
            value={epsilon}
            aria-label="Epsilon tolerance band radius around L"
            onChange={(e) => setEpsilon(parseFloat(e.target.value))}
            style={{ '--progress': `${epsProgress}%` } as React.CSSProperties}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-500 tabular-nums">
            <span>Tighter (0.10)</span>
            <span>
              Target: ({metrics.yLow.toFixed(2)}, {metrics.yHigh.toFixed(2)})
            </span>
            <span>Wider (1.20)</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor={probeSliderId} className="font-bold text-[#176b63]">
              2. Test Input <InlineMath math="x = c + \Delta x" /> (Horizontal Probe)
            </label>
            <output
              htmlFor={probeSliderId}
              className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-xs font-bold text-emerald-900 tabular-nums"
            >
              x = {metrics.probeX.toFixed(2)}
            </output>
          </div>
          <input
            id={probeSliderId}
            type="range"
            min={-0.75}
            max={0.75}
            step={0.02}
            value={probeOffset}
            aria-label="Test input x offset from limit point c"
            onChange={(e) => setProbeOffset(parseFloat(e.target.value))}
            style={{ '--progress': `${probeProgress}%` } as React.CSSProperties}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-500 tabular-nums">
            <span>c - 0.75</span>
            <span>|x - c| = {metrics.dxAbs.toFixed(3)}</span>
            <span>c + 0.75</span>
          </div>
        </div>
      </div>

      {/* Live Numeric Readout Cards (tabular-nums) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
            Target ε-Interval
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-slate-900 tabular-nums sm:text-base">
            ({metrics.yLow.toFixed(2)}, {metrics.yHigh.toFixed(2)})
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-slate-600 tabular-nums">
            L ± ε = {L.toFixed(1)} ± {epsilon.toFixed(2)}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Max Symmetric δ
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-[#176b63] tabular-nums sm:text-base">
            δ = {metrics.delta.toFixed(4)}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-slate-600 tabular-nums">
            min({metrics.deltaLeft.toFixed(3)}, {metrics.deltaRight.toFixed(3)})
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Safe δ-Neighborhood
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-slate-900 tabular-nums sm:text-base">
            ({metrics.cMinusDelta.toFixed(3)}, {metrics.cPlusDelta.toFixed(3)})
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-slate-600 tabular-nums">
            0 &lt; |x - {c}| &lt; {metrics.delta.toFixed(3)}
          </p>
        </div>

        <div
          className={`rounded-xl border p-3 ${
            metrics.insideDelta
              ? 'border-emerald-300 bg-emerald-50/70'
              : metrics.insideEpsilon
              ? 'border-amber-300 bg-amber-50/60'
              : 'border-rose-300 bg-rose-50/60'
          }`}
        >
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
            Probe Status at x = {metrics.probeX.toFixed(2)}
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-slate-900 tabular-nums sm:text-base">
            f(x) = {metrics.probeY.toFixed(3)}
          </p>
          <p className="mt-0.5 font-mono text-[11px] font-semibold tabular-nums">
            {metrics.dxAbs === 0 ? (
              <span className="text-amber-800">At x = c (punctured out)</span>
            ) : metrics.insideDelta ? (
              <span className="text-emerald-800">
                |f(x)-L| = {metrics.dyAbs.toFixed(3)} &lt; ε ✓
              </span>
            ) : (
              <span className="text-rose-800">
                Outside δ-band (|x-c| ≥ δ)
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Interactive SVG Plot */}
      <figure className="rounded-xl border border-slate-200 bg-[#fcfdfe] p-2 sm:p-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-labelledby={svgTitleId}
          aria-describedby={svgDescId}
          className="w-full h-auto select-none"
        >
          <title id={svgTitleId}>
            Epsilon-Delta Limit Graph for {preset.label}
          </title>
          <desc id={svgDescId}>
            Coordinate plot showing the horizontal epsilon band from {metrics.yLow.toFixed(2)} to{' '}
            {metrics.yHigh.toFixed(2)} around L = {L}, and the resulting vertical delta band from{' '}
            {metrics.cMinusDelta.toFixed(3)} to {metrics.cPlusDelta.toFixed(3)} around c = {c}.
          </desc>

          {/* Subtle Plot Background */}
          <rect
            x={pad.left}
            y={pad.top}
            width={plotW}
            height={plotH}
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="1"
          />

          {/* Horizontal Epsilon Band (L - eps, L + eps) */}
          <rect
            x={pad.left}
            y={Math.max(pad.top, svgYHigh)}
            width={plotW}
            height={Math.max(0, Math.min(pad.top + plotH, svgYLow) - Math.max(pad.top, svgYHigh))}
            fill="#bae6fd"
            opacity="0.38"
          />

          {/* Vertical Delta Band (c - delta, c + delta) */}
          <rect
            x={Math.max(pad.left, svgXMinusDelta)}
            y={pad.top}
            width={Math.max(0, Math.min(pad.left + plotW, svgXPlusDelta) - Math.max(pad.left, svgXMinusDelta))}
            height={plotH}
            fill="#a7f3d0"
            opacity="0.42"
          />

          {/* Target Intersection Box [c-delta, c+delta] x [L-eps, L+eps] */}
          <rect
            x={svgXMinusDelta}
            y={svgYHigh}
            width={Math.max(0, svgXPlusDelta - svgXMinusDelta)}
            height={Math.max(0, svgYLow - svgYHigh)}
            fill="#34d399"
            fillOpacity="0.18"
            stroke="#059669"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Epsilon Boundary Lines */}
          <line
            x1={pad.left}
            y1={svgYHigh}
            x2={pad.left + plotW}
            y2={svgYHigh}
            stroke="#0284c7"
            strokeWidth="1.25"
            strokeDasharray="5 4"
          />
          <line
            x1={pad.left}
            y1={svgYLow}
            x2={pad.left + plotW}
            y2={svgYLow}
            stroke="#0284c7"
            strokeWidth="1.25"
            strokeDasharray="5 4"
          />

          {/* Delta Boundary Lines */}
          <line
            x1={svgXMinusDelta}
            y1={pad.top}
            x2={svgXMinusDelta}
            y2={pad.top + plotH}
            stroke="#059669"
            strokeWidth="1.25"
            strokeDasharray="5 4"
          />
          <line
            x1={svgXPlusDelta}
            y1={pad.top}
            x2={svgXPlusDelta}
            y2={pad.top + plotH}
            stroke="#059669"
            strokeWidth="1.25"
            strokeDasharray="5 4"
          />

          {/* Center Limit Guides (c, L) */}
          <line
            x1={pad.left}
            y1={svgL}
            x2={svgC}
            y2={svgL}
            stroke="#475569"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <line
            x1={svgC}
            y1={svgL}
            x2={svgC}
            y2={pad.top + plotH}
            stroke="#475569"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />

          {/* Function Curve f(x) */}
          <path
            d={curvePath}
            fill="none"
            stroke="#1e3a5f"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Probe Guides & Point */}
          <line
            x1={svgProbeX}
            y1={pad.top + plotH}
            x2={svgProbeX}
            y2={svgProbeY}
            stroke={metrics.insideDelta ? '#0f766e' : '#e11d48'}
            strokeWidth="1.75"
            strokeDasharray="3 2"
          />
          <line
            x1={pad.left}
            y1={svgProbeY}
            x2={svgProbeX}
            y2={svgProbeY}
            stroke={metrics.insideDelta ? '#0f766e' : '#e11d48'}
            strokeWidth="1.75"
            strokeDasharray="3 2"
          />
          <circle
            cx={svgProbeX}
            cy={svgProbeY}
            r="5.5"
            fill={metrics.insideDelta ? '#10b981' : '#f43f5e'}
            stroke="#ffffff"
            strokeWidth="2"
          />

          {/* Limit Point (c, L) shown as punctured open circle */}
          <circle
            cx={svgC}
            cy={svgL}
            r="5.5"
            fill="#ffffff"
            stroke="#1e3a5f"
            strokeWidth="2.5"
          />

          {/* Y-Axis Labels */}
          <text
            x={pad.left - 8}
            y={svgYHigh + 4}
            textAnchor="end"
            fontSize="11"
            fontWeight="700"
            fill="#0284c7"
          >
            L+ε ({metrics.yHigh.toFixed(2)})
          </text>
          <text
            x={pad.left - 8}
            y={svgL + 4}
            textAnchor="end"
            fontSize="11.5"
            fontWeight="800"
            fill="#1e3a5f"
          >
            L = {L.toFixed(1)}
          </text>
          <text
            x={pad.left - 8}
            y={svgYLow + 4}
            textAnchor="end"
            fontSize="11"
            fontWeight="700"
            fill="#0284c7"
          >
            L-ε ({metrics.yLow.toFixed(2)})
          </text>

          {/* X-Axis Labels */}
          <text
            x={svgXMinusDelta}
            y={pad.top + plotH + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#047857"
          >
            c-δ ({metrics.cMinusDelta.toFixed(2)})
          </text>
          <text
            x={svgC}
            y={pad.top + plotH + 32}
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="800"
            fill="#1e3a5f"
          >
            c = {c}
          </text>
          <text
            x={svgXPlusDelta}
            y={pad.top + plotH + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#047857"
          >
            c+δ ({metrics.cPlusDelta.toFixed(2)})
          </text>

          {/* In-Plot Callout */}
          <rect
            x={pad.left + 12}
            y={pad.top + 10}
            width="235"
            height="44"
            rx="6"
            fill="#ffffff"
            fillOpacity="0.92"
            stroke="#cbd5e1"
          />
          <text x={pad.left + 22} y={pad.top + 28} fontSize="11" fontWeight="700" fill="#1e3a5f">
            Target Window Guarantee:
          </text>
          <text x={pad.left + 22} y={pad.top + 44} fontSize="11" fill="#334155">
            0 &lt; |x - {c}| &lt; {metrics.delta.toFixed(3)} ⇒ |f(x) - {L}| &lt; {epsilon.toFixed(2)}
          </text>
        </svg>
        <figcaption className="mt-2 px-1 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
          <span>
            <strong>Why asymmetric curves need min(δ₋, δ₊):</strong> Since <InlineMath math="f(x)" /> steepens on the right,{' '}
            <InlineMath math={`\\delta_+ = ${metrics.deltaRight.toFixed(3)}`} /> is smaller than{' '}
            <InlineMath math={`\\delta_- = ${metrics.deltaLeft.toFixed(3)}`} />, so we choose{' '}
            <InlineMath math={`\\delta = \\min(\\delta_-, \\delta_+) = ${metrics.delta.toFixed(4)}`} />.
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
