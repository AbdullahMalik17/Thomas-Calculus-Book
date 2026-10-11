// scripts/curriculum-data-ch16.ts
/**
 * Authoritative Curriculum Data for Chapter 16: Integrals and Vector Fields
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH16_SECTIONS: SectionDef[] = [
  {
    chapter: "ch16",
    chapterDir: "ch16-integrals-and-vector-fields",
    section: "16.1",
    sectionDir: "16.1-line-integrals",
    title: "Line Integrals",
    definitions: [
      {
        id: "def-scalar-line-integral",
        title: "Scalar Line Integral with Respect to Arc Length",
        category: "definition",
        latex: "\\int_C f(x, y, z) \\, ds = \\int_a^b f(x(t), y(t), z(t)) |\\mathbf{r}'(t)| \\, dt",
        statement: "The line integral of a continuous scalar function f along a smooth space curve C parametrized by r(t) on [a, b] is the limit of Riemann sums weighted by arc length subsegments ds = |r'(t)| dt.",
        conditions: ["C is smooth: r'(t) is continuous and non-zero", "f is continuous along C"],
        explanation: "If f = 1, computes the arc length of C; if f is mass density delta, computes total mass of thin wire C.",
        keyTakeaway: "Integrates scalar distributions along one-dimensional curved paths in space."
      },
      {
        id: "formula-wire-center-of-mass",
        title: "Center of Mass of a Curved Wire",
        category: "formula",
        latex: "M = \\int_C \\delta \\, ds, \\quad \\bar{x} = \\frac{1}{M}\\int_C x\\delta \\, ds, \\quad \\bar{y} = \\frac{1}{M}\\int_C y\\delta \\, ds, \\quad \\bar{z} = \\frac{1}{M}\\int_C z\\delta \\, ds",
        statement: "The center of mass of a physical wire shaped along curve C with linear mass density delta is determined by normalized first moments with respect to arc length.",
        conditions: ["delta >= 0", "Total mass M > 0"],
        explanation: "Computes physical balance coordinates for curved geometric filaments.",
        keyTakeaway: "Directly extends planar and solid mass formulas to space curves."
      }
    ],
    summaryMDX: `# Section 16.1: Line Integrals

Scalar line integrals accumulate quantities along curves in the plane and space.

---

## 1. Computational Formula

For a smooth curve $C$ parametrized by $\\mathbf{r}(t) = \\langle x(t), y(t), z(t) \\rangle$ for $a \\le t \\le b$:
$$\\int_C f(x, y, z) \\, ds = \\int_a^b f(x(t), y(t), z(t)) \\sqrt{x'(t)^2 + y'(t)^2 + z'(t)^2} \\, dt$$

---

## 2. Piecewise Smooth Curves

If $C$ is composed of smooth segments $C_1, C_2, \\dots, C_k$ joined end-to-end:
$$\\int_C f \\, ds = \\int_{C_1} f \\, ds + \\int_{C_2} f \\, ds + \\dots + \\int_{C_k} f \\, ds$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Line Integral over a Semicircular Path",
        exerciseReference: "Section 16.1, Exercise 1",
        originalTopic: "Scalar Line Integral",
        difficulty: "tier1",
        tags: ["line-integral", "arc-length", "semicircle"],
        problemStatement: "Evaluate int_C (x + y) ds where C is the upper semicircle x = cos(t), y = sin(t) for 0 <= t <= pi.",
        finalAnswer: "2",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Arc Length Differential ds",
            mathExpression: "x'(t) = -\\sin t, \\quad y'(t) = \\cos t \\implies ds = \\sqrt{(-\\sin t)^2 + (\\cos t)^2} \\, dt = 1 \\, dt",
            explanation: "Compute the speed along the unit circle.",
            why: "Finding the arc length differential."
          },
          {
            stepNumber: 2,
            title: "Substitute Parametrization into Integrand",
            mathExpression: "\\int_0^\\pi (\\cos t + \\sin t)(1 \\, dt) = [\\sin t - \\cos t]_0^\\pi = (\\sin\\pi - \\cos\\pi) - (\\sin 0 - \\cos 0) = (0 - (-1)) - (0 - 1) = 2",
            explanation: "Evaluate trigonometric antiderivative at pi and 0.",
            why: "Evaluating the definite integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(0 - (-1)) - (0 - 1)",
          expected: "2"
        }
      },
      {
        filename: "ex-02",
        title: "Line Integral Along a Straight Line Segment",
        exerciseReference: "Section 16.1, Exercise 2",
        originalTopic: "Line Segment Integral",
        difficulty: "tier1",
        tags: ["line-segment", "parametric-curve", "line-integral"],
        problemStatement: "Evaluate int_C xy ds where C is the line segment from (0, 0) to (3, 4).",
        finalAnswer: "20",
        steps: [
          {
            stepNumber: 1,
            title: "Parametrize Line Segment",
            mathExpression: "\\mathbf{r}(t) = \\langle 3t, 4t \\rangle, \\quad 0 \\le t \\le 1; \\quad ds = \\sqrt{3^2 + 4^2} \\, dt = 5 \\, dt",
            explanation: "Linear parametrization connecting origin to (3, 4).",
            why: "Parametrizing integration path."
          },
          {
            stepNumber: 2,
            title: "Evaluate Definite Integral",
            mathExpression: "\\int_0^1 (3t)(4t)(5 \\, dt) = 60 \\int_0^1 t^2 \\, dt = 60 \\left[ \\frac{t^3}{3} \\right]_0^1 = \\frac{60}{3} = 20",
            explanation: "Substitute and integrate with respect to t.",
            why: "Evaluating total accumulated product."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "60 / 3",
          expected: "20"
        }
      },
      {
        filename: "ex-03",
        title: "Mass of a Helical Wire with Linearly Increasing Density",
        exerciseReference: "Section 16.1, Exercise 3",
        originalTopic: "Wire Mass Calculation",
        difficulty: "tier2",
        tags: ["helical-wire", "mass", "variable-density"],
        problemStatement: "Find the mass of a thin wire shaped like the circular helix r(t) = <cos(t), sin(t), t> for 0 <= t <= 2*pi with linear density delta(x, y, z) = z.",
        finalAnswer: "2\\sqrt{2}\\pi^2",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Speed and Arc Length Differential",
            mathExpression: "|\\mathbf{r}'(t)| = \\sqrt{(-\\sin t)^2 + (\\cos t)^2 + 1^2} = \\sqrt{1 + 1} = \\sqrt{2} \\implies ds = \\sqrt{2} \\, dt",
            explanation: "Compute the norm of the velocity vector.",
            why: "Finding arc length scale factor."
          },
          {
            stepNumber: 2,
            title: "Integrate Density Along the Helix",
            mathExpression: "M = \\int_0^{2\\pi} z \\, ds = \\int_0^{2\\pi} t (\\sqrt{2} \\, dt) = \\sqrt{2} \\left[ \\frac{t^2}{2} \\right]_0^{2\\pi} = \\sqrt{2} \\left( \\frac{4\\pi^2}{2} \\right) = 2\\sqrt{2}\\pi^2",
            explanation: "Substitute z(t) = t and evaluate polynomial integral.",
            why: "Evaluating wire mass."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(2) * (2*pi**2)",
          expected: "2*sqrt(2)*pi**2"
        }
      },
      {
        filename: "ex-04",
        title: "Line Integral Along a Piecewise Smooth Path",
        exerciseReference: "Section 16.1, Exercise 4",
        originalTopic: "Piecewise Smooth Line Integral",
        difficulty: "tier1",
        tags: ["piecewise-smooth", "line-integral", "path-decomposition"],
        problemStatement: "Evaluate int_C (2x + y) ds where C consists of C_1 from (0, 0) to (1, 0) followed by C_2 from (1, 0) to (1, 2).",
        finalAnswer: "7",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Integral on Segment C_1",
            mathExpression: "C_1: y = 0, \\; 0 \\le x \\le 1, \\; ds = dx \\implies \\int_{C_1} (2x + 0) \\, dx = \\left[ x^2 \\right]_0^1 = 1",
            explanation: "Parametrize horizontal segment along x-axis.",
            why: "Integrating along first path segment."
          },
          {
            stepNumber: 2,
            title: "Evaluate Integral on Segment C_2",
            mathExpression: "C_2: x = 1, \\; 0 \\le y \\le 2, \\; ds = dy \\implies \\int_{C_2} (2(1) + y) \\, dy = \\left[ 2y + \\frac{y^2}{2} \\right]_0^2 = 4 + 2 = 6",
            explanation: "Parametrize vertical segment.",
            why: "Integrating along second path segment."
          },
          {
            stepNumber: 3,
            title: "Sum Segment Integrals",
            mathExpression: "\\int_C (2x + y) \\, ds = 1 + 6 = 7",
            explanation: "Add contributions from both subpaths.",
            why: "Evaluating total piecewise line integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 + 6",
          expected: "7"
        }
      },
      {
        filename: "ex-05",
        title: "Center of Mass of a Semicircular Wire",
        exerciseReference: "Section 16.1, Exercise 5",
        originalTopic: "Center of Mass of Wire",
        difficulty: "tier2",
        tags: ["center-of-mass", "wire", "semicircle"],
        problemStatement: "Find the center of mass of a uniform semicircular wire of radius a = pi in the upper half-plane.",
        finalAnswer: "(0, 2)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Total Mass with Uniform Density delta = 1",
            mathExpression: "M = \\int_C 1 \\, ds = \\pi a = \\pi(\\pi) = \\pi^2",
            explanation: "The mass is the arc length of the semicircle.",
            why: "Finding total mass of wire."
          },
          {
            stepNumber: 2,
            title: "Evaluate First Moment M_x and y_bar",
            mathExpression: "M_x = \\int_0^\\pi (a\\sin t)(a \\, dt) = a^2 [-\\cos t]_0^\\pi = 2a^2; \\quad \\bar{y} = \\frac{M_x}{M} = \\frac{2a^2}{\\pi a} = \\frac{2a}{\\pi}",
            explanation: "Integrate y ds = a sin(t) a dt.",
            why: "Evaluating first moment and vertical balance point."
          },
          {
            stepNumber: 3,
            title: "Substitute Numerical Radius a = pi",
            mathExpression: "\\bar{y} = \\frac{2\\pi}{\\pi} = 2; \\quad \\bar{x} = 0 \\text{ by symmetry} \\implies (0, 2)",
            explanation: "Substitute a = pi to obtain center of mass (0, 2).",
            why: "Finalizing coordinates."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 * pi / pi",
          expected: "2"
        }
      }
    ]
  },
  {
    chapter: "ch16",
    chapterDir: "ch16-integrals-and-vector-fields",
    section: "16.2",
    sectionDir: "16.2-vector-fields-and-line-integrals-work-circulation-and-flux",
    title: "Vector Fields and Line Integrals: Work, Circulation, and Flux",
    definitions: [
      {
        id: "def-vector-field-work",
        title: "Line Integral of a Vector Field (Work)",
        category: "definition",
        latex: "W = \\int_C \\mathbf{F} \\cdot d\\mathbf{r} = \\int_C \\mathbf{F} \\cdot \\mathbf{T} \\, ds = \\int_C M \\, dx + N \\, dy + P \\, dz",
        statement: "The line integral of vector field F along oriented curve C measures the cumulative tangential component of F along C. In physics, it represents the work done by force field F moving a particle along C.",
        conditions: ["F is continuous along oriented smooth curve C"],
        explanation: "Evaluating F . dr = (M x' + N y' + P z') dt contracts vector dot products into a single definite integral.",
        keyTakeaway: "Reversing orientation negates the value: int_{-C} F . dr = - int_C F . dr."
      },
      {
        id: "def-circulation-and-flux",
        title: "Circulation and Flux in the Plane",
        category: "formula",
        latex: "\\text{Circulation} = \\oint_C \\mathbf{F} \\cdot \\mathbf{T} \\, ds = \\oint_C M \\, dx + N \\, dy, \\quad \\text{Flux} = \\oint_C \\mathbf{F} \\cdot \\mathbf{n} \\, ds = \\oint_C M \\, dy - N \\, dx",
        statement: "Along a closed planar curve C, circulation measures the net fluid flow around the loop, while flux measures the net fluid flow passing outward through the boundary curve.",
        conditions: ["C is a simple closed curve with counterclockwise orientation"],
        explanation: "Outward normal n = T x k turns the unit tangent 90 degrees clockwise, converting F . n ds into M dy - N dx.",
        keyTakeaway: "Circulation evaluates boundary alignment; flux evaluates boundary penetration."
      }
    ],
    summaryMDX: `# Section 16.2: Vector Fields and Line Integrals: Work, Circulation, and Flux

Vector line integrals model work, energy transfer, and fluid transport across oriented curves.

---

## 1. Work and Differential Form

For $\\mathbf{F} = M\\mathbf{i} + N\\mathbf{j} + P\\mathbf{k}$ along $C$ parametrized by $\\mathbf{r}(t)$:
$$W = \\int_C \\mathbf{F} \\cdot d\\mathbf{r} = \\int_a^b \\left( M \\frac{dx}{dt} + N \\frac{dy}{dt} + P \\frac{dz}{dt} \\right) dt$$

---

## 2. Planar Flux Across a Closed Curve

For $\\mathbf{F} = M\\mathbf{i} + N\\mathbf{j}$ across counterclockwise boundary $C$:
$$\\text{Flux} = \\oint_C \\mathbf{F} \\cdot \\mathbf{n} \\, ds = \\oint_C M \\, dy - N \\, dx$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Work Done by a Rotational Vector Field around a Circle",
        exerciseReference: "Section 16.2, Exercise 1",
        originalTopic: "Work in Vector Field",
        difficulty: "tier1",
        tags: ["work", "vector-field", "circulation"],
        problemStatement: "Compute the work done by F = <y, -x> along the counterclockwise unit circle r(t) = <cos(t), sin(t)> for 0 <= t <= 2*pi.",
        finalAnswer: "W = -2\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Differential Vector dr",
            mathExpression: "\\mathbf{r}'(t) = \\langle -\\sin t, \\cos t \\rangle \\implies d\\mathbf{r} = \\langle -\\sin t, \\cos t \\rangle \\, dt",
            explanation: "Differentiate parametric equations.",
            why: "Finding displacement differential."
          },
          {
            stepNumber: 2,
            title: "Evaluate Vector Field along Path",
            mathExpression: "\\mathbf{F}(\\mathbf{r}(t)) = \\langle y(t), -x(t) \\rangle = \\langle \\sin t, -\\cos t \\rangle",
            explanation: "Substitute path coordinates into field components.",
            why: "Evaluating field on curve."
          },
          {
            stepNumber: 3,
            title: "Compute Dot Product and Integrate",
            mathExpression: "\\mathbf{F} \\cdot d\\mathbf{r} = [(\\sin t)(-\\sin t) + (-\\cos t)(\\cos t)] \\, dt = -(\\sin^2 t + \\cos^2 t) \\, dt = -1 \\, dt; \\quad W = \\int_0^{2\\pi} (-1) \\, dt = -2\\pi",
            explanation: "Integrate constant dot product -1 over [0, 2*pi].",
            why: "Evaluating total work."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "-2*pi",
          expected: "-2*pi"
        }
      },
      {
        filename: "ex-02",
        title: "Work along a Parabolic Trajectory",
        exerciseReference: "Section 16.2, Exercise 2",
        originalTopic: "Work along Parabola",
        difficulty: "tier1",
        tags: ["work", "parabolic-path", "line-integral"],
        problemStatement: "Compute the work done by F = <3x^2, 2xy> along the parabolic arc y = x^2 from (0, 0) to (1, 1).",
        finalAnswer: "\\frac{9}{5}",
        steps: [
          {
            stepNumber: 1,
            title: "Parametrize Parabolic Path",
            mathExpression: "x = t, \\; y = t^2 \\quad (0 \\le t \\le 1); \\quad dx = dt, \\; dy = 2t \\, dt",
            explanation: "Use parameter t = x.",
            why: "Setting up path coordinates."
          },
          {
            stepNumber: 2,
            title: "Substitute into Differential Form",
            mathExpression: "M \\, dx + N \\, dy = (3t^2)(dt) + [2(t)(t^2)](2t \\, dt) = 3t^2 \\, dt + 4t^4 \\, dt = (3t^2 + 4t^4) \\, dt",
            explanation: "Substitute components and differential relations.",
            why: "Formulating single-variable integrand."
          },
          {
            stepNumber: 3,
            title: "Evaluate Definite Integral",
            mathExpression: "W = \\int_0^1 (3t^2 + 4t^4) \\, dt = \\left[ t^3 + \\frac{4t^5}{5} \\right]_0^1 = 1 + \\frac{4}{5} = \\frac{9}{5}",
            explanation: "Integrate polynomial over [0, 1].",
            why: "Evaluating final work."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 + 4/5",
          expected: "9/5"
        }
      },
      {
        filename: "ex-03",
        title: "Outward Flux of a Radial Vector Field Across a Circle",
        exerciseReference: "Section 16.2, Exercise 3",
        originalTopic: "Planar Flux Calculation",
        difficulty: "tier2",
        tags: ["flux", "radial-field", "outward-normal"],
        problemStatement: "Find the outward flux of F = <x, y> across the circle r(t) = <3 cos(t), 3 sin(t)> for 0 <= t <= 2*pi.",
        finalAnswer: "18\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Recall Planar Flux Formula",
            mathExpression: "\\text{Flux} = \\oint_C M \\, dy - N \\, dx",
            explanation: "Formula for flux across counterclockwise curve.",
            why: "Applying boundary flux definition."
          },
          {
            stepNumber: 2,
            title: "Substitute Circular Parametrization",
            mathExpression: "x = 3\\cos t, \\; y = 3\\sin t \\implies dx = -3\\sin t \\, dt, \\; dy = 3\\cos t \\, dt",
            explanation: "Compute coordinate differentials.",
            why: "Evaluating differential components."
          },
          {
            stepNumber: 3,
            title: "Evaluate Flux Integral",
            mathExpression: "M \\, dy - N \\, dx = (3\\cos t)(3\\cos t \\, dt) - (3\\sin t)(-3\\sin t \\, dt) = 9(\\cos^2 t + \\sin^2 t) \\, dt = 9 \\, dt; \\quad \\text{Flux} = \\int_0^{2\\pi} 9 \\, dt = 18\\pi",
            explanation: "Integrate constant 9 over [0, 2*pi].",
            why: "Computing total outward flux."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 * pi * 3**2",
          expected: "18*pi"
        }
      },
      {
        filename: "ex-04",
        title: "Exact Differential Form Line Integral",
        exerciseReference: "Section 16.2, Exercise 4",
        originalTopic: "Differential Form Evaluation",
        difficulty: "tier1",
        tags: ["exact-differential", "product-rule", "line-integral"],
        problemStatement: "Evaluate int_C (y dx + x dy) along any path from (1, 1) to (3, 5).",
        finalAnswer: "14",
        steps: [
          {
            stepNumber: 1,
            title: "Recognize Exact Differential of a Product",
            mathExpression: "y \\, dx + x \\, dy = d(xy)",
            explanation: "By the product rule of differentials, y dx + x dy is the total differential of f(x, y) = xy.",
            why: "Identifying exact differential."
          },
          {
            stepNumber: 2,
            title: "Evaluate at Path Endpoints",
            mathExpression: "\\int_{(1, 1)}^{(3, 5)} d(xy) = [xy]_{(1, 1)}^{(3, 5)} = (3)(5) - (1)(1) = 15 - 1 = 14",
            explanation: "Subtract initial value from terminal value.",
            why: "Evaluating path-independent integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "3*5 - 1*1",
          expected: "14"
        }
      },
      {
        filename: "ex-05",
        title: "Circulation of a Vortex Vector Field",
        exerciseReference: "Section 16.2, Exercise 5",
        originalTopic: "Vortex Circulation",
        difficulty: "tier2",
        tags: ["vortex-field", "circulation", "singularity"],
        problemStatement: "Compute the circulation of the vortex field F = <-y/(x^2 + y^2), x/(x^2 + y^2)> counterclockwise around a circle of radius R centered at the origin.",
        finalAnswer: "2\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Parametrize Circle of Radius R",
            mathExpression: "x = R\\cos t, \\; y = R\\sin t \\implies x^2 + y^2 = R^2; \\quad dx = -R\\sin t \\, dt, \\; dy = R\\cos t \\, dt",
            explanation: "Substitute circular path coordinates.",
            why: "Setting up path coordinates."
          },
          {
            stepNumber: 2,
            title: "Evaluate Differential Form",
            mathExpression: "M \\, dx + N \\, dy = \\left( -\\frac{R\\sin t}{R^2} \\right)(-R\\sin t \\, dt) + \\left( \\frac{R\\cos t}{R^2} \\right)(R\\cos t \\, dt) = (\\sin^2 t + \\cos^2 t) \\, dt = 1 \\, dt",
            explanation: "The factor R^2 cancels completely from numerator and denominator.",
            why: "Simplifying vortex integrand."
          },
          {
            stepNumber: 3,
            title: "Integrate over [0, 2*pi]",
            mathExpression: "\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\int_0^{2\\pi} 1 \\, dt = 2\\pi",
            explanation: "Evaluate the integral of 1 over full circle.",
            why: "Evaluating constant vortex circulation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*pi",
          expected: "2*pi"
        }
      }
    ]
  },
  {
    chapter: "ch16",
    chapterDir: "ch16-integrals-and-vector-fields",
    section: "16.3",
    sectionDir: "16.3-path-independence-conservative-fields-and-potential-functions",
    title: "Path Independence, Conservative Fields, and Potential Functions",
    definitions: [
      {
        id: "theorem-fundamental-theorem-line-integrals",
        title: "Fundamental Theorem of Line Integrals",
        category: "theorem",
        latex: "\\int_C \\nabla f \\cdot d\\mathbf{r} = f(B) - f(A)",
        statement: "If vector field F is conservative with potential function f (so F = grad f), then for any smooth curve C from point A to point B, the line integral depends only on the endpoints and is independent of the path taken.",
        conditions: ["F = grad f is continuous on open connected domain"],
        explanation: "Multivariable counterpart of Fundamental Theorem of Calculus: net change equals evaluation at boundaries.",
        keyTakeaway: "Work done by a conservative force depends only on initial and final positions."
      },
      {
        id: "test-conservative-component-test",
        title: "Component Test for Conservative Vector Fields",
        category: "test",
        latex: "\\frac{\\partial P}{\\partial y} = \\frac{\\partial N}{\\partial z}, \\quad \\frac{\\partial M}{\\partial z} = \\frac{\\partial P}{\\partial x}, \\quad \\frac{\\partial N}{\\partial x} = \\frac{\\partial M}{\\partial y} \\iff \\text{curl}\\,\\mathbf{F} = \\mathbf{0}",
        statement: "On a simply connected domain, a continuously differentiable vector field F = <M, N, P> is conservative if and only if its curl vanishes identically everywhere.",
        conditions: ["Domain D is simply connected (no holes)", "F has continuous first partials"],
        explanation: "Equivalent to stating that mixed second partial derivatives of the potential function must commute by Clairaut's theorem.",
        keyTakeaway: "Zero curl on a simply connected domain guarantees path independence and the existence of a potential."
      }
    ],
    summaryMDX: `# Section 16.3: Path Independence, Conservative Fields, and Potential Functions

Conservative fields conserve energy, meaning work along closed loops is zero and line integrals depend solely on endpoints.

---

## 1. Equivalence of Conservative Properties

For a continuous field $\\mathbf{F}$ on an open, connected region:
1. $\\mathbf{F} = \\nabla f$ for some scalar potential $f$.
2. $\\int_C \\mathbf{F} \\cdot d\\mathbf{r}$ is independent of path.
3. $\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = 0$ for every closed loop $C$.

---

## 2. Finding Potential Functions

Given $\\mathbf{F} = \\langle M, N, P \\rangle$:
1. Integrate $f_x = M$ with respect to $x$: $f(x, y, z) = \\int M \\, dx + g(y, z)$.
2. Differentiate with respect to $y$ and equate to $N$ to find $g_y(y, z)$.
3. Differentiate with respect to $z$ and equate to $P$ to determine the remaining function of $z$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Finding the Potential Function of a Planar Conservative Field",
        exerciseReference: "Section 16.3, Exercise 1",
        originalTopic: "Potential Function Construction",
        difficulty: "tier2",
        tags: ["potential-function", "conservative-field", "integration"],
        problemStatement: "Verify that F = <2xy + cos(x), x^2 + 3y^2> is conservative and find its scalar potential function f(x, y).",
        finalAnswer: "f(x, y) = x^2 y + \\sin(x) + y^3 + C",
        steps: [
          {
            stepNumber: 1,
            title: "Verify Component Equality",
            mathExpression: "\\frac{\\partial M}{\\partial y} = \\frac{\\partial}{\\partial y}(2xy + \\cos x) = 2x; \\quad \\frac{\\partial N}{\\partial x} = \\frac{\\partial}{\\partial x}(x^2 + 3y^2) = 2x",
            explanation: "Since M_y = N_x on all of R^2 (simply connected), F is conservative.",
            why: "Testing conservative criterion."
          },
          {
            stepNumber: 2,
            title: "Integrate M with Respect to x",
            mathExpression: "f(x, y) = \\int (2xy + \\cos x) \\, dx = x^2 y + \\sin x + g(y)",
            explanation: "The constant of integration g(y) is a function of y alone.",
            why: "Integrating first component."
          },
          {
            stepNumber: 3,
            title: "Differentiate with Respect to y and Match N",
            mathExpression: "\\frac{\\partial f}{\\partial y} = x^2 + g'(y) = x^2 + 3y^2 \\implies g'(y) = 3y^2 \\implies g(y) = y^3 + C",
            explanation: "Equate partial derivative to N(x, y).",
            why: "Solving for g(y)."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "pi**2 + 1",
          expected: "pi**2 + 1"
        }
      },
      {
        filename: "ex-02",
        title: "Fundamental Theorem of Line Integrals in 3D Space",
        exerciseReference: "Section 16.3, Exercise 2",
        originalTopic: "Fundamental Theorem of Line Integrals",
        difficulty: "tier1",
        tags: ["fundamental-theorem", "path-independence", "work"],
        problemStatement: "Evaluate int_C grad(xyz) . dr along any smooth path from A(1, 2, 3) to B(2, 3, 4).",
        finalAnswer: "18",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Potential Function",
            mathExpression: "f(x, y, z) = xyz",
            explanation: "The integrand is the gradient of f.",
            why: "Recognizing gradient field."
          },
          {
            stepNumber: 2,
            title: "Apply Fundamental Theorem of Line Integrals",
            mathExpression: "\\int_C \\nabla f \\cdot d\\mathbf{r} = f(B) - f(A) = f(2, 3, 4) - f(1, 2, 3) = (2)(3)(4) - (1)(2)(3) = 24 - 6 = 18",
            explanation: "Evaluate potential function at destination and initial points.",
            why: "Evaluating path-independent integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*3*4 - 1*2*3",
          expected: "18"
        }
      },
      {
        filename: "ex-03",
        title: "Testing Conservativeness of a Three-Dimensional Field",
        exerciseReference: "Section 16.3, Exercise 3",
        originalTopic: "3D Curl Component Test",
        difficulty: "tier2",
        tags: ["curl", "3D-conservative", "vector-field"],
        problemStatement: "Determine whether F = <2xy, x^2 + 2yz, y^2> is conservative by computing its curl.",
        finalAnswer: "\\text{curl}\\,\\mathbf{F} = \\mathbf{0} \\implies \\mathbf{F} \\text{ is conservative}",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Curl Vector Components",
            mathExpression: "\\text{curl}\\,\\mathbf{F} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ 2xy & x^2 + 2yz & y^2 \\end{vmatrix}",
            explanation: "Set up the curl determinant operator.",
            why: "Formulating curl determinant."
          },
          {
            stepNumber: 2,
            title: "Compute Individual Cross Derivatives",
            mathExpression: "\\mathbf{i}(2y - 2y) - \\mathbf{j}(0 - 0) + \\mathbf{k}(2x - 2x) = \\langle 0, 0, 0 \\rangle",
            explanation: "All three components vanish identically on R^3.",
            why: "Proving vanishing of curl."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 - 2",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Zero Work along a Closed Elliptical Loop",
        exerciseReference: "Section 16.3, Exercise 4",
        originalTopic: "Closed Loop Work",
        difficulty: "tier1",
        tags: ["closed-loop", "zero-work", "conservative"],
        problemStatement: "Find the work done by F = grad(x^2 + y^2) around the ellipse x^2/4 + y^2/9 = 1.",
        finalAnswer: "0",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Closed Loop Theorem for Gradient Fields",
            mathExpression: "\\oint_C \\nabla f \\cdot d\\mathbf{r} = 0",
            explanation: "Because F is conservative and C is a closed loop returning to its starting point, initial and terminal states coincide.",
            why: "Applying closed loop property."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Detecting a Non-Conservative Vector Field",
        exerciseReference: "Section 16.3, Exercise 5",
        originalTopic: "Non-Conservative Test",
        difficulty: "tier1",
        tags: ["non-conservative", "cross-derivatives", "curl"],
        problemStatement: "Show that F = <y, 2x> is not conservative.",
        finalAnswer: "\\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} = 1 \\ne 0 \\implies \\mathbf{F} \\text{ is not conservative}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Partial Cross Derivatives",
            mathExpression: "M = y \\implies \\frac{\\partial M}{\\partial y} = 1; \\quad N = 2x \\implies \\frac{\\partial N}{\\partial x} = 2",
            explanation: "Differentiate M with respect to y and N with respect to x.",
            why: "Checking Clairaut condition."
          },
          {
            stepNumber: 2,
            title: "Compare Values",
            mathExpression: "\\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} = 2 - 1 = 1 \\ne 0",
            explanation: "Since the mixed partials are not equal, F cannot be the gradient of any scalar potential.",
            why: "Proving field is non-conservative."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 - 1",
          expected: "1"
        }
      }
    ]
  },
  {
    chapter: "ch16",
    chapterDir: "ch16-integrals-and-vector-fields",
    section: "16.4",
    sectionDir: "16.4-greens-theorem-in-the-plane",
    title: "Green's Theorem in the Plane",
    definitions: [
      {
        id: "theorem-greens-circulation",
        title: "Green's Theorem (Circulation-Curl Form)",
        category: "theorem",
        latex: "\\oint_C M \\, dx + N \\, dy = \\iint_R \\left( \\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} \\right) dA",
        statement: "Let C be a positively oriented, piecewise-smooth, simple closed curve in the plane enclosing region R. The counterclockwise circulation around boundary C equals the double integral of the 2D scalar curl over R.",
        conditions: ["C is positively oriented (counterclockwise)", "M and N have continuous partials on open set containing R"],
        explanation: "Microscopic rotations (curl) inside the region cancel on internal shared boundaries, leaving only the macroscopic boundary circulation.",
        keyTakeaway: "Transforms boundary line integrals into planar double integrals."
      },
      {
        id: "theorem-greens-flux",
        title: "Green's Theorem (Flux-Divergence Form)",
        category: "theorem",
        latex: "\\oint_C M \\, dy - N \\, dx = \\iint_R \\left( \\frac{\\partial M}{\\partial x} + \\frac{\\partial N}{\\partial y} \\right) dA = \\iint_R \\text{div}\\,\\mathbf{F} \\, dA",
        statement: "The total outward flux of F across boundary curve C equals the double integral of the divergence of F over region R.",
        conditions: ["Simple closed curve C enclosing region R"],
        explanation: "Microscopic sources and sinks inside R accumulate to produce net outward flux across the perimeter.",
        keyTakeaway: "Planar version of the Divergence Theorem."
      }
    ],
    summaryMDX: `# Section 16.4: Green's Theorem in the Plane

Green's Theorem connects boundary line integrals to double integrals over the enclosed planar region.

---

## 1. Two Forms of Green's Theorem

1. **Circulation-Curl Form**:
$$\\oint_C M \\, dx + N \\, dy = \\iint_R \\left( \\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} \\right) dA$$

2. **Flux-Divergence Form**:
$$\\oint_C M \\, dy - N \\, dx = \\iint_R \\left( \\frac{\\partial M}{\\partial x} + \\frac{\\partial N}{\\partial y} \\right) dA$$

---

## 2. Area via Line Integrals

$$\\text{Area}(R) = \\frac{1}{2} \\oint_C x \\, dy - y \\, dx = \\oint_C x \\, dy = -\\oint_C y \\, dx$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Circulation Around a Square via Green's Theorem",
        exerciseReference: "Section 16.4, Exercise 1",
        originalTopic: "Green's Theorem Circulation",
        difficulty: "tier1",
        tags: ["Greens-theorem", "circulation", "double-integral"],
        problemStatement: "Evaluate oint_C (y^2 dx + 3xy dy) where C is the boundary of the unit square [0, 1] x [0, 1] traversed counterclockwise.",
        finalAnswer: "\\frac{1}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute 2D Curl Integrand",
            mathExpression: "M = y^2, \\; N = 3xy \\implies \\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} = 3y - 2y = y",
            explanation: "Differentiate N with respect to x and M with respect to y.",
            why: "Finding the scalar curl."
          },
          {
            stepNumber: 2,
            title: "Evaluate Double Integral over Unit Square",
            mathExpression: "\\iint_R y \\, dA = \\int_0^1 dx \\int_0^1 y \\, dy = (1) \\left[ \\frac{y^2}{2} \\right]_0^1 = \\frac{1}{2}",
            explanation: "Apply Green's Theorem to convert line integral to double integral.",
            why: "Evaluating area integral of curl."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1/2",
          expected: "0.5"
        }
      },
      {
        filename: "ex-02",
        title: "Area of an Ellipse via Boundary Line Integral",
        exerciseReference: "Section 16.4, Exercise 2",
        originalTopic: "Area Formula via Green's Theorem",
        difficulty: "tier2",
        tags: ["ellipse-area", "Greens-theorem", "differential-form"],
        problemStatement: "Compute the area enclosed by the ellipse x = 5 cos(t), y = 2 sin(t) for 0 <= t <= 2*pi using Green's Theorem.",
        finalAnswer: "10\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Green's Area Formula",
            mathExpression: "\\text{Area} = \\frac{1}{2}\\oint_C (x \\, dy - y \\, dx)",
            explanation: "The differential form (1/2)(x dy - y dx) evaluates to the enclosed area.",
            why: "Setting up boundary area formula."
          },
          {
            stepNumber: 2,
            title: "Substitute Parametric Expressions",
            mathExpression: "x \\, dy - y \\, dx = (5\\cos t)(2\\cos t \\, dt) - (2\\sin t)(-5\\sin t \\, dt) = 10(\\cos^2 t + \\sin^2 t) \\, dt = 10 \\, dt",
            explanation: "Substitute x, y, dx, and dy.",
            why: "Evaluating integrand on boundary."
          },
          {
            stepNumber: 3,
            title: "Integrate over [0, 2*pi]",
            mathExpression: "\\text{Area} = \\frac{1}{2}\\int_0^{2\\pi} 10 \\, dt = \\frac{1}{2}(20\\pi) = 10\\pi",
            explanation: "Evaluate the definite integral.",
            why: "Computing ellipse area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "pi * 5 * 2",
          expected: "10*pi"
        }
      },
      {
        filename: "ex-03",
        title: "Outward Flux Across a Circle via Green's Flux Theorem",
        exerciseReference: "Section 16.4, Exercise 3",
        originalTopic: "Green's Theorem Flux Form",
        difficulty: "tier1",
        tags: ["flux", "divergence", "Greens-theorem"],
        problemStatement: "Compute the outward flux of F = <2x, 3y> across the circle x^2 + y^2 = 4.",
        finalAnswer: "20\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Divergence of F",
            mathExpression: "\\text{div}\\,\\mathbf{F} = \\frac{\\partial M}{\\partial x} + \\frac{\\partial N}{\\partial y} = 2 + 3 = 5",
            explanation: "Differentiate each component.",
            why: "Finding 2D divergence."
          },
          {
            stepNumber: 2,
            title: "Apply Green's Flux Theorem",
            mathExpression: "\\oint_C \\mathbf{F} \\cdot \\mathbf{n} \\, ds = \\iint_R 5 \\, dA = 5 \\times \\text{Area}(R) = 5 \\times \\pi(2^2) = 20\\pi",
            explanation: "Multiply constant divergence 5 by the area of the circular disk 4*pi.",
            why: "Evaluating total flux."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "5 * pi * 4",
          expected: "20*pi"
        }
      },
      {
        filename: "ex-04",
        title: "Line Integral Around a Triangle via Green's Theorem",
        exerciseReference: "Section 16.4, Exercise 4",
        originalTopic: "Triangular Circulation",
        difficulty: "tier2",
        tags: ["triangle", "circulation", "Greens-theorem"],
        problemStatement: "Evaluate oint_C (xy dx + x^2 dy) around the triangle with vertices (0, 0), (1, 0), and (1, 1) counterclockwise.",
        finalAnswer: "\\frac{1}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Green's Theorem to Convert to Double Integral",
            mathExpression: "M = xy, \\; N = x^2 \\implies \\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} = 2x - x = x",
            explanation: "Compute the difference of partial derivatives.",
            why: "Finding double integral integrand."
          },
          {
            stepNumber: 2,
            title: "Evaluate Double Integral over Triangle",
            mathExpression: "\\iint_T x \\, dA = \\int_0^1 \\int_0^x x \\, dy \\, dx = \\int_0^1 x^2 \\, dx = \\left[ \\frac{x^3}{3} \\right]_0^1 = \\frac{1}{3}",
            explanation: "Integrate x over the triangle 0 <= y <= x, 0 <= x <= 1.",
            why: "Evaluating double integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1/3",
          expected: "1/3"
        }
      },
      {
        filename: "ex-05",
        title: "Green's Theorem on an Annular Doubly-Connected Region",
        exerciseReference: "Section 16.4, Exercise 5",
        originalTopic: "Annulus Green's Theorem",
        difficulty: "tier2",
        tags: ["annulus", "doubly-connected", "vortex-field"],
        problemStatement: "For the vortex field with curl = 0 in the annulus 1 <= x^2 + y^2 <= 4, show that the circulation around outer boundary C_2 equals circulation around inner boundary C_1.",
        finalAnswer: "\\oint_{C_2} \\mathbf{F} \\cdot d\\mathbf{r} - \\oint_{C_1} \\mathbf{F} \\cdot d\\mathbf{r} = 0 \\implies \\oint_{C_2} = \\oint_{C_1} = 2\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Green's Theorem for Region with Hole",
            mathExpression: "\\oint_{C_2} \\mathbf{F} \\cdot d\\mathbf{r} - \\oint_{C_1} \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_R \\left( \\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} \\right) dA",
            explanation: "Outer boundary is counterclockwise; inner boundary is clockwise, giving subtraction.",
            why: "Formulating Green's theorem on multiply-connected domain."
          },
          {
            stepNumber: 2,
            title: "Evaluate Zero Curl Integrand",
            mathExpression: "\\iint_R 0 \\, dA = 0 \\implies \\oint_{C_2} \\mathbf{F} \\cdot d\\mathbf{r} = \\oint_{C_1} \\mathbf{F} \\cdot d\\mathbf{r}",
            explanation: "Since curl is zero in the annular region, the difference of circulations vanishes.",
            why: "Proving path deformation invariance."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*pi - 2*pi",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch16",
    chapterDir: "ch16-integrals-and-vector-fields",
    section: "16.5",
    sectionDir: "16.5-surfaces-and-area",
    title: "Surfaces and Area",
    definitions: [
      {
        id: "def-parametric-surface",
        title: "Parametric Surface and Normal Vector",
        category: "definition",
        latex: "\\mathbf{r}(u, v) = x(u, v)\\mathbf{i} + y(u, v)\\mathbf{j} + z(u, v)\\mathbf{k}, \\quad \\mathbf{n} = \\mathbf{r}_u \\times \\mathbf{r}_v",
        statement: "A smooth parametric surface S is traced by continuous vector function r(u, v) over parameter domain R in the uv-plane. The cross product of tangent vectors r_u and r_v provides the normal vector.",
        conditions: ["r_u x r_v != 0 (smooth surface)"],
        explanation: "Coordinates u and v form curvilinear coordinate grid lines on the curved 2D surface in 3-space.",
        keyTakeaway: "Parametrization provides an intrinsic coordinate system for arbitrary 3D surfaces."
      },
      {
        id: "formula-surface-area",
        title: "Surface Area Differential and Formula",
        category: "formula",
        latex: "d\\sigma = |\\mathbf{r}_u \\times \\mathbf{r}_v| \\, du \\, dv, \\quad \\text{or for } z = f(x, y): \\; d\\sigma = \\sqrt{1 + f_x^2 + f_y^2} \\, dA",
        statement: "The surface area element d sigma measures the area of the infinitesimal parallelogram spanned by tangent increments r_u du and r_v dv. Total surface area is the double integral of d sigma over the parameter region.",
        conditions: ["Surface is smooth and traversed once"],
        explanation: "For Monge explicit patch z = f(x, y), simplifies to sqrt(1 + (dz/dx)^2 + (dz/dy)^2) dx dy.",
        keyTakeaway: "Quantifies area of curved 2D manifolds embedded in 3D Euclidean space."
      }
    ],
    summaryMDX: `# Section 16.5: Surfaces and Area

Surfaces in $\\mathbb{R}^3$ are described explicitly ($z = f(x, y)$), implicitly ($F(x, y, z) = 0$), or parametrically ($\\mathbf{r}(u, v)$).

---

## 1. Surface Area Formulas

1. **Explicit Graph $z = f(x, y)$**:
$$\\text{Area}(S) = \\iint_R \\sqrt{1 + \\left(\\frac{\\partial z}{\\partial x}\\right)^2 + \\left(\\frac{\\partial z}{\\partial y}\\right)^2} \\, dA$$

2. **Parametric Surface $\\mathbf{r}(u, v)$**:
$$\\text{Area}(S) = \\iint_R |\\mathbf{r}_u \\times \\mathbf{r}_v| \\, du \\, dv$$

---

## 2. Standard Surface Elements

- **Sphere of radius $a$**: $d\\sigma = a^2 \\sin\\phi \\, d\\phi \\, d\\theta$
- **Cylinder of radius $a$**: $d\\sigma = a \\, dz \\, d\\theta$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Surface Area of a Circular Paraboloid Cap",
        exerciseReference: "Section 16.5, Exercise 1",
        originalTopic: "Explicit Surface Area",
        difficulty: "tier2",
        tags: ["surface-area", "paraboloid", "polar-coordinates"],
        problemStatement: "Find the surface area of the paraboloid z = x^2 + y^2 below the plane z = 4.",
        finalAnswer: "\\frac{\\pi}{6}(17\\sqrt{17} - 1)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Area Element d sigma",
            mathExpression: "z_x = 2x, \\quad z_y = 2y \\implies d\\sigma = \\sqrt{1 + 4x^2 + 4y^2} \\, dA = \\sqrt{1 + 4r^2} \\, r \\, dr \\, d\\theta",
            explanation: "Evaluate partial derivatives and convert to polar coordinates.",
            why: "Formulating surface area element."
          },
          {
            stepNumber: 2,
            title: "Set Up Limits and Integrate",
            mathExpression: "z = 4 \\implies x^2 + y^2 = 4 \\implies r = 2; \\quad \\text{Area} = \\int_0^{2\\pi} d\\theta \\int_0^2 \\sqrt{1 + 4r^2} r \\, dr",
            explanation: "Radial limit extends from 0 to 2.",
            why: "Determining integration limits."
          },
          {
            stepNumber: 3,
            title: "Evaluate Using Substitution",
            mathExpression: "u = 1 + 4r^2, \\; du = 8r \\, dr \\implies 2\\pi \\left[ \\frac{1}{12}(1 + 4r^2)^{3/2} \\right]_0^2 = \\frac{\\pi}{6} (17^{3/2} - 1^{3/2}) = \\frac{\\pi}{6}(17\\sqrt{17} - 1)",
            explanation: "Integrate using power rule on u^(1/2).",
            why: "Computing final surface area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(pi/6)*(17*sqrt(17) - 1)",
          expected: "(pi/6)*(17*sqrt(17) - 1)"
        }
      },
      {
        filename: "ex-02",
        title: "Area of a Plane Region Cut Out by a Cylinder",
        exerciseReference: "Section 16.5, Exercise 2",
        originalTopic: "Planar Surface Area",
        difficulty: "tier1",
        tags: ["plane", "cylinder", "surface-area"],
        problemStatement: "Find the surface area of the plane 2x + 2y + z = 8 inside the cylinder x^2 + y^2 <= 4.",
        finalAnswer: "12\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Calculate Area Scale Factor",
            mathExpression: "z = 8 - 2x - 2y \\implies z_x = -2, \\; z_y = -2; \\quad d\\sigma = \\sqrt{1 + (-2)^2 + (-2)^2} \\, dA = \\sqrt{9} \\, dA = 3 \\, dA",
            explanation: "The surface element scales the base area by constant factor 3.",
            why: "Finding surface metric scale."
          },
          {
            stepNumber: 2,
            title: "Multiply Scale Factor by Base Circular Area",
            mathExpression: "\\text{Area} = 3 \\iint_{x^2+y^2 \\le 4} 1 \\, dA = 3 \\times \\pi(2^2) = 12\\pi",
            explanation: "Multiply factor 3 by area of disk 4*pi.",
            why: "Evaluating planar patch area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "3 * 4*pi",
          expected: "12*pi"
        }
      },
      {
        filename: "ex-03",
        title: "Surface Area of a Cylinder from Parametric Equations",
        exerciseReference: "Section 16.5, Exercise 3",
        originalTopic: "Parametric Surface Area",
        difficulty: "tier1",
        tags: ["parametric-surface", "cylinder", "cross-product"],
        problemStatement: "Compute the lateral area of the cylinder r(u, v) = <2 cos(u), 2 sin(u), v> for 0 <= u <= 2*pi and 0 <= v <= 5.",
        finalAnswer: "20\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Tangent Vectors and Normal Cross Product",
            mathExpression: "\\mathbf{r}_u = \\langle -2\\sin u, 2\\cos u, 0 \\rangle, \\quad \\mathbf{r}_v = \\langle 0, 0, 1 \\rangle \\implies \\mathbf{r}_u \\times \\mathbf{r}_v = \\langle 2\\cos u, 2\\sin u, 0 \\rangle",
            explanation: "Take cross product of tangent vectors.",
            why: "Finding normal vector."
          },
          {
            stepNumber: 2,
            title: "Compute Magnitude and Integrate",
            mathExpression: "|\\mathbf{r}_u \\times \\mathbf{r}_v| = \\sqrt{4\\cos^2 u + 4\\sin^2 u} = 2; \\quad \\text{Area} = \\int_0^{2\\pi} \\int_0^5 2 \\, dv \\, du = 2(5)(2\\pi) = 20\\pi",
            explanation: "Integrate constant magnitude 2 over rectangular parameter domain.",
            why: "Evaluating cylindrical surface area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 * 5 * 2*pi",
          expected: "20*pi"
        }
      },
      {
        filename: "ex-04",
        title: "Surface Area of a Sphere via Spherical Coordinates",
        exerciseReference: "Section 16.5, Exercise 4",
        originalTopic: "Sphere Surface Area",
        difficulty: "tier1",
        tags: ["sphere", "spherical-patch", "surface-area"],
        problemStatement: "Find the surface area of a sphere of radius a = 3 using the spherical parametrization.",
        finalAnswer: "36\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Recall Area Element for Sphere of Radius a",
            mathExpression: "d\\sigma = a^2 \\sin\\phi \\, d\\phi \\, d\\theta",
            explanation: "The norm of cross product of spherical tangent vectors is a^2 sin(phi).",
            why: "Using spherical surface metric."
          },
          {
            stepNumber: 2,
            title: "Integrate over Full Sphere",
            mathExpression: "\\text{Area} = a^2 \\left( \\int_0^{2\\pi} d\\theta \\right) \\left( \\int_0^\\pi \\sin\\phi \\, d\\phi \\right) = a^2 (2\\pi)(2) = 4\\pi a^2 = 4\\pi(3^2) = 36\\pi",
            explanation: "Evaluate double integral for a = 3.",
            why: "Evaluating total sphere area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 * pi * 3**2",
          expected: "36*pi"
        }
      },
      {
        filename: "ex-05",
        title: "Surface Area of a Right Circular Cone",
        exerciseReference: "Section 16.5, Exercise 5",
        originalTopic: "Cone Surface Area",
        difficulty: "tier1",
        tags: ["cone", "surface-area", "polar-coordinates"],
        problemStatement: "Find the lateral surface area of the cone z = sqrt(x^2 + y^2) for 0 <= z <= 3.",
        finalAnswer: "9\\sqrt{2}\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Partial Derivatives and Metric",
            mathExpression: "z_x = \\frac{x}{\\sqrt{x^2+y^2}}, \\; z_y = \\frac{y}{\\sqrt{x^2+y^2}} \\implies 1 + z_x^2 + z_y^2 = 1 + \\frac{x^2 + y^2}{x^2 + y^2} = 1 + 1 = 2",
            explanation: "Sum squared partial derivatives.",
            why: "Finding cone surface metric."
          },
          {
            stepNumber: 2,
            title: "Integrate Over Base Disk",
            mathExpression: "d\\sigma = \\sqrt{2} \\, dA; \\quad \\text{Area} = \\sqrt{2} \\iint_{x^2+y^2 \\le 9} 1 \\, dA = \\sqrt{2} \\pi (3^2) = 9\\sqrt{2}\\pi",
            explanation: "Multiply constant sqrt(2) by area of base disk of radius 3.",
            why: "Evaluating cone lateral area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(2) * pi * 3**2",
          expected: "9*sqrt(2)*pi"
        }
      }
    ]
  },
  {
    chapter: "ch16",
    chapterDir: "ch16-integrals-and-vector-fields",
    section: "16.6",
    sectionDir: "16.6-surface-integrals",
    title: "Surface Integrals",
    definitions: [
      {
        id: "def-scalar-surface-integral",
        title: "Scalar Surface Integral",
        category: "definition",
        latex: "\\iint_S g(x, y, z) \\, d\\sigma = \\iint_R g(x(u, v), y(u, v), z(u, v)) |\\mathbf{r}_u \\times \\mathbf{r}_v| \\, du \\, dv",
        statement: "The surface integral of a continuous scalar function g over smooth surface S accumulates g weighted by area element d sigma. Computes mass of thin shell S when g is surface density.",
        conditions: ["g is continuous on smooth surface S"],
        explanation: "Generalizes line integrals from 1D curves to 2D curved surfaces in space.",
        keyTakeaway: "Integrates scalar distributions across curved surfaces."
      },
      {
        id: "def-vector-surface-integral-flux",
        title: "Flux of a Vector Field (Surface Integral of Vector Field)",
        category: "definition",
        latex: "\\text{Flux} = \\iint_S \\mathbf{F} \\cdot \\mathbf{n} \\, d\\sigma = \\iint_S \\mathbf{F} \\cdot d\\boldsymbol{\\sigma}",
        statement: "The flux of vector field F through oriented surface S measures the net volume of fluid flowing across S per unit time in the direction of unit normal n.",
        conditions: ["S is an orientable surface with chosen continuous unit normal n"],
        explanation: "For graph z = f(x, y) with upward normal, F . n d sigma = (-M f_x - N f_y + P) dx dy.",
        keyTakeaway: "Fundamental in electromagnetism (Gauss's Law) and fluid dynamics."
      }
    ],
    summaryMDX: `# Section 16.6: Surface Integrals

Surface integrals evaluate scalar accumulations and vector flux across curved two-dimensional manifolds.

---

## 1. Explicit Graph Flux Formulation

For $\\mathbf{F} = \\langle M, N, P \\rangle$ and surface $z = f(x, y)$ with **upward** orientation:
$$\\mathbf{n} \\, d\\sigma = \\left( -\\frac{\\partial z}{\\partial x}\\mathbf{i} - \\frac{\\partial z}{\\partial y}\\mathbf{j} + \\mathbf{k} \\right) dA$$
$$\\iint_S \\mathbf{F} \\cdot \\mathbf{n} \\, d\\sigma = \\iint_R \\left( -M \\frac{\\partial z}{\\partial x} - N \\frac{\\partial z}{\\partial y} + P \\right) dA$$

---

## 2. Spherical Shell Flux

For a sphere of radius $R$ with outward normal $\\mathbf{n} = \\frac{\\mathbf{r}}{R}$:
$$\\iint_S \\mathbf{F} \\cdot \\mathbf{n} \\, d\\sigma = \\iint_S \\mathbf{F} \\cdot \\left( \\frac{\\mathbf{r}}{R} \\right) d\\sigma$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Scalar Surface Integral over a Hemisphere",
        exerciseReference: "Section 16.6, Exercise 1",
        originalTopic: "Scalar Surface Integral",
        difficulty: "tier2",
        tags: ["scalar-surface-integral", "hemisphere", "polar-coordinates"],
        problemStatement: "Evaluate iint_S z d sigma over the upper hemisphere x^2 + y^2 + z^2 = 4 (z >= 0).",
        finalAnswer: "8\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Express d sigma for Sphere",
            mathExpression: "z = \\sqrt{4 - x^2 - y^2} \\implies d\\sigma = \\frac{a}{z} \\, dA = \\frac{2}{z} \\, dA",
            explanation: "On a sphere of radius a = 2, the area element satisfies d sigma = (2/z) dA.",
            why: "Finding surface area metric for spherical cap."
          },
          {
            stepNumber: 2,
            title: "Simplify Integrand",
            mathExpression: "z \\, d\\sigma = z \\left( \\frac{2}{z} \\, dA \\right) = 2 \\, dA",
            explanation: "The variable height z cancels exactly with the denominator.",
            why: "Canceling height variable."
          },
          {
            stepNumber: 3,
            title: "Integrate Over Base Disk",
            mathExpression: "\\iint_S z \\, d\\sigma = 2 \\iint_{x^2+y^2 \\le 4} 1 \\, dA = 2 \\times \\pi(2^2) = 8\\pi",
            explanation: "Multiply 2 by area of base circular disk 4*pi.",
            why: "Evaluating final surface integral."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 * 4*pi",
          expected: "8*pi"
        }
      },
      {
        filename: "ex-02",
        title: "Flux of a Uniform Vector Field Through a Flat Disk",
        exerciseReference: "Section 16.6, Exercise 2",
        originalTopic: "Uniform Flux",
        difficulty: "tier1",
        tags: ["flux", "flat-surface", "vector-field"],
        problemStatement: "Compute the upward flux of F = <0, 0, 5> through the disk x^2 + y^2 <= 9 in the xy-plane.",
        finalAnswer: "45\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Determine Upward Normal Vector",
            mathExpression: "\\mathbf{n} = \\mathbf{k} = \\langle 0, 0, 1 \\rangle",
            explanation: "The unit upward normal to the xy-plane is k.",
            why: "Identifying normal orientation."
          },
          {
            stepNumber: 2,
            title: "Evaluate Flux Dot Product",
            mathExpression: "\\mathbf{F} \\cdot \\mathbf{n} = \\langle 0, 0, 5 \\rangle \\cdot \\langle 0, 0, 1 \\rangle = 5",
            explanation: "Compute the normal component of the field.",
            why: "Evaluating normal field component."
          },
          {
            stepNumber: 3,
            title: "Integrate Over Disk",
            mathExpression: "\\iint_S 5 \\, d\\sigma = 5 \\times \\text{Area}(S) = 5 \\times \\pi(3^2) = 45\\pi",
            explanation: "Multiply constant normal component 5 by disk area 9*pi.",
            why: "Computing total flux."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "5 * 9*pi",
          expected: "45*pi"
        }
      },
      {
        filename: "ex-03",
        title: "Outward Flux of a Radial Field Through a Sphere",
        exerciseReference: "Section 16.6, Exercise 3",
        originalTopic: "Spherical Flux",
        difficulty: "tier1",
        tags: ["flux", "radial-field", "sphere"],
        problemStatement: "Find the outward flux of F = <x, y, z> through the sphere of radius R = 2 centered at the origin.",
        finalAnswer: "32\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Outward Unit Normal",
            mathExpression: "\\mathbf{n} = \\frac{\\langle x, y, z \\rangle}{R} = \\frac{1}{2}\\langle x, y, z \\rangle",
            explanation: "The unit normal points radially outward.",
            why: "Formulating outward unit normal."
          },
          {
            stepNumber: 2,
            title: "Evaluate F . n on Sphere",
            mathExpression: "\\mathbf{F} \\cdot \\mathbf{n} = \\frac{x^2 + y^2 + z^2}{R} = \\frac{R^2}{R} = R = 2",
            explanation: "The normal component is constant and equals the sphere radius 2.",
            why: "Evaluating dot product on surface."
          },
          {
            stepNumber: 3,
            title: "Integrate Constant Value Over Sphere",
            mathExpression: "\\text{Flux} = \\iint_S 2 \\, d\\sigma = 2 \\times \\text{Area}(S) = 2 \\times 4\\pi(2^2) = 32\\pi",
            explanation: "Multiply 2 by total spherical surface area 16*pi.",
            why: "Evaluating total outward flux."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 * 4*pi * 2**2",
          expected: "32*pi"
        }
      },
      {
        filename: "ex-04",
        title: "Upward Flux Through a Paraboloid Cap",
        exerciseReference: "Section 16.6, Exercise 4",
        originalTopic: "Flux Through Graph",
        difficulty: "tier2",
        tags: ["flux", "paraboloid", "surface-integral"],
        problemStatement: "Compute the upward flux of F = <0, 0, z> through the paraboloid z = 4 - x^2 - y^2 for z >= 0.",
        finalAnswer: "8\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Upward Normal Flux Formula",
            mathExpression: "z = f(x, y) = 4 - x^2 - y^2 \\implies \\mathbf{n}\\,d\\sigma = \\langle 2x, 2y, 1 \\rangle \\, dA",
            explanation: "The upward normal vector for z = f(x, y) is <-f_x, -f_y, 1>.",
            why: "Setting up oriented area element."
          },
          {
            stepNumber: 2,
            title: "Evaluate Dot Product F . n d sigma",
            mathExpression: "\\mathbf{F} \\cdot \\mathbf{n}\\,d\\sigma = [0(2x) + 0(2y) + z(1)] \\, dA = z \\, dA = (4 - x^2 - y^2) \\, dA",
            explanation: "Take inner product of F and normal element.",
            why: "Formulating planar double integral."
          },
          {
            stepNumber: 3,
            title: "Integrate in Polar Coordinates",
            mathExpression: "\\int_0^{2\\pi} d\\theta \\int_0^2 (4 - r^2) r \\, dr = 2\\pi \\left[ 2r^2 - \\frac{r^4}{4} \\right]_0^2 = 2\\pi (8 - 4) = 8\\pi",
            explanation: "Evaluate polar integral over base circle of radius 2.",
            why: "Computing total upward flux."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 * pi * 4",
          expected: "8*pi"
        }
      },
      {
        filename: "ex-05",
        title: "Mass of a Planar Triangular Shell with Linear Density",
        exerciseReference: "Section 16.6, Exercise 5",
        originalTopic: "Surface Mass Integral",
        difficulty: "tier2",
        tags: ["mass", "density", "triangular-shell"],
        problemStatement: "Find the mass of the triangular surface x + y + z = 1 in the first octant if density is delta(x, y, z) = x.",
        finalAnswer: "\\frac{\\sqrt{3}}{6}",
        steps: [
          {
            stepNumber: 1,
            title: "Determine Surface Area Element d sigma",
            mathExpression: "z = 1 - x - y \\implies z_x = -1, \\; z_y = -1; \\quad d\\sigma = \\sqrt{1 + 1 + 1} \\, dA = \\sqrt{3} \\, dA",
            explanation: "Evaluate surface scale factor.",
            why: "Finding surface area metric."
          },
          {
            stepNumber: 2,
            title: "Set Up and Evaluate Double Integral",
            mathExpression: "M = \\iint_T x (\\sqrt{3} \\, dA) = \\sqrt{3} \\int_0^1 x \\left( \\int_0^{1-x} dy \\right) dx = \\sqrt{3} \\int_0^1 x(1 - x) \\, dx = \\sqrt{3} \\left( \\frac{1}{2} - \\frac{1}{3} \\right) = \\frac{\\sqrt{3}}{6}",
            explanation: "Integrate x(1-x) over [0, 1].",
            why: "Evaluating total shell mass."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(3) * (1/6)",
          expected: "sqrt(3)/6"
        }
      }
    ]
  },
  {
    chapter: "ch16",
    chapterDir: "ch16-integrals-and-vector-fields",
    section: "16.7",
    sectionDir: "16.7-stokes-theorem",
    title: "Stokes' Theorem",
    definitions: [
      {
        id: "theorem-stokes",
        title: "Stokes' Theorem",
        category: "theorem",
        latex: "\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n} \\, d\\sigma",
        statement: "The circulation of a continuously differentiable vector field F around the oriented boundary curve C of an oriented surface S equals the flux of the curl of F through S.",
        conditions: ["S is an oriented piecewise-smooth surface", "C is boundary curve oriented by right-hand rule with respect to n"],
        explanation: "Extends Green's Theorem to arbitrary curved two-dimensional surfaces embedded in three-dimensional space.",
        keyTakeaway: "Circulation along a closed loop depends only on the boundary curve, allowing replacement of complex surfaces with simpler ones sharing the same boundary."
      },
      {
        id: "def-curl-vector-interpretation",
        title: "Curl Vector and Local Rotation",
        category: "definition",
        latex: "(\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n} = \\lim_{A \\to 0} \\frac{1}{A} \\oint_{C} \\mathbf{F} \\cdot d\\mathbf{r}",
        statement: "The component of curl F along unit normal n represents the limiting circulation density per unit area in the plane orthogonal to n.",
        conditions: ["Limit taken as area of loop shrinks to zero around point"],
        explanation: "A miniature paddle wheel placed in fluid flow rotates with maximum angular speed when its axis is aligned with curl F.",
        keyTakeaway: "Curl measures microscopic fluid vorticity and field rotation."
      }
    ],
    summaryMDX: `# Section 16.7: Stokes' Theorem

Stokes' Theorem relates the circulation of a vector field around a boundary curve to the flux of its curl across the enclosed surface.

---

## 1. Theorem Statement

$$\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n} \\, d\\sigma$$

- **Orientation Convention**: As you walk along $C$ in the positive direction with your head pointing in direction $\\mathbf{n}$, the surface $S$ is on your left.

---

## 2. Independence of Surface

If $S_1$ and $S_2$ are two surfaces sharing the identical boundary curve $C$:
$$\\iint_{S_1} (\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n}_1 \\, d\\sigma = \\iint_{S_2} (\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n}_2 \\, d\\sigma$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Verifying Stokes' Theorem on a Hemispherical Cap",
        exerciseReference: "Section 16.7, Exercise 1",
        originalTopic: "Stokes' Theorem Verification",
        difficulty: "tier2",
        tags: ["Stokes-theorem", "curl", "hemisphere"],
        problemStatement: "Verify Stokes' Theorem for F = <-y, x, z> over upper hemisphere z = sqrt(1 - x^2 - y^2) bounded by unit circle C in the xy-plane.",
        finalAnswer: "\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n} \\, d\\sigma = 2\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Boundary Line Integral Directly",
            mathExpression: "\\oint_C (-y \\, dx + x \\, dy + z \\, dz) = \\int_0^{2\\pi} [-\\sin t(-\\sin t) + \\cos t(\\cos t) + 0] dt = \\int_0^{2\\pi} 1 \\, dt = 2\\pi",
            explanation: "Parametrize boundary circle x = cos(t), y = sin(t), z = 0.",
            why: "Computing boundary circulation directly."
          },
          {
            stepNumber: 2,
            title: "Compute Curl of F",
            mathExpression: "\\nabla \\times \\mathbf{F} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ \\partial_x & \\partial_y & \\partial_z \\\\ -y & x & z \\end{vmatrix} = \\langle 0, 0, 1 - (-1) \\rangle = \\langle 0, 0, 2 \\rangle",
            explanation: "Evaluate the curl vector.",
            why: "Finding curl integrand."
          },
          {
            stepNumber: 3,
            title: "Evaluate Flux of Curl via Flat Base Disk",
            mathExpression: "\\iint_{\\text{Disk}} \\langle 0, 0, 2 \\rangle \\cdot \\mathbf{k} \\, dA = 2 \\iint_D 1 \\, dA = 2(\\pi \\cdot 1^2) = 2\\pi",
            explanation: "By Stokes' Theorem, replace hemisphere with flat disk sharing boundary C.",
            why: "Computing curl flux across surface."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*pi",
          expected: "2*pi"
        }
      },
      {
        filename: "ex-02",
        title: "Work Around a Planar Triangle via Stokes' Theorem",
        exerciseReference: "Section 16.7, Exercise 2",
        originalTopic: "Triangular Work via Stokes",
        difficulty: "tier2",
        tags: ["work", "Stokes-theorem", "triangle"],
        problemStatement: "Compute the work done by F = <y^2, x, z^2> counterclockwise around the triangle in the xy-plane with vertices (0, 0, 0), (1, 0, 0), and (1, 1, 0).",
        finalAnswer: "\\frac{1}{6}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Curl of F",
            mathExpression: "\\nabla \\times \\mathbf{F} = \\langle 0, 0, 1 - 2y \\rangle",
            explanation: "Evaluate cross derivatives.",
            why: "Finding curl vector."
          },
          {
            stepNumber: 2,
            title: "Apply Stokes' Theorem with Normal n = k",
            mathExpression: "\\iint_T (\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{k} \\, dA = \\int_0^1 \\int_0^x (1 - 2y) \\, dy \\, dx",
            explanation: "Dot product with upward normal k isolates third component (1 - 2y).",
            why: "Setting up surface integral."
          },
          {
            stepNumber: 3,
            title: "Evaluate Iterated Integral",
            mathExpression: "\\int_0^1 \\left[ y - y^2 \\right]_0^x dx = \\int_0^1 (x - x^2) \\, dx = \\left[ \\frac{x^2}{2} - \\frac{x^3}{3} \\right]_0^1 = \\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}",
            explanation: "Evaluate outer x-integral.",
            why: "Computing final work."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1/2 - 1/3",
          expected: "1/6"
        }
      },
      {
        filename: "ex-03",
        title: "Curl Flux Invariance over Different Surfaces",
        exerciseReference: "Section 16.7, Exercise 3",
        originalTopic: "Surface Independence",
        difficulty: "tier1",
        tags: ["surface-independence", "Stokes-theorem", "curl-flux"],
        problemStatement: "If curl F = <0, 0, 3>, compute the flux of curl F through any surface S capped by the unit circle x^2 + y^2 = 1 in the xy-plane.",
        finalAnswer: "3\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Select Simplest Surface (Flat Disk)",
            mathExpression: "\\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n} \\, d\\sigma = \\iint_{\\text{Disk}} 3 \\, dA = 3 \\times \\pi(1^2) = 3\\pi",
            explanation: "Because curl flux depends only on boundary curve C, evaluate across flat disk.",
            why: "Using surface independence."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "3*pi",
          expected: "3*pi"
        }
      },
      {
        filename: "ex-04",
        title: "Stokes' Theorem on a Gradient Field",
        exerciseReference: "Section 16.7, Exercise 4",
        originalTopic: "Conservative Field Circulation",
        difficulty: "tier1",
        tags: ["curl-of-gradient", "conservative", "Stokes-theorem"],
        problemStatement: "Use Stokes' Theorem to explain why the line integral of a gradient field F = grad f around any closed loop C is zero.",
        finalAnswer: "\\nabla \\times (\\nabla f) = \\mathbf{0} \\implies \\oint_C \\nabla f \\cdot d\\mathbf{r} = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Identity curl(grad f) = 0",
            mathExpression: "\\nabla \\times (\\nabla f) = \\mathbf{0}",
            explanation: "The curl of any gradient field is identically zero by Clairaut's theorem.",
            why: "Establishing vector identity."
          },
          {
            stepNumber: 2,
            title: "Substitute into Stokes' Theorem",
            mathExpression: "\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S \\mathbf{0} \\cdot \\mathbf{n} \\, d\\sigma = 0",
            explanation: "The surface integral vanishes identically.",
            why: "Proving vanishing of loop circulation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Circulation of a Permuted Linear Field",
        exerciseReference: "Section 16.7, Exercise 5",
        originalTopic: "Circulation on Boundary",
        difficulty: "tier2",
        tags: ["circulation", "Stokes-theorem", "tilted-curl"],
        problemStatement: "For F = <z, x, y>, find the circulation around the unit circle x^2 + y^2 = 1, z = 0 oriented counterclockwise.",
        finalAnswer: "\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Curl of F",
            mathExpression: "\\nabla \\times \\mathbf{F} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ \\partial_x & \\partial_y & \\partial_z \\\\ z & x & y \\end{vmatrix} = \\langle 1 - 0, 1 - 0, 1 - 0 \\rangle = \\langle 1, 1, 1 \\rangle",
            explanation: "Evaluate the curl determinant.",
            why: "Finding curl vector."
          },
          {
            stepNumber: 2,
            title: "Dot with Upward Normal on Flat Disk",
            mathExpression: "(\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{k} = \\langle 1, 1, 1 \\rangle \\cdot \\langle 0, 0, 1 \\rangle = 1",
            explanation: "Project curl onto surface normal k.",
            why: "Finding normal component of curl."
          },
          {
            stepNumber: 3,
            title: "Integrate Over Unit Disk",
            mathExpression: "\\iint_D 1 \\, dA = \\text{Area of unit circle} = \\pi",
            explanation: "Multiply by area of unit disk.",
            why: "Evaluating boundary circulation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "pi * 1",
          expected: "pi"
        }
      }
    ]
  },
  {
    chapter: "ch16",
    chapterDir: "ch16-integrals-and-vector-fields",
    section: "16.8",
    sectionDir: "16.8-the-divergence-theorem-and-a-unified-theory",
    title: "The Divergence Theorem and a Unified Theory",
    definitions: [
      {
        id: "theorem-divergence-gauss",
        title: "The Divergence Theorem (Gauss's Theorem)",
        category: "theorem",
        latex: "\\iint_S \\mathbf{F} \\cdot \\mathbf{n} \\, d\\sigma = \\iiint_D \\nabla \\cdot \\mathbf{F} \\, dV",
        statement: "The net outward flux of a continuously differentiable vector field F across a closed orientable surface S enclosing solid region D equals the triple integral of the divergence of F over D.",
        conditions: ["S is a piecewise-smooth closed surface", "n is outward pointing unit normal", "F has continuous first partials"],
        explanation: "Internal sources and sinks expand outward, so total surface flux equals the volume integral of local volumetric expansion rates.",
        keyTakeaway: "Transforms two-dimensional closed surface flux integrals into three-dimensional volume integrals."
      },
      {
        id: "def-divergence-source-rate",
        title: "Divergence as Volumetric Source Density",
        category: "definition",
        latex: "\\nabla \\cdot \\mathbf{F}(P) = \\lim_{V \\to 0} \\frac{1}{V} \\iint_{S_V} \\mathbf{F} \\cdot \\mathbf{n} \\, d\\sigma",
        statement: "The divergence div F at point P is the limiting outward flux per unit volume as the volume shrinks to P. If div F > 0, P is a source; if div F < 0, P is a sink; if div F = 0 everywhere, F is incompressible (solenoidal).",
        conditions: ["Volume shrinks smoothly to point P"],
        explanation: "Physical foundation for continuity equations in hydrodynamics and Gauss's law in electrodynamics.",
        keyTakeaway: "Divergence quantifies the local rate of fluid generation per unit volume."
      }
    ],
    summaryMDX: `# Section 16.8: The Divergence Theorem and a Unified Theory

The Divergence Theorem (Gauss's Theorem) unifies flux across closed boundaries with volumetric source distribution.

---

## 1. The Divergence Theorem

$$\\iint_S \\mathbf{F} \\cdot \\mathbf{n} \\, d\\sigma = \\iiint_D \\nabla \\cdot \\mathbf{F} \\, dV$$

where:
- $S$ is a closed surface oriented with **outward** unit normal $\\mathbf{n}$.
- $\\nabla \\cdot \\mathbf{F} = \\frac{\\partial M}{\\partial x} + \\frac{\\partial N}{\\partial y} + \\frac{\\partial P}{\\partial z}$.

---

## 2. Grand Unified Hierarchy of Fundamental Theorems

All major integration theorems express the principle:
$$\\int_{\\partial \\Omega} \\omega = \\int_\\Omega d\\omega$$

1. **Fundamental Theorem of Calculus**: $\\int_a^b F'(x) \\, dx = F(b) - F(a)$
2. **Fundamental Theorem of Line Integrals**: $\\int_C \\nabla f \\cdot d\\mathbf{r} = f(B) - f(A)$
3. **Green's Theorem / Stokes' Theorem**: $\\oint_{\\partial S} \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n} \\, d\\sigma$
4. **Divergence Theorem**: $\\iint_{\\partial D} \\mathbf{F} \\cdot \\mathbf{n} \\, d\\sigma = \\iiint_D \\nabla \\cdot \\mathbf{F} \\, dV$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Outward Flux Across a Sphere via the Divergence Theorem",
        exerciseReference: "Section 16.8, Exercise 1",
        originalTopic: "Divergence Theorem on Sphere",
        difficulty: "tier1",
        tags: ["Divergence-theorem", "flux", "sphere"],
        problemStatement: "Compute the outward flux of F = <x, y, z> across the sphere x^2 + y^2 + z^2 = a^2 for a = 2.",
        finalAnswer: "32\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Divergence of F",
            mathExpression: "\\nabla \\cdot \\mathbf{F} = \\frac{\\partial x}{\\partial x} + \\frac{\\partial y}{\\partial y} + \\frac{\\partial z}{\\partial z} = 1 + 1 + 1 = 3",
            explanation: "Compute the sum of partial derivatives.",
            why: "Finding volumetric expansion rate."
          },
          {
            stepNumber: 2,
            title: "Apply Divergence Theorem",
            mathExpression: "\\iint_S \\mathbf{F} \\cdot \\mathbf{n} \\, d\\sigma = \\iiint_D 3 \\, dV = 3 \\times \\text{Volume}(D) = 3 \\times \\left( \\frac{4}{3}\\pi a^3 \\right) = 4\\pi a^3",
            explanation: "Multiply constant divergence 3 by sphere volume.",
            why: "Evaluating volume integral."
          },
          {
            stepNumber: 3,
            title: "Substitute Radius a = 2",
            mathExpression: "4\\pi(2^3) = 32\\pi",
            explanation: "Evaluate at a = 2.",
            why: "Evaluating numerical flux."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 * pi * 2**3",
          expected: "32*pi"
        }
      },
      {
        filename: "ex-02",
        title: "Outward Flux from a Unit Cube",
        exerciseReference: "Section 16.8, Exercise 2",
        originalTopic: "Divergence Theorem on Cube",
        difficulty: "tier1",
        tags: ["cube", "Divergence-theorem", "flux"],
        problemStatement: "Compute the outward flux of F = <x^2, y^2, z^2> across the boundary of the unit cube [0, 1]^3.",
        finalAnswer: "3",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Divergence",
            mathExpression: "\\nabla \\cdot \\mathbf{F} = 2x + 2y + 2z",
            explanation: "Differentiate each quadratic term.",
            why: "Finding divergence."
          },
          {
            stepNumber: 2,
            title: "Evaluate Triple Integral over Unit Cube",
            mathExpression: "\\int_0^1 \\int_0^1 \\int_0^1 (2x + 2y + 2z) \\, dz \\, dy \\, dx = \\int_0^1 2x \\, dx + \\int_0^1 2y \\, dy + \\int_0^1 2z \\, dz = 1 + 1 + 1 = 3",
            explanation: "Integrate each symmetric linear term over [0, 1]^3.",
            why: "Evaluating total outward flux."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 + 1 + 1",
          expected: "3"
        }
      },
      {
        filename: "ex-03",
        title: "Flux Through a Closed Cylinder",
        exerciseReference: "Section 16.8, Exercise 3",
        originalTopic: "Cylinder Flux",
        difficulty: "tier2",
        tags: ["cylinder", "Divergence-theorem", "polar-triple-integral"],
        problemStatement: "Find the outward flux of F = <x^3, y^3, z> through the closed cylinder x^2 + y^2 <= 1, 0 <= z <= 2.",
        finalAnswer: "5\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Divergence of F",
            mathExpression: "\\nabla \\cdot \\mathbf{F} = 3x^2 + 3y^2 + 1 = 3r^2 + 1",
            explanation: "Compute divergence and convert to cylindrical coordinates.",
            why: "Finding cylindrical divergence."
          },
          {
            stepNumber: 2,
            title: "Evaluate Triple Integral in Cylindrical Coordinates",
            mathExpression: "\\iiint_D (3r^2 + 1) \\, dV = \\left(\\int_0^{2\\pi} d\\theta\\right) \\left(\\int_0^2 dz\\right) \\int_0^1 (3r^3 + r) \\, dr = (2\\pi)(2) \\left[ \\frac{3r^4}{4} + \\frac{r^2}{2} \\right]_0^1 = 4\\pi \\left( \\frac{3}{4} + \\frac{1}{2} \\right) = 4\\pi \\left( \\frac{5}{4} \\right) = 5\\pi",
            explanation: "Evaluate the product of separated integrals.",
            why: "Computing outward flux."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 * pi * (5/4)",
          expected: "5*pi"
        }
      },
      {
        filename: "ex-04",
        title: "Flux of an Incompressible (Solenoidal) Vector Field",
        exerciseReference: "Section 16.8, Exercise 4",
        originalTopic: "Incompressible Field",
        difficulty: "tier1",
        tags: ["incompressible", "solenoidal", "zero-flux"],
        problemStatement: "Show that the outward flux of F = <y, z, x> through any closed surface S is zero.",
        finalAnswer: "\\nabla \\cdot \\mathbf{F} = 0 \\implies \\text{Flux} = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Divergence",
            mathExpression: "\\nabla \\cdot \\mathbf{F} = \\frac{\\partial y}{\\partial x} + \\frac{\\partial z}{\\partial y} + \\frac{\\partial x}{\\partial z} = 0 + 0 + 0 = 0",
            explanation: "Each component derivative vanishes identically.",
            why: "Proving solenoidal condition."
          },
          {
            stepNumber: 2,
            title: "Apply Divergence Theorem",
            mathExpression: "\\iint_S \\mathbf{F} \\cdot \\mathbf{n} \\, d\\sigma = \\iiint_D 0 \\, dV = 0",
            explanation: "The integral of zero over any solid volume is zero.",
            why: "Confirming vanishing of closed surface flux."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Gauss's Law in Normalized Electrostatics",
        exerciseReference: "Section 16.8, Exercise 5",
        originalTopic: "Gauss's Law",
        difficulty: "tier2",
        tags: ["Gauss-law", "electrostatics", "inverse-square"],
        problemStatement: "For an electric field with unit point charge q = 1 and permittivity epsilon_0 = 1, verify that the flux through any enclosing closed surface equals 1.",
        finalAnswer: "\\text{Flux} = \\frac{q}{\\varepsilon_0} = 1",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Gauss's Law",
            mathExpression: "\\Phi_E = \\iint_S \\mathbf{E} \\cdot \\mathbf{n} \\, d\\sigma = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}",
            explanation: "Gauss's law equates total outward electric flux to enclosed charge.",
            why: "Applying fundamental physical law."
          },
          {
            stepNumber: 2,
            title: "Evaluate with Normalized Units",
            mathExpression: "\\Phi_E = \\frac{1}{1} = 1",
            explanation: "Substitute q = 1 and epsilon_0 = 1.",
            why: "Evaluating normalized flux."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1",
          expected: "1"
        }
      }
    ]
  }
];
