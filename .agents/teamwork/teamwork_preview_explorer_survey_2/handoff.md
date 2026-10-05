# Handoff Report: Architecture & Content Schema Survey (Survey 2)

**Author**: `teamwork_preview_explorer` (Survey 2: Architecture & Content Schema Explorer)  
**Date**: 2026-10-05T07:55:00Z  
**Target Work Items**: R2 (Schema Definition & Content Guardrails), R4 (Golden Example Reference Implementation Section 1.1)  
**Target App Path**: `d:\Thomas-Calculus-Book\calculus-guide\`  
**Destination**: Project Orchestrator (`orchestrator_1`), Implementation Agents for M2 & M4  

---

## 1. Observation

### 1.1 Workspace & Toolchain State
- **Workspace Root**: `d:\Thomas-Calculus-Book`
- **Textbook PDF Asset**: `Thomas-Calculus-14th-Edition-[konkur.in].pdf` (size: 27,054,860 bytes, 1213 pages).
- **Target Application Folder**: `d:\Thomas-Calculus-Book\calculus-guide` (not yet scaffolded; surveyed in Step 0).
- **Tool Runtimes Observed**:
  - `Node.js`: `v26.5.1`
  - `npm`: `11.17.0`
  - `Python`: `3.14.6`
  - `SymPy`: `1.14.0` (installed and verified via `python -c "import sympy; print(sympy.__version__)"`)
  - `pypdf`: `6.19.0` (installed and active)

### 1.2 Textbook Section 1.1 Page Index & Topic Analysis
Using `pypdf` extraction on `Thomas-Calculus-14th-Edition-[konkur.in].pdf`:
- **Section 1.1 Title**: "1.1 Functions and Their Graphs" (PDF page index 20–32; textbook numbered pages 1–13 of Chapter 1).
- **Core Topics Covered**:
  - Definition of a function, domain, range, input-output pairs.
  - Natural domain (largest real subset where formula yields real values).
  - Visualizing functions via Cartesian graphs, Vertical Line Test.
  - Piecewise-defined functions, absolute value function $|x|$, greatest integer / floor function $\lfloor x \rfloor$.
  - Increasing and decreasing functions.
  - Even functions ($f(-x) = f(x)$, $y$-axis symmetry) and Odd functions ($f(-x) = -f(x)$, origin symmetry).
  - Common function types: linear, power, polynomials, rational functions, algebraic functions, transcendental functions.
- **Section 1.1 Exercises Layout** (PDF pages 30–33):
  - *Exercises 1–6*: Find domain and range of given functions ($f(x) = 1 + x^2$, $f(x) = 1 - \sqrt{x}$, $F(x) = \sqrt{5x+10}$, $g(x) = \sqrt{x^2 - 3x}$, $f(t) = \frac{4}{3-t}$, $G(t) = \frac{2}{t^2-16}$). Text-only.
  - *Exercises 7–8*: Graphs and Vertical Line Test.
  - *Exercises 12–14*: Geometric modeling functions (distance, slope).
  - *Exercises 15–20*: Natural domain and graphing ($f(x) = 5-2x$, $F(t) = t/\sqrt{t}$, etc.).
  - *Exercises 25–28*: Piecewise function graphing.
  - *Exercises 37–46*: Graph symmetries.
  - *Exercises 47–58*: Even, odd, or neither with mathematical reasons ($f(x)=3$, $f(x)=x-5$, $f(x)=x^2+1$, $f(x)=x^2+x$, $g(x)=x^3+x$, $g(x)=x^4+3x^2-1$, $g(x)=\frac{1}{x^2-1}$, $g(x)=\frac{x}{x^2-1}$, $h(t)=\frac{1}{t-1}$, $h(t)=|t^3|$, $h(t)=2t+1$, $h(t)=2|t|+1$). Text-only.

### 1.3 Verbatim Requirements from `ORIGINAL_REQUEST.md`
- **Creator & Attribution**:
  > "Made by Muhammad Abdullah Athar (GitHub: `https://github.com/AbdullahMalik17`). Every page must contain a persistent global footer: `'Made by Muhammad Abdullah Athar'` linking to the GitHub profile. Include JSON-LD and page metadata authoring attributed to Muhammad Abdullah Athar."
- **Copyright Safeguards**:
  > "Never copy textbook problem statements, descriptions, or figures verbatim. Paraphrase all exercises with references strictly by identifier (e.g., 'Section 1.1, Exercise 21'). Generate original practice sets and MCQs. Gitignore `source/` (do not commit raw PDF pages or extracted raster assets)."
- **R2. Schema Definition & Content Guardrails**:
  > "- Define strict Zod schemas in `lib/content/schema.ts` (`DifficultyEnum`, `StatusEnum`, `BaseItemSchema`, `SolutionSchema`, `MCQSchema`)."  
  > "- Implement `scripts/validate-content.ts` asserting:  
  >    - File path corresponds directly to item `id`.  
  >    - Every MCQ contains exactly 1 valid `correctId` and 3 distractors, each having a non-empty `misconception` property.  
  >    - No duplicate IDs exist across files."  
  > "- Expose npm scripts: `npm run content:validate` and `npm run content:stats`."
- **R4. Golden Example Reference Implementation (Section 1.1)**:
  > "- In `content/ch01-functions/1.1-functions-and-graphs/`:  
  >    - `summary.mdx`: Original definitions, theorems, domain/range, piecewise functions, symmetry tests, and common pitfalls.  
  >    - Paraphrased solutions for text-only exercises with numbered steps and explicit 'why' annotations.  
  >    - 8 original practice problems across difficulty tiers 1, 2, and 3 with hints.  
  >    - 8 original MCQs with explicit misconception metadata for every incorrect distractor."
- **Acceptance Criteria for R2 & R4**:
  > "- [ ] `npm run content:validate` runs cleanly with exit code 0 on all Section 1.1 content."  
  > "- [ ] All Section 1.1 MCQs have exactly 1 correct answer and 3 distractors with non-empty misconception explanations."  
  > "- [ ] Paraphrased exercise solutions include multi-step rationales with explicit 'why' fields."  
  > "- [ ] Math verification CLI successfully validates Section 1.1 exercise answers and MCQs."

---

## 2. Logic Chain

```
[Observation 1.3: R2 Schema & Guardrail Mandates]
                       │
                       ▼
[Step 1: Zod Schema Architecture in lib/content/schema.ts]
   ├── DifficultyEnum ('tier1' | 'tier2' | 'tier3')
   ├── StatusEnum ('draft' | 'in-review' | 'verified' | 'published')
   ├── BaseItemSchema (id, chapter, section, title, difficulty, status, tags, author)
   ├── SolutionSchema with SolutionStepSchema (stepNumber, title, math, explanation, explicit 'why')
   ├── MCQSchema with MCQOptionSchema (exactly 4 options, 1 correctId, 3 distractors with misconception)
   └── PracticeProblemSchema (hints array, solution steps, sympy verification)
                       │
                       ▼
[Step 2: Content Directory Layout & ID Mapping Contract]
   ├── Canonical path: content/ch01-functions/1.1-functions-and-graphs/{solutions,practice,mcq}/*.json
   └── Direct ID correspondence: item.id === relative path without extension
                       │
                       ▼
[Step 3: Validation Pipeline scripts/validate-content.ts]
   ├── File path <-> ID direct equality check
   ├── Cross-file duplicate ID collision detector (Set/Map)
   ├── Zod parse and refine assertions
   └── MCQ distractor misconception completeness assertion
                       │
                       ▼
[Step 4: Content Statistics Reporter scripts/content-stats.ts]
   └── Terminal dashboard displaying item counts, tier distributions, misconception coverage %
                       │
                       ▼
[Step 5: Section 1.1 Golden Example Pedagogical Blueprint (R4)]
   ├── summary.mdx (rigorous, original mathematical exposition + pitfalls)
   ├── Paraphrased solutions for exercises 1–6 & 47–54 (with numbered steps & 'why')
   ├── 8 original practice problems (tiers 1–3) with progressive hints
   └── 8 original MCQs with diagnosed distractors & cognitive misconceptions
```

### Step 1: Zod Schema Design (`lib/content/schema.ts`)
- **Difficulty Tiers**: The requirement specifies "difficulty tiers 1, 2, and 3". Therefore, `DifficultyEnum` must define `'tier1' | 'tier2' | 'tier3'`. For interoperability with general UI components, alias mappings or union support (`'tier1' | 'tier2' | 'tier3' | 'easy' | 'medium' | 'hard'`) should be supported, with `'tier1'`, `'tier2'`, `'tier3'` as canonical.
- **Base Item**: Every content entity must be identifiable, tagged, authored, and attributed to Muhammad Abdullah Athar.
- **Solution Steps**: Acceptance criteria mandate: *"Paraphrased exercise solutions include multi-step rationales with explicit 'why' fields."* Therefore, `SolutionStepSchema` requires:
  - `stepNumber`: positive integer
  - `title`: short step summary
  - `mathExpression` (optional): KaTeX string
  - `explanation`: detailed textual explanation
  - `why`: mandatory non-empty explanation of *mathematical justification / principle* applied.
- **MCQ Constraints**:
  - `options`: array of exactly 4 elements (`length(4)`).
  - `correctId`: enum `'A' | 'B' | 'C' | 'D'`.
  - Zod `.refine()` validates:
    1. Exactly one option matches `correctId`.
    2. The 3 remaining options (distractors) have a non-empty `misconception` string (`len >= 10`).
    3. The correct option does not contain a distractor misconception.

### Step 2: Content Directory Layout & ID Mapping Contract
- Requirement: *"File path corresponds directly to item `id`"*.
- File organization inside `calculus-guide/`:
  ```
  content/
  └── ch01-functions/
      └── 1.1-functions-and-graphs/
          ├── summary.mdx
          ├── solutions/
          │   ├── ex-01.json
          │   ├── ex-02.json
          │   ├── ...
          │   └── ex-54.json
          ├── practice/
          │   ├── practice-01.json
          │   ├── ...
          │   └── practice-08.json
          └── mcq/
              ├── mcq-01.json
              ├── ...
              └── mcq-08.json
  ```
- **ID Canonical Rule**:
  For file `content/ch01-functions/1.1-functions-and-graphs/practice/practice-01.json`:
  The relative path without extension is `ch01-functions/1.1-functions-and-graphs/practice/practice-01`.
  `item.id` must equal `ch01-functions/1.1-functions-and-graphs/practice/practice-01` (normalized with forward slashes).
  This eliminates any ambiguity: the file path is the identifier.

### Step 3: Validation Engine (`scripts/validate-content.ts`)
- Must scan all JSON files under `content/`.
- Must check:
  1. `item.id === computeExpectedId(filePath)`.
  2. `idRegistry.has(item.id)` $\implies$ throws Duplicate ID error with both conflicting file paths.
  3. Zod schema validation: parses against `SolutionSchema`, `MCQSchema`, or `PracticeProblemSchema`.
  4. MCQ guardrails: option count = 4, correct option present, 3 distractors each with non-empty `misconception`.
  5. Solution guardrails: step count $\ge 1$, each step has `why.length >= 5`.
  6. MDX file integrity: confirms `summary.mdx` exists in section directory and has balanced LaTeX delimiters (`$`).
- Must exit with `0` on 100% success, or `1` on any failure.

### Step 4: Content Statistics (`scripts/content-stats.ts`)
- Collects metrics across the content repository:
  - Total chapters, sections, summary MDX files.
  - Count of Solutions, Practice Problems, and MCQs.
  - Breakdown by difficulty tier (Tier 1, Tier 2, Tier 3).
  - Breakdown by verification status (`draft`, `in-review`, `verified`, `published`).
  - Misconception coverage: percentage of distractors with non-empty misconception explanations (target: 100%).
  - Total steps across all solutions and average steps per solution.
- Formats output as an ANSI terminal dashboard.

### Step 5: Section 1.1 Golden Example Reference Standard (R4)
- **Copyright Compliance Strategy**:
  - No textbook sentences, problem statements, or figures copied verbatim.
  - Exercise solutions are identified strictly by reference: `"Section 1.1, Exercise 1"`, `"Section 1.1, Exercise 2"`, etc.
  - Problem statements are paraphrased clearly describing the objective (e.g., "Find the natural domain and range of the function $f(x) = 1 + x^2$").
  - 8 Practice problems are completely original, graduated across Tiers 1, 2, and 3.
  - 8 MCQs are completely original, with authentic pedagogical distractors that trap standard student misconceptions.
  - Math is verified symbolically using SymPy payloads compatible with R3.

---

## 3. Caveats

1. **Path Normalization on Windows**:
   - Windows file paths use backslashes (`\`). The validator must normalize all file paths to POSIX forward slashes (`/`) before computing and comparing `item.id`.
2. **MDX Parsing during Validation**:
   - `validate-content.ts` should validate MDX syntax, frontmatter, and KaTeX delimiter pairing without requiring full Next.js page compilation during content validation.
3. **SymPy Verification Coordination with Python**:
   - `validate-content.ts` verifies structural schema integrity in TypeScript; mathematical correctness is verified by `python tools/verify/verify.py`. To make workflow seamless, `package.json` should provide both `npm run content:validate` (schema guardrails) and `npm run math:verify` (SymPy mathematical check).
4. **No other caveats**: The schema definitions, validator algorithms, statistics reporter, and Section 1.1 content assets are fully designed and directly implementable.

---

## 4. Conclusion & Implementation Blueprints

Below are the complete, ready-to-implement blueprints for **Milestone 2 (R2)** and **Milestone 4 (R4)**.

---

### 4.1 Specification: `lib/content/schema.ts`

```typescript
// lib/content/schema.ts
import { z } from 'zod';

/**
 * Difficulty tiers for practice problems and assessment items.
 * Tier 1: Basic / Computational
 * Tier 2: Intermediate / Applied
 * Tier 3: Advanced / Conceptual & Proof-Challenge
 */
export const DifficultyEnum = z.enum([
  'tier1',
  'tier2',
  'tier3',
  'easy',
  'medium',
  'hard',
]);
export type Difficulty = z.infer<typeof DifficultyEnum>;

/**
 * Editorial and verification lifecycle status.
 */
export const StatusEnum = z.enum([
  'draft',
  'in-review',
  'verified',
  'published',
  'deprecated',
]);
export type ContentStatus = z.infer<typeof StatusEnum>;

/**
 * Base metadata common to every content item.
 */
export const BaseItemSchema = z.object({
  id: z.string().min(1, 'Item ID must not be empty'),
  chapter: z.string().regex(/^ch\d{2}$/, 'Chapter must follow format chNN (e.g. ch01)'),
  section: z.string().regex(/^\d+\.\d+$/, 'Section must follow format N.N (e.g. 1.1)'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  difficulty: DifficultyEnum,
  status: StatusEnum.default('draft'),
  tags: z.array(z.string().min(1)).min(1, 'At least one tag is required'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  author: z.string().default('Muhammad Abdullah Athar'),
});
export type BaseItem = z.infer<typeof BaseItemSchema>;

/**
 * Step in a step-by-step mathematical solution.
 * Crucial guardrail: every step must include an explicit 'why' field justifying the operation.
 */
export const SolutionStepSchema = z.object({
  stepNumber: z.number().int().positive('Step number must be a positive integer'),
  title: z.string().min(1, 'Step title is required'),
  mathExpression: z.string().optional(),
  explanation: z.string().min(1, 'Step explanation is required'),
  why: z.string().min(5, 'Explicit mathematical justification ("why") is required (min 5 characters)'),
});
export type SolutionStep = z.infer<typeof SolutionStepSchema>;

/**
 * SymPy verification configuration attached to solutions and practice problems.
 */
export const SympyVerificationSchema = z.object({
  operation: z.enum([
    'algebraic_equivalence',
    'domain',
    'range',
    'symmetry',
    'derivative',
    'integral',
    'diff_quotient',
    'mcq',
  ]).default('algebraic_equivalence'),
  expression: z.string().optional(),
  expected: z.string().optional(),
  variable: z.string().default('x'),
  intervals: z.array(z.object({
    start: z.string(),
    end: z.string(),
    left_open: z.boolean(),
    right_open: z.boolean(),
  })).optional(),
});
export type SympyVerification = z.infer<typeof SympyVerificationSchema>;

/**
 * Schema for paraphrased textbook exercise solutions.
 * Follows strict copyright safeguards: references exercise by identifier only.
 */
export const SolutionSchema = BaseItemSchema.extend({
  type: z.literal('solution').default('solution'),
  exerciseReference: z.string().regex(
    /^Section \d+\.\d+, Exercise \d+$/,
    'exerciseReference must follow exact format: "Section N.N, Exercise M"'
  ),
  originalTopic: z.string().min(1, 'Topic classification is required'),
  problemStatement: z.string().min(10, 'Paraphrased problem statement is required'),
  finalAnswer: z.string().min(1, 'Final answer is required'),
  steps: z.array(SolutionStepSchema).min(1, 'Solution must contain at least one step'),
  sympyVerification: SympyVerificationSchema.optional(),
});
export type Solution = z.infer<typeof SolutionSchema>;

/**
 * Single multiple-choice option.
 * For incorrect distractors, misconception must be provided.
 */
export const MCQOptionSchema = z.object({
  id: z.enum(['A', 'B', 'C', 'D']),
  text: z.string().min(1, 'Option text is required'),
  explanation: z.string().min(1, 'Option explanation is required'),
  misconception: z.string().optional(),
});
export type MCQOption = z.infer<typeof MCQOptionSchema>;

/**
 * Multiple-choice question schema.
 * Strict guardrails:
 * - Exactly 4 options (A, B, C, D)
 * - Exactly 1 correctId matching an option
 * - Exactly 3 distractors, each having a non-empty misconception explanation
 */
export const MCQSchema = BaseItemSchema.extend({
  type: z.literal('mcq').default('mcq'),
  question: z.string().min(10, 'Question stem must be at least 10 characters'),
  options: z.array(MCQOptionSchema).length(4, 'MCQ must have exactly 4 options (A, B, C, D)'),
  correctId: z.enum(['A', 'B', 'C', 'D']),
  explanation: z.string().min(10, 'Overall solution explanation must be at least 10 characters'),
  sympyVerification: SympyVerificationSchema.optional(),
}).refine(
  (data) => {
    // 1. Assert option IDs are exactly A, B, C, D
    const ids = data.options.map((opt) => opt.id).sort().join('');
    return ids === 'ABCD';
  },
  { message: 'Options must uniquely provide IDs A, B, C, and D', path: ['options'] }
).refine(
  (data) => {
    // 2. Assert correctId exists in options
    return data.options.some((opt) => opt.id === data.correctId);
  },
  { message: 'correctId must correspond to one of the provided options', path: ['correctId'] }
).refine(
  (data) => {
    // 3. Assert all 3 distractors have non-empty misconception explanations
    const distractors = data.options.filter((opt) => opt.id !== data.correctId);
    return distractors.every(
      (opt) => typeof opt.misconception === 'string' && opt.misconception.trim().length >= 10
    );
  },
  {
    message: 'Every distractor (incorrect option) must contain a non-empty misconception description (min 10 characters)',
    path: ['options'],
  }
);
export type MCQ = z.infer<typeof MCQSchema>;

/**
 * Schema for original interactive practice problems.
 */
export const PracticeProblemSchema = BaseItemSchema.extend({
  type: z.literal('practice').default('practice'),
  problemStatement: z.string().min(10, 'Problem statement is required'),
  hints: z.array(z.string().min(5, 'Hint must be at least 5 characters')).min(1, 'At least one hint is required'),
  finalAnswer: z.string().min(1, 'Final answer is required'),
  steps: z.array(SolutionStepSchema).min(1, 'Practice problem must include step-by-step solution'),
  sympyVerification: SympyVerificationSchema.optional(),
});
export type PracticeProblem = z.infer<typeof PracticeProblemSchema>;

/**
 * Polymorphic content item discriminator.
 */
export const ContentItemSchema = z.discriminatedUnion('type', [
  SolutionSchema,
  MCQSchema,
  PracticeProblemSchema,
]);
export type ContentItem = z.infer<typeof ContentItemSchema>;
```

---

### 4.2 Specification: `scripts/validate-content.ts`

```typescript
// scripts/validate-content.ts
import fs from 'node:fs';
import path from 'node:path';
import {
  SolutionSchema,
  MCQSchema,
  PracticeProblemSchema,
} from '../lib/content/schema';

const CONTENT_DIR = path.resolve(process.cwd(), 'content');

interface ValidationError {
  file: string;
  field?: string;
  message: string;
}

const errors: ValidationError[] = [];
const warnings: string[] = [];
const idRegistry = new Map<string, string>(); // id -> filePath

let solutionsCount = 0;
let practiceCount = 0;
let mcqCount = 0;
let mdxCount = 0;

function walkDir(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function normalizePosix(filePath: string): string {
  return filePath.replace(/\\/g, '/');
}

function getExpectedId(filePath: string): string {
  const relative = path.relative(CONTENT_DIR, filePath);
  const posixPath = normalizePosix(relative);
  return posixPath.replace(/\.json$/, '');
}

function validateMDXFile(filePath: string) {
  mdxCount++;
  const content = fs.readFileSync(filePath, 'utf-8');
  if (content.trim().length === 0) {
    errors.push({ file: filePath, message: 'MDX file is empty' });
    return;
  }
  // Check balanced dollar signs for KaTeX
  const singleDollarMatches = (content.match(/(?<!\$)\$(?!\$)/g) || []).length;
  if (singleDollarMatches % 2 !== 0) {
    warnings.push(`Warning: Potential unclosed inline math delimiter '$' in ${filePath}`);
  }
}

function validateJSONContent(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  let data: any;
  try {
    data = JSON.parse(raw);
  } catch (err: any) {
    errors.push({ file: filePath, message: `Invalid JSON syntax: ${err.message}` });
    return;
  }

  // 1. Assertion: File path corresponds directly to item id
  const expectedId = getExpectedId(filePath);
  if (data.id !== expectedId) {
    errors.push({
      file: filePath,
      field: 'id',
      message: `ID mismatch: Expected "${expectedId}" based on file path, but found "${data.id}"`,
    });
  }

  // 2. Assertion: No duplicate IDs across files
  if (idRegistry.has(data.id)) {
    errors.push({
      file: filePath,
      field: 'id',
      message: `Duplicate ID collision: "${data.id}" was already declared in ${idRegistry.get(data.id)}`,
    });
  } else {
    idRegistry.set(data.id, filePath);
  }

  // 3. Schema validation based on type
  if (data.type === 'solution') {
    solutionsCount++;
    const result = SolutionSchema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          file: filePath,
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    }
  } else if (data.type === 'mcq') {
    mcqCount++;
    const result = MCQSchema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          file: filePath,
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    }
  } else if (data.type === 'practice') {
    practiceCount++;
    const result = PracticeProblemSchema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          file: filePath,
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    }
  } else {
    errors.push({
      file: filePath,
      field: 'type',
      message: `Unknown or missing content type "${data.type}". Expected 'solution', 'mcq', or 'practice'`,
    });
  }
}

async function runValidation() {
  console.log('\n======================================================');
  console.log('    CALCULUS-GUIDE CONTENT VALIDATION PIPELINE       ');
  console.log('======================================================\n');
  console.log(`Scanning content directory: ${CONTENT_DIR}`);

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`ERROR: Content directory does not exist at ${CONTENT_DIR}`);
    process.exit(1);
  }

  const allFiles = walkDir(CONTENT_DIR);

  for (const file of allFiles) {
    if (file.endsWith('.json')) {
      validateJSONContent(file);
    } else if (file.endsWith('.mdx')) {
      validateMDXFile(file);
    }
  }

  console.log('\nScan Results:');
  console.log(`- MDX Summaries Validated : ${mdxCount}`);
  console.log(`- Solutions Validated     : ${solutionsCount}`);
  console.log(`- Practice Problems       : ${practiceCount}`);
  console.log(`- MCQs Validated          : ${mcqCount}`);
  console.log(`- Total Items Registered  : ${idRegistry.size}`);

  if (warnings.length > 0) {
    console.log('\nWarnings:');
    for (const w of warnings) {
      console.log(`  [!] ${w}`);
    }
  }

  if (errors.length > 0) {
    console.error(`\nFAILED: Found ${errors.length} validation error(s):\n`);
    for (const err of errors) {
      console.error(`  [X] ${err.file}`);
      if (err.field) console.error(`      Field: ${err.field}`);
      console.error(`      Error: ${err.message}\n`);
    }
    process.exit(1);
  }

  console.log('\nSUCCESS: All content passed strict schema guardrails with 0 errors!\n');
  process.exit(0);
}

runValidation();
```

---

### 4.3 Specification: `scripts/content-stats.ts`

```typescript
// scripts/content-stats.ts
import fs from 'node:fs';
import path from 'node:path';

const CONTENT_DIR = path.resolve(process.cwd(), 'content');

interface Stats {
  chapters: Set<string>;
  sections: Set<string>;
  summaries: number;
  solutions: number;
  practice: number;
  mcqs: number;
  tiers: { tier1: number; tier2: number; tier3: number };
  status: { draft: number; 'in-review': number; verified: number; published: number };
  totalSteps: number;
  totalMCQDistractors: number;
  distractorsWithMisconceptions: number;
}

function runStats() {
  const stats: Stats = {
    chapters: new Set(),
    sections: new Set(),
    summaries: 0,
    solutions: 0,
    practice: 0,
    mcqs: 0,
    tiers: { tier1: 0, tier2: 0, tier3: 0 },
    status: { draft: 0, 'in-review': 0, verified: 0, published: 0 },
    totalSteps: 0,
    totalMCQDistractors: 0,
    distractorsWithMisconceptions: 0,
  };

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(p);
      } else if (entry.name.endsWith('.mdx')) {
        stats.summaries++;
      } else if (entry.name.endsWith('.json')) {
        try {
          const item = JSON.parse(fs.readFileSync(p, 'utf-8'));
          if (item.chapter) stats.chapters.add(item.chapter);
          if (item.section) stats.sections.add(`${item.chapter}/${item.section}`);
          if (item.difficulty && (item.difficulty in stats.tiers)) {
            stats.tiers[item.difficulty as keyof typeof stats.tiers]++;
          }
          if (item.status && (item.status in stats.status)) {
            stats.status[item.status as keyof typeof stats.status]++;
          }

          if (item.type === 'solution') {
            stats.solutions++;
            if (Array.isArray(item.steps)) stats.totalSteps += item.steps.length;
          } else if (item.type === 'practice') {
            stats.practice++;
            if (Array.isArray(item.steps)) stats.totalSteps += item.steps.length;
          } else if (item.type === 'mcq') {
            stats.mcqs++;
            if (Array.isArray(item.options)) {
              for (const opt of item.options) {
                if (opt.id !== item.correctId) {
                  stats.totalMCQDistractors++;
                  if (opt.misconception && opt.misconception.trim().length > 0) {
                    stats.distractorsWithMisconceptions++;
                  }
                }
              }
            }
          }
        } catch {
          // Ignore parse errors in stats
        }
      }
    }
  }

  walk(CONTENT_DIR);

  const coveragePct = stats.totalMCQDistractors > 0
    ? ((stats.distractorsWithMisconceptions / stats.totalMCQDistractors) * 100).toFixed(1)
    : '100.0';

  const avgSteps = (stats.solutions + stats.practice) > 0
    ? (stats.totalSteps / (stats.solutions + stats.practice)).toFixed(1)
    : '0.0';

  console.log('\n======================================================');
  console.log('         CALCULUS-GUIDE CONTENT REPOSITORY STATS      ');
  console.log('======================================================\n');
  console.log(`Author / Attribution   : Muhammad Abdullah Athar`);
  console.log(`GitHub Repository      : https://github.com/AbdullahMalik17`);
  console.log(`------------------------------------------------------`);
  console.log(`Chapters Represented   : ${stats.chapters.size}`);
  console.log(`Sections Represented   : ${stats.sections.size}`);
  console.log(`Summary MDX Modules    : ${stats.summaries}`);
  console.log(`------------------------------------------------------`);
  console.log(`Textbook Solutions     : ${stats.solutions}`);
  console.log(`Original Practice Sets : ${stats.practice}`);
  console.log(`MCQ Assessment Items   : ${stats.mcqs}`);
  console.log(`Total Exercises & MCQs : ${stats.solutions + stats.practice + stats.mcqs}`);
  console.log(`------------------------------------------------------`);
  console.log(`Difficulty Tiers:`);
  console.log(`  - Tier 1 (Basic)     : ${stats.tiers.tier1}`);
  console.log(`  - Tier 2 (Applied)   : ${stats.tiers.tier2}`);
  console.log(`  - Tier 3 (Advanced)  : ${stats.tiers.tier3}`);
  console.log(`------------------------------------------------------`);
  console.log(`Pedagogical Rigor Metrics:`);
  console.log(`  - Total Solution Steps        : ${stats.totalSteps}`);
  console.log(`  - Average Steps per Problem   : ${avgSteps}`);
  console.log(`  - Distractor Misconceptions   : ${stats.distractorsWithMisconceptions} / ${stats.totalMCQDistractors} (${coveragePct}%)`);
  console.log(`------------------------------------------------------`);
  console.log(`Content Verification Lifecycle:`);
  console.log(`  - Verified                    : ${stats.status.verified}`);
  console.log(`  - In Review                   : ${stats.status['in-review']}`);
  console.log(`  - Draft                       : ${stats.status.draft}`);
  console.log('======================================================\n');
}

runStats();
```

---

### 4.4 Golden Example Section 1.1 Specification (`content/ch01-functions/1.1-functions-and-graphs/`)

#### 4.4.1 `summary.mdx` Architecture & Outline
File: `content/ch01-functions/1.1-functions-and-graphs/summary.mdx`
Key Sections:
1. **Introduction & Motivation**: Functions as mathematical models of dynamic quantities.
2. **Definition 1.1.1 (Function, Domain, and Range)**:
   - Domain $D$, Codomain, Range $R = \{f(x) \mid x \in D\}$.
   - Input-output mapping and uniqueness of outputs.
3. **Natural Domain**:
   - Fundamental arithmetic restrictions: Denominators $\ne 0$, Radicands of even roots $\ge 0$, Logarithm arguments $> 0$.
   - Distinction between algebraic simplification and natural domain (e.g. $g(x) = \frac{x^2 - 1}{x - 1}$ vs $f(x) = x + 1$).
4. **Visualizing Functions & Graphs**:
   - Graph definition: $\{(x, f(x)) \in \mathbb{R}^2 \mid x \in D\}$.
   - The Vertical Line Test: geometric characterization of functions.
5. **Piecewise-Defined Functions**:
   - Definition and multi-rule specifications.
   - The absolute value function:
     $$|x| = \begin{cases} x, & x \ge 0 \\ -x, & x < 0 \end{cases}$$
   - The floor / greatest integer function $\lfloor x \rfloor$.
6. **Symmetry Tests**:
   - **Even Functions**: $f(-x) = f(x)$ for all $x \in D$. Geometric symmetry across the $y$-axis.
   - **Odd Functions**: $f(-x) = -f(x)$ for all $x \in D$. Rotational symmetry $180^\circ$ about the origin.
   - Algebra of symmetries: sums, products, and quotients of even/odd functions.
7. **Catalogue of Basic Functions**:
   - Linear ($f(x) = mx + b$), Power ($f(x) = x^a$), Polynomial, Rational, Algebraic, and Transcendental.
8. **Common Pitfalls Alert**:
   - Pitfall 1: Applying algebraic simplification before determining the domain.
   - Pitfall 2: Treating odd functions as having odd coefficients rather than parity under reflection.
   - Pitfall 3: Assuming every non-even function is odd (most functions have no symmetry).
   - Pitfall 4: Evaluating boundary endpoints on the wrong branch of a piecewise function.

---

#### 4.4.2 Paraphrased Textbook Solutions Inventory (8 Key Exercises from Section 1.1)

| File Name | Exercise Ref | Paraphrased Topic | Key Answer | SymPy Verification |
|-----------|--------------|-------------------|------------|--------------------|
| `solutions/ex-01.json` | Section 1.1, Exercise 1 | Natural domain and range of quadratic $f(x) = 1 + x^2$ | Domain: $(-\infty, \infty)$, Range: $[1, \infty)$ | `domain`, `x**2 + 1` |
| `solutions/ex-02.json` | Section 1.1, Exercise 2 | Natural domain and range of square root transformation $f(x) = 1 - \sqrt{x}$ | Domain: $[0, \infty)$, Range: $(-\infty, 1]$ | `domain`, `1 - sqrt(x)` |
| `solutions/ex-03.json` | Section 1.1, Exercise 3 | Natural domain and range of radicand $F(x) = \sqrt{5x + 10}$ | Domain: $[-2, \infty)$, Range: $[0, \infty)$ | `domain`, `sqrt(5*x + 10)` |
| `solutions/ex-04.json` | Section 1.1, Exercise 4 | Natural domain and range of quadratic radicand $g(x) = \sqrt{x^2 - 3x}$ | Domain: $(-\infty, 0] \cup [3, \infty)$, Range: $[0, \infty)$ | `domain`, `sqrt(x**2 - 3*x)` |
| `solutions/ex-05.json` | Section 1.1, Exercise 5 | Natural domain and range of rational function $f(t) = \frac{4}{3 - t}$ | Domain: $(-\infty, 3) \cup (3, \infty)$, Range: $(-\infty, 0) \cup (0, \infty)$ | `domain`, `4/(3 - t)` |
| `solutions/ex-06.json` | Section 1.1, Exercise 6 | Domain and range of rational difference of squares $G(t) = \frac{2}{t^2 - 16}$ | Domain: $\mathbb{R} \setminus \{-4, 4\}$, Range: $(-\infty, -1/8] \cup (0, \infty)$ | `domain`, `2/(t**2 - 16)` |
| `solutions/ex-51.json` | Section 1.1, Exercise 51 | Parity test of cubic polynomial $g(x) = x^3 + x$ | Odd (origin symmetry) | `symmetry`, `x**3 + x` |
| `solutions/ex-54.json` | Section 1.1, Exercise 54 | Parity test of rational function $g(x) = \frac{x}{x^2 - 1}$ | Odd (origin symmetry) | `symmetry`, `x/(x**2 - 1)` |

**Sample Full JSON Object: `solutions/ex-01.json`**:
```json
{
  "id": "ch01-functions/1.1-functions-and-graphs/solutions/ex-01",
  "chapter": "ch01",
  "section": "1.1",
  "type": "solution",
  "title": "Domain and Range of a Quadratic Polynomial",
  "exerciseReference": "Section 1.1, Exercise 1",
  "originalTopic": "Functions and Graphs: Natural Domain and Range",
  "difficulty": "tier1",
  "status": "verified",
  "tags": ["domain", "range", "quadratic", "polynomial"],
  "author": "Muhammad Abdullah Athar",
  "problemStatement": "Determine the natural domain and the resulting range of the real-valued function defined by the formula f(x) = 1 + x^2.",
  "finalAnswer": "Domain: $(-\\infty, \\infty)$, Range: $[1, \\infty)$",
  "steps": [
    {
      "stepNumber": 1,
      "title": "Analyze Algebraic Restrictions for Domain",
      "mathExpression": "f(x) = 1 + x^2",
      "explanation": "Inspect the formula f(x) = 1 + x^2 for values of x that might produce division by zero or square roots of negative numbers.",
      "why": "The natural domain consists of all real numbers for which the arithmetic operations are well-defined in the real number system."
    },
    {
      "stepNumber": 2,
      "title": "State the Domain",
      "mathExpression": "D = (-\\infty, \\infty)",
      "explanation": "Since squaring any real number and adding 1 is defined for all real numbers without restriction, the domain is the entire real line.",
      "why": "Polynomial functions are defined everywhere on the real line without singularities."
    },
    {
      "stepNumber": 3,
      "title": "Analyze the Range",
      "mathExpression": "x^2 \\ge 0 \\implies 1 + x^2 \\ge 1",
      "explanation": "For any real number x, x^2 is non-negative. Adding 1 to both sides establishes that f(x) >= 1 for all x. Since x^2 can attain all non-negative values, f(x) attains all values in [1, inf).",
      "why": "The square of a real number is always non-negative, bounding the quadratic parabola from below at its vertex."
    }
  ],
  "sympyVerification": {
    "operation": "domain",
    "expression": "1 + x**2",
    "expected": "(-oo, oo)",
    "variable": "x"
  }
}
```

---

#### 4.4.3 Original Practice Problems Inventory (8 Problems across Tiers 1–3)

| File Name | Tier | Topic | Mathematical Objective |
|-----------|------|-------|------------------------|
| `practice/practice-01.json` | Tier 1 | Linear Radicand Domain & Range | Find domain and range of $f(x) = \sqrt{4 - 2x}$ with interval notation. |
| `practice/practice-02.json` | Tier 1 | Rational Function Domain | Find natural domain of $g(x) = \frac{3x + 1}{x^2 - 9}$, identifying excluded points. |
| `practice/practice-03.json` | Tier 1 | Symmetry Testing | Test algebraically whether $h(x) = \frac{x^3}{x^2 + 4}$ is even, odd, or neither. |
| `practice/practice-04.json` | Tier 2 | Radical in Denominator | Find domain of $f(x) = \frac{1}{\sqrt{x^2 - 5x + 6}}$ using sign chart. |
| `practice/practice-05.json` | Tier 2 | Piecewise Function Evaluation & Graph | Evaluate 3-part piecewise function at points and test continuity at boundary values. |
| `practice/practice-06.json` | Tier 2 | Applied Geometric Modeling | Inscribe a rectangle under the parabola $y = 9 - x^2$; express area $A(x)$ and determine domain. |
| `practice/practice-07.json` | Tier 3 | Even/Odd Function Decomposition | Decompose $f(x) = \frac{x+2}{x+1}$ into unique sum of even $f_E(x)$ and odd $f_O(x)$ components. |
| `practice/practice-08.json` | Tier 3 | Dual Radicand Inequality System | Determine natural domain of $f(x) = \sqrt{\frac{x-1}{x+3}} + \sqrt{\frac{4-x}{x+1}}$ via interval intersection. |

**Sample Full JSON Object: `practice/practice-01.json`**:
```json
{
  "id": "ch01-functions/1.1-functions-and-graphs/practice/practice-01",
  "chapter": "ch01",
  "section": "1.1",
  "type": "practice",
  "title": "Natural Domain of a Linear Radicand",
  "difficulty": "tier1",
  "status": "verified",
  "tags": ["domain", "range", "radicals", "linear-inequalities"],
  "author": "Muhammad Abdullah Athar",
  "problemStatement": "Find the natural domain and range of the function $f(x) = \\sqrt{4 - 2x}$. Express your answers in interval notation.",
  "hints": [
    "Recall that an even-indexed radical requires its radicand to be non-negative in the real number system.",
    "Set the expression under the square root $4 - 2x \\ge 0$ and solve for $x$, remembering to reverse the inequality sign when dividing by a negative number.",
    "For the range, observe the minimum value a principal square root can output and whether higher values are attainable."
  ],
  "finalAnswer": "Domain: $(-\\infty, 2]$, Range: $[0, \\infty)$",
  "steps": [
    {
      "stepNumber": 1,
      "title": "Formulate the Radicand Condition",
      "mathExpression": "4 - 2x \\ge 0",
      "explanation": "The square root function produces real values if and only if the expression inside is greater than or equal to zero.",
      "why": "Negative numbers have imaginary square roots, which are outside the real number domain of single-variable calculus."
    },
    {
      "stepNumber": 2,
      "title": "Solve the Linear Inequality",
      "mathExpression": "-2x \\ge -4 \\implies x \\le 2",
      "explanation": "Subtract 4 from both sides and divide by -2, reversing the inequality sign from >= to <=.",
      "why": "Multiplying or dividing both sides of an inequality by a negative number reverses the direction of the inequality."
    },
    {
      "stepNumber": 3,
      "title": "Determine the Range",
      "mathExpression": "\\text{Range} = [0, \\infty)",
      "explanation": "The principal square root symbol denotes the non-negative root. As x decreases from 2 to -inf, 4 - 2x grows without bound, so sqrt(4 - 2x) covers all values in [0, inf).",
      "why": "The principal square root function has a non-negative codomain [0, inf) and maps continuously to infinity."
    }
  ],
  "sympyVerification": {
    "operation": "domain",
    "expression": "sqrt(4 - 2*x)",
    "expected": "(-oo, 2]",
    "variable": "x"
  }
}
```

---

#### 4.4.4 Original MCQs Inventory (8 MCQs with Explicit Misconceptions)

| File Name | Target Concept | Correct Answer | Diagnosed Cognitive Misconceptions |
|-----------|----------------|----------------|------------------------------------|
| `mcq/mcq-01.json` | Natural domain of $f(x) = \frac{\sqrt{x+4}}{x-3}$ | $[-4, 3) \cup (3, \infty)$ | A: Neglecting zero denominator; B: Excluding valid radical endpoint $x=-4$; C: Inverting inequality sign. |
| `mcq/mcq-02.json` | Range of shifted parabola $f(x) = 3 - (x-2)^2$ | $(-\infty, 3]$ | A: Assuming all parabolas open upward; B: Confusing $x$-shift with $y$-range; C: Assuming polynomials always have range $\mathbb{R}$. |
| `mcq/mcq-03.json` | Symmetry of $f(x) = \frac{x^5 - 3x}{x^4 + 1}$ | Odd function (origin) | A: Assuming constant terms force even parity; B: Partial reflection error; C: Confusing relation symmetry with function symmetry. |
| `mcq/mcq-04.json` | Piecewise point evaluation at boundary | $f(2) = 5$ | A: Evaluating left branch ignoring strict inequality; B: Evaluating right branch ignoring strict inequality; C: Assuming discontinuity implies undefined. |
| `mcq/mcq-05.json` | Domain of quotient radicand $\sqrt{\frac{x-2}{5-x}}$ | $[2, 5)$ | A: Dividing by zero at $x=5$; B: Exterior interval union without sign chart; C: Excluding numerator zero $x=2$. |
| `mcq/mcq-06.json` | Parity of product $h(x) = f(x)g(x)$ for two odd functions | Even function | A: Additive thinking ("odd + odd is odd, so product is odd"); B: Assuming multiplication destroys symmetry; C: Confusing parity multiplication with constant value. |
| `mcq/mcq-07.json` | Removable discontinuity domain of $\frac{x^2 - 4}{x - 2}$ | $x \ne 2$ | A: Simplifying before finding domain; B: Factoring roots as domain interval; C: Confusing polynomial fraction with square root. |
| `mcq/mcq-08.json` | Vertical Line Test for algebraic relations | $x^2 + y = 4$ | A: Circles satisfy symmetry but fail VLT; B: Horizontal parabola has 2 outputs per positive input; C: Absolute value on $y$ yields two branches. |

**Sample Full JSON Object: `mcq/mcq-01.json`**:
```json
{
  "id": "ch01-functions/1.1-functions-and-graphs/mcq/mcq-01",
  "chapter": "ch01",
  "section": "1.1",
  "type": "mcq",
  "title": "Natural Domain with Radical Numerator and Rational Denominator",
  "difficulty": "tier1",
  "status": "verified",
  "tags": ["domain", "radicals", "rational-functions", "mcq"],
  "author": "Muhammad Abdullah Athar",
  "question": "What is the natural domain of the real-valued function $f(x) = \\frac{\\sqrt{x + 4}}{x - 3}$?",
  "correctId": "C",
  "options": [
    {
      "id": "A",
      "text": "$[-4, \\infty)$",
      "explanation": "Incorrect. This considers only the square root restriction in the numerator and neglects the denominator singularity.",
      "misconception": "Student checked that the square root requires x >= -4, but completely forgot that the denominator cannot equal zero, missing the restriction x != 3."
    },
    {
      "id": "B",
      "text": "$(-4, 3) \\cup (3, \\infty)$",
      "explanation": "Incorrect. This unnecessarily excludes the boundary point x = -4.",
      "misconception": "Student erroneously assumed that square roots can never output zero or that the radicand must be strictly positive (x > -4), confusing numerator roots with denominator roots."
    },
    {
      "id": "C",
      "text": "$[-4, 3) \\cup (3, \\infty)$",
      "explanation": "Correct! The numerator requires x + 4 >= 0, giving x >= -4. The denominator requires x - 3 != 0, giving x != 3. Combining both gives [-4, 3) U (3, inf)."
    },
    {
      "id": "D",
      "text": "$(-\\infty, -4] \\cup (3, \\infty)$",
      "explanation": "Incorrect. This inverts the inequality for the radicand.",
      "misconception": "Student incorrectly solved x + 4 >= 0 as x <= -4, reversing the inequality without dividing by a negative number, and took the union with x > 3."
    }
  ],
  "explanation": "To find the natural domain of f(x) = sqrt(x + 4) / (x - 3), we combine two algebraic restrictions: 1) The radicand must be non-negative: x + 4 >= 0 ==> x >= -4. 2) The denominator cannot be zero: x - 3 != 0 ==> x != 3. The intersection of [ -4, inf ) and { x in R | x != 3 } is [ -4, 3 ) U ( 3, inf ).",
  "sympyVerification": {
    "operation": "domain",
    "expression": "sqrt(x + 4) / (x - 3)",
    "expected": "[-4, 3) U (3, oo)",
    "variable": "x"
  }
}
```

---

## 5. Verification Method

### 5.1 Independent Verification Commands
When Milestone 2 (R2) and Milestone 4 (R4) implementations are complete, verify with the following commands:

1. **Verify Schema Guardrails & File Path <-> ID Mapping**:
   ```powershell
   cd d:\Thomas-Calculus-Book\calculus-guide
   npm run content:validate
   ```
   *Expected Output*: Exits with code `0`, reporting 1 MDX summary, 8 solutions, 8 practice problems, and 8 MCQs validated with 0 errors.

2. **Verify Repository Statistics & Misconception Coverage**:
   ```powershell
   cd d:\Thomas-Calculus-Book\calculus-guide
   npm run content:stats
   ```
   *Expected Output*: Displays ANSI table confirming:
   - 8 Solutions, 8 Practice Problems, 8 MCQs.
   - Distractor Misconception coverage = `24 / 24 (100.0%)`.
   - Tier distribution: Tier 1, Tier 2, Tier 3 present.

3. **Verify SymPy Mathematical Equivalence on Section 1.1 Content**:
   ```powershell
   cd d:\Thomas-Calculus-Book\calculus-guide
   python tools/verify/verify.py validate-section --dir content/ch01-functions/1.1-functions-and-graphs/
   ```
   *Expected Output*: Exits with code `0`, confirming algebraic equivalence of all answers and mathematical uniqueness of all MCQ distractors.

4. **Verify TypeScript Type Safety**:
   ```powershell
   cd d:\Thomas-Calculus-Book\calculus-guide
   npx tsc --noEmit
   ```
   *Expected Output*: Exits with code `0` with zero type errors.

### 5.2 Invalidation Conditions
- Any MCQ containing fewer or more than 4 options.
- Any distractor having an empty or missing `misconception` string.
- Any JSON file whose `id` does not exactly equal its normalized relative path from `content/` without `.json`.
- Any solution lacking an explicit `why` field in each step.
- Non-zero exit code on `npm run content:validate`.
