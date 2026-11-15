import React from 'react';
import type { DiagramId } from '@/lib/content/mids-definitions-data';

interface MidtermDiagramProps {
  id: DiagramId;
}

export function MidtermDiagram({ id }: MidtermDiagramProps) {
  switch (id) {
    case 'vertical-line':
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <svg viewBox="0 0 360 140" className="w-full h-auto" role="img" aria-label="Vertical Line Test: Function passes with 1 hit, Circle fails with 2 hits">
            <title>Vertical Line Test Comparison</title>
            {/* Left panel: Pass */}
            <rect x="6" y="6" width="166" height="128" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="89" y="23" textAnchor="middle" fontSize="10" fontWeight="700" fill="#176b63">PASS: 1 Hit = Function</text>
            <line x1="20" y1="82" x2="158" y2="82" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="89" y1="30" x2="89" y2="126" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M 28 112 Q 89 35 150 58" fill="none" stroke="#1e3a5f" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="112" y1="32" x2="112" y2="124" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="112" cy="58" r="4" fill="#176b63" />

            {/* Right panel: Fail */}
            <rect x="188" y="6" width="166" height="128" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="271" y="23" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">FAIL: 2 Hits = Not a Function</text>
            <line x1="202" y1="80" x2="340" y2="80" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="271" y1="30" x2="271" y2="126" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="271" cy="80" r="34" fill="none" stroke="#1e3a5f" strokeWidth="2.5" />
            <line x1="286" y1="32" x2="286" y2="124" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="286" cy="50" r="4" fill="#dc2626" />
            <circle cx="286" cy="110" r="4" fill="#dc2626" />
          </svg>
        </div>
      );

    case 'even-odd':
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <svg viewBox="0 0 360 150" className="w-full h-auto" role="img" aria-label="Even function y-axis symmetry vs Odd function 180-degree origin symmetry">
            <title>Even vs Odd Function Symmetry</title>
            {/* Left: Even */}
            <rect x="6" y="6" width="166" height="138" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="89" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284c7">EVEN: f(-x) = f(x)</text>
            <text x="89" y="34" textAnchor="middle" fontSize="8.5" fill="#64748b">Mirror across y-axis</text>
            <line x1="20" y1="112" x2="158" y2="112" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="89" y1="40" x2="89" y2="134" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 2" />
            <path d="M 39 50 Q 89 162 139 50" fill="none" stroke="#1e3a5f" strokeWidth="2.5" />
            <line x1="54" y1="74" x2="124" y2="74" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="54" cy="74" r="3.5" fill="#0284c7" />
            <circle cx="124" cy="74" r="3.5" fill="#0284c7" />
            <text x="46" y="68" fontSize="8.5" fill="#0284c7" textAnchor="end">(-x, y)</text>
            <text x="132" y="68" fontSize="8.5" fill="#0284c7" textAnchor="start">(x, y)</text>

            {/* Right: Odd */}
            <rect x="188" y="6" width="166" height="138" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="271" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#176b63">ODD: f(-x) = -f(x)</text>
            <text x="271" y="34" textAnchor="middle" fontSize="8.5" fill="#64748b">180° spin around (0,0)</text>
            <line x1="202" y1="88" x2="340" y2="88" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="271" y1="40" x2="271" y2="134" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M 226 128 C 254 126, 260 90, 271 88 C 282 86, 288 50, 316 48" fill="none" stroke="#1e3a5f" strokeWidth="2.5" />
            <line x1="238" y1="119" x2="304" y2="57" stroke="#176b63" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="238" cy="119" r="3.5" fill="#176b63" />
            <circle cx="304" cy="57" r="3.5" fill="#176b63" />
            <circle cx="271" cy="88" r="2.5" fill="#0f172a" />
            <text x="234" y="135" fontSize="8.5" fill="#176b63">(-x, -y)</text>
            <text x="308" y="54" fontSize="8.5" fill="#176b63">(x, y)</text>
          </svg>
        </div>
      );

    case 'secant-tangent':
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <svg viewBox="0 0 360 140" className="w-full h-auto" role="img" aria-label="Secant line connecting two points approaching the tangent line as h shrinks">
            <title>Secant Line Approaching Tangent Line</title>
            <rect x="6" y="6" width="348" height="128" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <line x1="28" y1="115" x2="335" y2="115" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="45" y1="18" x2="45" y2="122" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M 55 110 Q 175 108 305 26" fill="none" stroke="#1e3a5f" strokeWidth="2.5" />
            {/* Secant */}
            <line x1="90" y1="118" x2="310" y2="32" stroke="#d97706" strokeWidth="1.7" strokeDasharray="5 3" />
            {/* Tangent at x0 */}
            <line x1="75" y1="122" x2="275" y2="62" stroke="#176b63" strokeWidth="2" />
            <circle cx="155" cy="98" r="4" fill="#176b63" />
            <circle cx="265" cy="50" r="4" fill="#d97706" />
            <text x="148" y="88" fontSize="9.5" fontWeight="600" fill="#176b63" textAnchor="end">P(x₀, f(x₀))</text>
            <text x="272" y="45" fontSize="9.5" fontWeight="600" fill="#d97706">Q(x₀+h, f(x₀+h))</text>
            <text x="225" y="100" fontSize="9" fontWeight="700" fill="#176b63">Tangent (h → 0)</text>
            <text x="215" y="62" fontSize="9" fontWeight="700" fill="#d97706">Secant</text>
          </svg>
        </div>
      );

    case 'squeeze':
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <svg viewBox="0 0 360 140" className="w-full h-auto" role="img" aria-label="Sandwich theorem squeezing f(x) between lower g(x) and upper h(x) at (c, L)">
            <title>Sandwich (Squeeze) Theorem</title>
            <rect x="6" y="6" width="348" height="128" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <line x1="28" y1="115" x2="335" y2="115" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="180" y1="20" x2="180" y2="122" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
            {/* Upper h(x) */}
            <path d="M 45 24 Q 180 112 315 24" fill="none" stroke="#0284c7" strokeWidth="2" />
            {/* Lower g(x) */}
            <path d="M 45 112 Q 180 24 315 112" fill="none" stroke="#176b63" strokeWidth="2" />
            {/* Squeezed f(x) */}
            <path d="M 55 48 C 85 95, 105 42, 130 78 C 148 56, 160 76, 180 68 C 200 60, 212 80, 230 58 C 255 94, 275 41, 305 88" fill="none" stroke="#d97706" strokeWidth="2" />
            <circle cx="180" cy="68" r="4.5" fill="#1e3a5f" />
            <text x="186" y="64" fontSize="9.5" fontWeight="700" fill="#1e3a5f">(c, L)</text>
            <text x="58" y="34" fontSize="9.5" fontWeight="700" fill="#0284c7">Upper h(x)</text>
            <text x="58" y="108" fontSize="9.5" fontWeight="700" fill="#176b63">Lower g(x)</text>
            <text x="278" y="74" fontSize="9.5" fontWeight="700" fill="#d97706">f(x)</text>
          </svg>
        </div>
      );

    case 'epsilon-delta':
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <svg viewBox="0 0 360 145" className="w-full h-auto" role="img" aria-label="Epsilon band around L and delta band around c with curve inside target box">
            <title>Epsilon-Delta Target Window</title>
            <rect x="6" y="6" width="348" height="133" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            {/* Shaded epsilon band */}
            <rect x="45" y="48" width="290" height="44" fill="#e0f2fe" opacity="0.6" />
            {/* Shaded delta band */}
            <rect x="148" y="20" width="64" height="102" fill="#d1fae5" opacity="0.55" />
            <line x1="45" y1="122" x2="335" y2="122" stroke="#94a3b8" strokeWidth="1" />
            <line x1="45" y1="20" x2="45" y2="122" stroke="#94a3b8" strokeWidth="1" />
            <line x1="45" y1="70" x2="180" y2="70" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="180" y1="70" x2="180" y2="122" stroke="#176b63" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 65 110 Q 180 72 300 30" fill="none" stroke="#1e3a5f" strokeWidth="2.5" />
            <circle cx="180" cy="70" r="4" fill="#ffffff" stroke="#1e3a5f" strokeWidth="2" />
            <text x="39" y="52" fontSize="8.5" textAnchor="end" fill="#0284c7">L+ε</text>
            <text x="39" y="73" fontSize="9" fontWeight="700" textAnchor="end" fill="#1e3a5f">L</text>
            <text x="39" y="94" fontSize="8.5" textAnchor="end" fill="#0284c7">L-ε</text>
            <text x="148" y="133" fontSize="8.5" textAnchor="middle" fill="#176b63">c-δ</text>
            <text x="180" y="133" fontSize="9" fontWeight="700" textAnchor="middle" fill="#1e3a5f">c</text>
            <text x="212" y="133" fontSize="8.5" textAnchor="middle" fill="#176b63">c+δ</text>
            <text x="285" y="64" fontSize="8.5" fontWeight="600" fill="#0284c7">Target ε-band</text>
          </svg>
        </div>
      );

    case 'discontinuities':
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <svg viewBox="0 0 360 130" className="w-full h-auto" role="img" aria-label="Three types of discontinuities: Removable hole, Jump, and Infinite asymptote">
            <title>Three Types of Discontinuities</title>
            {/* Removable */}
            <rect x="6" y="6" width="110" height="118" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="61" y="22" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0284c7">Removable (Hole)</text>
            <line x1="16" y1="104" x2="106" y2="104" stroke="#cbd5e1" />
            <path d="M 22 92 Q 61 48 100 62" fill="none" stroke="#1e3a5f" strokeWidth="2.2" />
            <circle cx="61" cy="64" r="4" fill="#ffffff" stroke="#dc2626" strokeWidth="2" />
            <circle cx="61" cy="40" r="3" fill="#dc2626" />

            {/* Jump */}
            <rect x="125" y="6" width="110" height="118" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="180" y="22" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#d97706">Jump</text>
            <line x1="135" y1="104" x2="225" y2="104" stroke="#cbd5e1" />
            <path d="M 140 88 L 180 80" fill="none" stroke="#1e3a5f" strokeWidth="2.2" />
            <path d="M 180 48 L 220 40" fill="none" stroke="#1e3a5f" strokeWidth="2.2" />
            <circle cx="180" cy="80" r="3.5" fill="#1e3a5f" />
            <circle cx="180" cy="48" r="3.5" fill="#ffffff" stroke="#dc2626" strokeWidth="2" />

            {/* Infinite */}
            <rect x="244" y="6" width="110" height="118" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="299" y="22" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#b91c1c">Infinite (Asymptote)</text>
            <line x1="254" y1="104" x2="344" y2="104" stroke="#cbd5e1" />
            <line x1="299" y1="30" x2="299" y2="114" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M 258 92 Q 292 86 295 34" fill="none" stroke="#1e3a5f" strokeWidth="2.2" />
            <path d="M 303 34 Q 306 86 340 92" fill="none" stroke="#1e3a5f" strokeWidth="2.2" />
          </svg>
        </div>
      );

    case 'ivt':
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <svg viewBox="0 0 360 140" className="w-full h-auto" role="img" aria-label="Intermediate Value Theorem: continuous curve from f(a) to f(b) crossing y0 at c">
            <title>Intermediate Value Theorem</title>
            <rect x="6" y="6" width="348" height="128" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <line x1="45" y1="115" x2="335" y2="115" stroke="#cbd5e1" />
            <line x1="45" y1="20" x2="45" y2="120" stroke="#cbd5e1" />
            <line x1="45" y1="68" x2="320" y2="68" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M 85 100 C 130 96, 155 44, 210 68 C 245 84, 265 40, 290 34" fill="none" stroke="#1e3a5f" strokeWidth="2.5" />
            <line x1="85" y1="100" x2="85" y2="115" stroke="#94a3b8" strokeDasharray="2 2" />
            <line x1="184" y1="68" x2="184" y2="115" stroke="#176b63" strokeDasharray="3 2" />
            <line x1="290" y1="34" x2="290" y2="115" stroke="#94a3b8" strokeDasharray="2 2" />
            <circle cx="85" cy="100" r="3.5" fill="#1e3a5f" />
            <circle cx="184" cy="68" r="4.5" fill="#176b63" />
            <circle cx="290" cy="34" r="3.5" fill="#1e3a5f" />
            <text x="38" y="71" fontSize="9.5" fontWeight="700" textAnchor="end" fill="#d97706">y₀</text>
            <text x="85" y="126" fontSize="9" textAnchor="middle" fill="#475569">a</text>
            <text x="184" y="126" fontSize="9.5" fontWeight="700" textAnchor="middle" fill="#176b63">c</text>
            <text x="290" y="126" fontSize="9" textAnchor="middle" fill="#475569">b</text>
            <text x="192" y="58" fontSize="9" fontWeight="700" fill="#176b63">f(c) = y₀</text>
          </svg>
        </div>
      );

    case 'derivative-failures':
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <svg viewBox="0 0 360 130" className="w-full h-auto" role="img" aria-label="Where derivative fails: Corner, Cusp, and Vertical Tangent">
            <title>Where Derivatives Fail to Exist</title>
            {/* Corner */}
            <rect x="6" y="6" width="110" height="118" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="61" y="22" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#b91c1c">Corner |x|</text>
            <line x1="16" y1="98" x2="106" y2="98" stroke="#cbd5e1" />
            <polyline points="24,42 61,98 98,42" fill="none" stroke="#1e3a5f" strokeWidth="2.4" />
            <circle cx="61" cy="98" r="3.5" fill="#dc2626" />

            {/* Cusp */}
            <rect x="125" y="6" width="110" height="118" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="180" y="22" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#d97706">Cusp x^(2/3)</text>
            <line x1="135" y1="98" x2="225" y2="98" stroke="#cbd5e1" />
            <path d="M 142 52 Q 178 66 180 98 Q 182 66 218 52" fill="none" stroke="#1e3a5f" strokeWidth="2.4" />
            <circle cx="180" cy="98" r="3.5" fill="#d97706" />

            {/* Vertical Tangent */}
            <rect x="244" y="6" width="110" height="118" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="299" y="22" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0284c7">Vertical Tan x^(1/3)</text>
            <line x1="254" y1="74" x2="344" y2="74" stroke="#cbd5e1" />
            <line x1="299" y1="32" x2="299" y2="114" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M 258 100 C 292 98, 297 86, 299 74 C 301 62, 306 50, 340 48" fill="none" stroke="#1e3a5f" strokeWidth="2.4" />
            <circle cx="299" cy="74" r="3.5" fill="#0284c7" />
          </svg>
        </div>
      );

    case 'linearization':
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <svg viewBox="0 0 360 145" className="w-full h-auto" role="img" aria-label="Linearization tangent line L(x) showing dx, dy on the tangent, and delta-y on the curve">
            <title>Linearization L(x) vs Exact Curve f(x)</title>
            <rect x="6" y="6" width="348" height="133" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <line x1="35" y1="120" x2="335" y2="120" stroke="#cbd5e1" />
            <line x1="35" y1="18" x2="35" y2="122" stroke="#cbd5e1" />
            {/* Curve */}
            <path d="M 55 112 Q 165 92 295 24" fill="none" stroke="#1e3a5f" strokeWidth="2.5" />
            {/* Tangent at x=145 */}
            <line x1="65" y1="118" x2="305" y2="54" stroke="#176b63" strokeWidth="2" />
            {/* dx bracket */}
            <line x1="145" y1="97" x2="265" y2="97" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 2" />
            {/* dy vs delta y */}
            <line x1="265" y1="97" x2="265" y2="65" stroke="#176b63" strokeWidth="2.2" />
            <line x1="272" y1="97" x2="272" y2="42" stroke="#d97706" strokeWidth="2.2" />
            <circle cx="145" cy="97" r="4" fill="#176b63" />
            <circle cx="265" cy="65" r="3.5" fill="#176b63" />
            <circle cx="265" cy="42" r="3.5" fill="#d97706" />
            <text x="145" y="131" fontSize="9" fontWeight="700" textAnchor="middle" fill="#1e3a5f">a</text>
            <text x="265" y="131" fontSize="9" fontWeight="700" textAnchor="middle" fill="#1e3a5f">a + dx</text>
            <text x="205" y="110" fontSize="9" textAnchor="middle" fill="#475569">dx = Δx</text>
            <text x="258" y="83" fontSize="9" fontWeight="700" textAnchor="end" fill="#176b63">dy</text>
            <text x="280" y="68" fontSize="9" fontWeight="700" fill="#d97706">Δy</text>
            <text x="285" y="28" fontSize="9" fontWeight="700" fill="#1e3a5f">f(x)</text>
            <text x="308" y="57" fontSize="9" fontWeight="700" fill="#176b63">L(x)</text>
          </svg>
        </div>
      );
  }
}
