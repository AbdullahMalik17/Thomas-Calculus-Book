// scripts/curriculum-data-ch12.ts
/**
 * Authoritative Curriculum Data for Chapter 12: Vectors and the Geometry of Space
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import { SectionDef } from './curriculum-data-ch02';

export const CH12_SECTIONS: SectionDef[] = [
  {
    chapter: "ch12",
    chapterDir: "ch12-vectors-and-the-geometry-of-space",
    section: "12.1",
    sectionDir: "12.1-three-dimensional-coordinate-systems",
    title: "Three-Dimensional Coordinate Systems",
    definitions: [
      {
        id: "def-cartesian-coordinates-3d",
        title: "Three-Dimensional Cartesian Coordinate System",
        category: "definition",
        latex: "P(x, y, z) \\in \\mathbb{R}^3",
        statement: "A three-dimensional Cartesian coordinate system is formed by three mutually perpendicular directed coordinate axes (the x-, y-, and z-axes) meeting at a single origin point (0, 0, 0) and satisfying the right-hand rule.",
        conditions: ["Axes are mutually orthogonal", "Orientation follows standard right-hand rule"],
        explanation: "Every point in Euclidean 3-space is identified with a unique ordered triplet of real numbers representing signed distances from coordinate planes.",
        keyTakeaway: "Extends Cartesian plane geometry to physical 3D space via three coordinate planes: xy, yz, and xz."
      },
      {
        id: "formula-distance-sphere-3d",
        title: "Distance Formula and Standard Equation of a Sphere",
        category: "formula",
        latex: "|P_1 P_2| = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}, \\quad (x-h)^2 + (y-k)^2 + (z-l)^2 = a^2",
        statement: "The Euclidean distance between P_1(x_1, y_1, z_1) and P_2(x_2, y_2, z_2) derives from double application of the Pythagorean theorem. A sphere of radius a centered at (h, k, l) is the locus of points at distance a from (h, k, l).",
        conditions: ["Radius a > 0", "Coordinates are real numbers"],
        explanation: "Completing the square in quadratic 3D equations reveals the center and radius of spheres or determines if the locus is degenerate.",
        keyTakeaway: "Spheres generalize 2D circles into 3D through equal distance from a central locus."
      }
    ],
    summaryMDX: `# Section 12.1: Three-Dimensional Coordinate Systems

To locate points in three-dimensional space, we introduce three mutually perpendicular coordinate axes meeting at the origin $O(0,0,0)$.

---

## 1. Coordinate Planes and Octants

The three axes determine three coordinate planes:
- The **$xy$-plane** has equation $z = 0$.
- The **$yz$-plane** has equation $x = 0$.
- The **$xz$-plane** has equation $y = 0$.

These planes divide 3-space into eight regions called **octants**. The first octant contains all points with positive coordinates ($x > 0, y > 0, z > 0$).

---

## 2. Distance and Spheres

The distance between $P_1(x_1, y_1, z_1)$ and $P_2(x_2, y_2, z_2)$ is:
$$|P_1 P_2| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$

The standard equation of a sphere of radius $a$ centered at $(h, k, l)$ is:
$$(x - h)^2 + (y - k)^2 + (z - l)^2 = a^2$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Distance Between Points in 3D Space",
        exerciseReference: "Section 12.1, Exercise 1",
        originalTopic: "Distance in Space",
        difficulty: "tier1",
        tags: ["3D-distance", "analytic-geometry", "Euclidean-space"],
        problemStatement: "Find the distance between the two points P_1(1, -2, 4) and P_2(3, 2, -1) in three-dimensional space.",
        finalAnswer: "3\\sqrt{5}",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Coordinate Differences",
            mathExpression: "\\Delta x = 3 - 1 = 2, \\quad \\Delta y = 2 - (-2) = 4, \\quad \\Delta z = -1 - 4 = -5",
            explanation: "Compute the difference along each orthogonal axis.",
            why: "Determining orthogonal displacement components."
          },
          {
            stepNumber: 2,
            title: "Apply 3D Distance Formula",
            mathExpression: "d = \\sqrt{2^2 + 4^2 + (-5)^2} = \\sqrt{4 + 16 + 25} = \\sqrt{45} = 3\\sqrt{5}",
            explanation: "Sum the squared coordinate differences and take the positive square root.",
            why: "Evaluating Euclidean distance in 3-space."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt((3 - 1)**2 + (2 - (-2))**2 + (-1 - 4)**2)",
          expected: "3*sqrt(5)"
        }
      },
      {
        filename: "ex-02",
        title: "Center and Radius of a Sphere by Completing the Square",
        exerciseReference: "Section 12.1, Exercise 2",
        originalTopic: "Equations of Spheres",
        difficulty: "tier1",
        tags: ["sphere", "completing-the-square", "quadric-equations"],
        problemStatement: "Find the center (h, k, l) and radius a of the sphere defined by the equation x^2 + y^2 + z^2 - 6x + 4y - 2z = 11.",
        finalAnswer: "\\text{Center: } (3, -2, 1), \\quad \\text{Radius: } 5",
        steps: [
          {
            stepNumber: 1,
            title: "Group Terms by Variable",
            mathExpression: "(x^2 - 6x) + (y^2 + 4y) + (z^2 - 2z) = 11",
            explanation: "Group terms corresponding to each coordinate variable.",
            why: "Preparing variables for quadratic completion."
          },
          {
            stepNumber: 2,
            title: "Complete the Square for Each Variable",
            mathExpression: "(x - 3)^2 - 9 + (y + 2)^2 - 4 + (z - 1)^2 - 1 = 11",
            explanation: "Add and balance constants: (-6/2)^2 = 9, (4/2)^2 = 4, (-2/2)^2 = 1.",
            why: "Transforming to standard sphere format."
          },
          {
            stepNumber: 3,
            title: "Write in Standard Form",
            mathExpression: "(x - 3)^2 + (y + 2)^2 + (z - 1)^2 = 11 + 9 + 4 + 1 = 25 = 5^2",
            explanation: "Identify center (3, -2, 1) and radius sqrt(25) = 5.",
            why: "Extracting geometric sphere parameters."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(x - 3)**2 + (y + 2)**2 + (z - 1)**2 - 25",
          expected: "x**2 + y**2 + z**2 - 6*x + 4*y - 2*z - 11"
        }
      },
      {
        filename: "ex-03",
        title: "Midpoint of a 3D Line Segment",
        exerciseReference: "Section 12.1, Exercise 3",
        originalTopic: "Midpoint Formula in 3D",
        difficulty: "tier1",
        tags: ["midpoint", "geometry", "vectors"],
        problemStatement: "Find the coordinates of the midpoint M of the line segment joining A(2, 4, -6) and B(8, -2, 4).",
        finalAnswer: "(5, 1, -1)",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Component-Wise Midpoint Formula",
            mathExpression: "M = \\left( \\frac{2 + 8}{2}, \\frac{4 + (-2)}{2}, \\frac{-6 + 4}{2} \\right) = \\left( \\frac{10}{2}, \\frac{2}{2}, \\frac{-2}{2} \\right) = (5, 1, -1)",
            explanation: "Average the respective x, y, and z coordinates of the segment endpoints.",
            why: "Finding the center of mass of two endpoints."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(2 + 8)/2 + (4 + (-2))/2 + (-6 + 4)/2",
          expected: "5 + 1 - 1"
        }
      },
      {
        filename: "ex-04",
        title: "Equation of Sphere with Given Diameter Endpoints",
        exerciseReference: "Section 12.1, Exercise 4",
        originalTopic: "Spheres and Diameters",
        difficulty: "tier2",
        tags: ["sphere", "diameter", "midpoint"],
        problemStatement: "Find the standard equation of the sphere that has the line segment joining A(1, 2, 3) and B(5, 6, 7) as a diameter.",
        finalAnswer: "(x - 3)^2 + (y - 4)^2 + (z - 5)^2 = 12",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Center as Midpoint of Diameter",
            mathExpression: "C = \\left( \\frac{1 + 5}{2}, \\frac{2 + 6}{2}, \\frac{3 + 7}{2} \\right) = (3, 4, 5)",
            explanation: "The midpoint of any diameter is the center of the sphere.",
            why: "Locating the sphere center."
          },
          {
            stepNumber: 2,
            title: "Compute the Radius",
            mathExpression: "a^2 = |CA|^2 = (1 - 3)^2 + (2 - 4)^2 + (3 - 5)^2 = (-2)^2 + (-2)^2 + (-2)^2 = 4 + 4 + 4 = 12",
            explanation: "Compute square of Euclidean distance from center C to endpoint A.",
            why: "Determining squared radius a^2."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(5 - 1)**2 + (6 - 2)**2 + (7 - 3)**2",
          expected: "48"
        }
      },
      {
        filename: "ex-05",
        title: "Volume of a Hemispherical Shell Region",
        exerciseReference: "Section 12.1, Exercise 5",
        originalTopic: "Geometric Regions in 3D",
        difficulty: "tier2",
        tags: ["hemisphere", "inequalities", "volume"],
        problemStatement: "Describe the region in R^3 defined by 1 <= x^2 + y^2 + z^2 <= 9 and z >= 0, and compute its total volume.",
        finalAnswer: "\\frac{52\\pi}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Geometric Interpretation of Region",
            mathExpression: "1 \\le \\rho^2 \\le 9 \\iff 1 \\le \\rho \\le 3; \\quad z \\ge 0",
            explanation: "The inequalities describe an upper hemispherical shell bounded by concentric spheres of radii 1 and 3 in the half-space z >= 0.",
            why: "Interpreting spatial boundary constraints."
          },
          {
            stepNumber: 2,
            title: "Calculate Volume of Hemispherical Shell",
            mathExpression: "V = \\frac{1}{2} \\cdot \\frac{4}{3}\\pi (3^3 - 1^3) = \\frac{2}{3}\\pi (27 - 1) = \\frac{2}{3}\\pi (26) = \\frac{52\\pi}{3}",
            explanation: "Subtract volume of inner hemisphere from outer hemisphere.",
            why: "Computing difference of spherical volumes."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(2/3) * pi * (27 - 1)",
          expected: "52*pi/3"
        }
      }
    ]
  },
  {
    chapter: "ch12",
    chapterDir: "ch12-vectors-and-the-geometry-of-space",
    section: "12.2",
    sectionDir: "12.2-vectors",
    title: "Vectors",
    definitions: [
      {
        id: "def-vector-3d",
        title: "Vector in Three Dimensions",
        category: "definition",
        latex: "\\mathbf{v} = \\langle v_1, v_2, v_3 \\rangle = v_1 \\mathbf{i} + v_2 \\mathbf{j} + v_3 \\mathbf{k}",
        statement: "A three-dimensional vector is an equivalence class of directed line segments having the same length and direction. In component form, v = <v_1, v_2, v_3>, where v_1, v_2, v_3 are the scalar components along the standard basis vectors.",
        conditions: ["Components are real numbers", "Equality holds component-wise"],
        explanation: "Vectors model physical quantities possessing both magnitude and spatial orientation, such as displacement, velocity, and force.",
        keyTakeaway: "Vectors add component-wise and scale linearly by multiplying each component."
      },
      {
        id: "formula-vector-magnitude-unit",
        title: "Vector Magnitude and Unit Vector",
        category: "formula",
        latex: "|\\mathbf{v}| = \\sqrt{v_1^2 + v_2^2 + v_3^2}, \\quad \\mathbf{u} = \\frac{\\mathbf{v}}{|\\mathbf{v}|} \\quad (\\mathbf{v} \\ne \\mathbf{0})",
        statement: "The magnitude (or norm) of v is its Euclidean length. A unit vector u in the direction of non-zero v has length 1 and is obtained by dividing v by its magnitude.",
        conditions: ["|v| >= 0 with equality if and only if v = 0"],
        explanation: "Normalization isolates direction from magnitude, allowing directional decomposition of vector quantities.",
        keyTakeaway: "Every non-zero vector decomposes uniquely as v = |v| u."
      }
    ],
    summaryMDX: `# Section 12.2: Vectors

Vectors represent directed quantities in space characterized by both magnitude and direction.

---

## 1. Component Form and Standard Basis

Given initial point $P(x_1, y_1, z_1)$ and terminal point $Q(x_2, y_2, z_2)$, the displacement vector $\\vec{PQ}$ is:
$$\\mathbf{v} = \\langle x_2 - x_1, y_2 - y_1, z_2 - z_1 \\rangle$$

The standard basis vectors in $\\mathbb{R}^3$ are:
$$\\mathbf{i} = \\langle 1, 0, 0 \\rangle, \\quad \\mathbf{j} = \\langle 0, 1, 0 \\rangle, \\quad \\mathbf{k} = \\langle 0, 0, 1 \\rangle$$

---

## 2. Vector Operations

For $\\mathbf{u} = \\langle u_1, u_2, u_3 \\rangle$, $\\mathbf{v} = \\langle v_1, v_2, v_3 \\rangle$, and scalar $c \\in \\mathbb{R}$:
- **Addition**: $\\mathbf{u} + \\mathbf{v} = \\langle u_1 + v_1, u_2 + v_2, u_3 + v_3 \\rangle$
- **Scalar Multiplication**: $c\\mathbf{u} = \\langle c u_1, c u_2, c u_3 \\rangle$
- **Magnitude**: $|\\mathbf{u}| = \\sqrt{u_1^2 + u_2^2 + u_3^2}$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Component Form and Magnitude of Displacement Vector",
        exerciseReference: "Section 12.2, Exercise 1",
        originalTopic: "Vector Components and Norm",
        difficulty: "tier1",
        tags: ["displacement-vector", "magnitude", "components"],
        problemStatement: "Find the component form and magnitude of the vector v having initial point P(-1, 3, 5) and terminal point Q(2, -1, 4).",
        finalAnswer: "\\mathbf{v} = \\langle 3, -4, -1 \\rangle, \\quad |\\mathbf{v}| = \\sqrt{26}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Vector Components",
            mathExpression: "\\mathbf{v} = \\langle 2 - (-1), -1 - 3, 4 - 5 \\rangle = \\langle 3, -4, -1 \\rangle",
            explanation: "Subtract initial point coordinates from terminal point coordinates.",
            why: "Determining directed displacement components."
          },
          {
            stepNumber: 2,
            title: "Compute Euclidean Magnitude",
            mathExpression: "|\\mathbf{v}| = \\sqrt{3^2 + (-4)^2 + (-1)^2} = \\sqrt{9 + 16 + 1} = \\sqrt{26}",
            explanation: "Apply the Euclidean vector norm formula.",
            why: "Finding the geometric length of the vector."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt((2 - (-1))**2 + (-1 - 3)**2 + (4 - 5)**2)",
          expected: "sqrt(26)"
        }
      },
      {
        filename: "ex-02",
        title: "Linear Combination of Vectors",
        exerciseReference: "Section 12.2, Exercise 2",
        originalTopic: "Vector Algebra",
        difficulty: "tier1",
        tags: ["linear-combination", "vector-addition", "scalar-multiplication"],
        problemStatement: "Given u = <2, -1, 3> and v = <0, 4, -2>, find the component form of 3u - 2v.",
        finalAnswer: "\\langle 6, -11, 13 \\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Perform Scalar Multiplications",
            mathExpression: "3\\mathbf{u} = \\langle 6, -3, 9 \\rangle, \\quad 2\\mathbf{v} = \\langle 0, 8, -4 \\rangle",
            explanation: "Multiply each vector component by the respective scalar.",
            why: "Applying scalar distribution."
          },
          {
            stepNumber: 2,
            title: "Subtract Vector Components",
            mathExpression: "3\\mathbf{u} - 2\\mathbf{v} = \\langle 6 - 0, -3 - 8, 9 - (-4) \\rangle = \\langle 6, -11, 13 \\rangle",
            explanation: "Subtract corresponding components.",
            why: "Completing linear combination of vectors."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "3*2 - 2*0 + 3*(-1) - 2*4 + 3*3 - 2*(-2)",
          expected: "6 - 11 + 13"
        }
      },
      {
        filename: "ex-03",
        title: "Normalizing a Vector to Unit Length",
        exerciseReference: "Section 12.2, Exercise 3",
        originalTopic: "Unit Vectors",
        difficulty: "tier1",
        tags: ["unit-vector", "normalization", "standard-basis"],
        problemStatement: "Find a unit vector u in the direction of v = 3i - 4j + 12k.",
        finalAnswer: "\\mathbf{u} = \\frac{3}{13}\\mathbf{i} - \\frac{4}{13}\\mathbf{j} + \\frac{12}{13}\\mathbf{k}",
        steps: [
          {
            stepNumber: 1,
            title: "Calculate the Magnitude of v",
            mathExpression: "|\\mathbf{v}| = \\sqrt{3^2 + (-4)^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13",
            explanation: "Calculate the norm of the vector v.",
            why: "Determining scaling factor for unit length."
          },
          {
            stepNumber: 2,
            title: "Scale Vector by Reciprocal Magnitude",
            mathExpression: "\\mathbf{u} = \\frac{1}{13} (3\\mathbf{i} - 4\\mathbf{j} + 12\\mathbf{k}) = \\frac{3}{13}\\mathbf{i} - \\frac{4}{13}\\mathbf{j} + \\frac{12}{13}\\mathbf{k}",
            explanation: "Divide each component by 13 to produce a vector of length 1.",
            why: "Constructing directional unit vector."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(3**2 + (-4)**2 + 12**2)",
          expected: "13"
        }
      },
      {
        filename: "ex-04",
        title: "Finding a Vector with Specified Length and Direction",
        exerciseReference: "Section 12.2, Exercise 4",
        originalTopic: "Scaled Vectors",
        difficulty: "tier2",
        tags: ["vector-scaling", "prescribed-length", "geometry"],
        problemStatement: "Find a vector w of length 5 having the same direction as v = <1, 2, -2>.",
        finalAnswer: "\\left\\langle \\frac{5}{3}, \\frac{10}{3}, -\\frac{10}{3} \\right\\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Find Magnitude of Base Vector",
            mathExpression: "|\\mathbf{v}| = \\sqrt{1^2 + 2^2 + (-2)^2} = \\sqrt{1 + 4 + 4} = \\sqrt{9} = 3",
            explanation: "Find the length of the given direction vector.",
            why: "Computing norm of base vector."
          },
          {
            stepNumber: 2,
            title: "Scale Direction to Required Length",
            mathExpression: "\\mathbf{w} = 5 \\left( \\frac{\\mathbf{v}}{|\\mathbf{v}|} \\right) = \\frac{5}{3} \\langle 1, 2, -2 \\rangle = \\left\\langle \\frac{5}{3}, \\frac{10}{3}, -\\frac{10}{3} \\right\\rangle",
            explanation: "Multiply the unit vector by the desired magnitude 5.",
            why: "Adjusting vector length while preserving orientation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(5/3)**2 + (10/3)**2 + (-10/3)**2",
          expected: "25"
        }
      },
      {
        filename: "ex-05",
        title: "Resultant of Concurrent Force Vectors",
        exerciseReference: "Section 12.2, Exercise 5",
        originalTopic: "Resultant Forces",
        difficulty: "tier2",
        tags: ["physics-application", "resultant-force", "vector-sum"],
        problemStatement: "Two forces F_1 = <10, -5, 20> and F_2 = <-4, 12, -8> act on a particle. Find the resultant force F and its magnitude.",
        finalAnswer: "\\mathbf{F} = \\langle 6, 7, 12 \\rangle, \\quad |\\mathbf{F}| = \\sqrt{229}",
        steps: [
          {
            stepNumber: 1,
            title: "Sum Component-Wise for Resultant Force",
            mathExpression: "\\mathbf{F} = \\mathbf{F}_1 + \\mathbf{F}_2 = \\langle 10 - 4, -5 + 12, 20 - 8 \\rangle = \\langle 6, 7, 12 \\rangle",
            explanation: "Add corresponding force components according to Newton's law of superposition.",
            why: "Applying principle of vector superposition."
          },
          {
            stepNumber: 2,
            title: "Calculate Resultant Magnitude",
            mathExpression: "|\\mathbf{F}| = \\sqrt{6^2 + 7^2 + 12^2} = \\sqrt{36 + 49 + 144} = \\sqrt{229}",
            explanation: "Compute the norm of the resultant force vector.",
            why: "Evaluating net force magnitude."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt(6**2 + 7**2 + 12**2)",
          expected: "sqrt(229)"
        }
      }
    ]
  },
  {
    chapter: "ch12",
    chapterDir: "ch12-vectors-and-the-geometry-of-space",
    section: "12.3",
    sectionDir: "12.3-the-dot-product",
    title: "The Dot Product",
    definitions: [
      {
        id: "def-dot-product",
        title: "Dot (Inner) Product",
        category: "definition",
        latex: "\\mathbf{u} \\cdot \\mathbf{v} = u_1 v_1 + u_2 v_2 + u_3 v_3 = |\\mathbf{u}| |\\mathbf{v}| \\cos\\theta",
        statement: "The dot product of two vectors u and v is the scalar obtained by summing the products of their corresponding components, equal to the product of their magnitudes and the cosine of the angle theta between them (0 <= theta <= pi).",
        conditions: ["Vectors belong to Euclidean space R^n", "0 <= theta <= pi"],
        explanation: "Connects algebraic component operations directly to geometric angle measurement.",
        keyTakeaway: "Two non-zero vectors are orthogonal if and only if their dot product vanishes: u . v = 0."
      },
      {
        id: "formula-vector-projection",
        title: "Vector Projection and Scalar Component",
        category: "formula",
        latex: "\\text{proj}_{\\mathbf{v}} \\mathbf{u} = \\left( \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{|\\mathbf{v}|^2} \\right) \\mathbf{v}, \\quad \\text{comp}_{\\mathbf{v}} \\mathbf{u} = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{|\\mathbf{v}|}",
        statement: "The vector projection of u onto non-zero v represents the shadow cast by u along the line containing v, while the scalar component is its signed length.",
        conditions: ["v is non-zero"],
        explanation: "Decomposes u into parallel and orthogonal components: u = proj_v u + (u - proj_v u).",
        keyTakeaway: "Fundamental in computing physical work: W = F . D."
      }
    ],
    summaryMDX: `# Section 12.3: The Dot Product

The dot product (scalar product) produces a scalar from two vectors.

---

## 1. Geometric Definition and Properties

For vectors $\\mathbf{u}$ and $\\mathbf{v}$ with angle $\\theta$ between them:
$$\\mathbf{u} \\cdot \\mathbf{v} = |\\mathbf{u}| |\\mathbf{v}| \\cos\\theta = u_1 v_1 + u_2 v_2 + u_3 v_3$$

- **Orthogonality Criterion**: $\\mathbf{u} \\perp \\mathbf{v} \\iff \\mathbf{u} \\cdot \\mathbf{v} = 0$.
- **Angle Formula**: $\\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{|\\mathbf{u}| |\\mathbf{v}|}$.

---

## 2. Projections and Work

- **Vector Projection of $\\mathbf{u}$ onto $\\mathbf{v}$**:
$$\\text{proj}_{\\mathbf{v}} \\mathbf{u} = \\left( \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{|\\mathbf{v}|^2} \\right) \\mathbf{v}$$

- **Physical Work**: When a constant force $\\mathbf{F}$ displaces an object through displacement $\\mathbf{D}$:
$$W = \\mathbf{F} \\cdot \\mathbf{D} = |\\mathbf{F}| |\\mathbf{D}| \\cos\\theta$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Dot Product and Angle Between Vectors",
        exerciseReference: "Section 12.3, Exercise 1",
        originalTopic: "Angle Between Vectors",
        difficulty: "tier1",
        tags: ["dot-product", "angle", "cosine"],
        problemStatement: "Compute the dot product u . v and find cos(theta) for u = <1, -2, 2> and v = <3, 4, 0>.",
        finalAnswer: "\\mathbf{u} \\cdot \\mathbf{v} = -5, \\quad \\cos\\theta = -\\frac{1}{3}",
        steps: [
          {
            stepNumber: 1,
            title: "Calculate Dot Product",
            mathExpression: "\\mathbf{u} \\cdot \\mathbf{v} = (1)(3) + (-2)(4) + (2)(0) = 3 - 8 + 0 = -5",
            explanation: "Multiply corresponding components and add.",
            why: "Applying algebraic dot product definition."
          },
          {
            stepNumber: 2,
            title: "Calculate Vector Magnitudes",
            mathExpression: "|\\mathbf{u}| = \\sqrt{1 + 4 + 4} = 3, \\quad |\\mathbf{v}| = \\sqrt{9 + 16 + 0} = 5",
            explanation: "Compute Euclidean norms for both vectors.",
            why: "Finding denominator for angle formula."
          },
          {
            stepNumber: 3,
            title: "Compute Angle Cosine",
            mathExpression: "\\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{|\\mathbf{u}| |\\mathbf{v}|} = \\frac{-5}{(3)(5)} = -\\frac{1}{3}",
            explanation: "Divide the inner product by the product of norms.",
            why: "Evaluating angle between vectors."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1*3 + (-2)*4 + 2*0) / (3 * 5)",
          expected: "-1/3"
        }
      },
      {
        filename: "ex-02",
        title: "Testing Orthogonality of Two Vectors",
        exerciseReference: "Section 12.3, Exercise 2",
        originalTopic: "Orthogonal Vectors",
        difficulty: "tier1",
        tags: ["orthogonality", "perpendicular", "dot-product"],
        problemStatement: "Determine whether the vectors a = <2, -3, 4> and b = <6, 8, 3> are orthogonal.",
        finalAnswer: "\\text{Yes, } \\mathbf{a} \\cdot \\mathbf{b} = 0 \\implies \\mathbf{a} \\perp \\mathbf{b}",
        steps: [
          {
            stepNumber: 1,
            title: "Evaluate Inner Product",
            mathExpression: "\\mathbf{a} \\cdot \\mathbf{b} = 2(6) + (-3)(8) + 4(3) = 12 - 24 + 12 = 0",
            explanation: "Compute the sum of component products.",
            why: "Checking the vanishing of the dot product."
          },
          {
            stepNumber: 2,
            title: "State Conclusion",
            mathExpression: "\\mathbf{a} \\cdot \\mathbf{b} = 0 \\iff \\mathbf{a} \\perp \\mathbf{b}",
            explanation: "Since the dot product is exactly 0, the vectors meet at a 90 degree angle.",
            why: "Applying orthogonality criterion."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*6 + (-3)*8 + 4*3",
          expected: "0"
        }
      },
      {
        filename: "ex-03",
        title: "Orthogonal Vector Projection",
        exerciseReference: "Section 12.3, Exercise 3",
        originalTopic: "Vector Projection",
        difficulty: "tier2",
        tags: ["projection", "shadow", "components"],
        problemStatement: "Find the vector projection of u = <2, 1, -1> onto v = <1, 0, -2>.",
        finalAnswer: "\\text{proj}_{\\mathbf{v}} \\mathbf{u} = \\left\\langle \\frac{4}{5}, 0, -\\frac{8}{5} \\right\\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Compute u . v and |v|^2",
            mathExpression: "\\mathbf{u} \\cdot \\mathbf{v} = 2(1) + 1(0) + (-1)(-2) = 2 + 0 + 2 = 4; \\quad |\\mathbf{v}|^2 = 1^2 + 0^2 + (-2)^2 = 5",
            explanation: "Calculate scalar numerator and squared denominator.",
            why: "Formulating scalar projection factor."
          },
          {
            stepNumber: 2,
            title: "Multiply Scalar Factor by v",
            mathExpression: "\\text{proj}_{\\mathbf{v}} \\mathbf{u} = \\frac{4}{5} \\langle 1, 0, -2 \\rangle = \\left\\langle \\frac{4}{5}, 0, -\\frac{8}{5} \\right\\rangle",
            explanation: "Scale the vector v by (u . v) / |v|^2.",
            why: "Constructing projection vector."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(2*1 + 1*0 + (-1)*(-2)) / (1**2 + 0**2 + (-2)**2)",
          expected: "4/5"
        }
      },
      {
        filename: "ex-04",
        title: "Work Done by a Constant Force Vector",
        exerciseReference: "Section 12.3, Exercise 4",
        originalTopic: "Work in Physics",
        difficulty: "tier2",
        tags: ["work", "force", "displacement"],
        problemStatement: "A constant force F = 5i + 2j - k moves an object along a straight line from P(1, 0, 2) to Q(4, 3, 8). Find the total work done.",
        finalAnswer: "15 \\text{ units}",
        steps: [
          {
            stepNumber: 1,
            title: "Determine Displacement Vector",
            mathExpression: "\\mathbf{D} = \\vec{PQ} = \\langle 4 - 1, 3 - 0, 8 - 2 \\rangle = \\langle 3, 3, 6 \\rangle",
            explanation: "Subtract initial point P from destination point Q.",
            why: "Finding the displacement vector D."
          },
          {
            stepNumber: 2,
            title: "Calculate Work as F . D",
            mathExpression: "W = \\mathbf{F} \\cdot \\mathbf{D} = (5)(3) + (2)(3) + (-1)(6) = 15 + 6 - 6 = 15",
            explanation: "Compute the inner product of force and displacement.",
            why: "Applying physical definition of work."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "5*(4 - 1) + 2*(3 - 0) + (-1)*(8 - 2)",
          expected: "15"
        }
      },
      {
        filename: "ex-05",
        title: "Direction Cosines of a Vector",
        exerciseReference: "Section 12.3, Exercise 5",
        originalTopic: "Direction Angles and Cosines",
        difficulty: "tier2",
        tags: ["direction-cosines", "unit-sphere", "angles"],
        problemStatement: "Find the direction cosines of the vector v = <2, 1, -2> and verify that cos^2(alpha) + cos^2(beta) + cos^2(gamma) = 1.",
        finalAnswer: "\\cos\\alpha = \\frac{2}{3}, \\; \\cos\\beta = \\frac{1}{3}, \\; \\cos\\gamma = -\\frac{2}{3}; \\quad \\Sigma\\cos^2 = 1",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Vector Magnitude",
            mathExpression: "|\\mathbf{v}| = \\sqrt{2^2 + 1^2 + (-2)^2} = \\sqrt{4 + 1 + 4} = \\sqrt{9} = 3",
            explanation: "Evaluate the length of vector v.",
            why: "Obtaining normalizer for direction cosines."
          },
          {
            stepNumber: 2,
            title: "Extract Direction Cosines",
            mathExpression: "\\cos\\alpha = \\frac{v_1}{|\\mathbf{v}|} = \\frac{2}{3}, \\quad \\cos\\beta = \\frac{v_2}{|\\mathbf{v}|} = \\frac{1}{3}, \\quad \\cos\\gamma = \\frac{v_3}{|\\mathbf{v}|} = -\\frac{2}{3}",
            explanation: "Direction cosines are the components of the normalized unit vector.",
            why: "Identifying directional projections."
          },
          {
            stepNumber: 3,
            title: "Verify Sum of Squares Identity",
            mathExpression: "\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = \\left(\\frac{2}{3}\\right)^2 + \\left(\\frac{1}{3}\\right)^2 + \\left(-\\frac{2}{3}\\right)^2 = \\frac{4}{9} + \\frac{1}{9} + \\frac{4}{9} = \\frac{9}{9} = 1",
            explanation: "Sum the squares of the direction cosines.",
            why: "Proving unit length constraint."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(2/3)**2 + (1/3)**2 + (-2/3)**2",
          expected: "1"
        }
      }
    ]
  },
  {
    chapter: "ch12",
    chapterDir: "ch12-vectors-and-the-geometry-of-space",
    section: "12.4",
    sectionDir: "12.4-the-cross-product",
    title: "The Cross Product",
    definitions: [
      {
        id: "def-cross-product",
        title: "Cross (Vector) Product",
        category: "definition",
        latex: "\\mathbf{u} \\times \\mathbf{v} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix} = (u_2 v_3 - u_3 v_2)\\mathbf{i} - (u_1 v_3 - u_3 v_1)\\mathbf{j} + (u_1 v_2 - u_2 v_1)\\mathbf{k}",
        statement: "The cross product of two 3D vectors u and v is a vector orthogonal to both u and v, with direction given by the right-hand rule, and magnitude equal to the area of the parallelogram determined by u and v.",
        conditions: ["Vectors exist strictly in R^3", "Anti-commutative: u x v = -(v x u)"],
        explanation: "Unlike the dot product which returns a scalar, the cross product constructs a mutually perpendicular vector in 3-space.",
        keyTakeaway: "|u x v| = |u| |v| sin(theta); u x v = 0 if and only if u and v are parallel."
      },
      {
        id: "theorem-scalar-triple-product",
        title: "Scalar Triple Product and Parallelepiped Volume",
        category: "theorem",
        latex: "(\\mathbf{u} \\times \\mathbf{v}) \\cdot \\mathbf{w} = \\begin{vmatrix} u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\\\ w_1 & w_2 & w_3 \\end{vmatrix}, \\quad V = |(\\mathbf{u} \\times \\mathbf{v}) \\cdot \\mathbf{w}|",
        statement: "The absolute value of the scalar triple product computes the volume of the parallelepiped determined by u, v, and w. Three vectors are coplanar if and only if their scalar triple product is zero.",
        conditions: ["Three vectors in R^3"],
        explanation: "Combines cross and dot products into a single 3x3 determinant measuring 3D volume.",
        keyTakeaway: "Zero scalar triple product indicates linear dependency (coplanarity) of three vectors."
      }
    ],
    summaryMDX: `# Section 12.4: The Cross Product

The cross product $\\mathbf{u} \\times \\mathbf{v}$ creates a vector perpendicular to both $\\mathbf{u}$ and $\\mathbf{v}$ in $\\mathbb{R}^3$.

---

## 1. Determinant Formula

$$\\mathbf{u} \\times \\mathbf{v} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix} = \\langle u_2 v_3 - u_3 v_2, \\; -(u_1 v_3 - u_3 v_1), \\; u_1 v_2 - u_2 v_1 \\rangle$$

---

## 2. Geometric Applications

1. **Parallelogram Area**: Area $= |\\mathbf{u} \\times \\mathbf{v}| = |\\mathbf{u}| |\\mathbf{v}| \\sin\\theta$.
2. **Triangle Area**: Area $= \\frac{1}{2} |\\mathbf{u} \\times \\mathbf{v}|$.
3. **Parallelepiped Volume**: Volume $= |(\\mathbf{u} \\times \\mathbf{v}) \\cdot \\mathbf{w}|$.
4. **Physical Torque**: $\\boldsymbol{\\tau} = \\mathbf{r} \\times \\mathbf{F}$.
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Computing the Cross Product of Two Vectors",
        exerciseReference: "Section 12.4, Exercise 1",
        originalTopic: "Vector Cross Product",
        difficulty: "tier1",
        tags: ["cross-product", "determinant", "orthogonal-vector"],
        problemStatement: "Compute the cross product u x v for u = <2, 1, 1> and v = <-4, 3, 1>.",
        finalAnswer: "\\langle -2, -6, 10 \\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up 3x3 Determinant",
            mathExpression: "\\mathbf{u} \\times \\mathbf{v} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 2 & 1 & 1 \\\\ -4 & 3 & 1 \\end{vmatrix}",
            explanation: "Expand determinant along first row.",
            why: "Formulating cross product determinant."
          },
          {
            stepNumber: 2,
            title: "Calculate 2x2 Minor Determinants",
            mathExpression: "\\mathbf{i}(1 - 3) - \\mathbf{j}(2 - (-4)) + \\mathbf{k}(6 - (-4)) = -2\\mathbf{i} - 6\\mathbf{j} + 10\\mathbf{k}",
            explanation: "Evaluate i(1 - 3) - j(2 + 4) + k(6 + 4) = <-2, -6, 10>.",
            why: "Computing orthogonal components."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(-2)**2 + (-6)**2 + 10**2",
          expected: "140"
        }
      },
      {
        filename: "ex-02",
        title: "Area of a Triangle in 3D Space",
        exerciseReference: "Section 12.4, Exercise 2",
        originalTopic: "Area of a Triangle",
        difficulty: "tier2",
        tags: ["triangle-area", "cross-product", "geometry"],
        problemStatement: "Find the area of the triangle with vertices A(1, 0, 0), B(0, 2, 0), and C(0, 0, 3).",
        finalAnswer: "\\frac{7}{2}",
        steps: [
          {
            stepNumber: 1,
            title: "Find Edge Vectors from Common Vertex",
            mathExpression: "\\vec{AB} = \\langle -1, 2, 0 \\rangle, \\quad \\vec{AC} = \\langle -1, 0, 3 \\rangle",
            explanation: "Construct edge vectors originating at vertex A.",
            why: "Establishing spanning vectors for triangle."
          },
          {
            stepNumber: 2,
            title: "Compute Cross Product AB x AC",
            mathExpression: "\\vec{AB} \\times \\vec{AC} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ -1 & 2 & 0 \\\\ -1 & 0 & 3 \\end{vmatrix} = 6\\mathbf{i} + 3\\mathbf{j} + 2\\mathbf{k} = \\langle 6, 3, 2 \\rangle",
            explanation: "Evaluate the determinant: i(6 - 0) - j(-3 - 0) + k(0 - (-2)) = <6, 3, 2>.",
            why: "Finding normal vector whose length gives parallelogram area."
          },
          {
            stepNumber: 3,
            title: "Calculate Half the Magnitude",
            mathExpression: "\\text{Area} = \\frac{1}{2} |\\vec{AB} \\times \\vec{AC}| = \\frac{1}{2} \\sqrt{6^2 + 3^2 + 2^2} = \\frac{1}{2}\\sqrt{36 + 9 + 4} = \\frac{1}{2}\\sqrt{49} = \\frac{7}{2}",
            explanation: "Half the parallelogram area yields the triangle area.",
            why: "Computing final triangular area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1/2) * sqrt(6**2 + 3**2 + 2**2)",
          expected: "7/2"
        }
      },
      {
        filename: "ex-03",
        title: "Unit Vector Orthogonal to Two Given Vectors",
        exerciseReference: "Section 12.4, Exercise 3",
        originalTopic: "Orthogonal Vectors",
        difficulty: "tier1",
        tags: ["unit-vector", "cross-product", "orthogonality"],
        problemStatement: "Find a unit vector orthogonal to both u = <1, 1, 0> and v = <0, 1, 1>.",
        finalAnswer: "\\frac{1}{\\sqrt{3}}\\langle 1, -1, 1 \\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Cross Product",
            mathExpression: "\\mathbf{u} \\times \\mathbf{v} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 1 & 1 & 0 \\\\ 0 & 1 & 1 \\end{vmatrix} = \\mathbf{i}(1 - 0) - \\mathbf{j}(1 - 0) + \\mathbf{k}(1 - 0) = \\langle 1, -1, 1 \\rangle",
            explanation: "The cross product u x v is perpendicular to both u and v.",
            why: "Constructing mutually orthogonal direction."
          },
          {
            stepNumber: 2,
            title: "Normalize to Unit Length",
            mathExpression: "|\\mathbf{u} \\times \\mathbf{v}| = \\sqrt{1^2 + (-1)^2 + 1^2} = \\sqrt{3}; \\quad \\mathbf{n} = \\frac{1}{\\sqrt{3}}\\langle 1, -1, 1 \\rangle",
            explanation: "Divide the vector by its magnitude sqrt(3).",
            why: "Obtaining unit orthogonal vector."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt((1/sqrt(3))**2 + (-1/sqrt(3))**2 + (1/sqrt(3))**2)",
          expected: "1"
        }
      },
      {
        filename: "ex-04",
        title: "Volume of a Parallelepiped via Scalar Triple Product",
        exerciseReference: "Section 12.4, Exercise 4",
        originalTopic: "Scalar Triple Product",
        difficulty: "tier2",
        tags: ["volume", "parallelepiped", "scalar-triple-product"],
        problemStatement: "Find the volume of the parallelepiped determined by u = <1, 2, 3>, v = <-1, 1, 2>, and w = <2, 1, 4>.",
        finalAnswer: "9",
        steps: [
          {
            stepNumber: 1,
            title: "Set Up 3x3 Determinant",
            mathExpression: "(\\mathbf{u} \\times \\mathbf{v}) \\cdot \\mathbf{w} = \\begin{vmatrix} 1 & 2 & 3 \\\\ -1 & 1 & 2 \\\\ 2 & 1 & 4 \\end{vmatrix}",
            explanation: "Write the components of the three vectors as rows of a 3x3 matrix.",
            why: "Formulating scalar triple product."
          },
          {
            stepNumber: 2,
            title: "Evaluate Determinant",
            mathExpression: "= 1(4 - 2) - 2(-4 - 4) + 3(-1 - 2) = 1(2) - 2(-8) + 3(-3) = 2 + 16 - 9 = 9",
            explanation: "Expand across the first row and sum terms.",
            why: "Evaluating signed volume."
          },
          {
            stepNumber: 3,
            title: "Take Absolute Value",
            mathExpression: "V = |9| = 9",
            explanation: "Volume is the magnitude of the scalar triple product.",
            why: "Obtaining geometric volume."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1*(4 - 2) - 2*(-4 - 4) + 3*(-1 - 2)",
          expected: "9"
        }
      },
      {
        filename: "ex-05",
        title: "Torque Vector on a Mechanical Lever",
        exerciseReference: "Section 12.4, Exercise 5",
        originalTopic: "Physical Torque",
        difficulty: "tier2",
        tags: ["torque", "physics", "cross-product"],
        problemStatement: "A force F = <0, 20, 10> is applied at point r = <3, 0, 0>. Find the torque vector tau = r x F and its magnitude.",
        finalAnswer: "\\boldsymbol{\\tau} = \\langle 0, -30, 60 \\rangle, \\quad |\\boldsymbol{\\tau}| = 30\\sqrt{5}",
        steps: [
          {
            stepNumber: 1,
            title: "Compute Torque Cross Product",
            mathExpression: "\\boldsymbol{\\tau} = \\mathbf{r} \\times \\mathbf{F} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 3 & 0 & 0 \\\\ 0 & 20 & 10 \\end{vmatrix} = \\mathbf{i}(0) - \\mathbf{j}(30 - 0) + \\mathbf{k}(60 - 0) = \\langle 0, -30, 60 \\rangle",
            explanation: "Evaluate the cross product of lever arm r and force F.",
            why: "Calculating moment of force."
          },
          {
            stepNumber: 2,
            title: "Compute Torque Magnitude",
            mathExpression: "|\\boldsymbol{\\tau}| = \\sqrt{0^2 + (-30)^2 + 60^2} = \\sqrt{0 + 900 + 3600} = \\sqrt{4500} = 30\\sqrt{5}",
            explanation: "Compute Euclidean norm of torque vector.",
            why: "Determining net turning moment magnitude."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "sqrt((-30)**2 + 60**2)",
          expected: "30*sqrt(5)"
        }
      }
    ]
  },
  {
    chapter: "ch12",
    chapterDir: "ch12-vectors-and-the-geometry-of-space",
    section: "12.5",
    sectionDir: "12.5-lines-and-planes-in-space",
    title: "Lines and Planes in Space",
    definitions: [
      {
        id: "def-line-in-space",
        title: "Vector and Parametric Equations of a Line",
        category: "definition",
        latex: "\\mathbf{r}(t) = \\mathbf{r}_0 + t\\mathbf{v}, \\quad x = x_0 + a t, \\; y = y_0 + b t, \\; z = z_0 + c t",
        statement: "A line L in space passing through point P_0(x_0, y_0, z_0) parallel to direction vector v = <a, b, c> is parametrized by real t in (-oo, oo). If a, b, c are non-zero, symmetric equations are (x-x_0)/a = (y-y_0)/b = (z-z_0)/c.",
        conditions: ["Direction vector v is non-zero"],
        explanation: "Extends 2D linear slope to 3D direction vectors without requiring an undefined single slope value.",
        keyTakeaway: "A line in 3-space requires a point and a direction vector."
      },
      {
        id: "def-plane-in-space",
        title: "Standard Equation of a Plane",
        category: "theorem",
        latex: "A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 \\implies Ax + By + Cz = D",
        statement: "The plane containing point P_0(x_0, y_0, z_0) with non-zero normal vector n = <A, B, C> consists of all points P(x, y, z) such that the displacement vector P_0 P is orthogonal to n: n . P_0 P = 0.",
        conditions: ["Normal vector n = <A, B, C> != <0, 0, 0>"],
        explanation: "A single linear equation in three variables always defines a plane in Euclidean 3-space.",
        keyTakeaway: "Coefficients A, B, C in the linear equation directly specify an orthogonal normal vector."
      }
    ],
    summaryMDX: `# Section 12.5: Lines and Planes in Space

Linear geometric objects in $\\mathbb{R}^3$ are characterized by directional and normal vectors.

---

## 1. Lines in Space

Given point $P_0(x_0, y_0, z_0)$ and direction $\\mathbf{v} = \\langle a, b, c \\rangle$:
- **Vector Form**: $\\mathbf{r}(t) = \\mathbf{r}_0 + t\\mathbf{v}$
- **Parametric Form**: $x = x_0 + at, \\; y = y_0 + bt, \\; z = z_0 + ct$
- **Symmetric Form**: $\\frac{x - x_0}{a} = \\frac{y - y_0}{b} = \\frac{z - z_0}{c}$ (when $a, b, c \\ne 0$)

---

## 2. Planes in Space

Given point $P_0(x_0, y_0, z_0)$ and normal vector $\\mathbf{n} = \\langle A, B, C \\rangle$:
- **Component Equation**: $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$
- **Distance from Point $(x_1, y_1, z_1)$ to Plane $Ax + By + Cz + D = 0$**:
$$d = \\frac{|A x_1 + B y_1 + C z_1 + D|}{\\sqrt{A^2 + B^2 + C^2}}$$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Parametric Equations of a Line Through a Point",
        exerciseReference: "Section 12.5, Exercise 1",
        originalTopic: "Equations of Lines",
        difficulty: "tier1",
        tags: ["lines", "parametric-equations", "direction-vector"],
        problemStatement: "Find parametric equations for the line through P(2, 4, -1) parallel to the vector v = <3, -1, 5>.",
        finalAnswer: "x = 2 + 3t, \\quad y = 4 - t, \\quad z = -1 + 5t",
        steps: [
          {
            stepNumber: 1,
            title: "Write Vector Equation of Line",
            mathExpression: "\\mathbf{r}(t) = \\langle 2, 4, -1 \\rangle + t\\langle 3, -1, 5 \\rangle",
            explanation: "Combine initial position vector with scaled direction vector.",
            why: "Applying vector definition of line."
          },
          {
            stepNumber: 2,
            title: "Extract Scalar Parametric Equations",
            mathExpression: "x = 2 + 3t, \\quad y = 4 - t, \\quad z = -1 + 5t",
            explanation: "Equate respective components for x, y, and z.",
            why: "Formulating individual coordinate functions."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(2 + 3*2) + (4 - 2) + (-1 + 5*2)",
          expected: "8 + 2 + 9"
        }
      },
      {
        filename: "ex-02",
        title: "Standard Equation of a Plane from Point and Normal",
        exerciseReference: "Section 12.5, Exercise 2",
        originalTopic: "Equations of Planes",
        difficulty: "tier1",
        tags: ["planes", "normal-vector", "linear-equations"],
        problemStatement: "Find the equation of the plane through P(1, 2, 3) with normal vector n = <2, -3, 4>.",
        finalAnswer: "2x - 3y + 4z = 8",
        steps: [
          {
            stepNumber: 1,
            title: "Apply Point-Normal Plane Equation",
            mathExpression: "A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 \\implies 2(x - 1) - 3(y - 2) + 4(z - 3) = 0",
            explanation: "Substitute coordinates of P and components of n.",
            why: "Enforcing orthogonality of displacement and normal vector."
          },
          {
            stepNumber: 2,
            title: "Expand and Simplify",
            mathExpression: "2x - 2 - 3y + 6 + 4z - 12 = 0 \\implies 2x - 3y + 4z - 8 = 0 \\implies 2x - 3y + 4z = 8",
            explanation: "Distribute constants and combine into standard linear form.",
            why: "Obtaining simplified plane equation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "2*(x - 1) - 3*(y - 2) + 4*(z - 3)",
          expected: "2*x - 3*y + 4*z - 8"
        }
      },
      {
        filename: "ex-03",
        title: "Plane Passing Through Three Non-Collinear Points",
        exerciseReference: "Section 12.5, Exercise 3",
        originalTopic: "Plane from Three Points",
        difficulty: "tier2",
        tags: ["three-points", "cross-product", "plane"],
        problemStatement: "Find the equation of the plane passing through the points A(1, 1, 1), B(2, 0, 3), and C(0, 2, 1).",
        finalAnswer: "x + y = 2",
        steps: [
          {
            stepNumber: 1,
            title: "Construct Two Spanning Vectors in the Plane",
            mathExpression: "\\vec{AB} = \\langle 2-1, 0-1, 3-1 \\rangle = \\langle 1, -1, 2 \\rangle; \\quad \\vec{AC} = \\langle 0-1, 2-1, 1-1 \\rangle = \\langle -1, 1, 0 \\rangle",
            explanation: "Form vectors connecting point A to B and C.",
            why: "Determining two vectors lying in the plane."
          },
          {
            stepNumber: 2,
            title: "Find Normal Vector via Cross Product",
            mathExpression: "\\mathbf{n} = \\vec{AB} \\times \\vec{AC} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 1 & -1 & 2 \\\\ -1 & 1 & 0 \\end{vmatrix} = \\mathbf{i}(-2) - \\mathbf{j}(2) + \\mathbf{k}(0) = \\langle -2, -2, 0 \\rangle",
            explanation: "Cross product of coplanar vectors is perpendicular to the plane. Dividing by -2 gives n = <1, 1, 0>.",
            why: "Generating orthogonal normal vector."
          },
          {
            stepNumber: 3,
            title: "Formulate Plane Equation",
            mathExpression: "1(x - 1) + 1(y - 1) + 0(z - 1) = 0 \\implies x - 1 + y - 1 = 0 \\implies x + y = 2",
            explanation: "Substitute point A(1, 1, 1) and simplified normal <1, 1, 0>.",
            why: "Producing final linear plane equation."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1*(x - 1) + 1*(y - 1)",
          expected: "x + y - 2"
        }
      },
      {
        filename: "ex-04",
        title: "Perpendicular Distance from a Point to a Plane",
        exerciseReference: "Section 12.5, Exercise 4",
        originalTopic: "Distance from Point to Plane",
        difficulty: "tier2",
        tags: ["distance", "point-to-plane", "analytic-geometry"],
        problemStatement: "Find the distance from the point S(1, 1, 3) to the plane 3x + 2y + 6z = 6.",
        finalAnswer: "\\frac{17}{7}",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Plane Coefficients and Constant",
            mathExpression: "A = 3, \\; B = 2, \\; C = 6, \\; D = -6; \\quad (x_1, y_1, z_1) = (1, 1, 3)",
            explanation: "Write the plane in the form Ax + By + Cz + D = 0 with D = -6.",
            why: "Extracting normal components and offset."
          },
          {
            stepNumber: 2,
            title: "Apply Distance Formula",
            mathExpression: "d = \\frac{|3(1) + 2(1) + 6(3) - 6|}{\\sqrt{3^2 + 2^2 + 6^2}} = \\frac{|3 + 2 + 18 - 6|}{\\sqrt{9 + 4 + 36}} = \\frac{17}{\\sqrt{49}} = \\frac{17}{7}",
            explanation: "Evaluate the numerator and denominator of the projection formula.",
            why: "Computing shortest perpendicular distance."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "abs(3*1 + 2*1 + 6*3 - 6) / sqrt(3**2 + 2**2 + 6**2)",
          expected: "17/7"
        }
      },
      {
        filename: "ex-05",
        title: "Line of Intersection of Two Planes",
        exerciseReference: "Section 12.5, Exercise 5",
        originalTopic: "Intersecting Planes",
        difficulty: "tier2",
        tags: ["intersecting-planes", "line-of-intersection", "cross-product"],
        problemStatement: "Find the direction vector v for the line of intersection of the two planes x + y + z = 1 and x - 2y + 3z = 2.",
        finalAnswer: "\\mathbf{v} = \\langle 5, -2, -3 \\rangle",
        steps: [
          {
            stepNumber: 1,
            title: "Identify Normal Vectors of Both Planes",
            mathExpression: "\\mathbf{n}_1 = \\langle 1, 1, 1 \\rangle, \\quad \\mathbf{n}_2 = \\langle 1, -2, 3 \\rangle",
            explanation: "Read coefficients of x, y, and z for each plane equation.",
            why: "Extracting normal vectors."
          },
          {
            stepNumber: 2,
            title: "Cross Product of Normal Vectors",
            mathExpression: "\\mathbf{v} = \\mathbf{n}_1 \\times \\mathbf{n}_2 = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 1 & 1 & 1 \\\\ 1 & -2 & 3 \\end{vmatrix} = \\mathbf{i}(3 - (-2)) - \\mathbf{j}(3 - 1) + \\mathbf{k}(-2 - 1) = \\langle 5, -2, -3 \\rangle",
            explanation: "The line of intersection lies in both planes, so its direction is orthogonal to both normal vectors.",
            why: "Determining line direction via cross product."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(1*3 - 1*(-2))**2 + (-(1*3 - 1*1))**2 + (1*(-2) - 1*1)**2",
          expected: "5**2 + (-2)**2 + (-3)**2"
        }
      }
    ]
  },
  {
    chapter: "ch12",
    chapterDir: "ch12-vectors-and-the-geometry-of-space",
    section: "12.6",
    sectionDir: "12.6-cylinders-and-quadric-surfaces",
    title: "Cylinders and Quadric Surfaces",
    definitions: [
      {
        id: "def-cylinder-surface",
        title: "Cylinder",
        category: "definition",
        latex: "f(x, y) = 0 \\quad (z \\text{ free})",
        statement: "A cylinder is a surface generated by a straight line (the generatrix) moving parallel to a fixed given line while intersecting a fixed plane curve (the generating curve or directrix).",
        conditions: ["Generating curve is in a coordinate plane", "Generatrix lines are parallel"],
        explanation: "Equations missing one variable in 3D represent cylinders whose rulings are parallel to the axis of the missing variable.",
        keyTakeaway: "In 3D, x^2 + y^2 = 1 represents a circular cylinder along the z-axis, not just a circle."
      },
      {
        id: "def-quadric-surfaces",
        title: "Quadric Surfaces Classification",
        category: "definition",
        latex: "A x^2 + B y^2 + C z^2 + D xy + E yz + F xz + G x + H y + I z + J = 0",
        statement: "A quadric surface is the graph of a second-degree polynomial equation in three variables. By translation and rotation, every non-degenerate quadric surface reduces to an ellipsoid, elliptic/hyperbolic paraboloid, cone, or hyperboloid of one or two sheets.",
        conditions: ["At least one second-degree coefficient is non-zero"],
        explanation: "Analyzed by examining 2D cross-sections (traces) formed by intersections with planes parallel to coordinate planes.",
        keyTakeaway: "Quadric surfaces are 3D counterparts of 2D conic sections."
      }
    ],
    summaryMDX: `# Section 12.6: Cylinders and Quadric Surfaces

Quadric surfaces are the three-dimensional analogues of conic sections, defined by second-degree equations in $x, y, z$.

---

## 1. Cylinders

An equation containing only two of the three variables represents a cylinder whose rulings are parallel to the axis of the missing variable.
- Example: $y = x^2$ in $\\mathbb{R}^3$ is a parabolic cylinder with rulings parallel to the $z$-axis.

---

## 2. Six Basic Quadric Surfaces

1. **Ellipsoid**: $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} + \\frac{z^2}{c^2} = 1$
2. **Elliptic Paraboloid**: $\\frac{z}{c} = \\frac{x^2}{a^2} + \\frac{y^2}{b^2}$
3. **Hyperbolic Paraboloid**: $\\frac{z}{c} = \\frac{y^2}{b^2} - \\frac{x^2}{a^2}$ (saddle)
4. **Elliptic Cone**: $\\frac{z^2}{c^2} = \\frac{x^2}{a^2} + \\frac{y^2}{b^2}$
5. **Hyperboloid of One Sheet**: $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} - \\frac{z^2}{c^2} = 1$
6. **Hyperboloid of Two Sheets**: $\\frac{z^2}{c^2} - \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$
`,
    solutions: [
      {
        filename: "ex-01",
        title: "Identifying an Ellipsoid and Finding its Principal Trace",
        exerciseReference: "Section 12.6, Exercise 1",
        originalTopic: "Ellipsoid Traces",
        difficulty: "tier1",
        tags: ["ellipsoid", "traces", "quadric-surfaces"],
        problemStatement: "Identify the quadric surface x^2/4 + y^2/9 + z^2/16 = 1 and find the area of its trace in the xy-plane.",
        finalAnswer: "\\text{Ellipsoid; Trace area in } z=0 \\text{ is } 6\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Classify Quadric Surface",
            mathExpression: "\\frac{x^2}{2^2} + \\frac{y^2}{3^2} + \\frac{z^2}{4^2} = 1",
            explanation: "All three variables are squared with positive coefficients summing to 1, defining an ellipsoid with semi-axes a = 2, b = 3, c = 4.",
            why: "Classifying quadric surface."
          },
          {
            stepNumber: 2,
            title: "Find xy-Trace and Compute Area",
            mathExpression: "z = 0 \\implies \\frac{x^2}{4} + \\frac{y^2}{9} = 1; \\quad \\text{Area} = \\pi a b = \\pi (2)(3) = 6\\pi",
            explanation: "Set z = 0 to get an ellipse with semi-axes 2 and 3; its area is pi*a*b.",
            why: "Calculating trace geometric area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "pi * 2 * 3",
          expected: "6*pi"
        }
      },
      {
        filename: "ex-02",
        title: "Cross-Section of an Elliptic Paraboloid",
        exerciseReference: "Section 12.6, Exercise 2",
        originalTopic: "Elliptic Paraboloid",
        difficulty: "tier1",
        tags: ["elliptic-paraboloid", "traces", "cross-section"],
        problemStatement: "Find the trace of the elliptic paraboloid z = x^2/4 + y^2/9 in the horizontal plane z = 4, and compute its area.",
        finalAnswer: "\\text{Ellipse } \\frac{x^2}{16} + \\frac{y^2}{36} = 1; \\quad \\text{Area} = 24\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Substitute z = 4 into Surface Equation",
            mathExpression: "4 = \\frac{x^2}{4} + \\frac{y^2}{9} \\implies \\frac{x^2}{16} + \\frac{y^2}{36} = 1",
            explanation: "Divide both sides by 4 to place the ellipse in standard form.",
            why: "Determining trace curve."
          },
          {
            stepNumber: 2,
            title: "Compute Area of Elliptic Trace",
            mathExpression: "a = \\sqrt{16} = 4, \\; b = \\sqrt{36} = 6 \\implies \\text{Area} = \\pi a b = \\pi (4)(6) = 24\\pi",
            explanation: "Use formula Area = pi*a*b for the ellipse.",
            why: "Calculating planar cross-section area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "pi * 4 * 6",
          expected: "24*pi"
        }
      },
      {
        filename: "ex-03",
        title: "Trace Analysis of a Hyperboloid of One Sheet",
        exerciseReference: "Section 12.6, Exercise 3",
        originalTopic: "Hyperboloid of One Sheet",
        difficulty: "tier2",
        tags: ["hyperboloid-one-sheet", "traces", "circular-sections"],
        problemStatement: "For the hyperboloid of one sheet x^2 + y^2 - z^2 = 1, find the radii of the circular cross-sections at z = 0 and z = sqrt(3).",
        finalAnswer: "r_0 = 1, \\quad r_{\\sqrt{3}} = 2",
        steps: [
          {
            stepNumber: 1,
            title: "Find Trace at z = 0",
            mathExpression: "x^2 + y^2 - 0 = 1 \\implies x^2 + y^2 = 1 \\implies r_0 = 1",
            explanation: "At z = 0, the throat circle has radius 1.",
            why: "Determining minimum waist radius."
          },
          {
            stepNumber: 2,
            title: "Find Trace at z = sqrt(3)",
            mathExpression: "x^2 + y^2 - (\\sqrt{3})^2 = 1 \\implies x^2 + y^2 - 3 = 1 \\implies x^2 + y^2 = 4 \\implies r = \\sqrt{4} = 2",
            explanation: "Substitute z = sqrt(3) and add 3 to both sides to find radius of circle.",
            why: "Computing cross-sectional radius at specified height."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "1 + (sqrt(3))**2",
          expected: "4"
        }
      },
      {
        filename: "ex-04",
        title: "Horizontal Cross-Section of an Elliptic Cone",
        exerciseReference: "Section 12.6, Exercise 4",
        originalTopic: "Elliptic Cone",
        difficulty: "tier2",
        tags: ["cone", "traces", "ellipse"],
        problemStatement: "Find the trace of the elliptic cone z^2 = 4x^2 + 9y^2 at height z = 6, and find its area.",
        finalAnswer: "\\frac{x^2}{9} + \\frac{y^2}{4} = 1; \\quad \\text{Area} = 6\\pi",
        steps: [
          {
            stepNumber: 1,
            title: "Substitute z = 6 into Cone Equation",
            mathExpression: "6^2 = 4x^2 + 9y^2 \\implies 36 = 4x^2 + 9y^2",
            explanation: "Substitute fixed height z = 6 into second-degree equation.",
            why: "Evaluating trace at z = 6."
          },
          {
            stepNumber: 2,
            title: "Normalize to Standard Ellipse Form",
            mathExpression: "\\frac{4x^2}{36} + \\frac{9y^2}{36} = 1 \\implies \\frac{x^2}{9} + \\frac{y^2}{4} = 1",
            explanation: "Divide through by 36.",
            why: "Identifying semi-axes a = 3, b = 2."
          },
          {
            stepNumber: 3,
            title: "Compute Area of Ellipse",
            mathExpression: "\\text{Area} = \\pi (3)(2) = 6\\pi",
            explanation: "Multiply semi-axes by pi.",
            why: "Evaluating trace area."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "pi * 3 * 2",
          expected: "6*pi"
        }
      },
      {
        filename: "ex-05",
        title: "Saddle Point Properties of a Hyperbolic Paraboloid",
        exerciseReference: "Section 12.6, Exercise 5",
        originalTopic: "Hyperbolic Paraboloid",
        difficulty: "tier2",
        tags: ["hyperbolic-paraboloid", "saddle-point", "partial-derivatives"],
        problemStatement: "For the hyperbolic paraboloid z = y^2 - x^2, verify that the origin (0, 0, 0) is a critical saddle point by examining partial derivatives.",
        finalAnswer: "\\nabla z(0, 0) = \\mathbf{0}; \\quad \\text{Parabolas open upward in } y \\text{ and downward in } x",
        steps: [
          {
            stepNumber: 1,
            title: "Compute First Partial Derivatives",
            mathExpression: "\\frac{\\partial z}{\\partial x} = -2x, \\quad \\frac{\\partial z}{\\partial y} = 2y",
            explanation: "Differentiate z with respect to x and y independently.",
            why: "Finding gradient components."
          },
          {
            stepNumber: 2,
            title: "Evaluate at the Origin",
            mathExpression: "\\left.\\frac{\\partial z}{\\partial x}\\right|_{(0,0)} = 0, \\quad \\left.\\frac{\\partial z}{\\partial y}\\right|_{(0,0)} = 0 \\implies \\nabla z(0,0) = \\langle 0, 0 \\rangle",
            explanation: "Both partial derivatives vanish at (0, 0), confirming a critical point.",
            why: "Confirming stationary point."
          },
          {
            stepNumber: 3,
            title: "Analyze Curvatures Along Coordinate Axes",
            mathExpression: "x = 0 \\implies z = y^2 \\; (\\text{min at } 0); \\quad y = 0 \\implies z = -x^2 \\; (\\text{max at } 0)",
            explanation: "The surface curves upward along the y-axis and downward along the x-axis, creating a classic saddle.",
            why: "Demonstrating opposite directional concavities."
          }
        ],
        sympyVerification: {
          operation: "algebraic_equivalence",
          expression: "(-2*0) + (2*0)",
          expected: "0"
        }
      }
    ]
  }
];
