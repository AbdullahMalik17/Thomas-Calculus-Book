// lib/content/mids-exam-data.ts
/**
 * Verified Midterm Exam Question Bank (Chapters 1 - 3) for calculus-guide.
 * Authored by: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

export interface MidsExamOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  math?: string;
  misconception: string;
}

export interface MidsExamQuestion {
  id: string;
  chapter: 1 | 2 | 3;
  chapterTitle: string;
  questionNumber: number;
  globalNumber: number;
  topic: string;
  question: string;
  math?: string;
  options: [MidsExamOption, MidsExamOption, MidsExamOption, MidsExamOption];
  correctId: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface MidsChapterMeta {
  chapter: 1 | 2 | 3;
  key: string;
  title: string;
  shortTitle: string;
  description: string;
  questionCount: number;
}

export const MIDS_CHAPTERS: MidsChapterMeta[] = [
  {
    chapter: 1,
    key: 'ch01',
    title: 'Chapter 1: Functions',
    shortTitle: 'Ch 1: Functions',
    description: 'Function definitions, domains and ranges, symmetry, compositions, inverses, and trig identities.',
    questionCount: 21,
  },
  {
    chapter: 2,
    key: 'ch02',
    title: 'Chapter 2: Limits & Continuity',
    shortTitle: 'Ch 2: Limits & Continuity',
    description: 'Rates of change, one-sided and two-sided limits, limit laws, indeterminate forms, limits at infinity, and continuity.',
    questionCount: 20,
  },
  {
    chapter: 3,
    key: 'ch03',
    title: 'Chapter 3: Derivatives',
    shortTitle: 'Ch 3: Derivatives',
    description: 'Limit definition of derivative, power, product, quotient, and chain rules, trig derivatives, implicit differentiation, and rates of change.',
    questionCount: 24,
  },
];

export const MIDS_EXAM_QUESTIONS: MidsExamQuestion[] = [
  // =========================================================================
  // CHAPTER 1: FUNCTIONS (21 Questions)
  // =========================================================================
  {
    id: 'mids-ch01-q01',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 1,
    globalNumber: 1,
    topic: 'Definition of a Function',
    question: 'A function is a rule that assigns:',
    options: [
      {
        id: 'A',
        text: 'More than one output to each input',
        misconception: 'A relation that assigns multiple outputs to a single input fails the vertical line test and is not a function.',
      },
      {
        id: 'B',
        text: 'Exactly one output to each input in its domain',
        misconception: '',
      },
      {
        id: 'C',
        text: 'No output to any input',
        misconception: 'Every element in the domain of a function must be paired with a well-defined output value.',
      },
      {
        id: 'D',
        text: 'Only positive outputs to every input',
        misconception: 'Function outputs can be positive, zero, or negative depending on the rule and codomain.',
      },
    ],
    correctId: 'B',
    explanation:
      'By definition, a function $f$ from a set $D$ (the domain) to a set $Y$ is a rule that assigns a unique (single) output element $f(x) \\in Y$ to each input $x \\in D$.',
  },
  {
    id: 'mids-ch01-q02',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 2,
    globalNumber: 2,
    topic: 'Domain Definition',
    question: 'The set of all possible input values of a function is called its:',
    options: [
      {
        id: 'A',
        text: 'Range',
        misconception: 'The range is the set of output values produced by the function, not the input values.',
      },
      {
        id: 'B',
        text: 'Codomain',
        misconception: 'The codomain is the target set containing all possible outputs, whereas inputs belong to the domain.',
      },
      {
        id: 'C',
        text: 'Domain',
        misconception: '',
      },
      {
        id: 'D',
        text: 'Image',
        misconception: 'The image of a function refers to the outputs obtained from applying the function to its inputs.',
      },
    ],
    correctId: 'C',
    explanation:
      'The domain is the complete set of valid independent variable inputs $x$ for which the function rule produces a real output.',
  },
  {
    id: 'mids-ch01-q03',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 3,
    globalNumber: 3,
    topic: 'Range Definition',
    question: 'The set of all output values actually obtained from a function is called its:',
    options: [
      {
        id: 'A',
        text: 'Domain',
        misconception: 'The domain is the set of valid inputs, not the resulting output values.',
      },
      {
        id: 'B',
        text: 'Range',
        misconception: '',
      },
      {
        id: 'C',
        text: 'Interval',
        misconception: 'An interval is a connected subset of real numbers, which may describe a domain or range, not the general term for all outputs.',
      },
      {
        id: 'D',
        text: 'Input set',
        misconception: 'The input set corresponds to the domain of the function rather than its outputs.',
      },
    ],
    correctId: 'B',
    explanation:
      'The range of $y = f(x)$ is the set of all resulting output values $\\{f(x) : x \\in D\\}$ as $x$ varies across the entire domain.',
  },
  {
    id: 'mids-ch01-q04',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 4,
    globalNumber: 4,
    topic: 'Vertical Line Test',
    question: 'Which test is commonly used to determine whether a graph in the $xy$-plane represents a function of $x$?',
    options: [
      {
        id: 'A',
        text: 'Horizontal line test',
        misconception: 'The horizontal line test determines whether a function is one-to-one (invertible), not whether a graph is a function.',
      },
      {
        id: 'B',
        text: 'Vertical line test',
        misconception: '',
      },
      {
        id: 'C',
        text: 'Midpoint test',
        misconception: 'There is no midpoint test for determining whether a curve defines a function.',
      },
      {
        id: 'D',
        text: 'Slope test',
        misconception: 'Slope measures rate of change or linearity, not whether each $x$-value has a unique $y$-value.',
      },
    ],
    correctId: 'B',
    explanation:
      'A curve in the $xy$-plane is the graph of a function of $x$ if and only if no vertical line $x = a$ intersects the curve more than once (Vertical Line Test).',
  },
  {
    id: 'mids-ch01-q05',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 5,
    globalNumber: 5,
    topic: 'Function Evaluation',
    question: 'If $f(x) = 3x - 2$, then $f(4)$ is:',
    math: 'f(x) = 3x - 2',
    options: [
      {
        id: 'A',
        text: '$8$',
        misconception: 'Evaluating $3(4) - 4$ instead of $3(4) - 2$, or miscalculating $3 \\times 4 = 10$.',
      },
      {
        id: 'B',
        text: '$10$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$12$',
        misconception: 'Forgetting to subtract $2$ after multiplying $3 \\times 4 = 12$.',
      },
      {
        id: 'D',
        text: '$14$',
        misconception: 'Adding $2$ instead of subtracting $2$ ($12 + 2 = 14$).',
      },
    ],
    correctId: 'B',
    explanation:
      'Substitute $x = 4$ into the formula: $f(4) = 3(4) - 2 = 12 - 2 = 10$.',
  },
  {
    id: 'mids-ch01-q06',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 6,
    globalNumber: 6,
    topic: 'Domain of Rational Function',
    question: 'What is the natural domain of the function $f(x) = \\frac{1}{x + 5}$?',
    math: 'f(x) = \\frac{1}{x + 5}',
    options: [
      {
        id: 'A',
        text: '$x \\neq 5$',
        misconception: 'Confusing the sign of the excluded value: setting $x - 5 = 0$ instead of $x + 5 = 0$.',
      },
      {
        id: 'B',
        text: '$x \\neq -5$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$x > -5$',
        misconception: 'Treating a rational denominator like a square root inside a denominator; negative denominators like $x = -6$ are valid.',
      },
      {
        id: 'D',
        text: 'All real numbers',
        misconception: 'Overlooking that division by zero occurs when $x = -5$.',
      },
    ],
    correctId: 'B',
    explanation:
      'Division by zero is undefined. Requiring $x + 5 \\neq 0$ excludes $x = -5$, giving the domain $(-\\infty, -5) \\cup (-5, \\infty)$.',
  },
  {
    id: 'mids-ch01-q07',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 7,
    globalNumber: 7,
    topic: 'Range of Quadratic Function',
    question: 'The range of the real-valued function $f(x) = x^2 + 2$ is:',
    math: 'f(x) = x^2 + 2',
    options: [
      {
        id: 'A',
        text: '$y \\ge 2$',
        misconception: '',
      },
      {
        id: 'B',
        text: '$y > 2$',
        misconception: 'Excluding the minimum value $y = 2$, which is attained when $x = 0$ ($f(0) = 0^2 + 2 = 2$).',
      },
      {
        id: 'C',
        text: '$y \\le 2$',
        misconception: 'Reversing the inequality direction; $x^2 + 2$ opens upward, not downward.',
      },
      {
        id: 'D',
        text: 'All real numbers',
        misconception: 'Confusing the domain of $x^2 + 2$ (all real numbers) with its range ($[2, \\infty)$).',
      },
    ],
    correctId: 'A',
    explanation:
      'Since $x^2 \\ge 0$ for every real $x$ (with equality at $x = 0$), we have $f(x) = x^2 + 2 \\ge 2$. Hence the range is $y \\ge 2$, or $[2, \\infty)$.',
  },
  {
    id: 'mids-ch01-q08',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 8,
    globalNumber: 8,
    topic: 'Domain of Radical Function',
    question: 'The natural domain of $f(x) = \\sqrt{x - 4}$ is:',
    math: 'f(x) = \\sqrt{x - 4}',
    options: [
      {
        id: 'A',
        text: '$x > 4$',
        misconception: 'Using a strict inequality and excluding $x = 4$, even though $\\sqrt{4 - 4} = \\sqrt{0} = 0$ is real and defined.',
      },
      {
        id: 'B',
        text: '$x \\ge 4$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$x \\le 4$',
        misconception: 'Reversing the inequality sign; values less than $4$ make $x - 4$ negative.',
      },
      {
        id: 'D',
        text: 'All real numbers',
        misconception: 'Ignoring that real square roots are undefined for negative radicands ($x < 4$).',
      },
    ],
    correctId: 'B',
    explanation:
      'For a real-valued square root, the expression inside the radical must be non-negative: $x - 4 \\ge 0 \\implies x \\ge 4$, or $[4, \\infty)$.',
  },
  {
    id: 'mids-ch01-q09',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 9,
    globalNumber: 9,
    topic: 'Even Functions',
    question: 'Which of the following is an even function?',
    math: 'f(-x) = f(x)',
    options: [
      {
        id: 'A',
        text: '$f(x) = x^3$',
        misconception: '$(-x)^3 = -x^3 = -f(x)$, which makes $x^3$ an odd function, not even.',
      },
      {
        id: 'B',
        text: '$f(x) = x$',
        misconception: '$f(-x) = -x = -f(x)$, so $f(x) = x$ is an odd function.',
      },
      {
        id: 'C',
        text: '$f(x) = x^2$',
        misconception: '',
      },
      {
        id: 'D',
        text: '$f(x) = x^3 + x$',
        misconception: 'Both powers are odd, so $f(-x) = -x^3 - x = -f(x)$, making this an odd function.',
      },
    ],
    correctId: 'C',
    explanation:
      'For $f(x) = x^2$, substituting $-x$ gives $f(-x) = (-x)^2 = x^2 = f(x)$, satisfying the condition for an even function (symmetric about the $y$-axis).',
  },
  {
    id: 'mids-ch01-q10',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 10,
    globalNumber: 10,
    topic: 'Odd Functions',
    question: 'Which of the following is an odd function?',
    math: 'f(-x) = -f(x)',
    options: [
      {
        id: 'A',
        text: '$f(x) = x^2$',
        misconception: '$(-x)^2 = x^2 = f(x)$, which is even symmetry.',
      },
      {
        id: 'B',
        text: '$f(x) = x^4$',
        misconception: '$(-x)^4 = x^4 = f(x)$, which is even symmetry.',
      },
      {
        id: 'C',
        text: '$f(x) = |x|$',
        misconception: '$|-x| = |x| = f(x)$, which is even symmetry.',
      },
      {
        id: 'D',
        text: '$f(x) = x^3$',
        misconception: '',
      },
    ],
    correctId: 'D',
    explanation:
      'For $f(x) = x^3$, $f(-x) = (-x)^3 = -x^3 = -f(x)$, so it is an odd function (symmetric about the origin).',
  },
  {
    id: 'mids-ch01-q11',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 11,
    globalNumber: 11,
    topic: 'Identifying Functions',
    question: 'Which relation represents $y$ as a function of $x$?',
    options: [
      {
        id: 'A',
        text: '$x^2 + y^2 = 1$',
        misconception: 'Solving for $y$ yields $y = \\pm\\sqrt{1 - x^2}$, giving two $y$-values for each $x \\in (-1, 1)$ (unit circle fails the vertical line test).',
      },
      {
        id: 'B',
        text: '$y^2 = x$',
        misconception: 'For any $x > 0$, there are two outputs $y = \\pm\\sqrt{x}$, so $y$ is not a function of $x$.',
      },
      {
        id: 'C',
        text: '$y = x^2 + 1$',
        misconception: '',
      },
      {
        id: 'D',
        text: '$x = |y|$',
        misconception: 'For any $x > 0$, both $y = x$ and $y = -x$ satisfy $x = |y|$, failing the vertical line test.',
      },
    ],
    correctId: 'C',
    explanation:
      'In $y = x^2 + 1$, every real input $x$ produces a single unique output $y$. The other three equations fail the Vertical Line Test because a positive $x$ can correspond to two distinct $y$-values.',
  },
  {
    id: 'mids-ch01-q12',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 12,
    globalNumber: 12,
    topic: 'Function Evaluation',
    question: 'If $f(x) = x^2 - 4$, then $f(-2)$ equals:',
    math: 'f(x) = x^2 - 4',
    options: [
      {
        id: 'A',
        text: '$-8$',
        misconception: 'Treating $(-2)^2$ as $-4$ and computing $-4 - 4 = -8$. Squaring a negative number yields a positive result.',
      },
      {
        id: 'B',
        text: '$0$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$4$',
        misconception: 'Computing $(-2)^2 = 4$ and forgetting to subtract $4$.',
      },
      {
        id: 'D',
        text: '$8$',
        misconception: 'Adding $4 + 4$ instead of subtracting $4 - 4$.',
      },
    ],
    correctId: 'B',
    explanation:
      'Squaring $-2$ gives $(-2)^2 = 4$, so $f(-2) = (-2)^2 - 4 = 4 - 4 = 0$.',
  },
  {
    id: 'mids-ch01-q13',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 13,
    globalNumber: 13,
    topic: 'Inverse Functions',
    question: 'If $f(x) = 2x - 1$, then the inverse function $f^{-1}(x)$ is:',
    math: 'f(x) = 2x - 1',
    options: [
      {
        id: 'A',
        text: '$\\frac{x + 1}{2}$',
        misconception: '',
      },
      {
        id: 'B',
        text: '$\\frac{x - 1}{2}$',
        misconception: 'Forgetting to reverse the subtraction sign when solving $y = 2x - 1$ for $x$.',
      },
      {
        id: 'C',
        text: '$2x + 1$',
        misconception: 'Reversing the sign of $-1$ without inverting the multiplication by $2$.',
      },
      {
        id: 'D',
        text: '$1 - 2x$',
        misconception: 'Negating the function rather than solving $y = 2x - 1$ for $x$ and swapping variables.',
      },
    ],
    correctId: 'A',
    explanation:
      'Set $y = 2x - 1$. Solving for $x$ gives $2x = y + 1 \\implies x = \\frac{y + 1}{2}$. Interchanging $x$ and $y$ yields $f^{-1}(x) = \\frac{x + 1}{2}$.',
  },
  {
    id: 'mids-ch01-q14',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 14,
    globalNumber: 14,
    topic: 'Composite Functions',
    question: 'If $f(x) = x + 2$ and $g(x) = x^2$, then $(f \\circ g)(x)$ is:',
    math: '(f \\circ g)(x) = f\\bigl(g(x)\\bigr)',
    options: [
      {
        id: 'A',
        text: '$x^2 + 2$',
        misconception: '',
      },
      {
        id: 'B',
        text: '$(x + 2)^2$',
        misconception: 'Reversing the composition order: $(x + 2)^2$ is $(g \\circ f)(x) = g(f(x))$, not $(f \\circ g)(x)$.',
      },
      {
        id: 'C',
        text: '$x^2 + 4$',
        misconception: 'Squaring the constant $2$ inside $f(x)$ when composing.',
      },
      {
        id: 'D',
        text: '$2x^2$',
        misconception: 'Multiplying by $2$ instead of adding $2$ after applying $g(x) = x^2$.',
      },
    ],
    correctId: 'A',
    explanation:
      'By definition, $(f \\circ g)(x) = f(g(x)) = f(x^2) = x^2 + 2$.',
  },
  {
    id: 'mids-ch01-q15',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 15,
    globalNumber: 15,
    topic: 'Invertibility Condition',
    question: 'A function has an inverse function on its domain if and only if it is:',
    options: [
      {
        id: 'A',
        text: 'Even',
        misconception: 'Non-constant even functions satisfy $f(-x) = f(x)$, so they fail the horizontal line test and do not have inverses on symmetric domains.',
      },
      {
        id: 'B',
        text: 'Odd',
        misconception: 'Some odd functions (like $x^3 - x$) are not one-to-one, and many invertible functions (like $e^x$) are neither even nor odd.',
      },
      {
        id: 'C',
        text: 'One-to-one',
        misconception: '',
      },
      {
        id: 'D',
        text: 'Constant',
        misconception: 'A constant function maps every input to the same output, making it non-invertible on any domain with more than one point.',
      },
    ],
    correctId: 'C',
    explanation:
      'A function $f$ possesses an inverse function $f^{-1}$ if and only if it is one-to-one (each output corresponds to at most one input, passing the Horizontal Line Test).',
  },
  {
    id: 'mids-ch01-q16',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 16,
    globalNumber: 16,
    topic: 'Symmetry of Absolute Value',
    question: 'The function $f(x) = |x|$ is:',
    math: 'f(x) = |x|',
    options: [
      {
        id: 'A',
        text: 'Odd',
        misconception: 'For $x \\neq 0$, $f(-x) = |-x| = |x| \\neq -|x|$, so $|x|$ is not odd.',
      },
      {
        id: 'B',
        text: 'Even',
        misconception: '',
      },
      {
        id: 'C',
        text: 'Neither even nor odd',
        misconception: 'Because $|-x| = |x|$ holds for all real $x$, $|x|$ strictly satisfies the even-function test.',
      },
      {
        id: 'D',
        text: 'Constant',
        misconception: 'Its output varies with $x$ ($|1| = 1$, $|2| = 2$), so it is not constant.',
      },
    ],
    correctId: 'B',
    explanation:
      'Testing symmetry: $f(-x) = |-x| = |x| = f(x)$ for all $x \\in \\mathbb{R}$. Therefore, $f(x) = |x|$ is an even function.',
  },
  {
    id: 'mids-ch01-q17',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 17,
    globalNumber: 17,
    topic: 'Trigonometric Identities',
    question: 'Which trigonometric identity is correct for all real $x$?',
    options: [
      {
        id: 'A',
        text: '$\\sin^2 x - \\cos^2 x = 1$',
        misconception: 'Sign error: $\\cos^2 x - \\sin^2 x = \\cos(2x)$, whereas the Pythagorean identity uses addition.',
      },
      {
        id: 'B',
        text: '$\\sin^2 x + \\cos^2 x = 1$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$\\sin x + \\cos x = 1$',
        misconception: 'Forgetting the squares; at $x = \\pi/4$, $\\sin(\\pi/4) + \\cos(\\pi/4) = \\sqrt{2} \\neq 1$.',
      },
      {
        id: 'D',
        text: '$\\tan x = \\sin x \\cos x$',
        misconception: 'Confusing division with multiplication; $\\tan x = \\frac{\\sin x}{\\cos x}$ (where $\\cos x \\neq 0$).',
      },
    ],
    correctId: 'B',
    explanation:
      'From the unit circle equation $X^2 + Y^2 = 1$ with $X = \\cos x$ and $Y = \\sin x$, we obtain the Pythagorean identity $\\sin^2 x + \\cos^2 x = 1$.',
  },
  {
    id: 'mids-ch01-q18',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 18,
    globalNumber: 18,
    topic: 'One-to-One Functions',
    question: 'Which function is NOT one-to-one on the set of all real numbers?',
    options: [
      {
        id: 'A',
        text: '$f(x) = x$',
        misconception: '$f(x) = x$ is strictly increasing on $\\mathbb{R}$, so it is one-to-one.',
      },
      {
        id: 'B',
        text: '$f(x) = 2x + 1$',
        misconception: 'A non-horizontal linear function is strictly monotonic and always one-to-one.',
      },
      {
        id: 'C',
        text: '$f(x) = x^3$',
        misconception: '$f(x) = x^3$ is strictly increasing across all real numbers and passes the horizontal line test.',
      },
      {
        id: 'D',
        text: '$f(x) = x^2$',
        misconception: '',
      },
    ],
    correctId: 'D',
    explanation:
      '$f(x) = x^2$ fails the Horizontal Line Test on $(-\\infty, \\infty)$ because distinct inputs like $x = -2$ and $x = 2$ yield the same output: $f(-2) = f(2) = 4$.',
  },
  {
    id: 'mids-ch01-q19',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 19,
    globalNumber: 19,
    topic: 'Composite Function Evaluation',
    question: 'If $f(x) = x^2$ and $g(x) = x + 1$, then $(f \\circ g)(2)$ is:',
    math: '(f \\circ g)(2) = f\\bigl(g(2)\\bigr)',
    options: [
      {
        id: 'A',
        text: '$4$',
        misconception: 'Evaluating $f(2) = 4$ and forgetting to apply $g$ first.',
      },
      {
        id: 'B',
        text: '$6$',
        misconception: 'Multiplying $2 \\times 3$ instead of squaring $g(2) = 3$.',
      },
      {
        id: 'C',
        text: '$9$',
        misconception: '',
      },
      {
        id: 'D',
        text: '$12$',
        misconception: 'Misapplying order of operations when composing $f$ and $g$.',
      },
    ],
    correctId: 'C',
    explanation:
      'First compute the inner value: $g(2) = 2 + 1 = 3$. Then substitute into $f$: $f(g(2)) = f(3) = 3^2 = 9$.',
  },
  {
    id: 'mids-ch01-q20',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 20,
    globalNumber: 20,
    topic: 'Self-Composition',
    question: 'If $f(x) = \\frac{1}{x}$, then $f(f(x))$, for $x \\neq 0$, is:',
    math: 'f(x) = \\frac{1}{x}, \\quad x \\neq 0',
    options: [
      {
        id: 'A',
        text: '$x$',
        misconception: '',
      },
      {
        id: 'B',
        text: '$-x$',
        misconception: 'Confusing the reciprocal $1/x$ with the additive inverse $-x$.',
      },
      {
        id: 'C',
        text: '$x^2$',
        misconception: 'Incorrectly inverting the fraction $\\frac{1}{1/x}$ as $x \\cdot x$ instead of $1 \\cdot \\frac{x}{1}$.',
      },
      {
        id: 'D',
        text: '$\\frac{1}{x^2}$',
        misconception: 'Computing $[f(x)]^2 = \\left(\\frac{1}{x}\\right)^2$ instead of the composition $f(f(x))$.',
      },
    ],
    correctId: 'A',
    explanation:
      'Substituting $f(x) = \\frac{1}{x}$ into $f$ gives $f(f(x)) = \\frac{1}{1/x} = x$ for every $x \\neq 0$.',
  },
  {
    id: 'mids-ch01-q21',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    questionNumber: 21,
    globalNumber: 21,
    topic: 'Evaluating $f(-x)$',
    question: 'If $f(x) = x^2 + 1$, then $f(-x)$ is:',
    math: 'f(x) = x^2 + 1',
    options: [
      {
        id: 'A',
        text: '$-x^2 + 1$',
        misconception: 'Evaluating $-x^2 + 1$ instead of $(-x)^2 + 1$. Parentheses around $-x$ are essential when substituting.',
      },
      {
        id: 'B',
        text: '$x^2 - 1$',
        misconception: 'Negating the constant term $+1$ instead of substituting $-x$ for $x$.',
      },
      {
        id: 'C',
        text: '$x^2 + 1$',
        misconception: '',
      },
      {
        id: 'D',
        text: '$-x^2 - 1$',
        misconception: 'Computing $-f(x)$ instead of $f(-x)$.',
      },
    ],
    correctId: 'C',
    explanation:
      'Replacing $x$ with $(-x)$ yields $f(-x) = (-x)^2 + 1 = x^2 + 1$. Because $f(-x) = f(x)$, this function is even.',
  },

  // =========================================================================
  // CHAPTER 2: LIMITS AND CONTINUITY (20 Questions)
  // =========================================================================
  {
    id: 'mids-ch02-q01',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 1,
    globalNumber: 22,
    topic: 'Average Rate of Change',
    question: 'The average rate of change of $f(x)$ from $x = a$ to $x = b$ ($b \\neq a$) is:',
    options: [
      {
        id: 'A',
        text: '$\\frac{f(a) + f(b)}{b - a}$',
        misconception: 'Adding $f(a)$ and $f(b)$ instead of taking the net change $f(b) - f(a)$ in the numerator.',
      },
      {
        id: 'B',
        text: '$\\frac{f(b) - f(a)}{b - a}$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$\\frac{f(b)}{f(a)}$',
        misconception: 'Taking the ratio of outputs rather than the slope $\\Delta y / \\Delta x$ between $(a, f(a))$ and $(b, f(b))$.',
      },
      {
        id: 'D',
        text: '$f(b) - f(a)$',
        misconception: 'Computing only the total change in $y$ without dividing by the interval width $b - a$.',
      },
    ],
    correctId: 'B',
    explanation:
      'The average rate of change of $f$ over $[a, b]$ is the slope of the secant line joining $(a, f(a))$ and $(b, f(b))$: $\\frac{\\Delta y}{\\Delta x} = \\frac{f(b) - f(a)}{b - a}$.',
  },
  {
    id: 'mids-ch02-q02',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 2,
    globalNumber: 23,
    topic: 'Average Rate of Change Calculation',
    question: 'If $f(x) = x^2$, the average rate of change from $x = 1$ to $x = 3$ is:',
    math: 'f(x) = x^2, \\quad [1, 3]',
    options: [
      {
        id: 'A',
        text: '$2$',
        misconception: 'Using the derivative at $x = 1$ ($f\'(1) = 2$) or computing $3 - 1$ instead of the average rate over $[1, 3]$.',
      },
      {
        id: 'B',
        text: '$3$',
        misconception: 'Dividing $9/3$ rather than evaluating $\\frac{f(3) - f(1)}{3 - 1}$.',
      },
      {
        id: 'C',
        text: '$4$',
        misconception: '',
      },
      {
        id: 'D',
        text: '$8$',
        misconception: 'Computing only the numerator $f(3) - f(1) = 9 - 1 = 8$ and forgetting to divide by $3 - 1 = 2$.',
      },
    ],
    correctId: 'C',
    explanation:
      'Using the difference quotient: $\\frac{f(3) - f(1)}{3 - 1} = \\frac{3^2 - 1^2}{3 - 1} = \\frac{9 - 1}{2} = \\frac{8}{2} = 4$.',
  },
  {
    id: 'mids-ch02-q03',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 3,
    globalNumber: 24,
    topic: 'Instantaneous Rate of Change',
    question: 'The instantaneous rate of change of $f$ at $x = c$ is represented by:',
    options: [
      {
        id: 'A',
        text: '$\\lim_{x \\to c} \\frac{f(x) - f(c)}{x + c}$',
        misconception: 'Using $x + c$ in the denominator instead of the run $\\Delta x = x - c$.',
      },
      {
        id: 'B',
        text: '$\\lim_{x \\to c} \\frac{f(x) - f(c)}{x - c}$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$\\frac{f(c)}{c}$',
        misconception: 'Dividing the function value by $c$ gives neither an average nor an instantaneous rate of change.',
      },
      {
        id: 'D',
        text: '$f(c)$',
        misconception: '$f(c)$ is the value of the function at $c$, not its rate of change.',
      },
    ],
    correctId: 'B',
    explanation:
      'The instantaneous rate of change of $f$ at $x = c$ is the limit of the average rates of change over intervals $[c, x]$ as $x \\to c$: $\\lim_{x \\to c} \\frac{f(x) - f(c)}{x - c}$.',
  },
  {
    id: 'mids-ch02-q04',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 4,
    globalNumber: 25,
    topic: 'Difference Quotient Variable',
    question: 'In the expression $\\lim_{h \\to 0} \\frac{f(c + h) - f(c)}{h}$, what does $h$ represent?',
    math: '\\lim_{h \\to 0} \\frac{f(c + h) - f(c)}{h}',
    options: [
      {
        id: 'A',
        text: 'The value of the function at $c$',
        misconception: 'The function value at $c$ is $f(c)$, whereas $h$ is added to the input $c$.',
      },
      {
        id: 'B',
        text: 'A change in $x$',
        misconception: '',
      },
      {
        id: 'C',
        text: 'The slope of the tangent line',
        misconception: 'The entire limit represents the slope of the tangent line; $h$ alone is the horizontal step $\\Delta x$.',
      },
      {
        id: 'D',
        text: 'The limit value',
        misconception: '$h$ is the variable approaching $0$, not the resulting limit of the quotient.',
      },
    ],
    correctId: 'B',
    explanation:
      'Here $h = \\Delta x = (c + h) - c$ represents a small horizontal change (increment) in the input $x$ away from $c$.',
  },
  {
    id: 'mids-ch02-q05',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 5,
    globalNumber: 26,
    topic: 'One-Sided Limits',
    question: 'For $f(x) = \\frac{|x|}{x}$, what is $\\lim_{x \\to 0^+} f(x)$?',
    math: '\\lim_{x \\to 0^+} \\frac{|x|}{x}',
    options: [
      {
        id: 'A',
        text: '$-1$',
        misconception: '$-1$ is the left-hand limit as $x \\to 0^-$, where $x$ is negative and $|x| = -x$.',
      },
      {
        id: 'B',
        text: '$0$',
        misconception: 'Substituting $x = 0$ gives the indeterminate form $0/0$, not $0$.',
      },
      {
        id: 'C',
        text: '$1$',
        misconception: '',
      },
      {
        id: 'D',
        text: 'Does not exist',
        misconception: 'Although the two-sided limit at $0$ does not exist, the right-hand limit approaches a single finite value.',
      },
    ],
    correctId: 'C',
    explanation:
      'As $x \\to 0^+$, $x > 0$, so $|x| = x$ and $\\frac{|x|}{x} = \\frac{x}{x} = 1$. Thus $\\lim_{x \\to 0^+} \\frac{|x|}{x} = 1$.',
  },
  {
    id: 'mids-ch02-q06',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 6,
    globalNumber: 27,
    topic: 'One-Sided Limits',
    question: 'For the same function $f(x) = \\frac{|x|}{x}$, what is $\\lim_{x \\to 0^-} f(x)$?',
    math: '\\lim_{x \\to 0^-} \\frac{|x|}{x}',
    options: [
      {
        id: 'A',
        text: '$-1$',
        misconception: '',
      },
      {
        id: 'B',
        text: '$0$',
        misconception: 'Canceling $0/0$ to get $0$ is invalid; for $x < 0$, the ratio is identically $-1$.',
      },
      {
        id: 'C',
        text: '$1$',
        misconception: 'Forgetting that $|x| = -x$ when $x < 0$; $1$ is the right-hand limit.',
      },
      {
        id: 'D',
        text: 'Does not exist',
        misconception: 'The one-sided limit from the left exists and equals $-1$ even though $f(0)$ is undefined.',
      },
    ],
    correctId: 'A',
    explanation:
      'As $x \\to 0^-$, $x < 0$, so $|x| = -x$ and $\\frac{|x|}{x} = \\frac{-x}{x} = -1$. Thus $\\lim_{x \\to 0^-} \\frac{|x|}{x} = -1$.',
  },
  {
    id: 'mids-ch02-q07',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 7,
    globalNumber: 28,
    topic: 'Existence of Two-Sided Limits',
    question: 'Evaluate $\\lim_{x \\to 0} \\frac{|x|}{x}$:',
    math: '\\lim_{x \\to 0} \\frac{|x|}{x}',
    options: [
      {
        id: 'A',
        text: '$-1$',
        misconception: 'Using only the left-hand limit ($-1$) without checking whether the right-hand limit agrees.',
      },
      {
        id: 'B',
        text: '$0$',
        misconception: 'Averaging $-1$ and $1$ does not give a valid limit; both one-sided limits must be equal.',
      },
      {
        id: 'C',
        text: '$1$',
        misconception: 'Using only the right-hand limit ($1$) without checking the left-hand limit.',
      },
      {
        id: 'D',
        text: 'Does not exist',
        misconception: '',
      },
    ],
    correctId: 'D',
    explanation:
      'Because $\\lim_{x \\to 0^-} \\frac{|x|}{x} = -1 \\neq 1 = \\lim_{x \\to 0^+} \\frac{|x|}{x}$, the one-sided limits disagree, so the two-sided limit does not exist.',
  },
  {
    id: 'mids-ch02-q08',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 8,
    globalNumber: 29,
    topic: 'Limit Laws',
    question: 'Assuming $\\lim f$ and $\\lim g$ exist as $x \\to c$, which of the following is a correct Limit Law?',
    options: [
      {
        id: 'A',
        text: '$\\lim (f + g) = \\lim f - \\lim g$',
        misconception: 'The Sum Rule preserves addition: $\\lim (f + g) = \\lim f + \\lim g$.',
      },
      {
        id: 'B',
        text: '$\\lim (fg) = (\\lim f)(\\lim g)$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$\\lim (f + g) = (\\lim f)(\\lim g)$',
        misconception: 'Confusing the Sum Rule with the Product Rule.',
      },
      {
        id: 'D',
        text: '$\\lim (f / g) = \\lim f + \\lim g$',
        misconception: 'The Quotient Rule states $\\lim (f / g) = \\frac{\\lim f}{\\lim g}$ provided $\\lim g \\neq 0$.',
      },
    ],
    correctId: 'B',
    explanation:
      'By the Product Rule for Limits, when $\\lim_{x \\to c} f(x)$ and $\\lim_{x \\to c} g(x)$ exist, the limit of their product equals the product of their limits.',
  },
  {
    id: 'mids-ch02-q09',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 9,
    globalNumber: 30,
    topic: 'Evaluating Limits by Substitution',
    question: 'Evaluate $\\lim_{x \\to 1} (x^2 + 3x - 2)$:',
    math: '\\lim_{x \\to 1} (x^2 + 3x - 2)',
    options: [
      {
        id: 'A',
        text: '$0$',
        misconception: 'Arithmetic error when substituting $x = 1$ into $x^2 + 3x - 2$.',
      },
      {
        id: 'B',
        text: '$1$',
        misconception: 'Evaluating only $1^2 + 3(1) - 3$ or dropping a term.',
      },
      {
        id: 'C',
        text: '$2$',
        misconception: '',
      },
      {
        id: 'D',
        text: '$4$',
        misconception: 'Evaluating $1^2 + 3(1) = 4$ and forgetting to subtract $2$.',
      },
    ],
    correctId: 'C',
    explanation:
      'Since polynomials are continuous everywhere, evaluate directly at $x = 1$: $1^2 + 3(1) - 2 = 1 + 3 - 2 = 2$.',
  },
  {
    id: 'mids-ch02-q10',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 10,
    globalNumber: 31,
    topic: 'Evaluating Limits with Negative Inputs',
    question: 'Evaluate $\\lim_{x \\to -2} (x^2 - 3x + 1)$:',
    math: '\\lim_{x \\to -2} (x^2 - 3x + 1)',
    options: [
      {
        id: 'A',
        text: '$-9$',
        misconception: 'Evaluating $-2^2 - 3(2) + 1 = -4 - 6 + 1 = -9$ by misapplying signs on both $(-2)^2$ and $-3(-2)$.',
      },
      {
        id: 'B',
        text: '$-1$',
        misconception: 'Computing $(-2)^2 - 3(2) + 1 = 4 - 6 + 1 = -1$ by forgetting the negative sign in $-3(-2)$.',
      },
      {
        id: 'C',
        text: '$3$',
        misconception: 'Writing $-4 + 6 + 1 = 3$ by treating $(-2)^2$ as $-4$.',
      },
      {
        id: 'D',
        text: '$11$',
        misconception: '',
      },
    ],
    correctId: 'D',
    explanation:
      'By direct substitution into the polynomial: $(-2)^2 - 3(-2) + 1 = 4 + 6 + 1 = 11$.',
  },
  {
    id: 'mids-ch02-q11',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 11,
    globalNumber: 32,
    topic: 'Indeterminate Form 0/0',
    question: 'Evaluate $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$:',
    math: '\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}',
    options: [
      {
        id: 'A',
        text: '$3$',
        misconception: 'Substituting $x = 3$ into $x$ alone rather than the factored form $x + 3$.',
      },
      {
        id: 'B',
        text: '$6$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$9$',
        misconception: 'Evaluating the $x^2$ term at $3$ instead of factoring $\\frac{(x - 3)(x + 3)}{x - 3}$.',
      },
      {
        id: 'D',
        text: 'Does not exist',
        misconception: 'Although the function has a removable hole at $x = 3$, the limit still exists because $(x - 3)$ cancels for $x \\neq 3$.',
      },
    ],
    correctId: 'B',
    explanation:
      'Direct substitution gives $0/0$. Factoring the numerator as a difference of squares gives $\\lim_{x \\to 3} \\frac{(x - 3)(x + 3)}{x - 3} = \\lim_{x \\to 3} (x + 3) = 3 + 3 = 6$.',
  },
  {
    id: 'mids-ch02-q12',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 12,
    globalNumber: 33,
    topic: 'Linearity of Limits',
    question: 'If $\\lim_{x \\to c} f(x) = 3$ and $\\lim_{x \\to c} g(x) = 2$, then $\\lim_{x \\to c} [4f(x) - 3g(x)]$ is:',
    math: '\\lim_{x \\to c} \\bigl[4f(x) - 3g(x)\\bigr]',
    options: [
      {
        id: 'A',
        text: '$6$',
        misconception: '',
      },
      {
        id: 'B',
        text: '$12$',
        misconception: 'Evaluating only $4f(c) = 12$ and omitting the subtracted term $-3g(c) = -6$.',
      },
      {
        id: 'C',
        text: '$18$',
        misconception: 'Adding $4(3) + 3(2) = 18$ instead of subtracting $12 - 6$.',
      },
      {
        id: 'D',
        text: '$24$',
        misconception: 'Multiplying $(4 \\cdot 3)(2) = 24$ instead of applying the Difference and Constant Multiple Laws.',
      },
    ],
    correctId: 'A',
    explanation:
      'Applying the Constant Multiple and Difference Limit Laws: $\\lim_{x \\to c} [4f(x) - 3g(x)] = 4(3) - 3(2) = 12 - 6 = 6$.',
  },
  {
    id: 'mids-ch02-q13',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 13,
    globalNumber: 34,
    topic: 'Definition of Continuity',
    question: 'A function $f$ is continuous at an interior point $x = c$ of its domain if:',
    options: [
      {
        id: 'A',
        text: '$f(c)$ is undefined',
        misconception: 'If $f(c)$ is undefined, the function has a discontinuity at $x = c$.',
      },
      {
        id: 'B',
        text: '$\\lim_{x \\to c} f(x) = f(c)$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$\\lim_{x \\to c} f(x) = 0$',
        misconception: 'Continuity does not require the limit to equal $0$; it must equal $f(c)$, whatever finite value $f(c)$ has.',
      },
      {
        id: 'D',
        text: '$f(c) = 1$',
        misconception: 'A continuous function can take any real value at $x = c$, not specifically $1$.',
      },
    ],
    correctId: 'B',
    explanation:
      'A function $f$ is continuous at $x = c$ if $f(c)$ is defined, $\\lim_{x \\to c} f(x)$ exists, and $\\lim_{x \\to c} f(x) = f(c)$.',
  },
  {
    id: 'mids-ch02-q14',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 14,
    globalNumber: 35,
    topic: 'Continuity Test Conditions',
    question: 'Which is NOT one of the conditions for continuity of $f$ at $x = c$?',
    options: [
      {
        id: 'A',
        text: '$f(c)$ exists',
        misconception: 'Condition 1 of the Continuity Test requires $f$ to be defined at $c$.',
      },
      {
        id: 'B',
        text: '$\\lim_{x \\to c} f(x)$ exists',
        misconception: 'Condition 2 of the Continuity Test requires the two-sided limit at $c$ to exist.',
      },
      {
        id: 'C',
        text: '$\\lim_{x \\to c} f(x) = f(c)$',
        misconception: 'Condition 3 of the Continuity Test requires the limit to match the function value.',
      },
      {
        id: 'D',
        text: '$f(c) = 0$',
        misconception: '',
      },
    ],
    correctId: 'D',
    explanation:
      'The three continuity conditions at an interior point $c$ are: (1) $f(c)$ exists, (2) $\\lim_{x \\to c} f(x)$ exists, and (3) $\\lim_{x \\to c} f(x) = f(c)$. There is no requirement that $f(c) = 0$.',
  },
  {
    id: 'mids-ch02-q15',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 15,
    globalNumber: 36,
    topic: 'Continuity of Polynomials',
    question: 'Every polynomial function is continuous:',
    options: [
      {
        id: 'A',
        text: 'Nowhere',
        misconception: 'Polynomials have no holes, jumps, or vertical asymptotes anywhere on the real line.',
      },
      {
        id: 'B',
        text: 'Only at $x = 0$',
        misconception: 'Polynomials are continuous at every real number, not just at the origin.',
      },
      {
        id: 'C',
        text: 'Everywhere on $(-\\infty, \\infty)$',
        misconception: '',
      },
      {
        id: 'D',
        text: 'Only for positive $x$',
        misconception: 'Polynomials are equally well-defined and continuous for negative and zero values of $x$.',
      },
    ],
    correctId: 'C',
    explanation:
      'Because sums and products of continuous functions are continuous and $f(x) = x$ and constants are continuous everywhere, every polynomial is continuous on $(-\\infty, \\infty)$.',
  },
  {
    id: 'mids-ch02-q16',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 16,
    globalNumber: 37,
    topic: 'Points of Discontinuity',
    question: 'The function $f(x) = \\frac{1}{x - 2}$ is discontinuous at:',
    math: 'f(x) = \\frac{1}{x - 2}',
    options: [
      {
        id: 'A',
        text: '$x = 0$',
        misconception: 'At $x = 0$, $f(0) = -\\frac{1}{2}$ is defined and the function is continuous there.',
      },
      {
        id: 'B',
        text: '$x = 1$',
        misconception: 'At $x = 1$, $f(1) = -1$ is defined and continuous.',
      },
      {
        id: 'C',
        text: '$x = 2$',
        misconception: '',
      },
      {
        id: 'D',
        text: '$x = -2$',
        misconception: 'Sign error when solving $x - 2 = 0$; at $x = -2$, $f(-2) = -\\frac{1}{4}$ is well-defined.',
      },
    ],
    correctId: 'C',
    explanation:
      'A rational function is continuous at every point where its denominator is nonzero. Setting $x - 2 = 0$ gives $x = 2$ as the point of discontinuity.',
  },
  {
    id: 'mids-ch02-q17',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 17,
    globalNumber: 38,
    topic: 'Limits at Infinity',
    question: 'Evaluate $\\lim_{x \\to \\infty} \\frac{3x + 1}{x + 5}$:',
    math: '\\lim_{x \\to \\infty} \\frac{3x + 1}{x + 5}',
    options: [
      {
        id: 'A',
        text: '$0$',
        misconception: 'A rational limit at infinity is $0$ only when the denominator has a strictly higher degree than the numerator.',
      },
      {
        id: 'B',
        text: '$1$',
        misconception: 'Ignoring the leading coefficient $3$ in the numerator.',
      },
      {
        id: 'C',
        text: '$3$',
        misconception: '',
      },
      {
        id: 'D',
        text: '$5$',
        misconception: 'Reading the constant $5$ from the denominator instead of comparing the leading coefficients $\\frac{3}{1}$.',
      },
    ],
    correctId: 'C',
    explanation:
      'Divide numerator and denominator by $x$: $\\lim_{x \\to \\infty} \\frac{3 + 1/x}{1 + 5/x} = \\frac{3 + 0}{1 + 0} = 3$.',
  },
  {
    id: 'mids-ch02-q18',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 18,
    globalNumber: 39,
    topic: 'Limits at Infinity',
    question: 'Evaluate $\\lim_{x \\to \\infty} \\frac{2x^2 + 3}{5x^2 - 1}$:',
    math: '\\lim_{x \\to \\infty} \\frac{2x^2 + 3}{5x^2 - 1}',
    options: [
      {
        id: 'A',
        text: '$0$',
        misconception: 'Since the numerator and denominator both have degree $2$, the limit is the ratio of leading coefficients, not $0$.',
      },
      {
        id: 'B',
        text: '$\\frac{2}{5}$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$\\frac{5}{2}$',
        misconception: 'Inverting the ratio of leading coefficients (denominator over numerator).',
      },
      {
        id: 'D',
        text: '$2$',
        misconception: 'Taking only the numerator\'s leading coefficient while ignoring the factor $5$ in the denominator.',
      },
    ],
    correctId: 'B',
    explanation:
      'Dividing numerator and denominator by the highest power $x^2$ gives $\\lim_{x \\to \\infty} \\frac{2 + 3/x^2}{5 - 1/x^2} = \\frac{2 + 0}{5 - 0} = \\frac{2}{5}$.',
  },
  {
    id: 'mids-ch02-q19',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 19,
    globalNumber: 40,
    topic: 'Special Trigonometric Limit',
    question: 'Evaluate $\\lim_{x \\to 0} \\frac{\\sin x}{x}$ (with $x$ in radians):',
    math: '\\lim_{x \\to 0} \\frac{\\sin x}{x}',
    options: [
      {
        id: 'A',
        text: '$\\infty$',
        misconception: 'Because the numerator $\\sin x$ also approaches $0$ as $x \\to 0$, this is a $0/0$ indeterminate form rather than $1/0$.',
      },
      {
        id: 'B',
        text: '$0$',
        misconception: 'Using only $\\lim_{x \\to 0} \\sin x = 0$ and ignoring that the denominator $x$ also goes to $0$ at the same rate.',
      },
      {
        id: 'C',
        text: '$1$',
        misconception: '',
      },
      {
        id: 'D',
        text: 'Does not exist',
        misconception: 'Although undefined at $x = 0$, the Sandwich Theorem proves the two-sided limit equals $1$.',
      },
    ],
    correctId: 'C',
    explanation:
      'By the Sandwich Theorem on the unit circle, $\\cos x < \\frac{\\sin x}{x} < 1$ for $0 < |x| < \\frac{\\pi}{2}$. Since $\\lim_{x \\to 0} \\cos x = 1$, $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.',
  },
  {
    id: 'mids-ch02-q20',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    questionNumber: 20,
    globalNumber: 41,
    topic: 'Continuity on Real Numbers',
    question: 'Which function is continuous for every real number?',
    options: [
      {
        id: 'A',
        text: '$f(x) = \\frac{1}{x}$',
        misconception: 'Discontinuous at $x = 0$ where division by zero occurs.',
      },
      {
        id: 'B',
        text: '$f(x) = \\frac{1}{x - 2}$',
        misconception: 'Discontinuous at $x = 2$ where the denominator becomes zero.',
      },
      {
        id: 'C',
        text: '$f(x) = \\sqrt{x}$',
        misconception: 'Only defined and continuous on $[0, \\infty)$; not defined for negative real numbers.',
      },
      {
        id: 'D',
        text: '$f(x) = x^3 - 4x + 7$',
        misconception: '',
      },
    ],
    correctId: 'D',
    explanation:
      '$f(x) = x^3 - 4x + 7$ is a polynomial, so it is continuous on $(-\\infty, \\infty)$. The other functions either have points of division by zero or restricted domains.',
  },

  // =========================================================================
  // CHAPTER 3: DERIVATIVES (24 Questions)
  // =========================================================================
  {
    id: 'mids-ch03-q01',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 1,
    globalNumber: 42,
    topic: 'Limit Definition of Derivative',
    question: 'The derivative of a function $f(x)$ at $x = a$ is defined as:',
    options: [
      {
        id: 'A',
        text: '$\\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}$',
        misconception: '',
      },
      {
        id: 'B',
        text: '$\\lim_{h \\to 0} \\frac{f(a + h) + f(a)}{h}$',
        misconception: 'Adding $f(a + h) + f(a)$ instead of taking the difference $f(a + h) - f(a)$ does not give $0/0$ or measure change.',
      },
      {
        id: 'C',
        text: '$\\frac{f(a)}{a}$',
        misconception: 'Dividing $f(a)$ by $a$ gives the slope from the origin $(0,0)$, not the tangent slope at $x = a$.',
      },
      {
        id: 'D',
        text: '$f(a + h) - f(a)$',
        misconception: 'This is only the change $\\Delta y$, missing both division by $h$ and the limit as $h \\to 0$.',
      },
    ],
    correctId: 'A',
    explanation:
      'Provided the limit exists, the derivative at $x = a$ is $f\'(a) = \\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}$.',
  },
  {
    id: 'mids-ch03-q02',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 2,
    globalNumber: 43,
    topic: 'Geometric Meaning of Derivative',
    question: 'Geometrically, $f\'(a)$ represents the:',
    options: [
      {
        id: 'A',
        text: 'Area under the curve',
        misconception: 'Area under the curve is associated with definite integration, not the derivative.',
      },
      {
        id: 'B',
        text: 'Slope of the tangent line at $x = a$',
        misconception: '',
      },
      {
        id: 'C',
        text: 'Slope of the $x$-axis',
        misconception: 'The $x$-axis always has slope $0$, whereas $f\'(a)$ depends on the curve $f$ and the point $a$.',
      },
      {
        id: 'D',
        text: '$y$-intercept of the curve',
        misconception: 'The $y$-intercept is $(0, f(0))$, which is a function value rather than a derivative.',
      },
    ],
    correctId: 'B',
    explanation:
      'As $h \\to 0$, secant lines through $(a, f(a))$ and $(a + h, f(a + h))$ approach the tangent line at $(a, f(a))$, whose slope equals $f\'(a)$.',
  },
  {
    id: 'mids-ch03-q03',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 3,
    globalNumber: 44,
    topic: 'Power Rule',
    question: 'If $f(x) = x^4$, then $f\'(x)$ is:',
    math: 'f(x) = x^4',
    options: [
      {
        id: 'A',
        text: '$x^3$',
        misconception: 'Reducing the exponent by $1$ without bringing the original exponent $4$ down as a coefficient.',
      },
      {
        id: 'B',
        text: '$4x^3$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$4x$',
        misconception: 'Reducing the exponent to $1$ instead of subtracting $1$ from $4$ ($4 - 1 = 3$).',
      },
      {
        id: 'D',
        text: '$x^4$',
        misconception: 'Only $e^x$ (and multiples of it) equals its own derivative; power functions follow $\\frac{d}{dx}(x^n) = nx^{n-1}$.',
      },
    ],
    correctId: 'B',
    explanation:
      'Applying the Power Rule $\\frac{d}{dx}(x^n) = nx^{n-1}$ with $n = 4$ gives $f\'(x) = 4x^{4-1} = 4x^3$.',
  },
  {
    id: 'mids-ch03-q04',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 4,
    globalNumber: 45,
    topic: 'Constant Rule',
    question: 'The derivative of a constant $c$ with respect to $x$ is:',
    math: '\\frac{d}{dx}(c)',
    options: [
      {
        id: 'A',
        text: '$1$',
        misconception: '$1$ is the derivative of $x$, not of a constant $c$.',
      },
      {
        id: 'B',
        text: '$c$',
        misconception: 'Confusing the constant itself with its rate of change.',
      },
      {
        id: 'C',
        text: '$0$',
        misconception: '',
      },
      {
        id: 'D',
        text: '$x$',
        misconception: 'A constant does not vary with $x$, so its derivative is zero, not $x$.',
      },
    ],
    correctId: 'C',
    explanation:
      'A constant function $f(x) = c$ never changes as $x$ changes; its graph is a horizontal line of slope $0$, so $\\frac{d}{dx}(c) = 0$.',
  },
  {
    id: 'mids-ch03-q05',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 5,
    globalNumber: 46,
    topic: 'Polynomial Differentiation',
    question: 'If $f(x) = 3x^5 - 2x^3 + x$, then $f\'(x) =$',
    math: 'f(x) = 3x^5 - 2x^3 + x',
    options: [
      {
        id: 'A',
        text: '$15x^4 - 6x^2 + 1$',
        misconception: '',
      },
      {
        id: 'B',
        text: '$15x^5 - 6x^3 + 1$',
        misconception: 'Multiplying by the exponents without decreasing each exponent by $1$.',
      },
      {
        id: 'C',
        text: '$3x^4 - 2x^2 + 1$',
        misconception: 'Decreasing the exponents without multiplying the coefficients by $5$ and $3$.',
      },
      {
        id: 'D',
        text: '$15x^4 - 6x^3 + x$',
        misconception: 'Differentiating only the first term properly while leaving $x^3$ and $x$ unchanged.',
      },
    ],
    correctId: 'A',
    explanation:
      'Differentiating term by term using the Power, Constant Multiple, and Sum/Difference Rules gives $3(5x^4) - 2(3x^2) + 1 = 15x^4 - 6x^2 + 1$.',
  },
  {
    id: 'mids-ch03-q06',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 6,
    globalNumber: 47,
    topic: 'Differentiability and Continuity',
    question: 'Which statement is always true?',
    options: [
      {
        id: 'A',
        text: 'Differentiability implies continuity',
        misconception: '',
      },
      {
        id: 'B',
        text: 'Continuity implies differentiability',
        misconception: 'False: $f(x) = |x|$ is continuous at $x = 0$ but has a sharp corner and is not differentiable there.',
      },
      {
        id: 'C',
        text: 'Both are always equivalent',
        misconception: 'Differentiability is strictly stronger than continuity; continuous functions need not be differentiable.',
      },
      {
        id: 'D',
        text: 'Neither implies the other',
        misconception: 'Every function differentiable at $x = c$ must be continuous at $x = c$.',
      },
    ],
    correctId: 'A',
    explanation:
      'Theorem: If $f$ has a derivative at $x = c$, then $f$ is continuous at $x = c$. The converse does not hold in general (e.g., $f(x) = |x|$ at $x = 0$).',
  },
  {
    id: 'mids-ch03-q07',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 7,
    globalNumber: 48,
    topic: 'Derivative of Square Root',
    question: 'If $f(x) = \\sqrt{x}$, then for $x > 0$, $f\'(x) =$',
    math: 'f(x) = \\sqrt{x} = x^{1/2}, \\quad x > 0',
    options: [
      {
        id: 'A',
        text: '$\\frac{1}{2\\sqrt{x}}$',
        misconception: '',
      },
      {
        id: 'B',
        text: '$2\\sqrt{x}$',
        misconception: 'Placing $2\\sqrt{x}$ in the numerator instead of the denominator; $x^{1/2 - 1} = x^{-1/2} = 1/\\sqrt{x}$.',
      },
      {
        id: 'C',
        text: '$\\sqrt{x}$',
        misconception: 'Leaving the radical unchanged instead of applying the Power Rule to $x^{1/2}$.',
      },
      {
        id: 'D',
        text: '$\\frac{1}{x}$',
        misconception: '$1/x$ is the derivative of $\\ln x$, not $\\sqrt{x}$.',
      },
    ],
    correctId: 'A',
    explanation:
      'Rewrite $\\sqrt{x} = x^{1/2}$. By the Power Rule, $f\'(x) = \\frac{1}{2}x^{1/2 - 1} = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$.',
  },
  {
    id: 'mids-ch03-q08',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 8,
    globalNumber: 49,
    topic: 'Negative Exponent Power Rule',
    question: 'The derivative of $x^{-3}$ is:',
    math: '\\frac{d}{dx}\\bigl(x^{-3}\\bigr)',
    options: [
      {
        id: 'A',
        text: '$-3x^{-4}$',
        misconception: '',
      },
      {
        id: 'B',
        text: '$3x^{-2}$',
        misconception: 'Dropping the negative sign and adding $+1$ to $-3$ instead of subtracting $1$.',
      },
      {
        id: 'C',
        text: '$-3x^{-2}$',
        misconception: 'Incorrectly computing the new exponent as $-3 + 1 = -2$ instead of $-3 - 1 = -4$.',
      },
      {
        id: 'D',
        text: '$x^{-4}$',
        misconception: 'Forgetting to multiply by the exponent $-3$.',
      },
    ],
    correctId: 'A',
    explanation:
      'Using the Power Rule with $n = -3$: $\\frac{d}{dx}(x^{-3}) = -3x^{-3 - 1} = -3x^{-4}$.',
  },
  {
    id: 'mids-ch03-q09',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 9,
    globalNumber: 50,
    topic: 'Trigonometric Derivatives',
    question: 'The derivative of $\\sin x$ is:',
    math: '\\frac{d}{dx}(\\sin x)',
    options: [
      {
        id: 'A',
        text: '$-\\sin x$',
        misconception: 'Confusing the first derivative of $\\sin x$ with its second derivative ($-\\sin x$).',
      },
      {
        id: 'B',
        text: '$\\cos x$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$-\\cos x$',
        misconception: 'Confusing the derivative of $\\sin x$ with its antiderivative ($-\\cos x + C$).',
      },
      {
        id: 'D',
        text: '$\\tan x$',
        misconception: 'The derivative of $\\sin x$ is $\\cos x$, not $\\tan x$.',
      },
    ],
    correctId: 'B',
    explanation:
      'For $x$ measured in radians, $\\frac{d}{dx}(\\sin x) = \\cos x$.',
  },
  {
    id: 'mids-ch03-q10',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 10,
    globalNumber: 51,
    topic: 'Trigonometric Derivatives',
    question: 'The derivative of $\\cos x$ is:',
    math: '\\frac{d}{dx}(\\cos x)',
    options: [
      {
        id: 'A',
        text: '$\\sin x$',
        misconception: 'Forgetting the negative sign: $\\sin x$ is the antiderivative of $\\cos x$, whereas its derivative is $-\\sin x$.',
      },
      {
        id: 'B',
        text: '$-\\sin x$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$\\cos x$',
        misconception: 'Cosine is not its own derivative; differentiating switches between $\\cos x$ and $\\pm\\sin x$.',
      },
      {
        id: 'D',
        text: '$-\\cos x$',
        misconception: 'Confusing the first derivative of $\\cos x$ with its second derivative.',
      },
    ],
    correctId: 'B',
    explanation:
      'For $x$ measured in radians, $\\frac{d}{dx}(\\cos x) = -\\sin x$.',
  },
  {
    id: 'mids-ch03-q11',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 11,
    globalNumber: 52,
    topic: 'Trigonometric Derivatives',
    question: 'The derivative of $\\tan x$ is:',
    math: '\\frac{d}{dx}(\\tan x)',
    options: [
      {
        id: 'A',
        text: '$\\sec^2 x$',
        misconception: '',
      },
      {
        id: 'B',
        text: '$\\csc^2 x$',
        misconception: 'The derivative of $\\cot x$ is $-\\csc^2 x$; $\\tan x$ differentiates to $\\sec^2 x$.',
      },
      {
        id: 'C',
        text: '$\\sec x$',
        misconception: 'Missing the exponent $2$ on $\\sec x$.',
      },
      {
        id: 'D',
        text: '$\\tan^2 x$',
        misconception: 'Confusing $\\sec^2 x$ with $\\tan^2 x$ (recall $\\sec^2 x = 1 + \\tan^2 x$).',
      },
    ],
    correctId: 'A',
    explanation:
      'Writing $\\tan x = \\frac{\\sin x}{\\cos x}$ and applying the Quotient Rule gives $\\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x} = \\sec^2 x$.',
  },
  {
    id: 'mids-ch03-q12',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 12,
    globalNumber: 53,
    topic: 'Product Rule Application',
    question: 'If $y = x^3 \\sin x$, the Product Rule gives $\\frac{dy}{dx} =$',
    math: 'y = x^3 \\sin x',
    options: [
      {
        id: 'A',
        text: '$3x^2 \\cos x$',
        misconception: 'Incorrectly taking the product of the individual derivatives $(x^3)\'(\\sin x)\'$ instead of using $(uv)\' = u\'v + uv\'$.',
      },
      {
        id: 'B',
        text: '$3x^2 \\sin x + x^3 \\cos x$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$x^3 \\cos x$',
        misconception: 'Treating $x^3$ as a constant rather than differentiating it.',
      },
      {
        id: 'D',
        text: '$3x^2 \\sin x$',
        misconception: 'Differentiating $x^3$ while treating $\\sin x$ as a constant.',
      },
    ],
    correctId: 'B',
    explanation:
      'By the Product Rule $(uv)\' = u\'v + uv\'$ with $u = x^3$ and $v = \\sin x$: $\\frac{dy}{dx} = 3x^2 \\sin x + x^3 \\cos x$.',
  },
  {
    id: 'mids-ch03-q13',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 13,
    globalNumber: 54,
    topic: 'Product Rule Formula',
    question: 'The Product Rule for differentiable functions $f$ and $g$ is:',
    options: [
      {
        id: 'A',
        text: '$(fg)\' = f\'g\'$',
        misconception: 'The derivative of a product is NOT the product of the derivatives.',
      },
      {
        id: 'B',
        text: '$(fg)\' = fg\' + gf\'$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$(fg)\' = f + g$',
        misconception: 'This omits differentiation altogether.',
      },
      {
        id: 'D',
        text: '$(fg)\' = fg\' - gf\'$',
        misconception: 'The Product Rule uses a plus sign; subtraction appears in the numerator of the Quotient Rule.',
      },
    ],
    correctId: 'B',
    explanation:
      'The Product Rule states that $\\frac{d}{dx}[f(x)g(x)] = f(x)g\'(x) + g(x)f\'(x)$.',
  },
  {
    id: 'mids-ch03-q14',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 14,
    globalNumber: 55,
    topic: 'Quotient Rule Formula',
    question: 'The Quotient Rule for $\\left(\\frac{f}{g}\\right)\'$ (with $g(x) \\neq 0$) is:',
    options: [
      {
        id: 'A',
        text: '$\\frac{f\'g\'}{g^2}$',
        misconception: 'Multiplying $f\'$ and $g\'$ instead of taking the difference $gf\' - fg\'$.',
      },
      {
        id: 'B',
        text: '$\\frac{gf\' - fg\'}{g^2}$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$\\frac{f\'g\'}{g}$',
        misconception: 'Incorrect numerator and missing square on the denominator $g^2$.',
      },
      {
        id: 'D',
        text: '$\\frac{fg\' - gf\'}{g^2}$',
        misconception: 'Reversed order of subtraction in the numerator, which produces the negative of the correct derivative.',
      },
    ],
    correctId: 'B',
    explanation:
      'By the Quotient Rule, $\\frac{d}{dx}\\left(\\frac{f}{g}\\right) = \\frac{g(x)f\'(x) - f(x)g\'(x)}{[g(x)]^2}$. Remember: "low d-high minus high d-low, over low squared."',
  },
  {
    id: 'mids-ch03-q15',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 15,
    globalNumber: 56,
    topic: 'Purpose of Chain Rule',
    question: 'The Chain Rule is mainly used when a function is:',
    options: [
      {
        id: 'A',
        text: 'Constant',
        misconception: 'A constant function simply differentiates to $0$ using the Constant Rule.',
      },
      {
        id: 'B',
        text: 'A composition of functions',
        misconception: '',
      },
      {
        id: 'C',
        text: 'Linear only',
        misconception: 'Simple linear functions only need the Power and Constant Rules.',
      },
      {
        id: 'D',
        text: 'A sum of two constants',
        misconception: 'A sum of two constants is itself a constant with derivative $0$.',
      },
    ],
    correctId: 'B',
    explanation:
      'The Chain Rule $\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)$ is designed specifically to differentiate composite functions.',
  },
  {
    id: 'mids-ch03-q16',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 16,
    globalNumber: 57,
    topic: 'Chain Rule Application',
    question: 'If $y = (3x + 1)^5$, then $y\'$ is:',
    math: 'y = (3x + 1)^5',
    options: [
      {
        id: 'A',
        text: '$5(3x + 1)^4$',
        misconception: 'Forgetting to multiply by the derivative of the inner function $(3x + 1)\' = 3$.',
      },
      {
        id: 'B',
        text: '$15(3x + 1)^4$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$15(3x + 1)^5$',
        misconception: 'Multiplying by $3$ properly, but forgetting to decrement the exponent from $5$ to $4$.',
      },
      {
        id: 'D',
        text: '$3(3x + 1)^4$',
        misconception: 'Multiplying by the inner derivative $3$ but omitting the outer power factor $5$.',
      },
    ],
    correctId: 'B',
    explanation:
      'By the Chain Rule, $y\' = 5(3x + 1)^4 \\cdot \\frac{d}{dx}(3x + 1) = 5(3x + 1)^4 \\cdot 3 = 15(3x + 1)^4$.',
  },
  {
    id: 'mids-ch03-q17',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 17,
    globalNumber: 58,
    topic: 'Leibniz Notation',
    question: 'The derivative $\\frac{dy}{dx}$ represents:',
    math: '\\frac{dy}{dx}',
    options: [
      {
        id: 'A',
        text: 'Change in $y$ with respect to $x$',
        misconception: '',
      },
      {
        id: 'B',
        text: 'Change in $x$ with respect to $y$',
        misconception: 'That is the reciprocal derivative $\\frac{dx}{dy}$, not $\\frac{dy}{dx}$.',
      },
      {
        id: 'C',
        text: 'Product of $x$ and $y$',
        misconception: '$\\frac{dy}{dx}$ denotes a rate of change (limit of $\\Delta y / \\Delta x$), not multiplication.',
      },
      {
        id: 'D',
        text: 'Quotient of $d$ and $x$',
        misconception: 'In Leibniz notation, $d$ is a differential operator symbol, not an algebraic variable that cancels.',
      },
    ],
    correctId: 'A',
    explanation:
      'Leibniz notation $\\frac{dy}{dx} = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}$ represents the instantaneous rate of change of $y$ with respect to $x$.',
  },
  {
    id: 'mids-ch03-q18',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 18,
    globalNumber: 59,
    topic: 'Related Rates',
    question: 'If the radius $r$ of a circle changes with time $t$, then the rate of change of its area $A = \\pi r^2$ with respect to time is:',
    math: 'A = \\pi r^2 \\implies \\frac{dA}{dt} = ?',
    options: [
      {
        id: 'A',
        text: '$\\frac{dA}{dt} = \\pi \\frac{dr}{dt}$',
        misconception: 'Forgetting to apply the Power Rule to $r^2$ ($\\frac{d}{dr}(r^2) = 2r$).',
      },
      {
        id: 'B',
        text: '$\\frac{dA}{dt} = 2\\pi r$',
        misconception: 'Differentiating with respect to $r$ ($\\frac{dA}{dr}$) and omitting the Chain Rule factor $\\frac{dr}{dt}$.',
      },
      {
        id: 'C',
        text: '$\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt}$',
        misconception: '',
      },
      {
        id: 'D',
        text: '$\\frac{dA}{dt} = \\pi r^2 \\frac{dr}{dt}$',
        misconception: 'Multiplying the undifferentiated area formula by $\\frac{dr}{dt}$ instead of differentiating $r^2$.',
      },
    ],
    correctId: 'C',
    explanation:
      'Differentiating both sides of $A = \\pi r^2$ with respect to time $t$ via the Chain Rule gives $\\frac{dA}{dt} = \\frac{d}{dr}(\\pi r^2) \\cdot \\frac{dr}{dt} = 2\\pi r \\frac{dr}{dt}$.',
  },
  {
    id: 'mids-ch03-q19',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 19,
    globalNumber: 60,
    topic: 'Trigonometric Derivatives',
    question: 'The derivative of $\\cot x$ is:',
    math: '\\frac{d}{dx}(\\cot x)',
    options: [
      {
        id: 'A',
        text: '$\\csc^2 x$',
        misconception: 'Missing the negative sign; cofunctions ($\\cos x, \\cot x, \\csc x$) have negative derivatives.',
      },
      {
        id: 'B',
        text: '$-\\csc^2 x$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$\\sec^2 x$',
        misconception: '$\\sec^2 x$ is the derivative of $\\tan x$, not $\\cot x$.',
      },
      {
        id: 'D',
        text: '$-\\sec^2 x$',
        misconception: 'Using $\\sec^2 x$ instead of $\\csc^2 x$ for the reciprocal trig function.',
      },
    ],
    correctId: 'B',
    explanation:
      'Writing $\\cot x = \\frac{\\cos x}{\\sin x}$ and applying the Quotient Rule gives $\\frac{-\\sin^2 x - \\cos^2 x}{\\sin^2 x} = -\\frac{1}{\\sin^2 x} = -\\csc^2 x$.',
  },
  {
    id: 'mids-ch03-q20',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 20,
    globalNumber: 61,
    topic: 'Chain Rule with Trig',
    question: 'If $y = \\sin(4x)$, then $y\'$ is:',
    math: 'y = \\sin(4x)',
    options: [
      {
        id: 'A',
        text: '$y\' = \\cos(4x)$',
        misconception: 'Forgetting to multiply by the derivative of the inner expression $4x$.',
      },
      {
        id: 'B',
        text: '$y\' = 4\\sin(4x)$',
        misconception: 'Applying the Chain Rule factor $4$ while forgetting to differentiate $\\sin$ into $\\cos$.',
      },
      {
        id: 'C',
        text: '$y\' = 4\\cos(4x)$',
        misconception: '',
      },
      {
        id: 'D',
        text: '$y\' = -4\\cos(4x)$',
        misconception: 'Adding a negative sign; $\\frac{d}{du}(\\sin u) = +\\cos u$.',
      },
    ],
    correctId: 'C',
    explanation:
      'By the Chain Rule, $\\frac{d}{dx}[\\sin(4x)] = \\cos(4x) \\cdot \\frac{d}{dx}(4x) = 4\\cos(4x)$.',
  },
  {
    id: 'mids-ch03-q21',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 21,
    globalNumber: 62,
    topic: 'Chain Rule with Trig',
    question: 'If $y = \\cos(x^2)$, then $y\'$ is:',
    math: 'y = \\cos(x^2)',
    options: [
      {
        id: 'A',
        text: '$y\' = -\\sin(x^2)$',
        misconception: 'Forgetting to multiply by the inner derivative $\\frac{d}{dx}(x^2) = 2x$.',
      },
      {
        id: 'B',
        text: '$y\' = -2x\\sin(x^2)$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$y\' = 2x\\cos(x^2)$',
        misconception: 'Keeping $\\cos$ unchanged instead of differentiating $\\cos(u)$ to $-\\sin(u)$.',
      },
      {
        id: 'D',
        text: '$y\' = 2x\\sin(x^2)$',
        misconception: 'Omitting the negative sign from $\\frac{d}{du}(\\cos u) = -\\sin u$.',
      },
    ],
    correctId: 'B',
    explanation:
      'By the Chain Rule, $\\frac{d}{dx}[\\cos(x^2)] = -\\sin(x^2) \\cdot \\frac{d}{dx}(x^2) = -2x\\sin(x^2)$.',
  },
  {
    id: 'mids-ch03-q22',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 22,
    globalNumber: 63,
    topic: 'Trigonometric Derivatives',
    question: 'The derivative of $\\sec x$ is:',
    math: '\\frac{d}{dx}(\\sec x)',
    options: [
      {
        id: 'A',
        text: '$\\sec x \\tan x$',
        misconception: '',
      },
      {
        id: 'B',
        text: '$\\sec^2 x$',
        misconception: '$\\sec^2 x$ is the derivative of $\\tan x$, not $\\sec x$.',
      },
      {
        id: 'C',
        text: '$-\\csc x \\cot x$',
        misconception: '$-\\csc x \\cot x$ is the derivative of $\\csc x$, not $\\sec x$.',
      },
      {
        id: 'D',
        text: '$\\tan x$',
        misconception: 'The derivative of $\\sec x$ includes the factor $\\sec x$ as well as $\\tan x$.',
      },
    ],
    correctId: 'A',
    explanation:
      'Writing $\\sec x = (\\cos x)^{-1}$ and using the Chain Rule gives $-(\\cos x)^{-2}(-\\sin x) = \\frac{1}{\\cos x} \\cdot \\frac{\\sin x}{\\cos x} = \\sec x \\tan x$.',
  },
  {
    id: 'mids-ch03-q23',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 23,
    globalNumber: 64,
    topic: 'Implicit Differentiation',
    question: 'If $x^2 + y^2 = 25$, then implicit differentiation gives:',
    math: 'x^2 + y^2 = 25',
    options: [
      {
        id: 'A',
        text: '$\\frac{dy}{dx} = \\frac{x}{y}$',
        misconception: 'Sign error when moving $2x$ to the right-hand side of $2x + 2y\\frac{dy}{dx} = 0$.',
      },
      {
        id: 'B',
        text: '$\\frac{dy}{dx} = -\\frac{x}{y}$',
        misconception: '',
      },
      {
        id: 'C',
        text: '$\\frac{dy}{dx} = \\frac{y}{x}$',
        misconception: 'Inverting the fraction and dropping the negative sign when solving for $\\frac{dy}{dx}$.',
      },
      {
        id: 'D',
        text: '$\\frac{dy}{dx} = -\\frac{y}{x}$',
        misconception: 'Dividing by $2x$ instead of $2y$ when isolating $\\frac{dy}{dx}$.',
      },
    ],
    correctId: 'B',
    explanation:
      'Differentiating both sides of $x^2 + y^2 = 25$ with respect to $x$ yields $2x + 2y\\frac{dy}{dx} = 0 \\implies 2y\\frac{dy}{dx} = -2x \\implies \\frac{dy}{dx} = -\\frac{x}{y}$ (for $y \\neq 0$).',
  },
  {
    id: 'mids-ch03-q24',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    questionNumber: 24,
    globalNumber: 65,
    topic: 'Motion & Velocity',
    question: 'If $s(t)$ represents position along a coordinate line at time $t$, then $s\'(t)$ represents:',
    math: 'v(t) = s\'(t) = \\frac{ds}{dt}',
    options: [
      {
        id: 'A',
        text: 'Acceleration',
        misconception: 'Acceleration is the second derivative $s\'\'(t) = v\'(t)$, not the first derivative.',
      },
      {
        id: 'B',
        text: 'Velocity',
        misconception: '',
      },
      {
        id: 'C',
        text: 'Distance only',
        misconception: 'Position $s(t)$ gives displacement from the origin, whereas $s\'(t)$ measures the instantaneous rate of change of position (velocity).',
      },
      {
        id: 'D',
        text: 'Time',
        misconception: '$t$ is the independent variable, not the derivative $s\'(t)$.',
      },
    ],
    correctId: 'B',
    explanation:
      'The first derivative of position with respect to time, $s\'(t) = \\frac{ds}{dt}$, is the instantaneous velocity $v(t)$.',
  },
];
