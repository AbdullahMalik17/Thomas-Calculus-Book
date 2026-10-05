// lib/content/schema.ts
/**
 * Content Schema Definitions for calculus-guide.
 *
 * Authored by: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 * Strictly enforces content guardrails:
 * - Exactly 4 options for MCQs (A, B, C, D)
 * - Exactly 1 correct option and 3 distractors with non-empty misconception explanations
 * - Mandatory explicit 'why' field for every solution step
 * - Discriminated union for polymorphic content types
 */

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
 * SymPy verification configuration attached to solutions, practice problems, and MCQs.
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
 * Underlying ZodObject for Multiple-choice questions before refinement.
 */
export const BaseMCQSchema = BaseItemSchema.extend({
  type: z.literal('mcq').default('mcq'),
  question: z.string().min(10, 'Question stem must be at least 10 characters'),
  options: z.array(MCQOptionSchema).length(4, 'MCQ must have exactly 4 options (A, B, C, D)'),
  correctId: z.enum(['A', 'B', 'C', 'D']),
  explanation: z.string().min(10, 'Overall solution explanation must be at least 10 characters'),
  sympyVerification: SympyVerificationSchema.optional(),
});

/**
 * Multiple-choice question schema with full validation guardrails:
 * - Exactly 4 options with IDs A, B, C, D
 * - Exactly 1 correctId matching an option
 * - Exactly 3 distractors, each having a non-empty misconception explanation (min 10 characters)
 */
export const MCQSchema = BaseMCQSchema.refine(
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
    // 3. Assert all 3 distractors have non-empty misconception explanations (min 10 chars)
    const distractors = data.options.filter((opt) => opt.id !== data.correctId);
    return (
      distractors.length === 3 &&
      distractors.every(
        (opt) => typeof opt.misconception === 'string' && opt.misconception.trim().length >= 10
      )
    );
  },
  {
    message: 'Every distractor (incorrect option) must contain a non-empty misconception description (min 10 characters)',
    path: ['options'],
  }
);
export type MCQ = z.infer<typeof BaseMCQSchema>;

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
 * Polymorphic content item schema using discriminated union on 'type'.
 * Applies MCQ guardrails via refinement when type is 'mcq'.
 */
export const ContentItemSchema = z.discriminatedUnion('type', [
  SolutionSchema,
  BaseMCQSchema,
  PracticeProblemSchema,
]).superRefine((data, ctx) => {
  if (data.type === 'mcq') {
    const res = MCQSchema.safeParse(data);
    if (!res.success) {
      for (const issue of res.error.issues) {
        ctx.addIssue(issue);
      }
    }
  }
});
export type ContentItem = z.infer<typeof ContentItemSchema>;
