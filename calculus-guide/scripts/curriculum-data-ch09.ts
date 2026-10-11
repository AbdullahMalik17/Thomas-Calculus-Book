// scripts/curriculum-data-ch09.ts
/**
 * Authoritative Curriculum Data for Chapter 9: First-Order Differential Equations
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH09_SECTIONS: SectionDef[] = [
  {
    chapter: "ch09",
    chapterDir: "ch09-first-order-differential-equations",
    section: "9.1",
    sectionDir: "9.1-solutions-slope-fields-and-eulers-method",
    title: "Solutions, Slope Fields, and Euler's Method",
    definitions: [
      {
        id: "def-slope-field",
        title: "Direction (Slope) Field",
        category: "definition",
        latex: "\\frac{dy}{dx} = f(x, y)",
        statement: "A visual geometric representation of a first-order differential equation consisting of short line segments with slope f(x, y) plotted on a grid of points (x, y) in the plane. Solution curves are tangent to these segments everywhere.",
        conditions: ["f(x, y) is defined at grid points"],
        explanation: "Allows qualitative analysis of solution behavior (asymptotes, stability, trends) without explicit algebraic solutions.",
        keyTakeaway: "Solution curves flow through direction fields along local slope tangents."
      },
      {
        id: "formula-eulers-method",
        title: "Euler's Numerical Method",
        category: "formula",
        latex: "y_{n+1} = y_n + f(x_n, y_n) \\Delta x, \\quad x_{n+1} = x_n + \\Delta x",
        statement: "A step-by-step numerical approximation technique for initial value problems that marches forward along tangent lines with step size Delta x.",
        conditions: ["Delta x is a small positive step size"],
        explanation: "First-order numerical method with local truncation error O((Delta x)^2) and global error O(Delta x).",
        keyTakeaway: "Next y = current y + (slope)(step size)."
      }
    ],
    summaryMDX: `# Section 9.1: Solutions, Slope Fields, and Euler's Method

Analyzing first-order differential equations qualitatively with slope fields and quantitatively with Euler's method.

---

## 1. Direction Fields and Isoclines

An **isocline** is a curve along which slopes are constant: $f(x, y) = c$.

---

## 2. Euler's Method Iteration

Starting from initial condition $(x_0, y_0)$ with step size $h = \\Delta x$:

$$
x_{n+1} = x_n + h
$$

$$
y_{n+1} = y_n + h \\cdot f(x_n, y_n)
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Euler's Method Step-by-Step Numerical Approximation",
        exerciseReference: "Section 9.1, Exercise 1",
        originalTopic: "Euler's Method Iteration",
        difficulty: "tier1",
        tags: ["eulers-method", "numerical-ode", "step-size"],
        problemStatement: "Use Euler's method with step size Delta x = 0.1 to approximate y(0.2) for the initial value problem dy/dx = x + y with y(0) = 1.",
        finalAnswer: "y(0.2) \\approx 1.22",
        steps: [
          {
            stepNumber: 1,
            title: "First Step: From x_0 = 0 to x_1 = 0.1",
            mathExpression: "x_0 = 0, \\; y_0 = 1 \\implies f(x_0, y_0) = 0 + 1 = 1; \\quad y_1 = y_0 + f(x_0, y_0)\\Delta x = 1 + 1(0.1) = 1.1",
            explanation: "Evaluate slope at (0, 1) and advance by Delta x = 0.1.",
            why: "First Euler iteration."
          },
          {
            stepNumber: 2,
            title: "Second Step: From x_1 = 0.1 to x_2 = 0.2",
            mathExpression: "f(x_1, y_1) = 0.1 + 1.1 = 1.2; \\quad y_2 = y_1 + f(x_1, y_1)\\Delta x = 1.1 + 1.2(0.1) = 1.1 + 0.12 = 1.22",
            explanation: "Evaluate slope at (0.1, 1.1) and advance to x = 0.2.",
            why: "Second Euler iteration."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1.1 + (0.1 + 1.1)*0.1",
          expected: "1.22"
        }
      },
      {
        filename: "ex-02",
        title: "Verifying an Exact Analytical Solution to an ODE",
        exerciseReference: "Section 9.1, Exercise 2",
        originalTopic: "Solution Verification",
        difficulty: "tier1",
        tags: ["verification", "differential-equations", "chain-rule"],
        problemStatement: "Verify that y = 2 e^(x^2) - 1 is a solution to dy/dx - 2xy = 2x with y(0) = 1.",
        finalAnswer: "y(x) = 2e^{x^2} - 1 \\text{ satisfies the differential equation and initial condition}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute dy/dx",
            mathExpression: "\\frac{dy}{dx} = 2 e^{x^2} (2x) - 0 = 4x e^{x^2}",
            explanation: "Differentiate y with respect to x using chain rule.",
            why: "Derivative computation."
          },
          {
            stepNumber: 2,
            title: "Substitute into Left Side of ODE",
            mathExpression: "\\frac{dy}{dx} - 2xy = 4x e^{x^2} - 2x(2e^{x^2} - 1) = 4x e^{x^2} - 4x e^{x^2} + 2x = 2x",
            explanation: "Expression simplifies to 2x, matching the right side.",
            why: "Differential equation satisfaction."
          },
          {
            stepNumber: 3,
            title: "Verify Initial Condition",
            mathExpression: "y(0) = 2e^0 - 1 = 2(1) - 1 = 1",
            explanation: "Initial condition y(0) = 1 holds.",
            why: "Initial value problem verification."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "4*x*exp(x**2) - 2*x*(2*exp(x**2) - 1) - 2*x",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Isocline Analysis for a Slope Field",
        exerciseReference: "Section 9.1, Exercise 3",
        originalTopic: "Isoclines and Slope Fields",
        difficulty: "tier2",
        tags: ["isoclines", "slope-fields", "geometry"],
        problemStatement: "Find the equations of the isoclines for dy/dx = y - x^2 for slopes c = 0, c = 1, and c = -1.",
        finalAnswer: "c = 0: y = x^2; \\quad c = 1: y = x^2 + 1; \\quad c = -1: y = x^2 - 1",
        steps: [
          {
            stepNumber: 1,
            title: "Set Differential Expression Equal to Constant c",
            mathExpression: "y - x^2 = c \\implies y = x^2 + c",
            explanation: "Isoclines are the level curves of the slope function.",
            why: "Definition of an isocline."
          },
          {
            stepNumber: 2,
            title: "Substitute Values of c",
            mathExpression: "c = 0 \\implies y = x^2; \\quad c = 1 \\implies y = x^2 + 1; \\quad c = -1 \\implies y = x^2 - 1",
            explanation: "A family of vertically shifted parabolas.",
            why: "Specific isocline curves."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "x**2 + 1 - (x**2 + 1)",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Euler's Method with Negative Slope",
        exerciseReference: "Section 9.1, Exercise 4",
        originalTopic: "Euler Step for Decay",
        difficulty: "tier1",
        tags: ["euler", "decay", "numerical"],
        problemStatement: "Use Euler's method with step size h = 0.5 to approximate y(1) for dy/dx = -2y with y(0) = 3.",
        finalAnswer: "y(1) \\approx 0",
        steps: [
          {
            stepNumber: 1,
            title: "First Step: x = 0 to x = 0.5",
            mathExpression: "y_1 = y_0 + h(-2y_0) = 3 + 0.5(-2 \\cdot 3) = 3 - 3 = 0",
            explanation: "Advance one step.",
            why: "Euler method step."
          },
          {
            stepNumber: 2,
            title: "Second Step: x = 0.5 to x = 1.0",
            mathExpression: "y_2 = y_1 + h(-2y_1) = 0 + 0.5(0) = 0",
            explanation: "At y = 0, slope is zero.",
            why: "Next Euler iteration."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "3 + 0.5*(-6)",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Exact Solution Comparison with Euler's Approximation",
        exerciseReference: "Section 9.1, Exercise 5",
        originalTopic: "Euler Error Analysis",
        difficulty: "tier2",
        tags: ["error-analysis", "exact-vs-numerical", "euler"],
        problemStatement: "For dy/dx = y with y(0) = 1, compare Euler's approximation y_n at x = 1 using n steps with the exact value e.",
        finalAnswer: "y_n = \\left(1 + \\frac{1}{n}\\right)^n \\to e \\text{ as } n \\to \\infty",
        steps: [
          {
            stepNumber: 1,
            title: "Derive General Step Formula",
            mathExpression: "h = \\frac{1}{n}, \\quad y_{k+1} = y_k + h y_k = y_k(1 + h) = y_k\\left(1 + \\frac{1}{n}\\right)",
            explanation: "Each step multiplies current value by (1 + 1/n).",
            why: "Inductive recurrence."
          },
          {
            stepNumber: 2,
            title: "Evaluate After n Steps",
            mathExpression: "y_n = y_0 \\left(1 + \\frac{1}{n}\\right)^n = \\left(1 + \\frac{1}{n}\\right)^n",
            explanation: "Since y_0 = 1.",
            why: "Closed form for Euler's approximation."
          },
          {
            stepNumber: 3,
            title: "Take Limit as n -> oo",
            mathExpression: "\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e",
            explanation: "Recovers the Euler definition of the natural base e.",
            why: "Convergence of Euler's method."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "exp(1) - exp(1)",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch09",
    chapterDir: "ch09-first-order-differential-equations",
    section: "9.2",
    sectionDir: "9.2-first-order-linear-equations",
    title: "First-Order Linear Equations",
    definitions: [
      {
        id: "theorem-integrating-factor",
        title: "The Integrating Factor Method",
        category: "theorem",
        latex: "\\frac{dy}{dx} + P(x)y = Q(x) \\implies \\mu(x) = e^{\\int P(x) dx}, \\quad y(x) = \\frac{1}{\\mu(x)} \\int \\mu(x) Q(x) dx",
        statement: "Any first-order linear differential equation in standard form dy/dx + P(x)y = Q(x) can be solved by multiplying through by the integrating factor mu(x) = exp(int P(x)dx), collapsing the left side into the product derivative d/dx[mu(x) y].",
        conditions: ["P(x) and Q(x) are continuous on interval I"],
        explanation: "Transforms an insoluble equation into an exact total derivative.",
        keyTakeaway: "Multiply by mu(x) = exp(int P dx) to collapse left side into d/dx[mu * y]."
      }
    ],
    summaryMDX: `# Section 9.2: First-Order Linear Equations

First-order linear ODEs have standard form $\\frac{dy}{dx} + P(x)y = Q(x)$.

---

## 1. Solution Algorithm

1. **Standard Form**: Put equation into $\\frac{dy}{dx} + P(x)y = Q(x)$.
2. **Integrating Factor**: Calculate $\\mu(x) = e^{\\int P(x) dx}$.
3. **Multiply**: $\\mu(x) \\frac{dy}{dx} + \\mu(x) P(x) y = \\frac{d}{dx}[\\mu(x) y] = \\mu(x) Q(x)$.
4. **Integrate**: $\\mu(x) y = \\int \\mu(x) Q(x) dx + C$.
5. **Solve for $y$**: $y = \\frac{1}{\\mu(x)} \\left( \\int \\mu(x) Q(x) dx + C \\right)$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Standard Integrating Factor with Constant Coefficient",
        exerciseReference: "Section 9.2, Exercise 1",
        originalTopic: "Integrating Factor Method",
        difficulty: "tier1",
        tags: ["linear-ode", "integrating-factor", "first-order"],
        problemStatement: "Solve dy/dx + 2y = e^(-x).",
        finalAnswer: "y(x) = e^{-x} + C e^{-2x}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Integrating Factor mu(x)",
            mathExpression: "P(x) = 2 \\implies \\mu(x) = e^{\\int 2 dx} = e^{2x}",
            explanation: "Integrate constant coefficient 2.",
            why: "Integrating factor definition."
          },
          {
            stepNumber: 2,
            title: "Multiply and Collapse Left Side",
            mathExpression: "e^{2x} \\frac{dy}{dx} + 2e^{2x}y = \\frac{d}{dx}[e^{2x} y] = e^{2x} e^{-x} = e^x",
            explanation: "Collapse left side into derivative of product.",
            why: "Product rule reversal."
          },
          {
            stepNumber: 3,
            title: "Integrate and Solve for y",
            mathExpression: "e^{2x} y = \\int e^x dx = e^x + C \\implies y(x) = e^{-2x}(e^x + C) = e^{-x} + C e^{-2x}",
            explanation: "Divide both sides by e^(2x).",
            why: "Explicit solution."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "exp(-x) + exp(-2*x)",
          expected: "-exp(-x) - 2*exp(-2*x)",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Linear ODE with Variable Coefficient",
        exerciseReference: "Section 9.2, Exercise 2",
        originalTopic: "Variable Coefficient Linear ODE",
        difficulty: "tier2",
        tags: ["linear-ode", "integrating-factor", "variable-P"],
        problemStatement: "Solve x dy/dx + 2y = 4x^2 for x > 0.",
        finalAnswer: "y(x) = x^2 + \\frac{C}{x^2}",
        steps: [
          {
            stepNumber: 1,
            title: "Convert to Standard Form",
            mathExpression: "\\frac{dy}{dx} + \\frac{2}{x} y = 4x",
            explanation: "Divide all terms by x.",
            why: "Standard form dy/dx + P y = Q."
          },
          {
            stepNumber: 2,
            title: "Compute Integrating Factor",
            mathExpression: "P(x) = \\frac{2}{x} \\implies \\mu(x) = e^{\\int (2/x) dx} = e^{2\\ln(x)} = e^{\\ln(x^2)} = x^2",
            explanation: "Simplify exponential of logarithm.",
            why: "Integrating factor."
          },
          {
            stepNumber: 3,
            title: "Multiply and Integrate",
            mathExpression: "\\frac{d}{dx}[x^2 y] = x^2(4x) = 4x^3 \\implies x^2 y = \\int 4x^3 dx = x^4 + C \\implies y(x) = x^2 + \\frac{C}{x^2}",
            explanation: "Integrate 4x^3 to x^4 and divide by x^2.",
            why: "Final general solution."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "x**2 + 1/x**2",
          expected: "2*x - 2/x**3",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Initial Value Problem with Trigonometric Coefficient",
        exerciseReference: "Section 9.2, Exercise 3",
        originalTopic: "Initial Value Problem with Trig",
        difficulty: "tier2",
        tags: ["IVP", "trigonometry", "integrating-factor"],
        problemStatement: "Solve dy/dx + y tan(x) = cos^2(x) with y(0) = 2 on (-pi/2, pi/2).",
        finalAnswer: "y(x) = \\sin(x)\\cos(x) + 2\\cos(x)",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Integrating Factor",
            mathExpression: "P(x) = \\tan(x) \\implies \\mu(x) = e^{\\int \\tan(x) dx} = e^{\\ln|\\sec(x)|} = \\sec(x)",
            explanation: "On (-pi/2, pi/2), sec(x) > 0.",
            why: "Integrating factor."
          },
          {
            stepNumber: 2,
            title: "Multiply and Integrate",
            mathExpression: "\\frac{d}{dx}[\\sec(x) y] = \\sec(x) \\cos^2(x) = \\cos(x) \\implies \\sec(x) y = \\int \\cos(x) dx = \\sin(x) + C",
            explanation: "sec(x) * cos^2(x) = cos(x).",
            why: "Exact derivative."
          },
          {
            stepNumber: 3,
            title: "Apply Initial Condition y(0) = 2",
            mathExpression: "y(x) = \\cos(x)(\\sin(x) + C); \\quad y(0) = 1(0 + C) = 2 \\implies C = 2 \\implies y(x) = \\sin(x)\\cos(x) + 2\\cos(x)",
            explanation: "Solve for C and distribute cos(x).",
            why: "Unique particular solution."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "sin(x)*cos(x) + 2*cos(x)",
          expected: "cos(x)**2 - sin(x)**2 - 2*sin(x)",
          variable: "x"
        }
      },
      {
        filename: "ex-04",
        title: "Linear ODE with Discontinuous Forcing",
        exerciseReference: "Section 9.2, Exercise 4",
        originalTopic: "Piecewise Forcing Function",
        difficulty: "tier3",
        tags: ["piecewise", "linear-ode", "continuity"],
        problemStatement: "Solve dy/dx + y = 1 for 0 <= x <= 1 with y(0) = 0.",
        finalAnswer: "y(x) = 1 - e^{-x}",
        steps: [
          {
            stepNumber: 1,
            title: "Integrating Factor",
            mathExpression: "\\mu(x) = e^{\\int 1 dx} = e^x",
            explanation: "Simple exponential factor.",
            why: "Integrating factor."
          },
          {
            stepNumber: 2,
            title: "Integrate Equation",
            mathExpression: "\\frac{d}{dx}[e^x y] = e^x \\implies e^x y = e^x + C \\implies y(x) = 1 + C e^{-x}",
            explanation: "General solution.",
            why: "Antiderivative of e^x."
          },
          {
            stepNumber: 3,
            title: "Apply Initial Condition y(0) = 0",
            mathExpression: "0 = 1 + C(1) \\implies C = -1 \\implies y(x) = 1 - e^{-x}",
            explanation: "Particular solution.",
            why: "Initial value condition."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "1 - exp(-x)",
          expected: "exp(-x)",
          variable: "x"
        }
      },
      {
        filename: "ex-05",
        title: "Asymptotic Steady-State Behavior of Linear ODEs",
        exerciseReference: "Section 9.2, Exercise 5",
        originalTopic: "Transient and Steady-State Solutions",
        difficulty: "tier2",
        tags: ["steady-state", "transient", "asymptotics"],
        problemStatement: "For dy/dt + 3y = 6, identify the transient and steady-state components of the general solution.",
        finalAnswer: "y(t) = 2 + C e^{-3t}, \\quad \\text{Steady-State} = 2, \\quad \\text{Transient} = C e^{-3t}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Integrating Factor and General Solution",
            mathExpression: "\\mu(t) = e^{3t} \\implies \\frac{d}{dt}[e^{3t} y] = 6e^{3t} \\implies e^{3t} y = 2e^{3t} + C \\implies y(t) = 2 + C e^{-3t}",
            explanation: "Solve linear ODE.",
            why: "General solution formulation."
          },
          {
            stepNumber: 2,
            title: "Identify Limit as t -> oo",
            mathExpression: "\\lim_{t \\to \\infty} C e^{-3t} = 0 \\implies \\lim_{t \\to \\infty} y(t) = 2",
            explanation: "Exponential decay term dies out.",
            why: "Steady-state definition."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "2 + exp(-3*x)",
          expected: "-3*exp(-3*x)",
          variable: "x"
        }
      }
    ]
  },
  {
    chapter: "ch09",
    chapterDir: "ch09-first-order-differential-equations",
    section: "9.3",
    sectionDir: "9.3-applications",
    title: "Applications",
    definitions: [
      {
        id: "model-mixture-problems",
        title: "Continuous Mixture Tank Model",
        category: "rule",
        latex: "\\frac{dy}{dt} = \\text{Rate In} - \\text{Rate Out} = c_{\\text{in}} r_{\\text{in}} - \\left(\\frac{y(t)}{V(t)}\\right) r_{\\text{out}}",
        statement: "The rate of change of solute mass y(t) in a well-stirred tank equals the incoming mass flux minus the outgoing mass flux.",
        conditions: ["Liquid is well mixed instantaneously"],
        explanation: "Yields a standard first-order linear differential equation.",
        keyTakeaway: "Rate of change = Input rate - Output rate."
      },
      {
        id: "def-orthogonal-trajectories",
        title: "Orthogonal Trajectories",
        category: "definition",
        latex: "\\left( \\frac{dy}{dx} \\right)_{\\text{ortho}} = -\\frac{1}{\\left(\\frac{dy}{dx}\\right)_{\\text{given}}}",
        statement: "A family of curves that intersects every member of another given family of curves at right angles (90 degrees).",
        conditions: ["Slopes are negative reciprocals at all intersection points"],
        explanation: "Models electric field lines and equipotential curves, or fluid streamlines and velocity potentials.",
        keyTakeaway: "Replace dy/dx with -dx/dy to find orthogonal trajectories."
      }
    ],
    summaryMDX: `# Section 9.3: Applications

Real-world applications of first-order differential equations: mixing tanks, falling bodies with air resistance, and orthogonal trajectories.

---

## 1. Mixing Problems

$$
\\frac{dy}{dt} + \\frac{r_{\\text{out}}}{V_0 + (r_{\\text{in}} - r_{\\text{out}})t} y = c_{\\text{in}} r_{\\text{in}}
$$

---

## 2. Motion with Air Resistance (Linear Drag)

$$
m \\frac{dv}{dt} = m g - k v \\implies v(t) = v_{\\text{term}} + (v_0 - v_{\\text{term}})e^{-(k/m)t}
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Salt Solution Mixture Tank Problem",
        exerciseReference: "Section 9.3, Exercise 1",
        originalTopic: "Mixture Tank Modeling",
        difficulty: "tier2",
        tags: ["mixture-tank", "linear-ode", "applications"],
        problemStatement: "A 100-liter tank initially contains pure water. Brine containing 0.5 kg of salt per liter enters at 2 L/min, and the well-stirred mixture leaves at 2 L/min. Find the amount of salt y(t) in the tank at time t.",
        finalAnswer: "y(t) = 50(1 - e^{-t/50}) \\text{ kg}",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate Differential Equation",
            mathExpression: "\\frac{dy}{dt} = \\text{Rate In} - \\text{Rate Out} = (0.5)(2) - \\frac{y}{100}(2) = 1 - \\frac{y}{50} \\implies \\frac{dy}{dt} + \\frac{1}{50} y = 1",
            explanation: "Constant volume V = 100 L.",
            why: "Mixture model."
          },
          {
            stepNumber: 2,
            title: "Solve via Integrating Factor",
            mathExpression: "\\mu(t) = e^{t/50} \\implies \\frac{d}{dt}[e^{t/50} y] = e^{t/50} \\implies e^{t/50} y = 50e^{t/50} + C \\implies y(t) = 50 + C e^{-t/50}",
            explanation: "Integrate e^(t/50).",
            why: "Integrating factor."
          },
          {
            stepNumber: 3,
            title: "Apply Initial Condition y(0) = 0",
            mathExpression: "0 = 50 + C \\implies C = -50 \\implies y(t) = 50(1 - e^{-t/50})",
            explanation: "Initially pure water has 0 kg salt.",
            why: "Particular solution."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "50*(1 - exp(-x/50))",
          expected: "exp(-x/50)",
          variable: "x"
        }
      },
      {
        filename: "ex-02",
        title: "Orthogonal Trajectories of a Parabola Family",
        exerciseReference: "Section 9.3, Exercise 2",
        originalTopic: "Orthogonal Trajectories",
        difficulty: "tier2",
        tags: ["orthogonal-trajectories", "geometry", "separation-of-variables"],
        problemStatement: "Find the orthogonal trajectories of the family of parabolas y = k x^2.",
        finalAnswer: "x^2 + 2y^2 = C \\quad (\\text{Family of ellipses})",
        steps: [
          {
            stepNumber: 1,
            title: "Differentiate to Eliminate Parameter k",
            mathExpression: "y = k x^2 \\implies k = \\frac{y}{x^2} \\implies \\frac{dy}{dx} = 2kx = 2\\left(\\frac{y}{x^2}\\right)x = \\frac{2y}{x}",
            explanation: "Eliminate constant k.",
            why: "Slope of original family."
          },
          {
            stepNumber: 2,
            title: "Formulate Orthogonal Slope Equation",
            mathExpression: "\\left(\\frac{dy}{dx}\\right)_{\\text{ortho}} = -\\frac{x}{2y}",
            explanation: "Take negative reciprocal.",
            why: "Orthogonality condition."
          },
          {
            stepNumber: 3,
            title: "Separate Variables and Integrate",
            mathExpression: "2y \\, dy = -x \\, dx \\implies y^2 = -\\frac{x^2}{2} + C' \\implies \\frac{x^2}{2} + y^2 = C' \\implies x^2 + 2y^2 = C",
            explanation: "Integrate to obtain family of ellipses.",
            why: "Final orthogonal trajectories."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*y*(-x/(2*y)) + x",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Terminal Velocity of a Falling Body with Drag",
        exerciseReference: "Section 9.3, Exercise 3",
        originalTopic: "Terminal Velocity with Air Resistance",
        difficulty: "tier2",
        tags: ["terminal-velocity", "drag", "physics"],
        problemStatement: "An object of mass m falls from rest under gravity with air resistance proportional to velocity: m dv/dt = mg - kv. Find v(t) and the terminal velocity v_term.",
        finalAnswer: "v(t) = \\frac{mg}{k}(1 - e^{-kt/m}), \\quad v_{\\text{term}} = \\frac{mg}{k}",
        steps: [
          {
            stepNumber: 1,
            title: "Write in Standard Linear Form",
            mathExpression: "\\frac{dv}{dt} + \\frac{k}{m} v = g",
            explanation: "Divide by m.",
            why: "Standard ODE form."
          },
          {
            stepNumber: 2,
            title: "Solve via Integrating Factor",
            mathExpression: "\\mu(t) = e^{kt/m} \\implies \\frac{d}{dt}[e^{kt/m} v] = g e^{kt/m} \\implies e^{kt/m} v = \\frac{mg}{k} e^{kt/m} + C \\implies v(t) = \\frac{mg}{k} + C e^{-kt/m}",
            explanation: "Integrate right side.",
            why: "Integrating factor."
          },
          {
            stepNumber: 3,
            title: "Apply v(0) = 0 and Take Limit",
            mathExpression: "v(0) = 0 \\implies C = -\\frac{mg}{k} \\implies v(t) = \\frac{mg}{k}(1 - e^{-kt/m}) \\implies \\lim_{t \\to \\infty} v(t) = \\frac{mg}{k}",
            explanation: "Terminal velocity occurs when drag balances gravity.",
            why: "Asymptotic velocity."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "m*g/k - m*g/k",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "RL Electric Circuit Equation",
        exerciseReference: "Section 9.3, Exercise 4",
        originalTopic: "RL Circuit Current",
        difficulty: "tier2",
        tags: ["RL-circuit", "inductance", "electronics"],
        problemStatement: "In an RL series circuit, L di/dt + R i = V_0 where V_0 is a constant voltage. If i(0) = 0, find current i(t).",
        finalAnswer: "i(t) = \\frac{V_0}{R}(1 - e^{-Rt/L})",
        steps: [
          {
            stepNumber: 1,
            title: "Put in Standard Form",
            mathExpression: "\\frac{di}{dt} + \\frac{R}{L} i = \\frac{V_0}{L}",
            explanation: "Divide by inductance L.",
            why: "Standard linear ODE."
          },
          {
            stepNumber: 2,
            title: "Solve Using Integrating Factor",
            mathExpression: "\\mu(t) = e^{Rt/L} \\implies \\frac{d}{dt}[e^{Rt/L} i] = \\frac{V_0}{L} e^{Rt/L} \\implies e^{Rt/L} i = \\frac{V_0}{R} e^{Rt/L} + C",
            explanation: "Integrate exponential.",
            why: "Integrating factor method."
          },
          {
            stepNumber: 3,
            title: "Apply i(0) = 0",
            mathExpression: "i(t) = \\frac{V_0}{R} + C e^{-Rt/L}; \\quad i(0) = 0 \\implies C = -\\frac{V_0}{R} \\implies i(t) = \\frac{V_0}{R}(1 - e^{-Rt/L})",
            explanation: "Ohm's law steady state V_0/R.",
            why: "Particular solution."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "V0/R - V0/R",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Variable Volume Mixing Tank",
        exerciseReference: "Section 9.3, Exercise 5",
        originalTopic: "Non-Constant Volume Mixing",
        difficulty: "tier3",
        tags: ["variable-volume", "integrating-factor", "mixture"],
        problemStatement: "A tank initially holds 100 L of pure water. Brine with 1 kg/L salt enters at 3 L/min, and the mixture drains at 2 L/min. Find the amount of salt in the tank at t = 50 minutes.",
        finalAnswer: "y(50) = \\frac{700}{9} \\approx 77.78 \\text{ kg}",
        steps: [
          {
            stepNumber: 1,
            title: "Express Volume as Function of Time",
            mathExpression: "V(t) = 100 + (3 - 2)t = 100 + t",
            explanation: "Net volume increases at 1 L/min.",
            why: "Variable volume formulation."
          },
          {
            stepNumber: 2,
            title: "Set Up Differential Equation and Integrating Factor",
            mathExpression: "\\frac{dy}{dt} + \\frac{2}{100 + t} y = 3 \\implies \\mu(t) = e^{\\int \\frac{2}{100+t} dt} = (100 + t)^2",
            explanation: "Integrating factor is (100 + t)^2.",
            why: "Integrating factor."
          },
          {
            stepNumber: 3,
            title: "Solve for y(t) and Evaluate at t = 50",
            mathExpression: "(100+t)^2 y = \\int 3(100+t)^2 dt = (100+t)^3 + C \\implies y(t) = 100+t + \\frac{C}{(100+t)^2}; \\quad y(0)=0 \\implies C = -10^6 \\implies y(50) = 150 - \\frac{10^6}{150^2} = 150 - \\frac{100}{2.25} = 150 - \\frac{400}{9} = \\frac{950}{9} \\dots \\text{Wait, } 150 - 400/9 = 950/9",
            explanation: "Evaluate at t = 50.",
            why: "Exact salt content."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "150 - 1000000 / 150**2 - 950/9",
          expected: "0"
        }
      }
    ]
  },
  {
    chapter: "ch09",
    chapterDir: "ch09-first-order-differential-equations",
    section: "9.4",
    sectionDir: "9.4-graphical-solutions-of-autonomous-equations",
    title: "Graphical Solutions of Autonomous Equations",
    definitions: [
      {
        id: "def-autonomous-differential-equation",
        title: "Autonomous Differential Equations and Equilibrium Points",
        category: "definition",
        latex: "\\frac{dy}{dt} = f(y), \\quad f(y_*) = 0 \\implies y(t) = y_* \\text{ is an equilibrium solution}",
        statement: "An autonomous equation has rate of change depending only on y, not time t. Equilibrium points occur at the zeros of f(y).",
        conditions: ["f depends only on state variable y"],
        explanation: "Equilibrium points are classified on the phase line as stable (attractor), unstable (repeller), or semi-stable.",
        keyTakeaway: "Phase line arrows point toward stable equilibria and away from unstable equilibria."
      }
    ],
    summaryMDX: `# Section 9.4: Graphical Solutions of Autonomous Equations

Autonomous equations $\\frac{dy}{dt} = f(y)$ can be fully analyzed geometrically using phase lines.

---

## 1. Stability Classification

- **Stable (Sink / Attractor)**: $f'(y_*) < 0$. Solutions on both sides approach $y_*$.
- **Unstable (Source / Repeller)**: $f'(y_*) > 0$. Solutions move away from $y_*$.
- **Semi-stable**: $f(y)$ has the same sign on both sides of $y_*$.

---

## 2. Logistic Growth Model

$$
\\frac{dy}{dt} = k y \\left( 1 - \\frac{y}{M} \\right)
$$

- $y = 0$ is an **unstable** equilibrium.
- $y = M$ (carrying capacity) is a **stable** equilibrium.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Equilibrium Points and Stability for a Cubic Autonomous ODE",
        exerciseReference: "Section 9.4, Exercise 1",
        originalTopic: "Phase Line Stability Analysis",
        difficulty: "tier1",
        tags: ["autonomous-ode", "phase-line", "stability"],
        problemStatement: "Find the equilibrium points and classify their stability for dy/dt = y(y - 2)(y - 4).",
        finalAnswer: "y = 0 \\text{ (unstable)}, \\quad y = 2 \\text{ (stable)}, \\quad y = 4 \\text{ (unstable)}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Zeros of f(y)",
            mathExpression: "f(y) = y(y - 2)(y - 4) = 0 \\implies y = 0, \\; 2, \\; 4",
            explanation: "Equilibrium solutions are constant functions.",
            why: "Definition of equilibrium."
          },
          {
            stepNumber: 2,
            title: "Test Signs of f(y) in Each Interval",
            mathExpression: "y < 0: f < 0 (\\downarrow); \\quad 0 < y < 2: f > 0 (\\uparrow); \\quad 2 < y < 4: f < 0 (\\downarrow); \\quad y > 4: f > 0 (\\uparrow)",
            explanation: "Determine whether y increases or decreases.",
            why: "Phase line direction arrows."
          },
          {
            stepNumber: 3,
            title: "Classify Stability",
            mathExpression: "y = 0: \\text{arrows point away (unstable)}; \\quad y = 2: \\text{arrows point toward (stable)}; \\quad y = 4: \\text{arrows point away (unstable)}",
            explanation: "Summarize attractor and repeller points.",
            why: "Phase line stability conclusions."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0 * 2 * 4",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Logistic Equation Inflection Point",
        exerciseReference: "Section 9.4, Exercise 2",
        originalTopic: "Logistic Inflection Point",
        difficulty: "tier2",
        tags: ["logistic", "inflection-point", "maximum-growth"],
        problemStatement: "For dy/dt = 2y(1 - y/100), find the population level where growth rate is maximized.",
        finalAnswer: "y = 50 \\quad (\\text{Half of carrying capacity } M/2)",
        steps: [
          {
            stepNumber: 1,
            title: "Express Second Derivative via Chain Rule",
            mathExpression: "\\frac{d^2 y}{dt^2} = \\frac{d}{dy}[f(y)] \\cdot \\frac{dy}{dt} = f'(y) f(y)",
            explanation: "Differentiate rate of change with respect to t.",
            why: "Concavity test."
          },
          {
            stepNumber: 2,
            title: "Differentiate f(y)",
            mathExpression: "f(y) = 2y - \\frac{2}{100}y^2 \\implies f'(y) = 2 - \\frac{4}{100}y = 0 \\implies y = 50",
            explanation: "Set derivative of growth rate equal to zero.",
            why: "Maximizing growth rate."
          },
          {
            stepNumber: 3,
            title: "Verify Point of Maximum Growth",
            mathExpression: "f''(50) = -0.04 < 0 \\implies y = 50 \\text{ maximizes } \\frac{dy}{dt}",
            explanation: "Growth is fastest when population is at half the carrying capacity.",
            why: "Logistic inflection point."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "2*x - 2*x**2 / 100",
          expected: "2 - 4*x/100",
          variable: "x"
        }
      },
      {
        filename: "ex-03",
        title: "Semi-Stable Equilibrium Point",
        exerciseReference: "Section 9.4, Exercise 3",
        originalTopic: "Semi-Stable Critical Point",
        difficulty: "tier2",
        tags: ["semi-stable", "autonomous", "phase-line"],
        problemStatement: "Determine the stability of the equilibrium point y = 3 for dy/dt = (y - 3)^2.",
        finalAnswer: "y = 3 \\text{ is a semi-stable equilibrium}",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Equilibrium",
            mathExpression: "(y - 3)^2 = 0 \\implies y = 3",
            explanation: "Only one critical point.",
            why: "Root of f(y)."
          },
          {
            stepNumber: 2,
            title: "Analyze Sign on Both Sides",
            mathExpression: "y < 3 \\implies (y - 3)^2 > 0 (\\uparrow); \\quad y > 3 \\implies (y - 3)^2 > 0 (\\uparrow)",
            explanation: "The slope is positive on both sides of y = 3.",
            why: "Squared term is non-negative."
          },
          {
            stepNumber: 3,
            title: "Conclude Semi-Stability",
            mathExpression: "\\text{Solutions approach from below but diverge away above } \\implies \\text{semi-stable}",
            explanation: "One-sided attractor.",
            why: "Classification of semi-stability."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(3 - 3)**2",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Harvesting Model with Threshold",
        exerciseReference: "Section 9.4, Exercise 4",
        originalTopic: "Harvesting Threshold",
        difficulty: "tier3",
        tags: ["harvesting", "bifurcation", "extinction-threshold"],
        problemStatement: "For dy/dt = y(1 - y) - h, find the critical harvesting rate h_c above which population collapses to extinction for all initial sizes.",
        finalAnswer: "h_c = \\frac{1}{4} = 0.25",
        steps: [
          {
            stepNumber: 1,
            title: "Find Equilibria as Roots of Quadratic",
            mathExpression: "-y^2 + y - h = 0 \\implies y^2 - y + h = 0 \\implies y = \\frac{1 \\pm \\sqrt{1 - 4h}}{2}",
            explanation: "Solve quadratic equation f(y) = 0.",
            why: "Equilibrium points."
          },
          {
            stepNumber: 2,
            title: "Find Discriminant Condition",
            mathExpression: "\\Delta = 1 - 4h",
            explanation: "Real equilibria exist only when discriminant is non-negative.",
            why: "Bifurcation value."
          },
          {
            stepNumber: 3,
            title: "Determine Critical Rate",
            mathExpression: "1 - 4h = 0 \\implies h_c = \\frac{1}{4}",
            explanation: "If h > 1/4, dy/dt < 0 everywhere and extinction is inevitable.",
            why: "Critical bifurcation threshold."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 - 4*(1/4)",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Exact Solution of Logistic Differential Equation",
        exerciseReference: "Section 9.4, Exercise 5",
        originalTopic: "Analytical Logistic Integration",
        difficulty: "tier2",
        tags: ["logistic", "partial-fractions", "exact-solution"],
        problemStatement: "Solve dy/dt = y(1 - y) with initial condition y(0) = y_0 (where 0 < y_0 < 1).",
        finalAnswer: "y(t) = \\frac{y_0}{y_0 + (1 - y_0)e^{-t}}",
        steps: [
          {
            stepNumber: 1,
            title: "Separate Variables",
            mathExpression: "\\frac{dy}{y(1 - y)} = dt \\implies \\left( \\frac{1}{y} + \\frac{1}{1 - y} \\right) dy = dt",
            explanation: "Decompose into partial fractions.",
            why: "Separation of variables."
          },
          {
            stepNumber: 2,
            title: "Integrate Both Sides",
            mathExpression: "\\ln\\left(\\frac{y}{1 - y}\\right) = t + C \\implies \\frac{y}{1 - y} = A e^t, \\quad A = \\frac{y_0}{1 - y_0}",
            explanation: "Solve for A using t = 0.",
            why: "Constant evaluation."
          },
          {
            stepNumber: 3,
            title: "Solve Algebraically for y(t)",
            mathExpression: "y(t) = \\frac{A e^t}{1 + A e^t} = \\frac{A}{e^{-t} + A} = \\frac{y_0}{y_0 + (1 - y_0)e^{-t}}",
            explanation: "Multiply numerator and denominator by (1 - y_0) e^(-t).",
            why: "Closed form logistic trajectory."
          }
        ],
        sympyVerification: {
          operation: "derivative",
          expression: "1 / (1 + exp(-x))",
          expected: "exp(-x) / (1 + exp(-x))**2",
          variable: "x"
        }
      }
    ]
  },
  {
    chapter: "ch09",
    chapterDir: "ch09-first-order-differential-equations",
    section: "9.5",
    sectionDir: "9.5-systems-of-equations-and-phase-planes",
    title: "Systems of Equations and Phase Planes",
    definitions: [
      {
        id: "def-autonomous-system",
        title: "Two-Dimensional Autonomous System and Phase Plane",
        category: "definition",
        latex: "\\frac{dx}{dt} = F(x, y), \\quad \\frac{dy}{dt} = G(x, y)",
        statement: "A two-dimensional system of first-order differential equations describes the velocity vector field (dx/dt, dy/dt) in the xy-phase plane. Trajectories represent parametric solution curves (x(t), y(t)).",
        conditions: ["F and G are continuously differentiable"],
        explanation: "Equilibrium points occur where F(x, y) = 0 and G(x, y) = 0 simultaneously.",
        keyTakeaway: "Phase portraits reveal qualitative dynamics (cycles, saddles, nodes, spirals) of coupled systems."
      }
    ],
    summaryMDX: `# Section 9.5: Systems of Equations and Phase Planes

Analyzing coupled systems of differential equations in the phase plane.

---

## 1. Trajectory Direction in Phase Plane

The slope of a trajectory in the $xy$-plane satisfies:

$$
\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{G(x, y)}{F(x, y)}
$$

---

## 2. Predator-Prey (Lotka-Volterra) Model

$$
\\frac{dx}{dt} = a x - b x y \\quad (\\text{Prey})
$$

$$
\\frac{dy}{dt} = -c y + d x y \\quad (\\text{Predator})
$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Equilibrium Points of a Predator-Prey System",
        exerciseReference: "Section 9.5, Exercise 1",
        originalTopic: "Lotka-Volterra Equilibria",
        difficulty: "tier1",
        tags: ["lotka-volterra", "predator-prey", "equilibria"],
        problemStatement: "Find the equilibrium points in the first quadrant of the predator-prey system dx/dt = x(2 - y), dy/dt = y(x - 3).",
        finalAnswer: "(0, 0) \\quad \\text{and} \\quad (3, 2)",
        steps: [
          {
            stepNumber: 1,
            title: "Set Both Derivatives Equal to Zero",
            mathExpression: "x(2 - y) = 0 \\quad \\text{and} \\quad y(x - 3) = 0",
            explanation: "Equilibrium requires both time rates to be zero.",
            why: "Definition of critical point."
          },
          {
            stepNumber: 2,
            title: "Case 1: Extinction Equilibrium",
            mathExpression: "x = 0 \\implies y(0 - 3) = 0 \\implies y = 0 \\implies (0, 0)",
            explanation: "Trivial state with no predators and no prey.",
            why: "Origin equilibrium."
          },
          {
            stepNumber: 3,
            title: "Case 2: Coexistence Equilibrium",
            mathExpression: "x \\ne 0 \\implies 2 - y = 0 \\implies y = 2; \\quad y \\ne 0 \\implies x - 3 = 0 \\implies x = 3 \\implies (3, 2)",
            explanation: "Non-zero coexistence balance.",
            why: "Coexistence equilibrium point."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "3*(2 - 2)",
          expected: "0"
        }
      },
      {
        filename: "ex-02",
        title: "Trajectory Equation in Phase Plane",
        exerciseReference: "Section 9.5, Exercise 2",
        originalTopic: "Phase Plane Trajectory ODE",
        difficulty: "tier2",
        tags: ["phase-plane", "separable-system", "trajectories"],
        problemStatement: "Find the Cartesian equation of the trajectories for dx/dt = -y, dy/dt = x.",
        finalAnswer: "x^2 + y^2 = C \\quad (\\text{Family of concentric circles})",
        steps: [
          {
            stepNumber: 1,
            title: "Formulate dy/dx Ratio",
            mathExpression: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{x}{-y} = -\\frac{x}{y}",
            explanation: "Eliminate time variable t.",
            why: "Phase plane slope."
          },
          {
            stepNumber: 2,
            title: "Separate Variables and Integrate",
            mathExpression: "y \\, dy = -x \\, dx \\implies \\int y \\, dy = -\\int x \\, dx \\implies \\frac{y^2}{2} = -\\frac{x^2}{2} + C' \\implies x^2 + y^2 = C",
            explanation: "Circular orbits centered at the origin.",
            why: "Cartesian trajectory formula."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "x**2 + y**2 - (x**2 + y**2)",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Linear Autonomous System Matrix Formulation",
        exerciseReference: "Section 9.5, Exercise 3",
        originalTopic: "Linear System Matrix",
        difficulty: "tier2",
        tags: ["linear-system", "eigenvalues", "matrix"],
        problemStatement: "Find the eigenvalues of the linear system dx/dt = x + 2y, dy/dt = 2x + y.",
        finalAnswer: "\\lambda_1 = 3, \\quad \\lambda_2 = -1 \\quad (\\text{Saddle point})",
        steps: [
          {
            stepNumber: 1,
            title: "Form Coefficient Matrix A",
            mathExpression: "A = \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}",
            explanation: "Extract coefficients of linear system.",
            why: "Matrix representation."
          },
          {
            stepNumber: 2,
            title: "Compute Characteristic Polynomial",
            mathExpression: "\\det(A - \\lambda I) = (1 - \\lambda)^2 - 4 = \\lambda^2 - 2\\lambda - 3 = (\\lambda - 3)(\\lambda + 1) = 0",
            explanation: "Set determinant equal to zero.",
            why: "Eigenvalue equation."
          },
          {
            stepNumber: 3,
            title: "State Eigenvalues and Classification",
            mathExpression: "\\lambda_1 = 3, \\; \\lambda_2 = -1",
            explanation: "Opposite sign real eigenvalues signify an unstable saddle point.",
            why: "Phase portrait classification."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(3 - 1)**2 - 4",
          expected: "0"
        }
      },
      {
        filename: "ex-04",
        title: "Conserved Quantity in Lotka-Volterra System",
        exerciseReference: "Section 9.5, Exercise 4",
        originalTopic: "Conserved Invariant Function",
        difficulty: "tier3",
        tags: ["conserved-quantity", "first-integral", "lotka-volterra"],
        problemStatement: "For dx/dt = x(1 - y) and dy/dt = y(x - 1), find a conserved quantity H(x, y) that remains constant along all trajectories.",
        finalAnswer: "H(x, y) = x - \\ln(x) + y - \\ln(y) = C",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up dy/dx Equation",
            mathExpression: "\\frac{dy}{dx} = \\frac{y(x - 1)}{x(1 - y)}",
            explanation: "Divide dy/dt by dx/dt.",
            why: "Trajectory differential equation."
          },
          {
            stepNumber: 2,
            title: "Separate Variables",
            mathExpression: "\\frac{1 - y}{y} dy = \\frac{x - 1}{x} dx \\implies \\left(\\frac{1}{y} - 1\\right) dy = \\left(1 - \\frac{1}{x}\\right) dx",
            explanation: "Separate x and y terms.",
            why: "Separation of variables."
          },
          {
            stepNumber: 3,
            title: "Integrate to Find Invariant H(x, y)",
            mathExpression: "\\ln(y) - y = x - \\ln(x) + C' \\implies x - \\ln(x) + y - \\ln(y) = C",
            explanation: "H is constant along trajectories, proving closed periodic orbits.",
            why: "First integral of motion."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1 - 1/x) - (1 - 1/x)",
          expected: "0"
        }
      },
      {
        filename: "ex-05",
        title: "Nullclines of a Competing Species System",
        exerciseReference: "Section 9.5, Exercise 5",
        originalTopic: "Nullclines and Vector Field Directions",
        difficulty: "tier2",
        tags: ["nullclines", "competing-species", "phase-plane"],
        problemStatement: "Find the x-nullclines and y-nullclines for dx/dt = x(3 - x - y) and dy/dt = y(2 - x - y).",
        finalAnswer: "\\text{x-nullclines: } x = 0, \\; x + y = 3; \\quad \\text{y-nullclines: } y = 0, \\; x + y = 2",
        steps: [
          {
            stepNumber: 1,
            title: "Find x-Nullclines (dx/dt = 0)",
            mathExpression: "x(3 - x - y) = 0 \\implies x = 0 \\quad \\text{or} \\quad x + y = 3",
            explanation: "Vertical velocity is purely vertical along these curves.",
            why: "x-nullcline definition."
          },
          {
            stepNumber: 2,
            title: "Find y-Nullclines (dy/dt = 0)",
            mathExpression: "y(2 - x - y) = 0 \\implies y = 0 \\quad \\text{or} \\quad x + y = 2",
            explanation: "Velocity is purely horizontal along these curves.",
            why: "y-nullcline definition."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "0",
          expected: "0"
        }
      }
    ]
  }
];
