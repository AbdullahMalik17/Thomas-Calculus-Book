'use client';

import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

// Function f(x) = 0.25 * x^2 + 0.5 for the interactive secant-to-tangent micro-artifact
function fCurve(x: number): number {
  return 0.25 * x * x + 0.5;
}

export function SecantTangentExplorer() {
  const [deltaX, setDeltaX] = useState<number>(1.15);

  // Base point x0 = 1.2
  const x0 = 1.2;
  const y0 = fCurve(x0);
  const x1 = x0 + deltaX;
  const y1 = fCurve(x1);
  const secantSlope = (y1 - y0) / deltaX;
  const exactSlope = 0.5 * x0; // f'(x) = 0.5x => 0.6000
  const slopeError = Math.abs(secantSlope - exactSlope);

  // SVG coordinate mapping: x in [0, 3.8] -> [44, 412], y in [0, 4.2] -> [206, 22]
  const toSvgX = (x: number) => 44 + (x / 3.8) * 368;
  const toSvgY = (y: number) => 206 - (y / 4.2) * 184;

  const px0 = toSvgX(x0);
  const py0 = toSvgY(y0);
  const px1 = toSvgX(x1);
  const py1 = toSvgY(y1);

  // Secant line extended across x in [0.2, 3.6]
  const secXStart = 0.2;
  const secYStart = y0 + secantSlope * (secXStart - x0);
  const secXEnd = 3.6;
  const secYEnd = y0 + secantSlope * (secXEnd - x0);

  // Exact tangent line at x0 across x in [0.2, 3.6]
  const tanYStart = y0 + exactSlope * (secXStart - x0);
  const tanYEnd = y0 + exactSlope * (secXEnd - x0);

  // Smooth curve path points
  const curvePoints: string[] = [];
  for (let i = 0; i <= 38; i++) {
    const xv = i * 0.1;
    const yv = fCurve(xv);
    curvePoints.push(`${i === 0 ? 'M' : 'L'} ${toSvgX(xv).toFixed(1)} ${toSvgY(yv).toFixed(1)}`);
  }
  const curvePath = curvePoints.join(' ');

  return (
    <article className="surface-grain w-full flex flex-col justify-between rounded-2xl border border-specular bg-surface-1 p-5 shadow-sm sm:p-7">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-brand-accent" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-accent">
              Interactive Micro-Artifact · Secant to Tangent Limit
            </span>
          </div>
          <span className="rounded border border-specular bg-surface-2 px-2 py-0.5 font-mono text-xs font-semibold text-ink-primary tabular-nums">
            Δx = {deltaX.toFixed(2)}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-reading text-xl font-bold tracking-display text-ink-primary">
            Difference Quotient &amp; Instantaneous Slope Explorer
          </h3>
          <p className="max-w-[65ch] text-sm text-ink-secondary">
            Drag the step size <span className="font-mono tabular-nums">Δx</span> toward zero to observe the secant line
            through <span className="font-mono tabular-nums">P(x₀, f(x₀))</span> and{' '}
            <span className="font-mono tabular-nums">Q(x₀ + Δx, f(x₀ + Δx))</span> converge to the tangent slope.
          </p>
        </div>

        {/* Live SVG Calculus Graphic */}
        <div className="rounded-xl border border-specular bg-surface-2 p-3">
          <svg
            role="img"
            aria-label="Interactive secant-to-tangent slope and difference quotient graph"
            viewBox="0 0 440 230"
            className="h-auto w-full select-none overflow-visible"
          >
            <title>Secant to tangent convergence on f(x) = 0.25x² + 0.5</title>
            {/* Swiss Coordinate Grid */}
            {[1, 2, 3].map((gx) => (
              <line
                key={`vx-${gx}`}
                x1={toSvgX(gx)}
                y1={20}
                x2={toSvgX(gx)}
                y2={206}
                stroke="var(--border-hairline)"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
            ))}
            {[1, 2, 3, 4].map((gy) => (
              <line
                key={`hy-${gy}`}
                x1={44}
                y1={toSvgY(gy)}
                x2={412}
                y2={toSvgY(gy)}
                stroke="var(--border-hairline)"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
            ))}

            {/* Axes */}
            <line x1={44} y1={206} x2={416} y2={206} stroke="var(--text-secondary)" strokeWidth="1.25" />
            <line x1={44} y1={18} x2={44} y2={206} stroke="var(--text-secondary)" strokeWidth="1.25" />

            {/* Rise / Run Right Triangle */}
            <line
              x1={px0}
              y1={py0}
              x2={px1}
              y2={py0}
              stroke="var(--callout-example-border)"
              strokeDasharray="4 2"
              strokeWidth="1.5"
            />
            <line
              x1={px1}
              y1={py0}
              x2={px1}
              y2={py1}
              stroke="var(--callout-example-border)"
              strokeDasharray="4 2"
              strokeWidth="1.5"
            />

            {/* Exact Tangent Line (Dashed Accent) */}
            <line
              x1={toSvgX(secXStart)}
              y1={toSvgY(tanYStart)}
              x2={toSvgX(secXEnd)}
              y2={toSvgY(tanYEnd)}
              stroke="var(--color-accent)"
              strokeDasharray="5 4"
              strokeWidth="1.75"
            />

            {/* Function Curve f(x) */}
            <path d={curvePath} fill="none" stroke="var(--text-primary)" strokeWidth="2.5" />

            {/* Live Secant Line */}
            <line
              x1={toSvgX(secXStart)}
              y1={toSvgY(secYStart)}
              x2={toSvgX(secXEnd)}
              y2={toSvgY(secYEnd)}
              stroke="var(--color-primary)"
              strokeWidth="2.25"
            />

            {/* Points P and Q */}
            <circle cx={px0} cy={py0} r="4.5" fill="var(--color-accent)" stroke="var(--surface-1)" strokeWidth="1.5" />
            <circle cx={px1} cy={py1} r="4.5" fill="var(--color-primary)" stroke="var(--surface-1)" strokeWidth="1.5" />

            {/* Axis & Point Annotations */}
            <text
              x={px0 - 8}
              y={py0 - 10}
              fontSize="11"
              fontWeight="700"
              fill="var(--text-primary)"
              fontFamily="monospace"
            >
              P(x₀)
            </text>
            <text
              x={px1 + 6}
              y={py1 - 8}
              fontSize="11"
              fontWeight="700"
              fill="var(--color-primary)"
              fontFamily="monospace"
            >
              Q(x₀+Δx)
            </text>
            <text
              x={(px0 + px1) / 2 - 10}
              y={py0 + 14}
              fontSize="10"
              fontWeight="600"
              fill="var(--callout-example-ink)"
              fontFamily="monospace"
            >
              Δx={deltaX.toFixed(2)}
            </text>
            <text x={402} y={220} fontSize="10" fill="var(--text-muted)" fontFamily="monospace">
              x
            </text>
            <text x={24} y={28} fontSize="10" fill="var(--text-muted)" fontFamily="monospace">
              f(x)
            </text>
          </svg>
        </div>
      </div>

      {/* Interactive Slider Control + Tabular-Nums Readout Bar */}
      <div className="mt-4 space-y-3 border-t border-hairline pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="delta-x-slider" className="text-xs font-semibold text-ink-primary">
            Adjust interval width <span className="font-mono tabular-nums">Δx</span>:
          </label>
          <div className="flex items-center gap-1.5">
            {[1.5, 0.75, 0.25, 0.05].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setDeltaX(preset)}
                className={`cursor-pointer rounded border px-2 py-1 font-mono text-xs font-semibold tabular-nums transition-colors ${
                  Math.abs(deltaX - preset) < 0.01
                    ? 'border-brand-primary bg-brand-primary text-ink-inverse'
                    : 'border-hairline bg-surface-2 text-ink-secondary hover:bg-surface-1'
                }`}
              >
                {preset.toFixed(2)}
              </button>
            ))}
          </div>
        </div>

        <input
          id="delta-x-slider"
          type="range"
          min="0.05"
          max="2.00"
          step="0.05"
          value={deltaX}
          onChange={(e) => setDeltaX(parseFloat(e.target.value))}
          className="w-full cursor-pointer accent-brand-accent"
        />

        <div className="grid grid-cols-3 gap-2 rounded-xl border border-hairline bg-surface-2 p-3 font-mono text-xs tabular-nums">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-ink-muted">Secant Slope</span>
            <strong className="text-sm font-bold text-brand-primary">{secantSlope.toFixed(4)}</strong>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-ink-muted">Tangent f&apos;(x₀)</span>
            <strong className="text-sm font-bold text-brand-accent">{exactSlope.toFixed(4)}</strong>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-ink-muted">|Error|</span>
            <strong className="text-sm font-bold text-ink-primary">{slopeError.toFixed(4)}</strong>
          </div>
        </div>
      </div>
    </article>
  );
}
