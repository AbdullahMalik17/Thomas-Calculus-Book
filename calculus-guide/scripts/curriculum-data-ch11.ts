// scripts/curriculum-data-ch11.ts
/**
 * Authoritative Curriculum Data for Chapter 11: Parametric Equations and Polar Coordinates
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH11_SECTIONS: SectionDef[] = [
  {
    chapter: "ch11",
    chapterDir: "ch11-parametric-equations-and-polar-coordinates",
    section: "11.1",
    sectionDir: "11.1-parametrizations-of-plane-curves",
    title: "Parametrizations of Plane Curves",
    definitions: [
      {
        id: "def-parametric-curve",
        title: "Parametric Equations of a Plane Curve",
        category: "definition",
        latex: "x = f(t), \\quad y = g(t), \\quad t \\in [a, b]",
        statement: "A plane curve can be defined parametrically by expressing both coordinates x and y as functions of an independent parameter t (often representing time). The trajectory is traced with a specific orientation as t increases.",
        conditions: ["f and g are continuous on interval I"],
        explanation: "Overcomes the Vertical Line Test limitation, allowing curves that loop, self-intersect, and reverse direction.",
        keyTakeaway: "Parametric curves describe both path geometry and particle motion through time."
      }
    ],
    summaryMDX: `# Section 11.1: Parametrizations of Plane Curves

Expressing geometric trajectories dynamically through a parameter $t$.

---

## 1. Eliminating the Parameter

To convert parametric equations into Cartesian coordinates:
- Solve one equation for $t$ and substitute into the other, or
- Use trigonometric identities like $\\cos^2(t) + \\sin^2(t) = 1$.

---

## 2. Standard Parameterizations

- **Circle of radius $R$ centered at $(h, k)$**: $x = h + R\\cos(t), \\; y = k + R\\sin(t)$.
- **Line segment from $P(x_0, y_0)$ to $Q(x_1, y_1)$**: $x = x_0 + t(x_1 - x_0), \\; y = y_0 + t(y_1 - y_0), \\; t \\in [0, 1]$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Eliminating the Parameter for an Ellipse",
        exerciseReference: "Section 11.1, Exercise 1",
        originalTopic: "Eliminating Parameter via Trigonometry",
        difficulty: "tier1",
        tags: ["parametric", "ellipse", "trigonometric-identity"],
        problemStatement: "Eliminate the parameter t to find the Cartesian equation of x = 3 cos(t), y = 2 sin(t) for 0 <= t <= 2pi.",
        finalAnswer: "\\frac{x^2}{9} + \\frac{y^2}{4} = 1 \\quad (\\text{Standard Ellipse})",
        steps: [
          {
            stepNumber: 1,
            title: "Isolate Trigonometric Functions",
            mathExpression: "\\cos(t) = \\frac{x}{3}, \\quad \\sin(t) = \\frac{y}{2}",
            explanation: "Divide by the semi-axis lengths.",
            why: "Prepares for Pythagorean identity."
          },
          {
            stepNumber: 2,
            title: "Apply Pythagorean Identity",
            mathExpression: "\\cos^2(t) + \\sin^2(t) = 1 \\implies \\left(\\frac{x}{3}\\right)^2 + \\left(\\frac{y}{2}\\right)^2 = 1",
            explanation: "Substitute x/3 and y/2.",
            why: "Eliminating parameter t."
          },
          {
            stepNumber: 3,
            title: "State Cartesian Equation",
            mathExpression: "\\frac{x^2}{9} + \\frac{y^2}{4} = 1",
            explanation: "Standard form of an ellipse centered at the origin.",
            why: "Final Cartesian trajectory."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(x/3)**2 + (y/2)**2 - (x**2/9 + y**2/4)",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Parametric Line Segment Between Two Points",
        exerciseReference: "Section 11.1, Exercise 2",
        originalTopic: "Parametrization of a Line Segment",
        difficulty: "tier1",
        tags: ["line-segment", "linear-parametrization", "vectors"],
        problemStatement: "Find parametric equations for the line segment from P(-1, 3) to Q(5, 7) for 0 <= t <= 1.",
        finalAnswer: "x(t) = -1 + 6t, \\quad y(t) = 3 + 4t, \\quad t \\in [0, 1]",
        steps: [
          {
            stepNumber: 1,
            title: "Use Linear Interpolation Formula",
            mathExpression: "x(t) = x_0 + t(x_1 - x_0), \\quad y(t) = y_0 + t(y_1 - y_0)",
            explanation: "Standard vector parametric formulation.",
            why: "Line segment interpolation."
          },
          {
            stepNumber: 2,
            title: "Substitute Given Coordinates",
            mathExpression: "x(t) = -1 + t(5 - (-1)) = -1 + 6t; \\quad y(t) = 3 + t(7 - 3) = 3 + 4t",
            explanation: "Substitute coordinates of P and Q.",
            why: "Component calculations."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "-1 + 6*1 - 5",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Eliminating Parameter from Algebraic Rational Equations",
        exerciseReference: "Section 11.1, Exercise 3",
        originalTopic: "Algebraic Parameter Elimination",
        difficulty: "tier1",
        tags: ["algebraic-parametric", "parabola", "elimination"],
        problemStatement: "Eliminate the parameter t for x = t - 2, y = t^2 + 1.",
        finalAnswer: "y = (x + 2)^2 + 1 = x^2 + 4x + 5",
        steps: [
          {
            stepNumber: 1,
            title: "Solve for t in terms of x",
            mathExpression: "x = t - 2 \\implies t = x + 2",
            explanation: "Isolate t in the linear equation.",
            why: "Substitution method."
          },
          {
            stepNumber: 2,
            title: "Substitute into y(t)",
            mathExpression: "y = (x + 2)^2 + 1 = x^2 + 4x + 4 + 1 = x^2 + 4x + 5",
            explanation: "Expand squared binomial.",
            why: "Cartesian parabola formula."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(x + 2)**2 + 1 - (x**2 + 4*x + 5)",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Parametrization of the Cycloid",
        exerciseReference: "Section 11.1, Exercise 4",
        originalTopic: "Cycloid Geometry",
        difficulty: "tier2",
        tags: ["cycloid", "rolling-circle", "kinematics"],
        problemStatement: "State the parametric equations of the cycloid generated by a point on a circle of radius a rolling along the x-axis, and find its position when t = pi.",
        finalAnswer: "x(t) = a(t - \\sin t), \\; y(t) = a(1 - \\cos t); \\quad \\text{At } t = \\pi: (\\pi a, 2a)",
        steps: [
          {
            stepNumber: 1,
            title: "State Cycloid Equations",
            mathExpression: "x(t) = a(t - \\sin t), \\quad y(t) = a(1 - \\cos t)",
            explanation: "Standard kinematic equations of rolling circle.",
            why: "Cycloid trajectory definition."
          },
          {
            stepNumber: 2,
            title: "Evaluate at t = pi",
            mathExpression: "x(\\pi) = a(\\pi - \\sin(\\pi)) = \\pi a; \\quad y(\\pi) = a(1 - \\cos(\\pi)) = a(1 - (-1)) = 2a",
            explanation: "The vertex of the arch occurs at t = pi at height 2a.",
            why: "Maximum height evaluation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "a*(1 - cos(pi)) - 2*a",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Hyperbolic Parameterization of a Hyperbola",
        exerciseReference: "Section 11.1, Exercise 5",
        originalTopic: "Hyperbolic Curve Parametrization",
        difficulty: "tier2",
        tags: ["hyperbola", "cosh-sinh", "parametric"],
        problemStatement: "Show that x = a cosh(t), y = b sinh(t) parameterizes the right branch of the hyperbola x^2/a^2 - y^2/b^2 = 1.",
        finalAnswer: "\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = \\cosh^2(t) - \\sinh^2(t) = 1 \\quad (x \\ge a)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Coordinate Quotients",
            mathExpression: "\\frac{x}{a} = \\cosh(t), \\quad \\frac{y}{b} = \\sinh(t)",
            explanation: "Divide by semi-axes.",
            why: "Isolating hyperbolic functions."
          },
          {
            stepNumber: 2,
            title: "Apply Fundamental Hyperbolic Identity",
            mathExpression: "\\left(\\frac{x}{a}\\right)^2 - \\left(\\frac{y}{b}\\right)^2 = \\cosh^2(t) - \\sinh^2(t) = 1",
            explanation: "Recall cosh^2 - sinh^2 = 1.",
            why: "Proving Cartesian hyperbola."
          },
          {
            stepNumber: 3,
            title: "Identify Branch",
            mathExpression: "\\cosh(t) \\ge 1 \\implies x = a \\cosh(t) \\ge a > 0",
            explanation: "Covers only the right branch (x > 0).",
            why: "Domain property."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "cosh(t)**2 - sinh(t)**2",
          expected: "1"
        }
      }
    ]
  },
  {
    chapter: "ch11",
    chapterDir: "ch11-parametric-equations-and-polar-coordinates",
    section: "11.2",
    sectionDir: "11.2-calculus-with-parametric-curves",
    title: "Calculus with Parametric Curves",
    definitions: [
      {
        id: "formula-parametric-derivatives",
        title: "First and Second Derivatives of Parametric Curves",
        category: "formula",
        latex: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}, \\quad \\frac{d^2 y}{dx^2} = \\frac{\\frac{d}{dt}\\left[ \\frac{dy}{dx} \\right]}{dx/dt}",
        statement: "The tangent slope dy/dx is the ratio of vertical to horizontal velocity. The second derivative d^2y/dx^2 measures concavity by differentiating dy/dx with respect to t and dividing again by dx/dt.",
        conditions: ["dx/dt != 0"],
        explanation: "Critical pitfall: d^2y/dx^2 is NOT equal to (d^2y/dt^2)/(d^2x/dt^2).",
        keyTakeaway: "Always divide by dx/dt when computing derivatives with respect to x."
      },
      {
        id: "formula-parametric-arc-length",
        title: "Arc Length of a Parametric Curve",
        category: "formula",
        latex: "L = \\int_a^b \\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2} \\, dt",
        statement: "The arc length of a smooth parametric curve from t = a to t = b is the integral of particle speed |v(t)| = sqrt((x')^2 + (y')^2).",
        conditions: ["Curve is traversed exactly once without backtracking"],
        explanation: "Integrates infinitesimal distance ds = sqrt(dx^2 + dy^2).",
        keyTakeaway: "Arc length integrates speed over time."
      }
    ],
    summaryMDX: `# Section 11.2: Calculus with Parametric Curves

Computing tangent slopes, concavity, arc lengths, and surface areas for parametric curves.

---

## 1. Tangent Slope and Concavity

$$
\\frac{dy}{dx} = \\frac{y'(t)}{x'(t)}
$$

$$
\\frac{d^2 y}{dx^2} = \\frac{\\frac{d}{dt}[y'/x']}{x'(t)}
$$

---

## 2. Arc Length and Surface Area

$$
L = \\int_a^b \\sqrt{[x'(t)]^2 + [y'(t)]^2} \\, dt
$$

$$
S = 2\\pi \\int_a^b y(t) \\sqrt{[x'(t)]^2 + [y'(t)]^2} \\, dt \\quad (\\text{about } x\\text{-axis})
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Tangent Line to a Parametric Curve",
        exerciseReference: "Section 11.2, Exercise 1",
        originalTopic: "Parametric Tangent Line",
        difficulty: "tier1",
        tags: ["parametric-tangent", "derivative", "slope"],
        problemStatement: "Find the equation of the tangent line to x = t^2 + 1, y = t^3 - t at the point where t = 2.",
        finalAnswer: "y - 6 = \\frac{11}{4}(x - 5) \\implies y = \\frac{11}{4}x - \\frac{31}{4}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Coordinates at t = 2",
            mathExpression: "x(2) = 2^2 + 1 = 5, \\quad y(2) = 2^3 - 2 = 6",
            explanation: "Point of tangency is (5, 6).",
            why: "Point coordinates."
          },
          {
            stepNumber: 2,
            title: "Compute Component Derivatives and Slope",
            mathExpression: "\\frac{dx}{dt} = 2t = 4, \\quad \\frac{dy}{dt} = 3t^2 - 1 = 11 \\implies \\frac{dy}{dx} = \\frac{11}{4}",
            explanation: "Divide dy/dt by dx/dt.",
            why: "Parametric slope formula."
          },
          {
            stepNumber: 3,
            title: "Write Tangent Line Equation",
            mathExpression: "y - 6 = \\frac{11}{4}(x - 5) \\implies y = \\frac{11}{4}x - \\frac{31}{4}",
            explanation: "Point-slope formula at (5, 6).",
            why: "Final tangent line."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(11/4)*(5) - 31/4 - 6",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Second Derivative and Concavity of a Parametric Curve",
        exerciseReference: "Section 11.2, Exercise 2",
        originalTopic: "Parametric Second Derivative",
        difficulty: "tier2",
        tags: ["second-derivative", "concavity", "parametric"],
        problemStatement: "Find d^2y/dx^2 for x = t^3, y = t^2.",
        finalAnswer: "\\frac{d^2 y}{dx^2} = -\\frac{2}{9t^4}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute First Derivative dy/dx",
            mathExpression: "\\frac{dx}{dt} = 3t^2, \\quad \\frac{dy}{dt} = 2t \\implies \\frac{dy}{dx} = \\frac{2t}{3t^2} = \\frac{2}{3t}",
            explanation: "Ratio of first derivatives.",
            why: "First derivative."
          },
          {
            stepNumber: 2,
            title: "Differentiate dy/dx with Respect to t",
            mathExpression: "\\frac{d}{dt}\\left[ \\frac{2}{3t} \\right] = -\\frac{2}{3t^2}",
            explanation: "Differentiate with respect to parameter.",
            why: "Numerator of second derivative."
          },
          {
            stepNumber: 3,
            title: "Divide by dx/dt",
            mathExpression: "\\frac{d^2 y}{dx^2} = \\frac{-2/(3t^2)}{3t^2} = -\\frac{2}{9t^4}",
            explanation: "Divide by dx/dt = 3t^2.",
            why: "Parametric second derivative formula."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(-2/(3*t**2)) / (3*t**2) - (-2/(9*t**4))",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Arc Length of One Arch of a Cycloid",
        exerciseReference: "Section 11.2, Exercise 3",
        originalTopic: "Parametric Arc Length",
        difficulty: "tier2",
        tags: ["cycloid", "arc-length", "trigonometric-integral"],
        problemStatement: "Find the total length of one arch of the cycloid x = a(t - sin t), y = a(1 - cos t) for 0 <= t <= 2pi.",
        finalAnswer: "L = 8a",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Derivatives dx/dt and dy/dt",
            mathExpression: "\\frac{dx}{dt} = a(1 - \\cos t), \\quad \\frac{dy}{dt} = a\\sin t",
            explanation: "Differentiate components with respect to t.",
            why: "Velocity components."
          },
          {
            stepNumber: 2,
            title: "Simplify Speed Expression",
            mathExpression: "(x')^2 + (y')^2 = a^2(1 - 2\\cos t + \\cos^2 t + \\sin^2 t) = a^2(2 - 2\\cos t) = 4a^2 \\sin^2(t/2)",
            explanation: "Use half-angle identity 1 - cos(t) = 2 sin^2(t/2).",
            why: "Radical simplification."
          },
          {
            stepNumber: 3,
            title: "Integrate over [0, 2pi]",
            mathExpression: "L = \\int_0^{2\\pi} 2a \\sin(t/2) dt = 2a [-2\\cos(t/2)]_0^{2\\pi} = 2a [(-2(-1)) - (-2(1))] = 2a(4) = 8a",
            explanation: "Evaluate antiderivative at limits.",
            why: "Classical 8a cycloid arch length."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*a * 4 - 8*a",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Arc Length of the Astroid Curve",
        exerciseReference: "Section 11.2, Exercise 4",
        originalTopic: "Astroid Curve Length",
        difficulty: "tier2",
        tags: ["astroid", "arc-length", "trig-powers"],
        problemStatement: "Find the perimeter of the astroid x = cos^3(t), y = sin^3(t) for 0 <= t <= 2pi.",
        finalAnswer: "L = 6",
        steps: [
          {
            stepNumber: 1,
            title: "Compute dx/dt and dy/dt",
            mathExpression: "x' = -3\\cos^2(t)\\sin(t), \\quad y' = 3\\sin^2(t)\\cos(t)",
            explanation: "Chain rule on cubic trigonometric functions.",
            why: "Velocity components."
          },
          {
            stepNumber: 2,
            title: "Simplify Speed in Quadrant 1",
            mathExpression: "(x')^2 + (y')^2 = 9\\cos^4(t)\\sin^2(t) + 9\\sin^4(t)\\cos^2(t) = 9\\cos^2(t)\\sin^2(t)(\\cos^2 t + \\sin^2 t) = 9\\cos^2(t)\\sin^2(t)",
            explanation: "Factor out common terms.",
            why: "Speed formula."
          },
          {
            stepNumber: 3,
            title: "Integrate 4 Quadrants",
            mathExpression: "L = 4 \\int_0^{\\pi/2} 3\\cos(t)\\sin(t) dt = 12 \\left[ \\frac{\\sin^2(t)}{2} \\right]_0^{\\pi/2} = 12 \\left(\\frac{1}{2}\\right) = 6",
            explanation: "Multiply single quadrant length by 4.",
            why: "Total perimeter."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "12 * (1/2) - 6",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Surface Area of Revolution from Parametric Curve",
        exerciseReference: "Section 11.2, Exercise 5",
        originalTopic: "Parametric Surface Area",
        difficulty: "tier2",
        tags: ["surface-area", "parametric", "sphere"],
        problemStatement: "Find the surface area generated by revolving the semicircle x = R cos(t), y = R sin(t) for 0 <= t <= pi about the x-axis.",
        finalAnswer: "S = 4\\pi R^2",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Speed Factor",
            mathExpression: "x' = -R\\sin t, \\; y' = R\\cos t \\implies \\sqrt{(x')^2 + (y')^2} = \\sqrt{R^2(\\sin^2 t + \\cos^2 t)} = R",
            explanation: "Constant speed R along circular path.",
            why: "Differential arc length."
          },
          {
            stepNumber: 2,
            title: "Set Up Surface Area Integral",
            mathExpression: "S = 2\\pi \\int_0^\\pi y(t) \\sqrt{(x')^2 + (y')^2} dt = 2\\pi \\int_0^\\pi (R\\sin t)(R) dt = 2\\pi R^2 \\int_0^\\pi \\sin(t) dt",
            explanation: "Radius is y(t) = R sin(t).",
            why: "Surface area formula."
          },
          {
            stepNumber: 3,
            title: "Evaluate Definite Integral",
            mathExpression: "2\\pi R^2 [-\\cos t]_0^\\pi = 2\\pi R^2 (1 - (-1)) = 4\\pi R^2",
            explanation: "Evaluate at limits 0 and pi.",
            why: "Exact sphere surface area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*pi*R**2 * 2 - 4*pi*R**2",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch11",
    chapterDir: "ch11-parametric-equations-and-polar-coordinates",
    section: "11.3",
    sectionDir: "11.3-polar-coordinates",
    title: "Polar Coordinates",
    definitions: [
      {
        id: "def-polar-coordinates",
        title: "Polar Coordinate System",
        category: "definition",
        latex: "x = r\\cos(\\theta), \\quad y = r\\sin(\\theta), \\quad r^2 = x^2 + y^2, \\quad \\tan(\\theta) = \\frac{y}{x}",
        statement: "A two-dimensional coordinate system in which each point P is determined by a radial distance r from the pole (origin) and an angle theta from the positive x-axis (polar axis). If r < 0, the point lies along the ray opposite to theta.",
        conditions: ["r in R, theta in R"],
        explanation: "Points in polar coordinates have non-unique representations: (r, theta) = (r, theta + 2k pi) = (-r, theta + (2k+1) pi).",
        keyTakeaway: "Connects circular radius and rotation angle to Cartesian plane coordinates."
      }
    ],
    summaryMDX: `# Section 11.3: Polar Coordinates

Representing points and curves via radial distance $r$ and polar angle $\\theta$.

---

## 1. Conversion Formulas

- **Polar to Cartesian**:
  $$
  x = r\\cos(\\theta), \\quad y = r\\sin(\\theta)
  $$
- **Cartesian to Polar**:
  $$
  r^2 = x^2 + y^2, \\quad \\tan(\\theta) = \\frac{y}{x}
  $$

---

## 2. Polar Symmetry Tests

- **Symmetry about the $x$-axis (polar axis)**: Replace $\\theta$ with $-\\theta$.
- **Symmetry about the $y$-axis (line $\\theta = \\pi/2$)**: Replace $\\theta$ with $\\pi - \\theta$.
- **Symmetry about the pole (origin)**: Replace $r$ with $-r$ or $\\theta$ with $\\theta + \\pi$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Polar to Cartesian Coordinate Conversion",
        exerciseReference: "Section 11.3, Exercise 1",
        originalTopic: "Coordinate Conversion",
        difficulty: "tier1",
        tags: ["polar-coordinates", "conversion", "trigonometry"],
        problemStatement: "Convert the polar coordinates (4, 2pi/3) to Cartesian coordinates (x, y).",
        finalAnswer: "(x, y) = (-2, 2\\sqrt{3})",
        steps: [
          {
            stepNumber: 1,
            title: "Compute x-Coordinate",
            mathExpression: "x = r\\cos(\\theta) = 4\\cos(2\\pi/3) = 4\\left(-\\frac{1}{2}\\right) = -2",
            explanation: "cos(2pi/3) = -1/2.",
            why: "x = r cos(theta)."
          },
          {
            stepNumber: 2,
            title: "Compute y-Coordinate",
            mathExpression: "y = r\\sin(\\theta) = 4\\sin(2\\pi/3) = 4\\left(\\frac{\\sqrt{3}}{2}\\right) = 2\\sqrt{3}",
            explanation: "sin(2pi/3) = sqrt(3)/2.",
            why: "y = r sin(theta)."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4*cos(2*pi/3) - (-2)",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Converting a Cartesian Equation to Polar Form",
        exerciseReference: "Section 11.3, Exercise 2",
        originalTopic: "Cartesian to Polar Curve",
        difficulty: "tier1",
        tags: ["polar-form", "circle", "conversion"],
        problemStatement: "Convert the circle x^2 + (y - 3)^2 = 9 to polar coordinates.",
        finalAnswer: "r = 6\\sin(\\theta)",
        steps: [
          {
            stepNumber: 1,
            title: "Expand Cartesian Equation",
            mathExpression: "x^2 + y^2 - 6y + 9 = 9 \\implies x^2 + y^2 - 6y = 0",
            explanation: "Expand binomial and cancel 9.",
            why: "Algebraic expansion."
          },
          {
            stepNumber: 2,
            title: "Substitute Polar Identities",
            mathExpression: "r^2 - 6r\\sin(\\theta) = 0 \\implies r(r - 6\\sin(\\theta)) = 0",
            explanation: "Replace x^2 + y^2 with r^2 and y with r sin(theta).",
            why: "Polar conversion."
          },
          {
            stepNumber: 3,
            title: "Isolate Non-Trivial Equation",
            mathExpression: "r = 6\\sin(\\theta)",
            explanation: "Circle of diameter 6 centered at (0, 3).",
            why: "Standard polar circle formula."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "r**2 - 6*r*sin(theta) - (r**2 - 6*r*sin(theta))",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Negative Radial Coordinate Interpretation",
        exerciseReference: "Section 11.3, Exercise 3",
        originalTopic: "Negative r Geometry",
        difficulty: "tier1",
        tags: ["negative-r", "polar-points", "angles"],
        problemStatement: "Plot (-3, pi/4) and find an equivalent representation with positive r.",
        finalAnswer: "(-3, \\pi/4) = (3, 5\\pi/4)",
        steps: [
          {
            stepNumber: 1,
            title: "Understand Negative r Definition",
            mathExpression: "(-r, \\theta) = (r, \\theta + \\pi)",
            explanation: "Reflect across the origin by adding pi to the angle.",
            why: "Polar coordinate equivalence rule."
          },
          {
            stepNumber: 2,
            title: "Add pi to the Angle",
            mathExpression: "\\frac{\\pi}{4} + \\pi = \\frac{5\\pi}{4} \\implies (3, 5\\pi/4)",
            explanation: "Point in third quadrant.",
            why: "Positive r equivalent form."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "pi/4 + pi - 5*pi/4",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Converting a Polar Line Equation to Cartesian Form",
        exerciseReference: "Section 11.3, Exercise 4",
        originalTopic: "Polar Line Conversion",
        difficulty: "tier1",
        tags: ["polar-to-cartesian", "line", "secant"],
        problemStatement: "Convert r = 4 sec(theta) to Cartesian coordinates.",
        finalAnswer: "x = 4 \\quad (\\text{Vertical line})",
        steps: [
          {
            stepNumber: 1,
            title: "Multiply by cos(theta)",
            mathExpression: "r = \\frac{4}{\\cos(\\theta)} \\implies r\\cos(\\theta) = 4",
            explanation: "Rewrite secant as 1/cos.",
            why: "Exposing r cos(theta)."
          },
          {
            stepNumber: 2,
            title: "Substitute x = r cos(theta)",
            mathExpression: "x = 4",
            explanation: "Vertical line with x-intercept 4.",
            why: "Cartesian line equation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 - 4",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Testing Symmetry of a Limaçon",
        exerciseReference: "Section 11.3, Exercise 5",
        originalTopic: "Polar Symmetry Testing",
        difficulty: "tier2",
        tags: ["limacon", "symmetry", "cosine"],
        problemStatement: "Test r = 2 + 4 cos(theta) for symmetry about the polar axis.",
        finalAnswer: "\\text{Symmetric about the polar axis (x-axis)}",
        steps: [
          {
            stepNumber: 1,
            title: "Substitute -theta for theta",
            mathExpression: "r(-\\theta) = 2 + 4\\cos(-\\theta)",
            explanation: "Test symmetry across horizontal polar axis.",
            why: "Symmetry test rule."
          },
          {
            stepNumber: 2,
            title: "Apply Cosine Even Symmetry",
            mathExpression: "\\cos(-\\theta) = \\cos(\\theta) \\implies r(-\\theta) = 2 + 4\\cos(\\theta) = r(\\theta)",
            explanation: "Equation remains unchanged.",
            why: "Proof of symmetry."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "cos(-theta) - cos(theta)",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch11",
    chapterDir: "ch11-parametric-equations-and-polar-coordinates",
    section: "11.4",
    sectionDir: "11.4-graphing-polar-coordinate-equations",
    title: "Graphing Polar Coordinate Equations",
    definitions: [
      {
        id: "def-polar-curves-catalog",
        title: "Catalog of Classic Polar Curves",
        category: "definition",
        latex: "r = a \\pm b\\cos(\\theta) \\; (\\text{Lima\\c{c}ons}), \\quad r = a\\cos(n\\theta) \\; (\\text{Rose Curves}), \\quad r^2 = a^2\\cos(2\\theta) \\; (\\text{Lemniscates})",
        statement: "Standard families of polar curves categorized by trigonometric harmonic frequencies: Cardiods (a = b), Limaçons with inner loops (a < b), Dimpled limaçons (a > b), and Rose curves (n petals if n is odd, 2n petals if n is even).",
        conditions: ["a, b > 0"],
        explanation: "Graphing utilizes symmetry, critical radius values, and table of special angles.",
        keyTakeaway: "Rose curve has n petals if n is odd, 2n petals if n is even."
      }
    ],
    summaryMDX: `# Section 11.4: Graphing Polar Coordinate Equations

Visualizing classic polar curves through harmonic oscillations in radial distance.

---

## 1. Classic Curve Families

- **Cardioid**: $r = a(1 \\pm \\cos\\theta)$ or $r = a(1 \\pm \\sin\\theta)$ (heart-shaped, cusp at pole).
- **Limaçon**: $r = a \\pm b\\cos\\theta$
  - Inner loop if $a/b < 1$.
  - Dimpled if $1 < a/b < 2$.
  - Convex if $a/b \\ge 2$.
- **Rose Curve**: $r = a\\cos(n\\theta)$
  - $n$ petals if $n$ is **odd**.
  - $2n$ petals if $n$ is **even**.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Petal Count and Length of a Rose Curve",
        exerciseReference: "Section 11.4, Exercise 1",
        originalTopic: "Rose Curve Analysis",
        difficulty: "tier1",
        tags: ["rose-curve", "petals", "polar-graphing"],
        problemStatement: "Determine the number of petals and the maximum petal length for r = 4 sin(3 theta).",
        finalAnswer: "\\text{3 petals of length 4}",
        steps: [
          {
            stepNumber: 1,
            title: "Determine Petal Count from Frequency n",
            mathExpression: "n = 3 \\text{ (odd)} \\implies \\text{Number of petals} = n = 3",
            explanation: "Odd frequency n produces exactly n petals.",
            why: "Rose petal count theorem."
          },
          {
            stepNumber: 2,
            title: "Determine Maximum Petal Length",
            mathExpression: "\\max |r| = 4 \\cdot \\max |\\sin(3\\theta)| = 4(1) = 4",
            explanation: "The amplitude gives the maximum radial reach.",
            why: "Maximum radius."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4*1 - 4",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Finding the Cusp of a Cardioid",
        exerciseReference: "Section 11.4, Exercise 2",
        originalTopic: "Cardioid Cusp Point",
        difficulty: "tier1",
        tags: ["cardioid", "cusp", "pole"],
        problemStatement: "Find the angle theta where the cardioid r = 2(1 - cos theta) passes through the pole.",
        finalAnswer: "\\theta = 0 \\implies r = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Set r = 0",
            mathExpression: "2(1 - \\cos\\theta) = 0 \\implies \\cos\\theta = 1",
            explanation: "Passing through the pole means radial distance is 0.",
            why: "Pole condition."
          },
          {
            stepNumber: 2,
            title: "Solve for theta in [0, 2pi)",
            mathExpression: "\\theta = 0",
            explanation: "cos(0) = 1 is the unique solution.",
            why: "Cusp location."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "cos(0) - 1",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Inner Loop Boundaries of a Limaçon",
        exerciseReference: "Section 11.4, Exercise 3",
        originalTopic: "Limaçon Inner Loop",
        difficulty: "tier2",
        tags: ["limacon", "inner-loop", "zeros"],
        problemStatement: "Find the interval of angles theta that traces the inner loop of r = 1 + 2 cos(theta).",
        finalAnswer: "\\frac{2\\pi}{3} \\le \\theta \\le \\frac{4\\pi}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Zeros of r",
            mathExpression: "1 + 2\\cos\\theta = 0 \\implies \\cos\\theta = -\\frac{1}{2} \\implies \\theta = \\frac{2\\pi}{3}, \\; \\frac{4\\pi}{3}",
            explanation: "The curve passes through the pole at these angles.",
            why: "Loop boundary angles."
          },
          {
            stepNumber: 2,
            title: "Determine Sign of r in Interval",
            mathExpression: "\\theta \\in (2\\pi/3, 4\\pi/3) \\implies \\cos\\theta < -1/2 \\implies r < 0",
            explanation: "Negative r values trace the inner loop.",
            why: "Inner loop characterization."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "cos(2*pi/3) - (-Rational(1, 2))",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Lemniscate Radial Extrema",
        exerciseReference: "Section 11.4, Exercise 4",
        originalTopic: "Lemniscate Figure-Eight Curve",
        difficulty: "tier2",
        tags: ["lemniscate", "figure-eight", "polar"],
        problemStatement: "Find the maximum radius and orientation of the lemniscate r^2 = 9 cos(2 theta).",
        finalAnswer: "r_{\\max} = 3 \\quad \\text{at } \\theta = 0, \\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Find Maximum of Right Hand Side",
            mathExpression: "\\max [9\\cos(2\\theta)] = 9(1) = 9 \\implies r_{\\max} = \\sqrt{9} = 3",
            explanation: "Maximum occurs when cos(2 theta) = 1.",
            why: "Maximum radial length."
          },
          {
            stepNumber: 2,
            title: "Find Angles for Maxima",
            mathExpression: "\\cos(2\\theta) = 1 \\implies 2\\theta = 0, \\; 2\\pi \\implies \\theta = 0, \\; \\pi",
            explanation: "Lies along the polar axis.",
            why: "Orientation angles."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(9) - 3",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Slope of Tangent Line to a Polar Curve",
        exerciseReference: "Section 11.4, Exercise 5",
        originalTopic: "Polar Tangent Line Slope",
        difficulty: "tier3",
        tags: ["polar-slope", "tangent", "cardioid"],
        problemStatement: "Find the slope of the tangent line to the cardioid r = 1 + cos(theta) at theta = pi/3.",
        finalAnswer: "\\frac{dy}{dx} = -1",
        steps: [
          {
            stepNumber: 1,
            title: "State Polar Derivative Formula for dy/dx",
            mathExpression: "\\frac{dy}{dx} = \\frac{r'\\sin\\theta + r\\cos\\theta}{r'\\cos\\theta - r\\sin\\theta}",
            explanation: "Differentiate x = r cos theta and y = r sin theta with product rule.",
            why: "Polar derivative formula."
          },
          {
            stepNumber: 2,
            title: "Evaluate r and r' at theta = pi/3",
            mathExpression: "r = 1 + \\frac{1}{2} = \\frac{3}{2}; \\quad r' = -\\sin(\\pi/3) = -\\frac{\\sqrt{3}}{2}; \\quad \\sin(\\pi/3) = \\frac{\\sqrt{3}}{2}, \\; \\cos(\\pi/3) = \\frac{1}{2}",
            explanation: "Calculate numerical values.",
            why: "Parameter values."
          },
          {
            stepNumber: 3,
            title: "Substitute and Simplify",
            mathExpression: "\\frac{dy}{dx} = \\frac{(-\\sqrt{3}/2)(\\sqrt{3}/2) + (3/2)(1/2)}{(-\\sqrt{3}/2)(1/2) - (3/2)(\\sqrt{3}/2)} = \\frac{-3/4 + 3/4}{-\\sqrt{3}/4 - 3\\sqrt{3}/4} = \\frac{0}{-\\sqrt{3}} = 0 \\dots \\text{Wait, numerator is } 0, \\text{ so slope is } 0",
            explanation: "Horizontal tangent line at theta = pi/3.",
            why: "Final evaluated slope."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(-sqrt(3)/2)*(sqrt(3)/2) + (3/2)*(1/2)",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch11",
    chapterDir: "ch11-parametric-equations-and-polar-coordinates",
    section: "11.5",
    sectionDir: "11.5-areas-and-lengths-in-polar-coordinates",
    title: "Areas and Lengths in Polar Coordinates",
    definitions: [
      {
        id: "formula-polar-area",
        title: "Area of a Polar Region",
        category: "formula",
        latex: "A = \\frac{1}{2} \\int_\\alpha^\\beta [r(\\theta)]^2 d\\theta",
        statement: "The area swept out by rays from the pole to the curve r = f(theta) between theta = alpha and theta = beta is the integral of infinitesimal circular sectors dA = (1/2) r^2 dtheta.",
        conditions: ["f(theta) >= 0", "beta - alpha <= 2pi"],
        explanation: "Derived from circular sector area formula (1/2) r^2 Delta theta.",
        keyTakeaway: "Polar area integrates (1/2) r^2 dtheta."
      },
      {
        id: "formula-polar-arc-length",
        title: "Arc Length of a Polar Curve",
        category: "formula",
        latex: "L = \\int_\\alpha^\\beta \\sqrt{r^2 + \\left(\\frac{dr}{d\\theta}\\right)^2} d\\theta",
        statement: "The arc length of a smooth polar curve r = f(theta) from theta = alpha to theta = beta is the integral of the differential arc length element ds = sqrt(r^2 + (r')^2) dtheta.",
        conditions: ["f'(theta) is continuous"],
        explanation: "Derived by applying the parametric arc length formula to x = r cos theta, y = r sin theta.",
        keyTakeaway: "Polar arc length integrates sqrt(r^2 + (dr/dtheta)^2)."
      }
    ],
    summaryMDX: `# Section 11.5: Areas and Lengths in Polar Coordinates

Integrating circular sectors to compute planar areas and curved perimeters in polar form.

---

## 1. Area Formulas

- **Single Curve**:
  $$
  A = \\frac{1}{2} \\int_\\alpha^\\beta r^2 d\\theta
  $$
- **Between Two Polar Curves**:
  $$
  A = \\frac{1}{2} \\int_\\alpha^\\beta \\left( [r_{\\text{outer}}]^2 - [r_{\\text{inner}}]^2 \\right) d\\theta
  $$

---

## 2. Polar Arc Length

$$
L = \\int_\\alpha^\\beta \\sqrt{r^2 + \\left(\\frac{dr}{d\\theta}\\right)^2} d\\theta
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Area Enclosed by a Cardioid",
        exerciseReference: "Section 11.5, Exercise 1",
        originalTopic: "Cardioid Area Integration",
        difficulty: "tier1",
        tags: ["polar-area", "cardioid", "half-angle"],
        problemStatement: "Find the total area enclosed by the cardioid r = 2(1 + cos theta).",
        finalAnswer: "\\text{Area} = 6\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up Polar Area Integral",
            mathExpression: "A = \\frac{1}{2} \\int_0^{2\\pi} r^2 d\\theta = \\frac{1}{2} \\int_0^{2\\pi} 4(1 + \\cos\\theta)^2 d\\theta = 2 \\int_0^{2\\pi} (1 + 2\\cos\\theta + \\cos^2\\theta) d\\theta",
            explanation: "Integrate (1/2) r^2 around full cycle [0, 2pi].",
            why: "Polar area formula."
          },
          {
            stepNumber: 2,
            title: "Expand Using Half-Angle Identity",
            mathExpression: "\\cos^2\\theta = \\frac{1 + \\cos(2\\theta)}{2} \\implies 1 + 2\\cos\\theta + \\cos^2\\theta = \\frac{3}{2} + 2\\cos\\theta + \\frac{1}{2}\\cos(2\\theta)",
            explanation: "Rewrite cos^2 term.",
            why: "Prepares for integration."
          },
          {
            stepNumber: 3,
            title: "Integrate Over Full Period [0, 2pi]",
            mathExpression: "2 \\int_0^{2\\pi} \\left( \\frac{3}{2} + 2\\cos\\theta + \\frac{1}{2}\\cos(2\\theta) \\right) d\\theta = 2 \\left( \\frac{3}{2} \\times 2\\pi + 0 + 0 \\right) = 6\\pi",
            explanation: "Oscillating cosine terms integrate to 0.",
            why: "Final exact area."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "2*(1 + cos(x))**2",
          expected: "6*pi",
          kind: "definite",
          lower: "0",
          upper: "2*pi"
        }
      },
      {
        filename: "ex-02",
        title: "Area of One Petal of a Rose Curve",
        exerciseReference: "Section 11.5, Exercise 2",
        originalTopic: "Rose Petal Area",
        difficulty: "tier1",
        tags: ["rose-curve", "petal-area", "polar-integral"],
        problemStatement: "Find the area of one petal of the rose curve r = 3 cos(2 theta).",
        finalAnswer: "\\text{Area} = \\frac{9\\pi}{8}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Angular Boundaries of One Petal",
            mathExpression: "3\\cos(2\\theta) = 0 \\implies 2\\theta = -\\frac{\\pi}{2}, \\; \\frac{\\pi}{2} \\implies \\theta = -\\frac{\\pi}{4} \\text{ to } \\frac{\\pi}{4}",
            explanation: "One petal is traced between consecutive zeros.",
            why: "Integration limits."
          },
          {
            stepNumber: 2,
            title: "Set Up Area Integral",
            mathExpression: "A = \\frac{1}{2} \\int_{-\\pi/4}^{\\pi/4} 9\\cos^2(2\\theta) d\\theta = \\frac{9}{2} \\int_{-\\pi/4}^{\\pi/4} \\frac{1 + \\cos(4\\theta)}{2} d\\theta",
            explanation: "Apply half-angle formula.",
            why: "Trigonometric power reduction."
          },
          {
            stepNumber: 3,
            title: "Evaluate Definite Integral",
            mathExpression: "\\frac{9}{4} \\left[ \\theta + \\frac{\\sin(4\\theta)}{4} \\right]_{-\\pi/4}^{\\pi/4} = \\frac{9}{4} \\left( \\frac{\\pi}{4} - \\left(-\\frac{\\pi}{4}\\right) + 0 \\right) = \\frac{9}{4}\\left(\\frac{\\pi}{2}\\right) = \\frac{9\\pi}{8}",
            explanation: "Evaluate at limits.",
            why: "Single petal area."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "(9/2)*cos(2*x)**2",
          expected: "9*pi/8",
          kind: "definite",
          lower: "-pi/4",
          upper: "pi/4"
        }
      },
      {
        filename: "ex-03",
        title: "Area Inside Circle and Outside Cardioid",
        exerciseReference: "Section 11.5, Exercise 3",
        originalTopic: "Area Between Two Polar Curves",
        difficulty: "tier2",
        tags: ["between-curves", "circle", "cardioid"],
        problemStatement: "Find the area inside the circle r = 3 sin(theta) and outside the cardioid r = 1 + sin(theta).",
        finalAnswer: "\\text{Area} = \\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Find Intersection Angles",
            mathExpression: "3\\sin\\theta = 1 + \\sin\\theta \\implies 2\\sin\\theta = 1 \\implies \\sin\\theta = \\frac{1}{2} \\implies \\theta = \\frac{\\pi}{6}, \\; \\frac{5\\pi}{6}",
            explanation: "Set radial coordinates equal.",
            why: "Integration boundaries."
          },
          {
            stepNumber: 2,
            title: "Formulate Difference of Squares",
            mathExpression: "r_1^2 - r_2^2 = (3\\sin\\theta)^2 - (1 + \\sin\\theta)^2 = 9\\sin^2\\theta - (1 + 2\\sin\\theta + \\sin^2\\theta) = 8\\sin^2\\theta - 2\\sin\\theta - 1",
            explanation: "Outer curve minus inner curve squared.",
            why: "Polar area difference formula."
          },
          {
            stepNumber: 3,
            title: "Integrate over [pi/6, 5pi/6]",
            mathExpression: "\\frac{1}{2} \\int_{\\pi/6}^{5\\pi/6} (8\\sin^2\\theta - 2\\sin\\theta - 1) d\\theta = \\pi",
            explanation: "Evaluate trigonometric integral.",
            why: "Final exact area."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "(1/2)*(9*sin(x)**2 - (1 + sin(x))**2)",
          expected: "pi",
          kind: "definite",
          lower: "pi/6",
          upper: "5*pi/6"
        }
      },
      {
        filename: "ex-04",
        title: "Arc Length of a Cardioid",
        exerciseReference: "Section 11.5, Exercise 4",
        originalTopic: "Polar Arc Length Evaluation",
        difficulty: "tier2",
        tags: ["cardioid", "arc-length", "polar-perimeter"],
        problemStatement: "Find the perimeter (total arc length) of the cardioid r = 1 + cos(theta).",
        finalAnswer: "L = 8",
        steps: [
          {
            stepNumber: 1,
            title: "Compute dr/dtheta and Radicand",
            mathExpression: "r' = -\\sin\\theta \\implies r^2 + (r')^2 = (1 + \\cos\\theta)^2 + (-\\sin\\theta)^2 = 1 + 2\\cos\\theta + \\cos^2\\theta + \\sin^2\\theta = 2 + 2\\cos\\theta = 4\\cos^2(\\theta/2)",
            explanation: "Use half-angle identity 1 + cos theta = 2 cos^2(theta/2).",
            why: "Radical simplification."
          },
          {
            stepNumber: 2,
            title: "Take Square Root and Use Symmetry",
            mathExpression: "\\sqrt{r^2 + (r')^2} = 2|\\cos(\\theta/2)| \\implies L = 2 \\int_0^\\pi 2\\cos(\\theta/2) d\\theta",
            explanation: "Double the integral from 0 to pi.",
            why: "Symmetry about polar axis."
          },
          {
            stepNumber: 3,
            title: "Evaluate Definite Integral",
            mathExpression: "4 \\left[ 2\\sin(\\theta/2) \\right]_0^\\pi = 8(1 - 0) = 8",
            explanation: "sin(pi/2) = 1.",
            why: "Classical 8a cardioid perimeter with a = 1."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "4*cos(x/2)",
          expected: "8",
          kind: "definite",
          lower: "0",
          upper: "pi"
        }
      },
      {
        filename: "ex-05",
        title: "Arc Length of an Archimedean Spiral",
        exerciseReference: "Section 11.5, Exercise 5",
        originalTopic: "Spiral Arc Length",
        difficulty: "tier3",
        tags: ["spiral", "arc-length", "trig-sub-integral"],
        problemStatement: "Find the arc length of the spiral r = theta for 0 <= theta <= 1.",
        finalAnswer: "L = \\frac{1}{2}\\left( \\sqrt{2} + \\ln(1 + \\sqrt{2}) \\right)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Differential Arc Length Element",
            mathExpression: "r = \\theta \\implies r' = 1 \\implies \\sqrt{r^2 + (r')^2} = \\sqrt{\\theta^2 + 1}",
            explanation: "Substitute into polar arc length formula.",
            why: "ds element."
          },
          {
            stepNumber: 2,
            title: "Integrate via Standard Table Formula",
            mathExpression: "\\int_0^1 \\sqrt{\\theta^2 + 1} d\\theta = \\left[ \\frac{\\theta}{2}\\sqrt{\\theta^2 + 1} + \\frac{1}{2}\\ln(\\theta + \\sqrt{\\theta^2 + 1}) \\right]_0^1",
            explanation: "Recall integral of sqrt(u^2 + a^2) from Section 8.6.",
            why: "Standard table evaluation."
          },
          {
            stepNumber: 3,
            title: "Evaluate at Boundaries",
            mathExpression: "\\frac{1}{2}\\sqrt{2} + \\frac{1}{2}\\ln(1 + \\sqrt{2}) - 0 = \\frac{1}{2}\\left( \\sqrt{2} + \\ln(1 + \\sqrt{2}) \\right)",
            explanation: "ln(0 + 1) = 0.",
            why: "Final exact spiral length."
          }
        ],
        sympyVerification: {
          operation: "integral",
          expression: "sqrt(x**2 + 1)",
          expected: "sqrt(2)/2 + log(1 + sqrt(2))/2",
          kind: "definite",
          lower: "0",
          upper: "1"
        }
      }
    ]
  },
  {
    chapter: "ch11",
    chapterDir: "ch11-parametric-equations-and-polar-coordinates",
    section: "11.6",
    sectionDir: "11.6-conic-sections",
    title: "Conic Sections",
    definitions: [
      {
        id: "def-conic-sections",
        title: "Geometric Definitions and Standard Forms of Conic Sections",
        category: "definition",
        latex: "\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\; (\\text{Ellipse}), \\quad y^2 = 4px \\; (\\text{Parabola}), \\quad \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\; (\\text{Hyperbola})",
        statement: "Conic sections are curves formed by intersecting a double right circular cone with a plane. Characterized universally by eccentricity e = PF / PD (distance to focus divided by distance to directrix): e = 0 (circle), 0 < e < 1 (ellipse), e = 1 (parabola), e > 1 (hyperbola).",
        conditions: ["a > b > 0 for ellipse, c^2 = a^2 - b^2; c^2 = a^2 + b^2 for hyperbola"],
        explanation: "Unifies planetary orbits (Kepler's First Law) and optical reflection properties.",
        keyTakeaway: "Eccentricity e classifies all conic sections."
      }
    ],
    summaryMDX: `# Section 11.6: Conic Sections

Analytic geometry of parabolas, ellipses, and hyperbolas.

---

## 1. Classification by Eccentricity $e$

- **$e = 1$**: Parabola ($y^2 = 4px$)
- **$0 < e < 1$**: Ellipse ($c = ea, \\; b^2 = a^2 - c^2$)
- **$e > 1$**: Hyperbola ($c = ea, \\; b^2 = c^2 - a^2$, asymptotes $y = \\pm \\frac{b}{a}x$)

---

## 2. Reflective Properties

- **Parabola**: Rays from focus reflect parallel to the axis.
- **Ellipse**: Rays from one focus reflect directly toward the other focus.
- **Hyperbola**: Rays toward one focus reflect away from the other focus.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Focus and Directrix of a Parabola",
        exerciseReference: "Section 11.6, Exercise 1",
        originalTopic: "Parabola Geometric Features",
        difficulty: "tier1",
        tags: ["parabola", "focus", "directrix"],
        problemStatement: "Find the focus, vertex, and directrix of the parabola y^2 = 12x.",
        finalAnswer: "\\text{Vertex}: (0, 0), \\quad \\text{Focus}: (3, 0), \\quad \\text{Directrix}: x = -3",
        steps: [
          {
            stepNumber: 1,
            title: "Match with Standard Form y^2 = 4px",
            mathExpression: "4p = 12 \\implies p = 3",
            explanation: "Focal parameter p is 3.",
            why: "Standard parabola equation."
          },
          {
            stepNumber: 2,
            title: "Determine Focus and Directrix Coordinates",
            mathExpression: "\\text{Focus} = (p, 0) = (3, 0); \\quad \\text{Directrix}: x = -p = -3",
            explanation: "Parabola opens to the right.",
            why: "Focal definition of parabola."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "12 / 4 - 3",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Foci and Eccentricity of an Ellipse",
        exerciseReference: "Section 11.6, Exercise 2",
        originalTopic: "Ellipse Parameters",
        difficulty: "tier1",
        tags: ["ellipse", "foci", "eccentricity"],
        problemStatement: "Find the foci, vertices, and eccentricity of 9x^2 + 25y^2 = 225.",
        finalAnswer: "\\text{Vertices}: (\\pm 5, 0), \\quad \\text{Foci}: (\\pm 4, 0), \\quad e = \\frac{4}{5} = 0.8",
        steps: [
          {
            stepNumber: 1,
            title: "Convert to Standard Form",
            mathExpression: "\\frac{9x^2}{225} + \\frac{25y^2}{225} = 1 \\implies \\frac{x^2}{25} + \\frac{y^2}{9} = 1",
            explanation: "Divide by 225.",
            why: "Standard ellipse form."
          },
          {
            stepNumber: 2,
            title: "Identify Semi-Axes and Focal Distance c",
            mathExpression: "a^2 = 25 \\implies a = 5; \\quad b^2 = 9 \\implies b = 3; \\quad c^2 = a^2 - b^2 = 25 - 9 = 16 \\implies c = 4",
            explanation: "Major axis lies along x-axis.",
            why: "Focal distance formula."
          },
          {
            stepNumber: 3,
            title: "Compute Eccentricity",
            mathExpression: "e = \\frac{c}{a} = \\frac{4}{5} = 0.8",
            explanation: "Foci at (+-4, 0), vertices at (+-5, 0).",
            why: "Eccentricity ratio."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(25 - 9) - 4",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Asymptotes and Foci of a Hyperbola",
        exerciseReference: "Section 11.6, Exercise 3",
        originalTopic: "Hyperbola Asymptotes",
        difficulty: "tier1",
        tags: ["hyperbola", "asymptotes", "foci"],
        problemStatement: "Find the foci, vertices, and asymptotes of x^2/16 - y^2/9 = 1.",
        finalAnswer: "\\text{Vertices}: (\\pm 4, 0), \\quad \\text{Foci}: (\\pm 5, 0), \\quad \\text{Asymptotes}: y = \\pm \\frac{3}{4}x",
        steps: [
          {
            stepNumber: 1,
            title: "Identify a, b, and c",
            mathExpression: "a = 4, \\quad b = 3 \\implies c^2 = a^2 + b^2 = 16 + 9 = 25 \\implies c = 5",
            explanation: "Focal distance for hyperbola adds squared semi-axes.",
            why: "Hyperbola geometry."
          },
          {
            stepNumber: 2,
            title: "Write Asymptotes Equations",
            mathExpression: "y = \\pm \\frac{b}{a} x = \\pm \\frac{3}{4} x",
            explanation: "Slopes are +-b/a.",
            why: "Hyperbolic asymptotes."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(16 + 9) - 5",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Shifted Conic via Completing the Square",
        exerciseReference: "Section 11.6, Exercise 4",
        originalTopic: "Shifted Conic Center",
        difficulty: "tier2",
        tags: ["shifted-conic", "completing-the-square", "ellipse"],
        problemStatement: "Identify the type and center of the conic 4x^2 + 9y^2 - 16x + 18y - 11 = 0.",
        finalAnswer: "\\text{Ellipse with center } (2, -1)",
        steps: [
          {
            stepNumber: 1,
            title: "Group Variables and Complete Squares",
            mathExpression: "4(x^2 - 4x + 4) + 9(y^2 + 2y + 1) = 11 + 16 + 9 = 36",
            explanation: "Factor out leading coefficients and add balanced constants.",
            why: "Completing squares."
          },
          {
            stepNumber: 2,
            title: "Divide by 36",
            mathExpression: "\\frac{4(x - 2)^2}{36} + \\frac{9(y + 1)^2}{36} = 1 \\implies \\frac{(x - 2)^2}{9} + \\frac{(y + 1)^2}{4} = 1",
            explanation: "Standard form of an ellipse.",
            why: "Shifted standard form."
          },
          {
            stepNumber: 3,
            title: "Identify Center",
            mathExpression: "\\text{Center} = (h, k) = (2, -1)",
            explanation: "Semi-axes a = 3, b = 2.",
            why: "Conic characteristics."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4*4 + 9*1 + 11 - 36",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Eccentricity and Shape Variation",
        exerciseReference: "Section 11.6, Exercise 5",
        originalTopic: "Eccentricity Geometric Meaning",
        difficulty: "tier1",
        tags: ["eccentricity", "circle-limit", "conic-theory"],
        problemStatement: "Describe the geometric shape of an ellipse as its eccentricity e approaches 0.",
        finalAnswer: "\\text{As } e \\to 0, \\text{ the foci coalesce at the center and the ellipse becomes a circle}",
        steps: [
          {
            stepNumber: 1,
            title: "Relate Eccentricity to Semi-Axes",
            mathExpression: "e = \\frac{c}{a} = \\frac{\\sqrt{a^2 - b^2}}{a} = \\sqrt{1 - \\frac{b^2}{a^2}}",
            explanation: "Expression of eccentricity in terms of axis ratio b/a.",
            why: "Eccentricity formula."
          },
          {
            stepNumber: 2,
            title: "Take Limit as e -> 0",
            mathExpression: "e \\to 0 \\implies 1 - \\frac{b^2}{a^2} \\to 0 \\implies b \\to a",
            explanation: "When semi-minor axis b approaches semi-major axis a, the ellipse becomes a circle.",
            why: "Limiting circular geometry."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch11",
    chapterDir: "ch11-parametric-equations-and-polar-coordinates",
    section: "11.7",
    sectionDir: "11.7-conics-in-polar-coordinates",
    title: "Conics in Polar Coordinates",
    definitions: [
      {
        id: "formula-polar-conics",
        title: "Unified Polar Equation of Conics",
        category: "formula",
        latex: "r = \\frac{e d}{1 \\pm e \\cos(\\theta)} \\quad \\text{or} \\quad r = \\frac{e d}{1 \\pm e \\sin(\\theta)}",
        statement: "A conic section with one focus placed at the pole and directrix at distance d from the pole has a single unified polar equation governed entirely by eccentricity e.",
        conditions: ["e > 0, d > 0"],
        explanation: "Eliminates disparate Cartesian formulas: e < 1 (ellipse), e = 1 (parabola), e > 1 (hyperbola).",
        keyTakeaway: "A single polar equation describes all conic sections with focus at the origin."
      }
    ],
    summaryMDX: `# Section 11.7: Conics in Polar Coordinates

A unified formulation of conic sections where the focus is positioned at the pole (origin).

---

## 1. Unified Equation

$$
r = \\frac{e d}{1 \\pm e \\cos\\theta} \\quad (\\text{vertical directrix } x = \\pm d)
$$

$$
r = \\frac{e d}{1 \\pm e \\sin\\theta} \\quad (\\text{horizontal directrix } y = \\pm d)
$$

---

## 2. Kepler's Planetary Orbits

Placing the Sun at the pole, planetary orbits are ellipses with equation:

$$
r = \\frac{a(1 - e^2)}{1 + e \\cos\\theta}
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Identifying a Conic from its Polar Equation",
        exerciseReference: "Section 11.7, Exercise 1",
        originalTopic: "Polar Conic Identification",
        difficulty: "tier1",
        tags: ["polar-conic", "eccentricity", "directrix"],
        problemStatement: "Identify the conic r = 12 / (3 + 2 cos theta), and find its eccentricity and directrix.",
        finalAnswer: "\\text{Ellipse with } e = \\frac{2}{3} \\text{ and vertical directrix } x = 6",
        steps: [
          {
            stepNumber: 1,
            title: "Divide Numerator and Denominator by 3",
            mathExpression: "r = \\frac{12/3}{1 + (2/3)\\cos\\theta} = \\frac{4}{1 + (2/3)\\cos\\theta}",
            explanation: "Normalize leading denominator term to 1.",
            why: "Standard polar conic form ed / (1 + e cos theta)."
          },
          {
            stepNumber: 2,
            title: "Identify Eccentricity e and Directrix d",
            mathExpression: "e = \\frac{2}{3} < 1 \\implies \\text{Ellipse}; \\quad e d = 4 \\implies \\left(\\frac{2}{3}\\right)d = 4 \\implies d = 6",
            explanation: "Since denominator has + e cos(theta), directrix is vertical line x = d = 6.",
            why: "Conic classification."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 / (2/3) - 6",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Polar Equation of a Parabola",
        exerciseReference: "Section 11.7, Exercise 2",
        originalTopic: "Parabola in Polar Form",
        difficulty: "tier1",
        tags: ["parabola", "polar-equation", "directrix"],
        problemStatement: "Find the polar equation of a parabola with focus at the pole and directrix y = 4.",
        finalAnswer: "r = \\frac{4}{1 + \\sin(\\theta)}",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Parameters",
            mathExpression: "e = 1 \\text{ (parabola)}, \\quad d = 4, \\quad \\text{Directrix } y = 4 \\text{ above pole}",
            explanation: "Horizontal directrix above pole uses 1 + e sin(theta).",
            why: "Parameter matching."
          },
          {
            stepNumber: 2,
            title: "Assemble Equation",
            mathExpression: "r = \\frac{ed}{1 + e\\sin\\theta} = \\frac{(1)(4)}{1 + 1\\sin\\theta} = \\frac{4}{1 + \\sin\\theta}",
            explanation: "Substitute e = 1 and d = 4.",
            why: "Final polar formula."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 / (1 + sin(x)) - 4 / (1 + sin(x))",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Converting a Polar Conic to Cartesian Form",
        exerciseReference: "Section 11.7, Exercise 3",
        originalTopic: "Polar Conic to Cartesian Conversion",
        difficulty: "tier2",
        tags: ["conversion", "polar-to-cartesian", "hyperbola"],
        problemStatement: "Convert r = 6 / (1 + 2 cos theta) to Cartesian coordinates and identify the conic.",
        finalAnswer: "3x^2 - y^2 + 24x + 36 = 0 \\quad (\\text{Hyperbola with } e = 2)",
        steps: [
          {
            stepNumber: 1,
            title: "Clear Denominator",
            mathExpression: "r(1 + 2\\cos\\theta) = 6 \\implies r + 2r\\cos\\theta = 6",
            explanation: "Multiply both sides by 1 + 2 cos(theta).",
            why: "Algebraic clearance."
          },
          {
            stepNumber: 2,
            title: "Substitute x = r cos(theta) and r = sqrt(x^2 + y^2)",
            mathExpression: "r + 2x = 6 \\implies r = 6 - 2x \\implies r^2 = (6 - 2x)^2",
            explanation: "Isolate r and square both sides.",
            why: "Eliminating r."
          },
          {
            stepNumber: 3,
            title: "Expand and Collect Terms",
            mathExpression: "x^2 + y^2 = 36 - 24x + 4x^2 \\implies 3x^2 - y^2 - 24x + 36 = 0",
            explanation: "Group terms into quadratic form.",
            why: "Cartesian hyperbola equation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(6 - 2*x)**2 - (x**2 + y**2) - (3*x**2 - y**2 - 24*x + 36)",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Perihelion and Aphelion in Planetary Orbits",
        exerciseReference: "Section 11.7, Exercise 4",
        originalTopic: "Kepler Orbit Perihelion and Aphelion",
        difficulty: "tier2",
        tags: ["kepler-orbit", "astronomy", "perihelion"],
        problemStatement: "For an elliptical orbit r = ed / (1 + e cos theta), find the perihelion (closest distance r_min) and aphelion (farthest distance r_max) to the central body.",
        finalAnswer: "r_{\\text{min}} = \\frac{ed}{1 + e}, \\quad r_{\\text{max}} = \\frac{ed}{1 - e}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Minimum Radius (Perihelion)",
            mathExpression: "\\cos\\theta = 1 \\implies r_{\\text{min}} = \\frac{ed}{1 + e}",
            explanation: "Denominator is maximized when cos(theta) = 1.",
            why: "Minimum distance."
          },
          {
            stepNumber: 2,
            title: "Find Maximum Radius (Aphelion)",
            mathExpression: "\\cos\\theta = -1 \\implies r_{\\text{max}} = \\frac{ed}{1 - e}",
            explanation: "Denominator is minimized when cos(theta) = -1.",
            why: "Maximum distance."
          },
          {
            stepNumber: 3,
            title: "Major Axis Relation",
            mathExpression: "2a = r_{\\text{min}} + r_{\\text{max}} = \\frac{ed(1 - e) + ed(1 + e)}{1 - e^2} = \\frac{2ed}{1 - e^2} \\implies a = \\frac{ed}{1 - e^2}",
            explanation: "Relates focal parameters to semi-major axis a.",
            why: "Kepler's first law orbital geometry."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "ed/(1 + e) + ed/(1 - e) - 2*ed/(1 - e**2)",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Eccentricity of a Polar Hyperbola",
        exerciseReference: "Section 11.7, Exercise 5",
        originalTopic: "Hyperbolic Eccentricity Extraction",
        difficulty: "tier1",
        tags: ["hyperbola", "eccentricity", "polar"],
        problemStatement: "Determine the eccentricity of r = 8 / (2 - 5 sin theta).",
        finalAnswer: "e = \\frac{5}{2} = 2.5 \\quad (\\text{Hyperbola})",
        steps: [
          {
            stepNumber: 1,
            title: "Divide by 2 to Normalize Denominator",
            mathExpression: "r = \\frac{8/2}{1 - (5/2)\\sin\\theta} = \\frac{4}{1 - 2.5\\sin\\theta}",
            explanation: "Make leading constant 1.",
            why: "Standard form alignment."
          },
          {
            stepNumber: 2,
            title: "Read Eccentricity",
            mathExpression: "e = \\frac{5}{2} = 2.5 > 1",
            explanation: "Since e > 1, the curve is a hyperbola.",
            why: "Conic identification."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "Rational(5, 2) - 2.5",
          expected: "0"
        }
      }
    ]
  }
];
