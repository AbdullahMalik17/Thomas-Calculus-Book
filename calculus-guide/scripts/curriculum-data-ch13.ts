// scripts/curriculum-data-ch13.ts
/**
 * Authoritative Curriculum Data for Chapter 13: Vector-Valued Functions and Motion in Space
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH13_SECTIONS: SectionDef[] = [
  {
    chapter: "ch13",
    chapterDir: "ch13-vector-valued-functions-and-motion-in-space",
    section: "13.1",
    sectionDir: "13.1-curves-in-space-and-their-tangents",
    title: "Curves in Space and Their Tangents",
    definitions: [
      {
        id: "def-vector-valued-function",
        title: "Vector-Valued Function and Space Curve",
        category: "definition",
        latex: "\\mathbf{r}(t) = f(t)\\mathbf{i} + g(t)\\mathbf{j} + h(t)\\mathbf{k} = \\langle f(t), g(t), h(t) \\rangle",
        statement: "A vector-valued function r maps a real parameter t from an interval I into Euclidean space R^3. The set of terminal points of r(t) for t in I traces out a space curve C.",
        conditions: ["f, g, h are real functions defined on common interval I"],
        explanation: "Limits and continuity of r(t) are defined component-wise: lim r(t) = <lim f, lim g, lim h>.",
        keyTakeaway: "Unifies particle trajectory kinematics and spatial curve geometry."
      },
      {
        id: "def-tangent-vector",
        title: "Derivative Vector and Unit Tangent Vector",
        category: "definition",
        latex: "\\mathbf{r}'(t) = \\lim_{\\Delta t \\to 0} \\frac{\\mathbf{r}(t+\\Delta t) - \\mathbf{r}(t)}{\\Delta t} = \\langle f'(t), g'(t), h'(t) \\rangle, \\quad \\mathbf{T}(t) = \\frac{\\mathbf{r}'(t)}{|\\mathbf{r}'(t)|}",
        statement: "The derivative vector r'(t) represents the instantaneous velocity vector v(t) tangent to the space curve pointing in the direction of increasing t. The unit tangent vector T(t) normalizes the velocity.",
        conditions: ["Curve is smooth: r'(t) is continuous and r'(t) != 0"],
        explanation: "The tangent line to the curve at t_0 has vector equation L(t) = r(t_0) + (t - t_0) r'(t_0).",
        keyTakeaway: "T(t) captures the pure direction of motion independent of particle speed."
      }
    ],
    summaryMDX: `# Section 13.1: Curves in Space and Their Tangents

Space curves model paths of objects moving through three-dimensional space over time $t$.

---

## 1. Velocity and Unit Tangent

- **Position**: $\\mathbf{r}(t) = \\langle f(t), g(t), h(t) \\rangle$
- **Velocity**: $\\mathbf{v}(t) = \\mathbf{r}'(t) = \\langle f'(t), g'(t), h'(t) \\rangle$
- **Speed**: $|\\mathbf{v}(t)| = \\sqrt{f'(t)^2 + g'(t)^2 + h'(t)^2}$
- **Unit Tangent Vector**: $\\mathbf{T}(t) = \\frac{\\mathbf{v}(t)}{|\\mathbf{v}(t)|}$

---

## 2. Differentiation Rules for Vector Functions

For differentiable vector functions $\\mathbf{u}(t), \\mathbf{v}(t)$ and scalar function $c(t)$:
- $\\frac{d}{dt}[\\mathbf{u} \\cdot \\mathbf{v}] = \\mathbf{u}' \\cdot \\mathbf{v} + \\mathbf{u} \\cdot \\mathbf{v}'$
- $\\frac{d}{dt}[\\mathbf{u} \\times \\mathbf{v}] = \\mathbf{u}' \\times \\mathbf{v} + \\mathbf{u} \\times \\mathbf{v}'$
- **Constant Length Property**: If $|\\mathbf{r}(t)| = c$, then $\\mathbf{r}(t) \\cdot \\mathbf{r}'(t) = 0$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Velocity, Speed, and Unit Tangent of a Circular Helix",
        exerciseReference: "Section 13.1, Exercise 1",
        originalTopic: "Kinematics of Space Curves",
        difficulty: "tier1",
        tags: ["helix", "velocity", "unit-tangent", "speed"],
        problemStatement: "Find the velocity v(t), speed |v(t)|, and unit tangent vector T(t) for the circular helix r(t) = <cos(t), sin(t), t>.",
        finalAnswer: "\\mathbf{v}(t) = \\langle -\\sin t, \\cos t, 1 \\rangle, \\quad |\\mathbf{v}(t)| = \\sqrt{2}, \\quad \\mathbf{T}(t) = \\frac{1}{\\sqrt{2}}\\langle -\\sin t, \\cos t, 1 \\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate Position Component-Wise",
            mathExpression: "\\mathbf{v}(t) = \\mathbf{r}'(t) = \\left\\langle \\frac{d}{dt}(\\cos t), \\frac{d}{dt}(\\sin t), \\frac{d}{dt}(t) \\right\\rangle = \\langle -\\sin t, \\cos t, 1 \\rangle",
            explanation: "Compute component derivatives with respect to parameter t.",
            why: "Determining velocity vector."
          },
          {
            stepNumber: 2,
            title: "Calculate Speed (Magnitude of Velocity)",
            mathExpression: "|\\mathbf{v}(t)| = \\sqrt{(-\\sin t)^2 + (\\cos t)^2 + 1^2} = \\sqrt{1 + 1} = \\sqrt{2}",
            explanation: "Apply Pythagorean identity sin^2(t) + cos^2(t) = 1.",
            why: "Finding scalar speed of motion."
          },
          {
            stepNumber: 3,
            title: "Compute Unit Tangent Vector T(t)",
            mathExpression: "\\mathbf{T}(t) = \\frac{\\mathbf{v}(t)}{|\\mathbf{v}(t)|} = \\frac{1}{\\sqrt{2}} \\langle -\\sin t, \\cos t, 1 \\rangle",
            explanation: "Divide the velocity vector by constant speed sqrt(2).",
            why: "Normalizing velocity to obtain unit tangent."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt((-sin(t))**2 + (cos(t))**2 + 1)",
          expected: "sqrt(2)"
        }
      },
      {
        filename: "ex-02",
        title: "Tangent Line to a Twisted Cubic Space Curve",
        exerciseReference: "Section 13.1, Exercise 2",
        originalTopic: "Tangent Lines in Space",
        difficulty: "tier1",
        tags: ["tangent-line", "twisted-cubic", "space-curve"],
        problemStatement: "Find parametric equations for the tangent line to the twisted cubic r(t) = <t, t^2, t^3> at the point where t = 1.",
        finalAnswer: "x = 1 + t, \\quad y = 1 + 2t, \\quad z = 1 + 3t",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Point on Curve at t = 1",
            mathExpression: "\\mathbf{r}(1) = \\langle 1, 1^2, 1^3 \\rangle = \\langle 1, 1, 1 \\rangle",
            explanation: "Substitute t = 1 into the position vector to obtain P_0(1, 1, 1).",
            why: "Finding the point of tangency."
          },
          {
            stepNumber: 2,
            title: "Compute Tangent Direction Vector",
            mathExpression: "\\mathbf{r}'(t) = \\langle 1, 2t, 3t^2 \\rangle \\implies \\mathbf{r}'(1) = \\langle 1, 2(1), 3(1)^2 \\rangle = \\langle 1, 2, 3 \\rangle",
            explanation: "Differentiate r(t) and evaluate at t = 1.",
            why: "Determining direction vector for tangent line."
          },
          {
            stepNumber: 3,
            title: "Write Parametric Equations of Line",
            mathExpression: "x = 1 + 1\\tau, \\quad y = 1 + 2\\tau, \\quad z = 1 + 3\\tau",
            explanation: "Set up line through (1, 1, 1) in direction <1, 2, 3>.",
            why: "Formulating tangent line in parameter space."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "diff(t**3, t).subs(t, 1)",
          expected: "3"
        }
      },
      {
        filename: "ex-03",
        title: "Product Rule for the Dot Product of Vector Functions",
        exerciseReference: "Section 13.1, Exercise 3",
        originalTopic: "Vector Product Rules",
        difficulty: "tier2",
        tags: ["product-rule", "dot-product", "derivatives"],
        problemStatement: "For u(t) = <t, t^2, 1> and v(t) = <1, t, t^2>, verify the product rule d/dt [u . v] = u' . v + u . v'.",
        finalAnswer: "\\frac{d}{dt}[\\mathbf{u} \\cdot \\mathbf{v}] = 3t^2 + 2t + 1",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Inner Product Directly",
            mathExpression: "\\mathbf{u}(t) \\cdot \\mathbf{v}(t) = (t)(1) + (t^2)(t) + (1)(t^2) = t + t^3 + t^2",
            explanation: "Multiply corresponding components of u(t) and v(t).",
            why: "Formulating scalar function u . v."
          },
          {
            stepNumber: 2,
            title: "Differentiate the Scalar Function",
            mathExpression: "\\frac{d}{dt}(t^3 + t^2 + t) = 3t^2 + 2t + 1",
            explanation: "Apply standard polynomial differentiation.",
            why: "Computing derivative of the inner product."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "t + t**3 + t**2",
          expected: "3*t**2 + 2*t + 1",
          variable: "t"
        }
      },
      {
        filename: "ex-04",
        title: "Orthogonality Property of Constant-Magnitude Vectors",
        exerciseReference: "Section 13.1, Exercise 4",
        originalTopic: "Constant Length Vectors",
        difficulty: "tier2",
        tags: ["constant-magnitude", "orthogonality", "proof"],
        problemStatement: "For r(t) = <3 cos(2t), 3 sin(2t), 4>, verify that |r(t)| is constant and r(t) . r'(t) = 0 for all t.",
        finalAnswer: "|\\mathbf{r}(t)| = 5 \\implies \\mathbf{r}(t) \\cdot \\mathbf{r}'(t) = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Calculate Magnitude of r(t)",
            mathExpression: "|\\mathbf{r}(t)| = \\sqrt{9\\cos^2(2t) + 9\\sin^2(2t) + 16} = \\sqrt{9(1) + 16} = \\sqrt{25} = 5",
            explanation: "The norm is constant and independent of t.",
            why: "Confirming constant magnitude."
          },
          {
            stepNumber: 2,
            title: "Compute Velocity Vector r'(t)",
            mathExpression: "\\mathbf{r}'(t) = \\langle -6\\sin(2t), 6\\cos(2t), 0 \\rangle",
            explanation: "Differentiate each component using chain rule.",
            why: "Finding derivative vector."
          },
          {
            stepNumber: 3,
            title: "Evaluate r(t) . r'(t)",
            mathExpression: "\\mathbf{r}(t) \\cdot \\mathbf{r}'(t) = [3\\cos(2t)][-6\\sin(2t)] + [3\\sin(2t)][6\\cos(2t)] + [4][0] = -18\\cos(2t)\\sin(2t) + 18\\sin(2t)\\cos(2t) = 0",
            explanation: "The terms cancel identically, proving orthogonality.",
            why: "Verifying that derivative is perpendicular to position on sphere."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "-18*cos(2*t)*sin(2*t) + 18*sin(2*t)*cos(2*t)",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Limit of a Vector-Valued Function",
        exerciseReference: "Section 13.1, Exercise 5",
        originalTopic: "Limits of Vector Functions",
        difficulty: "tier1",
        tags: ["limits", "vector-functions", "trig-limits"],
        problemStatement: "Evaluate lim_{t -> 0} <sin(3t)/t, (exp(2t) - 1)/t, cos(t)>.",
        finalAnswer: "\\langle 3, 2, 1 \\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Each Component Limit",
            mathExpression: "\\lim_{t \\to 0} \\frac{\\sin(3t)}{t} = 3, \\quad \\lim_{t \\to 0} \\frac{e^{2t}-1}{t} = 2, \\quad \\lim_{t \\to 0} \\cos(t) = 1",
            explanation: "Apply standard calculus limits to each independent component.",
            why: "Evaluating limits component-wise."
          },
          {
            stepNumber: 2,
            title: "Assemble Limiting Vector",
            mathExpression: "\\lim_{t \\to 0} \\mathbf{r}(t) = \\langle 3, 2, 1 \\rangle",
            explanation: "The limit of the vector function is the vector of limits.",
            why: "Constructing final limiting vector."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "3 + 2 + 1",
          expected: "6"
        }
      }
    ]
  },
  {
    chapter: "ch13",
    chapterDir: "ch13-vector-valued-functions-and-motion-in-space",
    section: "13.2",
    sectionDir: "13.2-integrals-of-vector-functions-projectile-motion",
    title: "Integrals of Vector Functions; Projectile Motion",
    definitions: [
      {
        id: "def-vector-integral",
        title: "Definite and Indefinite Integrals of Vector Functions",
        category: "definition",
        latex: "\\int \\mathbf{r}(t) \\, dt = \\left( \\int f(t) dt \\right)\\mathbf{i} + \\left( \\int g(t) dt \\right)\\mathbf{j} + \\left( \\int h(t) dt \\right)\\mathbf{k} + \\mathbf{C}",
        statement: "The integral of a vector function is defined by integrating each component function independently. The constant of integration C is an arbitrary vector constant in R^3.",
        conditions: ["Component functions f, g, h are integrable on [a, b]"],
        explanation: "Fundamental Theorem of Calculus applies component-wise: int_a^b r(t) dt = R(b) - R(a) where R'(t) = r(t).",
        keyTakeaway: "Velocity integrates to position, and acceleration integrates to velocity."
      },
      {
        id: "model-projectile-motion",
        title: "Classical Projectile Motion Equation",
        category: "formula",
        latex: "\\mathbf{r}(t) = (v_0 \\cos\\alpha) t \\, \\mathbf{i} + \\left( (v_0 \\sin\\alpha) t - \\frac{1}{2}gt^2 \\right) \\mathbf{j}",
        statement: "For a projectile launched from the origin with initial speed v_0 at inclination angle alpha subject only to downward gravitational acceleration g, the position r(t) follows a parabolic path.",
        conditions: ["No air resistance", "Constant gravity g"],
        explanation: "Flight time T = (2 v_0 sin alpha)/g, Maximum height H = (v_0^2 sin^2 alpha)/(2g), Range R = (v_0^2 sin 2alpha)/g.",
        keyTakeaway: "Horizontal velocity remains constant while vertical velocity decreases linearly with time."
      }
    ],
    summaryMDX: `# Section 13.2: Integrals of Vector Functions; Projectile Motion

Integrating vector functions recovers velocity from acceleration and position from velocity.

---

## 1. Initial Value Problems

Given acceleration $\\mathbf{a}(t)$ and initial conditions $\\mathbf{v}(0) = \\mathbf{v}_0$ and $\\mathbf{r}(0) = \\mathbf{r}_0$:
$$\\mathbf{v}(t) = \\mathbf{v}_0 + \\int_0^t \\mathbf{a}(\\tau) \\, d\\tau, \\quad \\mathbf{r}(t) = \\mathbf{r}_0 + \\int_0^t \\mathbf{v}(\\tau) \\, d\\tau$$

---

## 2. Projectile Motion Formulas

When launched at angle $\\alpha$ with initial velocity $v_0$:
- **Time of Flight**: $T = \\frac{2 v_0 \\sin\\alpha}{g}$
- **Maximum Height**: $H = \\frac{v_0^2 \\sin^2\\alpha}{2g}$
- **Horizontal Range**: $R = \\frac{v_0^2 \\sin(2\\alpha)}{g}$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Definite Integral of a Vector Function",
        exerciseReference: "Section 13.2, Exercise 1",
        originalTopic: "Definite Vector Integration",
        difficulty: "tier1",
        tags: ["vector-integral", "definite-integral", "calculus"],
        problemStatement: "Evaluate the definite integral int_0^1 <2t, 3t^2, 4t^3> dt.",
        finalAnswer: "\\langle 1, 1, 1 \\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Integrate Each Component",
            mathExpression: "\\int_0^1 2t \\, dt = [t^2]_0^1 = 1, \\quad \\int_0^1 3t^2 \\, dt = [t^3]_0^1 = 1, \\quad \\int_0^1 4t^3 \\, dt = [t^4]_0^1 = 1",
            explanation: "Evaluate the definite integral of each scalar component over [0, 1].",
            why: "Integrating component-wise."
          },
          {
            stepNumber: 2,
            title: "Assemble Resulting Vector",
            mathExpression: "\\int_0^1 \\langle 2t, 3t^2, 4t^3 \\rangle \\, dt = \\langle 1, 1, 1 \\rangle",
            explanation: "Combine scalar integrals into resulting vector.",
            why: "Formulating vector integral value."
          }
        ],
        sympyVerification: {
          operation: "integral",
          kind: "definite",
          expression: "2*t + 3*t**2 + 4*t**3",
          lower: "0",
          upper: "1",
          expected: "3",
          variable: "t"
        }
      },
      {
        filename: "ex-02",
        title: "Solving an Initial Value Problem for Position",
        exerciseReference: "Section 13.2, Exercise 2",
        originalTopic: "Initial Value Problems",
        difficulty: "tier1",
        tags: ["initial-value-problem", "antiderivative", "vector-functions"],
        problemStatement: "Solve the initial value problem dr/dt = <cos(t), sin(t), 2t> with initial condition r(0) = <1, -1, 0>.",
        finalAnswer: "\\mathbf{r}(t) = \\langle \\sin t + 1, -\\cos t, t^2 \\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Find General Indefinite Antiderivative",
            mathExpression: "\\mathbf{r}(t) = \\int \\langle \\cos t, \\sin t, 2t \\rangle \\, dt = \\langle \\sin t, -\\cos t, t^2 \\rangle + \\mathbf{C}",
            explanation: "Compute antiderivatives of cos(t), sin(t), and 2t.",
            why: "Finding general antiderivative vector."
          },
          {
            stepNumber: 2,
            title: "Apply Initial Condition at t = 0",
            mathExpression: "\\mathbf{r}(0) = \\langle 0, -1, 0 \\rangle + \\mathbf{C} = \\langle 1, -1, 0 \\rangle \\implies \\mathbf{C} = \\langle 1, 0, 0 \\rangle",
            explanation: "Substitute t = 0 to solve for constant vector C.",
            why: "Satisfying initial boundary state."
          },
          {
            stepNumber: 3,
            title: "State Particular Solution",
            mathExpression: "\\mathbf{r}(t) = \\langle \\sin t + 1, -\\cos t, t^2 \\rangle",
            explanation: "Add constant vector C to the antiderivative.",
            why: "Formulating final trajectory."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "sin(t) + 1",
          expected: "cos(t)",
          variable: "t"
        }
      },
      {
        filename: "ex-03",
        title: "Horizontal Range of a Projectile",
        exerciseReference: "Section 13.2, Exercise 3",
        originalTopic: "Projectile Range",
        difficulty: "tier2",
        tags: ["projectile", "range", "physics"],
        problemStatement: "A projectile is fired with initial speed v_0 = 98 m/s at an angle of 30 degrees to the horizontal. Assuming g = 9.8 m/s^2, find its horizontal range.",
        finalAnswer: "490\\sqrt{3} \\text{ m}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Total Time of Flight",
            mathExpression: "T = \\frac{2 v_0 \\sin\\alpha}{g} = \\frac{2(98)\\sin(30^\\circ)}{9.8} = \\frac{2(98)(1/2)}{9.8} = 10 \\text{ s}",
            explanation: "Set vertical displacement y(T) = 0 and solve for non-zero time.",
            why: "Calculating duration of flight."
          },
          {
            stepNumber: 2,
            title: "Compute Horizontal Distance Travelled",
            mathExpression: "R = (v_0 \\cos\\alpha) T = (98 \\cos 30^\\circ)(10) = 980 \\left(\\frac{\\sqrt{3}}{2}\\right) = 490\\sqrt{3} \\text{ m}",
            explanation: "Multiply constant horizontal velocity by flight duration.",
            why: "Evaluating horizontal range."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(98**2 * sqrt(3)/2) / 9.8",
          expected: "490*sqrt(3)"
        }
      },
      {
        filename: "ex-04",
        title: "Maximum Altitude of a Projectile",
        exerciseReference: "Section 13.2, Exercise 4",
        originalTopic: "Projectile Maximum Height",
        difficulty: "tier2",
        tags: ["maximum-height", "projectile", "kinematics"],
        problemStatement: "Find the maximum height reached by a projectile launched at 98 m/s with launch angle 30 degrees (g = 9.8 m/s^2).",
        finalAnswer: "\\frac{245}{2} = 122.5 \\text{ m}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Time to Apex",
            mathExpression: "v_y(t) = v_0 \\sin\\alpha - gt = 0 \\implies t_{\\text{apex}} = \\frac{98(1/2)}{9.8} = 5 \\text{ s}",
            explanation: "Vertical velocity vanishes at the peak of the trajectory.",
            why: "Finding apex time."
          },
          {
            stepNumber: 2,
            title: "Evaluate Height at Apex Time",
            mathExpression: "H = y(5) = (98)(1/2)(5) - \\frac{1}{2}(9.8)(5^2) = 245 - 122.5 = 122.5 = \\frac{245}{2} \\text{ m}",
            explanation: "Substitute apex time into vertical position formula.",
            why: "Computing peak altitude."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(98**2 * (1/4)) / (2 * 9.8)",
          expected: "245/2"
        }
      },
      {
        filename: "ex-05",
        title: "Three-Dimensional Particle Trajectory and Landing Location",
        exerciseReference: "Section 13.2, Exercise 5",
        originalTopic: "3D Motion Under Gravity and Wind",
        difficulty: "tier2",
        tags: ["3D-motion", "gravity", "crosswind"],
        problemStatement: "A particle experiences acceleration a(t) = <2, 0, -32> with initial velocity v(0) = <0, 10, 64> and initial position r(0) = <0, 0, 0>. Find the landing location when the particle returns to z = 0.",
        finalAnswer: "(16, 40, 0)",
        steps: [
          {
            stepNumber: 1,
            title: "Integrate for Velocity Vector",
            mathExpression: "\\mathbf{v}(t) = \\langle 2t, 10, 64 - 32t \\rangle",
            explanation: "Integrate acceleration components and apply initial velocity v(0) = <0, 10, 64>.",
            why: "Determining 3D velocity vector."
          },
          {
            stepNumber: 2,
            title: "Integrate for Position Vector",
            mathExpression: "\\mathbf{r}(t) = \\langle t^2, 10t, 64t - 16t^2 \\rangle",
            explanation: "Integrate velocity components with initial condition r(0) = 0.",
            why: "Finding 3D trajectory."
          },
          {
            stepNumber: 3,
            title: "Solve for Landing Time and Position",
            mathExpression: "z(t) = 64t - 16t^2 = 16t(4 - t) = 0 \\implies t = 4; \\quad \\mathbf{r}(4) = \\langle 4^2, 10(4), 0 \\rangle = \\langle 16, 40, 0 \\rangle",
            explanation: "Find positive root of z(t) = 0 and evaluate x(4) and y(4).",
            why: "Locating landing coordinates."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "64*4 - 16*4**2",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch13",
    chapterDir: "ch13-vector-valued-functions-and-motion-in-space",
    section: "13.3",
    sectionDir: "13.3-arc-length-in-space",
    title: "Arc Length in Space",
    definitions: [
      {
        id: "def-arc-length-space",
        title: "Arc Length of a Smooth Space Curve",
        category: "definition",
        latex: "L = \\int_a^b |\\mathbf{v}(t)| \\, dt = \\int_a^b \\sqrt{[f'(t)]^2 + [g'(t)]^2 + [h'(t)]^2} \\, dt",
        statement: "The arc length L of a smooth space curve r(t) on [a, b] is the integral of speed with respect to time. It is intrinsically independent of the specific parametrization chosen.",
        conditions: ["r'(t) is continuous on [a, b]", "Curve is traversed exactly once"],
        explanation: "Approximated by sums of polygonal segment lengths, converging to the Riemann integral of |v(t)|.",
        keyTakeaway: "Arc length measures the total geometric distance traversed along the curved path."
      },
      {
        id: "def-arc-length-parameter",
        title: "Arc Length Parameter and Unit Speed",
        category: "formula",
        latex: "s(t) = \\int_{t_0}^t |\\mathbf{v}(\\tau)| \\, d\\tau, \\quad \\frac{ds}{dt} = |\\mathbf{v}(t)|",
        statement: "The arc length parameter s(t) measures directed distance along the curve from a designated reference point t_0. Parametrizing a curve with respect to s produces unit speed: |dr/ds| = 1.",
        conditions: ["|v(t)| > 0"],
        explanation: "By the Fundamental Theorem of Calculus, ds/dt is speed. Inverting t = t(s) yields the natural unit-speed parametrization.",
        keyTakeaway: "Reparametrization by arc length isolates intrinsic geometry from speed of traversal."
      }
    ],
    summaryMDX: `# Section 13.3: Arc Length in Space

Arc length provides the intrinsic geometric measure of distance along a trajectory in $\\mathbb{R}^3$.

---

## 1. Arc Length Formula

For $\\mathbf{r}(t) = \\langle x(t), y(t), z(t) \\rangle$ on $[a, b]$:
$$L = \\int_a^b \\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2 + \\left(\\frac{dz}{dt}\\right)^2} \\, dt = \\int_a^b |\\mathbf{v}(t)| \\, dt$$

---

## 2. Natural Arc Length Parametrization

- **Arc Length Parameter**: $s(t) = \\int_{t_0}^t |\\mathbf{v}(\\tau)| \\, d\\tau$
- **Speed Relation**: $\\frac{ds}{dt} = |\\mathbf{v}(t)|$
- **Unit Speed Property**: $\\left|\\frac{d\\mathbf{r}}{ds}\\right| = 1$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Arc Length of One Turn of a Circular Helix",
        exerciseReference: "Section 13.3, Exercise 1",
        originalTopic: "Helix Arc Length",
        difficulty: "tier1",
        tags: ["arc-length", "helix", "speed"],
        problemStatement: "Find the arc length of the circular helix r(t) = <3 cos(t), 3 sin(t), 4t> from t = 0 to t = 2*pi.",
        finalAnswer: "10\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Velocity and Speed",
            mathExpression: "\\mathbf{v}(t) = \\langle -3\\sin t, 3\\cos t, 4 \\rangle \\implies |\\mathbf{v}(t)| = \\sqrt{9\\sin^2 t + 9\\cos^2 t + 16} = \\sqrt{9 + 16} = 5",
            explanation: "Evaluate the norm of velocity for all t.",
            why: "Finding constant speed."
          },
          {
            stepNumber: 2,
            title: "Integrate Speed Over the Interval",
            mathExpression: "L = \\int_0^{2\\pi} 5 \\, dt = 5 [t]_0^{2\\pi} = 10\\pi",
            explanation: "Integrate constant speed 5 from 0 to 2*pi.",
            why: "Evaluating total distance."
          }
        ],
        sympyVerification: {
          operation: "integral",
          kind: "definite",
          expression: "5",
          lower: "0",
          upper: "2*pi",
          expected: "10*pi",
          variable: "t"
        }
      },
      {
        filename: "ex-02",
        title: "Arc Length with Non-Constant Speed",
        exerciseReference: "Section 13.3, Exercise 2",
        originalTopic: "Variable Speed Arc Length",
        difficulty: "tier2",
        tags: ["arc-length", "substitution", "space-curve"],
        problemStatement: "Find the arc length of the curve r(t) = <t, (2/3) t^(3/2), t> from t = 0 to t = 3.",
        finalAnswer: "\\frac{2}{3}(5\\sqrt{5} - 2\\sqrt{2})",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Derivative and Speed",
            mathExpression: "\\mathbf{r}'(t) = \\langle 1, t^{1/2}, 1 \\rangle \\implies |\\mathbf{v}(t)| = \\sqrt{1^2 + (\\sqrt{t})^2 + 1^2} = \\sqrt{t + 2}",
            explanation: "Differentiate components and compute Euclidean norm.",
            why: "Formulating integrand for arc length."
          },
          {
            stepNumber: 2,
            title: "Integrate Speed Function",
            mathExpression: "L = \\int_0^3 (t+2)^{1/2} \\, dt = \\left[ \\frac{2}{3}(t+2)^{3/2} \\right]_0^3 = \\frac{2}{3} (5^{3/2} - 2^{3/2}) = \\frac{2}{3}(5\\sqrt{5} - 2\\sqrt{2})",
            explanation: "Apply power rule of integration to (t+2)^(1/2).",
            why: "Evaluating definite arc length integral."
          }
        ],
        sympyVerification: {
          operation: "integral",
          kind: "definite",
          expression: "sqrt(t + 2)",
          lower: "0",
          upper: "3",
          expected: "(2/3)*(5*sqrt(5) - 2*sqrt(2))",
          variable: "t"
        }
      },
      {
        filename: "ex-03",
        title: "Reparametrizing a Curve by Arc Length",
        exerciseReference: "Section 13.3, Exercise 3",
        originalTopic: "Natural Parametrization",
        difficulty: "tier2",
        tags: ["arc-length-parameter", "unit-speed", "helix"],
        problemStatement: "Reparametrize the circular helix r(t) = <cos(t), sin(t), t> with respect to arc length s measured from t = 0.",
        finalAnswer: "\\mathbf{r}(s) = \\left\\langle \\cos\\left(\\frac{s}{\\sqrt{2}}\\right), \\sin\\left(\\frac{s}{\\sqrt{2}}\\right), \\frac{s}{\\sqrt{2}} \\right\\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Calculate Arc Length Parameter Function s(t)",
            mathExpression: "|\\mathbf{v}(t)| = \\sqrt{(-\\sin t)^2 + (\\cos t)^2 + 1} = \\sqrt{2}; \\quad s(t) = \\int_0^t \\sqrt{2} \\, d\\tau = \\sqrt{2}t",
            explanation: "Integrate constant speed sqrt(2) from 0 to t.",
            why: "Expressing s as function of t."
          },
          {
            stepNumber: 2,
            title: "Invert for Parameter t in Terms of s",
            mathExpression: "s = \\sqrt{2}t \\implies t = \\frac{s}{\\sqrt{2}}",
            explanation: "Solve for t as a function of arc length s.",
            why: "Inverting parameter mapping."
          },
          {
            stepNumber: 3,
            title: "Substitute into Position Vector",
            mathExpression: "\\mathbf{r}(s) = \\left\\langle \\cos\\left(\\frac{s}{\\sqrt{2}}\\right), \\sin\\left(\\frac{s}{\\sqrt{2}}\\right), \\frac{s}{\\sqrt{2}} \\right\\rangle",
            explanation: "Replace every occurrence of t with s/sqrt(2).",
            why: "Obtaining unit speed parametrization."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(-sin(s/sqrt(2))/sqrt(2))**2 + (cos(s/sqrt(2))/sqrt(2))**2 + (1/sqrt(2))**2",
          expected: "1"
        }
      },
      {
        filename: "ex-04",
        title: "Arc Length of a Polynomial Space Curve",
        exerciseReference: "Section 13.3, Exercise 4",
        originalTopic: "Polynomial Space Curves",
        difficulty: "tier2",
        tags: ["perfect-square", "polynomial-curve", "arc-length"],
        problemStatement: "Find the arc length of r(t) = <6t, 3t^2, 2t^3> from t = 0 to t = 1.",
        finalAnswer: "8",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Velocity Components",
            mathExpression: "\\mathbf{r}'(t) = \\langle 6, 6t, 6t^2 \\rangle = 6 \\langle 1, t, t^2 \\rangle",
            explanation: "Factor out common constant scalar 6.",
            why: "Simplifying derivative components."
          },
          {
            stepNumber: 2,
            title: "Simplify Speed as a Perfect Square",
            mathExpression: "|\\mathbf{r}'(t)| = 6\\sqrt{1^2 + t^2 + (t^2)^2} = 6\\sqrt{1 + 2t^2 + t^4} = 6\\sqrt{(1 + t^2)^2} = 6(1 + t^2)",
            explanation: "Recognize that the radicand is the perfect square (1 + t^2)^2.",
            why: "Eliminating the radical."
          },
          {
            stepNumber: 3,
            title: "Integrate Speed Over [0, 1]",
            mathExpression: "L = \\int_0^1 6(1 + t^2) \\, dt = 6 \\left[ t + \\frac{t^3}{3} \\right]_0^1 = 6 \\left( 1 + \\frac{1}{3} \\right) = 6 \\left( \\frac{4}{3} \\right) = 8",
            explanation: "Evaluate the polynomial integral.",
            why: "Computing final arc length."
          }
        ],
        sympyVerification: {
          operation: "integral",
          kind: "definite",
          expression: "6*(1 + t**2)",
          lower: "0",
          upper: "1",
          expected: "8",
          variable: "t"
        }
      },
      {
        filename: "ex-05",
        title: "Arc Length of an Exponential Equiangular Spiral",
        exerciseReference: "Section 13.3, Exercise 5",
        originalTopic: "Exponential Curves",
        difficulty: "tier2",
        tags: ["exponential", "spiral", "definite-integral"],
        problemStatement: "Find the length of the curve r(t) = <exp(t) cos(t), exp(t) sin(t), exp(t)> from t = 0 to t = ln(2).",
        finalAnswer: "\\sqrt{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate Each Component",
            mathExpression: "x'(t) = e^t(\\cos t - \\sin t), \\quad y'(t) = e^t(\\sin t + \\cos t), \\quad z'(t) = e^t",
            explanation: "Apply product rule to x(t) and y(t).",
            why: "Evaluating velocity components."
          },
          {
            stepNumber: 2,
            title: "Calculate Speed Magnitude",
            mathExpression: "|\\mathbf{v}(t)|^2 = e^{2t} [(\\cos t - \\sin t)^2 + (\\sin t + \\cos t)^2 + 1] = e^{2t}[2 + 1] = 3e^{2t} \\implies |\\mathbf{v}(t)| = \\sqrt{3}e^t",
            explanation: "Use identity (cos t - sin t)^2 + (sin t + cos t)^2 = 2.",
            why: "Simplifying speed expression."
          },
          {
            stepNumber: 3,
            title: "Integrate from 0 to ln(2)",
            mathExpression: "L = \\int_0^{\\ln 2} \\sqrt{3}e^t \\, dt = \\sqrt{3}[e^t]_0^{\\ln 2} = \\sqrt{3}(2 - 1) = \\sqrt{3}",
            explanation: "Evaluate exponential integral.",
            why: "Computing total arc length."
          }
        ],
        sympyVerification: {
          operation: "integral",
          kind: "definite",
          expression: "sqrt(3)*exp(t)",
          lower: "0",
          upper: "log(2)",
          expected: "sqrt(3)",
          variable: "t"
        }
      }
    ]
  },
  {
    chapter: "ch13",
    chapterDir: "ch13-vector-valued-functions-and-motion-in-space",
    section: "13.4",
    sectionDir: "13.4-curvature-and-normal-vectors-of-a-curve",
    title: "Curvature and Normal Vectors of a Curve",
    definitions: [
      {
        id: "def-curvature",
        title: "Curvature of a Space Curve",
        category: "definition",
        latex: "\\kappa = \\left| \\frac{d\\mathbf{T}}{ds} \\right| = \\frac{|\\mathbf{T}'(t)|}{|\\mathbf{r}'(t)|} = \\frac{|\\mathbf{v} \\times \\mathbf{a}|}{|\\mathbf{v}|^3}",
        statement: "Curvature kappa is the rate at which the unit tangent vector T changes direction per unit of arc length s. It measures how sharply the curve bends at each point.",
        conditions: ["Curve is twice differentiable", "|v| > 0"],
        explanation: "Straight lines have kappa = 0 everywhere; a circle of radius a has constant curvature kappa = 1/a.",
        keyTakeaway: "Radius of curvature rho = 1/kappa is the radius of the osculating (best-fit) circle."
      },
      {
        id: "def-principal-normal-binormal",
        title: "Principal Normal and Binormal Vectors (TNB Frame)",
        category: "definition",
        latex: "\\mathbf{N}(t) = \\frac{\\mathbf{T}'(t)}{|\\mathbf{T}'(t)|}, \\quad \\mathbf{B}(t) = \\mathbf{T}(t) \\times \\mathbf{N}(t)",
        statement: "The principal unit normal vector N points in the direction that T is turning (toward the inside of the curve). The binormal vector B is a unit vector orthogonal to both T and N, completing the right-handed Frenet-Serret orthonormal TNB frame.",
        conditions: ["|T'(t)| != 0"],
        explanation: "The plane spanned by T and N is the osculating plane; T and B span the rectifying plane; N and B span the normal plane.",
        keyTakeaway: "The TNB frame forms a moving orthogonal coordinate system traveling along the trajectory."
      }
    ],
    summaryMDX: `# Section 13.4: Curvature and Normal Vectors of a Curve

Curvature and the Frenet-Serret moving frame characterize the geometric bending and twisting of space curves.

---

## 1. Curvature Formulas

- **Definition**: $\\kappa = \\left|\\frac{d\\mathbf{T}}{ds}\\right| = \\frac{|\\mathbf{T}'(t)|}{|\\mathbf{v}(t)|}$
- **Computational Cross-Product Formula**:
$$\\kappa = \\frac{|\\mathbf{v} \\times \\mathbf{a}|}{|\\mathbf{v}|^3}$$
- **Plane Curve $y = f(x)$**: $\\kappa(x) = \\frac{|f''(x)|}{[1 + (f'(x))^2]^{3/2}}$

---

## 2. The Frenet-Serret TNB Frame

- **Unit Tangent Vector**: $\\mathbf{T} = \\frac{\\mathbf{v}}{|\\mathbf{v}|}$
- **Principal Unit Normal**: $\\mathbf{N} = \\frac{\\mathbf{T}'}{|\\mathbf{T}'|}$
- **Binormal Vector**: $\\mathbf{B} = \\mathbf{T} \\times \\mathbf{N}$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Curvature of a Plane Circle",
        exerciseReference: "Section 13.4, Exercise 1",
        originalTopic: "Circle Curvature",
        difficulty: "tier1",
        tags: ["curvature", "circle", "radius-of-curvature"],
        problemStatement: "Compute the curvature kappa of a circle of radius 4 defined by r(t) = <4 cos(t), 4 sin(t)>.",
        finalAnswer: "\\kappa = \\frac{1}{4}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Velocity and Speed",
            mathExpression: "\\mathbf{v}(t) = \\langle -4\\sin t, 4\\cos t \\rangle \\implies |\\mathbf{v}(t)| = 4",
            explanation: "The speed along a circle of radius 4 with standard parametrization is constant at 4.",
            why: "Determining constant trajectory speed."
          },
          {
            stepNumber: 2,
            title: "Compute Unit Tangent Vector and Derivative",
            mathExpression: "\\mathbf{T}(t) = \\langle -\\sin t, \\cos t \\rangle \\implies \\mathbf{T}'(t) = \\langle -\\cos t, -\\sin t \\rangle \\implies |\\mathbf{T}'(t)| = 1",
            explanation: "Divide v by 4 and differentiate with respect to t.",
            why: "Finding rate of tangent direction turn."
          },
          {
            stepNumber: 3,
            title: "Calculate Curvature",
            mathExpression: "\\kappa = \\frac{|\\mathbf{T}'(t)|}{|\\mathbf{v}(t)|} = \\frac{1}{4}",
            explanation: "Curvature is the reciprocal of the radius of the circle.",
            why: "Evaluating constant circle curvature."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1/4",
          expected: "0.25"
        }
      },
      {
        filename: "ex-02",
        title: "Curvature of a Circular Helix",
        exerciseReference: "Section 13.4, Exercise 2",
        originalTopic: "Helix Curvature",
        difficulty: "tier2",
        tags: ["helix", "curvature", "cross-product"],
        problemStatement: "Compute the curvature kappa of the helix r(t) = <3 cos(t), 3 sin(t), 4t>.",
        finalAnswer: "\\kappa = \\frac{3}{25}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Velocity and Acceleration Vectors",
            mathExpression: "\\mathbf{v}(t) = \\langle -3\\sin t, 3\\cos t, 4 \\rangle, \\quad \\mathbf{a}(t) = \\langle -3\\cos t, -3\\sin t, 0 \\rangle",
            explanation: "Compute first and second derivatives of the helix position vector.",
            why: "Finding kinematic inputs."
          },
          {
            stepNumber: 2,
            title: "Compute Cross Product v x a",
            mathExpression: "\\mathbf{v} \\times \\mathbf{a} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ -3\\sin t & 3\\cos t & 4 \\\\ -3\\cos t & -3\\sin t & 0 \\end{vmatrix} = \\langle 12\\sin t, -12\\cos t, 9 \\rangle",
            explanation: "Evaluate the determinant to find the orthogonal vector.",
            why: "Formulating cross product numerator."
          },
          {
            stepNumber: 3,
            title: "Evaluate Magnitudes and Curvature",
            mathExpression: "|\\mathbf{v} \\times \\mathbf{a}| = \\sqrt{144 + 81} = \\sqrt{225} = 15; \\quad |\\mathbf{v}| = \\sqrt{9 + 16} = 5 \\implies \\kappa = \\frac{15}{5^3} = \\frac{15}{125} = \\frac{3}{25}",
            explanation: "Apply formula kappa = |v x a| / |v|^3.",
            why: "Computing helix curvature."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "15 / (5**3)",
          expected: "3/25"
        }
      },
      {
        filename: "ex-03",
        title: "Principal Unit Normal Vector of a Helix",
        exerciseReference: "Section 13.4, Exercise 3",
        originalTopic: "Principal Unit Normal",
        difficulty: "tier2",
        tags: ["principal-normal", "helix", "TNB-frame"],
        problemStatement: "Find the principal unit normal vector N(t) for the circular helix r(t) = <3 cos(t), 3 sin(t), 4t>.",
        finalAnswer: "\\mathbf{N}(t) = \\langle -\\cos t, -\\sin t, 0 \\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Find Unit Tangent Vector T(t)",
            mathExpression: "\\mathbf{v}(t) = \\langle -3\\sin t, 3\\cos t, 4 \\rangle, \\; |\\mathbf{v}| = 5 \\implies \\mathbf{T}(t) = \\left\\langle -\\frac{3}{5}\\sin t, \\frac{3}{5}\\cos t, \\frac{4}{5} \\right\\rangle",
            explanation: "Divide velocity vector by constant speed 5.",
            why: "Determining unit tangent."
          },
          {
            stepNumber: 2,
            title: "Differentiate T(t) with Respect to t",
            mathExpression: "\\mathbf{T}'(t) = \\left\\langle -\\frac{3}{5}\\cos t, -\\frac{3}{5}\\sin t, 0 \\right\\rangle \\implies |\\mathbf{T}'(t)| = \\frac{3}{5}",
            explanation: "Differentiate components and calculate norm.",
            why: "Finding turning rate of T."
          },
          {
            stepNumber: 3,
            title: "Normalize T'(t) to Obtain N(t)",
            mathExpression: "\\mathbf{N}(t) = \\frac{\\mathbf{T}'(t)}{|\\mathbf{T}'(t)|} = \\frac{5}{3} \\left\\langle -\\frac{3}{5}\\cos t, -\\frac{3}{5}\\sin t, 0 \\right\\rangle = \\langle -\\cos t, -\\sin t, 0 \\rangle",
            explanation: "Divide T' by its norm 3/5.",
            why: "Constructing principal normal vector."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(-cos(t))**2 + (-sin(t))**2",
          expected: "1"
        }
      },
      {
        filename: "ex-04",
        title: "Binormal Vector of a Space Curve",
        exerciseReference: "Section 13.4, Exercise 4",
        originalTopic: "Binormal Vector",
        difficulty: "tier2",
        tags: ["binormal", "TNB", "cross-product"],
        problemStatement: "Compute the binormal vector B(t) for the helix r(t) = <3 cos(t), 3 sin(t), 4t>.",
        finalAnswer: "\\mathbf{B}(t) = \\left\\langle \\frac{4}{5}\\sin t, -\\frac{4}{5}\\cos t, \\frac{3}{5} \\right\\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Take Cross Product B = T x N",
            mathExpression: "\\mathbf{B} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ -\\frac{3}{5}\\sin t & \\frac{3}{5}\\cos t & \\frac{4}{5} \\\\ -\\cos t & -\\sin t & 0 \\end{vmatrix}",
            explanation: "Evaluate the cross product of the unit tangent and normal vectors.",
            why: "Constructing binormal vector."
          },
          {
            stepNumber: 2,
            title: "Calculate Components of B",
            mathExpression: "\\mathbf{B} = \\mathbf{i}\\left(0 - \\left(-\\frac{4}{5}\\sin t\\right)\\right) - \\mathbf{j}\\left(0 - \\left(-\\frac{4}{5}\\cos t\\right)\\right) + \\mathbf{k}\\left(\\frac{3}{5}\\sin^2 t + \\frac{3}{5}\\cos^2 t\\right) = \\left\\langle \\frac{4}{5}\\sin t, -\\frac{4}{5}\\cos t, \\frac{3}{5} \\right\\rangle",
            explanation: "Simplify the minors using sin^2(t) + cos^2(t) = 1.",
            why: "Finalizing binormal expression."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(4/5)**2 + (3/5)**2",
          expected: "1"
        }
      },
      {
        filename: "ex-05",
        title: "Curvature and Radius of Curvature of a Parabola at the Vertex",
        exerciseReference: "Section 13.4, Exercise 5",
        originalTopic: "Curvature of Plane Function",
        difficulty: "tier1",
        tags: ["parabola", "vertex-curvature", "osculating-circle"],
        problemStatement: "Find the curvature kappa and radius of curvature rho of the parabola y = x^2 at its vertex (0, 0).",
        finalAnswer: "\\kappa(0) = 2, \\quad \\rho = \\frac{1}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute First and Second Derivatives",
            mathExpression: "y' = 2x \\implies y'(0) = 0; \\quad y'' = 2 \\implies y''(0) = 2",
            explanation: "Differentiate y = x^2 twice and evaluate at x = 0.",
            why: "Finding derivative inputs for Cartesian curvature."
          },
          {
            stepNumber: 2,
            title: "Apply 2D Curvature Formula",
            mathExpression: "\\kappa(x) = \\frac{|y''|}{[1 + (y')^2]^{3/2}} \\implies \\kappa(0) = \\frac{|2|}{[1 + 0^2]^{3/2}} = \\frac{2}{1} = 2",
            explanation: "Substitute derivative values at the origin.",
            why: "Evaluating vertex curvature."
          },
          {
            stepNumber: 3,
            title: "Calculate Radius of Curvature",
            mathExpression: "\\rho = \\frac{1}{\\kappa(0)} = \\frac{1}{2}",
            explanation: "Take the reciprocal of curvature.",
            why: "Finding radius of osculating circle."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2 / (1 + 0)**(3/2)",
          expected: "2"
        }
      }
    ]
  },
  {
    chapter: "ch13",
    chapterDir: "ch13-vector-valued-functions-and-motion-in-space",
    section: "13.5",
    sectionDir: "13.5-tangential-and-normal-components-of-acceleration",
    title: "Tangential and Normal Components of Acceleration",
    definitions: [
      {
        id: "def-acceleration-decomposition",
        title: "Orthogonal Decomposition of Acceleration",
        category: "theorem",
        latex: "\\mathbf{a} = a_T \\mathbf{T} + a_N \\mathbf{N} = \\left( \\frac{d|\\mathbf{v}|}{dt} \\right) \\mathbf{T} + \\left( \\kappa |\\mathbf{v}|^2 \\right) \\mathbf{N}",
        statement: "The acceleration vector of a moving particle always lies entirely in the osculating plane spanned by T and N (its binormal component is identically zero). The tangential component a_T changes speed, while the normal component a_N changes direction.",
        conditions: ["Curve is twice differentiable", "|v| > 0"],
        explanation: "Scalar formulas: a_T = (v . a)/|v| and a_N = |v x a|/|v| = sqrt(|a|^2 - a_T^2).",
        keyTakeaway: "Disentangles rate of speed change from rate of directional curvature."
      },
      {
        id: "def-osculating-plane",
        title: "Osculating Plane",
        category: "definition",
        latex: "\\mathbf{B} \\cdot (\\mathbf{r} - \\mathbf{r}_0) = 0",
        statement: "The osculating plane at point r_0 on a smooth curve is the plane determined by the unit tangent T and principal normal N. It is the plane that has the closest contact with the curve at that point.",
        conditions: ["Curvature kappa > 0"],
        explanation: "Has normal vector B = T x N. Contains both the velocity vector v and the acceleration vector a.",
        keyTakeaway: "All instantaneous physical acceleration occurs within the osculating plane."
      }
    ],
    summaryMDX: `# Section 13.5: Tangential and Normal Components of Acceleration

Acceleration decomposes into orthogonal components aligned with the moving Frenet frame.

---

## 1. Component Formulas

$$\\mathbf{a} = a_T \\mathbf{T} + a_N \\mathbf{N}$$

- **Tangential Component**: $a_T = \\frac{d}{dt}|\\mathbf{v}| = \\frac{\\mathbf{v} \\cdot \\mathbf{a}}{|\\mathbf{v}|}$
- **Normal Component**: $a_N = \\kappa |\\mathbf{v}|^2 = \\frac{|\\mathbf{v} \\times \\mathbf{a}|}{|\\mathbf{v}|} = \\sqrt{|\\mathbf{a}|^2 - a_T^2}$

---

## 2. Geometric Interpretation

- If speed is constant ($|\\mathbf{v}| = c$), then $a_T = 0$ and $\\mathbf{a} = a_N \\mathbf{N}$ points directly toward the center of curvature.
- The binormal component $a_B = \\mathbf{a} \\cdot \\mathbf{B}$ is always identically zero.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Decomposition of Acceleration for a Space Curve",
        exerciseReference: "Section 13.5, Exercise 1",
        originalTopic: "Acceleration Components",
        difficulty: "tier2",
        tags: ["tangential-acceleration", "normal-acceleration", "decomposition"],
        problemStatement: "Find the tangential and normal components of acceleration a_T and a_N for r(t) = <t, t^2, (1/3) t^3> at t = 1.",
        finalAnswer: "a_T = \\sqrt{6}, \\quad a_N = \\sqrt{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Velocity and Acceleration at t = 1",
            mathExpression: "\\mathbf{v}(t) = \\langle 1, 2t, t^2 \\rangle \\implies \\mathbf{v}(1) = \\langle 1, 2, 1 \\rangle, \\; |\\mathbf{v}(1)| = \\sqrt{1 + 4 + 1} = \\sqrt{6}",
            explanation: "Evaluate velocity vector and speed at t = 1.",
            why: "Finding velocity magnitude."
          },
          {
            stepNumber: 2,
            title: "Evaluate Acceleration Vector at t = 1",
            mathExpression: "\\mathbf{a}(t) = \\langle 0, 2, 2t \\rangle \\implies \\mathbf{a}(1) = \\langle 0, 2, 2 \\rangle, \\; |\\mathbf{a}(1)| = \\sqrt{0 + 4 + 4} = \\sqrt{8}",
            explanation: "Differentiate velocity to find acceleration and compute its norm.",
            why: "Finding acceleration magnitude."
          },
          {
            stepNumber: 3,
            title: "Calculate Tangential Component a_T",
            mathExpression: "a_T = \\frac{\\mathbf{v} \\cdot \\mathbf{a}}{|\\mathbf{v}|} = \\frac{(1)(0) + (2)(2) + (1)(2)}{\\sqrt{6}} = \\frac{6}{\\sqrt{6}} = \\sqrt{6}",
            explanation: "Project acceleration along velocity direction.",
            why: "Evaluating rate of change of speed."
          },
          {
            stepNumber: 4,
            title: "Calculate Normal Component a_N",
            mathExpression: "a_N = \\sqrt{|\\mathbf{a}|^2 - a_T^2} = \\sqrt{8 - (\\sqrt{6})^2} = \\sqrt{8 - 6} = \\sqrt{2}",
            explanation: "Use Pythagorean relation |a|^2 = a_T^2 + a_N^2.",
            why: "Computing centripetal acceleration magnitude."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(sqrt(6))**2 + (sqrt(2))**2",
          expected: "8"
        }
      },
      {
        filename: "ex-02",
        title: "Acceleration in Uniform Circular Motion",
        exerciseReference: "Section 13.5, Exercise 2",
        originalTopic: "Uniform Circular Motion",
        difficulty: "tier1",
        tags: ["uniform-circular-motion", "centripetal-acceleration", "constant-speed"],
        problemStatement: "For r(t) = <4 cos(2t), 4 sin(2t)>, show that a_T = 0 and find a_N.",
        finalAnswer: "a_T = 0, \\quad a_N = 16",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Speed and Tangential Acceleration",
            mathExpression: "\\mathbf{v}(t) = \\langle -8\\sin(2t), 8\\cos(2t) \\rangle \\implies |\\mathbf{v}(t)| = 8 \\implies a_T = \\frac{d}{dt}(8) = 0",
            explanation: "Since speed is constant at 8, the tangential component of acceleration vanishes identically.",
            why: "Confirming vanishing of tangential acceleration."
          },
          {
            stepNumber: 2,
            title: "Compute Acceleration Vector and Normal Component",
            mathExpression: "\\mathbf{a}(t) = \\langle -16\\cos(2t), -16\\sin(2t) \\rangle \\implies |\\mathbf{a}(t)| = 16 \\implies a_N = 16",
            explanation: "Because a_T = 0, the entire acceleration is normal (centripetal): a_N = |a| = 16.",
            why: "Evaluating centripetal acceleration."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt((-16*cos(2*t))**2 + (-16*sin(2*t))**2)",
          expected: "16"
        }
      },
      {
        filename: "ex-03",
        title: "Equation of the Osculating Plane",
        exerciseReference: "Section 13.5, Exercise 3",
        originalTopic: "Osculating Plane",
        difficulty: "tier2",
        tags: ["osculating-plane", "TNB", "helix"],
        problemStatement: "Find the equation of the osculating plane to the circular helix r(t) = <cos(t), sin(t), t> at t = 0.",
        finalAnswer: "z - y = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Point of Contact at t = 0",
            mathExpression: "\\mathbf{r}(0) = \\langle \\cos 0, \\sin 0, 0 \\rangle = \\langle 1, 0, 0 \\rangle",
            explanation: "Evaluate the position at t = 0.",
            why: "Locating contact point."
          },
          {
            stepNumber: 2,
            title: "Determine Binormal Normal Vector",
            mathExpression: "\\mathbf{v}(0) = \\langle 0, 1, 1 \\rangle, \\; \\mathbf{a}(0) = \\langle -1, 0, 0 \\rangle \\implies \\mathbf{v} \\times \\mathbf{a} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 0 & 1 & 1 \\\\ -1 & 0 & 0 \\end{vmatrix} = \\langle 0, -1, 1 \\rangle",
            explanation: "The cross product of velocity and acceleration is parallel to binormal B.",
            why: "Finding normal vector to osculating plane."
          },
          {
            stepNumber: 3,
            title: "Write Plane Equation",
            mathExpression: "0(x - 1) - 1(y - 0) + 1(z - 0) = 0 \\implies -y + z = 0 \\implies z - y = 0",
            explanation: "Substitute point (1, 0, 0) and normal <0, -1, 1>.",
            why: "Formulating osculating plane."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "z - y",
          expected: "-y + z"
        }
      },
      {
        filename: "ex-04",
        title: "Computing Curvature from Acceleration Components",
        exerciseReference: "Section 13.5, Exercise 4",
        originalTopic: "Curvature from Acceleration",
        difficulty: "tier1",
        tags: ["curvature", "acceleration-components", "speed"],
        problemStatement: "A particle moves with speed |v| = 3 and has normal acceleration component a_N = 6. Find the curvature kappa of its path.",
        finalAnswer: "\\kappa = \\frac{2}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Recall Relation Between a_N, Speed, and Curvature",
            mathExpression: "a_N = \\kappa |\\mathbf{v}|^2 \\implies \\kappa = \\frac{a_N}{|\\mathbf{v}|^2}",
            explanation: "Isolate curvature kappa in the normal acceleration formula.",
            why: "Formulating curvature relation."
          },
          {
            stepNumber: 2,
            title: "Substitute Given Numerical Values",
            mathExpression: "\\kappa = \\frac{6}{3^2} = \\frac{6}{9} = \\frac{2}{3}",
            explanation: "Substitute a_N = 6 and |v| = 3.",
            why: "Computing path curvature."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "6 / (3**2)",
          expected: "2/3"
        }
      },
      {
        filename: "ex-05",
        title: "Maximum Acceleration in Elliptic Planetary Orbit",
        exerciseReference: "Section 13.5, Exercise 5",
        originalTopic: "Orbital Acceleration",
        difficulty: "tier2",
        tags: ["elliptic-orbit", "planetary-motion", "acceleration"],
        problemStatement: "For an elliptical path r(t) = <5 cos(t), 3 sin(t)>, find the maximum magnitude of acceleration |a(t)|.",
        finalAnswer: "5",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Acceleration Vector Function",
            mathExpression: "\\mathbf{a}(t) = \\mathbf{r}''(t) = \\langle -5\\cos t, -3\\sin t \\rangle = -\\mathbf{r}(t)",
            explanation: "Differentiate position vector twice with respect to t.",
            why: "Finding acceleration."
          },
          {
            stepNumber: 2,
            title: "Determine Acceleration Magnitude Function",
            mathExpression: "|\\mathbf{a}(t)| = \\sqrt{25\\cos^2 t + 9\\sin^2 t} = \\sqrt{9 + 16\\cos^2 t}",
            explanation: "Express magnitude using trigonometric identity sin^2(t) = 1 - cos^2(t).",
            why: "Expressing norm as single-variable function."
          },
          {
            stepNumber: 3,
            title: "Find Global Maximum",
            mathExpression: "\\cos^2 t \\le 1 \\implies |\\mathbf{a}|_{\\max} = \\sqrt{9 + 16(1)} = \\sqrt{25} = 5",
            explanation: "Maximum occurs at periapsis where cos^2(t) = 1.",
            why: "Evaluating maximum acceleration magnitude."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(25*1 + 9*0)",
          expected: "5"
        }
      }
    ]
  },
  {
    chapter: "ch13",
    chapterDir: "ch13-vector-valued-functions-and-motion-in-space",
    section: "13.6",
    sectionDir: "13.6-velocity-and-acceleration-in-polar-coordinates",
    title: "Velocity and Acceleration in Polar Coordinates",
    definitions: [
      {
        id: "def-polar-unit-vectors",
        title: "Polar Unit Vectors",
        category: "definition",
        latex: "\\mathbf{u}_r = \\cos\\theta \\, \\mathbf{i} + \\sin\\theta \\, \\mathbf{j}, \\quad \\mathbf{u}_\\theta = -\\sin\\theta \\, \\mathbf{i} + \\cos\\theta \\, \\mathbf{j}",
        statement: "In polar coordinates, u_r is the radial unit vector pointing away from the origin along the ray theta, and u_theta is the transverse unit vector pointing in the direction of increasing theta. They form a right-handed orthonormal basis.",
        conditions: ["u_r . u_theta = 0", "|u_r| = |u_theta| = 1"],
        explanation: "Their derivatives satisfy d u_r / d theta = u_theta and d u_theta / d theta = -u_r.",
        keyTakeaway: "Basis vectors rotate with the position of the particle."
      },
      {
        id: "formula-polar-kinematics",
        title: "Velocity and Acceleration in Polar Coordinates",
        category: "formula",
        latex: "\\mathbf{v} = \\dot{r}\\mathbf{u}_r + r\\dot{\\theta}\\mathbf{u}_\\theta, \\quad \\mathbf{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\mathbf{u}_r + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\mathbf{u}_\\theta",
        statement: "Decomposes velocity and acceleration into radial and transverse components. The term 2 dot{r} dot{theta} is the Coriolis acceleration.",
        conditions: ["r(t) and theta(t) are twice differentiable"],
        explanation: "Under a central force field (a_theta = 0), angular momentum r^2 dot{theta} = h is conserved, proving Kepler's Second Law of equal areas in equal times.",
        keyTakeaway: "Radial acceleration includes centripetal term -r dot{theta}^2, while transverse acceleration contains Coriolis coupling."
      }
    ],
    summaryMDX: `# Section 13.6: Velocity and Acceleration in Polar Coordinates

Planetary orbits and central-force mechanics are most naturally described in polar coordinates.

---

## 1. Velocity and Acceleration Decompositions

- **Position**: $\\mathbf{r} = r \\mathbf{u}_r$
- **Velocity**: $\\mathbf{v} = \\dot{r}\\mathbf{u}_r + r\\dot{\\theta}\\mathbf{u}_\\theta$
- **Acceleration**:
$$\\mathbf{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\mathbf{u}_r + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\mathbf{u}_\\theta$$

---

## 2. Kepler's Laws of Planetary Motion

1. **First Law**: Planets move in elliptical orbits with the Sun at one focus.
2. **Second Law (Equal Areas)**: A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time: $\\frac{dA}{dt} = \\frac{1}{2}r^2\\dot{\\theta} = \\frac{h}{2} = \\text{constant}$.
3. **Third Law**: The square of the orbital period is proportional to the cube of the semi-major axis: $T^2 = \\frac{4\\pi^2}{G M} a^3$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Polar Velocity on an Archimedean Spiral",
        exerciseReference: "Section 13.6, Exercise 1",
        originalTopic: "Polar Velocity",
        difficulty: "tier1",
        tags: ["polar-coordinates", "spiral", "velocity"],
        problemStatement: "A particle moves along the spiral r = 2*theta with constant angular speed d(theta)/dt = 3 rad/s. Find its velocity vector in polar coordinates at theta = pi/2.",
        finalAnswer: "\\mathbf{v} = 6\\mathbf{u}_r + 3\\pi\\mathbf{u}_\\theta, \\quad |\\mathbf{v}| = 3\\sqrt{4 + \\pi^2}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Radial Derivative dr/dt",
            mathExpression: "\\dot{r} = \\frac{dr}{d\\theta} \\dot{\\theta} = 2(3) = 6",
            explanation: "Apply chain rule dr/dt = (dr/dtheta) (dtheta/dt).",
            why: "Finding radial velocity component."
          },
          {
            stepNumber: 2,
            title: "Compute Transverse Velocity Component",
            mathExpression: "v_\\theta = r \\dot{\\theta} = (2 \\cdot \\pi/2)(3) = 3\\pi",
            explanation: "Multiply radius r = pi at theta = pi/2 by angular speed 3.",
            why: "Finding transverse velocity component."
          },
          {
            stepNumber: 3,
            title: "Assemble Velocity and Compute Magnitude",
            mathExpression: "\\mathbf{v} = 6\\mathbf{u}_r + 3\\pi\\mathbf{u}_\\theta \\implies |\\mathbf{v}| = \\sqrt{6^2 + (3\\pi)^2} = \\sqrt{36 + 9\\pi^2} = 3\\sqrt{4 + \\pi^2}",
            explanation: "Radial and transverse components are mutually orthogonal.",
            why: "Evaluating speed in polar coordinates."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(6**2 + (3*pi)**2)",
          expected: "3*sqrt(4 + pi**2)"
        }
      },
      {
        filename: "ex-02",
        title: "Centripetal Acceleration on a Circular Orbit",
        exerciseReference: "Section 13.6, Exercise 2",
        originalTopic: "Circular Orbit Acceleration",
        difficulty: "tier1",
        tags: ["centripetal", "circular-orbit", "polar-acceleration"],
        problemStatement: "A satellite orbits on circle r = 4 with constant angular velocity d(theta)/dt = 5 rad/s. Find its acceleration vector in polar coordinates.",
        finalAnswer: "\\mathbf{a} = -100\\mathbf{u}_r",
        steps: [
          {
            stepNumber: 1,
            title: "Determine Radial and Angular Derivatives",
            mathExpression: "r = 4, \\quad \\dot{r} = 0, \\quad \\ddot{r} = 0; \\quad \\dot{\\theta} = 5, \\quad \\ddot{\\theta} = 0",
            explanation: "Since radius and angular velocity are constant, all higher time derivatives vanish.",
            why: "Identifying kinematic derivatives."
          },
          {
            stepNumber: 2,
            title: "Apply Polar Acceleration Formula",
            mathExpression: "a_r = \\ddot{r} - r\\dot{\\theta}^2 = 0 - 4(5^2) = -100; \\quad a_\\theta = r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta} = 0 + 0 = 0",
            explanation: "Evaluate radial and transverse components.",
            why: "Demonstrating purely centripetal nature of acceleration."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4 * 5**2",
          expected: "100"
        }
      },
      {
        filename: "ex-03",
        title: "Orthogonality of Polar Basis Vectors",
        exerciseReference: "Section 13.6, Exercise 3",
        originalTopic: "Polar Unit Vectors",
        difficulty: "tier1",
        tags: ["polar-basis", "orthogonality", "unit-vectors"],
        problemStatement: "Verify that the polar unit vectors u_r and u_theta are orthogonal for any angle theta.",
        finalAnswer: "\\mathbf{u}_r \\cdot \\mathbf{u}_\\theta = 0",
        steps: [
          {
            stepNumber: 1,
            title: "Write Expressions in Cartesian Basis",
            mathExpression: "\\mathbf{u}_r = \\cos\\theta\\mathbf{i} + \\sin\\theta\\mathbf{j}, \\quad \\mathbf{u}_\\theta = -\\sin\\theta\\mathbf{i} + \\cos\\theta\\mathbf{j}",
            explanation: "Express the polar basis vectors in terms of standard unit vectors i and j.",
            why: "Setting up Cartesian dot product."
          },
          {
            stepNumber: 2,
            title: "Calculate Dot Product",
            mathExpression: "\\mathbf{u}_r \\cdot \\mathbf{u}_\\theta = (\\cos\\theta)(-\\sin\\theta) + (\\sin\\theta)(\\cos\\theta) = -\\sin\\theta\\cos\\theta + \\sin\\theta\\cos\\theta = 0",
            explanation: "Multiply corresponding components and cancel identical opposite terms.",
            why: "Proving orthogonality for all angles."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "cos(theta)*(-sin(theta)) + sin(theta)*cos(theta)",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Areal Velocity in a Central Force Field",
        exerciseReference: "Section 13.6, Exercise 4",
        originalTopic: "Kepler's Second Law",
        difficulty: "tier2",
        tags: ["areal-velocity", "Kepler", "central-force"],
        problemStatement: "Compute the rate at which area is swept out by a planet at r = 10 AU with angular velocity d(theta)/dt = 0.4 rad/year.",
        finalAnswer: "\\frac{dA}{dt} = 20 \\text{ AU}^2/\\text{year}",
        steps: [
          {
            stepNumber: 1,
            title: "Recall Areal Velocity Formula",
            mathExpression: "\\frac{dA}{dt} = \\frac{1}{2} r^2 \\dot{\\theta}",
            explanation: "The area swept by the radius vector in time dt is dA = (1/2) r (r dtheta).",
            why: "Applying geometric sector area rate."
          },
          {
            stepNumber: 2,
            title: "Substitute Given Parameters",
            mathExpression: "\\frac{dA}{dt} = \\frac{1}{2} (10^2) (0.4) = \\frac{1}{2}(100)(0.4) = 20",
            explanation: "Evaluate the product.",
            why: "Calculating constant areal rate."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1/2) * 10**2 * 0.4",
          expected: "20"
        }
      },
      {
        filename: "ex-05",
        title: "Orbital Period from Kepler's Third Law",
        exerciseReference: "Section 13.6, Exercise 5",
        originalTopic: "Kepler's Third Law",
        difficulty: "tier2",
        tags: ["Kepler-third-law", "orbital-period", "semi-major-axis"],
        problemStatement: "An asteroid has a circular orbit with radius a = 4 AU around the Sun. Find its orbital period T in Earth years.",
        finalAnswer: "T = 8 \\text{ years}",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Kepler's Harmonic Law",
            mathExpression: "T^2 = a^3",
            explanation: "In units of Astronomical Units (AU) and Earth years, Kepler's Third Law takes the normalized form T^2 = a^3.",
            why: "Using normalized planetary units."
          },
          {
            stepNumber: 2,
            title: "Solve for Orbital Period T",
            mathExpression: "T = a^{3/2} = 4^{3/2} = (\\sqrt{4})^3 = 2^3 = 8 \\text{ years}",
            explanation: "Compute 4 to the power 3/2.",
            why: "Evaluating orbital period."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4**(3/2)",
          expected: "8"
        }
      }
    ]
  }
];
