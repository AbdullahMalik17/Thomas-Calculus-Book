// lib/content/mids-definitions-data.ts
/**
 * Structured Midterm Blocks, Definitions, Theorems, Rules & Tests (Chapters 1 - 3)
 * Designed for both foundational learners and advanced exam preparation.
 * Paraphrased from Thomas' Calculus (14th Edition) with strict section identifiers.
 * Authored by: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

export type BlockKind =
  | 'DEFINITION'
  | 'DEFINITIONS'
  | 'THEOREM'
  | 'TEST'
  | 'RULE'
  | 'RULES'
  | 'METHOD'
  | 'STRATEGY';

export type DifficultyTag = 'Core Foundation' | 'Midterm Favorite' | 'High-Yield Trap';

export type DiagramId =
  | 'vertical-line'
  | 'even-odd'
  | 'secant-tangent'
  | 'squeeze'
  | 'epsilon-delta'
  | 'discontinuities'
  | 'ivt'
  | 'derivative-failures'
  | 'linearization';

export interface MidtermBlock {
  id: string;
  chapter: 1 | 2 | 3;
  chapterTitle: string;
  section: string;
  sectionTitle: string;
  sectionHref: string;
  kind: BlockKind;
  blockLabel: string;
  title: string;
  bookRef: string;
  difficultyTag: DifficultyTag;
  formalIntro: string;
  formalFormula?: string;
  formalConditions?: { label: string; text: string }[];
  formalOutro?: string;
  weakIntuition: {
    headline: string;
    explanation: string;
    everydayAnalogy: string;
  };
  quickExample: {
    prompt: string;
    steps: string[];
    takeaway: string;
  };
  strongDive: {
    whyItMatters: string;
    edgeCases: string[];
    midtermTraps: string[];
    proTip: string;
  };
  diagramId?: DiagramId;
  keywords: string[];
}

export interface MidsDefChapterMeta {
  chapter: 1 | 2 | 3;
  title: string;
  shortTitle: string;
  sectionsRange: string;
  summary: string;
  sections: { number: string; title: string }[];
}

export const MIDS_DEF_CHAPTERS: MidsDefChapterMeta[] = [
  {
    chapter: 1,
    title: 'Chapter 1: Functions',
    shortTitle: 'Ch 1: Functions',
    sectionsRange: 'Sections 1.1 – 1.3',
    summary:
      'What makes a rule a function, natural domains, symmetry (even/odd), function combinations, graph shifts, and radians.',
    sections: [
      { number: '1.1', title: 'Functions and Their Graphs' },
      { number: '1.2', title: 'Combining Functions; Shifting & Scaling' },
      { number: '1.3', title: 'Trigonometric Functions' },
    ],
  },
  {
    chapter: 2,
    title: 'Chapter 2: Limits & Continuity',
    shortTitle: 'Ch 2: Limits & Continuity',
    sectionsRange: 'Sections 2.1 – 2.6',
    summary:
      'Average vs. instantaneous change, limit laws, Sandwich Theorem, epsilon-delta precision, one-sided limits, continuity, IVT, and asymptotes.',
    sections: [
      { number: '2.1', title: 'Rates of Change and Tangents' },
      { number: '2.2', title: 'Limit of a Function & Limit Laws' },
      { number: '2.3', title: 'The Precise Definition of a Limit' },
      { number: '2.4', title: 'One-Sided Limits' },
      { number: '2.5', title: 'Continuity' },
      { number: '2.6', title: 'Limits Involving Infinity; Asymptotes' },
    ],
  },
  {
    chapter: 3,
    title: 'Chapter 3: Derivatives',
    shortTitle: 'Ch 3: Derivatives',
    sectionsRange: 'Sections 3.1 – 3.9',
    summary:
      'Derivative as a limit and function, differentiability vs. continuity, differentiation rules, trig derivatives, Chain Rule, implicit, related rates, and linearization.',
    sections: [
      { number: '3.1', title: 'Tangents & Derivative at a Point' },
      { number: '3.2', title: 'The Derivative as a Function' },
      { number: '3.3', title: 'Differentiation Rules' },
      { number: '3.4', title: 'The Derivative as a Rate of Change' },
      { number: '3.5', title: 'Derivatives of Trigonometric Functions' },
      { number: '3.6', title: 'The Chain Rule' },
      { number: '3.7', title: 'Implicit Differentiation' },
      { number: '3.8', title: 'Related Rates' },
      { number: '3.9', title: 'Linearization and Differentials' },
    ],
  },
];

export const MIDS_DEFINITION_BLOCKS: MidtermBlock[] = [
  // =========================================================================
  // CHAPTER 1: FUNCTIONS (9 Blocks)
  // =========================================================================
  {
    id: 'ch01-function-domain-range',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    section: '1.1',
    sectionTitle: 'Functions and Their Graphs',
    sectionHref: '/chapters/ch01/1.1-functions-and-graphs',
    kind: 'DEFINITION',
    blockLabel: 'DEFINITION',
    title: 'Function, Domain, and Range',
    bookRef: "Thomas' Calculus 14e · Section 1.1",
    difficultyTag: 'Core Foundation',
    formalIntro:
      'A function $f$ from a set $D$ of real numbers to a set $Y$ is a rule that pairs each input $x \\in D$ with one unique output $f(x) \\in Y$.',
    formalConditions: [
      { label: 'Domain ($D$):', text: 'The complete set of allowed input values $x$ for which the rule works.' },
      { label: 'Range:', text: 'The set of all actual output values $f(x)$ produced as $x$ varies over $D$.' },
    ],
    formalOutro: 'When only a formula is given, the natural domain is the largest set of real numbers yielding real outputs.',
    weakIntuition: {
      headline: 'One input goes in, strictly ONE output comes out.',
      explanation:
        'Think of $x$ as the button you press and $f(x)$ as the single result you get back. Two different inputs can share the same output (like $(-2)^2 = 4$ and $2^2 = 4$), which is totally fine. What is forbidden is pressing ONE input button and getting two different answers.',
      everydayAnalogy:
        'A vending machine: pressing B4 must drop one predictable snack, never chips on Monday and soda on Tuesday for the exact same button.',
    },
    quickExample: {
      prompt: 'Find the natural domain and range of $f(x) = \\sqrt{x - 3}$.',
      steps: [
        'For a square root to give a real number, the inside cannot be negative: $x - 3 \\ge 0$.',
        'Solve for $x$: $x \\ge 3$, so the domain is $[3, \\infty)$.',
        'A principal square root $\\sqrt{\\cdot}$ is always $\\ge 0$, so the range is $[0, \\infty)$.',
      ],
      takeaway: 'Never divide by $0$, never put a negative inside an even root, and never put $\\le 0$ inside $\\ln(\\cdot)$.',
    },
    strongDive: {
      whyItMatters:
        'Uniqueness makes limits, derivatives, and inverse functions well-defined. Without a single output per input, slope at $x$ would be ambiguous.',
      edgeCases: [
        'Two different formulas with different domains are DIFFERENT functions: $g(x) = \\frac{x^2 - 1}{x - 1}$ has domain $\\mathbb{R} \\setminus \\{1\\}$, whereas $h(x) = x + 1$ has domain $\\mathbb{R}$.',
        'Odd roots like $\\sqrt[3]{x}$ accept negative numbers, so their natural domain is $(-\\infty, \\infty)$.',
      ],
      midtermTraps: [
        'Trap: Simplifying $\\frac{x^2-9}{x-3}$ to $x+3$ BEFORE checking the domain. You must keep $x \\neq 3$ excluded!',
        'Trap: Writing $\\sqrt{x^2} = x$. Actually $\\sqrt{x^2} = |x|$, because $\\sqrt{(-5)^2} = \\sqrt{25} = 5 = |-5|$.',
      ],
      proTip: 'Always find the natural domain on the ORIGINAL unsimplified expression first.',
    },
    keywords: ['function', 'domain', 'range', 'input', 'output', 'natural domain', 'square root'],
  },
  {
    id: 'ch01-vertical-line-test',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    section: '1.1',
    sectionTitle: 'Functions and Their Graphs',
    sectionHref: '/chapters/ch01/1.1-functions-and-graphs',
    kind: 'TEST',
    blockLabel: 'VERTICAL LINE TEST',
    title: 'The Vertical Line Test for Functions',
    bookRef: "Thomas' Calculus 14e · Section 1.1",
    difficultyTag: 'Core Foundation',
    formalIntro:
      'A curve plotted in the $xy$-plane is the graph of a function of $x$ if and only if every vertical line $x = a$ intersects the curve at most once.',
    formalOutro: 'If any vertical line crosses the curve two or more times, the curve fails to represent a single function $y = f(x)$.',
    weakIntuition: {
      headline: 'Drop a straight vertical pencil across the graph — it can only touch once.',
      explanation:
        'A vertical line fixes a single $x$-value. If that vertical line hits the curve at two heights $y_1$ and $y_2$, then one $x$ has two different $y$ outputs, breaking the rule of a function.',
      everydayAnalogy:
        'At 2:00 PM ($x = 2$), a thermometer in one room can only read one temperature — not both $20^\\circ$ and $30^\\circ$ at the same instant.',
    },
    quickExample: {
      prompt: 'Does the circle $x^2 + y^2 = 9$ define $y$ as a function of $x$?',
      steps: [
        'Test $x = 0$ (the $y$-axis): $0^2 + y^2 = 9 \\implies y = 3$ and $y = -3$.',
        'The vertical line $x = 0$ hits the circle twice at $(0, 3)$ and $(0, -3)$.',
        'Therefore, the full circle is NOT a function (though the upper half $y = \\sqrt{9 - x^2}$ IS a function).',
      ],
      takeaway: 'Any curve that loops back over itself (circles, sideways parabolas $x = y^2$) fails the Vertical Line Test.',
    },
    strongDive: {
      whyItMatters:
        'Algebraic equations like $x^2 + y^2 = 9$ or $y^3 - xy = 1$ define curves implicitly; the Vertical Line Test tells us whether the curve is globally a function or must be split into branches (which motivates Implicit Differentiation in §3.7).',
      edgeCases: [
        'A vertical line hitting a graph at 0 points is fine — that simply means $a$ is outside the domain.',
        'At a piecewise boundary, one solid dot and one open circle at the same $x$ PASSES the test because the line touches only the solid dot.',
      ],
      midtermTraps: [
        'Confusing the Vertical Line Test (checks if a graph is a FUNCTION) with the Horizontal Line Test (checks if a function is ONE-TO-ONE / invertible).',
      ],
      proTip: 'Vertical = Valid function? Horizontal = Has an inverse?',
    },
    diagramId: 'vertical-line',
    keywords: ['vertical line test', 'graph', 'circle', 'one output', 'relation'],
  },
  {
    id: 'ch01-piecewise-absolute-floor',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    section: '1.1',
    sectionTitle: 'Functions and Their Graphs',
    sectionHref: '/chapters/ch01/1.1-functions-and-graphs',
    kind: 'DEFINITION',
    blockLabel: 'DEFINITION',
    title: 'Piecewise, Absolute Value, and Greatest Integer Functions',
    bookRef: "Thomas' Calculus 14e · Section 1.1",
    difficultyTag: 'Midterm Favorite',
    formalIntro:
      'A piecewise function uses different formulas on disjoint intervals of its domain. The two standard benchmark examples are:',
    formalFormula:
      '|x| = \\begin{cases} x, & x \\ge 0 \\\\ -x, & x < 0 \\end{cases} \\qquad \\text{and} \\qquad \\lfloor x \\rfloor = \\text{greatest integer } \\le x',
    weakIntuition: {
      headline: 'Different rules apply depending on which neighborhood $x$ lives in.',
      explanation:
        'The absolute value $|x|$ measures distance from $0$ (always $\\ge 0$). If $x$ is already $\\ge 0$, leave it alone; if $x$ is negative, put a minus sign in front to flip it positive! Meanwhile, $\\lfloor x \\rfloor$ ("floor") always rounds DOWN to the nearest integer to the left on the number line.',
      everydayAnalogy:
        'Tax brackets or shipping rates: packages under 1 kg cost \$5, packages from 1 to 5 kg cost \$12 — one rule, split by weight intervals.',
    },
    quickExample: {
      prompt: 'Evaluate $|-7|$, $\\lfloor 3.8 \\rfloor$, and $\\lfloor -1.4 \\rfloor$.',
      steps: [
        'Since $-7 < 0$, $|-7| = -(-7) = 7$.',
        'The largest integer $\\le 3.8$ is $3$, so $\\lfloor 3.8 \\rfloor = 3$.',
        'On the number line, $-1.4$ sits between $-2$ and $-1$; the integer to its LEFT is $-2$, so $\\lfloor -1.4 \\rfloor = -2$.',
      ],
      takeaway: 'To work with $|x - a|$ in limits or derivatives, rewrite it as a two-piece formula splitting at $x = a$.',
    },
    strongDive: {
      whyItMatters:
        'Piecewise functions, $|x|$, and $\\lfloor x \\rfloor$ are the primary testbed in Chapters 2 and 3 for one-sided limits, jump discontinuities, and sharp corners where derivatives fail.',
      edgeCases: [
        'For any integer $n$, $\\lfloor n \\rfloor = n$, and the graph jumps at every integer.',
        'Triangle Inequality: $|a + b| \\le |a| + |b|$ and reverse $|a - b| \\ge ||a| - |b||$ appear in $\\varepsilon$-$\\delta$ proofs.',
      ],
      midtermTraps: [
        'Trap: Saying $\\lfloor -1.4 \\rfloor = -1$. Rounding toward zero is WRONG — floor always goes LEFT (more negative), giving $-2$.',
        'Trap: Thinking $-x$ is always negative! If $x = -3$, then $-x = +3$.',
      ],
      proTip: 'Whenever you see $|\\text{expr}|$ inside a limit as $x \\to c$, immediately check the sign of $\\text{expr}$ on the left ($c^-$) and right ($c^+$).',
    },
    keywords: ['piecewise', 'absolute value', 'floor', 'greatest integer', 'distance'],
  },
  {
    id: 'ch01-increasing-decreasing',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    section: '1.1',
    sectionTitle: 'Functions and Their Graphs',
    sectionHref: '/chapters/ch01/1.1-functions-and-graphs',
    kind: 'DEFINITIONS',
    blockLabel: 'DEFINITIONS',
    title: 'Increasing and Decreasing Functions',
    bookRef: "Thomas' Calculus 14e · Section 1.1",
    difficultyTag: 'Core Foundation',
    formalIntro: 'Let $f$ be a function defined on an interval $I$, and let $x_1$ and $x_2$ be any two points in $I$.',
    formalConditions: [
      { label: 'Increasing on $I$:', text: 'Whenever $x_1 < x_2$, we have $f(x_1) < f(x_2)$.' },
      { label: 'Decreasing on $I$:', text: 'Whenever $x_1 < x_2$, we have $f(x_1) > f(x_2)$.' },
    ],
    formalOutro: 'These definitions apply across entire intervals $I$, not at isolated points.',
    weakIntuition: {
      headline: 'Read the graph left to right: going uphill is increasing, going downhill is decreasing.',
      explanation:
        'As $x$ moves rightward ($x_1 < x_2$), if the $y$-height goes up ($f(x_1) < f(x_2)$), the function is increasing. If the $y$-height drops ($f(x_1) > f(x_2)$), it is decreasing.',
      everydayAnalogy:
        'Walking along a mountain trail from West to East: climbing up = increasing, descending = decreasing.',
    },
    quickExample: {
      prompt: 'Describe where $f(x) = x^2$ is decreasing and where it is increasing.',
      steps: [
        'For $x < 0$, e.g. $-3 < -1$, we have $f(-3) = 9 > 1 = f(-1)$, so $f$ is decreasing on $(-\\infty, 0]$.',
        'For $x > 0$, e.g. $1 < 3$, we have $f(1) = 1 < 9 = f(3)$, so $f$ is increasing on $[0, \\infty)$.',
      ],
      takeaway: 'Always state increasing/decreasing behavior using $x$-intervals, never $y$-values.',
    },
    strongDive: {
      whyItMatters:
        'Increasing/decreasing behavior is the bridge to monotonicity, one-to-one functions, and later the First Derivative Sign Test ($f\'(x) > 0 \\implies$ increasing).',
      edgeCases: [
        'A function can be strictly increasing even if its derivative hits $0$ at a single point, such as $f(x) = x^3$ at $x = 0$.',
      ],
      midtermTraps: [
        'Trap: Saying $f(x) = 1/x$ is decreasing on $(-\\infty, 0) \\cup (0, \\infty)$. FALSE! Compare $x_1 = -1 < x_2 = 1$: $f(-1) = -1 < 1 = f(1)$. You must say it decreases on $(-\\infty, 0)$ AND separately on $(0, \\infty)$.',
      ],
      proTip: 'Never join two intervals separated by an asymptote with $\\cup$ when describing increasing/decreasing intervals; separate them with a comma or "and".',
    },
    keywords: ['increasing', 'decreasing', 'interval', 'monotonic'],
  },
  {
    id: 'ch01-even-odd',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    section: '1.1',
    sectionTitle: 'Functions and Their Graphs',
    sectionHref: '/chapters/ch01/1.1-functions-and-graphs',
    kind: 'DEFINITIONS',
    blockLabel: 'DEFINITIONS',
    title: 'Even and Odd Functions (Symmetry)',
    bookRef: "Thomas' Calculus 14e · Section 1.1",
    difficultyTag: 'Midterm Favorite',
    formalIntro: 'A function $y = f(x)$ is called an',
    formalConditions: [
      { label: 'even function of $x$', text: 'if $f(-x) = f(x)$, ($y$-axis mirror symmetry)' },
      { label: 'odd function of $x$', text: 'if $f(-x) = -f(x)$, ($180^\\circ$ origin symmetry)' },
    ],
    formalOutro: 'for every $x$ in the function\'s domain.',
    weakIntuition: {
      headline: 'Plug in $-x$: if the minus vanishes it is EVEN; if the minus pops out front it is ODD.',
      explanation:
        'Testing symmetry is just a 1-step algebra check: replace every $x$ with $(-x)$ and simplify. If you get the exact original formula back, it is Even (left half mirrors right half across the $y$-axis). If you get $-1$ times the original formula, it is Odd (rotating the graph $180^\\circ$ around $(0,0)$ lands back on itself). Most functions are NEITHER!',
      everydayAnalogy:
        'Even = folding a butterfly symmetrically across the vertical spine ($y$-axis). Odd = spinning a two-blade propeller $180^\\circ$ around its center pin $(0,0)$.',
    },
    quickExample: {
      prompt: 'Classify $f(x) = x^3 - 4x$ and $g(x) = x^2 + x$.',
      steps: [
        'For $f$: $f(-x) = (-x)^3 - 4(-x) = -x^3 + 4x = -(x^3 - 4x) = -f(x)$. So $f$ is ODD.',
        'For $g$: $g(-x) = (-x)^2 + (-x) = x^2 - x$. This equals neither $g(x)$ nor $-g(x)$, so $g$ is NEITHER.',
      ],
      takeaway: 'Powers of $x$: only even powers ($x^4, x^2, c$) give even functions; only odd powers ($x^5, x^3, x$) give odd functions; mixing both gives neither.',
    },
    strongDive: {
      whyItMatters:
        'Notice the final phrase in the textbook block: "for every $x$ in the function\'s domain." That forces the domain itself to be symmetric around $0$ (if $x \\in D$, then $-x \\in D$).',
      edgeCases: [
        '$f(x) = \\sqrt{x}$ is NEITHER even nor odd because for $x = 4$, $-x = -4$ is not even in the domain.',
        '$f(x) = 0$ (on a symmetric domain) is the ONLY function that is BOTH even and odd simultaneously.',
        'If an odd function is defined at $x = 0$, then $f(0) = f(-0) = -f(0) \\implies f(0) = 0$ automatically!',
      ],
      midtermTraps: [
        'Trap: Assuming a function that isn\'t even must be odd. Most functions (like $x^2 + x$ or $e^x$) are NEITHER.',
        'Trap: Product rules — $(\\text{odd}) \\times (\\text{odd}) = \\text{even}$ (e.g. $x \\sin x$ is EVEN!), whereas $(\\text{even}) \\times (\\text{odd}) = \\text{odd}$.',
      ],
      proTip: 'Memorize the Big Trig Pair: $\\cos x$ and $\\sec x$ are EVEN; $\\sin x, \\tan x, \\csc x, \\cot x$ are all ODD.',
    },
    diagramId: 'even-odd',
    keywords: ['even', 'odd', 'symmetry', 'y-axis', 'origin', 'f(-x)'],
  },
  {
    id: 'ch01-composite-functions',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    section: '1.2',
    sectionTitle: 'Combining Functions; Shifting & Scaling',
    sectionHref: '/chapters/ch01/1.2-combining-functions-shifting-scaling',
    kind: 'DEFINITION',
    blockLabel: 'DEFINITION',
    title: 'Algebraic Combinations & Composite Functions',
    bookRef: "Thomas' Calculus 14e · Section 1.2",
    difficultyTag: 'Midterm Favorite',
    formalIntro:
      'If $f$ and $g$ are functions, their composite $f \\circ g$ ("$f$ of $g$") is the function defined by:',
    formalFormula: '(f \\circ g)(x) = f(g(x))',
    formalOutro:
      'The domain of $f \\circ g$ consists of all $x$ in the domain of $g$ for which $g(x)$ also lies in the domain of $f$.',
    weakIntuition: {
      headline: 'Hook two function machines in a row: $g$ runs FIRST, then $f$ acts on $g$\'s output.',
      explanation:
        'Work from the INSIDE out. In $f(g(x))$, plug $x$ into the inner function $g$ first, take that answer, and feed it into the outer function $f$. For arithmetic combos ($f+g$, $fg$, $f/g$), $x$ just has to work in BOTH functions (and $g(x) \\neq 0$ for division).',
      everydayAnalogy:
        'Putting on socks ($g$) then shoes ($f$): order matters! $f(g(x))$ (socks then shoes) is completely different from $g(f(x))$ (shoes then socks).',
    },
    quickExample: {
      prompt: 'Let $f(x) = \\sqrt{x}$ and $g(x) = x - 2$. Find $(f \\circ g)(x)$ and its domain.',
      steps: [
        'Substitute $g(x)$ into $f$: $(f \\circ g)(x) = f(x - 2) = \\sqrt{x - 2}$.',
        'Domain check: $D(g) = \\mathbb{R}$, and $g(x) = x - 2$ must be in $D(f) = [0, \\infty)$.',
        'So $x - 2 \\ge 0 \\implies x \\ge 2$, giving domain $[2, \\infty)$.',
      ],
      takeaway: 'Always intersect $D(g)$ with the condition that $g(x) \\in D(f)$.',
    },
    strongDive: {
      whyItMatters:
        'Decomposing nested expressions into outer $f$ and inner $g$ is the exact skill needed for the Chain Rule (§3.6) and Continuity of Compositions (Theorem 9, §2.5).',
      edgeCases: [
        'If $f(x) = x^2$ and $g(x) = \\sqrt{x}$, then $(f \\circ g)(x) = (\\sqrt{x})^2 = x$, but its domain is $[0, \\infty)$, NOT $(-\\infty, \\infty)$, because $g(x) = \\sqrt{x}$ rejects negative $x$ before $f$ ever runs.',
      ],
      midtermTraps: [
        'Trap: Assuming $f \\circ g = g \\circ f$. Composition is almost never commutative.',
        'Trap: Confusing $(f \\circ g)(x) = f(g(x))$ with the product $(fg)(x) = f(x) \\cdot g(x)$.',
      ],
      proTip: 'Write down the two restrictions BEFORE simplifying $(f \\circ g)(x)$: (1) $x \\in D(g)$ AND (2) $g(x) \\in D(f)$.',
    },
    keywords: ['composite', 'composition', 'domain', 'f(g(x))', 'quotient'],
  },
  {
    id: 'ch01-shifting-scaling',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    section: '1.2',
    sectionTitle: 'Combining Functions; Shifting & Scaling',
    sectionHref: '/chapters/ch01/1.2-combining-functions-shifting-scaling',
    kind: 'RULES',
    blockLabel: 'GRAPHING RULES',
    title: 'Shifting, Scaling, and Reflecting Graphs',
    bookRef: "Thomas' Calculus 14e · Section 1.2",
    difficultyTag: 'High-Yield Trap',
    formalIntro: 'For constants $h, k > 0$ and $c > 1$, transformations of $y = f(x)$ act as follows:',
    formalConditions: [
      { label: 'Vertical Shift:', text: '$y = f(x) + k$ shifts up $k$; $y = f(x) - k$ shifts down $k$.' },
      { label: 'Horizontal Shift:', text: '$y = f(x - h)$ shifts RIGHT $h$; $y = f(x + h)$ shifts LEFT $h$.' },
      { label: 'Scaling:', text: '$y = c f(x)$ stretches vertically by $c$; $y = f(cx)$ compresses horizontally by factor $1/c$.' },
      { label: 'Reflections:', text: '$y = -f(x)$ flips across the $x$-axis; $y = f(-x)$ flips across the $y$-axis.' },
    ],
    weakIntuition: {
      headline: 'Outside changes affect $y$ honestly; inside changes affect $x$ BACKWARDS!',
      explanation:
        'Changes OUTSIDE $f(\\dots)$ act on $y$ just as you expect ($+2$ moves up, $\\times 3$ stretches 3x taller). Changes INSIDE $f(\\dots)$ act on $x$ in reverse ($x - 3$ moves RIGHT, $2x$ squeezes 2x narrower).',
      everydayAnalogy:
        'Setting a clock ahead by $+1$ hour makes events happen $1$ hour earlier (left on the timeline), because $x + 1 = \\text{target}$ happens sooner!',
    },
    quickExample: {
      prompt: 'Describe how $y = -2(x - 3)^2 + 5$ transforms $y = x^2$.',
      steps: [
        'Inside $(x - 3)$: shift RIGHT $3$ units.',
        'Outside factor $2$: vertical stretch by $2$.',
        'Outside minus sign: reflect across the $x$-axis (opens downward).',
        'Outside $+5$: shift UP $5$ units (vertex is $(3, 5)$).',
      ],
      takeaway: 'Find horizontal shift by asking: "What $x$ makes the inside equal zero?"',
    },
    strongDive: {
      whyItMatters:
        'Quickly sketching shifted/scaled parent graphs lets you spot asymptotes, symmetry, and ranges in seconds without plotting points.',
      edgeCases: [
        'When both horizontal scaling and shifting appear together, factor the coefficient of $x$: $f(2x - 6) = f(2(x - 3))$, so the shift is $3$ units right, NOT $6$!',
      ],
      midtermTraps: [
        'Trap: Thinking $f(x - 4)$ shifts left or $f(3x)$ stretches horizontally by $3$. Both are backwards: $f(x-4)$ goes RIGHT $4$, and $f(3x)$ COMPRESSES horizontally to $1/3$ width.',
      ],
      proTip: 'Always factor out $b$ inside $f(bx - d) = f(b(x - d/b))$ before reading off the horizontal shift!',
    },
    keywords: ['shift', 'scale', 'reflect', 'translation', 'compression', 'stretch'],
  },
  {
    id: 'ch01-radian-trig',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    section: '1.3',
    sectionTitle: 'Trigonometric Functions',
    sectionHref: '/chapters/ch01/1.3-trigonometric-functions',
    kind: 'DEFINITIONS',
    blockLabel: 'DEFINITIONS',
    title: 'Radian Measure and Unit Circle Trig Functions',
    bookRef: "Thomas' Calculus 14e · Section 1.3",
    difficultyTag: 'Core Foundation',
    formalIntro:
      'In calculus, angles are measured in radians: a central angle $\\theta = s/r$ subtends arc length $s$ on a circle of radius $r$ ($\\pi\\text{ rad} = 180^\\circ$). If $P(x, y)$ lies on the unit circle $x^2 + y^2 = 1$ at angle $\\theta$:',
    formalFormula:
      '\\cos\\theta = x, \\quad \\sin\\theta = y, \\quad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}, \\quad \\sec\\theta = \\frac{1}{\\cos\\theta}',
    formalOutro: 'Key identity: $\\cos^2\\theta + \\sin^2\\theta = 1$, which implies $1 + \\tan^2\\theta = \\sec^2\\theta$.',
    weakIntuition: {
      headline: 'Radians measure angle by the actual distance walked along a circle of radius 1.',
      explanation:
        'A full lap around a unit circle has circumference $2\\pi$, so $360^\\circ = 2\\pi$ radians and $180^\\circ = \\pi$ radians. On the unit circle, $\\cos\\theta$ is simply the horizontal coordinate $x$, and $\\sin\\theta$ is the vertical height $y$.',
      everydayAnalogy:
        'Degrees are an arbitrary 360-slice pie; radians are actual ruler-length along the rim of a radius-1 wheel.',
    },
    quickExample: {
      prompt: 'Convert $60^\\circ$ to radians and find $\\sin(\\pi/3)$ and $\\sec(\\pi/3)$.',
      steps: [
        'Multiply by $\\pi/180^\\circ$: $60^\\circ \\cdot \\frac{\\pi}{180^\\circ} = \\frac{\\pi}{3}$ rad.',
        'At $\\theta = \\pi/3$, unit circle point is $(1/2, \\sqrt{3}/2)$.',
        'So $\\sin(\\pi/3) = \\sqrt{3}/2$, $\\cos(\\pi/3) = 1/2$, and $\\sec(\\pi/3) = \\frac{1}{1/2} = 2$.',
      ],
      takeaway: 'Remember $(\\cos\\theta, \\sin\\theta) = (x, y)$ alphabetically: $c$ comes before $s$, just like $x$ comes before $y$.',
    },
    strongDive: {
      whyItMatters:
        'Every calculus limit and derivative formula ($\\lim_{\\theta\\to 0}\\frac{\\sin\\theta}{\\theta}=1$ and $\\frac{d}{dx}\\sin x = \\cos x$) is ONLY true when $\\theta$ and $x$ are in radians.',
      edgeCases: [
        'Domains: $\\tan x$ and $\\sec x$ are undefined where $\\cos x = 0$, i.e. $x = \\frac{\\pi}{2} + k\\pi$.',
        '$\\cot x$ and $\\csc x$ are undefined where $\\sin x = 0$, i.e. $x = k\\pi$.',
      ],
      midtermTraps: [
        'Trap: Writing $\\frac{\\sin(2x)}{2} = \\sin x$. Never cancel numbers inside a trig function!',
        'Trap: Calculator in Degree mode when checking $\\sin(1)$ or limits!',
      ],
      proTip: 'Double-angle identities $\\sin(2x) = 2\\sin x\\cos x$ and $\\cos(2x) = 1 - 2\\sin^2 x$ solve many Ch 2 trig limits.',
    },
    keywords: ['radian', 'sine', 'cosine', 'tangent', 'unit circle', 'identities'],
  },
  {
    id: 'ch01-periodic-functions',
    chapter: 1,
    chapterTitle: 'Chapter 1: Functions',
    section: '1.3',
    sectionTitle: 'Trigonometric Functions',
    sectionHref: '/chapters/ch01/1.3-trigonometric-functions',
    kind: 'DEFINITION',
    blockLabel: 'DEFINITION',
    title: 'Periodic Functions & Wave Parameters',
    bookRef: "Thomas' Calculus 14e · Section 1.3",
    difficultyTag: 'Core Foundation',
    formalIntro:
      'A function $f$ is periodic if there is a positive number $p$ such that for every $x$ in the domain of $f$:',
    formalFormula: 'f(x + p) = f(x)',
    formalOutro:
      'The smallest such positive number $p$ is called the period of $f$. For $y = A\\sin(B(x - C)) + D$, the period is $T = \\frac{2\\pi}{|B|}$.',
    weakIntuition: {
      headline: 'A graph that copies and pastes itself identically every $p$ units.',
      explanation:
        'Wait $p$ units along the $x$-axis and you are right back to the exact same height. Sine, cosine, secant, and cosecant repeat every $2\\pi$; tangent and cotangent repeat faster, every $\\pi$.',
      everydayAnalogy:
        'A heartbeat on an ECG monitor or the position of a Ferris wheel seat — the exact same cycle repeats over and over.',
    },
    quickExample: {
      prompt: 'Find the amplitude and period of $y = -3\\cos(4x - \\pi) + 1$.',
      steps: [
        'Amplitude is $|-3| = 3$ (always positive!).',
        'Here $B = 4$, so the period is $T = \\frac{2\\pi}{|4|} = \\frac{\\pi}{2}$.',
        'Factor $4(x - \\pi/4)$ to see the phase shift is $\\pi/4$ to the right.',
      ],
      takeaway: 'Period of $\\sin(Bx)$ or $\\cos(Bx)$ is $2\\pi/|B|$; period of $\\tan(Bx)$ is $\\pi/|B|$.',
    },
    strongDive: {
      whyItMatters:
        'Periodicity explains why limits like $\\lim_{x \\to \\infty} \\sin x$ do not exist (they oscillate forever instead of settling down).',
      edgeCases: [
        'A constant function $f(x) = 5$ satisfies $f(x+p) = f(x)$ for every $p > 0$, so it is periodic with NO smallest positive period.',
      ],
      midtermTraps: [
        'Trap: Saying the period of $\\tan(2x)$ is $2\\pi/2 = \\pi$. Because $\\tan x$ already has base period $\\pi$, $\\tan(2x)$ has period $\\pi/2$!',
      ],
      proTip: 'Divide the base period ($2\\pi$ for sin/cos/sec/csc, $\\pi$ for tan/cot) by $|B|$.',
    },
    keywords: ['periodic', 'period', 'amplitude', 'phase shift', 'sinusoid'],
  },

  // =========================================================================
  // CHAPTER 2: LIMITS AND CONTINUITY (13 Blocks)
  // =========================================================================
  {
    id: 'ch02-average-rate-secant',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.1',
    sectionTitle: 'Rates of Change and Tangents',
    sectionHref: '/chapters/ch02/2.1-rates-of-change-and-tangents-to-curves',
    kind: 'DEFINITION',
    blockLabel: 'DEFINITION',
    title: 'Average Rate of Change & Secant Line Slope',
    bookRef: "Thomas' Calculus 14e · Section 2.1",
    difficultyTag: 'Core Foundation',
    formalIntro:
      'The average rate of change of $y = f(x)$ with respect to $x$ over the interval $[x_1, x_2]$ (or $[x_0, x_0 + h]$ with $h \\neq 0$) is:',
    formalFormula:
      '\\frac{\\Delta y}{\\Delta x} = \\frac{f(x_2) - f(x_1)}{x_2 - x_1} = \\frac{f(x_0 + h) - f(x_0)}{h}',
    formalOutro:
      'Geometrically, this equals the slope of the secant line connecting $P(x_0, f(x_0))$ and $Q(x_0 + h, f(x_0 + h))$.',
    weakIntuition: {
      headline: 'Total change in output divided by total change in input — just a regular line slope!',
      explanation:
        'Connect two points on a curve with a straight line (called a secant line) and compute rise over run. As you slide the second point closer and closer to the first ($h \\to 0$), that secant line rotates into the tangent line.',
      everydayAnalogy:
        'Driving 120 km in 2 hours gives an average speed of $60\\text{ km/h}$ — even if your speedometer changed along the way.',
    },
    quickExample: {
      prompt: 'Find the average rate of change of $f(x) = x^2$ over $[1, 3]$.',
      steps: [
        'Compute outputs: $f(1) = 1^2 = 1$ and $f(3) = 3^2 = 9$.',
        'Rise over run: $\\frac{f(3) - f(1)}{3 - 1} = \\frac{9 - 1}{2} = \\frac{8}{2} = 4$.',
      ],
      takeaway: 'Average rate of change uses TWO points (no limits yet); instantaneous rate shrinks $h \\to 0$.',
    },
    strongDive: {
      whyItMatters:
        'The difference quotient $\\frac{f(x_0 + h) - f(x_0)}{h}$ is the exact engine behind the limit definition of the derivative in Chapter 3.',
      edgeCases: [
        'An average rate of change can be $0$ even if the function moved a lot in between (e.g., $\\sin x$ on $[0, 2\\pi]$ has average rate $0$).',
      ],
      midtermTraps: [
        'Trap: Confusing average rate of change on $[a, b]$ (uses $\\frac{f(b)-f(a)}{b-a}$) with instantaneous rate of change at $a$ (uses $f\'(a)$).',
      ],
      proTip: 'Look closely at midterm wording: "average" = secant slope $\\frac{f(b)-f(a)}{b-a}$; "instantaneous" = derivative $f\'(a)$.',
    },
    diagramId: 'secant-tangent',
    keywords: ['average rate of change', 'secant line', 'difference quotient', 'slope', 'tangent'],
  },
  {
    id: 'ch02-informal-limit',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.2',
    sectionTitle: 'Limit of a Function & Limit Laws',
    sectionHref: '/chapters/ch02/2.2-limit-of-a-function-and-limit-laws',
    kind: 'DEFINITION',
    blockLabel: 'INFORMAL DEFINITION',
    title: 'Limit of a Function at a Point',
    bookRef: "Thomas' Calculus 14e · Section 2.2",
    difficultyTag: 'Core Foundation',
    formalIntro:
      'Suppose $f(x)$ is defined on an open interval around $c$, except possibly at $c$ itself. We write:',
    formalFormula: '\\lim_{x \\to c} f(x) = L',
    formalOutro:
      'if we can make the values of $f(x)$ arbitrarily close to the single finite number $L$ by taking $x$ sufficiently close to $c$ (on both sides of $c$), with $x \\neq c$.',
    weakIntuition: {
      headline: 'Where is the road heading as you walk toward $c$ — ignoring what happens AT $c$?',
      explanation:
        'Cover up $x = c$ with your thumb! A limit ONLY asks what height $y$ the curve aims toward as $x$ sneaks closer and closer to $c$ from the left and the right. Whether there is a dot, a missing hole, or a moved dot right at $x = c$ does NOT change the limit at all.',
      everydayAnalogy:
        'If a bridge has a tiny 1-millimeter pothole at milepost 5, two cars approaching milepost 5 from opposite sides are both heading toward the same road elevation $L$, even if the exact spot at $x=5$ is missing.',
    },
    quickExample: {
      prompt: 'Find $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$ even though $x = 2$ gives $0/0$.',
      steps: [
        'Factor the numerator: $\\frac{(x - 2)(x + 2)}{x - 2}$.',
        'Since $x \\to 2$ means $x \\neq 2$, we can cancel $(x - 2)$ to get $x + 2$.',
        'Now let $x \\to 2$: $2 + 2 = 4$. The limit is $4$ (even though $f(2)$ is undefined!).',
      ],
      takeaway: 'Limits care about $x$ NEAR $c$, never $x = c$.',
    },
    strongDive: {
      whyItMatters:
        'Canceling $(x - c)$ inside a limit is legally justified ONLY because the limit operator ignores $x = c$, so $x - c \\neq 0$.',
      edgeCases: [
        'Three classic ways a limit fails to exist: (1) Jump (left $\\neq$ right), (2) Unbounded growth ($\\to \\pm\\infty$), (3) Endless oscillation (like $\\sin(1/x)$ as $x \\to 0$).',
      ],
      midtermTraps: [
        'Trap: Saying $\\lim_{x\\to c} f(x)$ does not exist just because $f(c)$ is undefined or because $f(c) = 99$ differs from the curve height $L$.',
      ],
      proTip: 'On a piecewise graph with an open circle at $(2, 5)$ and a filled dot at $(2, 1)$, the limit at $2$ is $5$ (where the curve points), NOT $1$!',
    },
    keywords: ['limit', 'hole', 'approaches', 'indeterminate', 'does not exist'],
  },
  {
    id: 'ch02-limit-laws',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.2',
    sectionTitle: 'Limit of a Function & Limit Laws',
    sectionHref: '/chapters/ch02/2.2-limit-of-a-function-and-limit-laws',
    kind: 'THEOREM',
    blockLabel: 'THEOREM 1',
    title: 'The Limit Laws',
    bookRef: "Thomas' Calculus 14e · Section 2.2",
    difficultyTag: 'Core Foundation',
    formalIntro:
      'If $L, M, c, k$ are real numbers and both $\\lim_{x \\to c} f(x) = L$ and $\\lim_{x \\to c} g(x) = M$ exist (finite), then:',
    formalConditions: [
      { label: 'Sum / Difference:', text: '$\\lim_{x \\to c} [f(x) \\pm g(x)] = L \\pm M$' },
      { label: 'Constant Multiple:', text: '$\\lim_{x \\to c} [k\\,f(x)] = kL$' },
      { label: 'Product:', text: '$\\lim_{x \\to c} [f(x)\\,g(x)] = L \\cdot M$' },
      { label: 'Quotient:', text: '$\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\frac{L}{M}$, provided $M \\neq 0$' },
      { label: 'Power & Root:', text: '$\\lim_{x \\to c} [f(x)]^n = L^n$ and $\\lim_{x \\to c} \\sqrt[n]{f(x)} = \\sqrt[n]{L}$ ($L > 0$ if $n$ even)' },
    ],
    weakIntuition: {
      headline: 'You can break a big limit into smaller limits across $+, -, \\times, \\div$, and roots — as long as each piece is finite.',
      explanation:
        'If the limit of each piece exists as a normal finite number (and you are not dividing by $0$), you can evaluate each piece separately and combine the numbers.',
      everydayAnalogy:
        'If you know where each train car is heading, you know where the combined train is heading — unless two engines are pulling infinitely in opposite directions.',
    },
    quickExample: {
      prompt: 'Given $\\lim_{x\\to 3} f(x) = 4$ and $\\lim_{x\\to 3} g(x) = -2$, find $\\lim_{x\\to 3} \\frac{f(x)^2}{g(x) + 6}$.',
      steps: [
        'Apply Quotient, Power, and Sum Laws: $\\frac{4^2}{-2 + 6} = \\frac{16}{4} = 4$.',
        'Check denominator limit: $-2 + 6 = 4 \\neq 0$, so Quotient Law is valid!',
      ],
      takeaway: 'Limit Laws ONLY work when the individual limits $L$ and $M$ are finite numbers (and $M \\neq 0$ for division).',
    },
    strongDive: {
      whyItMatters:
        'Knowing when Limit Laws do NOT apply is half of Chapter 2: whenever you get $0/0$ or $\\infty - \\infty$, the Limit Laws fail and you must rewrite algebraically first.',
      edgeCases: [
        'Product Law can fail when one factor is $0$ and the other oscillates or is $\\infty$, e.g. $\\lim_{x\\to 0} x \\sin(1/x) = 0$ even though $\\lim \\sin(1/x)$ DNE.',
        'For even roots, $f(x)$ must be $\\ge 0$ near $c$; e.g. $\\lim_{x\\to 0} \\sqrt{x}$ two-sided DNE because $\\sqrt{x}$ is undefined for $x < 0$.',
      ],
      midtermTraps: [
        'Trap: Splitting $\\lim_{x\\to 0} (\\frac{1}{x} - \\frac{1}{x})$ or $\\lim (\\text{DNE} + \\text{DNE})$ using Sum Law. You CANNOT split limits that don\'t exist!',
      ],
      proTip: 'If direct plugging gives $0/0$, try: (1) Factor & Cancel, (2) Multiply by Conjugate $\\sqrt{A} + B$, or (3) Common Denominator.',
    },
    keywords: ['limit laws', 'sum rule', 'product rule', 'quotient rule', 'root rule'],
  },
  {
    id: 'ch02-polynomial-rational-limits',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.2',
    sectionTitle: 'Limit of a Function & Limit Laws',
    sectionHref: '/chapters/ch02/2.2-limit-of-a-function-and-limit-laws',
    kind: 'THEOREM',
    blockLabel: 'THEOREMS 2 & 3',
    title: 'Limits of Polynomials and Rational Functions',
    bookRef: "Thomas' Calculus 14e · Section 2.2",
    difficultyTag: 'Core Foundation',
    formalIntro: 'If $P(x)$ and $Q(x)$ are polynomials and $c$ is any real number, then:',
    formalFormula:
      '\\lim_{x \\to c} P(x) = P(c) \\qquad \\text{and} \\qquad \\lim_{x \\to c} \\frac{P(x)}{Q(x)} = \\frac{P(c)}{Q(c)} \\;\\; (\\text{when } Q(c) \\neq 0)',
    weakIntuition: {
      headline: 'For smooth polynomials and fractions with a nonzero bottom, just plug $c$ straight in!',
      explanation:
        'Direct substitution is always your Step 1. If you get a clean number like $5$ or $0/7 = 0$, you are completely done! You only do extra algebra when plugging in gives $0/0$ or $\\text{nonzero}/0$.',
      everydayAnalogy:
        'No potholes, no detour needed — just drive straight across at $x = c$.',
    },
    quickExample: {
      prompt: 'Evaluate $\\lim_{x \\to -1} \\frac{x^2 + 3x + 2}{x + 4}$ vs $\\lim_{x \\to -1} \\frac{x^2 + 3x + 2}{x + 1}$.',
      steps: [
        'First limit: plug $x = -1$ into bottom: $-1 + 4 = 3 \\neq 0$, so answer is $\\frac{1 - 3 + 2}{3} = \\frac{0}{3} = 0$.',
        'Second limit: plug $x = -1$: gives $\\frac{0}{0}$! Factor top: $\\frac{(x+1)(x+2)}{x+1} \\to -1 + 2 = 1$.',
      ],
      takeaway: '$0 / \\text{nonzero} = 0$ (done!). $\\text{nonzero} / 0$ = infinite/DNE (check signs). $0/0$ = more algebra needed!',
    },
    strongDive: {
      whyItMatters:
        'These two theorems prove that all polynomials are continuous everywhere and all rational functions are continuous on their domains.',
      edgeCases: [
        'For $\\lim_{x\\to c} \\frac{\\text{nonzero}}{0}$, check left-hand and right-hand signs: $+\\infty$ vs $-\\infty$ vs DNE.',
      ],
      midtermTraps: [
        'Trap: Seeing $0/0$ and immediately answering "$0$" or "$1$" or "Does Not Exist". $0/0$ is INDETERMINATE — the real answer could be anything!',
        'Trap: Doing factoring work when plugging in already gave $0/5 = 0$.',
      ],
      proTip: 'Always test direct substitution FIRST — it takes 3 seconds and saves you from unnecessary algebra.',
    },
    keywords: ['polynomial', 'rational', 'direct substitution', '0/0', 'indeterminate'],
  },
  {
    id: 'ch02-sandwich-theorem',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.2',
    sectionTitle: 'Limit of a Function & Limit Laws',
    sectionHref: '/chapters/ch02/2.2-limit-of-a-function-and-limit-laws',
    kind: 'THEOREM',
    blockLabel: 'THEOREM 4',
    title: 'The Sandwich (Squeeze) Theorem',
    bookRef: "Thomas' Calculus 14e · Section 2.2",
    difficultyTag: 'Midterm Favorite',
    formalIntro:
      'Suppose $g(x) \\le f(x) \\le h(x)$ for all $x$ in some open interval containing $c$ (except possibly at $c$ itself). If:',
    formalFormula:
      '\\lim_{x \\to c} g(x) = \\lim_{x \\to c} h(x) = L, \\quad \\text{then} \\quad \\lim_{x \\to c} f(x) = L',
    weakIntuition: {
      headline: 'Trap a messy function between two easy functions that meet at the exact same height $L$.',
      explanation:
        'If $f(x)$ is too wild to evaluate directly (like $\\sin(1/x)$), sandwich it between a simpler floor $g(x)$ and a simpler ceiling $h(x)$. If both the floor and ceiling squeeze together at $L$, $f(x)$ has nowhere else to go — it MUST equal $L$ too!',
      everydayAnalogy:
        'Two police officers walking on either side of a suspect both walk through the exact same doorway $L$ — the suspect trapped between them has to go through doorway $L$ too.',
    },
    quickExample: {
      prompt: 'Find $\\lim_{x \\to 0} x^2 \\sin\\left(\\frac{1}{x}\\right)$.',
      steps: [
        'We know $-1 \\le \\sin(1/x) \\le 1$ for all $x \\neq 0$.',
        'Multiply all three sides by $x^2 \\ge 0$ (inequalities stay in the same direction!): $-x^2 \\le x^2 \\sin(1/x) \\le x^2$.',
        'Both outer bounds go to $0$: $\\lim_{x\\to 0}(-x^2) = 0$ and $\\lim_{x\\to 0}(x^2) = 0$.',
        'By the Sandwich Theorem, $\\lim_{x \\to 0} x^2 \\sin(1/x) = 0$.',
      ],
      takeaway: 'Whenever you see $\\sin(\\text{anything})$ or $\\cos(\\text{anything})$ multiplied by something going to $0$, think Sandwich Theorem!',
    },
    strongDive: {
      whyItMatters:
        'This theorem is essential when Limit Laws fail (e.g. $\\lim_{x\\to 0} \\sin(1/x)$ does not exist) and is used in Thomas\' Calculus to prove $\\lim_{\\theta\\to 0}\\frac{\\sin\\theta}{\\theta} = 1$.',
      edgeCases: [
        'Be careful multiplying inequalities by $x$ (which changes sign for $x < 0$)! Use $|x|$ or $x^2$, which are always $\\ge 0$: $-|x| \\le x \\sin(1/x) \\le |x|$.',
        'The Squeeze Theorem also holds for limits as $x \\to \\pm\\infty$, e.g. $\\lim_{x\\to\\infty} \\frac{\\cos x}{x} = 0$.',
      ],
      midtermTraps: [
        'Trap: Applying Product Law $\\lim x^2 \\cdot \\lim \\sin(1/x)$ — illegal because $\\lim \\sin(1/x)$ does not exist!',
        'Trap: Using bounds whose limits do NOT match (e.g. $-1 \\le f(x) \\le 1$ proves nothing about a specific limit).',
      ],
      proTip: 'Standard trig bounds: $-1 \\le \\sin(\\dots) \\le 1$ and $-1 \\le \\cos(\\dots) \\le 1$. Multiply by $|\\text{front factor}|$.',
    },
    diagramId: 'squeeze',
    keywords: ['sandwich', 'squeeze', 'pinching', 'sin(1/x)', 'bounds'],
  },
  {
    id: 'ch02-epsilon-delta',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.3',
    sectionTitle: 'The Precise Definition of a Limit',
    sectionHref: '/chapters/ch02/2.3-the-precise-definition-of-a-limit',
    kind: 'DEFINITION',
    blockLabel: 'DEFINITION',
    title: 'The Precise ($\\varepsilon$-$\\delta$) Definition of a Limit',
    bookRef: "Thomas' Calculus 14e · Section 2.3",
    difficultyTag: 'High-Yield Trap',
    formalIntro:
      'Let $f(x)$ be defined on an open interval about $c$, except possibly at $c$ itself. We say $\\lim_{x \\to c} f(x) = L$ if for every number $\\varepsilon > 0$, there exists a corresponding number $\\delta > 0$ such that for all $x$:',
    formalFormula:
      '0 < |x - c| < \\delta \\implies |f(x) - L| < \\varepsilon',
    weakIntuition: {
      headline: 'You name ANY vertical accuracy target $\\varepsilon$; I can find a horizontal safe zone $\\delta$ around $c$ so every $x$ inside hits your target.',
      explanation:
        'Imagine a target zone around $L$ of height $2\\varepsilon$ (from $L - \\varepsilon$ to $L + \\varepsilon$). No matter how tiny $\\varepsilon$ is, if you can shrink a horizontal window $(c - \\delta, c + \\delta)$ around $c$ (skipping $c$ itself, which is why $0 < |x - c|$) so the entire graph in that window stays inside the target band, the limit truly equals $L$.',
      everydayAnalogy:
        'Baking a cake: the customer says "temperature must stay within $\\pm 2^\\circ$ ($\\varepsilon$) of $180^\\circ$ ($L$)." You find how finely you must hold the dial within $\\pm \\delta$ of setting $5$ ($c$) to guarantee it.',
    },
    quickExample: {
      prompt: 'Find $\\delta > 0$ for $\\lim_{x \\to 2} (3x - 1) = 5$ given any $\\varepsilon > 0$.',
      steps: [
        'Write the target inequality: $|(3x - 1) - 5| < \\varepsilon \\implies |3x - 6| < \\varepsilon$.',
        'Factor out $3$: $3|x - 2| < \\varepsilon \\implies |x - 2| < \\frac{\\varepsilon}{3}$.',
        'Choose $\\delta = \\frac{\\varepsilon}{3}$. Then $0 < |x - 2| < \\delta \\implies |f(x) - 5| < 3(\\varepsilon/3) = \\varepsilon$.',
      ],
      takeaway: 'Start from $|f(x) - L| < \\varepsilon$ and work backwards until you isolate $|x - c| < \\text{something}$.',
    },
    strongDive: {
      whyItMatters:
        'This rigorous definition removes hand-waving like "gets close" and is used to prove the Limit Laws and Continuity theorems.',
      edgeCases: [
        'For nonlinear functions like $f(x) = x^2$ near $x = 3$, $|x^2 - 9| = |x + 3|\\,|x - 3|$. First restrict $\\delta \\le 1$ so $2 < x < 4 \\implies |x + 3| < 7$, then set $\\delta = \\min(1, \\varepsilon / 7)$.',
        'Notice $0 < |x - c|$ explicitly excludes $x = c$, matching the informal rule that $f(c)$ is irrelevant.',
      ],
      midtermTraps: [
        'Trap: Letting $\\delta$ depend on $x$ (e.g., $\\delta = \\varepsilon / |x+3|$). $\\delta$ must be a pure positive constant depending only on $\\varepsilon$ (and $c$).',
        'Trap: Reversing the implication ($|f(x)-L| < \\varepsilon \\implies |x-c| < \\delta$ is backwards!).',
      ],
      proTip: 'For a linear function $mx + b$, $\\delta = \\varepsilon / |m|$ ALWAYS works!',
    },
    diagramId: 'epsilon-delta',
    keywords: ['epsilon', 'delta', 'precise definition', 'proof', 'tolerance'],
  },
  {
    id: 'ch02-one-sided-limits',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.4',
    sectionTitle: 'One-Sided Limits',
    sectionHref: '/chapters/ch02/2.4-one-sided-limits',
    kind: 'THEOREM',
    blockLabel: 'THEOREM 6',
    title: 'One-Sided Limits & Two-Sided Limit Criterion',
    bookRef: "Thomas' Calculus 14e · Section 2.4",
    difficultyTag: 'Midterm Favorite',
    formalIntro:
      'A function $f(x)$ has a two-sided limit $L$ as $x$ approaches $c$ if and only if both the right-hand limit ($x \\to c^+$) and left-hand limit ($x \\to c^-$) exist and are equal:',
    formalFormula:
      '\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^-} f(x) = L \\;\\;\\text{and}\\;\\; \\lim_{x \\to c^+} f(x) = L',
    weakIntuition: {
      headline: 'Coming from the left and coming from the right must agree on the SAME number $L$.',
      explanation:
        '$x \\to c^-$ means sneaking up on $c$ using values slightly LESS than $c$ (e.g., $1.999$ for $2^-$). $x \\to c^+$ means sneaking up using values slightly GREATER than $c$ (e.g., $2.001$ for $2^+$). If the two sides aim at different heights, the two-sided limit Does Not Exist.',
      everydayAnalogy:
        'Two road crews building a bridge from opposite riverbanks only connect if both sides meet at the exact same height.',
    },
    quickExample: {
      prompt: 'Evaluate the left, right, and two-sided limits of $f(x) = \\frac{|x|}{x}$ at $x = 0$.',
      steps: [
        'From the left ($x < 0$): $|x| = -x$, so $\\lim_{x \\to 0^-} \\frac{-x}{x} = -1$.',
        'From the right ($x > 0$): $|x| = x$, so $\\lim_{x \\to 0^+} \\frac{x}{x} = +1$.',
        'Since $-1 \\neq +1$, the two-sided limit $\\lim_{x \\to 0} \\frac{|x|}{x}$ DOES NOT EXIST.',
      ],
      takeaway: 'Check one-sided limits whenever you have piecewise splits, $|x|$, $\\lfloor x \\rfloor$, or division by $0$.',
    },
    strongDive: {
      whyItMatters:
        'Essential for testing continuity at domain endpoints and piecewise boundaries, and for proving non-existence of limits.',
      edgeCases: [
        'At a domain boundary like $f(x) = \\sqrt{x - 3}$ at $x = 3$, the right-hand limit $\\lim_{x \\to 3^+} \\sqrt{x - 3} = 0$ exists, while the left-hand limit is undefined.',
      ],
      midtermTraps: [
        'Trap: Assuming $x \\to 0^-$ means $x$ is huge negative — no, $0^-$ means tiny negative numbers like $-0.0001$ right next to $0$!',
      ],
      proTip: 'For piecewise functions split at $x = c$, ALWAYS compute $\\lim_{x\\to c^-}$ using the $x < c$ branch and $\\lim_{x\\to c^+}$ using the $x > c$ branch.',
    },
    keywords: ['one-sided', 'left-hand', 'right-hand', 'piecewise', 'criterion'],
  },
  {
    id: 'ch02-sin-theta-limit',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.4',
    sectionTitle: 'One-Sided Limits',
    sectionHref: '/chapters/ch02/2.4-one-sided-limits',
    kind: 'THEOREM',
    blockLabel: 'THEOREM 7',
    title: 'Fundamental Trigonometric Limits ($\\frac{\\sin\\theta}{\\theta}$)',
    bookRef: "Thomas' Calculus 14e · Section 2.4",
    difficultyTag: 'Midterm Favorite',
    formalIntro: 'When $\\theta$ is measured in radians:',
    formalFormula:
      '\\lim_{\\theta \\to 0} \\frac{\\sin \\theta}{\\theta} = 1 \\qquad \\text{and} \\qquad \\lim_{\\theta \\to 0} \\frac{1 - \\cos \\theta}{\\theta} = 0',
    weakIntuition: {
      headline: 'For tiny angles near $0$, $\\sin(\\theta)$ and $\\theta$ are practically twins — so their ratio is $1$!',
      explanation:
        'Even though plugging $\\theta = 0$ into $\\frac{\\sin\\theta}{\\theta}$ gives $0/0$, the graph approaches height $1$. More generally, as long as the inside box $\\square \\to 0$, $\\frac{\\sin(\\square)}{\\square} \\to 1$ and $\\frac{\\tan(\\square)}{\\square} \\to 1$ too!',
      everydayAnalogy:
        'On a tiny slice of a circle near $0$ radians, the curved arc ($\theta$) and the straight vertical drop ($\sin\theta$) are nearly indistinguishable.',
    },
    quickExample: {
      prompt: 'Evaluate $\\lim_{x \\to 0} \\frac{\\sin(5x)}{3x}$.',
      steps: [
        'We need the bottom to match the inside $5x$: multiply top and bottom by $5/5$.',
        '$\\frac{\\sin(5x)}{3x} = \\frac{5}{3} \\cdot \\frac{\\sin(5x)}{5x}$.',
        'As $x \\to 0$, $5x \\to 0$, so $\\frac{\\sin(5x)}{5x} \\to 1$. Answer: $\\frac{5}{3} \\cdot 1 = \\frac{5}{3}$.',
      ],
      takeaway: 'Match the denominator to the angle inside $\\sin(\\cdot)$, and pull the extra constants outside!',
    },
    strongDive: {
      whyItMatters:
        'Theorem 7 is the sole reason $\\frac{d}{dx}(\\sin x) = \\cos x$ and $\\frac{d}{dx}(\\cos x) = -\\sin x$ hold cleanly without extra $\\pi/180$ factors.',
      edgeCases: [
        'Useful companion limit: $\\lim_{\\theta \\to 0} \\frac{1 - \\cos\\theta}{\\theta^2} = \\frac{1}{2}$ (via multiplying by $1 + \\cos\\theta$ or half-angle $2\\sin^2(\\theta/2)$).',
      ],
      midtermTraps: [
        'Trap: Applying $\\frac{\\sin x}{x} \\to 1$ as $x \\to \\infty$! As $x \\to \\infty$, $\\sin x$ stays in $[-1, 1]$ while $x$ grows huge, so $\\lim_{x\\to\\infty} \\frac{\\sin x}{x} = 0$, NOT $1$!',
        'Trap: Using degrees instead of radians (in degrees the limit is $\\pi/180$, not $1$).',
      ],
      proTip: 'Check where the variable is heading FIRST: $\\frac{\\sin x}{x} \\to 1$ as $x \\to 0$, but $\\to 0$ as $x \\to \\infty$.',
    },
    keywords: ['sin(theta)/theta', 'trig limit', 'radians', '1-cos(theta)'],
  },
  {
    id: 'ch02-continuity-test',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.5',
    sectionTitle: 'Continuity',
    sectionHref: '/chapters/ch02/2.5-continuity',
    kind: 'TEST',
    blockLabel: 'CONTINUITY TEST',
    title: 'The Three-Part Continuity Test at a Point',
    bookRef: "Thomas' Calculus 14e · Section 2.5",
    difficultyTag: 'Midterm Favorite',
    formalIntro: 'A function $f$ is continuous at an interior point $c$ of its domain if and only if all three conditions hold:',
    formalConditions: [
      { label: '1. $f(c)$ exists:', text: '$c$ lies in the domain of $f$.' },
      { label: '2. $\\lim_{x \\to c} f(x)$ exists:', text: 'Left and right limits at $c$ both exist as the same finite number.' },
      { label: '3. $\\lim_{x \\to c} f(x) = f(c)$:', text: 'The limit value equals the actual function dot.' },
    ],
    formalOutro: 'If any condition fails, $f$ is discontinuous at $c$ (removable, jump, infinite, or oscillating).',
    weakIntuition: {
      headline: 'Can you draw past $x = c$ without lifting your pencil from the paper?',
      explanation:
        'Check three things in order: (1) Is there a solid dot at $c$? (2) Do the left and right curves meet at the same spot? (3) Does the solid dot sit RIGHT INSIDE that meeting spot (not above or below)? All 3 YES = Continuous!',
      everydayAnalogy:
        'A smooth bridge: (1) the center slab exists, (2) both approach ramps meet at the same level, (3) the center slab sits flush with the ramps — no gap or step.',
    },
    quickExample: {
      prompt: 'Find $k$ so that $f(x) = \\begin{cases} x^2 + 1, & x < 2 \\\\ kx - 1, & x \\ge 2 \\end{cases}$ is continuous at $x = 2$.',
      steps: [
        'Condition 1: $f(2) = 2k - 1$ (from $x \\ge 2$ branch).',
        'Condition 2: Left limit $= \\lim_{x\\to 2^-} (x^2 + 1) = 5$; Right limit $= 2k - 1$.',
        'Condition 3: Set left = right = $f(2)$: $2k - 1 = 5 \\implies 2k = 6 \\implies k = 3$.',
      ],
      takeaway: 'In parameter problems, set Left Limit = Right Limit = Function Value at the split point.',
    },
    strongDive: {
      whyItMatters:
        'Continuity classifies every discontinuity: Removable (limit exists, dot missing/misplaced), Jump (left $\\neq$ right, both finite), Infinite (vertical asymptote).',
      edgeCases: [
        'At a closed interval endpoint $[a, b]$, right-continuity at $a$ means $\\lim_{x\\to a^+} f(x) = f(a)$, and left-continuity at $b$ means $\\lim_{x\\to b^-} f(x) = f(b)$.',
        'A removable discontinuity at $c$ can be "fixed" (continuously extended) by defining $f(c) = \\lim_{x\\to c} f(x)$.',
      ],
      midtermTraps: [
        'Trap: Checking only Condition 1 ($f(c)$ exists) and Condition 2 (limit exists), forgetting Condition 3 that they must EQUAL each other!',
        'Trap: Calling a removable hole an "infinite discontinuity" because the denominator was $0$. Always check if $(x - c)$ cancels first!',
      ],
      proTip: 'If $\\lim_{x\\to c} f(x)$ exists finitely (even if $f(c)$ is undefined or moved), the discontinuity is REMOVABLE.',
    },
    diagramId: 'discontinuities',
    keywords: ['continuity', 'continuous', 'removable', 'jump', 'discontinuity', 'test'],
  },
  {
    id: 'ch02-continuity-compositions',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.5',
    sectionTitle: 'Continuity',
    sectionHref: '/chapters/ch02/2.5-continuity',
    kind: 'THEOREM',
    blockLabel: 'THEOREMS 8, 9 & 10',
    title: 'Algebra & Limits of Continuous Functions',
    bookRef: "Thomas' Calculus 14e · Section 2.5",
    difficultyTag: 'Core Foundation',
    formalIntro:
      'Sums, differences, products, constant multiples, quotients ($g(c)\\neq 0$), powers/roots, and compositions of continuous functions are continuous. Moreover, if $f$ is continuous at $b$ and $\\lim_{x \\to c} g(x) = b$, then:',
    formalFormula:
      '\\lim_{x \\to c} f(g(x)) = f\\!\\left(\\lim_{x \\to c} g(x)\\right) = f(b)',
    weakIntuition: {
      headline: 'You can slide a limit straight INSIDE a continuous outer function!',
      explanation:
        'Combined continuous functions (like polynomials + trig + roots) stay continuous wherever they are defined. And when taking the limit of a nested function like $\\cos(\\text{stuff})$, as long as $\\cos$ is continuous at the inside limit, just take the limit of the inside stuff first and plug it into $\\cos$!',
      everydayAnalogy:
        'If your thermometer works smoothly (continuous), the temperature reading of water approaching $100^\\circ$ approaches the reading at $100^\\circ$.',
    },
    quickExample: {
      prompt: 'Evaluate $\\lim_{x \\to 1} \\cos\\!\\left(\\frac{\\pi(x^2 - 1)}{x - 1}\\right)$.',
      steps: [
        'First take the inside limit: $\\lim_{x \\to 1} \\frac{\\pi(x-1)(x+1)}{x-1} = \\pi(1 + 1) = 2\\pi$.',
        'Since $\\cos(u)$ is continuous at $u = 2\\pi$, slide the limit inside: $\\cos(2\\pi) = 1$.',
      ],
      takeaway: 'Compute the inner limit first, then plug that result into the continuous outer function.',
    },
    strongDive: {
      whyItMatters:
        'Justifies evaluating limits of nested trig, radical, and rational expressions without needing new $\\varepsilon$-$\\delta$ proofs every time.',
      edgeCases: [
        'Notice Theorem 10 does NOT require $g(x)$ to be continuous at $c$ — it only needs $\\lim_{x\\to c} g(x) = b$ to exist and the OUTER function $f$ to be continuous at $b$!',
      ],
      midtermTraps: [
        'Trap: Sliding $\\lim$ inside a discontinuous outer function like $\\lfloor \\cdot \\rfloor$ at an integer! For example, $\\lim_{x\\to 2^-} \\lfloor x \\rfloor = 1 \\neq \\lfloor 2 \\rfloor$.',
      ],
      proTip: 'Polynomials, $\\sin x$, $\\cos x$, and odd roots are continuous on ALL of $\\mathbb{R}$ — you can always pass limits inside them.',
    },
    keywords: ['composition', 'continuous functions', 'theorem 8', 'theorem 9', 'theorem 10'],
  },
  {
    id: 'ch02-ivt',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.5',
    sectionTitle: 'Continuity',
    sectionHref: '/chapters/ch02/2.5-continuity',
    kind: 'THEOREM',
    blockLabel: 'THEOREM 11',
    title: 'The Intermediate Value Theorem (IVT)',
    bookRef: "Thomas' Calculus 14e · Section 2.5",
    difficultyTag: 'Midterm Favorite',
    formalIntro:
      'If $f$ is continuous on a closed interval $[a, b]$ and $y_0$ is any value strictly between $f(a)$ and $f(b)$, then there exists at least one number $c$ in $(a, b)$ such that:',
    formalFormula: 'f(c) = y_0',
    formalOutro: 'Root-finding corollary: if $f(a)$ and $f(b)$ have opposite signs, $f(c) = 0$ for at least one $c \\in (a, b)$.',
    weakIntuition: {
      headline: 'To go smoothly from height $f(a)$ to height $f(b)$, you MUST pass every height in between at least once.',
      explanation:
        'Because a continuous curve cannot teleport (no jumps, no holes), if it starts below sea level at $a$ and ends above sea level at $b$, it is guaranteed to cross sea level ($y = 0$) somewhere in $(a, b)$.',
      everydayAnalogy:
        'If your height was 100 cm at age 5 and 170 cm at age 18, since growth is continuous, there was definitely a moment when you were exactly 150 cm tall.',
    },
    quickExample: {
      prompt: 'Show that $x^3 - x - 1 = 0$ has at least one solution in $[1, 2]$.',
      steps: [
        'Let $f(x) = x^3 - x - 1$. Being a polynomial, $f$ is continuous on $[1, 2]$.',
        'Check endpoints: $f(1) = 1 - 1 - 1 = -1 < 0$ and $f(2) = 8 - 2 - 1 = 5 > 0$.',
        'Since $0$ lies between $-1$ and $5$, by the IVT there exists $c \\in (1, 2)$ with $f(c) = 0$.',
      ],
      takeaway: 'For "show a root exists" questions: (1) state continuity on $[a, b]$, (2) show opposite signs at $a$ and $b$, (3) cite IVT.',
    },
    strongDive: {
      whyItMatters:
        'IVT guarantees existence of solutions to equations that cannot be solved by algebra alone (like $\\cos x = x$), and underpins the Bisection Method.',
      edgeCases: [
        'IVT guarantees AT LEAST ONE $c$, not uniqueness (a curve can cross $y = y_0$ three or more times).',
        'If $f$ has even ONE jump or vertical asymptote inside $[a, b]$, IVT completely fails (e.g., $f(x) = 1/x$ on $[-1, 1]$ goes from $-1$ to $+1$ without ever hitting $0$!).',
      ],
      midtermTraps: [
        'Trap: Applying IVT to $1/(x-1)$ on $[0, 2]$! Because $x = 1$ is a discontinuity inside $[0, 2]$, the hypothesis fails.',
        'Trap: Thinking IVT tells you the exact value of $c$ — it only proves $c$ EXISTS.',
      ],
      proTip: 'Always verify continuity on the ENTIRE closed interval $[a, b]$ before citing IVT!',
    },
    diagramId: 'ivt',
    keywords: ['intermediate value theorem', 'ivt', 'root', 'continuous', 'closed interval'],
  },
  {
    id: 'ch02-horizontal-asymptotes',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.6',
    sectionTitle: 'Limits Involving Infinity; Asymptotes',
    sectionHref: '/chapters/ch02/2.6-limits-involving-infinity-asymptotes-of-graphs',
    kind: 'DEFINITION',
    blockLabel: 'DEFINITIONS & THEOREM 12',
    title: 'Limits at Infinity & Horizontal Asymptotes',
    bookRef: "Thomas' Calculus 14e · Section 2.6",
    difficultyTag: 'Midterm Favorite',
    formalIntro:
      'A line $y = b$ is a horizontal asymptote of the graph of $y = f(x)$ if either:',
    formalFormula:
      '\\lim_{x \\to \\infty} f(x) = b \\qquad \\text{or} \\qquad \\lim_{x \\to -\\infty} f(x) = b',
    formalOutro: 'All standard Limit Laws (Theorem 1) remain valid when $x \\to \\pm\\infty$, and $\\lim_{x \\to \\pm\\infty} \\frac{1}{x^r} = 0$ for $r > 0$.',
    weakIntuition: {
      headline: 'What height does the graph flatten out toward way out on the far right ($+\\infty$) or far left ($-\\infty$)?',
      explanation:
        'For fractions of polynomials, only the HIGHEST powers of $x$ on top and bottom matter when $x$ is huge. Divide top and bottom by the highest power of $x$ in the denominator, and terms like $5/x$ or $3/x^2$ shrink to $0$!',
      everydayAnalogy:
        'Looking at a mountain range from an airplane 30 km away: small bumps ($+ 7x - 4$) disappear, and only the giant peaks (leading $x^n$ terms) decide the skyline.',
    },
    quickExample: {
      prompt: 'Find $\\lim_{x \\to \\infty} \\frac{6x^2 - 5x + 1}{2x^2 + 9}$.',
      steps: [
        'Divide numerator and denominator by $x^2$: $\\frac{6 - 5/x + 1/x^2}{2 + 9/x^2}$.',
        'As $x \\to \\infty$, $5/x, 1/x^2, 9/x^2 \\to 0$.',
        'Result: $\\frac{6 - 0 + 0}{2 + 0} = 3$. So $y = 3$ is a horizontal asymptote.',
      ],
      takeaway: 'Top degree $<$ Bottom degree $\\to 0$; Equal degrees $\\to$ ratio of leading coefficients; Top $>$ Bottom $\\to \\pm\\infty$.',
    },
    strongDive: {
      whyItMatters:
        'Horizontal asymptotes describe long-run steady states in population, cooling, and engineering models.',
      edgeCases: [
        'A graph CAN cross its horizontal asymptote (e.g., $\\frac{\\sin x}{x}$ crosses $y = 0$ infinitely often as it settles toward $0$).',
        'Functions with square roots can have TWO DIFFERENT horizontal asymptotes! For $f(x) = \\frac{2x}{\\sqrt{x^2 + 1}}$, $\\sqrt{x^2} = |x|$, which equals $+x$ as $x \\to +\\infty$ (limit $+2$) and $-x$ as $x \\to -\\infty$ (limit $-2$).',
      ],
      midtermTraps: [
        'Trap: Writing $\\sqrt{x^2} = x$ when $x \\to -\\infty$! When $x < 0$, $\\sqrt{x^2} = |x| = -x$, which flips the sign of the limit!',
      ],
      proTip: 'Whenever you see $\\sqrt{x^2 + \\dots}$ and $x \\to -\\infty$, immediately substitute $\\sqrt{x^2} = -x$.',
    },
    keywords: ['horizontal asymptote', 'infinity', 'end behavior', 'rational function', 'sqrt(x^2)'],
  },
  {
    id: 'ch02-vertical-asymptotes',
    chapter: 2,
    chapterTitle: 'Chapter 2: Limits & Continuity',
    section: '2.6',
    sectionTitle: 'Limits Involving Infinity; Asymptotes',
    sectionHref: '/chapters/ch02/2.6-limits-involving-infinity-asymptotes-of-graphs',
    kind: 'DEFINITION',
    blockLabel: 'DEFINITIONS',
    title: 'Infinite Limits & Vertical Asymptotes',
    bookRef: "Thomas' Calculus 14e · Section 2.6",
    difficultyTag: 'High-Yield Trap',
    formalIntro:
      'A vertical line $x = a$ is a vertical asymptote of the graph of $y = f(x)$ if at least one of the following holds:',
    formalFormula:
      '\\lim_{x \\to a^+} f(x) = \\pm\\infty \\qquad \\text{or} \\qquad \\lim_{x \\to a^-} f(x) = \\pm\\infty',
    weakIntuition: {
      headline: 'Near $x = a$, the graph shoots straight up ($+\\infty$) or straight down ($-\\infty$) against an invisible wall.',
      explanation:
        'When plugging $x = a$ into a fraction gives $\\frac{\\text{nonzero number}}{0}$, dividing by a tiny near-zero number makes the fraction explode to $\\pm\\infty$. Check a test value right next to $a$ to see whether it blows up to $+\\infty$ or $-\\infty$.',
      everydayAnalogy:
        'Squeezing a garden hose nozzle closer to zero opening makes the water speed spike dramatically upward.',
    },
    quickExample: {
      prompt: 'Find all vertical asymptotes of $f(x) = \\frac{x - 2}{x^2 - 4}$.',
      steps: [
        'Factor denominator: $x^2 - 4 = (x - 2)(x + 2)$. Zeroes are $x = 2$ and $x = -2$.',
        'Cancel common factor $(x - 2)$ for $x \\neq 2$: $f(x) = \\frac{1}{x + 2}$.',
        'At $x = 2$, $\\lim_{x\\to 2} f(x) = \\frac{1}{4}$ (a HOLE, not a vertical asymptote!).',
        'At $x = -2$, numerator is $1 \\neq 0$ and denominator is $0$, so $x = -2$ IS a vertical asymptote.',
      ],
      takeaway: 'Nonzero / 0 = Vertical Asymptote. 0 / 0 after canceling = check again (often just a Hole!).',
    },
    strongDive: {
      whyItMatters:
        'Distinguishing removable holes from vertical asymptotes is one of the single most common Midterm Ch 2 questions.',
      edgeCases: [
        'A graph can NEVER cross a vertical asymptote if $a$ is outside the domain (though a piecewise function could put a single dot at $x = a$).',
        'Even powers in the denominator like $\\frac{1}{(x-3)^2}$ go to $+\\infty$ on BOTH sides; odd powers like $\\frac{1}{x-3}$ go to $-\\infty$ on one side and $+\\infty$ on the other (so two-sided limit DNE).',
      ],
      midtermTraps: [
        'Trap: Listing EVERY root of the denominator as a vertical asymptote without factoring the numerator first!',
      ],
      proTip: 'Factor top AND bottom completely before naming vertical asymptotes; any factor that cancels completely is a hole, not an asymptote.',
    },
    keywords: ['vertical asymptote', 'infinite limit', 'hole', 'denominator zero'],
  },

  // =========================================================================
  // CHAPTER 3: DERIVATIVES (12 Blocks)
  // =========================================================================
  {
    id: 'ch03-derivative-at-point',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    section: '3.1',
    sectionTitle: 'Tangents & Derivative at a Point',
    sectionHref: '/chapters/ch03/3.1-tangents-and-the-derivative-at-a-point',
    kind: 'DEFINITION',
    blockLabel: 'DEFINITION',
    title: 'Tangent Slope & Derivative at a Point $x_0$',
    bookRef: "Thomas' Calculus 14e · Section 3.1",
    difficultyTag: 'Midterm Favorite',
    formalIntro:
      'The derivative of a function $f$ at a point $x_0$, denoted $f\'(x_0)$, is the limit of the difference quotient (provided the limit exists):',
    formalFormula:
      "f'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h} = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}",
    formalOutro:
      'Geometrically, $f\'(x_0)$ is the slope of the tangent line to the curve $y = f(x)$ at $(x_0, f(x_0))$.',
    weakIntuition: {
      headline: 'Zoom in infinitely close at $(x_0, f(x_0))$ until the curve looks straight — its slope is $f\'(x_0)$.',
      explanation:
        'Start with the secant slope between $x_0$ and a nearby point $x_0 + h$, then let the gap $h$ shrink to $0$. The number you get is the exact slope of the tangent line touching the curve at that single point.',
      everydayAnalogy:
        'Your car\'s speedometer reading at the exact instant 3:05 PM ($x_0$), not your average speed over a whole hour.',
    },
    quickExample: {
      prompt: 'Find the tangent line to $f(x) = x^2$ at $x_0 = 3$ using the limit definition.',
      steps: [
        'Difference quotient: $\\frac{(3 + h)^2 - 3^2}{h} = \\frac{9 + 6h + h^2 - 9}{h} = \\frac{h(6 + h)}{h} = 6 + h$ ($h \\neq 0$).',
        'Take $\\lim_{h \\to 0} (6 + h) = 6$, so slope $f\'(3) = 6$.',
        'Tangent line through $(3, 9)$: $y - 9 = 6(x - 3) \\implies y = 6x - 9$.',
      ],
      takeaway: 'To write a tangent line at $x_0$, you always need two numbers: the point $(x_0, f(x_0))$ and the slope $f\'(x_0)$.',
    },
    strongDive: {
      whyItMatters:
        'On midterms, Professors love disguising easy derivatives inside terrifying-looking limits using either the $h \\to 0$ or $x \\to x_0$ form!',
      edgeCases: [
        'Recognizing hidden derivatives: $\\lim_{h\\to 0} \\frac{\\sin(\\pi/6 + h) - 1/2}{h}$ is simply $f\'(\\pi/6)$ for $f(x) = \\sin x$, which equals $\\cos(\\pi/6) = \\frac{\\sqrt{3}}{2}$!',
        'Similarly, $\\lim_{x\\to 1} \\frac{x^{10} - 1}{x - 1}$ is $f\'(1)$ for $f(x) = x^{10}$, giving $10(1)^9 = 10$.',
      ],
      midtermTraps: [
        'Trap: Confusing the slope $f\'(x_0)$ with the tangent LINE equation $y = f(x_0) + f\'(x_0)(x - x_0)$.',
        'Trap: Trying L\'Hôpital/algebra on a $0/0$ difference quotient when recognizing it as $f\'(x_0)$ solves it in 3 seconds!',
      ],
      proTip: 'Spot the pattern $\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$ or $\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}$ — identify $f$ and $a$, then just compute $f\'(a)$!',
    },
    keywords: ['derivative at a point', 'tangent line', 'difference quotient', 'slope'],
  },
  {
    id: 'ch03-derivative-as-function',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    section: '3.2',
    sectionTitle: 'The Derivative as a Function',
    sectionHref: '/chapters/ch03/3.2-the-derivative-as-a-function',
    kind: 'DEFINITION',
    blockLabel: 'DEFINITION',
    title: 'The Derivative Function $f\'(x)$ & Where It Fails',
    bookRef: "Thomas' Calculus 14e · Section 3.2",
    difficultyTag: 'High-Yield Trap',
    formalIntro:
      'The derivative of $f$ with respect to $x$ is the function $f\'$ whose value at $x$ is:',
    formalFormula:
      "f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}",
    formalOutro:
      'for all $x$ where this limit exists. A function is differentiable at $x$ if $f\'(x)$ exists; it fails to be differentiable at corners, cusps, vertical tangents, or discontinuities.',
    weakIntuition: {
      headline: '$f\'(x)$ is a slope-machine: plug in any $x$, get the curve\'s slope there — unless the graph breaks, kinks sharply, or goes vertical.',
      explanation:
        'Instead of computing the slope at one point at a time, keep $x$ as a variable to get a brand-new formula $f\'(x)$ that gives the slope everywhere. However, if the graph has a sharp V-corner (left slope $\\neq$ right slope), a sharp spike (cusp), a vertical wall tangent (infinite slope), or a break/jump, the derivative fails at that spot.',
      everydayAnalogy:
        'Driving along a smoothly curved highway has a clear steering direction everywhere, whereas hitting a 90° sharp corner or falling off a cliff breaks smooth direction.',
    },
    quickExample: {
      prompt: 'Why is $f(x) = |x|$ continuous at $x = 0$ yet NOT differentiable at $x = 0$?',
      steps: [
        'Left-hand derivative as $h \\to 0^-$: $\\frac{|0+h| - 0}{h} = \\frac{-h}{h} = -1$.',
        'Right-hand derivative as $h \\to 0^+$: $\\frac{|0+h| - 0}{h} = \\frac{h}{h} = +1$.',
        'Since left slope ($-1$) $\\neq$ right slope ($+1$), $f\'(0)$ does not exist (a corner!).',
      ],
      takeaway: 'Four classic places $f\'(c)$ fails: (1) Corner, (2) Cusp, (3) Vertical Tangent, (4) Discontinuity.',
    },
    strongDive: {
      whyItMatters:
        'Understanding the 4 failure modes lets you read differentiability directly off any graph on a midterm.',
      edgeCases: [
        'Corner: finite but unequal one-sided derivatives (e.g. $|x|$ at $0$).',
        'Cusp: one-sided derivatives approach $+\\infty$ on one side and $-\\infty$ on the other (e.g. $x^{2/3}$ at $0$).',
        'Vertical Tangent: one-sided derivatives both approach $+\\infty$ or both $-\\infty$ (e.g. $x^{1/3}$ at $0$).',
      ],
      midtermTraps: [
        'Trap: Thinking $f(x) = x^{1/3}$ has a vertical asymptote at $0$. No! It is continuous at $0$ ($f(0)=0$), it has a VERTICAL TANGENT there.',
      ],
      proTip: 'Check continuity first, then check whether the left and right slopes match as a single finite number.',
    },
    diagramId: 'derivative-failures',
    keywords: ['differentiable', 'corner', 'cusp', 'vertical tangent', 'one-sided derivative'],
  },
  {
    id: 'ch03-diff-implies-cont',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    section: '3.2',
    sectionTitle: 'The Derivative as a Function',
    sectionHref: '/chapters/ch03/3.2-the-derivative-as-a-function',
    kind: 'THEOREM',
    blockLabel: 'THEOREM 1',
    title: 'Differentiability Implies Continuity',
    bookRef: "Thomas' Calculus 14e · Section 3.2",
    difficultyTag: 'Midterm Favorite',
    formalIntro: 'If $f$ has a derivative at $x = c$, then $f$ is continuous at $x = c$:',
    formalFormula:
      "f'(c) \\text{ exists} \\implies \\lim_{x \\to c} f(x) = f(c)",
    formalOutro: 'Equivalently (contrapositive): if $f$ is discontinuous at $c$, then $f$ is NOT differentiable at $c$.',
    weakIntuition: {
      headline: 'Every smooth curve is automatically connected — if it is broken, it CANNOT have a derivative there.',
      explanation:
        'Differentiable is a STRONGER, pickier property than continuous. If you already know a curve has a valid tangent slope at $c$, you automatically know there is no hole or jump at $c$. WARNING: the reverse is NOT true! A graph can be connected (continuous) and still have a sharp corner like $|x|$.',
      everydayAnalogy:
        '"If it is a square, it MUST be a rectangle" — TRUE. "If it is a rectangle, it must be a square" — FALSE!',
    },
    quickExample: {
      prompt: 'Is $f(x) = \\lfloor x \\rfloor$ differentiable at $x = 2$?',
      steps: [
        'At $x = 2$, $\\lfloor x \\rfloor$ has a jump discontinuity ($1$ from the left, $2$ from the right).',
        'By the contrapositive of Theorem 1 (Not Continuous $\\implies$ Not Differentiable), $f\'(2)$ does NOT exist!',
      ],
      takeaway: 'Differentiable $\\implies$ Continuous (ALWAYS TRUE). Continuous $\\implies$ Differentiable (FALSE — think $|x|$!).',
    },
    strongDive: {
      whyItMatters:
        'A staple True/False and conceptual MCQ on every Calculus I midterm.',
      edgeCases: [
        'Proof idea: $f(x) - f(c) = \\frac{f(x)-f(c)}{x-c}(x-c) \\to f\'(c) \\cdot 0 = 0$ as $x \\to c$.',
        'A piecewise function can match values at $x = c$ (continuous) yet fail to match slopes (not differentiable)! Always check BOTH when making a piecewise function differentiable.',
      ],
      midtermTraps: [
        'Trap: Choosing "If $f$ is continuous at $c$, then $f$ is differentiable at $c$." Counterexample: $f(x) = |x|$ at $x = 0$.',
        'Trap: On a piecewise differentiability problem with two unknowns $a, b$, forgetting you get TWO equations: (1) continuity $f(c^-) = f(c^+)$, AND (2) matching slopes $f\'(c^-) = f\'(c^+)$.',
      ],
      proTip: 'Memorize the hierarchy: Differentiable $\\subset$ Continuous $\\subset$ Limit Exists.',
    },
    keywords: ['differentiability implies continuity', 'contrapositive', 'counterexample', '|x|'],
  },
  {
    id: 'ch03-power-sum-rules',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    section: '3.3',
    sectionTitle: 'Differentiation Rules',
    sectionHref: '/chapters/ch03/3.3-differentiation-rules',
    kind: 'RULES',
    blockLabel: 'BASIC RULES',
    title: 'Constant, Power, Constant Multiple & Sum Rules',
    bookRef: "Thomas' Calculus 14e · Section 3.3",
    difficultyTag: 'Core Foundation',
    formalIntro: 'If $c$ is a constant, $n$ is any real number, and $u, v$ are differentiable functions of $x$:',
    formalConditions: [
      { label: 'Constant Rule:', text: '$\\frac{d}{dx}[c] = 0$' },
      { label: 'Power Rule:', text: '$\\frac{d}{dx}[x^n] = n x^{n-1}$ (for all real $n$)' },
      { label: 'Constant Multiple:', text: '$\\frac{d}{dx}[c\\,u] = c\\,\\frac{du}{dx}$' },
      { label: 'Sum / Difference:', text: '$\\frac{d}{dx}[u \\pm v] = \\frac{du}{dx} \\pm \\frac{dv}{dx}$' },
    ],
    weakIntuition: {
      headline: 'Constants have flat slope $0$. For $x^n$, bring the power down in front and subtract $1$ from the exponent.',
      explanation:
        'A horizontal line $y = c$ never rises or falls, so its slope is $0$. For any power $x^n$ (even negative or fractions like $x^{-2}$ or $x^{1/2}$!), rewrite roots and denominators as $x^n$ first, then bring $n$ out front and lower the power by $1$.',
      everydayAnalogy:
        'A flat road ($y = 7$) has $0\\%$ grade. A power $x^n$ drops one degree per derivative ($x^3 \\to 3x^2 \\to 6x \\to 6 \\to 0$).',
    },
    quickExample: {
      prompt: 'Differentiate $f(x) = 4\\sqrt{x} - \\frac{3}{x^2} + \\pi^2$.',
      steps: [
        'Rewrite using exponents: $f(x) = 4x^{1/2} - 3x^{-2} + \\pi^2$.',
        'Apply Power & Constant Rules: $f\'(x) = 4\\left(\\frac{1}{2}x^{-1/2}\\right) - 3(-2x^{-3}) + 0$.',
        'Simplify: $f\'(x) = \\frac{2}{\\sqrt{x}} + \\frac{6}{x^3}$.',
      ],
      takeaway: 'Rewrite $\\sqrt[m]{x^k} = x^{k/m}$ and $\\frac{1}{x^k} = x^{-k}$ BEFORE differentiating!',
    },
    strongDive: {
      whyItMatters:
        'Linearity of differentiation ($(au + bv)\' = au\' + bv\'$) lets us differentiate any polynomial term-by-term.',
      edgeCases: [
        'Power Rule applies ONLY when the base is $x$ and the exponent $n$ is a CONSTANT ($x^n$). It does NOT apply to $2^x$ or $x^x$!',
      ],
      midtermTraps: [
        'Trap: Writing $\\frac{d}{dx}[\\pi^3] = 3\\pi^2$ or $\\frac{d}{dx}[e^2] = 2e$! Both $\\pi^3$ and $e^2$ are CONSTANTS — their derivatives are $0$!',
        'Trap: Subtracting $1$ backwards on negative exponents: $(-2) - 1 = -3$, NOT $-1$!',
      ],
      proTip: 'Spot constants disguised with symbols like $\\pi^2, \\sqrt{5}, \\sin(1)$ — their derivative is instantly $0$.',
    },
    keywords: ['power rule', 'constant rule', 'sum rule', 'exponent', 'pi'],
  },
  {
    id: 'ch03-product-quotient-rules',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    section: '3.3',
    sectionTitle: 'Differentiation Rules',
    sectionHref: '/chapters/ch03/3.3-differentiation-rules',
    kind: 'RULES',
    blockLabel: 'PRODUCT & QUOTIENT RULES',
    title: 'The Product Rule and Quotient Rule',
    bookRef: "Thomas' Calculus 14e · Section 3.3",
    difficultyTag: 'Midterm Favorite',
    formalIntro: 'If $u$ and $v$ are differentiable at $x$, then:',
    formalFormula:
      "(u \\cdot v)' = u' v + u v' \\qquad \\text{and} \\qquad \\left(\\frac{u}{v}\\right)' = \\frac{u' v - u v'}{v^2} \\;\\; (v(x) \\neq 0)",
    weakIntuition: {
      headline: 'Product: take turns differentiating one factor while keeping the other untouched. Quotient: Low d-High minus High d-Low, over Low squared!',
      explanation:
        'You CANNOT just differentiate the two pieces and multiply/divide the answers! For $u \\cdot v$, take $(\\text{first}\')(\\text{second}) + (\\text{first})(\\text{second}\')$. For $\\frac{u}{v}$, remember the subtraction order: $(\\text{bottom})(\\text{top}\') - (\\text{top})(\\text{bottom}\')$, all over $(\\text{bottom})^2$.',
      everydayAnalogy:
        'Expanding rectangle area $A = u \\cdot v$: the added thin strips come from $(du)\\cdot v$ plus $u\\cdot (dv)$.',
    },
    quickExample: {
      prompt: 'Differentiate $y = \\frac{x^2}{x + 1}$.',
      steps: [
        'Identify Top $u = x^2$ ($u\' = 2x$) and Bottom $v = x + 1$ ($v\' = 1$).',
        'Quotient Rule: $y\' = \\frac{(2x)(x + 1) - (x^2)(1)}{(x + 1)^2}$.',
        'Simplify numerator: $\\frac{2x^2 + 2x - x^2}{(x + 1)^2} = \\frac{x^2 + 2x}{(x + 1)^2}$.',
      ],
      takeaway: 'Check if you can simplify algebraically FIRST (e.g. $\\frac{x^3 + x}{x} = x^2 + 1$) to avoid Quotient Rule completely!',
    },
    strongDive: {
      whyItMatters:
        'Used constantly in combination with the Chain Rule and for computing derivatives of $\\tan x, \\sec x, \\cot x, \\csc x$.',
      edgeCases: [
        'Extended Product Rule for 3 functions: $(uvw)\' = u\'vw + uv\'w + uvw\'$.',
        'If the numerator or denominator is just a constant (like $\\frac{x^2}{5}$ or $\\frac{5}{x^2}$), Constant Multiple or Power Rule ($5x^{-2}$) is much faster and less error-prone than Quotient Rule.',
      ],
      midtermTraps: [
        'Trap: $(uv)\' = u\'v\'$ or $(u/v)\' = u\'/v\'$ — NEVER true in general!',
        'Trap: Swapping the order in the Quotient Rule numerator ($uv\' - u\'v$ flips the sign to negative!).',
      ],
      proTip: 'Always start the Quotient Rule numerator by writing the BOTTOM function $v$ first: $\\frac{v u\' - u v\'}{v^2}$.',
    },
    keywords: ['product rule', 'quotient rule', 'differentiation'],
  },
  {
    id: 'ch03-higher-order-derivatives',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    section: '3.3',
    sectionTitle: 'Differentiation Rules',
    sectionHref: '/chapters/ch03/3.3-differentiation-rules',
    kind: 'DEFINITION',
    blockLabel: 'DEFINITION',
    title: 'Second and Higher-Order Derivatives',
    bookRef: "Thomas' Calculus 14e · Section 3.3",
    difficultyTag: 'Core Foundation',
    formalIntro:
      'If $y\' = f\'(x)$ is itself differentiable, its derivative is the second derivative $f\'\'(x) = \\frac{d}{dx}(f\'(x))$, and repeating $n$ times yields the $n$-th derivative:',
    formalFormula:
      "y'' = f''(x) = \\frac{d^2y}{dx^2}, \\qquad y^{(n)} = f^{(n)}(x) = \\frac{d^n y}{dx^n}",
    weakIntuition: {
      headline: 'Just differentiate again! The second derivative measures how fast the slope itself is changing.',
      explanation:
        'First derivative = slope (velocity). Second derivative = derivative of the derivative (acceleration / how sharply the curve bends). Just apply differentiation rules one more time to $f\'(x)$.',
      everydayAnalogy:
        'Position $\\to$ Speedometer (1st derivative) $\\to$ How hard you feel pushed into your seat when you hit the gas pedal (2nd derivative).',
    },
    quickExample: {
      prompt: 'Find $f\'\'\'(x)$ for $f(x) = x^4 - 3x^2 + 5x$.',
      steps: [
        '$f\'(x) = 4x^3 - 6x + 5$.',
        '$f\'\'(x) = 12x^2 - 6$.',
        '$f\'\'\'(x) = 24x$ (and $f^{(4)}(x) = 24$, $f^{(5)}(x) = 0$).',
      ],
      takeaway: 'Every derivative of a polynomial lowers its degree by $1$ until it eventually hits $0$.',
    },
    strongDive: {
      whyItMatters:
        'Higher-order trig derivatives cycle every 4 steps ($\\sin x \\to \\cos x \\to -\\sin x \\to -\\cos x \\to \\sin x$), a favorite midterm pattern question (e.g. find $\\frac{d^{50}}{dx^{50}}(\\sin x)$).',
      edgeCases: [
        'For $f^{(n)}(x)$ with $n \\ge 4$, write parentheses around $n$ so it isn\'t mistaken for an exponent $f^n(x)$.',
      ],
      midtermTraps: [
        'Trap: Thinking $\\frac{d^2y}{dx^2}$ means $(dy/dx)^2$! The $2$ on $d^2y$ and $dx^2$ is operator notation for applying $\\frac{d}{dx}$ twice, NOT squaring.',
      ],
      proTip: 'For the $n$-th derivative of $\\sin x$ or $\\cos x$, divide $n$ by $4$ and use the remainder $r \\in \\{0, 1, 2, 3\\}$!',
    },
    keywords: ['second derivative', 'higher-order', 'd2y/dx2', 'cyclic derivatives'],
  },
  {
    id: 'ch03-rate-velocity-acceleration',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    section: '3.4',
    sectionTitle: 'The Derivative as a Rate of Change',
    sectionHref: '/chapters/ch03/3.4-the-derivative-as-a-rate-of-change',
    kind: 'DEFINITIONS',
    blockLabel: 'DEFINITIONS',
    title: 'Instantaneous Rate, Velocity, Speed, and Acceleration',
    bookRef: "Thomas' Calculus 14e · Section 3.4",
    difficultyTag: 'Midterm Favorite',
    formalIntro:
      'The instantaneous rate of change of $f$ at $x_0$ is $f\'(x_0)$. For an object moving along a coordinate line with position $s = f(t)$:',
    formalConditions: [
      { label: 'Velocity:', text: '$v(t) = \\frac{ds}{dt} = f\'(t)$ (includes direction: $+$ or $-$)' },
      { label: 'Speed:', text: '$\\text{Speed} = |v(t)|$ (always $\\ge 0$, magnitude only)' },
      { label: 'Acceleration:', text: '$a(t) = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}$ (rate of change of velocity)' },
    ],
    weakIntuition: {
      headline: 'Position says WHERE you are; velocity says HOW FAST & WHICH WAY; speed drops the minus sign; acceleration says if velocity is changing.',
      explanation:
        'If $v(t) > 0$, you are moving forward (right/up). If $v(t) < 0$, you are moving backward (left/down). Speed ignores direction, so moving backward at $-30\\text{ m/s}$ means your speed is $+30\\text{ m/s}$.',
      everydayAnalogy:
        'Driving in reverse at $20\\text{ km/h}$: your velocity is $-20\\text{ km/h}$, your speedometer reads $20\\text{ km/h}$ (speed).',
    },
    quickExample: {
      prompt: 'A ball has height $s(t) = 20t - 5t^2$ meters. Find its velocity and when it hits maximum height.',
      steps: [
        'Velocity: $v(t) = s\'(t) = 20 - 10t$.',
        'At the peak, the ball pauses momentarily so $v(t) = 0$: $20 - 10t = 0 \\implies t = 2\\text{ s}$.',
        'Acceleration is $a(t) = v\'(t) = -10\\text{ m/s}^2$ (gravity pulling down).',
      ],
      takeaway: 'An object stops or changes direction when $v(t) = 0$ (and $v(t)$ changes sign).',
    },
    strongDive: {
      whyItMatters:
        'Connects calculus directly to physics, economics (marginal cost $C\'(x)$), and kinematics.',
      edgeCases: [
        'Total distance traveled on $[t_1, t_2]$ is NOT $|s(t_2) - s(t_1)|$ (that is displacement)! If the object turns around at $v(t)=0$, add the path segments separately.',
      ],
      midtermTraps: [
        'Trap: Saying "the particle is speeding up whenever $a(t) > 0$." FALSE! A particle speeds up when $v(t)$ and $a(t)$ have the SAME sign (both $+$ or both $-$), and slows down when they have OPPOSITE signs!',
        'Trap: Confusing displacement $s(b) - s(a)$ with total distance traveled.',
      ],
      proTip: 'Speeding up $\\iff v(t)\\cdot a(t) > 0$. Slowing down $\\iff v(t)\\cdot a(t) < 0$.',
    },
    keywords: ['velocity', 'speed', 'acceleration', 'instantaneous rate', 'marginal'],
  },
  {
    id: 'ch03-trig-derivatives',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    section: '3.5',
    sectionTitle: 'Derivatives of Trigonometric Functions',
    sectionHref: '/chapters/ch03/3.5-derivatives-of-trigonometric-functions',
    kind: 'RULES',
    blockLabel: 'TRIG DERIVATIVE RULES',
    title: 'Derivatives of the Six Trigonometric Functions',
    bookRef: "Thomas' Calculus 14e · Section 3.5",
    difficultyTag: 'Midterm Favorite',
    formalIntro: 'For $x$ measured in radians, wherever the functions are defined:',
    formalFormula:
      '\\begin{aligned} \\frac{d}{dx}(\\sin x) &= \\cos x & \\frac{d}{dx}(\\cos x) &= -\\sin x \\\\ \\frac{d}{dx}(\\tan x) &= \\sec^2 x & \\frac{d}{dx}(\\cot x) &= -\\csc^2 x \\\\ \\frac{d}{dx}(\\sec x) &= \\sec x \\tan x & \\frac{d}{dx}(\\csc x) &= -\\csc x \\cot x \\end{aligned}',
    weakIntuition: {
      headline: 'Every "CO-" trig function (cosine, cotangent, cosecant) gets a MINUS sign!',
      explanation:
        'Notice the matching pairs: $\\sin/\\cos$ swap into each other; $\\tan/\\cot$ turn into $\\sec^2$ and $-\\csc^2$; $\\sec/\\csc$ repeat themselves times $\\tan$ or $-\\cot$. And all three starting with "c" ($\\cos, \\cot, \\csc$) carry a negative sign.',
      everydayAnalogy:
        'Think of "C = Cold / Minus": any trig function starting with the letter C produces a negative derivative.',
    },
    quickExample: {
      prompt: 'Find $\\frac{dy}{dx}$ for $y = x^2 \\cos x + \\tan x$.',
      steps: [
        'Use Product Rule on $x^2 \\cos x$: $(2x)(\\cos x) + (x^2)(-\\sin x) = 2x\\cos x - x^2\\sin x$.',
        'Add derivative of $\\tan x$: $+ \\sec^2 x$.',
        'Full answer: $y\' = 2x\\cos x - x^2\\sin x + \\sec^2 x$.',
      ],
      takeaway: 'Never forget the minus sign on $(\\cos x)\' = -\\sin x$!',
    },
    strongDive: {
      whyItMatters:
        'Four of the six rules ($\\tan, \\cot, \\sec, \\csc$) are derived directly from $\\sin x$ and $\\cos x$ using the Quotient Rule.',
      edgeCases: [
        'All six formulas hold ONLY when $x$ is in radians. In degrees, an extra factor of $\\frac{\\pi}{180}$ appears.',
      ],
      midtermTraps: [
        'Trap: Mixing up the integral and derivative signs: $(\\cos x)\' = -\\sin x$ (negative!), whereas $(\\sin x)\' = +\\cos x$ (positive!).',
        'Trap: Writing $(\\tan x)\' = \\sec x \\tan x$ or $(\\sec x)\' = \\sec^2 x$. Keep the $\\tan \\leftrightarrow \\sec^2$ and $\\sec \\leftrightarrow \\sec\\tan$ pairs crisp!',
      ],
      proTip: 'Check the "c"-rule on your final answer: did $\\cos, \\cot, \\csc$ each generate a minus sign?',
    },
    keywords: ['trig derivatives', 'sin', 'cos', 'tan', 'sec', 'csc', 'cot'],
  },
  {
    id: 'ch03-chain-rule',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    section: '3.6',
    sectionTitle: 'The Chain Rule',
    sectionHref: '/chapters/ch03/3.6-the-chain-rule',
    kind: 'THEOREM',
    blockLabel: 'THEOREM 2',
    title: 'The Chain Rule (Composite Functions)',
    bookRef: "Thomas' Calculus 14e · Section 3.6",
    difficultyTag: 'Midterm Favorite',
    formalIntro:
      'If $f(u)$ is differentiable at the point $u = g(x)$, and $g(x)$ is differentiable at $x$, then the composite function $(f \\circ g)(x) = f(g(x))$ is differentiable at $x$ with:',
    formalFormula:
      "(f \\circ g)'(x) = f'\\!\\big(g(x)\\big) \\cdot g'(x) \\qquad \\text{or in Leibniz form:} \\qquad \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}",
    weakIntuition: {
      headline: 'Peel the onion from OUTSIDE to INSIDE: differentiate the outer shell (leaving the inside untouched), then multiply by the derivative of the inside.',
      explanation:
        'Whenever something MORE complicated than plain $x$ sits inside a power, root, or trig function — like $(3x+1)^5$ or $\\sin(x^2)$ — differentiate the outside wrapper first while keeping the inside frozen, then multiply by the inside\'s derivative.',
      everydayAnalogy:
        'A bicycle gear chain: if pedal gear turns $2\\times$ faster than middle gear ($du/dx = 2$), and back wheel turns $3\\times$ faster than middle gear ($dy/du = 3$), the back wheel turns $3 \\times 2 = 6\\times$ faster than your feet!',
    },
    quickExample: {
      prompt: 'Differentiate $y = \\sin^3(4x)$.',
      steps: [
        'Rewrite to see all 3 layers clearly: $y = [\\sin(4x)]^3$.',
        'Outer power $(\\cdot)^3$: $3[\\sin(4x)]^2 \\cdot \\frac{d}{dx}[\\sin(4x)]$.',
        'Middle $\\sin(\\cdot)$: $\\cdot \\cos(4x) \\cdot \\frac{d}{dx}[4x]$.',
        'Innermost $4x$: $\\cdot 4$. Combined: $12\\sin^2(4x)\\cos(4x)$.',
      ],
      takeaway: 'Keep peeling layer by layer until the innermost derivative is just $\\frac{d}{dx}[x] = 1$.',
    },
    strongDive: {
      whyItMatters:
        'The Chain Rule is the single most-used rule in calculus — implicit differentiation (§3.7) and related rates (§3.8) are direct applications of it.',
      edgeCases: [
        'Power Chain Rule: $\\frac{d}{dx}[u(x)]^n = n[u(x)]^{n-1} \\cdot u\'(x)$.',
      ],
      midtermTraps: [
        'Trap: Differentiating the inside INSIDE the outer derivative, e.g. writing $\\frac{d}{dx}\\sin(x^2) = \\cos(2x)$! The inside MUST stay $x^2$: $\\cos(x^2)\\cdot 2x$.',
        'Trap: Forgetting the chain factor on $\\sin(5x)$ and writing just $\\cos(5x)$ instead of $5\\cos(5x)$.',
      ],
      proTip: 'For trig powers like $\\cos^4(2x)$, ALWAYS rewrite as $[\\cos(2x)]^4$ on scratch paper so you never miss the outer power layer!',
    },
    keywords: ['chain rule', 'composite', 'outer', 'inner', 'power chain rule'],
  },
  {
    id: 'ch03-implicit-differentiation',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    section: '3.7',
    sectionTitle: 'Implicit Differentiation',
    sectionHref: '/chapters/ch03/3.7-implicit-differentiation',
    kind: 'METHOD',
    blockLabel: 'METHOD',
    title: 'Implicit Differentiation',
    bookRef: "Thomas' Calculus 14e · Section 3.7",
    difficultyTag: 'Midterm Favorite',
    formalIntro:
      'When an equation $F(x, y) = 0$ defines $y$ implicitly as a differentiable function of $x$, find $\\frac{dy}{dx}$ without solving for $y$ first:',
    formalConditions: [
      { label: 'Step 1:', text: 'Differentiate both sides of the equation with respect to $x$, treating $y = y(x)$ via the Chain Rule: $\\frac{d}{dx}[g(y)] = g\'(y)\\frac{dy}{dx}$.' },
      { label: 'Step 2:', text: 'Collect all terms containing $\\frac{dy}{dx}$ on one side and everything else on the other.' },
      { label: 'Step 3:', text: 'Factor out $\\frac{dy}{dx}$ and divide to solve for $\\frac{dy}{dx}$.' },
    ],
    weakIntuition: {
      headline: 'Differentiate normally — just tack a $\\frac{dy}{dx}$ onto every $y$-term you differentiate!',
      explanation:
        'Since $y$ secretly depends on $x$, differentiating $y^3$ with respect to $x$ uses the Chain Rule: outer derivative $3y^2$ times inner derivative $\\frac{dy}{dx}$. Meanwhile, differentiating an $x$-term like $x^3$ just gives $3x^2$ (since $dx/dx = 1$).',
      everydayAnalogy:
        'Suppose $y$ is written in a secret box $y(x)$: whenever you open a $y$-term to differentiate it, the Chain Rule pops out a $\\frac{dy}{dx}$ tag.',
    },
    quickExample: {
      prompt: 'Find $\\frac{dy}{dx}$ on the curve $x^2 + xy + y^2 = 7$ at $(1, 2)$.',
      steps: [
        'Differentiate term-by-term with respect to $x$ (use Product Rule on $xy$!): $2x + \\left(1\\cdot y + x\\frac{dy}{dx}\\right) + 2y\\frac{dy}{dx} = 0$.',
        'Group $\\frac{dy}{dx}$ terms: $(x + 2y)\\frac{dy}{dx} = -(2x + y)$.',
        'Solve: $\\frac{dy}{dx} = -\\frac{2x + y}{x + 2y}$. At $(1, 2)$: $\\frac{dy}{dx} = -\\frac{2 + 2}{1 + 4} = -\\frac{4}{5}$.',
      ],
      takeaway: 'If a question only asks for the slope at a point $(x_0, y_0)$, you can plug in $(x_0, y_0)$ right after Step 1!',
    },
    strongDive: {
      whyItMatters:
        'Implicit differentiation also proves the Power Rule for all rational exponents $p/q$: $y = x^{p/q} \\implies y^q = x^p \\implies qy^{q-1}y\' = px^{p-1}$.',
      edgeCases: [
        'Finding the second derivative $\\frac{d^2y}{dx^2}$ implicitly: differentiate $\\frac{dy}{dx}$, then substitute your expression for $\\frac{dy}{dx}$ back in so the final answer depends only on $x$ and $y$.',
      ],
      midtermTraps: [
        'Trap: Forgetting the Product Rule on mixed terms like $xy$ or $x^2 y^3$!',
        'Trap: Leaving the right-hand constant unchanged — $\\frac{d}{dx}[25] = 0$, NOT $25$!',
      ],
      proTip: 'Circle every $xy$ product before you start differentiating so you remember to apply Product Rule to it.',
    },
    keywords: ['implicit differentiation', 'dy/dx', 'chain rule', 'tangent slope'],
  },
  {
    id: 'ch03-related-rates',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    section: '3.8',
    sectionTitle: 'Related Rates',
    sectionHref: '/chapters/ch03/3.8-related-rates',
    kind: 'STRATEGY',
    blockLabel: 'PROBLEM STRATEGY',
    title: 'Related Rates Strategy (Differentiate w.r.t. Time $t$)',
    bookRef: "Thomas' Calculus 14e · Section 3.8",
    difficultyTag: 'High-Yield Trap',
    formalIntro:
      'When two or more quantities $x(t), y(t)$ change together over time $t$ and satisfy a geometric/physical equation:',
    formalConditions: [
      { label: '1. Draw & Relate:', text: 'Sketch a diagram and write an equation linking the variables that holds for ALL time $t$ (e.g. $x^2 + y^2 = L^2$, $V = \\frac{1}{3}\\pi r^2 h$).' },
      { label: '2. Differentiate w.r.t. $t$:', text: 'Apply the Chain Rule implicitly to every changing variable: $\\frac{d}{dt}[x^2] = 2x\\frac{dx}{dt}$.' },
      { label: '3. Substitute Snapshot:', text: 'ONLY AFTER differentiating, plug in the known instantaneous values and given rates to solve for the unknown rate.' },
    ],
    weakIntuition: {
      headline: 'Write the general picture equation first, take $\\frac{d}{dt}$ of everything, and plug in numbers LAST!',
      explanation:
        'If you plug in "when $x = 3$" BEFORE taking the derivative, $x$ turns into a frozen number $3$ whose derivative is $0$ — ruining the problem! Keep moving quantities as letters while you differentiate with $\\frac{d}{dt}$, and only freeze the snapshot at the end.',
      everydayAnalogy:
        'You cannot measure how fast a runner is moving from a single still photograph — you must keep the video rolling ($x(t)$) while taking the derivative, and only inspect the frame ($x = 3$) afterward!',
    },
    quickExample: {
      prompt: 'A $5\\text{ m}$ ladder leans against a wall. Its base slides out at $\\frac{dx}{dt} = 2\\text{ m/s}$. Find $\\frac{dy}{dt}$ when $x = 3\\text{ m}$.',
      steps: [
        'General equation: $x^2 + y^2 = 5^2 = 25$ (note $5$ is constant, $x, y$ vary).',
        'Differentiate w.r.t. $t$: $2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0 \\implies x\\frac{dx}{dt} + y\\frac{dy}{dt} = 0$.',
        'At the snapshot $x = 3$: $3^2 + y^2 = 25 \\implies y = 4\\text{ m}$.',
        'Substitute: $3(2) + 4\\frac{dy}{dt} = 0 \\implies \\frac{dy}{dt} = -\\frac{6}{4} = -1.5\\text{ m/s}$ (sliding down).',
      ],
      takeaway: 'Never plug in changing snapshot values before taking $\\frac{d}{dt}$! Constants (like ladder length) stay numbers.',
    },
    strongDive: {
      whyItMatters:
        'Models real-time coupled systems: inflating balloons, draining cones, tracking angles of moving radar, and shadow lengths.',
      edgeCases: [
        'For cone problems ($V = \\frac{1}{3}\\pi r^2 h$), use similar triangles ($r/h = R/H$) BEFORE differentiating to eliminate the unwanted variable ($r$ or $h$).',
      ],
      midtermTraps: [
        'Trap: Plugging in snapshot numbers before differentiating!',
        'Trap: Getting the wrong sign on a rate: if a distance or volume is DECREASING / shrinking / draining, its rate $\\frac{d}{dt}$ MUST be entered as NEGATIVE!',
      ],
      proTip: 'Check the sign and units of your final answer: "shrinking" $\\implies$ negative rate, and units are $\\text{output unit}/\\text{time unit}$.',
    },
    keywords: ['related rates', 'd/dt', 'time', 'snapshot', 'ladder', 'cone'],
  },
  {
    id: 'ch03-linearization-differentials',
    chapter: 3,
    chapterTitle: 'Chapter 3: Derivatives',
    section: '3.9',
    sectionTitle: 'Linearization and Differentials',
    sectionHref: '/chapters/ch03/3.9-linearization-and-differentials',
    kind: 'DEFINITIONS',
    blockLabel: 'DEFINITIONS',
    title: 'Linearization $L(x)$ and Differentials $dx, dy$',
    bookRef: "Thomas' Calculus 14e · Section 3.9",
    difficultyTag: 'Midterm Favorite',
    formalIntro:
      'If $f$ is differentiable at $x = a$, its standard linear approximation (linearization) near $a$ is the tangent line function, and the differential $dy$ estimates the change $\\Delta y$:',
    formalFormula:
      "L(x) = f(a) + f'(a)(x - a) \\qquad \\text{and} \\qquad dy = f'(x)\\,dx \\approx \\Delta y = f(x + dx) - f(x)",
    weakIntuition: {
      headline: 'Use the straight tangent line at a nearby easy point $a$ to estimate a hard curvy value without a calculator.',
      explanation:
        'Right next to $a$, the curve and its tangent line practically overlap. So instead of computing something nasty like $\\sqrt{4.02}$ directly, center your tangent line at the easy point $a = 4$ (where $\\sqrt{4} = 2$) and step along the tangent line by $dx = 0.02$!',
      everydayAnalogy:
        'Walking 10 meters down the street, you treat the Earth as flat (the tangent plane) instead of calculating spherical curvature — accurate enough locally!',
    },
    quickExample: {
      prompt: 'Use linearization of $f(x) = \\sqrt{x}$ at $a = 4$ to estimate $\\sqrt{4.04}$.',
      steps: [
        'Compute at $a = 4$: $f(4) = \\sqrt{4} = 2$, and $f\'(x) = \\frac{1}{2\\sqrt{x}} \\implies f\'(4) = \\frac{1}{4}$.',
        'Linearization: $L(x) = 2 + \\frac{1}{4}(x - 4)$.',
        'Estimate at $x = 4.04$: $\\sqrt{4.04} \\approx L(4.04) = 2 + \\frac{1}{4}(0.04) = 2.01$.',
      ],
      takeaway: '$L(x)$ is just the tangent line equation written as a function; $dy = f\'(a)\\,dx$ is the change along that tangent line.',
    },
    strongDive: {
      whyItMatters:
        'Linearization is the 1st-degree Taylor polynomial and powers Newton\'s Method and error propagation formulas.',
      edgeCases: [
        'Common approximations near $x = 0$: $(1 + x)^k \\approx 1 + kx$, $\\sin x \\approx x$, $\\cos x \\approx 1$, $\\tan x \\approx x$.',
        'Relative error $\\approx \\frac{dy}{y}$ and percentage error $\\approx \\frac{dy}{y} \\times 100\\%$.',
      ],
      midtermTraps: [
        'Trap: Confusing $dy$ (the tangent-line rise $f\'(a)\\,dx$) with $\\Delta y$ (the exact curve change $f(a+dx) - f(a)$).',
        'Trap: Picking a bad center $a$ where $f(a)$ isn\'t easy! Always choose the nearest clean number $a$ to your target $x$.',
      ],
      proTip: 'If asked "estimate the maximum error in Area/Volume when radius has error $dr$", compute $dA = A\'(r)\\,dr$ directly!',
    },
    diagramId: 'linearization',
    keywords: ['linearization', 'differential', 'dy', 'dx', 'linear approximation', 'error'],
  },
];
